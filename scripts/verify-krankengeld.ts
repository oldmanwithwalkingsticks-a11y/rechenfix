/**
 * Verify-Script für lib/berechnungen/krankengeld.ts (W183, neu).
 *
 * Vorher zog der Rechner nur 6,15 % (kinderlos 6,45 %) vom Krankengeld ab. Sollwerte hier von Hand:
 *   - § 47 Abs. 1 SGB V: 70 % des Regelentgelts (BBG KV 5.812,50 € ÷ 30), höchstens 90 % des Netto.
 *   - Versichertenanteil vom Krankengeld (je zur Hälfte, „soweit sie auf die Leistung entfallen“):
 *     RV 9,3 % (§ 170 Abs. 1 Nr. 2 Buchst. a SGB VI, https://www.gesetze-im-internet.de/sgb_6/__170.html),
 *     ALV 1,3 % (§ 347 Nr. 5 SGB III, https://www.gesetze-im-internet.de/sgb_3/__347.html),
 *     PV 1,8 % + 0,6 % Zuschlag für Kinderlose (§ 59 Abs. 2 und 5 SGB XI), Abschlag 0,25 % je Kind
 *     ab dem 2. Kind unter 25 (§ 55 Abs. 3 SGB XI).
 *   - Kontrolle: betanet „Krankengeld > Höhe“ (https://www.betanet.de/krankengeld-hoehe.html):
 *     Abzug 12,4 %, Spanne 11,4–13 %; Beispiel 63 € → 55,19 €/Tag.
 *
 * Ausführen: npx tsx scripts/verify-krankengeld.ts
 */

import { berechneKrankengeld } from '../lib/berechnungen/krankengeld';

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

const K = (bruttoMonat: number, nettoMonat: number, hatKinder: boolean, kinderUnter25: number) =>
  berechneKrankengeld({ bruttoMonat, nettoMonat, hatKinder, kinderUnter25 });

// Startwerte des Rechners: 3.500 € brutto, 2.350 € netto, Kinder ja (1 unter 25)
//   70 % × 3.500 / 30 = 81,67; 90 % × 2.350 / 30 = 70,50 → 70,50 €/Tag
//   Abzug 12,4 % = 8,742 → 61,758 €/Tag → 1.852,74 €/Monat; Verlust 497,26 € (21,16 %)
const a = K(3500, 2350, true, 1);
faelle.push(
  { name: 'Start: Brutto-Krankengeld 70,50 €/Tag (90-%-Netto-Grenze)', ist: a.krankengeldBruttoTag, soll: 70.5 },
  { name: 'Start: Abzug 12,4 % (9,3 + 1,3 + 1,8)',                    ist: a.svSatz, soll: 0.124, tol: 1e-9 },
  { name: 'Start: Netto-Krankengeld 61,76 €/Tag',                      ist: Math.round(a.krankengeldNettoTag * 100) / 100, soll: 61.76 },
  { name: 'Start: Netto-Krankengeld 1.852,74 €/Monat',                 ist: Math.round(a.krankengeldNettoMonat * 100) / 100, soll: 1852.74 },
  { name: 'Start: Einkommensverlust 497,26 €',                         ist: Math.round(a.verlust * 100) / 100, soll: 497.26 },
  { name: 'Start: Verlust 21,16 %',                                    ist: Math.round(a.verlustProzent * 100) / 100, soll: 21.16 },
);

// Kinderlos: 9,3 + 1,3 + 2,4 = 13,0 % → 70,50 × 0,87 = 61,335 → 1.840,05 €/Monat
const b = K(3500, 2350, false, 0);
faelle.push(
  { name: 'Kinderlos: Abzug 13,0 %',                                   ist: b.svSatz, soll: 0.13, tol: 1e-9 },
  { name: 'Kinderlos: 1.840,05 €/Monat',                               ist: Math.round(b.krankengeldNettoMonat * 100) / 100, soll: 1840.05 },
);

// Kinderabschläge: 2 Kinder 12,15 %, 5 Kinder 11,4 % (untere Grenze bei betanet); nur ältere Kinder 12,4 %
faelle.push(
  { name: '2 Kinder unter 25: Abzug 12,15 %',                          ist: K(3500, 2350, true, 2).svSatz, soll: 0.1215, tol: 1e-9 },
  { name: '5 Kinder unter 25: Abzug 11,4 %',                           ist: K(3500, 2350, true, 5).svSatz, soll: 0.114, tol: 1e-9 },
  { name: '6 Kinder: Abschlag gedeckelt, 11,4 %',                      ist: K(3500, 2350, true, 6).svSatz, soll: 0.114, tol: 1e-9 },
  { name: 'Kinder nur über 25: kein Zuschlag, 12,4 %',                 ist: K(3500, 2350, true, 0).svSatz, soll: 0.124, tol: 1e-9 },
);

// betanet-Beispiel: Brutto-Krankengeld 63 € (netto 2.100 € → 90 % ÷ 30 = 63) → 55,19 €/Tag
const c = K(3000, 2100, true, 1);
faelle.push(
  { name: 'betanet: Brutto-Krankengeld 63,00 €',                       ist: c.krankengeldBruttoTag, soll: 63 },
  { name: 'betanet: Netto 55,19 €/Tag',                                ist: Math.round(c.krankengeldNettoTag * 100) / 100, soll: 55.19 },
);

// Höchstbetrag 2026: 70 % × 5.812,50 / 30 = 135,625 → 135,63 €/Tag
const d = K(8000, 6000, true, 1);
faelle.push(
  { name: 'BBG: Brutto-Krankengeld höchstens 135,63 €/Tag',             ist: d.krankengeldBruttoTag, soll: 135.63 },
  { name: 'BBG: 70-%-Grenze greift (nicht die Netto-Grenze)',           ist: d.nettoGrenzeGreift ? 1 : 0, soll: 0 },
);

// Brutto-Grenze unterhalb der Netto-Grenze: 2.000 brutto, 1.700 netto → 46,67 vs. 51,00 → 46,67
const e = K(2000, 1700, true, 1);
faelle.push(
  { name: '70-%-Grenze: 2.000 € brutto → 46,67 €/Tag',                  ist: e.krankengeldBruttoTag, soll: 46.67 },
);

let ok = 0;
for (const f of faelle) {
  const tol = f.tol ?? 0.005;
  const gut = Math.abs(f.ist - f.soll) <= tol;
  if (gut) ok++;
  console.log(`  ${gut ? '✓' : '✗'} ${f.name.padEnd(64)} ist ${String(f.ist).padStart(12)}  soll ${String(f.soll).padStart(12)}`);
}
console.log(`\nErgebnis: ${ok}/${faelle.length} grün, ${faelle.length - ok} rot.`);
process.exit(ok === faelle.length ? 0 : 1);
