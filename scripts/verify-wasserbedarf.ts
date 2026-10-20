/**
 * Verify-Script für lib/berechnungen/wasserbedarf.ts — Wasserbedarf- und Trinkmenge-Rechner (Welle 187).
 *
 * Anlass: Beide Rechner gaben den Gesamtwasserbedarf (30–35 ml/kg) als „Trinkmenge“ aus.
 * Nach den D-A-CH-Referenzwerten ist das die Gesamtwasserzufuhr aus Getränken, fester Nahrung
 * und Oxidationswasser.
 *
 * Externe Quellen:
 *   - DGE/ÖGE/SGE, D-A-CH-Referenzwerte für die Nährstoffzufuhr, Richtwerte Wasser
 *     (Tabelle: https://www.vis.bayern.de/essen_trinken/ernaehrungsformen/doc/richtwerte_fuer_zufuhr_wasser_akt.pdf):
 *     19–<25 J.: Getränke 1.470, feste Nahrung 890, Oxidationswasser 340, gesamt 2.700 ml, 35 ml/kg
 *     25–<51 J.: 1.410 / 860 / 330 / 2.600 ml, 35 ml/kg
 *     51–<65 J.: 1.230 / 740 / 280 / 2.250 ml, 30 ml/kg
 *     → Getränke-Anteil 54,4 / 54,2 / 54,7 % ≈ 54 %.
 *   - Einheitlicher Ansatz: Trinkmenge = Grundbedarf × 0,54 + Sport-/Hitze-Zuschläge voll.
 *     Sollwerte unten von Hand gerechnet.
 *
 * Ausführen: npx tsx scripts/verify-wasserbedarf.ts
 */

import { berechneWasserbedarf, berechneTrinkmenge, GETRAENKE_ANTEIL, type WasserbedarfEingabe } from '../lib/berechnungen/wasserbedarf';

type Fall = { name: string; ist: number | null | undefined; soll: number; tol?: number };
const faelle: Fall[] = [];

// D-A-CH-Anteile
for (const [alter, getraenke, gesamt] of [['19–<25', 1470, 2700], ['25–<51', 1410, 2600], ['51–<65', 1230, 2250]] as const) {
  faelle.push({ name: `D-A-CH ${alter}: Getränke-Anteil ${getraenke}/${gesamt} = 54–55 % ≈ 0,54`, ist: getraenke / gesamt, soll: GETRAENKE_ANTEIL, tol: 0.01 });
}

const W = (o: Partial<WasserbedarfEingabe>) => berechneWasserbedarf({ gewicht: 75, aktivitaet: 'leicht', sportMinuten: 0, heiss: false, schwangerStillend: 'nein', ...o });

