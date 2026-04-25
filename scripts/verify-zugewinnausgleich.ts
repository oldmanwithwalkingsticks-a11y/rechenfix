// Verifikation Zugewinnausgleich § 1376 BGB Indexierung (Prompt 149b P1-A6).
// Ausführen: npx tsx scripts/verify-zugewinnausgleich.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   - § 1376 BGB (Indexierung Anfangsvermögen mit VPI)
//   - BFH BFHE 217, 248 / BGH FamRZ 2002, 606 (ständige Rechtsprechung
//     zur Indexierung im Zugewinnausgleich)
//   - Destatis Lange Reihe Verbraucherpreisindex (Tabelle 61111-0001),
//     Basisjahr 2020 = 100, retrospektiv normiert
//   - vpi.ts SSOT (147 Welle 2 Stufe 3 Wohnen) — Werte verifiziert gegen
//     Destatis-Pressemitteilungen
//
// Strategie: Lib-Tests (getVpi/indexiereVermoegen), drei Ehe-Längen
// (kurz/mittel/lang), Vollberechnungs-Tests gegen § 1376 BGB-Logik.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  getVpi,
  indexiereVermoegen,
  VPI_JAHRESDURCHSCHNITTE,
  VPI_AKTUELL,
} from '../lib/berechnungen/vpi';

