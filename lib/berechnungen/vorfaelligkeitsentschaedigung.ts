/**
 * Vorfälligkeitsentschädigung-Berechnung gemäß BGB §§ 489/490 + BGH-
 * Rechtsprechung zur Schaden-Differenz-Methode (vereinfachte Aktiv-Passiv-
 * Hybrid-Methode mit pauschalem Risiko-/Verwaltungs-Abschlag).
 *
 * Quellen:
 *   - § 489 BGB (Sonderkündigungsrecht des Schuldners nach 10 Jahren
 *     Zinsbindung — keine VFE):
 *     https://www.gesetze-im-internet.de/bgb/__489.html
 *   - § 490 BGB (Außerordentliches Kündigungsrecht)
 *   - § 502 BGB (Verbraucher-VFE-Cap: 1 % Restdarlehen bei > 1 Jahr
 *     Restlaufzeit, 0,5 % bei ≤ 1 Jahr — hier NICHT modelliert, siehe L-35)
 *   - BGH XI ZR 388/14 (Aktiv-Wiederanlage als Standard-Methode)
 *
 * Stand: 2026.
 *
 * Welle 5 Track-A Block-C C3 (04.05.2026) — Lib-Extraktion aus
 * VorfaelligkeitsentschaedigungRechner.tsx (Welle-2-Pattern). Component zuvor
 * KEINE-LIB mit 9-Output-`useMemo`-Block (Z. 20–36 Pre-Refactor) plus
 * Modul-Scope-Konstanten BEARBEITUNG/FAKTOR_KOSTEN (Z. 11–12).
 *
 * Modellierte Methode (1 von 2 BGH-Linien): vereinfachte **Aktiv-Passiv-
 * Hybrid** — nur ein Marktzins als Wiederanlage-Rendite (User-Eingabe), kein
 * separater Pfandbrief- und Re-Refinanzierungs-Satz. Risiko-Abschlag und
 * ersparte Verwaltung sind pauschal über den FAKTOR_KOSTEN (0,85) abgebildet,
 * nicht als separate Komponenten.
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. Konfig-Erklärtext +
 * BGH-Norm):
 *   - Reine Aktiv-Methode (Pfandbrief-Rendite separat) NICHT modelliert
 *   - Reine Passiv-Methode (Re-Refinanzierungs-Marge separat) NICHT modelliert
 *   - Sondertilgungsrechte als Eingabe NICHT modelliert (kein Sondertilgungs-
 *     Faktor, nur impliziter pauschaler Risiko-Abschlag im FAKTOR_KOSTEN)
 *   - Marge-Reduzierung als separate Komponente NICHT modelliert (im
 *     FAKTOR_KOSTEN enthalten)
 *   - § 489 BGB 10-Jahres-Cap NICHT in der Berechnung modelliert; nur als
 *     Erklärtext-Banner in der Component (`VorfaelligkeitsentschaedigungRechner.tsx`
 *     Z. 109–115). Bei Restlaufzeit > 10 Jahren wird die VFE weiterhin
 *     berechnet — der User muss den 10-Jahres-Cut selbst beachten
 *   - § 502 BGB Verbraucher-Cap (1 % / 0,5 %) NICHT modelliert — keine Code-
 *     Erwähnung, kein Verbraucher-Switch in der Component
 *   - § 490 BGB Außerordentliches Kündigungsrecht NICHT als Tatbestand-Switch
 *     modelliert (Lib geht von berechtigter Vorzeit-Rückzahlung aus)
 */

/** Bearbeitungsgebühr-Pauschale der Bank (€/Vorfälligkeit, Marktpraxis). */
export const VFE_BEARBEITUNGSGEBUEHR_EUR = 300;

/**
 * Pauschaler Faktor für ersparte Verwaltung + Risiko-Abschlag (15 % Abschlag
 * vom theoretischen Zins-Schaden). Bildet die BGH-Schaden-Differenz-Methode
 * vereinfacht ab — kein separater Sondertilgungs-/Verwaltungs-/Marge-Posten.
 */
export const VFE_FAKTOR_KOSTEN = 0.85;

/** Trivial-mathematisch für die Prozent-Umrechnung (Zinsmarge in %/100). */
const PROZENT_DIVISOR = 100;

export interface VfeEingabe {
  /** Restschuld (€). */
  restschuld: number;
  /** Vertragszins (% p. a.). */
  vertragszins: number;
  /** Restlaufzeit der Zinsbindung (Jahre). */
  restlaufzeitJahre: number;
  /** Aktueller Marktzins für Wiederanlage (% p. a.). */
  marktzins: number;
}

export interface VfeErgebnis {
  restschuld: number;
  vertragszins: number;
  restlaufzeitJahre: number;
  marktzins: number;
  /** Vertragszins minus Marktzins (in %, kann negativ sein). */
  zinsmarge: number;
  /**
   * `true`, wenn keine VFE entsteht (zinsmarge ≤ 0 — Bank kann zu besseren
   * Konditionen wiederanlegen). Bei `true` sind alle €-Felder = 0.
   */
  keineVfe: boolean;
  /** Jährlicher Zinsverlust der Bank (Restschuld × Zinsmarge / 100). */
  jaehrlicherVerlust: number;
  /** VFE ohne Bearbeitungsgebühr (jährlich × Restlaufzeit × FAKTOR_KOSTEN). */
  vfe: number;
  /** Gesamt-VFE inklusive Bearbeitungsgebühr-Pauschale. */
  gesamt: number;
}

/**
 * Berechnet die Vorfälligkeitsentschädigung nach vereinfachter Aktiv-Passiv-
 * Hybrid-Methode.
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder via `parseDeutscheZahl || 0`).
 */
export function berechneVorfaelligkeitsentschaedigung(eingabe: VfeEingabe): VfeErgebnis {
  const { restschuld, vertragszins, restlaufzeitJahre, marktzins } = eingabe;

  const zinsmarge = vertragszins - marktzins;
  const keineVfe = zinsmarge <= 0;

  const jaehrlicherVerlust = keineVfe ? 0 : (restschuld * zinsmarge) / PROZENT_DIVISOR;
  const vfe = keineVfe ? 0 : jaehrlicherVerlust * restlaufzeitJahre * VFE_FAKTOR_KOSTEN;
  const gesamt = keineVfe ? 0 : vfe + VFE_BEARBEITUNGSGEBUEHR_EUR;

  return {
    restschuld,
    vertragszins,
    restlaufzeitJahre,
    marktzins,
    zinsmarge,
    keineVfe,
    jaehrlicherVerlust,
    vfe,
    gesamt,
  };
}
