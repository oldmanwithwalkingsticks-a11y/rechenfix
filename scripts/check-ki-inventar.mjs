#!/usr/bin/env node
// Pre-Deploy-Lint: Die drei Listen der KI-Medien müssen deckungsgleich sein.
//
// Regel 1: Jeder Schlüssel der GENERATOREN-Tabelle in
//          scripts/ki-metadaten-schreiben.mjs MUSS einen Eintrag in
//          public/ki-medien/inventar.json haben — und umgekehrt.
// Regel 2: Der `generator` im Inventar MUSS mit dem Wert in der Tabelle
//          übereinstimmen. Eine falsche Herstellerangabe in der Kennzeichnung
//          nach Art. 50 KI-VO ist schlimmer als gar keine.
// Regel 3: Jede in beiden Listen geführte Datei MUSS in public/blog/
//          tatsächlich existieren — und jede KI-Mediendatei dort MUSS in
//          beiden Listen stehen.
//
// Warum als Guard und nicht als Checklistenpunkt (Welle 125, 27.08.2026):
// In Welle 115 sind die drei Medien von Artikel 17 nicht ins Inventar
// eingetragen worden. Die Lücke lag zwölf Tage unbemerkt, weil kein Schritt
// die beiden Listen vergleicht. Eine Checkliste kann man übersehen, ein Glied
// der prebuild-Kette nicht. Das Inventar ist laut eigenem `_hinweis` die
// Grundlage für den Soll-Ist-Abgleich der Kennzeichen-Wache (Skill peter-ki) —
// ein stilles Auseinanderlaufen entwertet diese Prüfung vollständig.
//
// In Welle 124 kam der zweite Fall dazu: Beim Wechsel von .png auf .jpg ändert
// sich neben dem Dateinamen auch der Generator (Gemini -> Kling), weil das
// Standbild ab dann ein Einzelbild aus dem Video ist. Regel 2 fängt genau das.
//
// Aufruf: node scripts/check-ki-inventar.mjs
// Exit 0 bei grün (ohne Ausgabe), Exit 1 mit klarer Meldung bei Treffer.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function fail(msg) {
  console.error(`${RED}FEHLER check-ki-inventar:${RESET} ${msg}`);
  process.exit(1);
}

// --- 1. GENERATOREN-Tabelle einlesen -------------------------------------
const SKRIPT = 'scripts/ki-metadaten-schreiben.mjs';
const skriptSrc = readFileSync(join(ROOT, SKRIPT), 'utf8');

const start = skriptSrc.indexOf('const GENERATOREN');
if (start === -1) {
  fail(`GENERATOREN-Block in ${SKRIPT} nicht gefunden (Umbenennung oder Refactor?).\n` +
    '  Ein stillschweigend nicht prüfender Guard ist schlimmer als keiner.');
}
const ende = skriptSrc.indexOf('};', start);
if (ende === -1) {
  fail(`GENERATOREN-Block gefunden, aber kein Abschluss '};' — Struktur unerwartet.`);
}
const block = skriptSrc.slice(start, ende);

const tabelle = new Map();
for (const m of block.matchAll(/^\s*'([^']+)':\s*'([^']+)',/gm)) {
  if (tabelle.has(m[1])) {
    fail(`Doppelter Schlüssel in der GENERATOREN-Tabelle: ${m[1]}`);
  }
  tabelle.set(m[1], m[2]);
}

// --- 2. Inventar einlesen -------------------------------------------------
const INVENTAR = 'public/ki-medien/inventar.json';
let inv;
try {
  inv = JSON.parse(readFileSync(join(ROOT, INVENTAR), 'utf8'));
} catch (e) {
  fail(`${INVENTAR} ist nicht lesbar oder kein gültiges JSON: ${e.message}`);
}
if (!Array.isArray(inv.ki_medien)) {
  fail(`${INVENTAR}: Schlüssel 'ki_medien' fehlt oder ist kein Array — Struktur geändert?`);
}

const inventar = new Map();
for (const e of inv.ki_medien) {
  if (!e.datei || !e.generator) {
    fail(`${INVENTAR}: Eintrag ohne 'datei' oder 'generator': ${JSON.stringify(e)}`);
  }
  const name = e.datei.split('/').pop();
  if (inventar.has(name)) {
    fail(`${INVENTAR}: Datei doppelt eingetragen: ${e.datei}`);
  }
  inventar.set(name, e);
}

