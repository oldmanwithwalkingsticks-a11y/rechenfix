# Stufe 1 — Arbeitsblatt Steuer-Kern-Audit

**Scope:** 7 Rechner (Splitting, Kindergeld, Pendlerpauschale, Kirchensteuer, ESt-Vorauszahlung, Fünftelregelung, Altersentlastung)
**Referenz-Rechner:** https://www.bmf-steuerrechner.de/
**Vorbereitet:** 19.04.2026, alle 2026er-Werte verifiziert
**Erwartete Dauer:** 4–5 h

---

## Anleitung

Für jeden Rechner:

1. **URL öffnen** (inkognito, damit nichts gecached ist)
2. **Testfälle durchgehen:** Input eingeben, Ist-Wert und Delta eintragen, Status setzen
3. **Lib/UI/SEO-Checkboxen abhaken**
4. **Auffälligkeiten** in die Bug-Sammlung unten eintragen

Status-Symbole:
- ✓ im Toleranz-Band
- ⚠️ knapp daneben oder Edge-Case-Auffälligkeit
- ✗ außerhalb Toleranz, Bug-Kandidat

Toleranzen:
- ESt/LSt-Wert: ±1 €
- Pauschalen ohne Rundung: ±0,01 €
- Kindergeld-Günstigerprüfung: exakte Übereinstimmung

---

## 2026er-Rechtsstand (Referenz für alle Rechner der Stufe)

| Parameter | Wert 2026 | Quelle |
|---|---|---|
| Grundfreibetrag ESt | 12.348 € | § 32a EStG |
| ESt-Zonengrenzen | 17.799 / 69.878 / 277.826 € | § 32a EStG |
| Reichensteuer-Grenze | 277.826 € (45 %) | § 32a EStG |
| Kindergeld | 259 €/Kind/Monat | § 66 EStG |
| Kinderfreibetrag (sächlich, zusammen) | **6.828 €** | § 32 Abs. 6 EStG |
| BEA-Freibetrag (zusammen) | **2.928 €** (unverändert seit 2021) | § 32 Abs. 6 EStG |
| Kinderfreibetrag gesamt (zusammen) | **9.756 €** | § 32 Abs. 6 EStG |
| Soli-Freigrenze | 20.350 € | § 4 SolzG |
| Pendlerpauschale | **0,38 €/km ab 1. km** (Änderung 2026!) | § 9 Abs. 1 Nr. 4 EStG, StÄndG 2025 |
| Pendlerpauschale Höchstbetrag (außer PKW) | 4.500 €/Jahr | § 9 Abs. 1 Nr. 4 EStG |
| Arbeitnehmer-Pauschbetrag | 1.230 € | § 9a EStG |
| Kirchensteuersatz BW, BY | 8 % | Kirchensteuergesetze der Länder |
| Kirchensteuersatz übrige Länder | 9 % | " |
| Altersentlastungsbetrag Kohorte 2025 (erstmals 2026) | **12,8 %, max. 608 €** | § 24a EStG |

---

## Rechner 1 — Splitting-Rechner

**URL:** https://www.rechenfix.de/finanzen/splitting-rechner
**Referenz:** BMF ESt-Rechner https://www.bmf-steuerrechner.de/ekst/ (zwei Einzelläufe + Splitting-Lauf, Differenz vergleichen)

**Rechtsquellen-Check:** § 32a Abs. 5 EStG (Splittingverfahren)
**Vorarbeit-Grep:**
```bash
grep -n "splitting\|Splittingverfahren\|berechneESt" components/rechner/SplittingRechner.tsx
```

### Testfälle

