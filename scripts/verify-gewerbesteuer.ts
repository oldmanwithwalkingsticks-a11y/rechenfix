/**
 * Verify-Script für lib/berechnungen/gewerbesteuer.ts (Welle-4 M1a, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - GewStG § 11 (Steuermesszahl, Freibetrag):
 *     https://www.gesetze-im-internet.de/gewstg/__11.html
 *     - Abs. 1 Nr. 1: Freibetrag 24.500 € für natürliche Personen + Personengesellschaften
 *     - Abs. 1 Satz 3: Abrundung Gewerbeertrag auf volle 100 €
 *     - Abs. 2: Steuermesszahl 3,5 %
 *   - GewStG § 16 (Hebesatz, Mindesthebesatz 200 %):
 *     https://www.gesetze-im-internet.de/gewstg/__16.html
 *   - EStG § 35 (Steuerermäßigung bei gewerblichen Einkünften — 4,0-faches
 *     des Steuermessbetrags, nur bei Personengesellschaften):
 *     https://www.gesetze-im-internet.de/estg/__35.html
 *
 * Hebesatz-Disziplin: Konkrete Hebesätze (z. B. 490 % für München) sind
 * Test-Annahmen, keine SSOT-Werte. Verify testet die Berechnungs-Mathematik,
 * nicht die Hebesatz-Aktualität (UI-Eingabe).
 *
 * Ausführen: npx tsx scripts/verify-gewerbesteuer.ts
 */

import {
  berechneGewerbesteuer,
  type Rechtsform,
} from '../lib/berechnungen/gewerbesteuer';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number; // Default 0.005 € (Cent-genau)
};

const cases: TestCase[] = [];

// Helper
const calc = (
  gewinn: number,
  rechtsform: Rechtsform,
  hebesatz: number,
  hinzu = 0,
  kuerz = 0,
) => berechneGewerbesteuer({ gewinn, rechtsform, hebesatz, hinzurechnungen: hinzu, kuerzungen: kuerz });

// === Cluster A: Grundformel (PG, Hebesatz 400 %) ===
//
// Personengesellschaft, Gewinn 100.000 €, Hebesatz 400 %:
//   Gewerbeertrag       = 100.000 - 24.500 = 75.500 €
//   Abgerundet auf 100  = 75.500 €
//   Steuermessbetrag    = 75.500 × 3,5 % = 2.642,50 €
//   Gewerbesteuer       = 2.642,50 × 400 / 100 = 10.570,00 €
//   ESt-Anrechnung      = 2.642,50 × min(4,0; 4,0) = 10.570,00 € (gedeckelt auf GewSt)
//   effektive Belastung = 0,00 €

const a1 = calc(100_000, 'personengesellschaft', 400);
cases.push(
  { name: 'A-01 PG 100k @ 400%: Gewerbeertrag',     actual: a1.gewerbeertragAbgerundet, expected: 75500 },
  { name: 'A-01 PG 100k @ 400%: Steuermessbetrag',  actual: a1.steuermessbetrag,         expected: 2642.50 },
  { name: 'A-01 PG 100k @ 400%: Gewerbesteuer',     actual: a1.gewerbesteuer,            expected: 10570.00 },
  { name: 'A-01 PG 100k @ 400%: ESt-Anrechnung',    actual: a1.estAnrechnung,            expected: 10570.00 },
  { name: 'A-01 PG 100k @ 400%: effektive Belast.', actual: a1.effektiveBelastung,       expected: 0.00 },
);

// München-Hebesatz 490 %, PG, Gewinn 50.000 €:
//   Gewerbeertrag       = 50.000 - 24.500 = 25.500 €
//   Steuermessbetrag    = 25.500 × 3,5 % = 892,50 €
//   Gewerbesteuer       = 892,50 × 490 / 100 = 4.373,25 €
//   ESt-Anrechnung      = 892,50 × min(4,9; 4,0) = 892,50 × 4,0 = 3.570,00 €
//                          (Anrechnung ≤ Gewerbesteuer → 3.570,00 € bleibt)
//   effektiv            = 4.373,25 - 3.570,00 = 803,25 €

