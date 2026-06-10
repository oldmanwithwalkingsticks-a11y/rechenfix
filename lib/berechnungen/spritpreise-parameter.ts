/**
 * SSOT für redaktionelle Spritpreis-Referenzwerte (NICHT für die Rechenlogik —
 * der spritkosten-rechner nutzt User-Input). Verwendet in Content-Bausteinen
 * (Statistik, Beispielrechnung, Diagramm) des spritkosten-rechner.
 * PFLEGE: monatlich. Quelle ADAC-Bundesschnitt. stand bei jedem Update bumpen.
 */
export const SPRITPREISE_REFERENZ = {
  superE10: 1.907,        // €/L
  diesel: 1.893,          // €/L
  stand: '2026-06-08',    // ISO, ADAC-Bundesschnitt
  quelle: 'ADAC',
  quelleUrl: 'https://www.adac.de/news/aktueller-spritpreis/',
  tankrabattHinweis: 'Energiesteuersenkung (~17 Cent/L) seit 01.05.2026',
} as const;
