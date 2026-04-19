#!/usr/bin/env node
// Pre-Deploy-Lint: sucht hartkodierte Jahreswerte außerhalb der Allowlist.
// Aufruf: node scripts/check-jahreswerte.mjs
// Oder:   npm run lint:jahreswerte

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- Config laden ---
const configPath = join(__dirname, 'jahreswerte-config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

// --- ANSI-Farben ---
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

// --- Allowlist-Matching (einfacher Glob → Regex) ---
function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '__DOUBLESTAR__')
    .replace(/\*/g, '[^/]*')
    .replace(/__DOUBLESTAR__/g, '.*');
  return new RegExp(`^${escaped}$`);
}

const allowRegexes = config.allowlist.map(globToRegex);

function isAllowed(relPath) {
  const normalized = relPath.split(sep).join('/');
  return allowRegexes.some((re) => re.test(normalized));
}

// --- Verzeichnis rekursiv scannen ---
function collectFiles(startDir) {
  const files = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      const rel = relative(ROOT, full);
      if (isAllowed(rel)) continue;
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        walk(full);
      } else if (
        /\.(tsx?|jsx?|mjs|cjs|css|scss)$/.test(entry)
      ) {
        files.push(full);
      }
    }
  }
  walk(startDir);
  return files;
}

const files = [];
for (const scanPath of config.scanPaths) {
  const abs = join(ROOT, scanPath);
  try {
    statSync(abs);
    files.push(...collectFiles(abs));
  } catch {
    // Pfad existiert nicht — ignorieren (z. B. wenn src/ nicht genutzt wird)
  }
}

// --- Regex-Helper: Zahl als Wert (nicht Zeilennummer, nicht Import) ---
function buildValueRegex(value) {
  // Behandelt: 12348, 12_348, 12.348 (als Dezimalzahl, nicht Tausender-Punkt!)
  // Escape ., und füge Wortgrenzen hinzu
  const escaped = value.replace(/\./g, '\\.');
  return new RegExp(`(?<!\\w)${escaped}(?!\\w)`, 'g');
}

// --- Kontext-Filter: Prüft, ob in den ±2 Zeilen ein Keyword vorkommt ---
// Wird nur angewendet, wenn der forbiddenValues-Eintrag contextKeywords definiert.
// Ohne contextKeywords → immer melden (Default-Verhalten wie vor Prompt 99c).
function contextKeywordsMatch(lines, lineIdx, keywords) {
  if (!keywords || keywords.length === 0) return true;
  const window = lines
    .slice(Math.max(0, lineIdx - 2), Math.min(lines.length, lineIdx + 3))
    .join('\n')
    .toLowerCase();
  return keywords.some(kw => window.includes(kw.toLowerCase()));
}

// --- Jede Datei durchsuchen ---
const findings = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (const entry of config.forbiddenValues) {
    const { value, description, expectedSource, contextKeywords } = entry;
    const regex = buildValueRegex(value);
    lines.forEach((line, idx) => {
      // Kommentare ignorieren? Nein — Werte in Kommentaren sind genauso problematisch
      // (wären irreführend). Aber JSX-Inline-Props wie `width={12348}` sollen matchen.
      if (regex.test(line) && contextKeywordsMatch(lines, idx, contextKeywords)) {
        findings.push({
          file: relative(ROOT, file),
          line: idx + 1,
          value,
          description,
          expectedSource,
          context: line.trim().substring(0, 100),
        });
      }
      regex.lastIndex = 0;
    });
  }
}

// --- Output ---
if (findings.length === 0) {
  console.log(`${GREEN}✓ Keine hartkodierten Jahreswerte außerhalb der Allowlist gefunden.${RESET}`);
  console.log(`${DIM}  ${files.length} Dateien gescannt in: ${config.scanPaths.join(', ')}${RESET}`);
  process.exit(0);
}

console.log(`${RED}✗ ${findings.length} Treffer — hartkodierte Jahreswerte gefunden:${RESET}\n`);

// Gruppierung nach Datei
const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

for (const [file, entries] of byFile) {
  console.log(`${CYAN}${file}${RESET}`);
  for (const e of entries) {
    console.log(`  ${YELLOW}Zeile ${e.line}:${RESET} Wert ${RED}${e.value}${RESET} — ${e.description}`);
    console.log(`  ${DIM}→ Erwartete Quelle: ${e.expectedSource}${RESET}`);
    console.log(`  ${DIM}  ${e.context}${RESET}`);
    console.log();
  }
}

console.log(`${RED}Fix: Ersetze den hartkodierten Wert durch einen Import aus der entsprechenden zentralen Lib.${RESET}`);
console.log(`${DIM}Siehe CLAUDE.md → Rechtsstand-Tabelle und rechner-builder-Skill → Guard G11.${RESET}`);

process.exit(1);
