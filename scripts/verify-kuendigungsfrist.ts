/**
 * Verify-Script für lib/berechnungen/kuendigungsfrist.ts (Welle-4 M2a, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - BGB § 622 (Kündigungsfristen Arbeitsverhältnis):
 *     https://www.gesetze-im-internet.de/bgb/__622.html
 *     - Abs. 1: Grundfrist 4 Wochen zum 15. oder Monatsende
 *     - Abs. 2: Staffel nach Betriebszugehörigkeit (1/2/3/4/5/6/7 Mon)
 *     - Abs. 3: Probezeit-Frist 2 Wochen
 *   - BAG 10 AZR 64/17 v. 25.04.2018: Stufe der § 622 Abs. 2-Frist bestimmt
 *     sich nach Betriebszugehörigkeit zum Fristende, nicht zum Kündigungs-
 *     datum (Lookahead-Algorithmus).
 *
 * Lib-Befund: Die Lib modelliert NUR § 622 BGB (Abs. 1, 2, 3) + BAG-
 * Lookahead + abweichende Vertragsfrist. Sie modelliert NICHT:
 *   - § 169 SGB IX (Schwerbehinderten-Mindestfrist)
 *   - § 113 InsO (Insolvenz-Höchstfrist)
 *   - § 4 KSchG (3-Wochen-Klagefrist)
 *   - EuGH C-555/07 Kücükdeveci (§ 622 Abs. 2 Satz 2 nicht angewendet)
 * Diese Normen werden nur im Erklärtext der Konfig erwähnt → kein
 * Test-Cluster dafür.
 *
 * Datum-Tests: Vergleich via ISO-Strings (toISOString().slice(0,10)),
 * Tolerance 0 (exakte Datums-Berechnung).
 *
 * Ausführen: npx tsx scripts/verify-kuendigungsfrist.ts
 */

import {
  berechneKuendigungsfrist,
} from '../lib/berechnungen/kuendigungsfrist';

type TestCase = {
  name: string;
  actual: string | number | null;
  expected: string | number | null;
};

const cases: TestCase[] = [];

/**
 * Lokaler Datums-Vergleich (kein UTC-Shift). Wichtig: Die Lib rechnet via
 * `new Date(y, m, d)` in lokaler Zeit; `toISOString()` würde nach UTC
 * konvertieren und in MEZ/MESZ jeweils einen Tag früher anzeigen.
 */
const isoDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};
const isNull = (v: unknown): number => v === null ? 1 : 0;

const calc = (params: {
  kuendiger?: 'arbeitnehmer' | 'arbeitgeber';
  beschaeftigtSeit: string;
  probezeit?: boolean;
  probezeitDauer?: 3 | 6;
  kuendigungsDatum: string;
  abweichendeFrist?: boolean;
  individuelleFristWochen?: number;
}) => berechneKuendigungsfrist({
  kuendiger: params.kuendiger ?? 'arbeitnehmer',
  beschaeftigtSeit: params.beschaeftigtSeit,
  probezeit: params.probezeit ?? false,
  probezeitDauer: params.probezeitDauer ?? 6,
  kuendigungsDatum: params.kuendigungsDatum,
  abweichendeFrist: params.abweichendeFrist ?? false,
  individuelleFristWochen: params.individuelleFristWochen ?? 0,
});

// === Cluster A: § 622 Abs. 1 BGB — Grundfrist 4 Wochen zum 15./Monatsende ===
//
// Manuell (UTC-Datums-Arithmetik via Date-Konstruktor):
//   AN, kuendigungsDatum 2025-06-01: +28 Tage = 2025-06-29
//     15. Juni 2025 = 2025-06-15 (< 29.06., not >=). EOM 2025-06-30 >= 29.06 → 2025-06-30.
//   AN, kuendigungsDatum 2025-06-15: +28 Tage = 2025-07-13
//     15. Juli 2025 = 2025-07-15 >= 13.07 → 2025-07-15.
//   AN, kuendigungsDatum 2025-06-30: +28 Tage = 2025-07-28
//     15. Juli (15.07 < 28.07.) → EOM 2025-07-31.

