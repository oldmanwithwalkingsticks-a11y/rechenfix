/**
 * Übergangsbereich Midijob nach § 20a SGB IV.
 *
 * Gilt für regelmäßiges Arbeitsentgelt über der Geringfügigkeitsgrenze G
 * bis zur Obergrenze OG (2.000 €/Monat seit 01.01.2023).
 *
 * Seit 01.10.2022 gibt es ZWEI getrennte Bemessungsgrundlagen:
 *  - **BE_gesamt** (§ 20a Abs. 2 SGB IV) — für den Gesamtbeitrag und für
 *    RV-Entgeltpunkte (§ 163 Abs. 10 SGB VI: volle Ansprüche trotz
 *    reduzierter AN-Belastung).
 *  - **BE_AN** (§ 20a Abs. 2a SGB IV) — für den Arbeitnehmer-Beitragsanteil.
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
 * Quelle: § 20a SGB IV, gemeinsame Rundschreiben der SV-Spitzenverbände.
 */

import { getMinijobGrenzeMonat } from './mindestlohn';
import {
  getAktuelleMidijobParameter,
  getBeitragsFormeln,
  type MidijobParameter,
} from './midijob-parameter';

/**
 * Obergrenze Übergangsbereich (konstant seit 01.01.2023, § 20a SGB IV).
 * Re-export für Abwärts-Kompatibilität mit bestehenden Konsumenten.
 */
export const MIDIJOB_OBERGRENZE_MONAT = 2_000;

/**
 * F-Faktor § 20a Abs. 2 SGB IV für 2026. Re-export aus der Parameter-Lib
 * für Abwärts-Kompatibilität — neue Konsumenten sollten direkt
 * `getAktuelleMidijobParameter().faktorF` verwenden.
 */
export const FAKTOR_F_2026 = getAktuelleMidijobParameter(new Date('2026-06-15')).faktorF;

/**
 * Untergrenze des Midijob-Übergangsbereichs = Minijob-Grenze + 0,01 €.
 * Dynamisch via Stichtag-Switch (Minijob-Grenze 603 € in 2026, 633 € ab 2027).
 *
 * Achtung: Die UG ist die Eintritts-Schwelle (AE > Minijob-Grenze). In den
 * § 20a-Formeln selbst wird aber die Geringfügigkeitsgrenze G (ohne +0,01)
 * verwendet — siehe `getBeitragsFormeln`.
 */
export function getMidijobUntergrenze(stichtag: Date = new Date()): number {
  return getMinijobGrenzeMonat(stichtag) + 0.01;
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
 * nach § 20a Abs. 2 SGB IV.
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
 *  - RV-Entgeltpunkte nach § 163 Abs. 10 SGB VI (voller Rentenanspruch)
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
 * nach § 20a Abs. 2a SGB IV (seit 01.10.2022).
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
