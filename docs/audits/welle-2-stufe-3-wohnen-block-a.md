# Welle 2 Stufe 3 — Wohnen Block A (rechtssensitiv)

**Audit-Bericht | Stand: 25. April 2026 | Methodik: 4-Punkt-Audit (Formel/Rechtsquelle, Input-Validierung, Edge Cases, SSOT)**

Scope: 12 rechtssensitive bzw. finanzmathematisch tiefe Rechner der Kategorie Wohnen — verifiziert gegen Primärquellen (Bundesnetzagentur, Bundestag-Drucksachen, Destatis, KfW, BDEW, Landesfinanzministerien-Übersicht DIA, BGB).

---

## Executive Summary

- **3 P1-Befunde** (Faktenfehler / veraltete Default-Werte mit unmittelbarer Rechen-Konsequenz)
- **4 P2-Befunde** (substantielle Aktualisierungen / fehlende SSOT)
- **6 P3-Befunde** (didaktische / juristische Präzisierung)
- **2 Features** (sinnvolle Ergänzungen)

Schwerpunkt: PV-Einspeisevergütung 2 Jahre veraltet, GrESt-Sätze brauchen Verifikation gegen DIA-2026-Tabelle (insb. Bremen, Sachsen, Thüringen), Strompreis-SSOT fehlt systemweit. Mietpreisbremse-Verlängerung bis 2029 nicht reflektiert.

---

## P1 — Kritische Befunde

### P1.1 — photovoltaik-rechner: Einspeisevergütung 2 Jahre veraltet

**Ist-Stand im Konfig** (`erklaerung` und vermutlich Default-Werte im Rechner):
- bis 10 kWp Teileinspeisung: **8,03 ct/kWh**
- 10–40 kWp Teileinspeisung: **6,95 ct/kWh**

**Soll-Stand** für Inbetriebnahme **01.02.2026 – 31.07.2026** (Bundesnetzagentur):
- bis 10 kWp Teileinspeisung: **7,78 ct/kWh** (anzulegender Wert 8,18; § 53 Abs. 1 EEG: Vergütung = aWert − 0,4)
- bis 10 kWp Volleinspeisung: **12,34 ct/kWh** (anzulegender Wert 12,74)
- 10–40 kWp Teileinspeisung: **6,73 ct/kWh** (anzulegender Wert 7,13)
- 10–40 kWp Volleinspeisung: **10,35 ct/kWh** (anzulegender Wert 10,75)
- 40–100 kWp Teileinspeisung: **5,50 ct/kWh** (anzulegender Wert 5,90)

Die Werte 8,03 / 6,95 ct/kWh galten 01.02.2024 – 31.07.2024. Seither vier halbjährliche Degressionen je 1 % nicht nachgezogen.

**Ab 01.08.2026** voraussichtlich erneut −1 % (ca. 7,71 / 6,67 ct/kWh, Quelle: § 49 EEG 2023).

**Empfehlung:** SSOT `lib/parameter/eeg-einspeiseverguetung.ts` nach gleichem Muster wie `mindestlohn.ts` mit Halbjahres-Schaltern:
- 01.02.2026 – 31.07.2026: 7,78 / 6,73 ct/kWh
- 01.08.2026 – 31.01.2027: 7,71 / 6,67 ct/kWh (planmäßige Degression, vor BNetzA-Bekanntgabe als prognostiziert kennzeichnen)

**Rechtsquelle:** Bundesnetzagentur, EEG-Förderung und -Fördersätze (laufend aktualisiert) · BSW-Solarwirtschaft Vergütungssätze-Übersicht Juli 2025.

### P1.2 — baufinanzierung-rechner: Sachen-Faktenfehler im Erklärtext

**Ist-Stand** (`erklaerung`, Zeile 266):
> „Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5% (Bayern, Sachsen) und 6,5% (NRW, Brandenburg, Saarland, Schleswig-Holstein)."

**Soll-Stand:** Sachsen ist seit **01.01.2023** bei **5,5 %** (Klausurtagungsbeschluss Radebeul Juni 2022, Steigerung +57 %). Nur Bayern ist 2026 noch bei 3,5 %.

