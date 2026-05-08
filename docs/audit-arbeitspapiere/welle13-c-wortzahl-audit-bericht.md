# W13.C — Wortzahl-Audit Phase A (09.05.2026)

**Audit-Scope:** Worst-Case-Inventur aller 170 Rechner-Configs vor AdSense-Re-Submission. Identifikation von Long-Tail-Rechnern mit dünnem `erklaerung`-Content, die im Random-Sampling des AdSense-Crawlers durchfallen könnten.

**Methodik:** Phase A — nur Befund, keine Code-Edits. Skript-Inventur über alle 9 Kategorie-Files in `lib/rechner-config/`. Pro Rechner: Slug, Kategorie, Wortzahl `erklaerung`, FAQ-Anzahl, Status.

**Klassifikation laut Prompt:**
- 🔴 **KRITISCH:** `erklaerung` <300 W ODER FAQ <3
- ⚠ **DÜNN:** `erklaerung` 300–700 W UND FAQ <5
- ✅ **OK:** `erklaerung` ≥700 W UND FAQ ≥5
- ⭐ **GOLDSTANDARD:** `erklaerung` ≥1.500 W UND FAQ ≥8

---

## Abschnitt 1: Statistik

**Gesamtzahl Rechner:** 170

| Klassifikation | Anzahl |
|---|---|
| 🔴 KRITISCH | **3** |
| ⚠ DÜNN | 137 |
| ✅ OK | 30 |
| ⭐ GOLDSTANDARD | **0** |

**Verteilungs-Notiz:** Die strikte Prompt-Definition (`erklaerung` allein ≥1.500 W) ergibt 0 GOLDSTANDARD, weil in der W13-Welle der Content typisch ~1.150–1.290 W `erklaerung` plus 500–680 W FAQ erreicht — Gesamtsumme über 1.500, einzelne `erklaerung` aber unter 1.500.

**Zusatz-Bilanz nach W13-Realdefinition (Static-Content gesamt = `erklaerung` + FAQ ≥1.500 W + FAQ ≥8):**

| Slug | Kategorie | gesamt-W | FAQ |
|---|---|---|---|
| mietrechner | wohnen | 1.889 | 8 |
| tagerechner | alltag | 1.845 | 8 |
| spritkosten-rechner | auto | 1.822 | 8 |
| stromkosten-rechner | wohnen | 1.762 | 8 |
| stundenlohn-rechner | finanzen | 1.700 | 8 |
| zinsrechner | finanzen | 1.663 | 8 |
| dreisatz-rechner | alltag | 1.630 | 8 |
| unterhaltsrechner | arbeit | 1.622 | 12 |
| bmi-rechner | gesundheit | 1.546 | 8 |

→ **9 Rechner** erfüllen den W13-Realstandard (8 aus W13-Welle + unterhaltsrechner als Vorgänger; brutto-netto-rechner rendert Inline und ist nicht im Static-Content-Audit erfasst).

**Verteilungs-Eckdaten:**
- Min `erklaerung`-Wortzahl: 236 W (heizkosten-rechner)
- Max `erklaerung`-Wortzahl: 1.266 W (spritkosten-rechner)
- Median `erklaerung`-Wortzahl: 555 W
- Davon `erklaerung` ≥ 1.000 W: 10 Rechner

Die 137 DÜNN-Klassifikationen entsprechen dem **statistischen Normalfall** (Median 555 W liegt mitten im DÜNN-Bereich) und sind nicht panisch zu interpretieren — der Crawler wertet 500-W-Erklärtexte mit FAQ-Schema in der Regel als ausreichend, sofern der Rechner eine sinnvolle Funktion erfüllt. Echtes AdSense-Risiko liegt erst im KRITISCH-Bereich.

---

## Abschnitt 2: Top-30 dünnste Rechner (sortiert aufsteigend nach `erklaerung`-Wortzahl)

