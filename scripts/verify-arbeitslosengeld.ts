/**
 * Verify-Script für lib/berechnungen/arbeitslosengeld.ts (Welle-4 M2c, 03.05.2026; W187 neu gefasst).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - SGB III § 147 Abs. 2 (Anspruchsdauer-Tabelle):
 *     https://www.gesetze-im-internet.de/sgb_3/__147.html
 *   - SGB III § 149 (Leistungssatz 60/67 %):
 *     https://www.gesetze-im-internet.de/sgb_3/__149.html
 *   - SGB III §§ 150, 151 (Bemessungsrahmen ein Jahr; Bemessungsentgelt = auf den Tag
 *     entfallendes Entgelt im Bemessungszeitraum → Jahresentgelt ÷ 365):
 *     https://www.gesetze-im-internet.de/sgb_3/__151.html
 *   - SGB III § 153 Abs. 1 (Abzüge abschließend: SV-Pauschale 20 %, Lohnsteuer nach PAP,
 *     Soli; keine Kirchensteuer): https://www.gesetze-im-internet.de/sgb_3/__153.html
 *   - SGB III § 154 (voller Monat = 30 Tage), § 338 (zwei Dezimalstellen, ab 5 aufrunden)
 *   - BA, Fachliche Weisungen § 153 (gültig ab 21.11.2025): Beispiele rechnen mit
 *     „täglichem Bemessungsentgelt“ und „täglicher Lohnsteuer“ → PAP-Lohnzahlungszeitraum Tag.
 *
 * W187: vorher SV-Pauschale 21 %, Tagesentgelt Monat ÷ 30, Lohnsteuer aus Jahresbrutto,
 * Kirchensteuer als Abzug. Startwert 3.500 € Kl. I ohne Kind: vorher 1.412,05 €/Monat,
 * jetzt 1.416,90 € (Handrechnung Cluster E-03).
 *
 * Test-Strategie:
 *   - Konstanten direkt gegen §§ 149, 151, 153, 154
 *   - Lohnsteuer/Soli je Tag gegen direkten PAP-Lauf mit LZZ = 4 (unabhängiger Pfad)
 *   - bezugsdauerMonate-Tabelle direkt gegen § 147 Abs. 2
 *   - BBG-Cap structural
 *   - Handrechnungen mit hart codierten Sollwerten (Tagesbasis, § 338-Rundung)
 *   - gesamt-/verlust-Strukturtests, Edge-Cases
 *
 * Tolerance: 0,01 € für €-Werte, 0 für ganzzahlige Monats-Returns.
 *
 * Ausführen: npx tsx scripts/verify-arbeitslosengeld.ts
 */

import Decimal from 'decimal.js';
import {
  berechneArbeitslosengeld,
  bezugsdauerMonate,
  berechneVereinfachteLohnsteuerJahr,
  lohnsteuerSoliTag,
  ALG_SATZ_OHNE_KIND,
  ALG_SATZ_MIT_KIND,
  SV_PAUSCHALE_PROZENT,
  BEMESSUNG_TAGE_JAHR,
  ALG_TAGE_MONAT,
} from '../lib/berechnungen/arbeitslosengeld';
import { BBG_RV_MONAT } from '../lib/berechnungen/brutto-netto';
import { berechneLohnsteuerJahr } from '../lib/berechnungen/lohnsteuer';
import { LohnsteuerPAP2026 } from '../lib/berechnungen/_lohnsteuer-pap-2026';

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
}) => berechneArbeitslosengeld({
  brutto: params.brutto,
  klasse: params.klasse ?? 'I',
  mitKind: params.mitKind ?? false,
  alter: params.alter ?? 40,
  beschMonate: params.beschMonate ?? 24,
});

// === Cluster A: Konstanten gegen SGB III §§ 149, 151, 153, 154 ===

