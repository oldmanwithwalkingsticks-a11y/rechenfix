/**
 * Verify-Script für lib/berechnungen/grundsteuer.ts
 * (Welle-5 Track-A Block-C C2, 04.05.2026; W187 Bundesmodell nach BewG, 20.10.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - GrStG i.d.F. ab 01.01.2025: https://www.gesetze-im-internet.de/grstg_1973/ (§ 15)
 *   - BewG §§ 230, 247, 251–257 mit Anlagen 36–41: https://www.gesetze-im-internet.de/bewg/
 *     (abgerufen 20.10.2026). Sollwerte unten sind von Hand aus den Anlagen abgelesen
 *     (Anlage 37 Vervielfältiger, Anlage 39 Mieten, Anlage 40 Bewirtschaftungskosten,
 *     Anlage 41 Abzinsungsfaktoren) und nicht aus der Lib errechnet.
 *   - Landes-Messzahlen: SächsGrStMG (0,36 ‰), BlnGrStMG v. 27.06.2024 (unbebaut 0,45 ‰)
 *   - BayGrStG (Flächen-Aequivalenz-Modell), § 40 LGrStG BW (Bodenwertmodell)
 *
 * W187: vorher prüfte Cluster B/C das vereinfachte Bundesmodell (Kapitalisierungsfaktor 15,
 * 4-stufige Mietentabelle 6,50–8,50 €, Bodenwert unabgezinst; Startwerte 375,10 €/Jahr).
 * Jetzt Ertragswertverfahren §§ 252–257 BewG; Hand-Fall laut Befund (NRW, ETW ≥ 100 m²,
 * Baujahr 1979–1990, Mietniveaustufe 3): 290,15 €/Jahr.
 *
 * Tolerance: 0,01 € für €-Werte.
 *
 * Ausführen: npx tsx scripts/verify-grundsteuer.ts
 */

import {
  BUND_STEUERMESSZAHL_BEBAUT,
  BUND_STEUERMESSZAHL_UNBEBAUT,
  BY_AEQUIVALENZ_GRUND,
  BY_AEQUIVALENZ_WOHN,
  BY_WOHN_ERMAESSIGUNG,
  BW_STEUERMESSZAHL_WOHNEN,
  BW_STEUERMESSZAHL_NICHTWOHNEN,
  GESAMTNUTZUNGSDAUER_WOHNEN,
  NETTOKALTMIETEN_ANLAGE39,
  abzinsungsfaktor,
  berechneGrundsteuer,
  bewirtschaftungskostenProzent,
  liegenschaftszins,
  restnutzungsdauer,
  steuermesszahlBundesmodell,
  umrechnungskoeffizient,
  vervielfaeltiger,
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
  // W187: A-01 (vorher BUND_KAPITALISIERUNGSFAKTOR = 15) ersetzt durch Anlage 38 / § 253
  { name: 'A-01 Gesamtnutzungsdauer Wohnen = 80 J. (Anlage 38 BewG)',            actual: GESAMTNUTZUNGSDAUER_WOHNEN, expected: 80 },
  { name: 'A-02 BUND_STEUERMESSZAHL_BEBAUT = 0,00031 (§ 15 GrStG)',              actual: BUND_STEUERMESSZAHL_BEBAUT, expected: 0.00031, tolerance: 0.000001 },
  { name: 'A-03 BUND_STEUERMESSZAHL_UNBEBAUT = 0,00034 (§ 15 GrStG)',            actual: BUND_STEUERMESSZAHL_UNBEBAUT, expected: 0.00034, tolerance: 0.000001 },
  { name: 'A-04 BY_AEQUIVALENZ_GRUND = 0,04 (BayGrStG)',                          actual: BY_AEQUIVALENZ_GRUND, expected: 0.04, tolerance: 0.0001 },
  { name: 'A-05 BY_AEQUIVALENZ_WOHN = 0,50 (BayGrStG)',                           actual: BY_AEQUIVALENZ_WOHN, expected: 0.50, tolerance: 0.0001 },
  { name: 'A-06 BY_WOHN_ERMAESSIGUNG = 0,70 (BayGrStG, 30 % Wohnabschlag)',       actual: BY_WOHN_ERMAESSIGUNG, expected: 0.70, tolerance: 0.0001 },
  { name: 'A-07 BW_STEUERMESSZAHL_WOHNEN = 0,00091 (§ 40 LGrStG BW)',             actual: BW_STEUERMESSZAHL_WOHNEN, expected: 0.00091, tolerance: 0.000001 },
  { name: 'A-08 BW_STEUERMESSZAHL_NICHTWOHNEN = 0,0013 (§ 40 LGrStG BW)',         actual: BW_STEUERMESSZAHL_NICHTWOHNEN, expected: 0.0013, tolerance: 0.000001 },
);

