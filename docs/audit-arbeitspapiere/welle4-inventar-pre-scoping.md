# Welle-4 Inventar (Pre-Scoping, 30.04.2026)

**Zweck:** Vorbereitung Welle-4-Scoping-Doku zum „Verify-Script-Coverage-Lücke"-Track (E5 aus `validation-sweep-scoping.md`). Read-only-Inventur ohne Code-Edit.
**Methodik:** Inline-Node-Sweep über `lib/rechner-config/*.ts` (Slug-SSOT) + `scripts/verify-*.ts` + `components/rechner/*.tsx` (Lib-Konsumption). Lib-Deps transitiv expandiert. Pre-7-Klassifikation pro Slug nach Oracle-Verfügbarkeit (`ORACLE-VERFÜGBAR` / `ORACLE-MARKT` / `ORACLE-MENGEN`).
**Status:** Pre-Scoping abgeschlossen, Karsten-Review der Grenzfälle (Sektion 7) + Anomalien (Sektion 6) ausstehend, dann Welle-4-Scoping-Doku formulieren.

---

## 1. Slug-Inventar

```
Alltag (23):       prozentrechner, dreisatz-rechner, tagerechner, rabattrechner, countdown,
                   lebenszeit-rechner, streaming-kosten-rechner, kaffee-kosten-rechner,
                   lieferservice-rechner, abo-rechner, handykosten-rechner, umzugskosten-rechner,
                   trinkgeld-rechner, geburtstag-rechner, skontorechner, uhrzeitrechner,
                   hundejahre-rechner, waehrungsrechner, schuhgroessen-rechner, kleidergroessen-rechner,
                   reisekosten-rechner, zeitwert-rechner, budget-rechner

Arbeit (17):       arbeitszeitrechner, urlaubstage-rechner, ueberstunden-rechner, pendlerpauschale-rechner,
                   promillerechner, rechtsschutz-rechner, freelancer-stundensatz-rechner,
                   kuendigungsfrist-rechner, teilzeit-rechner, abfindungsrechner, mutterschutz-rechner,
                   scheidungskosten-rechner, zugewinnausgleich-rechner, arbeitstage-rechner,
                   unterhaltsrechner, elternzeit-rechner, ehegattenunterhalt-rechner

Auto (11):         spritkosten-rechner, kw-ps-umrechner, kfz-steuer-rechner, bussgeldrechner,
                   autokosten-rechner, leasing-rechner, fuehrerschein-rechner, reichweiten-rechner,
                   fahrrad-rahmengroesse-rechner, taxi-rechner, firmenwagen-rechner

Finanzen (45):     brutto-netto-rechner, mwst-rechner, zinsrechner, elterngeld-rechner,
                   arbeitslosengeld-rechner, buergergeld-rechner, stundenlohn-rechner, sparrechner,
                   inflationsrechner, gehaltsvergleich, wahrer-stundenlohn, steuererstattung-rechner,
                   kreditrechner, etf-sparplanrechner, rentenrechner, splitting-rechner,
                   wohngeld-rechner, bafoeg-rechner, aufstiegs-bafoeg-rechner, kindergeld-rechner,
                   pflegegeld-rechner, erbschaftsteuer-rechner, minijob-rechner, gehaltserhoehung-rechner,
                   krankengeld-rechner, gmbh-geschaeftsfuehrer-rechner, hochrechner, midijob-rechner,
                   witwenrente-rechner, kurzarbeitergeld-rechner, riester-rechner, nettolohn-optimierer,
                   kapitalertragsteuer-rechner, afa-rechner, betriebskosten-rechner,
                   mwst-rueckerstattung-rechner, steuerprogression-rechner, spenden-rechner,
                   nebenjob-rechner, schenkungssteuer-rechner, gewerbesteuer-rechner,
                   einkommensteuer-rechner, steuerklassen-vergleich-rechner, pfaendungsrechner,
                   lohnsteuer-rechner

Gesundheit (17):   bmi-rechner, raucher-rechner, schlaf-rechner, kalorienrechner, geburtstermin-rechner,
                   idealgewicht-rechner, wasserbedarf-rechner, koerperfett-rechner, ssw-rechner,
                   schwangerschaft-gewicht-rechner, zyklusrechner, alkohol-abbau-rechner,
                   protein-rechner, whr-rechner, blutdruck-rechner, schritte-rechner, sonnenschutz-rechner

Kochen (12):       rezept-umrechner, cups-umrechner, backform-umrechner, backzeit-rechner,
                   kochzeit-rechner, hefe-umrechner, pizzateig-rechner, brotback-rechner,
                   alkoholgehalt-rechner, naehrwert-rechner, zucker-umrechner, gefrierdauer-rechner

Mathe (18):        bruchrechner, einheiten-umrechner, notenschluessel-rechner, durchschnitt-rechner,
                   wissenschaftlicher-taschenrechner, flaechenrechner, prozentuale-veraenderung-rechner,
                   volumenrechner, abi-rechner, binaer-rechner, pythagoras-rechner, gleichungsrechner,
                   primzahl-rechner, quersumme-rechner, potenz-rechner, ggt-kgv-rechner,
                   zufallszahl-generator, noten-international

Sport (2):         pace-rechner, herzfrequenz-zonen-rechner

Wohnen (25):       stromkosten-rechner, nebenkosten-rechner, mietrechner, heizkosten-rechner,
                   grunderwerbsteuer-rechner, baufinanzierung-rechner, quadratmeter-rechner,
                   tapetenbedarf-rechner, stromvergleich-rechner, mietrendite-rechner,
                   indexmiete-rechner, waermepumpen-rechner, photovoltaik-rechner, dachflaechen-rechner,
                   malerkosten-rechner, grundsteuer-rechner, mietpreisbremse-rechner, poolkosten-rechner,
                   vorfaelligkeitsentschaedigung-rechner, energiekosten-rechner, fliesenbedarf-rechner,
                   laminat-rechner, beton-rechner, estrich-rechner, balkon-solar-rechner
```

