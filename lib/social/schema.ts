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
  /**
   * @deprecated W17A.2.y — durch `hashtagsIg` + `hashtagsFb` ersetzt.
   * Wrapper fällt darauf zurück + trimmt selbst (7/3), wenn die neuen
   * Felder bei vor-W17A.2.y-Captions fehlen.
   */
  hashtags?: string;
  /** IG-Hashtag-String, max 7 Tags. */
  hashtagsIg?: string;
  /** FB-Hashtag-String, max 3 Tags. */
  hashtagsFb?: string;
}

export interface PostsFile {
  /** Schema-Version. Inkrementieren bei Breaking-Changes. */
  version: 1;
  /** Start-Datum der Rotation (ISO YYYY-MM-DD), Berlin-Time. */
  startDate: string;
  /** Posts in fester Reihenfolge. Rotation = (today − startDate) mod posts.length. */
  posts: SocialPost[];
}

// =============================================================
// W17A.1 — Auto-Content-Pipeline-Schema
// =============================================================

/**
 * Queue-File: Seeded-Shuffle aller eligible Slugs (siehe
 * scripts/build-social-queue.ts). Slug-Reihenfolge ist deterministisch
 * und nicht mehr modulo, sondern „erster Eintrag ohne Done-Marke".
 */
export interface QueueFile {
  version: 1;
  seed: number;
  generatedAt: string; // YYYY-MM-DD
  excludedSlugs: string[];
  queue: string[];
}

/**
 * Captions-File: pro Slug die fertig formulierten IG/FB-Captions,
 * Hashtags und Bild-Texte. Erzeugt durch scripts/social-caption-builder.ts
 * (lokal, Anthropic-API) und committed.
 *
 * W17A.2 (06.06.2026): socialHeadline + socialEyebrow ergänzt. Der
 * Image-Builder liest beide Felder direkt aus captions.json statt sie
 * aus dem rechner.beispiel-Feld zu parsen (Trefferquote nur ~50 %,
 * abgeschnittener Text, themen-fremde Eyebrows). Lehre L-W17A.2.1.
 */
export interface CaptionEntry {
  /** IG-Text mit „👉 Link in Bio"-CTA. */
  captionIg: string;
  /** FB-Text mit echter Rechner-URL als CTA. */
  captionFb: string;
  /**
   * @deprecated W17A.2.y (06.06.2026) — durch `hashtagsIg` + `hashtagsFb`
   * ersetzt. Bleibt im Schema für Backwards-Compat mit vor-W17A.2.y
   * erzeugten Captions (160 Initial-Build); IG/FB-Wrapper fallen auf
   * dieses Feld zurück + trimmen selbst, wenn die neuen fehlen.
   */
  hashtags?: string;
  /**
   * IG-Hashtags, maximal **7** Stück, Leerzeichen-getrennt, Kleinbuchstaben.
   * Thematisch spezifisch — generische Füller wie #rechnen vermeiden.
   */
  hashtagsIg: string;
  /**
   * FB-Hashtags, maximal **3** Stück, Leerzeichen-getrennt, Kleinbuchstaben.
   * Die thematisch wichtigsten Drei — FB-Algorithmus mag wenig, präzise Tags.
   */
  hashtagsFb: string;
  /**
   * Bild-Headline (Highlight-Block, Bold 110 px im Image-Builder).
   * Maximal 22 Zeichen inkl. Einheit/Symbol; eine Zahl oder Kernaussage,
   * KEIN Satz. Beispiele: „1.815 € / Jahr", „BMI 24,7", „= 119 €".
   */
  socialHeadline: string;
  /**
   * Eyebrow über der Headline (Bold 42 px, letter-spaced caps).
   * 1–2 kontextpassende Worte. Beispiele: „Faustregel", „Schnell gerechnet",
   * „Selbst-Check", „Pendler-Realität".
   */
  socialEyebrow: string;
}

export interface CaptionsFile {
  version: 1;
  captions: Record<string, CaptionEntry>;
}
