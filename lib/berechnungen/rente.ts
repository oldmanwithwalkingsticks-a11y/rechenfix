import { berechneEStGrund, SA_PAUSCHALE_2026 } from './einkommensteuer';
import { KV_BASISSATZ_AN_2026 } from './brutto-netto';
import { KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 } from './sv-parameter';
import { PV_BASIS_SATZ_2026, pvAnteilAn2026 } from './pflegeversicherung';

export interface RentenEingabe {
  alter: number;
  renteneintrittsalter: number;
  monatsbrutto: number;
  beitragsjahre: number;
  bekannteRentenpunkte: number | null; // null = schätzen
  gehaltssteigerung: number; // % p.a. über der allgemeinen Lohnentwicklung (W187), 0 = wie der Durchschnitt
  gewuenschtesNetto: number;
  /**
   * W187: kinderlos (PV-Zuschlag 0,6 %, § 55 Abs. 3 SGB XI). Default true wie im Brutto-Netto-Rechner;
   * die Komponente hat keine Kinder-Eingabe und nennt die Annahme.
   */
  kinderlos?: boolean;
}

export interface RentenErgebnis {
  // Rentenpunkte
  bisherigeRentenpunkte: number;
  zukuenftigeRentenpunkte: number;
  gesamtRentenpunkte: number;
  // Rente
  bruttoRenteOhneAbschlag: number;
  abschlagProzent: number;
  abschlagMonate: number;
  bruttoRente: number;
  nettoRente: number;
  steuerpflichtAnteil: number;
  /** W187: Jahr des Rentenbeginns (2026 + Jahre bis zur Rente), maßgeblich für den Besteuerungsanteil. */
  rentenbeginnJahr: number;
  /** W187: KV- und PV-Beitrag des Rentners pro Monat und Beitragssatz in Prozent. */
  kvPvMonat: number;
  kvPvSatzProzent: number;
  /** W187: Einkommensteuer pro Monat (geschätzt). */
  steuerMonat: number;
  // Rentenlücke
  gewuenschtesNetto: number;
  rentenluecke: number; // positiv = Lücke, negativ = Überschuss
  sparrateMonatlich: number;
  benoetigtesKapital: number;
  // Info
  jahreBisRente: number;
  rentenwert: number;
  durchschnittsentgelt: number;
}

// Aktueller Rentenwert nach § 68 SGB VI
// Historie:
// - 01.07.2024–30.06.2025: 39,32 €
// - 01.07.2025–30.06.2026: 40,79 € (Rentenanpassung 01.07.2025, +4,57 %)
// - Ab 01.07.2026:         42,52 € (BMAS-Bekanntgabe 05.03.2026, +4,24 %)
export const RENTENWERT_BIS_30_06_2026 = 40.79;
export const RENTENWERT_AB_01_07_2026 = 42.52;

export function getAktuellerRentenwert(stichtag: Date = new Date()): number {
  const switchDatum = new Date(2026, 6, 1); // 01.07.2026 (Monat 0-indexiert)
  return stichtag >= switchDatum ? RENTENWERT_AB_01_07_2026 : RENTENWERT_BIS_30_06_2026;
}

// Backwards-Compat: bestehende Importe liefern weiterhin den tagesaktuellen Wert.
export const RENTENWERT = getAktuellerRentenwert();

// Konstanten 2026
/**
 * Vorläufiges Durchschnittsentgelt der gesetzlichen Rentenversicherung 2026.
 * Quelle: § 69 SGB VI + Anlage 1, SV-Rechengrößenverordnung 2026.
 * Dient als Divisor für Entgeltpunkte: 1 EP = Jahresbrutto / DURCHSCHNITTSENTGELT.
 */
export const DURCHSCHNITTSENTGELT_2026 = 51944;
const DURCHSCHNITTSENTGELT = DURCHSCHNITTSENTGELT_2026;
const BBG_WEST = 101400; // BBG RV 2026 (einheitlich, 8.450 €/Monat)
const REGELALTERSGRENZE = 67;

// W187: Werbungskosten-Pauschbetrag für Renten (§ 9a Satz 1 Nr. 3 EStG)
const WK_PAUSCHBETRAG_RENTE = 102;

/**
 * W187: Besteuerungsanteil nach § 22 Nr. 1 Satz 3 Buchst. a Doppelbuchst. aa EStG n. F.
 * (Wachstumschancengesetz): 2023 82,5 %, dann +0,5 Prozentpunkte je Rentenbeginn-Jahr, 2026 84 %, 2058 100 %.
 * Vorher: 83 % + 0,5 je Jahr bis zur Rente (2026 → 83 %, 2058 → 99 %).
 */
