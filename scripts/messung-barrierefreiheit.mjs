#!/usr/bin/env node
// Messung Barrierefreiheit: axe-core über die Seiten der Sitemap, dazu eigene Prüfungen im DOM und die
// Funktionsprobe des wissenschaftlichen Taschenrechners per Tastatur.
//
// ANLASS (Welle 204): Die Messungen 1 bis 6 vom 02. bis 04.11.2026 (Messbericht
// docs/audit-arbeitspapiere/barrierefreiheit-axe-2026-11.md) liefen mit Skripten, die nur in einer
// Chat-Sitzung lagen. /barrierefreiheit stützt sich seit Welle 202 auf diese Messung, und CLAUDE.md verlangt
// sie für jede neue Seite und jeden neuen Baustein. Ohne Skript im Repo ist keine der beiden Stellen
// wiederholbar. Dieses Skript fasst die damaligen Werkzeuge zusammen (Messung, Auswertung, Tastaturprobe);
// die Prüfungen sind dieselben.
//
// VORAUSSETZUNGEN:
// - axe-core aus node_modules (heute 4.11.2, über eslint-plugin-jsx-a11y; das Skript schreibt die
//   gemessene Fassung in die Ausgabe).
// - Playwright mit Chromium. Bewusst KEINE Abhängigkeit in package.json: Die Messung läuft selten, und
//   jedes Paket mehr ist eines mehr für npm audit und die Abhängigkeitswache. In den Umgebungen von
//   Claude (Chat-Sitzung, geplante Aufgabe, Claude Code im Web) ist Playwright vorinstalliert und wird
//   über require gefunden. Auf einem Rechner ohne Playwright einmalig, ohne package.json zu ändern:
//     npm i --no-save playwright && npx playwright install chromium
//   (`npm ci` entfernt es wieder.)
//
// AUFRUF (aus der Repo-Wurzel):
//   node scripts/messung-barrierefreiheit.mjs                       ganze Sitemap live, mit Tastaturprobe
//   node scripts/messung-barrierefreiheit.mjs --basis http://localhost:3000
//                                                                  gegen `npm run start`; die Sitemap
//                                                                  kommt vom selben Server, ihre Adressen
//                                                                  werden auf die Basis umgeschrieben
//   node scripts/messung-barrierefreiheit.mjs --pfad /neue/seite --pfad /andere
//                                                                  nur diese Seiten, ohne Tastaturprobe;
//                                                                  in Git Bash unter Windows mit
//                                                                  MSYS_NO_PATHCONV=1 davor, sonst bricht
//                                                                  das Skript ab (Welle 215)
//   Weitere Schalter: --ansichten hell,dunkel,handy · --tags wcag2a,wcag2aa,wcag21a,wcag21aa,best-practice
//   · --parallel 4 · --ziel ergebnis.json (alle Einzelergebnisse) · --tastatur / --ohne-tastatur
//   Dauer: ganze Sitemap (258 Seiten), drei Ansichten, parallel 4 — 13 Minuten am 06.11.2026 (Messung 7).
//
// GEZÄHLT WIRD (wie im Messbericht, Abschnitt Verfahren):
// - Gemessen wird erst, wenn das Netz ruht und der Seitenaufbau sich nicht mehr ändert (Rechner laden nach der
//   Hydration nach; mit festen 400 ms fehlten sie auf einzelnen Seiten, Messbericht Messung 7).
// - axe-Verstöße je Regel und Ansicht. Seiten mit Verstoß oder Ladefehler werden ein zweites Mal gemessen;
//   gezählt wird die zweite Messung, die erste steht als `ersterVersuch` daneben.
// - Eingabefelder ohne zugeordnetes <label> und ohne aria-label/aria-labelledby (axe lässt einen
//   Platzhalter wie „z. B. 75“ als Namen gelten), <label for> ohne Ziel, doppelte id.
// - Überschriften: genau eine sichtbare h1, kein Sprung um mehr als eine Ebene nach unten.
// - Taschenrechner: acht Fälle, Bedienung per Tab, Enter und Leertaste, Namen der Tasten, aria-live.
//
// RÜCKGABEWERT: 0 = jede Seite HTTP 200, kein Verstoß, alle eigenen Prüfungen 0, Tastaturprobe vollständig.
// 1 = mindestens eine Abweichung (steht in der Zusammenfassung). 2 = Messung nicht möglich (Playwright,
// axe-core oder Sitemap fehlt).
//
// GRENZE: Automatisierte Prüfungen decken nur einen Teil der Erfolgskriterien ab. Verständliche Sprache,
// sinnvolle Alternativtexte und eine schlüssige Fokusreihenfolge beurteilt diese Messung nicht.

