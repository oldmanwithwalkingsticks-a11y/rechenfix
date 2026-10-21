/**
 * Verify-Script für lib/berechnungen/afa.ts
 * (Welle-5 Track-A Tail D2, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 7 EStG: https://www.gesetze-im-internet.de/estg/__7.html
 *   - § 7 Abs. 2 EStG n.F. (Investitionssofortprogramm, BGBl. 2025 I Nr. 161:
 *     Anschaffung 01.07.2025–31.12.2027, höchstens 3× linear und 30 %); frühere Fenster
 *     01.04.–31.12.2024 (2× / 20 %, Wachstumschancengesetz) und 2020–2022 (2,5× / 25 %,
 *     Zweites/Viertes Corona-Steuerhilfegesetz). W183: vorher Stand Wachstumschancengesetz
 *     (20 %, Sperre ab 2026) — A-06, A-07, F-01 bis F-03 waren dadurch rot.
 *   - § 7 Abs. 5a EStG (Wohngebäude: 5 % vom jeweiligen Restwert, Satz 4; Wechsel zur
 *     linearen AfA nach Restwert ÷ Restnutzungsdauer, Satz 7 und 8; Basis 33⅓ Jahre nach
 *     § 7 Abs. 4 Satz 1 Nr. 2a). W183: vorher 5 % linear über 20 Jahre (D-01).
 *   - § 6 Abs. 2 EStG (GWG): https://www.gesetze-im-internet.de/estg/__6.html
 *   - § 6 Abs. 2a EStG (Sammelposten-Pool)
 *
 * **Welle-2-refactor-only-Akzeptanz:** D2 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block + Modul-Scope-Konstanten. Tests prüfen die
 * mathematische AfA-Definition direkt nach EStG-Norm (Linear k/nd, Degressiv
 * Buchwert-Reduktion, GWG-Sofort, Wohngebäude 5 %, Sammelposten 20 % über 5 J).
 *
 * **L-35-Disziplin:** Lib modelliert 5 Methoden (linear/degressiv/gwg/
 * wohngebaeude-5/sammelposten). § 7 Abs. 4 Gebäude-AfA, § 7b, § 7 Abs. 6,
 * AfaA NICHT modelliert.
 *
 * Tolerance: 0,01 € für €-Werte, 0,001 für anteilErstjahr-Verhältnisse.
 *
 * Ausführen: npx tsx scripts/verify-afa.ts
 */

import {
  WOHNGEBAEUDE_SATZ_PROZENT,
  SAMMELPOSTEN_MIN,
  SAMMELPOSTEN_MAX,
  SAMMELPOSTEN_JAHRE,
  AFA_GWG_SCHWELLE_NETTO,
  AFA_DEGRESSIV_MAX_PROZENT,
  AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT,
  WOHNGEBAEUDE_NUTZUNGSDAUER_JAHRE,
  berechneAfa,
  anschaffungMonatJahr,
} from '../lib/berechnungen/afa';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const bool = (v: boolean): number => (v ? 1 : 0);

// === Cluster A: Konstanten ===

cases.push(
  { name: 'A-01 WOHNGEBAEUDE_SATZ_PROZENT = 5 (§ 7 Abs. 5a EStG)',                         actual: WOHNGEBAEUDE_SATZ_PROZENT, expected: 5 },
  { name: 'A-02 SAMMELPOSTEN_MIN = 250,01 (§ 6 Abs. 2a EStG)',                              actual: SAMMELPOSTEN_MIN, expected: 250.01, tolerance: 0.001 },
  { name: 'A-03 SAMMELPOSTEN_MAX = 1.000 (§ 6 Abs. 2a EStG)',                               actual: SAMMELPOSTEN_MAX, expected: 1000 },
  { name: 'A-04 SAMMELPOSTEN_JAHRE = 5 (§ 6 Abs. 2a EStG)',                                  actual: SAMMELPOSTEN_JAHRE, expected: 5 },
  { name: 'A-05 AFA_GWG_SCHWELLE_NETTO = 800 (§ 6 Abs. 2 EStG)',                            actual: AFA_GWG_SCHWELLE_NETTO, expected: 800 },
  { name: 'A-06 AFA_DEGRESSIV_MAX_PROZENT = 30 (§ 7 Abs. 2 S. 2 EStG n.F.)',                   actual: AFA_DEGRESSIV_MAX_PROZENT, expected: 30 },
  { name: 'A-07 AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT = 2028 (Investitionssofortprogramm)',     actual: AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT, expected: 2028 },
  { name: 'A-08 WOHNGEBAEUDE_NUTZUNGSDAUER_JAHRE = 33⅓ (3 %, § 7 Abs. 4 S. 1 Nr. 2a)',         actual: WOHNGEBAEUDE_NUTZUNGSDAUER_JAHRE, expected: 100 / 3, tolerance: 1e-9 },
);

