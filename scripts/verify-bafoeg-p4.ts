// Phase-P4-Verifikation BAföG (Welle 187): Einkommensbegriff § 21, Freibeträge §§ 23, 25.
// Ausführen: npx tsx scripts/verify-bafoeg-p4.ts
//
// Anlass: Die Lib rechnete mit Elternfreibeträgen 2.415/1.605/730 € (vor dem 29. BAföGÄndG),
// einer Sozialpauschale von 21,6 % auf das Brutto, Einkommensteuer nach Grundtarif je Elternteil
// und einem eigenen Freibetrag von 330 € bei 22,5 % Pauschale.
//
// Primärquellen (gesetze-im-internet.de/baf_g, Stand: zuletzt geändert 16.04.2026):
//   § 21 Abs. 1 S. 1 und S. 3 Nr. 3: Einkommen = Summe der positiven Einkünfte (§ 2 Abs. 1, 2 EStG)
//     minus Einkommensteuer; Einkünfte aus Lohn = Brutto − 1.230 € (§ 9a S. 1 Nr. 1a EStG)
//   § 21 Abs. 2 S. 1 Nr. 1: Sozialpauschale „22,3 vom Hundert, höchstens jedoch … jährlich 17 200 Euro“
//   § 23 Abs. 1 S. 1 Nr. 1, Abs. 6: eigener Freibetrag 353 €, ab 01.01.2026 389 € (bafög.de: „Zum
//     1. Januar 2026 erhöht sich der Freibetrag auf 389 Euro monatlich“)
//   § 25 Abs. 1: 2.540 € (verheiratet) / 1.690 € (je Elternteil sonst); Abs. 3 Nr. 2: 770 € je Kind
//     ohne förderfähige Ausbildung; Abs. 4: anrechnungsfrei 50 % + 5 % je Kind nach Abs. 3
//   § 32a Abs. 1 und 5 EStG 2026 (Splitting)
//
// Die Einkommensteuer der Eltern ist eine Schätzung: zvE = Einkünfte − Vorsorgeaufwendungen
// (RV 9,3 %; KV 7,3 % + 1,45 % und PV 1,8 % bis zur BBG KV 69.750 €) − Sonderausgaben-Pauschbetrag
// 36 € je Person. Die Sollwerte unten rechnen das unabhängig mit dem § 32a-Polynom nach.

import { berechneBafoeg, type BafoegEingabe } from '../lib/berechnungen/bafoeg';
import {
  BAFOEG_AB_2024_08_01,
  BAFOEG_AB_2026_01_01,
  getAktuelleBafoegParameter,
} from '../lib/berechnungen/bafoeg-parameter';

interface Fall { name: string; actual: number; expected: number; tol?: number; quelle: string }
const cases: Fall[] = [];

// § 32a Abs. 1 EStG 2026, unabhängig ausgeschrieben
function est2026(zvE: number): number {
  const x = Math.floor(zvE);
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return Math.floor((914.51 * y + 1400) * y); }
  if (x <= 69878) { const z = (x - 17799) / 10000; return Math.floor((173.10 * z + 2397) * z + 1034.87); }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}
const splitting = (zvE: number) => 2 * est2026(Math.floor(zvE / 2));
const vorsorge = (b: number) => Math.max(
  Math.min(b, 101400) * 0.093 + Math.min(b, 69750) * (0.073 + 0.0145 + 0.018),
  Math.min(b * 0.12, 1900),
);
const r2 = (x: number) => Math.round(x * 100) / 100;
function elternEinkommenSoll(bruttos: number[], verheiratet: boolean): number {
  const b = bruttos.filter(x => x > 0);
  const eink = b.reduce((s, x) => s + Math.max(0, x - 1230), 0);
  const pausch = b.reduce((s, x) => s + Math.min(Math.max(0, x - 1230) * 0.223, 17200), 0);
  const zvE = Math.max(0, eink - b.reduce((s, x) => s + vorsorge(x), 0) - (verheiratet ? 72 : 36));
  const est = verheiratet ? splitting(zvE) : est2026(zvE);
  return r2((eink - pausch - est) / 12);
}

