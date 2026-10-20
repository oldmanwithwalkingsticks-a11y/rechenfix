/**
 * Grundsteuer-Berechnung gemäß GrStG i.d.F. ab 01.01.2025 (Grundsteuer-Reform).
 *
 * Quellen:
 *   - GrStG: https://www.gesetze-im-internet.de/grstg_1973/
 *   - § 15 GrStG (Steuermesszahlen Bundesmodell, Ermäßigungen Abs. 2–5)
 *   - BewG §§ 250–257 mit Anlagen 36–41 (Ertragswertverfahren, Bundesmodell):
 *     https://www.gesetze-im-internet.de/bewg/ (abgerufen 20.10.2026)
 *   - Landes-Messzahlen: SächsGrStMG (Sachsen 0,36 ‰), GrStG-Saar (Saarland 0,34 ‰ / 0,64 ‰),
 *     BlnGrStMG v. 27.06.2024 (Berlin unbebaut 0,45 ‰), BremGrStMG v. 18.09.2024 (Bremen unbebaut 0,75 ‰)
 *   - BayGrStG (Bayerisches Grundsteuergesetz, Flächen-Aequivalenz-Modell)
 *   - § 40 LGrStG BW (Bodenwertmodell mit Wohn-Ermäßigung)
 *
 * Stand: 01.01.2025 (Grundsteuer-Reform in Kraft).
 *
 * Welle 5 Track-A Block-C C2 (04.05.2026) — Lib-Extraktion aus
 * GrundsteuerRechner.tsx (Welle-2-Pattern). Hebesatz + Bodenrichtwert sind
 * User-Eingabe (kein Tabellen-Lookup).
 *
 * Modellierte BL-Modelle (3 von 6):
 *   - 'bund' Bundesmodell für 11 BL: BE, BB, HB, MV, NW, RP, SL, SN, ST, SH, TH
 *   - 'bayern' BY Flächen-Aequivalenz-Modell
 *   - 'bw' BW Bodenwertmodell
 *
 * W187: vorher Bundesmodell stark vereinfacht — Grundsteuerwert = voller Bodenwert +
 * Wohnfläche × Miete nach 4-stufiger Baujahrestabelle (6,50/7,00/7,50/8,50 €) × 12 × 15,
 * ohne Bewirtschaftungskosten, ohne Restnutzungsdauer, ohne Abzinsung des Bodenwerts,
 * ohne Land/Mietniveaustufe und ohne Miteigentumsanteil. Jetzt Ertragswertverfahren
 * nach §§ 252–257 BewG für EFH, ZFH, Wohnungseigentum und Mietwohngrundstücke:
 *   Rohertrag (§ 254, Anlage 39: Land × Gebäudeart × Wohnfläche je Wohnung × Baujahr,
 *     Zu-/Abschlag Mietniveaustufe 1–7) − Bewirtschaftungskosten (§ 255, Anlage 40)
 *   = Reinertrag × Vervielfältiger (§ 253, Anlage 37; Liegenschaftszins § 256 inkl.
 *     Bodenrichtwert-Anpassung Abs. 2/3; Restnutzungsdauer = GND 80 J. (Anlage 38) − Alter
 *     am 01.01.2022, mindestens 30 % der GND)
 *   + Bodenwert × Abzinsungsfaktor (§ 257, Anlage 41; EFH/ZFH mit Umrechnungskoeffizient
 *     Anlage 36; Wohnungseigentum mit Miteigentumsanteil)
 *   mindestens 75 % des Bodenwerts (§ 251), abgerundet auf volle 100 € (§ 230).
 * Vervielfältiger und Abzinsungsfaktoren werden mit der Berechnungsvorschrift der
 * Anlagen 37/41 gerechnet und auf 2 bzw. 4 Nachkommastellen gerundet; das reproduziert
 * alle 1.900 Tabellenwerte beider Anlagen (geprüft am 20.10.2026).
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen):
 *   - NDS Flächen-Lage-Modell, HE Flächen-Faktor-Modell, HH Wohnlagen-Modell NICHT modelliert
 *   - Bundesmodell: Zweifamilienhaus mit zwei gleich großen Wohnungen, Mietwohngrundstück
 *     mit gleich großen Wohnungen (Wohnflächen-Klasse aus der Durchschnittsfläche);
 *     Garagen-Festwert (35 €/Monat), Nutzflächen zu anderen Zwecken, selbständig nutzbare
 *     Teilflächen (§ 257 Abs. 3), Verlängerung der Restnutzungsdauer durch Modernisierung
 *     (§ 253 Abs. 2 S. 4) und das Sachwertverfahren (Geschäfts-/gemischt genutzte
 *     Grundstücke, Teileigentum) NICHT modelliert
 *   - Bodenrichtwert (boris.de), Mietniveaustufe (MietNEinV) und Hebesatz sind User-Eingabe
 *   - Erbbau-Sondertatbestände NICHT modelliert
 */