**Empfehlung:** „Bayern, Sachsen" → „Bayern". Korrekt: „… zwischen 3,5 % (Bayern) und 6,5 % (Brandenburg, NRW, Saarland, Schleswig-Holstein)."

**Rechtsquelle:** DIA-Übersicht 2026 (basierend auf Landesfinanzministerien) · Sächsisches GrEStG.

### P1.3 — grunderwerbsteuer-rechner: SSOT-Werte gegen 2026-Tabelle verifizieren

Live-Verifikation erforderlich — Soll-Werte für 2026 aus DIA-Tabelle (Stand 23.03.2026):

| Bundesland | Soll-Satz 2026 | Letzte Änderung |
|---|---|---|
| Baden-Württemberg | 5,00 % | unverändert |
| Bayern | 3,50 % | unverändert seit 2006 |
| Berlin | 6,00 % | unverändert |
| Brandenburg | 6,50 % | unverändert |
| **Bremen** | **5,50 %** | **erhöht zum 01.07.2025** (vorher 5,00 %) |
| Hamburg | 5,50 % | erhöht 01.01.2023 (vorher 4,50 %) |
| Hessen | 6,00 % | unverändert |
| Mecklenburg-Vorpommern | 6,00 % | erhöht 01.01.2020 (vorher 5,00 %) |
| Niedersachsen | 5,00 % | unverändert |
| Nordrhein-Westfalen | 6,50 % | unverändert |
| Rheinland-Pfalz | 5,00 % | unverändert |
| Saarland | 6,50 % | unverändert |
| **Sachsen** | **5,50 %** | **erhöht 01.01.2023** (vorher 3,50 %) |
| Sachsen-Anhalt | 5,00 % | unverändert |
| Schleswig-Holstein | 6,50 % | unverändert |
| **Thüringen** | **5,00 %** | **gesenkt 01.01.2024** (vorher 6,50 %) |

**Wenn ein dieser drei Werte (Bremen, Sachsen, Thüringen) im Rechner-SSOT noch alt steht → P1**, sonst nur Erklärtext-Aktualisierung (P2.3).

**Rechtsquelle:** DIA — Grunderwerbsteuer 2026 je Bundesland (kapitalanlageimmobilien.net, aktualisiert 23.03.2026) · Quervergleich handwerk.cloud (16.02.2026), kaufodermieten.de (15.03.2026).

---

## P2 — Wichtige Aktualisierungen

### P2.1 — Strompreis-Inkonsistenz systemweit (SSOT fehlt)

**Ist-Stand:**
- 36 ct/kWh: stromkosten-rechner, heizkosten-rechner (Wärmepumpenstrom)
- 32 ct/kWh: stromvergleich-rechner, photovoltaik-rechner, balkon-solar-rechner, energiekosten-rechner

**Soll-Stand 2026** (BDEW-Strompreisanalyse, Stand April 2026):
- BDEW-Durchschnitt aller Tarife: **37,0 – 37,2 ct/kWh** (Bestandstarife + Grundversorgung + Neukunden)
- Festpreis-Neukundentarife (Verivox/Check24): **33,5 ct/kWh**
- Günstigste dynamische Tarife: ~23 ct/kWh
- Grundversorgung: **39,8 ct/kWh** (Arbeitspreis)

**Empfehlung:** SSOT `lib/parameter/strompreis.ts`:
```typescript
export const STROMPREIS_2026 = {
  durchschnitt_bdew: 37,    // BDEW-Mittel, für Bestandsrechnungen
  neukunden_festpreis: 33,  // typischer Festpreis-Neuvertrag
  grundversorgung: 40,      // Worst-Case-Annahme
};
```
Empfohlene Defaults pro Rechner:
- stromkosten-, energiekosten-, nebenkosten-rechner: **37 ct/kWh** (Realistik bei Bestandstarifen)
- stromvergleich-rechner: **37 ct/kWh** als „aktueller Tarif", **30 ct/kWh** als „Vergleichstarif"
- photovoltaik-, balkon-solar-rechner (Eigenverbrauchs-Substitution): **33 ct/kWh** (Neukunden-Festpreis als realistischer Grenzwert)

