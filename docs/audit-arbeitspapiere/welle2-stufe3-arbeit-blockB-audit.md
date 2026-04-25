# Welle 2 Stufe 3 Arbeit — Block B Audit-Bericht

**Datum:** 25.04.2026
**Methodik:** 4-Punkt-Audit (Formel/Rechtsquelle, Input-Validierung, Edge Cases, SSOT) wie Welle 2 Stufe 3 Wohnen
**Scope Block B:** 8 Rechner aus `lib/rechner-config/arbeit.ts` (weniger rechtssensitiv als Block A, aber mit Rechen- und Faktencheck)
**Ausgeschlossen:** Validation-Layer-Befunde (Welle 3 Validation-Sweep)

---

## Executive Summary

| | Anzahl | Hinweis |
|---|---|---|
| **P1** (rechtl. Bug, sofort) | **0** | — |
| **P2** (fachlich/Update) | **3** | arbeitszeit (ArbZG-Gesetzgebung-Status), freelancer (§ 19 UStG 100k-Cap), arbeitstage (Werktage 260 statt 261) |
| **P3** (Polish) | **~28** | Norm-Zitate, EuGH-Rechtsprechungsverweise, Edge-Case-FAQ |

**Befund-Profil Block B:** Im Vergleich zu Block A deutlich weniger kritisch. Drei P2-Befunde, davon einer ein **Off-by-one in einer Faktenangabe** (arbeitstage), einer ein **fehlender 100k-Cap-Schwellwert** (freelancer KU), einer ein **unscharfer Gesetzgebungs-Status** (arbeitszeit AZErf). Sonst überwiegend P3-Polish.

**Slug-Drift Block B:** keine Befunde. Alle 8 Rechner haben `kategorie: 'Arbeit & Recht'` und `kategorieSlug: 'arbeit'`.

---

## Pro-Rechner-Detail Block B

### B1: arbeitszeitrechner (Z. 5–92)

**Rechtsstand-Check:** ✓ Brutto/Netto-Arbeitszeit · ✓ Dezimalstunden-Umrechnung · ✓ § 4 ArbZG Pausen 30/45 Min · ✓ § 3 ArbZG max. 8/10 h · ✓ 11 h Ruhezeit · ✓ 48/60 h-Wochenmaximum (Mo–Sa) · ✓ Sonntag/Feiertag-Verbot · ✓ Pauschal-Industrieminuten-Erklärung

**Befunde:**

- **P2-1 Gesetzgebungs-Status zur Arbeitszeiterfassung unscharf** (Z. 61):

  Konfig sagt: „Seit dem Urteil des Bundesarbeitsgerichts (BAG) vom September 2022 und der **darauf basierenden Gesetzgebung** sind Arbeitgeber in Deutschland verpflichtet, die Arbeitszeit ihrer Beschäftigten systematisch zu erfassen."

  **Problem:** Die Formulierung „darauf basierende Gesetzgebung" suggeriert ein verabschiedetes Erfassungsgesetz. Tatsächlich gibt es bis Stand April 2026 nur **Referentenentwürfe** des BMAS (18.04.2023, dann 02.04.2024) — kein verabschiedetes Gesetz. Die Erfassungspflicht ergibt sich aus der **Auslegung des § 3 Abs. 2 Nr. 1 ArbSchG** durch das BAG (Urteil 13.09.2022, 1 ABR 22/21), wiederum gestützt auf das EuGH-Urteil „CCOO" (C-55/18 v. 14.05.2019).

  **Fix:** Klarstellen:
  > „Seit dem BAG-Urteil vom 13.09.2022 (1 ABR 22/21) und dem zugrundeliegenden EuGH-Urteil ‚CCOO' (C-55/18 v. 14.05.2019) sind Arbeitgeber zur systematischen Arbeitszeiterfassung verpflichtet — abgeleitet aus § 3 Abs. 2 Nr. 1 ArbSchG. Eine ausdrückliche gesetzliche Regelung im ArbZG ist seit 2023 in Vorbereitung (Referentenentwurf des BMAS), aber noch nicht verabschiedet (Stand 2026)."