// ─────────────────────────────────────────────────────────────────
// Konstanten
// ─────────────────────────────────────────────────────────────────

// W187: vorher BUND_KAPITALISIERUNGSFAKTOR = 15 (pauschal); jetzt Vervielfältiger nach Anlage 37.

/** § 15 Abs. 1 Nr. 2 Buchst. a GrStG — Steuermesszahl Wohngrundstücke (Bundesmodell). */
export const BUND_STEUERMESSZAHL_BEBAUT = 0.00031;
/** § 15 Abs. 1 Nr. 1 GrStG — Steuermesszahl unbebauter Grundstücke (Bundesmodell). */
export const BUND_STEUERMESSZAHL_UNBEBAUT = 0.00034;

/** Hauptfeststellungszeitpunkt 01.01.2022 (§ 266 Abs. 1 BewG) — Bezugsjahr für das Gebäudealter. */
export const HAUPTFESTSTELLUNG_JAHR = 2022;
/** Anlage 38 BewG — wirtschaftliche Gesamtnutzungsdauer EFH/ZFH, Mietwohngrundstück, Wohnungseigentum. */
export const GESAMTNUTZUNGSDAUER_WOHNEN = 80;
/** § 253 Abs. 2 S. 5 BewG — Mindest-Restnutzungsdauer 30 % der Gesamtnutzungsdauer. */
export const MINDEST_RND_ANTEIL = 0.3;
/** § 251 BewG — Mindestwert 75 % des Bodenwerts. */
export const MINDESTWERT_ANTEIL = 0.75;

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
// W187: 'zfh' neu (Anlage 39 BewG unterscheidet Ein- und Zweifamilienhaus)
export type Grundstuecksart = 'efh' | 'zfh' | 'etw' | 'miet' | 'unbebaut';

/** Länder mit Bundesmodell (Bewertung nach BewG). */
export type BundesmodellLand = 'BE' | 'BB' | 'HB' | 'MV' | 'NW' | 'RP' | 'SL' | 'SN' | 'ST' | 'SH' | 'TH';

export const BUNDESMODELL_LAENDER: { kuerzel: BundesmodellLand; name: string }[] = [
  { kuerzel: 'BE', name: 'Berlin' },
  { kuerzel: 'BB', name: 'Brandenburg' },
  { kuerzel: 'HB', name: 'Bremen' },
  { kuerzel: 'MV', name: 'Mecklenburg-Vorpommern' },
  { kuerzel: 'NW', name: 'Nordrhein-Westfalen' },
  { kuerzel: 'RP', name: 'Rheinland-Pfalz' },
  { kuerzel: 'SL', name: 'Saarland' },
  { kuerzel: 'SN', name: 'Sachsen' },
  { kuerzel: 'ST', name: 'Sachsen-Anhalt' },
  { kuerzel: 'SH', name: 'Schleswig-Holstein' },
  { kuerzel: 'TH', name: 'Thüringen' },
];

/** Ermäßigung der Steuermesszahl nach § 15 Abs. 2–5 GrStG. */
export type MesszahlErmaessigung = 'keine' | 'denkmal' | 'gefoerdert';

