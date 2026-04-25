# Welle 2 Stufe 3 Arbeit — Block A Audit-Bericht

**Datum:** 25.04.2026
**Methodik:** 4-Punkt-Audit (Formel/Rechtsquelle, Input-Validierung, Edge Cases, SSOT) wie Welle 2 Stufe 3 Wohnen
**Scope Block A:** 10 rechtssensitive Rechner aus `lib/rechner-config/arbeit.ts`
**Ausgeschlossen:** Validation-Layer-Befunde (Welle 3 Validation-Sweep)
**Rechtsstand-Verifikation:** Web-recherchiert gegen Primärquellen (StÄndG 2025 BGBl. I 2025 Nr. 363, BGB, KSchG, MuSchG, BEEG, RVG, FamGKG, SGB III, OLG Düsseldorf DT 2026, BGH XII ZR 10/09, EuGH C-555/07, Mutterschutzanpassungsgesetz BGBl. 2025 I Nr. 59, Wachstumschancengesetz)

---

## Executive Summary

| | Anzahl | Hinweis |
|---|---|---|
| **P1** (rechtl. Bug, sofort) | **4** | scheidungskosten (KostBRÄG-Update), zugewinnausgleich (§1376 Indexierung fehlt), arbeitslosengeld (Slug-Drift), ehegattenunterhalt (SB-Achse vertauscht) |
| **P2** (fachlich/Update) | **6** | Mutterschutz (Fehlgeburt 2025, Behinderung), Unterhalt (Elternunterhalt-Update), Ehegattenunterhalt (Süd-OLG), Elternzeit (30h/32h, §15 Abs.6) |
| **P3** (Polish) | **~17** | Mobilitätsprämie, EuGH Kücükdeveci, § 1a Abs. 2 S. 3 Aufrundung, Muster 9, etc. |
| **Slug-Drift bestätigt** | **1** | arbeitslosengeld-rechner: kategorie='Finanzen' im File arbeit.ts |

**Karsten-Vorbefunde-Status:**
- ✅ pendlerpauschale-rechner „voll korrekt" — bestätigt; P3-1 Mobilitätsprämie ergänzt
- ❌ unterhaltsrechner 642-€-Verdacht — **widerlegt**: EG 4 = 115%, 558 × 1,15 = 641,70 € ≈ 642 € ist korrekt
- ✅ arbeitslosengeld-rechner Slug-Drift — bestätigt → P1-3

---

## Pro-Rechner-Detail Block A

### A1: pendlerpauschale-rechner (Z. 282–372)

**Rechtsstand-Check:** ✓ 0,38 €/km ab 1. km · ✓ StÄndG 2025 zitiert · ✓ Arbeitnehmer-Pauschbetrag 1.230 € · ✓ Homeoffice-Pauschale 6 € × 210 Tage = 1.260 € · ✓ 4.500-€-Cap bei Nicht-PKW · ✓ kürzeste Straßenverbindung

**Befunde:**

- **P3-1 Mobilitätsprämie § 101 EStG fehlt** (Z. 293–345): Seit StÄndG 2025 (BGBl. I 2025 Nr. 363) unbefristet. 14 % der Pauschalen ab km 21 für Steuerpflichtige unter Grundfreibetrag (12.348 €). Aufnahme in `erklaerung` als eigener Absatz oder neue FAQ-Frage „Was, wenn ich keine Steuern zahle?".
- **P3-2 Norm-Zitat Z. 303**: „§ 9 Abs. 1 Nr. 4 EStG" — präziser wäre „§ 9 Abs. 1 Satz 3 Nr. 4 EStG" (Standardzitierweise in BMF und Finanzgerichtsrechtsprechung). Niedrige Priorität.
- **P3-3 SSOT-Konstante**: `PENDLERPAUSCHALE_PRO_KM = 0.38` als Konstante mit Stichtag-Switch wäre sinnvoll, falls die im April 2026 angekündigte 45-Cent-Anhebung kommt.

**SSOT-Hygiene:** Pauschale hartkodiert in Beispielen (3 Stellen: Z. 292, 305, 310). Akzeptabel, weil keine zentrale Lib existiert; aber falls 45-Cent-Reform → Refactor-Pflicht.

---

### A2: kuendigungsfrist-rechner (Z. 609–692)

**Rechtsstand-Check:** ✓ § 622 Abs. 1 BGB Grundfrist 4 Wo (= 28 Tage) · ✓ Staffelung 2/5/8/10/12/15/20 Jahre · ✓ Nur AG · ✓ § 622 Abs. 3 Probezeit 2 Wo, max. 6 Mon. · ✓ § 623 BGB Schriftform · ✓ § 626 BGB außerord. Kündigung (2-Wo-Frist) · ✓ § 38 SGB III Arbeitssuchend-Meldung · ✓ KSchG-Schwelle 6 Mon + > 10 AN · ✓ § 4 KSchG 3-Wo-Klagefrist · ✓ § 622 Abs. 6 (AN nicht länger als AG)

**Befunde:**

