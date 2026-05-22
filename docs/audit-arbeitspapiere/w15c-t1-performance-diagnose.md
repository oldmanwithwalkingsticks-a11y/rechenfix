# W15C T1 — Mobile-Performance-Diagnose (Phase 1)

**Stand:** 22.05.2026
**Modus:** READ-ONLY (Diagnose, keine Code-Fixes)
**Eingabe:** PageSpeed Insights 6 URLs (Homepage Score 60 · LCP 7,1 s; Brutto-Netto 68 · 4,5 s; 3000-€ 81 · 5,0 s; BMI 63 · 8,0 s; Mietrechner 75 · 6,8 s; Über-uns 79 · 5,5 s)

---

## Executive Summary

Ein einziger Befund erklärt 70–90 % des LCP-Problems: **die dynamische Rechner-Route `app/[kategorie]/[rechner]/page.tsx` lädt 175 React-Components in EIN Bundle = 2,1 MB JS pro Page.** Die anderen Rechner-Pages erreichen Vergleichswerte von 3,7 KB (Variant-Pages) bzw. 7,4 KB (Homepage) — das sind 285× weniger.

**Nicht** der Render-Pfad ist das Problem. Alle Pages sind statisch prerendered (TTFB < 200 ms zu erwarten), Inter-Font ist korrekt mit `display: 'swap'` eingebunden, CSS-Bundle 103 KB ist moderat. Das LCP-Problem ist nahezu vollständig JavaScript-Last beim Hydrieren.

**Erwartung Phase 2:**
- Fix #1 (dynamic imports) → −60–80 % First Load JS → LCP −2 bis −4 s auf 4G/Mid-range Mobile, Score +20–25
- Fix #2 (Karsten-Foto) → −0,5 bis −1 s LCP auf `/ueber-uns` (vermutlich das LCP-Element dort)
- Fix #3 (Homepage-Tipp entlasten) → −0,5 bis −1 s LCP Homepage

---

## Build-Output (Stand `npm run build` 22.05.2026)

```
Route (app)                              Size     First Load JS
├ ○ /                                    3.08 kB         139 kB
├ ● /[kategorie]                         645 B          96.7 kB
├ ● /[kategorie]/[rechner]               418 kB          546 kB   ← KATASTROPHE
├ ○ /finanzen/5000-euro-brutto-netto     1.56 kB         103 kB
├ ○ /finanzen/wohngeld-rechner           1.54 kB        97.6 kB
├ ○ /ueber-uns                           186 B           101 kB
+ First Load JS shared by all            87.3 kB
```

**Chunk-Map:**

| Chunk | Größe | Inhalt (vermutet) |
|---|---|---|
| `app/[kategorie]/[rechner]/page-*.js` | **2.118 KB** | 175 Rechner-Components statisch importiert |
| `fd9d1056-*.js` | 172 KB | React/ReactDOM |
| `framework-f66176bb897dc684.js` | 140 KB | Next.js Framework |
| `117-*.js` | 124 KB | Shared (decimal.js + Libs) |
| `main-*.js` | 117 KB | App-Bootstrap |
| `polyfills-*.js` | 112 KB | ES-Polyfills |

Rendering-Modus: **alle Pages SSG/Static** (`○` oder `●`). Kein Cold-Start-/TTFB-Problem.

---

## Befunde

### KRITISCH (~2 s+ LCP-Impact)

#### C1 — 175 Client-Components in EIN Route-Bundle gepackt

**Datei:** [app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx) Z. 14–183 + Z. 216–387

**Befund:**
```ts
// Z. 14–183: 175 statische Imports
import Prozentrechner from '@/components/rechner/Prozentrechner';
import BruttoNettoRechner from '@/components/rechner/BruttoNettoRechner';
// ... 173 weitere

// Z. 216–387: Lookup-Map hält Referenzen — Tree-Shaking unmöglich
const rechnerKomponenten: Record<string, React.ComponentType> = {
  'prozentrechner': Prozentrechner,
  'brutto-netto-rechner': BruttoNettoRechner,
  // ... 173 weitere
};
```

