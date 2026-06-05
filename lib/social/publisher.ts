/**
 * W17A.1 — Publisher: Queue-Iteration + Cross-Platform-Orchestration.
 *
 * Ablöse des W17A-Modulo-Rotations-Patterns:
 *
 *   ALT (W17A): post = posts[(today − startDate) mod posts.length]
 *   NEU (17A.1): post = ersten Slug in queue.json ohne Done-Marke
 *                in KV (social:done:{slug}). Queue erschöpft → null.
 *
 * Datenquellen:
 *   - lib/social/queue.json        : 160 Slug-Reihenfolge (Seeded-Shuffle)
 *   - lib/social/captions.json     : pro Slug captionIg/captionFb/hashtags
 *   - lib/rechner-config (rechner) : titel, kategorieSlug, slug, icon …
 *   - public/social-posts/{slug}.png : Bild-File-Existenz (fs.existsSync)
 *
 * Plattform-Posten unabhängig (kein Short-Circuit). Done-Marke wird
 * gesetzt, sobald MINDESTENS eine Plattform Success ist — sonst wäre
 * der Slug am nächsten Tag erneut auf der erfolgreichen Plattform
 * → Duplikat.
 */

import { existsSync } from 'fs';
import { join } from 'path';
import queueFile from './queue.json';
import captionsFile from './captions.json';
import type { QueueFile, CaptionsFile, SocialPost } from './schema';
import { SOCIAL_CONFIG } from './config';
import { rechner } from '@/lib/rechner-config';
import { getBerlinDate } from './utils';
import { publishToInstagram } from './instagram';
import { publishToFacebook } from './facebook';
import {
  wasPostedToday,
  markPosted,
  logError,
  isSlugDoneOn,
  isSlugFullyDone,
  markSlugDoneOn,
  setCurrentBioSlug,
  type Platform,
} from './state';

const QUEUE = queueFile as unknown as QueueFile;
const CAPTIONS = captionsFile as unknown as CaptionsFile;

/** Pfad-Konstante für Bild-Existenz-Check zur Laufzeit (Vercel-Lambda). */
const IMAGES_DIR = join(process.cwd(), 'public', 'social-posts');

export interface PlatformResult {
  success: boolean;
  postId?: string;
  skipped?: boolean;
  error?: string;
  code?: number | string;
}

export interface PublishResult {
  date: string;
  /** Slug des heutigen Posts, oder null wenn Queue erschöpft / Daten fehlen. */
  slug: string | null;
  /** True wenn alle Slugs in der Queue eine Done-Marke haben. */
  queueExhausted: boolean;
  /** True wenn das Bild für den ausgewählten Slug auf Disk existiert. */
  imageExists?: boolean;
  /** True wenn ein Captions-Eintrag für den ausgewählten Slug vorhanden ist. */
  captionExists?: boolean;
  instagram: PlatformResult;
  facebook: PlatformResult;
}

/**
 * Liefert einen build-fertigen SocialPost zu einem Slug,
 * oder null wenn (a) Bild fehlt oder (b) Caption fehlt oder
 * (c) Rechner-Config-Eintrag fehlt.
 *
 * Index = Position in der Queue (1-basiert) — nur für Logging,
 * keine Rotations-Bedeutung mehr.
 */
function buildPostForSlug(slug: string): SocialPost | null {
  const r = rechner.find((x) => x.slug === slug);
  const caption = CAPTIONS.captions[slug];
  if (!r || !caption) {
    return null;
  }
  const idx = QUEUE.queue.indexOf(slug);
  return {
    index: idx >= 0 ? idx + 1 : 0,
    slug,
    category: r.kategorieSlug,
    url: `https://www.rechenfix.de/${r.kategorieSlug}/${r.slug}`,
    image: `${slug}.png`,
    captionIg: caption.captionIg,
    captionFb: caption.captionFb,
    hashtags: caption.hashtags,
    hashtagsIg: caption.hashtagsIg,
    hashtagsFb: caption.hashtagsFb,
  };
}

/**
 * Wählt den nächsten zu postenden Slug aus der Queue.
 * Iteriert in Queue-Reihenfolge und gibt den ersten Slug zurück, der
 * NICHT auf beiden Plattformen done ist (Plattform-Done-Marken seit
 * W17A.2.x). Damit kann ein Slug, der z. B. nur FB erfolgreich war,
 * im nächsten Lauf noch einen IG-Retry bekommen.
 * Returnt null, wenn alle Queue-Slugs vollständig durch sind.
 */
export async function pickNextSlug(): Promise<string | null> {
  for (const slug of QUEUE.queue) {
    const fully = await isSlugFullyDone(slug);
    if (!fully) return slug;
  }
  return null;
}

/**
 * Bequeme Single-Slug-Auflösung: kombiniert pickNextSlug +
 * buildPostForSlug. Returnt zusätzlich die Existenz-Flags, damit
 * der Cron-Endpoint im Dry-Run aussagekräftig antworten kann.
 */
