# W13.B — Lib-Werte-Audit Phase A (08.05.2026)

**Audit-Scope:** Drift-Prüfung aller jahresgebundenen Werte (Sozialabgaben, Steuerwerte, Strompreis, Mindestlohn etc.) gegen Stand 2026.

**Methodik:** Phase A — nur Befund, keine Code-Edits. Stichprobe über `lib/berechnungen/*.ts` (Konstanten) und `lib/rechner-config/*.ts` (Beispielzahlen in `formel`/`beispiel`/`erklaerung`/`faq`).

**Soll-Werte 2026** (kombiniert aus Prompt + CLAUDE.md SSOT + Lib-Inhalt):

| Parameter | Soll 2026 |
|---|---|
| Mindestlohn ab 01.01.2026 | 13,90 €/Std. |
| Mindestlohn ab 01.01.2027 | 14,60 €/Std. |
| Grundfreibetrag Single | 12.348 € |
| Tarif Zone-2-Ende (Spitzensteuer-Beginn − 1) | 17.799 € |
| Tarif Zone-3-Ende (42 %-Schwelle − 1) | 69.878 € |
| Tarif Zone-4-Ende (45 %-Schwelle − 1) | 277.825 € |
| Soli-Freigrenze Single (ESt-Jahr) | 20.350 € |
| Soli-Freigrenze Splitting | 40.700 € |
| KV allgemein (AN/AG je) | 14,6 % (7,3 %) |
| KV-Zusatzbeitrag-Ø 2026 (AN-Anteil) | 2,9 % (1,45 %) |
| RV (AN/AG je) | 18,6 % (9,3 %) |
| AV (AN/AG je) | 2,6 % (1,3 %) |
| PV allgemein, Kinderlosenzuschlag | 3,6 %, +0,6 pp |
| BBG KV/PV (Mo / Jahr) | 5.812,50 € / 69.750 € |
| BBG RV/AV (Mo / Jahr) | 8.450 € / 101.400 € |
| JAEG (Mo / Jahr) | 6.450 € / 77.400 € |
| MwSt regulär / ermäßigt | 19 % / 7 % |
| Pendlerpauschale (alle km, Reform 2026) | 0,38 €/km ab 1. km |
| Werbungskostenpauschale (Arbeitnehmer) | 1.230 € |
| Sparerpauschbetrag Single / Paar | 1.000 € / 2.000 € |
| Strompreis BDEW-Ø 2026 | ~37 ct/kWh |
| DT 2026 Selbstbehalt erwerbstätig / nicht | 1.600 € / 1.475 € |
| DT 2026 Mindestbedarf 0–5 / 6–11 / 12–17 / 18+ | 486 / 558 / 653 / 698 € |
| Kindergeld 2026 | 259 €/Mo |

---

## Abschnitt 1: Konstanten in `lib/berechnungen/`

