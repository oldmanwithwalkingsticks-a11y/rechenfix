/**
 * Verify-Script für lib/berechnungen/mietpreisbremse.ts
 * (Welle-5 Track-A Block-C C1, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 556d BGB: https://www.gesetze-im-internet.de/bgb/__556d.html
 *   - § 556e BGB (Vor-Mietzins-Schutz, hier nur als boolean-Ausnahme)
 *   - § 556f BGB (Ausnahmen Erstbezug + umfassende Modernisierung)
 *
 * **Welle-2-refactor-only-Akzeptanz:** C1 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block, keine fachliche Wert-Änderung. Alle Cases prüfen
 * die mathematische Tarif-Definition aus § 556d direkt (Vergleichsmiete × 1,10),
 * nicht gegen Pre-Refactor-Snapshot.
 *
 * **L-35-Disziplin:** Lib modelliert §§ 556e/f nur als boolean-Ausnahmen
 * (`greiftBremse=false`), nicht als Wert-Vergleich oder Datums-Check. Tests
 * verifizieren die boolean-Logik, nicht die Tatbestand-Werte.
 *
 * Tolerance: 0,01 € für €-Werte (reine Multiplikation, keine Floating-
 * Akkumulation).
 *
 * Ausführen: npx tsx scripts/verify-mietpreisbremse.ts
 */

import {
  MIETPREISBREMSE_AUFSCHLAG_PROZENT,
  MIETPREISBREMSE_FAKTOR,
  berechneMietpreisbremse,
} from '../lib/berechnungen/mietpreisbremse';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const bool = (v: boolean): number => (v ? 1 : 0);

// === Cluster A: Konstanten (§ 556d Abs. 1 BGB) ===

cases.push(
  { name: 'A-01 MIETPREISBREMSE_AUFSCHLAG_PROZENT = 0,10 (§ 556d Abs. 1)',  actual: MIETPREISBREMSE_AUFSCHLAG_PROZENT, expected: 0.10, tolerance: 0.0001 },
  { name: 'A-02 MIETPREISBREMSE_FAKTOR = 1,10 (1 + Aufschlag)',              actual: MIETPREISBREMSE_FAKTOR, expected: 1.10, tolerance: 0.0001 },
);

// === Cluster B: § 556d zulässige Höchstmiete (Vergleichsmiete × 1,10) ===

const b1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
const b2 = berechneMietpreisbremse({ vergleichsmiete: 8, aktuelleMiete: 8, wohnflaeche: 50, giltBremse: true, ausnahme: 'keine' });
const b3 = berechneMietpreisbremse({ vergleichsmiete: 15, aktuelleMiete: 16, wohnflaeche: 80, giltBremse: true, ausnahme: 'keine' });
const b4 = berechneMietpreisbremse({ vergleichsmiete: 12.5, aktuelleMiete: 14, wohnflaeche: 70, giltBremse: true, ausnahme: 'keine' });

cases.push(
  { name: 'B-01 Vergleichsmiete 10 €/m² → maxProM2 = 11,00',           actual: b1.maxProM2, expected: 11.00, tolerance: 0.01 },
  { name: 'B-01: maxMonat = 11 × 65 = 715 €',                           actual: b1.maxMonat, expected: 715.00, tolerance: 0.01 },
  { name: 'B-01: istMonat = 12 × 65 = 780 €',                           actual: b1.istMonat, expected: 780.00, tolerance: 0.01 },
  { name: 'B-02 Vergleichsmiete 8 €/m² → maxProM2 = 8,80',              actual: b2.maxProM2, expected: 8.80, tolerance: 0.01 },
  { name: 'B-03 Vergleichsmiete 15 €/m² → maxProM2 = 16,50',            actual: b3.maxProM2, expected: 16.50, tolerance: 0.01 },
  { name: 'B-04 Dezimal-Vergleichsmiete 12,5 → maxProM2 = 13,75',       actual: b4.maxProM2, expected: 13.75, tolerance: 0.01 },
);

// === Cluster C: § 556e/f Ausnahmen — boolean-Toggle-Logik ===
// L-35: nur boolean-Ausnahmen, keine Wert-Vergleichs-Logik

const c1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
const c2 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'neubau' });
const c3 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'modernisierung' });
const c4 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'vormiete' });
const c5 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: false, ausnahme: 'keine' });

cases.push(
  { name: 'C-01 ausnahme=keine, giltBremse=true → greiftBremse=true',           actual: bool(c1.greiftBremse), expected: 1 },
  { name: 'C-02 ausnahme=neubau (§ 556f Erstbezug) → greiftBremse=false',       actual: bool(c2.greiftBremse), expected: 0 },
  { name: 'C-03 ausnahme=modernisierung (§ 556f umfassend) → greiftBremse=false', actual: bool(c3.greiftBremse), expected: 0 },
  { name: 'C-04 ausnahme=vormiete (§ 556e) → greiftBremse=false',               actual: bool(c4.greiftBremse), expected: 0 },
  { name: 'C-05 giltBremse=false (kein angesp. Wohnungsmarkt) → greiftBremse=false', actual: bool(c5.greiftBremse), expected: 0 },
);

