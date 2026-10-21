/**
 * Übergangsbereich Midijob nach § 20 Abs. 2 und 2a SGB IV.
 *
 * Gilt für regelmäßiges Arbeitsentgelt über der Geringfügigkeitsgrenze G
 * bis zur Obergrenze OG (2.000 €/Monat seit 01.01.2023).
 *
 * Seit 01.10.2022 gibt es ZWEI getrennte Bemessungsgrundlagen:
 *  - **BE_gesamt** (§ 20 Abs. 2a Satz 1 SGB IV) — für den Gesamtbeitrag und den
 *    PV-Zuschlag für Kinderlose. Die Entgeltpunkte der Rente kommen aus dem
 *    tatsächlichen Entgelt (§ 70 Abs. 1a SGB VI, seit 01.07.2019).
 *  - **BE_AN** (§ 20 Abs. 2a Satz 6 SGB IV) — für den Arbeitnehmer-Beitragsanteil.
 *    Startet an der Untergrenze mit 0 und steigt linear auf OG.
 *
 * Der Arbeitgeber trägt den Differenzbetrag (Gesamtbeitrag − AN-Anteil),
 * also im Übergangsbereich deutlich mehr als die halbe Beitragslast —
 * das ist der eigentliche Midijob-Vorteil für den Arbeitnehmer.
 *
 * Parameter (G, OG, F) aus SSOT `midijob-parameter.ts` mit Stichtag-Switch.
 * Formel-Konstanten werden aus den Parametern abgeleitet — verhindert
 * die „F × OG statt F × G"-Verdrehung strukturell.
 *
 * Quelle: § 20 Abs. 2 und 2a SGB IV, gemeinsame Rundschreiben der SV-Spitzenverbände.
 */

import {
  getAktuelleMidijobParameter,
  getBeitragsFormeln,
  type MidijobParameter,
} from './midijob-parameter';

/**
 * Obergrenze Übergangsbereich (konstant seit 01.01.2023, § 20 Abs. 2 SGB IV).
 * Re-export für Abwärts-Kompatibilität mit bestehenden Konsumenten.
 */
export const MIDIJOB_OBERGRENZE_MONAT = 2_000;

/**
 * F-Faktor § 20 Abs. 2a SGB IV für 2026. Re-export aus der Parameter-Lib
 * für Abwärts-Kompatibilität — neue Konsumenten sollten direkt
 * `getAktuelleMidijobParameter().faktorF` verwenden.
 */
export const FAKTOR_F_2026 = getAktuelleMidijobParameter(new Date(2026, 5, 15)).faktorF;

/**
 * Untergrenze des Midijob-Übergangsbereichs = Geringfügigkeitsgrenze G + 0,01 €.
 * W166: G kommt aus demselben Parameter-Bucket wie Faktor F, damit Grenze und Formeln
 * nie aus verschiedenen Jahren stammen (vorher getMinijobGrenzeMonat: ab 01.01.2027
 * 633 € mit F und G = 603 € aus 2026). Ein neuer Bucket MIDIJOB_2027 hebt G auf 633 €.
 *
 * Achtung: Die UG ist die Eintritts-Schwelle (AE > Minijob-Grenze). In den
 * Formeln des § 20 Abs. 2a selbst wird aber die Geringfügigkeitsgrenze G (ohne +0,01)
 * verwendet — siehe `getBeitragsFormeln`.
 */
export function getMidijobUntergrenze(stichtag: Date = new Date()): number {
  return getAktuelleMidijobParameter(stichtag).geringfuegigkeitsgrenzeG + 0.01;
}

/**
 * Prüft, ob ein Brutto-Verdienst im Midijob-Übergangsbereich liegt.
 * Gilt für: UG ≤ brutto ≤ OG (strikt größer als Minijob-Grenze).
 */
export function istImUebergangsbereich(
  brutto: number,
  stichtag: Date = new Date(),
): boolean {
  const UG = getMidijobUntergrenze(stichtag);
  return brutto >= UG && brutto <= MIDIJOB_OBERGRENZE_MONAT;
}

/**
 * Berechnet die beitragspflichtige Gesamt-Bemessungsgrundlage `BE_gesamt`
 * nach § 20 Abs. 2a Satz 1 SGB IV.
 *
 * Formel: `BE_gesamt = faktorGesamt × AE − konstanteGesamt`
 * mit `faktorGesamt = (OG − F × G) / (OG − G)` und
 *     `konstanteGesamt = faktorGesamt × G − F × G`
 *
 * Randwerte zur Verifikation (2026: G = 603, OG = 2.000, F = 0,6619):
 *  - bei AE = G: BE_gesamt = F × G ≈ 399,13 €
 *  - bei AE = OG: BE_gesamt = OG = 2.000 €
 *
 * Wird für:
 *  - Gesamtbeitrags-Berechnung (AN + AG)
 *  - PV-Zuschlag für Kinderlose (trägt der AN allein)
 *
 * @returns BE_gesamt in Euro, oder NaN außerhalb des Übergangsbereichs.
 */
export function berechneBemessungsgrundlageGesamt(
  brutto: number,
  stichtag: Date = new Date(),
): number {
  if (!istImUebergangsbereich(brutto, stichtag)) return NaN;
  const params = getAktuelleMidijobParameter(stichtag);
  const { faktorGesamt, konstanteGesamt } = getBeitragsFormeln(params);
  return faktorGesamt * brutto - konstanteGesamt;
}

/**
 * Berechnet die reduzierte AN-Bemessungsgrundlage `BE_AN`
 * nach § 20 Abs. 2a Satz 6 SGB IV (seit 01.10.2022).
 *
 * Formel: `BE_AN = faktorAN × AE − konstanteAN`
 * mit `faktorAN = OG / (OG − G)` und `konstanteAN = faktorAN × G`
 *
 * Die Formel ist **F-unabhängig**. Randwerte zur Verifikation (2026):
 *  - bei AE = G = 603: BE_AN = 0 (AN zahlt faktisch nichts)
 *  - bei AE = OG = 2.000: BE_AN = 2.000 (kein Midijob-Effekt mehr)
 *
 * @returns BE_AN in Euro, oder NaN außerhalb des Übergangsbereichs.
 */
export function berechneBemessungsgrundlageAN(
  brutto: number,
  stichtag: Date = new Date(),
): number {
  if (!istImUebergangsbereich(brutto, stichtag)) return NaN;
  const params = getAktuelleMidijobParameter(stichtag);
  const { faktorAN, konstanteAN } = getBeitragsFormeln(params);
  return faktorAN * brutto - konstanteAN;
}

/**
 * Abwärts-Kompatibilität: Re-export der Parameter-Helpers für bestehende
 * Konsumenten, die nicht auf die neue `midijob-parameter.ts`-Lib migriert sind.
 */
export { getAktuelleMidijobParameter, getBeitragsFormeln };
export type { MidijobParameter };
