# Welle 1 Stufe 4a — Testfall-Katalog

**Stand:** 2026-04-21 (Prompt 114 Audit-Phase)
**Zweck:** Regressions-Basis für Fix-Prompts 115/116/117 und Jahresaudit 2027.

**Legende:**
- **Ist-vor-Fix** = beobachtetes Verhalten am Code-Level / Live-Rechner am 21.04.2026
- **Soll** = aus Gesetzestext abgeleitet (ErbStG, EStG, SGB IV/V/XI, SolzG, BGB)
- Nach jeweiligem Fix-Pass die Ist-Spalte aktualisieren.

---

## ERBSCHAFTSTEUER-RECHNER

### ER-01 (Kind, Standardfall, keine Sprungkante)
- **Input:** Erbschaft, 500.000 €, verwandtschaft=kind, vorschenkungen=0, keine selbstgenutzte Immobilie
- **Soll:** FB 400.000 + Versorgungs-FB 52.000 = 452.000 €; stpfl. Erwerb 48.000 € × 7 % = **3.360 €** Steuer
- **Ist-vor-Fix:** 3.360 € ✓

### ER-02 (Sprungkante Kl. I bei 300k)
- **Input:** Erbschaft, 750.000 €, verwandtschaft=kind, vorschenkungen=0
- **Soll:** FB 400.000 + 52.000 = 452.000; stpfl. Erwerb 298.000 → 11 % = 32.780 € (gerade noch in Zone 2); bei 298.001 → Härtefall § 19 Abs. 3 greift über 300.000 €
- **Ist-vor-Fix:** 298.000 × 11 % = 32.780 € (korrekt für stpfl. Erwerb unter 300k)
- **Edge-Test für Härtefall:** stpfl. Erwerb 300.001 € → Code 15 % = 45.000,15 €; korrekt mit Härtefall max(300.000 × 11 % + 0,50 × 1, 45.000) = 33.000,50 €. **Delta ≈ 12.000 €.** — **P1-Beweis**

### ER-03 (Ehepartner mit hohem Vermögen)
- **Input:** Erbschaft, 1.500.000 €, verwandtschaft=ehepartner, vorschenkungen=0
- **Soll:** FB 500.000 + Versorgungs-FB 256.000 = 756.000 €; stpfl. Erwerb 744.000 → Zone 4 (bis 6M) → 19 % = 141.360 €
- **Ist-vor-Fix:** 141.360 € ✓

### ER-04 (Vorschenkung § 14 ErbStG — Grenzfall)
- **Input:** Erbschaft, 500.000 €, verwandtschaft=kind, vorschenkungen=350.000 € vor 5 Jahren
- **Soll (§ 14 ErbStG-Kumulation):** Gesamterwerb 850.000; FB 400.000; stpfl. 450.000 → Zone 3 (bis 600k) → 15 % = 67.500; Steueranrechnung auf bisherigen Anteil — komplex, Ergebnis ungefähr 35.000–40.000 €
- **Ist-vor-Fix:** Code macht `FB = 400.000 − 350.000 = 50.000`; stpfl. 500.000 − 50.000 = 450.000 × 15 % = 67.500 € (ohne Anrechnung). **Überberechnung um ~30 k €.** — **P2-Beweis**

---

## SCHENKUNGSSTEUER-RECHNER

### SS-01 (Enkel mit lebenden Eltern)
- **Input:** 250.000 €, verwandtschaft=enkelkind, bereitsGenutzt=0
- **Soll:** FB 200.000 (§ 16 Abs. 1 Nr. 3 ErbStG bei lebenden Eltern); stpfl. 50.000 × 7 % = **3.500 €**
- **Ist-vor-Fix:** 3.500 € ✓

### SS-02 (Enkel bei verstorbenen Eltern — Lib-Gap)
- **Input:** 250.000 €, verwandtschaft=enkelkind (Eltern verstorben nach § 15 ErbStG)
- **Soll:** FB 400.000 (Enkel tritt an die Stelle des verstorbenen Kindes); stpfl. Erwerb 0 € → **keine Steuer**
- **Ist-vor-Fix:** Lib kennt nur `enkelkind` mit 200.000 € FB → 50.000 × 7 % = 3.500 € (**3.500 € zu viel**) — **P2-Beweis**

### SS-03 (Hausrat-FB Kl. II)
- **Input:** 25.000 € Hausrat, verwandtschaft=geschwister, hausratFreibetrag=Ja
- **Soll:** Persönlicher FB 20.000 + Hausrat-FB 12.000 € (§ 13 Abs. 1 Nr. 1 Satz 2 ErbStG Kl. II/III) = 32.000 €; stpfl. 0 → **keine Steuer**
- **Ist-vor-Fix:** Code: hausrat-FB nur Kl. I → FB 20.000; stpfl. 5.000 × 15 % = 750 €. **750 € zu viel** — **P2-Beweis**

---

## KAPITALERTRAGSTEUER-RECHNER

