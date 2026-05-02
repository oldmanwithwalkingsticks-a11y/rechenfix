/**
 * Verify-Script für lib/berechnungen/kindergeld.ts (Welle-4 M1b, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - EStG § 32 Abs. 6 (Kinderfreibetrag + BEA):
 *     https://www.gesetze-im-internet.de/estg/__32.html
 *   - EStG § 66 (Höhe Kindergeld):
 *     https://www.gesetze-im-internet.de/estg/__66.html
 *   - BKGG § 6 (Höhe für Sonderfälle, Kindergeld 2026 = 259 €/Mo/Kind):
 *     https://www.gesetze-im-internet.de/bkgg_1996/__6.html
 *   - Familienkasse-Tabelle 2026: Kindergeld einheitlich 259 €/Monat/Kind.
 *   - § 31 EStG (Günstigerprüfung): Kindergeld vs. Kifb-Steuerersparnis.
 *
 * L-31-Disziplin: Test-Beschriftung trennt sauber zwischen
 *   - „zusammen"  (Splitting / Zusammenveranlagung) — voller Jahresfreibetrag pro Kind
 *   - „einzeln"   (Einzelveranlagung)              — halber Anteil pro Elternteil
 * NIEMALS „pro Elternteil" mit „zusammen" mischen.
 *
 * Test-Strategie:
 *   - Konstanten-Tests gegen § 32 Abs. 6 EStG + Familienkasse 2026.
 *   - Kindergeld-Multiplikatoren (1–5 Kinder) cent-genau.
 *   - Kifb-Gesamtbetrag pro Veranlagungs-Modus + Faktor-2-Beziehung
 *     (KIFB_GESAMT_EINZEL × 2 = KIFB_GESAMT_ZUSAMMEN, L-31).
 *   - zvE-Schätzung gegen handgerechnete brutto − SV − WK − SO.
 *   - Günstigerprüfung-Polarität: niedriges Brutto → Kindergeld,
 *     hohes Brutto → Freibetrag.
 *   - Edge: 0 Kinder → null.
 *
 * Tolerance: 0,01 € (€-Rundung) bzw. 0 für Konstanten/Logik.
 *
 * Ausführen: npx tsx scripts/verify-kindergeld.ts
 */

import {
  berechneKindergeld,
  KINDERGELD_PRO_KIND_MONAT,
  KIFB_SAECHLICH_ZUSAMMEN_2026,
  BEA_ZUSAMMEN_2026,
  KIFB_GESAMT_ZUSAMMEN_2026,
  KIFB_GESAMT_EINZEL_2026,
} from '../lib/berechnungen/kindergeld';

