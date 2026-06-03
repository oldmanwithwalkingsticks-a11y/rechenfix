/**
 * W17A — Facebook Page API Wrapper.
 *
 * Ein API-Call pro Post:
 *   POST /{page-id}/photos
 *   Body: url, message (caption + Rechner-URL), access_token
 *
 * Variante B (separater Call, kein IG-Crosspost): IG↔FB-Verknüpfung
 * im Business-Portfolio ist wegen Werbekonto-Restriction blockiert
 * (Meta-Support-Ticket 03.06.2026). Daher unabhängiger FB-Call.
 *
 * Errors als MetaApiError mit .code-Property (siehe instagram.ts).
 */

import { SOCIAL_CONFIG } from './config';
import type { SocialPost } from './schema';
import { SITE_URL } from '@/lib/seo';
import { MetaApiError } from './instagram';

const TIMEOUT_MS = 30_000;
const API_BASE = `https://graph.facebook.com/${SOCIAL_CONFIG.GRAPH_API_VERSION}`;

/**
 * Postet einen SocialPost als Foto auf die Facebook-Page.
 *
 * @param post     Daten aus posts.json
 * @param dryRun   wenn true: kein API-Call, Rückgabe `'dry-fb-<index>'`
 * @returns        post_id der Facebook-Posting (Format `<pageId>_<postId>`)
 * @throws {MetaApiError} bei API-Fehlern
 */
export async function publishToFacebook(
  post: SocialPost,
  dryRun = false,
): Promise<string> {
  if (dryRun) {
    return `dry-fb-${post.index}`;
  }

  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  if (!token || !pageId) {
    throw new MetaApiError(
      'META_PAGE_ACCESS_TOKEN oder META_PAGE_ID fehlt',
      'ENV_MISSING',
      'facebook',
      'config',
    );
  }

  const imageUrl = `${SITE_URL}/social-posts/${post.image}`;
  const message = `${post.captionFb}\n\n${post.hashtags}`.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url: imageUrl, message, access_token: token }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    throw new MetaApiError(
      `Network/timeout: ${err instanceof Error ? err.message : String(err)}`,
      undefined,
      'facebook',
      'photos',
    );
  }
  clearTimeout(timeout);

  let json: {
    id?: string;
    post_id?: string;
    error?: { message?: string; code?: number };
  };
  try {
    json = await res.json();
  } catch {
    throw new MetaApiError(
      `Non-JSON response (HTTP ${res.status})`,
      res.status,
      'facebook',
      'photos',
    );
  }

  if (!res.ok || json.error) {
    throw new MetaApiError(
      json.error?.message ?? `HTTP ${res.status}`,
      json.error?.code ?? res.status,
      'facebook',
      'photos',
    );
  }

  // Bei /photos liefert FB sowohl `id` (photo) als auch `post_id` (Wall-Post).
  // post_id ist das was wir zum Verlinken/Auditing wollen.
  const postId = json.post_id ?? json.id;
  if (typeof postId !== 'string') {
    throw new MetaApiError(
      'photos-Response ohne post_id/id',
      'NO_POST_ID',
      'facebook',
      'photos',
    );
  }

  return postId;
}
