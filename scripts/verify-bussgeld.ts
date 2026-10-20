/**
 * Verify-Script für die Geschwindigkeits-Stufen in lib/berechnungen/bussgeld.ts (Welle 187).
 *
 * Anlass: 26–30 km/h innerorts und 26–40 km/h außerorts (PKW) zeigten „Fahrverbot: 1 Monat“,
 * obwohl der Bußgeldkatalog dort für Ersttäter kein Regelfahrverbot vorsieht.
 *
 * Externe Quellen (abgerufen 20.10.2026):
 *   - BKatV Anhang, Tabelle 1 Buchst. c (andere Kfz, Nr. 11.3.1–11.3.10):
 *     https://www.gesetze-im-internet.de/bkatv_2013/anhang.html
 *     bis 10: 30/20 €; 11–15: 50/40; 16–20: 70/60; 21–25: 115/100; 26–30: 180/150 (kein FV);
 *     31–40: 260/200 (FV 1 Monat nur innerorts); 41–50: 400/320 (1/1); 51–60: 560/480 (2/1);
 *     61–70: 700/600 (3/2); über 70: 800/700 (3/3).
 *   - § 4 Abs. 2 Satz 2 BKatV (Wiederholung ≥ 26 km/h binnen eines Jahres nach Rechtskraft → in der Regel Fahrverbot).
 *   - BKatV Anhang, Tabelle 1 Buchst. a (Nr. 11.1.6/11.1.7, LKW/Busse): 26–30 innerorts FV 1 Monat,
 *     31–40 außerorts FV 1 Monat (Regelfahrverbot bleibt für LKW erhalten).
 *
 * Ausführen: npx tsx scripts/verify-bussgeld.ts
 */

import { berechneBussgeld, type BussgeldEingabe } from '../lib/berechnungen/bussgeld';

const basis: BussgeldEingabe = {
  verstoss: 'geschwindigkeit', ueberschreitung: 26, ort: 'innerorts', fahrzeug: 'pkw',
  rotlichtPhase: 'unter1', abstandGeschwindigkeit: 100, abstandStufe: '5_10', alkoholStufe: '05_109',
  handyStufe: 'normal', parkStufe: 'unerlaubt',
};
const G = (kmh: number, ort: 'innerorts' | 'ausserorts', fahrzeug: 'pkw' | 'lkw' = 'pkw') =>
  berechneBussgeld({ ...basis, ueberschreitung: kmh, ort, fahrzeug });

type Fall = { name: string; ist: number | string | undefined; soll: number | string };
const faelle: Fall[] = [];

// PKW, Tabelle 1c: [km/h, Bußgeld innerorts, FV innerorts, Bußgeld außerorts, FV außerorts]
const tab: [number, number, number, number, number][] = [
  [10, 30, 0, 20, 0], [15, 50, 0, 40, 0], [20, 70, 0, 60, 0], [25, 115, 0, 100, 0],
  [26, 180, 0, 150, 0], [30, 180, 0, 150, 0], [31, 260, 1, 200, 0], [40, 260, 1, 200, 0],
  [41, 400, 1, 320, 1], [55, 560, 2, 480, 1], [65, 700, 3, 600, 2], [71, 800, 3, 700, 3],
];
for (const [kmh, bi, fi, ba, fa] of tab) {
  const i = G(kmh, 'innerorts');
  const a = G(kmh, 'ausserorts');
  faelle.push(
    { name: `PKW ${kmh} km/h innerorts: ${bi} €`, ist: i.bussgeld, soll: bi },
    { name: `PKW ${kmh} km/h innerorts: Fahrverbot ${fi}`, ist: i.fahrverbot, soll: fi },
    { name: `PKW ${kmh} km/h außerorts: ${ba} €`, ist: a.bussgeld, soll: ba },
    { name: `PKW ${kmh} km/h außerorts: Fahrverbot ${fa}`, ist: a.fahrverbot, soll: fa },
  );
}

