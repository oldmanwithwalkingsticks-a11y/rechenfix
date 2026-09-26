#!/usr/bin/env node
// Pre-Deploy-Lint: Jeder Generator aus dem KI-Medieninventar steht auf /ki-transparenz
//
// ANLASS (Welle 151): Der Tageslauf von Peter Ki und Susanne Recht vom 26.09.2026 hat im
// Medieninventar den Generator „Kling AI 3.0 Omni" gefunden — zwei Medien zum
// Bankjahr-Artikel (/blog/bankjahr.mp4, /blog/bankjahr-video-standbild.jpg), im Inventar
// und live seit 22.09.2026 (W140a, 05cfc16). Die Generatortabelle auf /ki-transparenz
// nannte nur „Kling AI 3.0". Die Seite trifft eine Tatsachenangabe über die eingesetzten
// Systeme; sie war vier Tage lang unvollständig, und kein Build hat es bemerkt.
//
// SCHWESTERFALL: scripts/check-affiliate-partnerliste.mjs (Welle 142) — dieselbe Art
// Fehler an der Partnerliste der Datenschutzerklärung. Eine Aufzählung im Rechtstext, die
// still neben dem Code steht, läuft auseinander, sobald jemand etwas einbaut.
//
// WARUM DAS INVENTAR UND NICHT DIE GENERATOREN-TABELLE:
// Die Tabelle steht in scripts/ki-metadaten-schreiben.mjs, und dieses Skript ruft main()
// auf Modulebene auf. Ein Import würde es auslösen — es schreibt dann XMP-Metadaten in
// die Dateien unter public/blog/. Das Inventar public/ki-medien/inventar.json wird aus
// genau dieser Tabelle abgeleitet und im prebuild von
// `generate-ki-inventar.mjs --pruefen` gegen sie gehalten. Dieser Guard läuft deshalb
// danach und liest eine bereits geprüfte Datei.
//
// WARUM NUR EINE RICHTUNG:
// Geprüft wird Inventar → Seite: Jeder Generator des Inventars muss auf der Seite stehen.
// Umgekehrt nicht — die Seite nennt auch Claude (KI-Rechner, KI-Erklärung, Texte), das
// kein Medium erzeugt und nie im Inventar steht. Veraltete Namen auf der Seite (ein
// Generator, der nicht mehr eingesetzt wird) findet Peters Tageslauf.
//
// ZÄHLWEISE: Der Klammerzusatz des Inventarwerts fällt weg („Kling AI 3.0 Omni
// (Kuaishou)" → „Kling AI 3.0 Omni"). Die Namen werden nach Länge absteigend geprüft;
// je Name wird gezählt und danach jedes Vorkommen aus dem Arbeitstext entfernt, erst dann
// kommt der nächste, kürzere Name. Sonst zählte „Kling AI 3.0 Omni" als Treffer für
// „Kling AI 3.0", und ein fehlendes „Kling AI 3.0" fiele nicht auf, solange Omni
// genannt ist.
//
// SELBSTTEST vor jedem echten Lauf, am Seitentext im Speicher:
//   (1) alle Vorkommen von „ Omni" entfernt        → gemeldet wird genau „Kling AI 3.0 Omni"
//   (2) alle Vorkommen von „Kling AI 3.0" entfernt → gemeldet werden genau beide Kling-Namen
//   (3) „Kling AI 3.0" nur dort entfernt, wo kein „ Omni" folgt
//                                                  → gemeldet wird genau „Kling AI 3.0"
// Fall 3 prüft die Zählweise. Ohne ihn besteht ein Guard ohne den Entfernen-Schritt die
// Fälle 1 und 2 und meldet eine Seite, die nur „Kling AI 3.0 Omni" nennt, als vollständig
// (gemessen 26.09.2026 an einer Kopie ohne den Entfernen-Schritt: Exit 0).
// Grundlage des Selbsttests ist der Seitentext, ergänzt um die Namen, die im echten Lauf
// fehlen. Am unergänzten Text scheiterte der Selbsttest an jedem ANDEREN fehlenden Namen —
// ein künftig fehlender vierter Generator ergäbe dann Exit 2 „keine Aussage" statt
// Exit 1 mit seinem Namen.
//
// Exit 0: alle Generatoren genannt. Exit 1: mindestens einer fehlt.
// Exit 2: Selbsttest gescheitert oder Eingabe nicht auswertbar — keine Aussage.
//
// Aufruf: node scripts/check-ki-generatoren.mjs
//         node scripts/check-ki-generatoren.mjs --seite <pfad>   (Gegenprobe)

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', RESET = '\x1b[0m';

const argIdx = process.argv.indexOf('--seite');
const SEITE_PFAD = argIdx > -1 ? process.argv[argIdx + 1] : join(ROOT, 'app/ki-transparenz/page.tsx');
const INVENTAR_PFAD = join(ROOT, 'public/ki-medien/inventar.json');
const KLING = 'Kling AI 3.0';
const KLING_OMNI = 'Kling AI 3.0 Omni';

function keineAussage(text) {
  console.error(`${RED}✗ check-ki-generatoren: ${text}${RESET}`);
  process.exit(2);
}

// --- Generatoren aus dem Inventar ---
let inventar;
try {
  inventar = JSON.parse(readFileSync(INVENTAR_PFAD, 'utf8'));
} catch (e) {
  keineAussage(`public/ki-medien/inventar.json nicht lesbar — ${e.message}`);
}
const medien = Array.isArray(inventar.ki_medien) ? inventar.ki_medien : [];
const medienJeName = new Map();
for (const m of medien) {
  if (typeof m.generator !== 'string') continue;
  const name = m.generator.replace(/\s*\([^)]*\)\s*$/, '').trim();
  if (!name) continue;
  if (!medienJeName.has(name)) medienJeName.set(name, []);
  medienJeName.get(name).push(m.datei);
}
if (medienJeName.size === 0) {
  keineAussage('keine Generatoren im Inventar erkannt — Format prüfen, nicht abschalten');
}
const namen = [...medienJeName.keys()].sort((a, b) => b.length - a.length || a.localeCompare(b));