cases.push(
  { name: 'A-01 ALG_SATZ_OHNE_KIND (§ 149 SGB III)',           actual: ALG_SATZ_OHNE_KIND,          expected: 0.60, tolerance: 0.0001 },
  { name: 'A-02 ALG_SATZ_MIT_KIND (§ 149 SGB III)',            actual: ALG_SATZ_MIT_KIND,           expected: 0.67, tolerance: 0.0001 },
  // W187: vorher 0,21 — § 153 Abs. 1 S. 2 Nr. 1 SGB III: „Sozialversicherungspauschale in Höhe von 20 Prozent“
  { name: 'A-03 SV_PAUSCHALE_PROZENT = 20 % (§ 153 Abs. 1)',   actual: SV_PAUSCHALE_PROZENT,        expected: 0.20, tolerance: 0.0001 },
  { name: 'A-04 Bemessungszeitraum 365 Tage (§§ 150, 151)',    actual: BEMESSUNG_TAGE_JAHR,         expected: 365, tolerance: 0 },
  { name: 'A-05 voller Monat = 30 Tage (§ 154)',               actual: ALG_TAGE_MONAT,              expected: 30, tolerance: 0 },
);

// === Cluster A2 (W187): Lohnsteuer/Soli je Tag gegen direkten PAP-Lauf mit LZZ = 4 ===
//
// Die BA rechnet täglich (FW § 153: „tägliches Bemessungsentgelt“, „tägliche Lohnsteuer“).
// Unabhängiger Pfad: Klasse LohnsteuerPAP2026 direkt mit Lohnzahlungszeitraum Tag (LZZ = 4),
// Vorsorgepauschale nach § 153 Abs. 1 S. 4 SGB III (ermäßigter KV-Satz + durchschn.
// Zusatzbeitrag 2,9 %, PV 3,6 % ohne Zuschlag/Abschläge, AV pflichtversichert), keine
// Kinderfreibeträge (§ 153 Abs. 1 S. 3 Nr. 1). Die Lib geht über den Jahres-PAP (× 360, ÷ 360).

