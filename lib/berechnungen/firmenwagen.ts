/**
 * Firmenwagen-Berechnung gemäß § 6 Abs. 1 Nr. 4 EStG + § 8 Abs. 2 EStG
 * (1-%-Regel mit Antriebsart-Differenzierung + Arbeitsweg-Pauschal-/Einzel-
 * bewertung).
 *
 * Quellen:
 *   - § 6 Abs. 1 Nr. 4 S. 2 EStG (1-%-Regel als Standard-Methode für die
 *     Privatnutzung): https://www.gesetze-im-internet.de/estg/__6.html
 *   - § 6 Abs. 1 Nr. 4 S. 2 Nr. 4 EStG (E-Auto-Sondersätze: 0,25 % bei
 *     Listenpreis ≤ 70.000 €, 0,5 % darüber; Schwelle seit 01.01.2024 von
 *     60.000 € auf 70.000 € erhöht)
 *   - § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG (Plug-in-Hybrid 0,5 %-Vergünstigung;
 *     Bedingung: CO₂ ≤ 50 g/km ODER elektrische Reichweite ≥ 80 km — eine
 *     der beiden Bedingungen genügt, "hat oder ... beträgt", ab 01.01.2025)
 *   - § 8 Abs. 2 S. 3 EStG (Arbeitsweg-Pauschal 0,03 % × Listenpreis ×
 *     Entfernungs-km × 12 als Standard)
 *   - § 8 Abs. 2 S. 5 EStG (Arbeitsweg-Einzelbewertung 0,002 % × Listenpreis
 *     × Entfernungs-km × Fahrten-pro-Monat)
 *
 * Stand: 2026.
 *
 * Welle 5 Track-A Tail D1 (04.05.2026) — Lib-Extraktion aus
 * FirmenwagenRechner.tsx (Welle-2-Pattern, erster Tail-Sprint). Component
 * zuvor KEINE-LIB mit `useMemo`-Block (Z. 47–83 Pre-Refactor) plus
 * Modul-Scope-Konstanten `HYBRID_CO2_GRENZE_G_KM` / `HYBRID_REICHWEITE_MIN_KM`
 * + Records `SATZ` / `FAKTOR` (Z. 19–34). Listenpreis ist User-Eingabe.
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. EStG):
 *   - **Fahrtenbuch-Methode (§ 6 Abs. 1 Nr. 4 S. 3 EStG)** NICHT modelliert —
 *     Component bietet nur die 1-%-Regel als Privatnutzungs-Methode.
 *     Tatsächliche-Kosten/Gesamt-km × Privat-km wäre alternativer Pfad,
 *     muss vom User per Steuererklärung selbst gewählt werden
 *   - **Sammelbeförderung, Übernachtungs-Sondertatbestände** NICHT modelliert
 *   - **Historische Werte vor 01.01.2024** (Listenpreis-Schwelle 60.000 €
 *     für E-Auto-0,25 %-Regel) NICHT modelliert; Lib nutzt aktuellen
 *     70.000-€-Wert
 *   - **Lohnsteuer-Anwendung** vereinfacht: nur Grenzsteuersatz multipliziert
 *     mit gwv (kein KiSt-/Soli-Aufschlag); Component-Disclaimer Z. 227–229
 *     verweist explizit darauf
 */

/**
 * § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG — CO₂-Grenze (g/km) für die
 * 0,5-%-Vergünstigung bei Plug-in-Hybriden.
 */
export const HYBRID_CO2_GRENZE_G_KM = 50;

/**
 * § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG — Mindest-Reichweite (km, rein elektrisch)
 * für die 0,5-%-Vergünstigung bei Plug-in-Hybriden. Eine der beiden
 * Bedingungen (CO₂ oder Reichweite) genügt.
 */
export const HYBRID_REICHWEITE_MIN_KM = 80;

