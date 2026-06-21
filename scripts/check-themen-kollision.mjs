#!/usr/bin/env node
/**
 * scripts/check-themen-kollision.mjs
 * Funktionaler Vorab-Duplikat-Hinweis — KEIN Gate, immer Exit 0.
 *
 * Ergänzt check-contentbloecke-struktur.mjs: jenes misst nur STRUKTURELLE
 * Ähnlichkeit (Block-Histogramm) und nur über migrierte Rechner. Es fängt
 * thematische Zweck-Überlappung NICHT (z. B. energiekosten ↔ stromverbrauch,
 * rezept ↔ cups — andere Block-Folge, gleicher Zweck).
 *
 * Dieses Skript flaggt thematisch verwandte Slugs anhand gemeinsamer
 * Themen-Tokens (Slug-Wortstämme + bekannte Stämme), gesucht als Teilstring in
 * Slug UND beschreibung (deutsche Komposita: "strom" ⊂ "Stromkosten"). Es ist
 * ein reiner Hinweis für die Pre-Phase, bevor ein Migrations-Prompt geschrieben
 * wird — viele Treffer (z. B. [kosten]) sind legitime Nachbarn, kein Fehler.
 *
 *   node scripts/check-themen-kollision.mjs          # alle Kollisions-Cluster
 *   node scripts/check-themen-kollision.mjs <slug>   # nur Paare zu <slug>
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = join(__dirname, '..', 'lib', 'rechner-config');
const DATEIEN = ['finanzen.ts','gesundheit.ts','alltag.ts','wohnen.ts','auto.ts','mathe.ts','arbeit.ts','kochen.ts','sport.ts','technik.ts'];

// Kategorie-Sammelnamen ausschließen (falls als slug: '…' auftauchend)
const KATEGORIEN = new Set(['alltag','auto','finanzen','gesundheit','kochen','mathe','sport','technik','wohnen','arbeit']);
// Bekannte Themen-Stämme (als Teilstring gesucht; deckt Komposita ab)
const KNOWN_STEMS = ['strom','energie','kosten','lohn','netto','miet','steuer','zeit','tag','kalor','gewicht','zins','spar','hefe','zucker','cups','backform','noten','zeitwert','afa','rabatt','skonto','prozent'];
// Triviale Tokens / Generika nie als Themen-Token werten
const TRIVIAL = new Set(['pro','und','der','die','das','mit','fuer','von','den','rechner','umrechner']);
const MIN_LEN = 3;

// --- Slug + beschreibung einlesen (ALLE Slugs, nicht nur migrierte) ---
function regionFor(src, fromIdx) {
  const next = src.indexOf("slug: '", fromIdx + 7);
  return src.slice(fromIdx, next === -1 ? src.length : next);
}
function beschreibungOf(region) {
  const m = region.match(/beschreibung:\s*['`]([^'`]*)['`]/);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

const eintraege = [];
const gesehen = new Set();
for (const datei of DATEIEN) {
  let src;
  try { src = readFileSync(join(CONFIG_DIR, datei), 'utf8'); } catch { continue; }
  for (const m of src.matchAll(/slug: '([^']+)'/g)) {
    const slug = m[1];
    if (KATEGORIEN.has(slug) || gesehen.has(slug)) continue;
    gesehen.add(slug);
    eintraege.push({ slug, datei, beschreibung: beschreibungOf(regionFor(src, m.index)) });
  }
}

// --- Vokabular: alle Slug-Wortstämme ∪ bekannte Stämme ---
function slugTokens(slug) {
  return slug.split('-').map(t => t.toLowerCase()).filter(t => t && !TRIVIAL.has(t));
}
const vocab = new Set(KNOWN_STEMS);
for (const e of eintraege) for (const t of slugTokens(e.slug)) vocab.add(t);
const VOCAB = [...vocab].filter(v => v.length >= MIN_LEN && !TRIVIAL.has(v));

// --- Pro Slug: welche Vokabular-Tokens stecken in Slug + beschreibung? ---
for (const e of eintraege) {
  const hay = (e.slug + ' ' + e.beschreibung).toLowerCase();
  e.tokens = new Set(VOCAB.filter(v => hay.includes(v)));
}

// --- Paare mit ≥ 1 gemeinsamem Token ---
const paare = [];
for (let i = 0; i < eintraege.length; i++) {
  for (let j = i + 1; j < eintraege.length; j++) {
    const shared = [...eintraege[i].tokens].filter(t => eintraege[j].tokens.has(t)).sort();
    if (shared.length) paare.push({ a: eintraege[i], b: eintraege[j], shared });
  }
}

// --- Modus: optional auf einen Slug filtern ---
const ziel = process.argv[2];
let anzeige = paare;
if (ziel) {
  if (!gesehen.has(ziel)) {
    console.log('=== Themen-Kollisions-Hinweis (kein Gate; manuell Abgrenzung prüfen) ===');
    console.log(`Slug '${ziel}' nicht in lib/rechner-config/*.ts gefunden.`);
    process.exit(0);
  }
  anzeige = paare.filter(p => p.a.slug === ziel || p.b.slug === ziel);
}

// --- Primär-Token je Paar = das diskriminierendste (seltenste) gemeinsame
//     Token; generische Stämme (kosten, zeit) treten hinter spezifische (strom)
//     zurück. Tie-Break: längeres, dann alphabetisch erstes Token. ---
const freq = {};
for (const e of eintraege) for (const t of e.tokens) freq[t] = (freq[t] || 0) + 1;
const primaer = (shared) =>
  [...shared].sort((x, y) => (freq[x] - freq[y]) || (y.length - x.length) || (x < y ? -1 : 1))[0];

const gruppen = new Map();
for (const p of anzeige) {
  const key = primaer(p.shared);
  p.rest = p.shared.filter(t => t !== key).sort();
  if (!gruppen.has(key)) gruppen.set(key, []);
  gruppen.get(key).push(p);
}

const trunc = (s) => (s.length > 95 ? s.slice(0, 95) + '…' : s);
console.log('=== Themen-Kollisions-Hinweis (kein Gate; manuell Abgrenzung prüfen) ===');
if (ziel) console.log(`(gefiltert auf Slug: ${ziel})`);
for (const key of [...gruppen.keys()].sort()) {
  for (const p of gruppen.get(key)) {
    const extra = p.rest.length ? ` (+${p.rest.join(',')})` : '';
    console.log(`[${key}]${extra} ${p.a.slug} <-> ${p.b.slug}`);
    console.log(`        A: ${trunc(p.a.beschreibung)}`);
    console.log(`        B: ${trunc(p.b.beschreibung)}`);
  }
}
console.log(`${eintraege.length} Slugs geprüft, ${anzeige.length} Kollisions-Paare${ziel ? ' (gefiltert)' : ''}.`);
