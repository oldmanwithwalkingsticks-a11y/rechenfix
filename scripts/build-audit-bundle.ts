// scripts/build-audit-bundle.ts
//
// Generiert ein Audit-Bundle als einzelne Markdown-Datei unter
// `docs/audit-bundles/<bundle-name>.md`. Liest die in
// `scripts/audit-bundles.ts` definierten Dateien und konkateniert sie mit
// klaren Pfad-Headern und Code-Fences.
//
// Aufruf:
//   npx tsx scripts/build-audit-bundle.ts <bundle-name>
//   npm run audit:bundle <bundle-name>
//
// Liste verfügbarer Bundles:
//   npx tsx scripts/build-audit-bundle.ts --list

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { BUNDLES } from './audit-bundles';

const ROOT = process.cwd();
const OUTPUT_DIR = 'docs/audit-bundles';
const REPO_RAW_BASE = 'https://raw.githubusercontent.com/oldmanwithwalkingsticks-a11y/rechenfix/main';

const FENCE_LANG: Record<string, string> = {
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.mjs': 'js',
  '.js': 'js',
  '.jsx': 'jsx',
  '.json': 'json',
  '.md': 'markdown',
  '.css': 'css',
  '.html': 'html',
};

// CommonMark erlaubt Code-Fences beliebiger Länge ≥ 3. Wenn der Inhalt selbst
// `` ``` `` enthält (z. B. eine .md-Datei mit Code-Beispielen), würde der
// 3-Backtick-Fence vorzeitig schließen. Wir wählen eine Fence-Länge, die
// garantiert länger ist als jeder Backtick-Run im Inhalt.
function pickFence(content: string): string {
  let max = 0;
  let run = 0;
  for (const ch of content) {
    if (ch === '`') {
      run += 1;
      if (run > max) max = run;
    } else {
      run = 0;
    }
  }
  return '`'.repeat(Math.max(3, max + 1));
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function listBundles(): never {
  console.log('Verfügbare Audit-Bundles:');
  console.log('');
  for (const b of BUNDLES) {
    console.log(`  ${b.name}`);
    console.log(`    ${b.description}`);
    console.log(`    ${b.files.length} Dateien`);
    console.log('');
  }
  process.exit(0);
}

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

const arg = process.argv[2];
if (!arg || arg === '--help' || arg === '-h') {
  console.log('Usage: npx tsx scripts/build-audit-bundle.ts <bundle-name>');
  console.log('       npx tsx scripts/build-audit-bundle.ts --list');
  process.exit(arg ? 0 : 1);
}
if (arg === '--list') {
  listBundles();
}

const bundle = BUNDLES.find((b) => b.name === arg);
if (!bundle) {
  console.error(`Unbekanntes Bundle: ${arg}`);
  console.error('');
  listBundles();
}

const lines: string[] = [];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

lines.push(`# Audit-Bundle: ${bundle.name}`);
lines.push('');
lines.push(`**Beschreibung:** ${bundle.description}`);
lines.push(`**Generiert:** ${new Date().toISOString()}`);
lines.push(`**Dateien:** ${bundle.files.length}`);
lines.push('');
lines.push('## Inhalt');
lines.push('');
bundle.files.forEach((f, i) => {
  lines.push(`${i + 1}. [\`${f}\`](#${slugify(f)})`);
});
lines.push('');

let totalBytes = 0;
const missing: string[] = [];

for (const relPath of bundle.files) {
  const absPath = join(ROOT, relPath);
  if (!existsSync(absPath)) {
    missing.push(relPath);
    continue;
  }
  const content = readFileSync(absPath, 'utf-8');
  const stats = statSync(absPath);
  totalBytes += stats.size;

  const lang = FENCE_LANG[extname(relPath)] ?? '';
  const fence = pickFence(content);

  lines.push('---');
  lines.push('');
  lines.push(`## \`${relPath}\``);
  lines.push('');
  lines.push(`*${fmtBytes(stats.size)}*`);
  lines.push('');
  lines.push(`${fence}${lang}`);
  // Inhalt ohne trailing newline-Verdopplung
  lines.push(content.replace(/\n+$/, ''));
  lines.push(fence);
  lines.push('');
}

if (missing.length > 0) {
  lines.push('---');
  lines.push('');
  lines.push('## Fehlende Dateien');
  lines.push('');
  for (const f of missing) {
    lines.push(`- \`${f}\` (existiert nicht im Repo)`);
  }
  lines.push('');
}

const outputRel = `${OUTPUT_DIR}/${bundle.name}.md`;
const outputAbs = join(ROOT, outputRel);
mkdirSync(dirname(outputAbs), { recursive: true });
writeFileSync(outputAbs, lines.join('\n') + '\n');

const written = bundle.files.length - missing.length;
console.log(`✓ Bundle geschrieben: ${outputRel}`);
console.log(`  ${written}/${bundle.files.length} Dateien, ~${fmtBytes(totalBytes)} Quell-Code`);
if (missing.length > 0) {
  console.warn(`  ⚠ ${missing.length} Datei(en) fehlen:`);
  for (const f of missing) console.warn(`     - ${f}`);
}
console.log('');
console.log('Nach git add/commit/push abrufbar unter:');
console.log(`  ${REPO_RAW_BASE}/${outputRel}`);
