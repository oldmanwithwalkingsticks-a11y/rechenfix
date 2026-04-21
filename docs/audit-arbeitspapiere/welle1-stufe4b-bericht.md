# Welle 1 Stufe 4b — Sozialleistungen — Audit-Bericht

**Prompt:** 119
**Datum:** 2026-04-21
**Methodik:** 7-Punkt-Check (analog Welle-1-Stufe-4a, Prompt 114)
**Scope:** 4 Rechner (BAföG, Wohngeld, Bürgergeld, Pfändung)
**Audit-Ausgang:** Nur Befund + Priorisierung, kein Code-Fix

---

## Zusammenfassung

| Metrik | Anzahl |
|---|---|
| Rechner geprüft | 4 |
| **P1-Bugs** | **9** |
| **P2-Bugs** | **7** |
| **P3 / Code-Qualität** | **6** |
| SSOT-Refactor-Kandidaten | 3 (bafoeg-parameter.ts, wohngeld-parameter.ts, buergergeld-parameter.ts) |
| Struktur-Befund | Pfändung ist am saubersten; BAföG + Wohngeld haben parameter-veraltete Libs; Bürgergeld funktional aber feature-knapp |

**Highlights:**

1. **BAföG** — Bedarfssätze & Zuschläge **systematisch veraltet**. Höchstsatz laut Code 1.056 € statt offizieller 992 € (+64 €/Monat = +768 €/Jahr zu hoch). Lib-Werte vermutlich aus Zeitraum vor 01.08.2024 (letzte BAföG-Novelle). KV-Zuschlag 94 € statt 102 €, PV-Zuschlag 28 € statt 35 €. — **3 P1**
2. **Wohngeld** — **4 P1-Bugs**: (a) 35 Höchstbetrags-Zellen in `HOECHSTBETRAEGE` liegen durchgängig ca. 4–5 % über den offiziellen 2026-Werten (§ 12 WoGG), (b) Einkommensbereinigung nur 10 % statt gesetzlich 3×10 % = 30 %, (c) Schwerbehinderten-Freibetrag 150 €/Mo statt 125 €/Mo, (d) Alleinerziehenden-Freibetrag pauschal 130 €/Mo statt 110 €/Mo pro Kind (nicht gestaffelt).
3. **Bürgergeld** — Regelsätze 2026 korrekt abgebildet (Nullrunde via Besitzschutzregelung ✓). Feature-Gap: **Mehrbedarfe fehlen komplett** (Alleinerziehende +12–48 %, Schwangerschaft +17 %, Behinderung, Ernährung), keine KdU-Angemessenheitsprüfung. Zum 01.07.2026 **Umbau zur „Neuen Grundsicherung"** — Stichtag-Switch-Vorbereitung ausstehend.
4. **Pfändung** — Werte für beide Tabellen-Zeiträume korrekt (BGBl.-verifiziert). **P1: Rechner nutzt § 850c Abs. 3 Pauschalquote statt amtlicher 10-€-Stufen-Tabelle** → Cent-Abweichungen bis ~±7 € bei hohen Nettos. Prompt fordert „±0,01 €" — aktuell nicht erreicht. Latente Modul-Scope-Falle bei `GRUNDFREIBETRAG` (nicht aktiv genutzt, aber vorhanden).

---

## Pre-Audit-Inventur

### Parameter-Stand

