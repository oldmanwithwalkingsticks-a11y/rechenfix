/**
 * Verify-Script für lib/zahlenformat.ts (W12, L-41-Folge).
 *
 * Cluster A: parseDeutscheZahl-Test-Tabelle gegen DIN-5008-Heuristik (R1–R4).
 *            12 Cases — 10 aus Code-Phase-Prompt + 2 Whitespace/Negativ.
 * Cluster B: Round-Trip parseDeutscheZahl(n.toLocaleString('de-DE')) === n
 *            für 9 Werte (deckt SteuerprogressionsRechner-Slider-Bug ab).
 * Cluster C: Edge-Cases (leer, ungültig, Whitespace).
 *
 * Anti-Tautologie: Cluster-A-Werte vor Implementation tabellarisch fixiert
 * im Code-Phase-Prompt (welle12-code-phase-prompt.md). Cluster B prüft
 * Bidirektionalität gegen den System-Standard `Number.toLocaleString('de-DE')`.
 *
 * Run: npx tsx scripts/verify-zahlenformat.ts
 */

import { parseDeutscheZahl } from '../lib/zahlenformat';

interface Case {
  name: string;
  actual: number;
  expected: number;
}

function isNaNCase(expected: number): boolean {
  return Number.isNaN(expected);
}

function vergleiche(c: Case): boolean {
  if (isNaNCase(c.expected)) return Number.isNaN(c.actual);
  return c.actual === c.expected;
}

// --- Cluster A: parseDeutscheZahl Test-Tabelle ---
const clusterA: Case[] = [
  { name: 'A-01 "150" → 150 (direkt)',                    actual: parseDeutscheZahl('150'),         expected: 150 },
  { name: 'A-02 "150.000" → 150000 (R3)',                 actual: parseDeutscheZahl('150.000'),     expected: 150000 },
  { name: 'A-03 "1.500" → 1500 (R3)',                     actual: parseDeutscheZahl('1.500'),       expected: 1500 },
  { name: 'A-04 "1.500.000" → 1500000 (R2)',              actual: parseDeutscheZahl('1.500.000'),   expected: 1500000 },
  { name: 'A-05 "1.5" → 1.5 (R4)',                        actual: parseDeutscheZahl('1.5'),         expected: 1.5 },
  { name: 'A-06 "1.50" → 1.50 (R4)',                      actual: parseDeutscheZahl('1.50'),        expected: 1.5 },
  { name: 'A-07 "12,34" → 12.34 (R1)',                    actual: parseDeutscheZahl('12,34'),       expected: 12.34 },
  { name: 'A-08 "1.500,50" → 1500.50 (R1)',               actual: parseDeutscheZahl('1.500,50'),    expected: 1500.5 },
  { name: 'A-09 "1.000.000,99" → 1000000.99 (R1)',        actual: parseDeutscheZahl('1.000.000,99'), expected: 1000000.99 },
  { name: 'A-10 "" → 0 (Backwards-Compat, W12-Hotfix)',   actual: parseDeutscheZahl(''),            expected: 0 },
  { name: 'A-11 "abc" → NaN (edge)',                      actual: parseDeutscheZahl('abc'),         expected: NaN },
  { name: 'A-12 "-150.000" → -150000 (R3 mit Minus)',     actual: parseDeutscheZahl('-150.000'),    expected: -150000 },
];

// --- Cluster B: Round-Trip parseDeutscheZahl(n.toLocaleString('de-DE')) === n ---
const roundTripWerte = [0, 1, 100, 999, 1000, 12345, 150000, 300000, 1234567];
const clusterB: Case[] = roundTripWerte.map((n) => ({
  name: `B-${String(n).padStart(7, '0')} round-trip ${n} → "${n.toLocaleString('de-DE')}" → ${n}`,
  actual: parseDeutscheZahl(n.toLocaleString('de-DE')),
  expected: n,
}));

// --- Cluster C: Edge-Cases (Whitespace, Negativ-Strings) ---
const clusterC: Case[] = [
  { name: 'C-01 "  150  " → 150 (Trim + Parse)',          actual: parseDeutscheZahl('  150  '),     expected: 150 },
  { name: 'C-02 "  " → 0 (Whitespace-only, W12-Hotfix)',  actual: parseDeutscheZahl('  '),          expected: 0 },
  { name: 'C-03 "  1.500,50  " → 1500.5 (Trim + R1)',     actual: parseDeutscheZahl('  1.500,50  '), expected: 1500.5 },
  { name: 'C-04 "  abc  " → NaN (Trim + Ungültig-Anker)', actual: parseDeutscheZahl('  abc  '),     expected: NaN },
];

const alleCluster: Array<{ name: string; cases: Case[] }> = [
  { name: 'A', cases: clusterA },
  { name: 'B', cases: clusterB },
  { name: 'C', cases: clusterC },
];

let totalGruen = 0;
let totalRot = 0;
const fehlschlaege: Case[] = [];

for (const cluster of alleCluster) {
  let clusterGruen = 0;
  let clusterRot = 0;
  for (const c of cluster.cases) {
    if (vergleiche(c)) {
      clusterGruen++;
    } else {
      clusterRot++;
      fehlschlaege.push(c);
    }
  }
  totalGruen += clusterGruen;
  totalRot += clusterRot;
  console.log(
    `Cluster ${cluster.name}: ${clusterGruen}/${cluster.cases.length} grün` +
      (clusterRot > 0 ? ` — ${clusterRot} ROT` : ''),
  );
}

console.log(`\nTotal: ${totalGruen}/${totalGruen + totalRot} grün`);

if (totalRot > 0) {
  console.log('\nFEHLSCHLÄGE:');
  for (const f of fehlschlaege) {
    const ist = Number.isNaN(f.actual) ? 'NaN' : String(f.actual);
    const soll = Number.isNaN(f.expected) ? 'NaN' : String(f.expected);
    console.log(`  ✗ ${f.name}`);
    console.log(`    actual=${ist}  expected=${soll}`);
  }
  process.exit(1);
}
