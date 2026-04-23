// Phase-P4-Verifikation Bürgergeld/Grundsicherungsgeld (Prompt 129).
// Ausführen: npx tsx scripts/verify-buergergeld-p4.ts
//
// Externe Primärquellen (nicht-zirkulär, Prompt 129-fix mit Wortlaut-Zitat):
//   § 12 SGB II n.F. nach 13. SGB II-ÄndG, BGBl. 2026 I Nr. 107 v. 16.04.2026
//     Artikel 1 Nr. 10 b) — Altersstaffel Schonvermögen:
//       bis zur Vollendung des 30. Lebensjahres:  5.000 €
//       ab dem 31. Lebensjahr:                   10.000 €
//       ab dem 41. Lebensjahr:                   12.500 €
//       ab dem 51. Lebensjahr:                   20.000 €
//   § 12 Abs. 2 Satz 2 SGB II n.F. — erhöhter Freibetrag ab Beginn des
//     Monats, in dem Altersgrenze erreicht wird.
//   § 20 SGB II + § 28a-Besitzschutz — Regelsätze 2026 unverändert (Nullrunde).

import { berechneBuergergeld } from '../lib/berechnungen/buergergeld';
import {
  BUERGERGELD_2026_H1,
  BUERGERGELD_2026_H2,
  getSchonvermoegenProPerson,
  getAktuelleBuergergeldParameter,
} from '../lib/berechnungen/buergergeld-parameter';

interface Fall { name: string; actual: number | string; expected: number | string; tol?: number; quelle: string; }
const cases: Fall[] = [];

// === Struktur-Sanity ===
cases.push(
  { name: 'H1 modus = karenz_pauschal',   actual: BUERGERGELD_2026_H1.vermoegen.modus, expected: 'karenz_pauschal', quelle: '§ 12 SGB II a.F.' },
  { name: 'H2 modus = alter_gestaffelt',  actual: BUERGERGELD_2026_H2.vermoegen.modus, expected: 'alter_gestaffelt', quelle: '§ 12 Abs. 2 SGB II n.F.' },
  { name: 'H2 Bezeichnung = Grundsicherungsgeld', actual: BUERGERGELD_2026_H2.bezeichnung, expected: 'Grundsicherungsgeld', quelle: '13. SGB II-ÄndG' },
  { name: 'H1 Bezeichnung = Bürgergeld',  actual: BUERGERGELD_2026_H1.bezeichnung, expected: 'Bürgergeld', quelle: 'SGB II a.F.' },
  { name: 'Stichtag-Switch 01.07.2026 wählt H2', actual: getAktuelleBuergergeldParameter(new Date('2026-07-01')).bezeichnung, expected: 'Grundsicherungsgeld', quelle: 'Stichtag-Switch-Pattern' },
  { name: 'Stichtag 30.06.2026 wählt noch H1',  actual: getAktuelleBuergergeldParameter(new Date('2026-06-30')).bezeichnung, expected: 'Bürgergeld', quelle: 'Stichtag-Switch-Pattern' },
);

