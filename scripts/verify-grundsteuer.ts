/**
 * Verify-Script für lib/berechnungen/grundsteuer.ts
 * (Welle-5 Track-A Block-C C2, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - GrStG i.d.F. ab 01.01.2025: https://www.gesetze-im-internet.de/grstg_1973/
 *   - § 15 GrStG (Steuermesszahlen Bundesmodell)
 *   - § 254 BewG (Mietniveau-Stufen, hier vereinfacht)
 *   - § 256 BewG (Kapitalisierungsfaktor 15, hier vereinfacht)
 *   - BayGrStG (Flächen-Aequivalenz-Modell)
 *   - § 40 LGrStG BW (Bodenwertmodell)
 *
 * **Welle-2-refactor-only-Akzeptanz:** C2 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block + externer Helper `mietePerM2`. Tests prüfen die
 * mathematische Modell-Definition direkt (Bewertungs-Größe × Steuermesszahl
 * × Hebesatz/100), nicht gegen Pre-Refactor-Snapshot.
 *
 * **L-35-Disziplin:** Lib modelliert nur 3/6 BL-Modelle (Bund/BY/BW); NDS,
 * HE, HH NICHT modelliert. Tests prüfen die 3 implementierten Modelle.
 *
 * **L-34-Disziplin:** vor jedem Drift-Befund Sanity-Check gegen Hand-Rechnung.
 * Welle-2-refactor-only — echte Lib-Drifts ausgeschlossen, Drifts wären
 * Übertragungsfehler in der Lib oder Konstruktions-Fehler in den Cases.
 *
 * Tolerance: 0,01 € für €-Werte (reine Multiplikation/Division).
 *
 * Ausführen: npx tsx scripts/verify-grundsteuer.ts
 */

import {
  BUND_KAPITALISIERUNGSFAKTOR,
  BUND_STEUERMESSZAHL_BEBAUT,
  BUND_STEUERMESSZAHL_UNBEBAUT,
  BY_AEQUIVALENZ_GRUND,
  BY_AEQUIVALENZ_WOHN,
  BY_WOHN_ERMAESSIGUNG,
  BW_STEUERMESSZAHL_WOHNEN,
  BW_STEUERMESSZAHL_NICHTWOHNEN,
  berechneGrundsteuer,
  mietePerM2,
} from '../lib/berechnungen/grundsteuer';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

// === Cluster A: Konstanten ===

cases.push(
  { name: 'A-01 BUND_KAPITALISIERUNGSFAKTOR = 15 (§ 256 BewG vereinfacht)',     actual: BUND_KAPITALISIERUNGSFAKTOR, expected: 15 },
  { name: 'A-02 BUND_STEUERMESSZAHL_BEBAUT = 0,00031 (§ 15 GrStG)',              actual: BUND_STEUERMESSZAHL_BEBAUT, expected: 0.00031, tolerance: 0.000001 },
  { name: 'A-03 BUND_STEUERMESSZAHL_UNBEBAUT = 0,00034 (§ 15 GrStG)',            actual: BUND_STEUERMESSZAHL_UNBEBAUT, expected: 0.00034, tolerance: 0.000001 },
  { name: 'A-04 BY_AEQUIVALENZ_GRUND = 0,04 (BayGrStG)',                          actual: BY_AEQUIVALENZ_GRUND, expected: 0.04, tolerance: 0.0001 },
  { name: 'A-05 BY_AEQUIVALENZ_WOHN = 0,50 (BayGrStG)',                           actual: BY_AEQUIVALENZ_WOHN, expected: 0.50, tolerance: 0.0001 },
  { name: 'A-06 BY_WOHN_ERMAESSIGUNG = 0,70 (BayGrStG, 30 % Wohnabschlag)',       actual: BY_WOHN_ERMAESSIGUNG, expected: 0.70, tolerance: 0.0001 },
  { name: 'A-07 BW_STEUERMESSZAHL_WOHNEN = 0,00091 (§ 40 LGrStG BW)',             actual: BW_STEUERMESSZAHL_WOHNEN, expected: 0.00091, tolerance: 0.000001 },
  { name: 'A-08 BW_STEUERMESSZAHL_NICHTWOHNEN = 0,0013 (§ 40 LGrStG BW)',         actual: BW_STEUERMESSZAHL_NICHTWOHNEN, expected: 0.0013, tolerance: 0.000001 },
);

// === Cluster B: Bundesmodell § 13–15 GrStG + § 254/256 BewG vereinfacht ===
//
// Component-Defaults (bund/etw, brw=200, gfl=400, wfl=120, bj=1990, hs=500):
//   bodenwert = 400×200 = 80.000
//   mietePerM2(1990) = 7,50; jahresrohertrag = 120×7,5×12 = 10.800
//   gebaeudewert = 10.800 × 15 = 162.000
//   grundsteuerwert = 242.000
//   messbetrag = 242.000 × 0,00031 = 75,02
//   grundsteuerJahr = 75,02 × 5 = 375,10

