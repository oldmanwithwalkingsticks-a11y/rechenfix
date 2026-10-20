/**
 * Verify-Script für lib/berechnungen/riester.ts
 * (Welle-5 Track-A Tail D3, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 84 EStG (Grundzulage)
 *   - § 85 EStG (Kinderzulage Geburtsjahr-Schwelle 2008)
 *   - § 86 EStG (Eigenbeitrag-Mindestquote 4 %, Sockel 60 €)
 *   - § 10a EStG (Sonderausgabenabzug + Günstigerprüfung):
 *     https://www.gesetze-im-internet.de/estg/__10a.html
 *
 * **Welle-2-refactor-only-Akzeptanz:** D3 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block. Tests prüfen die mathematische Förderlogik direkt
 * nach EStG-Norm (Grundzulage × Personen + Σ Kinderzulage; 4 %-Mindestquote;
 * pro-rata-Kürzung; Sonderausgaben × Grenzsteuersatz; Günstigerprüfung-
 * Differenz).
 *
 * **L-35-Disziplin:** Lib modelliert nur die Component-Förderkomponenten
 * (Grundzulage / Kinderzulage / Eigenbeitrag / Sonderausgabenabzug /
 * vereinfachte Günstigerprüfung). § 87 Berufseinsteiger-Bonus, § 92a
 * Wohnriester, § 93 förderschädliche Verwendung NICHT modelliert.
 *
 * **L-36 NICHT angewandt:** Component verwendet User-Eingabe für
 * Grenzsteuersatz statt Cross-Lib-Konsum aus `steuerprogression.ts` /
 * `lohnsteuer.ts`. Tests verifizieren die Lib-interne Berechnung direkt.
 *
 * Tolerance: 0,01 € für €-Werte, 0,01 % für Quoten.
 *
 * Ausführen: npx tsx scripts/verify-riester.ts
 */

import {
  RIESTER_GRUNDZULAGE,
  RIESTER_KINDERZULAGE_AB_2008,
  RIESTER_KINDERZULAGE_VOR_2008,
  RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE,
  RIESTER_HOECHSTBETRAG,
  RIESTER_SOCKEL_BEITRAG,
  RIESTER_MINDESTBEITRAG_PROZENT,
  RIESTER_FOERDERQUOTE_GRUEN,
  RIESTER_FOERDERQUOTE_GELB,
  berechneRiester,
  schaetzeGrenzsteuersatz2026,
} from '../lib/berechnungen/riester';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const isNull = (v: unknown): number => (v === null ? 1 : 0);

// === Cluster A: Konstanten ===

cases.push(
  { name: 'A-01 RIESTER_GRUNDZULAGE = 175 (§ 84 EStG seit 2018)',                  actual: RIESTER_GRUNDZULAGE, expected: 175 },
  { name: 'A-02 RIESTER_KINDERZULAGE_AB_2008 = 300 (§ 85 EStG)',                    actual: RIESTER_KINDERZULAGE_AB_2008, expected: 300 },
  { name: 'A-03 RIESTER_KINDERZULAGE_VOR_2008 = 185 (§ 85 EStG)',                   actual: RIESTER_KINDERZULAGE_VOR_2008, expected: 185 },
  { name: 'A-04 RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE = 2008',                   actual: RIESTER_KINDERZULAGE_GEBURTSJAHR_SCHWELLE, expected: 2008 },
  { name: 'A-05 RIESTER_HOECHSTBETRAG = 2.100 (§ 86 / § 10a EStG)',                  actual: RIESTER_HOECHSTBETRAG, expected: 2100 },
  { name: 'A-06 RIESTER_SOCKEL_BEITRAG = 60 (§ 86 EStG)',                            actual: RIESTER_SOCKEL_BEITRAG, expected: 60 },
  { name: 'A-07 RIESTER_MINDESTBEITRAG_PROZENT = 0,04 (§ 86 EStG)',                  actual: RIESTER_MINDESTBEITRAG_PROZENT, expected: 0.04, tolerance: 0.0001 },
  { name: 'A-08 RIESTER_FOERDERQUOTE_GRUEN = 30 (UI-Schwelle)',                      actual: RIESTER_FOERDERQUOTE_GRUEN, expected: 30 },
  { name: 'A-09 RIESTER_FOERDERQUOTE_GELB = 15 (UI-Schwelle)',                       actual: RIESTER_FOERDERQUOTE_GELB, expected: 15 },
);

// === Cluster B: Grundzulage § 84 EStG ===

const b1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'B-01 Alleinstehend: personen = 1',          actual: b1!.personen, expected: 1 },
  { name: 'B-01: grundzulagen = 175 €',                 actual: b1!.grundzulagen, expected: 175 },
);

