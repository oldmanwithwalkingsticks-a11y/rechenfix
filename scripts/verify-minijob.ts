/**
 * Verify-Script für den Minijob-Rechner (Welle 207, nach Karolas Abnahme vom 25.11.2026).
 *
 * Anlass: Karola Rechner fand am 25.11.2026 im Minijob-Rechner:
 *   A1  Bei Status Midijob oder regulär rechnete die Lib weiter die Minijob-Pauschalen (RV 15 %, KV 13 bzw.
 *       ab 2027 17,5 %, Pauschsteuer 2 %, Umlagen). Live bei 1.500 €: „Netto für Arbeitnehmer 1.500,00 €“,
 *       Arbeitgeberkosten 1.967,55 €; der Warnkasten nannte die Arbeitgeberseite „korrekt“. Pauschalen gibt es
 *       nur für geringfügig Beschäftigte (§ 249b SGB V, § 172 Abs. 3 und 3a SGB VI, § 40a Abs. 2 EStG); im
 *       Übergangsbereich (§ 20 Abs. 2 SGB IV) zahlt der Arbeitgeber seinen regulären Anteil.
 *   A2  Eingabe „-“ oder „,“ zeigte „NaN €“, „-100“ negative Beträge (Guards G1 und G3).
 *   A3  Kachel „AN-Beitrag bei 2.000 €: voller Satz (~20 %)“, dieselbe Seite sagt „rund 21 %“
 *       (2026: KV 7,3 + 1,45, RV 9,3, AV 1,3, PV 1,8 = 21,15 %).
 *   B1  Nebenjob-Text „pauschalen Abgaben von rund 31 %“ ohne Jahr (ab 2027 KV-Pauschale 17,5 %).
 *   B2  Grenze 603 €, Übergangsbereich ab 603,01 € und Jahresgrenze 7.236 € ohne Jahr im Minijob-Text.
 *   B3  Kein Termin für den durchschnittlichen Zusatzbeitragssatz des Folgejahres (KV-Pauschale ab 2028).
 *
 * Sollwerte aus dem Gesetz und von Hand gerechnet, nicht aus der Lib: 603 € × 15 % = 90,45 €,
 * × 13 % = 78,39 €, × 2 % = 12,06 €, Umlagen 4,82 + 1,33 + 0,90 = 7,05 €, zusammen 790,95 €;
 * 633 € × 17,5 % = 110,775 → 110,78 €.
 *
 * Namespace-Import der Lib, damit das Skript auch auf dem Stand vor Welle 207 läuft und dort rot meldet
 * (Gegenprobe).
 *
 * Ausführen: npx tsx scripts/verify-minijob.ts
 */

import { readFileSync } from 'node:fs';
import * as mj from '../lib/berechnungen/minijob';
import { TERMINE } from '../lib/termine';

type Fall = { name: string; ist: string | number | boolean; soll: string | number | boolean };
const faelle: Fall[] = [];
const fall = (name: string, ist: Fall['ist'], soll: Fall['soll']) => faelle.push({ name, ist, soll });

const HEUTE = new Date(2026, 10, 25);
const SILVESTER = new Date(2026, 11, 31);
const NEUJAHR = new Date(2027, 0, 1);
const ein = (verdienst: number, art: mj.MinijobArt = 'gewerblich'): mj.MinijobEingabe =>
  ({ verdienst, art, rentenversicherungspflicht: true });
const pauschalen = (e: mj.MinijobErgebnis) =>
  `${e.agRentenversicherung}/${e.agKrankenversicherung}/${e.agLohnsteuer}/${e.agUmlagen}/${e.agUnfallversicherung}`;

