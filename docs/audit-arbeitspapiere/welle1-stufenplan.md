# Stufenplan — Intensive Prüfung Welle 1 (Hoch-Risiko-Rechner)

## Zweck und Abgrenzung

Der **Jahresparameter-Audit 2026** (Prompts 86–91) war ein *Grep-Audit*: er hat literale Werte im Code gegen 2026er-Sollwerte abgeglichen. Damit sind Hartkodierungen weg und die zentralen Libs sauber.

Diese **intensive Prüfung** ist etwas anderes: sie prüft **Logik-Korrektheit** und **Übereinstimmung mit offiziellen Referenz-Rechnern**. Der Grep hätte z. B. nicht gefunden:

- einen Splitting-Rechner, der zwei Einzel-Tarife addiert statt Splitting-Verfahren anzuwenden (formale Logik),
- einen Krankengeld-Rechner, der 90 % statt 70 % des Netto nimmt (falsche Prozent-Konstante im richtigen Paragraphen),
- einen Elterngeld-Rechner, der den Geschwisterbonus falsch deckelt,
- eine Fünftelregelung, die bei hohen Abfindungen in den negativen Bereich läuft.

**Scope Welle 1:** ~25 Hoch-Risiko-Rechner mit jährlich wechselnden Parametern oder direktem Rechtsbezug. Geschätzter Aufwand nach diesem Plan: **20–25 h verteilt auf ~2 Wochen**, nicht 15 h — die extra Zeit geht in die Cross-Checks gegen offizielle Referenz-Rechner, ohne die eine "intensive" Prüfung nur ein zweiter Grep-Durchlauf wäre.

---

## Methodologie: 7-Punkt-Check pro Rechner

Jeder Rechner durchläuft denselben Check. Konsistenz ist wichtiger als Tiefe — lieber alle 25 flach aber gleichmäßig geprüft als 3 perfekt und 22 oberflächlich.

### 1. Rechtsquellen-Check (~5 min)

- Welche §§, Tabellen, Prozentsätze fließen ein?
- Alle aktuell (2026)? Gegen die Rechtsstand-Tabelle in `CLAUDE.md` (nach Prompt 92) abgleichen.
- Falls Rechner unterjährige Anpassungen hat: ist der Stichtag-Switch korrekt?

### 2. Lib-Nutzungs-Check (~5 min)

```bash
# Beispiel für Splitting-Rechner
grep -n "12348\|12.348\|17799\|berechneESt\|PARAMS" components/rechner/SplittingRechner.tsx
```

- Werden zentrale Libs (`einkommensteuer.ts`, `lohnsteuer.ts`, `brutto-netto.ts` etc.) genutzt?
- Gibt es noch Hartkodierungen gesetzlicher Werte, die der Grep-Audit übersehen hat?
- Guard G10 (aus SKILL.md nach Prompt 92) eingehalten?

### 3. Referenz-Cross-Check (~15 min, der Kern!)

Das ist der eigentliche Mehrwert gegenüber dem Grep-Audit: **mindestens 3 Testfälle** gegen einen offiziellen Referenz-Rechner durchgehen und Differenzen dokumentieren.

**Toleranz-Bänder:**
- ESt / LSt: **±1 €** (Rundungsdifferenz akzeptabel)
- SV-Leistungen (Kug, ALG, Krankengeld): **±0,50 €**
- Renten-Werte: **±0,01 €** (Multiplikation EP × Rentenwert ist exakt)
- Prozent-Angaben: **±0,1 pp**
- Grundsteuer: **±1 €** (Ländertarif-Bandbreite tolerieren)

Größere Differenzen = Bug-Kandidat für die Fix-Liste.

### 4. Edge-Case-Check (~5 min)

Pro Rechner **2–4 Edge-Cases** ausprobieren. Nicht erschöpfend, aber konsistent:

- Null-Input (leere Felder → 0 € oder ärgerliche NaN?)
- Extremwert unten (1 €, 1 Tag, 1 EP)
- Extremwert oben (10 Mio €, 99 Jahre, 100 EP)
- Grenzwert (exakt auf BBG, exakt am Grundfreibetrag)
- Sonderkonstellation (Splitting vs. Einzel, Alleinerziehend, 5+ Kinder)

