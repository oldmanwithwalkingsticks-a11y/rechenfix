import {
  berechneEStGrund,
  berechneSoli,
  WK_PAUSCHALE_AN_2026,
  GRUNDFREIBETRAG_2026,
} from './einkommensteuer';
import { pvAnteilAnVorsorge2026 } from './pflegeversicherung';

export type Steuerklasse = 1 | 2 | 3 | 4 | 5 | 6;

export interface LohnsteuerEingabe {
  brutto: number;          // monatlich oder jährlich, abh. von zeitraum
  steuerklasse: Steuerklasse;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number; // 0, 0.5, 1, 1.5, 2, 2.5, 3 — nur Soli/KiSt-relevant
  /**
   * Anzahl berücksichtigungsfähiger Kinder unter 25 Jahren (§ 55 Abs. 3 SGB XI).
   * Beeinflusst die Vorsorgepauschale über den PV-AN-Satz und damit die Lohnsteuer.
   * 0 = Kinderloszuschlag (sofern Alter > 23), 2-5 = Kinderabschlag.
   */
  kinderUnter25?: number;
  jahresfreibetrag: number;   // eingetragener Freibetrag (z.B. Werbungskosten)
  zeitraum: 'monat' | 'jahr';
}

// Zusatzparameter für die Vorsorgepauschale nach § 39b Abs. 4 EStG.
// Alle optional — sinnvolle Defaults entsprechen dem häufigsten Fall (GKV, kinderlos, 2,9 % Zusatzbeitrag).
export interface VorsorgeParams {
  kvArt?: 'gesetzlich' | 'privat';
  kvZusatzbeitragProzent?: number;  // z. B. 2.9
  /**
   * Anzahl berücksichtigungsfähiger Kinder unter 25 Jahren (§ 55 Abs. 3 SGB XI).
   * 0 = Kinderloszuschlag, ≥2 = Kinderabschlag.
   */
  kinderUnter25?: number;
  kvPrivatBeitragJahr?: number;      // nur relevant wenn kvArt === 'privat'
  rvBefreit?: boolean;
}

export interface LohnsteuerErgebnis {
  bruttoMonat: number;
  bruttoJahr: number;
  lohnsteuerMonat: number;
  lohnsteuerJahr: number;
  solidaritaetszuschlagMonat: number;
  solidaritaetszuschlagJahr: number;
  kirchensteuerMonat: number;
  kirchensteuerJahr: number;
  gesamtabzuegeMonat: number;
  gesamtabzuegeJahr: number;
  steuerklasse: Steuerklasse;
  vergleichsTabelle: Array<{
    steuerklasse: Steuerklasse;
    lohnsteuerMonat: number;
    soliMonat: number;
    kistMonat: number;
    gesamtMonat: number;
  }>;
}

const ARBEITNEHMER_PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;
const ENTLASTUNGSBETRAG_ALLEINERZIEHENDE = 4260;

/**
 * Empirisch kalibrierte Lookup-Tabelle für Lohnsteuer Kl. V 2026.
 * Stützpunkte verifiziert gegen BMF-Steuerrechner (https://www.bmf-steuerrechner.de).
 * Parameter: NRW, kinderlos, gesetzlich KV, Zusatzbeitrag 2,9 %, keine KiSt, 2026.
 *
 * Zwischen Stützpunkten wird linear interpoliert (→ getInterpolierteLst).
 * Toleranz-Ziel: ±5 €/Monat im Vergleich zum BMF-PAP.
 *
 * Tech-Schuld: Dieser Lookup-Ansatz ist eine Zwischenlösung. Die saubere
 * Voll-PAP-Implementation nach § 39b Abs. 2 Satz 7 EStG ist Thema eines
 * späteren Refactor-Prompts.
 *
 * Format: [Jahres-Brutto €, LSt-Jahreswert €]
 */
export const LST_LOOKUP_V_2026: Array<[number, number]> = [
  [      0,         0 ],
  [  9_600,     886.00 ],
  [ 12_000,   1_152.00 ],
  [ 14_400,   1_417.92 ],
  [ 18_000,   1_842.00 ],
  [ 24_000,   3_636.00 ],
  [ 30_000,   5_664.00 ],
  [ 36_000,   7_587.96 ],
  [ 48_000,  11_460.00 ],
  [ 60_000,  15_514.92 ],
  [ 84_000,  24_237.00 ],
];

