/**
 * PV-Ertragsmodell für Deutschland — zentrale SSOT.
 *
 * Quelle: Konrad Mertens, „Photovoltaik" (Hanser Verlag, Standardwerk),
 *   aufbereitet via echtsolar.de (Ertragsdaten Mertens), Solaranlage-Ratgeber,
 *   energie-experten.org (Konsens-Werte 2025/2026).
 * Stand: 04/2026 — Update bei neuer Mertens-Auflage oder geänderter
 *   30-Jahres-Globalstrahlungs-Statistik (DWD).
 *
 * Modell: spezifischer Ertrag = Basis × Ausrichtungsfaktor × Neigungsfaktor
 * Basiswert 850 kWh/kWp/Jahr ist das Süd/25–35°/freie-Lage-Optimum
 * inklusive Performance Ratio 0,85 (deckt Modul-, Wechselrichter-,
 * Leitungs-, Verschmutzungs- und Degradations-Verluste ab; vgl. VDI 6002,
 * IEC 61724).
 *
 * Anlagen-Ertrag = kWp × spezifischer Ertrag.
 *
 * Konsumenten importieren `berechnePvErtrag()`/`berechneSpezifischenErtrag()`
 * sowie die Label-Maps für Dropdowns — niemals eigene Faktor-Tabellen
 * pflegen.
 */

export const PV_BASIS_ERTRAG_KWH_KWP = 850;

export type Ausrichtung =
  | 'sued'
  | 'sued-ost'
  | 'sued-west'
  | 'ost'
  | 'west'
  | 'nord-ost'
  | 'nord-west'
  | 'nord';

export type Neigung = 'flach' | 'leicht' | 'optimal' | 'steil' | 'sehr-steil';

export const AUSRICHTUNGS_FAKTOR: Record<Ausrichtung, number> = {
  sued: 1.0,
  'sued-ost': 0.95,
  'sued-west': 0.95,
  ost: 0.85,
  west: 0.85,
  'nord-ost': 0.72,
  'nord-west': 0.72,
  nord: 0.65,
};

export const NEIGUNGS_FAKTOR: Record<Neigung, number> = {
  flach: 0.87,         // 0–15°
  leicht: 0.94,        // 15–25°
  optimal: 1.0,        // 25–35°
  steil: 0.97,         // 35–45°
  'sehr-steil': 0.91,  // 45°+
};

export const AUSRICHTUNG_LABELS: Record<Ausrichtung, string> = {
  sued: 'Süd (optimal)',
  'sued-ost': 'Süd-Ost',
  'sued-west': 'Süd-West',
  ost: 'Ost',
  west: 'West',
  'nord-ost': 'Nord-Ost',
  'nord-west': 'Nord-West',
  nord: 'Nord',
};

export const NEIGUNG_LABELS: Record<Neigung, string> = {
  flach: 'Flach (0–15°)',
  leicht: 'Leicht geneigt (15–25°)',
  optimal: 'Optimal (25–35°)',
  steil: 'Steil (35–45°)',
  'sehr-steil': 'Sehr steil (45°+)',
};

export interface PvErtragsParameter {
  kwp: number;
  ausrichtung: Ausrichtung;
  neigung: Neigung;
}

/**
 * Jahresertrag einer PV-Anlage in kWh, gerundet auf volle kWh.
 * Berücksichtigt Performance Ratio 0,85 implizit über den Basiswert.
 */
export function berechnePvErtrag({ kwp, ausrichtung, neigung }: PvErtragsParameter): number {
  return Math.round(
    kwp * PV_BASIS_ERTRAG_KWH_KWP * AUSRICHTUNGS_FAKTOR[ausrichtung] * NEIGUNGS_FAKTOR[neigung],
  );
}

/**
 * Spezifischer Ertrag in kWh pro installiertem kWp und Jahr für eine
 * gegebene Ausrichtungs-/Neigungs-Kombination.
 */
export function berechneSpezifischenErtrag(ausrichtung: Ausrichtung, neigung: Neigung): number {
  return Math.round(PV_BASIS_ERTRAG_KWH_KWP * AUSRICHTUNGS_FAKTOR[ausrichtung] * NEIGUNGS_FAKTOR[neigung]);
}