| Parameter | Lib-Wert | Soll-Wert 2026 | Rechtsquelle | Δ |
|---|---|---|---|---|
| BAföG Grundbedarf studium/eltern | 511 | 511 | § 13 BAföG | ✓ |
| BAföG Grundbedarf studium/eigene | 934 | 855 (475+380) | § 13 BAföG | **−79 / +79 im Code** |
| BAföG KV-Zuschlag | 94 | 102 | § 13a BAföG | **−8** |
| BAföG PV-Zuschlag | 28 | 35 | § 13a BAföG | **−7** |
| BAföG Kinderzuschlag | 160/Kind | 160/Kind | § 14b BAföG | ✓ |
| BAföG Elternfreibetrag verheiratet | 2.415 €/Mo | 2.415 €/Mo | § 25 BAföG | ✓ |
| BAföG Elternfreibetrag alleinstehend | 1.605 €/Mo | 1.605 €/Mo | § 25 BAföG | ✓ |
| BAföG Anrechnungsquote Eltern | 0,45 | 0,50 | § 11 Abs. 4 BAföG | **−0,05 (Fragezeichen, Cross-Check)** |
| Wohngeld Höchstbetrag 1P/I | 377 | 361 | § 12 WoGG 2026 | **+16** |
| Wohngeld Höchstbetrag 4P/IV | 881 | 858 | § 12 WoGG 2026 | **+23** |
| Wohngeld Einkommensabzug Pauschal | 10 % | 30 % (3×10) | § 16 WoGG | **−20 pp** |
| Wohngeld Schwerbeh.-Freibetrag | 150 €/Mo | 125 €/Mo | § 17 Nr. 2 WoGG | **+25** |
| Wohngeld Alleinerziehend-Freibetrag | 130 €/Mo pauschal | 110 €/Mo pro Kind | § 17 Nr. 3 WoGG | **abweichender Mechanismus** |
| Bürgergeld RBS 1 alleinstehend | 563 | 563 | SGB II + Besitzschutz | ✓ |
| Bürgergeld RBS 2 paar (pro Person) | 506 | 506 | SGB II | ✓ |
| Bürgergeld Vermögen-FB erste Person | 40.000 | 40.000 | § 12 Abs. 4 SGB II | ✓ |
| Bürgergeld Einkommens-FB Stufe 1 | 100 € frei | 100 € frei | § 11b SGB II | ✓ |
| Pfändung Grundfreibetrag bis 30.06.2026 | 1.555,00 | 1.555,00 | BGBl. 2025 | ✓ |
| Pfändung Grundfreibetrag ab 01.07.2026 | 1.587,40 | 1.587,40 | BGBl. 2026 I Nr. 80 | ✓ |

### Zentrale Rechtsquellen

- **BAföG:** BAföG-Gesetz in der Fassung 26. BAföG-ÄndG v. 13.12.2022 + 27. BAföG-ÄndG v. 23.07.2024 (letzte Satzerhöhung 01.08.2024). Verordnung für WS 2026/27 (+14 % Wohnpauschale) **noch nicht verabschiedet** Stand 21.04.2026.
- **WoGG:** § 12 WoGG i.d.F. Wohngeld-Plus-Gesetz 2023 + Dynamisierungsverordnung v. 18.10.2024 (gültig seit 01.01.2025).
- **SGB II:** Bürgergeld-Regelbedarfsermittlungsgesetz 2025 mit § 28a-Besitzschutz (Nullrunde 2026 bestätigt durch BMAS 10/2025).
- **ZPO § 850c:** Pfändungsfreigrenzen-Bekanntmachung 2026 (BGBl. 2026 I Nr. 80 v. 26.03.2026).

---

## Pro Rechner

### 1. BAföG-Rechner — [/finanzen/bafoeg-rechner](../../components/rechner/BafoegRechner.tsx)

**Lib:** [lib/berechnungen/bafoeg.ts](../../lib/berechnungen/bafoeg.ts)
**SSOT-Status:** Nutzt `berechneEStGrund(zvE, 2026)` aus `einkommensteuer.ts` für Eltern-Netto-Schätzung ✓. Ansonsten eigenständig, keine weiteren SSOT-Libs.
**Parameter-Stand:** Teilweise veraltet, siehe Pre-Audit-Tabelle.

**Findings:**

- **[P1] Grundbedarf Studium/auswärts veraltet.**
  Lib: `BEDARF.studium.eigene = 934`. Soll: 475 + 380 = 855 (§ 13 BAföG seit 01.08.2024). Bei `selbstVersichert=true` produziert der Rechner einen Höchstsatz von **1.056 €** (934 + 94 + 28) statt offizieller **992 €**. Systematisch **+64 €/Monat = +768 €/Jahr** zu hoch für alle Voll-Förderungs-Fälle.
  Cross-Check: `https://www.bafoeg-rechner.de/FAQ/bafoeg-hoechstsatz.php` und BMBF-Daten bestätigen 475/380/102/35.

- **[P1] KV-Zuschlag 94 € statt 102 €.**
  Lib-Konstante `KV_ZUSCHLAG = 94`. Aktueller Satz nach § 13a BAföG ist 102 € (angepasst mit 01.08.2024). Delta −8 €/Monat bei selbst Versicherten.

- **[P1] PV-Zuschlag 28 € statt 35 €.**
  `PV_ZUSCHLAG = 28`. Aktuell 35 € nach PV-Satz-Erhöhung 2023. Delta −7 €/Monat.