const a1 = calc({ kuendiger: 'arbeitnehmer', beschaeftigtSeit: '2024-01-01', kuendigungsDatum: '2025-06-01' });
cases.push(
  { name: 'A-01 AN 4-Wo-Frist 01.06.: letzterArbeitstag = 30.06.', actual: isoDate(a1!.letzterArbeitstag), expected: '2025-06-30' },
  { name: 'A-01: Rechtsgrundlage § 622 Abs. 1 BGB',                actual: a1!.rechtsgrundlage,            expected: '§ 622 Abs. 1 BGB' },
);

const a2 = calc({ kuendiger: 'arbeitnehmer', beschaeftigtSeit: '2024-01-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'A-02 AN 4-Wo-Frist 15.06.: letzterArbeitstag = 15.07.', actual: isoDate(a2!.letzterArbeitstag), expected: '2025-07-15' },
);

const a3 = calc({ kuendiger: 'arbeitnehmer', beschaeftigtSeit: '2024-01-01', kuendigungsDatum: '2025-06-30' });
cases.push(
  { name: 'A-03 AN 4-Wo-Frist 30.06.: letzterArbeitstag = 31.07.', actual: isoDate(a3!.letzterArbeitstag), expected: '2025-07-31' },
);

// AG, Betriebszugehörigkeit < 2 J: gleiche 4-Wochen-Logik
const a4 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2024-08-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'A-04 AG <2 J 15.06.: 4 Wo zum 15./EOM = 15.07.',       actual: isoDate(a4!.letzterArbeitstag), expected: '2025-07-15' },
  { name: 'A-04: Rechtsgrundlage § 622 Abs. 1 BGB',                actual: a4!.rechtsgrundlage,            expected: '§ 622 Abs. 1 BGB' },
);

// === Cluster B: § 622 Abs. 2 BGB Staffel — AG-Fristen ===
//
// Manuell:
//   2018-01-01 → 2025-06-15: 7 J 5 Mon, naive = Stufe 5J = 2 Mon
//     Lookahead: Stufe 8 J (3 Mon) bei nextEndOfMonth(2025-06-15 + 3M) = 2025-09-30,
//     dort jahre = 7 (immer noch <8) → break. Beste = Stufe 5J = 2 Mon zum EOM.
//     berechne: nextEndOfMonth(addMonths(2025-06-15, 2)) = nextEndOfMonth(2025-08-15) = 2025-08-31.
//   2010-01-01 → 2025-06-15: 15 J 5 Mon → Stufe 15J = 6 Mon zum EOM
//     berechne: nextEndOfMonth(addMonths(2025-06-15, 6)) = 2025-12-31.
//   2005-01-01 → 2025-06-15: 20 J 5 Mon → Stufe 20J = 7 Mon zum EOM
//     berechne: nextEndOfMonth(addMonths(2025-06-15, 7)) = 2026-01-31.

const b1 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2018-01-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'B-01 AG 7 J: 2 Mon zum EOM = 31.08.',                  actual: isoDate(b1!.letzterArbeitstag), expected: '2025-08-31' },
  { name: 'B-01: § 622 Abs. 2 Satz 1 Nr. 2',                      actual: b1!.rechtsgrundlage,            expected: '§ 622 Abs. 2 Satz 1 Nr. 2 BGB' },
);

const b2 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2010-01-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'B-02 AG 15 J: 6 Mon zum EOM = 31.12.',                 actual: isoDate(b2!.letzterArbeitstag), expected: '2025-12-31' },
  { name: 'B-02: § 622 Abs. 2 Satz 1 Nr. 6',                      actual: b2!.rechtsgrundlage,            expected: '§ 622 Abs. 2 Satz 1 Nr. 6 BGB' },
);