type TestCase = {
  name: string;
  actual: number | string | boolean | null;
  expected: number | string | boolean | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

// === Cluster A: Konstanten gegen § 32 Abs. 6 EStG + Familienkasse 2026 ===

cases.push(
  { name: 'A-01 KINDERGELD_PRO_KIND_MONAT (Familienkasse 2026)', actual: KINDERGELD_PRO_KIND_MONAT, expected: 259, tolerance: 0 },
  { name: 'A-02 KIFB_SAECHLICH_ZUSAMMEN_2026 (§ 32 Abs. 6)',     actual: KIFB_SAECHLICH_ZUSAMMEN_2026, expected: 6828, tolerance: 0 },
  { name: 'A-03 BEA_ZUSAMMEN_2026 (§ 32 Abs. 6)',                actual: BEA_ZUSAMMEN_2026, expected: 2928, tolerance: 0 },
  { name: 'A-04 KIFB_GESAMT_ZUSAMMEN_2026 (Summe)',              actual: KIFB_GESAMT_ZUSAMMEN_2026, expected: 9756, tolerance: 0 },
  { name: 'A-05 KIFB_GESAMT_EINZEL_2026 (Splitting/2)',          actual: KIFB_GESAMT_EINZEL_2026, expected: 4878, tolerance: 0 },
  { name: 'A-06 L-31 Faktor-2: EINZEL × 2 = ZUSAMMEN',           actual: KIFB_GESAMT_EINZEL_2026 * 2, expected: KIFB_GESAMT_ZUSAMMEN_2026, tolerance: 0 },
  { name: 'A-07 L-31 Dekomposition: SAECHLICH + BEA = GESAMT',   actual: KIFB_SAECHLICH_ZUSAMMEN_2026 + BEA_ZUSAMMEN_2026, expected: KIFB_GESAMT_ZUSAMMEN_2026, tolerance: 0 },
);

// === Cluster B: Kindergeld-Multiplikatoren (Familienkasse 2026, einheitlich 259 €/Mo) ===
//
// Manuell: 1 Kind = 259 €/Mo, 3.108 €/Jahr; 2 = 518/6.216; 3 = 777/9.324; ...

const kg = (n: number) => berechneKindergeld({
  anzahlKinder: n,
  jahresbruttoeinkommen: 30_000, // niedrig: Kindergeld immer Gewinner
  veranlagung: 'zusammen',
  kirchensteuer: false,
});

cases.push(
  { name: 'B-01 1 Kind: kindergeldMonat',  actual: kg(1)!.kindergeldMonat, expected: 259, tolerance: 0 },
  { name: 'B-01 1 Kind: kindergeldJahr',   actual: kg(1)!.kindergeldJahr,  expected: 3108, tolerance: 0 },
  { name: 'B-02 2 Kinder: kindergeldMonat',actual: kg(2)!.kindergeldMonat, expected: 518, tolerance: 0 },
  { name: 'B-02 2 Kinder: kindergeldJahr', actual: kg(2)!.kindergeldJahr,  expected: 6216, tolerance: 0 },
  { name: 'B-03 3 Kinder: kindergeldMonat',actual: kg(3)!.kindergeldMonat, expected: 777, tolerance: 0 },
  { name: 'B-04 4 Kinder: kindergeldMonat',actual: kg(4)!.kindergeldMonat, expected: 1036, tolerance: 0 },
  { name: 'B-05 5 Kinder: kindergeldMonat',actual: kg(5)!.kindergeldMonat, expected: 1295, tolerance: 0 },
);

// === Cluster C: Kifb-Gesamtbetrag pro Veranlagungs-Modus (L-31) ===
//
// Zusammen: 9.756 € pro Kind → 1 Kind 9.756, 2 Kinder 19.512.
// Einzeln:  4.878 € pro Kind → 1 Kind 4.878, 2 Kinder 9.756.

const c1 = berechneKindergeld({ anzahlKinder: 1, jahresbruttoeinkommen: 30_000, veranlagung: 'zusammen', kirchensteuer: false });
const c2 = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 30_000, veranlagung: 'zusammen', kirchensteuer: false });
const c3 = berechneKindergeld({ anzahlKinder: 1, jahresbruttoeinkommen: 30_000, veranlagung: 'einzeln',  kirchensteuer: false });
const c4 = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 30_000, veranlagung: 'einzeln',  kirchensteuer: false });

cases.push(
  { name: 'C-01 1 Kind zusammen: Kifb gesamt',  actual: c1!.kinderFreibetragGesamt, expected: 9756,  tolerance: 0 },
  { name: 'C-02 2 Kinder zusammen: Kifb gesamt',actual: c2!.kinderFreibetragGesamt, expected: 19512, tolerance: 0 },
  { name: 'C-03 1 Kind einzeln: Kifb gesamt',   actual: c3!.kinderFreibetragGesamt, expected: 4878,  tolerance: 0 },
  { name: 'C-04 2 Kinder einzeln: Kifb gesamt', actual: c4!.kinderFreibetragGesamt, expected: 9756,  tolerance: 0 },
);

// === Cluster D: zvE-Schätzung handgerechnet ===
//
// Brutto 30.000 €, zusammen, 2 Kinder, keine Kirche:
//   SV-Pauschale = 30.000 × 0,20 = 6.000
//   WK-Pauschale = 1.230 × 2 = 2.460  (zusammen → 2 Partner)
//   SO-Pauschale = 36 × 2 = 72
//   zvE_o = 30.000 - 6.000 - 2.460 - 72 = 21.468
//   Kifb gesamt = 9.756 × 2 = 19.512
//   zvE_m = 21.468 - 19.512 = 1.956

const d1 = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 30_000, veranlagung: 'zusammen', kirchensteuer: false });
cases.push(
  { name: 'D-01 30k zus. 2K: zvEOhneFreibetrag', actual: d1!.zvEOhneFreibetrag, expected: 21468, tolerance: 0.01 },
  { name: 'D-01 30k zus. 2K: zvEMitFreibetrag',  actual: d1!.zvEMitFreibetrag,  expected: 1956,  tolerance: 0.01 },
);

