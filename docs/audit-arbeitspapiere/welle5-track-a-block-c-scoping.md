# Welle-5-Track-A-Block-C-Scoping — Wohnen-Lib-Extraktionen

**Stand:** 04.05.2026
**Zweck:** Scope-Definition für Welle-5-Track-A-Block-C, den ersten Themen-Sprint des Welle-5-Track-A. Drei der sechs Track-A-Slugs als Wohnen-Themen-Bündel: `mietpreisbremse-rechner`, `grundsteuer-rechner`, `vorfaelligkeitsentschaedigung-rechner`. Track-A-Tail (firmenwagen + afa + riester) bleibt als späterer Steuer-Block-Sprint.
**Aufwandschätzung gesamt:** ~10–11 h reine Sprint-Zeit, verteilt auf 3–4 atomic Sessions plus 1 Closure-Bullet.
**Track-B abgeschlossen am 04.05.26** (`8fc8956` + `b1e4cf0` + `3560d58` Track-B-KOMPLETT-Bullet); Track-A-Tail bleibt separat scoped.
**Kein Code in diesem Dokument.** Code entsteht ausschließlich in den Folge-Modul-Sessions.

---

## 1. Trigger & Scope

**Trigger:** Welle-5-Track-B KOMPLETT abgeschlossen 04.05.26 (4/4 Items, 4 echte Lib-Bugs gefixt, L-37 etabliert). Welle-5-Track-A war im `welle4-scoping.md` Sektion 7 als 6 Lib-Extraktionen (~21 h) angelegt — Wohnen-Themen-Bündelung wurde im Welle-4-Schluss als sinnvoller Aufteilungs-Modus benannt.

**Block-C-Scope:** Drei Wohnrecht-/Immobilien-Slugs aus Track-A:
- `mietpreisbremse-rechner` (BGB §§ 556d-g)
- `grundsteuer-rechner` (GrStG ab 01.01.2025)
- `vorfaelligkeitsentschaedigung-rechner` (BGB §§ 489/502 + BGH-Rechtsprechung)

**Methodischer Charakter:** Welle-2-Pattern (Inline-Component-Berechnung → Lib-Extraktion + Verify), nicht Drift-Fix. Erster Track-A-Sprint, etabliert das Block-C-Pattern für Track-A-Tail.

**L-37-Pflicht:** Pre-Phase pro Slug zieht alle Werte (Mietspiegel-Sätze, Bewertungs-Faktoren, BGH-Schaden-Konzepte) aus der Bestands-Konfig + Bestands-Component, nicht aus Memory. Die frische Lehre aus Track-B-B4-Pre-Phase wird sofort angewandt.

---

## 2. Vor-Entscheidungen

