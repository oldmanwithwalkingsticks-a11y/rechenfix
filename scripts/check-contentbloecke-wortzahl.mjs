#!/usr/bin/env node
/**
 * scripts/check-contentbloecke-wortzahl.mjs
 * W19 Self-Check: zählt sichtbare Wörter aller contentBloecke eines Rechners,
 * warnt bei Unterschreitung der Schwelle (Default 1400, für W19 --min 1500 nutzen).
 * Standalone (umgeht kaputten Windows-Next-Build).
 *   node scripts/check-contentbloecke-wortzahl.mjs <slug> [--min N] | --all
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = join(__dirname, '..', 'lib', 'rechner-config');
const KATEGORIE_DATEIEN = [
  'finanzen.ts', 'gesundheit.ts', 'alltag.ts', 'wohnen.ts',
  'auto.ts', 'mathe.ts', 'arbeit.ts', 'kochen.ts', 'sport.ts',
];

const args = process.argv.slice(2);
const minIdx = args.indexOf('--min');
const MIN = minIdx >= 0 ? parseInt(args[minIdx + 1], 10) : 1400;
const alle = args.includes('--all');
const slugArg = args.find((a) => !a.startsWith('--') && a !== String(MIN));

function wortZaehlen(text) {
  if (!text) return 0;
  const ohneTags = String(text).replace(/<[^>]*>/g, ' ');
  return ohneTags.trim().split(/\s+/).filter((t) => /[A-Za-zÀ-ÿ0-9]/.test(t)).length;
}

function findeBlockQuelle(slug) {
  for (const datei of KATEGORIE_DATEIEN) {
    let inhalt;
    try { inhalt = readFileSync(join(CONFIG_DIR, datei), 'utf8'); } catch { continue; }
    const slugIdx = inhalt.indexOf(`slug: '${slug}'`);
    if (slugIdx === -1) continue;
    const cbIdx = inhalt.indexOf('contentBloecke:', slugIdx);
    if (cbIdx === -1) return { datei, quelle: null };
    const start = inhalt.indexOf('[', cbIdx);
    let tiefe = 0, i = start;
    for (; i < inhalt.length; i++) {
      if (inhalt[i] === '[') tiefe++;
      else if (inhalt[i] === ']') { tiefe--; if (tiefe === 0) { i++; break; } }
    }
    return { datei, quelle: inhalt.slice(start, i) };
  }
  return null;
}

function messeBlock(quelle) {
  if (!quelle) return null;
  const literale = quelle.match(/`[^`]*`|'(?:\\'|[^'])*'/g) || [];
  let summe = 0;
  for (const lit of literale) {
    const inner = lit.slice(1, -1);
    if (/^[a-z]{3,14}$/.test(inner)) continue;
    summe += wortZaehlen(inner);
  }
  return summe;
}

function pruefe(slug) {
  const res = findeBlockQuelle(slug);
  if (!res) { console.log(`? ${slug}: nicht gefunden`); return; }
  if (!res.quelle) { console.log(`- ${slug} (${res.datei}): keine contentBloecke (Fallback)`); return; }
  const w = messeBlock(res.quelle);
  const flag = w >= MIN ? 'OK' : 'UNTER SCHWELLE';
  console.log(`[${flag}] ${slug} (${res.datei}): ~${w} Woerter (Ziel >= ${MIN})`);
  return w;
}

function alleSlugs() {
  const slugs = [];
  for (const datei of KATEGORIE_DATEIEN) {
    let inhalt;
    try { inhalt = readFileSync(join(CONFIG_DIR, datei), 'utf8'); } catch { continue; }
    for (const m of inhalt.matchAll(/slug: '([^']+)'/g)) slugs.push(m[1]);
  }
  return slugs;
}

if (alle) {
  let unter = 0;
  for (const s of alleSlugs()) { const w = pruefe(s); if (typeof w === 'number' && w < MIN) unter++; }
  console.log(`\n— ${unter} Rechner mit contentBloecke unter ${MIN} W —`);
} else if (slugArg) {
  pruefe(slugArg);
} else {
  console.log('Aufruf: node scripts/check-contentbloecke-wortzahl.mjs <slug> [--min N] | --all');
  process.exit(1);
}
