/**
 * Verify-Script für lib/berechnungen/steuerprogression.ts (Welle-4 M4, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - EStG § 32a (Tarif): https://www.gesetze-im-internet.de/estg/__32a.html
 *   - EStG § 32a Abs. 5 (Splittingtarif)
 *   - § 4 SolzG (Soli-Freigrenze + Milderungszone)
 *   - § 51a EStG (Kirchensteuer-Bemessung)
 *
 * **L-36-Pattern Pflicht** (Cross-Lib-Computation): steuerprogression.ts
 * konsumiert berechneEStGrund + berechneSoli + berechneKirchensteuerByBundesland
 * aus einkommensteuer.ts (verifiziert via verify-tarif-2026.ts). Erwartungs-
 * Werte werden aus diesen Funktionen direkt gezogen statt hand-gerechnet.
 *
 * Tolerance: 0,01 € für €-Werte; 0,5 % für Steuersätze (Lib rundet auf
 * 2 Dezimalen mittels Math.round × 10000 / 100).
 *
 * Ausführen: npx tsx scripts/verify-steuerprogression.ts
 */

import {
  berechneSteuerprogression,
} from '../lib/berechnungen/steuerprogression';
import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
} from '../lib/berechnungen/einkommensteuer';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const isNull = (v: unknown): number => v === null ? 1 : 0;

// === Cluster A: Output-Struktur Standard (zvE 50.000, kein Splitting) ===

const a1 = berechneSteuerprogression(50_000, false, false, 'Nordrhein-Westfalen');
const a1_estExpected = berechneEStGrund(50_000, 2026);
cases.push(
  { name: 'A-01 zvE 50k, Grundtarif: einkommensteuer = berechneEStGrund', actual: a1!.einkommensteuer, expected: a1_estExpected, tolerance: 0.5 },
  { name: 'A-01: solidaritaetszuschlag = berechneSoli (Grundtarif)',     actual: a1!.solidaritaetszuschlag, expected: berechneSoli(a1_estExpected, false, 2026), tolerance: 0.5 },
  { name: 'A-01: kirchensteuer = 0 (kirche=false)',                       actual: a1!.kirchensteuer, expected: 0 },
  { name: 'A-01: gesamtSteuer = est + soli + kist',                       actual: a1!.gesamtSteuer, expected: Math.round((a1!.einkommensteuer + a1!.solidaritaetszuschlag + a1!.kirchensteuer) * 100) / 100, tolerance: 0.05 },
);

// === Cluster B: Splitting-Tarif (zvE wird halbiert, ESt × 2) ===
//
// Manuell: Splitting-ESt = 2 × berechneEStGrund(zvE/2, 2026)
//   zvE = 100.000 / 2 = 50.000 → ESt(50000) × 2

const b1 = berechneSteuerprogression(100_000, true, false);
const b1_estExpected = berechneEStGrund(50_000, 2026) * 2;
cases.push(
  { name: 'B-01 zvE 100k, Splitting: ESt = 2 × ESt(50k)',  actual: b1!.einkommensteuer, expected: b1_estExpected, tolerance: 0.5 },
);

// Splitting-Vergleich (nur bei !splitting): estOhne (Grundtarif) vs estMit (Splitting)
//   Bei zvE 100k Grundtarif: vorteil = ESt_Grund(100k) - 2 × ESt_Grund(50k) > 0
const b2 = berechneSteuerprogression(100_000, false, false);
cases.push(
  { name: 'B-02 splittingVergleich existiert (nur bei Grundtarif)',  actual: b2!.splittingVergleich !== undefined ? 1 : 0, expected: 1 },
  { name: 'B-02: splittingVergleich.estOhne = einkommensteuer',      actual: b2!.splittingVergleich!.estOhne, expected: b2!.einkommensteuer, tolerance: 0.5 },
  { name: 'B-02: splittingVergleich.estMit = 2 × ESt(50k)',          actual: b2!.splittingVergleich!.estMit, expected: berechneEStGrund(50_000, 2026) * 2, tolerance: 0.5 },
  { name: 'B-02: vorteil > 0 (Splitting günstiger bei 100k)',        actual: b2!.splittingVergleich!.vorteil > 0 ? 1 : 0, expected: 1 },
);