export interface GrundsteuerEingabe {
  modell: GrundsteuerModell;
  art: Grundstuecksart;
  /** Bodenrichtwert (€/m²). Aus User-Eingabe (boris.de). Bundesmodell + BW. */
  bodenrichtwert: number;
  /** Grundstücksfläche (m²). Alle Modelle. */
  grundflaeche: number;
  /** Wohnfläche (m²). Bundesmodell + BY. Bei `art = 'unbebaut'` ignoriert. */
  wohnflaeche: number;
  /** Baujahr (Anlage 39 und Restnutzungsdauer). Nur Bundesmodell + bebaut. */
  baujahr: number;
  /** Hebesatz der Gemeinde in % (z. B. 500 für 500 %). User-Eingabe. */
  hebesatz: number;
  /** W187: Land (Bundesmodell; Anlage 39 und Landes-Messzahlen). Standard NW. */
  land?: BundesmodellLand;
  /** W187: Mietniveaustufe 1–7 der Gemeinde (Anlage 39 Teil II). Standard 3. */
  mietniveaustufe?: number;
  /** W187: Miteigentumsanteil am Grundstück (0–1), nur Wohnungseigentum. Standard 1. */
  miteigentumsanteil?: number;
  /** W187: Zahl der Wohnungen, nur Mietwohngrundstück (§ 256 Abs. 1 Nr. 3/4). Standard 3. */
  anzahlWohnungen?: number;
  /** W187: Ermäßigung der Steuermesszahl (§ 15 Abs. 2–5 GrStG). Standard keine. */
  ermaessigung?: MesszahlErmaessigung;
}

/** W187: Zwischenwerte des Ertragswertverfahrens (nur Bundesmodell). */
export interface BundesmodellDetails {
  /** Monatliche Nettokaltmiete je m² nach Anlage 39 inkl. Mietniveau-Zu-/Abschlag. */
  mieteProQm: number;
  rohertrag: number;
  /** Bewirtschaftungskosten in % des Rohertrags (Anlage 40). */
  bewirtschaftungskostenProzent: number;
  reinertrag: number;
  restnutzungsdauer: number;
  /** Liegenschaftszinssatz in % (§ 256). */
  liegenschaftszins: number;
  vervielfaeltiger: number;
  barwertReinertrag: number;
  /** Bodenwert (EFH/ZFH nach Anlage 36, ETW anteilig). */
  bodenwert: number;
  abzinsungsfaktor: number;
  abgezinsterBodenwert: number;
  /** Summe Barwert + abgezinster Bodenwert (vor Mindestwert und Abrundung). */
  ertragswert: number;
  mindestwert: number;
  mindestwertGreift: boolean;
  /** Angewandte Steuermesszahl (z. B. 0,00031). */
  steuermesszahl: number;
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
  /** W187: Zwischenwerte, nur beim Bundesmodell (bebaut). */
  bundesmodell?: BundesmodellDetails;
}

// ─────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────

// W187: vorher mietePerM2(baujahr) — 4-stufige Tabelle 6,50/7,00/7,50/8,50 € ohne Land,
// Gebäudeart, Wohnfläche und Mietniveaustufe. Jetzt Anlage 39 BewG.

/**
 * Anlage 39 Teil I BewG — monatliche Nettokaltmieten €/m² (Wertverhältnisse 01.01.2022)
 * für die Länder mit Bundesmodell. Je Gebäudeart drei Zeilen (Wohnfläche je Wohnung
 * unter 60 m², 60 bis unter 100 m², 100 m² und mehr) mit fünf Baujahresgruppen
 * (bis 1948, 1949–1978, 1979–1990, 1991–2000, ab 2001). „Für Wohnungseigentum gelten
 * die Nettokaltmieten für Mietwohngrundstücke.“
 */
