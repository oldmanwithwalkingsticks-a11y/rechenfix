/**
 * Verify-Script für lib/berechnungen/herzfrequenz-zonen.ts (Welle-4 M1b, 03.05.2026).
 *
 * Sport-Kategorie-Erstaufnahme im Welle-4-Verify-Track.
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - Tanaka, Monahan, Seals (2001): "Age-predicted maximal heart rate
 *     revisited", J Am Coll Cardiol 37(1):153-6 — HRmax = 208 − 0,7 × Alter.
 *   - Fox, Naughton, Haskell (1971): klassische Faustformel HRmax = 220 − Alter
 *     (weniger genau, aber Standard-Referenz).
 *   - Karvonen, Kentala, Mustala (1957): "The effects of training on heart rate",
 *     Ann Med Exp Biol Fenn 35(3):307-15 — Reserveformel
 *     Ziel-HF = Ruhepuls + (HRmax − Ruhepuls) × Intensität.
 *
 * Test-Strategie: Manuell durchgerechnete HFmax/Zonen-Werte aus den Original-Formeln,
 * Tolerance 1 BPM (Rundungsspielraum bei Zonen-Grenzen, da die UI auf ganze BPM rundet).
 *
 * Ausführen: npx tsx scripts/verify-herzfrequenz-zonen.ts
 */

import {
  berechneHfMaxStandard,
  berechneHfMaxTanaka,
  berechneKarvonenZielHf,
  berechneHerzfrequenzZonen,
  ZONEN_ANTEILE,
} from '../lib/berechnungen/herzfrequenz-zonen';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number; // Default 1 BPM
};

const cases: TestCase[] = [];

// === Cluster A: Fox/Haskell-Formel (220 − Alter) ===
//
// Manuell: 220 - Alter = HFmax
//   20 J → 200; 30 → 190; 45 → 175; 60 → 160; 75 → 145

cases.push(
  { name: 'A-01 Standard 20 J', actual: berechneHfMaxStandard(20), expected: 200, tolerance: 0 },
  { name: 'A-02 Standard 30 J', actual: berechneHfMaxStandard(30), expected: 190, tolerance: 0 },
  { name: 'A-03 Standard 45 J', actual: berechneHfMaxStandard(45), expected: 175, tolerance: 0 },
  { name: 'A-04 Standard 60 J', actual: berechneHfMaxStandard(60), expected: 160, tolerance: 0 },
  { name: 'A-05 Standard 75 J', actual: berechneHfMaxStandard(75), expected: 145, tolerance: 0 },
);

// === Cluster B: Tanaka-Formel (208 − 0,7 × Alter) ===
//
// Manuell: 208 - 0,7 × Alter
//   20 → 208 - 14   = 194
//   30 → 208 - 21   = 187
//   45 → 208 - 31,5 = 176,5
//   60 → 208 - 42   = 166
//   75 → 208 - 52,5 = 155,5

cases.push(
  { name: 'B-01 Tanaka 20 J',   actual: berechneHfMaxTanaka(20), expected: 194,   tolerance: 0.001 },
  { name: 'B-02 Tanaka 30 J',   actual: berechneHfMaxTanaka(30), expected: 187,   tolerance: 0.001 },
  { name: 'B-03 Tanaka 45 J',   actual: berechneHfMaxTanaka(45), expected: 176.5, tolerance: 0.001 },
  { name: 'B-04 Tanaka 60 J',   actual: berechneHfMaxTanaka(60), expected: 166,   tolerance: 0.001 },
  { name: 'B-05 Tanaka 75 J',   actual: berechneHfMaxTanaka(75), expected: 155.5, tolerance: 0.001 },
);

// === Cluster C: Karvonen-Reserveformel ===
//
// Ziel-HF = Ruhepuls + (HRmax − Ruhepuls) × Intensität.
// Manuell:
//   RP=60, HRmax=190, Int=0,70 → 60 + 130 × 0,70 = 60 + 91 = 151
//   RP=60, HRmax=190, Int=0,80 → 60 + 130 × 0,80 = 60 + 104 = 164
//   RP=70, HRmax=180, Int=0,60 → 70 + 110 × 0,60 = 70 + 66 = 136
//   RP=50, HRmax=200, Int=0,90 → 50 + 150 × 0,90 = 50 + 135 = 185
//   RP=80, HRmax=160, Int=0,50 → 80 +  80 × 0,50 = 80 + 40 = 120

