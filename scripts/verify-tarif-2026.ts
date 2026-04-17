import { berechneBruttoNetto } from '../lib/berechnungen/brutto-netto.js';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

console.log('\n=== TESTFALL 1 — 3.500 €/Monat · StKl I · NRW · kinderlos · keine KiSt · KV-Zusatz 2,9 % ===\n');
const r1 = berechneBruttoNetto({
  bruttoMonat: 3500,
  steuerklasse: 1,
  kirchensteuer: false,
  kirchensteuersatz: 9,
  kinderfreibetraege: 0,
  bundesland: 'NW',
  kvArt: 'gesetzlich',
  kvZusatzbeitrag: 2.9,
  kvPrivatBeitrag: 0,
  rvBefreit: false,
  abrechnungszeitraum: 'monat',
});
console.log(`Lohnsteuer            : ${fmt(r1.lohnsteuer)} €/M   (Ziel BMF: 405,50)`);
console.log(`Soli                  : ${fmt(r1.solidaritaet)} €/M   (Ziel: 0,00)`);
console.log(`KV (AN 8,75 %)        : ${fmt(r1.krankenversicherung)} €/M   (Ziel: 306,25)`);
console.log(`RV (AN 9,3 %)         : ${fmt(r1.rentenversicherung)} €/M   (Ziel: 325,50)`);
console.log(`AV (AN 1,3 %)         : ${fmt(r1.arbeitslosenversicherung)} €/M   (Ziel: 45,50)`);
console.log(`PV (AN kinderlos 2,4 %): ${fmt(r1.pflegeversicherung)} €/M   (Ziel: 84,00)`);
console.log(`Netto                 : ${fmt(r1.nettoMonat)} €/M   (Ziel: 2.333,25)`);

console.log('\n=== TESTFALL 2 — 5.000 €/Monat · StKl III · NRW · 2 Kinder · keine KiSt · KV-Zusatz 2,9 % ===\n');
const r2 = berechneBruttoNetto({
  bruttoMonat: 5000,
  steuerklasse: 3,
  kirchensteuer: false,
  kirchensteuersatz: 9,
  kinderfreibetraege: 2,
  bundesland: 'NW',
  kvArt: 'gesetzlich',
  kvZusatzbeitrag: 2.9,
  kvPrivatBeitrag: 0,
  rvBefreit: false,
  abrechnungszeitraum: 'monat',
});
console.log(`Lohnsteuer            : ${fmt(r2.lohnsteuer)} €/M`);
console.log(`Soli                  : ${fmt(r2.solidaritaet)} €/M`);
console.log(`KV (AN 8,75 %)        : ${fmt(r2.krankenversicherung)} €/M`);
console.log(`RV (AN 9,3 %)         : ${fmt(r2.rentenversicherung)} €/M`);
console.log(`AV (AN 1,3 %)         : ${fmt(r2.arbeitslosenversicherung)} €/M`);
console.log(`PV (AN 2 Kinder 1,8 %): ${fmt(r2.pflegeversicherung)} €/M`);
console.log(`Netto                 : ${fmt(r2.nettoMonat)} €/M`);
