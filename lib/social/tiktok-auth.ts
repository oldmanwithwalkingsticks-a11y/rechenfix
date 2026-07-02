/**
 * W18.2 — TikTok OAuth v2 Auth-Kern (Sandbox `rechenfix-dev`).
 *
 * KEIN Posting in diesem Modul — nur Authorization-Code-Flow, Token-
 * Exchange, Token-Refresh und KV-Persistenz. `video.publish`-Nutzung
 * kommt in W18.3.
 *
 * Endpoints (TikTok OAuth v2):
 *   Authorize: https://www.tiktok.com/v2/auth/authorize/
 *   Token:     https://open.tiktokapis.com/v2/oauth/token/  (auch Refresh)
 *
 * Der Token-Endpoint erwartet `application/x-www-form-urlencoded`
 * (NICHT JSON) und antwortet mit JSON. Häufigster OAuth-Fehler, wenn
 * versehentlich JSON gepostet wird.
 *
 * ENV (nur lesen, nie hardcoden, nie loggen):
 *   TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET,
 *   TIKTOK_REDIRECT_URI (== https://www.rechenfix.de/api/tiktok/callback),
 *   TIKTOK_OAUTH_STATE_SECRET (CSRF-State-HMAC).
 *
 * KV: bestehende redis-Instance aus @/lib/redis, Key `social:tiktok:token`.
 * Tokens NIE loggen, NIE im HTTP-Response ausgeben, NIE in Git.
 */

import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { redis } from '@/lib/redis';

const AUTHORIZE_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
const SCOPES = 'user.info.basic,video.publish,video.upload';
const TIMEOUT_MS = 15_000;
const TOKEN_KV_KEY = 'social:tiktok:token';
// Access-Token gilt als „bald abgelaufen", wenn er in < 5 min ausläuft.
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

/**
 * Persistiertes Token-Set. `expires_at` / `refresh_expires_at` sind
 * ABSOLUTE Unix-Millisekunden-Timestamps (nicht das rohe `expires_in`),
 * beim Speichern aus `Date.now() + expires_in*1000` berechnet.
 */
export interface TikTokTokenSet {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  refresh_expires_at: number;
  open_id: string;
  scope: string;
}

/**
 * Custom-Error mit TikTok-Fehlercode in `.code` (analog MetaApiError in
 * instagram.ts). `code` ist der TikTok-`error`-String, ein HTTP-Status
 * oder ein interner Marker (ENV_MISSING / NETWORK / NO_TOKEN / …).
 */
export class TikTokApiError extends Error {
  constructor(
    message: string,
    public readonly code?: string | number,
  ) {
    super(message);
    this.name = 'TikTokApiError';
  }
}

/** Liest eine Pflicht-ENV; wirft mit klarer Meldung, welche ENV fehlt. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new TikTokApiError(`${name} fehlt`, 'ENV_MISSING');
  }
  return value;
}

function signNonce(nonce: string, secret: string): string {
  return createHmac('sha256', secret).update(nonce).digest('hex');
}

/**
 * Baut die Authorize-URL + den signierten `state`.
 *
 * `state` = `<nonce>.<hmac-sha256(nonce, TIKTOK_OAUTH_STATE_SECRET)>`.
 * Der Callback prüft die Signatur (verifyState) UND das Cookie, sodass
 * ein Angreifer den State nicht fälschen kann (CSRF-Schutz).
 */
export function buildAuthorizeUrl(): { url: string; state: string } {
  const clientKey = requireEnv('TIKTOK_CLIENT_KEY');
  const redirectUri = requireEnv('TIKTOK_REDIRECT_URI');
  const stateSecret = requireEnv('TIKTOK_OAUTH_STATE_SECRET');

  const nonce = randomBytes(16).toString('hex');
  const state = `${nonce}.${signNonce(nonce, stateSecret)}`;

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: SCOPES,
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
  });

  return { url: `${AUTHORIZE_URL}?${params.toString()}`, state };
}

