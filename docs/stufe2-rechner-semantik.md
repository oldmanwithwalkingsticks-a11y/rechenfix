# Stufe 2 — Eingabefeld-Semantik der SV-Rechner

Erstellt am 2026-04-19 zur Vorbereitung des manuellen Stufe-2-Audits (Welle 1, Sozialversicherung).
Keine Code-Änderungen — reine Bestandsaufnahme.

## Übersicht

| Rechner | Eingabefelder (Label) | Semantik | Interne Abzüge / Kappungen | Lib-Nutzung |
|---|---|---|---|---|
| **Rente** | Alter, Renteneintritt 63/65/66/67, Monatsbrutto, Beitragsjahre, bekannte EP (optional), Gehaltssteigerung %, gewünschtes Netto | Monatsbrutto = reines Lohn-Brutto, wird mit BBG gedeckelt | BBG RV **101.400 €/Jahr**, keine WK-/SA-/SV-Abzüge vor EP-Rechnung | `lib/berechnungen/rente.ts` mit `RENTENWERT = getAktuellerRentenwert()` (zentral, Stichtag 01.07.2026); Netto-Schätzung über **eigene** ESt-Näherung (14–42 % linear) + **hartcodierte 10,85 %** SV |
| **Arbeitslosengeld I** | Letztes Monatsbrutto, Steuerklasse I–VI, mit/ohne Kind, Alter, Beschäftigungsdauer 12–48 M., Kirchensteuer | Monatsbrutto = reines SV-Brutto, BBG-gedeckelt | BBG **8.450 €/M** aus zentraler Lib, SV-Pauschale **21 %** (§ 153 SGB III), keine WK/SA | `berechneEStGrund(zvE, 2026)` aus `einkommensteuer.ts` ✓ + eigene Steuerklassen-Faktoren (SK III: Splittingtarif, SK V/VI: ×1,15) |
| **Krankengeld** | Monatliches Bruttogehalt, monatliches Nettogehalt (beides Pflicht!), Kinder ja/nein, gesetzlich/privat | Brutto + Netto beide Nutzer-Eingabe; **kein Brutto→Netto-Zwischenschritt** | BBG_MONAT **5.812,50 €** (hartcodiert, nicht aus Lib); SV-Abzug pauschal **6,15 %** (kinderlos 6,45 %) auf das KG selbst | Keine — eigene min(70 % Brutto, 90 % Netto) + eigene SV-Abzüge |
| **Witwenrente** | Art (groß/klein), Rente des Verstorbenen, eigenes Nettoeinkommen, Kinder unter 18, Toggle "Neues Recht" | Rente-Eingabe = Monatsrente in €, Netto = Monatseinkommen der Witwe | Freibetrag 26,4 × Rentenwert + 5,6 × Rentenwert × Kinder; Anrechnung 40 % auf Überhang | Keine Lib — **hartcodiert `RENTENWERT_2026 = 39.32 €`** (Stand 2024!) statt aus `rente.ts` |
| **Rentenpunkte** | — | — | — | **Nicht als Standalone** — in RentenRechner integriert (Output "Gesamte Rentenpunkte", Durchschnittsentgelt 51.944 € hartcodiert in `rente.ts`) |
| **PV-Beitrag** | — | — | — | **Nicht als Standalone** — `PflegegeldRechner` handelt Pflegeleistungen (Pflegegrade 1–5), keine Beitragsrechnung. PV-AN-Anteil 1,8 %/2,4 %/Kinderstaffel wird in `BruttoNettoRechner` berücksichtigt |

## Details pro Rechner

### 1. Rentenrechner

- **Datei:** [components/rechner/RentenRechner.tsx](components/rechner/RentenRechner.tsx)
- **Lib:** [lib/berechnungen/rente.ts](lib/berechnungen/rente.ts)
- **Eingabefelder (Defaults):**
  - Aktuelles Alter — Default 35
  - Gewünschtes Renteneintrittsalter — Select 63/65/66/67, Default 67
  - Aktuelles Monatsbrutto — Default 3.500 €
  - Bisherige Beitragsjahre — Default 15
  - Bereits gesammelte Rentenpunkte (optional, sonst geschätzt)
  - Erwartete Gehaltssteigerung — Default 1,5 %
  - Gewünschtes Netto-Einkommen im Alter — Default 2.000 €