Jeder einzelne Rechner-Slug rendert nur **eine** Component, aber das Bundle enthält **alle 175** — weil `rechnerKomponenten` als Lookup-Map alle Referenzen behält und Webpack nicht weiß, welcher Slug zur Build-Zeit aktiv wird. SSG erzeugt zwar 168 unterschiedliche HTML-Pages, aber alle teilen das **gleiche** Client-JS-Chunk.

**Source-Code-Bilanz:** 175 Components × Ø ~14 KB unminified = 2,53 MB Source → 2,1 MB minified Client-Chunk. Verhältnis passt 1:1.

Auf Mobile 4G (~1,6 Mbit/s effective): 2 MB Download = ~10 s + Parse + Hydration → LCP 4–8 s.

**Fix-Strategie:**

`next/dynamic` für jeden Slug:
```ts
import dynamic from 'next/dynamic';

const rechnerKomponenten: Record<string, React.ComponentType> = {
  'prozentrechner': dynamic(() => import('@/components/rechner/Prozentrechner')),
  'brutto-netto-rechner': dynamic(() => import('@/components/rechner/BruttoNettoRechner')),
  // ...
};
```

Next.js erkennt das als Code-Split-Boundary → pro Slug nur die geladene Component + Shared.

**Erwartete Größenordnung nach Fix:**
- Brutto-Netto-Rechner (Component 54 KB unminified): ~12–18 KB minified gz
- Mittlere Rechner (Component ~10–14 KB): ~3–5 KB minified gz
- First Load JS pro Page: **150–200 KB** statt 546 KB

Das ist im "Good" PageSpeed-Bereich (<200 KB).

**Risiko/Kosten:**
- Risiko niedrig — `dynamic()` ist Standard-Next.js-API, `ssr: true` als Default behält SSR-Sichtbarkeit für Crawler/AdSense
- Loading-Fallback optional (Skeleton) — Standard ist transparent
- Aufwand: 1 Bulk-Edit-Skript transformiert alle 175 Imports (~30 Min Script + ~30 Min Verify + ~30 Min Smoketest)

**LCP-Impact-Schätzung:** −2 bis −4 s auf 4G/Mid-range Mobile, Score +20–25 Punkte.

---

### HOCH (~0.5–2 s LCP-Impact)

#### H1 — Karsten-Foto unkomprimiert 950 KB

**Datei:** `public/about/karsten-kautz-v2.jpg` = 950.873 Bytes

**Befund:** Original-JPG, vermutlich Foto-Größe (deutlich > 1000×1000 px). Vercel Image-Optimizer (`/_next/image?...`) konvertiert beim First-Hit zu WebP/AVIF, cached aber das Source-File trotzdem als Backing-Store.

Erscheint auf:
- `/ueber-uns` (oben rechts via `next/image`, [app/ueber-uns/page.tsx](../../app/ueber-uns/page.tsx) — vermutlich **das LCP-Element**)
- 10 Top-10-Rechner via `<AuthorBio>` ([components/AuthorBio.tsx](../../components/AuthorBio.tsx))

PageSpeed `/ueber-uns` Score 79 · LCP 5,5 s passt zu: Foto wird per Image-Optimizer in 72×72 px (AuthorBio) bzw. wahrscheinlich ~200×200 px (über-uns) ausgespielt — aber das Source-File muss erst durch den Optimizer, was bei 950 KB JPG durchaus 800 ms Verarbeitung kostet.

**Fix-Strategie:**
1. Foto extern komprimieren auf ~80–120 KB WebP, 1000×1000 px Source-Maximum
2. Cache-Bust via `karsten-kautz-v3.webp` + KARSTEN_PHOTO_PATH-Konstante in [lib/site-config.ts](../../lib/site-config.ts) bumpen
3. `<Image>` bekommt `priority` auf `/ueber-uns` (bislang nicht gesetzt — Above-the-Fold-Bild sollte `priority` haben, dann lädt Next.js es im Prerender-`<link rel="preload">`)
4. Optional: `sizes`-Hint für AuthorBio (`sizes="72px"`) — Vercel Image-Optimizer kann dann gezielt 72×72-Variante prerendern statt 640px+ Default-Variante

