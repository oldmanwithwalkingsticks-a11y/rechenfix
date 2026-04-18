# Jahresparameter-Audit 2026

**Scan-Datum:** 2026-04-18
**Scan-Methode:** ripgrep Stufe 1–3 (Jahresliterale, Geldwerte, Text-Strings) + manueller Visual-Check aller zentralen Libs in `lib/berechnungen/`
**Gescannte Dateien:** TS/TSX/JS/JSX unter Repo-Root, exklusive `node_modules`, `.next`, `dist`, `out`
**Rohdaten:** `/tmp/audit/stage1.txt` (84 Zeilen), `/tmp/audit/stage2.txt` (46 Zeilen), `/tmp/audit/stage3.txt` (18 Zeilen)

## Zusammenfassung

| Kategorie | Anzahl |
|---|---|
| 🚨 **Bugs** (Priorität 1, Fix nötig) | **7** |
| ⚠️ **Verdachtsfälle** (Priorität 2, Verifikation nötig) | **5** |
| 📋 **Metadaten-Fixes** (Priorität 3, batch-fähig) | **7** |
| 💬 **Hilfetext-Updates** (Priorität 3, batch-fähig) | **14** |
| ✅ **Harmlos** (zur Transparenz) | ~40 |

**Headline-Befund:** Die zentralen Libs in `lib/berechnungen/` sind nach Sprint 1 sauber auf 2026 umgestellt (Einkommensteuer, Lohnsteuer, Brutto-Netto, Pflegeversicherung, Kindergeld, DT, SV-Parameter). Die **Hartkodierungen rutschen in vier Sekundär-Rechnern durch** (`ArbeitslosengeldRechner`, `GmbhGfRechner`, `MidijobRechner`, `KurzarbeitergeldRechner`), die eigene ESt-Formeln mit 2024er/2025er-Grundfreibetrag pflegen. Zusätzlich ein **Soli-Freigrenzen-Bug im KindergeldRechner-Lib** (noch 2024er Wert 18.130 € statt 20.350 € für 2026). Die Kindergeld-Anhebung 255 → 259 € ist in der DT-Lib und Kindergeld-Lib korrekt, aber in **SEO/Metadaten noch 255 €** — das ist der größte Batch-Block für einen Folge-Prompt.

---

## 🚨 Bugs (Priorität 1)

### Bug-1: Grundfreibetrag 2025 in ArbeitslosengeldRechner hartkodiert
- Datei: `components/rechner/ArbeitslosengeldRechner.tsx:16`
- Aktueller Wert: `const grundfreibetrag = 12096;` (2025er Wert, Kommentar behauptet fälschlich "2026 (approx)")
- Erwarteter Wert 2026: `12348`
- Rechtsquelle: § 32a EStG i. V. m. Steueränderungsgesetz 2025
- Empfohlener Fix: Zentrale Konstante aus `lib/berechnungen/einkommensteuer.ts` importieren (`berechneEStGrund(zvE, 2026)`) statt eigene Formel. Auch Zone-Grenzen (17443/68480) und Konstanten (932.3, 10602.13, 18936.88) sind 2025er-Werte.
- Betroffener Rechner: `/finanzen/arbeitslosengeld-rechner`

### Bug-2: BBG Rentenversicherung 2025 West in ArbeitslosengeldRechner
- Datei: `components/rechner/ArbeitslosengeldRechner.tsx:64`
- Aktueller Wert: `const BBG_MONAT = 7550;` (Kommentar: "BBG Rentenversicherung 2026 (approx)" — falsch)
- Erwarteter Wert 2026: `8450` (einheitlich, seit 2025 keine West/Ost-Trennung)
- Rechtsquelle: Sozialversicherungsrechengrößen-Verordnung 2026
- Empfohlener Fix: Zentrale Konstante `BBG_RV` aus `lib/berechnungen/brutto-netto.ts` extrahieren und importieren (dort bereits 8450) oder in neue SSOT-Datei auslagern.
- Betroffener Rechner: `/finanzen/arbeitslosengeld-rechner`

