# W15C T5 — Code-Sauberkeit-Audit (Phase 1)

**Stand:** 22.05.2026
**Modus:** READ-ONLY (Bestandsaufnahme, keine Fixes)
**Scope:** 9 Audit-Bereiche A–I aus dem Sauberkeit-Prompt
**Datenbasis:** lokaler Working-Tree + `npm run build` + `npm run lint` + `node scripts/slug-drift-scan.mjs`

---

## Executive Summary

**Headline:** Der Code ist in deutlich besserer Verfassung, als die Prompt-Hypothese annimmt. **Keine KRITISCHEN Befunde.** AdSense-Reviewer finden kein "halbfertig"-Signal in der technischen Site-Qualität. Die Welle-2/Welle-3-Audits + die Pre-Build-Guards (Slug-Drift, Jahreswerte, Backticks, Footer) haben den Großteil der typischen Sauberkeits-Issues bereits eliminiert.

**Bilanz nach Schwere:**

| Schwere | Anzahl | Bereich |
|---|---:|---|
| KRITISCH | **0** | — |
| MITTEL | **2** | C1 (Dead-Slug), C2 (Dead-Component) |
| NIEDRIG | **8** | C3, B1, H1, I1, I2, I3, +2 minor |

Alle 10 Befunde zusammen sind in ~1,5 h zu fixen. Keine Pflicht-Vorbedingung für AdSense-Resubmit.

---

## A) Slug-Konsistenz ✓ SAUBER

**Methoden:** `node scripts/slug-drift-scan.mjs --verbose`, manuelle hrefs-vs-SSOT-Diff, verwandteMap-vs-SSOT-Diff, Naming-Pattern-Analyse.

**Ergebnis:**
- Slug-Drift-Scan: **0 Drifts** (170 SSOT-Slugs, 11 Meta-Routes, 5 whitelisted)
- 116 cat-slug hrefs in Code, **alle in SSOT** (einzige Ausnahme `/finanzen/brutto-netto-tabelle` ist Long-Tail-Route, gewollt)
- 9 Kategorie-Slugs konsistent (`alltag/arbeit/auto/finanzen/gesundheit/kochen/mathe/sport/wohnen`)
- 170/170 Rechner-Slugs in der `rechnerKomponenten`-Map in [app/[kategorie]/[rechner]/page.tsx](../../app/[kategorie]/[rechner]/page.tsx)
- 0 Komponenten-Map-Einträge ohne SSOT-Entsprechung

**Naming-Patterns (Stilistik, nicht Inkonsistenz):**
- 130 Slugs mit `-rechner` (Bindestrich)
- 27 Slugs mit `rechner` zusammen (bruchrechner, mietrechner, zinsrechner, etc.)
- 7 Slugs mit `-umrechner` (Bindestrich)
- 6 Slugs ohne rechner-Suffix (countdown, gehaltsvergleich, nettolohn-optimierer, noten-international, wahrer-stundenlohn, zufallszahl-generator)

Die zusammengeschriebenen Varianten sind historisch (frühe Welle), die Bindestrich-Varianten neuer Standard. Migration wäre Slug-Drift-Risiko — bleibt bewusst so.

---

## B) 404-Risiken — 1 NIEDRIG

### B1 — Leere Override-Verzeichnisse (NIEDRIG)

`app/finanzen/brutto-netto-rechner/` und `app/finanzen/mwst-rechner/` sind **leere Verzeichnisse** ohne `page.tsx`. Beide Rechner laufen über die dynamische `[kategorie]/[rechner]/page.tsx`-Route. Die leeren Verzeichnisse sind Reste früherer statischer Override-Versuche.

**Auswirkung:** Keine — leere Verzeichnisse erzeugen in Next.js keine Routen.
**Reviewer-Signal:** Auch keins — Reviewer sehen das nicht.
**Fix:** `rm -r app/finanzen/brutto-netto-rechner app/finanzen/mwst-rechner`. ~30 Sekunden.

### Sonstige Befunde B (alle sauber):

- `STATISCHE_OVERRIDES` und `INLINE_ERKLAERUNG_SLUGS` jeweils 1 Slug, beide in Configs **vorhanden** ✓
- `generateStaticParams()` filtert `STATISCHE_OVERRIDES` korrekt aus ✓
- Karstens bekannter 404 `/alltag/einheiten-umrechner`: korrekter Slug ist `/mathe/einheiten-umrechner`. **Kein interner Verweis** auf die falsche URL — der 404 kommt aus externen Backlinks oder alter Search-Console-Discovery. Klassischer Fall von Lehre 14 (Slug-Kategorie-Intuition: "Einheiten-Umrechner" wird unter Alltag erwartet, liegt aber unter Mathe).