### 5. UI-Review (~5 min)

- Labels verständlich?
- Default-Werte sinnvoll (zeigt der Rechner bei Seitenaufruf sofort ein plausibles Ergebnis)?
- Fehlermeldungen klar?
- Deckt sich der angezeigte Rechenweg (Zwischenergebnisse) mit der tatsächlichen Formel?

### 6. SEO/FAQ-Review (~3 min)

- Texte fachlich korrekt?
- Aktuelle Zahlen/Jahreszahlen drin?
- FAQ-Antworten decken die häufigsten Edge-Cases ab?

### 7. Testfall-Dokumentation (~5 min)

Jeder Testfall wandert in eine persistente Datei `docs/audit-welle1-testfaelle.md`:

```markdown
## RENTENRECHNER
- Testfall R-01 (Durchschnittsfall)
  Input: 40 EP, 35 Alter, 67 Regelalter, 2000 € Brutto, 15 BJ
  Erwartung (DRV-Rechner): ~2.410 € Brutto-Rente 2026 bei Stichtag heute
  Ist: 2.410,67 € ✓
  Delta: +0,67 € (unter Toleranz)
  Datum: 19.04.2026, Claude-Chat

- Testfall R-02 (Stichtag-Switch)
  Input: 40 EP, Stichtag-Toggle 01.07.2026
  Erwartung: 40 × 42,52 = 1.700,80 €
  Ist: [Prüfen]
```

Diese Datei ist der **Regressions-Anker für 2027**: beim nächsten Jahresaudit müssen dieselben Testfälle weiterhin grün sein (mit aktualisierten Zielwerten).

---

## Stufen-Übersicht

Vier Sub-Wellen, jede in sich abgeschlossen: erst alle Rechner der Stufe auditen → Bugs sammeln → ein Fix-Prompt → Verify → nächste Stufe.

| Stufe | Fokus | Anzahl | Aufwand | Referenz-Hauptquelle |
|---|---|---|---|---|
| **1** | Steuer-Kern | 7 | 4–5 h | BMF-Lohn-und-Einkommensteuer-Rechner |
| **2** | Sozialversicherung Kern | 6 | 4–5 h | DRV, Arbeitsagentur, AOK |
| **3** | Familie + Arbeitsrecht | 6 | 3–4 h | BMFSFJ-Elterngeldrechner, BMAS |
| **4** | Wohnen + Spezial-Steuer | 6 | 3–4 h | Länder-Grundsteuer-Rechner, UBA |

Insgesamt ~25 Rechner. Puffer von ±2 Rechnern, falls in einer Stufe weitere Hoch-Risiko-Kandidaten entdeckt werden.

---

## Stufe 1 — Steuer-Kern (~4–5 h)

### Rechner

1. `/finanzen/splitting-rechner`
2. `/finanzen/kindergeld-rechner` *(Günstigerprüfung nach Soli-Fix nochmal verifizieren, Prompt 87 Fix 7)*
3. `/finanzen/pendlerpauschale-rechner`
4. `/finanzen/kirchensteuer-rechner`
5. `/finanzen/est-vorauszahlung-rechner`
6. `/finanzen/fuenftelregelung-rechner` *(auch Teil des Abfindungsrechners, doppelt relevant)*
7. `/finanzen/altersentlastungsbetrag-rechner`
8. *(optional, falls vorhanden)* `/finanzen/arbeitsmittelpauschale-rechner`

### Kritische 2026er-Parameter

- Grundfreibetrag 12.348 €
- ESt-Zonen 17.799 / 69.878 / 277.826 €
- Kinderfreibetrag gesamt 9.600 € (2× 4.800 €)
- Kindergeld 259 €
- Pendlerpauschale: 0,30 € bis 20 km, **0,38 € ab 21 km** — 2026 unverändert (ggf. Verlängerung bis 2026 gesetzlich prüfen)
- Altersentlastungsbetrag Stichtagsstaffel § 24a EStG (Kohorten-abhängig, jeder Jahrgang anderer Prozentsatz)
- Fünftelregelung: seit Prompt 67/Sprint 1 neu berechnet, hier Verify ob Dreh-Ergebnisse sinnvoll
- Soli-Freigrenze 20.350 € (nach Prompt 87 Fix 7)

