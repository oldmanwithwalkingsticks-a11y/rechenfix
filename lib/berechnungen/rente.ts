import { berechneEStGrund } from './einkommensteuer';

export interface RentenEingabe {
  alter: number;
  renteneintrittsalter: number;
  monatsbrutto: number;
  beitragsjahre: number;
  bekannteRentenpunkte: number | null; // null = schätzen
  gehaltssteigerung: number; // % p.a.
  gewuenschtesNetto: number;
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

export function berechneRente(eingabe: RentenEingabe): RentenErgebnis | null {
  const { alter, renteneintrittsalter, monatsbrutto, beitragsjahre, bekannteRentenpunkte, gehaltssteigerung, gewuenschtesNetto } = eingabe;

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
  // Steuerpflichtiger Anteil nach § 22 EStG: 83 % bei Rentenbeginn 2026,
  // steigt um 0,5 %-Punkte pro Jahr bis 100 %.
  const steuerpflichtAnteil = Math.min(100, 83 + jahreBisRente * 0.5);

  // ESt auf den steuerpflichtigen Teil der Jahresrente — zentrale Grundtabelle
  // (§ 32a EStG 2026). Rentner: Grundtarif, kein Splitting im Default.
  const jahrRenteSteuerpflichtig = bruttoRente * 12 * steuerpflichtAnteil / 100;
  const steuerJahr = berechneEStGrund(jahrRenteSteuerpflichtig, 2026);
  const steuerMonat = steuerJahr / 12;

  // SV-Pauschale für Rentner (grob): KV 8,15 % + PV 1,7 % + Zusatzbeitrag ~1 %
  // = 10,85 %. Tatsächlich abhängig von Zusatzbeitragssatz der individuellen
  // Krankenkasse und Kinderlosenzuschlag. Für Rentenlücken-Schätzung ausreichend.
  const sozialAbgaben = bruttoRente * 0.1085;

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
    gewuenschtesNetto,
    rentenluecke: Math.round(rentenluecke * 100) / 100,
    sparrateMonatlich: Math.round(sparrateMonatlich * 100) / 100,
    benoetigtesKapital: Math.round(benoetigtesKapital),
    jahreBisRente,
    rentenwert: RENTENWERT,
    durchschnittsentgelt: DURCHSCHNITTSENTGELT,
  };
}