// === Cluster B: Linear-AfA § 7 Abs. 1 EStG mit pro-rata-Erstjahres-Regel ===
//
// k=10.000, nd=5, 2026-01-01 (Vollanteil im Erstjahr):
//   jaehrlich = 2000; rows[0]={2026, 2000, 2000, 8000}; ... rows[4]={2030, 2000, 10000, 0}

const b1 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'B-01 Linear k=10k/nd=5/01.01.2026: jaehrlich = 2.000 €',  actual: b1.jaehrlich, expected: 2000, tolerance: 0.01 },
  { name: 'B-01: linSatzProzent = 20 % (100 / 5)',                    actual: b1.linSatzProzent, expected: 20, tolerance: 0.01 },
  { name: 'B-01: anteilErstjahr = 1,0 (12/12)',                       actual: b1.anteilErstjahr, expected: 1.0, tolerance: 0.001 },
  { name: 'B-01: rows.length = 5 (nd Jahre voll)',                    actual: b1.rows.length, expected: 5 },
  { name: 'B-01: rows[0].afa = 2.000 € (Vollanteil)',                 actual: b1.rows[0].afa, expected: 2000, tolerance: 0.01 },
  { name: 'B-01: rows[4].restwert = 0 € (vollständig abgeschrieben)', actual: b1.rows[4].restwert, expected: 0, tolerance: 0.01 },
  { name: 'B-01: rows[4].kumuliert = 10.000 € (= Anschaffung)',        actual: b1.rows[4].kumuliert, expected: 10000, tolerance: 0.01 },
);

// B-02: Linear k=12.000, nd=4, 2026-07-01 → halbes Erstjahr (6/12)
const b2 = berechneAfa({
  anschaffungskosten: 12000, nutzungsdauerJahre: 4, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 7,
});
//   jaehrlich = 3000; anteilErstjahr = 6/12 = 0.5
//   rows[0] = {2026, 1500, 1500, 10500}
//   rows[1..3] = {2027/28/29, 3000, 4500/7500/10500, 9000/6000/3000}
//   rows[4] = {2030, 1500, 12000, 0} (Restanteil)
cases.push(
  { name: 'B-02 Linear k=12k/nd=4/01.07.2026: anteilErstjahr = 0,5',  actual: b2.anteilErstjahr, expected: 0.5, tolerance: 0.001 },
  { name: 'B-02: rows[0].afa = 1.500 € (3000 × 0,5)',                  actual: b2.rows[0].afa, expected: 1500, tolerance: 0.01 },
  { name: 'B-02: rows.length = 5 (anteiliges Erst- + Restjahr)',       actual: b2.rows.length, expected: 5 },
  { name: 'B-02: letzte Zeile restwert = 0',                            actual: b2.rows[b2.rows.length - 1].restwert, expected: 0, tolerance: 0.01 },
);

// === Cluster C: GWG § 6 Abs. 2 EStG ===

const c1 = berechneAfa({
  anschaffungskosten: 500, nutzungsdauerJahre: 1, methode: 'gwg',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'C-01 GWG k=500 (≤ 800): gwgOk = true',           actual: bool(c1.gwgOk), expected: 1 },
  { name: 'C-01: jaehrlich = 500 € (Sofortabschreibung)',    actual: c1.jaehrlich, expected: 500 },
  { name: 'C-01: rows.length = 1',                            actual: c1.rows.length, expected: 1 },
  { name: 'C-01: rows[0].restwert = 0 (sofort voll)',         actual: c1.rows[0].restwert, expected: 0 },
);