import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const LIVE = 'https://www.rechenfix.de';
const TASCHENRECHNER = '/mathe/wissenschaftlicher-taschenrechner';

function argumente(argv) {
  const a = { basis: LIVE, pfade: [], ansichten: 'hell,dunkel,handy', tags: 'wcag2a,wcag2aa,wcag21a,wcag21aa,best-practice', parallel: 4, ziel: null, tastatur: null };
  for (let i = 0; i < argv.length; i++) {
    const s = argv[i];
    const wert = () => {
      const w = argv[++i];
      if (w === undefined) throw new Error(`${s} braucht einen Wert`);
      return w;
    };
    if (s === '--basis') a.basis = wert().replace(/\/$/, '');
    else if (s === '--pfad') a.pfade.push(wert());
    else if (s === '--ansichten') a.ansichten = wert();
    else if (s === '--tags') a.tags = wert();
    else if (s === '--parallel') a.parallel = Math.max(1, Number(wert()) || 1);
    else if (s === '--ziel') a.ziel = wert();
    else if (s === '--tastatur') a.tastatur = true;
    else if (s === '--ohne-tastatur') a.tastatur = false;
    else throw new Error(`unbekannter Schalter ${s}`);
  }
  if (a.tastatur === null) a.tastatur = a.pfade.length === 0;
  // Git Bash unter Windows schreibt Argumente, die mit / beginnen, in Windows-Pfade um
  // (/blog → C:/Program Files/Git/blog). Gemessen würde dann eine 404-Seite (Welle 215, wie Welle 214
  // in messung-seitenbreite.mjs).
  const umgeschrieben = a.pfade.find((p) => /^[A-Za-z]:[\\/]/.test(p));
  if (umgeschrieben) throw new Error(`--pfad ${umgeschrieben} ist ein Windows-Pfad; Git Bash hat /pfad umgeschrieben. MSYS_NO_PATHCONV=1 voranstellen.`);
  return a;
}

function laden() {
  let chromium, axeQuelle;
  try {
    ({ chromium } = require('playwright'));
  } catch {
    console.error('Playwright nicht gefunden. Einmalig: npm i --no-save playwright && npx playwright install chromium');
    process.exit(2);
  }
  try {
    axeQuelle = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  } catch {
    console.error('axe-core nicht gefunden (node_modules/axe-core). Erst `npm ci`.');
    process.exit(2);
  }
  return { chromium, axeQuelle };
}

async function adressen(a) {
  if (a.pfade.length) return a.pfade.map((p) => LIVE + (p.startsWith('/') ? p : '/' + p));
  const quelle = `${a.basis}/sitemap.xml`;
  let xml;
  try {
    const res = await fetch(quelle, { signal: AbortSignal.timeout(30_000) });
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (e) {
    console.error(`Sitemap ${quelle} nicht geholt: ${e instanceof Error ? e.message : e}`);
    process.exit(2);
  }
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) {
    console.error(`Sitemap ${quelle} ohne <loc>`);
    process.exit(2);
  }
  return [...new Set(locs)];
}

// Läuft im Browser: axe plus eigene Prüfungen.
async function imBrowser(tags) {
  /* global axe */
  const res = await axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] });
  const ids = {};
  document.querySelectorAll('[id]').forEach((e) => { ids[e.id] = (ids[e.id] || 0) + 1; });
  const doppelt = Object.entries(ids).filter(([, n]) => n > 1).map(([k]) => k);
  const forOhneZiel = [...document.querySelectorAll('label[for]')].filter((l) => !document.getElementById(l.htmlFor)).map((l) => l.htmlFor);
  const felder = [...document.querySelectorAll('input, select, textarea')].filter((e) => !['hidden', 'submit', 'button', 'reset', 'image'].includes(e.type));
  const unbeschriftet = felder
    .filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby'))
    .map((e) => e.outerHTML.slice(0, 160));
  const ueberschriften = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .filter((h) => h.offsetParent !== null || h.getClientRects().length)
    .map((h) => Number(h.tagName[1]));
  return {
    axe: axe.version,
    violations: res.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => ({ ziel: n.target.join(' '), html: n.html.slice(0, 220) })) })),
    doppelt, forOhneZiel, unbeschriftet, felder: felder.length, ueberschriften,
  };
}

