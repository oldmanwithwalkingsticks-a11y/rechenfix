/**
 * Wächter für Kreditwerbung nach Anhang Nr. 23e UWG (Welle 157).
 *
 * Nr. 23e gilt ab 20.11.2026 (BGBl. 2026 I Nr. 139, Art. 6; Art. 16 Abs. 1) und
 * steht auf der Liste der stets unzulässigen Handlungen. Buchst. a verlangt bei
 * Werbung für Kreditprodukte einen klaren und auffallenden Warnhinweis. Die
 * Komponente setzt ihn selbst (components/AffiliateBox.tsx über
 * `istKreditwerbung` aus lib/kreditwerbung.ts); dieser Wächter prüft, dass das
 * so bleibt.
 *
 * Prüfungen:
 *   1. Datenlage: Für jedes Programm und jeden Kontext aus CONTEXT_TEXTS und
 *      CONTEXT_DEEPLINKS, und für jedes Programm ohne Kontext, werden das
 *      aufgelöste Ziel und der Text (Kontexttext oder tagline, dazu cta)
 *      bestimmt. Trifft einer davon /kredit|darlehen|finanzier|umschuld/i, muss
 *      `istKreditwerbung` wahr sein.
 *   2. Darstellung: Jedes Paar mit Kreditwerbung wird in beiden Varianten mit
 *      react-dom/server gerendert — nicht der Quelltext gelesen. Die Ausgabe
 *      enthält den Warnhinweis genau einmal, in einem Element mit
 *      data-kreditwarnung, außerhalb des Links. Dieses Element und seine
 *      Vorfahren in der Box tragen keine Klasse hidden, truncate, sr-only und
 *      keine, die auf sm:hidden, md:hidden, lg:hidden, xl:hidden oder
 *      2xl:hidden endet.
 *   3. Platzierungen: Jede <AffiliateBox> mit programId smava oder check24 in
 *      components/ und app/ und jeder affiliate-Eintrag mit diesen Programmen in
 *      lib/rechner-config/. Der Kontext muss in CONTEXT_TEXTS stehen.
 *      Kreditwerbung in einer Komponente verlangt in derselben Datei einen
 *      rechnerName aus KREDIT_RECHNER, damit die Zusatzregel in „Fix erklärt"
 *      greift. Kreditwerbung in lib/rechner-config/ ist verboten.
 *
 * usePathname liest den Pfad aus dem PathnameContext von Next. Außerhalb von
 * Next stellt das Skript ihn über denselben Provider bereit.
 *
 * Kontrollfälle (Welle 157): Warnhinweis in der compact-Variante mit `hidden`
 * versehen → Abbruch über Prüfung 2. In CONTEXT_TEXTS.check24 'test': 'Kredit
 * testen.' ohne Deeplink → Abbruch über Prüfung 1.
 *
 * Run: npx tsx scripts/verify-kreditwerbung.ts
 * Teil der prebuild-Kette, direkt nach verify-clamp-input.ts.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import {
  AffiliateBox,
  AFFILIATE_PROGRAMS,
  CONTEXT_TEXTS,
  CONTEXT_DEEPLINKS,
  type ProgramId,
} from '../components/AffiliateBox';
import { KREDIT_RECHNER, KREDIT_WARNHINWEIS, istKreditwerbung } from '../lib/kreditwerbung';

const ROOT = join(__dirname, '..');
const MUSTER = /kredit|darlehen|finanzier|umschuld/i;
const VERBOTEN_GENAU = new Set(['hidden', 'truncate', 'sr-only']);
const VERBOTEN_ENDE = ['sm:hidden', 'md:hidden', 'lg:hidden', 'xl:hidden', '2xl:hidden'];
const VARIANTEN = ['full', 'compact'] as const;

const verletzungen: string[] = [];
const verletzt = (zeile: string) => verletzungen.push(zeile);

// --- Auflösung wie in der Komponente --------------------------------------

function ziel(programId: ProgramId, context?: string): string {
  const dl = CONTEXT_DEEPLINKS[programId];
  const contextDeeplink = context ? (dl?.[context] || dl?.['default']) : dl?.['default'];
  return contextDeeplink || AFFILIATE_PROGRAMS[programId].deeplink;
}

function text(programId: ProgramId, context?: string): string {
  const program = AFFILIATE_PROGRAMS[programId];
  const beschreibung = (context && CONTEXT_TEXTS[programId]?.[context]) || program.tagline;
  return `${beschreibung} ${program.cta}`;
}

// --- Prüfung 1: Datenlage -------------------------------------------------

interface Paar { programId: ProgramId; context?: string }
const paare: Paar[] = [];
for (const programId of Object.keys(AFFILIATE_PROGRAMS) as ProgramId[]) {
  paare.push({ programId });
  const kontexte = new Set([
    ...Object.keys(CONTEXT_TEXTS[programId] ?? {}),
    ...Object.keys(CONTEXT_DEEPLINKS[programId] ?? {}),
  ]);
  kontexte.delete('default');
  for (const context of kontexte) paare.push({ programId, context });
}

const kreditPaare: Paar[] = [];
for (const p of paare) {
  const z = ziel(p.programId, p.context);
  const t = text(p.programId, p.context);
  const kredit = istKreditwerbung(p.programId, z);
  const name = `${p.programId}/${p.context ?? '(ohne Kontext)'}`;
  if ((MUSTER.test(t) || MUSTER.test(z)) && !kredit) {
    verletzt(`Datenlage: ${name} — Text oder Ziel nennt Kredit/Finanzierung, istKreditwerbung ist falsch `
      + `(Ziel ${z || '(leer)'}; Text „${t}"). components/AffiliateBox.tsx`);
  }
  if (kredit) kreditPaare.push(p);
}

// --- Prüfung 2: Darstellung (gerendert) -----------------------------------

interface Knoten { tag: string; klassen: string[]; kreditwarnung: boolean }
const LEER = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

/** Liefert für jedes Vorkommen des Warnhinweises den Stapel der umschließenden Elemente. */
function fundstellen(html: string): Knoten[][] {
  const treffer: Knoten[][] = [];
  const stapel: Knoten[] = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[5] !== undefined) {
      let ab = 0;
      while ((ab = m[5].indexOf(KREDIT_WARNHINWEIS, ab)) >= 0) {
        treffer.push([...stapel]);
        ab += KREDIT_WARNHINWEIS.length;
      }
      continue;
    }
    const [, zu, tag, attrs, selbst] = m;
    if (zu) {
      stapel.pop();
      continue;
    }
    if (selbst || LEER.has(tag.toLowerCase())) continue;
    const klasse = /\sclass="([^"]*)"/.exec(attrs);
    stapel.push({
      tag: tag.toLowerCase(),
      klassen: klasse ? klasse[1].split(/\s+/).filter(Boolean) : [],
      kreditwarnung: /\sdata-kreditwarnung(=|\s|$)/.test(attrs),
    });
  }
  return treffer;
}

