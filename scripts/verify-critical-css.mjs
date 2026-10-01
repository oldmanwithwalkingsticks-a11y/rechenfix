// W15C-T7: Verify-Script für Inline-Critical-CSS-Pattern.
//
// Prüft pro Test-URL, dass im ausgelieferten HTML genau die erwartete
// CSS-Topologie steht:
//   - mindestens 1 <style>-Block im Head (Tailwind inline)
//   - höchstens 1 <link rel="stylesheet"> (Inter Font-CSS via next/font)
//
// Gezählt wird nur außerhalb von <noscript>. Seit W14 (08.06.2026, Commit
// 90f5c84) steht in app/layout.tsx ein Ausweichblock
// <noscript><link rel="stylesheet" href="/styles/app.<hash>.css"/></noscript>
// für Clients ohne JavaScript. Er blockiert das Rendern bei allen anderen
// nicht. Dieses Skript ist älter (24.05.2026) und hat ihn bis Welle 155 als
// zweites Stylesheet mitgezählt — es meldete deshalb seit Juni an allen URLs
// eine Regression, unter Next 14 wie unter Next 16.
//
// Vor den Abrufen läuft ein Selbsttest mit präparierten HTML-Strings. Er
// belegt, dass ein zweites Stylesheet AUSSERHALB von <noscript> weiterhin
// als Regression gilt.
//
// Voraussetzung: lokaler Production-Server läuft auf Port 3000.
//   npm run build
//   npm start &
//   sleep 3
//   node scripts/verify-critical-css.mjs
//
// Exit-Code 0 bei Erfolg, 1 bei Regression oder fehlgeschlagenem Selbsttest.

import { execSync } from 'child_process';

const URLS = [
  'http://localhost:3000/',
  'http://localhost:3000/gesundheit/bmi-rechner',
  'http://localhost:3000/wohnen/mietrechner',
  'http://localhost:3000/finanzen/brutto-netto-rechner',
];

const NOSCRIPT = /<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi;

function pruefeHtml(html) {
  const ohneNoscript = html.replace(NOSCRIPT, '');
  const styleBlocks = (ohneNoscript.match(/<style/g) || []).length;
  const cssLinks = (ohneNoscript.match(/rel="stylesheet"/g) || []).length;
  const cssLinksNoscript = (html.match(/rel="stylesheet"/g) || []).length - cssLinks;
  return { styleBlocks, cssLinks, cssLinksNoscript, ok: styleBlocks >= 1 && cssLinks <= 1 };
}

const FONT = '<link rel="stylesheet" href="/_next/static/css/font.css" data-precedence="next"/>';
const APP = '<link rel="stylesheet" href="/styles/app.css"/>';
const SELBSTTEST = [
  { name: 'Font + App-CSS nur in <noscript>', html: `<style>a{}</style>${FONT}<noscript>${APP}</noscript>`, ok: true },
  { name: 'zweites Stylesheet außerhalb von <noscript>', html: `<style>a{}</style>${FONT}${APP}<noscript>${APP}</noscript>`, ok: false },
  { name: 'kein <style>, Stylesheet nur in <noscript>', html: `<noscript><style>a{}</style></noscript>${FONT}`, ok: false },
];

const fehlschlaege = SELBSTTEST.filter((t) => pruefeHtml(t.html).ok !== t.ok);
for (const t of fehlschlaege) console.log(`✗ Selbsttest: ${t.name} — erwartet ${t.ok ? 'OK' : 'Regression'}`);
if (fehlschlaege.length) {
  console.error('\nSelbsttest fehlgeschlagen — die Zählung selbst ist falsch.');
  process.exit(1);
}
console.log(`✓ Selbsttest ${SELBSTTEST.length}/${SELBSTTEST.length}\n`);

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

  const { styleBlocks, cssLinks, cssLinksNoscript, ok } = pruefeHtml(html);
  console.log(
    `${ok ? '✓' : '✗'} ${url} — <style>: ${styleBlocks}, css links: ${cssLinks}` +
      (cssLinksNoscript ? ` (+${cssLinksNoscript} in <noscript>, nicht gezählt)` : '')
  );

  if (!ok) pass = false;
}

if (!pass) {
  console.error(
    '\nRegression erkannt. Erwartet pro URL außerhalb von <noscript>: <style> ≥ 1 (Tailwind inline) UND css links ≤ 1 (nur Font).'
  );
  process.exit(1);
}

console.log('\nAlle URLs OK.');
