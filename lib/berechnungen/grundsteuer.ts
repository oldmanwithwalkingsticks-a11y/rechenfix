/**
 * Grundsteuer-Berechnung gemäß GrStG i.d.F. ab 01.01.2025 (Grundsteuer-Reform).
 *
 * Quellen:
 *   - GrStG: https://www.gesetze-im-internet.de/grstg_1973/
 *   - § 15 GrStG (Steuermesszahlen Bundesmodell)
 *   - § 254 BewG (Mietniveau-Stufen, hier vereinfacht als 4-stufige Baujahres-
 *     Tabelle ohne Mietniveau-Korrektur)
 *   - § 256 BewG (Kapitalisierungsfaktor, hier vereinfacht als konstanter
 *     Faktor 15 ohne Restnutzungsdauer-Korrektur)
 *   - BayGrStG (Bayerisches Grundsteuergesetz, Flächen-Aequivalenz-Modell)
 *   - § 40 LGrStG BW (Bodenwertmodell mit Wohn-Ermäßigung)
 *
 * Stand: 01.01.2025 (Grundsteuer-Reform in Kraft).
 *
 * Welle 5 Track-A Block-C C2 (04.05.2026) — Lib-Extraktion aus
 * GrundsteuerRechner.tsx (Welle-2-Pattern). Component zuvor KEINE-LIB mit
 * 5-Output-`useMemo`-Block (Z. 31–66 Pre-Refactor) plus externer Helper
 * `mietePerM2(baujahr)` Z. 15–20. Hebesatz + Bodenrichtwert sind
 * User-Eingabe (kein Tabellen-Lookup).
 *
 * Modellierte BL-Modelle (3 von 6):
 *   - 'bund' Bundesmodell für 11 BL: BE, BB, HB, MV, NRW, RP, SL, SN, ST, SH, TH
 *   - 'bayern' BY Flächen-Aequivalenz-Modell
 *   - 'bw' BW Bodenwertmodell
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. Konfig-Erklärtext +
 * GrStG-Norm):
 *   - NDS Flächen-Lage-Modell (Niedersächsisches GrStG) NICHT modelliert
 *   - HE Flächen-Faktor-Modell (HessGrStG) NICHT modelliert
 *   - HH Wohnlagen-Modell (HmbGrStG) NICHT modelliert
 *   - § 254 BewG Mietniveau-Korrektur (Mietniveau-Stufen 1–7 nach Gemeinde)
 *     NICHT modelliert; Lib nutzt vereinfachte 4-stufige Baujahres-Tabelle
 *     (mietePerM2: 6,50/7,00/7,50/8,50 €) ohne Mietniveau-Multiplikator
 *   - § 256 BewG Restnutzungsdauer-Korrektur NICHT modelliert; Lib nutzt
 *     konstanten Kapitalisierungsfaktor 15 (vereinfacht)
 *   - § 38 BewG Bodenrichtwert-Lookup (boris.de) NICHT modelliert;
 *     Bodenrichtwert ist User-Eingabe
 *   - Hebesatz als kommunale Tabelle (Gemeinde-Lookup) NICHT modelliert;
 *     Hebesatz ist User-Eingabe (Default 500 % als Mittelwert)
 *   - Erbbau-Sondertatbestände, Mehrfamilienhaus-Bewertungs-Spezifika
 *     NICHT modelliert
 */

// ─────────────────────────────────────────────────────────────────
// Konstanten
// ─────────────────────────────────────────────────────────────────

/** Kapitalisierungsfaktor § 256 BewG, hier konstant (Lib-Vereinfachung). */
export const BUND_KAPITALISIERUNGSFAKTOR = 15;

/** § 15 Abs. 1 GrStG — Steuermesszahl bebauter Grundstücke (Bundesmodell). */
export const BUND_STEUERMESSZAHL_BEBAUT = 0.00031;
/** § 15 Abs. 1 GrStG — Steuermesszahl unbebauter Grundstücke (Bundesmodell). */
export const BUND_STEUERMESSZAHL_UNBEBAUT = 0.00034;

/** BayGrStG — Flächen-Aequivalenz-Faktor für Grundfläche (€/m²). */
export const BY_AEQUIVALENZ_GRUND = 0.04;
/** BayGrStG — Flächen-Aequivalenz-Faktor für Wohnfläche (€/m²). */
export const BY_AEQUIVALENZ_WOHN = 0.50;
/** BayGrStG — Wohnermäßigung (30 % Abschlag → Faktor 0,70 auf Aequivalenz). */
export const BY_WOHN_ERMAESSIGUNG = 0.70;

/** § 40 LGrStG BW — Steuermesszahl Wohnen (1,30 ‰ minus 30 % = 0,91 ‰). */
export const BW_STEUERMESSZAHL_WOHNEN = 0.00091;
/** § 40 LGrStG BW — Steuermesszahl Nicht-Wohnen (1,30 ‰). */
export const BW_STEUERMESSZAHL_NICHTWOHNEN = 0.0013;

/** Trivial-kalendarisch für Jahres-Rohertrag (12 Monate/Jahr). */
const MONATE_PRO_JAHR = 12;
/** Trivial-kalendarisch für Quartal-Aufteilung. */
const QUARTALE_PRO_JAHR = 4;

// ─────────────────────────────────────────────────────────────────
// Typen
// ─────────────────────────────────────────────────────────────────

export type GrundsteuerModell = 'bund' | 'bayern' | 'bw';
export type Grundstuecksart = 'efh' | 'etw' | 'miet' | 'unbebaut';