**Total: 170 Slugs** — exakt CLAUDE.md Z. 71 Soll-Wert. Keine Diff.

---

## 2. Verify-Script-Inventar

**29 Verify-Scripts** in `scripts/verify-*.ts`, 35 verifizierte Libs (eindeutig).

| Script | Tests¹ | Verifizierte Libs (direkt) | Externe Quelle |
|---|---|---|---|
| verify-149d.ts | ~50 (eq) | scheidungskosten | BGBl, OLG/DT |
| verify-afbg.ts | ? | afbg | BGBl, OLG/DT, BMBF |
| verify-bafoeg-p1.ts | ? | bafoeg | — |
| verify-bafoeg-p2.ts | ? | bafoeg, bafoeg-parameter | BMBF |
| verify-bafoeg-p3.ts | ? | bafoeg | BGBl, BMBF |
| verify-buergergeld-p2.ts | ? | buergergeld, buergergeld-parameter | — |
| verify-buergergeld-p3.ts | ? | buergergeld, buergergeld-parameter | BGBl, BA |
| verify-buergergeld-p4.ts | ? | buergergeld, buergergeld-parameter | BGBl |
| verify-ehegattenunterhalt.ts | ? | (kein Lib-Import erkannt — Anomalie A-01) | OLG/DT |
| verify-erbst-haertefall.ts | ~17 (cases.push) | erbschaftsteuer, schenkungssteuer | — (§ 19 ErbStG inline) |
| verify-feiertage.ts | ~30 (eq) | feiertage | Kalender (BMF + kalender.de) |
| verify-gesundheit-p1.ts | ? | kalorien, bmi | — (Inline: Mifflin-St-Jeor, NIH) |
| verify-gesundheit-p2.ts | ? | schwangerschaft | OLG/DT-False-Positive (Düsseldorf-Substring?) |
| verify-gesundheit-p3.ts | ~2 (test) | bmi, idealgewicht, schwangerschaft | Health-Org |
| verify-kfz-steuer-p1.ts | ? | kfz-steuer, kfz-steuer-parameter | BGBl |
| verify-lohnsteuer-pap.ts | ? | _lohnsteuer-pap-2026 | BMF/ITZBund |
| verify-lohnsteuer-regression.ts | ? | lohnsteuer | BMF |
| verify-lohnsteuer-vvi.ts | ? | lohnsteuer | BMF |
| verify-midijob-p1.ts | ? | midijob-uebergang, midijob-parameter, lohnsteuer, einkommensteuer, brutto-netto, sv-parameter, pflegeversicherung | BGBl |
| verify-pfaendung-p1.ts | ? | pfaendung | BGBl |
| verify-pfaendung-p2.ts | ? | pfaendung | BGBl |
| verify-pv-ertragsmodell.ts | ? | pv-ertragsmodell | — (Mertens inline) |
| verify-tarif-2026.ts | ? | brutto-netto, lohnsteuer, einkommensteuer | — |
| verify-taxi-smoke.ts | ? | taxi | — |
| verify-unterhalt-2026.ts | ? | duesseldorfer-tabelle | — |
| verify-wohnen-block-b.ts | ? | pv-ertragsmodell, balkon-solar, strompreis | — |
| verify-wohnen-p1.ts | ? | grunderwerbsteuer, eeg-einspeiseverguetung, strompreis, beg-foerderung, vpi, baufinanzierung | — |
| verify-wohngeld-p1.ts | ? | wohngeld | BGBl, BMWSB |
| verify-zugewinnausgleich.ts | ? | vpi | Destatis |

