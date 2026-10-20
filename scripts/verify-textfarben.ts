/**
 * Verify-Script für die Textfarben-Regel aus CLAUDE.md (Welle 188).
 *
 * Regel: Text auf weißem Grund mindestens `text-gray-600`, nie `-500`, `-400` oder `-300`
 * (`text-gray-500` #6b7280 hat auf Weiß 4,8:1, auf `bg-gray-100` nur 4,2:1 und fällt dort unter WCAG 2.1 AA 1.4.3).
 * Geprüft werden helle Klassen ohne Präfix; `dark:`, `hover:` usw. zählen nicht.
 * Ausnahmen: rein dekorative Zeichen und Text auf fest dunklem Grund, mit Datei und Anzahl unten gelistet.
 *
 * SVG-Grafiken im Blog: grauer Text nur mit fill="#9ca3af"; app/globals.css macht ihn im hellen Modus
 * zu #4b5563 (gray-600). Andere Grautöne für <text> würden an dieser Regel vorbeigehen.
 *
 * Ausführen: npx tsx scripts/verify-textfarben.ts
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function tsxDateien(ordner: string): string[] {
  const aus: string[] = [];
  for (const name of readdirSync(ordner)) {
    const p = join(ordner, name);
    if (statSync(p).isDirectory()) aus.push(...tsxDateien(p));
    else if (p.endsWith('.tsx')) aus.push(p);
  }
  return aus;
}

const dateien = [...tsxDateien('components'), ...tsxDateien('app')].map(p => p.replace(/\\/g, '/')).sort();
const HELL = /(?<![\w:/-])text-gray-(300|400|500)(?![\w-])/g;

// Zulässig: dekorative Zeichen bzw. fest dunkler Grund (Datei → Anzahl je Farbstufe)
const AUSNAHMEN: Record<string, Partial<Record<'300' | '400', number>>> = {
  'app/feedback/FeedbackClient.tsx': { '300': 1 },                 // leerer Bewertungsstern ★
  'app/finanzen/brutto-netto-tabelle/page.tsx': { '300': 1 },      // Pfeil → in Linkkarten
  'app/finanzen/mindestlohn-netto/page.tsx': { '300': 1 },         // Pfeil →
  'components/seo/BruttoNettoLongTail.tsx': { '300': 1 },          // Pfeil →
  'components/rechner/CountdownRechner.tsx': { '300': 1 },         // Trennzeichen „:“ der Uhr
  'components/AuthorBio.tsx': { '400': 1 },                        // Trennpunkt ·
  'components/rechner/GeburtstagRechner.tsx': { '400': 2 },        // Text auf bg-gray-900 (Live-Zähler)
};

type Fall = { name: string; ist: string | number; soll: string | number };
const faelle: Fall[] = [];

const gefunden: Record<string, Record<string, number>> = {};
let anzahl500 = 0;
const fund500: string[] = [];
for (const f of dateien) {
  const s = readFileSync(f, 'utf-8');
  for (const m of s.matchAll(HELL)) {
    if (m[1] === '500') {
      anzahl500++;
      if (fund500.length < 10) fund500.push(`${f}:${s.slice(0, m.index).split('\n').length}`);
    } else {
      (gefunden[f] ??= {})[m[1]] = (gefunden[f]?.[m[1]] ?? 0) + 1;
    }
  }
}

faelle.push({ name: `kein helles text-gray-500 in components/ und app/${fund500.length ? ' (z. B. ' + fund500.join(', ') + ')' : ''}`, ist: anzahl500, soll: 0 });

const nichtErlaubt = Object.entries(gefunden)
  .flatMap(([f, st]) => Object.entries(st).filter(([stufe, n]) => (AUSNAHMEN[f]?.[stufe as '300' | '400'] ?? 0) !== n).map(([stufe, n]) => `${f} text-gray-${stufe} ×${n}`));
faelle.push({ name: `helles text-gray-300/-400 nur in den Ausnahmen${nichtErlaubt.length ? ': ' + nichtErlaubt.join('; ') : ''}`, ist: nichtErlaubt.length, soll: 0 });

const veraltet = Object.entries(AUSNAHMEN)
  .flatMap(([f, st]) => Object.entries(st).filter(([stufe, n]) => (gefunden[f]?.[stufe] ?? 0) !== n).map(([stufe]) => `${f} text-gray-${stufe}`));
faelle.push({ name: `Ausnahmeliste aktuell${veraltet.length ? ': ' + veraltet.join('; ') : ''}`, ist: veraltet.length, soll: 0 });

const css = readFileSync('app/globals.css', 'utf-8');
faelle.push({ name: 'globals.css: SVG-Text #9ca3af hell → #4b5563', ist: /svg text\[fill="#9ca3af"\]\s*\{\s*fill:\s*#4b5563;/.test(css) ? 'ja' : 'nein', soll: 'ja' });
faelle.push({ name: 'globals.css: SVG-Text #9ca3af dunkel bleibt #9ca3af', ist: /\.dark svg text\[fill="#9ca3af"\]\s*\{\s*fill:\s*#9ca3af;/.test(css) ? 'ja' : 'nein', soll: 'ja' });

// SVG-Text mit anderen Grautönen (gray-200/300/500) würde an der globals.css-Regel vorbeigehen
const andereGraus: string[] = [];
for (const f of dateien.filter(d => d.startsWith('components/blog/'))) {
  const s = readFileSync(f, 'utf-8');
  for (const m of s.matchAll(/<text\b[^>]*\bfill="#(e5e7eb|d1d5db|6b7280)"/gi)) andereGraus.push(`${f}:${s.slice(0, m.index).split('\n').length}`);
}
faelle.push({ name: `Blog-SVG: grauer Text nur #9ca3af${andereGraus.length ? ': ' + andereGraus.join(', ') : ''}`, ist: andereGraus.length, soll: 0 });

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nTextfarben: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
