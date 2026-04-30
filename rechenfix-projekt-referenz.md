# Rechenfix.de — Projekt-Referenz

Stand: 26.04.2026

## Was ist rechenfix.de?

Rechenfix.de ist ein deutschsprachiges Online-Rechner-Portal mit aktuell **170 kostenlosen Rechnern** in 9 Kategorien. Slogan: "Fix gerechnet!". Alleinstellungsmerkmal gegenüber Konkurrenz: **KI-Erklärungen** ("Fix erklärt") via Anthropic Claude API — kein anderer deutscher Rechner-Anbieter hat das. Alle Berechnungen erfolgen live im Browser ohne Submit-Button. WCAG 2.1 AA konform (Lighthouse ≥97).

- **URL:** https://www.rechenfix.de (IMMER mit www!)
- **Hosting:** Vercel
- **Domain:** rechenfix.de → 308 Redirect auf www.rechenfix.de
- **Zweite Domain:** rechenfix.vercel.app (soll ebenfalls redirecten)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript
- **KI:** Anthropic Claude API (für "Fix erklärt"-Feature)
- **Monetarisierung:** AdSense + Affiliate (Awin-Netzwerk)

## Rechner-Inventar (Stand 26.04.2026)

**170 eigenständige Rechner in 9 Kategorien** (Quelle: SSOT-Scan via `grep -c "slug: '" lib/rechner-config/*.ts`):

| Kategorie | Slug | Anzahl |
|---|---|---|
| Alltag | `/alltag` | 23 |
| Finanzen | `/finanzen` | **45** |
| Gesundheit | `/gesundheit` | 17 |
| Auto & Verkehr | `/auto` | 11 |
| Wohnen & Energie | `/wohnen` | 25 |
| Mathe & Schule | `/mathe` | 18 |
| Arbeit & Recht | `/arbeit` | **17** |
| Kochen & Ernährung | `/kochen` | 12 |
| Sport & Fitness | `/sport` | 2 |
| **Summe** | | **170** |

**Verschiebungen seit Prompt 146 (25.04.2026):**
- **Arbeit 18 → 17, Finanzen 44 → 45:** arbeitslosengeld-rechner aus arbeit.ts → finanzen.ts migriert (Prompt 149a, 26.04.2026). Konfig deklarierte schon `kategorie: 'Finanzen'` — SSOT-Konsistenz pro Kategorie-Datei wiederhergestellt. Slug + URL `/finanzen/arbeitslosengeld-rechner` unverändert.

**Verschiebungen seit Prompt 97 (19.04.2026):**
- **Auto 10 → 11, Finanzen 45 → 44 (Prompt 126):** Firmenwagen-Rechner migriert aus der Finanzen- in die Auto-Kategorie und Slug-Schreibweise auf Bindestrich-Konvention normalisiert (301-Redirect in `next.config.mjs`).
- **Arbeit 17 → 18 (Prompt 109):** Ehegattenunterhalt-Rechner neu hinzugekommen.
- **Arbeit 18 → 17, Finanzen 44 → 45 (Prompt 149a, 26.04.2026):** arbeitslosengeld-Migration siehe oben.

**Sitemap: 178 Rechner-URLs** — Differenz zu 170 erklärt sich durch Varianten-/Tabellen-Seiten unter `/finanzen/` (z.B. `2000-euro-brutto-netto` bis `5000-euro-brutto-netto`, `brutto-netto-tabelle`, `mindestlohn-netto`). Die dynamische Route `app/[kategorie]/[rechner]/page.tsx` rendert die URLs; Metadaten stehen in `lib/rechner-config/<kategorie>.ts`. Die URL `/gesundheit/herzfrequenz-rechner` wurde im April 2026 per 301-Redirect auf `/sport/herzfrequenz-zonen-rechner` konsolidiert (Feature-Obermenge).

**Ausnahme:** `/finanzen/wohngeld-rechner` läuft seit Prompt 120d (22.04.2026) als **statische Explainer-Seite** statt als interaktiver Rechner — die Wohngeld-Lib hat einen Architektur-Bug bei §§ 14–16 WoGG Pro-Person-Behandlung, das Lib-Refactoring ist als Prompt 120c für Juni 2026 reserviert (gebündelt mit Grundsicherungsgeld-Reform 01.07.2026). Die Explainer-Seite verlinkt auf den offiziellen BMWSB-Wohngeldrechner und zeigt Höchstbeträge + Rechengang. Der Sidebar-Counter zählt Wohngeld weiter als Kategorie-Eintrag mit.

## Zentrale Libs (SSOT, Stand April 2026)

Alle jahresabhängigen und gesetzlich definierten Werte liegen in `lib/berechnungen/`. Rechner, Komponenten und Config-Dateien MÜSSEN von dort importieren — niemals Werte lokal hartcodieren.

| Lib | Zweck | Wichtigste Exports |
|---|---|---|
| `einkommensteuer.ts` | § 32a EStG 2024/2025/2026, Soli-Freigrenzen, KiSt, Pauschalen | `berechneEStGrund(zvE, jahr)`, `berechneSoli(est, splitting, jahr)`, `berechneKirchensteuerByBundesland(est, bundesland)`, `PARAMS[jahr]`, `GRUNDFREIBETRAG_2026`, `WK_PAUSCHALE_AN_2026`, `BUNDESLAENDER` |
| `lohnsteuer.ts` | LSt nach § 39b PAP, Vorsorgepauschale | `berechneLohnsteuerJahr(brutto, steuerklasse, jahr)` |
| `brutto-netto.ts` | BBG KV/PV/RV, SV-Sätze AN, Gesamtberechnung Netto | `BBG_KV_MONAT`, `BBG_RV_MONAT`, `KV_BASISSATZ_AN_2026`, `RV_SATZ_AN_2026`, `AV_SATZ_AN_2026`, `berechneBruttoNetto(...)` |
| `sv-parameter.ts` | GKV-Zusatzbeitrag, JAEG | `KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026`, `JAEG_2026_JAHR`/`_MONAT` |
| `kindergeld.ts` | Kindergeld + Günstigerprüfung | `KINDERGELD_2026` |
| `duesseldorfer-tabelle.ts` | Unterhalt DT 2026 | Mindestbedarf, `KINDERGELD_2026`, `KINDERGELD_HAELFTIG_2026` |
| `pflegeversicherung.ts` | PV-Kinderabschlag § 55 SGB XI | Staffel 1,55 / 1,30 / 1,05 / 0,80 % |
| `mindestlohn.ts` **(neu, 04/2026)** | § 1 MiLoG mit Stichtag-Switch | `MINDESTLOHN`, `getAktuellerMindestlohn(stichtag)`, `MINIJOB_GRENZE_MONAT` |
| `rente.ts` **(erweitert, 04/2026)** | Rentenwert § 68 SGB VI | `RENTENWERT`, `getAktuellerRentenwert(stichtag)` |
| `pfaendung.ts` **(erweitert, 04/2026)** | § 850c ZPO mit Stichtag-Switch | `getAktuellePfaendungsParameter(stichtag)` |
| `pendlerpauschale.ts` **(überarbeitet 94a)** | § 9 EStG Entfernungspauschale | `PENDLERPAUSCHALE_SATZ_2026` (= 0,38 €), einheitlich ab 1. km |
| `abfindung.ts` **(überarbeitet 94)** | § 34 EStG Fünftelregelung | `berechneEStGrund`-basiert, ohne Steuerklassen-Faktor, `verheiratet: boolean` |
| `splitting.ts` **(überarbeitet 94/94a)** | Ehegattensplitting | `berechneEStGrund`-basiert, WK+SA **pro Partner** |
| `bafoeg-parameter.ts` **(neu, Prompt 121)** | SSOT BAföG § 13/13a/14b/23/25/29/51 mit Stichtag-Switch-Skeleton | `getAktuelleBafoegParameter(stichtag)`, `getAnrechnungsquote(geschwister)` (§ 25 Abs. 6: 0,50 − 0,05 × Kinder, Antragsteller zählt NICHT mit), `BAFOEG_AB_2024_08_01` |
| `buergergeld-parameter.ts` **(neu 121, H2 befüllt 129)** | SSOT Bürgergeld/Grundsicherungsgeld § 20 ff. SGB II mit H1/H2-Switch. Union-Type `VermoegenParameter` mit Discriminator-Modus (Karenz-pauschal H1 vs. alter-gestaffelt H2 nach § 12 Abs. 2 SGB II n.F.) | `getAktuelleBuergergeldParameter(stichtag)`, `getSchonvermoegenProPerson(alter, staffeln)`, `BUERGERGELD_2026_H1`, `BUERGERGELD_2026_H2` |
| `buergergeld.ts` **(erweitert 121 + 129)** | Gesamt-Berechnung + Mehrbedarfe § 21 SGB II + altersgestaffeltes Schonvermögen H2 | `berechneBuergergeld(...)` nimmt `erwachseneAlter?: number[]` für H2; Ergebnis-Felder `vermoegenModus` + `vermoegensAufschluesselung` pro Person; `berechneMehrbedarfe` alle 6 Tatbestände inkl. Alleinerziehend-max-Logik + Deckel 60 % |
| `wohngeld.ts` **(Explainer-Mode seit 120d)** | **nicht produktiv für Berechnung** — Lib hat Architektur-Bug bei §§ 14–16 pro Person | `HOECHSTBETRAEGE_WOGG_2026`, `ZUSCHLAG_PRO_PERSON_WOGG_2026` (für Explainer-Tabelle exportiert) |
| `kfz-steuer-parameter.ts` **(neu, Prompt 131)** | SSOT KraftStG — CO₂-Staffel § 9 Abs. 1 Nr. 2c + Elektro-Befreiung § 3d (8. KraftStÄndG vom 04.12.2025) | `CO2_STAFFEL_KRAFTSTG_9_NR2C` (7-stufige progressive Staffel), `ELEKTRO_BEFREIUNG`, `berechneCO2Komponente(gProKm)`, `berechneElektroBefreiungsende(erstzulassung)`, `SOCKEL_PRO_100CCM` |
| `strompreis.ts` **(neu, Prompt 147, Welle 2 Stufe 3 Wohnen)** | Strompreis-SSOT 4 Profile (BDEW-Mittel, Festpreis-Neukunden, Grundversorgung, WP-Tarif). Konsumiert von 8 Wohnen-Rechnern + heizkosten-Lib. | `STROMPREIS_2026` (durchschnitt_bdew=37, neukunden_festpreis=33, grundversorgung=40, waermepumpen_tarif=28 ct/kWh), `getStrompreis(profil?)` |
| `eeg-einspeiseverguetung.ts` **(neu, Prompt 147)** | § 49 EEG 2023 Halbjahres-Schalter (1.2./1.8., −1 % Degression). BNetzA 04/2026: 7,78 ct/kWh bis 10 kWp Teil, 12,34 ct Voll; 6,73/10,35 ct 10–40 kWp; 5,50/10,35 ct 40–100 kWp. Prognose-Bucket für 01.08.2026. | `getEegSatz(stichtag?)` (gibt 6 Sätze + Prognose-Flag), `getMischVerguetung(kwp, modus, stichtag?)`, `EEG_DEGRESSION_HINWEIS` |
| `beg-foerderung.ts` **(neu, Prompt 147)** | KfW 458 Förderquoten Heizungstausch (Grundförderung 30 % + Klima 20 % + Einkommen 30 % + Effizienz 5 %, Cap 70 %, Investitions-Cap 30.000 €/1. WE) | `BEG_FOERDERUNG_2026`, `berechneBegFoerderquote(boni)`, `berechneBegZuschuss(invest, boni, wohneinheiten)`, `BEG_LAUTSTAERKE_HINWEIS_2026` (10 dB unter Grenzwerten ab 01.01.2026) |
| `vpi.ts` **(neu Prompt 147, erweitert Prompt 149b — Welle 2 Stufe 3 Arbeit)** | Verbraucherpreisindex Destatis Lange Reihe (Tabelle 61111-0001, Basisjahr 2020 = 100). Werte 1995–2025 + aktueller Monatsstand. Für § 1376 BGB Indexierung im Zugewinnausgleich-Rechner. | `VPI_AKTUELL`, `VPI_JAHRESDURCHSCHNITTE`, `getVpi(jahr)` (Fallback auf VPI_AKTUELL für laufendes Jahr, Throw bei Out-of-Range), **`indexiereVermoegen(betrag, jahrAnfang, jahrEnde)`** als § 1376 BGB-konformer Helper (BFH BFHE 217, 248) |
| `pv-ertragsmodell.ts` **(neu, Prompt 147c)** | Mertens-Faktoren für PV-Ertragsschätzung (PR=0,85 nach VDI 6002 / IEC 61724 implizit im Basiswert eingebacken). 8 Ausrichtungs- × 5 Neigungsstufen. Konsumiert von photovoltaik- + dachflaechen-Rechner. Hinweis: balkon-solar-Lib nutzt bewusst eigenes BKW-Modell (950 kWh/kWp Brutto vor PR). | `PV_BASIS_ERTRAG_KWH_KWP = 850`, `AUSRICHTUNGS_FAKTOR` (Süd 1,00 / SO/SW 0,95 / O/W 0,85 / NO/NW 0,72 / Nord 0,65), `NEIGUNGS_FAKTOR` (87/94/100/97/91 %), `berechnePvErtrag({kwp, ausrichtung, neigung})`, `berechneSpezifischenErtrag(ausrichtung, neigung)` |
| `midijob-parameter.ts` **(neu, Prompt 125a)** | SSOT Midijob-Faktoren § 20a SGB IV mit Stichtag-Switch | `MIDIJOB_2026`, `getAktuelleMidijobParameter(stichtag)`, `getBeitragsFormeln()` (Koeffizienten aus G/OG/F abgeleitet) |
| `midijob-uebergang.ts` **(neu, Prompt 125a)** | § 20a SGB IV BE-Formeln getrennt für Abs. 2 (Gesamt) und Abs. 2a (AN) | `berechneBemessungsgrundlageGesamt`, `berechneBemessungsgrundlageAN`, `getMidijobUntergrenze`, `MIDIJOB_OBERGRENZE_MONAT` |
| `mwst.ts` **(erweitert, Prompt 132)** | § 12 UStG Regelsatz/ermäßigt + Brutto-/Netto-Faktoren | Konstanten `MWST_REGULAER` (0,19), `MWST_ERMAESSIGT` (0,07), `BRUTTO_FAKTOR_REGULAER`, `NETTO_FAKTOR_REGULAER`; Funktionen `berechneNettoZuBrutto`, `berechneBruttoZuNetto`, `berechneMultiMwSt` |
| `lib/amazon-link.ts` **(neu, Prompt 122-amazon)** | Amazon-Partnerprogramm Suchlinks, Consent-abhängig | `createAmazonSearchLink(keyword, marketingConsentGranted)`, `AMAZON_TAG = 'rechenfix-21'` |
| `bmi.ts` **(erweitert, Prompts 141 + 143)** | WHO-BMI-Kategorien + alters-adjustierter Optimal-Bereich (NRC 1989) | `bmiKategorien` (SSOT seit 143, auch von SchwangerschaftGewichtRechner konsumiert), `getOptimalerBereich(alter)` (SSOT seit 143, auch von idealgewicht.ts konsumiert), `BMI_ADULT_MIN_AGE = 18` (Erwachsenen-Gating, Prompt 141) |
| `kalorien.ts` **(erweitert, Prompt 141)** | Mifflin-St Jeor mit Eating-Disorder-Floor | `berechneKalorien(...)`; neues Flag `zielGeklammertAufGrundumsatz`; `zielKalorien = Math.max(zielKalorienRoh, grundumsatz)` |
| `schwangerschaft.ts` **(neu, Prompt 143 — Voll-Fusion)** | Konsolidiert die früheren `geburtstermin.ts` + `ssw.ts` (beide gelöscht). Naegele + erweiterte Naegele für Zykluslänge ≠ 28; SSW-Berechnung mit dokumentierter Semantik-Divergenz; Trimester; Meilensteine (inkl. Mutterschutz-Beginn/-Ende, Vorsorge-Termine § 24c SGB V); zeitzonen-sicher | `parseDatum(s)` (`+'T00:00:00'`), `berechneGeburtstermin(eingabe)` (SSW ab LMP+Zyklus-Korrektur — erweiterte Naegele), `berechneSsw(eingabe)` (SSW ab reinem LMP — gynäkologischer Standard), `defaultPeriodeDatum`, `defaultTerminDatum`, `Methode`, `SswMethode`, `Meilenstein`. Beide SSW-Konventionen klinisch korrekt — JSDoc dokumentiert die Divergenz, nicht versehentlich vereinheitlichen |

