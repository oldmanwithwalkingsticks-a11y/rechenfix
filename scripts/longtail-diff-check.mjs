#!/usr/bin/env node
/**
 * Vergleicht spezifischen Content der 5 Folge-Pages gegen Pilot (3000€)
 * mit Jaccard-Coefficient nach Stoppwort-Filter.
 * Schwellwert < 0.40 = >60% inhaltliche Differenz erreicht ✓
 *
 * Marker-Pattern in Page-Files:
 *   // W15B-SPEZIFIK-START
 *   const spezifischerContent = (...);
 *   // W15B-SPEZIFIK-END
 *
 * Usage: npm run longtail:diff
 */
import { readFileSync } from 'fs';

const STOPPWOERTER = new Set([
  'der', 'die', 'das', 'und', 'oder', 'ist', 'im', 'in', 'auf', 'mit',
  'für', 'ein', 'eine', 'einen', 'einem', 'einer', 'des', 'dem', 'den',
  'sie', 'er', 'es', 'wir', 'sich', 'bei', 'von', 'zu', 'zur', 'zum',
  'als', 'auch', 'so', 'aber', 'wenn', 'dann', 'wie', 'was', 'wer',
  'an', 'aus', 'nach', 'über', 'unter', 'um', 'durch', 'gegen', 'ohne',
  'pro', 'kein', 'keine', 'nicht', 'nur', 'noch', 'schon', 'sehr',
  'mehr', 'weniger', 'viel', 'wenig', 'kann', 'könnte', 'wird', 'werden',
  'wurde', 'hat', 'haben', 'hatte', 'sind', 'war', 'waren', 'sein',
  'ihr', 'ihre', 'ihren', 'ihrer', 'seine', 'seinen', 'seiner',
]);

function extractSpecificContent(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/\/\/ W15B-SPEZIFIK-START([\s\S]*?)\/\/ W15B-SPEZIFIK-END/);
  if (!match) {
    throw new Error(`Kein W15B-SPEZIFIK-Marker in ${filePath}`);
  }
  return match[1];
}

function tokenize(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, ' ')          // JSX-Tags raus
      .replace(/\{[^}]+\}/g, ' ')         // Interpolationen raus
      .replace(/className=/g, ' ')        // Attribute raus
      .replace(/[^a-zäöüß\s]/g, ' ')     // Sonderzeichen raus
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOPPWOERTER.has(w))
  );
}

function jaccard(a, b) {
  const intersection = [...a].filter(x => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

const PILOT = 'app/finanzen/3000-euro-brutto-netto/page.tsx';
const FOLGE = [
  'app/finanzen/2000-euro-brutto-netto/page.tsx',
  'app/finanzen/2500-euro-brutto-netto/page.tsx',
  'app/finanzen/3500-euro-brutto-netto/page.tsx',
  'app/finanzen/4000-euro-brutto-netto/page.tsx',
  'app/finanzen/5000-euro-brutto-netto/page.tsx',
];

const pilotTokens = tokenize(extractSpecificContent(PILOT));
console.log(`Pilot (3000€): ${pilotTokens.size} eindeutige Content-Wörter`);
console.log('---');

let allPassed = true;
for (const file of FOLGE) {
  const tokens = tokenize(extractSpecificContent(file));
  const score = jaccard(pilotTokens, tokens);
  const passed = score < 0.40;
  console.log(`${file}: Jaccard ${score.toFixed(3)} ${passed ? '✓' : '✗ FAIL'} (${tokens.size} Wörter)`);
  if (!passed) allPassed = false;
}

console.log('---');
console.log(allPassed ? '✓ Alle Folge-Pages erreichen >60% Diff zu Pilot.' : '✗ Mindestens eine Page ist zu ähnlich zum Pilot. Nachschärfen erforderlich.');

process.exit(allPassed ? 0 : 1);