// === Cluster B: Bundesmodell §§ 252–257 BewG — Hand-Fall laut Befund ===
//
// NRW, Wohnungseigentum, 120 m² Wohnfläche, Baujahr 1990, Mietniveaustufe 3,
// Bodenrichtwert 200 €/m², 400 m² (Anteil 1/1, Bodenwert 80.000 €), Hebesatz 500 %:
//   Anlage 39 (NRW, Mietwohngrundstück ≥ 100 m², 1979–1990): 6,15 €/m²; Stufe 3: ± 0
//   Rohertrag 120 × 6,15 × 12 = 8.856 €
//   Alter 2022 − 1990 = 32 → Restnutzungsdauer 80 − 32 = 48 J.
//   Anlage 40 (Wohnungseigentum, RND 40–59): 25 % → Reinertrag 6.642 €
//   § 256 Abs. 1 Nr. 2: 3,0 %; Anlage 37 (48 J., 3,0 %): 25,27 → 167.843,34 €
//   Anlage 41 (48 J., 3,0 %): 0,2420 → 80.000 × 0,2420 = 19.360 €
//   Summe 187.203,34 € → § 230: 187.200 €; × 0,31 ‰ = 58,032 → 58,03 €; × 500 % = 290,15 €

const b1 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'NW', mietniveaustufe: 3, miteigentumsanteil: 1,
});
cases.push(
  { name: 'B-01 ETW NRW: Rohertrag = 8.856 €',                       actual: b1.bundesmodell?.rohertrag ?? null, expected: 8856 },
  { name: 'B-01: Reinertrag = 6.642 € (− 25 % Anlage 40)',             actual: b1.bundesmodell?.reinertrag ?? null, expected: 6642 },
  { name: 'B-01: Restnutzungsdauer = 48 J.',                          actual: b1.bundesmodell?.restnutzungsdauer ?? null, expected: 48 },
  { name: 'B-01: Barwert = 167.843,34 € (× 25,27)',                   actual: b1.bundesmodell?.barwertReinertrag ?? null, expected: 167843.34 },
  { name: 'B-01: abgezinster Bodenwert = 19.360 € (× 0,2420)',        actual: b1.bundesmodell?.abgezinsterBodenwert ?? null, expected: 19360 },
  { name: 'B-01: Grundsteuerwert = 187.200 € (abgerundet)',           actual: b1.grundsteuerwert, expected: 187200 },
  { name: 'B-01: Messbetrag = 58,03 €',                               actual: b1.messbetrag, expected: 58.03 },
  { name: 'B-01: Grundsteuer = 290,15 €/Jahr',                        actual: b1.grundsteuerJahr, expected: 290.15 },
);

// B-02: Startwerte des Rechners (wie B-01, aber Miteigentumsanteil 250/1.000 → Bodenwert 20.000 €)
//   20.000 × 0,2420 = 4.840 → 167.843,34 + 4.840 = 172.683,34 → 172.600 € → 53,506 → 53,51 € → 267,55 €
const b2 = berechneGrundsteuer({
  modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'NW', mietniveaustufe: 3, miteigentumsanteil: 0.25,
});
cases.push(
  { name: 'B-02 Startwerte (MEA 250/1.000): Grundsteuerwert = 172.600 €', actual: b2.grundsteuerwert, expected: 172600 },
  { name: 'B-02: Messbetrag = 53,51 €',                                   actual: b2.messbetrag, expected: 53.51 },
  { name: 'B-02: Grundsteuer = 267,55 €/Jahr',                            actual: b2.grundsteuerJahr, expected: 267.55 },
);

