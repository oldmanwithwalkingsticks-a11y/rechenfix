/**
 * Public-Feedback-Log: nutzer-initiierte Wünsche und ihre Umsetzung.
 *
 * Konsumiert von:
 * - app/aktualisierungen/page.tsx (öffentliche Übersicht)
 * - app/sitemap.ts (lastModified via getLatestFeedbackDate)
 *
 * Neue Einträge oben einfügen oder per id-Sort egal — Page sortiert
 * chronologisch absteigend.
 */

export type FeedbackStatus =
  | 'eingegangen'
  | 'in-umsetzung'
  | 'umgesetzt'
  | 'abgelehnt';

export type FeedbackEntry = {
  id: string;              // 'YYYY-MM-DD-NN'
  datumAnfrage: string;    // ISO YYYY-MM-DD
  datumUmsetzung?: string; // optional, ISO YYYY-MM-DD
  status: FeedbackStatus;
  bereich: string;         // 'kategorie/slug' oder 'allgemein'
  wunsch: string;
  kommentar: string;
};

export const FEEDBACK_LOG: FeedbackEntry[] = [
  {
    id: '2026-05-31-01',
    datumAnfrage: '2026-05-31',
    datumUmsetzung: '2026-05-31',
    status: 'umgesetzt',
    bereich: 'auto/reichweiten-rechner',
    wunsch:
      'Erweiterte Faktoren für realistischere ' +
      'Reichweiten-Berechnung',
    kommentar:
      'Nutzer-Hinweis bezog sich darauf, dass zu wenige Faktoren ' +
      'berücksichtigt würden. Tatsächlich waren Fahrprofil, ' +
      'Außentemperatur und Klimaanlage bereits als Eingaben ' +
      'enthalten — das ging aus der Bedienung möglicherweise ' +
      'nicht klar genug hervor. Neu hinzugefügt: Fahrstil ' +
      '(sparsam/normal/sportlich) als vierter Faktor analog ' +
      'ADAC- und AutoScout24-Standard. Mitfahrer-Gewicht und ' +
      'Straßenbelag haben physikalisch nur sehr geringen ' +
      'Einfluss (1-3 %) und werden im FAQ transparent ' +
      'eingeordnet.',
  },
  {
    id: '2026-05-26-01',
    datumAnfrage: '2026-05-26',
    datumUmsetzung: '2026-05-26',
    status: 'umgesetzt',
    bereich: 'mathe/abi-rechner',
    wunsch: 'Mehr Nachkommastellen bei der Berechnung',
    kommentar:
      'Alle Zwischenwerte (Block-I, Block-II) sowie die ' +
      'Abi-Durchschnittsnote werden jetzt mit 2 Nachkommastellen ' +
      'ausgegeben (vorher 1).',
  },
];

export function getLatestFeedbackDate(): string {
  const dates = FEEDBACK_LOG
    .map(e => e.datumUmsetzung ?? e.datumAnfrage)
    .sort()
    .reverse();
  return dates[0];
}
