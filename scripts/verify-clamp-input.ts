/**
 * Verify-Script für die Eingabe-Klammerung in lib/zahlenformat.ts (Guard G3).
 *
 * Simuliert Tastendrücke wie ein controlled `<input type="number">`: Jedes
 * Zeichen wird an den aktuellen, bereits geklammerten Feldinhalt angehängt und
 * durch `clampInputValue` (onChange) geschickt; danach verlässt der Nutzer das
 * Feld, und `clampInputValueOnBlur` (onBlur) greift.
 *
 * Regel (28.09.2026, Karsten): Beim Tippen nur die Obergrenze klammern — weitere
 * Ziffern machen eine positive Zahl nur größer, die Obergrenze ist also schon
 * beim Tippen endgültig, die Untergrenze nicht. Bei min ≥ 0 kein Minuszeichen.
 * Die Untergrenze greift erst beim Verlassen des Feldes. Ein leeres Feld bleibt
 * beim Verlassen leer wie bisher.
 *
 * Anlass: Mit der alten Fassung ließ sich in einem Feld 18–99 „35“ nicht tippen
 * („3“ wurde sofort 18, dann „185“ → 99); live betroffen waren die Gewichtsfelder
 * 30–250 im Promille- und im Alkohol-Abbau-Rechner. Smoketest v3.2, Check C3b.
 *
 * Soll-Werte stammen aus der Regel oben, nicht aus dem Helfer (nicht zirkulär).
 * Negativkontrolle: Mit einem anderen Modulpfad als Argument läuft dasselbe Skript
 * gegen eine andere Fassung des Helfers; gegen die alte Fassung muss es am Fall
 * „35“ scheitern. Fehlt dem Modul `clampInputValueOnBlur` (alte Fassung), ändert
 * das Verlassen des Feldes nichts — so verhielt sich der Bestand.
 *
 * Run: npx tsx scripts/verify-clamp-input.ts [modulpfad]
 * Teil der prebuild-Kette.
 */

import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

type Klammer = (wert: string, min: number | null, max: number | null) => string;

interface Fall {
  name: string;
  getippt: string;
  min: number;
  max: number;
  soll: string;
}

// Die Fälle aus der Vorgabe vom 28.09.2026.
const FAELLE: Fall[] = [
  { name: '18–99: „35“ tippen', getippt: '35', min: 18, max: 99, soll: '35' },
  { name: '18–99: „5“ → nach blur 18', getippt: '5', min: 18, max: 99, soll: '18' },
  { name: '18–99: „199“ → 99', getippt: '199', min: 18, max: 99, soll: '99' },
  { name: '18–99: „-82“ → Minus abgewiesen, 82', getippt: '-82', min: 18, max: 99, soll: '82' },
  { name: '30–250: „65“ tippen', getippt: '65', min: 30, max: 250, soll: '65' },
  { name: '30–250: „80“ tippen', getippt: '80', min: 30, max: 250, soll: '80' },
  { name: '1–20: „15“ tippen', getippt: '15', min: 1, max: 20, soll: '15' },
  { name: 'leer verlassen → bleibt leer wie bisher', getippt: '', min: 18, max: 99, soll: '' },
];

function tippeUndVerlasse(fall: Fall, onChange: Klammer, onBlur: Klammer): { schritte: string[]; ende: string } {
  let feld = '';
  const schritte: string[] = [];
  for (const zeichen of fall.getippt) {
    feld = onChange(feld + zeichen, fall.min, fall.max);
    schritte.push(feld === '' ? '∅' : feld);
  }
  const ende = onBlur(feld, fall.min, fall.max);
  return { schritte, ende };
}

async function main(): Promise<void> {
  const pfad = process.argv[2]
    ? pathToFileURL(resolve(process.argv[2])).href
    : '../lib/zahlenformat';
  const modul = await import(pfad);
  const onChange: Klammer = modul.clampInputValue;
  const onBlur: Klammer = modul.clampInputValueOnBlur ?? ((w: string) => w);
  if (typeof onChange !== 'function') {
    console.error(`clampInputValue fehlt in ${pfad}`);
    process.exit(1);
  }
  if (!modul.clampInputValueOnBlur) {
    console.log('Hinweis: clampInputValueOnBlur fehlt — Verlassen des Feldes ändert nichts (alte Fassung).');
  }

  let gruen = 0;
  for (const fall of FAELLE) {
    const { schritte, ende } = tippeUndVerlasse(fall, onChange, onBlur);
    const ok = ende === fall.soll;
    if (ok) gruen++;
    const weg = schritte.length ? `${schritte.join(' → ')} → blur` : 'blur';
    console.log(
      `${ok ? '✓' : '✗'} ${fall.name.padEnd(42)} ${weg.padEnd(28)} ist ${JSON.stringify(ende).padEnd(6)} soll ${JSON.stringify(fall.soll)}`,
    );
  }
  console.log(`\nErgebnis: ${gruen}/${FAELLE.length} grün${gruen < FAELLE.length ? `, ${FAELLE.length - gruen} rot` : ''}.`);
  process.exit(gruen === FAELLE.length ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
