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
 *
 * Idempotenz: wasPostedToday() vor jedem API-Call → Skip falls true.
 * Force-Override im Cron-Endpoint via ?force=true.
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
