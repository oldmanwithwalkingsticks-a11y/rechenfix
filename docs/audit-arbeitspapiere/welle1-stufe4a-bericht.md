# Welle 1 Stufe 4a — Spezial-Steuer — Audit-Bericht

**Prompt:** 114
**Datum:** 2026-04-21
**Methodik:** 7-Punkt-Check (analog Welle-1-Stufe-3, Prompt 109)
**Scope:** 8 Rechner
**Audit-Ausgang:** Nur Befund + Priorisierung, kein Code-Fix

> **Teil-Abschluss Prompt 115a (2026-04-21):** Alle 3 P1 + 4 P2 im MidijobRechner behoben (BE-Formel, LSt, Soli, SV-SSOT, PV 1,8 %, PV-Kinderabschlag, KiSt-Bundesland). Neue SSOT-Lib `lib/berechnungen/midijob-uebergang.ts` für § 20a SGB IV. Restliche P1/P2/P3 in Erbschaft, Schenkung, AfA, Firmenwagen, KESt offen für Prompts 115b / 116 / 117.

> **Nachtrag Prompt 115b (2026-04-21):** Während der Live-Verifikation nach 115a wurde ein schwerwiegender P1-Bug in `berechneLohnsteuerJahr` für Kl. V/VI entdeckt — technisch außerhalb Stufe-4a-Scope (zentrale SSOT-Lib aus Welle 1 Stufe 1). Analyse in [lohnsteuer-v-vi-analyse.md](lohnsteuer-v-vi-analyse.md).

> **Nachtrag 2 Prompt 115b2 (2026-04-21):** Der Kl. V/VI-Bug wurde via empirischer Lookup-Kalibrierung behoben. 20 BMF-Stützpunkte mit Δ = 0,00 € verifiziert (Verifikations-Script `scripts/verify-lohnsteuer-vvi.ts`), ±5 €/Monat Toleranz zwischen Stützpunkten. UI-Hinweis auf 3 Rechnern (Brutto-Netto, Lohnsteuer, Midijob — Nebenjob entfiel, da kein Steuerklasse-UI). Voll-PAP-Implementation bleibt offen als separater Refactor-Prompt.

---

## Zusammenfassung

| Metrik | Anzahl |
|---|---|
| Rechner geprüft | 8 |
| **P1-Bugs** | 6 |
| **P2-Bugs** | 12 |
| **P3 / Code-Qualität** | 11 |
| SSOT-Refactor-Kandidaten | 3 |
| Struktur-Befund | Erbschaft + Schenkung **separate Libs** mit massiver Duplikation |

**Highlights:**

1. **MidijobRechner ist der Hot Spot der Stufe** — 3 P1: BE-Formel mathematisch falsch (`F × OG` statt `F × UG`, Midijob-Vorteil drastisch unterschätzt), erfundener Steuerklassen-Faktor `× 1.15` für V/VI, harte Soli-Schwelle ohne Milderungszone (bekanntes Wiederholungs-Anti-Pattern, 6. Auftritt).
2. **Erbschaft + Schenkung:** Härtefall-Regel § 19 Abs. 3 ErbStG fehlt in beiden → an Tarifsprungkanten (75k/300k/600k/6M/13M/26M) überberechnete Steuer. Plus: Libs sind Duplikate, SSOT-Refactor-Kandidat.
3. **FirmenwagenRechner:** Plug-in-Hybrid-0,5-%-Regel ohne Bedingungs-Check (CO2 ≤ 50 g/km UND elektrische Mindestreichweite 80 km seit 2025) → stille Vergünstigung falschberechnet.
4. **AfA-Rechner P1:** Degressive AfA für bewegliche Wirtschaftsgüter ist ab 01.01.2026 nicht mehr zulässig — der Rechner erlaubt sie weiter (Wachstumschancengesetz lief 31.12.2025 aus).

---

## Pre-Audit-Inventur

Alle 8 Slugs in [lib/rechner-config/finanzen.ts](../../lib/rechner-config/finanzen.ts) vorhanden:
- `mwst-rechner` (Z. 96)
- `erbschaftsteuer-rechner` (Z. 1372)
- `midijob-rechner` (Z. 1745)
- `firmenwagenrechner` (Z. 1784)
- `kapitalertragsteuer-rechner` (Z. 2040)
- `afa-rechner` (Z. 2116)
- `mwst-rueckerstattung-rechner` (Z. 2258)
- `schenkungssteuer-rechner` (Z. 2532)

**Libs:** `erbschaftsteuer.ts`, `schenkungssteuer.ts`, `mwst.ts`, `mwst-rueckerstattung.ts` existieren. KESt, AfA, Firmenwagen, Midijob haben **keine dedizierte Lib** — Logik inline in der Komponente.

---

## Pro Rechner

### 1. Erbschaftsteuer-Rechner — [/finanzen/erbschaftsteuer-rechner](../../components/rechner/ErbschaftsteuerRechner.tsx)

**Lib:** [lib/berechnungen/erbschaftsteuer.ts](../../lib/berechnungen/erbschaftsteuer.ts)
**SSOT-Status:** Eigenständig; keine Imports aus zentralen ESt-/SV-Libs (korrekt — ErbStG läuft separat).
**Parameter-Stand:** Freibeträge § 16 ErbStG (seit 2009 unverändert) korrekt: 500k / 400k / 200k / 100k / 20k. Tarif § 19 ErbStG-Stufen 75k / 300k / 600k / 6M / 13M / 26M mit korrekten Prozentsätzen (7/11/15/19/23/27/30 Kl. I).

**Findings:**

- **[P1] Härtefall-Regel § 19 Abs. 3 ErbStG fehlt komplett.**
  Der Tarif ist ein Stufen-Tarif (nicht gleitend). Bei knapp überschrittener Stufe greift die Härtefall-Regelung: Die Steuer wird auf Betrag der Vorstufe + 50 % (Kl. I) bzw. 75 % (Kl. II/III) des die Stufe übersteigenden Betrags begrenzt.
  Beispiel Kl. I: 75.001 € stpfl. Erwerb → Code rechnet `75.001 × 11 % = 8.250,11 €`. Korrekt mit Härtefall: `75.000 × 7 % + 0,50 × 1 = 5.250,50 €` (weil 8.250 − 5.250 > 1 €-Überschreitung).
  Systematischer Fehler um die Tarifsprung-Schwellen. Betrifft alle Steuerklassen.

