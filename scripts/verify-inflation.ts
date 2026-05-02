/**
 * Verify-Script für lib/berechnungen/inflation.ts (Welle-4 M1c, 03.05.2026).
 *
 * Konsum-Trace-Befund (Phase A): InflationsRechner.tsx importiert
 * `berechneInflation` aus inflation.ts — eine eigenständige Compound-Inflation-
 * Lib mit user-supplied Inflationsrate. KEINE Konsumption von vpi.ts (anders
 * als in der Pre-Scoping-Annahme). Damit ist inflation.ts eigene Verify-
 * Coverage-Lücke (S2-Variant), unabhängig von der vpi.ts-Verifikation
 * via verify-zugewinnausgleich.ts.
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - Compound Inflation Standard-Formel (mathematisch):
 *     Endwert  = Anfangswert × (1 + r)^n           (Modus 'preisanstieg')
 *     Realwert = Anfangswert / (1 + r)^n           (Modus 'kaufkraft')
 *   - Bundesbank-Glossar zu „Realwert" / „Kaufkraft":
 *     https://www.bundesbank.de/de/service/glossar
 *   - Destatis-Methodenpapier zur VPI-Berechnung (ergänzend, nicht
 *     direkt durch inflation.ts konsumiert).
 *
 * Test-Strategie:
 *   - Manuelle Compound-Inflation-Berechnung mit voller Präzision,
 *     Tolerance 0,01 € (Cent-Rundung der Lib).
 *   - Round-Trip-Identität (preisanstieg→kaufkraft).
 *   - Differenz-Mathematik (ergebnis − ausgangswert).
 *   - Edge: Identität bei 0 % oder ohne Zeitraum, Null-Rückgaben bei
 *     unzulässigen Inputs.
 *
 * L-33-Disziplin (TestCase-Helper-Type für Mixed-Type-Tests, aus M1b):
 * Variant (a) — null als first-class actual/expected mit null-aware-Vergleich.
 *
 * Ausführen: npx tsx scripts/verify-inflation.ts
 */

import {
  berechneInflation,
  type InflationsErgebnis,
} from '../lib/berechnungen/inflation';

type Numeric = number | null;
type TestCase = {
  name: string;
  actual: Numeric;
  expected: Numeric;
  tolerance?: number; // Default 0.01
};

const cases: TestCase[] = [];

const calc = (
  modus: 'kaufkraft' | 'preisanstieg',
  betrag: number,
  rate: number,
  jahre: number,
): InflationsErgebnis | null => berechneInflation({ modus, betrag, inflationsrate: rate, zeitraum: jahre });

// === Cluster A: Modus 'kaufkraft' — Realwert = Betrag / (1 + r)^n ===
//
// Manuell mit voller Math.pow-Präzision:
//   1000 € @ 2 % über 10 J: 1000 / 1,02^10 = 1000 / 1,21899441999...   = 820,3483...   → 820,35
//   100  € @ 5 % über 1 J : 100 / 1,05                                = 95,238095...  → 95,24
//   1000 € @ 3 % über 20 J: 1000 / 1,03^20 = 1000 / 1,80611123466...  = 553,6757...   → 553,68
//   5000 € @ 2 % über 50 J: 5000 / 1,02^50 = 5000 / 2,69158802907...  = 1857,6430...  → 1857,64
//   1000 € @ 0 % über 10 J: 1000 / 1                                  = 1000,00 (Identität)

const a1 = calc('kaufkraft', 1000, 2, 10);
cases.push(
  { name: 'A-01 Kaufkraft 1000 € @ 2 %, 10 J: ergebnis',  actual: a1!.ergebnis,        expected: 820.35 },
  { name: 'A-01 Kaufkraft: ausgangswert',                 actual: a1!.ausgangswert,    expected: 1000 },
  { name: 'A-01 Kaufkraft: differenz',                    actual: a1!.differenz,       expected: 179.65 },
);

const a2 = calc('kaufkraft', 100, 5, 1);
cases.push(
  { name: 'A-02 Kaufkraft 100 € @ 5 %, 1 J: ergebnis',    actual: a2!.ergebnis, expected: 95.24 },
);