¹ Test-Anzahl-Heuristik (`eq(`/`test(`/`assert(`-Pattern) ist konservativ — viele Scripts nutzen andere Helper-Patterns (z. B. `cases.push` + zentrale Schleife wie verify-erbst-haertefall mit `~17 cases`). Das `?`-Markierte heißt: das bestehende Detection-Pattern hat 0 Treffer; eine genauere Test-Zählung erfordert Script-spezifischen Pattern-Scan. Pragmatisch in Welle-4-Scoping: Test-Anzahl ist sekundär, primär ist „Lib-Coverage abgedeckt ja/nein".

**Verifizierte Libs (35 unique):** _lohnsteuer-pap-2026, afbg, bafoeg, bafoeg-parameter, balkon-solar, baufinanzierung, beg-foerderung, bmi, brutto-netto, buergergeld, buergergeld-parameter, duesseldorfer-tabelle, eeg-einspeiseverguetung, einkommensteuer, erbschaftsteuer, feiertage, grunderwerbsteuer, idealgewicht, kalorien, kfz-steuer, kfz-steuer-parameter, lohnsteuer, midijob-parameter, midijob-uebergang, pfaendung, pflegeversicherung, pv-ertragsmodell, scheidungskosten, schenkungssteuer, schwangerschaft, strompreis, sv-parameter, taxi, vpi, wohngeld

---

## 3. Coverage-Mapping (Lib-Konsumption pro Slug, transitiv)

**Methodik:** Pro Component-File (`components/rechner/*.tsx`) Lib-Imports lesen, dann Slug→Component-Match (mit M5-Overrides für Camel/Kebab-Edge-Cases). Lib-Deps werden transitiv expandiert (z. B. `brutto-netto.ts` zieht `lohnsteuer.ts` + `pflegeversicherung.ts` + `_lohnsteuer-pap-2026.ts` + `einkommensteuer.ts` + `sv-parameter.ts` mit). Damit zählt eine Component, die nur `brutto-netto` direkt importiert, als ABGEDECKT durch alle 6 verify-Scripts der transitiven Kette.

**Mapping-Ergebnisse:**
- 162/170 Slugs mit Component-Match
- 8 Slugs ohne Component-Match (Sonder-Routen oder Mapping-Lücke): `kw-ps-umrechner`, `aufstiegs-bafoeg-rechner`, `pfaendungsrechner`, `einheiten-umrechner`, `wissenschaftlicher-taschenrechner`, `prozentuale-veraenderung-rechner`, `gleichungsrechner`, `zufallszahl-generator`
- 13 Components ohne Slug-Match: `AfbgRechner`, `EinheitenRechner`, `GleichungsloeserRechner`, `KwPsRechner`, `PfaendungRechner`, `ProzVeraenderungRechner`, `TaschenrechnerRechner`, `ZufallszahlRechner` (8 echte Mismatches), plus 5 Helper-Components ohne Rechner-Charakter: `AiExplain`, `SchlafTipp`, `SchnellCheck`, `StromSpartipp`, `WasWaereWenn`

