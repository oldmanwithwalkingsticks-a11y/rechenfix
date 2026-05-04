/**
 * Verify-Script für lib/berechnungen/firmenwagen.ts
 * (Welle-5 Track-A Tail D1, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 6 Abs. 1 Nr. 4 EStG: https://www.gesetze-im-internet.de/estg/__6.html
 *   - § 8 Abs. 2 EStG: https://www.gesetze-im-internet.de/estg/__8.html
 *   - § 6 Abs. 1 Nr. 4 S. 2 Nr. 4 (E-Auto-Sondersatz, Schwelle 70.000 € seit
 *     01.01.2024)
 *   - § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 (Plug-in-Hybrid 0,5-%-Vergünstigung,
 *     CO₂ ≤ 50 ODER Reichweite ≥ 80)
 *
 * **Welle-2-refactor-only-Akzeptanz:** D1 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block + Modul-Scope-Konstanten. Tests prüfen die
 * mathematische Berechnung (Listenpreis × Satz + Listenpreis × Fahrten-Faktor
 * × Entfernung × FAKTOR) direkt nach EStG-Norm.
 *
 * **L-35-Disziplin:** Lib modelliert nur die 1-%-Regel-Methode mit Antriebs-
 * art-Differenzierung. Fahrtenbuch-Methode (§ 6 Abs. 1 Nr. 4 S. 3 EStG) NICHT
 * modelliert. KiSt/Soli-Aufschlag vereinfacht.
 *
 * Tolerance: 0,01 € für €-Werte (reine Multiplikation).
 *
 * Ausführen: npx tsx scripts/verify-firmenwagen.ts
 */

import {
  HYBRID_CO2_GRENZE_G_KM,
  HYBRID_REICHWEITE_MIN_KM,
  FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE,
  FIRMENWAGEN_SATZ,
  FIRMENWAGEN_FAKTOR,
  FIRMENWAGEN_PAUSCHAL_FAHRTEN_FAKTOR,
  FIRMENWAGEN_EINZEL_FAHRTEN_FAKTOR,
  berechneFirmenwagen,
} from '../lib/berechnungen/firmenwagen';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const bool = (v: boolean): number => (v ? 1 : 0);

// Default-Eingabe für Tests (Component-Defaults)
const defaultEingabe = {
  bruttoListenpreis: 45000,
  antrieb: 'verbrenner' as const,
  entfernungKm: 20,
  arbeitswegMethode: 'pauschal' as const,
  fahrtenProMonat: 20,
  zuzahlungProMonat: 0,
  grenzsteuersatz: 0.35,
  co2GKm: 50,
  reichweiteKm: 80,
};

// === Cluster A: Konstanten ===

cases.push(
  { name: 'A-01 HYBRID_CO2_GRENZE_G_KM = 50 (§ 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG)', actual: HYBRID_CO2_GRENZE_G_KM, expected: 50 },
  { name: 'A-02 HYBRID_REICHWEITE_MIN_KM = 80 (§ 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG)', actual: HYBRID_REICHWEITE_MIN_KM, expected: 80 },
  { name: 'A-03 E-Auto-Listenpreis-Schwelle = 70.000 € (seit 01.01.2024)',         actual: FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE, expected: 70000 },
  { name: 'A-04 SATZ.verbrenner = 0,01 (1 %-Regel)',                                actual: FIRMENWAGEN_SATZ.verbrenner, expected: 0.01, tolerance: 0.0001 },
  { name: 'A-05 SATZ.hybrid = 0,005 (0,5 %)',                                       actual: FIRMENWAGEN_SATZ.hybrid, expected: 0.005, tolerance: 0.0001 },
  { name: 'A-06 SATZ.eAutoUnter70 = 0,0025 (0,25 %)',                               actual: FIRMENWAGEN_SATZ.eAutoUnter70, expected: 0.0025, tolerance: 0.0001 },
  { name: 'A-07 SATZ.eAutoUeber70 = 0,005 (0,5 %)',                                 actual: FIRMENWAGEN_SATZ.eAutoUeber70, expected: 0.005, tolerance: 0.0001 },
  { name: 'A-08 FAKTOR.verbrenner = 1,0',                                            actual: FIRMENWAGEN_FAKTOR.verbrenner, expected: 1.0 },
  { name: 'A-09 FAKTOR.hybrid = 0,5',                                                actual: FIRMENWAGEN_FAKTOR.hybrid, expected: 0.5 },
  { name: 'A-10 FAKTOR.eAutoUnter70 = 0,25',                                         actual: FIRMENWAGEN_FAKTOR.eAutoUnter70, expected: 0.25 },
  { name: 'A-11 FAKTOR.eAutoUeber70 = 0,5',                                          actual: FIRMENWAGEN_FAKTOR.eAutoUeber70, expected: 0.5 },
  { name: 'A-12 PAUSCHAL_FAHRTEN_FAKTOR = 0,0003 (§ 8 Abs. 2 S. 3 EStG)',          actual: FIRMENWAGEN_PAUSCHAL_FAHRTEN_FAKTOR, expected: 0.0003, tolerance: 0.00001 },
  { name: 'A-13 EINZEL_FAHRTEN_FAKTOR = 0,00002 (§ 8 Abs. 2 S. 5 EStG)',           actual: FIRMENWAGEN_EINZEL_FAHRTEN_FAKTOR, expected: 0.00002, tolerance: 0.000001 },
);