- **[P2] Vorschenkungen als Freibetrags-Abzug (Z. 116).**
  § 14 ErbStG-Logik: **Kumulation** des Erwerbs mit Vorerwerben der letzten 10 Jahre zur Tarif-Ermittlung, dann **Anrechnung** der auf den Vorerwerb bereits gezahlten Steuer. Der Code macht stattdessen `freibetrag − vorschenkungen`, was bei hohen Vorschenkungen deutlich abweicht.

- **[P2] Hausrat-Freibetrag (§ 13 Abs. 1 Nr. 1 ErbStG) fehlt.**
  41.000 € Kl. I / 12.000 € Kl. II+III. Nur in Schenkungs-Lib teilweise drin (aber auch dort mit Mängeln — siehe Rechner 2).

- **[P3] Versorgungsfreibetrag Kind pauschal 52.000 € (Z. 112).**
  § 17 Abs. 2 ErbStG kennt altersabhängige Staffel: 52.000 / 41.000 / 30.700 / 20.500 / 10.300 / 0 €. Code-Kommentar dokumentiert die Vereinfachung bewusst — P3 für UX-Erweiterung.

**Cross-Check:** Formeln gegen Sparkassen-Rechner stichprobenhaft ✓ (ohne Härtefall-Fälle).

---

### 2. Schenkungssteuer-Rechner — [/finanzen/schenkungssteuer-rechner](../../components/rechner/SchenkungssteuerRechner.tsx)

**Lib:** [lib/berechnungen/schenkungssteuer.ts](../../lib/berechnungen/schenkungssteuer.ts)
**SSOT-Status:** Massive Duplikation mit `erbschaftsteuer.ts` — identische `STEUERKLASSEN`-Tarif-Tabelle, abweichende Feature-Sets.
**Parameter-Stand:** Freibeträge korrekt; Hausrat-FB nur Kl. I (41.000 €); Tarif identisch mit erbschaftsteuer.ts.

**Findings:**

- **[P1] Härtefall-Regel § 19 Abs. 3 ErbStG fehlt — gleicher Bug wie Erbschafts-Lib.**

- **[P2] Enkel-Differenzierung `eltern-leben`/`eltern-tot` fehlt.**
  Schenkungs-Lib hat nur `'enkelkind'` mit 200.000 € FB. § 16 Abs. 1 Nr. 3 ErbStG: 200.000 € gilt nur bei lebenden Eltern; bei verstorbenen Eltern greift Kind-Freibetrag 400.000 € (weil Enkel dann anstelle des verstorbenen Kindes erbt — analog zur Erbfolge). Bei Schenkung ist das seltener, aber möglich. Erbschafts-Lib differenziert korrekt (`enkel-eltern-tot: 400k`).

- **[P2] Hausrat-FB Klasse II/III fehlt (12.000 € nach § 13 Abs. 1 Nr. 1 Satz 2 ErbStG).**
  Code setzt `hausratFB = 0`, wenn Klasse ≠ I.

- **[P3] Selbstgenutzte Immobilie nicht abgebildet (§ 13 Abs. 1 Nr. 4a ErbStG Familienheim).**
  Nur in Erbschafts-Lib als Hinweis vorhanden.

- **[SSOT] Tarif-Tabelle `getSteuersatz` dupliziert.**
  Gemeinsame Export-Funktion in `erbschaftsteuer.ts` (oder neue `erbschaftssteuer-tarif.ts`), beide Libs konsumieren.

---

### 3. Kapitalertragsteuer-Rechner — [/finanzen/kapitalertragsteuer-rechner](../../components/rechner/KapitalertragsteuerRechner.tsx)

**Lib:** inline in Komponente
**SSOT-Status:** Keine Imports aus zentralen Libs — vertretbar, weil Abgeltungsteuer-Tarif 25 % fest ist und KiSt-Anrechnungs-Formel eigenständig läuft.
**Parameter-Stand:** Sparerpauschbetrag 1.000 / 2.000 € (seit 2023) ✓. Teilfreistellung Aktien-ETF 30 % / Misch-ETF 15 % (§ 20 InvStG) ✓. KiSt-Anrechnungs-Formel `abgSt = stpfl / (4 + k)` (§ 32d Abs. 1 EStG) ✓.

**Findings:**

- **[Klärungs-Kandidat] Soli-Freigrenze § 3 Abs. 3 SolzG für KESt.**
  Der Prompt-Kontext erwähnt eine 972/1.944-€-Freigrenze für KESt-Soli. **Rechtsstand 2026 zu klären:** Seit der Soli-Reform 2021 wurde die Bemessungsgrundlagen-Freigrenze für ESt-Veranlagung stark angehoben (auf 17.443 € Soli-Grundlage 2025), aber die Abgeltungsteuer (Bankabzug nach § 43 EStG) zahlt weiterhin 5,5 % Soli **ohne Freigrenze**. Der Rechner zeigt „Netto-Ertrag nach Steuern" — sollte der Quellensteuer-Sachverhalt modelliert sein (5,5 % immer) oder der Veranlagungsfall (mit Milderungszone auf Gesamt-ESt)? Aktuell: ersteres, was für den meist-aufkommenden Fall (Bankabzug) korrekt ist. **Nicht als P1 klassifiziert — juristische Klärung im Fix-Prompt.**

- **[P3] Bundesland-Dropdown fehlt.**
  User wählt 8/9 % Kirchensteuersatz manuell statt Bundesland. Verstoß gegen das Bundesland-Dropdown-Pattern aus CLAUDE.md → SSOT-Patterns. Anzahl 2026 Rechner mit Bundesland-Dropdown ist etabliert (Kindergeld, Nebenjob, Spenden, Steuerprogression, GmbhGf).

- **[P3] Verlustverrechnung Töpfe nicht getrennt.**
  § 20 Abs. 6 EStG kennt zwei Töpfe: Aktien-Verluste nur mit Aktien-Gewinnen, allgemeine Verluste mit allem außer Aktien. Code addiert alle Verluste in einem Pool. Nische, aber formal falsch.

- **[P3] Vorabpauschale fehlt** (ETF-Feature, § 18 InvStG).

**Cross-Check:** Sparkassen-Rechner / Consorsbank-KESt-Rechner stichprobenhaft ✓.

---

### 4. AfA-Rechner — [/finanzen/afa-rechner](../../components/rechner/AfaRechner.tsx)

**Lib:** inline
**SSOT-Status:** Keine zentralen Libs (AfA-Parameter sind AfA-Tabellen-BMF-spezifisch, User-Input).
**Parameter-Stand:** GWG 800 € (seit 2018) ✓. Sammelposten 250–1.000 € § 6 Abs. 2a EStG — nicht abgebildet.

**Findings:**

