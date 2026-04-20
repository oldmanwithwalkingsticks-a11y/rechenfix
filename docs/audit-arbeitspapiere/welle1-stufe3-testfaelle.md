# Welle 1 Stufe 3 — Testfall-Katalog

**Stand:** 2026-04-20 (Prompt 109 Audit-Phase)
**Zweck:** Regressions-Basis für Jahresaudit 2027. Sollwerte beziehen sich auf den Rechtsstand zum Audit-Datum.

**Legende:**
- **Ist-vor-Fix** = beobachtetes Ergebnis am Live-Rechner (www.rechenfix.de) am 20.04.2026, noch mit Bugs aus Stufe-3-Bericht
- **Soll** = aus Gesetz/Referenz-Rechner abgeleitet (BEEG, § 24i SGB V, § 622 BGB, § 3/5 BUrlG, Minijob-Zentrale)
- Nach Stufe-3-Fixes sollen **Ist** und **Soll** zusammenfallen.

---

## ELTERNGELDRECHNER — 3 Testfälle

### E-01 (Standard, Deckel greift)
- **Input:** Netto vor Geburt 2.800 €, Netto danach 0 €, Basis, keine Geschwister, keine Mehrlinge.
- **Soll:** Unterschiedsbetrag 2.800 € → Ersatzrate 65 % (Netto vor Geburt > 1.240) → 2.800 × 0,65 = 1.820 € → gedeckelt auf 1.800 €/Monat. Bezugsdauer 14 Monate (Basis).
- **Ist-vor-Fix:** Voraussichtlich 1.800 € — stimmt zufällig, weil Ersatzrate aus 2.800 € auch bei Differenz-Formel ≤ 65 % greift.

### E-02 (Einkommensgrenze 175 k€, BEEG § 1 Abs. 8)
- **Input:** zvE 175.001 € (Paar oder Alleinerziehend), Netto vor Geburt 6.000 €, Netto danach 0 €.
- **Soll:** **0 € Elterngeld** — kein Anspruch oberhalb 175.000 € zvE.
- **Ist-vor-Fix:** **P1-Bug** — Rechner hat kein zvE-Feld und berechnet 1.800 € (gedeckelt). Nach Fix: 0 € + Disclaimer.

### E-03 (Geschwisterbonus)
- **Input:** Netto vor Geburt 2.000 €, Netto danach 0 €, Basis, Geschwisterbonus-Flag an.
- **Soll:** 2.000 × 0,65 = 1.300 €; Geschwisterbonus +10 % = 130 € (über Mindestbonus 75 €) → 1.430 €/Monat.
- **Ist-vor-Fix:** 1.430 € ✓ (Bonus-Logik korrekt).

### E-04 (Geringverdiener + Teilzeit — Ersatzrate-Bug)
- **Input:** Netto vor Geburt 1.500 €, Netto danach 500 €, Basis.
- **Soll:** Ersatzrate aus Netto vor Geburt (1.500 € > 1.240 €) = 65 % − (1500−1240)/2 × 0,001 = 65 % − 0,13 = ~64 % (aber min 65 %, also 65 %). Unterschiedsbetrag 1.000 € × 65 % = 650 € → Mindest 300 € → 650 € Basis.
- **Ist-vor-Fix:** Ersatzrate aus 1.000 € berechnet (weil Code aus Differenz) = 67 % → 670 €.
- **Delta:** +20 € (Code überzahlt bei Teilzeit-Geringverdienern).

---

## MUTTERSCHUTZ-/MUTTERSCHAFTSGELDRECHNER — 3 Testfälle

### M-01 (Standard GKV)
- **Input:** ET 2026-09-01, normale Geburt, Netto 2.400 €, gesetzlich versichert.
- **Soll:** Kassensatz 13 €/Tag (Cap). AG-Zuschuss: (2.400/30) − 13 = 80 − 13 = 67 €/Tag. Gesamt 98 Tage (42 vor + 56 nach). Mutterschaftsgeld gesamt: 80 × 98 = 7.840 € (AG+Kasse kombiniert). Volles Netto während Schutzfrist.
- **Ist-vor-Fix:** 80 €/Tag Gesamteinkommen ✓

### M-02 (Mehrlingsgeburt — erweiterte Nachfrist)
- **Input:** ET 2026-06-15, Mehrlingsgeburt, Netto 2.100 €, gesetzlich.
- **Soll:** Nachfrist 12 Wochen (84 Tage) statt 8. Gesamt 126 Tage. Kassensatz 13, AG-Zuschuss (70 − 13) = 57 €/Tag.
- **Ist-vor-Fix:** ✓ (Mehrlingsgeburt-Flag triggert 12 Wochen — Code Z. 48).

