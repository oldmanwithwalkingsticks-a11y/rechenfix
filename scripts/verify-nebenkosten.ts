/**
 * Verify-Script für lib/berechnungen/nebenkosten.ts (Welle-4 M3c, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - BetrKV § 2 (Aufstellung der Betriebskosten):
 *     https://www.gesetze-im-internet.de/betrkv/__2.html
 *   - BetrKV § 1 Abs. 2 (Nicht-umlegbare Kosten: Verwaltung, Reparaturen,
 *     Instandhaltung)
 *   - Mieterbund-Betriebskostenspiegel 2023 (letzter veröffentlichter Stand,
 *     gepflegt in Welle-3-M6 + 148c): 2,51 €/qm Durchschnitt, 3,15 €/qm
 *     voll-Last → reine Konfig-Erklärtext-Cross-Check, NICHT Lib-modelliert
 *
 * L-35-Disziplin (verschärft bei nebenkosten — Hot-Spot):
 *   Die Lib ist ein **reiner Summen-Rechner** mit user-eingegebenen Posten-
 *   Beträgen. Sie modelliert NICHT:
 *     - Mieterbund-€/qm-Defaults / BetrKV-§-2-Posten-Liste
 *     - Umlegbar/Nicht-umlegbar-Logik (BetrKV § 1 Abs. 2)
 *     - Heiz-/Warmwasser-Sonderlogik (HeizkostenV)
 *     - Plausibilitäts-Validierung gegen Mieterbund-Spiegel
 *   Die Konfig-Erklärtexte (Welle-3-M6 + 148c) erwähnen Mieterbund-Werte
 *   und volle BetrKV-Liste — das ist UI-Doku, nicht Lib-Spec. Tests bleiben
 *   bewusst auf Lib-Realität (Summen-Mathematik) fokussiert.
 *
 * Test-Strategie:
 *   - Posten-Summen-Mathematik (verschiedene Konstellationen)
 *   - Negativ-Posten-Filter (Math.max(0, betrag) in Summe + filter > 0
 *     in aufschluesselung)
 *   - Strukturelle Invarianten (warmmiete = kaltmiete + nebenkostenMonat,
 *     jahr = monat × 12, ProQm = / wohnflaeche)
 *   - Round-Trip mit Mieterbund-Werten (Cross-Check Konfig-Doku)
 *   - Edge mit Null-Returns (kaltmiete<0 oder wohnflaeche<=0)
 *
 * Ausführen: npx tsx scripts/verify-nebenkosten.ts
 */

import { berechneNebenkosten } from '../lib/berechnungen/nebenkosten';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const isNull = (v: unknown): number => v === null ? 1 : 0;

const calc = (params: {
  kaltmiete?: number;
  wohnflaeche?: number;
  personenAnzahl?: number;
  heizkosten?: number;
  warmwasser?: number;
  wasser?: number;
  muell?: number;
  grundsteuer?: number;
  versicherung?: number;
  hauswart?: number;
  sonstige?: number;
}) => berechneNebenkosten({
  kaltmiete: params.kaltmiete ?? 650,
  wohnflaeche: params.wohnflaeche ?? 65,
  personenAnzahl: params.personenAnzahl ?? 2,
  heizkosten: params.heizkosten ?? 0,
  warmwasser: params.warmwasser ?? 0,
  wasser: params.wasser ?? 0,
  muell: params.muell ?? 0,
  grundsteuer: params.grundsteuer ?? 0,
  versicherung: params.versicherung ?? 0,
  hauswart: params.hauswart ?? 0,
  sonstige: params.sonstige ?? 0,
});

// === Cluster A: Summen-Mathematik mit Standard-Defaults ===
//
// Manuell:
//   Defaults aus Component (kaltmiete=650, wohnflaeche=65,
//   heizkosten=80, warmwasser=25, wasser=35, muell=20, grundsteuer=15,
//   versicherung=10, hauswart=15, sonstige=0):
//     nebenkostenMonat = 80+25+35+20+15+10+15+0 = 200
//     nebenkostenJahr = 2400
//     warmmiete = 650 + 200 = 850
//     nebenkostenProQm = 200 / 65 = 3,07692... → round 3,08
//     warmmieteProQm = 850 / 65 = 13,07692... → round 13,08
//     anteilAnWarmmiete = 200 / 850 × 100 = 23,529... → round 23,5
//     aufschluesselung-length = 7 (sonstige=0 wird weggefiltert)