const b2 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'beide-partner', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'B-02 Beide Partner: personen = 2',           actual: b2!.personen, expected: 2 },
  { name: 'B-02: grundzulagen = 350 € (2 × 175)',        actual: b2!.grundzulagen, expected: 350 },
);

const b3 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'ein-partner', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'B-03 Ein-Partner (mittelbar): personen = 1 (Approximation)',  actual: b3!.personen, expected: 1 },
);

// === Cluster C: Kinderzulage § 85 EStG mit Geburtsjahr-Schwelle ===

const c1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 1,
  kinderAb2008: [true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'C-01 1 Kind ab 2008: kinderzulagen = 300 €',  actual: c1!.kinderzulagen, expected: 300 },
);

const c2 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 1,
  kinderAb2008: [false], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'C-02 1 Kind vor 2008: kinderzulagen = 185 €',  actual: c2!.kinderzulagen, expected: 185 },
);

const c3 = berechneRiester({
  vorjahresBrutto: 50000, familienstand: 'alleinstehend', kinderAnzahl: 2,
  kinderAb2008: [true, true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'C-03 2 Kinder beide ab 2008: kinderzulagen = 600 €',  actual: c3!.kinderzulagen, expected: 600 },
);

const c4 = berechneRiester({
  vorjahresBrutto: 50000, familienstand: 'alleinstehend', kinderAnzahl: 3,
  kinderAb2008: [true, false, true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'C-04 3 Kinder gemischt (ab/vor/ab 2008): kinderzulagen = 785 (300+185+300)',  actual: c4!.kinderzulagen, expected: 785 },
);

const c5 = berechneRiester({
  vorjahresBrutto: 60000, familienstand: 'beide-partner', kinderAnzahl: 2,
  kinderAb2008: [true, true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'C-05 Beide Partner + 2 Kinder ab 2008: zulagenGesamt = 950 (350+600)',  actual: c5!.zulagenGesamt, expected: 950 },
);

// === Cluster D: Eigenbeitrag-Mindestquote 4 % + Sockel + Höchstbetrag ===
//
// brutto=40k, 0 Kinder, alleinstehend → vierProzent=1600
// optimalerEB = max(60, min(1600-175, 2100-175)) = max(60, min(1425, 1925)) = 1425

const d1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'D-01 brutto=40k/0K: vierProzent = 1.600 €',                actual: d1!.vierProzent, expected: 1600, tolerance: 0.01 },
  { name: 'D-01: optimalerEigenbeitrag = 1.425 € (4 % − 175 Zulage)',  actual: d1!.optimalerEigenbeitrag, expected: 1425, tolerance: 0.01 },
  { name: 'D-01: mindestEigenbeitrag = 1.425 €',                       actual: d1!.mindestEigenbeitrag, expected: 1425, tolerance: 0.01 },
);

// D-02: Sehr niedriges Brutto → Sockel-Greift
const d2 = berechneRiester({
  vorjahresBrutto: 5000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
//   vierProzent=200; min(200-175, 2100-175) = min(25, 1925) = 25; max(60, 25) = 60 (Sockel)
cases.push(
  { name: 'D-02 brutto=5k: optimalerEB = 60 € (Sockel greift)',  actual: d2!.optimalerEigenbeitrag, expected: 60 },
);

// D-03: Sehr hohes Brutto + viele Kinder → Höchstbetrag-Cap kann relevant werden
const d3 = berechneRiester({
  vorjahresBrutto: 100000, familienstand: 'beide-partner', kinderAnzahl: 4,
  kinderAb2008: [true, true, true, true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
// W183: vorher 550 € (Mindest- und Höchstbetrag einmal für das Paar). § 86 Abs. 1 / § 10a Abs. 3 EStG: je Person.
//   Je Partner 50.000 € Vorjahresbrutto, Kinderzulagen bei der Mutter (§ 85 Abs. 2 EStG):
//   Mutter: min(2.000, 2.100) − (175 + 4 × 300) = 2.000 − 1.375 = 625 €
//   Vater:  min(2.000, 2.100) − 175 = 1.825 €
//   optimal = 625 + 1.825 = 2.450 €; Sonderausgaben je 2.000 € (Beitrag + Zulagen) → 4.000 €
cases.push(
  { name: 'D-03 brutto=100k/2P/4K: optimalerEB = 2.450 € (625 + 1.825, je Person)',  actual: d3!.optimalerEigenbeitrag, expected: 2450, tolerance: 0.01 },
  { name: 'D-03: Sonderausgaben = 4.000 € (2 × 2.000)',                            actual: d3!.sonderausgaben, expected: 4000, tolerance: 0.01 },
  { name: 'D-03: effektiveZulagen = 1.550 € (voll)',                                actual: d3!.effektiveZulagen, expected: 1550, tolerance: 0.01 },
);

// D-04 (W183): Alleinstehend 60.000 € — 4 % = 2.400 €, gedeckelt auf 2.100 € (§ 86 Abs. 1 Satz 2 EStG)
//   mindest = 2.100 − 175 = 1.925 €; volle Zulage (vorher wegen fehlendem Deckel 175 × 1.925/2.225 = 151,40 €)
const d4 = berechneRiester({
  vorjahresBrutto: 60000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'D-04 alleinstehend 60k: mindestEigenbeitrag = 1.925 € (4 % auf 2.100 € gedeckelt)', actual: d4!.mindestEigenbeitrag, expected: 1925, tolerance: 0.01 },
  { name: 'D-04: effektiveZulagen = 175 € (voll)',                                             actual: d4!.effektiveZulagen, expected: 175, tolerance: 0.01 },
  { name: 'D-04: Sonderausgaben = 2.100 €',                                                    actual: d4!.sonderausgaben, expected: 2100, tolerance: 0.01 },
);

// D-05 (W183): beide riestern, 60.000 € gemeinsam, 0 Kinder — je 30.000 €: 1.200 − 175 = 1.025 €
//   optimal 2.050 €, volle Zulagen 350 € (vorher 298,78 €), Sonderausgaben 2 × 1.200 = 2.400 €
const d5 = berechneRiester({
  vorjahresBrutto: 60000, familienstand: 'beide-partner', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.2566,
});
cases.push(
  { name: 'D-05 beide 60k: optimalerEB = 2.050 € (2 × 1.025)',   actual: d5!.optimalerEigenbeitrag, expected: 2050, tolerance: 0.01 },
  { name: 'D-05: effektiveZulagen = 350 € (voll)',                actual: d5!.effektiveZulagen, expected: 350, tolerance: 0.01 },
  { name: 'D-05: Sonderausgaben = 2.400 € (2 × 1.200)',           actual: d5!.sonderausgaben, expected: 2400, tolerance: 0.01 },
  { name: 'D-05: Gesamtförderung = 2.400 × 25,66 % = 615,84 €',   actual: d5!.gesamtfoerderung, expected: 615.84, tolerance: 0.01 },
);

// === Cluster E: Zulagen-Kürzung pro rata bei Unterzahlung ===

// E-01: Eigenbeitrag = 50 % Mindest → Zulagen 50 % gekürzt
const e1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 712.50, grenzsteuersatz: 0.35,
});
//   mindestEB=1425, eb=712.5 → quote=0.5 → effektiveZulagen = 175 × 0.5 = 87.5
cases.push(
  { name: 'E-01 EB = 50 % Mindest: effektiveZulagen = 87,50 € (175 × 0,5)',  actual: e1!.effektiveZulagen, expected: 87.50, tolerance: 0.01 },
);

// E-02: Eigenbeitrag = volle Mindest → Zulagen voll
const e2 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 1425, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'E-02 EB = Mindest: effektiveZulagen = 175 € (volle Zulage)',  actual: e2!.effektiveZulagen, expected: 175 },
);

// E-03: Eigenbeitrag > Mindest → Quote auf 1 geclampt
const e3 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 2000, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'E-03 EB > Mindest: effektiveZulagen = 175 € (Quote auf 1 geclampt)',  actual: e3!.effektiveZulagen, expected: 175 },
);