cases.push(
  { name: 'C-01 Karvonen RP60, HFmax190, 70%',  actual: berechneKarvonenZielHf(60, 190, 0.70), expected: 151, tolerance: 0.001 },
  { name: 'C-02 Karvonen RP60, HFmax190, 80%',  actual: berechneKarvonenZielHf(60, 190, 0.80), expected: 164, tolerance: 0.001 },
  { name: 'C-03 Karvonen RP70, HFmax180, 60%',  actual: berechneKarvonenZielHf(70, 180, 0.60), expected: 136, tolerance: 0.001 },
  { name: 'C-04 Karvonen RP50, HFmax200, 90%',  actual: berechneKarvonenZielHf(50, 200, 0.90), expected: 185, tolerance: 0.001 },
  { name: 'C-05 Karvonen RP80, HFmax160, 50%',  actual: berechneKarvonenZielHf(80, 160, 0.50), expected: 120, tolerance: 0.001 },
);

// === Cluster D: Zonen-Verteilung (HFmax-basiert, 30 J Tanaka → 187) ===
//
// HFmax = 187 (Tanaka 30 J)
//   Z1: 187 × 0,50 = 93,5    bis  187 × 0,60 = 112,2
//   Z2: 187 × 0,60 = 112,2   bis  187 × 0,70 = 130,9
//   Z3: 187 × 0,70 = 130,9   bis  187 × 0,80 = 149,6
//   Z4: 187 × 0,80 = 149,6   bis  187 × 0,90 = 168,3
//   Z5: 187 × 0,90 = 168,3   bis  187 × 1,00 = 187,0

const d1 = berechneHerzfrequenzZonen({ alter: 30, ruhepuls: 65, hfmaxEigen: 0, formel: 'tanaka' });
cases.push(
  { name: 'D-01 Tanaka 30 J: HFmax',          actual: d1.hfmax,             expected: 187,   tolerance: 0.001 },
  { name: 'D-01 Tanaka 30 J: Z1 bpmMin',      actual: d1.zonen[0].bpmMin,   expected: 93.5,  tolerance: 0.001 },
  { name: 'D-01 Tanaka 30 J: Z2 bpmMax',      actual: d1.zonen[1].bpmMax,   expected: 130.9, tolerance: 0.001 },
  { name: 'D-01 Tanaka 30 J: Z4 bpmMin',      actual: d1.zonen[3].bpmMin,   expected: 149.6, tolerance: 0.001 },
  { name: 'D-01 Tanaka 30 J: Z5 bpmMax',      actual: d1.zonen[4].bpmMax,   expected: 187,   tolerance: 0.001 },
);

// === Cluster E: Zonen-Verteilung Karvonen (40 J, RP 60) ===
//
// Tanaka 40 J: 208 - 28 = 180.
// HFR = 180 - 60 = 120.
//   Z2 (60-70%): 60+120×0,60=132 bis 60+120×0,70=144
//   Z4 (80-90%): 60+120×0,80=156 bis 60+120×0,90=168

const e1 = berechneHerzfrequenzZonen({ alter: 40, ruhepuls: 60, hfmaxEigen: 0, formel: 'karvonen' });
cases.push(
  { name: 'E-01 Karvonen 40 J RP60: HFmax',   actual: e1.hfmax,           expected: 180, tolerance: 0.001 },
  { name: 'E-01 Karvonen 40 J RP60: HFreserve', actual: e1.hfReserve,      expected: 120, tolerance: 0.001 },
  { name: 'E-01 Karvonen 40 J RP60: Z2 bpmMin', actual: e1.zonen[1].bpmMin, expected: 132, tolerance: 0.001 },
  { name: 'E-01 Karvonen 40 J RP60: Z2 bpmMax', actual: e1.zonen[1].bpmMax, expected: 144, tolerance: 0.001 },
  { name: 'E-01 Karvonen 40 J RP60: Z4 bpmMin', actual: e1.zonen[3].bpmMin, expected: 156, tolerance: 0.001 },
  { name: 'E-01 Karvonen 40 J RP60: Z4 bpmMax', actual: e1.zonen[3].bpmMax, expected: 168, tolerance: 0.001 },
);