- **[P1] Degressive AfA für bewegliche Wirtschaftsgüter ab 01.01.2026 nicht mehr zulässig.**
  § 7 Abs. 2 EStG wurde durch Wachstumschancengesetz 2024 vorübergehend wieder aktiviert (20 %, max. 2× linear) für Anschaffungen vom 01.04.2024 bis 31.12.2024, und durch JStG 2024 verlängert bis 31.12.2025. Ab 01.01.2026 entfällt die Regelung, außer für Wohngebäude-Sonder-AfA nach § 7 Abs. 5a EStG (5 %, läuft bis Sep. 2029).
  Der Rechner erlaubt degressive AfA ohne Datum-Plausibilitäts-Check. User mit Anschaffungsdatum 2026 bekommt fehlerhafte Berechnung. Fix: Warn-Banner bei degressiv + Datum ≥ 2026 + nicht Wohngebäude.

- **[P2] Degressiv-Deckel 25 % (Z. 76) veraltet.**
  2020–2022 war 25 % zulässig. 2024–2025: 20 %. Der Code erlaubt weiterhin bis 25 %.

- **[P2] Wohngebäude-Sonder-AfA § 7 Abs. 5a (5 %) nicht abbildbar.**
  Die einzige verbleibende degressive Variante nach 2025 hat fixes 5 % über gesamte ND (nicht das degressiv-→-linear-Umschalt-Pattern des Codes). Kein Input für „Wohngebäude, Bauantrag ab 01.10.2023" → User kann sie nicht korrekt rechnen.

- **[P3] Kein Typ-Filter** (Gebäude vs. Maschine vs. Computer).
  AfA-Tabellen-Sätze (Gebäude 2 %/3 %, Computer 1 Jahr seit BMF-Schreiben 2021) müssen User manuell als Nutzungsdauer eingeben.

- **[P3] Sammelposten-AfA § 6 Abs. 2a EStG** (Poolabschreibung 250–1.000 €) fehlt.

---

### 5. Firmenwagenrechner — [/finanzen/firmenwagenrechner](../../components/rechner/FirmenwagenRechner.tsx)

**Lib:** inline
**SSOT-Status:** Keine zentralen Libs (Pauschalwerte aus § 8 / § 6 EStG sind fest).
**Parameter-Stand:** E-Auto-Grenze 70.000 € (seit 01.01.2024 durch Wachstumschancengesetz) ✓. Pauschale 1 % / 0,5 % / 0,25 % ✓.

**Findings:**

- **[P1] Plug-in-Hybrid-0,5-%-Regel ohne Bedingungs-Check.**
  § 6 Abs. 1 Nr. 4 Satz 2 Nr. 3 EStG: 0,5 % gilt nur bei CO2-Ausstoß ≤ 50 g/km ODER rein elektrische Mindestreichweite. Letztere wurde über die Jahre verschärft: 40 km (2019–2021), 60 km (2022–2024), **80 km ab 01.01.2025**. Der Rechner fragt weder CO2 noch Reichweite ab → wendet 0,5 % blind an. User mit älterem Plug-in-Hybrid (< 80 km Reichweite, ab 2025 angeschafft) bekommt zu niedrige Steuer angezeigt.

- **[P3] Grenzsteuersatz als UI-Eingabe statt ESt-Berechnung.**
  User gibt selbst Grenzsteuersatz an (Default 35 %). Eine saubere Lösung würde aus zvE + Steuerklasse den tatsächlichen Grenzsteuersatz via `berechneEStGrund` + Ableitung bestimmen. Akzeptabel als UX-Vereinfachung, aber verlangt vom User fachliche Selbsteinschätzung.

- **[P3] KiSt + Soli im geldwerten Vorteil fehlen.**
  Der gwV erhöht das zvE, was KiSt (8/9 %) und Soli (bei Gesamtwirkung über Freigrenze) mitziehen würde. Der Rechner zeigt nur den ESt-Effekt.

- **[P3] Vergleichs-Box E-Auto vs. Verbrenner nutzt `≤ 70k`-Branch hartkodiert.**
  Z. 58: `bruttoListenpreis <= 70000 ? 'eAutoUnter70' : 'eAutoUeber70'`. OK, aber bei > 70k zeigt die E-Auto-Spalte dann 0,5 %, was die Ersparnis gegenüber Verbrenner (1 %) halbiert — technisch korrekt, aber UX-potentielle Verwirrung.

---

### 6. Midijob-Rechner — [/finanzen/midijob-rechner](../../components/rechner/MidijobRechner.tsx) — **HOT SPOT**

**Lib:** inline
**SSOT-Status:** Importiert `berechneEStGrund` ✓, aber keinen Mindestlohn-Import für die Untergrenze, keine BBG-Imports, keine Soli-/KiSt-Lib-Nutzung.
**Parameter-Stand:** `MIDIJOB_UNTERGRENZE = 603.01` hartkodiert (Stichtag 01.01.2027: 633 €), `MIDIJOB_OBERGRENZE = 2000` ✓, `FAKTOR_F = 0.6847` inline (Jahreswert, wird in Realität amtlich neu festgesetzt).

**Findings:**

- **[P1] BE-Formel mathematisch falsch (Z. 48).**
  ```ts
  be = FAKTOR_F * MIDIJOB_OBERGRENZE + ((OG - OG*F) / (OG - UG)) * (b - UG)
  ```
  Korrekt nach § 20a Abs. 1 SGB IV:
  ```ts
  be = F * UG + ((OG - F*UG) / (OG - UG)) * (b - UG)
  ```
  Unterschied: **`F * OG` statt `F * UG` im ersten Term**. Konsequenz: An der Untergrenze (b = 603,01) liefert der Code `BE ≈ 1.369,40 €`, korrekt wären `BE ≈ 412,88 €`. Der Midijob-Vorteil (reduzierter AN-SV-Anteil) wird **drastisch unterschätzt**, weil die BE-Kurve quasi von OG-Niveau startet statt von F×UG.
  Beide Formulierungen landen bei b = OG korrekt bei 2000 — deshalb fällt es im Grenzfall OG nicht auf. Der Fehler wirkt sich massiv in der Mitte und unten aus.

- **[P1] Steuerklassen-Faktor `× 1.15` für V/VI erfunden (Z. 31).**
  ```ts
  if (klasse === 'V' || klasse === 'VI') steuer *= 1.15;
  ```
  § 39b EStG kennt keinen derartigen Faktor — die LSt für Klassen V/VI wird nach einem eigenen PAP aus der Tabelle berechnet. Exakt dasselbe Anti-Pattern wie im Abfindungsrechner (Prompt 94 fand `SK_FAKTOR`-Array mit erfundenen 1.0/0.85/0.55/1.0/1.55/1.25). Mittlerer Fehler bei Klasse V: LSt wird ~15–25 % zu niedrig geschätzt, weil die reale Klasse-V-Belastung deutlich höher ist als das Grundtarif-Ergebnis × 1.15.