/** Prüft die HMAC-Signatur eines `state`-Strings (timing-safe). */
export function verifyState(state: string): boolean {
  const stateSecret = process.env.TIKTOK_OAUTH_STATE_SECRET;
  if (!stateSecret) return false;

  const dot = state.lastIndexOf('.');
  if (dot <= 0 || dot >= state.length - 1) return false;

  const nonce = state.slice(0, dot);
  const sig = state.slice(dot + 1);
  const expected = signNonce(nonce, stateSecret);

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

interface TikTokTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  open_id?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

/**
 * POST an den Token-Endpoint (form-urlencoded) und Mapping der Antwort
 * auf ein TikTokTokenSet mit absoluten Ablauf-Timestamps.
 */
async function tokenRequest(body: Record<string, string>): Promise<TikTokTokenSet> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body),
      signal: controller.signal,
    });
  } catch (err) {
    throw new TikTokApiError(
      `Network/timeout: ${err instanceof Error ? err.message : String(err)}`,
      'NETWORK',
    );
  } finally {
    clearTimeout(timeout);
  }

  let json: TikTokTokenResponse;
  try {
    json = (await res.json()) as TikTokTokenResponse;
  } catch {
    throw new TikTokApiError(`Non-JSON response (HTTP ${res.status})`, res.status);
  }

  if (!res.ok || json.error) {
    throw new TikTokApiError(
      json.error_description || json.error || `HTTP ${res.status}`,
      json.error || res.status,
    );
  }

  if (!json.access_token || !json.refresh_token) {
    throw new TikTokApiError(
      'Token-Response ohne access_token/refresh_token',
      'NO_TOKEN',
    );
  }

  const now = Date.now();
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: now + (json.expires_in ?? 0) * 1000,
    refresh_expires_at: now + (json.refresh_expires_in ?? 0) * 1000,
    open_id: json.open_id ?? '',
    scope: json.scope ?? '',
  };
}

/** Tauscht den Authorization-Code gegen ein Token-Set. */
export function exchangeCodeForToken(code: string): Promise<TikTokTokenSet> {
  return tokenRequest({
    client_key: requireEnv('TIKTOK_CLIENT_KEY'),
    client_secret: requireEnv('TIKTOK_CLIENT_SECRET'),
    code,
    grant_type: 'authorization_code',
    redirect_uri: requireEnv('TIKTOK_REDIRECT_URI'),
  });
}

/** Erneuert das Access-Token via Refresh-Token. */
export function refreshAccessToken(refreshToken: string): Promise<TikTokTokenSet> {
  return tokenRequest({
    client_key: requireEnv('TIKTOK_CLIENT_KEY'),
    client_secret: requireEnv('TIKTOK_CLIENT_SECRET'),
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
}

/** Speichert das Token-Set roh als JSON-String in KV. */
export async function saveTokenSet(set: TikTokTokenSet): Promise<void> {
  await redis.set(TOKEN_KV_KEY, JSON.stringify(set));
}

/**
 * Lädt das Token-Set aus KV oder gibt `null` zurück, wenn keines
 * existiert.
 *
 * Robust gegen die @upstash/redis-Auto-Deserialisierung: `get()` kann
 * je nach SDK-Verhalten bereits ein Objekt liefern (wenn der Wert als
 * gültiges JSON erkannt wird) oder den rohen String — beide Fälle
 * werden behandelt (vgl. die dokumentierte SDK-Eigenheit in state.ts).
 */
export async function loadTokenSet(): Promise<TikTokTokenSet | null> {
  const raw = await redis.get<unknown>(TOKEN_KV_KEY);
  if (raw === null || raw === undefined) return null;

  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as TikTokTokenSet;
    } catch {
      return null;
    }
  }

  return raw as TikTokTokenSet;
}

/**
 * Liefert ein gültiges Access-Token. Läuft der Token in < 5 min ab,
 * wird er per Refresh-Token erneuert und das neue Set gespeichert.
 *
 * @throws {TikTokApiError} wenn gar kein Token-Set in KV liegt
 *   (Code `NOT_AUTHORIZED` → /api/tiktok/auth aufrufen).
 */
export async function getValidAccessToken(): Promise<string> {
  const set = await loadTokenSet();
  if (!set) {
    throw new TikTokApiError(
      'TikTok nicht autorisiert, /api/tiktok/auth aufrufen',
      'NOT_AUTHORIZED',
    );
  }

  if (Date.now() < set.expires_at - REFRESH_BUFFER_MS) {
    return set.access_token;
  }

  const refreshed = await refreshAccessToken(set.refresh_token);
  await saveTokenSet(refreshed);
  return refreshed.access_token;
}
