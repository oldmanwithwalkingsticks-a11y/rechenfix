/**
 * Verify-Script für lib/berechnungen/pendlerpauschale.ts (Welle-4 M2a, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - EStG § 9 Abs. 1 Satz 3 Nr. 4 (Entfernungspauschale, BMF-/Finanzgerichts-
 *     Standard-Zitierweise): https://www.gesetze-im-internet.de/estg/__9.html
 *   - StÄndG 2025 (BGBl. I 2025 Nr. 363): einheitlicher Satz 0,38 €/km ab dem
 *     ersten Kilometer seit 01.01.2026 (Ablösung der vormaligen 0,30/0,38-Staffel).
 *   - EStG § 4 Abs. 5 Nr. 6c (Homeoffice-Pauschale): 6 €/Tag, max. 210 Tage:
 *     https://www.gesetze-im-internet.de/estg/__4.html
 *
 * Stand: testet GEGENWÄRTIGEN Lib-Stand (PENDLERPAUSCHALE_SATZ_2026 = 0,38).
 * Welle-3-Slot 152c (potenzielle 45-Cent-Reform) bleibt geparkt — nicht
 * vorausnehmen.
 *
 * Lib-Befund: § 101 EStG Mobilitätsprämie wird NICHT in der Lib modelliert
 * (nur im Erklärtext der Konfig erwähnt) → kein Test-Cluster dafür.
 *
 * Ausführen: npx tsx scripts/verify-pendlerpauschale.ts
 */

import {
  berechnePendlerpauschale,
  berechneArbeitstage,
  PENDLERPAUSCHALE_SATZ_2026,
  HOMEOFFICE_PAUSCHALE_PRO_TAG,
  HOMEOFFICE_PAUSCHALE_MAX_TAGE,
} from '../lib/berechnungen/pendlerpauschale';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number; // Default 0.01
};

const cases: TestCase[] = [];

// Helper für Null-Checks (L-33 Variant b)
const isNull = (v: unknown): number => v === null ? 1 : 0;

const calc = (km: number, tage: number, sat: number, ho = 0, awWoche = 5) =>
  berechnePendlerpauschale({
    entfernungKm: km,
    arbeitstageProJahr: tage,
    grenzsteuersatz: sat,
    homeofficeTageProWoche: ho,
    arbeitstageProWoche: awWoche,
  });

// === Cluster A: Konstanten gegen StÄndG 2025 ===

cases.push(
  { name: 'A-01 PENDLERPAUSCHALE_SATZ_2026 (StÄndG 2025)', actual: PENDLERPAUSCHALE_SATZ_2026, expected: 0.38, tolerance: 0.0001 },
  { name: 'A-02 HOMEOFFICE_PAUSCHALE_PRO_TAG (§ 4 Abs. 5)', actual: HOMEOFFICE_PAUSCHALE_PRO_TAG, expected: 6, tolerance: 0 },
  { name: 'A-03 HOMEOFFICE_PAUSCHALE_MAX_TAGE',             actual: HOMEOFFICE_PAUSCHALE_MAX_TAGE, expected: 210, tolerance: 0 },
);

// === Cluster B: Entfernungspauschale (einheitlicher 0,38-Tarif) ===
//
// Manuell: pauschale = km × 0,38 × tage; ersparnis = pauschale × satz/100
//   25 km × 0,38 × 220 = 2.090,00 €; bei 35 % → 731,50 €
//   10 km × 0,38 × 220 =   836,00 €; bei 35 % → 292,60 €
//   50 km × 0,38 × 200 = 3.800,00 €; bei 42 % → 1.596,00 €
//   100 km × 0,38 × 230 = 8.740,00 €; bei 45 % → 3.933,00 €
//   1 km × 0,38 × 200 = 76,00 €; bei 14 % → 10,64 €

const b1 = calc(25, 220, 35);
cases.push(
  { name: 'B-01 25 km, 220 Tage @ 35 %: pauschaleGesamt',  actual: b1!.pauschaleGesamt,  expected: 2090.00 },
  { name: 'B-01 25 km, 220 Tage @ 35 %: steuerersparnis',  actual: b1!.steuerersparnis,  expected: 731.50 },
);