| # | Input (Ehegatte A / B zvE) | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| S-01 | 30.000 € / 30.000 € | Splittingvorteil 0 € (gleiches Einkommen) | | | |
| S-02 | 80.000 € / 20.000 € | [aus BMF-Rechner: ESt Einzel 80k + Einzel 20k − ESt Splitting 100k] | | | |
| S-03 | 100.000 € / 0 € | Maximaler Splittingvorteil; BMF: ESt Einzel 100k − ESt Splitting 100k | | | |
| S-04 | 50.000 € / 50.000 € | Splittingvorteil 0 € | | | |

**Vorgehen für S-02 und S-03:** BMF-Rechner mit zvE 80.000 ledig → ESt notieren. Dann zvE 20.000 ledig → ESt notieren. Dann zvE 100.000 verheiratet Splittingtarif → ESt notieren. Splittingvorteil = (ESt1 + ESt2) − ESt_Splitting.

### Edge Cases

- [ ] E-01: Beide zvE = 0 → sollte 0 € ESt, 0 € Vorteil
- [ ] E-02: zvE 278.000 € + 0 € → Reichensteuer-Zone, Splitting hebt Zone aus
- [ ] E-03: Negatives zvE (Verluste) → sollte sinnvolle Fehlermeldung oder Behandlung

### Check-Liste

- [ ] Rechtsquellen aktuell (2026er Tarif)
- [ ] Lib-Nutzung: `berechneEStGrund` aus `lib/berechnungen/einkommensteuer.ts` wird genutzt
- [ ] Alle 4 Testfälle grün
- [ ] Alle Edge-Cases erwartbar
- [ ] UI: Eingabefelder klar beschriftet, Splittingvorteil prominent dargestellt
- [ ] SEO: Text erklärt Splitting-Prinzip korrekt, keine 2024er/2025er Werte mehr

---

## Rechner 2 — Kindergeld-Rechner

**URL:** https://www.rechenfix.de/finanzen/kindergeld-rechner
**Referenz:** BMF Günstigerprüfung-Beispiele + eigene Handrechnung

**Rechtsquellen-Check:** § 31, § 32, § 66 EStG, § 4 SolzG (für Soli-Anteil in Günstigerprüfung)

**Besondere Aufmerksamkeit:** Nach Prompt 87 Fix 7 ist die Soli-Freigrenze auf 20.350 € korrigiert. **Hier müssen die Testfälle K-03 und K-04 explizit den Soli-Freigrenzen-Fix verifizieren.**

### Testfälle

| # | Input | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| K-01 | 1 Kind, Elternpaar zvE 40.000 € | Kindergeld günstiger: 12 × 259 = 3.108 €/Jahr. Freibetrag-ESt-Ersparnis < 3.108 €. | | | |
| K-02 | 2 Kinder, Elternpaar zvE 120.000 € | Freibetrag günstiger: 2 × 9.756 = 19.512 € abziehen, ESt-Ersparnis > Kindergeld. | | | |
| K-03 | 2 Kinder, zvE 19.500 € | **Kein Soli-Treffer** (zvE nach Freibetrag-Abzug unter 20.350 €). Kindergeld günstiger. Bestätigt Prompt 87 Fix 7. | | | |
| K-04 | 1 Kind, zvE 25.000 € | Grenze: evtl. erste Soli-Treffer in Milderungszone. Kindergeld vs. Freibetrag knapp. | | | |
| K-05 | 3 Kinder, zvE 80.000 € | 3 × Kindergeld (3.108 × 3 = 9.324 €) vs. 3 × 9.756 = 29.268 € Freibetrag | | | |
| K-06 | 0 Kinder | Keine Günstigerprüfung, Kindergeld 0 € | | | |

### Edge Cases

- [ ] E-01: Genau an Soli-Freigrenze zvE 20.350 € → kein Soli, bei 20.351 € Soli in Milderungszone
- [ ] E-02: Genau an Milderungsgrenze 37.838 € → Soli in normaler Höhe (5,5 %)
- [ ] E-03: Hälftiger Kinderfreibetrag (Alleinerziehend ohne anderen Elternteil übertragen)

### Check-Liste

