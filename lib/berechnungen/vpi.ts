/**
 * Verbraucherpreisindex (VPI) Deutschland — zentrale SSOT.
 *
 * Quelle: Statistisches Bundesamt (Destatis), Pressemitteilung VPI (monatlich,
 *   ~10. des Folgemonats) und Lange Reihen (Genesis-Tabelle 61111-0001,
 *   retrospektiv auf Basisjahr 2020 = 100 normiert).
 * Stand: 09/2026 (September, endgültig — Destatis PM Nr. 364 vom 13.10.2026: 126,6, +3,3 % zum
 *   Vorjahresmonat). Update monatlich nach Destatis-Veröffentlichung; check-jahreswerte warnt, wenn
 *   VPI_AKTUELL.monat älter als 75 Tage ist (W180: der Wert stand vorher noch auf Mai 2026).
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
  monat: '2026-09',
  /** Indexstand September 2026 (Basisjahr 2020 = 100) */
  wert: 126.6,
  /** Veränderung gegenüber Vorjahresmonat in Prozent */
  veraenderungVorjahresmonat: 3.3,
} as const;

/**
 * Jährliche VPI-Durchschnitte, retrospektiv auf Basisjahr 2020 = 100
 * normiert. Quelle: Destatis Genesis-Online Tabelle 61111-0001 (Lange
 * Reihe Verbraucherpreisindex), 2021–2025 auch Destatis-Basisdaten vpi141a
 * (Stand 13.10.2026). Werte ab 1995, weil Eheschließungen ab dann für
 * Zugewinnausgleichs-Berechnungen 2026 noch relevant sind.
 *
 * W180: Die Reihe war bis auf 2020 durchgehend falsch (z. B. 2010 89,5 statt 88,1,
 * 2019 101,1 statt 99,5, 2024 121,9 statt 119,3, 2025 124,6 statt 121,9) — vermutlich
 * aus einer Reihe mit anderem Basisjahr bzw. um ein Jahr verschoben übernommen.
 *
 * Update bei jährlicher Destatis-Veröffentlichung (~Februar des Folgejahres).
 */
export const VPI_JAHRESDURCHSCHNITTE: Record<number, number> = {
  1995: 71.0,
  1996: 72.0,
  1997: 73.4,
  1998: 74.0,
  1999: 74.5,
  2000: 75.5,
  2001: 77.0,
  2002: 78.1,
  2003: 78.9,
  2004: 80.2,
  2005: 81.5,
  2006: 82.8,
  2007: 84.7,
  2008: 86.9,
  2009: 87.2,
  2010: 88.1,
  2011: 90.0,
  2012: 91.7,
  2013: 93.1,
  2014: 94.0,
  2015: 94.5,
  2016: 95.0,
  2017: 96.4,
  2018: 98.1,
  2019: 99.5,
  2020: 100.0,
  2021: 103.1,
  2022: 110.2,
  2023: 116.7,
  2024: 119.3,
  2025: 121.9,
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
