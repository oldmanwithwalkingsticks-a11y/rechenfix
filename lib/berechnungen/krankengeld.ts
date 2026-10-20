/**
 * Krankengeld (gesetzlich versichert) nach § 47 SGB V und Abzüge des Versicherten.
 *
 * W183: neu als Lib; vorher rechnete KrankengeldRechner.tsx inline und zog nur 6,15 % (kinderlos
 * 6,45 %) ab — die halben Arbeitnehmer-Sätze („RV 4,65 + ALV 0,65 + PV 0,85“). Richtig ist:
 *
 *  - Brutto-Krankengeld je Kalendertag: 70 % des Regelentgelts (höchstens Beitragsbemessungsgrenze
 *    der KV ÷ 30), höchstens 90 % des Nettoarbeitsentgelts (§ 47 Abs. 1 SGB V).
 *  - Davon trägt der Versicherte die Hälfte der Beiträge, „soweit sie auf die Leistung entfallen“:
 *      Rentenversicherung 9,3 %   § 170 Abs. 1 Nr. 2 Buchst. a SGB VI
 *      Arbeitslosenvers.   1,3 %   § 347 Nr. 5 SGB III
 *      Pflegeversicherung  1,8 %   § 59 Abs. 2 SGB XI; Kinderlose zusätzlich 0,6 % allein (§ 59 Abs. 5),
 *                                  ab dem 2. Kind unter 25 je 0,25 % weniger (§ 55 Abs. 3 SGB XI)
 *    Zusammen 12,4 % mit Kind, 13,0 % kinderlos, mit fünf Kindern 11,4 % (betanet: „11,4 bis 13 %“).
 *  - Krankenversicherung: beitragsfrei (§ 224 SGB V).
 *
 * Vereinfachungen: Einmalzahlungen (Erhöhung des Regelentgelts) und Beitragsrundung je Zweig
 * bleiben außen vor (Abweichung wenige Cent); Kinderlosenzuschlag ab 23 Jahren wird angenommen.
 * Prüfskript: scripts/verify-krankengeld.ts.
 */

import { BBG_KV_MONAT, RV_SATZ_AN_2026, AV_SATZ_AN_2026 } from './brutto-netto';
import { pvAnteilAn2026 } from './pflegeversicherung';

/** § 47 Abs. 1 Satz 1 SGB V: 70 % des Regelentgelts. */
export const KRANKENGELD_QUOTE_BRUTTO = 0.7;
/** § 47 Abs. 1 Satz 2 SGB V: höchstens 90 % des Nettoarbeitsentgelts. */
export const KRANKENGELD_QUOTE_NETTO = 0.9;

export interface KrankengeldEingabe {
  /** Monatliches Bruttoarbeitsentgelt (€). */
  bruttoMonat: number;
  /** Monatliches Nettoarbeitsentgelt (€). */
  nettoMonat: number;
  /** true = Kinder vorhanden oder gehabt (kein Zuschlag für Kinderlose, § 55 Abs. 3 SGB XI). */
  hatKinder: boolean;
  /** Anzahl Kinder unter 25 Jahren (Abschlag ab dem 2. Kind); nur mit `hatKinder` wirksam. */
  kinderUnter25: number;
}

export interface KrankengeldErgebnis {
  /** Regelentgelt je Kalendertag (Brutto, gedeckelt auf BBG KV ÷ 30). */
  bruttoTag: number;
  /** Nettoarbeitsentgelt je Kalendertag. */
  nettoTag: number;
  /** Brutto-Krankengeld je Kalendertag (auf Cent gerundet). */
  krankengeldBruttoTag: number;
  /** true, wenn die 90-%-Netto-Grenze greift. */
  nettoGrenzeGreift: boolean;
  rvSatz: number;
  avSatz: number;
  pvSatz: number;
  /** Summe der Versicherten-Anteile (Dezimalwert, z. B. 0,124). */
  svSatz: number;
  /** Abzüge je Kalendertag. */
  abzugTag: number;
  /** Netto-Krankengeld je Kalendertag. */
  krankengeldNettoTag: number;
  /** Netto-Krankengeld für einen vollen Monat (30 Kalendertage). */
  krankengeldNettoMonat: number;
  /** Nettogehalt minus Netto-Krankengeld (Monat). */
  verlust: number;
  /** Verlust in % des Nettogehalts. */
  verlustProzent: number;
}

export function berechneKrankengeld(e: KrankengeldEingabe): KrankengeldErgebnis {
  const bruttoTag = Math.min(Math.max(0, e.bruttoMonat), BBG_KV_MONAT) / 30;
  const nettoTag = Math.max(0, e.nettoMonat) / 30;

  const ausBrutto = KRANKENGELD_QUOTE_BRUTTO * bruttoTag;
  const ausNetto = KRANKENGELD_QUOTE_NETTO * nettoTag;
  const krankengeldBruttoTag = Math.round(Math.min(ausBrutto, ausNetto) * 100) / 100;

  const rvSatz = RV_SATZ_AN_2026;
  const avSatz = AV_SATZ_AN_2026;
  const pvSatz = e.hatKinder ? pvAnteilAn2026(Math.max(0, e.kinderUnter25), true, true) : pvAnteilAn2026(0, true, false);
  const svSatz = rvSatz + avSatz + pvSatz;

  const abzugTag = krankengeldBruttoTag * svSatz;
  const krankengeldNettoTag = krankengeldBruttoTag - abzugTag;
  const krankengeldNettoMonat = krankengeldNettoTag * 30;
  const nettoMonat = Math.max(0, e.nettoMonat);
  const verlust = nettoMonat - krankengeldNettoMonat;

  return {
    bruttoTag,
    nettoTag,
    krankengeldBruttoTag,
    nettoGrenzeGreift: ausNetto < ausBrutto,
    rvSatz,
    avSatz,
    pvSatz,
    svSatz,
    abzugTag,
    krankengeldNettoTag,
    krankengeldNettoMonat,
    verlust,
    verlustProzent: nettoMonat > 0 ? (verlust / nettoMonat) * 100 : 0,
  };
}