// --- SSOT gegen Gesetzestext ---
const P = BAFOEG_AB_2024_08_01;
cases.push(
  { name: 'Elternfreibetrag verheiratet = 2.540',        actual: P.freibetraege.elternVerheiratet,   expected: 2540, quelle: '§ 25 Abs. 1 Nr. 1 BAföG' },
  { name: 'Elternfreibetrag je Elternteil sonst = 1.690', actual: P.freibetraege.elternAlleinstehend, expected: 1690, quelle: '§ 25 Abs. 1 Nr. 2 BAföG' },
  { name: 'Freibetrag je Kind ohne förderf. Ausb. = 770', actual: P.freibetraege.proGeschwister,      expected: 770,  quelle: '§ 25 Abs. 3 Nr. 2 BAföG' },
  { name: 'Sozialpauschale Eltern = 22,3 %',              actual: P.svPauschalen.eltern,              expected: 0.223, tol: 0.0001, quelle: '§ 21 Abs. 2 S. 1 Nr. 1 BAföG' },
  { name: 'Sozialpauschale Auszubildende = 22,3 %',       actual: P.svPauschalen.eigen,               expected: 0.223, tol: 0.0001, quelle: '§ 21 Abs. 2 S. 1 Nr. 1 BAföG' },
  { name: 'Höchstbetrag Sozialpauschale = 17.200 €/Jahr', actual: P.svPauschalen.hoechstbetragJahr,   expected: 17200, quelle: '§ 21 Abs. 2 S. 1 Nr. 1 BAföG' },
  { name: 'Eigener Freibetrag bis 31.12.2025 = 353',      actual: P.freibetraege.eigenesEinkommen,    expected: 353,  quelle: '§ 23 Abs. 1 S. 1 Nr. 1 BAföG' },
  { name: 'Eigener Freibetrag ab 01.01.2026 = 389',       actual: BAFOEG_AB_2026_01_01.freibetraege.eigenesEinkommen, expected: 389, quelle: '§ 23 Abs. 6 BAföG, BGBl. 2025 I Nr. 279' },
  { name: 'Stichtag 15.12.2025 → Freibetrag 353',         actual: getAktuelleBafoegParameter(new Date('2025-12-15')).freibetraege.eigenesEinkommen, expected: 353, quelle: 'Stichtag-Switch' },
  { name: 'Stichtag 20.10.2026 → Freibetrag 389',         actual: getAktuelleBafoegParameter(new Date('2026-10-20')).freibetraege.eigenesEinkommen, expected: 389, quelle: 'Stichtag-Switch' },
  // Minijob-Grenze 603 € bleibt anrechnungsfrei: (603 − 102,50) × 0,777 = 388,89 ≤ 389
  { name: 'Minijob 603 €: (603 − 102,50) × 0,777 ≤ 389',  actual: (603 - 102.5) * 0.777 <= 389 ? 1 : 0, expected: 1, quelle: '§ 23 Abs. 6 BAföG (Konstruktion)' },
);

const base: BafoegEingabe = {
  ausbildung: 'studium', wohnsituation: 'eigene',
  eigenesEinkommen: 0, eigenesVermoegen: 0,
  familienstand: 'verheiratet',
  einkommenEltern1: 0, einkommenEltern2: 0,
  geschwisterInAusbildung: 0,
  selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
};
const B = (o: Partial<BafoegEingabe>) => berechneBafoeg({ ...base, ...o })!;

// --- Seitenbeispiel: verheiratet, 60.000 € ein Verdiener, selbst versichert ---
// Einkünfte 58.770; Pauschale 13.105,71; Vorsorge 5.580 + 5.250 + 1.080 = 11.910; zvE 46.788;
// ESt Splitting 2 × ESt(23.394) = 4.860; Einkommen (58.770 − 13.105,71 − 4.860) ÷ 12 = 3.400,36;
// Anrechnung (3.400,36 − 2.540) × 50 % = 430,18; BAföG 992 − 430,18 = 561,82
const b60 = B({ einkommenEltern1: 60000 });
cases.push(
  { name: '60k: ESt Splitting auf zvE 46.788 = 4.860',  actual: splitting(46788), expected: 4860, quelle: '§ 32a Abs. 1, 5 EStG 2026' },
  { name: '60k: Einkommen nach § 21 = 3.400,36',        actual: b60.nettoEltern, expected: elternEinkommenSoll([60000], true), tol: 0.01, quelle: '§ 21 BAföG' },
  { name: '60k: Einkommen = 3.400,36 (Handrechnung)',   actual: elternEinkommenSoll([60000], true), expected: 3400.36, tol: 0.01, quelle: 'Handrechnung' },
  { name: '60k: Anrechnung Eltern = 430,18',             actual: b60.anrechnungEltern, expected: 430.18, tol: 0.01, quelle: '§ 25 Abs. 1, 4 BAföG' },
  { name: '60k: BAföG = 561,82',                         actual: b60.bafoegMonat, expected: 561.82, tol: 0.01, quelle: '992 − 430,18' },
);

// --- 50.000 € / 75.000 € ein Verdiener (Caption-Beispiel, familienversichert) ---
const b50 = B({ einkommenEltern1: 50000, selbstVersichert: false });
const b75 = B({ einkommenEltern1: 75000, selbstVersichert: false });
cases.push(
  { name: '50k: Einkommen = 2.921,36',                   actual: b50.nettoEltern, expected: elternEinkommenSoll([50000], true), tol: 0.01, quelle: '§ 21 BAföG' },
  { name: '50k: Anrechnung = (2.921,36 − 2.540) × 50 %', actual: b50.anrechnungEltern, expected: r2((elternEinkommenSoll([50000], true) - 2540) * 0.5), tol: 0.01, quelle: '§ 25 BAföG' },
  { name: '50k familienvers.: BAföG = 664,32',           actual: b50.bafoegMonat, expected: 664.32, tol: 0.01, quelle: '855 − 190,68' },
  { name: '75k familienvers.: BAföG = 80,61',            actual: b75.bafoegMonat, expected: r2(855 - r2((elternEinkommenSoll([75000], true) - 2540) * 0.5)), tol: 0.01, quelle: '§§ 21, 25 BAföG' },
);

