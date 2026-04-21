// Verifikation Prompt 115c — § 19 Abs. 3 ErbStG Härtefall-Regel
// Ausführen: npx tsx scripts/verify-erbst-haertefall.ts

import {
  berechneErbStMitHaertefall,
  berechneErbschaftsteuer,
  type Steuerklasse,
} from '../lib/berechnungen/erbschaftsteuer';
import { berechneSchenkungssteuer } from '../lib/berechnungen/schenkungssteuer';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number; // Default 1
};

const cases: TestCase[] = [];

// --- Härtefall-Kernfunktion ---
const kern = (stpfl: number, kl: Steuerklasse) =>
  berechneErbStMitHaertefall(stpfl, kl).steuerbetrag;

cases.push(
  { name: 'Kern: Kl. I @ 75.001 €',           actual: kern(75_001,  'I'),   expected: 5_251 },
  { name: 'Kern: Kl. I @ 300.001 € (ER-02)',  actual: kern(300_001, 'I'),   expected: 33_001 },
  { name: 'Kern: Kl. III @ 6.000.001 €',      actual: kern(6_000_001, 'III'), expected: 1_800_001 },
  { name: 'Kern: Kl. II @ 6.000.001 €',       actual: kern(6_000_001, 'II'),  expected: 1_800_001 },
);

// --- ErbSt-Regressions ---
const erb = (wert: number, vw: any, vorsch = 0) =>
  berechneErbschaftsteuer({
    erwerbsart: 'erbschaft',
    wert,
    verwandtschaft: vw,
    vorschenkungen: vorsch,
    selbstgenutzteImmobilie: false,
  }).steuerbetrag;

cases.push(
  { name: 'ER-01: Erbschaft 500k Kind',                           actual: erb(500_000,   'kind'),      expected: 3_360 },
  { name: 'ER-02a: Erbschaft 750k Kind (stpfl. 298k)',            actual: erb(750_000,   'kind'),      expected: 32_780 },
  { name: 'ER-02b: Erbschaft 752.001 Kind (stpfl. 300.001, HF)',  actual: erb(752_001,   'kind'),      expected: 33_001 },
  { name: 'ER-03: Erbschaft 1,5M Ehepartner',                     actual: erb(1_500_000, 'ehepartner'), expected: 141_360 },
);

// --- SchenkSt-Regressions ---
const sch = (wert: number, vw: any, genutzt = 0, hausrat = false) =>
  berechneSchenkungssteuer({
    schenkungswert: wert,
    verwandtschaft: vw,
    bereitsGenutzt: genutzt,
    hausratFreibetrag: hausrat,
  }).schenkungssteuer;

cases.push(
  { name: 'SS-01: Schenkung 250k Enkel (Eltern leben)',  actual: sch(250_000, 'enkelkind'), expected: 3_500 },
  { name: 'SS-Härtefall: Schenkung 700.001 Kind',        actual: sch(700_001, 'kind'),      expected: 33_001 },
  { name: 'SS-Härtefall: Schenkung 475.001 Kind',        actual: sch(475_001, 'kind'),      expected: 5_251 },
);

let passed = 0;
let failed = 0;
for (const c of cases) {
  const tol = c.tolerance ?? 1;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(
    `  ${status} ${c.name.padEnd(50)} ist ${String(c.actual).padStart(10)} € / soll ${String(c.expected).padStart(10)} € / Δ ${delta.toFixed(2).padStart(6)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
