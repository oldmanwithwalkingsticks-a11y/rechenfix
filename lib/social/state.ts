/**
 * W17A — KV-State-Wrapper für Idempotenz + Error-Logs.
 *
 * Nutzt die bestehende redis-Instance aus lib/redis.ts (Vercel KV-
 * Integration via KV_REST_API_URL + KV_REST_API_TOKEN). Schlüssel-
 * Schema:
 *
 *   social:posted:{YYYY-MM-DD}:instagram → mediaId (string)
 *   social:posted:{YYYY-MM-DD}:facebook  → postId  (string)
 *   social:errors:{YYYY-MM-DD}:instagram → JSON { error, code, step, ts }
 *   social:errors:{YYYY-MM-DD}:facebook  → JSON { error, code, step, ts }
 *   social:done:{slug}:instagram         → YYYY-MM-DD (Datum des erfolg. Posts)
 *   social:done:{slug}:facebook          → YYYY-MM-DD (Datum des erfolg. Posts)
 *   social:current-bio-slug              → slug des aktuell auf IG verlinkten Rechners
 *
 * Idempotenz pro Tag/Plattform: wasPostedToday() vor jedem API-Call
 * → Skip falls true. Force-Override im Cron-Endpoint via ?force=true.
 *
 * Done-Marken pro Slug+Plattform (W17A.2.x — vorher slug-only):
 * Nach erfolgreichem Plattform-Post wird die Marke
 * social:done:{slug}:{platform} gesetzt. Ein Slug gilt erst dann als
 * vollständig durch („fully done"), wenn BEIDE Plattformen markiert
 * sind. Damit kann der Retry-Cron eine ausgefallene Plattform
 * (z. B. IG-Fehler 9007 trotz FB-Erfolg) nachholen, ohne FB doppelt
 * zu posten. Queue-Reset = manuelles Löschen aller social:done:*
 * Keys (siehe docs/social-pipeline.md).
 */

import { redis } from '@/lib/redis';
import { MetaApiError } from './instagram';

export type Platform = 'instagram' | 'facebook';

export interface ErrorLogEntry {
  error: string;
  code?: number | string;
  step?: string;
  ts: string; // ISO-Timestamp
}

function postedKey(date: string, platform: Platform): string {
  return `social:posted:${date}:${platform}`;
}

function errorKey(date: string, platform: Platform): string {
  return `social:errors:${date}:${platform}`;
}

function doneKey(slug: string, platform: Platform): string {
  return `social:done:${slug}:${platform}`;
}

/**
 * Prüft, ob ein Post für den gegebenen Tag bereits auf der Plattform
 * veröffentlicht wurde.
 */
export async function wasPostedToday(
  date: string,
  platform: Platform,
): Promise<boolean> {
  const v = await redis.get(postedKey(date, platform));
  return v !== null && v !== undefined;
}

/**
 * Markiert einen Post als veröffentlicht. Speichert die externe ID
 * für späteres Tracking / Audit.
 */
export async function markPosted(
  date: string,
  platform: Platform,
  externalId: string,
): Promise<void> {
  await redis.set(postedKey(date, platform), externalId);
}

/**
 * Loggt einen Publish-Fehler in KV mit ISO-Timestamp.
 * Überschreibt einen vorhandenen Eintrag (jüngster Fehler gewinnt).
 */
export async function logError(
  date: string,
  platform: Platform,
  err: unknown,
): Promise<void> {
  const entry: ErrorLogEntry = {
    error: err instanceof Error ? err.message : String(err),
    code: err instanceof MetaApiError ? err.code : undefined,
    step: err instanceof MetaApiError ? err.step : undefined,
    ts: new Date().toISOString(),
  };
  await redis.set(errorKey(date, platform), JSON.stringify(entry));
}

/**
 * Prüft, ob ein Slug auf EINER bestimmten Plattform bereits durch ist.
 * Wird vom Publisher in publishToOne() verwendet, um einzelne
 * Plattformen zu überspringen, an denen ein Re-Try unerwünscht wäre.
 */
export async function isSlugDoneOn(
  slug: string,
  platform: Platform,
): Promise<boolean> {
  const v = await redis.get(doneKey(slug, platform));
  return v !== null && v !== undefined;
}

/**
 * Prüft, ob ein Slug auf BEIDEN Plattformen durch ist („fully done").
 * Wird von pickNextSlug() verwendet — nur fully-done-Slugs werden
 * komplett übersprungen.
 */
export async function isSlugFullyDone(slug: string): Promise<boolean> {
  const [ig, fb] = await Promise.all([
    isSlugDoneOn(slug, 'instagram'),
    isSlugDoneOn(slug, 'facebook'),
  ]);
  return ig && fb;
}

/**
 * Markiert eine Slug+Plattform-Kombination als „durch". Speichert das
 * Berlin-Datum des Erst-Posts als Wert (für späteres Reporting).
 *
 * Aufruf-Stelle: Publisher, direkt nach erfolgreichem Plattform-Post.
 */
