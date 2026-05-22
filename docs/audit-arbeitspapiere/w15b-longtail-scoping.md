# W15B — Long-Tail Content-Aufwertung Scoping

**Stand:** 22.05.2026 (Phase 1, Read-only)
**Trigger:** Welle-15-Killer-Faktor #4 — Long-Tail-Thin-Content auf 6 Pages unter 400W. Letzter Block vor AdSense-Resubmit.

---

## A) Architektur-Verifikation — **WICHTIGER BEFUND**

### A.1 Karstens Vorgabe #1 ist FALSCH

**Karsten-Annahme (Prompt-Vorgabe Z. 28):** „6 Long-Tail-Pages sind Slug-Einträge in `lib/rechner-config/finanzen.ts` (nicht eigene Page-Routes)."

**Repo-Realität:** Die 6 Pages sind **eigene Page-Routes** unter `app/finanzen/<NNNN>-euro-brutto-netto/page.tsx`:

| Slug | Datei | Zeilen |
|---|---|---|
| 2000-euro-brutto-netto | [app/finanzen/2000-euro-brutto-netto/page.tsx](app/finanzen/2000-euro-brutto-netto/page.tsx) | 40 |
| 2500-euro-brutto-netto | [app/finanzen/2500-euro-brutto-netto/page.tsx](app/finanzen/2500-euro-brutto-netto/page.tsx) | 40 |
| 3000-euro-brutto-netto | [app/finanzen/3000-euro-brutto-netto/page.tsx](app/finanzen/3000-euro-brutto-netto/page.tsx) | 40 |
| 3500-euro-brutto-netto | [app/finanzen/3500-euro-brutto-netto/page.tsx](app/finanzen/3500-euro-brutto-netto/page.tsx) | 40 |
| 4000-euro-brutto-netto | [app/finanzen/4000-euro-brutto-netto/page.tsx](app/finanzen/4000-euro-brutto-netto/page.tsx) | 40 |
| 5000-euro-brutto-netto | [app/finanzen/5000-euro-brutto-netto/page.tsx](app/finanzen/5000-euro-brutto-netto/page.tsx) | 40 |

`grep "slug: '...-euro-brutto-netto'" lib/rechner-config/*.ts` liefert **0 Treffer**. Die Pages laufen NICHT über die `[kategorie]/[rechner]`-Route, sondern haben dedizierte Routes.

### A.2 Architektur-Detail

Jede Page-Datei (~40 Zeilen) hat:
- Lokale Konstante `const BRUTTO = NNNN`
- Lokale `metadata`-Definition (Title, Description, OG, Twitter, Canonical)
- Lokales `faq`-Array (4 Frage/Antwort-Einträge, gehaltsspezifisch)
- Default-Export rendert `<BruttoNettoLongTail brutto={BRUTTO} seoText="..." faq={faq} />`

**Geteilter Renderer:** [components/seo/BruttoNettoLongTail.tsx](components/seo/BruttoNettoLongTail.tsx) (250 Zeilen). Rendert:
1. Schema.org (BreadcrumbList + FAQPage) — kein WebApplication, kein dateModified-Feld
2. Breadcrumbs
3. AdSlot
4. ZurueckButton
5. **Hauptinhalt-Card** (Ergebnis-Tabelle aller 6 SK + Highlight-Box SK1 + CTA-Link)
6. **SEO-Text-Card** (5 Absätze, davon nur Absatz 1 aus Prop `seoText`, Absätze 2–5 sind **hartkodiert** in Component mit `ergebnisse[i]`-Interpolationen)
7. FAQ-Card
8. Prev/Next-Navigation
9. „Weitere Gehaltsberechnungen"-Card
10. AdSlot (unten)

### A.3 INLINE_ERKLAERUNG_SLUGS-Check

[app/[kategorie]/[rechner]/page.tsx:199](app/[kategorie]/[rechner]/page.tsx): `new Set(['brutto-netto-rechner'])`. **Keine** der 6 Long-Tail-Slugs steht hier — und kann gar nicht, weil die Pages nicht über die dynamische Route laufen.

### A.4 W15A.2-Property-Status (Bestätigung)

Da die 6 Pages NICHT in `lib/rechner-config/*.ts` als Configs existieren, wurden sie vom W15A.2-Bulk-Lauf (Commit `9311c6b`) **NICHT** erfasst. Sie haben:
- KEIN `letzteAktualisierung`-Property
- KEIN `zeigtAuthorBio`-Property
- KEIN Stand-Hinweis-Render
- KEIN `dateModified`-Schema (auch nicht im Schema-Block, da nur FAQPage + BreadcrumbList gerendert wird, kein WebApplication)

