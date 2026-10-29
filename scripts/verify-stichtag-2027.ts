/**
 * Verify-Script für Werte, die am 01.01.2027 umschalten (Welle 200).
 *
 * Anlass: Karola Rechner fand im Oktober 2026 Stellen, an denen ein umschaltender Wert neben einem
 * festen Text stand oder ein Rechner fest mit dem Wert von 2026 verglich:
 *   - Der Stundenlohn-Rechner verglich mit MINDESTLOHN_2026; ab 01.01.2027 hätte er 14,00 € je Stunde
 *     „über dem Mindestlohn“ genannt, obwohl er dann 14,60 € beträgt.
 *   - Der Hochrechner schrieb „Mindestlohn 2026:“ fest vor den umschaltenden Wert (ab 2027: 14,60 €).
 *   - Der BAföG-Rechner nannte „ein Minijob bis 603 €“ fest neben dem Freibetrag aus der Lib.
 *
 * Geprüft werden:
 *   1. getMindestlohnJahr und getAktuellerMindestlohn an den Jahresgrenzen,
 *   2. berechneStundenlohn mit Stichtag 31.12.2026 und 01.01.2027,
 *   3. der anrechnungsfreie Verdienst im BAföG-Rechner gegen die Minijob-Grenze 2026,
 *   4. ein Quelltext-Scan: keine Rechner-Komponente und keine Seite (ohne Blog) nutzt die Jahreskonstanten
 *      des Mindestlohns, keine Rechner-Komponente schreibt „Mindestlohn <Jahr>:“ fest vor einen Wert.
 *      Der Scan prüft sich vorher an den alten Zeilen selbst.
 *
 * Namespace-Importe, damit das Skript auch auf dem Stand vor Welle 200 läuft und dort rot meldet,
 * statt beim Import abzubrechen (Gegenprobe).
 *
 * Ausführen: npx tsx scripts/verify-stichtag-2027.ts
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as ml from '../lib/berechnungen/mindestlohn';
import * as sl from '../lib/berechnungen/stundenlohn';
import * as bf from '../lib/berechnungen/bafoeg';
import { BAFOEG_AB_2026_01_01 } from '../lib/berechnungen/bafoeg-parameter';
import { WK_PAUSCHALE_AN_2026 } from '../lib/berechnungen/einkommensteuer';

type Fall = { name: string; ist: string | number | boolean; soll: string | number | boolean };
const faelle: Fall[] = [];
const fall = (name: string, ist: Fall['ist'], soll: Fall['soll']) => faelle.push({ name, ist, soll });
const cent = (x: number) => Math.round(x * 100) / 100;

const SILVESTER = new Date(2026, 11, 31);
const NEUJAHR = new Date(2027, 0, 1);

// ── 1. Mindestlohn und Jahr ─────────────────────────────────────────────────────
const jahr = (ml as Record<string, unknown>).getMindestlohnJahr as ((d?: Date) => number) | undefined;
fall('getMindestlohnJahr vorhanden', typeof jahr, 'function');
if (jahr) {
  fall('Jahr am 31.12.2026', jahr(SILVESTER), 2026);
  fall('Jahr am 01.01.2027', jahr(NEUJAHR), 2027);
  fall('Jahr 2028 bleibt beim letzten bekannten Wert', jahr(new Date(2028, 5, 1)), 2027);
  fall('Jahr 2023 beim ersten bekannten Wert', jahr(new Date(2023, 5, 1)), 2024);
}
fall('Mindestlohn am 31.12.2026', ml.getAktuellerMindestlohn(SILVESTER), 13.9);
fall('Mindestlohn am 01.01.2027', ml.getAktuellerMindestlohn(NEUJAHR), 14.6);
fall('Minijob-Grenze am 01.01.2027', ml.getMinijobGrenzeMonat(NEUJAHR), 633);

// ── 2. Stundenlohn-Rechner ──────────────────────────────────────────────────────
const stundenlohn = sl.berechneStundenlohn as unknown as (e: sl.StundenlohnEingabe, d?: Date) => (sl.StundenlohnErgebnis & { mindestlohn?: number; mindestlohnJahr?: number }) | null;
const eingabe = (brutto: number): sl.StundenlohnEingabe => ({
  modus: 'stundenlohn', bruttogehalt: brutto, stundenlohn: 0, wochenstunden: 40, arbeitstageProWoche: 5, urlaubstage: 30, feiertage: 10,
});
// 14,00 € je Stunde bei 40 Wochenstunden: 14 × 40 × 52 ÷ 12 = 2.426,67 € im Monat
const brutto14 = cent(14 * 40 * 52 / 12);
const vorher = stundenlohn(eingabe(brutto14), SILVESTER);
const nachher = stundenlohn(eingabe(brutto14), NEUJAHR);
fall(`${brutto14.toLocaleString('de-DE')} € (14,00 €/h) am 31.12.2026: über dem Mindestlohn`, vorher?.ueberMindestlohn ?? 'null', true);
fall(`${brutto14.toLocaleString('de-DE')} € (14,00 €/h) am 01.01.2027: unter dem Mindestlohn`, nachher?.ueberMindestlohn ?? 'null', false);
fall('Abstand am 01.01.2027: 14,00 − 14,60 = −0,60 €', nachher?.differenzMindestlohn ?? 'null', -0.6);
fall('Ergebnis nennt den Mindestlohn des Stichtags', nachher?.mindestlohn ?? 'fehlt', 14.6);
fall('Ergebnis nennt sein Jahr', nachher?.mindestlohnJahr ?? 'fehlt', 2027);
const standard = stundenlohn(eingabe(3500), SILVESTER);
fall('3.500 € am 31.12.2026: 20,19 €/h, 6,29 € über 13,90 €', `${standard?.stundenlohn} / ${standard?.differenzMindestlohn}`, '20.19 / 6.29');

// ── 3. BAföG ────────────────────────────────────────────────────────────────────
const frei = (bf as Record<string, unknown>).anrechnungsfreierVerdienstMonat as ((p?: typeof BAFOEG_AB_2026_01_01) => number) | undefined;
fall('anrechnungsfreierVerdienstMonat vorhanden', typeof frei, 'function');
if (frei) {
  fall('BAföG 2026: anrechnungsfrei bis zur Minijob-Grenze 2026', frei(BAFOEG_AB_2026_01_01), ml.getMinijobGrenzeMonat(new Date(2026, 6, 1)));
  // Probe gegen die Anrechnung im Rechner: bei diesem Verdienst 0 €, einen Euro darüber mehr als 0 €
  const anrechnung = (brutto: number) => {
    const p = BAFOEG_AB_2026_01_01;
    const einkuenfte = Math.max(0, brutto * 12 - WK_PAUSCHALE_AN_2026) / 12;
    const einkommen = einkuenfte - Math.min(einkuenfte * 12 * p.svPauschalen.eigen, p.svPauschalen.hoechstbetragJahr) / 12;
    return Math.max(0, einkommen - p.freibetraege.eigenesEinkommen);
  };
  const b = frei(BAFOEG_AB_2026_01_01);
  fall(`BAföG: bei ${b} € nichts angerechnet, bei ${b + 1} € schon`, anrechnung(b) === 0 && anrechnung(b + 1) > 0, true);
}

// ── 4. Quelltext-Scan ───────────────────────────────────────────────────────────
const MUSTER: [string, RegExp, 'rechner' | 'alle'][] = [
  ['Jahreskonstante des Mindestlohns', /\bMINDESTLOHN_20\d\d\b/, 'alle'],
  ['„Mindestlohn <Jahr>:“ fest vor einem Wert', /Mindestlohn 20\d\d:(?:<\/strong>)?\s*\{/, 'rechner'],
];
const ALT: [string, 'rechner' | 'alle'][] = [
  ["import { berechneStundenlohn, MINDESTLOHN_2026, type StundenlohnModus } from '@/lib/berechnungen/stundenlohn';", 'rechner'],
  ['        <strong>Mindestlohn 2026:</strong> {fmtEur(MINDESTLOHN)}/h — Ihr Stundenlohn', 'rechner'],
  ['                  Mindestlohn 2026: {fmt(MINDESTLOHN_2026)} € pro Stunde', 'rechner'],
];
const treffer = (zeile: string, bereich: 'rechner' | 'alle') =>
  MUSTER.filter(([, re, b]) => (b === 'alle' || bereich === 'rechner') && re.test(zeile)).map(([n]) => n);
const altOhne = ALT.filter(([z, b]) => treffer(z, b).length === 0);
fall(`Selbsttest: alle ${ALT.length} alten Zeilen fallen auf${altOhne.length ? ': ' + altOhne.map(([z]) => z.trim().slice(0, 50)).join(' | ') : ''}`, altOhne.length, 0);
fall('Selbsttest: Jahr aus der Lib fällt nicht auf', treffer('Mindestlohn {ergebnis.mindestlohnJahr}: {fmt(ergebnis.mindestlohn)} € pro Stunde', 'rechner').length, 0);

function dateien(ordner: string, endungen: string[]): string[] {
  const aus: string[] = [];
  for (const name of readdirSync(ordner)) {
    const p = join(ordner, name);
    if (statSync(p).isDirectory()) aus.push(...dateien(p, endungen));
    else if (endungen.some(e => p.endsWith(e))) aus.push(p.replace(/\\/g, '/'));
  }
  return aus;
}
const scan: [string, 'rechner' | 'alle'][] = [
  ...dateien('components/rechner', ['.tsx', '.ts']).map(f => [f, 'rechner'] as [string, 'rechner']),
  ...dateien('app', ['.tsx', '.ts']).filter(f => !f.startsWith('app/blog/')).map(f => [f, 'alle'] as [string, 'alle']),
];
const funde: string[] = [];
for (const [f, b] of scan.sort()) {
  readFileSync(f, 'utf-8').split(/\r?\n/).forEach((z, i) => {
    if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(z)) return;
    const t = treffer(z, b);
    if (t.length) funde.push(`${f}:${i + 1} (${t.join(', ')})`);
  });
}
fall(`Quelltext-Scan über ${scan.length} Dateien${funde.length ? ': ' + funde.join('; ') : ''}`, funde.length, 0);

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nStichtag 01.01.2027: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