// Wiederholungsfall nur als Hinweis
faelle.push(
  { name: 'PKW 26 innerorts: 1 Monat nur bei Wiederholung', ist: G(26, 'innerorts').fahrverbotWiederholung, soll: 1 },
  { name: 'PKW 26 innerorts: kein roter Fahrverbot-Hinweis', ist: G(26, 'innerorts').fahrverbotHinweis, soll: '' },
  { name: 'PKW 26 innerorts: Hinweis nennt § 4 Abs. 2 Satz 2 BKatV', ist: G(26, 'innerorts').hinweise.some((h) => h.includes('§ 4 Abs. 2 Satz 2 BKatV')) ? 'ja' : 'nein', soll: 'ja' },
  { name: 'PKW 26 innerorts: Schwere „mittel“ (vorher „schwer“)', ist: G(26, 'innerorts').schwere, soll: 'mittel' },
  { name: 'PKW 26 innerorts: 1 Punkt', ist: G(26, 'innerorts').punkte, soll: 1 },
  { name: 'PKW 35 außerorts: 1 Monat nur bei Wiederholung', ist: G(35, 'ausserorts').fahrverbotWiederholung, soll: 1 },
  { name: 'PKW 35 außerorts: 1 Punkt', ist: G(35, 'ausserorts').punkte, soll: 1 },
  { name: 'PKW 31 innerorts: kein Wiederholungs-Flag (Regelfahrverbot)', ist: G(31, 'innerorts').fahrverbotWiederholung, soll: 0 },
  { name: 'PKW 25 innerorts: kein Wiederholungs-Flag (< 26 km/h)', ist: G(25, 'innerorts').fahrverbotWiederholung, soll: 0 },
);

// LKW/Busse, Tabelle 1a: Regelfahrverbot 26–30 innerorts und 31–40 außerorts
faelle.push(
  { name: 'LKW 28 innerorts: Fahrverbot 1 (Nr. 11.1.6)', ist: G(28, 'innerorts', 'lkw').fahrverbot, soll: 1 },
  { name: 'LKW 28 außerorts: kein Regelfahrverbot (Nr. 11.1.6)', ist: G(28, 'ausserorts', 'lkw').fahrverbot, soll: 0 },
  { name: 'LKW 35 außerorts: Fahrverbot 1 (Nr. 11.1.7)', ist: G(35, 'ausserorts', 'lkw').fahrverbot, soll: 1 },
);

