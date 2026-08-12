#!/usr/bin/env node
/**
 * Prueft die Laenge aller metaDescription-Felder in den Rechner-Configs.
 *
 * CLAUDE.md legt fest: hoechstens 155 Zeichen. Ein Wert von genau 155 ist
 * damit zulaessig, erst 156 bricht ab.
 *
 * Gezaehlt wird zeichenweise (Unicode-Codepoints), nicht byteweise: ein
 * Umlaut ist ein Zeichen, auch wenn er in UTF-8 zwei Bytes belegt.
 *
 * Gelesen wird mit einem echten String-Leser samt Escape-Behandlung, nicht
 * mit einem Muster wie '([^']*)'. Ein maskiertes Apostroph beendet den
 * String sonst zu frueh und der Wert wird zu kurz gemessen.
 *
 * Aufruf: node scripts/check-metadescription.mjs
 * Exit 0 = alles im Rahmen, Exit 1 = mindestens eine Ueberschreitung.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const VERZEICHNIS = 'lib/rechner-config';
const HOECHSTLAENGE = 155;

// client-data.ts ist eine generierte Kopie (JSON-Notation) und wird bei jedem
// Build aus den Quellen neu erzeugt. types.ts enthaelt nur Typdeklarationen.
const AUSGENOMMEN = new Set(['client-data.ts', 'types.ts']);

/**
 * Liest ein String-Literal ab der Position der oeffnenden Anfuehrung und
 * gibt den tatsaechlichen Textwert zurueck (Escapes aufgeloest).
 * Gibt null zurueck, wenn dort kein einfaches String-Literal steht.
 */
function leseStringLiteral(text, pos) {
  const anfuehrung = text[pos];
  if (anfuehrung !== "'" && anfuehrung !== '"') return null;

  let i = pos + 1;
  let wert = '';

  while (i < text.length) {
    const zeichen = text[i];

    if (zeichen === '\\') {
      const naechstes = text[i + 1];
      if (naechstes === undefined) return null;

      if (naechstes === 'n') { wert += '\n'; i += 2; continue; }
      if (naechstes === 't') { wert += '\t'; i += 2; continue; }
      if (naechstes === 'r') { wert += '\r'; i += 2; continue; }
      if (naechstes === 'b') { wert += '\b'; i += 2; continue; }
      if (naechstes === 'f') { wert += '\f'; i += 2; continue; }
      if (naechstes === 'v') { wert += '\v'; i += 2; continue; }
      if (naechstes === '0' && !/[0-9]/.test(text[i + 2] ?? '')) {
        wert += '\0'; i += 2; continue;
      }

      // \xNN
      if (naechstes === 'x') {
        const hex = text.slice(i + 2, i + 4);
        if (!/^[0-9a-fA-F]{2}$/.test(hex)) return null;
        wert += String.fromCharCode(parseInt(hex, 16));
        i += 4;
        continue;
      }

      // \u{NNNN} und \uNNNN
      if (naechstes === 'u') {
        if (text[i + 2] === '{') {
          const schluss = text.indexOf('}', i + 3);
          if (schluss === -1) return null;
          const hex = text.slice(i + 3, schluss);
          if (!/^[0-9a-fA-F]{1,6}$/.test(hex)) return null;
          wert += String.fromCodePoint(parseInt(hex, 16));
          i = schluss + 1;
          continue;
        }
        const hex = text.slice(i + 2, i + 6);
        if (!/^[0-9a-fA-F]{4}$/.test(hex)) return null;
        wert += String.fromCharCode(parseInt(hex, 16));
        i += 6;
        continue;
      }

      // Zeilenfortsetzung: Backslash direkt vor Zeilenumbruch
      if (naechstes === '\n') { i += 2; continue; }

      // Alles uebrige, insbesondere \' \" \\ : ein einzelnes Zeichen
      wert += naechstes;
      i += 2;
      continue;
    }

    if (zeichen === anfuehrung) return { wert, ende: i + 1 };

    // Ein unmaskierter Zeilenumbruch beendet ein normales String-Literal nicht
    // gueltig -- dann stimmt an der Stelle etwas nicht.
    if (zeichen === '\n') return null;

    wert += zeichen;
    i += 1;
  }

  return null;
}