export const NETTOKALTMIETEN_ANLAGE39: Record<BundesmodellLand, Record<'efh' | 'zfh' | 'miet', number[][]>> = {
  BE: {
    efh: [[9.04, 7.79, 7.28, 10.70, 14.45], [7.92, 7.25, 6.89, 9.28, 11.56], [7.01, 6.91, 6.63, 8.09, 11.96]],
    zfh: [[8.95, 8.55, 7.83, 9.70, 12.62], [6.56, 6.33, 5.87, 7.43, 10.79], [5.97, 5.64, 5.23, 7.02, 10.37]],
    miet: [[8.47, 8.07, 7.34, 9.60, 14.83], [6.68, 6.23, 5.91, 7.44, 10.70], [6.73, 5.65, 5.50, 6.91, 10.70]],
  },
  BB: {
    efh: [[8.34, 7.20, 7.28, 10.66, 12.20], [7.31, 6.71, 6.88, 9.26, 9.75], [6.47, 6.39, 6.62, 8.07, 10.09]],
    zfh: [[7.50, 7.17, 7.10, 8.79, 9.68], [5.50, 5.31, 5.32, 6.72, 8.28], [5.00, 4.73, 4.75, 6.36, 7.96]],
    miet: [[7.45, 7.11, 7.00, 9.13, 11.94], [5.88, 5.49, 5.63, 7.07, 8.61], [5.92, 4.98, 5.24, 6.58, 8.61]],
  },
  HB: {
    efh: [[7.03, 6.49, 6.73, 7.62, 9.00], [6.16, 6.06, 6.36, 6.62, 7.19], [5.45, 5.77, 6.11, 5.77, 7.44]],
    zfh: [[7.88, 8.09, 8.19, 7.84, 8.91], [5.78, 6.00, 6.15, 6.00, 7.62], [5.26, 5.33, 5.48, 5.67, 7.33]],
    miet: [[8.08, 8.26, 8.33, 8.38, 11.33], [6.38, 6.38, 6.71, 6.49, 8.17], [6.42, 5.79, 6.24, 6.04, 8.17]],
  },
  MV: {
    efh: [[7.02, 5.75, 5.50, 8.12, 8.77], [6.15, 5.37, 5.20, 7.05, 7.01], [5.44, 5.11, 5.01, 6.14, 7.26]],
    zfh: [[7.48, 6.80, 6.35, 7.92, 8.24], [5.48, 5.05, 4.77, 6.07, 7.05], [4.99, 4.49, 4.25, 5.74, 6.78]],
    miet: [[8.20, 7.44, 6.92, 9.09, 11.22], [6.48, 5.74, 5.57, 7.04, 8.10], [6.52, 5.21, 5.18, 6.55, 8.10]],
  },
  NW: {
    efh: [[6.97, 6.56, 6.82, 8.30, 8.32], [6.10, 6.11, 6.44, 7.20, 6.65], [5.40, 5.82, 6.19, 6.28, 6.88]],
    zfh: [[7.07, 7.38, 7.50, 7.70, 7.44], [5.19, 5.47, 5.62, 5.89, 6.37], [4.71, 4.87, 5.02, 5.57, 6.12]],
    miet: [[7.83, 8.13, 8.23, 8.90, 10.22], [6.17, 6.29, 6.62, 6.90, 7.38], [6.22, 5.69, 6.15, 6.41, 7.38]],
  },
  RP: {
    efh: [[7.12, 6.81, 6.88, 8.13, 9.32], [6.23, 6.36, 6.50, 7.06, 7.45], [5.52, 6.05, 6.25, 6.15, 7.72]],
    zfh: [[7.30, 7.77, 7.66, 7.64, 8.44], [5.35, 5.76, 5.75, 5.85, 7.22], [4.87, 5.13, 5.13, 5.53, 6.94]],
    miet: [[8.33, 8.82, 8.67, 9.11, 11.95], [6.57, 6.81, 6.98, 7.06, 8.62], [6.62, 6.18, 6.49, 6.57, 8.62]],
  },
  SL: {
    efh: [[6.07, 6.18, 6.13, 8.39, 9.03], [5.32, 5.76, 5.79, 7.29, 7.21], [4.71, 5.48, 5.57, 6.35, 7.47]],
    zfh: [[6.33, 7.13, 6.93, 8.00, 8.30], [4.63, 5.28, 5.19, 6.13, 7.09], [4.22, 4.71, 4.63, 5.80, 6.82]],
    miet: [[7.74, 8.70, 8.41, 10.24, 12.62], [6.10, 6.73, 6.77, 7.94, 9.10], [6.15, 6.10, 6.30, 7.37, 9.10]],
  },
  SN: {
    efh: [[6.70, 6.21, 5.71, 8.23, 8.97], [5.87, 5.79, 5.39, 7.15, 7.17], [5.19, 5.52, 5.19, 6.23, 7.43]],
    zfh: [[5.92, 6.09, 5.47, 6.67, 7.00], [4.34, 4.51, 4.11, 5.11, 5.99], [3.94, 4.01, 3.67, 4.83, 5.75]],
    miet: [[7.57, 7.77, 6.95, 8.93, 11.12], [5.98, 6.01, 5.60, 6.92, 8.02], [6.02, 5.44, 5.20, 6.42, 8.02]],
  },
  ST: {
    efh: [[6.23, 5.78, 5.53, 7.43, 7.79], [5.45, 5.39, 5.22, 6.45, 6.23], [4.83, 5.14, 5.02, 5.62, 6.45]],
    zfh: [[6.19, 6.37, 5.96, 6.75, 6.83], [4.54, 4.72, 4.47, 5.17, 5.85], [4.13, 4.20, 3.98, 4.89, 5.62]],
    miet: [[7.22, 7.41, 6.90, 8.24, 9.90], [5.69, 5.72, 5.55, 6.38, 7.14], [5.74, 5.19, 5.16, 5.93, 7.14]],
  },
  SH: {
    efh: [[7.16, 6.92, 6.87, 8.47, 9.24], [6.28, 6.45, 6.49, 7.35, 7.37], [5.55, 6.14, 6.24, 6.41, 7.64]],
    zfh: [[7.55, 8.10, 7.86, 8.18, 8.58], [5.54, 6.01, 5.90, 6.27, 7.34], [5.03, 5.34, 5.26, 5.92, 7.06]],
    miet: [[7.85, 8.39, 8.10, 8.89, 11.09], [6.19, 6.47, 6.52, 6.89, 7.99], [6.24, 5.87, 6.06, 6.40, 7.99]],
  },
  TH: {
    efh: [[7.36, 6.58, 6.41, 8.31, 9.59], [6.45, 6.13, 6.05, 7.22, 7.66], [5.71, 5.83, 5.82, 6.29, 7.94]],
    zfh: [[7.07, 7.00, 6.67, 7.30, 8.12], [5.19, 5.19, 5.00, 5.59, 6.95], [4.71, 4.62, 4.45, 5.29, 6.68]],
    miet: [[7.70, 7.61, 7.22, 8.33, 11.00], [6.08, 5.88, 5.81, 6.45, 7.94], [6.12, 5.33, 5.40, 6.00, 7.94]],
  },
};

