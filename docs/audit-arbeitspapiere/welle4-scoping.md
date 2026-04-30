# Welle-4-Scoping — Verify-Script-Coverage-Backfill

**Stand:** 30.04.2026
**Zweck:** Scope-Definition für die Welle-4-Aufgabe „Verify-Script-Coverage-Lücke" (E5 aus `validation-sweep-scoping.md`). Ein Pre-Sprint M0 zum Anomalie-Fix, fünf inhaltliche Module M1–M5 nach Lib-Komplexität gebündelt. Lib-Extractions werden auf Welle 5 ausgelagert (nicht im Welle-4-Scope).
**Aufwandschätzung gesamt:** ~16–22 h reine Sprint-Zeit, verteilt auf 4–6 Sessions.
**Eingangs-Inventar:** Pre-Scoping-Inventar vom 30.04.2026 — 35 ABGEDECKT, 21 TEILABGEDECKT, ~38 OFFEN-ORACLE, ~62 OFFEN-MENGEN (out-of-scope), ~14 OFFEN-MARKT (out-of-scope). Drei Strategie-Entscheidungen + 16 Grenzfall-Klassifikationen siehe Vor-Entscheidungs-Sektion.
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in den Folge-Modul-Sessions.

---

## 1. Vor-Entscheidungen

| # | Entscheidung | Begründung |
|---|---|---|
| E1 | **Welle-4-Tiefe: Pure-Verify-Backfill, Lib-Extractions auf Welle 5 verschieben.** | Welle 3 lief 4 Tage / 14 Commits / 7 Module — Welle 4 mit 30–40 h gemischtem Verify+Refactor wäre die längste Welle bisher. Pure-Verify (~16–22 h) ist klarer Modus, Lib-Extractions (Welle-2-Charakteristik: SSOT-Schaffung) gehören als eigenes Track-Konzept in Welle 5. Sauberer Cut: Welle-4-Output ist „N % der Lib-Logik verifiziert", Welle-5-Output ist „M Inline-Component-Berechnungen in SSOT-Libs extrahiert". |
| E2 | **Pre-Sprint M0 als 30-Min-Eintritts-Klärung** vor inhaltlichen Modulen. Klärt A-01 (`verify-ehegattenunterhalt.ts` ohne Lib-Import), A-03 (`COMPONENT_SLUG_OVERRIDES`-Map), A-07 (Underscore-Helper-Konvention). | A-01 und A-03 ändern die Modul-Inventur (z. B. `pfaendungsrechner` rutscht von OFFEN zu ABGEDECKT). Ad-hoc-im-Modul-erledigen würde Modul-Zählung instabil halten. 30 Min Investition gegen saubere Inventur ist Aufwand-Nutzen positiv. |
| E3 | **Bündelung pro Lib-Komplexität (einfach → komplex)**, nicht pro Kategorie oder Themen-Cluster. | Lohnsteuer-Cluster ist bereits durch 5 Verify-Scripts abgedeckt, würde gegen leeres Cluster laufen. Pro-Kategorie hat keine echte Themen-Kohärenz (Arbeit + Finanzen je 7+ heterogene Slugs). Komplexitäts-Reihenfolge: schnelle frühe Erfolge konsolidieren das Verify-Pattern, komplexere Scripts profitieren von etablierten Helpern. |
| E4 | **Verify-Pattern: beide Idiome zulassen** (`eq()`-Funktion vs. `cases[]`-Array, Methodik-Diff in Pre-Scoping-Inventar Sektion 5). Pro Lib-Charakter den passenderen wählen — numerisch-zentriert mit Tolerance-Default ggf. `cases[]`, logisch-zentriert mit strikter Equality ggf. `eq()`. Nicht erzwingen. | Beide Patterns sind etabliert und idiomatisch sinnvoll. Erzwingen würde Refactor-Aufwand für existierende Scripts produzieren ohne Mehrwert. |
| E5 | **Aufruf-Konvention `npx tsx scripts/verify-XYZ.ts`** (nicht .mjs, nicht via `node`), Helper-Parameter explizit typisiert (Lehre 149d). | Etablierte Repo-Konvention, kein Anlass zur Abweichung. |
| E6 | **Externe-Quellen-Pflicht in JSDoc-Header pro Verify-Script:** mind. 1 Primärquelle (BGBl., gesetze-im-internet, BMF, Destatis, BMBF, BfV, etc.) explizit benannt + URL/Stand wenn nicht-trivial verlinkbar. Ohne Primärquelle: Script gilt als „Zirkular-Verifikation" und bricht die Welle-4-Methodik. | Konsistent mit Validation-Sweep-Methodik (SSOT-vor-Memory, Pre-5a). Verifizierung gegen die getestete Lib selbst hat keinen Wert. |
| E7 | **OFFEN-MENGEN und OFFEN-MARKT bleiben out-of-scope** für Welle 4, ohne Karsten-Override. Reine arithmetische Mengenrechner (Mathe, Kochen, Konsum-Schätzungen) und Markt-Konventions-Rechner (Fahrschule, Gehalts-Schätzung, Mietrendite) sind nicht sinnvoll mit externen Oracles abgleichbar. | Aufwand-Nutzen-Bilanz: Markt-Schätzungen würden nur „Schätzung × Faktor"-Tests produzieren, die das Oracle nachbauen statt zu prüfen. |
| E8 | **Memory-Lehren übernehmen:** L-30 (Konsumenten-Sweep nach SSOT-Refactor), L-31 (Kifb-Dekompositionstexte ET/zusammen-Bezug nicht mischen), Pre-5a/5b-Disziplin (SSOT-vor-Memory + Volltext-vor-UNKLAR) gelten als etablierte Audit-Praxis und werden in jedem Modul angewandt. | Drei Welle-3-Validierungen reichen als Konsolidierung. Nicht erneut diskutieren. |

