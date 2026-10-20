/**
 * Verify-Script für lib/berechnungen/elterngeld.ts (Welle 187).
 *
 * Anlass: Die Ersatzrate sank erst ab 1.240 € Netto (Plateau 1.000–1.240 €). § 2 Abs. 2 S. 2 BEEG:
 * „In den Fällen, in denen das Einkommen aus Erwerbstätigkeit vor der Geburt höher als 1 200 Euro war,
 * sinkt der Prozentsatz von 67 Prozent um 0,1 Prozentpunkte für je 2 Euro, um die dieses Einkommen den
 * Betrag von 1 200 Euro überschreitet, auf bis zu 65 Prozent.“ → 65 % ab 1.240 €.
 *
 * Externe Quellen (gesetze-im-internet.de/beeg/__2.html):
 *   - § 2 Abs. 1: 67 %, Höchstbetrag 1.800 € (Satz 2)
 *   - § 2 Abs. 2 S. 1: unter 1.000 € +0,1 Prozentpunkte je 2 € bis 100 %; S. 2: über 1.200 € −0,1 je 2 € bis 65 %
 *   - § 2 Abs. 3 S. 2: Vor-Geburt-Einkommen beim Unterschiedsbetrag höchstens 2.770 €
 *   - § 2 Abs. 4: Mindestbetrag 300 €
 *
 * Ausführen: npx tsx scripts/verify-elterngeld.ts
 */

import { berechneElterngeld, berechneErsatzrate } from '../lib/berechnungen/elterngeld';

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

const E = (nettoVorGeburt: number, nettoDanach = 0) =>
  berechneElterngeld({ nettoVorGeburt, nettoDanach, variante: 'basis', mehrlinge: false, geschwisterbonus: false })!;

// Ersatzrate nach § 2 Abs. 1, 2 BEEG
faelle.push(
  { name: '900 €: 67 % + 50 × 0,1 = 72 %',          ist: berechneErsatzrate(900),  soll: 0.72 },
  { name: '1.000 €: 67 %',                         ist: berechneErsatzrate(1000), soll: 0.67 },
  { name: '1.200 €: 67 % (Plateau-Ende)',          ist: berechneErsatzrate(1200), soll: 0.67 },
  { name: '1.210 €: 67 % − 5 × 0,1 = 66,5 %',      ist: berechneErsatzrate(1210), soll: 0.665 },
  { name: '1.220 €: 66 %',                         ist: berechneErsatzrate(1220), soll: 0.66 },
  { name: '1.240 €: 65 % (Untergrenze erreicht)',  ist: berechneErsatzrate(1240), soll: 0.65 },
  { name: '1.260 €: 65 %',                         ist: berechneErsatzrate(1260), soll: 0.65 },
  { name: '2.500 €: 65 %',                         ist: berechneErsatzrate(2500), soll: 0.65 },
  { name: '300 €: 100 % (Obergrenze)',             ist: berechneErsatzrate(300),  soll: 1.0 },
);

// Beträge
faelle.push(
  { name: '1.230 €: 67 − 15 × 0,1 = 65,5 % → 805,65 €', ist: E(1230).monatlich, soll: 805.65 },
  { name: '1.240 €: 1.240 × 65 % = 806,00 €',       ist: E(1240).monatlich, soll: 806 },
  { name: 'Seite: 2.500 € × 65 % = 1.625 €',        ist: E(2500).monatlich, soll: 1625 },
  { name: 'Seite: 2.000 € × 65 % = 1.300 €',        ist: E(2000).monatlich, soll: 1300 },
  { name: 'Seite: 1.000 € × 67 % = 670 €',          ist: E(1000).monatlich, soll: 670 },
  { name: 'Seite: 900 € × 72 % = 648 €',            ist: E(900).monatlich, soll: 648 },
  { name: 'Höchstbetrag 1.800 € ab 2.770 €',        ist: E(2770).monatlich, soll: 1800 },
  { name: 'Höchstbetrag bei 4.000 €',               ist: E(4000).monatlich, soll: 1800 },
  { name: '2.760 €: 2.760 × 65 % = 1.794 €',        ist: E(2760).monatlich, soll: 1794 },
  { name: 'Mindestbetrag 300 € ohne Einkommen',     ist: E(0).monatlich, soll: 300 },
  // § 2 Abs. 3: 4.000 € vor, 1.500 € danach → (2.770 − 1.500) × 65 % = 825,50 €
  { name: 'Teilzeit: (2.770 − 1.500) × 65 % = 825,50', ist: E(4000, 1500).monatlich, soll: 825.5 },
  // 1.250 € vor, 500 € danach → Rate nach Vor-Geburt-Einkommen (65 %): 750 × 65 % = 487,50 €
  { name: 'Teilzeit: (1.250 − 500) × 65 % = 487,50',   ist: E(1250, 500).monatlich, soll: 487.5 },
);

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005);
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(48)} ist ${String(f.ist).padStart(9)}  soll ${String(f.soll).padStart(9)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