/** Anlage 39 Teil II BewG — Zu-/Abschläge je Mietniveaustufe 1–7. */
export const MIETNIVEAU_ZUSCHLAG: Record<number, number> = {
  1: -0.2, 2: -0.1, 3: 0, 4: 0.1, 5: 0.2, 6: 0.3, 7: 0.4,
};

/** Anlage 36 BewG — Umrechnungskoeffizienten Grundstücksgröße (EFH/ZFH), Untergrenze in m². */
const UMRECHNUNGSKOEFFIZIENTEN_ANLAGE36: [number, number][] = [
  [2000, 0.64], [1950, 0.65], [1900, 0.66], [1850, 0.67], [1800, 0.68], [1750, 0.69],
  [1700, 0.70], [1650, 0.71], [1600, 0.72], [1550, 0.73], [1500, 0.74], [1450, 0.75],
  [1400, 0.76], [1350, 0.77], [1300, 0.78], [1250, 0.79], [1200, 0.80], [1150, 0.81],
  [1100, 0.82], [1050, 0.83], [1000, 0.84], [950, 0.85], [900, 0.86], [850, 0.87],
  [800, 0.89], [750, 0.90], [700, 0.92], [650, 0.94], [600, 0.95], [550, 0.98],
  [500, 1.00], [450, 1.03], [400, 1.06], [350, 1.10], [300, 1.14], [250, 1.19],
];

