#!/usr/bin/env node
/**
 * Slug-Drift-Scan (eingeführt: Prompt 132.5, CI-integriert: Prompt 132.6,
 * um Meta-Routen-Check erweitert: Validation-Sweep M4, 29.04.2026).
 *
 * Liest die SSOT aus `lib/rechner-config/*.ts` (alle `slug: '...'`-Einträge)
 * und prüft die gesamte Codebase auf:
 *   1) hartkodierte `/<kategorie>/<slug>`-Pfade, die nicht in der SSOT oder
 *      in einer statischen Route existieren.
 *   2) hartkodierte Single-/Two-Segment-Top-Level-Cross-Links (Meta-Routen
 *      wie `/qualitaet`, `/admin/affiliate-stats`), die nicht im META_ROUTES-
 *      Set existieren — ergänzt durch M4 zur Future-Proofing gegen Drift bei
 *      künftigen Meta-Route-Umbenennungen.
 *
 * **Exit-Code:**
 *   0 — keine Drifts (oder alle gefunden sind in `WHITELIST` / `META_WHITELIST`)
 *   1 — mindestens ein nicht-whitelisted Drift
 *
 * **Ausgabe:**
 *   - Bei 0 Drifts: keine Ausgabe (Prebuild-Kette bleibt leise).
 *   - Mit `VERBOSE=1` oder `--verbose`: SSOT-Größe und Drift-Zahl auch bei Grün.
 *   - Bei Drift: klarer Block pro Treffer mit Korrekturvorschlag aus SSOT.
 *
 * **Whitelist-Regel:** Neue Einträge nur mit explizitem Karsten-OK und
 * Kommentar pro Eintrag (Rule 6 + 11a in CLAUDE.md). Gilt analog für
 * META_ROUTES und META_WHITELIST.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

// --- Portable Pfad-Basis: Script liegt in <root>/scripts/, ROOT ist ein Level höher ---
const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..').split('\\').join('/');
const CONFIG_DIR = join(ROOT, 'lib/rechner-config');
const KATEGORIEN = ['alltag','arbeit','auto','finanzen','gesundheit','kochen','mathe','sport','wohnen'];

/**
 * Meta-Routen (statische Top-Level-Routes außerhalb der Kategorie-Routen).
 * Eingeführt durch Validation-Sweep M4 (29.04.2026).
 *
 * Format: Pfad ohne führenden Slash. Single- ODER Two-Segment-Strings sind
 * zulässig (Exact-Match-Schema, kein Prefix-Wildcard).
 *
 * **Pflege:** Bei jeder neuen statischen Route unter `app/<route>/page.tsx`
 * (oder `app/<route>/<sub>/page.tsx`) hier ergänzen — sonst bricht der Build,
 * sobald die Route irgendwo intern verlinkt wird. Karsten-OK + Kommentar
 * je Eintrag bei Erweiterung erwünscht (Rule 11a-Analogie).
 */
const META_ROUTES = new Set([
  'ki-rechner',
  'feedback',
  'impressum',
  'datenschutz',
  'barrierefreiheit',
  'qualitaet',
  'ueber-uns',
  // Sonder-Targets (Next.js-generated oder Metadata-only Routes)
  'opengraph-image',
  'sitemap.xml',
  'robots.txt',
  // Admin-Sub-Route (intern, derzeit nicht öffentlich verlinkt — als
  // Exact-Match-Eintrag dokumentiert für künftige interne Verlinkungen).
  'admin/affiliate-stats',
]);

const VERBOSE = process.env.VERBOSE === '1' || process.argv.includes('--verbose');

// --- SSOT einlesen ---
const SSOT = {};
for (const k of KATEGORIEN) {
  const f = readFileSync(join(CONFIG_DIR, `${k}.ts`), 'utf-8');
  const slugs = new Set();
  for (const m of f.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)) slugs.add(m[1]);
  SSOT[k] = slugs;
}

// Statische Routes unter app/<kategorie>/<slug>/page.tsx akzeptieren
// (Landing-Page-Varianten wie /finanzen/2000-euro-brutto-netto).
const STATIC_ROUTES = {};
for (const k of KATEGORIEN) {
  const katDir = join(ROOT, 'app', k);
  const slugs = new Set();
  try {
    for (const entry of readdirSync(katDir)) {
      const p = join(katDir, entry);
      if (statSync(p).isDirectory()) slugs.add(entry);
    }
  } catch { /* Verzeichnis fehlt (z.B. app/sport existiert nicht) */ }
  STATIC_ROUTES[k] = slugs;
}

// --- Datei-Ausschlüsse ---
const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', 'public']);
const EXCLUDE_FILES_REL = new Set([
  'next.config.mjs',                    // Redirect-source-Pfade sind absichtlich Alt-Slugs
  'next.config.ts',
  'scripts/slug-drift-scan.mjs',        // das Script selbst
]);
const EXCLUDE_PATH_PREFIXES_REL = [
  'lib/rechner-config',                 // SSOT selbst
  '.claude/skills',                     // enthält Counter-Beispiele aus Prompt 127/128
  'docs/audit-arbeitspapiere',          // historische Audit-Dokumente
  'docs/audit-bundles',                 // generierte Bundles (1:1-Reproduktion anderer Dateien)
  'reports',                            // historische Audit-Reports (generiert)
];
const EXCLUDE_FILE_REGEX = [
  /^docs\/.*-2026-\d{2}\.md$/,          // dated audit snapshots (a11y-baseline, jahresparameter)
];

