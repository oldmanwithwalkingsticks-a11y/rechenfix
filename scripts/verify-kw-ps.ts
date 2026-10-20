/**
 * Verify-Script für lib/berechnungen/kw-ps.ts (Welle 187).
 *
 * Anlass: PS_ZU_KW war auf 0,73550 gerundet; 150 PS ergaben dadurch 110,33 statt 110,32 kW.
 *
 * Externe Quelle: Definition der metrischen Pferdestärke (DIN 66036):
 *   1 PS = 75 kp·m/s = 75 × 9,80665 W = 735,49875 W → 0,73549875 kW; 1 kW = 1 / 0,73549875 PS ≈ 1,359621617 PS.
 *   Sollwerte von Hand: 150 × 0,73549875 = 110,3248 → 110,32; 100 / 0,73549875 = 135,9622 → 135,96.
 *
 * Ausführen: npx tsx scripts/verify-kw-ps.ts
 */

import { berechneKwPs, KW_ZU_PS, PS_ZU_KW, umrechnungstabelle } from '../lib/berechnungen/kw-ps';

type Fall = { name: string; ist: number | undefined; soll: number; tol?: number };
const faelle: Fall[] = [];
const ps = (w: number) => berechneKwPs({ wert: w, richtung: 'ps-zu-kw' })?.ergebnisWert;
const kw = (w: number) => berechneKwPs({ wert: w, richtung: 'kw-zu-ps' })?.ergebnisWert;

faelle.push(
  { name: 'PS_ZU_KW = 75 × 9,80665 / 1000', ist: PS_ZU_KW, soll: 75 * 9.80665 / 1000, tol: 1e-15 },
  { name: 'KW_ZU_PS = 1 / 0,73549875 ≈ 1,359621617', ist: KW_ZU_PS, soll: 1.359621617, tol: 1e-9 },
  { name: '150 PS → 110,32 kW (vorher 110,33)', ist: ps(150), soll: 110.32 },
  { name: '75 PS → 55,16 kW', ist: ps(75), soll: 55.16 },
  { name: '100 PS → 73,55 kW', ist: ps(100), soll: 73.55 },
  { name: '200 PS → 147,10 kW', ist: ps(200), soll: 147.1 },
  { name: '300 PS → 220,65 kW', ist: ps(300), soll: 220.65 },
  { name: '100 kW → 135,96 PS', ist: kw(100), soll: 135.96 },
  { name: '110 kW → 149,56 PS', ist: kw(110), soll: 149.56 },
  { name: '81 kW → 110,13 PS', ist: kw(81), soll: 110.13 },
  { name: '150 kW → 203,94 PS', ist: kw(150), soll: 203.94 },
  { name: '50 kW → 67,98 PS', ist: kw(50), soll: 67.98 },
  { name: 'Tabelle 50 kW → 68,0 PS', ist: umrechnungstabelle.find((z) => z.kw === 50)?.ps, soll: 68.0 },
  { name: 'Tabelle 150 kW → 203,9 PS', ist: umrechnungstabelle.find((z) => z.kw === 150)?.ps, soll: 203.9 },
);

let ok = 0;
for (const f of faelle) {
  const gruen = typeof f.ist === 'number' && Math.abs(f.ist - f.soll) <= (f.tol ?? 1e-9);
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nkW/PS: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