const c2 = berechneAfa({
  anschaffungskosten: 800, nutzungsdauerJahre: 1, methode: 'gwg',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'C-02 GWG k=800 (Edge ≤ 800): gwgOk = true',  actual: bool(c2.gwgOk), expected: 1 },
  { name: 'C-02: jaehrlich = 800 €',                     actual: c2.jaehrlich, expected: 800 },
);

const c3 = berechneAfa({
  anschaffungskosten: 801, nutzungsdauerJahre: 1, methode: 'gwg',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'C-03 GWG k=801 (> 800): gwgOk = false',  actual: bool(c3.gwgOk), expected: 0 },
  { name: 'C-03: jaehrlich = 0',                     actual: c3.jaehrlich, expected: 0 },
  { name: 'C-03: rows.length = 0 (kein Plan)',       actual: c3.rows.length, expected: 0 },
);

// === Cluster D: Wohngebäude § 7 Abs. 5a EStG (W183: 5 % vom Restwert) ===
//
// k=300.000, 2026-01-01 (volles Erstjahr):
//   2026: 5 % × 300.000 = 15.000 → Rest 285.000
//   2027: 5 % × 285.000 = 14.250 → Rest 270.750
//   Jahr n (degressiv): 15.000 × 0,95^(n−1); Rest nach n Jahren 300.000 × 0,95^n
//   Wechsel, sobald Rest ÷ (33⅓ − n) > 5 % × Rest, also 33⅓ − n < 20 → n > 13⅓ → ab dem 15. Jahr (2040)
//   2040: Rest nach 14 Jahren 300.000 × 0,95^14 = 146.302,49 → linear 146.302,49 ÷ 19⅓ = 7.567,37
//   Ende: 34 Planjahre (2026–2059), Summe = 300.000
//   (vorher 5 % linear: 15.000 € × 20 Jahre)

