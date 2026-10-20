/**
 * Verify-Script für lib/berechnungen/gehaltsvergleich.ts (Welle 187).
 *
 * Anlass: Die Median-Basis „Alle Arbeitnehmer“ lag bei 3.600 € („VSE 2022/2023, hochgerechnet
 * 2026“) und damit sogar unter dem Stand von April 2022. Neu: Destatis-Niveau.
 *
 * Externe Quellen:
 *   - Destatis, PM N037 (Juli 2025) „Der Durchschnittsmensch in Deutschland“: Vollzeitbeschäftigte
 *     verdienten im April 2024 im Mittel (Median) 3.978 € brutto ohne Sonderzahlungen.
 *     https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/07/PD25_N037_12_62.html
 *   - Destatis, PM 25/134 und PM 26/113 (01.04.2026): Median Bruttojahresverdienst Vollzeit inkl.
 *     Sonderzahlungen 2024 52.159 €, 2025 54.066 € (+1.907 €).
 *     https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/04/PD26_113_621.html
 *   → Basis 2025: 3.978 € × 54.066 / 52.159 = 4.123,4 € → gerundet 4.120 €.
 *   - Standardnormalverteilung: Φ(x) über die Taylorreihe von erf (unabhängig von der
 *     Abramowitz-Stegun-Näherung der Lib); Φ(0,6745) = 0,75, Φ(1,2816) = 0,90.
 *
 * Ausführen: npx tsx scripts/verify-gehaltsvergleich.ts
 */

import {
  berechneGehaltsvergleich,
  berufsgruppen,
  MEDIAN_VOLLZEIT_BASIS,
} from '../lib/berechnungen/gehaltsvergleich';

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

// erf per Taylorreihe (konvergiert für |x| < 4 ausreichend genau)
function erf(x: number): number {
  let summe = 0;
  let term = x;
  for (let n = 0; n < 200; n++) {
    summe += term / (2 * n + 1);
    term *= (-x * x) / (n + 1);
  }
  return (2 / Math.sqrt(Math.PI)) * summe;
}
const phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

// Fortschreibung der Destatis-Basis
const basisSoll = 3978 * 54066 / 52159;
faelle.push(
  { name: 'Fortschreibung 3.978 × 54.066 / 52.159 = 4.123,4', ist: Math.round(basisSoll * 10) / 10, soll: 4123.4, tol: 0.05 },
  { name: 'MEDIAN_VOLLZEIT_BASIS = 4.120 (auf 10 € gerundet)', ist: MEDIAN_VOLLZEIT_BASIS, soll: Math.round(basisSoll / 10) * 10, tol: 0 },
  { name: 'Gruppe „gesamt“: Median 4.120',                     ist: berufsgruppen.find(b => b.key === 'gesamt')!.median, soll: 4120, tol: 0 },
  // Strukturwerte bleiben: kaufm. 3.400 × 4.120 / 3.600 = 3.891,1 → 3.890; Streuung 1.200 → 1.373,3 → 1.370
  { name: 'Kaufmännisch: Median 3.890',                        ist: berufsgruppen.find(b => b.key === 'kaufm')!.median, soll: 3890, tol: 0 },
  { name: 'Kaufmännisch: Streuung 1.370',                      ist: berufsgruppen.find(b => b.key === 'kaufm')!.stddev, soll: 1370, tol: 0 },
  { name: 'IT: Median 4.800 × 4.120/3.600 → 5.490',            ist: berufsgruppen.find(b => b.key === 'it')!.median, soll: 5490, tol: 0 },
  { name: 'Gastronomie: Median 2.400 × 4.120/3.600 → 2.750',   ist: berufsgruppen.find(b => b.key === 'gastronomie')!.median, soll: 2750, tol: 0 },
);

// Normalverteilung der Lib gegen Referenz: Perzentil-Stufen P25/P75 liegen bei Median ∓ 0,6745 σ
const G = (b: number, k: string, bl: string, a: string) => berechneGehaltsvergleich(b, k, bl, a)!;

