// fix/critical-css (W14): Zweistufiges CSS-Build.
//
// VORHER (W15C-T7): das komplette Tailwind-Output (~100 KB) wurde als ein
// Inline-<style> in JEDE Seite gebacken → render-blocking, FCP/LCP-Treiber
// auf Mobile.
//
// JETZT: zwei Outputs —
//  1) CRITICAL_CSS  (~24 KB): reduzierter content-Scope (tailwind.critical.
//     config.ts → nur Shell/above-the-fold-Dateien). Wird inline in layout.tsx
//     eingebettet → sofortiges, FOUC-freies Rendern des above-the-fold.
//  2) public/styles/app.[hash].css (~100 KB): volles Tailwind-Output als
//     gehashtes, langfristig cachebares Asset. Wird in layout.tsx NON-BLOCKING
//     nachgeladen (preload + JS-Append) → blockiert das initiale Paint nicht
//     und ist über alle Seiten/Wiederbesuche gecacht.
//
// Beide Konstanten (CRITICAL_CSS + FULL_CSS_HREF) landen in der
// auto-generierten, gitignorierten lib/critical-css.ts. Das Voll-CSS-Asset
// liegt in public/styles/ (ebenfalls gitignored, pro Build neu).
//
// Trigger: prebuild-Hook (npm run build) bzw. npm run build-critical-css.
// Next.js 14 App Router unterstützt experimental.optimizeCss (Critters) nur
// unzureichend (Issue #63635, am 07.06.2026 auf Branch verifiziert) — daher
// dieser deterministische Selfbuild.

import { execSync } from 'child_process';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  rmSync,
} from 'fs';
import { createHash } from 'crypto';
import { dirname } from 'path';

const GLOBALS = './app/globals.css';
const TMP_CRITICAL = './tmp/critical.css';
const TMP_FULL = './tmp/full.css';
const TS_OUTPUT = './lib/critical-css.ts';
const STYLES_DIR = './public/styles';

mkdirSync(dirname(TMP_CRITICAL), { recursive: true });
mkdirSync(dirname(TS_OUTPUT), { recursive: true });
mkdirSync(STYLES_DIR, { recursive: true });

// --- 1) Critical-CSS (reduzierter Scope) -----------------------------------
console.log('Building CRITICAL CSS (above-the-fold scope)…');
execSync(
  `npx tailwindcss -c tailwind.critical.config.ts -i ${GLOBALS} -o ${TMP_CRITICAL} --minify`,
  { stdio: 'inherit' },
);
if (!existsSync(TMP_CRITICAL)) {
  console.error(`Critical output ${TMP_CRITICAL} wurde nicht erzeugt.`);
  process.exit(1);
}
const criticalCss = readFileSync(TMP_CRITICAL, 'utf-8');

// --- 2) Voll-CSS (voller Scope) --------------------------------------------
console.log('Building FULL CSS (all utilities)…');
execSync(
  `npx tailwindcss -c tailwind.config.ts -i ${GLOBALS} -o ${TMP_FULL} --minify`,
  { stdio: 'inherit' },
);
if (!existsSync(TMP_FULL)) {
  console.error(`Full output ${TMP_FULL} wurde nicht erzeugt.`);
  process.exit(1);
}
const fullCss = readFileSync(TMP_FULL, 'utf-8');

// --- Sanity-Checks ----------------------------------------------------------
if (criticalCss.length < 1000) {
  console.error(
    `Critical CSS verdächtig klein (${criticalCss.length} bytes) — erwartet >10 KB.`,
  );
  process.exit(1);
}
if (fullCss.length < 50000) {
  console.error(
    `Full CSS verdächtig klein (${fullCss.length} bytes) — erwartet >50 KB.`,
  );
  process.exit(1);
}
if (criticalCss.length >= fullCss.length) {
  console.error(
    `Critical (${criticalCss.length}) ist nicht kleiner als Full (${fullCss.length}) — Scope-Fehler.`,
  );
  process.exit(1);
}

// --- 3) Voll-CSS als gehashtes public-Asset --------------------------------
const hash = createHash('sha256').update(fullCss).digest('hex').slice(0, 16);
const fullFilename = `app.${hash}.css`;
const fullHref = `/styles/${fullFilename}`;

// Alte app.*.css-Artefakte entfernen (Hash-Drift würde sonst akkumulieren).
for (const f of readdirSync(STYLES_DIR)) {
  if (/^app\.[a-f0-9]+\.css$/.test(f)) {
    rmSync(`${STYLES_DIR}/${f}`);
  }
}
writeFileSync(`${STYLES_DIR}/${fullFilename}`, fullCss);

// --- 4) TS-Konstanten -------------------------------------------------------
const tsContent = `// AUTO-GENERATED — do not edit.
// Erzeugt von scripts/build-critical-css.mjs (fix/critical-css).
// In .gitignore — wird pro Build neu generiert.

export const CRITICAL_CSS = ${JSON.stringify(criticalCss)};
export const FULL_CSS_HREF = ${JSON.stringify(fullHref)};
`;
writeFileSync(TS_OUTPUT, tsContent);

console.log(
  `Critical CSS: ${Math.round(criticalCss.length / 1024)} KB inline · ` +
    `Full CSS: ${Math.round(fullCss.length / 1024)} KB → ${fullHref}`,
);
