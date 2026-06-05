/**
 * W17A — Instagram Graph API Wrapper.
 *
 * Zwei API-Calls pro Post (Variante B / 2-Step Publish):
 *   1) POST /{ig-user-id}/media          → liefert creation_id (Container)
 *   2) POST /{ig-user-id}/media_publish  → liefert media_id (Live-Post)
 *
 * Image-URL muss public über HTTPS erreichbar sein (Graph API holt sich
 * das Bild — kein Upload). Wir verlinken auf public/social-posts/ unter
 * der Production-Site.
 *
 * Auth: META_PAGE_ACCESS_TOKEN (Long-Lived Page Access Token, never-expires).
 * IG-User-ID: META_INSTAGRAM_USER_ID (numerische ID aus instagram_business_account.id).
 *
 * Fehler werden als Exception geworfen mit Meta-Error-Code in `.code`-Property.
 * Keine Retries (Pipeline ist idempotent über KV-State, läuft täglich neu).
 */

import { SOCIAL_CONFIG } from './config';
import type { SocialPost } from './schema';
import { SITE_URL } from '@/lib/seo';

const TIMEOUT_MS = 30_000;
const API_BASE = `https://graph.facebook.com/${SOCIAL_CONFIG.GRAPH_API_VERSION}`;

/**
 * W17A.2.x — Container-Status-Polling-Parameter.
 *
 * Hintergrund: Beim ersten Live-Post auf autokosten-rechner kam IG-Fehler
 * 9007 „Media ID is not available" — das ist die klassische Timing-
 * Konstellation, in der `media_publish` schneller losläuft als der
 * Container im Backend fertig verarbeitet ist. Lösung: zwischen Step 1
 * (Container) und Step 2 (Publish) den Container-Status pollen bis
 * `FINISHED` (oder ERROR/EXPIRED → abort).
 */
const POLL_INTERVAL_MS = 3_000;
const POLL_MAX_ATTEMPTS = 10; // 10 × 3 s = ~30 s total

/**
 * Custom-Error mit Meta-Fehlercode (Code -10, 190, 4 etc.).
 * Siehe docs/social-pipeline.md Troubleshooting für die häufigsten Codes.
 */
export class MetaApiError extends Error {
  constructor(
    message: string,
    public readonly code: number | string | undefined,
    public readonly platform: 'instagram' | 'facebook',
    public readonly step?: string,
  ) {
    super(message);
    this.name = 'MetaApiError';
  }
}

interface MetaErrorBody {
  error?: { message?: string; code?: number; error_subcode?: number; type?: string };
}

async function metaFetch(
  url: string,
  body: Record<string, string>,
  step: string,
  platform: 'instagram' | 'facebook',
): Promise<Record<string, unknown>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    throw new MetaApiError(
      `Network/timeout (${step}): ${err instanceof Error ? err.message : String(err)}`,
      undefined,
      platform,
      step,
    );
  }
  clearTimeout(timeout);

  let json: Record<string, unknown> & MetaErrorBody;
  try {
    json = await res.json();
  } catch {
    throw new MetaApiError(
      `Non-JSON response (${step}, HTTP ${res.status})`,
      res.status,
      platform,
      step,
    );
  }

  if (!res.ok || json.error) {
    throw new MetaApiError(
      json.error?.message ?? `HTTP ${res.status} (${step})`,
      json.error?.code ?? res.status,
      platform,
      step,
    );
  }

  return json;
}

/**
 * Holt den Container-Status (FINISHED / IN_PROGRESS / ERROR / EXPIRED /
 * PUBLISHED) per GET. Eigene Funktion statt `metaFetch`, weil die einen
 * POST mit form-body erwartet.
 */
