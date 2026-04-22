# Welle 1 Stufe 4b — Testfall-Katalog

**Stand:** 2026-04-21 (Prompt 119 Audit-Phase)
**Zweck:** Regressions-Basis für Fix-Prompts 120/121/122 und Jahresaudits der Sozialleistungen.

**Legende:**
- **Ist-vor-Fix** = beobachtetes Verhalten am Code-Level (Lib-Konstanten + Komponenten-Bindung) Stand 21.04.2026
- **Soll** = aus Rechtsquelle (SGB II, BAföG, WoGG, ZPO § 850c) und offiziellem Referenz-Rechner (BMBF, BMWSB, BA, BMJ) abgeleitet
- Nach jeweiligem Fix-Pass die Ist-Spalte aktualisieren.

---

## BAFÖG-RECHNER

Referenz: BAföG-Höchstsatz 2026 (unverändert seit 01.08.2024):
Grundbedarf 475 € + Wohnpauschale auswärts 380 € + KV-Zuschlag 102 € + PV-Zuschlag 35 € = **992 €**

### BA-01 (Studentin 21, auswärts, GKV-pflichtversichert, Eltern 3.200 € Netto zusammen)
- **Input:** ausbildung=studium, wohnsituation=eigene, selbstVersichert=true, familienstand=verheiratet, einkommenEltern1 = 40.000 € brutto, einkommenEltern2 = 20.000 € brutto (zusammen ~3.200 € netto), geschwisterInAusbildung=0, keine Kinder, eigenesEinkommen=0, eigenesVermoegen=0
- **Soll:** Gesamtbedarf 992 € − Anrechnung Elterneinkommen (≈ (netto − 2.415) × 0,45). Bei 3.200 € Netto: Anrechnung = (3.200 − 2.415) × 0,45 ≈ 353 €. Förderbetrag ≈ 992 − 353 = **639 €**
- **Ist-vor-Fix:** Gesamtbedarf laut Code: `BEDARF.studium.eigene + KV_ZUSCHLAG + PV_ZUSCHLAG = 934 + 94 + 28 = 1.056 €`. Differenz zu Soll: **+64 €**. — **P1-Beweis veraltete Bedarfssätze.**

### BA-02 (Schüler 17 bei Eltern, Eltern 3.800 € netto)
- **Input:** ausbildung=schule, wohnsituation=eltern, familienstand=verheiratet, Eltern-Netto zusammen 3.800 €, kein Geschwister in Ausbildung, nicht selbstVersichert, keine Kinder
- **Soll:** Bedarf Schüler bei Eltern (§ 12 BAföG) — aktuell 262 € Grundbedarf (2026). Anrechnung: (3.800 − 2.415) × 0,45 = 623 €. Anrechnung > Bedarf → **kein BAföG**.
- **Ist-vor-Fix:** Code-Bedarf 262 €. Anrechnung identisch. Ergebnis: kein BAföG. ✓ (Schüler-Bedarfssatz 262 € könnte aber auch veraltet sein — siehe BA-Cross-Check-Punkt.)

### BA-03 (Student 29, auswärts, Waise/elternunabhängig, familienversichert)
- **Input:** ausbildung=studium, wohnsituation=eigene, familienstand=elternunabhaengig, eigenesEinkommen=0, eigenesVermoegen=0, selbstVersichert=false (familienversichert), keine Kinder
- **Soll:** Voller Höchstsatz ohne KV/PV-Zuschlag = 475 + 380 = **855 €**
- **Ist-vor-Fix:** Code liefert `934 + 0 + 0 = 934 €`. Differenz +79 €. — **P1-Beweis Bedarfssatz.**

### BA-MAX (Höchstsatz voll, selbstversichert, Waise)
- **Input:** wie BA-03 aber selbstVersichert=true
- **Soll:** 475 + 380 + 102 + 35 = **992 €**
- **Ist-vor-Fix:** Code liefert `934 + 94 + 28 = 1.056 €`. Differenz **+64 €/Monat = +768 €/Jahr** zu hoch. — **P1-Beweis.**

---

## WOHNGELD-RECHNER