const a2 = calc(50_000, 'personengesellschaft', 490);
cases.push(
  { name: 'A-02 PG 50k @ 490% (München): GewSt',    actual: a2.gewerbesteuer,      expected: 4373.25 },
  { name: 'A-02 PG 50k @ 490%: ESt-Anrechnung',     actual: a2.estAnrechnung,      expected: 3570.00 },
  { name: 'A-02 PG 50k @ 490%: effektive Belast.',  actual: a2.effektiveBelastung, expected: 803.25 },
);

// Mindesthebesatz 200 % (§ 16 Abs. 4 GewStG), PG, Gewinn 30.000 €:
//   Gewerbeertrag    = 30.000 - 24.500 = 5.500 €
//   Steuermessbetrag = 5.500 × 3,5 % = 192,50 €
//   Gewerbesteuer    = 192,50 × 200 / 100 = 385,00 €
//   ESt-Anrechnung   = 192,50 × min(2,0; 4,0) = 385,00 € (gedeckelt auf GewSt)
//   effektiv         = 0,00 €

const a3 = calc(30_000, 'personengesellschaft', 200);
cases.push(
  { name: 'A-03 PG 30k @ 200% (min): GewSt',        actual: a3.gewerbesteuer,      expected: 385.00 },
  { name: 'A-03 PG 30k @ 200%: ESt-Anrechnung',     actual: a3.estAnrechnung,      expected: 385.00 },
  { name: 'A-03 PG 30k @ 200%: effektive Belast.',  actual: a3.effektiveBelastung, expected: 0.00 },
);

// === Cluster B: Kapitalgesellschaft (kein Freibetrag, keine Anrechnung) ===
//
// GmbH, Gewinn 50.000 €, Hebesatz 400 %:
//   Freibetrag       = 0 (keine PG)
//   Gewerbeertrag    = 50.000 €
//   Steuermessbetrag = 50.000 × 3,5 % = 1.750,00 €
//   Gewerbesteuer    = 1.750 × 400 / 100 = 7.000,00 €
//   ESt-Anrechnung   = 0 (keine § 35-Anrechnung bei KapGes)
//   effektiv         = 7.000,00 €

const b1 = calc(50_000, 'kapitalgesellschaft', 400);
cases.push(
  { name: 'B-01 GmbH 50k @ 400%: Freibetrag',        actual: b1.freibetrag,         expected: 0 },
  { name: 'B-01 GmbH 50k @ 400%: Gewerbesteuer',     actual: b1.gewerbesteuer,      expected: 7000.00 },
  { name: 'B-01 GmbH 50k @ 400%: ESt-Anrechnung',    actual: b1.estAnrechnung,      expected: 0.00 },
  { name: 'B-01 GmbH 50k @ 400%: effektive Belast.', actual: b1.effektiveBelastung, expected: 7000.00 },
  { name: 'B-01 GmbH: hatAnrechnung = false',         actual: b1.hatAnrechnung ? 1 : 0, expected: 0 },
);

// GmbH 24.000 € (unter PG-Freibetrag, aber keine Wirkung):
//   Gewerbeertrag    = 24.000 €
//   Steuermessbetrag = 840,00 €
//   Gewerbesteuer    = 3.360,00 €

const b2 = calc(24_000, 'kapitalgesellschaft', 400);
cases.push(
  { name: 'B-02 GmbH 24k @ 400%: GewSt (kein FB)',  actual: b2.gewerbesteuer, expected: 3360.00 },
);

// === Cluster C: Freibetrag-Schwelle § 11 Abs. 1 Nr. 1 GewStG ===
//
// PG, Gewinn 24.499 €, Hebesatz 400 %:
//   Gewerbeertrag = max(0; 24.499 - 24.500) = 0
//   Gewerbesteuer = 0

const c1 = calc(24_499, 'personengesellschaft', 400);
cases.push(
  { name: 'C-01 PG 24.499 € (knapp unter FB): GewSt = 0', actual: c1.gewerbesteuer, expected: 0 },
);

// PG, Gewinn 24.500 €, Hebesatz 400 %:
const c2 = calc(24_500, 'personengesellschaft', 400);
cases.push(
  { name: 'C-02 PG 24.500 € (exakt FB): GewSt = 0',       actual: c2.gewerbesteuer, expected: 0 },
);

