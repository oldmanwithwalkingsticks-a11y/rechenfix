/**
 * W17A — Publisher: Rotation + Cross-Platform-Orchestration.
 *
 * - getPostForToday(now?) wählt den Post aus posts.json basierend auf
 *   (Berlin-Heute − START_DATE) mod posts.length.
 * - publishToBothPlatforms(force, dryRun) postet IG zuerst, FB danach;
 *   die beiden Plattformen sind unabhängig — wenn IG scheitert, wird
 *   FB trotzdem versucht.
 *
 * Idempotenz über state.wasPostedToday(). Force ?=true im Endpoint
 * überspringt den Check (z. B. für manuellen Live-Test mit Karsten).
 */

import postsFile from './posts.json';
import type { PostsFile, SocialPost } from './schema';
import { SOCIAL_CONFIG } from './config';
import { getBerlinDate, getPostIndexForDay } from './utils';
import { publishToInstagram } from './instagram';
import { publishToFacebook } from './facebook';
import {
  wasPostedToday,
  markPosted,
  logError,
  type Platform,
} from './state';

const POSTS = postsFile as unknown as PostsFile;

export interface PlatformResult {
  success: boolean;
  postId?: string;
  skipped?: boolean;
  error?: string;
  code?: number | string;
}

export interface PublishResult {
  date: string;
  postIndex: number | null;
  instagram: PlatformResult;
  facebook: PlatformResult;
}

/**
 * Wählt den Post für ein gegebenes Berlin-Datum.
 * Returns null wenn posts.json leer ist (Pre-Phase-0-Fill).
 */
export function getPostForToday(now: Date = new Date()): SocialPost | null {
  if (POSTS.posts.length === 0) {
    return null;
  }
  const today = getBerlinDate(now);
  const idx = getPostIndexForDay(today, POSTS.startDate, POSTS.posts.length);
  return POSTS.posts[idx];
}

async function publishToOne(
  date: string,
  platform: Platform,
  post: SocialPost,
  force: boolean,
  dryRun: boolean,
): Promise<PlatformResult> {
  if (!force) {
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
    }
    return { success: true, postId: externalId };
  } catch (err) {
    if (!dryRun) {
      // Best-effort Logging; falls KV down ist, soll der Error trotzdem
      // an den Caller (Cron-Endpoint) durchgereicht werden.
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
 * Postet einen SocialPost auf Instagram UND Facebook.
 * Plattformen unabhängig (kein Short-Circuit bei IG-Fehler).
 */
export async function publishToBothPlatforms(
  force = false,
  dryRun = false,
): Promise<PublishResult> {
  const date = getBerlinDate();
  const post = getPostForToday();
  if (!post) {
    return {
      date,
      postIndex: null,
      instagram: { success: false, error: 'posts.json ist leer' },
      facebook: { success: false, error: 'posts.json ist leer' },
    };
  }

  const instagram = await publishToOne(date, 'instagram', post, force, dryRun);
  const facebook = await publishToOne(date, 'facebook', post, force, dryRun);
  return { date, postIndex: post.index, instagram, facebook };
}

// Re-exports für Tests + Cron-Endpoint
export { SOCIAL_CONFIG };