Referenz: § 12 WoGG 2026 (Dynamisierung 01.01.2025, gültig bis 31.12.2026). Höchstbeträge 1 Person:
| Mietstufe | I | II | III | IV | V | VI | VII |
|---|---|---|---|---|---|---|---|
| Soll 2026 | 361 | 408 | 456 | 511 | 562 | 615 | 677 |
| Lib | 377 | 425 | 473 | 521 | 575 | 634 | 693 |
| Δ | +16 | +17 | +17 | +10 | +13 | +19 | +16 |

### WG-01 (1 Person, Miete 500 €, Einkommen 1.400 € Brutto, Mietstufe IV)
- **Input:** haushaltsmitglieder=1, bruttoEinkommen=1400, miete=500, mietstufe='IV', freibetragErwerbstaetig=true, sonst keine Freibeträge
- **Soll (BMWSB-Rechner approx.):** bereinigtes Einkommen nach 30 %-Pauschale und Erwerbstätigen-Freibetrag. Hoechstbetrag 1P/IV = 511 €. Berücksichtigte Miete = min(500, 511) = 500 €. Wohngeld ca. **180–220 €/Monat**.
- **Ist-vor-Fix:** Lib rechnet nur 10 %-Pauschalabzug, +20 %-Erwerbstätigenfreibetrag. Bereinigtes Einkommen deutlich höher als Soll → Wohngeld zu niedrig. Hoechstbetrag Lib = 521 €. Delta-Kombination zeigt systematischen Fehler. — **P1-Beweis Einkommensbereinigung + Höchstbeträge.**

### WG-02 (4 Personen, Miete 1.200 €, Einkommen 3.200 € Brutto, Mietstufe VI, mit Heizkostenpauschale)
- **Input:** haushaltsmitglieder=4, bruttoEinkommen=3200, miete=1200, mietstufe='VI', heizkostenpauschale=true, freibetragErwerbstaetig=true
- **Soll:** Hoechstbetrag 4P/VI = 1.035 €. Miete gekappt auf 1.035 €. Heizkosten 44,20 €, Klimakomponente 35,70 €. Gesamtmiete 1.114,90 €. Wohngeld-Bereich ca. **350–430 €/Mo**.
- **Ist-vor-Fix:** Lib 4P/VI = 1.072 € (+37 €). Delta einspielt. — **P1 (Höchstbeträge).**

### WG-03 (Rentner-Ehepaar, Miete 750 €, Einkommen 1.900 € Brutto, Mietstufe III)
- **Input:** haushaltsmitglieder=2, bruttoEinkommen=1900, miete=750, mietstufe='III', freibetragSchwerbehindert=true, ohne Erwerbstätigen-Freibetrag (Rentner)
- **Soll (WoGG):** Schwerbehinderten-Freibetrag 1.500 €/J = **125 €/Mo** (§ 17 Nr. 2 WoGG). Hoechstbetrag 2P/III = 551 €. Miete gekappt.
- **Ist-vor-Fix:** Lib nutzt 150 €/Mo Schwerbehinderten-Freibetrag (Delta +25 €/Mo, führt zu höherem Wohngeld). Hoechstbetrag Lib 2P/III = 575 € (+24). — **P1 (Freibetrag + Höchstbetrag).**

### WG-ALLEIN (Alleinerziehenden-Freibetrag mit 2 Kindern)
- **Input:** haushaltsmitglieder=3, 2 Kinder, freibetragAlleinerziehend=true
- **Soll:** 1.320 €/J × 2 Kinder = 2.640 €/J = **220 €/Mo**
- **Ist-vor-Fix:** Lib nutzt pauschal 130 €/Mo unabhängig von Kinderzahl. Bei 2 Kindern Δ = **−90 €/Mo Freibetrag zu niedrig**. — **P1 (Alleinerziehenden-Freibetrag nicht gestaffelt).**

---

## BÜRGERGELD-RECHNER

Referenz: SGB II 2026 (Nullrunde, Besitzschutzregelung § 28a): Regelsätze aus 2025 unverändert.