### Bug-3: ESt-Formel 2025 im GmbhGfRechner
- Datei: `components/rechner/GmbhGfRechner.tsx:13–27`
- Aktueller Wert: `if (zvE <= 12096)`, Zone-2-Grenze `17443`, Zone-3-Grenze `68480`, Konstanten `932.3 · y + 1400`, `176.64 · z + 2397 + 1015.13`, `-10911.92`, `-19246.67` — alles 2025er Formel
- Erwarteter Wert 2026: `12348`, Zone-Grenzen `17799`/`69878`, Konstanten `914.51`, `173.10`/`1034.87`, `-11135.63`, `-19470.38` (siehe CLAUDE.md)
- Rechtsquelle: § 32a EStG 2026
- Empfohlener Fix: `berechneEStGrund(zvE, 2026)` aus `lib/berechnungen/einkommensteuer.ts` importieren statt eigene Formel — identisches Pattern wie in drei anderen Rechnern verletzt Sprint-1-Lektion "Hartkodierungen rutschen durch".
- Betroffener Rechner: `/finanzen/gmbh-gf-rechner` (GmbH-Geschäftsführer-Gehalt)

### Bug-4: ESt-Formel 2025 im MidijobRechner
- Datei: `components/rechner/MidijobRechner.tsx:20–35`
- Aktueller Wert: `const grundfreibetrag = 12096;` + Zone-Grenzen `17443`/`68480` + Konstanten `932.3`, `176.64`, `1015.13`, `-10602.13` (der `-10602.13`-Wert ist sogar 2024er!) — Mischung mehrerer Jahre
- Erwarteter Wert 2026: siehe Bug-3
- Rechtsquelle: § 32a EStG 2026
- Empfohlener Fix: `berechneEStGrund(...)` aus `lib/berechnungen/einkommensteuer.ts` importieren.
- Betroffener Rechner: `/finanzen/midijob-rechner`

### Bug-5: Grundfreibetrag 2024 im KurzarbeitergeldRechner
- Datei: `components/rechner/KurzarbeitergeldRechner.tsx:19–25`
- Aktueller Wert:
  ```
  'I':   (b) => progressiveSteuer(b, 11604),
  'II':  (b) => progressiveSteuer(b, 14924),
  'III': (b) => progressiveSteuer(b, 23208),
  'IV':  (b) => progressiveSteuer(b, 11604),
  ```
  `11604 €` ist **2024er Grundfreibetrag** (war 2025: 12096, 2026: 12348). `23208 = 2 × 11604` (Splitting) und `14924 = 11604 + 3320` (Alleinerziehenden-Entlastung — auch veraltet, 2026: 12348 + 4260 = 16608).
- Erwarteter Wert 2026:
  - SK I/IV: `12348`
  - SK III: `24696` (= 2 × 12348)
  - SK II: `16608` (= 12348 + 4260 Entlastungsbetrag Alleinerziehende)
- Rechtsquelle: § 32a EStG + § 24b EStG (Entlastungsbetrag)
- Empfohlener Fix: `berechneLohnsteuerJahr(...)` aus `lib/berechnungen/lohnsteuer.ts` nutzen — dort sind Grundfreibetrag, Entlastungsbetrag und Splittingtarif bereits 2026-konform.
- Betroffener Rechner: `/arbeit/kurzarbeitergeld-rechner`

### Bug-6: BBG KV 2025 in SchnellCheck-Tipp
- Datei: `components/rechner/SchnellCheck.tsx:64–69`
- Aktueller Wert: `if (brutto > 5512)` + Text "liegt über der KV-Beitragsbemessungsgrenze (5.512,50 €)" + Kommentar "2025: 5512,50 €/Monat"
- Erwarteter Wert 2026: `5812` bzw. `5.812,50 €` (BBG KV/PV 2026)
- Rechtsquelle: Sozialversicherungsrechengrößen-Verordnung 2026
- Empfohlener Fix: `BBG_KV` aus `lib/berechnungen/brutto-netto.ts` importieren (ist bereits auf 5812.50 gesetzt).
- Betroffener Rechner: Tipp-Widget im Brutto-Netto-Rechner — nutzer-sichtbar als falsch-flankierender Hinweis.

