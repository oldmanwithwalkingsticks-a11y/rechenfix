/**
 * Verify-Script für lib/berechnungen/mutterschutz.ts (Welle-4 M2b, 03.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - MuSchG § 3 (Schutzfristen vor und nach der Entbindung):
 *     https://www.gesetze-im-internet.de/muschg_2018/__3.html
 *     - Abs. 1: 6 Wochen vor (42 Tage)
 *     - Abs. 2: 8 Wochen nach Standard / 12 Wochen bei Frühgeburt, Mehrlings-
 *       geburt oder Behinderungs-Diagnose innerhalb der ersten 8 Wo
 *     - Abs. 2 Satz 4: bei Frühgeburt verlängern sich die ungenutzten
 *       Vortage hinten zusätzlich
 *   - SGB V § 24i (Mutterschaftsgeld):
 *     https://www.gesetze-im-internet.de/sgb_5/__24i.html
 *     - Abs. 2: max. 13 €/Tag (Höchstbetrag der GKV)
 *     - Abs. 3: 210 € Einmalzahlung BAS bei privater/familienvers. Versicherung
 *
 * L-35-Disziplin: Lib-Realität, nicht Konfig-Erklärtext.
 * Lib modelliert: Schutzfristen-Datum (vor/nach Geburt) + Verlängerung
 * bei Frühgeburt (nicht-genommene Vortage) + Mutterschaftsgeld
 * (gesetzlich/privat/minijob×{eigen,familie}/selbstständig) + antragTermin.
 * Lib modelliert NICHT: Fehlgeburt-Schutzfristen ab 13./17./20. SSW
 * (CLAUDE.md-Rechtsstands-Eintrag mit Verweis „inline (`MutterschutzRechner`)"
 * — Lib hat dazu keine Behandlung). Behinderung-Verlängerung wird wie
 * Frühgeburt/Mehrlinge auf 12 Wochen behandelt (kein +4-Wo-Sondermodell).
 *
 * Datum-Vergleich: `isoDateLocal` aus welle4-overrides (Welle-4-Standard
 * nach M2a kuendigungsfrist-Hotfix, UTC-Shift-Falle vermieden).
 *
 * Ausführen: npx tsx scripts/verify-mutterschutz.ts
 */

import { berechneMutterschutz } from '../lib/berechnungen/mutterschutz';
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
  geburtstermin: string;
  geburtsArt?: 'normal' | 'fruehgeburt' | 'mehrlingsgeburt' | 'behinderung';
  tatsaechlich?: string;
  netto?: number;
  beschaeftigung?: 'gesetzlich' | 'privat' | 'minijob' | 'selbststaendig';
  minijobVersicherung?: 'eigen' | 'familie';
}) => berechneMutterschutz({
  geburtstermin: params.geburtstermin,
  geburtsArt: params.geburtsArt ?? 'normal',
  tatsaechlichesGeburtsdatum: params.tatsaechlich ?? '',
  nettoGehalt: params.netto ?? 2400,
  beschaeftigung: params.beschaeftigung ?? 'gesetzlich',
  minijobVersicherung: params.minijobVersicherung,
});

// === Cluster A: § 3 Abs. 1 MuSchG — Schutzfrist 6 Wochen vor Entbindung ===
//
// Manuell:
//   ET = 2025-09-01: beginn = 2025-09-01 - 42 Tage = 2025-07-21.
//   ET = 2026-02-15: beginn = 2026-02-15 - 42 Tage = 2026-01-04.

const a1 = calc({ geburtstermin: '2025-09-01' });
cases.push(
  { name: 'A-01 ET 01.09.2025: beginn = 21.07.',                actual: isoDateLocal(a1!.beginn), expected: '2025-07-21' },
  { name: 'A-01: tageVorGeburt = 42',                           actual: a1!.tageVorGeburt,        expected: 42 },
);

const a2 = calc({ geburtstermin: '2026-02-15' });
cases.push(
  { name: 'A-02 ET 15.02.2026: beginn = 04.01.',                actual: isoDateLocal(a2!.beginn), expected: '2026-01-04' },
);