const a3 = calc('kaufkraft', 1000, 3, 20);
cases.push(
  { name: 'A-03 Kaufkraft 1000 € @ 3 %, 20 J: ergebnis',  actual: a3!.ergebnis, expected: 553.68 },
);

const a4 = calc('kaufkraft', 5000, 2, 50);
cases.push(
  { name: 'A-04 Kaufkraft 5000 € @ 2 %, 50 J: ergebnis',  actual: a4!.ergebnis, expected: 1857.64 },
);

const a5 = calc('kaufkraft', 1000, 0, 10);
cases.push(
  { name: 'A-05 Kaufkraft @ 0 %, 10 J: Identität',        actual: a5!.ergebnis,  expected: 1000 },
  { name: 'A-05 Kaufkraft @ 0 %: differenz = 0',          actual: a5!.differenz, expected: 0 },
);

// === Cluster B: Modus 'preisanstieg' — Endpreis = Betrag × (1 + r)^n ===
//
//   100 € @ 2 % über 10 J: 100 × 1,02^10 = 121,8994...  → 121,90
//   100 € @ 5 % über 1 J : 100 × 1,05    = 105,00
//   1000 € @ 3 % über 20 J: 1000 × 1,80611... = 1806,11
//   100 € @ 2 % über 50 J: 100 × 2,69158... = 269,16
//   100 € @ 0 % über 10 J: 100 × 1 = 100 (Identität)

const b1 = calc('preisanstieg', 100, 2, 10);
cases.push(
  { name: 'B-01 Preisanstieg 100 € @ 2 %, 10 J: ergebnis', actual: b1!.ergebnis,  expected: 121.90 },
  { name: 'B-01 Preisanstieg: differenz',                  actual: b1!.differenz, expected: 21.90 },
);

const b2 = calc('preisanstieg', 100, 5, 1);
cases.push(
  { name: 'B-02 Preisanstieg 100 € @ 5 %, 1 J: ergebnis',  actual: b2!.ergebnis, expected: 105 },
);

const b3 = calc('preisanstieg', 1000, 3, 20);
cases.push(
  { name: 'B-03 Preisanstieg 1000 € @ 3 %, 20 J: ergebnis', actual: b3!.ergebnis, expected: 1806.11 },
);

const b4 = calc('preisanstieg', 100, 2, 50);
cases.push(
  { name: 'B-04 Preisanstieg 100 € @ 2 %, 50 J: ergebnis', actual: b4!.ergebnis, expected: 269.16 },
);

const b5 = calc('preisanstieg', 100, 0, 10);
cases.push(
  { name: 'B-05 Preisanstieg @ 0 %, 10 J: Identität',      actual: b5!.ergebnis, expected: 100 },
);

// === Cluster C: Round-Trip-Identität ===
//
// Erst Preisanstieg (1000 → 1218,99), dann Kaufkraft auf den Endwert
// zurück (1218,99 / 1,02^10) ≈ 1000,00 (mit Rundungstoleranz).

const cRound = calc('preisanstieg', 1000, 2, 10);
const cBack  = calc('kaufkraft', cRound!.ergebnis, 2, 10);
cases.push(
  { name: 'C-01 Round-Trip 1000 € → preisanstieg → kaufkraft ≈ 1000', actual: cBack!.ergebnis, expected: 1000, tolerance: 0.02 },
);

// === Cluster D: Jahres-Tabelle (Compound jährlich) ===
//
// 100 € preisanstieg @ 5 % über 3 J:
//   Jahr 1: 100 × 1,05      = 105
//   Jahr 2: 100 × 1,05^2    = 110,25
//   Jahr 3: 100 × 1,05^3    = 115,7625 → 115,76

const d1 = calc('preisanstieg', 100, 5, 3);
cases.push(
  { name: 'D-01 Jahre[0].wert (Jahr 1)',  actual: d1!.jahre[0].wert, expected: 105 },
  { name: 'D-01 Jahre[1].wert (Jahr 2)',  actual: d1!.jahre[1].wert, expected: 110.25 },
  { name: 'D-01 Jahre[2].wert (Jahr 3)',  actual: d1!.jahre[2].wert, expected: 115.76 },
  { name: 'D-01 Jahre.length = 3',        actual: d1!.jahre.length,  expected: 3, tolerance: 0 },
);

