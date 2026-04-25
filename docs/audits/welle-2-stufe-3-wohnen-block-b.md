# Welle 2 Stufe 3 — Wohnen Block B (Mengen- und Verbrauchsrechner)

**Audit-Bericht | Stand: 25. April 2026 | Methodik: 4-Punkt-Audit (Formel/Rechtsquelle, Input-Validierung, Edge Cases, SSOT)**

Scope: 13 Mengen- und Verbrauchsrechner der Kategorie Wohnen — verifiziert gegen Konfig-Stand nach 147/147b/147c. Validation-Layer-Befunde sind aus dem Scope ausgeklammert (gehen in Welle 3 Validation-Sweep).

---

## Executive Summary

Block B ist deutlich substanzärmer als Block A — mathematische Mengenrechner und etablierte DIN-/Material-Konstanten ohne juristische Volatilität.

- **0 P1-Befunde** (keine kritischen Faktenfehler oder Rechen-Bugs)
- **2 P2-Befunde** (PV-Ertrag-Inkonsistenz nach 147c, fehlende SSOT-Referenz)
- **5 P3-Befunde** (didaktische Präzisierungen, Aktualität, interne Inkonsistenzen)
- **0 Features**

Schwerpunkt: dachflaechen-rechner enthält noch alte 950-kWh/kWp-Werte aus Pre-147c-Zeit, poolkosten-rechner hat interne Inkonsistenzen zwischen Beispiel/Erklärtext/FAQ.

---

## Sauber durchgekommen (kein Befund)

stromkosten · mietrechner · quadratmeter · tapetenbedarf · malerkosten · energiekosten · fliesenbedarf · laminat · beton · estrich

(10 von 13 Rechnern ohne Befund — guter Stand.)

---

## P2 — Wichtige Aktualisierungen

### P2.1 — dachflaechen-rechner: PV-Ertrag-Inkonsistenz mit photovoltaik-rechner

