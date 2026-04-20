// Ad-hoc-Verifikation Prompt 115b2 — BMF-Stützpunkte + Regression I/III/IV
// Ausführen: npx tsx scripts/verify-lohnsteuer-vvi.ts

import { berechneLohnsteuerJahr } from '../lib/berechnungen/lohnsteuer';

const BMF_V: Array<[number, number]> = [
  [800, 73.83], [1000, 96.00], [1200, 118.16], [1500, 153.50],
  [2000, 303.00], [2500, 472.00], [3000, 632.33], [4000, 955.00],
  [5000, 1292.91], [7000, 2019.75],
];
const BMF_VI: Array<[number, number]> = [
  [800, 90.08], [1000, 112.58], [1200, 135.08], [1500, 178.41],
  [2000, 347.33], [2500, 516.25], [3000, 671.83], [4000, 999.33],
  [5000, 1337.25], [7000, 2064.08],
];

const vorsorge = { kvArt: 'gesetzlich' as const, kvZusatzbeitragProzent: 2.9, kinderUnter25: 0 };

console.log('=== Kl. V ===');
for (const [brutto, soll] of BMF_V) {
  const lstJahr = berechneLohnsteuerJahr(brutto * 12, 5, 0, vorsorge);
  const ist = lstJahr / 12;
  const delta = ist - soll;
  console.log(`  ${String(brutto).padStart(4)}€/Mo → ist ${ist.toFixed(2).padStart(8)} / soll ${soll.toFixed(2).padStart(8)} / Δ ${delta.toFixed(2).padStart(7)}`);
}

console.log('=== Kl. VI ===');
for (const [brutto, soll] of BMF_VI) {
  const lstJahr = berechneLohnsteuerJahr(brutto * 12, 6, 0, vorsorge);
  const ist = lstJahr / 12;
  const delta = ist - soll;
  console.log(`  ${String(brutto).padStart(4)}€/Mo → ist ${ist.toFixed(2).padStart(8)} / soll ${soll.toFixed(2).padStart(8)} / Δ ${delta.toFixed(2).padStart(7)}`);
}

console.log('=== Regression I/III/IV bei 1500 €/Mo ===');
for (const sk of [1, 3, 4] as const) {
  const r = berechneLohnsteuerJahr(1500 * 12, sk, 0, vorsorge);
  console.log(`  Kl. ${sk} → ${(r / 12).toFixed(2)} €/Mo`);
}

console.log('=== Zwischenwerte-Interpolation ===');
for (const [brutto, sk] of [[2200, 5], [3500, 5], [2200, 6], [3500, 6]] as const) {
  const r = berechneLohnsteuerJahr(brutto * 12, sk, 0, vorsorge);
  console.log(`  Kl. ${sk} ${brutto}€/Mo → ${(r / 12).toFixed(2)} €/Mo`);
}
