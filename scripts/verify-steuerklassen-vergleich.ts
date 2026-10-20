/**
 * Verify-Script für lib/berechnungen/steuerklassen-vergleich.ts (Welle-4 M4, 04.05.2026; W183 neu).
 *
 * W183: Die Lib rechnet Lohnsteuer, Soli und Kirchensteuer jetzt mit dem amtlichen PAP 2026
 * (_lohnsteuer-pap-2026.ts, gegen BMF-Stützpunkte geprüft in verify-lohnsteuer-pap.ts) und das
 * Faktorverfahren nach § 39f EStG. Vorher: Vorsorgepauschale pauschal 12 %, Näherung für Klasse V,
 * Pflegeversicherung immer ohne Kinderlosenzuschlag. Der alte Fall F-03 („Differenz zur
 * Splittingsteuer ≈ 0“) bildete den ungekürzten Faktor ab; jetzt F-07 mit der Rundung auf drei Stellen.
 *
 * Sollwerte, unabhängig von der Lib:
 *   - Cluster E: Klassen III und V gegen berechneBruttoNetto (eigener Weg zur Vorsorgepauschale,
 *     buildVorsorgeParams). Gleiche Werte heißen: die Lib bildet die Vorsorgepauschale gleich.
 *   - Cluster F: Faktor, Jahressteuer und Klasse-III-Lohnsteuer von Hand nach
 *       § 39b Abs. 2 Satz 5 Nr. 3 EStG / PAP 2026 (Vorsorgepauschale: RV 9,3 %, KV 7,0 % + halber
 *       Zusatzbeitrag 1,45 %, PV 1,8 % + 0,6 % Kinderlosenzuschlag, Höchstbetrag AV+KV+PV 1.900 €),
 *       § 32a EStG 2026 (Tarif, hier eigens nachgebaut), § 32a Abs. 5 (Splitting) und
 *       § 39f Abs. 1 EStG (Faktor = Y : X, drei Nachkommastellen ohne Rundung, nur wenn < 1):
 *       https://www.gesetze-im-internet.de/estg/__39f.html
 *   - Cluster K: Kinderlosenzuschlag zur PV (§ 55 Abs. 3 SGB XI): 0,6 % des Bruttos je Person.
 *
 * Ausführen: npx tsx scripts/verify-steuerklassen-vergleich.ts
 */

import {
  berechneSteuerklassenVergleich,
} from '../lib/berechnungen/steuerklassen-vergleich';
import { berechneBruttoNetto } from '../lib/berechnungen/brutto-netto';

type TestCase = {
  name: string;
  actual: number;
  expected: number;
  tolerance?: number;
};

const cases: TestCase[] = [];

const calc = (params: {
  b1?: number; b2?: number;
  k1?: boolean; k2?: boolean;
  satz?: 8 | 9; kfb?: number;
}) => berechneSteuerklassenVergleich({
  bruttoJahr1: params.b1 ?? 50000,
  bruttoJahr2: params.b2 ?? 30000,
  kirchensteuer1: params.k1 ?? false,
  kirchensteuer2: params.k2 ?? false,
  kirchensteuersatz: params.satz ?? 9,
  kinderfreibetraege: params.kfb ?? 0,
});

// === Cluster A: Output-Struktur ===

const a1 = calc({ b1: 60000, b2: 30000 });
cases.push(
  { name: 'A-01 Output: 3 Kombinationen (III/V, V/III, IV/IV mit Faktor)', actual: a1.kombinationen.length, expected: 3, tolerance: 0 },
  { name: 'A-02 Empfehlung-Name ist eines der drei Kombi-Namen',          actual: ['III/V', 'V/III', 'IV/IV mit Faktor'].includes(a1.empfehlung) ? 1 : 0, expected: 1, tolerance: 0 },
  { name: 'A-03 bruttoGesamt = brutto1 + brutto2',                         actual: a1.bruttoGesamt, expected: 60000 + 30000 },
  { name: 'A-04 Kombination-Reihenfolge: III/V | V/III | IV/IV mit Faktor', actual: a1.kombinationen[0].name === 'III/V' ? 1 : 0, expected: 1 },
  { name: 'A-04: kombinationen[2].name = IV/IV mit Faktor',                actual: a1.kombinationen[2].name === 'IV/IV mit Faktor' ? 1 : 0, expected: 1 },
);

// === Cluster B: Faktor-Verfahren § 39f EStG ===

