# W15A Track 2 — Trust-Tags (Author-Mini-Bio + Aktualisiert-Datum) Scoping

**Stand:** 21.05.2026 (Phase 1, Read-only)
**Trigger:** Welle-15-Tiefenanalyse Sekundärfaktoren — Author-Mini-Bio + „Aktualisiert"-Datum fehlen auf Top-10-Rechner-Seiten. Beides E-E-A-T-Trust-Signale, die blitzrechner auf jeder Rechner-Seite hat.

---

## A) Aktualisiert-Datum — Architektur-Scoping

### A.1 Bestehendes Datum-Pattern (Bestandsaufnahme)

**Repo-Realität:**

| Stelle | Pattern | Datei |
|---|---|---|
| Datenschutz-Page | Inline-JSX-String `Stand: Mai 2026` | [app/datenschutz/page.tsx:29](app/datenschutz/page.tsx) |
| Über-uns-Page | Konstante `const LAST_UPDATED = '20. Mai 2026'` am Dateianfang, gerendert ganz am Seitenende | [app/ueber-uns/page.tsx:9 + 334](app/ueber-uns/page.tsx) |
| Rechner-Seiten | **kein** Stand-Datum vorhanden — bisher leere Stelle |

→ Es existiert **kein konsistentes Pattern**. Für Track-2 setzen wir das neue Property-basierte Pattern, das beide bestehenden Pages später angleichen können (out-of-scope für Track-2).

### A.2 Render-Position-Empfehlung

**Karstens Vorgabe (Z. 54):** „kleiner Hinweis oben unter H1, dezent (`text-sm text-gray-500`), analog blitzrechner".

**Problem:** Die zentrale Page [app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx) rendert kein eigenes H1 — das H1 kommt aus der jeweiligen Rechner-Component (z. B. `BruttoNettoRechner`-internal). Position „unter H1" wäre nur durch Modifikation jeder einzelnen Rechner-Component machbar (170 Files).

**Pragmatische Alternative — drei Optionen:**

| Option | Stelle in page.tsx | Vor- / Nachteil |
|---|---|---|
| **A** | Zwischen Breadcrumbs und „Zurück-Button" (Z. 420–432) | Sehr nah am Seitenanfang; einzige Edit-Stelle für alle 170 Rechner; oben sichtbar; geringe Reibung |
| B | Zwischen FAQ und Quellen (Z. 562) | Unauffällig, mitten in der Page |
| C | Am Seitenende (vor Schließ-`</div>`) | Wie bei Über-uns; ganz unten |

**Empfehlung: Option A** — eine einzige Stelle in `app/[kategorie]/[rechner]/page.tsx`, oben sichtbar nach Breadcrumbs, kein Eingriff in Rechner-Components nötig.

**Format-Vorschlag:**

```tsx
{config.letzteAktualisierung && (
  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 no-print">
    Aktualisiert am {formatGermanDate(config.letzteAktualisierung)}
  </p>
)}
```

Helper `formatGermanDate` parst `YYYY-MM-DD` → „21. Mai 2026".

### A.3 Datenquelle

**Karstens Vorgabe (Z. 39):** „Aktualisiert-Datum initial für ALLE 170 Rechner gesetzt (heute: 2026-05-21), bei künftigen Sprint-Änderungen pflegt Code pro betroffenem Rechner."

→ Property `letzteAktualisierung?: string` (ISO `YYYY-MM-DD`) in jeder Config, **initial alle 170 Configs** mit `'2026-05-21'`.

Eintrag-Pattern in jeder Config (analog zu `quellen`/`affiliate`):

```typescript
{
  slug: '...',
  // ... bestehende Properties ...
  letzteAktualisierung: '2026-05-21',
}
```

**Volumen-Hinweis:** 170 Configs × eine zusätzliche Property-Zeile = ~170 Edits in 9 Kategorie-Files. Das ist ein bewusster Trade-off (initial-Setup), Phase-2-Aufwand ~30–45 Min davon.

---

## B) Author-Mini-Bio — Component-Scoping

### B.1 Foto-Asset (kritische Aktualisierung)

**Prompt sagt** (Z. 19, 42, 64): `public/about/karsten-kautz.jpg`

**Repo-Realität nach Cache-Bust-Sprint heute** (Commits `934137b` + `af6485a`):
- Datei liegt unter **`public/about/karsten-kautz-v2.jpg`** (Versions-Suffix für Vercel-Image-Optimizer-Cache-Bust)
- Code-Pfad in `app/ueber-uns/page.tsx` Z. 30/87: `karsten-kautz-v2.jpg`
- Pattern dokumentiert in Inline-Kommentar: bei künftigem Foto-Tausch auf `-v3.jpg` rotieren

