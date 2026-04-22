// Pflegeversicherung AN-Anteil 2026
// Grundlage: § 55 Abs. 3 SGB XI (PUEG 2023, gültig ab 01.07.2023).
//
// TODO Sachsen: Versicherte in Sachsen tragen +0,5 pp zusätzlich (Buß- und Bettag).
// Sobald der BruttoNetto-Rechner eine Bundesland-abhängige PV-Erhöhung abbildet,
// ist diese Konstante hier zu ergänzen.

/**
 * PV-Basissatz hälftig (§ 58 Abs. 1 SGB XI): 1,8 % für AN-Seite.
 * Identisch zum AG-Anteil — AG trägt **immer** nur 1,8 % (ohne Kinderlos-
 * Zuschlag nach § 59 Abs. 5 SGB XI, ohne Kinderabschlag § 55 Abs. 3 SGB XI).
 * Abschläge und Zuschläge wirken ausschließlich AN-seitig.
 */
export const PV_BASIS_SATZ_2026 = 0.018;
const BASIS_AN              = PV_BASIS_SATZ_2026;
const ZUSCHLAG_KINDERLOS    = 0.006;  // +0,6 pp nach § 59 Abs. 5 SGB XI (AN trägt voll)
const ABSCHLAG_PRO_KIND     = 0.0025; // -0,25 pp pro berücksichtigungsfähiges Kind 2–5
const MAX_ABSCHLAEGE        = 4;      // gedeckelt bei 5. Kind → 4 Abschläge

/**
 * Berechnet den tatsächlichen AN-Anteil zum PV-Beitrag 2026.
 * Wird für den Direktabzug im Brutto-Netto-Pfad verwendet.
 *
 * @param kinderUnter25 Anzahl berücksichtigungsfähiger Kinder unter 25 Jahren
 * @param alterUeber23  true = Versicherter älter als 23 Jahre (Zuschlag-relevant)
 * @param hatKindGehabt true = Elterneigenschaft jemals erfüllt (dauerhafter Zuschlagswegfall)
 * @returns AN-Anteil als Dezimalwert (z.B. 0.0155 für 1,55 %)
 */
export function pvAnteilAn2026(
  kinderUnter25: number,
  alterUeber23: boolean = true,
  hatKindGehabt: boolean = false,
): number {
  // Kinderlos-Zuschlag: nur über 23 ohne Elterneigenschaft und ohne aktuelle Kinder
  if (alterUeber23 && !hatKindGehabt && kinderUnter25 === 0) {
    return BASIS_AN + ZUSCHLAG_KINDERLOS;
  }

  // Kinderabschlag: 2.–5. Kind je -0,25 pp, ab 6. Kind gekappt
  if (kinderUnter25 >= 2) {
    const anzahlAbschlaege = Math.min(kinderUnter25 - 1, MAX_ABSCHLAEGE);
    return BASIS_AN - anzahlAbschlaege * ABSCHLAG_PRO_KIND;
  }

  // Eltern ohne Abschlag (0 oder 1 Kind unter 25) oder unter 23
  return BASIS_AN;
}

/**
 * PV-AN-Anteil für die Vorsorgepauschale nach § 39b Abs. 4 EStG.
 *
 * Unterscheidet sich vom Direktsatz nur in einem Punkt: Der Kinderloszuschlag
 * (0,6 pp) wird empirisch gegen bmf-steuerrechner.de nur hälftig angesetzt
 * (0,3 pp → effektiv 2,1 %). Vermutete Begründung: analog zum halben
 * durchschnittlichen KV-Zusatzbeitrag, den § 39b Abs. 4 EStG als Pauschale
 * hälftig ansetzt. Kinderabschläge hingegen werden voll angerechnet.
 *
 * Mit voller 2,4 %-Annahme bei Kinderlosigkeit weicht die Lohnsteuer um -3 €
 * vom BMF-Rechner ab, mit reinen 1,8 % um +3 €. Nur mit 2,1 % trifft Testfall 1
 * cent-genau.
 */
export function pvAnteilAnVorsorge2026(
  kinderUnter25: number,
  alterUeber23: boolean = true,
  hatKindGehabt: boolean = false,
): number {
  // Kinderlos: halber Zuschlag (BMF-Kalibrierung)
  if (alterUeber23 && !hatKindGehabt && kinderUnter25 === 0) {
    return BASIS_AN + ZUSCHLAG_KINDERLOS / 2;
  }

  // Kinderabschlag voll anrechnen (wie direkter Beitrag)
  if (kinderUnter25 >= 2) {
    const anzahlAbschlaege = Math.min(kinderUnter25 - 1, MAX_ABSCHLAEGE);
    return BASIS_AN - anzahlAbschlaege * ABSCHLAG_PRO_KIND;
  }

  return BASIS_AN;
}