async function getContainerStatus(
  creationId: string,
  token: string,
): Promise<string> {
  const url =
    `${API_BASE}/${creationId}?fields=status_code` +
    `&access_token=${encodeURIComponent(token)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, { method: 'GET', signal: controller.signal });
  } catch (err) {
    clearTimeout(timeout);
    throw new MetaApiError(
      `Network/timeout (poll): ${err instanceof Error ? err.message : String(err)}`,
      undefined,
      'instagram',
      'poll',
    );
  }
  clearTimeout(timeout);

  let json: { status_code?: string } & MetaErrorBody;
  try {
    json = await res.json();
  } catch {
    throw new MetaApiError(
      `Non-JSON response (poll, HTTP ${res.status})`,
      res.status,
      'instagram',
      'poll',
    );
  }
  if (!res.ok || json.error) {
    throw new MetaApiError(
      json.error?.message ?? `HTTP ${res.status} (poll)`,
      json.error?.code ?? res.status,
      'instagram',
      'poll',
    );
  }
  return json.status_code ?? 'UNKNOWN';
}

/**
 * Wartet, bis der IG-Container im Status FINISHED ist (oder ERROR/EXPIRED
 * → wirft). Schlägt nach POLL_MAX_ATTEMPTS × POLL_INTERVAL_MS fehl.
 *
 * PUBLISHED akzeptieren wir auch als grünes Licht — sollte bei unserem
 * 2-Step-Flow eigentlich nicht vorkommen (wir publishen ja noch nicht),
 * aber wenn doch (Race-Condition durch Re-Trigger), darf der Flow nicht
 * stehen bleiben.
 */
async function waitUntilFinished(creationId: string, token: string): Promise<void> {
  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const status = await getContainerStatus(creationId, token);
    if (status === 'FINISHED' || status === 'PUBLISHED') return;
    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new MetaApiError(
        `Container-Status ${status} nach ${attempt} Poll(s)`,
        status,
        'instagram',
        'poll',
      );
    }
    // IN_PROGRESS oder UNKNOWN → weiter pollen
  }
  throw new MetaApiError(
    `Container nicht FINISHED nach ${POLL_MAX_ATTEMPTS}×${POLL_INTERVAL_MS}ms`,
    'POLL_TIMEOUT',
    'instagram',
    'poll',
  );
}

/**
 * Postet einen SocialPost auf Instagram.
 *
 * @param post     Daten aus posts.json
 * @param dryRun   wenn true: kein API-Call, Rückgabe `'dry-ig-<index>'`
 * @returns        media_id des Live-Posts
 * @throws {MetaApiError} bei API-Fehlern (mit Meta-Code in .code)
 */
export async function publishToInstagram(
  post: SocialPost,
  dryRun = false,
): Promise<string> {
  if (dryRun) {
    return `dry-ig-${post.index}`;
  }

  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.META_INSTAGRAM_USER_ID;
  if (!token || !igUserId) {
    throw new MetaApiError(
      'META_PAGE_ACCESS_TOKEN oder META_INSTAGRAM_USER_ID fehlt',
      'ENV_MISSING',
      'instagram',
      'config',
    );
  }

  const imageUrl = `${SITE_URL}/social-posts/${post.image}`;
  const caption = `${post.captionIg}\n\n${post.hashtags}`.trim();

  // Step 1: Container
  const containerJson = await metaFetch(
    `${API_BASE}/${igUserId}/media`,
    { image_url: imageUrl, caption, access_token: token },
    'container',
    'instagram',
  );
  const creationId = containerJson.id;
  if (typeof creationId !== 'string') {
    throw new MetaApiError(
      'Container creation lieferte keine id',
      'NO_CONTAINER_ID',
      'instagram',
      'container',
    );
  }

  // Step 1.5: Polling bis FINISHED (Fix für Code 9007).
  await waitUntilFinished(creationId, token);

  // Step 2: Publish
  const publishJson = await metaFetch(
    `${API_BASE}/${igUserId}/media_publish`,
    { creation_id: creationId, access_token: token },
    'publish',
    'instagram',
  );
  const mediaId = publishJson.id;
  if (typeof mediaId !== 'string') {
    throw new MetaApiError(
      'media_publish lieferte keine id',
      'NO_MEDIA_ID',
      'instagram',
      'publish',
    );
  }

  return mediaId;
}
