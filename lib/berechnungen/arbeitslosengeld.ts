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
 * - SGB III §§ 150, 151: Bemessungsentgelt = durchschnittlich auf den Tag entfallendes
 *   beitragspflichtiges Arbeitsentgelt im Bemessungszeitraum (Bemessungsrahmen ein Jahr),
 *   also Jahresentgelt ÷ 365; beitragspflichtig höchstens bis zur BBG-RV (§ 341 Abs. 4).
 *   https://www.gesetze-im-internet.de/sgb_3/__151.html
 * - SGB III § 153 Abs. 1 Satz 2: Abzüge abschließend 1. Sozialversicherungspauschale
 *   20 %, 2. Lohnsteuer nach PAP (Vorsorgepauschale mit ermäßigtem KV-Satz + durchschn.
 *   Zusatzbeitrag, PV-Satz § 55 Abs. 1 S. 1 SGB XI), 3. Solidaritätszuschlag.
 *   Keine Kirchensteuer. Freibeträge, die nicht jedem zustehen (Kinderfreibeträge),
 *   bleiben außer Ansatz (Satz 3 Nr. 1).
 *   https://www.gesetze-im-internet.de/sgb_3/__153.html
 * - SGB III § 154: ALG wird für Kalendertage berechnet; voller Monat = 30 Tage.
 * - SGB III § 338: Rechnung auf zwei Dezimalstellen, kaufmännisch gerundet.
 *
 * W187: vorher SV-Pauschale 21 %, Tagesentgelt = Monats-Leistungsentgelt ÷ 30 (statt
 * Jahresentgelt ÷ 365), Lohnsteuer aus dem Jahresbrutto statt nach Tagestabelle und
 * Abzug von Kirchensteuer (seit 2005 kein Abzug mehr, § 153 Abs. 1 S. 2 SGB III).
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen, ggü. Konfig-Erklärtext
 * nicht identisch):
 *   - § 155 SGB III Nebeneinkommen-Schwelle 165 €/Mon NICHT modelliert
 *     (Konfig erwähnt es, Lib hat keine Anrechnungs-Logik).
 *   - Eingabe ist ein gleichbleibendes Monatsbrutto für alle 12 Monate des
 *     Bemessungszeitraums; Einmalzahlungen und Faktorverfahren (§ 39f EStG) fehlen.
 *
 * Welle-4 M2c — Lib-Extraktion aus ArbeitslosengeldRechner.tsx (03.05.2026).
 * Welle-5 Track-B B2 (04.05.2026) — Lohnsteuer über den Voll-PAP aus lohnsteuer.ts.
 */

import { BBG_RV_MONAT } from './brutto-netto';
import { berechneLohnsteuerJahr, berechneLohnsteuerMitZuschlaegenJahr } from './lohnsteuer';

export type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

export interface ArbeitslosengeldEingabe {
  /** Monatsbrutto in € (Durchschnitt der letzten 12 Monate) */
  brutto: number;
  klasse: Steuerklasse;
  /** mit Kind → 67 % Leistungssatz, sonst 60 % */
  mitKind: boolean;
  /** Alter bei Arbeitslosmeldung in Jahren */
  alter: number;
  /** Versicherungspflichtige Monate in den letzten 5 Jahren */
  beschMonate: number;
}

export interface ArbeitslosengeldErgebnis {
  /** ALG für einen vollen Kalendermonat = algTag × 30 (§ 154 SGB III) */
  algMonat: number;
  /** ALG pro Kalendertag = leistungsentgeltTag × satz */
  algTag: number;
  /** Anspruchsdauer in Monaten nach § 147 SGB III */
  dauer: number;
  /** Gesamtanspruch = algMonat × dauer */
  gesamt: number;
  /** Leistungsentgelt für 30 Tage (pauschaliertes Netto, Basis des ALG) */
  letztesNetto: number;
  verlust: number;
  verlustProzent: number;
  /** Monatsbrutto gedeckelt auf die BBG-RV */
  bemessung: number;
  /** Tägliches Bemessungsentgelt = Jahresentgelt ÷ 365 (§ 151 SGB III) */
  bemessungTag: number;
  /** Sozialversicherungspauschale je Tag (20 %) */
  svPauschaleTag: number;
  /** Lohnsteuer je Tag (PAP, Lohnzahlungszeitraum Tag) */
  lohnsteuerTag: number;
  /** Solidaritätszuschlag je Tag */
  soliTag: number;
  /** Tägliches Leistungsentgelt (§ 153 SGB III) */
  leistungsentgeltTag: number;
  /** 0,60 oder 0,67 nach § 149 SGB III */
  satz: number;
}

// === Konstanten gegen SGB III ===

/** § 149 SGB III: 60 % kinderlos */
export const ALG_SATZ_OHNE_KIND = 0.60;
/** § 149 SGB III: 67 % mit Kind */
export const ALG_SATZ_MIT_KIND = 0.67;
/** § 153 Abs. 1 Satz 2 Nr. 1 SGB III: Sozialversicherungspauschale.
 *  W187: vorher 0,21 (der Satz beträgt seit 01.01.2019 20 %). */
