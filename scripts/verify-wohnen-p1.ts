// P1-Verifikation Welle 2 Stufe 3 Wohnen Block A.
// Ausführen: npx tsx scripts/verify-wohnen-p1.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   - DIA-Tabelle Grunderwerbsteuer 2026 (kapitalanlageimmobilien.net,
//     Stand 23.03.2026): Bremen 5,5 % seit 01.07.2025, Sachsen 5,5 % seit
//     01.01.2023, Thüringen 5,0 % seit 01.01.2024, Bayern 3,5 % unverändert
//     seit 2006, NRW 6,5 % unverändert.
//   - Bundesnetzagentur EEG-Förderung & -Fördersätze: 01.02.2026 –
//     31.07.2026: bis 10 kWp Teil 7,78 ct, voll 12,34 ct; bis 40 kWp Teil
//     6,73 ct, voll 10,35 ct. § 53 Abs. 1 EEG (Vergütung = aWert − 0,4 ct).
//     § 49 EEG 2023 (halbjährliche −1 %-Degression).
//   - § 12 BEG EM Richtlinie 29.12.2023, KfW-Merkblatt 458 (Stand 04/2026):
//     Grundförderung 30 %, Klimageschwindigkeit 20 %, Einkommen 30 %,
//     Effizienz 5 %, Cap bei 70 %, max. förderfähige Kosten 30.000 € pro 1. WE.

import {
  BUNDESLAENDER,
  getGrEStSatz,
  getGrEStSatzByLongKey,
  berechneGrunderwerbsteuer,
} from '../lib/berechnungen/grunderwerbsteuer';
import {
  getEegSatz,
  getMischVerguetung,
} from '../lib/berechnungen/eeg-einspeiseverguetung';
import {
  STROMPREIS_2026,
  getStrompreis,
} from '../lib/berechnungen/strompreis';
import {
  BEG_FOERDERUNG_2026,
  berechneBegFoerderquote,
  berechneBegZuschuss,
} from '../lib/berechnungen/beg-foerderung';
import { VPI_AKTUELL, VPI_JAHRESDURCHSCHNITTE } from '../lib/berechnungen/vpi';
import { berechneBaufinanzierung } from '../lib/berechnungen/baufinanzierung';