// === Cluster F: Eigene HFmax überschreibt Formel-Berechnung ===
//
// hfmaxEigen = 195 → Lib soll 195 verwenden, nicht Tanaka-Wert (175 für 47 J).

const f1 = berechneHerzfrequenzZonen({ alter: 47, ruhepuls: 70, hfmaxEigen: 195, formel: 'tanaka' });
cases.push(
  { name: 'F-01 hfmaxEigen 195 überschreibt Tanaka', actual: f1.hfmax, expected: 195, tolerance: 0.001 },
);

// === Cluster G: Edge-Cases ===
//
// G-01 Junges Kind (10 J):
//   Tanaka: 208 - 7 = 201
const g1 = berechneHerzfrequenzZonen({ alter: 10, ruhepuls: 75, hfmaxEigen: 0, formel: 'tanaka' });
cases.push(
  { name: 'G-01 Tanaka 10 J: HFmax', actual: g1.hfmax, expected: 201, tolerance: 0.001 },
);

// G-02 Senior (90 J):
//   Tanaka: 208 - 63 = 145
const g2 = berechneHerzfrequenzZonen({ alter: 90, ruhepuls: 65, hfmaxEigen: 0, formel: 'tanaka' });
cases.push(
  { name: 'G-02 Tanaka 90 J: HFmax', actual: g2.hfmax, expected: 145, tolerance: 0.001 },
);

// G-03 Karvonen ohne Ruhepuls → fällt auf HFmax-basierte Zonen zurück.
//   Tanaka 30 J = 187, Z2: 187×0,60=112,2 bis 187×0,70=130,9
const g3 = berechneHerzfrequenzZonen({ alter: 30, ruhepuls: 0, hfmaxEigen: 0, formel: 'karvonen' });
cases.push(
  { name: 'G-03 Karvonen RP=0: Z2 bpmMin (HFmax-Fallback)', actual: g3.zonen[1].bpmMin, expected: 112.2, tolerance: 0.001 },
  { name: 'G-03 Karvonen RP=0: Z2 bpmMax (HFmax-Fallback)', actual: g3.zonen[1].bpmMax, expected: 130.9, tolerance: 0.001 },
);

// G-04 Standard 30 J: alle Zonen aus 220 - 30 = 190
//   Z3 (70-80%): 190×0,70=133 bis 190×0,80=152
const g4 = berechneHerzfrequenzZonen({ alter: 30, ruhepuls: 65, hfmaxEigen: 0, formel: 'standard' });
cases.push(
  { name: 'G-04 Standard 30 J: HFmax = 190', actual: g4.hfmax, expected: 190, tolerance: 0.001 },
  { name: 'G-04 Standard 30 J: Z3 bpmMin',   actual: g4.zonen[2].bpmMin, expected: 133, tolerance: 0.001 },
  { name: 'G-04 Standard 30 J: Z3 bpmMax',   actual: g4.zonen[2].bpmMax, expected: 152, tolerance: 0.001 },
);

// G-05 Zonen-Anteile sind 5 Stufen
cases.push(
  { name: 'G-05 ZONEN_ANTEILE.length',        actual: ZONEN_ANTEILE.length, expected: 5, tolerance: 0 },
  { name: 'G-05 Z1 min = 0,50',                actual: ZONEN_ANTEILE[0].min, expected: 0.50, tolerance: 0.001 },
  { name: 'G-05 Z5 max = 1,00',                actual: ZONEN_ANTEILE[4].max, expected: 1.00, tolerance: 0.001 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  const tol = c.tolerance ?? 1;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(
    `  ${status} ${c.name.padEnd(54)} ist ${String(c.actual).padStart(10)}  soll ${String(c.expected).padStart(10)}  Δ ${delta.toFixed(4).padStart(8)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
