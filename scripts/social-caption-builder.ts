/**
 * W17A.1 + W17A.2 — Caption-Builder (lokal, Anthropic-API).
 *
 * Generiert pro Slug aus lib/social/queue.json eine Caption-Entry mit
 * 5 Feldern (captionIg + captionFb + hashtags + socialHeadline +
 * socialEyebrow) und schreibt sie nach lib/social/captions.json.
 *
 * W17A.2 (06.06.2026): socialHeadline + socialEyebrow ergänzt. Vorher
 * hat der Image-Builder beide Felder aus rechner.beispiel geparst —
 * Trefferquote nur ~50 % (leere Highlights, abgeschnittener Text,
 * themenfremde Slug-Hash-Eyebrows). Lehre L-W17A.2.1.
 *
 * Resumable: bereits gefüllte Slugs werden übersprungen — bei
 * Abbruch einfach erneut starten. Schreibt nach jedem Slug die
 * captions.json (write-through), damit ein Crash maximal die
 * gerade laufende Caption verliert.
 *
 * Aufruf (mit Node 20+):
 *   ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts
 *
 * Oder via --env-file (Node 20+):
 *   node --env-file=.env.local --import tsx/esm \
 *        scripts/social-caption-builder.ts
 *
 * Modell: claude-sonnet-4-20250514 (Default analog app/api/explain/route.ts).
 * Override via ENV: ANTHROPIC_MODEL=…
 *
 * Output-Format (JSON-only Antwort):
 *   { captionIg: "...", captionFb: "...", hashtags: "#a #b #c …" }
 */

import { readFileSync, writeFileSync } from 'fs';
import { rechner } from '../lib/rechner-config';
import queueFile from '../lib/social/queue.json';
import type { CaptionsFile, CaptionEntry } from '../lib/social/schema';

const CAPTIONS_PATH = './lib/social/captions.json';
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const SLEEP_MS_BETWEEN_CALLS = 1_500;
const RETRY_MAX = 1;

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('FEHLER: ANTHROPIC_API_KEY nicht gesetzt.');
  console.error('Tipp: export ANTHROPIC_API_KEY=... oder --env-file=.env.local');
  process.exit(1);
}

const MODEL = process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;

const SYSTEM_PROMPT = `Du schreibst kurze deutsche Social-Media-Captions UND Bild-Texte für rechenfix.de.

WICHTIG: Antworte AUSSCHLIESSLICH mit einem rohen JSON-Objekt, OHNE Markdown-Code-Block, OHNE einleitenden Text. Format:
{
  "captionIg": "...",
  "captionFb": "...",
  "hashtags": "#tag1 #tag2 #tag3 …",
  "socialHeadline": "...",
  "socialEyebrow": "..."
}

Captions:
- Du-Form, hilfreich, konkret, kein Marketing-Sprech, keine Floskeln
- Hook (1 Zeile, Frage oder Fakt), dann 2–3 Zeilen konkreter Nutzen, dann Call-to-Action
- captionIg endet mit „👉 Link in Bio" (Instagram erlaubt keine klickbaren Links im Caption-Text)
- captionFb endet mit der echten Rechner-URL (FB erlaubt Links)
- Max 600 Zeichen pro Caption (ohne Hashtags)
- Keine Emojis im Übermaß: max 2 in der Caption (Hook oder CTA)

Hashtags:
- 9–15 Stück, mit # und Leerzeichen getrennt
- Mix aus rechner-spezifisch + breit (z. B. #rechnen #rechenfix)
- Kleinbuchstaben

socialHeadline (Bild-Highlight, wird groß über die ganze Bildbreite gerendert):
- MAX 22 Zeichen inkl. Einheit, Symbol, Leerzeichen
- EINE konkrete Zahl ODER eine knappe Kernaussage — KEIN Satz, KEIN Punkt am Ende
- Beispiele: "1.815 € / Jahr", "BMI 24,7", "= 119 €", "14 Tage", "2,5 Std", "17,34 €/Std", "= 1.330 €/Jahr"
- Wenn dem Rechner keine sinnvolle Zahl entlockbar ist: knappes Konzept-Schlagwort wie "Schnell vergleichbar" oder "Sofort sichtbar" (auch max 22 Zeichen)

socialEyebrow (kleine Überzeile, wird letter-spaced in Versalien gerendert):
- 1 ODER 2 Wörter, kurz und prägnant
- Inhaltlich zum Rechner-Thema passend (NICHT generisch)
- Beispiele: "Faustregel" (Steuer/Recht), "Selbst-Check" (Gesundheit), "Wusstest du?" (Überraschungs-Fakt), "Schnell gerechnet" (Alltagsrechner), "Pendler-Realität" (Auto/Sprit), "Rechenbeispiel" (Mathe), "Klassiker" (bekannte Formel), "Mal nachgerechnet" (überraschendes Ergebnis), "Jahres-Bilanz" (laufende Kosten)
- Wähle DAS Stichwort, das thematisch am besten zum konkreten Rechner passt — nicht eines aus der Liste, falls keines passt`;