**Rechtsquelle:** BDEW-Strompreisanalyse 04/2026 · Finanztip, ADAC Strompreisartikel 04/2026.

### P2.2 — mietpreisbremse-rechner: Verlängerung 2029 fehlt

**Ist-Stand** (Erklärtext): vage Formulierung *„für die Jahre ab 2026 bleibt die Mietpreisbremse weiterhin gültig"*

**Soll-Stand:** Bundestag hat am **26. Juni 2025** mit Stimmen von CDU/CSU, SPD, Grünen die Verlängerung des § 556d Abs. 2 Satz 4 BGB **bis 31.12.2029** beschlossen (BT-Drs. 21/322 i.d.F. 21/631). Bundesrat hat am **11. Juli 2025** zugestimmt.

Konkrete Änderung: Streichung der bisherigen Fünfjahresfrist für Landesverordnungen + Verschiebung des Außerkrafttretens vom 31.12.2025 auf 31.12.2029. 10-%-Grenze und Ausnahmen (§§ 556e, 556f BGB) bleiben unverändert.

**Empfehlung:** Erklärtext-Aktualisierung mit konkretem Datum + Hinweis auf BT-Drs. Auch Hinweis: Koalitionsvertrag plant strengere Indexmiete-Regeln (relevant auch für indexmiete-rechner).

**Rechtsquelle:** BT-Drs. 21/322, 21/631 · Bundestag-Pressemitteilung 26.06.2025 · Bundesrat-Empfehlung 11.07.2025.

### P2.3 — grunderwerbsteuer-rechner: Erklärtext stark veraltet

**Ist-Stand** (`erklaerung`, Zeile 224):
> „Bayern ist mit 3,5% das günstigste Bundesland. Die teuersten Bundesländer mit 6,5% sind Brandenburg, NRW, Saarland und Schleswig-Holstein."

Stimmt für 2026, aber:
- Bremen-Erhöhung (01.07.2025: 5,0 → 5,5 %) fehlt
- Sachsen-Erhöhung (01.01.2023: 3,5 → 5,5 %) fehlt
- Thüringen-Senkung (01.01.2024: 6,5 → 5,0 %, einzige Senkung in der GrESt-Geschichte) fehlt
- Bremen wird in der Aufzählung nicht erwähnt

**Empfehlung:** Erklärtext um Abschnitt „Aktuelle Änderungen 2024/2025" erweitern; Tabelle mit allen 16 Bundesländern in Konfig-Erklärung referenzieren.

### P2.4 — vorfaelligkeitsentschaedigung-rechner: Beispiel-Begriffsfehler

**Ist-Stand** (`beispiel`, Zeile 1121):
> „Restschuld 150.000 €, Vertragszins 2,5 %, Marktzins 3,5 %, Restlaufzeit 5 Jahre → **Zinsmarge 0 %**, keine VFE."

**Soll-Stand:** Zinsmarge laut der eigenen Formel (`Zinsmarge = Vertragszins − Marktzins`) ist **2,5 − 3,5 = −1 %** (negativ). Folgekonsequenz „keine VFE" ist korrekt, aber Begriff falsch.

**Empfehlung:**
> „… → Zinsmarge **−1 %** (Marktzins über Vertragszins → kein Zinsschaden, keine VFE)."

---

## P3 — Präzisierungen

### P3.1 — photovoltaik-rechner & balkon-solar-rechner: Solarpaket I direkt nennen

Beide Rechner profitieren von Klarstellung, dass das **Solarpaket I (Inkrafttreten 16.05.2024)** Grundlage ist für: 800-W-Grenze, vereinfachte MaStR-Anmeldung, privilegierte bauliche Veränderung. Aktuell impliziert.

### P3.2 — balkon-solar-rechner: Juristische Trennung Mieter vs. WEG

**Ist-Stand:** *„Mieter dürfen Balkonkraftwerke installieren — seit 2024 hat der Vermieter kein Vetorecht mehr (privilegierte bauliche Veränderung nach WEG-Reform)."*

