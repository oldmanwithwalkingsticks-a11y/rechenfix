#!/usr/bin/env node
// Messung Seitenbreite (WCAG 2.1 AA, 1.4.10 Umbruch): Jede Seite der Sitemap wird bei schmalen
// Fensterbreiten geladen und gemessen, ob sie seitwärts scrollt oder Text über den rechten Rand schiebt.
//
// ANLASS (Welle 212): Die Wellen 208 und 211 haben bei 320 px erst 21 bis 25, dann 0 zu breite Seiten
// gemessen, mit einem Skript, das nur in einer Chat-Sitzung lag. axe prüft 1.4.10 nicht. Ohne Skript im
// Repo ist die Messung nicht wiederholbar, und eine neue Seite oder ein neuer Baustein, der wieder zu breit
// ist, fällt niemandem auf. Verfahren wie in Welle 211 (Historie, Abschnitt „Messung vorher“).
//
// VORAUSSETZUNGEN: Playwright mit Chromium, wie bei scripts/messung-barrierefreiheit.mjs bewusst KEINE
// Abhängigkeit in package.json. In den Umgebungen von Claude ist Playwright vorinstalliert. Auf einem
// Rechner ohne Playwright einmalig, ohne package.json zu ändern:
//   npm i --no-save playwright && npx playwright install chromium
//   (`npm ci` entfernt es wieder.)
//
// AUFRUF (aus der Repo-Wurzel):
//   node scripts/messung-seitenbreite.mjs                           ganze Sitemap live, 320/360/375 px
//   node scripts/messung-seitenbreite.mjs --basis http://localhost:3000
//                                                                  gegen `npm run start`; die Sitemap
//                                                                  kommt vom selben Server
//   node scripts/messung-seitenbreite.mjs --pfad /neue/seite --pfad /andere
//                                                                  nur diese Seiten
//   Weitere Schalter: --breiten 320,360,375 · --parallel 4 · --ziel ergebnis.json (alle Einzelergebnisse)
//   Dauer: ganze Sitemap (258 Seiten), drei Breiten, live rund 8 Minuten (Welle 211: 466 und 445 s).
//
// GEZÄHLT WIRD:
// - Zu breit: `document.documentElement.scrollWidth` größer als die Fensterbreite. Gemessen wird, wenn das
//   Netz ruht und der Seitenaufbau sich nicht mehr ändert, und eine Sekunde später ein zweites Mal; es
//   zählt die größere Breite (Rechner laden nach der Hydration nach und können die Seite noch verbreitern).
// - Text über dem Rand: sichtbarer Text, der rechts über das Fenster hinausragt, ohne in einem eigenen
//   Scrollbereich zu liegen, der selbst ins Fenster passt (`overflow-x-auto` mit Tabelle ist zulässig).
//   Welle 208 hat gezeigt, dass Elemente in ihrer Spalte bleiben können, während ihr Text hinausläuft.
//   Ausgenommen: Text in `.sr-only` und in fest positionierten Elementen (`position: fixed`).
// - Bei jeder Abweichung die obersten Verursacher (Element ragt hinaus, sein Elternelement nicht) und
//   die hinausragenden Textstellen, damit die Ursache ohne zweiten Lauf zu finden ist.
// - Seiten ohne HTTP 200 oder mit Ladefehler.
//
// RÜCKGABEWERT: 0 = jede Seite HTTP 200, bei keiner Breite zu breit, kein Text über dem Rand.
// 1 = mindestens eine Abweichung (steht in der Zusammenfassung). 2 = Messung nicht möglich (Playwright
// oder Sitemap fehlt).
//
// GRENZE: Gemessen wird der Zustand nach dem Laden mit den Startwerten. Was erst nach einer Eingabe
// erscheint (weitere Fläche, aufgeklappter Bereich, anderer Modus), sieht die Messung nicht. 1.4.10 gilt
// auch bei 400 % Zoom auf 1280 px; das entspricht 320 CSS-Pixeln und ist damit abgedeckt.

import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const LIVE = 'https://www.rechenfix.de';

function argumente(argv) {
  const a = { basis: LIVE, pfade: [], breiten: [320, 360, 375], parallel: 4, ziel: null };
  for (let i = 0; i < argv.length; i++) {
    const s = argv[i];
    const wert = () => {
      const w = argv[++i];
      if (w === undefined) throw new Error(`${s} braucht einen Wert`);
      return w;
    };
    if (s === '--basis') a.basis = wert().replace(/\/$/, '');
    else if (s === '--pfad') a.pfade.push(wert());
    else if (s === '--breiten') a.breiten = wert().split(',').map((x) => Number(x.trim())).filter((x) => x > 0);
    else if (s === '--parallel') a.parallel = Math.max(1, Number(wert()) || 1);
    else if (s === '--ziel') a.ziel = wert();
    else throw new Error(`unbekannter Schalter ${s}`);
  }
  if (!a.breiten.length) throw new Error('--breiten ohne gültige Breite');
  return a;
}