| Rang | Slug | Kategorie | erklW | FAQ | gesamtW | Status | Datei:Zeile |
|---|---|---|---|---|---|---|---|
| 1 | heizkosten-rechner | wohnen | 236 | 3 | 348 | 🔴 KRITISCH | wohnen.ts:247 |
| 2 | gehaltsvergleich | finanzen | 291 | 5 | 465 | 🔴 KRITISCH | finanzen.ts:790 |
| 3 | potenz-rechner | mathe | 299 | 5 | 549 | 🔴 KRITISCH | mathe.ts:1135 |
| 4 | estrich-rechner | wohnen | 313 | 5 | 519 | ⚠ DÜNN | wohnen.ts:1634 |
| 5 | countdown | alltag | 317 | 5 | 469 | ⚠ DÜNN | alltag.ts:365 |
| 6 | nebenkosten-rechner | wohnen | 322 | 4 | 510 | ⚠ DÜNN | wohnen.ts:100 |
| 7 | beton-rechner | wohnen | 344 | 5 | 584 | ⚠ DÜNN | wohnen.ts:1566 |
| 8 | spenden-rechner | finanzen | 345 | 5 | 546 | ⚠ DÜNN | finanzen.ts:2576 |
| 9 | wahrer-stundenlohn | finanzen | 347 | 4 | 518 | ⚠ DÜNN | finanzen.ts:852 |
| 10 | reisekosten-rechner | alltag | 349 | 5 | 559 | ⚠ DÜNN | alltag.ts:1476 |
| 11 | fahrrad-rahmengroesse-rechner | auto | 350 | 5 | 593 | ⚠ DÜNN | auto.ts:623 |
| 12 | raucher-rechner | gesundheit | 357 | 4 | 534 | ⚠ DÜNN | gesundheit.ts:111 |
| 13 | lebenszeit-rechner | alltag | 360 | 4 | 522 | ⚠ DÜNN | alltag.ts:427 |
| 14 | firmenwagen-rechner | auto | 367 | 5 | 620 | ⚠ DÜNN | auto.ts:767 |
| 15 | steuerprogression-rechner | finanzen | 372 | 5 | 608 | ⚠ DÜNN | finanzen.ts:2505 |
| 16 | midijob-rechner | finanzen | 374 | 5 | 599 | ⚠ DÜNN | finanzen.ts:1956 |
| 17 | budget-rechner | alltag | 381 | 5 | 585 | ⚠ DÜNN | alltag.ts:1628 |
| 18 | zeitwert-rechner | alltag | 389 | 5 | 616 | ⚠ DÜNN | alltag.ts:1551 |
| 19 | gefrierdauer-rechner | kochen | 394 | 6 | 667 | ⚠ DÜNN | kochen.ts:1045 |
| 20 | noten-international | mathe | 394 | 5 | 622 | ⚠ DÜNN | mathe.ts:1318 |
| 21 | grunderwerbsteuer-rechner | wohnen | 396 | 4 | 554 | ⚠ DÜNN | wohnen.ts:291 |
| 22 | nebenjob-rechner | finanzen | 404 | 5 | 615 | ⚠ DÜNN | finanzen.ts:2638 |
| 23 | sonnenschutz-rechner | gesundheit | 409 | 5 | 646 | ⚠ DÜNN | gesundheit.ts:1182 |
| 24 | betriebskosten-rechner | finanzen | 412 | 6 | 665 | ⚠ DÜNN | finanzen.ts:2361 |
| 25 | grundsteuer-rechner | wohnen | 412 | 5 | 621 | ⚠ DÜNN | wohnen.ts:1046 |
| 26 | schenkungssteuer-rechner | finanzen | 416 | 6 | 703 | ⚠ DÜNN | finanzen.ts:2704 |
| 27 | taxi-rechner | auto | 417 | 5 | 679 | ⚠ DÜNN | auto.ts:690 |
| 28 | pace-rechner | sport | 425 | 6 | 711 | ⚠ DÜNN | sport.ts:5 |
| 29 | ggt-kgv-rechner | mathe | 431 | 5 | 707 | ⚠ DÜNN | mathe.ts:1192 |
| 30 | zufallszahl-generator | mathe | 433 | 5 | 662 | ⚠ DÜNN | mathe.ts:1254 |

---

## Abschnitt 3: KRITISCH-Liste (priorisierte Fix-Liste)

### 🔴 K-1 — heizkosten-rechner (wohnen)

- **URL:** `/wohnen/heizkosten-rechner`
- **erklaerung:** 236 W (Soll-Schwelle 300, Lücke −64 W)
- **FAQ:** 3 (Soll-Schwelle 5, Lücke −2 FAQ; OK-Schwelle 5, GS-Schwelle 8)
- **Datei:Zeile:** `lib/rechner-config/wohnen.ts:247`
- **Doppel-Befund:** sowohl Wortzahl als auch FAQ-Anzahl unter Schwelle. Höchstes Risiko der drei.
- **Empfehlung:** Quick-Fix auf 700 W (~250 W Ergänzung) plus 2 FAQ ergänzen, oder Voll-Sprint auf W13-Stand (1.500 W gesamt + 8 FAQ).