### Bug-7: Soli-Freigrenze 2024 in Kindergeld-Lib
- Datei: `lib/berechnungen/kindergeld.ts:55–56`
- Aktueller Wert:
  ```
  const SOLI_FREIGRENZE = 18130;
  const SOLI_MILDERUNGSGRENZE = 33761;
  ```
  `18130` ist **2024er Soli-Freigrenze** (2025: 19950, 2026: 20350). `33761` entspricht ca. 1,86 × 18130 (2024er Obergrenze der Milderungszone) — 2026 müsste es ca. 37.838 sein (20.350 × 1,859375).
- Erwarteter Wert 2026:
  - `SOLI_FREIGRENZE = 20350`
  - `SOLI_MILDERUNGSGRENZE ≈ 37838` (rechnerisch aus Milderungszonen-Formel; Details in `einkommensteuer.ts`)
- Rechtsquelle: § 4 SolzG (Freigrenze) + BMF-Werte 2026
- Empfohlener Fix: Diese Konstanten aus `PARAMS[2026].soliFreigrenze` (`einkommensteuer.ts`) ableiten oder zentral in `lib/berechnungen/soli.ts` auslagern. Bug verfälscht die Günstigerprüfung Kindergeld vs. Kinderfreibetrag bei mittleren/höheren Einkommen, weil Soli fälschlich schon bei 18.130 € ESt greift.
- Betroffener Rechner: `/finanzen/kindergeld-rechner` (Günstigerprüfung)

---

## ⚠️ Verdachtsfälle (Priorität 2)

### Verdacht-1: Mindestlohn 2026 — Wert 12,82 € oder 13,90 €?
- Dateien: 
  - `lib/berechnungen/minijob.ts:48` — `MINDESTLOHN_2026 = 12.82`
  - `lib/berechnungen/stundenlohn.ts:3` — `MINDESTLOHN_2026 = 12.82`
  - `lib/berechnungen/streaming-kosten.ts:123` — `MINDESTLOHN_2025 = 12.82`
  - `lib/berechnungen/wahrer-stundenlohn.ts:62` — `MINDESTLOHN = 12.82 // 2025`
  - `app/finanzen/mindestlohn-netto/page.tsx:12` — `STUNDENLOHN = 12.82`
  - `components/rechner/HochRechner.tsx:28` — `MINDESTLOHN = 12.82`
  - Diverse SEO-Texte (`finanzen.ts:456, 476, 1666, 1694, 1696, 1716`, `TippDesTages.tsx:33`)
- Begründung Verdacht: Die Werte-Tabelle in Prompt 86 listet `MINDESTLOHN_2026 = 13,90 €`. Im Code und in allen SEO-Texten steht durchgehend `12,82 €` als 2026-Wert. Laut Content ("Für 2026 gilt weiterhin 12,82 € pro Stunde") geht das Projekt aktuell davon aus, dass der Mindestlohn 2026 unverändert bei 12,82 € bleibt (d. h. die Anhebung auf 13,90 € wurde verschoben oder betrifft 2027).
- Verifikation nötig: Offizielle Mindestlohnkommission / BMAS-Quelle prüfen. Entweder Prompt-Werte-Tabelle ist falsch (Code stimmt) oder der Code ist falsch (dann Batch-Update auf 13,90 € nötig). **Annahme unklar — bewusst nicht selbst recherchiert wie in Nicht-Zielen gefordert.**
- Betroffene Rechner: alle mit Mindestlohn-Bezug: `/finanzen/hochrechner`, `/finanzen/mindestlohn-netto`, `/finanzen/stundenlohn-rechner`, `/finanzen/wahrer-stundenlohn`, `/finanzen/minijob-rechner`, `/alltag/streaming-kosten-rechner`