| Lib-File | Konstante | Wert (Code) | Soll 2026 | Status |
|---|---|---|---|---|
| `mindestlohn.ts` | `MINDESTLOHN_2026` | 13.9 | 13,90 | OK |
| `mindestlohn.ts` | `MINDESTLOHN_2027` | 14.6 | 14,60 | OK |
| `mindestlohn.ts` | `MINDESTLOHN_2025` | 12.82 | 12,82 (historisch) | OK |
| `einkommensteuer.ts` | `GRUNDFREIBETRAG_2026` | 12348 | 12.348 € | OK |
| `einkommensteuer.ts` | `WK_PAUSCHALE_AN_2026` | 1230 | 1.230 € | OK |
| `einkommensteuer.ts` | `SA_PAUSCHALE_2026` | 36 | 36 € | OK |
| `einkommensteuer.ts` | `TARIF_2026.gfb` | 12348 | 12.348 € | OK |
| `einkommensteuer.ts` | `TARIF_2026.z2_ende` | 17799 | 17.799 € | OK |
| `einkommensteuer.ts` | `TARIF_2026.z3_ende` | 69878 | 69.878 € (= 42 %-Schwelle bei 69.879) | OK |
| `einkommensteuer.ts` | `TARIF_2026.z4_ende` | 277825 | 277.825 € (= 45 %-Schwelle bei 277.826) | OK |
| `einkommensteuer.ts` | `TARIF_2025` | gfb 12096 / z2_ende 17443 / z3_ende 68480 | 2025er-Werte (historisch korrekt) | OK |
| `pendlerpauschale.ts` | `PENDLERPAUSCHALE_SATZ_2026` | 0.38 | 0,38 €/km einheitlich | OK |
| `pendlerpauschale.ts` | `HOMEOFFICE_PAUSCHALE_PRO_TAG` | 6 | 6 €/Tag | OK |
| `pendlerpauschale.ts` | `HOMEOFFICE_PAUSCHALE_MAX_TAGE` | 210 | 210 Tage | OK |
| `sv-parameter.ts` | `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT` | 2.9 | 2,9 % | OK |
| `sv-parameter.ts` | `JAEG_2026_JAHR` | 77400 | 77.400 € | OK |
| `sv-parameter.ts` | `JAEG_2026_MONAT` | 6450 | 6.450 € | OK |
| `brutto-netto.ts` | `BBG_KV_MONAT` | 5812.50 | 5.812,50 € | OK |
| `brutto-netto.ts` | `BBG_RV_MONAT` | 8450 | 8.450 € | OK |
| `brutto-netto.ts` | `KV_BASISSATZ_AN_2026` | 0.073 | 7,3 % | OK |
| `brutto-netto.ts` | `RV_SATZ_AN_2026` | 0.093 | 9,3 % | OK |
| `brutto-netto.ts` | `AV_SATZ_AN_2026` | 0.013 | 1,3 % | OK |
| `pflegeversicherung.ts` | `PV_BASIS_SATZ_2026` | 0.018 | 1,8 % AN-Anteil | OK |
| `pflegeversicherung.ts` | `ZUSCHLAG_KINDERLOS` | 0.006 | +0,6 pp | OK |
| `mwst.ts` | `MWST_REGULAER` | 0.19 | 19 % | OK |
| `mwst.ts` | `MWST_ERMAESSIGT` | 0.07 | 7 % | OK |
| `strompreis.ts` | `STROMPREIS_2026.durchschnitt_bdew` | 37 | ~37 ct/kWh | OK |
| `duesseldorfer-tabelle.ts` | `MINDESTBEDARF_2026` | 486 / 558 / 653 / 698 | 486 / 558 / 653 / 698 | OK |
| `duesseldorfer-tabelle.ts` | `KINDERGELD_2026` | 259 | 259 €/Mo | OK |
| `duesseldorfer-tabelle.ts` | `SELBSTBEHALT_2026.ehegatte_erwerbstaetig` | 1600 | 1.600 € | OK |
| `duesseldorfer-tabelle.ts` | `SELBSTBEHALT_2026.ehegatte_nicht_erwerbstaetig` | 1475 | 1.475 € | OK |

**Bilanz Abschnitt 1: Alle 30 geprüften Lib-Konstanten OK. 0 Drift.**

Die zentralen Berechnungs-Libs sind seit Welle 1–9 mehrfach gegen Primärquellen verifiziert (BMF-Steuerrechner, Düsseldorfer Tabelle 2026, BMG, BDEW, BGBl-Texte) und über die Verify-Cluster abgedeckt. Die SSOT-Disziplin ist konsequent durchgehalten.

---

## Abschnitt 2: Beispielzahlen in `lib/rechner-config/`

