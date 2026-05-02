/**
 * Verify-Script für lib/berechnungen/mwst.ts (Welle-4 M1a, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - UStG § 12 (Steuersätze): https://www.gesetze-im-internet.de/ustg/__12.html
 *     - Abs. 1: Regelsteuersatz 19 %
 *     - Abs. 2: Ermäßigter Steuersatz 7 %
 *     - Abs. 3: Sondersätze 0 % (PV-Anlagen seit 01.01.2023)
 *   - Gastronomie-Mehrwertsteuer wieder 19 % seit 01.01.2024
 *     (Befristete Senkung auf 7 % aus 2020/Pandemie ausgelaufen).
 *
 * Test-Strategie: Manuell durchgerechnete Soll-Werte aus den Gesetzes-Sätzen,
 * cent-genau (Tolerance 0.005 €). Direction-Symmetrie zwischen netto→brutto
 * und brutto→netto wird per Round-Trip-Test geprüft.
 *
 * Ausführen: npx tsx scripts/verify-mwst.ts
 */

import {
  berechneNettoZuBrutto,
  berechneBruttoZuNetto,
  berechneMultiMwSt,
  MWST_REGULAER,
  MWST_ERMAESSIGT,
  BRUTTO_FAKTOR_REGULAER,
} from '../lib/berechnungen/mwst';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number; // Default 0.005 € (Cent-genau)
};

const cases: TestCase[] = [];

// === Cluster A: Konstanten gegen UStG § 12 ===

cases.push(
  { name: 'Konstante MWST_REGULAER (§ 12 Abs. 1)',     actual: MWST_REGULAER,     expected: 0.19, tolerance: 0.0001 },
  { name: 'Konstante MWST_ERMAESSIGT (§ 12 Abs. 2)',   actual: MWST_ERMAESSIGT,   expected: 0.07, tolerance: 0.0001 },
  { name: 'Konstante BRUTTO_FAKTOR_REGULAER',          actual: BRUTTO_FAKTOR_REGULAER, expected: 1.19, tolerance: 0.0001 },
);

// === Cluster B: Regelsteuersatz 19 % — netto → brutto ===
//
// Manuell durchgerechnet:
//   100,00 € × 0,19 = 19,00 € MwSt → 119,00 € Brutto
//   1.000,00 × 0,19 = 190,00 → 1.190,00
//   0,49 × 0,19 = 0,0931 → gerundet 0,09 → 0,58
//   99,99 × 0,19 = 18,9981 → gerundet 19,00 → 118,99
//   100.000,00 × 0,19 = 19.000,00 → 119.000,00

const ntoB = (netto: number, satz: number) => berechneNettoZuBrutto(netto, satz);

cases.push(
  { name: 'B-01 N→B: 100,00 € @ 19 % → MwSt',       actual: ntoB(100, 19).mwstBetrag, expected: 19.00 },
  { name: 'B-01 N→B: 100,00 € @ 19 % → Brutto',     actual: ntoB(100, 19).brutto,     expected: 119.00 },
  { name: 'B-02 N→B: 1.000,00 € @ 19 % → MwSt',     actual: ntoB(1000, 19).mwstBetrag, expected: 190.00 },
  { name: 'B-02 N→B: 1.000,00 € @ 19 % → Brutto',   actual: ntoB(1000, 19).brutto,    expected: 1190.00 },
  { name: 'B-03 N→B: 0,49 € @ 19 % → MwSt (round)',  actual: ntoB(0.49, 19).mwstBetrag, expected: 0.09 },
  { name: 'B-03 N→B: 0,49 € @ 19 % → Brutto',        actual: ntoB(0.49, 19).brutto,    expected: 0.58 },
  { name: 'B-04 N→B: 99,99 € @ 19 % → MwSt (round)', actual: ntoB(99.99, 19).mwstBetrag, expected: 19.00 },
  { name: 'B-04 N→B: 99,99 € @ 19 % → Brutto',       actual: ntoB(99.99, 19).brutto,    expected: 118.99 },
  { name: 'B-05 N→B: 100.000,00 € @ 19 % → MwSt',    actual: ntoB(100000, 19).mwstBetrag, expected: 19000.00 },
  { name: 'B-05 N→B: 100.000,00 € @ 19 % → Brutto',  actual: ntoB(100000, 19).brutto,    expected: 119000.00 },
);

// === Cluster C: Regelsteuersatz 19 % — brutto → netto ===
//
//   119,00 / 1,19 = 100,00 → MwSt 19,00
//   1.000,00 / 1,19 = 840,3361... → gerundet 840,34 → MwSt 159,66
//   100.000,00 / 1,19 = 84.033,613... → gerundet 84.033,61 → MwSt 15.966,39

const btoN = (brutto: number, satz: number) => berechneBruttoZuNetto(brutto, satz);

cases.push(
  { name: 'C-01 B→N: 119,00 € @ 19 % → Netto',         actual: btoN(119, 19).netto,      expected: 100.00 },
  { name: 'C-01 B→N: 119,00 € @ 19 % → MwSt',          actual: btoN(119, 19).mwstBetrag, expected: 19.00 },
  { name: 'C-02 B→N: 1.000,00 € @ 19 % → Netto',       actual: btoN(1000, 19).netto,      expected: 840.34 },
  { name: 'C-02 B→N: 1.000,00 € @ 19 % → MwSt',        actual: btoN(1000, 19).mwstBetrag, expected: 159.66 },
  { name: 'C-03 B→N: 100.000,00 € @ 19 % → Netto',     actual: btoN(100000, 19).netto,    expected: 84033.61 },
  { name: 'C-03 B→N: 100.000,00 € @ 19 % → MwSt',      actual: btoN(100000, 19).mwstBetrag, expected: 15966.39 },
);

