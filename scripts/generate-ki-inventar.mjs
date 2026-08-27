#!/usr/bin/env node
// Erzeugt public/ki-medien/inventar.json aus Repo-Quellen und prueft sie.
//
// WARUM ABGELEITET STATT HANDGEPFLEGT (Welle 127, 28.08.2026):
// In Welle 115 sind die drei Medien von Artikel 17 nicht ins Inventar
// eingetragen worden; die Luecke lag zwoelf Tage unbemerkt. Welle 125 hat einen
// Guard dagegen gebaut — der meldet sie aber erst, wenn sie da ist. Eine
// abgeleitete Datei kann gar nicht erst auseinanderlaufen.
//
// HARTE GRENZE, nicht verhandelbar:
// Das Inventar wird NIEMALS aus einem Scan der ausgelieferten Seiten oder der
// Sitemap erzeugt, auch nicht teilweise. Es ist die SOLL-Seite des Abgleichs
// der Kennzeichen-Wache. Wuerde es aus dem IST erzeugt, prueft die Wache
// nichts mehr — sie verglichen dann das Ausgelieferte mit sich selbst.
// Alle Quellen liegen im Repo:
//
//   datei     <- Schluessel der GENERATOREN-Tabelle, mit '/blog/' davor
//   art       <- Dateiendung: .mp4/.webm = video, sonst bild
//   seite     <- die app/blog/<slug>/page.mdx, die das Medium referenziert
//                (src=, poster= oder image: im Article-Schema); slug = Ordner
//   generator <- Wert der GENERATOREN-Tabelle, woertlich
//
// Die GENERATOREN-Tabelle bleibt handgepflegt und behaelt ihre Form
// (Dateiname -> Generator-String). Sie traegt die einzige Angabe, die sich
// nicht ableiten laesst: die Entscheidung, DASS ein Medium KI-erzeugt ist und
// VON WELCHEM Modell. Alles andere ist eine mechanische Tatsache ueber das Repo.
//
// ZU "_stand": Das Feld nennt den Tag der letzten INHALTLICHEN Aenderung, nicht
// den des letzten Laufs. Bleiben Menge und Feldwerte gleich, wird der alte Wert
// unveraendert uebernommen. Ein Datum, das bei jedem Build hochspringt, waere
// eine Luege ueber die Aktualitaet. Eine reine Umsortierung ist keine
// inhaltliche Aenderung.
//
// ZU REGEL 3: Die Pruefung des Dateibestands auf der Platte stammt aus dem
// abgeloesten scripts/check-ki-inventar.mjs (Welle 125) und ist vollstaendig
// uebernommen. Sie ist die einzige Regel, die die Ableitung NICHT ohnehin
// erzwingt: Ob eine gefuehrte Datei wirklich in public/blog/ liegt und ob dort
// eine unerfasste Mediendatei liegt, sieht man den Listen nicht an.
//
// Aufruf: node scripts/generate-ki-inventar.mjs            (schreiben)
//         node scripts/generate-ki-inventar.mjs --pruefen  (nur vergleichen)
//
// Exit 0 bei Erfolg. Exit 1 bei jeder Abweichung, mit Meldung.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SKRIPT = 'scripts/ki-metadaten-schreiben.mjs';
const INVENTAR = 'public/ki-medien/inventar.json';
const BLOGDIR = join(ROOT, 'app', 'blog');
const BLOG = join(ROOT, 'public', 'blog');

const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const PRUEFEN = process.argv.includes('--pruefen');

function fail(msg) {
  console.error(`${RED}FEHLER generate-ki-inventar:${RESET} ${msg}`);
  process.exit(1);
}

// --- 1. GENERATOREN-Tabelle einlesen -------------------------------------
const skriptSrc = readFileSync(join(ROOT, SKRIPT), 'utf8');
const start = skriptSrc.indexOf('const GENERATOREN');
if (start === -1) {
  fail(`GENERATOREN-Block in ${SKRIPT} nicht gefunden (Umbenennung oder Refactor?).\n` +
    '  Ohne die Tabelle laesst sich das Inventar weder erzeugen noch pruefen.');
}
const ende = skriptSrc.indexOf('\n};', start);
if (ende === -1) fail(`GENERATOREN-Block gefunden, aber kein Abschluss '};' — Struktur unerwartet.`);