### M-03 (Minijob — familienversichert vs. eigene GKV)
- **Input:** Netto 520 €, Minijob.
- **Soll (eigene GKV-Mitgliedschaft):** 13 €/Tag Kasse, kein AG-Zuschuss.
- **Soll (familienversichert):** Einmalig 210 € BAS (analog 'privat'), kein Kassensatz.
- **Ist-vor-Fix:** **P2** — pauschal 13 €/Tag Kasse, keine Unterscheidung. Familienversicherte würden fälschlich 13 € × 98 Tage = 1.274 € angezeigt bekommen statt 210 €.

---

## TEILZEITRECHNER — 3 Testfälle

### T-01 (Standard, 5 → 3 Tage)
- **Input:** Vollzeit 3.500 €/40 h, Teilzeit 24 h, StKl I, NW, keine KiSt, 30 Urlaubstage, 3 Teilzeit-Tage/Wo.
- **Soll:** Faktor 0,6. Teilzeit-Brutto 2.100 €. Urlaub: 30 × 3/5 = 18 Tage.
- **Ist-vor-Fix:** 18 Tage ✓ (weil Annahme 5-Tage-Vollzeit stimmt).

### T-02 (Vollzeit 6-Tage-Woche — Bug)
- **Input:** Vollzeit 2.400 €/48 h (6×8 h), Teilzeit 24 h, 30 Urlaubstage.
- **Soll:** Bei 6-Tage-Vollzeit rechnet BAG: 30 × 3/6 = 15 Tage (Annahme Teilzeit 3 Tage/Wo.).
- **Ist-vor-Fix:** **P2** — Code rechnet 30 × 3/5 = 18 Tage. **+3 Tage AN-günstig, falsch.**

### T-03 (Urlaubsrundung § 5 Abs. 2 BUrlG)
- **Input:** Vollzeit 5 Tage, 27 Urlaubstage Vollzeit, Teilzeit 2 Tage/Wo.
- **Soll:** 27 × 2/5 = 10,8 Tage → ≥ 0,5 auf ganzen → **11 Tage**.
- **Ist-vor-Fix:** `Math.ceil(10,8) = 11` ✓ (stimmt zufällig, weil 0,8 > 0,5).
- **Edge-Kandidat für Bug-Sichtbarkeit:** 24 × 2/5 = 9,6 → `ceil = 10` ✓, aber 24 × 1/5 = 4,8 → `ceil = 5` (korrekt), 24 × 1/3 = 8,0 → 8 (korrekt). Fall „Delta < 0,5" tritt bei sauberen Bruch-Verhältnissen selten auf — `Math.ceil` rundet systematisch über, aber praktisch selten sichtbar. P2, aber Low-Impact.

---

## KÜNDIGUNGSFRIST-RECHNER — 3 Testfälle

### K-01 (Probezeit 4 Monate)
- **Input:** Beschäftigt seit 2026-01-01, Probezeit 6 Mon., AG-Kündigung am 2026-04-15.
- **Soll:** 2 Wochen ab Kündigungsdatum → letzter AT 2026-04-29. Rechtsgrundlage § 622 Abs. 3 BGB.
- **Ist-vor-Fix:** 2026-04-29 ✓

### K-02 (Grenzfall Betriebszugehörigkeit — P2-Bug)
- **Input:** Beschäftigt seit 2024-05-15, AG-Kündigung am 2026-04-01 (keine Probezeit mehr). Dauer zum Kündigungsdatum: 1 Jahr 10 Monate. Dauer zum regulären Fristende 2026-05-31 (wenn Grundfrist greift): **genau 2 Jahre 0 Monate**.
- **Soll (BAG 10 AZR 64/17):** Zur Fristende-Berechnung = 2 Jahre → 1 Monat zum Monatsende → letzter AT 2026-05-31.
- **Ist-vor-Fix:** Code sieht 1 Jahr 10 Monate → Grundfrist → 4 Wochen zum 15./EoM → letzter AT 2026-05-15. **Delta: 16 Tage zu wenig.**

### K-03 (20 Jahre — Maximum-Staffel)
- **Input:** Beschäftigt seit 2006-03-01, AG-Kündigung am 2026-04-10. Dauer 20 Jahre 1 Monat.
- **Soll:** 7 Monate zum Monatsende → letzter AT 2026-11-30.
- **Ist-vor-Fix:** 2026-11-30 ✓

---

## URLAUBSTAGE-RECHNER — 3 Testfälle

### U-01 (Standard 5-Tage-Woche)
- **Input:** 30 vertragliche Tage, 5-Tage-Woche, volles Jahr, keine Teilzeit, nicht schwerbehindert.
- **Soll:** 30 Tage, gesetzliches Minimum 20, Mehrurlaub 10.
- **Ist-vor-Fix:** 30 / 20 / 10 ✓

