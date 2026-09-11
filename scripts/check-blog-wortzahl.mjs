#!/usr/bin/env node
/**
 * scripts/check-blog-wortzahl.mjs
 *
 * Die verbindliche Zählmethode für Blog-Fließtext (Welle 61), ab Welle 137 als
 * ausführbarer Code statt als Beschreibung. Wer eine Wortzahl braucht, ruft dieses
 * Skript auf. Eine eigene Zählung — mit sed, mit Python, mit einem Einzeiler im Kopf —
 * ist keine Messung nach dieser Methode, auch wenn sie ähnlich aussieht.
 *
 * Aufruf:
 *   node scripts/check-blog-wortzahl.mjs <slug>            # ein Artikel
 *   node scripts/check-blog-wortzahl.mjs --all             # alle Artikel
 *   node scripts/check-blog-wortzahl.mjs --selbsttest      # nur die Eigenprüfung
 *   node scripts/check-blog-wortzahl.mjs --all --warnung   # ohne Exit-Code (prebuild)
 *
 * DIE METHODE
 * Gezählt wird ausschließlich Markdown-Prosa zwischen der ersten "##"-Überschrift und
 * der Zeile "<Quellen". Ausgeschlossen sind alle Zeilen, die mit "<" beginnen oder auf
 * "/>" enden (JSX, Grafiken, Bild, Video, RechnerLoader), sowie die Überschriften
 * selbst. Markup wird vor dem Zählen entfernt: Sternchen, Backticks, Linkziele. Der
 * KarstenSagt-Block zählt mit, weil sein Text als Markdown-Prosa zwischen den Grenzen
 * steht — es ist Fließtext des Artikels.
 *
 * Die Rechnerposition folgt derselben Methode: Wörter vor der "<RechnerLoader"-Zeile
 * geteilt durch Gesamtwörter. Zielkorridor 29 bis 40 Prozent.
 *
 * DER SELBSTTEST
 * Er läuft automatisch vor jeder Messung, nicht nur auf Zuruf. Weicht ein Wert ab,
 * bricht das Skript ab und gibt KEINE Zahlen aus — auch mit "--warnung" nicht. Ein
 * Zählskript, dessen Richtigkeit nicht geprüft ist, verleiht einer falschen Zahl
 * Autorität; das ist schlechter als gar keine Zahl.
 *
 * Die Referenzwerte stammen aus Welle 61, wo die Methode festgelegt wurde, und sind in
 * .claude/skills/blog-builder/SKILL.md dokumentiert (2.846 für Terabyte, 3.128 Wörter
 * und 54 Prozent für Artikel 15). Wer die Zähllogik später ändert und dabei den
 * Selbsttest anpasst, hat die Methode geändert und nicht das Skript verbessert.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'app', 'blog');

const MIN_WOERTER = 3000;
const POS_MIN = 29;
const POS_MAX = 40;

/** Bestandswerte aus Welle 61 — siehe Kopfkommentar. Nicht anpassen. */
const REFERENZ = [
  { slug: 'warum-1-terabyte-nur-931-gigabyte-sind', woerter: 2846, position: null },
  { slug: 'warum-100-kmh-dort-noch-87-sind', woerter: 3128, position: 54.3 },
];

const args = process.argv.slice(2);
const alle = args.includes('--all');
const nurSelbsttest = args.includes('--selbsttest');
const warnung = args.includes('--warnung');
const slugArg = args.find((a) => !a.startsWith('--'));

// ---------------------------------------------------------------- Zähllogik