function laden() {
  try {
    return require('playwright').chromium;
  } catch {
    console.error('Playwright nicht gefunden. Einmalig: npm i --no-save playwright && npx playwright install chromium');
    process.exit(2);
  }
}

async function pfade(a) {
  if (a.pfade.length) return a.pfade.map((p) => (p.startsWith('/') ? p : '/' + p));
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
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (!locs.length) {
    console.error(`Sitemap ${quelle} ohne <loc>`);
    process.exit(2);
  }
  return [...new Set(locs)];
}

// Läuft im Browser. `einzeln` = Verursacher und Textstellen mit ermitteln.
function imBrowser(einzeln) {
  const vw = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  if (!einzeln) return { vw, sw };
  const tol = 0.5;
  const sx = window.scrollX;
  // Liegt das Element in einem eigenen Scrollbereich (overflow-x nicht visible), der selbst ins Fenster passt?
  const geklemmt = (el) => {
    for (let a = el.parentElement; a && a !== document.documentElement && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' && cs.overflowX !== '') {
        const r = a.getBoundingClientRect();
        if (r.right <= vw + tol && r.left >= -tol) return true;
      }
    }
    return false;
  };
  const festPositioniert = (el) => {
    for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
      if (getComputedStyle(a).position === 'fixed') return true;
    }
    return false;
  };
  const beschreibe = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const c = (el.getAttribute('class') || '').trim();
    if (c) s += '.' + c.split(/\s+/).slice(0, 8).join('.');
    return s;
  };
  const pfad = (el) => {
    const teile = [];
    for (let a = el; a && a !== document.body && teile.length < 4; a = a.parentElement) teile.unshift(beschreibe(a).slice(0, 90));
    return teile.join(' > ');
  };

  // Hinausragende Textstellen (auf jeder Seite, nicht nur bei zu breiten)
  const texte = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    if (!el) continue;
    range.selectNodeContents(n);
    let rechts = -Infinity;
    for (const rr of range.getClientRects()) if (rr.width > 0) rechts = Math.max(rechts, rr.right + sx);
    if (rechts <= vw + tol) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || el.closest('.sr-only') || geklemmt(el) || festPositioniert(el)) continue;
    texte.push({ el: pfad(el), rechts: Math.round(rechts), text: n.nodeValue.trim().replace(/\s+/g, ' ').slice(0, 80) });
  }

  // Oberste Verursacher, nur wenn die Seite zu breit ist (teuer: jedes Element)
  const oben = [];
  if (sw > vw) {
    const hinaus = new Set();
    for (const el of document.body.querySelectorAll('*')) {
      if (getComputedStyle(el).position === 'fixed') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right + sx > vw + tol && !geklemmt(el)) hinaus.add(el);
    }
    for (const el of hinaus) {
      const p = el.parentElement;
      if (p && hinaus.has(p)) continue;
      const r = el.getBoundingClientRect();
      oben.push({ el: pfad(el), rechts: Math.round(r.right + sx), breite: Math.round(r.width), text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80) });
    }
  }
  return { vw, sw, texte: texte.slice(0, 15), textAnzahl: texte.length, oben: oben.slice(0, 12) };
}

