/**
 * SSOT für redaktionelle Spritpreis-Referenzwerte (NICHT für die Rechenlogik —
 * der spritkosten-rechner nutzt User-Input). Verwendet in Content-Bausteinen
 * (Statistik, Beispielrechnung, Diagramm) des spritkosten-rechner.
 * PFLEGE: monatlich. Quelle ADAC-Bundesschnitt. stand bei jedem Update bumpen.
 * ACHTUNG bei jedem Update pruefen, ob Diesel ueber oder unter Super E10 liegt.
 * Kippt das Verhaeltnis, werden vier Prosa-Stellen in lib/rechner-config/auto.ts
 * falsch: spritkosten-rechner (Fliesstext und FAQ), kfz-steuer-rechner (FAQ),
 * autokosten-rechner. Die Zahlen leiten sich automatisch ab, die Saetze nicht.
 */
export const SPRITPREISE_REFERENZ = {
  superE10: 2.126,        // €/L
  diesel: 2.233,          // €/L
  stand: '2026-10-07',    // ISO, ADAC-Bundesschnitt
  quelle: 'ADAC',
  quelleUrl: 'https://www.adac.de/news/aktueller-spritpreis/',
  // ADAC, Seite 'Aktueller Spritpreis', veroeffentlicht 07.10.2026, 13:00 Uhr: erster
  // Wochenwert nach Beginn des Tankrabatts am 01.10.2026. Ein Erhebungstag ist nicht
  // genannt; stand ist der Tag der Veroeffentlichung. Vorwoche (29.09.2026): Super E10
  // 2,258, Diesel 2,409. Diesel liegt weiter ueber Super E10.
  // Quelle: § 68 EnergieStG, gesetze-im-internet.de, abgerufen 01.10.2026. Vom 01.10. bis
  // 31.12.2026 je 1.000 l: Benzin 514,10 € (statt 654,50 € nach § 2 Abs. 1 Nr. 1 b),
  // Diesel 330,00 € (statt 470,40 € nach § 2 Abs. 1 Nr. 4 b). Differenz je 140,40 € =
  // 14,04 ct/L netto, mit 19 % USt 16,71 ct/L.
  tankrabattHinweis: 'Energiesteuer vom 01.10. bis 31.12.2026 um 16,7 Cent/L brutto gesenkt',
} as const;
