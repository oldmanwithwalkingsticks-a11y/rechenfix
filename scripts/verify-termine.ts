/**
 * Verify: Quittungspflicht für wiederkehrende Termine (lib/termine.ts) und
 * Parität mit scripts/check-termine.mjs.
 *
 * Fälle 1–10 laufen gegen eine Testliste in diesem Skript. Ihre Sollwerte sind
 * aus dem Kalender abgezählt, nicht aus der Lib abgeleitet. Fall 11 vergleicht
 * die Lage der echten Liste mit der Ausgabe von check-termine.mjs (--json) an
 * allen Monatsersten 10/2026–12/2027 und um jedes offene Vorkommen herum.
 * Fall 12 prüft die Quittungen der echten Liste.
 *
 * Aufruf: npx tsx scripts/verify-termine.ts
 * Teil der prebuild-Kette, direkt nach check-termine.mjs.
 */
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import {
  TERMINE,
  getTerminlage,
  naechstesVorkommen,
  offenesVorkommen,
  type Termin,
  type Terminlage,
} from '../lib/termine';

type Fall = { name: string; soll: string; ist: string };

function termin(t: Partial<Termin> & Pick<Termin, 'datum' | 'vorlaufTage'>): Termin {
  return { id: 'test', titel: 'Test', bereich: 'Betrieb', was: 'Test', ...t };
}

function beschreibe(lage: Terminlage): string {
  const teile = [
    ...lage.ueberfaellig.map((e) => `überfällig ${e.datum}, tage ${e.tage}, unquittiert ${e.unquittiert}`),
    ...lage.faellig.map((e) => `fällig ${e.datum}, tage ${e.tage}`),
  ];
  return teile.length ? teile.join(' | ') : 'nichts gemeldet';
}

const lage = (heute: string, t: Termin) => beschreibe(getTerminlage(heute, [t]));

const einmalig = termin({ datum: '2026-10-01', vorlaufTage: 0 });
const jaehrlich = termin({ datum: '2026-10-15', vorlaufTage: 14, wiederholungMonate: 12 });
const jaehrlichQuittiert = termin({
  datum: '2026-10-15', vorlaufTage: 14, wiederholungMonate: 12,
  quittiertVorkommen: '2026-10-15', quittiertAm: '2026-10-05', quittungVermerk: 'Test',
});
const monatlichKappung = termin({
  datum: '2026-10-31', vorlaufTage: 0, wiederholungMonate: 1,
  quittiertVorkommen: '2026-10-31', quittiertAm: '2026-10-31', quittungVermerk: 'Test',
});
const monatlichOhne = termin({ datum: '2026-09-01', vorlaufTage: 2, wiederholungMonate: 1 });
const vierteljaehrlich = termin({
  datum: '2026-09-24', vorlaufTage: 7, wiederholungMonate: 3,
  quittiertVorkommen: '2026-09-24', quittiertAm: '2026-10-05', quittungVermerk: 'Test',
});

