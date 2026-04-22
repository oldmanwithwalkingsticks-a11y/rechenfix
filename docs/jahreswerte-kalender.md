# Jahreswerte-Kalender — rechenfix.de

**Zweck:** Zentrales Tracking aller gesetzlichen Werte, Stichtage und Rechtsgrundlagen. Regiebuch für die halbjährlichen Audits. Jede Änderung wird hier dokumentiert, nicht nur im Code.

**Pflege:** Bei jeder Parameter-Aktualisierung im Code **auch** diese Datei committen (neuer Wert + "letzter Check"-Datum). Git-Log ist damit die Änderungshistorie.

---

## 🗓️ Nächste anstehende Stichtage

| Datum | Parameter | Aktion | Status |
|---|---|---|---|
| **01.07.2026** | Rentenwert 40,79 € → 42,52 € | **Switch aktiv** — automatischer Wechsel in `rente.ts` | ✅ vorbereitet |
| **01.07.2026** | Pfändungsfreigrenze 1.555 € → 1.587,40 € | **Switch aktiv** — automatischer Wechsel in `pfaendung.ts` | ✅ vorbereitet |
| **~Oktober 2026** | SV-Rechengrößenverordnung 2027 | Neue BBG-Werte in `brutto-netto.ts` einpflegen (Switch auf 01.01.2027) | ⏳ warten auf Bekanntgabe |
| **~November 2026** | Inflationsausgleichsgesetz 2027 | Grundfreibetrag + ESt-Zonengrenzen in `einkommensteuer.ts` einpflegen | ⏳ warten auf Bekanntgabe |
| **01.01.2027** | Mindestlohn 13,90 € → 14,60 € | **Switch aktiv** — automatischer Wechsel in `mindestlohn.ts` | ✅ vorbereitet |
| **01.01.2027** | Minijob-Grenze 603 € → 633 € | **Switch aktiv** — abgeleitet aus Mindestlohn | ✅ vorbereitet |
| **01.01.2027** | Grundfreibetrag ESt | Neuer Wert + Zonen-Anpassung in `einkommensteuer.ts` | ⏳ warten |
| **01.01.2027** | Kinderfreibetrag | Neuer sächlicher Teil in `kindergeld.ts` | ⏳ warten |
| **01.01.2027** | Altersentlastungsbetrag Kohorte 2026 | Neue Zeile in Jahrgangsstaffel | ⏳ warten |

---

## 📋 Vollständige Parameter-Tabelle

### Einkommensteuer / Lohnsteuer

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Grundfreibetrag | 12.348 € | § 32a EStG | Inflationsausgleichsgesetz, i.d.R. Nov/Dez | `einkommensteuer.ts` | — | 19.04.2026 |
| ESt-Zonengrenzen | 17.799 / 69.878 / 277.826 € | § 32a EStG | wie oben | `einkommensteuer.ts` | — | 19.04.2026 |
| Werbungskostenpauschale | 1.230 € | § 9a Nr. 1 EStG | i.d.R. unverändert | `einkommensteuer.ts` | — | 19.04.2026 |
| Sonderausgabenpauschale | 36 € | § 10c EStG | unverändert | `einkommensteuer.ts` | — | 19.04.2026 |
| Soli-Freigrenze (Grundtarif) | 20.350 € | § 3 Abs. 3 SolzG | jährlich Inflationsausgleich | `einkommensteuer.ts` | — | 19.04.2026 |
| Soli-Milderungsgrenze | 37.838 € | § 3 Abs. 3 SolzG | wie oben | `einkommensteuer.ts` | — | 19.04.2026 |
| KiSt-Satz BY/BW | 8 % | Landes-KiStG | selten | `einkommensteuer.ts` | — | 19.04.2026 |
| KiSt-Satz übrige | 9 % | Landes-KiStG | selten | `einkommensteuer.ts` | — | 19.04.2026 |
| Altersentlastungsbetrag (Kohorte 2025) | 12,8 % / max. 608 € | § 24a EStG | Staffel bis 2058 | `einkommensteuer.ts` | jährliche Kohorte | 19.04.2026 |
| Pendlerpauschale | 0,38 €/km ab 1. km | § 9 Abs. 1 Nr. 4 EStG (StÄndG 2025) | unverändert geplant | `pendlerpauschale.ts` | — | 19.04.2026 |
| Pendler-Höchstbetrag (Nicht-PKW) | 4.500 €/Jahr | § 9 Abs. 1 Nr. 4 EStG | unverändert | `pendlerpauschale.ts` | — | 19.04.2026 |