// === Cluster D: Ermäßigter Steuersatz 7 % ===
//
//   100,00 × 0,07 = 7,00 → 107,00
//   1.000,00 × 0,07 = 70,00 → 1.070,00
//   49,99 × 0,07 = 3,4993 → 3,50 → 53,49
//   107,00 / 1,07 = 100,00 → MwSt 7,00

cases.push(
  { name: 'D-01 N→B: 100,00 € @ 7 % → MwSt',         actual: ntoB(100, 7).mwstBetrag, expected: 7.00 },
  { name: 'D-01 N→B: 100,00 € @ 7 % → Brutto',       actual: ntoB(100, 7).brutto,     expected: 107.00 },
  { name: 'D-02 N→B: 1.000,00 € @ 7 % → MwSt',       actual: ntoB(1000, 7).mwstBetrag, expected: 70.00 },
  { name: 'D-02 N→B: 1.000,00 € @ 7 % → Brutto',     actual: ntoB(1000, 7).brutto,     expected: 1070.00 },
  { name: 'D-03 N→B: 49,99 € @ 7 % → MwSt (round)',  actual: ntoB(49.99, 7).mwstBetrag, expected: 3.50 },
  { name: 'D-03 N→B: 49,99 € @ 7 % → Brutto',        actual: ntoB(49.99, 7).brutto,    expected: 53.49 },
  { name: 'D-04 B→N: 107,00 € @ 7 % → Netto',        actual: btoN(107, 7).netto,       expected: 100.00 },
  { name: 'D-04 B→N: 107,00 € @ 7 % → MwSt',         actual: btoN(107, 7).mwstBetrag,  expected: 7.00 },
);

// === Cluster E: 0 %-Sondersatz § 12 Abs. 3 (PV-Anlagen) ===
//
//   1.000,00 × 0,00 = 0,00 → 1.000,00
//   1.000,00 / 1,00 = 1.000,00 → MwSt 0,00

cases.push(
  { name: 'E-01 N→B: 1.000,00 € @ 0 % (PV) → MwSt',    actual: ntoB(1000, 0).mwstBetrag, expected: 0.00 },
  { name: 'E-01 N→B: 1.000,00 € @ 0 % (PV) → Brutto',  actual: ntoB(1000, 0).brutto,     expected: 1000.00 },
  { name: 'E-02 B→N: 1.000,00 € @ 0 % (PV) → Netto',   actual: btoN(1000, 0).netto,      expected: 1000.00 },
  { name: 'E-02 B→N: 1.000,00 € @ 0 % (PV) → MwSt',    actual: btoN(1000, 0).mwstBetrag, expected: 0.00 },
);

// === Cluster F: Edge-Cases ===
//
//   Null-Input: 0 → 0 / 0
//   Direction-Symmetrie: Netto 100 → Brutto 119,00 → Netto 100,00 (Round-Trip)

cases.push(
  { name: 'F-01 Null-Input N→B → MwSt = 0',        actual: ntoB(0, 19).mwstBetrag, expected: 0.00 },
  { name: 'F-01 Null-Input N→B → Brutto = 0',      actual: ntoB(0, 19).brutto,     expected: 0.00 },
  { name: 'F-02 Null-Input B→N → Netto = 0',       actual: btoN(0, 19).netto,      expected: 0.00 },
  { name: 'F-03 Round-Trip 100 N→B→N (19 %)',      actual: btoN(ntoB(100, 19).brutto, 19).netto, expected: 100.00 },
);

// === Cluster G: Multi-MwSt-Aggregat ===
//
//   2 Zeilen: 100 € @ 19 % + 50 € @ 7 %
//   Zeile 1: MwSt 19,00, Brutto 119,00
//   Zeile 2: MwSt 3,50,  Brutto 53,50
//   Summe:   Netto 150,00, MwSt 22,50, Brutto 172,50

const multi = berechneMultiMwSt([
  { bezeichnung: 'Pos 1', netto: 100, mwstSatz: 19 },
  { bezeichnung: 'Pos 2', netto: 50,  mwstSatz: 7  },
]);

cases.push(
  { name: 'G-01 Multi: summeNetto',    actual: multi.summeNetto,  expected: 150.00 },
  { name: 'G-01 Multi: summeMwSt',     actual: multi.summeMwSt,   expected: 22.50 },
  { name: 'G-01 Multi: summeBrutto',   actual: multi.summeBrutto, expected: 172.50 },
  { name: 'G-01 Multi: Z1 mwstBetrag', actual: multi.zeilen[0].mwstBetrag, expected: 19.00 },
  { name: 'G-01 Multi: Z2 mwstBetrag', actual: multi.zeilen[1].mwstBetrag, expected: 3.50 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  const tol = c.tolerance ?? 0.005;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(
    `  ${status} ${c.name.padEnd(54)} ist ${String(c.actual).padStart(14)}  soll ${String(c.expected).padStart(14)}  Δ ${delta.toFixed(4).padStart(8)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
