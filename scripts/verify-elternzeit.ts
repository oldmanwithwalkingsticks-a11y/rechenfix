/**
 * Verify-Script für lib/berechnungen/elternzeit.ts (Welle-4 M2b Phase B, 03.05.2026).
 *
 * Lib aus M2b-Phase-B0 extrahiert (Component zuvor KEINE-LIB,
 * Refactor-Commit 010e371).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - BEEG § 15 Abs. 1, 2 (Anspruch auf Elternzeit, max. 36 Mon pro Elternteil
 *     bis 8. Geburtstag): https://www.gesetze-im-internet.de/beeg/__15.html
 *   - BEEG § 16 Abs. 1 (Anmeldefristen — 7 Wo vor Beginn in den ersten
 *     3 Lebensjahren, 13 Wo zwischen 3. und 8. Geburtstag):
 *     https://www.gesetze-im-internet.de/beeg/__16.html
 *   - BEEG § 18 Abs. 1 (Kündigungsschutz, frühestens 8 Wo vor Beginn bis Ende):
 *     https://www.gesetze-im-internet.de/beeg/__18.html
 *   - BEEG § 4 Abs. 4 (Partnermonate-Bonus, beide ≥ 2 Mon → 14 Mo Elterngeld)
 *   - MuSchG § 3 Abs. 2 (Mutterschutz 8 Wo nach Geburt → Überlappungs-Hinweis)
 *
 * L-35-Disziplin: Lib modelliert die in den Konstanten + berechneElternzeit
 * sichtbaren Tatbestände. NICHT modelliert: § 17 Abs. 1 (Urlaubskürzung),
 * § 17 Abs. 2 (Übertragung 3.–8. Geburtstag — die Lib unterstützt zwei
 * Phasen P1+P2, aber ohne explizite Übertragungs-Logik), § 15 Abs. 4
 * (32-h-Korridor Teilzeit). Tests bewusst nur gegen Lib-Realität.
 *
 * Datum-Vergleich: `isoDateLocal` aus welle4-overrides (Welle-4-Standard).
 *
 * Ausführen: npx tsx scripts/verify-elternzeit.ts
 */

import {
  berechneElternzeit,
  MAX_ELTERNZEIT_MONATE,
  MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT,
  ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG,
  ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG,
  KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN,
  PARTNERMONATE_MINDEST,
} from '../lib/berechnungen/elternzeit';
import { isoDateLocal } from './welle4-overrides';

