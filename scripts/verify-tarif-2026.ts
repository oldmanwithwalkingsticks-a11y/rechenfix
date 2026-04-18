import { berechneBruttoNetto } from '../lib/berechnungen/brutto-netto.js';
import { berechneLohnsteuer } from '../lib/berechnungen/lohnsteuer.js';
import { berechneEinkommensteuer } from '../lib/berechnungen/einkommensteuer.js';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function run(
  label: string,
  eingabe: Parameters<typeof berechneBruttoNetto>[0],
  soll: Partial<{ lohnsteuer: number; pflegeversicherung: number; nettoMonat: number }>,
) {
  const r = berechneBruttoNetto(eingabe);
  console.log(`\n=== ${label} ===`);
  console.log(`Lohnsteuer : ${fmt(r.lohnsteuer)} €/M${soll.lohnsteuer !== undefined ? `   Ziel: ${fmt(soll.lohnsteuer)} €` : ''}`);
  console.log(`Soli       : ${fmt(r.solidaritaet)} €/M`);
  console.log(`KV (AN)    : ${fmt(r.krankenversicherung)} €/M`);
  console.log(`RV (AN)    : ${fmt(r.rentenversicherung)} €/M`);
  console.log(`AV (AN)    : ${fmt(r.arbeitslosenversicherung)} €/M`);
  console.log(`PV (AN)    : ${fmt(r.pflegeversicherung)} €/M${soll.pflegeversicherung !== undefined ? `   Ziel: ${fmt(soll.pflegeversicherung)} €` : ''}`);
  console.log(`Netto      : ${fmt(r.nettoMonat)} €/M${soll.nettoMonat !== undefined ? `   Ziel: ${fmt(soll.nettoMonat)} €` : ''}`);
}

// Testfall 1 aus Prompt 81/82 — Regression (kinderlos kalibriert)
run('TESTFALL 1 — 3.500 € · SK I · NRW · kinderlos · Zusatz 2,9 %', {
  bruttoMonat: 3500, steuerklasse: 1, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 0, kinderUnter25: 0, bundesland: 'NW',
  kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
  rvBefreit: false, abrechnungszeitraum: 'monat',
}, { lohnsteuer: 405.50, pflegeversicherung: 84.00, nettoMonat: 2333.25 });

// Testfall A aus Prompt 83 — Familie 2 Kinder
run('TESTFALL A — 5.000 € · SK III · NRW · 2 Kinder · Zusatz 2,9 %', {
  bruttoMonat: 5000, steuerklasse: 3, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 2, kinderUnter25: 2, bundesland: 'NW',
  kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
  rvBefreit: false, abrechnungszeitraum: 'monat',
}, { lohnsteuer: 409.00, pflegeversicherung: 77.50, nettoMonat: 3546.00 });

// Testfall B — kinderlos über 23, 4.000 €
run('TESTFALL B — 4.000 € · SK I · NRW · kinderlos · Zusatz 2,9 %', {
  bruttoMonat: 4000, steuerklasse: 1, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 0, kinderUnter25: 0, bundesland: 'NW',
  kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
  rvBefreit: false, abrechnungszeitraum: 'monat',
}, { pflegeversicherung: 96.00 });

// Testfall C — 4 Kinder
run('TESTFALL C — 5.000 € · SK III · NRW · 4 Kinder · Zusatz 2,9 %', {
  bruttoMonat: 5000, steuerklasse: 3, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 3, kinderUnter25: 4, bundesland: 'NW',
  kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
  rvBefreit: false, abrechnungszeitraum: 'monat',
}, { pflegeversicherung: 52.50 });

// Testfall D — 6 Kinder (Kappung)
run('TESTFALL D — 5.000 € · SK III · NRW · 6 Kinder · Zusatz 2,9 %', {
  bruttoMonat: 5000, steuerklasse: 3, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 3, kinderUnter25: 6, bundesland: 'NW',
  kvArt: 'gesetzlich', kvZusatzbeitrag: 2.9, kvPrivatBeitrag: 0,
  rvBefreit: false, abrechnungszeitraum: 'monat',
}, { pflegeversicherung: 40.00 });

// Prompt 84 — Lohnsteuer-Rechner Testfall A (5.000 · SK III · 2 Kinder)
console.log('\n--- PROMPT 84: Lohnsteuer-Rechner ---');
const lstA = berechneLohnsteuer({
  brutto: 5000, steuerklasse: 3, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 2, kinderUnter25: 2, jahresfreibetrag: 0, zeitraum: 'monat',
});
console.log(`Testfall A: LSt ${fmt(lstA.lohnsteuerMonat)} €/M   Ziel: 409,00 € (±2 €)`);

const lstC = berechneLohnsteuer({
  brutto: 3500, steuerklasse: 1, kirchensteuer: false, kirchensteuersatz: 9,
  kinderfreibetraege: 0, kinderUnter25: 0, jahresfreibetrag: 0, zeitraum: 'monat',
});
console.log(`Testfall C (Regression): LSt ${fmt(lstC.lohnsteuerMonat)} €/M   Ziel: 405,50 €`);

// Prompt 84 — Einkommensteuer-Rechner Testfall B (zvE 46.974 Splitting)
console.log('\n--- PROMPT 84: Einkommensteuer-Rechner ---');
const estB = berechneEinkommensteuer({
  zvE: 46974, splitting: true, jahr: 2026, kirchensteuer: false, kirchensteuersatz: 9,
});
console.log(`Testfall B: ESt/Jahr ${fmt(estB.einkommensteuer)} €   Ziel: 4.908 €`);