async function messe(kontext, url, ansicht, axeQuelle, tags) {
  const page = await kontext.newPage();
  // Medien werden nicht geladen: axe prüft den DOM, nicht die Datei. Spart auf Blogseiten mit Videos Minuten.
  await page.route(/\.(mp4|webm|mov|m4v|mp3|jpg|jpeg|png|webp|avif|gif)(\?|$)/i, (r) => r.abort());
  await page.route(/\/_next\/image\?/, (r) => r.abort());
  // Vorabladen verlinkter Seiten (Next.js-Prefetch, `?_rsc=`) ändert den DOM nicht, hält das Netz aber
  // sekundenlang beschäftigt; abgebrochen, damit „Netz ruht“ unten schnell erreicht wird.
  await page.route(/[?&]_rsc=/, (r) => r.abort());
  try {
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    const status = resp ? resp.status() : 0;
    if (ansicht === 'dunkel') {
      await page.waitForFunction(() => document.documentElement.classList.contains('dark'), null, { timeout: 15_000 });
    }
    await page.evaluate(() => document.fonts.ready);
    // Warten, bis die Seite fertig aufgebaut ist: Die Rechner-Komponenten laden nach der Hydration nach.
    // Mit festen 400 ms zählten die Messungen 6 und 7 (erster Lauf) auf einzelnen Seiten 0 Eingabefelder,
    // weil der Rechner noch fehlte; seine Felder blieben dann in dieser Ansicht ungeprüft.
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    let vorher = -1, gleich = 0;
    for (let k = 0; k < 30 && gleich < 3; k++) {
      const n = await page.evaluate(() => document.getElementsByTagName('*').length + 100_000 * document.querySelectorAll('input, select, textarea').length);
      gleich = n === vorher ? gleich + 1 : 0;
      vorher = n;
      await page.waitForTimeout(300);
    }
    await page.addScriptTag({ content: axeQuelle });
    const r = await page.evaluate(imBrowser, tags);
    return { status, ...r };
  } catch (e) {
    return { status: -1, fehler: String(e).slice(0, 300) };
  } finally {
    await page.close();
  }
}

async function tastaturprobe(browser, basis) {
  const page = await browser.newPage({ locale: 'de-DE' });
  const fall = [];
  const pruefe = (name, soll, ist) => fall.push({ name, soll, ist, ok: soll === ist });
  try {
    await page.goto(basis + TASCHENRECHNER, { waitUntil: 'load', timeout: 60_000 });
    await page.waitForTimeout(800);
    const eingabe = page.locator('div.text-right.text-sm.font-mono').first();
    const ergebnis = page.locator('div.text-right.text-3xl.font-mono').first();
    const taste = (t) => page.locator('button', { hasText: new RegExp('^' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }).first();
    const text = async (l) => (await l.innerText()).trim();

    await taste('7').focus(); await page.keyboard.press('Enter');
    pruefe('Enter auf fokussierter 7 → Eingabe', '7', await text(eingabe));
    await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
    pruefe('Tab weiter auf 8, Enter → Eingabe', '78', await text(eingabe));
    await taste('=').focus(); await page.keyboard.press('Enter');
    pruefe('Enter auf „=“ → Ergebnis', '78', await text(ergebnis));
    await taste('C').focus(); await page.keyboard.press(' ');
    pruefe('Leertaste auf C → Ergebnis', '0', await text(ergebnis));
    await page.locator('h1').click();
    await page.keyboard.type('2*3'); await page.keyboard.press('Enter');
    pruefe('2*3 tippen, Enter (Fokus nicht auf Taste) → Ergebnis', '6', await text(ergebnis));
    const namen = await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => b.getAttribute('aria-label')).filter(Boolean));
    pruefe('Taste √ heißt „Quadratwurzel“', true, namen.includes('Quadratwurzel'));
    pruefe('Modus-Taste benannt', true, namen.some((n) => n.startsWith('DEG, Winkelmodus Grad')));
    pruefe('Ergebnis in aria-live-Region', 'polite', await ergebnis.getAttribute('aria-live'));
  } catch (e) {
    pruefe('Probe gelaufen', 'ja', String(e).slice(0, 200));
  } finally {
    await page.close();
  }
  return fall;
}

