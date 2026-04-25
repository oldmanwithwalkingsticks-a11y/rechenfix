// Verifikation Welle 2 Stufe 3 Wohnen Block B (Prompt 148).
// Ausführen: npx tsx scripts/verify-wohnen-block-b.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   - K. Mertens, „Photovoltaik" (Hanser Verlag) + VDI 6002 für Performance
//     Ratio 0,85 — konsistent mit pv-ertragsmodell.ts (147c).
//   - Strompreis BDEW 04/2026 (37 ct/kWh) — konsistent mit strompreis.ts.
//   - Mathematik Walmdach: Grundfläche / cos(Neigung) ist exakt bei
//     gleichmäßiger Neigung (jeder m² Grundfläche projiziert sich um
//     denselben Faktor 1/cos auf die Dachfläche).
//
// Strategie: gemischte Tests — Negativ-Tests (alte Werte dürfen NICHT
// mehr in wohnen.ts existieren), Positiv-Tests (neue Werte müssen drin
// sein), Berechnungs-Konsistenz-Tests gegen pv-ertragsmodell-SSOT.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  berechneSpezifischenErtrag,
  berechnePvErtrag,
} from '../lib/berechnungen/pv-ertragsmodell';
import { berechneBalkonSolar } from '../lib/berechnungen/balkon-solar';

const wohnenTs = readFileSync(join(process.cwd(), 'lib/rechner-config/wohnen.ts'), 'utf8');
const dachflRechnerTs = readFileSync(join(process.cwd(), 'components/rechner/DachflaechenRechner.tsx'), 'utf8');
const poolRechnerTs = readFileSync(join(process.cwd(), 'components/rechner/PoolkostenRechner.tsx'), 'utf8');
const heizLibTs = readFileSync(join(process.cwd(), 'lib/berechnungen/heizkosten.ts'), 'utf8');
const balkonLibTs = readFileSync(join(process.cwd(), 'lib/berechnungen/balkon-solar.ts'), 'utf8');

// Block-B-Scope ist auf dachflaechen-rechner und poolkosten-rechner
// begrenzt. Andere Rechner (z. B. balkon-solar) bleiben unangetastet.
// Hilfsfunktion: extrahiert den Konfig-Block zwischen `slug: '<name>'`
// und dem nächsten `slug: ` für isolierte Substring-Tests.
function blockOf(slug: string): string {
  const start = wohnenTs.indexOf(`slug: '${slug}'`);
  if (start < 0) throw new Error(`Slug nicht gefunden: ${slug}`);
  const next = wohnenTs.indexOf(`slug: '`, start + slug.length + 10);
  return wohnenTs.slice(start, next < 0 ? undefined : next);
}
const dachflBlock = blockOf('dachflaechen-rechner');
const poolBlock = blockOf('poolkosten-rechner');