### KE-01 (Standard Single, Zinsen)
- **Input:** 2.000 € Zinsen, Single (1.000 € Pauschbetrag), keine KiSt, keine Verluste
- **Soll:** nach Pauschbetrag stpfl. 1.000 €; KESt 25 % = 250 €; Soli 5,5 % = 13,75 €; Netto 1.736,25 €
- **Ist-vor-Fix:** 250 € KESt + 13,75 € Soli = 1.736,25 € Netto ✓

### KE-02 (ETF-Teilfreistellung)
- **Input:** 3.000 € Aktien-ETF, Single, keine KiSt
- **Soll:** 70 % stpfl. = 2.100 €; nach 1.000 € PB: 1.100 € × 25 % = 275 € KESt + 15,13 € Soli
- **Ist-vor-Fix:** Teilfreistellung ✓

### KE-03 (Klärungsfall Soli-Freigrenze)
- **Input:** 2.000 € Zinsen, Single, keine KiSt
- **Soll (Quellensteuer):** KESt 250 €, Soli 13,75 € (keine Freigrenze bei Bankabzug seit Soli-Reform 2021)
- **Soll (Veranlagung bei alleinigem Einkommen):** KESt wird ins zvE integriert, Soli nach Milderungszone § 4 SolzG
- **Ist-vor-Fix:** zeigt 13,75 € Soli (Quellensteuer-Sicht) — OK für diesen Fall. **Klärungsbedarf:** Welches Szenario modelliert der Rechner?

---

## AFA-RECHNER

### AFA-01 (Linear, Standard)
- **Input:** 10.000 €, 5 Jahre, linear, 2026-01-01
- **Soll:** 2.000 €/Jahr × 5 Jahre
- **Ist-vor-Fix:** ✓

### AFA-02 (Degressiv 2026 — NICHT MEHR ZULÄSSIG)
- **Input:** 10.000 €, 5 Jahre, degressiv 20 %, **2026-03-15**
- **Soll (nach § 7 Abs. 2 EStG n.F.):** Degressive AfA für bewegliche WG ist für Anschaffungen ab 01.01.2026 **nicht mehr zulässig**; nur linear möglich → 2.000 €/Jahr
- **Ist-vor-Fix:** Code rechnet munter weiter: Jahr 1 anteilig ~1.583 € (bei März-Anschaffung), Jahr 2: 1.683 € etc. **Rechnerisch plausibel, aber rechtlich nicht zulässig.** — **P1-Beweis**

### AFA-03 (GWG 700 €)
- **Input:** 700 €, GWG, 2026-01-01
- **Soll:** 700 € Sofortabschreibung (§ 6 Abs. 2 EStG)
- **Ist-vor-Fix:** ✓

---

## FIRMENWAGENRECHNER

### FW-01 (E-Auto ≤ 70k)
- **Input:** BLP 40.000 €, E-Auto ≤ 70k, 20 km Arbeitsweg, pauschal, Grenzsatz 35 %
- **Soll:** Privat 40.000 × 0,25 % = 100 €; Arbeitsweg 40.000 × 0,03 % × 20 × 0,25 = 60 €; gwV 160 €; Steuer/Monat 56 €
- **Ist-vor-Fix:** 56 € ✓

### FW-02 (Plug-in-Hybrid 2026 OHNE 80-km-Reichweite)
- **Input:** BLP 50.000 € Plug-in-Hybrid (Anschaffung 01.02.2026, Reichweite 60 km — nicht 80 km)
- **Soll:** 0,5 %-Regel greift NICHT (§ 6 Abs. 1 Nr. 4 Satz 2 Nr. 3 EStG ab 2025: Reichweite ≥ 80 km); gilt 1 %-Regel → privat 500 € + Arbeitsweg; Gesamt-gwV ~700 €; Steuer 245 €
- **Ist-vor-Fix:** Code wählt 0,5 % blind → gwV ~350 €; Steuer 122,50 €. **Zu wenig um 122,50 €/Monat** — **P1-Beweis**

### FW-03 (Verbrenner Standard)
- **Input:** BLP 45.000 €, Verbrenner, 20 km, pauschal, 35 %
- **Soll:** 450 € Privat + 270 € Arbeitsweg = 720 € gwV; Steuer 252 €
- **Ist-vor-Fix:** 252 € ✓

---

## MIDIJOB-RECHNER — HOT SPOT

### MJ-01 (Midijob 1.200 €, Kl. I, kinderlos, keine KiSt) — BE-FORMEL-HAUPT-TESTCASE
- **Input:** Brutto 1.200 €, Klasse I, kinderlos, keine KiSt
- **Soll (§ 20a Abs. 1 SGB IV):**
  - F = 0,6847, UG = 603,01, OG = 2000
  - BE = F × UG + ((OG − F × UG) / (OG − UG)) × (1200 − 603,01)
  - BE = 412,88 + ((2000 − 412,88) / 1396,99) × 596,99
  - BE = 412,88 + (1587,12 / 1396,99) × 596,99
  - BE = 412,88 + 1,1361 × 596,99 = 412,88 + 678,15 = **1.091,03 €**
  - AN-SV (21,05 % + 0,6 % PV-Zuschlag) = 21,65 % × 1.091,03 = **236,21 €**
  - Richtiger Midijob-Vorteil gegenüber Regulär: ca. 24 € weniger AN-SV