- **Semantik:** "Monatsbrutto" = das rohe Lohnbrutto. Jahresbrutto = Monatsbrutto × 12. Für die EP-Rechnung wird direkt `min(Jahresbrutto, BBG_RV) / Durchschnittsentgelt` genommen — **keine Pauschalen-Abzüge**.
- **Interne Abzüge / Kappungen:**
  - BBG RV 2026 **101.400 €/Jahr** (hartcodiert [rente.ts:52](lib/berechnungen/rente.ts:52))
  - Durchschnittsentgelt **51.944 €** (vorläufig 2026, hartcodiert [rente.ts:51](lib/berechnungen/rente.ts:51))
  - Regelaltersgrenze 67 Jahre
  - Keine WK-/SA-/SV-Abzüge vor EP-Rechnung (SV-Brutto vs. ESt-Brutto ist in der EP-Formel nicht relevant — korrekt)
- **Lib-Nutzung:**
  - `RENTENWERT = getAktuellerRentenwert()` aus zentralem `rente.ts` ✓ (40,79 € bis 30.06.2026, 42,52 € ab 01.07.2026)
  - `berechneEStGrund`/`berechneSoli`/`berechneBruttoNetto` werden **nicht** genutzt — stattdessen **eigene lineare ESt-Näherung** (14 % bei 0 bis 24 % bei 17.000 €, 24 % bis 42 % bis 65.000 €, darüber 42 %) in [rente.ts:107–118](lib/berechnungen/rente.ts:107)
  - SV für Rentner hartcodiert **10,85 %** (8,15 KV + 1,7 PV + 1 % Zusatz) in [rente.ts:121](lib/berechnungen/rente.ts:121)
- **Pipeline:** Monatsbrutto × 12 → `min(BBG_RV_JAHR)` → ÷ Durchschnittsentgelt = EP/Jahr → × Beitragsjahre + Zukunftsprognose mit Steigerung → Gesamte EP → × RENTENWERT → Abschlag (0,3 %/Monat, gekappt bei 14,4 %) = Brutto-Rente → eigene Steuer-/SV-Näherung → Netto-Rente → Rentenlücke + Sparrate
- **Stichtag-Switch:** `RENTENWERT` ist tagesaktuell (`getAktuellerRentenwert()`), UI zeigt nach Prompt 93 den blauen Hinweis-Block mit "Ab 01.07.2026: 42,52 €" — verschwindet automatisch nach Stichtag ✓
- **Auffälligkeiten:**
  - Eigene ESt-Näherung (Punkt-zu-Punkt-Interpolation) statt zentrale `berechneEStGrund` — für den finalen Netto-Wert. Kein Bug im strengen Sinn, aber Abweichung vom SSOT-Prinzip.
  - 10,85 % pauschale SV-Quote ist grob: tatsächlicher KV-Zusatzbeitrag beeinflusst das, BBG greift bei hohen Renten.
  - Progression in der Zukunftsprognose: `steigerungFaktor = 1 + %/100`, dann `jahresbrutto × faktor^n` mit `n = 1..jahreBisRente` — das ist **exponentielle Steigerung**, passt. BBG-Kappung greift pro Jahr.
  - Die Ergebnis-Feldbenennung `gesamtRentenpunkte` ist sauber, Rentenpunkte-Logik selbst ist OK.

### 2. Arbeitslosengeld-Rechner

- **Datei:** [components/rechner/ArbeitslosengeldRechner.tsx](components/rechner/ArbeitslosengeldRechner.tsx)
- **Lib:** keine dedizierte `arbeitslosengeld.ts`; Logik inline in der Komponente
- **Eingabefelder (Defaults):**
  - Letztes Monatsbrutto — Default 3.500 €
  - Steuerklasse I–VI — Default I
  - Mit Kind (67 %) / Ohne Kind (60 %) — Default ohne Kind
  - Alter bei Arbeitslosmeldung — Default 40
  - Beschäftigungsdauer letzte 5 Jahre — Select 12/16/20/24/30/36/48 Monate, Default 24
  - Kirchensteuer ja/nein — Default nein