---

## 2. Welle-4-Module

Sechs Module: 1× Pre-Sprint M0 + 5 inhaltliche Module M1–M5. Jedes ist 30 Min – 5 h. Reihenfolge in Sektion 3 begründet.

### M0 — Anomalie-Klärung (Pre-Sprint)

| | |
|---|---|
| **Was wird gemacht?** | (a) `verify-ehegattenunterhalt.ts` lesen + klassifizieren (Stub / Component-Verify / Custom-Pattern). Falls Stub → als Welle-4-M3-Modul-Kandidat reklassifizieren. Falls Component-Verify → eigene Klasse einführen. Falls Custom-Pattern → Inventar-Skript erweitern. (b) `COMPONENT_SLUG_OVERRIDES`-Map definieren für die 8 Camel/Kebab-Mismatches aus Pre-Scoping A-03 (KwPsRechner, EinheitenRechner, GleichungsloeserRechner, PfaendungRechner, ProzVeraenderungRechner, TaschenrechnerRechner, AfbgRechner, ZufallszahlRechner). (c) Konvention dokumentieren: Underscore-Prefix-Libs (`_helpers.ts`, `_lohnsteuer-pap-2026.ts` falls künftig) sind „nicht-zu-verifizierende Helper" — Inventar-Skript filtert sie aus, Welle-4-Scope schließt sie aus. |
| **Werkzeug** | Manuelle Inspektion + Inline-Edit am Inventar-Skript (in der Session, kein Repo-Commit). Override-Map als kleines TypeScript-Snippet zur Wiederverwendung in M1–M5. |
| **Erwartete Befunde** | A-01: vermutlich Custom-Pattern oder Component-Verify. A-03: 2 Slugs landen automatisch in ABGEDECKT (`pfaendungsrechner` via `verify-pfaendung-p1+p2`, `aufstiegs-bafoeg-rechner` via `verify-afbg`). A-07: trivial. |
| **Abbruchkriterium** | Bilanz neu gerechnet, Modul-Inventur stabil. |
| **Befundungsformat** | (b) Phase-A-Bullet im Welle-4-Tail-Container von `welle-status-historie.md`, kein eigener Validation-Report. |

### M1 — Trivial-Verify-Backfill (1–2-h-Scripts)

