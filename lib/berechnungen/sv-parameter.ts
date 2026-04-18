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
