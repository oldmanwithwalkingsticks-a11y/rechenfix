/**
 * Verify-Script für lib/berechnungen/arbeitslosengeld.ts (Welle-4 M2c, 03.05.2026).
 *
 * Lib aus M2c-Refactor extrahiert (Component zuvor PARTIAL-KEINE-LIB —
 * konsumierte einkommensteuer + brutto-netto, hatte aber alle SGB-III-
 * spezifischen Funktionen inline; Refactor-Commit 0301e7b).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - SGB III § 147 Abs. 2 (Anspruchsdauer-Tabelle):
 *     https://www.gesetze-im-internet.de/sgb_3/__147.html
 *   - SGB III § 149 (Leistungssatz 60/67 %):
 *     https://www.gesetze-im-internet.de/sgb_3/__149.html
 *   - SGB III § 153 Abs. 1 (Bemessungsentgelt + 21 %-Pauschalabzug):
 *     https://www.gesetze-im-internet.de/sgb_3/__153.html
 *
 * L-35-Diskrepanzen Konfig-vs-Lib (im Lib-Header dokumentiert):
 *   - § 155 SGB III Nebeneinkommen-Schwelle 165 €/Mon NICHT modelliert
 *   - Stkl V/VI-Lohnsteuer-Faktor ×1,15 ist grobe Näherung (echter
 *     PAP § 39b ~1,4–1,6) — Tests fokussieren auf Klasse I/IV ohne diesen
 *     Faktor; V/VI-Tests sind als Approximation-touched markiert
 *   - Kirchensteuer pauschal 9 % über alle Bundesländer (statt 8 % BY/BW)
 *
 * Test-Strategie:
 *   - Konstanten direct gegen § 149 + § 153
 *   - bezugsdauerMonate-Tabelle direct gegen § 147 Abs. 2
 *   - BBG-Cap structural: bemessung = min(brutto, BBG_RV_MONAT)
 *   - Satz-Faktor structural: 60 % vs. 67 %
 *   - Hand-rechnung Klasse I niedrige Brutto (LSt=0, soli=0, kiSt=0)
 *     für Cent-genaue End-zu-End-Verifikation der Formel-Kette
 *   - gesamt-/verlust-Strukturtests
 *   - Edge: brutto≤0, kein Anspruch (<12 Mon Versicherungspflicht)
 *
 * Tolerance: 0,01 € für €-Werte, 0 für ganzzahlige Monats-Returns.
 *
 * Ausführen: npx tsx scripts/verify-arbeitslosengeld.ts
 */

import {
  berechneArbeitslosengeld,
  bezugsdauerMonate,
  berechneVereinfachteLohnsteuerJahr,
  ALG_SATZ_OHNE_KIND,
  ALG_SATZ_MIT_KIND,
  SV_PAUSCHALE_PROZENT,
  KIRCHENSTEUER_ANTEIL_PAUSCHAL,
} from '../lib/berechnungen/arbeitslosengeld';
import { BBG_RV_MONAT } from '../lib/berechnungen/brutto-netto';
import { berechneEStGrund } from '../lib/berechnungen/einkommensteuer';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number;
};

const cases: TestCase[] = [];

const calc = (params: {
  brutto: number;
  klasse?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  mitKind?: boolean;
  alter?: number;
  beschMonate?: number;
  kirchensteuer?: boolean;
}) => berechneArbeitslosengeld({
  brutto: params.brutto,
  klasse: params.klasse ?? 'I',
  mitKind: params.mitKind ?? false,
  alter: params.alter ?? 40,
  beschMonate: params.beschMonate ?? 24,
  kirchensteuer: params.kirchensteuer ?? false,
});

// === Cluster A: Konstanten gegen SGB III §§ 149, 153 ===

cases.push(
  { name: 'A-01 ALG_SATZ_OHNE_KIND (§ 149 SGB III)',           actual: ALG_SATZ_OHNE_KIND,          expected: 0.60, tolerance: 0.0001 },
  { name: 'A-02 ALG_SATZ_MIT_KIND (§ 149 SGB III)',            actual: ALG_SATZ_MIT_KIND,           expected: 0.67, tolerance: 0.0001 },
  { name: 'A-03 SV_PAUSCHALE_PROZENT (§ 153 Abs. 1 SGB III)',  actual: SV_PAUSCHALE_PROZENT,        expected: 0.21, tolerance: 0.0001 },
  { name: 'A-04 KIRCHENSTEUER_ANTEIL_PAUSCHAL',                 actual: KIRCHENSTEUER_ANTEIL_PAUSCHAL, expected: 0.09, tolerance: 0.0001 },
);