| | |
|---|---|
| **Was wird verifiziert?** | Existierende Libs ohne Verify-Script, deren Logik klein, abgeschlossen und mit harten externen Oracles testbar ist. Erwartete Slugs (nach M0-Bilanz-Update): `mwst-rechner` (UStG § 12, Mehrwertsteuer-Logik), `gewerbesteuer-rechner` (GewStG, einfacher Hebesatz-Mechanismus), `kindergeld-rechner` (BKGG + EStG, Tabellen-Werte), `inflationsrechner` (vpi.ts ist bereits verifiziert für andere Slugs — Konsumptions-Trace prüfen, ggf. existing verify ausweiten oder eigenes verify-inflation.ts), `herzfrequenz-zonen-rechner` (Tanaka/Fox/Karvonen-Formeln sportmedizinisch klar — Sport-Kategorie hat aktuell 0 Verify-Coverage). |
| **Werkzeug** | Pro Slug 1 neues `scripts/verify-<lib>.ts`-File. Helper-Pattern frei nach Lib-Charakter. |
| **Erwartete Befunde-Klasse** | Niedrig. Hauptfund-Risiko: alte Konstanten-Werte in der Lib (Pre-Welle-3-Drift analog M3 BAföG-Pattern). Falls echte Drifts: in Phase B fixen analog M3. |
| **Abbruchkriterium** | Pro Slug Verify-Script grün gegen externe Soll-Werte. |
| **Befundungsformat** | (b) Kein eigener Validation-Report bei 0 Drift-Funden — nur welle-status-historie-Bullet. Bei Drift-Funden: Validation-Report `validation-m1-drift.md` analog M3. |

### M2 — Sozial-/Familien-Recht-Verify (2–3-h-Scripts)

| | |
|---|---|
| **Was wird verifiziert?** | Mittelkomplexe Libs für Familienrecht/Sozialleistungen, deren Logik mehr Edge-Cases hat als M1. Erwartete Slugs (nach M0): `pendlerpauschale-rechner` (§ 9 Abs. 1 Satz 3 Nr. 4 EStG mit Mobilitätsprämie § 101 EStG für Geringverdiener), `mutterschutz-rechner` (MuSchG mit Frühgeburt-Staffelung 2/6/8 Wochen + Antragspflicht-Logik), `elternzeit-rechner` (BEEG mit § 17 Abs. 1 Urlaubskürzung + § 17 Abs. 2 Übertragung + 32-h-Korridor), `kuendigungsfrist-rechner` (BGB § 622 mit § 169 SGB IX + § 113 InsO + EuGH Kücükdeveci), `arbeitslosengeld-rechner` (§§ 153/147/155 SGB III mit Stkl-Stichtag + Nebenverdienst-Schwelle). |
| **Werkzeug** | Pro Slug 1 neues `scripts/verify-<lib>.ts`-File. Pattern: vermutlich `cases[]`-Array passt besser (mehr Test-Cases, Tolerance-Bedarf bei Geld-Werten). |
| **Erwartete Befunde-Klasse** | Mittel. Welle-3-Touch-Rechner haben durch M6 (FAQ-Drift) bereits Werte-Sweep erlebt — primärer Drift-Hotspot ist die Lib-Ebene selbst, nicht Konfig-Texte. M3-Pattern (SSOT-Konsumption) hat die Konfig-Werte bereits gefixt. |
| **Abbruchkriterium** | Alle Verify-Scripts grün. |
| **Befundungsformat** | (b) wie M1. |

### M3 — Edge-Case-Komplex-Verify (3–5-h-Scripts)

| | |
|---|---|
| **Was wird verifiziert?** | Komplexere Libs mit vielen Edge-Cases oder Methodik-Verzweigungen. Erwartete Slugs (nach M0): `ehegattenunterhalt-rechner` (3/7-Methode + Süd-OLG 0,45 + Anschlussunterhalt + Erwerbsobliegenheit + Anrechnung — falls A-01 zeigt, dass `verify-ehegattenunterhalt.ts` Stub ist; sonst entfernt aus M3), `unterhalt-rechner` (Mindestbedarf 4 Altersstufen + Bereinigtes Netto + Selbstbehalt-Wohnkosten + Higher-Group-Umstufung), `pflegegeld-rechner` (5 Pflegegrade + Kombinationsleistung + Verhinderungs-/Kurzzeitpflege + Entlastungsbetrag), `nebenkosten-rechner` (Betriebskostenspiegel-Mittelwerte mit umlegbaren vs. nicht-umlegbaren Posten — Mieterbund-Stand 2023). |
| **Werkzeug** | Pro Slug 1 Verify-Script, oft mit mehreren Cluster-Sektionen pro Test-Cases-Array. |
| **Erwartete Befunde-Klasse** | Mittel-hoch. Bei `unterhalt` und `pflegegeld` ist Drift-Risiko erhöht (M3+M6-Erfahrung: Düsseldorfer Tabelle und Pflegekassen-Werte sind Hot-Spots). Falls echte P1/P2-Drifts gefunden werden: separater Fix-Sprint analog Welle-2-Methodik. |
| **Abbruchkriterium** | Alle Scripts grün, ggf. Drift-Fix-Sprint nachgelagert. |
| **Befundungsformat** | (b) Bei substanziellen Drifts eigener Validation-Report. |