- **[P1] Soli ohne Milderungszone (Z. 53).**
  ```ts
  const soli = lohnsteuer > 1000 ? lohnsteuer * 0.055 : 0;
  ```
  Harte Schwelle bei 1.000 €/Monat LSt (entspricht ~12.000 €/Jahr), keine Verbindung zu § 4 SolzG-Freigrenze 20.350 € Jahres-ESt. Klassisches Anti-Pattern, 6. Auftritt. Fix: `berechneSoli(jahresESt, splitting=false, 2026)` aus `einkommensteuer.ts`.

- **[P2] PV-AN-Satz 1,7 % statt 1,8 % (Z. 16).**
  § 55 Abs. 1 SGB XI: PV-Gesamtsatz 3,6 % (seit 01.07.2023 PUEG), davon AN-Anteil 1,8 %. Code nimmt 1,7 % → −0,1-pp-Fehler auf SV-AN-Abzug.

- **[P2] PV-Kinderabschlag fehlt für 2+ Kinder.**
  Nur Binary `kinder: true/false` — kein Input für Anzahl Kinder < 25. § 55 Abs. 3 SGB XI (PUEG 2023) kennt Staffel 1,55 / 1,30 / 1,05 / 0,80 % pro Kind ab Kind 2 bis Kind 5. Code-Logik `pvZuschlag = !kinder ? 0.006 : 0` ist nur die Kinderlos-Zuschlag-Seite.

- **[P2] KiSt pauschal 9 % ohne Bundesland (Z. 54).**
  `kiSt = kirchensteuer ? lohnsteuer * 0.09 : 0`. Kein Bundesland-Dropdown, BY/BW-8-%-Fall fehlt. Bekanntes Anti-Pattern.

- **[P2] `MIDIJOB_UNTERGRENZE = 603.01` Stichtag-Regressionsfalle.**
  Zum 01.01.2027 steigt Minijob-Grenze auf 633 € (automatisch in `mindestlohn.ts` via Stichtag-Switch) → Midijob-Bereich ab 633,01 €. Der Rechner hält 603,01 € fest, während der Status-Badge inkonsistent mit dem globalen System wird.

- **[P2] SV-Sätze inline ohne SSOT-Import.**
  `SV_AN = 0.0930 + 0.0875 + 0.0170 + 0.0130`. Sollte aus `brutto-netto.ts` kommen (RV_SATZ_AN_2026, KV_BASISSATZ_AN_2026, AV_SATZ_AN_2026) und für PV aus `pflegeversicherung.ts`.

- **[P3] `FAKTOR_F = 0.6847` inline.**
  F wird jährlich von den Spitzenverbänden der Sozialversicherung neu ausgewiesen (aus aktuellen Beitragssätzen abgeleitet). Sollte eine eigene Lib-Konstante bekommen, idealerweise mit Stichtag-Switch-Pattern.

**Cross-Check:** gegen minijob-zentrale.de-Übergangsbereich-Rechner empfohlen — **Ist-vs-Soll-Delta bei Midijob 1.200 €/Monat dürfte bei dreistelligen Euro/Jahr liegen.**

---

### 7. MwSt-Rechner — [/finanzen/mwst-rechner](../../components/rechner/MwStRechner.tsx)

**Lib:** [lib/berechnungen/mwst.ts](../../lib/berechnungen/mwst.ts)
**SSOT-Status:** Keine Relevanz (19 % / 7 % seit § 12 UStG fest).
**Parameter-Stand:** Gastronomie-Sonder-Satz 7 % ist seit 01.01.2024 zurück auf 19 % gesetzt — Rechner bietet 19 % / 7 % zur Auswahl, User wählt selbst. ✓
**Findings:**

- **Keine Bugs.** Rein mathematisch, `netto × (1 + satz) = brutto` und Umkehrung. Multi-Position-Summierung korrekt.

- **[P3]** Kein automatischer Jahreshinweis zur 19 %-Gastronomie-Rückkehr (Kontext-UX).

---

### 8. MwSt-Rückerstattungs-Rechner — [/finanzen/mwst-rueckerstattung-rechner](../../components/rechner/MwstRueckerstattungRechner.tsx)

**Lib:** [lib/berechnungen/mwst-rueckerstattung.ts](../../lib/berechnungen/mwst-rueckerstattung.ts)
**SSOT-Status:** Keine.
**Parameter-Stand:** Mindestbetrag 50,01 € (§ 6 Abs. 3a UStG seit 01.01.2020) ✓. Global-Blue-/Planet-Gebühren realistische Schätzwerte.

**Findings:**

- **Keine Bugs.** Nische für Nicht-EU-Reisende, funktional korrekt.

---

## SSOT-Refactor-Kandidaten (Querschnitt)

1. **Erbschaft + Schenkung Tarif-Tabelle** (`getSteuersatz` in beiden Libs identisch): Extraktion in `lib/berechnungen/_erbst-tarif.ts` (Unterstrich = private Helper-Lib) oder Re-Export aus `erbschaftsteuer.ts`. Inkl. Härtefall-Regel.
2. **Midijob SV-Sätze, BBG-Check, F-Faktor**: komplette Extraktion in `lib/berechnungen/midijob.ts` (derzeit nicht vorhanden, nur Minijob-Lib). Integration mit `mindestlohn.ts` (MIDIJOB_UNTERGRENZE dynamisch), `brutto-netto.ts` (SV-Sätze), `pflegeversicherung.ts` (PV-Kinderabschlag).
3. **Firmenwagen Hybrid-Bedingungs-Lib**: Dokumentation der Jahres-Schwellen (CO2, Reichweite) als zentrale Konstante.

---

## Empfehlung: Bündelung der Folge-Prompts

### Prompt 115 — Stufe-4a P1-Pass (ca. 90 min)

Sechs P1-Bugs, davon **drei in MidijobRechner** — der Prompt wird zum großen Teil eine Midijob-Neuaufsetzung:

