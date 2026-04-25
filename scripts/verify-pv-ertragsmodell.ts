// Verifikation PV-Ertragsmodell (Prompt 147c P1.1).
// Ausführen: npx tsx scripts/verify-pv-ertragsmodell.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   - K. Mertens, „Photovoltaik" (Hanser Verlag, Standardwerk):
//     Süd-Optimum 25–35° = 100 % Referenz. Faktoren-Tabellen aufbereitet
//     via echtsolar.de (Ertragsdaten Mertens), Solaranlage-Ratgeber,
//     energie-experten.org (Konsens-Werte 2025/2026).
//   - VDI 6002 / IEC 61724: Performance Ratio 0,85 als Standardannahme
//     (Modul-, WR-, Leitungs-, Verschmutzungs-, Degradations-Verluste).
//   - Deutscher Wetterdienst (DWD): 30-Jahres-Globalstrahlungs-Mittel
//     ca. 1.000 kWh/m²/Jahr in Deutschland.
//
// Modell: spezifischer Ertrag = 850 × Ausrichtungsfaktor × Neigungsfaktor
// Anlagen-Ertrag = kWp × spezifischer Ertrag.

import {
  PV_BASIS_ERTRAG_KWH_KWP,
  AUSRICHTUNGS_FAKTOR,
  NEIGUNGS_FAKTOR,
  AUSRICHTUNG_LABELS,
  NEIGUNG_LABELS,
  berechnePvErtrag,
  berechneSpezifischenErtrag,
} from '../lib/berechnungen/pv-ertragsmodell';

