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

// W180: Sollwerte aus der Destatis-Reihe (Tabelle 61111-0001; 2021–2025 Basisdaten vpi141a, Stand
// 13.10.2026). Vorher standen hier die falschen Werte der SSOT (75,1 / 76,7 / 89,5 / 124,6).
const DESTATIS: Record<number, number> = {
  1995: 71.0, 2000: 75.5, 2010: 88.1, 2015: 94.5, 2018: 98.1, 2019: 99.5, 2020: 100.0,
  2021: 103.1, 2022: 110.2, 2023: 116.7, 2024: 119.3, 2025: 121.9,
};
for (const [jahr, wert] of Object.entries(DESTATIS)) {
  cases.push({
    name: `vpi.ts: VPI ${jahr} = ${wert.toLocaleString('de-DE', { minimumFractionDigits: 1 })} (Destatis)`,
    actual: VPI_JAHRESDURCHSCHNITTE[Number(jahr)],
    expected: wert,
    quelle: 'Destatis 61111-0001',
  });
}
// Plausibilität: Die Reihe steigt seit 1995 in jedem Jahr (auch 2019 → 2020: 99,5 → 100,0)
const jahre = Object.keys(VPI_JAHRESDURCHSCHNITTE).map(Number).sort((a, b) => a - b);
cases.push({
  name: 'vpi.ts: Jahresdurchschnitte lückenlos 1995–2025 und streng steigend',
  actual: jahre.length === 31 && jahre.every((j, i) => i === 0 || (j === jahre[i - 1] + 1 && VPI_JAHRESDURCHSCHNITTE[j] > VPI_JAHRESDURCHSCHNITTE[jahre[i - 1]])),
  expected: true,
  quelle: 'Destatis-Reihe 1995–2025 ohne Rückgang',
});

// getVpi-Helper
cases.push({
  name: 'getVpi(2010) = 88,1 (Lookup)',
  actual: getVpi(2010),
  expected: 88.1,
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

// W180: Sollwerte aus VPI_AKTUELL statt fest aus einem Monatsstand (vorher 125,8, als „März 2026“
// bezeichnet, tatsächlich August 2026; seit dem Mai-Update rot). Fest bleiben die Jahresdurchschnitte 2000/2010/2024 aus der Langen Reihe.
const ENDE = Number(VPI_AKTUELL.monat.slice(0, 4));
const V = VPI_AKTUELL.wert;
const f = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 3 });

cases.push({
  name: `indexiereVermoegen(50000, 2000, ${ENDE}) = 50.000 × ${f(V)} / 75,5 (lange Ehe)`,
  actual: indexiereVermoegen(50000, 2000, ENDE),
  expected: 50000 * V / 75.5,
  tol: 0.01,
  quelle: '§ 1376 BGB, VPI 2000 = 75,5',
});
cases.push({
  name: `indexiereVermoegen(15000, 2010, ${ENDE}) = 15.000 × ${f(V)} / 88,1 (mittlere Ehe)`,
  actual: indexiereVermoegen(15000, 2010, ENDE),
  expected: 15000 * V / 88.1,
  tol: 0.01,
  quelle: '§ 1376 BGB, VPI 2010 = 88,1',
});
cases.push({
  name: `indexiereVermoegen(50000, 2024, ${ENDE}) = 50.000 × ${f(V)} / 119,3 (kurze Ehe)`,
  actual: indexiereVermoegen(50000, 2024, ENDE),
  expected: 50000 * V / 119.3,
  tol: 0.01,
  quelle: '§ 1376 BGB, VPI 2024 = 119,3',
});
cases.push({
  name: 'Sehr kurze Ehe (Heirat 2025): Indexierungseffekt < 5 %',
  actual: Math.abs(indexiereVermoegen(50000, 2025, ENDE) - 50000) / 50000 < 0.05,
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

// Mittlere Ehe (Heirat 2010, Endstichtag = Jahr von VPI_AKTUELL), Faktor V / 88,1
const F10 = V / 88.1;
const t10 = berechneZugewinnAusgleich(15000, 80000, 0, 5000, 120000, 0, 2010, ENDE);
cases.push({
  name: `T10 Ehe 2010-${ENDE}: Zugewinn P1 = 80.000 − 15.000 × Faktor`,
  actual: t10.zugewinnP1,
  expected: 80000 - 15000 * F10,
  tol: 0.01,
  quelle: `Faktor ${f(F10)}`,
});
cases.push({
  name: `T10 Ehe 2010-${ENDE}: Zugewinn P2 = 120.000 − 5.000 × Faktor`,
  actual: t10.zugewinnP2,
  expected: 120000 - 5000 * F10,
  tol: 0.01,
  quelle: `Faktor ${f(F10)}`,
});
cases.push({
  name: `T10 Ehe 2010-${ENDE}: Ausgleich = Differenz ÷ 2`,
  actual: t10.ausgleich,
  expected: ((120000 - 5000 * F10) - (80000 - 15000 * F10)) / 2,
  tol: 0.01,
  quelle: '§ 1378 Abs. 1 BGB',
});
cases.push({
  name: `T10 Ehe 2010-${ENDE}: P2 zahlt an P1`,
  actual: t10.pflichtiger ?? '',
  expected: 'P2',
  quelle: 'Differenz-Logik',
});

// Lange Ehe (Heirat 2000): P1 AV 50.000, EV 200.000; P2 AV 0, EV 100.000
const t25 = berechneZugewinnAusgleich(50000, 200000, 0, 0, 100000, 0, 2000, ENDE);
cases.push({
  name: `T25 Ehe 2000-${ENDE}: Zugewinn P1 = 200.000 − 50.000 × Faktor`,
  actual: t25.zugewinnP1,
  expected: 200000 - 50000 * V / 75.5,
  tol: 0.01,
  quelle: `Faktor ${f(V / 75.5)}`,
});
cases.push({
  name: `T25 Ehe 2000-${ENDE}: Differenz unter Indexierung deutlich kleiner als ohne`,
  actual: t25.zugewinnP1 < 150000,
  expected: true,
  quelle: 'Ohne Indexierung wäre Zugewinn 150.000',
});

// Kurze Ehe (Heirat 2024): beide AV 50.000, EV 100.000 bzw. 70.000 → Ausgleich genau 15.000
const t1 = berechneZugewinnAusgleich(50000, 100000, 0, 50000, 70000, 0, 2024, ENDE);
cases.push({
  name: `T1 Kurze Ehe 2024-${ENDE}: Zugewinn P1 = 100.000 − 50.000 × Faktor`,
  actual: t1.zugewinnP1,
  expected: 100000 - 50000 * V / 119.3,
  tol: 0.01,
  quelle: `Faktor ${f(V / 119.3)}`,
});
cases.push({
  name: `T1 Kurze Ehe 2024-${ENDE}: Ausgleich = 15.000 €`,
  actual: Math.round(t1.ausgleich),
  expected: 15000,
  tol: 0,
  quelle: 'gleiches AV → Differenz der EV ÷ 2',
});

// === GRUPPE 4: Konfig-Drift-Tests ===

cases.push({
  name: 'arbeit.ts: formel nennt § 1376 BGB Indexierung',
  actual: arbeitTs.includes('§ 1376 BGB'),
  expected: true,
  quelle: '149b — neue Rechtsquelle',
});
cases.push({
  name: 'arbeit.ts: FAQ nennt VPI in Indexierungs-Formel',
  actual: arbeitTs.includes('VPI(End) / VPI(Heirat)'),
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
