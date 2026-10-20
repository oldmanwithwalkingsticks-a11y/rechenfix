/**
 * Verify-Script für lib/berechnungen/urlaubstage.ts (Welle 179).
 *
 * Externe Quellen:
 *   - § 3 BUrlG (24 Werktage), § 4 BUrlG (Wartezeit sechs Monate),
 *     § 5 Abs. 1 a–c BUrlG (Teilurlaub), § 5 Abs. 2 BUrlG (Aufrundung ab 0,5):
 *     https://www.gesetze-im-internet.de/burlg/
 *   - BAG, 17.11.2015, 9 AZR 179/15: Vollurlaub erst NACH sechsmonatigem Bestehen;
 *     Eintritt 01.07. → Teilurlaub 6/12 im Eintrittsjahr.
 *   - BAG, 23.01.2018, 9 AZR 200/17: Bruchteile unter 0,5 Tagen nicht abrunden.
 *   - § 208 SGB IX: Zusatzurlaub eine Arbeitswoche (5 Tage bei 5-Tage-Woche).
 *
 * Ausführen: npx tsx scripts/verify-urlaubstage.ts
 */

import { berechneUrlaubsanspruch, berechneResturlaub } from '../lib/berechnungen/urlaubstage';

type Fall = { name: string; ist: number | string | boolean; soll: number | string | boolean };
const faelle: Fall[] = [];

const basis = {
  vertraglicheTage: 30,
  arbeitstageProWoche: 5 as 5 | 6,
  beschaeftigungsBeginn: null as string | null,
  beschaeftigungsEnde: null as string | null,
  teilzeit: false,
  teilzeitTage: 3,
  schwerbehindert: false,
};
const A = (o: Partial<typeof basis> & { zwoelftelungMehrurlaub?: boolean }) => berechneUrlaubsanspruch({ ...basis, ...o })!;

faelle.push(
  { name: 'Ganzes Jahr, 30 Tage',                         ist: A({}).gesamt,                                                        soll: 30 },
  { name: 'Ganzes Jahr: gesetzliches Minimum 20',         ist: A({}).gesetzlichMinimum,                                             soll: 20 },
  { name: 'Eintritt 01.04., 3-Tage-Woche → voll 18',      ist: A({ teilzeit: true, beschaeftigungsBeginn: '2026-04-01' }).gesamt,    soll: 18 },
  { name: 'Eintritt 01.04. → kein Teilurlaub',            ist: A({ beschaeftigungsBeginn: '2026-04-01' }).teilurlaub,               soll: false },
  { name: 'Eintritt 30.06. → voll 30',                    ist: A({ beschaeftigungsBeginn: '2026-06-30' }).gesamt,                   soll: 30 },
  { name: 'Eintritt 01.07. → 6/12 = 15',                  ist: A({ beschaeftigungsBeginn: '2026-07-01' }).gesamt,                   soll: 15 },
  { name: 'Eintritt 01.08., 3-Tage-Woche → 7,5 → 8',      ist: A({ teilzeit: true, beschaeftigungsBeginn: '2026-08-01' }).gesamt,    soll: 8 },
  { name: 'Eintritt 01.08. → 5 volle Monate',             ist: A({ beschaeftigungsBeginn: '2026-08-01' }).anteiligMonate ?? -1,     soll: 5 },
  { name: 'Eintritt 01.05., Zwölftelungsklausel → 27',    ist: A({ beschaeftigungsBeginn: '2026-05-01', zwoelftelungMehrurlaub: true }).gesamt, soll: 27 },
  { name: 'Eintritt 15.04., Klausel → 8 volle Monate',    ist: A({ beschaeftigungsBeginn: '2026-04-15', zwoelftelungMehrurlaub: true }).anteiligMonate ?? -1, soll: 8 },
  { name: 'Austritt 31.03. → 3/12 = 7,5 → 8',             ist: A({ beschaeftigungsEnde: '2026-03-31' }).gesamt,                     soll: 8 },
  { name: 'Austritt 15.03. → 2/12 = 5',                   ist: A({ beschaeftigungsEnde: '2026-03-15' }).gesamt,                     soll: 5 },
  { name: 'Austritt 15.03.: Minimum 3,33 (kein Abrunden)', ist: A({ beschaeftigungsEnde: '2026-03-15' }).gesetzlichMinimum,         soll: 3.33 },
  { name: 'Austritt 31.08. → voll 30',                    ist: A({ beschaeftigungsEnde: '2026-08-31' }).gesamt,                     soll: 30 },
  { name: '01.02.–31.07. (vor Vollurlaub) → 6/12 = 15',   ist: A({ beschaeftigungsBeginn: '2026-02-01', beschaeftigungsEnde: '2026-07-31' }).gesamt, soll: 15 },
  { name: '01.02.–31.08. → voll 30',                      ist: A({ beschaeftigungsBeginn: '2026-02-01', beschaeftigungsEnde: '2026-08-31' }).gesamt, soll: 30 },
  { name: '6-Tage-Woche, SB → 30 + 6 = 36',               ist: A({ arbeitstageProWoche: 6, schwerbehindert: true }).gesamt,         soll: 36 },
  { name: '6-Tage-Woche, 3 Tage, SB → 15 + 3 = 18',       ist: A({ arbeitstageProWoche: 6, schwerbehindert: true, teilzeit: true }).gesamt, soll: 18 },
  { name: '28 Tage, 4-Tage-Woche → 22,4 (kein Abrunden)', ist: A({ vertraglicheTage: 28, teilzeit: true, teilzeitTage: 4 }).gesamt,  soll: 22.4 },
  { name: 'Vertrag 18 Tage < 20 → gesetzlich 20',         ist: A({ vertraglicheTage: 18 }).gesamt,                                  soll: 20 },
  { name: 'Vertrag 18 Tage → Hinweis unter Minimum',      ist: A({ vertraglicheTage: 18 }).vertragUnterMinimum,                     soll: true },
);

const R = (datum: string, genommen: number) =>
  berechneResturlaub({ urlaubstageProJahr: 30, arbeitstageProWoche: 5, kuendigungsDatum: datum, bereitsGenommen: genommen })!;
faelle.push(
  { name: 'Resturlaub: Austritt 15.03. → Anspruch 5',     ist: R('2026-03-15', 2).anspruchBisKuendigung, soll: 5 },
  { name: 'Resturlaub: Austritt 30.06. → Anspruch 15',    ist: R('2026-06-30', 10).anspruchBisKuendigung, soll: 15 },
  { name: 'Resturlaub: Austritt 31.08. → 30 − 12 = 18',   ist: R('2026-08-31', 12).resturlaub, soll: 18 },
);

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) < 0.005 : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(52)} ist ${String(f.ist).padStart(6)}  soll ${String(f.soll).padStart(6)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