- **Semantik:** "Letztes Monatsbrutto" = SV-pflichtiges Bruttogehalt, BBG-gedeckelt. Bildet die Bemessungsgrundlage nach § 151 SGB III.
- **Interne Abzüge vor ALG-Berechnung:**
  - BBG RV Monat **8.450 €** aus `BBG_RV_MONAT` ([brutto-netto.ts:120](lib/berechnungen/brutto-netto.ts:120)) ✓
  - LSt-Monat (vereinfacht, siehe Lib-Nutzung)
  - Soli: 5,5 % wenn LSt-Monat > 1.000 € (grobe Schwelle, keine Milderungszone!)
  - KiSt: 9 % (hartcodiert, kein 8 % für BY/BW, kein Bundesland-Dropdown)
  - SV-Pauschale **21 %** nach § 153 SGB III
- **Lib-Nutzung:** `berechneEStGrund(zvE, 2026)` aus `einkommensteuer.ts` ✓ (Prompt 87 erledigt). Eigene Steuerklassen-Faktoren in [ArbeitslosengeldRechner.tsx:17–23](components/rechner/ArbeitslosengeldRechner.tsx:17):
  - SK III: `berechneEStGrund(zvE/2, 2026) × 2` (Splittingtarif) — rechtlich sauber
  - SK V: × 1,15 — grobe Näherung, nicht aus § 39b PAP
  - SK VI: × 1,15 — ebenfalls Näherung
- **Pipeline:** Brutto → `min(BBG_RV_MONAT)` → LSt-Jahr nach Stkl. → Monats-LSt/Soli/KiSt + 21 % SV-Pauschale → Leistungsentgelt = Brutto − Abzüge → × 60 %/67 % = ALG/Monat → Bezugsdauer-Tabelle nach § 147 SGB III
- **Besonderheiten:**
  - Bezugsdauer-Tabelle ([ArbeitslosengeldRechner.tsx:25–35](components/rechner/ArbeitslosengeldRechner.tsx:25)): 58+ Alter + 48 M. → 24 M.; 55+ + 36 → 18; 50+ + 30 → 15; 24 M. → 12; 20 → 10; 16 → 8; 12 → 6; sonst 0 (kein Anspruch).
  - Satz 60 % (kinderlos) / 67 % (mit Kind) nach § 149 SGB III korrekt.
- **Auffälligkeiten:**
  - Soli-Schwelle "> 1.000 € LSt-Monat" ist vereinfachung — korrekt wäre jährliche Freigrenze (20.350 €/Jahr für Grundtarif) und Milderungszone. Für ALG wird dieser Pfad aber nur als "fiktives letztes Netto" verwendet, nicht für die Leistungshöhe selbst. Die ALG-Höhe nutzt direkt 21 % SV-Pauschale — da ist das egal.
  - KiSt hartcodiert 9 %, kein Bundesland.
  - SK V-/VI-Faktor 1,15 ist aus der Prax-Luft — die tatsächlichen PAP-Multiplikatoren liegen höher (SK V ca. 1,4–1,6). Prüfen, ob das im BMF-Vergleich Auffälligkeiten bringt.

### 3. Krankengeld-Rechner

- **Datei:** [components/rechner/KrankengeldRechner.tsx](components/rechner/KrankengeldRechner.tsx)
- **Lib:** keine dedizierte `krankengeld.ts`
- **Eingabefelder (Defaults):**
  - Monatliches Bruttogehalt — Default 3.500 €
  - Monatliches Nettogehalt — Default 2.350 €
  - Kinder ja/nein — Default ja
  - Versicherung gesetzlich/privat — Default gesetzlich
- **Semantik:**
  - "Bruttogehalt" = SV-pflichtiges Monatsbrutto (BBG_MONAT-gedeckelt)
  - "Nettogehalt" = **Nutzer muss selbst eingeben**, kein Brutto→Netto-Zwischenschritt
  - Bei privater Versicherung → Hinweis-Box "kein gesetzliches KG"