export async function resolveTodayPost(): Promise<{
  slug: string | null;
  post: SocialPost | null;
  imageExists: boolean;
  captionExists: boolean;
}> {
  const slug = await pickNextSlug();
  if (!slug) {
    return { slug: null, post: null, imageExists: false, captionExists: false };
  }
  const imageExists = existsSync(join(IMAGES_DIR, `${slug}.png`));
  const captionExists = !!CAPTIONS.captions[slug];
  const post = imageExists && captionExists ? buildPostForSlug(slug) : null;
  return { slug, post, imageExists, captionExists };
}

async function publishToOne(
  date: string,
  platform: Platform,
  post: SocialPost,
  force: boolean,
  dryRun: boolean,
): Promise<PlatformResult> {
  if (!force) {
    // Plattform-Done-Marke gewinnt (W17A.2.x): Slug ist auf dieser
    // Plattform schon erfolgreich → skip ohne Re-Post, auch tageübergreifend.
    const platformDone = await isSlugDoneOn(post.slug, platform);
    if (platformDone) {
      return { success: true, skipped: true };
    }
    // Zweiter Schutz: Same-Day-Idempotenz (z. B. mehrere Cron-Trigger
    // am selben Berlin-Tag durch manuelles ?force=true ohne Done-Marke).
    const already = await wasPostedToday(date, platform);
    if (already) {
      return { success: true, skipped: true };
    }
  }
  try {
    const externalId =
      platform === 'instagram'
        ? await publishToInstagram(post, dryRun)
        : await publishToFacebook(post, dryRun);
    if (!dryRun) {
      await markPosted(date, platform, externalId);
      // Plattform-Done-Marke direkt nach Erfolg setzen (W17A.2.x).
      // Best-effort: KV-Fehler hier sollen den Erfolgs-Return nicht
      // entwerten, würden aber zu Re-Posts führen — also nicht stillschweigend
      // schlucken, sondern in Log werfen.
      try {
        await markSlugDoneOn(post.slug, platform, date);
      } catch (kvErr) {
        console.error(
          `[social] markSlugDoneOn fehlgeschlagen für ${post.slug}/${platform}:`,
          kvErr,
        );
      }
      // W17A.3 — IG-Erfolg setzt den Bio-Hub-Pointer für die /social-Seite.
      // Bewusst nur IG: FB-Posts erlauben echte URL in der Caption, brauchen
      // also keinen Bio-Workaround. Best-effort: KV-Fehler ändert NICHTS am
      // Plattform-Erfolg (Bio-Hub würde dann den vorherigen Slug weiter zeigen).
      if (platform === 'instagram') {
        try {
          await setCurrentBioSlug(post.slug);
        } catch (kvErr) {
          console.error(
            `[social] setCurrentBioSlug fehlgeschlagen für ${post.slug}:`,
            kvErr,
          );
        }
      }
    }
    return { success: true, postId: externalId };
  } catch (err) {
    if (!dryRun) {
      try {
        await logError(date, platform, err);
      } catch {
        /* ignore — Error wird sowieso im Result reported */
      }
    }
    const msg = err instanceof Error ? err.message : String(err);
    const code =
      err instanceof Error && 'code' in err
        ? (err as { code?: number | string }).code
        : undefined;
    return { success: false, error: msg, code };
  }
}

/**
 * Postet den heutigen Queue-Eintrag auf Instagram UND Facebook.
 * Plattformen unabhängig (kein Short-Circuit bei IG-Fehler).
 * Setzt die Done-Marke, sobald MIN. eine Plattform success war.
 */
export async function publishToBothPlatforms(
  force = false,
  dryRun = false,
): Promise<PublishResult> {
  const date = getBerlinDate();
  const { slug, post, imageExists, captionExists } = await resolveTodayPost();

  if (slug === null) {
    return {
      date,
      slug: null,
      queueExhausted: true,
      imageExists: false,
      captionExists: false,
      instagram: { success: false, error: 'queue erschöpft — alle Slugs done' },
      facebook: { success: false, error: 'queue erschöpft — alle Slugs done' },
    };
  }

  if (!post) {
    const errMsg =
      !imageExists && !captionExists
        ? `Bild + Caption fehlen für '${slug}'`
        : !imageExists
          ? `Bild fehlt: public/social-posts/${slug}.png`
          : `Caption fehlt für '${slug}' in lib/social/captions.json`;
    return {
      date,
      slug,
      queueExhausted: false,
      imageExists,
      captionExists,
      instagram: { success: false, error: errMsg },
      facebook: { success: false, error: errMsg },
    };
  }

  const instagram = await publishToOne(date, 'instagram', post, force, dryRun);
  const facebook = await publishToOne(date, 'facebook', post, force, dryRun);

  // Plattform-Done-Marken werden seit W17A.2.x direkt in publishToOne()
  // gesetzt — kein Blanket-Done nach beiden Plattformen mehr.

  return {
    date,
    slug,
    queueExhausted: false,
    imageExists: true,
    captionExists: true,
    instagram,
    facebook,
  };
}

// Re-exports für Tests + Cron-Endpoint
export { SOCIAL_CONFIG };