→ Anomalie A-02: Slug↔Component-Naming-Drift. Component-Datei-Namen folgen anderer Convention als Slugs. Die 8 echten Mismatches sind alle Bestands-Komponenten mit nicht-direkt-konvertibler Camel/Kebab-Beziehung — pro Welle-4-Sprint einzeln auflösen.

---

## 4. Coverage-Bilanz (mit Pre-7-Klassifikation)

**Lib-Ebene-Roh-Verteilung** (vor Pre-7-Klassifikation):

| Klasse | Slugs |
|---|---|
| ABGEDECKT (alle Libs verifiziert) | 35 |
| TEILABGEDECKT (mind. 1 Lib verifiziert) | 21 |
| OFFEN (Component da, Libs unverifiziert) | 69 |
| KEINE-LIB (Component da, keine Lib-Imports) | 37 |
| KEINE-COMP (Sonder-Routen oder Mapping-Lücke) | 8 |
| **Total** | **170** |

**Nach Pre-7-Klassifikation** (OFFEN- und KEINE-LIB-Slugs aufgeteilt nach Oracle-Verfügbarkeit):

| Klasse | Anzahl | Anteil | Welle-4-Status |
|---|---|---|---|
| **ABGEDECKT** | 35 | 20,6 % | Bereits durch verify-Script abgedeckt |
| **TEILABGEDECKT** | 21 | 12,4 % | Welle-4-Scope: fehlende Libs zusätzlich verifizieren |
| **OFFEN-ORACLE** | ~38 | ~22 % | **Welle-4-Hauptscope** — neue Verify-Scripts schreiben |
| **OFFEN-MENGEN** | ~62 | ~36 % | Bewusst out-of-scope für Welle 4 (kein sinnvolles externes Oracle) |
| **OFFEN-MARKT** | ~14 | ~8 % | Welle-4-Grenzfall — Karsten entscheidet pro Slug |

(Pre-7-Klassifikation pro Slug folgt in Sektion 7 / detaillierte Tabelle bei Bedarf).

**Welle-4-Hauptscope (~38 OFFEN-ORACLE) sind die priorisierten Backfill-Kandidaten:**
- Arbeit (~7): arbeitszeitrechner, urlaubstage-rechner, pendlerpauschale-rechner, promillerechner, kuendigungsfrist-rechner, mutterschutz-rechner, elternzeit-rechner, ehegattenunterhalt-rechner
- Auto (~3): bussgeldrechner, firmenwagen-rechner (KEINE-LIB!), kfz-steuer-Lib hat verify, aber Component-Konsum unklar
- Finanzen (~14): mwst-rechner, elterngeld-rechner, pflegegeld-rechner, gewerbesteuer-rechner, mwst-rueckerstattung-rechner, afa-rechner (KEINE-LIB), riester-rechner (KEINE-LIB), aufstiegs-bafoeg-rechner (KEINE-COMP), pfaendungsrechner (KEINE-COMP — Lib hat verify, aber Component-Mapping fehlt), inflationsrechner (Destatis-Verifizierung möglich), kindergeld-Lib teilabgedeckt
- Gesundheit (~6): wasserbedarf, koerperfett, whr, blutdruck, schritte, sonnenschutz, alkohol-abbau, protein
- Wohnen (~6): nebenkosten, grundsteuer (KEINE-LIB), mietpreisbremse (KEINE-LIB), vorfaelligkeitsentschaedigung (KEINE-LIB), heizkosten-Lib teilabgedeckt
- Sport (~1): herzfrequenz-zonen-rechner (KEINE-LIB — Tanaka/Fox/Karvonen verifizierbar)

**OFFEN-MENGEN (~62, bewusst out-of-scope) — exemplarische Auswahl:**
- Komplette Mathe-Kategorie (18) bis auf Grenzfälle notenschluessel/abi
- Alle 12 Kochen-Rechner (reine Mengen-Konversionen)
- Alltag-Mengen: prozentrechner, dreisatz-rechner, tagerechner, rabattrechner, countdown, lebenszeit-rechner, geburtstag-rechner, uhrzeitrechner, hundejahre-rechner, schuhgroessen-rechner, kleidergroessen-rechner, budget-rechner, zinsrechner (Finanzen-Mengen), kreditrechner, sparrechner, etf-sparplanrechner, mwst-rechner-Berechnung etc.
- Wohnen-Mengen: quadratmeter, tapetenbedarf, fliesenbedarf, laminat, beton, estrich, mietrendite