**Verboten:** Eigene ESt-, LSt-, SV-, Kindergeld-, Pfändungs-, Mindestlohn- oder Pendler-Formeln in Komponenten. Siehe `CLAUDE.md` Abschnitt "Zentrale Libs (SSOT)" und die Audit-Welle-1-Anti-Patterns im `rechner-builder`-Skill.

### Wichtige Kinderfreibetrag-Werte 2026 (nicht verwechseln!)

Aus `kindergeld.ts`:
- `KIFB_GESAMT_ZUSAMMEN_2026` = **9.756 €** (6.828 sächlich + 2.928 BEA)
- `KIFB_GESAMT_EINZEL_2026` = **4.878 €** (halber Anteil pro Elternteil)

Der alte Wert `15.612 €` in Splitting/Kindergeld war frei erfunden (Prompt 94a hat ihn entfernt). Wer neu damit rechnet, MUSS die Konstanten aus `kindergeld.ts` importieren.

## Automatische Jahreswechsel (Stichtag-Switch)

Dank Prompts 87/88/91 greifen folgende Anpassungen automatisch — **kein manueller Zwischen-Prompt nötig:**

| Stichtag | Parameter | Von → Auf | Quelle |
|---|---|---|---|
| 01.07.2026 | Rentenwert | 40,79 € → 42,52 € | BMAS 05.03.2026 |
| 01.07.2026 | Pfändungs-Grundfreibetrag | 1.555,00 € → 1.587,40 € | BGBl. 2026 I Nr. 80 |
| 01.07.2026 | Pfändungs-Zuschlag 1. Unterhalt | 585,23 € → 597,42 € | BGBl. 2026 I Nr. 80 |
| 01.07.2026 | Pfändungs-Zuschlag 2.–5. Unterhalt | 326,04 € → 332,83 € | BGBl. 2026 I Nr. 80 |
| 01.01.2027 | Mindestlohn | 13,90 € → 14,60 € | Vierte MiLoV |
| 01.01.2027 | Minijob-Grenze | 603 € → 633 € | automatisch via Kopplung |

**Kontroll-Termine:**
- 01.07.2026 spot-check: Rentenrechner und Pfändungsrechner liefern neue Werte — keine Aktion nötig, nur Verifikation. Durch den Fix in Prompt 95 zieht auch der Witwenrenten-Rechner (26,4 × 42,52 € Grundfreibetrag) automatisch nach.
- 01.01.2027 spot-check: Mindestlohn-Rechner, Minijob-Rechner, Stundenlohn-Rechner liefern 14,60 € bzw. 633 €.

**Vollständiger Stichtag-Kalender:** Der umfassende Kalender aller gesetzlichen Stichtage und Jahreswerte-Wechsel wird in `docs/jahreswerte-kalender.md` gepflegt (geplant als Prompt 98). Dient als Regiebuch für den jährlichen Audit: Dezember für 01.01.-Wechsel, Juni für 01.07.-Wechsel.

## Sprint-Historie

### Sprint 1 — Tarif-Audit (April 2026) ✅ ABGESCHLOSSEN

**Ziel:** Alle drei Tarif-Rechner (Brutto-Netto, Lohnsteuer, Einkommensteuer) BMF-konform und cent-genau zum 1.1.2026.

**Umgesetzte Prompts:**
- **81** — §32a EStG Tarif 2026 + SV-Sätze + Formel-Umstellung
- **82** — Vorsorgepauschale §39b Abs. 4 EStG PAP-konform
- **83** — PV-Kinderabschlag nach § 55 Abs. 3 SGB XI (PUEG 2023) für 2+ Kinder
- **84** — UI-Felder "Kinder unter 25" in Lohnsteuer- und Einkommensteuer-Rechner
- **84a** — Clamping-Fix für neue Kinder-Inputs (Smoketest C3-Fail)

**Verifikations-Runs:**
- Testfall Single (3.500 €, StKl I, kinderlos): LSt 405,50 €/Mon, Netto 2.333,25 €/Mon — cent-genau
- Testfall Familie (5.000 €, StKl III, 2 Kinder): PV 77,50 €, LSt 409,00 €, Netto 3.546,00 €/Mon — cent-genau
- Einkommensteuer-Rechner bei zvE 46.974 € Splitting: ESt 4.908 €/Jahr — cent-genau
- Smoketest v3.1: 178/178 Rechner funktional grün

**Lessons Learned:**
- HTML `min`/`max` reicht nicht — onChange-Clamping Pflicht (Smoketest C3)
- PV-Kinderabschlag und Kinderfreibeträge sind zwei getrennte Konzepte, zwei getrennte UI-Felder
- Smoketest v3 findet Frontend-Integrität, aber keine numerische Korrektheit — für Tarif-Changes separat gegen BMF-Steuerrechner prüfen
- web_fetch-Tool-Cache kann bei Live-Audits irreführen — Inkognito-Browser-Check ist Ground Truth

### Jahresparameter-Audit 2026 (April 2026) ✅ ABGESCHLOSSEN

**Ziel:** Gesamten Code auf 2026er Rechtsstand bringen. Sprint 1 hatte die Tarif-Gruppe aktualisiert; der Audit hat gezeigt, dass in Sekundär-Rechnern, SEO-Texten und Scripts noch 2024er/2025er Werte schlummerten.

**Umgesetzte Prompts:**

| Prompt | Datum | Inhalt |
|---|---|---|
| 86 | 18.04.2026 | Grep-basierter Audit-Report (`docs/jahresparameter-audit-2026-04.md`) — 7 Bugs + 5 Verdachtsfälle + 21 Metadaten/Hilfetexte identifiziert |
| 87 | 19.04.2026 | Bug-Fix-Batch 1–8: 4 Sekundär-Rechner auf zentrale Libs (ArbeitslosengeldRechner, GmbhGfRechner, MidijobRechner, KurzarbeitergeldRechner), Soli-Freigrenze in `kindergeld.ts` korrigiert, Rentenwert-Bug (seit Juli 2025 falsch 39,32 € statt 40,79 €) entdeckt und gefixt + 01.07.2026-Switch auf 42,52 € |
| 88 | 19.04.2026 | Mindestlohn 12,82 → 13,90 € an ~15 Stellen, neue SSOT `lib/berechnungen/mindestlohn.ts` mit Stichtag-Switch auf 14,60 € (01.01.2027) |
| 89 | 19.04.2026 | Kindergeld 255 → 259 € Metadaten-Batch: 13 Stellen in finanzen.ts/arbeit.ts/client-data.ts/scripts/, H2-SEO-Absatz war sachlich falsch |
| 90 | 19.04.2026 | Hilfetext-Batch H1/H3/H5/H9–H12/H14 — BBG-Werte, JAEG 77.400 €, GKV-Zusatzbeitrag 2,9 %, Deutschlandticket 63 €, Zigarettenpreise 2026, KI-Explain-Prompts; neue Konstante `JAEG_2026_*` in `sv-parameter.ts` |
| 91 | 19.04.2026 | Pfändungstabelle 01.07.2026 vorab eingepflegt (BGBl. 2026 I Nr. 80), Stichtag-Switch analog Rentenwert — 3 Bonus-Bugs in `pfaendung.ts` mitkorrigiert (1.555,99 → 1.555,00, 585,59 → 585,23, Obergrenze 4.573,10 war 2023er Wert) |
| 92 | 19.04.2026 | Doku-Sync (diese Datei, CLAUDE.md, SKILL.md) |

**Lessons Learned:**
- Zentrale Libs aktualisieren reicht nicht — Hartkodierungen in einzelnen Komponenten, SEO-Texten und Build-Scripts rutschen durch, wenn kein Grep-Audit läuft.
- Stichtag-Switch-Pattern (siehe CLAUDE.md) verhindert "Bug-seit-X-Monaten"-Szenarien wie beim Rentenwert.
- Meta-Config-Dateien (`lib/rechner-config/*.ts`) und Build-Scripts (`scripts/apply-v2-titles.js`) müssen bei Jahresupdates mit-migriert werden.

### Welle 1 — Hoch-Risiko-Rechner (April 2026)

**Stufe 1 — Steuer-Kern (abgeschlossen 19.04.2026)**

Manueller Audit der Steuer-Rechner nach Prompt-86-Grep hatte nur Jahresliterale gefunden — Formel- und Konstanten-Bugs schlüpften durch. Stufe 1 hat zusätzlich:

| Prompt | Rechner | Befund | Schwere |
|---|---|---|---|
| 94 | Abfindung | Steuerklassen-Faktor-Array `{1:1, 2:0.85, 3:0.55, …}` frei erfunden; § 34 EStG kennt das nicht | P1 |
| 94 | Abfindung | Soli ohne Milderungszone (harter Sprung bei ESt > 20.350 €) | P2 |
| 94 | Splitting/Kindergeld/Abfindung | Eigene § 32a-Grundtabellen-Kopien statt `berechneEStGrund` (SSOT-Verstoß) | SSOT |
| 94a | Pendlerpauschale | Staffelung 0,30/0,38 €/km statt einheitlich 0,38 € (StÄndG 2025) | P1 |
| 94a | Kindergeld | Kinderfreibetrag 15.612 € (erfunden) statt 9.756 € → falsche Günstigerprüfung bei 1K + 70–110k Brutto | P1 |
| 94a | Splitting | WK- + SA-Pauschale bei Zusammenveranlagung nur einmal (1.266 €) statt pro Partner | P2 |

Nicht existierende Rechner (→ Welle 1.5): Kirchensteuer-Standalone, ESt-Vorauszahlung, Fünftelregelung-Standalone, Altersentlastung.

Doku-Artefakte: `docs/stufe1-rechner-semantik.md`.

**Stufe 2 — SV-Kern (abgeschlossen 19.04.2026)**

