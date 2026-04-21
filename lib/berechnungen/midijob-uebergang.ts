/**
 * Übergangsbereich Midijob nach § 20a SGB IV.
 *
 * Gilt für regelmäßiges Arbeitsentgelt über der Geringfügigkeitsgrenze
 * bis 2.000 €/Monat (seit 01.01.2023, vorher 1.600 €).
 *
 * Der "reduzierte beitragspflichtige Verdienst" BE wird als Zwischenwert
 * berechnet und dient als Bemessungsgrundlage für den AN-SV-Anteil.
 * Der AG zahlt dagegen auf das volle Brutto (GKV normal, RV/AV leicht
 * abgesenkt), was im Übergangsbereich zu einem AN-SV-Vorteil führt.
 *
 * Quelle: § 20a SGB IV, gemeinsame Rundschreiben der Spitzenverbände
 * der Sozialversicherung.
 */

import { getMinijobGrenzeMonat } from './mindestlohn';

/** Obergrenze Übergangsbereich (konstant seit 01.01.2023, § 20a SGB IV). */
export const MIDIJOB_OBERGRENZE_MONAT = 2_000;

/**
 * F-Faktor § 20a Abs. 2 SGB IV für das Kalenderjahr 2026: **0,6847**.
 *
 * Herleitung: F ergibt sich aus dem Verhältnis der SV-Durchschnitts-
 * beitragssätze (GKV inkl. Zusatzbeitrag, PV, RV, AV) auf der
 * AG-Pauschal-Seite zur vollen Beitragsbelastung. Die Spitzenverbände
 * der Sozialversicherung (GKV-Spitzenverband, DRV Bund, BA) weisen F
 * jährlich in einem gemeinsamen Rundschreiben aus.
 *
 * Regressions-Falle zum Jahreswechsel:
 * - Zum 01.01.2027 neu prüfen (veränderte Beitragssätze → anderer F).
 * - Bei unterjähriger Änderung (selten, aber möglich bei SV-Reformen)
 *   analog zum Stichtag-Switch-Pattern in `mindestlohn.ts` /
 *   `rente.ts` / `pfaendung.ts` umstellen. Bis dahin reicht das
 *   Jahres-Audit (siehe `docs/jahreswerte-kalender.md`, Dez-15-Check).
 */
export const FAKTOR_F_2026 = 0.6847;

/**
 * Untergrenze des Midijob-Übergangsbereichs = Minijob-Grenze + 0,01 €.
 * Dynamisch via Stichtag-Switch (Minijob-Grenze 603 € in 2026, 633 € ab 2027).
 */
export function getMidijobUntergrenze(stichtag: Date = new Date()): number {
  return getMinijobGrenzeMonat(stichtag) + 0.01;
}

/**
 * Berechnet den reduzierten beitragspflichtigen Verdienst BE
 * nach § 20a Abs. 2 SGB IV für einen Brutto-Verdienst im Übergangsbereich.
 *
 * Formel: BE = F × UG + ((OG − F × UG) / (OG − UG)) × (Brutto − UG)
 *
 * Randwerte zur Verifikation (2026 mit UG = 603,01):
 * - bei Brutto = UG: BE = F × UG ≈ 0,6847 × 603,01 ≈ 412,88 €
 * - bei Brutto = OG: BE = OG = 2.000 € (keine Ermäßigung mehr)
 *
 * @returns Reduzierte Bemessungsgrundlage in Euro, oder NaN außerhalb des Bereichs.
 */
export function berechneBemessungsgrundlageAN(
  brutto: number,
  stichtag: Date = new Date(),
): number {
  const UG = getMidijobUntergrenze(stichtag);
  const OG = MIDIJOB_OBERGRENZE_MONAT;
  const F = FAKTOR_F_2026;

  if (brutto < UG || brutto > OG) return NaN;

  return F * UG + ((OG - F * UG) / (OG - UG)) * (brutto - UG);
}
