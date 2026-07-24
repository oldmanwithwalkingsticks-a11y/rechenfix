#!/usr/bin/env node
// Pre-Deploy-Lint: KI-Rechner-Vorschlags-Chips und Tool-Links müssen ins Leere-frei sein.
// Regel 1: Jeder Eintrag im BEISPIELE-Block von app/ki-rechner/KiRechnerClient.tsx
//          MUSS ein Tool referenzieren, das in lib/ki-rechner/tools.ts als name: '...'
//          existiert. Sonst rechnet das Modell frei und gibt rohes Markdown aus (Welle 25).
// Regel 2 (Welle 26): Jeder rechnerSlug eines Tools MUSS auf einen real existierenden
//          Rechner in lib/rechner-config/ zeigen (kategorieSlug/slug-Kombination). Sonst
//          läuft der Rechner-Link unter dem KI-Ergebnis ins Leere. In Welle 25 lagen genau
//          hier zwei tote Links, die nur durch manuelle Vollprüfung gefunden wurden.
// Aufruf: node scripts/check-ki-beispiele.mjs  oder  npm run lint:kibeispiele
// Exit 0 bei grün (ohne Ausgabe), Exit 1 mit klarer Meldung bei Treffer.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function fail(msg) {
  console.error(`${RED}FEHLER check-ki-beispiele:${RESET} ${msg}`);
  process.exit(1);
}

// 1. Vorhandene Tool-Namen aus lib/ki-rechner/tools.ts sammeln.
const toolsSrc = readFileSync(join(ROOT, 'lib/ki-rechner/tools.ts'), 'utf8');
const toolNames = new Set();
for (const m of toolsSrc.matchAll(/name:\s*'([^']+)'/g)) {
  toolNames.add(m[1]);
}
if (toolNames.size === 0) {
  fail("Keine Tools in lib/ki-rechner/tools.ts gefunden (name: '...'). Struktur geändert?");
}

// 2. BEISPIELE-Block aus app/ki-rechner/KiRechnerClient.tsx isolieren.
const clientSrc = readFileSync(join(ROOT, 'app/ki-rechner/KiRechnerClient.tsx'), 'utf8');
const startIdx = clientSrc.indexOf('const BEISPIELE');
if (startIdx === -1) {
  fail('BEISPIELE-Block in app/ki-rechner/KiRechnerClient.tsx nicht gefunden (Umbenennung/Refactor?). Ein stillschweigend nicht prüfender Guard ist schlimmer als keiner.');
}
const endIdx = clientSrc.indexOf('];', startIdx);
if (endIdx === -1) {
  fail("BEISPIELE-Block gefunden, aber kein Abschluss '];' — Struktur unerwartet.");
}
const block = clientSrc.slice(startIdx, endIdx);

// 3. frage- und tool-Einträge im Block zählen und Tool-Namen extrahieren.
const frageKeys = [...block.matchAll(/frage:\s*'/g)];
const toolMatches = [...block.matchAll(/\btool:\s*'([^']+)'/g)];

if (frageKeys.length === 0) {
  fail('BEISPIELE-Block enthält keine frage-Einträge — Struktur unerwartet.');
}

// 4. Jeder frage-Eintrag braucht genau ein tool-Feld.
if (frageKeys.length !== toolMatches.length) {
  fail(`BEISPIELE hat ${frageKeys.length} frage-Einträge, aber ${toolMatches.length} tool-Felder. Jeder Chip braucht ein tool-Feld.`);
}

// 5. Jedes referenzierte Tool muss existieren.
for (const m of toolMatches) {
  const tool = m[1];
  // zugehörige frage für die Fehlermeldung (grob: nächstliegende frage im selben Eintrag)
  const frageMatch = block.slice(0, m.index).match(/frage:\s*'([^']*)'[^']*$/);
  const frage = frageMatch ? frageMatch[1] : '(unbekannt)';
  if (!toolNames.has(tool)) {
    fail(`Vorschlag "${frage}" verweist auf Tool "${tool}", das in lib/ki-rechner/tools.ts nicht existiert.\n` +
      '  Ein Vorschlag ohne Tool führt zu frei geschätzten Zahlen. Tool ergänzen oder Vorschlag entfernen.');
  }
}

// --- Regel 2 (Welle 26): rechnerSlug jedes Tools gegen die echte Rechner-Config prüfen. ---

// 6. Gültige Ziele "<kategorieSlug>/<slug>" aus lib/rechner-config/ (außer index.ts) sammeln.
//    Pro Datei paarweise: jede kategorieSlug-Zeile mit dem nächstgelegenen vorangehenden
//    slug im selben Objekt verbinden (robust gegen dazwischenliegende titel:-Felder aus
//    verschachtelten Arrays und gegen Interlink-Slug-Strings ohne eigenen kategorieSlug).
const CONFIG_DIR = join(ROOT, 'lib/rechner-config');
const validTargets = new Set();
for (const file of readdirSync(CONFIG_DIR)) {
  if (!file.endsWith('.ts') || file === 'index.ts') continue;
  const src = readFileSync(join(CONFIG_DIR, file), 'utf8');
  const events = [];
  for (const m of src.matchAll(/^\s*slug:\s*'([^']+)'/gm)) events.push({ idx: m.index, type: 'slug', val: m[1] });
  for (const m of src.matchAll(/^\s*kategorieSlug:\s*'([^']+)'/gm)) events.push({ idx: m.index, type: 'kat', val: m[1] });
  events.sort((a, b) => a.idx - b.idx);
  let lastSlug = null;
  for (const e of events) {
    if (e.type === 'slug') lastSlug = e.val;
    else if (lastSlug) validTargets.add(`${e.val}/${lastSlug}`);
  }
}
// Plausibilität: Site hat ~205 Rechner. Deutlich weniger → Config-Parsing gebrochen.
if (validTargets.size < 200) {
  fail(`Config-Parsing gebrochen — nur ${validTargets.size} Rechner-Ziele aus lib/rechner-config/ gefunden (erwartet >=200).\n` +
    '  Ein Guard, der wegen Parse-Fehlern still grün wird, ist wertlos. Regex/Struktur prüfen.');
}

// 7. Alle rechnerSlug aus tools.ts sammeln und gegen die Zielmenge prüfen.
const rechnerSlugs = [...toolsSrc.matchAll(/rechnerSlug:\s*'([^']+)'/g)];
if (rechnerSlugs.length === 0) {
  fail("Keine rechnerSlug-Einträge in lib/ki-rechner/tools.ts gefunden — Struktur geändert?");
}
for (const m of rechnerSlugs) {
  const slug = m[1];
  if (!validTargets.has(slug)) {
    const before = toolsSrc.slice(0, m.index);
    const nameMatches = [...before.matchAll(/name:\s*'([^']+)'/g)];
    const toolName = nameMatches.length ? nameMatches[nameMatches.length - 1][1] : '(unbekannt)';
    fail(`Tool "${toolName}" verweist auf rechnerSlug "${slug}", der in lib/rechner-config/ nicht existiert.\n` +
      '  Der Link im KI-Rechner läuft ins Leere. Korrekte kategorieSlug/slug-Kombination aus der Config verwenden.');
  }
}

process.exit(0);
