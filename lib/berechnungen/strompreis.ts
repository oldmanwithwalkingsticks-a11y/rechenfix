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

/**
 * Herkunft und Alter der Werte oben. Bewusst NICHT in STROMPREIS_2026 selbst,
 * weil StromTarifProfil dessen Schluessel als Tarifprofile verwendet — ein
 * Textfeld dort wuerde den Rueckgabetyp von getStrompreis aufweichen.
 */
export const STROMPREIS_META = {
  /** Datenstand der Quelle. BDEW veroeffentlicht wenige Male im Jahr. */
  stand: '2026-04',
  /**
   * Tag, an dem zuletzt gegen die BDEW-Seite abgeglichen wurde, ob eine neuere
   * Ausgabe vorliegt. Diesen Wert prueft check-jahreswerte, nicht `stand`:
   * Ein alter Datenstand bedeutet hier keinen falschen Wert, sondern nur, dass
   * die Quelle selbst noch nichts Neueres veroeffentlicht hat.
   * Zuletzt bestaetigt: Analyse vom 15.04.2026, Haushalte 37,0 ct/kWh
   * (Januar-Ausgabe 37,2 ct/kWh).
   */
  geprueft: '2026-08-14',
  quelle: 'BDEW-Strompreisanalyse',
} as const;

export type StromTarifProfil = keyof typeof STROMPREIS_2026;

export function getStrompreis(profil: StromTarifProfil = 'durchschnitt_bdew'): number {
  return STROMPREIS_2026[profil];
}