**OFFEN-MARKT (~14, Karsten-Grenzfälle):**
- Kosten-Schätzungs-Rechner: rechtsschutz-rechner, autokosten-rechner, fuehrerschein-rechner (KEINE-LIB), malerkosten-rechner (KEINE-LIB), gehaltsvergleich, mietrechner, betriebskosten-rechner
- Markt-Konventionen: schuhgroessen-rechner (eher MENGEN), notenschluessel-rechner, abi-rechner, zeitwert-rechner, fahrrad-rahmengroesse-rechner, raucher-rechner, schlaf-rechner

---

## 5. Methodik-Diff zwischen 2 Verify-Scripts

| Aspekt | verify-feiertage.ts (152b-1, 28.04.26) | verify-erbst-haertefall.ts (115c, ~April 2026) |
|---|---|---|
| **Helper-Pattern** | Funktion `eq(name, ist, soll)` + `eqDate(name, ist, sollISO)` mit direktem Inline-Aufruf | TypeScript-`type TestCase = {name, actual, expected, tolerance?}` + `cases: TestCase[]` + zentrale Schleife |
| **Aufruf-Stil** | Einzelne `eq(...)`-Calls, je Test 1 Funktionsaufruf | Bulk: `cases.push({...}, {...}, {...})` Block-weise |
| **Toleranz** | Strikte Equality (`===`) | Optional `tolerance?: number` (Default 1) mit `Math.abs(actual − expected)` |
| **Reporting** | Direkt: `console.log(✓/✗ name)` + `pass++/fail++` Counter | Schleife am Ende: padded Output mit Δ-Anzeige + Summary-Zeile |
| **Externe Quellen-Notation** | Header-JSDoc-Kommentar listet BMF + kalender.de + spezifische Test-Cluster (Ostersonntag, Bundesweite Feste, Karten-Ausnahmen) | Kommentar-Block per Test-Cluster (`// --- Härtefall-Kernfunktion ---`) + § 19 Abs. 3 ErbStG-Verweis im Header |
| **Test-Daten** | Inline-Sollwerte als ISO-Strings + Numbers + Booleans | Inline-Numbers nur (Steuerbeträge) |
| **Exit-Code** | (im Read-Auszug nicht sichtbar — vermutlich am Ende `process.exit(fail === 0 ? 0 : 1)` analog) | Explizit `process.exit(failed === 0 ? 0 : 1)` Z. 136 |
| **Ergebnis-Summary** | (vermutlich am Ende `Ergebnis: pass/total grün`) | `Ergebnis: ${passed}/${cases.length} grün, ${failed} rot.` |
| **Lines** | 164 | 136 |

**Konvergenz-Beobachtungen:**
- Beide nutzen explizite Pass/Fail-Counter + Exit-Code 0/1
- Beide nutzen JSDoc-Header für externe Quellen
- Beide verzichten auf externes Test-Framework (kein vitest/jest) — bewusst dependency-frei

**Divergenz-Punkte für Welle-4-Konvention:**
- **Helper-Style:** `eq()`-Funktion vs. `cases[]`-Array — beide sind etabliert; Welle-4 könnte eines als Standard erzwingen oder beide zulassen. `cases[]`-Pattern ist deklarativer und tolerance-robust, `eq()`-Pattern ist debug-freundlicher (Stack-Trace pro fail-Aufruf zeigt direkt die Test-Zeile).
- **Tolerance-Default:** Numerisch-zentrierte Scripts (Steuern, Geld) profitieren von `tolerance` (Rundungs-Effekte). Logisch-zentrierte Scripts (Datum, Boolean, String) brauchen strikte Equality.

**Empfehlung für Welle-4-Scoping:** Beide Patterns als „valide Idiome" anerkennen, aber je nach Lib-Charakter (numerisch vs. logisch) den passenderen wählen. Nicht erzwingen.

---

## 6. Anomalien / Beobachtungen