### M4 — Lohnsteuer-Tail-Cases

| | |
|---|---|
| **Was wird verifiziert?** | Edge-Cases um Lohnsteuer/SV-Logik, die nicht von den 5 existierenden Lohnsteuer-Verify-Scripts abgedeckt sind. Erwartete Slugs (nach M0-Konsumptions-Trace): `nettolohn-optimierer` (Steuerklassen-Wechsel-Logik), `kapitalertragsteuer-rechner` (KapESt + Soli + KiSt + Sparer-Pauschbetrag § 20 Abs. 9 EStG), `splitting-rechner` (§ 26 EStG Ehegatten-Splitting Spezialfälle), `gehaltserhoehung-rechner` (Brutto-Netto-Differenz mit Stichtag-Werten), `steuerprogression-rechner` (Progressionsvorbehalt § 32b EStG), `steuerklassen-vergleich-rechner` (Stkl I-VI + Faktor-Verfahren § 39f EStG), `lohnsteuer-rechner` (falls Konsum-Lücke existiert), `einkommensteuer-rechner` (falls Konsum-Lücke existiert). |
| **Werkzeug** | Falls existierende Lohnsteuer-Verify-Scripts (`verify-tarif-2026`, `verify-lohnsteuer-pap`, `-regression`, `-vvi`, `-midijob-p1`) bereits Test-Cases für die fehlenden Slugs enthalten: Konsumptions-Trace + ggf. Erweiterung statt neuer Scripts. Sonst: 1 neues Verify-Script pro Slug-Cluster. |
| **Erwartete Befunde-Klasse** | Niedrig (Lohnsteuer-Logik wurde in Welle 1 + 2 mehrfach verifiziert; Tail-Cases sind oft Konsumenten-Tests, nicht Berechnungs-Bugs). |
| **Abbruchkriterium** | Alle Tail-Cases abgedeckt entweder durch erweiterte existing Scripts oder neue. |
| **Befundungsformat** | (b) Bei 0 Drifts welle-status-historie-Bullet, sonst Validation-Report. |

### M5 — Bilanz-Closure + Welle-5-Outlook