1. **Midijob: BE-Formel fixen** — `F * UG` statt `F * OG` im ersten Term. Isolierte Änderung, 1-Zeile-Fix.
2. **Midijob: Steuerklassen-Faktor `× 1.15` entfernen** — LSt nach Klasse V/VI korrekt über `berechneLohnsteuerJahr(brutto, steuerklasse, 2026)` aus `lohnsteuer.ts`. Das PAP-Verfahren berücksichtigt Klassen nativ.
3. **Midijob: Soli über `berechneSoli(jahresESt, false, 2026)`** aus `einkommensteuer.ts`.
4. **Erbschaft + Schenkung: Härtefall-Regel § 19 Abs. 3 ErbStG** — gemeinsame Helper-Funktion, beide Libs konsumieren.
5. **AfA: Degressiv-Plausibilitäts-Check ab 2026** — Warn-Banner bei Methode=degressiv + Anschaffungsdatum ≥ 2026 + Methode ≠ „Wohngebäude".
6. **Firmenwagen: Plug-in-Hybrid-Bedingungs-Inputs** — CO2-Wert + elektrische Reichweite abfragen, bei Nicht-Erfüllung Fallback auf 1 %.

### Prompt 116 — Stufe-4a P2-Pass + SSOT (ca. 60 min)

Zwölf P2-Bugs, davon vier in Midijob:

- Midijob: PV-Satz 1,7 → 1,8 %; PV-Kinderabschlag-Input; KiSt-Bundesland-Dropdown; MIDIJOB_UNTERGRENZE aus `mindestlohn.ts`
- Midijob: SV-Sätze-SSOT-Import
- Erbschaft: § 14-Kumulation statt Freibetrags-Abzug, Hausrat-FB
- Schenkung: Enkel-Differenzierung, Hausrat-FB Kl. II/III
- AfA: Degressiv-Deckel 25 → 20 %, Wohngebäude-Sonder-AfA-Option
- Zusätzlich: Midijob-Lib neu anlegen (SSOT-Konsolidierung)
- Erbschaft-Tarif als gemeinsame Helper-Funktion (SSOT)

### Prompt 117 — Stufe-4a P3 + UX-Polish (ca. 30–45 min)

Elf P3-Punkte, alle UX oder Nische:

- Versorgungsfreibetrag altersabhängige Staffel
- Selbstgenutzte Immobilie bei Schenkung
- Bundesland-Dropdown in KESt
- Verlustverrechnungs-Töpfe trennen
- AfA-Typ-Filter + Sammelposten
- Firmenwagen Grenzsteuersatz via ESt-Lib
- Firmenwagen KiSt + Soli im gwV
- MwSt Gastronomie-Hinweis
- Midijob F-Faktor-Dokumentation

---

## Stichtag-Monitoring nach Stufe 4a

- **01.01.2027** → Midijob-Grenze 633 €, Mindestlohn 14,60 € (Switch bereits in `mindestlohn.ts`, aber MidijobRechner holt den Wert noch inline). **Pflicht-Spot-Check nach 115/116-Fix.**
- **Degressive AfA** ist **bereits** ab 01.01.2026 weggefallen — Fix darf nicht warten.
- **Firmenwagen Plug-in-Hybrid Reichweite 80 km** seit 01.01.2025 — Fix darf nicht warten.

---

## Methodische Lehre für Stufe 4b

1. **„1 Input sichtbar"-Live-Beobachtung war irreführend bei Midijob** — der Rechner hat tatsächlich 4 Inputs (Brutto, Steuerklasse, Kirchensteuer, Kinder), nicht 1. Die Pre-Audit-Inventur sollte die **tatsächlichen React-State-Deklarationen** erfassen, nicht den visuellen ersten Eindruck.
2. **Midijob-BE-Formel** ist ein klassischer „sieht fast richtig aus, ist aber eine Konstante verdreht"-Fehler, den Grep-basierte Audits niemals finden würden. Nur Gegenrechnung an konkreten Beispielwerten (UG und OG getrennt prüfen) deckt das auf. **Regel für nächste Audits:** bei mehrteiligen Formeln mindestens zwei Extremwerte durchrechnen, nicht nur „sieht plausibel aus".
3. **Erbschafts-/Schenkungs-Duplikation** ist ein SSOT-Schmerz, aber kein Rechts-Bug — wurde trotzdem im Audit bemerkt, weil der Blick in beide Libs parallel schnell geht. **Regel:** Libs mit thematischer Nähe zusammen lesen.

---

## Nachtrag Prompt 115c (21.04.2026) — Stufe-4a P1-Rest geschlossen

Die drei verbleibenden P1-Bugs aus dem ursprünglichen 114er-Audit (außer Midijob = 115a und LSt Kl. V/VI = 115b2) wurden behoben.

### ER-02 — Härtefall § 19 Abs. 3 ErbStG (Commit `e711b52`)

- Neue exportierte Konstante `ERBST_TARIF_STUFEN` und Helper-Funktion `berechneErbStMitHaertefall(stpflErwerb, klasse)` in [lib/berechnungen/erbschaftsteuer.ts](../../lib/berechnungen/erbschaftsteuer.ts).
- Härtefall-Logik: Bei Stufensprung wird die Mehrsteuer auf 50 % (Sätze ≤ 30 %) bzw. 75 % (Sätze > 30 %) des überschreitenden Betrags gedeckelt.
- [lib/berechnungen/schenkungssteuer.ts](../../lib/berechnungen/schenkungssteuer.ts) importiert die Helper-Funktion, lokaler `getSteuersatz`-Duplikat entfernt; Steuerklasse-Type re-exportiert.
- SSOT-Konsolidierung der ErbSt-Tariftabelle ist damit pragmatisch in `erbschaftsteuer.ts` gelandet — eine dedizierte `_erbst-tarif.ts` (wie im Audit-Bericht vorgeschlagen) bleibt für Prompt 116 eher überflüssig.

### AFA-02 — Degressive AfA ab 2026 (Commit `8bda68b`)

- Gate in `useMemo` von [components/rechner/AfaRechner.tsx](../../components/rechner/AfaRechner.tsx): `degressivGesperrt = methode === 'degressiv' && startJahr >= 2026`.
- Fallback auf linear, Button-State bleibt visuell aktiv (User-Intention).
- Amber-Warn-Banner vor der Result-Box mit Verweis auf § 7 Abs. 2 EStG n.F. und Hinweis, dass Rückdatierung auf ≤ 31.12.2025 degressiv reaktiviert.

### FW-02 — Plug-in-Hybrid 0,5 %-Bedingungen (Commit `90cad88`)

- Neue Modul-Konstanten `HYBRID_CO2_GRENZE_G_KM = 50` und `HYBRID_REICHWEITE_MIN_KM = 80` in [components/rechner/FirmenwagenRechner.tsx](../../components/rechner/FirmenwagenRechner.tsx).
- Zwei neue State-Felder `co2` / `reichweite` mit Defaults 50/80 (bestehende Nutzer bekommen weiter 0,5 %; Fallback greift nur bei aktiv schlechteren Werten).
- Bei Nicht-Erfüllung fällt die `aktuell`-Spalte auf Verbrenner-Berechnung zurück; Vergleichs-Box zeigt weiterhin den Idealfall Hybrid = 0,5 %.
- Conditional UI-Block nur bei Antrieb=Hybrid: zwei NummerEingabe-Felder + Amber-Warn-Banner bei verpassten Schwellen, mit Verweis auf § 6 Abs. 1 Nr. 4 S. 2 Nr. 3 EStG.