/**
 * Whitelist für Drifts, die bewusst im aktiven Code stehen. Jeder Eintrag
 * braucht einen Grund — neue Einträge nur mit Karsten-OK (Rule 11a).
 */
const WHITELIST = [
  {
    file: 'CLAUDE.md',
    pattern: '/finanzen/firmenwagenrechner',
    reason: 'Rule 11 zitiert die Alt-URL aus Prompt 126, um die Migration zum neuen Pfad als Lehre zu dokumentieren. Historischer Kontext.',
  },
  {
    file: 'rechenfix-projekt-referenz.md',
    pattern: '/gesundheit/herzfrequenz-rechner',
    reason: 'Dokumentiert 301-Redirect-Konsolidierung auf /sport/herzfrequenz-zonen-rechner (next.config.mjs). Historischer Kontext.',
  },
  {
    file: 'rechenfix-projekt-referenz.md',
    pattern: '/finanzen/pflegegeld-',
    reason: 'Shortform-Notation in Affiliate-Programm-Aufzählung ("/finanzen/pflegegeld-, krankengeld-, rentenrechner"). Regex-False-Positive.',
  },
  {
    file: 'rechenfix-projekt-referenz.md',
    pattern: '/gesundheit/raucher-',
    reason: 'Shortform-Notation in Affiliate-Programm-Aufzählung ("/gesundheit/raucher-, schlaf-rechner"). Regex-False-Positive.',
  },
];

function isWhitelisted(relFile, kat, slug) {
  const pattern = `/${kat}/${slug}`;
  return WHITELIST.some(w => w.file === relFile && w.pattern === pattern);
}

/**
 * Meta-Routen-Whitelist (Validation-Sweep M4). Analog zu WHITELIST, aber für
 * Single-/Two-Segment-Top-Level-Routes. Pflege-Regel identisch.
 */
const META_WHITELIST = [
  {
    file: 'app/[kategorie]/page.tsx',
    pattern: '/pfad',
    reason: 'Pattern-Beispiel `[text](/pfad)` im Code-Kommentar des Markdown-Link-Renderers (Z. 15) — kein echter Cross-Link.',
  },
  {
    file: 'CLAUDE.md',
    pattern: '/pfad',
    reason: 'Dokumentations-Referenz auf das Markdown-Renderer-Pattern-Beispiel in der Whitelist-Regel-Subsection. Self-Reference, kein echter Cross-Link.',
  },
];

function isMetaWhitelisted(relFile, route) {
  return META_WHITELIST.some(w => w.file === relFile && w.pattern === `/${route}`);
}

function findCorrectCategory(slug) {
  for (const k of KATEGORIEN) if (SSOT[k].has(slug)) return k;
  return null;
}

function walk(dir) {
  const out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const entry of entries) {
    const p = join(dir, entry).split('\\').join('/');
    if (EXCLUDE_DIRS.has(entry)) continue;
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) {
      out.push(...walk(p));
    } else {
      const ext = extname(entry);
      if (!['.ts', '.tsx', '.md', '.mdx', '.json'].includes(ext)) continue;
      const rel = p.startsWith(ROOT + '/') ? p.slice(ROOT.length + 1) : p;
      if (EXCLUDE_FILES_REL.has(rel)) continue;
      if (EXCLUDE_PATH_PREFIXES_REL.some(pre => rel.startsWith(pre + '/') || rel === pre)) continue;
      if (EXCLUDE_FILE_REGEX.some(re => re.test(rel))) continue;
      out.push(p);
    }
  }
  return out;
}

const FILES = walk(ROOT);
const PATTERN = /\/(alltag|arbeit|auto|finanzen|gesundheit|kochen|mathe|sport|wohnen)\/([a-z0-9-]+)/g;

/**
 * Meta-Routen-Patterns (M4): Single- oder Two-Segment-Cross-Links in
 * `href="..."` und Markdown `[text](/route)`. Bewusst eng gefasst, um
 * False-Positives bei Plain-Strings (API-Pfade, Static Assets) zu vermeiden.
 * Pattern-Limitationen sind im M4-Audit-Bericht (Phase A, Bonus B-04)
 * dokumentiert.
 */
const META_PATTERNS = [
  /href=["']\/([a-z][a-z0-9-]*(?:\/[a-z][a-z0-9-]*)?)["']/g,
  /\]\(\/([a-z][a-z0-9-]*(?:\/[a-z][a-z0-9-]*)?)\)/g,
];

const drifts = [];
const whitelistedHits = [];
const metaDrifts = [];

