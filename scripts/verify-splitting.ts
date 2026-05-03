/**
 * Verify-Script für lib/berechnungen/splitting.ts (Welle-4 M4, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - EStG § 32a Abs. 5 (Splittingtarif): https://www.gesetze-im-internet.de/estg/__32a.html
 *   - EStG § 26 (Veranlagung von Ehegatten): https://www.gesetze-im-internet.de/estg/__26.html
 *   - EStG § 9a (Werbungskostenpauschbetrag 1.230 €):
 *     https://www.gesetze-im-internet.de/estg/__9a.html
 *   - EStG § 10c (Sonderausgabenpauschbetrag 36 €):
 *     https://www.gesetze-im-internet.de/estg/__10c.html
 *   - EStG § 32 Abs. 6 (Kinderfreibetrag 9.756 € zusammen 2026)
 *
 * **L-36-Pattern Pflicht** (Cross-Lib-Computation): splitting.ts konsumiert
 * berechneEStGrund + berechneSoli + berechneKirchensteuerByBundesland aus
 * einkommensteuer.ts (verifiziert via verify-tarif-2026.ts) und
 * KIFB_GESAMT_ZUSAMMEN_2026 aus kindergeld.ts (verifiziert via M1b
 * verify-kindergeld.ts). Erwartungs-Werte werden aus diesen verifizierten
 * Funktionen direkt gezogen.
 *
 * L-35-Diskrepanzen Konfig-vs-Lib (im Header dokumentiert):
 *   - KiSt-Verteilung bei Splitting: Lib teilt ESt hälftig (vereinfacht);
 *     Realität: Bundesland-spezifische Aufteilungs-Mechanik
 *
 * Ausführen: npx tsx scripts/verify-splitting.ts
 */

import {
  berechneSplitting,
  BUNDESLAENDER,
} from '../lib/berechnungen/splitting';
import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  WK_PAUSCHALE_AN_2026,
} from '../lib/berechnungen/einkommensteuer';
import { KIFB_GESAMT_ZUSAMMEN_2026 } from '../lib/berechnungen/kindergeld';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const isNull = (v: unknown): number => v === null ? 1 : 0;

const calc = (params: {
  p1?: number; p2?: number;
  k1?: boolean; k2?: boolean;
  bl?: string; kfb?: number;
}) => berechneSplitting({
  jahresBruttoP1: params.p1 ?? 50000,
  jahresBruttoP2: params.p2 ?? 50000,
  kirchensteuerP1: params.k1 ?? false,
  kirchensteuerP2: params.k2 ?? false,
  bundesland: params.bl ?? 'Nordrhein-Westfalen',
  kinderfreibetraege: params.kfb ?? 0,
});

// === Cluster A: Konstanten + Re-Export ===

cases.push(
  { name: 'A-01 BUNDESLAENDER-Re-Export Länge = 16', actual: BUNDESLAENDER.length, expected: 16, tolerance: 0 },
  { name: 'A-02 WK-Pauschale konsumiert (1.230 €)',  actual: WK_PAUSCHALE_AN_2026, expected: 1230, tolerance: 0 },
  { name: 'A-03 KIFB-Konsumption 9.756 € (2026)',     actual: KIFB_GESAMT_ZUSAMMEN_2026, expected: 9756, tolerance: 0 },
);

// === Cluster B: zvE-Berechnung mit Pauschalen § 9a + § 10c ===
//
// Manuell:
//   P1=50000, P2=50000, 0 Kifb:
//     zveP1Vor = 50000 - 1230 - 36 = 48734
//     zveP2Vor = 48734
//     zveGesamt = 97468; zveHalbe = round(48734) = 48734
//   P1=80000, P2=0:
//     zveP1Vor = 80000 - 1266 = 78734
//     zveP2Vor = pauschalenAbzug(0) = 0
//     zveGesamt = 78734; zveHalbe = 39367

const b1 = calc({ p1: 50000, p2: 50000 });
cases.push(
  { name: 'B-01 P1=50k, P2=50k: zveP1 = 48.734', actual: b1!.zveP1, expected: 48734 },
  { name: 'B-01: zveP2 = 48.734',                actual: b1!.zveP2, expected: 48734 },
  { name: 'B-01: zveGesamt = 97.468',            actual: b1!.zveGesamt, expected: 97468 },
  { name: 'B-01: zveHalbe = 48.734',             actual: b1!.zveHalbe, expected: 48734 },
);

