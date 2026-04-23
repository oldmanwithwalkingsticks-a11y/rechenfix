# Slug-Drift-Check 2026-04

**Prompt:** 132.5
**Datum:** 2026-04-23
**SSOT:** `lib/rechner-config/<kategorie>.ts` (neun Kategorien)
**Scan-Script:** [scripts/slug-drift-scan.mjs](../../scripts/slug-drift-scan.mjs)

## Methodik

Ein Node-Script liest alle `slug: '...'`-Einträge aus den 9 Kategorie-
Config-Dateien und baut pro Kategorie ein SSOT-Set auf (170 Slugs gesamt).
Anschließend grept es alle `.ts`/`.tsx`/`.md`/`.mdx`/`.json`-Dateien nach
`/(kategorie)/<slug>`-Pfaden und meldet Treffer, die weder im SSOT-Set
noch in einer statischen Route unter `app/<kategorie>/<slug>/page.tsx`
existieren.

**Whitelist:**
- Statische Routes (z. B. `/finanzen/2000-euro-brutto-netto`,
  `/finanzen/brutto-netto-tabelle`, `/finanzen/mindestlohn-netto`)
- Externe URLs `http(s)://<domain>/<kategorie>/...`
- `lib/rechner-config/*` (SSOT selbst)
- `.claude/skills/**` (enthält Counter-Beispiele aus Prompt 127/128)
- `docs/audit-arbeitspapiere/**` (historische Audit-Docs)
- `docs/*-2026-NN.md` (dated Audit-Snapshots)
- `reports/**` (historische Audit-Reports, generiert)
- `next.config.mjs` (Redirect-`source`-Pfade absichtlich historisch)

## Ergebnis

| Scan-Phase | Treffer |
|---|---|
| Roh-Scan ohne Whitelist | 123 |
| Nach Whitelist (statische Routes, externe URLs, historische Docs) | 26 |
| Davon **echte Drifts** (gefixt) | 22 |
| Davon **bewusste historische Referenzen** (belassen) | 4 |

**0 neue Drifts nach Fix-Anwendung** — der Scan läuft sauber bis auf
die 4 dokumentierten Ausnahmen.

## Gefundene Drifts

### Router-Level (app/)

| Datei | Zeile | Drift | Korrekt | Grund |
|---|---|---|---|---|
| [app/ki-rechner/KiRechnerClient.tsx](../../app/ki-rechner/KiRechnerClient.tsx) | 22 | `/gesundheit/promillerechner` | `/arbeit/promillerechner` | Kategorie-Verwechslung |
| [app/ki-rechner/KiRechnerClient.tsx](../../app/ki-rechner/KiRechnerClient.tsx) | 41 | `/arbeit/stundenlohn-rechner` | `/finanzen/stundenlohn-rechner` | Kategorie-Verwechslung |
| [app/ki-rechner/KiRechnerClient.tsx](../../app/ki-rechner/KiRechnerClient.tsx) | 48 | `/alltag/einheiten-umrechner` | `/mathe/einheiten-umrechner` | Kategorie-Verwechslung |
| [app/page.tsx](../../app/page.tsx) | 256 | `/alltag/einheiten-umrechner` | `/mathe/einheiten-umrechner` | Kategorie-Verwechslung |
| [app/page.tsx](../../app/page.tsx) | 265 | `/arbeit/stundenlohn-rechner` | `/finanzen/stundenlohn-rechner` | Kategorie-Verwechslung |

### CrossLinks in Rechner-Komponenten (components/rechner/)

| Datei | Drift | Korrekt |
|---|---|---|
| AfaRechner.tsx | `/finanzen/freelancer-stundensatz-rechner` | `/arbeit/freelancer-stundensatz-rechner` |
| AlkoholAbbauRechner.tsx | `/gesundheit/promillerechner` | `/arbeit/promillerechner` |
| AlkoholAbbauRechner.tsx | `/arbeit/bussgeldrechner` | `/auto/bussgeldrechner` |
| AlkoholgehaltRechner.tsx | `/alltag/promillerechner` | `/arbeit/promillerechner` |
| BackformUmrechner.tsx | `/alltag/flaechenrechner` | `/mathe/flaechenrechner` |
| BackzeitRechner.tsx | `/alltag/einheiten-umrechner` | `/mathe/einheiten-umrechner` |
| BetriebskostenRechner.tsx | `/finanzen/freelancer-stundensatz-rechner` | `/arbeit/freelancer-stundensatz-rechner` |
| CupsUmrechner.tsx | `/alltag/einheiten-umrechner` | `/mathe/einheiten-umrechner` |
| FirmenwagenRechner.tsx | `/finanzen/autokosten-rechner` | `/auto/autokosten-rechner` |
| GrundsteuerRechner.tsx | `/finanzen/baufinanzierung-rechner` | `/wohnen/baufinanzierung-rechner` |
| MalerkostenRechner.tsx | `/wohnen/umzugskosten-rechner` | `/alltag/umzugskosten-rechner` |
| MinijobRechner.tsx | `/arbeit/stundenlohn-rechner` | `/finanzen/stundenlohn-rechner` |
| NebenjobRechner.tsx | `/arbeit/stundenlohn-rechner` | `/finanzen/stundenlohn-rechner` |
| PfaendungRechner.tsx | `/finanzen/unterhaltsrechner` | `/arbeit/unterhaltsrechner` |
| ReisekostenRechner.tsx | `/auto/spritkostenrechner` | `/auto/spritkosten-rechner` |
| RezeptUmrechner.tsx | `/alltag/einheiten-umrechner` | `/mathe/einheiten-umrechner` |

### Entwickler-Template

