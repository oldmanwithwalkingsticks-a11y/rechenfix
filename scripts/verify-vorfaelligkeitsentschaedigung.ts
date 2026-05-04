/**
 * Verify-Script für lib/berechnungen/vorfaelligkeitsentschaedigung.ts
 * (Welle-5 Track-A Block-C C3, 04.05.2026).
 *
 * Externe Quellen (E6, nicht-zirkulär):
 *   - § 489 BGB: https://www.gesetze-im-internet.de/bgb/__489.html
 *   - § 490 BGB (außerordentliches Kündigungsrecht)
 *   - § 502 BGB (Verbraucher-VFE-Cap, NICHT modelliert — siehe L-35-Header)
 *   - BGH XI ZR 388/14 (Aktiv-Wiederanlage als Standard-Methode)
 *
 * **Welle-2-refactor-only-Akzeptanz:** C3 ist Lib-Extraktion aus Component-
 * Inline-`useMemo`-Block + Modul-Scope-Konstanten. Tests prüfen die
 * mathematische Schaden-Differenz-Definition (vereinfachte Aktiv-Passiv-
 * Hybrid: Restschuld × Zinsmarge/100 × Restlaufzeit × FAKTOR_KOSTEN +
 * Bearbeitungsgebühr) direkt, nicht gegen Pre-Refactor-Snapshot.
 *
 * **L-35-Disziplin:** Lib modelliert NUR die vereinfachte Aktiv-Passiv-Hybrid-
 * Methode mit 1 Marktzins. § 489 BGB 10-Jahres-Cap und § 502 BGB Verbraucher-
 * Cap NICHT modelliert. Test E-01 dokumentiert das Verhalten bei
 * Restlaufzeit > 10 Jahren explizit (Lib berechnet weiter, kein Cap).
 *
 * Tolerance: 0,01 € für €-Werte (reine Multiplikation/Division).
 *
 * Ausführen: npx tsx scripts/verify-vorfaelligkeitsentschaedigung.ts
 */

import {
  VFE_BEARBEITUNGSGEBUEHR_EUR,
  VFE_FAKTOR_KOSTEN,
  berechneVorfaelligkeitsentschaedigung,
} from '../lib/berechnungen/vorfaelligkeitsentschaedigung';

type TestCase = {
  name: string;
  actual: number | null;
  expected: number | null;
  tolerance?: number;
};

const cases: TestCase[] = [];

const bool = (v: boolean): number => (v ? 1 : 0);

// === Cluster A: Konstanten ===

cases.push(
  { name: 'A-01 VFE_BEARBEITUNGSGEBUEHR_EUR = 300 € (Marktpraxis)',                   actual: VFE_BEARBEITUNGSGEBUEHR_EUR, expected: 300 },
  { name: 'A-02 VFE_FAKTOR_KOSTEN = 0,85 (BGH-Schaden-Differenz, 15 % Abschlag)',    actual: VFE_FAKTOR_KOSTEN, expected: 0.85, tolerance: 0.0001 },
);

// === Cluster B: Zins-Schaden-Berechnung Standard ===
//
// Formel: jährlicherVerlust = restschuld × zinsmarge / 100
//         vfe = jährlicherVerlust × restlaufzeit × 0,85
//         gesamt = vfe + 300

const b1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 4, restlaufzeitJahre: 5, marktzins: 2,
});
//   zinsmarge=2; jährlich=150000×2/100=3000; vfe=3000×5×0,85=12.750; gesamt=13.050
cases.push(
  { name: 'B-01 rs=150k, vz=4%, mz=2%, rl=5J: zinsmarge = 2 %',          actual: b1.zinsmarge, expected: 2, tolerance: 0.01 },
  { name: 'B-01: jaehrlicherVerlust = 3.000 € (150k × 2 % )',             actual: b1.jaehrlicherVerlust, expected: 3000, tolerance: 0.01 },
  { name: 'B-01: vfe = 12.750 € (3000 × 5 × 0,85)',                       actual: b1.vfe, expected: 12750, tolerance: 0.01 },
  { name: 'B-01: gesamt = 13.050 € (vfe + 300 €)',                        actual: b1.gesamt, expected: 13050, tolerance: 0.01 },
);

