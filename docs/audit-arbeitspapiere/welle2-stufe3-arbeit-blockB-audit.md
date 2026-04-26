# Welle 2 Stufe 3 Arbeit – Block-B-Audit

**Audit-Datum:** 26.04.2026  
**Audit-Methodik:** Welle-2-4-Punkt (Formel/Rechtsquelle · Input-Validierung · Edge Cases · SSOT)  
**Quelle:** `docs/audit-bundles/block-b-arbeit.md` (generiert 2026-04-26T19:30:42, 13 Dateien)  
**Vorgänger:** Block-A-Audit ([`welle2-stufe3-arbeit-blockA-audit.md`](./welle2-stufe3-arbeit-blockA-audit.md))  
**Folgeprompt-Ziel:** P1+P2 als 152-Batch, P3 als 153-Batch (oder mit Block-A-P3 zu 151 zusammenlegen)

---

## Block-B-Scope

8 Rechner ohne erwartete substanzielle P1-Befunde. Sortiert nach Konfig-Reihenfolge in `arbeit.ts`:

| # | Slug | Component | Lib(s) | Lib im Bundle? |
|---|---|---|---|---|
| 1 | `arbeitszeitrechner` | ArbeitszeitRechner.tsx | `arbeitszeit.ts` | ❌ fehlt |
| 2 | `urlaubstage-rechner` | UrlaubstageRechner.tsx | `urlaubstage.ts`, `_helpers.ts` | ✅ |
| 3 | `ueberstunden-rechner` | UeberstundenRechner.tsx | `ueberstunden.ts` | ❌ fehlt |
| 4 | `promillerechner` | PromilleRechner.tsx | `promille.ts` | ❌ fehlt |
| 5 | `rechtsschutz-rechner` | RechtsschutzRechner.tsx | `rechtsschutz.ts` | ❌ fehlt |
| 6 | `freelancer-stundensatz-rechner` | FreelancerStundensatzRechner.tsx | `freelancer-stundensatz.ts` | ❌ fehlt |
| 7 | `teilzeit-rechner` | TeilzeitRechner.tsx | `teilzeit.ts`, `brutto-netto.ts`, `_helpers.ts`, `sv-parameter.ts` | ✅ (teilzeit.ts; SSOT-Imports geprüft) |
| 8 | `arbeitstage-rechner` | ArbeitstageRechner.tsx | – (Logik inline) | n/a |

**Audit-Vollständigkeit:** 4/8 Libs vollständig prüfbar, 4/8 nur über Component-Aufruf-Signatur und Konfig-Beispiele indirekt prüfbar. Lib-spezifische Findings für die 5 fehlenden Dateien sind als P3-B-Folge-Audit markiert, nicht als blockierend.

---

## Bilanz

| Stufe | Anzahl | Erwartung |
|---|---|---|
| **P1** (gesetzlicher Bug, Rechner gibt aktiv falschen Wert) | **0** | 0 |
| **P2** (substanzielle Inkonsistenz / SSOT-Verletzung / falsche User-Erwartung) | **2** | ~3 |
| **P3** (Polish, Erklärtext-Korrektur, kosmetische SSOT) | **10** | ~12 |

Die Erwartungs-Schätzung im Pre-Audit-Plan stimmt — Block B liefert keine eskalationspflichtigen Bugs. Die zwei P2-Befunde sind beide in Konfig + Erklärtext, nicht in der Berechnungslogik selbst, und entsprechend günstig zu fixen.

---

## P2-Befunde

### P2-B1: `urlaubstage-rechner` — FAQ 6 + Beispiel widersprechen Code-Verhalten