- **[P2] Elternabhängige Anrechnungsquote 45 %.**
  `ANRECHNUNG_ELTERN_QUOTE = 0.45`. § 11 Abs. 4 BAföG nennt **50 %** als Standard-Anrechnungsquote nach Abzug der Freibeträge. Fragezeichen — je nach Interpretation des „Bedarf nach Freibetrag"-Schrittes. Cross-Check nötig.

- **[P2] WS-2026/27-Erhöhung nicht vorbereitet.**
  Koalitionsvertrag 2025 sieht zum Wintersemester 2026/27 eine Anhebung der Wohnpauschale von 380 → 440 € vor. Falls verabschiedet, bräuchte `bafoeg.ts` einen Stichtag-Switch analog zu `mindestlohn.ts` / `rente.ts`. Aktuell keine Struktur vorhanden.

- **[P3] Keine `bafoeg-parameter.ts`-SSOT.**
  Alle Konstanten (BEDARF, WOHNPAUSCHALE, KV_ZUSCHLAG, PV_ZUSCHLAG, FREIBETRAG_*) sind private Modul-Konstanten in `bafoeg.ts`. SSOT-Extraktion würde Stichtag-Switches und Doppel-Pflege vereinfachen.

- **[P3] Schüler-Bedarfssatz 262 € prüfen.**
  `BEDARF.schule.eltern = 262`. Cross-Check gegen § 12 BAföG empfohlen — Verdacht auf veraltete Fassung.

- **[P3] SV-Pauschale eigen 22,5 % / Eltern 21,6 %.**
  `SV_PAUSCHALE_EIGEN = 0.225`, `SV_PAUSCHALE_ELTERN = 0.216`. § 21 Abs. 2 BAföG hat differenziertes Verfahren (auch Werbungskostenpauschale). Vereinfachung vertretbar, aber dokumentations-bedürftig.