// === Cluster F: Sonderausgabenabzug + Günstigerprüfung § 10a EStG ===
//
// Default brutto=40k/0K/35%: eb=optimal=1425, effZul=175
//   sonderausgaben = min(2100, 1425+175) = 1600
//   steuerersparnis = 1600 × 0,35 = 560
//   zusätzlicherSteuervorteil = max(0, 560-175) = 385

const f1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'F-01 sonderausgaben = 1.600 € (eb 1425 + zul 175)',           actual: f1!.sonderausgaben, expected: 1600, tolerance: 0.01 },
  { name: 'F-01: steuerersparnis = 560 € (1600 × 35 %)',                  actual: f1!.steuerersparnis, expected: 560, tolerance: 0.01 },
  { name: 'F-01: zusätzlicherSteuervorteil = 385 € (Sonder günstiger)',   actual: f1!.zusatzlicherSteuervorteil, expected: 385, tolerance: 0.01 },
  { name: 'F-01: gesamtfoerderung = 560 € (175 + 385)',                    actual: f1!.gesamtfoerderung, expected: 560, tolerance: 0.01 },
);

// F-02: Familie mit hohen Zulagen → Zulagen günstiger als Sonderausgaben
const f2 = berechneRiester({
  vorjahresBrutto: 50000, familienstand: 'alleinstehend', kinderAnzahl: 2,
  kinderAb2008: [true, true], eigenbeitrag: 0, grenzsteuersatz: 0.30,
});
//   zulagen=775; vierProzent=2000; optimalEB=min(2000-775, 2100-775)=min(1225,1325)=1225; max(60,1225)=1225
//   eb=1225, effZul=775; sonderausgaben=min(2100, 1225+775)=2000
//   steuerersparnis = 2000 × 0,30 = 600
//   zusätzlicherSteuervorteil = max(0, 600-775) = 0 (Zulagen günstiger!)
cases.push(
  { name: 'F-02 Familie 2K/30 % GrSt: zusätzlicherSteuervorteil = 0 (Zulagen günstiger)', actual: f2!.zusatzlicherSteuervorteil, expected: 0 },
  { name: 'F-02: gesamtfoerderung = 775 € (nur Zulagen)',                                  actual: f2!.gesamtfoerderung, expected: 775 },
);