// W187: LKW-Regelsätze aus BKatV Anhang Tabelle 1a (vorher PKW × 1,3); Obergrenze jeder Stufe, „über 60“ mit 65 km/h.
// Quelle: https://www.gesetze-im-internet.de/bkatv_2013/anhang.html, Punkte Anlage 13 FeV.
faelle.push(
  { name: 'LKW 10 innerorts: 40 €, 0 P., Fahrverbot 0 (Nr. 11.1.1)', ist: [G(10, 'innerorts', 'lkw').bussgeld, G(10, 'innerorts', 'lkw').punkte, G(10, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '40/0/0' },
  { name: 'LKW 15 innerorts: 60 €, 0 P., Fahrverbot 0 (Nr. 11.1.2)', ist: [G(15, 'innerorts', 'lkw').bussgeld, G(15, 'innerorts', 'lkw').punkte, G(15, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '60/0/0' },
  { name: 'LKW 20 innerorts: 160 €, 1 P., Fahrverbot 0 (Nr. 11.1.4)', ist: [G(20, 'innerorts', 'lkw').bussgeld, G(20, 'innerorts', 'lkw').punkte, G(20, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '160/1/0' },
  { name: 'LKW 25 innerorts: 175 €, 1 P., Fahrverbot 0 (Nr. 11.1.5)', ist: [G(25, 'innerorts', 'lkw').bussgeld, G(25, 'innerorts', 'lkw').punkte, G(25, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '175/1/0' },
  { name: 'LKW 30 innerorts: 235 €, 2 P., Fahrverbot 1 (Nr. 11.1.6)', ist: [G(30, 'innerorts', 'lkw').bussgeld, G(30, 'innerorts', 'lkw').punkte, G(30, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '235/2/1' },
  { name: 'LKW 40 innerorts: 340 €, 2 P., Fahrverbot 1 (Nr. 11.1.7)', ist: [G(40, 'innerorts', 'lkw').bussgeld, G(40, 'innerorts', 'lkw').punkte, G(40, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '340/2/1' },
  { name: 'LKW 50 innerorts: 560 €, 2 P., Fahrverbot 2 (Nr. 11.1.8)', ist: [G(50, 'innerorts', 'lkw').bussgeld, G(50, 'innerorts', 'lkw').punkte, G(50, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '560/2/2' },
  { name: 'LKW 60 innerorts: 700 €, 2 P., Fahrverbot 3 (Nr. 11.1.9)', ist: [G(60, 'innerorts', 'lkw').bussgeld, G(60, 'innerorts', 'lkw').punkte, G(60, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '700/2/3' },
  { name: 'LKW 65 innerorts: 800 €, 2 P., Fahrverbot 3 (Nr. 11.1.10)', ist: [G(65, 'innerorts', 'lkw').bussgeld, G(65, 'innerorts', 'lkw').punkte, G(65, 'innerorts', 'lkw').fahrverbot].join('/'), soll: '800/2/3' },
  { name: 'LKW 10 ausserorts: 30 €, 0 P., Fahrverbot 0 (Nr. 11.1.1)', ist: [G(10, 'ausserorts', 'lkw').bussgeld, G(10, 'ausserorts', 'lkw').punkte, G(10, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '30/0/0' },
  { name: 'LKW 15 ausserorts: 50 €, 0 P., Fahrverbot 0 (Nr. 11.1.2)', ist: [G(15, 'ausserorts', 'lkw').bussgeld, G(15, 'ausserorts', 'lkw').punkte, G(15, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '50/0/0' },
  { name: 'LKW 20 ausserorts: 140 €, 1 P., Fahrverbot 0 (Nr. 11.1.4)', ist: [G(20, 'ausserorts', 'lkw').bussgeld, G(20, 'ausserorts', 'lkw').punkte, G(20, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '140/1/0' },
  { name: 'LKW 25 ausserorts: 150 €, 1 P., Fahrverbot 0 (Nr. 11.1.5)', ist: [G(25, 'ausserorts', 'lkw').bussgeld, G(25, 'ausserorts', 'lkw').punkte, G(25, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '150/1/0' },
  { name: 'LKW 30 ausserorts: 175 €, 1 P., Fahrverbot 0 (Nr. 11.1.6)', ist: [G(30, 'ausserorts', 'lkw').bussgeld, G(30, 'ausserorts', 'lkw').punkte, G(30, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '175/1/0' },
  { name: 'LKW 40 ausserorts: 255 €, 2 P., Fahrverbot 1 (Nr. 11.1.7)', ist: [G(40, 'ausserorts', 'lkw').bussgeld, G(40, 'ausserorts', 'lkw').punkte, G(40, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '255/2/1' },
  { name: 'LKW 50 ausserorts: 480 €, 2 P., Fahrverbot 1 (Nr. 11.1.8)', ist: [G(50, 'ausserorts', 'lkw').bussgeld, G(50, 'ausserorts', 'lkw').punkte, G(50, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '480/2/1' },
  { name: 'LKW 60 ausserorts: 600 €, 2 P., Fahrverbot 2 (Nr. 11.1.9)', ist: [G(60, 'ausserorts', 'lkw').bussgeld, G(60, 'ausserorts', 'lkw').punkte, G(60, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '600/2/2' },
  { name: 'LKW 65 ausserorts: 700 €, 2 P., Fahrverbot 3 (Nr. 11.1.10)', ist: [G(65, 'ausserorts', 'lkw').bussgeld, G(65, 'ausserorts', 'lkw').punkte, G(65, 'ausserorts', 'lkw').fahrverbot].join('/'), soll: '700/2/3' },
);

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nBußgeld Geschwindigkeit: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
