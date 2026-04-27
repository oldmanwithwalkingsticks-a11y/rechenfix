/**
 * Verify-Script für lib/berechnungen/feiertage.ts
 *
 * Prüft gegen externe Primärquellen:
 * - Ostersonntag-Sollwerte 2024-2030 (Bundesfinanzministerium / kalender.de)
 * - Bundesweite Feste 2026 + 2027 + 2028
 * - Fronleichnam-Karte (in NW vorhanden, in NI nicht)
 * - Reformationstag-Karte (in NI vorhanden, in HE nicht)
 * - Buß- und Bettag SN: Mittwoch vor 23.11.
 * - Anzahl Mo-Fr-Feiertage 2026 für freelancer-Konsumenten
 *
 * Aufruf: npx tsx scripts/verify-feiertage.ts
 */

import {
  berechneOstersonntag,
  getFeiertage,
  istFeiertag,
  anzahlFeiertage,
  anzahlBundesweiterFeiertageMoBisFr,
  type Bundesland,
} from '../lib/berechnungen/feiertage';

let pass = 0;
let fail = 0;

function eq<T>(name: string, ist: T, soll: T) {
  const ok = ist === soll;
  if (ok) {
    console.log(`  ✓ ${name}`);
    pass++;
  } else {
    console.log(`  ✗ ${name}\n      ist:  ${String(ist)}\n      soll: ${String(soll)}`);
    fail++;
  }
}

function eqDate(name: string, ist: Date, sollISO: string) {
  const istISO =
    `${ist.getFullYear()}-` +
    `${String(ist.getMonth() + 1).padStart(2, '0')}-` +
    `${String(ist.getDate()).padStart(2, '0')}`;
  const ok = istISO === sollISO;
  if (ok) {
    console.log(`  ✓ ${name} → ${istISO}`);
    pass++;
  } else {
    console.log(`  ✗ ${name}\n      ist:  ${istISO}\n      soll: ${sollISO}`);
    fail++;
  }
}

function findFeiertag(jahr: number, bl: Bundesland, name: string) {
  return getFeiertage(jahr, bl).find(f => f.name === name);
}

console.log('\n=== A) Ostersonntag-Sollwerte 2024-2030 ===\n');
eqDate('Ostern 2024', berechneOstersonntag(2024), '2024-03-31');
eqDate('Ostern 2025', berechneOstersonntag(2025), '2025-04-20');
eqDate('Ostern 2026', berechneOstersonntag(2026), '2026-04-05');
eqDate('Ostern 2027', berechneOstersonntag(2027), '2027-03-28');
eqDate('Ostern 2028', berechneOstersonntag(2028), '2028-04-16');
eqDate('Ostern 2029', berechneOstersonntag(2029), '2029-04-01');
eqDate('Ostern 2030', berechneOstersonntag(2030), '2030-04-21');

console.log('\n=== B) Bundesweite Feste 2026 (Stichproben gegen NW) ===\n');
const get = (j: number, bl: Bundesland, n: string) =>
  getFeiertage(j, bl).find(f => f.name === n)!.datum;

eqDate('Neujahr 2026', get(2026, 'nw', 'Neujahr'), '2026-01-01');
eqDate('Karfreitag 2026', get(2026, 'nw', 'Karfreitag'), '2026-04-03');
eqDate('Ostermontag 2026', get(2026, 'nw', 'Ostermontag'), '2026-04-06');
eqDate('1. Mai 2026', get(2026, 'nw', 'Tag der Arbeit'), '2026-05-01');
eqDate('Christi Himmelfahrt 2026', get(2026, 'nw', 'Christi Himmelfahrt'), '2026-05-14');
eqDate('Pfingstmontag 2026', get(2026, 'nw', 'Pfingstmontag'), '2026-05-25');
eqDate('Fronleichnam 2026 (NW)', get(2026, 'nw', 'Fronleichnam'), '2026-06-04');
eqDate('Tag der Deutschen Einheit 2026', get(2026, 'nw', 'Tag der Deutschen Einheit'), '2026-10-03');
eqDate('1. Weihnachtstag 2026', get(2026, 'nw', '1. Weihnachtstag'), '2026-12-25');
eqDate('2. Weihnachtstag 2026', get(2026, 'nw', '2. Weihnachtstag'), '2026-12-26');

console.log('\n=== C) Bundesweite bewegliche Feste 2027 ===\n');
eqDate('Karfreitag 2027', get(2027, 'nw', 'Karfreitag'), '2027-03-26');
eqDate('Ostermontag 2027', get(2027, 'nw', 'Ostermontag'), '2027-03-29');
eqDate('Christi Himmelfahrt 2027', get(2027, 'nw', 'Christi Himmelfahrt'), '2027-05-06');
eqDate('Pfingstmontag 2027', get(2027, 'nw', 'Pfingstmontag'), '2027-05-17');
eqDate('Fronleichnam 2027 (NW)', get(2027, 'nw', 'Fronleichnam'), '2027-05-27');

console.log('\n=== D) Bundesweite bewegliche Feste 2028 ===\n');
eqDate('Karfreitag 2028', get(2028, 'nw', 'Karfreitag'), '2028-04-14');
eqDate('Ostermontag 2028', get(2028, 'nw', 'Ostermontag'), '2028-04-17');
eqDate('Christi Himmelfahrt 2028', get(2028, 'nw', 'Christi Himmelfahrt'), '2028-05-25');
eqDate('Pfingstmontag 2028', get(2028, 'nw', 'Pfingstmontag'), '2028-06-05');