### Verdacht-2: Rentenwert ab 01.07.2026
- Datei: `lib/berechnungen/rente.ts:35`
- Aktueller Wert: `const RENTENWERT = 39.32; // € pro Rentenpunkt (ab 01.07.2025, gilt bis 30.06.2026)`
- Begründung Verdacht: Der Kommentar sagt selbst "gilt bis 30.06.2026". Heute ist 2026-04-18, der Wert gilt also noch ~2,5 Monate. Ab 01.07.2026 setzt der neue Rentenwert (Rentenanpassungsverordnung 2026). Wenn die Anpassung beschlossen ist, wäre es eine Möglichkeit, jetzt bereits beide Werte einzupflegen (Zeitraum-Switch zum 01.07.2026).
- Verifikation nötig: BMAS-Rentenanpassungsverordnung 2026 (üblicherweise März/April beschlossen).
- Betroffener Rechner: `/finanzen/rentenrechner`

### Verdacht-3: Pfändungstabelle ab 01.07.2026
- Datei: `lib/berechnungen/pfaendung.ts:26` und diverse SEO-Strings (`finanzen.ts:2850, 2909, 2925`, `PfaendungRechner.tsx:217, 224`)
- Aktueller Wert: Pfändungstabelle gültig ab 01.07.2025, Basisfreibetrag 1.555,99 €/Monat, "nächste Anpassung 01.07.2026"
- Begründung Verdacht: Gilt noch ~2,5 Monate. § 850c ZPO: Anpassung alle zwei Jahre zum 01.07. Die neue Tabelle wird typischerweise im Frühjahr durch den Bundesjustizminister verkündet (Pfändungsfreigrenzenbekanntmachung 2026). Wenn der neue Wert schon bekannt ist, vorab einpflegen (Zeitraum-Switch).
- Verifikation nötig: Bundesjustizministerium / BGBl. 2026 prüfen.
- Betroffener Rechner: `/finanzen/pfaendungsrechner`

### Verdacht-4: Steuerprogressions-Chart-Zonen auf 2025
- Datei: `components/rechner/SteuerprogressionsRechner.tsx:27–32`
- Aktueller Wert: Chart-Hintergrund-Zonen mit Grenzen `12096, 29538, 66153, 255810` (2025er Tarifzonen-Eckwerte)
- Begründung Verdacht: Die eigentliche Berechnung in `lib/berechnungen/steuerprogression.ts` nutzt korrekt den 2026er Tarif (Grundfreibetrag 12348, Zone-Grenze 17799/69878). Aber die farbigen Chart-Buckets zeigen 2025er-Grenzen — optisch leicht verschoben, nicht rechnerisch falsch.
- Verifikation nötig: Kein Rechenbug, sondern kosmetische Abweichung zwischen Chart-Darstellung und tatsächlicher Berechnung.
- Betroffener Rechner: `/finanzen/steuerprogression-rechner`

### Verdacht-5: Minijob-Grenze 603 € "seit 2024"
- Datei: `lib/rechner-config/finanzen.ts:2469`
- Aktueller Wert: "Der Minijob ist die einfachste Form des Nebenverdiensts. Seit 2024 liegt die Grenze bei 603 € monatlich..."
- Begründung Verdacht: Minijob-Grenze 2024 war 538 €, 2025 wurde sie auf 556 € erhöht (an Mindestlohn 12,41 € gekoppelt), 2026 bei Mindestlohn 12,82 € ergäbe sich rechnerisch ~556 €. Der Wert `603 €` in `minijob.ts:46` ist als "geschätzt" markiert und passt nicht zur 12,82 × 10 × 4,33 ≈ 555 €-Rechnung. Entweder Gesetzgeber hat aufgerundet oder der Wert ist veraltet (siehe 2024-Erwähnung im SEO-Text).
- Verifikation nötig: BMAS offizielle Minijob-Grenze 2026 prüfen.
- Betroffener Rechner: `/finanzen/minijob-rechner`, alle Texte zum Minijob

---

## 📋 Metadaten-Fixes (Priorität 3, Batch-fähig)

Kindergeld-Metadaten zeigen noch 255 € statt 259 € für 2026 — obwohl die DT- und Kindergeld-Lib bereits korrekt 259 € rechnen. Ein Folge-Prompt kann alle sieben Stellen in einem Batch aktualisieren.

