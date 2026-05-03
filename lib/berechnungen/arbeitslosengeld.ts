/**
 * Arbeitslosengeld I — Berechnungen nach SGB III.
 *
 * Quellen:
 * - SGB III § 147 Abs. 2: Anspruchsdauer-Tabelle nach Alter und Versicherungs-
 *   pflicht-Monaten in den letzten 5 Jahren.
 *   https://www.gesetze-im-internet.de/sgb_3/__147.html
 * - SGB III § 149: Leistungssatz 60 % (kinderlos) bzw. 67 % (mit Kind) des
 *   pauschalierten Nettoentgelts.
 *   https://www.gesetze-im-internet.de/sgb_3/__149.html
 * - SGB III § 153 Abs. 1: Bemessungsentgelt = beitragspflichtiges Brutto im
 *   Bemessungszeitraum, gedeckelt auf BBG-RV.
 *   https://www.gesetze-im-internet.de/sgb_3/__153.html
 * - SGB III § 153 Abs. 1 Satz 2 Nr. 1: pauschalierter Sozialabzug 21 %
 *   (KV/PV/RV/AV-Pauschale).
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen, ggü. Konfig-Erklärtext
 * nicht identisch):
 *   - § 155 SGB III Nebeneinkommen-Schwelle 165 €/Mon NICHT modelliert
 *     (Konfig erwähnt es, Lib hat keine Anrechnungs-Logik).
 *   - Stkl V/VI-Lohnsteuer-Faktor ×1,15 ist eine grobe Näherung
 *     (echter PAP § 39b liegt bei ~1,4–1,6). TODO im ursprünglichen
 *     Component-Code (siehe Pre-Refactor ArbeitslosengeldRechner Z. 17–20).
 *     Verify-Tests fokussieren bewusst auf Klassen ohne diesen Faktor (I, IV);
 *     V/VI-Tests sind als "Approximation-touched" markiert.
 *   - Kirchensteuer als pauschale 9 % über alle Bundesländer (statt 8 % BY/BW).
 *
 * Welle-4 M2c — Lib-Extraktion aus ArbeitslosengeldRechner.tsx (03.05.2026).
 * Component zuvor PARTIAL-KEINE-LIB: importierte einkommensteuer + brutto-netto
 * aus verifizierten Libs, aber alle SGB-III-spezifischen Funktionen
 * (lohnsteuerJahr, bezugsdauerMonate, ALG-Berechnung) inline.
 */

import { berechneEStGrund, berechneSoli } from './einkommensteuer';
import { BBG_RV_MONAT } from './brutto-netto';

export type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

export interface ArbeitslosengeldEingabe {
  /** Letztes Monatsbrutto in € */
  brutto: number;
  klasse: Steuerklasse;
  /** mit Kind → 67 % Leistungssatz, sonst 60 % */
  mitKind: boolean;
  /** Alter bei Arbeitslosmeldung in Jahren */
  alter: number;
  /** Versicherungspflichtige Monate in den letzten 5 Jahren */
  beschMonate: number;
  kirchensteuer: boolean;
}

export interface ArbeitslosengeldErgebnis {
  algMonat: number;
  algTag: number;
  /** Anspruchsdauer in Monaten nach § 147 SGB III */
  dauer: number;
  /** Gesamtanspruch = algMonat × dauer */
  gesamt: number;
  /** Letztes Netto (Schätzung, gleich leistungsentgeltMonat) */
  letztesNetto: number;
  verlust: number;
  verlustProzent: number;
  /** Bemessungsentgelt = min(brutto, BBG_RV_MONAT) */
  bemessung: number;
  /** 0,60 oder 0,67 nach § 149 SGB III */
  satz: number;
}

// === Konstanten gegen SGB III ===

/** § 149 SGB III: 60 % kinderlos */
export const ALG_SATZ_OHNE_KIND = 0.60;
/** § 149 SGB III: 67 % mit Kind */
export const ALG_SATZ_MIT_KIND = 0.67;
/** § 153 Abs. 1 Satz 2 Nr. 1 SGB III: pauschalierter Sozialabzug */
export const SV_PAUSCHALE_PROZENT = 0.21;
/** Kirchensteuer-Anteil pauschal 9 % der Lohnsteuer (vereinfacht, ohne BY/BW-Sonderfall) */
export const KIRCHENSTEUER_ANTEIL_PAUSCHAL = 0.09;