### Familie

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Kindergeld | 259 €/Monat/Kind | § 66 EStG | i.d.R. jährlich | `kindergeld.ts` | — | 19.04.2026 |
| Kinderfreibetrag sächlich (zusammen) | 6.828 € | § 32 Abs. 6 EStG | Existenzminimumbericht | `kindergeld.ts` | — | 19.04.2026 |
| BEA-Freibetrag (zusammen) | 2.928 € | § 32 Abs. 6 EStG | seit 2021 unverändert | `kindergeld.ts` | — | 19.04.2026 |
| Kinderfreibetrag gesamt (zusammen) | 9.756 € | Summe | — | `kindergeld.ts` | — | 19.04.2026 |
| Kinderfreibetrag gesamt (einzeln) | 4.878 € | Halber Anteil | — | `kindergeld.ts` | — | 19.04.2026 |

### Sozialversicherung

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| BBG RV (Monat) | 8.450 € | SV-RechGrV | i.d.R. Oktober des Vorjahrs | `brutto-netto.ts` | — | 19.04.2026 |
| BBG RV (Jahr) | 101.400 € | SV-RechGrV | wie oben | `brutto-netto.ts` | — | 19.04.2026 |
| BBG KV/PV (Monat) | 5.812,50 € | SV-RechGrV | wie oben | `brutto-netto.ts` | — | 19.04.2026 |
| BBG KV/PV (Jahr) | 69.750 € | SV-RechGrV | wie oben | `brutto-netto.ts` | — | 19.04.2026 |
| Durchschnittsentgelt (vorläufig) | 51.944 € | Anlage 1 SGB VI | Oktober vorläufig, März final | `rente.ts` | — | 19.04.2026 |
| Rentenwert (bis 30.06.2026) | 40,79 € | § 255 SGB VI | Rentenwert-VO | `rente.ts` | ✅ 01.07.2026 → 42,52 € | 19.04.2026 |
| Rentenwert (ab 01.07.2026) | 42,52 € | § 255 SGB VI | Rentenwert-VO 2026 | `rente.ts` | automatisch | 19.04.2026 |
| PV-Beitrag AN (Standard) | 1,8 % | § 55 SGB XI | selten | `pflegeversicherung.ts` | — | 19.04.2026 |
| PV-Beitrag AN (kinderlos) | 2,4 % | § 55 SGB XI | wie oben | `pflegeversicherung.ts` | — | 19.04.2026 |
| PV-Kinderabschlag Staffel | 1,55 / 1,30 / 1,05 / 0,80 % | § 55 Abs. 3 SGB XI | wie oben | `pflegeversicherung.ts` | — | 19.04.2026 |
| Witwenrente-Faktor (neues Recht, groß) | 55 % | § 46 SGB VI | — | inline in `WitwenrenteRechner` | — | 19.04.2026 |
| Krankengeld-Höchstsatz | 135,63 €/Tag (= BBG × 70 % / 30) | § 47 SGB V | BBG-abhängig | `KrankengeldRechner` | — | 19.04.2026 |