const b2 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 200_000, vertragszins: 3.5, restlaufzeitJahre: 10, marktzins: 2,
});
//   zinsmarge=1,5; jährlich=200000×1,5/100=3000; vfe=3000×10×0,85=25.500; gesamt=25.800
cases.push(
  { name: 'B-02 rs=200k, vz=3,5%, mz=2%, rl=10J: vfe = 25.500 €',  actual: b2.vfe, expected: 25500, tolerance: 0.01 },
  { name: 'B-02: gesamt = 25.800 €',                                actual: b2.gesamt, expected: 25800, tolerance: 0.01 },
);

const b3 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 100_000, vertragszins: 5, restlaufzeitJahre: 3, marktzins: 3,
});
//   zinsmarge=2; jährlich=2000; vfe=2000×3×0,85=5.100; gesamt=5.400
cases.push(
  { name: 'B-03 rs=100k, vz=5%, mz=3%, rl=3J: vfe = 5.100 €',     actual: b3.vfe, expected: 5100, tolerance: 0.01 },
  { name: 'B-03: gesamt = 5.400 €',                                 actual: b3.gesamt, expected: 5400, tolerance: 0.01 },
);

const b4 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 50_000, vertragszins: 6, restlaufzeitJahre: 2, marktzins: 2,
});
//   zinsmarge=4; jährlich=2000; vfe=2000×2×0,85=3.400; gesamt=3.700
cases.push(
  { name: 'B-04 hohe Zinsmarge (4 %): vfe = 3.400 €',  actual: b4.vfe, expected: 3400, tolerance: 0.01 },
  { name: 'B-04: gesamt = 3.700 €',                     actual: b4.gesamt, expected: 3700, tolerance: 0.01 },
);

// === Cluster C: Bearbeitungsgebühr-Pauschale (300 € addiert wenn VFE > 0) ===

const c1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 4, restlaufzeitJahre: 5, marktzins: 2,
});
cases.push(
  { name: 'C-01 gesamt − vfe = Bearbeitungsgebühr (300 €)',  actual: c1.gesamt - c1.vfe, expected: VFE_BEARBEITUNGSGEBUEHR_EUR, tolerance: 0.01 },
  { name: 'C-02 Bearbeitungsgebühr ist Pauschale (Marktpraxis 300 €)', actual: c1.gesamt - c1.vfe, expected: 300, tolerance: 0.01 },
);

// === Cluster D: keineVfe-Cut bei Marktzins ≥ Vertragszins ===
//
// keineVfe = (vertragszins − marktzins) ≤ 0
// Bei keineVfe = true: alle €-Werte 0 (auch keine Bearbeitungsgebühr)

const d1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 2.5, restlaufzeitJahre: 5, marktzins: 3.5,
});
//   zinsmarge=-1, keineVfe=true, alle Werte 0 (Component-Default)
cases.push(
  { name: 'D-01 mz > vz → keineVfe = true',                     actual: bool(d1.keineVfe), expected: 1 },
  { name: 'D-01: jaehrlicherVerlust = 0 (keine VFE zulässig)',    actual: d1.jaehrlicherVerlust, expected: 0 },
  { name: 'D-01: vfe = 0',                                         actual: d1.vfe, expected: 0 },
  { name: 'D-01: gesamt = 0 (KEINE Bearbeitungsgebühr bei keineVfe)', actual: d1.gesamt, expected: 0 },
);

const d2 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 3, restlaufzeitJahre: 5, marktzins: 3,
});
//   zinsmarge=0, keineVfe=true (≤0), gesamt=0
cases.push(
  { name: 'D-02 zinsmarge = 0 → keineVfe = true (Edge ≤ 0)',  actual: bool(d2.keineVfe), expected: 1 },
  { name: 'D-02: gesamt = 0',                                    actual: d2.gesamt, expected: 0 },
);

const d3 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 3, restlaufzeitJahre: 5, marktzins: 2.99,
});
//   zinsmarge=0,01 → keineVfe=false → VFE > 0
cases.push(
  { name: 'D-03 zinsmarge = 0,01 → keineVfe = false (Edge > 0)',  actual: bool(d3.keineVfe), expected: 0 },
  { name: 'D-03: vfe > 0',                                          actual: d3.vfe > 0 ? 1 : 0, expected: 1 },
);

