import { Redis } from '@upstash/redis';

// Vercel Integration setzt beim Prefix "KV" diese Env-Vars.
// @upstash/redis erwartet url/token, also explizit übergeben.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Redis-Keys
export const KEYS = {
  zaehler: 'rechenfix:zaehler',
  clicks: 'rechenfix:clicks',
  feedbacks: 'rechenfix:feedbacks',
} as const;

// Startwert des Berechnungszählers, falls er noch nicht in Redis existiert.
export const ZAEHLER_STARTWERT = 11008;