### Arbeit

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Mindestlohn (bis 31.12.2026) | 13,90 € | MiLoG | Mindestlohnkommission | `mindestlohn.ts` | ✅ 01.01.2027 → 14,60 € | 19.04.2026 |
| Mindestlohn (ab 01.01.2027) | 14,60 € | MiLoG | Mindestlohnkommission | `mindestlohn.ts` | automatisch | 19.04.2026 |
| Minijob-Grenze (bis 31.12.2026) | 603 €/Monat | § 8 SGB IV | abgeleitet aus Mindestlohn × 130 / 3 | `mindestlohn.ts` | ✅ 01.01.2027 → 633 € | 19.04.2026 |
| Midijob-Obergrenze | 2.000 €/Monat | § 20 Abs. 2 SGB IV | i.d.R. unverändert | `brutto-netto.ts` (falls vorhanden) | — | 19.04.2026 |
| Urlaub-Mindest (5-Tage-Woche) | 20 Arbeitstage/Jahr | § 3 BUrlG | unverändert | n/a | — | 19.04.2026 |
| Kündigungsfrist (§ 622 BGB Staffel) | unverändert | § 622 BGB | unverändert | n/a | — | 19.04.2026 |

### Pfändung / Unterhalt

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Pfändungsfreigrenze (bis 30.06.2026) | 1.555 € | § 850c ZPO i.V.m. PfändFreiGr-Bek | BGBl. | `pfaendung.ts` | ✅ 01.07.2026 → 1.587,40 € | 19.04.2026 |
| Pfändungsfreigrenze (ab 01.07.2026) | 1.587,40 € | BGBl. 2026 I Nr. 80 | schon vorbereitet | `pfaendung.ts` | automatisch | 19.04.2026 |
| DT 2026 Mindestbedarf (1. Altersstufe) | 486 € | Düsseldorfer Tabelle 2026 | OLG Düsseldorf | `duesseldorfer-tabelle.ts` | — | 19.04.2026 |
| Elternunterhalt-Schwelle | 2.650 € + 70 % anrechnungsfrei | BGH XII ZB 6/24 | — | `duesseldorfer-tabelle.ts` | — | 19.04.2026 |

### BAföG (Prompt 121, 22.04.2026)

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Grundbedarf Studium (eigene Wohnung) | 855 € (= 475 + 380) | § 13 Abs. 1 Nr. 2 + Abs. 2 Nr. 2 BAföG | 29. BAföG-ÄndG v. 23.07.2024 | `bafoeg-parameter.ts` (`BAFOEG_AB_2024_08_01.bedarf.studium.eigene`) | WS 2026/27 offen | 22.04.2026 |
| Grundbedarf Studium (bei Eltern) | 534 € | § 13 Abs. 2 Nr. 1 BAföG | wie oben | `bafoeg-parameter.ts` | WS 2026/27 offen | 22.04.2026 |
| Wohnpauschale Studium (auswärts) | 380 € | § 13 Abs. 2 Nr. 2 BAföG | wie oben | `bafoeg-parameter.ts` | KoaV-Plan 440 € noch nicht verabschiedet | 22.04.2026 |
| Wohnpauschale Schule (auswärts) | 370 € | § 13 BAföG | wie oben | `bafoeg-parameter.ts` | WS 2026/27 offen | 22.04.2026 |
| KV-Zuschlag Studium (bis 30 J.) | 102 €/Monat | § 13a BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| PV-Zuschlag Studium (bis 30 J.) | 35 €/Monat | § 13a BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| Kinderbetreuungszuschlag § 14b | 160 €/Monat pro Kind | § 14b BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| Elternfreibetrag verheiratet | 2.415 € | § 25 Abs. 1 BAföG | wie oben | `bafoeg-parameter.ts` (`freibetraege.elternVerheiratet`) | — | 22.04.2026 |
| Elternfreibetrag alleinstehend | 1.605 € | § 25 Abs. 1 BAföG | wie oben | `bafoeg-parameter.ts` (`freibetraege.elternAlleinstehend`) | — | 22.04.2026 |
| Freibetrag Geschwister § 25 Abs. 3 | 730 €/Kind | § 25 Abs. 3 BAföG | wie oben | `bafoeg-parameter.ts` (`freibetraege.proGeschwister`) | — | 22.04.2026 |
| Freibetrag eigenes Einkommen | 330 €/Monat (Minijob-Grenze) | § 23 BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| Vermögensfreibetrag < 30 J. | 15.000 € | § 29 BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| Vermögensfreibetrag ≥ 30 J. | 45.000 € | § 29 BAföG | wie oben | `bafoeg-parameter.ts` | — | 22.04.2026 |
| Anrechnungsquote Eltern | 0,50 − 0,05 × Geschwister (min 0, max 0,50) | § 25 Abs. 6 S. 1 BAföG | BMBF-FAQ (Antragsteller NICHT mitgezählt) | `bafoeg-parameter.ts` via `getAnrechnungsquote()` | — | 22.04.2026 |
| Höchstsatz Studium (auswärts, selbstvers., bis 30 J.) | 992 € | Summe § 13 + § 13a | wie oben | aus `bafoeg-parameter.ts` abgeleitet | WS 2026/27 offen | 22.04.2026 |
| Bagatellgrenze | 10 € | § 51 Abs. 4 BAföG | unverändert | `bafoeg-parameter.ts` | — | 22.04.2026 |

