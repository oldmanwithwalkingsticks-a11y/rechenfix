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
 * Einzel-Slug-Modus (nur einen Slug neu generieren, übrige bleiben
 * unberührt — z. B. für Format-Test vor Voll-Neulauf):
 *   ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts --slug autokosten-rechner
 * Der bestehende Eintrag wird in diesem Modus bewusst ÜBERSCHRIEBEN
 * (Resume-Skip greift nur im Voll-Lauf), der generierte Eintrag wird
 * zur Sichtprüfung auf stdout ausgegeben.
 *
 * Stichproben-Modus (nur die ersten n offenen Slugs bauen):
 *   ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts --limit 3
 *
 * Voll-Neulauf ALLER Slugs (überschreibt vorhandene — nötig nach Format-/
 * Prompt-Änderung, wenn captions.json schon voll, aber veraltet ist):
 *   ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts --all
 * OHNE --all ist der Voll-Lauf resumable und überspringt vorhandene Slugs.
 *
 * Oder via --env-file (Node 20+):
 *   node --env-file=.env.local --import tsx/esm \
 *        scripts/social-caption-builder.ts
 *
 * Modell: claude-sonnet-4-20250514 (Default analog app/api/explain/route.ts).
 * Override via ENV: ANTHROPIC_MODEL=…
 *
 * Transport (W17A — JSON-Robustheit-Härtung): Das Modell liefert die 6
 * Felder via tool_use (erzwungenes Tool `emit_caption` mit input_schema).
 * Die Antwort ist damit garantiert valides JSON (kein String-Parsing auf
 * Modell-Text mehr). Fällt die API doch auf einen Text-Block zurück, greift
 * ein Netz: Fences strippen + erstes `{` bis letztes `}` extrahieren + parse.
 *
 * Output-Felder (CaptionEntry): captionIg, captionFb, hashtagsIg,
 * hashtagsFb, socialHeadline, socialEyebrow (alle string, required).
 */

import { readFileSync, writeFileSync } from 'fs';
import { rechner } from '../lib/rechner-config';
import queueFile from '../lib/social/queue.json';
import type { CaptionsFile, CaptionEntry } from '../lib/social/schema';

const CAPTIONS_PATH = './lib/social/captions.json';
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const SLEEP_MS_BETWEEN_CALLS = 1_500;
/** W17A-Härtung 2c: 3 Retries = 4 Versuche total pro Slug. */
const RETRY_MAX = 3;
/** Genug Headroom für 2 mehrzeilige Captions (je ~900 Zeichen) + Felder. */
const MAX_TOKENS = 2_048;

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('FEHLER: ANTHROPIC_API_KEY nicht gesetzt.');
  console.error('Tipp: export ANTHROPIC_API_KEY=... oder --env-file=.env.local');
  process.exit(1);
}

const MODEL = process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;