interface Fall {
  name: string;
  actual: number | string;
  expected: number | string;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// === GRUPPE 1: Basiswert + Vollständigkeit der Faktor-Tabellen ===

cases.push({ name: 'Basiswert Süd/Optimum inkl. PR 0,85', actual: PV_BASIS_ERTRAG_KWH_KWP, expected: 850, quelle: 'Mertens × VDI 6002 (1000 × 0,85)' });
cases.push({ name: '8 Ausrichtungsstufen vorhanden', actual: Object.keys(AUSRICHTUNGS_FAKTOR).length, expected: 8, quelle: 'Süd, SO, SW, O, W, NO, NW, N' });
cases.push({ name: '5 Neigungsstufen vorhanden', actual: Object.keys(NEIGUNGS_FAKTOR).length, expected: 5, quelle: 'flach, leicht, optimal, steil, sehr-steil' });
cases.push({ name: 'AUSRICHTUNG_LABELS deckungsgleich mit Faktoren', actual: Object.keys(AUSRICHTUNG_LABELS).length, expected: 8, quelle: 'Vollständigkeit' });
cases.push({ name: 'NEIGUNG_LABELS deckungsgleich mit Faktoren', actual: Object.keys(NEIGUNG_LABELS).length, expected: 5, quelle: 'Vollständigkeit' });

// === GRUPPE 2: Ausrichtungsfaktoren (Mertens) ===

cases.push({ name: 'Faktor Süd → 1,00', actual: AUSRICHTUNGS_FAKTOR.sued, expected: 1.0, quelle: 'Mertens Referenz' });
cases.push({ name: 'Faktor Süd-Ost → 0,95', actual: AUSRICHTUNGS_FAKTOR['sued-ost'], expected: 0.95, quelle: 'Mertens' });
cases.push({ name: 'Faktor Süd-West → 0,95', actual: AUSRICHTUNGS_FAKTOR['sued-west'], expected: 0.95, quelle: 'Mertens (symmetrisch zu SO)' });
cases.push({ name: 'Faktor Ost → 0,85', actual: AUSRICHTUNGS_FAKTOR.ost, expected: 0.85, quelle: 'Mertens' });
cases.push({ name: 'Faktor West → 0,85', actual: AUSRICHTUNGS_FAKTOR.west, expected: 0.85, quelle: 'Mertens' });
cases.push({ name: 'Faktor Nord-Ost → 0,72', actual: AUSRICHTUNGS_FAKTOR['nord-ost'], expected: 0.72, quelle: 'Mertens' });
cases.push({ name: 'Faktor Nord-West → 0,72', actual: AUSRICHTUNGS_FAKTOR['nord-west'], expected: 0.72, quelle: 'Mertens' });
cases.push({ name: 'Faktor Nord → 0,65', actual: AUSRICHTUNGS_FAKTOR.nord, expected: 0.65, quelle: 'Mertens (war im alten Modell zu pessimistisch mit 0,55)' });

// === GRUPPE 3: Neigungsfaktoren ===

cases.push({ name: 'Neigung flach (0–15°) → 0,87', actual: NEIGUNGS_FAKTOR.flach, expected: 0.87, quelle: 'Mertens' });
cases.push({ name: 'Neigung leicht (15–25°) → 0,94', actual: NEIGUNGS_FAKTOR.leicht, expected: 0.94, quelle: 'Mertens' });
cases.push({ name: 'Neigung optimal (25–35°) → 1,00', actual: NEIGUNGS_FAKTOR.optimal, expected: 1.0, quelle: 'Mertens Referenz' });
cases.push({ name: 'Neigung steil (35–45°) → 0,97', actual: NEIGUNGS_FAKTOR.steil, expected: 0.97, quelle: 'Mertens (war im alten Modell zu pessimistisch mit 0,95)' });
cases.push({ name: 'Neigung sehr steil (45°+) → 0,91', actual: NEIGUNGS_FAKTOR['sehr-steil'], expected: 0.91, quelle: 'Mertens (war im alten Modell zu pessimistisch mit 0,85)' });

// === GRUPPE 4: berechneSpezifischenErtrag (kWh/kWp/Jahr) ===

cases.push({ name: 'Süd / Optimal → 850 kWh/kWp', actual: berechneSpezifischenErtrag('sued', 'optimal'), expected: 850, quelle: '850 × 1,00 × 1,00' });
cases.push({ name: 'Nord / Optimal → 553 kWh/kWp', actual: berechneSpezifischenErtrag('nord', 'optimal'), expected: 553, quelle: '850 × 0,65 × 1,00 = 552,5 → 553' });
cases.push({ name: 'Ost / Leicht → 679 kWh/kWp', actual: berechneSpezifischenErtrag('ost', 'leicht'), expected: 679, quelle: '850 × 0,85 × 0,94 = 679,15 → 679' });
cases.push({ name: 'West / Optimal → 723 kWh/kWp', actual: berechneSpezifischenErtrag('west', 'optimal'), expected: 723, quelle: '850 × 0,85 × 1,00 = 722,5 → 723' });
cases.push({ name: 'Süd-West / Steil → 783 kWh/kWp', actual: berechneSpezifischenErtrag('sued-west', 'steil'), expected: 783, quelle: '850 × 0,95 × 0,97 = 783,28 → 783' });
cases.push({ name: 'Nord / Flach → 481 kWh/kWp', actual: berechneSpezifischenErtrag('nord', 'flach'), expected: 481, quelle: '850 × 0,65 × 0,87 = 480,68 → 481' });
cases.push({ name: 'Nord / Sehr steil → 503 kWh/kWp', actual: berechneSpezifischenErtrag('nord', 'sehr-steil'), expected: 503, quelle: '850 × 0,65 × 0,91 = 502,78 → 503' });

// === GRUPPE 5: berechnePvErtrag — konkrete Anlagen ===

// Test #8 aus 147 mit 8 kWp Süd Optimal
cases.push({ name: '8,0 kWp Süd Optimal → 6.800 kWh', actual: berechnePvErtrag({ kwp: 8, ausrichtung: 'sued', neigung: 'optimal' }), expected: 6800, quelle: '8 × 850 × 1,00 × 1,00' });
// 8,8 kWp aus dem Audit-Wunsch
cases.push({ name: '8,8 kWp Süd Optimal → 7.480 kWh', actual: berechnePvErtrag({ kwp: 8.8, ausrichtung: 'sued', neigung: 'optimal' }), expected: 7480, quelle: '8,8 × 850 × 1,00 × 1,00' });
// Default-State des Rechners (40 m² → 7.27 kWp Auto)
cases.push({ name: '7,27 kWp Süd Optimal → 6.180 kWh', actual: berechnePvErtrag({ kwp: 7.27, ausrichtung: 'sued', neigung: 'optimal' }), expected: 6180, tol: 1, quelle: '40 m² / 5,5 × 850' });
// Audit-Test L2: 8,8 kWp Nord Optimal — Math.round(8,8 × 850 × 0,65) = 4862
cases.push({ name: '8,8 kWp Nord Optimal → 4.862 kWh', actual: berechnePvErtrag({ kwp: 8.8, ausrichtung: 'nord', neigung: 'optimal' }), expected: 4862, quelle: '8,8 × 850 × 0,65 × 1,00 = 4862' });
// Audit-Test L3: 8,8 kWp Nord Leicht — 4862 × 0,94 = 4570,28 → 4570
cases.push({ name: '8,8 kWp Nord Leicht → 4.570 kWh', actual: berechnePvErtrag({ kwp: 8.8, ausrichtung: 'nord', neigung: 'leicht' }), expected: 4570, quelle: '8,8 × 850 × 0,65 × 0,94 = 4570,28 → 4570' });
// Audit-Test L4: 8,8 kWp Ost Steil — 8,8 × 850 × 0,85 × 0,97 = 6167,258 → 6167
cases.push({ name: '8,8 kWp Ost Steil → 6.167 kWh', actual: berechnePvErtrag({ kwp: 8.8, ausrichtung: 'ost', neigung: 'steil' }), expected: 6167, quelle: '8,8 × 850 × 0,85 × 0,97 = 6167,26 → 6167' });
// 7,3 kWp Nord Leicht — 7,3 × 850 × 0,65 × 0,94 = 3791,255 → 3791
cases.push({ name: '7,3 kWp Nord Leicht → 3.791 kWh', actual: berechnePvErtrag({ kwp: 7.3, ausrichtung: 'nord', neigung: 'leicht' }), expected: 3791, quelle: '7,3 × 850 × 0,65 × 0,94 = 3791,3 → 3791' });
// 0 kWp → 0 kWh (Edge Case)
cases.push({ name: '0 kWp → 0 kWh (Edge Case)', actual: berechnePvErtrag({ kwp: 0, ausrichtung: 'sued', neigung: 'optimal' }), expected: 0, quelle: 'Multiplikation mit 0' });

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    ok = Math.abs(c.actual - c.expected) <= (c.tol ?? 0.005);
  } else {
    ok = c.actual === c.expected;
  }
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(10);
  const expectedStr = String(c.expected).padStart(10);
  console.log(`${mark} ${c.name.padEnd(58)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
