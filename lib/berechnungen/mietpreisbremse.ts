/**
 * Mietpreisbremse-Berechnung gemäß BGB § 556d.
 *
 * Quellen:
 *   - § 556d BGB (zulässige Wiedervermietungsmiete: max. 110 % der ortsüblichen
 *     Vergleichsmiete in angespannten Wohnungsmärkten):
 *     https://www.gesetze-im-internet.de/bgb/__556d.html
 *   - § 556e BGB (Vor-Mietzins-Schutz: bei Vor-Mietzins > 110 % der Vergleichs-
 *     miete bleibt die alte Miete zulässig — Bestandsschutz)
 *   - § 556f BGB (Ausnahmen: Erstbezug nach 01.10.2014, umfassende Modernisierung
 *     mit Investition ≥ 1/3 eines vergleichbaren Neubaus)
 *   - § 556g BGB (qualifizierter Auskunftsanspruch des Mieters; Rückforderungs-
 *     wirkung erst ab Rüge, keine Rückwirkung)
 *
 * Stand: 2026 (Mietpreisbremse-Verlängerung bis 31.12.2029 durch das Gesetz zur
 * Änderung der Regelungen über die zulässige Miethöhe bei Mietbeginn,
 * BT-Drs. 21/322 i.d.F. 21/631, Bundestag 26.06.2025, Bundesrat 11.07.2025).
 *
 * Welle 5 Track-A Block-C C1 (04.05.2026) — Lib-Extraktion aus
 * MietpreisbremseRechner.tsx (Welle-2-Pattern). Component zuvor KEINE-LIB mit
 * 7-Output-`useMemo`-Block (Z. 31–48 Pre-Refactor). Mietspiegel-Pattern (a):
 * Vergleichsmiete als User-Eingabe, keine PLZ-/Ortsteil-Tabelle.
 *
 * L-35-Disziplin (dokumentierte Lib-Vereinfachungen ggü. Konfig-Erklärtext +
 * BGB-Norm):
 *   - § 556e BGB Vor-Mietzins-Schutz NICHT als Wert-Vergleich modelliert; nur
 *     boolean-Ausnahme (User-Toggle „Vormiete war bereits höher" setzt
 *     `greiftBremse=false`)
 *   - § 556f BGB Erstbezug-Datum NICHT geprüft; nur boolean-Ausnahme
 *     („Neubau (Erstbezug nach 01.10.2014)")
 *   - § 556f BGB 1/3-Modernisierungs-Schwelle NICHT berechnet; nur boolean-
 *     Ausnahme („Umfassende Modernisierung")
 *   - § 559 BGB Modernisierungszuschlag (8 % p. a. der Modernisierungskosten)
 *     NICHT modelliert — kein Eingabe-Feld in der Component, getrennter Rechner-
 *     Slot wäre Out-of-Scope für Mietpreisbremse-Domäne
 *   - § 556g BGB Auskunftsanspruch / Rüge-Wirkung NICHT modelliert (Erklärtext-
 *     only in der UI)
 *   - § 556d Abs. 2 BGB BL-Verordnungs-Geltungsbereich NICHT als BL-Tabelle
 *     modelliert; einfacher User-Toggle „Mietpreisbremse gilt am Ort?"
 *   - Möbliert / auf-Zeit-Ausnahme NICHT modelliert
 */

/**
 * § 556d Abs. 1 BGB: zulässiger Aufschlag auf die ortsübliche Vergleichsmiete.
 * 10 % entspricht Multiplikator 1,10.
 */
export const MIETPREISBREMSE_AUFSCHLAG_PROZENT = 0.10;

/** Multiplikator-Form (1 + Aufschlag) für die Höchstmiete-Berechnung. */
export const MIETPREISBREMSE_FAKTOR = 1 + MIETPREISBREMSE_AUFSCHLAG_PROZENT;

/** Trivial-kalendarisch für die Jahres-Hochrechnung der Überhöhung. */
const MONATE_PRO_JAHR = 12;

export interface MietpreisbremseEingabe {
  /** Ortsübliche Vergleichsmiete laut Mietspiegel (€/m² kalt). */
  vergleichsmiete: number;
  /** Tatsächlich vereinbarte Kaltmiete (€/m²). */
  aktuelleMiete: number;
  /** Wohnfläche der Wohnung (m²). */
  wohnflaeche: number;
  /**
   * Mietpreisbremse gilt am Ort (Landesverordnung § 556d Abs. 2 BGB).
   * False → kein Schutz, max-Berechnung wird trotzdem zur Information ausgewiesen.
   */
  giltBremse: boolean;
  /**
   * Ausnahme-Tatbestand. 'keine' = Bremse greift voll; alle anderen Werte setzen
   * `greiftBremse` auf false (siehe L-35-Disziplin im Header — keine Wert-Logik).
   */
  ausnahme: 'keine' | 'neubau' | 'modernisierung' | 'vormiete';
}

export interface MietpreisbremseErgebnis {
  /** Zulässige Höchstmiete pro m² (Vergleichsmiete × 1,10). */
  maxProM2: number;
  /** Zulässige Höchstmiete pro Monat (maxProM2 × Wohnfläche). */
  maxMonat: number;
  /** Tatsächliche Kaltmiete pro Monat (aktuelleMiete × Wohnfläche). */
  istMonat: number;
  /** Überhöhung pro m² (geclampt auf 0). */
  ueberhoehungProM2: number;
  /** Überhöhung pro Monat (€). */
  ueberhoehungMonat: number;
  /** Hochrechnung Überhöhung pro Jahr (× 12). */
  ueberhoehungJahr: number;
  /**
   * Bremse greift effektiv:
   * `giltBremse === true && ausnahme === 'keine'`. Wenn false, ist die
   * Überhöhungs-Information nur akademisch (Vermieter darf höher gehen).
   */
  greiftBremse: boolean;
}

/**
 * Berechnet die zulässige Höchstmiete und ggf. die Überhöhung gegenüber der
 * Mietpreisbremse-Grenze.
 *
 * Reine Wert-Funktion: keine Validierung negativer Werte (Component clampt
 * Eingabe-Felder auf ≥ 0 via `parseDeutscheZahl`).
 */
export function berechneMietpreisbremse(
  eingabe: MietpreisbremseEingabe,
): MietpreisbremseErgebnis {
  const { vergleichsmiete, aktuelleMiete, wohnflaeche, giltBremse, ausnahme } = eingabe;

  const maxProM2 = vergleichsmiete * MIETPREISBREMSE_FAKTOR;
  const ueberhoehungProM2 = Math.max(0, aktuelleMiete - maxProM2);
  const maxMonat = maxProM2 * wohnflaeche;
  const istMonat = aktuelleMiete * wohnflaeche;
  const ueberhoehungMonat = ueberhoehungProM2 * wohnflaeche;
  const ueberhoehungJahr = ueberhoehungMonat * MONATE_PRO_JAHR;
  const greiftBremse = giltBremse && ausnahme === 'keine';

  return {
    maxProM2,
    maxMonat,
    istMonat,
    ueberhoehungProM2,
    ueberhoehungMonat,
    ueberhoehungJahr,
    greiftBremse,
  };
}
