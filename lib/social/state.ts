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

import { redis, redisRaw } from '@/lib/redis';
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
 * als großen Top-Button. Dadurch landet ein „Link in Bio"-Klick gezielt
 * beim Tages-Thema, ohne dass der IG-Bio-Link je geändert werden muss.
 *
 * Beide Funktionen nutzen `redisRaw` (Auto-Deserialization aus). Damit:
 * - `setCurrentBioSlug(slug)` schreibt den rohen String, ohne JSON-Wrap
 * - `getCurrentBioSlug()` liest den rohen String, auch wenn er per CLI
 *   ohne Quotes gesetzt wurde (verifiziert durch das Karsten-Debug am
 *   06.06.2026, das null statt Slug zurückbekam)
 */
const CURRENT_BIO_KEY = 'social:current-bio-slug';

export async function setCurrentBioSlug(slug: string): Promise<void> {
  await redisRaw.set(CURRENT_BIO_KEY, slug);
}

export async function getCurrentBioSlug(): Promise<string | null> {
  let raw: unknown;
  try {
    raw = await redisRaw.get(CURRENT_BIO_KEY);
  } catch (err) {
    console.error('[social/getCurrentBioSlug] Redis-Read-Fehler:', err);
    return null;
  }
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== 'string') return null;
  const value = raw.trim();
  if (value.length === 0) return null;
  // Edge-Case: Wert wurde von außen mit Outer-Quotes gesetzt (z. B. CLI
  // SET key "slug" — manche Clients setzen die Quotes mit ein). Unescape.
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
