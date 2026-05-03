/**
 * Verify-Script für lib/berechnungen/pflegegeld.ts (Welle-4 M3b, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - SGB XI § 37 (Pflegegeld bei häuslicher Pflege):
 *     https://www.gesetze-im-internet.de/sgb_11/__37.html
 *   - SGB XI § 36 (Pflegesachleistung):
 *     https://www.gesetze-im-internet.de/sgb_11/__36.html
 *   - SGB XI § 38 (Kombinationsleistung):
 *     https://www.gesetze-im-internet.de/sgb_11/__38.html
 *   - SGB XI § 39 (Verhinderungspflege):
 *     https://www.gesetze-im-internet.de/sgb_11/__39.html
 *   - SGB XI § 42 (Kurzzeitpflege):
 *     https://www.gesetze-im-internet.de/sgb_11/__42.html
 *   - SGB XI § 43 (Inhalt der Leistung bei vollstationärer Pflege):
 *     https://www.gesetze-im-internet.de/sgb_11/__43.html
 *   - SGB XI § 45a (Entlastungsbetrag): https://www.gesetze-im-internet.de/sgb_11/__45a.html
 *   - PUEG (Pflegeunterstützungs- und -entlastungsgesetz, gültig seit 01.01.2024)
 *     + 4,5 %-Dynamisierung zum 01.01.2025: aktuelle BMG-Beträge
 *
 * BMG-Pflegekassen-Beträge 2026 (Stand: 01.01.2025-Werte gelten weiter,
 * Konfig-Erklärtext bestätigt „für 2026 keine weitere Dynamisierung —
 * nächste reguläre Anpassung 2028"):
 *   PG 1: 0 € Pflegegeld | 0 € Sachleistung | 125 € stationär
 *   PG 2: 332 € | 761 € | 770 €
 *   PG 3: 573 € | 1.432 € | 1.262 €
 *   PG 4: 765 € | 1.778 € | 1.775 €
 *   PG 5: 947 € | 2.200 € | 2.005 €
 *   Entlastungsbetrag § 45a: 125 €/Mon (alle PG inkl. 1)
 *   Verhinderungspflege § 39: max 1.612 €/Jahr (ab PG 2)
 *   Kurzzeitpflege § 42: max 1.774 €/Jahr (ab PG 2)
 *
 * L-35-Disziplin (im Verify-Script-Header dokumentiert):
 *   - Stichtag-Switch 01.07.2026 NICHT in der Lib (Konfig-Klarstellung
 *     bestätigt: keine 2026er Dynamisierung)
 *   - Entlastungsbetrag-Akkumulation (6-Monats-Übertrag) NICHT modelliert
 *   - Kombinationsleistung-Halbjahres-Bindung NICHT modelliert
 *   - Stationärer Leistungszuschlag § 43c (15/30/50/75 % je nach Heimjahr)
 *     NICHT modelliert
 *   - Verhinderungs-/Kurzzeitpflege Topf-Übertrag (50 %, § 39 Abs. 2 i.V.m.
 *     § 42 Abs. 2) NICHT modelliert
 *   - Wohnraumanpassung-Mehrfachbeantragung (pro Maßnahme) NICHT modelliert
 *     (Lib gibt nur die Pauschale 4.000 € als Konstante zurück)
 *   - Pflegehilfsmittel-Pauschale 40 € wird auch für PG 1 zurückgegeben
 *     (§ 40 Abs. 2 SGB XI gilt ab PG 1 — also korrekt)
 *
 * Test-Strategie:
 *   - Tabellen-Konstanten direct gegen BMG 2026
 *   - Hauptleistung pro Pflegeform × Pflegegrad (5 × 4 Matrix)
 *   - Kombinationsleistung mit verschiedenen Anteilen
 *   - Schwelle PG 2 für Verhinderungs-/Kurzzeitpflege
 *   - Strukturelle Invarianten (gesamt = haupt + entlastung, jahr = monat × 12)
 *   - Anteilsdienst-Clamp (-10 → 0; 150 → 100)
 *
 * Ausführen: npx tsx scripts/verify-pflegegeld.ts
 */