**Aufwand:** ~15 Min (Komprimierung extern + 2 Code-Edits + Smoketest)

**LCP-Impact-Schätzung:**
- `/ueber-uns`: −0,5 bis −1 s LCP
- Rechner-Pages: vernachlässigbar (Foto ist unterhalb des Folds)

---

#### H2 — AdSense-Loader als raw `<script>` ohne `next/script`-Strategy

**Datei:** [app/layout.tsx](../../app/layout.tsx) Z. 95–103

**Befund:**
```tsx
<head>
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
    crossOrigin="anonymous"
  />
</head>
```

`async` ist gesetzt → kein Parser-Blocking → kein direkter LCP-Impact über die Script-Tag selbst. **Aber:**
- TCP-Connect + TLS-Handshake zu `pagead2.googlesyndication.com` kostet ~100–300 ms auf Mobile
- Script lädt im selben Network-Pool wie kritische CSS/JS → konkurriert um Bandbreite
- AdSense-Crawler-Erkennung erfordert das Loader-Script — daher MUSS es auf jeder Page laden

`next/script` mit `strategy="afterInteractive"` würde Next.js die Script-Position erst nach Hydration injecten → komplett vom Critical Path entfernt.

**Status: GESPERRT** — Prompt 85 (next/script-Refactor) parkt bis AdSense-Freigabe. Aktuell wartet das Projekt auf AdSense-Re-Review nach dem 19.05.2026-Sprint. Erst NACH Approval darf das Script-Loading angefasst werden, sonst Risiko AdSense-Crawler-Confusion.

**LCP-Impact-Schätzung (nach Freigabe):** −0,3 bis −0,8 s auf Mobile, TBT-Reduktion 100–200 ms.

**Empfehlung:** Phase 2 OHNE H2 — sobald AdSense durch ist, separater Mini-Sprint.

---

#### H3 — CSS-Bundle 103 KB

**Datei:** `.next/static/css/a2d11d6dd60a5e19.css` = 103.399 Bytes

**Befund:** Tailwind 3.4 mit korrekt konfiguriertem `content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"]` ([tailwind.config.ts](../../tailwind.config.ts)). Typische Tailwind-Bundles dieser Site-Größe liegen bei 30–60 KB. 103 KB deutet auf:
- Viele JIT-generierte Klassen (dynamische `className`-Templates wie in `farbMap` von [components/layout/Header.tsx](../../components/layout/Header.tsx) Z. 9–19)
- Möglicherweise `prose`-Klassen aus inline-HTML (Über-uns nutzt `prose prose-sm`)
- Dark-Mode-Verdoppelung (jeder Hover-State auch als `dark:hover:`)

**Fix-Strategie (Phase 2):**
- Audit größte Klassen-Cluster via Browser-DevTools "Coverage"-Tab
- Dark-Mode-Klassen zentralisieren via CSS-Variables in `:root`/`.dark`
- `farbMap`-Pattern in Header.tsx + Footer.tsx + AffiliateBox.tsx checken — alle dynamisch generierten Klassen müssen safelisted oder static sein

**LCP-Impact-Schätzung:** −0,2 bis −0,5 s LCP. Render-Blocking via `<link rel="stylesheet">`, daher direkt im Critical Path.

**Aufwand:** Unsicher (~1–2 h) — Wirkung schwer vorherzusagen, könnte auch nur 5–10 KB einsparen.

---

### MITTEL (<0.5 s LCP-Impact)

#### M1 — TippDesTages zieht decimal.js + PAP-Lohnsteuer-Lib in Homepage-Bundle

**Datei:** [components/ui/TippDesTages.tsx](../../components/ui/TippDesTages.tsx) Z. 5–7