function ueberschriftenFehler(ebenen) {
  const fehler = [];
  const h1 = ebenen.filter((e) => e === 1).length;
  if (h1 !== 1) fehler.push(`${h1} × h1`);
  for (let i = 1; i < ebenen.length; i++) {
    if (ebenen[i] - ebenen[i - 1] > 1) { fehler.push(`Sprung h${ebenen[i - 1]} → h${ebenen[i]}`); break; }
  }
  return fehler;
}

async function main() {
  let a;
  try {
    a = argumente(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
  const { chromium, axeQuelle } = laden();
  const tags = a.tags.split(',').map((s) => s.trim()).filter(Boolean);
  const ansichten = a.ansichten.split(',').map((s) => s.trim()).filter(Boolean);
  const urls = await adressen(a);
  const beginn = new Date().toISOString();
  console.log(`Basis ${a.basis} · ${urls.length} Seiten · Ansichten ${ansichten.join(', ')} · Tags ${tags.join(', ')} · parallel ${a.parallel}`);

  const browser = await chromium.launch();
  const kontexte = {
    hell: await browser.newContext({ colorScheme: 'light', viewport: { width: 1280, height: 900 }, locale: 'de-DE' }),
    dunkel: await browser.newContext({ colorScheme: 'dark', viewport: { width: 1280, height: 900 }, locale: 'de-DE' }),
    handy: await browser.newContext({ colorScheme: 'light', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'de-DE' }),
  };
  for (const an of ansichten) {
    if (!kontexte[an]) { console.error(`unbekannte Ansicht ${an}`); process.exit(2); }
  }
  const auftraege = urls.flatMap((url) => ansichten.map((ansicht) => ({ url, ansicht })));
  const ergebnisse = new Array(auftraege.length);
  let naechster = 0, fertig = 0;
  async function arbeiter() {
    while (naechster < auftraege.length) {
      const i = naechster++;
      const { url, ansicht } = auftraege[i];
      const ziel = url.replace(LIVE, a.basis);
      let r = await messe(kontexte[ansicht], ziel, ansicht, axeQuelle, tags);
      if (r.status !== 200 || (r.violations && r.violations.length)) {
        const r2 = await messe(kontexte[ansicht], ziel, ansicht, axeQuelle, tags);
        if (r2.status === 200) r = { ...r2, ersterVersuch: (r.violations || []).map((v) => v.id) };
      }
      ergebnisse[i] = { url, ansicht, ...r };
      fertig++;
      if (fertig % 50 === 0 || fertig === auftraege.length) console.log(`  ${fertig}/${auftraege.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(a.parallel, auftraege.length) }, arbeiter));
  const tastatur = a.tastatur ? await tastaturprobe(browser, a.basis) : null;
  await browser.close();
  const ende = new Date().toISOString();

  // Zusammenfassung
  const pfad = (u) => u.replace(LIVE, '') || '/';
  const abweichungen = [];
  const nicht200 = ergebnisse.filter((r) => r.status !== 200);
  const regeln = new Map();
  for (const r of ergebnisse) {
    for (const v of r.violations || []) {
      const k = `${v.id} (${v.impact}) ${r.ansicht}`;
      if (!regeln.has(k)) regeln.set(k, { seiten: new Set(), knoten: 0, beispiel: '' });
      const e = regeln.get(k);
      e.seiten.add(pfad(r.url)); e.knoten += v.nodes.length; e.beispiel ||= v.nodes[0]?.html || '';
    }
  }
  const zaehle = (feld) => {
    const seiten = new Set();
    let n = 0;
    for (const r of ergebnisse) if ((r[feld] || []).length) { seiten.add(`${pfad(r.url)} (${r.ansicht})`); n += r[feld].length; }
    return { n, seiten: [...seiten] };
  };
  const unbeschriftet = zaehle('unbeschriftet'), forOhneZiel = zaehle('forOhneZiel'), doppelt = zaehle('doppelt');
  const ueFehler = ergebnisse.filter((r) => r.ueberschriften).map((r) => ({ r, f: ueberschriftenFehler(r.ueberschriften) })).filter((x) => x.f.length);
  const felder = ergebnisse.filter((r) => r.ansicht === ansichten[0]).reduce((s, r) => s + (r.felder || 0), 0);
  const seitenMitFeldern = ergebnisse.filter((r) => r.ansicht === ansichten[0] && r.felder > 0).length;
  const versionen = [...new Set(ergebnisse.map((r) => r.axe).filter(Boolean))];
  const ersteVersuche = ergebnisse.filter((r) => r.ersterVersuch && r.ersterVersuch.length && !(r.violations || []).length);

  console.log('');
  console.log(`axe-core ${versionen.join(', ') || '?'} · ${beginn} bis ${ende}`);
  console.log(`Messungen: ${ergebnisse.length} (${urls.length} Seiten × ${ansichten.length} Ansichten)`);
  console.log(`HTTP-Status ungleich 200: ${nicht200.length}`);
  for (const r of nicht200.slice(0, 10)) console.log(`   ${pfad(r.url)} (${r.ansicht}) ${r.status} ${r.fehler || ''}`);
  if (nicht200.length) abweichungen.push(`${nicht200.length} Messungen ohne HTTP 200`);
  console.log(`axe-Verstöße: ${regeln.size === 0 ? 'keine' : ''}`);
  for (const [k, e] of [...regeln].sort()) {
    console.log(`   ${k}: ${e.seiten.size} Seiten, ${e.knoten} Elemente, z. B. ${[...e.seiten].slice(0, 3).join(', ')}`);
    console.log(`      ${e.beispiel.replace(/\s+/g, ' ').slice(0, 160)}`);
  }
  if (regeln.size) abweichungen.push(`${regeln.size} Regel/Ansicht-Paare mit Verstoß`);
  console.log(`Nur im ersten Durchgang verletzt, in der Wiederholung nicht: ${ersteVersuche.length}${ersteVersuche.length ? ' — ' + ersteVersuche.slice(0, 5).map((r) => `${pfad(r.url)} (${r.ansicht}: ${r.ersterVersuch.join(',')})`).join('; ') : ''}`);
  console.log(`Eingabefelder ohne Beschriftung: ${unbeschriftet.n} (${felder} Felder auf ${seitenMitFeldern} Seiten, Ansicht ${ansichten[0]})${unbeschriftet.n ? ' — ' + unbeschriftet.seiten.slice(0, 5).join(', ') : ''}`);
  console.log(`<label for> ohne Ziel: ${forOhneZiel.n}${forOhneZiel.n ? ' — ' + forOhneZiel.seiten.slice(0, 5).join(', ') : ''}`);
  console.log(`Doppelte id: ${doppelt.n}${doppelt.n ? ' — ' + doppelt.seiten.slice(0, 5).join(', ') : ''}`);
  console.log(`Überschriften (genau eine h1, kein Sprung): ${ueFehler.length === 0 ? 'in Ordnung' : ueFehler.length + ' Messungen mit Abweichung'}`);
  for (const x of ueFehler.slice(0, 10)) console.log(`   ${pfad(x.r.url)} (${x.r.ansicht}): ${x.f.join(', ')}`);
  for (const [n, z] of [['Eingabefelder ohne Beschriftung', unbeschriftet.n], ['<label for> ohne Ziel', forOhneZiel.n], ['doppelte id', doppelt.n], ['Überschriften', ueFehler.length]]) {
    if (z) abweichungen.push(`${n}: ${z}`);
  }
  if (tastatur) {
    for (const f of tastatur) console.log(`   ${f.ok ? '✓' : '✗'} ${f.name}: soll ${JSON.stringify(f.soll)}, ist ${JSON.stringify(f.ist)}`);
    const ok = tastatur.filter((f) => f.ok).length;
    console.log(`Taschenrechner, Tastatur: ${ok}/${tastatur.length}`);
    if (ok !== tastatur.length) abweichungen.push(`Tastaturprobe ${ok}/${tastatur.length}`);
  }
  if (a.ziel) {
    fs.writeFileSync(a.ziel, JSON.stringify({ basis: a.basis, beginn, ende, tags, ansichten, seiten: urls.length, tastatur, ergebnisse }, null, 1));
    console.log(`Einzelergebnisse: ${a.ziel}`);
  }
  console.log('');
  console.log(abweichungen.length ? `ABWEICHUNG: ${abweichungen.join('; ')}` : 'Ergebnis: kein Verstoß, keine Abweichung.');
  process.exit(abweichungen.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
