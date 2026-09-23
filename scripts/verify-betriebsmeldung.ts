/**
 * Verify: Maschinenzeile der täglichen Betriebsmeldung (lib/betriebsmeldung.ts).
 *
 * Sollwerte stammen aus dem vereinbarten Format der Berichtswache (Schlüssel `betrieb`)
 * und aus dem Kalender (Berliner Zeit), nicht aus der Lib selbst.
 *
 * Aufruf: npx tsx scripts/verify-betriebsmeldung.ts
 */
import { baueMaschinenzeile } from '../lib/betriebsmeldung';

type Fall = { name: string; soll: string; ist: string };

const keineTermine = { ueberfaellig: [], faellig: [] };
const zweiOk = [{ ok: true }, { ok: true }];

const z1 = baueMaschinenzeile(zweiOk, keineTermine, new Date('2026-09-23T06:00:00Z'));
const z2 = baueMaschinenzeile([{ ok: true }, { ok: false }], keineTermine, new Date('2026-09-23T06:00:00Z'));
const z3 = baueMaschinenzeile(
  zweiOk,
  { ueberfaellig: [{ tage: -3 }, { tage: -1 }], faellig: [{ tage: 0 }, { tage: 0 }, { tage: 5 }] },
  new Date('2026-09-23T06:00:00Z'),
);
const z4 = baueMaschinenzeile(zweiOk, keineTermine, new Date('2026-10-25T06:00:00Z'));
const z5 = baueMaschinenzeile(zweiOk, keineTermine, new Date('2026-12-31T23:30:00Z'));
const alle = [z1, z2, z3, z4, z5];

const feld = (zeile: string, schluessel: string): string =>
  zeile.split('; ').find((s) => s.startsWith(schluessel + '=')) ?? '(fehlt)';

// Leseregel der Wache: ab dem ersten `:`, an `;` trennen, am ersten `=` teilen,
// Schlüssel trimmen und kleinschreiben.
function lesenWieWache(zeile: string): Record<string, string> {
  const rest = zeile.slice(zeile.indexOf(':') + 1);
  const out: Record<string, string> = {};
  for (const stueck of rest.split(';')) {
    const i = stueck.indexOf('=');
    if (i < 0) continue;
    out[stueck.slice(0, i).trim().toLowerCase()] = stueck.slice(i + 1).trim();
  }
  return out;
}

const SCHLUESSEL = ['lauf', 'datum', 'ki_proben', 'ki_fehler', 'termine_ueberfaellig', 'termine_heute', 'termine_vorlauf'];
const nichtAscii = alle.filter((z) => Array.from(z).some((c) => c.codePointAt(0)! >= 128));
const gelesen = alle.map(lesenWieWache);
const schluesselOk = gelesen.every(
  (g) => Object.keys(g).length === SCHLUESSEL.length && SCHLUESSEL.every((k) => k in g) && g.lauf === 'betrieb',
);

const faelle: Fall[] = [
  {
    name: '1 zwei Proben ok, keine Termine',
    soll: 'MASCHINENZEILE: lauf=betrieb; datum=23.09.2026; ki_proben=2; ki_fehler=0; termine_ueberfaellig=0; termine_heute=0; termine_vorlauf=0',
    ist: z1,
  },
  { name: '2 eine von zwei Proben nicht ok', soll: 'ki_fehler=1', ist: feld(z2, 'ki_fehler') },
  {
    name: '3 Termine 2 ueberfaellig, faellig 0/0/5',
    soll: 'termine_ueberfaellig=2; termine_heute=2; termine_vorlauf=1',
    ist: [feld(z3, 'termine_ueberfaellig'), feld(z3, 'termine_heute'), feld(z3, 'termine_vorlauf')].join('; '),
  },
  { name: '4 Umstellungstag 25.10.2026', soll: 'datum=25.10.2026', ist: feld(z4, 'datum') },
  { name: '5 Jahreswechsel 31.12. 23:30 UTC', soll: 'datum=01.01.2027', ist: feld(z5, 'datum') },
  { name: '6 nur ASCII (Faelle 1-5)', soll: '0 Zeilen mit Nicht-ASCII', ist: `${nichtAscii.length} Zeilen mit Nicht-ASCII` },
  {
    name: '7 Leseregel der Wache: genau 7 Schluessel, lauf=betrieb',
    soll: 'ja',
    ist: schluesselOk ? 'ja' : 'nein: ' + JSON.stringify(gelesen.map((g) => Object.keys(g))),
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