/**
 * Empirisch kalibrierte Lookup-Tabelle für Lohnsteuer Kl. VI 2026.
 * Gleiche Parameter wie LST_LOOKUP_V_2026. Kl. VI hat keinen Grundfreibetrag,
 * daher Anker bei (0, 0) ist Vereinfachung — für Bruttos < 800 €/Monat
 * ist die Faktor-Extrapolation zum Ursprung eine akzeptable Nische.
 */
export const LST_LOOKUP_VI_2026: Array<[number, number]> = [
  [      0,         0 ],
  [  9_600,   1_080.96 ],
  [ 12_000,   1_350.96 ],
  [ 14_400,   1_620.96 ],
  [ 18_000,   2_140.92 ],
  [ 24_000,   4_167.96 ],
  [ 30_000,   6_195.00 ],
  [ 36_000,   8_061.96 ],
  [ 48_000,  11_991.96 ],
  [ 60_000,  16_047.00 ],
  [ 84_000,  24_768.96 ],
];

/**
 * Liefert die Jahres-Lohnsteuer für einen gegebenen Jahres-Brutto per linearer
 * Interpolation zwischen den Lookup-Stützpunkten.
 *
 * Grenzverhalten:
 * - Unterhalb des ersten Stützpunkts (< 0): liefert 0
 * - Oberhalb des letzten Stützpunkts (> 84_000): extrapoliert mit der Steigung
 *   des letzten Intervalls (60_000 → 84_000). Das ist für Hochlohn-Nische
 *   (>7.000 €/Mon) eine grobe Näherung, aber deutlich besser als 0.
 */
