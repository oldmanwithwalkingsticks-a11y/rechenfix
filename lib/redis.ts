import { Redis } from '@upstash/redis';

// Vercel Integration setzt beim Prefix "KV" diese Env-Vars.
// @upstash/redis erwartet url/token, also explizit übergeben.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

/**
 * Zweite Instance OHNE Auto-JSON-Deserialization.
 *
 * Hintergrund: `@upstash/redis` versucht beim `get()` automatisch
 * `JSON.parse()` auf den Wert anzuwenden. Bei nicht-JSON-Strings
 * (z. B. `autokosten-rechner` per Upstash-CLI ohne Quotes gesetzt)
 * scheitert das und die SDK liefert `null` — auch wenn der Wert
 * in Redis existiert.
 *
 * Diese parallele Instance umgeht das Problem: sie liefert IMMER
 * den rohen String und schreibt ebenfalls roh. Für Bio-Slug (W17A.3)
 * und vergleichbare Single-String-Werte; nicht für JSON-Payloads
 * wie Counter/Click-Logs.
 */
export const redisRaw = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
  automaticDeserialization: false,
});

// Redis-Keys
export const KEYS = {
  zaehler: 'rechenfix:zaehler',
  clicks: 'rechenfix:clicks',
  feedbacks: 'rechenfix:feedbacks',
} as const;

// Startwert des Berechnungszählers, falls er noch nicht in Redis existiert.
export const ZAEHLER_STARTWERT = 11008;
