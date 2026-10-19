// Phase-P1-Verifikation Midijob-Rechner (Stufe-4a Prompt 125a).
// Ausführen: npx tsx scripts/verify-midijob-p1.ts
//
// Testet die drei P1-Bugs aus dem Stufe-4a-Audit (Prompt 114):
//  1. BE-Formel-Konstanten (F × G statt F × OG) — strukturell via
//     getBeitragsFormeln-Ableitung abgesichert
//  2. Steuerklassen-Faktor × 1,15 entfernt — LSt via berechneLohnsteuerJahr
//  3. Soli-Schwellen-Bug — Soli via berechneSoli (nutzt Milderungszone)
//
// Plus: Trennung BE_gesamt vs. BE_AN (§ 20 Abs. 2a Satz 1 vs. Satz 6 SGB IV),
// die in 115a noch nicht sauber umgesetzt war (Einzelfunktion hat BE_gesamt
// gerechnet, aber als "BE_AN" bezeichnet → AN-Vorteil überschätzt).
//
// Externe Oracle-Quellen:
//  - § 20 Abs. 2 und 2a SGB IV (gesetze-im-internet.de)
//  - § 70 Abs. 1a SGB VI (Entgeltpunkte aus dem tatsächlichen Entgelt)
//  - BMAS-Bekanntmachung Faktor F 2026 (gemeinsames Rundschreiben der
//    SV-Spitzenverbände, GKV-Spitzenverband/DRV Bund/BA)
//  - DRV-Übergangsbereichsrechner als Oracle für MJ-02 (Karsten manuell)

import {
  berechneBemessungsgrundlageGesamt,
  berechneBemessungsgrundlageAN,
  istImUebergangsbereich,
} from '../lib/berechnungen/midijob-uebergang';
import {
  getAktuelleMidijobParameter,
  getBeitragsFormeln,
} from '../lib/berechnungen/midijob-parameter';
import { berechneLohnsteuerJahr } from '../lib/berechnungen/lohnsteuer';
import { berechneSoli } from '../lib/berechnungen/einkommensteuer';
import { KV_BASISSATZ_AN_2026, RV_SATZ_AN_2026, AV_SATZ_AN_2026, berechneBruttoNetto } from '../lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 } from '../lib/berechnungen/sv-parameter';
import { pvAnteilAn2026, PV_BASIS_SATZ_2026 } from '../lib/berechnungen/pflegeversicherung';