// --- 3. Plausibilität: still-grüner Guard ist wertlos ---------------------
const MINDESTZAHL = 30;
if (tabelle.size < MINDESTZAHL) {
  fail(`Nur ${tabelle.size} Einträge aus der GENERATOREN-Tabelle gelesen (erwartet >= ${MINDESTZAHL}).\n` +
    '  Vermutlich hat sich die Schreibweise der Tabelle geändert und der Guard prüft ins Leere.');
}
if (inventar.size < MINDESTZAHL) {
  fail(`Nur ${inventar.size} Einträge aus ${INVENTAR} gelesen (erwartet >= ${MINDESTZAHL}).\n` +
    '  Vermutlich hat sich die Struktur geändert und der Guard prüft ins Leere.');
}

// --- 4. Regel 1: beide Richtungen abgleichen ------------------------------
const fehltImInventar = [...tabelle.keys()].filter((k) => !inventar.has(k)).sort();
const fehltInTabelle = [...inventar.keys()].filter((k) => !tabelle.has(k)).sort();

if (fehltImInventar.length) {
  fail(`${fehltImInventar.length} Medien stehen in der GENERATOREN-Tabelle, aber nicht in ${INVENTAR}:\n` +
    fehltImInventar.map((f) => `    ${f}   (Generator: ${tabelle.get(f)})`).join('\n') +
    `\n  Nachtragen und '_stand' aktualisieren. Das Inventar ist die Grundlage der Kennzeichen-Wache;` +
    '\n  fehlende Einträge werden dort nie geprüft.');
}

if (fehltInTabelle.length) {
  fail(`${fehltInTabelle.length} Medien stehen in ${INVENTAR}, aber nicht in der GENERATOREN-Tabelle:\n` +
    fehltInTabelle.map((f) => `    ${f}`).join('\n') +
    `\n  Entweder in ${SKRIPT} eintragen oder aus dem Inventar entfernen.` +
    '\n  Ohne Tabelleneintrag bekommt die Datei keine XMP-Kennzeichnung (Art. 50 Abs. 4 KI-VO).');
}

// --- 5. Regel 2: Generator muss übereinstimmen ----------------------------
const generatorAbweichung = [];
for (const [name, gen] of tabelle) {
  const e = inventar.get(name);
  if (e.generator !== gen) {
    generatorAbweichung.push(`    ${name}\n      Tabelle : ${gen}\n      Inventar: ${e.generator}`);
  }
}
if (generatorAbweichung.length) {
  fail(`${generatorAbweichung.length} Medien mit abweichendem Generator:\n` +
    generatorAbweichung.join('\n') +
    '\n  Eine falsche Herstellerangabe in der Kennzeichnung ist schlimmer als gar keine.' +
    '\n  Typischer Fall: Ein Standbild wurde vom Bildgenerator auf einen Videoframe umgestellt,' +
    '\n  ohne den Generator mitzuziehen (siehe Welle 124).');
}

// --- 6. Regel 3: Dateibestand gegen die Listen ----------------------------
const BLOG = join(ROOT, 'public', 'blog');
const fehlendeDatei = [...tabelle.keys()].filter((k) => !existsSync(join(BLOG, k))).sort();
if (fehlendeDatei.length) {
  fail(`${fehlendeDatei.length} in den Listen geführte Medien fehlen in public/blog/:\n` +
    fehlendeDatei.map((f) => `    ${f}`).join('\n') +
    '\n  Datei gelöscht oder umbenannt? Dann gehören beide Listen mitgezogen.');
}

const MEDIEN_ENDUNGEN = /\.(png|jpg|jpeg|webp|mp4|webm)$/i;
const unerfasst = readdirSync(BLOG)
  .filter((f) => MEDIEN_ENDUNGEN.test(f))
  .filter((f) => !tabelle.has(f))
  .sort();
if (unerfasst.length) {
  fail(`${unerfasst.length} Mediendateien in public/blog/ stehen in keiner der beiden Listen:\n` +
    unerfasst.map((f) => `    ${f}`).join('\n') +
    '\n  Jedes KI-erzeugte Medium braucht einen Eintrag in der GENERATOREN-Tabelle UND im Inventar.' +
    '\n  Handelt es sich ausnahmsweise NICHT um ein KI-erzeugtes Medium, muss es hier ausgenommen' +
    '\n  werden — mit einer Begründung im Kopf dieses Skripts, nicht stillschweigend.');
}

process.exit(0);