- **P3-1 BAG-Aktenzeichen + Datum präziser** (1 ABR 22/21 v. 13.09.2022) — siehe oben.
- **P3-2 EuGH „CCOO" als europarechtliche Grundlage** (C-55/18 v. 14.05.2019) zitieren.
- **P3-3 § 16 Abs. 2 ArbZG** als korrekte Rechtsquelle für die 2-Jahre-Aufbewahrung (Z. 63 + 89). „Mindestens zwei Jahre" entspricht § 16 Abs. 2 ArbZG, der die werktäglich über 8 h hinausgehende Arbeitszeit betrifft. Im AZErf-Referentenentwurf ist eine erweiterte 2-Jahres-Frist auf alle Arbeitszeiten geplant — aber das ist noch nicht Gesetz.
- **P3-4 § 5 ArbZG Ruhezeit** zitieren (statt nur „11 Stunden").

**Bewertung:** Solide formuliert, aber Gesetzgebungs-Status muss präzisiert werden. 1× P2, 4× P3.

---

### B2: urlaubstage-rechner (Z. 94–189)

**Rechtsstand-Check:** ✓ § 3 BUrlG Mindesturlaub 20/24 Werktage · ✓ § 19 JArbSchG Jugendliche · ✓ § 4 BUrlG Wartezeit · ✓ § 5 BUrlG anteilig · ✓ § 5 Abs. 1 Buchst. c BUrlG 1./2. Jahreshälfte · ✓ § 7 Abs. 4 BUrlG Abgeltung · ✓ § 208 SGB IX Schwerbehinderten-Zusatzurlaub · ✓ Teilzeit-Formel · ✓ § 5 Abs. 2 BUrlG Aufrunden ab 0,5

**Befunde:**

- **P3-1 EuGH-Verfallsregel-Rechtsprechung fehlt** (C-684/16 + C-619/16, 06.11.2018; übernommen durch BAG 19.02.2019, 9 AZR 423/16): Urlaub verfällt nicht automatisch zum Jahresende, wenn der AG den AN nicht aktiv über drohenden Verfall informiert hat. **Wichtige Mitwirkungsobliegenheit des AG.** Sollte als FAQ-Frage „Verfällt mein Urlaub am 31.12.?".
- **P3-2 § 7 Abs. 3 BUrlG Übertragung 31.03.** — die Faustfrist „Restanspruch verfällt am 31.03." ist im Konfig nicht erwähnt. Tatsächlich: Übertragung nur bei betrieblichen oder persönlichen Gründen, dann bis 31.03.
- **P3-3 Krankheits-Sonderfall**: Bei dauerhafter AU (z.B. > 1 Jahr) verfällt Urlaub 15 Monate nach Ende des Urlaubsjahrs (BAG 22.11.2011, 9 AZR 425/10; bestätigt 2024). Komplex, aber wichtig — könnte FAQ.
- **P3-4 Beispielrechnung Z. 150 Theorie-Praxis-Lücke**: „30 Urlaubstage, Kündigung zum 31.03., 5 bereits genommene Tage. Anspruch: 30/12 × 3 = 7,5 Tage. Resturlaub: 7,5 − 5 = 2,5 Tage." Korrekt; aber wenn die 5 schon genommenen Tage über dem 7,5-Anspruch liegen würden, kann der AG die Überzahlung in der Regel nicht zurückfordern (Vertrauensschutz, BAG-Rspr.). Klarstellung in FAQ.
- **P3-5 BAG 06.05.2025 (9 AZR 196/24)** zur Klagefrist-Rspr. zum Urlaubsabgeltungsanspruch — nur erwähnen, falls Anspruchsfristen explizit thematisiert würden.

**SSOT-Hygiene:** Keine zentrale Lib nötig (BUrlG-Werte stabil).

**Bewertung:** Sehr solide. Verfallrechtsprechung ist die wichtigste Lücke, aber nur P3-Niveau. 0× P1/P2, 5× P3.

---

### B3: ueberstunden-rechner (Z. 191–280)

**Rechtsstand-Check:** ✓ Formel: Tatsächlich − Vertraglich · ✓ Faktor 4,33 (52/12) · ✓ § 612 BGB Vergütungserwartung · ✓ § 3 ArbZG max. 8/10 h · ✓ § 14 ArbZG Notfall · ✓ § 3b EStG SFN-Zuschläge · ✓ 11 h Ruhezeit · ✓ Keine gesetzliche Zuschlagspflicht · ✓ Pauschalabgeltungs-Grenze (BAG)

**Befunde:**

- **Beispielwert-Verifikation Z. 201:** „45 Std., 40 vertraglich → 5 ÜS/Wo. Bei 3.500 € und 25%: 5 × 25,24 € = 126,19 € brutto." Mathe: Stundenlohn 3.500/173,33 = 20,19 €. ×1,25 = 25,24 €. ×5 = 126,19 €. ✓
- **P3-1 BAG 04.05.2022 (5 AZR 359/21) zur Beweislast**: Konfig Z. 218 sagt verkürzt „AN trägt Beweislast". BAG hat 2022 die Beweislast nach EuGH „CCOO" konkretisiert: AN muss substantiiert vortragen, AG muss bei Zeiterfassung mitwirken. Klarstellung sinnvoll.
- **P3-2 § 199 BGB Verjährung** (3 Jahre, Z. 269) zitieren statt nur „gesetzliche Verjährungsfrist".
- **P3-3 Stundenlohn-Faktor 173,33** (Z. 231): Korrekt = 40 × 52/12 = 173,33. Tarifverträge nutzen oft 4,3500 → 174 oder 173,21. Faustwert OK, könnte als „in der Praxis" markiert werden.
- **P3-4 BAG 17.05.2017 (10 AZR 318/16) Pauschalabgeltungs-Klausel**: Nur wirksam, wenn klar definiert, wieviele Überstunden abgegolten sind. Konfig erwähnt das (Z. 226), aber das BAG-Aktenzeichen wäre Polish.

**Bewertung:** Solide P3-only. 0× P1/P2, 4× P3.

---

### B4: pendlerpauschale-rechner

**Bereits in Block A behandelt** (siehe Block-A-Bericht A1). Trotz nicht-rechtssensitivem Charakter im Block-A-Scope, weil zentral für Steuerberatung.

---

### B5: promillerechner (Z. 374–479)

**Rechtsstand-Check:** ✓ Widmark-Formel · ✓ Reduktionsfaktoren 0,68 Mann / 0,55 Frau · ✓ Abbau 0,15 ‰/h (Mittelwert) · ✓ Grenzwerte 0,0 / 0,3 / 0,5 / 1,1 / 1,6 ‰ · ✓ § 24c StVG (Fahranfänger) · ✓ § 316 StGB (absolute Fahruntüchtigkeit) · ✓ Bußgelder 500/1.000/1.500 €, 2 Punkte, 1/3/3 Mon FV · ✓ MPU bei 1,6 ‰ · ✓ Disclaimer „Schätzung, individuelle Faktoren"

**Beispielwert-Verifikation Z. 384:** „Mann, 80 kg, 2 Bier (0,5 L, 5%), vor 2 h: BAK = 40 ÷ (80×0,68) − 0,3 = 0,44 ‰." Math: 40/54,4 = 0,7353 ‰; − 0,15×2 = 0,3 → 0,4353 ≈ 0,44 ✓

**Tabellenwerte Z. 429–435:** Spot-Check 1 Bier: 20/(80×0,68) = 0,3676 ≈ 0,37 ✓; Frau 60kg: 20/(60×0,55) = 0,606 ≈ 0,61 ✓

**Befunde:**

- **P3-1 § 24a StVG (Ordnungswidrigkeit 0,5 ‰) nicht zitiert.** Konfig erwähnt nur § 24c (Fahranfänger). § 24a ist die Hauptnorm für die 0,5 ‰-OWi. Wichtige Lücke in der Rechtsquellen-Dokumentation.
- **P3-2 Fahrradfahrer-Sondergrenzen fehlen**: Ab 1,6 ‰ absolute Fahruntüchtigkeit auch für Radfahrer (BGH-Rspr.); kein Fahrerlaubnisentzug, aber MPU. Bei Auffälligkeit ab 0,3 ‰ relative Fahruntüchtigkeit. Wäre eigene FAQ-Frage wert.
- **P3-3 § 69 StGB Entziehung der Fahrerlaubnis + § 69a StGB Sperrfrist** (mind. 6 Monate) nicht zitiert.
- **P3-4 Versicherungs-Hinweis Z. 452 ungenau**: „Kfz-Versicherung kann Leistung kürzen oder verweigern". Genauer: KH-Versicherung Regress bis 5.000 € (§ 5 KfzPflVV), Kasko bis 100% Kürzung (BGH).
- **P3-5 Tagessätze für § 316 StGB-Strafe**: Üblich 30–60 Tagessätze; Konfig erwähnt nur „Geld-/Freiheitsstrafe".
- **P3-6 EU-Vergleich**: Italien, Spanien etc. mit 0,5 ‰; Tschechien 0,0 ‰. Nur Polish.

**Bewertung:** Solide P3-only. Keine kritischen Fehler in Werten. 0× P1/P2, 6× P3.

---

### B6: rechtsschutz-rechner (Z. 481–543)

**Rechtsstand-Check:** ✓ Bausteine (Privat, Beruf, Verkehr, Miet) · ✓ Selbstbeteiligung-Logik · ✓ Wartezeit 3 Mon. (außer Verkehr oft sofort) · ✓ Freie Anwaltswahl · ✓ Rabatt-Mechanismen (jährliche Zahlweise, SB)

**Beispielrechnung Z. 491:** „(15 + 8 + 5) × 1,0 × 0,90 × 1,0 = 25,20 €/Mon" → 28 × 0,9 = 25,20 ✓

**Befunde:**

- **P3-1 § 127 Abs. 1 VVG (freie Anwaltswahl)** zitieren.
- **P3-2 § 4 Abs. 1 Nr. 1 ARB (Rückwirkungsverbot)**: Konfig erwähnt das implizit (Z. 508), aber Norm fehlt.
- **P3-3 Berufs-Faktor in Formel intransparent** (Z. 490): „Monatsbeitrag = (Summe Bausteine) × **Berufs-Faktor** × ..." — was ist der Berufs-Faktor? Nicht definiert in Erklärtext. Vermutung: Single = 1,0; Familie/Selbstständig = 1,1–1,3. Sollte expliziert sein.
- **P3-4 Disclaimer als Schätzung** könnte deutlicher sein. Z. 484 sagt „Geschätzte Kosten" — gut. Aber im Beispiel und in den FAQs fehlt der Hinweis „individuelle Angebote weichen ab".

**Bewertung:** Solide P3-only. Schätz-Charakter und Faktor-Transparenz sind die einzigen substantiellen Punkte. 0× P1/P2, 4× P3.

---

### B7: freelancer-stundensatz-rechner (Z. 545–607)

**Rechtsstand-Check:** ✓ Wunsch-Netto + KV + Rente + Betrieb · ✓ Steuersatz-Hochrechnung über (1 − Steuersatz) · ✓ Fakturierbare Stunden 1.000–1.400/Jahr · ✓ § 19 UStG Kleinunternehmer · ✓ Branchenwerte 2026 plausibel

**Beispielwert-Verifikation Z. 555:** „3.950 € ÷ 0,7 = 5.643 €/Mon × 12 = 67.714 € ÷ 1.200 Std = 56,43 €/Std netto"
Math: 3.950/0,7 = 5.642,857; ×12 = 67.714,28; /1.200 = 56,43 ✓

**Befunde:**

- **P2-1 § 19 UStG Kleinunternehmer-Schwelle 2025 unvollständig** (Z. 572, 600):

  Konfig sagt: „Jahresumsatz unter 25.000 Euro (ab 2025)" — das ist nur die **Vorjahres-Schwelle**.

  Tatsächlich seit Wachstumschancengesetz vom 27.03.2024, gültig ab 01.01.2025, § 19 UStG n.F.:
  - **Vorjahresumsatz ≤ 25.000 €** (vorher 22.000 €) — ✓ wird genannt
  - **Laufender Jahresumsatz ≤ 100.000 €** — **fehlt im Konfig komplett**

  Beide Schwellen müssen erfüllt sein. Wer im laufenden Jahr 100.000 € überschreitet, verliert die KU-Eigenschaft mit dem Tag der Überschreitung.

  **Fix:** Beide Schwellen erwähnen:
  > „Die Kleinunternehmerregelung (§ 19 UStG, Stand 2025) gilt, wenn (1) der Vorjahresumsatz 25.000 € nicht überstiegen hat und (2) der voraussichtliche Umsatz im laufenden Jahr 100.000 € nicht überschreitet. Wird die 100.000-€-Grenze unterjährig überschritten, entfällt die Befreiung mit dem Überschreitungstag."

- **P3-1 § 18 EStG vs. § 15 EStG** (Freier Beruf vs. Gewerbe) nicht erwähnt: Wichtig wegen Gewerbesteuerpflicht. Freelancer mit „freiem Beruf" zahlen keine Gewerbesteuer.
- **P3-2 KSK Künstlersozialkasse** für Künstler/Publizisten als Sparoption (Hälfte der SV-Beiträge) fehlt.
- **P3-3 GKV-Beitrag-Spanne 450–900 €**: Plausibel für mittlere Einkommen, aber Mindestbeitrag (~225 €/Mon, freiwillig auf Mindesteinkommen) und BBG-Cap (~870 €/Mon) sind die Eckpunkte. Klarstellung: Beitrag richtet sich nach Einkommen mit BBG-Cap.
- **P3-4 SV-Pflicht für arbeitnehmerähnliche Selbstständige** (z.B. Lehrer, Pfleger, Altenpfleger nach § 2 SGB VI) fehlt — wichtige Ausnahme von der Wahlfreiheit.

**Bewertung:** **Wichtigster Block-B-Befund**: § 19 UStG-100k-Cap fehlt. 0× P1, 1× P2, 4× P3.

---

### B8: kuendigungsfrist-rechner

**Bereits in Block A behandelt** (A2). Im Block-A-Scope wegen § 622 BGB rechtssensitivem Charakter.

---

### B9: teilzeit-rechner (Z. 694–764)

**Rechtsstand-Check:** ✓ Brutto-Formel proportional · ✓ Stundenlohn bleibt gleich · ✓ Urlaubstage-Formel (Tage/5) · ✓ § 8 TzBfG Recht auf Teilzeit (15 AN, 6 Mon, 3 Mon Frist) · ✓ § 9a TzBfG Brückenteilzeit (45 AN, 1–5 Jahre) · ✓ Steuerprogression-Effekt · ✓ Rentenpunkte sinken proportional

**Beispielwert-Verifikation Z. 704:** „3.500 € Vollzeit bei 40h → 30h Teilzeit = 2.625 € Brutto, ca. 1.890 € Netto (Stkl. I, NRW)"
Math Brutto: 3.500 × 30/40 = 2.625 ✓
Netto: ~1.890 € bei Stkl. I in NRW ist plausibel (SV ~21,8% = 572 €; LSt ~125 €; Kirchensteuer NRW 9% von LSt ~11 €; Netto ~1.917 € — Konfigwert leicht konservativ, innerhalb 2% Toleranz). ✓

**Rentenpunkte-Beispiel Z. 731:** „Bei 3.500 € Vollzeit-Brutto: ca. 0,9 EP/Jahr"
Math: Durchschnittsentgelt 2026 = 51.944 €/Jahr → 4.328,67 €/Mon. 3.500 / 4.328,67 = **0,8086 EP/Jahr**. Konfig 0,9 ist leicht hoch (~10%). „Etwa" formuliert, daher tolerierbar.

**170 €/Monat-Rentenrechnung Z. 731:** „20 J Teilzeit → 170 € weniger Rente"
Math: Diff EP = 0,9 − 0,68 = 0,22; ×20 = 4,4 EP. Aktueller Rentenwert: 40,79 € (1. HJ 2026) bzw. 42,52 € (ab 01.07.2026). 4,4 × 40,79 = **179 €**. Konfig 170 € liegt 5% unter. ✓ akzeptabel.

**Befunde:**

- **P3-1 § 9 TzBfG Aufstockungsanspruch fehlt**: Teilzeitkräfte haben Vorrang bei Vollzeit-Stellen im Unternehmen — relevant für Rückkehr aus klassischer Teilzeit.
- **P3-2 § 8 Abs. 5 TzBfG Genehmigungsfiktion** korrekt erwähnt (Z. 721) — gut.
- **P3-3 Rentenwert-Stichtag** (40,79 → 42,52 € am 01.07.2026): Konfig könnte aktuell sein, aber Beispielwert „170 €" ist mit altem Rentenwert gerechnet. Polish.
- **P3-4 Teilzeit in Elternzeit (§ 15 BEEG, 32h)** als Querverweis zu A9 — könnte verlinken.

**Bewertung:** Sehr solide. 0× P1/P2, 4× P3.

---

### B10: arbeitstage-rechner (Z. 1028–1099)

**Rechtsstand-Check:** ✓ Werktage Mo–Sa vs. Arbeitstage Mo–Fr · ✓ 9 bundesweite Feiertage · ✓ Bayern 13 reguläre Feiertage · ✓ Frauentag in Berlin/MV · ✓ Sachsen Buß- und Bettag · ✓ Wochenend-Feiertage werden nicht nachgeholt · ✓ Bundesurlaubsgesetz Werktag-Definition

**Feiertage-Verifikation 2026:**
- Neujahr (Do 01.01.) ✓
- Karfreitag (Fr 03.04.2026, Ostern = So 05.04.) ✓
- Ostermontag (Mo 06.04.) ✓
- Tag der Arbeit (Fr 01.05.) ✓
- Christi Himmelfahrt (Do 14.05., Ostern + 39 Tage) ✓
- Pfingstmontag (Mo 25.05., Ostern + 50 Tage) ✓
- Tag der Deutschen Einheit (Sa 03.10.) ✓ — fällt aufs Wochenende, wird nicht nachgeholt
- 1. Weihnachtstag (Fr 25.12.) ✓
- 2. Weihnachtstag (Sa 26.12.) ✓
- Fronleichnam (Do 04.06., Ostern + 60 Tage) ✓ in BW/BY/HE/NW/RP/SL

**Befunde:**

- **P2-1 Werktage Mo–Fr 2026: Off-by-one in FAQ Z. 1080**:

  Konfig sagt: „2026 hat insgesamt 365 Tage, davon 260 Werktage (Mo–Fr)."

  **Korrekt sind 261 Werktage Mo–Fr in 2026.**

  Berechnung: 365 Tage / 7 = 52 Wochen + 1 Tag. Bei 365-Tage-Jahr ist der „Extra-Tag" der Wochentag des 01.01. → 01.01.2026 ist Donnerstag → 53 Donnerstage, je 52 von Mo/Di/Mi/Fr/Sa/So. Mo–Fr = 52+52+52+53+52 = **261**.

  Wenn der Rechner die Werktage live berechnet (was er sollte), gibt er 261 zurück — der FAQ-Text widerspricht dann der Live-Ausgabe. Oder die Logik ist genauso falsch wie der Text.

  **Fix:** „260" → „261" in Z. 1080. Component prüfen.

- **P3-1 Beispielrechnung Z. 1096 mehrdeutig**:

  „3.500 € Monatsgehalt, Januar 2026 hat 21 Arbeitstage, Eintritt am 15.01. → **11 gearbeitete Tage** → 3.500 ÷ 21 × 11 = 1.833 €."

  Math: 15.01.2026 = Donnerstag. Tage 15.–31. Januar 2026 enthalten 12 Werktage Mo–Fr (15./16./19./20./21./22./23./26./27./28./29./30. — alle ohne Feiertag im Januar nach Neujahr).

  Konfig sagt 11 Werktage. **Off-by-one** je nach Lesart:
  - „Eintritt am 15." = ab 15. wird gearbeitet → 12 Werktage
  - „Eintritt zum 15." = ab 16. wird gearbeitet → 11 Werktage

  Übliche arbeitsrechtliche Lesart: Eintritt = erster Arbeitstag → 12. Im Konfig wird vermutlich „Eintritt = Vertragsbeginn, Arbeit ab Folgetag" angesetzt. Klarstellung im Beispiel oder Korrektur auf 12.

- **P3-2 „Werktage" vs. „Arbeitstage"-Definition** (Z. 1058) — Konfig erklärt das gut.

- **P3-3 Brückentage Z. 1054**: „Weihnachten 2026 (Fr+Sa): Brückentag am 28.12. → 4 Tage Urlaub = 9 freie Tage." Verifikation: 28.12.2026 = Mo. Mit 4 Urlaubstagen (28./29./30./31.12.) hat man 25.12.(Fr) bis 03.01.2027(So) = 10 Tage frei (inklusive 01.01.27 Fr Neujahr). Konfig sagt 9 — Off-by-one je nachdem wie man zählt. Polish.

- **P3-4 Mariä Himmelfahrt** (15.08., nur in Bayern in Gemeinden mit überwiegend kath. Bevölkerung; im Saarland generell): nicht erwähnt.

- **P3-5 § 8 ArbZG zur Sonn- und Feiertagsruhe** zitieren (Z. 55).

**Bewertung:** **Wichtigster Block-B-Faktenfehler**: 260 vs. 261 Werktage. Konsequenzen: Falls die Rechner-Logik den gleichen Off-by-one hat, wären Pendlerpauschale-Schätzungen und Gehaltsanteilberechnungen leicht falsch. Sollte definitiv geprüft und korrigiert werden. 1× P2, 5× P3.

---

## Block-B-Gesamt-Befunde

### P2-Befunde

| # | Rechner | Befund | Aufwand |
|---|---|---|---|
| P2-B1 | arbeitszeit | „darauf basierende Gesetzgebung" → klarstellen, dass es nur Referentenentwurf ist; Auslegung des § 3 Abs. 2 Nr. 1 ArbSchG ist die Quelle | 30 Min |
| P2-B7 | freelancer-stundensatz | § 19 UStG-Schwelle 100.000 € im laufenden Jahr ergänzen | 20 Min |
| P2-B10 | arbeitstage | Werktage Mo–Fr 2026: 260 → 261 in FAQ; Component-Code prüfen, ob Live-Logik korrekt rechnet | 30 Min |

### P3-UX (~28 Punkte)

Sammelthemen:
- **§-Zitate ergänzen** (B1: § 5 ArbZG; B2: BUrlG-Klauseln; B3: § 199 BGB; B5: § 24a StVG, § 69 StGB; B6: § 127 VVG)
- **EuGH-Rechtsprechung** ergänzen (B1: CCOO; B2: Verfallrechtsprechung; B3: Beweislast-Update)
- **Edge-Case-FAQs**: B5 Fahrradfahrer-Grenzen; B7 § 18 EStG vs. § 15 EStG; B9 § 9 TzBfG Aufstockung
- **2025/2026-Updates**: B7 KU-Schwelle 100k; B9 Rentenwert 42,52 €

### Slug-Drift Block B

**Keine Befunde.** Alle 8 Block-B-Rechner haben konsistent `kategorie: 'Arbeit & Recht'` und `kategorieSlug: 'arbeit'`.

---

## Folge-Prompts-Vorschlag Block B

**Prompt 152 (P2-Block B):**
- B1 ArbZG-Erfassungspflicht klarstellen
- B7 § 19 UStG-100k-Cap ergänzen
- B10 Werktage 260 → 261 + Component-Audit

**Prompt 153 (P3-UX Block B + Block A P3):** Sammelpolish, kann mit Block-A-P3 (Prompt 151) zusammen ausgeführt werden — insgesamt ~45 P3-Punkte über alle 18 Arbeit-Rechner.

---

## Methodik-Lehren aus Block B

- **Off-by-one in Faktenangaben ist subtil aber schädlich**: Die 260/261-Werktage-Differenz wird Nutzern sofort auffallen, wenn sie den Rechner mit dem FAQ vergleichen. **Zukünftige Audits sollten Faktenangaben in FAQ und Erklärtext gegen Live-Berechnungen abgleichen** — automatisierter Verify-Test wäre sinnvoll.

- **Gesetzgebungs-Status-Drift**: B1 (ArbZG-Erfassung) und B7 (§ 19 UStG) zeigen beide Update-Lücken, die seit 2024/2025 bestehen. Es lohnt sich, vor jeder Welle die jüngsten BGBl.-Änderungen pro Themengebiet systematisch durchzugehen. Karsten könnte einen jährlichen „Rechtsstand-Snapshot" als Vorbereitung jeder Welle einplanen.

- **Niedrige Bug-Dichte in Block B**: 0× P1 in 8 Rechnern bestätigt, dass die Welle-2-Methodik (4-Punkt-Audit nach Wohnen-Welle) für nicht-rechtssensitive Rechner gut greift. Block A war mit 4× P1 deutlich anspruchsvoller wegen tiefer juristischer Spezialmaterie (Familienrecht, ALG, Mutterschutz).

- **Block-A vs. Block-B-Verteilung war richtig**: Die Sortierung „rechtssensitive zuerst" hat Karsten erlaubt, die kritischen Befunde zuerst zu sehen. Block B ist überwiegend Polish-Niveau.

---

## Welle-2-Stufe-3-Arbeit Gesamtstand

**Beide Blöcke abgeschlossen:**

| | Block A (10) | Block B (8) | Gesamt |
|---|---|---|---|
| P1 | 4 | 0 | **4** |
| P2 | 6 | 3 | **9** |
| P3 | ~17 | ~28 | **~45** |
| Slug-Drift | 1 | 0 | **1** |

**Insgesamt 13 substantielle Befunde (P1+P2)** über 18 Arbeit-Rechner. Im Vergleich zu Welle 2 Stufe 3 Wohnen (5 P1 + 3 P2 in 25 Rechnern, mit weniger juristischer Spezialmaterie) plausibel.

**Empfohlene Bearbeitungsreihenfolge:**
1. **Prompt 149 P1-Block** (Block A, 4 Befunde, kritischste zuerst)
2. **Prompt 150 P2-Block A** (6 Befunde)
3. **Prompt 152 P2-Block B** (3 Befunde)
4. **Prompt 151 + 153 P3-Sammelpolish** (45 Punkte gemeinsam)
5. **Karsten klärt P1-A8** (arbeitslosengeld-rechner Slug-Drift) **VORAB**
6. **Welle-2-Stufe-3-Arbeit-Abschluss in welle-status-historie.md vermerken**

**SSOT-Refactor-Backlog für Welle 3:**
- `lib/berechnungen/rvg.ts` (NEU) — A5
- `lib/berechnungen/vpi.ts` Konsumption — A6 (Pflicht!)
- `lib/berechnungen/duesseldorfer-tabelle.ts` Konsumption — A7, A10
- `lib/berechnungen/sv-parameter.ts` Konsumption — A8

---

**Bericht-Stand:** 25.04.2026, Welle-2-Stufe-3-Arbeit komplett. Bereit für Folge-Prompts in Claude Code.