- **P3-1 EuGH Kücükdeveci nicht erwähnt** (C-555/07 v. 19.01.2010): Beschäftigungszeiten vor Vollendung 25. LJ sind entgegen Wortlaut § 622 Abs. 2 S. 2 BGB MITzuzählen. Bei vollständiger Eingabe der Beschäftigungsdauer im Rechner ist das implizit erfüllt — sollte aber im Erklärtext genannt werden, sonst stiftet § 622 Abs. 2 S. 2 BGB Verwirrung.
- **P3-2 § 622 Abs. 5 Nr. 2 BGB Kleinbetriebs-Ausnahme nicht erwähnt**: ≤ 20 AN können in den ersten 2 Jahren 4 Wo ohne Termin-Bindung vereinbaren.
- **P3-3 § 169 SGB IX Schwerbehinderten-Mindestfrist 4 Wo** + Zustimmung Integrationsamt fehlt.
- **P3-4 § 113 InsO Insolvenz-Höchstfrist 3 Mon.** fehlt.
- **P3-5 BAG 30.01.2025 (2 AZR 68/24) zum Zugangsbeweis**: Online-Sendungsstatus reicht nicht, nur Auslieferungsbeleg. Ergänzung in „Kündigung erhalten — die ersten 3 Schritte" sinnvoll.

**Edge Cases:** TODO Component-Audit (nicht hochgeladen): BBzg = 1 Tag, BBzg = 19 J 11 Mon vs. exakt 20 J, Kündigung am 15. → läuft genau 4 Wo?

**Bewertung:** Solide. 0× P1/P2, 5× P3.

---

### A3: abfindungsrechner (Z. 766–842)

