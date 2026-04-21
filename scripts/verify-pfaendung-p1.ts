// Phase-P1-Verifikation Pfändung § 850c ZPO gegen amtliche Tabelle.
// Quelle: Pfändungsfreigrenzenbekanntmachung 2025 (BGBl. 2025 I Nr. 110 Anlage).
// Ausführen: npx tsx scripts/verify-pfaendung-p1.ts

import { berechnePfaendung } from '../lib/berechnungen/pfaendung';

interface Fall {
  name: string;
  netto: number;
  uh: number;
  stichtag: Date;
  sollPfaendbar: number;
}

// Stichtag im 2025er Geltungsbereich (1.555-€-Freibetrag).
const SD2025 = new Date(2026, 3, 15); // 15.04.2026
// Stichtag im 2026er Geltungsbereich (1.587,40-€-Freibetrag).
const SD2026 = new Date(2026, 7, 15); // 15.08.2026

const cases: Fall[] = [
  // --- Tabelle 2025 (bis 30.06.2026) ---
  // Alle Werte exakt aus Pfaendungstabelle-2025-2026.pdf (BGBl.-Anlage)
  { name: '1.560 € / 0 UH (Tabelle 2025)',   netto: 1560,    uh: 0, stichtag: SD2025, sollPfaendbar: 3.50 },
  { name: '1.600 € / 0 UH (Tabelle 2025)',   netto: 1600,    uh: 0, stichtag: SD2025, sollPfaendbar: 31.50 },
  { name: '1.605 € / 0 UH (10-€-Stufe abrd)',netto: 1605,    uh: 0, stichtag: SD2025, sollPfaendbar: 31.50 },
  { name: '1.609,99 € / 0 UH (obere Band-G)',netto: 1609.99, uh: 0, stichtag: SD2025, sollPfaendbar: 31.50 },
  { name: '1.700 € / 0 UH',                  netto: 1700,    uh: 0, stichtag: SD2025, sollPfaendbar: 101.50 },
  { name: '2.230 € / 0 UH',                  netto: 2230,    uh: 0, stichtag: SD2025, sollPfaendbar: 472.50 },
  { name: '2.230 € / 1 UH',                  netto: 2230,    uh: 1, stichtag: SD2025, sollPfaendbar: 44.89 },
  { name: '2.300 € / 0 UH',                  netto: 2300,    uh: 0, stichtag: SD2025, sollPfaendbar: 521.50 },
  { name: '2.500 € / 0 UH',                  netto: 2500,    uh: 0, stichtag: SD2025, sollPfaendbar: 661.50 },
  { name: '3.000 € / 0 UH',                  netto: 3000,    uh: 0, stichtag: SD2025, sollPfaendbar: 1011.50 },
  // PF-SW-01 Stichtag-Randfälle
  { name: 'PF-SW-01 1.580 € / 0 UH vor Switch', netto: 1580, uh: 0, stichtag: SD2025, sollPfaendbar: 17.50 },
  { name: 'PF-SW-01 1.580 € / 0 UH nach Switch', netto: 1580, uh: 0, stichtag: SD2026, sollPfaendbar: 0 },

  // --- Tabelle 2026 (ab 01.07.2026) ---
  // Freibetrag 1.587,40 € → unter FB kein pfändbar
  { name: '1.587,40 € / 0 UH = FB (2026)',   netto: 1587.40, uh: 0, stichtag: SD2026, sollPfaendbar: 0 },
  { name: '1.590 € / 0 UH (2026)',           netto: 1590,    uh: 0, stichtag: SD2026, sollPfaendbar: 1.82 },  // (1590-1587,40)×0,70 = 1,82
  { name: '1.600 € / 0 UH (2026)',           netto: 1600,    uh: 0, stichtag: SD2026, sollPfaendbar: 8.82 },  // (1600-1587,40)×0,70 = 12,60×0,70 = 8,82
  { name: '2.000 € / 2 UH (2026)',           netto: 2000,    uh: 2, stichtag: SD2026, sollPfaendbar: 0 },    // 2000 < 1587,40+597,42+332,83 = 2517,65
  { name: '3.500 € / 0 UH (2026)',           netto: 3500,    uh: 0, stichtag: SD2026, sollPfaendbar: 1338.82 }, // (3500-1587,40)×0,70 = 1912,60×0,70
];

let passed = 0;
let failed = 0;
const tolerance = 0.01;

console.log('=== Verify Pfändung P1 (Stufe-4b Prompt 120) ===');
console.log('Soll-Werte aus amtlicher Pfändungstabelle (BGBl-Anlage).\n');

for (const c of cases) {
  const r = berechnePfaendung({
    nettoMonat: c.netto,
    unterhaltspflichten: c.uh,
    zeitraum: 'monatlich',
    stichtag: c.stichtag,
  });
  const ist = r.pfaendbar;
  const delta = Math.abs(ist - c.sollPfaendbar);
  const ok = delta <= tolerance;
  const status = ok ? '✓' : '✗';
  console.log(`  ${status} ${c.name.padEnd(44)} ist ${ist.toFixed(2).padStart(8)} € / soll ${c.sollPfaendbar.toFixed(2).padStart(8)} € / Δ ${delta.toFixed(2)}`);
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