**Files:**
- `lib/rechner-config/arbeit.ts` (urlaubstage-rechner: `beispiel`, `erklaerung`, `faq[5]`)
- *Belegende Lib:* `lib/berechnungen/urlaubstage.ts:berechneUrlaubsanspruch` (Z. „const gesamt = rundeBuRlGKonform(basis);")
- *SSOT:* `lib/berechnungen/_helpers.ts:rundeBuRlGKonform`

**Befund:** Drei Stellen behaupten Halbe-Tage-Rundung, Code rundet aber auf ganze Tage:

1. **FAQ 6** (`Wird der Urlaub auf halbe Tage gerundet?`) sagt: *„In der Praxis werden Bruchteile von Urlaubstagen häufig auf halbe Tage gerundet. Der Rechner rundet Ergebnisse auf halbe Tage."*
2. **`beispiel`-Feld**: `30 × 3/5 × 9/12 = 13,5 → 13,5 Tage`
3. **`erklaerung`** (Abschnitt „Urlaubsanspruch berechnen"): *„Das Ergebnis wird auf halbe Tage gerundet, wie es in der Praxis üblich ist."*

Tatsächliches Code-Verhalten: `rundeBuRlGKonform(13,5) = 14`. Die Lib folgt strikt § 5 Abs. 2 BUrlG: Bruchteile ≥ 0,5 Tag → ganzer Tag. Die FAQ enthält im selben Eintrag zwei sich widersprechende Sätze (Halbe-Tage-Behauptung + korrekte BUrlG-Aussage „ab 0,5 wird aufgerundet"); der zweite Satz beschreibt das Code-Verhalten.

**Rechtsquelle:** § 5 Abs. 2 BUrlG: *„Bruchteile von Urlaubstagen, die mindestens einen halben Tag ergeben, sind auf volle Urlaubstage aufzurunden."* (Lib korrekt; nur Erklärtexte falsch.)

**Wirkung beim User:** Eingabe „30 Tage / 3-Tage-Woche / Eintritt 01.04." → Rechner zeigt **14**, FAQ erwartet **13,5**. User-Verwirrung wahrscheinlich, weil das Beispiel im erklaerung explizit „13,5" als Endergebnis angibt.

**Empfohlener Fix (Konfig-only, kein Component-/Lib-Touch):**
- `beispiel`: `30 × 3/5 × 9/12 = 13,5 → 14 Tage (aufgerundet nach § 5 Abs. 2 BUrlG)`
- `erklaerung`-Satz: *„Das Ergebnis wird BUrlG-konform gerundet: Bruchteile ab einem halben Tag werden auf den nächsten ganzen Tag aufgerundet (§ 5 Abs. 2 BUrlG)."*
- FAQ 6 Antwort: *„Der Rechner rundet § 5 Abs. 2 BUrlG-konform auf ganze Urlaubstage. Bruchteile ab 0,5 Tag werden auf den nächsten ganzen Tag aufgerundet, Bruchteile darunter abgerundet — beides immer zugunsten des Arbeitnehmers."*

---

### P2-B2: `arbeitstage-rechner` — Hardcoded Feiertags-Liste, keine SSOT

**File:** `components/rechner/ArbeitstageRechner.tsx` (`FEIERTAGE_2026`-Konstante, 17 Einträge + Bundesland-Mapping)

**Befund:** Die Component definiert die komplette Feiertags-Logik inline — kein Import aus `lib/berechnungen/`. Konkret:
- `FEIERTAGE_2026: Feiertag[]` mit 17 Einträgen, alle als String `'MM-DD'`
- `BUNDESLAENDER`-Liste mit 16 Einträgen (Slug + Name)
- `isFeiertag(date, bl)` und `countArbeitstage(start, end, bl, arbeitstageProWoche)` ebenfalls inline

**Drei SSOT-Probleme:**

1. **Jahreswechsel-Tech-Schuld:** Für 2027 müssen die beweglichen Feiertage (Karfreitag, Ostermontag, Christi Himmelfahrt, Pfingstmontag, Fronleichnam) händisch berechnet und in eine `FEIERTAGE_2027`-Konstante eingetragen werden. Aktuell unterstützt das Jahr-Dropdown nur `<option value="2026">2026</option>` — ein Hard-Cap, der ohne Code-Change beim Jahreswechsel zum 01.01.2027 das Default-Jahr ungültig macht.
2. **Drift-Risiko bei Konsumenten:** Andere Rechner haben latenten Feiertags-Bedarf (PendlerpauschaleRechner für Arbeitstage-Schätzung 220/230, MutterschutzRechner für Schutzfrist-Stichtage, KuendigungsfristRechner für Werktag-Verschiebung). Wenn diese irgendwann ihre eigene Feiertags-Logik bauen, entsteht Drift.
3. **Bewegliche Feiertage als Konstante statt berechnet:** Die fünf österlichen Feiertage stehen als statisches Datum drin. Eine Lib mit Gauß-Algorithmus (Osterformel) berechnet sie für jedes Jahr deterministisch — kein Update-Risiko.

**Empfohlener Fix:** Lib `lib/berechnungen/feiertage.ts` einführen, ungefähr:

```ts
export type Bundesland = 'BW' | 'BY' | ... ; // 16er-Union
export interface Feiertag { datum: Date; name: string; laender: 'alle' | Bundesland[] }

export function getFeiertage(jahr: number, bundesland: Bundesland): Feiertag[]
export function isFeiertag(datum: Date, bundesland: Bundesland): Feiertag | null
export function zaehleArbeitstage(von: Date, bis: Date, bundesland: Bundesland, arbeitstageProWoche: number[]): { ... }
```

Mit Osterformel (z. B. nach Gauß / Spencer) für Karfreitag, Ostermontag (+1), Christi Himmelfahrt (+39), Pfingstmontag (+50), Fronleichnam (+60). Feste Feiertage (Neujahr, 1. Mai, 3. Oktober, Weihnachten, Allerheiligen, Reformationstag etc.) als Datums-Tupel-Map. Buß- und Bettag (SN) als Spezial-Algorithmus (Mittwoch vor 23. November).

ArbeitstageRechner.tsx zieht dann nur `BUNDESLAENDER`-Liste + `zaehleArbeitstage`, sonst nichts. Jahr-Dropdown wird automatisch zukunftsfähig (kann 2026, 2027, 2028, ... anbieten ohne Code-Change).

**Empfohlener Folge-Prompt:** Eigener Prompt 152a (oder als Welle-3-Vorbereitung, weil der Refactor mehrere Konsumenten haben könnte). Nicht kritisch genug für Sofort-Fix.

---

## P3-Befunde

### P3-B1: `ueberstunden-rechner` — Pauschale 40-%-Netto-Schätzung statt SSOT

**File:** `components/rechner/UeberstundenRechner.tsx` (Disclaimer „Die Nettoschätzung basiert auf einem pauschalen Abzug von ca. 40%") + Lib `ueberstunden.ts:berechneVerguetung` (vermutlich, Lib nicht im Bundle).

**Befund:** Die `verguetungNetto`-Spalte und das Hauptergebnis nutzen einen pauschalen 40-%-Abzug. Andere Rechner (Teilzeit, Brutto-Netto, Stundenlohn) nutzen `berechneBruttoNetto` aus `lib/berechnungen/brutto-netto.ts` mit Steuerklasse + Bundesland + KV-Zusatzbeitrag. Inkonsistent zur Repo-SSOT-Linie.

**Empfehlung:** P3 — niedrige Priorität, weil der Disclaimer bewusst ist und der User explizit eine grobe Orientierung erwartet. Aufwand wäre erheblich (Steuerklasse-Input + Bundesland in der UI ergänzen). Nicht im 152-Batch, eher als Welle-3-Item.

---

### P3-B2: `freelancer-stundensatz-rechner` — § 19 UStG-Erklärung unvollständig

**File:** `lib/rechner-config/arbeit.ts` (freelancer-stundensatz-rechner: `erklaerung` + FAQ 5)

**Befund:** Erklärtext sagt nur: *„Die Kleinunternehmerregelung (§ 19 UStG) befreit Freelancer mit einem Jahresumsatz unter 25.000 Euro (ab 2025) von der Umsatzsteuer."* Tatsächlich gilt seit Wachstumschancengesetz (01.01.2025) eine **zwei-stufige Schwelle**: *Vorjahr ≤ 25.000 € **und** laufendes Jahr ≤ 100.000 €* (siehe CLAUDE.md Tabellenzeile „§ 19 UStG Kleinunternehmer"). Wer im Vorjahr unter 25.000 € lag, kann im laufenden Jahr bis 100.000 € umsetzen, ohne sofort umsatzsteuerpflichtig zu werden — diese 100.000-€-Obergrenze fehlt im Erklärtext komplett.

**Empfohlener Fix:**
- `erklaerung`-Abschnitt „Kleinunternehmerregelung": Satz ergänzen *„Maßgeblich sind zwei Schwellen: Der Vorjahresumsatz darf 25.000 € nicht überstiegen haben, und der laufende Jahresumsatz darf voraussichtlich 100.000 € nicht übersteigen. Wird die zweite Schwelle unterjährig überschritten, wird der Freelancer für die übersteigenden Umsätze sofort umsatzsteuerpflichtig."*
- FAQ 5 Antwort entsprechend anpassen (aktuell nur „keine USt bis 25.000 € Jahresumsatz" — falsch verkürzt).

---

### P3-B3: `teilzeit-rechner` — Entgeltpunkte-Beispiel basiert auf altem Durchschnittsentgelt

**File:** `lib/rechner-config/arbeit.ts` (teilzeit-rechner: `erklaerung` Abschnitt „Teilzeit und Rente")

**Befund:** Erklärtext sagt: *„Bei 3.500 € Vollzeit-Brutto erwirbt man etwa 0,9 Entgeltpunkte pro Jahr. In Teilzeit mit 30 Stunden (2.625 € Brutto) sind es nur noch etwa 0,68 Punkte."*

Nachrechnung mit Durchschnittsentgelt 2026 (vorläufig 51.944 €, CLAUDE.md):
- Vollzeit: 3.500 × 12 / 51.944 = **0,808 EP** (nicht 0,9)
- Teilzeit: 2.625 × 12 / 51.944 = **0,606 EP** (nicht 0,68)

Die Folge-Schätzung „nach 20 Jahren ca. 170 € niedrigere Monatsrente" stimmt zufällig recht gut: (0,808 − 0,606) × 20 × 40,79 = 164,79 € — also 165 €, nicht 170 €. Auch zufällig nahe genug, dass kein User stolpert. Aber die Punkt-Werte selbst sind veraltet (vermutlich auf 2024er Durchschnittsentgelt 45.358 € basierend: 3500×12/45358 = 0,926 ≈ 0,93).

**Empfohlener Fix:** `0,9` → `0,81`, `0,68` → `0,61`, `170 €` → `165 €`. Drei Zahlen-Korrekturen im Erklärtext.

---

### P3-B4: `arbeitstage-rechner` — Begriff „Werktage" für Mo–Fr falsch verwendet

**File:** `components/rechner/ArbeitstageRechner.tsx` (Result-Box `davon ${ergebnis.werktage} Werktage (Mo–Fr)` + `werktage`-Feld in `countArbeitstage`)

**Befund:** Die Component zählt unter dem Label „Werktage" alle Tage Mo–Fr und subtrahiert davon die Feiertage. Das ist im **alltagssprachlichen** Sinne korrekt, aber **juristisch falsch**: § 3 Abs. 2 BUrlG definiert Werktage als *„alle Kalendertage, die nicht Sonntage oder gesetzliche Feiertage sind"* — also Mo–Sa. Im urlaubstage-rechner wird derselbe Begriff korrekt verwendet (5-Tage-Woche = 20 Werktage, 6-Tage-Woche = 24 Werktage Minimum).

**Folge:** Inkonsistente Terminologie zwischen den beiden Arbeit-Rechnern. User, der von urlaubstage-rechner („6-Tage-Woche = 24 Werktage") zu arbeitstage-rechner wechselt und im Januar „22 Werktage (Mo–Fr)" sieht, ist verwirrt.

**Empfohlener Fix:** Component-Label tauschen: `davon ${ergebnis.werktage} Wochentage Mo–Fr · ${ergebnis.feiertage} Feiertage abgezogen`. Variable `werktage` in der Lib kann unverändert bleiben (interner Name), nur das User-sichtbare Label ändern.

---

### P3-B5: `arbeitszeitrechner` — Faktor 4,33 statt SSOT WOCHEN_PRO_MONAT

**File:** `lib/rechner-config/arbeit.ts` (arbeitszeitrechner) und `ueberstunden-rechner: erklaerung` Faktor 4,33

**Befund:** Die Erklärtexte und FAQs verwenden gerundete „4,33"-Zahl. Die SSOT in `_helpers.ts` ist `WOCHEN_PRO_MONAT = 52 / 12` (≈ 4,3333…). Konsistenter wäre, im Erklärtext von „etwa 4,33 (genauer: 52/12)" zu sprechen — und in den Components/Libs strict den Bruch zu verwenden.

**Lib-Status:** Nicht prüfbar (`arbeitszeit.ts` und `ueberstunden.ts` nicht im Bundle). Bei `teilzeit.ts` ist die Verwendung sauber (`vollzeitStunden * WOCHEN_PRO_MONAT`).

**Empfehlung:** Folge-Prompt sollte beim Lib-Check sicherstellen, dass `arbeitszeit.ts` und `ueberstunden.ts` ebenfalls die SSOT-Konstante importieren. Erklärtext-Update niedrige Priorität.

---

### P3-B6: `promillerechner` — Resorptionsdefizit-Faktor in Lib unbekannt

**File:** `lib/berechnungen/promille.ts` (nicht im Bundle)

**Befund:** Standard-Widmark-Formel BAK = A / (m × r) liefert den **Maximalwert** ohne Resorptionsverluste. In der medizinisch-juristischen Praxis wird je nach Kontext ein Resorptionsdefizit von 10 % (Standard) oder 20 % (BGH-Linie für Strafverteidigung) angesetzt: BAK_real = A × (1 − Defizit) / (m × r). Im Konfig-Beispiel `BAK = 40 ÷ (80×0,68) − 0,3 = 0,44‰` ist kein Defizit eingerechnet (40/54,4 = 0,735, minus 0,3 Abbau = 0,44 — passt zur Ohne-Defizit-Variante).

Die Frage ist, ob die Lib das **bewusst** so macht (höchste Schätzung als Sicherheits-Netz für den User → „lieber zu hoch geschätzt als zu niedrig") oder unbewusst.

**Empfehlung:** Beim Folge-Lib-Audit prüfen und im Erklärtext kurz dokumentieren („Ohne Resorptionsdefizit gerechnet — höchster realistischer Wert"). Niedrige Priorität, weil der Disclaimer am Ende des Rechners ohnehin sehr deutlich ist.

---

### P3-B7: `rechtsschutz-rechner` — Marktwerte ohne dokumentierte Basis

**File:** `lib/berechnungen/rechtsschutz.ts` (nicht im Bundle), `BAUSTEINE`-Konstante mit Preisen

**Befund:** Die Component nutzt fixe Bausteinpreise (im Beispiel: Privat 15 €, Beruf 8 €, Verkehr 5 €) sowie Berufs-Faktoren und Selbstbeteiligungs-Rabatte. Im Erklärtext werden diese als „Durchschnittswerte" bezeichnet, aber es gibt keine dokumentierte Quelle (z. B. GDV-Statistik, Stiftung Warentest, Verbraucherzentrale). Das ist konsistent mit der CLAUDE.md-Linie für reine Markt-Schätzer (kein gesetzlicher Tatbestand → Schätzwerte plus Disclaimer).

**Empfehlung:** Im Lib-Header eine Quelle dokumentieren („Stand 04/2026, Mittelwerte aus drei großen Anbietern X/Y/Z"). Niedrige Priorität — beim nächsten Lib-Refactor mitnehmen.

---

### P3-B8: `arbeitszeitrechner` — Slug ohne Bindestrich (informativ, nicht änderbar)

**File:** `lib/rechner-config/arbeit.ts` (slug: `'arbeitszeitrechner'`)

**Befund:** Sieben der acht Block-B-Rechner verwenden Bindestrich-Slugs (`urlaubstage-rechner`, `ueberstunden-rechner`, `freelancer-stundensatz-rechner`, `teilzeit-rechner`, `rechtsschutz-rechner`, `arbeitstage-rechner`). Die Ausnahmen sind `arbeitszeitrechner` und `promillerechner`. Historisch gewachsene Inkonsistenz, **nicht änderbar** ohne 301-Redirects und SEO-Risiko.

**Empfehlung:** Nur dokumentieren in `welle-status-historie.md` oder `rechenfix-projekt-referenz.md` als bekannte Inkonsistenz. Künftige neue Slugs sollten konsistent Bindestrich verwenden.

---

### P3-B9: `promillerechner` — Slug-/Kategorie-Drift (bereits dokumentiert, informativ)

**File:** `lib/rechner-config/arbeit.ts` (slug: `'promillerechner'`, kategorie: `'Arbeit & Recht'`)

**Befund:** Bereits in CLAUDE.md Lehre 132.5 dokumentiert: *„`promillerechner` wird unter `/gesundheit/` oder `/alltag/` erwartet, liegt aber in `/arbeit/`."* Slug-Drift-Scan (132.6) whitelistet das. Korrekt eingeordnet, weil Hauptkonsumenten Promille-Grenzwerte im Straßenverkehr und arbeitsrechtliche Folgen sind. Keine Aktion erforderlich.

---

### P3-B10: 5 Libs nicht im Bundle → Folge-Bundle empfohlen

**Files:** `lib/berechnungen/arbeitszeit.ts`, `promille.ts`, `freelancer-stundensatz.ts`, `rechtsschutz.ts`, `ueberstunden.ts`

**Befund:** Für vollständigen 4-Punkt-Audit fehlen die Libs der Components Arbeitszeit/Überstunden/Promille/Freelancer/Rechtsschutz. Audit konnte über Konfig-Beispiel + Component-Aufruf-Signatur indirekt geprüft werden — aber Formel-Korrektheit, Edge-Case-Behandlung und SSOT-Imports lassen sich nicht final verifizieren.

**Empfehlung:** Folge-Bundle `docs/audit-bundles/block-b-libs.md` mit den fünf Lib-Dateien. Falls beim Lib-Audit substanzielle P1/P2 auftauchen, neuer Audit-Bericht-Append an dieses Dokument; sonst Schließung der Stufe 3 Arbeit.

---

## Quick-Ref-Tabelle

| ID | Stufe | Rechner | Typ | Files |
|---|---|---|---|---|
| P2-B1 | P2 | urlaubstage-rechner | Erklärtext-Drift zu Code | `arbeit.ts` |
| P2-B2 | P2 | arbeitstage-rechner | SSOT fehlt (Feiertage) | `ArbeitstageRechner.tsx` |
| P3-B1 | P3 | ueberstunden-rechner | Pauschale 40 % statt SSOT | `UeberstundenRechner.tsx`, `ueberstunden.ts` |
| P3-B2 | P3 | freelancer-stundensatz-rechner | § 19 UStG-Schwelle unvollständig | `arbeit.ts` |
| P3-B3 | P3 | teilzeit-rechner | EP-Beispiel veraltet (0,9 → 0,81) | `arbeit.ts` |
| P3-B4 | P3 | arbeitstage-rechner | Begriff „Werktage" Mo-Fr | `ArbeitstageRechner.tsx` |
| P3-B5 | P3 | arbeitszeitrechner / ueberstunden | 4,33 statt SSOT 52/12 | `arbeit.ts`, ggf. Libs |
| P3-B6 | P3 | promillerechner | Resorptionsdefizit unbekannt | `promille.ts` (Lib fehlt) |
| P3-B7 | P3 | rechtsschutz-rechner | Markt-Quelle undokumentiert | `rechtsschutz.ts` (Lib fehlt) |
| P3-B8 | P3 | arbeitszeitrechner | Slug ohne Bindestrich | informativ |
| P3-B9 | P3 | promillerechner | Slug+Kategorie-Drift | informativ (132.5) |
| P3-B10 | P3 | 5 Libs | Audit-Bundle unvollständig | `arbeitszeit.ts`+4 |

---

## Empfehlungen für Folge-Prompts

### Prompt 152 — P2-Sofort-Fix-Batch (atomare Sub-Commits)

- **152a** Konfig-only — P2-B1 urlaubstage-rechner Erklärtext-Korrektur (3 Stellen: `beispiel`, `erklaerung`, `faq[5]`). Sehr klein, Konfig-only, ohne Lib-/Component-Touch. Aufwand ~10 min.
- **152b** Refactor — P2-B2 SSOT-Lib `feiertage.ts` mit Osterformel + 16-BL-Map + ArbeitstageRechner-Migration + Jahr-Dropdown auf 2026/2027/2028 öffnen. Aufwand ~2-3 h. *Optional* parken bis Welle 3, weil kein akuter User-Schaden.

### Prompt 153 (oder Erweiterung von 151) — P3-Sammelbatch

- **153a** Konfig-only — P3-B2 (UStG-100k-Schwelle), P3-B3 (EP-Werte 0,9→0,81), P3-B5 (4,33-Erwähnungen) als Erklärtext-Updates in einem Commit.
- **153b** Component-only — P3-B4 (Werktage-Label in ArbeitstageRechner.tsx auf „Wochentage Mo–Fr"). Eine Zeile.
- **153c** *Optional gepufferter* Block-B-Lib-Audit nach Bundle-Update (neue URL `docs/audit-bundles/block-b-libs.md`). Schließt P3-B6, P3-B7, P3-B10 + ggf. neue Sub-Findings ab.

### Prompt 154 — Welle-2-Stufe-3-Arbeit-Abschluss

Sobald 152a/b und 153a/b durch sind:
- Update `welle-status-historie.md`: Welle 2 Stufe 3 Arbeit → ✅
- CLAUDE.md Projekt-Status-Block: Stufe-3-Status auf „abgeschlossen"
- Empfehlung Welle 3: Validation-Sweep (Inkognito-Cross-Checks aller Welle-2-Rechner gegen externe Oracles).

---

## Audit-Methodik-Lehre (für `welle-status-historie.md`)

**Audit-Bundle als URL ist das richtige Pattern** (Lehre aus dieser Session). Vorbereitung durch Karsten:
- Generator-Skript `scripts/build-audit-bundle.mjs` mit `--block` und `--output` Parametern
- Zentrale Doku im Bundle-Header (Generierungs-Datum, Datei-Liste mit Größen)
- Vollständige Datei-Inhalte als ` ```ts/tsx ` Code-Blöcke

Claude-seitig: `web_fetch` mit `text_content_token_limit: 300000` (default reicht nicht für 149+-KB-Bundles). Bei Bundles > 350 KB Auteilung in `block-b-arbeit-konfig.md` + `block-b-arbeit-components.md` empfohlen, weil web_fetch hard-cap > 300k unsicher.

**Fehlende Libs als bewusste Audit-Lücke akzeptabel**, wenn die Component-Konfig-Pair indirekt prüfbar ist (Beispiel-Werte nachrechnen → Konsistenz zur Formel ableiten). Lücke explizit im Bericht markieren (siehe P3-B10) und Folge-Bundle empfehlen — nicht still ignorieren.

---

## Status-Update (26.04.2026, nach Patch-Anwendung)

| Befund | Stufe | Status | Commit / Anmerkung |
|---|---|---|---|
| P2-B1 | P2 | ✅ behoben | 12eb666 (Prompt 152a) |
| P2-B2 | P2 | ⏳ geparkt (Welle 3) | feiertage.ts SSOT-Lib, ~2–3 h |
| P3-B1 | P3 | ⏳ geparkt (Welle 3) | ueberstunden-Netto-Refactor mit Steuerklasse + Bundesland |
| P3-B2 | P3 | ✅ behoben | Prompt 153a |
| P3-B3 | P3 | ✅ behoben | Prompt 153a |
| P3-B4 | P3 | ✅ behoben | Prompt 153b + 153b-fix (Bonus AiExplain-Key) |
| P3-B5 | P3 | ✅ kein Fix nötig | Erklärtext nennt SSOT-Quelle „52 Wochen ÷ 12 Monate" bereits |
| P3-B6 | P3 | ⏳ geparkt | Lib-Audit-Bundle (Folge-Prompt 153c) |
| P3-B7 | P3 | ⏳ geparkt | Lib-Audit-Bundle (Folge-Prompt 153c) |
| P3-B8 | P3 | informativ | Slug-Inkonsistenz `arbeitszeitrechner` historisch |
| P3-B9 | P3 | informativ | Slug+Kategorie-Drift `promillerechner` (CLAUDE.md Lehre 132.5) |
| P3-B10 | P3 | ⏳ geparkt | Folge-Bundle 153c für 5 fehlende Libs |

**Block-B-Bilanz:** Alle behebbaren Konfig- und Component-Befunde sind geschlossen. Geparkte Items haben klare Folge-Prompts (152b, 153c) oder sind als historisch dokumentiert.

### Bonus-Befund während Patch-Anwendung (P3-B4 Cleanup)

Bei der Anwendung von 153b in Claude Code wurde eine zweite Stelle in `ArbeitstageRechner.tsx` gefunden: der `AiExplain`-`ergebnis`-Object-Key `'Werktage (Mo–Fr)'` (etwa Zeile 229). Im Original-Audit nicht erfasst, weil das Audit auf User-sichtbare Texte fokussiert war. Nachgezogen als 153b-fix. Lehre 20 in `welle-status-historie.md` dokumentiert die Methodik-Konsequenz: Bei Audit-Suchen nach Begriffen alle Vorkommen prüfen, nicht nur sichtbare UI-Stellen — auch interne Object-Keys, AiExplain-Eingaben und ErgebnisAktionen-Strings.

