// Phase-P1-Verifikation Wohngeld (Stufe-4b Prompt 120 + Hotfix 120a).
// Ausführen: npx tsx scripts/verify-wohngeld-p1.ts
//
// Referenz-Quellen (externe, NICHT zirkulär gegen Lib):
//   Höchstbeträge:   § 12 WoGG Anlage 1, BGBl. 2024 I Nr. 314
//   Freibeträge:     § 17 WoGG, aktuelle Fassung
//   Tarif-Formel:    § 19 Abs. 1 + Anlage 2 + Anlage 3 WoGG
//   Tarif-Test WG-01: BMWSB-Wohngeldrechner (user-cross-check 22.04.2026)
//
// Anti-Pattern-Fix gegenüber Prompt 120: Tests prüfen jetzt gegen
// Rechtsquellen und einen externen Referenz-Rechner, nicht gegen Lib-Werte
// selbst.

import { berechneWohngeld } from '../lib/berechnungen/wohngeld';

// ======================================================================
// 1. Höchstbeträge-Matrix § 12 WoGG Anlage 1 (BGBl. 2024 I Nr. 314, S. 3)
// ======================================================================

const HOECHST_SOLL: Array<[number, string, number]> = [
  [1, 'I', 361], [1, 'II', 408], [1, 'III', 456], [1, 'IV', 511], [1, 'V', 562], [1, 'VI', 615], [1, 'VII', 677],
  [2, 'I', 437], [2, 'II', 493], [2, 'III', 551], [2, 'IV', 619], [2, 'V', 680], [2, 'VI', 745], [2, 'VII', 820],
  [3, 'I', 521], [3, 'II', 587], [3, 'III', 657], [3, 'IV', 737], [3, 'V', 809], [3, 'VI', 887], [3, 'VII', 975],
  [4, 'I', 608], [4, 'II', 686], [4, 'III', 766], [4, 'IV', 858], [4, 'V', 946], [4, 'VI', 1035], [4, 'VII', 1139],
  [5, 'I', 694], [5, 'II', 782], [5, 'III', 875], [5, 'IV', 982], [5, 'V', 1080], [5, 'VI', 1183], [5, 'VII', 1302],
];

// ======================================================================
// 2. Freibetrag-Tests § 17 WoGG
// ======================================================================

