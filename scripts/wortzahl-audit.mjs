/**
 * W15C T3 — Wortzahl-Audit für alle Rechner.
 *
 * Liest alle Configs aus lib/rechner-config/<kat>.ts, extrahiert pro Rechner
 * die Wortzahl in erklaerung + faq (Frage + Antwort jeweils), schreibt
 * CSV-Output nach STDOUT.
 *
 * Spezialfall INLINE_ERKLAERUNG_SLUGS: brutto-netto-rechner rendert seinen
 * Erklärtext + FAQ inline in der Component (W13.1.1+), nicht aus der Config.
 * Diese Rechner werden mit Tag [INLINE] markiert — die Config-Wortzahl
 * spiegelt nicht den tatsächlich gerenderten Content wider.
 *
 * SCHON_AUFGEWERTET-Liste: Top-10 (W15A.3) + 6 Long-Tail (W15B) sind
 * bereits substantiell aufgewertet und bekommen Tag [ALREADY_DONE].
 *
 * Ausführung über tsx-Loader (npx tsx scripts/wortzahl-audit.mjs), weil
 * Configs als TypeScript geschrieben sind. Repo-Konvention (vgl. tsx-
 * Nutzung in prebuild + audit:bundle + verify-*.ts).
 */
import { rechner, kategorien } from '../lib/rechner-config/index.ts';

// Slugs mit Inline-Erklärung in der Component statt aus der Config gerendert
// (siehe app/[kategorie]/[rechner]/page.tsx → INLINE_ERKLAERUNG_SLUGS).
const INLINE_SLUGS = new Set(['brutto-netto-rechner']);

// Bereits aufgewertete Slugs aus W15A.3 (Top-10) + W15B (Long-Tail).
// Werden mit Tag [ALREADY_DONE] markiert und in den Bewertungs-Zählungen
// ausgeschlossen.
const SCHON_AUFGEWERTET = new Set([
  // Top-10 (W15A.3)
  'brutto-netto-rechner',
  'mwst-rechner',
  'zinsrechner',
  'bmi-rechner',
  'stundenlohn-rechner',
  'spritkosten-rechner',
  'tagerechner',
  'dreisatz-rechner',
  'mietrechner',
  'stromkosten-rechner',
  // Long-Tail (W15B) — keine Config-Slugs, nur defensiv
  '2000-euro-brutto-netto',
  '2500-euro-brutto-netto',
  '3000-euro-brutto-netto',
  '3500-euro-brutto-netto',
  '4000-euro-brutto-netto',
  '5000-euro-brutto-netto',
]);

/**
 * Zählt Wörter in einem Text.
 * - HTML-Tags werden entfernt (für eventuelle Inline-HTML in erklaerung)
 * - Markdown-Marker (** __ *) werden NICHT entfernt — sie zählen als Teil
 *   des Worts, aber das ist konsistent über alle Rechner und verzerrt
 *   nichts relevant
 * - Template-Interpolationen ${...} werden entfernt (zählen nicht als Wort)
 * - Leerzeichen-getrennte Tokens, mehrfaches Whitespace kollabiert
 */
function wortZahl(text) {
  if (!text) return 0;
  return text
    .replace(/<[^>]+>/g, ' ')        // HTML-Tags raus
    .replace(/\$\{[^}]+\}/g, ' ')    // Template-Interpolationen raus
    .split(/\s+/)
    .filter(w => w.length > 0)
    .length;
}

const audit = [];
for (const r of rechner) {
  const erklaerungW = wortZahl(r.erklaerung);
  const faqW = r.faq.reduce((sum, f) => sum + wortZahl(f.frage) + wortZahl(f.antwort), 0);
  const totalW = erklaerungW + faqW;

  let bewertung;
  let tag = '';
  if (INLINE_SLUGS.has(r.slug)) {
    tag = 'INLINE';
    bewertung = 'INLINE';  // Config-Wortzahl nicht aussagekräftig
  } else if (SCHON_AUFGEWERTET.has(r.slug)) {
    tag = 'ALREADY_DONE';
    bewertung = totalW < 300 ? 'KRITISCH' : totalW < 500 ? 'DUENN' : totalW < 800 ? 'AKZEPTABEL' : 'GUT';
  } else {
    bewertung = totalW < 300 ? 'KRITISCH' : totalW < 500 ? 'DUENN' : totalW < 800 ? 'AKZEPTABEL' : 'GUT';
  }

  audit.push({
    slug: r.slug,
    kat: r.kategorieSlug,
    titel: r.titel,
    erklaerungW,
    faqW,
    totalW,
    bewertung,
    tag,
  });
}

// Sortiert nach Gesamt-Wortzahl aufsteigend (dünnste zuerst)
audit.sort((a, b) => a.totalW - b.totalW);

// CSV-Header
console.log('Slug,Kategorie,Titel,Wortzahl_Erklaerung,Wortzahl_FAQ,Wortzahl_Gesamt,Bewertung,Tag');

// CSV-Zeilen (Titel in Anführungszeichen falls Komma enthalten)
for (const r of audit) {
  const titelCsv = r.titel.includes(',') ? `"${r.titel.replace(/"/g, '""')}"` : r.titel;
  console.log(`${r.slug},${r.kat},${titelCsv},${r.erklaerungW},${r.faqW},${r.totalW},${r.bewertung},${r.tag}`);
}

// STDERR-Zusammenfassung (geht NICHT in die CSV, nur zur Terminal-Anzeige)
const zaehlung = { KRITISCH: 0, DUENN: 0, AKZEPTABEL: 0, GUT: 0, INLINE: 0, ALREADY_DONE: 0 };
const proKat = {};
for (const r of audit) {
  if (r.tag === 'ALREADY_DONE') {
    zaehlung.ALREADY_DONE++;
    continue;
  }
  if (r.tag === 'INLINE') {
    zaehlung.INLINE++;
    continue;
  }
  zaehlung[r.bewertung]++;
  if (!proKat[r.kat]) proKat[r.kat] = { KRITISCH: 0, DUENN: 0, AKZEPTABEL: 0, GUT: 0, total: 0 };
  proKat[r.kat][r.bewertung]++;
  proKat[r.kat].total++;
}

console.error('');
console.error('=== ZUSAMMENFASSUNG ===');
console.error(`Total Rechner: ${audit.length}`);
console.error(`  ALREADY_DONE: ${zaehlung.ALREADY_DONE} (W15A.3 Top-10 + W15B Long-Tail)`);
console.error(`  INLINE:       ${zaehlung.INLINE} (Component-Inline-Erklärung)`);
console.error(`  KRITISCH:     ${zaehlung.KRITISCH} (<300 W)`);
console.error(`  DUENN:        ${zaehlung.DUENN} (300–499 W)`);
console.error(`  AKZEPTABEL:   ${zaehlung.AKZEPTABEL} (500–799 W)`);
console.error(`  GUT:          ${zaehlung.GUT} (800+ W)`);
console.error('');
console.error('=== PRO KATEGORIE (ohne ALREADY_DONE / INLINE) ===');
const kategorienSortiert = kategorien.map(k => k.slug);
for (const katSlug of kategorienSortiert) {
  const p = proKat[katSlug];
  if (!p) continue;
  console.error(`${katSlug.padEnd(12)} total=${String(p.total).padStart(2)}  KRIT=${p.KRITISCH}  DUENN=${p.DUENN}  AKZ=${p.AKZEPTABEL}  GUT=${p.GUT}`);
}
