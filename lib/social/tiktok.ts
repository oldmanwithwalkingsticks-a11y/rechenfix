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

const CTA_TT = 'Berechne es → Link in Bio 🔗';

/**
 * TikTok-Caption deterministisch aus den vorhandenen Caption-Feldern
 * ableiten (Variante B, kein API-Call). Aufbau:
 *   <Hook = 1. Zeile von captionFb>
 *   <leerzeile>
 *   <Kernaussage = 1. Inhaltsabsatz nach dem Hook, gekürzt>
 *   <leerzeile>
 *   <CTA_TT>
 *   <leerzeile>
 *   <Hashtags = hashtagsIg (7 Tags) statt hashtagsFb (3 Tags)>
 *
 * URLs werden entfernt (TikTok macht sie nicht klickbar → „Link in Bio").
 */
function buildTitle(post: SocialPost): string {
  const fb = (post.captionFb ?? '').trim();
  const blocks = fb.split('\n\n').map((b) => b.trim()).filter(Boolean);

  // Hook = erste Zeile des ersten Blocks:
  const hook = (blocks[0] ?? '').split('\n')[0].trim();

  // Kernaussage = erster Folgeblock, der KEINE URL enthält; sonst leer.
  // Auf ~200 Zeichen kürzen (an Satzgrenze), damit die Caption kompakt bleibt.
  let core = '';
  for (const b of blocks.slice(1)) {
    if (b.includes('http')) continue; // URL-Block überspringen
    core = b;
    break;
  }
  core = core.replace(/\s*https?:\/\/\S+/g, '').trim();
  if (core.length > 200) {
    const cut = core.slice(0, 200);
    const lastDot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
    core = (lastDot > 80 ? cut.slice(0, lastDot + 1) : cut).trim() + (lastDot > 80 ? '' : ' …');
  }

  // Hashtags: IG-Set (7 Tags) bevorzugen, Fallback FB-Set.
  const tags = (post.hashtagsIg ?? '').trim() || (post.hashtagsFb ?? '').trim();

  const parts = [hook];
  if (core) parts.push(core);
  parts.push(CTA_TT);
  if (tags) parts.push(tags);
  const out = parts.join('\n\n').trim();

  return out.length > MAX_TITLE_LEN ? out.slice(0, MAX_TITLE_LEN).trim() : out;
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