// F-03: Sonderausgabenabzug-Cap bei 2.100 €
const f3 = berechneRiester({
  vorjahresBrutto: 60000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 2200, grenzsteuersatz: 0.42,
});
//   eb=2200, effZul=175; sonderausgaben = min(2100, 2200+175) = 2100 (Cap!)
cases.push(
  { name: 'F-03 EB=2200 + zul=175 → sonderausgaben = 2.100 € (Cap)',  actual: f3!.sonderausgaben, expected: 2100 },
);

// === Cluster G: Förderquote + Lohnt-sich-Ampel ===
//
// Default: gesamtfoerderung=560, eb=1425 → foerderquote = 39,30 % → "gruen"

const g1 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'G-01 Default: foerderquote ≈ 39,30 %',          actual: g1!.foerderquote, expected: 39.30, tolerance: 0.01 },
  { name: 'G-01: lohntSich = "gruen" (≥ 30 %)',             actual: g1!.lohntSich === 'gruen' ? 1 : 0, expected: 1 },
);

// G-02: Niedriger Grenzsteuersatz, keine Kinder → Förderquote evtl. gelb
const g2 = berechneRiester({
  vorjahresBrutto: 30000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.25,
});
//   vierProzent=1200; optimalEB=max(60, min(1200-175, 2100-175))=1025
//   eb=1025, effZul=175; sonderausgaben=min(2100, 1025+175)=1200
//   steuerersparnis = 1200 × 0,25 = 300
//   zusätzl = max(0, 300-175) = 125; gesamt = 175 + 125 = 300
//   foerderquote = 300/1025 × 100 ≈ 29,27 % → "gelb"
cases.push(
  { name: 'G-02 brutto=30k/25 % GrSt: lohntSich = "gelb" (15-30 %)',  actual: g2!.lohntSich === 'gelb' ? 1 : 0, expected: 1 },
);

// === Cluster H: Strukturelle Invarianten ===

const h1 = berechneRiester({
  vorjahresBrutto: 50000, familienstand: 'alleinstehend', kinderAnzahl: 2,
  kinderAb2008: [true, true], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'H-01 zulagenGesamt = grundzulagen + kinderzulagen',  actual: h1!.zulagenGesamt, expected: h1!.grundzulagen + h1!.kinderzulagen },
  { name: 'H-02 effektiveZulagen ≤ zulagenGesamt (pro-rata)',     actual: h1!.effektiveZulagen <= h1!.zulagenGesamt ? 1 : 0, expected: 1 },
  { name: 'H-03 gesamtfoerderung = effektiveZulagen + zusätzlicherSteuervorteil',  actual: h1!.gesamtfoerderung, expected: h1!.effektiveZulagen + h1!.zusatzlicherSteuervorteil, tolerance: 0.01 },
  { name: 'H-04 zusätzlicherSteuervorteil ≥ 0 (Math.max-Clamp)',   actual: h1!.zusatzlicherSteuervorteil >= 0 ? 1 : 0, expected: 1 },
);

// === Cluster I: Edge-Cases ===

const i1 = berechneRiester({
  vorjahresBrutto: 0, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'I-01 vorjahresBrutto = 0 → null-Return',  actual: isNull(i1), expected: 1 },
);

const i2 = berechneRiester({
  vorjahresBrutto: -100, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'I-02 vorjahresBrutto < 0 → null-Return',  actual: isNull(i2), expected: 1 },
);