let gerendert = 0;
for (const p of kreditPaare) {
  for (const variant of VARIANTEN) {
    const name = `${p.programId}/${p.context ?? '(ohne Kontext)'}, ${variant}`;
    let html: string;
    try {
      html = renderToStaticMarkup(
        createElement(
          PathnameContext.Provider,
          { value: '/verify-kreditwerbung' },
          createElement(AffiliateBox, { programId: p.programId, context: p.context, variant }),
        ),
      );
    } catch (e) {
      verletzt(`Darstellung: ${name} — Rendern gescheitert: ${(e as Error).message}`);
      continue;
    }
    gerendert += 1;
    const orte = fundstellen(html);
    if (orte.length !== 1) {
      verletzt(`Darstellung: ${name} — Warnhinweis ${orte.length}-mal statt genau einmal im HTML.`);
      continue;
    }
    const stapel = orte[0];
    const innen = stapel[stapel.length - 1];
    if (!innen || !innen.kreditwarnung) {
      verletzt(`Darstellung: ${name} — Warnhinweis steht nicht in einem Element mit data-kreditwarnung.`);
    }
    if (stapel.some((k) => k.tag === 'a')) {
      verletzt(`Darstellung: ${name} — Warnhinweis steht innerhalb des Links.`);
    }
    for (const k of stapel) {
      for (const c of k.klassen) {
        if (VERBOTEN_GENAU.has(c) || VERBOTEN_ENDE.some((e) => c.endsWith(e))) {
          verletzt(`Darstellung: ${name} — <${k.tag}> um den Warnhinweis trägt die Klasse „${c}".`);
        }
      }
    }
  }
}