const SYSTEM_PROMPT = `Du schreibst deutsche Social-Media-Captions UND Bild-Texte für rechenfix.de (kostenlose Online-Rechner).

WICHTIG: Antworte AUSSCHLIESSLICH mit einem rohen JSON-Objekt, OHNE Markdown-Code-Block, OHNE einleitenden Text. Format:
{
  "captionIg": "...",
  "captionFb": "...",
  "hashtagsIg": "#tag1 #tag2 …",
  "hashtagsFb": "#tag1 #tag2 #tag3",
  "socialHeadline": "...",
  "socialEyebrow": "..."
}

captionFb und captionIg — Pflicht-Struktur. Genau diese 5 Blöcke, jeder Block durch GENAU EINE komplett leere Zeile vom nächsten getrennt (Doppel-Zeilenumbruch):

1) HOOK: Ein zum Thema passendes Emoji + zugespitzte Frage oder Aussage. Genau 1 Zeile.
2) BULLET-BLOCK: Eine kurze Zwischenüberschrift (1 Zeile, endet mit Doppelpunkt), darunter 2 bis 4 Bullet-Zeilen im Format „🔷 Label: Wert → Ergebnis". Nutze die konkreten Zahlen aus dem Rechner-Beispiel.
3) EINORDNUNG: 1 bis 3 Sätze Kontext mit konkreten Zahlen. Klammer-Zusätze erlaubt.
4) AHA-ZEILE: Beginnt mit „→ " und zeigt eine VOLLSTÄNDIGE Kausalkette in der Reihenfolge Hebel/Unterschied → Bezugsgröße → konkretes Ergebnis. Pflicht-Regeln:
   - Keine Zahl ohne Herkunft. Jede genannte Zahl muss aus den Bullet-Werten oder der Einordnung folgen und arithmetisch dazu passen (kein Widerspruch).
   - Das Verb „sparen" NUR verwenden, wenn der Vergleichsmaßstab im selben Satz steht (gegenüber Anbieter X, bei Wechsel von A zu B, gegenüber Variante Y). „231 € sparen" ohne genannten Vergleich ist verboten.
   - Ist keine saubere Ersparnis-Logik möglich, stattdessen eine Aha-Einordnung mit klarer Bezugsgröße, z. B. „→ das sind X € im Jahr — mehr als die meisten schätzen".
5) CTA: Ein Nutzenversprechen-Satz (z. B. „… siehst du in 30 Sekunden …"). Danach — durch eine komplett leere Zeile getrennt — der Link-Aufruf in einer eigenen Zeile:
   - captionFb: „👉 " gefolgt von der echten Rechner-URL
   - captionIg: „👉 Link in Bio" (Instagram erlaubt keine klickbaren Links im Caption-Text)

Trenner-Schema (exakt einhalten — so sieht die Caption-Struktur Zeile für Zeile aus):
[Hook]
(LEERZEILE)
[Bullet-Überschrift, endet mit Doppelpunkt]
(nur Zeilenumbruch, KEINE Leerzeile)
🔷 [Bullet 1]
(nur Zeilenumbruch)
🔷 [Bullet 2]
(nur Zeilenumbruch)
🔷 [Bullet 3]   (insgesamt 2 bis 4 Bullets)
(LEERZEILE)
[Einordnung, 1 bis 3 Sätze]
(LEERZEILE)
→ [Aha-Zeile, kausal — siehe Block 4]
(LEERZEILE)
[CTA-Nutzensatz mit „… in 30 Sekunden …"]
(LEERZEILE)
👉 [URL bei FB / „Link in Bio" bei IG]

Regel zum Schema: Zwischen den 🔷-Bullets steht nur ein einfacher Zeilenumbruch (keine Leerzeile). Zwischen ALLEN anderen Blöcken steht eine komplett leere Zeile — ausdrücklich auch zwischen CTA-Satz und 👉-Zeile. Die Caption endet auf der 👉-Zeile.

Regeln für beide Captions:
- Du-Form, hilfreich, konkret, kein Marketing-Sprech, keine Floskeln.
- Symbole exakt so verwenden: Bullet „🔷", Pfeil „→", Hand „👉".
- captionIg ist inhaltlich identisch zu captionFb — NUR die CTA-Linkzeile unterscheidet sich (Link in Bio statt URL).
- Zahlen plausibel und aktuell halten; keine erfundenen Gesetzesstände oder Werte, die sich nicht aus Beschreibung/Beispiel ableiten lassen.
- KEINE Hashtags in captionFb/captionIg — die stehen in hashtagsIg/hashtagsFb und werden vom System automatisch unter die Caption gehängt. Niemals in der Caption wiederholen.
- KEINE Backticks, KEIN Markdown in der Ausgabe.
- Zielumfang ca. 600 bis 900 Zeichen pro Caption (ohne Hashtags).

So sieht ein fertiger captionFb aus (Vorbild für Stromkosten — Struktur exakt übernehmen, Inhalt an den jeweiligen Rechner anpassen):
⚡ Stromrechnung 2026: was kostet dich ein Jahr Energie?

Durchschnitts-Haushalt 2 Personen:
🔷 Verbrauch: ~2.500 kWh/Jahr → ~950 €
🔷 Familie (3-4 Personen): ~3.500 kWh/Jahr → ~1.330 €
🔷 5+ Personen: ~5.000+ kWh/Jahr → ~1.900 €

Aktueller Durchschnittspreis: ~38 ct/kWh (Grundversorger oft 42–45 ct, Wechselangebote 28–32 ct).

→ 10 ct/kWh Unterschied bei 3.500 kWh = 350 € Ersparnis pro Jahr durch Anbieterwechsel.

Mit dem Stromrechner siehst du in 30 Sekunden, ob dein Tarif fair ist.
👉 https://www.rechenfix.de/wohnen/stromkosten-rechner

Die →-Zeile im Beispiel ist das Vorbild für die Kausalkette aus Block 4: Hebel (10 ct/kWh Unterschied) → Bezugsgröße (3.500 kWh) → Ergebnis (350 €) → benannter Hebel (Anbieterwechsel). Genau diese Nachvollziehbarkeit ist Pflicht — keine Ergebnis-Zahl, die in der Luft hängt.

captionIg wäre identisch, nur die letzte Zeile lautet „👉 Link in Bio". Die Hashtags gehören NICHT in die Caption.

hashtagsIg (Instagram-Hashtags):
- GENAU 5 bis 7 Stück (Hard-Limit 7), mit # und Leerzeichen getrennt
- Kleinbuchstaben
- Thematisch zum Rechner — KEINE generischen Füller wie #rechnen, #budget,
  #geld, #alltag, #fakten, #wissen, #motivation. #rechenfix als Brand-Tag
  ist ok, aber höchstens einmal und nur wenn Platz übrig

hashtagsFb (Facebook-Hashtags):
- GENAU 2 bis 3 Stück (Hard-Limit 3), mit # und Leerzeichen getrennt
- Kleinbuchstaben
- Die thematisch DREI wichtigsten Tags — FB-Algorithmus mag wenig, präzise
  Tags besser als viele
- Keine Generika; #rechenfix nur wenn die anderen 2 sehr eng am Thema sind

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

/**
 * W17A-Härtung 2b: erzwungenes Tool. Das Modell liefert die 6 Felder als
 * `tool_use`-Input (garantiert valides JSON) statt als JSON-im-Text-String.
 * Damit ist die String-Parsing-Fehlerklasse (unescaptes `"`, Fences, Prosa)
 * an der Wurzel eliminiert. System-Prompt-Inhalt (Format v1+v2) bleibt
 * unverändert — nur der Ausgabe-Transport wechselt.
 */