**Empfehlung Track-2:** identischen Pfad `/about/karsten-kautz-v2.jpg` nutzen. Bei künftiger Foto-Versionierung (v3, v4) müssen dann zwei Code-Stellen mit-bumpen (ueber-uns + Author-Mini-Bio-Component) — Tooling-Hinweis im Inline-Kommentar empfohlen. **Siehe Klärungsfrage 1.**

### B.2 Style-Vorbild

**Über-uns Author-Block** ([app/ueber-uns/page.tsx](app/ueber-uns/page.tsx) Z. 80–107):
- Foto: `<Image width={200} height={200} className="rounded-2xl">`
- Layout: `flex flex-col sm:flex-row items-start gap-5`, mit Border-Top
- Text: Name fett `text-lg`, Subtitle `text-sm text-gray-600`, Ort `text-sm text-gray-500`

**Für Track-2 kleinere Variante** (Karsten-Vorgabe Z. 67):
- Foto: 64×64px oder 80×80px (statt 200)
- Tagline auf 1–2 Sätze
- Link „Mehr über mich" → `/ueber-uns`

### B.3 Render-Position — drei Optionen

Aktuelle Page-Flow auf [app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx):

1. Schema-Tags (FAQ, WebApp, Breadcrumb) — `<head>`-injection
2. Breadcrumbs (Z. 413–419)
3. Zurück-Button (Z. 430–432)
4. **Rechner-Component** (config-driven, ~Z. 434–533)
5. Erklärtext-Card (Z. 535–540)
6. **FAQ-Card** (Z. 542–560)
7. **Quellen-Card** (NEU W15A.3, Z. 562–566)
8. **Affiliate-Boxen** (Z. 568–587)
9. Verwandte Rechner (Z. 600+)

| Option | Position | Begründung |
|---|---|---|
| 1 | Zwischen FAQ und Quellen (Z. 562) | Setzt Author **vor** Citations — falsche Hierarchie für E-E-A-T |
| **2** | **Zwischen Quellen und Affiliate (Z. 568)** | Substantia → Citations → Authorship → Commercial. AdSense-Reviewer-Lesepfad ideal |
| 3 | Nach Affiliate, vor Verwandte | Author hinter Werbung → trust-untergrabend |

**Empfehlung: Option 2** — nach Quellen, vor Affiliate.

**Layout-Skizze:**

```tsx
{/* Author-Mini-Bio — NEU W15A.2, nur bei config.zeigtAuthorBio === true */}
{config.zeigtAuthorBio && <AuthorBio />}
```

Component selbst rendert die kleine Card mit Foto + Text + Link. Datei `components/AuthorBio.tsx`.

### B.4 Aktivierungs-Property

**Karstens Vorgabe:** `zeigtAuthorBio?: boolean` (default false), initial nur Top-10.

10 Configs mit `zeigtAuthorBio: true` — identische 10 Slugs wie bei W15A.3 Quellen-Section:

```
brutto-netto-rechner, mwst-rechner, zinsrechner, stundenlohn-rechner,
bmi-rechner, spritkosten-rechner, dreisatz-rechner, tagerechner,
mietrechner, stromkosten-rechner
```

→ alle Top-10 haben dann zukünftig: `quellen`-Array, `zeigtAuthorBio: true`, `letzteAktualisierung: '...'`.

---

## C) Type-Definition

### C.1 Bestehende Convention prüfen

Aktueller [lib/rechner-config/types.ts](lib/rechner-config/types.ts):

```typescript
export interface RechnerConfig {
  // Pflichtfelder ...
  faq: { frage: string; antwort: string }[];
  affiliate?: AffiliateConfig | AffiliateConfig[];
  quellen?: QuelleConfig[];
}
```

Aktuell **keine** Boolean-Property in `RechnerConfig` — `zeigtAuthorBio?: boolean` wäre die erste. **Keine Convention-Verletzung**, weil Booleans semantisch passend sind für Toggle-Properties.

**Aktuell keine** ISO-Datum-Property — `letzteAktualisierung?: string` als erstes Datum-Feld. String-Format `YYYY-MM-DD` ist idiomatisch (lässt sich serialisierungs-frei in Config-Files schreiben + bei Render zu lokalisiertem Datum parsen).

### C.2 Vorschlag