console.log('\n=== E) BL-spezifische Karten ===\n');
eq('Fronleichnam in NW', !!findFeiertag(2026, 'nw', 'Fronleichnam'), true);
eq('Fronleichnam NICHT in NI', !!findFeiertag(2026, 'ni', 'Fronleichnam'), false);
eq('Fronleichnam NICHT in BE', !!findFeiertag(2026, 'be', 'Fronleichnam'), false);
eq('Reformationstag in NI', !!findFeiertag(2026, 'ni', 'Reformationstag'), true);
eq('Reformationstag NICHT in HE', !!findFeiertag(2026, 'he', 'Reformationstag'), false);
eq('Reformationstag NICHT in BW', !!findFeiertag(2026, 'bw', 'Reformationstag'), false);
eq('Heilige Drei Könige in BY', !!findFeiertag(2026, 'by', 'Heilige Drei Könige'), true);
eq('Heilige Drei Könige NICHT in NW', !!findFeiertag(2026, 'nw', 'Heilige Drei Könige'), false);
eq('Allerheiligen in BW', !!findFeiertag(2026, 'bw', 'Allerheiligen'), true);
eq('Allerheiligen NICHT in HH', !!findFeiertag(2026, 'hh', 'Allerheiligen'), false);
eq('Mariä Himmelfahrt in BY', !!findFeiertag(2026, 'by', 'Mariä Himmelfahrt'), true);
eq('Mariä Himmelfahrt NICHT in NW', !!findFeiertag(2026, 'nw', 'Mariä Himmelfahrt'), false);
eq('Frauentag in BE', !!findFeiertag(2026, 'be', 'Internationaler Frauentag'), true);
eq('Frauentag NICHT in BB', !!findFeiertag(2026, 'bb', 'Internationaler Frauentag'), false);
eq('Weltkindertag in TH', !!findFeiertag(2026, 'th', 'Weltkindertag'), true);
eq('Weltkindertag NICHT in SN', !!findFeiertag(2026, 'sn', 'Weltkindertag'), false);

console.log('\n=== F) Buß- und Bettag (SN): Mittwoch vor 23.11. ===\n');
eqDate('Buß- und Bettag SN 2026', get(2026, 'sn', 'Buß- und Bettag'), '2026-11-18');
eqDate('Buß- und Bettag SN 2027', get(2027, 'sn', 'Buß- und Bettag'), '2027-11-17');
eqDate('Buß- und Bettag SN 2028', get(2028, 'sn', 'Buß- und Bettag'), '2028-11-22');
eqDate('Buß- und Bettag SN 2022 (Edge-Case 23.11. = Mi)',
  get(2022, 'sn', 'Buß- und Bettag'), '2022-11-16');
eq('Buß- und Bettag NICHT in BY', !!findFeiertag(2026, 'by', 'Buß- und Bettag'), false);

console.log('\n=== G) istFeiertag()-Lookup ===\n');
eq('25.12.2026 ist Feiertag in NW',
  istFeiertag(new Date(2026, 11, 25), 'nw')?.name, '1. Weihnachtstag');
eq('15.08.2026 ist Feiertag in BY',
  istFeiertag(new Date(2026, 7, 15), 'by')?.name, 'Mariä Himmelfahrt');
eq('15.08.2026 KEIN Feiertag in NW',
  istFeiertag(new Date(2026, 7, 15), 'nw'), null);
eq('Beliebiger Werktag (15.07.2026) KEIN Feiertag',
  istFeiertag(new Date(2026, 6, 15), 'nw'), null);

console.log('\n=== H) anzahlFeiertage()-Helper ===\n');
eq('Anzahl alle Feiertage NW 2026', anzahlFeiertage(2026, 'nw'), 11);
eq('Anzahl alle Feiertage BY 2026', anzahlFeiertage(2026, 'by'), 13);
eq('Anzahl alle Feiertage HE 2026', anzahlFeiertage(2026, 'he'), 10);
eq('Anzahl alle Feiertage SN 2026', anzahlFeiertage(2026, 'sn'), 11);

console.log('\n=== I) anzahlBundesweiterFeiertageMoBisFr (für Freelancer) ===\n');
eq('Bundesweit Mo-Fr 2026', anzahlBundesweiterFeiertageMoBisFr(2026), 7);
eq('Bundesweit Mo-Fr 2027', anzahlBundesweiterFeiertageMoBisFr(2027), 5);
eq('Bundesweit Mo-Fr 2028', anzahlBundesweiterFeiertageMoBisFr(2028), 8);

console.log('\n=== J) Sortierung & Vollständigkeit ===\n');
const allBL: Bundesland[] = ['bw','by','be','bb','hb','hh','he','mv','ni','nw','rp','sl','sn','st','sh','th'];
let sortOk = true;
for (const bl of allBL) {
  const liste = getFeiertage(2026, bl);
  for (let i = 1; i < liste.length; i++) {
    if (liste[i].datum.getTime() < liste[i - 1].datum.getTime()) {
      sortOk = false;
      console.log(`    Sortierfehler in ${bl}: ${liste[i - 1].name} > ${liste[i].name}`);
    }
  }
}
eq('Sortierung aufsteigend in allen 16 BL für 2026', sortOk, true);
let minOk = true;
for (const bl of allBL) {
  if (getFeiertage(2026, bl).length < 9) {
    minOk = false;
    console.log(`    BL ${bl} hat zu wenige Feiertage`);
  }
}
eq('Alle 16 BL haben ≥ 9 Feiertage', minOk, true);

console.log(`\n=== Resultat: ${pass} ✓ / ${fail} ✗ ===\n`);
process.exit(fail > 0 ? 1 : 0);
