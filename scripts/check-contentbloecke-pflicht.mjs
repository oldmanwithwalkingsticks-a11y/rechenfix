#!/usr/bin/env node
/**
 * Erzwingt, dass jeder Rechner Content-Bausteine hat.
 *
 * Hintergrund: Bis Welle 101 gab es in app/[kategorie]/[rechner]/page.tsx einen
 * Fallback-Zweig, der bei fehlenden `contentBloecke` die alten Felder `formel`,
 * `beispiel` und `erklaerung` rendert hat. Der Zweig war seit der W19-Migration
 * unerreichbar — die beiden einzigen Rechner ohne Bausteine werden anderswo
 * gerendert — und wurde entfernt. Damit gibt es keinen Auffangpfad mehr: Ein
 * Rechner ohne Bausteine bliebe inhaltsleer, ohne dass etwas bricht.
 *
 * Genau diese Luecke schliesst dieser Waechter.
 *
 * Ausnahmen (werden NICHT ueber die dynamische Route gerendert):
 *   wohngeld-rechner     — eigene statische Route, STATISCHE_OVERRIDES
 *   brutto-netto-rechner — eigenes Inline-JSX, INLINE_ERKLAERUNG_SLUGS
 *
 * Aufruf: node scripts/check-contentbloecke-pflicht.mjs
 * Exit 0 = alle gerenderten Rechner haben Bausteine, Exit 1 = mindestens einer nicht.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const VERZEICHNIS = 'lib/rechner-config';
const AUSGENOMMEN_DATEIEN = new Set(['client-data.ts', 'types.ts', 'index.ts']);

// Muss mit den beiden Mengen in app/[kategorie]/[rechner]/page.tsx uebereinstimmen.
const AUSNAHMEN = new Set(['wohngeld-rechner', 'brutto-netto-rechner']);

const dateien = readdirSync(VERZEICHNIS)
  .filter((n) => n.endsWith('.ts'))
  .filter((n) => !AUSGENOMMEN_DATEIEN.has(n))
  .sort();

const ohneBausteine = [];
let mitBausteinen = 0;
let ausnahmen = 0;

for (const datei of dateien) {
  const text = readFileSync(join(VERZEICHNIS, datei), 'utf8');

  // Rechner-Bloecke anhand der Einrueckung trennen: jeder Eintrag beginnt auf
  // Ebene 2 mit '  {' und endet mit '  },' bzw. '  },\n];'
  const bloecke = text.split(/\n {2}\{\n/).slice(1);

  for (const block of bloecke) {
    const ms = block.match(/^\s*slug: '([^']+)'/m);
    if (!ms) continue;
    const slug = ms[1];

    if (AUSNAHMEN.has(slug)) {
      ausnahmen += 1;
      continue;
    }

    // contentBloecke muss vorhanden UND nicht leer sein.
    const hat = /contentBloecke:\s*\[\s*\{/.test(block);
    if (hat) mitBausteinen += 1;
    else ohneBausteine.push({ datei, slug });
  }
}

if (ohneBausteine.length > 0) {
  console.error(
    `\nFEHLER: ${ohneBausteine.length} Rechner ohne contentBloecke.\n` +
      `Seit Welle 101 gibt es keinen Fallback-Pfad mehr — diese Seiten\n` +
      `wuerden inhaltsleer ausgeliefert.\n`,
  );
  for (const r of ohneBausteine) console.error(`  ${r.datei}  ${r.slug}`);
  console.error(
    `\nEntweder contentBloecke ergaenzen (Goldstandard: mindestens 11 Bausteine)\n` +
      `oder — falls der Rechner eine eigene Route bekommt — in die Ausnahmeliste\n` +
      `dieses Skripts UND in page.tsx eintragen.\n`,
  );
  process.exit(1);
}

console.log(
  `contentBloecke: alle ${mitBausteinen} gerenderten Rechner haben Bausteine ` +
    `(${ausnahmen} Ausnahmen mit eigener Route).`,
);