const b1 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 500,
});
cases.push(
  { name: 'B-01 Bundesmodell etw bj1990: grundsteuerwert = 242.000 €',  actual: b1.grundsteuerwert, expected: 242000, tolerance: 0.01 },
  { name: 'B-01: messbetrag = 75,02 € (242.000 × 0,00031)',              actual: b1.messbetrag, expected: 75.02, tolerance: 0.01 },
  { name: 'B-01: grundsteuerJahr = 375,10 € (75,02 × 5)',                actual: b1.grundsteuerJahr, expected: 375.10, tolerance: 0.01 },
);

// B-02: Bundesmodell unbebaut → kein Gebäudewert, andere Steuermesszahl
const b2 = berechneGrundsteuer({
  modell: 'bund', art: 'unbebaut', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 0, baujahr: 1990, hebesatz: 500,
});
cases.push(
  { name: 'B-02 Bundesmodell unbebaut: grundsteuerwert = 80.000 € (nur Boden)',  actual: b2.grundsteuerwert, expected: 80000, tolerance: 0.01 },
  { name: 'B-02: messbetrag = 27,20 € (80.000 × 0,00034)',                        actual: b2.messbetrag, expected: 27.20, tolerance: 0.01 },
  { name: 'B-02: grundsteuerJahr = 136 € (27,20 × 5)',                            actual: b2.grundsteuerJahr, expected: 136.00, tolerance: 0.01 },
);

// B-03: Hebesatz-Variation (Großstadt 600 %) → +20 % grundsteuerJahr
const b3 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 600,
});
cases.push(
  { name: 'B-03 Hebesatz 600 % statt 500: grundsteuerJahr = 75,02 × 6 = 450,12 €', actual: b3.grundsteuerJahr, expected: 450.12, tolerance: 0.01 },
);

// === Cluster C: mietePerM2-Helper-Tabelle (4-stufige Baujahres-Tabelle) ===

cases.push(
  { name: 'C-01 mietePerM2(1900) = 6,50 (vor 1949)',     actual: mietePerM2(1900), expected: 6.50 },
  { name: 'C-02 mietePerM2(1948) = 6,50 (Edge < 1949)',  actual: mietePerM2(1948), expected: 6.50 },
  { name: 'C-03 mietePerM2(1949) = 7,00 (Edge ≤ 1978)',  actual: mietePerM2(1949), expected: 7.00 },
  { name: 'C-04 mietePerM2(1978) = 7,00 (Edge ≤ 1978)',  actual: mietePerM2(1978), expected: 7.00 },
  { name: 'C-05 mietePerM2(1979) = 7,50 (Edge ≤ 2000)',  actual: mietePerM2(1979), expected: 7.50 },
  { name: 'C-06 mietePerM2(2000) = 7,50 (Edge ≤ 2000)',  actual: mietePerM2(2000), expected: 7.50 },
  { name: 'C-07 mietePerM2(2001) = 8,50 (Edge > 2000)',  actual: mietePerM2(2001), expected: 8.50 },
  { name: 'C-08 mietePerM2(2026) = 8,50 (aktuell)',      actual: mietePerM2(2026), expected: 8.50 },
);

// === Cluster D: Bayern Flächen-Aequivalenz BayGrStG ===
//
// Bayern bebaut (gfl=400, wfl=120, hs=500):
//   aequivalenz = 400×0,04 + 120×0,50 = 16 + 60 = 76
//   messbetrag = 76 × 0,70 = 53,20 (Wohn-Ermäßigung)
//   grundsteuerJahr = 53,20 × 5 = 266

const d1 = berechneGrundsteuer({
  modell: 'bayern', art: 'etw', bodenrichtwert: 0, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 0, hebesatz: 500,
});
cases.push(
  { name: 'D-01 Bayern etw: aequivalenz/grundsteuerwert = 76 €',  actual: d1.grundsteuerwert, expected: 76, tolerance: 0.01 },
  { name: 'D-01: messbetrag = 53,20 € (76 × 0,70 Wohn-Ermäßigung)', actual: d1.messbetrag, expected: 53.20, tolerance: 0.01 },
  { name: 'D-01: grundsteuerJahr = 266 € (53,20 × 5)',              actual: d1.grundsteuerJahr, expected: 266.00, tolerance: 0.01 },
);