const componentTs = readFileSync(
  join(process.cwd(), 'components/rechner/ZugewinnausgleichRechner.tsx'),
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

// === GRUPPE 1: vpi.ts Lib-Erweiterungen ===

cases.push({
  name: 'vpi.ts: VPI 1995 ≈ 75,1 (Destatis Lange Reihe)',
  actual: VPI_JAHRESDURCHSCHNITTE[1995],
  expected: 75.1,
  quelle: 'Destatis 61111-0001',
});
cases.push({
  name: 'vpi.ts: VPI 2000 ≈ 76,7 (Audit-Bericht-Wert)',
  actual: VPI_JAHRESDURCHSCHNITTE[2000],
  expected: 76.7,
  quelle: 'Destatis Lange Reihe',
});
cases.push({
  name: 'vpi.ts: VPI 2010 ≈ 89,5',
  actual: VPI_JAHRESDURCHSCHNITTE[2010],
  expected: 89.5,
  quelle: 'Destatis Lange Reihe',
});
cases.push({
  name: 'vpi.ts: VPI 2020 = 100,0 (Basisjahr)',
  actual: VPI_JAHRESDURCHSCHNITTE[2020],
  expected: 100.0,
  quelle: 'Basisjahr-Definition',
});
cases.push({
  name: 'vpi.ts: VPI 2025 = 124,6',
  actual: VPI_JAHRESDURCHSCHNITTE[2025],
  expected: 124.6,
  quelle: 'Destatis Jahres-VPI',
});

// getVpi-Helper
cases.push({
  name: 'getVpi(2010) = 89,5 (Lookup)',
  actual: getVpi(2010),
  expected: 89.5,
  quelle: 'Lookup-API',
});
cases.push({
  name: 'getVpi(2026) = VPI_AKTUELL.wert (Fallback laufendes Jahr)',
  actual: getVpi(2026),
  expected: VPI_AKTUELL.wert,
  quelle: 'Fallback laufendes Jahr',
});

// === GRUPPE 2: indexiereVermoegen Helper ===

cases.push({
  name: 'indexiereVermoegen(50000, 2010, 2010) = 50000 (gleicher Stichtag)',
  actual: indexiereVermoegen(50000, 2010, 2010),
  expected: 50000,
  quelle: 'Identitäts-Test',
});

// 50000 × 125,8 / 76,7 = 81.998 (Audit nannte ~79.609 mit VPI 2026 = 122,1;
// wir nutzen 125,8 = März-2026-Stand, also leicht höher)
cases.push({
  name: 'indexiereVermoegen(50000, 2000, 2026) ≈ 82.000 € (lange Ehe)',
  actual: indexiereVermoegen(50000, 2000, 2026),
  expected: 82000,
  tol: 100,
  quelle: '50.000 × 125,8 / 76,7 = 81.997',
});

// 15000 × 125,8 / 89,5 = 21.083
cases.push({
  name: 'indexiereVermoegen(15000, 2010, 2026) ≈ 21.083 € (mittlere Ehe)',
  actual: indexiereVermoegen(15000, 2010, 2026),
  expected: 21083,
  tol: 5,
  quelle: '15.000 × 125,8 / 89,5',
});

// Heirat 2024 (kurze Ehe), VPI 121.9 → 125.8 → Indexfaktor 1.032 → +3.2 %
cases.push({
  name: 'indexiereVermoegen(50000, 2024, 2026) ≈ 51.600 € (<5 % Effekt)',
  actual: Math.round(indexiereVermoegen(50000, 2024, 2026)),
  expected: 51600,
  tol: 50,
  quelle: '50.000 × 125,8 / 121,9',
});
cases.push({
  name: 'Kurze Ehe: Indexierungseffekt < 5 % toleriert',
  actual: Math.abs(indexiereVermoegen(50000, 2024, 2026) - 50000) / 50000 < 0.05,
  expected: true,
  quelle: '<5 % Inflationskorrektur',
});

// === GRUPPE 3: Vollberechnung § 1376 BGB Zugewinnausgleich ===

function berechneZugewinnAusgleich(
  aP1: number, eP1: number, prP1: number,
  aP2: number, eP2: number, prP2: number,
  heirat: number, ende: number,
  prJahrP1 = heirat, prJahrP2 = heirat,
): { zugewinnP1: number; zugewinnP2: number; ausgleich: number; pflichtiger: 'P1' | 'P2' | null } {
  const aP1Idx = indexiereVermoegen(aP1, heirat, ende);
  const aP2Idx = indexiereVermoegen(aP2, heirat, ende);
  const prP1Idx = indexiereVermoegen(prP1, prJahrP1, ende);
  const prP2Idx = indexiereVermoegen(prP2, prJahrP2, ende);
  const zugewinnP1 = Math.max(0, eP1 - (aP1Idx + prP1Idx));
  const zugewinnP2 = Math.max(0, eP2 - (aP2Idx + prP2Idx));
  const differenz = Math.abs(zugewinnP1 - zugewinnP2);
  const ausgleichRoh = differenz / 2;
  const pflichtiger = zugewinnP1 > zugewinnP2 ? 'P1' : zugewinnP2 > zugewinnP1 ? 'P2' : null;
  let ausgleich = ausgleichRoh;
  if (pflichtiger === 'P1') ausgleich = Math.min(ausgleichRoh, Math.max(0, eP1 - (aP1Idx + prP1Idx)));
  if (pflichtiger === 'P2') ausgleich = Math.min(ausgleichRoh, Math.max(0, eP2 - (aP2Idx + prP2Idx)));
  return { zugewinnP1, zugewinnP2, ausgleich, pflichtiger };
}

// Mittlere Ehe (Heirat 2010, Scheidung 2026, VPI-Faktor ~1,405):
//   P1: AV 15.000 → 21.083, EV 80.000 → Zugewinn 58.917
//   P2: AV 5.000 → 7.028, EV 120.000 → Zugewinn 112.972
//   Differenz 54.055 → Ausgleich 27.027 (P2 → P1)
const t10 = berechneZugewinnAusgleich(15000, 80000, 0, 5000, 120000, 0, 2010, 2026);
cases.push({
  name: 'T10 Ehe 2010-26: Zugewinn P1 ≈ 58.917 €',
  actual: Math.round(t10.zugewinnP1),
  expected: 58917,
  tol: 5,
  quelle: '80.000 - 15.000 × 1,405',
});
cases.push({
  name: 'T10 Ehe 2010-26: Zugewinn P2 ≈ 112.972 €',
  actual: Math.round(t10.zugewinnP2),
  expected: 112972,
  tol: 5,
  quelle: '120.000 - 5.000 × 1,405',
});
cases.push({
  name: 'T10 Ehe 2010-26: Ausgleich ≈ 27.027 €',
  actual: Math.round(t10.ausgleich),
  expected: 27027,
  tol: 5,
  quelle: '(112.972 - 58.917) / 2',
});
cases.push({
  name: 'T10 Ehe 2010-26: P2 zahlt an P1',
  actual: t10.pflichtiger ?? '',
  expected: 'P2',
  quelle: 'Differenz-Logik',
});

// Lange Ehe (Heirat 2000, Scheidung 2026, VPI-Faktor ~1,640):
//   P1: AV 50.000 → 81.997, EV 200.000 → Zugewinn 118.003
//   P2: AV 0, EV 100.000 → Zugewinn 100.000
//   Differenz 18.003 → Ausgleich 9.001 (P1 → P2)
const t25 = berechneZugewinnAusgleich(50000, 200000, 0, 0, 100000, 0, 2000, 2026);
cases.push({
  name: 'T25 Ehe 2000-26: Zugewinn P1 ≈ 118.003 €',
  actual: Math.round(t25.zugewinnP1),
  expected: 118003,
  tol: 100,
  quelle: '200.000 - 50.000 × 1,64',
});
cases.push({
  name: 'T25 Ehe 2000-26: Differenz unter Indexierung deutlich kleiner als ohne',
  actual: t25.zugewinnP1 < 150000,
  expected: true,
  quelle: 'Ohne Indexierung wäre Zugewinn 150.000',
});

// Kurze Ehe (Heirat 2024, Scheidung 2026, VPI-Faktor ~1,032):
//   P1: AV 50.000 → 51.600, EV 100.000 → Zugewinn 48.400
//   P2: AV 50.000 → 51.600, EV 70.000 → Zugewinn 18.400
//   Differenz 30.000 → Ausgleich 15.000 (P1 → P2)
const t1 = berechneZugewinnAusgleich(50000, 100000, 0, 50000, 70000, 0, 2024, 2026);
cases.push({
  name: 'T1 Kurze Ehe 2024-26: Zugewinn P1 ≈ 48.400 €',
  actual: Math.round(t1.zugewinnP1),
  expected: 48400,
  tol: 30,
  quelle: '100.000 - 50.000 × 1,032',
});
cases.push({
  name: 'T1 Kurze Ehe 2024-26: Ausgleich ≈ 15.000 €',
  actual: Math.round(t1.ausgleich),
  expected: 15000,
  tol: 5,
  quelle: '(48.400 - 18.400) / 2',
});

// === GRUPPE 4: Konfig-Drift-Tests ===

cases.push({
  name: 'arbeit.ts: formel nennt § 1376 BGB Indexierung',
  actual: arbeitTs.includes('§ 1376 BGB'),
  expected: true,
  quelle: '149b — neue Rechtsquelle',
});
cases.push({
  name: 'arbeit.ts: formel nennt VPI in Indexierungs-Formel',
  actual: arbeitTs.includes('VPI(Endstichtag) / VPI(Heirat)'),
  expected: true,
  quelle: '149b — neue Formel',
});
cases.push({
  name: 'arbeit.ts: Erklärtext zitiert BFH BFHE 217, 248',
  actual: arbeitTs.includes('BFH BFHE 217, 248'),
  expected: true,
  quelle: '149b — Quellen-Anker',
});
cases.push({
  name: 'arbeit.ts: alte FAQ ohne Indexierungsbezug raus',
  actual: arbeitTs.includes('Aus den beiden Zugewinnen beider Partner wird die Differenz gebildet, halbiert und dem Partner mit dem niedrigeren Zugewinn als Ausgleichsanspruch zugesprochen. Beispiel: P1 hat 65.000 € Zugewinn'),
  expected: false,
  quelle: '149b — alter Beispielwert ohne Indexierung raus',
});

// === GRUPPE 5: Component-Drift-Tests ===

cases.push({
  name: 'Component: importiert indexiereVermoegen aus vpi.ts',
  actual: componentTs.includes('indexiereVermoegen'),
  expected: true,
  quelle: '149b — SSOT-Konsumption',
});
cases.push({
  name: 'Component: heiratsjahr-State eingeführt',
  actual: componentTs.includes('heiratsjahr'),
  expected: true,
  quelle: '149b — Stichtag-Input',
});
cases.push({
  name: 'Component: endstichtagJahr-State eingeführt',
  actual: componentTs.includes('endstichtagJahr'),
  expected: true,
  quelle: '149b — Stichtag-Input',
});
cases.push({
  name: 'Component: privilegJahr für P1 + P2 eingeführt',
  actual: componentTs.includes('privilegJahrP1') && componentTs.includes('privilegJahrP2'),
  expected: true,
  quelle: '149b — Erwerbsdatum-Input',
});

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
  const actualStr = String(c.actual).padStart(12);
  const expectedStr = String(c.expected).padStart(12);
  console.log(`${mark} ${c.name.padEnd(72)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
