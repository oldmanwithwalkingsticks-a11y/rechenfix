#!/usr/bin/env node
// Slug-Drift-Scan (Prompt 132.5). Liest SSOT aus lib/rechner-config/*.ts,
// greppt Codebase nach /<kategorie>/<slug>-Pfaden und meldet Drifts.
// Einmal-Script, nicht in CI integriert (für Prompt 132.5 gebaut).

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = 'G:/Rechenfix';
const CONFIG_DIR = join(ROOT, 'lib/rechner-config');
const KATEGORIEN = ['alltag','arbeit','auto','finanzen','gesundheit','kochen','mathe','sport','wohnen'];

const SSOT = {};
for (const k of KATEGORIEN) {
  const f = readFileSync(join(CONFIG_DIR, `${k}.ts`), 'utf-8');
  const slugs = new Set();
  for (const m of f.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)) {
    slugs.add(m[1]);
  }
  SSOT[k] = slugs;
}

// Zusätzlich: statische Routes unter app/<kategorie>/<slug>/page.tsx akzeptieren
// (Landing-Page-Varianten wie /finanzen/2000-euro-brutto-netto, die nicht in
// SSOT-Configs stehen, aber legitime statische Seiten sind).
const STATIC_ROUTES = {};
for (const k of KATEGORIEN) {
  const katDir = join(ROOT, 'app', k);
  const slugs = new Set();
  try {
    for (const entry of readdirSync(katDir)) {
      const p = join(katDir, entry);
      if (statSync(p).isDirectory()) slugs.add(entry);
    }
  } catch { /* Verzeichnis fehlt (z.B. app/sport existiert nicht) */ }
  STATIC_ROUTES[k] = slugs;
}

const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', 'public']);
const EXCLUDE_FILES = new Set([
  'G:/Rechenfix/next.config.mjs',
  'G:/Rechenfix/next.config.ts',
  'G:/Rechenfix/scripts/slug-drift-scan.mjs',
]);
const EXCLUDE_PATH_PREFIXES = [
  'G:/Rechenfix/lib/rechner-config',
  'G:/Rechenfix/.claude/skills',
  'G:/Rechenfix/docs/audit-arbeitspapiere',
  'G:/Rechenfix/reports',              // historische Audit-Reports (generiert)
];
const EXCLUDE_FILE_REGEX = [
  /docs\/.*-2026-\d{2}\.md$/,          // dated audit snapshots (a11y-baseline, jahresparameter)
];

function walk(dir) {
  const out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const entry of entries) {
    const p = join(dir, entry).split('\\').join('/');
    if (EXCLUDE_DIRS.has(entry)) continue;
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) {
      out.push(...walk(p));
    } else {
      const ext = extname(entry);
      if (!['.ts', '.tsx', '.md', '.mdx', '.json'].includes(ext)) continue;
      if (EXCLUDE_FILES.has(p)) continue;
      if (EXCLUDE_PATH_PREFIXES.some(pre => p.startsWith(pre))) continue;
      if (EXCLUDE_FILE_REGEX.some(re => re.test(p))) continue;
      out.push(p);
    }
  }
  return out;
}

const FILES = walk(ROOT);

const PATTERN = /\/(alltag|arbeit|auto|finanzen|gesundheit|kochen|mathe|sport|wohnen)\/([a-z0-9-]+)/g;
const drifts = [];
for (const f of FILES) {
  const content = readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const pat = new RegExp(PATTERN.source, 'g');
    let m;
    while ((m = pat.exec(line)) !== null) {
      const [, kat, slug] = m;
      // Externe URLs ausschließen: wenn vor dem Match innerhalb der Zeile
      // ein `http(s)://`-Fragment ohne nachfolgendes Zeilenende ist, liegt
      // der Pattern mitten in einer externen URL (z. B. bmwsb.bund.de/DE/wohnen/…).
      const before = line.slice(0, m.index);
      const lastHttps = Math.max(before.lastIndexOf('http://'), before.lastIndexOf('https://'));
      if (lastHttps >= 0) {
        // Prüfe, ob zwischen dem http(s):// und dem Match ein Whitespace oder
        // ein schließendes Anführungszeichen liegt — dann ist die URL zu Ende
        // und der Match ist ein anderer Pfad.
        const zwischen = before.slice(lastHttps);
        if (!/[\s"'`)<]/.test(zwischen)) continue;
      }
      // SSOT-Mitgliedschaft oder statische Route als legitim akzeptieren
      if (SSOT[kat].has(slug) || STATIC_ROUTES[kat].has(slug)) continue;
      drifts.push({
        file: f.replace('G:/Rechenfix/', ''),
        line: i + 1,
        kat,
        slug,
        context: line.trim().slice(0, 180),
      });
    }
  }
}

console.log('SSOT-Größe pro Kategorie:');
for (const k of KATEGORIEN) console.log('  ' + k + ': ' + SSOT[k].size + ' slugs');
console.log('Gesamt: ' + Object.values(SSOT).reduce((a,s)=>a+s.size,0) + ' SSOT-Slugs');
console.log('');
console.log('=== ' + drifts.length + ' Drift-Treffer ===');
console.log('');

const byFile = new Map();
for (const d of drifts) {
  if (!byFile.has(d.file)) byFile.set(d.file, []);
  byFile.get(d.file).push(d);
}
for (const [file, list] of [...byFile.entries()].sort()) {
  console.log(file + ':');
  for (const d of list) {
    console.log('  Z.' + d.line + ': /' + d.kat + '/' + d.slug);
    console.log('       ' + d.context);
  }
  console.log('');
}