- [ ] Kindergeld zeigt 259 € (nach Prompt 89)
- [ ] Freibetrag zeigt 9.756 € (oder 6.828 + 2.928 einzeln)
- [ ] Soli-Freigrenze 20.350 € im Code (nach Prompt 87 Fix 7)
- [ ] Günstigerprüfung wechselt bei passendem Einkommen zwischen Kindergeld und Freibetrag
- [ ] SEO-Text nach Prompt 89: keine 255er Zahlen mehr
- [ ] UI klar: zeigt beide Varianten und welche günstiger ist

---

## Rechner 3 — Pendlerpauschale-Rechner

**URL:** https://www.rechenfix.de/finanzen/pendlerpauschale-rechner
**Referenz:** ADAC, steuern.de, Randstad (alle mit einheitlichem 0,38 €/km)

**⚠️ WICHTIG:** Pendlerpauschale 2026 ist **einheitlich 0,38 €/km ab dem 1. Kilometer** (StÄndG 2025, Bundesrat 19.12.2025). Die bisherige Staffelung 0,30 € / 0,38 € ist **abgeschafft**. Wenn der rechenfix-Rechner noch staffelt, ist das ein kritischer Bug.

**Rechtsquellen-Check:** § 9 Abs. 1 Nr. 4 EStG (neu gefasst durch StÄndG 2025)
**Vorarbeit-Grep:**
```bash
grep -n "0.30\|0,30\|0.38\|0,38\|21.*km\|pendler" components/rechner/PendlerpauschaleRechner.tsx app/finanzen/pendlerpauschale*
```

### Testfälle

| # | Input (km einfach / Arbeitstage) | Erwartung 2026 | Ist | Delta | Status |
|---|---|---|---|---|---|
| P-01 | 10 km / 220 AT | 10 × 0,38 × 220 = **836 €** | | | |
| P-02 | 20 km / 220 AT | 20 × 0,38 × 220 = **1.672 €** | | | |
| P-03 | 30 km / 220 AT | 30 × 0,38 × 220 = **2.508 €** | | | |
| P-04 | 5 km / 230 AT | 5 × 0,38 × 230 = **437 €** | | | |
| P-05 | 50 km / 200 AT (Bahn, Höchstbetrag) | 50 × 0,38 × 200 = 3.800 € — kein Höchstbetrag-Treffer (4.500 €) | | | |
| P-06 | 100 km / 220 AT (Bahn, Höchstbetrag-Treffer) | 100 × 0,38 × 220 = 8.360 € → gedeckelt auf **4.500 €** (wenn NICHT eigener Pkw) | | | |

### Edge Cases

- [ ] E-01: 0 km → 0 €
- [ ] E-02: 1 km / 1 AT → 0,38 €
- [ ] E-03: PKW vs. Bahn-Toggle (nur Bahn = Höchstbetrag 4.500 €, PKW = unbegrenzt)
- [ ] E-04: Nachkommakilometer (angefangene km zählen nicht)

### Check-Liste

- [ ] **Keine Staffelung mehr im Code** — einheitlich 0,38 €/km
- [ ] Höchstbetrag 4.500 € korrekt angewendet bei Nicht-PKW
- [ ] SEO-Text: Pendlerpauschale-Reform 2026 erwähnt, nicht mehr "0,30 € für die ersten 20 km"
- [ ] FAQ-Text: aktualisiert auf 2026er Recht
- [ ] Mobilitätsprämie § 101 EStG (für Geringverdiener) — falls der Rechner das abbildet, Werte prüfen

---

## Rechner 4 — Kirchensteuer-Rechner

**URL:** https://www.rechenfix.de/finanzen/kirchensteuer-rechner
**Referenz:** Einfache Multiplikation: KiSt = ESt × 8 % (BY/BW) oder 9 % (übrige Länder), abzgl. Kinderfreibetrag-Effekt