**Ist-Stand** (`erklaerung`, Zeile 861 + FAQ-Eintrag „Wie groß kann meine PV-Anlage…"):

> „Pro Kilowatt-Peak (kWp) einer modernen PV-Anlage benötigen Sie rund **5,5 m² Modulfläche**. […] Der Ertrag liegt in Deutschland bei durchschnittlich **950 kWh/kWp/Jahr**. Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund 11.400 kWh/Jahr"

**Soll-Stand:** Nach 147c rechnet der `photovoltaik-rechner` mit **850 kWh/kWp** als theoretischem Süd-Optimum (PR 0,85 nach VDI 6002 inkl.). Werte differenzieren weiter über Ausrichtungs- und Neigungsfaktoren (Mertens-Standard).

**Konsistenz-Problem:** User, der zuerst dachflaechen-rechner für Dimensionierung nutzt und dann photovoltaik-rechner ergänzend, bekommt unterschiedliche Erträge — Differenz ~12 % bei Süd-Optimal, je nach Ausrichtung mehr.

**Empfehlung:** Erklärtext und FAQ-Eintrag auf 147c-Konsistenz angleichen. Verweis auf PR und Faktor-Modell. Beispielrechnung auf 850 kWh/kWp neu kalkulieren:

```diff
- Pro Kilowatt-Peak (kWp) einer modernen PV-Anlage benötigen Sie rund 5,5 m² Modulfläche. Nicht die gesamte Dachfläche ist nutzbar — bei Schrägdächern sind es rund 70 %, bei Flachdächern (aufgeständert) nur 50 %, da die Module sich gegenseitig nicht verschatten dürfen. Der Ertrag liegt in Deutschland bei durchschnittlich 950 kWh/kWp/Jahr. Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund 11.400 kWh/Jahr — mehr als der Verbrauch eines typischen Einfamilienhauses.
+ Pro Kilowatt-Peak (kWp) einer modernen PV-Anlage benötigen Sie rund 5–5,5 m² Modulfläche (moderne Module mit ~200 Wp/m²). Nicht die gesamte Dachfläche ist nutzbar — bei Schrägdächern sind es rund 70 %, bei Flachdächern (aufgeständert) nur 50 %, da die Module sich gegenseitig nicht verschatten dürfen. Der Ertrag liegt bei einem optimal Süd-ausgerichteten Dach mit 25–35° Neigung bei rund 850 kWh/kWp und Jahr (inkl. Performance Ratio 0,85 nach VDI 6002). Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund 10.200 kWh/Jahr Ertrag (ohne Eigenverbrauchs-Reduktion). Die genauen Werte für Ihre Ausrichtung und Neigung kalkuliert unser Photovoltaik-Rechner mit dem vollständigen Faktor-Modell nach Konrad Mertens.
```

FAQ-Eintrag „Wie groß kann meine PV-Anlage auf diesem Dach werden?" entsprechend (950 → 850).

**Code-seitige Implikation:** Falls der dachflaechen-rechner intern Ertrags-Berechnungen anstellt (für die Anzeige des PV-Potenzials), muss er den `pv-ertragsmodell.ts`-SSOT importieren und `berechneSpezifischenErtrag('sued', 'optimal')` nutzen — statt einer hardcodierten 950.

**Rechtsquelle / Fachquelle:** K. Mertens, „Photovoltaik" (Hanser); VDI 6002 für PR; konsistent mit 147c.

### P2.2 — nebenkosten-rechner: Mieterbund-Wert auf Aktualität prüfen

**Ist-Stand** (`erklaerung`, Zeile 78):

> „Laut Betriebskostenspiegel des Deutschen Mieterbunds betragen die durchschnittlichen Nebenkosten in Deutschland etwa 2,88 Euro pro Quadratmeter und Monat."

**Soll-Stand:** Der Wert 2,88 €/m² stammt aus dem Mieterbund-Betriebskostenspiegel 2021/2022. Aktuelle Versionen (2024/2025-Spiegel, basierend auf Abrechnungen 2022/2023) liegen typischerweise bei 2,40 €/m² ohne Heizkosten oder 3,40 €/m² inkl. Heizkosten — die Methodik unterscheidet sich je nach Erhebungs-Auswertung. Im FAQ wird 2,88 €/m² erneut zitiert.

**Empfehlung:** Aktuellen Mieterbund-Betriebskostenspiegel (verfügbar unter mieterbund.de) als Primärquelle prüfen und Wert + Quellen-Datum-Hinweis einsetzen. Idealerweise zwei Werte angeben (mit/ohne Heizkosten), da die Frage „was zählt rein" oft Verwirrung stiftet.

**Rechtsquelle:** Deutscher Mieterbund, Betriebskostenspiegel (jährlich, mieterbund.de).

---

## P3 — Präzisierungen

### P3.1 — poolkosten-rechner: Filterstrom-Beispielwert aus Pre-147

**Ist-Stand** (`beispiel`, Zeile 1069): *„Filterstrom ≈ 220 €"*

**Erklärtext-Berechnung** (Zeile 1080): „0,6 kW × 8 h × 153 Tagen × 37 ct = 271,80 €" → ergibt rund **270 €**, nicht 220 €.

**Diagnose:** Die 220 € passen zu einer Annahme von ~32 ct/kWh (alter Wert vor 147 Strompreis-SSOT-Migration). Beispielfeld wurde bei 147 nicht mit aktualisiert.

**Empfehlung:**

```diff
- Beispiel: 40 m³ Pool, ohne Heizung, mit Abdeckung, Mai–September → Wasser ≈ 190 €, Filterstrom ≈ 220 €, Chemie ≈ 240 €, Wartung ≈ 410 €. Gesamt ≈ 1.060 €/Jahr.
+ Beispiel: 40 m³ Pool, ohne Heizung, mit Abdeckung, Mai–September → Wasser ≈ 190 €, Filterstrom ≈ 270 €, Chemie ≈ 325 €, Wartung ≈ 410 €. Gesamt ≈ 1.195 €/Jahr.
```

(Die 240 → 325 € Chemie folgt aus P3.3 unten — Mittelwert-Korrektur.)

### P3.2 — poolkosten-rechner: Pumpenlaufzeit-Inkonsistenz

**Ist-Stand:** Drei verschiedene Werte im selben Rechner:
- *„6 bis 10 Stunden"* im Erklärtext-Hauptteil (Zeile 1080)
- *„8 h"* in der Formel-Zeile (Zeile 1068)
- *„10 Stunden pro Tag"* in der FAQ (Zeile 1134)

**Diagnose:** Inkonsistenz, vermutlich über Zeit gewachsen.

**Empfehlung:** Auf 8 h als Mittelwert vereinheitlichen. Erklärtext-Bandbreite „6–10 Stunden" erhalten (Realität), aber Formel/Beispiel/FAQ konsistent mit 8 h rechnen.

### P3.3 — poolkosten-rechner: Chemiekosten-Beispielwert

**Ist-Stand:** *„Chemie ≈ 240 €"* im Beispiel (40-m³-Pool).

**Erklärtext** sagt: *„6 bis 10 € pro m³ Pool und Saison"*. Bei 40 m³ also Range 240–400 €. **FAQ** spricht von „250–400 €". Der Beispielwert von 240 ist die untere Grenze.

**Empfehlung:** Auf Mittelwert ~325 € (= 8 €/m³) anheben für realistischeres Beispiel. Erklärtext-Range 6–10 €/m³ bleibt unverändert.

### P3.4 — dachflaechen-rechner: Walmdach-Begriff „Näherung"

**Ist-Stand** (`erklaerung`, Zeile 840):

> „Beim Walmdach sind alle vier Seiten geneigt. Die genaue Flächenberechnung erfordert Trapez- und Dreiecksflächen. Als schnelle **Näherung** verwenden wir: **Grundfläche / cos(Neigung)**, was gute Werte liefert, solange die Neigung aller Seiten gleich ist."

**Diagnose:** Mathematisch ist `Grundfläche / cos(Neigung)` bei einem Walmdach mit gleicher Neigung an allen vier Seiten **exakt**, nicht eine Näherung. Begründung: Jeder Quadratmeter Grundfläche projiziert sich um Faktor 1/cos(Neigung) auf die Dachfläche, unabhängig von der Neigungsrichtung.

**Empfehlung:**

```diff
- Als schnelle Näherung verwenden wir: Grundfläche / cos(Neigung), was gute Werte liefert, solange die Neigung aller Seiten gleich ist. Für komplexe Walmdächer mit unterschiedlichen Neigungen empfehlen wir eine fachliche Aufmessung.
+ Bei gleicher Neigung an allen vier Seiten gilt die einfache Formel: Grundfläche / cos(Neigung) — diese ist mathematisch exakt, da jeder Quadratmeter Grundfläche um den gleichen Faktor 1/cos(Neigung) auf die Dachfläche projiziert wird. Für Walmdächer mit unterschiedlichen Neigungen (oder krüppelwalmen mit teilweisem Walm) empfehlen wir eine fachliche Aufmessung.
```

### P3.5 — dachflaechen-rechner: Eigenverbrauch-Hinweis bei PV-Beispielrechnung

**Ist-Stand:** *„11.400 kWh/Jahr — mehr als der Verbrauch eines typischen Einfamilienhauses."*

**Diagnose:** Die Aussage stimmt rechnerisch (EFH ~4.000–5.000 kWh), ist aber irreführend ohne Eigenverbrauch-Kontext. Ohne Speicher liegt der Eigenverbrauchsanteil bei 25–35 %, also nutzt der Haushalt nur ~3.000 kWh selbst, der Rest geht ins Netz (zu 7,78 ct/kWh Einspeisevergütung).

**Empfehlung:**

```diff
- Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund 11.400 kWh/Jahr — mehr als der Verbrauch eines typischen Einfamilienhauses.
+ Ein Satteldach mit 98 m² Südausrichtung könnte also ca. 12 kWp liefern = rund 10.200 kWh/Jahr Ertrag (mit P2.1-Korrektur). Das ist deutlich mehr als der typische Einfamilienhaus-Stromverbrauch von 4.000–5.000 kWh — der Überschuss wird ins Netz eingespeist (Vergütung 7,78 ct/kWh, Stand Feb 2026), oder mit Speicher selbst genutzt. Ohne Speicher liegt der Eigenverbrauchsanteil typischerweise bei 25–35 %.
```

---

## Test-Liste für Live-Verifikation

URLs: `https://www.rechenfix.de/wohnen/<slug>`

### dachflaechen-rechner *(nach P2.1-Fix)*
| # | Inputs | Soll |
|---|---|---|
| B1 | Satteldach 10 × 8 m · 35° Neigung | Sparrenlänge 4,88 m · Fläche 97,7 m² |
| B2 | PV-Potenzial-Anzeige bei B1 (falls Feature aktiv) | ~12 kWp · ~10.200 kWh/Jahr (statt 11.400) |
| B3 | Walmdach 10 × 8 m · 30° Neigung | Fläche = 80 / cos(30°) = 92,4 m² |

### poolkosten-rechner *(nach P3.1–P3.3-Fix)*
| # | Inputs | Soll |
|---|---|---|
| B4 | 40 m³ · ohne Heizung · mit Abdeckung · Mai–Sep | Wasser 190 € · Filterstrom 270 € · Chemie 325 € · Wartung 410 € · **Gesamt ≈ 1.195 €** |

### nebenkosten-rechner *(nach P2.2-Fix)*
| # | Inputs | Soll |
|---|---|---|
| B5 | Erklärtext zeigt aktualisierten Mieterbund-Wert | (Wert nach Karstens Quellen-Verifikation) |

### Plausibilitäts-Tests (kein Code-Eingriff erwartet, nur Bestätigung)

| # | Rechner | Test |
|---|---|---|
| B6 | stromkosten | 2.500 kWh × 37 ct + 12 € × 12 = 1.069 € ✓ |
| B7 | mietrechner | 850 € / 2.500 € × 100 = 34 % ✓ (Warnung: über 30%) |
| B8 | quadratmeter | Rechteck 5 × 4 = 20 m² · Kreis r=3 = 28,27 m² · L-Form 5×3 + 3×2 = 21 m² |
| B9 | tapetenbedarf | 18 m × 2,5 m · 0,53 × 10,05 · 10 % Verschnitt → 10 Rollen ✓ |
| B10 | malerkosten | 5×4×2,5 m · 1 Fenster · 1 Tür · 2 Anstriche → 61,5 m² · 19 l ✓ |
| B11 | energiekosten | PC 200 W × 6 h × 5 d × 52 / 1000 = 312 kWh × 37 ct = 115,44 € ✓ |
| B12 | fliesenbedarf | 7,5 m² · 30×60 cm · gerade · 5 % → 44 Fliesen ✓ |
| B13 | laminat | 20 m² · 2,49 m²/Paket · gerade 10 % → 9 Pakete ✓ |
| B14 | beton | 3 × 2 × 0,15 m + 10 % → 0,99 m³ · 83 Säcke (25 kg) ✓ |
| B15 | estrich | 20 m² × 50 mm Zementestrich → 1,0 m³ · 2.000 kg · 53 Säcke (40 kg) ✓ |

---

## Empfehlung Folge-Prompt 148

Schmaler Scope, da nur 1× P2.1 mit Code-Implikation, der Rest ist Erklärtext-Patches:

```
Prompt 148 — Welle 2 Stufe 3 Wohnen Block B

Lies welle-2-stufe-3-wohnen-block-b.md vollständig durch.
Lies CLAUDE.md und /mnt/skills/user/rechner-builder/SKILL.md.

Reihenfolge:
1. P2.1 (dachflaechen-rechner): Erklärtext + FAQ auf 850 kWh/kWp und Mertens-Konsistenz angleichen. Falls dachflaechen-rechner-Component eine eigene PV-Ertrags-Berechnung hat: Migration auf pv-ertragsmodell.ts SSOT (berechneSpezifischenErtrag) statt hardcodierter 950.
2. P2.2 (nebenkosten-rechner): Mieterbund-Wert verifizieren — VOR der Änderung bitte Karsten kurz fragen, welcher Wert (mit/ohne Heizkosten, welcher Stand) gewünscht ist. Kein Auto-Fix ohne Quellen-Bestätigung.
3. P3.1–P3.3 (poolkosten-rechner): Beispiel-Werte (Filterstrom, Chemie, Gesamt) angleichen + Pumpenlaufzeit-Inkonsistenz auflösen.
4. P3.4 (dachflaechen-rechner): Walmdach-Begriff "Näherung" entfernen.
5. P3.5 (dachflaechen-rechner): Eigenverbrauch-Hinweis bei PV-Beispielrechnung ergänzen.

npm run build (Slug-Drift-Scan + Build).
Verify-Test scripts/verify-wohnen-block-b.ts (analog scripts/verify-wohnen-p1.ts) — Mindest-Tests:
- 950 kWh/kWp existiert NICHT mehr in wohnen.ts
- "Näherung" existiert NICHT mehr im dachflaechen-Erklärtext
- poolkosten-Beispiel-Filterstrom = 270 € (nicht 220 €)

Live-Verifikation B1–B15 durch Karsten in Inkognito.
```

---

## Notizen

- **mietrechner** ist mathematisch trivial (Drei-Punkte-Rechnung). Mietpreise im Erklärtext (München 18–22 €/m², Berlin 12–16 €/m²) sind plausibel-konservativ für 2026, aber im aktuellen Wohnungsmarkt eher am unteren Ende der Realität. Keine Empfehlung zur Aktualisierung — Werte sind als „Durchschnitte" formuliert, nicht als „Höchstpreise". Welle 3 könnte das systematischer betrachten.

- **Verschnitt-Konsistenz:** Fliesen verwendet 5/10/15 % (gerade/Drittelverband/diagonal), Laminat 10/15/20 % (gerade/diagonal/Fischgrät). Differenz ist sachlich begründet (Laminat-Dielen sind länglicher → höhere Reststück-Verlust-Wahrscheinlichkeit). Kein Bug.

- **Validation-Layer-Befunde sind aus dem Scope ausgeklammert.** Würden in Welle 3 (Validation-Sweep) systematisch behandelt.

- **Bonus-Notiz für Welle 3:** Beim Lesen der `wohnen.ts` ist mir aufgefallen, dass die meisten Mengen-Rechner kein Wartungs-Datum im Konfig tragen. Das könnte für die Welle-3-Aktualitätsprüfung hilfreich sein (z. B. `lastVerifiedDate: '2026-04-25'`). Nicht in Block-B-Scope.