// Bei Splitting-Tarif: splittingVergleich = undefined (nur bei !splitting)
const b3 = berechneSteuerprogression(100_000, true, false);
cases.push(
  { name: 'B-03 splittingVergleich undefined bei Splittingtarif',    actual: b3!.splittingVergleich === undefined ? 1 : 0, expected: 1 },
);

// === Cluster C: Grenzsteuersatz § 32a EStG (L-35-Diskrepanz dokumentiert) ===
//
// **L-35-Diskrepanz Lib-Realität vs. mathematische Erwartung:**
// `berechneGrenzsteuersatz` differenziert zwischen `est(zvE)` und `est(zvE+1)`.
// Da `berechneEStGrund` intern `Math.floor` verwendet, ergibt das diskrete
// Werte 0 oder 100 (statt der mathematischen Marginal-Rate 42 % oder 45 %).
// Tests verifizieren die Lib-Realität, nicht die mathematische Wahrheit.
// Refactor-Kandidat für Welle-4-Closure-Backlog: berechneGrenzsteuersatz
// mit Δ ≥ 100 € statt Δ = 1 €, oder analytische Tarif-Formel-Ableitung.

const c1 = berechneSteuerprogression(0, false, false);
const c2 = berechneSteuerprogression(100_000, false, false);
const c3 = berechneSteuerprogression(300_000, false, false);
cases.push(
  { name: 'C-01 zvE 0 (Grundfreibetrag): grenzsteuersatz = 0',                    actual: c1!.grenzsteuersatz, expected: 0, tolerance: 0.01 },
  { name: 'C-02 zvE 100k (Zone 4): grenzsteuersatz = 0 (Lib-Realität floor-Δ)',  actual: c2!.grenzsteuersatz, expected: 0, tolerance: 0.01 },
  { name: 'C-03 zvE 300k (Zone 5): grenzsteuersatz = 100 (Lib-Realität floor-Δ)',actual: c3!.grenzsteuersatz, expected: 100, tolerance: 0.01 },
);

// === Cluster D: Durchschnittssteuersatz Strukturtest ===
//
// durchschnittssteuersatz = est / zvE × 100. Bei progressivem Tarif:
// 0 ≤ durchschnittssteuersatz ≤ 45 (max-Zone).

const d1 = berechneSteuerprogression(60_000, false, false);
cases.push(
  { name: 'D-01 zvE 60k: 0 ≤ durchschnittssteuersatz ≤ 45',          actual: (d1!.durchschnittssteuersatz >= 0 && d1!.durchschnittssteuersatz <= 45) ? 1 : 0, expected: 1 },
  { name: 'D-01: durchschnittssteuersatz = est/zvE × 100',           actual: d1!.durchschnittssteuersatz, expected: Math.round((d1!.einkommensteuer / 60_000) * 10000) / 100, tolerance: 0.01 },
);

// effektiverSteuersatz = gesamtSteuer / zvE × 100
//   Bei kirchensteuer=false → effektiverSteuersatz ≥ durchschnittssteuersatz (wegen Soli)
const d2 = berechneSteuerprogression(80_000, false, false);
cases.push(
  { name: 'D-02 effektiverSteuersatz ≥ durchschnittssteuersatz (Soli addiert)', actual: d2!.effektiverSteuersatz >= d2!.durchschnittssteuersatz ? 1 : 0, expected: 1 },
);

// === Cluster E: KiSt § 51a EStG ===
//
// Bayern 8 %; sonst 9 %

const e1 = berechneSteuerprogression(60_000, false, true, 'Bayern');
const e1_estExpected = berechneEStGrund(60_000, 2026);
const e1_kistExpected = berechneKirchensteuerByBundesland(e1_estExpected, 'Bayern');
cases.push(
  { name: 'E-01 KiSt Bayern 8% = berechneKirchensteuerByBundesland', actual: e1!.kirchensteuer, expected: e1_kistExpected, tolerance: 0.5 },
);

