/**
 * Ehegattenunterhalt — Berechnung nach Differenzmethode (3/7 bzw. 45 %).
 *
 * Quellen:
 * - BGB § 1361 (Trennungsunterhalt):
 *   https://www.gesetze-im-internet.de/bgb/__1361.html
 * - BGB §§ 1569 ff. (Nachehelicher Unterhalt)
 * - BGB § 1609 (Vorrang Kindesunterhalt)
 * - Düsseldorfer Tabelle 2026 (OLG Düsseldorf, Stand 01.01.2026):
 *   Selbstbehalt gegenüber Ehegatten = 1.600 € (erwerbstätig) bzw. 1.475 €
 *   (nicht erwerbstätig). Differenzierung gilt für Trennungs- UND nach-
 *   ehelichen Unterhalt gleichermaßen — Achse ist die Erwerbstätigkeit,
 *   NICHT die Trennungsphase (149c-Korrektur 28.04.2026).
 * - 3/7-Methode (BGH-Standard, ≈ 42,857 %): bundesweit etablierte Recht-
 *   sprechung für Differenzunterhalt mit Erwerbstätigenbonus.
 * - Süddeutsche Leitlinien (45 %): OLG-Bezirke Bamberg, Karlsruhe, München,
 *   Nürnberg, Stuttgart, Zweibrücken — abweichende Quote zur Differenzmethode.
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. Konfig-Erklärtext):
 *   - § 1573 BGB Anschlussunterhalt (Übergangs-Logik) NICHT modelliert
 *   - § 1574 BGB Erwerbsobliegenheit (fiktives Einkommen) NICHT modelliert
 *   - § 1577 BGB Anrechnung eigenes Vermögen NICHT modelliert
 *   - DT-Selbstbehalt-Werte sind als Konstanten hard-coded, NICHT aus
 *     `duesseldorfer-tabelle.ts` gezogen (DT-Lib hat aktuell keinen
 *     `SELBSTBEHALT_EHEGATTE`-Export — falls künftig hinzugefügt, hier
 *     auf Cross-Lib-Computation umstellen, L-36-Vorgriff)
 *
 * Welle-4 M3a — Lib-Extraktion aus EhegattenunterhaltRechner.tsx (03.05.2026).
 * Component zuvor KEINE-LIB mit 255 LoC inline-Logik.
 */

/** Berechnungsmethode für die Differenzunterhalts-Quote. */
export type EhegattenunterhaltMethode = 'bundesweit' | 'sueddeutsch';

/** Bundesweite 3/7-Methode (BGH-Standard, ≈ 42,857 %). */
export const QUOTE_BUNDESWEIT = 3 / 7;
/** Süddeutsche Leitlinien (45 %), gilt in OLG-Bezirken Bamberg, Karlsruhe,
 *  München, Nürnberg, Stuttgart, Zweibrücken. */
export const QUOTE_SUEDDEUTSCH = 0.45;

/** Selbstbehalt gegenüber Ehegatten 2026 (Düsseldorfer Tabelle):
 *  1.600 € wenn der Pflichtige erwerbstätig ist. */
export const SELBSTBEHALT_ERWERBSTAETIG = 1600;
/** Selbstbehalt gegenüber Ehegatten 2026: 1.475 € wenn nicht erwerbstätig. */
export const SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475;

export interface EhegattenunterhaltEingabe {
  /** Netto-Einkommen Pflichtiger (€/Monat) */
  netto1: number;
  /** Netto-Einkommen Berechtigter (€/Monat) */
  netto2: number;
  /** Kindesunterhalts-Vorabzug (€/Monat). Wird vor Differenz-Berechnung von netto1 abgezogen. */
  kindesunterhalt: number;
  /** Wenn true: Kindesunterhalt ist bereits im angegebenen netto1 abgezogen → kein zusätzlicher Vorabzug. */
  kuBeruecksichtigt: boolean;
  /** SB-Achse: 1.600 € (erwerbstätig) vs. 1.475 € (nicht erwerbstätig). */
  pflichtigerErwerbstaetig: boolean;
  methode: EhegattenunterhaltMethode;
}

export interface EhegattenunterhaltErgebnis {
  n1: number;
  n2: number;
  /** Effektiv abgezogener Kindesunterhalt (0 wenn `kuBeruecksichtigt = true`). */
  ku: number;
  /** netto1 minus ku, geclampt auf 0. */
  bereinigt1: number;
  /** bereinigt1 minus netto2 (ohne Floor — kann negativ sein). */
  differenz: number;
  /** differenz × quote, gerundet auf volle €, geclampt auf 0. */
  berechnet: number;
  /** Tatsächlicher Unterhalt = min(berechnet, maxUnterhalt). */
  unterhalt: number;
  /** Verbleibendes Einkommen Pflichtiger nach Unterhalt. */
  rest1: number;
  /** Gesamt-Einkommen Berechtigter (netto2 + unterhalt). */
  gesamt2: number;
  selbstbehalt: number;
  /** Maximaler Unterhalt vor SB-Klemme = max(0, bereinigt1 − selbstbehalt). */
  maxUnterhalt: number;
  /** True, wenn die SB-Klemme den berechneten 3/7-/45%-Wert reduziert hat. */
  gekappt: boolean;
  /** Verwendete Quote (3/7 oder 0,45). */
  quote: number;
}

export function berechneEhegattenunterhalt(eingabe: EhegattenunterhaltEingabe): EhegattenunterhaltErgebnis {
  const { netto1, netto2, kindesunterhalt, kuBeruecksichtigt, pflichtigerErwerbstaetig, methode } = eingabe;

  const ku = kuBeruecksichtigt ? 0 : Math.max(0, kindesunterhalt);
  const n1 = Math.max(0, netto1);
  const n2 = Math.max(0, netto2);

  const bereinigt1 = Math.max(0, n1 - ku);
  const differenz = bereinigt1 - n2;

  const quote = methode === 'sueddeutsch' ? QUOTE_SUEDDEUTSCH : QUOTE_BUNDESWEIT;
  const berechnet = Math.max(0, Math.round(differenz * quote));

  const selbstbehalt = pflichtigerErwerbstaetig
    ? SELBSTBEHALT_ERWERBSTAETIG
    : SELBSTBEHALT_NICHT_ERWERBSTAETIG;
  const maxUnterhalt = Math.max(0, bereinigt1 - selbstbehalt);
  const unterhalt = Math.min(berechnet, maxUnterhalt);

  const rest1 = bereinigt1 - unterhalt;
  const gesamt2 = n2 + unterhalt;
  const gekappt = berechnet > maxUnterhalt;

  return {
    n1,
    n2,
    ku,
    bereinigt1,
    differenz,
    berechnet,
    unterhalt,
    rest1,
    gesamt2,
    selbstbehalt,
    maxUnterhalt,
    gekappt,
    quote,
  };
}
