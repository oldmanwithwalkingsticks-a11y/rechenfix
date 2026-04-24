# Rechenfix.de — Projekt-Referenz

Stand: 25.04.2026

## Was ist rechenfix.de?

Rechenfix.de ist ein deutschsprachiges Online-Rechner-Portal mit aktuell **169 kostenlosen Rechnern** in 9 Kategorien. Slogan: "Fix gerechnet!". Alleinstellungsmerkmal gegenüber Konkurrenz: **KI-Erklärungen** ("Fix erklärt") via Anthropic Claude API — kein anderer deutscher Rechner-Anbieter hat das. Alle Berechnungen erfolgen live im Browser ohne Submit-Button. WCAG 2.1 AA konform (Lighthouse ≥97).

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

## Rechner-Inventar (Stand April 2026)

**170 eigenständige Rechner in 9 Kategorien** (Stand 24.04.2026, Quelle: Prompt 132.5 SSOT-Scan):

| Kategorie | Slug | Anzahl |
|---|---|---|
| Alltag | `/alltag` | 23 |
| Finanzen | `/finanzen` | 44 |
| Gesundheit | `/gesundheit` | 17 |
| Auto & Verkehr | `/auto` | 11 |
| Wohnen & Energie | `/wohnen` | 25 |
| Mathe & Schule | `/mathe` | 18 |
| Arbeit & Recht | `/arbeit` | 18 |
| Kochen & Ernährung | `/kochen` | 12 |
| Sport & Fitness | `/sport` | 2 |
| **Summe** | | **170** |

**Verschiebungen seit letztem Sync (Prompt 97, 19.04.2026):**
- **Auto 10 → 11, Finanzen 45 → 44:** Firmenwagen-Rechner migriert aus der Finanzen- in die Auto-Kategorie und Slug-Schreibweise auf Bindestrich-Konvention normalisiert (Prompt 126, 301-Redirect in `next.config.mjs`).
- **Arbeit 17 → 18:** Ehegattenunterhalt-Rechner neu hinzugekommen.

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

## Status April 2026

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

**Parkend (wartet auf AdSense-Freigabe):**
- ⏸ Prompt 68 — Google CMP + Consent Mode v2
- ⏸ Prompt 85 — AdSense `data-nscript` Warning Fix
- Rollback-Prompt 69 bleibt im Repo als Sicherheit

**Offen:**
- 🎯 GSC: Sitemap neu einreichen nach Deploy; CTR-Review der 3 neuen Awin-Partner ~20.05.2026
- 🎯 Neue Rechner-Batches (thematisch offen)
- 🎯 Jahresparameter-Audit 2027 (Frühjahr 2027): ESt-Tarif 2027, SV-Rechengrößen 2027, JAEG, Zusatzbeitrag, D-Ticket, Pfändung-Switch zum 01.07.2028
- 🎯 **Welle 2 Stufe 2 Gesundheit** (Prompt 140, kommend): 17 Rechner-Audit nach 4-Punkt-Methodik, vermutliche Hot Spots blutdruck, kalorien, bmi, schwangerschaft
- 🎯 **Prompt 133 TaxiRechner Stadt-Preset-UX:** 5 Städte-Presets (Karsten-Auswahl ausstehend), `taxi-preset-tarife.ts` mit Stichtag-Kommentar pro Stadt, CLAUDE.md-Wartungsregel halbjährlich. Vorbereitet durch `TARIFE_STAND` in `lib/berechnungen/taxi.ts` (Prompt 132 A5)
- 🎯 **Prompt 120c (Juni 2026):** Wohngeld-Lib-Refactoring auf Pro-Person-Architektur §§ 14–16 WoGG, gebündelt mit Grundsicherungsgeld-Reform (Switch 01.07.2026). Nach Umsetzung: `STATISCHE_OVERRIDES`-Ausschluss aufheben, dynamische Route rendert wieder den interaktiven Rechner. KdU-1,5-Fache-Cap (§ 22 Abs. 1 SGB II n.F., aus Prompt 129 Teil B Nicht-Scope) könnte dabei als Nebenprodukt integriert werden
- 🎯 **Prompt 121a (~August 2026 bei Bedarf):** BAföG WS 2026/27-Erhöhung einpflegen (neuer Bucket `BAFOEG_AB_2026_08_01` in `bafoeg-parameter.ts`, wenn Verordnung verabschiedet)
- 🎯 **Prompt 122 P3-Polish:** echte § 11 Abs. 4 BAföG-Aufteilungsregel als zweites Input-Feld „geförderte Geschwister", Pfändung Obergrenze-Anzeige permanent, Regelsatz-Info-Tabelle aus Lib ableiten, Pfändung dynamische Beispieltabelle, Schüler-BAföG-Bedarfssatz-Hinweis
- 🎯 **Amazon-Monitoring** 4/12/24 Wochen (ab 22.04.2026): Erste Klick-Stats, Conversion-Rate, Eskalation vor 19.10.2026-Deadline (siehe `docs/amazon-integration.md`)

**Welle-Status:**
- **Welle 1 (Hoch-Risiko, Steuer/SV/Familie/Arbeitsrecht/Spezial-Steuer/Sozialleistungen):** ✅ ABGESCHLOSSEN April 2026 (Stufen 1+2+1.5+3+4a+4b)
- **Welle 2 (Mittel-Risiko):** Stufe 1 Auto ✅ ABGESCHLOSSEN 23.04.2026; **Stufe 2 Gesundheit ✅ ABGESCHLOSSEN 25.04.2026** (Prompts 140–144b, 17 Rechner, 2 P1 + 9 P2 + 9 P3 alle gefixt + Feature-Add Perioden-Länge); Stufe 3 offen (Kategorie noch zu wählen — Wohnen / Alltag / Mathe / Arbeit / Kochen / Sport)
- **Welle 3 (Niedrig-Risiko-Stichprobe Alltag/Kochen/Mathe/Wohnen):** noch nicht begonnen — vorgesehen nach Welle 2

**Neue Scripts seit letztem Sync:**
- `scripts/slug-drift-scan.mjs` (Prompt 132.5, als Prebuild-Hook seit 132.6) — prüft hartkodierte `/<kategorie>/<slug>`-Pfade gegen SSOT, bricht Build bei nicht-whitelisted Drifts ab. Ad-hoc via `npm run lint:slugs`.

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
- `docs/audit-arbeitspapiere/` **(neu seit Prompt 107c)** — Stufenpläne der Welle-1-Audits (`stufe1-arbeitsblatt.md`, `welle1-stufenplan.md`, `welle1-stufe3-bericht.md`, `welle1-stufe4a-bericht.md`, `welle1-stufe4b-bericht.md`, `bafoeg-geschwister-analyse.md`); dienen bei weiteren Audits als Methodik-Referenz
- `docs/jahresparameter-audit-2026-04.md` — Grep-Report Prompt 86
- `docs/stufe1-rechner-semantik.md`, `docs/stufe1-5-rechner-semantik.md`, `docs/stufe2-rechner-semantik.md` — Welle-1-Audit-Artefakte
- `docs/amazon-integration.md` **(neu seit Prompt 122-amazon)** — Amazon-Partner-Programm: rechtliche Basics, Komponente, 16 integrierte Rechner mit Keywords, Monitoring-Plan 4/12/24 Wochen, Selbstbezug-Reminder, 180-Tage-Deadline
- `docs/referenzen/itzbund-README.md` — Jährlicher Update-Prozess für Lohnsteuer-PAP § 39b EStG

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
