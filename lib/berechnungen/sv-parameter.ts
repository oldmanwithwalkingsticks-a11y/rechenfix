/**
 * Zentrale SV-Parameter für 2026.
 *
 * Gültig ab 01.01.2026. Werte stammen aus:
 * - BMF-Bekanntmachung Januar 2026 (durchschnittlicher Zusatzbeitrag)
 * - Sozialversicherungsrechengrößen-Verordnung 2026
 *
 * Wird von allen Rechnern und SEO-Seiten der Tarif-Gruppe (Brutto-Netto,
 * Lohnsteuer, Einkommensteuer) sowie den /finanzen/*-euro-brutto-netto-
 * Long-Tail-Seiten verwendet, damit bei Wertänderungen keine Drift zwischen
 * Haupt-Rechner und Varianten entsteht.
 */

/**
 * Durchschnittlicher KV-Zusatzbeitrag 2026 als voller Prozentwert (AG + AN
 * gemeinsam), so wie `berechneBruttoNetto()` den Parameter `kvZusatzbeitrag`
 * erwartet. Die Lib halbiert intern zum AN-Anteil (1,45 %).
 *
 * Quelle: BMF-Bekanntmachung vom Januar 2026, durchschnittlicher Zusatzbeitrag
 * nach § 242a SGB V.
 */
export const KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT = 2.9;

/**
 * AN-Anteil des durchschnittlichen KV-Zusatzbeitrags 2026 als Dezimalwert
 * (0,0145 = 1,45 %). Abgeleitet aus dem vollen Zusatzbeitrag (2,9 % / 2 / 100).
 *
 * NICHT als Input für `berechneBruttoNetto()` verwenden — dort wird der volle
 * Prozentwert erwartet (Lib halbiert intern). Diese Konstante ist für
 * Anzeige-Texte und direkte Dezimalrechnungen außerhalb der Tarif-Lib gedacht.
 */
export const KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 =
  KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT / 200;

// W189: vorher zwischen dem JSDoc von KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 und der Konstante (Welle 178)
/**
 * Ermäßigter allgemeiner Beitragssatz der GKV (§ 243 SGB V) für Mitglieder ohne Anspruch auf Krankengeld,
 * z. B. freiwillig versicherte hauptberuflich Selbständige und beherrschende Gesellschafter-Geschäftsführer,
 * solange sie keine Wahlerklärung für Krankengeld abgeben (§ 44 Abs. 2 SGB V; dann 14,6 %).
 */
export const KV_ERMAESSIGTER_BEITRAGSSATZ_2026 = 0.14;

/**
 * Jahresarbeitsentgeltgrenze (Versicherungspflichtgrenze) 2026 nach § 6 Abs. 6
 * SGB V bzw. § 6 Abs. 7 SGB V (allgemeine Grenze). Arbeitnehmer können erst
 * oberhalb dieses Jahresbruttos in die PKV wechseln.
 *
 * Quelle: SV-Rechengrößen-Verordnung 2026.
 */
export const JAEG_2026_JAHR = 77400;
export const JAEG_2026_MONAT = 6450;

/** W206: Allgemeiner Beitragssatz der GKV in Prozent (§ 241 SGB V). */
export const KV_ALLGEMEINER_BEITRAGSSATZ_PROZENT = 14.6;

/**
 * W206: Durchschnittlicher Zusatzbeitragssatz 2027 nach § 242a SGB V als voller Prozentwert,
 * festgelegt vom Bundesministerium für Gesundheit (Pressemitteilung vom 30.10.2026: 2,9 %, wie 2026).
 */
export const KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2027_PROZENT = 2.9;

/**
 * W206: Pauschalbeitrag des Arbeitgebers zur Krankenversicherung im gewerblichen Minijob
 * (§ 249b Satz 1 SGB V), in Prozent des Entgelts.
 *  - bis 31.12.2026: 13 %.
 *  - ab 01.01.2027: allgemeiner Beitragssatz plus durchschnittlicher Zusatzbeitragssatz,
 *    2027 also 14,6 % + 2,9 % = 17,5 %. GKV-Beitragssatzstabilisierungsgesetz vom 24.07.2026
 *    (BGBl. 2026 I Nr. 228), Art. 1 Nr. 64, in Kraft am 01.01.2027 (Art. 8 Abs. 2).
 * Nach 2027 bleibt es beim Wert 2027, bis der Zusatzbeitragssatz des Folgejahres eingetragen ist.
 * Im Privathaushalt (§ 249b Satz 2 SGB V) bleibt es bei 5 %; dieser Satz steht in minijob.ts.
 */
export function getMinijobKvPauschaleProzent(stichtag: Date = new Date()): number {
  if (stichtag < new Date(2027, 0, 1)) return 13;
  return Math.round((KV_ALLGEMEINER_BEITRAGSSATZ_PROZENT + KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2027_PROZENT) * 10) / 10;
}