// === 1. Lib: Pauschalen nur im Minijob (A1) ===
const m1500 = mj.berechneMinijob(ein(1500), HEUTE);
fall('1.500 € gewerblich: Status Midijob', m1500.status, 'midijob');
fall('1.500 € gewerblich: keine Pauschalen (RV/KV/LSt/Umlagen/Unfall)', pauschalen(m1500), '0/0/0/0/0');
fall('1.500 € gewerblich: Arbeitgeberkosten ohne Aufschlag', `${m1500.agGesamtkosten} / ${m1500.agAufschlagProzent}`, '1500 / 0');
fall('1.500 € Privathaushalt: keine Pauschalen', pauschalen(mj.berechneMinijob(ein(1500, 'privathaushalt'), HEUTE)), '0/0/0/0/0');
const m60301 = mj.berechneMinijob(ein(603.01), SILVESTER);
fall('603,01 € am 31.12.2026: Midijob ohne KV-Pauschale', `${m60301.status} ${m60301.agKrankenversicherung}`, 'midijob 0');
const m63301 = mj.berechneMinijob(ein(633.01), NEUJAHR);
fall('633,01 € am 01.01.2027: Midijob ohne KV-Pauschale', `${m63301.status} ${m63301.agKrankenversicherung}`, 'midijob 0');
const m200001 = mj.berechneMinijob(ein(2000.01), HEUTE);
fall('2.000,01 €: regulär ohne Pauschalen', `${m200001.status} ${m200001.agAbgabenGesamt}`, 'regulaer 0');
const m603 = mj.berechneMinijob(ein(603), SILVESTER);
fall('603 € am 31.12.2026: Pauschalen wie bisher (90,45/78,39/12,06/7,05/0)', pauschalen(m603), '90.45/78.39/12.06/7.05/0');
fall('603 € am 31.12.2026: Arbeitgeberkosten 790,95 €', m603.agGesamtkosten, 790.95);
const m633 = mj.berechneMinijob(ein(633), NEUJAHR);
fall('633 € am 01.01.2027: Minijob, KV 17,5 % = 110,78 €', `${m633.status} ${m633.agKrankenversicherung}`, 'minijob 110.78');

// === 2. Lib: ungültige Eingaben zählen als 0 (A2, zweite Sicherung) ===
for (const [name, wert] of [['NaN', NaN], ['−100', -100], ['Infinity', Infinity]] as const) {
  const e = mj.berechneMinijob(ein(wert), HEUTE);
  fall(`Eingabe ${name}: Verdienst, Netto und Arbeitgeberkosten 0`, `${e.verdienst}/${e.nettoAN}/${e.agGesamtkosten}`, '0/0/0');
}

// === 3. Komponente (Quelltext) ===
const komp = readFileSync('components/rechner/MinijobRechner.tsx', 'utf-8');
const anzahl = (text: string, teil: string) => text.split(teil).length - 1;
fall('MinijobRechner: Satz „nur für die Arbeitgeberseite korrekt“ entfernt', komp.includes('nur für die Arbeitgeberseite korrekt'), false);
fall('MinijobRechner: Verdienst und Stunden geklammert (clampInputValue zweimal)', anzahl(komp, 'clampInputValue(v, 0, null)'), 2);
fall('MinijobRechner: Netto, Aufschlüsselung, KV-Hinweis und Kopiertext nur im Minijob', `${anzahl(komp, '{istMinijob ? (')} / ${anzahl(komp, '{istMinijob && (')}`, '2 / 2');
fall('MinijobRechner: Grenze und Mindestlohn im Text aus dem Ergebnis', komp.includes('{MINIJOB_GRENZE}') || komp.includes('fmtEuro(MINDESTLOHN)'), false);

// === 4. Texte (A3, B1, B2) ===
const finanzen = readFileSync('lib/rechner-config/finanzen.ts', 'utf-8');
const block = (slug: string): string => {
  const start = finanzen.indexOf(`    slug: '${slug}',`);
  const ende = finanzen.indexOf("\n  {\n    slug: '", start + 1);
  return start < 0 ? '' : finanzen.slice(start, ende < 0 ? undefined : ende);
};
const minijobBlock = block('minijob-rechner');
const minijobZeilen = minijobBlock.split('\n').filter((z) => !z.trim().startsWith('//')); // ohne Code-Kommentare
fall('Minijob-Block gefunden', minijobBlock.length > 10000, true);
fall('Minijob-Text: Kachel „~20 %“ entfernt', minijobZeilen.some((z) => z.includes('~20 %')), false);
fall('Minijob-Text: Kachel nennt „voller Satz (rund 21 %)“', minijobBlock.includes("wert: 'voller Satz (rund 21 %)'"), true);

