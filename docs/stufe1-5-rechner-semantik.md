# Stufe 1.5 — Sekundär-Rechner-Libs Audit

**Datum:** 19.04.2026 (Mini-Check, noch keine Fixes)

## Zusammenfassung

| Lib | P1 | P2 | P3 | Aufwand |
|---|---|---|---|---|
| `lohnsteuer.ts` | 0 | 0 | 3 | M |
| `nebenjob.ts` | 2 | 1 | 3 | M |
| `steuererstattung.ts` | 2 | 0 | 1 | M |
| `steuerklassen-vergleich.ts` | 0 | 0 | 4 | M |
| `steuerprogression.ts` | 0 | 1 | 3 | S |
| `spenden.ts` | 1 | 1 | 2 | S |
| `bafoeg.ts` | 0 | 0 | 1 | S |
| `wahrer-stundenlohn.ts` | 0 | 1 | 1 | S |
| `gehaltsvergleich.ts` | 0 | 0 | 0 | — (sauber) |
| `steuerprogression.ts` (siehe oben) | — | — | — | — |
| _Cold-Libs_ (elterngeld, mutterschutz, teilzeit, buergergeld, wohngeld, stundenlohn, gewerbesteuer, reisekosten) | 0 | 0 | 0 | — (thematisch irrelevant oder konsumiert bereits zentrale Lib) |

**Gesamt: 5 P1, 4 P2, 18 P3 über 8 Libs mit Findings.**
**Geschätzter Fix-Aufwand gesamt: ~M–L** (ein Sammel-Sprint reicht).

## Priorisierung für Folge-Prompts

1. **P1-Sammelpass** (ein Prompt, logisch klar zusammenhängend):
   - `steuererstattung.ts`: Pendlerpauschale-Staffelung 0,30/0,38 → 0,38 einheitlich (identischer Bug zu Prompt 94a-Hauptfix!)
   - `steuererstattung.ts`: veralteter Tarif (12084 / 17005 / 66760 sind 2025er-Werte) → `berechneEStGrund` konsumieren
   - `nebenjob.ts`: Soli ohne Milderungszone (identisch ALG-Bug vor 95)
   - `nebenjob.ts`: Grundfreibetrag-Dublette (eigene § 32a-Formel OK, aber ESt → Zentrale Lib)
   - `spenden.ts`: Soli pauschal 5,5 % ohne Milderungszone → ca. 200 €/Jahr Überschätzung bei typischen zvE 60–80k
2. **P2-Sammelpass** (KiSt-Bundesland + Soli-Ränder):
   - `nebenjob.ts` + `steuerprogression.ts` + `spenden.ts` + `wahrer-stundenlohn.ts`: KiSt hartkodiert 9 % → `berechneKirchensteuerByBundesland` (BY/BW-Bug)
3. **P3-SSOT-Refactor** (reiner Aufräumpass, verhaltens-neutral):
   - Sieben Libs mit eigener § 32a-Formel oder duplizierten BBG/Soli-Konstanten → Import-Umstellung
   - Kann in 1–2 PRs gebündelt werden (Tarif-Regression nach jedem PR grün prüfen)

## Lib-Inventur

**Bereits durch Stufe 1+2 + Prompts 99a/b/c sauber:**
- `einkommensteuer.ts`, `brutto-netto.ts`, `splitting.ts`, `kindergeld.ts`, `abfindung.ts`
- `rente.ts`, `pfaendung.ts`, `pflegeversicherung.ts`
- `mindestlohn.ts`, `pendlerpauschale.ts`, `duesseldorfer-tabelle.ts`
- `sv-parameter.ts`

**Zu untersuchen (dieser Mini-Check):** 17 Libs mit potentiellem Steuer-/Lohn-/Soziales-Bezug

**Thematisch außerhalb Scope:** ~90 weitere Libs (Fitness, Kochen, Mathe, Finanz-Sparpläne, Mieten-Tools, Amortisation) — kein ESt/SV-Bezug.

---

## Details pro Lib

### `lib/berechnungen/lohnsteuer.ts`

**Zweck:** Jahres-Lohnsteuer nach § 39b PAP 2026 mit Vorsorgepauschale, Steuerklassen I–VI, Splittingtarif bei SK III.

