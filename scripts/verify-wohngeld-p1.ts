// Phase-P1-Verifikation Wohngeld nach § 12 + § 17 WoGG (Dynamisierung 01.01.2025).
// Ausführen: npx tsx scripts/verify-wohngeld-p1.ts

import { berechneWohngeld } from '../lib/berechnungen/wohngeld';

// --- Komplette Höchstbeträge-Matrix (amtliche Anlage 1 WoGG 2025/2026) ---
const HOECHST_SOLL: Array<[number, string, number]> = [
  [1, 'I', 361], [1, 'II', 408], [1, 'III', 456], [1, 'IV', 511], [1, 'V', 562], [1, 'VI', 615], [1, 'VII', 677],
  [2, 'I', 437], [2, 'II', 493], [2, 'III', 551], [2, 'IV', 619], [2, 'V', 680], [2, 'VI', 745], [2, 'VII', 820],
  [3, 'I', 521], [3, 'II', 587], [3, 'III', 657], [3, 'IV', 737], [3, 'V', 809], [3, 'VI', 887], [3, 'VII', 975],
  [4, 'I', 608], [4, 'II', 686], [4, 'III', 766], [4, 'IV', 858], [4, 'V', 946], [4, 'VI', 1035], [4, 'VII', 1139],
  [5, 'I', 694], [5, 'II', 782], [5, 'III', 875], [5, 'IV', 982], [5, 'V', 1080], [5, 'VI', 1183], [5, 'VII', 1302],
];

let passed = 0;
let failed = 0;

console.log('=== Verify Wohngeld P1 (Stufe-4b Prompt 120) ===\n');

console.log('--- Höchstbeträge-Matrix (35 Zellen § 12 WoGG Anlage 1) ---');
for (const [personen, stufe, soll] of HOECHST_SOLL) {
  // Miete = soll + 50 → Kappung auf soll muss greifen
  const r = berechneWohngeld({
    haushaltsmitglieder: personen,
    bruttoEinkommen: 1500,
    miete: soll + 50,
    mietstufe: stufe as any,
    heizkostenpauschale: false,
    freibetragSchwerbehindert: false,
    freibetragAlleinerziehend: false,
    freibetragErwerbstaetig: false,
  });
  const ist = r?.hoechstbetragMiete ?? 0;
  const ok = ist === soll;
  if (ok) passed++;
  else {
    failed++;
    console.log(`  ✗ ${personen} P / Stufe ${stufe}: ist ${ist} / soll ${soll}`);
  }
}
console.log(`  Höchstbeträge: ${HOECHST_SOLL.length - failed}/${HOECHST_SOLL.length} grün.`);

console.log('');
console.log('--- Freibetragsregeln § 17 WoGG ---');
const fbTests: Array<{ name: string; input: Parameters<typeof berechneWohngeld>[0]; sollFreibetragEuro: number }> = [
  {
    name: 'Erwerbstätigen-FB (§ 17 Nr. 1)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: true,
    },
    sollFreibetragEuro: 83, // 1.000 / 12 = 83,33 → 83 rund
  },
  {
    name: 'Schwerbehinderten-FB (§ 17 Nr. 2)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: true,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 125,
  },
  {
    name: 'Alleinerziehenden-FB 1 Kind (§ 17 Nr. 4)',
    input: {
      haushaltsmitglieder: 2, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: true, alleinerziehendKinderAnzahl: 1,
      freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 110,
  },
  {
    name: 'Alleinerziehenden-FB 2 Kinder',
    input: {
      haushaltsmitglieder: 3, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: true, alleinerziehendKinderAnzahl: 2,
      freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 220,
  },
  {
    name: 'Alleinerziehenden-FB 3 Kinder',
    input: {
      haushaltsmitglieder: 4, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: true, alleinerziehendKinderAnzahl: 3,
      freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 330,
  },
  {
    name: 'Alle drei FB kombiniert',
    input: {
      haushaltsmitglieder: 2, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: true,
      freibetragAlleinerziehend: true, alleinerziehendKinderAnzahl: 1,
      freibetragErwerbstaetig: true,
    },
    sollFreibetragEuro: 83 + 125 + 110, // 318 (gerundet)
  },
];

for (const t of fbTests) {
  const r = berechneWohngeld(t.input);
  const ist = r?.freibetraege ?? 0;
  const delta = Math.abs(Math.round(ist) - t.sollFreibetragEuro);
  const ok = delta <= 1;
  const status = ok ? '✓' : '✗';
  console.log(`  ${status} ${t.name.padEnd(44)} ist ${ist.toFixed(2).padStart(7)} € / soll ${String(t.sollFreibetragEuro).padStart(4)} € / Δ ${delta}`);
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed + (HOECHST_SOLL.length - failed > 0 ? 0 : 0)}/${HOECHST_SOLL.length + fbTests.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