### BG-01 (Alleinstehend, Miete 450 €, kein Vermögen, kein Einkommen)
- **Input:** bedarfsgemeinschaft='alleinstehend', kinder=[], warmmiete=450, heizkosten=0, einkommen=0, vermoegen=0
- **Soll:** Regelsatz 563 € + KdU 450 € = **1.013 €**
- **Ist-vor-Fix:** Code liefert 1.013 € ✓

### BG-02 (Paar + 2 Kinder 8, 15, Miete 900 €, 600 € Minijob)
- **Input:** bedarfsgemeinschaft='paar-mit-kindern', kinder=[{alter:'6-13'},{alter:'14-17'}], warmmiete=900, einkommen=600
- **Soll:** Regelsatz Paar 1.012 + Kind 8J 390 + Kind 15J 471 = 1.873 €. KdU 900. Bedarf 2.773 €. Einkommensfreibetrag: 100 + (520−100)×0,2 + (600−520)×0,3 = 100 + 84 + 24 = 208 €. Anrechnung 600 − 208 = 392 €. Anspruch **2.381 €**.
- **Ist-vor-Fix:** Code rechnet identisch ✓

### BG-03 (Alleinstehend mit 900 €/Mo, Miete 500 €)
- **Input:** alleinstehend, Miete 500, einkommen=900
- **Soll:** Regelsatz 563 + KdU 500 = 1.063 €. Freibetrag: 100 + 420×0,2 + (900−520)×0,3 = 100+84+114 = 298 €. Anrechnung 900−298 = 602 €. Aufstockung **461 €**.
- **Ist-vor-Fix:** Code-Ergebnis identisch ✓

### BG-MB (Alleinerziehende mit 1 Kind 10 J — Mehrbedarf fehlt)
- **Input:** `bedarfsgemeinschaft='alleinstehend', kinder=[{alter:'6-13'}]`, Miete 600
- **Soll (§ 21 Abs. 3 Nr. 1 SGB II):** Mehrbedarf Alleinerziehend +12 % auf 563 € = **67,56 €/Monat** zusätzlich. Bedarf: 563 + 67,56 + 390 (Kind) + 600 = 1.620,56 €
- **Ist-vor-Fix:** Code ohne Mehrbedarf: 563 + 390 + 600 = 1.553 €. Differenz **−67,56 €/Monat**. — **P2 (Mehrbedarf Alleinerziehende nicht implementiert).**

### BG-KDU (KdU-Angemessenheitsprüfung)
- **Input:** alleinstehend, Miete 800 € (deutlich über lokalem Richtwert z. B. 550 € in ländlicher Region)
- **Soll:** Jobcenter begrenzt auf Angemessenheitsgrenze (nach § 22 SGB II), hier 550 €. Bedarf 563 + 550 = 1.113 €.
- **Ist-vor-Fix:** Code erkennt 800 € voll an → Bedarf 1.363 €. **Keine Angemessenheitsprüfung implementiert.** — **P2 (UX-Hinweis ausreichend, kein Rechner-Fehler da individuelle Angemessenheitsgrenzen lokal sind).**

---

## PFÄNDUNGS-RECHNER

Referenz: Pfändungsfreigrenzen-Bekanntmachung 2026 (BGBl. 2026 I Nr. 80 v. 26.03.2026), § 850c ZPO, Anlage.

### PF-01 (Netto 1.600 €, 0 Unterhalt, Zahltag 15.04.2026 — noch Tabelle 2025)
- **Input:** nettoMonat=1600, unterhaltspflichten=0, stichtag=2026-04-15
- **Soll (Tabelle 2025, § 850c Abs. 3 Pauschalquote):** Freibetrag 1.555 €. Mehrbetrag 45 €. Pfändungsquote 0 Unterhalt = 70 %. Pfändbar **31,50 €** nach Pauschalquote. Laut amtlicher Tabelle (10-€-Stufen) jedoch **≈ 28,59 €** (Abrundung auf nächstniedrigere Stufe).
- **Ist-vor-Fix:** Code liefert 45 × 0,70 = **31,50 €** (Pauschalquote). — **P1 Tabellen-Annäherung**, Delta zu amtlicher Tabelle ~2,91 €. Der Prompt fordert „±0,01 € Toleranz für Pfändung" — nicht erreicht.

