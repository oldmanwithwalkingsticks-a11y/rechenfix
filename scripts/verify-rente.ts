/**
 * Verify-Script für lib/berechnungen/rente.ts (Welle 187).
 *
 * Anlass W187: Netto-Rente mit pauschal 10,85 % KV/PV, Besteuerungsanteil 83 % + 0,5 je Jahr bis zur Rente
 * (2058 → 99 %) und ohne Abzug von KV/PV und Pauschbeträgen vom zu versteuernden Einkommen.
 *
 * Externe Quellen (Sollwerte unten unabhängig von der Lib nachgerechnet):
 *   - § 22 Nr. 1 Satz 3 Buchst. a Doppelbuchst. aa EStG (Tabelle): Rentenbeginn 2023 82,5 %, 2024 83,0 %,
 *     2025 83,5 %, 2026 84,0 %, … 2058 100,0 %. https://www.gesetze-im-internet.de/estg/__22.html
 *   - § 249a SGB V: Rentner trägt die Hälfte des allgemeinen Beitragssatzes (14,6 % → 7,3 %) und den halben
 *     Zusatzbeitrag (Ø 2026 2,9 % → 1,45 %). https://www.gesetze-im-internet.de/sgb_5/__249a.html
 *   - § 59 Abs. 1 SGB XI: PV-Beiträge aus der Rente trägt der Rentner allein; § 55 Abs. 1/3 SGB XI: 3,6 %,
 *     Zuschlag für Kinderlose 0,6 Prozentpunkte. https://www.gesetze-im-internet.de/sgb_11/__55.html
 *   - § 9a Satz 1 Nr. 3 EStG: Werbungskosten-Pauschbetrag 102 € (Renten); § 10c EStG: 36 €;
 *     § 10 Abs. 1 Nr. 3 EStG: Basis-KV und PV als Sonderausgaben (keine 4-%-Kürzung ohne Krankengeldanspruch).
 *   - § 32a Abs. 1 EStG ab VZ 2026 (Tarif, unabhängig implementiert).
 *
 * Ausführen: npx tsx scripts/verify-rente.ts
 */

import { berechneRente, besteuerungsanteilRente, kvPvSatzRentner, RENTENWERT } from '../lib/berechnungen/rente';

function est2026(zvERoh: number): number {
  const x = Math.floor(zvERoh);
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return Math.floor((914.51 * y + 1400) * y); }
  if (x <= 69878) { const z = (x - 17799) / 10000; return Math.floor((173.10 * z + 2397) * z + 1034.87); }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}

const SV_KINDERLOS = 0.073 + 0.0145 + 0.036 + 0.006; // 12,95 %
const SV_MIT_KIND = 0.073 + 0.0145 + 0.036;          // 12,35 %

/** Unabhängige Netto-Näherung: Brutto − KV/PV − ESt/12 auf (Anteil × 12 × Brutto − 102 − 36 − 12 × KV/PV). */
function nettoUnabhaengig(brutto: number, anteilProzent: number, sv: number): number {
  const kvpv = brutto * sv;
  const zvE = Math.max(0, brutto * 12 * anteilProzent / 100 - 102 - 36 - 12 * kvpv);
  return brutto - kvpv - est2026(zvE) / 12;
}

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

// A: Besteuerungsanteil nach Tabelle § 22 EStG
faelle.push(
  { name: 'A-01 Rentenbeginn 2023 → 82,5 %', ist: besteuerungsanteilRente(2023), soll: 82.5 },
  { name: 'A-02 Rentenbeginn 2026 → 84,0 % (vorher 83 %)', ist: besteuerungsanteilRente(2026), soll: 84 },
  { name: 'A-03 Rentenbeginn 2027 → 84,5 %', ist: besteuerungsanteilRente(2027), soll: 84.5 },
  { name: 'A-04 Rentenbeginn 2040 → 91,0 %', ist: besteuerungsanteilRente(2040), soll: 91 },
  { name: 'A-05 Rentenbeginn 2058 → 100 % (vorher 99 %)', ist: besteuerungsanteilRente(2058), soll: 100 },
  { name: 'A-06 Rentenbeginn 2060 → 100 %', ist: besteuerungsanteilRente(2060), soll: 100 },
);

// B: KV/PV-Satz der Rentner
faelle.push(
  { name: 'B-01 KV/PV kinderlos 12,95 % (vorher 10,85 %)', ist: kvPvSatzRentner(true), soll: SV_KINDERLOS, tol: 1e-9 },
  { name: 'B-02 KV/PV mit Kindern 12,35 %', ist: kvPvSatzRentner(false), soll: SV_MIT_KIND, tol: 1e-9 },
);