→ **Implikation für Phase 2:** Aktualisiert-Datum + AuthorBio + dateModified müssen anders integriert werden als bei den 170 Config-Rechnern. Drei Architektur-Optionen unter Q1 (Klärungsfragen).

### A.5 Aktuelle Wortzahlen

**Wortzahl pro Page** (sichtbarer Text-Content, gehaltsspezifisch):
- `seoText`-Prop: 1 Absatz ~50–70 Wörter
- 4 FAQs (Page-spezifisch): ~150–200 Wörter

**Wortzahl Standard-Block** (hartkodiert in Component, identisch für alle 6):
- SEO-Text-Card Absätze 2–5: ~150–180 Wörter

**Gesamt pro Page sichtbar: ~350–450 Wörter** — konsistent mit Welle-15-Dossier-Befund („unter 400W").

**Lücke zum Ziel (~1.200W):** mind. **+700–800 Wörter gehaltsspezifischer Content** pro Page.

---

## B) Standard-Block-Struktur

### B.1 Bestandsaufnahme

Standard-Block existiert **bereits**, aber als **hartkodierte JSX-Struktur** in [BruttoNettoLongTail.tsx:144–167](components/seo/BruttoNettoLongTail.tsx), nicht als String-Konstante in finanzen.ts:

```tsx
<section className="card p-6 md:p-8 mb-8">
  <h2>{bruttoFmt} Euro brutto in netto — das müssen Sie wissen</h2>
  <p>{seoText}</p>  {/* ← gehaltsspezifisch */}
  <p>In Steuerklasse 1 (Ledige) ... ca. {fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto. Das entspricht rund {(100 - ergebnisse[0].ergebnis.abzuegeProzent).toFixed(0)}% Ihres Bruttogehalts...</p>
  <p>Deutlich günstiger fahren Verheiratete in Steuerklasse 3: Hier bleiben ca. {fmt(ergebnisse[2].ergebnis.nettoMonat)} € netto — das sind {fmt(...)} € mehr pro Monat als in Steuerklasse 1.</p>
  <p>Am wenigsten Netto bleibt in Steuerklasse 5 und 6...</p>
  <p><strong>Wichtig zu wissen:</strong> Die Steuerklasse beeinflusst nur die monatlichen Abzüge, nicht die tatsächliche Jahressteuer...</p>
  <p>Nutzen Sie unseren <Link href="/finanzen/brutto-netto-rechner">Brutto-Netto-Rechner</Link>...</p>
</section>
```

### B.2 Empfehlung

Der hartkodierte Standard-Block ist bereits **per Konstruktion identisch** für alle 6 Pages — kein Drift möglich. Karstens Vorgabe (Z. 61) „String-Konstante als gemeinsamer Schluss-Block" trifft nicht zu, weil:
1. Es ist KEIN String, sondern JSX mit Interpolationen (`{ergebnisse[i].ergebnis.nettoMonat}`)
2. Es ist nicht in `finanzen.ts`, sondern in der Component selbst

**Empfehlung Phase 2:** **Standard-Block in Component lassen, nur leicht refactorn** (z. B. eine Sub-Component `StandardBruttoNettoBlock`), damit der **spezifische Content** klar abgetrennt als neue Prop oder als Children eingespeist werden kann.

---

## C) Pilot-Page-Bestätigung

**Empfohlene Pilot-Page: 3.000€** ✓

Begründung:
- **Mittelwert-Gehalt** — Boilerplate-Block passt direkt ohne Sondertheme
- **Nicht 4.000€** (Duplikat-Status laut Search Console → Risiko-Reduktion)
- **Nicht 3.500€** (zu ähnlich zu 3k+4k, schwierigste Differenzierung — als letzte Page)
- Repo-Sicht unauffällig: 40-Zeilen-Standard-Struktur wie alle 6

**Phase-2-Reihenfolge-Vorschlag:**
1. Pilot: 3.000€
2. Karsten-Abnahme der Pilot-Page (visueller + Wort-Diff-Check)
3. Folge-Pages (5 weitere) in Reihenfolge: 4.000€ (Duplikat-Priorität), 5.000€, 2.000€, 2.500€, 3.500€ (zuletzt, weil schwierigste Differenzierung gegen Pilot)

---

## D) Subtyp-Branching

### D.1 Pre-Phase-Vorgabe (v2-Datenbasis)

- **2k+2.5k Pages:** Block 6.5 mit Erwerbstätigen-Freibetrag (§ 11b SGB II)
- **3k–5k Pages:** Block 7 mit DACH-Vergleich (Deutschland/Österreich/Schweiz)

### D.2 Umsetzbarkeit

Aktuell **keine** Subtyp-Differenzierung in [BruttoNettoLongTail.tsx](components/seo/BruttoNettoLongTail.tsx). Phase 2 muss Branching einbauen — drei Optionen:

| Option | Mechanismus | Vor- / Nachteil |
|---|---|---|
| 1 | `brutto <=/>= NNNN`-Conditional in der Component | Component wird länger, Branching in der Render-Schicht |
| 2 | Separate Component-Slots `<ErwerbstaetigBlock>` / `<DachBlock>` als bedingtes Render in Component | Sauberer, aber zwei neue Sub-Components |
| 3 | Spezifischer Block als ReactNode-Prop pro Page-Datei (jede Page entscheidet selbst, was sie übergibt) | Branching-Logik **liegt in der Page-Datei**, Component bleibt agnostisch |

**Empfehlung: Option 3** — jede Page-Datei bringt ihren eigenen spezifischen Block mit. Vorteil: maximale Flexibilität (auch für künftige Sub-Blöcke wie „Bundesländer-Beispiele" oder „Tarif-Branchen-Vergleich"), Component bleibt sauber und reusable. Nachteil: ~20-40 zusätzliche Page-Zeilen pro File.

### D.3 FAQ-Subtyp

Aktuelle FAQ-Arrays sind bereits **pro Page-Datei lokal**, also schon trivial subtyp-fähig. Phase 2 erweitert sie auf je 6–8 FAQs mit gehaltsspezifischer Tiefe (z. B. 2k-FAQ mit Bürgergeld-Frage, 5k-FAQ mit DACH-Frage).

---

## E) Diff-Check-Tooling

### E.1 Empfehlung

Helper-Script `scripts/longtail-diff-check.mjs` (analog `check-jahreswerte.mjs`-Stil):

```javascript
// Lade die 6 Page-Files, extrahiere die spezifischen Content-Blöcke
// (z. B. via Regex auf `spezifischerContent={...}`-Prop oder eigene
// String-Konstanten). Pro Folge-Page: Jaccard-Coefficient gegen
// Pilot-Page-Content. Schwellwert: < 0.40 = >60% Diff erreicht ✓
```

### E.2 Bag-of-Words-Jaccard

```
Jaccard(A, B) = |A ∩ B| / |A ∪ B|
```

Wortmengen aus jeweiligem Spezifik-Content-Block. Stoppwörter (der/die/das/und/etc.) ausfiltern für saubere Signal-Inhalts-Messung.

Schwellwert `< 0.40` korrespondiert zu „mehr als 60% inhaltlicher Unterschied" — passt zu Karstens Q7-Ziel.

### E.3 Optional: Stichprobe per Hand

Falls Skript zu Aufwand-intensiv: alternativ **erste 3 Folge-Pages manuell prüfen** (4k vs. 3k-Pilot, 5k vs. 3k-Pilot, 2k vs. 3k-Pilot). Bei erkennbar >60% Differenz visuell: gut. Bei <60%: Pages nachschärfen. Bei den letzten 2 (2.5k, 3.5k) ggf. nur Spot-Check.

---

## F) Re-Indexierung — URL-Liste für Karsten

Search Console URL-Prüfung in dieser Reihenfolge (Karsten manuell, ~10 Anforderungen/Tag-Limit):

```
https://www.rechenfix.de/finanzen/4000-euro-brutto-netto   ← Priorität #1 (Duplikat-Status)
https://www.rechenfix.de/finanzen/3000-euro-brutto-netto   ← Pilot
https://www.rechenfix.de/finanzen/2000-euro-brutto-netto
https://www.rechenfix.de/finanzen/2500-euro-brutto-netto
https://www.rechenfix.de/finanzen/3500-euro-brutto-netto
https://www.rechenfix.de/finanzen/5000-euro-brutto-netto
```

---

## G) `letzteAktualisierung`-Bumping-Strategie

### G.1 Architektur-bedingte Anpassung

Weil die 6 Pages **NICHT** in Configs liegen, geht das Bulk-Pattern aus W15A.2 hier nicht. Optionen:

| Option | Strategie | Implikation |
|---|---|---|
| A | Pro Page-Datei lokale Konstante `const LETZTE_AKTUALISIERUNG = '2026-05-22'`, an Component weitergeben | Pro Page einzeln pflegbar, klar im Code sichtbar |
| B | Globale Konstante `LONGTAIL_LETZTE_AKTUALISIERUNG` in `lib/site-config.ts`, alle 6 Pages konsumieren | Single-Source für alle 6, bei Sprint-Updates eine Stelle |
| C | Hardcoded String `dateModified={SPRINT_DATE}` direkt in Component | Schlechteste Option, kein Tracking pro Page |

**Empfehlung: Option A** — pro Page eigene Konstante. Konsistent mit dem Per-Page-Property-Pattern aus W15A.2, erlaubt Pro-Page-Updates bei künftigen Inhaltsänderungen.

### G.2 Commit-Bundle (Karsten-Vorgabe Q3 + #G)

Option A aus Phase-1-Prompt (Bumping + Content im selben Commit pro Page) — **bestätigt**. Eine Commit pro Page: Pilot-Push, dann 5 Folge-Push-Commits, jeder mit `letzteAktualisierung: '<Sprint-Datum>'`. Phase-2-Doku-Commit am Ende sammelt alles in welle-status-historie.

---

## H) Pre-Phase-Datenbasis — Commit-Status

**Datei-Existenz:** `docs/audit-arbeitspapiere/w15-longtail-pre-phase-datenbasis-v2.md` **liegt im Working-Tree** (Glob bestätigt), ABER **UNTRACKED** (`git status` zeigt `??`).

**Aktion benötigt:** Karsten muss die Datei vor Phase 2 committen, sonst kann Phase 2 nicht auf sie referenzieren. Vorschlag:

```bash
git add docs/audit-arbeitspapiere/w15-longtail-pre-phase-datenbasis-v2.md
git commit -m "docs: w15b long-tail pre-phase-datenbasis v2 ins repo"
```

Oder: Phase-2 startet mit diesem Commit als erstem Schritt.

---

## Schema.org-`dateModified` für Long-Tail-Pages (Bonus-Befund)

Die 6 Pages nutzen **NICHT** `generateWebApplicationSchema` aus `lib/seo.ts` — nur `generateBreadcrumbSchema` + `generateFAQSchema` ([BruttoNettoLongTail.tsx:72-73](components/seo/BruttoNettoLongTail.tsx)). Damit fehlt `dateModified` als Google-Signal komplett — auch nicht durch W15A.2 abgedeckt.

**Vorschlag Phase 2:**
- Entweder neuer Helper `generateLongTailWebPageSchema(brutto, letzteAktualisierung)` in `lib/seo.ts`
- Oder `generateWebApplicationSchema`-Erweiterung um Long-Tail-Variante
- Oder schlicht: BruttoNettoLongTail.tsx fügt minimales `WebPage`-JSON-LD mit `dateModified` hinzu

→ siehe **Klärungsfrage 3**.

---

## Klärungsfragen für Karsten

1. **Architektur-Korrektur (kritisch):** Karstens Vorgabe #1 war falsch — die 6 Pages sind eigene Page-Routes (40 Zeilen pro Datei, geteilte `<BruttoNettoLongTail>`-Component), KEINE Config-Slugs. Phase 2 nutzt **Option B** aus A.5: spezifischen Content pro Page-Datei als neue Prop an die Component übergeben (700W gehaltsspezifischer Block) statt Config-Refactor. Bestätigung?

2. **Subtyp-Branching:** Empfehlung **Option 3** aus D.2 — Subtyp-Block (Erwerbstätigen-Freibetrag bzw. DACH-Vergleich) liegt in der jeweiligen Page-Datei selbst, Component bleibt agnostisch. OK?

3. **Schema.org-`dateModified` für Long-Tail:** Aktuell rendert `BruttoNettoLongTail.tsx` nur Breadcrumb+FAQ-Schemas, kein WebApplication mit `dateModified`. Phase 2 sollte das ergänzen:
   - 3a) Minimal-WebPage-JSON-LD mit `dateModified` direkt in `BruttoNettoLongTail.tsx` einbauen, oder
   - 3b) `generateWebApplicationSchema` aus `lib/seo.ts` parallel zu Breadcrumb+FAQ ausspielen (mit erfundenem `applicationCategory`), oder
   - 3c) Schema.org-Erweiterung ganz weglassen, da sowieso schon FAQPage da ist

   Empfehlung: **3a)** — minimales `WebPage`-Schema mit `dateModified` ist semantisch sauberer als WebApplication für eine Brutto-Netto-Erklärseite.