| Prompt | Rechner | Befund | Schwere |
|---|---|---|---|
| 95 | Witwenrente | `RENTENWERT_2026 = 39.32` hartcodiert — war Wert bis 30.06.2025 (zwei Anpassungen veraltet!) | P1 |
| 95 | ALG | Soli ohne Freigrenze (nur `lstMonat > 1000`-Schwelle statt § 4 SolzG-Freigrenze) | P2 |
| 95 | Rentenrechner | BBG-Kappung nicht erklärt im UI bei Brutto > BBG | P3 |
| 95 | Krankengeld | BBG hartcodiert 5.812,50 € statt aus `brutto-netto.ts` | SSOT |
| 95 | Rente-Lib | Eigene lineare ESt-Näherung (14–42 %) statt `berechneEStGrund` | SSOT |

Nicht existierende Rechner (→ Welle 1.5): Rentenpunkte-Standalone, PV-Beitrag-Standalone.

Doku-Artefakte: `docs/stufe2-rechner-semantik.md`.

**Stufe 3 (Familie + Arbeitsrecht) — offen**
- Geplant: Elterngeld, Mutterschaftsgeld, Teilzeit, Kündigungsfrist, Urlaub, Minijob

**Stufe 4 (Wohnen + Spezial-Steuer) — offen**
- Geplant: Grundsteuer, CO2, Heizkosten, Abfindung-Neuprüfung

### Welle 1 — Stufe 1.5 (Sekundär-Rechner-Audit) — abgeschlossen 20.04.2026

**Prompt 99a:** GmbhGfRechner Soli-Milderungszone (P1, durch Lint-Script entdeckt).

**Prompt 99b:** GmbhGfRechner Splittingtarif-Toggle (P2) + SV-Sätze aus `brutto-netto.ts` + KiSt via `berechneKirchensteuerByBundesland` mit Bundesland-Dropdown (P2-Bonusfix BY/BW).

**Prompt 99c:** WK-Pauschale SSOT über 7 Dateien / 13 Stellen (`WK_PAUSCHALE_AN_2026` zentral) + PKV-Beitrag als Eingabefeld statt Pauschale. Lint-Script um `contextKeywords`-Mechanismus erweitert.

**Mini-Check Stufe 1.5** ([docs/stufe1-5-rechner-semantik.md](docs/stufe1-5-rechner-semantik.md)): 17 Sekundär-Libs geprüft, 9 sauber, 8 mit Findings.

**Prompt 100 — P1-Pass** (5 Bugs gefixt):
- `steuererstattung.ts`: Pendlerpauschale 0,30/0,38 → einheitlich 0,38 €/km (+352 €/Jahr WK bei 30 km × 220 Tagen)
- `steuererstattung.ts`: 2025er-Tarifschwellen durch `berechneEStGrund` ersetzt
- `nebenjob.ts`: 3 × Soli ohne Milderungszone → `berechneSoli` (−822 €/Jahr bei typischen Milderungszonen-Fällen)
- `nebenjob.ts`: eigene § 32a-Formel → `berechneEStGrund`
- `spenden.ts`: Soli-Ersparnis pauschal 5,5 % → Differenz-Methode (−199 €/Jahr Überschätzung korrigiert)
- KiSt-Bundesland in `nebenjob` und `spenden` mitgezogen

**Prompt 101 — SSOT + P2-Pass:**
- Lint-Script: Soli-Freigrenzen (20350/37838/40700) mit `contextKeywords` aufgenommen
- `steuerprogression.ts`: KiSt-Bundesland (+142 €/Jahr BY/BW-Fix)
- SSOT-Refactor in 5 Libs (lohnsteuer, steuerklassen-vergleich, steuerprogression, bafoeg, wahrer-stundenlohn)
- Neue Konstante `GRUNDFREIBETRAG_2026` in `einkommensteuer.ts`
- Architektur-Note: BBG bleibt in `lohnsteuer.ts` inline wg. zirkulärem Import — dokumentiert

**Audit-Bilanz Stufe 1.5:** 5 P1 + 4 P2 + 18 P3 — alle gefixt.

**Audit-Bilanz Welle 1 gesamt (Stufen 1 + 2 + 1.5):** 10 P1 + 11 P2 + ~40 SSOT-Refactorings.

### SEO-Sprint Crawl-Discovery (20.04.2026) ✅ ABGESCHLOSSEN

| Prompt | Inhalt |
|---|---|
| 103 | Canonical-Diagnose — bereits sauber (alle Rechner mit www-Canonical, keine Duplicate-Content-Signale). Prompt ohne Fix geschlossen. |
| 104 | Crawl-Discovery-Sprint: Sitemap-`lastmod` via git-log statt `new Date()` (Google erkennt echte Änderungen), Priority-Staffelung (Kategorien 0.9 > Rechner 0.8), Kategorieseiten mit H1 „{Kategorie} — {COUNT} Rechner {JAHR}" + Einleitungs-Prosa-Slot |
| 105 | 9 Kategorie-Einleitungen live (je 180–220 Wörter, `{COUNT}`-Platzhalter wird zur Build-Zeit ersetzt, Markdown-Links auf Top-3-Rechner der Kategorie) |

### Affiliate-Erweiterung (20.04.2026) ✅ ABGESCHLOSSEN

**Prompt 106** — 3 neue Awin-Partner auf 9 Rechnern platziert:
- hotel.de (MID 16018): /arbeit/urlaubstage-rechner, /alltag/countdown, /auto/spritkosten-rechner
- burda-Zahnzusatz (MID 121064): /finanzen/pflegegeld-, krankengeld-, rentenrechner + /gesundheit/raucher-, schlaf-rechner
- eventfloss-berlin (MID 27722): /alltag/geburtstag-rechner (Test, CTR-Review ~20.05.2026)

Gleichzeitig: Affiliate-Regel von „kein Affiliate in Gesundheit/Mathe" umgestellt auf thematischen Match. Details in CLAUDE.md → Abschnitt „Affiliate-Platzierungs-Regel".

### Footer-Lint + prebuild-Hook (20.04.2026) ✅ ABGESCHLOSSEN

| Prompt | Inhalt |
|---|---|
| 107b | Lint-Script `scripts/check-footer.mjs` mit zwei Regeln (`footer-uniqueness`, `footer-hardcoded-count`), Guard G14 im Skill |
| 107c | `prebuild`-Hook kettet `check-footer` + `check-jahreswerte` + `generate-client-data`; Fails blockieren Deploy auf Vercel. Repo-Housekeeping: `.gitignore` um `.claude/settings.local.json` + `/reports/` erweitert, `Checks/` → `docs/audit-arbeitspapiere/` verschoben |
| 108 | Doku-Sync CLAUDE.md + SKILL.md + diese Datei |

### Welle 1 — Stufe 4b (Sozialleistungen) — abgeschlossen 22.04.2026

**Scope:** BAföG, Wohngeld, Bürgergeld, Pfändung — 4 Rechner im Sozial-Bereich. Sieben Prompts an einem Tag (120d, 120d-fix, 120d-sidebar, 121, 121-fix, 121-analyse, 121-geschwister-label).

| Prompt | Zweck | Ergebnis |
|---|---|---|
| 119 | Audit-Bericht Sozialleistungen | 9 P1 + 7 P2 + 6 P3 identifiziert (BAföG Bedarfssätze veraltet, Wohngeld 35 Höchstbetragszellen + 4 Freibetragsregeln, Pfändung Pauschalquote statt amtliche Tabelle) |
| 120 | P1-Pass Sozialleistungen | 9 P1 gefixt; BAföG-Höchstsatz 1.056 → 992 €, Wohngeld Zellen nach § 12 WoGG Anlage 1 (Dynamisierung 01.01.2025), Pfändung algorithmische 10-€-Stufen-Abrundung. 3 Verify-Scripts 5/5 + 41/41 + 17/17 grün (aber 41/41 zirkulär, siehe 120a) |
| 120a | Wohngeld-Hotfix nach User-Cross-Check gegen BMWSB | 3 Bugs: UI-Display 10 % vs. Lib 30 %, Tarifformel-Koeffizienten seit ~2022 nicht aktualisiert → jetzt aus Anlage 2 WoGG BGBl. 2024 I Nr. 314, Verify-Script-Anti-Pattern (zirkulär → externe Oracle). Rollback mehrerer 120-Freibetrags-„Korrekturen": § 17 Nr. 1 Schwerbehindert 150 €/Mo (nicht 125), § 17 Nr. 3 Alleinerz. 110 €/Mo pauschal (nicht pro Kind). 2P-Cross-Check zeigte weitere §§ 14-16-Architektur-Bug → Hybrid-Plan (120d + 120c Juni 2026) |
| 120d | Wohngeld-Rechner → statische Explainer-Seite | `app/finanzen/wohngeld-rechner/page.tsx` als Server Component, gewinnt gegen dynamische Route via `STATISCHE_OVERRIDES`-Set. Hinweis-Banner mit BMWSB-Link, Höchstbeträge-Tabelle (aus Lib exportiert, kein Daten-Duplikat), 5 FAQ, Schema.org FAQPage + BreadcrumbList. Lib-Refactoring für Prompt 120c (Juni 2026) reserviert. |
| 120d-fix | Vier fachliche Textkorrekturen Wohngeld-Explainer | Rechengang Schritt 4 (Aufrundung § 19 Abs. 2), Haushaltszusammensetzung (statt Bedarfsgemeinschaft), FAQ 2 ohne konkrete Einkommensgrenzen, FAQ 4 Rückwirkung differenziert (§ 25 Abs. 2/3 + § 27 WoGG) |
| 120d-sidebar | Kategorie-Sidebar auf Wohngeld-Explainer wiederhergestellt | Sidebar-Pattern 1:1 aus dynamischer Route übernommen, Wohngeld-Eintrag als aktiv markiert. UX-Konsistenz mit anderen 45 Finanzen-Rechnern. |
| 121 | Stufe-4b P2-Pass + SSOT BAföG/Bürgergeld/Pfändung | Neue SSOT-Libs `bafoeg-parameter.ts` + `buergergeld-parameter.ts` mit Stichtag-Switch. BAföG-Anrechnungsquote § 25 Abs. 6 als Funktion der Geschwister (Recherche-Korrektur: Antragsteller zählt NICHT mit, bei 0 Geschwistern 0,50 statt 0,45). Bürgergeld-Mehrbedarfe § 21 SGB II alle 6 Tatbestände. Pfändung: Monat-Picker „Stichtag" mit Default heute. 3 Verify-Scripts 16/19/5 grün gegen externe Oracles. |
| 121-fix | Bürgergeld-Rechner Alleinerziehend-UI-Komplettierung | Kinder-Input auch bei „Alleinstehend", explizite Alleinerziehend-Checkbox (§ 21 Abs. 3 SGB II verlangt alleinige Pflege), Dreifach-Guard, Wechselmodell-Hinweis. Lib unverändert, Verify 19/19 grün. |
| 121-analyse | BAföG Geschwister-Logik dokumentiert | Analyse-Report in `docs/audit-arbeitspapiere/bafoeg-geschwister-analyse.md`. Lib wendet simultan § 25 Abs. 3 (Freibetrag) + § 25 Abs. 6 (Quote) an. § 11 Abs. 4 Aufteilungsregel nicht implementiert (Empfehlung für Prompt 122+). |
| 121-geschwister-label | BAföG UI-Transparenz | Help-Text benennt beide Effekte + § 11 Abs. 4-Hinweis; neuer Disclaimer-Block unterhalb der Aufschlüsselung (Verweis auf §§ 11 Abs. 3 + 4, § 25 Abs. 6). Keine Lib-Änderung, Verify 16/16 grün. |

**Audit-Bilanz Welle 1 Stufe 4b:** 9 P1 + 7 P2 + 3 UX-Folge-Prompts + Wohngeld-Explainer-Replacement + Kategorie-Sidebar-Restore.

**Neue Methoden-Lehren aus dem Tag:**
- **Zahlen aus Prompts nie ungeprüft übernehmen** — Gesetzestext/Oracle schlägt Prompt (mehrfach-Vorfall: BAföG-Schätzwert, Geschwister-Quote, Wohngeld-FAQ-Faustregel)
- **Verify-Scripts gegen externe Oracle, nie zirkulär** — Prompt-120-Wohngeld-Tests liefen 41/41 grün trotz veralteter Lib-Koeffizienten (Prompt 120a-Lehre)
- **UI-Labels an Rechtstatbestand koppeln** — Alleinerziehend-Mehrbedarf braucht explizite User-Bestätigung, nicht Auto-Aktivierung aus Kontext (Prompt 121-fix)
- **Statische Routes müssen Kategorie-Sidebar explizit rendern** — Prompts müssen „inkl. Sidebar" nennen, „passt optisch zu anderen Rechnern" reicht nicht (Prompt 120d-sidebar)

### Amazon-Partner-Integration (22.04.2026) ✅ ABGESCHLOSSEN

**Prompt 122-amazon** — Neues Partnerprogramm neben Awin integriert. Tag-ID `rechenfix-21`.

