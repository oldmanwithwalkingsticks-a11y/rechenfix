/**
 * Verify-Script für die Monatsstunden einer Vollzeitstelle (Welle 196).
 *
 * Regel: Eine 40-Stunden-Woche hat im Monatsdurchschnitt 40 × 52 ÷ 12 = 173,33 Stunden, nicht 160
 * (4 Wochen × 40) und nicht 174. Zentral: VOLLZEIT_STUNDEN_MONAT in lib/berechnungen/_helpers.ts.
 *
 * Anlass: Bis Welle 195 rechneten drei Stellen mit 160 Stunden — „Netto pro Stunde“ im Brutto-Netto-Rechner
 * (3.500 € brutto → 14,58 € statt 13,46 €), der Mindestlohn-Hinweis im Schnellcheck (Schwelle 2.204 € statt
 * 2.409,33 €) und die Seite „Mindestlohn netto“ (2.224 € brutto); die FAQ des Rechners nannte 174 Stunden
 * (13,41 €), die Config-FAQ 160 (14,58 €), der Tipp des Tages 40 × 4,33 (2.407 €).
 *
 * Geprüft werden:
 *   1. die Konstanten,
 *   2. „Netto pro Stunde“ aus berechneBruttoNetto gegen eine eigene Rechnung (Netto × 12 ÷ 2.080),
 *   3. Mindestlohn-Monatsbrutto und die Schwelle des Hinweises,
 *   4. die Texte (beide FAQs gleich, Mindestlohn-FAQ beim Stundenlohn-Rechner, Tipp des Tages),
 *   5. ein Quelltext-Scan nach den alten Mustern in lib/, components/, app/ und scripts/generate-*.ts;
 *      der Scan prüft sich vorher an den alten Zeilen selbst (Fund) und an zulässigen 160ern (kein Fund).
 *      Ausgenommen sind nur einzelne Zeilen im genauen Wortlaut, die den Wert selbst erklären (seit
 *      Welle 199: Blogartikel 21); jede Ausnahme muss in ihrer Datei noch vorkommen und ein Muster treffen.
 *
 * Ausführen: npx tsx scripts/verify-monatsstunden.ts
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { WOCHEN_PRO_MONAT, VOLLZEIT_WOCHENSTUNDEN, VOLLZEIT_STUNDEN_MONAT } from '../lib/berechnungen/_helpers';
import { berechneBruttoNetto, SV_RECHENSTAND } from '../lib/berechnungen/brutto-netto';
import type { BruttoNettoEingabe } from '../lib/berechnungen/brutto-netto';
import {
  getAktuellerMindestlohn, mindestlohnMonatVollzeit, unterMindestlohnBeiVollzeit,
  MINDESTLOHN_2025, MINDESTLOHN_2026, MINDESTLOHN_2027,
} from '../lib/berechnungen/mindestlohn';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '../lib/berechnungen/sv-parameter';
import { MINDESTLOHN_TIPP_BRUTTO } from '../lib/tipp-konstanten';
import { finanzenRechner } from '../lib/rechner-config/finanzen';

type Fall = { name: string; ist: string | number | boolean; soll: string | number | boolean };
const faelle: Fall[] = [];
const fall = (name: string, ist: Fall['ist'], soll: Fall['soll']) => faelle.push({ name, ist, soll });

// Eigene Rechnung, unabhängig von den Konstanten: 40 Stunden × 52 Wochen = 2.080 Stunden im Jahr
const JAHRESSTUNDEN = 2080;
const cent = (x: number) => Math.round(x * 100) / 100;
const de2 = (x: number) => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── 1. Konstanten ──────────────────────────────────────────────────────────────
fall('VOLLZEIT_WOCHENSTUNDEN', VOLLZEIT_WOCHENSTUNDEN, 40);
fall('WOCHEN_PRO_MONAT × 12 = 52', Math.abs(WOCHEN_PRO_MONAT * 12 - 52) < 1e-9, true);
fall('VOLLZEIT_STUNDEN_MONAT × 12 = 2.080', Math.abs(VOLLZEIT_STUNDEN_MONAT * 12 - JAHRESSTUNDEN) < 1e-9, true);
fall('VOLLZEIT_STUNDEN_MONAT auf Cent', cent(VOLLZEIT_STUNDEN_MONAT), 173.33);

// ── 2. Netto pro Stunde ────────────────────────────────────────────────────────
const basis: BruttoNettoEingabe = {
  bruttoMonat: 3500,
  steuerklasse: 1,
  kirchensteuer: false,
  kirchensteuersatz: 9,
  kinderfreibetraege: 0,
  bundesland: '',
  kvArt: 'gesetzlich',
  kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
  kvPrivatBeitrag: 0,
  rvBefreit: false,
  abrechnungszeitraum: 'monat',
};
const v2 = berechneBruttoNetto(basis);
fall('3.500 € StKl I (Video 2): Netto', v2.nettoMonat, 2333.25);
fall('3.500 € StKl I (Video 2): Netto pro Stunde (vorher 14,58)', v2.nettoProStunde, 13.46);
const jahr = berechneBruttoNetto({ ...basis, bruttoMonat: 42000, abrechnungszeitraum: 'jahr' });
fall('42.000 € jährlich: Brutto im Monat', jahr.bruttoMonat, 3500);
fall('42.000 € jährlich: Netto pro Stunde', jahr.nettoProStunde, 13.46);

let rasterFaelle = 0;
const rasterFehler: string[] = [];
for (let brutto = 700; brutto <= 12000; brutto += 37.5) {
  for (const sk of [1, 2, 3, 4, 5, 6] as const) {
    const e = berechneBruttoNetto({ ...basis, bruttoMonat: brutto, steuerklasse: sk });
    // exakt in ganzen Cent: Netto-Cent × 12 ÷ 2.080 = Cent je Stunde, kaufmännisch gerundet
    const soll = Math.round((Math.round(e.nettoMonat * 100) * 12) / JAHRESSTUNDEN) / 100;
    rasterFaelle++;
    if (Math.abs(e.nettoProStunde - soll) > 0.0001) rasterFehler.push(`${brutto} € StKl ${sk}: ${e.nettoProStunde} statt ${soll}`);
  }
}
fall(`Netto pro Stunde = Netto × 12 ÷ 2.080 (${rasterFaelle} Fälle)${rasterFehler.length ? ': ' + rasterFehler.slice(0, 3).join('; ') : ''}`, rasterFehler.length, 0);

// ── 3. Mindestlohn ─────────────────────────────────────────────────────────────
fall('Monatsbrutto Mindestlohn 2025 (12,82 €)', mindestlohnMonatVollzeit(MINDESTLOHN_2025), cent((MINDESTLOHN_2025 * JAHRESSTUNDEN) / 12));
fall('Monatsbrutto Mindestlohn 2026 (13,90 €)', mindestlohnMonatVollzeit(MINDESTLOHN_2026), 2409.33);
fall('Monatsbrutto Mindestlohn 2027 (14,60 €)', mindestlohnMonatVollzeit(MINDESTLOHN_2027), 2530.67);
const schwelle: [number, number, boolean][] = [
  [2409.33, 13.9, false],
  [2409, 13.9, false],   // 13,898… → 13,90 €
  [2408, 13.9, true],    // 13,89 €
  [2300, 13.9, true],    // lag über der alten Schwelle 2.224 − 20 €, kein Hinweis
  [2224, 13.9, true],
  [3500, 13.9, false],
  [0, 13.9, false],
  [2530.67, 14.6, false],
  [2529, 14.6, true],
];
for (const [brutto, ml, soll] of schwelle) {
  fall(`unter Mindestlohn bei Vollzeit: ${de2(brutto)} € bei ${de2(ml)} €/h`, unterMindestlohnBeiVollzeit(brutto, ml), soll);
}

// ── 4. Texte ───────────────────────────────────────────────────────────────────
const faqAntwort = (slug: string, frage: string) =>
  finanzenRechner.find(r => r.slug === slug)?.faq?.find(f => f.frage === frage)?.antwort ?? '';

const configNetto = faqAntwort('brutto-netto-rechner', 'Wie berechne ich mein Netto pro Stunde?');
fall('Config-FAQ Netto pro Stunde: „= 173,33 Stunden“', configNetto.includes('40 × 52 Wochen ÷ 12 Monate = 173,33 Stunden'), true);
fall('Config-FAQ Netto pro Stunde: Beispiel 13,46 €', configNetto.includes(`2.333,25 € netto ÷ 173,33 = ${de2(v2.nettoProStunde)} € netto pro Stunde`), true);

const bnr = readFileSync('components/rechner/BruttoNettoRechner.tsx', 'utf-8');
const mFaq = bnr.match(/frage: 'Wie berechne ich mein Netto pro Stunde\?',\s*antwort:\s*'([^']*)'/);
fall('Komponenten-FAQ Netto pro Stunde = Config-FAQ', mFaq?.[1] === configNetto && configNetto !== '', true);
fall('Schnellcheck bekommt das Monatsbrutto', /<SchnellCheck\s+brutto=\{ergebnis\.bruttoMonat\}/.test(bnr), true);

const stundenlohnMl = faqAntwort('stundenlohn-rechner', 'Wie hoch ist der Mindestlohn 2026?');
fall('Stundenlohn-FAQ: Monatsbrutto 2.409,33 Euro', stundenlohnMl.includes(`Monatsbrutto von ${de2(mindestlohnMonatVollzeit(MINDESTLOHN_2026))} Euro`), true);
fall('Stundenlohn-FAQ: Jahresbrutto 28.912 Euro', stundenlohnMl.includes(`Jahresbrutto von ${(MINDESTLOHN_2026 * JAHRESSTUNDEN).toLocaleString('de-DE')} Euro`), true);

fall('Tipp des Tages: Monatsbrutto (lib/tipp-konstanten.ts aktuell)', MINDESTLOHN_TIPP_BRUTTO,
  Math.round((getAktuellerMindestlohn(SV_RECHENSTAND) * JAHRESSTUNDEN) / 12));

const sc = readFileSync('components/rechner/SchnellCheck.tsx', 'utf-8');
const iMl = sc.indexOf("id: 'mindestlohn'");
const iErster = sc.indexOf('tipps.push(');
fall('Schnellcheck: Mindestlohn-Hinweis ist der erste Tipp', iMl > iErster && sc.indexOf('tipps.push(', iErster + 1) > iMl, true);
fall('Schnellcheck: Schwelle über unterMindestlohnBeiVollzeit', sc.includes('unterMindestlohnBeiVollzeit(brutto, MINDESTLOHN)'), true);

// ── 5. Quelltext-Scan ──────────────────────────────────────────────────────────
const MUSTER: [string, RegExp][] = [
  ['Division durch 160/174', /\b(netto\w*|brutto\w*|lohn\w*)\s*(\/|÷)\s*1(60|74)(?![\d.,])/i],
  ['Mindestlohn × 160/174', /\b(mindestlohn\w*|stundenlohn\w*)\s*(\*|×)\s*1(60|74)(?![\d.,])/i],
  ['Konstante 160/174 Stunden', /STUNDEN\w*\s*=\s*1(60|74)\b/],
  ['160/174 Stunden im Monat', /\b1(60|74)\s*(Std\.?|Stunden)\s*(\/|pro|im|je)\s*Monat/i],
  ['ca. 160/174 Stunden', /ca\.\s*1(60|74)\s*Stunden/],
  ['40 × 4,33', /\b40\s*(\*|×)\s*4[.,]33\b/],
];
const treffer = (zeile: string) => MUSTER.filter(([, re]) => re.test(zeile)).map(([n]) => n);

// Selbsttest: die alten Zeilen (Stand 4d15368) müssen auffallen, zulässige 160er nicht
const ALT = [
  "    nettoProStunde: Math.round(nettoMonat / 160 * 100) / 100,",
  "    const mindestlohnVollzeit = MINDESTLOHN * 160;",
  "const STUNDEN_PRO_MONAT = 160;",
  "const mindestlohnBrutto = Math.round(MINDESTLOHN * 40 * 4.33);",
  "        antwort: 'Teilen Sie Ihr monatliches Nettogehalt durch Ihre Arbeitsstunden pro Monat. Bei einer 40-Stunden-Woche sind das ca. 160 Stunden. Beispiel: 2.333 € netto ÷ 160 = 14,58 € netto/Stunde.',",
  "      'Teilen Sie Ihr monatliches Nettogehalt durch Ihre durchschnittlichen Arbeitsstunden pro Monat. Bei einer 40-Stunden-Woche sind das ca. 174 Stunden (40 × 52 Wochen ÷ 12 Monate). Beispiel: 2.333 € netto ÷ 174 = 13,41 € netto/Stunde.',",
  "Bei einer 40-Stunden-Woche (160 Std./Monat) ergibt das ca. 2.224 € brutto.",
];
const ZULAESSIG = [
  'Wer mit 160 Stunden kalkuliert, setzt seinen Stundensatz systematisch zu niedrig an',
  "'Fakturierbare Stunden konservativ schätzen — eher 100 bis 120 als 160 pro Monat.',",
  "{ label: 'Volumen = π × r² × Höhe', formel: 'V = π × 4² × 10 = π × 160', ergebnis: '≈ 502,65 cm³' },",
  '// Kabinetts-Reform 07/2024 (18.000 €/60 %/160 €) NICHT in Kraft → nur als geplant erwähnt.',
  "{ label: 'Tageslohn', formel: '41.600 € ÷ (5 × 52)', ergebnis: '160,00 €' },",
  configNetto,
];
const altOhne = ALT.filter(z => treffer(z).length === 0);
fall(`Selbsttest: alle ${ALT.length} alten Zeilen fallen auf${altOhne.length ? ': ' + altOhne.map(z => z.trim().slice(0, 50)).join(' | ') : ''}`, altOhne.length, 0);
const zulMit = ZULAESSIG.filter(z => treffer(z).length > 0);
fall(`Selbsttest: ${ZULAESSIG.length} zulässige Zeilen ohne Fund${zulMit.length ? ': ' + zulMit.map(z => z.trim().slice(0, 50)).join(' | ') : ''}`, zulMit.length, 0);

function dateien(ordner: string, endungen: string[]): string[] {
  const aus: string[] = [];
  for (const name of readdirSync(ordner)) {
    const p = join(ordner, name);
    if (statSync(p).isDirectory()) aus.push(...dateien(p, endungen));
    else if (endungen.some(e => p.endsWith(e))) aus.push(p.replace(/\\/g, '/'));
  }
  return aus;
}
const scan = [
  ...dateien('lib', ['.ts', '.tsx']),
  ...dateien('components', ['.ts', '.tsx']),
  ...dateien('app', ['.ts', '.tsx', '.mdx']),
  ...readdirSync('scripts').filter(d => /^generate-.+\.ts$/.test(d)).map(d => `scripts/${d}`),
].sort();
// Blogartikel 21 erklärt die Monatsstunden selbst: 2026 hat 261 Tage von Montag bis Freitag, × 8 ÷ 12 = 174.
// Ausgenommen ist nur der genaue Wortlaut dieser Zeilen; jede andere Zeile mit einem Muster fällt weiter auf.
const AUSNAHMEN: Record<string, string[]> = {
  'app/blog/warum-ein-monat-keine-160-stunden-hat/page.mdx': ['174 Stunden im Monat bezahlt, nicht für 160.'],
};
const funde: string[] = [];
const genutzt = new Set<string>();
for (const f of scan) {
  readFileSync(f, 'utf-8').split(/\r?\n/).forEach((z, i) => {
    const t = treffer(z);
    if (!t.length) return;
    if ((AUSNAHMEN[f] ?? []).includes(z.trim())) { genutzt.add(`${f}|${z.trim()}`); return; }
    funde.push(`${f}:${i + 1} (${t.join(', ')})`);
  });
}
fall(`Quelltext-Scan über ${scan.length} Dateien${funde.length ? ': ' + funde.join('; ') : ''}`, funde.length, 0);
const ungenutzt = Object.entries(AUSNAHMEN).flatMap(([f, zs]) => zs.filter(z => !genutzt.has(`${f}|${z}`)).map(z => `${f}: ${z}`));
fall(`Ausnahmen im Scan: ${Object.values(AUSNAHMEN).flat().length}, alle noch vorhanden und mit Fund${ungenutzt.length ? ': ' + ungenutzt.join('; ') : ''}`, ungenutzt.length, 0);

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nMonatsstunden: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
