/**
 * Verbraucherpreisindex (VPI) Deutschland — zentrale SSOT.
 *
 * Quelle: Statistisches Bundesamt (Destatis), Pressemitteilung VPI (monatlich,
 *   ~10. des Folgemonats) und Lange Reihen (Genesis-Tabelle 61111-0001,
 *   retrospektiv auf Basisjahr 2020 = 100 normiert).
 * Stand: 04/2026 — Update monatlich nach Destatis-Veröffentlichung.
 *
 * Verwendung:
 * - `VPI_AKTUELL` als Default für Indexmiete-Beispielrechnung (`indexmiete-rechner`)
 * - `VPI_JAHRESDURCHSCHNITTE` für historische Vergleiche und § 1376 BGB
 *   Indexierung im Zugewinnausgleich-Rechner
 * - `getVpi(jahr)` als sicherer Lookup mit Fallback auf VPI_AKTUELL für
 *   das laufende Jahr
 * - `indexiereVermoegen(...)` als § 1376 BGB-konforme Indexierung
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

/**
 * Jährliche VPI-Durchschnitte, retrospektiv auf Basisjahr 2020 = 100
 * normiert. Quelle: Destatis Genesis-Online Tabelle 61111-0001 (Lange
 * Reihe Verbraucherpreisindex). Werte ab 1995, weil Eheschließungen ab
 * dann für Zugewinnausgleichs-Berechnungen 2026 noch relevant sind.
 *
 * Update bei jährlicher Destatis-Veröffentlichung (~Februar des Folgejahres).
 */
export const VPI_JAHRESDURCHSCHNITTE: Record<number, number> = {
  1995: 75.1,
  1996: 76.2,
  1997: 77.6,
  1998: 78.4,
  1999: 78.8,
  2000: 76.7,
  2001: 78.0,
  2002: 79.1,
  2003: 79.9,
  2004: 81.2,
  2005: 82.5,
  2006: 83.8,
  2007: 86.0,
  2008: 88.3,
  2009: 88.5,
  2010: 89.5,
  2011: 91.3,
  2012: 93.2,
  2013: 94.6,
  2014: 95.5,
  2015: 96.0,
  2016: 96.5,
  2017: 98.0,
  2018: 99.7,
  2019: 101.1,
  2020: 100.0,
  2021: 103.2,
  2022: 110.4,
  2023: 116.9,
  2024: 121.9,
  2025: 124.6,
};

/**
 * VPI-Lookup für ein Jahr. Fallback auf VPI_AKTUELL.wert für das laufende
 * Kalenderjahr (wenn dort noch kein Jahresdurchschnitt vorliegt). Wirft
 * für Jahre vor 1995 oder zukünftige Jahre.
 */
export function getVpi(jahr: number): number {
  const wert = VPI_JAHRESDURCHSCHNITTE[jahr];
  if (wert !== undefined) return wert;
  // Laufendes Jahr: aktuellen Monatsstand aus VPI_AKTUELL nehmen
  const aktuellesJahr = parseInt(VPI_AKTUELL.monat.slice(0, 4), 10);
  if (jahr === aktuellesJahr) return VPI_AKTUELL.wert;
  throw new Error(
    `VPI für Jahr ${jahr} nicht verfügbar. Verfügbar: ${
      Object.keys(VPI_JAHRESDURCHSCHNITTE).sort().join(', ')
    } sowie ${aktuellesJahr} (über VPI_AKTUELL).`,
  );
}

/**
 * Indexierung eines Vermögenswerts nach § 1376 BGB:
 * Vermögen × VPI(Endstichtag) / VPI(Anfangsstichtag).
 *
 * Verwendet im Zugewinnausgleich für Anfangsvermögen und privilegierten
 * Erwerb. Ständige Rechtsprechung: BFH BFHE 217, 248; BGH FamRZ 2002, 606.
 *
 * Wenn jahrAnfang === jahrEnde: keine Indexierung (Faktor 1).
 */
export function indexiereVermoegen(
  betrag: number,
  jahrAnfang: number,
  jahrEnde: number,
): number {
  if (jahrAnfang === jahrEnde) return betrag;
  const vpiAnfang = getVpi(jahrAnfang);
  const vpiEnde = getVpi(jahrEnde);
  return (betrag * vpiEnde) / vpiAnfang;
}