**Befund:**
```tsx
'use client';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
// → transitiv: lohnsteuer.ts → _lohnsteuer-pap-2026.ts (37,8 KB) → decimal.js (296 KB Source)
```

Der Mindestlohn-Netto-Wert wird zur Module-Load-Zeit (Z. 12–27) einmal berechnet, kommt aber komplett mit decimal.js in die Homepage. Decimal.js dürfte im `117-*.js`-Shared-Chunk (124 KB) den Großteil ausmachen, weshalb die Homepage 139 KB First Load JS hat statt z. B. 90 KB.

**Fix-Strategie:**

Variante A: Wert als Build-Konstante vorab berechnen:
```ts
// scripts/generate-tipps.ts → schreibt nach lib/tipps-constants.ts:
export const MINDESTLOHN_NETTO_2026 = 1840;
```

Variante B: `TippDesTages` via `dynamic(() => import('@/components/ui/TippDesTages'), { ssr: false })` → fliegt aus Initial-Bundle, lädt erst nach LCP.

**Aufwand:** ~30 Min für Variante A, ~10 Min für Variante B. Variante A besser für SEO (Server-rendert den Wert).

**LCP-Impact-Schätzung:** Homepage −0,3 bis −0,8 s.

---

#### M2 — Inter-Font Setup

**Datei:** [app/layout.tsx](../../app/layout.tsx) Z. 5–9

**Befund:** Optimal eingerichtet:
```tsx
const inter = Inter({
  subsets: ['latin'],       // ohne 'latin-ext' — gut, spart ~25 KB
  display: 'swap',          // korrekt — kein FOIT
  variable: '--font-inter', // CSS-Variable für Tailwind
});
```

`next/font/google` lädt Font selbsthostbar, keine externen `fonts.googleapis.com`-Requests. Latin-Subset ~30 KB WOFF2.

**KEIN Fix nötig.** ✓

---

#### M3 — Sidebar + Verwandte Rechner = große DOM-Trees

**Datei:** [app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx) Z. 642–686 (Sidebar) + Z. 614–635 (Verwandte)

**Befund:** Sidebar rendert ALLE Slugs der Kategorie als `<Link>`-Items (Finanzen hat 45 Rechner → 45 Links pro Rechner-Page). Mega-Menu im Header ist lazy (`{menuOpen && ...}`), gut.

DOM-Size auf einer Finanzen-Rechner-Page: ~600–800 Elements vor LCP. PageSpeed warnt ab 800 Elements + 32 Kindern als "Excessive DOM size".

**Fix-Strategie:** Sidebar auf Top-10 (oder Top-5 + "Alle anzeigen →"-Link) limitieren. Verwandte-Rechner sind bereits auf 4 limitiert.

**LCP-Impact-Schätzung:** −0,1 bis −0,3 s, primär CLS/Hydration-Cost. Geringe Priorität.

---

#### M4 — Header lädt `lib/rechner-config/client-data` (96 KB)

**Datei:** [components/layout/Header.tsx](../../components/layout/Header.tsx) Z. 6

**Befund:** Header importiert `kategorien + getRechnerByKategorie` aus dem Slim-Client-Data-File (96 KB). Wird nur für das Mega-Menu (im Lazy-Block) gebraucht — aber der Import landet im initial bundle, weil `Header` ein `'use client'`-Component ist und auf allen Pages rendert.

**Fix-Strategie:** Mega-Menu-Inhalt in separates `<MegaMenuContent />` extrahieren, via `dynamic(() => import(...), { ssr: false })` laden — Initial-Render lädt nur das Hamburger-Icon, Daten kommen erst on-click.

**LCP-Impact-Schätzung:** −0,1 bis −0,2 s. Mittlere Priorität.

**Aufwand:** ~20 Min Refactor.

---

#### M5 — `vercel.json` fehlt