// 1000 € kaufkraft @ 2 % über 5 J:
//   Jahr 1: 1000 / 1,02       = 980,3921... → 980,39
//   Jahr 5: 1000 / 1,02^5     = 1000 / 1,10408... = 905,7308... → 905,73

const d2 = calc('kaufkraft', 1000, 2, 5);
cases.push(
  { name: 'D-02 Kaufkraft Jahre[0].wert',  actual: d2!.jahre[0].wert, expected: 980.39 },
  { name: 'D-02 Kaufkraft Jahre[4].wert',  actual: d2!.jahre[4].wert, expected: 905.73 },
);

// === Cluster E: Edge-Cases mit Null-Rückgaben ===
//
// Lib akzeptiert nur: betrag > 0 && rate >= 0 && 0 < zeitraum <= 100.
// L-33-Disziplin: TestCase-Type erlaubt nur number | null als actual; für
// Object-vs-null-Vergleiche nutzen wir den Boolean-Wrapper-Pattern (Variant b
// aus L-33) via `isNull`-Helper — einfacher als Object-Typen in den
// TestCase-Type zu schmuggeln.

const isNull = (v: unknown): number => v === null ? 1 : 0;

cases.push(
  { name: 'E-01 betrag = 0 → null',                actual: isNull(calc('kaufkraft', 0, 2, 10)),       expected: 1 },
  { name: 'E-02 betrag negativ → null',            actual: isNull(calc('kaufkraft', -100, 2, 10)),    expected: 1 },
  { name: 'E-03 rate negativ (Deflation) → null',  actual: isNull(calc('kaufkraft', 1000, -1, 10)),   expected: 1 },
  { name: 'E-04 zeitraum = 0 → null',              actual: isNull(calc('kaufkraft', 1000, 2, 0)),     expected: 1 },
  { name: 'E-05 zeitraum negativ → null',          actual: isNull(calc('kaufkraft', 1000, 2, -5)),    expected: 1 },
  { name: 'E-06 zeitraum > 100 → null',            actual: isNull(calc('kaufkraft', 1000, 2, 101)),   expected: 1 },
  { name: 'E-07 zeitraum = 100 → nicht null',      actual: isNull(calc('kaufkraft', 1000, 2, 100)),   expected: 0 },
);

// === Cluster F: jaehrlicherVerlust = differenz / zeitraum ===
//
// 1000 € kaufkraft @ 2 % über 10 J:
//   differenz = 179,65
//   jaehrlicherVerlust = 179,65 / 10 = 17,965 → 17,97 (Math.round(... × 100) / 100)

const f1 = calc('kaufkraft', 1000, 2, 10);
cases.push(
  { name: 'F-01 jaehrlicherVerlust 1000 € kaufkraft 2 %/10 J', actual: f1!.jaehrlicherVerlust, expected: 17.97 },
);

// === Cluster G: differenzProzent ===
//
// 100 € preisanstieg @ 2 % über 10 J: (21,90 / 100) × 100 = 21,9 % (mit 1 Dezimal)

const g1 = calc('preisanstieg', 100, 2, 10);
cases.push(
  { name: 'G-01 differenzProzent 100 € preisanstieg 2 %/10 J', actual: g1!.differenzProzent, expected: 21.9, tolerance: 0.05 },
);

// === Ausgabe (L-33 Variant a, null-aware Vergleich) ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (c.actual === null && c.expected === null) {
    ok = true;
  } else if (c.actual === null || c.expected === null) {
    ok = false;
  } else {
    const tol = c.tolerance ?? 0.01;
    ok = Math.abs(c.actual - c.expected) <= tol;
  }
  const status = ok ? '✓' : '✗';
  const actualStr = c.actual === null ? 'null' : String(c.actual);
  const expectedStr = c.expected === null ? 'null' : String(c.expected);
  console.log(
    `  ${status} ${c.name.padEnd(60)} ist ${actualStr.padStart(12)}  soll ${expectedStr.padStart(12)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