// === Cluster B: 1-%-Regel Verbrenner Standard ===
//
// BLP 45k, Verbrenner, 20 km Pauschal, 35 % GrSt:
//   privat = 45000 × 0,01 = 450
//   arbeitsweg = 45000 × 0,0003 × 20 × 1,0 = 270
//   gwv = max(0, 450 + 270 - 0) = 720
//   steuerMonat = 720 × 0,35 = 252

const b1 = berechneFirmenwagen(defaultEingabe);
cases.push(
  { name: 'B-01 Verbrenner BLP 45k: privat = 450 € (45k × 1 %)',         actual: b1.aktuell.privat, expected: 450, tolerance: 0.01 },
  { name: 'B-01: arbeitsweg = 270 € (45k × 0,03 % × 20 km × 1,0)',        actual: b1.aktuell.arbeitsweg, expected: 270, tolerance: 0.01 },
  { name: 'B-01: gwv = 720 €',                                            actual: b1.aktuell.gwv, expected: 720, tolerance: 0.01 },
  { name: 'B-01: steuerMonat = 252 € (720 × 35 %)',                       actual: b1.aktuell.steuerMonat, expected: 252, tolerance: 0.01 },
);

// B-02: BLP 60k, Verbrenner, 30 km, 42 % GrSt
const b2 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 60000, entfernungKm: 30, grenzsteuersatz: 0.42,
});
//   privat = 600; arbeitsweg = 60000 × 0,0003 × 30 × 1,0 = 540; gwv = 1140; steuerMonat = 478,80
cases.push(
  { name: 'B-02 Verbrenner BLP 60k 30km: privat = 600 €',  actual: b2.aktuell.privat, expected: 600, tolerance: 0.01 },
  { name: 'B-02: arbeitsweg = 540 €',                       actual: b2.aktuell.arbeitsweg, expected: 540, tolerance: 0.01 },
  { name: 'B-02: gwv = 1.140 €',                            actual: b2.aktuell.gwv, expected: 1140, tolerance: 0.01 },
  { name: 'B-02: steuerMonat = 478,80 € (1140 × 42 %)',    actual: b2.aktuell.steuerMonat, expected: 478.80, tolerance: 0.01 },
);

// === Cluster C: 1-%-Regel E-Auto + Listenpreis-Schwelle ===
//
// E-Auto BLP 50k (≤ 70k → 0,25 %): privat = 125, arbeitsweg = 50k × 0,0003 × 20 × 0,25 = 75
// E-Auto BLP 80k (> 70k → 0,5 %): privat = 400, arbeitsweg = 80k × 0,0003 × 20 × 0,5 = 240
// E-Auto BLP 70k Edge (= 70k → 0,25 %): privat = 175, arbeitsweg = 70k × 0,0003 × 20 × 0,25 = 105

const c1 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 50000, antrieb: 'eAutoUnter70',
});
//   gwv = 125 + 75 = 200; steuerMonat = 70
cases.push(
  { name: 'C-01 E-Auto 50k (≤ 70k): privat = 125 € (50k × 0,25 %)',     actual: c1.aktuell.privat, expected: 125, tolerance: 0.01 },
  { name: 'C-01: arbeitsweg = 75 € (× FAKTOR 0,25)',                     actual: c1.aktuell.arbeitsweg, expected: 75, tolerance: 0.01 },
  { name: 'C-01: gwv = 200 €',                                            actual: c1.aktuell.gwv, expected: 200, tolerance: 0.01 },
);

const c2 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 80000, antrieb: 'eAutoUeber70',
});
//   privat = 400; arbeitsweg = 240; gwv = 640
cases.push(
  { name: 'C-02 E-Auto 80k (> 70k): privat = 400 € (80k × 0,5 %)',      actual: c2.aktuell.privat, expected: 400, tolerance: 0.01 },
  { name: 'C-02: arbeitsweg = 240 € (× FAKTOR 0,5)',                     actual: c2.aktuell.arbeitsweg, expected: 240, tolerance: 0.01 },
  { name: 'C-02: gwv = 640 €',                                            actual: c2.aktuell.gwv, expected: 640, tolerance: 0.01 },
);

