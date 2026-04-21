// Phase-P1-Verifikation BAföG nach 29. BAföG-ÄndG 2024.
// Ausführen: npx tsx scripts/verify-bafoeg-p1.ts

import { berechneBafoeg, type BafoegEingabe } from '../lib/berechnungen/bafoeg';

interface Fall {
  name: string;
  input: BafoegEingabe;
  expectedBafoeg: number;
  tol?: number; // €/Monat, default 2
}

// Basis-Eingabe für Testfälle
const baseInput: BafoegEingabe = {
  ausbildung: 'studium',
  wohnsituation: 'eigene',
  eigenesEinkommen: 0,
  eigenesVermoegen: 0,
  familienstand: 'elternunabhaengig',
  einkommenEltern1: 0,
  einkommenEltern2: 0,
  geschwisterInAusbildung: 0,
  selbstVersichert: false,
  hatKinder: false,
  anzahlKinder: 0,
};

const cases: Fall[] = [
  // BA-MAX: Voller Höchstsatz für Waise, auswärts, selbstversichert
  {
    name: 'BA-MAX: Höchstsatz Studium auswärts selbstvers.',
    input: { ...baseInput, selbstVersichert: true },
    expectedBafoeg: 992,
    tol: 1,
  },
  // BA-03: elternunabhängig, familienversichert
  {
    name: 'BA-03: elternunabhängig, familienvers.',
    input: { ...baseInput, selbstVersichert: false },
    expectedBafoeg: 855,
    tol: 1,
  },
  // Bei Eltern wohnen, familienvers.
  {
    name: 'Studium bei Eltern, familienvers.',
    input: { ...baseInput, wohnsituation: 'eltern', selbstVersichert: false },
    expectedBafoeg: 534,
    tol: 1,
  },
  // Bei Eltern wohnen, selbstvers.
  {
    name: 'Studium bei Eltern, selbstvers.',
    input: { ...baseInput, wohnsituation: 'eltern', selbstVersichert: true },
    expectedBafoeg: 534 + 102 + 35,
    tol: 1,
  },
  // Schüler bei Eltern, unverändert
  {
    name: 'Schule bei Eltern, familienvers.',
    input: { ...baseInput, ausbildung: 'schule', wohnsituation: 'eltern' },
    expectedBafoeg: 262,
    tol: 1,
  },
];

let passed = 0;
let failed = 0;

console.log('=== Verify BAföG P1 (Stufe-4b Prompt 120) ===\n');
for (const c of cases) {
  const r = berechneBafoeg(c.input);
  const ist = r?.bafoegMonat ?? 0;
  const delta = Math.abs(ist - c.expectedBafoeg);
  const tol = c.tol ?? 2;
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(`  ${status} ${c.name.padEnd(46)} ist ${ist.toFixed(0).padStart(6)} € / soll ${String(c.expectedBafoeg).padStart(6)} € / Δ ${delta.toFixed(0).padStart(4)}`);
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
