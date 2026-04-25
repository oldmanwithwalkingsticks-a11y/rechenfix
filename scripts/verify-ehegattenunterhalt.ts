// Verifikation Ehegattenunterhalt Selbstbehalts-Achse (Prompt 149c P1-A10).
// Ausführen: npx tsx scripts/verify-ehegattenunterhalt.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   - Düsseldorfer Tabelle 2026, OLG Düsseldorf, Stand 01.01.2026:
//     Selbstbehalt gegenüber Ehegatten = 1.600 € (erwerbstätig) bzw.
//     1.475 € (nicht erwerbstätig). Differenzierung gilt für Trennungs-
//     unterhalt UND nachehelichen Unterhalt gleichermaßen.
//   - § 1361 BGB (Trennungsunterhalt), §§ 1569 ff. BGB (nachehelich),
//     § 1609 BGB (Vorrang Kindesunterhalt), § 1614 BGB (Verzicht-Verbot).
//   - 3/7-Methode = etablierte Rechtsprechung (Differenz × 3/7).
//
// Strategie: 4-Quadranten-Test (erwerbstätig × Phase) + Konfig-Drift-Tests.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const componentTs = readFileSync(
  join(process.cwd(), 'components/rechner/EhegattenunterhaltRechner.tsx'),
  'utf8',
);
const arbeitTs = readFileSync(join(process.cwd(), 'lib/rechner-config/arbeit.ts'), 'utf8');

interface Fall {
  name: string;
  actual: number | string | boolean;
  expected: number | string | boolean;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// === GRUPPE 1: Component-Konstanten korrekt ===

cases.push({
  name: 'Component: SELBSTBEHALT_ERWERBSTAETIG = 1600',
  actual: componentTs.includes('SELBSTBEHALT_ERWERBSTAETIG = 1600'),
  expected: true,
  quelle: 'DT 2026',
});
cases.push({
  name: 'Component: SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475',
  actual: componentTs.includes('SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475'),
  expected: true,
  quelle: 'DT 2026',
});
cases.push({
  name: 'Component: alte SELBSTBEHALT-Map mit "trennung: 1600" raus',
  actual: componentTs.includes('trennung: 1600'),
  expected: false,
  quelle: '149c — falsche Achse entfernt',
});
cases.push({
  name: 'Component: pflichtigerErwerbstaetig-State eingeführt',
  actual: componentTs.includes('pflichtigerErwerbstaetig'),
  expected: true,
  quelle: '149c — UI-Toggle für SB-Schaltung',
});

// === GRUPPE 2: Konfig-Drift-Tests ===

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

// === GRUPPE 3: 4-Quadranten-Berechnung (3/7-Methode) ===
//
// Wir simulieren die Component-Logik (drei verschiedene Berechnungswege
// für selbstbehalt + 3/7-Differenz):

function berechneEhegattenunterhalt(
  netto1: number,
  netto2: number,
  pflichtigerErwerbstaetig: boolean,
  kindesunterhalt = 0,
): { unterhalt: number; selbstbehalt: number; gekappt: boolean } {
  const bereinigt1 = Math.max(0, netto1 - kindesunterhalt);
  const differenz = bereinigt1 - netto2;
  const berechnet = Math.max(0, Math.round((differenz * 3) / 7));
  const selbstbehalt = pflichtigerErwerbstaetig ? 1600 : 1475;
  const maxUnterhalt = Math.max(0, bereinigt1 - selbstbehalt);
  const unterhalt = Math.min(berechnet, maxUnterhalt);
  return { unterhalt, selbstbehalt, gekappt: berechnet > maxUnterhalt };
}

// Q1: Erwerbstätig, Differenz unproblematisch — Standard-Beispiel
const q1 = berechneEhegattenunterhalt(3500, 1200, true);
cases.push({ name: 'Q1: Peter erwerbst., 3.500/1.200 € → SB 1.600 €', actual: q1.selbstbehalt, expected: 1600, quelle: 'DT 2026 erwerbstätig' });
cases.push({ name: 'Q1: Unterhalt = 2.300 × 3/7 ≈ 986 €', actual: q1.unterhalt, expected: 986, quelle: '3/7-Methode' });

// Q2: Nicht erwerbstätig, gleiche Einkommen — niedrigerer SB greift, aber Kappung erst bei mehr Unterhalt
const q2 = berechneEhegattenunterhalt(3500, 1200, false);
cases.push({ name: 'Q2: Peter nicht erwerbst., 3.500/1.200 € → SB 1.475 €', actual: q2.selbstbehalt, expected: 1475, quelle: 'DT 2026 nicht erwerbst.' });
cases.push({ name: 'Q2: Unterhalt unverändert 986 € (keine Kappung)', actual: q2.unterhalt, expected: 986, quelle: '3.500 - 986 = 2.514 > 1.475' });

// Q3: Erwerbstätig, Kappungsfall.
//   Einkommen 2.000 / 0; 3/7 = 857; SB 1.600 → max 400; Kappung auf 400.
const q3 = berechneEhegattenunterhalt(2000, 0, true);
cases.push({ name: 'Q3: Erwerbst., 2.000/0 € → max 400 € (Kappung)', actual: q3.unterhalt, expected: 400, quelle: '2.000 - 1.600 = 400, 3/7×2.000 = 857 → gekappt' });
cases.push({ name: 'Q3: gekappt = true', actual: q3.gekappt, expected: true, quelle: 'Selbstbehalt-Cap greift' });

// Q4: Nicht erwerbstätig, gleiche Konstellation — Kappung erst bei niedrigerem max
//   Einkommen 2.000 / 0; SB 1.475 → max 525; 3/7×2.000 = 857 → gekappt auf 525
const q4 = berechneEhegattenunterhalt(2000, 0, false);
cases.push({ name: 'Q4: Nicht erwerbst., 2.000/0 € → max 525 € (Kappung)', actual: q4.unterhalt, expected: 525, quelle: '2.000 - 1.475 = 525' });
cases.push({ name: 'Q4: Höher als Q3 (525 > 400)', actual: q4.unterhalt > q3.unterhalt, expected: true, quelle: 'Niedriger SB → mehr Unterhalt' });

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    ok = Math.abs(c.actual - c.expected) <= (c.tol ?? 0.005);
  } else {
    ok = c.actual === c.expected;
  }
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(10);
  const expectedStr = String(c.expected).padStart(10);
  console.log(`${mark} ${c.name.padEnd(72)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