| # | Entscheidung | Begründung |
|---|---|---|
| **E1** | **Block-C-Scope = 3 Wohnen-Slugs.** Track-A-Tail (firmenwagen + afa + riester) bleibt für späteren Steuer-Block-Sprint mit eigenem Scoping-Doc. | Themen-Bündelung erlaubt Wohnrecht-Domänenwissen einmalig aufzubauen (BGB §§ 489/502/556d-g, BetrKV, GrStG ab 01.01.2025). 3 Slugs entsprechen ~10 h — passender Block-Umfang im Vergleich zu 6×3,5 h sequenziell. Welle-4-Schluss-Empfehlung. |
| **E2** | **Reihenfolge: Komplexitäts-Order.** C1 mietpreisbremse → C2 grundsteuer → C3 VFE. | Mietpreisbremse hat klar definierten Lookup-Pattern (Mietspiegel + Modernisierung-Zuschlag); grundsteuer ist mittel-komplex (3 Bewertungs-Modelle nach Bundesland); VFE ist komplex wegen BGH-Rechtsprechung (Aktiv-/Passiv-Wiederanlage, Verwaltungsaufwand, Risiko-Abschlag). Pre-Phase pro Modul kann revidieren analog Track-B-E1. |
| **E3** | **Welle-2-Pattern strikt fünf-stufig pro Slug:** (1) Pre-Phase Component-Inline-Identifikation, (2) Lib-Extraktion `lib/berechnungen/<slug>.ts` neu, (3) Component-Refactor auf Lib-Konsum, (4) `scripts/verify-<slug>.ts` analog Welle-4-M2/M3-Pattern, (5) L-30-Konsumenten-Sweep-Tail. | Etablierte Welle-2-Disziplin (z. B. herzfrequenz-zonen-Extraktion in Welle-4-M1b, elternzeit in M2b, ehegattenunterhalt in M3a). Stufen 4+5 unterscheiden Track-A von reinem Welle-2 (zusätzliche Verify+Sweep-Verifikation). |
| **E4** | **L-37-Pflicht in Pre-Phase pro Slug:** SSOT-Werte aus Konfig + Bestands-Component lesen, nicht aus Memory. Werte explizit mit Quellen-Zeile zitieren (analog `berechneESt2026 Z. 70–89`-Pattern aus B4). | Frisch etablierte Lehre aus Track-B-B4-Pre-Phase. Wohnen-Werte (Mietspiegel-Sätze 2026, Hebesätze, BGH-Schaden-Werte) sind drift-anfällig und lib-extern — höchstes L-37-Risiko aller Welle-5-Slugs. |
| **E5** | **Verify-Pattern: `cases[]`-Array bevorzugt** für Block-C-Slugs. | Tabellen-Lookups (Mietspiegel, Bewertungs-Modelle, BGH-Schaden-Werte) führen zu vielen Test-Cases mit Tolerance-Bedarf bei Geld-Werten. `eq()`-Funktion-Pattern wäre weniger lesbar. Etabliert in Welle-4-M2/M3. |
| **E6** | **Externe-Quellen-Pflicht im JSDoc-Header pro Lib:** mind. 1 Primärquelle (gesetze-im-internet, BGH-Urteil, Mieterbund-Mietspiegel, Landesgesetz Grundsteuer-B-Modell) explizit benannt + URL/Stand wenn nicht-trivial. | Welle-4-E6-Konsistenz. Wohnrecht hat besonders viel Streit-Rechtsprechung — primäre Quellen-Disziplin verhindert Memory-vs-Tatsache-Drifts (vgl. L-37). |
| **E7** | **L-30-Konsumenten-Sweep-Tail pro Slug** mit Multi-Line-Grep (L-32). Prüft, ob bestehende Slugs jenseits des Track-A-Slugs die neue Lib konsumieren wollen würden (z. B. „mietspiegel-Lib aus mietpreisbremse" könnte für nebenkosten-rechner relevant sein). Befunde dokumentieren, nicht zwingend erweitern. | Welle-2-/Welle-4-Pattern. Bei Welle-4-M3a hat L-30-Sweep gezeigt, dass `unterhalt.ts` strukturell von DT-SB-Konstanten profitieren könnte — wurde dokumentiert, nicht erweitert. Analog für Block-C: Befund-Dokumentation > Scope-Erweiterung. |
| **E8** | **Memory-Lehren übernehmen ohne Re-Diskussion:** L-30 bis L-37 aus Welle-4 + Welle-5-Track-B. Insbesondere L-32 (Multi-Line-Grep), L-33 (TestCase-Helper-Type), L-34 (Sanity-Check vor Lib-Drift-Behauptung), L-35 (Lib-Realität schlägt Konfig-Erklärtext), L-36 (Cross-Lib-Computation in Test-Erwartungen), **L-37 (SSOT-Werte-Lookup vor Scoping-Schreiben — frisch etabliert in B4)**. | Drei Welle-Konsolidierungen als Audit-Praxis. Nicht erneut diskutieren. |

---

## 3. Welle-5-Track-A-Block-C-Module

Drei Mini-Module C1–C3. Pro Modul: Eingangs-Befund-Erwartung, Soll-Patch nach Welle-2-Pattern, Test-Update, Risiken, geschätzter Aufwand. Detaillierte Code-Diskussion entsteht in der jeweiligen Modul-Session.

### C1 — Mietpreisbremse-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `MietpreisbremseRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/mietpreisbremse.ts`. Vermutete Lib-Struktur (Pre-Phase verifiziert): Mietspiegel-Lookup nach PLZ/Ortsteil + Wohnungsgröße/Baujahr/Lage-Faktoren, vorvertraglicher Mietzins-Schutz (10 % Aufschlag bzw. Vor-Mietzins), Modernisierungszuschlag (§ 559 BGB, 8 % der Modernisierungskosten p. a.), Ausnahme-Tatbestände (Erstvermietung nach umfassender Modernisierung § 556f BGB), Auskunftsanspruch-Ergebnis. |
| **Werkzeug** | (1) Pre-Phase mit L-37: `MietpreisbremseRechner.tsx` Component-Inline-Logik lesen, Mietspiegel-Werte/-Pattern in der bestehenden Konfig identifizieren. (2) Lib-Extraktion mit Konstanten-Block (Modernisierung-Zuschlag-Faktor 0.08, Vor-Mietzins-Aufschlag 1.10) + Funktionen `berechneMietpreisbremse(input)`. (3) Component-Refactor auf Lib-Konsum, useMemo. (4) `scripts/verify-mietpreisbremse.ts` mit ~30–40 Cases (Mietspiegel-Eckwerte + Modernisierungs-Edge-Cases + Ausnahme-Tatbestände). (5) L-30-Sweep. |
| **Erwartete Befunde-Klasse** | Mittel. Hauptrisiko: Mietspiegel-Werte sind regional (PLZ-Lookup-Tabelle?) — bei großer Tabelle ggf. SSOT-Refactor zu eigener `lib/parameter/mietspiegel-2026.ts` (analog L-37-Pattern aus B4-`TARIF_2026`). Pre-Phase entscheidet. |
| **Abbruchkriterium** | Lib + Component + Verify-Script grün, L-30-Sweep dokumentiert. |
| **Real-Aufwand** | ~3 h (Pre-Phase 30 + Lib 60 + Component 45 + Verify 60 + L-30+Doku 25). |

### C2 — Grundsteuer-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `GrundsteuerRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/grundsteuer.ts`. Vermutete Lib-Struktur (Pre-Phase verifiziert): GrStG ab 01.01.2025 mit drei Bewertungs-Modellen — Bundesmodell (14 BL: B-Norm), Modifiziertes Modell (BY: Flächen-Faktor), Wertabhängig (BW: 70/130 % Wohnen), zusätzlich Modifiziert (NDS+HE: Lage-Faktor). Pro Modell: Steuermesszahl × Hebesatz × Bewertungs-Größe. Stichtag-Switch wahrscheinlich nicht relevant (GrStG-Reform ist seit 01.01.2025, kein Übergang in 2026). |
| **Werkzeug** | (1) Pre-Phase mit L-37: `GrundsteuerRechner.tsx` + Konfig lesen, drei Bewertungs-Modelle als Funktions-Boundary identifizieren, Hebesätze-Tabelle prüfen. (2) Lib-Extraktion mit Konstanten-Block (Steuermesszahlen pro Modell-Typ, BW-70/130-%-Faktor, BY-Flächen-Faktor) + Funktionen `berechneGrundsteuer(input)` mit Modell-Switch. (3) Component-Refactor. (4) `scripts/verify-grundsteuer.ts` mit ~25–35 Cases (3 Modelle × ~8 Cases + Edge). (5) L-30-Sweep. |
| **Erwartete Befunde-Klasse** | Mittel-niedrig. GrStG-Reform-Werte sind seit 2025 stabil. Hauptrisiko: Hebesätze (kommunale Variabilität) — wahrscheinlich als Eingabefeld statt Tabellen-Lookup, das vereinfacht die Lib. |
| **Abbruchkriterium** | Lib + Component + Verify grün, L-30 dokumentiert. |
| **Real-Aufwand** | ~3,5 h (Pre-Phase 30 + Lib 75 + Component 45 + Verify 60 + L-30+Doku 30). |

### C3 — Vorfälligkeitsentschädigung-Lib-Extraktion

| | |
|---|---|
| **Was wird extrahiert?** | `VorfaelligkeitsentschaedigungRechner.tsx` Inline-Berechnung in neue `lib/berechnungen/vorfaelligkeitsentschaedigung.ts`. Vermutete Lib-Struktur (Pre-Phase verifiziert): Schaden-Differenz-Methode nach BGH-Rechtsprechung (BGH XI ZR 388/14 + ältere Urteile) — Aktiv-Wiederanlage (Pfandbrief-Rendite) vs. Passiv-Wiederanlage (Re-Refinanzierungs-Marge), Verwaltungsaufwand (~ 100 €/Jahr), Risiko-Abschlag (Sondertilgungsrechte), Marge-Reduzierung. Plus § 489 BGB 10-Jahres-Cap (nach 10 Jahren ordentliches Kündigungsrecht des Schuldners). |
| **Werkzeug** | (1) Pre-Phase mit L-37: `VorfaelligkeitsentschaedigungRechner.tsx` + Konfig lesen, BGH-Schaden-Konzepte als Funktionen identifizieren. Mehrere BGH-Urteile lesen falls Konfig sie nicht aufzählt. (2) Lib-Extraktion mit Konstanten-Block (Verwaltungsaufwand-Default 100 €/J., Risiko-Abschlag-Faktor) + Funktionen `berechneVfeAktiv(input)`, `berechneVfePassiv(input)`, `berechneVfe(input)` als Aggregat. (3) Component-Refactor. (4) `scripts/verify-vorfaelligkeitsentschaedigung.ts` mit ~35–45 Cases (Aktiv-Methode + Passiv-Methode + Aggregat + 10-Jahres-Cap + Edge). (5) L-30-Sweep. |
| **Erwartete Befunde-Klasse** | Mittel-hoch. BGH-Rechtsprechung ist Hauptrisiko — Pre-Phase prüft, ob die Component die aktuelle BGH-Linie modelliert (BGH XI ZR 388/14 zur Aktiv-/Passiv-Wahl). Eventuelle Diskrepanzen werden L-35-klassifiziert (Lib-Realität schlägt Konfig-Erklärtext). |
| **Abbruchkriterium** | Lib + Component + Verify grün, L-30 dokumentiert. Bei substanziellen BGH-Diskrepanzen ggf. eigener Track-B-artiger Drift-Fix-Sprint später (out-of-Block-C-Scope). |
| **Real-Aufwand** | ~4 h (Pre-Phase 45 + Lib 90 + Component 45 + Verify 75 + L-30+Doku 30). |

---

## 4. Reihenfolge-Empfehlung

**Komplexitäts-Order (E2):** C1 → C2 → C3.

| Slot | Modul | Aufwand | Charakteristik |
|---|---|---|---|
| 1 | C1 mietpreisbremse | ~3 h | Klar definierter Lookup-Pattern, etabliert Block-C-Workflow |
| 2 | C2 grundsteuer | ~3,5 h | 3 Bewertungs-Modelle, mittel-komplexer Switch in der Lib |
| 3 | C3 VFE | ~4 h | BGH-Rechtsprechung, mehrere Schaden-Konzepte |

**Stretch-Stopp-Punkte:** Block-C kann nach jedem Modul pausieren — kein Closure-Zwang. Falls Karsten nach C2 pausiert: C3 als Block-C-Tail in späterer Session.

---

## 5. Methodik-Disziplin

| Lehre | Block-C-Anwendung |
|---|---|
| **L-30** | Pflicht in jedem Modul (E7): Konsumenten-Sweep prüft, ob bestehende Slugs die neue Lib künftig konsumieren würden. Befunde dokumentieren in Status-Historie-Bullet, nicht zwingend erweitern. |
| **L-32** | Multi-Line-Grep in Pre-Phase pro Slug für Component-Inline-Logik-Identifikation und L-30-Sweep. Standardpattern aus Welle-4-M0b. |
| **L-33** | Standby für Verify-Scripts mit `T \| null`-Returntyp (Edge-Cases mit Null-Returns wahrscheinlich in C2 + C3). Boolean-Wrapper-Pattern aus M1c reaktivieren bei Bedarf. |
| **L-34** | Standardanwendung: vor jeder „Lib-Drift"-Behauptung Sanity-Check. Bei Welle-2-Lib-Extraktion ist das primär: Component-Inline-Logik korrekt in Lib übertragen, dann Verify gegen externe Quellen (BGB, GrStG, BGH). Test-Konstruktions-Drifts sind häufiger als Lib-Bugs. |
| **L-35** | Anwendung in JSDoc-Header pro Lib: nicht-modellierte Tatbestände dokumentieren („Lib modelliert NICHT: …"). Wohnrecht-typisch: BGB-Sondervorschriften, BGH-Tail-Rechtsprechung, regionale Mietspiegel-Varianten. |
| **L-36** | Optional bei verketteten Lib-Aufrufen (z. B. wenn `vorfaelligkeitsentschaedigung.ts` `berechneZinseszinz` aus einer Bestand-Lib konsumiert). Pre-Phase identifiziert Cross-Lib-Pattern. |
| **L-37** | **Pflicht in Pre-Phase pro Slug** (E4): SSOT-Werte aus Konfig + Bestands-Component lesen, nicht aus Memory. Mietspiegel-Werte, Hebesätze, BGH-Schaden-Konzepte, Modernisierungs-Faktor, etc. müssen explizit zitiert werden mit Quellen-Zeile. |
| **Pre-5a** | Vor jedem Modul: SSOT-Werte gegen die getroffene Variante prüfen (Mietspiegel-Sätze 2026, Hebesätze-Beispiele, BGH-Aktiv-/Passiv-Wahl). |
| **Pre-5b** | Volltext-Lesung der Bestands-Component vor Lib-Extraktion, um Inline-vs-Lib-Boundary klar zu trennen. UI-State (Format-Helfer, Tailwind-Klassen, Validierungs-Hinweise) bleibt in der Component. |

---

## 6. Out-of-Scope

| Was | Warum |
|---|---|
| Track-A-Tail (firmenwagen + afa + riester) | Eigenes Scoping-Doc bei späterem Steuer-Block-Sprint; Aufwand ~10 h, andere Themen-Domäne. |
| Track-B-Items (alle ✅ am 04.05.26) | KOMPLETT abgeschlossen. |
| 152c Pendlerpauschalen-SSOT | Geparkt bis 45-Cent-Reform-BGBl-Verabschiedung. |
| Welle-4-Header-LAUFEND→KOMPLETT-Korrektur | Bewusste Konvention-Konsistenz mit Welle-3-Tail-Block. |
| AdSense-Re-Review-Folge-Aktionen (Prompts 68 + 85) | Geparkt bis AdSense-Approval. Kein Block-C-Trigger. |
| Welle-5-KOMPLETT-Closure | Erfolgt erst, wenn Track-A komplett (Block-C + Track-A-Tail) durch ist. Block-C-Closure-Bullet ist Zwischen-Stand. |
| Inline-Logik-Refactor außerhalb der drei Slugs | Nur die drei Component-Inline-Berechnungen werden in Libs extrahiert. Andere Components mit ähnlichen Pattern (z. B. `berechneESt2026` Inline-Konstanten — Welle-4-Tail-Doku) bleiben out-of-scope. |
| Mietspiegel-Lib als eigenständige Parameter-Lib | Falls Pre-Phase C1 zeigt, dass Mietspiegel-Werte als eigene `lib/parameter/mietspiegel-2026.ts` extrahiert werden sollten (analog `TARIF_2026`-Pattern aus B4): Befund melden, ggf. C1-Scope-Erweiterung Karsten-Decision. Default: Werte bleiben in `mietpreisbremse.ts`. |

---

## 7. Track-A-Block-C-Closure-Kriterium

Block-C ist KOMPLETT, wenn:

1. **C1–C3 committed:** je 3 atomic Commits pro Slug (Lib + Component-Refactor zusammen, Verify, Status-Historie-Doku) = **9 atomic Commits total**.
2. **Build 205+/(205+N) grün** vor und nach jedem Slug — mit `N` = Anzahl neuer Component-/Test-Files je nach Build-Auflösung.
3. **Alle 3 neuen Verify-Scripts grün** gegen externe Quellen (BGB §§ 489/502/556d-g, GrStG, BGH-Rechtsprechung).
4. **L-30-Konsumenten-Sweep-Tail pro Slug dokumentiert** (Befund-Liste, nicht zwingend Scope-Erweiterung).
5. **Closure-Bullet** in `welle-status-historie.md` als Welle-5-Track-A-Block-C-KOMPLETT-Top-Block (eigener Block, nicht Track-B-Tail).
6. **Track-A-Tail:** unverändert offen, bleibt für separate Sprint-Sessions.
7. **CLAUDE.md-Lehren-Liste:** keine neue Lehre erwartet (Block-C ist Anwendung etablierter Lehren L-30 bis L-37). Falls eine neue methodische Erkenntnis fällt: L-38 ergänzen.
8. **Coverage-Bilanz-Update:** ABGEDECKT 51→54 (+3: mietpreisbremse + grundsteuer + vorfaelligkeitsentschaedigung). Welle-4-Bilanz wird nicht rückwirkend geändert; Block-C-Bullet enthält die neue Bilanz.

---

## 8. Welle-Status-Historie-Eintrag (vorgesehen nach Scoping-Abschluss)

In `docs/audit-arbeitspapiere/welle-status-historie.md`, **neuer Top-Block** „Welle 5 Track-A Block-C — Wohnen-Sprint":

```markdown
## Welle 5 Track-A Block-C — Wohnen-Sprint (04.05.2026, LAUFEND)

Sammel-Block für Welle-5-Track-A-Block-C-Aktivitäten. Trigger:
Welle-5-Track-B KOMPLETT am 04.05.2026, Wohnen-Themen-Bündelung als
erster Track-A-Sprint priorisiert. Block-C-Scope: 3 Lib-Extraktionen
(C1 mietpreisbremse, C2 grundsteuer, C3 vorfaelligkeitsentschaedigung).
Track-A-Tail (firmenwagen + afa + riester, ~10 h) bleibt für späteren
Steuer-Block-Sprint.

- Welle-5-Track-A-Block-C-Scoping ✅ 04.05.26 — siehe
  `welle5-track-a-block-c-scoping.md`, 3 Lib-Extraktionen C1–C3
  priorisiert (Komplexitäts-Order). Geschätzt 3–4 atomic Sessions,
  ~10–11 h gesamt. Out-of-Scope: Track-A-Tail, andere Welle-5-Items,
  152c, AdSense-Re-Review-Folge-Aktionen. Strategie-Entscheidungen:
  E1 Block-C-Scope = 3 Wohnen-Slugs, E2 Komplexitäts-Order, E3
  Welle-2-Pattern fünf-stufig pro Slug, E4 L-37-Pflicht in Pre-Phase,
  E5 cases[]-Verify-Pattern, E6 Externe-Quellen-Pflicht im JSDoc, E7
  L-30-Sweep-Tail pro Slug, E8 Lehren L-30 bis L-37 übernehmen.
```

**Commit-Message:** `docs: Welle-5-Track-A-Block-C-Scoping-Dokument für Wohnen-Lib-Extraktionen`

---

## 9. Track-A-Tail-Outlook (informativ, nicht Block-C-Scope)

Track-A-Tail bleibt unverändert wie in `welle4-scoping.md` Sektion 7 dokumentiert:

| Slug | Lib-Name (vorgesehen) | Norm-Anker | Aufwand-Schätzung |
|---|---|---|---|
| firmenwagen-rechner | `lib/berechnungen/firmenwagen.ts` | § 6 Abs. 1 Nr. 4 EStG (1-%-Regel + Fahrtenbuch) | ~3 h |
| afa-rechner | `lib/berechnungen/afa.ts` | § 7 EStG | ~3 h |
| riester-rechner | `lib/berechnungen/riester.ts` | AltZertG + § 10a EStG | ~4 h |

**Track-A-Tail-Aufwand-Schätzung:** ~10 h, eigenes Scoping-Doc bei Sprint-Start.

**Welle-5-KOMPLETT-Trigger:** beide Tracks A (Block-C + Tail) und B durch + Closure-Bullet in `welle-status-historie.md` als Welle-5-KOMPLETT-Top-Block.

**Welle-5-Gesamt-Aufwand-Update:**
- Track-B ✅ ~3 h (bereits abgeschlossen)
- Track-A-Block-C ~10–11 h (dieses Scoping)
- Track-A-Tail ~10 h (späteres Scoping)
- **Welle-5-Total: ~23–24 h** (leichte Korrektur gegen ursprüngliche ~24,5-h-Schätzung in `welle4-scoping.md`)