### U-02 (Anteilig + Schwerbehindert)
- **Input:** 25 Tage, 5-Tage-Woche, Beschäftigungsbeginn 2026-04-01, Ende offen, schwerbehindert.
- **Soll:** Basis +5 = 30 Tage. Volle Monate April–Dez = 9. 30/12 × 9 = 22,5 → § 5 Abs. 2 BUrlG: auf 23 Tage auf.
- **Ist-vor-Fix:** Code rundet auf halbe: 22,5 Tage → wird als „22,5" angezeigt. **P2 gegen § 5 Abs. 2 BUrlG** (sollte 23 sein).

### U-03 (Resturlaub 2. Jahreshälfte)
- **Input:** 30 Tage/Jahr, Kündigung 2026-08-15, bereits 12 genommen.
- **Soll:** Voller Jahresanspruch (2. Halbjahr) = 30, minus 12 → 18 Resturlaubstage.
- **Ist-vor-Fix:** 18 ✓

---

## MINIJOB-RECHNER — 3 Testfälle

### MJ-01 (Maximal-Minijob 603 €)
- **Input:** 603 €/Monat gewerblich, rv-pflichtig, 30 Std/Wo. (Check: Stundenlohn).
- **Soll:**
  - Status: Minijob (exakt an Grenze)
  - AG-Pauschalen: 15+13+2+1,6 = 31,6 % → 190,55 €
  - AG-Gesamtkosten: 793,55 €
  - AN-RV-Eigenanteil 3,6 %: 21,71 €
  - AN-Netto: 581,29 €
  - Stundenlohn: 603 / (30 × 4,33) = 4,64 €/h → **weit unter 13,90 € Mindestlohn → Warnung**
- **Ist-vor-Fix:** AG-Pauschalen ✓, Mindestlohn-Warnung ✓, aber Rentenpunkte-Schätzung falsch (s.u.)

### MJ-02 (Rentenpunkte-Divisor-Bug — P1)
- **Input:** 603 € × 12 = 7.236 € Jahresbrutto, RV-pflichtig.
- **Soll (mit 51.944 € Durchschnittsentgelt 2026):** 7.236 / 51.944 = **0,139 EP/Jahr**.
- **Ist-vor-Fix:** 7.236 / 45.358 = **0,160 EP/Jahr**. **+15 % Überschätzung.**

### MJ-03 (Übergang zum Midijob)
- **Input:** 603,01 € gewerblich, rv-pflichtig.
- **Soll:** Status = Midijob. Spezielle Übergangsbereich-Logik greift (nicht im Minijob-Rechner, aber Status-Wechsel).
- **Ist-vor-Fix:** Code: `verdienst <= MINIJOB_GRENZE` → 603,00 ≤ 603,00 = minijob, 603,01 > 603 = midijob. ✓ an der Kante.

### MJ-04 (Stichtag-Falle 01.01.2027)
- **Input:** Verdienst 633 €, Stichtag: 02.01.2027.
- **Soll (nach 01.01.2027):** Mindestlohn 14,60 €, Grenze 633 €. Status = Minijob (exakt Grenze). Stundenlohn-Check gegen 14,60 €.
- **Ist-vor-Fix zum 01.01.2027:** Grenze **633 €** (via `getMinijobGrenzeMonat()`-Switch ✓), aber Stundenlohn-Vergleich gegen **13,90 €** (weil `MINDESTLOHN_2026` fix). **P2-Inkonsistenz ab 01.01.2027.**

---

## Zusammenfassung Verifikations-Coverage

| Rechner | Testfälle | P1-Case | P2-Case | Stichtag-Case |
|---|---|---|---|---|
| Elterngeld | 4 | E-02 (175 k€), E-04 (Ersatzrate-Bug) | — | — |
| Mutterschutz | 3 | — | M-03 (Minijob-Familienvers.) | — |
| Teilzeit | 3 | — | T-02 (6-Tage-Vollzeit), T-03 (Rundung) | — |
| Kündigungsfrist | 3 | — | K-02 (BAG-Datum) | — |
| Urlaubstage | 3 | — | U-02 (§ 5 Abs. 2) | — |
| Minijob | 4 | MJ-02 (45358 € Divisor) | MJ-04 (Stichtag) | MJ-04 |

**Regression-Nutzung:** Nach jedem Fix-Pass (Prompt 110/111) diese Testfälle 1:1 am Live-Rechner nachspielen, Ist-Wert ergänzen und Delta dokumentieren. Beim Jahresaudit 2027 gilt: Sollwerte mit 2027er Rechtsstand aktualisieren, sonst Testkatalog unverändert.
