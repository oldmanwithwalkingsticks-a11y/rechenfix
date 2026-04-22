// Phase-P2-Verifikation Bürgergeld (Stufe-4b Prompt 121).
// Ausführen: npx tsx scripts/verify-buergergeld-p2.ts
//
// Externe Referenzen (nicht-zirkulär):
//   § 20+§ 28a SGB II / Regelbedarfsermittlungsgesetz 2025: Regelsätze 2026
//     unverändert durch Besitzschutz — BMAS-Bekanntmachung 10/2025.
//   § 21 SGB II: Mehrbedarfe 17 % / 36 % / 12 %/Kind mit 60 %-Deckel / 35 %
//   § 21 Abs. 7 SGB II + Warmwasser-VO: 2,3 % / 1,4 % / 1,2 % / 0,8 %
//   § 11b SGB II: Einkommensfreibetrag-Staffel 100/520/1000/1200-1500

import { berechneBuergergeld, berechneMehrbedarfe } from '../lib/berechnungen/buergergeld';
import {
  BUERGERGELD_2026_H1,
  BUERGERGELD_2026_H2,
  getAktuelleBuergergeldParameter,
} from '../lib/berechnungen/buergergeld-parameter';

interface Fall { name: string; actual: number; expected: number; tol?: number; quelle: string; }
const cases: Fall[] = [];

// === Regelsätze 2026 (Nullrunde durch Besitzschutz § 28a SGB XII) ===
cases.push(
  { name: 'RBS 1 Alleinstehend = 563',         actual: BUERGERGELD_2026_H1.regelsaetze.rbs1_alleinstehend,       expected: 563, quelle: '§ 20 SGB II + § 28a-Besitzschutz' },
  { name: 'RBS 2 Paar/Person = 506',           actual: BUERGERGELD_2026_H1.regelsaetze.rbs2_paarProPerson,       expected: 506, quelle: '§ 20 SGB II' },
  { name: 'RBS 3 18-24 bei Eltern = 451',      actual: BUERGERGELD_2026_H1.regelsaetze.rbs3_volljaehrigBeiEltern, expected: 451, quelle: '§ 20 SGB II' },
  { name: 'RBS 4 Jugend 14-17 = 471',          actual: BUERGERGELD_2026_H1.regelsaetze.rbs4_jugendlich_14_17,     expected: 471, quelle: '§ 20 SGB II' },
  { name: 'RBS 5 Kind 6-13 = 390',             actual: BUERGERGELD_2026_H1.regelsaetze.rbs5_kind_6_13,            expected: 390, quelle: '§ 20 SGB II' },
  { name: 'RBS 6 Kind 0-5 = 357',              actual: BUERGERGELD_2026_H1.regelsaetze.rbs6_kind_0_5,             expected: 357, quelle: '§ 20 SGB II' },
);

// === Testfälle aus welle1-stufe4b-testfaelle.md ===

// BG-01: alleinstehend, 450 Miete, kein Einkommen → Regelsatz 563 + KdU 450
const bg01 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 450, heizkosten: 0, einkommen: 0, vermoegen: 0,
})!;
cases.push({ name: 'BG-01 alleinstehend, Miete 450, 0 € Einkommen',
  actual: bg01.gesamtAnspruch, expected: 1013, tol: 0.01, quelle: 'welle1-stufe4b-testfaelle.md BG-01' });

// BG-MB: alleinstehend, 1 Kind 10 J., Miete 600, Alleinerziehend
// Soll: 563 + 67,56 (36 % Alleinerz.-MB) + 390 + 600 = 1.620,56
const bgMB = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [{ alter: '6-13' }],
  warmmiete: 600, heizkosten: 0, einkommen: 0, vermoegen: 0,
  mehrbedarfe: { alleinerziehend: true },
})!;
cases.push({ name: 'BG-MB Alleinerz. + 1 Kind 10 J. = 1.620,56',
  actual: bgMB.gesamtAnspruch, expected: 1620.56, tol: 0.02, quelle: '§ 21 Abs. 3 Nr. 1 SGB II (36 %)' });
cases.push({ name: 'BG-MB: Mehrbedarf-Anteil = 67,56 (36 % von 563)',
  actual: bgMB.mehrbedarfe.alleinerziehend, expected: 67.56, tol: 0.02, quelle: '§ 21 Abs. 3 Nr. 1 SGB II' });

// BG-MB-2: Alleinerziehend mit 1 Kind 4 J. (< 7 J.) → Nr. 1 Voraussetzung erfüllt, 36 %
const bgMB2 = berechneMehrbedarfe(
  { alleinerziehend: true }, 563, [{ alter: '0-5' }], BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-MB-2 Alleinerz. + 1 Kind 4 J. Nr.1 greift 36 %',
  actual: bgMB2.alleinerziehend, expected: 202.68, tol: 0.02, quelle: '§ 21 Abs. 3 Nr. 1 Alt. 1 SGB II' });