function papTag(tagCent: number, sk: 1 | 2 | 3 | 4 | 5 | 6): { lst: number; soli: number } {
  const pap = new LohnsteuerPAP2026();
  pap.setEingaben({
    LZZ: 4, STKL: sk, R: 0, RE4: new Decimal(tagCent), ZKF: new Decimal(0), LZZFREIB: new Decimal(0),
    KRV: 0, KVZ: new Decimal(2.9), PKV: 0, PVA: new Decimal(0), PVZ: 0, PVS: 0, ALV: 0,
    PKPV: new Decimal(0), PKPVAGZ: new Decimal(0), af: 1, f: 1.0,
  });
  pap.main();
  const o = pap.getOutput();
  return { lst: o.LSTLZZ.toNumber() / 100, soli: o.SOLZLZZ.toNumber() / 100 };
}
const ROEMISCH = ['I', 'II', 'III', 'IV', 'V', 'VI'] as const;
let a2Abweichungen = 0;
let a2Punkte = 0;
for (let cent = 2000; cent <= 30000; cent += 113) {
  for (let sk = 1 as 1 | 2 | 3 | 4 | 5 | 6; sk <= 6; sk = (sk + 1) as 1 | 2 | 3 | 4 | 5 | 6) {
    const soll = papTag(cent, sk);
    const ist = lohnsteuerSoliTag(cent / 100, ROEMISCH[sk - 1]);
    a2Punkte++;
    if (Math.abs(ist.lst - soll.lst) > 0.001 || Math.abs(ist.soli - soll.soli) > 0.001) a2Abweichungen++;
  }
}
cases.push(
  { name: `A2-01 LSt/Soli je Tag = PAP LZZ 4 (${a2Punkte} Stützpunkte)`, actual: a2Abweichungen, expected: 0, tolerance: 0 },
  { name: 'A2-02 PAP LZZ 4: 115,07 €/Tag Kl. I → LSt 13,34 €',  actual: papTag(11507, 1).lst, expected: 13.34, tolerance: 0.001 },
  { name: 'A2-03 PAP LZZ 4: 98,63 €/Tag Kl. I → LSt 9,63 €',    actual: papTag(9863, 1).lst,  expected: 9.63,  tolerance: 0.001 },
  { name: 'A2-04 PAP LZZ 4: 277,81 €/Tag Kl. III → LSt 42,08 €', actual: papTag(27781, 3).lst, expected: 42.08, tolerance: 0.001 },
  { name: 'A2-05 PAP LZZ 4: 277,81 €/Tag Kl. I → Soli 1,01 €',  actual: papTag(27781, 1).soli, expected: 1.01, tolerance: 0.001 },
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

// === Cluster E: Handrechnungen auf Tagesbasis (W187, hart codierte Sollwerte) ===
//
// E-01: brutto 1.000 €, Kl. I, ohne Kind (Lohnsteuer 0)
//   Bemessungsentgelt Tag = 12.000 ÷ 365 = 32,876… → 32,88 €
//   SV-Pauschale 20 % = 6,576 → 6,58 €; LSt 0; Soli 0
//   Leistungsentgelt Tag = 26,30 €; ALG Tag 60 % = 15,78 €; Monat × 30 = 473,40 €
//   Dauer 12 Monate → gesamt 5.680,80 €; Leistungsentgelt 30 Tage 789,00 €; Verlust 315,60 € (40 %)

const e1 = calc({ brutto: 1000, klasse: 'I', mitKind: false, alter: 40, beschMonate: 24 });
cases.push(
  { name: 'E-01 brutto=1000: bemessung (Monat)',               actual: e1.bemessung,          expected: 1000 },
  { name: 'E-01 Bemessungsentgelt Tag = 12.000 ÷ 365 = 32,88', actual: e1.bemessungTag,       expected: 32.88 },
  { name: 'E-01 SV-Pauschale Tag 20 % = 6,58',                 actual: e1.svPauschaleTag,     expected: 6.58 },
  { name: 'E-01 Leistungsentgelt Tag = 26,30',                 actual: e1.leistungsentgeltTag, expected: 26.30 },
  { name: 'E-01 algTag = 26,30 × 0,60 = 15,78',                actual: e1.algTag,             expected: 15.78 },
  { name: 'E-01 algMonat = 15,78 × 30 = 473,40',               actual: e1.algMonat,           expected: 473.40 },
  { name: 'E-01 dauer = 12',                                   actual: e1.dauer,              expected: 12, tolerance: 0 },
  { name: 'E-01 gesamt = 5.680,80',                            actual: e1.gesamt,             expected: 5680.80 },
  { name: 'E-01 letztesNetto (30 Tage) = 789,00',              actual: e1.letztesNetto,       expected: 789.00 },
  { name: 'E-01 verlust = 315,60',                             actual: e1.verlust,            expected: 315.60 },
  { name: 'E-01 verlustProzent = 40,0',                        actual: e1.verlustProzent,     expected: 40.0, tolerance: 0.01 },
);

// E-02: brutto 1.200 €, Kl. I, mit Kind: 14.400 ÷ 365 = 39,45 €; SV 7,89 €; LSt 0 (PAP LZZ 4)
//   Leistungsentgelt 31,56 €; ALG 67 % = 21,1452 → 21,15 €; Monat 634,50 €
const e2 = calc({ brutto: 1200, klasse: 'I', mitKind: true, alter: 40, beschMonate: 24 });
cases.push(
  { name: 'E-02 brutto=1200 mitKind: Bemessungsentgelt Tag 39,45', actual: e2.bemessungTag, expected: 39.45 },
  { name: 'E-02 satz = 0,67',                                  actual: e2.satz,         expected: 0.67, tolerance: 0.0001 },
  { name: 'E-02 Lohnsteuer Tag = 0 (PAP LZZ 4)',               actual: e2.lohnsteuerTag, expected: papTag(3945, 1).lst, tolerance: 0.001 },
  { name: 'E-02 algTag = 31,56 × 0,67 = 21,15',                actual: e2.algTag,       expected: 21.15 },
  { name: 'E-02 algMonat = 634,50',                            actual: e2.algMonat,     expected: 634.50 },
);

// E-03 (Startwert des Rechners): 3.500 €, Kl. I, ohne Kind, 40 J., 24 Monate
//   42.000 ÷ 365 = 115,068… → 115,07 €; SV 23,014 → 23,01 €; LSt Tag 13,34 € (PAP LZZ 4); Soli 0
//   Leistungsentgelt 78,72 €; ALG 60 % = 47,232 → 47,23 €; Monat 1.416,90 €; 12 Monate 17.002,80 €
const e3 = calc({ brutto: 3500 });
cases.push(
  { name: 'E-03 3.500 €: Bemessungsentgelt Tag 115,07',        actual: e3.bemessungTag,        expected: 115.07 },
  { name: 'E-03 SV-Pauschale Tag 23,01',                       actual: e3.svPauschaleTag,      expected: 23.01 },
  { name: 'E-03 Lohnsteuer Tag 13,34',                         actual: e3.lohnsteuerTag,       expected: 13.34 },
  { name: 'E-03 Leistungsentgelt Tag 78,72',                   actual: e3.leistungsentgeltTag, expected: 78.72 },
  { name: 'E-03 algTag 47,23',                                 actual: e3.algTag,              expected: 47.23 },
  { name: 'E-03 algMonat 1.416,90',                            actual: e3.algMonat,            expected: 1416.90 },
  { name: 'E-03 gesamt 17.002,80',                             actual: e3.gesamt,              expected: 17002.80 },
);

// E-04 (Seitenbeispiel): 3.000 €, Kl. I — 36.000 ÷ 365 = 98,63 €; SV 19,726 → 19,73 €;
//   LSt Tag 9,63 €; Leistungsentgelt 69,27 €; 60 % = 41,562 → 41,56 € → 1.246,80 €/Monat;
//   67 % = 46,4109 → 46,41 € → 1.392,30 €/Monat; Differenz 145,50 €
const e4 = calc({ brutto: 3000 });
const e4k = calc({ brutto: 3000, mitKind: true });
cases.push(
  { name: 'E-04 3.000 €: Leistungsentgelt Tag 69,27',          actual: e4.leistungsentgeltTag, expected: 69.27 },
  { name: 'E-04 algTag 60 % = 41,56',                          actual: e4.algTag,              expected: 41.56 },
  { name: 'E-04 algMonat 60 % = 1.246,80',                     actual: e4.algMonat,            expected: 1246.80 },
  { name: 'E-04 algMonat 67 % = 1.392,30',                     actual: e4k.algMonat,           expected: 1392.30 },
  { name: 'E-04 Differenz 67/60 % = 145,50',                   actual: e4k.algMonat - e4.algMonat, expected: 145.50 },
);

// E-05 (Höchstbetrag): BBG 8.450 €, Kl. III, mit Kind — 101.400 ÷ 365 = 277,81 €; SV 55,562 → 55,56 €;
//   LSt Tag 42,08 €; Soli 0; Leistungsentgelt 180,17 €; 67 % = 120,7139 → 120,71 € → 3.621,30 €/Monat
const e5 = calc({ brutto: 12000, klasse: 'III', mitKind: true });
cases.push(
  { name: 'E-05 BBG Kl. III mit Kind: Bemessungsentgelt Tag 277,81', actual: e5.bemessungTag, expected: 277.81 },
  { name: 'E-05 Leistungsentgelt Tag 180,17',                  actual: e5.leistungsentgeltTag, expected: 180.17 },
  { name: 'E-05 algMonat (Höchstbetrag) 3.621,30',             actual: e5.algMonat,            expected: 3621.30 },
);

// === Cluster F: Strukturelle Invarianten ===
//
// gesamt = algMonat × dauer (immer)
// verlust = letztesNetto - algMonat
// algTag × 30 = algMonat

const f1 = calc({ brutto: 3500, klasse: 'I', mitKind: false, alter: 40, beschMonate: 24 });
cases.push(
  { name: 'F-01 gesamt = algMonat × dauer',                    actual: f1.gesamt,                    expected: f1.algMonat * f1.dauer, tolerance: 0.005 },
  { name: 'F-02 verlust = letztesNetto − algMonat',            actual: f1.verlust,                   expected: f1.letztesNetto - f1.algMonat, tolerance: 0.005 },
  { name: 'F-03 algTag × 30 = algMonat',                       actual: f1.algTag * 30,               expected: f1.algMonat, tolerance: 0.005 },
  { name: 'F-04 Leistungsentgelt = BE − SV − LSt − Soli',      actual: f1.leistungsentgeltTag,       expected: f1.bemessungTag - f1.svPauschaleTag - f1.lohnsteuerTag - f1.soliTag, tolerance: 0.005 },
);

// === Cluster G: berechneVereinfachteLohnsteuerJahr-PAP-Strukturtests ===
//
// Welle-5 Track-B B2: Helper delegiert auf berechneLohnsteuerJahr (PAP-Voll).
// L-36 Cross-Lib-Computation gegen lohnsteuer.ts (verifiziert via
// verify-lohnsteuer-pap.ts + verify-tarif-2026.ts). Die alte 1,15-Approximation
// für V/VI ist durch echte PAP-Tabellen ersetzt — strukturelle Tests:
// Stkl V > Stkl I bei mittlerem Brutto (V hat keinen Grundfreibetrag),
// Stkl III < Stkl I bei mittlerem Brutto (Splittingtarif).
// Roman→Numeric-Mapping wird durch den Helper-Wrapper transparent gemacht.

const lstI  = berechneVereinfachteLohnsteuerJahr(36_000, 'I');
const lstIV = berechneVereinfachteLohnsteuerJahr(36_000, 'IV');
const lstIII = berechneVereinfachteLohnsteuerJahr(36_000, 'III');
const lstV  = berechneVereinfachteLohnsteuerJahr(36_000, 'V');
const lstVI = berechneVereinfachteLohnsteuerJahr(36_000, 'VI');

// L-36 Cross-Computation gegen lohnsteuer.ts direkt
cases.push(
  { name: 'G-01 Helper-Wrapper Stkl I ↔ PAP berechneLohnsteuerJahr', actual: lstI,  expected: berechneLohnsteuerJahr(36_000, 1, 0), tolerance: 0.005 },
  { name: 'G-01b Stkl IV ↔ PAP',                                     actual: lstIV, expected: berechneLohnsteuerJahr(36_000, 4, 0), tolerance: 0.005 },
  { name: 'G-01c Stkl V ↔ PAP',                                      actual: lstV,  expected: berechneLohnsteuerJahr(36_000, 5, 0), tolerance: 0.005 },
);

// Strukturelle PAP-Eigenschaften (an § 39b verankert)
cases.push(
  { name: 'G-02 PAP Stkl I = Stkl IV (gleicher Tarif)',         actual: lstI - lstIV,     expected: 0, tolerance: 0.005 },
  { name: 'G-03 PAP Stkl III < Stkl I (Splittingtarif günstig)',actual: lstIII < lstI ? 1 : 0, expected: 1 },
  { name: 'G-04 PAP Stkl V > Stkl I (kein Grundfreibetrag)',    actual: lstV > lstI ? 1 : 0,   expected: 1 },
  { name: 'G-05 PAP Stkl VI ≥ Stkl V',                          actual: lstVI >= lstV ? 1 : 0, expected: 1 },
  { name: 'G-06 PAP Stkl III ≥ 0 (nicht-negativ)',              actual: lstIII >= 0 ? 1 : 0,   expected: 1 },
);

// Edge: brutto = 0 → lstJahr = 0 (alle Stkl)
cases.push(
  { name: 'G-07 Edge brutto=0: Stkl I → 0',                     actual: berechneVereinfachteLohnsteuerJahr(0, 'I'),  expected: 0 },
  { name: 'G-07 Edge brutto=0: Stkl V → 0',                     actual: berechneVereinfachteLohnsteuerJahr(0, 'V'),  expected: 0 },
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