| # | Datei:Zeile | Feld | Aktuell | Soll |
|---|---|---|---|---|
| M1 | `lib/rechner-config/finanzen.ts:1242` | `metaDescription` | "Kindergeld 2026: 255 € pro Kind …" | "Kindergeld 2026: 259 € pro Kind …" |
| M2 | `lib/rechner-config/finanzen.ts:1243` | `keywords` | `['…', '255 euro kindergeld', 'kinderfreibetrag 2026', …]` | `'259 euro kindergeld'` |
| M3 | `lib/rechner-config/finanzen.ts:1245` | `formel` | "Kindergeld 2026 = 255 € × Anzahl Kinder …" | "259 € × Anzahl Kinder" |
| M4 | `lib/rechner-config/client-data.ts:862` | Suchbegriff-Liste | `"255 euro kindergeld"` | `"259 euro kindergeld"` |
| M5 | `scripts/apply-v2-titles.js:36` | `newMeta` | "Kindergeld 2026 — 255 € & Günstigerprüfung" | "… 259 € & …" |
| M6 | `scripts/validate-suggestions.js:21` | Liste | "Kindergeld 2026 — 255 € & Günstigerprüfung" | "… 259 € & …" |
| M7 | `lib/rechner-config/finanzen.ts:1666` | `metaDescription` (Hochrechner) | "… Mindestlohn-Check 12,82 € …" | bleibt, sofern Mindestlohn-Wert (siehe Verdacht-1) bestätigt |

---

## 💬 Hilfetext-Updates (Priorität 3, Batch-fähig)

Freitexte (SEO-Absätze, FAQ-Antworten, UI-Hinweise) mit veralteten Jahreszahlen oder Werten. Kein Rechenbug, aber Nutzer-sichtbar falsch oder verwirrend.

| # | Datei:Zeile | Befund | Empfohlener Fix |
|---|---|---|---|
| H1 | `lib/rechner-config/finanzen.ts:45` | "Versicherungspflichtgrenze … 69.300 €/Jahr in 2025" | auf 2026: 73.800 €/Jahr (Verifikation an offizieller Quelle) |
| H2 | `lib/rechner-config/finanzen.ts:1249` | "Seit Januar 2025 beträgt das Kindergeld einheitlich 255 Euro … Für 2026 bleibt dieser Betrag unverändert." | **Falsch!** Kindergeld 2026 ist 259 €. SEO-Absatz komplett überarbeiten. |
| H3 | `lib/rechner-config/finanzen.ts:1493, 1497` | Grenzbelastung-Erklärung mit "12.096 Euro" als Grundfreibetrag | auf 12.348 € aktualisieren |
| H4 | `lib/rechner-config/finanzen.ts:456, 476` | Mindestlohn "seit 1. Januar 2025 12,82 €" — Datum 2025 statt 2026 | zu "seit 1. Januar 2026" anpassen (wenn 12,82 € 2026-Wert bleibt, siehe Verdacht-1) |
| H5 | `lib/rechner-config/finanzen.ts:1977` | "Deutschlandticket (49 €)" und "bis 58 €/Monat" | Preis 58 € seit Januar 2025 — widersprüchlich im selben Absatz |
| H6 | `lib/rechner-config/finanzen.ts:2469` | "Seit 2024 liegt die [Minijob-]Grenze bei 603 €" | "Seit 2025" bzw. Wert verifizieren (siehe Verdacht-5) |
| H7 | `lib/rechner-config/alltag.ts:449` | "12,82 €/Stunde, Stand 2025" im Streaming-Kosten-Text | auf "Stand 2026" |
| H8 | `lib/rechner-config/alltag.ts:475` | "Stand 2025" bei Streaming-Preisen | auf "Stand 2026" |
| H9 | `lib/rechner-config/gesundheit.ts:98, 118` | "Zigarettenpreise … liegt in Deutschland 2025 bei 8,50–9,50 €" | auf 2026 aktualisieren (Tabaksteuer-Erhöhung 2026 beachten) |
| H10 | `app/finanzen/brutto-netto-tabelle/page.tsx:140` | "GKV mit 1,7% Zusatzbeitrag … Stand 2025/2026" | 2026er Zusatzbeitrag ist 2,9 % voll / 1,45 % AN — Wert und Datum aktualisieren |
| H11 | `app/finanzen/brutto-netto-tabelle/page.tsx:172` | BBG "2025 bei 5.512,50 € monatlich … 7.550 € (West)" | 2026: 5.812,50 € (KV) / 8.450 € (RV, einheitlich) |
| H12 | `components/rechner/BruttoNettoRechner.tsx:565` | "GKV mit 1,7% Zusatzbeitrag" | analog zu H10 |
| H13 | `components/ui/TippDesTages.tsx:33` | "Mindestlohn 2026: 12,82 € … ca. 2.051 € brutto … rund 1.560 € netto" | Zahlen gegen aktuellen Brutto-Netto-Rechner nachrechnen (2026er Werte können abweichen) |
| H14 | `app/api/explain/route.ts:101, 103` | Prompt-Strings für KI-Explain mit "(12,82€/Std 2025)" und "(2025: bis zu 62 freie Tage …)" | auf 2026 aktualisieren (hat Nutzer-Impact, weil KI-Antworten veraltet klingen) |