const a1 = calc({
  kaltmiete: 650, wohnflaeche: 65,
  heizkosten: 80, warmwasser: 25, wasser: 35, muell: 20,
  grundsteuer: 15, versicherung: 10, hauswart: 15, sonstige: 0,
});
cases.push(
  { name: 'A-01 Default-Posten Summe: nebenkostenMonat = 200',  actual: a1!.nebenkostenMonat,    expected: 200 },
  { name: 'A-01 nebenkostenJahr = 200 × 12 = 2.400',            actual: a1!.nebenkostenJahr,     expected: 2400 },
  { name: 'A-01 warmmiete = 650 + 200 = 850',                   actual: a1!.warmmiete,           expected: 850 },
  { name: 'A-01 nebenkostenProQm = 200/65 ≈ 3,08',              actual: a1!.nebenkostenProQm,    expected: 3.08 },
  { name: 'A-01 warmmieteProQm = 850/65 ≈ 13,08',               actual: a1!.warmmieteProQm,      expected: 13.08 },
  { name: 'A-01 anteilAnWarmmiete = 200/850 × 100 ≈ 23,5',      actual: a1!.anteilAnWarmmiete,   expected: 23.5, tolerance: 0.05 },
  { name: 'A-01 aufschluesselung-length = 7 (sonstige=0 raus)', actual: a1!.aufschluesselung.length, expected: 7, tolerance: 0 },
);

// === Cluster B: Posten-Summe Variationen ===
//
// Nur Heizkosten:
const b1 = calc({ kaltmiete: 500, wohnflaeche: 50, heizkosten: 120 });
cases.push(
  { name: 'B-01 Nur Heizkosten 120: nebenkostenMonat = 120',    actual: b1!.nebenkostenMonat, expected: 120 },
  { name: 'B-01 aufschluesselung = 1 Posten',                    actual: b1!.aufschluesselung.length, expected: 1, tolerance: 0 },
);

// Nur Sonstige (Edge: einzelner Posten, übrige 0):
const b2 = calc({ kaltmiete: 800, wohnflaeche: 80, sonstige: 100 });
cases.push(
  { name: 'B-02 Nur Sonstige 100: nebenkostenMonat = 100',      actual: b2!.nebenkostenMonat, expected: 100 },
  { name: 'B-02 aufschluesselung = 1 Posten',                    actual: b2!.aufschluesselung.length, expected: 1, tolerance: 0 },
);

// Alle 8 Posten gefüllt:
const b3 = calc({
  kaltmiete: 700, wohnflaeche: 70,
  heizkosten: 50, warmwasser: 30, wasser: 25, muell: 15,
  grundsteuer: 20, versicherung: 12, hauswart: 18, sonstige: 5,
});
cases.push(
  { name: 'B-03 Alle 8 Posten: Summe = 175',                    actual: b3!.nebenkostenMonat, expected: 175 },
  { name: 'B-03 aufschluesselung-length = 8 (alle > 0)',         actual: b3!.aufschluesselung.length, expected: 8, tolerance: 0 },
);

// === Cluster C: Negativ-Posten-Filter ===
//
// Math.max(0, betrag) in der Summe; filter > 0 in der aufschluesselung.
// → Negativ-Werte werden in beiden ignoriert.

const c1 = calc({ kaltmiete: 500, wohnflaeche: 50, heizkosten: -50 });
cases.push(
  { name: 'C-01 Heizkosten=-50: Summe = 0 (max-Floor)',         actual: c1!.nebenkostenMonat,      expected: 0 },
  { name: 'C-01 aufschluesselung = 0 (filter > 0)',              actual: c1!.aufschluesselung.length, expected: 0, tolerance: 0 },
);

// Mix aus positiven + negativen + Null:
const c2 = calc({
  kaltmiete: 600, wohnflaeche: 60,
  heizkosten: 80, warmwasser: -30, wasser: 0, sonstige: 20,
});
cases.push(
  { name: 'C-02 Mix +80 / -30 / 0 / +20: Summe = 100',          actual: c2!.nebenkostenMonat, expected: 100 },
  { name: 'C-02 aufschluesselung = 2 Posten (nur > 0)',         actual: c2!.aufschluesselung.length, expected: 2, tolerance: 0 },
);

// === Cluster D: Strukturelle Invarianten ===
//
// warmmiete = kaltmiete + nebenkostenMonat (mit Cent-Rundung der Lib)
// nebenkostenJahr = nebenkostenMonat × 12
// nebenkostenProQm = nebenkostenMonat / wohnflaeche (auf 2 Dezimalen)

const d1 = calc({
  kaltmiete: 750, wohnflaeche: 75,
  heizkosten: 60, warmwasser: 20, wasser: 30, muell: 18,
  grundsteuer: 12, versicherung: 8, hauswart: 14, sonstige: 0,
});
cases.push(
  { name: 'D-01 warmmiete = kaltmiete + nebenkostenMonat',       actual: d1!.warmmiete,        expected: 750 + d1!.nebenkostenMonat },
  { name: 'D-01 nebenkostenJahr = monat × 12',                   actual: d1!.nebenkostenJahr,  expected: d1!.nebenkostenMonat * 12 },
);