- **Interne Abzüge / Kappungen:**
  - BBG KV Monat **5.812,50 €** — **hartcodiert** ([KrankengeldRechner.tsx:12](components/rechner/KrankengeldRechner.tsx:12)), nicht aus `BBG_KV_MONAT` in `brutto-netto.ts`!
  - SV-Abzug auf das KG: **6,15 %** (mit Kindern) bzw. **6,45 %** (kinderlos, +0,3 % PV-Zuschlag) — kein RV-Beitrag in der Annahme, sondern pauschal
  - Kommentar [KrankengeldRechner.tsx:30](components/rechner/KrankengeldRechner.tsx:30): "RV 4,65 + ALV 0,65 + PV 0,85 (+ 0,3 kinderlos)" → macht 6,15 % mit Kind, 6,45 % kinderlos ✓
- **Lib-Nutzung:** Keine. Reine Inline-Berechnung.
- **Pipeline:** BruttoTag = min(Brutto, BBG)/30 → **min(70 % BruttoTag, 90 % NettoTag)** = KG-Brutto-Tag → KG-Brutto × (1 − SV-Satz) = KG-Netto-Tag → × 30 = KG-Netto-Monat → Vergleich mit Netto-Monat des Nutzers
- **Besonderheiten:**
  - § 47 SGB V: Regelentgelt × 70 %, gedeckelt auf 90 % Netto ✓
  - Höchstsatz 2026: 5.812,50 × 70 % / 30 = **135,63 €/Tag** — sollte als Testfall (Brutto ≥ 5.812,50 €) prüfbar sein
- **Auffälligkeiten:**
  - **BBG-Hartcodierung:** sollte aus `brutto-netto.ts` importiert werden (SSOT-Verstoß). Aktuelle Werte zufällig gleich, aber bei nächster BBG-Anpassung Drift.
  - **RV-Beitrag** in der SV-Abzug-Annahme: KG-Bezieher zahlen RV 9,3 % (paritätisch → AN-Anteil ~4,65 %) nur, wenn sie RV-pflichtig versichert sind. Die 4,65 % im Code ist RV-AN-Anteil, aber tatsächlich zahlt die Krankenkasse einen Teil (siehe § 251 SGB V). Fachlich grobe Näherung.
  - Nutzer muss Brutto + Netto eingeben — keine Convenience, anders als andere Rechner. Kein Bug, aber bedeutet für den Audit: Testfälle müssen aus `BruttoNettoRechner` bezogene Werte nutzen, nicht Fantasie-Netto.

### 4. Witwenrente-Rechner

- **Datei:** [components/rechner/WitwenrenteRechner.tsx](components/rechner/WitwenrenteRechner.tsx)
- **Lib:** keine dedizierte — Logik vollständig inline
- **Eingabefelder (Defaults):**
  - Art "Große Witwenrente" / "Kleine Witwenrente" — Default groß
  - Rente des Verstorbenen — Default 1.500 €/M
  - Eigenes Nettoeinkommen — Default 1.800 €/M
  - Kinder unter 18 — Select 0–4, Default 0
  - Toggle "Neues Recht (Heirat nach 2001)" — Default ja
- **Semantik:**
  - "Rente des Verstorbenen" = dessen monatliche Bruttorente (bzw. dessen fiktiver Anspruch bei vorzeitigem Tod)
  - "Eigenes Nettoeinkommen" = monatliches Netto der Witwe (wird für Anrechnung über Freibetrag hinaus genutzt)
- **Interne Rechengrößen (hartcodiert lokal, [WitwenrenteRechner.tsx:13–16](components/rechner/WitwenrenteRechner.tsx:13)):**
  - `RENTENWERT_2026 = 39.32` **🚨 Falsch!** Rentenwert 2026 (ab 01.07.2025) ist **40,79 €**, ab 01.07.2026 **42,52 €**. Der Wert 39,32 € galt nur bis 30.06.2025.
  - `FREIBETRAG_FAKTOR = 26.4` × Rentenwert = Grundfreibetrag ✓
  - `KIND_FAKTOR = 5.6` × Rentenwert pro Kind ✓
  - `ANRECHNUNG = 0.40` (40 %) ✓
