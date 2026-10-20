/**
 * Verify-Script für lib/berechnungen/sonnenschutz.ts (Welle 187).
 *
 * Anlass: Die Lib behandelte die Eigenschutzzeit-Tabelle (Typ II 10–20 min usw.) als Wert bei
 * UV-Index 3 und rechnete sie mit 3 / UV-Mitte herunter (Typ II, UV 6–7: 7 min). Dieser Bezug ist
 * unbelegt; die Richtwerte beschreiben die Mittagssonne im mitteleuropäischen Sommer.
 *
 * Externe Quellen:
 *   - SSK (1997), Schutz des Menschen vor solarer UV-Strahlung: Hauttyp II „im Sommer in Mitteleuropa
 *     um die Mittagszeit ungefähr 20 Minuten“.
 *   - BfS, Die verschiedenen Hauttypen (Fragebogen „Mittagszeit im Frühsommer in Deutschland bei
 *     wolkenlosem Himmel“); BfS, Was ist der UV-Index? (Sommer: Werte von 8 bis 9).
 *   - BfS, UV-Schutz durch Sonnencreme: theoretische Schutzdauer höchstens zu 60 % ausschöpfen;
 *     BfS, Tipps zum UV-Schutz: LSF mindestens 30.
 *   - WHO, Global Solar UV Index (2002): UVI ∝ erythemwirksame Bestrahlungsstärke (k = 40 m²/W).
 *   Modell (Annahme, offen gekennzeichnet): Tabellenmittel × min(1, 8 / UV-Mitte), × LSF × 0,6.
 *   Plausibilität: MED Typ II ≈ 250 J/m², UVI 8 = 0,2 W/m² → 1.250 s ≈ 21 min (passt zu SSK 20 min).
 *
 * Ausführen: npx tsx scripts/verify-sonnenschutz.ts
 */

import { berechneSonnenschutz } from '../lib/berechnungen/sonnenschutz';

type Fall = { name: string; ist: number | undefined; soll: number };
const faelle: Fall[] = [];
const S = (typ: string, uv: string, lsf: number) => berechneSonnenschutz(typ, uv, lsf);

// Startwerte der Komponente / Seitenbeispiel: Typ II, UV 6–7, LSF 30
const start = S('2', '6-7', 30);
faelle.push(
  { name: 'Start Typ II/UV 6–7: Eigenschutz 15 min (vorher 7)', ist: start?.eigenschutzzeit, soll: 15 },
  { name: 'Start: geschützt 15 × 30 × 0,6 = 270 min (vorher 126)', ist: start?.geschuetzteZeit, soll: 270 },
  { name: 'Start: Nachcremen 135 min (vorher 63)', ist: start?.nachcremenNach, soll: 135 },
  { name: 'Start: empfohlener LSF 30 (⌈120/15/0,6⌉ = 14, Untergrenze 30 nach BfS)', ist: start?.empfohlenerLsf, soll: 30 },
);
// Keine Verlängerung unter UV 8
faelle.push(
  { name: 'Typ II, UV 3–5: 15 min (keine Verlängerung)', ist: S('2', '3-5', 30)?.eigenschutzzeit, soll: 15 },
  { name: 'Typ II, UV 3–5, LSF 30: 270 min (Seiten-Beispielrechnung)', ist: S('2', '3-5', 30)?.geschuetzteZeit, soll: 270 },
  { name: 'Typ II, UV 1–2: 15 min (keine Verlängerung)', ist: S('2', '1-2', 30)?.eigenschutzzeit, soll: 15 },
  { name: 'Typ VI, UV 1–2: 90 min (keine Verlängerung)', ist: S('6', '1-2', 30)?.eigenschutzzeit, soll: 90 },
);
// Verkürzung über UV 8
faelle.push(
  { name: 'Typ II, UV 8–10: 15 × 8/9 = 13,3 → 13 min', ist: S('2', '8-10', 30)?.eigenschutzzeit, soll: 13 },
  { name: 'Typ II, UV 8–10, LSF 30: 13 × 30 × 0,6 = 234 min', ist: S('2', '8-10', 30)?.geschuetzteZeit, soll: 234 },
  { name: 'Typ II, UV 8–10: Nachcremen 117 min', ist: S('2', '8-10', 30)?.nachcremenNach, soll: 117 },
  { name: 'Typ II, UV 11+: 15 × 8/12 = 10 min', ist: S('2', '11+', 30)?.eigenschutzzeit, soll: 10 },
  { name: 'Typ II, UV 11+, LSF 30: 180 min', ist: S('2', '11+', 30)?.geschuetzteZeit, soll: 180 },
  { name: 'Typ I, UV 11+: 7,5 × 8/12 = 5 min', ist: S('1', '11+', 50)?.eigenschutzzeit, soll: 5 },
  { name: 'Typ I, UV 11+: empfohlen ⌈120/5/0,6⌉ = 40 → LSF 50', ist: S('1', '11+', 50)?.empfohlenerLsf, soll: 50 },
  { name: 'Typ I, UV 6–7: 7,5 → 8 min', ist: S('1', '6-7', 30)?.eigenschutzzeit, soll: 8 },
  { name: 'Typ IV, UV 8–10: 37,5 × 8/9 = 33,3 → 33 min', ist: S('4', '8-10', 30)?.eigenschutzzeit, soll: 33 },
  { name: 'Typ III, UV 11+: 25 × 8/12 = 16,7 → 17 min', ist: S('3', '11+', 30)?.eigenschutzzeit, soll: 17 },
);
// Empfehlung nie unter LSF 30
faelle.push({ name: 'Typ VI, UV 1–2: empfohlen LSF 30 (vorher 15)', ist: S('6', '1-2', 30)?.empfohlenerLsf, soll: 30 });

let ok = 0;
for (const f of faelle) {
  const gruen = f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nSonnenschutz: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