export function besteuerungsanteilRente(rentenbeginnJahr: number): number {
  if (rentenbeginnJahr <= 2005) return 50;
  if (rentenbeginnJahr <= 2020) return 50 + (rentenbeginnJahr - 2005) * 2;
  if (rentenbeginnJahr <= 2022) return 80 + (rentenbeginnJahr - 2020);
  return Math.min(100, 82.5 + (rentenbeginnJahr - 2023) * 0.5);
}

/**
 * W187: KV/PV-Beitragssatz des Rentners (Dezimal). KV: Hälfte des allgemeinen Beitragssatzes (7,3 %)
 * plus halber Ø-Zusatzbeitrag (§ 249a SGB V); PV: voller Beitragssatz 3,6 % trägt der Rentner allein
 * (§ 59 Abs. 1 SGB XI), Kinderlose 4,2 % (§ 55 Abs. 3 SGB XI). Vorher pauschal 10,85 %.
 */
export function kvPvSatzRentner(kinderlos: boolean): number {
  const kv = KV_BASISSATZ_AN_2026 + KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026;
  const pvZuschlagKinderlos = pvAnteilAn2026(0, true, false) - PV_BASIS_SATZ_2026;
  const pv = 2 * PV_BASIS_SATZ_2026 + (kinderlos ? pvZuschlagKinderlos : 0);
  return kv + pv;
}

