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
  superE10: 2.125,        // €/L
  diesel: 2.200,          // €/L
  stand: '2026-08-12',    // ISO, ADAC-Bundesschnitt
  quelle: 'ADAC',
  quelleUrl: 'https://www.adac.de/news/aktueller-spritpreis/',
  tankrabattHinweis: 'Energiesteuersenkung von 16,7 Cent/L brutto lief am 30.06.2026 aus',
} as const;