### Bürgergeld (Prompt 121, 22.04.2026)

| Parameter | Wert 2026 | Rechtsgrundlage | Bekanntgabe | Zentrale Lib | Switch | Letzter Check |
|---|---|---|---|---|---|---|
| Regelsatz Alleinstehend (RSS1) | 563 € | § 20 SGB II RBS | Regelbedarfsstufen-Fortschreibung (Nullrunde 2026) | `buergergeld-parameter.ts` (`BUERGERGELD_2026_H1.regelsaetze.alleinstehend`) | 01.07.2026 H2-Skeleton | 22.04.2026 |
| Regelsatz Partner (RSS2) | 506 € | § 20 SGB II RBS | wie oben | `buergergeld-parameter.ts` | 01.07.2026 H2-Skeleton | 22.04.2026 |
| Regelsatz Kinder 14–17 (RSS3) | 471 € | § 20 SGB II RBS | wie oben | `buergergeld-parameter.ts` | 01.07.2026 H2-Skeleton | 22.04.2026 |
| Regelsatz Kinder 6–13 (RSS4) | 390 € | § 20 SGB II RBS | wie oben | `buergergeld-parameter.ts` | 01.07.2026 H2-Skeleton | 22.04.2026 |
| Regelsatz Kinder 0–5 (RSS5/6) | 357 € | § 20 SGB II RBS | wie oben | `buergergeld-parameter.ts` | 01.07.2026 H2-Skeleton | 22.04.2026 |
| Mehrbedarf Schwangerschaft ab 13. SSW | 17 % Regelsatz | § 21 Abs. 2 SGB II | — | `buergergeld-parameter.ts` | — | 22.04.2026 |
| Mehrbedarf Alleinerziehend Nr. 1 | 36 % (bei spezifischer Konstellation Alter/Zahl der Kinder) | § 21 Abs. 3 Nr. 1 SGB II | — | `buergergeld-parameter.ts` | — | 22.04.2026 |
| Mehrbedarf Alleinerziehend Nr. 2 | 12 % × Kinderzahl | § 21 Abs. 3 Nr. 2 SGB II | — | `buergergeld-parameter.ts` | — | 22.04.2026 |
| Mehrbedarf Alleinerziehend Deckel | 60 % Regelsatz | § 21 Abs. 3 SGB II (max-Klausel) | — | `buergergeld.ts` (`berechneMehrbedarfe`) | — | 22.04.2026 |
| Mehrbedarf Behinderung + Eingliederungshilfe | 35 % | § 21 Abs. 4 SGB II | — | `buergergeld-parameter.ts` | — | 22.04.2026 |
| Warmwasserzuschlag (altersgestaffelt) | 2,3 % / 1,4 % / 1,2 % / 0,8 % pro Person | § 21 Abs. 7 SGB II | — | `buergergeld-parameter.ts` | — | 22.04.2026 |
| Bürgergeld H2 „Neue Grundsicherung" | **Skeleton** — Parameter identisch zu H1 bis Gesetzestext | Koalitions-Entwurf, Stand 04/2026 | — | `buergergeld-parameter.ts` (`BUERGERGELD_2026_H2`) | **01.07.2026 Switch aktiv (noch ohne Effekt)** | 22.04.2026 |

