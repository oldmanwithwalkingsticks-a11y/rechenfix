/**
 * W17A — Date/Time-Helpers (Berlin-Zone aware).
 *
 * Vercel Cron läuft UTC. „Heute" für die Pipeline ist aber das Datum
 * in Berlin (für KV-Keys und Rotations-Index), damit ein 19:00-Berlin-
 * Posting deterministisch genau einen Tag belegt — unabhängig von DST.
 */

/**
 * Gibt das ISO-Datum YYYY-MM-DD in Europe/Berlin zurück.
 * Verwendet Intl.DateTimeFormat mit `en-CA` (liefert ISO-Format).
 */
export function getBerlinDate(date: Date = new Date()): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(date);
}

/**
 * Berechnet den Rotations-Index für ein gegebenes Berlin-Datum.
 *
 * Index = (today - startDate) mod postsLength, niemals negativ.
 *
 * @param today        ISO YYYY-MM-DD (Berlin-Tag)
 * @param startDate    ISO YYYY-MM-DD (aus SOCIAL_CONFIG.START_DATE)
 * @param postsLength  Anzahl Posts im Array; muss > 0 sein
 * @returns            0-basierter Array-Index
 */
export function getPostIndexForDay(
  today: string,
  startDate: string,
  postsLength: number,
): number {
  if (postsLength <= 0) {
    throw new Error('getPostIndexForDay: postsLength muss > 0 sein');
  }
  // Parse als UTC-Midnight — wir vergleichen reine Datums-Strings,
  // Zeit-Komponente ist irrelevant für die Differenz in Tagen.
  const todayMs = Date.parse(`${today}T00:00:00Z`);
  const startMs = Date.parse(`${startDate}T00:00:00Z`);
  if (Number.isNaN(todayMs) || Number.isNaN(startMs)) {
    throw new Error(
      `getPostIndexForDay: ungültiges Datum (today=${today}, startDate=${startDate})`,
    );
  }
  const diffDays = Math.floor((todayMs - startMs) / 86_400_000);
  // Modulo-Fix für negative Differenzen (vor START_DATE):
  return ((diffDays % postsLength) + postsLength) % postsLength;
}