**Optionaler Fix (separat):** 301-Redirect `/alltag/einheiten-umrechner → /mathe/einheiten-umrechner` in [next.config.mjs](../../next.config.mjs) ergänzen. ~2 Min.

---

## C) Dead-Components + Imports — 3 Befunde

### C1 — Toter Slug `herzfrequenz-rechner` in `lib/rechner-config/index.ts` (MITTEL)

Der Slug `herzfrequenz-rechner` ist nicht mehr in den Rechner-Configs (Konsolidierung April 2026 → `/sport/herzfrequenz-zonen-rechner`), aber 4 alte Verweise leben weiter:

| Datei:Zeile | Verwendung | Auswirkung |
|---|---|---|
| `lib/rechner-config/index.ts:179` | Eintrag in `neueRechnerSlugs` | Wenn unter den ersten 3 in der Liste → Homepage „Neu hinzugefügt" würde 1 leere Karte zeigen. Aktuell aber Position 24 → unsichtbar |
| `lib/rechner-config/index.ts:414` | KEY in `verwandteMap` | Dead-Code, wird nie matched (kein Rechner heißt so) |
| `lib/rechner-config/index.ts:429` | VALUE in `verwandteMap['pace-rechner']` | `getVerwandteRechner` filtert `undefined` raus → 1 statt 4 Items im Slot → Fallback aktiv |
| `lib/rechner-config/index.ts:430` | VALUE in `verwandteMap['herzfrequenz-zonen-rechner']` | Wie oben |

**Auswirkung:** Niemand kriegt einen 404 (301-Redirect in `next.config.mjs` ist gepflegt), aber zwei Pages haben Fallback-statt-Curated-Verwandte. Bei `pace-rechner` z. B. werden `kalorienrechner`, `einheiten-umrechner` + Fallback-Filler gezeigt statt der ursprünglich geplanten 4er-Set.

**Fix:** Den String `'herzfrequenz-rechner'` aus den 4 Stellen entfernen + `herzfrequenz-zonen-rechner` als Ersatz in `neueRechnerSlugs` belassen (steht da implizit weiter, ist OK). ~5 Min Bulk-Edit.

### C2 — Dead-Component `components/layout/HeaderSearch.tsx` (MITTEL)

Datei existiert, wird aber in **keinem App-File** mehr importiert. Vermutlich Rest aus Pre-Mega-Menu-Header-Variante. Tree-Shaking eliminiert sie aus dem Build, aber der Source-File ist tote Last im Repo.

**Fix:** `rm components/layout/HeaderSearch.tsx` + git commit. ~30 Sekunden.

### C3 — Loose Root-Level-Files (NIEDRIG)

5 untracked Files im Repo-Root, weder in `.gitignore` noch committed:
- `brutto-netto-raw.html`
- `doku-sync-04-05-2026-patch.md`
- `history-check.docx`
- `history-check.pdf`
- `sitemap-live-2026-05-05.xml`

**Auswirkung:** Reviewer sehen das nicht (auf GitHub nicht sichtbar), aber lokale Repo-Hygiene leidet — wirkt wie verlassene Arbeitskopien.

**Fix:** Zwei Varianten:
- a) In `.gitignore` ergänzen (`/brutto-netto-raw.html`, `/history-check.*`, `/sitemap-live-*.xml`, `/doku-sync-*-patch.md`)
- b) In `docs/audit-arbeitspapiere/_archiv/` verschieben + committen

~5 Min.

### Sonstige C (sauber):

- 175 Files in `components/rechner/`: 170 sind Slug-Components (alle in Map), 5 sind Helper (AiExplain 170× verwendet, SchnellCheck/WasWaereWenn in BNR, SchlafTipp in SchlafRechner, StromSpartipp in StromkostenRechner). Keine Toten.
- 28 Components außerhalb `rechner/`: alle aktiv genutzt (1× HeaderSearch ausgenommen, siehe C2)
- Auskommentierter Code: **keine** TODO/FIXME/HACK-Blöcke außer 2 dokumentierte Lib-TODOs (kindergeld.ts:66 zvE-Refinement, pflegeversicherung.ts:4 Sachsen-Sondersatz)
- Keine `.bak`/`.old`/`.orig`-Files
- `lib/berechnungen/_lookup-archiv/` existiert wie dokumentiert (Prompt 118-Lookup-Tabelle archiviert, nicht aktiv)