// === Cluster B: § 3 Abs. 2 MuSchG — Schutzfrist nach Entbindung ===
//
// Standard 8 Wochen (56 Tage):
//   ET 2025-09-01: ende = 2025-09-01 + 56 Tage = 2025-10-27.
//   gesamtTage = 42 + 56 = 98. gesamtWochen = 14.0.
const b1 = calc({ geburtstermin: '2025-09-01' });
cases.push(
  { name: 'B-01 ET 01.09.: ende = 27.10. (8 Wo nach)',          actual: isoDateLocal(b1!.ende), expected: '2025-10-27' },
  { name: 'B-01: tageNachGeburt = 56',                          actual: b1!.tageNachGeburt,     expected: 56 },
  { name: 'B-01: gesamtTage = 98',                              actual: b1!.gesamtTage,         expected: 98 },
  { name: 'B-01: gesamtWochen = 14',                            actual: b1!.gesamtWochen,       expected: 14, tolerance: 0.05 },
);

// Frühgeburt → 12 Wochen nach (84 Tage):
//   ET 2025-09-01, Geburt 2025-09-01: nicht-genommene Vortage = 0,
//   ende = 2025-09-01 + 84 Tage = 2025-11-24.
const b2 = calc({ geburtstermin: '2025-09-01', tatsaechlich: '2025-09-01', geburtsArt: 'fruehgeburt' });
cases.push(
  { name: 'B-02 Frühgeburt am ET: tageNachGeburt = 84',         actual: b2!.tageNachGeburt, expected: 84 },
  { name: 'B-02 Frühgeburt am ET: ende = 24.11.',               actual: isoDateLocal(b2!.ende), expected: '2025-11-24' },
);

// Mehrlinge: gleiche 12-Wo-Logik wie Frühgeburt:
const b3 = calc({ geburtstermin: '2025-09-01', geburtsArt: 'mehrlingsgeburt' });
cases.push(
  { name: 'B-03 Mehrlinge ohne tatsächliche Geburt: gesamtTage = 42+84',  actual: b3!.gesamtTage, expected: 126 },
);

// === Cluster C: § 3 Abs. 2 Satz 4 MuSchG — Frühgeburt-Vortage werden hinten angehängt ===
//
// ET 2025-09-01, tatsächliche Geburt 2025-08-15 (17 Tage zu früh), Frühgeburt:
//   beginn = 2025-09-01 - 42 = 2025-07-21 (geplant)
//   nicht-genommene Vortage = 2025-09-01 - 2025-08-15 = 17
//   verlaengerungTage = 17
//   ende = 2025-08-15 + (84 + 17) = 2025-08-15 + 101 Tage = 2025-11-24

const c1 = calc({ geburtstermin: '2025-09-01', tatsaechlich: '2025-08-15', geburtsArt: 'fruehgeburt' });
cases.push(
  { name: 'C-01 Frühgeburt 17 d früher: verlaengerungTage = 17',actual: c1!.verlaengerungTage,  expected: 17 },
  { name: 'C-01 ende = 2025-11-24',                             actual: isoDateLocal(c1!.ende), expected: '2025-11-24' },
);

// === Cluster D: Späte Geburt (nach ET) ===
//
// ET 2025-09-01, tatsächliche Geburt 2025-09-08 (7 Tage später), normal:
//   beginn = 2025-07-21 (geplant)
//   ende = 2025-09-08 + 56 = 2025-11-03
//   tageNachGeburt = 56 (normal nach Geburt)
//   verlaengerungTage = 7 (Verlängerung um Tage zwischen ET und tats. Geburt)
//   tageVorGeburt = 49 (von 21.07. bis 08.09.)

const d1 = calc({ geburtstermin: '2025-09-01', tatsaechlich: '2025-09-08' });
cases.push(
  { name: 'D-01 Späte Geburt +7d: ende = 03.11.',               actual: isoDateLocal(d1!.ende), expected: '2025-11-03' },
  { name: 'D-01: verlaengerungTage = 7',                        actual: d1!.verlaengerungTage,  expected: 7 },
  { name: 'D-01: tageVorGeburt = 49',                           actual: d1!.tageVorGeburt,      expected: 49 },
  { name: 'D-01: tageNachGeburt = 56',                          actual: d1!.tageNachGeburt,     expected: 56 },
);

// === Cluster E: Mutterschaftsgeld § 24i SGB V ===
//
// Gesetzlich versichert, Netto 2.400 €/Mon → 80 €/Tag.
//   kasseSatzTag = min(13, 80) = 13.
//   agZuschussTag = round((80 - 13) × 100) / 100 = 67.
//   kasseMonat = 13 × 30 = 390.
//   agZuschussMonat = 67 × 30 = 2010.