// === Cluster E: § 489 BGB 10-Jahres-Cap NICHT modelliert (L-35-Befund) ===
//
// Lib berechnet VFE auch bei Restlaufzeit > 10 Jahren weiter — kein Cap.
// Test dokumentiert das Verhalten explizit.

const e1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 4, restlaufzeitJahre: 15, marktzins: 2,
});
//   rl=15 > 10 → keine Sperre
//   zinsmarge=2; jährlich=3000; vfe=3000×15×0,85=38.250; gesamt=38.550
cases.push(
  { name: 'E-01 rl=15J > 10 (§ 489): keineVfe = false (KEIN Cap)',  actual: bool(e1.keineVfe), expected: 0 },
  { name: 'E-01: vfe = 38.250 € (Lib rechnet ohne Cap)',             actual: e1.vfe, expected: 38250, tolerance: 0.01 },
  { name: 'E-01: gesamt = 38.550 €',                                  actual: e1.gesamt, expected: 38550, tolerance: 0.01 },
);

// === Cluster F: Strukturelle Invarianten ===

const f1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 4, restlaufzeitJahre: 5, marktzins: 2,
});
cases.push(
  { name: 'F-01 zinsmarge = vertragszins − marktzins',                                actual: f1.zinsmarge, expected: f1.vertragszins - f1.marktzins, tolerance: 0.001 },
  { name: 'F-02 jaehrlicherVerlust = restschuld × zinsmarge / 100 (Konsistenz)',     actual: f1.jaehrlicherVerlust, expected: (f1.restschuld * f1.zinsmarge) / 100, tolerance: 0.01 },
  { name: 'F-03 vfe = jaehrlicherVerlust × restlaufzeit × FAKTOR_KOSTEN (Konsistenz)', actual: f1.vfe, expected: f1.jaehrlicherVerlust * f1.restlaufzeitJahre * VFE_FAKTOR_KOSTEN, tolerance: 0.01 },
  { name: 'F-04 gesamt = vfe + Bearbeitungsgebühr (wenn !keineVfe)',                   actual: f1.gesamt, expected: f1.vfe + VFE_BEARBEITUNGSGEBUEHR_EUR, tolerance: 0.01 },
);

// === Cluster G: Edge-Cases ===

const g1 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 0, vertragszins: 4, restlaufzeitJahre: 5, marktzins: 2,
});
//   zinsmarge=2, keineVfe=false, aber rs=0 → jährlich=0 → vfe=0
//   gesamt = 0 + 300 = 300 (Bearbeitungsgebühr greift trotz vfe=0!)
cases.push(
  { name: 'G-01 rs=0 + zinsmarge>0: jährlich=0, vfe=0',                  actual: g1.vfe, expected: 0 },
  { name: 'G-01: gesamt = 300 € (Bearbeitungsgebühr trotz vfe=0)',        actual: g1.gesamt, expected: 300, tolerance: 0.01 },
);

const g2 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 150_000, vertragszins: 4, restlaufzeitJahre: 0, marktzins: 2,
});
//   rl=0, zinsmarge=2, keineVfe=false → jährlich=3000, vfe=3000×0×0,85=0
//   gesamt = 0 + 300 = 300
cases.push(
  { name: 'G-02 rl=0 + zinsmarge>0: vfe=0 (× 0 Restlaufzeit)',          actual: g2.vfe, expected: 0 },
  { name: 'G-02: gesamt = 300 € (Bearbeitungsgebühr trotz vfe=0)',       actual: g2.gesamt, expected: 300, tolerance: 0.01 },
);

const g3 = berechneVorfaelligkeitsentschaedigung({
  restschuld: 0, vertragszins: 0, restlaufzeitJahre: 0, marktzins: 0,
});
//   alle 0, zinsmarge=0, keineVfe=true → alle €-Werte 0
cases.push(
  { name: 'G-03 alle Eingaben 0: keineVfe=true → gesamt = 0',  actual: g3.gesamt, expected: 0 },
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
  console.log(`  ${status} ${c.name.padEnd(72)} ist ${a.padStart(14)}  soll ${e.padStart(14)}`);
  if (ok) passed++;
  else failed++;
}
console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