const tabelle = new Map();
for (const m of skriptSrc.slice(start, ende).matchAll(/^\s*'([^']+)':\s*'([^']+)',/gm)) {
  if (tabelle.has(m[1])) fail(`Doppelter Schluessel in der GENERATOREN-Tabelle: ${m[1]}`);
  tabelle.set(m[1], m[2]);
}

// Plausibilitaetsbremse (uebernommen aus check-ki-inventar.mjs, Welle 125):
// Ein Guard, der wegen Parse-Fehlern still gruen wird, ist wertlos — und ein
// Generator, der deswegen eine fast leere Datei schreibt, ist schlimmer.
const MINDESTZAHL = 30;
if (tabelle.size < MINDESTZAHL) {
  fail(`Nur ${tabelle.size} Eintraege aus der GENERATOREN-Tabelle gelesen (erwartet >= ${MINDESTZAHL}).\n` +
    '  Das Format der Tabelle hat sich vermutlich geaendert. Lieber abbrechen als\n' +
    '  eine verstuemmelte Datei schreiben oder gruen zu melden.');
}

// --- 2. Regel 3: Dateibestand gegen die Tabelle --------------------------
// Vollstaendig aus scripts/check-ki-inventar.mjs uebernommen, beide Richtungen.
const fehlendeDatei = [...tabelle.keys()].filter((k) => !existsSync(join(BLOG, k))).sort();
if (fehlendeDatei.length) {
  fail(`${fehlendeDatei.length} in der GENERATOREN-Tabelle gefuehrte Medien fehlen in public/blog/:\n` +
    fehlendeDatei.map((f) => `    ${f}`).join('\n') +
    '\n  Datei geloescht oder umbenannt? Dann gehoert die Tabelle mitgezogen.');
}

const MEDIEN_ENDUNGEN = /\.(png|jpg|jpeg|webp|mp4|webm)$/i;
const unerfasst = readdirSync(BLOG)
  .filter((f) => MEDIEN_ENDUNGEN.test(f))
  .filter((f) => !tabelle.has(f))
  .sort();
if (unerfasst.length) {
  fail(`${unerfasst.length} Mediendateien in public/blog/ stehen nicht in der GENERATOREN-Tabelle:\n` +
    unerfasst.map((f) => `    ${f}`).join('\n') +
    '\n  Jedes KI-erzeugte Medium braucht einen Tabelleneintrag — ohne ihn bekommt die Datei\n' +
    '  keine XMP-Kennzeichnung (Art. 50 Abs. 4 KI-VO) und steht in keinem Inventar.\n' +
    '  Handelt es sich ausnahmsweise NICHT um ein KI-erzeugtes Medium, muss es hier ausgenommen\n' +
    '  werden — mit einer Begruendung im Kopf dieses Skripts, nicht stillschweigend.');
}