const b3 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2005-01-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'B-03 AG 20 J: 7 Mon zum EOM = 31.01.2026',             actual: isoDate(b3!.letzterArbeitstag), expected: '2026-01-31' },
  { name: 'B-03: § 622 Abs. 2 Satz 1 Nr. 7',                      actual: b3!.rechtsgrundlage,            expected: '§ 622 Abs. 2 Satz 1 Nr. 7 BGB' },
);

// 2 J ≤ Zugehörigkeit < 5 J → Stufe 1 = 1 Mon zum EOM
//   beschaeftigtSeit 2022-01-01, kuendigungsDatum 2025-06-15: 3 J 5 Mon
//   nextEndOfMonth(addMonths(2025-06-15, 1)) = nextEndOfMonth(2025-07-15) = 2025-07-31.
const b4 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2022-01-01', kuendigungsDatum: '2025-06-15' });
cases.push(
  { name: 'B-04 AG 3 J: 1 Mon zum EOM = 31.07.',                  actual: isoDate(b4!.letzterArbeitstag), expected: '2025-07-31' },
  { name: 'B-04: § 622 Abs. 2 Satz 1 Nr. 1',                      actual: b4!.rechtsgrundlage,            expected: '§ 622 Abs. 2 Satz 1 Nr. 1 BGB' },
);

// === Cluster C: BAG 10 AZR 64/17 Lookahead-Stufenerhöhung ===
//
// 2020-09-01 → 2025-08-15: naive 4 J 11 Mon → Stufe < 5J = 1 Mon
// Lookahead Stufe 5J (2 Mon): nextEndOfMonth(addMonths(2025-08-15, 2)) = 2025-10-31.
//   Bei 2025-10-31: 5 J 1 Mon → ≥ 5J → trifft → besteFrist = Stufe 5J.
// Lookahead Stufe 8J (3 Mon): bei 2025-11-30, jahre = 5 → < 8 → break.
// Resultat: 2 Mon zum EOM = 2025-10-31, stufeErhoeht.

const c1 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2020-09-01', kuendigungsDatum: '2025-08-15' });
cases.push(
  { name: 'C-01 Lookahead naiv-4-Mon → Stufe 5J: letzterArbeitstag = 31.10.', actual: isoDate(c1!.letzterArbeitstag), expected: '2025-10-31' },
  { name: 'C-01 Rechtsgrundlage = Stufe 5J (Nr. 2)',              actual: c1!.rechtsgrundlage, expected: '§ 622 Abs. 2 Satz 1 Nr. 2 BGB' },
);

// === Cluster D: § 622 Abs. 3 Probezeit ===
//
// beschaeftigtSeit 2025-01-01, probezeit=true, dauer=6, kuendigungsDatum 2025-04-15:
//   probezeitEnde = 2025-07-01. 2025-04-15 ≤ 2025-07-01 → istProbezeit = true.
//   letzterArbeitstag = 2025-04-15 + 14 Tage = 2025-04-29.

const d1 = calc({
  kuendiger: 'arbeitnehmer',
  beschaeftigtSeit: '2025-01-01',
  probezeit: true,
  probezeitDauer: 6,
  kuendigungsDatum: '2025-04-15',
});
cases.push(
  { name: 'D-01 Probezeit: letzterArbeitstag = 29.04.',           actual: isoDate(d1!.letzterArbeitstag), expected: '2025-04-29' },
  { name: 'D-01: Rechtsgrundlage § 622 Abs. 3 BGB',               actual: d1!.rechtsgrundlage,            expected: '§ 622 Abs. 3 BGB' },
  { name: 'D-01: istProbezeit = true',                            actual: d1!.istProbezeit ? 1 : 0,       expected: 1 },
);

// Probezeit vorbei → normale 4-Wochen-Frist (AN)
//   beschaeftigtSeit 2024-06-01, dauer=6 → Probezeitende 2024-12-01.
//   kuendigungsDatum 2025-06-15 > Probezeitende → normale 4-Wo-Frist (jahre=1, AN-Pfad)
const d2 = calc({
  kuendiger: 'arbeitnehmer',
  beschaeftigtSeit: '2024-06-01',
  probezeit: true,
  probezeitDauer: 6,
  kuendigungsDatum: '2025-06-15',
});
cases.push(
  { name: 'D-02 Probezeit vorbei: 4-Wo-Frist 15.06. → 15.07.',     actual: isoDate(d2!.letzterArbeitstag), expected: '2025-07-15' },
  { name: 'D-02: istProbezeit = false',                            actual: d2!.istProbezeit ? 1 : 0,       expected: 0 },
);