| | |
|---|---|
| **Was wird gemacht?** | (a) Welle-4-Coverage-Bilanz neu rechnen: Anteil ABGEDECKT vor/nach Welle 4. (b) Welle-5-Outlook formulieren: 6 Lib-Extractions (firmenwagen-rechner, afa-rechner, riester-rechner, mietpreisbremse-rechner, vorfaelligkeitsentschaedigung-rechner, grundsteuer-rechner) als separate Track-Items mit Aufwand-Schätzung pro Slug, Trigger-Bedingungen (z. B. „wenn Audit-Welle für Wohnen Block C kommt"). (c) Lehren-Konsolidierung: Welle-4-Lehren in `welle-status-historie.md` ergänzen, falls neue Patterns entstanden — sonst nur L-30/L-31-Wiederbestätigung notieren analog M6. |
| **Werkzeug** | Reiner Doku-Sprint. Aktualisierung `welle-status-historie.md` + ggf. CLAUDE.md/projekt-referenz/SKILL.md. |
| **Erwartete Befunde-Klasse** | Doku, keine Code-Edits. |
| **Abbruchkriterium** | Welle-4-KOMPLETT-Bullet im `welle-status-historie.md`, Welle-5-Outlook formuliert, Memory-Status synchron. |
| **Befundungsformat** | (b) Bullet-Closure analog Validation-Sweep-KOMPLETT-Pattern (M7). |

---

## 3. Reihenfolge-Vorschlag

| # | Modul | Aufwand | Reihenfolge-Begründung |
|---|---|---|---|
| 0 | M0 Anomalie-Klärung | ~30 Min | **Eingangs-Voraussetzung.** Sauberes Inventar vor M1-Start. |
| 1 | M1 Trivial-Verify | ~5–7 h | **Schnelle frühe Erfolge.** Konsolidiert Verify-Pattern, kleine Scripts erlauben Pattern-Auswahl-Lernen. 5 Slugs × 1–2 h. |
| 2 | M2 Sozial-/Familien-Recht | ~5–7 h | Mittelkomplex, baut auf etablierten M1-Patterns auf. 5 Slugs × 2–3 h. |
| 3 | M3 Edge-Case-Komplex | ~6–8 h | Hochrisiko-Lib-Tests. Bewusst spät, weil Pattern-Reife durch M1/M2 wichtig ist. Bei Drift-Fund ggf. zwischengeschaltete Fix-Sprints. 4 Slugs × 3–5 h. |
| 4 | M4 Lohnsteuer-Tail-Cases | ~3–4 h | Konsumptions-Trace zuerst (nicht alle Slugs brauchen neue Scripts), dann ggf. 2–3 neue Scripts für echte Lücken. |
| 5 | M5 Bilanz-Closure | ~30 Min | Reine Doku, finalisierender Sweep. |

**Bündelungs-Vorschlag pro Session (4–6 Sessions):**
- Session A: M0 + M1 (Teil 1, ~3 h Slugs) → ~3,5 h
- Session B: M1 (Teil 2) + M2 (Teil 1) → ~4 h
- Session C: M2 (Teil 2) + M3 (1 Slug) → ~4 h
- Session D: M3 (Rest) → ~5 h
- Session E: M4 + M5 → ~4 h

Bei freier Tageszeit-Wahl: **Session A zuerst**, danach Reihenfolge flexibel. M3 niemals als erstes Modul (Pattern-Reife-Vorrang).

---

## 4. Out-of-Scope

| Item | Warum nicht in Welle 4? | Wo stattdessen? |
|---|---|---|
| **6 Lib-Extractions** (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer) | Andere Sprint-Charakteristik: Refactor + SSOT-Schaffung, nicht Verify. Welle-2-Pattern, nicht Welle-3/4. | **Welle 5** (separater Track), Outlook in M5. |
| **OFFEN-MENGEN-Slugs** (~62) | Reine Mengenrechnung ohne externes Oracle. Mathe, Kochen, Konsum-Mengen-Rechner. | Bewusst kein Welle-Sprint. Mengenrechnung ist durch arithmetische Korrektheit der Berechnungs-Funktion verifiziert (Component-Tests, falls überhaupt nötig). |
| **OFFEN-MARKT-Slugs** (~14) | Markt-Konventionen ohne hartes Soll. Fahrschulkosten, Mietrendite, Branchenformeln. | Bewusst kein Welle-Sprint. Falls einzelne Slugs hochgestuft werden sollen (z. B. wenn Destatis-Lookup für gehaltsvergleich integriert wird), als Welle-4-Erweiterung in einer Folge-Session. |
| **Helpers-Libs** (`_helpers.ts` + ggf. weitere Underscore-Prefix-Files) | Konvention aus M0: Underscore-Prefix-Libs sind nicht-zu-verifizieren. Utility-Funktionen ohne eigene Berechnungslogik. | Bewusst aus dem Inventar gefiltert. |
| **Drift-Fix-Sprints aus Welle-4-Befunden** | Falls M2/M3 echte P1/P2-Drifts in Libs aufdecken, ist der Fix selbst nicht im Welle-4-Verify-Scope, sondern eine eigene Session-Charakteristik (analog Welle-2-Methodik). | Pro Drift-Fund eigener Fix-Sprint, vor dem Verify-Script-Commit. Welle 4 misst dann den gefixten Stand. |
| **Verify-Script-Run als CI-Hook** | Aufwand-Nutzen: Verify-Scripts laufen aktuell nur on-demand bei Refactor-Verdacht. CI-Integration würde Build-Zeit erhöhen ohne klaren Mehrwert (Lib-Werte ändern sich selten). | Out-of-Scope. Falls künftig CI-Pflicht-Hook gewünscht, eigener kleiner Sprint mit `npm run verify-all`. |
| **152c Pendlerpauschalen-SSOT** | Geparkt bis 45-Cent-Reform-Verabschiedung. Trigger extern. | Bleibt in Welle-3-Backlog, nicht Welle 4. |

---

## 5. Geschätzter Gesamtaufwand

**~16–22 Std. reine Sprint-Zeit, verteilt auf 4–6 Sessions.**

- M0: 30 Min
- M1: 5–7 h (5 Slugs)
- M2: 5–7 h (5 Slugs)
- M3: 6–8 h (4 Slugs, oder 3 falls A-01 ehegattenunterhalt entfällt)
- M4: 3–4 h (Konsumptions-Trace + 2–3 neue Scripts)
- M5: 30 Min

Drift-Fix-Sprints (falls M2/M3 echte Drifts aufdecken) sind nicht eingerechnet — Aufwand offen, abhängig von Befunden.

Nach Welle-4-Abschluss erwartete Coverage-Bilanz: **~85 % der Lib-Logik verifiziert** (35 ABGEDECKT vor + 21 TEILABGEDECKT-zu-VOLL-ABGEDECKT + ~22 neue ABGEDECKT durch M1–M4 = ~78/170 + Welle-5-Lib-Extraktionen werden weitere ~6 hinzufügen). Welle-5 schließt dann auf ~90 % auf.

---

## 6. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, **neuer Top-Block** „Welle 4 — Verify-Coverage-Backfill":

```markdown
## Welle 4 — Verify-Coverage-Backfill (01.05.2026, LAUFEND)

Sammel-Block für Welle-4-Aktivitäten. Trigger: Validation-Sweep KOMPLETT
am 30.04.2026, Welle-3 reduziert auf 152c-Slot. Welle-4-Scope: ~22 neue
Verify-Scripts gegen existierende Libs in `lib/berechnungen/`, Bündelung
nach Lib-Komplexität.

- Welle-4-Scoping ✅ 01.05.26 — siehe welle4-scoping.md, 6 Module priorisiert (M0 Anomalie-Klärung, M1 Trivial-Verify, M2 Sozial-/Familien-Recht, M3 Edge-Case-Komplex, M4 Lohnsteuer-Tail, M5 Bilanz-Closure). Geschätzt 4–6 Folge-Sessions, ~16–22 h gesamt. Out-of-Scope: 6 Lib-Extractions auf Welle 5 verschoben (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer); OFFEN-MENGEN (~62) und OFFEN-MARKT (~14) bewusst ohne Verify-Sprint.
```

**Commit-Message:** `docs: Welle-4-Scoping-Dokument für Verify-Coverage-Backfill`

---

## 7. Welle-5-Outlook (informativ, nicht Welle-4-Scope)

Kurze Vorschau, damit das Welle-4-Scoping nicht den Eindruck erweckt, die Lib-Extractions seien vergessen.

**6 Lib-Extractions als Welle-5-Track:**

| Slug | Lib-Name (vorgesehen) | Norm-Anker | Aufwand-Schätzung |
|---|---|---|---|
| firmenwagen-rechner | `lib/berechnungen/firmenwagen.ts` | § 6 Abs. 1 Nr. 4 EStG (1-%-Regel + Fahrtenbuch) | ~3 h |
| afa-rechner | `lib/berechnungen/afa.ts` | § 7 EStG | ~3 h |
| riester-rechner | `lib/berechnungen/riester.ts` | AltZertG + § 10a EStG | ~4 h |
| mietpreisbremse-rechner | `lib/berechnungen/mietpreisbremse.ts` | BGB §§ 556d-g | ~3 h |
| vorfaelligkeitsentschaedigung-rechner | `lib/berechnungen/vorfaelligkeitsentschaedigung.ts` | BGB §§ 489/502 + BGH-Rechtsprechung | ~4 h |
| grundsteuer-rechner | `lib/berechnungen/grundsteuer.ts` | GrStG ab 01.01.2025 | ~4 h |

**Welle-5-Pattern pro Slug:** (1) Inline-Berechnung in Component identifizieren, (2) in neue Lib extrahieren, (3) Component umstellen, (4) Verify-Script schreiben, (5) Konsumenten-Sweep falls weitere Slugs die gleiche Lib nutzen könnten (analog L-30).

**Welle-5-Trigger:** Empfehlung: nach Welle 4. Aber kein harter Trigger — Welle 5 könnte auch in Themen-Sprints aufgeteilt werden (z. B. Wohnen-Block-C-Audit zieht mietpreisbremse + VFE + grundsteuer mit). Karsten-Entscheidung beim Welle-4-Abschluss.

**Geschätzter Welle-5-Aufwand:** ~21 h (6 Slugs × ~3,5 h Durchschnitt).