// Startwerte der Komponente: 75 kg, leicht aktiv, 0 min, normal, nicht schwanger
const s = W({});
faelle.push(
  { name: 'Start: Gesamtbedarf 2.625 ml', ist: s?.gesamtMl, soll: 2625 },
  { name: 'Start: Gesamtbedarf 2,6 L', ist: s?.gesamtLiter, soll: 2.6 },
  { name: 'Start: Trinkmenge 2.625 × 0,54 = 1.417,5 → 1.418 ml', ist: s?.trinkmengeMl, soll: 1418 },
  { name: 'Start: Trinkmenge 1,4 L', ist: s?.trinkmengeLiter, soll: 1.4 },
  { name: 'Start: Gläser ⌈1.417,5 ÷ 250⌉ = 6 (vorher 11 aus Gesamtbedarf)', ist: s?.anzahlGlaeser, soll: 6 },
);
// Seitenbeispiel: 75 kg, leicht, 60 min Sport
const b = W({ sportMinuten: 60 });
faelle.push(
  { name: 'Beispiel: Gesamtbedarf 3.325 ml', ist: b?.gesamtMl, soll: 3325 },
  { name: 'Beispiel: Gesamtbedarf 3,3 L', ist: b?.gesamtLiter, soll: 3.3 },
  { name: 'Beispiel: Trinkmenge 1.417,5 + 700 = 2.117,5 → 2.118 ml', ist: b?.trinkmengeMl, soll: 2118 },
  { name: 'Beispiel: Trinkmenge 2,1 L', ist: b?.trinkmengeLiter, soll: 2.1 },
  { name: 'Beispiel: Gläser 9 (vorher 14)', ist: b?.anzahlGlaeser, soll: 9 },
);
// Seiten-Beispielrechnungen
const k = W({ gewicht: 70, aktivitaet: 'kaum' });
faelle.push(
  { name: '70 kg kaum aktiv: Gesamt 2.100 ml', ist: k?.gesamtMl, soll: 2100 },
  { name: '70 kg kaum aktiv: Trinkmenge 1.134 ml', ist: k?.trinkmengeMl, soll: 1134 },
  { name: '70 kg kaum aktiv: 5 Gläser', ist: k?.anzahlGlaeser, soll: 5 },
);
const h = W({ gewicht: 70, aktivitaet: 'maessig', sportMinuten: 60, heiss: true });
faelle.push(
  { name: '70 kg mäßig, 60 min, heiß: Gesamt 4.000 ml', ist: h?.gesamtMl, soll: 4000 },
  { name: '70 kg mäßig, 60 min, heiß: Trinkmenge 1.512 + 700 + 500 = 2.712 ml', ist: h?.trinkmengeMl, soll: 2712 },
  { name: '70 kg mäßig, 60 min, heiß: 2,7 L', ist: h?.trinkmengeLiter, soll: 2.7 },
  { name: '70 kg mäßig, 60 min, heiß: 11 Gläser', ist: h?.anzahlGlaeser, soll: 11 },
);
// Stillzeit: Zuschlag erhöht den Gesamtbedarf und wird anteilig getrunken
const st = W({ gewicht: 65, schwangerStillend: 'stillend' });
faelle.push(
  { name: '65 kg stillend: Gesamt 2.275 + 700 = 2.975 ml', ist: st?.gesamtMl, soll: 2975 },
  { name: '65 kg stillend: Trinkmenge 2.975 × 0,54 = 1.606,5 → 1.607 ml', ist: st?.trinkmengeMl, soll: 1607 },
);
// Tabelle Aktivitätslevel (70 kg) — Spalte „davon trinken“
for (const [akt, soll] of [['kaum', 1.1], ['leicht', 1.3], ['maessig', 1.5], ['sehr', 1.7], ['extrem', 1.9]] as const) {
  faelle.push({ name: `Tabelle 70 kg ${akt}: davon trinken ${soll} L`, ist: W({ gewicht: 70, aktivitaet: akt })?.trinkmengeLiter, soll });
}

// Trinkmenge-Rechner (Sport): Startwerte 75 kg, Mann (33 ml/kg), 45 min, normales Klima
const t = berechneTrinkmenge(75, 33, 45, 1.0);
faelle.push(
  { name: 'Trinkmenge-Rechner Start: Gesamt 3,00 L', ist: t?.gesamtL, soll: 3.0, tol: 1e-9 },
  { name: 'Trinkmenge-Rechner Start: trinken 2.475 × 0,54 + 525 = 1,8615 L', ist: t?.trinkL, soll: 1.8615, tol: 1e-9 },
);
const t2 = berechneTrinkmenge(80, 33, 60, 1.2);
faelle.push(
  { name: 'Hitze-Beispiel 80 kg, 60 min, ×1,2: Gesamt 3,868 L', ist: t2?.gesamtL, soll: 3.868, tol: 1e-9 },
  { name: 'Hitze-Beispiel: trinken 1.425,6 + 528 + 700 = 2,6536 L', ist: t2?.trinkL, soll: 2.6536, tol: 1e-9 },
);
const t3 = berechneTrinkmenge(65, 31, 0, 1.1);
faelle.push(
  { name: 'Frau 65 kg, warm: Gesamt 2.015 × 1,1 = 2.216,5 ml', ist: t3?.gesamtMl, soll: 2216.5, tol: 1e-9 },
  { name: 'Frau 65 kg, warm: trinken 1.088,1 + 201,5 = 1.289,6 ml', ist: t3?.trinkMl, soll: 1289.6, tol: 1e-9 },
);
// Tabelle Trinkmenge-Seite (33 ml/kg): davon trinken
for (const [kg, soll] of [[50, 0.89], [60, 1.07], [70, 1.25], [80, 1.43], [90, 1.60], [100, 1.78]] as const) {
  faelle.push({ name: `Tabelle ${kg} kg: davon trinken ${soll.toFixed(2)} L`, ist: Math.round((berechneTrinkmenge(kg, 33, 0, 1)?.trinkL ?? 0) * 100) / 100, soll });
}

let ok = 0;
for (const f of faelle) {
  const gruen = typeof f.ist === 'number' && Math.abs(f.ist - f.soll) <= (f.tol ?? 1e-9);
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nWasserbedarf/Trinkmenge: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