4. **AuthorBio + StandHinweis auf Long-Tail-Pages:** Karstens Vorgabe #2 will AuthorBio aktivieren. Da die Pages NICHT in Configs sind, muss die Component die beiden Bausteine bekommen — Vorschlag:
   - `BruttoNettoLongTail` rendert direkt `<StandHinweis>` (oben unter Breadcrumbs) und `<AuthorBio>` (nach FAQ, vor Navigation), wenn entsprechende Props (`letzteAktualisierung`, `zeigtAuthorBio`) übergeben werden
   - Alle 6 Pages übergeben beide Props initial mit Sprint-Datum und `true`
   - Bestätigung?

5. **`letzteAktualisierung`-Datum:** Sprint-Push-Datum = `'2026-05-22'` (heute) — bestätigt, oder soll das Datum der einzelnen Push-Commits pro Page verwendet werden (falls verteilt über mehrere Tage)? Empfehlung: einheitlich `'2026-05-22'` für alle 6 Pages (Phase 2 läuft 5–7h, alles in einem Tag).

6. **Pre-Phase-Datenbasis-Commit:** Soll ich (Claude Code) jetzt in Phase 1 vorab `w15-longtail-pre-phase-datenbasis-v2.md` committen + pushen, damit Phase 2 darauf referenzieren kann? Oder Karsten erledigt das selbst vor Phase-2-Start? Prompt-Regel Z. 128 sagt READ-ONLY außer mit explizitem Karsten-OK.