const CAPTION_TOOL = {
  name: 'emit_caption',
  description:
    'Gibt die fertige Social-Media-Caption-Entry für einen rechenfix-Rechner ' +
    'mit allen 6 Feldern zurück. Format- und Inhaltsregeln stehen im System-Prompt.',
  input_schema: {
    type: 'object',
    properties: {
      captionIg: { type: 'string', description: 'Instagram-Caption (5-Block-Format, endet mit „👉 Link in Bio").' },
      captionFb: { type: 'string', description: 'Facebook-Caption (5-Block-Format, endet mit „👉 " + echter URL).' },
      hashtagsIg: { type: 'string', description: '5–7 IG-Hashtags, Leerzeichen-getrennt, Kleinbuchstaben.' },
      hashtagsFb: { type: 'string', description: '2–3 FB-Hashtags, Leerzeichen-getrennt, Kleinbuchstaben.' },
      socialHeadline: { type: 'string', description: 'Bild-Headline, max 22 Zeichen, eine Zahl oder Kernaussage.' },
      socialEyebrow: { type: 'string', description: 'Eyebrow, 1–2 kontextpassende Wörter.' },
    },
    required: [
      'captionIg',
      'captionFb',
      'hashtagsIg',
      'hashtagsFb',
      'socialHeadline',
      'socialEyebrow',
    ],
  },
} as const;

interface AnthropicContentBlock {
  type: string;
  text?: string;
  name?: string;
  input?: Record<string, unknown>;
}
interface AnthropicResponse {
  content?: AnthropicContentBlock[];
  error?: { message?: string; type?: string };
}

/** Ergebnis eines API-Calls: entweder Tool-Input-Objekt (Normalfall) oder Roh-Text (Fallback). */
interface CallResult {
  toolInput?: Record<string, unknown>;
  text?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callAnthropic(userPrompt: string): Promise<CallResult> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      tools: [CAPTION_TOOL],
      tool_choice: { type: 'tool', name: CAPTION_TOOL.name },
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });
  const json = (await res.json()) as AnthropicResponse;
  if (!res.ok || json.error) {
    throw new Error(`Anthropic ${res.status}: ${json.error?.message ?? '(no message)'}`);
  }
  // Normalfall (2b): tool_use-Block mit input-Objekt.
  const toolBlock = json.content?.find(
    (c) => c.type === 'tool_use' && c.name === CAPTION_TOOL.name,
  );
  if (toolBlock?.input && typeof toolBlock.input === 'object') {
    return { toolInput: toolBlock.input };
  }
  // Netz (2a): API lieferte doch einen Text-Block → an parseTextToObject weiterreichen.
  const text = json.content?.find((c) => c.type === 'text')?.text;
  if (text && text.trim()) {
    return { text };
  }
  throw new Error('Anthropic-Response ohne tool_use- oder text-Content');
}