- **Rechtliche Basics:** Footer-Pflichthinweis „Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.", Datenschutzerklärung §9b Amazon-Partnerprogramm, Cookie-Banner Marketing-Kategorie erweitert (Amazon Associates mit expliziter Tag-Nennung)
- **Komponente:** [`components/AmazonBox.tsx`](components/AmazonBox.tsx) — keyword-basiert, Amazon-Orange `#FF9900`, „Anzeige"-Kennzeichnung, `rel="sponsored noopener noreferrer"`, SSR-fest
- **Helper:** [`lib/amazon-link.ts`](lib/amazon-link.ts) — `createAmazonSearchLink(keyword, marketingConsentGranted)`. Tag wird **nur** bei erteiltem Marketing-Consent angehängt; ohne Consent funktioniert der Link weiter, aber ohne Provision
- **16 integrierte Rechner:** Kochen (6) + Sport (2) + Auto (2) + Wohnen (3) + Alltag (1) + Arbeit (2). Keine AmazonBox auf Gesundheit/Finanzen/Mathe
- **180-Tage-Frist:** Erster qualifizierter Referral bis ca. **19.10.2026**, sonst Account-Schließung
- **Selbstbezug verboten** (Teilnahmebedingungen) — Testklicks im Inkognito ohne Marketing-Consent (Tag wird dann nicht übermittelt)
- **Vollständige Dokumentation:** [`docs/amazon-integration.md`](docs/amazon-integration.md) mit Rechner-Tabelle, Keywords, Platzierungs-Pattern, Monitoring-Plan 4/12/24 Wochen

### Meta-Lektion aus dem April-Audit

Der **Soli-ohne-Milderungszone-Bug** tauchte **5× auf** (ALG, GmbhGf, nebenjob-3×, spenden). Das Anti-Pattern war im Skill dokumentiert — trotzdem haben Bestandsfälle es nicht verhindert. **Das technische Sicherheitsnetz (Lint-Script mit `contextKeywords`) ist der primäre Schutz**, die Doku ist ergänzend.

Der manuelle Jahresaudit Prompt 87 hatte Sekundär-Rechner (nebenjob, steuererstattung, steuerklassen-vergleich, bafoeg etc.) nicht erfasst. Die systematische Lib-Inventur im Stufe-1.5-Mini-Check hat das aufgedeckt. **Bei zukünftigen Jahres-Audits ist die Inventur (→ `ls lib/berechnungen/*.ts`) Pflicht-Schritt vor der Tiefenprüfung.**

### Welle 1.5 — fehlende Rechner neu bauen (separate Sprint-Planung)

Aus den Stufen 1+2 identifizierte Rechner ohne Standalone-Implementierung:
- Kirchensteuer-Standalone
- ESt-Vorauszahlung
- Fünftelregelung-Standalone (aktuell nur in AbfindungsRechner)
- Altersentlastungsbetrag
- Rentenpunkte-Standalone (aktuell nur in RentenRechner)
- PV-Beitrag-Standalone (aktuell nur in BruttoNettoRechner)

**Audit-Welle-1-Lessons:**
- Grep-basierter Jahres-Audit reicht nicht, wenn falsche Werte mit aktuellem Suffix versehen sind (`RENTENWERT_2026 = 39.32`, `KIFB_EINZEL = 4878` bei Code, der daraus 15.612 € rechnet). Der Mini-Check-Pass zwingt Claude Code, jede Rechner-Komponente zu öffnen und zu lesen — dabei fallen solche Konstanten-Drifts auf.
- Law-Changes ohne Jahres-Zahl (StÄndG 2025 → einheitlich 0,38 € ab 2026) sind für Grep unsichtbar. Gehören in einen separaten Rechtsänderungs-Audit-Pass.
- Das SSOT-Prinzip (Prompts 86/87) wurde für die Hauptrechner durchgezogen, aber Sekundär-Rechner hatten noch Eigenkopien. Die Welle-1-Fixes haben das für Splitting/Kindergeld/Abfindung/Rente/ALG/Krankengeld/Witwenrente nachgeholt.

## Test-Referenzwerte Tarif-Rechner (Stand April 2026)

Diese Werte dienen als Smoketest-Baseline für die Tarif-Rechner-Gruppe. Jede Abweichung ist ein Regressions-Kandidat und muss untersucht werden.

### Brutto-Netto-Rechner

| Szenario | Inputs | PV | LSt | Netto |
|---|---|---|---|---|
| Single kinderlos | 3.500 € / StKl I / 0 Kinder / keine KiSt | Kinderlos-Zuschlag 2,4 % | 405,50 €/Mon | 2.333,25 €/Mon |
| Familie | 5.000 € / StKl III / 2 Kinder / keine KiSt | 77,50 €/Mon (1,55 %) | 409,00 €/Mon | 3.546,00 €/Mon |

### Lohnsteuer-Rechner

| Szenario | Inputs | LSt |
|---|---|---|
| Single kinderlos | 3.500 € / StKl I / 0 Kinder | 405,50 €/Mon |
| Familie | 5.000 € / StKl III / 2 Kinder | 409,00 €/Mon |

### Einkommensteuer-Rechner

| Szenario | Inputs | ESt |
|---|---|---|
| Splitting mittig | zvE 46.974 € / Zusammenveranlagung / 2 Kinder | 4.908 €/Jahr |
| Grundtarif gleich | zvE 46.974 € / Einzelveranlagung / 0 Kinder | 9.501 €/Jahr |