---

## D) Metadata-Inkonsistenzen ✓ SAUBER

**Methode:** Automatisierte Längen-Audits aller 170 Rechner-Configs + manuelle Stichprobe der 10 statischen Pages.

**Ergebnis:**

| Check | Anzahl Issues |
|---|---:|
| `metaTitle` > 60 Zeichen (SERP-Cutoff) | **0** |
| `metaTitle` < 30 Zeichen (zu kurz) | **0** |
| `metaDescription` > 160 Zeichen | **0** |
| `metaDescription` < 100 Zeichen | **0** |

Karstens 155-Zeichen-Regel aus CLAUDE.md hält bei allen 170 Configs perfekt.

**Statische Pages (Über-uns, Qualität, Datenschutz, Impressum, Barrierefreiheit, Feedback, ki-rechner, wohngeld-rechner, brutto-netto-tabelle, mindestlohn-netto):**
- Alle haben `title`, `description`, `alternates.canonical`
- Alle Canonicals mit `https://www.rechenfix.de/...` (mit www) ✓
- Alle OG-Image-URLs zeigen auf `https://www.rechenfix.de/opengraph-image` ✓
- `app/opengraph-image.tsx` existiert (next/og Edge-Runtime-Generator) ✓
- `/ki-rechner` hat korrekt `robots: { index: false, follow: false }` (W15A.4) ✓

`generateRechnerMetadata` in [lib/seo.ts](../../lib/seo.ts) setzt alle Pflichtfelder konsistent.

---

## E) JSON-LD-Schema-Konsistenz ✓ SAUBER (1 subtiles Pattern)

**Coverage:**
- Root-Layout: `generateWebsiteSchema()` (1× site-weit) ✓
- Kategorie-Pages: `generateBreadcrumbSchema` ✓
- Dynamische Rechner-Pages: `generateBreadcrumbSchema` + `generateWebApplicationSchema` + `generateFAQSchema` (außer INLINE_SLUGS) ✓
- `/finanzen/brutto-netto-rechner` (Inline-Slug): `generateFAQSchema` von der Route skipped, BNR.tsx rendert eigenes FAQPage inline (Z. 722–735) → genau 1× FAQPage pro Page ✓
- Long-Tail-Pages: `BruttoNettoLongTail` rendert Breadcrumb + FAQ + WebPage-Schema ✓
- `/finanzen/wohngeld-rechner` (statische Erklär-Page): Breadcrumb + FAQ (kein WebApplication, weil keine Calculator) ✓

**Subtilität (KEIN Befund, nur Notiz):** Das Inline-FAQPage-Schema in `BruttoNettoRechner.tsx` ist innerhalb des `{ergebnis && (...)}`-Branches gerendert (Z. 705–736). `ergebnis` ist `useMemo`-derivativ aus `brutto`-Default `'3500'` → im SSR immer truthy → wird gerendert. Defensiv codiert, aber kein Bug. Bei künftigen Refactorings (z. B. brutto-Default auf `''` setzen) würde das FAQPage-Schema im SSR-HTML fehlen — Test wäre dann nötig.

**Empfehlung Karsten:** Google Rich Results Test API mit einer URL pro Page-Typ als finale Verifikation vor Resubmit (≤ 5 Min, alles via Browser):
- https://www.rechenfix.de/ (Website)
- https://www.rechenfix.de/finanzen (Breadcrumb)
- https://www.rechenfix.de/finanzen/brutto-netto-rechner (WebApp + FAQ + Breadcrumb)
- https://www.rechenfix.de/finanzen/3000-euro-brutto-netto (WebPage + FAQ + Breadcrumb)
- https://www.rechenfix.de/finanzen/wohngeld-rechner (FAQ + Breadcrumb only)

---

## F) Image-Optimierung ✓ SAUBER (1 bekannte aus T1)

**Befund:**
- Raw `<img>`-Tags: **1 Vorkommen** ([app/[kategorie]/[rechner]/page.tsx:446](../../app/[kategorie]/[rechner]/page.tsx)) — bewusst (print-only Logo, kein next/image im Print-Context). ESLint-Warning bekannt, irrelevant.
- `<Image>`-Tags: 4 Vorkommen, **alle mit alt + explizitem width/height** ✓
- `/ueber-uns` Karsten-Foto mit `priority` (Above-the-Fold-LCP-Hint) ✓
- AuthorBio (72×72px Display) ohne `priority` (Below-the-Fold, korrekt) und ohne `sizes`-Hint — minor; Vercel Image-Optimizer würde mit `sizes="72px"` schmalere Variante prerenden statt 640px-Default. Optional Quick-Win ~2 Min.
- Public-Files: 4 (Foto + favicon + logo + ads.txt), **alle aktiv referenziert** ✓
- ads.txt korrekt mit Publisher-ID ✓

