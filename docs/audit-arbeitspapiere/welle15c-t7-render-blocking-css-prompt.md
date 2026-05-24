# Welle 15C — T7: Render-Blocking-CSS Fix (Letzter Sprint vor AdSense-Resubmit)

**Datum:** 24.05.2026
**Vorbedingung:** T6-Sprint durch (Commit `60b0b94`). CLS auf BMI + Mietrechner ist **0** (vorher 0.3). Verbleibendes Problem klar identifiziert.

## Kontext

PSI-Re-Measurement nach T6 zeigt:
- ✅ **CLS = 0** auf allen 4 Test-URLs (T6-Fix war erfolgreich)
- ⚠️ **LCP schwankt extrem** je nach CSS-Lade-Zeit: Mietrechner 2.1s bis 7.4s, BMI 5.4s bis 7.5s
- ⚠️ Score schwankt: 60-96 (Mietrechner), 62-70 (BMI)

**Konkreter Diagnostics-Befund auf ALLEN Pages (BMI + Mietrechner):**

```
Render blocking requests — Est savings of 150-370 ms
  rechenfix.de                                   17.0 KiB  650-1270 ms
    ...css/207d14f0a40e4e48.css                  15.7 KiB  160-790 ms
    ...css/3add334ee59f67ac.css                   1.3 KiB  450-490 ms
```

Plus PSI „Network dependency tree" auf BMI:
```
Initial Navigation
  /gesundheit/bmi-rechner   78 ms   20.11 KiB
    css/207d14f0a40e4e48.css  488 ms  15.66 KiB
    css/3add334ee59f67ac.css  345 ms   1.32 KiB
```

**Diagnose:** Zwei render-blocking CSS-Files (17 KB total) verzögern Initial-Render um 488-790 ms je nach Network. Das ist der LCP-Streuungs-Treiber. Bei schnellem CSS-Load: 2.1s LCP. Bei langsamem: 7.4s.

**Ziel:** Render-Blocking eliminieren oder minimieren → LCP-Median stabil unter 4s auf allen Pages.

## Phase 1 — Mini-Diagnose (~10 Min, READ-ONLY)

### A) CSS-File-Identifikation

1. Lokal nach Build prüfen: was steht in `.next/static/css/*.css`?
   - `207d14f0a40e4e48.css` (15.7 KB): vermutlich Tailwind-Output, aber bestätigen
   - `3add334ee59f67ac.css` (1.3 KB): vermutlich Critical-CSS-Fragment oder Font-CSS
2. Wie werden beide ins Layout eingebunden? Suche in `app/layout.tsx` nach CSS-Imports, oder Next.js Auto-Generierung.

### B) Next-Config-Status

`next.config.js` oder `.mjs` prüfen:
- `experimental.optimizeCss`? Aktiv?
- `experimental.cssChunking`? Aktiv?
- Andere CSS-relevante Flags?

### C) Tailwind-Config-Effizienz

`tailwind.config.ts/js`:
- `content`-Paths korrekt? (alle .tsx-Files erfasst)
- Generierte CSS-Größe für die Site-Komplexität sinnvoll?
- 15.7 KB ist nicht extrem groß, aber 488ms Download für 15 KB ist langsam = Network-Latency-Problem, nicht Größe

### D) Aktueller Bundle-Output

```bash
npm run build
ls -la .next/static/css/
```

CSS-Files-Größen + Anzahl notieren.

## Phase 2 — Fix

### Wahrscheinlichste Maßnahmen (priorisiert nach Risiko/Impact)

**Maßnahme A (NIEDRIGES Risiko, KLEINER Impact): Preload-Hints**

Im `app/layout.tsx` head-Bereich:
```tsx
<link
  rel="preload"
  href="/_next/static/css/207d14f0a40e4e48.css"
  as="style"
/>
```

Problem: Hash im Filename ändert sich pro Build → hartkodierter Preload greift nicht zuverlässig. Müsste via Next-Helper oder Build-Hook erfolgen.

**Maßnahme B (MITTLERES Risiko, GROSSER Impact): `experimental.optimizeCss`**

Aktiviert Critters (oder Beasties seit Next 15) zum automatischen Critical-CSS-Inline:
```javascript
// next.config.js/mjs
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  // ...
}
```

