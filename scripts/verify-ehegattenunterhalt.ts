/**
 * Verify-Script für lib/berechnungen/ehegattenunterhalt.ts (Welle-4 M3a, 03.05.2026).
 *
 * Lib aus M3a-Refactor extrahiert (Component zuvor KEINE-LIB mit 255 LoC
 * Inline-Logik; Refactor-Commit d8f4ac1).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - BGB § 1361 (Trennungsunterhalt):
 *     https://www.gesetze-im-internet.de/bgb/__1361.html
 *   - BGB §§ 1569 ff. (Nachehelicher Unterhalt)
 *   - BGB § 1609 (Vorrang Kindesunterhalt — KU-Vorabzug)
 *   - Düsseldorfer-Tabelle 2026 (OLG Düsseldorf, Stand 01.01.2026):
 *     SB 1.600 € (erwerbstätig) bzw. 1.475 € (nicht erwerbstätig)
 *   - 3/7-Methode (BGH-Standard ≈ 42,857 %): bundesweit
 *   - Süddeutsche Leitlinien (45 %): OLG-Bezirke Bamberg, Karlsruhe,
 *     München, Nürnberg, Stuttgart, Zweibrücken
 *
 * L-35-Disziplin (im Lib-Header dokumentiert):
 *   - § 1573 Anschlussunterhalt NICHT modelliert
 *   - § 1574 Erwerbsobliegenheit NICHT modelliert
 *   - § 1577 Anrechnung eigenes Vermögen NICHT modelliert
 *   - DT-SB hard-coded (kein Cross-Lib-Computation aus DT-Lib)
 *
 * Test-Strategie: Manuell durchgerechnete 3/7- und 45 %-Cases, SB-Klemme,
 * Edge-Cases (Negativ-Differenz, Berechtigter verdient mehr, KU-Toggle,
 * Input-Clamp). Tolerance 0,01 € (Lib rundet `berechnet` auf volle €).
 *
 * Ausführen: npx tsx scripts/verify-ehegattenunterhalt.ts
 */

import {
  berechneEhegattenunterhalt,
  QUOTE_BUNDESWEIT,
  QUOTE_SUEDDEUTSCH,
  SELBSTBEHALT_ERWERBSTAETIG,
  SELBSTBEHALT_NICHT_ERWERBSTAETIG,
} from '../lib/berechnungen/ehegattenunterhalt';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number;
};

const cases: TestCase[] = [];

const calc = (params: {
  n1: number;
  n2?: number;
  ku?: number;
  kuB?: boolean;
  erwt?: boolean;
  meth?: 'bundesweit' | 'sueddeutsch';
}) => berechneEhegattenunterhalt({
  netto1: params.n1,
  netto2: params.n2 ?? 0,
  kindesunterhalt: params.ku ?? 0,
  kuBeruecksichtigt: params.kuB ?? false,
  pflichtigerErwerbstaetig: params.erwt ?? true,
  methode: params.meth ?? 'bundesweit',
});

// === Cluster A: Konstanten gegen DT 2026 + BGH-Standard + Süd-OLG ===

cases.push(
  { name: 'A-01 QUOTE_BUNDESWEIT = 3/7 (BGH-Standard)',                  actual: QUOTE_BUNDESWEIT,                expected: 3 / 7, tolerance: 0.0001 },
  { name: 'A-02 QUOTE_SUEDDEUTSCH = 0,45 (Süd-OLG-Leitlinien)',          actual: QUOTE_SUEDDEUTSCH,               expected: 0.45,  tolerance: 0.0001 },
  { name: 'A-03 SELBSTBEHALT_ERWERBSTAETIG = 1.600 € (DT 2026)',         actual: SELBSTBEHALT_ERWERBSTAETIG,      expected: 1600,  tolerance: 0 },
  { name: 'A-04 SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1.475 € (DT 2026)',   actual: SELBSTBEHALT_NICHT_ERWERBSTAETIG, expected: 1475,  tolerance: 0 },
);

// === Cluster B: 3/7-Methode bundesweit (BGH-Standard) ===
//
// Manuell:
//   n1=3500, n2=1200, ku=0, erwt=true, bundesweit:
//     differenz = 2300; berechnet = round(2300 × 3/7) = round(985,714) = 986
//     max = 3500 − 1600 = 1900; unterhalt = min(986, 1900) = 986
//     rest1 = 2514; gesamt2 = 2186; gekappt = false
//   n1=2500, n2=800: differenz=1700, berechnet=round(728,571)=729
//   n1=4000, n2=2000: differenz=2000, berechnet=round(857,143)=857
//   n1=3500, n2=1200, ku=400 (NICHT berücksichtigt):
//     bereinigt1 = 3100; differenz = 1900; berechnet = round(814,286) = 814

