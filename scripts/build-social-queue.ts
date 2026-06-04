/**
 * W17A.1 — Seeded-Shuffle-Generator für die Social-Pipeline-Queue.
 *
 * Liest alle 170 Rechner aus lib/rechner-config, filtert die 10
 * EXCLUDED_SLUGS (Phase-0-Top-10) heraus und mischt die verbleibenden
 * 160 deterministisch via Mulberry32-RNG mit fixem Seed (SOCIAL_CONFIG.
 * SHUFFLE_SEED = 17).
 *
 * Ergebnis nach lib/social/queue.json. Die Pipeline läuft die Queue
 * sequentiell durch und markiert jeden Slug nach erfolgreichem Post
 * über KV-Done-Marken (siehe state.ts).
 *
 * Re-Run: `npx tsx scripts/build-social-queue.ts` — bei gleichem
 * SHUFFLE_SEED reproduzierbar identisch. Bei EXCLUDED-Änderungen
 * (z. B. weitere manuelle Posts) erzeugt das eine andere Queue,
 * die Done-Marken bleiben aber gültig (Slug-basiert).
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { rechner } from '../lib/rechner-config';
import { SOCIAL_CONFIG, EXCLUDED_SLUGS } from '../lib/social/config';

const OUTPUT_PATH = './lib/social/queue.json';

/** Mulberry32 — kompakter, gleichverteilter Seeded-RNG. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates mit gegebenem RNG. Nicht-destruktiv. */
function shuffleSeeded<T>(arr: readonly T[], seed: number): T[] {
  const a = [...arr];
  const rng = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const excluded = new Set<string>(EXCLUDED_SLUGS);
const allSlugs = rechner.map((r) => r.slug);
const eligible = allSlugs.filter((s) => !excluded.has(s));

console.log(`Total Rechner: ${allSlugs.length}`);
console.log(`Excluded:      ${excluded.size}`);
console.log(`Eligible:      ${eligible.length}`);

// Sanity-Checks
const missing = Array.from(excluded).filter((s) => !allSlugs.includes(s));
if (missing.length > 0) {
  console.error(`FEHLER: EXCLUDED_SLUGS verweist auf nicht-existente Slugs: ${missing.join(', ')}`);
  process.exit(1);
}
if (eligible.length === 0) {
  console.error('FEHLER: keine Slugs übrig nach Filter — Queue wäre leer.');
  process.exit(1);
}

const queue = shuffleSeeded(eligible, SOCIAL_CONFIG.SHUFFLE_SEED);

const payload = {
  version: 1 as const,
  seed: SOCIAL_CONFIG.SHUFFLE_SEED,
  generatedAt: new Date().toISOString().slice(0, 10), // YYYY-MM-DD, kein Zeit-Stempel zur Drift-Vermeidung
  excludedSlugs: [...EXCLUDED_SLUGS],
  queue,
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n');

console.log(`Queue (${queue.length}) → ${OUTPUT_PATH}`);
console.log(`Erste 5: ${queue.slice(0, 5).join(', ')}`);
console.log(`Letzte 5: ${queue.slice(-5).join(', ')}`);
