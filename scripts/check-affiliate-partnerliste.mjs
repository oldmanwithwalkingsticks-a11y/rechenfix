#!/usr/bin/env node
// Pre-Deploy-Lint: Partnerliste der Datenschutzerklärung = Programme im Code
//
// Die Datenschutzerklärung sagt „Wir arbeiten derzeit mit folgenden Partnerprogrammen".
// Das ist eine Tatsachenangabe über den Codestand. Bis Welle 142 stand sie still neben
// dem Code und nannte sieben von vierzehn Programmen — sechs Einbauten lang hat es
// niemand bemerkt, weil die Dienste-Wache Awin als einen Dienst sieht, nicht die Liste
// dahinter.
//
// Regel: Jeder Schlüssel in AFFILIATE_PROGRAMS (components/AffiliateBox.tsx) steht genau
// einmal als data-programm="<schlüssel>" an einem <li> der Partnerliste in
// app/datenschutz/page.tsx — und umgekehrt. Jedes <li> der Liste trägt ein solches
// Attribut.
//
// Wer ein Programm einbaut oder entfernt, ändert deshalb im selben Zug den Rechtstext:
// eigener Commit mit „recht:"-Präfix, Eintrag in docs/rechtstexte/aenderungshistorie.md,
// sichtbares Stand-Datum.
//
// Aufruf: node scripts/check-affiliate-partnerliste.mjs
//         node scripts/check-affiliate-partnerliste.mjs --datenschutz <pfad>   (Gegenprobe)

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', RESET = '\x1b[0m';

const argIdx = process.argv.indexOf('--datenschutz');
const DS_PFAD = argIdx > -1 ? process.argv[argIdx + 1] : join(ROOT, 'app/datenschutz/page.tsx');
const AB_PFAD = join(ROOT, 'components/AffiliateBox.tsx');
const MARKE = 'Wir arbeiten derzeit mit folgenden Partnerprogrammen';

function fehler(text) {
  console.error(`${RED}✗ check-affiliate-partnerliste: ${text}${RESET}`);
  process.exit(1);
}

// --- Programme im Code ---
const ab = readFileSync(AB_PFAD, 'utf8');
const start = ab.indexOf('const AFFILIATE_PROGRAMS = {');
const ende = ab.indexOf('} as const;', start);
if (start < 0 || ende < 0) fehler('AFFILIATE_PROGRAMS-Block in components/AffiliateBox.tsx nicht gefunden');
const programme = [...ab.slice(start, ende).matchAll(/^  '?([A-Za-z0-9-]+)'?: \{/gm)].map(m => m[1]);
if (programme.length === 0) fehler('keine Programme in AFFILIATE_PROGRAMS erkannt — Muster prüfen, nicht abschalten');

// --- Liste in der Datenschutzerklärung ---
const ds = readFileSync(DS_PFAD, 'utf8');
const markeAt = ds.indexOf(MARKE);
if (markeAt < 0) fehler(`Einleitungssatz „${MARKE}" nicht gefunden in ${DS_PFAD}`);
if (ds.indexOf(MARKE, markeAt + 1) > -1) fehler('Einleitungssatz kommt mehrfach vor');
const ulStart = ds.indexOf('<ul', markeAt);
const ulEnde = ds.indexOf('</ul>', ulStart);
if (ulStart < 0 || ulEnde < 0) fehler('keine <ul> nach dem Einleitungssatz');
const liste = ds.slice(ulStart, ulEnde);
const liAnzahl = (liste.match(/<li[\s>]/g) || []).length;
const inListe = [...liste.matchAll(/data-programm="([^"]+)"/g)].map(m => m[1]);
const imRest = (ds.slice(0, ulStart) + ds.slice(ulEnde)).match(/data-programm="/g) || [];

const probleme = [];
if (imRest.length) probleme.push(`${imRest.length} data-programm-Attribut(e) außerhalb der Partnerliste`);
if (liAnzahl !== inListe.length) probleme.push(`${liAnzahl} Listeneinträge, aber ${inListe.length} mit data-programm`);
const doppelt = inListe.filter((p, i) => inListe.indexOf(p) !== i);
if (doppelt.length) probleme.push(`doppelt in der Liste: ${[...new Set(doppelt)].join(', ')}`);
const fehlt = programme.filter(p => !inListe.includes(p));
if (fehlt.length) probleme.push(`im Code, aber nicht in der Datenschutzerklärung: ${fehlt.join(', ')}`);
const zuviel = inListe.filter(p => !programme.includes(p));
if (zuviel.length) probleme.push(`in der Datenschutzerklärung, aber nicht im Code: ${[...new Set(zuviel)].join(', ')}`);

if (probleme.length) {
  fehler(probleme.join('\n  ') +
    '\n  → Rechtstext anpassen: eigener „recht:"-Commit, Stand-Datum, Eintrag in docs/rechtstexte/aenderungshistorie.md');
}
console.log(`${GREEN}✓ check-affiliate-partnerliste: ${programme.length} Programme im Code, ${inListe.length} in der Datenschutzerklärung, deckungsgleich${RESET}`);