const b1 = calc({ n1: 3500, n2: 1200 });
cases.push(
  { name: 'B-01 3500/1200 bundesweit erwt: bereinigt1 = 3500',  actual: b1.bereinigt1, expected: 3500 },
  { name: 'B-01: differenz = 2300',                              actual: b1.differenz,  expected: 2300 },
  { name: 'B-01: berechnet = 986 (3/7 × 2300)',                  actual: b1.berechnet,  expected: 986 },
  { name: 'B-01: unterhalt = 986 (kein gekappt)',                actual: b1.unterhalt,  expected: 986 },
  { name: 'B-01: rest1 = 2514',                                  actual: b1.rest1,      expected: 2514 },
  { name: 'B-01: gesamt2 = 2186',                                actual: b1.gesamt2,    expected: 2186 },
  { name: 'B-01: gekappt = false',                               actual: b1.gekappt ? 1 : 0, expected: 0 },
);

const b2 = calc({ n1: 2500, n2: 800 });
cases.push(
  { name: 'B-02 2500/800 bundesweit: berechnet = 729',           actual: b2.berechnet, expected: 729 },
  { name: 'B-02: unterhalt = 729',                                actual: b2.unterhalt, expected: 729 },
);

const b3 = calc({ n1: 4000, n2: 2000 });
cases.push(
  { name: 'B-03 4000/2000 bundesweit: berechnet = 857',          actual: b3.berechnet, expected: 857 },
);

const b4 = calc({ n1: 3500, n2: 1200, ku: 400, kuB: false });
cases.push(
  { name: 'B-04 3500/1200 mit KU=400 (Vorabzug): bereinigt1 = 3100', actual: b4.bereinigt1, expected: 3100 },
  { name: 'B-04: differenz = 1900',                              actual: b4.differenz, expected: 1900 },
  { name: 'B-04: berechnet = 814 (3/7 × 1900)',                  actual: b4.berechnet, expected: 814 },
);

const b5 = calc({ n1: 3500, n2: 1200, ku: 400, kuB: true });
cases.push(
  { name: 'B-05 KU bereits berücksichtigt: ku = 0',              actual: b5.ku,        expected: 0 },
  { name: 'B-05: bereinigt1 = 3500 (kein Vorabzug)',             actual: b5.bereinigt1, expected: 3500 },
  { name: 'B-05: berechnet = 986 (gleich wie B-01)',             actual: b5.berechnet, expected: 986 },
);

// === Cluster C: Süd-OLG-Toggle 0,45 ===
//
// Manuell:
//   n1=3500, n2=1200, sueddeutsch: differenz=2300; berechnet=round(2300 × 0,45)=round(1035)=1035
//   n1=2500, n2=800,  sueddeutsch: differenz=1700; berechnet=round(1700 × 0,45)=round(765)=765
//   n1=4000, n2=2000, sueddeutsch: differenz=2000; berechnet=round(2000 × 0,45)=round(900)=900

const c1 = calc({ n1: 3500, n2: 1200, meth: 'sueddeutsch' });
cases.push(
  { name: 'C-01 3500/1200 süddeutsch: berechnet = 1035',         actual: c1.berechnet, expected: 1035 },
  { name: 'C-01: quote = 0,45',                                  actual: c1.quote,     expected: 0.45, tolerance: 0.0001 },
  { name: 'C-01: süddeutsch > bundesweit (1035 > 986)',          actual: c1.berechnet > b1.berechnet ? 1 : 0, expected: 1 },
);

const c2 = calc({ n1: 2500, n2: 800, meth: 'sueddeutsch' });
cases.push(
  { name: 'C-02 2500/800 süddeutsch: berechnet = 765',           actual: c2.berechnet, expected: 765 },
);

const c3 = calc({ n1: 4000, n2: 2000, meth: 'sueddeutsch' });
cases.push(
  { name: 'C-03 4000/2000 süddeutsch: berechnet = 900',          actual: c3.berechnet, expected: 900 },
);

// === Cluster D: Selbstbehalt-Klemme ===
//
// n1=2000, n2=0, erwt=true: differenz=2000; berechnet=round(2000 × 3/7)=round(857,143)=857
//   max = 2000 − 1600 = 400; unterhalt = min(857, 400) = 400 (gekappt)
// n1=2000, n2=0, erwt=false (SB 1475): max = 525; unterhalt = min(857, 525) = 525 (gekappt)
// n1=1700, n2=0: max = 100; unterhalt = min(729, 100) = 100 (gekappt)
// n1=1500, n2=0, erwt=true: max = max(0, -100) = 0; unterhalt = 0 (gekappt)
// n1=1600, n2=0, erwt=true (genau auf SB): max = 0; unterhalt = 0 (gekappt)

