/**
 * EEG-Einspeisevergütung Photovoltaik — zentrale SSOT.
 *
 * Rechtsgrundlage: § 48, § 49, § 53 EEG 2023.
 * Quelle: Bundesnetzagentur (BNetzA) EEG-Förderung & -Fördersätze, laufend
 *   aktualisiert · BSW-Solarwirtschaft Vergütungssätze-Übersicht 07/2025.
 * Stand: 04/2026.
 *
 * Sätze werden halbjährlich um 1 % degressiv abgesenkt (§ 49 EEG 2023).
 * Schalt-Stichtage: 01.02. und 01.08. eines jeden Jahres.
 *
 * Werte = feste Vergütungssätze in ct/kWh, anzulegender Wert minus 0,4 ct
 * nach § 53 Abs. 1 EEG.
 *
 * Maßgeblich für die 20-jährige Vergütung ist der Satz zum Zeitpunkt der
 * Inbetriebnahme der Anlage.
 */

export interface EegSatz {
  /** Bis 10 kWp, Teileinspeisung (Eigenverbrauch + Überschuss-Einspeisung) */
  bis10kWp_teil: number;
  /** Bis 10 kWp, Volleinspeisung (kein Eigenverbrauch) */
  bis10kWp_voll: number;
  /** 10–40 kWp, Teileinspeisung */
  bis40kWp_teil: number;
  /** 10–40 kWp, Volleinspeisung */
  bis40kWp_voll: number;
  /** 40–100 kWp, Teileinspeisung */
  bis100kWp_teil: number;
  /** 40–100 kWp, Volleinspeisung */
  bis100kWp_voll: number;
}

interface EegBucket {
  /** ISO-Datum YYYY-MM-DD, ab dem dieser Satz gilt */
  gueltigAb: string;
  werte: EegSatz;
  /**
   * true = Werte sind die planmäßige −1 %-Degression nach § 49 EEG 2023,
   * aber noch nicht von der BNetzA bestätigt. UI-Hinweis sinnvoll.
   */
  prognose?: boolean;
}

/**
 * Halbjahres-Buckets sortiert nach gueltigAb. Bei Ergänzung um neue
 * Halbjahre einfach am Ende anhängen — der Getter findet immer den
 * jüngsten Bucket ≤ Stichtag.
 */
const SAETZE: EegBucket[] = [
  // Aktuelles Halbjahr
  {
    gueltigAb: '2026-02-01',
    werte: {
      bis10kWp_teil: 7.78,
      bis10kWp_voll: 12.34,
      bis40kWp_teil: 6.73,
      bis40kWp_voll: 10.35,
      bis100kWp_teil: 5.50,
      bis100kWp_voll: 10.35,
    },
  },
  // Prognose ab 01.08.2026: planmäßige −1 %-Degression nach § 49 EEG 2023
  {
    gueltigAb: '2026-08-01',
    prognose: true,
    werte: {
      bis10kWp_teil: 7.71,
      bis10kWp_voll: 12.23,
      bis40kWp_teil: 6.67,
      bis40kWp_voll: 10.25,
      bis100kWp_teil: 5.45,
      bis100kWp_voll: 10.25,
    },
  },
];

export function getEegSatz(stichtag: Date = new Date()): EegSatz & { prognose: boolean } {
  // Buckets absteigend nach gueltigAb durchsuchen, ersten ≤ Stichtag nehmen
  const sorted = [...SAETZE].sort(
    (a, b) => new Date(b.gueltigAb).getTime() - new Date(a.gueltigAb).getTime(),
  );
  const aktuell = sorted.find(s => stichtag >= new Date(s.gueltigAb));
  if (!aktuell) {
    // Stichtag liegt vor dem ältesten Bucket — Fallback auf ältesten
    const fallback = sorted[sorted.length - 1];
    return { ...fallback.werte, prognose: false };
  }
  return { ...aktuell.werte, prognose: aktuell.prognose ?? false };
}

export const EEG_DEGRESSION_HINWEIS =
  'EEG-Vergütungssätze sinken halbjährlich (1.2. / 1.8.) um 1 % nach § 49 EEG 2023. ' +
  'Maßgeblich für die 20-jährige Vergütung ist der Satz zum Zeitpunkt der Inbetriebnahme.';

/**
 * Mischvergütung für Anlagen, die zwei Größenklassen überspannen.
 * Beispiel: 15 kWp Anlage → 10 kWp werden mit bis10kWp-Satz vergütet,
 * 5 kWp mit bis40kWp-Satz; Lib gibt den gewichteten Durchschnitt zurück.
 *
 * Modus 'teil' = Teileinspeisung (Eigenverbrauch erlaubt), 'voll' = Volleinspeisung.
 */
export function getMischVerguetung(
  kwp: number,
  modus: 'teil' | 'voll' = 'teil',
  stichtag: Date = new Date(),
): number {
  const s = getEegSatz(stichtag);
  if (kwp <= 0) return 0;
  const t = modus === 'teil';
  const s10 = t ? s.bis10kWp_teil : s.bis10kWp_voll;
  const s40 = t ? s.bis40kWp_teil : s.bis40kWp_voll;
  const s100 = t ? s.bis100kWp_teil : s.bis100kWp_voll;

  if (kwp <= 10) return s10;
  if (kwp <= 40) {
    return (10 / kwp) * s10 + ((kwp - 10) / kwp) * s40;
  }
  if (kwp <= 100) {
    return (10 / kwp) * s10 + (30 / kwp) * s40 + ((kwp - 40) / kwp) * s100;
  }
  // Über 100 kWp: anteilig 100 kWp-Satz für den Rest (vereinfacht)
  return (10 / kwp) * s10 + (30 / kwp) * s40 + (60 / kwp) * s100;
}
