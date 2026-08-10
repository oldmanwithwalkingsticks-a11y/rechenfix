#!/usr/bin/env node
// Pre-Deploy-Lint: Drittanbieter-Skripte nur nach Einwilligung
//
// Regel 1 (drittanbieter-gating): Ein Skript-Element mit absoluter Quelle darf
//   ausschliesslich unterhalb von components/cookie/ stehen. Nur dort haengt es
//   am Einwilligungszustand. Alles andere laedt beim ersten Seitenaufruf und
//   setzt fremde Kennungen ohne Rechtsgrundlage (§ 25 TDDDG kennt kein
//   berechtigtes Interesse).
// Regel 2 (werbe-domains-gating): Die bekannten Werbe- und Messdienste duerfen
//   im Quelltext ebenfalls nur unterhalb von components/cookie/ auftauchen.
//
// Anlass: Bis W73 stand ein zweiter, ungegateter Anzeigen-Loader in
// app/layout.tsx (Rest aus W15C-T4-F1) neben dem gegateten in
// components/cookie/. Er lief bei jedem Aufruf.
//
// Aufruf: node scripts/check-drittanbieter.mjs  oder  npm run lint:drittanbieter

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const SCAN_DIRS = ['app', 'components'];
const CODE_FILE_REGEX = /\.(ts|tsx|js|jsx)$/;
const ALLOWED_PREFIX = 'components/cookie/';

// Bekannte Werbe- und Messdienste. Erweitern, sobald ein weiterer dazukommt.
const TRACKER_HOSTS = [
  'googlesyndication.com',
  'doubleclick.net',
  'googletagmanager.com',
  'google-analytics.com',
  'fundingchoicesmessages.google.com',
  'adservice.google.com',
  'connect.facebook.net',
  'static.hotjar.com',
  'cdn.matomo.cloud',
];

function collectFiles(startDir) {
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
      } else if (CODE_FILE_REGEX.test(entry)) {
        out.push(full);
      }
    }
  }
  walk(startDir);
  return out;
}

const files = [];
for (const scanDir of SCAN_DIRS) {
  const abs = join(ROOT, scanDir);
  try {
    statSync(abs);
    files.push(...collectFiles(abs));
  } catch {
    // Pfad existiert nicht
  }
}

const errors = [];

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join('/');
  if (rel.startsWith(ALLOWED_PREFIX)) continue;

  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');

  // --- Regel 1: Skript-Element mit absoluter Quelle ---
  // Jedes Vorkommen eines Skript-Elements wird samt der folgenden 500 Zeichen
  // betrachtet; steht darin eine absolute Quelle, ist es ein Fremdskript.
  const tagRe = /<[Ss]cript\b/g;
  let m;
  while ((m = tagRe.exec(content)) !== null) {
    const fenster = content.slice(m.index, m.index + 500);
    const bis = fenster.indexOf('>');
    const kopf = bis === -1 ? fenster : fenster.slice(0, bis + 1);
    if (/src\s*=\s*[{"'`\s]*(https?:)?\/\//.test(kopf)) {
      const zeile = content.slice(0, m.index).split('\n').length;
      errors.push({
        rule: 'drittanbieter-gating',
        message: `Skript-Element mit absoluter Quelle in ${rel}:${zeile}.`,
        hint: `Verschieben nach ${ALLOWED_PREFIX} und an den Einwilligungszustand haengen.`,
      });
    }
  }

  // --- Regel 2: bekannte Werbe-/Messdienste ---
  lines.forEach((zeile, i) => {
    for (const host of TRACKER_HOSTS) {
      if (zeile.includes(host)) {
        errors.push({
          rule: 'werbe-domains-gating',
          message: `Fremddienst "${host}" ausserhalb der Einwilligung in ${rel}:${i + 1}.`,
          hint: `Aufruf gehoert nach ${ALLOWED_PREFIX}, gesteuert ueber den Einwilligungszustand.`,
        });
      }
    }
  });
}

if (errors.length === 0) {
  console.log(`${GREEN}✓ Keine ungegateten Fremdskripte.${RESET}`);
  console.log(`${DIM}  ${files.length} Dateien geprueft.${RESET}`);
  process.exit(0);
}

console.log(`${RED}✗ ${errors.length} Verstoss/Verstoesse:${RESET}\n`);
for (const e of errors) {
  console.log(`${CYAN}[${e.rule}]${RESET} ${YELLOW}${e.message}${RESET}`);
  console.log(`${DIM}  → ${e.hint}${RESET}\n`);
}
process.exit(1);