// Einzelveranlagung 30.000 €, 1 Kind:
//   SV = 6.000; WK = 1.230; SO = 36
//   zvE_o = 30.000 - 6.000 - 1.230 - 36 = 22.734
//   Kifb gesamt = 4.878
//   zvE_m = 22.734 - 4.878 = 17.856

const d2 = berechneKindergeld({ anzahlKinder: 1, jahresbruttoeinkommen: 30_000, veranlagung: 'einzeln', kirchensteuer: false });
cases.push(
  { name: 'D-02 30k einz. 1K: zvEOhneFreibetrag', actual: d2!.zvEOhneFreibetrag, expected: 22734, tolerance: 0.01 },
  { name: 'D-02 30k einz. 1K: zvEMitFreibetrag',  actual: d2!.zvEMitFreibetrag,  expected: 17856, tolerance: 0.01 },
);

// === Cluster E: Günstigerprüfung-Polarität (§ 31 EStG) ===
//
// Niedriges Brutto → Kindergeld günstiger. Hohes Brutto → Freibetrag günstiger.

const e_low  = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 25_000, veranlagung: 'zusammen', kirchensteuer: false });
const e_high = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 200_000, veranlagung: 'zusammen', kirchensteuer: false });

cases.push(
  { name: 'E-01 25k zus. 2K: gewinner = kindergeld', actual: e_low!.gewinner,  expected: 'kindergeld' },
  { name: 'E-02 200k zus. 2K: gewinner = freibetrag',actual: e_high!.gewinner, expected: 'freibetrag' },
  { name: 'E-03 vorteilKindergeld = kindergeldJahr', actual: e_high!.vorteilKindergeld, expected: 6216, tolerance: 0 },
);

// === Cluster F: Breakeven-Existenz (Binary-Search-Ergebnis plausibel) ===
//
// Mit Splittingtarif liegt der Breakeven ungefähr im Bereich, in dem das zu
// versteuernde Einkommen so hoch ist, dass die Steuerersparnis durch den
// Kifb das Kindergeld überschreitet. Wir testen nur, dass das Ergebnis im
// Bereich 30.000–300.000 € liegt (kein hartkodierter Wert, da Brutto durch
// Binary-Search auf volle 1.000 € gerundet wird).

const f1 = berechneKindergeld({ anzahlKinder: 2, jahresbruttoeinkommen: 60_000, veranlagung: 'zusammen', kirchensteuer: false });
cases.push(
  { name: 'F-01 Breakeven liegt in plausiblem Bereich (>30k)',  actual: (f1!.breakevenBrutto > 30_000), expected: true },
  { name: 'F-01 Breakeven liegt in plausiblem Bereich (<300k)', actual: (f1!.breakevenBrutto < 300_000), expected: true },
  { name: 'F-01 Breakeven gerundet auf volle 1.000 €',          actual: f1!.breakevenBrutto % 1000, expected: 0, tolerance: 0 },
);

// === Cluster G: Edge-Cases ===
//
// 0 Kinder → null.
cases.push(
  { name: 'G-01 0 Kinder → null', actual: berechneKindergeld({ anzahlKinder: 0, jahresbruttoeinkommen: 30_000, veranlagung: 'zusammen', kirchensteuer: false }) === null, expected: true },
);

// Sehr niedriges Brutto unter SV/WK/SO-Summe → zvE_o = 0
const g2 = berechneKindergeld({ anzahlKinder: 1, jahresbruttoeinkommen: 1000, veranlagung: 'zusammen', kirchensteuer: false });
cases.push(
  { name: 'G-02 1k Brutto: zvEOhneFreibetrag = 0 (Floor)', actual: g2!.zvEOhneFreibetrag, expected: 0, tolerance: 0.01 },
  { name: 'G-02 1k Brutto: zvEMitFreibetrag = 0',          actual: g2!.zvEMitFreibetrag,  expected: 0, tolerance: 0.01 },
  { name: 'G-02 1k Brutto: gewinner = kindergeld',         actual: g2!.gewinner,          expected: 'kindergeld' },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    const tol = c.tolerance ?? 0.01;
    ok = Math.abs(c.actual - c.expected) <= tol;
  } else {
    ok = c.actual === c.expected;
  }
  const status = ok ? '✓' : '✗';
  const actualStr = String(c.actual);
  const expectedStr = String(c.expected);
  console.log(
    `  ${status} ${c.name.padEnd(58)} ist ${actualStr.padStart(14)}  soll ${expectedStr.padStart(14)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