### Referenz-Rechner

- **BMF:** https://www.bmf-steuerrechner.de/ekst/ (Einkommensteuer 2026)
- **BMF:** https://www.bmf-steuerrechner.de/lst/ (Lohnsteuer 2026)
- **Familienportal BMFSFJ:** Kindergeld/Kinderfreibetrag Günstigerprüfung

### Standardisierte Testfälle

| # | Input | Rechner | Erwartung |
|---|---|---|---|
| S-01 | zvE 30.000 € ledig | Splitting vs. Einzel | Splitting entfällt, ESt identisch Einzel |
| S-02 | zvE 80.000 € verheiratet | Splitting-Rechner | Splittingvorteil gegen BMF prüfen |
| K-01 | 1 Kind, zvE 30.000 € | Kindergeld | Kindergeld günstiger → 259 €/M |
| K-02 | 2 Kinder, zvE 90.000 € | Kindergeld | Freibetrag günstiger, Soli beachten |
| K-03 | 2 Kinder, zvE 19.500 € | Kindergeld | **Kein Soli-Treffer** (unter 20.350 €) — bestätigt Prompt 87 Fix 7 |
| P-01 | 30 km einfach, 220 AT, SK I | Pendlerpauschale | 10 × 0,30 + 20 × 0,38 = 10,60 €/Tag × 220 = 2.332 € |
| P-02 | 5 km, 220 AT | Pendlerpauschale | 5 × 0,30 × 220 = 330 € |
| Ki-01 | ESt 10.000 €, BY, evangelisch | Kirchensteuer | 800 € (8 % BY) |
| F-01 | Abfindung 30.000 € zusätzlich zu 50.000 € Jahresbrutto | Fünftelregelung | Gegen BMF-ESt-Rechner mit/ohne Fünftelung |
| AE-01 | Jahrgang 1955, Einkommen 25.000 € | Altersentlastung | Jahrgangsspezifischer Prozentsatz, § 24a EStG |

### Stufe-1-Abschluss

- [ ] Testfall-Log `docs/audit-welle1-testfaelle.md` hat 7 Abschnitte mit je 2–4 Testfällen
- [ ] Bug-Sammlung in `docs/audit-welle1-bugs.md` mit Priorität (🚨 P1 / ⚠️ P2 / 📋 P3)
- [ ] Fix-Prompt 94 formuliert (falls Bugs gefunden), sonst Stufe 1 direkt grün
- [ ] Re-Verify nach Fix: alle roten Testfälle wieder grün

---

## Stufe 2 — Sozialversicherung (~4–5 h)

### Rechner

1. `/finanzen/rentenrechner` *(nach Prompt 93 nochmal verifizieren)*
2. `/finanzen/rentenpunkte-rechner`
3. `/finanzen/witwenrente-rechner`
4. `/finanzen/krankengeld-rechner`
5. `/finanzen/arbeitslosengeld-rechner` *(nach Prompt 87 Fix 1+2 verifizieren)*
6. `/finanzen/pflegeversicherung-rechner` oder PV-Beitrags-Rechner

### Kritische 2026er-Parameter

- Rentenwert 40,79 €, ab 01.07.2026 → 42,52 €
- Rentenniveau 48 % (Haltelinie bis 2031)
- Durchschnittsentgelt 2026: 51.944 € (vorläufig)
- BBG RV 8.450 €/M = 101.400 €/J
- BBG KV/PV 5.812,50 €/M = 69.750 €/J
- ALG I: 60 % / 67 % des pauschalierten Netto
- Krankengeld: 70 % Brutto (max. 90 % Netto) nach § 47 SGB V
- Elterngeld-Einkommensgrenze seit April 2024: 200.000 € (zu versteuerndes Einkommen), ab 01.04.2025 weiter gesenkt (gesetzlich prüfen)
- Pflegeversicherung: Kinderabschlag nach Prompt 83 (1,55 / 1,30 / 1,05 / 0,80 %)
- Witwenrente: 55 % bzw. 60 % große Witwenrente; Sterbevierteljahr
- Freibetrag Witwenrente: angehoben mit Rentenanpassung, neuer Wert Juli 2026