// Seitenbeispiel / Startwerte: kaufm., NRW (1,02), 35–44 (1,05)
const medKaufmNrw = Math.round(3890 * 1.02 * 1.05);       // 4.166,19 → 4.166
const sigKaufmNrw = 1370 * 1.02 * 1.05;                   // 1.467,27
const perz = (b: number, m: number, s: number) => Math.round(Math.max(1, Math.min(99, phi((b - m) / s) * 100)));
const k3500 = G(3500, 'kaufm', 'NW', '35-44');
faelle.push(
  { name: 'Kaufm./NRW/35–44: Median 4.166',                  ist: k3500.adjustierterMedian, soll: medKaufmNrw, tol: 0 },
  { name: 'Kaufm./NRW/35–44: Median = 4.166 (Handrechnung)', ist: medKaufmNrw, soll: 4166, tol: 0 },
  { name: '3.500 € → Perzentil 32',                          ist: k3500.perzentil, soll: perz(3500, medKaufmNrw, sigKaufmNrw), tol: 0 },
  { name: '3.500 € → Perzentil 32 (Referenzwert)',           ist: perz(3500, medKaufmNrw, sigKaufmNrw), soll: 32, tol: 0 },
  { name: '2.800 € → Perzentil 18',                          ist: G(2800, 'kaufm', 'NW', '35-44').perzentil, soll: 18, tol: 0 },
  { name: '4.200 € → Perzentil 51',                          ist: G(4200, 'kaufm', 'NW', '35-44').perzentil, soll: 51, tol: 0 },
  { name: '3.800 € → Perzentil 40',                          ist: G(3800, 'kaufm', 'NW', '35-44').perzentil, soll: perz(3800, medKaufmNrw, sigKaufmNrw), tol: 0 },
  { name: '3.800 €: Differenz −366 €',                        ist: G(3800, 'kaufm', 'NW', '35-44').differenz, soll: 3800 - 4166, tol: 0 },
  { name: 'P75 = Median + 0,6745 σ ≈ 5.156',                 ist: k3500.perzentilStufen.find(s => s.prozent === 75)!.gehalt, soll: Math.round(4166 + 0.67449 * sigKaufmNrw), tol: 1 },
  { name: 'P90 = Median + 1,2816 σ ≈ 6.046',                 ist: k3500.perzentilStufen.find(s => s.prozent === 90)!.gehalt, soll: Math.round(4166 + 1.28155 * sigKaufmNrw), tol: 1 },
  { name: 'P25 = Median − 0,6745 σ ≈ 3.176',                 ist: k3500.perzentilStufen.find(s => s.prozent === 25)!.gehalt, soll: Math.round(4166 - 0.67449 * sigKaufmNrw), tol: 1 },
);

// Weitere Seitenbeispiele (lib/rechner-config/finanzen.ts, Block gehaltsvergleich)
faelle.push(
  { name: 'Gesundheit/Sachsen/25–34: Median 3.660×0,83×0,90 = 2.734', ist: G(3200, 'gesundheit', 'SN', '25-34').adjustierterMedian, soll: Math.round(3660 * 0.83 * 0.90), tol: 0 },
  { name: 'Gesundheit/Sachsen: 3.200 € → P71',             ist: G(3200, 'gesundheit', 'SN', '25-34').perzentil, soll: perz(3200, 3660 * 0.83 * 0.90, 1140 * 0.83 * 0.90), tol: 0 },
  { name: 'Gesundheit/Bayern/25–34: Median 3.525',         ist: G(3200, 'gesundheit', 'BY', '25-34').adjustierterMedian, soll: Math.round(3660 * 1.07 * 0.90), tol: 0 },
  { name: 'Gesundheit/Bayern: 3.200 € → P38',              ist: G(3200, 'gesundheit', 'BY', '25-34').perzentil, soll: perz(3200, 3660 * 1.07 * 0.90, 1140 * 1.07 * 0.90), tol: 0 },
  { name: 'Gastronomie/NRW/35–44: Median 2.945',           ist: G(3500, 'gastronomie', 'NW', '35-44').adjustierterMedian, soll: Math.round(2750 * 1.02 * 1.05), tol: 0 },
  { name: 'Gastronomie/NRW: 3.500 € → P74',                ist: G(3500, 'gastronomie', 'NW', '35-44').perzentil, soll: perz(3500, 2750 * 1.02 * 1.05, 800 * 1.02 * 1.05), tol: 0 },
  { name: 'IT/NRW/35–44: Median 5.880',                    ist: G(3500, 'it', 'NW', '35-44').adjustierterMedian, soll: Math.round(5490 * 1.02 * 1.05), tol: 0 },
  { name: 'IT/NRW: 3.500 € → P10',                         ist: G(3500, 'it', 'NW', '35-44').perzentil, soll: perz(3500, 5490 * 1.02 * 1.05, 1720 * 1.02 * 1.05), tol: 0 },
  { name: 'Startwerte gesamt/NRW/35–44: Median 4.413',     ist: G(3500, 'gesamt', 'NW', '35-44').adjustierterMedian, soll: Math.round(4120 * 1.02 * 1.05), tol: 0 },
  { name: 'Startwerte: 3.500 € → P30',                     ist: G(3500, 'gesamt', 'NW', '35-44').perzentil, soll: perz(3500, 4120 * 1.02 * 1.05, 1600 * 1.02 * 1.05), tol: 0 },
);

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005);
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(60)} ist ${String(f.ist).padStart(9)}  soll ${String(f.soll).padStart(9)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