**Bekannt aus T1 (nicht in T5):** 950 KB Karsten-Foto unkomprimiert — siehe [w15c-t1-performance-diagnose.md](w15c-t1-performance-diagnose.md) H1.

---

## G) Performance-Sichtung

T1 hat das vertieft. Hauptbefund: **2,1 MB JS-Chunk** für dynamische Rechner-Route durch 175 statische Component-Imports. Siehe [w15c-t1-performance-diagnose.md](w15c-t1-performance-diagnose.md) C1.

**Quick-Sichtung im Sauberkeits-Rahmen:**
- next/font Inter mit `display: 'swap'` ✓
- AdSense raw `<script async>` in `<head>` — bekannt, gesperrt bis AdSense-Freigabe (Prompt 85)
- Tailwind-CSS 103 KB — moderater Wert, T1 H3
- Globals.css 145 Zeilen, schlank ✓

---

## H) robots.txt + sitemap.xml — 1 NIEDRIG

### H1 — `robots.ts` schützt `/ki-rechner` nur via meta-noindex (NIEDRIG)

[app/robots.ts](../../app/robots.ts):
```ts
{ rules: { userAgent: '*', allow: '/' }, sitemap: '...' }
```

`/ki-rechner` hat `robots: { index: false, follow: false }` in den Metadata (wirkt) und ist aus der Sitemap explizit ausgenommen (`app/sitemap.ts:38`). Aber im `robots.txt` selbst gibt es kein `disallow: '/ki-rechner'`. Crawler dürfen die Page weiterhin crawlen (sehen dann nur das noindex-meta).

**Empfehlung:** Belt-and-suspenders: `disallow: ['/ki-rechner']` im robots.ts ergänzen. ~30 Sekunden. Funktional kein Pflicht-Fix, weil noindex-meta + sitemap-Exclusion bereits effektiv sind.

### Sonstige H (sauber):

- `sitemap.ts` git-basierte mtime-Logik ✓
- Long-Tail-Slugs explizit gepflegt ✓
- Sonderseiten (brutto-netto-tabelle, mindestlohn-netto) explizit gepflegt ✓
- `/ki-rechner` nicht in Sitemap ✓
- Kategorie-Pages mit ihrer eigenen mtime ✓

**Notiz:** `letzteAktualisierung` aus Configs (W15A.2) wird in sitemap.ts NICHT als lastmod-Source verwendet — stattdessen `git log -1` pro Kategorie-Datei. Das ist eine valide Strategie, aber granularer pro Rechner wäre `letzteAktualisierung` als Vorzug, git-mtime als Fallback. Niedrige Priorität, sitemap-Granularität pro Kategorie reicht für Re-Crawl-Signale.

---

## I) Build + Lint Warnings — 3 NIEDRIG (alle bekannt/bewusst)

`npm run build` + `npm run lint`:

### I1 — `<img>`-Warning in `app/[kategorie]/[rechner]/page.tsx:446` (NIEDRIG)
```
Using `<img>` could result in slower LCP and higher bandwidth.
@next/next/no-img-element
```
**Status:** Print-only Logo, bewusst. ESLint-Suppress-Comment wäre Code-Cleanup-Item. ~30 Sekunden:
```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/logo.svg" alt="Rechenfix" width={32} height={32} />
```

### I2 — `useMemo` unnötige Dependency in `SchuhgroessenRechner.tsx:99` (NIEDRIG)
```
React Hook useMemo has an unnecessary dependency: 'typ'.
react-hooks/exhaustive-deps
```
**Status:** `tabelle` ist `useMemo`-derivativ aus `typ` (Z. 88), wird hier separat als Dependency aufgeführt. Funktionell egal, aber sauber wäre `[system, wert, tabelle]`. ~30 Sekunden.

### I3 — Edge-Runtime-Hinweis bei opengraph-image (NIEDRIG)
```
⚠ Using edge runtime on a page currently disables static generation
```
**Status:** Bewusst, OG-Image-Generierung via `next/og` Edge-Runtime ist Standard. Hinweis ist informativ, kein Fix nötig.

