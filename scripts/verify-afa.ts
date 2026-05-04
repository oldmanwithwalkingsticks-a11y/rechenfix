/**
 * Verify-Script für lib/berechnungen/afa.ts
 * (Welle-5 Track-A Tail D2, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 7 EStG: https://www.gesetze-im-internet.de/estg/__7.html
 *   - § 7 Abs. 2 EStG n.F. (Wachstumschancengesetz, Stichtag-Cut Degressiv
 *     ab 01.01.2026)
 *   - § 7 Abs. 5a EStG (Sonder-AfA Mietwohngebäude 5 %)
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
  berechneAfa,
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
  { name: 'A-06 AFA_DEGRESSIV_MAX_PROZENT = 20 (§ 7 Abs. 2 EStG)',                          actual: AFA_DEGRESSIV_MAX_PROZENT, expected: 20 },
  { name: 'A-07 AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT = 2026 (Wachstumschancengesetz)',     actual: AFA_DEGRESSIV_STICHTAG_JAHR_GESPERRT, expected: 2026 },
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

// === Cluster D: Wohngebäude-Sonder-AfA § 7 Abs. 5a EStG ===
//
// k=300.000, 2026-01-01: jaehrlich = 300.000 × 5 % = 15.000; 20 Jahre

const d1 = berechneAfa({
  anschaffungskosten: 300000, nutzungsdauerJahre: 5, methode: 'wohngebaeude-5',
  degressivSatzProzent: 0, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'D-01 Wohngebäude k=300k/01.01.2026: jaehrlich = 15.000 € (5 %)',  actual: d1.jaehrlich, expected: 15000, tolerance: 0.01 },
  { name: 'D-01: linSatzProzent = 5 (gesetzlich fest)',                       actual: d1.linSatzProzent, expected: 5 },
  { name: 'D-01: rows.length = 20 (gesetzlich 20 Jahre bei Vollanteil)',      actual: d1.rows.length, expected: 20 },
  { name: 'D-01: rows[19].restwert ≈ 0',                                       actual: d1.rows[19].restwert, expected: 0, tolerance: 0.01 },
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

// F-01: Stichtag-Cut bei 2026 → degressivGesperrt=true, Fallback Linear
const f1 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 20, startJahr: 2026, startMonat: 1,
});
cases.push(
  { name: 'F-01 Degressiv 2026: degressivGesperrt = true',                    actual: bool(f1.degressivGesperrt), expected: 1 },
  { name: 'F-01: methodeEffektiv (Fallback Linear) → jaehrlich = 2.000 €',    actual: f1.jaehrlich, expected: 2000, tolerance: 0.01 },
);

// F-02: Stichtag-Cut bei 2025 → degressivGesperrt=false (zugelassen)
const f2 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 20, startJahr: 2025, startMonat: 1,
});
//   degNum = min(20, 20) = 20; ersteAfa = 10000 × 0.20 × 1.0 = 2000;
//   rest = 8000; jahr 2: deg = 1600, lin = 8000/4 = 2000 → lin > deg → wechsle Linear; afa=2000
cases.push(
  { name: 'F-02 Degressiv 2025: degressivGesperrt = false',                          actual: bool(f2.degressivGesperrt), expected: 0 },
  { name: 'F-02: degressivSatzEffektivProzent = 20',                                  actual: f2.degressivSatzEffektivProzent, expected: 20 },
  { name: 'F-02: rows[0].afa = 2.000 € (Erstjahr Vollanteil × 20 %)',                 actual: f2.rows[0].afa, expected: 2000, tolerance: 0.01 },
);

// F-03: Cap auf 20 % bei Eingabe 25 %
const f3 = berechneAfa({
  anschaffungskosten: 10000, nutzungsdauerJahre: 5, methode: 'degressiv',
  degressivSatzProzent: 25, startJahr: 2025, startMonat: 1,
});
cases.push(
  { name: 'F-03 Degressiv-Satz 25 % Eingabe → Cap auf 20 %',  actual: f3.degressivSatzEffektivProzent, expected: 20 },
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