interface Fall {
  name: string;
  actual: number;
  expected: number;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// ============================================================================
// GRUPPE 1: Formel-Konstanten korrekt aus F, G, OG abgeleitet
// ============================================================================

{
  const params = getAktuelleMidijobParameter();
  const f = getBeitragsFormeln(params);

  cases.push({
    name: 'PARAMS F = 0,6619 (2026 BMAS-Bekanntmachung)',
    actual: params.faktorF, expected: 0.6619, tol: 0.00001,
    quelle: 'BMAS-Bekanntmachung Faktor F 2026',
  });
  cases.push({
    name: 'PARAMS G = 603 (§ 8 SGB IV Minijob-Grenze 2026)',
    actual: params.geringfuegigkeitsgrenzeG, expected: 603,
    quelle: '§ 8 Abs. 1a SGB IV',
  });
  cases.push({
    name: 'PARAMS OG = 2.000 (konstant seit 01.01.2023)',
    actual: params.obergrenzeOG, expected: 2000,
    quelle: '§ 20 Abs. 2 SGB IV',
  });

  // Abgeleitete Formel-Konstanten — verhindern den F×OG/F×G-Bug strukturell
  cases.push({
    name: 'FORMEL faktorGesamt = (OG − F×G) / (OG − G) ≈ 1,145937',
    actual: f.faktorGesamt, expected: 1.145937, tol: 0.00001,
    quelle: '§ 20 Abs. 2a Satz 1 SGB IV — Linearform',
  });
  cases.push({
    name: 'FORMEL faktorAN = OG / (OG − G) ≈ 1,431639',
    actual: f.faktorAN, expected: 1.431639, tol: 0.00001,
    quelle: '§ 20 Abs. 2a Satz 6 SGB IV — F-unabhängig',
  });
  cases.push({
    name: 'FORMEL konstanteAN = faktorAN × G ≈ 863,278',
    actual: f.konstanteAN, expected: 863.278, tol: 0.001,
    quelle: '§ 20 Abs. 2a Satz 6 SGB IV',
  });
}

// ============================================================================
// GRUPPE 2: MJ-01 bis MJ-05 — BE-Berechnung an Stützpunkten
// ============================================================================

// MJ-01: Untergrenze — BE_gesamt ≈ F × G, BE_AN ≈ 0
cases.push({
  name: 'MJ-01 AE = 603,01 (UG): BE_gesamt ≈ 399,13 (= F × G)',
  actual: berechneBemessungsgrundlageGesamt(603.01), expected: 399.1257 + 0.0115,
  tol: 0.05, // kleine Abweichung durch AE=603,01 > G=603
  quelle: '§ 20 Abs. 2a Satz 1 SGB IV, AE knapp über G',
});
cases.push({
  name: 'MJ-01 AE = 603,01: BE_AN ≈ 0 (AN zahlt faktisch nichts)',
  actual: berechneBemessungsgrundlageAN(603.01), expected: 0.0143, tol: 0.01,
  quelle: '§ 20 Abs. 2a Satz 6 SGB IV — BE_AN startet bei AE = G mit 0',
});

// MJ-02: Mitte — Oracle-Check gegen DRV
// BE_gesamt = 1,145937 × 1500 − 291,8744 = 1718,91 − 291,87 = 1.427,03
// BE_AN = 1,431639 × 1500 − 863,28 = 2147,46 − 863,28 = 1.284,18
cases.push({
  name: 'MJ-02 AE = 1.500: BE_gesamt = 1.427,03 (Oracle DRV)',
  actual: berechneBemessungsgrundlageGesamt(1500), expected: 1427.03, tol: 0.01,
  quelle: 'Lineare Interpolation F × G + slope × (AE − G), Oracle DRV-Rechner',
});
cases.push({
  name: 'MJ-02 AE = 1.500: BE_AN = 1.284,18 (Oracle DRV)',
  actual: berechneBemessungsgrundlageAN(1500), expected: 1284.18, tol: 0.01,
  quelle: '§ 20 Abs. 2a Satz 6 SGB IV — Oracle DRV-Rechner',
});
// Strukturell: BE_AN < BE_gesamt (AN-Vorteil)
cases.push({
  name: 'MJ-02 Invariante: BE_AN < BE_gesamt (AN-Vorteil existiert)',
  actual: berechneBemessungsgrundlageAN(1500) < berechneBemessungsgrundlageGesamt(1500) ? 1 : 0,
  expected: 1,
  quelle: 'Strukturelle Invariante aus Abs. 2 vs. Abs. 2a Formeln',
});

// MJ-03: Obergrenze — BE_gesamt = BE_AN = OG
cases.push({
  name: 'MJ-03 AE = 2.000 (OG): BE_gesamt = 2.000 (kein Midijob-Effekt)',
  actual: berechneBemessungsgrundlageGesamt(2000), expected: 2000, tol: 0.01,
  quelle: 'Randbedingung Abs. 2: BE_gesamt(OG) = OG',
});
cases.push({
  name: 'MJ-03 AE = 2.000 (OG): BE_AN = 2.000 (kein Midijob-Effekt)',
  actual: berechneBemessungsgrundlageAN(2000), expected: 2000, tol: 0.01,
  quelle: 'Randbedingung Abs. 2a: BE_AN(OG) = OG',
});

// MJ-04: Außerhalb unten (Minijob-Bereich)
cases.push({
  name: 'MJ-04 AE = 500 (< UG): istImUebergangsbereich = false',
  actual: istImUebergangsbereich(500) ? 1 : 0, expected: 0,
  quelle: 'AE unter Minijob-Grenze — kein Midijob',
});
cases.push({
  name: 'MJ-04 AE = 500: BE_gesamt = NaN',
  actual: Number.isNaN(berechneBemessungsgrundlageGesamt(500)) ? 1 : 0, expected: 1,
  quelle: 'Außerhalb Übergangsbereich: Lib liefert NaN',
});

// MJ-05: Außerhalb oben (normaler AN)
cases.push({
  name: 'MJ-05 AE = 2.500 (> OG): istImUebergangsbereich = false',
  actual: istImUebergangsbereich(2500) ? 1 : 0, expected: 0,
  quelle: 'AE über Obergrenze — normaler Beschäftigter',
});

// ============================================================================
// GRUPPE 3: MJ-SOLI — Soli fällt bei Midijob nie an
// ============================================================================

// Monatlicher Max-Midijob = 2.000 € → Jahres-Brutto 24.000 €. Soli-Freigrenze
// für Grundtarif 2026: 20.350 € ESt (≈ zvE 39.900 €). Midijob liegt klar drunter.
{
  // Max-Midijob: 2.000 €/Monat, StKl I, Jahres-LSt
  const lstJahr = berechneLohnsteuerJahr(2000 * 12, 1, 0);
  const soli = berechneSoli(lstJahr, false, 2026);
  cases.push({
    name: 'MJ-SOLI AE = 2.000, StKl I: Soli = 0 (unter Freigrenze)',
    actual: soli, expected: 0, tol: 0.01,
    quelle: '§ 4 SolzG mit Freigrenze 20.350 € — Midijob 24.000 €/Jahr liegt deutlich drunter',
  });
}

// ============================================================================
// GRUPPE 4: MJ-STKL — Steuerklassen-Vergleich OHNE × 1,15-Faktor
// ============================================================================

{
  // Bei AE = 1.500 €/Monat → 18.000 € Jahres-Brutto
  // StKl I vs. StKl V: LSt-Werte dürfen NICHT im Verhältnis 1:1,15 stehen,
  // sondern folgen § 39b PAP (separate Tariftabellen pro Klasse).
  const lstI = berechneLohnsteuerJahr(1500 * 12, 1, 0);
  const lstV = berechneLohnsteuerJahr(1500 * 12, 5, 0);

  cases.push({
    name: 'MJ-STKL LSt StKl I > 0 (basis)',
    actual: lstI > 0 ? 1 : 0, expected: 1,
    quelle: 'Monats-Brutto 1.500 € in StKl I erzeugt LSt > 0',
  });
  // Verhältnis V/I darf NICHT 1,15 sein — wenn doch, wäre das der alte Bug
  const verhaeltnis = lstI > 0 ? lstV / lstI : 0;
  cases.push({
    name: 'MJ-STKL Verhältnis V/I ist NICHT 1,15 (kein erfundener Faktor)',
    actual: Math.abs(verhaeltnis - 1.15) > 0.05 ? 1 : 0, expected: 1,
    quelle: '§ 39b EStG PAP-konform, kein hartkodierter × 1,15-Faktor',
  });
}

// ============================================================================
// GRUPPE 5: MJ-AG — AG-Anteil = Gesamtbeitrag − AN-Anteil (§ 20 Abs. 2a SGB IV)
// ============================================================================

// An der Untergrenze: Gesamtbeitrag ≈ F × G × 0.4 ≈ 160 €, AN-Anteil ≈ 0
// AG trägt also fast den gesamten Beitrag
// An der Obergrenze: Gesamtbeitrag = AN-Anteil × 2 (normal)
{
  const beGesamtUG = berechneBemessungsgrundlageGesamt(603.01);
  const beAnUG = berechneBemessungsgrundlageAN(603.01);
  cases.push({
    name: 'MJ-AG Invariante UG: BE_gesamt > 2 × BE_AN (AG trägt > halben Beitrag)',
    actual: beGesamtUG > 2 * beAnUG ? 1 : 0, expected: 1,
    quelle: 'An UG: BE_gesamt ≈ 399 € (F × G), BE_AN ≈ 0 — AG trägt fast alles',
  });
  const beGesamtOG = berechneBemessungsgrundlageGesamt(2000);
  const beAnOG = berechneBemessungsgrundlageAN(2000);
  cases.push({
    name: 'MJ-AG Invariante OG: BE_gesamt = BE_AN (kein Midijob-Effekt)',
    actual: Math.abs(beGesamtOG - beAnOG) < 0.01 ? 1 : 0, expected: 1,
    quelle: 'An OG: beide Formeln konvergieren auf OG',
  });
}

// ============================================================================
// GRUPPE 6: MJ-AG-RECHT — AG-Anteil OHNE Kinderlos-Zuschlag (Prompt 125a-fix)
// § 59 Abs. 5 SGB XI: Der Kinderlos-Zuschlag (0,6 %) ist ausschließlich vom
// Arbeitnehmer zu tragen. In 125a rechnete der Code `gesamtSvSatz = anSvSatz × 2`
// und verdoppelte damit den Zuschlag — AG-Anteil systematisch um 0,6 %-Punkte
// (×BE_gesamt/2) überhöht. Diese Tests verhindern den Bug strukturell.
// ============================================================================

const SV_AN_OHNE_PV = RV_SATZ_AN_2026 + KV_BASISSATZ_AN_2026 + KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 + AV_SATZ_AN_2026;
const agSvSatz = SV_AN_OHNE_PV + PV_BASIS_SATZ_2026;

cases.push({
  name: 'MJ-AG-RECHT agSvSatz = 21,15 % (paritätisch, ohne Kinderlos-Zuschlag)',
  actual: agSvSatz, expected: 0.2115, tol: 0.00001,
  quelle: '§ 58 Abs. 1 SGB XI + §§ 249 SGB V / 168 SGB VI / 346 SGB III — paritätische Hälfte',
});

{
  // Bei 0 Kindern + ≥23: AN-Satz = AG-Satz + Kinderlos-Zuschlag (0,6 %)
  const anSvSatzKinderlos = SV_AN_OHNE_PV + pvAnteilAn2026(0, true, false);
  cases.push({
    name: 'MJ-AG-RECHT AN − AG = 0,6 % bei 0 Kindern (Kinderlos-Zuschlag nur AN)',
    actual: anSvSatzKinderlos - agSvSatz, expected: 0.006, tol: 0.00001,
    quelle: '§ 59 Abs. 5 SGB XI: Zuschlag ausschließlich AN',
  });
  // Gesamtsatz korrekt: 42,9 % (= AN 21,75 % + AG 21,15 %), NICHT 43,5 %
  const gesamtSvSatzKinderlos = anSvSatzKinderlos + agSvSatz;
  cases.push({
    name: 'MJ-AG-RECHT gesamtSvSatz bei 0 Kindern = 42,9 % (nicht 43,5 %)',
    actual: gesamtSvSatzKinderlos, expected: 0.429, tol: 0.00001,
    quelle: 'Kinderlos-Zuschlag nur einmal (AN-Seite), nicht verdoppelt',
  });
}

// MJ-AG-PARITAET: Bei 1 Kind → kein Kinderlos-Zuschlag, AN-Satz = AG-Satz
{
  const anSvSatz1Kind = SV_AN_OHNE_PV + pvAnteilAn2026(1, true, false);
  cases.push({
    name: 'MJ-AG-PARITAET bei 1 Kind: anSvSatz = agSvSatz (echte Parität)',
    actual: Math.abs(anSvSatz1Kind - agSvSatz), expected: 0, tol: 0.00001,
    quelle: 'Ohne Kinderlos-Zuschlag identische Sätze AN/AG',
  });
  const gesamtSvSatz1Kind = anSvSatz1Kind + agSvSatz;
  cases.push({
    name: 'MJ-AG-PARITAET gesamtSvSatz bei 1 Kind = 42,3 %',
    actual: gesamtSvSatz1Kind, expected: 0.423, tol: 0.00001,
    quelle: 'KV 14,6 + Zusatz 2,9 + RV 18,6 + ALV 2,6 + PV 3,6 = 42,3',
  });
}

// Konkrete €-Beträge für Testfall aus Analyse-Report (AE = 1.500, 0 Kinder).
// W163: Der PV-Zuschlag für Kinderlose (0,6 %) bemisst sich an BE_gesamt, nicht an BE_AN
// (§ 20 Abs. 2a SGB IV; DRV, Übergangsbereich). AN-SV = 1.284,18 × 21,15 % + 1.427,03 × 0,6 %.
{
  const beGesamt = berechneBemessungsgrundlageGesamt(1500);
  const beAn = berechneBemessungsgrundlageAN(1500);
  const anSvSatzTest = SV_AN_OHNE_PV + pvAnteilAn2026(0, true, false);
  const gesamtSvSatzTest = anSvSatzTest + agSvSatz;
  const anSv = beAn * (anSvSatzTest - 0.006) + beGesamt * 0.006;
  const gesamtSv = beGesamt * gesamtSvSatzTest;
  const agSv = gesamtSv - anSv;

  cases.push({
    name: 'MJ-AG-RECHT AE=1.500 0 Kind: AN-SV = 280,16 € (Zuschlag aus BE_gesamt)',
    actual: anSv, expected: 280.16, tol: 0.02,
    quelle: 'BE_AN 1.284,18 × 21,15 % + BE_gesamt 1.427,03 × 0,6 % (W163)',
  });
  cases.push({
    name: 'MJ-AG-RECHT AE=1.500 0 Kind: gesamtSv = 612,20 € (vorher 620,76 €)',
    actual: gesamtSv, expected: 612.20, tol: 0.02,
    quelle: 'BE_gesamt 1.427,03 × 42,9 % — 8,56 € weniger als 125a-Stand',
  });
  cases.push({
    name: 'MJ-AG-RECHT AE=1.500 0 Kind: agSv = 332,04 €',
    actual: agSv, expected: 332.04, tol: 0.02,
    quelle: 'Gesamt − AN; der Zuschlag belastet nur den AN (W163)',
  });
}

// W163: berechneBruttoNetto gegen das Rechenbeispiel von lohn-info.de (Übergangsbereich 2026):
// AE 1.000 €, Zusatzbeitrag 3,0 %, 1 Kind → AN-Anteil 120,50 € (KV 50,02 + PV 10,23 + RV 52,86 +
// AV 7,39); kinderlos zusätzlich 854,06 × 0,6 % = 5,12 € → 125,62 €. Minijob 500 €: nur RV 3,6 %.
{
  const bn = (b: number, k: number, extra: Partial<Parameters<typeof berechneBruttoNetto>[0]> = {}) =>
    berechneBruttoNetto({
      bruttoMonat: b, steuerklasse: 1, kirchensteuer: false, kirchensteuersatz: 9,
      kinderfreibetraege: k, kinderUnter25: k, bundesland: '', kvArt: 'gesetzlich',
      kvZusatzbeitrag: 3.0, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat', ...extra,
    });
  cases.push({
    name: 'BN-MIDI AE=1.000, ZB 3,0 %, 1 Kind: AN-SV = 120,50 €',
    actual: bn(1000, 1).sozialabgabenGesamt, expected: 120.50, tol: 0.001,
    quelle: 'lohn-info.de, Beitragsberechnung im Übergangsbereich 2026, Beispiel',
  });
  cases.push({
    name: 'BN-MIDI AE=1.000, ZB 3,0 %, kinderlos: AN-SV = 125,62 €',
    actual: bn(1000, 0).sozialabgabenGesamt, expected: 125.62, tol: 0.001,
    quelle: 'lohn-info.de: Zuschlag 854,06 × 0,6 % = 5,12 € aus BE_gesamt',
  });
  cases.push({
    name: 'BN-MINI AE=500: AN-SV = 18,00 € (RV 3,6 %)',
    actual: bn(500, 0).sozialabgabenGesamt, expected: 18.00, tol: 0.001,
    quelle: '§ 168 Abs. 1 Nr. 1b SGB VI: 18,6 % − 15 % AG',
  });
  cases.push({
    name: 'BN-MINI AE=500, RV befreit: AN-SV = 0 €',
    actual: bn(500, 0, { rvBefreit: true }).sozialabgabenGesamt, expected: 0, tol: 0.001,
    quelle: '§ 6 Abs. 1b SGB VI',
  });
  cases.push({
    name: 'BN-REG AE=2.000, ZB 2,9 %, kinderlos: AN-SV = 435,00 € (Ende Übergangsbereich)',
    actual: bn(2000, 0, { kvZusatzbeitrag: 2.9 }).sozialabgabenGesamt, expected: 435.00, tol: 0.001,
    quelle: '2.000 × 21,75 %',
  });
}

// ============================================================================
// LAUF
// ============================================================================

let passed = 0, failed = 0;
console.log('=== Verify Midijob P1 (Stufe-4a Prompt 125a) ===\n');
for (const c of cases) {
  const tol = c.tol ?? 0;
  const delta = Math.abs(c.actual - c.expected);
  const ok = delta <= tol;
  const actualStr = typeof c.actual === 'number' ? c.actual.toFixed(4).padStart(11) : String(c.actual).padStart(11);
  const expectedStr = typeof c.expected === 'number' ? c.expected.toFixed(4).padStart(11) : String(c.expected).padStart(11);
  console.log(`  ${ok ? '✓' : '✗'} ${c.name.padEnd(68)} ist ${actualStr} / soll ${expectedStr} / Δ ${delta.toFixed(4)} [${c.quelle}]`);
  ok ? passed++ : failed++;
}
console.log(`\nErgebnis: ${passed}/${cases.length} grün, ${failed} rot.`);
process.exit(failed === 0 ? 0 : 1);
