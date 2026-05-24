// W15C-T7 (24.05.2026): Critical-CSS-Inline-Build.
//
// Kompiliert app/globals.css via Tailwind-CLI in minified CSS und
// schreibt das Resultat als JS-String-Konstante nach lib/critical-css.ts.
// Die Konstante wird in app/layout.tsx als <style>-Block inline
// eingebettet (statt via `import './globals.css'`), wodurch der
// render-blocking <link rel="stylesheet">-Tag entfällt.
//
// Trigger: Per `npm run build-critical-css` oder automatisch via
// `prebuild`-Hook. Die generierte Datei `lib/critical-css.ts` ist in
// .gitignore und wird pro Build neu erzeugt — analog zu
// `lib/rechner-config/client-data.ts`.
//
// Hintergrund: Next.js 14 App Router unterstützt `experimental.optimizeCss`
// (Critters) nur unzureichend (Issue #63635), daher dieser Selfbuild.

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const TAILWIND_INPUT = './app/globals.css';
const TAILWIND_OUTPUT_TMP = './tmp/critical-css.css';
const TS_OUTPUT = './lib/critical-css.ts';

mkdirSync(dirname(TAILWIND_OUTPUT_TMP), { recursive: true });
mkdirSync(dirname(TS_OUTPUT), { recursive: true });

console.log('Building critical CSS via Tailwind CLI…');
execSync(
  `npx tailwindcss -i ${TAILWIND_INPUT} -o ${TAILWIND_OUTPUT_TMP} --minify`,
  { stdio: 'inherit' }
);

if (!existsSync(TAILWIND_OUTPUT_TMP)) {
  console.error(`Tailwind output ${TAILWIND_OUTPUT_TMP} wurde nicht erzeugt.`);
  process.exit(1);
}

const css = readFileSync(TAILWIND_OUTPUT_TMP, 'utf-8');

if (css.length < 1000) {
  console.error(
    `Tailwind output verdächtig klein (${css.length} bytes) — erwartet >50 KB.`
  );
  process.exit(1);
}

const tsContent = `// AUTO-GENERATED — do not edit.
// Erzeugt von scripts/build-critical-css.mjs (W15C-T7).
// In .gitignore — wird pro Build neu generiert.

export const CRITICAL_CSS = ${JSON.stringify(css)};
`;

writeFileSync(TS_OUTPUT, tsContent);
console.log(`Critical CSS written to ${TS_OUTPUT} (${css.length} bytes raw → ~${Math.round(css.length / 1024)} KB).`);