### Regressions-Script

Neues [scripts/verify-erbst-haertefall.ts](../../scripts/verify-erbst-haertefall.ts) mit 11 Testfällen:

- 4 Kern-Fälle (Kl. I/II/III an Tarifsprungkanten)
- 4 ErbSt-Regressions (ER-01, ER-02a, ER-02b, ER-03)
- 3 SchenkSt-Regressions (SS-01 + 2 Härtefall-Varianten)

Ergebnis: **11/11 grün, Δ = 0 € an allen Stützpunkten.**

### Neu entdeckter P2-Kandidat für Prompt 116

Die SchenkSt-Lib kennt nur 7 Verwandtschafts-Optionen (`ehepartner`, `kind`, `enkelkind`, `elternteil`, `geschwister`, `nichte-neffe`, `nicht-verwandt`). Es fehlen:

- **Schwiegereltern** (Kl. II nach § 15 Abs. 1 Nr. 5 ErbStG)
- **Schwager / Schwägerin** (Kl. II nach § 15 Abs. 1 Nr. 7 ErbStG)
- **Stiefeltern getrennt von leiblichen Eltern** (die Erb-Lib unterscheidet via `stiefeltern` separat)

Die Erb-Lib differenziert korrekter. Der „Enkelkind bei verstorbenen Eltern"-Fall (SS-02 im Testfall-Katalog) bleibt als eigener Bug im Prompt-116-Scope.

### Offener Scope

- **Prompt 116 (Stufe-4a P2 + SSOT):** Erbschaft-§14-Kumulation, Enkel-Schenkung-Differenzierung, Hausrat-FB Kl. II/III, AfA-Degressiv-Deckel 25→20 %, Wohngebäude-Sonder-AfA, erweiterte SchenkSt-Verwandtschafts-Optionen (Schwieger-/Schwager), Midijob-Lib-Konsolidierung (MIDIJOB_UNTERGRENZE aus `mindestlohn.ts`).
- **Prompt 117 (Stufe-4a P3):** UX-Polish (Versorgungsfreibetrag-Staffel, Familienheim, KESt-Bundesland, Verlustverrechnungs-Töpfe, AfA-Typ-Filter, Sammelposten, Firmenwagen-Grenzsteuersatz aus ESt-Lib, KiSt+Soli im gwV, MwSt-Gastronomie-Hinweis, Midijob F-Faktor-Doku).
- **Wochenend-Refactor (separat):** Lohnsteuer Kl. V/VI Voll-PAP-Implementation nach § 39b Abs. 2 Satz 7 EStG, um die empirische Lookup-Tabelle (115b2) abzulösen.

> Folge-Fix Prompt 115d (21.04.2026): UX-Inkonsistenz in der Vergleichs-Tabelle behoben (aktive Spalte nun markiert, Hybrid-Spalte mit Bedingungs-Fußnote versehen). Rechenlogik unverändert.

---

## Nachtrag Prompt 116 (21.04.2026) — P2-Pass abgeschlossen

Acht P2-Bugs aus dem ursprünglichen 114er-Audit über vier Rechner. Midijob-P2 war bereits mit 115a abgedeckt; hier die verbleibenden Stufe-4a-P2.

### ErbSt (Commit `e7951eb`)

- **§ 14 ErbStG-Kumulation** (ER-04): Neue Berechnungsroutine in [lib/berechnungen/erbschaftsteuer.ts](../../lib/berechnungen/erbschaftsteuer.ts) `berechneErbschaftsteuer` bei `vorschenkungen > 0`. Gesamterwerb = wert + vorschenkungen; Tarif auf Gesamterwerb − persFB; Anrechnung der fiktiven/tatsächlichen Vorsteuer nach § 14 Abs. 1 Satz 2/3 (höherer Betrag aus tatsächlicher Vor-Steuer mit persFB-Schutz und proportionalem Anteil). ER-04-Testfall (500k Kind + 350k Vorschenkung): vorher 67.500 €, jetzt 39.706 €.
- **Hausrat-Freibetrag § 13 ErbStG** (ER-03): Neuer optionaler Input `hausratFreibetrag: boolean`. 41.000 € Kl. I / 12.000 € Kl. II+III. Neuer Schritt 5 im ErbschaftsteuerRechner.
- Neue UI-Zeile „Anrechnung auf Vorschenkung (§ 14 Abs. 1 ErbStG)" in der Berechnungs-Tabelle.

### SchenkSt (Commit `3aa2583`)

- **Enkel-Differenzierung** (SS-02): Typ `enkelkind` (200k FB pauschal) ersetzt durch `enkel-eltern-leben` (200k) und `enkel-eltern-tot` (400k, § 16 Abs. 1 Nr. 3 ErbStG analog zur ErbSt-Lib).
- **Hausrat-FB Kl. II/III** (SS-03): 12.000 € statt 0 €.
- **Schwieger-/Stiefeltern + Geschiedener Ehepartner**: Zwei neue Optionen (jeweils Kl. II), konsistent zur ErbSt-Lib.

### AfA (Commit `39923c0`)

- **Degressiv-Deckel 20 %** (AFA-03): `Math.min`-Clamp auf 20 (statt 25); Label „max. 20 %, höchstens 2× linearer Satz". Der 115c-Gate (Fallback auf linear ab 2026) bleibt greifbar; der 20 %-Deckel wirkt nur im Rest-Gültigkeitsbereich bis 31.12.2025.
- **Wohngebäude-Sonder-AfA § 7 Abs. 5a EStG** (AFA-04): Vierte Methode `wohngebaeude-5` mit 5 % linear p. a., Plan läuft gesetzlich 20 Jahre. Info-Hinweis unter der Methoden-Auswahl zu Bauantrags-Stichtagen (01.10.2023 bis 30.09.2029) und Effizienzhaus-Voraussetzungen. Nutzungsdauer-Eingabe wirkt hier bewusst nicht.

### Midijob (Commit `b9107b2`)

- **UNTERGRENZE-Stichtag-Regressionsfalle**: Die ehemals Modul-Scope-Konstante `MIDIJOB_UNTERGRENZE = getMidijobUntergrenze()` wurde in die Komponente verschoben. Nach dem 01.01.2027 greift der Stichtag-Switch (603,01 → 633,01 €) jetzt ohne Redeploy. Übergangsbereich-Text und CrossLink zum Minijob-Rechner formulieren die Schwelle dynamisch.