// === Cluster E: Round-Trip Mieterbund-Werte (Konfig-Cross-Check, KEIN Lib-Test) ===
//
// Mieterbund-2023-Durchschnitt: 2,51 €/qm. Bei 65 qm → 163,15 € erwartet.
// Wenn ein User die einzelnen Posten so eingibt, dass nebenkostenMonat = 163 €
// resultiert, sollte nebenkostenProQm ≈ 2,51 sein:
//   163 / 65 = 2,5076923... → round 2,51 ✓

const e1 = calc({
  kaltmiete: 600, wohnflaeche: 65,
  heizkosten: 60, warmwasser: 20, wasser: 25, muell: 20,
  grundsteuer: 15, versicherung: 8, hauswart: 15, sonstige: 0,
});
cases.push(
  { name: 'E-01 Round-Trip Mieterbund Ø: 163/65 ≈ 2,51 €/qm',   actual: e1!.nebenkostenProQm, expected: 2.51, tolerance: 0.01 },
);

// Mieterbund-2023-Voll-Last: 3,15 €/qm. Bei 80 qm → 252 € erwartet.
//   252 / 80 = 3,15 exakt
const e2 = calc({
  kaltmiete: 800, wohnflaeche: 80,
  heizkosten: 90, warmwasser: 30, wasser: 35, muell: 25,
  grundsteuer: 20, versicherung: 12, hauswart: 25, sonstige: 15,
});
cases.push(
  { name: 'E-02 Round-Trip Mieterbund Voll: 252/80 = 3,15 €/qm', actual: e2!.nebenkostenProQm, expected: 3.15, tolerance: 0.005 },
);

// === Cluster F: Edge - Null-Returns ===
//
// kaltmiete < 0 → null; wohnflaeche <= 0 → null

cases.push(
  { name: 'F-01 kaltmiete = -100 → null',                       actual: isNull(calc({ kaltmiete: -100, wohnflaeche: 60 })), expected: 1, tolerance: 0 },
  { name: 'F-02 wohnflaeche = 0 → null',                         actual: isNull(calc({ kaltmiete: 600, wohnflaeche: 0 })),  expected: 1, tolerance: 0 },
  { name: 'F-03 wohnflaeche = -50 → null',                       actual: isNull(calc({ kaltmiete: 600, wohnflaeche: -50 })), expected: 1, tolerance: 0 },
  { name: 'F-04 kaltmiete = 0 → nicht null (0 ist erlaubt)',     actual: isNull(calc({ kaltmiete: 0, wohnflaeche: 50 })),   expected: 0, tolerance: 0 },
);

// === Cluster G: aufschluesselung-Inhalt ===
//
// Posten mit > 0 erscheinen in der Liste mit korrekten Labels und Beträgen.
// Lib-Posten-Reihenfolge: Heizkosten, Warmwasser, Wasser/Abwasser, Müllentsorgung,
//                         Grundsteuer, Gebäudeversicherung, Hauswart/Hausmeister, Sonstige

const g1 = calc({
  kaltmiete: 500, wohnflaeche: 50,
  heizkosten: 100, warmwasser: 0, wasser: 50, muell: 0,
  grundsteuer: 0, versicherung: 0, hauswart: 0, sonstige: 30,
});
cases.push(
  { name: 'G-01 aufschluesselung-length = 3 (Heizkosten + Wasser + Sonstige)', actual: g1!.aufschluesselung.length, expected: 3, tolerance: 0 },
  { name: 'G-01 aufschluesselung[0] = Heizkosten (Reihenfolge erhalten)',      actual: g1!.aufschluesselung[0].betrag, expected: 100 },
  { name: 'G-01 aufschluesselung[1] = Wasser (überspringt warmwasser=0)',      actual: g1!.aufschluesselung[1].betrag, expected: 50 },
  { name: 'G-01 aufschluesselung[2] = Sonstige (überspringt 4 Null-Posten)',   actual: g1!.aufschluesselung[2].betrag, expected: 30 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (c.actual === null && c.expected === null) {
    ok = true;
  } else if (c.actual === null || c.expected === null) {
    ok = false;
  } else {
    const tol = c.tolerance ?? 0.01;
    ok = Math.abs(c.actual - c.expected) <= tol;
  }
  const status = ok ? '✓' : '✗';
  const actualStr = c.actual === null ? 'null' : String(c.actual);
  const expectedStr = c.expected === null ? 'null' : String(c.expected);
  console.log(
    `  ${status} ${c.name.padEnd(64)} ist ${actualStr.padStart(12)}  soll ${expectedStr.padStart(12)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