const e1 = calc({ geburtstermin: '2025-09-01', netto: 2400, beschaeftigung: 'gesetzlich' });
cases.push(
  { name: 'E-01 Gesetzlich Netto 2400: kasseSatzTag = 13',      actual: e1!.kasseSatzTag,      expected: 13 },
  { name: 'E-01: agZuschussTag = 67',                           actual: e1!.agZuschussTag,     expected: 67 },
  { name: 'E-01: kasseMonat = 390',                             actual: e1!.kasseMonat,        expected: 390 },
  { name: 'E-01: agZuschussMonat = 2010',                       actual: e1!.agZuschussMonat,   expected: 2010 },
);

// Niedriges Netto: Netto 360 €/Mon → 12 €/Tag → kasseSatzTag = 12, AG-Zuschuss = 0.
const e2 = calc({ geburtstermin: '2025-09-01', netto: 360, beschaeftigung: 'gesetzlich' });
cases.push(
  { name: 'E-02 Gesetzlich Netto 360: kasseSatzTag = 12 (Cap nicht erreicht)', actual: e2!.kasseSatzTag, expected: 12 },
  { name: 'E-02: agZuschussTag = 0 (max(0, ...))',              actual: e2!.agZuschussTag,     expected: 0 },
);

// Privat versichert, Netto 2.400: einmalzahlungPrivat = 210 €.
const e3 = calc({ geburtstermin: '2025-09-01', netto: 2400, beschaeftigung: 'privat' });
cases.push(
  { name: 'E-03 Privat: einmalzahlungPrivat = 210',             actual: e3!.einmalzahlungPrivat, expected: 210 },
);

// Minijob/eigen: kasseSatzTag = 13, kein AG-Zuschuss.
const e4 = calc({ geburtstermin: '2025-09-01', netto: 500, beschaeftigung: 'minijob', minijobVersicherung: 'eigen' });
cases.push(
  { name: 'E-04 Minijob/eigen: kasseSatzTag = 13',              actual: e4!.kasseSatzTag, expected: 13 },
  { name: 'E-04: agZuschussTag = 0',                            actual: e4!.agZuschussTag, expected: 0 },
  { name: 'E-04: einmalzahlungPrivat = 0',                      actual: e4!.einmalzahlungPrivat, expected: 0 },
);

// Minijob/familie (Default): einmalzahlungPrivat = 210, alles andere 0.
const e5 = calc({ geburtstermin: '2025-09-01', netto: 500, beschaeftigung: 'minijob', minijobVersicherung: 'familie' });
cases.push(
  { name: 'E-05 Minijob/familie: einmalzahlungPrivat = 210',    actual: e5!.einmalzahlungPrivat, expected: 210 },
  { name: 'E-05: kasseSatzTag = 0',                             actual: e5!.kasseSatzTag,        expected: 0 },
);

// Selbstständig: alle Geld-Felder 0.
const e6 = calc({ geburtstermin: '2025-09-01', netto: 4000, beschaeftigung: 'selbststaendig' });
cases.push(
  { name: 'E-06 Selbstständig: kasseSatzTag = 0',               actual: e6!.kasseSatzTag, expected: 0 },
  { name: 'E-06: agZuschussTag = 0',                            actual: e6!.agZuschussTag, expected: 0 },
  { name: 'E-06: einmalzahlungPrivat = 0',                      actual: e6!.einmalzahlungPrivat, expected: 0 },
);

// === Cluster F: antragTermin (ET − 49 Tage) ===
//
// ET 2025-09-01: antragTermin = 2025-09-01 - 49 = 2025-07-14.
const f1 = calc({ geburtstermin: '2025-09-01' });
cases.push(
  { name: 'F-01 antragTermin = ET - 49 Tage = 14.07.',          actual: isoDateLocal(f1!.antragTermin), expected: '2025-07-14' },
);

// === Cluster G: Edge — Null-Returns ===

cases.push(
  { name: 'G-01 leerer geburtstermin → null',                   actual: isNull(calc({ geburtstermin: '' })), expected: 1 },
  { name: 'G-02 ungültiger geburtstermin → null',               actual: isNull(calc({ geburtstermin: 'kein-datum' })), expected: 1 },
  { name: 'G-03 ungültiger tatsaechlich → null',                actual: isNull(calc({ geburtstermin: '2025-09-01', tatsaechlich: 'foo' })), expected: 1 },
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
    `  ${status} ${c.name.padEnd(58)} ist ${actualStr.padStart(14)}  soll ${expectedStr.padStart(14)}`,
  );
  if (ok) passed++;
  else failed++;
}

console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