const d1 = berechneAfa({
  anschaffungskosten: 300000, nutzungsdauerJahre: 5, methode: 'wohngebaeude-5',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
const d1Rest14 = 300000 * Math.pow(0.95, 14);
cases.push(
  { name: 'D-01 Wohngebäude k=300k/01.01.2026: jaehrlich = 15.000 € (5 % im 1. vollen Jahr)', actual: d1.jaehrlich, expected: 15000, tolerance: 0.01 },
  { name: 'D-01: linSatzProzent = 5 (gesetzlich fest)',                       actual: d1.linSatzProzent, expected: 5 },
  { name: 'D-01: rows[1].afa = 14.250 € (5 % vom Restwert 285.000)',           actual: d1.rows[1].afa, expected: 14250, tolerance: 0.01 },
  { name: 'D-01: rows[13].afa (2039) = 15.000 × 0,95^13',                      actual: d1.rows[13].afa, expected: 15000 * Math.pow(0.95, 13), tolerance: 0.01 },
  { name: 'D-01: wechselJahr = 2040 (Restnutzungsdauer < 20 Jahre)',          actual: d1.wechselJahr ?? 0, expected: 2040 },
  { name: 'D-01: rows[14].afa (2040) = Rest ÷ 19⅓ = 7.567,37 €',              actual: d1.rows[14].afa, expected: 7567.37, tolerance: 0.01 },
  { name: 'D-01: Restwert Ende 2039 = 300.000 × 0,95^14 = 146.302,49 €',       actual: d1.rows[13].restwert, expected: 146302.49, tolerance: 0.01 },
  { name: 'D-01: Hand-Kontrolle 0,95^14-Rest ÷ 19⅓ = 7.567,37 €',              actual: d1Rest14 / (100 / 3 - 14), expected: 7567.37, tolerance: 0.01 },
  { name: 'D-01: rows.length = 34 (2026–2059, 33⅓ Jahre)',                     actual: d1.rows.length, expected: 34 },
  { name: 'D-01: Σ AfA = 300.000 €',                                           actual: d1.rows.reduce((s, r) => s + r.afa, 0), expected: 300000, tolerance: 0.01 },
  { name: 'D-01: letzter Restwert ≈ 0',                                        actual: d1.rows[d1.rows.length - 1].restwert, expected: 0, tolerance: 0.01 },
);
// D-02: Fertigstellung 01.07.2026 → erstes Jahr zeitanteilig (§ 7 Abs. 5a Satz 5): 400.000 × 5 % × 6/12 = 10.000
const d2 = berechneAfa({
  anschaffungskosten: 400000, nutzungsdauerJahre: 5, methode: 'wohngebaeude-5',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 7,
});
cases.push(
  { name: 'D-02 Wohngebäude 400k ab 07/2026: rows[0].afa = 10.000 € (6/12)',  actual: d2.rows[0].afa, expected: 10000, tolerance: 0.01 },
  { name: 'D-02: rows[1].afa = 5 % × 390.000 = 19.500 €',                       actual: d2.rows[1].afa, expected: 19500, tolerance: 0.01 },
);

// === Cluster E: Sammelposten § 6 Abs. 2a EStG ===

const e1 = berechneAfa({
  anschaffungskosten: 500, nutzungsdauerJahre: 1, methode: 'sammelposten',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
//   sammelOk: 250,01 ≤ 500 ≤ 1000 → true; jaehrlich = 100; 5 Jahre
cases.push(
  { name: 'E-01 Sammelposten k=500: gwgOk = true (Pool zulässig)',   actual: bool(e1.gwgOk), expected: 1 },
  { name: 'E-01: jaehrlich = 100 € (500 / 5)',                        actual: e1.jaehrlich, expected: 100 },
  { name: 'E-01: rows.length = 5 (5-Jahres-Pool)',                    actual: e1.rows.length, expected: 5 },
  { name: 'E-01: rows[4].restwert = 0',                                actual: e1.rows[4].restwert, expected: 0, tolerance: 0.01 },
);

// E-02: Untergrenze-Edge (genau 250,01 → zulässig)
const e2 = berechneAfa({
  anschaffungskosten: 250.01, nutzungsdauerJahre: 1, methode: 'sammelposten',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'E-02 Sammelposten k=250,01 (Edge MIN): gwgOk = true',  actual: bool(e2.gwgOk), expected: 1 },
);

// E-03: Unter MIN (250 → unzulässig — sollte GWG sein)
const e3 = berechneAfa({
  anschaffungskosten: 250, nutzungsdauerJahre: 1, methode: 'sammelposten',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'E-03 Sammelposten k=250 (< MIN): gwgOk = false',  actual: bool(e3.gwgOk), expected: 0 },
  { name: 'E-03: rows.length = 0',                            actual: e3.rows.length, expected: 0 },
);

// E-04: Obergrenze-Edge (genau 1000 → zulässig)
const e4 = berechneAfa({
  anschaffungskosten: 1000, nutzungsdauerJahre: 1, methode: 'sammelposten',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'E-04 Sammelposten k=1.000 (Edge MAX): gwgOk = true',  actual: bool(e4.gwgOk), expected: 1 },
  { name: 'E-04: jaehrlich = 200 € (1000 / 5)',                   actual: e4.jaehrlich, expected: 200 },
);

// E-05: Über MAX (1001 → unzulässig)
const e5 = berechneAfa({
  anschaffungskosten: 1001, nutzungsdauerJahre: 1, methode: 'sammelposten',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'E-05 Sammelposten k=1.001 (> MAX): gwgOk = false',  actual: bool(e5.gwgOk), expected: 0 },
);

// === Cluster F: Degressiv § 7 Abs. 2 EStG mit Stichtag-Cut + Cap + Linear-Switch ===

// F-01: 2026 liegt im Fenster 07/2025–12/2027 → nicht gesperrt (W183: vorher Erwartung gesperrt).
//   degNum = 20; Jahr 1: 2.000; Jahr 2: deg 1.600 < lin 8.000/4 = 2.000 → Wechsel zu linear → 2.000
const f1 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 20, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'F-01 Degressiv 2026: degressivGesperrt = false (Fenster 07/2025–12/2027)', actual: bool(f1.degressivGesperrt), expected: 0 },
  { name: 'F-01: Degressiv 20 %, Wechsel zu Linear ab Jahr 2 → jaehrlich = 2.000 €', actual: f1.jaehrlich, expected: 2000, tolerance: 0.01 },
);
// F-01b: 2028 → gesperrt, Fallback linear
const f1b = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 20, startJahr: 2028, startMonat: 1,
});
cases.push(
  { name: 'F-01b Degressiv 2028: degressivGesperrt = true',                   actual: bool(f1b.degressivGesperrt), expected: 1 },
  { name: 'F-01b: Fallback Linear → jaehrlich = 2.000 €',                     actual: f1b.jaehrlich, expected: 2000, tolerance: 0.01 },
);

