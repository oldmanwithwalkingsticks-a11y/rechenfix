/**
 * Verify-Script für die Barrierefreiheits-Regeln aus CLAUDE.md (Welle 201).
 *
 * Anlass: Die axe-Messung über alle 258 Seiten der Sitemap vom 02.11.2026 fand Eingabefelder ohne
 * Beschriftung auf 32 Seiten, Schalter ohne Namen, ein Auswahlfeld ohne Namen, Links im Fließtext, die
 * nur an der Farbe zu erkennen waren, und — in der Handyansicht — 475 waagerecht scrollbare Tabellen,
 * die per Tastatur nicht erreichbar waren. axe sah viele unverknüpfte <label> nicht, weil ein
 * Platzhalter wie „z. B. 75“ als Name durchgeht. Dieses Skript prüft die Regeln am Quelltext.
 *
 * Geprüft in components/ und app/ (ohne app/admin/), Kommentare ausgenommen:
 *  1. Jedes Eingabefeld (NummerEingabe, input, select, textarea; nicht checkbox, radio, hidden, submit,
 *     button, range) trägt id, aria-label oder aria-labelledby oder steht in einem <label>.
 *  2. Jedes feste htmlFor="x" hat in derselben Datei ein Element mit id="x", und jedes Feld mit fester
 *     id="x" ohne aria-label/aria-labelledby hat ein htmlFor="x" in derselben Datei.
 *  3. Jedes <div> mit overflow-x-auto trägt tabIndex (role="region" und aria-label dazu).
 *  4. Die alte Fließtext-Linkklasse „text-primary-600 dark:text-primary-400 hover:underline“ kommt nicht vor.
 *  5. Schalter (runder Knopf, der einen Zustand umkehrt) tragen role="switch" und aria-checked.
 *
 * Ausführen: npx tsx scripts/verify-barrierefreiheit.ts
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

const dateien = [...tsxDateien('components'), ...tsxDateien('app')]
  .map(p => p.replace(/\\/g, '/'))
  .filter(p => !p.startsWith('app/admin/'))
  .sort();

/** Kommentare entfernen, Zeilen erhalten (für Zeilennummern). */
function ohneKommentare(s: string): string {
  const leer = (m: string) => m.replace(/[^\n]/g, ' ');
  return s
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, leer)
    .replace(/\/\*[\s\S]*?\*\//g, leer)
    .replace(/^[ \t]*\/\/.*$/gm, leer);
}

const zeile = (s: string, i: number) => s.slice(0, i).split('\n').length;

/** Ende eines JSX-Tags ab s[i] === '<', mit verschachtelten {…} und Zeichenketten in den Attributen. */
function tagEnde(s: string, i: number): number {
  let tiefe = 0;
  let q: string | null = null;
  for (let j = i + 1; j < s.length; j++) {
    const c = s[j];
    if (q) {
      if (c === '\\') { j++; continue; }
      if (c === q) q = null;
    } else if (c === '"' || c === "'" || (c === '`' && tiefe > 0)) q = c;
    else if (c === '{') tiefe++;
    else if (c === '}') tiefe--;
    else if (c === '>' && tiefe === 0) return j;
  }
  return -1;
}

/** Alle Eingabefelder einer Datei: Tag, Attributtext, Position. */
function felderIn(s: string): { tag: string; attr: string; index: number }[] {
  const aus: { tag: string; attr: string; index: number }[] = [];
  for (const m of s.matchAll(/<(NummerEingabe|input|select|textarea)\b/g)) {
    const ende = tagEnde(s, m.index!);
    if (ende < 0) continue;
    aus.push({ tag: m[1], attr: s.slice(m.index! + m[0].length, ende), index: m.index! });
  }
  return aus;
}
const OHNE_NAMEN_OK = /type=["'](checkbox|radio|hidden|submit|button|range|reset|image)["']/;

type Fall = { name: string; ist: string | number; soll: string | number };
const faelle: Fall[] = [];
const unbeschriftet: string[] = [];
const forOhneZiel: string[] = [];
const idOhneLabel: string[] = [];
const scrollOhneTab: string[] = [];
const alteLinks: string[] = [];
const schalterOhneRolle: string[] = [];
let felder = 0;

for (const f of dateien) {
  const s = ohneKommentare(readFileSync(f, 'utf-8'));

  const fors = new Set([...s.matchAll(/htmlFor="([^"]+)"/g)].map(m => m[1]));
  for (const { attr, index } of felderIn(s)) {
    if (OHNE_NAMEN_OK.test(attr)) continue;
    felder++;
    if (/aria-label=|aria-labelledby=/.test(attr)) continue;
    const festeId = attr.match(/\bid="([^"]+)"/);
    if (festeId) {
      if (!fors.has(festeId[1])) idOhneLabel.push(`${f}:${zeile(s, index)} (${festeId[1]})`);
      continue;
    }
    if (/\bid=/.test(attr)) continue;
    const vor = s.slice(0, index);
    if (vor.lastIndexOf('<label') > vor.lastIndexOf('</label>')) continue;
    unbeschriftet.push(`${f}:${zeile(s, index)}`);
  }

  const ids = new Set([...s.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const m of s.matchAll(/htmlFor="([^"]+)"/g)) {
    if (!ids.has(m[1])) forOhneZiel.push(`${f}:${zeile(s, m.index!)} (${m[1]})`);
  }

  for (const m of s.matchAll(/<div\s+className=(?:"[^"]*\boverflow-x-auto\b[^"]*"|\{`[^`]*\boverflow-x-auto\b[^`]*`\})([^>]*)>/g)) {
    if (!/tabIndex=/.test(m[1])) scrollOhneTab.push(`${f}:${zeile(s, m.index!)}`);
  }

  for (const m of s.matchAll(/text-primary-600 dark:text-primary-400 hover:underline/g)) {
    alteLinks.push(`${f}:${zeile(s, m.index!)}`);
  }

  for (const m of s.matchAll(/<button\b((?:[^>{]|\{(?:[^{}]|\{[^{}]*\})*\})*)>/g)) {
    const attr = m[1];
    if (!/rounded-full/.test(attr) || !/set\w+\(!\w+\)/.test(attr)) continue;
    if (!/role="switch"/.test(attr) || !/aria-checked=/.test(attr)) schalterOhneRolle.push(`${f}:${zeile(s, m.index!)}`);
  }
}

const liste = (a: string[]) => (a.length ? ': ' + a.slice(0, 12).join(', ') + (a.length > 12 ? ` … (+${a.length - 12})` : '') : '');
faelle.push({ name: `Eingabefelder mit Beschriftung (${felder} Felder)${liste(unbeschriftet)}`, ist: unbeschriftet.length, soll: 0 });
faelle.push({ name: `htmlFor zeigt auf eine id in derselben Datei${liste(forOhneZiel)}`, ist: forOhneZiel.length, soll: 0 });
faelle.push({ name: `Feld mit fester id hat ein label htmlFor oder aria-label${liste(idOhneLabel)}`, ist: idOhneLabel.length, soll: 0 });
faelle.push({ name: `scrollbare Bereiche (overflow-x-auto) per Tastatur erreichbar${liste(scrollOhneTab)}`, ist: scrollOhneTab.length, soll: 0 });
faelle.push({ name: `Links im Fließtext unterstrichen (keine hover:underline-Fließtextklasse)${liste(alteLinks)}`, ist: alteLinks.length, soll: 0 });
faelle.push({ name: `Schalter mit role="switch" und aria-checked${liste(schalterOhneRolle)}`, ist: schalterOhneRolle.length, soll: 0 });

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nBarrierefreiheit: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
