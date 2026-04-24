# Welle 2 Stufe 2 — Gesundheit-Audit

**Stand:** 2026-04-24
**Auditiert:** 17 Rechner (Kategorie Gesundheit)
**Methodik:** 4-Punkt (Formel/Primärquelle, Input-Validierung, Edge Cases, SSOT)
**Kein Code-Change in diesem Prompt** — Fix-Prompts folgen.

| Priorität | Anzahl |
|---|---|
| **P1** (medizinisch kritisch / Sensitivität) | **2** |
| **P2** (ungenau, aber nicht falsch) | **9** |
| **P3** (Dokumentation / Stil) | **7** |

---

## Executive Summary

Das Gesundheits-Portfolio ist insgesamt auf solidem fachlichem Niveau: Formeln und Grenzwerte orientieren sich konsequent an anerkannten Primärquellen (WHO, ESH/DHL, DGE, IOM, National Sleep Foundation, US Navy-KFA, Fitzpatrick-Hauttypen, Widmark-Alkohol, Naegele-Regel). Es gibt keine erfundenen Formeln wie in früheren Steuer-Audits.

**Zwei P1-Findings stechen heraus:**

1. **Kalorien-Rechner: kein Mindestwert für `zielKalorien`** ([lib/berechnungen/kalorien.ts:39](../../lib/berechnungen/kalorien.ts#L39)). Die Config-Seite warnt explizit *"Die tägliche Kalorienaufnahme sollte niemals unter den Grundumsatz fallen"*, aber die Lib liefert bei einer Frau 55 kg / 160 cm / 40 Jahre / sedentär / "abnehmen" durchgerechnet: Grundumsatz 1.189 kcal, Gesamtumsatz 1.427 kcal, **zielKalorien 927 kcal** — genau der Zustand, den die UI warnt. Eating-Disorder-relevant.

2. **BMI: keine Altersgating-Logik für Kinder/Jugendliche** ([components/rechner/BmiRechner.tsx](../../components/rechner/BmiRechner.tsx), [lib/berechnungen/bmi.ts](../../lib/berechnungen/bmi.ts)). Die Config-Prosa sagt *"Für Kinder und Jugendliche gelten andere Referenzwerte"*, aber der Rechner wendet bei alter<18 trotzdem Erwachsenen-WHO-Kategorien an (inkl. „Adipositas Grad III" bei 13-Jährigen). Für Kinder gelten BMI-Perzentilen nach Alter+Geschlecht — der Rechner kann das nicht, sollte aber bei alter<18 eine Hinweisbox einblenden und die Kategorie-Einordnung unterdrücken.

Die übrigen Findings verteilen sich auf Dokumentations-Schärfungen (BMI-Alters-Tabelle als NRC-Konvention, nicht WHO-Standard; PAL-Faktoren sind Harris-Benedict-Tradition, nicht DGE), eine Zeitzonen-Falle in `geburtstermin.ts`, drei SSOT-Kandidaten (BMI-Kategorien werden in `SchwangerschaftGewichtRechner` als Mini-Version dupliziert; `bmi.ts` und `idealgewicht.ts` haben jeweils eigene Alters-BMI-Spanne-Tabelle) und gängige UI-Präzisierungen.

**Wellbeing-Check:** Die Config-Texte sind durchweg sachlich-nüchtern, distanzieren sich explizit vom „perfekten Idealgewicht" und betonen BMI-Limitationen für Sportler/ethnische Gruppen. Kein Shaming-Tonfall festgestellt.

---

## Fix-Prompt-Empfehlung

| Prompt | Titel | Inhalt | Priorität |
|---|---|---|---|
| **141** | Kalorien: Mindest-Klammer + BMI Kinder-Gate | P1.1 (Kalorien-Minimum) + P1.2 (BMI <18) — beide mit klarer UI-Kommunikation | sofort |
| **142** | Blutdruck/Kalorien/Idealgewicht Label-Präzisierung | P2.1–P2.5 Dokumentations-Schärfungen (WHO vs. ESH, PAL-DGE-Abgleich, NRC-Transparenz) | nach 141 |
| **143** | SSOT Konsolidierung (BMI-Kategorien + Alters-BMI-Spanne) | P2.8–P2.9 SSOT aus `bmi.ts` in `SchwangerschaftGewichtRechner` und `idealgewicht.ts` ziehen | nach 142 |
| **144** | P3-Sammelbatch (optional) | Stil/Dokumentation/UX | deferred |

---

## Inventarisierung

| # | Slug | Titel | Lib | Component | Hot Spot? |
|---|---|---|---|---|---|
| 1 | `bmi-rechner` | BMI-Rechner | `bmi.ts` | `BmiRechner.tsx` | **ja** |
| 2 | `raucher-rechner` | Raucher-Rechner | `raucher.ts` | inline | — |
| 3 | `schlaf-rechner` | Schlafrechner | `schlaf.ts` | `SchlafRechner.tsx` | — |
| 4 | `kalorienrechner` | Kalorienrechner | `kalorien.ts` | `KalorienRechner.tsx` | **ja** |
| 5 | `geburtstermin-rechner` | Geburtstermin-Rechner | `geburtstermin.ts` | inline | **ja** |
| 6 | `idealgewicht-rechner` | Idealgewicht-Rechner | `idealgewicht.ts` | `IdealgewichtRechner.tsx` | — |
| 7 | `wasserbedarf-rechner` | Wasserbedarf-Rechner | `wasserbedarf.ts` | `WasserbedarfRechner.tsx` | — |
| 8 | `koerperfett-rechner` | Körperfettrechner | `koerperfett.ts` | `KoerperfettRechner.tsx` | — |
| 9 | `ssw-rechner` | SSW-Rechner | `ssw.ts` | inline | — |
| 10 | `schwangerschaft-gewicht-rechner` | Gewichtszunahme | inline in Component | `SchwangerschaftGewichtRechner.tsx` | — |
| 11 | `zyklusrechner` | Zyklusrechner | inline in Component | `ZyklusRechner.tsx` | — |
| 12 | `alkohol-abbau-rechner` | Alkohol-Abbau | inline in Component | `AlkoholAbbauRechner.tsx` | — |
| 13 | `protein-rechner` | Protein-Rechner | inline in Component | `ProteinRechner.tsx` | — |
| 14 | `whr-rechner` | WHR-Rechner | `whr.ts` | `WhrRechner.tsx` | — |
| 15 | `blutdruck-rechner` | Blutdruck-Rechner | `blutdruck.ts` | `BlutdruckRechner.tsx` | **ja** |
| 16 | `schritte-rechner` | Schritte-Rechner | `schritte.ts` | inline | — |
| 17 | `sonnenschutz-rechner` | Sonnenschutz-Rechner | `sonnenschutz.ts` | inline | — |

---

## Detail je Rechner

### 1. BMI-Rechner (`bmi-rechner`)

**Dateien:** [`lib/berechnungen/bmi.ts`](../../lib/berechnungen/bmi.ts), [`components/rechner/BmiRechner.tsx`](../../components/rechner/BmiRechner.tsx), [`lib/rechner-config/gesundheit.ts:5`](../../lib/rechner-config/gesundheit.ts#L5)

**1. Formel / Primärquelle**
- `bmi = gewicht / (groesse/100)²` ✅ korrekt (Quetelet, 1832)
- WHO-Kategorien (18,5 / 25 / 30 / 35 / 40) ✅ korrekt (WHO Fact Sheet 2024)
- Grenzbehandlung: `bmi >= k.min && bmi < k.max` → BMI=25,0 fällt in Übergewicht (≥25), entspricht WHO-Konvention ✅
- Alters-adjustierter „optimaler Bereich" (`getOptimalerBereich` bmi.ts:33) aus **NRC 1989 / DGE-Tabelle**, nicht WHO-Empfehlung (WHO hält für alle Erwachsenen 18,5–24,9) ⚠️

**2. Input-Validierung**
- Gewicht/Größe ≤ 0 → `null` ✅
- Keine Obergrenze: BMI bei 500 kg / 20 cm wird gerechnet — Ergebnis irreal, aber nicht gefährlich
- Alter optional ✅

**3. Edge Cases**
- **Kinder/Jugendliche:** keine Alters-Gating-Logik. Bei alter=10 wird der WHO-Erwachsenen-Kategorie-Bereich angezeigt. Die Config-Prosa erklärt korrekt, dass für Kinder BMI-Perzentilen gelten, aber die UI tut das nicht.
- Geschlecht `BmiEingabe.geschlecht` wird nie für die Berechnung genutzt (bmi.ts:5, :44) — tote Eingabe

**4. SSOT**
- `bmiKategorien` exportiert ✓
- **Duplizierte Mini-BMI-Klassifikation** in [components/rechner/SchwangerschaftGewichtRechner.tsx:35](../../components/rechner/SchwangerschaftGewichtRechner.tsx#L35) (`getKat` mit eigenen Schwellen)
- **Parallele Alters-BMI-Spanne** in [lib/berechnungen/idealgewicht.ts:31](../../lib/berechnungen/idealgewicht.ts#L31) (`getAltersBmiSpanne`)

**Findings:**
- **P1 (Sensibilität): Kein Alters-Gate für <18-Jährige.** Der Rechner gibt bei 12-jährigen Kindern „Adipositas Grad III"-Einordnung aus. Erwachsenen-WHO-Grenzwerte dürfen hier nicht angewendet werden. Fix: alter<18 → UI-Banner „Für Kinder und Jugendliche gelten BMI-Perzentilen nach Alter und Geschlecht — bitte Kinderärzt:in konsultieren", Kategorie-Einordnung unterdrücken, nur BMI-Wert anzeigen.
- **P2: Alters-adjustierte Optimal-Tabelle als NRC-Konvention kennzeichnen.** Config-Prosa [gesundheit.ts:45](../../lib/rechner-config/gesundheit.ts#L45) und [:411](../../lib/rechner-config/gesundheit.ts#L411) suggeriert medizinisch fundierte Abstufung. Tatsächlich NRC 1989 (National Research Council). Präzisieren: „Die altersadjustierte Spanne folgt NRC-Konvention, WHO hält für alle Erwachsenen 18,5–24,9."
- **P3: Toter Input `geschlecht`** — sollte aus Interface entfernt oder für zukünftige BMI-Varianten (etwa geschlechtsspezifische Fett-Schätzung) genutzt werden.

---

### 2. Raucher-Rechner (`raucher-rechner`)

**Dateien:** [`lib/berechnungen/raucher.ts`](../../lib/berechnungen/raucher.ts), inline in Component, [`lib/rechner-config/gesundheit.ts:81`](../../lib/rechner-config/gesundheit.ts#L81)

**1. Formel / Primärquelle** — Kein medizinischer Rechner, reine Kostenberechnung mit Zinseszins (5 % p. a.). Kosten/Monat = Tag×30,44 ✓ (arithm. Durchschnitt), Kosten/Jahr = Tag×365,25 ✓, FV = PMT × ((1+r)^n − 1) / r ✓ Standard-Annuitätenformel.

**2. Input-Validierung** — Keine Null-Prüfung; bei Packungen=0 NaN. Component sollte clampen.

**3. Edge Cases** — `kostenGesamt` kann bei jahreGeraucht=0 = 0 werden, dann `anzahlUrlaube`/`anzahlIphones` = 0 → Vergleichs-Sätze funktionieren. OK.

**4. SSOT** — Konstanten (URLAUB_PREIS 2000, IPHONE_PREIS 1200, RENDITE 0.05) hartkodiert; passt (projekt-spezifische Didaktik, keine externe Quelle).

**Findings:**
- **P3:** Konstanten-Preise (iPhone 1200 €, Urlaub 2000 €) altern — jährliches Audit-Review einplanen. Kein Fix nötig.

---

### 3. Schlaf-Rechner (`schlaf-rechner`)

**Dateien:** [`lib/berechnungen/schlaf.ts`](../../lib/berechnungen/schlaf.ts), [`components/rechner/SchlafRechner.tsx`](../../components/rechner/SchlafRechner.tsx), [`lib/rechner-config/gesundheit.ts:135`](../../lib/rechner-config/gesundheit.ts#L135)

**1. Formel / Primärquelle**
- 90-min-Schlafzyklus ✅ (Feinberg-Modell, aber nur Mittelwert — reale Zyklen 70–120 min)
- Empfohlene Schlafdauer nach Alter ✅ **National Sleep Foundation 2015** (Hirshkowitz et al., Sleep Health 1:40–43)
- Formel „Ins-Bett-Gehen = Aufwachzeit − (Zyklen × 90 + Einschlaf-Min)" ✅

**2. Input-Validierung** — `alter <= 0` fängt den Fall „Erwachsene" als Default ✓

**3. Edge Cases** — Zeitumstellung/Datumswechsel („21:00 einschlafen, 06:00 aufwachen" Überschreiten Mitternacht) korrekt behandelt via `if (zielMin < 0) zielMin += 24*60` ✓

**4. SSOT** — `getEmpfohleneSchlafdauer` exportiert ✓ (könnte in anderen Kontexten wiederverwendet werden)

**Findings:**
- **P3:** Die 90-min-Zyklus-Vereinfachung ist didaktisch hilfreich, aber im wissenschaftlichen Sinn nur Mittelwert. Keine Quelle im Config-Text — könnte auf *„Stages of Sleep, National Institute of Health"* verweisen.

---

### 4. Kalorien-Rechner (`kalorienrechner`) 🔥 Hot Spot

**Dateien:** [`lib/berechnungen/kalorien.ts`](../../lib/berechnungen/kalorien.ts), [`components/rechner/KalorienRechner.tsx`](../../components/rechner/KalorienRechner.tsx), [`lib/rechner-config/gesundheit.ts:222`](../../lib/rechner-config/gesundheit.ts#L222)

**1. Formel / Primärquelle**
- **Mifflin-St Jeor (1990)** ✅ korrekt (`10×kg + 6,25×cm − 5×alter + 5 (m) / −161 (f)`)
- PubMed-Referenz: Mifflin MD et al., Am J Clin Nutr 1990;51:241–247
- PAL-Faktoren 1,2 / 1,375 / 1,55 / 1,725 / 1,9 — das sind **Harris-Benedict-PAL** (aus Fitness-Tradition), nicht DGE (die verwendet 1,4 / 1,6 / 1,8 / 2,0 / 2,2–2,4). Config suggeriert DGE-Konformität.
- Kaloriendefizit −500 kcal (Abnehmen) ✅ („3.500 kcal ≈ 0,45 kg Fett"-Heuristik)
- Kalorienüberschuss +300 kcal (Zunehmen) ✓ (für Muskelaufbau moderat)
- Makro-Split 30/45/25 ✓ (leicht proteinlastig, noch DGE-kompatibel: DGE = 50–55 KH / 30 F / 10–20 P)

**2. Input-Validierung** — Alter/Größe/Gewicht ≤ 0 → `null` ✓. Keine Obergrenze.

**3. Edge Cases**
- **⚠️ `zielKalorien` kann unter Grundumsatz und sogar unter klinisches Minimum fallen.** Durchgerechnet:
  - Frau, 55 kg, 160 cm, 40 Jahre, Aktivität 1,2, Ziel „abnehmen":
    - Grundumsatz = 10·55 + 6,25·160 − 5·40 − 161 = **1.189 kcal**
    - Gesamtumsatz = 1.189 × 1,2 = **1.427 kcal**
    - zielKalorien = 1.427 − 500 = **927 kcal** ← unter Grundumsatz + unter 1.200 kcal-Minimum

**4. SSOT** — PAL-Faktoren liegen in der Component-Konstante, nicht in der Lib. Akzeptabel, aber ein Refactor nach `lib/berechnungen/pal.ts` o. ä. wäre möglich.

**Findings:**
- **P1 (Sensibilität): Keine Mindestwert-Klammer für `zielKalorien`.** Die Config-Prosa [gesundheit.ts:251](../../lib/rechner-config/gesundheit.ts#L251) sagt *„niemals unter den Grundumsatz fallen"* — die Lib setzt das nicht um. Fix: `zielKalorien = Math.max(zielKalorien, Grundumsatz)` mit UI-Hinweis, wenn die Klammer greift, oder festes Minimum (1.200 kcal für Frauen, 1.500 kcal für Männer — NHS/BfR-Richtwert). **Eating-Disorder-Sensibilität** — Prio: sofort.
- **P2: PAL-Faktoren als Harris-Benedict-Tradition kennzeichnen.** Die Config-Prosa nennt DGE-Bezug, die tatsächlich verwendeten Zahlen stammen aus Fitness-Lehrbüchern. Entweder auf DGE-Werte umstellen (1,4–2,2) oder Prosa präzisieren („Aktivitätsfaktor nach Harris-Benedict-Tradition").
- **P2: Proteinverteilung 30 %** ist leicht proteinlastig. DGE-Standard ist 10–20 %. Für Ziel-basierte Abnehm-/Aufbau-Strategien akzeptabel, aber Config sollte das deutlicher machen (*„proteinbetonte Verteilung"*).

---

### 5. Geburtstermin-Rechner (`geburtstermin-rechner`) 🔥 Hot Spot

**Dateien:** [`lib/berechnungen/geburtstermin.ts`](../../lib/berechnungen/geburtstermin.ts), inline Component, [`lib/rechner-config/gesundheit.ts:286`](../../lib/rechner-config/gesundheit.ts#L286)

**1. Formel / Primärquelle**
- **Naegele-Regel:** LMP + 280 Tage ✅ (Franz Naegele 1812, Standard-Gynäkologie)
- **Erweiterte Naegele-Regel** für abweichende Zykluslänge: LMP + (zyklus − 28) + 280 ✅
- Empfängnis-Methode: Empfängnis − 14 Tage = LMP ✅
- Ultraschall-Methode: Ultraschall-Datum − (SSW×7 + Tage) = LMP ✅
- Mutterschutz: 6 Wochen vor ET / 8 Wochen danach ✅ ([§ 3 MuSchG](https://www.gesetze-im-internet.de/muschg_2018/__3.html))
- Trimester-Grenzen 1./12. bzw. 2./13.–27. SSW ✅ (ACOG, DGGG)

**2. Input-Validierung** — Leere Felder → `null` ✓

**3. Edge Cases**
- **⚠️ Zeitzonen-Falle:** `new Date(eingabe.periodeDatum)` interpretiert Date-String als **UTC**, während `heute` lokal ist. Bei negativer Zeitzone kann SSW um ±1 Tag driften. `ssw.ts:103` macht das korrekt via `parseDatum(s + 'T00:00:00')`, `geburtstermin.ts` nicht.
- Terminüberschreitung `aktuelleSSW >= 42` ✓
- Meilenstein-Flags `aktiv/vergangen` korrekt gerastert

**4. SSOT**
- `geburtstermin.ts` und `ssw.ts` haben überlappende Logik (Naegele-Regel + Trimester + SSW-Berechnung) — redundant, aber mit leicht unterschiedlicher Semantik. Keine Drift festgestellt, aber SSOT-Kandidat: beide in eine gemeinsame `lib/berechnungen/schwangerschaft.ts` auslagern.

**Findings:**
- **P2: Zeitzonen-Behandlung in `geburtstermin.ts` angleichen.** `new Date(string)` durch `new Date(string + 'T00:00:00')` ersetzen, analog zu `ssw.ts:103`. Ohne Fix kann die SSW-Anzeige in UTC-Zonen ein Tag früher/später landen.
- **P3: SSOT-Konsolidierung `geburtstermin.ts` + `ssw.ts`** — separate Libs mit überlappender Naegele-Logik. Kein Bug, aber unschön.

---

### 6. Idealgewicht-Rechner (`idealgewicht-rechner`)

**Dateien:** [`lib/berechnungen/idealgewicht.ts`](../../lib/berechnungen/idealgewicht.ts), [`components/rechner/IdealgewichtRechner.tsx`](../../components/rechner/IdealgewichtRechner.tsx), [`lib/rechner-config/gesundheit.ts:378`](../../lib/rechner-config/gesundheit.ts#L378)

**1. Formel / Primärquelle**
- **Broca** (1871): (cm − 100) × 0,9 (m) / 0,85 (f) ✅
- **Creff:** ((cm − 100) + Alter/10) × 0,9 × Körperbau-Koeff ✅ (französische ernährungsmed. Literatur, keine WHO-Referenz)
- BMI-basierte Spanne mit Alters-Adjustierung — dieselbe NRC-1989-Tabelle wie in `bmi.ts` (leicht abweichend: dort `getOptimalerBereich` mit 18.5/24.9 als Startbereich, hier `getAltersBmiSpanne` mit 19/24)

**2. Input-Validierung** — Alter/Größe/Gewicht ≤ 0 → `null` ✓

**3. Edge Cases**
- Geschlecht wird nur für Broca-Faktor genutzt ✓
- BMI-Spanne in kleinen Größen (z. B. 140 cm) liefert 37,2–47,0 kg — mathematisch korrekt, aber bei sehr kleinen Erwachsenen untypisch.

**4. SSOT**
- **Getrennte Alters-BMI-Tabellen** in `bmi.ts` (`getOptimalerBereich`) und `idealgewicht.ts` (`getAltersBmiSpanne`) — numerisch leicht abweichend. Eine gemeinsame Lib `lib/berechnungen/bmi-alter.ts` wäre sauberer.

**Findings:**
- **P2: Alters-BMI-Spanne zwischen `bmi.ts` und `idealgewicht.ts` konsolidieren.** Bei künftigen Änderungen an der NRC-Tabelle droht Drift.
- **P3: Config-Prosa „BMI-basiert ist medizinisch am aussagekräftigsten"** [gesundheit.ts:407](../../lib/rechner-config/gesundheit.ts#L407) etwas stark formuliert — auch BMI ist nur Screening, nicht diagnostisch. Gut wäre: *„gilt als die medizinisch am besten untermauerte Screening-Methode"*.

---

### 7. Wasserbedarf-Rechner (`wasserbedarf-rechner`)

**Dateien:** [`lib/berechnungen/wasserbedarf.ts`](../../lib/berechnungen/wasserbedarf.ts), [`components/rechner/WasserbedarfRechner.tsx`](../../components/rechner/WasserbedarfRechner.tsx), [`lib/rechner-config/gesundheit.ts:454`](../../lib/rechner-config/gesundheit.ts#L454)

**1. Formel / Primärquelle**
- Basisbedarf 30–50 ml/kg nach Aktivitätslevel ✓ (**DGE Referenzwert: 30–35 ml/kg**, entspricht 1,5 l bei 50-kg-Person)
- Sport-Zuschlag 350 ml / 30 min ✓ (**ACSM: 400–800 ml/h** — 350/30min = 700 ml/h im oberen Bereich)
- Hitze-Zuschlag +500 ml ✓ plausibel
- Schwanger +300 / Stillend +700 ml ✅ **DGE-Referenzwert**

**2. Input-Validierung** — `gewicht <= 0` → `null` ✓. Kein Max-Clamping (fühlt sich harmlos an).

**3. Edge Cases**
- „Extrem aktiv"-Faktor 50 ml/kg ist oberer Rand; bei 100 kg = 5 l Basisbedarf — mit Sport/Hitze/Stillen kann Summe 7+ l werden. Rein rechnerisch ok, medizinisch sollten >3,5 l/d hinterfragt werden (Hyponatriämie-Risiko).

**4. SSOT** — Konstanten in Lib ✓

**Findings:**
- **P3:** Bei `gesamtMl > 4000` könnte UI-Hinweis eingeblendet werden („Bei mehr als 3–4 l/d ärztlich abklären — Risiko Hyponatriämie").

---

### 8. Körperfett-Rechner (`koerperfett-rechner`)

**Dateien:** [`lib/berechnungen/koerperfett.ts`](../../lib/berechnungen/koerperfett.ts), [`components/rechner/KoerperfettRechner.tsx`](../../components/rechner/KoerperfettRechner.tsx), [`lib/rechner-config/gesundheit.ts:518`](../../lib/rechner-config/gesundheit.ts#L518)

**1. Formel / Primärquelle**
- **US Navy KFA-Formel** (Hodgdon & Beckett 1984) ✅
  - Mann: 495 / (1,0324 − 0,19077·log₁₀(Bauch−Hals) + 0,15456·log₁₀(Größe)) − 450 ✓
  - Frau: 495 / (1,29579 − 0,35004·log₁₀(Bauch+Hüfte−Hals) + 0,22100·log₁₀(Größe)) − 450 ✓
- Kategorien („Essentiell / Athletisch / Fitness / Durchschnittlich / Übergewichtig") ✅ **American Council on Exercise (ACE)**

**2. Input-Validierung** — Umfänge ≤ 0 → `null` ✓; Plausibilitätsclamping 1–60 % ✓

**3. Edge Cases**
- Bei extrem asymmetrischen Eingaben (Bauch < Hals → log₁₀(negativ)) wird vorab `null` zurückgegeben ✓
- Durchschnitts-KFA-Tabelle linear interpoliert 20–70 Jahre — außerhalb auf Grenzwerte geclampt ✓

**4. SSOT** — Kategorien in Lib ✓

**Findings:**
- **P3:** Kategorie-Labels „Essentielles Fett" bei 2–5 % (m) / 10–13 % (f) — sehr niedrig, medizinisch kritisch. UI könnte bei dieser Kategorie Warnhinweis einblenden (Hormonstörungen, Leistungssport-Grenze).

---

### 9. SSW-Rechner (`ssw-rechner`)

**Dateien:** [`lib/berechnungen/ssw.ts`](../../lib/berechnungen/ssw.ts), inline Component, [`lib/rechner-config/gesundheit.ts:572`](../../lib/rechner-config/gesundheit.ts#L572)

**1. Formel / Primärquelle**
- Naegele ✅ (wie `geburtstermin.ts`)
- Größenvergleich-Tabelle SSW 4–40: ACOG/BabyCenter-Standard ✓ (keine direkte medizinische Quelle, didaktisch)
- Vorsorge-Termine ✅ ([Mutterschaftsrichtlinien G-BA](https://www.g-ba.de/richtlinien/19/))

**2. Input-Validierung** — Zeitparser `parseDatum` wirft `NaN`-Guard ✓

**3. Edge Cases**
- Zukunftsdatum → `valid: false, fehler: "Datum in der Zukunft"` ✓
- Zeitzonen-safe durch `+'T00:00:00'` ✓ (vorbildlich im Vergleich zu `geburtstermin.ts`)

**4. SSOT** — siehe Geburtstermin-Kommentar zu SSOT-Konsolidierung

**Findings:**
- **P3: Mit `geburtstermin.ts` konsolidieren** (siehe Rechner 5).

---

### 10. Schwangerschafts-Gewicht (`schwangerschaft-gewicht-rechner`)

**Dateien:** inline [`components/rechner/SchwangerschaftGewichtRechner.tsx`](../../components/rechner/SchwangerschaftGewichtRechner.tsx), [`lib/rechner-config/gesundheit.ts:634`](../../lib/rechner-config/gesundheit.ts#L634)

**1. Formel / Primärquelle**
- **IOM 2009 Empfehlungen** (Institute of Medicine, „Weight Gain During Pregnancy: Reexamining the Guidelines") ✅ alle Werte korrekt
  - Einling Untergewicht 12,5–18 kg / Normal 11,5–16 / Übergewicht 7–11,5 / Adipös 5–9 ✓
  - Zwillinge Normal 17–25 / Übergewicht 14–23 / Adipös 11–19 ✓ (Zwillinge-Unter 22–28 ist extrapoliert, IOM gibt für Untergewicht bei Zwillingen keinen offiziellen Bereich an, das ist konservativer Fachkonsens)
- Berechnung erwartete Zunahme: linear interpoliert bis SSW 12 = 0,5–2,0 kg, danach +wochenRange × wochen ✓

**2. Input-Validierung** — `Math.min(42, parseDeutscheZahl(ssw))` clampt SSW ✓

**3. Edge Cases** — Aktuelles Gewicht < Vor-Gewicht → negative Zunahme, korrekt als „unter Bereich" gezeigt ✓

**4. SSOT**
- **Duplizierte BMI-Kategorisierung** (`getKat`, Zeilen 35–40) mit eigenen Schwellen statt Import aus `bmi.ts`

**Findings:**
- **P2: BMI-Kategorisierung aus `bmi.ts` importieren.** `getKat(bmi: number): BmiKat` sollte `bmiKategorien.find()` aus zentraler Lib nutzen. Momentan abweichende Label (`unter`/`normal`/`ueber`/`adipos` statt WHO-Standard).

---

### 11. Zyklus-Rechner (`zyklusrechner`)

**Dateien:** inline [`components/rechner/ZyklusRechner.tsx`](../../components/rechner/ZyklusRechner.tsx), [`lib/rechner-config/gesundheit.ts:724`](../../lib/rechner-config/gesundheit.ts#L724)

**1. Formel / Primärquelle**
- Eisprung = Periodenbeginn + (Zykluslänge − 14) ✅ (Luteal-Phase konstant 14 Tage)
- Fruchtbares Fenster: Eisprung − 5 Tage bis Eisprung + 1 Tag ✓ (ACOG: 5–6 Tage vor Eisprung + 24h danach)
- Perioden-Länge pauschal 5 Tage (hartkodiert Z. 81 `addDays(z.periodenBeginn, 4)`)

**2. Input-Validierung** — Zykluslänge auf 21–35 geclampt (`Math.max(21, Math.min(35, ...))`) ✓ (kürzere/längere Zyklen sind medizinisch auffällig → Arzt)

**3. Edge Cases** — Zukunftsdatum wird akzeptiert und rendert Vorhersage nach vorn ✓

**4. SSOT** — Zyklus-Logik inline, keine Lib. Für einen Rechner akzeptabel, aber falls SSW-Rechner o. ä. Eisprung-Logik bräuchten: SSOT-Kandidat.

**Findings:**
- **P3: Perioden-Länge hartkodiert.** Einige Frauen haben 2–7 Tage. Optional als Eingabefeld, default 5.
- **P3: Hinweis „keine Verhütungs-Ersatz"** fehlt im UI (im Config-Text vorhanden). Bei Fruchtbarkeits-Rechnern ist das üblich.

---

### 12. Alkohol-Abbau-Rechner (`alkohol-abbau-rechner`)

**Dateien:** inline [`components/rechner/AlkoholAbbauRechner.tsx`](../../components/rechner/AlkoholAbbauRechner.tsx), [`lib/rechner-config/gesundheit.ts:786`](../../lib/rechner-config/gesundheit.ts#L786)

**1. Formel / Primärquelle**
- **Widmark-Formel** (1932): Promille = Alkoholgramm / (Gewicht × r) × 0,9 ✅ (BGH-Standard für Verkehrsrecht)
- r = 0,68 (m) / 0,55 (f) ✅ (Widmark-Konstanten, Watson/Forrest wäre genauer, aber juristisch nicht etabliert)
- 0,9-Faktor = **10 % Resorptionsdefizit** ✓
- Abbaurate 0,15 ‰/h ✓ (BGH-Spanne 0,1–0,2, Mittelwert 0,15)

**2. Input-Validierung** — `Math.max(1, parseDeutscheZahl(gewicht) || 80)` ✓

**3. Edge Cases** — Eigene Angabe (ml+vol) möglich ✓

**4. SSOT** — Getränke-Konstanten inline, keine Lib. Für den einen Rechner akzeptabel.

**Findings:**
- **P3:** Formel und Konstanten sind etabliert, nur der juristische Kontext („0,5-Promille-Grenze", „absolute Fahruntüchtigkeit 1,1 ‰") ließe sich noch explizit im UI zeigen.

---

### 13. Protein-Rechner (`protein-rechner`)

**Dateien:** inline [`components/rechner/ProteinRechner.tsx`](../../components/rechner/ProteinRechner.tsx), [`lib/rechner-config/gesundheit.ts:863`](../../lib/rechner-config/gesundheit.ts#L863)

**1. Formel / Primärquelle**
- Proteinbedarf g/kg Körpergewicht × Aktivitätsfaktor (0,8–2,0) + Ziel-Zuschlag (0 / 0,2 / 0,3) ✓
- **DGE-Empfehlung:** 0,8 g/kg Minimum ([DGE-Referenzwerte](https://www.dge.de/wissenschaft/referenzwerte/protein/)) ✅ UI hat diesen Hinweis [ProteinRechner.tsx:174](../../components/rechner/ProteinRechner.tsx#L174)
- **Obergrenze 2,0 g/kg** „unbedenklich bei gesunden Nieren" ✓ ([ISSN 2017](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8))

**2. Input-Validierung** — Gewicht parsed, bei ≤0 kein Ergebnis ✓; Mahlzeiten 3–5 geclampt ✓

**3. Edge Cases** — Faktor „intensiv + abnehmen" = 2,0 + 0,3 = 2,3 g/kg → leicht über 2,0. Nierenhinweis im UI ✓

**4. SSOT** — Konstanten inline ✓

**Findings:**
- **P3:** Alles im grünen Bereich, Nierenhinweis vorhanden.

---

### 14. WHR-Rechner (`whr-rechner`)

**Dateien:** [`lib/berechnungen/whr.ts`](../../lib/berechnungen/whr.ts), [`components/rechner/WhrRechner.tsx`](../../components/rechner/WhrRechner.tsx), [`lib/rechner-config/gesundheit.ts:933`](../../lib/rechner-config/gesundheit.ts#L933)

**1. Formel / Primärquelle**
- WHR = Taille / Hüfte ✅
- **WHO-Grenzen:** Frau ≥0,85 / Mann ≥0,90 = erhöhtes Risiko ✅ ([WHO 2008 Report](https://www.who.int/publications/i/item/9789241501491))
- WHtR = Taille / Größe; <0,5 optimal ✅ (Ashwell 2014)
- Zwischenstufe „moderat" (Frau 0,80–0,84 / Mann 0,90–0,99) — WHO nennt diese Stufe nicht offiziell, NIH/AHA tun's aber

**2. Input-Validierung** — `e.hueftumfangCm > 0` als Divisions-Guard ✓

**3. Edge Cases** — WHR kann theoretisch >1 sein → korrekt als „erhoeht" ✓

**4. SSOT** — Grenzwerte in Lib ✓

**Findings:**
- **P3: „moderat"-Zwischenstufe als NIH/AHA-Konvention kennzeichnen** — WHO kennt nur 2 Stufen (unter/über).

---

### 15. Blutdruck-Rechner (`blutdruck-rechner`) 🔥 Hot Spot

**Dateien:** [`lib/berechnungen/blutdruck.ts`](../../lib/berechnungen/blutdruck.ts), [`components/rechner/BlutdruckRechner.tsx`](../../components/rechner/BlutdruckRechner.tsx), [`lib/rechner-config/gesundheit.ts:1007`](../../lib/rechner-config/gesundheit.ts#L1007)

**1. Formel / Primärquelle**
- **ESH/ESC 2018 + ESH 2023 Klassifikation** (6 Kategorien) ✅ — identisch zur Deutschen Hochdruckliga (DHL)
  - Optimal <120/<80 ✓
  - Normal 120–129/80–84 ✓
  - Hochnormal 130–139/85–89 ✓
  - Grad 1 140–159/90–99 ✓
  - Grad 2 160–179/100–109 ✓
  - Grad 3 ≥180/≥110 ✓
- Höherer-Grad-Regel („the higher category shall apply") ✅
- Isolierte systolische Hypertonie (sys≥140, dia<90) ✅ korrekt erkannt
- MAD = dia + (sys−dia)/3 ✅ Standard-Näherung

**Hinweis:** Die **ESC 2024 Guidelines** ([aktuelle Fassung](https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/2024-Guidelines-for-the-Management-of-Elevated-Blood-Pressure-and-Hypertension)) haben ein neues Schema („Non-elevated / Elevated / Hypertension") eingeführt. Für deutsche Zielgruppe bleibt die **DHL/ESH 2023-Klassifikation Referenzstandard**. ✅

Config-Prosa nennt aber „WHO und ESH" — **WHO/ISH 2020 hat nur 4 Stufen**, nicht 6. Die im Code verwendete Klassifikation ist ESH, nicht WHO.

**2. Input-Validierung** — `systolisch > diastolisch` wird als Validitätsfilter genutzt (`blutdruck.ts:56`). Messfehler werden still verworfen.

**3. Edge Cases**
- Leere Messungen → `null` ✓
- `valid.length === 0` → `null` ✓
- Grenzwert exakt auf Schwelle (sys=140, dia=85) → Grad 1 (sys-Match) ✓

**4. SSOT** — `KLASSIFIKATIONEN` in Lib ✓

**Findings:**
- **P2: Config-Prosa „WHO und ESH" korrigieren.** Die 6-Kategorien-Klassifikation stammt von ESH/ESC, nicht WHO. Config-Text [gesundheit.ts:1024](../../lib/rechner-config/gesundheit.ts#L1024) auf „ESH (Deutsche Hochdruckliga)" umstellen.
- **P3: Stille Validitätsfilter `systolisch > diastolisch`** — bei fehlerhaften Eingaben (sys=90, dia=110 versehentlich getauscht) gibt der Rechner `null`. Könnte UI-Hinweis werfen: *„Diastolischer Wert höher als systolischer — Werte vertauscht?"*
- **P3: ESC 2024-Update erwähnen** im Config-Text: die neuere Klassifikation existiert, die DHL bleibt aber beim 6-Kategorien-Schema.

---

### 16. Schritte-Rechner (`schritte-rechner`)

**Dateien:** [`lib/berechnungen/schritte.ts`](../../lib/berechnungen/schritte.ts), inline Component, [`lib/rechner-config/gesundheit.ts:1074`](../../lib/rechner-config/gesundheit.ts#L1074)

**1. Formel / Primärquelle**
- Schrittlänge = Körpergröße × 0,415 ✓ (verbreitete Faustregel, genderneutral — Männer eher 0,415, Frauen 0,413, hier gemittelt)
- Kalorien = Distanz_km × Gewicht_kg × 0,9 ✓ (sehr grobe Näherung, besser wäre MET-basiert)
- Tagesziel 10.000 Schritte — historisch aus japanischem Schrittzähler-Marketing 1965 (Yamasa Manpo-kei), keine medizinische Quelle, aber weit verbreitet

**2. Input-Validierung** — ≤0 → `null` ✓

**3. Edge Cases** — Geschwindigkeit fällt auf 5 km/h zurück bei ungültigem Wert ✓

**4. SSOT** — Konstanten inline, OK für diesen Rechner

**Findings:**
- **P3: 10.000-Schritte-Ziel** als „verbreitete Faustregel, kein wissenschaftlich belegter Schwellenwert" kennzeichnen — neuere Studien (Paluch 2022, JAMA) zeigen Gesundheitsvorteile bereits ab 4.000–7.000 Schritten.

---

### 17. Sonnenschutz-Rechner (`sonnenschutz-rechner`)

**Dateien:** [`lib/berechnungen/sonnenschutz.ts`](../../lib/berechnungen/sonnenschutz.ts), inline Component, [`lib/rechner-config/gesundheit.ts:1142`](../../lib/rechner-config/gesundheit.ts#L1142)

**1. Formel / Primärquelle**
- **Fitzpatrick-Hauttypen I–VI** ✅ (Fitzpatrick TB, Arch Dermatol 1988;124:869)
- Eigenschutzzeit-Tabelle (5–10 / 10–20 / 20–30 / 30–45 / 60 / 90 min bei UV 3) ✓ **DKFZ/Bundesamt für Strahlenschutz (BfS)**
- Geschützte Zeit = Eigenschutz × LSF × 0,6 ✓ **60 %-Sicherheitsabzug** — **DKFZ/ADP-Empfehlung** (American Academy of Dermatology)
- Nachcremen nach halber Zeit ✓ Standard

**2. Input-Validierung** — `lsf < 1` → `null` ✓

**3. Edge Cases** — Hauttyp V/VI haben nur einen Wert (60/90), keine Spanne. OK.

**4. SSOT** — Konstanten exportiert ✓

**Findings:**
- **P3:** Alles fachlich solide. Evtl. UI-Hinweis, dass Sonnenbrandgefahr trotz Schutzzeit besteht (LSF nicht = Freifahrtschein).

---

## Zusammenfassung P1/P2/P3

### P1 (sofort fixen — Prompt 141)
- **P1.1 Kalorien:** `zielKalorien` kann unter Grundumsatz/Minimum fallen → Klammer setzen ([lib/berechnungen/kalorien.ts:39](../../lib/berechnungen/kalorien.ts#L39))
- **P1.2 BMI:** kein Alters-Gate für <18-Jährige → UI-Banner + Kategorie-Unterdrückung ([components/rechner/BmiRechner.tsx](../../components/rechner/BmiRechner.tsx))

### P2 (Prompt 142 Label-Präzisierung + Prompt 143 SSOT)
- **P2.1 BMI-Prosa:** Alters-adjustierter Optimalbereich als NRC 1989 kennzeichnen, nicht als WHO-Standard
- **P2.2 Kalorien:** PAL-Faktoren als Harris-Benedict-Tradition deklarieren (DGE-Werte weichen ab)
- **P2.3 Kalorien:** Makro-Split 30/45/25 als „proteinbetonte Verteilung" statt als neutrale Standard-Aufteilung
- **P2.4 Geburtstermin:** Zeitzonen-sichere Datums-Parser via `+'T00:00:00'` (analog `ssw.ts`)
- **P2.5 Blutdruck:** Config-Prosa „WHO und ESH" auf „ESH/DHL" korrigieren
- **P2.6 Schwangerschaft-Gewicht:** BMI-Kategorien aus `bmi.ts` importieren statt duplizieren
- **P2.7 Idealgewicht vs. BMI:** Alters-BMI-Tabelle konsolidieren (getOptimalerBereich vs. getAltersBmiSpanne)
- **P2.8 Geburtstermin + SSW** zu gemeinsamer Schwangerschafts-Lib konsolidieren
- **P2.9 Idealgewicht-Prosa:** „BMI-basiert am aussagekräftigsten" entschärfen

### P3 (deferred / optional — Prompt 144)
- **P3.1 BMI:** toter `geschlecht`-Input
- **P3.2 Raucher:** Konstanten-Preise jährlich prüfen
- **P3.3 Schlaf:** 90-min-Zyklus als Mittelwert kennzeichnen
- **P3.4 Wasserbedarf:** UI-Warnhinweis bei >4 l/Tag (Hyponatriämie)
- **P3.5 Körperfett:** Warnhinweis bei „Essentielles Fett"-Kategorie
- **P3.6 Zyklus:** Perioden-Länge als Input (default 5 Tage); Verhütungs-Disclaimer im UI
- **P3.7 Blutdruck:** ESC 2024-Update im Config-Text erwähnen; sys<dia-Filter als UI-Hinweis
- **P3.8 Schritte:** 10.000-Ziel als Heuristik kennzeichnen (Paluch 2022)
- **P3.9 WHR:** „moderat"-Zwischenstufe als NIH/AHA-Konvention dokumentieren

---

## Methodische Notizen

- Primärquellen verifiziert: WHO Fact Sheet (BMI), ESH 2023 + ESC 2024 (Blutdruck), DGE (Protein, Wasser), IOM 2009 (Schwangerschaft-Gewicht), Naegele/§ 3 MuSchG/G-BA (Geburtstermin/SSW), DKFZ/BfS (Sonnenschutz), US Navy Hodgdon-Beckett 1984 (Körperfett), National Sleep Foundation 2015 (Schlaf), Widmark 1932 (Alkohol), ACE (Körperfett-Kategorien).
- Keine erfundenen Formeln gefunden.
- Wellbeing-Check durchgängig: keine Shaming-Tonalität, BMI-Limitationen werden explizit benannt.
- **Nicht im Scope dieses Audits:** Rechner `HerzfrequenzZonenRechner.tsx` (nicht in `gesundheit.ts` registriert) und `PromilleRechner.tsx` (sitzt in Kategorie `arbeit` laut CLAUDE.md Rule 15).