// PG, Gewinn 24.501 €, Hebesatz 400 %:
//   Gewerbeertrag (vor Abrundung)  = 1
//   Abgerundet auf volle 100       = 0
//   Gewerbesteuer                  = 0

const c3 = calc(24_501, 'personengesellschaft', 400);
cases.push(
  { name: 'C-03 PG 24.501 € (Abrundung greift): GewSt = 0', actual: c3.gewerbesteuer, expected: 0 },
);

// PG, Gewinn 24.600 €, Hebesatz 400 %:
//   Gewerbeertrag (vor Abrundung)  = 100
//   Abgerundet                     = 100
//   Steuermessbetrag               = 100 × 3,5 % = 3,50 €
//   Gewerbesteuer                  = 3,50 × 4 = 14,00 €

const c4 = calc(24_600, 'personengesellschaft', 400);
cases.push(
  { name: 'C-04 PG 24.600 € (knapp über FB): GewSt',       actual: c4.gewerbesteuer, expected: 14.00 },
);

// === Cluster D: Hinzurechnungen + Kürzungen §§ 8, 9 GewStG ===
//
// PG, Gewinn 80.000 €, Hinzurechnungen 5.000, Hebesatz 400 %:
//   Gewerbeertrag    = 80.000 + 5.000 - 0 - 24.500 = 60.500 €
//   Steuermessbetrag = 60.500 × 3,5 % = 2.117,50 €
//   Gewerbesteuer    = 2.117,50 × 4 = 8.470,00 €
//   Anrechnung       = 2.117,50 × 4,0 = 8.470,00 € (gedeckelt = 8.470,00 €)
//   effektiv         = 0,00 €

const d1 = calc(80_000, 'personengesellschaft', 400, 5000, 0);
cases.push(
  { name: 'D-01 PG +5k Hinzu @ 400%: Gewerbesteuer', actual: d1.gewerbesteuer,      expected: 8470.00 },
  { name: 'D-01 PG +5k Hinzu @ 400%: effektiv',      actual: d1.effektiveBelastung, expected: 0.00 },
);

// PG, Gewinn 80.000 €, Kürzungen 5.000, Hebesatz 400 %:
//   Gewerbeertrag    = 80.000 - 5.000 - 24.500 = 50.500 €
//   Steuermessbetrag = 50.500 × 3,5 % = 1.767,50 €
//   Gewerbesteuer    = 1.767,50 × 4 = 7.070,00 €

const d2 = calc(80_000, 'personengesellschaft', 400, 0, 5000);
cases.push(
  { name: 'D-02 PG -5k Kürzung @ 400%: Gewerbesteuer', actual: d2.gewerbesteuer, expected: 7070.00 },
);

// === Cluster E: Edge-Cases ===
//
// Null-Gewinn:
const e1 = calc(0, 'personengesellschaft', 400);
cases.push(
  { name: 'E-01 PG 0 € @ 400%: GewSt = 0',           actual: e1.gewerbesteuer, expected: 0 },
);

// Negativ-Gewinn (Lib soll auf 0 floor'n):
const e2 = calc(-10_000, 'personengesellschaft', 400);
cases.push(
  { name: 'E-02 PG -10k € @ 400%: GewSt = 0',         actual: e2.gewerbesteuer, expected: 0 },
);

// Hoher Hebesatz (Anrechnung kappt bei 4,0):
//   PG, Gewinn 50.000 €, Hebesatz 600 %:
//     Gewerbeertrag    = 25.500 €
//     Steuermessbetrag = 892,50 €
//     Gewerbesteuer    = 892,50 × 6 = 5.355,00 €
//     Anrechnung       = 892,50 × min(6,0; 4,0) = 892,50 × 4,0 = 3.570,00 €
//     effektiv         = 5.355,00 - 3.570,00 = 1.785,00 €
const e3 = calc(50_000, 'personengesellschaft', 600);
cases.push(
  { name: 'E-03 PG 50k @ 600%: Gewerbesteuer',       actual: e3.gewerbesteuer,      expected: 5355.00 },
  { name: 'E-03 PG 50k @ 600%: Anrechnung @ 4,0-Cap',actual: e3.estAnrechnung,      expected: 3570.00 },
  { name: 'E-03 PG 50k @ 600%: effektiv',            actual: e3.effektiveBelastung, expected: 1785.00 },
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
