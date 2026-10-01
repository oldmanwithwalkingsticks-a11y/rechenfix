// W150 — Prüfung der Dezimal-Umwandlung im Bruchrechner. W154: durchgehend BigInt.
// Ausführen: npx tsx scripts/verify-bruchrechnung.ts   (Exit 1 bei jeder Abweichung)
//
// Anlass: Nutzerwunsch „Dezimalzahl mal Bruch“ (Feedback 23.09.2026). Die Sollwerte sind von
// Hand gerechnet, nicht aus der Lib abgelesen; die großen Werte der Fälle 22 und 23 (W154) sind
// zusätzlich mit Pythons Ganzzahlen nachgerechnet.
//
// W154: dezimalZuBruch(number) ist entfallen. Sie nahm eine Gleitkommazahl entgegen und war mit
// der BigInt-Invariante nicht vereinbar; der Rechner liest Dezimalzahlen seit W150 ohnehin nur
// als Text (dezimalTextZuBruch). Die Grenze von neun Nachkommastellen ist mit BigInt entfallen,
// deshalb ergibt „0,3333333333“ jetzt einen Bruch statt null.
import {
  dezimalTextZuBruch,
  ganzzahlText,
  berechneBrueche,
  type Bruch,
} from '../lib/berechnungen/bruchrechnung';

const fehler: string[] = [];
const b = (x: Bruch | null | undefined) => (x ? `${x.zaehler}/${x.nenner}` : 'null');
const B = (x: number | string) => BigInt(x);

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
  ['0,3333333333', '3333333333/10000000000', '3333333333/10000000000'],
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

// Ganzzahlfelder: Text direkt in BigInt (W154). Leeres Feld = 0 wie bisher.
const ganz: [string, string | null][] = [
  ['12', '12'], ['', '0'], ['-7', '-7'], ['1.000', '1000'], ['1,0', '1'],
  ['1,5', null], ['12abc', null], ['1e3', null],
  ['12345678901234567', '12345678901234567'],
];
for (const [ein, soll] of ganz) {
  const r = ganzzahlText(ein);
  const ist = r === null ? null : String(r);
  if (ist !== soll) fehler.push(`ganzzahlText(${JSON.stringify(ein)}): ${ist} statt ${soll}`);
}

// Rechenbeispiel aus W150: 0,75 × 2/3
const r = berechneBrueche({ zaehler: B(3), nenner: B(4) }, '×', { zaehler: B(2), nenner: B(3) });
if (!r || b(r.ergebnis) !== '1/2' || r.schritte.ungekuerzt !== '6/12') {
  fehler.push(`0,75 × 2/3: ${r ? `${b(r.ergebnis)} (ungekürzt ${r.schritte.ungekuerzt})` : 'null'} statt 1/2 (ungekürzt 6/12)`);
}

// Fall 22 (W154): lief bis W153 über Number und ergab 0/1.
const r22 = berechneBrueche(
  { zaehler: B('999999999'), nenner: B('1000000000') }, '-', { zaehler: B('999999998'), nenner: B('999999999') },
);
if (!r22 || b(r22.ergebnis) !== '1/999999999000000000' || String(r22.zwischen.hauptnenner) !== '999999999000000000'
    || String(r22.zwischen.zaehler1) !== '999999998000000001' || String(r22.zwischen.zaehler2) !== '999999998000000000') {
  fehler.push(`999999999/1000000000 − 999999998/999999999: ${r22 ? b(r22.ergebnis) : 'null'} statt 1/999999999000000000`);
}

// Fall 23 (W154): Eingabe über den Textleser, ohne Number-Umweg.
const z23a = ganzzahlText('12345678901234567');
const z23b = ganzzahlText('98765432109876543');
const r23 = z23a !== null && z23b !== null
  ? berechneBrueche({ zaehler: z23a, nenner: B(1) }, '×', { zaehler: z23b, nenner: B(1) })
  : null;
if (!r23 || b(r23.ergebnis) !== '1219326311370217861743636654061881/1') {
  fehler.push(`12345678901234567 × 98765432109876543: ${r23 ? b(r23.ergebnis) : 'null'} statt 1219326311370217861743636654061881/1`);
}

if (fehler.length) {
  console.error(`Bruchrechnung ROT: ${fehler.length} Abweichungen`);
  for (const f of fehler) console.error('  ' + f);
  process.exit(1);
}
console.log(`Bruchrechnung grün: ${text.length} Texteingaben, ${ganz.length} Ganzzahlfelder, 3 Rechenbeispiele.`);