// --- Prüfung 3: Platzierungen ---------------------------------------------

function dateien(dir: string, endungen: string[]): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...dateien(p, endungen));
    else if (endungen.some((x) => e.endsWith(x))) out.push(p);
  }
  return out;
}
const zeileVon = (src: string, index: number) => src.slice(0, index).split('\n').length;
const rel = (p: string) => relative(ROOT, p).replace(/\\/g, '/');
const KREDIT_RECHNER_SET = new Set<string>(KREDIT_RECHNER);

let platzierungen = 0;
let kreditPlatzierungen = 0;

function pruefeKontext(programId: ProgramId, context: string | undefined, fundstelle: string) {
  if (!context || !CONTEXT_TEXTS[programId]?.[context]) {
    verletzt(`Platzierung: ${fundstelle} — unbekannter Kontext „${context ?? '(keiner)'}" für ${programId}.`);
  }
}

const komponenten = [
  ...dateien(join(ROOT, 'components'), ['.tsx']),
  ...dateien(join(ROOT, 'app'), ['.tsx']),
].filter((p) => !p.endsWith(join('components', 'AffiliateBox.tsx')));

for (const datei of komponenten) {
  const src = readFileSync(datei, 'utf8');
  const namen = [...src.matchAll(/rechnerName=(?:"([^"]+)"|\{['"]([^'"]+)['"]\})/g)].map((m) => m[1] ?? m[2]);
  for (const m of src.matchAll(/<AffiliateBox\b([^>]*?)\/?>/g)) {
    const attrs = m[1];
    const prog = /programId="([^"]+)"/.exec(attrs)?.[1];
    if (prog !== 'smava' && prog !== 'check24') continue;
    const context = /context="([^"]+)"/.exec(attrs)?.[1];
    const fundstelle = `${rel(datei)}:${zeileVon(src, m.index ?? 0)}`;
    platzierungen += 1;
    pruefeKontext(prog, context, fundstelle);
    if (istKreditwerbung(prog, ziel(prog, context))) {
      kreditPlatzierungen += 1;
      if (!namen.some((n) => KREDIT_RECHNER_SET.has(n))) {
        verletzt(`Platzierung: ${fundstelle} — Kreditwerbung (${prog}/${context}), aber kein rechnerName aus `
          + `KREDIT_RECHNER in der Datei (gefunden: ${namen.join(', ') || 'keiner'}).`);
      }
    }
  }
}

const configDateien = dateien(join(ROOT, 'lib', 'rechner-config'), ['.ts'])
  .filter((p) => !p.endsWith('client-data.ts'));
for (const datei of configDateien) {
  const src = readFileSync(datei, 'utf8');
  for (const m of src.matchAll(/\{\s*programId:\s*'([^']+)'([^}]*)\}/g)) {
    const prog = m[1];
    if (prog !== 'smava' && prog !== 'check24') continue;
    const context = /context:\s*'([^']+)'/.exec(m[2])?.[1];
    const fundstelle = `${rel(datei)}:${zeileVon(src, m.index ?? 0)}`;
    platzierungen += 1;
    pruefeKontext(prog, context, fundstelle);
    if (istKreditwerbung(prog, ziel(prog, context))) {
      kreditPlatzierungen += 1;
      verletzt(`Platzierung: ${fundstelle} — Kreditwerbung (${prog}/${context}) in lib/rechner-config/. `
        + 'Kreditplatzierungen stehen in der Rechner-Komponente, damit die KI-Regel sicher greift.');
    }
  }
}

// --- Ergebnis --------------------------------------------------------------

if (verletzungen.length) {
  console.error(`\x1b[31m✗ verify-kreditwerbung: ${verletzungen.length} Verletzung(en)\x1b[0m`);
  for (const v of verletzungen) console.error(`  - ${v}`);
  process.exit(1);
}
console.log(`\x1b[32m✓ verify-kreditwerbung: ${paare.length} Programm/Kontext-Paare, davon ${kreditPaare.length} `
  + `Kreditwerbung, ${gerendert} Darstellungen gerendert (Warnhinweis je genau einmal, sichtbar), `
  + `${platzierungen} Platzierungen smava/check24, davon ${kreditPlatzierungen} mit Kreditwerbung\x1b[0m`);