/**
 * § 6 Abs. 1 Nr. 4 S. 2 Nr. 4 EStG — Listenpreis-Schwelle für E-Auto-
 * Sondersatz: ≤ 70.000 € → 0,25 %; > 70.000 € → 0,5 %. Seit 01.01.2024
 * von 60.000 € auf 70.000 € erhöht.
 */
export const FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE = 70000;

export type FirmenwagenAntriebsart = 'verbrenner' | 'hybrid' | 'eAutoUnter70' | 'eAutoUeber70';
export type FirmenwagenArbeitswegMethode = 'pauschal' | 'einzel';

/**
 * Privatnutzungs-Sätze (1-%-Regel-Variante je Antriebsart).
 * Verbrenner 1 %, Hybrid 0,5 %, E-Auto ≤ 70k 0,25 %, E-Auto > 70k 0,5 %.
 */
export const FIRMENWAGEN_SATZ: Record<FirmenwagenAntriebsart, number> = {
  verbrenner: 0.01,
  hybrid: 0.005,
  eAutoUnter70: 0.0025,
  eAutoUeber70: 0.005,
};

/**
 * Arbeitsweg-Faktor je Antriebsart (multipliziert auf den 0,03-%- bzw.
 * 0,002-%-Satz). 1,0 / 0,5 / 0,25 / 0,5.
 */
export const FIRMENWAGEN_FAKTOR: Record<FirmenwagenAntriebsart, number> = {
  verbrenner: 1.0,
  hybrid: 0.5,
  eAutoUnter70: 0.25,
  eAutoUeber70: 0.5,
};

/** § 8 Abs. 2 S. 3 EStG — Pauschal-Faktor 0,03 % × Listenpreis × Entfernung. */
export const FIRMENWAGEN_PAUSCHAL_FAHRTEN_FAKTOR = 0.0003;

/** § 8 Abs. 2 S. 5 EStG — Einzelbewertungs-Faktor 0,002 %. */
export const FIRMENWAGEN_EINZEL_FAHRTEN_FAKTOR = 0.00002;

export interface FirmenwagenEingabe {
  /** Bruttolistenpreis inkl. Sonderausstattung + USt. (€). */
  bruttoListenpreis: number;
  /** Antriebsart (4 Optionen entsprechen den 4 Sätzen). */
  antrieb: FirmenwagenAntriebsart;
  /** Entfernung Wohnung–Arbeit (einfache Strecke, km). */
  entfernungKm: number;
  /** Berechnungsmethode für den Arbeitsweg. */
  arbeitswegMethode: FirmenwagenArbeitswegMethode;
  /** Fahrten pro Monat (nur bei Einzelbewertung relevant). */
  fahrtenProMonat: number;
  /** Eigene Zuzahlung pro Monat (€) — reduziert den geldwerten Vorteil. */
  zuzahlungProMonat: number;
  /** Persönlicher Grenzsteuersatz als Dezimalwert (z. B. 0,35 für 35 %). */
  grenzsteuersatz: number;
  /** CO₂-Ausstoß in g/km (nur bei Hybrid relevant für Bedingungs-Check). */
  co2GKm: number;
  /** Elektrische Reichweite in km (nur bei Hybrid relevant). */
  reichweiteKm: number;
}

export interface FirmenwagenAntriebsErgebnis {
  /** Privatnutzung pro Monat (€). */
  privat: number;
  /** Arbeitsweg-Anteil pro Monat (€). */
  arbeitsweg: number;
  /** Geldwerter Vorteil = max(0, privat + arbeitsweg − zuzahlung). */
  gwv: number;
  /** Steuerbelastung pro Monat = gwv × Grenzsteuersatz. */
  steuerMonat: number;
}