### Regressions-Script

[scripts/verify-erbst-haertefall.ts](../../scripts/verify-erbst-haertefall.ts) auf 15/15 erweitert: ER-04 (§ 14 Kumulation), ER-03 (Hausrat Kl. I), SS-02 (Enkel Eltern verstorben), SS-03 (Hausrat Kl. II Geschwister). Alle Δ = 0 €.

### Offener Scope

- **Prompt 117 (P3 + UX-Polish):** Versorgungsfreibetrag altersabhängige Staffel; Selbstgenutzte Immobilie bei Schenkung; KESt Bundesland-Dropdown; Verlustverrechnungs-Töpfe trennen; AfA-Typ-Filter + Sammelposten; Firmenwagen-Grenzsteuersatz via ESt-Lib; KiSt+Soli im gwV; MwSt-Gastronomie-Hinweis; Midijob F-Faktor-Doku.
- **Wochenend-Refactor (separat):** Lohnsteuer Kl. V/VI Voll-PAP nach § 39b Abs. 2 Satz 7 EStG.

Damit ist die Stufe-4a-Audit-Welle inhaltlich bis auf P3 + LSt-Voll-PAP durchgearbeitet.

---

## Nachtrag Prompt 117 (22.04.2026) — P3-Pass (Teil) abgeschlossen

Sieben P3-UX-Polish-Items umgesetzt, fünf weitere bewusst ins Backlog verschoben (siehe unten).

### Umgesetzt

- **KESt Bundesland-Dropdown + Verlustverrechnung zwei Töpfe § 20 Abs. 6 EStG** (Commit `3eeb72a`) — [components/rechner/KapitalertragsteuerRechner.tsx](../../components/rechner/KapitalertragsteuerRechner.tsx): Statt 8/9-%-Button ein Bundesland-Select (SSOT-Pattern); Toggle-Link für Verlust-Aufschlüsselung in Aktien-Topf vs. allgemeiner Topf mit kontextabhängigem Aktiv-Hinweis.
- **ErbSt Versorgungsfreibetrag-Staffel § 17 Abs. 2 ErbStG** (Commit `0a34df3`) — [lib/berechnungen/erbschaftsteuer.ts](../../lib/berechnungen/erbschaftsteuer.ts): Neue exportierte `versorgungsfbKind(alter?)`-Fn mit Staffel 52k/41k/30,7k/20,5k/10,3k/0 €. Rechner-UI bei Kind/Enkel-Eltern-tot + Erbschaft mit optionalem Alter-Input. Regressions-Script um einen Staffel-Testfall erweitert (16/16 grün).
- **AfA Sammelposten-Pool § 6 Abs. 2a EStG** (Commit `d9c3a6d`) — 5. Methode mit 20 % linear über 5 Jahre, Validitätscheck auf 250,01 €–1.000 € netto.
- **Firmenwagen Info-Block Grenzsteuersatz + KiSt/Soli-Vereinfachung** (Commit `64804e8`) — dezenter Info-Block mit Richtwerten und Link auf Steuerprogressions-Rechner.
- **MwSt Gastronomie-19-%-Rückkehr-Hinweis** (Commit `5ef90c7`) — konditional bei 7-%-Auswahl, Verweis auf § 12 Abs. 2 UStG.
- **Midijob F-Faktor-Dokumentation** (Commit `90905a2`) — ausführlicher JSDoc-Block in `midijob-uebergang.ts`, UI-Hinweis unter der Aufschlüsselung, neuer Punkt 8 in [docs/jahreswerte-kalender.md](../jahreswerte-kalender.md) Dezember-Audit-Checkliste.

### Backlog — nicht in 117 umgesetzt

Fünf P3-Items bleiben bewusst im Backlog, weil sie entweder Nische, komplex oder eigenständige Arbeitspakete sind:

- **KESt Vorabpauschale § 18 InvStG** — eigenes thematisches Arbeitspaket, erfordert Basiszinssatz-Jahresupdate und separaten Rechen-Pfad.
- **SchenkSt Familienheim § 13 Abs. 1 Nr. 4a ErbStG** — komplexes Bedingungsgefüge (10-Jahres-Selbstnutzung, 200-qm-Grenze bei Kindern); erst bei nachgefragtem User-Bedarf sinnvoll zu bauen.
- **AfA Typ-Filter (Gebäude/Maschine/Computer)** — Preset-Liste auf Basis der BMF-AfA-Tabellen; nice-to-have, aber User kann die Nutzungsdauer aus BMF-Tabelle selbst eintragen.
- **Firmenwagen Vergleichs-Box bei BLP > 70.000 €** — die Spalten-Markierung aus 115d mildert die UX-Verwirrung bereits; kein aktiver Bug mehr.
- **KESt Soli-Freigrenze bei Veranlagung** — juristische Feinabwägung, der aktuelle Quellensteuer-Ansatz ist für den Massen-Fall korrekt.

Diese Items werden erst aufgegriffen, wenn konkreter User-Bedarf oder ein Jahres-Audit-Finding dazu zwingt.

### Welle-Abschluss

Mit 117 ist die Stufe-4a-Audit-Welle inhaltlich abgeschlossen. Der Lohnsteuer-Voll-PAP-Refactor (Ersatz der 115b2-Lookup-Tabellen durch § 39b Abs. 2 Satz 7 EStG-Volltariff) bleibt als separater Wochenend-Kandidat außerhalb der Welle.

---

## Nachtrag Prompt 125a (22.04.2026) — Midijob-Rechner strukturell nachgeschärft

Der Midijob-Rechner war nach 115a/116/117 weitgehend gefixt, aber eine
tieferliegende strukturelle Lücke blieb: **BE_gesamt und BE_AN wurden nicht
getrennt berechnet**. Die Lib-Funktion `berechneBemessungsgrundlageAN` hat
faktisch die § 20a Abs. 2-Formel (BE_gesamt) gerechnet, das Ergebnis aber
als „BE_AN" bezeichnet. Dadurch wurde der AN-Beitragsanteil überschätzt
und der AG-Anteil als `Brutto × halber Satz` vereinfacht (Code-Kommentar
„Display-Wert, keine Midijob-AG-Logik"). Seit 01.10.2022 (§ 20a Abs. 2a
SGB IV) sind die beiden BE-Formeln aber wirklich getrennt — AN zahlt
weniger als in 115a impliziert, AG trägt den Differenzbetrag.