| Datei : Zeile | Stelle / Slug | Wert | Soll | Status |
|---|---|---|---|---|
| `finanzen.ts:75` | brutto-netto-rechner FAQ | „Freigrenze: 18.130 € Jahres-Lohnsteuer" | 20.350 € (2026 Single) | **DRIFT** |
| `finanzen.ts:2546` | gehaltsvergleich/splitting-rechner Erklärtext | „Freigrenze (18.130 € ESt)" | 20.350 € (2026 Single) | **DRIFT** |
| `finanzen.ts:2867` | einkommensteuer-rechner `formel`-Feld | „Zone 2 (12.097–17.443) / Zone 3 (17.444–66.760) / Zone 4 (66.761–277.825) / (932,30·y+1.400)·y / (176,86·z+2.397)·z+1.015,42" | 2026: Zone 2 (12.349–17.799) / Zone 3 (17.800–69.878) / Zone 4 (69.879–277.825) / Polynom (914,51·y+1.400)·y / (173,10·z+2.397)·z+1.034,87 | **DRIFT** |
| `auto.ts:67` | spritkosten-rechner Erklärtext (W13.6) | „pauschal 0,30 €/km nach § 9 EStG" | 0,30 € korrekt für Reisekostenpauschale, aber Paragraph-Verweis ungenau (§ 9 Abs. 1 Nr. 4a EStG) | **UNKLAR** (Stilistik, kein Wert-Drift) |
| `finanzen.ts:1728` | gehaltsvergleich Erklärtext | „Spitzensteuersatz greift ab 69.878 Euro" | Bei 69.879 € beginnt 42 % (z3_ende=69.878). Formulierung „ab 69.878" ist semantisch leicht ungenau, aber gängig. | OK (Konvention) |
| `finanzen.ts:579, 617, 1943` | stundenlohn-rechner Erklärtext + 2× FAQ | „13,90 €/Std. (vorher 12,82 € in 2025)" | 13,90 € | OK (12,82 als historischer Vergleich akzeptabel) |
| `finanzen.ts:2657` | minijob-rechner Erklärtext | „603 € (vorher 556 € bei 12,82 €)" | 603 € | OK |
| `finanzen.ts:1471` | kindergeld-rechner historische Tabelle | „2025: 255 €" | 2025-Wert historisch korrekt | OK |
| `finanzen.ts:266, 1100, 1120, 2229, 2267` | sparrechner / etf / kapitalertragsteuer | „Sparerpauschbetrag 1.000 € / 2.000 €" | 1.000 / 2.000 € | OK |
| `finanzen.ts:30` | brutto-netto-rechner | „Pflegeversicherung: 3,6 % (AN: 1,8 %)" | 3,6 % / 1,8 % | OK |
| `finanzen.ts:27, 28, 87, 1178, 1874` | mehrere FAQ/Erklärtexte | BBG KV 5.812,50 / RV 8.450 / Jahr 69.750 / 101.400, JAEG 77.400 / 6.450 | konsistent | OK |
| `arbeit.ts:288–377` | pendlerpauschale-rechner | einheitlich 0,38 €/km ab 1. km, Mobilitätsprämie § 101 EStG | korrekt 2026 | OK |
| `arbeit.ts:1339–1377` | ehegattenunterhalt-rechner | Selbstbehalt 1.600 / 1.475 € (DT 2026) | korrekt | OK |
| `arbeit.ts:1263` | unterhalt-rechner FAQ | „Selbstbehalt nach DT 2026 (1.450 € erwerbstätig / 1.200 € nicht)" | Kindesunterhalts-Selbstbehalt (1.450/1.200 €) — andere Achse als Ehegattenunterhalt (1.600/1.475 €). Korrekt nach DT 2026. | OK |
| `wohnen.ts:75, 617, 1412` | stromkosten-rechner / stromvergleich | „BDEW-Ø 2026 ~37 ct/kWh, Festpreis 33 ct, Grundversorgung 38–45 / ~40 ct" | konsistent zu `STROMPREIS_2026` | OK |
| `wohnen.ts:806` | wärmepumpe FAQ | „Haushaltsstrom 37 ct / WP-Spezialtarif 28 ct" | konsistent | OK |
| `auto.ts:571` | autokosten-rechner | „Wallbox ≈ 33 ct/kWh" | konsistent | OK |
| `arbeit.ts:342, 349, 377` | pendlerpauschale | „Arbeitnehmer-Pauschbetrag 1.230 € / Grundfreibetrag 12.348 €" | konsistent | OK |