// === Cluster B: § 147 Abs. 2 SGB III bezugsdauerMonate-Tabelle ===

cases.push(
  // Stufe 24 Mon (Alter 58+, beschMonate 48+)
  { name: 'B-01 alter=58, beschMonate=48 → 24',               actual: bezugsdauerMonate(58, 48), expected: 24, tolerance: 0 },
  // Bei alter=58, beschMonate=47: Stufe 24 verfehlt, fällt auf Stufe 18 (alter≥55, beschMonate≥36 = 47≥36)
  { name: 'B-02 alter=58, beschMonate=47 (Stufe 24 verfehlt → Stufe 18)', actual: bezugsdauerMonate(58, 47), expected: 18, tolerance: 0 },
  // Stufe 18 Mon (Alter 55+, beschMonate 36+)
  { name: 'B-03 alter=55, beschMonate=36 → 18',               actual: bezugsdauerMonate(55, 36), expected: 18, tolerance: 0 },
  // Bei alter=54, beschMonate=36: Stufe 18 verfehlt, fällt auf Stufe 15 (alter≥50, beschMonate≥30 = 36≥30)
  { name: 'B-04 alter=54, beschMonate=36 (Stufe 18 verfehlt → Stufe 15)', actual: bezugsdauerMonate(54, 36), expected: 15, tolerance: 0 },
  // Stufe 15 Mon (Alter 50+, beschMonate 30+)
  { name: 'B-05 alter=50, beschMonate=30 → 15',               actual: bezugsdauerMonate(50, 30), expected: 15, tolerance: 0 },
  { name: 'B-06 alter=49, beschMonate=30 (Stufe verfehlt) → 12', actual: bezugsdauerMonate(49, 30), expected: 12, tolerance: 0 },
  // Standard-Stufen (alters-unabhängig)
  { name: 'B-07 beschMonate=24 → 12',                          actual: bezugsdauerMonate(40, 24), expected: 12, tolerance: 0 },
  { name: 'B-08 beschMonate=20 → 10',                          actual: bezugsdauerMonate(40, 20), expected: 10, tolerance: 0 },
  { name: 'B-09 beschMonate=16 → 8',                           actual: bezugsdauerMonate(40, 16), expected: 8,  tolerance: 0 },
  { name: 'B-10 beschMonate=12 → 6',                           actual: bezugsdauerMonate(40, 12), expected: 6,  tolerance: 0 },
  { name: 'B-11 beschMonate=11 (zu kurz) → 0',                 actual: bezugsdauerMonate(40, 11), expected: 0,  tolerance: 0 },
  // Höhere Stufen haben Vorrang
  { name: 'B-12 alter=58, beschMonate=24 (Stufe 24 verfehlt, fallback 12)', actual: bezugsdauerMonate(58, 24), expected: 12, tolerance: 0 },
);

// === Cluster C: BBG-Cap § 153 SGB III ===

const c1 = calc({ brutto: 5000 });
const c2 = calc({ brutto: BBG_RV_MONAT });
const c3 = calc({ brutto: 10000 });
cases.push(
  { name: 'C-01 brutto=5000 < BBG: bemessung = 5000',         actual: c1.bemessung, expected: 5000, tolerance: 0 },
  { name: 'C-02 brutto=BBG_RV_MONAT: bemessung = BBG',        actual: c2.bemessung, expected: BBG_RV_MONAT, tolerance: 0 },
  { name: 'C-03 brutto=10000 > BBG: bemessung = BBG (gecappt)', actual: c3.bemessung, expected: BBG_RV_MONAT, tolerance: 0 },
);

// === Cluster D: § 149 Leistungssatz 60/67 % ===

const d1 = calc({ brutto: 3500, mitKind: false });
const d2 = calc({ brutto: 3500, mitKind: true });
cases.push(
  { name: 'D-01 ohneKind: satz = 0,60',                        actual: d1.satz, expected: 0.60, tolerance: 0.0001 },
  { name: 'D-02 mitKind: satz = 0,67',                         actual: d2.satz, expected: 0.67, tolerance: 0.0001 },
);