export interface GrundsteuerEingabe {
  modell: GrundsteuerModell;
  art: Grundstuecksart;
  /** Bodenrichtwert (€/m²). Aus User-Eingabe (boris.de). Bundesmodell + BW. */
  bodenrichtwert: number;
  /** Grundstücksfläche (m²). Alle Modelle. */
  grundflaeche: number;
  /** Wohnfläche (m²). Bundesmodell + BY. Bei `art = 'unbebaut'` ignoriert. */
  wohnflaeche: number;
  /** Baujahr für Mietniveau-Tabelle. Nur Bundesmodell + bebaut. */
  baujahr: number;
  /** Hebesatz der Gemeinde in % (z. B. 500 für 500 %). User-Eingabe. */
  hebesatz: number;
}

export interface GrundsteuerErgebnis {
  /** Grundsteuerwert (Bewertungs-Größe, vor Steuermesszahl). */
  grundsteuerwert: number;
  /** Steuermessbetrag (Grundsteuerwert × Steuermesszahl). */
  messbetrag: number;
  /** Jahres-Grundsteuer (Messbetrag × Hebesatz/100). */
  grundsteuerJahr: number;
  /** Quartal-Anteil. */
  quartal: number;
  /** Monats-Anteil. */
  monat: number;
}

// ─────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────

/**
 * Vereinfachte Mietniveau-Tabelle nach Baujahr für das Bundesmodell.
 * 4-stufige Tabelle (§ 254 BewG ohne Mietniveau-Stufen-Korrektur).
 *
 *   <  1949 → 6,50 €/m²
 *   ≤ 1978 → 7,00 €/m²
 *   ≤ 2000 → 7,50 €/m²
 *   sonst  → 8,50 €/m²
 */
export function mietePerM2(baujahr: number): number {
  if (baujahr < 1949) return 6.50;
  if (baujahr <= 1978) return 7.00;
  if (baujahr <= 2000) return 7.50;
  return 8.50;
}

// ─────────────────────────────────────────────────────────────────
// Modell-Funktionen (intern, pro BL-Modell eine separate Funktion)
// ─────────────────────────────────────────────────────────────────

function berechneBundesmodell(eingabe: GrundsteuerEingabe): {
  grundsteuerwert: number;
  messbetrag: number;
} {
  const { art, bodenrichtwert, grundflaeche, wohnflaeche, baujahr } = eingabe;
  const bodenwert = grundflaeche * bodenrichtwert;
  let gebaeudewert = 0;
  if (art !== 'unbebaut') {
    const miete = mietePerM2(baujahr);
    const jahresrohertrag = wohnflaeche * miete * MONATE_PRO_JAHR;
    gebaeudewert = jahresrohertrag * BUND_KAPITALISIERUNGSFAKTOR;
  }
  const grundsteuerwert = bodenwert + gebaeudewert;
  const steuermesszahl =
    art === 'unbebaut' ? BUND_STEUERMESSZAHL_UNBEBAUT : BUND_STEUERMESSZAHL_BEBAUT;
  return {
    grundsteuerwert,
    messbetrag: grundsteuerwert * steuermesszahl,
  };
}

function berechneBayernModell(eingabe: GrundsteuerEingabe): {
  grundsteuerwert: number;
  messbetrag: number;
} {
  const { art, grundflaeche, wohnflaeche } = eingabe;
  const aequivalenz =
    grundflaeche * BY_AEQUIVALENZ_GRUND + wohnflaeche * BY_AEQUIVALENZ_WOHN;
  return {
    grundsteuerwert: aequivalenz,
    messbetrag: art === 'unbebaut' ? aequivalenz : aequivalenz * BY_WOHN_ERMAESSIGUNG,
  };
}

function berechneBwModell(eingabe: GrundsteuerEingabe): {
  grundsteuerwert: number;
  messbetrag: number;
} {
  const { art, bodenrichtwert, grundflaeche } = eingabe;
  const grundsteuerwert = grundflaeche * bodenrichtwert;
  const steuermesszahl =
    art === 'unbebaut' ? BW_STEUERMESSZAHL_NICHTWOHNEN : BW_STEUERMESSZAHL_WOHNEN;
  return {
    grundsteuerwert,
    messbetrag: grundsteuerwert * steuermesszahl,
  };
}

// ─────────────────────────────────────────────────────────────────
// Aggregat-Funktion
// ─────────────────────────────────────────────────────────────────

/**
 * Berechnet die Grundsteuer nach dem gewählten BL-Modell.
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder via `parseDeutscheZahl || 0`).
 */
export function berechneGrundsteuer(eingabe: GrundsteuerEingabe): GrundsteuerErgebnis {
  let modellErgebnis: { grundsteuerwert: number; messbetrag: number };
  switch (eingabe.modell) {
    case 'bund':
      modellErgebnis = berechneBundesmodell(eingabe);
      break;
    case 'bayern':
      modellErgebnis = berechneBayernModell(eingabe);
      break;
    case 'bw':
      modellErgebnis = berechneBwModell(eingabe);
      break;
  }

  const grundsteuerJahr = modellErgebnis.messbetrag * (eingabe.hebesatz / 100);
  return {
    grundsteuerwert: modellErgebnis.grundsteuerwert,
    messbetrag: modellErgebnis.messbetrag,
    grundsteuerJahr,
    quartal: grundsteuerJahr / QUARTALE_PRO_JAHR,
    monat: grundsteuerJahr / MONATE_PRO_JAHR,
  };
}