interface Fall {
  name: string;
  actual: number | string | boolean | null;
  expected: number | string | boolean | null;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// === GRUPPE 1: GrESt-SSOT Bundesländer (DIA 2026) ===

cases.push({ name: 'GrESt Bayern → 3,5 %', actual: getGrEStSatz('by'), expected: 3.5, quelle: 'DIA 2026, GrEStG BY' });
cases.push({ name: 'GrESt Bayern (Lang-Key) → 3,5 %', actual: getGrEStSatzByLongKey('bayern'), expected: 3.5, quelle: 'Lang-Key-API' });
cases.push({ name: 'GrESt NRW → 6,5 %', actual: getGrEStSatz('nw'), expected: 6.5, quelle: 'DIA 2026, GrEStG NW' });
cases.push({ name: 'GrESt Bremen → 5,5 % (seit 01.07.2025)', actual: getGrEStSatz('hb'), expected: 5.5, quelle: 'DIA 2026, GrEStG HB' });
cases.push({ name: 'GrESt Sachsen → 5,5 % (seit 01.01.2023)', actual: getGrEStSatz('sn'), expected: 5.5, quelle: 'DIA 2026, GrEStG SN' });
cases.push({ name: 'GrESt Thüringen → 5,0 % (seit 01.01.2024)', actual: getGrEStSatz('th'), expected: 5.0, quelle: 'DIA 2026, GrEStG TH' });
cases.push({ name: 'GrESt Hamburg → 5,5 %', actual: getGrEStSatz('hh'), expected: 5.5, quelle: 'DIA 2026, GrEStG HH' });
cases.push({ name: 'GrESt 16 Bundesländer in SSOT', actual: BUNDESLAENDER.length, expected: 16, quelle: 'Vollständigkeit' });

// === GRUPPE 2: Test-Liste GrESt-Rechner (Audit 1–5) ===

const tBay = berechneGrunderwerbsteuer({ kaufpreis: 400_000, bundesland: 'by', maklerProvision: 0, notarkosten: 0, grundbuch: 0 })!;
cases.push({ name: 'Test 1: Bayern 400.000 € → GrESt 14.000 €', actual: tBay.grunderwerbsteuer, expected: 14_000, quelle: '400.000 × 3,5 %' });

const tNW = berechneGrunderwerbsteuer({ kaufpreis: 400_000, bundesland: 'nw', maklerProvision: 0, notarkosten: 0, grundbuch: 0 })!;
cases.push({ name: 'Test 2: NRW 400.000 € → GrESt 26.000 €', actual: tNW.grunderwerbsteuer, expected: 26_000, quelle: '400.000 × 6,5 %' });

const tHB = berechneGrunderwerbsteuer({ kaufpreis: 300_000, bundesland: 'hb', maklerProvision: 0, notarkosten: 0, grundbuch: 0 })!;
cases.push({ name: 'Test 3: Bremen 300.000 € → GrESt 16.500 €', actual: tHB.grunderwerbsteuer, expected: 16_500, quelle: '300.000 × 5,5 %' });

const tSN = berechneGrunderwerbsteuer({ kaufpreis: 300_000, bundesland: 'sn', maklerProvision: 0, notarkosten: 0, grundbuch: 0 })!;
cases.push({ name: 'Test 4: Sachsen 300.000 € → GrESt 16.500 €', actual: tSN.grunderwerbsteuer, expected: 16_500, quelle: '300.000 × 5,5 %' });

const tTH = berechneGrunderwerbsteuer({ kaufpreis: 300_000, bundesland: 'th', maklerProvision: 0, notarkosten: 0, grundbuch: 0 })!;
cases.push({ name: 'Test 5: Thüringen 300.000 € → GrESt 15.000 €', actual: tTH.grunderwerbsteuer, expected: 15_000, quelle: '300.000 × 5,0 %' });

// === GRUPPE 3: Baufinanzierung mit korrekten GrESt-Sätzen ===

const tBauNW = berechneBaufinanzierung({
  kaufpreis: 350_000, eigenkapital: 70_000, bundesland: 'nordrhein-westfalen',
  sollzins: 3.5, tilgung: 2, zinsbindungJahre: 15, sondertilgungMonat: 0, nebenkostenEinrechnen: true,
})!;
// Nebenkosten = 350.000 × (6,5 % GrESt + 2 % Notar + 3,57 % Makler) = 350.000 × 12,07 % = 42.245 €
cases.push({ name: 'Test 6: Bau NRW 350k → Nebenkosten 42.245 €', actual: tBauNW.nebenkosten.gesamt, expected: 42_245, tol: 0.5, quelle: 'GrESt 6,5 + Notar 2 + Makler 3,57' });
cases.push({ name: 'Test 6: Bau NRW 350k → GrESt-Satz 6,5 %', actual: tBauNW.nebenkosten.grunderwerbsteuerSatz, expected: 6.5, quelle: 'SSOT NW' });
// Darlehen = 350.000 - 70.000 + 42.245 = 322.245
cases.push({ name: 'Test 6: Bau NRW 350k → Darlehen 322.245 €', actual: tBauNW.darlehen, expected: 322_245, tol: 0.5, quelle: '350k - 70k EK + 42.245 NK' });

const tBauBY = berechneBaufinanzierung({
  kaufpreis: 500_000, eigenkapital: 100_000, bundesland: 'bayern',
  sollzins: 3.8, tilgung: 2.5, zinsbindungJahre: 10, sondertilgungMonat: 0, nebenkostenEinrechnen: true,
})!;
// Nebenkosten = 500.000 × (3,5 + 2 + 3,57) % = 500.000 × 9,07 % = 45.350 €
cases.push({ name: 'Test 7: Bau Bayern 500k → Nebenkosten 45.350 €', actual: tBauBY.nebenkosten.gesamt, expected: 45_350, tol: 0.5, quelle: 'GrESt 3,5 + Notar 2 + Makler 3,57' });
cases.push({ name: 'Test 7: Bau Bayern 500k → GrESt-Satz 3,5 %', actual: tBauBY.nebenkosten.grunderwerbsteuerSatz, expected: 3.5, quelle: 'SSOT BY' });

// Sachsen-Bug-Regression: alte Lib hatte Sachsen 3,5 % hartcodiert
const tBauSN = berechneBaufinanzierung({
  kaufpreis: 300_000, eigenkapital: 60_000, bundesland: 'sachsen',
  sollzins: 3.5, tilgung: 2, zinsbindungJahre: 15, sondertilgungMonat: 0, nebenkostenEinrechnen: true,
})!;
cases.push({ name: 'Bau Sachsen 300k → GrESt-Satz 5,5 % (NICHT 3,5)', actual: tBauSN.nebenkosten.grunderwerbsteuerSatz, expected: 5.5, quelle: 'Sachsen-Bugfix Prompt 147' });

// === GRUPPE 4: EEG-Vergütung Stützpunkte (BNetzA 04/2026) ===

const eeg = getEegSatz(new Date('2026-04-25'));
cases.push({ name: 'EEG bis 10 kWp Teil → 7,78 ct/kWh', actual: eeg.bis10kWp_teil, expected: 7.78, quelle: 'BNetzA 01.02.2026' });
cases.push({ name: 'EEG bis 10 kWp Voll → 12,34 ct/kWh', actual: eeg.bis10kWp_voll, expected: 12.34, quelle: 'BNetzA 01.02.2026' });
cases.push({ name: 'EEG 10–40 kWp Teil → 6,73 ct/kWh', actual: eeg.bis40kWp_teil, expected: 6.73, quelle: 'BNetzA 01.02.2026' });
cases.push({ name: 'EEG 10–40 kWp Voll → 10,35 ct/kWh', actual: eeg.bis40kWp_voll, expected: 10.35, quelle: 'BNetzA 01.02.2026' });
cases.push({ name: 'EEG 40–100 kWp Teil → 5,50 ct/kWh', actual: eeg.bis100kWp_teil, expected: 5.50, quelle: 'BNetzA 01.02.2026' });
cases.push({ name: 'EEG 04/2026 NICHT Prognose', actual: eeg.prognose, expected: false, quelle: 'BNetzA bestätigt' });

// EEG halbjährlicher Switch zum 01.08.2026
const eegAug = getEegSatz(new Date('2026-08-15'));
cases.push({ name: 'EEG ab 01.08.2026 als Prognose markiert', actual: eegAug.prognose, expected: true, quelle: '§ 49 EEG 2023' });
cases.push({ name: 'EEG 08/2026 bis 10 kWp Teil → 7,71 ct (−1 %)', actual: eegAug.bis10kWp_teil, expected: 7.71, quelle: 'planm. Degression' });

// Mischvergütung 8 kWp → reiner bis10-Satz
cases.push({ name: 'EEG 8 kWp Misch (Teil) → 7,78 ct', actual: getMischVerguetung(8, 'teil', new Date('2026-04-25')), expected: 7.78, tol: 0.005, quelle: 'unter 10 kWp = bis10-Satz' });
// Mischvergütung 15 kWp → 10/15 × 7.78 + 5/15 × 6.73 = 5.187 + 2.243 = 7.43 ct
cases.push({ name: 'EEG 15 kWp Misch (Teil) → 7,43 ct', actual: getMischVerguetung(15, 'teil', new Date('2026-04-25')), expected: 7.43, tol: 0.01, quelle: '10/15 × 7,78 + 5/15 × 6,73' });

// === GRUPPE 5: Strompreis-SSOT (BDEW 04/2026) ===

cases.push({ name: 'Strompreis BDEW-Durchschnitt → 37 ct', actual: STROMPREIS_2026.durchschnitt_bdew, expected: 37, quelle: 'BDEW 04/2026' });
cases.push({ name: 'Strompreis Neukunden-Festpreis → 33 ct', actual: STROMPREIS_2026.neukunden_festpreis, expected: 33, quelle: 'Verivox/Check24' });
cases.push({ name: 'Strompreis Grundversorgung → 40 ct', actual: STROMPREIS_2026.grundversorgung, expected: 40, quelle: 'BDEW Worst-Case' });
cases.push({ name: 'Strompreis Wärmepumpen-Tarif → 28 ct', actual: STROMPREIS_2026.waermepumpen_tarif, expected: 28, quelle: 'HT-Spezialtarif' });
cases.push({ name: 'getStrompreis() → 37 ct (Default = BDEW)', actual: getStrompreis(), expected: 37, quelle: 'Default-API' });
cases.push({ name: 'getStrompreis(neukunden_festpreis) → 33', actual: getStrompreis('neukunden_festpreis'), expected: 33, quelle: 'Profil-API' });

// === GRUPPE 6: BEG-Förderung (KfW 458, Stand 04/2026) ===

cases.push({ name: 'BEG Grundförderung → 30 %', actual: BEG_FOERDERUNG_2026.grundfoerderung, expected: 30, quelle: '§ 12 BEG EM' });
cases.push({ name: 'BEG Klimageschwindigkeitsbonus → 20 %', actual: BEG_FOERDERUNG_2026.klimageschwindigkeitsbonus, expected: 20, quelle: 'KfW 458' });
cases.push({ name: 'BEG Einkommensbonus → 30 %', actual: BEG_FOERDERUNG_2026.einkommensbonus, expected: 30, quelle: 'KfW 458' });
cases.push({ name: 'BEG Effizienzbonus → 5 %', actual: BEG_FOERDERUNG_2026.effizienzbonus, expected: 5, quelle: 'KfW 458' });
cases.push({ name: 'BEG Max-Cap → 70 %', actual: BEG_FOERDERUNG_2026.maxGesamtfoerderung, expected: 70, quelle: 'KfW 458 Cap' });
cases.push({ name: 'BEG Einkommensgrenze → 40.000 €', actual: BEG_FOERDERUNG_2026.einkommensgrenze, expected: 40_000, quelle: 'KfW 458' });
cases.push({ name: 'BEG max. Kosten 1. WE → 30.000 €', actual: BEG_FOERDERUNG_2026.maxFoerderfaehigeKosten_einheit1, expected: 30_000, quelle: 'KfW 458' });

// Förderquoten-Berechnung
cases.push({ name: 'BEG nur Grund → 30 %', actual: berechneBegFoerderquote({ klimageschwindigkeit: false, einkommen: false, effizienz: false }), expected: 30, quelle: 'Grundförderung' });
cases.push({ name: 'BEG Grund + Klima → 50 %', actual: berechneBegFoerderquote({ klimageschwindigkeit: true, einkommen: false, effizienz: false }), expected: 50, quelle: '30 + 20' });
cases.push({ name: 'BEG Grund + Klima + Einkommen → 70 % (Cap)', actual: berechneBegFoerderquote({ klimageschwindigkeit: true, einkommen: true, effizienz: false }), expected: 70, quelle: 'Cap greift bei 80 → 70' });
cases.push({ name: 'BEG ALLE Boni → 70 % (NICHT 85, Cap)', actual: berechneBegFoerderquote({ klimageschwindigkeit: true, einkommen: true, effizienz: true }), expected: 70, quelle: 'Cap greift bei 85 → 70' });

// Zuschuss-Beispiel: 30.000 € Investition, 1 WE, 70 % → 21.000 €
cases.push({ name: 'BEG 30.000 €, 1 WE, ALLE Boni → 21.000 €', actual: berechneBegZuschuss(30_000, { klimageschwindigkeit: true, einkommen: true, effizienz: true }, 1), expected: 21_000, quelle: '30.000 × 70 %' });
// 30.000 € Investition, 1 WE, nur Grund 30 % → 9.000 €
cases.push({ name: 'BEG 30.000 €, 1 WE, nur Grund → 9.000 €', actual: berechneBegZuschuss(30_000, { klimageschwindigkeit: false, einkommen: false, effizienz: false }, 1), expected: 9_000, quelle: '30.000 × 30 %' });
// 50.000 € Investition gedeckelt auf 30.000 € (1 WE), 70 % → 21.000 €
cases.push({ name: 'BEG 50.000 €, 1 WE, ALLE Boni → 21.000 € (Cap auf 30.000 förderfähig)', actual: berechneBegZuschuss(50_000, { klimageschwindigkeit: true, einkommen: true, effizienz: true }, 1), expected: 21_000, quelle: '30.000 × 70 % (Investitions-Cap)' });

// === GRUPPE 7: VPI (Destatis März 2026) ===

cases.push({ name: 'VPI aktueller Monat → 2026-03', actual: VPI_AKTUELL.monat, expected: '2026-03', quelle: 'Destatis 10.04.2026' });
cases.push({ name: 'VPI März 2026 → 125,8', actual: VPI_AKTUELL.wert, expected: 125.8, quelle: 'Destatis VPI' });
cases.push({ name: 'VPI Veränd. Vorjahr → +2,7 %', actual: VPI_AKTUELL.veraenderungVorjahresmonat, expected: 2.7, quelle: 'Destatis' });
cases.push({ name: 'VPI 2025 Jahresdurchschnitt → 124,6', actual: VPI_JAHRESDURCHSCHNITTE[2025], expected: 124.6, quelle: 'Destatis Jahres-VPI' });
cases.push({ name: 'VPI 2020 Basisjahr → 100,0', actual: VPI_JAHRESDURCHSCHNITTE[2020], expected: 100.0, quelle: 'Destatis Basisjahr' });

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    ok = Math.abs(c.actual - c.expected) <= (c.tol ?? 0.005);
  } else {
    ok = c.actual === c.expected;
  }
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(14);
  const expectedStr = String(c.expected).padStart(14);
  console.log(`${mark} ${c.name.padEnd(64)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