// I-03: Eigenbeitrag = 0 + brutto > 0 → Auto-Optimum greift
const i3 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 0,
  kinderAb2008: [], eigenbeitrag: 0, grenzsteuersatz: 0.35,
});
cases.push(
  { name: 'I-03 EB-Eingabe = 0 → Auto-Optimum greift (eigenbeitrag = optimalerEigenbeitrag)',  actual: i3!.eigenbeitrag, expected: i3!.optimalerEigenbeitrag, tolerance: 0.01 },
);

// === Cluster J (W183): Startwert Grenzsteuersatz aus dem Brutto ===
//
// Vorher stand die Component fest auf 35 %. Sollwerte hier von Hand:
//   zvE = Brutto − 1.230 − 36 − Vorsorgepauschale (PAP 2026: RV 9,3 %, KV 7,0 % + 1,45 %,
//   PV 1,8 % bzw. kinderlos 2,4 %; in Cent abgeschnitten, Summe aufgerundet)
//   Grenzsteuersatz § 32a EStG 2026, Zone 3: (2 × 173,10 × z + 2.397) / 10.000, z = (x − 17.799) / 10.000
const vspHand = (b: number, pv: number) => Math.ceil((Math.floor(b * 9.3) + Math.floor(b * (8.45 + pv))) / 100);
const grenzZone3 = (x: number) => (2 * 173.10 * ((x - 17799) / 10000) + 2397) / 10000;
// 40.000 €, ohne Kind: VSP = ⌈3.720 + 4.340⌉ = 8.060 → zvE 30.674 → 28,427 %
const j1Soll = grenzZone3(40000 - 1266 - vspHand(40000, 2.4));
// 40.000 €, 1 Kind: VSP = 3.720 + 4.100 = 7.820 → zvE 30.914 → 28,510 %
const j2Soll = grenzZone3(40000 - 1266 - vspHand(40000, 1.8));
// beide riestern, 60.000 € je zur Hälfte: zvE je 30.000 − 1.266 − 6.045 = 22.689 → Splitting x = 22.689
const j3Soll = grenzZone3(30000 - 1266 - vspHand(30000, 2.4));
cases.push(
  { name: 'J-01 40.000 € ledig ohne Kind: Grenzsteuersatz ≈ 28,43 %',      actual: schaetzeGrenzsteuersatz2026(40000, 'alleinstehend', 0), expected: j1Soll, tolerance: 0.00001 },
  { name: 'J-01 Sollwert von Hand = 0,28427',                               actual: j1Soll, expected: 0.28427, tolerance: 0.00001 },
  { name: 'J-02 40.000 € ledig, 1 Kind: Grenzsteuersatz ≈ 28,51 %',        actual: schaetzeGrenzsteuersatz2026(40000, 'alleinstehend', 1), expected: j2Soll, tolerance: 0.00001 },
  { name: 'J-03 60.000 € beide riestern: Splitting ≈ 25,66 %',             actual: schaetzeGrenzsteuersatz2026(60000, 'beide-partner', 0), expected: j3Soll, tolerance: 0.00001 },
  { name: 'J-04 ein-partner 20.000 € (Splitting, Partner ohne Einkommen) = 0', actual: schaetzeGrenzsteuersatz2026(20000, 'ein-partner', 0), expected: 0, tolerance: 0 },
);
// Beispiel der Seite (40.000 €, 1 Kind, Satz geschätzt): 1.600 € × 28,51 % = 456 € < 475 € Zulagen
// → kein Zusatzvorteil, Förderung 475 €, Quote 475 / 1.125 = 42,22 % (vorher mit 35 %: 560 €, 49,78 %)
const j5 = berechneRiester({
  vorjahresBrutto: 40000, familienstand: 'alleinstehend', kinderAnzahl: 1,
  kinderAb2008: [true], eigenbeitrag: 0, grenzsteuersatz: schaetzeGrenzsteuersatz2026(40000, 'alleinstehend', 1),
});
cases.push(
  { name: 'J-05 Beispiel 40k/1 Kind: Zusatzvorteil = 0',                    actual: j5!.zusatzlicherSteuervorteil, expected: 0, tolerance: 0.01 },
  { name: 'J-05 Beispiel 40k/1 Kind: Gesamtförderung = 475 €',              actual: j5!.gesamtfoerderung, expected: 475, tolerance: 0.01 },
  { name: 'J-05 Beispiel 40k/1 Kind: Förderquote = 42,22 %',                actual: j5!.foerderquote, expected: 42.22, tolerance: 0.01 },
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