**Stichprobenbreite:** ca. 60 Treffer über alle 9 Kategorie-Files quer-geprüft (gezielt nach Tarif-Zonen, Soli-Freigrenze, Sozialabgaben-Sätzen, Strompreis-Werten, DT-Werten, Pendlerpauschale, Mindestlohn-Werten, Kindergeld). Die Liste oben enthält die treffergebende Auswahl plus alle DRIFT-/UNKLAR-Befunde.

**Bilanz Abschnitt 2: 3 DRIFT, 1 UNKLAR (Stilistik), Rest OK.**

---

## Abschnitt 3: Konsolidierte UNKLAR-Liste für Karsten-Review

### UNKLAR-1 (Soll-Wert im Prompt veraltet)
**Pendlerpauschale-Soll-Stand im W13.B-Prompt selbst.** Der Prompt nennt als Soll: „0,30 €/km (1.-20.), 0,38 €/km (ab 21.)". Das ist die **Pre-Reform-Staffel** vor dem Steueränderungsgesetz 2025. **Tatsächlicher Stand 2026** (CLAUDE.md SSOT, Rechtsstand-Tabelle, Lib `pendlerpauschale.ts` und Konfig `arbeit.ts:288–353`): einheitlich **0,38 €/km ab dem ersten Kilometer** (StÄndG 2025, BGBl. I 2025 Nr. 363, gültig seit 01.01.2026). Code und Konfig sind korrekt; nur der Prompt-Soll-Wert ist veraltet. Konsequenz: keine Code-Aktion nötig, aber Karsten sollte den Wert in künftigen Audit-Prompts korrigieren.

### UNKLAR-2 (Stilistik)
**`auto.ts:67` — § 9 EStG ohne Absatz-Konkretisierung.** Im Spritkosten-Rechner (W13.6) wird die Reisekostenpauschale 0,30 €/km als „pauschal 0,30 €/km nach § 9 EStG" bezeichnet. Der Wert 0,30 €/km ist korrekt für die Auswärtstätigkeits-Kilometerpauschale, der präzise Paragraph-Verweis wäre aber **§ 9 Abs. 1 Nr. 4a Satz 2 EStG** (Reisekostenpauschale Auswärtstätigkeit). Der unspezifische Verweis „§ 9 EStG" könnte mit der Pendlerpauschale (§ 9 Abs. 1 Satz 3 Nr. 4 EStG, 0,38 €/km für Arbeitsweg) verwechselt werden. Nicht-kritischer Stilistik-Punkt.

### Konvention-Hinweis (kein Befund)
**Spitzensteuer-Schwellen-Notation.** Prompt nennt 69.879 € (42 %-Beginn) und 277.826 € (45 %-Beginn). Lib-SSOT nennt z3_ende=69.878 und z4_ende=277.825 (Zone-Ende, also +1 = nächste Zone). Beide Schreibweisen sind korrekt, nur unterschiedliche Konvention. Kein Drift.

---

## Abschnitt 4: Empfohlene Folge-Sprints (Phase B)

### W13.B.1 — Soli-Freigrenze-Drift fixen (P1, ~10 Min)

