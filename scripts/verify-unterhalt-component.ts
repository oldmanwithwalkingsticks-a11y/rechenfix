/**
 * Component-Verify-Script für UnterhaltsRechner.tsx.
 *
 * Klasse: COMPONENT-VERIFY (etabliert in Welle-4 M0 A-01-Auflösung,
 * Naming-Konvention `-component.ts` seit M3a Decision-A-01=(B)).
 *
 * Decision-B=(1) (Welle-4 M3a, 03.05.2026): unterhalt-rechner ist
 * CONSUMER-OK via duesseldorfer-tabelle.ts, dessen Werte bereits durch
 * `verify-unterhalt-2026.ts` (Bestand) auf Lib-Ebene verifiziert sind.
 * Dieses Script ergänzt eine zweite Schutz-Schicht:
 *   - AUSBILDUNGS_PAUSCHALE-Konstante (§ 1610 BGB-Anker, nicht-DT-Konstante)
 *   - DT-Lib-Imports (CONSUMER-OK-Bestätigung gegen Drift)
 *   - Konfig-Drift in `lib/rechner-config/arbeit.ts` gegen Welle-3-M6-Pflege
 *
 * DT-Lib-Werte werden NICHT hier verifiziert — das macht
 * `verify-unterhalt-2026.ts` (Bestand) auf Lib-Ebene.
 *
 * Externe Quellen:
 *   - BGB § 1610 (Maß des Unterhalts, Ausbildungspauschale-Anker):
 *     https://www.gesetze-im-internet.de/bgb/__1610.html
 *   - BGB § 1612a (Mindestunterhalt minderjähriger Kinder)
 *   - BGB §§ 1603 Abs. 2, 1609 (Privilegiert volljährig, Mangelfall-Rangfolge)
 *   - SGB XII § 94 Abs. 1a (100.000-€-Schwelle Elternunterhalt seit
 *     Angehörigen-Entlastungsgesetz vom 10.12.2019)
 *   - 7. MUVÄndV vom 15.11.2024 (BGBl. 2024 I Nr. 359, Mindestunterhalts-Werte)
 *   - Düsseldorfer-Tabelle 2026 (OLG Düsseldorf)
 *
 * Strategie: String-Includes-Tests gegen Component-Source und Konfig-Datei.
 *
 * Ausführen: npx tsx scripts/verify-unterhalt-component.ts
 *
 * Welle-4 M3a (03.05.2026).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const componentTs = readFileSync(
  join(process.cwd(), 'components/rechner/UnterhaltsRechner.tsx'),
  'utf8',
);
const arbeitTs = readFileSync(join(process.cwd(), 'lib/rechner-config/arbeit.ts'), 'utf8');

interface Fall {
  name: string;
  actual: boolean;
  expected: boolean;
  quelle: string;
}
const cases: Fall[] = [];

// === Cluster 1: Konstanten in Component ===

cases.push({
  name: 'Component: AUSBILDUNGS_PAUSCHALE = 100 (§ 1610 BGB)',
  actual: componentTs.includes('AUSBILDUNGS_PAUSCHALE = 100'),
  expected: true,
  quelle: '§ 1610 BGB',
});
cases.push({
  name: 'Component: § 1610 BGB-Anker im Kommentar',
  actual: componentTs.includes('§ 1610 BGB'),
  expected: true,
  quelle: '§ 1610 BGB',
});

// === Cluster 2: DT-Lib-Imports (CONSUMER-OK-Bestätigung) ===
//
// Bei Refactor des Imports oder Drift in der DT-Lib-API würden diese Tests
// fehlschlagen — Schutz vor stiller Drift.

cases.push({
  name: 'Component: importiert berechneTabellenwert aus DT-Lib',
  actual: componentTs.includes('berechneTabellenwert'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert findeEinkommensgruppe aus DT-Lib',
  actual: componentTs.includes('findeEinkommensgruppe'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert berechneZahlbetrag aus DT-Lib',
  actual: componentTs.includes('berechneZahlbetrag'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert berechneElternunterhalt aus DT-Lib',
  actual: componentTs.includes('berechneElternunterhalt'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert KINDERGELD_2026 aus DT-Lib',
  actual: componentTs.includes('KINDERGELD_2026'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert KINDERGELD_HAELFTIG_2026 aus DT-Lib',
  actual: componentTs.includes('KINDERGELD_HAELFTIG_2026'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: importiert SELBSTBEHALT_2026 aus DT-Lib',
  actual: componentTs.includes('SELBSTBEHALT_2026'),
  expected: true,
  quelle: 'CONSUMER-OK',
});
cases.push({
  name: 'Component: Import-Pfad @/lib/berechnungen/duesseldorfer-tabelle',
  actual: componentTs.includes("from '@/lib/berechnungen/duesseldorfer-tabelle'"),
  expected: true,
  quelle: 'CONSUMER-OK Multi-Line-Import',
});

// === Cluster 3: Konfig-Drift gegen arbeit.ts ===
//
// Welle-3-M6 hat 482→486 + 4. Altersstufe 698 € ergänzt — diese Korrekturen
// vor Re-Drift schützen.

cases.push({
  name: 'arbeit.ts: DT-Mindestbedarf 1. Altersstufe 486 € erwähnt',
  // W186: vorher Fließtext „486 € (1. Altersstufe“ (formel-Feld, seit Welle 102 entfernt); jetzt Tabellenzeile.
  actual: arbeitTs.includes("['1. Stufe', '0–5 Jahre', '486 €']"),
  expected: true,
  quelle: 'M6 + 7. MUVÄndV 15.11.2024',
});
cases.push({
  name: 'arbeit.ts: DT-Mindestbedarf 2. Altersstufe 558 € erwähnt',
  // W186: vorher Fließtext „558 € (2. Altersstufe“ (formel-Feld, seit Welle 102 entfernt); jetzt Tabellenzeile.
  actual: arbeitTs.includes("['2. Stufe', '6–11 Jahre', '558 €']"),
  expected: true,
  quelle: 'M6 + 7. MUVÄndV',
});
cases.push({
  name: 'arbeit.ts: DT-Mindestbedarf 3. Altersstufe 653 € erwähnt',
  // W186: vorher Fließtext „653 € (3. Altersstufe“ (formel-Feld, seit Welle 102 entfernt); jetzt Tabellenzeile.
  actual: arbeitTs.includes("['3. Stufe', '12–17 Jahre', '653 €']"),
  expected: true,
  quelle: 'M6 + 7. MUVÄndV',
});
cases.push({
  name: 'arbeit.ts: DT-Mindestbedarf 4. Altersstufe 698 € erwähnt (M6-Ergänzung)',
  // W186: vorher Fließtext „698 € (4. Altersstufe“ (formel-Feld, seit Welle 102 entfernt); jetzt Tabellenzeile.
  actual: arbeitTs.includes("['4. Stufe', 'ab 18 Jahre', '698 €']"),
  expected: true,
  quelle: 'M6 4. Altersstufe ergänzt',
});
cases.push({
  name: 'arbeit.ts: 7. MUVÄndV als Rechtsquelle benannt',
  actual: arbeitTs.includes('7. MUVÄndV'),
  expected: true,
  quelle: 'M6 Rechtsquelle',
});
cases.push({
  name: 'arbeit.ts: § 94 Abs. 1a SGB XII (Elternunterhalt 100k-Schwelle)',
  actual: arbeitTs.includes('§ 94 Abs. 1a SGB XII'),
  expected: true,
  quelle: 'Angehörigen-Entlastungsgesetz 10.12.2019',
});
cases.push({
  name: 'arbeit.ts: 100.000-€-Schwelle Elternunterhalt erwähnt',
  actual: arbeitTs.includes('100.000 €'),
  expected: true,
  quelle: '§ 94 Abs. 1a SGB XII',
});
cases.push({
  // W186: vorher 2.000 € (DT bis 2025); DT 2026 Anm. D.I: 2.650 € einschließlich 1.000 € Warmmiete.
  name: 'arbeit.ts: 2.650 € Selbstbehalt Elternunterhalt erwähnt',
  actual: arbeitTs.includes('Selbstbehalt von 2.650 €'),
  expected: true,
  quelle: 'DT 2026 Elternunterhalt',
});
cases.push({
  name: 'arbeit.ts: Selbstbehalt 1.450 € (erwerbstätig gegen minderjährig)',
  actual: arbeitTs.includes('1.450 €'),
  expected: true,
  quelle: 'DT 2026 Selbstbehalt',
});
cases.push({
  name: 'arbeit.ts: hälftiges Kindergeld 129,50 € erwähnt',
  actual: arbeitTs.includes('129,50 €'),
  expected: true,
  quelle: 'KINDERGELD_HAELFTIG_2026',
});
cases.push({
  name: 'arbeit.ts: volles Kindergeld 259 € erwähnt',
  actual: arbeitTs.includes('259 €'),
  expected: true,
  quelle: 'KINDERGELD_2026',
});
cases.push({
  name: 'arbeit.ts: § 1612a BGB-Erwähnung (Mindestunterhalt)',
  actual: arbeitTs.includes('§ 1612a'),
  expected: true,
  quelle: '§ 1612a BGB',
});
cases.push({
  name: 'arbeit.ts: 1.612a Abs. 3 Geburtstags-Regel (Welle-3-M6)',
  actual: arbeitTs.includes('§ 1612a Abs. 3 BGB'),
  expected: true,
  quelle: 'Welle-3-M6 Geburtstags-Übergang',
});

// === Cluster 4 (W187): Zahlbetrag centgenau, Gruppen 6–15 nach DT 2026 ===
//
// DT 2026 (OLG Düsseldorf, Stand 01.01.2026): Zahlbetrag Gruppe 4, 6–11 J. = 512,50 €
// (Tabellenbetrag 642 € − 129,50 €; § 1612a Abs. 2 S. 2 BGB rundet nur den Tabellenbetrag auf).
// Gruppe 6 = 3.701–4.100 € 128 % (715 €), Gruppe 11 = 5.701–6.400 € 168 % (938 €), Gruppe 15 = 200 % (1.116 €).

const unterhaltAbschnitt = (() => {
  const start = arbeitTs.indexOf("slug: 'unterhaltsrechner'");
  const ende = arbeitTs.indexOf("slug: '", start + 10);
  // Kommentarzeilen (// W187: vorher …) nicht mitprüfen, nur den Seitentext.
  return arbeitTs
    .slice(start, ende === -1 ? undefined : ende)
    .split('\n')
    .filter((z) => !z.trim().startsWith('//'))
    .map((z) => z.replace(/ \/\/ W\d+:.*$/, ''))
    .join('\n');
})();
cases.push({
  name: 'arbeit.ts (unterhaltsrechner): kein „513 €“ mehr',
  actual: unterhaltAbschnitt.includes('513 €'),
  expected: false,
  quelle: 'DT 2026 Anhang Zahlbeträge',
});
cases.push({
  name: 'arbeit.ts (unterhaltsrechner): Beispiel nennt 512,50 € Zahlbetrag',
  actual: unterhaltAbschnitt.includes('= 512,50 € Zahlbetrag/Monat'),
  expected: true,
  quelle: 'DT 2026 Anhang Zahlbeträge',
});
for (const zeile of [
  "['6', '4.100 €', '128 %', '715 €']",
  "['11', '6.400 €', '168 %', '938 €']",
  "['15', '11.200 €', '200 %', '1.116 €']",
]) {
  cases.push({
    name: `arbeit.ts: Tabellenzeile ${zeile}`,
    actual: unterhaltAbschnitt.includes(zeile),
    expected: true,
    quelle: 'DT 2026 Tabelle Kindesunterhalt',
  });
}
cases.push({
  name: 'arbeit.ts: keine Fünf-Prozent-Schritte bis 170 % mehr',
  actual: /170 %|Fünf-Prozent-Schritten/.test(unterhaltAbschnitt),
  expected: false,
  quelle: 'DT 2026 Tabelle Kindesunterhalt',
});
cases.push({
  name: 'Component: Zahlbetrag mit Cent (fmtBetrag(k.zahl))',
  actual: componentTs.includes('fmtBetrag(k.zahl)') && componentTs.includes('fmtBetrag(ergebnis.summe)'),
  expected: true,
  quelle: 'Anzeige 512,50 €',
});
cases.push({
  name: 'arbeit.ts (ehegattenunterhalt-rechner): Kindesunterhalt-Vorabzug 540,50 € (Gruppe 5)',
  actual: arbeitTs.includes("ergebnis: '− 540,50 €'") && !arbeitTs.includes("ergebnis: '− 513 €'"),
  expected: true,
  quelle: 'DT 2026 Gruppe 5, 6–11 J.: 670 € − 129,50 €',
});

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  const ok = c.actual === c.expected;
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(8);
  const expectedStr = String(c.expected).padStart(8);
  console.log(`${mark} ${c.name.padEnd(74)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