cases.push(
  { name: 'B-01 III/V: faktor = undefined',                            actual: a1.kombinationen[0].faktor === undefined ? 1 : 0, expected: 1 },
  { name: 'B-02 V/III: faktor = undefined',                             actual: a1.kombinationen[1].faktor === undefined ? 1 : 0, expected: 1 },
  { name: 'B-03 IV/IV mit Faktor: faktor definiert',                    actual: a1.kombinationen[2].faktor !== undefined ? 1 : 0, expected: 1 },
  { name: 'B-04 IV/IV-Faktor in [0, 1]',                                actual: (a1.kombinationen[2].faktor! >= 0 && a1.kombinationen[2].faktor! <= 1) ? 1 : 0, expected: 1 },
  { name: 'B-05 Faktor hat höchstens drei Nachkommastellen',            actual: Math.abs(a1.kombinationen[2].faktor! * 1000 - Math.round(a1.kombinationen[2].faktor! * 1000)), expected: 0, tolerance: 1e-9 },
);
// Gleiche Bruttolöhne: Y = X, kein Faktor unter 1 (§ 39f: nur wenn kleiner als 1)
const b6 = calc({ b1: 45000, b2: 45000 });
cases.push(
  { name: 'B-06 45.000 + 45.000: Faktor = 1 (kein Splittingvorteil)',  actual: b6.kombinationen[2].faktor!, expected: 1, tolerance: 0 },
);

// === Cluster C: Splitting-ESt-Wert ist Lib-konstant über Kombinationen ===

const c1 = calc({ b1: 60000, b2: 30000 });
const c2 = calc({ b1: 30000, b2: 60000 }); // Vertauscht
cases.push(
  { name: 'C-01 jahressteuerSplitting symmetrisch: tausch P1↔P2 = gleicher Wert', actual: Math.abs(c1.jahressteuerSplitting - c2.jahressteuerSplitting), expected: 0, tolerance: 0.5 },
);

// === Cluster D: III/V vs. V/III — Empfehlung ist die mit höherem Netto ===

const d1 = calc({ b1: 60000, b2: 30000 });
cases.push(
  { name: 'D-01 P1>P2: III/V > V/III (Netto-Gesamt)',                  actual: d1.kombinationen[0].nettoGesamtMonat > d1.kombinationen[1].nettoGesamtMonat ? 1 : 0, expected: 1 },
);

// === Cluster E: III/V gegen berechneBruttoNetto (W183) ===
//
// Gleiche Annahmen wie die Lib: gesetzlich versichert, Zusatzbeitrag 2,9 %, PV-Kinder aus den
// Kinderfreibeträgen (0 → kinderlos), Kinderfreibeträge nur in Klasse III, nicht in Klasse V.