Zusätzlich war der **F-Faktor 2026 noch auf 0,6847** (alter 2024er-Wert
aus 115a-Dokumentation) statt aktuell **0,6619** gemäß BMAS-Bekanntmachung /
gemeinsamem Rundschreiben der SV-Spitzenverbände für 2026.

### Änderungen Prompt 125a

**Lib (zwei Dateien):**
- **Neu:** [`lib/berechnungen/midijob-parameter.ts`](../../lib/berechnungen/midijob-parameter.ts)
  als SSOT mit Stichtag-Switch-Pattern. Interface `MidijobParameter`
  (G, OG, F, quelle, gueltigAb), Konstante `MIDIJOB_2026` (G = 603,
  OG = 2.000, **F = 0,6619**), Getter `getAktuelleMidijobParameter()`,
  Helper `getBeitragsFormeln()` liefert die vier Linearform-Koeffizienten
  (faktorGesamt, konstanteGesamt, faktorAN, konstanteAN) — abgeleitet
  aus G/OG/F, nicht hartkodiert.
- **Refactor:** [`lib/berechnungen/midijob-uebergang.ts`](../../lib/berechnungen/midijob-uebergang.ts)
  trennt jetzt `berechneBemessungsgrundlageGesamt` (§ 20a Abs. 2) und
  `berechneBemessungsgrundlageAN` (§ 20a Abs. 2a — F-unabhängig, startet
  bei AE = G mit 0). Beide nutzen `getBeitragsFormeln()` zur Konstanten-
  Ableitung. F-Faktor-Export bleibt als Re-Export aus Parameter-Lib
  (Abwärtskompatibilität für bestehende Konsumenten).

**UI ([`components/rechner/MidijobRechner.tsx`](../../components/rechner/MidijobRechner.tsx)):**
- Berechnet und zeigt jetzt **BE_gesamt UND BE_AN** als separate
  Aufschlüsselungs-Zeilen mit Paragraph-Referenz (§ 20a Abs. 2 / Abs. 2a).
- **AG-Anteil** berechnet sich korrekt als `Gesamtbeitrag − AN-Anteil`
  (= im Übergangsbereich deutlich mehr als die halbe Last, bei UG fast
  der gesamte Beitrag).
- **Neuer blauer Info-Hinweis** unter der Tabelle zu § 163 Abs. 10 SGB VI:
  „Volle SV-Ansprüche trotz reduzierter Beiträge — Rentenpunkte auf
  BE_gesamt-Basis, AG trägt Differenz."
- **Validierungshinweise:** Bei AE < UG (Minijob) amber Hinweis mit
  Verweis auf Minijob-Rechner; bei AE > OG roter Hinweis mit Verweis
  auf Brutto-Netto-Rechner.
- **F-Faktor dynamisch** aus Parameter-Lib (statt hartkodiert im Text).
  Jahreswechsel 2027 greift ohne UI-Änderung.

**Verify ([`scripts/verify-midijob-p1.ts`](../../scripts/verify-midijob-p1.ts)):**
21 Testfälle, alle gegen externe Rechtsquellen (§ 20a SGB IV, § 163 SGB VI,
BMAS-Bekanntmachung). Struktur:
- GRUPPE 1: Formel-Konstanten aus Parametern abgeleitet (F=0,6619, G=603,
  OG=2.000, faktorGesamt≈1,145937, faktorAN≈1,431639, konstanteAN≈863,278)
- GRUPPE 2: MJ-01 bis MJ-05 — BE-Werte an Stützpunkten (UG, Mitte, OG,
  außerhalb). MJ-02 (AE = 1.500): BE_gesamt = 1.427,03 €, BE_AN = 1.284,18 €
  — Karsten-Cross-Check gegen DRV-Übergangsbereichsrechner.
- GRUPPE 3: MJ-SOLI — Soli = 0 € bei Max-Midijob (Jahres-Brutto 24.000 € <
  Soli-Freigrenze 20.350 € ESt).
- GRUPPE 4: MJ-STKL — Verhältnis StKl V/I ≠ 1,15 (kein erfundener Faktor).
- GRUPPE 5: AG-Invarianten — BE_gesamt > 2 × BE_AN an UG (AG trägt mehr
  als die Hälfte), BE_gesamt = BE_AN an OG (Konvergenz).

**Ergebnis:** 21/21 grün.

### Regressionen

Alle bestehenden Verify-Scripts weiterhin grün nach dem Refactor:
verify-afbg 35/35, verify-bafoeg-p2 16/16, verify-bafoeg-p3 20/20,
verify-buergergeld-p2 19/19, verify-buergergeld-p3 21/21,
verify-pfaendung-p2 11/11, verify-erbst-haertefall 16/16,
verify-unterhalt-2026 alle grün, verify-wohngeld-p1 42/42.

### Numerischer Impact für typischen Midijob

AE = 1.500 €/Monat, StKl I, keine Kinder:
- **Vorher (115a-Stand, F = 0,6847):** „BE_AN" (eigentlich BE_gesamt)
  ≈ 1.432 €, AN-SV ≈ 287 €, AG-SV ≈ 300 € (Brutto × halber Satz, vereinfacht).
- **Nachher (125a-Stand, F = 0,6619, korrekte Trennung):**
  - BE_gesamt = 1.427,03 €, BE_AN = 1.284,18 €
  - AN-SV ≈ 257 € (−30 €/Monat AN-Vorteil sichtbar)
  - Gesamtbeitrag ≈ 571 €, AG-SV ≈ 314 € (AG trägt mehr als halbe Last)

Der AN-Vorteil wird damit sichtbar und korrekt ausgewiesen — statt vorher
verschleiert durch die fehlerhafte „BE_AN"-Bezeichnung der BE_gesamt-Werte.

### Offene Punkte nach 125a

- **Stichtag-Switch 01.01.2027** vorbereitet (Parameter-Lib bereit für
  neuen Bucket `MIDIJOB_2027` mit G = 633, neuer F). Nur bei BMAS-
  Bekanntmachung eintragen.
- **Kinderlos-Zuschlag im Gesamtbeitrag:** Aktuelle Näherung
  `gesamtSvSatz = anSvSatz × 2` überschätzt den AG-Anteil minimal, weil
  der Kinderlos-Zuschlag nur vom AN getragen wird. Präzisionsverlust
  im 0,3 €-Bereich bei Max-Midijob — nicht priorisiert.
- **Prompt 125b** adressiert die verbleibenden Rechner aus Stufe 4a
  (Erbschaft, Schenkung, KESt, AfA, Firmenwagen, MwSt) — diese wurden
  aber in 115c/116/117 bereits weitgehend gefixt; 125b klärt Reststand.
