import { berechneSoli, WK_PAUSCHALE_AN_2026 } from './einkommensteuer';
import { pvAnteilAnVorsorge2026 } from './pflegeversicherung';
import { berechneLohnsteuerPAP2026 } from './_lohnsteuer-pap-2026';

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
// ARBEITNEHMER_PAUSCHBETRAG / SONDERAUSGABEN_PAUSCHBETRAG / ENTLASTUNGSBETRAG werden
// seit Prompt 118 nicht mehr direkt in berechneLohnsteuerJahr verwendet (der Voll-PAP
// handhabt die Beträge intern in MZTABFB). Sie bleiben exportiert, weil andere
// Stellen (Netto-Vergleiche in Komponenten-Rechnern) sie zur eigenen Schätzung ziehen.

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

/**
 * Jahres-Lohnsteuer nach offiziellem ITZBund-Programmablaufplan 2026.
 *
 * Seit Prompt 118 delegiert diese Funktion komplett an
 * `berechneLohnsteuerPAP2026` aus `_lohnsteuer-pap-2026.ts` (1:1-Port des
 * BMF-XML-Pseudocodes, Δ=0 € an allen 20 BMF-Stützpunkten verifiziert).
 *
 * Vorher (Prompt 115b2 → 118): Grundtarif-Vereinfachung für Kl. I/II/III/IV
 * + empirische Lookup-Tabellen für Kl. V/VI. Diese sind im Archiv
 * `lib/berechnungen/_lookup-archiv/lohnsteuer-lookup-2026.ts.txt`.
 */
export function berechneLohnsteuerJahr(
  bruttoJahr: number,
  sk: Steuerklasse,
  jahresfreibetrag: number,
  vorsorge?: VorsorgeParams,
): number {
  if (bruttoJahr <= 0) return 0;
  const result = berechneLohnsteuerPAP2026({
    jahresBrutto: bruttoJahr,
    steuerklasse: sk,
    jahresfreibetrag,
    kinderfreibetraege: 0, // Kinderfreibeträge wirken nur auf Soli/KiSt, nicht auf LSt.
    religion: 0,
    vorsorge,
  });
  return result.lstJahr;
}

// ARBEITNEHMER_PAUSCHBETRAG + SONDERAUSGABEN_PAUSCHBETRAG + ENTLASTUNGSBETRAG_ALLEINERZIEHENDE
// (oben deklariert) werden aus dem PAP-Port nicht mehr direkt genutzt, bleiben aber
// im Modul-Scope, weil sie aus anderen Komponenten als Schätzwerte abgerufen werden.
void ARBEITNEHMER_PAUSCHBETRAG;
void SONDERAUSGABEN_PAUSCHBETRAG;
void ENTLASTUNGSBETRAG_ALLEINERZIEHENDE;

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