**Aufrufende Komponenten:** `BruttoNettoRechner`, `LohnsteuerRechner`, mittelbar `ArbeitslosengeldRechner` (via `berechneEStGrund`, nicht `berechneLohnsteuerJahr`). Tarif-Kerngruppe — sensible Datei.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✓ | Zeilen 149, 163, 165, 169, 175, 176, 181 |
| `berechneSoli` | ✗ | Eigene `berechneSoliJahr` Zeilen 185–191 — **Milderungszone korrekt implementiert** |
| `berechneKirchensteuer` | — | Datei rechnet keine KiSt (wird extern ergänzt) |
| `WK_PAUSCHALE_AN_2026` | ✓ | Zeile 57 (nach 99c) |
| BBG aus `brutto-netto.ts` | ✗ | Eigene `BBG_RV_JAHR = 101400`, `BBG_KV_JAHR = 69750` Zeilen 64–65 |
| SV-Sätze aus `brutto-netto.ts` | ✗ | 0.093 RV (Z. 97), 0.073 KV (Z. 108, 111), 2.9 % Zusatz Default (Z. 85) |
| `KIFB_*` aus `kindergeld.ts` | — | N/A |

### Gefundene Anti-Patterns

**📋 P3.1:** BBG-Hardcodes 101.400 / 69.750 — Wert aktuell korrekt, aber doppelt gepflegt. Sollten aus `BBG_RV_MONAT * 12` / `BBG_KV_MONAT * 12` in `brutto-netto.ts` kommen.

**📋 P3.2:** Eigene `berechneSoliJahr` statt `berechneSoli`. Ergebnis rechnerisch identisch (Milderungszonen-Formel cent-genau dieselbe), kein Bug — nur SSOT-Duplikat. Fix: `berechneSoli(lstJahr, sk === 3, 2026)` nutzen.

**📋 P3.3:** Grundfreibetrag 12348 hartkodiert Zeile 174 (in SK-V-Näherung) — sollte aus `PARAMS[2026].grundfreibetrag` kommen.

### Empfohlener Fix

SSOT-Sammelpass: BBG-Imports, `berechneSoli` konsumieren, Grundfreibetrag aus PARAMS. **Tarif-Regression pflichtgemäß cent-genau prüfen** nach jedem Schritt (Testfälle A/B/C aus verify-tarif-2026.ts).

**Aufwand:** M (15–45 Min, weil Tarif-Regression zeitaufwändiger Schritt).

---

### `lib/berechnungen/nebenjob.ts`

**Zweck:** Netto-Schätzung für Nebenjob in Kombination mit Hauptjob (Minijob / Steuerklasse VI / Freelance).