const b2 = calc({ p1: 80000, p2: 0 });
cases.push(
  { name: 'B-02 P1=80k, P2=0: zveP1 = 78.734',   actual: b2!.zveP1, expected: 78734 },
  { name: 'B-02: zveP2 = 0',                     actual: b2!.zveP2, expected: 0 },
  { name: 'B-02: zveGesamt = 78.734',            actual: b2!.zveGesamt, expected: 78734 },
  { name: 'B-02: zveHalbe = 39.367',             actual: b2!.zveHalbe, expected: 39367 },
);

// === Cluster C: ESt-Cross-Computation gegen berechneEStGrund (L-36) ===
//
// estP1 = berechneEStGrund(zveP1, 2026)
// estSplitting = berechneEStGrund(zveHalbe, 2026) × 2

const c1 = calc({ p1: 60000, p2: 30000 });
cases.push(
  { name: 'C-01 estP1 = berechneEStGrund(zveP1)',     actual: c1!.estP1,        expected: berechneEStGrund(c1!.zveP1, 2026), tolerance: 0.5 },
  { name: 'C-01 estP2 = berechneEStGrund(zveP2)',     actual: c1!.estP2,        expected: berechneEStGrund(c1!.zveP2, 2026), tolerance: 0.5 },
  { name: 'C-01 estSplitting = 2 × ESt(zveHalbe)',    actual: c1!.estSplitting, expected: berechneEStGrund(c1!.zveHalbe, 2026) * 2, tolerance: 0.5 },
);

// === Cluster D: Splitting-Vorteil (Strukturtests) ===
//
// Bei gleichem Einkommen → vorteilEst ≈ 0
// Bei stark ungleichem (single earner) → großer Vorteil

const d1 = calc({ p1: 50000, p2: 50000 });
const d2 = calc({ p1: 80000, p2: 0 });
cases.push(
  { name: 'D-01 P1=P2: vorteilEst ≈ 0 (kein Splitting-Vorteil)', actual: d1!.vorteilEst, expected: 0, tolerance: 5 },
  { name: 'D-02 P1=80k, P2=0: vorteilEst > 1.000 € (Single-Earner-Vorteil)', actual: d2!.vorteilEst > 1000 ? 1 : 0, expected: 1, tolerance: 0 },
);

// vorteilEst = estEinzelGesamt - estSplitting (Strukturelle Invariante)
cases.push(
  { name: 'D-03 vorteilEst = estEinzelGesamt − estSplitting', actual: d2!.vorteilEst, expected: d2!.estEinzelGesamt - d2!.estSplitting, tolerance: 0.5 },
  { name: 'D-04 vorteilGesamt = gesamtEinzel − gesamtSplitting', actual: d2!.vorteilGesamt, expected: Math.round((d2!.gesamtEinzel - d2!.gesamtSplitting) * 100) / 100, tolerance: 0.05 },
);

// === Cluster E: Soli/KiSt Cross-Computation (L-36) ===
//
// soliEinzel = berechneSoli(estP1, false) + berechneSoli(estP2, false)
// soliSplitting = berechneSoli(estSplitting, true)

const e1 = calc({ p1: 80000, p2: 60000 });
const expectedSoliP1 = berechneSoli(e1!.estP1, false, 2026);
const expectedSoliP2 = berechneSoli(e1!.estP2, false, 2026);
cases.push(
  { name: 'E-01 soliEinzel = soli(estP1) + soli(estP2)', actual: e1!.soliEinzel, expected: Math.round((expectedSoliP1 + expectedSoliP2) * 100) / 100, tolerance: 0.05 },
  { name: 'E-01 soliSplitting = soli(estSplitting, splittingtarif=true)', actual: e1!.soliSplitting, expected: berechneSoli(e1!.estSplitting, true, 2026), tolerance: 0.5 },
);

// KiSt-Cross-Comp mit Bayern (8 %)
const e2 = calc({ p1: 60000, p2: 40000, k1: true, k2: true, bl: 'Bayern' });
const expectedKistEinzelP1 = berechneKirchensteuerByBundesland(e2!.estP1, 'Bayern');
const expectedKistEinzelP2 = berechneKirchensteuerByBundesland(e2!.estP2, 'Bayern');
cases.push(
  { name: 'E-02 KiSt Bayern Einzel = KiSt(estP1) + KiSt(estP2)', actual: e2!.kistEinzel, expected: Math.round((expectedKistEinzelP1 + expectedKistEinzelP2) * 100) / 100, tolerance: 0.05 },
);