**Soll-Stand:** Trennen:
- **Wohnungseigentümer (WEG):** § 20 Abs. 2 Nr. 5 WEG → privilegierte bauliche Veränderung
- **Mieter:** § 554 BGB → Anspruch auf Zustimmung des Vermieters

Beide eingeführt durch das Solarpaket I 16.05.2024.

### P3.3 — waermepumpen-rechner: Förderung präziser

**Ist-Stand** (`beispiel`, Zeile 653): *„30.000 € Anschaffung / 30 % Förderung = 21.000 € netto"* — ergibt rechnerisch nicht 21.000 € (es wären 21.000 € bei 70 %, nicht 30 %). Wahrscheinlich Beispiel mit Maximalförderung gemeint.

**Soll-Stand** (KfW 458, Stand 04/2026):
- Grundförderung 30 %
- Klimageschwindigkeitsbonus 20 % (beim Tausch alte fossile Heizung; Absenkung ab 2029)
- Einkommensbonus 30 % (Haushaltseinkommen < 40.000 €)
- Effizienzbonus 5 % (natürliche Kältemittel oder Wasser/Erdreich/Abwasser)
- Maximalförderung **70 %**, max. 21.000 € (bei 30.000 € förderfähigen Kosten/Wohneinheit)

**Empfehlung:** Beispiel-Text klar machen, dass die 21.000 € nur mit Bonus-Kombi erreicht werden. Ggf. Boni-Schalter im Rechner ergänzen (Feature F1).

### P3.4 — waermepumpen-rechner: Lautstärkeanforderungen 2026

**Soll-Stand:** Seit **01.01.2026** werden Luft-Wasser-Wärmepumpen nur noch gefördert, wenn Geräuschemissionen mindestens **10 dB unter** den gesetzlichen Grenzwerten liegen (vorher 5 dB). Gilt nur für Bestandsgebäude. Hinweis im Erklärtext sinnvoll.

### P3.5 — energiekosten-rechner: Kühlschrank-Beispiel didaktisch missverständlich

**Ist-Stand** (`beispiel`): *„Kühlschrank: 150 W × 24 h × 7 Tage × 52 / 1000 = 1.310 kWh/Jahr"*

Mathematisch korrekt, aber **150 W als Dauer-Volllast** ist unrealistisch. Moderne Kühlschränke laufen mit Compressor-Cycling bei effektiv ca. 30–50 W. Realer Jahresverbrauch eines A++-Kühlschranks: 100–250 kWh/Jahr.

**Empfehlung:** Beispiel mit realistischem Verbraucher (z. B. PC: 200 W × 4 h × 5 Tage × 52 / 1000 = 208 kWh/Jahr). Optional: Hinweis auf Cycling im Erklärtext.

### P3.6 — indexmiete-rechner: VPI-Beispielwert

Im `beispiel` und `erklaerung` wird VPI 127,8 als „aktueller Wert" genannt. Tatsächlicher VPI März 2026 liegt bei ca. **125–126 Punkten** (Basisjahr 2020 = 100; Jahresdurchschnitt 2025 ca. 124,6; Inflationsrate März 2026 +2,7 % Vorjahresvergleich).

127,8 ist eher Stand Ende 2026 / Anfang 2027 plausibel.

**Empfehlung:** Beispielwert auf 125,8 oder 126,0 anpassen. Kein Bug der Rechen-Logik — nur Aktualität des Beispiels.

---

## Features (nice-to-have)

### F1 — waermepumpen-rechner: Boni-Schalter

Toggle-Inputs für: Heizungstausch (alte fossile Heizung), Einkommen < 40.000 €, natürliches Kältemittel/Erdwärme. Auswirkung auf Förderquote dynamisch berechnen (Cap bei 70 %).

### F2 — grunderwerbsteuer-rechner: Hessengeld-Hinweis

Bei Auswahl Bundesland = Hessen Info-Card mit Hessengeld-Förderung anzeigen: bis zu 10.000 € je erwachsenem Käufer + 5.000 € pro Kind, gilt für Erst-Erwerb selbstgenutzten Wohneigentums (aktiv seit September 2024).