const b2 = calc(10, 220, 35);
cases.push(
  { name: 'B-02 10 km, 220 Tage @ 35 %: pauschaleGesamt',  actual: b2!.pauschaleGesamt,  expected: 836.00 },
  { name: 'B-02 10 km, 220 Tage @ 35 %: steuerersparnis',  actual: b2!.steuerersparnis,  expected: 292.60 },
);

const b3 = calc(50, 200, 42);
cases.push(
  { name: 'B-03 50 km, 200 Tage @ 42 %: pauschaleGesamt',  actual: b3!.pauschaleGesamt,  expected: 3800.00 },
  { name: 'B-03 50 km, 200 Tage @ 42 %: steuerersparnis',  actual: b3!.steuerersparnis,  expected: 1596.00 },
);

const b4 = calc(100, 230, 45);
cases.push(
  { name: 'B-04 100 km, 230 Tage @ 45 %: pauschaleGesamt', actual: b4!.pauschaleGesamt,  expected: 8740.00 },
  { name: 'B-04 100 km, 230 Tage @ 45 %: steuerersparnis', actual: b4!.steuerersparnis,  expected: 3933.00 },
);

const b5 = calc(1, 200, 14);
cases.push(
  { name: 'B-05 1 km, 200 Tage @ 14 %: pauschaleGesamt',   actual: b5!.pauschaleGesamt, expected: 76.00 },
  { name: 'B-05 1 km, 200 Tage @ 14 %: steuerersparnis',   actual: b5!.steuerersparnis, expected: 10.64 },
);

// monatlicheErsparnis = steuerersparnis / 12
//   B-01: 731,50 / 12 = 60,9583... ≈ 60.958333
cases.push(
  { name: 'B-06 monatlicheErsparnis = ersparnis/12 (B-01)', actual: b1!.monatlicheErsparnis, expected: 731.50 / 12 },
);

// === Cluster C: Homeoffice-Pauschale § 4 Abs. 5 Nr. 6c EStG ===
//
//  - 0 HO-Tage/Woche → homeofficeTageJahr = 0, homeofficePauschale = 0
//  - 2 HO/5-Tage-Woche, 220 Arbeitstage/J: ho = round(2 × 220/5) = round(88) = 88;
//                                          pauschale = 88 × 6 = 528 €
//  - 5 HO/5-Tage-Woche, 230 Arbeitstage/J: ho = min(round(230), 210) = 210;
//                                          pauschale = 210 × 6 = 1.260 €  (Cap)
//  - 6 HO/5-Tage-Woche, 230 Arbeitstage/J: ho = min(round(276), 210) = 210 (Cap)

const c1 = calc(25, 220, 35, 0, 5);
cases.push(
  { name: 'C-01 0 HO-Tage: homeofficeTageJahr',     actual: c1!.homeofficeTageJahr,   expected: 0,    tolerance: 0 },
  { name: 'C-01 0 HO-Tage: homeofficePauschale',    actual: c1!.homeofficePauschale,  expected: 0 },
);

const c2 = calc(25, 220, 35, 2, 5);
cases.push(
  { name: 'C-02 2 HO/5-Wo, 220 Tage: homeofficeTageJahr',  actual: c2!.homeofficeTageJahr,  expected: 88,  tolerance: 0 },
  { name: 'C-02 2 HO/5-Wo, 220 Tage: homeofficePauschale', actual: c2!.homeofficePauschale, expected: 528 },
);

const c3 = calc(25, 230, 35, 5, 5);
cases.push(
  { name: 'C-03 5 HO/5-Wo, 230 Tage: Cap auf 210 Tage',    actual: c3!.homeofficeTageJahr,  expected: 210, tolerance: 0 },
  { name: 'C-03 Cap-Pauschale = 1.260 €',                  actual: c3!.homeofficePauschale, expected: 1260 },
);

