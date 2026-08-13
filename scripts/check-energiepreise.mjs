#!/usr/bin/env node
/**
 * Verbietet hartkodierte Energiepreise in den Rechner-Configs.
 *
 * Hintergrund: Bis Welle 82 lagen Sprit- und Strompreise als Literale in den
 * Configs verstreut, obwohl es SSOTs dafuer gibt. Sie sind dadurch jahrelang
 * unbemerkt veraltet, teils widerspruechlich zueinander. Die Wellen 82 bis 93
 * haben sie gebunden; dieser Waechter haelt den Zustand.
 *
 * Verboten:  ein einzelner Preis wie '1,75 €/l' oder '0,35 €/kWh'
 * Erlaubt:   eine Spanne wie '0,20–0,25 €/kWh' — das ist ein Szenario, kein
 *            Referenzwert, und gehoert in keine SSOT
 * Erlaubt:   Quellcode-Kommentare (dokumentieren oft alte Werte)
 * Gemeldet, aber nicht verboten: Treffer in beispiel/formel/erklaerung. Diese
 *            Felder werden bei migrierten Rechnern nicht gerendert. Sie werden
 *            nur gezaehlt, damit die Altlast sichtbar bleibt.
 *
 * Aufruf: node scripts/check-energiepreise.mjs
 * Exit 0 = sauber, Exit 1 = mindestens ein gebundener Preis fehlt.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const VERZEICHNIS = 'lib/rechner-config';
const AUSGENOMMEN = new Set(['client-data.ts', 'types.ts']);

// Felder, die bei migrierten Rechnern nicht gerendert werden.
const TOTE_FELDER = new Set(['beispiel', 'formel', 'erklaerung']);

// Ein Preis mit Einheit: 1,75 €/l  ·  0,35 €/kWh
const PREIS = /(\d{1,3},\d{2})\s*€\/(L|l|kWh)/g;
// Eine Spanne: 0,20–0,25 €/kWh (Halbgeviertstrich oder Bindestrich)
const SPANNE = /\d{1,3},\d{2}\s*[–-]\s*\d{1,3},\d{2}\s*€\/(L|l|kWh)/;

const dateien = readdirSync(VERZEICHNIS)
  .filter((n) => n.endsWith('.ts'))
  .filter((n) => !AUSGENOMMEN.has(n))
  .sort();

const verstoesse = [];
let inToten = 0;
let spannen = 0;
let kommentare = 0;

for (const datei of dateien) {
  const zeilen = readFileSync(join(VERZEICHNIS, datei), 'utf8').split('\n');

  let slug = '(vor erstem Slug)';
  let feld = '(unbekannt)';

  zeilen.forEach((zeile, i) => {
    const ms = zeile.match(/slug: '([^']+)'/);
    if (ms) slug = ms[1];
    const mf = zeile.match(/^\s{4,12}([a-zA-Z]+):\s*[`'[{]/);
    if (mf) feld = mf[1];

    PREIS.lastIndex = 0;
    let treffer;
    while ((treffer = PREIS.exec(zeile)) !== null) {
      // Quellcode-Kommentare dokumentieren haeufig alte Werte.
      if (zeile.trim().startsWith('//') || zeile.trim().startsWith('*')) {
        kommentare += 1;
        continue;
      }

      // Steht der Treffer innerhalb einer Spanne? Dann Szenario, kein Referenzwert.
      const umfeld = zeile.slice(Math.max(0, treffer.index - 12), treffer.index + treffer[0].length);
      if (SPANNE.test(umfeld)) {
        spannen += 1;
        continue;
      }

      if (TOTE_FELDER.has(feld)) {
        inToten += 1;
        continue;
      }

      verstoesse.push({ datei, zeile: i + 1, slug, feld, wert: treffer[0] });
    }
  });
}

if (verstoesse.length > 0) {
  console.error(`\nFEHLER: ${verstoesse.length} hartkodierte(r) Energiepreis(e) in gerenderten Config-Feldern.\n`);
  for (const v of verstoesse) {
    console.error(`  ${v.datei}:${v.zeile}  ${v.slug} / ${v.feld}  ->  ${v.wert}`);
  }
  console.error(
    `\nPreise gehoeren an die SSOTs:\n` +
    `  Sprit  lib/berechnungen/spritpreise-parameter.ts (SPRITPREISE_REFERENZ)\n` +
    `  Strom  lib/berechnungen/strompreis.ts (STROMPREIS_2026)\n` +
    `  Laden  lib/berechnungen/ladepreise-parameter.ts (LADEPREISE)\n` +
    `Spannen wie '0,20–0,25 €/kWh' sind erlaubt und werden nicht gemeldet.\n`,
  );
  process.exit(1);
}

console.log(
  `Energiepreise: keine hartkodierten Werte in gerenderten Config-Feldern ` +
  `(${dateien.length} Dateien).`,
);
console.log(
  `  ignoriert: ${spannen} Szenariospanne(n), ${kommentare} Kommentar(e), ` +
  `${inToten} Treffer in nicht gerenderten Feldern (beispiel/formel/erklaerung).`,
);
