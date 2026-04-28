# Validation-Sweep Scoping — Welle 3 Tail

**Stand:** 28.04.2026
**Zweck:** Scope-Definition für den letzten offenen Welle-3-Backlog-Punkt „Validation-Sweep". Sieben atomare Module, klare Reihenfolge, Befundungsformat pro Modul, harte Abbruchkriterien, geschätzter Gesamtaufwand 4–6 Sessions.
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in den Folge-Modul-Sessions.

---

## 1. Vorab-Entscheidungen

Vor jedem Modul-Vorschlag wurden fünf Vor-Entscheidungen getroffen. Bei abweichender Karsten-Präferenz: Modul-Liste anpassen, Aufwandsschätzung neu rechnen.

| # | Entscheidung | Begründung |
|---|---|---|
| E1 | **Backtick-Falle als Modul mit zwei Outputs:** einmaliger Fix-Sweep + permanenter prebuild-Hook. | Konsistent mit slug-drift-scan-Pattern (132.5/132.6). Hook verhindert Re-Drift, Sweep schließt aktuelle Lücke. |
| E2 | **A11y-Regression als manuelle Stichprobe** der 19 A11y-Sprint-URLs (April 2026). Kein Lighthouse-CLI-Setup in Welle 3. | A11y-Sprint erst zwei Wochen alt, Drift-Risiko niedrig. CLI-Setup lohnt sich erst, wenn der Sprint-Zyklus mehrere Module betrifft. |
| E3 | **FAQ-Doku-Drift als enge Stichprobe** auf die in Welle-3 geänderten Rechner (151a–e + 157a–f, ~14 Rechner). | Nicht automatisierbar. Konsistent mit Methodik-Lehre 28 (Memory-Backlog ist Scope-Definition). Begrenzte Stichprobe schützt vor Scope-Creep. |
| E4 | **Befundungsformat-Default = (b) eigener Validation-Report** unter `docs/audit-arbeitspapiere/validation-<modul>.md`. Ausnahmen: (a) bei Multi-File-Konsolidierungsbedarf, (c) bei <5 erwarteten Befunden. | Konsistente Doku-Spur über alle Module. Lessons-Learned-Anker pro Modul. |
| E5 | **Verify-Script-Coverage-Lücke** (~85 Rechner ohne Verify-Script gegen externe Oracles) ist **Out-of-Scope**. | Andere Sprint-Charakteristik (neue Scripts schreiben, nicht Konsistenz prüfen). Gehört in einen separaten Welle-4-Sprint, nicht in den Validation-Sweep. |

---

## 2. Sweep-Module

Sieben atomare Module. Jedes ist 30 Min – 3 h. Reihenfolge in Sektion 3 begründet.

### M1 — Backtick-Sweep + Permanent-Hook

