#!/usr/bin/env node
// Pre-Deploy-Lint: KI-Rechner-Vorschlags-Chips müssen auf existierende Tools zeigen.
// Regel: Jeder Eintrag im BEISPIELE-Block von app/ki-rechner/KiRechnerClient.tsx
//        MUSS ein Tool referenzieren, das in lib/ki-rechner/tools.ts als name: '...'
//        existiert. Sonst rechnet das Modell frei und gibt rohes Markdown aus (Welle 25).
// Aufruf: node scripts/check-ki-beispiele.mjs  oder  npm run lint:kibeispiele
// Exit 0 bei grün (ohne Ausgabe), Exit 1 mit klarer Meldung bei Treffer.

import { readFileSync } from 'node:fs';
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

process.exit(0);