---

## 🔔 Audit-Routine

### Dezember-Audit (für 01.01.-Wechsel)

**Idealer Zeitraum: 10.–20. Dezember** — bis dahin sind die meisten Gesetze verabschiedet und Werte bekannt.

**Checkliste:**

1. [ ] **Einkommensteuer** (Inflationsausgleichsgesetz meist Nov/Dez verabschiedet):
   - Grundfreibetrag
   - ESt-Zonengrenzen
   - Soli-Freigrenzen
   - Werbungskostenpauschale / Sonderausgabenpauschale
   - Quelle: https://www.bundesfinanzministerium.de/
2. [ ] **Kindergeld + Kinderfreibetrag**:
   - Kindergeld pro Monat (selten geändert, aber möglich)
   - Kinderfreibetrag sächlich (jährlich per Existenzminimumbericht)
   - BEA-Freibetrag (seit 2021 unverändert, aber prüfen)
   - Quelle: https://www.bmfsfj.de/ + Existenzminimumbericht
3. [ ] **Sozialversicherung** (SV-RechGrV meist Oktober bekanntgegeben):
   - BBG RV (Monat + Jahr)
   - BBG KV/PV (Monat + Jahr)
   - Durchschnittsentgelt (vorläufiger Wert)
   - Quelle: https://www.bmas.de/ + BGBl.
4. [ ] **Mindestlohn / Minijob** (Mindestlohnkommission typisch alle 2 Jahre):
   - Mindestlohn
   - Minijob-Grenze (abgeleitet)
   - Quelle: https://www.mindestlohn-kommission.de/
5. [ ] **Altersentlastungsbetrag**: neue Kohorten-Zeile für Jahrgang (X+1)-64, Prozentsatz −0,4 pp, Höchstbetrag −19 €
6. [ ] **Pendlerpauschale**: Politische Lage prüfen (Änderungs-Diskussionen?)
7. [ ] **PV-Beitragssätze**: Änderungen bei § 55 SGB XI?
8. [ ] **Midijob F-Faktor** § 20a Abs. 2 SGB IV (wird jährlich aus den Durchschnittsbeitragssätzen abgeleitet, gemeinsames Rundschreiben GKV-Spitzenverband / DRV Bund / BA):
   - `FAKTOR_F_2026` in `lib/berechnungen/midijob-uebergang.ts` → Wert für (X+1) prüfen und ggf. neue Konstante `FAKTOR_F_{X+1}` + Default anpassen
   - Quelle: https://www.gkv-spitzenverband.de/ (gemeinsame Rundschreiben)
