# Welle 17A.1 — Auto-Content-Pipeline (Bild + Caption Pre-Generation)

## Kontext
Welle 17A (Posting-Mechanik) ist fertig und live: täglicher Cron, IG-2-Step
+ FB-Single-Call, KV-Idempotenz, Resend-Fehlermail. Verifiziert per Dry-Run
(`posts.json ist leer` = erwartet). ENVs in Vercel gesetzt.

**Diese Welle baut die fehlende Content-Erzeugung.** Ziel: System rendert
Bild + schreibt Caption selbst, pre-generiert für alle Rechner. Pipeline
postet dann täglich genau einen neuen, nie wiederholten Rechner auf IG+FB.

## Architektur-Entscheidungen (final, keine Rückfragen nötig)

1. **Pre-Generation**, nicht on-the-fly. Bilder + Captions werden VORAB
   erzeugt und committed. Zur Post-Zeit kein KI-Call.
2. **160 Rechner** = alle aus `lib/rechner-config/*.ts` MINUS 10 EXCLUDED
   (bereits manuell gepostet, = Top-10):
   `brutto-netto-rechner, mwst-rechner, zinsrechner, bmi-rechner,
   stundenlohn-rechner, spritkosten-rechner, tagerechner, dreisatz-rechner,
   mietrechner, stromkosten-rechner`
   → Konstante `EXCLUDED_SLUGS` in `lib/social/config.ts`.
   **Erst Repo-Realität prüfen:** zähle die tatsächliche Gesamtzahl aller
   Rechner über alle Config-Dateien. Wenn ≠170, melde die echte Zahl;
   160 ist erwartet, nicht garantiert.
3. **Reihenfolge: einmalig zufällig gelost, dann fix.** Seeded Shuffle
   (fester Seed, z.B. `17`), damit reproduzierbar. Ergebnis als
   nummerierte Queue committen (`lib/social/queue.json` — Array von Slugs).
4. **Jeder Rechner GENAU EINMAL.** Ersetzt die Modulo-Rotation aus 17A.
   Logik: nimm den ersten Queue-Eintrag, dessen KV-„done"-Marke fehlt.
   KV-Key-Schema beibehalten (`social:posted:{date}:{platform}`) UND
   zusätzlich pro Slug eine Done-Marke `social:done:{slug}` setzen nach
   Erfolg. Queue erschöpft → Pipeline meldet „alle Rechner gepostet",
   postet nichts, KEINE Wiederholung von vorn.
5. **Bild-Layout: identisch zu Phase 0.** Quelle: `build_phase0_posts.py`
   (liegt bei, muss ins Repo unter `scripts/social-image-builder.py`).
   Umbau von 10 hartcodierten POSTS auf Generierung aus Rechner-Config.
6. **Caption-Generierung: separates lokales Script**, Output reviewbar,
   dann committen. KEINE Claude-API-Calls im Vercel-Build.

## Datenquelle (Repo-verifiziert)
`lib/rechner-config/<kat>.ts` exportiert `RechnerConfig[]`. Pro Rechner
nutzbar: `slug, titel, kategorie, kategorieSlug, icon` (Emoji),
`beispiel` (fertiges Rechenbeispiel als Text), `beschreibung`, `keywords`.
Das `beispiel`-Feld liefert die Zahlen für Bild-Highlight + Caption-Hook.

## Bild-Generierung (`scripts/social-image-builder.py`)
- Übernimm Layout/Helpers aus `build_phase0_posts.py` 1:1 (Emoji oben,
  Eyebrow, Lines, Highlight, Footer mit Bolt + rechenfix.de). 1080×1080.
- Statt hartcodierter POSTS: lies die Rechner ein (z.B. via vorab
  exportiertem JSON oder simpler TS→JSON-Dump-Step — entscheide den
  saubersten Weg, KEINE TS-Laufzeit in Python).
- **Kategorie→Farbe-Mapping** (bg + accent) pro `kategorieSlug` statt pro
  Post. Leite die Paletten aus den Phase-0-Bildern ab (Finanzen=grün,
  Gesundheit=pink, etc.). Definiere das Mapping zentral.
- Emoji = `icon`-Feld. Eyebrow/Lines/Highlight aus `beispiel` ableiten
  (parsen oder simpel: Eyebrow fix z.B. „Schnell gerechnet", Highlight =
  Ergebnisteil des Beispiels). Halte es robust gegen fehlende Felder.
- Output: `public/social-posts/{slug}.png`.

## Caption-Generierung (`scripts/social-caption-builder.mjs`, lokal)
- Pro Rechner via Anthropic API (Modell + Key aus ENV, NICHT hartcodiert)
  eine Caption: Hook + Nutzen + CTA (Link zur Rechner-URL) + 3-5 Hashtags.
- FB- und IG-Variante (`captionFb`, `captionIg`) — IG hashtag-lastiger.
- URL-Schema: `https://www.rechenfix.de/<kategorieSlug>/<slug>` (www!).
- Output: `lib/social/captions.json` (Slug → {captionFb, captionIg}).
  Reviewbar, dann commit. Rate-Limit/Retry beachten.

## posts.json-Ablösung
Die Pipeline liest künftig nicht mehr `posts.json`, sondern baut den
Tages-Post aus: queue.json (Reihenfolge) + captions.json (Texte) +
`public/social-posts/{slug}.png` (Bild). Passe `publisher.ts` +
Cron-Endpoint entsprechend an. `?test=true` Dry-Run muss zeigen:
welcher Slug heute dran wäre + ob Bild/Caption existieren, ohne zu posten.

## Wave-Disziplin
- npm (nicht pnpm). Bestehende `lib/redis.ts`-Instanz nutzen, kein neuer
  Wrapper. Build muss vor jedem Commit grün sein. Atomare Commits.
- L-37: SSOT-Werte (Slugs, Kategorien, Farben) aus dem Repo lesen, nicht
  aus diesem Prompt annehmen. Bei Abweichung: melden, nicht raten.
- Doku-Phase: `docs/social-pipeline.md` erweitern, CLAUDE.md L-Lehren +
  Welle-Status-Historie.

## Realitäts-Abgleich zuerst
Bevor du baust: prüf Gesamtzahl Rechner, Kategorie-Slugs, vorhandene
Farbdefinitionen, ob `lib/redis.ts` die erwarteten KV-Helpers hat, und
wie 17A aktuell `posts.json` liest. Stell Rückfragen NUR, wenn etwas
gegen diese Entscheidungen spricht.