// === getSchonvermoegenProPerson — Altersstaffel-Einheitstests ===
if (BUERGERGELD_2026_H2.vermoegen.modus === 'alter_gestaffelt') {
  const st = BUERGERGELD_2026_H2.vermoegen.staffeln;
  cases.push(
    { name: 'Alter 18 → 5.000 €',  actual: getSchonvermoegenProPerson(18, st), expected: 5000,  quelle: '§ 12 Abs. 2 Satz 1 Alt. 1 SGB II n.F.' },
    { name: 'Alter 28 → 5.000 €',  actual: getSchonvermoegenProPerson(28, st), expected: 5000,  quelle: '§ 12 Abs. 2 Satz 1 Alt. 1 SGB II n.F.' },
    { name: 'Alter 29 → 5.000 €',  actual: getSchonvermoegenProPerson(29, st), expected: 5000,  quelle: '§ 12 Abs. 2 Satz 1 Alt. 1 SGB II n.F.' },
    { name: 'Alter 30 → 10.000 € (am 30. Geburtstag)', actual: getSchonvermoegenProPerson(30, st), expected: 10000, quelle: '§ 12 Abs. 2 Satz 2: ab Beginn des Monats der Vollendung' },
    { name: 'Alter 35 → 10.000 €', actual: getSchonvermoegenProPerson(35, st), expected: 10000, quelle: '§ 12 Abs. 2 Satz 1 Alt. 2 SGB II n.F.' },
    { name: 'Alter 39 → 10.000 €', actual: getSchonvermoegenProPerson(39, st), expected: 10000, quelle: '§ 12 Abs. 2 Satz 1 Alt. 2 SGB II n.F.' },
    { name: 'Alter 40 → 12.500 €', actual: getSchonvermoegenProPerson(40, st), expected: 12500, quelle: '§ 12 Abs. 2 Satz 1 Alt. 3 SGB II n.F.' },
    { name: 'Alter 45 → 12.500 €', actual: getSchonvermoegenProPerson(45, st), expected: 12500, quelle: '§ 12 Abs. 2 Satz 1 Alt. 3 SGB II n.F.' },
    { name: 'Alter 49 → 12.500 €', actual: getSchonvermoegenProPerson(49, st), expected: 12500, quelle: '§ 12 Abs. 2 Satz 1 Alt. 3 SGB II n.F.' },
    { name: 'Alter 50 → 20.000 €', actual: getSchonvermoegenProPerson(50, st), expected: 20000, quelle: '§ 12 Abs. 2 Satz 1 Alt. 4 SGB II n.F.' },
    { name: 'Alter 55 → 20.000 €', actual: getSchonvermoegenProPerson(55, st), expected: 20000, quelle: '§ 12 Abs. 2 Satz 1 Alt. 4 SGB II n.F.' },
    { name: 'Alter 80 → 20.000 €', actual: getSchonvermoegenProPerson(80, st), expected: 20000, quelle: '§ 12 Abs. 2 Satz 1 Alt. 4 SGB II n.F.' },
  );
}

// === Integrationstests über berechneBuergergeld ===

// Prompt-129-fix Verify-Tabelle

// #1: H1 Stichtag 30.06.2026, Single Alter 35 → 40.000 € Karenz
const t1 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-06-30'), erwachseneAlter: [35],
})!;
cases.push({ name: '#1 H1 30.06.2026 Single 35 → Freibetrag 40.000 €',
  actual: t1.vermoegensFreibetrag, expected: 40000, quelle: 'Prompt 129-fix Verify #1' });
cases.push({ name: '#1 H1-Modus aktiv', actual: t1.vermoegenModus, expected: 'karenz_pauschal', quelle: 'Stichtag-Switch' });

// #2: H2 Stichtag 01.07.2026, Single Alter 35 → 10.000 €
const t2 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [35],
})!;
cases.push({ name: '#2 H2 01.07.2026 Single 35 → Freibetrag 10.000 €',
  actual: t2.vermoegensFreibetrag, expected: 10000, quelle: 'Prompt 129-fix Verify #2' });
cases.push({ name: '#2 H2-Modus aktiv', actual: t2.vermoegenModus, expected: 'alter_gestaffelt', quelle: 'Stichtag-Switch' });

// #3: H2 Unter 30
const t3 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [28],
})!;
cases.push({ name: '#3 H2 Single 28 → 5.000 €',
  actual: t3.vermoegensFreibetrag, expected: 5000, quelle: 'Prompt 129-fix Verify #3' });

// #4: H2 Exakt 30 (erste Stufe-Grenze)
const t4 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [30],
})!;
cases.push({ name: '#4 H2 Single 30 (Stufengrenze) → 10.000 €',
  actual: t4.vermoegensFreibetrag, expected: 10000, quelle: 'Prompt 129-fix Verify #4 (§ 12 Abs. 2 Satz 2)' });