const d1 = calc({ n1: 2000, n2: 0, erwt: true });
cases.push(
  { name: 'D-01 2000/0 erwt: berechnet=857, max=400, unterhalt=400 (gekappt)', actual: d1.unterhalt,  expected: 400 },
  { name: 'D-01: gekappt = true',                                actual: d1.gekappt ? 1 : 0, expected: 1 },
  { name: 'D-01: selbstbehalt = 1600 (erwerbstätig)',            actual: d1.selbstbehalt, expected: 1600 },
);

const d2 = calc({ n1: 2000, n2: 0, erwt: false });
cases.push(
  { name: 'D-02 2000/0 NICHT erwt: max = 525, unterhalt = 525 (gekappt)', actual: d2.unterhalt, expected: 525 },
  { name: 'D-02: selbstbehalt = 1475 (nicht erwerbstätig)',      actual: d2.selbstbehalt, expected: 1475 },
);

const d3 = calc({ n1: 1700, n2: 0, erwt: true });
cases.push(
  { name: 'D-03 1700/0 erwt: max=100, unterhalt=100 (gekappt)',  actual: d3.unterhalt, expected: 100 },
);

const d4 = calc({ n1: 1500, n2: 0, erwt: true });
cases.push(
  { name: 'D-04 1500/0 erwt (unter SB): max=0, unterhalt=0',     actual: d4.unterhalt, expected: 0 },
  { name: 'D-04: gekappt = true (berechnet > 0)',                actual: d4.gekappt ? 1 : 0, expected: 1 },
);

const d5 = calc({ n1: 1600, n2: 0, erwt: true });
cases.push(
  { name: 'D-05 1600/0 erwt (genau SB): max=0, unterhalt=0',     actual: d5.unterhalt, expected: 0 },
);

// === Cluster E: Edge-Cases ===
//
// n1=2000, n2=2000: differenz=0, berechnet=0, unterhalt=0, gekappt=false (0 not > 400)
// n1=1500, n2=2500 (Berechtigter mehr): differenz=-1000, berechnet=0, unterhalt=0
// n1=0, n2=0: alle 0
// n1=-100: clamp auf 0
// KU=400, kuB=true: ku=0
// Negativ-KU: max(0, ku) = 0

const e1 = calc({ n1: 2000, n2: 2000 });
cases.push(
  { name: 'E-01 gleicher Verdienst: differenz=0, unterhalt=0',   actual: e1.unterhalt, expected: 0 },
  { name: 'E-01: gekappt = false (0 nicht > 400 max)',            actual: e1.gekappt ? 1 : 0, expected: 0 },
);

const e2 = calc({ n1: 1500, n2: 2500 });
cases.push(
  { name: 'E-02 Berechtigter verdient mehr: berechnet = 0',      actual: e2.berechnet, expected: 0 },
  { name: 'E-02: differenz = -1000',                              actual: e2.differenz, expected: -1000 },
  { name: 'E-02: unterhalt = 0',                                  actual: e2.unterhalt, expected: 0 },
);

const e3 = calc({ n1: 0, n2: 0 });
cases.push(
  { name: 'E-03 Beide Null-Einkommen: bereinigt1 = 0',           actual: e3.bereinigt1, expected: 0 },
  { name: 'E-03: unterhalt = 0',                                  actual: e3.unterhalt,  expected: 0 },
);

const e4 = calc({ n1: -100, n2: 200 });
cases.push(
  { name: 'E-04 n1 negativ → clamp 0: n1 = 0',                   actual: e4.n1,          expected: 0 },
  { name: 'E-04: bereinigt1 = 0 (auch nach clamp)',              actual: e4.bereinigt1,  expected: 0 },
);

const e5 = calc({ n1: 3000, n2: 1000, ku: -50 });
cases.push(
  { name: 'E-05 KU negativ → max(0, ku) = 0',                    actual: e5.ku,          expected: 0 },
);

// === Cluster F: Strukturelle Invarianten ===

const f1 = calc({ n1: 3500, n2: 1200 });
cases.push(
  { name: 'F-01 rest1 + unterhalt = bereinigt1',                 actual: f1.rest1 + f1.unterhalt, expected: f1.bereinigt1 },
  { name: 'F-02 gesamt2 = n2 + unterhalt',                       actual: f1.gesamt2,              expected: f1.n2 + f1.unterhalt },
  { name: 'F-03 quote bundesweit matches QUOTE_BUNDESWEIT',      actual: f1.quote,                expected: QUOTE_BUNDESWEIT, tolerance: 0.0001 },
);

const f2 = calc({ n1: 3500, n2: 1200, meth: 'sueddeutsch' });
cases.push(
  { name: 'F-04 quote süddeutsch matches QUOTE_SUEDDEUTSCH',     actual: f2.quote,                expected: QUOTE_SUEDDEUTSCH, tolerance: 0.0001 },
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