interface AnthropicResponse {
  content?: Array<{ type: string; text?: string }>;
  error?: { message?: string; type?: string };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callAnthropic(userPrompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });
  const json = (await res.json()) as AnthropicResponse;
  if (!res.ok || json.error) {
    throw new Error(`Anthropic ${res.status}: ${json.error?.message ?? '(no message)'}`);
  }
  const text = json.content?.find((c) => c.type === 'text')?.text ?? '';
  if (!text) {
    throw new Error('Anthropic-Response ohne text-Content');
  }
  return text;
}

/** Maximale tolerierte Länge der Bild-Headline (Ziel 22, Soft-Limit für Retry). */
const HEADLINE_HARD_LIMIT = 40;
/** Maximale tolerierte Länge des Eyebrow (Soft-Limit für Retry). */
const EYEBROW_HARD_LIMIT = 30;

function parseCaptionJson(raw: string): CaptionEntry {
  // Strip eventuelle Markdown-Code-Block-Wrapper, obwohl der System-Prompt
  // sie verbietet — sicher ist sicher.
  const stripped = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  const obj = JSON.parse(stripped) as Partial<CaptionEntry>;
  const missing: string[] = [];
  for (const key of ['captionIg', 'captionFb', 'hashtags', 'socialHeadline', 'socialEyebrow'] as const) {
    if (!obj[key] || typeof obj[key] !== 'string' || obj[key]!.trim() === '') {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Antwort fehlt/leer: ${missing.join(', ')} — ${stripped.slice(0, 200)}`);
  }
  // Längen-Validierung mit Soft-Limit → Retry kickt, wenn dramatisch über Ziel.
  // Die exakte 22/22 wird vom Image-Builder über Shrink-Cascade weichgepuffert.
  const headline = obj.socialHeadline!.trim();
  const eyebrow = obj.socialEyebrow!.trim();
  if (headline.length > HEADLINE_HARD_LIMIT) {
    throw new Error(
      `socialHeadline zu lang (${headline.length} > ${HEADLINE_HARD_LIMIT}): "${headline}"`,
    );
  }
  if (eyebrow.length > EYEBROW_HARD_LIMIT) {
    throw new Error(
      `socialEyebrow zu lang (${eyebrow.length} > ${EYEBROW_HARD_LIMIT}): "${eyebrow}"`,
    );
  }
  return {
    captionIg: obj.captionIg!.trim(),
    captionFb: obj.captionFb!.trim(),
    hashtags: obj.hashtags!.trim(),
    socialHeadline: headline,
    socialEyebrow: eyebrow,
  };
}

async function buildCaptionForSlug(slug: string): Promise<CaptionEntry> {
  const r = rechner.find((x) => x.slug === slug);
  if (!r) throw new Error(`Slug ${slug} nicht in rechner-config gefunden`);

  const url = `https://www.rechenfix.de/${r.kategorieSlug}/${r.slug}`;
  const userPrompt = [
    `Rechner: ${r.titel}`,
    `Kategorie: ${r.kategorie}`,
    `URL: ${url}`,
    `Beschreibung: ${r.beschreibung}`,
    `Beispiel: ${r.beispiel}`,
  ].join('\n');

  let lastErr: Error | null = null;
  for (let attempt = 0; attempt <= RETRY_MAX; attempt++) {
    try {
      const raw = await callAnthropic(userPrompt);
      return parseCaptionJson(raw);
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
      console.warn(`  ⚠ ${slug} attempt ${attempt + 1}: ${lastErr.message}`);
      if (attempt < RETRY_MAX) await sleep(3_000);
    }
  }
  throw lastErr ?? new Error('unbekannter Fehler');
}

// ============================================================
// Main (in async-IIFE wegen TS-module-Target ohne top-level-await)
// ============================================================
async function main(): Promise<void> {
  const captions: CaptionsFile = JSON.parse(readFileSync(CAPTIONS_PATH, 'utf-8'));
  if (!captions.captions) captions.captions = {};
  if (captions.version !== 1) captions.version = 1;

  const queue: string[] = queueFile.queue;
  const todo = queue.filter((slug) => !captions.captions[slug]);

  console.log(`Total Slugs:  ${queue.length}`);
  console.log(`Existing:     ${queue.length - todo.length}`);
  console.log(`To build:     ${todo.length}`);
  console.log(`Model:        ${MODEL}`);
  console.log(`Sleep ms:     ${SLEEP_MS_BETWEEN_CALLS}\n`);

  let ok = 0;
  let fail = 0;
  const failedSlugs: string[] = [];

  for (let i = 0; i < todo.length; i++) {
    const slug = todo[i];
    process.stdout.write(`  → ${slug.padEnd(35)} `);
    try {
      const entry = await buildCaptionForSlug(slug);
      captions.captions[slug] = entry;
      writeFileSync(CAPTIONS_PATH, JSON.stringify(captions, null, 2) + '\n');
      process.stdout.write(`✓\n`);
      ok++;
    } catch (err) {
      process.stdout.write(`✗ ${err instanceof Error ? err.message : String(err)}\n`);
      fail++;
      failedSlugs.push(slug);
    }
    if (i < todo.length - 1) {
      await sleep(SLEEP_MS_BETWEEN_CALLS);
    }
  }

  console.log(`\nBuilt:  ${ok}`);
  console.log(`Failed: ${fail}`);
  if (failedSlugs.length > 0) {
    console.log(`Failed-Slugs: ${failedSlugs.join(', ')}`);
    console.log('Re-Run startet automatisch nur bei den Failed-Slugs (resumable).');
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
