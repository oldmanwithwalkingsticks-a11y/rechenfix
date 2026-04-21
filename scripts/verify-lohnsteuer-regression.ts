// Phase 5 von Prompt 118 — Breite Regression über alle LSt-Konsumenten.
// Ausführen: npx tsx scripts/verify-lohnsteuer-regression.ts
//
// Ziel: Vor/Nach-Vergleich Voll-PAP vs. 115b2-Stand. Für Kl. V/VI erwarten
// wir Δ ≈ 0 €/Mo (Lookup war ±5 € toleriert, PAP ist exakt). Für Kl. I/II/III/IV
// erwarten wir Δ ≤ 5 €/Mo (Grundtarif-Vereinfachung vs. Voll-PAP; der alte
// Grundtarif ignorierte Teile der Vorsorgepauschale-Staffel).

import { berechneLohnsteuerJahr } from '../lib/berechnungen/lohnsteuer';

interface Fall {
  name: string;
  brutto: number;   // € pro Monat
  stkl: 1 | 2 | 3 | 4 | 5 | 6;
}

const faelle: Fall[] = [
  { name: 'Kl. I @ 1500',  brutto: 1500, stkl: 1 },
  { name: 'Kl. I @ 3000',  brutto: 3000, stkl: 1 },
  { name: 'Kl. I @ 5000',  brutto: 5000, stkl: 1 },
  { name: 'Kl. II @ 2500', brutto: 2500, stkl: 2 },
  { name: 'Kl. III @ 3000',brutto: 3000, stkl: 3 },
  { name: 'Kl. III @ 5000',brutto: 5000, stkl: 3 },
  { name: 'Kl. IV @ 2500', brutto: 2500, stkl: 4 },
  { name: 'Kl. IV @ 4000', brutto: 4000, stkl: 4 },
  { name: 'Kl. V @ 1500',  brutto: 1500, stkl: 5 },
  { name: 'Kl. V @ 3000',  brutto: 3000, stkl: 5 },
  { name: 'Kl. VI @ 1500', brutto: 1500, stkl: 6 },
  { name: 'Kl. VI @ 3000', brutto: 3000, stkl: 6 },
];

console.log('=== Phase 5 — Breite Regression LSt-Konsumenten ===\n');
console.log('PAP-LSt (€/Mo) für die repräsentativen Bruttos über alle sechs Steuerklassen.');
console.log('Vergleiche gegen bmf-steuerrechner.de web für externe Validierung.');
console.log('');

for (const f of faelle) {
  const lstJahr = berechneLohnsteuerJahr(f.brutto * 12, f.stkl, 0, {
    kvArt: 'gesetzlich', kvZusatzbeitragProzent: 2.9, kinderUnter25: 0,
  });
  const lstMonat = lstJahr / 12;
  console.log(`  ${f.name.padEnd(20)} LSt/Mo ${lstMonat.toFixed(2).padStart(8)} €`);
}

console.log('\n20 BMF-Stützpunkte aus scripts/verify-lohnsteuer-pap.ts werden separat geprüft.');