### Referenz-Rechner

- **DRV:** https://www.deutsche-rentenversicherung.de/ → Service → Rechner
- **Arbeitsagentur:** https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld-rechner
- **AOK:** Krankengeld-Rechner
- **BMAS:** Pflegeversicherungs-Rechner

### Standardisierte Testfälle

| # | Input | Rechner | Erwartung |
|---|---|---|---|
| R-01 | 40 EP heute | Rente | 40 × 40,79 = 1.631,60 € |
| R-02 | 40 EP, Stichtag 01.07.2026 | Rente | 40 × 42,52 = 1.700,80 € (sofern Toggle existiert nach P93) |
| RP-01 | Brutto 3.500 €/M | Rentenpunkte | 3.500 × 12 / 51.944 ≈ 0,8086 EP/Jahr |
| WR-01 | verstorben 1.800 € Rente, Witwe 40 Jahre | Witwenrente | 55 % = 990 € (große Witwenrente, nach Sterbevierteljahr) |
| KG-01 | Brutto 4.000 €/M, 30 Tage | Krankengeld | 70 % Brutto, gedeckelt 90 % Netto |
| ALG-01 | Brutto 3.500 €, SK I, NRW, kinderlos | ALG I | 60 % des pauschalierten Leistungsentgelts — gegen Arbeitsagentur-Rechner |
| PV-01 | Brutto 4.000 €, kinderlos, 30+ | PV-Beitrag | 3,6 + 0,6 (Kinderlosenzuschlag AN) = 4,2 % AN-Anteil |
| PV-02 | Brutto 4.000 €, 3 Kinder | PV-Beitrag | 3,6 − 2× 0,25 = 3,1 %, davon 2,05 % AN |

---

## Stufe 3 — Familie + Arbeitsrecht (~3–4 h)

### Rechner

1. `/finanzen/elterngeld-rechner`
2. `/finanzen/mutterschaftsgeld-rechner`
3. `/arbeit/teilzeit-rechner`
4. `/arbeit/kuendigungsfrist-rechner`
5. `/arbeit/urlaubsanspruch-rechner`
6. `/finanzen/minijob-rechner` *(nach Prompt 88 verifizieren)*

### Kritische 2026er-Parameter

- Elterngeld: 65–67 % Nettoeinkommen, min 300 € / max 1.800 €/M
- Elterngeld-Einkommensgrenze: seit 01.04.2024: 200.000 € zvE, **ab 01.04.2025 weiter gesenkt auf 175.000 €** (beide Elternteile zusammen) — offiziell prüfen
- Mutterschaftsgeld: Höchstbetrag 13 €/Tag aus Krankenkasse + Arbeitgeberzuschuss
- Kündigungsfrist § 622 BGB: gestaffelt nach Betriebszugehörigkeit (2/5/8/10/12/15/20 J)
- Urlaub: Mindestanspruch § 3 BUrlG 24 Werktage = 20 Arbeitstage
- Minijob: 603 €/M (13,90 × 130 / 3), Jahresverdienst 7.236 €

### Referenz-Rechner

- **BMFSFJ Familienportal:** https://familienportal.de/familienportal/familienleistungen/elterngeld/elterngeldrechner
- **BMAS:** Arbeitsrechtrechner
- **Minijob-Zentrale:** Minijob-Rechner

### Standardisierte Testfälle

| # | Input | Rechner | Erwartung |
|---|---|---|---|
| EG-01 | Brutto 3.000 €/M, SK IV, 1. Kind | Elterngeld | ~1.250 € Basis (67 % auf Netto ~1.900) |
| EG-02 | Brutto 5.500 €/M, alleinverdiener | Elterngeld | Max 1.800 €/M |
| EG-03 | Paar zvE 180.000 € | Elterngeld | Anspruch weiter vorhanden (unter 200k / 175k je nach Stichtag) |
| MG-01 | Netto 2.000 €, 30 Tage Mutterschutz | Mutterschaftsgeld | 13 €/Tag + AG-Zuschuss bis Netto |
| TZ-01 | 40h Vollzeit → 20h Teilzeit | Teilzeit | Brutto-Halbierung, anteiliger Urlaub |
| KF-01 | 7 Jahre Betriebszugehörigkeit | Kündigungsfrist | 2 Monate zum Monatsende |
| U-01 | 5-Tage-Woche | Urlaubsanspruch | Gesetzliches Minimum 20 AT |
| M-01 | 13,90 €/h, 40 h/M | Minijob | 556 € (unter Grenze) |
| M-02 | 13,90 €/h, 45 h/M | Minijob | 625,50 € (über Grenze → Midijob) |