export function getInterpolierteLst(
  jahresBrutto: number,
  lookup: Array<[number, number]>,
): number {
  if (jahresBrutto <= 0) return 0;

  for (let i = 0; i < lookup.length - 1; i++) {
    const [x0, y0] = lookup[i];
    const [x1, y1] = lookup[i + 1];
    if (jahresBrutto >= x0 && jahresBrutto <= x1) {
      const t = (jahresBrutto - x0) / (x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }

  const [xN1, yN1] = lookup[lookup.length - 2];
  const [xN, yN] = lookup[lookup.length - 1];
  const steigung = (yN - yN1) / (xN - xN1);
  return yN + (jahresBrutto - xN) * steigung;
}

// BBG 2026 für die Vorsorgepauschale. Werte ident mit BBG_KV_MONAT/BBG_RV_MONAT
// in brutto-netto.ts — Import hier nicht möglich (zirkuläre Abhängigkeit, da
// brutto-netto.ts die Lohnsteuer-Funktionen konsumiert). Beide Stellen bei
// Jahreswechsel 2027 gemeinsam aktualisieren. Lint-Script schützt über
// forbiddenValues-Einträge für diese Zahlen.
const BBG_RV_JAHR = 101400; // = BBG_RV_MONAT * 12
const BBG_KV_JAHR = 69750;  // = BBG_KV_MONAT * 12

// Vorsorgepauschale nach § 39b Abs. 4 EStG (2026).
// Zusammengesetzt aus drei Teilbeträgen + Mindestvorsorgepauschale als Untergrenze:
//   (a) Teilbetrag Rentenversicherung: AN-Anteil RV 9,3 % (bis BBG RV); 100 % anrechenbar seit 2023.
//       Entfällt bei Befreiung (Beamte, GGF ohne SV-Pflicht).
//   (b) Teilbetrag gesetzl. Krankenversicherung: AN-Anteil Basissatz 7,3 % + halber durchschnittlicher
//       Zusatzbeitrag (AN-Anteil; 2026 Default 2,9 %/2 = 1,45 %), je bis BBG KV.
//   (c) Teilbetrag Pflegeversicherung: "maßgebender Beitragssatz" nach § 55 SGB XI — inkl. 0,6 % Zuschlag
//       für Kinderlose (AN trägt 2,4 %), ohne Abschlag bei Kindern (Beitragssatzabsenkung fließt nicht ein).
//   (d) Bei PKV: Jahresbeitrag statt (b)+(c), gedeckelt auf den GKV-Vergleichswert (§ 10 Abs. 1 Nr. 3 EStG).
//   (e) Mindestvorsorgepauschale: 12 % des Bruttolohns, max. 1.900 € (SK I/II/IV/V/VI) bzw. 3.000 € (SK III),
//       als Untergrenze.
export function berechneVorsorgepauschale2026(
  bruttoJahr: number,
  sk: Steuerklasse,
  params: VorsorgeParams = {},
): number {
  const {
    kvArt = 'gesetzlich',
    kvZusatzbeitragProzent = 2.9,
    kinderUnter25 = 0,
    kvPrivatBeitragJahr = 0,
    rvBefreit = false,
  } = params;

  if (bruttoJahr <= 0) return 0;

  const bmgKvPv = Math.min(bruttoJahr, BBG_KV_JAHR);
  const bmgRvAv = Math.min(bruttoJahr, BBG_RV_JAHR);

  // (a) Teilbetrag RV — AN-Anteil 9,3 %
  const tbRV = rvBefreit ? 0 : bmgRvAv * 0.093;

  // (b) + (c) oder (d): KV/PV-Teilbeträge
  // PV-Satz aus dem zentralen Helper (§ 55 Abs. 3 SGB XI + BMF-Vorsorge-Kalibrierung):
  //   - Kinderlos: 2,1 % (1,8 % + halber Zuschlag 0,3 pp — BMF-Rundung)
  //   - 1 Kind (Elterneigenschaft): 1,8 %
  //   - 2 Kinder: 1,55 % / 3: 1,30 % / 4: 1,05 % / 5+: 0,80 % (gekappt)
  const pvSatz = pvAnteilAnVorsorge2026(kinderUnter25);
  let tbKVuPV: number;
  if (kvArt === 'privat') {
    // PKV: tatsächlicher Jahresbeitrag, gedeckelt auf den GKV-Vergleichswert.
    const gkvDeckel = bmgKvPv * (0.073 + (kvZusatzbeitragProzent / 200) + pvSatz);
    tbKVuPV = Math.min(kvPrivatBeitragJahr, gkvDeckel);
  } else {
    const tbKVallg    = bmgKvPv * 0.073;
    const tbKVzusatz  = bmgKvPv * (kvZusatzbeitragProzent / 200); // halber Zusatzbeitrag = AN-Anteil
    const tbPV        = bmgKvPv * pvSatz;
    tbKVuPV = tbKVallg + tbKVzusatz + tbPV;
  }

  const summe = tbRV + tbKVuPV;

  // (e) Mindestvorsorgepauschale — Untergrenze, § 39b Abs. 4 Satz 2 EStG
  const mindestDeckel = sk === 3 ? 3000 : 1900;
  const mindest = Math.min(bruttoJahr * 0.12, mindestDeckel);

  return Math.max(summe, mindest);
}

// Kompatibilitäts-Wrapper für Altaufrufer ohne SV-Kontext (Default: GKV, kinderlos, 2,9 % Zusatz).
function vorsorgepauschale(bruttoJahr: number, sk: Steuerklasse): number {
  return berechneVorsorgepauschale2026(bruttoJahr, sk);
}

// Lohnsteuer pro Steuerklasse (vereinfacht nach PAP 2026)
export function berechneLohnsteuerJahr(
  bruttoJahr: number,
  sk: Steuerklasse,
  jahresfreibetrag: number,
  vorsorge?: VorsorgeParams,
): number {
  if (bruttoJahr <= 0) return 0;

  const werbungskosten = ARBEITNEHMER_PAUSCHBETRAG;
  const sonderausgaben = SONDERAUSGABEN_PAUSCHBETRAG;
  const vorsorgeBetrag = vorsorge
    ? berechneVorsorgepauschale2026(bruttoJahr, sk, vorsorge)
    : vorsorgepauschale(bruttoJahr, sk);

  // Steuerklasse VI: keine Freibeträge
  if (sk === 6) {
    const zvE = Math.max(0, bruttoJahr - vorsorgeBetrag);
    return berechneEStGrund(zvE, 2026);
  }

  // Für alle anderen: Freibeträge abziehen
  let zvE = Math.max(0, bruttoJahr - werbungskosten - sonderausgaben - vorsorgeBetrag - jahresfreibetrag);

  // Steuerklasse II: + Entlastungsbetrag Alleinerziehende
  if (sk === 2) {
    zvE = Math.max(0, zvE - ENTLASTUNGSBETRAG_ALLEINERZIEHENDE);
  }

  switch (sk) {
    case 1:
    case 4:
      return berechneEStGrund(zvE, 2026);
    case 2:
      return berechneEStGrund(zvE, 2026);
    case 3: {
      // Splitting: halbes zvE, dann × 2
      const halb = Math.floor(zvE / 2);
      return berechneEStGrund(halb, 2026) * 2;
    }
    case 5: {
      // Stark vereinfachte Approximation nach PAP: hohe LSt, kein Grundfreibetrag
      // Näherung: ESt(zvE + 2×Grundfreibetrag) − ESt(2×Grundfreibetrag), gedeckelt
      const gf = GRUNDFREIBETRAG_2026;
      const estMitBasis = berechneEStGrund(zvE + 2 * gf, 2026);
      const estBasis = berechneEStGrund(2 * gf, 2026);
      const naeherung = estMitBasis - estBasis;
      return Math.max(naeherung, zvE * 0.14);
    }
    default:
      return berechneEStGrund(zvE, 2026);
  }
}

function berechneSoliJahr(lstJahr: number, sk: Steuerklasse): number {
  // SK III = Splittingtarif → doppelte Freigrenze (40.700 €) + Milderungszone
  // wird von berechneSoli zentral behandelt (§ 4 SolzG).
  return berechneSoli(lstJahr, sk === 3, 2026);
}

function berechneKiStJahr(lstJahr: number, kirchensteuer: boolean, satz: 8 | 9): number {
  if (!kirchensteuer) return 0;
  return lstJahr * (satz / 100);
}

export function berechneLohnsteuer(e: LohnsteuerEingabe): LohnsteuerErgebnis {
  const bruttoJahr = e.zeitraum === 'monat' ? e.brutto * 12 : e.brutto;
  const bruttoMonat = bruttoJahr / 12;

  // Vorsorgepauschale braucht die Anzahl Kinder unter 25 für den PV-Staffel-Satz
  // (§ 55 Abs. 3 SGB XI). Ohne Angabe: kinderlos (Default im Helper).
  const vorsorge: VorsorgeParams = { kinderUnter25: e.kinderUnter25 ?? 0 };

  const lstJahr = berechneLohnsteuerJahr(bruttoJahr, e.steuerklasse, e.jahresfreibetrag, vorsorge);
  const soliJahr = berechneSoliJahr(lstJahr, e.steuerklasse);
  const kistJahr = berechneKiStJahr(lstJahr, e.kirchensteuer, e.kirchensteuersatz);

  // Vergleich aller Steuerklassen
  const skListe: Steuerklasse[] = [1, 2, 3, 4, 5, 6];
  const vergleichsTabelle = skListe.map(sk => {
    const lst = berechneLohnsteuerJahr(bruttoJahr, sk, e.jahresfreibetrag, vorsorge);
    const soli = berechneSoliJahr(lst, sk);
    const kist = berechneKiStJahr(lst, e.kirchensteuer, e.kirchensteuersatz);
    return {
      steuerklasse: sk,
      lohnsteuerMonat: Math.round(lst / 12 * 100) / 100,
      soliMonat: Math.round(soli / 12 * 100) / 100,
      kistMonat: Math.round(kist / 12 * 100) / 100,
      gesamtMonat: Math.round((lst + soli + kist) / 12 * 100) / 100,
    };
  });

  return {
    bruttoMonat: Math.round(bruttoMonat * 100) / 100,
    bruttoJahr: Math.round(bruttoJahr * 100) / 100,
    lohnsteuerMonat: Math.round(lstJahr / 12 * 100) / 100,
    lohnsteuerJahr: Math.round(lstJahr * 100) / 100,
    solidaritaetszuschlagMonat: Math.round(soliJahr / 12 * 100) / 100,
    solidaritaetszuschlagJahr: Math.round(soliJahr * 100) / 100,
    kirchensteuerMonat: Math.round(kistJahr / 12 * 100) / 100,
    kirchensteuerJahr: Math.round(kistJahr * 100) / 100,
    gesamtabzuegeMonat: Math.round((lstJahr + soliJahr + kistJahr) / 12 * 100) / 100,
    gesamtabzuegeJahr: Math.round((lstJahr + soliJahr + kistJahr) * 100) / 100,
    steuerklasse: e.steuerklasse,
    vergleichsTabelle,
  };
}
