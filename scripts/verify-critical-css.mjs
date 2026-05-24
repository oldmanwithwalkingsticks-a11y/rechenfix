// W15C-T7: Verify-Script für Inline-Critical-CSS-Pattern.
//
// Prüft pro Test-URL, dass im ausgelieferten HTML genau die erwartete
// CSS-Topologie steht:
//   - mindestens 1 <style>-Block im Head (Tailwind inline)
//   - höchstens 1 <link rel="stylesheet"> (Inter Font-CSS via next/font)
//
// Voraussetzung: lokaler Production-Server läuft auf Port 3000.
//   npm run build
//   npm start &
//   sleep 3
//   node scripts/verify-critical-css.mjs
//
// Exit-Code 0 bei Erfolg, 1 bei Regression. Kann später in CI laufen.

import { execSync } from 'child_process';

const URLS = [
  'http://localhost:3000/',
  'http://localhost:3000/gesundheit/bmi-rechner',
  'http://localhost:3000/wohnen/mietrechner',
  'http://localhost:3000/finanzen/brutto-netto-rechner',
];

let pass = true;

for (const url of URLS) {
  let html;
  try {
    html = execSync(`curl -fsS ${url}`, { encoding: 'utf-8' });
  } catch (err) {
    console.log(`✗ ${url} — Server nicht erreichbar (npm start gestartet?)`);
    pass = false;
    continue;
  }

  const styleBlocks = (html.match(/<style/g) || []).length;
  const cssLinks = (html.match(/rel="stylesheet"/g) || []).length;

  const ok = styleBlocks >= 1 && cssLinks <= 1;
  console.log(
    `${ok ? '✓' : '✗'} ${url} — <style>: ${styleBlocks}, css links: ${cssLinks}`
  );

  if (!ok) pass = false;
}

if (!pass) {
  console.error(
    '\nRegression erkannt. Erwartet pro URL: <style> ≥ 1 (Tailwind inline) UND css links ≤ 1 (nur Font).'
  );
  process.exit(1);
}

console.log('\nAlle URLs OK.');