9. [ ] **Lohnsteuer-PAP** § 39b EStG (BMF/ITZBund veröffentlicht den neuen Programmablaufplan typischerweise Oktober/November für das Folgejahr):
   - XML-Pseudocode herunterladen: `https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer{JAHR}.xml.xhtml`
   - SHA256 + Abruf-Datum in `docs/referenzen/itzbund-README.md` eintragen
   - Diffs zum Vorjahr analysieren: in der Regel nur Konstanten in `MPARA` (Grundfreibetrag, Zonengrenzen W1STKL5/W2STKL5/W3STKL5, BBG) + ggf. `UPTAB26`-Tarifformeln + SOLZFREI
   - Neue Datei `lib/berechnungen/_lohnsteuer-pap-{JAHR}.ts` durch Duplizieren und Konstanten-Austausch erzeugen
   - `berechneLohnsteuerJahr` in `lohnsteuer.ts` auf Jahres-Switch umstellen (analog Mindestlohn/Rentenwert-Pattern)
   - `scripts/verify-lohnsteuer-pap.ts` um neue Jahres-Stützpunkte erweitern (20 neue BMF-Werte gegen bmf-steuerrechner.de webbasiert verifizieren)
   - Quelle: https://www.bundesfinanzministerium.de/ (PAP-PDF) + https://www.bmf-steuerrechner.de/interface/pseudocodes.xhtml (XML)

**Nach dem Check:**
- Für jeden geänderten Parameter: Switch in der entsprechenden Lib einbauen (mit Stichtag 01.01.)
- In dieser Datei: "Letzter Check"-Datum aktualisieren, neue Werte eintragen
- Commit mit Message `chore: jahreswerte-audit Q4 YYYY`

### Juni-Audit (für 01.07.-Wechsel)

**Idealer Zeitraum: 01.–20. Juni.**

**Checkliste:**

1. [ ] **Rentenwert** (Rentenwert-VO meist Ende März/April verkündet):
   - Neuer Rentenwert ab 01.07.
   - Quelle: https://www.deutsche-rentenversicherung.de/ + BGBl.
2. [ ] **Pfändungsfreigrenzen** (§ 850c Abs. 4 ZPO: alle **zwei** Jahre zum 01.07.):
   - Grundfreibetrag + Unterhalts-Erhöhungssätze + Vollpfändungsgrenze
   - `PFAENDUNGSTABELLE_{JAHR}` in `pfaendung.ts` neu anlegen, `getAktuellePfaendungsParameter(stichtag)` um neues Switch-Datum erweitern
   - Amtliche Tabelle wird via 10-€-Stufen-Abrundung algorithmisch reproduziert — Werte-Update reicht
   - Quelle: Pfändungsfreigrenzenbekanntmachung im BGBl.
3. [ ] **Witwenrente-Freibetrag**: abhängig vom Rentenwert, bei Switch automatisch — aber formal checken
4. [ ] **Krankengeld-Höchstsatz**: abhängig von BBG, nur bei BBG-Anpassung relevant

### August-Audit (für BAföG-WS-Wechsel)

**Typischer Zeitraum: Anfang August** vor dem Wintersemester-Start.

**Checkliste:**

1. [ ] **BAföG-Bedarfssätze / Wohnpauschalen / KV+PV-Zuschläge** (§ 13 + § 13a BAföG, typische Erhöhung alle 2 Jahre via BAföG-ÄndG):
   - Grundbedarf Studium/Schule
   - Wohnpauschale auswärts + bei Eltern
   - KV/PV-Zuschlag bis 30 J. + ab 30 J.
   - `BEDARF`, `WOHNPAUSCHALE`, `KV_ZUSCHLAG`, `PV_ZUSCHLAG` in `bafoeg.ts`
   - Quelle: https://www.bmbf.de/ + BAföG-Gesetz i.d.F. des jeweiligen ÄndG

### Wohngeld-Dynamisierung (2-jährlich, typisch Herbst vor Inkrafttreten)

**Typischer Zeitraum: Oktober–Dezember** vor dem 01.01.-Wechsel (alle 2 Jahre: 2025, 2027, 2029 …).

**Checkliste:**

1. [ ] **Höchstbeträge § 12 WoGG Anlage 1**: komplette 35-Zellen-Matrix + ZUSCHLAG_PRO_PERSON
2. [ ] **Koeffizienten Anlage 1 WoGG**: a/b/c je Haushaltsgröße
3. [ ] **Freibeträge § 17 WoGG**: Erwerbstätigen-/Schwerbehinderten-/Alleinerziehenden-FB
4. [ ] **Heizkostenkomponente + Klimakomponente § 12 Abs. 6/7 WoGG**
   - Quelle: Verordnung zur Fortschreibung des Wohngeldes (BGBl.) + BMWSB