**Befund:** Headers + Cache-Control sind bereits korrekt in [next.config.mjs](../../next.config.mjs) Z. 37–67 konfiguriert:
- `Cache-Control: public, max-age=31536000, immutable` für JS/CSS/WOFF2/PNG/JPG/SVG/ICO/WEBP/AVIF
- X-DNS-Prefetch-Control: on
- Image-Optimizer mit 30-Tage-TTL

Vercel-Default-Headers reichen. **KEIN Fix nötig.** ✓

---

### Nicht-Probleme (zur Beruhigung)

| Bereich | Status |
|---|---|
| Server-Rendering / TTFB | ✓ Alle Pages SSG/static prerendered, kein Cold-Start-Risiko |
| `next.config.mjs` Cache/Compression | ✓ Korrekt — `compress: true`, Image-Optimizer aktiv |
| `next/font` Setup | ✓ Optimal — `display: 'swap'`, Latin-Subset only |
| react-icons / lodash / moment | ✓ Nicht im Projekt — clean dep-tree |
| Raw `<img>`-Tags | ✓ Nur 1 Vorkommen (Print-only Logo), keine LCP-Bilder |
| `vercel.json` | ✓ Nicht nötig, Headers via next.config.mjs |

---

## LCP-Element-Hypothesen pro Audit-URL

PageSpeed Insights notiert das LCP-Element im "Diagnostics → Largest Contentful Paint element"-Block. Karsten könnte das bei Gelegenheit nachtragen, hier die fundierte Code-Hypothese:

| URL | Wahrscheinliches LCP-Element | Begründung |
|---|---|---|
| `/` (Homepage) | `<h1>rechenfix.de — Fix gerechnet!</h1>` oder Tipp-des-Tages-Card | Above-the-Fold, kein Bild — H1 ist groß genug für LCP. Hydration des TippDesTages-Subtree verzögert es. |
| `/finanzen/brutto-netto-rechner` | Rechner-Card (Inputs + Result-Box) | Above-the-Fold, größtes Surface-Area-Element. Hydration blockiert durch 2 MB JS. |
| `/finanzen/3000-euro-brutto-netto` | LongTail-Subtype-Block (statisch) | Static Content im SSR — sollte schnell sein. Score 81 / LCP 5,0 s deutet darauf, dass auch hier Shared-Chunks die Bremse sind. |
| `/gesundheit/bmi-rechner` | BMI-Rechner-Card oder Erklärtext-Card | Score 63 / LCP 8,0 s ist der schlechteste Wert — vermutlich Mobile-spezifisches CSS-Layout-Issue plus 546 KB JS |
| `/wohnen/mietrechner` | MietrechnerRechner-Card | Standard-Rechner-Pattern, 2 MB JS, LCP 6,8 s |
| `/ueber-uns` | **Karsten-Foto** (950 KB JPG) | 79 Score / 5,5 s LCP passt zu großem Hero-Image — Image-Optimizer-Processing + 200 KB+ ausgespielte Datei |

Alle LCP-Elemente sind **statische DOM-Elemente, die schon im SSR-HTML stehen**. Das LCP wartet aber auf `domContentLoaded` (=alle Render-Blocking-Resources geladen) UND ggf. auf Hydration, weil dann CLS-relevante Reflows passieren können.

**Schlussfolgerung:** Auch wenn das LCP-Element selbst statisch ist, killt die JS-Last die Anzeige-Zeit, weil Browser auf Main-Thread-Idle wartet, bevor er "die Page ist fertig" annimmt. Genau das misst LCP auf Mobile.

---

## Phase-2-Sprint-Vorschlag

### Reihenfolge nach Impact/Risiko/Aufwand