export function berechneRente(eingabe: RentenEingabe): RentenErgebnis | null {
  const { alter, renteneintrittsalter, monatsbrutto, beitragsjahre, bekannteRentenpunkte, gehaltssteigerung, gewuenschtesNetto } = eingabe;
  const kinderlos = eingabe.kinderlos ?? true;

  if (alter <= 0 || alter >= renteneintrittsalter || monatsbrutto <= 0) return null;

  const jahresbrutto = monatsbrutto * 12;
  const jahreBisRente = renteneintrittsalter - alter;

  // Bisherige Rentenpunkte
  let bisherigeRentenpunkte: number;
  if (bekannteRentenpunkte !== null && bekannteRentenpunkte >= 0) {
    bisherigeRentenpunkte = bekannteRentenpunkte;
  } else {
    // Schätzung: bisherige Jahre × Punkte bei aktuellem Gehalt
    const punkteProJahr = Math.min(jahresbrutto, BBG_WEST) / DURCHSCHNITTSENTGELT;
    bisherigeRentenpunkte = beitragsjahre * punkteProJahr;
  }

  // Zukünftige Rentenpunkte (mit Gehaltssteigerung)
  // W187: `gehaltssteigerung` ist die Entwicklung ÜBER dem Durchschnittsentgelt (§ 70 Abs. 1 SGB VI: Verhältnis
  // zum Durchschnittsentgelt desselben Jahres). Durchschnittsentgelt, BBG und Rentenwert bleiben deshalb auf dem
  // Stand 2026 — das Ergebnis ist in heutigen Werten. Vorher als nominale Steigerung beschriftet (Startwert 1,5 %),
  // geteilt durch das feste Durchschnittsentgelt 2026: Entgeltpunkte zu hoch.
  let zukuenftigeRentenpunkte = 0;
  const steigerungFaktor = 1 + gehaltssteigerung / 100;

  for (let n = 1; n <= jahreBisRente; n++) {
    const gehaltJahr = jahresbrutto * Math.pow(steigerungFaktor, n);
    const gedeckelt = Math.min(gehaltJahr, BBG_WEST);
    zukuenftigeRentenpunkte += gedeckelt / DURCHSCHNITTSENTGELT;
  }

  const gesamtRentenpunkte = bisherigeRentenpunkte + zukuenftigeRentenpunkte;

  // Brutto-Rente
  const bruttoRenteOhneAbschlag = gesamtRentenpunkte * RENTENWERT;

  // Abschläge bei vorzeitigem Renteneintritt
  let abschlagMonate = 0;
  let abschlagProzent = 0;
  if (renteneintrittsalter < REGELALTERSGRENZE) {
    abschlagMonate = (REGELALTERSGRENZE - renteneintrittsalter) * 12;
    abschlagProzent = Math.min(abschlagMonate * 0.3, 14.4);
  }

  const bruttoRente = bruttoRenteOhneAbschlag * (1 - abschlagProzent / 100);

  // Netto-Rente (Näherung)
  // W187: Besteuerungsanteil nach Rentenbeginn-Jahr (2026: 84 %, vorher 83 %; 2058: 100 %, vorher 99 %).
  const rentenbeginnJahr = 2026 + jahreBisRente;
  const steuerpflichtAnteil = besteuerungsanteilRente(rentenbeginnJahr);

  // W187: vorher pauschal 10,85 % (KV 8,15 % + PV 1,7 % + ~1 % Zusatzbeitrag); jetzt KV 7,3 % + ½ Ø-Zusatz-
  // beitrag und PV voll (3,6 %, kinderlos 4,2 %), siehe kvPvSatzRentner.
  const kvPvSatz = kvPvSatzRentner(kinderlos);
  const sozialAbgaben = bruttoRente * kvPvSatz;

  // ESt auf den steuerpflichtigen Teil der Jahresrente — zentrale Grundtabelle
  // (§ 32a EStG 2026). Rentner: Grundtarif, kein Splitting im Default.
  // W187: vorher ohne Abzüge; jetzt zvE = steuerpflichtiger Teil − Werbungskosten-Pauschbetrag 102 €
  // (§ 9a Satz 1 Nr. 3) − Sonderausgaben-Pauschbetrag 36 € (§ 10c) − KV/PV-Beiträge (§ 10 Abs. 1 Nr. 3 EStG,
  // Basisabsicherung voll abziehbar; Rentner haben keinen Krankengeldanspruch, daher keine 4-%-Kürzung).
  const jahrRenteSteuerpflichtig = bruttoRente * 12 * steuerpflichtAnteil / 100;
  const zvERente = Math.max(0, jahrRenteSteuerpflichtig - WK_PAUSCHBETRAG_RENTE - SA_PAUSCHALE_2026 - sozialAbgaben * 12);
  const steuerJahr = berechneEStGrund(zvERente, 2026);
  const steuerMonat = steuerJahr / 12;

  const nettoRente = Math.max(0, bruttoRente - steuerMonat - sozialAbgaben);

  // Rentenlücke
  const rentenluecke = gewuenschtesNetto - nettoRente;

  // Sparrate um Lücke zu schließen
  let sparrateMonatlich = 0;
  let benoetigtesKapital = 0;
  if (rentenluecke > 0) {
    // Entnahmephase: 20 Jahre
    benoetigtesKapital = rentenluecke * 12 * 20;
    // Ansparphase: 5% Rendite p.a.
    const renditeMonat = 0.05 / 12;
    const monate = jahreBisRente * 12;
    if (monate > 0 && renditeMonat > 0) {
      // Sparplanformel: FV = PMT × ((1+r)^n - 1) / r
      // PMT = FV × r / ((1+r)^n - 1)
      const faktor = Math.pow(1 + renditeMonat, monate) - 1;
      sparrateMonatlich = benoetigtesKapital * renditeMonat / faktor;
    }
  }

  return {
    bisherigeRentenpunkte: Math.round(bisherigeRentenpunkte * 100) / 100,
    zukuenftigeRentenpunkte: Math.round(zukuenftigeRentenpunkte * 100) / 100,
    gesamtRentenpunkte: Math.round(gesamtRentenpunkte * 100) / 100,
    bruttoRenteOhneAbschlag: Math.round(bruttoRenteOhneAbschlag * 100) / 100,
    abschlagProzent: Math.round(abschlagProzent * 10) / 10,
    abschlagMonate,
    bruttoRente: Math.round(bruttoRente * 100) / 100,
    nettoRente: Math.round(nettoRente * 100) / 100,
    steuerpflichtAnteil: Math.round(steuerpflichtAnteil * 10) / 10,
    rentenbeginnJahr,
    kvPvMonat: Math.round(sozialAbgaben * 100) / 100,
    kvPvSatzProzent: Math.round(kvPvSatz * 10000) / 100,
    steuerMonat: Math.round(steuerMonat * 100) / 100,
    gewuenschtesNetto,
    rentenluecke: Math.round(rentenluecke * 100) / 100,
    sparrateMonatlich: Math.round(sparrateMonatlich * 100) / 100,
    benoetigtesKapital: Math.round(benoetigtesKapital),
    jahreBisRente,
    rentenwert: RENTENWERT,
    durchschnittsentgelt: DURCHSCHNITTSENTGELT,
  };
}
