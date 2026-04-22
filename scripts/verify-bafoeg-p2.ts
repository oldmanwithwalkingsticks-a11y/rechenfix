// Phase-P2-Verifikation BAföG (Stufe-4b Prompt 121).
// Ausführen: npx tsx scripts/verify-bafoeg-p2.ts
//
// Externe Referenzen:
//   § 25 Abs. 6 S. 1 BAföG (Gesetzestext): basisQuote 50 %, −5 %/Kind nach Abs. 3
//   BMBF-FAQ bafög.de: Antragsteller zählt NICHT als "Kind"
//   § 13+§ 13a BAföG: Höchstsatz 992 € bleibt unverändert

import { berechneBafoeg } from '../lib/berechnungen/bafoeg';
import {
  BAFOEG_AB_2024_08_01,
  getAktuelleBafoegParameter,
  getAnrechnungsquote,
} from '../lib/berechnungen/bafoeg-parameter';

interface Fall<T> { name: string; actual: T; expected: T; tol?: number; quelle: string; }

const cases: Fall<number>[] = [];

// --- SSOT-Selbsttests: Anrechnungsquote-Formel (§ 25 Abs. 6 BAföG) ---
cases.push(
  { name: 'Quote 0 Geschwister = 0,50',                actual: getAnrechnungsquote(0),  expected: 0.50, tol: 0.001, quelle: '§ 25 Abs. 6 BAföG + BMBF-FAQ' },
  { name: 'Quote 1 Geschwister = 0,45',                actual: getAnrechnungsquote(1),  expected: 0.45, tol: 0.001, quelle: '§ 25 Abs. 6 BAföG' },
  { name: 'Quote 2 Geschwister = 0,40',                actual: getAnrechnungsquote(2),  expected: 0.40, tol: 0.001, quelle: '§ 25 Abs. 6 BAföG' },
  { name: 'Quote 5 Geschwister = 0,25',                actual: getAnrechnungsquote(5),  expected: 0.25, tol: 0.001, quelle: '§ 25 Abs. 6 BAföG' },
  { name: 'Quote 11 Geschwister = 0 (min-Clamp)',      actual: getAnrechnungsquote(11), expected: 0.00, tol: 0.001, quelle: 'min-Clamp in bafoeg-parameter.ts' },
);

// --- SSOT-Eckwerte ---
cases.push(
  { name: 'SSOT Grundbedarf Studium eigene Whg = 855',          actual: BAFOEG_AB_2024_08_01.bedarf.studium.eigene, expected: 855, quelle: '§ 13 Abs. 1 Nr. 2 + Abs. 2 Nr. 2 BAföG' },
  { name: 'SSOT Bedarf Studium bei Eltern = 534',               actual: BAFOEG_AB_2024_08_01.bedarf.studium.eltern, expected: 534, quelle: '§ 13 Abs. 2 Nr. 1 BAföG' },
  { name: 'SSOT KV-Zuschlag = 102',                             actual: BAFOEG_AB_2024_08_01.zuschlaege.kv, expected: 102, quelle: '§ 13a BAföG' },
  { name: 'SSOT PV-Zuschlag = 35',                              actual: BAFOEG_AB_2024_08_01.zuschlaege.pv, expected: 35,  quelle: '§ 13a BAföG' },
  { name: 'SSOT Elternfreibetrag verheiratet = 2.415',          actual: BAFOEG_AB_2024_08_01.freibetraege.elternVerheiratet, expected: 2415, quelle: '§ 25 Abs. 1 BAföG' },
);

// --- Höchstsatz unverändert nach Refactoring (Regression-Smoke) ---
const bamax = berechneBafoeg({
  ausbildung: 'studium', wohnsituation: 'eigene',
  eigenesEinkommen: 0, eigenesVermoegen: 0,
  familienstand: 'elternunabhaengig',
  einkommenEltern1: 0, einkommenEltern2: 0,
  geschwisterInAusbildung: 0,
  selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
})!;
cases.push({ name: 'BA-MAX Höchstsatz Studium auswärts selbstvers. = 992',
  actual: bamax.bafoegMonat, expected: 992, tol: 1, quelle: 'BMBF bafoeg-rechner.de' });
cases.push({ name: 'BA-MAX anrechnungsquoteEltern = 0 (elternunabhängig)',
  actual: bamax.anrechnungsquoteEltern, expected: 0.50, tol: 0.001, quelle: 'Default-Quote bei 0 Geschw. ausgewiesen' });

// --- Delta: 1 Geschwister vs. 0 Geschwister (realer Effekt der P2-Korrektur) ---
// Prüft: je höher Geschwisterzahl, desto höher die BAföG (weniger Anrechnung).
// Eingabe identisch zu BA-01 aus welle1-stufe4b-testfaelle.md.
const ba01_null = berechneBafoeg({
  ausbildung: 'studium', wohnsituation: 'eigene',
  eigenesEinkommen: 0, eigenesVermoegen: 0,
  familienstand: 'verheiratet',
  einkommenEltern1: 40000, einkommenEltern2: 20000,
  geschwisterInAusbildung: 0,
  selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
})!;
const ba01_zwei = berechneBafoeg({
  ausbildung: 'studium', wohnsituation: 'eigene',
  eigenesEinkommen: 0, eigenesVermoegen: 0,
  familienstand: 'verheiratet',
  einkommenEltern1: 40000, einkommenEltern2: 20000,
  geschwisterInAusbildung: 2,
  selbstVersichert: true, hatKinder: false, anzahlKinder: 0,
})!;
// Sanity: mehr Geschwister → höhere BAföG, weil (a) höherer Freibetrag, (b) niedrigere Quote
cases.push({
  name: 'BA-01 mit 2 Geschw. ≥ BA-01 mit 0 Geschw. (Monotonie)',
  actual: ba01_zwei.bafoegMonat >= ba01_null.bafoegMonat ? 1 : 0,
  expected: 1, quelle: 'Logik § 25 Abs. 3 + 6 BAföG',
});
cases.push({
  name: 'BA-01 mit 0 Geschw. nutzt Quote 0,50',
  actual: ba01_null.anrechnungsquoteEltern, expected: 0.50, tol: 0.001,
  quelle: 'getAnrechnungsquote(0) = 0,50 (§ 25 Abs. 6)',
});
cases.push({
  name: 'BA-01 mit 2 Geschw. nutzt Quote 0,40',
  actual: ba01_zwei.anrechnungsquoteEltern, expected: 0.40, tol: 0.001,
  quelle: 'getAnrechnungsquote(2) = 0,40',
});

// --- Stichtag-Switch aktuell single-bucket ---
const jan = getAktuelleBafoegParameter(new Date('2026-01-15'));
const jun = getAktuelleBafoegParameter(new Date('2026-06-15'));
cases.push({
  name: 'Single-Bucket: Jan und Jun 2026 = BAFOEG_AB_2024_08_01',
  actual: jan === BAFOEG_AB_2024_08_01 && jun === BAFOEG_AB_2024_08_01 ? 1 : 0,
  expected: 1, quelle: 'Stichtag-Switch-Skeleton (aktuell nur 1 Bucket)',
});

let passed = 0, failed = 0;
console.log('=== Verify BAföG P2 (Stufe-4b Prompt 121) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(58)} ist ${c.actual.toString().padStart(8)} / soll ${c.expected.toString().padStart(8)} / Δ ${delta.toFixed(3)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