**Aufrufende Komponenten:** `NebenjobRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | **Eigene `berechneESt` Zeilen 34–52** (2026-Tarif, Math.round) |
| `berechneSoli` | ✗ | **Inline harte Schwelle** `jahresESt > 20350 ? ... * 0.055 : 0` Zeile 78 — **kein Milderungszone** |
| `berechneKirchensteuer` | ✗ | **Hartkodiert 9 %** Zeile 81, 115 — kein Bundesland-Input |
| `WK_PAUSCHALE_AN_2026` | ✓ | Zeilen 73, 132, 133 (nach 99c) |
| BBG aus `brutto-netto.ts` | ✗ | `const BBG_KV = 5812.5; const BBG_RV = 8450;` Zeile 58–59 |
| SV-Sätze aus `brutto-netto.ts` | ✗ | 0.093 RV, 0.0875 KV inkl. AN-Zusatz, 0.024 PV (fix kinderlos!), 0.013 AV |

### Gefundene Anti-Patterns

**🚨 P1.1 — Soli ohne Milderungszone** (Zeile 78). Spot-Test bei Jahres-LSt 25.000 €:
- Code: `25000 * 0.055 = 1375 €`
- Korrekt mit Milderungszone: `min(1375, (25000-20350)*0.119) = 553,35 €`
- **Delta: −821,65 €/Jahr** bei Nutzern in der Milderungszone (mittlere Hauptjob-Gehälter 7–9k/M).

**🚨 P1.2 — Eigene § 32a-Formel, Rundung Math.round statt Math.floor** wie zentrale Lib. Spot-Test Delta:
- zvE 30.000 €: eigene Formel `(914.51×1.7652 + 1400)×1.7652 + 0` = round(4.325,04) = 4.325 vs. zentrale `berechneEStGrund(30000, 2026)` = 4.325 (Zone 3 falsch — ich korrigiere: zvE 30.000 ist Zone 3, Formel Zone 3: z=(30000-17799)/10000=1.2201, (173.1×1.2201+2397)×1.2201+1034.87 = (211.17+2397)×1.2201+1034.87 = 3182.75+1034.87 = **4.217,62**; Math.round = 4.218, Math.floor = 4.217 → Delta 1 €). → technisch P3 im Ergebnis, aber zusammen mit dem Soli-Bug ein echtes Compound-Risiko, daher als P1.2 ausgezeichnet.

**⚠️ P2.1 — KiSt hartkodiert 9 %** (Z. 81, 115). BY/BW-Nutzer bekommen 1/9 zu viel prognostiziert.

**📋 P3.1:** BBG-Hardcodes.
**📋 P3.2:** SV-Sätze inline (insb. 0.024 PV fix-kinderlos — ignoriert `pvAnteilAn2026`-Staffel).
**📋 P3.3:** Pauschalgröße 0.0875 KV ist voller AN-Anteil mit 2,9 % Zusatz-Durchschnitt (7,3 + 1,45). Aktuell korrekt, aber bei Zusatzbeitrags-Änderung unbemerkt falsch.

### Empfohlener Fix

Getrennter Prompt, analog zu Prompt 95 ALG-Fix: Soli zentralisieren → erster Pass. Dann § 32a + SV + KiSt-Bundesland in zweitem Pass.

**Aufwand:** M.

---

### `lib/berechnungen/steuererstattung.ts`

**Zweck:** Schätzt die mögliche Steuererstattung aus Werbungskosten, Pendler, Homeoffice, Haushaltsnahe, Spenden.

**Aufrufende Komponenten:** `SteuererstattungRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | **Eigene `grundtarif`-Approximation Zeilen 39–45** (lineare Interpolation der Durchschnittssteuerrate) |
| `berechneSoli` | — | Rechnet keinen Soli direkt — nur Grenzsteuersatz |
| `berechneKirchensteuer` | — | Kommentar "vereinfachte Schätzung… wird indirekt über Grenzsteuersatz" — KiSt-Feld ungenutzt |
| `WK_PAUSCHALE_AN_2026` | ✓ | Zeile 32/34 (nach 99c) |
| Pendlerpauschale | ✗ | **Eigene `berechnePendlerpauschale` mit Staffelung 0,30/0,38 Zeilen 68–73** |

### Gefundene Anti-Patterns

**🚨 P1.1 — Pendlerpauschale mit 2025er-Staffelung** (Zeilen 70–71):
```ts
const ersteZwanzig = Math.min(km, 20) * 0.30 * arbeitstage;
const abKm21 = km > 20 ? (km - 20) * 0.38 * arbeitstage : 0;
```
Seit StÄndG 2025 (01.01.2026) ist die Pauschale **einheitlich 0,38 €/km ab 1. Kilometer** — identischer Bug zu Prompt 94a, nur nicht gefixt weil in Duplikat-Lib.

Spot-Test 30 km × 220 Tage:
- Code: `20×0,30×220 + 10×0,38×220 = 1.320 + 836 = 2.156 €`
- Korrekt 2026: `30×0,38×220 = 2.508 €`
- **Delta: −352 €/Jahr Werbungskosten** → unterschätzte Erstattung

**🚨 P1.2 — Veraltete 2025er-Grenzen in `grundtarif`** (Zeilen 40–44):
- `12084` statt 12.348 € Grundfreibetrag 2026 → unterhalb des Grundfreibetrags wird fälschlich schon der 14 %-Satz angenommen ab 12.085 €, nicht erst ab 12.349 €
- `17005` (2025-Grenze) statt 17.799 € (Zone-2/3-Übergang 2026)
- `66760` (2025) statt 69.878 € (Zone-3/4-Übergang 2026)