// === Cluster E: Hand-rechnung Klasse I, niedrige Brutto (LSt=0, Soli=0) ===
//
// Test E-01: brutto=1000, klasse I, ohneKind, alter=40, beschMonate=24, kirche=false
//   bemessung = 1000 (< BBG)
//   jahresBrutto = 12.000 ≤ Grundfreibetrag 12.348 → estJahr = 0
//   lstJahr = 0, lstMonat = 0
//   soli (Grundtarif): est=0 < 20.350 (Freigrenze) → 0
//   svPauschale = 1000 × 0,21 = 210
//   leistungsentgeltMonat = 1000 - 0 - 0 - 0 - 210 = 790
//   tagesLeistungsentgelt = 790 / 30 = 26,333...
//   algTag = 26,333 × 0,60 = 15,800
//   algMonat = 15,800 × 30 = 474,000
//   dauer = bezugsdauerMonate(40, 24) = 12
//   gesamt = 474,000 × 12 = 5688,000
//   letztesNetto = 790
//   verlust = 790 - 474 = 316
//   verlustProzent = 316/790 × 100 = 40,000

const e1 = calc({ brutto: 1000, klasse: 'I', mitKind: false, alter: 40, beschMonate: 24 });
cases.push(
  { name: 'E-01 brutto=1000 Klasse I: bemessung',              actual: e1.bemessung,       expected: 1000 },
  { name: 'E-01 letztesNetto = 1000 - 210 = 790',              actual: e1.letztesNetto,    expected: 790 },
  { name: 'E-01 algTag = 790/30 × 0,60',                       actual: e1.algTag,          expected: 15.8 },
  { name: 'E-01 algMonat = 474',                               actual: e1.algMonat,        expected: 474 },
  { name: 'E-01 dauer = 12',                                   actual: e1.dauer,           expected: 12, tolerance: 0 },
  { name: 'E-01 gesamt = 5688',                                actual: e1.gesamt,          expected: 5688 },
  { name: 'E-01 verlust = 316',                                actual: e1.verlust,         expected: 316 },
  { name: 'E-01 verlustProzent ≈ 40,0',                        actual: e1.verlustProzent,  expected: 40.0, tolerance: 0.01 },
);

// E-02: brutto=1200 Klasse I mitKind, alter=40, beschMonate=24, kirche=false
//   bemessung = 1200, jahresBrutto = 14.400 (Zone 2 § 32a EStG)
//   Soll-Wert für ESt aus berechneEStGrund (verifiziert via verify-tarif-2026 etc.)
//   verwenden — KEIN Hand-Rechnung der Zone-2-Formel (vermeidet Floating-Precision-
//   Drift wie in M2c-Initial-Run aufgetreten).

const e2 = calc({ brutto: 1200, klasse: 'I', mitKind: true, alter: 40, beschMonate: 24 });
const e2_lstJahrSoll = berechneEStGrund(14_400, 2026); // unabhängig verifizierte Lib
const e2_lstMonatSoll = e2_lstJahrSoll / 12;
const e2_svPauschale = 1200 * SV_PAUSCHALE_PROZENT;
const e2_letztesNettoSoll = 1200 - e2_lstMonatSoll - 0 - 0 - e2_svPauschale; // soli=0, kiSt=0
const e2_algMonatSoll = (e2_letztesNettoSoll / 30) * 0.67 * 30;
cases.push(
  { name: 'E-02 brutto=1200 Klasse I mitKind: bemessung',     actual: e2.bemessung,    expected: 1200 },
  { name: 'E-02 satz = 0,67',                                  actual: e2.satz,         expected: 0.67, tolerance: 0.0001 },
  { name: 'E-02 letztesNetto = 1200 − lstMonat(EStG-Lib) − 252', actual: e2.letztesNetto, expected: e2_letztesNettoSoll, tolerance: 0.005 },
  { name: 'E-02 algMonat = letztesNetto/30 × 0,67 × 30',       actual: e2.algMonat,     expected: e2_algMonatSoll, tolerance: 0.005 },
);

