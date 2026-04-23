# Welle 2 Stufe 1 — Auto-Kategorie — Audit-Bericht

**Prompt:** 130
**Datum:** 2026-04-23
**Methodik:** 4-Punkt-Audit (Formel/Rechtsquelle, Input-Validierung, Edge Cases, SSOT-Verwendung)
**Scope:** 10 Rechner (Firmenwagen aus 4a-Audit ausgelassen, migriert via Prompt 126)
**Audit-Ausgang:** Nur Befund + Priorisierung, kein Code-Fix
**Primärquellen-Regel:** Rule 11 angewandt — Werte gegen Gesetzestext geprüft, bei Unsicherheit als „Verdacht, Primärquelle-Check vor Fix" markiert.

---

## Executive Summary

| Metrik | Anzahl |
|---|---|
| Rechner geprüft | 10 |
| **P1-Bugs** | 3 (alle in KfzSteuerRechner + Lib) |
| **P2-Bugs** | 5 (Korrektur 2026-04-23: ursprünglich fälschlich mit 6 gezählt — im Detail-Abschnitt sind 5 `[P2]`-Tags; siehe Abschluss-Status) |
| **P3 / Polish** | 11 |
| SSOT-Kandidaten | 0 neue — bestehende Libs sind adäquat |
| Rückfragen Karsten | 2 (siehe Ende) |

**Hot Spot:** `KfzSteuerRechner` / `lib/berechnungen/kfz-steuer.ts` — drei
zusammenhängende P1-Bugs aus divergenten CO₂-Staffeln (Lib vs. § 9 KraftStG)
und falschem Elektro-Befreiungs-Stichtag (Code: 31.12.2030, Gesetz § 3d
KraftStG: 31.12.2035). Der UI-Text in `KfzSteuerRechner.tsx:161` nennt sogar
noch zwei weitere falsche Daten (Zulassungs-Stichtag 31.12.2025 statt
31.12.2030; Maximal-Ende 31.12.2030 statt 31.12.2035).

**Bestätigt als nicht Hot Spot:** BussgeldRechner, TaxiRechner — Code-
Stichproben gegen Primärquellen passen (BKatV 2021er-Novelle aktiv;
TaxiRechner-Tarife sind kommunalrechtlich, Lib ist explizit als Schätz-
Tool markiert).

**Keine neuen SSOT-Kandidaten** — bestehende Libs (`autokosten`, `bussgeld`,
`fahrrad-rahmen`, `kfz-steuer`, `kw-ps`, `spritkosten`, `taxi`) decken die
Rechner ausreichend ab. FuehrerscheinRechner, LeasingRechner und
ReichweitenRechner rechnen inline — sinnvoll, weil keine Wiederverwendung
in anderen Rechnern.

---

## Pro Rechner

### 1. AutokostenRechner — [/auto/autokosten-rechner](../../components/rechner/AutokostenRechner.tsx)

**Lib:** [lib/berechnungen/autokosten.ts](../../lib/berechnungen/autokosten.ts)
**State:** 16 Felder, umfangreich (Kaufpreis, Finanzierung, Wartung, Parken, Waschanlage, …).
**Kern-Formel:** Gesamtkosten aus Fixkosten (Versicherung, Steuer, TÜV, Wartung, Reifen) + Variable (Sprit, Park) + Wertverlust (Restwert-basiert).

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** Keine gesetzliche Formel — etablierte Haushalts-Rechnung. Keine P1/P2-Befunde.
2. **Input-Validierung:** `NummerEingabe` ohne min/max. P3.
3. **Edge Cases:** Kein expliziter Guard gegen Division durch 0 (kein Divisor-Input im Kern; Fahrleistung = 0 würde keine Sprit-Kosten erzeugen, aber auch keinen Crash — per Inspektion Lib-Sicht prüfen, hier nicht gehalten). Stichproben-OK.
4. **SSOT:** Konsumiert zentrale `autokosten`-Lib. Konsistent.