export interface FirmenwagenErgebnis {
  /**
   * Aktuelles Ergebnis basierend auf gewählter Antriebsart. Bei Hybrid
   * ohne erfüllte Bedingungen Fallback auf Verbrenner (1 %-Regel).
   */
  aktuell: FirmenwagenAntriebsErgebnis;
  /** Vergleichs-Berechnung Verbrenner. */
  verbrenner: FirmenwagenAntriebsErgebnis;
  /** Vergleichs-Berechnung Hybrid (immer Idealfall 0,5 %, pädagogisch). */
  hybrid: FirmenwagenAntriebsErgebnis;
  /**
   * Vergleichs-Berechnung E-Auto. Sub-Methode (≤ 70k vs. > 70k) wird
   * automatisch aus dem Listenpreis abgeleitet.
   */
  eAuto: FirmenwagenAntriebsErgebnis;
  /** Steuerersparnis ggü. Verbrenner durch E-Auto-Sondersatz (€/Monat). */
  ersparnisEAuto: number;
  /**
   * Hybrid-Bedingungen erfüllt: CO₂ ≤ 50 g/km ODER Reichweite ≥ 80 km.
   * Bei `false` und gewähltem Hybrid wird `aktuell` zur Verbrenner-
   * Berechnung gefallback (siehe `aktuell`-Doku).
   */
  hybridBedingungenErfuellt: boolean;
}

/**
 * Berechnet den geldwerten Vorteil eines Firmenwagens nach 1-%-Regel
 * (mit Antriebsart-Differenzierung) und vergleicht alle drei Antriebs-
 * Hauptkategorien (Verbrenner / Hybrid / E-Auto).
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder via `parseDeutscheZahl || 0`).
 */
export function berechneFirmenwagen(eingabe: FirmenwagenEingabe): FirmenwagenErgebnis {
  const {
    bruttoListenpreis, antrieb, entfernungKm, arbeitswegMethode,
    fahrtenProMonat, zuzahlungProMonat, grenzsteuersatz, co2GKm, reichweiteKm,
  } = eingabe;

  // § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG: "hat oder ... beträgt" — eine der
  // beiden Bedingungen genügt.
  const hybridBedingungenErfuellt =
    co2GKm <= HYBRID_CO2_GRENZE_G_KM || reichweiteKm >= HYBRID_REICHWEITE_MIN_KM;

  const berechneFuer = (a: FirmenwagenAntriebsart): FirmenwagenAntriebsErgebnis => {
    const privat = bruttoListenpreis * FIRMENWAGEN_SATZ[a];
    const arbeitsweg =
      arbeitswegMethode === 'pauschal'
        ? bruttoListenpreis * FIRMENWAGEN_PAUSCHAL_FAHRTEN_FAKTOR * entfernungKm * FIRMENWAGEN_FAKTOR[a]
        : bruttoListenpreis *
          FIRMENWAGEN_EINZEL_FAHRTEN_FAKTOR *
          entfernungKm *
          fahrtenProMonat *
          FIRMENWAGEN_FAKTOR[a];
    const gwv = Math.max(0, privat + arbeitsweg - zuzahlungProMonat);
    const steuerMonat = gwv * grenzsteuersatz;
    return { privat, arbeitsweg, gwv, steuerMonat };
  };

  // Hybrid ohne erfüllte Bedingungen → Fallback auf Verbrenner (1 %).
  // Vergleichs-Spalte "hybrid" bleibt pädagogisch beim Idealfall 0,5 %.
  const aktuell =
    antrieb === 'hybrid' && !hybridBedingungenErfuellt
      ? berechneFuer('verbrenner')
      : berechneFuer(antrieb);
  const verbrenner = berechneFuer('verbrenner');
  const hybrid = berechneFuer('hybrid');
  const eAuto = berechneFuer(
    bruttoListenpreis <= FIRMENWAGEN_E_AUTO_LISTENPREIS_SCHWELLE
      ? 'eAutoUnter70'
      : 'eAutoUeber70',
  );

  return {
    aktuell,
    verbrenner,
    hybrid,
    eAuto,
    ersparnisEAuto: verbrenner.steuerMonat - eAuto.steuerMonat,
    hybridBedingungenErfuellt,
  };
}