type TestCase = {
  name: string;
  actual: string | number | null;
  expected: string | number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const isNull = (v: unknown): number => v === null ? 1 : 0;

const calc = (params: {
  geburt: string;
  p1Beginn?: string;
  p1Monate?: number;
  p2Beginn?: string;
  p2Monate?: number;
}) => berechneElternzeit({
  geburt: params.geburt,
  p1Beginn: params.p1Beginn,
  p1Monate: params.p1Monate ?? 12,
  p2Beginn: params.p2Beginn,
  p2Monate: params.p2Monate ?? 2,
});

// === Cluster A: Konstanten gegen BEEG ===

cases.push(
  { name: 'A-01 MAX_ELTERNZEIT_MONATE (§ 15 Abs. 2)',          actual: MAX_ELTERNZEIT_MONATE,                  expected: 36, tolerance: 0 },
  { name: 'A-02 MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT (8 Wo)',    actual: MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT,     expected: 56, tolerance: 0 },
  { name: 'A-03 ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG (§ 16, 7 Wo)', actual: ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG, expected: 49, tolerance: 0 },
  { name: 'A-04 ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG (§ 16, 13 Wo)', actual: ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG, expected: 91, tolerance: 0 },
  { name: 'A-05 KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN (§ 18, 8 Wo)', actual: KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN,    expected: 56, tolerance: 0 },
  { name: 'A-06 PARTNERMONATE_MINDEST (§ 4 Abs. 4)',           actual: PARTNERMONATE_MINDEST,                  expected: 2, tolerance: 0 },
);

// === Cluster B: Default-Beginn (P1 = Geburt + 56d, P2 = Geburt) ===
//
// Geburt 2025-01-15:
//   Default p1B = 2025-01-15 + 56 Tage = 2025-03-12
//   Default p2B = 2025-01-15
//   p1Mon=12 → p1E = 2025-03-12 + 12 Mon = 2026-03-12
//   p2Mon=2  → p2E = 2025-01-15 + 2 Mon  = 2025-03-15
//   gesamtMonate = 14, achterGeburtstag = 2033-01-15

const b1 = calc({ geburt: '2025-01-15' });
cases.push(
  { name: 'B-01 Default p1B = Geburt + 56d',          actual: isoDateLocal(b1!.p1B),               expected: '2025-03-12' },
  { name: 'B-01 Default p2B = Geburt',                actual: isoDateLocal(b1!.p2B),               expected: '2025-01-15' },
  { name: 'B-01 p1Mon = 12',                          actual: b1!.p1Mon,                            expected: 12, tolerance: 0 },
  { name: 'B-01 p2Mon = 2',                           actual: b1!.p2Mon,                            expected: 2, tolerance: 0 },
  { name: 'B-01 p1E = p1B + 12 Mon',                  actual: isoDateLocal(b1!.p1E),               expected: '2026-03-12' },
  { name: 'B-01 p2E = p2B + 2 Mon',                   actual: isoDateLocal(b1!.p2E),               expected: '2025-03-15' },
  { name: 'B-01 gesamtMonate = 14',                   actual: b1!.gesamtMonate,                    expected: 14, tolerance: 0 },
  { name: 'B-01 achterGeburtstag = Geburt + 8 J',     actual: isoDateLocal(b1!.achterGeburtstag),  expected: '2033-01-15' },
  { name: 'B-01 mutterschutzEnde = Geburt + 56 d',    actual: isoDateLocal(b1!.mutterschutzEnde),  expected: '2025-03-12' },
);

// === Cluster C: § 16 Abs. 1 — Anmeldefristen ===
//
// Geburt 2025-01-15, dritter Geburtstag 2028-01-15.
//
// Beide Beginne vor 3. Geburtstag (Default-Szenario):
//   anmeldungP1 = 2025-03-12 - 49d = 2025-01-22
//     (12.03 - 12d = 28.02; - 28d = 31.01; - 9d = 22.01)
//   anmeldungP2 = 2025-01-15 - 49d = 2024-11-27

const c1 = calc({ geburt: '2025-01-15' });
cases.push(
  { name: 'C-01 anmeldungP1 = p1B - 49d (vor 3. Geburtstag)', actual: isoDateLocal(c1!.anmeldungP1), expected: '2025-01-22' },
  { name: 'C-01 anmeldungP2 = p2B - 49d (vor 3. Geburtstag)', actual: isoDateLocal(c1!.anmeldungP2), expected: '2024-11-27' },
);

// Beginn nach 3. Geburtstag → -91d (13 Wochen):
// Geburt 2025-01-15, p1B 2030-06-01 (>>3. Geburtstag 2028-01-15)
// anmeldungP1 = 2030-06-01 - 91d = 2030-03-02
//   (01.06 - 1d = 31.05; - 31d = 30.04; - 30d = 31.03; - 29d = 02.03)
const c2 = calc({ geburt: '2025-01-15', p1Beginn: '2030-06-01', p1Monate: 6 });
cases.push(
  { name: 'C-02 anmeldungP1 = p1B - 91d (nach 3. Geburtstag)', actual: isoDateLocal(c2!.anmeldungP1), expected: '2030-03-02' },
);

// === Cluster D: § 18 — Kündigungsschutz (8 Wochen vor Beginn bis Ende) ===
//
// p1B = 2025-03-12 → kSchutzBeginnP1 = 2025-03-12 - 56d = 2025-01-15
//   (12.03 - 12d = 28.02; - 28d = 31.01; - 16d = 15.01)
// kSchutzEndeP1 = p1E = 2026-03-12

const d1 = calc({ geburt: '2025-01-15' });
cases.push(
  { name: 'D-01 kSchutzBeginnP1 = p1B - 56d',         actual: isoDateLocal(d1!.kSchutzBeginnP1), expected: '2025-01-15' },
  { name: 'D-01 kSchutzEndeP1 = p1E',                 actual: isoDateLocal(d1!.kSchutzEndeP1),   expected: '2026-03-12' },
  { name: 'D-01 kSchutzBeginnP2 = p2B - 56d',         actual: isoDateLocal(d1!.kSchutzBeginnP2), expected: '2024-11-20' },
  { name: 'D-01 kSchutzEndeP2 = p2E',                 actual: isoDateLocal(d1!.kSchutzEndeP2),   expected: '2025-03-15' },
);

// === Cluster E: § 4 Abs. 4 BEEG — Partnermonate-Bonus ===
//
// Beide ≥ 2 Mon → ok. Sonst nicht.

const e1 = calc({ geburt: '2025-01-15', p1Monate: 2, p2Monate: 2 });
const e2 = calc({ geburt: '2025-01-15', p1Monate: 12, p2Monate: 1 });
const e3 = calc({ geburt: '2025-01-15', p1Monate: 0, p2Monate: 14 });
const e4 = calc({ geburt: '2025-01-15', p1Monate: 14, p2Monate: 0 });
cases.push(
  { name: 'E-01 P1=2, P2=2 → partnermonateOk = true',   actual: e1!.partnermonateOk ? 1 : 0, expected: 1, tolerance: 0 },
  { name: 'E-02 P1=12, P2=1 → partnermonateOk = false', actual: e2!.partnermonateOk ? 1 : 0, expected: 0, tolerance: 0 },
  { name: 'E-03 P1=0,  P2=14 → partnermonateOk = false',actual: e3!.partnermonateOk ? 1 : 0, expected: 0, tolerance: 0 },
  { name: 'E-04 P1=14, P2=0 → partnermonateOk = false', actual: e4!.partnermonateOk ? 1 : 0, expected: 0, tolerance: 0 },
);

// === Cluster F: Mutterschutz-Überlappung ===
//
// Geburt 2025-01-15, mutterschutzEnde = 2025-03-12.
//
// F-01: Default-Szenario → p1B = 2025-03-12 (= mutterschutzEnde),
//       p2B = 2025-01-15 (< mutterschutzEnde) → ueberlappung = true (wegen P2)
// F-02: P1 vor mutterschutzEnde → ueberlappung = true
// F-03: Beide nach mutterschutzEnde → ueberlappung = false

const f1 = calc({ geburt: '2025-01-15' });
const f2 = calc({ geburt: '2025-01-15', p1Beginn: '2025-02-15', p2Beginn: '2025-04-01' });
const f3 = calc({ geburt: '2025-01-15', p1Beginn: '2025-04-01', p2Beginn: '2025-04-01' });
cases.push(
  { name: 'F-01 Default: p2B vor mutterschutzEnde → ueberlappung = true', actual: f1!.ueberlappung ? 1 : 0, expected: 1, tolerance: 0 },
  { name: 'F-02 P1 vor mutterschutzEnde → ueberlappung = true',           actual: f2!.ueberlappung ? 1 : 0, expected: 1, tolerance: 0 },
  { name: 'F-03 Beide nach mutterschutzEnde → ueberlappung = false',       actual: f3!.ueberlappung ? 1 : 0, expected: 0, tolerance: 0 },
);

// === Cluster G: Verbleibender Anspruch + Clamping § 15 Abs. 2 ===
//
// p1Mon=12 → verbleibendP1 = 36 - 12 = 24
// p1Mon=36 → 0
// p1Mon=40 → clamp auf 36 → verbleibendP1 = 0
// p1Mon=-5 → clamp auf 0  → verbleibendP1 = 36

const g1 = calc({ geburt: '2025-01-15', p1Monate: 12, p2Monate: 0 });
const g2 = calc({ geburt: '2025-01-15', p1Monate: 36, p2Monate: 0 });
const g3 = calc({ geburt: '2025-01-15', p1Monate: 40, p2Monate: 0 });
const g4 = calc({ geburt: '2025-01-15', p1Monate: -5, p2Monate: 0 });
cases.push(
  { name: 'G-01 p1Mon=12: verbleibendP1 = 24',        actual: g1!.verbleibendP1, expected: 24, tolerance: 0 },
  { name: 'G-02 p1Mon=36: verbleibendP1 = 0',         actual: g2!.verbleibendP1, expected: 0, tolerance: 0 },
  { name: 'G-03 p1Mon=40 → Clamp 36: verbleibendP1=0', actual: g3!.verbleibendP1, expected: 0, tolerance: 0 },
  { name: 'G-03 p1Mon=40 → Clamp: p1Mon = 36',         actual: g3!.p1Mon,         expected: 36, tolerance: 0 },
  { name: 'G-04 p1Mon=-5 → Clamp 0: p1Mon = 0',        actual: g4!.p1Mon,         expected: 0, tolerance: 0 },
  { name: 'G-04 p1Mon=-5 → verbleibendP1 = 36',        actual: g4!.verbleibendP1, expected: 36, tolerance: 0 },
);

// === Cluster H: Custom-Beginn statt Default ===
//
// Geburt 2025-01-15, p1Beginn 2025-06-01, p1Mon 18:
//   p1E = 2025-06-01 + 18 Mon = 2026-12-01
//   anmeldungP1 = 2025-06-01 - 49d = 2025-04-13
//     (01.06 - 1d = 31.05; -30d = 01.05; -18d = 13.04)
//   kSchutzBeginnP1 = 2025-06-01 - 56d = 2025-04-06

const h1 = calc({ geburt: '2025-01-15', p1Beginn: '2025-06-01', p1Monate: 18 });
cases.push(
  { name: 'H-01 Custom p1B: respektiert',             actual: isoDateLocal(h1!.p1B), expected: '2025-06-01' },
  { name: 'H-01 Custom p1E = p1B + 18 Mon',           actual: isoDateLocal(h1!.p1E), expected: '2026-12-01' },
  { name: 'H-01 Custom anmeldungP1 = p1B - 49d',      actual: isoDateLocal(h1!.anmeldungP1), expected: '2025-04-13' },
  { name: 'H-01 Custom kSchutzBeginnP1 = p1B - 56d',  actual: isoDateLocal(h1!.kSchutzBeginnP1), expected: '2025-04-06' },
);

// === Cluster I: Edge — Null-Returns ===

cases.push(
  { name: 'I-01 leerer geburt → null',                actual: isNull(berechneElternzeit({ geburt: '' })),                                  expected: 1, tolerance: 0 },
  { name: 'I-02 ungültiger geburt → null',            actual: isNull(berechneElternzeit({ geburt: 'kein-datum' })),                       expected: 1, tolerance: 0 },
  { name: 'I-03 ungültiger p1Beginn → null',          actual: isNull(berechneElternzeit({ geburt: '2025-01-15', p1Beginn: 'foo' })),      expected: 1, tolerance: 0 },
  { name: 'I-04 ungültiger p2Beginn → null',          actual: isNull(berechneElternzeit({ geburt: '2025-01-15', p2Beginn: 'foo' })),      expected: 1, tolerance: 0 },
  { name: 'I-05 minimal valid input → nicht null',    actual: isNull(berechneElternzeit({ geburt: '2025-01-15' })),                       expected: 0, tolerance: 0 },
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
    const tol = c.tolerance ?? 0.005;
    ok = Math.abs(c.actual - c.expected) <= tol;
  } else {
    ok = c.actual === c.expected;
  }
  const status = ok ? '✓' : '✗';
  const actualStr = c.actual === null ? 'null' : String(c.actual);
  const expectedStr = c.expected === null ? 'null' : String(c.expected);
  console.log(
    `  ${status} ${c.name.padEnd(60)} ist ${actualStr.padStart(14)}  soll ${expectedStr.padStart(14)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