export const SV_PAUSCHALE_PROZENT = 0.20;
/** §§ 150, 151 SGB III: Bemessungsrahmen ein Jahr → Tagesdurchschnitt über 365 Tage */
export const BEMESSUNG_TAGE_JAHR = 365;
/** § 154 SGB III: voller Kalendermonat = 30 Tage */
export const ALG_TAGE_MONAT = 30;

/** § 338 SGB III: zwei Dezimalstellen, ab 5 aufrunden */
const rund2 = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;

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
 * Mapping von Roman-Stkl-Strings (Component-API) auf numerische Stkl
 * (lohnsteuer.ts-API, intern PAP-konform).
 */
const KLASSE_TO_NUMERIC: Record<Steuerklasse, 1 | 2 | 3 | 4 | 5 | 6> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
};

/**
 * Jahres-Lohnsteuer-Wrapper (PAP 2026 über lohnsteuer.ts), Roman-Stkl → numerisch.
 * `jahresfreibetrag = 0` → keine eingearbeiteten Lohnsteuerfreibeträge.
 */
export function berechneVereinfachteLohnsteuerJahr(jahresBrutto: number, klasse: Steuerklasse): number {
  if (jahresBrutto <= 0) return 0;
  return berechneLohnsteuerJahr(jahresBrutto, KLASSE_TO_NUMERIC[klasse], 0);
}

/**
 * Lohnsteuer und Solidaritätszuschlag für einen Kalendertag nach PAP 2026
 * (Lohnzahlungszeitraum Tag, LZZ = 4): Der PAP rechnet den Tageslohn × 360 auf ein
 * Jahr hoch und nimmt vom Jahresbetrag in Cent 1/360, abgerundet. Ohne Kinderfreibeträge
 * (§ 153 Abs. 1 S. 3 Nr. 1 SGB III), Vorsorgepauschale mit Default-Parametern
 * (ermäßigter KV-Satz 14,0 % + durchschn. Zusatzbeitrag 2,9 %, PV 3,6 % ohne
 * Kinderlosenzuschlag = § 153 Abs. 1 S. 4 SGB III). Gegen den direkten PAP-Lauf mit
 * LZZ = 4 geprüft (4.380 Stützpunkte, Δ 0 Cent; scripts/verify-arbeitslosengeld.ts).
 * W187: vorher Lohnsteuer aus Monatsbrutto × 12 ohne Tagestabelle.
 */
export function lohnsteuerSoliTag(tagesentgelt: number, klasse: Steuerklasse): { lst: number; soli: number } {
  if (tagesentgelt <= 0) return { lst: 0, soli: 0 };
  const tagCent = Math.round(tagesentgelt * 100);
  const jahr = berechneLohnsteuerMitZuschlaegenJahr(tagCent * 360 / 100, KLASSE_TO_NUMERIC[klasse], 0, 0);
  const anteil = (betrag: number) => Math.floor(Math.round(betrag * 100) / 360) / 100;
  return { lst: anteil(jahr.lstJahr), soli: anteil(jahr.soliJahr) };
}

export function berechneArbeitslosengeld(eingabe: ArbeitslosengeldEingabe): ArbeitslosengeldErgebnis {
  const { brutto, klasse, mitKind, alter, beschMonate } = eingabe;

  // Beitragspflichtiges Monatsentgelt, gedeckelt auf die BBG-RV
  const bemessung = Math.min(Math.max(0, brutto), BBG_RV_MONAT);

  // §§ 150, 151 SGB III: Entgelt im Bemessungszeitraum (12 Monate) ÷ 365 Tage.
  // W187: vorher Monatsbetrag ÷ 30 (Tagesentgelt um 365/360 zu hoch).
  const bemessungTag = rund2((bemessung * 12) / BEMESSUNG_TAGE_JAHR);

  // § 153 Abs. 1 S. 2 SGB III: SV-Pauschale 20 %, Lohnsteuer, Soli — keine Kirchensteuer.
  const svPauschaleTag = rund2(bemessungTag * SV_PAUSCHALE_PROZENT);
  const { lst: lohnsteuerTag, soli: soliTag } = lohnsteuerSoliTag(bemessungTag, klasse);
  const leistungsentgeltTag = Math.max(0, rund2(bemessungTag - svPauschaleTag - lohnsteuerTag - soliTag));

  // § 149 SGB III: Leistungssatz 60 % oder 67 %
  const satz = mitKind ? ALG_SATZ_MIT_KIND : ALG_SATZ_OHNE_KIND;
  const algTag = rund2(leistungsentgeltTag * satz);
  // § 154 SGB III: voller Kalendermonat = 30 Tage
  const algMonat = rund2(algTag * ALG_TAGE_MONAT);

  // § 147 SGB III: Anspruchsdauer
  const dauer = bezugsdauerMonate(alter, beschMonate);
  const gesamt = rund2(algMonat * dauer);

  // Vergleich mit dem pauschalierten Netto (Leistungsentgelt für 30 Tage)
  const letztesNetto = rund2(leistungsentgeltTag * ALG_TAGE_MONAT);
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
    bemessungTag,
    svPauschaleTag,
    lohnsteuerTag,
    soliTag,
    leistungsentgeltTag,
    satz,
  };
}