/** Maximale tolerierte Länge der Bild-Headline (Ziel 22, Soft-Limit für Retry). */
const HEADLINE_HARD_LIMIT = 40;
/** Maximale tolerierte Länge des Eyebrow (Soft-Limit für Retry). */
const EYEBROW_HARD_LIMIT = 30;
/** Maximale Hashtag-Anzahl pro Plattform (W17A.2.y). */
const HASHTAG_LIMIT_IG = 7;
const HASHTAG_LIMIT_FB = 3;

/** Zählt nur `#…`-Tokens, getrennt durch Leerzeichen — robust gegen leere Tokens. */
function countHashtags(line: string): number {
  return line
    .split(/\s+/)
    .filter((t) => t.startsWith('#') && t.length > 1).length;
}

/**
 * W17A-Härtung 2a (Netz für den Nicht-Tool-Pfad): Fences strippen, den
 * JSON-Block via erstem `{` bis letztem `}` extrahieren, dann parsen.
 * Nur relevant, falls die API doch einen Text-Block statt tool_use liefert.
 */
function parseTextToObject(raw: string): Record<string, unknown> {
  let s = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  const first = s.indexOf('{');
  const last = s.lastIndexOf('}');
  if (first >= 0 && last > first) {
    s = s.slice(first, last + 1);
  }
  try {
    return JSON.parse(s) as Record<string, unknown>;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON-Parse fehlgeschlagen (${msg}) — Roh gekürzt: ${s.slice(0, 200)}`);
  }
}

/**
 * Validiert ein bereits geparstes Objekt (aus tool_use-Input oder aus
 * parseTextToObject) gegen die 6 Pflichtfelder + Längen-/Hashtag-Limits.
 */
function validateCaptionEntry(input: Record<string, unknown>): CaptionEntry {
  const obj = input as Partial<CaptionEntry>;
  const missing: string[] = [];
  for (const key of [
    'captionIg',
    'captionFb',
    'hashtagsIg',
    'hashtagsFb',
    'socialHeadline',
    'socialEyebrow',
  ] as const) {
    if (!obj[key] || typeof obj[key] !== 'string' || obj[key]!.trim() === '') {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Antwort fehlt/leer: ${missing.join(', ')} — ${JSON.stringify(obj).slice(0, 200)}`,
    );
  }
  const headline = obj.socialHeadline!.trim();
  const eyebrow = obj.socialEyebrow!.trim();
  const hashtagsIg = obj.hashtagsIg!.trim();
  const hashtagsFb = obj.hashtagsFb!.trim();

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
  // Hashtag-Anzahl-Limits (W17A.2.y) — Retry bei Überschreitung
  const igCount = countHashtags(hashtagsIg);
  const fbCount = countHashtags(hashtagsFb);
  if (igCount === 0 || igCount > HASHTAG_LIMIT_IG) {
    throw new Error(
      `hashtagsIg-Anzahl ${igCount} außerhalb 1..${HASHTAG_LIMIT_IG}: "${hashtagsIg}"`,
    );
  }
  if (fbCount === 0 || fbCount > HASHTAG_LIMIT_FB) {
    throw new Error(
      `hashtagsFb-Anzahl ${fbCount} außerhalb 1..${HASHTAG_LIMIT_FB}: "${hashtagsFb}"`,
    );
  }

  return {
    captionIg: obj.captionIg!.trim(),
    captionFb: obj.captionFb!.trim(),
    hashtagsIg,
    hashtagsFb,
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
      const result = await callAnthropic(userPrompt);
      const obj = result.toolInput ?? parseTextToObject(result.text ?? '');
      return validateCaptionEntry(obj);
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
      console.warn(`  ⚠ ${slug} attempt ${attempt + 1}: ${lastErr.message}`);
      if (attempt < RETRY_MAX) await sleep(3_000);
    }
  }
  throw lastErr ?? new Error('unbekannter Fehler');
}

/**
 * Liest `--slug <wert>` bzw. `--slug=<wert>` aus den CLI-Argumenten.
 * Returnt null, wenn kein --slug übergeben wurde (= Voll-Lauf-Modus).
 */