**Rechtsquellen-Check:** KiStG der Länder, § 51a EStG (KiSt-Bemessungsgrundlage = ESt nach Abzug des Kinderfreibetrags)

### Testfälle

| # | Input | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| Ki-01 | ESt 10.000 €, Bayern | 10.000 × 8 % = **800 €** | | | |
| Ki-02 | ESt 10.000 €, NRW | 10.000 × 9 % = **900 €** | | | |
| Ki-03 | ESt 0 €, BW | 0 € | | | |
| Ki-04 | zvE 50.000 €, 1 Kind, NRW, verheiratet | Bemessungsgrundlage = ESt_fiktiv (nach Abzug Kinderfreibetrag) × 9 % | | | |
| Ki-05 | Keine Konfession | 0 € | | | |

### Edge Cases

- [ ] E-01: Bundesland-Dropdown — 16 Länder, BY+BW mit 8 %, Rest mit 9 %
- [ ] E-02: "Keine Religion" bzw. "konfessionslos" → 0 €
- [ ] E-03: § 51a EStG Sonderfall: Kinderfreibetrag für KiSt immer anwenden (auch wenn Kindergeld günstiger für ESt)

### Check-Liste

- [ ] Alle 16 Länder mit korrekten Sätzen
- [ ] § 51a-Effekt (KiSt auf fiktive ESt mit Kinderfreibetrag) implementiert
- [ ] UI: Bundesland-Auswahl, Konfession klar
- [ ] SEO: erklärt § 51a, Deckelungsregeln manche Länder (Kappung)

---

## Rechner 5 — ESt-Vorauszahlung-Rechner

**URL:** https://www.rechenfix.de/finanzen/est-vorauszahlung-rechner (prüfen, evtl. anderer Pfad)
**Referenz:** BMF-Rechner für ESt-Ergebnis + § 37 EStG für Vorauszahlungs-Regel

**Rechtsquellen-Check:** § 37 EStG (vierteljährliche Vorauszahlungen: 10.03., 10.06., 10.09., 10.12.; Bagatellgrenze 400 €/Quartal, 1.600 €/Jahr)

### Testfälle

| # | Input | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| V-01 | Erwartete ESt 8.000 €, ledig | 8.000 / 4 = 2.000 € pro Quartal, Gesamt 8.000 €/Jahr | | | |
| V-02 | Erwartete ESt 500 € | Unter Bagatellgrenze: **keine Vorauszahlung** (§ 37 Abs. 5 EStG) | | | |
| V-03 | Erwartete ESt 1.500 € | Knapp unter Jahresgrenze 1.600 €: keine Vorauszahlung | | | |
| V-04 | Erwartete ESt 1.700 € | Über 1.600 €: Vorauszahlung 425 €/Quartal | | | |

### Edge Cases

- [ ] E-01: Vorauszahlung exakt an Bagatell-Grenze
- [ ] E-02: Soli-Anteil an Vorauszahlung (zvE über 20.350 €)
- [ ] E-03: Kirchensteuer-Vorauszahlung (wenn Konfessionsangabe möglich)

### Check-Liste

- [ ] Bagatellgrenze 400 €/Quartal bzw. 1.600 €/Jahr korrekt angewendet
- [ ] Quartalstermine korrekt: 10.03., 10.06., 10.09., 10.12.
- [ ] Soli korrekt mitberechnet
- [ ] UI zeigt klar: Gesamt-VZ und Quartals-VZ
- [ ] SEO: § 37 EStG erklärt

---

## Rechner 6 — Fünftelregelung-Rechner

**URL:** https://www.rechenfix.de/finanzen/fuenftelregelung-rechner
**Referenz:** BMF-Rechner für ESt mit/ohne "außerordentlicher Einkünfte"

**Rechtsquellen-Check:** § 34 EStG.