### 🔴 K-2 — gehaltsvergleich (finanzen)

- **URL:** `/finanzen/gehaltsvergleich`
- **erklaerung:** 291 W (Soll-Schwelle 300, Lücke −9 W)
- **FAQ:** 5 ✓ (über Schwelle)
- **Datei:Zeile:** `lib/rechner-config/finanzen.ts:790`
- **Befund:** Knapp unter Wortzahl-Schwelle, FAQ-Anzahl ausreichend. Quick-Fix wäre minimaler Eingriff (50–100 W ergänzen) für OK-Status, oder Voll-Sprint für Goldstandard.

### 🔴 K-3 — potenz-rechner (mathe)

- **URL:** `/mathe/potenz-rechner`
- **erklaerung:** 299 W (Soll-Schwelle 300, Lücke −1 W)
- **FAQ:** 5 ✓ (über Schwelle)
- **Datei:Zeile:** `lib/rechner-config/mathe.ts:1135`
- **Befund:** Praktisch an der Schwelle (1 W Lücke). Trivialer Quick-Fix (1 zusätzlicher Satz reicht), oder Voll-Sprint.

---

## Abschnitt 4: Empfehlung für Karsten

**Status:** **3 KRITISCH-Befunde** — gemäß Prompt-Bandbreite Empfehlung **W13.C.1 Quick-Fix-Sprint** (~30–60 Min) vor AdSense-Re-Submission.

### Zwei Strategie-Optionen

**Option A — Quick-Fix (~30 Min):**
Alle drei KRITISCH-Rechner auf den OK-Schwellenwert anheben (≥700 W `erklaerung` + ≥5 FAQ).
- heizkosten-rechner: ~470 W ergänzen + 2 neue FAQ
- gehaltsvergleich: ~410 W ergänzen
- potenz-rechner: ~400 W ergänzen

Bringt alle drei aus der KRITISCH-Zone, AdSense-Sampling-Risiko reduziert.

**Option B — Voll-Sprint W13-Stand (~90–120 Min):**
Alle drei auf den W13-Goldstandard (Static-Content gesamt ≥1.500 W + 8 FAQ + Anwendungsfälle + Häufige Fehler im Bold-Lead-Pattern). Konsistenz mit den Top-10 W13-Rechnern. Strategischer, falls AdSense bei nochmaliger Ablehnung Random-Sampling auf Long-Tail-Slugs durchführt.

**Pragmatische Empfehlung:** **Option A**. Alle drei Lücken sind unterhalb der 300-W-Schwelle entstanden, wobei zwei Rechner nur 1–9 Wörter darunter liegen. Mit moderater Ergänzung sind sie aus der KRITISCH-Zone draußen, ohne die Welle zu verlängern. Voll-Sprints können später als W13.D-Welle nachgezogen werden, wenn das AdSense-Re-Review erfolgreich durch ist.

### Long-Tail-DÜNN (137 Rechner)

Die DÜNN-Liste ist statistisch normal (Median 555 W). **Kein Fix-Bedarf vor AdSense-Submission**. Ggf. später iterativ: priorisiert nach Traffic / SEO-Wert die Top-Trafic-Slugs aus DÜNN auf OK-Niveau heben.

### AdSense-Sign-off-Empfehlung

- 0 KRITISCH → grünes Licht ❌ (nicht erfüllt)
- 1–3 KRITISCH → **W13.C.1 Quick-Fix erforderlich** ✓ (aktueller Stand)
- 4+ KRITISCH → Mini-Welle nötig ❌ (nicht zutreffend)

→ **W13.C.1-Quick-Fix-Sprint** für die 3 KRITISCH-Rechner durchführen, danach AdSense-Re-Submission.

---

## Übergabe

- **Gesamtzahl Rechner:** 170
- **Verteilung:** 3 🔴 KRITISCH / 137 ⚠ DÜNN / 30 ✅ OK / 0 ⭐ GOLDSTANDARD (strikte Prompt-Definition); 9 ⭐ Goldstandard nach W13-Realdefinition
- **Top-3 dünnste:** heizkosten-rechner 236W/3FAQ, gehaltsvergleich 291W/5FAQ, potenz-rechner 299W/5FAQ
- **Bericht-File:** `docs/audit-arbeitspapiere/welle13-c-wortzahl-audit-bericht.md` (diese Datei)
- **Empfehlung:** W13.C.1 Quick-Fix-Sprint (~30 Min, Option A) vor AdSense-Re-Submission