/** Anlage 36 BewG: Umrechnungskoeffizient für die Grundstücksgröße (unter 250 m²: 1,24). */
export function umrechnungskoeffizient(flaeche: number): number {
  for (const [ab, k] of UMRECHNUNGSKOEFFIZIENTEN_ANLAGE36) {
    if (flaeche >= ab) return k;
  }
  return 1.24;
}

/** Baujahresgruppe der Anlage 39 (0 = bis 1948 … 4 = ab 2001). */
export function baujahrGruppe(baujahr: number): number {
  if (baujahr <= 1948) return 0;
  if (baujahr <= 1978) return 1;
  if (baujahr <= 1990) return 2;
  if (baujahr <= 2000) return 3;
  return 4;
}

/** Wohnflächen-Klasse der Anlage 39 (je Wohnung): 0 = unter 60, 1 = 60 bis unter 100, 2 = ab 100 m². */
export function wohnflaecheKlasse(wohnflaecheJeWohnung: number): number {
  if (wohnflaecheJeWohnung < 60) return 0;
  if (wohnflaecheJeWohnung < 100) return 1;
  return 2;
}

/**
 * § 253 Abs. 2 BewG: Restnutzungsdauer = Gesamtnutzungsdauer (Anlage 38: 80 J.) − Alter
 * am Hauptfeststellungszeitpunkt 01.01.2022, mindestens 30 % der Gesamtnutzungsdauer.
 * Nach 2022 fertiggestellte Gebäude: Alter auf den 01.01. des Folgejahres (Nachfeststellung).
 */
export function restnutzungsdauer(baujahr: number): number {
  const bezugsjahr = baujahr <= HAUPTFESTSTELLUNG_JAHR ? HAUPTFESTSTELLUNG_JAHR : baujahr + 1;
  const alter = Math.max(0, bezugsjahr - baujahr);
  const mindest = Math.ceil(GESAMTNUTZUNGSDAUER_WOHNEN * MINDEST_RND_ANTEIL);
  return Math.max(mindest, GESAMTNUTZUNGSDAUER_WOHNEN - alter);
}

/**
 * § 256 BewG: Liegenschaftszinssatz in % — EFH/ZFH 2,5 % (−0,1 Pp. je volle 100 € Bodenrichtwert
 * über 500 €/m², ab 1.500 €/m² 1,5 %), Wohnungseigentum 3,0 % (−0,1 Pp. je volle 100 € über
 * 2.000 €/m², ab 3.000 €/m² 2,0 %), Mietwohngrundstücke 4,0 % (bis 6 Wohnungen) bzw. 4,5 %.
 */
export function liegenschaftszins(art: Exclude<Grundstuecksart, 'unbebaut'>, bodenrichtwert: number, anzahlWohnungen: number): number {
  let zins: number;
  if (art === 'efh' || art === 'zfh') {
    zins = bodenrichtwert >= 1500 ? 1.5 : 2.5 - 0.1 * Math.max(0, Math.floor((bodenrichtwert - 500) / 100));
  } else if (art === 'etw') {
    zins = bodenrichtwert >= 3000 ? 2.0 : 3.0 - 0.1 * Math.max(0, Math.floor((bodenrichtwert - 2000) / 100));
  } else {
    zins = anzahlWohnungen > 6 ? 4.5 : 4.0;
  }
  return Math.round(zins * 10) / 10;
}

/** Anlage 37 BewG: Vervielfältiger (Barwertfaktor) = (qⁿ − 1) / (qⁿ × (q − 1)), q = 1 + LZ, 2 Nachkommastellen. */
export function vervielfaeltiger(restnutzungsdauerJahre: number, zinsProzent: number): number {
  const q = 1 + zinsProzent / 100;
  const qn = Math.pow(q, restnutzungsdauerJahre);
  return Math.round(((qn - 1) / (qn * (q - 1))) * 100 + 1e-9) / 100;
}

/** Anlage 41 BewG: Abzinsungsfaktor = 1 / qⁿ, 4 Nachkommastellen. */
export function abzinsungsfaktor(restnutzungsdauerJahre: number, zinsProzent: number): number {
  const q = 1 + zinsProzent / 100;
  return Math.round((1 / Math.pow(q, restnutzungsdauerJahre)) * 10000 + 1e-9) / 10000;
}