**⚠️ Wichtig 2025er-Änderung:** Seit 2025 wird die Fünftelregelung beim Lohnsteuerabzug durch den Arbeitgeber **nicht mehr automatisch** angewendet — nur noch auf Antrag in der ESt-Erklärung. Rechnerisch bleibt die Fünftelung gleich, aber der Rechner muss diesen Hinweis transportieren.

### Testfälle

| # | Input (regelmäßiges zvE / außerordentliche Einkünfte) | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| F-01 | 50.000 € / 30.000 € (Abfindung) ledig | Fünftelung = (ESt(65k) − ESt(50k)) × 5; Vergleich mit ESt(80k) direkt | | | |
| F-02 | 30.000 € / 50.000 € ledig | Starker Progressionseffekt, Fünftelung lohnt sich | | | |
| F-03 | 80.000 € / 10.000 € ledig | Wenig Progressionseffekt, Fünftelung marginal | | | |
| F-04 | 0 € / 50.000 € ledig | Sonderfall: kein regelmäßiges zvE, Fünftelung greift voll auf Abfindung | | | |
| F-05 | 50.000 € + 30.000 € verheiratet | Mit Splittingtarif kombiniert | | | |

**Vorgehen:** Im BMF-Rechner einmal ESt für zvE_regel + zvE_aoe berechnen (ohne Fünftelung), einmal mit "außerordentliche Einkünfte"-Option. Differenz = Steuerersparnis durch Fünftelung.

### Edge Cases

- [ ] E-01: Negative Einkünfte (sollte sinnvoll gehandhabt werden)
- [ ] E-02: Abfindung > 5 × regelmäßiges zvE (Extremfall)
- [ ] E-03: Spitzensteuersatz bereits erreicht → Fünftelung bringt nichts

### Check-Liste

- [ ] ESt-Tarif 2026 korrekt angewendet (12.348 / 17.799 / 69.878)
- [ ] Fünftelungs-Formel korrekt: `(ESt(regel + aoe/5) − ESt(regel)) × 5`
- [ ] **Hinweistext zur 2025er Änderung** (nicht mehr automatisch beim Lohnsteuerabzug)
- [ ] UI zeigt klar: Vergleich mit/ohne Fünftelung, Ersparnis
- [ ] SEO: § 34 EStG erklärt, BMF-Schreiben zitiert

---

## Rechner 7 — Altersentlastungsbetrag-Rechner

**URL:** https://www.rechenfix.de/finanzen/altersentlastungsbetrag-rechner (evtl. anderer Pfad)
**Referenz:** § 24a EStG Tabelle, vermögenszentrum.de Tabelle

**Rechtsquellen-Check:** § 24a EStG (Jahrgangsstaffel 1940–1994, bis 2058 auslaufend)

**Kohortensystem:** Der Prozentsatz und Höchstbetrag richten sich nach dem **Jahr, das auf die Vollendung des 64. Lebensjahres folgt**. Bleibt lebenslang konstant.

Relevante Kohorten für 2026:

| Kohorte (1. Jahr mit Anspruch) | Prozentsatz | Höchstbetrag |
|---|---|---|
| 2023 (Jg. 1958) | 14,0 % | 665 € |
| 2024 (Jg. 1959) | 13,6 % | 646 € |
| 2025 (Jg. 1960) | 13,2 % | 627 € |
| **2026 (Jg. 1961)** | **12,8 %** | **608 €** |

### Testfälle

| # | Input (Geburtsjahr / begünstigte Einkünfte) | Erwartung | Ist | Delta | Status |
|---|---|---|---|---|---|
| A-01 | 1961 / 10.000 € | 10.000 × 12,8 % = 1.280 € → gedeckelt auf **608 €** | | | |
| A-02 | 1961 / 3.000 € | 3.000 × 12,8 % = **384 €** (unter Höchstbetrag) | | | |
| A-03 | 1958 / 10.000 € | 10.000 × 14 % = 1.400 € → gedeckelt auf **665 €** | | | |
| A-04 | 1960 / 5.000 € | 5.000 × 13,2 % = **660 €** (über Höchstbetrag 627 €!) → gedeckelt **627 €** | | | |
| A-05 | 1970 / 10.000 € | Noch nicht 64, **0 €** Altersentlastung | | | |
| A-06 | 1940 / 10.000 € | Vor 1941 geboren: voller Satz 40 %, max. 1.908 € (alte Kohorte) | | | |

