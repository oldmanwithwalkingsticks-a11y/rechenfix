/**
 * Konvertiert ISO-Datum-String (YYYY-MM-DD) zu deutscher Lang-Form.
 * Beispiel: '2026-05-21' → '21. Mai 2026'
 *
 * Robust gegen ungültige Inputs: gibt bei Parse-Fehler den Original-String
 * zurück, statt zu werfen (Render-Safety).
 */
const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function formatGermanDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthIdx = parseInt(month, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return iso;
  return `${parseInt(day, 10)}. ${MONATE[monthIdx]} ${year}`;
}
