# Welle 15C — T7 Phase 2: Inline-CSS (Maßnahme β)

**Datum:** 24.05.2026
**Vorbedingung:** T7 Phase 1 Diagnose komplett (in dieser Session bereits durchgeführt), Maßnahme B (experimental.optimizeCss) wirkungslos in Next.js 14 App Router (Issue #63635), sauber gerollbackt. Karsten-Entscheidung: Maßnahme β (Inline-CSS).

## Kontext

Aus Phase 1 wissen wir:
- `207d14f0a40e4e48.css` (100 kB unminified / 15.7 KB Wire) = **Tailwind-Output** (Reset + Utilities)
- `3add334ee59f67ac.css` (2.2 kB unminified / 1.3 KB Wire) = **Inter Font-CSS** (via `next/font/google`)
- `app/globals.css` enthält nur `@tailwind`-Direktiven (Tailwind-Source)
- Next.js erzeugt daraus den großen CSS-File mit Hash, lädt ihn render-blocking
- `next.config.mjs` ist sauber auf T6-Stand

**Ziel:** Tailwind-CSS-Output direkt als `<style>`-Block ins `<head>` inlinen, sodass kein Render-Blocking-Request mehr für CSS nötig ist. Font-CSS bleibt extern (1.3 KB nicht kritisch).

## Strategie

Tailwind-Output wird via separates Build-Script kompiliert + minified, als JS-Konstante geschrieben, in `app/layout.tsx` via `<style>` eingebettet. Next.js-eigener globals.css-Import wird entfernt, damit keine doppelte CSS-Datei entsteht.

## Phase 2 — Implementation (4 Commits)

### Commit 1 — Build-Script + Critical-CSS-Konstante

**Neue Datei:** `scripts/build-critical-css.mjs`

```javascript
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const TAILWIND_INPUT = './app/globals.css';
const TAILWIND_OUTPUT_TMP = './tmp/critical-css.css';
const TS_OUTPUT = './lib/critical-css.ts';

mkdirSync(dirname(TAILWIND_OUTPUT_TMP), { recursive: true });

console.log('Building critical CSS via Tailwind CLI...');
execSync(
  `npx tailwindcss -i ${TAILWIND_INPUT} -o ${TAILWIND_OUTPUT_TMP} --minify`,
  { stdio: 'inherit' }
);

const css = readFileSync(TAILWIND_OUTPUT_TMP, 'utf-8');
const tsContent = `// AUTO-GENERATED — do not edit
// Built by scripts/build-critical-css.mjs
export const CRITICAL_CSS = ${JSON.stringify(css)};
`;

writeFileSync(TS_OUTPUT, tsContent);
console.log(`Critical CSS written to ${TS_OUTPUT} (${css.length} bytes)`);
```

**`package.json`-Anpassung:**

In `scripts`-Section:
```json
"build-critical-css": "node scripts/build-critical-css.mjs",
"prebuild": "npm run build-critical-css"
```

(Falls bereits `prebuild` existiert: ergänzen statt überschreiben.)

**`.gitignore` ergänzen:**
```
lib/critical-css.ts
tmp/
```

(Auto-generierte Datei sollte nicht committed werden, analog zu `client-data.ts`-Pattern.)

**Initial-Build des Scripts ausführen:**
```bash
node scripts/build-critical-css.mjs
```

Verify: `lib/critical-css.ts` existiert, enthält Tailwind-CSS als String-Konstante.

Commit-Message:
```
feat: build-script für critical-css inline (vorbereitung t7)
```

### Commit 2 — layout.tsx Refactor (Inline einbauen)

**`app/layout.tsx`-Änderungen:**

1. **Entferne** den globals.css-Import:
```tsx
// VORHER:
import './globals.css'

// NACHHER: weg
```

2. **Importiere** die Critical-CSS-Konstante:
```tsx
import { CRITICAL_CSS } from '@/lib/critical-css';
```

3. **Füge `<style>`-Block im `<head>` ein** (vor allen anderen `<style>` oder `<link>`-Elementen):
```tsx
<head>
  <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
  {/* ... existing head content ... */}
</head>
```

**Build verifizieren:**

```bash
npm run build
```

Erwartung: Build grün. `prebuild`-Hook führt `build-critical-css` automatisch aus.

**Lokal verifizieren:**

```bash
npm start
curl -s http://localhost:3000/gesundheit/bmi-rechner | grep -c "<style"
```

Erwartung: Mindestens 1 `<style>`-Block im HTML (vorher 0).

```bash
curl -s http://localhost:3000/gesundheit/bmi-rechner | grep -c 'rel="stylesheet"'
```

Erwartung: 0 oder maximal 1 (für Font-CSS, falls noch da). Vorher: 2.

Commit-Message:
```
perf: tailwind-css inline statt render-blocking link (lcp-fix)
```

### Commit 3 — Verify-Script (Optional aber empfohlen)

**Neue Datei:** `scripts/verify-critical-css.mjs`

```javascript
import { execSync } from 'child_process';

const URLS = [
  'http://localhost:3000/',
  'http://localhost:3000/gesundheit/bmi-rechner',
  'http://localhost:3000/wohnen/mietrechner',
  'http://localhost:3000/arbeit/brutto-netto-rechner',
];

let pass = true;

for (const url of URLS) {
  const html = execSync(`curl -s ${url}`, { encoding: 'utf-8' });
  const styleBlocks = (html.match(/<style/g) || []).length;
  const cssLinks = (html.match(/rel="stylesheet"/g) || []).length;
  
  const ok = styleBlocks >= 1 && cssLinks <= 1;
  console.log(
    `${ok ? '✓' : '✗'} ${url} — <style>: ${styleBlocks}, css links: ${cssLinks}`
  );
  
  if (!ok) pass = false;
}

process.exit(pass ? 0 : 1);
```

Server starten + Script ausführen:
```bash
npm start &
sleep 3
node scripts/verify-critical-css.mjs
```

Falls alle ✓: weiter. Falls ✗: STOP, Befund melden.

Commit-Message:
```
chore: verify-script für critical-css inline
```

### Commit 4 — Doku

`docs/audit-arbeitspapiere/welle-status-historie.md` — W15C T7-Eintrag:

- T7 Phase 1: experimental.optimizeCss wirkungslos in Next 14 App Router
- T7 Phase 2: Maßnahme β (Inline-CSS) umgesetzt
- Build-Pipeline-Änderung: `prebuild` läuft `build-critical-css.mjs`
- L-Lehren falls neue (z.B. zur Tailwind-CLI-Build-Pipeline)

Commit-Message:
```
docs: w15c t7 inline-css dokumentiert
```

## Phase 4 — Karsten manuell

### Visual-Regression-Check (~10 Min)

5 Pages im Inkognito durchklicken, jeweils Hard-Refresh (`Strg + Shift + R`):

```
https://www.rechenfix.de/
https://www.rechenfix.de/gesundheit/bmi-rechner
https://www.rechenfix.de/wohnen/mietrechner
https://www.rechenfix.de/arbeit/brutto-netto-rechner
https://www.rechenfix.de/ueber-uns
```

Pro Page prüfen:
- Layout sieht aus wie vorher (keine kaputten Styles)
- Schrift rendert korrekt (Inter ist da)
- Farben korrekt (gelbe Tipp-Box, Rechner-Karten, etc.)
- Mobile-View ok (Browser-Devtools)

Bei sichtbarer Regression: **STOP, sofort `git revert HEAD~3..HEAD` oder Vercel-Rollback**, melden.

### PSI Re-Measurement (~15 Min)

3 Messungen pro URL, Median:

```
https://www.rechenfix.de/gesundheit/bmi-rechner
https://www.rechenfix.de/wohnen/mietrechner
https://www.rechenfix.de/arbeit/brutto-netto-rechner
https://www.rechenfix.de/
```

**Erfolgs-Kriterien:**

| Metrik | Ziel | Härte |
|---|---|---|
| PSI „Render blocking requests" | verschwunden oder nur 1.3 KB Font-CSS übrig | **MUSS** |
| LCP-Median BMI + Mietrechner | < 4s | **MUSS** |
| LCP-Streuung max | 2s zwischen Messungen | SOLL |
| Score-Median BMI + Mietrechner | 80+ | SOLL |
| CLS bleibt 0 | — | **MUSS** |
| Andere Pages unverändert/besser | — | **MUSS** |

**Wenn alle MUSS erfüllt:** AdSense-Resubmit-Ready, definitiv letzter Sprint durch.

## Regeln

- Build vor jedem Commit grün
- Wenn `lib/critical-css.ts` nicht generiert wird oder leer ist: STOP
- Wenn Build-Errors auftreten: STOP, Befund melden, kein Push
- Atomic-Rollback per `git revert` falls etwas schief geht
- Bei Visual-Regression: SOFORT zurückrollen, nicht „nachbessern"
- Bei Unklarheit STOP + Rückfrage

## Was NICHT in diesen Sprint

- Font-CSS auch noch inline (1.3 KB ist nicht kritisch, next/font-Pipeline würde brechen)
- Tailwind-Config-Refactor
- Andere CSS-Optimierungen
- Andere Performance-Items aus PSI
