/**
 * Strompreis Deutschland — zentrale SSOT.
 *
 * Quelle: BDEW-Strompreisanalyse 04/2026 · Finanztip · ADAC Strompreisartikel 04/2026.
 * Stand: 04/2026 — jährlich aktualisieren nach BDEW-Q1-Veröffentlichung.
 *
 * Konsumenten importieren ausschließlich `getStrompreis(profil)` oder die
 * passende benannte Konstante — niemals hartcodierte Werte (32, 36, 37 ct
 * etc.) verwenden.
 */

export const STROMPREIS_2026 = {
  /** BDEW-Mittelwert aller Tarife (Bestand + Neu + Grundversorgung), 3.500 kWh/Jahr */
  durchschnitt_bdew: 37,
  /** Typischer Festpreis-Neukundentarif (Verivox/Check24), 3.500 kWh */
  neukunden_festpreis: 33,
  /** Worst-Case Grundversorgungstarif (Arbeitspreis) */
  grundversorgung: 40,
  /** Wärmepumpenstrom-Spezialtarif (HT, separater Zähler) */
  waermepumpen_tarif: 28,
} as const;

export type StromTarifProfil = keyof typeof STROMPREIS_2026;

export function getStrompreis(profil: StromTarifProfil = 'durchschnitt_bdew'): number {
  return STROMPREIS_2026[profil];
}