// --- Zwei Verdiener 40k + 20k: Splitting auf gemeinsames zvE 45.558 ---
const b4020 = B({ einkommenEltern1: 40000, einkommenEltern2: 20000 });
cases.push(
  { name: '40k+20k: Einkommen = 3.347,22',               actual: b4020.nettoEltern, expected: elternEinkommenSoll([40000, 20000], true), tol: 0.01, quelle: '§ 21 BAföG, Splitting' },
  { name: '40k+20k: Handrechnung 3.347,22',              actual: elternEinkommenSoll([40000, 20000], true), expected: 3347.22, tol: 0.01, quelle: 'Handrechnung' },
  { name: '40k+20k: Anrechnung = 403,61',                actual: b4020.anrechnungEltern, expected: 403.61, tol: 0.01, quelle: '(3.347,22 − 2.540) × 50 %' },
);

// --- Startwerte der Komponente: verheiratet, 40.000 € → unter Freibetrag ---
const start = B({ einkommenEltern1: 40000, selbstVersichert: false });
cases.push(
  { name: 'Start 40k: Einkommen 2.425,69 < 2.540',        actual: start.nettoEltern, expected: elternEinkommenSoll([40000], true), tol: 0.01, quelle: '§ 21 BAföG' },
  { name: 'Start 40k: BAföG = 855 (keine Anrechnung)',   actual: start.bafoegMonat, expected: 855, tol: 0.01, quelle: '§ 13 BAföG' },
);

// --- Alleinstehender Elternteil 40.000 € (Grundtarif, Freibetrag 1.690) ---
const getr = B({ familienstand: 'getrennt', einkommenEltern1: 40000, selbstVersichert: false });
cases.push(
  { name: 'Getrennt 40k: Einkommen (Grundtarif)',        actual: getr.nettoEltern, expected: elternEinkommenSoll([40000], false), tol: 0.01, quelle: '§ 21 BAföG, § 32a Abs. 1 EStG' },
  { name: 'Getrennt 40k: Anrechnung (… − 1.690) × 50 %', actual: getr.anrechnungEltern, expected: r2((elternEinkommenSoll([40000], false) - 1690) * 0.5), tol: 0.01, quelle: '§ 25 Abs. 1 Nr. 2 BAföG' },
);

// --- Ein weiteres Kind ohne förderfähige Ausbildung: Freibetrag + 770, Quote 45 % ---
const kind1 = B({ einkommenEltern1: 75000, geschwisterInAusbildung: 1 });
cases.push(
  { name: '75k + 1 Kind: Freibetrag 2.540 + 770 = 3.310',   actual: kind1.freibetragEltern, expected: 3310, quelle: '§ 25 Abs. 3 Nr. 2 BAföG' },
  { name: '75k + 1 Kind: Anrechnung (… − 3.310) × 45 %',     actual: kind1.anrechnungEltern, expected: r2((elternEinkommenSoll([75000], true) - 3310) * 0.45), tol: 0.01, quelle: '§ 25 Abs. 4 BAföG' },
);

// --- Höchstbetrag der Sozialpauschale (17.200 €) greift ab Einkünften von 77.130 € ---
const hoch = B({ einkommenEltern1: 120000 });
cases.push(
  { name: '120k: Pauschale gedeckelt auf 17.200 €',       actual: hoch.nettoEltern, expected: elternEinkommenSoll([120000], true), tol: 0.01, quelle: '§ 21 Abs. 2 S. 1 Nr. 1 BAföG' },
);

// --- Eigenes Einkommen (Stichtag heute ≥ 01.01.2026 → Freibetrag 389 €) ---
const E = (brutto: number) => B({ eigenesEinkommen: brutto }).anrechnungEinkommen;
cases.push(
  { name: 'Minijob 603 €: Anrechnung 0',                  actual: E(603), expected: 0, tol: 0.001, quelle: '(603 − 102,50) × 0,777 = 388,89 < 389' },
  { name: '700 €: (700 − 102,50) × 0,777 − 389 = 75,26',   actual: E(700), expected: r2((700 - 102.5) * 0.777 - 389), tol: 0.01, quelle: '§§ 21, 23 BAföG' },
  { name: '1.000 €: Anrechnung 308,36',                    actual: E(1000), expected: 308.36, tol: 0.01, quelle: '(1.000 − 102,50) × 0,777 − 389' },
);

let passed = 0, failed = 0;
console.log('=== Verify BAföG P4 (W187: §§ 21, 23, 25 BAföG) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(54)} ist ${c.actual.toFixed(2).padStart(10)} / soll ${c.expected.toFixed(2).padStart(10)} / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
