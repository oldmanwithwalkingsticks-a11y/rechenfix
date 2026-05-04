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
//   personen=2, grundzulagen=350; kinderzulagen=4×300=1200; zulagenGesamt=1550
//   vierProzent=4000; min(4000-1550, 2100-1550) = min(2450, 550) = 550 (Höchstbetrag-Cap)
//   max(60, 550) = 550
cases.push(
  { name: 'D-03 brutto=100k/2P/4K: optimalerEB = 550 € (Höchstbetrag-Cap)',  actual: d3!.optimalerEigenbeitrag, expected: 550 },
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