**Rechtsstand-Check:** ✓ Faktor 0,5 als Standard · ✓ Spannweite 0,25–1,5 · ✓ Fünftelregelung § 34 EStG · ✓ **Fünftelregelungs-2025-Update KORREKT erläutert** (Z. 789–791, „seit 1. Januar 2025 nicht mehr automatisch vom Arbeitgeber") · ✓ § 1a KSchG · ✓ SV-frei · ✓ ALG-Sperrzeit-Logik

**Befunde:**

- **P3-1 § 1a Abs. 2 S. 3 KSchG Aufrundung > 6 Monate fehlt**: Zeiträume mit mehr als 6 Mon. Rest werden auf volles Jahr aufgerundet. Beispiel 7 J 7 Mon → 8 J. Im Rechner-Code prüfen, ob das implementiert ist; im Erklärtext fehlt die Erwähnung.
- **P3-2 §§ 9, 10 KSchG gerichtliche Auflösung fehlt**: max. 12 Monatsverdienste; 15 ab 50 J + ≥ 15 J BBzg; 18 ab 55 J + ≥ 20 J BBzg.
- **P3-3 3-Wochen-Klagefrist § 4 KSchG** wird nur indirekt referenziert. Sollte explizit als entscheidende Strategie-Frist genannt werden.

**Bewertung:** Sehr gut. P2-Verdacht „Fünftelregelung 2025" aus Audit-Vorbereitung **widerlegt** — Konfig zeigt aktuellen Stand. Insgesamt 0× P1/P2, 3× P3.

---

### A4: mutterschutz-rechner (Z. 844–914)

**Rechtsstand-Check:** ✓ 6+8 Wo, 12 Wo nach bei Mehrlinge/Frühgeburt · ✓ 13 €/Tag GKV, 210 € PKV · ✓ AG-Zuschuss · ✓ § 17 MuSchG Kündigungsschutz 4 Mon nach Geburt · ✓ Beschäftigungsverbot ärztlich/betrieblich · ✓ Geltungsbereich: Vollzeit/Teilzeit/Minijob/Auszubildende/Praktikantinnen

**Befunde:**

- **P2-1 Fehlgeburt-Schutzfristen fehlen komplett**: Mutterschutzanpassungsgesetz vom 24.02.2025 (BGBl. 2025 I Nr. 59), gilt seit **01.06.2025**. Gestaffelter Schutz nach Fehlgeburt:
  - ab 13. SSW → 2 Wochen
  - ab 17. SSW → 6 Wochen
  - ab 20. SSW → 8 Wochen

  Eigene FAQ-Frage + Absatz im Erklärtext erforderlich. Auch der erweiterte Kündigungsschutz nach Fehlgeburt ab 12. SSW (§ 17 MuSchG i.d.F. seit 2018) sollte erwähnt sein.
- **P2-2 Behinderungs-Verlängerung ungenau** (Z. 863): „wenn das Kind mit einer Behinderung zur Welt kommt, verlängert sich die Schutzfrist nach der Geburt auf 12 Wochen statt 8 Wochen". Tatsächlich: Wenn innerhalb der ersten 8 Wochen nach Geburt eine Behinderung **ärztlich festgestellt wird**, kann die Mutter **auf Antrag** eine Verlängerung um 4 Wochen bekommen. Es ist kein automatischer 12-Wochen-Schutz wie bei Mehrlingen oder Frühgeburten. Antragspflicht muss klar sein.
- **P3-3 Frühgeburt-Definition fehlt**: < 2.500 g Geburtsgewicht ODER fehlende Reifezeichen ärztlich attestiert.
- **P3-4 Muster 9 ab 01.01.2026**: Bundeseinheitliches Muster 9 als Nachweis für Fehl-/Totgeburt (vorher: Übergangsbescheinigung). Ergänzung in Erklärtext oder FAQ.
- **P3-5 99-Tage-Mindestschutz**: Auch bei sehr später Geburt: Mindestschutz 99 Tage. Klarstellung in FAQ wäre hilfreich.
- **P3-6 Geltung für Schülerinnen/Studentinnen seit 2018** fehlt in Aufzählung Z. 857.
- **P3-7 Totgeburt-Sonderregelung**: ab 500 g oder 24. SSW: 8 Wo nach Geburt, kein Mehrlingsbonus. Zumindest als FAQ.

**Bewertung:** Inhaltlich solide, aber die Mutterschutz-Reform 2025 muss eingearbeitet werden. 2× P2, 5× P3.

---

### A5: scheidungskosten-rechner (Z. 916–972)

**Rechtsstand-Check:** ✓ Verfahrenswert-Formel · ✓ FamGKG/RVG-Verweis · ✓ Einvernehmlich vs. streitig · ✓ Folgesachen-Zuschläge · ✓ Trennungsjahr · ✓ Verfahrenskostenhilfe · ✓ Steuerabzugsbarkeit-Position seit BFH-Urteilen 2017

**Befunde:**

- **P1-1 KostBRÄG 2025 vermutlich nicht eingearbeitet** (Z. 925, 929, 937): Konfig zeigt 1,0-Gebühr 259 € bei VW 15.000 € (Z. 937). Das entspricht der **alten** FamGKG-Tabelle vor 01.06.2025. Mit KostBRÄG 2025 (in Kraft 01.06.2025, ~+6 %) liegt die 1,0-Gebühr für VW 13.001–16.000 € näher bei 273 €. Beispielrechnung Z. 926 („Verfahrenswert 16.500 € → Gerichtskosten ca. 550 € + 1 Anwalt ca. 1.680 € brutto = rund 2.230 €") muss gegen die neue Tabelle verifiziert werden.

  **Empfohlene Verifikation:** Externe RVG/FamGKG-Tabellenrechner (z.B. juris Prozesskostenrechner mit Stichtag 01.06.2025) für VW 15.000 € und VW 16.500 € durchprüfen. Ergebnisse als Verify-Test in `verify-scheidungskosten.test.ts` festhalten.

  **Falls KostBRÄG 2025 wirklich noch nicht eingearbeitet ist:** Alle 1,0-Gebühr-Werte in `formel`, `beispiel`, `erklaerung` und ggf. der Berechnungslogik aktualisieren.

- **P2-1 Mindestverfahrenswert-Diskrepanz** (Z. 925, 929, 949): Konfig sagt 3.000 € (gesetzlich nach § 43 Abs. 1 FamGKG). In der Praxis setzen Familiengerichte oft 4.000 € als faktische Untergrenze (mehrere Quellen 2026: advoscheidung.de, hilfe.de). Klarstellung in FAQ oder Hinweis: „gesetzlich 3.000 €, in der Praxis oft 4.000 € durch Gerichte angesetzt".

- **P3-1 Härtefall-Ausnahme zum Trennungsjahr** § 1565 Abs. 2 BGB nicht erwähnt (Gewalt, Suchterkrankung etc.).
- **P3-2 Versorgungsausgleich-Ausschluss-Möglichkeit** durch notariellen Vertrag erwähnt? Konfig nennt VA als Regelfall (+10%), aber nicht den Mindest-VW von 1.000 € auch bei Ausschluss.
- **P3-3 Folgesachen-Zuschläge unspezifisch** (Z. 933): „Zugewinnausgleich (+20 %)" — die Faustregel ist informativ, aber der tatsächliche VW richtet sich nach der konkreten Forderung. Ein Hinweis „Faustwert, real abhängig von der Forderung" wäre fairer.
- **P3-4 VKH-Werte ungenau** (Z. 941): „Wer weniger als etwa 1.500 Euro netto zur Verfügung hat, erhält die VKH häufig ratenfrei" — sehr ungenau. Tatsächliche Freibeträge (619 €/472 € + Wohnkosten) sind viel komplexer. Pauschale 1.500 € irreführend.
- **P3-5 Nr. 7002 VV RVG Auslagenpauschale**: Konfig sagt 20 €, korrekt; aber Cap (max. 20 % der Gebühren, max. 20 €) könnte dazu — ist aber wirklich nur Polish.

**SSOT-Refactor-Kandidat:** RVG/FamGKG-Tabellenwerte sollten in `lib/berechnungen/rvg.ts` konsolidiert werden mit Stichtag-Switch (vor/nach 01.06.2025). **Welle 3.**

**Bewertung:** **Wichtigster P1-Befund von Block A** — KostBRÄG 2025 muss verifiziert werden. 1× P1, 1× P2, 5× P3.

---

### A6: zugewinnausgleich-rechner (Z. 974–1026)

**Rechtsstand-Check:** ✓ § 1373, § 1378 BGB · ✓ Negativer Zugewinn = 0 (Z. 991 explizit) · ✓ § 1374 Abs. 2 privilegierter Erwerb · ✓ 2009-Reform Negativ-Anfangsvermögen erlaubt · ✓ Stichtage Heirat/Zustellung Scheidungsantrag · ✓ Wertsteigerung Privileg-Erwerb zählt zum Zugewinn · ✓ Rentenanwartschaften nicht im Endvermögen

**Befunde:**

- **P1-1 § 1376 BGB Indexierung des Anfangsvermögens FEHLT KOMPLETT** ⚠️ Gravierender Befund.

  Konfig (Z. 983, 991, 1011) sagt schlicht: `Zugewinn = Endvermögen − Anfangsvermögen`. Tatsächlich: `Zugewinn = Endvermögen − (Anfangsvermögen × VPI(Endstichtag) / VPI(Anfangsstichtag))` (§ 1376 BGB, ständige Rechtsprechung BFH BFHE 217, 248).

  **Auswirkung:** Bei längeren Ehen ist das ein riesiger Unterschied. Beispiel: Heirat 2000, Scheidung 2026, Anfangsvermögen 50.000 €. VPI 2000 ≈ 76,7 / VPI 2026 ≈ 122,1 → indexiertes AV = 79.609 €. Ohne Indexierung wird der Zugewinn ~30.000 € **zu hoch** ausgewiesen.

  **Was muss passieren:**
  1. Component/Berechnungslogik prüfen: Indexiert sie? Wenn nein → P1-Rechnungsfehler.
  2. **`lib/berechnungen/vpi.ts` aus Welle 2 Stufe 3 Wohnen verwenden** (existiert bereits!) — bequemer SSOT-Treffer.
  3. `formel`, `erklaerung`, `faq` ergänzen: § 1376 BGB Indexierung erklären.
  4. Beispiele Z. 984, 1011 mit indexiertem AV neu rechnen oder als „bei kurzer Ehe ohne Inflationseffekt" markieren.

  Privilegierter Erwerb wird dabei mit dem VPI zum Zeitpunkt des Erwerbs indexiert (nicht VPI Eheschließung).

- **P3-1 Auskunftsanspruch § 1379 BGB** zu Stichtagen Heirat/Trennung/Ende fehlt; relevant für Beweislast bei Vermögensminderung nach Trennung.
- **P3-2 Illoyale Vermögensminderung § 1375 Abs. 2 BGB** — Hinzurechnung zum Endvermögen — fehlt.
- **P3-3 Vorzeitiger Ausgleich § 1385 BGB** bei 3-jähriger Trennung fehlt.
- **P3-4 Beispiele sollten Indexierung sichtbar machen** (Z. 984, 1011): aktuell „idealisierte" Berechnung ohne VPI-Effekt — irreführend.

**SSOT-Hygiene:** ❌ vpi.ts wird (vermutlich) nicht verwendet → **Welle 3 Refactor**, oder als Teil des P1-Fixes mit eingearbeitet.

**Bewertung:** **Zweiter Hauptbefund von Block A.** 1× P1 (Indexierung), 4× P3.

---

### A7: unterhaltsrechner (Z. 1101–1153)

**Rechtsstand-Check:** ✓ DT 2026 (Mindestbeträge implizit aus 642 €-Beispiel) · ✓ Hälftiges KG 129,50 € (= 259/2) · ✓ Volles KG 259 € · ✓ § 1603 Abs. 2 / § 1609 BGB Privilegiert · ✓ Selbstbehalt notwendig 1.450/1.200 € erwerbstätig/nicht · ✓ Selbstbehalt volljährig 1.750 € · ✓ Mangelfall-Quotelung · ✓ Sonder-/Mehrbedarf · ✓ Studium bis 25 J. · ✓ Erstausbildung-Privileg

**Befunde:**

- **Karsten-Vorbefund 642 € WIDERLEGT**: 558 × 1,15 (EG 4) = 641,70 € ≈ 642 €. Wert ist mathematisch korrekt für EG 4 (115 %). EG 2 = 105 % (das hatte Karsten irrtümlich angenommen).

  **Aber Beispiel-Klarstellung (P3-1):** Z. 1111 + 1144 sagen „Netto 3.000 €" → EG 4. Mehrdeutig: Wenn 3.000 € = bereinigtes Netto (5 % Pauschale schon abgezogen), greift EG 4 (2.901–3.300 €) → 642 €. Wenn 3.000 € = reines Netto, dann bereinigt 2.850 € → EG 3 (2.501–2.900) → 614 €. Beispiel sollte explizit „bereinigtes Nettoeinkommen 3.000 €" sagen.

- **P2-1 Elternunterhalt-Formel veraltet** (Z. 1110): `Elternunterhalt = floor((Netto − Selbstbehalt 2.650 €) × 30 %)`.

  Korrekter Stand seit Angehörigen-Entlastungsgesetz vom 10.12.2019 (in Kraft seit 01.01.2020):
  - **§ 94 Abs. 1a SGB XII**: Erst ab Bruttojahreseinkommen > 100.000 € können unterhaltspflichtige Kinder herangezogen werden. Unter 100.000 € → kein Elternunterhalt.
  - Über 100.000 €: Berechnung über die „Hälfte über Selbstbehalt"-Methode (50 %, nicht 30 %).
  - Selbstbehalt 2026 gegen Eltern: 2.000 € (DT 2026 — nicht mehr 2.650 €).

  **Fix:** Formel und Erklärung komplett überarbeiten. § 94 Abs. 1a SGB XII zitieren. Klarstellung „Bruttojahreseinkommen, nicht Netto-Monat".

- **P3-2 § 1610 BGB** über DT-Höchstwert (NEK > 11.200 €): konkrete Bedarfsberechnung möglich. Fehlt.
- **P3-3 § 1612a Abs. 3 BGB Alterssprung am Geburtstag**: höherer Unterhalt für ganzen Monat des Geburtstags. Fehlt.
- **P3-4 Selbstbehalt-Wohnkosten** (Z. 1147): „520 € Miete/Nebenkosten" — DT 2026 spezifischer: 390 € Kaltmiete + 130 € Nebenkosten und Heizung.
- **P3-5 7. MUVÄndV vom 15.11.2024 BGBl. 2024 I Nr. 359** als Rechtsquelle der Mindestunterhalts-Werte fehlt.

**SSOT-Hygiene:** Lib `lib/berechnungen/duesseldorfer-tabelle.ts` existiert (laut Memory). **TODO:** Component-Code prüfen, ob sie verwendet wird oder Werte hartkodiert sind.

**Bewertung:** Karstens 642-€-Verdacht widerlegt; aber **Elternunterhalt-Formel ist veraltet** → P2. 0× P1, 1× P2, 5× P3.

---

### A8: arbeitslosengeld-rechner (Z. 1155–1196)

**Rechtsstand-Check:** ✓ Bemessungsentgelt = Durchschnittsbrutto 12 Mon · ✓ **BBG 8.450 €/Monat bundeseinheitlich 2026** (Z. 1172 explizit „seit 2025 keine West/Ost-Trennung mehr") · ✓ 21 % SV-Pauschale · ✓ 60/67 % Leistungssatz · ✓ Anwartschaft 12 Mon in 30-Mon-Rahmenfrist · ✓ Bezugsdauer 6/12 + Alterssprünge 50/55/58 → 15/18/24 Mon · ✓ § 159 SGB III Sperrzeit 12 Wo · ✓ § 158 SGB III Ruhen bei verkürzter Frist · ✓ § 19 SGB II Bürgergeld-Anschluss · ✓ Karsten-Vorbefund „BBG 8.450 € rechnerisch korrekt" bestätigt

**Befunde:**

- **P1-1 Slug-Drift bestätigt** (Z. 1158, 1159):
  ```ts
  kategorie: 'Finanzen',
  kategorieSlug: 'finanzen',
  ```
  Eintrag steht in `lib/rechner-config/arbeit.ts` — verletzt SSOT-Eigenschaft pro Kategorie-Datei.

  **Drei Optionen:**
  1. **Bug → Migration nach `finanzen.ts`**: Eintrag verschieben, Slug `arbeitslosengeld-rechner` und URL `/finanzen/arbeitslosengeld-rechner` bleiben. Empfohlen.
  2. **Absicht → Whitelist in `slug-drift-scan.mjs`**: Wenn aus thematischen Gründen (Nachbarschaft zu Mutterschutz/Elternzeit) bewusst, sollte das in der Scanner-Konfig dokumentiert werden.
  3. **Migrations-Rest**: Falls eine frühere Migration nicht abgeschlossen wurde, dann ist Option 1 der richtige Abschluss.

  **TODO Karsten:** Klären, welche Variante. Test: `https://www.rechenfix.de/arbeit/arbeitslosengeld-rechner` vs. `/finanzen/arbeitslosengeld-rechner` — was ist publiziert? Mega-Menü-Sortierung prüfen. `slug-drift-scan.mjs` lokal laufen lassen — meldet er den Drift?

- **P3-1 § 153 SGB III** als Rechtsquelle der pauschalierten Leistungsentgelt-Berechnung fehlt.
- **P3-2 § 147 SGB III** als Rechtsquelle der Bezugsdauer-Tabelle fehlt.
- **P3-3 Höchstsatz fehlt**: ~2.940 €/Monat (Steuerklasse III mit Kind, BBG voll). Hilft Nutzern bei Plausibilitätscheck.
- **P3-4 Steuerklasse-Stichtag 01.01.** des Anspruchsjahres als entscheidend nicht erwähnt (relevant für Beratung — Stkl-Wechsel sollte rechtzeitig sein).
- **P3-5 Nebenverdienstfreibetrag** § 155 SGB III (165 €/Monat, max. 15 h/Wo) nicht erwähnt.

**Beispielwert-Verifikation Z. 1165:** „3.500 € Brutto, Stkl. I, ohne Kind → ca. 1.420 €/Monat ALG I". Grobrechnung: BE = 3.500, SV-Pauschale 735, LSt Stkl. I ~460, Leistungsentgelt ~2.305, 60 % = ~1.383 €. Konfigwert 1.420 € liegt 2-3 % darüber — innerhalb Rundungstoleranz der offiziellen BA-Tabelle. ✓ plausibel.

**Bewertung:** Inhaltlich sehr solide, BBG-Update korrekt. Hauptbefund ist der Slug-Drift. 1× P1, 0× P2, 5× P3.

---

### A9: elternzeit-rechner (Z. 1198–1246)

**Rechtsstand-Check:** ✓ 36 Mon. pro Elternteil · ✓ bis 8. Geburtstag · ✓ 24 Mon. übertragbar · ✓ Anmeldung 7/13 Wo · ✓ § 18 BEEG Kündigungsschutz ab Anmeldung (frühestens 8 Wo vor Beginn) · ✓ Mutterschutz auf Elternzeit angerechnet · ✓ Vater ab Geburt · ✓ Partnermonate für 14 Mon. EG · ✓ § 17 BEEG Urlaubsübertragung · ✓ Bindungszeitraum 2 Jahre · ✓ § 15 Abs. 6 BEEG Schwelle > 15 AN

**Befunde:**

- **P2-1 30h/32h-Inkonsistenz** in Z. 1227:

  ```
  Sie können während der Elternzeit 15 bis 32 Stunden pro Woche arbeiten...
  Wer 30 Stunden oder weniger arbeitet, bleibt voll im Elternzeit-Status.
  ```

  Die **30-Stunden-Schwelle ist veraltet** (BEEG-Reform vom 15.02.2021, in Kraft 01.09.2021: Erhöhung auf 32 Stunden). Innerhalb desselben Absatzes widerspricht sich der Konfig.

  **Fix:** Beide Sätze auf 32 h harmonisieren:
  ```
  Sie können während der Elternzeit bis zu 32 Stunden pro Woche arbeiten — beim eigenen oder einem anderen Arbeitgeber...
  ```
  Den 30-h-Satz ersatzlos streichen oder als historische Anmerkung markieren.

- **P2-2 § 15 Abs. 6 BEEG-Voraussetzungen ungenau** (Z. 1227): „15 bis 32 Stunden" wird so dargestellt, als seien das Grenzwerte für „in Elternzeit sein". Tatsächlich ist das die Range, in der ein **klagbarer Anspruch** auf Teilzeit gegen den AG besteht (§ 15 Abs. 6 Nr. 3 BEEG). Außerhalb dieser Range darf man trotzdem in Elternzeit-Teilzeit arbeiten — nur ohne durchsetzbaren Anspruch.

  **Fix:** Klarstellen:
  > „Bis zu 32 Stunden pro Woche sind erlaubt. Einen Anspruch gegenüber dem Arbeitgeber auf Teilzeit (15–32 h/Woche, mind. 2 Monate) haben Sie unter den Voraussetzungen des § 15 Abs. 6 BEEG (ab 15 AN, 6 Mon. Beschäftigung)."

- **P3-1 § 17 Abs. 1 BEEG Urlaubskürzung 1/12 pro Monat Elternzeit** fehlt — wird oft mit der Übertragungsmöglichkeit verwechselt. Wichtige Klarstellung: AG **kann** kürzen (Wahlrecht), muss aber nicht.
- **P3-2 Begrifflichkeit „Bindungszeitraum"**: Fachterminus ist „verbindlicher Festlegungszeitraum" oder „Bindungswirkung der Anmeldung". „Bindungszeitraum" ist umgangssprachlich.
- **P3-3 Teilung der 36 Monate in Abschnitte**: Bis zu 3 Zeitabschnitte zulässig (§ 16 Abs. 1 BEEG).

**Bewertung:** Solide, aber 30/32-h-Veraltetes ist sichtbarer Fehler. 0× P1, 2× P2, 3× P3.

---

### A10: ehegattenunterhalt-rechner (Z. 1248–1336)

**Rechtsstand-Check:** ✓ § 1361 BGB Trennungsunterhalt · ✓ §§ 1569 ff. BGB nachehelich · ✓ Tatbestände § 1570/1571/1572/1573/1575 · ✓ 3/7-Methode · ✓ Erwerbstätigenbonus 1/7 · ✓ § 1578b BGB Begrenzung/Befristung · ✓ § 1614 BGB Verzicht-Verbot Trennungsunterhalt · ✓ § 1609 BGB Vorrang Kindesunterhalt · ✓ Beispiel mathematisch korrekt: 2.300 × 3/7 = 985,71 € ≈ 986 €

**Befunde:**

- **P1-1 Selbstbehalts-Achse vertauscht** ⚠️ Gravierender Befund.

  Konfig (Z. 1257, 1269, 1282, 1292, 1294, 1317):
  > „Selbstbehalt Trennungsunterhalt 1.600 €, Selbstbehalt nachehelich 1.475 €. Er ist niedriger als beim Trennungsunterhalt, weil die Bindung schwächer ist."

  **Das ist falsch und mit erfundener Begründung versehen.** Korrekte DT 2026:
  - **Erwerbstätig** (gegen Ehegatten, sowohl Trennung als auch nachehelich): **1.600 €**
  - **Nicht erwerbstätig** (gegen Ehegatten, sowohl Trennung als auch nachehelich): **1.475 €**

  Die Achse ist Erwerbstätigkeit, NICHT Trennungsphase. Die Begründung „weil die Bindung schwächer ist" ist konstruiert.

  **Fix:** Komplette Überarbeitung der Selbstbehalt-Erläuterung:
  ```
  Selbstbehalt gegen Ehegatten 2026 (DT):
  - 1.600 € — wenn der Pflichtige erwerbstätig ist
  - 1.475 € — wenn der Pflichtige nicht erwerbstätig ist
  Die Differenzierung ist NICHT zwischen Trennung und nachehelicher Phase, sondern nach Erwerbstätigkeit des Pflichtigen.
  ```
  Beispielrechnung Z. 1294 anpassen: „Peter erwerbstätig → SB 1.600 €" (passt sowieso, war der gewählte Wert), aber die Erklärung warum.

  **Auch im Component prüfen:** Wird die UI-Logik nach Trennung/nachehelich geschaltet? Wenn ja: Logik umstellen auf erwerbstätig/nicht erwerbstätig. Das ist ein **echter Berechnungsbug**.

- **P2-1 Süddeutsche Leitlinien (45 %) nicht erwähnt**: 15. Süddeutsche Leitlinien (Stand 2026) verwenden 45 % statt 3/7 (= 42,86 %). Geltungsbereich: OLG-Bezirke Bamberg, Karlsruhe, München, Nürnberg, Stuttgart, Zweibrücken — also **inklusive Karstens Standort Karlsruhe** und vermutlich vielen Nutzern aus diesen Regionen.

  Bei Differenz 2.300 €:
  - Bundesweit (3/7): 986 €
  - Süddeutsch (45 %): 1.035 €

  Differenz 49 € bei mittlerem Einkommen — bei höherem Einkommen entsprechend mehr.

  **Fix:** Hinweis im Erklärtext + FAQ. Idealerweise OLG-Auswahl im Rechner (Komponente). Wenn das im Rechner-Code nicht differenziert wird → der Rechner liefert für ⅓ Deutschlands rechnerisch falsche Ergebnisse → **könnte als P1 hochgestuft werden.** Konservativ als P2.

- **P3-1 Halbteilungsgrundsatz für Nicht-Erwerbseinkünfte** (Renten, Mieten, Kapital): 50 % statt 3/7. Konfig erwähnt das nicht — wichtig bei Rentnern/Vermietern.
- **P3-2 § 1574 BGB Erwerbsobliegenheit** des Berechtigten nicht erwähnt.
- **P3-3 § 1577 BGB Anrechnung eigener Einkünfte und Vermögen** nicht erwähnt.
- **P3-4 § 1573 Abs. 4 BGB Anschlussunterhalt** fehlt.
- **P3-5 Beispiel idealtypisch ohne Kindesunterhalt-Vorabzug** (Z. 1294): Wenn Peter Kindesunterhalt zahlen müsste, wäre dieser zuerst abzuziehen. Beispiel mit Kindesunterhalt wäre realistischer.

**Bewertung:** Selbstbehalts-Vertauschung ist der **dritte gravierende P1-Befund** in Block A. 1× P1, 1× P2, 5× P3.

---

## Block-A-Gesamt-Befunde

### P1-Eskalation (sofort)

| # | Rechner | Befund | Aufwand |
|---|---|---|---|
| P1-A5 | scheidungskosten | KostBRÄG 2025 RVG/FamGKG-Tabellen prüfen und ggf. updaten | 1–2 h (Tabellen-Recherche + Werte fix + Beispiele neu) |
| P1-A6 | zugewinnausgleich | § 1376 BGB Indexierung Anfangsvermögen einarbeiten — Component, Erklärtext, Beispiele. `lib/berechnungen/vpi.ts` (existiert!) verwenden | 2–3 h |
| P1-A8 | arbeitslosengeld | Slug-Drift klären → Migration nach `finanzen.ts` ODER Whitelist in slug-drift-scan dokumentieren | 30 Min (Migration) |
| P1-A10 | ehegattenunterhalt | Selbstbehalts-Achse korrigieren: erwerbstätig/nicht erwerbstätig statt Trennung/nachehelich. Falsche Begründung Z. 1282 entfernen. Component-Logik prüfen | 1–2 h |

### P2-Polish-Batch

| # | Rechner | Befund |
|---|---|---|
| P2-A4-1 | mutterschutz | Fehlgeburt-Schutzfristen 13./17./20. SSW (seit 01.06.2025) ergänzen |
| P2-A4-2 | mutterschutz | Behinderungs-Verlängerung Antragspflicht klarstellen |
| P2-A7-1 | unterhalt | Elternunterhalt-Formel auf Angehörigen-Entlastungsgesetz 2020 aktualisieren (100k-Schwelle, 50% statt 30%, SB 2.000 € statt 2.650 €) |
| P2-A9-1 | elternzeit | 30h/32h-Inkonsistenz in Z. 1227 fixen |
| P2-A9-2 | elternzeit | § 15 Abs. 6 BEEG-Voraussetzungen 15h-Schwelle klarstellen |
| P2-A10-1 | ehegattenunterhalt | Süddeutsche Leitlinien 45 % erwähnen (Karlsruhe!) |

### P3-UX (bei Gelegenheit, gesammelt)

17 Punkte, im Pro-Rechner-Detail aufgeführt. Sammelthema: Rechtsquellen-Vollständigkeit (§-Zitate, BGBl.-Verweise), aktuelle Gesetzes-Updates aus 2025/2026, Edge-Case-FAQ.

### Slug-Drift-Status

**1× bestätigt:** arbeitslosengeld-rechner (s.o.).

`scripts/slug-drift-scan.mjs` (Prebuild-Hook seit 132.6) sollte das prinzipiell erfassen — wenn nicht, prüfen ob der Scanner nur URL-Strings prüft oder auch die `kategorie`/`kategorieSlug`-Felder pro Datei. Gegebenenfalls Scanner-Erweiterung als P3-Folge-Prompt.

---

## SSOT-Refactor-Kandidaten (Welle 3)

| Lib | Status | Verwendet von |
|---|---|---|
| `lib/berechnungen/duesseldorfer-tabelle.ts` (existiert) | TODO Component-Audit | unterhaltsrechner, ehegattenunterhalt-rechner |
| `lib/berechnungen/vpi.ts` (existiert seit Wohnen-Welle) | NICHT verwendet | **zugewinnausgleich-rechner — Pflicht!** |
| `lib/berechnungen/rvg.ts` (NEU) | empfohlen | scheidungskosten-rechner; ggf. künftige Recht-Rechner |
| `lib/berechnungen/sv-parameter.ts` (existiert) | TODO Component-Audit | arbeitslosengeld-rechner (BBG 8.450 € sollte importiert werden) |
| `lib/berechnungen/lohnsteuer.ts` (existiert) | TODO Component-Audit | arbeitslosengeld-rechner (für pauschale LSt-Schätzung) |

---

## Folge-Prompts-Vorschlag

**Prompt 149 (P1-Eskalation Block A):**
- A5 KostBRÄG-2025-Verifikation + Update (RVG/FamGKG-Beispielwerte)
- A6 § 1376 BGB Indexierung im zugewinnausgleich-rechner (mit vpi.ts)
- A8 arbeitslosengeld-rechner Migration nach finanzen.ts (Klärung mit Karsten vorab)
- A10 Ehegattenunterhalt Selbstbehalts-Achse fixen

**Prompt 150 (P2-Polish-Batch Block A):** Mutterschutz Fehlgeburt + Behinderung, Elternunterhalt-Update, Elternzeit 30h/32h, Süd-OLG-Hinweis

**Prompt 151 (P3-UX Block A):** Sammelpolish 17 Punkte, kann gut mit Block B zusammen erledigt werden

---

## Methodik-Lehren aus Block A

- **Rechtsupdate-Risiko 2025**: Drei wichtige Gesetzesänderungen 2025 sind im Konfig nicht eingearbeitet:
  - Mutterschutzanpassungsgesetz 24.02.2025 (Fehlgeburt-Schutzfristen)
  - KostBRÄG 04.06.2025 (RVG/FamGKG-Tabellen +6%)
  - BEEG-Reform 01.09.2021 (32h, nicht 30h) — länger her, aber noch im Konfig

  Das spricht für einen **systematischen Rechtsstand-Check vor jeder Welle** mit Fokus auf 2024/2025-Updates.

- **Schwerwiegendster Befund war kein „Tippfehler"**: Die § 1376 BGB-Indexierung im zugewinnausgleich-rechner und die Selbstbehalts-Achse im ehegattenunterhalt-rechner sind systematische, fachlich tiefgreifende Fehler. Das spricht für **fachliche Tiefenprüfung statt Oberflächen-Scan** bei rechtssensitiven Rechnern.

- **Karstens Vorbefunde-Handhabung war richtig**: Das 642-€-Verdacht wurde **zurückgewiesen** (mathematisch korrekt) — Code-Inspektion durch Code als Gegencheck zur Intuition. Das ist die in Welle 2 Stufe 3 Wohnen etablierte Lehre, hier wieder bestätigt.

- **Süddeutsche Leitlinien sind Karstens Heimat-Recht**: Karlsruhe = Süd-OLG-Bezirk → 45 %-Methode statt 3/7. Bei rechtssensitiven Rechnern mit regionalen Varianten sollte die OLG-Region konfigurierbar sein.

---

## Stand und nächste Schritte

**Bericht-Status:** Block A komplett. Block B (8 Rechner: arbeitstage, arbeitszeit, freelancer-stundensatz, promille, rechtsschutz, teilzeit, ueberstunden, urlaubstage) folgt in einer separaten Session.

**Empfohlene Bearbeitungsreihenfolge:**
1. Karsten klärt P1-A8 (arbeitslosengeld-Slug-Drift) — kurz: Migration ja/nein?
2. Prompt 149 P1-Block (4 Befunde) als atomare Commits: A5, A6, A8, A10
3. Prompt 150 P2-Batch
4. Block B Audit (separate Session, ~60 Min)
5. Prompt 151 P3 + Block B P-Punkte