const c4 = calc(25, 230, 35, 6, 5);
cases.push(
  { name: 'C-04 6 HO/5-Wo (über Wochenkapazität): Cap',    actual: c4!.homeofficeTageJahr,  expected: 210, tolerance: 0 },
);

// homeofficeVorteilhaft: HO > Pendler?
//   B-01 (2.090 € Pendler) vs. 0 € HO → false
//   Bei 1 km × 100 Tage × 0,38 = 38 € Pendler vs. 5 HO × 6 € × 100/5 = 600 € → true
const c5 = calc(1, 100, 14, 5, 5);
cases.push(
  { name: 'C-05 homeofficeVorteilhaft (1 km vs. 5 HO)', actual: c5!.homeofficeVorteilhaft ? 1 : 0, expected: 1, tolerance: 0 },
);

// === Cluster D: berechneArbeitstage ===
//
//   5/Wo, 30 Url, 10 Feiertage, 5 Krank, 0 HO:
//     brutto = 5 × 52 = 260
//     netto = 260 - 30 - 10 - 5 = 215
//     anteilPraesenz = (5 - 0) / 5 = 1
//     ergebnis = round(215 × 1) = 215
//
//   5/Wo, 30 Url, 10 FT, 5 Krank, 2 HO:
//     netto = 215; anteilPraesenz = 3/5 = 0,6
//     ergebnis = round(215 × 0,6) = round(129) = 129
//
//   4/Wo (Teilzeit), 25 Url, 8 FT, 0 Krank, 0 HO:
//     brutto = 4 × 52 = 208
//     netto = 208 - 25 - 8 = 175
//     anteil = 4/4 = 1
//     ergebnis = 175
//
//   5/Wo, 0 Url, 0 FT, 0 Krank, 0 HO: brutto = 260, netto = 260, ergebnis = 260
//
//   0/Wo (Edge): brutto = 0, netto = -45 → max(0, ...) = 0

cases.push(
  { name: 'D-01 5/Wo, 30/10/5 Url/FT/Krank, 0 HO',      actual: berechneArbeitstage(5, 30, 10, 5, 0), expected: 215, tolerance: 0 },
  { name: 'D-02 5/Wo, 30/10/5 Url/FT/Krank, 2 HO',      actual: berechneArbeitstage(5, 30, 10, 5, 2), expected: 129, tolerance: 0 },
  { name: 'D-03 4/Wo (Teilzeit), 25/8/0',               actual: berechneArbeitstage(4, 25, 8, 0, 0),  expected: 175, tolerance: 0 },
  { name: 'D-04 5/Wo, 0/0/0/0',                          actual: berechneArbeitstage(5, 0, 0, 0, 0),   expected: 260, tolerance: 0 },
  { name: 'D-05 Edge: 0/Wo (Floor 0)',                   actual: berechneArbeitstage(0, 30, 10, 5, 0), expected: 0,   tolerance: 0 },
);

// === Cluster E: Edge mit Null-Returns ===

cases.push(
  { name: 'E-01 entfernungKm = 0 → null',          actual: isNull(calc(0, 220, 35)),      expected: 1 },
  { name: 'E-02 entfernungKm negativ → null',      actual: isNull(calc(-5, 220, 35)),     expected: 1 },
  { name: 'E-03 arbeitstageProJahr = 0 → null',    actual: isNull(calc(25, 0, 35)),       expected: 1 },
  { name: 'E-04 arbeitstageProJahr negativ → null',actual: isNull(calc(25, -10, 35)),     expected: 1 },
  { name: 'E-05 grenzsteuersatz = 0 → null',       actual: isNull(calc(25, 220, 0)),      expected: 1 },
  { name: 'E-06 grenzsteuersatz negativ → null',   actual: isNull(calc(25, 220, -5)),     expected: 1 },
  { name: 'E-07 Mindest-Input → nicht null',       actual: isNull(calc(1, 1, 14)),        expected: 0 },
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
    `  ${status} ${c.name.padEnd(58)} ist ${String(c.actual).padStart(14)}  soll ${String(c.expected).padStart(14)}  Δ ${delta.toFixed(4).padStart(8)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
