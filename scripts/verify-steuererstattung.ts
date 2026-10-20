/**
 * Verify-Script für lib/berechnungen/steuererstattung.ts (Welle 187).
 *
 * Anlass W187: Der Grenzsteuersatz kam aus dem Brutto statt aus dem zvE (40.000 € → 32 % statt ≈ 28,4 %),
 * und Homeoffice-Tage wurden doppelt gezählt (Entfernungspauschale für alle Arbeitstage plus Tagespauschale).
 *
 * Externe Quellen (Sollwerte unten unabhängig von der Lib nachgerechnet):
 *   - § 32a Abs. 1 EStG ab VZ 2026: Zone 2 (914,51 · y + 1.400) · y; Zone 3 (173,10 · z + 2.397) · z + 1.034,87;
 *     Zone 4 0,42 · x − 11.135,63; zvE auf volle Euro abgerundet. https://www.gesetze-im-internet.de/estg/__32a.html
 *   - § 32a Abs. 5 EStG (Splitting): 2 × ESt(zvE / 2).
 *   - § 9 Abs. 1 Satz 3 Nr. 4 Satz 2 EStG: 0,38 € je vollem Kilometer „für jeden Arbeitstag, an dem der Arbeitnehmer
 *     die erste Tätigkeitsstätte aufsucht“. https://www.gesetze-im-internet.de/estg/__9.html
 *   - § 4 Abs. 5 Satz 1 Nr. 6c EStG: 6 € je Tag ohne Aufsuchen der ersten Tätigkeitsstätte, höchstens 1.260 €.
 *     https://www.gesetze-im-internet.de/estg/__4.html
 *   - § 9a Satz 1 Nr. 1 Buchst. a EStG: Arbeitnehmer-Pauschbetrag 1.230 €; § 10c EStG: Sonderausgaben-Pauschbetrag 36 €
 *     „wenn der Steuerpflichtige nicht höhere Aufwendungen nachweist“, bei Zusammenveranlagung 72 €.
 *   - § 39b Abs. 2 Satz 5 Nr. 3 EStG (Vorsorgepauschale 2026): RV 9,3 %; KV ermäßigter Satz 14,0 % / 2 = 7,0 %
 *     + halber Ø-Zusatzbeitrag 2,9 % / 2 = 1,45 %; PV 1,8 % + 0,6 % Kinderlosenzuschlag = 2,4 %.
 *     → zvE(40.000 €, Klasse I) = 40.000 − 1.230 − 36 − 3.720 − 40.000 × 10,85 % = 30.674 €.
 *
 * Ausführen: npx tsx scripts/verify-steuererstattung.ts
 */

import { berechneSteuererstattung, type SteuererstattungEingabe } from '../lib/berechnungen/steuererstattung';

// Unabhängiger Tarif § 32a EStG 2026 (nicht aus der Lib importiert)
function est2026(zvERoh: number): number {
  const x = Math.floor(zvERoh);
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return Math.floor((914.51 * y + 1400) * y); }
  if (x <= 69878) { const z = (x - 17799) / 10000; return Math.floor((173.10 * z + 2397) * z + 1034.87); }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}
const split2026 = (zvE: number) => 2 * est2026(Math.floor(zvE / 2));

// Unabhängige zvE-Schätzung Klasse I, kinderlos, unter den Beitragsbemessungsgrenzen
const zvEKlasse1 = (brutto: number) => brutto - 1230 - 36 - brutto * 0.093 - brutto * (0.07 + 0.0145 + 0.024);

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

const basis: SteuererstattungEingabe = {
  jahresbrutto: 40000, steuerklasse: 1, entfernungKm: 15, arbeitstage: 220, homeofficeTage: 50,
  beruflicheAusgaben: 0, kirchensteuer: false, haushaltsnaheDL: 0, spenden: 0,
};
const R = (o: Partial<SteuererstattungEingabe>) => berechneSteuererstattung({ ...basis, ...o });

const z40 = zvEKlasse1(40000); // 30.674
const z50 = zvEKlasse1(50000); // 38.659

// A: Startwerte der Komponente (40.000 €, Kl. I, 15 km, 220 Arbeitstage, davon 50 Homeoffice)
const a = R({});
faelle.push(
  { name: 'A-01 zvE-Schätzung 40.000 € Kl. I',            ist: a.zvEGeschaetzt, soll: z40, tol: 1 },
  { name: 'A-02 Pendeltage 220 − 50',                      ist: a.pendeltage, soll: 170 },
  { name: 'A-03 Pendlerpauschale 15 × 170 × 0,38',         ist: a.pendlerpauschale, soll: 969 },
  { name: 'A-04 Werbungskosten 969 + 300',                 ist: a.werbungskostenGesamt, soll: 1269 },
  { name: 'A-05 über Pauschbetrag 1.269 − 1.230',          ist: a.werbungskostenUeberPauschbetrag, soll: 39 },
  { name: 'A-06 Erstattung ESt(30.674) − ESt(30.635)',     ist: a.geschaetzteErstattung, soll: est2026(z40) - est2026(z40 - 39) },
  // Grenzsteuersatz Zone 3: (2 · 173,10 · z + 2.397) / 10.000 mit z = (30.674 − 17.799) / 10.000
  { name: 'A-07 Grenzsteuersatz ≈ 28,43 % (nicht 32 %)',  ist: a.grenzsteuersatz, soll: (2 * 173.10 * ((z40 - 17799) / 10000) + 2397) / 10000, tol: 0.0005 },
);

