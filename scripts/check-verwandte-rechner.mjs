#!/usr/bin/env node
// Pre-Deploy-Lint: Querverweise zwischen den Rechnern
//
// `getVerwandteRechner` rendert den Block „Das könnte Sie auch interessieren". Fehlt ein
// Rechner in `verwandteMap` oder hat er dort weniger als vier Ziele, greift der Notbehelf:
// die ersten vier Rechner seiner Kategorie, für jeden gleich. Vor Welle 144 betraf das 65
// Rechner, und 78 Rechner waren in keinem einzigen Block Ziel — sie bekamen aus dem
// gesamten Projekt keinen einzigen thematischen Eingangslink.
//
// Zwei Regeln, beide gemessen:
//   1. Jeder Rechner hat einen eigenen Eintrag mit mindestens vier gültigen Zielen —
//      keine Selbstverweise, keine Dubletten, keine unbekannten Slugs.
//   2. Jeder Rechner ist in mindestens einem fremden Eintrag unter den ersten vier Zielen.
//      Nur die ersten vier werden gerendert; was dahinter steht, verlinkt niemand.
//
// Wer einen Rechner anlegt, pflegt deshalb beides: seinen eigenen Eintrag und einen
// Nachbarn, der ihn aufnimmt.
//
// Aufruf: node scripts/check-verwandte-rechner.mjs
//         node scripts/check-verwandte-rechner.mjs --index <pfad>   (Gegenprobe)

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', RESET = '\x1b[0m';
const argIdx = process.argv.indexOf('--index');
const INDEX = argIdx > -1 ? process.argv[argIdx + 1] : join(ROOT, 'lib/rechner-config/index.ts');
const KATEGORIEN = ['alltag', 'arbeit', 'auto', 'finanzen', 'gesundheit', 'kochen', 'mathe', 'sport', 'technik', 'wohnen'];

function fehler(zeilen) {
  console.error(`${RED}✗ check-verwandte-rechner:${RESET}`);
  for (const z of zeilen) console.error(`  ${z}`);
  process.exit(1);
}

const slugs = [];
for (const k of KATEGORIEN) {
  const t = readFileSync(join(ROOT, `lib/rechner-config/${k}.ts`), 'utf8');
  for (const m of t.matchAll(/slug: '([^']+)'/g)) slugs.push(m[1]);
}
if (slugs.length < 100) fehler([`nur ${slugs.length} Rechner-Slugs erkannt — Muster prüfen, nicht abschalten`]);
const bekannt = new Set(slugs);

const idx = readFileSync(INDEX, 'utf8');
const start = idx.indexOf('const verwandteMap');
const ende = idx.indexOf('\n};', start);
if (start < 0 || ende < 0) fehler(['verwandteMap in lib/rechner-config/index.ts nicht gefunden']);
const map = {};
for (const m of idx.slice(start, ende).matchAll(/'([a-z0-9-]+)': \[([^\]]*)\]/g)) {
  map[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

const probleme = [];
for (const s of slugs) {
  const v = map[s];
  if (!v) { probleme.push(`${s}: kein Eintrag in verwandteMap — fällt auf den Notbehelf zurück`); continue; }
  if (v.length < 4) { probleme.push(`${s}: nur ${v.length} Ziele, gebraucht werden vier — fällt sonst ganz auf den Notbehelf zurück`); continue; }
  if (v.includes(s)) probleme.push(`${s}: verweist auf sich selbst`);
  if (new Set(v).size !== v.length) probleme.push(`${s}: Ziel doppelt genannt`);
  for (const z of v) if (!bekannt.has(z)) probleme.push(`${s}: Ziel „${z}" gibt es nicht`);
}

const zaehler = new Map();
for (const s of slugs) for (const z of (map[s] ?? []).slice(0, 4)) if (z !== s) zaehler.set(z, (zaehler.get(z) ?? 0) + 1);
const ohne = slugs.filter((s) => !zaehler.has(s));
if (ohne.length) probleme.push(`ohne eingehenden Querverweis (${ohne.length}): ${ohne.join(', ')}`);

if (probleme.length) {
  fehler([...probleme, '→ verwandteMap in lib/rechner-config/index.ts pflegen: eigener Eintrag mit vier Zielen, und ein Nachbar, der den neuen Rechner aufnimmt']);
}
console.log(`${GREEN}✓ check-verwandte-rechner: ${slugs.length} Rechner, alle mit vier Zielen und mindestens einem eingehenden Querverweis${RESET}`);