export async function markSlugDoneOn(
  slug: string,
  platform: Platform,
  dateBerlin: string,
): Promise<void> {
  await redis.set(doneKey(slug, platform), dateBerlin);
}

/**
 * W17A.3 — Bio-Hub-Pointer.
 *
 * IG erlaubt nur EINEN klickbaren Link in der Bio. Wir setzen den
 * permanent auf `https://www.rechenfix.de/social`. Die /social-Seite
 * liest diesen KV-Wert und zeigt den aktuell auf IG geposteten Rechner
 * als großen Top-Button.
 *
 * Implementation (Hotfix 06.06.2026, Karsten-Pfad-A):
 * Sowohl set als auch get gehen DIREKT über die Upstash-REST-API,
 * NICHT über die @upstash/redis-SDK. Grund: die SDK macht beim
 * `get()` ein automatisches `JSON.parse()` auf den Wert und liefert
 * `null` zurück, wenn das fehlschlägt — selbst mit der dokumentierten
 * Option `automaticDeserialization: false`. Karsten-Debug zeigte:
 *   raw= null typeof= object isNull= true
 * obwohl in Redis ein rohes "autokosten-rechner" stand.
 *
 * Direkter REST-Bypass mit fetch löst das endgültig:
 * - GET  `${URL}/get/<key>`  → `{"result": "<string>" | null}`
 * - POST `${URL}/`  Body `["SET","<key>","<value>"]`  → `{"result":"OK"}`
 *
 * Damit ist garantiert: was per CLI als roher String gesetzt wird,
 * kommt als roher String wieder raus. Setzt die Pipeline neu, kommt
 * ebenfalls roher String raus.
 */
const CURRENT_BIO_KEY = 'social:current-bio-slug';

function kvEnv(): { url: string; token: string } {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error('KV_REST_API_URL oder KV_REST_API_TOKEN fehlt');
  }
  return { url, token };
}

/**
 * Direktes Upstash-REST-GET, SDK komplett umgangen.
 * Liefert den rohen String oder null (bei fehlendem Key, leerem Wert
 * oder HTTP-Fehler).
 *
 * KV-DEBUG (06.06.2026): loggt KV-Host (NICHT Token), HTTP-Status und
 * rohen Response-Body. Karsten-Verdacht: Vercel-ENV zeigt ggf. auf
 * eine andere Upstash-DB als seine Console „erklaerfix"
 * (apt-tahr-124200.upstash.io). Logs landen in Vercel-Function-Logs.
 * Wieder entfernen sobald der KV-Host verifiziert ist.
 */
async function kvRestGet(key: string): Promise<string | null> {
  const { url, token } = kvEnv();

  let kvHost = 'unparsed';
  try {
    kvHost = new URL(url).host;
  } catch {
    /* ignore — wir loggen 'unparsed' */
  }
  console.log('[social/kv-debug] GET host=', kvHost, 'key=', key);

  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const bodyText = await res.text();
  console.log(
    '[social/kv-debug] GET status=',
    res.status,
    'body=',
    bodyText.length > 500 ? bodyText.slice(0, 500) + '…' : bodyText,
  );

  if (!res.ok) {
    throw new Error(`Upstash GET HTTP ${res.status}: ${bodyText}`);
  }
  let json: { result?: string | null };
  try {
    json = JSON.parse(bodyText) as { result?: string | null };
  } catch (err) {
    console.error('[social/kv-debug] body parse error:', err);
    return null;
  }
  return typeof json.result === 'string' && json.result.length > 0
    ? json.result
    : null;
}

/**
 * Direktes Upstash-REST-SET via Generic-Command-Body (`["SET", key, value]`).
 * Setzt den rohen String — KEIN JSON-Wrap, kein Auto-Encoding.
 */
async function kvRestSet(key: string, value: string): Promise<void> {
  const { url, token } = kvEnv();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['SET', key, value]),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Upstash SET HTTP ${res.status}: ${await res.text()}`);
  }
}

export async function setCurrentBioSlug(slug: string): Promise<void> {
  await kvRestSet(CURRENT_BIO_KEY, slug);
}

export async function getCurrentBioSlug(): Promise<string | null> {
  let raw: string | null;
  try {
    raw = await kvRestGet(CURRENT_BIO_KEY);
  } catch (err) {
    console.error('[social/getCurrentBioSlug] REST-Read-Fehler:', err);
    return null;
  }
  if (raw === null) return null;
  const value = raw.trim();
  if (value.length === 0) return null;
  // Edge-Case: Wenn jemand außerhalb der Pipeline mit Outer-Quotes
  // gesetzt hat (z. B. SET key "\"slug\"" via einem Tool, das die
  // Escape-Sequenzen unverändert ablegt), unescapen.
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'string' && parsed.length > 0) return parsed;
    } catch {
      /* fallthrough — value bleibt der getrimmte String */
    }
  }
  return value;
}