**Nach dem Check:**
- Wenn nicht schon durch einen früheren Switch vorbereitet: Switch mit Stichtag 01.07. einbauen
- "Letzter Check"-Datum aktualisieren
- Commit mit Message `chore: jahreswerte-audit Q2 YYYY`

### Ad-hoc-Audit (zwischendurch)

Wenn ein Gesetz verabschiedet wird, das einen Parameter ändert (z. B. StÄndG 2025 mit Pendlerpauschale-Reform im Dezember 2025 für 2026), **sofort** einen kleinen Mini-Audit für den betroffenen Parameter durchführen, nicht auf den nächsten Routine-Termin warten.

---

## 🗒️ Änderungshistorie dieser Datei

Neue Einträge oben anfügen.

### 2026-04-22 — Stufe-4b-Ergänzung (Prompt 121 + 122-doku-sync)
- Neue Sektion **BAföG** mit 16 Parametern (Bedarfe, Zuschläge, Freibeträge, Anrechnungsquote) aus `bafoeg-parameter.ts`
- Neue Sektion **Bürgergeld** mit 12 Parametern (Regelsätze RSS1–6, Mehrbedarfe § 21 Abs. 2–7 SGB II, Warmwasser-Staffel) aus `buergergeld-parameter.ts`
- Zwei neue Stichtag-Switches dokumentiert: BAföG WS 2026/27 (Skeleton bis Verordnung) und Bürgergeld H2 „Neue Grundsicherung" zum 01.07.2026 (Skeleton bis Gesetzestext)
- Wohngeld-Lib ist vorübergehend Explainer-Mode (Prompt 120d) — Wohngeld-Dynamisierung-Checkliste bleibt für 120c-Refactoring im Juni 2026 relevant

### 2026-04-19 — Initial-Befüllung
- Alle Parameter auf Stand Audit-Welle 1 Stufen 1+2
- Stichtag-Switches für Rentenwert, Pfändung, Mindestlohn, Minijob dokumentiert
- Nächste anstehende Termine: 01.07.2026 (Rente+Pfändung automatisch), Oktober-November 2026 (Vorbereitung 01.01.2027)

---

## 📚 Quellen-Sammlung

Für den Audit einmal pro Jahr gebräuchliche Informations-Quellen:

| Thema | URL |
|---|---|
| Bundesgesetzblatt (BGBl.) | https://www.bgbl.de/ |
| Gesetze im Internet | https://www.gesetze-im-internet.de/ |
| BMF (Steuern, Soli) | https://www.bundesfinanzministerium.de/ |
| BMAS (SV, Mindestlohn, Arbeit) | https://www.bmas.de/ |
| BMFSFJ (Familie, Elterngeld, Kindergeld) | https://www.bmfsfj.de/ |
| DRV (Rente) | https://www.deutsche-rentenversicherung.de/ |
| BA (Arbeitslosengeld) | https://www.arbeitsagentur.de/ |
| Mindestlohnkommission | https://www.mindestlohn-kommission.de/ |
| AOK / TK (KV/KG/PV für Arbeitgeber) | https://www.aok.de/fk/ + https://www.tk.de/firmenkunden |
| OLG Düsseldorf (DT) | https://www.olg-duesseldorf.nrw.de/ |
| Haufe (Steuer-/Arbeitsrecht-Lexikon, gute Zusammenfassungen) | https://www.haufe.de/ |
| BMF-Steuerrechner (ESt-Cross-Check) | https://www.bmf-steuerrechner.de/ |

---

**Pflege-Hinweis:** Diese Datei ist Teil der Projekt-Infrastruktur, nicht nur Doku. Bei jedem Audit oder Parameter-Update mit-committen.