// KiSt nicht aktiv → 0
const e3 = calc({ p1: 60000, p2: 40000, k1: false, k2: false });
cases.push(
  { name: 'E-03 KiSt deaktiviert: kistEinzel = 0',      actual: e3!.kistEinzel, expected: 0 },
  { name: 'E-03: kistSplitting = 0',                    actual: e3!.kistSplitting, expected: 0 },
);

// === Cluster F: Steuerklassen-Empfehlung ===
//
// 40-60% → IV/IV; sonst III/V

const f1 = calc({ p1: 50000, p2: 50000 }); // 50:50 → IV/IV
const f2 = calc({ p1: 50000, p2: 40000 }); // 56:44 → IV/IV (im Korridor)
const f3 = calc({ p1: 80000, p2: 20000 }); // 80:20 → III/V
const f4 = calc({ p1: 60000, p2: 30000 }); // 67:33 → III/V (außerhalb)
cases.push(
  { name: 'F-01 P1=P2: empfehlung = IV/IV',                  actual: f1!.empfehlung === 'IV/IV' ? 1 : 0, expected: 1 },
  { name: 'F-02 P1=50k, P2=40k (56:44, im 40-60 Korridor)',  actual: f2!.empfehlung === 'IV/IV' ? 1 : 0, expected: 1 },
  { name: 'F-03 P1=80k, P2=20k (80:20): empfehlung = III/V', actual: f3!.empfehlung === 'III/V' ? 1 : 0, expected: 1 },
  { name: 'F-04 P1=60k, P2=30k (67:33): empfehlung = III/V', actual: f4!.empfehlung === 'III/V' ? 1 : 0, expected: 1 },
);

// === Cluster G: Vergleichstabelle-Struktur ===

const g1 = calc({ p1: 60000, p2: 40000, k1: true, k2: true, bl: 'Nordrhein-Westfalen' });
cases.push(
  { name: 'G-01 vergleichsTabelle-length mit KiSt = 4',  actual: g1!.vergleichsTabelle.length, expected: 4, tolerance: 0 },
);

const g2 = calc({ p1: 60000, p2: 40000 }); // ohne KiSt
cases.push(
  { name: 'G-02 vergleichsTabelle ohne KiSt = 3',        actual: g2!.vergleichsTabelle.length, expected: 3, tolerance: 0 },
);

// === Cluster H: Kifb-Wirkung ===
//
// 1 Kind: zveGesamt sinkt um KIFB_GESAMT_ZUSAMMEN_2026 (9.756)

const h_ohne = calc({ p1: 60000, p2: 40000, kfb: 0 });
const h_mit  = calc({ p1: 60000, p2: 40000, kfb: 1 });
cases.push(
  { name: 'H-01 1 Kifb: zveGesamt sinkt um 9.756 €', actual: h_ohne!.zveGesamt - h_mit!.zveGesamt, expected: 9756, tolerance: 1 },
);

// === Cluster I: Edge — Null-Returns ===

cases.push(
  { name: 'I-01 P1<0: null',                          actual: isNull(calc({ p1: -100, p2: 50000 })), expected: 1, tolerance: 0 },
  { name: 'I-02 P2<0: null',                          actual: isNull(calc({ p1: 50000, p2: -100 })), expected: 1, tolerance: 0 },
  { name: 'I-03 beide=0: null',                       actual: isNull(calc({ p1: 0, p2: 0 })),         expected: 1, tolerance: 0 },
  { name: 'I-04 P1=0, P2>0: nicht null (Single-Earner P2)', actual: isNull(calc({ p1: 0, p2: 60000 })), expected: 0, tolerance: 0 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  let ok: boolean;
  if (c.actual === null && c.expected === null) ok = true;
  else if (c.actual === null || c.expected === null) ok = false;
  else {
    const tol = c.tolerance ?? 0.01;
    ok = Math.abs(c.actual - c.expected) <= tol;
  }
  const status = ok ? '✓' : '✗';
  const a = c.actual === null ? 'null' : String(c.actual);
  const e = c.expected === null ? 'null' : String(c.expected);
  console.log(`  ${status} ${c.name.padEnd(64)} ist ${a.padStart(12)}  soll ${e.padStart(12)}`);
  if (ok) passed++; else failed++;
}
console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