// B2: Zeilen, die die Grenze als Grenze nennen (nicht als Beispielbetrag), brauchen ein Jahr in derselben Zeile.
const GRENZE_OHNE_JAHR = /(bis 603 €|603,01|Grenze von 603 €|603-€-(Grenze|Minijob mit)|Summe 603 €|\(max\. 7\.236 €\)|'7\.236 € ÷)/;
const ohneJahr = (zeile: string) => GRENZE_OHNE_JAHR.test(zeile) && !/\b20(26|27)\b/.test(zeile);
// Selbsttest des Scans an den Zeilen vor Welle 207
const alteZeilen = [
  "          ['Minijob', 'bis 603 €', 'nur 3,6 % RV-Eigenanteil (Befreiung auf Antrag)', 'steuerfrei; Arbeitgeber zahlt Pauschalen'],",
  "        spalteB: 'Midijob (603,01–2.000 €)',",
  "Auch <strong>mehrere Minijobs</strong> nebeneinander werden addiert: Übersteigt die Summe 603 €, werden alle Beschäftigungen sozialversicherungspflichtig.",
  "          { label: 'Entgeltpunkte pro Jahr', wert: '≈ 0,14', hinweis: '7.236 € ÷ 51.944 € Durchschnittsentgelt (§ 69 SGB VI)' },",
];
fall('Scan erkennt die alten Zeilen (Selbsttest, 4 Zeilen)', alteZeilen.filter(ohneJahr).length, 4);
fall('Scan lässt Beispielbeträge stehen (603 € × 3,6 %)', ohneJahr("          { label: 'RV-Eigenanteil (3,6 %, bei RV-Pflicht)', formel: '603 € × 3,6 %', ergebnis: '− 21,71 €' },"), false);
const treffer = minijobZeilen.filter(ohneJahr);
fall('Minijob-Text: Grenze, Übergangsbereich und Jahresgrenze nur mit Jahr', treffer.length === 0 ? 'keine Zeile ohne Jahr' : treffer.map((z) => z.trim().slice(0, 60)).join(' | '), 'keine Zeile ohne Jahr');
const nebenjobZeile = block('nebenjob-rechner').split('\n').find((z) => z.includes('pauschalen Abgaben von rund 31 %')) ?? '';
fall('Nebenjob-Text: „rund 31 %“ mit Jahr', /rund 31 % \(2026/.test(nebenjobZeile), true);

// === 5. Termine und Dezember-Audit (B3, C5, C7) ===
const termin = (id: string) => TERMINE.find((t) => t.id === id);
fall('Termin minijob-kv-pauschale-folgejahr: jährlich', termin('minijob-kv-pauschale-folgejahr')?.wiederholungMonate ?? 'fehlt', 12);
fall('Termin minijob-kv-pauschale-folgejahr nennt getMinijobKvPauschaleProzent', (termin('minijob-kv-pauschale-folgejahr')?.was ?? '').includes('getMinijobKvPauschaleProzent'), true);
fall('Termin switch-wirksamkeit-2027 verlangt einen Deploy am 01.01.2027', (termin('switch-wirksamkeit-2027')?.was ?? '').includes('Production-Deploy'), true);
const kalender = readFileSync('docs/jahreswerte-kalender.md', 'utf-8');
const dezember = kalender.slice(kalender.indexOf('### Dezember-Audit'), kalender.indexOf('### Juni-Audit'));
const punkte = (dezember.match(/^\d+\. \[ \]/gm) ?? []).length;
fall('Dezember-Audit: Zahl der Punkte gleich der im Termin audit-dezember', `${punkte} / ${(termin('audit-dezember')?.was ?? '').split(' ')[0]}`, '10 / Zehn-Punkte-Checkliste');
const punkt3 = dezember.slice(dezember.indexOf('3. [ ]'), dezember.indexOf('4. [ ]'));
fall('Dezember-Audit Punkt 3 nennt Zusatzbeitragssatz und getMinijobKvPauschaleProzent', punkt3.includes('Zusatzbeitragssatz') && punkt3.includes('getMinijobKvPauschaleProzent'), true);

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nMinijob: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