function getSlugArg(): string | null {
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--slug') return argv[i + 1]?.trim() || null;
    if (a.startsWith('--slug=')) return a.slice('--slug='.length).trim() || null;
  }
  return null;
}

/**
 * `--all` umgeht den Resume-Skip: ALLE Queue-Slugs werden (neu) gebaut und
 * vorhandene Einträge überschrieben. Ohne Flag baut der Voll-Lauf nur Slugs,
 * die noch nicht in captions.json stehen (resumable). Nötig z. B. nach einer
 * Format-/Prompt-Änderung, wenn die Datei schon voll, aber veraltet ist.
 */
function hasAllFlag(): boolean {
  return process.argv.slice(2).includes('--all');
}

/** `--from-config`: Slug-Pool aus rechner-config statt queue.json ziehen. */
function hasFromConfigFlag(): boolean {
  return process.argv.slice(2).includes('--from-config');
}

/**
 * Liest `--limit <n>` bzw. `--limit=<n>` (Stichprobenlauf im Voll-Modus).
 * Returnt null, wenn nicht gesetzt oder ungültig (= kein Limit).
 */
function getLimitArg(): number | null {
  const argv = process.argv.slice(2);
  let raw: string | null = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit') raw = argv[i + 1]?.trim() ?? null;
    else if (a.startsWith('--limit=')) raw = a.slice('--limit='.length).trim();
  }
  if (raw === null) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

// ============================================================
// Main (in async-IIFE wegen TS-module-Target ohne top-level-await)
// ============================================================
async function main(): Promise<void> {
  const captions: CaptionsFile = JSON.parse(readFileSync(CAPTIONS_PATH, 'utf-8'));
  if (!captions.captions) captions.captions = {};
  if (captions.version !== 1) captions.version = 1;

  const fromConfig = hasFromConfigFlag();
  // Slug-Pool: --from-config → alle rechner-config-Slugs (für neue Rechner,
  // die noch nicht in der Queue sind); sonst wie bisher queue.json.
  const queue: string[] = fromConfig
    ? rechner.map((r) => r.slug)
    : queueFile.queue;
  if (fromConfig) {
    console.log(`Slug-Pool: rechner-config (${queue.length} Slugs, --from-config)`);
  }

  // ---- Einzel-Slug-Modus (TEIL 2 / Format-Test) -------------
  const onlySlug = getSlugArg();
  if (onlySlug) {
    if (!queue.includes(onlySlug)) {
      console.error(`FEHLER: --slug "${onlySlug}" nicht in lib/social/queue.json.`);
      process.exit(1);
    }
    const existed = !!captions.captions[onlySlug];
    console.log(`Einzel-Slug-Modus: ${onlySlug}`);
    console.log(
      `Bestehender Eintrag: ${existed ? 'JA → wird überschrieben' : 'nein → wird neu erzeugt'}`,
    );
    console.log(`Übrige ${queue.length - 1} Slugs bleiben unverändert.`);
    console.log(`Model: ${MODEL}\n`);

    process.stdout.write(`  → ${onlySlug.padEnd(35)} `);
    try {
      const entry = await buildCaptionForSlug(onlySlug);
      captions.captions[onlySlug] = entry;
      writeFileSync(CAPTIONS_PATH, JSON.stringify(captions, null, 2) + '\n');
      process.stdout.write(`✓\n`);
      console.log('\n--- Generierter Eintrag (zur Sichtprüfung) ---');
      console.log(JSON.stringify(entry, null, 2));
    } catch (err) {
      process.stdout.write(`✗ ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
    return;
  }

  // ---- Voll-Lauf-Modus --------------------------------------
  // --all: alle Queue-Slugs (neu) bauen, vorhandene überschreiben.
  // ohne --all: resumable, nur fehlende Slugs bauen.
  const all = hasAllFlag();
  const base = all ? [...queue] : queue.filter((slug) => !captions.captions[slug]);
  const limit = getLimitArg();
  const todo = limit ? base.slice(0, limit) : base;

  console.log(`Total Slugs:  ${queue.length}`);
  console.log(`Existing:     ${queue.length - queue.filter((s) => !captions.captions[s]).length}`);
  console.log(`Mode:         ${all ? 'ALL (überschreibt vorhandene)' : 'resumable (nur fehlende)'}`);
  if (limit) console.log(`Limit:        ${limit} (Stichprobe)`);
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