7. **Diff-Check-Tooling:** Helper-Script `scripts/longtail-diff-check.mjs` mit Jaccard-Coefficient + Stoppwort-Filter, oder pragmatischer manueller Spot-Check der ersten 3 Folge-Pages? Empfehlung: **Skript**, weil bei 5 Folge-Pages systematische Messung sauberer und schneller als visueller A/B.

---

## STOP — Karsten bestätigt Scoping + beantwortet Klärungsfragen

**Hauptbefund:** Karstens Architektur-Annahme #1 stimmt nicht mit der Repo-Realität überein — 6 Pages sind eigene Routes mit geteilter Component, keine Config-Slugs. Das ändert die Phase-2-Strategie substantiell (Q1+Q2+Q4).

**Phase-2-Aufwand-Schätzung (revidiert):**
- Pre-Phase-Datenbasis-Commit (~1 Min)
- Component-Refactor `BruttoNettoLongTail` mit neuen Props (`spezifischerContent`, `letzteAktualisierung`, `zeigtAuthorBio`) + Sub-Component `StandardBruttoNettoBlock` (~30–45 Min)
- 6 Page-Dateien mit spezifischem Content + Subtyp-Block + FAQ-Erweiterung (~700W neu pro Page × 6 = ~4.200W Schreibarbeit) — geschätzt **~3,5–5 Std**
- Schema.org-WebPage-Helper + Integration (~15 Min)
- Diff-Check-Script (~20 Min)
- Build + Preview-Verifikation (~15 Min)
- Doku + Karstens Phase 4 (~30 Min)
- **Gesamt: ~5–6,5 Std**, etwas unter Karstens 5–7h-Erwartung — passt.

