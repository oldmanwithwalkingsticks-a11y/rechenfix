/**
 * W18.3c — TikTok Content Posting API (Direct Post, PULL_FROM_URL).
 *
 * publishToTikTok(post, dryRun) postet ein bereits live liegendes 9:16-
 * MP4 (public/social-videos/{slug}.mp4) per PULL_FROM_URL an TikTok.
 * Analog zu publishToInstagram/publishToFacebook, aber JSON-Bodies statt
 * form-urlencoded und drei Schritte:
 *
 *   1) creator_info/query  → erlaubte privacy_level_options
 *   2) video/init          → Direct Post PULL_FROM_URL, liefert publish_id
 *   3) status/fetch (poll) → bis PUBLISH_COMPLETE / FAILED / Timeout
 *
 * Token kommt aus W18.2 (getValidAccessToken, refresh-fähig). Keine Cron-
 * Integration hier — das ist W18.4. Dieses Modul liefert nur die Funktion,
 * einzeln testbar.
 *
 * Sandbox/unaudited-Clients dürfen NUR SELF_ONLY posten; das privacy_level
 * wird deshalb dynamisch aus creator_info gewählt (Präferenz SELF_ONLY),
 * niemals hardcoded.
 *
 * Tokens werden NIE geloggt. video_url nutzt www + https (kein Redirect).
 */

import type { SocialPost } from './schema';
import { getValidAccessToken, TikTokApiError } from './tiktok-auth';

const API_BASE = 'https://open.tiktokapis.com';
const SITE_URL = 'https://www.rechenfix.de';
const TIMEOUT_MS = 15_000;
const POLL_INTERVAL_MS = 3_000;
const POLL_MAX_ATTEMPTS = 10; // 10 × 3 s = ~30 s
const MAX_TITLE_LEN = 2200;

/**
 * TikTok-Response-Envelope: jede Antwort trägt `data` + `error`.
 * Bei Erfolg ist `error.code === "ok"`.
 */
interface TikTokEnvelope<T> {
  data?: T;
  error?: { code?: string; message?: string; log_id?: string };
}

interface CreatorInfoData {
  privacy_level_options?: string[];
}

interface InitData {
  publish_id?: string;
}

interface StatusData {
  status?: string;
  fail_reason?: string;
}

/**
 * POST an einen TikTok-Endpoint mit Bearer-Token + JSON-Body und
 * AbortController-Timeout. Wertet den `error`-Envelope aus:
 * `error.code != "ok"` → TikTokApiError. Gibt `data` zurück.
 */
async function ttPost<T>(
  pathname: string,
  token: string,
  body: Record<string, unknown>,
  step: string,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${pathname}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    throw new TikTokApiError(
      `Network/timeout (${step}): ${err instanceof Error ? err.message : String(err)}`,
      'NETWORK',
    );
  } finally {
    clearTimeout(timeout);
  }

  let json: TikTokEnvelope<T>;
  try {
    json = (await res.json()) as TikTokEnvelope<T>;
  } catch {
    throw new TikTokApiError(`Non-JSON response (${step}, HTTP ${res.status})`, res.status);
  }

  const err = json.error;
  if (err && err.code && err.code !== 'ok') {
    throw new TikTokApiError(`${step}: ${err.message || err.code}`, err.code);
  }
  if (!res.ok) {
    throw new TikTokApiError(`${step}: HTTP ${res.status}`, res.status);
  }

  return (json.data ?? {}) as T;
}

/**
 * Baut den TikTok-Titel aus der FB-Caption (echte URL, nicht „Link in
 * Bio") plus FB-Hashtags, sicherheitshalber auf 2200 Zeichen begrenzt.
 */
function buildTitle(post: SocialPost): string {
  const caption = (post.captionFb ?? '').trim();
  const tags = (post.hashtagsFb ?? '').trim();
  const combined = (tags ? `${caption} ${tags}` : caption).trim();
  return combined.length > MAX_TITLE_LEN ? combined.slice(0, MAX_TITLE_LEN) : combined;
}

/**
 * Pollt status/fetch, bis der Post PUBLISH_COMPLETE ist. Bei FAILED oder
 * nach Timeout wird geworfen (bei Timeout ist der Post evtl. später
 * trotzdem fertig — im Fehlertext vermerkt).
 */
async function waitUntilComplete(token: string, publishId: string): Promise<void> {
  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const status = await ttPost<StatusData>(
      '/v2/post/publish/status/fetch/',
      token,
      { publish_id: publishId },
      'status_fetch',
    );
    const s = status.status ?? 'UNKNOWN';
    if (s === 'PUBLISH_COMPLETE') return;
    if (s === 'FAILED') {
      throw new TikTokApiError(
        `Post FAILED: ${status.fail_reason ?? 'unbekannt'} (publish_id ${publishId})`,
        status.fail_reason ?? 'FAILED',
      );
    }
    // PROCESSING_UPLOAD / SEND_TO_USER_INBOX / UNKNOWN → weiter pollen
  }
  throw new TikTokApiError(
    `Status nicht PUBLISH_COMPLETE nach ${POLL_MAX_ATTEMPTS}×${POLL_INTERVAL_MS}ms ` +
      `(publish_id ${publishId} — Post ist evtl. später trotzdem fertig)`,
    'POLL_TIMEOUT',
  );
}

/**
 * Postet das Video zu `post.slug` per Direct Post (PULL_FROM_URL) an
 * TikTok.
 *
 * @param post    Slug + Caption-Quellen (captionFb/hashtagsFb).
 * @param dryRun  wenn true: kein API-Call, Rückgabe `dry-tt-<index>`.
 * @returns       publish_id des veröffentlichten Videos.
 * @throws {TikTokApiError} bei API-Fehlern; NOT_AUTHORIZED wird aus
 *   getValidAccessToken durchgereicht (Token fehlt in KV).
 */
export async function publishToTikTok(post: SocialPost, dryRun = false): Promise<string> {
  if (dryRun) {
    return `dry-tt-${post.index}`;
  }

  const token = await getValidAccessToken();

  // Schritt 1 — creator_info/query: erlaubte privacy_level_options.
  const creator = await ttPost<CreatorInfoData>(
    '/v2/post/publish/creator_info/query/',
    token,
    {},
    'creator_info',
  );
  const options = creator.privacy_level_options ?? [];
  if (options.length === 0) {
    throw new TikTokApiError(
      'creator_info lieferte keine privacy_level_options',
      'NO_PRIVACY_OPTIONS',
    );
  }
  // Sandbox/unaudited: nur SELF_ONLY erlaubt → bevorzugen, sonst erstes
  // verfügbares Level.
  const privacyLevel = options.includes('SELF_ONLY') ? 'SELF_ONLY' : options[0];

  // Schritt 2 — video/init: Direct Post, PULL_FROM_URL.
  const videoUrl = `${SITE_URL}/social-videos/${post.slug}.mp4`;
  const init = await ttPost<InitData>(
    '/v2/post/publish/video/init/',
    token,
    {
      post_info: {
        title: buildTitle(post),
        privacy_level: privacyLevel,
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: 'PULL_FROM_URL',
        video_url: videoUrl,
      },
    },
    'video_init',
  );
  const publishId = init.publish_id;
  if (!publishId) {
    throw new TikTokApiError('video/init lieferte keine publish_id', 'NO_PUBLISH_ID');
  }

  // Schritt 3 — status/fetch: pollen bis PUBLISH_COMPLETE.
  await waitUntilComplete(token, publishId);

  return publishId;
}