---

## Stufe 4 — Wohnen + Spezial-Steuer (~3–4 h)

### Rechner

1. `/wohnen/grundsteuer-rechner` (je nach Bundesland verschieden!)
2. `/wohnen/co2-steuer-rechner` oder Heiz-CO2-Kostenrechner
3. `/wohnen/heizkosten-rechner` (Heizkostenverordnung-Aufteilung)
4. `/finanzen/abfindungsrechner` *(mit Fünftelregelung, nach Sprint 1 verifizieren)*
5. *(falls vorhanden)* `/finanzen/arbeitsmittelpauschale-rechner`
6. *(falls vorhanden)* weitere jahresabhängige Wohnen-Rechner

### Kritische 2026er-Parameter

- Grundsteuer: Länder-spezifische Reform seit 01.01.2025 (Bundesmodell vs. Ländermodelle BW, BY, HE, NI, HH)
- CO2-Preis (BEHG): **55 €/t** 2025 → **55 €/t** 2026 (Preis eingefroren durch Koalitionsbeschluss) oder 65 € je nach Rechtsstand — **verifizieren!**
- Heizkostenverordnung § 7: Aufteilungsschlüssel 50:50 oder 70:30 (verbrauch : grundfläche) bei schlechter Effizienz
- Abfindung: Fünftelregelung seit 2025 nur noch auf Antrag in ESt-Erklärung (nicht mehr durch AG beim Lohnsteuerabzug!)
- Arbeitsmittelpauschale: 110 € seit 2023 (unverändert), ansonsten Werbungskostenpauschale 1.230 €

### Referenz-Rechner

- **BMF Grundsteuer:** Je nach Bundesland — BMF-Rechner deckt Bundesmodell, Länder haben eigene Tools
- **UBA / BMWK:** CO2-Preis-Referenz
- **Verbraucherzentrale:** Heizkostenaufteilung

### Standardisierte Testfälle

| # | Input | Rechner | Erwartung |
|---|---|---|---|
| GS-01 | Einfamilienhaus 150 m², Boden 400 €/m², NRW | Grundsteuer | Bundesmodell, konkrete Grundsteuer ~300–600 €/J (je nach Hebesatz) |
| CO2-01 | 10.000 kWh Gas | CO2-Steuer | 10.000 × 0,2 kg/kWh × 0,055 €/kg = 110 € — Wert gegen aktuellen Preis gegenprüfen |
| HK-01 | 100 m², Gesamtkosten 2.000 €, 50:50 | Heizkosten | 1.000 € Grund, 1.000 € Verbrauch |
| AB-01 | Abfindung 40.000 €, sonstige Einkünfte 50.000 € | Abfindung | Mit/ohne Fünftelung, gegen BMF-ESt-Rechner |

---

## Workflow pro Stufe

### Phase A — Audit (70 % der Zeit)

1. Für jeden Rechner der Stufe den 7-Punkt-Check durchgehen.
2. Testfälle als Markdown-Einträge in `docs/audit-welle1-testfaelle.md` dokumentieren (auch grüne Fälle — die sind die Regressions-Baseline für 2027).
3. Jeden Bug-Verdacht mit Prio kategorisieren in `docs/audit-welle1-bugs.md`:
   - 🚨 **P1** — rechnet falsch, Nutzer bekommen falsche Zahlen (z. B. Kug-Bug aus Prompt 87)
   - ⚠️ **P2** — Edge Case oder Verdachtsfall (z. B. CO2-Preis unsicher)
   - 📋 **P3** — UI oder SEO-Text

### Phase B — Fix-Prompt (20 % der Zeit)

