/**
 * Grunderwerbsteuer 2026 — zentrale SSOT für alle 16 Bundesländer.
 *
 * Rechtsgrundlage: GrEStG § 11 i.V.m. den jeweiligen Landesgesetzen
 *   (jedes Bundesland legt seinen Steuersatz seit der Föderalismusreform
 *   2006 selbst fest).
 * Quelle: DIA-Übersicht (kapitalanlageimmobilien.net), Stand 23.03.2026 ·
 *   Quervergleich handwerk.cloud (16.02.2026), kaufodermieten.de (15.03.2026).
 * Stand: 04/2026 — Update bei Landesgesetz-Änderung (manuell, Watchdog auf
 *   Landesfinanzministerien).
 *
 * Aktuelle Änderungen seit der letzten Aktualisierung:
 * - Bremen 01.07.2025: 5,0 % → 5,5 %
 * - Thüringen 01.01.2024: 6,5 % → 5,0 % (einzige Senkung in der Geschichte)
 * - Sachsen 01.01.2023: 3,5 % → 5,5 %
 * - Hamburg 01.01.2023: 4,5 % → 5,5 %
 *
 * Konsumenten importieren entweder die `BUNDESLAENDER`-Liste (Short-Key-API,
 * historisch gewachsen, von GrunderwerbsteuerRechner verwendet) oder
 * `getGrEStSatzByLongKey('bayern' | 'sachsen' | …)` für Konsumenten mit
 * Lang-Key-Konvention (BaufinanzierungRechner).
 */

export type Bundesland = typeof BUNDESLAENDER[number]['key'];

export interface BundeslandEintrag {
  /** Kfz-Kennzeichen-Style Short-Key (bw, by, be, ...) */
  key: string;
  name: string;
  satz: number;
  /** ISO-Datum der letzten Anpassung (für Erklärtexte / Audits) */
  letzteAenderung?: string;
}

export const BUNDESLAENDER = [
  { key: 'bw', name: 'Baden-Württemberg', satz: 5.0 },
  { key: 'by', name: 'Bayern', satz: 3.5, letzteAenderung: '2006-01-01' },
  { key: 'be', name: 'Berlin', satz: 6.0, letzteAenderung: '2014-01-01' },
  { key: 'bb', name: 'Brandenburg', satz: 6.5, letzteAenderung: '2015-07-01' },
  { key: 'hb', name: 'Bremen', satz: 5.5, letzteAenderung: '2025-07-01' },
  { key: 'hh', name: 'Hamburg', satz: 5.5, letzteAenderung: '2023-01-01' },
  { key: 'he', name: 'Hessen', satz: 6.0, letzteAenderung: '2014-08-01' },
  { key: 'mv', name: 'Mecklenburg-Vorpommern', satz: 6.0, letzteAenderung: '2020-01-01' },
  { key: 'ni', name: 'Niedersachsen', satz: 5.0, letzteAenderung: '2014-01-01' },
  { key: 'nw', name: 'Nordrhein-Westfalen', satz: 6.5, letzteAenderung: '2015-01-01' },
  { key: 'rp', name: 'Rheinland-Pfalz', satz: 5.0, letzteAenderung: '2012-03-01' },
  { key: 'sl', name: 'Saarland', satz: 6.5, letzteAenderung: '2015-01-01' },
  { key: 'sn', name: 'Sachsen', satz: 5.5, letzteAenderung: '2023-01-01' },
  { key: 'st', name: 'Sachsen-Anhalt', satz: 5.0, letzteAenderung: '2012-03-01' },
  { key: 'sh', name: 'Schleswig-Holstein', satz: 6.5, letzteAenderung: '2014-01-01' },
  { key: 'th', name: 'Thüringen', satz: 5.0, letzteAenderung: '2024-01-01' },
] as const satisfies readonly BundeslandEintrag[];

/**
 * Mapping Lang-Key (Bundesland-Slug, in baufinanzierung.ts und Erklärtexten
 * verwendet) → Short-Key (Kfz-Kennzeichen-Style, in grunderwerbsteuer-Lib
 * gewachsen).
 */
const LONG_TO_SHORT: Record<string, string> = {
  'baden-wuerttemberg': 'bw',
  'bayern': 'by',
  'berlin': 'be',
  'brandenburg': 'bb',
  'bremen': 'hb',
  'hamburg': 'hh',
  'hessen': 'he',
  'mecklenburg-vorpommern': 'mv',
  'niedersachsen': 'ni',
  'nordrhein-westfalen': 'nw',
  'rheinland-pfalz': 'rp',
  'saarland': 'sl',
  'sachsen': 'sn',
  'sachsen-anhalt': 'st',
  'schleswig-holstein': 'sh',
  'thueringen': 'th',
};

/** Steuersatz nach Short-Key (`'by'`, `'sn'`, …); wirft bei unbekanntem Key. */
export function getGrEStSatz(key: string): number {
  const bl = BUNDESLAENDER.find(b => b.key === key);
  if (!bl) throw new Error(`Unbekanntes Bundesland-Kürzel: ${key}`);
  return bl.satz;
}

/** Steuersatz nach Lang-Key (`'bayern'`, `'sachsen'`, …); wirft bei unbekanntem Key. */
export function getGrEStSatzByLongKey(longKey: string): number {
  const shortKey = LONG_TO_SHORT[longKey];
  if (!shortKey) throw new Error(`Unbekanntes Bundesland: ${longKey}`);
  return getGrEStSatz(shortKey);
}

export interface GrunderwerbsteuerEingabe {
  kaufpreis: number;
  bundesland: string;
  maklerProvision: number;  // % inkl. MwSt
  notarkosten: number;      // % (ca. 1.5-2%)
  grundbuch: number;        // % (ca. 0.5%)
}

export interface GrunderwerbsteuerErgebnis {
  grunderwerbsteuer: number;
  steuersatz: number;
  makler: number;
  notar: number;
  grundbuch: number;
  nebenkostenGesamt: number;
  gesamtkosten: number;
  nebenkostenProzent: number;
  bundeslandName: string;
}

export function berechneGrunderwerbsteuer(eingabe: GrunderwerbsteuerEingabe): GrunderwerbsteuerErgebnis | null {
  const { kaufpreis, bundesland, maklerProvision, notarkosten, grundbuch } = eingabe;
  if (kaufpreis <= 0) return null;

  const bl = BUNDESLAENDER.find(b => b.key === bundesland);
  if (!bl) return null;

  const steuersatz = bl.satz;
  const grunderwerbsteuer = kaufpreis * (steuersatz / 100);
  const makler = kaufpreis * (maklerProvision / 100);
  const notar = kaufpreis * (notarkosten / 100);
  const grundbuchKosten = kaufpreis * (grundbuch / 100);
  const nebenkostenGesamt = grunderwerbsteuer + makler + notar + grundbuchKosten;
  const gesamtkosten = kaufpreis + nebenkostenGesamt;
  const nebenkostenProzent = (nebenkostenGesamt / kaufpreis) * 100;

  return {
    grunderwerbsteuer: Math.round(grunderwerbsteuer * 100) / 100,
    steuersatz,
    makler: Math.round(makler * 100) / 100,
    notar: Math.round(notar * 100) / 100,
    grundbuch: Math.round(grundbuchKosten * 100) / 100,
    nebenkostenGesamt: Math.round(nebenkostenGesamt * 100) / 100,
    gesamtkosten: Math.round(gesamtkosten * 100) / 100,
    nebenkostenProzent: Math.round(nebenkostenProzent * 10) / 10,
    bundeslandName: bl.name,
  };
}
