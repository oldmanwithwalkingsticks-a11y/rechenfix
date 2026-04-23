/**
 * SSOT für Kfz-Steuer-Parameter nach KraftStG.
 *
 * Rechtsstand 2026-04-23 (Primärquellen verifiziert):
 *  - § 9 Abs. 1 Nr. 2c KraftStG — CO₂-basierte Staffel für Pkw mit
 *    Erstzulassung ab 01.01.2021 (gesetze-im-internet.de/kraftstg/__9.html)
 *  - § 3d KraftStG — Steuerbefreiung für reine Elektrofahrzeuge
 *    (gesetze-im-internet.de/kraftstg/__3d.html). Maximaldauer durch
 *    das 8. KraftStÄndG (Bundestag 04.12.2025, Drucksache 21/2672)
 *    bestätigt auf 31.12.2035.
 *  - § 9 Abs. 1 Nr. 2a KraftStG — Hubraum-basierte Sockelbeträge
 *    (2,00 €/angefangene 100 ccm Benzin; 9,50 €/100 ccm Diesel).
 *
 * Progressive Staffel: jede CO₂-Stufe greift NUR für das Delta oberhalb
 * ihrer Stufenuntergrenze (vergleichbar mit ESt-Tarifzonen, nicht mit
 * einer pauschalen Staffelung auf den gesamten CO₂-Wert).
 */

/**
 * CO₂-Staffel § 9 Abs. 1 Nr. 2c KraftStG (Erstzulassung ab 01.01.2021).
 * Stand: 2026-04-23. Änderungen sind selten — letzte Anpassung zum 01.01.2021.
 */
export const CO2_STAFFEL_KRAFTSTG_9_NR2C = [
  { ab: 0,   bis: 95,       euroProGrammDelta: 0.00 },
  { ab: 95,  bis: 115,      euroProGrammDelta: 2.00 },
  { ab: 115, bis: 135,      euroProGrammDelta: 2.20 },
  { ab: 135, bis: 155,      euroProGrammDelta: 2.50 },
  { ab: 155, bis: 175,      euroProGrammDelta: 2.90 },
  { ab: 175, bis: 195,      euroProGrammDelta: 3.40 },
  { ab: 195, bis: Infinity, euroProGrammDelta: 4.00 },
] as const;

/**
 * Sockelbetrag pro angefangene 100 ccm Hubraum.
 * § 9 Abs. 1 Nr. 2a KraftStG (Benzin) / Nr. 2b (Diesel).
 */
export const SOCKEL_PRO_100CCM = {
  benzin: 2.00,
  diesel: 9.50,
} as const;

/**
 * Steuerbefreiung Elektrofahrzeuge nach § 3d KraftStG.
 * Zulassungsfenster + 10-Jahres-Frist + Maximal-Cap bestätigt durch das
 * 8. KraftStÄndG (Bundestag 04.12.2025, Drucksache 21/2672).
 */
export const ELEKTRO_BEFREIUNG = {
  erstzulassungVon: new Date('2011-05-18'),
  erstzulassungBis: new Date('2030-12-31'),
  befreiungsdauerJahre: 10,
  maxBefreiungBis: new Date('2035-12-31'),
} as const;

/**
 * Berechnet die CO₂-Komponente der Jahreskfzsteuer für Pkw mit Erstzulassung
 * ab 01.01.2021 nach § 9 Abs. 1 Nr. 2c KraftStG.
 *
 * Progressive Staffel — jede Stufe greift nur für das Delta oberhalb ihrer
 * Stufenuntergrenze. Werte unter 95 g/km sind CO₂-steuerfrei (nur Hubraum-
 * Sockelbetrag nach § 9 Abs. 1 Nr. 2a/2b).
 *
 * Rundung auf ganze Cent (Math.round × 100 ÷ 100), damit die Jahressteuer
 * exakt dem abgegrenzten Betrag entspricht und keine Fließkomma-Artefakte
 * in den Zwischensummen entstehen.
 */
export function berechneCO2Komponente(co2GproKm: number): number {
  if (co2GproKm <= 0) return 0;
  let steuer = 0;
  for (const stufe of CO2_STAFFEL_KRAFTSTG_9_NR2C) {
    if (co2GproKm <= stufe.ab) break;
    const oberkante = Math.min(co2GproKm, stufe.bis);
    steuer += (oberkante - stufe.ab) * stufe.euroProGrammDelta;
  }
  return Math.round(steuer * 100) / 100;
}

/**
 * Berechnet das Ende der Elektrofahrzeug-Steuerbefreiung nach § 3d Abs. 1
 * KraftStG n.F.
 *
 * Logik: 10 Jahre ab Erstzulassung, gedeckelt auf 31.12.2035. Greift nur,
 * wenn die Erstzulassung im Förderzeitraum 18.05.2011 – 31.12.2030 liegt.
 *
 * @param erstzulassung Datum der erstmaligen Zulassung
 * @returns Ende der Steuerbefreiung; `null`, wenn Erstzulassung außerhalb
 *          des Förderzeitraums liegt (keine Befreiung nach § 3d Abs. 1).
 */
export function berechneElektroBefreiungsende(erstzulassung: Date): Date | null {
  if (
    erstzulassung < ELEKTRO_BEFREIUNG.erstzulassungVon ||
    erstzulassung > ELEKTRO_BEFREIUNG.erstzulassungBis
  ) {
    return null;
  }

  const ende10J = new Date(erstzulassung);
  ende10J.setFullYear(ende10J.getFullYear() + ELEKTRO_BEFREIUNG.befreiungsdauerJahre);

  return ende10J < ELEKTRO_BEFREIUNG.maxBefreiungBis ? ende10J : ELEKTRO_BEFREIUNG.maxBefreiungBis;
}