// BG-MB-3: Alleinerziehend mit 4 Kindern (2×<7, 2×12) → max(36 %, 4×12 %=48 %) = 48 %
const bgMB3 = berechneMehrbedarfe(
  { alleinerziehend: true }, 563,
  [{ alter: '0-5' }, { alter: '0-5' }, { alter: '6-13' }, { alter: '6-13' }],
  BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-MB-3 Alleinerz. + 4 Kinder = 48 % (Nr. 2 > Nr. 1)',
  actual: bgMB3.alleinerziehend, expected: Math.round(563 * 0.48 * 100) / 100, tol: 0.02,
  quelle: '§ 21 Abs. 3 Nr. 2 SGB II (12 % × 4)' });

// BG-MB-4: Alleinerziehend mit 6 Kindern → max(36, 72 %) gedeckelt auf 60 %
const bgMB4 = berechneMehrbedarfe(
  { alleinerziehend: true }, 563,
  [{ alter: '0-5' }, { alter: '0-5' }, { alter: '0-5' }, { alter: '6-13' }, { alter: '6-13' }, { alter: '14-17' }],
  BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-MB-4 Alleinerz. + 6 Kinder = 60 %-Deckel',
  actual: bgMB4.alleinerziehend, expected: Math.round(563 * 0.60 * 100) / 100, tol: 0.02,
  quelle: '§ 21 Abs. 3 S. 3 SGB II (60 %-Deckel)' });

// BG-SCHW: schwanger in 20. SSW, alleinstehend → 17 % = 95,71
const bgSchw = berechneMehrbedarfe(
  { schwangerschaftAb13SSW: true }, 563, [], BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-SCHW Schwangerschaft ab 13. SSW = 17 %',
  actual: bgSchw.schwangerschaft, expected: 95.71, tol: 0.02, quelle: '§ 21 Abs. 2 SGB II' });

// BG-WW: alleinstehend, 1 Kind 5 J., Warmwasser dezentral
// Soll: 563×0,023 + 357×0,008 = 12,95 + 2,86 = 15,81 €
const bgWW = berechneMehrbedarfe(
  { warmwasserDezentral: true }, 563, [{ alter: '0-5' }], BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-WW Warmwasser alleinstehend+Kind 5 = 15,81',
  actual: bgWW.warmwasser, expected: Math.round((563 * 0.023 + 357 * 0.008) * 100) / 100,
  tol: 0.02, quelle: '§ 21 Abs. 7 SGB II' });

// BG-BEH: Behinderung + Eingliederungshilfe alleinstehend → 35 % = 197,05 €
const bgBeh = berechneMehrbedarfe(
  { behinderungEingliederungshilfe: true }, 563, [], BUERGERGELD_2026_H1,
);
cases.push({ name: 'BG-BEH Behinderung + Teilhabe = 35 %',
  actual: bgBeh.behinderung, expected: Math.round(563 * 0.35 * 100) / 100, tol: 0.02,
  quelle: '§ 21 Abs. 4 SGB II' });

// BG-MB Null-Fall: keine Mehrbedarfe
const bgNull = berechneMehrbedarfe({}, 563, [], BUERGERGELD_2026_H1);
cases.push({ name: 'Keine Mehrbedarfe → Gesamt 0',
  actual: bgNull.gesamt, expected: 0, tol: 0.001, quelle: 'Logik: alle Inputs false/undefined' });

// === Stichtag-Switch ===
// BG-STICHTAG Juni: H1 ("Bürgergeld"), Juli: H2 ("Grundsicherungsgeld")
const juni = getAktuelleBuergergeldParameter(new Date('2026-06-15'));
const juli = getAktuelleBuergergeldParameter(new Date('2026-07-15'));
cases.push({
  name: 'BG-STICHTAG 15.06.2026 → Bezeichnung "Bürgergeld"',
  actual: juni.bezeichnung === 'Bürgergeld' ? 1 : 0, expected: 1, quelle: 'BUERGERGELD_2026_H1.bezeichnung',
});
cases.push({
  name: 'BG-STICHTAG 15.07.2026 → Bezeichnung "Grundsicherungsgeld..."',
  actual: juli.bezeichnung.startsWith('Grundsicherungsgeld') ? 1 : 0, expected: 1,
  quelle: 'BUERGERGELD_2026_H2.bezeichnung (Skeleton, Gesetzestext offen)',
});
// Parameter-Werte H1 == H2 (Skeleton)
cases.push({
  name: 'BG-STICHTAG H1.rbs1 === H2.rbs1 (Skeleton-Invariante)',
  actual: BUERGERGELD_2026_H1.regelsaetze.rbs1_alleinstehend === BUERGERGELD_2026_H2.regelsaetze.rbs1_alleinstehend ? 1 : 0,
  expected: 1, quelle: 'H2 ist Skeleton ohne inhaltliche Parameter-Abweichung',
});

let passed = 0, failed = 0;
console.log('=== Verify Bürgergeld P2 (Stufe-4b Prompt 121) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(58)} ist ${c.actual.toString().padStart(9)} / soll ${c.expected.toString().padStart(9)} / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
