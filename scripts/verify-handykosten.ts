/**
 * Verify-Script für lib/berechnungen/handykosten.ts (Welle 184).
 *
 * Reine Arithmetik, Sollwerte von Hand gerechnet:
 *   Seitenbeispiel: Tarif 15 € + Gerät 600 € / 24 Monate (25 €) + Option 5 € = 45 €/Monat,
 *     540 €/Jahr, 1.080 € über 24 Monate.
 *   + Anschlussgebühr 39,99 €: 39,99 / 24 = 1,66625 €/Monat → 46,66625 €; Jahr 540 + 39,99 × 12/24
 *     = 559,995 €; Laufzeit 1.080 + 39,99 = 1.119,99 €.
 *   12 Monate, Tarif 10 €, Anschluss 30 €: 10 + 2,50 = 12,50 €/Monat, Jahr 120 + 30 = 150 €.
 *   Monatlich kündbar, Tarif 10 €, Anschluss 30 €: erster Monat 40 €, Jahr 10 × 12 + 30 = 150 €.
 *   Monatlich kündbar, Tarif 10 €, Gerät 600 € Einmalkauf: Jahr 120 + 600 = 720 € (vorher 7.320 €).
 *   Raten 25 € × 12 Monate Laufzeit, Tarif 10 €: Jahr (10 + 25) × 12 = 420 €.
 *   Vergleich: aktueller Anbieter 50 €/Monat vs. Beispiel 45 €: 5 €/Monat, 600 − 540 = 60 €/Jahr.
 *
 * Ausführen: npx tsx scripts/verify-handykosten.ts
 */

import { berechneHandykosten, type HandykostenEingabe } from '../lib/berechnungen/handykosten';

const basis: HandykostenEingabe = {
  tarifpreis: 15, vertragslaufzeit: 24, geraetepreis: 600, hatRaten: false, monatlicheRate: 0,
  zusatzoptionen: 5, datenvolumen: 10, aktuellerAnbieter: 0,
};
const H = (o: Partial<HandykostenEingabe>) => berechneHandykosten({ ...basis, ...o });

type Fall = { name: string; ist: number; soll: number };
const faelle: Fall[] = [
  { name: 'Beispiel: 45 €/Monat',                         ist: H({}).effektiveMonatskosten, soll: 45 },
  { name: 'Beispiel: 540 €/Jahr',                         ist: H({}).jahreskosten, soll: 540 },
  { name: 'Beispiel: 1.080 € über 24 Monate',             ist: H({}).gesamtkosten, soll: 1080 },
  { name: '+ Anschluss 39,99 €: 46,67 €/Monat',           ist: H({ anschlussgebuehr: 39.99 }).effektiveMonatskosten, soll: 46.66625 },
  { name: '+ Anschluss 39,99 €: umgelegt 1,67 €/Monat',   ist: H({ anschlussgebuehr: 39.99 }).anschlussgebuehrProMonat, soll: 1.66625 },
  { name: '+ Anschluss 39,99 €: 560,00 €/Jahr',           ist: H({ anschlussgebuehr: 39.99 }).jahreskosten, soll: 559.995 },
  { name: '+ Anschluss 39,99 €: 1.119,99 € Laufzeit',     ist: H({ anschlussgebuehr: 39.99 }).gesamtkosten, soll: 1119.99 },
  { name: '12 Mon., Tarif 10, Anschluss 30: 12,50 €/M.',  ist: H({ tarifpreis: 10, vertragslaufzeit: 12, geraetepreis: 0, zusatzoptionen: 0, anschlussgebuehr: 30 }).effektiveMonatskosten, soll: 12.5 },
  { name: '12 Mon., Tarif 10, Anschluss 30: 150 €/Jahr',  ist: H({ tarifpreis: 10, vertragslaufzeit: 12, geraetepreis: 0, zusatzoptionen: 0, anschlussgebuehr: 30 }).jahreskosten, soll: 150 },
  { name: 'Monatlich, Tarif 10, Anschluss 30: 1. Monat',  ist: H({ tarifpreis: 10, vertragslaufzeit: 1, geraetepreis: 0, zusatzoptionen: 0, anschlussgebuehr: 30 }).effektiveMonatskosten, soll: 40 },
  { name: 'Monatlich, Tarif 10, Anschluss 30: 150 €/Jahr', ist: H({ tarifpreis: 10, vertragslaufzeit: 1, geraetepreis: 0, zusatzoptionen: 0, anschlussgebuehr: 30 }).jahreskosten, soll: 150 },
  { name: 'Monatlich, Gerät 600 € Kauf: 720 €/Jahr',      ist: H({ tarifpreis: 10, vertragslaufzeit: 1, zusatzoptionen: 0 }).jahreskosten, soll: 720 },
  { name: 'Raten 25 €, 12 Mon., Tarif 10: 420 €/Jahr',    ist: H({ tarifpreis: 10, vertragslaufzeit: 12, hatRaten: true, monatlicheRate: 25, zusatzoptionen: 0 }).jahreskosten, soll: 420 },
  { name: 'Ohne Anschlussfeld = 0 €',                     ist: H({}).anschlussgebuehrProMonat, soll: 0 },
  { name: 'Vergleich 50 €: Ersparnis 5 €/Monat',          ist: H({ aktuellerAnbieter: 50 }).ersparnisMontlich ?? NaN, soll: 5 },
  { name: 'Vergleich 50 €: Ersparnis 60 €/Jahr',          ist: H({ aktuellerAnbieter: 50 }).ersparnisJaehrlich ?? NaN, soll: 60 },
];

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) < 0.005;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(50)} ist ${f.ist.toFixed(4).padStart(10)}  soll ${String(f.soll).padStart(10)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