/** Zeilennummer zu einer Zeichenposition. */
function zeileZu(text, pos) {
  let zeile = 1;
  for (let i = 0; i < pos; i += 1) if (text[i] === '\n') zeile += 1;
  return zeile;
}

/** Sucht den zuletzt vor pos deklarierten slug als Kontextangabe. */
function slugVor(text, pos) {
  const ausschnitt = text.slice(0, pos);
  const letzter = ausschnitt.lastIndexOf('slug:');
  if (letzter === -1) return '(ohne slug)';
  const gelesen = leseStringLiteral(
    text,
    letzter + text.slice(letzter).search(/['"]/),
  );
  return gelesen ? gelesen.wert : '(ohne slug)';
}

const dateien = readdirSync(VERZEICHNIS)
  .filter((name) => name.endsWith('.ts'))
  .filter((name) => !AUSGENOMMEN.has(name))
  .sort();

const verstoesse = [];
const unlesbar = [];
let geprueft = 0;
let laengster = { laenge: -1, slug: '', datei: '' };

for (const datei of dateien) {
  const pfad = join(VERZEICHNIS, datei);
  const text = readFileSync(pfad, 'utf8');

  // Feldbezeichner nur dort, wo er wirklich als Objektschluessel steht:
  // am Zeilenanfang oder nach {  ,  Leerraum, gefolgt von einem Doppelpunkt.
  const muster = /(^|[\s{,;])metaDescription\s*:\s*/g;
  let treffer;

  while ((treffer = muster.exec(text)) !== null) {
    const wertPos = treffer.index + treffer[0].length;

    // Typdeklarationen (metaDescription: string;) sind keine Werte.
    if (/^string\b/.test(text.slice(wertPos, wertPos + 7))) continue;

    const gelesen = leseStringLiteral(text, wertPos);

    if (!gelesen) {
      unlesbar.push({
        datei,
        zeile: zeileZu(text, wertPos),
        slug: slugVor(text, treffer.index),
        anfang: text.slice(wertPos, wertPos + 40).split('\n')[0],
      });
      continue;
    }

    geprueft += 1;

    // Zeichenweise zaehlen: Array.from zerlegt in Codepoints, nicht in
    // UTF-16-Einheiten. .length wuerde Zeichen ausserhalb der BMP doppelt
    // zaehlen.
    const laenge = Array.from(gelesen.wert).length;
    const slug = slugVor(text, treffer.index);

    if (laenge > laengster.laenge) {
      laengster = { laenge, slug, datei };
    }

    if (laenge > HOECHSTLAENGE) {
      verstoesse.push({
        datei,
        zeile: zeileZu(text, wertPos),
        slug,
        laenge,
        wert: gelesen.wert,
      });
    }

    muster.lastIndex = gelesen.ende;
  }
}

if (unlesbar.length > 0) {
  console.error(
    `\nFEHLER: ${unlesbar.length} metaDescription-Feld(er) konnten nicht ` +
      `gelesen werden.\nErlaubt sind einfache String-Literale in ' oder ", ` +
      `keine Template-Literale und keine Ausdruecke.\n`,
  );
  for (const f of unlesbar) {
    console.error(`  ${f.datei}:${f.zeile}  ${f.slug}`);
    console.error(`    steht dort: ${f.anfang}`);
  }
  console.error('');
  process.exit(1);
}

if (verstoesse.length > 0) {
  console.error(
    `\nFEHLER: ${verstoesse.length} metaDescription ueber ` +
      `${HOECHSTLAENGE} Zeichen.\n`,
  );
  for (const v of verstoesse) {
    console.error(`  ${v.datei}:${v.zeile}  ${v.slug}`);
    console.error(`    ${v.laenge} Zeichen (${v.laenge - HOECHSTLAENGE} zu viel)`);
    console.error(`    ${v.wert}`);
    console.error('');
  }
  console.error(
    `CLAUDE.md gibt hoechstens ${HOECHSTLAENGE} Zeichen vor. Kuerzen und ` +
      `erneut pruefen.\n`,
  );
  process.exit(1);
}

console.log(
  `metaDescription: ${geprueft} Felder in ${dateien.length} Dateien geprueft, ` +
    `alle <= ${HOECHSTLAENGE} Zeichen.`,
);
console.log(
  `  laengster Wert: ${laengster.laenge} Zeichen (${laengster.slug}, ` +
    `${laengster.datei})`,
);
