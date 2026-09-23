// W150 — Prüfung der Dezimal-Umwandlung im Bruchrechner.
// Ausführen: npx tsx scripts/verify-bruchrechnung.ts   (Exit 1 bei jeder Abweichung)
//
// Anlass: Nutzerwunsch „Dezimalzahl mal Bruch“ (Feedback 23.09.2026). Die Sollwerte sind von
// Hand gerechnet, nicht aus der Lib abgelesen.
import { dezimalTextZuBruch, dezimalZuBruch, berechneBrueche } from '../lib/berechnungen/bruchrechnung';

const fehler: string[] = [];
const b = (x: { zaehler: number; nenner: number } | null | undefined) => (x ? `${x.zaehler}/${x.nenner}` : 'null');

const text: [string, string | null, string | null][] = [
  // Eingabe, roh (ungekürzter Zehnerbruch), gekürzt
  ['0,75', '75/100', '3/4'],
  ['0,1', '1/10', '1/10'],
  [',5', '5/10', '1/2'],
  ['-1,25', '-125/100', '-5/4'],
  ['3', '3/1', '3/1'],
  ['2.5', '25/10', '5/2'],
  ['0.125', '125/1000', '1/8'],
  ['1.500', '1500/1', '1500/1'],
  ['1.234,5', '12345/10', '2469/2'],
  [' 0, 5 ', '5/10', '1/2'],
  ['0,000000001', '1/1000000000', '1/1000000000'],
  ['0,3333333333', null, null],
  ['abc', null, null],
  ['', null, null],
  ['1,2,3', null, null],
  ['-', null, null],
];
for (const [ein, roh, gek] of text) {
  const r = dezimalTextZuBruch(ein);
  const istRoh = r ? b(r.roh) : null;
  const istGek = r ? b(r.bruch) : null;
  if (istRoh !== roh || istGek !== gek) fehler.push(`dezimalTextZuBruch(${JSON.stringify(ein)}): ${istRoh} → ${istGek} statt ${roh} → ${gek}`);
}

const zahl: [number, string][] = [[0.75, '3/4'], [0.1, '1/10'], [1e-7, '1/10000000'], [-2.5, '-5/2'], [4, '4/1']];
for (const [ein, soll] of zahl) {
  const ist = b(dezimalZuBruch(ein));
  if (ist !== soll) fehler.push(`dezimalZuBruch(${ein}): ${ist} statt ${soll}`);
}

const r = berechneBrueche({ zaehler: 3, nenner: 4 }, '×', { zaehler: 2, nenner: 3 });
if (!r || b(r.ergebnis) !== '1/2' || r.schritte.ungekuerzt !== '6/12') {
  fehler.push(`0,75 × 2/3: ${r ? `${b(r.ergebnis)} (ungekürzt ${r.schritte.ungekuerzt})` : 'null'} statt 1/2 (ungekürzt 6/12)`);
}

if (fehler.length) {
  console.error(`Bruchrechnung ROT: ${fehler.length} Abweichungen`);
  for (const f of fehler) console.error('  ' + f);
  process.exit(1);
}
console.log(`Bruchrechnung grün: ${text.length} Texteingaben, ${zahl.length} Zahlen, 1 Rechenbeispiel.`);