**A-01 — `verify-ehegattenunterhalt.ts` ohne Lib-Import erkannt:** Sweep-Script konnte keinen `from '../lib/berechnungen/...'`-Import extrahieren. Das könnte bedeuten:
- Verify-Script verifiziert nur Component-Verhalten ohne Lib-Aufruf, ODER
- Import-Pattern weicht von der Konvention ab (z. B. `import {…} from '../lib/...'` ohne `berechnungen/`-Pfad), ODER
- Script ist Stub-only

→ Verify-Script benötigt eigene Inspektion in Phase B.

**A-02 — Slug↔Component-Naming-Drift:** 13 Components matchen nicht mit Slug-Convention (8 echte Mismatches, 5 Helper-Components). Beispiele:
- `KwPsRechner.tsx` vs. Slug `kw-ps-umrechner` (Kebab-Drift)
- `EinheitenRechner.tsx` vs. Slug `einheiten-umrechner` (Suffix `-rechner` vs. `-umrechner`)
- `PfaendungRechner.tsx` vs. Slug `pfaendungsrechner` (Plural-Genitiv)
- `GleichungsloeserRechner.tsx` vs. Slug `gleichungsrechner` (komplett anderer Stamm)
- `ProzVeraenderungRechner.tsx` vs. Slug `prozentuale-veraenderung-rechner` (Abkürzung im Component-Namen)
- `TaschenrechnerRechner.tsx` vs. Slug `wissenschaftlicher-taschenrechner` (Prefix-Drift)

Drift-Klasse: nicht-blockierend (Slug-drift-scan würde nichts melden, weil keine Cross-Links betroffen), aber irritierend für Auto-Mapping. Welle-4 könnte als Bonus eine `COMPONENT_SLUG_OVERRIDES`-Map an zentraler Stelle einführen statt im Inventar-Skript.

**A-03 — `aufstiegs-bafoeg-rechner` und `pfaendungsrechner` ohne Component-Match:** Die zugehörigen Components heißen `AfbgRechner.tsx` und `PfaendungRechner.tsx`, aber die Slug-Camel/Kebab-Heuristik fängt das nicht. `pfaendungsrechner` ist besonders bemerkenswert, weil die Lib `pfaendung.ts` durch `verify-pfaendung-p1/p2.ts` doppelt verifiziert ist — der Rechner-Slug konsumiert sie aber nicht im Auto-Mapping. Gehört in Welle-4-Scope: Mapping-Override-Liste pflegen, dann landet der Slug korrekt in ABGEDECKT.

**A-04 — `verify-gesundheit-p2.ts` Quellen-Heuristik fängt „OLG/DT" als False-Positive:** Das Test-Heuristik-Pattern matcht „Düsseldorf" überall, auch außerhalb des Düsseldorfer-Tabelle-Kontexts. Niedrige Priorität, nur Klassifikations-Rauschen.

**A-05 — KFZ-Steuer-Component-Coverage-Diskrepanz:** Lib `kfz-steuer.ts` + `kfz-steuer-parameter.ts` durch `verify-kfz-steuer-p1.ts` verifiziert. Slug `kfz-steuer-rechner` zeigt in der Detail-Tabelle ABGEDECKT mit beiden Libs. Konsistent. ✓

**A-06 — Test-Anzahl-Detection-Lücke:** Pragmatisches Heuristik-Pattern (`eq(`/`test(`/`assert(`) erfasst nur 3 Scripts (verify-149d, verify-feiertage, verify-gesundheit-p3). Die übrigen 26 nutzen andere Idiome (cases.push, console.log mit ✓/✗, einfache Behauptungen mit `if(...)`). Welle-4-Scoping kann optional einen einheitlicheren Test-Counter-Hook in alle Scripts einziehen — aber niedrige Prio.

**A-07 — Helpers-Lib `_helpers.ts` als „verifiziert" zählen?** `_helpers` taucht in unverifizierten Libs auf, weil keine `verify-_helpers.ts` existiert. Aber `_helpers` enthält pro Konvention nur kleine Utility-Funktionen (Rundung, Konstanten) — separates Verify-Script wäre overkill. Welle-4-Scoping sollte definieren: Lib-Files mit Underscore-Prefix sind „nicht-zu-verifizierende Helpers".

---

## 7. Hinweise zur Klassifikations-Sicherheit

