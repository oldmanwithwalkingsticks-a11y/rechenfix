/**
 * Verify-Script für lib/berechnungen/zeitzonen.ts (Welle 184, Uhrzeitrechner).
 *
 * Sollwerte unabhängig von Hand gerechnet aus den Umstellungsregeln und Standard-Offsets:
 *   - EU-Sommerzeit: letzter Sonntag März bis letzter Sonntag Oktober, 01:00 UTC
 *     (Richtlinie 2000/84/EG, https://eur-lex.europa.eu/eli/dir/2000/84/oj) →
 *     2026: 29.03. bis 25.10.; Berlin MEZ UTC+1 / MESZ UTC+2, London GMT UTC+0 / BST UTC+1.
 *   - USA: zweiter Sonntag März bis erster Sonntag November (15 U.S.C. § 260a,
 *     https://www.law.cornell.edu/uscode/text/15/260a) → 2026: 08.03. bis 01.11.;
 *     New York EST −5 / EDT −4, Chicago CST −6 / CDT −5, Los Angeles PST −8 / PDT −7.
 *   - New South Wales: erster Sonntag Oktober bis erster Sonntag April → 2026: AEDT (+11)
 *     bis 05.04., wieder ab 04.10.; dazwischen AEST (+10).
 *   - Ohne Sommerzeit: Tokio +9, Peking +8, Mumbai +5:30, Dubai +4.
 *   Kalender 2026: 01.03. ist ein Sonntag (→ 08., 29.03.), 01.10. ein Donnerstag (→ 04., 25.10.),
 *   01.11. ein Sonntag, 05.04. ein Sonntag.
 *
 * Ausführen: npx tsx scripts/verify-zeitzonen.ts
 */

import { rechneZeitzone, formatUtcOffset, istSommerzeit, ortszeitZuUtc } from '../lib/berechnungen/zeitzonen';

type Fall = { name: string; ist: number | string | boolean; soll: number | string | boolean };
const faelle: Fall[] = [];

const Z = (datum: string, zeit: string, von: string, nach: string) => rechneZeitzone(datum, zeit, von, nach)!;