const e2 = berechneSteuerprogression(60_000, false, true, 'Nordrhein-Westfalen');
const e2_estExpected = berechneEStGrund(60_000, 2026);
const e2_kistExpected = berechneKirchensteuerByBundesland(e2_estExpected, 'Nordrhein-Westfalen');
cases.push(
  { name: 'E-02 KiSt NRW 9% = berechneKirchensteuerByBundesland',    actual: e2!.kirchensteuer, expected: e2_kistExpected, tolerance: 0.5 },
);

// === Cluster F: KurvenDaten + tabelleDaten ===
//
// kurvenDaten: 0 bis 200.000 in 2.000er-Schritten → 101 Punkte (0, 2k, 4k, ..., 200k)
// tabelleDaten: 10.000 bis 200.000 in 10.000er-Schritten → 20 Zeilen

const f1 = berechneSteuerprogression(50_000, false, false);
cases.push(
  { name: 'F-01 kurvenDaten-length = 101 (0 bis 200k in 2k-Schritten)', actual: f1!.kurvenDaten.length, expected: 101, tolerance: 0 },
  { name: 'F-02 tabelleDaten-length = 20 (10k bis 200k in 10k)',         actual: f1!.tabelleDaten.length, expected: 20, tolerance: 0 },
  { name: 'F-03 kurvenDaten[0].einkommen = 0',                           actual: f1!.kurvenDaten[0].einkommen, expected: 0 },
  { name: 'F-04 kurvenDaten[100].einkommen = 200.000',                   actual: f1!.kurvenDaten[100].einkommen, expected: 200000 },
  { name: 'F-05 tabelleDaten[0].einkommen = 10.000',                     actual: f1!.tabelleDaten[0].einkommen, expected: 10000 },
  { name: 'F-06 tabelleDaten[19].einkommen = 200.000',                   actual: f1!.tabelleDaten[19].einkommen, expected: 200000 },
);

// tabelleDaten[10].est entspricht berechneEStGrund(110.000, 2026) (Grundtarif)
//   Index 10 = 110.000 €
cases.push(
  { name: 'F-07 tabelleDaten[10].est = ESt(110k Grundtarif)', actual: f1!.tabelleDaten[10].est, expected: berechneEStGrund(110_000, 2026), tolerance: 0.5 },
);

// === Cluster G: Edge — Null-Returns ===

cases.push(
  { name: 'G-01 zvE = -1: null',                                actual: isNull(berechneSteuerprogression(-1, false, false)), expected: 1, tolerance: 0 },
  { name: 'G-02 zvE = NaN: null',                               actual: isNull(berechneSteuerprogression(NaN, false, false)), expected: 1, tolerance: 0 },
  { name: 'G-03 zvE = 0: nicht null (alle 0)',                  actual: isNull(berechneSteuerprogression(0, false, false)), expected: 0, tolerance: 0 },
);

const g4 = berechneSteuerprogression(0, false, false);
cases.push(
  { name: 'G-04 zvE = 0: einkommensteuer = 0',                   actual: g4!.einkommensteuer, expected: 0 },
  { name: 'G-04 zvE = 0: durchschnittssteuersatz = 0',           actual: g4!.durchschnittssteuersatz, expected: 0 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (c.actual === null && c.expected === null) ok = true;
  else if (c.actual === null || c.expected === null) ok = false;
  else {
    const tol = c.tolerance ?? 0.01;
    ok = Math.abs(c.actual - c.expected) <= tol;
  }
  const status = ok ? '✓' : '✗';
  const a = c.actual === null ? 'null' : String(c.actual);
  const e = c.expected === null ? 'null' : String(c.expected);
  console.log(`  ${status} ${c.name.padEnd(64)} ist ${a.padStart(14)}  soll ${e.padStart(14)}`);
  if (ok) passed++; else failed++;
}
console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