- **Pipeline:** Rente × 55 % (neues Recht groß) / 60 % (altes Recht) / 25 % (klein) = Grundanspruch → Freibetrag = 26,4 × 39,32 + kinder × 5,6 × 39,32 → Anrechenbar = max(0, Netto − Freibetrag) → Abzug = anrechenbar × 40 % → Auszahlung = max(0, Grundanspruch − Abzug). Sterbevierteljahr: volle Rente des Verstorbenen, 3 Monate, ohne Anrechnung.
- **Lib-Nutzung:** **Keine**. `getAktuellerRentenwert()` aus `lib/berechnungen/rente.ts` wird **nicht** importiert, obwohl vorhanden.
- **Auffälligkeiten:**
  - **🚨 P1 Rentenwert falsch:** 39,32 € statt korrekt 40,79 € (bzw. 42,52 € ab 01.07.2026). Wirkt sich auf Freibetrag aus:
    - Aktueller Code: Grundfreibetrag = 26,4 × 39,32 = **1.038,05 €/M**
    - Korrekt aktuell: 26,4 × 40,79 = **1.076,86 €/M** (rund 1.076–1.077 €, deckt sich mit der Audit-Vorgabe)
    - Ab 01.07.2026: 26,4 × 42,52 = **1.122,53 €/M**
  - **SSOT-Verstoß:** Ignoriert `rente.ts`-Export. Gleicher Fehlerklasse wie die ESt-Duplikate in Prompt 94 (Splitting/Kindergeld/Abfindung), die inzwischen konsolidiert wurden.
  - Effekt des Bugs: Freibetrag zu niedrig → Anrechnung zu hoch → Auszahlung zu niedrig. Systematischer Nachteil für Witwen gegenüber DRV-Referenzwert. Bei Default-Input (Rente 1.500, Netto 1.800, 0 Kinder): aktuell anrechenbar = 1.800 − 1.038,05 = 761,95 € → Abzug 304,78 → Auszahlung 825 − 304,78 = 520,22 €. Korrekt mit 40,79: anrechenbar = 723,14 € → Abzug 289,26 → Auszahlung 535,74 €. Differenz ~15,50 € pro Monat zu Ungunsten der Witwe.
  - Kinderfreibetrag-Formel "× Kinder × 5,6 × Rentenwert" entspricht § 97 SGB VI + Anlage 1 — fachlich OK.
  - Disclaimer-Text erwähnt "aktueller Rentenwert 2026 (39,32 €)" — doppelt falsch (weder 2026 noch aktuell).

### 5. Rentenpunkte-Rechner

**Nicht als eigenständiger Rechner vorhanden.**

Rentenpunkte werden im `RentenRechner` als Teil des Ergebnisses ausgegeben (`gesamtRentenpunkte`, `bisherigeRentenpunkte`, `zukuenftigeRentenpunkte`). Wer nur die EP/Jahr-Rechnung wissen will (`Brutto × 12 / Durchschnittsentgelt`), nutzt den gleichen Rechner mit `beitragsjahre=1, alter=bisher`.

Für einen Audit-Testfall lässt sich die EP-Formel direkt prüfen:
- EP pro Jahr = `min(jahresbrutto, 101.400) / 51.944`
- Bei Jahresbrutto 51.944 € → exakt 1,0 EP/Jahr ✓
- Bei Jahresbrutto 101.400 € → 1,9521 EP/Jahr (Kappung an BBG)

### 6. PV-Beitrags-Rechner

**Nicht als eigenständiger Rechner vorhanden.**

`PflegegeldRechner` behandelt **Pflegeleistungen** (Pflegegrad 1–5 × Pflegeform angehörige/Dienst/stationär), nicht den Arbeitnehmer-Beitrag zur Pflegeversicherung. Die PV-Beitragsrechnung ist als Feature in `BruttoNettoRechner` integriert:
- AN-Anteil 1,8 % Standard, 2,4 % kinderlos (+0,6 % Zuschlag)
- Staffel Kinderabschlag nach Prompt 83: 1,55 / 1,30 / 1,05 / 0,80 % (Kind 2–5, Kappung bei Kind 6)
- Konstanten in [pflegeversicherung.ts](lib/berechnungen/pflegeversicherung.ts)