// === Cluster D: Überhöhungs-Clamp (Math.max(0, ...)) ===

const d1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 11, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
const d2 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 9, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
const d3 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 11.00, wohnflaeche: 50, giltBremse: true, ausnahme: 'keine' });

cases.push(
  { name: 'D-01 aktuelleMiete genau auf max (11 = 11) → ueberhoehungProM2 = 0',  actual: d1.ueberhoehungProM2, expected: 0, tolerance: 0.01 },
  { name: 'D-02 aktuelleMiete unter max (9 < 11) → ueberhoehungProM2 = 0 (Clamp)', actual: d2.ueberhoehungProM2, expected: 0, tolerance: 0.01 },
  { name: 'D-03 ueberhoehungMonat = 0 wenn keine Überhöhung',                     actual: d3.ueberhoehungMonat, expected: 0, tolerance: 0.01 },
);

// === Cluster E: Wohnflächen-Hochrechnung ===

const e1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 13, wohnflaeche: 100, giltBremse: true, ausnahme: 'keine' });
//   maxProM2 = 11, ueberhoehungProM2 = 2, ueberhoehungMonat = 200, istMonat = 1300, maxMonat = 1100

cases.push(
  { name: 'E-01 100 m² × 11 €/m² → maxMonat = 1100 €',         actual: e1.maxMonat, expected: 1100.00, tolerance: 0.01 },
  { name: 'E-01: 100 m² × 13 €/m² → istMonat = 1300 €',         actual: e1.istMonat, expected: 1300.00, tolerance: 0.01 },
  { name: 'E-01: ueberhoehungProM2 = 2 → ueberhoehungMonat = 200 €', actual: e1.ueberhoehungMonat, expected: 200.00, tolerance: 0.01 },
);

// === Cluster F: Jahres-Hochrechnung (× 12) ===

const f1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
//   ueberhoehungMonat = 65 € → ueberhoehungJahr = 780 €

const f2 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 13, wohnflaeche: 100, giltBremse: true, ausnahme: 'keine' });
//   ueberhoehungMonat = 200 € → ueberhoehungJahr = 2400 €

cases.push(
  { name: 'F-01 Konfig-Beispiel: ueberhoehungJahr = 65 × 12 = 780 €', actual: f1.ueberhoehungJahr, expected: 780.00, tolerance: 0.01 },
  { name: 'F-02 ueberhoehungJahr = 200 × 12 = 2.400 €',                actual: f2.ueberhoehungJahr, expected: 2400.00, tolerance: 0.01 },
);

// === Cluster G: Strukturelle Invarianten ===

const g1 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });
const g2 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 9, wohnflaeche: 65, giltBremse: true, ausnahme: 'keine' });

cases.push(
  { name: 'G-01 ueberhoehungProM2 ≥ 0 immer (Clamp)',                                       actual: bool(g1.ueberhoehungProM2 >= 0 && g2.ueberhoehungProM2 >= 0), expected: 1 },
  { name: 'G-02 maxMonat = maxProM2 × wohnflaeche (Konsistenz)',                            actual: g1.maxMonat, expected: g1.maxProM2 * 65, tolerance: 0.01 },
  { name: 'G-03 istMonat = aktuelleMiete × wohnflaeche (Konsistenz)',                       actual: g1.istMonat, expected: 12 * 65, tolerance: 0.01 },
  { name: 'G-04 ueberhoehungMonat = ueberhoehungProM2 × wohnflaeche (Konsistenz)',          actual: g1.ueberhoehungMonat, expected: g1.ueberhoehungProM2 * 65, tolerance: 0.01 },
  { name: 'G-05 ueberhoehungJahr = ueberhoehungMonat × 12 (Konsistenz)',                    actual: g1.ueberhoehungJahr, expected: g1.ueberhoehungMonat * 12, tolerance: 0.01 },
);

// === Cluster H: Edge-Cases ===

const h1 = berechneMietpreisbremse({ vergleichsmiete: 0, aktuelleMiete: 0, wohnflaeche: 0, giltBremse: true, ausnahme: 'keine' });
const h2 = berechneMietpreisbremse({ vergleichsmiete: 0, aktuelleMiete: 5, wohnflaeche: 50, giltBremse: true, ausnahme: 'keine' });
const h3 = berechneMietpreisbremse({ vergleichsmiete: 10, aktuelleMiete: 12, wohnflaeche: 0, giltBremse: true, ausnahme: 'keine' });

cases.push(
  { name: 'H-01 alle Eingaben 0 → maxProM2 = 0, alle Werte 0',                actual: h1.maxProM2 + h1.maxMonat + h1.istMonat + h1.ueberhoehungJahr, expected: 0, tolerance: 0.01 },
  { name: 'H-02 vergleichsmiete=0 → maxProM2 = 0, ueberhoehungProM2 = 5',     actual: h2.ueberhoehungProM2, expected: 5.00, tolerance: 0.01 },
  { name: 'H-03 wohnflaeche=0 → maxMonat = istMonat = ueberhoehungMonat = 0', actual: h3.maxMonat + h3.istMonat + h3.ueberhoehungMonat, expected: 0, tolerance: 0.01 },
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