// B-03: Mietniveaustufe 1 (−20 %) und 7 (+40 %) — Spanne laut Befund 238 € bis 394 €
//   Stufe 1: 4,92 €/m² → 7.084,80 → 5.313,60 × 25,27 = 134.274,67 + 19.360 = 153.634,67 → 153.600 → 47,62 → 238,10 €
//   Stufe 7: 8,61 €/m² → 12.398,40 → 9.298,80 × 25,27 = 234.980,68 + 19.360 = 254.340,68 → 254.300 → 78,83 → 394,15 €
const b3a = berechneGrundsteuer({ modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'NW', mietniveaustufe: 1 });
const b3b = berechneGrundsteuer({ modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'NW', mietniveaustufe: 7 });
cases.push(
  { name: 'B-03 Mietniveaustufe 1: Grundsteuer = 238,10 €', actual: b3a.grundsteuerJahr, expected: 238.10 },
  { name: 'B-03 Mietniveaustufe 7: Grundsteuer = 394,15 €', actual: b3b.grundsteuerJahr, expected: 394.15 },
);

// B-04: Bundesmodell unbebaut → § 247: 400 × 200 = 80.000 €; NRW 0,34 ‰ = 27,20 € → 136 €
const b4 = berechneGrundsteuer({
  modell: 'bund', art: 'unbebaut', bodenrichtwert: 200, grundflaeche: 400,
  wohnflaeche: 0, baujahr: 1990, hebesatz: 500, land: 'NW',
});
cases.push(
  { name: 'B-04 unbebaut NRW: Grundsteuerwert = 80.000 €',   actual: b4.grundsteuerwert, expected: 80000 },
  { name: 'B-04: Messbetrag = 27,20 € (× 0,34 ‰)',           actual: b4.messbetrag, expected: 27.20 },
  { name: 'B-04: Grundsteuer = 136 €',                        actual: b4.grundsteuerJahr, expected: 136.00 },
);
// B-05: unbebaut Berlin (BlnGrStMG 0,45 ‰): 80.000 × 0,45 ‰ = 36 € → 180 €
const b5 = berechneGrundsteuer({ modell: 'bund', art: 'unbebaut', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 0, baujahr: 1990, hebesatz: 500, land: 'BE' });
cases.push({ name: 'B-05 unbebaut Berlin: Messbetrag = 36 € (× 0,45 ‰)', actual: b5.messbetrag, expected: 36 });

// B-06: Hebesatz 600 % statt 500 % → 58,03 × 6 = 348,18 €
const b6 = berechneGrundsteuer({ modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 120, baujahr: 1990, hebesatz: 600, land: 'NW', mietniveaustufe: 3 });
cases.push({ name: 'B-06 Hebesatz 600 %: Grundsteuer = 348,18 €', actual: b6.grundsteuerJahr, expected: 348.18 });

// === Cluster C: Tabellenwerte der Anlagen (von Hand aus gesetze-im-internet.de abgelesen) ===