function fehlendeNamen(text) {
  let rest = text;
  const fehlt = [];
  for (const name of namen) {
    const anzahl = rest.split(name).length - 1;
    if (anzahl === 0) fehlt.push(name);
    rest = rest.split(name).join('');
  }
  return fehlt;
}

// --- Seite ---
let seite;
try {
  seite = readFileSync(SEITE_PFAD, 'utf8');
} catch (e) {
  keineAussage(`Seite nicht lesbar: ${SEITE_PFAD} — ${e.message}`);
}

const echt = fehlendeNamen(seite);

// --- Selbsttest ---
if (!medienJeName.has(KLING) || !medienJeName.has(KLING_OMNI)) {
  keineAussage(`Selbsttest gescheitert, keine Aussage — er braucht „${KLING}" und „${KLING_OMNI}" im Inventar.\n` +
    '  Steht einer davon nicht mehr drin, muss der Selbsttest auf zwei andere Namen umgestellt werden.');
}
const gleich = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
const basis = echt.length ? `${seite}\n${echt.join('\n')}` : seite;
const klingOhneOmni = new RegExp(`${KLING.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?! Omni)`, 'g');
const faelle = [
  { beschreibung: '„ Omni" entfernt', text: basis.split(' Omni').join(''), soll: [KLING_OMNI] },
  { beschreibung: `„${KLING}" entfernt`, text: basis.split(KLING).join(''), soll: [KLING, KLING_OMNI] },
  { beschreibung: `„${KLING}" ohne folgendes „ Omni" entfernt`, text: basis.replace(klingOhneOmni, ''), soll: [KLING] },
];
for (const f of faelle) {
  const ist = fehlendeNamen(f.text);
  if (!gleich(ist, f.soll)) {
    keineAussage(`Selbsttest gescheitert, keine Aussage (${f.beschreibung}).\n` +
      `  erwartet fehlend: ${f.soll.join(', ') || '—'}\n` +
      `  gemeldet fehlend: ${ist.join(', ') || '—'}`);
  }
}

// --- Echter Lauf ---
if (echt.length) {
  const bloecke = echt.map((name) => {
    const dateien = medienJeName.get(name);
    return `„${name}" fehlt auf /ki-transparenz\n` +
      `    Medien im Inventar: ${dateien.length}\n` +
      `    erste Dateien:      ${dateien.slice(0, 3).join(', ')}\n` +
      '    → Generatortabelle auf /ki-transparenz nachziehen (Susanne)';
  });
  console.error(`${RED}✗ check-ki-generatoren: ${bloecke.join('\n  ')}${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}✓ check-ki-generatoren: ${namen.length} Generatoren im Inventar (${medien.length} Medien), ` +
  `alle auf /ki-transparenz genannt; Selbsttest ${faelle.length}/${faelle.length}${RESET}`);