// === Cluster F: Strukturelle Invarianten ===
//
// gesamt = algMonat × dauer (immer)
// verlust = letztesNetto - algMonat
// algTag × 30 = algMonat (mit JS-Float-Toleranz)

const f1 = calc({ brutto: 3500, klasse: 'I', mitKind: false, alter: 40, beschMonate: 24 });
cases.push(
  { name: 'F-01 gesamt = algMonat × dauer',                    actual: f1.gesamt,                    expected: f1.algMonat * f1.dauer, tolerance: 0.005 },
  { name: 'F-02 verlust = letztesNetto − algMonat',            actual: f1.verlust,                   expected: f1.letztesNetto - f1.algMonat, tolerance: 0.005 },
  { name: 'F-03 algTag × 30 = algMonat',                       actual: f1.algTag * 30,               expected: f1.algMonat, tolerance: 0.005 },
);

// === Cluster G: berechneVereinfachteLohnsteuerJahr-Strukturtests ===
//
// Klasse I: keine Modifikation (Faktor 1)
// Klasse III: zvE wird halbiert, ESt mal 2 (Splittingtarif-Imitation)
// Klasse V/VI: ESt × 1,15 (L-35-Approximation)
//
// Test mit zvE = 24.000 € (Zone 3):
//   est_klasse_I = est(24.000) — call lib direkt
// Wir testen, dass:
//   lstKl_III = 2 × est(12.000) — und 12.000 ≤ Grundfreibetrag → est=0
//     also lstKl_III = 0 (echter Effekt von Splittingtarif bei niedrigem zvE)
//   lstKl_V = est(24.000) × 1,15

const lstI  = berechneVereinfachteLohnsteuerJahr(24_000, 'I');
const lstIV = berechneVereinfachteLohnsteuerJahr(24_000, 'IV');
const lstIII = berechneVereinfachteLohnsteuerJahr(24_000, 'III');
const lstV  = berechneVereinfachteLohnsteuerJahr(24_000, 'V');
const lstVI = berechneVereinfachteLohnsteuerJahr(24_000, 'VI');
cases.push(
  { name: 'G-01 Klasse I = Klasse IV (kein Faktor)',           actual: lstI - lstIV, expected: 0, tolerance: 0.005 },
  { name: 'G-02 Klasse III: zvE/2=12000 ≤ GFB → 2×0 = 0',      actual: lstIII,       expected: 0, tolerance: 0.005 },
  { name: 'G-03 Klasse V = Klasse I × 1,15 (Approximation)',  actual: lstV,         expected: lstI * 1.15, tolerance: 0.005 },
  { name: 'G-04 Klasse VI = Klasse V (gleicher Faktor 1,15)',  actual: lstVI - lstV, expected: 0, tolerance: 0.005 },
);

// === Cluster H: Edge-Cases ===
//
// brutto = 0 → bemessung = 0 → leistungsentgelt = 0 → algMonat = 0
// brutto = -100 → bemessung = max(0, -100) = 0 → algMonat = 0
// beschMonate < 12 → dauer = 0 → gesamt = 0 (ALG-Anspruch verfehlt)

const h1 = calc({ brutto: 0 });
const h2 = calc({ brutto: -100 });
const h3 = calc({ brutto: 3500, beschMonate: 11 });
cases.push(
  { name: 'H-01 brutto=0: bemessung = 0',                      actual: h1.bemessung,    expected: 0, tolerance: 0 },
  { name: 'H-01 brutto=0: algMonat = 0',                       actual: h1.algMonat,     expected: 0, tolerance: 0 },
  { name: 'H-01 brutto=0: letztesNetto = 0',                   actual: h1.letztesNetto, expected: 0, tolerance: 0 },
  { name: 'H-02 brutto<0: bemessung = 0',                      actual: h2.bemessung,    expected: 0, tolerance: 0 },
  { name: 'H-03 beschMonate=11: dauer = 0',                    actual: h3.dauer,        expected: 0, tolerance: 0 },
  { name: 'H-03 beschMonate=11: gesamt = 0',                   actual: h3.gesamt,       expected: 0, tolerance: 0 },
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
    `  ${status} ${c.name.padEnd(64)} ist ${String(c.actual).padStart(14)}  soll ${String(c.expected).padStart(14)}  Δ ${delta.toFixed(4).padStart(8)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
