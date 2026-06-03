/**
 * W17A — Social-Media Pipeline Schema.
 *
 * Versioniert ab v1. Erweiterungen rückwärtskompatibel
 * (neue optionale Felder ergänzen, bestehende nie umbenennen).
 *
 * Konsumiert von:
 * - lib/social/publisher.ts   (Rotation + getPostForToday)
 * - lib/social/instagram.ts   (publishToInstagram)
 * - lib/social/facebook.ts    (publishToFacebook)
 * - app/api/cron/social-post/route.ts
 */

export interface SocialPost {
  /** Sequenz im posts.json-Array (1-basiert, dient als Stable-ID). */
  index: number;
  /** Rechner-Slug, z. B. 'brutto-netto-rechner'. */
  slug: string;
  /** Kategorie-Slug, z. B. 'finanzen'. */
  category: string;
  /** Vollständige Rechner-URL, z. B. 'https://www.rechenfix.de/finanzen/brutto-netto-rechner'. */
  url: string;
  /** Bilddateiname unter public/social-posts/, z. B. '001.png'. */
  image: string;
  /** Instagram-Caption inkl. „Link in Bio", max. 2200 Zeichen. */
  captionIg: string;
  /** Facebook-Caption inkl. echtem URL, max. 2200 Zeichen. */
  captionFb: string;
  /** Hashtag-String (9–15 Tags, Leerzeichen-getrennt). */
  hashtags: string;
}

export interface PostsFile {
  /** Schema-Version. Inkrementieren bei Breaking-Changes. */
  version: 1;
  /** Start-Datum der Rotation (ISO YYYY-MM-DD), Berlin-Time. */
  startDate: string;
  /** Posts in fester Reihenfolge. Rotation = (today − startDate) mod posts.length. */
  posts: SocialPost[];
}