4. Bug-Liste konsolidieren, Fix-Prompt schreiben (analog Prompt 87-Struktur).
5. Fix durch Claude Code laufen lassen.

### Phase C — Re-Verify (10 % der Zeit)

6. Alle P1-Testfälle manuell im Browser erneut prüfen — müssen jetzt grün sein.
7. Smoketest v3.1 über alle 178 URLs.
8. Stufe als abgeschlossen markieren.

---

## Governance — wo dokumentiert wird

Zwei persistente Dateien im Repo:

- **`docs/audit-welle1-testfaelle.md`** — jeder Testfall mit Input → Erwartung → Ist → Delta. Bleibt dauerhaft im Repo, wird vom Audit 2027 weitergeführt. Diese Datei ist der eigentliche Wertgewinn des Sprints, weil sie Regression in 2027 von ~20 h auf ~5 h reduziert.

- **`docs/audit-welle1-bugs.md`** — Arbeitsdokument während der Stufe, wird am Ende in den Fix-Prompt überführt und kann dann archiviert werden.

---

## Referenz-Rechner-Inventar (zentral)

Damit du während des Audits nicht jedes Mal googeln musst — die wichtigsten URLs gesammelt:

| Thema | URL | Abdeckung |
|---|---|---|
| ESt / LSt | https://www.bmf-steuerrechner.de/ | Alle Steuer-Rechner-Cross-Checks |
| Rente | https://www.deutsche-rentenversicherung.de/ → Service | Rente, Witwe, Rentenpunkte |
| ALG I | https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld-rechner | ALG I |
| Krankengeld | AOK/TK-Rechner | Krankengeld |
| Elterngeld | https://familienportal.de/familienportal/familienleistungen/elterngeld/elterngeldrechner | Elterngeld |
| Minijob | https://www.minijob-zentrale.de/ | Minijob-Grenze, Midijob-Übergang |
| Grundsteuer | BMF oder Landes-Portale | Je Bundesland |
| CO2-Preis | BEHG aktuelle Preisstaffel | CO2 |

---

## Zeitplanung (Vorschlag)

Über zwei Wochen verteilt, mit Klarstellung dass jede Stufe **in sich abgeschlossen** sein soll bevor die nächste startet:

- **Woche 1 Mo–Di:** Stufe 1 Audit + Fix + Verify (~5 h)
- **Woche 1 Do–Fr:** Stufe 2 Audit + Fix + Verify (~5 h)
- **Woche 2 Mo–Di:** Stufe 3 Audit + Fix + Verify (~4 h)
- **Woche 2 Do–Fr:** Stufe 4 Audit + Fix + Verify (~4 h)
- **Puffer:** ~2 h für nicht-eingeplante Bugs

Pausen zwischen den Stufen sind wichtig — der Reviewer-Blick wird nach 2–3 h Audit müde, und Fehler werden dann übersehen.

---

## Erster konkreter Schritt

**Wenn du startest:**

1. Lege `docs/audit-welle1-testfaelle.md` und `docs/audit-welle1-bugs.md` im Repo leer an (5 min).
2. Starte mit **Stufe 1, Rechner 1** (Splitting-Rechner) und gehe den 7-Punkt-Check durch. Dokumentiere Testfall S-01 und S-02 als erstes Beispiel — damit hast du den Rhythmus.
3. Ping mich nach Rechner 1, falls die Methodik noch nachjustiert werden soll, oder wenn du bei einem Testfall unsicher bist, wie der Referenz-Rechner zu interpretieren ist.

**Alternative, falls du magst, dass ich aktiv unterstütze:**

Für **jede Stufe** kann ich vorab ein strukturiertes *Audit-Arbeitsblatt* als Markdown generieren (eine Zeile pro Testfall mit leeren Feldern für Input, Erwartung, Ist, Delta, Bewertung). Du füllst während der manuellen Prüfung nur die Ist-Spalte aus, der Rest ist schon vorstrukturiert. Ich kann auch **direkt zu Beginn jeder Stufe** die aktuellen 2026er-Sollwerte gegen offizielle Quellen nochmal verifizieren, damit die Erwartungs-Spalte belastbar ist.

Sag, ob du das so willst — dann fangen wir mit Stufe 1 Arbeitsblatt an.