**Scope:** `lib/rechner-config/finanzen.ts`, zwei Stellen.
- Z.75 (brutto-netto-rechner FAQ): „Freigrenze: 18.130 € Jahres-Lohnsteuer" → „Freigrenze: 20.350 € Jahres-Lohnsteuer (2026, Einzelveranlagung)"; das nachfolgende Beispiel-Brutto („ca. 73.000 €") bei 20.350 € Freigrenze realistisch neu kalkulieren oder durch SSOT-konformen Wert ersetzen.
- Z.2546 (gehaltsvergleich/splitting-rechner Erklärtext): „mit Freigrenze (18.130 € ESt)" → „mit Freigrenze (20.350 € ESt, Einzelveranlagung 2026)".

**Konsequenz Drift:** User glauben fälschlich an niedrigere Soli-Freigrenze. Die Berechnung selbst (`berechneSoli` aus `einkommensteuer.ts`) ist korrekt — nur die Erklärtexte zeigen falsche Zahlen. AdSense-Risiko gering, aber Glaubwürdigkeitsrisiko (Diskrepanz zwischen Erklärung und gerechnetem Wert).

### W13.B.2 — ESt-Rechner formel-Feld auf 2026er-Tarifzonen (P1, ~5 Min)

**Scope:** `lib/rechner-config/finanzen.ts:2867` (einkommensteuer-rechner `formel`-Feld).

Aktuell (2025er-Werte):
> Zone 2 (12.097–17.443 €): (932,30·y+1.400)·y | Zone 3 (17.444–66.760 €): (176,86·z+2.397)·z+1.015,42 | Zone 4 (66.761–277.825 €): 0,42·zvE−10.636,30 | Zone 5 (ab 277.826 €): 0,45·zvE−18.970,05

Soll 2026 (aus `TARIF_2026` in `einkommensteuer.ts`):
> Zone 2 (12.349–17.799 €): (914,51·y+1.400)·y | Zone 3 (17.800–69.878 €): (173,10·z+2.397)·z+1.034,87 | Zone 4 (69.879–277.825 €): 0,42·zvE−11.135,63 | Zone 5 (ab 277.826 €): 0,45·zvE−19.470,38

Polynom-Koeffizienten und Subtrahenden ebenfalls auf 2026er-Werte. Quelle für Soll: `einkommensteuer.ts` Z.47–62 (`TARIF_2026`).

**Konsequenz Drift:** Sichtbares `formel`-Feld auf der ESt-Rechner-Seite zeigt 2025er-Tarif. Berechnung (`berechneESt2026`) ist korrekt; nur Anzeige falsch. AdSense-Risiko: Diskrepanz zwischen Anzeigeformel und gerechnetem Ergebnis ist auffällig für aufmerksame User.

### W13.B.3 — § 9 EStG Paragraph-Präzision (P3, ~3 Min, optional)

**Scope:** `lib/rechner-config/auto.ts:67` (spritkosten-rechner Anwendungsfälle-Bullet).

„0,30 €/km nach § 9 EStG" → „0,30 €/km nach § 9 Abs. 1 Nr. 4a EStG (Reisekostenpauschale)". Stilistik-Polish, kein Wert-Drift.

---

## Übergabe / Build / Status

- **Inventur lib/berechnungen/:** 30 Konstanten geprüft, alle OK
- **Inventur lib/rechner-config/:** ~60 Beispielzahlen-Treffer, davon 3 DRIFT + 1 UNKLAR
- **Drift-Befunde:** 3 OK = ca. 56 OK + 3 DRIFT + 1 UNKLAR
- **Top-3 DRIFT-Befunde:**
  1. `finanzen.ts:75` Soli-Freigrenze 18.130 → 20.350 €
  2. `finanzen.ts:2546` Soli-Freigrenze 18.130 → 20.350 €
  3. `finanzen.ts:2867` ESt-Rechner `formel` mit 2025er-Tarifzonen statt 2026
- **AdSense-Risiko:** kein einzelner kritischer Befund. Soli-Freigrenze und ESt-formel sind sichtbare Anzeige-Texte, deren Werte den jeweils zugrundeliegenden Berechnungen widersprechen — Glaubwürdigkeitspolitur, keine falschen Steuerbeträge.
- **Empfohlene Reihenfolge:** W13.B.1 + W13.B.2 als ein zusammen­gefasster Code-Sprint (~15 Min, gemeinsamer Commit), W13.B.3 optional separat oder im selben Commit.

**Nächster Schritt:** Karsten reviewt diesen Bericht und gibt den Phase-B-Sprint frei (oder beauftragt direkt). Nach Phase-B-Fix → AdSense-Re-Submission.