async function messe(kontext, basis, pfad, breite) {
  const page = await kontext.newPage();
  await page.setViewportSize({ width: breite, height: 800 });
  // Vorabladen verlinkter Seiten (Next.js-Prefetch, `?_rsc=`) ändert den DOM nicht, hält das Netz aber
  // beschäftigt. Bilder und Videos werden geladen: Sie bestimmen die Breite mit.
  await page.route(/[?&]_rsc=/, (r) => r.abort());
  try {
    const resp = await page.goto(basis + pfad, { waitUntil: 'load', timeout: 60_000 });
    const status = resp ? resp.status() : 0;
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    // Warten, bis der Seitenaufbau sich nicht mehr ändert (Rechner laden nach der Hydration nach).
    let vorher = -1, gleich = 0;
    for (let k = 0; k < 30 && gleich < 3; k++) {
      const n = await page.evaluate(() => document.getElementsByTagName('*').length);
      gleich = n === vorher ? gleich + 1 : 0;
      vorher = n;
      await page.waitForTimeout(300);
    }
    const erste = await page.evaluate(imBrowser, false);
    await page.waitForTimeout(1000);
    const zweite = await page.evaluate(imBrowser, true);
    const sw = Math.max(erste.sw, zweite.sw);
    return {
      status, sw1: erste.sw, sw2: zweite.sw, sw, vw: zweite.vw,
      zuBreit: sw > zweite.vw, textUeberRand: zweite.textAnzahl,
      texte: zweite.texte, oben: zweite.oben,
    };
  } catch (e) {
    return { status: -1, fehler: String(e).slice(0, 300) };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  let a;
  try {
    a = argumente(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
  const chromium = laden();
  const liste = await pfade(a);
  const beginn = new Date().toISOString();
  const t0 = Date.now();
  console.log(`Basis ${a.basis} · ${liste.length} Seiten · Breiten ${a.breiten.join(', ')} px · parallel ${a.parallel}`);

  const browser = await chromium.launch();
  const auftraege = a.breiten.flatMap((breite) => liste.map((pfad) => ({ pfad, breite })));
  const ergebnisse = new Array(auftraege.length);
  let naechster = 0, fertig = 0;
  async function arbeiter() {
    const kontext = await browser.newContext({ colorScheme: 'light', locale: 'de-DE' });
    while (naechster < auftraege.length) {
      const i = naechster++;
      const { pfad, breite } = auftraege[i];
      let r = await messe(kontext, a.basis, pfad, breite);
      if (r.status !== 200) {
        const r2 = await messe(kontext, a.basis, pfad, breite);
        if (r2.status === 200) r = r2;
      }
      ergebnisse[i] = { pfad, breite, ...r };
      if (r.zuBreit || r.textUeberRand) console.log(`  ABWEICHUNG ${breite} px ${pfad}: scrollWidth ${r.sw1}/${r.sw2}, Text über dem Rand ${r.textUeberRand}`);
      else if (r.status !== 200) console.log(`  FEHLER ${breite} px ${pfad}: ${r.status} ${r.fehler || ''}`);
      fertig++;
      if (fertig % 100 === 0 || fertig === auftraege.length) console.log(`  ${fertig}/${auftraege.length}`);
    }
    await kontext.close();
  }
  await Promise.all(Array.from({ length: Math.min(a.parallel, auftraege.length) }, arbeiter));
  await browser.close();
  const ende = new Date().toISOString();

  const abweichungen = [];
  console.log('');
  console.log(`${beginn} bis ${ende} · Dauer ${Math.round((Date.now() - t0) / 1000)} s`);
  for (const breite of a.breiten) {
    const rs = ergebnisse.filter((r) => r.breite === breite);
    const zuBreit = rs.filter((r) => r.zuBreit);
    const text = rs.filter((r) => !r.zuBreit && r.textUeberRand);
    const nicht200 = rs.filter((r) => r.status !== 200);
    console.log(`${breite} px: ${rs.length} Seiten · zu breit ${zuBreit.length} · nur Text über dem Rand ${text.length} · HTTP ungleich 200 ${nicht200.length}`);
    for (const r of [...zuBreit, ...text]) {
      console.log(`   ${r.pfad}: scrollWidth ${r.sw} bei ${r.vw}`);
      for (const o of (r.oben || []).slice(0, 3)) console.log(`      Element bis ${o.rechts} px: ${o.el} „${o.text}“`);
      for (const t of (r.texte || []).slice(0, 3)) console.log(`      Text bis ${t.rechts} px: ${t.el} „${t.text}“`);
    }
    for (const r of nicht200.slice(0, 10)) console.log(`   ${r.pfad}: ${r.status} ${r.fehler || ''}`);
    if (zuBreit.length) abweichungen.push(`${breite} px: ${zuBreit.length} Seiten zu breit`);
    if (text.length) abweichungen.push(`${breite} px: ${text.length} Seiten mit Text über dem Rand`);
    if (nicht200.length) abweichungen.push(`${breite} px: ${nicht200.length} Seiten ohne HTTP 200`);
  }
  if (a.ziel) {
    fs.writeFileSync(a.ziel, JSON.stringify({ basis: a.basis, beginn, ende, breiten: a.breiten, seiten: liste.length, ergebnisse }, null, 1));
    console.log(`Einzelergebnisse: ${a.ziel}`);
  }
  console.log('');
  console.log(abweichungen.length ? `ABWEICHUNG: ${abweichungen.join('; ')}` : 'Ergebnis: keine Seite zu breit, kein Text über dem Rand.');
  process.exit(abweichungen.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