for (const f of FILES) {
  const rel = f.startsWith(ROOT + '/') ? f.slice(ROOT.length + 1) : f;
  const content = readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const pat = new RegExp(PATTERN.source, 'g');
    let m;
    while ((m = pat.exec(line)) !== null) {
      const [, kat, slug] = m;
      // Externe URLs ausschließen (z.B. https://bmwsb.bund.de/DE/wohnen/…)
      const before = line.slice(0, m.index);
      const lastHttps = Math.max(before.lastIndexOf('http://'), before.lastIndexOf('https://'));
      if (lastHttps >= 0) {
        const zwischen = before.slice(lastHttps);
        if (!/[\s"'`)<]/.test(zwischen)) continue;
      }
      // SSOT-Mitgliedschaft oder statische Route akzeptieren
      if (SSOT[kat].has(slug) || STATIC_ROUTES[kat].has(slug)) continue;
      const entry = {
        file: rel,
        line: i + 1,
        kat,
        slug,
        context: line.trim().slice(0, 180),
        correctKat: findCorrectCategory(slug),
      };
      if (isWhitelisted(rel, kat, slug)) whitelistedHits.push(entry);
      else drifts.push(entry);
    }
    // Meta-Routen-Pass (M4)
    for (const mp of META_PATTERNS) {
      const lp = new RegExp(mp.source, 'g');
      let mm;
      while ((mm = lp.exec(line)) !== null) {
        const route = mm[1];
        // Erstes Segment ist Kategorie? → vom Hauptpattern abgedeckt, hier skippen
        const firstSeg = route.split('/')[0];
        if (SSOT[firstSeg] !== undefined) continue;
        // Bekannte Meta-Route?
        if (META_ROUTES.has(route)) continue;
        // Whitelist?
        if (isMetaWhitelisted(rel, route)) continue;
        metaDrifts.push({
          file: rel,
          line: i + 1,
          route,
          context: line.trim().slice(0, 180),
        });
      }
    }
  }
}

// --- Ausgabe ---
if (drifts.length === 0 && metaDrifts.length === 0) {
  if (VERBOSE) {
    const ssotTotal = Object.values(SSOT).reduce((a, s) => a + s.size, 0);
    console.log(
      `✓ slug-drift-scan: 0 drifts (${ssotTotal} SSOT-Slugs, ${META_ROUTES.size} Meta-Routes, ${whitelistedHits.length} whitelisted)`,
    );
  }
  process.exit(0);
}

// Fehler-Output
console.error('');
const totalCount = drifts.length + metaDrifts.length;
console.error(`✗ slug-drift-scan: ${totalCount} Drift(s) gefunden — Build abgebrochen.`);
console.error('');

if (drifts.length > 0) {
  console.error(`Rechner-Drifts (${drifts.length}):`);
  console.error('Jeder Drift ist ein hartkodierter Pfad, dessen Slug nicht in der SSOT');
  console.error('(lib/rechner-config/<kategorie>.ts) oder als statische Route existiert.');
  console.error('');

  const byFile = new Map();
  for (const d of drifts) {
    if (!byFile.has(d.file)) byFile.set(d.file, []);
    byFile.get(d.file).push(d);
  }
  for (const [file, list] of [...byFile.entries()].sort()) {
    console.error(`  ${file}:`);
    for (const d of list) {
      const vorschlag = d.correctKat
        ? `→ /${d.correctKat}/${d.slug}`
        : `(Slug "${d.slug}" in keiner Kategorie-SSOT gefunden; Tippfehler oder Slug existiert nicht mehr)`;
      console.error(`    Z.${d.line}: /${d.kat}/${d.slug}  ${vorschlag}`);
      console.error(`       ${d.context}`);
    }
  }
  console.error('');
  console.error('Fix: Pfad auf SSOT-Wert korrigieren. Für bewusste Ausnahmen (historische');
  console.error('Referenzen etc.): Karsten fragen, dann WHITELIST in scripts/slug-drift-scan.mjs');
  console.error('erweitern (mit Kommentar).');
  console.error('');
}

if (metaDrifts.length > 0) {
  console.error(`Meta-Routen-Drifts (${metaDrifts.length}):`);
  console.error('Jeder Treffer ist ein hartkodierter Single-/Two-Segment-Cross-Link auf');
  console.error('eine Route, die weder eine Kategorie noch eine bekannte Meta-Route ist.');
  console.error('');

  const byFileMeta = new Map();
  for (const d of metaDrifts) {
    if (!byFileMeta.has(d.file)) byFileMeta.set(d.file, []);
    byFileMeta.get(d.file).push(d);
  }
  for (const [file, list] of [...byFileMeta.entries()].sort()) {
    console.error(`  ${file}:`);
    for (const d of list) {
      console.error(`    Z.${d.line}: /${d.route}`);
      console.error(`       ${d.context}`);
    }
  }
  console.error('');
  console.error('Fix: Tippfehler korrigieren ODER falls die Route bewusst neu ist:');
  console.error('META_ROUTES in scripts/slug-drift-scan.mjs ergänzen (Karsten-OK + Kommentar).');
  console.error('Bei False-Positives (z. B. Pattern-Beispiele in Code-Kommentaren):');
  console.error('META_WHITELIST-Eintrag mit Begründung anlegen.');
  console.error('');
}

process.exit(1);