/** Anlage 40 BewG: Bewirtschaftungskosten in % des Rohertrags nach Restnutzungsdauer und Grundstücksart. */
export function bewirtschaftungskostenProzent(art: Exclude<Grundstuecksart, 'unbebaut'>, rnd: number): number {
  const spalte = art === 'efh' || art === 'zfh' ? 0 : art === 'etw' ? 1 : 2;
  const zeile = rnd >= 60 ? [18, 23, 21] : rnd >= 40 ? [21, 25, 23] : rnd >= 20 ? [25, 29, 27] : [27, 31, 29];
  return zeile[spalte];
}

/**
 * Steuermesszahl Bundesmodell je Land (§ 15 Abs. 1 GrStG bzw. Landesrecht):
 * Wohngrundstücke 0,31 ‰ (Sachsen 0,36 ‰, Saarland 0,34 ‰); unbebaut 0,34 ‰
 * (Berlin 0,45 ‰, Bremen 0,75 ‰, Sachsen 0,36 ‰, Saarland 0,64 ‰).
 * Ermäßigung (§ 15 Abs. 2–4: −25 % geförderter Wohnraum/Wohnungsbaugesellschaften und
 * -genossenschaften; Abs. 5: −10 % Baudenkmal) nur für bebaute Grundstücke.
 */
export function steuermesszahlBundesmodell(land: BundesmodellLand, unbebaut: boolean, ermaessigung: MesszahlErmaessigung = 'keine'): number {
  if (unbebaut) {
    const unbebautJeLand: Partial<Record<BundesmodellLand, number>> = { BE: 0.00045, HB: 0.00075, SN: 0.00036, SL: 0.00064 };
    return unbebautJeLand[land] ?? BUND_STEUERMESSZAHL_UNBEBAUT;
  }
  const wohnenJeLand: Partial<Record<BundesmodellLand, number>> = { SN: 0.00036, SL: 0.00034 };
  const basis = wohnenJeLand[land] ?? BUND_STEUERMESSZAHL_BEBAUT;
  const faktor = ermaessigung === 'gefoerdert' ? 0.75 : ermaessigung === 'denkmal' ? 0.9 : 1;
  return basis * faktor;
}

/** Kaufmännisch auf Cent; das kleine Epsilon fängt Gleitkomma-Reste bei exakten Halb-Cent-Werten ab (z. B. 79,205). */
const rund2 = (n: number) => Math.round(n * 100 + 1e-6) / 100;

// ─────────────────────────────────────────────────────────────────
// Modell-Funktionen (intern, pro BL-Modell eine separate Funktion)
// ─────────────────────────────────────────────────────────────────