import {
  berechnePflegegeld,
  PFLEGEGELD_TABELLE,
  PFLEGESACHLEISTUNG_TABELLE,
  STATIONAER_TABELLE,
  ENTLASTUNGSBETRAG,
  VERHINDERUNGSPFLEGE_MAX,
  KURZZEITPFLEGE_MAX,
  PFLEGEHILFSMITTEL_MAX,
  WOHNRAUMANPASSUNG_MAX,
  type Pflegegrad,
  type Pflegeform,
} from '../lib/berechnungen/pflegegeld';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number;
};

const cases: TestCase[] = [];

const calc = (pflegegrad: Pflegegrad, pflegeform: Pflegeform, anteilDienst = 0) =>
  berechnePflegegeld({ pflegegrad, pflegeform, anteilDienst });

// === Cluster A: Konstanten gegen BMG-Pflegekassen-Beträge 2026 ===

cases.push(
  // Pflegegeld § 37 SGB XI
  { name: 'A-01 PFLEGEGELD PG 1 = 0 (kein Anspruch)',           actual: PFLEGEGELD_TABELLE[1],         expected: 0,    tolerance: 0 },
  { name: 'A-02 PFLEGEGELD PG 2 = 332 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[2],         expected: 332,  tolerance: 0 },
  { name: 'A-03 PFLEGEGELD PG 3 = 573 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[3],         expected: 573,  tolerance: 0 },
  { name: 'A-04 PFLEGEGELD PG 4 = 765 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[4],         expected: 765,  tolerance: 0 },
  { name: 'A-05 PFLEGEGELD PG 5 = 947 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[5],         expected: 947,  tolerance: 0 },
  // Pflegesachleistung § 36 SGB XI
  { name: 'A-06 SACHLEISTUNG PG 1 = 0 (kein Anspruch)',         actual: PFLEGESACHLEISTUNG_TABELLE[1], expected: 0,    tolerance: 0 },
  { name: 'A-07 SACHLEISTUNG PG 2 = 761 (BMG 2026)',            actual: PFLEGESACHLEISTUNG_TABELLE[2], expected: 761,  tolerance: 0 },
  { name: 'A-08 SACHLEISTUNG PG 3 = 1.432 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[3], expected: 1432, tolerance: 0 },
  { name: 'A-09 SACHLEISTUNG PG 4 = 1.778 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[4], expected: 1778, tolerance: 0 },
  { name: 'A-10 SACHLEISTUNG PG 5 = 2.200 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[5], expected: 2200, tolerance: 0 },
  // Stationär § 43 SGB XI
  { name: 'A-11 STATIONAER PG 1 = 125 (BMG 2026)',              actual: STATIONAER_TABELLE[1],         expected: 125,  tolerance: 0 },
  { name: 'A-12 STATIONAER PG 5 = 2.005 (BMG 2026)',            actual: STATIONAER_TABELLE[5],         expected: 2005, tolerance: 0 },
  // MAX-Konstanten
  { name: 'A-13 ENTLASTUNGSBETRAG = 125 (§ 45a SGB XI)',         actual: ENTLASTUNGSBETRAG,             expected: 125,  tolerance: 0 },
  { name: 'A-14 VERHINDERUNGSPFLEGE_MAX = 1.612 (§ 39)',         actual: VERHINDERUNGSPFLEGE_MAX,       expected: 1612, tolerance: 0 },
  { name: 'A-15 KURZZEITPFLEGE_MAX = 1.774 (§ 42)',              actual: KURZZEITPFLEGE_MAX,            expected: 1774, tolerance: 0 },
  { name: 'A-16 PFLEGEHILFSMITTEL_MAX = 40 (§ 40 Abs. 2)',       actual: PFLEGEHILFSMITTEL_MAX,         expected: 40,   tolerance: 0 },
  { name: 'A-17 WOHNRAUMANPASSUNG_MAX = 4.000 (§ 40 Abs. 4)',    actual: WOHNRAUMANPASSUNG_MAX,         expected: 4000, tolerance: 0 },
);

// === Cluster B: Pflegeform 'angehoerige' (§ 37) — Pflegegeld pur ===
//
// hauptLeistungMonat = PFLEGEGELD[pg]
// gesamtMonat = pflegegeld + 125 (Entlastungsbetrag)

const b1 = calc(1, 'angehoerige');
const b2 = calc(2, 'angehoerige');
const b3 = calc(3, 'angehoerige');
const b4 = calc(4, 'angehoerige');
const b5 = calc(5, 'angehoerige');
cases.push(
  { name: 'B-01 PG 1 angehoerige: hauptLeistungMonat = 0',     actual: b1.hauptLeistungMonat, expected: 0 },
  { name: 'B-01: gesamtMonat = 0 + 125 = 125 (nur Entlastung)', actual: b1.gesamtMonat,        expected: 125 },
  { name: 'B-02 PG 2 angehoerige: hauptLeistungMonat = 332',   actual: b2.hauptLeistungMonat, expected: 332 },
  { name: 'B-02: gesamtMonat = 332 + 125 = 457',                actual: b2.gesamtMonat,        expected: 457 },
  { name: 'B-03 PG 3 angehoerige: hauptLeistungMonat = 573',   actual: b3.hauptLeistungMonat, expected: 573 },
  { name: 'B-03: gesamtMonat = 573 + 125 = 698',                actual: b3.gesamtMonat,        expected: 698 },
  { name: 'B-04 PG 4 angehoerige: hauptLeistungMonat = 765',   actual: b4.hauptLeistungMonat, expected: 765 },
  { name: 'B-05 PG 5 angehoerige: hauptLeistungMonat = 947',   actual: b5.hauptLeistungMonat, expected: 947 },
  { name: 'B-05: gesamtMonat = 947 + 125 = 1.072',              actual: b5.gesamtMonat,        expected: 1072 },
  { name: 'B-05: hauptLeistungJahr = 947 × 12 = 11.364',        actual: b5.hauptLeistungJahr,  expected: 11364 },
);

// === Cluster C: Pflegeform 'dienst' (§ 36) — Pflegesachleistung ===

const c2 = calc(2, 'dienst');
const c3 = calc(3, 'dienst');
const c5 = calc(5, 'dienst');
cases.push(
  { name: 'C-01 PG 2 dienst: hauptLeistungMonat = 761',        actual: c2.hauptLeistungMonat, expected: 761 },
  { name: 'C-01: gesamtMonat = 761 + 125 = 886',                actual: c2.gesamtMonat,        expected: 886 },
  { name: 'C-02 PG 3 dienst: hauptLeistungMonat = 1.432',      actual: c3.hauptLeistungMonat, expected: 1432 },
  { name: 'C-03 PG 5 dienst: hauptLeistungMonat = 2.200',      actual: c5.hauptLeistungMonat, expected: 2200 },
);

// === Cluster D: Pflegeform 'stationaer' (§ 43) ===

const d1 = calc(1, 'stationaer');
const d2 = calc(2, 'stationaer');
const d5 = calc(5, 'stationaer');
cases.push(
  { name: 'D-01 PG 1 stationaer: hauptLeistungMonat = 125',    actual: d1.hauptLeistungMonat, expected: 125 },
  { name: 'D-02 PG 2 stationaer: hauptLeistungMonat = 770',    actual: d2.hauptLeistungMonat, expected: 770 },
  { name: 'D-03 PG 5 stationaer: hauptLeistungMonat = 2.005',  actual: d5.hauptLeistungMonat, expected: 2005 },
);

// === Cluster E: Kombinationsleistung § 38 SGB XI ===
//
// Manuell:
//   PG 3, 50 % Dienst:
//     anteiligSachleistung = 1432 × 0,50 = 716,00
//     anteiligPflegegeld = 573 × 0,50 = 286,50
//     kombinationGesamt = 716 + 286,50 = 1.002,50
//   PG 5, 30 % Dienst:
//     anteiligSachleistung = 2200 × 0,30 = 660,00
//     anteiligPflegegeld = 947 × 0,70 = 662,90
//     kombinationGesamt = 1.322,90
//   PG 2, 100 % Dienst:
//     anteiligSachleistung = 761 × 1,00 = 761
//     anteiligPflegegeld = 332 × 0,00 = 0
//     kombinationGesamt = 761
//   PG 2, 0 % Dienst:
//     anteiligSachleistung = 0
//     anteiligPflegegeld = 332
//     kombinationGesamt = 332
//   PG 4, 25 % Dienst:
//     anteiligSachleistung = 1778 × 0,25 = 444,50
//     anteiligPflegegeld = 765 × 0,75 = 573,75
//     kombinationGesamt = 1.018,25

const e1 = calc(3, 'kombination', 50);
cases.push(
  { name: 'E-01 PG 3 komb 50%: anteiligSachleistung = 716',   actual: e1.anteiligSachleistung, expected: 716 },
  { name: 'E-01: anteiligPflegegeld = 286,50',                actual: e1.anteiligPflegegeld,   expected: 286.50 },
  { name: 'E-01: kombinationGesamt = 1.002,50',               actual: e1.kombinationGesamt,    expected: 1002.50 },
  { name: 'E-01: hauptLeistungMonat = kombinationGesamt',     actual: e1.hauptLeistungMonat,   expected: 1002.50 },
  { name: 'E-01: restProzentPflegegeld = 50',                  actual: e1.restProzentPflegegeld, expected: 50 },
);

const e2 = calc(5, 'kombination', 30);
cases.push(
  { name: 'E-02 PG 5 komb 30%: anteiligSachleistung = 660',   actual: e2.anteiligSachleistung, expected: 660 },
  { name: 'E-02: anteiligPflegegeld = 662,90',                actual: e2.anteiligPflegegeld,   expected: 662.90 },
  { name: 'E-02: kombinationGesamt = 1.322,90',               actual: e2.kombinationGesamt,    expected: 1322.90 },
);

const e3 = calc(2, 'kombination', 100);
cases.push(
  { name: 'E-03 PG 2 komb 100%: kombinationGesamt = 761 (= Sachleistung pur)', actual: e3.kombinationGesamt, expected: 761 },
  { name: 'E-03: anteiligPflegegeld = 0 (rest 0%)',           actual: e3.anteiligPflegegeld, expected: 0 },
);

const e4 = calc(2, 'kombination', 0);
cases.push(
  { name: 'E-04 PG 2 komb 0%: kombinationGesamt = 332 (= Pflegegeld pur)', actual: e4.kombinationGesamt, expected: 332 },
  { name: 'E-04: anteiligSachleistung = 0',                   actual: e4.anteiligSachleistung, expected: 0 },
);

const e5 = calc(4, 'kombination', 25);
cases.push(
  { name: 'E-05 PG 4 komb 25%: kombinationGesamt = 1.018,25', actual: e5.kombinationGesamt, expected: 1018.25 },
);

// === Cluster F: Verhinderungs-/Kurzzeitpflege Schwelle PG 2 (§§ 39, 42) ===

const f1 = calc(1, 'angehoerige');
const f2 = calc(2, 'angehoerige');
const f5 = calc(5, 'angehoerige');
cases.push(
  { name: 'F-01 PG 1: verhinderungspflegeJahr = 0 (kein Anspruch)', actual: f1.verhinderungspflegeJahr, expected: 0 },
  { name: 'F-01 PG 1: kurzzeitpflegeJahr = 0',                       actual: f1.kurzzeitpflegeJahr,      expected: 0 },
  { name: 'F-02 PG 2: verhinderungspflegeJahr = 1.612',              actual: f2.verhinderungspflegeJahr, expected: 1612 },
  { name: 'F-02 PG 2: kurzzeitpflegeJahr = 1.774',                   actual: f2.kurzzeitpflegeJahr,      expected: 1774 },
  { name: 'F-03 PG 5: verhinderungspflegeJahr = 1.612 (gleich PG 2)', actual: f5.verhinderungspflegeJahr, expected: 1612 },
  { name: 'F-03 PG 5: kurzzeitpflegeJahr = 1.774 (gleich PG 2)',     actual: f5.kurzzeitpflegeJahr,      expected: 1774 },
);

// === Cluster G: Konstante Sonderleistungen + Strukturelle Invarianten ===
//
// pflegehilfsmittelMonat = 40 (immer, alle PG)
// wohnraumanpassung = 4.000 (immer, alle PG)
// gesamtMonat = hauptLeistungMonat + entlastungsbetrag (immer)
// hauptLeistungJahr = hauptLeistungMonat × 12 (immer)
// entlastungsbetrag = 125 (alle PG inkl. PG 1)

const g1 = calc(1, 'angehoerige');
const g2 = calc(3, 'kombination', 40);
cases.push(
  { name: 'G-01 PG 1: pflegehilfsmittelMonat = 40 (auch ohne Pflegegeld)', actual: g1.pflegehilfsmittelMonat, expected: 40 },
  { name: 'G-01 PG 1: wohnraumanpassung = 4.000',                          actual: g1.wohnraumanpassung,      expected: 4000 },
  { name: 'G-01 PG 1: entlastungsbetrag = 125 (auch PG 1)',                actual: g1.entlastungsbetrag,      expected: 125 },
  { name: 'G-02 Strukturell: gesamtMonat = haupt + entlastung',            actual: g2.gesamtMonat,            expected: g2.hauptLeistungMonat + 125 },
  { name: 'G-02 Strukturell: hauptLeistungJahr = haupt × 12',              actual: g2.hauptLeistungJahr,      expected: g2.hauptLeistungMonat * 12 },
  { name: 'G-02 PG 3 komb 40%: restProzentPflegegeld = 60',                actual: g2.restProzentPflegegeld,  expected: 60 },
);

// === Cluster H: anteilDienst-Clamp ===
//
// Lib clamped via Math.min(100, Math.max(0, anteilDienst)):
//   -10 → 0 (wie 0 % Dienst, voller Pflegegeld-Anteil)
//   150 → 100 (wie 100 % Dienst, voller Sachleistungs-Anteil)

const h1 = calc(3, 'kombination', -10);
const h2 = calc(3, 'kombination', 150);
cases.push(
  { name: 'H-01 anteilDienst = -10 → Clamp 0: kombinationGesamt = 573 (= Pflegegeld)', actual: h1.kombinationGesamt, expected: 573 },
  { name: 'H-01: restProzentPflegegeld = 100',                                          actual: h1.restProzentPflegegeld, expected: 100 },
  { name: 'H-02 anteilDienst = 150 → Clamp 100: kombinationGesamt = 1.432 (= Sachleistung)', actual: h2.kombinationGesamt, expected: 1432 },
  { name: 'H-02: restProzentPflegegeld = 0',                                            actual: h2.restProzentPflegegeld, expected: 0 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  const tol = c.tolerance ?? 0.01;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(
    `  ${status} ${c.name.padEnd(72)} ist ${String(c.actual).padStart(12)}  soll ${String(c.expected).padStart(12)}  Δ ${delta.toFixed(4).padStart(8)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