```typescript
export interface RechnerConfig {
  // ... bestehende Felder ...
  affiliate?: AffiliateConfig | AffiliateConfig[];
  quellen?: QuelleConfig[];

  /**
   * Optional: ISO-Datum (YYYY-MM-DD) der letzten substantiellen Aktualisierung
   * dieses Rechners. Wird oben unter Breadcrumbs als „Aktualisiert am …"
   * gerendert und in Schema.org WebApplication.dateModified ausgespielt
   * (Google-Signal). Initial in W15A.2 für alle 170 Rechner gesetzt; bei
   * Sprint-Änderungen pro betroffenem Rechner bumpen.
   */
  letzteAktualisierung?: string;

  /**
   * Optional: Wenn true, wird Author-Mini-Bio (Karsten-Foto + Tagline +
   * Verweis auf /ueber-uns) post-Quellen, vor Affiliate-Boxen gerendert.
   * Default false. Initial in W15A.2 nur für Top-10-Rechner aktiviert.
   */
  zeigtAuthorBio?: boolean;
}
```

---

## D) Schema.org `dateModified` — Strategie

### D.1 Bestandsaufnahme JSON-LD

**JSON-LD existiert bereits**, sauber strukturiert in [lib/seo.ts](lib/seo.ts) mit Helper-Funktionen + Rendering via [components/seo/StructuredData.tsx](components/seo/StructuredData.tsx):

```tsx
// StructuredData.tsx — minimaler Wrapper
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
```

**Drei Schemas pro Rechner-Seite** ([app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx) Z. 406–410):

1. **FAQPage** (`generateFAQSchema`) — bei nicht-Inline-Erklär-Slugs
2. **WebApplication** (`generateWebApplicationSchema`) — IMMER
3. **BreadcrumbList** (`generateBreadcrumbSchema`) — IMMER

Plus global im Root-Layout: **WebSite** ([app/layout.tsx:112](app/layout.tsx)).

**Aktuelles `WebApplication`-Schema** ([lib/seo.ts:90–112](lib/seo.ts)) hat folgende Felder:
- `name`, `description`, `url`
- `applicationCategory: 'UtilityApplication'`
- `operatingSystem: 'All'`, `browserRequirements: 'Requires JavaScript'`
- `offers: { price: '0', priceCurrency: 'EUR' }`
- `inLanguage: 'de'`
- `author: { @type: 'Organization', name: 'Rechenfix.de', url: '...' }`

**KEIN `dateModified`-Feld vorhanden** — das ist die Lücke, die W15A.2 schließt.

### D.2 Empfehlung — Ergänzung statt Neuanlage

**Saubere Lösung:** `dateModified` in `generateWebApplicationSchema` ergänzen. **KEIN** zusätzliches `WebPage`-Schema neu anlegen — wäre Duplikat-Signal (WebApplication ist semantisch enger, Google liest dateModified daraus zuverlässig).

**Code-Skizze ([lib/seo.ts](lib/seo.ts)):**

```typescript
export function generateWebApplicationSchema(rechner: RechnerConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: rechner.titel,
    description: rechner.beschreibung,
    url: `${SITE_URL}/${rechner.kategorieSlug}/${rechner.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'de',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    // NEU W15A.2: dateModified als Google-Signal
    dateModified: rechner.letzteAktualisierung ?? '2026-05-21',
  };
}
```

**Fallback-Strategie:** `?? '2026-05-21'` (= Initial-Set-Datum). Bei nicht-gesetzter Property zeigt der Schema immer den Initial-Set-Wert — sicherer als gar kein Feld. Bei Sprint-Updates aktualisiert Karsten/Claude die Property pro Rechner.

**Standalone-Meta-Tag NICHT zusätzlich** (Prompt Z. 103–104) — Duplikat-Signal.

**Betroffene Dateien:**
- [lib/seo.ts](lib/seo.ts) — `generateWebApplicationSchema`-Erweiterung
- [lib/rechner-config/types.ts](lib/rechner-config/types.ts) — Type-Erweiterung
- 9 Kategorie-Configs (`alltag.ts`, `finanzen.ts`, …) — initial 170 Einträge
- [app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx) — Aktualisiert-Datum-Render + AuthorBio-Render
- **Neue Datei:** `components/AuthorBio.tsx`
- **Neue Datei** (optional): `lib/format-date.ts` für `formatGermanDate`-Helper

---

## E) Author-Mini-Bio-Inhalt — Bestätigung

### E.1 Karstens Vorschlag (Prompt Z. 110–116)

```
[Foto-Thumbnail]  Karsten Kautz | Gründer und Betreiber von Rechenfix.de
                  Pflegt alle Rechner aktuell und prüft Werte jährlich
                  anhand der Primärquellen.
                  → Mehr über mich
