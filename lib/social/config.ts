/**
 * W17A — Social-Media Pipeline Konfiguration.
 *
 * Skalierungspfad ohne Code-Refactor:
 *   - 1×/Tag (Initial): POSTS_PER_DAY=1, vercel.json cron 1 Eintrag
 *   - 2×/Tag (Tag 30+): POSTS_PER_DAY=2, vercel.json cron 2 Einträge
 *   - 3×/Tag (Tag 60+): POSTS_PER_DAY=3, vercel.json cron 3 Einträge
 *
 * POSTING_HOUR_BERLIN ist informational (Cron läuft auf UTC):
 *   17 UTC = 19 Berlin im Sommer, 18 Berlin im Winter (DST bewusst akzeptiert).
 */

export const SOCIAL_CONFIG = {
  POSTS_PER_DAY: 1,
  START_DATE: '2026-06-05',
  POSTING_HOUR_BERLIN: 19,
  GRAPH_API_VERSION: 'v23.0',
} as const;