function bnPerson(brutto: number, sk: 3 | 5, kist: boolean, satz: 8 | 9, kfb: number) {
  const kinderUnter25 = kfb > 0 ? Math.max(1, Math.floor(kfb)) : 0;
  return berechneBruttoNetto({
    bruttoMonat: brutto / 12,
    steuerklasse: sk,
    kirchensteuer: kist,
    kirchensteuersatz: satz,
    kinderfreibetraege: sk === 5 ? 0 : kfb,
    kinderUnter25,
    bundesland: '',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: 2.9,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

const eFaelle: Array<{ tag: string; b1: number; b2: number; k1: boolean; k2: boolean; satz: 8 | 9; kfb: number }> = [
  { tag: '55k+35k kinderlos',            b1: 55000,  b2: 35000, k1: false, k2: false, satz: 9, kfb: 0 },
  { tag: '50k+25k, 2 Kinder, KiSt 8 %',  b1: 50000,  b2: 25000, k1: true,  k2: true,  satz: 8, kfb: 2 },
  { tag: '120k+18k (Übergangsbereich)',  b1: 120000, b2: 18000, k1: true,  k2: false, satz: 9, kfb: 1 },
  { tag: '70k+6k (Minijob, Kl. V)',      b1: 70000,  b2: 6000,  k1: false, k2: false, satz: 9, kfb: 0 },
];
for (const f of eFaelle) {
  const r = calc({ b1: f.b1, b2: f.b2, k1: f.k1, k2: f.k2, satz: f.satz, kfb: f.kfb });
  const iii = r.kombinationen[0];
  const p1 = bnPerson(f.b1, 3, f.k1, f.satz, f.kfb);
  const p2 = bnPerson(f.b2, 5, f.k2, f.satz, f.kfb);
  cases.push(
    { name: `E ${f.tag}: LSt III = Brutto-Netto`,   actual: iii.lohnsteuer1Monat, expected: p1.lohnsteuer },
    { name: `E ${f.tag}: LSt V = Brutto-Netto`,     actual: iii.lohnsteuer2Monat, expected: p2.lohnsteuer },
    { name: `E ${f.tag}: Soli III = Brutto-Netto`,  actual: iii.soli1Monat,       expected: p1.solidaritaet },
    { name: `E ${f.tag}: KiSt V = Brutto-Netto`,    actual: iii.kist2Monat,       expected: p2.kirchensteuer },
    { name: `E ${f.tag}: Netto III = Brutto-Netto`, actual: iii.netto1Monat,      expected: p1.nettoMonat },
    { name: `E ${f.tag}: Netto V = Brutto-Netto`,   actual: iii.netto2Monat,      expected: p2.nettoMonat },
  );
}

// === Cluster F: Faktor und Jahressteuer von Hand (W183) ===
//
// Tarif § 32a Abs. 1 EStG 2026, hier eigens nachgebaut (nicht aus der Lib):
function estTarif2026(zvE: number): number {
  const x = Math.floor(zvE);
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return Math.floor((914.51 * y + 1400) * y); }
  if (x <= 69878) { const z = (x - 17799) / 10000; return Math.floor((173.10 * z + 2397) * z + 1034.87); }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}
// zvE eines kinderlosen Arbeitnehmers (Jahr, ganze Euro) nach den Abzügen des § 39b Abs. 2 EStG:
// 1.230 € + 36 € + Vorsorgepauschale. Vorsorgepauschale in Cent, wie im PAP abgeschnitten/aufgerundet.
function zvEHand(brutto: number): number {
  const rv = Math.floor(Math.min(brutto, 101400) * 9.3);          // 9,3 % in Cent
  const kvpv = Math.floor(Math.min(brutto, 69750) * 10.85);       // 7,0 + 1,45 + 2,4 %
  const av = Math.floor(Math.min(brutto, 101400) * 1.3);          // 1,3 %
  const vsp = Math.ceil((rv + kvpv) / 100);
  const vspn = Math.ceil((rv + Math.min(190000, av + kvpv)) / 100); // Höchstbetrag 1.900 €
  return brutto - 1230 - 36 - Math.max(vsp, vspn);
}

const fB1 = 55000;
const fB2 = 35000;
const fZvE1 = zvEHand(fB1); // 55.000 − 1.266 − 11.083 = 42.651
const fZvE2 = zvEHand(fB2); // 35.000 − 1.266 − 7.053 = 26.681
const fY = 2 * estTarif2026(Math.floor((fZvE1 + fZvE2) / 2));  // Splitting
const fX = estTarif2026(fZvE1) + estTarif2026(fZvE2);          // Klasse IV = Grundtarif
const fFaktor = Math.floor((fY * 1000) / fX) / 1000;
const fr = calc({ b1: fB1, b2: fB2 });
const monat = (jahr: number) => Math.floor(Math.round(jahr * 100) / 12) / 100;
cases.push(
  { name: 'F-01 zvE 55.000 € von Hand = 42.651 €',                       actual: fZvE1, expected: 42651, tolerance: 0 },
  { name: 'F-01 zvE 35.000 € von Hand = 26.681 €',                       actual: fZvE2, expected: 26681, tolerance: 0 },
  { name: 'F-02 Jahressteuer Splitting (Y) = von Hand',                  actual: fr.jahressteuerSplitting, expected: fY, tolerance: 0 },
  { name: 'F-02 Y = 11.140 €',                                           actual: fY, expected: 11140, tolerance: 0 },
  { name: 'F-03 Faktor = Y : X, drei Stellen abgeschnitten',             actual: fr.kombinationen[2].faktor!, expected: fFaktor, tolerance: 0 },
  { name: 'F-03 Faktor = 0,980',                                         actual: fFaktor, expected: 0.98, tolerance: 0 },
  { name: 'F-04 LSt III (55.000 €) = 2 × ESt(zvE / 2) / 12',            actual: fr.kombinationen[0].lohnsteuer1Monat, expected: monat(2 * estTarif2026(Math.floor(fZvE1 / 2))) },
  { name: 'F-04 LSt III = 316,83 €/Monat',                               actual: fr.kombinationen[0].lohnsteuer1Monat, expected: 316.83 },
  { name: 'F-05 LSt IV mit Faktor (55.000 €) = ESt(zvE) × f / 12',      actual: fr.kombinationen[2].lohnsteuer1Monat, expected: monat(Math.floor(estTarif2026(fZvE1) * fFaktor)) },
  { name: 'F-05 LSt IV mit Faktor (35.000 €) = ESt(zvE) × f / 12',      actual: fr.kombinationen[2].lohnsteuer2Monat, expected: monat(Math.floor(estTarif2026(fZvE2) * fFaktor)) },
  { name: 'F-06 III/V: einbehalten − Y = −122,08 € (Nachzahlung)',       actual: fr.kombinationen[0].differenzZurSplitting, expected: -122.08 },
);
// Nach dem Abschneiden des Faktors bleibt höchstens 0,1 % von X plus Monatsrundung offen.
const f1 = calc({ b1: 60000, b2: 40000 });
const f1_iiiV = f1.kombinationen[0];
const f2 = f1.kombinationen[2];
cases.push(
  { name: 'F-07 IV/IV mit Faktor: |einbehalten − Y| ≤ 0,1 % von X + 1 €', actual: Math.abs(f2.differenzZurSplitting) <= f2.lohnsteuerGesamtJahr / f2.faktor! * 0.001 + 1 ? 1 : 0, expected: 1 },
  { name: 'F-08 III/V: nettoGesamtJahr ≈ nettoGesamtMonat × 12',          actual: f1_iiiV.nettoGesamtJahr, expected: Math.round(f1_iiiV.nettoGesamtMonat * 12 * 100) / 100, tolerance: 0.5 },
  { name: 'F-09 III/V: lohnsteuerGesamtJahr = (lst1+lst2)Monat × 12',    actual: f1_iiiV.lohnsteuerGesamtJahr, expected: Math.round((f1_iiiV.lohnsteuer1Monat + f1_iiiV.lohnsteuer2Monat) * 12 * 100) / 100, tolerance: 0.01 },
);

// === Cluster G: KiSt + Soli aktiv ===
const g1 = calc({ b1: 60000, b2: 40000, k1: true, k2: true, satz: 8 });
cases.push(
  { name: 'G-01 KiSt 8% aktiv: kist1Monat > 0',                         actual: g1.kombinationen[0].kist1Monat > 0 ? 1 : 0, expected: 1 },
  { name: 'G-02 ohne KiSt: kist1Monat = 0',                             actual: a1.kombinationen[0].kist1Monat, expected: 0 },
);

// === Cluster H: Edge — beide=0, Alleinverdiener ===
const h1 = calc({ b1: 0, b2: 0 });
cases.push(
  { name: 'H-01 beide=0: bruttoGesamt = 0',                             actual: h1.bruttoGesamt, expected: 0 },
  { name: 'H-01: jahressteuerSplitting = 0',                            actual: h1.jahressteuerSplitting, expected: 0 },
  { name: 'H-01: kombinationen[0].lohnsteuerGesamtJahr = 0',            actual: h1.kombinationen[0].lohnsteuerGesamtJahr, expected: 0 },
);
// Alleinverdiener: Klasse IV setzt zwei Arbeitslöhne voraus (§ 38b Abs. 1 Satz 2 Nr. 4 EStG) → kein Faktor.
const h2 = calc({ b1: 100000, b2: 0 });
cases.push(
  { name: 'H-02 Single-Earner P1=100k: empfehlung = III/V',             actual: h2.empfehlung === 'III/V' ? 1 : 0, expected: 1 },
  { name: 'H-03 Single-Earner P1=100k: Faktor = 1',                     actual: h2.kombinationen[2].faktor!, expected: 1, tolerance: 0 },
  { name: 'H-04 Single-Earner: III/V-LSt = Y (keine Nachzahlung)',      actual: h2.kombinationen[0].differenzZurSplitting, expected: 0, tolerance: 0.12 },
);

// === Cluster K: Kinderlosenzuschlag PV (W183, § 55 Abs. 3 SGB XI) ===
// Vorher rechnete die Lib immer mit 1,8 %. Kinderlos: + 0,6 % auf das Brutto (unter BBG KV).
const k0 = calc({ b1: 55000, b2: 35000, kfb: 0 });
const k1 = calc({ b1: 55000, b2: 35000, kfb: 1 });
const pvZuschlagHand = Math.round(55000 / 12 * 0.006 * 100) / 100 + Math.round(35000 / 12 * 0.006 * 100) / 100;
const nettoDiff = k1.kombinationen[0].nettoGesamtMonat - k0.kombinationen[0].nettoGesamtMonat;
cases.push(
  { name: 'K-01 PV-Zuschlag kinderlos (beide zusammen) = 45,00 €/Monat', actual: pvZuschlagHand, expected: 45, tolerance: 0.02 },
  // Netto mit Kind höher: 45 € weniger PV, aber etwas mehr Lohnsteuer (kleinere Vorsorgepauschale)
  // und weniger Soli/KiSt-Freibetragseffekt — Spanne statt Punktwert.
  { name: 'K-02 III/V Netto mit 1 Kind − kinderlos zwischen 25 und 45 €', actual: nettoDiff > 25 && nettoDiff < 45 ? 1 : 0, expected: 1 },
);

// === Ausgabe ===
let passed = 0;
let failed = 0;
for (const c of cases) {
  const tol = c.tolerance ?? 0.01;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const status = ok ? '✓' : '✗';
  console.log(`  ${status} ${c.name.padEnd(70)} ist ${String(c.actual).padStart(14)}  soll ${String(c.expected).padStart(14)}  Δ ${delta.toFixed(4).padStart(8)}`);
  if (ok) passed++; else failed++;
}
console.log('');
console.log(`Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