---

## ✅ Harmlos (zur Transparenz dokumentiert)

Diese Treffer wurden bewusst nicht zu Bugs/Verdacht erhoben:

- **Historische Rückwärts-Rechner:** `lib/berechnungen/einkommensteuer.ts:30–32, 96–97` — Jahres-Dispatcher mit 2024/2025/2026, `components/rechner/EinkommensteuerRechner.tsx:100–101` — Dropdown mit 2024/2025/2026. Gewollt, bleibt.
- **Historische Zitate in SEO-Texten:** Inflation 2021–2024 (`finanzen.ts:600, 620`), Statistiken "2024 bestellten 25 Mio Deutsche" (`alltag.ts:587`), "Sparquote 2024 bei 11 %" (`alltag.ts:1595`), "Primzahl Stand 2024" (`mathe.ts:1035`), "Durchschnittsgehalt 2025" (Long-Tail-Seiten `3000-euro-brutto-netto/page.tsx:29` etc.).
- **Gesetzes-Einführungsdaten:** Fünftelregelung "seit 2025" (`arbeit.ts:792, 794, 826`, `AbfindungsRechner.tsx:215`), Grundsteuer-Reform "seit 2025" (`wohnen.ts:933, 935`), Balkonkraftwerk "seit 2024" (`wohnen.ts:1596, 1624, 1640, 1644`, `BalkonSolarRechner.tsx:44`), Kfz-Steuer-Befreiung "bis 31.12.2025" (`auto.ts:169, 200, 202, 233`), Bußgeldreform 2024 (`auto.ts:261, 265`, `BussgeldRechner.tsx:195`), Elterngeld-Einkommensgrenze April 2024 (`finanzen.ts:260, 266`), Kleinunternehmer ab 2025 (`arbeit.ts:575`) — alle sachlich korrekt als historische Aussage.
- **Historische ESt-Formeln:** `lib/berechnungen/einkommensteuer.ts:58–72, 76–91` — `berechneESt2025` und `berechneESt2024` sind bewusst erhalten für den historischen Dispatcher.
- **BGH-Urteil XII ZB 6/24 v. 23.10.2024:** `lib/berechnungen/duesseldorfer-tabelle.ts:12, 146, 185` — korrekte Quellenangabe.
- **Steuererklärungsfristen:** `finanzen.ts:780` — "Steuererklärung 2025 bis 31.07.2026 abgeben" — sachlich aktuell.
- **Rentenwert 39,32 €:** `finanzen.ts:999`, `rente.ts:35` — noch bis 30.06.2026 gültig (siehe Verdacht-2 für Vorab-Update).
- **Pfändungstabelle ab 01.07.2025:** `finanzen.ts:2850, 2890, 2909, 2925`, `pfaendung.ts:26`, `PfaendungRechner.tsx:217, 224` — noch bis 30.06.2027 gültig (siehe Verdacht-3).
- **Model-ID:** `app/api/explain/route.ts:194` — `claude-sonnet-4-20250514` ist eine API-Model-ID, nicht jahresbezogen.
- **Inflation-Chart:** `InflationsRechner.tsx:216` — "Durchschnitt 2014–2024 bei 2,8 %" — historische Aussage.
- **GehaltserhoehungRechner.tsx:305** — `INFLATION_2025`-Variable für "Inflationscheck". Variable zeigt 2025er Inflation als Referenz; für Rechner-Logik (Reallohn-Vergleich "Ihre Erhöhung vs. Inflation") ist das der letztverfügbare Jahreswert — sachlich korrekt als Vorjahres-Benchmark.