// === Cluster E: Abweichende Vertrags-/Tariffrist ===
//
// kuendigungsDatum 2025-06-01, abweichendeFrist=true, individuelleFristWochen=8:
//   letzterArbeitstag = 2025-06-01 + 56 Tage = 2025-07-27.

const e1 = calc({
  beschaeftigtSeit: '2024-01-01',
  kuendigungsDatum: '2025-06-01',
  abweichendeFrist: true,
  individuelleFristWochen: 8,
});
cases.push(
  { name: 'E-01 abweichende Frist 8 Wo: letzterArbeitstag = 27.07.', actual: isoDate(e1!.letzterArbeitstag), expected: '2025-07-27' },
  { name: 'E-01: Rechtsgrundlage Vertrag/Tarif',                    actual: e1!.rechtsgrundlage,            expected: 'Arbeits- oder Tarifvertrag' },
);

// === Cluster F: Betriebszugehörigkeits-Berechnung ===
//
// 2018-03-15 → 2025-06-30:
//   jahre = 7, monate = 6-3 = 3, bis.getDate (30) >= von.getDate (15) → kein --.
//   jahre = 7, monate = 3.
const f1 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2018-03-15', kuendigungsDatum: '2025-06-30' });
cases.push(
  { name: 'F-01 betriebszugehoerigkeitJahre',                      actual: f1!.betriebszugehoerigkeitJahre,  expected: 7 },
  { name: 'F-01 betriebszugehoerigkeitMonate',                     actual: f1!.betriebszugehoerigkeitMonate, expected: 3 },
);

// 2020-08-20 → 2025-04-10: bis.getDate (10) < von.getDate (20) → monate--
//   jahre = 5, monate = 4-8 = -4. monate-- → -5. -5 < 0 → jahre--, monate += 12 → jahre=4, monate=7.
const f2 = calc({ kuendiger: 'arbeitgeber', beschaeftigtSeit: '2020-08-20', kuendigungsDatum: '2025-04-10' });
cases.push(
  { name: 'F-02 Tag-Adjust: jahre',                                 actual: f2!.betriebszugehoerigkeitJahre,  expected: 4 },
  { name: 'F-02 Tag-Adjust: monate',                                actual: f2!.betriebszugehoerigkeitMonate, expected: 7 },
);

// === Cluster G: Edge — Null-Returns ===

cases.push(
  { name: 'G-01 leerer beschaeftigtSeit → null', actual: isNull(calc({ beschaeftigtSeit: '', kuendigungsDatum: '2025-06-15' })), expected: 1 },
  { name: 'G-02 leerer kuendigungsDatum → null', actual: isNull(calc({ beschaeftigtSeit: '2024-01-01', kuendigungsDatum: '' })), expected: 1 },
  { name: 'G-03 ungültiger beschaeftigtSeit → null', actual: isNull(calc({ beschaeftigtSeit: 'kein-datum', kuendigungsDatum: '2025-06-15' })), expected: 1 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (c.actual === null && c.expected === null) {
    ok = true;
  } else if (c.actual === null || c.expected === null) {
    ok = false;
  } else if (typeof c.actual === 'number' && typeof c.expected === 'number') {
    ok = c.actual === c.expected;
  } else {
    ok = c.actual === c.expected;
  }
  const status = ok ? '✓' : '✗';
  const actualStr = c.actual === null ? 'null' : String(c.actual);
  const expectedStr = c.expected === null ? 'null' : String(c.expected);
  console.log(
    `  ${status} ${c.name.padEnd(58)} ist ${actualStr.padStart(28)}  soll ${expectedStr.padStart(28)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
