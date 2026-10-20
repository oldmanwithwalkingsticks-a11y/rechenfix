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
// W178: ohne Altersangabe gibt es keinen Versorgungsfreibetrag mehr. Die Regressionsfälle ER-01/02
// rechnen deshalb ausdrücklich mit einem Kind bis 5 Jahre (52.000 €, wie vorher als Vorgabe).
const erb = (wert: number, vw: any, vorsch = 0, alterKind?: number) =>
  berechneErbschaftsteuer({
    erwerbsart: 'erbschaft',
    wert,
    verwandtschaft: vw,
    vorschenkungen: vorsch,
    selbstgenutzteImmobilie: false,
    alterKind,
  }).steuerbetrag;

cases.push(
  { name: 'ER-01: Erbschaft 500k Kind (3 J.)',                    actual: erb(500_000,   'kind', 0, 3), expected: 3_360 },
  { name: 'ER-02a: Erbschaft 750k Kind (3 J., stpfl. 298k)',      actual: erb(750_000,   'kind', 0, 3), expected: 32_780 },
  // W187: § 10 Abs. 1 Satz 6 ErbStG rundet den steuerpflichtigen Erwerb auf volle 100 € ab: 300.001 → 300.000 → 11 % = 33.000
  // (vorher 33.001 über die Härtefallregel; den Härtefall selbst prüft „Kern: Kl. I @ 300.001 €“ weiter oben).
  { name: 'ER-02b: Erbschaft 752.001 Kind (3 J., stpfl. 300.000)',  actual: erb(752_001,   'kind', 0, 3), expected: 33_000, tolerance: 0 },
  { name: 'ER-03: Erbschaft 1,5M Ehepartner',                     actual: erb(1_500_000, 'ehepartner'), expected: 141_360 },
  { name: 'ER-05: Erbschaft 500k Kind ohne Alter → kein Vers.-FB', actual: erb(500_000,  'kind'),       expected: 11_000 },
  { name: 'ER-06: Erbschaft 700k Kind 26 J. → 10.300 € Vers.-FB',  actual: erb(700_000,  'kind', 0, 26), expected: 31_867 },
  { name: 'ER-07: Erbschaft 700k Kind 27 J. → kein Vers.-FB',      actual: erb(700_000,  'kind', 0, 27), expected: 33_000 },
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
  // W187: § 10 Abs. 1 S. 6 ErbStG — 300.001 € und 75.001 € werden auf 300.000 € bzw. 75.000 € abgerundet (vorher Härtefall 33.001 / 5.251 €).
  { name: 'SS-Abrundung: Schenkung 700.001 Kind → 300.000 × 11 %',  actual: sch(700_001, 'kind'),      expected: 33_000 },
  { name: 'SS-Abrundung: Schenkung 475.001 Kind → 75.000 × 7 %',    actual: sch(475_001, 'kind'),      expected: 5_250 },
  // Härteausgleich § 19 Abs. 3: 300.200 € → 33.000 + ½ × 200 = 33.100 €; 75.200 € → 5.250 + ½ × 200 = 5.350 €
  { name: 'SS-Härtefall: Schenkung 700.200 Kind',        actual: sch(700_200, 'kind'),      expected: 33_100 },
  { name: 'SS-Härtefall: Schenkung 475.200 Kind',        actual: sch(475_200, 'kind'),      expected: 5_350 },
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

// W187: Abrundung des steuerpflichtigen Erwerbs auf volle 100 € (§ 10 Abs. 1 Satz 6 ErbStG,
// https://www.gesetze-im-internet.de/erbstg_1974/__10.html). Seitenbefund: 700.050 € Kind bis 5 J.
// → 700.050 − 400.000 − 52.000 = 248.050 → 248.000 € × 11 % = 27.280 € (vorher 27.286 €).
const erbVoll = (wert: number, vw: any, vorsch = 0, alterKind?: number) =>
  berechneErbschaftsteuer({ erwerbsart: 'erbschaft', wert, verwandtschaft: vw, vorschenkungen: vorsch, selbstgenutzteImmobilie: false, alterKind });
cases.push(
  { name: 'R-01: 700.050 Kind (3 J.) → stpfl. 248.000 €',        actual: erbVoll(700_050, 'kind', 0, 3).steuerpflichtigerErwerb, expected: 248_000, tolerance: 0 },
  { name: 'R-02: 700.050 Kind (3 J.) → 27.280 €',                  actual: erbVoll(700_050, 'kind', 0, 3).steuerbetrag, expected: 27_280, tolerance: 0 },
  { name: 'R-03: Seitenbeispiel 700.000 Kind (3 J.) → 27.280 €',   actual: erbVoll(700_000, 'kind', 0, 3).steuerbetrag, expected: 27_280, tolerance: 0 },
  { name: 'R-04: 120.099 Geschwister → stpfl. 100.000 €',          actual: erbVoll(120_099, 'geschwister').steuerpflichtigerErwerb, expected: 100_000, tolerance: 0 },
  { name: 'R-05: § 14 Kumulation 500.050 + 350.000 → 450.000 €',   actual: erbVoll(500_050, 'kind', 350_000).steuerpflichtigerErwerb, expected: 450_000, tolerance: 0 },
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