Für einen Standalone-PV-Beitrag-Rechner müsste Welle 1.5 gezogen werden.

## Einschätzung für Audit-Testfälle

| Rechner | Test-Strategie | Referenz-Rechner |
|---|---|---|
| **Rente** | Testfälle mit fester bekannterRentenpunkte (EP-Input überspringt die Schätzung). BMF-Vergleich via DRV-Rechner, aber Netto-Schätzung dort detaillierter → Abweichungen im Netto bis ±10 % erwartbar, nur die Brutto-Rente prüfen (EP × Rentenwert). Stichtag-Parameter heute vs. ab 01.07.2026 testen. | [DRV-Rentenrechner](https://www.deutsche-rentenversicherung.de/) |
| **ALG I** | Testfälle mit klaren Brutto-Werten, SK I (Faktor 1,0 neutral) bevorzugen. BMF-Vergleich mit pauschalisiertem Nettoleistungsentgelt-Rechner der BA. SK III über Splittingtarif testbar, SK V/VI mit Vorbehalt (×1,15 ist Näherung). | [Arbeitsagentur ALG-Rechner](https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld-rechner) |
| **Krankengeld** | Brutto + Netto müssen konsistent eingegeben werden — am besten vorher durch `BruttoNettoRechner` ermitteln. Höchstsatz-Test: Brutto = 5.812,50 € (BBG), Netto = realistisch → Tagessatz muss auf 135,63 € laufen. 70/90 %-Deckel beim Test mit hohem Netto prüfen. | [AOK-KG-Rechner](https://www.aok.de/) |
| **Witwenrente** | **Bug-Dokumentation vor Audit nötig:** Alle Ergebnisse sind systematisch ~15 € zu niedrig (Freibetrag-Drift). Audit-Ergebnisse entsprechend interpretieren. Nach Fix (Prompt 94b o.ä.) erneut prüfen. | [DRV-Hinterbliebenenrente](https://www.deutsche-rentenversicherung.de/) |
| **Rentenpunkte** | EP/Jahr = min(Brutto, BBG) / 51.944 € direkt testbar, kein eigener Rechner nötig. | DRV Standard-Rechner |
| **PV-Beitrag** | Nur über `BruttoNettoRechner` testbar, Staffel-Rechnung prüfen (Kind 0: 1,8 %, kinderlos: 2,4 %, 2 Kinder: 1,55 %, …). | AOK-Arbeitgeber-Service |

## Ein kritischer Befund für Prompt 94b (Folge-Fix)

**Witwenrente-Rechner `RENTENWERT_2026 = 39.32 €` ist zwei Rentenanpassungen veraltet.** Das ist das Stufe-2-Äquivalent zum Kifb-Bug in Stufe 1 (Kindergeld) — eine falsche Konstante, die der Grep-basierte Audit 2026 übersehen hat, weil der Wert nicht offensichtlich mit "2024/2025" markiert ist und unter einem `_2026`-Suffix steht.

Empfehlung: In Prompt 94b sollte `WitwenrenteRechner.tsx` analog zu Splitting/Kindergeld/Abfindung auf `getAktuellerRentenwert()` aus `lib/berechnungen/rente.ts` umgestellt werden. Damit bekommt der Witwenrente-Rechner automatisch den 01.07.2026-Switch auf 42,52 € mit.

## Zentrale Beobachtung

**Von den 4 existierenden SV-Rechnern nutzt KEINER eine dedizierte SV-Lib außer Rente.** ALG konsumiert immerhin `berechneEStGrund` + `BBG_RV_MONAT` aus zentralen Libs. Krankengeld und Witwenrente halten ihre BBG/Rentenwert-Konstanten lokal und duplizieren rechnerische Logik. Das ist derselbe SSOT-Anti-Pattern wie in Stufe 1 vor Prompt 94.

**Nicht implementierte Stufe-2-Rechner:** Rentenpunkte-Standalone (integriert in Rente), PV-Beitrag-Standalone (Feature in BruttoNetto). Beide Kandidaten für Welle 1.5, wenn eigene URL-Strecke gewünscht wird.