cases.push(
  { name: 'C-01 Anlage 37: 48 J., 3,0 % = 25,27',   actual: vervielfaeltiger(48, 3.0), expected: 25.27 },
  { name: 'C-02 Anlage 37: 33 J., 2,5 % = 22,29',   actual: vervielfaeltiger(33, 2.5), expected: 22.29 },
  { name: 'C-03 Anlage 37: 24 J., 4,5 % = 14,50',   actual: vervielfaeltiger(24, 4.5), expected: 14.50 },
  { name: 'C-04 Anlage 37: 80 J., 1,5 % = 46,41',   actual: vervielfaeltiger(80, 1.5), expected: 46.41 },
  { name: 'C-05 Anlage 37: 100 J., 4,0 % = 24,50',  actual: vervielfaeltiger(100, 4.0), expected: 24.50 },
  { name: 'C-06 Anlage 37: 1 J., 1,5 % = 0,99',     actual: vervielfaeltiger(1, 1.5), expected: 0.99 },
  { name: 'C-07 Anlage 41: 48 J., 3,0 % = 0,2420',  actual: abzinsungsfaktor(48, 3.0), expected: 0.2420, tolerance: 0.00001 },
  { name: 'C-08 Anlage 41: 24 J., 2,0 % = 0,6217',  actual: abzinsungsfaktor(24, 2.0), expected: 0.6217, tolerance: 0.00001 },
  { name: 'C-09 Anlage 41: 63 J., 2,5 % = 0,2111',  actual: abzinsungsfaktor(63, 2.5), expected: 0.2111, tolerance: 0.00001 },
  { name: 'C-10 Anlage 41: 100 J., 4,0 % = 0,0198', actual: abzinsungsfaktor(100, 4.0), expected: 0.0198, tolerance: 0.00001 },
  { name: 'C-11 Anlage 39 NRW Mietwohngr. ≥ 100 m², 1979–1990 = 6,15', actual: NETTOKALTMIETEN_ANLAGE39.NW.miet[2][2], expected: 6.15 },
  { name: 'C-12 Anlage 39 Berlin EFH < 60 m², bis 1948 = 9,04',        actual: NETTOKALTMIETEN_ANLAGE39.BE.efh[0][0], expected: 9.04 },
  { name: 'C-13 Anlage 39 Thüringen ZFH 60–100 m², ab 2001 = 6,95',    actual: NETTOKALTMIETEN_ANLAGE39.TH.zfh[1][4], expected: 6.95 },
  { name: 'C-14 Anlage 39 Sachsen Mietwohngr. < 60 m², ab 2001 = 11,12', actual: NETTOKALTMIETEN_ANLAGE39.SN.miet[0][4], expected: 11.12 },
  { name: 'C-15 Anlage 40 EFH, RND ≥ 60 = 18 %',      actual: bewirtschaftungskostenProzent('efh', 63), expected: 18 },
  { name: 'C-16 Anlage 40 ETW, RND 20–39 = 29 %',     actual: bewirtschaftungskostenProzent('etw', 33), expected: 29 },
  { name: 'C-17 Anlage 40 Mietwohngr., RND < 20 = 29 %', actual: bewirtschaftungskostenProzent('miet', 19), expected: 29 },
  { name: 'C-18 Anlage 36: 600 m² = 0,95',            actual: umrechnungskoeffizient(600), expected: 0.95 },
  { name: 'C-19 Anlage 36: 249 m² = 1,24',            actual: umrechnungskoeffizient(249), expected: 1.24 },
  { name: 'C-20 Anlage 36: 2.400 m² = 0,64',          actual: umrechnungskoeffizient(2400), expected: 0.64 },
);

// === Cluster C2: § 253 Restnutzungsdauer, § 256 Liegenschaftszins, § 15 Messzahl ===

cases.push(
  { name: 'C2-01 RND Baujahr 1990 = 48',              actual: restnutzungsdauer(1990), expected: 48 },
  { name: 'C2-02 RND Baujahr 1930 = 24 (Mindest 30 %)', actual: restnutzungsdauer(1930), expected: 24 },
  { name: 'C2-03 RND Baujahr 2022 = 80',              actual: restnutzungsdauer(2022), expected: 80 },
  { name: 'C2-04 RND Baujahr 2024 = 79 (Nachfeststellung 01.01.2025)', actual: restnutzungsdauer(2024), expected: 79 },
  { name: 'C2-05 LZ EFH BRW 500 = 2,5 %',             actual: liegenschaftszins('efh', 500, 1), expected: 2.5, tolerance: 0.0001 },
  { name: 'C2-06 LZ EFH BRW 650 = 2,4 %',             actual: liegenschaftszins('efh', 650, 1), expected: 2.4, tolerance: 0.0001 },
  { name: 'C2-07 LZ EFH BRW 1.499 = 1,6 %',           actual: liegenschaftszins('efh', 1499, 1), expected: 1.6, tolerance: 0.0001 },
  { name: 'C2-08 LZ EFH BRW 1.500 = 1,5 %',           actual: liegenschaftszins('zfh', 1500, 1), expected: 1.5, tolerance: 0.0001 },
  { name: 'C2-09 LZ ETW BRW 2.000 = 3,0 %',           actual: liegenschaftszins('etw', 2000, 1), expected: 3.0, tolerance: 0.0001 },
  { name: 'C2-10 LZ ETW BRW 2.450 = 2,6 %',           actual: liegenschaftszins('etw', 2450, 1), expected: 2.6, tolerance: 0.0001 },
  { name: 'C2-11 LZ ETW BRW 3.200 = 2,0 %',           actual: liegenschaftszins('etw', 3200, 1), expected: 2.0, tolerance: 0.0001 },
  { name: 'C2-12 LZ Mietwohngr. 6 Wohnungen = 4,0 %', actual: liegenschaftszins('miet', 300, 6), expected: 4.0, tolerance: 0.0001 },
  { name: 'C2-13 LZ Mietwohngr. 7 Wohnungen = 4,5 %', actual: liegenschaftszins('miet', 300, 7), expected: 4.5, tolerance: 0.0001 },
  { name: 'C2-14 Messzahl Sachsen Wohnen = 0,36 ‰',   actual: steuermesszahlBundesmodell('SN', false), expected: 0.00036, tolerance: 1e-9 },
  { name: 'C2-15 Messzahl Saarland unbebaut = 0,64 ‰', actual: steuermesszahlBundesmodell('SL', true), expected: 0.00064, tolerance: 1e-9 },
  { name: 'C2-16 Messzahl Baudenkmal NRW = 0,279 ‰',  actual: steuermesszahlBundesmodell('NW', false, 'denkmal'), expected: 0.000279, tolerance: 1e-9 },
  { name: 'C2-17 Messzahl gefördert NRW = 0,2325 ‰',  actual: steuermesszahlBundesmodell('NW', false, 'gefoerdert'), expected: 0.0002325, tolerance: 1e-9 },
);