function markupEntfernen(zeile) {
  return zeile
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Linkziel weg, Linktext bleibt
    .replace(/[`*]/g, '') // Backticks, ** und *
    .trim();
}

function istAusgeschlossen(zeile) {
  return zeile === '' || zeile.startsWith('#') || zeile.startsWith('<') || zeile.endsWith('/>');
}

function messeArtikel(roh) {
  const zeilen = roh.split(/\r?\n/);
  const start = zeilen.findIndex((z) => z.startsWith('## '));
  const ende = zeilen.findIndex((z) => z.trimStart().startsWith('<Quellen'));
  if (start === -1) return { fehler: 'keine ##-Überschrift gefunden' };
  if (ende === -1) return { fehler: 'keine <Quellen-Zeile gefunden' };
  if (ende <= start) return { fehler: '<Quellen steht vor der ersten ##-Überschrift' };

  let woerter = 0;
  let vorRechner = 0;
  let rechnerGesehen = false;
  let rechnerVorhanden = false;

  for (const zeile of zeilen.slice(start, ende)) {
    const t = zeile.trim();
    if (t.startsWith('<RechnerLoader')) {
      rechnerGesehen = true;
      rechnerVorhanden = true;
    }
    if (istAusgeschlossen(t)) continue;
    const n = markupEntfernen(t).split(/\s+/).filter(Boolean).length;
    woerter += n;
    if (!rechnerGesehen) vorRechner += n;
  }

  return {
    woerter,
    position: rechnerVorhanden && woerter > 0 ? (vorRechner / woerter) * 100 : null,
  };
}

function lese(slug) {
  const pfad = join(BLOG_DIR, slug, 'page.mdx');
  if (!existsSync(pfad)) return null;
  return readFileSync(pfad, 'utf8');
}

function alleSlugs() {
  return readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(BLOG_DIR, d.name, 'page.mdx')))
    .map((d) => d.name)
    .sort();
}

// --------------------------------------------------------------- Selbsttest

function selbsttest() {
  const abweichungen = [];
  for (const soll of REFERENZ) {
    const roh = lese(soll.slug);
    if (roh === null) {
      abweichungen.push(`${soll.slug}: Artikel nicht gefunden`);
      continue;
    }
    const ist = messeArtikel(roh);
    if (ist.fehler) {
      abweichungen.push(`${soll.slug}: ${ist.fehler}`);
      continue;
    }
    if (ist.woerter !== soll.woerter) {
      abweichungen.push(
        `${soll.slug}: Wortzahl ${ist.woerter}, erwartet ${soll.woerter} (Abweichung ${ist.woerter - soll.woerter})`,
      );
    }
    if (soll.position !== null) {
      const gerundet = Math.round(ist.position * 10) / 10;
      if (gerundet !== soll.position) {
        abweichungen.push(
          `${soll.slug}: Rechnerposition ${gerundet.toFixed(1)} %, erwartet ${soll.position.toFixed(1)} %`,
        );
      }
    }
  }

  if (abweichungen.length > 0) {
    console.error('');
    console.error('  SELBSTTEST FEHLGESCHLAGEN — keine Messung ausgegeben.');
    console.error('');
    for (const a of abweichungen) console.error(`    ${a}`);
    console.error('');
    console.error('  Die Zähllogik trifft die Referenzwerte aus Welle 61 nicht mehr. Damit ist');
    console.error('  jede Zahl aus diesem Skript wertlos. Entweder wurde die Zähllogik geändert');
    console.error('  — dann ist die Methode geändert, nicht das Skript verbessert — oder einer');
    console.error('  der beiden Referenzartikel wurde bearbeitet. Beides gehört geklärt, bevor');
    console.error('  wieder gemessen wird. Die Referenzwerte sind NICHT anzupassen.');
    console.error('');
    return false;
  }

  console.log('  Selbsttest gruen:');
  for (const soll of REFERENZ) {
    const ist = messeArtikel(lese(soll.slug));
    const pos = soll.position !== null ? `, ${(Math.round(ist.position * 10) / 10).toFixed(1)} %` : '';
    console.log(`      ${soll.slug} — ${ist.woerter} Wörter${pos}`);
  }
  return true;
}

// ------------------------------------------------------------------ Ausgabe

function bewerte(m) {
  const marken = [];
  if (m.woerter < MIN_WOERTER) marken.push(`unter ${MIN_WOERTER}`);
  if (m.position === null) marken.push('kein RechnerLoader');
  else if (m.position < POS_MIN || m.position > POS_MAX) {
    marken.push(`Rechner ausserhalb ${POS_MIN}–${POS_MAX} %`);
  }
  return marken;
}

function zeigeArtikel(slug) {
  const roh = lese(slug);
  if (roh === null) {
    console.error(`  ! ${slug}: app/blog/${slug}/page.mdx nicht gefunden`);
    return false;
  }
  const m = messeArtikel(roh);
  if (m.fehler) {
    console.error(`  ! ${slug}: ${m.fehler}`);
    return false;
  }
  const marken = bewerte(m);
  const pos = m.position === null ? '    —  ' : `${m.position.toFixed(1).padStart(5)} %`;
  const hinweis = marken.length === 0 ? '' : `   <- ${marken.join(', ')}`;
  console.log(`  ${marken.length === 0 ? ' ' : '!'} ${slug.padEnd(50)} ${String(m.woerter).padStart(5)} W  ${pos}${hinweis}`);
  return marken.length === 0;
}

function main() {
  console.log('');
  console.log('  Blog-Wortzahl — verbindliche Methode (Welle 61, Skript seit Welle 137)');
  console.log('');

  if (!selbsttest()) process.exit(1);
  console.log('');

  if (nurSelbsttest) return;

  const slugs = alle ? alleSlugs() : slugArg ? [slugArg] : null;
  if (!slugs) {
    console.error('  Aufruf: node scripts/check-blog-wortzahl.mjs <slug> | --all | --selbsttest');
    process.exit(1);
  }

  console.log(`  Vorgaben: mindestens ${MIN_WOERTER} Wörter, Rechner zwischen ${POS_MIN} und ${POS_MAX} Prozent`);
  console.log('');

  let auffaellig = 0;
  for (const slug of slugs) {
    if (!zeigeArtikel(slug)) auffaellig++;
  }

  console.log('');
  if (auffaellig === 0) {
    console.log(`  ${slugs.length} Artikel, alle innerhalb der Vorgaben.`);
  } else {
    console.log(`  ${slugs.length} Artikel, ${auffaellig} ausserhalb der Vorgaben.`);
    console.log('  Das ist eine Bestandsaufnahme, kein Arbeitsauftrag.');
  }
  console.log('');

  if (auffaellig > 0 && !warnung) process.exit(1);
}

main();