**Keine Errors. 0 TypeScript-Errors.**

---

## Befund-Übersicht nach Schwere

### KRITISCH (= AdSense-Risiko, sofort vor Resubmit)
**Keine.**

### MITTEL (= SEO/UX-Verlust)

| # | Datei | Problem | Fix-Aufwand |
|---|---|---|---|
| C1 | `lib/rechner-config/index.ts:179,414,429,430` | 4 tote Verweise auf alten Slug `herzfrequenz-rechner` | ~5 Min Bulk-Edit |
| C2 | `components/layout/HeaderSearch.tsx` | Dead-Component, nirgends importiert | ~30 Sek `rm` + commit |

### NIEDRIG (= Code-Hygiene)

| # | Datei | Problem | Fix-Aufwand |
|---|---|---|---|
| B1 | `app/finanzen/{brutto-netto-rechner,mwst-rechner}/` | Leere Override-Verzeichnisse | ~30 Sek |
| B-extra | `next.config.mjs` redirects | Optional: 301 `/alltag/einheiten-umrechner → /mathe/einheiten-umrechner` | ~2 Min |
| C3 | Root: 5 untracked Files | `.gitignore` oder verschieben | ~5 Min |
| H1 | `app/robots.ts` | Belt-and-suspenders `disallow: '/ki-rechner'` | ~30 Sek |
| F-extra | `components/AuthorBio.tsx` | `sizes="72px"` Hint für Image-Optimizer | ~2 Min |
| I1 | `app/[kategorie]/[rechner]/page.tsx:446` | ESLint-Suppress für Print-img | ~30 Sek |
| I2 | `components/rechner/SchuhgroessenRechner.tsx:99` | useMemo-Deps-Cleanup | ~30 Sek |

**Summe MITTEL+NIEDRIG: ~15 Min Bulk-Sprint.**

---

## Empfehlungs-Reihenfolge

### Pflicht vor AdSense-Resubmit: KEINE

Audit hat 0 kritische Befunde produziert. Der Resubmit braucht keine technische Sauberkeits-Vorbedingung.

### W15C T6 — Optionaler Cleanup-Sprint (~30–45 Min, atomarer Commit-Batch)

Wenn Karsten ohnehin gerade an W15C arbeitet, lohnt sich der Bulk-Cleanup als 1 Session:

1. **C1**: 4 Stellen `herzfrequenz-rechner` aus `lib/rechner-config/index.ts` entfernen
2. **C2**: `components/layout/HeaderSearch.tsx` löschen
3. **B1**: Leere Override-Verzeichnisse löschen
4. **C3**: `.gitignore` um 5 Root-Files erweitern
5. **H1**: `disallow: ['/ki-rechner']` in `app/robots.ts`
6. **I1+I2**: ESLint-Suppress + useMemo-Deps-Fix
7. **F-extra**: `sizes="72px"` Hint in AuthorBio (Foto-Optimizer-Tuning)
8. **B-extra**: 301-Redirect für `/alltag/einheiten-umrechner` (schließt einen real meldenden 404)

**Erwartete Ergebnisse:**
- 0 Lint-Warnings (war: 2)
- 0 Dead-Slug-Verweise (war: 4)
- 0 Dead-Components (war: 1)
- Cleaner Repo-Root
- 1 echtes Soft-404 weniger in Search Console (sofern man B-extra macht)

**Risiko:** Sehr niedrig. Pure Cleanup-Changes, keine Berechnungs- oder UX-Eingriffe.

### Zur Klärung der wohngeld-Lib-Schuld (separat)

Welle 1 Stufe 4b hat bekannt-dokumentiert ([CLAUDE.md](../../CLAUDE.md) "Architektur-Notes"): die `wohngeld.ts` Lib hat einen Architektur-Bug bei §§ 14-16 Pro-Person-Behandlung, deshalb läuft `/finanzen/wohngeld-rechner` seit Prompt 120d als Explainer-Seite. Refactoring war für „Juni 2026 gemeinsam mit Bürgergeld-Reform" geplant. **Kein Sauberkeits-Audit-Item**, sondern terminierte Arbeit. Hier nur erwähnt, damit es im Kopf bleibt.

---

## STOP

Phase 1 endet hier. Karsten entscheidet, ob W15C T6 als Cleanup-Sprint läuft (empfohlen: ja, 30–45 Min Investment für 0 offene Sauberkeits-Punkte) oder ob die Befunde als „bewusst akzeptiert" abgehakt werden.