const FB_TESTS: Array<{
  name: string;
  input: Parameters<typeof berechneWohngeld>[0];
  sollFreibetragEuro: number;
}> = [
  {
    name: 'Schwerbehinderten-FB 150 €/Mo (§ 17 Nr. 1)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: true,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 150,
  },
  {
    name: 'Alleinerziehenden-FB pauschal 110 €/Mo (§ 17 Nr. 3)',
    input: {
      haushaltsmitglieder: 2, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: true, freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 110,
  },
  {
    name: 'Beide Freibeträge kombiniert',
    input: {
      haushaltsmitglieder: 2, bruttoEinkommen: 2000, miete: 500, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: true,
      freibetragAlleinerziehend: true, freibetragErwerbstaetig: false,
    },
    sollFreibetragEuro: 260,
  },
];

// ======================================================================
// 3. Tarif-Formel-Stützpunkte
// ======================================================================

const FORMEL_TESTS: Array<{
  name: string;
  input: Parameters<typeof berechneWohngeld>[0];
  sollWohngeld: number;
  tolerance: number;
  quelle: string;
}> = [
  {
    name: 'WG-01 (1P, 1.400 € Brutto, 500 € Miete, IV)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 1400, miete: 500, mietstufe: 'IV',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: true,
    },
    sollWohngeld: 214,
    tolerance: 2,
    quelle: 'BMWSB-Rechner user-cross-check 22.04.2026',
  },
  {
    // Manuell nachgerechnet aus Anlage 2 + 3 WoGG:
    // Y = 900 × 0,70 = 630, aber Y_min für 1 P = 396 → Y = 630
    // M = 400 (ohne Heizkosten); M_min 1 P = 54 → M = 400
    // z1 = 0,04 + 0,0004797·400 + 0,00004080·630 = 0,04 + 0,19188 + 0,025704 = 0,257584
    // z2 = 0,257584 × 630 = 162,28
    // z3 = 400 - 162,28 = 237,72
    // z4 = 1,15 × 237,72 = 273,38 → gerundet 273
    name: '1P 900 € Brutto 400 € Miete III (Gesetzesnachrechnung)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 900, miete: 400, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: false,
    },
    sollWohngeld: 273,
    tolerance: 1,
    quelle: 'Manuell aus Anlage 2 + 3 WoGG',
  },
  {
    // 2P 1900 Brutto 750 III. Y = 1900×0,7 = 1330, Y_min 2P = 679 → 1330
    // M = min(750, 551) = 551, M_min 2P = 67 → 551
    // z1 = 0,03 + 0,0003571·551 + 0,00003040·1330 = 0,03 + 0,196762 + 0,040432 = 0,267194
    // z2 = 0,267194 × 1330 = 355,37
    // z3 = 551 − 355,37 = 195,63
    // z4 = 1,15 × 195,63 = 224,98 → 225
    name: '2P 1.900 € Brutto 750 € Miete III (Gesetzesnachrechnung)',
    input: {
      haushaltsmitglieder: 2, bruttoEinkommen: 1900, miete: 750, mietstufe: 'III',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: false,
    },
    sollWohngeld: 225,
    tolerance: 1,
    quelle: 'Manuell aus Anlage 2 + 3 WoGG',
  },
  {
    // Einkommen unter Y_min 1P = 396 → Y = 396
    // M = 300 (unter M_min 1P = 54 ist irrelevant, 300 > 54)
    // z1 = 0,04 + 0,0004797·300 + 0,00004080·396 = 0,04 + 0,14391 + 0,01616 = 0,20007
    // z2 = 0,20007 × 396 = 79,23
    // z3 = 300 − 79,23 = 220,77
    // z4 = 1,15 × 220,77 = 253,88 → 254
    name: '1P 500 € Brutto 300 € Miete I (niedrige Y greift Y_min)',
    input: {
      haushaltsmitglieder: 1, bruttoEinkommen: 500, miete: 300, mietstufe: 'I',
      heizkostenpauschale: false, freibetragSchwerbehindert: false,
      freibetragAlleinerziehend: false, freibetragErwerbstaetig: false,
    },
    sollWohngeld: 254,
    tolerance: 1,
    quelle: 'Manuell aus Anlage 2 + 3 WoGG (Y_min greift)',
  },
];

// ======================================================================
// Execution
// ======================================================================

let passed = 0;
let failed = 0;

console.log('=== Verify Wohngeld P1 + Hotfix 120a ===');
console.log('Tests gegen § 12/17/19 WoGG + Anlagen 1/2/3 + BMWSB-Oracle (nicht gegen Lib-Werte).\n');

console.log('--- (1) Höchstbeträge-Matrix § 12 WoGG Anlage 1 (35 Zellen) ---');
for (const [personen, stufe, soll] of HOECHST_SOLL) {
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
console.log('--- (2) Freibeträge § 17 WoGG ---');
for (const t of FB_TESTS) {
  const r = berechneWohngeld(t.input);
  const ist = r?.freibetraege ?? 0;
  const delta = Math.abs(Math.round(ist) - t.sollFreibetragEuro);
  const ok = delta <= 1;
  console.log(`  ${ok ? '✓' : '✗'} ${t.name.padEnd(46)} ist ${ist.toFixed(2).padStart(7)} € / soll ${String(t.sollFreibetragEuro).padStart(4)} € / Δ ${delta}`);
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log('--- (3) Tarif-Formel-Stützpunkte § 19 Abs. 1 + Anlagen 2/3 ---');
for (const t of FORMEL_TESTS) {
  const r = berechneWohngeld(t.input);
  const ist = r?.wohngeldMonat ?? 0;
  const delta = Math.abs(ist - t.sollWohngeld);
  const ok = delta <= t.tolerance;
  console.log(`  ${ok ? '✓' : '✗'} ${t.name.padEnd(52)} ist ${String(ist).padStart(4)} € / soll ${String(t.sollWohngeld).padStart(4)} € / Δ ${delta} [${t.quelle}]`);
  if (ok) passed++;
  else failed++;
}

const total = HOECHST_SOLL.length + FB_TESTS.length + FORMEL_TESTS.length;
console.log('');
console.log(`Ergebnis: ${passed}/${total} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
