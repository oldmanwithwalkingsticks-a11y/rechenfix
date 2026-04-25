/**
 * Verbraucherpreisindex (VPI) Deutschland — zentrale SSOT.
 *
 * Quelle: Statistisches Bundesamt (Destatis), Pressemitteilung VPI (monatlich,
 *   ~10. des Folgemonats). Basisjahr 2020 = 100.
 * Stand: 04/2026 — Update monatlich nach Destatis-Veröffentlichung.
 *
 * Verwendung:
 * - `VPI_AKTUELL` als Default für Indexmiete-Beispielrechnung (`indexmiete-rechner`)
 * - `VPI_JAHRESDURCHSCHNITTE` für historische Vergleiche
 *
 * Hinweis: Die monatliche Aktualisierung ist „nice to have", nicht „must
 * have" — der Wert beeinflusst keine Berechnung, sondern nur das im Beispiel
 * eingesetzte Default.
 */

export const VPI_BASISJAHR = 2020;

export const VPI_AKTUELL = {
  /** Letzter veröffentlichter Monatswert, ISO YYYY-MM */
  monat: '2026-03',
  /** Indexstand März 2026 (Basisjahr 2020 = 100) */
  wert: 125.8,
  /** Veränderung gegenüber Vorjahresmonat in Prozent */
  veraenderungVorjahresmonat: 2.7,
} as const;

export const VPI_JAHRESDURCHSCHNITTE: Record<number, number> = {
  2020: 100.0,
  2021: 103.2,
  2022: 110.4,
  2023: 116.9,
  2024: 121.9,
  2025: 124.6,
};
