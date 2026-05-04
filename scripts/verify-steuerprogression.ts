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

// === Cluster C: Grenzsteuersatz § 32a EStG (analytisch, B4-Refactor 04.05.26) ===
//
// **Welle 5 Track-B B4 (04.05.2026):** berechneGrenzsteuersatz Δ-Trick durch
// analytische Marginal-Rate-Ableitung aus § 32a Abs. 1 EStG 2026 i.d.F.
// StÄndG 2024 ersetzt. Tests prüfen jetzt die mathematisch korrekten
// Zonen-Werte (Zone-Mitten + Stetigkeits-Cases an Übergängen) statt der
// alten 0/100-Snapshot-Werte aus dem Math.floor-Artefakt.
//
// Tarif-Konstanten aus TARIF_2026 (einkommensteuer.ts):
//   Zone 1: zvE ≤ 12.348 → 0 %
//   Zone 2: 12.349–17.799 → linear 14 → 24 % via (2·914,51·y + 1400) / 100
//   Zone 3: 17.800–69.878 → linear 24 → 42 % via (2·173,10·z + 2397) / 100
//   Zone 4: 69.879–277.825 → konstant 42 %
//   Zone 5: ab 277.826 → konstant 45 %
//
// Erwartungswerte mathematisch berechnet (nicht Lib-Snapshot, nicht
// Hand-Schätzung — Cross-Check via Polynom-Ableitung). Tolerance 0,05 %
// für Floating-Precision an Zonen-Übergängen.

// Zone 1: unter und auf GFB → 0 %
const cz1a = berechneSteuerprogression(8_000, false, false);
const cz1b = berechneSteuerprogression(12_348, false, false);
cases.push(
  { name: 'C-X1 zvE 8.000 (Zone 1, unter GFB): grenz = 0 %',           actual: cz1a!.grenzsteuersatz, expected: 0, tolerance: 0.01 },
  { name: 'C-X2 zvE 12.348 (Zone 1-Ende = GFB): grenz = 0 %',           actual: cz1b!.grenzsteuersatz, expected: 0, tolerance: 0.01 },
);

// Zone 2: linear 14 → 24 %
// y(12349) = 0.0001 → (2·914.51·0.0001 + 1400) / 100 = 14.0018 %
// y(15000) = 0.2652 → (2·914.51·0.2652 + 1400) / 100 = 18.851 %
// y(17799) = 0.5451 → (2·914.51·0.5451 + 1400) / 100 = 23.970 %
const cz2a = berechneSteuerprogression(12_349, false, false);
const cz2b = berechneSteuerprogression(15_000, false, false);
const cz2c = berechneSteuerprogression(17_799, false, false);
cases.push(
  { name: 'C-X3 zvE 12.349 (Zone 2-Start, knapp über GFB): grenz ≈ 14 %', actual: cz2a!.grenzsteuersatz, expected: 14.0018, tolerance: 0.05 },
  { name: 'C-X4 zvE 15.000 (Zone 2-Mitte): grenz ≈ 18,85 %',              actual: cz2b!.grenzsteuersatz, expected: 18.851, tolerance: 0.05 },
  { name: 'C-X5 zvE 17.799 (Zone 2-Ende = Zone 3-Start): grenz ≈ 24 %',   actual: cz2c!.grenzsteuersatz, expected: 23.970, tolerance: 0.05 },
);

// Zone 3: linear 24 → 42 %
// z(17800) = 0.0001 → (2·173.10·0.0001 + 2397) / 100 = 23.970 % (Stetigkeit zu Z2-Ende)
// z(50000) = 3.2201 → (2·173.10·3.2201 + 2397) / 100 = 35.118 %
// z(69878) = 5.2079 → (2·173.10·5.2079 + 2397) / 100 = 42.000 %
const cz3a = berechneSteuerprogression(17_800, false, false);
const cz3b = berechneSteuerprogression(50_000, false, false);
const cz3c = berechneSteuerprogression(69_878, false, false);
cases.push(
  { name: 'C-X6 zvE 17.800 (Zone 3-Start, Stetigkeit zu Z2): grenz ≈ 24 %', actual: cz3a!.grenzsteuersatz, expected: 23.970, tolerance: 0.05 },
  { name: 'C-X7 zvE 50.000 (Zone 3-Mitte): grenz ≈ 35,12 %',                actual: cz3b!.grenzsteuersatz, expected: 35.118, tolerance: 0.05 },
  { name: 'C-X8 zvE 69.878 (Zone 3-Ende = Zone 4-Start): grenz ≈ 42 %',     actual: cz3c!.grenzsteuersatz, expected: 42.000, tolerance: 0.05 },
);

// Zone 4: konstant 42 %
const cz4a = berechneSteuerprogression(69_879, false, false);
const cz4b = berechneSteuerprogression(100_000, false, false);
const cz4c = berechneSteuerprogression(277_825, false, false);
cases.push(
  { name: 'C-X9 zvE 69.879 (Zone 4-Start, Stetigkeit zu Z3): grenz = 42 %',  actual: cz4a!.grenzsteuersatz, expected: 42, tolerance: 0.05 },
  { name: 'C-X10 zvE 100.000 (Zone 4-Mitte): grenz = 42 %',                  actual: cz4b!.grenzsteuersatz, expected: 42, tolerance: 0.05 },
  { name: 'C-X11 zvE 277.825 (Zone 4-Ende): grenz = 42 %',                   actual: cz4c!.grenzsteuersatz, expected: 42, tolerance: 0.05 },
);

// Zone 5: konstant 45 % (Sprung 42 → 45 % bei zvE > 277.825)
const cz5a = berechneSteuerprogression(277_826, false, false);
const cz5b = berechneSteuerprogression(500_000, false, false);
cases.push(
  { name: 'C-X12 zvE 277.826 (Zone 5-Start, Sprung 42→45 %): grenz = 45 %',  actual: cz5a!.grenzsteuersatz, expected: 45, tolerance: 0.05 },
  { name: 'C-X13 zvE 500.000 (Zone 5): grenz = 45 %',                        actual: cz5b!.grenzsteuersatz, expected: 45, tolerance: 0.05 },
);

// Splittingtarif: Marginal-Rate(splitting, zvE) = Marginal-Rate(grund, zvE/2)
// zvE 100k Splitting → ESt'(50k) = 35.118 % (Zone 3-Mitte)
// zvE 300k Splitting → ESt'(150k) = 42 % (Zone 4)
const cz6a = berechneSteuerprogression(100_000, true, false);
const cz6b = berechneSteuerprogression(300_000, true, false);
cases.push(
  { name: 'C-X14 zvE 100k Splitting: grenz = grenz(50k Grund) ≈ 35,12 %',    actual: cz6a!.grenzsteuersatz, expected: 35.118, tolerance: 0.05 },
  { name: 'C-X15 zvE 300k Splitting: grenz = grenz(150k Grund) = 42 %',      actual: cz6b!.grenzsteuersatz, expected: 42, tolerance: 0.05 },
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