// #5: H2 Exakt 29
const t5 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [29],
})!;
cases.push({ name: '#5 H2 Single 29 → 5.000 €',
  actual: t5.vermoegensFreibetrag, expected: 5000, quelle: 'Prompt 129-fix Verify #5' });

// #6: H2 Zwischenstufe Alter 45
const t6 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [45],
})!;
cases.push({ name: '#6 H2 Single 45 → 12.500 €',
  actual: t6.vermoegensFreibetrag, expected: 12500, quelle: 'Prompt 129-fix Verify #6' });

// #7: H2 Alt 55
const t7 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [55],
})!;
cases.push({ name: '#7 H2 Single 55 → 20.000 €',
  actual: t7.vermoegensFreibetrag, expected: 20000, quelle: 'Prompt 129-fix Verify #7' });

// #8: H2 Paar gemischt (28 + 52) → 5.000 + 20.000 = 25.000 €
const t8 = berechneBuergergeld({
  bedarfsgemeinschaft: 'paar', kinder: [],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [28, 52],
})!;
cases.push({ name: '#8 H2 Paar 28+52 → Summe 25.000 €',
  actual: t8.vermoegensFreibetrag, expected: 25000, quelle: 'Prompt 129-fix Verify #8' });
cases.push({ name: '#8 Aufschlüsselung hat 2 Einträge',
  actual: t8.vermoegensAufschluesselung.length, expected: 2, quelle: 'Aufschlüsselung pro Person' });

// #8b: H2 Paar mit 2 Kindern (28+32 + 5-J-Kind + 12-J-Kind)
// Kinder werden via kindAlterNumerisch auf 5 bzw. 13 gemappt → beide < 30 → je 5.000 €
// Summe: 5.000 + 10.000 + 5.000 + 5.000 = 25.000 €
const t8b = berechneBuergergeld({
  bedarfsgemeinschaft: 'paar-mit-kindern', kinder: [{ alter: '0-5' }, { alter: '6-13' }],
  warmmiete: 0, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-07-01'), erwachseneAlter: [28, 32],
})!;
cases.push({ name: '#8b H2 Paar+2 Kinder → Summe 25.000 €',
  actual: t8b.vermoegensFreibetrag, expected: 25000, quelle: '§ 12 Abs. 2 SGB II n.F. pro Person summiert' });

// #10: Regelsätze unverändert zwischen H1 und H2
cases.push({ name: '#10 Regelsatz Alleinstehend H2 = 563 €',
  actual: BUERGERGELD_2026_H2.regelsaetze.rbs1_alleinstehend, expected: 563,
  quelle: '§ 20 SGB II + § 28a-Besitzschutz (Nullrunde 2026, Reform ändert Regelsätze nicht)' });
cases.push({ name: '#10 H1 und H2 Regelsätze identisch',
  actual: JSON.stringify(BUERGERGELD_2026_H1.regelsaetze),
  expected: JSON.stringify(BUERGERGELD_2026_H2.regelsaetze),
  quelle: 'Reform ändert § 20 SGB II-Regelsätze nicht' });

// Regression: BG-01 (H1-Testcase aus P2) läuft weiter grün durch
const bg01 = berechneBuergergeld({
  bedarfsgemeinschaft: 'alleinstehend', kinder: [],
  warmmiete: 450, heizkosten: 0, einkommen: 0, vermoegen: 0,
  stichtag: new Date('2026-03-01'),
})!;
cases.push({ name: 'Regression BG-01 (P2) unverändert = 1.013 €',
  actual: bg01.gesamtAnspruch, expected: 1013, tol: 0.01, quelle: 'welle1-stufe4b-testfaelle.md BG-01' });

// ========== Ausgabe ==========
let fail = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    ok = Math.abs(c.actual - c.expected) <= (c.tol ?? 0.005);
  } else {
    ok = c.actual === c.expected;
  }
  const mark = ok ? '✓' : '✗';
  const line = `${mark} ${c.name.padEnd(65)} ist=${String(c.actual).padStart(10)}  soll=${String(c.expected).padStart(10)}  [${c.quelle}]`;
  console.log(line);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
