#!/usr/bin/env node
/**
 * check-backticks.mjs (Validation-Sweep M1, eingeführt 28.04.2026).
 *
 * Erkennt Inline-Backticks innerhalb von Template-Literal-String-Werten in
 * `lib/rechner-config/*.ts` Feldern `erklaerung`, `formel`, `beispiel`, `faq`.
 *
 * Hintergrund: Diese Felder sind selbst Template-Literals; ein nicht-escaptes
 * Inline-Backtick im Inhalt (z.B. `getVpi(jahr)` als Code-Markup) schließt
 * das umgebende Literal vorzeitig und brechen den esbuild-Build (Lehre 18,
 * 26.04.2026). Build-Break trat bei 149b im Vercel-Deploy auf — lokales
 * `npm run build` erwischte ihn nur in einem konkreten Code-Pfad.
 *
 * **Methodik:** TypeScript-Compiler-API liest jede Konfig-Datei, walkt das
 * AST und prüft die vier Felder auf:
 *   1. Parser-Diagnostics — wenn die Datei nicht parst (typischer Hinweis
 *      auf vergessene Escape-Sequenz im Template-Literal).
 *   2. Inline-Backticks im Raw-Source-Slice der Property-Werte —
 *      Sicherheitsnetz für den Fall, dass der Parser einen Edge-Case
 *      durchließe.
 *
 * Escapierte Backticks (`\``) sind technisch legitim und werden ignoriert
 * (Vor-Entscheidung 3 des M1-Prompts). `${...}`-Substitutions werden vor
 * der Backtick-Suche herausgestrippt — Backticks darin gehören zum
 * Substitution-JS-Kontext, schließen das Outer-Template nicht.
 *
 * **Exit-Code:**
 *   0 — keine Drifts
 *   1 — mindestens ein Drift (Parser-Fehler oder Inline-Backtick)
 *
 * **Ausgabe:**
 *   - Bei 0 Drifts: keine Ausgabe (leise im Prebuild).
 *   - Mit `VERBOSE=1` oder `--verbose`: Status-Zeile auch bei Grün.
 *   - Mit Drift: klarer Block pro Treffer mit File, Zeile, Property-Pfad, Snippet.
 */

import { readFileSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..').split('\\').join('/');
const CONFIG_DIR = join(ROOT, 'lib/rechner-config');

const VERBOSE = process.env.VERBOSE === '1' || process.argv.includes('--verbose');

const TARGET_FIELDS = new Set(['erklaerung', 'formel', 'beispiel', 'faq']);

// --- Konfig-Files einsammeln (alle *.ts in lib/rechner-config/) ---
const FILES = readdirSync(CONFIG_DIR)
  .filter(f => f.endsWith('.ts'))
  .map(f => join(CONFIG_DIR, f).split('\\').join('/'));

const drifts = [];

/**
 * Entfernt `${...}`-Substitutions aus einem Template-Literal-Inhalt.
 * Balanciert geschachtelte `{}` korrekt.
 */
function stripSubstitutions(s) {
  let out = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '$' && s[i + 1] === '{') {
      let depth = 1;
      i += 2;
      while (i < s.length && depth > 0) {
        if (s[i] === '{') depth++;
        else if (s[i] === '}') depth--;
        if (depth > 0) i++;
      }
      i++; // schließendes '}' überspringen
    } else {
      out += s[i];
      i++;
    }
  }
  return out;
}