**Cross-Check:** Gegen [BAföG-Rechner der TU-Studienberatung](https://www.bafoeg-rechner.de/) bei Testfall BA-MAX (Waise, auswärts, selbstversichert, voller Anspruch) erwartet **992 €**, Code liefert **1.056 €**. Delta +64 €/Monat. **Differenz zu hoch ohne entlastende Interpretation.**

---

### 2. Wohngeld-Rechner — [/finanzen/wohngeld-rechner](../../components/rechner/WohngeldRechner.tsx)

**Lib:** [lib/berechnungen/wohngeld.ts](../../lib/berechnungen/wohngeld.ts)
**SSOT-Status:** Eigenständig. Keine Nutzung zentraler Libs (auch nicht Mietstufen-Mapping zu PLZ — ist aber auch nicht Standard in bestehenden Libs).
**Parameter-Stand:** Höchstbeträge durchgängig ca. 4–5 % über den offiziellen 2026-Werten nach Dynamisierung 01.01.2025. Freibetragsparameter deutlich vom Gesetz abweichend.

**Findings:**

- **[P1] 35 Höchstbetragszellen (`HOECHSTBETRAEGE`) systematisch zu hoch.**
  Beispiel: 1 Person / Mietstufe I Lib=377, Soll=361 (§ 12 WoGG 2026, smart-rechner.de); 4 Personen / Mietstufe IV Lib=881, Soll=858. Die Lib-Werte könnten aus einer Prognose-Quelle stammen (etwa +15 % auf die 2023er Werte pauschal angewandt), entsprechen aber nicht der tatsächlichen Dynamisierungsverordnung. Komplette Ersetzung aller 35 Zellen erforderlich, zusätzlich `ZUSCHLAG_PRO_PERSON` gegen offizielle Tabelle prüfen.

- **[P1] Einkommensbereinigung 10 % Pauschal statt 3×10 = 30 %.**
  `pauschalAbzug = rund2(bruttoEinkommen * 0.10)`. § 16 Abs. 1 WoGG kennt drei 10-%-Pauschalen (Steuer, KV, RV) für AN, deren Anwendung von der individuellen Sachlage abhängt (z. B. Rentner haben nur 2 der 3 Pauschalen). Der Rechner zieht nur **eine** Pauschale ab → bereinigtes Einkommen systematisch zu hoch → Wohngeld systematisch zu niedrig.

- **[P1] Schwerbehinderten-Freibetrag 150 €/Mo statt 125 €/Mo.**
  `freibetraege += 150`. § 17 Nr. 2 WoGG nennt **1.500 €/Jahr = 125 €/Monat**. Delta +25 €/Monat zu viel — führt zu systematisch zu viel Wohngeld bei schwerbehinderten Antragstellern.

- **[P1] Alleinerziehenden-Freibetrag 130 €/Mo pauschal statt 1.320 €/J **pro Kind**.**
  `freibetraege += 130`. § 17 Nr. 3 WoGG staffelt pro Kind: 1.320 €/Jahr = **110 €/Monat pro Kind**. Bei 2 Kindern wären das 220 €/Mo, bei 3 Kindern 330 €/Mo. Aktuell ist der Freibetrag pauschal abgebildet und wird auch noch um 20 € zu hoch angesetzt für den 1-Kind-Fall. Gestaffelte Umsetzung nötig.

- **[P2] Erwerbstätigen-Freibetrag `20 % vom Brutto`.**
  `freibetraege += rund2(bruttoEinkommen * 0.20)`. § 17 Nr. 1 WoGG kennt einen **pauschalen** Erwerbstätigen-Freibetrag von 1.000 €/Jahr (≈ 83 €/Monat). 20 % vom Brutto ist keine § 17-Regel — vermutlich verwechselt mit dem Einkommens-Freibetrag beim Bürgergeld. Korrektur dringlich, weil bei hohen Bruttos der Effekt gewaltig ist (z. B. bei 3.000 € Brutto: 600 € statt 83 € Freibetrag → Wohngeld ca. 150 €/Mo zu hoch).

- **[P2] Wohngeld-Formel-Koeffizienten prüfen.**
  `KOEFFIZIENTEN`-Array enthält a/b/c-Werte, die optisch zu Anlage 1 WoGG passen. Nicht detail-überprüfbar ohne Vergleich mit den offiziellen Anhang-Tabellen. **Cross-Check-Kandidat.**

- **[P2] Keine PLZ-zu-Mietstufen-Zuordnung.**
  User muss die Mietstufe selbst wissen. Das ist auch beim BMWSB-Rechner so, aber eine Komfort-Funktion wäre möglich. (Datenquelle: BMWSB-Liste, ~11.000 Gemeinden.)

- **[P2] Heizkosten- und Klimakomponente cross-checken.**
  Werte `HEIZKOSTENPAUSCHALE = [23.80, 30.60, 37.40, 44.20, 51.00]` und `KLIMAKOMPONENTE = [19.20, 24.70, 30.20, 35.70, 41.20]` gegen § 12 Abs. 6+7 WoGG verifizieren. Prompt-Werte matchen ungefähr, aber Dynamisierung 01.01.2025 unklar.

- **[P3] Keine `wohngeld-parameter.ts`-SSOT.**
  Analog zu BAföG. Besonders relevant wegen Zwei-Jahres-Dynamisierung (nächste zum 01.01.2027).

**Cross-Check:** Gegen WG-01 (1P, 1400 € Brutto, 500 € Miete, Stufe IV) via [BMWSB-Wohngeldrechner](https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-rechner.html): Erwarter Bereich 180–220 €/Mo. Code liefert durch 10 %-Pauschale und Höchstbetrag-Delta vermutlich 250–300 € → zu hoch. **Live-Test in Fix-Prompt.**

---

### 3. Bürgergeld-Rechner — [/finanzen/buergergeld-rechner](../../components/rechner/BuergergeldRechner.tsx)

**Lib:** [lib/berechnungen/buergergeld.ts](../../lib/berechnungen/buergergeld.ts)
**SSOT-Status:** Eigenständig. Saubere Trennung Lib ↔ Komponente.
**Parameter-Stand:** Regelsätze 2026 korrekt (Nullrunde durch Besitzschutzregelung § 28a SGB XII, bestätigt durch BMAS-Bekanntmachung 10/2025). Freibeträge Einkommen + Vermögen korrekt.

**Findings:**

- **[P2] Mehrbedarfe § 21 SGB II fehlen komplett.**
  Der Rechner kennt Regelsatz + KdU. Nicht abgebildet:
  - § 21 Abs. 3 Alleinerziehende: +12 %/24 %/36 %/48 % (abhängig von Kinderzahl/Alter)
  - § 21 Abs. 2 Schwangere ab 13. SSW: +17 %
  - § 21 Abs. 4 Menschen mit Behinderung in Eingliederungshilfe: +35 %
  - § 21 Abs. 5 Kostenaufwändige Ernährung: nach medizinischem Attest
  - § 21 Abs. 6 Atypischer Mehrbedarf: individuelle Prüfung
  Gerade Mehrbedarf Alleinerziehende ist sehr häufig und systematisch unterberechnet.

- **[P2] KdU-Angemessenheitsprüfung fehlt.**
  Der Rechner erkennt die eingegebene Miete vollständig an. § 22 SGB II verlangt „angemessene" KdU — Jobcenter haben lokale Obergrenzen (Mietobergrenzen je Kreis/kreisfreie Stadt). Der Rechner sollte mindestens einen Info-Hinweis geben, dass die tatsächliche Anerkennung begrenzt sein kann.

- **[P2] Umbau zur „Neuen Grundsicherung" ab 01.07.2026.**
  Beschluss der Bundesregierung 10/2025: Bürgergeld wird zur „Neuen Grundsicherung" umgebaut (strengere Sanktionen, veränderte Hinzuverdienst-Regeln für Ausreißer-Fälle). Regelsätze bleiben vorerst gleich. **Stichtag-Switch-Vorbereitung empfohlen**, selbst wenn nur die Bezeichnung sich ändert (für SEO-Titel, FAQ).

- **[P3] Jugendlichen-Erhöhter-Freibetrag nicht abgebildet.**
  § 11b Abs. 2a SGB II: Jugendliche im Ferienjob 15–24 J. können einen **erhöhten Freibetrag bis 556 € Netto** bei Minijob haben. Der Code nimmt pauschal die gleiche Stufung.

- **[P3] Info-Regelsätze-Tabelle hartkodiert im JSX.**
  `BuergergeldRechner.tsx` Z. 300–325 zeigt die Regelsätze (563, 506, 451, 471, 390, 357) als HTML-Literale, nicht aus der Lib-Konstante abgeleitet. Bei Update 2027 wäre die doppelte Pflege zu beachten. Fix durch Ableitung aus `REGELSATZ_*`-Exports.

- **[P3] Keine Bedarfsgemeinschaft-Dokumentation.**
  Die Begriffe „Alleinstehend" / „Paar" / „Paar mit Kindern" könnten User-seitig mit „Bedarfsgemeinschaft" nach § 7 Abs. 3 SGB II erklärt werden (Verwandte im Haushalt ≠ BG).

**Cross-Check:** Gegen BG-01 (alleinstehend, Miete 450, kein Einkommen): erwarteter Anspruch 1.013 € (563 Regelsatz + 450 KdU). Code liefert 1.013 € ✓. Regelsatz + Hinzuverdienstregeln sind korrekt implementiert.

---

### 4. Pfändungs-Rechner — [/finanzen/pfaendungsrechner](../../components/rechner/PfaendungRechner.tsx)

**Lib:** [lib/berechnungen/pfaendung.ts](../../lib/berechnungen/pfaendung.ts)
**SSOT-Status:** Saubere Stichtag-Switch-Struktur (`PFAENDUNG_2025`, `PFAENDUNG_2026`, `getAktuellePfaendungsParameter(stichtag)`). Pattern-Vorbild für andere Libs.
**Parameter-Stand:** Alle Werte verifiziert gegen BGBl. 2025 und BGBl. 2026 I Nr. 80 — **korrekt**.

**Findings:**

- **[P1] Pauschalquote statt amtlicher Pfändungstabelle.**
  Code rechnet `pfaendbar = mehrbetrag × quote` mit Pauschalquoten 70/50/40/30/20/10 % aus § 850c Abs. 3 ZPO. Die amtliche Tabelle in Anlage zu § 850c arbeitet mit **10-€-Stufen** und eigener Rundungslogik — Abrundung auf die nächstniedrigere Stufe. Für User-Anfragen, die gegen die offizielle BMJ-Tabelle abgeglichen werden, ergibt die Pauschalquote **±5–7 €/Monat Abweichung** im mittleren Einkommensbereich, bei hohen Einkommen (> 4.000 €) auch mal ±10 €.
  Der Rechner dokumentiert die Näherung transparent im Hinweis („kleine Abweichungen im Cent-Bereich sind möglich"), aber das „Cent-Bereich"-Wording ist optimistisch. Prompt-Forderung „±0,01 € Toleranz" ist nur durch tatsächliche Tabellen-Implementation erreichbar.
  Fix-Aufwand: mittel — die offizielle Tabelle hat ~140 Zeilen (eine Zeile pro 10-€-Stufe von 1.500 € bis 4.870 €). Portierung als Konstante möglich.

- **[P2] Latent: `export const GRUNDFREIBETRAG = getAktuellePfaendungsParameter().grundfreibetrag`.**
  Modul-Scope-Auswertung beim Server-Start, nicht dynamisch. Nach 01.07.2026 wäre der exportierte Wert bis Redeploy bei 1.555 € eingefroren. **Aktuell nicht aktiv schädlich**, weil keine anderen Dateien diesen Export konsumieren (Grep-verifiziert), aber latente Falle. Entweder (a) ersetzen durch Getter-Funktion, (b) ganz entfernen, da unused.

- **[P2] Kein Datum-Input im Rechner.**
  User kann nicht „vorher/nachher"-Szenarien durchspielen (z. B. „Was ändert sich für mich zum 01.07.2026?"). Eine optionale Datums-Eingabe mit Default = heute wäre eine sinnvolle UX-Ergänzung. Besonders relevant in den Monaten April–Juni vor dem nächsten Stichtag-Wechsel.

- **[P3] Obergrenze-Anzeige.**
  `obergrenze` wird im Ergebnis-Objekt zurückgegeben, aber im UI nur konditional angezeigt wenn `ueberObergrenze === true`. Die Information „Oberhalb 4.866,30 € ist alles pfändbar" ist aber auch für User unterhalb der Grenze nützlich (zum Verständnis der Tabelle). Optional als permanenter Hinweis.

- **[P3] Beispieltabelle hartkodierte Werte.**
  `werte = [2000, 2500, 3000, 3500, 4000, 5000]`. Die aktuellen Werte stehen sinnvoll verteilt, aber dynamisch um das User-Netto zentriert wäre benutzerfreundlicher (z. B. User-Netto ± 500 €).

- **[P3] Wechselwirkung mit P-Konto.**
  Der Hinweistext unten erwähnt P-Konto-Basisfreibetrag. Das ist gut. Erweiterbar: Link auf den Antragsformular oder Verweis auf Unterhalts-Bescheinigung als Komfort-Feature.

**Cross-Check:** Gegen PF-03 (Netto 3.500, 0 Unterhalt, nach 01.07.2026) erwartet laut amtlicher Tabelle pfändbar zwischen 1.333,09 € und 1.340 € (10-€-Stufen-Abrundung). Code via Pauschalquote (3.500 − 1.587,40) × 0,70 = **1.338,82 €** — innerhalb der Tabellenband-Breite, aber nicht exakt stufen-korrekt.

---

## SSOT-Refactor-Kandidaten (Querschnitt)

Sozialleistungen haben eigene Parameter-Kategorien, die heute verstreut in den Rechner-Libs liegen. Empfehlung:

1. **`lib/berechnungen/bafoeg-parameter.ts`** (neu)
   - Bedarfssätze (BEDARF, WOHNPAUSCHALE)
   - Zuschläge (KV_ZUSCHLAG, PV_ZUSCHLAG, KINDER_ZUSCHLAG)
   - Eltern-Freibeträge (FREIBETRAG_VERHEIRATET, FREIBETRAG_ALLEINSTEHEND)
   - Anrechnungsquote + SV-Pauschalen
   - Vermögensfreibeträge (Alter < 30 / ab 30)
   - **Mit Stichtag-Switch-Pattern** für WS-2026/27-Erhöhung (falls Verordnung verabschiedet)

2. **`lib/berechnungen/wohngeld-parameter.ts`** (neu)
   - Höchstbeträge-Matrix (35 Werte + Zuschläge)
   - Heizkosten-/Klima-Komponente
   - Freibeträge (Schwerbehinderten, Alleinerziehende-pro-Kind, Erwerbstätigen)
   - Formel-Koeffizienten (Anlage 1 WoGG, 8 Haushaltsgrößen × 3 Parameter)
   - **Mit Stichtag-Switch-Pattern** für nächste Dynamisierung (01.01.2027)

3. **`lib/berechnungen/buergergeld-parameter.ts`** (neu)
   - Regelsätze (RBS 1–6)
   - Vermögensfreibeträge (Karenzzeit + nach Karenz)
   - Einkommens-Freibetrag-Stufen (100/520/1000/1200–1500 mit Kind)
   - Mehrbedarfe § 21 SGB II (wenn in P2-Pass eingebaut)
   - **Mit Stichtag-Switch-Pattern** zum 01.07.2026 („Neue Grundsicherung")

---

## Empfehlung: Bündelung der Folge-Prompts

### Prompt 120 — Stufe-4b P1-Pass (~90–120 min)

**9 P1-Bugs**, davon die meisten in BAföG + Wohngeld:

1. **BAföG: Grundbedarfssätze aktualisieren** — `BEDARF.studium.eigene`: 934 → 855 (oder strukturell 475 + Wohnpauschale getrennt), `KV_ZUSCHLAG` 94 → 102, `PV_ZUSCHLAG` 28 → 35.
2. **Wohngeld: 35 Höchstbetragszellen ersetzen** (`HOECHSTBETRAEGE` neu aus § 12 WoGG 2026 + `ZUSCHLAG_PRO_PERSON` verifizieren).
3. **Wohngeld: Einkommensbereinigung** — 10 % → gesetzlich korrekte 3×10 % = 30 % für AN (mit Dokumentation, dass Rentner weniger Pauschalen haben; konservativ: 30 % Default als AN-Schätzung, Option für Rentner/Selbständige fehlt).
4. **Wohngeld: Freibeträge korrigieren** — Schwerbehindert 150 → 125 €/Mo; Alleinerziehend pauschal 130 → pro Kind 110 €; Erwerbstätigen-Freibetrag: 20 % Brutto → pauschal 83 €/Mo (§ 17 WoGG).
5. **Pfändung: Amtliche Tabelle implementieren** — § 850c-Tabelle mit 10-€-Stufen als Konstante + Lookup statt Pauschalquote. Alternativ: „offizielle Tabelle zu nächstem 10-€-Schritt" als nachgelagerte Rundung.

### Prompt 121 — Stufe-4b P2-Pass + SSOT (~90 min)

**7 P2-Bugs + 3 SSOT-Kandidaten**:

- Bürgergeld Mehrbedarfe § 21 SGB II (mindestens Alleinerziehende + Schwangerschaft)
- Bürgergeld KdU-Angemessenheits-Hinweis
- Bürgergeld Stichtag-Switch-Vorbereitung zum 01.07.2026 („Neue Grundsicherung")
- BAföG WS-2026/27-Erhöhung vorbereiten (abhängig von Verabschiedung)
- BAföG Anrechnungsquote 45 % vs. 50 % klären
- Pfändung `GRUNDFREIBETRAG`-Modul-Scope-Konstante entfernen/ersetzen
- Pfändung Datum-Input im Rechner
- SSOT-Extraktion: drei neue Parameter-Libs

### Prompt 122 — Stufe-4b P3 + UX-Polish (~60 min)

**6 P3-Items**:

- Schüler-Bedarfssatz § 12 BAföG cross-checken
- Bürgergeld Jugendlicher-Erhöhter-Freibetrag
- Bürgergeld Regelsatz-Info-Tabelle aus Lib ableiten (nicht JSX-hartkodiert)
- Pfändung dynamische Beispieltabelle (User-zentriert)
- Pfändung Obergrenze-Anzeige permanent
- Wohngeld PLZ-zu-Mietstufen-Zuordnung (als Feature-Wunsch)

---

## Stichtag-Monitoring nach Stufe 4b

Nächste 12 Monate — diese Parameter brauchen Aufmerksamkeit:

| Stichtag | Parameter | Vorbereitungs-Stand | Prompt |
|---|---|---|---|
| **01.07.2026** | Pfändungstabelle (neue Werte) | ✅ Stichtag-Switch in `pfaendung.ts` | — |
| **01.07.2026** | Bürgergeld → „Neue Grundsicherung" (Umbenennung + ggf. Regel-Tweaks) | ⏳ keine Vorbereitung | 121 |
| **~01.08.2026** | BAföG-Erhöhung WS 2026/27 (Wohnpauschale 440 €?) | ⏳ Koalitionsbeschluss offen | 121 |
| **01.01.2027** | Wohngeld-Dynamisierung (+15 % zu 2025?) | ⏳ keine Vorbereitung | 122 |
| **01.01.2027** | Bürgergeld-Regelsatzerhöhung | ⏳ abhängig von § 28a-Fortschreibung | 122 |

---

## Methodische Lehre für Stufe 4c

1. **Sozialleistungen sind externen Referenz-Rechnern zuverlässig prüfbar.** BMBF-, BMWSB-, BA- und BMJ-Rechner liefern reproduzierbare Werte. Drei Cross-Checks pro Rechner reichen aus, um systematische Abweichungen zu identifizieren. **Regel:** bei allen künftigen Sozialleistungs-Audits ein offizieller Rechner als Oracle heranziehen.

2. **Parameter-Aktualität ist der Hauptbefund bei Sozialleistungs-Rechnern.** Im Gegensatz zu Steuer-Rechnern (wo Algorithmus-Bugs dominieren) sind es bei Sozialleistungen oft schlicht „Tabelle zu alt". Der Einzel-Bug ist kleiner (ein Wert veraltet), aber es gibt sehr viele davon (35 Höchstbetragszellen).

3. **SSOT-Parameter-Libs sind spezifisch für Sozialleistungen sinnvoll**, weil die Parameter häufig (1–2×/Jahr) aktualisiert werden müssen und klare Rechtsstichtage haben. Das Stichtag-Switch-Pattern aus `mindestlohn.ts` / `rente.ts` / `pfaendung.ts` ist übertragbar.

4. **Mehrbedarfe / Sonderregelungen fehlen häufig.** Der rechenfix-Anspruch „Standard-Fall schnell rechnen" deckt die 80 % ab, aber für die nächste Qualitätsstufe sollten Mehrbedarfe zumindest als optionale Toggles verfügbar sein.

5. **BMF-Steuerrechner-Methode (Prompt 118: offizieller Algorithmus als XML-Port) ist für Sozialleistungen nicht anwendbar** — Wohngeld/BAföG/Bürgergeld haben keine vergleichbare offizielle Algorithmus-Spezifikation. Die Referenz sind die Gesetzestexte + offizielle Parameter-Tabellen. Port-Ansatz dort ist: Parameter exakt übernehmen, Rechenlogik aus Gesetzestext ableiten.

---

## Nachtrag Prompt 120 (22.04.2026) — P1-Pass abgeschlossen

Alle 9 P1-Bugs gefixt in 4 Commits + 1 Doku-Commit.

### Umgesetzt

- **BAföG (Commit `e5041a2`):** Bedarfssätze + KV/PV-Zuschläge auf Stand 29. BAföG-ÄndG (01.08.2024). `BEDARF.studium.eigene` 934 → 855, `BEDARF.studium.eltern` 511 → 534, `KV_ZUSCHLAG` 94 → 102, `PV_ZUSCHLAG` 28 → 35. Höchstsatz jetzt **992 €** (vorher 1.056 €).
- **Wohngeld (Commit `06e96ae`):** Alle 35 `HOECHSTBETRAEGE`-Zellen nach Anlage 1 WoGG (Dynamisierungsverordnung v. 21.10.2024) + `ZUSCHLAG_PRO_PERSON`. Vier Freibetragsregeln § 17 WoGG (Einkommens-Pauschale 10 → 30 %, Schwerbeh-FB 150 → 125, Alleinerz.-FB 130 pauschal → 110 pro Kind mit neuem Input-Feld `alleinerziehendKinderAnzahl`, Erwerbst.-FB 20 % Brutto → pauschal 83,33). UI-Erweiterung: Kinder-Dropdown bei aktiver Alleinerziehend-Checkbox.
- **Pfändung (Commit `2998a55`):** Amtliche § 850c-Tabelle wird durch 10-€-Stufen-Abrundung des Nettos exakt reproduziert — keine Tabellen-Portierung nötig. Zusätzlich: latente Modul-Scope-Konstante `GRUNDFREIBETRAG` durch Getter-Funktion `getGrundfreibetrag(stichtag?)` ersetzt.
- **Verify-Scripts (Commit `45f8271`):** `verify-bafoeg-p1.ts` 5/5, `verify-wohngeld-p1.ts` 41/41 (35 Matrix + 6 FB), `verify-pfaendung-p1.ts` 17/17 (10 Stützpunkte + 2 Stichtag-Switch + 5 Tabelle 2026). Alle Δ ≤ 0,01 €.

### Nicht in 120 (offen für 121/122)

- SSOT-Extraktion in `bafoeg-parameter.ts` / `wohngeld-parameter.ts` / `buergergeld-parameter.ts` (Architektur-Arbeit, Prompt 121)
- Bürgergeld Mehrbedarfe § 21 SGB II (P2, Prompt 121)
- BAföG WS-2026/27-Erhöhung (KoaV-Beschluss abwarten, Stichtag-Switch-Pattern in 121)
- P3-Polish: Bürgergeld-Info-Tabelle aus Lib ableiten, Pfändungs-Datum-Input, BAföG Altersdifferenzierung KV/PV (Prompt 122)

### Prompt-Inkorrektheit dokumentiert

Der Prompt 120 Testfall PF-01 nannte „28,59 €" als Soll-Wert für 1.600 € Netto / 0 Unterhaltspflichten. Die amtliche Tabelle (BGBl. 2025 I Nr. 110 Anlage) zeigt 31,50 € für den Band 1.600,00–1.609,99 €. Der Verify-Script nutzt den korrekten Tabellenwert; der Prompt-Wert war vermutlich eine ad-hoc-Rechnung ohne 10-€-Stufen-Abrundung.
