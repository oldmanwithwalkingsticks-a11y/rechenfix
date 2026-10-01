#!/usr/bin/env node
/**
 * check-mdx-nur-seiten.mjs (Welle next16, eingeführt 28.09.2026).
 *
 * Erzwingt die Voraussetzung des MDX-Workarounds in next.config.mjs: MDX kommt
 * ausschließlich als Seite vor (app/**\/page.mdx) und wird nirgends importiert.
 *
 * Hintergrund: Unter Next.js 16 mit Webpack läuft der SWC-Schritt der MDX-Regel
 * von @next/mdx per Hook fest in der RSC-Schicht. Das ist nur richtig, solange
 * jede .mdx-Datei eine Seite ist — Seiten entstehen nur in der RSC-Schicht. Eine
 * .mdx-Datei, die aus einer Komponente importiert wird, landete ebenfalls in der
 * RSC-Schicht, auch wenn die Komponente im Browser läuft. Der Fehler zeigte sich
 * dann erst zur Laufzeit.
 *
 * Geprüft wird:
 *   1. Jede .mdx-Datei liegt unter app/ und heißt page.mdx.
 *   2. Keine .ts-, .tsx- oder .mdx-Datei importiert eine .mdx-Datei
 *      (import … from, export … from, import(), require()).
 *
 * Nicht durchsucht: node_modules, .next, .git, .vercel, tmp, public (statische
 * Dateien, generiertes sw.js), docs (Arbeitspapiere, u. a. gitignorierte
 * MDX-Entwürfe unter docs/audit-arbeitspapiere/_lokal — in tsconfig.json
 * ebenfalls ausgeschlossen) sowie die Werkzeugordner .claude und .agents.
 * Nichts davon kompiliert Webpack.
 *
 * Entfällt zusammen mit dem Workaround (Turbopack-Welle oder Korrektur in Next.js).
 *
 * Aufruf: node scripts/check-mdx-nur-seiten.mjs (Teil der prebuild-Kette).
 * Exit-Code: 0 — alles in Ordnung; 1 — mindestens ein Verstoß.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const AUSGESCHLOSSEN = new Set(['node_modules', '.next', '.git', '.vercel', 'tmp', 'public', 'docs', '.claude', '.agents']);
const SEITE = /^app\/(?:.+\/)?page\.mdx$/;
const MDX_IMPORT = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)['"`]([^'"`\n]+\.mdx)['"`]/g;

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

/** Alle Dateien unterhalb von `dir`, relativ zu ROOT mit `/` als Trenner. */
function dateien(dir, ergebnis = []) {
  for (const eintrag of readdirSync(dir, { withFileTypes: true })) {
    if (eintrag.isDirectory()) {
      if (dir === ROOT && AUSGESCHLOSSEN.has(eintrag.name)) continue;
      if (eintrag.name === 'node_modules') continue;
      dateien(join(dir, eintrag.name), ergebnis);
    } else if (eintrag.isFile()) {
      ergebnis.push(relative(ROOT, join(dir, eintrag.name)).split(sep).join('/'));
    }
  }
  return ergebnis;
}

const alle = dateien(ROOT);
const verstoesse = [];

for (const datei of alle.filter((d) => d.endsWith('.mdx'))) {
  if (!SEITE.test(datei)) {
    verstoesse.push(`${datei}: .mdx-Datei außerhalb von app/**/page.mdx`);
  }
}

const quellen = alle.filter((d) => /\.(ts|tsx|mdx)$/.test(d) && !d.endsWith('.d.ts'));
for (const datei of quellen) {
  const text = readFileSync(join(ROOT, datei), 'utf8');
  for (const treffer of text.matchAll(MDX_IMPORT)) {
    const zeile = text.slice(0, treffer.index).split('\n').length;
    verstoesse.push(`${datei}:${zeile}: importiert ${treffer[1]}`);
  }
}

const seiten = alle.filter((d) => SEITE.test(d)).length;

if (verstoesse.length > 0) {
  console.error(`${RED}✖ check-mdx-nur-seiten: ${verstoesse.length} Verstoß/Verstöße.${RESET}`);
  console.error(
    `${RED}  MDX darf nur als app/**/page.mdx vorkommen und nicht importiert werden — sonst ist der${RESET}\n` +
      `${RED}  MDX-Workaround in next.config.mjs (RSC-Schicht) falsch.${RESET}`,
  );
  for (const v of verstoesse) console.error(`${RED}  - ${v}${RESET}`);
  process.exit(1);
}

console.log(
  `${GREEN}✓ check-mdx-nur-seiten: ${seiten} MDX-Seiten, keine MDX außerhalb von app/**/page.mdx, ` +
    `kein MDX-Import in ${quellen.length} Quelldateien.${RESET}`,
);