// C-03: Schwellen-Edge: BLP 70k Vergleichs-Spalte eAuto → eAutoUnter70 (≤ 70k)
const c3 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 70000, antrieb: 'verbrenner',
});
cases.push(
  { name: 'C-03 BLP 70k (Edge): eAuto-Vergleich nutzt eAutoUnter70 (0,25 %)', actual: c3.eAuto.privat, expected: 70000 * 0.0025, tolerance: 0.01 },
);

// C-04: BLP 70.001 → eAutoUeber70 (> 70k)
const c4 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 70001, antrieb: 'verbrenner',
});
cases.push(
  { name: 'C-04 BLP 70.001 (Edge): eAuto-Vergleich nutzt eAutoUeber70 (0,5 %)', actual: c4.eAuto.privat, expected: 70001 * 0.005, tolerance: 0.01 },
);

// === Cluster D: Hybrid-Bedingungs-Check § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG ===
//
// CO₂ ≤ 50 ODER Reichweite ≥ 80 → Bedingungen erfüllt → 0,5 %-Regel
// Sonst → Verbrenner-Fallback (1 %)

// D-01: Beide Bedingungen erfüllt (CO₂=50 = Edge, RW=80 = Edge) → Hybrid 0,5 %
const d1 = berechneFirmenwagen({
  ...defaultEingabe, antrieb: 'hybrid', co2GKm: 50, reichweiteKm: 80,
});
//   privat = 45000 × 0,005 = 225; gwv = 225 + (45k × 0,0003 × 20 × 0,5) = 225 + 135 = 360
cases.push(
  { name: 'D-01 Hybrid CO₂=50 + RW=80 (Edge): hybridBedingungenErfuellt = true',  actual: bool(d1.hybridBedingungenErfuellt), expected: 1 },
  { name: 'D-01: privat = 225 € (45k × 0,5 %)',                                    actual: d1.aktuell.privat, expected: 225, tolerance: 0.01 },
  { name: 'D-01: gwv = 360 €',                                                      actual: d1.aktuell.gwv, expected: 360, tolerance: 0.01 },
);

// D-02: Nur CO₂ erfüllt (RW < 80) → Bedingungen erfüllt (ODER-Logik)
const d2 = berechneFirmenwagen({
  ...defaultEingabe, antrieb: 'hybrid', co2GKm: 30, reichweiteKm: 50,
});
cases.push(
  { name: 'D-02 Hybrid CO₂=30 + RW=50 (nur CO₂): Bedingungen erfüllt (ODER)',   actual: bool(d2.hybridBedingungenErfuellt), expected: 1 },
  { name: 'D-02: privat = 225 € (Hybrid-Satz 0,5 %)',                              actual: d2.aktuell.privat, expected: 225, tolerance: 0.01 },
);

// D-03: Nur Reichweite erfüllt (CO₂ > 50)
const d3 = berechneFirmenwagen({
  ...defaultEingabe, antrieb: 'hybrid', co2GKm: 80, reichweiteKm: 100,
});
cases.push(
  { name: 'D-03 Hybrid CO₂=80 + RW=100 (nur RW): Bedingungen erfüllt (ODER)',  actual: bool(d3.hybridBedingungenErfuellt), expected: 1 },
);

// D-04: Beide Bedingungen NICHT erfüllt → Verbrenner-Fallback
const d4 = berechneFirmenwagen({
  ...defaultEingabe, antrieb: 'hybrid', co2GKm: 80, reichweiteKm: 50,
});
//   Fallback auf Verbrenner: privat = 450, arbeitsweg = 270, gwv = 720
cases.push(
  { name: 'D-04 Hybrid CO₂=80 + RW=50: hybridBedingungenErfuellt = false',  actual: bool(d4.hybridBedingungenErfuellt), expected: 0 },
  { name: 'D-04: aktuell.privat = 450 € (Verbrenner-Fallback 1 %)',           actual: d4.aktuell.privat, expected: 450, tolerance: 0.01 },
  { name: 'D-04: hybrid-Vergleichs-Spalte bleibt bei 0,5 % (pädagogisch)',    actual: d4.hybrid.privat, expected: 225, tolerance: 0.01 },
);

// === Cluster E: Arbeitsweg-Methoden-Switch § 8 Abs. 2 EStG ===
//
// Pauschal: 0,03 % × BLP × Entfernung × FAKTOR
// Einzel: 0,002 % × BLP × Entfernung × Fahrten × FAKTOR

