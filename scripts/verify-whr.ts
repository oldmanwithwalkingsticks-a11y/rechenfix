/**
 * Verify-Script für lib/berechnungen/whr.ts (Welle 187).
 *
 * Anlass: Männer wurden erst ab WHR 1,00 als „erhöht“ eingestuft und das als WHO-Schwelle ausgegeben.
 *
 * Externe Quelle: WHO, Waist circumference and waist–hip ratio: report of a WHO expert consultation
 *   (Genf, 8.–11.12.2008), https://www.who.int/publications/i/item/9789241501491 —
 *   deutlich erhöhtes Risiko metabolischer Komplikationen ab WHR ≥ 0,90 (Männer) bzw. ≥ 0,85 (Frauen).
 *   Mittelstufe (keine WHO-Stufe): 0,05 unter der WHO-Schwelle (Frauen 0,80–0,84, Männer 0,85–0,89).
 *
 * Ausführen: npx tsx scripts/verify-whr.ts
 */

import { berechneWhr } from '../lib/berechnungen/whr';

type Fall = { name: string; ist: string | number | null; soll: string | number };
const faelle: Fall[] = [];
const W = (g: 'frau' | 'mann', t: number, h: number, gr = 0) => berechneWhr({ geschlecht: g, taillenumfangCm: t, hueftumfangCm: h, koerpergroesseCm: gr });

faelle.push(
  // Männer
  { name: 'Mann 84/100 = 0,84 → niedrig', ist: W('mann', 84, 100).risiko, soll: 'niedrig' },
  { name: 'Mann 85/100 = 0,85 → moderat (Vorstufe)', ist: W('mann', 85, 100).risiko, soll: 'moderat' },
  { name: 'Mann 89/100 = 0,89 → moderat', ist: W('mann', 89, 100).risiko, soll: 'moderat' },
  { name: 'Mann 90/100 = 0,90 → erhöht (WHO; vorher moderat)', ist: W('mann', 90, 100).risiko, soll: 'erhoeht' },
  { name: 'Mann 95/100 = 0,95 → erhöht (vorher moderat)', ist: W('mann', 95, 100).risiko, soll: 'erhoeht' },
  { name: 'Mann 100/100 = 1,00 → erhöht', ist: W('mann', 100, 100).risiko, soll: 'erhoeht' },
  { name: 'Mann Grenzwert-Text erhöht „≥ 0,90“', ist: W('mann', 90, 100).grenzwerte.erhoeht, soll: '≥ 0,90' },
  { name: 'Mann Grenzwert-Text moderat „0,85–0,89“', ist: W('mann', 90, 100).grenzwerte.moderat, soll: '0,85–0,89' },
  // Frauen (unverändert)
  { name: 'Frau 78/100 = 0,78 → niedrig (Startwerte)', ist: W('frau', 78, 100, 168).risiko, soll: 'niedrig' },
  { name: 'Frau Startwerte: WHtR 78/168 = 0,46', ist: Math.round((W('frau', 78, 100, 168).whtr ?? 0) * 100) / 100, soll: 0.46 },
  { name: 'Frau 80/100 = 0,80 → moderat', ist: W('frau', 80, 100).risiko, soll: 'moderat' },
  { name: 'Frau 85/100 = 0,85 → erhöht (WHO)', ist: W('frau', 85, 100).risiko, soll: 'erhoeht' },
  { name: 'Frau Grenzwert-Text erhöht „≥ 0,85“', ist: W('frau', 85, 100).grenzwerte.erhoeht, soll: '≥ 0,85' },
);

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nWHR: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
