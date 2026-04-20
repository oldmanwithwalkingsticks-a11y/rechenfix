#!/usr/bin/env node
// Pre-Deploy-Lint: Footer-Architektur-Regeln
// Regel 1 (footer-uniqueness): genau 1 Footer-Komponente in app/ + components/
// Regel 2 (footer-hardcoded-count): keine hartkodierten Rechner-/Kategorie-Zahlen im Footer
// Aufruf: node scripts/check-footer.mjs  oder  npm run lint:footer

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- ANSI-Farben (konsistent mit check-jahreswerte.mjs) ---
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

// --- Scan-Pfade und Ignore-Muster ---
const SCAN_DIRS = ['app', 'components'];
const FOOTER_FILE_REGEX = /Footer[^/\\]*\.(ts|tsx)$/;
const IGNORE_REGEXES = [
  /\.test\.[jt]sx?$/,
  /\.stories\.[jt]sx?$/,
  /\.d\.ts$/,
  /[\\/]node_modules[\\/]/,
];

function collectFooterFiles(startDir) {
  const out = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        if (entry === 'node_modules' || entry.startsWith('.')) continue;
        walk(full);
      } else if (FOOTER_FILE_REGEX.test(entry)) {
        const rel = relative(ROOT, full);
        const relNorm = rel.split(sep).join('/');
        if (IGNORE_REGEXES.some((re) => re.test(relNorm))) continue;
        out.push(full);
      }
    }
  }
  walk(startDir);
  return out;
}

const footerFiles = [];
for (const scanDir of SCAN_DIRS) {
  const abs = join(ROOT, scanDir);
  try {
    statSync(abs);
    footerFiles.push(...collectFooterFiles(abs));
  } catch {
    // Pfad existiert nicht — ignorieren
  }
}

const errors = [];

// --- Regel 1: footer-uniqueness ---
if (footerFiles.length !== 1) {
  const paths = footerFiles.map((f) => relative(ROOT, f)).join(', ') || '(keine)';
  errors.push({
    rule: 'footer-uniqueness',
    message:
      `Erwartet: genau 1 Footer-Komponente in app/ + components/. ` +
      `Gefunden: ${footerFiles.length}. Pfade: ${paths}`,
    hint: 'Konsolidiere auf components/layout/Footer.tsx. Keine zweite Footer-Komponente anlegen.',
  });
}

// --- Regel 2: footer-hardcoded-count ---
// Fängt: "169 Rechner in 9 Kategorien", "125 Rechner pro 7 Kategorie", etc.
// Ausnahme: Strings innerhalb von Template-Literalen mit ${...} greifen nicht,
// weil zwischen Zahl und "Rechner" dann kein Leerzeichen-Literal steht.
const HARDCODED_COUNT_RE = /\b\d{2,4}\s+Rechner\s+(in|pro)\s+\d+\s+Kategorien?\b/i;

if (footerFiles.length === 1) {
  const file = footerFiles[0];
  const content = readFileSync(file, 'utf8');
  const match = content.match(HARDCODED_COUNT_RE);
  if (match) {
    const before = content.slice(0, match.index);
    const line = before.split('\n').length;
    errors.push({
      rule: 'footer-hardcoded-count',
      message:
        `Hartkodierte Rechner-/Kategorie-Zahl in ${relative(ROOT, file)}:${line} — "${match[0]}".`,
      hint: 'Zahlen dynamisch aus lib/rechner-config/client-data.ts berechnen: {rechner.length} Rechner in {kategorien.length} Kategorien',
    });
  }
}

// --- Output ---
if (errors.length === 0) {
  console.log(`${GREEN}✓ Footer-Regeln erfüllt.${RESET}`);
  console.log(
    `${DIM}  ${footerFiles.length} Footer-Komponente${footerFiles.length === 1 ? '' : 'n'} geprüft: ${footerFiles
      .map((f) => relative(ROOT, f).split(sep).join('/'))
      .join(', ') || '(keine)'}${RESET}`,
  );
  process.exit(0);
}

console.log(`${RED}✗ ${errors.length} Footer-Lint-Fehler:${RESET}\n`);
for (const e of errors) {
  console.log(`${CYAN}[${e.rule}]${RESET} ${YELLOW}${e.message}${RESET}`);
  console.log(`${DIM}  → ${e.hint}${RESET}\n`);
}

console.log(
  `${DIM}Siehe CLAUDE.md → Architektur-Regeln und rechner-builder-Skill → Guard G14.${RESET}`,
);

process.exit(1);
