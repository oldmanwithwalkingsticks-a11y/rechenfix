# W15A.6: Sitemap-Vervollständigung + CLAUDE.md-Header-Sync

## Kontext
Nach W15A.5 (Aktualisierungen-Page) wurde beim Audit der URL-Zahlen
sichtbar:

- Aktuelle Sitemap: 189 URLs (170 Rechner + 9 Kategorien + 6 Long-Tail
  + 2 Sonderseiten + / + /aktualisierungen).
- 6 öffentliche Meta-Pages haben KEIN noindex, stehen aber nicht in
  der Sitemap: /ueber-uns, /qualitaet, /barrierefreiheit, /impressum,
  /datenschutz, /feedback. Kein dokumentierter Grund — historisch
  übergangen.
- CLAUDE.md-Header-Bullet sagt noch "178 Rechner-URLs in der Sitemap"
  — engere, vor-W15A.5-Zählung.

## Ziel
1. Die 6 Meta-Pages in app/sitemap.ts ergänzen (vor AdSense-Resubmit
   ist E-E-A-T-Crawl-Sichtbarkeit wichtig).
2. CLAUDE.md-Header-Bullet auf aktuelle, vollständige URL-Zahl heben.

## Scope

### 1) app/sitemap.ts
Neue Konstante `metaPages: MetadataRoute.Sitemap` mit folgenden
Einträgen, lastModified je via existierendem gitMtime()-Helper auf
den jeweiligen page.tsx:

| Route               | priority | changeFrequency |
|---------------------|----------|-----------------|
| /ueber-uns          | 0.5      | monthly         |
| /qualitaet          | 0.5      | monthly         |
| /feedback           | 0.3      | yearly          |
| /barrierefreiheit   | 0.3      | yearly          |
| /impressum          | 0.2      | yearly          |
| /datenschutz        | 0.2      | yearly          |

Reihenfolge im return-Array: nach kategoriePages, vor rechnerPages
ODER als eigene Section ganz am Ende — Entscheidung beim Bauen treffen,
saubere Logik wichtiger als Reihenfolge.

Bewusst NICHT ergänzen (im Kommentar dokumentieren):
- /ki-rechner — W15A.4 noindex bleibt
- /admin/affiliate-stats — intern bleibt
- /aktualisierungen — bereits in staticPages

### 2) CLAUDE.md
Header-Bullet im "Projekt-Status"-Block aktualisieren:

- Vorher: "178 Rechner-URLs in der Sitemap (inkl. Varianten-Seiten
  wie /finanzen/2000-euro-brutto-netto bis /5000-euro-brutto-netto
  und /finanzen/brutto-netto-tabelle)"
- Nachher: "195 URLs in der Sitemap: 170 Rechner + 9 Kategorien +
  6 Long-Tail-Brutto-Netto-Varianten + 2 Sonderseiten + Root +
  /aktualisierungen + 6 Meta-Pages (über uns, qualität, feedback,
  barrierefreiheit, impressum, datenschutz)"

## Build & Commit
- npm run build muss grün sein
- Zwei atomic commits:
  1. feat(sitemap): 6 Meta-Pages aufgenommen (E-E-A-T-Sichtbarkeit
     vor AdSense-Resubmit)
  2. docs(claude-md): Sitemap-URL-Zahl im Header-Bullet
     synchronisiert (178 → 195)
- Beide pushen.

## STOP-Trigger
- gitMtime() wirft auf einer der 6 Meta-Routes (sollte nicht, alle
  Files existieren) → reporten, NICHT mit Date.now() umgehen
- Bei TS-Fehler oder Lint-Fail → stoppen, reporten

## Report
- Sitemap.xml-URL-Zählung vorher/nachher (189 → 195)
- Liste der 6 aufgenommenen Routes mit ihren gitMtime-Werten
- Welche Routes bewusst weiterhin draußen (mit Begründung)
- 2 Commit-Hashes
- Verify-URL: https://www.rechenfix.de/sitemap.xml — muss alle 6
  neuen <loc>-Einträge enthalten
