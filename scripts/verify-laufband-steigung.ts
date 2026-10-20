/**
 * Verify-Script für lib/berechnungen/laufband-steigung.ts (Welle 184).
 *
 * Modell: ACSM-Laufgleichung VO2 = 3,5 + 0,2·v + 0,9·v·G (v in m/min, G dezimal;
 * ACSM's Guidelines for Exercise Testing and Prescription, Metabolic Equations) und
 * ebene Straße ≈ Laufband bei 1 % Steigung (Jones AM, Doust JH, J Sports Sci 1996;14(4):321–327).
 * Outdoor-Äquivalent v′ = v · (0,2 + 0,9·G) / 0,209.
 *
 * Sollwerte von Hand gerechnet:
 *   10 km/h = 166,667 m/min.
 *   2 %:  10 · 0,218 / 0,209 = 10,4306 km/h → 3600 / 10,4306 = 345,1 s = 5:45 min/km
 *   0 %:  10 · 0,200 / 0,209 =  9,5694 km/h → 376,2 s = 6:16
 *   1 %:  10,0000 km/h → 6:00
 *   4 %:  10 · 0,236 / 0,209 = 11,2919 → 318,8 s = 5:19
 *   8 %:  10 · 0,272 / 0,209 = 13,0144 → 276,6 s = 4:37
 *   15 %: 10 · 0,335 / 0,209 = 16,0287 → 224,6 s = 3:45
 *   12 km/h, 2 %: 12 · 0,218 / 0,209 = 12,5167
 *   VO2(10 km/h, 2 %) = 3,5 + 33,3333 + 3,0 = 39,8333; VO2(10 km/h, 1 %) = 38,3333
 *     → Mehraufwand ggü. Straße = 39,8333 / 38,3333 − 1 = +3,913 %
 *   VO2(10 km/h, 0 %) = 36,8333 → −3,913 %
 *   Umgekehrt: Straße 12 km/h bei 3 %: 12 · 0,209 / 0,227 = 11,0485 km/h
 *
 * Ausführen: npx tsx scripts/verify-laufband-steigung.ts
 */

import {
  outdoorAequivalentKmh, mehraufwandGegenStrasseProzent, bandTempoFuerOutdoorKmh, acsmVo2, paceAusKmh,
} from '../lib/berechnungen/laufband-steigung';

type Fall = { name: string; ist: number | string; soll: number | string; tol?: number };
const faelle: Fall[] = [
  { name: '10 km/h, 2 % → 10,4306 km/h',            ist: outdoorAequivalentKmh(10, 2), soll: 10.4306, tol: 0.0001 },
  { name: '10 km/h, 2 % → Pace 5:45',               ist: paceAusKmh(outdoorAequivalentKmh(10, 2)), soll: '5:45' },
  { name: '10 km/h, 1 % = Straße → 10,0000',        ist: outdoorAequivalentKmh(10, 1), soll: 10, tol: 0.00001 },
  { name: '10 km/h, 0 % → 9,5694 (leichter)',        ist: outdoorAequivalentKmh(10, 0), soll: 9.5694, tol: 0.0001 },
  { name: '10 km/h, 0 % → Pace 6:16',               ist: paceAusKmh(outdoorAequivalentKmh(10, 0)), soll: '6:16' },
  { name: '10 km/h, 4 % → 11,2919',                 ist: outdoorAequivalentKmh(10, 4), soll: 11.2919, tol: 0.0001 },
  { name: '10 km/h, 4 % → Pace 5:19',               ist: paceAusKmh(outdoorAequivalentKmh(10, 4)), soll: '5:19' },
  { name: '10 km/h, 8 % → 13,0144 / 4:37',          ist: `${outdoorAequivalentKmh(10, 8).toFixed(4)} ${paceAusKmh(outdoorAequivalentKmh(10, 8))}`, soll: '13.0144 4:37' },
  { name: '10 km/h, 15 % → 16,0287 / 3:45',         ist: `${outdoorAequivalentKmh(10, 15).toFixed(4)} ${paceAusKmh(outdoorAequivalentKmh(10, 15))}`, soll: '16.0287 3:45' },
  { name: '12 km/h, 2 % → 12,5167',                 ist: outdoorAequivalentKmh(12, 2), soll: 12.5167, tol: 0.0001 },
  { name: 'VO2 10 km/h, 2 % = 39,8333',             ist: acsmVo2(10, 2), soll: 39.8333, tol: 0.0001 },
  { name: 'Mehraufwand 10 km/h, 2 % ggü. Straße',   ist: mehraufwandGegenStrasseProzent(10, 2), soll: 3.913, tol: 0.001 },
  { name: 'Mehraufwand 10 km/h, 0 % ggü. Straße',   ist: mehraufwandGegenStrasseProzent(10, 0), soll: -3.913, tol: 0.001 },
  { name: 'Mehraufwand 1 % = 0',                    ist: mehraufwandGegenStrasseProzent(10, 1), soll: 0, tol: 0.00001 },
  { name: 'Umgekehrt: Straße 12 km/h bei 3 % → 11,05', ist: bandTempoFuerOutdoorKmh(12, 3), soll: 11.0485, tol: 0.0001 },
  { name: 'Pace 6:00 bei 10 km/h',                  ist: paceAusKmh(10), soll: '6:00' },
];

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005) : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(48)} ist ${String(typeof f.ist === 'number' ? f.ist.toFixed(4) : f.ist).padStart(14)}  soll ${String(f.soll).padStart(14)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