---

## Test-Liste für Live-Verifikation

URLs: `https://www.rechenfix.de/wohnen/<slug>` — Karsten verifiziert in Inkognito.

### grunderwerbsteuer-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 1 | Bayern, 400.000 € | GrESt 14.000 € |
| 2 | NRW, 400.000 € | GrESt 26.000 € |
| 3 | **Bremen**, 300.000 € | GrESt **16.500 €** (5,5 %) |
| 4 | **Sachsen**, 300.000 € | GrESt **16.500 €** (5,5 %) |
| 5 | **Thüringen**, 300.000 € | GrESt **15.000 €** (5,0 %) |

### baufinanzierung-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 6 | KP 350.000 € · NRW · EK 70.000 € · 3,5 % Zins · 2 % Tilg. · 15 J. ZB | Nebenkosten 42.245 € · Darlehen 322.245 € · Rate 1.477,29 €/Mon. |
| 7 | KP 500.000 € · Bayern · EK 100.000 € · 3,8 % Zins · 2,5 % Tilg. · 10 J. ZB | Nebenkosten 27.850 € (5,57 %) · Darlehen 427.850 € · Rate 2.246 €/Mon. |

### photovoltaik-rechner *(nach P1.1-Fix)*
| # | Inputs | Soll-Wert |
|---|---|---|
| 8 | 8 kWp · Süd · 30° · Eigenverbrauch 30 % · Strompreis 33 ct · Vergütung 7,78 ct | Ertrag 7.600 kWh · EV-Ersparnis 752,40 € · Einspeisung 413,90 € · Erlös 1.166,30 € |
| 9 | 15 kWp · Süd · 30° · Eigenverbrauch 25 % · Strompreis 33 ct · Vergütung 7,78 + 6,73 ct | Ertrag 14.250 kWh · gemischte Vergütung |

### balkon-solar-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 10 | 800 W · Süd · Aufständerung · Strompreis 33 ct · EV 30 % | Ertrag 684 kWh · EV 205 kWh × 33 ct = 67,65 € |

### mietpreisbremse-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 11 | Vergleich 10 €/m² · Ist 12 €/m² · 65 m² | Max 11 €/m² = 715 € · Ist 780 € · Differenz 65 €/Mon. = 780 €/Jahr |

### indexmiete-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 12 | Kaltmiete 800 € · VPI alt 117,4 · VPI neu 125,8 | Steigerung 7,16 % · neue Miete 857,21 € · +57,21 €/Mon. |

### vorfaelligkeitsentschaedigung-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 13 | Restschuld 150.000 € · Vertragszins 4,0 % · Marktzins 2,5 % · Restlaufzeit 5 J. | Zinsmarge 1,5 % · VFE 9.562,50 € + 300 € Gebühr = **9.862,50 €** |
| 14 | Restschuld 150.000 € · Vertragszins 2,5 % · Marktzins 3,5 % · Restlaufzeit 5 J. | Zinsmarge **−1 %** → **keine VFE** |

### waermepumpen-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 15 | 120 m² Altbau teilsaniert · JAZ 3,0 · Gas 2.000 €/J · Anschaffung 30.000 € · 30 % Förderung | Heizwärmebedarf ~19.500 kWh · WP-Stromkosten ~2.080 € + 200 € · netto 21.000 € · Amortisation ~10–15 J. |
| 16 | 100 m² Altbau · JAZ 2,8 · 30.000 € · **70 % Förderung** | Netto **9.000 €** · ca. 5–8 J. Amortisation |

### grundsteuer-rechner
| # | Inputs | Soll-Wert |
|---|---|---|
| 17 | Bundesmodell · ETW 120 m² Wohnfl. · 400 m² Grundst. · Bodenrichtwert 200 €/m² · Bj. 1990 · Hebesatz 500 % | ~250 €/Jahr (Beispiel im Konfig) |
| 18 | Bayern Flächenmodell · 120 m² · 400 m² · Hebesatz 500 % | Äquivalenz 76 € × 500 % = 380 € (Wohnabschlag 30 % anwenden) |

