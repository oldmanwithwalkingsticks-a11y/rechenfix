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
 *  - § 9 Abs. 1 Nr. 2 Buchst. b und c KraftStG — Hubraum-basierte Sockelbeträge
 *    (2,00 €/angefangene 100 ccm Benzin; 9,50 €/100 ccm Diesel).
 *    W187: vorher „Nr. 2a“ zitiert; Nr. 2a ist die Wohnmobil-Regel, Pkw stehen in Nr. 2 Buchst. a–c.
 *  - § 9 Abs. 1 Nr. 2 Buchst. b KraftStG (W187) — Erstzulassung 01.07.2009–31.12.2020:
 *    linear 2 € je g/km über 120 g (bis 2011), 110 g (2012–2013) bzw. 95 g (ab 2014).
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
 * Sockelbetrag pro angefangene 100 ccm Hubraum, Erstzulassung ab 01.07.2009.
 * § 9 Abs. 1 Nr. 2 Buchst. b und c KraftStG (Fremdzündung 2 €, Selbstzündung 9,50 €).
 * W187: vorher als „Nr. 2a (Benzin) / Nr. 2b (Diesel)“ zitiert.
 */
export const SOCKEL_PRO_100CCM = {
  benzin: 2.00,
  diesel: 9.50,
} as const;

/**
 * W187: CO₂-Schwellen § 9 Abs. 1 Nr. 2 Buchst. b KraftStG für Pkw mit Erstzulassung
 * 01.07.2009–31.12.2020 (gesetze-im-internet.de/kraftstg/__9.html): 2 € je Gramm über
 * aa) 120 g/km bei Erstzulassung bis 31.12.2011, bb) 110 g/km ab 01.01.2012, cc) 95 g/km ab 01.01.2014.
 * Vorher rechnete der Rechner diese Fahrzeuge mit der Staffel ab 2021 (Nr. 2 Buchst. c).
 */
export const CO2_SCHWELLEN_KRAFTSTG_9_NR2B = [
  { bisJahr: 2011, schwelle: 120 },
  { bisJahr: 2013, schwelle: 110 },
  { bisJahr: 2020, schwelle: 95 },
] as const;

export const CO2_SATZ_KRAFTSTG_9_NR2B = 2.00;

/** W187: CO₂-Schwelle nach Erstzulassungsjahr (2009–2020); außerhalb wird auf 2009 bzw. 2020 begrenzt. */
export function co2SchwelleNr2b(erstzulassungsjahr: number): number {
  const jahr = Math.min(2020, Math.max(2009, Math.floor(erstzulassungsjahr)));
  return CO2_SCHWELLEN_KRAFTSTG_9_NR2B.find(s => jahr <= s.bisJahr)!.schwelle;
}

/**
 * W187: CO₂-Komponente für Erstzulassung 01.07.2009–31.12.2020 (§ 9 Abs. 1 Nr. 2 Buchst. b):
 * linear 2,00 € je g/km über der Schwelle des Erstzulassungsjahres. Auf Cent gerundet.
 */
export function berechneCO2KomponenteNr2b(co2GproKm: number, erstzulassungsjahr: number): number {
  const ueber = co2GproKm - co2SchwelleNr2b(erstzulassungsjahr);
  if (ueber <= 0) return 0;
  return Math.round(ueber * CO2_SATZ_KRAFTSTG_9_NR2B * 100) / 100;
}

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
