/**
 * W17A.1 — Seeded-Shuffle-Generator für die Social-Pipeline-Queue.
 *
 * W18.4d (Weg B): Die Queue enthält jetzt ALLE 205 Rechner (nicht mehr nur
 * die 160 IG/FB-Slugs). Die 10 EXCLUDED (Top-10) werden von IG/FB übersprungen,
 * aber von TikTok gepostet — die Auswahl passiert in publishToOne via
 * platformsForSlug (state.ts), NICHT mehr durch Herausfiltern aus der Queue.
 *
 * **Append-stabil:** Die bestehende Queue-Reihenfolge bleibt UNVERÄNDERT
 * (die live laufende IG/FB-Rotation darf nicht umsortiert werden). Die 45
 * fehlenden Slugs (35 neue Rechner + 10 Top-10) werden deterministisch
 * geshuffelt (Seed-Offset) HINTEN angehängt. Kein Voll-Reshuffle.
 *
 * Ergebnis nach lib/social/queue.json. Die Pipeline läuft die Queue
 * sequentiell durch und markiert jeden Slug nach erfolgreichem Post
 * über KV-Done-Marken (siehe state.ts).
 *
 * Re-Run: `npx tsx scripts/build-social-queue.ts` — die bestehenden Einträge
 * bleiben stabil, nur noch fehlende config-Slugs werden hinten ergänzt.
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
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
const allSet = new Set(allSlugs);

// Bestehende Queue lesen (falls vorhanden) — Reihenfolge beibehalten:
let existingQueue: string[] = [];
if (existsSync(OUTPUT_PATH)) {
  try {
    existingQueue = JSON.parse(readFileSync(OUTPUT_PATH, 'utf8')).queue ?? [];
  } catch {
    existingQueue = [];
  }
}
const existingSet = new Set(existingQueue);

// Nur noch existierende Slugs behalten (falls ein alter Queue-Slug aus der
// config entfernt wurde) — Reihenfolge der Bestehenden UNVERÄNDERT:
const keptExisting = existingQueue.filter((s) => allSet.has(s));

// Neue Slugs = alle config-Slugs, die noch nicht in der Queue sind
// (die 45: 35 neue Rechner + 10 Top-10). Deterministisch shufflen mit
// Seed-Offset, damit sie nicht in config-Reihenfolge klumpen.
const newSlugs = allSlugs.filter((s) => !existingSet.has(s));
const shuffledNew = shuffleSeeded(newSlugs, SOCIAL_CONFIG.SHUFFLE_SEED + 1);

const queue = [...keptExisting, ...shuffledNew];

console.log(`Total Rechner: ${allSlugs.length}`); // 205
console.log(`Bestehend:     ${keptExisting.length}`); // 160
console.log(`Neu angehängt: ${shuffledNew.length}`); // 45
console.log(`Queue gesamt:  ${queue.length}`); // 205

// Sanity: EXCLUDED verweist auf existente Slugs (harmlos, bleibt).
const missing = Array.from(excluded).filter((s) => !allSet.has(s));
if (missing.length > 0) {
  console.error(`FEHLER: EXCLUDED_SLUGS verweist auf nicht-existente Slugs: ${missing.join(', ')}`);
  process.exit(1);
}

// Vollständigkeit: jeder config-Slug genau einmal in der Queue?
const qSet = new Set(queue);
if (qSet.size !== allSlugs.length) {
  console.error(`FEHLER: Queue hat ${qSet.size} unique, erwartet ${allSlugs.length}`);
  process.exit(1);
}
const missingFromQueue = allSlugs.filter((s) => !qSet.has(s));
if (missingFromQueue.length) {
  console.error(`FEHLER: Slugs fehlen in Queue: ${missingFromQueue.join(', ')}`);
  process.exit(1);
}

const payload = {
  version: 1 as const,
  seed: SOCIAL_CONFIG.SHUFFLE_SEED,
  generatedAt: new Date().toISOString().slice(0, 10), // YYYY-MM-DD, kein Zeit-Stempel zur Drift-Vermeidung
  // queue enthält jetzt ALLE 205; excludedSlugs = die auf IG/FB
  // übersprungenen (Weg B, via platformsForSlug in state.ts).
  excludedSlugs: [...EXCLUDED_SLUGS],
  queue,
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n');

console.log(`Queue (${queue.length}) → ${OUTPUT_PATH}`);
console.log(`Erste 5: ${queue.slice(0, 5).join(', ')}`);
console.log(`Letzte 5: ${queue.slice(-5).join(', ')}`);