// D-02: Bayern unbebaut → keine Wohn-Ermäßigung
const d2 = berechneGrundsteuer({
  modell: 'bayern', art: 'unbebaut', bodenrichtwert: 0, grundflaeche: 400,
  wohnflaeche: 0, baujahr: 0, hebesatz: 500,
});
cases.push(
  { name: 'D-02 Bayern unbebaut wfl=0: aequivalenz = 16 (nur Grund)', actual: d2.grundsteuerwert, expected: 16, tolerance: 0.01 },
  { name: 'D-02: messbetrag = 16 (kein 0,70-Faktor bei unbebaut)',     actual: d2.messbetrag, expected: 16, tolerance: 0.01 },
);

// === Cluster E: BW Bodenwertmodell § 40 LGrStG BW ===
//
// BW Wohnen (gfl=400, brw=200, hs=500):
//   grundsteuerwert = 400×200 = 80.000
//   messbetrag = 80.000 × 0,00091 = 72,80
//   grundsteuerJahr = 72,80 × 5 = 364

const e1 = berechneGrundsteuer({
  modell: 'bw', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 0, baujahr: 0, hebesatz: 500,
});
cases.push(
  { name: 'E-01 BW etw: grundsteuerwert = 80.000 € (Boden)',                 actual: e1.grundsteuerwert, expected: 80000, tolerance: 0.01 },
  { name: 'E-01: messbetrag = 72,80 € (80.000 × 0,00091 Wohnen)',             actual: e1.messbetrag, expected: 72.80, tolerance: 0.01 },
  { name: 'E-01: grundsteuerJahr = 364 € (72,80 × 5)',                        actual: e1.grundsteuerJahr, expected: 364.00, tolerance: 0.01 },
);

// E-02: BW unbebaut → 0,0013 Steuermesszahl
const e2 = berechneGrundsteuer({
  modell: 'bw', art: 'unbebaut', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 0, baujahr: 0, hebesatz: 500,
});
cases.push(
  { name: 'E-02 BW unbebaut: messbetrag = 104 € (80.000 × 0,0013)',  actual: e2.messbetrag, expected: 104, tolerance: 0.01 },
  { name: 'E-02: grundsteuerJahr = 520 € (104 × 5)',                  actual: e2.grundsteuerJahr, expected: 520, tolerance: 0.01 },
);

// === Cluster F: Modell-Switch-Discriminator ===
//
// Selbe Eingaben, drei Modelle → unterschiedliche grundsteuerJahr-Werte

const f_eingabe = {
  art: 'etw' as const, bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 500,
};
const f1 = berechneGrundsteuer({ ...f_eingabe, modell: 'bund' });
const f2 = berechneGrundsteuer({ ...f_eingabe, modell: 'bayern' });
const f3 = berechneGrundsteuer({ ...f_eingabe, modell: 'bw' });
cases.push(
  { name: 'F-01 Modell-Switch bund → grundsteuerJahr = 375,10 €',     actual: f1.grundsteuerJahr, expected: 375.10, tolerance: 0.01 },
  { name: 'F-02 Modell-Switch bayern → grundsteuerJahr = 266 €',       actual: f2.grundsteuerJahr, expected: 266.00, tolerance: 0.01 },
  { name: 'F-03 Modell-Switch bw → grundsteuerJahr = 364 €',           actual: f3.grundsteuerJahr, expected: 364.00, tolerance: 0.01 },
);

// === Cluster G: Strukturelle Invarianten ===

const g1 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 500,
});
cases.push(
  { name: 'G-01 grundsteuerJahr = messbetrag × hebesatz/100 (Konsistenz)',  actual: g1.grundsteuerJahr, expected: g1.messbetrag * 5, tolerance: 0.01 },
  { name: 'G-02 monat = grundsteuerJahr / 12 (Konsistenz)',                  actual: g1.monat, expected: g1.grundsteuerJahr / 12, tolerance: 0.001 },
  { name: 'G-03 quartal = grundsteuerJahr / 4 (Konsistenz)',                 actual: g1.quartal, expected: g1.grundsteuerJahr / 4, tolerance: 0.01 },
  { name: 'G-04 grundsteuerJahr = quartal × 4 (Konsistenz)',                 actual: g1.grundsteuerJahr, expected: g1.quartal * 4, tolerance: 0.01 },
);

// === Cluster H: Edge-Cases ===

const h1 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 0,
});
const h2 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 0, grundflaeche: 0,
  wohnflaeche: 0, baujahr: 1990, hebesatz: 500,
});
cases.push(
  { name: 'H-01 hebesatz=0 → grundsteuerJahr = 0 (egal welches Modell)',  actual: h1.grundsteuerJahr, expected: 0, tolerance: 0.01 },
  { name: 'H-02 alle Eingaben 0 → grundsteuerwert = messbetrag = 0',      actual: h2.grundsteuerwert + h2.messbetrag, expected: 0, tolerance: 0.01 },
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
  console.log(`  ${status} ${c.name.padEnd(72)} ist ${a.padStart(14)}  soll ${e.padStart(14)}`);
  if (ok) passed++;
  else failed++;
}
console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
