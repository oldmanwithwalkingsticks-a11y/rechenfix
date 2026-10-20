/**
 * Verify-Script für lib/berechnungen/beton.ts (Welle 185).
 *
 * W185: Lieferbeton vorher pauschal 100 €/m³ (Seite: „80–120 €/m³“), Empfehlung ab 0,5 m³.
 * Jetzt Listenpreis 2026 + Mindermengenzuschlag, brutto, Empfehlung nur wenn günstiger als Sackware.
 *
 * Externe Quellen (Listenpreise Transportbeton, netto zzgl. USt):
 *   - Siemsen, Preisliste 2026 (ab 01.01.2026): C20/25 F3 0/16 181,50 €/m³, C25/30 185,00–187,50 €/m³;
 *     Frachtausgleich unter 7,5 m³: 25 € je fehlendem m³.
 *     https://www.siemsen.de/fileadmin/content/Preisliste_2026_Transportbeton_und_Betonpumpen.pdf
 *   - Heidelberg Materials, Preisliste Beton NRW 2026 (ab 01.10.2025): C20/25 208–210 €/m³, C25/30 213 €/m³
 *     zzgl. Pflichtzuschläge; unter 7,5 m³ je Fahrzeug Differenz zu 7,5 m³ × 25 €/m³.
 *     https://www.heidelbergmaterials.de/system/files/2025-09/Preisliste%20Heidelberg%20Materials%20Beton_Nordrhein-Westfalen_2026.pdf
 *   Modellannahme: 195 €/m³ netto (Mitte der Spanne), 25 €/m³ Mindermenge, 19 % USt (§ 12 Abs. 1 UStG).
 *
 * Sollwerte unabhängig von Hand gerechnet:
 *   Bodenplatte 3 × 2 × 0,15 m, 10 % → 0,99 m³; Säcke 25 kg: ⌈0,99 ÷ 0,012⌉ = 83 × 6,50 € = 539,50 €;
 *   Lieferbeton (0,99 × 195 + 6,51 × 25) × 1,19 = (193,05 + 162,75) × 1,19 = 423,402 → 423,40 €.
 *   1 × 1 × 0,5 m, 10 % → 0,55 m³; 46 Säcke = 299,00 €; (107,25 + 173,75) × 1,19 = 334,39 € → keine Empfehlung.
 *   10 × 3 × 0,25 m, 10 % → 8,25 m³ ≥ 7,5 → kein Zuschlag: 8,25 × 195 × 1,19 = 1.914,4125 → 1.914,41 €.
 *
 * Ausführen: npx tsx scripts/verify-beton.ts
 */

import { berechneBeton } from '../lib/berechnungen/beton';

type Fall = { name: string; ist: number | string | boolean; soll: number | string | boolean };
const faelle: Fall[] = [];

const R = (l: number, b: number, h: number, sack = 25) =>
  berechneBeton('rechteck', { laenge: l, breite: b, hoehe: h }, 10, sack)!;

const platte = R(3, 2, 0.15);
const klein = R(1, 1, 0.5);
const gross = R(10, 3, 0.25);
const platte40 = R(3, 2, 0.15, 40);

faelle.push(
  { name: 'Bodenplatte: Volumen mit Zuschlag 0,99 m³',          ist: platte.volumenMitZuschlag,          soll: 0.99 },
  { name: 'Bodenplatte: 83 Säcke à 25 kg',                      ist: platte.anzahlSaecke,                soll: 83 },
  { name: 'Bodenplatte: Sackware 539,50 €',                     ist: platte.kostenSaecke,                soll: 539.5 },
  { name: 'Bodenplatte: Lieferbeton brutto 423,40 €',           ist: platte.kostenLieferbeton,           soll: 423.4 },
  { name: 'Bodenplatte: Mindermenge brutto 6,51 × 25 × 1,19',   ist: platte.mindermengenZuschlagBrutto,  soll: 193.67 },
  { name: 'Bodenplatte: Lieferbeton empfohlen',                 ist: platte.empfehlungLieferbeton,       soll: true },
  { name: '0,55 m³: Sackware 46 × 6,50 = 299 €',                ist: klein.kostenSaecke,                 soll: 299 },
  { name: '0,55 m³: Lieferbeton 334,39 €',                      ist: klein.kostenLieferbeton,            soll: 334.39 },
  { name: '0,55 m³: keine Lieferbeton-Empfehlung',              ist: klein.empfehlungLieferbeton,        soll: false },
  { name: '8,25 m³: kein Mindermengenzuschlag',                 ist: gross.mindermengenZuschlagBrutto,   soll: 0 },
  { name: '8,25 m³: Lieferbeton 8,25 × 195 × 1,19 = 1.914,41 €', ist: gross.kostenLieferbeton,           soll: 1914.41 },
  { name: '40-kg-Säcke: ⌈0,99 ÷ 0,019⌉ = 53 × 9,50 = 503,50 €',  ist: platte40.kostenSaecke,             soll: 503.5 },
  { name: '40-kg-Säcke: Lieferbeton weiterhin 423,40 €',        ist: platte40.kostenLieferbeton,         soll: 423.4 },
);

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) < 0.005 : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(56)} ist ${String(f.ist).padStart(8)}  soll ${String(f.soll).padStart(8)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