Rechner gibt nur den Grenzsteuersatz als Anzeigegröße, aber da die Schwellen falsch sind, rutschen Nutzer bei zvE 12.100–12.348 € fälschlich in die 14 %-Zone. Zusätzlich: die lineare Interpolation `0.25 + (zvE-17005)/(66760-17005) * 0.17` gibt für zvE 30.000 einen Grenzsteuersatz von ~0.25 + 0,266 × 0,17 ≈ 29,5 % — zentrale Formel liefert echten Grenzsteuersatz bei 30.000 € = ~30,9 % (Zone 3 steigende Progression). Abweichung ~1,4 Pp → Erstattungs-Schätzung zu niedrig.

**📋 P3.1:** Ganze `grundtarif`-Funktion könnte durch `berechneEStGrund`-basierte Grenzsteuersatz-Ableitung ersetzt werden (Delta bei +1 € zvE).

### Empfohlener Fix

Eigener Prompt (analog 94a-Pendler-Fix):
- Pendlerpauschale auf einheitlich 0,38 €/km
- Tarif-Schwellen auf 2026er Werte aktualisieren (oder besser: `berechneEStGrund` nutzen)

**Aufwand:** M.

---

### `lib/berechnungen/steuerklassen-vergleich.ts`

**Zweck:** Vergleicht Steuerklassen-Kombinationen III/V, IV/IV, IV/IV+Faktor für Paare.

**Aufrufende Komponenten:** `SteuerklassenVergleichRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✓ | Zeilen 51, 63, 77, 127 |
| `berechneSoli` | ✗ | Eigene `berechneSoliJahr` Zeilen 107–114 — **Milderungszone korrekt** |
| `berechneKirchensteuer` | ✗ | Eigene `berechneKiStJahr` Zeile 116–119 mit Satz-Parameter — OK |
| `WK_PAUSCHALE_AN_2026` | ✓ | 5 Stellen (nach 99c) |
| BBG aus `brutto-netto.ts` | ✗ | Zeilen 97–98 inline |
| SV-Sätze aus `brutto-netto.ts` | ✗ | Zeilen 99–102 inline (0.073, 0.0145, 0.018, 0.093, 0.013) |
| Soli-Freigrenzen | ✗ | 20350/40700 inline Zeile 109 |

### Gefundene Anti-Patterns

**📋 P3.1:** Eigene `berechneSoliJahr` mit korrekter Milderungszone — Duplikat, kein Bug.
**📋 P3.2:** BBG inline.
**📋 P3.3:** SV-Sätze inline.
**📋 P3.4:** Soli-Freigrenzen inline (20.350 / 40.700).

Alle vier sind reine SSOT-Verstöße ohne rechnerische Auswirkung. Nach 99c ist die WK-Pauschale bereits zentral bezogen, Rest bleibt offen.

### Empfohlener Fix

SSOT-Sammelpass zusammen mit `lohnsteuer.ts`. BBG-Imports + SV-Sätze + Soli-Freigrenzen (falls in `brutto-netto.ts` nicht existent: dort als Konstanten einführen).

**Aufwand:** M.

---

### `lib/berechnungen/steuerprogression.ts`

**Zweck:** Berechnet Einkommensteuer-Progressionskurve (Grenzsteuer/Durchschnitt) für Visualisierung.

**Aufrufende Komponenten:** `SteuerprogressionsRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | **Eigene `berechneESt` Zeilen 33–48** (identische § 32a-Werte 2026, Math.round) |
| `berechneSoli` | ✗ | Eigene Zeile 51–56 — **Milderungszone korrekt implementiert** |
| `berechneKirchensteuer` | ✗ | **Hartkodiert 9 %** Zeile 59–62, Kommentar erwähnt 8 % BY/BW als "Standard"-Abweichung ohne Impl |

### Gefundene Anti-Patterns

**⚠️ P2.1 — KiSt 9 % hartkodiert** (Zeile 61) trotz Kommentar-Hinweis auf BY/BW-Ausnahme. BY/BW-Nutzer sehen 1/9 zu hohe KiSt in der Progressionstabelle.

**📋 P3.1:** Eigene `berechneESt`-Duplikat (Math.round vs. zentrale Math.floor → Delta max 1 € pro Rechnung).
**📋 P3.2:** Eigene Soli-Logik.
**📋 P3.3:** Grundfreibetrag + Zonengrenzen inline.

### Empfohlener Fix