faelle.push(
  // Befund W184: 20.10.2026 (MESZ) 12:00 Berlin = 19:00 Tokio (vorher 20:00)
  { name: '20.10.2026 12:00 Berlin (MESZ +2) → Tokio (+9)',      ist: Z('2026-10-20', '12:00', 'mez', 'jst').ziel,  soll: '19:00' },
  { name: '15.01.2026 12:00 Berlin (MEZ +1) → Tokio',            ist: Z('2026-01-15', '12:00', 'mez', 'jst').ziel,  soll: '20:00' },
  { name: '20.10.2026 Unterschied Berlin → Tokio = +420 min',     ist: Z('2026-10-20', '12:00', 'mez', 'jst').unterschiedMinuten, soll: 420 },
  { name: '20.10.2026 12:00 Berlin → New York (EDT −4)',          ist: Z('2026-10-20', '12:00', 'mez', 'est').ziel,  soll: '06:00' },
  { name: '27.10.2026 12:00 Berlin (MEZ) → New York (noch EDT)',  ist: Z('2026-10-27', '12:00', 'mez', 'est').ziel,  soll: '07:00' },
  { name: '03.11.2026 12:00 Berlin (MEZ) → New York (EST)',       ist: Z('2026-11-03', '12:00', 'mez', 'est').ziel,  soll: '06:00' },
  { name: '20.03.2026 12:00 Berlin (MEZ) → New York (schon EDT)', ist: Z('2026-03-20', '12:00', 'mez', 'est').ziel,  soll: '07:00' },
  { name: '20.10.2026 12:00 Berlin → Chicago (CDT −5)',           ist: Z('2026-10-20', '12:00', 'mez', 'cst').ziel,  soll: '05:00' },
  { name: '20.10.2026 12:00 Berlin → London (BST +1)',            ist: Z('2026-10-20', '12:00', 'mez', 'gmt').ziel,  soll: '11:00' },
  { name: '28.10.2026 12:00 Berlin → London (GMT)',               ist: Z('2026-10-28', '12:00', 'mez', 'gmt').ziel,  soll: '11:00' },
  { name: '20.10.2026 12:00 Berlin → Sydney (AEDT +11)',          ist: Z('2026-10-20', '12:00', 'mez', 'aest').ziel, soll: '21:00' },
  { name: '15.07.2026 12:00 Berlin (MESZ) → Sydney (AEST +10)',   ist: Z('2026-07-15', '12:00', 'mez', 'aest').ziel, soll: '20:00' },
  { name: '15.01.2026 12:00 Berlin (MEZ) → Sydney (AEDT)',        ist: Z('2026-01-15', '12:00', 'mez', 'aest').ziel, soll: '22:00' },
  { name: '20.10.2026 12:00 Berlin → Mumbai (+5:30)',             ist: Z('2026-10-20', '12:00', 'mez', 'ist').ziel,  soll: '15:30' },
  { name: '20.10.2026 Unterschied Berlin → Mumbai = +210 min',    ist: Z('2026-10-20', '12:00', 'mez', 'ist').unterschiedMinuten, soll: 210 },
  { name: '20.10.2026 12:00 Berlin → Dubai (+4)',                 ist: Z('2026-10-20', '12:00', 'mez', 'gst').ziel,  soll: '14:00' },
  { name: '15.01.2026 12:00 Berlin → Peking (+8)',                ist: Z('2026-01-15', '12:00', 'mez', 'chst').ziel, soll: '19:00' },
  { name: '20.10.2026 22:00 Berlin → Tokio 05:00',                ist: Z('2026-10-20', '22:00', 'mez', 'jst').ziel,  soll: '05:00' },
  { name: '20.10.2026 22:00 Berlin → Tokio: +1 Tag',              ist: Z('2026-10-20', '22:00', 'mez', 'jst').tagOffset, soll: 1 },
  { name: '20.10.2026 03:00 Berlin → Los Angeles (PDT −7) 18:00', ist: Z('2026-10-20', '03:00', 'mez', 'pst').ziel,  soll: '18:00' },
  { name: '20.10.2026 03:00 Berlin → Los Angeles: −1 Tag',        ist: Z('2026-10-20', '03:00', 'mez', 'pst').tagOffset, soll: -1 },
  { name: '20.10.2026 09:00 New York → Berlin 15:00',             ist: Z('2026-10-20', '09:00', 'est', 'mez').ziel,  soll: '15:00' },
  { name: 'Kürzel Berlin 20.10.2026 = MESZ',                      ist: Z('2026-10-20', '12:00', 'mez', 'jst').vonKuerzel, soll: 'MESZ' },
  { name: 'Kürzel Berlin 27.10.2026 = MEZ',                       ist: Z('2026-10-27', '12:00', 'mez', 'est').vonKuerzel, soll: 'MEZ' },
  { name: 'Kürzel New York 27.10.2026 = EDT',                     ist: Z('2026-10-27', '12:00', 'mez', 'est').nachKuerzel, soll: 'EDT' },
  { name: 'Sommerzeit Berlin 25.10.2026 00:30 UTC (vor 01:00)',   ist: istSommerzeit('Europe/Berlin', Date.UTC(2026, 9, 25, 0, 30)), soll: true },
  { name: 'Sommerzeit Berlin 25.10.2026 01:30 UTC (nach 01:00)',  ist: istSommerzeit('Europe/Berlin', Date.UTC(2026, 9, 25, 1, 30)), soll: false },
  { name: 'Sommerzeit Sydney 20.10.2026',                         ist: istSommerzeit('Australia/Sydney', Date.UTC(2026, 9, 20, 2)), soll: true },
  { name: '29.03.2026 02:30 Berlin gibt es nicht',                ist: Z('2026-03-29', '02:30', 'mez', 'gmt').uhrzeitUngueltig, soll: true },
  { name: '29.03.2026 03:30 Berlin ist gültig',                   ist: Z('2026-03-29', '03:30', 'mez', 'gmt').uhrzeitUngueltig, soll: false },
  { name: '29.03.2026 03:30 MESZ = 01:30 UTC = 02:30 BST London', ist: Z('2026-03-29', '03:30', 'mez', 'gmt').ziel,  soll: '02:30' },
  { name: 'ortszeitZuUtc 20.10.2026 12:00 Berlin = 10:00 UTC',    ist: ortszeitZuUtc('Europe/Berlin', 2026, 10, 20, 12, 0), soll: Date.UTC(2026, 9, 20, 10, 0) },
  { name: 'formatUtcOffset(120)',                                 ist: formatUtcOffset(120),  soll: 'UTC+2' },
  { name: 'formatUtcOffset(−240)',                                ist: formatUtcOffset(-240), soll: 'UTC−4' },
  { name: 'formatUtcOffset(330)',                                 ist: formatUtcOffset(330),  soll: 'UTC+5:30' },
  { name: 'Ungültige Eingabe → null',                             ist: rechneZeitzone('2026-10-20', '25:00', 'mez', 'jst') === null, soll: true },
);

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) < 0.005 : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(58)} ist ${String(f.ist).padStart(8)}  soll ${String(f.soll).padStart(8)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