- **Ist-vor-Fix:** Code: BE = F × OG + (...)×(1200 − UG) = 1369,40 + 0,4514 × 596,99 = 1369,40 + 269,49 = **1.638,89 €**; AN-SV = 21,65 % × 1.638,89 = **354,82 €**. **Delta: +118,61 €/Monat AN-SV zu viel = ~1.423 €/Jahr Minus-Netto für den Midijobber**. — **P1-Beweis**

### MJ-02 (Midijob 800 € an der UG-Nähe)
- **Input:** Brutto 800 €, Klasse I, kinderlos
- **Soll:** BE = 412,88 + 1,1361 × (800 − 603,01) = 412,88 + 223,74 = **636,62 €**; AN-SV 137,83 €
- **Ist-vor-Fix:** BE = 1369,40 + 0,4514 × 196,99 = 1.458,30 €; AN-SV 315,72 €. **Delta: +177,89 €/Monat zu viel** — noch dramatischer in Niedrigverdiener-Zone.

### MJ-03 (Midijob 2.000 € Obergrenze)
- **Input:** Brutto 2.000 €, Klasse I, kinderlos
- **Soll:** BE = 412,88 + 1,1361 × 1396,99 = 412,88 + 1.587,12 = **2.000 €** (keine Ermäßigung an der OG)
- **Ist-vor-Fix:** BE = 1369,40 + 0,4514 × 1396,99 = 1369,40 + 630,60 = **2.000 €** ✓ (die OG-Kante stimmt zufällig)
- **Befund:** Der Bug wird erst sichtbar, wenn man BE an der UG gegenrechnet.

### MJ-04 (Steuerklasse V — erfundener Faktor 1.15)
- **Input:** Brutto 1.500 €, Klasse V, keine KiSt, ein Kind
- **Soll (§ 39b PAP Klasse V):** Jahresbrutto 18.000 €, nach PV-Verfahren ~210 €/Monat LSt (amtliche LStT V)
- **Ist-vor-Fix:** Code: `zvEff = 18.000`, Grundtarif ~904 €/Jahr = 75,33 €/Monat × 1.15 = **86,63 €**. Tatsächlich ist Klasse V ~200 € LSt/Monat bei diesem Brutto. **~113 €/Monat LSt zu niedrig — und das Brutto-Netto-Ergebnis systematisch zu hoch** für Klasse-V-Midijobber. — **P1-Beweis**

### MJ-05 (Soli-Schwellenfehler)
- **Input:** Brutto 1.900 €, Klasse I, keine KiSt, kinderlos
- **Soll:** Jahres-LSt ca. 2.400 €, Jahres-ESt unter 20.350 € Freigrenze → **Soli = 0 €**
- **Ist-vor-Fix:** Monats-LSt 200 € → Soli-Bedingung `lohnsteuer > 1000` = false → Soli = 0. ✓ (der harte 1.000-€-Schwellenwert funktioniert hier zufällig korrekt, weil 200 < 1000)
- **Bug erst bei hohem Monats-LSt sichtbar** — z. B. Klasse VI, wo LSt > 1.000 €/Monat möglich ist → Rechner zieht Soli voll, obwohl Jahres-ESt unter Freigrenze läge.

---

## MWST-RECHNER

### MW-01 (Netto → Brutto 19 %)
- **Input:** 100 € netto, 19 %
- **Soll:** 119 € brutto
- **Ist-vor-Fix:** ✓

### MW-02 (Brutto → Netto 7 %)
- **Input:** 107 € brutto, 7 %
- **Soll:** 100 € netto
- **Ist-vor-Fix:** ✓

---

## MWST-RÜCKERSTATTUNG

### MR-01 (Global-Blue)
- **Input:** 500 € brutto, 19 %, Global Blue
- **Soll:** MwSt-Anteil 79,83 €; Gebühr 3,50 € + 1,5 % × 79,83 € = 3,50 + 1,20 = 4,70 €; Erstattung 75,13 €
- **Ist-vor-Fix:** ~75 € ✓

---

## Zusammenfassung Verifikations-Coverage

| Rechner | Testfälle | P1-Case | P2-Case | Klärungsfall |
|---|---|---|---|---|
| Erbschaftsteuer | 4 | ER-02 (Härtefall) | ER-04 (Kumulation) | — |
| Schenkungssteuer | 3 | — (teilt P1 mit Erbschaft) | SS-02, SS-03 | — |
| Kapitalertragsteuer | 3 | — | — | KE-03 (Soli-Rechtsstand) |
| AfA | 3 | AFA-02 (Degressiv 2026) | — | — |
| Firmenwagen | 3 | FW-02 (Hybrid-80-km) | — | — |
| **Midijob** | **5** | **MJ-01, MJ-04** | — | — |
| MwSt | 2 | — | — | — |
| MwSt-Rückerst. | 1 | — | — | — |

**Regression-Nutzung:** Nach jedem Fix-Pass (Prompt 115/116/117) diese Testfälle nachrechnen. Besonderer Fokus auf MJ-01–MJ-05, weil der BE-Formel-Fix sehr sensitiv auf Eingabewerte reagiert.
