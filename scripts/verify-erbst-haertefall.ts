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
  { name: 'SS-01: Schenkung 250k Enkel (Eltern leben)',  actual: sch(250_000, 'enkel-eltern-leben'), expected: 3_500 },
  { name: 'SS-Härtefall: Schenkung 700.001 Kind',        actual: sch(700_001, 'kind'),      expected: 33_001 },
  { name: 'SS-Härtefall: Schenkung 475.001 Kind',        actual: sch(475_001, 'kind'),      expected: 5_251 },
);

// --- Prompt 116 Neuzugänge (P2) ---

// ER-04: § 14 ErbStG-Kumulation (Erbschaft 500k Kind + Vorschenkung 350k)
// Erwartet: steuerGesamt 67.500 €, anrechenbar 67.500 × 350/850 ≈ 27.794 €,
// final 39.706 € (±1 € durch Ganzzahl-Rundung).
cases.push({
  name: 'ER-04: § 14 Kumulation Erb 500k + Vorsch 350k Kind',
  actual: erb(500_000, 'kind', 350_000),
  expected: 39_706,
  tolerance: 2,
});

// ER-03 Hausrat Kl. I: Erbschaft 50k Kind + Hausrat → FB 400k + 52k + 41k = 493k → 0 €
cases.push({
  name: 'ER-03: Hausrat Kl. I Erb 50k Kind',
  actual: berechneErbschaftsteuer({
    erwerbsart: 'erbschaft',
    wert: 50_000,
    verwandtschaft: 'kind',
    vorschenkungen: 0,
    selbstgenutzteImmobilie: false,
    hausratFreibetrag: true,
  }).steuerbetrag,
  expected: 0,
});

// SS-02: Enkel Eltern verstorben → FB 400k → 250k steuerfrei
cases.push({
  name: 'SS-02: Enkel Eltern verstorben 250k',
  actual: sch(250_000, 'enkel-eltern-tot'),
  expected: 0,
});

// SS-03: Hausrat Kl. II Geschwister 25k → FB 20k + 12k = 32k → 0 €
cases.push({
  name: 'SS-03: Hausrat Kl. II Geschwister 25k',
  actual: sch(25_000, 'geschwister', 0, true),
  expected: 0,
});

// Prompt 117 Item 3: Versorgungs-FB-Staffel § 17 Abs. 2 ErbStG.
// Erb 500k Kind mit Alter 8 → Versorgungs-FB 41k (statt 52k pauschal).
// stpfl = 500k - 400k persFB - 41k Versorgungs-FB = 59k → Zone 1 (bis 75k) I=7 % → 4.130 €
cases.push({
  name: 'Staffel: Erb 500k Kind Alter 8 → Versorgungs-FB 41k',
  actual: berechneErbschaftsteuer({
    erwerbsart: 'erbschaft',
    wert: 500_000,
    verwandtschaft: 'kind',
    vorschenkungen: 0,
    selbstgenutzteImmobilie: false,
    hausratFreibetrag: false,
    alterKind: 8,
  }).steuerbetrag,
  expected: 4_130,
});

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
