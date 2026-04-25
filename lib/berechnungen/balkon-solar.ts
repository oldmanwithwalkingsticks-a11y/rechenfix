/**
 * BKW-Ertragsmodell für Balkonkraftwerke (kleine Module, feste Montage).
 *
 * Bewusst eigenes Modell statt Reuse von pv-ertragsmodell.ts (Aufdach-PV),
 * weil:
 *   - 950 kWh/kWp = Bruttoerzeugung VOR Performance Ratio (DWD-Globalstrahlung
 *     × Modul-Wirkungsgrad), realistisch für moderne BKW-Module
 *   - Aufstellungs-Faktoren (0,7–1,0) bilden BKW-spezifische Realität ab:
 *     senkrechte Geländermontage, suboptimale Ausrichtung, Verschattung
 *   - PR ist hier in den Aufstellungs-/Ausrichtungs-Faktoren implizit
 *     mitkalkuliert (statt explizit wie bei Aufdach-PV)
 *
 * Faktoren-Kalibrierung gegen Branchenkonsens (ADAC, SolarScouts/PVGIS,
 * Anker SOLIX, DRBO Greenenergy, Stand 04/2026) — siehe Audit-Bericht 148b.
 *
 * Tech-Debt für Welle 3: Reuse vs. eigenes BKW-SSOT-Modul evaluieren,
 * eventuell standortabhängige Globalstrahlung integrieren.
 */

export interface BalkonSolarErgebnis {
  leistungWatt: number;
  leistungKwp: number;
  ausrichtung: string;
  ausrichtungFaktor: number;
  aufstellung: string;
  aufstellungFaktor: number;
  jahresertragKwh: number;
  eigenverbrauchQuote: number;
  eigenverbrauchKwh: number;
  einspeisungKwh: number;
  stromverbrauchKwh: number;
  deckungsgradProzent: number;
  strompreisCtKwh: number;
  jaehrlicheErsparnis: number;
  anschaffungskosten: number;
  amortisationJahre: number;
  gewinn20Jahre: number;
  co2ErsparungKg: number;
}

const SPEZIFISCHER_ERTRAG = 950; // kWh/kWp Brutto vor PR (DWD × Modul-η)
const EIGENVERBRAUCH_QUOTE = 0.30; // 30% typisch ohne Speicher
const CO2_FAKTOR = 0.38; // kg CO2 pro kWh

export const AUSRICHTUNGEN = [
  { id: 'sued', label: 'Süd (100 %)', faktor: 1.0 },
  { id: 'suedwestost', label: 'Süd-West / Süd-Ost (85 %)', faktor: 0.85 },
  { id: 'westost', label: 'West / Ost (70 %)', faktor: 0.70 },
  // Nord: korrigiert 04/2026 von 0,40 → 0,60 (Branchenkonsens
  // SolarScouts/PVGIS, ADAC, Anker SOLIX, DRBO; vorher zu pessimistisch).
  { id: 'nord', label: 'Nord (60 %)', faktor: 0.60 },
];

export const AUFSTELLUNGEN = [
  { id: 'bruestung', label: 'Balkonbrüstung (senkrecht)', faktor: 0.7 },
  { id: 'aufstaenderung', label: 'Aufständerung 30°', faktor: 0.9 },
  { id: 'flachdach', label: 'Flachdach / Garten', faktor: 1.0 },
];

export function berechneBalkonSolar(
  leistungWatt: number,
  ausrichtungId: string,
  aufstellungId: string,
  stromverbrauchKwh: number,
  strompreisCtKwh: number,
  anschaffungskosten: number
): BalkonSolarErgebnis | null {
  if (leistungWatt <= 0 || stromverbrauchKwh <= 0 || strompreisCtKwh <= 0 || anschaffungskosten <= 0) return null;

  const ausrichtung = AUSRICHTUNGEN.find(a => a.id === ausrichtungId);
  const aufstellung = AUFSTELLUNGEN.find(a => a.id === aufstellungId);
  if (!ausrichtung || !aufstellung) return null;

  const leistungKwp = leistungWatt / 1000;
  const jahresertragKwh = Math.round(leistungKwp * SPEZIFISCHER_ERTRAG * ausrichtung.faktor * aufstellung.faktor);
  const eigenverbrauchKwh = Math.round(jahresertragKwh * EIGENVERBRAUCH_QUOTE);
  const einspeisungKwh = jahresertragKwh - eigenverbrauchKwh;
  const deckungsgradProzent = Math.round((eigenverbrauchKwh / stromverbrauchKwh) * 1000) / 10;

  const jaehrlicheErsparnis = Math.round(eigenverbrauchKwh * strompreisCtKwh) / 100;
  const amortisationJahre = jaehrlicheErsparnis > 0
    ? Math.round((anschaffungskosten / jaehrlicheErsparnis) * 10) / 10
    : 99;
  const gewinn20Jahre = Math.round((jaehrlicheErsparnis * 20 - anschaffungskosten) * 100) / 100;
  const co2ErsparungKg = Math.round(jahresertragKwh * CO2_FAKTOR);

  return {
    leistungWatt,
    leistungKwp,
    ausrichtung: ausrichtung.label,
    ausrichtungFaktor: ausrichtung.faktor,
    aufstellung: aufstellung.label,
    aufstellungFaktor: aufstellung.faktor,
    jahresertragKwh,
    eigenverbrauchQuote: EIGENVERBRAUCH_QUOTE,
    eigenverbrauchKwh,
    einspeisungKwh,
    stromverbrauchKwh,
    deckungsgradProzent,
    strompreisCtKwh,
    jaehrlicheErsparnis,
    anschaffungskosten,
    amortisationJahre,
    gewinn20Jahre,
    co2ErsparungKg,
  };
}