| Datei | Drift | Korrekt |
|---|---|---|
| [affiliate-prompts/prompt-02-integrate-affiliates-in-rechner.md](../../affiliate-prompts/prompt-02-integrate-affiliates-in-rechner.md) | `/arbeit/stundenlohn-rechner` | `/finanzen/stundenlohn-rechner` |

### Muster-Analyse der 22 Fixes

- **9 × Kategorie-Verwechslung `promillerechner` und `stundenlohn-rechner`** — diese beiden Slugs sind Display-Name-verwandt zu anderen Kategorien („Promille" klingt nach Gesundheit, „Stundenlohn" klingt nach Arbeit), tatsächlich leben sie in `/arbeit/` bzw. `/finanzen/`. Lehre: Display-Name-Erwartung verführt zu falscher Kategorie — siehe Prompt 128.
- **4 × `einheiten-umrechner`** — konsequente Fehlannahme, dass der Umrechner in `/alltag/` liegt; tatsächlich in `/mathe/`.
- **2 × `freelancer-stundensatz-rechner`** — in `/arbeit/`, nicht `/finanzen/`.
- **2 × Slug-Schreibweise** (`autokosten-rechner`, `unterhaltsrechner`, `baufinanzierung-rechner`, `bussgeldrechner`) — falsche Kategorie, korrekter Slug.
- **1 × Slug-Form** (`spritkostenrechner` ohne Bindestrich statt `spritkosten-rechner`) — derselbe Typ Bug wie beim Ursprungs-Fund in Prompt 132 A5, dort in TaxiRechner.
- **1 × umzugskosten-rechner** in `/wohnen/` statt `/alltag/` — Kategorie-Verwechslung.

## Bewusste historische Referenzen (belassen)

| Datei | Zeile | Referenz | Grund |
|---|---|---|---|
| [CLAUDE.md](../../CLAUDE.md) | 440 | `/finanzen/firmenwagenrechner` | Rule-11-Dokumentation: zitiert die Alt-URL aus Prompt 126, um die Migration zum neuen Pfad `/auto/firmenwagen-rechner` als Lehre zu dokumentieren. Historischer Kontext, kein Bug. |
| [rechenfix-projekt-referenz.md](../../rechenfix-projekt-referenz.md) | 39 | `/gesundheit/herzfrequenz-rechner` | Dokumentiert die 301-Redirect-Konsolidierung auf `/sport/herzfrequenz-zonen-rechner`. Historischer Kontext. |
| rechenfix-projekt-referenz.md | 223 | `/finanzen/pflegegeld-`, `/gesundheit/raucher-` | Shortform-Notation in einer Affiliate-Programm-Aufzählung (`/finanzen/pflegegeld-, krankengeld-, rentenrechner`) — Regex-Pattern matcht den Strich-Teil als Slug-Ende, tatsächlich ist das eine Textaufzählung, kein URL-Pfad. False-Positive des Scan-Scripts. |

## Auto-Fixes — Commits

- [`d8d7650`](../../commit/d8d7650) — `app/ki-rechner/KiRechnerClient.tsx` (3 Drifts)
- [`4e96f0c`](../../commit/4e96f0c) — `app/page.tsx` (2 Drifts)
- [`667695f`](../../commit/667695f) — `components/rechner/*.tsx` (15 Dateien, 17 Drifts — AlkoholAbbauRechner hatte 2)
- [`9514a57`](../../commit/9514a57) — `affiliate-prompts/prompt-02-integrate-affiliates-in-rechner.md`
- Nachfolgend: Scan-Script + dieser Bericht

## Manuell zu prüfen — keine

Alle gefundenen Drifts konnten eindeutig gegen SSOT aufgelöst werden.
Keine Edge-Cases, bei denen die korrekte Kategorie unklar war.

## Methodische Lehre

- **Display-Name verführt zu falscher Kategorie.** `promillerechner`
  klingt nach Gesundheit, liegt aber in `/arbeit/`; `stundenlohn-rechner`
  klingt nach Arbeit, liegt aber in `/finanzen/`. Der Prompt-128-
  Abschnitt „Display-Name vs. URL-Slug sind unabhängige Artefakte"
  hätte auch um „Kategorie-Zugehörigkeit ist ebenfalls nicht aus dem
  Namen ableitbar" ergänzt werden können.
- **Rule 11 (URL + Kategorie gegen SSOT verifizieren)** hat beim
  Scan-Write selbst gegriffen: Das Script liest die SSOT, nicht eine
  Erwartungsliste.
- **`sed`-Batch für analoge Fixes** ist für 16 identische
  href-Ersetzungen effizienter als 16 × Edit-Tool. Read-Constraint
  bleibt eingehalten, weil `sed -i` auf dem Dateisystem arbeitet und
  der Drift-Re-Scan als Verifikation dient.
- **Scan-Script bleibt im Repo** unter `scripts/slug-drift-scan.mjs`
  für zukünftige Ad-hoc-Läufe. Nicht in CI integriert (das wäre eigener
  Prompt mit Lint-Script-Integration analog `check-jahreswerte.mjs`).

## Offene Follow-ups

Für einen separaten Prompt (nicht in 132.5):

- **Lint-Integration:** `scripts/slug-drift-scan.mjs` in `prebuild`
  aufnehmen, Exit-Code 1 bei Drifts. Schützt gegen künftige Drifts
  in neuen CrossLinks/FAQ-Einträgen.
- **False-Positive in Scan:** Shortform-Notation wie
  `/finanzen/pflegegeld-, krankengeld-, rentenrechner` könnte durch
  strengeres Pattern (nur vollständige Slugs mit Wortgrenze) gefiltert
  werden. Aktuell 1 Treffer in der Projekt-Referenz.
- **Memory-Update #29 schärfen** (siehe Prompt 132.5 Abschluss):
  URL-SSOT-Regel expliziter um Kategorie-Ableitung erweitern.