for (const file of FILES) {
  const rel = file.startsWith(ROOT + '/') ? file.slice(ROOT.length + 1) : file;
  const content = readFileSync(file, 'utf-8');
  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);

  // --- Klasse 1: Parser-Diagnostics ---
  // SourceFile.parseDiagnostics ist intern, aber stabil über TS-5.x hinweg.
  const diagnostics = sf.parseDiagnostics ?? [];
  for (const d of diagnostics) {
    const pos = d.start ?? 0;
    const { line } = sf.getLineAndCharacterOfPosition(pos);
    const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    drifts.push({
      file: rel,
      line: line + 1,
      kind: 'parse-error',
      property: '(parse-error)',
      detail: msg,
      snippet: (content.split('\n')[line] ?? '').trim().slice(0, 200),
    });
  }

  // --- Klasse 2: AST-Walk für Target-Felder ---
  function checkInitializer(init, propPath, slug) {
    if (!init) return;
    // faq ist Array — Elemente können Objekte (mit frage/antwort) oder Strings sein
    if (ts.isArrayLiteralExpression(init)) {
      for (const el of init.elements) {
        if (ts.isObjectLiteralExpression(el)) {
          for (const prop of el.properties) {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
              checkInitializer(prop.initializer, `${propPath}[].${prop.name.text}`, slug);
            }
          }
        } else {
          checkInitializer(el, propPath, slug);
        }
      }
      return;
    }
    if (ts.isTemplateExpression(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
      const start = init.getStart(sf);
      const end = init.getEnd();
      const raw = content.slice(start, end);
      // Outer-Delimiter (öffnendes/schließendes Backtick) entfernen
      const innerRaw = raw.startsWith('`') && raw.endsWith('`')
        ? raw.slice(1, -1)
        : raw;
      // Substitutions strippen (Backticks darin sind JS-Kontext, nicht Template)
      const stripped = stripSubstitutions(innerRaw);
      // Unescapte Inline-Backticks zählen
      const positions = [];
      for (let i = 0; i < stripped.length; i++) {
        if (stripped[i] === '`' && (i === 0 || stripped[i - 1] !== '\\')) {
          positions.push(i);
        }
      }
      if (positions.length > 0) {
        const { line } = sf.getLineAndCharacterOfPosition(start);
        const firstPos = positions[0];
        const ctxStart = Math.max(0, firstPos - 40);
        const ctxEnd = Math.min(stripped.length, firstPos + 60);
        const snippet = stripped.slice(ctxStart, ctxEnd).replace(/\n/g, ' ');
        drifts.push({
          file: rel,
          line: line + 1,
          kind: 'inline-backtick',
          property: slug ? `${slug}.${propPath}` : propPath,
          detail: `${positions.length} Inline-Backtick(s) im Template-Literal`,
          snippet: `…${snippet}…`,
        });
      }
    }
  }

  function walk(node, slug) {
    if (!node) return;
    let currentSlug = slug;
    // Slug-Identifikation: { slug: 'xyz', ... }
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'slug' &&
      (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer))
    ) {
      currentSlug = node.initializer.text;
    }
    // Target-Property-Treffer
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      TARGET_FIELDS.has(node.name.text)
    ) {
      checkInitializer(node.initializer, node.name.text, currentSlug);
    }
    ts.forEachChild(node, child => walk(child, currentSlug));
  }
  walk(sf, null);
}

// --- Ausgabe ---
if (drifts.length === 0) {
  if (VERBOSE) {
    console.log(`✓ check-backticks: 0 Drifts in ${FILES.length} Konfig-Files`);
  }
  process.exit(0);
}

console.error('');
console.error(`✗ check-backticks: ${drifts.length} Drift(s) gefunden — Build abgebrochen.`);
console.error('');
console.error('Inline-Backticks innerhalb von Template-Literal-String-Werten in den');
console.error('Feldern erklaerung/formel/beispiel/faq schließen das umgebende Literal');
console.error('vorzeitig und brechen den esbuild-Build (Lehre 18, 26.04.2026).');
console.error('');

const byFile = new Map();
for (const d of drifts) {
  if (!byFile.has(d.file)) byFile.set(d.file, []);
  byFile.get(d.file).push(d);
}
for (const [file, list] of [...byFile.entries()].sort()) {
  console.error(`  ${file}:`);
  for (const d of list) {
    console.error(`    Z.${d.line} [${d.kind}] ${d.property}: ${d.detail}`);
    console.error(`       ${d.snippet}`);
  }
}
console.error('');
console.error('Fix: Inline-Backtick durch normale Anführungszeichen ersetzen,');
console.error("z.B. 'getVpi(jahr)' oder \"getVpi(jahr)\" statt `getVpi(jahr)`.");
console.error('');
process.exit(1);