function berechneBundesmodell(eingabe: GrundsteuerEingabe): {
  grundsteuerwert: number;
  messbetrag: number;
  details?: BundesmodellDetails;
} {
  const { art, bodenrichtwert, grundflaeche, wohnflaeche, baujahr } = eingabe;
  const land: BundesmodellLand = eingabe.land ?? 'NW';
  const ermaessigung = eingabe.ermaessigung ?? 'keine';

  if (art === 'unbebaut') {
    // § 247 BewG: Fläche × Bodenrichtwert; § 230: Abrundung auf volle 100 €
    const grundsteuerwert = Math.floor((grundflaeche * bodenrichtwert) / 100) * 100;
    const steuermesszahl = steuermesszahlBundesmodell(land, true);
    return { grundsteuerwert, messbetrag: rund2(grundsteuerwert * steuermesszahl) };
  }

  const stufeRoh = Math.round(eingabe.mietniveaustufe ?? 3);
  const stufe = Math.min(7, Math.max(1, Number.isFinite(stufeRoh) ? stufeRoh : 3));
  const anzahlWohnungenRoh = Math.round(eingabe.anzahlWohnungen ?? 3);
  const anzahlWohnungen = Number.isFinite(anzahlWohnungenRoh) && anzahlWohnungenRoh >= 1 ? anzahlWohnungenRoh : 3;
  const meaRoh = eingabe.miteigentumsanteil ?? 1;
  const mea = Number.isFinite(meaRoh) ? Math.min(1, Math.max(0, meaRoh)) : 1;

  // § 254 BewG, Anlage 39: Nettokaltmiete nach Land, Gebäudeart, Wohnfläche je Wohnung, Baujahr
  const zeilen = NETTOKALTMIETEN_ANLAGE39[land][art === 'etw' ? 'miet' : art];
  const wohnungen = art === 'zfh' ? 2 : art === 'miet' ? anzahlWohnungen : 1;
  const mieteBasis = zeilen[wohnflaecheKlasse(wohnflaeche / wohnungen)][baujahrGruppe(baujahr)];
  const mieteProQm = mieteBasis * (1 + MIETNIVEAU_ZUSCHLAG[stufe]);
  const rohertrag = rund2(wohnflaeche * mieteProQm * MONATE_PRO_JAHR);

  // § 253, § 255, § 256 BewG
  const rnd = restnutzungsdauer(baujahr);
  const bwk = bewirtschaftungskostenProzent(art, rnd);
  const reinertrag = rund2(rohertrag * (1 - bwk / 100));
  const zins = liegenschaftszins(art, bodenrichtwert, anzahlWohnungen);
  const vv = vervielfaeltiger(rnd, zins);
  const barwertReinertrag = rund2(reinertrag * vv);

  // § 257 BewG: abgezinster Bodenwert (EFH/ZFH: Anlage 36; ETW: Miteigentumsanteil)
  const bodenwertRoh = grundflaeche * bodenrichtwert;
  const bodenwert = rund2(
    art === 'efh' || art === 'zfh'
      ? bodenwertRoh * umrechnungskoeffizient(grundflaeche)
      : art === 'etw'
        ? bodenwertRoh * mea
        : bodenwertRoh,
  );
  const af = abzinsungsfaktor(rnd, zins);
  const abgezinsterBodenwert = rund2(bodenwert * af);

  const ertragswert = barwertReinertrag + abgezinsterBodenwert;
  // § 251 BewG: Mindestwert 75 % des Bodenwerts (EFH/ZFH mit Anlage 36)
  const mindestwert = rund2(bodenwert * MINDESTWERT_ANTEIL);
  const mindestwertGreift = mindestwert > ertragswert;
  // § 230 BewG: Abrundung auf volle 100 €
  const grundsteuerwert = Math.floor(Math.max(ertragswert, mindestwert) / 100) * 100;

  const steuermesszahl = steuermesszahlBundesmodell(land, false, ermaessigung);
  return {
    grundsteuerwert,
    messbetrag: rund2(grundsteuerwert * steuermesszahl),
    details: {
      mieteProQm,
      rohertrag,
      bewirtschaftungskostenProzent: bwk,
      reinertrag,
      restnutzungsdauer: rnd,
      liegenschaftszins: zins,
      vervielfaeltiger: vv,
      barwertReinertrag,
      bodenwert,
      abzinsungsfaktor: af,
      abgezinsterBodenwert,
      ertragswert,
      mindestwert,
      mindestwertGreift,
      steuermesszahl,
    },
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
  let modellErgebnis: { grundsteuerwert: number; messbetrag: number; details?: BundesmodellDetails };
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

  // W187: Bundesmodell centgenau (Messbetrag in Cent × Hebesatz, kaufmännisch gerundet), Ländermodelle unverändert
  const grundsteuerJahr = eingabe.modell === 'bund'
    ? Math.round((Math.round(modellErgebnis.messbetrag * 100) * eingabe.hebesatz) / 100) / 100
    : modellErgebnis.messbetrag * (eingabe.hebesatz / 100);
  return {
    grundsteuerwert: modellErgebnis.grundsteuerwert,
    messbetrag: modellErgebnis.messbetrag,
    grundsteuerJahr,
    quartal: grundsteuerJahr / QUARTALE_PRO_JAHR,
    monat: grundsteuerJahr / MONATE_PRO_JAHR,
    ...(modellErgebnis.details ? { bundesmodell: modellErgebnis.details } : {}),
  };
}