**Amtliche Gegenprobe:** [BMF-Steuerrechner](https://www.bmf-steuerrechner.de/ekst/) mit identischen Inputs.

## Status April 2026 (Stand 28.04.2026)

**Abgeschlossen:**
- ✅ Sprint 1 — Tarif-Audit (Prompts 81–84a)
- ✅ A11y-Sprint — Lighthouse 100/100, axe 0 auf 19 Stichproben (Prompts 78a–h + 78z-Serie + 34a–c)
- ✅ Jahresparameter-Audit 2026 (Prompts 86–92)
- ✅ **Welle 1 komplett** (Stufen 1+2+1.5+3+4a+4b, Prompts 94–125b, April 2026) — Steuer/SV/Familie/Arbeitsrecht/Spezial-Steuer/Sozialleistungen durchgeprüft; Lohnsteuer-Voll-PAP (Prompt 118), Midijob-SSOT (125a), Firmenwagen-§ 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG-Fix (125b)
- ✅ Card-Hover A11y/UX (Prompts 96/96a) — nur Shadow-Animation, kein Transform
- ✅ Unterhaltsrechner DT 2026 (Prompt 67)
- ✅ Verivox-Affiliate ETF/Rente/Spar (Prompts 45+46)
- ✅ **SEO-Sprint Crawl-Discovery** (Prompts 103–105) — git-log-basierter lastmod, Priority-Staffelung, 9 Kategorie-Einleitungen live
- ✅ **Affiliate-Erweiterung** (Prompt 106) — hotel.de, burda-Zahnzusatz, eventfloss-berlin auf 9 Rechnern platziert
- ✅ **Footer-Lint + prebuild-Hook** (Prompts 107b + 107c) — Guard G14, `lint:footer`, CI-Hook blockiert Deploys bei Guard-Fail
- ✅ **AdSense-Basis-Loader** (Prompt 110, 20.04.2026) — `<head>`-Script für Crawl-Erkennung
- ✅ **Grundsicherungsgeld H2-Bucket** (Prompts 129/129-fix, 23.04.2026) — altersgestaffeltes Schonvermögen § 12 Abs. 2 SGB II n.F. ab 01.07.2026, Bezeichnung „Grundsicherungsgeld", FAQ + Content-Update; BGBl. 2026 I Nr. 107 als Primärquelle
- ✅ **Firmenwagen-Migration** (Prompt 126, 23.04.2026) — Firmenwagen-Rechner aus der Finanzen- in die Auto-Kategorie migriert und Slug auf Bindestrich-Konvention normalisiert, 301-Redirect in `next.config.mjs`; Slug-Drift-Fixes systemweit
- ✅ **Slug- und Display-Name-Konvention** (Prompts 127+128) — Duden-Logik für Display-Name, SEO-Lesbarkeit für URL-Slug, unabhängige Artefakte
- ✅ **Welle 2 Stufe 1 Auto** (Prompts 130–132, 23.04.2026) — 10 Rechner-Audit, 3×P1 KfzSteuerRechner (CO₂-Staffel § 9 Abs. 1 Nr. 2c KraftStG, Elektro-Befreiung § 3d KraftStG bis 31.12.2035 statt 2030, UI-Text mit falschen Daten), 5×P2 + 3×P3 Polish
- ✅ **Slug-Drift-Scan + Prebuild-Hook** (Prompts 132.5+132.6) — 22 systemweite Drifts gefixt (hauptsächlich Kategorien-Verwechslungen, z. B. Slug `promillerechner` in Gesundheit-Kategorie statt korrekt Arbeit-Kategorie), Auto-Schutz via `scripts/slug-drift-scan.mjs` in der prebuild-Kette, Whitelist mit Karsten-OK-Pflicht
- ✅ **Doku-Sync** (Prompt 134) — CLAUDE.md / SKILL.md / dieses Dokument auf Stand nach Welle-2-Stufe-1-Abschluss
- ✅ **Welle 2 Stufe 2 Gesundheit** (Prompts 140–144b, 24.–25.04.2026) — 17 Rechner-Audit nach 4-Punkt-Methodik, **2 P1 + 9 P2 + 9 P3** alle gefixt + Feature-Add 144b. P1.1 Kalorien-Floor (`zielKalorien = max(zielKalorienRoh, grundumsatz)` als Eating-Disorder-Schutz), P1.2 BMI Alters-Gate <18 (SSOT-Konstante `BMI_ADULT_MIN_AGE = 18`, Kategorie-Anzeige unterdrückt, Verweis auf Kromeyer-Hauschild). SSOT-Konsolidierung in 143: `bmi.ts` exportiert `bmiKategorien` und `getOptimalerBereich` als zentral; `geburtstermin.ts` + `ssw.ts` zu `schwangerschaft.ts` fusioniert (Voll-Fusion, beide alten Files gelöscht). 21 Verify-Tests (7+6+8) gegen externe Primärquellen (WHO, ESH, DGE, IOM 2009, Naegele/§ 3 MuSchG). Wellbeing-Patterns dokumentiert: Verhütungs-Disclaimer als amber-Box, Eating-Disorder-Floor, Kinder-Gating, sys<dia-UI-Hinweis, Hyponatriämie-Warnung bei >4 l/Tag.
- ✅ **CosmosDirekt-Affiliate** (Prompts 145 + 145b, 25.04.2026) — 12. Programm Awin Merchant 11893 (Icon 🛡️, `#0D6EFD`). 15 Produkt-Deeplinks: Tagesgeld, Altersvorsorge, Sparplan, Junior, Risikoleben, BU, Unfall, Sterbegeld, Privat-Haftpflicht, Hausrat, Wohngebäude, Bauherrenhaftpflicht, Tierhalter, Reiserücktritt, Default. **30 Einbauten** in 30 Rechnern (21 Group A Append nach bestehenden Boxen, 9 Group B Erstinstall; B6 MietRechner.tsx übersprungen — Datei existiert nicht). Sonderfälle: RentenRechner mit `variant="compact"` (4. Box, visuelle Last), SparRechner mit `context="tagesgeld"` statt `sparplan` (verivox bedient sparplan an Z. 138). AffiliateBox-Aufrufe gesamt: 87 → 117 in 73 Dateien.
- ✅ **Casing-Hotfix** (Commit 7dd9934, 25.04.2026) — Latenter Casing-Bug behoben: `MwStRueckerstattungRechner.tsx` (großes St) lokal vs. `MwstRueckerstattungRechner.tsx` (kleines st) im git-Index. Vercel-Linux case-sensitive → `Module not found` auf Production. Zwei-Schritt-`git mv` für case-only-Rename auf Windows.
- ✅ **Doku-Sync** (Prompt 146, 25.04.2026) — CLAUDE.md / SKILL.md / dieses Dokument nach Welle-2-Stufen-1+2 + CosmosDirekt
- ✅ **Welle 2 Stufe 3 Wohnen KOMPLETT** (Prompts 147 + 147b + 147c + 148 + 148b + 148c, 25.+26.04.2026) — 25 Rechner (Block A 12 rechtssensitiv + Block B 13 Mengen). 5 neue SSOT-Libs (`strompreis.ts`, `eeg-einspeiseverguetung.ts`, `beg-foerderung.ts`, `vpi.ts`, `pv-ertragsmodell.ts` aus 147c). Hauptbefunde: PV-Einspeisevergütung 8,03 → 7,78 ct/kWh (war 2 Jahre veraltet), GrESt-Sätze Bremen/Sachsen/Thüringen aktualisiert, Mietpreisbremse-Verlängerung bis 31.12.2029 (BT-Drs. 21/322), Strompreis-Inkonsistenz 32/36 → systemweit 37 ct via SSOT, BEG-Wärmepumpenförderung max. 70 %/21.000 €. 147b Hotfix: balkon-solar 800-W-Cap, wärmepumpe 30–1000 m²-Range. 147c PV-Ertragsmodell mit Mertens-Faktoren. 148 Block B: dachflaechen 950 → 850 kWh/kWp, poolkosten 220 → 270 €. 148b Component-Drift: poolkosten/heizkosten/dachflaechen Component-Defaults via SSOT, balkon-solar Nord-Faktor 0,40 → 0,60. **148c Schluss-Patch (26.04.):** Mieterbund-Wert im nebenkosten-rechner aktualisiert von 2,88 EUR/qm auf Betriebskostenspiegel 2023 (2,51 EUR/qm Durchschnitt, 3,15 EUR/qm bei voller Ausnutzung; Quelle: Deutscher Mieterbund DMB, +10 % gegenüber Vorjahr) — direkt durch Claude im Web recherchiert (Lehre 22). ~17 Commits, 87+ Verify-Tests grün.
- ✅ **Welle 2 Stufe 3 Arbeit KOMPLETT** (Prompts 149a-d + 150a-d Block A + 152a + 153a/b/b-fix + 153c Block B, 26.04.2026, 14 Commits) — Block A Audit (`docs/audit-arbeitspapiere/welle2-stufe3-arbeit-blockA-audit.md`): 4× P1 + 6× P2 + 17× P3. **149a** arbeitslosengeld-Migration arbeit.ts → finanzen.ts (SSOT-Konsistenz). **149c** ehegattenunterhalt SB-Achse korrigiert von Trennungsphase auf Erwerbstätigkeit (gilt für Trennungs- UND nachehelichen Unterhalt gleichermaßen, erfundene „Bindung schwächer"-Begründung gestrichen). **149b** zugewinnausgleich § 1376 BGB Indexierung Anfangsvermögen mit `vpi.ts`-Erweiterung (`indexiereVermoegen`-Helper, `getVpi(jahr)`). **149d** scheidungskosten KostBRÄG 2025 (RVG/FamGKG-Tabellen aktualisiert auf Stichtag 01.06.2025). **150 (a-d)** P2-Polish: Mutterschutz Fehlgeburt-Schutzfristen 13./17./20. SSW (BGBl. 2025 I Nr. 59), Behinderungs-Verlängerung Antragspflicht, Elternunterhalt Angehörigen-Entlastungsgesetz, Elternzeit 30h→32h. **Block B Audit** (`welle2-stufe3-arbeit-blockB-audit.md`): 0 P1, 2 P2, 10 P3. **152a** urlaubstage BUrlG-Rundung. **153a** freelancer § 19 UStG-Schwelle + teilzeit EP-Werte. **153b** ArbeitstageRechner „Wochentage Mo-Fr". **153b-fix** AiExplain-Object-Key (Lehre 21: grep statt visueller Scan). **153c** Lib-Audit-Bundle für 5 Block-B-Libs: 0 P1, 0 P2, 2 neue P3-Mini-Befunde + 4 Klärungen.
- ✅ **Doku-Sync** (Prompt 154 + 154-blockB + 154-153c + 155, 26.04.2026) — CLAUDE.md / SKILL.md / dieses Dokument / `welle-status-historie.md`. 154 nach Welle-2-Stufe-3-Wohnen-Abschluss und P1-Block (149a/b/c). 154-blockB nach Block-B-Patch-Sequenz (Commit f4d0687). 154-153c nach Lib-Audit (Commit 26298a0). 155 nach Welle-2-Komplett-Abschluss: Welle-Status-Bullet KOMPLETT, Lehre 22 (Wert-Recherche durch Claude im Web + URL-Permission-Workflow), Welle-3-Backlog mit klaren Scopes, Audit-Bundle-Pattern als Workflow-Tool. Drei Doku-Anker konsistent synchron (CLAUDE.md, welle-status-historie.md, Audit-Berichte).
- ✅ **Welle 3 Item 152b feiertage.ts SSOT** (27.04.2026, Commits ea3c9ce/9b1a947/03d7bda) — Neue Lib `lib/berechnungen/feiertage.ts` mit Spencer-Variante der Gauß-Osterformel + 16-BL-Map + 4 Helper. `scripts/verify-feiertage.ts` 60/60 grün gegen externe Sollwerte (BMF, kalender.de). ArbeitstageRechner.tsx auf SSOT migriert, Jahr-Dropdown 2024–2030 (akuter Q4/2026-Bug behoben). freelancer-stundensatz.ts: hartkodierte FEIERTAGE=10 durch dynamischen Lookup ersetzt (P3-Lib-1 geschlossen). Lehren 23 + 24.
- ✅ **AdSense-Reparatur-Sprint** (Prompt 154, 27.04.2026, Commits 83792c0 + 4ae7b38) — AdSense-Erstprüfung am 27.04.2026 negativ („Minderwertige Inhalte"). Root Cause: `<LazySection>`-Wrapper um Erklärtext + FAQ in `app/[kategorie]/[rechner]/page.tsx` Z. 479–550 — `'use client'`-Component, rendert bei SSR nur leeres 200-px-Placeholder-`<div>`, Crawler sieht 5.497 Zeichen statt erwartete ~13 K. Fix: Wrapper durch Fragment ersetzt, `no-print` auf zwei `<section>`-Elemente migriert, `components/ui/LazySection.tsx` gelöscht (verwaist). Live-Verifikation nach Deploy: brutto-netto-rechner 5.497 → 13.033 chars, urlaubstage 10.050, bmi 8.171 — alle drei mit „So funktioniert" + „Häufige Fragen" im SSR-HTML. Lehren 25 + 26.
- ✅ **E-E-A-T-Sprint** (Prompts 155 + 156, 28.04.2026, Commits 1a6e6ed + fecadc4 + 3079c43) — Trust-Signale für YMYL-Themen ergänzt: 155 baut `/ueber-uns` von ~2,2 KB auf ~7 KB sichtbaren Text aus (sechs Card-Sektionen: Hero, Solo-Founder-Statement mit Beratungs-Abgrenzung, Audit-Workflow-Überblick, Quellenliste, Datenschutz/Werbe-Transparenz, Kontakt). 156 legt neue statische Server-Component `/qualitaet` an (sieben Sektionen: Hero, Audit-Workflow + 4-Punkt-Audit, Primärquellen-Liste in 6 Themenbereichen, Stichtag-Logik mit Beispielen, A11y-Status, Datenschutz, Disclaimer „Was Rechenfix nicht ist"). Footer-Link „Qualität & Methodik" vor `/barrierefreiheit` ergänzt. Lehre 27.
- ✅ **Welle 3 Item 151 — Block-A-P3-Sammelbatch** (28.04.2026, Commits b268b93 / e7121d2 / 17ca6bd / d7a277d / 4e5b7d0 / 2171564) — 17 Memory-priorisierte P3-Items aus Block-A-Audit in 5 atomaren Konfig-Commits + Doku-Sync: 151a pendlerpauschale Mobilitätsprämie § 101 EStG, 151b kuendigungsfrist (3) + abfindung (1) = 4 Items, 151c mutterschutz-Restpolish (5), 151d unterhalt (4), 151e elternzeit (3). ~25 nicht-priorisierte P3-Items aus dem gleichen Block-A-Audit später durch Item 157 ✅ erledigt. Lehre 28.
- ✅ **Welle 3 Item 157 — P3-Sammelrest aus Block-A-Audit** (28.04.2026, Commits c4c1846 / 566a095 / d3eca80 / e4810ec / 965c519 / 6689668 + a750bf4 Doku-Sync) — 25 nicht-priorisierte P3-Items aus Block-A-Audit in 6 atomaren Konfig-Commits + Doku-Sync: 157a pendlerpauschale § 9 Abs. 1 Satz 3 Nr. 4 EStG (Standard-Zitierweise), 157b kuendigungsfrist + abfindung (§ 169 SGB IX, § 113 InsO, §§ 9/10 KSchG, § 4 KSchG), 157c scheidungskosten (§ 1565 Abs. 2 BGB, VA-Mindest-VW, VKH § 115 ZPO, RVG-Auslagen-Cap), 157d zugewinnausgleich + unterhalt (§§ 1379/1375/1385 BGB, „bereinigtes Netto"), 157e ehegattenunterhalt (Halbteilung Nicht-Erwerb, §§ 1573 Abs. 4/1574/1577 BGB, Beispiel mit Kindesunterhalt-Vorabzug), 157f arbeitslosengeld (§§ 153/147/155 SGB III, Höchstsatz, Stkl-Stichtag, Nebenverdienst). Schließt 151-Sammelrest semantisch.
- ✅ **Welle 3 Item P3-B1 — ueberstunden-Netto-Refactor** (28.04.2026, Commit 7c2426b + c6876c1 Doku-Sync) — Pauschale 40-%-Steuerabzug-Schätzung im Vergütungs-Modus durch Mehrbetrag-Methode `Netto(Brutto+Vergütung) − Netto(Brutto)` via `berechneBruttoNetto`-SSOT ersetzt. UI im Modus „Vergütung" um Steuerklasse + Bundesland + Kirchensteuer-Inputs erweitert (Defaults Stkl I / NW / ohne KSt). Schließt P3-B1 aus dem Welle-2-Stufe-3-Arbeit-Block-B-Backlog.
- ✅ **Welle 3 Item 150e — Süd-OLG-UI-Toggle ehegattenunterhalt** (28.04.2026, Commits 08017f8 + 3ae42c1) — Neuer RadioToggleGroup „Berechnungsmethode" mit zwei Optionen (Bundesweit 3/7 ≈ 42,86 % vs. Süddeutsch 45 %, OLG-Bezirke Bamberg/Karlsruhe/München/Nürnberg/Stuttgart/Zweibrücken). Konstanten `QUOTE_BUNDESWEIT`/`QUOTE_SUEDDEUTSCH` ersetzen hardcoded `(differenz * 3) / 7`. 150d-Workaround „Faktor 1,05 manuell anwenden" durch Toggle-Verweis ersetzt. Sanity-Check 4 Default-Werte deckungsgleich mit Spec. Lehre 29.

**Parkend (wartet auf AdSense-Freigabe):**
- ⏸ Prompt 68 — Google CMP + Consent Mode v2
- ⏸ Prompt 85 — AdSense `data-nscript` Warning Fix
- Rollback-Prompt 69 bleibt im Repo als Sicherheit

**Offen:**
- 🎯 GSC: Sitemap neu einreichen nach Deploy; CTR-Review der 3 neuen Awin-Partner ~20.05.2026
- 🎯 Neue Rechner-Batches (thematisch offen)
- 🎯 Jahresparameter-Audit 2027 (Frühjahr 2027): ESt-Tarif 2027, SV-Rechengrößen 2027, JAEG, Zusatzbeitrag, D-Ticket, Pfändung-Switch zum 01.07.2028
- 🎯 **Welle-3-Backlog (geparkte Items mit klarem Scope, siehe eigene Sektion „Welle-3-Backlog" weiter unten):** 152b `feiertage.ts` SSOT (akut Q4/2026), 151 Block-A-P3-Sammelbatch (17 Items), 150e Süd-OLG-UI-Toggle, 157 P3-Sammelrest (25 Items in 6 atomaren Konfig-Commits 157a–f), 152c Pendlerpauschalen-SSOT (geparkt), Validation-Sweep — Scoping ✅ 28.04.2026 (siehe `docs/audit-arbeitspapiere/validation-sweep-scoping.md`), 7 Module priorisiert
- 🎯 **Welle 2 Stufe 3 weitere Kategorien** (Alltag, Mathe, Kochen, Sport): noch nicht gestartet — bei Bedarf separate Audit-Sprints, ansonsten als Teil von Welle 3 Validation-Sweep
- 🎯 **Prompt 133 TaxiRechner Stadt-Preset-UX:** 5 Städte-Presets (Karsten-Auswahl ausstehend), `taxi-preset-tarife.ts` mit Stichtag-Kommentar pro Stadt, CLAUDE.md-Wartungsregel halbjährlich. Vorbereitet durch `TARIFE_STAND` in `lib/berechnungen/taxi.ts` (Prompt 132 A5)
- 🎯 **Prompt 120c (Juni 2026):** Wohngeld-Lib-Refactoring auf Pro-Person-Architektur §§ 14–16 WoGG, gebündelt mit Grundsicherungsgeld-Reform (Switch 01.07.2026). Nach Umsetzung: `STATISCHE_OVERRIDES`-Ausschluss aufheben, dynamische Route rendert wieder den interaktiven Rechner. KdU-1,5-Fache-Cap (§ 22 Abs. 1 SGB II n.F., aus Prompt 129 Teil B Nicht-Scope) könnte dabei als Nebenprodukt integriert werden
- 🎯 **Prompt 121a (~August 2026 bei Bedarf):** BAföG WS 2026/27-Erhöhung einpflegen (neuer Bucket `BAFOEG_AB_2026_08_01` in `bafoeg-parameter.ts`, wenn Verordnung verabschiedet)
- 🎯 **Prompt 122 P3-Polish:** echte § 11 Abs. 4 BAföG-Aufteilungsregel als zweites Input-Feld „geförderte Geschwister", Pfändung Obergrenze-Anzeige permanent, Regelsatz-Info-Tabelle aus Lib ableiten, Pfändung dynamische Beispieltabelle, Schüler-BAföG-Bedarfssatz-Hinweis
- 🎯 **Amazon-Monitoring** 4/12/24 Wochen (ab 22.04.2026): Erste Klick-Stats, Conversion-Rate, Eskalation vor 19.10.2026-Deadline (siehe `docs/amazon-integration.md`)

**Welle-Status:**
- **Welle 1 (Hoch-Risiko):** ✅ ABGESCHLOSSEN April 2026 (Stufen 1+2+1.5+3+4a+4b)
- **Welle 2 (Mittel-Risiko):** ✅ **KOMPLETT ABGESCHLOSSEN 26.04.2026**
  - Stufe 1 Auto ✅ (Prompts 130–132.6, 23.04.2026)
  - Stufe 2 Gesundheit ✅ (Prompts 140–144b)
  - Stufe 3 Wohnen ✅ (Prompts 147–148c, 25.+26.04.2026, 25 Rechner)
  - Stufe 3 Arbeit ✅ (Block A 149a-d + 150a-d, Block B 152a + 153a/b/b-fix + 153c Lib-Audit, 26.04.2026, 14 Commits)
- **Welle 3 (Validation-Sweep + geparkte Items + AdSense-Reparatur):** **9/10 abgeschlossen (Stand 30.04.2026)** — 1 geparkt (152c)
  - ✅ 152b feiertage.ts SSOT (27.04.2026)
  - ✅ 154 LazySection-Removal (AdSense-Reparatur, 27.04.2026)
  - ✅ 155 /ueber-uns ausgebaut (28.04.2026)
  - ✅ 156 /qualitaet neu angelegt + Footer-Link (28.04.2026)
  - ✅ 151 Block-A-P3-Sammelbatch (17 Items in 5 atomaren Konfig-Commits, 28.04.2026)
  - ✅ 150e Süd-OLG-UI-Toggle ehegattenunterhalt (28.04.2026)
  - ✅ 157 P3-Sammelrest (25 Items in 6 atomaren Konfig-Commits 157a–f, 28.04.2026)
  - ✅ P3-B1 ueberstunden-Netto-Refactor mit Steuerklasse-Input (Commit 7c2426b, 28.04.2026)
  - 🅿️ 152c Pendlerpauschalen-SSOT — geparkt, Trigger: Verabschiedung der 45-Cent-Reform
  - ✅ **Validation-Sweep KOMPLETT (30.04.2026)** — 7/7 Module abgeschlossen: M1 Backtick-Hook ✅, M2 Norm-Zitate ✅, M3 SSOT-Konsumption ✅ (L-30 + L-31), M4 Meta-Routen ✅, M5 Affiliate-Konsistenz ✅, M6 FAQ-Drift ✅, M7 A11y-Stichprobe ✅ (0 Regressions-Treffer auf 44/44 Runs)
- **Welle 4 (Verify-Coverage-Backfill):** **angefangen 01.05.2026 — Scoping ✅** unter [docs/audit-arbeitspapiere/welle4-scoping.md](docs/audit-arbeitspapiere/welle4-scoping.md). 6 Module priorisiert (M0 Anomalie-Klärung, M1 Trivial-Verify, M2 Sozial-/Familien-Recht, M3 Edge-Case-Komplex, M4 Lohnsteuer-Tail, M5 Bilanz-Closure). Geschätzt ~22 neue Verify-Scripts, ~16–22 h auf 4–6 Sessions. Out-of-Scope: 6 Lib-Extractions auf Welle 5 ausgelagert (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer); ~62 OFFEN-MENGEN + ~14 OFFEN-MARKT bewusst ohne Verify-Sprint. Eingangs-Inventar 30.04.26 unter [docs/audit-arbeitspapiere/welle4-inventar-pre-scoping.md](docs/audit-arbeitspapiere/welle4-inventar-pre-scoping.md).

Vollständige Welle-Historie: [docs/audit-arbeitspapiere/welle-status-historie.md](docs/audit-arbeitspapiere/welle-status-historie.md).

## Welle-3-Backlog (Stand 30.04.2026)

**Geliefert (9/10):** 152b ✅, 154 ✅, 155 ✅, 156 ✅, 151 ✅, 150e ✅, 157 ✅, P3-B1 ✅, **Validation-Sweep KOMPLETT (7/7) ✅ 30.04.2026**. Volldetails siehe „Status April 2026" oben und [docs/audit-arbeitspapiere/welle-status-historie.md](docs/audit-arbeitspapiere/welle-status-historie.md).

**Geparkt (1/10):** 152c Pendlerpauschalen-SSOT (Trigger: Reform-Verabschiedung).

**Geliefert (Stand 30.04.2026):** Validation-Sweep **KOMPLETT ✅** — 7/7 Module abgeschlossen (M1+M2+M3+M4+M5+M6+M7). Welle 3 reduziert sich auf den einen geparkten Slot 152c (Pendlerpauschalen-SSOT, Trigger: Verabschiedung der 45-Cent-Reform). Volldetails siehe unten mit Aufwand und Scope-Specs.

### 152b — `feiertage.ts` SSOT-Lib mit Gauß-Osterformel ✅ ABGESCHLOSSEN (27.04.2026)

- **Geliefert:** Neue Lib `lib/berechnungen/feiertage.ts` mit Spencer-Variante der Gauß-Osterformel (gültig 1583–4099) + 16-BL-Map. Helper: `berechneOstersonntag`, `getFeiertage`, `istFeiertag`, `anzahlFeiertage`, `anzahlBundesweiterFeiertageMoBisFr`. `scripts/verify-feiertage.ts` 60/60 grün gegen externe Sollwerte (BMF, kalender.de) — Ostern 2024–2030, alle 16 BL-Karten, Buß-und-Bettag inkl. 23.11.=Mi-Edge-Case (2022).
- **Migration durchgeführt in:** `ArbeitstageRechner.tsx` (statisches Jahr-Dropdown 2024–2030, akuter Q4/2026-Bug behoben), `freelancer-stundensatz.ts` (hartkodierte `FEIERTAGE=10` durch `anzahlBundesweiterFeiertageMoBisFr(jahr)` ersetzt — variiert 7/5/8 für 2026/27/28; P3-Lib-1 geschlossen)
- **Lehren:** 23 (Stichtag vs. dynamisch), 24 (Hydration-safe Year-Dropdowns)

### P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse-Input ✅ ABGESCHLOSSEN (28.04.2026)

- **Geliefert:** Commit 7c2426b. `VerguetungEingabe` um `steuerklasse`/`bundesland`/`kirchensteuer` erweitert. Pauschale 40-%-Steuerabzug-Schätzung (`× 0.6`) durch Mehrbetrag-Methode `Netto(Brutto+Vergütung) − Netto(Brutto)` via `berechneBruttoNetto`-SSOT ersetzt. UI im Modus „Vergütung" um drei Inputs (Stkl/Bundesland/KSt) erweitert, Defaults Stkl I / NW / ohne KSt. Disclaimer-Text aktualisiert.

### 151 — Block-A-P3-Sammelbatch (17 priorisierte Items) ✅ ABGESCHLOSSEN (28.04.2026)

- **Geliefert:** 5 atomare Konfig-Commits + 1 Doku-Sync. 151a pendlerpauschale Mobilitätsprämie § 101 EStG (StÄndG 2025); 151b kuendigungsfrist + abfindung — EuGH Kücükdeveci, § 622 Abs. 5 Nr. 2 BGB Kleinbetriebs-Ausnahme, BAG 2 AZR 68/24 Zugangsbeweis, § 1a Abs. 2 S. 3 KSchG Aufrundung; 151c mutterschutz-Restpolish — Frühgeburt-Definition, Muster 9 ab 01.01.2026, 99-Tage-Mindestschutz, Schülerinnen/Studentinnen, Totgeburt-Sonderregelung; 151d unterhalt — § 1610 BGB > 11.200 € NEK, § 1612a Abs. 3 BGB Alterssprung, SB-Wohnkosten 390+130 €, 7. MUVÄndV als Rechtsquelle; 151e elternzeit — § 17 Abs. 1 BEEG Urlaubskürzung, § 16 Abs. 1 BEEG bis zu 3 Zeitabschnitte, Terminologie „Bindungszeitraum" → „verbindlicher Festlegungszeitraum"
- **Memory-Priorisierung:** Audit hatte 42 P3-Items, davon 17 im Memory-Backlog priorisiert; restliche 25 später durch Item 157 ✅ erledigt (siehe unten)
- **Lehre:** 28 (Audit-Cluster nach Memory-Priorität — Memory-Backlog ist Scope-Definition)

### 157 — P3-Sammelrest aus Block-A-Audit ✅ ABGESCHLOSSEN (28.04.2026)

- **Geliefert:** 6 atomare Konfig-Commits 157a–f + Doku-Sync (Commits c4c1846, 566a095, d3eca80, e4810ec, 965c519, 6689668, a750bf4). 25 P3-Items aus Block-A-Audit (kein Berechnungslogik-Touch).
  - **157a** pendlerpauschale: § 9 Abs. 1 Satz 3 Nr. 4 EStG (Standard-Zitierweise BMF/Finanzgerichte, P3-A1-2)
  - **157b** kuendigungsfrist + abfindung: § 169 SGB IX Schwerbehinderten-Mindestfrist + Integrationsamt, § 113 InsO Insolvenz-Höchstfrist 3 Mon, §§ 9/10 KSchG gerichtliche Auflösung 12/15/18 Monatsverdienste, § 4 KSchG 3-Wo-Klagefrist (P3-A2-3, P3-A2-4, P3-A3-2, P3-A3-3)
  - **157c** scheidungskosten: § 1565 Abs. 2 BGB Härtefall, VA-Mindest-VW 1.000 €, Folgesachen-Faustwert-Hinweis, VKH § 115 ZPO, Nr. 7002 VV RVG Auslagen-Cap (P3-A5-1..5)
  - **157d** zugewinnausgleich + unterhalt: § 1379 BGB Auskunftsanspruch, § 1375 Abs. 2 BGB illoyale Vermögensminderung, § 1385 BGB vorzeitiger Ausgleich, „bereinigtes Netto"-Klarstellung (P3-A6-1..3, P3-A7-1)
  - **157e** ehegattenunterhalt: Beispiel mit Kindesunterhalt-Vorabzug, § 1573 Abs. 4 BGB Anschlussunterhalt, Halbteilung Nicht-Erwerb, § 1574 BGB Erwerbsobliegenheit, § 1577 BGB Anrechnung (P3-A10-1..5)
  - **157f** arbeitslosengeld: §§ 153/147/155 SGB III, Höchstsatz ~2.940 €/Monat, Steuerklasse-Stichtag 01.01., Nebenverdienst 165 € + 15-h-Schwelle (P3-A8-1..5)
- **Schließt:** den 151-Sammelrest semantisch (~25 nicht-priorisierte P3-Items aus dem gleichen Block-A-Audit)

### 150e — Süd-OLG-UI-Toggle für ehegattenunterhalt-Rechner ✅ ABGESCHLOSSEN (28.04.2026)

- **Geliefert:** Neuer RadioToggleGroup „Berechnungsmethode" mit zwei Optionen „Bundesweit (3/7)" vs. „Süddeutsch (45 %)" — Konstanten `QUOTE_BUNDESWEIT = 3/7` und `QUOTE_SUEDDEUTSCH = 0.45` ersetzen hardcoded `(differenz * 3) / 7`. Default `bundesweit`. Methodenname an 5 Stellen sichtbar: Result-Box, Rechenweg-Header, Rechenweg-Item, ergebnis-String, AiExplain. 150d-Workaround „Faktor 1,05 manuell anwenden" durch Toggle-Verweis ersetzt.
- **Sanity-Check 4 Default-Werte deckungsgleich mit Spec:** BW/KU=0: 986 €, Süd/KU=0: 1.035 €, BW/KU=400: 814 €, Süd/KU=400: 855 €
- **Lehre:** 29 (UI-Toggle als Folge-Commit muss Konfig-Refresh atomisch mitnehmen)

### 152c — Pendlerpauschalen-SSOT (geparkt)

- **Status:** geparkt (28.04.2026)
- **Aufwand:** ~30 Min
- **Trigger zum Aufgreifen:** Verabschiedung der 45-Cent-Reform der Pendlerpauschale (Stand 28.04.2026 nur angekündigt, noch nicht im BGBl)
- **Scope:** Neue SSOT-Konstante `PENDLERPAUSCHALE_PRO_KM = 0.38` in `lib/berechnungen/pendlerpauschale.ts` mit Stichtag-Switch-Pattern; bestehende Konfig-Touchpoints (`finanzen.ts`, `arbeit.ts`) auf SSOT-Import umstellen
- **Begründung Park-Status:** Ohne Reform-Verabschiedung kein konkreter Lese-Wert. P3-A1-3 aus dem Block-A-Audit bewusst geparkt statt sofort umgesetzt.

### Welle-3-Validation-Sweep aller Welle-2-Rechner gegen externe Oracles

- **Scoping ✅ ABGESCHLOSSEN (28.04.2026, Commit 867b92f):** 7 Module priorisiert — M1 Backtick-Hook, M2 Norm-Zitate, M3 SSOT-Konsumption, M4 Meta-Routen, M5 Affiliate-Konsistenz, M6 FAQ-Drift, M7 A11y-Stichprobe. Volldetails: [docs/audit-arbeitspapiere/validation-sweep-scoping.md](docs/audit-arbeitspapiere/validation-sweep-scoping.md). Out-of-Scope: Deploy-Sync-Check, Verify-Coverage-Lücke (eigene Welle 4).
- **Aufwand:** 4–6 Folge-Sessions (~9–12 h Sweep-Zeit netto, plus optionale Fix-Sessions je nach M3-Drift-Cluster)
- **Akut:** nein (Welle 2 ist funktional sauber; Welle 3 ist Cross-Check-Phase). Empfehlung Session A zuerst (M1 Backtick-Hook wegen Build-Break-Risiko).

### Empfohlene Reihenfolge der verbleibenden Items (Stand 01.05.2026)

1. **Welle 4 M0 — Anomalie-Klärung** (~30 Min, Pre-Sprint): A-01 (`verify-ehegattenunterhalt.ts` ohne Lib-Import), A-03 (`COMPONENT_SLUG_OVERRIDES`-Map für 8 Camel/Kebab-Mismatches), A-07 (Underscore-Helper-Konvention). Output: stabile Slug-Inventur, M1-Modul-Liste final.
2. **Welle 4 M1 — Trivial-Verify** (~5–7 h): 5 Slugs (`mwst-rechner`, `gewerbesteuer-rechner`, `kindergeld-rechner`, `inflationsrechner`, `herzfrequenz-zonen-rechner`). 1 neues `verify-*.ts` pro Slug.
3. **152c** — wartet auf Trigger (Verabschiedung der 45-Cent-Reform via BGBl., extern).
4. **AdSense-Re-Review** — Karsten triggert im Backend, Antwortfrist 1–3 Wochen. Bei Approval: Prompts 68 (Google CMP + Consent Mode v2) + 85 (next/script-Migration) aktivierbar — beide haben höhere Prio als Welle-4-Fortsetzung.

**Neue Scripts seit Welle 2 Stufe 3:**
- `scripts/verify-wohnen-p1.ts` (Prompt 147), `verify-wohnen-block-b.ts` (148), `verify-pv-ertragsmodell.ts` (147c), `verify-ehegattenunterhalt.ts` (149c), `verify-zugewinnausgleich.ts` (149b) — alle gegen externe Primärquellen (BNetzA, BDEW, KfW, Mertens, Düsseldorfer Tabelle, BFH/BGB, Destatis Lange Reihe)
- `scripts/verify-feiertage.ts` (Prompt 152b, 27.04.2026, 60 Tests grün gegen BMF + kalender.de — Ostern 2024–2030, alle 16 BL-Karten, Buß-und-Bettag inkl. 23.11.=Mi-Edge-Case 2022)

**Build-Regel (verschärft seit 20.04.2026):** Lokal IMMER `npm run build`, NIE `npx next build`. Prebuild-Hooks: check-footer, check-jahreswerte, slug-drift-scan, generate-client-data — Fail-fast-Reihenfolge.

**Workflow-Tools (seit 20.04.2026, persistent in Chrome bzw. claude.ai-Settings, nicht im Memory):**
- Claude-in-Chrome Extension — Live-HTML-Inspektion, Console, Network. Modus „Ask before acting".
- Vercel-MCP-Connector (`https://mcp.vercel.com`) — Deploy-Status, Logs, Toolbar-Threads.

**Audit-Bundle-Pattern (seit 26.04.2026, Welle 2 Stufe 3 Arbeit Block B):**
- **Generator-Skript:** `scripts/build-audit-bundle.ts` (TypeScript, NICHT `.mjs`!) — erzeugt konsolidierte Markdown-Datei in `docs/audit-bundles/<thema>.md` mit allen relevanten Files als Code-Blöcke
- **CLI:** `npm run audit:bundle <name>`
- **Bundle-Definitionen:** `scripts/audit-bundles.ts` (zentrale Liste aller Bundle-Konfigurationen mit File-Listen)
- **Aufruf:** Eine `web_fetch`-URL → ein Fetch → alle Files in einem Aufruf — spart Token und Reibung im Vergleich zu URL-Listen pro Datei
- **Pflicht-Parameter** bei Bundles >100 KB: `text_content_token_limit: 300000` — Default reicht nicht und schneidet ohne sichtbare Warnung mitten im Inhalt ab
- **Lib-Audit als Folge-Bundle:** Wenn Component+Konfig+Beispiel-Trio konsistent ist, kann der Lib-Audit nachgelagert als Folge-Bundle abgehängt werden — Beispiel-Werte aus `beispiel`-Feld manuell nachrechnen reicht oft für indirekte Lib-Verifikation
- **Beispiele aus 26.04.:** `block-b-arbeit` (149 KB, 13 Files), `block-b-libs` (16 KB, 5 Libs)
- **Methodik-Lehre 20** (CLAUDE.md → Gelernte Regeln): Audit-Bundle-Pattern via konsolidierte MD-Datei

## Parkende Items (bis AdSense-Freigabe)

Zwei Prompts sind bewusst gesperrt, bis Google AdSense aktiv freigeschaltet ist:

1. **Prompt 85** — AdSense `data-nscript`-Warning fixen (nativer `<script>`-Tag in `app/layout.tsx` statt `next/script`). Script-Loader-Änderung könnte Review-Prozess beeinträchtigen.
2. **Prompt 68** — Google CMP + Consent Mode v2 aktivieren. Ersetzt das aktuelle self-built CookieBanner.tsx.

**Reihenfolge nach Freigabe:** erst 85 (Warning wegräumen), dann 68 (CMP dazu).

## Architektur-TODOs (dokumentierte technische Schulden)

### BBG-Konstanten in eigene Datei auslagern
**Entdeckt in:** Prompt 101
**Problem:** Zirkulärer Import zwischen [lib/berechnungen/brutto-netto.ts](lib/berechnungen/brutto-netto.ts) und [lib/berechnungen/lohnsteuer.ts](lib/berechnungen/lohnsteuer.ts) verhindert, dass `lohnsteuer.ts` die BBG-Werte aus `brutto-netto.ts` importiert — `brutto-netto.ts` konsumiert bereits `berechneLohnsteuerJahr`.
Aktuell: BBG bleibt in `lohnsteuer.ts` inline (`101400` / `69750`), mit Code-Kommentar und Lint-Schutz über `forbiddenValues`.

**Saubere Lösung:** Neue Datei `lib/berechnungen/bbg.ts` mit den BBG-Konstanten. Sowohl `brutto-netto.ts` als auch `lohnsteuer.ts` konsumieren daraus — Zyklus entschärft.

**Priorität:** Niedrig akut, relevant spätestens zum nächsten BBG-Update (vermutlich 01.01.2027 via SV-Rechengrößenverordnung).

**Workaround bis dahin:** In [docs/jahreswerte-kalender.md](docs/jahreswerte-kalender.md) ist die BBG mit "Doppel-Pflege"-Hinweis markiert. Beim jährlichen Dezember-Audit **beide Stellen** synchron aktualisieren.

## Affiliate-System

### Netzwerk: Awin
Publisher-ID: 2843240

### Programme & Base-URLs
| Programm | awinmid | Deeplink-Domain | Verfügbare Pfade |
|----------|---------|-----------------|------------------|
| WISO Steuer (Buhl Data) | 17387 | buhl.de | /produkte/wiso-steuer/ |
| smartsteuer | 15043 | steuererklaerung.smartsteuer.de | / |
| Lexware Office | 13787 | lexware.de | /buchhaltungssoftware/ |
| CHECK24 | 9364 | **check24.net** (NICHT .de!) | /strom/, /gas/, /kfz-versicherung/, /kredit/ |
| congstar | 11938 | congstar.de | /handytarife/ |
| KS Auxilia | 108114 | — (keine Deeplinks) | — |
| Eventfloss Berlin | 27722 | eventfloss-berlin.de | / (aktiv auf /alltag/geburtstag-rechner) |
| Verivox | 14797 | verivox.de | /depot/, /depot/etf-vergleich/ |
| hotel.de | 16018 | hotel.de | / |
| burda-vergleicht (Zahnzusatz) | 121064 | zahn.burda-vergleicht.de | /campaign_600.html |
| Nature's Way | 47173 | naturesway.de | /collections/all |
| **CosmosDirekt** (neu, Prompts 145 + 145b, 25.04.2026) | **11893** | cosmosdirekt.de | /geldanlage/tagesgeld/, /flexinvest-altersvorsorge/, /flexinvest/, /flexinvest-einmalanlage/, /flexinvest-junior-sparplan/, /risikolebensversicherung/, /berufsunfaehigkeitsversicherung/, /unfallversicherung/, /sterbegeldversicherung/, /private-haftpflichtversicherung/, /hausratversicherung/, /wohngebaeudeversicherung/, /bauherrenhaftpflicht/, /tierhalterhaftpflicht/, /reiseruecktrittsversicherung/ |

### Amazon Partner-Programm (neben Awin, seit Prompt 122-amazon)

| Aspekt | Wert |
|---|---|
| Tag-ID | `rechenfix-21` |
| Partnernetz | Amazon Associates Germany (Amazon EU S.à r.l., Luxemburg) |
| Mechanik | Suchlinks mit Keyword (keine festen ASINs, selbstheilend) |
| Komponente | `components/AmazonBox.tsx` (eigenständig, nicht in AffiliateBox integriert) |
| Helper | `lib/amazon-link.ts` — `createAmazonSearchLink(keyword, marketingConsentGranted)` |
| Consent-Kopplung | Tag nur bei `useCookieConsent().marketingAllowed === true`. Box bleibt immer sichtbar. |
| Einsatz-Kategorien | Kochen, Sport, Auto, Wohnen, Alltag, Arbeit |
| Verboten auf | Gesundheit, Finanzen, Mathe |
| Integrierte Rechner | 16 (Stand 22.04.2026) — vollständige Tabelle in [`docs/amazon-integration.md`](docs/amazon-integration.md) |
| 180-Tage-Deadline | ca. 19.10.2026 — erster qualifizierter Referral nötig, sonst Account-Schließung |
| Selbstbezug | verboten (Teilnahmebedingungen) — Testklicks im Inkognito ohne Marketing-Consent |

### WICHTIG zu CHECK24
- Awin-Links leiten auf **check24.net** weiter, NICHT auf check24.de
- Nur 4 Deeplink-Pfade verfügbar: /strom/, /gas/, /kfz-versicherung/, /kredit/
- NICHT verfügbar: /baufinanzierung/, /umzug/, /altersvorsorge/, /depot/
- Für nicht verfügbare Produkte KEIN CHECK24-Affiliate verwenden

### Tracking
- `clickref`-Parameter enthält die volle Seiten-URL: `clickref=https%3A%2F%2Fwww.rechenfix.de%2F...`
- Wird dynamisch via `usePathname()` Hook generiert (nicht window.location!)
- Deeplink wird als `ued`-Parameter URL-encoded angehängt
- KS Auxilia hat keine Deeplinks aktiviert — kein `ued`-Parameter

### AffiliateBox-Komponente
- Pfad: `components/AffiliateBox.tsx`
- Client Component mit Props: `programId`, `context`, `variant` ("compact" | "full")
- Enthält localStorage-Tracking (`rf_aff_clicks`) und GA-Events
- "Anzeige"-Label oben rechts (deutsche Werbekennzeichnungs-Pflicht)
- `rel="noopener noreferrer sponsored"` auf allen Links
- CHECK24 hat ein `deeplinks`-Objekt (verschiedene Deeplinks je nach Context)
- Alle anderen Programme haben einen einzelnen `deeplink`-String

### Affiliate-Stats-Dashboard
- Route: `/admin/affiliate-stats` (versteckt, noindex)
- Liest localStorage-Klick-Daten aus
- Tabs: Nach Programm | Nach Rechner | Chronologisch
- CSV-Export und Daten-Löschen-Funktion

### CosmosDirekt-Einbau-Mapping (Prompt 145b, 25.04.2026, 30 Einbauten)

**Group A — Append nach bestehender(n) Box(en) (21 Einbauten):**

| # | Datei | Context |
|---|---|---|
| A1 | `AfaRechner.tsx` | wohngebaeude |
| A2 | `BaufinanzierungRechner.tsx` | bauherrenhaftpflicht |
| A3 | `ElterngeldRechner.tsx` | risikolebensversicherung |
| A4 | `ErbschaftsteuerRechner.tsx` | sterbegeld |
| A5 | `EtfSparplanRechner.tsx` | einmalanlage |
| A6 | `GrunderwerbsteuerRechner.tsx` | wohngebaeude |
| A7 | `GrundsteuerRechner.tsx` | wohngebaeude |
| A8 | `KapitalertragsteuerRechner.tsx` | tagesgeld |
| A9 | `KindergeldRechner.tsx` | juniorSparplan |
| A10 | `KrankengeldRechner.tsx` | berufsunfaehigkeit |
| A11 | `MietpreisbremseRechner.tsx` | privathaftpflicht |
| A12 | `MietrenditeRechner.tsx` | wohngebaeude |
| A13 | `MutterschutzRechner.tsx` | risikolebensversicherung |
| A14 | `NebenkostenRechner.tsx` | hausrat |
| A15 | `PflegegeldRechner.tsx` | berufsunfaehigkeit |
| A16 | `RentenRechner.tsx` | altersvorsorge **(`variant="compact"` als 4. Box)** |
| A17 | `RiesterRechner.tsx` | altersvorsorge |
| A18 | `SchenkungssteuerRechner.tsx` | sterbegeld |
| A19 | `SparRechner.tsx` | **tagesgeld** (NICHT sparplan — verivox bedient sparplan) |
| A20 | `SteuererstattungRechner.tsx` | tagesgeld |
| A21 | `VorfaelligkeitsentschaedigungRechner.tsx` | risikolebensversicherung |

**Group B — Erstinstall (9 von 10 Einbauten; B6 übersprungen):**

| # | Datei | Context |
|---|---|---|
| B1 | `ZinsRechner.tsx` | tagesgeld |
| B2 | `WitwenrenteRechner.tsx` | risikolebensversicherung |
| B3 | `InflationsRechner.tsx` | tagesgeld |
| B4 | `MwStRueckerstattungRechner.tsx` | tagesgeld |
| B5 | `PoolkostenRechner.tsx` | wohngebaeude |
| B6 | ~~`MietRechner.tsx`~~ | **skipped — Datei existiert nicht im Repo** |
| B7 | `HundejahreRechner.tsx` | tierhalterhaftpflicht |
| B8 | `UmzugskostenRechner.tsx` | hausrat |
| B9 | `ReisekostenRechner.tsx` | reiseruecktritt |
| B10 | `BudgetRechner.tsx` | sparplan |

## Seitenstruktur jedes Rechners

Definiert im Skill: `/mnt/skills/user/rechner-builder/SKILL.md`

Pflicht-Elemente in dieser Reihenfolge:
1. Breadcrumbs (Startseite > Kategorie > Rechner-Name)
2. H1 mit Emoji + Name
3. Beschreibungstext (1 Satz)
4. Eingabefelder (min. 48px Höhe, Default-Werte, Labels, live-Berechnung)
5. Ergebnis-Anzeige (große Zahl, Aufschlüsselung, visuelles Element)
6. Ergebnis-Buttons: Kopieren + Teilen (WhatsApp, E-Mail, Link)
7. AffiliateBox (wenn Affiliate vorhanden)
8. "Fix erklärt" KI-Button (`AiExplain`-Komponente)
9. "War dieser Rechner hilfreich?" Feedback (👍/👎)
10. SEO-Text (min. 600 Wörter, H2-Struktur, Formel-Box, Rechenbeispiel)
11. FAQ-Accordion (min. 5 Fragen, FAQPage Schema.org)
12. "Das könnte Sie auch interessieren" (4 verwandte Rechner-Karten)

### Schema.org Markup
- WebApplication (auf jedem Rechner)
- FAQPage (auf jedem Rechner)
- BreadcrumbList (auf jedem Rechner)

### Meta Tags
- Title: "[Rechner-Name] 2026 — [Kurzbeschreibung] | Rechenfix"
- Description mit ✓-Zeichen für Features
- Canonical: https://www.rechenfix.de/... (IMMER mit www)
- OpenGraph-Tags

## SEO-Status

### Domain-Konfiguration
- www.rechenfix.de → Primary Domain (Vercel)
- rechenfix.de → 308 Permanent Redirect auf www (gefixt am 13.04.2026, war vorher 307)
- rechenfix.vercel.app → sollte ebenfalls 308 auf www redirecten
- Alle URLs in Sitemap und Canonical Tags MÜSSEN www verwenden

### Google Search Console
- Property: rechenfix.de
- Früherer Fehler "Umleitungsfehler" (7 Seiten) durch 307→308-Fix behoben
- Früherer Fehler "Alternative Seite mit richtigem kanonischen Tag" durch Redirect-Fix behoben

## Rechtliches

- **Datenschutzerklärung:** Abschnitt 9 zu Awin-Affiliate-Links + Abschnitt 9b Amazon-Partnerprogramm (seit Prompt 122-amazon, 22.04.2026)
- **Impressum:** Enthält Hinweis zu Affiliate-Links
- **Über-uns:** Enthält Finanzierungshinweis
- **Barrierefreiheitserklärung:** `/barrierefreiheit` (seit April 2026)
- **Cookie-Banner:** Marketing-Cookies als eigene Kategorie (listet Google AdSense + Amazon Associates mit expliziter Tag-Nennung)
- **Werbekennzeichnung:** Alle AffiliateBoxen **und** AmazonBoxen zeigen "Anzeige"-Label
- **Footer-Pflichthinweis** (seit 22.04.2026): „Als Amazon-Partner verdiene ich an qualifizierten Verkäufen." — unter dem Copyright, Teilnahmebedingung
- Sprache: Deutsch, formale "Sie"-Anrede

## Entwicklung mit Claude Code

### Infrastruktur
- **rechner-config aufgeteilt:** `lib/rechner-config/alltag.ts`, `finanzen.ts`, `gesundheit.ts`, `auto.ts`, `wohnen.ts`, `mathe.ts`, `arbeit.ts` + `index.ts` + `types.ts`
- **CLAUDE.md** existiert im Projekt-Root mit allen Regeln
- Sessions: 3–5 Rechner pro Session möglich

### Offene Tasks
- Prompt 34: Systematische Crosslinks zwischen allen Rechnern
- Prompt 78-review: Barrierefreiheitserklärung Inhalts-Check nach finalem Stand
- Google Search Console: Neue URLs nach jedem Batch einreichen

### Skill für neue Rechner
Pfad: `/mnt/skills/user/rechner-builder/SKILL.md`
MUSS vor dem Bau jedes neuen Rechners gelesen werden. Enthält die komplette 12-Step-Anleitung.

### Prompt-Struktur für neue Rechner
Jeder Prompt für einen neuen Rechner enthält:
- Verweis auf den Skill (ZUERST lesen!)
- Route, Emoji, Name, Beschreibung
- Eingabefelder mit Defaults
- Berechnungsformeln (exakt, mit Code-Blöcken)
- Ergebnis-Anzeige (was wie dargestellt wird)
- Affiliate-Integration (welches Programm, welcher Context)
- SEO-Angaben (Title, Description, applicationCategory)
- SEO-Text-Themen und FAQ-Fragen
- Verwandte Rechner + Kategorie-Eintrag

### Häufige Fehler
- URLs ohne www in Sitemap oder Canonical
- clickref zeigt "startseite" statt Rechner-Namen → usePathname() verwenden
- CHECK24-Deeplinks auf check24.de statt check24.net
- Fehlender "Fix erklärt"-Button
- Keine Default-Werte (Rechner leer beim Laden)
- SEO-Text unter 600 Wörter
- Submit-Button statt Live-Berechnung
- Sidebar-Count nicht aktualisiert nach neuem Rechner
- Input-Felder unter 48px (Mobile-Probleme)

## Accessibility-Status (Stand April 2026)

- WCAG 2.1 AA Ziel erreicht (Lighthouse ≥97 auf Referenzseiten)
- Barrierefreiheitserklärung unter /barrierefreiheit
- Audit-Stand: Prompts 78a–h + 78j abgeschlossen
- Komponenten: RadioToggleGroup, TabGroup, Skip-Link, aria-live-Ergebnis-Pattern, AiExplain-Disclosure mit Fokus-Lenkung
- BFSG-Einschätzung: Kleinstunternehmer-Ausnahme greift voraussichtlich; Selbstbewertung gepflegt
- Nächstes geplantes Review: 78-review (Inhalt der BfE-Seite nach finalem Fix-Stand überprüfen)

## Komponenten-Inventar (Auswahl)

| Komponente | Pfad | Zweck |
|------------|------|-------|
| RadioToggleGroup | `components/ui/RadioToggleGroup.tsx` | Werte-Auswahl (2–4 Optionen) mit nativen Radio-Inputs + Fieldset/Legend |
| TabGroup | `components/ui/TabGroup.tsx` | Panel-Umschaltung (WAI-ARIA Tabs Pattern mit Roving Tabindex) |
| NummerEingabe | `components/ui/NummerEingabe.tsx` | Deutsche Zahleneingabe mit Einheiten-Suffix |
| ErgebnisAktionen | `components/ui/ErgebnisAktionen.tsx` | Kopieren/Teilen + debounced aria-live-Region |
| AiExplain | `components/rechner/AiExplain.tsx` | "Fix erklärt" Disclosure mit Fokus-Lenkung |
| AffiliateBox | `components/AffiliateBox.tsx` | Kontextuelle Affiliate-Empfehlung |
| CrossLink | `components/ui/CrossLink.tsx` | Verwandte Rechner-Links |
| FeedbackButtons | `components/ui/FeedbackButtons.tsx` | 👍/👎 Bewertung |
| Footer | `components/layout/Footer.tsx` | Einzige Footer-Komponente site-weit (siehe Footer-Architektur unten) |
| Skip-Link | `app/layout.tsx` | Überspringen der Navigation (href="#main-content") |

## Footer-Architektur

- **Einzige Footer-Komponente:** [components/layout/Footer.tsx](components/layout/Footer.tsx), ausschließlich vom Root-Layout ([app/layout.tsx](app/layout.tsx)) gerendert.
- **Dynamische Counts:** Rechner- und Kategorie-Zahlen werden aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) per Template-Literal berechnet (`{rechner.length} Rechner in {kategorien.length} Kategorien`) — nie hartkodiert.
- **Lint-Guard:** [scripts/check-footer.mjs](scripts/check-footer.mjs) prüft per CI, dass genau eine Footer-Komponente existiert (`footer-uniqueness`) und keine Zahlen hartkodiert sind (`footer-hardcoded-count`). Läuft im `prebuild`-Hook — Fails blockieren den Deploy.
- **Guard-Dokumentation:** G14 in [.claude/skills/rechner-builder/SKILL.md](.claude/skills/rechner-builder/SKILL.md).

## docs-Verzeichnis

- `docs/jahreswerte-kalender.md` — Governance-Kalender gesetzlicher Stichtage (Prompt 98)
- `docs/audit-arbeitspapiere/` — Audit-Berichte:
  - Welle-1-Audits: `stufe1-arbeitsblatt.md`, `welle1-stufenplan.md`, `welle1-stufe3-bericht.md`, `welle1-stufe4a-bericht.md`, `welle1-stufe4b-bericht.md`
  - Spezial-Analysen: `bafoeg-geschwister-analyse.md`, `midijob-an-sv-analyse.md`, `lohnsteuer-v-vi-analyse.md`, `slug-drift-check-2026-04.md`, `prompt-129-grundsicherungsgeld-H2.md`, `afbg-rechner-bau.md`
  - Welle-2-Audits: `welle2-stufe1-auto-bericht.md`, `welle2-stufe3-arbeit-blockA-audit.md`, `welle2-stufe3-arbeit-blockB-audit.md`
  - **`welle-status-historie.md`** (neu seit 25.04.2026) — konsolidierte Übersicht aller Wellen mit Lessons-Learned; ersetzt mehrere Memory-Einträge
- `docs/audits/` — abgeschlossene Welle-2-Berichte mit Folge-Prompts:
  - `welle2-stufe2-gesundheit.md`
  - `welle-2-stufe-3-wohnen-block-a.md`, `welle-2-stufe-3-wohnen-block-b.md`
- `docs/jahresparameter-audit-2026-04.md` — Grep-Report Prompt 86
- `docs/stufe1-rechner-semantik.md`, `docs/stufe1-5-rechner-semantik.md`, `docs/stufe2-rechner-semantik.md` — Welle-1-Audit-Artefakte
- `docs/amazon-integration.md` (Prompt 122-amazon) — Amazon-Partner-Programm: rechtliche Basics, Komponente, 16 integrierte Rechner mit Keywords, Monitoring-Plan 4/12/24 Wochen, Selbstbezug-Reminder, 180-Tage-Deadline
- `docs/a11y-baseline-2026-04.md` — Accessibility-Status-Snapshot
- `docs/referenzen/itzbund-README.md` — Jährlicher Update-Prozess für Lohnsteuer-PAP § 39b EStG

## Casing-Bug-Pattern (Windows ↔ Linux/Vercel)

Lokal Windows-NTFS = case-insensitive, Vercel-Linux = case-sensitive. Bei Component-Renames mit nur Case-Änderung: **Two-Step `git mv`** (`Foo.tsx` → `_tmp.tsx` → `foo.tsx`), `forceConsistentCasingInFileNames` greift erst bei nächster Edit. Referenz: Commit 7dd9934 (25.04.2026, MwStRueckerstattungRechner.tsx-Casing). Vor jedem Edit an Component-Dateien: `git ls-files | grep -i <name>` zur Bestätigung. Vollständige Doku: CLAUDE.md → Regel 16, SKILL.md → „Casing-Konsistenz".

## Monetarisierungs-Strategie

### AdSense
- Basis-Monetarisierung auf allen Seiten
- Mehr Traffic = mehr Impressions

### Affiliate-Einnahmen
- Kontextuelle AffiliateBox nach dem Rechenergebnis
- Max. 2–4 Boxen pro Rechner-Seite; ab der 4. Box `variant="compact"` (Beispiel RentenRechner mit 4 Boxen seit Prompt 145b)
- Stärkste Programme nach EPC: KS Auxilia (5,94€), Lexware (5,12€)
- Größtes Volumen-Potenzial: WISO/smartsteuer (Steuer-Rechner)
- Breiteste Streuung: CHECK24 (Strom, Gas, Kfz, Kredit)
- Neu: Verivox (ETF-Depot, Sparplan, Altersvorsorge)

### Affiliate-Funnels (Cross-Links)
- Kündigung → Abfindung → Steuererstattung (KS Auxilia → KS Auxilia+WISO → WISO+smartsteuer)
- Geburtstermin → Mutterschutz → Elterngeld (kein Affiliate → WISO → WISO)
- Stromkosten → Stromvergleich (CHECK24 → CHECK24)
- Auto: Sprit → Autokosten → Kfz-Steuer (alle CHECK24)