// F-02: 07/2026 im Fenster → 20 %, Erstjahr 6/12: 10.000 × 0,20 × 0,5 = 1.000
// (W183: vorher 01/2025 — liegt vor dem Fenster und ist jetzt gesperrt, siehe F-04)
const f2 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 20, startJahr: 2026, startMonat: 7,
});
cases.push(
  { name: 'F-02 Degressiv 07/2026: degressivGesperrt = false',                         actual: bool(f2.degressivGesperrt), expected: 0 },
  { name: 'F-02: degressivSatzEffektivProzent = 20',                                  actual: f2.degressivSatzEffektivProzent, expected: 20 },
  { name: 'F-02: rows[0].afa = 1.000 € (6/12 × 20 %)',                                actual: f2.rows[0].afa, expected: 1000, tolerance: 0.01 },
);

// F-03: Eingabe 35 % → Deckel 30 % (3× linear wäre 60 %); vorher Eingabe 25 % → erwartet 20 %
const f3 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 35, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'F-03 Degressiv-Satz 35 % Eingabe → Cap auf 30 % (§ 7 Abs. 2 S. 2 EStG n.F.)', actual: f3.degressivSatzEffektivProzent, expected: 30 },
);

// F-04 (W183): Fenstergrenzen nach § 7 Abs. 2 EStG in den jeweiligen Fassungen, 100.000 €/10 J., Eingabe 30 %
const fx = (jahr: number, monat: number) => berechneAfa({
  anschaffungskosten: 100000, nutzungsdauerJahre: 10, methode: 'degressiv',
  degressivSatzProzent: 30, startJahr: jahr, startMonat: monat,
});
cases.push(
  { name: 'F-04 06/2025 (vor dem Fenster): gesperrt',                         actual: bool(fx(2025, 6).degressivGesperrt), expected: 1 },
  { name: 'F-04 03/2025: gesperrt → linear 10.000 €/Jahr',                     actual: fx(2025, 3).jaehrlich, expected: 10000, tolerance: 0.01 },
  { name: 'F-04 07/2025 (Fensterbeginn): frei, 30 %',                          actual: fx(2025, 7).degressivSatzEffektivProzent, expected: 30 },
  { name: 'F-04 12/2027 (Fensterende): frei',                                   actual: bool(fx(2027, 12).degressivGesperrt), expected: 0 },
  { name: 'F-04 06/2024 (Wachstumschancengesetz): 2× linear = 20 %',           actual: fx(2024, 6).degressivSatzEffektivProzent, expected: 20 },
  { name: 'F-04 06/2024: Erstjahr 7/12 × 20 % × 100.000 = 11.666,67 €',        actual: fx(2024, 6).rows[0].afa, expected: 100000 * 0.2 * 7 / 12, tolerance: 0.01 },
  { name: 'F-04 03/2024 (vor dem Fenster): gesperrt',                         actual: bool(fx(2024, 3).degressivGesperrt), expected: 1 },
  { name: 'F-04 2023: gesperrt',                                               actual: bool(fx(2023, 5).degressivGesperrt), expected: 1 },
  { name: 'F-04 01/2021 (Corona-Steuerhilfegesetze): 2,5× linear = 25 %',      actual: fx(2021, 1).degressivSatzEffektivProzent, expected: 25 },
  { name: 'F-04 01/2021: Erstjahr 25.000 €',                                    actual: fx(2021, 1).rows[0].afa, expected: 25000, tolerance: 0.01 },
  { name: 'F-04 12/2019: gesperrt (ältere Fassungen nicht abgebildet)',        actual: bool(fx(2019, 12).degressivGesperrt), expected: 1 },
);