**Was NICHT in Track-W15B fällt** (laut Prompt):
- Weitere Long-Tail-Slugs (Stundenlohn-LT, Bundesländer-LT, Berufs-LT)
- AdSense-Resubmit-Workflow
- Status-204-Bug, Mobile LCP, Sport-Ausbau — Welle-16-Backlog

---

## Update 22.05.2026 — Phase 2 abgeschlossen

Alle 7 Klärungsfragen umgesetzt. Commits:
- `59331ee` — `docs: w15b long-tail pre-phase-datenbasis v2 ins repo`
- `ed4387c` — `feat: w15b infrastructure — component-refactor + webpage-schema + diff-script`
- `d7083d8` — `feat: w15b pilot — 3000-euro-page auf 1200W aufgewertet`
- `c46a05d` — `feat: w15b — 5 folge-pages auf 1200W aufgewertet (4k/5k/2k/2.5k/3.5k)`
- (folgt) — `docs: welle 15b dokumentiert`

3 neue L-Lehren etabliert (L-W15B-1 bis L-W15B-3) — siehe [welle-status-historie.md](welle-status-historie.md) W15B-Block für Details.

Diff-Check-Ergebnis: alle 5 Folge-Pages Jaccard < 0.40 zu Pilot (höchster: 3500€ mit 0.370, niedrigster: 2000€ mit 0.232).