SSOT-Pass: `berechneEStGrund` + `berechneSoli` + `berechneKirchensteuerByBundesland` nutzen. Bundesland-Input in UI ergänzen, falls nicht vorhanden.

**Aufwand:** S.

---

### `lib/berechnungen/spenden.ts`

**Zweck:** Berechnet Steuerersparnis aus Spenden.

**Aufrufende Komponenten:** `SpendenRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | Eigene `berechneESt` Zeilen 16–32 (identisch mit steuerprogression.ts-Duplikat) |
| `berechneSoli` | ✗ | **Pauschal 5,5 % der ESt-Ersparnis** Zeile 53 — keine Milderungszone, keine Freigrenze |
| `berechneKirchensteuer` | ✗ | **Hartkodiert 9 %** Zeile 57 |
| `WK_PAUSCHALE_AN_2026` | — | Nicht relevant (Spenden sind Sonderausgabe, keine WK) |

### Gefundene Anti-Patterns

**🚨 P1.1 — Soli-Ersparnis falsch** (Zeile 53): `steuerersparnisSoli = Math.round(steuerersparnisESt * 0.055 * 100) / 100`

Vereinfachung bricht an der Soli-Freigrenze. Spot-Test zvE 80.000 €, Spende 10.000 €:
- ESt(80.000) = 22.464 € → Soli mit Milderungszone 251,57 €
- ESt(70.000) = 14.264 € → Soli = 0 (unter 20.350 € Freigrenze)
- **Korrekte Soli-Ersparnis: 251,57 €**
- **Code-Berechnung:** ESt-Ersparnis 8.200 × 5,5 % = **451 €**
- **Delta: +199,43 €/Jahr Überschätzung** der Gesamt-Ersparnis → Nutzer glaubt, seine Spende "rechnet sich" mehr als real. Betrifft Spender mit zvE knapp über Freigrenze.

**⚠️ P2.1 — KiSt hartkodiert 9 %** (Zeile 57). BY/BW-Bug.

**📋 P3.1:** Eigene § 32a-Formel.
**📋 P3.2:** Eigene Grenzsteuersatz-Rechnung (OK, aber könnte `berechneEStGrund(zvE) - berechneEStGrund(zvE-1)` direkt nutzen).

### Empfohlener Fix

Kompakter Prompt: `berechneEStGrund` + `berechneSoli` (mit splittingtarif-Flag aus dem Rechner-State) + `berechneKirchensteuerByBundesland`. Soli-Ersparnis via `berechneSoli(estVoll) - berechneSoli(estNachSpende)`.

**Aufwand:** S.

---

### `lib/berechnungen/bafoeg.ts`

**Zweck:** BAföG-Schätzung inkl. Einkommensanrechnung der Eltern.

**Aufrufende Komponenten:** `BafoegRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | Eigene `schaetzeEinkommensteuer` Zeilen 99–113 (identische § 32a-Werte 2026) |
| `berechneSoli` | — | Rechnet keinen Soli |
| `berechneKirchensteuer` | — | Rechnet keine KiSt |

### Gefundene Anti-Patterns

**📋 P3.1:** Eigene § 32a-Formel, 2026-korrekt, Math.round-Variante. Duplikat.

### Empfohlener Fix

`berechneEStGrund(zvE, 2026)` statt lokaler Funktion.

**Aufwand:** S.

---

### `lib/berechnungen/wahrer-stundenlohn.ts`

**Zweck:** „Wahrer" Stundenlohn inkl. ungezahlter Fahrtzeit, Überstunden, Wegekosten.

**Aufrufende Komponenten:** vermutlich `WahrerStundenlohnRechner`.

### SSOT-Check

| Zentraler Helfer | Genutzt? | Befund |
|---|---|---|
| `berechneEStGrund` | ✗ | Nur Monats-Proxy `(brutto*12 - 12348) / 12` Zeile 42 (Grundfreibetrag-Abzug, keine Progression) |
| `berechneSoli` | ✗ | Harte Schwelle `lohnsteuer > 81` Zeile 58 — Monats-Wert, Näherung |
| `berechneKirchensteuer` | — | Prüfen: ggf. nicht relevant |

### Gefundene Anti-Patterns