### PF-02 (Netto 2.000 €, 2 Unterhalt, Zahltag 15.08.2026 — Tabelle 2026)
- **Input:** nettoMonat=2000, unterhaltspflichten=2, stichtag=2026-08-15
- **Soll (Tabelle 2026):** Freibetrag 1.587,40 + 597,42 + 332,83 = 2.517,65 €. Netto 2.000 < Freibetrag → **pfändbar 0 €**.
- **Ist-vor-Fix:** Code liefert 0 € ✓

### PF-03 (Netto 3.500 €, 0 Unterhalt, Zahltag 01.08.2026)
- **Input:** nettoMonat=3500, unterhaltspflichten=0, stichtag=2026-08-01
- **Soll (Tabelle 2026 Pauschal):** Freibetrag 1.587,40 €. Mehrbetrag 1.912,60 €. Quote 70 %. Pfändbar via Pauschal **1.338,82 €**. Amtliche 10-€-Stufen-Tabelle weicht bis zu ~±7 € ab.
- **Ist-vor-Fix:** Code via Pauschalquote. Tabellen-Annäherung. — **P1 Tabellen-Annäherung (gleicher Mechanismus).**

### PF-SW-01 (Stichtag-Regression: Netto 1.580, 0 Unterhalt)
- **Input-A:** nettoMonat=1580, unterhaltspflichten=0, stichtag=2026-06-30 (Tabelle 2025)
- **Soll-A:** Freibetrag 1.555 €. Mehrbetrag 25 €. Pfändbar 25 × 0,70 = **17,50 €**.
- **Input-B:** nettoMonat=1580, unterhaltspflichten=0, stichtag=2026-07-01 (Tabelle 2026)
- **Soll-B:** Freibetrag 1.587,40 €. Netto 1.580 < Freibetrag → **pfändbar 0 €**.
- **Ist-vor-Fix:** Da die Komponente `PfaendungRechner.tsx` keinen `stichtag`-Parameter exposes und die Lib beim ersten Render `new Date()` evaluiert, sind beide Fälle nicht vom User steuerbar. Der Stichtag-Switch greift automatisch am 01.07.2026 beim nächsten Client-Mount. ✓ (keine Modul-Scope-Falle)
- **Potentielle UX-Lücke:** User kann „vorher/nachher"-Vergleich nicht selbst durchspielen. — **P2 UX.**

### PF-MOD (Modul-Scope-Prüfung)
- `export const GRUNDFREIBETRAG = getAktuellePfaendungsParameter().grundfreibetrag` in `pfaendung.ts` ist Modul-Scope-Konstante (wird beim Next.js-Server-Start initialisiert). Nach 01.07.2026 würde sie **auf Vercel serverseitig** auf dem alten Wert eingefroren werden, bis neuer Deploy erfolgt.
- **Aktuell:** Diese Konstante wird **nirgendwo sonst im Repo** konsumiert (Grep: nur in pfaendung.ts selbst). Aktiv kein Bug, aber **latente Stichtag-Falle**.
- **Ist-vor-Fix:** Latent, nicht aktiv. — **P2 (proaktive Entfernung empfohlen).**

---

## Zusammenfassung Verifikations-Coverage

| Rechner | Testfälle | P1-Case | P2-Case | Bemerkung |
|---|---|---|---|---|
| BAföG | 4 | BA-01, BA-03, BA-MAX (veraltete Sätze) | BA-02 Schüler-Bedarfssatz | Höchstsatz 992 € vs. Code 1.056 € |
| Wohngeld | 4 | WG-01, WG-02, WG-03, WG-ALLEIN (Freibeträge + Höchstbeträge) | — | 4 Freibetrags-Bugs + 35 Tabellenzellen falsch |
| Bürgergeld | 5 | — | BG-MB Alleinerziehende, BG-KDU Angemessenheit | Regelsätze 2026 korrekt (Nullrunde) |
| **Pfändung** | **5** | **PF-01, PF-03 (Tabellen-Pauschalquote)** | **PF-SW-01, PF-MOD (latent)** | Werte 2025/2026 korrekt, Algorithmus nur Pauschalquote |