/**
 * § 147 Abs. 2 SGB III: Anspruchsdauer-Tabelle.
 *
 * Tabelle (Versicherungspflicht-Monate → Monate Anspruch, abhängig vom Alter):
 *   12 Mon   → 6 Mon
 *   16 Mon   → 8 Mon
 *   20 Mon   → 10 Mon
 *   24 Mon   → 12 Mon
 *   30 Mon ab Alter 50 → 15 Mon
 *   36 Mon ab Alter 55 → 18 Mon
 *   48 Mon ab Alter 58 → 24 Mon
 *
 * Höhere Stufen erhalten Vorrang. Unter 12 Mon Versicherungspflicht → kein Anspruch.
 */
export function bezugsdauerMonate(alter: number, beschMonate: number): number {
  if (alter >= 58 && beschMonate >= 48) return 24;
  if (alter >= 55 && beschMonate >= 36) return 18;
  if (alter >= 50 && beschMonate >= 30) return 15;
  if (beschMonate >= 24) return 12;
  if (beschMonate >= 20) return 10;
  if (beschMonate >= 16) return 8;
  if (beschMonate >= 12) return 6;
  return 0;
}

/**
 * Vereinfachte Jahres-Lohnsteuer für ALG-Berechnung.
 *
 * **L-35-Anti-Pattern (dokumentiert):** Faktor 1,15 für Stkl V/VI ist eine
 * grobe Näherung. Der echte PAP § 39b liegt bei ~1,4–1,6. Pre-Welle-4-TODO
 * im ursprünglichen Component-Code; ein Refactor auf
 * `berechneLohnsteuerJahr` aus `lohnsteuer.ts` würde die exakte PAP-Berechnung
 * liefern. Bewusst nicht in M2c-Scope (M2c ist Verify-Backfill, nicht
 * Lib-Korrektur).
 */
export function berechneVereinfachteLohnsteuerJahr(zvE: number, klasse: Steuerklasse): number {
  const zvEff = klasse === 'III' ? zvE / 2 : zvE;
  let steuer = berechneEStGrund(Math.max(0, zvEff), 2026);
  if (klasse === 'III') steuer *= 2;
  if (klasse === 'V' || klasse === 'VI') steuer *= 1.15;
  return Math.max(0, steuer);
}

export function berechneArbeitslosengeld(eingabe: ArbeitslosengeldEingabe): ArbeitslosengeldErgebnis {
  const { brutto, klasse, mitKind, alter, beschMonate, kirchensteuer } = eingabe;

  // § 153 SGB III: Bemessungsentgelt = brutto, gedeckelt auf BBG-RV
  const bemessung = Math.min(Math.max(0, brutto), BBG_RV_MONAT);

  // Vereinfachte Lohnsteuer (L-35-Approximation für V/VI)
  const jahresBrutto = bemessung * 12;
  const lstJahr = berechneVereinfachteLohnsteuerJahr(jahresBrutto, klasse);
  const lstMonat = lstJahr / 12;

  // Soli mit Freigrenze + Milderungszone (zentrale Lib)
  const splittingtarif = klasse === 'III';
  const soliJahr = berechneSoli(lstJahr, splittingtarif, 2026);
  const soli = soliJahr / 12;

  // Kirchensteuer (vereinfacht 9 %, ohne BY/BW-Sonderfall)
  const kiSt = kirchensteuer ? lstMonat * KIRCHENSTEUER_ANTEIL_PAUSCHAL : 0;

  // § 153 SGB III: pauschalierter Sozialabzug
  const svPauschale = bemessung * SV_PAUSCHALE_PROZENT;

  // Leistungsentgelt = pauschaliertes Netto
  const leistungsentgeltMonat = Math.max(0, bemessung - lstMonat - soli - kiSt - svPauschale);
  const tagesLeistungsentgelt = leistungsentgeltMonat / 30;

  // § 149 SGB III: Leistungssatz 60 % oder 67 %
  const satz = mitKind ? ALG_SATZ_MIT_KIND : ALG_SATZ_OHNE_KIND;
  const algTag = tagesLeistungsentgelt * satz;
  const algMonat = algTag * 30;

  // § 147 SGB III: Anspruchsdauer
  const dauer = bezugsdauerMonate(alter, beschMonate);
  const gesamt = algMonat * dauer;

  // Vergleich mit letztem Netto
  const letztesNetto = leistungsentgeltMonat;
  const verlust = letztesNetto - algMonat;
  const verlustProzent = letztesNetto > 0 ? (verlust / letztesNetto) * 100 : 0;

  return {
    algMonat,
    algTag,
    dauer,
    gesamt,
    letztesNetto,
    verlust,
    verlustProzent,
    bemessung,
    satz,
  };
}
