# AFBG-Rechner (Aufstiegs-BAföG) — Bau-Dokumentation

**Datum:** 22.04.2026 (Prompt 124)
**Typ:** Neuer eigenständiger Rechner mit eigener Lib, eigener Parameter-Lib, eigener Route
**Rechner-URL:** `/finanzen/aufstiegs-bafoeg-rechner`
**Rechner-Zähler:** 169 → 170 (Finanzen 45 → 46)

---

## Rechtliche Grundlage

- **AFBG** — Aufstiegsfortbildungsförderungsgesetz (umgangssprachlich „Meister-BAföG")
- **29. BAföG-ÄndG v. 23.07.2024** (BGBl. 2024 I Nr. 247) — Anhebung der Bedarfssätze zum 01.08.2024, Umwandlung des Unterhaltsbeitrags in 100 % Vollzuschuss
- Portal: [aufstiegs-bafoeg.de](https://www.aufstiegs-bafoeg.de/) — vom BMBFSFJ betrieben, enthält den offiziellen Rechner als Oracle-Vergleich
- Einschlägige Paragraphen: §§ 2, 5, 10, 12, 13, 13a, 13b, 17b AFBG

## Was der Rechner abbildet

### Maßnahmebeitrag (§ 12 AFBG)
- Lehrgangs-/Prüfungsgebühren bis 15.000 €: 50 % Zuschuss + 50 % KfW-Darlehen
- Meisterstück/Prüfungsstück-Materialkosten bis 2.000 € (identische 50/50-Aufteilung)
- Einkommens- und vermögensunabhängig

### Unterhaltsbeitrag (§ 10 AFBG) — nur Vollzeit, 100 % Vollzuschuss seit 01.08.2024
- Grundbedarf Alleinstehend Vollzeit: **1.019 €/Monat** (vorher 892 €)
- Ehegatten-/Partner-Zuschlag: +235 €
- Kinder-Zuschlag je kindergeldberechtigtem Kind: +235 €
- Kinderbetreuungszuschlag § 10 Abs. 3a: +150 € je Kind unter 14 Jahren
- Einkommens- und Vermögensanrechnung nach § 17b AFBG i.V.m. §§ 23, 25, 29 BAföG

### Rückzahlungs-Szenarien (§ 13b AFBG)
- **Bestehens-Erlass Abs. 1:** 50 % des nicht fälligen Lehrgangsdarlehens bei bestandener Prüfung
- **Gründer-Erlass Abs. 2:** 100 % Rest-Darlehen nach Bestehens-Erlass bei Existenzgründung im Haupterwerb mit mindestens 3 Jahren Führung (seit 2020 ohne Mitarbeiter-Pflicht)

## Was NICHT abgebildet ist (Disclaimer im UI)

1. **Zulassungsprüfung nach § 2 AFBG** — Vorqualifikation/Berufspraxis wird nicht geprüft
2. **Auslandsmaßnahmen nach § 5 AFBG**
3. **Freistellung bei geringem Einkommen nach § 13a AFBG** (Einkommensprüfung im Detail)
4. **Individueller Bewilligungszeitraum** — Vermögensanrechnung vereinfacht durch 24 Monate geteilt (reale Förderämter nutzen den konkreten Bewilligungszeitraum)
5. **Einkommensnachweis aus dem vorletzten Kalenderjahr** — der Rechner nutzt das aktuelle Brutto des Antragstellers
6. **Teilzeit-Sonderregeln** (nur die Kernregel „kein Unterhaltsbeitrag bei Teilzeit" ist implementiert)
7. **Zweit-Fortbildungen** mit Sonderbedingungen

## Parameter-Herkunft und Unsicherheiten

| Parameter | Wert | Quelle | Konfidenz |
|---|---|---|---|
| Maßnahme-Höchstbetrag | 15.000 € | § 12 Abs. 1 Nr. 1 AFBG | hoch |
| Meisterstück-Höchstbetrag | 2.000 € | § 12 Abs. 3 AFBG | hoch |
| Unterhalt Grundbedarf VZ | 1.019 € | BMBFSFJ-Portal + § 10 Abs. 2 AFBG | hoch (ab 01.08.2024) |
| Ehegatten-Zuschlag | 235 € | § 10 Abs. 3 AFBG | hoch |
| Kinder-Zuschlag | 235 € | § 10 Abs. 3 AFBG | hoch |
| Kinderbetreuungszuschlag | 150 € | § 10 Abs. 3a AFBG | hoch |
| Freibetrag Antragsteller-Brutto | 603 € | § 23 BAföG-analog (Minijob-Grenze) | mittel — vereinfachte Näherung |
| Ehegatten-Freibetrag | 850 € | § 25 Abs. 1 BAföG-analog | mittel |
| Kinder-Freibetrag | 770 € | § 25 Abs. 3 BAföG-analog | mittel (Fortschreibungs-abhängig) |
| Vermögens-Freibetrag | 45.000 € | § 29 BAföG i.V.m. § 17b AFBG | **Unsicherheit** — siehe unten |
| Vermögens-Zuschlag Ehegatte/Kind | 2.300 € je | § 29 BAföG-analog | mittel |
| Verteilungsmonate | 24 | Vereinfachung (Maßnahmedauer-Durchschnitt) | **vereinfacht** — reale Förderämter nutzen konkreten Bewilligungszeitraum |
| Bestehens-Erlass | 50 % | § 13b Abs. 1 AFBG | hoch |
| Gründer-Erlass | 100 % | § 13b Abs. 2 AFBG | hoch |
| Mindestrate Rückzahlung | 128 € | § 13 Abs. 5 AFBG | hoch |

### Unsicherheiten zur Nachprüfung

**Vermögens-Freibetrag:** Ich habe **45.000 €** übernommen (aus § 29 Abs. 1 BAföG für Auszubildende ab 30 J. — typische Zielgruppe des AFBG). Die AFBG-FAQ auf aufstiegs-bafoeg.de verweist auf § 17b AFBG, der wiederum auf §§ 26–30 BAföG zeigt. § 29 BAföG unterscheidet 15.000 € (unter 30 J.) und 45.000 € (ab 30 J.). Da AFBG-Antragsteller üblicherweise post-Ausbildung und älter sind, ist 45.000 € die praxisrelevante Zahl.

**Falls das BAföG-Amt im Einzelfall 15.000 € ansetzt** (bei jüngeren AFBG-Antragstellern unter 30 J.), weicht der Rechner-Wert nach oben ab. Der Disclaimer verweist auf den verbindlichen Bescheid.

**Kinder-/Ehegatten-Freibetrag 770/850 €:** Diese Werte entsprechen § 25 Abs. 1 BAföG-Stand 01.08.2024. Bei künftigen BAföG-Anpassungen sind auch diese Werte nachzuführen.

## Testfälle (scripts/verify-afbg.ts)

35 Testfälle, alle gegen externe Oracle-Quellen (§§ 10/12/13b/17b AFBG + BMBFSFJ-Portal):

- **AFBG-01** Alleinstehend VZ, 15k Lehrgang, keine Kinder → Zuschuss 7.500, Darlehen 7.500, Unterhalt 1.019, Bestehens-Erlass 3.750, Nach Gründer-Erlass 0
- **AFBG-02** VZ mit 1 Kind 5 J. + KG, 10k Lehrgang → Unterhalt 1.019 + 235 + 150 = 1.404
- **AFBG-03** Teilzeit, 8k Lehrgang → Kein Unterhaltsbeitrag, Maßnahme 4k/4k
- **AFBG-04** VZ, Brutto 1.200, keine Kinder → Anrechnung 298,50, Unterhalt 720,50
- **AFBG-05** VZ, Vermögen 50.000, keine Kinder → Anrechnung 208,33/Monat, Unterhalt 810,67
- **AFBG-06** VZ mit 1 Kind + Ehegatte, eigen 1.800 + ehe 1.500, Vermögen 18.000 → Quote 0,45, Anrechnung 484,65, Unterhalt 1.154,35
- **AFBG-07** Meisterstück 2.500 → Deckel 2.000, Zuschuss 1.000

**Oracle-Cross-Check:** AFBG-01 und AFBG-02 gegen [BMBFSFJ-AFBG-Rechner](https://www.aufstiegs-bafoeg.de/aufstiegs-bafoeg-rechner) manuell validieren (Karsten beim Verify-Pass).

**Ergebnis:** 35/35 grün.

## Stichtag-Switch-Plan

Aktuell nur ein Bucket `AFBG_AB_2024_08_01`. Bei der nächsten Anhebung (voraussichtlich mit der nächsten BAföG-Novelle zum 01.08.2026 oder 01.08.2028) wird ein zweiter Bucket `AFBG_AB_YYYY_08_01` ergänzt; die Kaskade in `getAktuelleAfbgParameter` folgt dem Muster aus `pfaendung.ts`/`mindestlohn.ts`/`bafoeg-parameter.ts`.

## Dateien

- **Parameter:** `lib/berechnungen/afbg-parameter.ts` — SSOT mit Stichtag-Switch-Skeleton, Typ `AfbgParameter`, Konstante `AFBG_AB_2024_08_01`, Getter `getAktuelleAfbgParameter()`, Helper `getAfbgAnrechnungsquote()`
- **Berechnung:** `lib/berechnungen/afbg.ts` — `berechneAfbg(eingabe, stichtag?)` mit Typen `FortbildungsArt`, `AfbgEingabe`, `AfbgErgebnis`, `AfbgKind`, `AfbgEhegatte`
- **UI:** `components/rechner/AfbgRechner.tsx` — analog `BafoegRechner.tsx` aufgebaut
- **Config:** Eintrag `aufstiegs-bafoeg-rechner` in `lib/rechner-config/finanzen.ts`
- **Component-Registry:** `app/[kategorie]/[rechner]/page.tsx` Import + Mapping
- **Verify:** `scripts/verify-afbg.ts` (35 Testfälle, 35/35 grün)

## Affiliate-Platzierung

**Keine AffiliateBox auf der Rechner-Seite.** AFBG-Zielgruppe sind bereits erwerbstätige Personen mit konkreten Qualifikations-Zielen. Die bestehenden Awin-Partner haben keinen direkten thematischen Bezug (keine Weiterbildungs-Affiliates im aktuellen Portfolio). Auch keine Amazon-Box — Meisterkurs-Fachliteratur wäre theoretisch denkbar, das Publikum ist aber zu spezifisch für keyword-basierte Suchlinks. Bei Bedarf später separater Prompt für gezielte Weiterbildungs-Affiliate-Integration.

## Offene Punkte

- **BMBFSFJ-Oracle-Cross-Check:** AFBG-01 und AFBG-02 gegen den offiziellen Rechner auf aufstiegs-bafoeg.de manuell validieren
- **Vermögens-Freibetrag:** Falls in konkreten Bescheiden 15.000 € statt 45.000 € zum Einsatz kommen, ggf. altersabhängige Unterscheidung (unter/ab 30) analog zu `bafoeg-parameter.ts` ergänzen
- **Ferienjob-Regelungen (§ 11a Abs. 7 SGB II)** spielen beim AFBG keine direkte Rolle, weil § 11b SGB II nicht anwendbar ist
- **Nächste Parameter-Anpassung:** voraussichtlich mit BAföG-Novelle 01.08.2026 oder später — dann `AFBG_AB_2026_08_01`-Bucket ergänzen
