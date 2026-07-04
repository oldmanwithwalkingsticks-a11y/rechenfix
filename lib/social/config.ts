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
  /** Seed für Fisher-Yates-Shuffle in scripts/build-social-queue.ts. Niemals ändern, sonst Rotation verschiebt sich. */
  SHUFFLE_SEED: 17,
} as const;

/**
 * Slugs, die NICHT auf IG/FB gepostet werden (Weg B: TikTok postet sie
 * sehr wohl — siehe platformsForSlug in lib/social/state.ts), weil sie
 * bereits in Phase 0 manuell auf Instagram veröffentlicht wurden.
 * Konsumiert von scripts/build-social-queue.ts + lib/social/state.ts.
 * Für die Bio-Hub-Anzeige siehe BIO_HUB_FEATURED.
 *
 * W17A.1 (06.06.2026): Top-10-Launch-Reihenfolge aus dem Setup-Doku
 * Teil A.3 („Tage 1–10 — Top-10-Launch"). Bei Phase-0-Erweiterung
 * (z. B. weitere manuelle Posts vor Live-Schaltung der Pipeline)
 * hier ergänzen und Queue neu generieren — der Done-Marken-Mechanismus
 * in lib/social/state.ts macht das idempotent.
 */
export const EXCLUDED_SLUGS = [
  'brutto-netto-rechner',
  'mwst-rechner',
  'zinsrechner',
  'bmi-rechner',
  'stundenlohn-rechner',
  'spritkosten-rechner',
  'tagerechner',
  'dreisatz-rechner',
  'mietrechner',
  'stromkosten-rechner',
] as const;

/**
 * Die Top-10-Rechner, die im Bio-Hub (/social) als „Beliebte Rechner"
 * dauerhaft angezeigt werden. Inhaltlich = die Phase-0-Top-10.
 *
 * ENTKOPPELT von EXCLUDED_SLUGS (18.4b): EXCLUDED_SLUGS steuert den
 * POSTING-Ausschluss (IG/FB überspringen diese Slugs), BIO_HUB_FEATURED
 * steuert die ANZEIGE. Aktuell dieselben 10 Slugs, aber unterschiedliche
 * Bedeutung — Weg B (TikTok postet die Top-10 sehr wohl) hängt an dieser
 * Trennung.
 */
export const BIO_HUB_FEATURED = EXCLUDED_SLUGS;
