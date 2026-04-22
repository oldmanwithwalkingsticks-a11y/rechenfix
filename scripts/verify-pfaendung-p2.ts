// Phase-P2-Verifikation Pfändung (Stufe-4b Prompt 121).
// Ausführen: npx tsx scripts/verify-pfaendung-p2.ts
//
// Referenz: BGBl. 2025 I Nr. 110 + BGBl. 2026 I Nr. 80 (§ 850c ZPO).
// Der Stichtag-Parameter im Lib-Interface existiert seit Prompt 120a; in 121
// ist er durch den UI-Datum-Input adressierbar. Das Verify prüft den
// Vorher/Nachher-Switch am Beispiel PF-SW-01.

import { berechnePfaendung, getAktuellePfaendungsParameter, getBeispielNettoWerte } from '../lib/berechnungen/pfaendung';

interface Fall { name: string; actual: number; expected: number; tol?: number; quelle: string; }
const cases: Fall[] = [];

// Stichtag-Switch-Kernfälle aus welle1-stufe4b-testfaelle.md
const vor = new Date(2026, 5, 30);  // 30.06.2026 (Monat 0-indexiert)
const nach = new Date(2026, 6, 1);  // 01.07.2026

cases.push({
  name: 'PF-SW-01 Netto 1.580 / 0 UH, 30.06.2026 → 17,50',
  actual: berechnePfaendung({ nettoMonat: 1580, unterhaltspflichten: 0, zeitraum: 'monatlich', stichtag: vor }).pfaendbar,
  expected: 17.50, tol: 0.01,
  quelle: 'BGBl. 2025 I Nr. 110 Anlage zu § 850c ZPO (Tabelle 2025)',
});
cases.push({
  name: 'PF-SW-01 Netto 1.580 / 0 UH, 01.07.2026 → 0,00',
  actual: berechnePfaendung({ nettoMonat: 1580, unterhaltspflichten: 0, zeitraum: 'monatlich', stichtag: nach }).pfaendbar,
  expected: 0, tol: 0.01,
  quelle: 'BGBl. 2026 I Nr. 80 — Freibetrag 1.587,40 € > 1.580 €',
});

// Grundfreibetrag-Werte aus Stichtag-Parameter
cases.push({
  name: 'Parameter 30.06.2026: Freibetrag = 1.555,00',
  actual: getAktuellePfaendungsParameter(vor).grundfreibetrag,
  expected: 1555.00, tol: 0.01, quelle: 'PFAENDUNG_2025.grundfreibetrag',
});
cases.push({
  name: 'Parameter 01.07.2026: Freibetrag = 1.587,40',
  actual: getAktuellePfaendungsParameter(nach).grundfreibetrag,
  expected: 1587.40, tol: 0.01, quelle: 'PFAENDUNG_2026.grundfreibetrag',
});

// Regression: hohe Nettos weiter plausibel
cases.push({
  name: 'PF Netto 3.500 / 0 UH, 01.08.2026 (Tabelle 2026)',
  actual: berechnePfaendung({ nettoMonat: 3500, unterhaltspflichten: 0, zeitraum: 'monatlich', stichtag: nach }).pfaendbar,
  expected: 1338.82, tol: 0.01,
  quelle: 'Pauschalquote × (3500-1587,40) = 0,70 × 1912,60',
});

// Paket 7, Prompt 123: dynamische Beispieltabelle
{
  const werte = getBeispielNettoWerte(3000);
  cases.push({
    name: 'PF-BEISP-01 getBeispielNettoWerte(3000): 6 Werte zentriert',
    actual: werte.length,
    expected: 6,
    quelle: 'dynamische Beispieltabelle um 3.000 €-Anker',
  });
  cases.push({
    name: 'PF-BEISP-01 erster Wert = 2.500 (Anker − 500)',
    actual: werte[0],
    expected: 2500,
    quelle: 'Staffelung -500/-250/anker/+250/+500/+1000',
  });
  cases.push({
    name: 'PF-BEISP-01 Anker-Wert 3000 enthalten',
    actual: werte.includes(3000) ? 1 : 0,
    expected: 1,
    quelle: 'User-Netto muss in der Liste sein',
  });
}
// Fallback bei unplausiblem Input (< 1500)
{
  const werte = getBeispielNettoWerte(500);
  cases.push({
    name: 'PF-BEISP-02 Fallback bei Netto 500 €',
    actual: werte[0],
    expected: 2000,
    quelle: 'Fallback-Array [2000, 2500, 3000, 3500, 4000, 5000]',
  });
}
// Tabellen-Integration
{
  const r = berechnePfaendung({ nettoMonat: 3000, unterhaltspflichten: 0, zeitraum: 'monatlich', stichtag: nach });
  cases.push({
    name: 'PF-BEISP-03 beispielTabelle hat 6 Zeilen',
    actual: r.beispielTabelle.length,
    expected: 6,
    quelle: 'berechnePfaendung nutzt getBeispielNettoWerte',
  });
  cases.push({
    name: 'PF-BEISP-03 Anker-Zeile 3000 enthalten',
    actual: r.beispielTabelle.some(z => z.netto === 3000) ? 1 : 0,
    expected: 1,
    quelle: 'User-Netto zentriert',
  });
}

let passed = 0, failed = 0;
console.log('=== Verify Pfändung P2 (Stufe-4b Prompt 121) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(60)} ist ${c.actual.toFixed(2).padStart(9)} € / soll ${c.expected.toFixed(2).padStart(9)} € / Δ ${delta.toFixed(2)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