interface Fall {
  name: string;
  actual: number | string | boolean;
  expected: number | string | boolean;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// === GRUPPE 1: Negativ-Tests (P2.1+P3.5) — alte 950-Werte raus ===

cases.push({
  name: 'dachflaechen-Block: kein "950 kWh/kWp" mehr',
  actual: dachflBlock.includes('950 kWh/kWp'),
  expected: false,
  quelle: 'P2.1 — Migration auf 850',
});
cases.push({
  name: 'dachflaechen-Block: kein "950 kWh pro kWp" mehr',
  actual: dachflBlock.includes('950 kWh pro kWp'),
  expected: false,
  quelle: 'P2.1 — Migration auf 850 (FAQ)',
});
cases.push({
  name: 'dachflaechen-Block: kein "11.400 kWh" mehr (alter Beispielwert)',
  actual: dachflBlock.includes('11.400 kWh'),
  expected: false,
  quelle: 'P2.1+P3.5 — neuer Wert 10.200 kWh',
});

// === GRUPPE 2: Positiv-Tests (P2.1+P3.5) ===

cases.push({
  name: 'dachflaechen-Block: "850 kWh/kWp" im Erklärtext',
  actual: dachflBlock.includes('850 kWh/kWp'),
  expected: true,
  quelle: 'P2.1 — neue Mertens-Konsistenz',
});
cases.push({
  name: 'dachflaechen-Block: "10.200 kWh/Jahr" im Beispiel',
  actual: dachflBlock.includes('10.200 kWh/Jahr'),
  expected: true,
  quelle: 'P2.1 — 12 kWp × 850 = 10.200',
});
cases.push({
  name: 'dachflaechen-Block: "Performance Ratio 0,85" benannt',
  actual: dachflBlock.includes('Performance Ratio 0,85'),
  expected: true,
  quelle: 'P2.1 — VDI 6002 Quellenhinweis',
});
cases.push({
  name: 'dachflaechen-Block: "Eigenverbrauchsanteil" im Erklärtext',
  actual: dachflBlock.includes('Eigenverbrauchsanteil'),
  expected: true,
  quelle: 'P3.5 — EV-Hinweis bei PV-Beispielrechnung',
});
cases.push({
  name: 'dachflaechen-Block: Mertens-Quelle im Erklärtext',
  actual: dachflBlock.includes('Konrad Mertens'),
  expected: true,
  quelle: 'P2.1 — Quellenangabe',
});

// === GRUPPE 3: P3.4 — Walmdach „Näherung" raus ===

cases.push({
  name: 'dachflaechen-Block: kein "Näherung" mehr im Walmdach-Erklärtext',
  actual: dachflBlock.includes('Als schnelle **Näherung**'),
  expected: false,
  quelle: 'P3.4 — Formel ist mathematisch exakt',
});
cases.push({
  name: 'dachflaechen-Block: "mathematisch exakt" im Walmdach-Erklärtext',
  actual: dachflBlock.includes('mathematisch exakt'),
  expected: true,
  quelle: 'P3.4 — neue präzise Formulierung',
});
cases.push({
  name: 'DachflaechenRechner.tsx: kein "(Näherung)" in beschreibung',
  actual: dachflRechnerTs.includes("'Grundfläche / cos(Neigung) (Näherung)'"),
  expected: false,
  quelle: 'P3.4 — Component-Konsistenz',
});

// === GRUPPE 4: P3.1+P3.3 — poolkosten Beispiel-Werte ===

cases.push({
  name: 'poolkosten-Block: kein "Filterstrom ≈ 220 €" mehr',
  actual: poolBlock.includes('Filterstrom ≈ 220 €'),
  expected: false,
  quelle: 'P3.1 — alter 32-ct-Wert raus',
});
cases.push({
  name: 'poolkosten-Block: "Filterstrom ≈ 270 €" im Beispiel',
  actual: poolBlock.includes('Filterstrom ≈ 270 €'),
  expected: true,
  quelle: 'P3.1 — 0,6 kW × 8 h × 153 d × 37 ct = 271,80',
});
cases.push({
  name: 'poolkosten-Block: kein "Chemie ≈ 240 €" mehr',
  actual: poolBlock.includes('Chemie ≈ 240 €'),
  expected: false,
  quelle: 'P3.3 — alter Untergrenzwert raus',
});
cases.push({
  name: 'poolkosten-Block: "Chemie ≈ 325 €" im Beispiel',
  actual: poolBlock.includes('Chemie ≈ 325 €'),
  expected: true,
  quelle: 'P3.3 — Mittelwert 8 €/m³ × 40 m³',
});
cases.push({
  name: 'poolkosten-Block: "Gesamt ≈ 1.195 €/Jahr" im Beispiel',
  actual: poolBlock.includes('Gesamt ≈ 1.195 €/Jahr'),
  expected: true,
  quelle: 'P3.1 — 190+270+325+410=1.195',
});

// === GRUPPE 5: P3.2 — Pumpenlaufzeit-Konsistenz ===

cases.push({
  name: 'poolkosten-Block: "(typischerweise 8 h)" im Erklärtext',
  actual: poolBlock.includes('(typischerweise 8 h)'),
  expected: true,
  quelle: 'P3.2 — Mittelwert benannt',
});
cases.push({
  name: 'poolkosten-Block: "10-m³/h-Pumpe sind das ca. 8 Stunden" in FAQ',
  actual: poolBlock.includes('10-m³/h-Pumpe sind das ca. 8 Stunden'),
  expected: true,
  quelle: 'P3.2 — 10er-Pumpe → 8 h, 8er-Pumpe → 10 h',
});

// === GRUPPE 6: Component-SSOT-Konsistenz (P2.1) ===

cases.push({
  name: 'DachflaechenRechner.tsx: kein hartcodiertes "* 950" mehr',
  actual: dachflRechnerTs.includes('* 950'),
  expected: false,
  quelle: 'P2.1 — Migration auf SSOT',
});
cases.push({
  name: 'DachflaechenRechner.tsx: importiert pv-ertragsmodell',
  actual: dachflRechnerTs.includes("from '@/lib/berechnungen/pv-ertragsmodell'"),
  expected: true,
  quelle: 'P2.1 — SSOT-Konsumption',
});
cases.push({
  name: 'DachflaechenRechner.tsx: nutzt berechneSpezifischenErtrag()',
  actual: dachflRechnerTs.includes('berechneSpezifischenErtrag('),
  expected: true,
  quelle: 'P2.1 — SSOT-API',
});

// === GRUPPE 7: Berechnungs-Konsistenz gegen pv-ertragsmodell ===

const spezSued = berechneSpezifischenErtrag('sued', 'optimal');
cases.push({
  name: 'pv-ertragsmodell: Süd/Optimal → 850 kWh/kWp (SSOT-Wert)',
  actual: spezSued,
  expected: 850,
  quelle: '147c-SSOT, Konsistenz mit dachflaechen-Erklärtext',
});

// Dachflächen-Beispielrechnung: 98 m² Süddach × 0,7 nutzbar / 5,5 m²/kWp
//   = 12,47 kWp → 12 (Konfig spricht von "ca. 12")
//   12,47 × 850 = 10.600 kWh (im Beispiel auf 10.200 gerundet, weil
//   12 kWp × 850 = 10.200; die 0,47 kWp-Differenz wird im Erklärtext
//   weggekürzt — pragmatisch).
const kwpExakt = (98 * 0.7) / 5.5;
const ertragExakt = berechnePvErtrag({ kwp: kwpExakt, ausrichtung: 'sued', neigung: 'optimal' });
cases.push({
  name: 'Beispielrechnung 98 m² Süddach exakt → ~10.600 kWh',
  actual: ertragExakt,
  expected: 10600,
  tol: 50,
  quelle: '12,47 kWp × 850 = 10.598',
});
// Pragmatisch im Erklärtext: 12 kWp × 850 = 10.200
cases.push({
  name: 'Erklärtext-Beispiel "ca. 12 kWp" × 850 → 10.200 kWh',
  actual: berechnePvErtrag({ kwp: 12, ausrichtung: 'sued', neigung: 'optimal' }),
  expected: 10200,
  quelle: 'Glatter Wert für Erklärtext',
});

// === GRUPPE 8: poolkosten-Filterstrom-Berechnung verifizieren ===

// 0,6 kW × 8 h × 153 d × 37 ct/kWh = 271,80 €
const filterstromBerechnet = 0.6 * 8 * 153 * 0.37;
cases.push({
  name: 'poolkosten-Filterstrom: 0,6 kW × 8 h × 153 d × 37 ct ≈ 270 €',
  actual: Math.round(filterstromBerechnet),
  expected: 272,
  tol: 3,
  quelle: 'P3.1 — Erklärtext nennt rund 270 €',
});

// === GRUPPE 9a: Component-Drift-Tests (148b P1.1+P1.2+P1.3) ===

// P1.1 Pool: Strompreis-Default aus SSOT, kein hardcodiertes useState('32')
cases.push({
  name: 'PoolkostenRechner: kein useState(\'32\') als Strompreis-Default',
  actual: poolRechnerTs.includes("useState('32')"),
  expected: false,
  quelle: '148b P1.1 — Migration auf STROMPREIS_2026',
});
cases.push({
  name: 'PoolkostenRechner: importiert getStrompreis aus SSOT',
  actual: poolRechnerTs.includes("from '@/lib/berechnungen/strompreis'"),
  expected: true,
  quelle: '148b P1.1 — SSOT-Konsumption',
});
cases.push({
  name: 'PoolkostenRechner: kein placeholder="32" mehr',
  actual: poolRechnerTs.includes('placeholder="32"'),
  expected: false,
  quelle: '148b P1.1 — placeholder folgt Default',
});

// P1.2 Heiz-Lib: WP-Preis aus SSOT statt hardcodierter 36
cases.push({
  name: 'heizkosten.ts: kein hardcodierter "preis: 36" mehr',
  actual: heizLibTs.includes('preis: 36'),
  expected: false,
  quelle: '148b P1.2 — alter Pre-147-Wert raus',
});
cases.push({
  name: 'heizkosten.ts: importiert getStrompreis aus SSOT',
  actual: heizLibTs.includes("from './strompreis'"),
  expected: true,
  quelle: '148b P1.2 — SSOT-Konsumption',
});
cases.push({
  name: 'heizkosten.ts: nutzt getStrompreis(\'waermepumpen_tarif\') für WP',
  actual: heizLibTs.includes("getStrompreis('waermepumpen_tarif')"),
  expected: true,
  quelle: '148b P1.2 — WP-Tarif aus SSOT (28 ct)',
});

// P1.3 Dach: Hinweisbox-Text präzisiert
cases.push({
  name: 'DachflaechenRechner: kein "Berechnung ist eine Näherung" mehr',
  actual: dachflRechnerTs.includes('Berechnung ist eine Näherung'),
  expected: false,
  quelle: '148b P1.3 — Walmdach ist exakt, nicht Näherung',
});
cases.push({
  name: 'DachflaechenRechner: "regelmäßige Dachformen" im Hinweis',
  actual: dachflRechnerTs.includes('regelmäßige Dachformen'),
  expected: true,
  quelle: '148b P1.3 — neue präzise Formulierung',
});

// === GRUPPE 9b: balkon-solar Hybrid-Korrektur (148b P2.1) ===

// Nord-Faktor von 0.40 → 0.60 (Branchenkonsens 04/2026)
cases.push({
  name: 'balkon-solar.ts: kein Nord-Faktor 0.40 mehr',
  actual: balkonLibTs.includes('faktor: 0.40'),
  expected: false,
  quelle: '148b P2.1 — alter Wert war außerhalb Branchenkonsens',
});
cases.push({
  name: 'balkon-solar.ts: Nord-Faktor 0.60 vorhanden',
  actual: balkonLibTs.includes('faktor: 0.60'),
  expected: true,
  quelle: '148b P2.1 — SolarScouts/PVGIS, ADAC, Anker, DRBO',
});
cases.push({
  name: 'balkon-solar.ts: Nord-Label "Nord (60 %)"',
  actual: balkonLibTs.includes("label: 'Nord (60 %)'"),
  expected: true,
  quelle: '148b P2.1 — UI-Label konsistent mit Faktor',
});
cases.push({
  name: 'balkon-solar.ts: Header-Marker "Branchenkonsens"',
  actual: balkonLibTs.includes('Branchenkonsens'),
  expected: true,
  quelle: '148b P2.1 — Doku-Anker',
});
cases.push({
  name: 'balkon-solar.ts: Header-Marker "Welle 3"',
  actual: balkonLibTs.includes('Welle 3'),
  expected: true,
  quelle: '148b P2.1 — Tech-Debt-Marker',
});
cases.push({
  name: 'balkon-solar.ts: Header-Marker "Brutto vor PR"',
  actual: balkonLibTs.includes('Brutto vor PR'),
  expected: true,
  quelle: '148b P2.1 — Semantik der 950 dokumentiert',
});

// Süd-Faktor unverändert (Sanity-Check, keine ungewollte Drift)
cases.push({
  name: 'balkon-solar.ts: Süd-Faktor 1.0 unverändert',
  actual: balkonLibTs.includes("{ id: 'sued', label: 'Süd (100 %)', faktor: 1.0 }"),
  expected: true,
  quelle: '148b P2.1 — Süd-Korrektur war nicht im Scope',
});

// Konfig-Erklärtext: "Nord = 40 %" raus, "Nord = 60 %" rein
cases.push({
  name: 'balkon-solar-Block: kein "Nord = 40 %" mehr im Erklärtext',
  actual: blockOf('balkon-solar-rechner').includes('Nord = 40 %'),
  expected: false,
  quelle: '148b P2.1 — Konfig folgt Lib',
});
cases.push({
  name: 'balkon-solar-Block: "Nord = 60 %" im Erklärtext',
  actual: blockOf('balkon-solar-rechner').includes('Nord = 60 %'),
  expected: true,
  quelle: '148b P2.1 — Konfig konsistent zu Lib',
});

// Berechnungs-Konsistenz: Süd unverändert, Nord neu — synchroner Aufruf
// statt dynamic import, damit die Tests im normalen cases-Array landen.
const ergNord = berechneBalkonSolar(800, 'nord', 'aufstaenderung', 3000, 33, 600);
const ergSued = berechneBalkonSolar(800, 'sued', 'aufstaenderung', 3000, 33, 600);
cases.push({
  name: 'Berechnung Nord: 800 W Aufständerung → 410 kWh (vorher 274)',
  actual: ergNord?.jahresertragKwh ?? -1,
  expected: 410,
  quelle: '0,8 × 950 × 0,60 × 0,9 = 410,4 → 410',
});
cases.push({
  name: 'Berechnung Süd: 800 W Aufständerung → 684 kWh (unverändert)',
  actual: ergSued?.jahresertragKwh ?? -1,
  expected: 684,
  quelle: '0,8 × 950 × 1,0 × 0,9 = 684 (Sanity, kein Drift)',
});

// === GRUPPE 9: Walmdach-Mathematik (Sanity-Check) ===

// Walmdach 10×8m, 30° → 80 / cos(30°) = 80 / 0,866 = 92,38 m²
const walmFlaeche = 80 / Math.cos((30 * Math.PI) / 180);
cases.push({
  name: 'Walmdach 10×8m, 30° → 92,4 m² (mathematisch exakt)',
  actual: Math.round(walmFlaeche * 10) / 10,
  expected: 92.4,
  tol: 0.05,
  quelle: 'P3.4 — Grundfläche/cos exakt bei gleichmäßiger Neigung',
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
