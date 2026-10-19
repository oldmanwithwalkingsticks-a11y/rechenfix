/**
 * SSOT für Midijob-Parameter nach § 20 Abs. 2 und 2a SGB IV.
 *
 * Der Übergangsbereich („Midijob") gilt für regelmäßiges monatliches
 * Arbeitsentgelt über der Geringfügigkeitsgrenze (G) bis zur Obergrenze (OG).
 * Seit 01.10.2022 gibt es zwei separate Bemessungsgrundlagen:
 *  - BE_gesamt (§ 20 Abs. 2a Satz 1 SGB IV) für den Gesamtbeitrag; in der RV
 *    über § 163 Abs. 10 SGB VI. Die Entgeltpunkte kommen dagegen aus dem
 *    tatsächlichen Entgelt (§ 70 Abs. 1a SGB VI, seit 01.07.2019).
 *  - BE_AN (§ 20 Abs. 2a Satz 6 SGB IV) für den reduzierten AN-Beitragsanteil.
 *    Diese Formel ist F-unabhängig und startet bei AE = G mit BE_AN = 0.
 *
 * Der AG trägt den Differenzbetrag (mehr als die Hälfte der Gesamtlast) —
 * das ist der eigentliche Midijob-Vorteil.
 *
 * Faktor F = 28 % ÷ Gesamtsozialversicherungsbeitragssatz des Jahres; das BMAS
 * gibt ihn bis zum 31.12. im Bundesanzeiger für das Folgejahr bekannt
 * (§ 20 Abs. 2a Sätze 2 bis 5 SGB IV). F bildet die Durchschnittsbeiträge auf der
 * Arbeitgeber-Pauschalseite ab (Midijob-Modell vs. Minijob-Pauschalen).
 *
 * Stichtag-Switch-Pattern analog `mindestlohn.ts`/`bafoeg-parameter.ts`:
 * Pro Kalenderjahr ein Bucket; Getter wählt nach Stichtag.
 */

export interface MidijobParameter {
  /** Geringfügigkeitsgrenze G (§ 8 Abs. 1a SGB IV) — Ausgangswert der Formeln. */
  geringfuegigkeitsgrenzeG: number;     // 603 (2026), 633 (2027)
  /**
   * Obergrenze des Übergangsbereichs (§ 20 Abs. 2 SGB IV) — konstant
   * 2.000 €/Monat seit 01.01.2023.
   */
  obergrenzeOG: number;                 // 2000
  /**
   * Faktor F (§ 20 Abs. 2a SGB IV) — jährliche BMAS-Bekanntmachung bzw.
   * gemeinsames Rundschreiben der SV-Spitzenverbände.
   */
  faktorF: number;                      // 0.6619 (2026)
  quelle: string;
  gueltigAb: Date;
}

/** Midijob-Parameter für 2026. */
export const MIDIJOB_2026: MidijobParameter = {
  geringfuegigkeitsgrenzeG: 603,
  obergrenzeOG: 2000,
  faktorF: 0.6619,
  quelle: "§ 20 Abs. 2 und 2a SGB IV + BMAS-Bekanntmachung zum Faktor F für 2026 (Gemeinsames Rundschreiben der Spitzenverbände)",
  gueltigAb: new Date("2026-01-01"),
};

/**
 * Liefert den jeweils geltenden Midijob-Parameter-Satz zum Stichtag.
 * Aktuell nur ein Bucket; bei Jahreswechsel 2027 wird ein
 * `MIDIJOB_2027`-Bucket ergänzt (dann u. a. G = 633 €, neuer F).
 */
export function getAktuelleMidijobParameter(
  stichtag: Date = new Date(),
): MidijobParameter {
  void stichtag; // reserviert für Kaskade ab 2027
  return MIDIJOB_2026;
}

/**
 * Abgeleitete Formel-Konstanten für die Linearformen der BE-Berechnung.
 * Vermeidet hartkodierte Magic Numbers und verhindert den F×OG/F×G-
 * Verdrehungs-Fehlerklassiker.
 *
 * **BE_gesamt = `faktorGesamt × AE − konstanteGesamt`** (§ 20 Abs. 2a Satz 1 SGB IV)
 *   Herleitung: `BE_gesamt = F × G + ((OG − F × G) / (OG − G)) × (AE − G)`
 *   → faktorGesamt = (OG − F × G) / (OG − G)
 *   → konstanteGesamt = faktorGesamt × G − F × G
 *
 * **BE_AN = `faktorAN × AE − konstanteAN`** (§ 20 Abs. 2a Satz 6 SGB IV, seit 01.10.2022)
 *   Herleitung: `BE_AN = (OG / (OG − G)) × (AE − G)`
 *   → faktorAN = OG / (OG − G)
 *   → konstanteAN = faktorAN × G
 *
 * Bei AE = G ist BE_gesamt = F × G (der Midijob startet mit reduzierter BE),
 * BE_AN = 0 (AN zahlt faktisch nichts). Bei AE = OG laufen beide Formeln
 * in `BE = OG` zusammen und der Übergangsbereich endet.
 *
 * Verifikation für 2026 (G = 603, OG = 2.000, F = 0,6619):
 *  - faktorGesamt = (2000 − 0,6619 × 603) / 1397 ≈ 1,145937
 *  - konstanteGesamt ≈ 1,145937 × 603 − 0,6619 × 603 ≈ 291,874
 *  - faktorAN = 2000 / 1397 ≈ 1,431639
 *  - konstanteAN ≈ 1,431639 × 603 ≈ 863,278
 */
export function getBeitragsFormeln(
  params: MidijobParameter = getAktuelleMidijobParameter(),
): {
  faktorGesamt: number;
  konstanteGesamt: number;
  faktorAN: number;
  konstanteAN: number;
} {
  const G = params.geringfuegigkeitsgrenzeG;
  const OG = params.obergrenzeOG;
  const F = params.faktorF;
  const spanne = OG - G;

  const faktorGesamt = (OG - F * G) / spanne;
  const konstanteGesamt = faktorGesamt * G - F * G;

  const faktorAN = OG / spanne;
  const konstanteAN = faktorAN * G;

  return { faktorGesamt, konstanteGesamt, faktorAN, konstanteAN };
}
