#!/usr/bin/env node
/**
 * scripts/check-contentbloecke-struktur.mjs
 * W19 Struktur-Fingerabdruck: listet Baustein-Folge je migriertem Rechner, damit
 * Gleichförmigkeit (Schablonen-Verdacht) sichtbar wird. Gewichteter Ähnlichkeits-Score
 * (charakterisierende Bausteine betont) nur als GROBER Hinweis, NICHT als Gate.
 *   node scripts/check-contentbloecke-struktur.mjs [slug]
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = join(__dirname, '..', 'lib', 'rechner-config');
const DATEIEN = ['finanzen.ts','gesundheit.ts','alltag.ts','wohnen.ts','auto.ts','mathe.ts','arbeit.ts','kochen.ts','sport.ts'];
const GEWICHT = { text:0.2, infobox:0.4, checkliste:0.4, beispielrechnung:1.5, tabelle:1.5, vergleich:2, statistik:2, diagramm:2 };
const TYPEN = Object.keys(GEWICHT);

function blockQuelle(src, slug) {
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) return null;
  const naechster = src.indexOf("slug: '", slugIdx + 7);
  const grenze = naechster === -1 ? src.length : naechster;
  const cbIdx = src.indexOf('contentBloecke:', slugIdx);
  if (cbIdx === -1 || cbIdx >= grenze) return null;
  const start = src.indexOf('[', cbIdx);
  let t = 0, i = start;
  for (; i < src.length; i++) { if (src[i]==='[') t++; else if (src[i]===']'){ t--; if(t===0){i++;break;} } }
  return src.slice(start, i);
}
const folge = (b) => (b.match(/typ: '([a-z]+)'/g) || []).map(m => m.replace(/typ: '|'/g,''));
const wvec = (seq) => { const c={}; for(const t of TYPEN)c[t]=0; for(const w of seq)if(c[w]!==undefined)c[w]++; return TYPEN.map(t=>c[t]*GEWICHT[t]); };
const cosine = (a,b) => { let d=0,na=0,nb=0; for(let i=0;i<a.length;i++){d+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i];} return d/(Math.sqrt(na)*Math.sqrt(nb)||1); };

const migriert = [];
for (const datei of DATEIEN) {
  let src; try { src = readFileSync(join(CONFIG_DIR, datei), 'utf8'); } catch { continue; }
  for (const m of src.matchAll(/slug: '([^']+)'/g)) {
    const block = blockQuelle(src, m[1]);
    if (block) migriert.push({ slug: m[1], seq: folge(block) });
  }
}
const ziel = process.argv[2];
console.log('=== Struktur-Fingerabdruck (Baustein-Folge je Rechner) ===');
for (const r of migriert) console.log(`${(r.slug + (ziel===r.slug?' *':'')).padEnd(26)} ${r.seq.join('-')}`);
console.log(`\n${migriert.length} migrierte Rechner.`);
const pairs = [];
for (let i=0;i<migriert.length;i++) for (let j=i+1;j<migriert.length;j++) {
  if (ziel && migriert[i].slug!==ziel && migriert[j].slug!==ziel) continue;
  pairs.push([cosine(wvec(migriert[i].seq), wvec(migriert[j].seq)), migriert[i].slug, migriert[j].slug]);
}
pairs.sort((a,b)=>b[0]-a[0]);
console.log('\n=== Grober Aehnlichkeits-Hinweis (kein Gate; >0.85 genauer ansehen) ===');
for (const [s,a,b] of pairs.slice(0, ziel?5:6)) console.log(`${s.toFixed(2)}  ${a} <-> ${b}${s>0.85?'  <- ansehen':''}`);