// --- 3. Medium -> Seite aus den MDX-Quellen ------------------------------
const MEDIENREF = /(?:src|poster|image)\s*[=:]\s*['"]?(\/blog\/([a-z0-9._-]+\.(?:png|jpe?g|webp|mp4|webm)))/gi;

const seiteVon = new Map();
for (const slug of readdirSync(BLOGDIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()) {
  const mdx = join(BLOGDIR, slug, 'page.mdx');
  if (!existsSync(mdx)) continue;
  for (const m of readFileSync(mdx, 'utf8').matchAll(MEDIENREF)) {
    if (!seiteVon.has(m[2])) seiteVon.set(m[2], new Set());
    seiteVon.get(m[2]).add(slug);
  }
}

// --- 4. Ableitung, Abbruch bei jeder Unschaerfe --------------------------
const ohneSeite = [];
const mehrdeutig = [];
const eintraege = [];

for (const [name, generator] of tabelle) {
  const slugs = seiteVon.get(name);
  if (!slugs || slugs.size === 0) { ohneSeite.push(name); continue; }
  if (slugs.size > 1) { mehrdeutig.push(`    ${name} -> ${[...slugs].sort().join(', ')}`); continue; }
  eintraege.push({
    datei: `/blog/${name}`,
    art: /\.(mp4|webm)$/i.test(name) ? 'video' : 'bild',
    seite: `/blog/${[...slugs][0]}`,
    generator,
  });
}

if (ohneSeite.length) {
  fail(`${ohneSeite.length} Medien der GENERATOREN-Tabelle werden in keiner page.mdx referenziert:\n` +
    ohneSeite.sort().map((f) => `    ${f}`).join('\n') +
    '\n  Das Feld "seite" laesst sich dafuer nicht ableiten. Entweder ist das Medium verwaist,\n' +
    '  oder es wird ausserhalb der Blogartikel eingebunden — dann braucht dieses Skript eine\n' +
    '  bewusste Erweiterung, keine Ausnahme im Stillen.');
}
if (mehrdeutig.length) {
  fail(`${mehrdeutig.length} Medien werden auf mehreren Seiten eingebunden:\n` +
    mehrdeutig.sort().join('\n') +
    '\n  Das Inventar fuehrt genau eine Seite je Medium. Die Mehrfachnutzung ist eine\n' +
    '  Bauartentscheidung und wird hier nicht geraten.');
}

// Sortierung: alphabetisch nach "datei" — die einzige Regel, die ohne Gedaechtnis
// auskommt. Die Bestandsdatei folgte ihr fuer 39 von 42 Eintraegen; die drei
// Ausreisser waren in Welle 124 ans Ende angehaengt worden.
eintraege.sort((a, b) => (a.datei < b.datei ? -1 : a.datei > b.datei ? 1 : 0));

// --- 5. Meta-Felder ------------------------------------------------------
let alt;
let altRoh;
try {
  altRoh = readFileSync(join(ROOT, INVENTAR), 'utf8');
  alt = JSON.parse(altRoh);
} catch (e) {
  fail(`${INVENTAR} nicht lesbar — ${e.message}\n` +
    '  _hinweis, _quelle und _stand werden aus der Bestandsdatei uebernommen;\n' +
    '  ohne sie kann dieses Skript sie nicht erfinden.');
}

// _stand traegt den Tag der letzten INHALTLICHEN Aenderung. Verglichen wird die
// Menge der Eintraege samt aller Feldwerte, unabhaengig von der Reihenfolge —
// eine Umsortierung ist keine inhaltliche Aenderung.
const normiert = (liste) => JSON.stringify(
  [...liste]
    .map((e) => ({ datei: e.datei, art: e.art, seite: e.seite, generator: e.generator }))
    .sort((a, b) => (a.datei < b.datei ? -1 : a.datei > b.datei ? 1 : 0)),
);

// _hinweis und _quelle werden unveraendert uebernommen und koennen deshalb
// nicht abweichen; verglichen wird ausschliesslich die Eintragsmenge.
const inhaltGleich =
  typeof alt._stand === 'string' &&
  normiert(alt.ki_medien ?? []) === normiert(eintraege);

const heute = new Date();
const laufdatum = [
  String(heute.getDate()).padStart(2, '0'),
  String(heute.getMonth() + 1).padStart(2, '0'),
  heute.getFullYear(),
].join('.');

const neu = {
  _hinweis: alt._hinweis,
  _stand: inhaltGleich ? alt._stand : laufdatum,
  _quelle: alt._quelle,
  ki_medien: eintraege,
};

const text = JSON.stringify(neu, null, 2) + '\n';

// --- 6. Schreiben oder vergleichen ---------------------------------------
if (PRUEFEN) {
  // Vollstaendiger Vergleich, einschliesslich _stand: Weil _stand nur bei
  // inhaltlicher Aenderung springt, ist er hier ein Pruefwert und keine
  // Stoerquelle.
  if (altRoh === text) process.exit(0);
  fail(`${INVENTAR} weicht von der ableitbaren Fassung ab.\n` +
    '  Neu erzeugen mit: node scripts/generate-ki-inventar.mjs\n' +
    '  Die Datei wird abgeleitet und nicht von Hand gepflegt — siehe Kopf dieses Skripts.\n' +
    `  Abgeleitet: ${eintraege.length} Medien, _stand ${neu._stand}.`);
}

writeFileSync(join(ROOT, INVENTAR), text, 'utf8');
console.log(`inventar.json erzeugt: ${eintraege.length} Medien, _stand ${neu._stand}` +
  (inhaltGleich ? ' (unveraendert uebernommen, kein inhaltlicher Unterschied)' : ' (Laufdatum, Inhalt geaendert)'));