// B: Seitenbeispiel (25 km statt 15 km)
const b = R({ entfernungKm: 25 });
faelle.push(
  { name: 'B-01 Pendlerpauschale 25 × 170 × 0,38',         ist: b.pendlerpauschale, soll: 1615 },
  { name: 'B-02 Werbungskosten 1.615 + 300',               ist: b.werbungskostenGesamt, soll: 1915 },
  { name: 'B-03 über Pauschbetrag',                        ist: b.werbungskostenUeberPauschbetrag, soll: 685 },
  { name: 'B-04 Erstattung ESt-Differenz (≈ 193 €)',       ist: b.geschaetzteErstattung, soll: est2026(z40) - est2026(z40 - 685) },
  { name: 'B-05 Erstattung = 193 €',                        ist: b.geschaetzteErstattung, soll: 193 },
);

// C: Beispielrechnung der Seite (50.000 €, 25 km, 220 Arbeitstage, davon 40 HO, 500 € Ausgaben, 1.000 € DL, 300 € Spenden)
const cIn = { jahresbrutto: 50000, entfernungKm: 25, homeofficeTage: 40, beruflicheAusgaben: 500, haushaltsnaheDL: 1000, spenden: 300 };
const c = R(cIn);
const cWK = est2026(z50) - est2026(z50 - 1220);
const cSA = est2026(z50 - 1220) - est2026(z50 - 1220 - (300 - 36));
faelle.push(
  { name: 'C-01 Pendlerpauschale 25 × 180 × 0,38',         ist: c.pendlerpauschale, soll: 1710 },
  { name: 'C-02 Werbungskosten 1.710 + 240 + 500',         ist: c.werbungskostenGesamt, soll: 2450 },
  { name: 'C-03 ESt-Ersparnis Werbungskosten (378 €)',     ist: c.steuerersparnisWerbungskosten, soll: cWK },
  { name: 'C-04 Haushaltsnahe DL 20 % von 1.000 €',        ist: c.steuerersparnisHaushaltsnaheDL, soll: 200 },
  { name: 'C-05 Spenden (300 − 36) ohne KiSt (81 €)',      ist: c.steuerersparnisSonderausgaben, soll: cSA },
  { name: 'C-06 Erstattung gesamt 659 €',                   ist: c.geschaetzteErstattung, soll: 659 },
  { name: 'C-07 Posten-Summe = Erstattung',                 ist: c.posten.reduce((s, p) => s + p.betrag, 0), soll: c.geschaetzteErstattung },
);
const cK = R({ ...cIn, kirchensteuer: true });
faelle.push(
  { name: 'C-08 Spenden mit KiSt: voller Betrag 300 €',    ist: cK.steuerersparnisSonderausgaben, soll: est2026(z50 - 1220) - est2026(z50 - 1220 - 300) },
);

// D: Steuerklasse III — Splittingtarif, Partner ohne Einkommen (zvE wie Kl. I bis auf Mindestvorsorge, hier gleich)
const d = R({ entfernungKm: 25, steuerklasse: 3 });
faelle.push(
  { name: 'D-01 Kl. III Splitting: 2·ESt(zvE/2)-Differenz', ist: d.geschaetzteErstattung, soll: split2026(z40) - split2026(z40 - 685) },
);

// E: Randfälle
faelle.push(
  { name: 'E-01 Homeoffice > Arbeitstage → 0 Pendeltage',  ist: R({ homeofficeTage: 230 }).pendeltage, soll: 0 },
  { name: 'E-02 Tagespauschale gedeckelt 1.260 €',          ist: R({ arbeitstage: 230, homeofficeTage: 230 }).homeofficePauschale, soll: 1260 },
  { name: 'E-03 nur volle km: 12,7 km × 220 × 0,38',        ist: R({ entfernungKm: 12.7, homeofficeTage: 0 }).pendlerpauschale, soll: 12 * 220 * 0.38 },
  { name: 'E-04 unter Pauschbetrag → 0 € Erstattung',       ist: R({ entfernungKm: 5 }).geschaetzteErstattung, soll: 0 },
);

let rot = 0;
for (const f of faelle) {
  const ok = Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005);
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(54)} ist ${f.ist.toFixed(4).padStart(12)}  soll ${f.soll.toFixed(4).padStart(12)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