**Regression-Nutzung:** Nach jedem Fix-Pass (Prompt 120/121/122) diese Testfälle nachrechnen. Besonderer Fokus auf BAföG (veraltete Bedarfssätze) und Wohngeld (35 Höchstbeträge + 4 Freibetragsregeln).

---

## Stufe-4b P2-Testfälle (neu in Prompt 121)

### BAföG

- **BA-QUOTE-0:** `getAnrechnungsquote(0)` → 0,50 (§ 25 Abs. 6 BAföG, 0 Geschwister)
- **BA-QUOTE-1:** `getAnrechnungsquote(1)` → 0,45 (1 Geschwister)
- **BA-QUOTE-2:** `getAnrechnungsquote(2)` → 0,40
- **BA-QUOTE-5:** `getAnrechnungsquote(5)` → 0,25
- **BA-QUOTE-MIN:** `getAnrechnungsquote(11)` → 0,00 (Clamp untere Grenze)
- **BA-MONO:** BA-01-Inputs mit 2 Geschw. liefern ≥ BAföG als mit 0 Geschw. (Monotonie)

### Bürgergeld — Mehrbedarfe § 21 SGB II

- **BG-MB:** Alleinerz., 1 Kind 10 J., Miete 600 → 1.620,56 € (563 + 67,56 + 390 + 600)
- **BG-MB-2:** Alleinerz., 1 Kind 4 J. (< 7) → Mehrbedarf 202,68 € (36 % Nr. 1)
- **BG-MB-3:** Alleinerz., 4 Kinder (2×<7, 2×12) → Mehrbedarf 270,24 € (48 % = 12 %×4 > 36 %)
- **BG-MB-4:** Alleinerz., 6 Kinder gemischt → Mehrbedarf 337,80 € (60 %-Deckel)
- **BG-SCHW:** Schwangerschaft ab 13. SSW alleinstehend → 95,71 € (17 %)
- **BG-BEH:** Behinderung + Teilhabe alleinstehend → 197,05 € (35 %)
- **BG-WW:** Warmwasser dezentral, alleinstehend + 1 Kind 5 J. → 15,81 € (2,3 % + 0,8 %)

### Bürgergeld — Stichtag-Switch (Skeleton)

- **BG-STICHTAG-H1:** `getAktuelleBuergergeldParameter(2026-06-15).bezeichnung` === 'Bürgergeld'
- **BG-STICHTAG-H2:** `getAktuelleBuergergeldParameter(2026-07-15).bezeichnung` startet mit 'Grundsicherungsgeld'
- **BG-SKELETON:** H1.rbs1 === H2.rbs1 (Skeleton-Invariante bis Gesetzestext verabschiedet)

### Pfändung — Stichtag-Switch (UI-vermittelt)

- **PF-SW-01-A:** Netto 1.580, 0 UH, stichtag 30.06.2026 → 17,50 € pfändbar (Tabelle 2025)
- **PF-SW-01-B:** Netto 1.580, 0 UH, stichtag 01.07.2026 → 0 € pfändbar (unter neuem Freibetrag)
- **PF-PARAM-VOR:** `getAktuellePfaendungsParameter(30.06.2026).grundfreibetrag` === 1.555
- **PF-PARAM-NACH:** `getAktuellePfaendungsParameter(01.07.2026).grundfreibetrag` === 1.587,40

---

## P3 Testfälle — Prompt 123 (22.04.2026)

Externe Quellen dokumentiert in den Verify-Scripts:
- [`scripts/verify-bafoeg-p3.ts`](../../scripts/verify-bafoeg-p3.ts) — 20 Fälle, § 11/12/25 BAföG + BMBF-FAQ
- [`scripts/verify-buergergeld-p3.ts`](../../scripts/verify-buergergeld-p3.ts) — 21 Fälle, § 11b Abs. 2b SGB II
- [`scripts/verify-pfaendung-p2.ts`](../../scripts/verify-pfaendung-p2.ts) (erweitert um 6 Fälle)

### BAföG § 12 Schul-Bedarfstypen

