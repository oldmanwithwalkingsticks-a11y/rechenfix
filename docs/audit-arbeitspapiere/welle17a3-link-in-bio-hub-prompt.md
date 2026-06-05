# Welle 17A.3 — Link-in-Bio Hub-Seite /social

## Kontext & Ziel
Instagram macht Caption-Links NICHT klickbar — nur der EINE Bio-Link ist
klickbar. Für die Social-Pipeline (160 Rechner) brauchen wir eine feste
Bio-Hub-Seite, die immer aktuell den zuletzt geposteten Rechner oben zeigt,
damit "Link in Bio" gezielt zum Post-Thema führt. Phase 0 hatte dieses Loch
(keine sinnvolle Bio-Verlinkung) — wird hiermit geschlossen.

## Was gebaut wird

### 1. Route `app/social/page.tsx` → erreichbar unter `https://www.rechenfix.de/social`
Mobil-first (IG-Traffic ist ~100% Handy). Passt zum rechenfix-Design
(Bolt-Logo, Kategorie-Farben aus `lib/social/kategorie-farben.json` bzw.
bestehende Tailwind-Tokens, sauber, große tippbare Buttons).

Aufbau der Seite:
- **Header:** Bolt-Logo + "rechenfix" + kurzer Claim
- **Block 1 — "Heute auf Instagram":** der aktuell gepostete Rechner als
  großer Button (Titel + Icon + Kategorie-Farbe), verlinkt auf
  `/<kategorieSlug>/<slug>`. Quelle: KV-Key `social:current-bio-slug`
  (siehe Punkt 2). Fallback wenn KV leer/fehlt: Block ausblenden oder
  dezenter Default, KEIN Crash.
- **Block 2 — "Beliebte Rechner":** die Top-10 (aus EXISTING Top-10-Slugs,
  Repo-verifizieren, nicht aus Prompt annehmen):
  brutto-netto-rechner, mwst-rechner, zinsrechner, bmi-rechner,
  stundenlohn-rechner, spritkosten-rechner, tagerechner, dreisatz-rechner,
  mietrechner, stromkosten-rechner — als Button-Liste, je verlinkt auf
  `/<kategorieSlug>/<slug>`.
- **Footer-Link:** "Alle 170 Rechner →" zur Startseite.

Titel/Icon/kategorieSlug pro Slug aus der Rechner-Config holen (gleiche
Quelle wie Image-/Caption-Builder, z.B. `_rechner-snapshot.json` oder
direkt aus `lib/rechner-config`). NICHT hardcoden.

### 2. Pipeline schreibt aktuellen Slug nach KV
Beim erfolgreichen Post (in `publisher.ts` / Cron-Endpoint, nachdem ein
Slug auf mind. einer Plattform live ging) zusätzlich:
`SET social:current-bio-slug = <slug>` (bestehende lib/redis.ts-Instanz,
KV_REST_API_*). Die /social-Seite liest diesen Wert serverseitig.

SEO: `/social` auf **noindex** (reine Funktionsseite, kein Index-Wert,
verhindert Thin-Content-Signal). Analog zu `/ki-rechner`.

## Disziplin
- npm. Bestehende redis-Instanz, kein neuer Wrapper. Build grün vor jedem
  Commit. Atomare Commits. Server-rendered (kein 'use client' für die
  Slug-Daten — SSR, damit der Bio-Klick sofort den richtigen Inhalt zeigt).
- L-37: Top-10-Slugs + kategorieSlugs + KV-Helper-Signaturen aus dem Repo
  lesen, nicht aus diesem Prompt annehmen. Bei Abweichung melden.
- Doku: social-pipeline.md erweitern (neuer §: Bio-Hub + current-bio-slug),
  CLAUDE.md L-Lehre (IG-Caption-Links nicht klickbar → Bio-Hub-Pattern),
  Welle-Status-Historie.

## Realitäts-Abgleich zuerst
Prüf: existiert schon eine /social-Route? Wie sind andere Funktionsseiten
(/ki-rechner) auf noindex gesetzt? Welche KV-Helper gibt es in lib/redis.ts
(get/set-Signatur)? Wie holen Image-/Caption-Builder die Rechner-Daten
(Snapshot-Pfad)? Stell Rückfragen nur, wenn etwas gegen obiges spricht.

## NICHT in dieser Welle
- Kein Caption-Format-Umbau (kommt direkt danach als eigener Schritt).
- Keine Bio-Link-Automatik via IG-API (Bio-Link wird EINMAL manuell auf
  /social gesetzt, ändert sich nie — nur der Seiteninhalt ändert sich).