Was passiert: Critters analysiert pro Page welche CSS-Selektoren above-the-fold genutzt werden, inlined diese ins HTML, lazy-loaded den Rest. Erwarteter Effekt: Render-Blocking-CSS verschwindet aus Critical Path → LCP -200 bis -500 ms.

**Wichtig:** experimental Flag — bei Build-Fehlern Rollback möglich. **Vor Aktivierung lokalen Build testen, nicht direkt deployen.**

**Maßnahme C (NIEDRIGES Risiko, MITTLERER Impact): Font-Preload**

Falls 3add334ee59f67ac.css Font-CSS ist: Font-Preload-Hints für die wichtigsten Web-Fonts. Aber da Font-Loading via `next/font` läuft (Memory W15A), sollte das schon optimal sein.

**Maßnahme D (HOHES Risiko, GROSSER Impact): CSS in `<style>` inline**

Aggressiver Fix: kompletter CSS-Content in `<head>` inline → kein Render-Blocking. Nachteil: HTML wird größer, kein Browser-Caching für CSS. **Nicht empfohlen** für diese Site-Größe.

### Empfehlung

**Maßnahme B (`experimental.optimizeCss`)** als Hauptfix, weil:
- Standard-Next.js-Lösung für genau dieses Problem
- Hash-resilient (kein hartkodiertes Preload-Pfad)
- Per-Page Critical-CSS-Inline
- Rollback in einem Commit möglich

Falls B den Build bricht: Fallback auf Preload-Hint-Strategie (Maßnahme A) mit Next-Helper.

### Commits

**Commit 1 — Hauptfix:**
```javascript
// next.config.mjs
experimental: {
  optimizeCss: true,
}
```

Plus eventuelle Dependency `critters` oder `beasties` als devDependency falls nicht da. Falls Next.js eine Warnung über fehlende dependency wirft, install ausführen.

Build muss grün sein. Lokal `npm run dev` + Page aufrufen, View Source: gibt es jetzt inline `<style>`-Blocks im `<head>`?

Commit-Message:
```
perf: critical-css inline via experimental.optimizeCss (render-blocking fix)
```

**Commit 2 — Doku:**
`welle-status-historie.md` neuer T7-Eintrag.

Commit-Message:
```
docs: w15c t7 critical-css fix dokumentiert
```

## Phase 4 — Karsten manuell (nach Push + Vercel-Deploy)

**PSI Re-Measurement** je 3 Messungen, Median:

```
https://www.rechenfix.de/gesundheit/bmi-rechner
https://www.rechenfix.de/wohnen/mietrechner
https://www.rechenfix.de/arbeit/brutto-netto-rechner   (Kontroll-Stichprobe)
https://www.rechenfix.de/                              (Kontroll-Stichprobe)
```

**Erfolgs-Kriterien:**

| Metrik | Ziel | Härte |
|---|---|---|
| PSI-Item "Render blocking requests" | verschwunden oder savings < 50ms | MUSS |
| LCP-Median BMI + Mietrechner | < 4s | MUSS |
| LCP-Streuung BMI + Mietrechner | max 2s zwischen Messungen | SOLL |
| Score-Median BMI + Mietrechner | 75+ | SOLL |
| CLS bleibt 0 | — | MUSS |
| Andere Pages unverändert/besser | — | MUSS |

**Wenn alle MUSS erfüllt:** AdSense-Resubmit-Ready, dies war wirklich der letzte Sprint.

**Wenn experimental.optimizeCss Probleme verursacht** (z.B. fehlende Styles, Build-Errors): sofortiger Rollback per `git revert`, dann Maßnahme A (Preload-Hints) als Fallback.

## Regeln

- Build vor Commit grün
- Nur Maßnahme B (experimental.optimizeCss) — keine zusätzlichen Experiment-Flags gleichzeitig
- Bei Build-Fehler: SOFORT rollback, melde Befund
- Visuelle Regression-Test: 3 Pages lokal aufrufen, alles rendert korrekt
- Bei Unklarheit STOP + Rückfrage

## Was NICHT in diesen Sprint

- Andere experimental Flags (Risiko-Erhöhung)
- Tailwind-Refactor
- CSS-File-Splitting (Architektur-Refactor)
- Inline-CSS-Aggressiv-Lösung (Maßnahme D)
- Font-Loading-Refactor (sollte bereits via next/font optimal sein)