// E-01: Einzel-Methode mit 15 Fahrten/Monat
const e1 = berechneFirmenwagen({
  ...defaultEingabe, arbeitswegMethode: 'einzel', fahrtenProMonat: 15,
});
//   arbeitsweg = 45000 × 0,00002 × 20 × 15 × 1,0 = 270
cases.push(
  { name: 'E-01 Einzel 15 Fahrten: arbeitsweg = 270 € (= Pauschal)',  actual: e1.aktuell.arbeitsweg, expected: 270, tolerance: 0.01 },
);

// E-02: Einzel mit 10 Fahrten (lohnender als Pauschal)
const e2 = berechneFirmenwagen({
  ...defaultEingabe, arbeitswegMethode: 'einzel', fahrtenProMonat: 10,
});
//   arbeitsweg = 45000 × 0,00002 × 20 × 10 × 1,0 = 180
cases.push(
  { name: 'E-02 Einzel 10 Fahrten: arbeitsweg = 180 € (< Pauschal 270)',  actual: e2.aktuell.arbeitsweg, expected: 180, tolerance: 0.01 },
);

// === Cluster F: Zuzahlung + Grenzsteuersatz + Vergleich ===

// F-01: Zuzahlung 200 €/Monat reduziert gwv (Default-gwv 720 → 520)
const f1 = berechneFirmenwagen({ ...defaultEingabe, zuzahlungProMonat: 200 });
cases.push(
  { name: 'F-01 Zuzahlung 200 €: gwv = 520 € (720 - 200)',  actual: f1.aktuell.gwv, expected: 520, tolerance: 0.01 },
);

// F-02: Zuzahlung > gwv (Math.max-Clamp)
const f2 = berechneFirmenwagen({ ...defaultEingabe, zuzahlungProMonat: 1000 });
cases.push(
  { name: 'F-02 Zuzahlung > gwv: gwv = 0 (Math.max-Clamp)',  actual: f2.aktuell.gwv, expected: 0, tolerance: 0.01 },
);

// F-03: Vergleichs-Berechnung Default → ersparnisEAuto
//   Verbrenner steuerMonat 252; E-Auto 45k ≤ 70k → 0,25 %:
//   privat 112,5; arbeitsweg 45k × 0,0003 × 20 × 0,25 = 67,5; gwv 180; steuerMonat 63
//   ersparnisEAuto = 252 - 63 = 189
const f3 = berechneFirmenwagen(defaultEingabe);
cases.push(
  { name: 'F-03 Vergleich Default: verbrenner.gwv = 720 €',     actual: f3.verbrenner.gwv, expected: 720, tolerance: 0.01 },
  { name: 'F-03: hybrid.gwv = 360 € (mit FAKTOR 0,5)',            actual: f3.hybrid.gwv, expected: 360, tolerance: 0.01 },
  { name: 'F-03: eAuto.gwv = 180 € (≤ 70k → 0,25 % + FAKTOR 0,25)', actual: f3.eAuto.gwv, expected: 180, tolerance: 0.01 },
  { name: 'F-03: ersparnisEAuto = 189 € (252 − 63)',              actual: f3.ersparnisEAuto, expected: 189, tolerance: 0.01 },
);

// === Cluster G: Strukturelle Invarianten ===

const g1 = berechneFirmenwagen(defaultEingabe);
cases.push(
  { name: 'G-01 gwv = max(0, privat + arbeitsweg − zuzahlung) (Konsistenz)',     actual: g1.aktuell.gwv, expected: Math.max(0, g1.aktuell.privat + g1.aktuell.arbeitsweg - 0), tolerance: 0.01 },
  { name: 'G-02 steuerMonat = gwv × Grenzsteuersatz (Konsistenz)',                actual: g1.aktuell.steuerMonat, expected: g1.aktuell.gwv * 0.35, tolerance: 0.01 },
  { name: 'G-03 ersparnisEAuto = verbrenner.steuerMonat − eAuto.steuerMonat',    actual: g1.ersparnisEAuto, expected: g1.verbrenner.steuerMonat - g1.eAuto.steuerMonat, tolerance: 0.01 },
);

// === Cluster H: Edge-Cases ===

const h1 = berechneFirmenwagen({
  ...defaultEingabe, bruttoListenpreis: 0, entfernungKm: 0, grenzsteuersatz: 0,
});
cases.push(
  { name: 'H-01 alle Eingaben 0: aktuell.gwv = 0, steuerMonat = 0',  actual: h1.aktuell.gwv + h1.aktuell.steuerMonat, expected: 0 },
);

const h2 = berechneFirmenwagen({ ...defaultEingabe, grenzsteuersatz: 0 });
cases.push(
  { name: 'H-02 Grenzsteuersatz = 0: steuerMonat = 0 (gwv > 0 unverändert)',  actual: h2.aktuell.steuerMonat, expected: 0 },
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
