/**
 * Component-Verify-Script für EhegattenunterhaltRechner.tsx-relevante Konfig-Drift.
 *
 * Klasse: COMPONENT-VERIFY (etabliert in Welle-4 M0 A-01-Auflösung,
 * Naming-Konvention `-component.ts` seit M3a Decision-A-01=(B), Commit-Sequenz
 * folgt nach Umbenennung).
 *
 * Geschichte: Ursprüngliches `verify-ehegattenunterhalt.ts` aus Prompt 149c
 * (P1-A10) hatte 3 Cluster: (1) Component-Konstanten, (2) Konfig-Drift,
 * (3) Inline-3/7-Reimplementation. Welle-4 M3a hat (1) und (3) entfernt:
 * (1) wird durch die neue `lib/berechnungen/ehegattenunterhalt.ts` und
 * `verify-ehegattenunterhalt.ts` Lib-Verify abgedeckt; (3) wird durch die
 * gleiche Lib-Verify ersetzt. Nur Cluster (2) bleibt — der echte
 * L-30/L-31-Schutz gegen Welle-3-149c-Korrektur-Drift in
 * `lib/rechner-config/arbeit.ts`.
 *
 * Externe Primärquellen (Rule 11: nicht-zirkulär):
 *   - Düsseldorfer Tabelle 2026, OLG Düsseldorf, Stand 01.01.2026:
 *     Selbstbehalt gegenüber Ehegatten = 1.600 € (erwerbstätig) bzw.
 *     1.475 € (nicht erwerbstätig). Differenzierung gilt für Trennungs-
 *     unterhalt UND nachehelichen Unterhalt gleichermaßen — Achse ist die
 *     Erwerbstätigkeit, NICHT die Trennungsphase.
 *   - § 1361 BGB (Trennungsunterhalt), §§ 1569 ff. BGB (nachehelich).
 *   - 149c (28.04.2026): vorher fälschlich Trennung=1600 / nachehelich=1475
 *     mit erfundener Begründung „weil die Bindung schwächer ist". Korrigiert.
 *
 * Strategie: String-Includes-Tests gegen `lib/rechner-config/arbeit.ts` —
 * sicherstellen, dass die 149c-Korrekturen erhalten bleiben (Konfig-Drift-
 * Schutz). Kein Berechnungs-Test, kein Component-Source-Test.
 *
 * Ausführen: npx tsx scripts/verify-ehegattenunterhalt-component.ts
 *
 * Welle-4 M3a (03.05.2026).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const arbeitTs = readFileSync(join(process.cwd(), 'lib/rechner-config/arbeit.ts'), 'utf8');

interface Fall {
  name: string;
  actual: boolean;
  expected: boolean;
  quelle: string;
}
const cases: Fall[] = [];

// === Cluster 2: Konfig-Drift-Tests gegen arbeit.ts ===
//
// Vier Tests aus dem ursprünglichen Cluster 2 (Z. 60-86 des Pre-M3a-Scripts)
// 1:1 übernommen. Ziel: 149c-Korrekturen vor Re-Drift schützen.

cases.push({
  name: 'arbeit.ts: kein "1.600 € Trennung / 1.475 € nachehelich" mehr in formel',
  actual: arbeitTs.includes('1.600 € Trennung / 1.475 € nachehelich'),
  expected: false,
  quelle: '149c — vertauschte Achse raus',
});
cases.push({
  name: 'arbeit.ts: "1.600 € erwerbstätig / 1.475 € nicht erwerbstätig" in formel',
  actual: arbeitTs.includes('1.600 € erwerbstätig / 1.475 € nicht erwerbstätig'),
  expected: true,
  quelle: '149c — neue Achse',
});
cases.push({
  name: 'arbeit.ts: keine "Bindung schwächer"-Begründung mehr',
  actual: arbeitTs.includes('weil die Bindung schwächer ist'),
  expected: false,
  quelle: '149c — erfundene Begründung gestrichen',
});
cases.push({
  name: 'arbeit.ts: Erklärtext nennt "nicht zwischen Trennungs- und nachehelicher Phase, sondern nach Erwerbstätigkeit"',
  actual: arbeitTs.includes('nicht** zwischen Trennungs- und nachehelicher Phase, sondern nach Erwerbstätigkeit'),
  expected: true,
  quelle: '149c — neue Erklärung',
});

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  const ok = c.actual === c.expected;
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(10);
  const expectedStr = String(c.expected).padStart(10);
  console.log(`${mark} ${c.name.padEnd(80)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