// === Cluster C3: weitere Hand-Fälle nach BewG ===
//
// C3-01 EFH NRW, 145 m², Baujahr 1975, 600 m², BRW 300 €/m², Stufe 4, Hebesatz 550 %:
//   5,82 € (EFH ≥ 100 m², 1949–1978) × 1,10 = 6,402 €; × 145 × 12 = 11.139,48 €
//   RND 80 − 47 = 33 → 25 % → 8.354,61 €; 2,5 % → × 22,29 = 186.224,26 €
//   Bodenwert 600 × 300 × 0,95 (Anlage 36) = 171.000 € × 0,4427 = 75.701,70 €
//   261.925,96 → 261.900 € × 0,31 ‰ = 81,189 → 81,19 € × 550 % = 446,545 → 446,55 €
const c3a = berechneGrundsteuer({ modell: 'bund', art: 'efh', bodenrichtwert: 300, grundflaeche: 600, wohnflaeche: 145, baujahr: 1975, hebesatz: 550, land: 'NW', mietniveaustufe: 4 });
// C3-02 EFH NRW, 80 m², Baujahr 1900, 1.000 m², BRW 1.000 €/m² → Mindestwert (§ 251):
//   6,10 € × 80 × 12 = 5.856 €; RND 24 (Mindest); 25 % → 4.392 €; LZ 2,5 − 0,5 = 2,0 % → × 18,91 = 83.052,72 €
//   Bodenwert 1.000 × 1.000 × 0,84 = 840.000 € × 0,6217 = 522.228 € → 605.280,72 €
//   Mindestwert 75 % × 840.000 = 630.000 € → 630.000 € × 0,31 ‰ = 195,30 € → 976,50 €
const c3b = berechneGrundsteuer({ modell: 'bund', art: 'efh', bodenrichtwert: 1000, grundflaeche: 1000, wohnflaeche: 80, baujahr: 1900, hebesatz: 500, land: 'NW', mietniveaustufe: 3 });
// C3-03 ZFH NRW, 180 m² (2 × 90 m²), Baujahr 2005, 700 m², BRW 350 €/m², Stufe 2:
//   6,37 € × 0,90 = 5,733 €; × 180 × 12 = 12.383,28 €; RND 63 → 18 % → 10.154,29 €
//   × 31,56 = 320.469,39 €; Bodenwert 700 × 350 × 0,92 = 225.400 € × 0,2111 = 47.581,94 €
//   368.051,33 → 368.000 € × 0,31 ‰ = 114,08 € → 570,40 €
const c3c = berechneGrundsteuer({ modell: 'bund', art: 'zfh', bodenrichtwert: 350, grundflaeche: 700, wohnflaeche: 180, baujahr: 2005, hebesatz: 500, land: 'NW', mietniveaustufe: 2 });
// C3-04 Mietwohngrundstück NRW, 8 Wohnungen à 70 m², Baujahr 1965, 800 m², BRW 400 €/m², Stufe 5, Hebesatz 600 %:
//   6,29 € × 1,20 = 7,548 €; × 560 × 12 = 50.722,56 €; RND 80 − 57 = 23 < 24 → 24 J.; 27 % → 37.027,47 €
//   4,5 % (mehr als 6 Wohnungen) → × 14,50 = 536.898,32 €; 320.000 € × 0,3477 = 111.264 €
//   648.162,32 → 648.100 € × 0,31 ‰ = 200,911 → 200,91 € × 600 % = 1.205,46 €
const c3d = berechneGrundsteuer({ modell: 'bund', art: 'miet', bodenrichtwert: 400, grundflaeche: 800, wohnflaeche: 560, baujahr: 1965, hebesatz: 600, land: 'NW', mietniveaustufe: 5, anzahlWohnungen: 8 });
// C3-05 wie B-01, aber Sachsen (Anlage 39 SN 5,20 €, Messzahl 0,36 ‰):
//   7.488 → 5.616 × 25,27 = 141.916,32 + 19.360 = 161.276,32 → 161.200 € × 0,36 ‰ = 58,03 € → 290,15 €
const c3e = berechneGrundsteuer({ modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'SN', mietniveaustufe: 3 });
// C3-06 wie B-01 mit Baudenkmal-Ermäßigung: 187.200 × 0,279 ‰ = 52,2288 → 52,23 €
const c3f = berechneGrundsteuer({ modell: 'bund', art: 'etw', bodenrichtwert: 200, grundflaeche: 400, wohnflaeche: 120, baujahr: 1990, hebesatz: 500, land: 'NW', mietniveaustufe: 3, ermaessigung: 'denkmal' });
cases.push(
  { name: 'C3-01 EFH NRW: Grundsteuerwert = 261.900 €',          actual: c3a.grundsteuerwert, expected: 261900 },
  { name: 'C3-01: Grundsteuer = 446,55 €',                       actual: c3a.grundsteuerJahr, expected: 446.55 },
  { name: 'C3-02 EFH Mindestwert: Grundsteuerwert = 630.000 €',  actual: c3b.grundsteuerwert, expected: 630000 },
  { name: 'C3-02: Mindestwert greift (1 = ja)',                  actual: c3b.bundesmodell?.mindestwertGreift ? 1 : 0, expected: 1 },
  { name: 'C3-02: Grundsteuer = 976,50 €',                       actual: c3b.grundsteuerJahr, expected: 976.50 },
  { name: 'C3-03 ZFH NRW: Grundsteuerwert = 368.000 €',          actual: c3c.grundsteuerwert, expected: 368000 },
  { name: 'C3-03: Grundsteuer = 570,40 €',                       actual: c3c.grundsteuerJahr, expected: 570.40 },
  { name: 'C3-04 Mietwohngr. NRW: Grundsteuerwert = 648.100 €',  actual: c3d.grundsteuerwert, expected: 648100 },
  { name: 'C3-04: Grundsteuer = 1.205,46 €',                     actual: c3d.grundsteuerJahr, expected: 1205.46 },
  { name: 'C3-05 ETW Sachsen: Grundsteuerwert = 161.200 €',      actual: c3e.grundsteuerwert, expected: 161200 },
  { name: 'C3-05: Messbetrag = 58,03 € (× 0,36 ‰)',              actual: c3e.messbetrag, expected: 58.03 },
  { name: 'C3-06 Baudenkmal: Messbetrag = 52,23 €',              actual: c3f.messbetrag, expected: 52.23 },
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
  // W187: vorher 375,10 € (vereinfachtes Bundesmodell); jetzt BewG, Standard NRW/Stufe 3/Anteil 1 (= B-01)
  { name: 'F-01 Modell-Switch bund → grundsteuerJahr = 290,15 €',     actual: f1.grundsteuerJahr, expected: 290.15, tolerance: 0.01 },
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