// C: Startwerte der Komponente (35 J., 67, 3.500 €, 15 Beitragsjahre, +1,5 %, Wunsch 2.000 €)
// Entgeltpunkte unabhängig: 15 × 42.000 / 51.944 + Σ n=1..32 min(42.000 × 1,015^n, 101.400) / 51.944
let ep = 15 * 42000 / 51944;
for (let n = 1; n <= 32; n++) ep += Math.min(42000 * Math.pow(1.015, n), 101400) / 51944;
const bruttoStart = ep * RENTENWERT;
const nettoStart = nettoUnabhaengig(bruttoStart, 100, SV_KINDERLOS);
const startIn = { alter: 35, renteneintrittsalter: 67, monatsbrutto: 3500, beitragsjahre: 15, bekannteRentenpunkte: null, gehaltssteigerung: 1.5, gewuenschtesNetto: 2000 };
const c = berechneRente(startIn)!;
const cK = berechneRente({ ...startIn, kinderlos: false })!;
faelle.push(
  { name: 'C-01 Entgeltpunkte 45,52', ist: c.gesamtRentenpunkte, soll: Math.round(ep * 100) / 100 },
  { name: 'C-02 Brutto-Rente (Rentenwert 42,52 €) 1.935,55 €', ist: c.bruttoRente, soll: Math.round(bruttoStart * 100) / 100 },
  { name: 'C-03 Rentenbeginn 2058 → Anteil 100 %', ist: c.steuerpflichtAnteil, soll: 100 },
  { name: 'C-04 Netto kinderlos ≈ 1.552,40 € (vorher 1.531,71 €)', ist: c.nettoRente, soll: Math.round(nettoStart * 100) / 100, tol: 0.011 },
  { name: 'C-05 Rentenlücke ≈ 447,60 € (vorher 468,29 €)', ist: c.rentenluecke, soll: Math.round((2000 - nettoStart) * 100) / 100, tol: 0.011 },
  { name: 'C-06 Netto mit Kindern ≈ 1.561,09 €', ist: cK.nettoRente, soll: Math.round(nettoUnabhaengig(bruttoStart, 100, SV_MIT_KIND) * 100) / 100, tol: 0.011 },
  { name: 'C-07 KV/PV-Beitrag 12,95 % × Brutto', ist: c.kvPvMonat, soll: Math.round(bruttoStart * SV_KINDERLOS * 100) / 100, tol: 0.011 },
);

// D: Seitenbeispiel 45 EP, Rentenbeginn 2026 (Anteil 84 %), kinderlos: 1.913,40 € → ≈ 1.609,86 €; 1.835,55 € → ≈ 1.553,35 €
// (über die Lib-Bausteine, da berechneRente den Rentenbeginn aus dem Alter ableitet)
const nettoLib = (b: number, jahr: number) => {
  const sv = b * kvPvSatzRentner(true);
  const zvE = Math.max(0, b * 12 * besteuerungsanteilRente(jahr) / 100 - 102 - 36 - 12 * sv);
  return b - sv - est2026(zvE) / 12;
};
faelle.push(
  { name: 'D-01 Seite: 1.913,40 € Brutto → netto ≈ 1.609,86 €', ist: nettoLib(1913.40, 2026), soll: nettoUnabhaengig(1913.40, 84, SV_KINDERLOS), tol: 0.005 },
  { name: 'D-02 Seite: 1.913,40 € → 1.609,86 € (Textwert)', ist: Math.round(nettoUnabhaengig(1913.40, 84, SV_KINDERLOS) * 100) / 100, soll: 1609.86, tol: 0.005 },
  { name: 'D-03 Seite: 1.835,55 € → ≈ 1.553,35 €', ist: Math.round(nettoUnabhaengig(1835.55, 84, SV_KINDERLOS) * 100) / 100, soll: 1553.35, tol: 0.005 },
);

// E: Rentenbeginn im Folgejahr über berechneRente (66 → 67 Jahre): Anteil 84,5 %
const e = berechneRente({ alter: 66, renteneintrittsalter: 67, monatsbrutto: 3500, beitragsjahre: 45, bekannteRentenpunkte: 45, gehaltssteigerung: 0, gewuenschtesNetto: 2000 })!;
faelle.push(
  { name: 'E-01 Rentenbeginn 2027 → Anteil 84,5 %', ist: e.steuerpflichtAnteil, soll: 84.5 },
  { name: 'E-02 Netto = unabhängige Näherung', ist: e.nettoRente, soll: Math.round(nettoUnabhaengig(e.bruttoRente, 84.5, SV_KINDERLOS) * 100) / 100, tol: 0.011 },
);

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005);
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(56)} ist ${f.ist.toFixed(4).padStart(12)}  soll ${f.soll.toFixed(4).padStart(12)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