// === Cluster G: Pro-rata-Erstjahres-Regel ===

const g1 = berechneAfa({
  anschaffungskosten: 12000, nutzungsdauerJahre: 1, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'G-01 Januar (Monat 1): anteilErstjahr = 12/12 = 1,0',  actual: g1.anteilErstjahr, expected: 1.0, tolerance: 0.001 },
);

const g2 = berechneAfa({
  anschaffungskosten: 12000, nutzungsdauerJahre: 1, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 7,
});
cases.push(
  { name: 'G-02 Juli (Monat 7): anteilErstjahr = 6/12 = 0,5',  actual: g2.anteilErstjahr, expected: 0.5, tolerance: 0.001 },
);

const g3 = berechneAfa({
  anschaffungskosten: 12000, nutzungsdauerJahre: 1, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 12,
});
cases.push(
  { name: 'G-03 Dezember (Monat 12): anteilErstjahr = 1/12',  actual: g3.anteilErstjahr, expected: 1 / 12, tolerance: 0.001 },
);

// === Cluster H: Strukturelle Invarianten ===

const h1 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
//   Σ rows[i].afa = 10.000 (Anschaffung); rows[i].kumuliert wächst monoton
const sumRowsH1 = h1.rows.reduce((s, r) => s + r.afa, 0);
cases.push(
  { name: 'H-01 Σ rows.afa = anschaffungskosten (Vollabschreibung)',  actual: sumRowsH1, expected: 10000, tolerance: 0.01 },
  { name: 'H-02 letzte Zeile.kumuliert = anschaffungskosten',          actual: h1.rows[h1.rows.length - 1].kumuliert, expected: 10000, tolerance: 0.01 },
  { name: 'H-03 letzte Zeile.restwert = 0',                             actual: h1.rows[h1.rows.length - 1].restwert, expected: 0, tolerance: 0.01 },
  { name: 'H-04 anschaffungskosten Echo unverändert',                   actual: h1.anschaffungskosten, expected: 10000 },
);

// === Cluster I: Edge-Cases ===

const i1 = berechneAfa({
  anschaffungskosten: 0, nutzungsdauerJahre: 5, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'I-01 k=0: jaehrlich = 0',                actual: i1.jaehrlich, expected: 0 },
  { name: 'I-01: rows.length = 1 (Erstjahr 0-Eintrag, while-Loop Cut)',  actual: i1.rows.length, expected: 1 },
);

const i2 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 0, methode: 'linear',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'I-02 nd=0 → geclampt auf 1: jaehrlich = 10.000 (k/1)',  actual: i2.jaehrlich, expected: 10000, tolerance: 0.01 },
  { name: 'I-02: nutzungsdauerJahre Echo = 1 (Math.max-Clamp)',     actual: i2.nutzungsdauerJahre, expected: 1 },
);

const i3 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'gwg',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'I-03 GWG k=10.000 (weit über Schwelle): gwgOk = false',  actual: bool(i3.gwgOk), expected: 0 },
);

// === W191: Anschaffungsdatum in Ortszeit (die CI rechnet auch mit TZ=America/New_York) ===
const j1 = anschaffungMonatJahr('2025-07-01');
const j2 = anschaffungMonatJahr('2028-01-01');
const j3 = anschaffungMonatJahr('');
cases.push(
  { name: 'J-01 01.07.2025 → Monat 7 (Fenster 30 %, nicht Juni)',     actual: j1.startMonat, expected: 7 },
  { name: 'J-01 01.07.2025 → Jahr 2025',                              actual: j1.startJahr, expected: 2025 },
  { name: 'J-02 01.01.2028 → Monat 1',                                actual: j2.startMonat, expected: 1 },
  { name: 'J-02 01.01.2028 → Jahr 2028 (linear, nicht Dezember 2027)', actual: j2.startJahr, expected: 2028 },
  { name: 'J-03 leeres Feld → Januar',                                actual: j3.startMonat, expected: 1 },
  { name: 'J-03 leeres Feld → 2026',                                  actual: j3.startJahr, expected: 2026 },
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
