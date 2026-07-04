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
import { publishToTikTok } from './tiktok';
import {
  wasPostedToday,
  markPosted,
  logError,
  isSlugDoneOn,
  isSlugFullyDone,
  markSlugDoneOn,
  setCurrentBioSlug,
  platformsForSlug,
  type Platform,
} from './state';

const QUEUE = queueFile as unknown as QueueFile;
const CAPTIONS = captionsFile as unknown as CaptionsFile;

/** Pfad-Konstante für Bild-Existenz-Check zur Laufzeit (Vercel-Lambda). */
const IMAGES_DIR = join(process.cwd(), 'public', 'social-posts');
/** TikTok-Video-Ordner (Weg B): Vorab-Sanity, ob das MP4 committet/deployed ist. */
const TIKTOK_VIDEOS_DIR = join(process.cwd(), 'public', 'social-videos');

export interface PlatformResult {
  success: boolean;
  postId?: string;
  skipped?: boolean;
  error?: string;
  code?: number | string;
}

export interface PublishResult {
  date: string;
  /** IG/FB-Slug des heutigen Posts, oder null wenn Queue erschöpft / Daten fehlen. */
  slug: string | null;
  /** TikTok-Slug (Weg B — kann vom IG/FB-Slug abweichen), null wenn inaktiv/erschöpft. */
  tiktokSlug?: string | null;
  /** True wenn alle Slugs in der Queue eine Done-Marke haben. */
  queueExhausted: boolean;
  /** True wenn das Bild für den ausgewählten Slug auf Disk existiert. */
  imageExists?: boolean;
  /** True wenn ein Captions-Eintrag für den ausgewählten Slug vorhanden ist. */
  captionExists?: boolean;
  instagram: PlatformResult;
  facebook: PlatformResult;
  tiktok: PlatformResult;
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
 * Nächster offener Slug für EINE Plattform (Weg B / Option X).
 * Läuft die gemeinsame Queue durch und liefert den ersten Slug, der
 * - für diese Plattform zuständig ist (platformsForSlug enthält sie), UND
 * - auf dieser Plattform noch KEINE Done-Marke hat.
 * IG/FB überspringen so die Top-10 (nicht zuständig), TikTok nimmt sie mit.
 * Ist TikTok inaktiv (TIKTOK_PIPELINE_ENABLED≠'true'), liefert
 * platformsForSlug nie 'tiktok' → pickNextSlugFor('tiktok') gibt immer null.
 */
export async function pickNextSlugFor(platform: Platform): Promise<string | null> {
  for (const slug of QUEUE.queue) {
    if (!platformsForSlug(slug).includes(platform)) continue;
    const done = await isSlugDoneOn(slug, platform);
    if (!done) return slug;
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
        : platform === 'facebook'
          ? await publishToFacebook(post, dryRun)
          : await publishToTikTok(post, dryRun);
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
      // W18.4c — TikTok-Erfolg setzt den eigenen Bio-Slug (der in 18.3f
      // zurückgestellte Teil). /social?ref=tt liest social:current-bio-slug:tiktok.
      if (platform === 'tiktok') {
        try {
          await setCurrentBioSlug(post.slug, 'tiktok');
        } catch (kvErr) {
          console.error(
            `[social] setCurrentBioSlug(tiktok) fehlgeschlagen für ${post.slug}:`,
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

/** Asset-Verzeichnis + Extension je Plattform (TikTok: MP4, sonst PNG). */
function assetExistsFor(platform: Platform, slug: string): boolean {
  if (platform === 'tiktok') {
    return existsSync(join(TIKTOK_VIDEOS_DIR, `${slug}.mp4`));
  }
  return existsSync(join(IMAGES_DIR, `${slug}.png`));
}

/**
 * Löst den nächsten Slug für EINE Plattform auf (via pickNextSlugFor),
 * prüft Assets/Caption und postet. Gibt {result, slug} zurück (slug für
 * Reporting/Bio). slug === null → für diese Plattform nichts offen
 * (alle done ODER Plattform inaktiv) → skipped.
 *
 * W18.4c-2: Jede Plattform holt so ihren EIGENEN nächsten Slug — vorher
 * liefen IG/FB über das gemeinsame pickNextSlug()/isSlugFullyDone, das mit
 * aktivem TikTok einen TikTok-Done-Marker verlangte und IG/FB auf einen
 * längst geposteten Slug (→ skip) festnagelte.
 */
async function publishNextFor(
  date: string,
  platform: Platform,
  force: boolean,
  dryRun: boolean,
): Promise<{ result: PlatformResult; slug: string | null }> {
  const slug = await pickNextSlugFor(platform);
  if (!slug) {
    return { result: { success: true, skipped: true }, slug: null };
  }
  const caption = !!CAPTIONS.captions[slug];
  const asset = assetExistsFor(platform, slug);
  if (!caption || !asset) {
    return {
      result: {
        success: false,
        error: `Asset/Caption fehlt für '${slug}'/${platform} (asset:${asset} caption:${caption})`,
      },
      slug,
    };
  }
  const post = buildPostForSlug(slug);
  if (!post) {
    return {
      result: { success: false, error: `Post-Build fehlgeschlagen für '${slug}'` },
      slug,
    };
  }
  const result = await publishToOne(date, platform, post, force, dryRun);
  return { result, slug };
}

/**
 * Postet den nächsten offenen Queue-Eintrag PRO Plattform (Weg B):
 * IG, FB und TikTok holen jeweils ihren eigenen nächsten Slug. IG/FB
 * haben identische Zuständigkeit (gleicher Slug bei gleichem Done-Stand),
 * TikTok kann abweichen. Plattformen unabhängig (kein Short-Circuit).
 * Done-Marke wird direkt in publishToOne() gesetzt.
 */
export async function publishToBothPlatforms(
  force = false,
  dryRun = false,
): Promise<PublishResult> {
  const date = getBerlinDate();

  const ig = await publishNextFor(date, 'instagram', force, dryRun);
  const fb = await publishNextFor(date, 'facebook', force, dryRun);
  const tt = await publishNextFor(date, 'tiktok', force, dryRun);

  // queueExhausted: true nur wenn ALLE drei nichts Offenes mehr haben.
  const queueExhausted =
    ig.slug === null && fb.slug === null && tt.slug === null;

  return {
    date,
    slug: ig.slug, // Rückwärtskompat: „slug" = IG-Slug
    tiktokSlug: tt.slug,
    queueExhausted,
    // imageExists/captionExists auf den IG-Slug bezogen (Rückwärtskompat).
    imageExists: ig.slug ? assetExistsFor('instagram', ig.slug) : false,
    captionExists: ig.slug ? !!CAPTIONS.captions[ig.slug] : false,
    instagram: ig.result,
    facebook: fb.result,
    tiktok: tt.result,
  };
}

// Re-exports für Tests + Cron-Endpoint
export { SOCIAL_CONFIG };