### nebenkosten-rechner / mietrechner / mietrendite-rechner / heizkosten-rechner / stromvergleich-rechner
Standard-Plausibilitätstests (Karstens 4-Punkt-Pattern). Keine spezifischen rechtsquellen-getriebenen Befunde — Validation-Layer nach Welle-2-Standard-Audit.

---

## Empfehlung neue/aktualisierte SSOT-Dateien

| Datei | Zweck | Schalter |
|---|---|---|
| `lib/parameter/strompreis.ts` | Zentral für alle Strompreis-Defaults | jährlich, BDEW-Update |
| `lib/parameter/eeg-einspeiseverguetung.ts` | PV-Vergütungssätze | halbjährlich (1.2. / 1.8.), § 49 EEG |
| `lib/parameter/grunderwerbsteuer.ts` | 16 Bundesländer | bei Landesgesetz-Änderung (manuell) |
| `lib/parameter/beg-foerderung.ts` | Wärmepumpen-Boni | bei BEG-Richtlinie-Update |
| `lib/parameter/vpi.ts` | aktueller VPI für Indexmiete-Beispiel | monatlich (Destatis) |

Pattern: gleiches Schema wie `mindestlohn.ts` mit Datums-Schaltern, getypten Konstanten und `getXxx(date: Date)`-Helper.

---

## Quellen-Anhang (Stand 25.04.2026)

| Thema | Primärquelle | Stand |
|---|---|---|
| GrESt-Sätze 2026 | DIA-Tabelle (kapitalanlageimmobilien.net) | 23.03.2026 |
| GrESt Bremen-Erhöhung | mehrwertsteuerrechner.de · GrEStG Bremen | 01.07.2025 |
| EEG-Einspeisevergütung | Bundesnetzagentur EEG-Förderung & -Fördersätze · BSW-Solarwirtschaft Übersicht | 04/2026 |
| Solarpaket I | Bundesnetzagentur · § 22, 48, 49, 100 EEG 2023 | Inkrafttreten 16.05.2024 |
| Mietpreisbremse-Verlängerung | BT-Drs. 21/322 i.d.F. 21/631 · Bundesrat-Empfehlung 11.07.2025 | bis 31.12.2029 |
| BEG-Förderung WP | KfW Merkblatt 458 · BEG EM Richtlinie 29.12.2023 | KfW-Stand 04/2026 |
| Strompreis 2026 | BDEW-Strompreisanalyse | 04/2026 |
| VPI | Destatis Pressemitteilung PD26_127_611 | 10.04.2026 (März 2026) |
| Mietpreisbremse Rechtsgrundlage | § 556d BGB | aktuell |
| VFE Rechtsgrundlage | § 490 Abs. 2 BGB · BGH XI ZR 388/14 · Sonderkündigungsrecht § 489 BGB | aktuell |

---

## Vorschlag Folge-Prompt für Claude Code

```
Prompt 147 — Welle 2 Stufe 3 Wohnen Block A (rechtssensitiv)

Lies welle-2-stufe-3-wohnen-block-a.md vollständig durch (alle Detailsektionen, kein Reconstruct aus Highlights).
Lies CLAUDE.md und /mnt/skills/user/rechner-builder/SKILL.md.

Reihenfolge:
1. P1.1 + P1.2 + P1.3 (Faktenfehler + veraltete SSOT) — höchste Priorität.
2. SSOT-Dateien neu anlegen: lib/parameter/strompreis.ts, eeg-einspeiseverguetung.ts, grunderwerbsteuer.ts, beg-foerderung.ts (P2.1).
3. P2.2 + P2.3 + P2.4 (Erklärtext-Aktualisierungen).
4. P3.1–P3.6 (Präzisierungen).
5. F1 + F2 (Features) — optional in eigenem Folge-Commit.

Nach jeder Änderung npm run build (Slug-Drift-Scan + Build).
Live-Tests aus der Test-Liste (1–18) NACH Deployment durch Karsten in Inkognito.
```