---

## Done-Check

- [x] Alle 3 ripgrep-Stufen gelaufen, Output-Files in `/tmp/audit/stage{1,2,3}.txt`
- [x] Zentrale Libs visuell geprüft (`einkommensteuer.ts`, `lohnsteuer.ts`, `kindergeld.ts`, `brutto-netto.ts`, `pflegeversicherung.ts`, `sv-parameter.ts`, `duesseldorfer-tabelle.ts`, `steuerprogression.ts`, `minijob.ts`, `pfaendung.ts`, `rente.ts`, `kfz-steuer.ts`, `balkon-solar.ts`, `waermepumpe.ts`)
- [x] Werte-Tabelle aus Prompt 86 abgeglichen:
  - `GRUNDFREIBETRAG_2026 = 12.348` ✅ in `einkommensteuer.ts:32`, `lohnsteuer.ts:174`, `steuerprogression.ts:34`, `kindergeld.ts:70`
  - `KINDERGELD_2026 = 259` ✅ in `duesseldorfer-tabelle.ts:28`, `kindergeld.ts:39`
  - `KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 = 0,0145` ✅ in `sv-parameter.ts:32` (via 2,9 %/200)
  - `MINDESTLOHN_2026 = 13,90` ⚠️ Code zeigt 12,82 € — Verifikation nötig (Verdacht-1)
  - `BBG_RV_WEST_2026_MONAT = 8.450` ✅ in `brutto-netto.ts:120`, `lohnsteuer.ts:64` (101.400 €/Jahr)
  - `BBG_KV_2026_MONAT = 5.812,50` ✅ in `brutto-netto.ts:119`, `lohnsteuer.ts:65` (69.750 €/Jahr)
  - `CO2_PREIS_2026_EUR_PRO_TONNE = 65` — keine entsprechende Konstante im Code gefunden (kein Rechner nutzt aktuell CO2-Preis; nur kg/kWh-Emissionsfaktoren)
- [x] Jeder relevante Treffer klassifiziert (Bug / Verdacht / Metadaten / Hilfetext / Harmlos)
- [x] Bugs dokumentiert mit Datei:Zeile, aktuellem Wert, erwartetem Wert, Rechtsquelle, Fix-Empfehlung
- [x] Batch-fähige Fixes (M1–M7 für Metadaten, H1–H14 für Hilfetexte) als sammelbare Listen aufbereitet

## Empfohlene Folge-Prompts

1. **Prompt 87** — Bug-Fix-Batch: Bug-1 bis Bug-7 (zentrale Libs in vier Sekundär-Rechnern nutzen, Soli-Freigrenze im Kindergeld-Rechner korrigieren). ESt-Formel-Duplikate refactoren nach Sprint-1-Lektion.
2. **Prompt 88** — Mindestlohn-Verifikation: Verdacht-1 klären, ggf. Batch-Update auf 13,90 € in ~15 Stellen.
3. **Prompt 89** — Kindergeld-255-auf-259 Batch: M1–M6 in einem Schritt (Metadaten, Keywords, SEO-Texte, Script-Konfig-Dateien).
4. **Prompt 90** — Hilfetext-Update-Batch: H1–H14 (SEO-Absätze und UI-Hinweise auf 2026 bringen, insb. BBG-Werte und KV-Zusatzbeitrag in Brutto-Netto-Tabelle).
5. **Prompt 91** (optional, je nach Stichtag) — Rentenwert- und Pfändungstabellen-Update vorab einpflegen für den 01.07.2026-Switch (Verdacht-2, Verdacht-3).
