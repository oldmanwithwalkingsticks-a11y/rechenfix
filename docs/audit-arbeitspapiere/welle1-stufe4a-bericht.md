# Welle 1 Stufe 4a — Spezial-Steuer — Audit-Bericht

**Prompt:** 114
**Datum:** 2026-04-21
**Methodik:** 7-Punkt-Check (analog Welle-1-Stufe-3, Prompt 109)
**Scope:** 8 Rechner
**Audit-Ausgang:** Nur Befund + Priorisierung, kein Code-Fix

> **Teil-Abschluss Prompt 115a (2026-04-21):** Alle 3 P1 + 4 P2 im MidijobRechner behoben (BE-Formel, LSt, Soli, SV-SSOT, PV 1,8 %, PV-Kinderabschlag, KiSt-Bundesland). Neue SSOT-Lib `lib/berechnungen/midijob-uebergang.ts` für § 20a SGB IV. Restliche P1/P2/P3 in Erbschaft, Schenkung, AfA, Firmenwagen, KESt offen für Prompts 115b / 116 / 117.

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