- **BA-SCHUL-01:** schule, `berufsfachschuleOhneVorausbildung`, eltern → Bedarf **276 €** (§ 12 Abs. 1 Nr. 1)
- **BA-SCHUL-02:** schule, `fachoberschuleMitVorausbildung`, auswärts → Bedarf **775 €** (§ 12 Abs. 2 Nr. 2)
- **BA-SCHUL-03:** schule, `berufsfachschuleOhneVorausbildung`, auswärts → Bedarf **666 €** (§ 12 Abs. 2 Nr. 1)
- **BA-SCHUL-04:** schule, `fachoberschuleMitVorausbildung`, eltern → Bedarf **498 €** (§ 12 Abs. 1 Nr. 2)

### BAföG § 11 Abs. 3 / Abs. 2a — Elternunabhängig

- **BA-ELUN-01:** Student 31 J., Tatbestand `ueber_30_bei_beginn`, Eltern 40k+20k → voller Höchstsatz **992 €**, `anrechnungEltern=0`
- **BA-ELUN-02:** Student 22 J. Kolleg-Besuch, Tatbestand `abendgymnasium_kolleg`, Eltern 40k+20k → **992 €**
- **BA-ELUN-REGR:** Ohne Tatbestand, Eltern 40k+20k → regulärer Pfad, `anrechnungEltern>0`

### BAföG § 11 Abs. 4 — Aufteilung

- **BA-ABS4-01:** Student Eltern 40k+20k, `gefoerdeteGeschwisterAnzahl=1` → Anrechnung ≈ 268,50 € (≈537/2), BAföG ≈ **723,50 €**
- **BA-ABS4-02:** `gefoerdeteGeschwisterAnzahl=2` → Anrechnung ≈ 179 € (≈537/3), BAföG ≈ **813 €**
- **BA-KOMBI:** `geschwisterInAusbildung=2` + `gefoerdeteGeschwisterAnzahl=1`: Quote 0,40, Freibetrag 3.875 € kappt Anrechnung auf 0 → BAföG **992 €** (beide Effekte wirken, aber Netto < Freibetrag)
- **Helper:** `aufteilungNachAbs4(537, 1) = 268,50`, `(537, 2) = 179,00`, `(537, 0) = 537,00`

### Bürgergeld § 11b Abs. 2b — Jugendlichen-Freibetrag

- **BG-JUGEND-01:** Alleinstehend 22 J. Student, 500 € Einkommen → Freibetrag 500 € (unter 556), `anrechenbareEinkommen=0`, Anspruch **1.093 €**
- **BG-JUGEND-02:** 28 J. Student, 500 € → Freibetrag 250 €, Anrechnung 250, Anspruch **843 €**
- **BG-JUGEND-03:** 22 J. OHNE Sonderstatus, 500 € → regulärer Stufen-Freibetrag 180, Anspruch **773 €**
- **BG-JUGEND-04:** Azubi 22 J., 600 € → Freibetrag gedeckelt 556, Anrechnung 44, Anspruch **1.049 €**
- **BG-JUGEND-05:** `status: 'none'` → regulärer Pfad, gleiche 180 € Freibetrag wie BG-JUGEND-03

### Bürgergeld Dedup (Paket 6)

- **DEDUP RBS1–6:** Tabelle in `BuergergeldRechner.tsx` liest aus `getAktuelleBuergergeldParameter().regelsaetze` — keine Hartkodierungen mehr

### Pfändung — Dynamische Beispieltabelle (Paket 7)

- **PF-BEISP-01:** `getBeispielNettoWerte(3000)` liefert 6 Werte, erster = 2.500, enthält 3.000
- **PF-BEISP-02:** Fallback bei Netto < 1.500 → `[2000, 2500, 3000, 3500, 4000, 5000]`
- **PF-BEISP-03:** `berechnePfaendung({nettoMonat: 3000})` liefert 6 Zeilen, Anker 3.000 enthalten

### Pfändung — Permanente Obergrenze-Anzeige

- UI-Test: Obergrenze-Info-Block **sichtbar bei jedem Netto** (nicht nur bei `ueberObergrenze`)
- Wert aus `ergebnis.obergrenze` (stichtag-aware: 4.866,30 €/Monat ab 01.07.2026, 4.771,49 € davor, jeweils +Unterhalts-Erhöhung)