// --- Fall 11: Parität mit check-termine.mjs --------------------------------
function plusTage(iso: string, n: number): string {
  return new Date(new Date(`${iso}T00:00:00Z`).getTime() + n * 86400000).toISOString().slice(0, 10);
}
const stichtage = new Set<string>();
for (let i = 0; i < 15; i++) {
  // Monatserste von 2026-10-01 bis 2027-12-01
  stichtage.add(new Date(Date.UTC(2026, 9 + i, 1)).toISOString().slice(0, 10));
}
for (const t of TERMINE) {
  const o = offenesVorkommen(t);
  for (const n of [-1, 0, 1]) stichtage.add(plusTage(o, n));
}
const SKRIPT = join(__dirname, 'check-termine.mjs');
let erste: string | null = null;
for (const tag of Array.from(stichtage).sort()) {
  const roh = execFileSync(process.execPath, [SKRIPT, '--heute', tag, '--json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const mjs = JSON.stringify(JSON.parse(roh));
  const l = getTerminlage(tag);
  const lib = JSON.stringify([
    ...l.ueberfaellig.map((e) => ({ id: e.termin.id, datum: e.datum, tage: e.tage, ueberfaellig: true })),
    ...l.faellig.map((e) => ({ id: e.termin.id, datum: e.datum, tage: e.tage, ueberfaellig: false })),
  ]);
  if (mjs !== lib) {
    erste = `${tag}: check-termine ${mjs} / lib ${lib}`;
    break;
  }
}

// --- Fall 12: Quittungen der echten Liste ----------------------------------
const heute = new Date().toISOString().slice(0, 10);
const quittiert = TERMINE.filter((t) => t.quittiertVorkommen);
const quittungsFehler: string[] = [];
for (const t of quittiert) {
  const q = t.quittiertVorkommen!;
  if (!t.wiederholungMonate) quittungsFehler.push(`${t.id}: kein wiederkehrender Termin`);
  if (!t.quittiertAm || !t.quittungVermerk) quittungsFehler.push(`${t.id}: nicht alle drei Felder`);
  if (naechstesVorkommen(t, q) !== q) quittungsFehler.push(`${t.id}: ${q} ist kein Vorkommen`);
  if (t.quittiertAm && t.quittiertAm > heute) quittungsFehler.push(`${t.id}: quittiertAm nach heute`);
}

const faelle: Fall[] = [
  { name: '1 einmalig 2026-10-01, heute 2026-10-05', soll: 'überfällig 2026-10-01, tage -4, unquittiert false', ist: lage('2026-10-05', einmalig) },
  { name: '2 jährlich 2026-10-15, Vorlauf 14, heute 2026-10-05', soll: 'fällig 2026-10-15, tage 10', ist: lage('2026-10-05', jaehrlich) },
  { name: '3 wie 2, heute 2026-10-15', soll: 'fällig 2026-10-15, tage 0', ist: lage('2026-10-15', jaehrlich) },
  { name: '4 wie 2, heute 2026-10-16', soll: 'überfällig 2026-10-15, tage -1, unquittiert true', ist: lage('2026-10-16', jaehrlich) },
  { name: '5 wie 2, heute 2027-03-01 (rollt nicht weiter)', soll: 'überfällig 2026-10-15, tage -137, unquittiert true', ist: lage('2027-03-01', jaehrlich) },
  { name: '6 wie 2, quittiert 2026-10-15, heute 2026-10-16', soll: 'nichts gemeldet', ist: lage('2026-10-16', jaehrlichQuittiert) },
  { name: '7 wie 2, vorzeitig quittiert, heute 2026-10-05', soll: 'nichts gemeldet', ist: lage('2026-10-05', jaehrlichQuittiert) },
  { name: '8 monatlich 2026-10-31, quittiert 2026-10-31, heute 2026-12-01 (Monatskappung)', soll: 'überfällig 2026-11-30, tage -1, unquittiert true', ist: lage('2026-12-01', monatlichKappung) },
  { name: '9 monatlich 2026-09-01, Vorlauf 2, ohne Quittung, heute 2026-10-05', soll: 'nichts gemeldet', ist: lage('2026-10-05', monatlichOhne) },
  { name: '10 vierteljährlich 2026-09-24, quittiert 2026-09-24, heute 2026-12-25', soll: 'überfällig 2026-12-24, tage -1, unquittiert true', ist: lage('2026-12-25', vierteljaehrlich) },
  {
    name: `11 Parität check-termine.mjs --json und getTerminlage (${stichtage.size} Stichtage)`,
    soll: 'an allen Stichtagen identisch',
    ist: erste === null ? 'an allen Stichtagen identisch' : `erste Abweichung ${erste}`,
  },
  {
    name: `12 Quittungen der echten Liste (${quittiert.length})`,
    soll: 'alle gültig',
    ist: quittungsFehler.length === 0 ? 'alle gültig' : quittungsFehler.join('; '),
  },
];

let fehler = 0;
for (const f of faelle) {
  const ok = f.soll === f.ist;
  if (!ok) fehler++;
  console.log(`${ok ? '✓' : '✗'} ${f.name}\n    Soll: ${f.soll}\n    Ist:  ${f.ist}`);
}
console.log(`\n${faelle.length - fehler}/${faelle.length} grün`);
process.exit(fehler === 0 ? 0 : 1);