**Sicher klassifizierbar (>90 % Konfidenz):**
- Mathe-Kategorie: alle 18 Slugs sind ORACLE-MENGEN (rein arithmetisch, kein externes Oracle), bis auf 2 Grenzfälle:
  - `notenschluessel-rechner` — KMK-Konvention für Punkte→Note, eher ORACLE-MARKT (es gibt regionale Variationen pro Bundesland-Kultusministerium)
  - `noten-international` — Mapping-Tabelle, ORACLE-MARKT (Konvention)
- Kochen-Kategorie: alle 12 ORACLE-MENGEN (Mengen-/Zeit-Konversionen, kein hartes externes Oracle)

**Klassifikations-Grenzfälle für Karsten-Entscheid:**

| Slug | Vorschlag | Begründung |
|---|---|---|
| `notenschluessel-rechner` | ORACLE-MARKT vs. ORACLE-MENGEN | KMK-Kultusministerien-Konventionen sind je Bundesland nicht einheitlich |
| `abi-rechner` | ORACLE-MARKT | KMK-Punkteschlüssel ist Konvention, kein Gesetz |
| `fuehrerschein-rechner` | ORACLE-MARKT | Fahrschulkosten je Region/Anbieter — kein einheitliches Oracle |
| `fahrrad-rahmengroesse-rechner` | ORACLE-MARKT vs. ORACLE-MENGEN | Branchenformel (Schrittlänge × Faktor), keine harte Norm |
| `mietrechner` | ORACLE-MARKT | Mietrendite-Schätzung, kein hartes Soll |
| `streaming-kosten-rechner` / `kaffee-kosten-rechner` / `lieferservice-rechner` / `abo-rechner` | ORACLE-MENGEN | Konsumkosten-Mengen × Preis — keine externe Validation sinnvoll |
| `gehaltsvergleich` | ORACLE-MARKT | Destatis-Lohn-Statistik möglich, aber Konfig zeigt vermutlich freie Eingabe → Karsten klärt |
| `inflationsrechner` | ORACLE-VERFÜGBAR | Destatis VPI ist hartes Oracle (vpi.ts ist bereits verifiziert für andere Rechner — Konsumption durch inflationsrechner prüfen) |
| `aufstiegs-bafoeg-rechner` | ORACLE-VERFÜGBAR | AFBG-Lib (`afbg.ts`) ist durch `verify-afbg.ts` verifiziert — Slug landet wahrscheinlich in ABGEDECKT, sobald A-03 Mapping-Lücke geschlossen |
| `firmenwagen-rechner` | ORACLE-VERFÜGBAR | § 6 Abs. 1 Nr. 4 EStG ist klar — KEINE-LIB-Status zeigt nur, dass die Component die Berechnung inline macht; Welle-4 könnte `firmenwagen.ts` extrahieren + verifizieren |
| `afa-rechner` | ORACLE-VERFÜGBAR | § 7 EStG ist klar — analog firmenwagen, KEINE-LIB-Status weist auf inline-Berechnung |
| `riester-rechner` | ORACLE-VERFÜGBAR | AltZertG + § 10a EStG — analog |
| `mietpreisbremse-rechner` | ORACLE-VERFÜGBAR | BGB §§ 556d-g — analog |
| `vorfaelligkeitsentschaedigung-rechner` | ORACLE-VERFÜGBAR | BGB §§ 489/502 + BGH-Rechtsprechung |
| `grundsteuer-rechner` | ORACLE-VERFÜGBAR | GrStG ab 01.01.2025 |
| `herzfrequenz-zonen-rechner` | ORACLE-VERFÜGBAR | Tanaka/Fox/Karvonen-Formeln (Sportmedizin) |

**Anzahl unsicher: ~16 Grenzfälle**, alle mit Tendenz angegeben. Karsten entscheidet pro Grenzfall im Welle-4-Scoping-Doku.

---

**Bereit für Welle-4-Scoping-Doku-Erstellung.** Karsten reviewt das Inventar (insb. Grenzfälle in Sektion 7 + Anomalien A-01 bis A-07), dann formuliert das Scoping-Doku die konkreten Welle-4-Module + Aufwand-Schätzungen + Reihenfolge.