### Edge Cases

- [ ] E-01: Genau am 64. Geburtstag (wird erst ab Folgejahr relevant)
- [ ] E-02: Negative Einkünfte (sollte 0 € Altersentlastung)
- [ ] E-03: Jahrgang 2058 oder später → 0 %, 0 € (kein Anspruch mehr)
- [ ] E-04: Rente/Pension NICHT als begünstigte Einkünfte

### Check-Liste

- [ ] Jahrgangsstaffel korrekt bis Kohorte 2058
- [ ] Gesetzliche Rente ausgeschlossen
- [ ] Lohn/Vermietung/Kapitalerträge als begünstigte Einkünfte
- [ ] UI: Jahrgang klar abfragen, Satz+Höchstbetrag anzeigen
- [ ] SEO: § 24a EStG erklärt, Tabelle im Text

---

## Konsolidierung am Ende der Stufe

### Bug-Sammlung

Während des Audits entdeckte Probleme hier eintragen. Nach der Stufe wird daraus Prompt 94 generiert.

| Prio | Rechner | Test-ID | Beschreibung | Datei:Zeile |
|---|---|---|---|---|
| 🚨 | | | | |
| ⚠️ | | | | |
| 📋 | | | | |

### Zusammenfassungs-Template

Nach Abschluss ausfüllen:

- [ ] **7 Rechner durchgeprüft**
- [ ] **N Testfälle grün, M Testfälle rot**
- [ ] **K Bugs identifiziert** (davon X P1, Y P2, Z P3)
- [ ] **Dauer tatsächlich:** _ h _ min
- [ ] **Überraschungen während des Audits:** (Freitext)

### Bereits bekannte Kandidaten

Aus der Vorbereitung wissen wir, dass **mit hoher Wahrscheinlichkeit Bugs** gefunden werden bei:

1. **Pendlerpauschale-Rechner** — wenn der Code noch die Staffelung 0,30 €/0,38 € hat (StÄndG 2025 wurde am 19.12.2025 beschlossen; Grep-Audit war am 18.04.2026 — falls der Rechner davor gebaut wurde und seitdem nicht angefasst, ist er veraltet).
2. **Kindergeld-Rechner Kinderfreibetrag** — wenn 9.600 € (2025er) oder 9.540 € (2024er) noch im Code oder Text. Der Grep-Audit hat Kindergeld 255→259 gefangen, aber Kinderfreibetrag 9.600→9.756 möglicherweise nicht.
3. **ESt-Vorauszahlung** — falls Bagatellgrenzen 400/1.600 hartcodiert statt aus zentraler Lib.

---

## Fix-Prompt-Erstellung (Phase B nach Audit)

Wenn Bugs gefunden wurden:

1. Bug-Sammlung oben konsolidieren.
2. Pro Bug: Datei:Zeile, Ist-Wert, Soll-Wert, Quelle notieren (analog Prompt 87).
3. Bug-Sammlung an Claude-Chat schicken mit "Schreibe Prompt 94 auf Basis dieser Bug-Liste".
4. Nach Fix durch Claude Code: Testfälle re-run, müssen alle grün werden.

## Phase C — Re-Verify

- [ ] Alle ehemals roten Testfälle jetzt grün
- [ ] Smoketest v3.1 (178 URLs) grün
- [ ] `next build` grün
- [ ] Stufe 1 als abgeschlossen markieren in `docs/audit-welle1-testfaelle.md`
