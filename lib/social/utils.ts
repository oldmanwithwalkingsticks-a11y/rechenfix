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

/** Erster Tag des TikTok-Zwei-Tage-Takts (Berlin-Datum, ISO). */
export const TIKTOK_TAKT_START = '2026-08-06';

/**
 * W52 — TikTok postet nur jeden zweiten Tag, gerechnet ab TIKTOK_TAKT_START.
 *
 * Grund: PostPeer-Gratistarif liefert 20 Credits/Monat bei 1 Credit je Post;
 * täglich wären ~30 nötig. Zwei-Tage-Takt ergibt ~15 Posts und lässt Luft für
 * manuelle Re-Trigger nach Fehlschlägen.
 *
 * Gerechnet wird in ganzen Tagen seit dem Starttag, NICHT über die Parität des
 * Monatstags: Bei Monatstag-Parität entstünde an jedem 31. ein Doppel- bzw.
 * Dreitagesprung. Vor dem Starttag ist TikTok inaktiv.
 *
 * @param berlinDatum ISO YYYY-MM-DD (Berlin-Tag, aus getBerlinDate)
 */
export function istTikTokTag(berlinDatum: string): boolean {
  const tage = tageZwischen(TIKTOK_TAKT_START, berlinDatum);
  if (tage === null || tage < 0) return false;
  return tage % 2 === 0;
}

/** Ganze Tage zwischen zwei ISO-Daten (YYYY-MM-DD). null bei ungültiger Eingabe. */
function tageZwischen(von: string, bis: string): number | null {
  const a = Date.parse(`${von}T00:00:00Z`);
  const b = Date.parse(`${bis}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / 86_400_000);
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