| | |
|---|---|
| **Was wird geprüft?** | Inline-Backticks (`` ` ``) innerhalb von Template-Literal-String-Werten in `lib/rechner-config/*.ts`, speziell in den Feldern `erklaerung`, `formel`, `beispiel`, `faq`. Diese schließen das umgebende Template-Literal vorzeitig und brechen den esbuild-Build (Lehre Backtick-Falle, 26.04.2026 + 149b). |
| **Werkzeug** | Neu zu bauen: `scripts/check-backticks.mjs` als prebuild-Hook (analog `slug-drift-scan.mjs`). Einmaliger Aufruf `node scripts/check-backticks.mjs` als Pre-Sweep, Resultate fixen, dann Hook in `package.json#scripts.prebuild` einreihen. |
| **Erwartete Befunde-Klasse** | P1 falls aktuell unbemerkte Backticks im Build vorhanden sind (Build wäre dann bereits rot — wahrscheinlich 0 Treffer). P3 als reine Zukunfts-Absicherung. |
| **Abbruchkriterium** | Sweep-Output: 0 Treffer **und** Hook ist im prebuild aktiv und Build grün. |
| **Befundungsformat** | (c) Direkt Fix-Prompt bei Treffern. Bei 0 Treffern: Vermerk in `welle-status-historie.md` Welle-3-Tail-Block, kein eigener Report. |

### M2 — Norm-Zitate-Stilkonsistenz

| | |
|---|---|
| **Was wird geprüft?** | Stilkonsistenz aller Norm-Zitate in `lib/rechner-config/*.ts` (Standard-Format „§ X Abs. Y Satz Z Nr. N GesetzG", BMF/Finanzgerichte-Zitierweise). Beispiel-Befund aus 157a: „§ 9 Abs. 1 Nr. 4 EStG" → korrekt „§ 9 Abs. 1 **Satz 3** Nr. 4 EStG". |
| **Werkzeug** | Neu zu bauen (Mini): Regex-Sweep `/§\s*\d+[a-z]?(\s+Abs\.\s+\d+[a-z]?)?(\s+Satz\s+\d+)?(\s+Nr\.\s+\d+[a-z]?)?\s+[A-ZÖÄÜ][a-zA-Z]+G?\b/g` über alle `*.ts` in `lib/rechner-config/`. Output: alle Treffer + Auftrittsorte als Liste, manuelle Stil-Review pro Cluster. Whitelist-Konzept analog slug-drift-scan. |
| **Erwartete Befunde-Klasse** | P3 — Stilkonsistenz-Polish. Vereinzelte P2 möglich, falls falsch zitiert wird. |
| **Abbruchkriterium** | Alle gefundenen Norm-Zitate klassifiziert (korrekt / Stil-Polish / sachlich falsch). Polish + falsche Zitate gefixt. Whitelist sauber. |
| **Befundungsformat** | (b) `docs/audit-arbeitspapiere/validation-norm-zitate.md` mit Treffer-Liste, Klassifizierung, Fix-Status. |

### M3 — SSOT-Konsumption-Audit

| | |
|---|---|
| **Was wird geprüft?** | Hartkodierte Werte in `lib/rechner-config/*.ts` und `components/` (excl. `*Rechner.tsx`-Default-States in legitimen UI-Inputs), die in einer SSOT-Lib stehen. Quelle der Soll-Werte: CLAUDE.md Rechtsstand-Tabelle (Z. 298+) + Welle-2-SSOT-Libs (`strompreis.ts`, `eeg-einspeiseverguetung.ts`, `beg-foerderung.ts`, `vpi.ts`, `pv-ertragsmodell.ts`, `feiertage.ts`, `kfz-steuer-parameter.ts`, `bafoeg-parameter.ts`, `buergergeld-parameter.ts`). Drift-Hot-Spot laut Welle-2 Stufe 3 Wohnen (Pre-147 Strompreis-Inkonsistenz, heizkosten-Component-Default 36 → 28 ct, balkon-solar Nord-Faktor 0,40 → 0,60). |
| **Werkzeug** | Neu zu bauen: Erweiterung des `grep`-Befehls aus CLAUDE.md Z. 238–240 zu einem Sweep-Script über das ganze Repo. Whitelist für legitime Beispielzahlen in `beispiel`-Feldern (mindestens „Beispiel:"-Marker im Kontext) und für Component-`useState`-Defaults, die als UI-Vorbelegung dienen. |
| **Erwartete Befunde-Klasse** | Gemischt: P3 dominant (Einzel-Drift in Erklärtext-Beispielen), vereinzelt P2 möglich (Component-Defaults bei tatsächlich genutzten Berechnungs-Inputs, vgl. PoolkostenRechner Pre-148b). |
| **Abbruchkriterium** | Alle Treffer klassifiziert (legitim / drift), Drift-Liste entweder gefixt oder als P3-Backlog für Welle 4 dokumentiert. |
| **Befundungsformat** | (b) `docs/audit-arbeitspapiere/validation-ssot-konsumption.md` mit Treffer-Tabelle, Klassifizierung, Fix-/Backlog-Status. |

### M4 — Cross-Links Meta-Routen

| | |
|---|---|
| **Was wird geprüft?** | Interne Cross-Links auf Nicht-Rechner-Routen (`/qualitaet`, `/ueber-uns`, `/barrierefreiheit`, `/impressum`, `/datenschutz`, `/kontakt`, `/feedback`, `/suche`, `/ki-rechner`) — verweisen sie auf existierende Targets? slug-drift-scan deckt nur Rechner-Routen ab (`/<kat>/<slug>`). |
| **Werkzeug** | Option A: Erweiterung von `slug-drift-scan.mjs` um Meta-Routen-Whitelist. Option B: Neues Mini-Script `scripts/meta-route-scan.mjs`. Entscheidung in der Modul-Session basierend auf der Drift-Häufigkeit. Default: Option A (weniger Code-Surface). |
| **Erwartete Befunde-Klasse** | P3 oder leer. Routen sind selten geändert, slug-drift-scan-Lehre 15 zeigt aber, dass Drift unauffällig auftritt. |
| **Abbruchkriterium** | Alle Treffer auf existierende Routen verifiziert oder gefixt. Whitelist Meta-Routen final. |
| **Befundungsformat** | (c) Direkt Fix-Prompt + Hook-Erweiterung. Vermerk in `welle-status-historie.md`. |

### M5 — AffiliateBox-Konsistenz

| | |
|---|---|
| **Was wird geprüft?** | Alle 117 AffiliateBox-Aufrufe + 16 AmazonBox-Aufrufe gegen die Platzierungsregeln aus CLAUDE.md (Z. 49 — Mathe gar nicht, AmazonBox nicht auf Gesundheit/Finanzen/Mathe; Z. 56–58 — thematischer Match Pflicht, keine Finanz-Affiliates auf Gesundheit). |
| **Werkzeug** | `grep -rn "AffiliateBox\|AmazonBox" components/ app/` + Lookup pro File welcher Kategorie der jeweilige Rechner angehört (via `lib/rechner-config/`). Manueller Review der Treffer. |
| **Erwartete Befunde-Klasse** | P3, niedrig. Eingespielter Workflow seit Prompt 106. Risiko vor allem bei den 30 CosmosDirekt-Einbauten (145b) und 16 AmazonBox-Einbauten (122-amazon). |
| **Abbruchkriterium** | Alle Boxen klassifiziert (regelkonform / Verstoß), Verstöße entfernt oder dokumentiert. |
| **Befundungsformat** | (b) `docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md`. |

### M6 — FAQ/Erklaerung-Drift-Stichprobe

| | |
|---|---|
| **Was wird geprüft?** | Konsistenz zwischen `faq`, `erklaerung`, `formel`, `beispiel` innerhalb eines Konfig-Eintrags. Stichprobe: die 14 in Welle-3 frisch geänderten Rechner (Cluster 151a–e: pendlerpauschale, kuendigungsfrist, abfindung, mutterschutz, unterhalt, elternzeit; Cluster 157a–f: pendlerpauschale, kuendigungsfrist, abfindung, scheidungskosten, zugewinnausgleich, unterhalt, ehegattenunterhalt, arbeitslosengeld). |
| **Werkzeug** | Manuelle Sichtkontrolle. Per Rechner: Konfig-Eintrag öffnen, FAQ-Antworten gegen erklaerung-Absätze und beispiel-Werte abgleichen. |
| **Erwartete Befunde-Klasse** | P3 — typischerweise kleine Begriffs-Inkonsistenzen (z.B. P3-A7-1 unterhalt „bereinigtes Netto" — ähnliche Klasse zu erwarten). |
| **Abbruchkriterium** | Alle 14 Rechner einmal vollständig durchgegangen, Befunde dokumentiert oder gefixt. |
| **Befundungsformat** | (b) `docs/audit-arbeitspapiere/validation-faq-drift.md`. |

### M7 — A11y-Regression-Stichprobe

| | |
|---|---|
| **Was wird geprüft?** | Lighthouse 100/100 auf den 19 URLs aus dem A11y-Sprint April 2026. Risiko-Cluster: Welle-3-Component-Änderungen (LazySection-Removal in 154, Süd-OLG-Toggle in 150e, ueberstunden-Refactor P3-B1) könnten a11y-Regressionen eingeführt haben. |
| **Werkzeug** | Manueller Lighthouse-Run im Browser pro URL. Karsten in Inkognito (Live-Verifikation als Ground Truth, Lehre aus Welle 1). |
| **Erwartete Befunde-Klasse** | Niedrig. P2 falls eine der Component-Änderungen a11y bricht, sonst leer. |
| **Abbruchkriterium** | Alle 19 URLs mit Lighthouse 100/100 oder Befunde dokumentiert. |
| **Befundungsformat** | (c) Bei Treffer Fix-Prompt. Bei 0 Treffern: Vermerk in `welle-status-historie.md`. |

---

## 3. Reihenfolge-Vorschlag

| # | Modul | Aufwand | Reihenfolge-Begründung |
|---|---|---|---|
| 1 | M1 Backtick | ~1 h | **Akut wegen Build-Break-Risiko.** Billig, klare Methodik, schließt eine offene Lehre permanent ab. Ergebnis ist gleichzeitig „Schutz für alle anderen Module". |
| 2 | M2 Norm-Zitate | ~2–3 h | Eingespielte Methodik aus Welle-3-Audits (157a–f). Klar abgrenzbar, schnell. |
| 3 | M3 SSOT-Konsumption | ~2–3 h | **Höchstes Drift-Risiko, aber komplexeste Methodik** — nach den schnelleren Modulen, wenn die Konzentration noch da ist. |
| 4 | M4 Meta-Routen | ~1 h | Kleines Modul, am slug-drift-scan-Pattern angelehnt. Kann parallel zu M3 in einer Session erledigt werden. |
| 5 | M5 Affiliate-Konsistenz | ~1–2 h | Stand-Sprint, kein Akut-Druck. Klare Methodik. |
| 6 | M6 FAQ-Drift | ~1–2 h | Manuell, frisst Konzentration. Bewusst spät, weil 14 Rechner Sichtkontrolle bedeuten. |
| 7 | M7 A11y-Stichprobe | ~30 Min | Kurz, am Ende als Schluss-Sanity-Check nach allen Code-Touches. |

**Bündelungs-Vorschlag pro Session (4–6 Sessions):**
- Session A: M1 + M2 (~3–4 h)
- Session B: M3 + M4 (~3–4 h)
- Session C: M5 + M6 + M7 (~3–4 h)
- Optionale Folge-Sessions: pro M3-Drift-Cluster eine Fix-Session, falls die Treffer es nötig machen.

Bei freier Tageszeit-Wahl: **Session A zuerst** wegen des Backtick-Hooks. Danach Reihenfolge flexibel.

---

## 4. Out-of-Scope

| Item | Warum nicht im Sweep? | Wo stattdessen? |
|---|---|---|
| **Live-vs-Repo-Drift** (Vercel-Deploy-SHA vs. main-HEAD) | Operativer Deploy-Sync-Check, kein inhaltlicher Repo-Sweep. Andere Charakteristik. | Eigenes Mini-Modul „Deploy-Sync-Check" (~10 Min, einmalig). Nach Bedarf in eine beliebige spätere Session schieben. |
| **Verify-Script-Coverage-Lücke** (~85 Rechner ohne externe-Oracle-Verifikation) | Kein Sweep, sondern Backfill-Sprint. Charakteristik: neue Scripts schreiben, nicht prüfen ob etwas konsistent ist. | Eigene Welle 4 oder als Folge-Cluster nach Welle-3-Abschluss. Priorität niedrig — die meisten der 85 Rechner sind Mengen-Rechner ohne sinnvolle externe Oracles. |
| **TypeScript-strict-Migrations / Build-Performance / Bundle-Size-Audits** | Kein Drift-Risiko, andere Sprint-Charakteristik. | Außerhalb des Audit-Welle-Modells. |
| **152c Pendlerpauschalen-SSOT** | Geparkt bis zur Verabschiedung der 45-Cent-Reform. Trigger extern. | Welle-3-Backlog, als geparktes Item dokumentiert (Trigger: BGBl.-Veröffentlichung des Steueränderungsgesetzes). |

---

## 5. Geschätzter Gesamtaufwand

**~9–12 Std. reine Sweep-Zeit, verteilt auf 4–6 Sessions.**

- Drei Bündelungs-Sessions A/B/C: 9–12 h.
- Ggf. 1–3 Folge-Fix-Sessions, falls M3 substanzielle Drift-Cluster aufdeckt (Aufwand offen, abhängig von Befunden).

Nach Abschluss aller sieben Module ist der Welle-3-Backlog bis auf den geparkten 152c-Slot vollständig geschlossen.

---

## 6. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, im laufenden Welle-3-Tail-Block (kein neuer Top-Block):

```
- Validation-Sweep Scoping ✅ 28.04.26 — siehe validation-sweep-scoping.md, 7 Module priorisiert (M1 Backtick, M2 Norm-Zitate, M3 SSOT-Konsumption, M4 Meta-Routen, M5 Affiliate-Konsistenz, M6 FAQ-Drift, M7 A11y-Stichprobe). Geschätzt 4–6 Folge-Sessions. Out-of-Scope: Deploy-Sync-Check, Verify-Coverage-Lücke (eigene Welle 4).
```

**Commit-Message:** `docs: Validation-Sweep Scoping-Dokument für Welle-3-Tail`