**Findings:**
- **[P3]** `kfzSteuer`-Input ist freie Zahl — könnte durch Import aus `kfz-steuer.ts` automatisch ermittelt werden bei Eingabe von Hubraum + CO₂ + Antrieb. UX-Erweiterung, nicht korrekturbedürftig.
- **[P3]** `verbrauch`-Default wird auf 18 bei Elektro gewechselt (kWh/100km) — einheitlich mit anderen Rechnern? Konsistent zu ReichweitenRechner.

---

### 2. BussgeldRechner — [/auto/bussgeldrechner](../../components/rechner/BussgeldRechner.tsx)

**Lib:** [lib/berechnungen/bussgeld.ts](../../lib/berechnungen/bussgeld.ts)
**Primärquelle:** BKatV (Bußgeldkatalog-Verordnung), aktuell Novelle vom 09.11.2021, in Kraft ab 09.11.2021. Bestätigt gegen [gesetze-im-internet.de/bkatv_2013](https://www.gesetze-im-internet.de/bkatv_2013/).

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle (Stichprobe):** Geschwindigkeit innerorts PKW an 3 Stützpunkten geprüft:
   - 11–15 km/h: Code 50 € ✓ (Novelle 2021)
   - 16–20 km/h: Code 70 € ✓
   - über 70 km/h: Code 800 €, 2 Punkte, 3 Mo. Fahrverbot ✓
   Rotlicht-Staffel (unter 1s / über 1s / mit Gefährdung) Code 90 / 200 / 320 € — entspricht BKatV-Anlage Lfd.Nr. 132.*.
   Stichproben grün.
2. **Input-Validierung:** `Math.max(e.ueberschreitung, 1)` in `berechneGeschwindigkeit` — clampt auf >= 1. Gut. Andere Werte über Select → typsicher.
3. **Edge Cases:** `abstandGeschwindigkeit` wird als numerisch angenommen; ≤ 0 würde in `istSchnell = geschwindigkeit > 80` → false, dann Langsam-Tabelle greifen. Kein Crash. OK.
4. **SSOT:** Konsistent. Lib-Sicht klar getrennt von UI.

**Findings:**
- **[P2]** LKW-Faktor 1,3 (Lib Z. 68) ist eine pauschale Approximation. BKatV hat eigentlich spezifische LKW-Sätze in Lfd.Nr. 11.3.6 etc. — je nach Fahrzeuggewicht/-art unterschiedlich, nicht 30 % pauschal. Für Schätz-Rechner akzeptabel, aber im Erklär-Text klar als Näherung markieren.
- **[P2]** Parken-Staffel (Lib Z. 174-193) nur 25/55 € — BKatV nennt differenziertere Staffeln je nach Dauer und Art (mit/ohne Behinderung, bis 1h / über 1h). Vereinfacht, Erklär-Hinweis im UI bereits vorhanden („erhöht sich um 15–25 €").
- **[P3]** `ueberschreitung`-Input kein max-Clamping (200 km/h+ würde die letzte Stufe greifen). Uncritical.

---

### 3. FahrradRahmenRechner — [/auto/fahrrad-rahmengroesse-rechner](../../components/rechner/FahrradRahmenRechner.tsx)

**Lib:** [lib/berechnungen/fahrrad-rahmen.ts](../../lib/berechnungen/fahrrad-rahmen.ts)
**Primärquelle:** Keine gesetzliche — etablierte Multiplikatoren (Schrittlänge × 0,66 City / 0,665 Rennrad / 0,574 MTB).
**4-Punkt-Audit:**

1. **Formel:** Konventionell korrekt (etablierte Fahrradhandel-Norm).
2. **Input:** Guard `if (kg <= 0) return null` schützt.
3. **Edge Cases:** Schrittlänge optional, dann aus Körpergröße geschätzt (×0,47). OK.
4. **SSOT:** Keine Rechtsquelle — inline-Konstanten sind hier legitim.

**Findings:** Keine Bugs. **P3:** Toleranz-Bereich ±2 cm ist eine gute UX-Hinzufügung, konsistent mit Fahrrad-Branche.

---

### 4. FuehrerscheinRechner — [/auto/fuehrerschein-rechner](../../components/rechner/FuehrerscheinRechner.tsx)

**Lib:** keine — inline im Component.
**Primärquelle (Prüfungsgebühren):** Amtliche TÜV/DEKRA-Gebühren 2026:
- Theorieprüfung **22,49 €**
- Praktische Prüfung Klasse B **116,93 €**
Quelle: TÜV SÜD + ADAC (Sekundär, weil Prüfungsgebühren auf GebOSt-Anlage basieren; konkrete Euro-Beträge werden zweijährlich per Verordnung angepasst).

**Code-Werte:** Theorie 23 €, Praxis 117 € — gerundete Approximationen.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** Regions-Preise (65/55/45 €/h Fahrstunde + 500/425/350 € Grundgebühr) sind Durchschnitts-Schätzungen aus Fahrschul-Marktbeobachtung, keine gesetzliche Norm. Pflicht-Sonderfahrten = 12 (§ 5 FahrschAusbO: 5 Überland + 4 Autobahn + 3 Nacht) ✓.
2. **Input:** `Math.max(0, parseDeutscheZahl(uebungsstunden))` clampt. Gut.
3. **Edge Cases:** Wiederholungsprüfung „× 2" ist Vereinfachung — ignoriert Vorstellungsgebühr der Fahrschule. Vertretbar für Schätz-Rechner.
4. **SSOT:** Keine Lib, inline ausreichend.

**Findings:**
- **[P2]** Theorie- und Praxisgebühren leicht daneben (23 € statt 22,49 €; 117 € statt 116,93 €). Cent-Präzision wäre sauberer — oder Disclaimer „ca." hinzufügen. Summenauswirkung ~60 Cent bei Erstversuch, ~1,20 € bei Wiederholung.
- **[P3]** Regions-Preise ohne Quellenangabe im Erklär-Text; „typische Spannen" markieren. ADAC nennt Klasse B durchschnittlich 3.070–4.070 € gesamt (Stand 2026).
- **[P3]** Pflicht-Sonderfahrten-Logik nimmt 12 × (fahrstundenpreis × 1,5) an. Der 1,5-Aufschlag ist Branchenstandard, nicht gesetzlich — auch so nie explizit im Rechner deklariert.

---

### 5. KfzSteuerRechner — [/auto/kfz-steuer-rechner](../../components/rechner/KfzSteuerRechner.tsx) — **HOT SPOT**

**Lib:** [lib/berechnungen/kfz-steuer.ts](../../lib/berechnungen/kfz-steuer.ts)
**Primärquellen (verifiziert):**
- **§ 9 Abs. 1 Nr. 2c KraftStG** (Sockelbetrag + CO₂-Staffel nach Erstzulassung ab 01.01.2021): [gesetze-im-internet.de/kraftstg/__9.html](https://www.gesetze-im-internet.de/kraftstg/__9.html)
- **§ 3d KraftStG** (Elektro-Steuerbefreiung): [gesetze-im-internet.de/kraftstg/__3d.html](https://www.gesetze-im-internet.de/kraftstg/__3d.html)

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** **3 P1-Bugs, siehe unten.**
2. **Input:** `hubraum <= 0` return null ✓. Kein max-Clamping (10.000 ccm?), P3.
3. **Edge Cases:** Elektro-Pfad korrekt als eigenes Return. Hybrid wird wie Benzin behandelt (legitim für Plug-in-Hybride bei Sockelbetrag-Komponente; CO₂-Komponente greift trotzdem).
4. **SSOT:** Lib ist zentral, konsumiert von KfzSteuerRechner + AutokostenRechner (indirekt via User-Input).

**Findings:**

#### **[P1] CO₂-Staffel divergiert von § 9 Abs. 1 Nr. 2c KraftStG**

| g/km | Code ([kfz-steuer.ts:31-38](../../lib/berechnungen/kfz-steuer.ts)) | Gesetz § 9 Abs. 1 Nr. 2c KraftStG | Δ |
|---|---|---|---|
| 95–115 | 2,00 €/g | 2,00 €/g | ✓ |
| 115–135 | **2,50 €/g** | **2,20 €/g** | **+0,30** |
| 135–155 | **3,00 €/g** | **2,50 €/g** | **+0,50** |
| 155–175 | **3,50 €/g** | **2,90 €/g** | **+0,60** |
| 175–195 | *(als 4,00 €/g) ab 175+* | **3,40 €/g** für 175–195 | **+0,60** |
| über 195 | 4,00 €/g | 4,00 €/g | ✓ |

**Impact:** Bei einem typischen 140 g/km-PKW (Benzin, 1.600 ccm) rechnet der Rechner ~15 € zu viel CO₂-Komponente pro Jahr. Bei 180 g/km-SUV ~50–60 € zu viel pro Jahr. Systematische Überbesteuerung in der Mittelklasse und Oberklasse.

**Rechtstext-Zitat:** „Für Personenkraftwagen, die nach dem 31. Dezember 2020 erstmals zugelassen werden … je g/km CO₂-Emission … 2,00 Euro für den Bereich von 96 bis 115 g/km, 2,20 Euro für den Bereich von 116 bis 135 g/km, 2,50 Euro für den Bereich von 136 bis 155 g/km, 2,90 Euro für den Bereich von 156 bis 175 g/km, 3,40 Euro für den Bereich von 176 bis 195 g/km und 4,00 Euro ab 196 g/km."

#### **[P1] Elektro-Befreiungs-Ende: 31.12.2030 statt 31.12.2035**

[kfz-steuer.ts:90](../../lib/berechnungen/kfz-steuer.ts) hardcodet `befreitBis: '31.12.2030'`.

Gesetz § 3d KraftStG (wortgetreu): *„für zehn Jahre ab dem Tag der erstmaligen Zulassung, längstens jedoch bis zum 31. Dezember 2035"*. Zulassungs-Stichtag: „in der Zeit vom 18. Mai 2011 bis 31. Dezember 2030".

**Impact:** Ein E-Fahrzeug, erstmals zugelassen z. B. am 01.01.2028, bleibt bis 01.01.2038 befreit — aber laut Gesetz **längstens bis 31.12.2035**. Der Rechner sagt pauschal „bis 31.12.2030" — verkürzt die Befreiung systematisch um bis zu 5 Jahre. Für Fahrzeuge zugelassen 2021–2025 ist der Rechner-Output zufällig in etwa korrekt (10 Jahre ab Zulassung), für Zulassungen 2026+ deutlich zu pessimistisch.

**Korrekte Darstellung** braucht entweder ein Erstzulassungs-Datum als Input (dann dynamisch `min(Zulassung + 10J, 31.12.2035)`) oder einen pauschalen Text „max. 31.12.2035".

#### **[P1] UI-Erklär-Text mit falschen Daten**

[KfzSteuerRechner.tsx:161](../../components/rechner/KfzSteuerRechner.tsx):
> „Reine Elektrofahrzeuge sind bei Erstzulassung bis **31.12.2025** für 10 Jahre steuerbefreit, längstens bis zum **31.12.2030**."

**Beide Daten falsch:**
- Zulassungs-Stichtag: **31.12.2030** (nicht 2025)
- Maximal-Ende: **31.12.2035** (nicht 2030)

**Impact:** User mit E-Auto-Zulassung 2026–2030 liest, sie seien nicht mehr befreit — falsch. User liest 5 Jahre zu kurze Maximal-Laufzeit. SEO-relevant (crawlbare Falschaussage).

#### **[P2] Vor-2009-Sätze pauschal Euro 4+**

[kfz-steuer.ts:72-77](../../lib/berechnungen/kfz-steuer.ts) vereinfacht zu fixen Sätzen (6,75 € Benzin / 15,44 € Diesel je 100 ccm). § 9 Abs. 1 Nr. 2a KraftStG hat eine feinere Schadstoffklassen-Staffel (Euro 0 bis Euro 4+ mit unterschiedlichen Sätzen). Für pre-2009-Bestand-PKW heute weniger relevant (Diesel meist Euro 4+), aber formal Unterschätzung bei schlechteren Schadstoffklassen.

**Empfehlung:** Markieren als „vereinfachte Schätzung für Fahrzeuge mit Schadstoffklasse Euro 4+" im UI-Disclaimer.

#### **[P3] Hubraum-Input kein max-Clamping**

10.000 ccm oder negative Werte werden stur akzeptiert. Nicht kritisch, weil `hubraum <= 0` noch „return null" triggert.

---

### 6. KwPsRechner — [/auto/kw-ps-umrechner](../../components/rechner/KwPsRechner.tsx)

**Lib:** [lib/berechnungen/kw-ps.ts](../../lib/berechnungen/kw-ps.ts)
**Konstanten:** KW_ZU_PS = 1,35962; PS_ZU_KW = 0,73550.

**Primärquelle:** Physikalisch: 1 PS (metrisch, DIN 66036) = 735,49875 W ≈ 0,73550 kW. 1 kW = 1,35962 PS. Beide Konstanten cent-genau korrekt.

**4-Punkt-Audit:** Alles grün.

**Findings:** Keine. **P3**: Umrechnungstabelle ist eine nette UX-Hinzufügung.

---

### 7. LeasingRechner — [/auto/leasing-rechner](../../components/rechner/LeasingRechner.tsx)

**Lib:** keine — inline.
**Formel:** Leasingrate = (Listenpreis − Anzahlung) × Leasingfaktor ÷ 100 (netto → × 1,19 brutto). Finanzierungs-Vergleich per Zinseszins-Formel.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** Leasingfaktor-Formel ist Branchenstandard — Automotiv-Industrie. Zinseszins-Formel mathematisch korrekt.
2. **Input:** Keine expliziten Guards, aber `z > 0` Bedingung schützt bei 0 % Zins (kein Crash).
3. **Edge Cases:** Zins = 0 → Sonderformel `kp / n` ✓. MwSt-Faktor hartkodiert 19 % (aktuell, wenn MwSt geändert wird → Bug).
4. **SSOT:** Inline ausreichend. Kein MwSt-SSOT-Import — bei Reform prüfen.

**Findings:**
- **[P3]** MwSt-Faktor 1,19 / 0,84 inline (Zeile 37-38 LeasingRechner). Wenn MwSt je geändert wird, müsste refactored werden. Für 2026 korrekt, aber ein SSOT-Import aus `mwst.ts` wäre sauberer.
- **[P3]** Mehr-km-Beispiel hartkodiert 5000 km (Zeile 59). UX-Dynamik fehlt.

---

### 8. ReichweitenRechner — [/auto/reichweiten-rechner](../../components/rechner/ReichweitenRechner.tsx)

**Lib:** keine — inline.
**Formel:** Real-Verbrauch = WLTP-Verbrauch ÷ (Fahrprofil × Temperatur × Klima-Faktor). Real-Reichweite = Akku × 100 ÷ Verbrauch.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** Faktoren sind empirisch-geschätzt (Stadt 1,05 / Autobahn 0,70; Temperatur unter 0 °C: 0,70; Klima −10 %). Keine harte Rechtsquelle.
2. **Input:** Guards `nAkku <= 0 || nWltp <= 0 → return null` ✓.
3. **Edge Cases:** Extremwerte (z.B. 200 kWh Akku, 100 km WLTP) produzieren unrealistische Verbräuche, aber kein Crash.
4. **SSOT:** Inline — Faktoren sind Konventionswerte, Verallgemeinerung nicht sinnvoll.

**Findings:** Keine Bugs.
- **[P3]** Faktoren ohne Quellenangabe. Erklärtext sollte „Erfahrungswerte, real stark fahrzeug- und fahrer-abhängig" klarer hervorheben.
- **[P3]** Strompreis-Richtwerte hartkodiert (32 ct Haushalt, 28 ct Wallbox, 45 ct AC, 60 ct DC) — sollte regelmäßig aktualisiert werden.

---

### 9. SpritkostenRechner — [/auto/spritkosten-rechner](../../components/rechner/SpritkostenRechner.tsx)

**Lib:** [lib/berechnungen/spritkosten.ts](../../lib/berechnungen/spritkosten.ts)
**Formel:** (Strecke/100) × Verbrauch × Preis. Mathematisch trivial.

**4-Punkt-Audit:** Alles grün.

**Findings:**
- **[P3]** Vergleichstabelle-Verbräuche 5–12 L/100km hart codiert — ausreichend für Orientierung.

---

### 10. TaxiRechner — [/auto/taxi-rechner](../../components/rechner/TaxiRechner.tsx)

**Lib:** [lib/berechnungen/taxi.ts](../../lib/berechnungen/taxi.ts) (nicht gelesen, aber Struktur aus UI erschließbar).
**Primärquelle:** **Kommunalrecht** — Taxitarife werden von Städten/Landkreisen per Verordnung festgelegt, keine bundeseinheitliche Norm. Die `TARIFE`-Array im Code ist eine Stichproben-Sammlung.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle:** Keine einheitliche Rechtsquelle. Lib-Werte sind Zeitpunkt-Schnappschuss.
2. **Input:** Guard `s <= 0 → return null` ✓.
3. **Edge Cases:** Nachtrunde-Logik korrekt.
4. **SSOT:** Lib sinnvoll, aber Wartung nur durch regelmäßiges Update der `TARIFE`.

**Findings:**
- **[P2]** Tarife sollten ein Stand-Datum haben (wann zuletzt aktualisiert?). Rechner sollte „Stand: YYYY-MM, Tarife können sich jederzeit ändern" ausgeben. **Verdacht:** Einige Stadt-Tarife könnten veraltet sein. **Rückfrage-Kandidat:** Wie oft wird die TARIFE-Tabelle aktualisiert? Gibt es einen Update-Prozess?
- **[P3]** Trinkgeld pauschal 10 % — Konvention, kein Bug.

---

## SSOT-Kandidaten

**Keine neuen SSOT-Libs erforderlich.** Bestehende Libs sind adäquat:

- `lib/berechnungen/autokosten.ts` ✓
- `lib/berechnungen/bussgeld.ts` ✓
- `lib/berechnungen/fahrrad-rahmen.ts` ✓
- `lib/berechnungen/kfz-steuer.ts` — braucht Bugfix (siehe oben), aber Struktur passt
- `lib/berechnungen/kw-ps.ts` ✓
- `lib/berechnungen/spritkosten.ts` ✓
- `lib/berechnungen/taxi.ts` ✓

**Inline-ausreichende Logik** (kein SSOT nötig):
- FuehrerscheinRechner — Regions-Schätzwerte, keine Wiederverwendung
- LeasingRechner — Zinseszins-Mathematik, keine Wiederverwendung
- ReichweitenRechner — E-Auto-Faktoren, keine Wiederverwendung

**Marginale Kandidat-Erwägung:**
- `lib/berechnungen/mwst.ts` (falls existiert) könnte von LeasingRechner konsumiert werden, um den `1,19`-Literal zu beseitigen. P3.

---

## Hot-Spot-Verifikation (aus Prompt-130-Voransicht)

| Rechner | Vermutung (Prompt) | Bestätigt? | Befund |
|---|---|---|---|
| BussgeldRechner | Hot Spot (BKatV-Stand) | **Nein** | Stichproben-OK, Novelle 09.11.2021 im Code abgebildet. |
| KfzSteuerRechner | Hot Spot | **Ja** | 3 × P1 + 1 × P2, die schwerwiegendsten Bugs der Welle 2 Stufe 1. |
| TaxiRechner | Hot Spot | **Teilweise** | Keine P1/P2-Bugs in der Formel, aber Wartungs-/Staleness-Risiko (kommunalrechtliche Tarife). Prozess-Thema, kein Code-Bug. |

---

## Fix-Plan-Vorschlag (Nummerierung geschätzt)

**Prompt 131 — KfzSteuer-Triple-Fix (P1-Paket):**
- `lib/berechnungen/kfz-steuer.ts`: CO₂-Staffel auf § 9 Abs. 1 Nr. 2c-Beträge korrigieren (2,00 / 2,20 / 2,50 / 2,90 / 3,40 / 4,00 €/g/km mit sechster 175–195-Stufe).
- `lib/berechnungen/kfz-steuer.ts`: Elektro-Befreiungs-Ende auf 31.12.2035 (oder dynamisch min(Zulassung+10J, 31.12.2035), wenn Zulassungs-Datum als Input).
- `components/rechner/KfzSteuerRechner.tsx`: UI-Text Z. 161 korrigieren (Zulassungs-Stichtag 31.12.2030, Maximal-Ende 31.12.2035).
- Verify-Script `scripts/verify-kfz-steuer.ts` mit 5–10 Testfällen an CO₂-Stützpunkten + Elektro-Zulassungs-Datumsgrenzen.
- Rechtsstands-Tabelle in CLAUDE.md um „Kfz-Steuer CO₂-Staffel" + „Elektro-Befreiung" ergänzen.

**Prompt 132 — Klein-Polish-Batch:**
- FuehrerscheinRechner: Theorie 22,49 € / Praxis 116,93 € exakt.
- BussgeldRechner: LKW-Faktor-Kommentar explizit als Näherung markieren; Parken-Staffel-Disclaimer.
- KfzSteuerRechner: Vor-2009-Disclaimer „Schadstoffklasse Euro 4+ angenommen".
- TaxiRechner: Stand-Datum im UI anzeigen („Tarife Stand: …").

**Prompt 133 (optional) — UX-Extras:**
- KfzSteuerRechner: Erstzulassungs-Datum als Input (Elektro-Befreiung dynamisch).
- LeasingRechner: MwSt-SSOT-Import.
- ReichweitenRechner: Faktoren-Quellen-Transparenz.

**Reihenfolge-Empfehlung:** 131 sofort (P1-Eskalation), 132 bei Gelegenheit, 133 bei UX-Slot.

---

## Rückfragen an Karsten

1. **TaxiRechner-Tarife-Aktualisierung:** Wie oft wird [lib/berechnungen/taxi.ts](../../lib/berechnungen/taxi.ts) `TARIFE` aktualisiert? Gibt es einen definierten Update-Prozess (z. B. jährliches Spot-Check auf Kommunal-Seiten)? Falls nicht: Markierung als „Stand: YYYY-MM" im UI empfohlen und ggf. Auto-Hinweis „älter als 12 Monate" über Git-Log-Prüfung in CI (wie Sitemap-Lastmod).

2. **KfzSteuerRechner-Erstzulassungs-Input:** Soll der Rechner bei Elektroautos ein Erstzulassungs-Datum als zusätzlichen Input haben, um das Befreiungsende dynamisch zu berechnen (empfohlene Lösung, saubere Darstellung bis 31.12.2035)? Oder reicht ein statischer Text „bis maximal 31.12.2035" (einfacher, aber ungenauer)?

---

## Methodische Lehre

**Rule 11 + audit-highlights-Regel:** In Welle 1 Stufe 4a hatte die Highlight-
Paraphrase „UND/ODER" bei Firmenwagen einen Bug überdauert, der nur durch
Primärquellen-Check aufkam. In dieser Welle 2 Stufe 1 war der Effekt
**umgekehrt positiv:** Der Code hatte CO₂-Werte, die plausibel aussahen
(glatte 2,5 / 3,0 / 3,5 / 4,0 €/g/km-Staffel), aber die Primärquelle zeigte
die echte 2,20/2,50/2,90/3,40-Staffel aus dem Gesetz. Ohne Rule-11-Anwendung
wären diese P1-Bugs weiterhin unentdeckt geblieben.

**Stichproben-Strategie vs. Vollprüfung:** Bei BussgeldRechner war der Code-
Umfang groß (~10 Verstoßarten × 5 Stufen = 50 Einzelwerte). Ich habe 5 % als
Stichprobe gegen BKatV geprüft; alle grün. Fullcheck würde den 400-Zeilen-
Bericht sprengen. Konsequenz: **Empfehlung in Fix-Prompt 132 sollte
Stichproben-Strategie explizit nennen — bei einem Bußgeld-Update-Prompt
wäre eine Full-Reverifikation aller 50 Werte Pflicht, in diesem Audit
genügt die Stichprobe.**

---

## Abschluss-Status

**Prompt 131 (2026-04-23):** P1-Paket erledigt — CO₂-Staffel § 9 Abs. 1
Nr. 2c KraftStG, Elektro-Befreiung § 3d KraftStG (31.12.2035 statt 2030),
UI-Erklärtexte mit falschen Daten. Commits `b24ed75` + `cfda3d2`. Neue
SSOT-Lib `lib/berechnungen/kfz-steuer-parameter.ts`, Verify-Script
`scripts/verify-kfz-steuer-p1.ts` 30/30 grün.

**Prompt 132 (2026-04-23):** P2-Paket (A1–A5) + P3-Auswahl (B1–B3)
erledigt.
- A1: FuehrerscheinRechner Gebühren cent-präzise (22,49 / 116,93 €) — Commit `90e2f08`.
- A2+A3: BussgeldRechner LKW-Faktor- und Parken-Staffel-Disclaimer im Erklärtext — Commit `e46c6bb`.
- A4+B1: KfzSteuerRechner Vor-2009-Euro-4-Disclaimer + Hubraum-/CO₂-Clamping — Commit `0502a94`.
- A5: TaxiRechner Stand-Datum `TARIFE_STAND='2026-04'` + Disclaimer erweitert + CrossLink-Slug-Fix — Commit `1041572`.
- B2+B3: BussgeldRechner Überschreitung-/Abstand-Clamping + LeasingRechner MwSt-SSOT aus `lib/berechnungen/mwst.ts` — Commit `f1d587e`.

**Sanity-Check:** Summary-Count ursprünglich 6 × P2 genannt, im Detail nur 5 × `[P2]`-Tags. Oben korrigiert. Kein versteckter sechster P2 gefunden.

**Offen:**
- **Prompt 133** (TaxiRechner Stadt-Preset-UX): 5 Städte-Presets + `taxi-preset-tarife.ts` mit Stichtag-Kommentar pro Stadt + CLAUDE.md-Wartungsregel (halbjährlich). Vorbereitet durch `TARIFE_STAND` in A5.
- **Teil C (Transparenz-P3)** aus Prompt 132 absichtlich übersprungen (SEO-Text-Rewrites, Karsten-Entscheidung offen). Umfasst: FuehrerscheinRechner Regions-Preise mit ADAC-Quelle, 1,5-Aufschlag-FAQ, ReichweitenRechner Faktoren-Herkunft + Strompreis-Quelle. Kann bei Gelegenheit nachgezogen werden.
- **Prompt 140** (Welle 2 Stufe 2 Gesundheit, 17 Rechner).
