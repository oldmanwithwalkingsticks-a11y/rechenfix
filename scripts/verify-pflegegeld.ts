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
 * BMG-Pflegekassen-Beträge 2026 (BMG-Übersicht „Leistungsbeträge 2026“: die Werte ab 01.01.2025, PUEG
 * +4,5 %, gelten 2026 unverändert; nächste Dynamisierung 01.01.2028). W186: vorher die Werte 2024 —
 * der Test war seit Januar 2025 rot (51 Fälle).
 *   PG 1: 0 € Pflegegeld | 0 € Sachleistung | 131 € stationär
 *   PG 2: 347 € | 796 € | 805 €
 *   PG 3: 599 € | 1.497 € | 1.319 €
 *   PG 4: 800 € | 1.859 € | 1.855 €
 *   PG 5: 990 € | 2.299 € | 2.096 €
 *   Entlastungsbetrag § 45b: 131 €/Mon (alle PG inkl. 1)
 *   Verhinderungs- und Kurzzeitpflege: seit 01.07.2025 gemeinsamer Jahresbetrag 3.539 € (§ 42a, ab PG 2)
 *   Pflegehilfsmittel § 40 Abs. 2: 42 €/Mon; Wohnraumanpassung § 40 Abs. 4: 4.180 €
 *
 * L-35-Disziplin (im Verify-Script-Header dokumentiert):
 *   - Stichtag-Switch 01.07.2026 NICHT in der Lib (Konfig-Klarstellung
 *     bestätigt: keine 2026er Dynamisierung)
 *   - Entlastungsbetrag-Akkumulation (6-Monats-Übertrag) NICHT modelliert
 *   - Kombinationsleistung-Halbjahres-Bindung NICHT modelliert
 *   - Stationärer Leistungszuschlag § 43c (15/30/50/75 % je nach Heimjahr)
 *     NICHT modelliert
 *   - Verhinderungs- und Kurzzeitpflege teilen sich seit 01.07.2025 einen Jahresbetrag (§ 42a);
 *     die Lib gibt ihn je Leistung als Obergrenze zurück, die Aufteilung modelliert sie nicht
 *   - Wohnraumanpassung-Mehrfachbeantragung (pro Maßnahme) NICHT modelliert
 *     (Lib gibt nur die Pauschale 4.180 € als Konstante zurück)
 *   - Pflegehilfsmittel-Pauschale 42 € wird auch für PG 1 zurückgegeben
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
  { name: 'A-02 PFLEGEGELD PG 2 = 347 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[2],         expected: 347,  tolerance: 0 },
  { name: 'A-03 PFLEGEGELD PG 3 = 599 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[3],         expected: 599,  tolerance: 0 },
  { name: 'A-04 PFLEGEGELD PG 4 = 800 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[4],         expected: 800,  tolerance: 0 },
  { name: 'A-05 PFLEGEGELD PG 5 = 990 (BMG 2026)',              actual: PFLEGEGELD_TABELLE[5],         expected: 990,  tolerance: 0 },
  // Pflegesachleistung § 36 SGB XI
  { name: 'A-06 SACHLEISTUNG PG 1 = 0 (kein Anspruch)',         actual: PFLEGESACHLEISTUNG_TABELLE[1], expected: 0,    tolerance: 0 },
  { name: 'A-07 SACHLEISTUNG PG 2 = 796 (BMG 2026)',            actual: PFLEGESACHLEISTUNG_TABELLE[2], expected: 796,  tolerance: 0 },
  { name: 'A-08 SACHLEISTUNG PG 3 = 1.497 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[3], expected: 1497, tolerance: 0 },
  { name: 'A-09 SACHLEISTUNG PG 4 = 1.859 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[4], expected: 1859, tolerance: 0 },
  { name: 'A-10 SACHLEISTUNG PG 5 = 2.299 (BMG 2026)',          actual: PFLEGESACHLEISTUNG_TABELLE[5], expected: 2299, tolerance: 0 },
  // Stationär § 43 SGB XI
  { name: 'A-11 STATIONAER PG 1 = 131 (BMG 2026)',              actual: STATIONAER_TABELLE[1],         expected: 131,  tolerance: 0 },
  { name: 'A-12 STATIONAER PG 5 = 2.096 (BMG 2026)',            actual: STATIONAER_TABELLE[5],         expected: 2096, tolerance: 0 },
  // MAX-Konstanten
  { name: 'A-13 ENTLASTUNGSBETRAG = 131 (§ 45b SGB XI)',         actual: ENTLASTUNGSBETRAG,             expected: 131,  tolerance: 0 },
  { name: 'A-14 VERHINDERUNGSPFLEGE_MAX = 3.539 (§ 42a gemeinsam)', actual: VERHINDERUNGSPFLEGE_MAX,     expected: 3539, tolerance: 0 },
  { name: 'A-15 KURZZEITPFLEGE_MAX = 3.539 (§ 42a, derselbe Topf)', actual: KURZZEITPFLEGE_MAX,          expected: 3539, tolerance: 0 },
  { name: 'A-16 PFLEGEHILFSMITTEL_MAX = 42 (§ 40 Abs. 2)',       actual: PFLEGEHILFSMITTEL_MAX,         expected: 42,   tolerance: 0 },
  { name: 'A-17 WOHNRAUMANPASSUNG_MAX = 4.180 (§ 40 Abs. 4)',    actual: WOHNRAUMANPASSUNG_MAX,         expected: 4180, tolerance: 0 },
);

// === Cluster B: Pflegeform 'angehoerige' (§ 37) — Pflegegeld pur ===
//
// hauptLeistungMonat = PFLEGEGELD[pg]
// gesamtMonat = pflegegeld + 131 (Entlastungsbetrag)

const b1 = calc(1, 'angehoerige');
const b2 = calc(2, 'angehoerige');
const b3 = calc(3, 'angehoerige');
const b4 = calc(4, 'angehoerige');
const b5 = calc(5, 'angehoerige');
cases.push(
  { name: 'B-01 PG 1 angehoerige: hauptLeistungMonat = 0',     actual: b1.hauptLeistungMonat, expected: 0 },
  { name: 'B-01: gesamtMonat = 0 + 131 = 131 (nur Entlastung)', actual: b1.gesamtMonat,        expected: 131 },
  { name: 'B-02 PG 2 angehoerige: hauptLeistungMonat = 347',   actual: b2.hauptLeistungMonat, expected: 347 },
  { name: 'B-02: gesamtMonat = 347 + 131 = 478',                actual: b2.gesamtMonat,        expected: 478 },
  { name: 'B-03 PG 3 angehoerige: hauptLeistungMonat = 599',   actual: b3.hauptLeistungMonat, expected: 599 },
  { name: 'B-03: gesamtMonat = 599 + 131 = 730',                actual: b3.gesamtMonat,        expected: 730 },
  { name: 'B-04 PG 4 angehoerige: hauptLeistungMonat = 800',   actual: b4.hauptLeistungMonat, expected: 800 },
  { name: 'B-05 PG 5 angehoerige: hauptLeistungMonat = 990',   actual: b5.hauptLeistungMonat, expected: 990 },
  { name: 'B-05: gesamtMonat = 990 + 131 = 1.121',              actual: b5.gesamtMonat,        expected: 1121 },
  { name: 'B-05: hauptLeistungJahr = 990 × 12 = 11.880',        actual: b5.hauptLeistungJahr,  expected: 11880 },
);

// === Cluster C: Pflegeform 'dienst' (§ 36) — Pflegesachleistung ===

const c2 = calc(2, 'dienst');
const c3 = calc(3, 'dienst');
const c5 = calc(5, 'dienst');
cases.push(
  { name: 'C-01 PG 2 dienst: hauptLeistungMonat = 796',        actual: c2.hauptLeistungMonat, expected: 796 },
  { name: 'C-01: gesamtMonat = 796 + 131 = 927',                actual: c2.gesamtMonat,        expected: 927 },
  { name: 'C-02 PG 3 dienst: hauptLeistungMonat = 1.497',      actual: c3.hauptLeistungMonat, expected: 1497 },
  { name: 'C-03 PG 5 dienst: hauptLeistungMonat = 2.299',      actual: c5.hauptLeistungMonat, expected: 2299 },
);

// === Cluster D: Pflegeform 'stationaer' (§ 43) ===

const d1 = calc(1, 'stationaer');
const d2 = calc(2, 'stationaer');
const d5 = calc(5, 'stationaer');
cases.push(
  { name: 'D-01 PG 1 stationaer: hauptLeistungMonat = 131',    actual: d1.hauptLeistungMonat, expected: 131 },
  { name: 'D-02 PG 2 stationaer: hauptLeistungMonat = 805',    actual: d2.hauptLeistungMonat, expected: 805 },
  { name: 'D-03 PG 5 stationaer: hauptLeistungMonat = 2.096',  actual: d5.hauptLeistungMonat, expected: 2096 },
);

// === Cluster E: Kombinationsleistung § 38 SGB XI ===
//
// Manuell:
//   PG 3, 50 % Dienst:
//     anteiligSachleistung = 1497 × 0,50 = 748,50
//     anteiligPflegegeld = 599 × 0,50 = 299,50
//     kombinationGesamt = 748,50 + 299,50 = 1.048,00
//   PG 5, 30 % Dienst:
//     anteiligSachleistung = 2299 × 0,30 = 689,70
//     anteiligPflegegeld = 990 × 0,70 = 693,00
//     kombinationGesamt = 1.382,70
//   PG 2, 100 % Dienst:
//     anteiligSachleistung = 796 × 1,00 = 796
//     anteiligPflegegeld = 347 × 0,00 = 0
//     kombinationGesamt = 796
//   PG 2, 0 % Dienst:
//     anteiligSachleistung = 0
//     anteiligPflegegeld = 347
//     kombinationGesamt = 347
//   PG 4, 25 % Dienst:
//     anteiligSachleistung = 1859 × 0,25 = 464,75
//     anteiligPflegegeld = 800 × 0,75 = 600,00
//     kombinationGesamt = 1.064,75

const e1 = calc(3, 'kombination', 50);
cases.push(
  { name: 'E-01 PG 3 komb 50%: anteiligSachleistung = 748,50', actual: e1.anteiligSachleistung, expected: 748.50 },
  { name: 'E-01: anteiligPflegegeld = 299,50',                actual: e1.anteiligPflegegeld,   expected: 299.50 },
  { name: 'E-01: kombinationGesamt = 1.048,00',               actual: e1.kombinationGesamt,    expected: 1048.00 },
  { name: 'E-01: hauptLeistungMonat = kombinationGesamt',     actual: e1.hauptLeistungMonat,   expected: 1048.00 },
  { name: 'E-01: restProzentPflegegeld = 50',                  actual: e1.restProzentPflegegeld, expected: 50 },
);

const e2 = calc(5, 'kombination', 30);
cases.push(
  { name: 'E-02 PG 5 komb 30%: anteiligSachleistung = 689,70', actual: e2.anteiligSachleistung, expected: 689.70 },
  { name: 'E-02: anteiligPflegegeld = 693,00',                actual: e2.anteiligPflegegeld,   expected: 693.00 },
  { name: 'E-02: kombinationGesamt = 1.382,70',               actual: e2.kombinationGesamt,    expected: 1382.70 },
);

const e3 = calc(2, 'kombination', 100);
cases.push(
  { name: 'E-03 PG 2 komb 100%: kombinationGesamt = 796 (= Sachleistung pur)', actual: e3.kombinationGesamt, expected: 796 },
  { name: 'E-03: anteiligPflegegeld = 0 (rest 0%)',           actual: e3.anteiligPflegegeld, expected: 0 },
);

const e4 = calc(2, 'kombination', 0);
cases.push(
  { name: 'E-04 PG 2 komb 0%: kombinationGesamt = 347 (= Pflegegeld pur)', actual: e4.kombinationGesamt, expected: 347 },
  { name: 'E-04: anteiligSachleistung = 0',                   actual: e4.anteiligSachleistung, expected: 0 },
);

const e5 = calc(4, 'kombination', 25);
cases.push(
  { name: 'E-05 PG 4 komb 25%: kombinationGesamt = 1.064,75', actual: e5.kombinationGesamt, expected: 1064.75 },
);

// === Cluster F: Verhinderungs-/Kurzzeitpflege Schwelle PG 2 (§§ 39, 42) ===

const f1 = calc(1, 'angehoerige');
const f2 = calc(2, 'angehoerige');
const f5 = calc(5, 'angehoerige');
cases.push(
  { name: 'F-01 PG 1: verhinderungspflegeJahr = 0 (kein Anspruch)', actual: f1.verhinderungspflegeJahr, expected: 0 },
  { name: 'F-01 PG 1: kurzzeitpflegeJahr = 0',                       actual: f1.kurzzeitpflegeJahr,      expected: 0 },
  { name: 'F-02 PG 2: verhinderungspflegeJahr = 3.539 (§ 42a)',      actual: f2.verhinderungspflegeJahr, expected: 3539 },
  { name: 'F-02 PG 2: kurzzeitpflegeJahr = 3.539 (derselbe Topf)',    actual: f2.kurzzeitpflegeJahr,      expected: 3539 },
  { name: 'F-03 PG 5: verhinderungspflegeJahr = 3.539 (gleich PG 2)', actual: f5.verhinderungspflegeJahr, expected: 3539 },
  { name: 'F-03 PG 5: kurzzeitpflegeJahr = 3.539 (gleich PG 2)',     actual: f5.kurzzeitpflegeJahr,      expected: 3539 },
);

// === Cluster G: Konstante Sonderleistungen + Strukturelle Invarianten ===
//
// pflegehilfsmittelMonat = 42 (immer, alle PG)
// wohnraumanpassung = 4.180 (immer, alle PG)
// gesamtMonat = hauptLeistungMonat + entlastungsbetrag (immer)
// hauptLeistungJahr = hauptLeistungMonat × 12 (immer)
// entlastungsbetrag = 131 (alle PG inkl. PG 1)

const g1 = calc(1, 'angehoerige');
const g2 = calc(3, 'kombination', 40);
cases.push(
  { name: 'G-01 PG 1: pflegehilfsmittelMonat = 42 (auch ohne Pflegegeld)', actual: g1.pflegehilfsmittelMonat, expected: 42 },
  { name: 'G-01 PG 1: wohnraumanpassung = 4.180',                          actual: g1.wohnraumanpassung,      expected: 4180 },
  { name: 'G-01 PG 1: entlastungsbetrag = 131 (auch PG 1)',                actual: g1.entlastungsbetrag,      expected: 131 },
  { name: 'G-02 Strukturell: gesamtMonat = haupt + entlastung',            actual: g2.gesamtMonat,            expected: g2.hauptLeistungMonat + 131 },
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
  { name: 'H-01 anteilDienst = -10 → Clamp 0: kombinationGesamt = 599 (= Pflegegeld)', actual: h1.kombinationGesamt, expected: 599 },
  { name: 'H-01: restProzentPflegegeld = 100',                                          actual: h1.restProzentPflegegeld, expected: 100 },
  { name: 'H-02 anteilDienst = 150 → Clamp 100: kombinationGesamt = 1.497 (= Sachleistung)', actual: h2.kombinationGesamt, expected: 1497 },
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