| # | Fix | Aufwand | Risiko | LCP-Impact | Score-Impact |
|---|---|---|---|---|---|
| 1 | **C1: dynamic() für 175 Rechner-Components** | ~2 h | niedrig | **−2 bis −4 s** | +20–25 |
| 2 | **H1: Karsten-Foto komprimieren + `priority`** | ~15 Min | niedrig | −0,5 bis −1 s (`/ueber-uns`) | +5–10 (nur `/ueber-uns`) |
| 3 | **M1: TippDesTages entlasten** | ~30 Min | niedrig | −0,3 bis −0,8 s (Homepage) | +3–8 (nur `/`) |
| 4 | **M4: Mega-Menu-Inhalt dynamic** | ~20 Min | niedrig | −0,1 bis −0,2 s | +2–4 |
| 5 | **M3: Sidebar auf Top-10 limitieren** | ~30 Min | mittel (UX-Entscheidung) | −0,1 bis −0,3 s | +2–5 |
| 6 | **H3: CSS-Diet** | ~1–2 h | niedrig | −0,2 bis −0,5 s (alle Pages) | +3–8 |
| — | H2: next/script (AdSense) | parkt | — | — | — |

### Empfehlung Phase 2

**Sprint W15C T2 (Quick-Win-Batch, 1 Session):**
- Fix C1 + H1 + M1 + M4 in **einem** Sprint, 3–4 atomare Commits, ~3 h
- Erwartetes Ergebnis: LCP-Sprung von 5,5–7,1 s auf 2,5–4 s auf allen 6 PageSpeed-URLs, Score von 60–80 auf 80–95
- Karsten verifiziert per Inkognito + neuer PageSpeed-Lauf direkt nach Deploy

**Sprint W15C T3 (Optional, bei Bedarf):**
- M3 + M5 + H3 als nachgelagerte Optimierung — nur wenn nach T2 noch Spielraum nötig ist
- ~2 h

**Sprint W15C T4 (NACH AdSense-Freigabe):**
- H2 next/script-Refactor (Prompt 85 entsperren) — separater Mini-Sprint

### Risiko-Hinweise zu C1

`next/dynamic` mit Default `ssr: true` ist **AdSense-konform** — Crawler bekommt den HTML weiterhin via SSR ausgeliefert, nur der Client-Hydration-Bundle wird gesplittet. **Aber:** Wenn jemand fälschlich `{ ssr: false }` setzt, würde der Rechner-Body im SSR-HTML als Loading-Placeholder erscheinen → ähnliche Falle wie damals `<LazySection>` (Lehre 25, Prompt 154). Beim Refactor `ssr: true` als Standard sicherstellen, kein `ssr: false` für Rechner-Components.

Optional: `loading: () => <div className="min-h-[600px]" />` als Loading-Skeleton — verhindert CLS, weil die Reservation-Box bereits im SSR-HTML steht.

---

## Bundle-Analyzer (NICHT installiert)

Karsten erlaubte in Phase 1 explizit die Installation von `@next/bundle-analyzer` als temporäres Diagnose-Tool. **Ich habe darauf verzichtet**, weil:

1. Der 2,1 MB Chunk hat eine eindeutige Ursache (Z. 14–183 von page.tsx + Z. 216–387)
2. Bundle-Analyzer würde nur die Verteilung INNERHALB der 2,1 MB visualisieren — 175 kleine Kuchen-Stücke à 5–30 KB
3. Der Mehrwert für Phase 1 wäre minimal; der zusätzliche Devtool im Repo + Config-Wrapper-Aufbauten wären nach Bericht wieder rückzurollen

**Falls Karsten in Phase 2 doch die Visualisierung möchte:** `npm install --save-dev @next/bundle-analyzer` + `withBundleAnalyzer`-Wrapper um `nextConfig` + `ANALYZE=true npm run build` → öffnet automatisch Treemap im Browser. ~5 Min Setup. Empfehlung: erst NACH dem C1-Fix laufen lassen, um zu verifizieren dass die 175 Components weg sind aus dem Initial-Bundle.

---

## STOP

Phase 1 ist hier zu Ende. **Karsten entscheidet, ob T2-Sprint losgehen darf** und welchen Scope (alle 4 Top-Items oder nur C1 als Solo-Sprint).

Erwartetes Phase-2-Gesamt-Aufwand: 3–6 h (T2 + T3 zusammen), davon ~2 h für den C1-Bulk-Edit.