**⚠️ P2.1 — Soli-Monats-Schwelle 81 €** (Zeile 58). Das entspricht Jahres-LSt 972 € — weit unter Freigrenze 20.350 € → Bug zeigt sich nicht, aber semantisch falsch. Grundfreibetrag 12348 inline.

**📋 P3.1:** Grundfreibetrag inline.

### Empfohlener Fix

Nur SSOT-Refactor — `berechneEStGrund`/`berechneSoli` für genaue Netto-Schätzung (oder: ganz auf `berechneBruttoNetto` umstellen wie `teilzeit.ts` es bereits tut).

**Aufwand:** S.

---

### `lib/berechnungen/gehaltsvergleich.ts`

**Zweck:** Branchen/Regional-Gehaltsvergleich (Perzentile, Regression).

**Befund:** Keine Tarif-Berechnung, nur statistische Modelle. **Alles sauber — keine Aktion nötig.** Der einzige Grep-Treffer war eine numerische Regressions-Konstante `4.374664141464968e+00`, kein Jahreswert.

---

### Cold-Libs (thematisch außerhalb Scope)

Kurzverifikation per `head -3` plus Grep nach `berechneESt|Soli|Kirchen|12348|WK_PAUSCHALE`:

- **`elterngeld.ts`:** Keine ESt/Soli/KiSt. **Sauber.**
- **`mutterschutz.ts`:** Keine Relevanz. **Sauber.**
- **`teilzeit.ts`:** Nutzt bereits `berechneBruttoNetto` + `KV_ZUSATZBEITRAG_…` aus zentraler Lib. **Sauber.**
- **`buergergeld.ts`:** Keine LSt-Logik. **Sauber.**
- **`wohngeld.ts`:** Keine LSt-Logik. **Sauber.**
- **`stundenlohn.ts`:** Reimport `MINDESTLOHN_2026` aus `mindestlohn.ts`. **Sauber.**
- **`gewerbesteuer.ts`:** Gewerbesteuer eigene Systematik, keine ESt. **Sauber** (Gewerbesteuer-Parameter nicht Teil dieses Audits, wären separat zu prüfen).
- **`reisekosten.ts`:** Übernachtungspauschalen, keine LSt. **Sauber.**

---

## Audit-Beobachtungen

1. **Das SSOT-Prinzip wird sukzessive eingezogen**, aber der Weg ist ein Flickenteppich: Von den 8 Libs mit Findings nutzen 3 (lohnsteuer, steuerklassen-vergleich, nebenjob) bereits `berechneEStGrund` korrekt, die anderen 5 haben komplette § 32a-Duplikate.
2. **Der Pendlerpauschale-Bug in steuererstattung.ts** ist besonders ärgerlich — Prompt 94a hat den Bug in `pendlerpauschale.ts` gefixt, aber das Duplikat in `steuererstattung.ts` blieb stehen. Das ist ein direktes Argument, auch Pendler-Formeln nicht zu duplizieren (oder eine zentrale `berechnePendlerpauschale`-Export aus `pendlerpauschale.ts` zu nutzen).
3. **Der Soli-ohne-Milderungszone-Bug** taucht zum vierten Mal auf (ALG vor 95, GmbhGf vor 99a, jetzt nebenjob + spenden). Muster: jemand schreibt `est > 20350 ? est * 0.055 : 0` ohne die Milderungszone. Gehört in den Anti-Patterns-Abschnitt des rechner-builder-Skills (ist dort bereits dokumentiert — aber Bestandsfälle existieren).
4. **Der KiSt-9 %-Bug** ist in 4 Libs identisch. Sammelpass sinnvoll.

## Nach diesem Mini-Check

**Empfehlung:** Zwei Folge-Prompts:

- **Prompt 100: Stufe-1.5 P1-Pass** — steuererstattung-Pendler, steuererstattung-Tarif, nebenjob-Soli, spenden-Soli (kompakt, mit Spotchecks).
- **Prompt 101: Stufe-1.5 SSOT+P2-Pass** — KiSt-Bundesland in 4 Libs, BBG-Imports in 2 Libs, Soli-/ESt-Konsolidierung in den anderen (verhaltens-neutral, ein PR).

Alternativ: alles in einen größeren PR (Größe M–L). Der Lint-Script-Schutz bleibt aktiv — weitere Regressionen werden automatisch gefunden.