```

### E.2 Faktencheck gegen L-W15A.3-3

- ✅ „Pflegt alle Rechner aktuell" — keine konkrete Anzahl (drift-frei bei Wachstum auf 200+ Rechner)
- ✅ „prüft Werte jährlich anhand der Primärquellen" — qualitative Aussage, durch Audit-Workflow-Doku belegt ([welle-status-historie.md](welle-status-historie.md) + Verify-Scripts + /qualitaet)
- ✅ Keine Berufsbezeichnung („Software-Entwickler" o. ä.)
- ✅ Keine quantitativen Aussagen ohne Basis
- ✅ Verweis auf Über-uns-Seite als Tiefen-Quelle

**Empfehlung:** Vorschlag verbatim übernehmen, nur kleine sprachliche Verfeinerung optional:

```
Karsten Kautz · Gründer und Betreiber von Rechenfix.de
Pflegt alle Rechner aktuell und prüft die Werte jährlich
anhand der Primärquellen.
Mehr über mich →
```

Mittel-Punkt (·) statt Pipe (|) als Trenner — sieht typografisch ruhiger aus.

---

## Klärungsfragen für Karsten

1. **Foto-Pfad-Diskrepanz:** Prompt sagt `public/about/karsten-kautz.jpg`, aber heute Vormittag wurde via Cache-Bust-Sprint auf `karsten-kautz-v2.jpg` umbenannt (Commits `934137b` + `af6485a`). Bestätigt: in Track-2 nutzen wir den **aktuellen `-v2`-Pfad**, NICHT den Prompt-Pfad?

2. **Render-Position Author-Mini-Bio:** Empfehlung **Option 2** (nach Quellen, vor Affiliate — Substantia→Citations→Authorship→Commercial-Hierarchie). OK?

3. **Render-Position Aktualisiert-Datum:** Empfehlung **Option A** (zwischen Breadcrumbs und Zurück-Button, statt Karstens „unter H1"-Vorgabe — weil H1 in Rechner-Components steckt und Per-Component-Edit 170 Files wären). OK?

4. **`dateModified`-Fallback:** Hardcoded `?? '2026-05-21'` in `generateWebApplicationSchema` für Rechner ohne gesetzte `letzteAktualisierung`-Property — oder Feld komplett weglassen wenn nicht gesetzt (statt Fallback)? Empfehlung: Fallback nutzen, weil das Initial-Set-Datum eine ehrliche Aussage ist.

5. **Top-10 vs. ALLE 170 für Aktualisiert-Datum-Property:** Karstens Vorgabe „initial für ALLE 170 Rechner" eindeutig — wir setzen `letzteAktualisierung: '2026-05-21'` in alle 170 Configs. Bestätigung.

6. **Trenner-Glyph Author-Bio:** Pipe (`|`) wie Karstens Original, oder Mittelpunkt (`·`) wie Empfehlung in E.2? Beide funktional gleichwertig.

7. **`formatGermanDate`-Helper-Datei:** Eigene Datei `lib/format-date.ts` oder Inline in `app/[kategorie]/[rechner]/page.tsx`? Bei nur einer Aufruf-Stelle wäre Inline ok, aber für Wiederverwendung (z. B. später auch Über-uns) wäre Helper-File sauberer. Tendenz: eigene Helper-Datei.

---

## STOP — Karsten bestätigt Scoping vor Phase 2

**Phase-2-Aufwand-Schätzung:**
- Type-Erweiterung + AuthorBio-Component + format-date-Helper: ~20 Min
- 170 Configs mit `letzteAktualisierung` (in 9 Files): ~30–45 Min
- 10 Configs mit `zeigtAuthorBio: true`: ~5 Min
- Renderer-Integration in page.tsx: ~10 Min
- `dateModified` in lib/seo.ts: ~5 Min
- Build + Preview-Verifikation: ~10 Min
- Doku: ~15 Min
- **Gesamt: ~90–110 Min, kein Lib-Refactor**

**Was NICHT in Track-2 fällt** (laut Prompt-Sektion „Was NICHT"):
- Datenschutz-Page-Pattern-Angleichung
- Über-uns Aktualisiert-Block-Angleichung
- Vollständiges Calculator/SoftwareApplication-Schema
- Long-Tail W15B, Sport-Ausbau, Mobile LCP — alles Welle-16-Backlog

---

## Update 21.05.2026 — Phase 2 abgeschlossen

Alle 7 Klärungsfragen umgesetzt. Commits:
- `b093649` — `feat: foundation für trust-tags (types + format-date + foto-konstante)`
- `9311c6b` — `feat: aktualisiert-datum + schema.org dateModified für alle 170 rechner`
- `8a861dc` — `feat: author-mini-bio component + top-10-aktivierung`
- (folgt) — `docs: welle 15a track 2 dokumentiert`

3 neue L-Lehren etabliert (L-W15A.2-1 bis L-W15A.2-3) — siehe [welle-status-historie.md](welle-status-historie.md) W15A-Track-2-Block für Details.
