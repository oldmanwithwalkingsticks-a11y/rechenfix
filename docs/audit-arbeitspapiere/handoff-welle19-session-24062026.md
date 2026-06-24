# HANDOFF — rechenfix Welle 19, Session-Ende 24.06.2026 (~01:15)

> Für die nächste Chat-Claude-Session. Beim Start zuerst `docs/audit-arbeitspapiere/welle-status-historie.md` lesen (Kopf-Stand 24.06.2026), dann diesen Handoff. Stand kurz bestätigen, dann weiter.

## WO WIR STEHEN
- **Goldstandard: 120 / 178** (skript-gezählt via `node scripts/check-contentbloecke-struktur.mjs`). 58 offen bis AdSense-Resubmit.
- **HEAD:** `e013212`. Repo sauber, Vercel grün.
- **wohngeld** = INLINE-Goldstandard-Erklärseite (eigene Route, NICHT skript-gezählt, zählt separat — Count bleibt 120). Erledigt.
- AdSense-Resubmit erst, wenn **alle 178** Goldstandard.

## WAS HEUTE LIEF (alle verifiziert, Vercel grün)
**Goldstandard-Builds 116 → 120:**
- p3 `aufstiegs-bafoeg-rechner` (vergleich, `3a70345`, 117)
- c1 `krankengeld-rechner` (tabelle, `34cf501`, 118) — Stale-Fix beispiel/faq (2.158→1.985 €)
- c2 `kurzarbeitergeld-rechner` (beispielrechnung, `8d8aab4`, 119) — Stale-Fix Netto-Anker (Code rechnete mit echter Lohnsteuer-Lib nach; Fehler hoben sich in Subtraktion zufällig auf)
- c3 `witwenrente-rechner` (vergleich, `b023698`, 120) — ZEITKRITISCH Rentenwert 40,79→42,52 € ab 01.07.2026, beide Stände im Content, Hauptbeispiel future-proof; Stale-Fix erklaerung/faq (2024er-Rentenwert)
- Doku-Sync c1–c3: `b13c20f`
- wohngeld Erklärseite Goldstandard: `e013212`

**Compliance-Schiene komplett (DSA/DDG/EU-AI-Act/Social):**
- Impressum § 5 TMG→DDG `77f5f28`; KI-Bestandsaufnahme-Doku `025f74b`; KI-Rechner-Offenlegung Art. 50 `543ded5`; Über-uns KI-Transparenz `9f6f811`; /social Impressum-Link `6414bc6` + lesbarer `c30167e`; Impressum Social-Klarstellung `8012345`. FB-Impressum von Karsten gesetzt.
- Bestandsaufnahme: `docs/audit-arbeitspapiere/ki-transparenz-bestandsaufnahme-art50.md`. Rolle = Betreiber/Deployer. Live-KI (AiExplain, KI-Rechner) gekennzeichnet; redaktionell verantwortete Texte (contentBloecke, Captions) fallen unter Abs.-4-Ausnahme. **Offener Rest:** anwaltliche Schlussprüfung bei Gelegenheit (Recht frisch, ab 02.08.2026 voll).
- Startseite Neu-Box (`aac2427`): manuelle Konstante `neueRechnerSlugs`, aktuell [kalorienverbrauch, internetgeschwindigkeit, 1rm].

## ZENTRALE LEHRE DES TAGES (für künftige Prompts anwenden)
1. **Component-only-Rechner:** ALLE VIER statischen Felder (beispiel/formel/erklaerung/faq) gegen die Component nachrechnen — nicht nur beispiel. Stale Werte saßen in allen drei Fällen woanders (c1 beispiel/faq, c2 Netto-Anker, c3 separates erklaerung-Rechenbeispiel). Chat-Claude kann Netto-Werte mit Lohnsteuer-Lib NICHT in der Sandbox prüfen (TS-Imports brauchen Next.js-Resolver) → Code im Prompt explizit anweisen, mit echter Lib nachzurechnen, nur bei Abweichung >2 % fixen.
2. **YMYL-Detailstrukturen:** im Prompt explizit „gegen Lib/Gesetz prüfen, nicht aus Prompt übernehmen" markieren. Code fing 3× einen Prompt-Fehler von mir (c2 indirekt, c3, wohngeld § 17 WoGG kennt keinen allg. Erwerbstätigen-Freibetrag).
3. **Zeitkritische Stichtagswerte:** beide Stände nennen + Hauptbeispiel future-proof. Nächster relevanter Stichtag: 01.07.2026 (Bürgergeld→Neue Grundsicherung) — siehe unten.

## NÄCHSTE SCHRITTE (Reihenfolge vorgeschlagen)
Alle 8 verbleibenden Finanzen-Slugs sind **offen** und in `kategorieSlug: 'finanzen'`. Echte Slug-Namen (verifiziert):

**Block A — Vorsorge/Sparen (empfohlen als Nächstes):**
- `etf-sparplanrechner` (Achtung: ohne Bindestrich, ohne „-rechner"-Suffix beim Stamm)
- `rentenrechner`
- `riester-rechner`

**Block B — Rest-Steuer:**
- `afa-rechner`, `mwst-rueckerstattung-rechner`, `gmbh-geschaeftsfuehrer-rechner`, `hochrechner`, `nettolohn-optimierer`

**Pro Slug-Vorbereitung (Pflicht-Routine):**
1. `kategorieSlug` am Slug-Eintrag verifizieren (Lib-Datei ≠ Kategorie-Regel — hier alle 'finanzen', aber immer prüfen).
2. Hat eigene Lib oder Component-SSOT? → wenn Component-only: alle 4 statischen Felder gegen Component prüfen.
3. YMYL? → Lib-Werte gegen Primärquelle (web_search) checken VOR Build. Riester/Rente/ETF: Förderbeträge, Grundzulage, Rentenwert, Steuerregeln 2026 prüfen.
4. Leitformat wählen, das sich von Nachbarn unterscheidet (Fingerprint-Eindeutigkeit).
5. Prompt nach Schema `welle19-<slug>-prompt.md` in `/mnt/user-data/outputs/`, ~5.000 Zeichen, alle Vorab-Entscheidungen gelöst.

## ZURÜCKGESTELLT (nicht Welle 19)
- **Bürgergeld→Neue-Grundsicherung-Refactoring + Wohngeld-Rechner-Refactoring** (Pro-Person-Einkommensermittlung §§14–16 WoGG): geplant nach 01.07.2026, eigenes Architektur-Thema. WohngeldRechner.tsx-Component hat dokumentierten Bug (Single-Brutto ×0,30, weicht bei 2+ Pers. 8–29 % ab), bleibt uneingebunden.
- W14-Backlog (nach AdSense): Status-204-Bug, Mobile-Perf 74→85+, 404 /alltag/einheiten-umrechner, Slug-Audit, Option C (`erstelltAm`-Feld für Neu-Box).

## ARBEITSWEISE (Erinnerung)
- Zwei-Claude: Chat-Claude plant/verifiziert, schreibt `.md`-Prompts nach `/mnt/user-data/outputs/`. Karsten gibt sie an Claude Code (separate Session). Code baut im Repo, meldet per Screenshot.
- Chat-Claude verifiziert JEDEN Report: `git pull` in `/tmp/rechenfix`, Check-Skripte, eigene Probe.
- NIE `git add .` — explizite Pfade. Build-Gate = Vercel-grün (Windows-Build flaky, ignorieren).
- Karsten: terse Kommandos. Keine unaufgeforderten Pausen-Hinweise.
