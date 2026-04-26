# Rechenfix Welle-Status-Historie

**Zweck:** Konsolidierte Übersicht aller abgeschlossenen Audit-Wellen, offenen Punkte und Lessons-Learned. Ersetzt mehrere kleinere Memory-Einträge durch eine zentrale Doku-Datei.

**Update-Regel:** Bei Welle-Abschluss neuen Block oben einfügen. Memory-Eintrag verweist auf diese Datei.

**Stand:** 26.04.2026

---

## Welle 2 — Stufe 3 Arbeit (26.04.2026, ABGESCHLOSSEN)

### Block A — komplett (Prompts 149a–149d + 150a–150d)

**Audit-Bericht:** [welle2-stufe3-arbeit-blockA-audit.md](welle2-stufe3-arbeit-blockA-audit.md), 25.04.2026
**Scope Block A:** 10 rechtssensitive Arbeit-Rechner
**Befunde:** 4× P1 (alle gefixt) + 6× P2 (alle gefixt) + ~17× P3 (offen für 151)
**Commits gesamt:** 7 atomic — 149a–d (4 commits) + 150a–d (4 commits)
**Verify-Tests:** 16 (149c) + 28 (149b) + 49 (149d Assertions in 8 Test-Cases) grün gegen externe Primärquellen

**P1-Block (Prompts 149a + 149b + 149c + 149d):**

- **P1-A8 — arbeitslosengeld-rechner Migration** (Prompt 149a, Commit aa05899): Eintrag deklarierte `kategorie: 'Finanzen'`, lag aber in `arbeit.ts` → SSOT-Konsistenz pro Kategorie-Datei verletzt. Migration nach `finanzen.ts`, Slug + URL `/finanzen/arbeitslosengeld-rechner` unverändert. Bonus-Fixes: KurzarbeitergeldRechner CrossLink `/arbeit/...` → `/finanzen/...`, Markdown-Link in Erklärtext nachgezogen. Slug-Drift-Scan grün.

- **P1-A6 — zugewinnausgleich § 1376 BGB Indexierung** (Prompt 149b, Commit ee14d93): Ignorierte Indexierung des Anfangsvermögens nach § 1376 BGB komplett. Konfig sagte „Zugewinn = Endvermögen − Anfangsvermögen". Korrekt: indexiertes AV = AV × VPI(End) / VPI(Heirat). Bei längeren Ehen erheblicher Berechnungseffekt — Beispiel Heirat 2010 → Scheidung 2026 (Index-Faktor 1,405): AV 15.000 € → indexiert 21.084 € → Zugewinn 58.916 € statt 65.000 €; Beispiel-Ausgleich 27.028 € statt 25.000 €.
  - **vpi.ts erweitert**: Werte 1995–2019 ergänzt (Destatis Lange Reihe, Tabelle 61111-0001), `getVpi(jahr)` mit Fallback auf VPI_AKTUELL für laufendes Jahr, `indexiereVermoegen(betrag, jahrAnfang, jahrEnde)`-Helper.
  - **Component**: Heiratsjahr- und Endstichtag-Inputs + privilegJahr pro Partner; Detailtabelle mit Indexierungs-Zeile + Faktor-Anzeige; Out-of-Range-Fallback mit Hinweis-Box.

- **P1-A10 — ehegattenunterhalt SB-Achse** (Prompt 149c, Commit a151a4c): Selbstbehalts-Achse vertauscht. Konfig sagte „Trennung 1.600 € / nachehelich 1.475 € — niedriger weil Bindung schwächer" — die Bindung-schwächer-Begründung war erfunden. Korrekte DT-2026-Achse: 1.600 € (erwerbstätig) / 1.475 € (nicht erwerbstätig), gilt für Trennungsunterhalt UND nachehelich gleichermaßen. Component: neuer State `pflichtigerErwerbstaetig` + UI-Toggle. `art`-State (trennung/nachehelich) bleibt für andere fachliche Belange (§ 1614, § 1578b), beeinflusst aber nicht mehr den SB.

- **P1-A5 — scheidungskosten KostBRÄG 2025 + RVG-Tabellen-Trennung** (Prompt 149d, Commit b6c81b9): Audit-Befund war „KostBRÄG 2025 Tabellen-Update" — Pre-Check ergab zusätzlich einen tieferen P1: Lib hatte **Anwaltsgebühren mit der FamGKG-Tabelle** statt mit der RVG-Tabelle (Anlage 2 zu § 13 RVG) berechnet. RVG-Werte liegen ~2,1× über FamGKG → Anwaltskosten waren systematisch um ~50 % zu niedrig.
  - **Lib komplett refactort**: getrennte `FAMGKG_TABELLE_2025` + `RVG_TABELLE_2025` (BGBl. 2025 I Nr. 109, in Kraft 01.06.2025), gestaffelter Über-50k-Fallback (15k-Stufung bis 200k, 30k-Stufung darüber), Auslagenpauschale Nr. 7002 VV RVG mit korrektem Cap `Min(0,2 × Gebühren, 20 €)`.
  - **Konfig**: formel + beispiel + erklaerung + FAQ 1 mit korrigierten Werten neu.
  - **Component**: Hinweis-Block ergänzt um KostBRÄG-2025-Stand-Hinweis. Detail-Tabelle unverändert.
  - **Auswirkung VW 16.500 € einvernehmlich + VA**: Gesamt 1.719 € → 4.176 €. Realistisch und rechtskonform.
  - **Inkognito-Verifikation grün** für 5 Test-Eingaben.

### Block A — P2-Polish-Batch (Prompt 150)

**Reine Konfig-Updates** in `lib/rechner-config/arbeit.ts` — kein Component- oder Lib-Touch, kein Verify-Script (nichts Berechnetes zu verifizieren).

- **P2-A4 — mutterschutz** (Prompt 150a, Commit 35946b1): Mutterschutzanpassungsgesetz 24.02.2025 (BGBl. 2025 I Nr. 59) ab 01.06.2025 — gestaffelte Fehlgeburt-Schutzfristen 2/6/8 Wochen ab 13./17./20. SSW + erweiterter Kündigungsschutz ab 12. SSW (§ 17 MuSchG). Behinderungs-Verlängerung präzisiert: Antragspflicht (4 Wochen auf Antrag bei ärztlicher Feststellung in den ersten 8 Wochen nach Geburt), nicht automatischer 12-Wochen-Schutz wie bei Mehrlingen. Neuer Erklärtext-Block + neue FAQ-Frage.

- **P2-A7 — unterhalt Elternunterhalt** (Prompt 150b, Commit ee51c05): Veraltete Formel „30 % über SB 2.650 €" ersetzt durch korrekte 50 %-Methode über SB 2.000 € (DT 2026), nur ab Bruttojahreseinkommen > 100.000 € pro Kind (§ 94 Abs. 1a SGB XII seit Angehörigen-Entlastungsgesetz 10.12.2019, in Kraft 01.01.2020). Neuer Erklärtext-Block schließt thematische Lücke (metaTitle nannte „Elternunterhalt-Abschnitt", Erklärtext hatte ihn aber gar nicht).

- **P2-A9 — elternzeit** (Prompt 150c, Commit 8a28cbb): 30-h-Aussage gestrichen (BEEG-Reform 01.09.2021 hat Schwelle auf 32 h angehoben, alte Grenze stand widersprüchlich im selben Absatz). § 15 Abs. 6 BEEG-Voraussetzungen klargestellt: 15–32 h ist Korridor des klagbaren Teilzeit-Anspruchs (≥6 Mon. Betriebszugehörigkeit, >15 AN, mind. 2 Mon.), nicht Grenze für „in Elternzeit sein". FAQ nachgezogen.

- **P2-A10 — ehegattenunterhalt Süd-OLG-Hinweis** (Prompt 150d, Commit 7381c78): Hinweis auf Süddeutsche Leitlinien 45 % statt 3/7 in OLG-Bezirken Bamberg, Karlsruhe, München, Nürnberg, Stuttgart, Zweibrücken — relevant für Karstens Standort und ~1/3 der bundesdeutschen Nutzer. Berechnung bleibt 3/7 (BGH-Standard), Hinweis auf Faktor 1,05 für süddeutsche Verfahren. **Volle UI-Toggle bewusst nicht in 150** — als optionaler Folge-Commit 150e geparkt, wenn fachlich gewünscht.

**Methodische Lehren aus 149/150-Block:**

- **Backtick-Falle in Template-Literals** (149b-Erfahrung): Inline-Code-Backticks im Erklärtext schließen das umgebende Template-Literal vorzeitig → esbuild-Fehler. Ersetzt durch Klartext.
- **Phantom-Befund-Vermeidung** (149c-Pre-Check, 147c-Pre-Check): Vor dem Fix Code lesen und gegen Audit-Befund abgleichen. Bei Diskrepanz STOP statt No-Op-Commit. (147c hatte zwei Phantom-Befunde P1.2/P2.1, die im Code nicht existierten.)
- **Test-Soll-Werte unverrundet rechnen**: UI rundet via Math.round, Verify-Tests müssen exakt gegen die Lib-Logik prüfen (149b hatte 4 Tests mit eigener Math-Drift, korrigiert auf Lib-Output).
- **Audit-Befund-Erweiterung im Pre-Check ist legitim** (149d-Lehre): Wenn Lib-Inspektion einen tieferen Bug zeigt als der Audit-Bericht beschreibt, ist Erweiterung des Scopes angezeigt. A5 hatte „1,0-Gebühr-Update" als Befund, der eigentliche P1 war die fehlende RVG-Tabellen-Trennung. Pre-Check via Plain-JS-Mirror der Lib hat alle 7 Test-Soll-Werte vor Verify-Script-Bau verifiziert.
- **Verify-Skripte Convention** (149d-Lehre): Endung `.ts` (NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`), Helper-Parameter explizit typisiert (z.B. `eq(name: string, ist: number, soll: number, tol = 0.005)`). Mjs-mit-.ts-Suffix-im-Import scheitert sowohl beim Loader als auch beim `next build` strict-typecheck.
- **Audit-Zeilennummern können bei Welle-internen Folge-Prompts veralten** (150-Lehre): Audit-Bericht referenzierte z.B. „Z. 1227" für 30h/32h-Inkonsistenz im elternzeit-rechner — durch 149a–d-Umbauten lag sie aktuell in Z. 1188. Im Pre-Check immer gegen Live-Code verifizieren, Audit-Zeilennummern als Orientierung nutzen, nicht als Anker. Befunde selbst waren alle real, kein Phantom.
- **Slug-Verifikation für Cross-Links via grep** (150b-Praxis): Bei neuen `[Text](/<kat>/<slug>)`-Cross-Links im Erklärtext direkt `grep <slug> lib/rechner-config/<kat>.ts` als Quick-Check. Konsistent mit Rule 11 (SSOT-Slug-Verifikation).
- **client-data.ts ist FAQ/erklaerung-frei** (150-Beobachtung): Bei reinen Konfig-Text-Updates bleibt die generierte client-data.ts unverändert — FAQ und Erklärtext gehen nicht in den 96 KB Light-Bundle. Heißt: Erklärtext-Erweiterungen sind aus Performance-Sicht kostenlos.

**Offen Block A für 151 + 150e:**
- **150e (optional):** Süd-OLG-UI-Toggle für ehegattenunterhalt (RadioToggleGroup OLG-Bezirk + Lib-Faktor 3/7 vs. 0,45). Im Audit konservativ als P2 eingestuft, Hochstuf-Möglichkeit genannt. Aktuelle Konfig-Hinweis-Variante ist scope-konform mit P2.
- **151 P3-Sammelbatch (17 Items):** Mobilitätsprämie § 101 EStG, EuGH Kücükdeveci, BAG-Zugangsbeweis, § 1a Abs. 2 S. 3 KSchG, Muster 9 ab 01.01.2026, Frühgeburt-Definition, Totgeburt-Sonderregelung, Geltung Schülerinnen/Studentinnen seit 2018, 99-Tage-Mindestschutz, § 1610 BGB Bedarfsberechnung > DT-Höchstwert, § 1612a Abs. 3 BGB Alterssprung, Selbstbehalt-Wohnkosten DT-2026 spezifisch, 7. MUVÄndV BGBl. 2024 I Nr. 359, § 17 Abs. 1 BEEG Urlaubskürzung, Bindungszeitraum-Terminologie, § 16 Abs. 1 BEEG 3 Zeitabschnitte, weitere Polish-Items aus Block A. Empfehlung: nach Block-B-Audit als gemeinsamer Sammelbatch A+B.

### Welle 2 Stufe 3 Arbeit Block B — Audit + Polish (26.04.2026)

**Status:** funktional + kosmetisch geschlossen.

8 Rechner geprüft (4-Punkt-Methodik): arbeitszeitrechner, urlaubstage-rechner, ueberstunden-rechner, promillerechner, rechtsschutz-rechner, freelancer-stundensatz-rechner, teilzeit-rechner, arbeitstage-rechner. Bilanz: 0 P1, 2 P2, 10 P3 (Erwartung exakt getroffen). Audit-Bericht in `welle2-stufe3-arbeit-blockB-audit.md`, Audit-Bundle in `docs/audit-bundles/block-b-arbeit.md` (13 Files konsolidiert in einer Markdown-Datei, 149 KB).

**Behoben:**
- **152a (12eb666):** P2-B1 urlaubstage-rechner Erklärtext BUrlG-konform — drei Stellen (`beispiel`, `erklaerung`, `faq[5]`). Code-Lib unverändert (`rundeBuRlGKonform` in `_helpers.ts` war schon § 5 Abs. 2 BUrlG-konform). Sichtbare User-Änderung: Beispiel-Wert 13,5 → 14 Tage statt vorher fälschlich „→ 13,5 Tage".
- **153a (6a41650):** P3-B2 freelancer-stundensatz § 19 UStG-Schwelle ergänzt um 100.000 € laufendes Jahr (Wachstumschancengesetz seit 01.01.2025); P3-B3 teilzeit-rechner EP-Werte korrigiert (0,9 → 0,81 / 0,68 → 0,61 / Rentendifferenz 170 → 165 €, basierend auf DE 2026 = 51.944 € und Rentenwert 40,79 €).
- **153b (4fd6246) + 153b-fix (cf44704):** P3-B4 ArbeitstageRechner.tsx Begriff „Werktage Mo-Fr" → „Wochentage Mo-Fr" an zwei Stellen (Result-Box-Label + AiExplain Object-Key). Variable `werktage` als interner Name unverändert. Begründung: § 3 Abs. 2 BUrlG definiert Werktage als Mo-Sa, das Component zählt aber Mo-Fr — Konsistenz mit urlaubstage-rechner hergestellt.

**Geparkt:**
- **P2-B2** (`feiertage.ts` SSOT-Lib): Aufwand ~2–3 h, optional Welle 3. Begründung: ArbeitstageRechner.tsx hat hardkodiertes `FEIERTAGE_2026`-Array mit 17 Einträgen plus Bundesland-Mapping; Jahr-Dropdown bricht zum 01.01.2027 ohne Code-Change. Saubere Lösung via `lib/berechnungen/feiertage.ts` mit Gauß-Osterformel für bewegliche Feiertage und 16-BL-Map für feste Feiertage. Nicht akut, weil 2026 noch läuft.
- **P3-B1** (ueberstunden-Netto-Schätzung pauschale 40 %): Welle-3-Refactor, benötigt Steuerklasse + Bundesland-Inputs in der UI.
- **P3-B5:** kein Fix nötig (ueberstunden-Erklärtext nennt SSOT-Quelle „52 Wochen ÷ 12 Monate" bereits explizit).
- **P3-B6 / B7 / B10:** Lib-Audit-Bundle für 5 fehlende Libs (`arbeitszeit.ts`, `promille.ts`, `freelancer-stundensatz.ts`, `rechtsschutz.ts`, `ueberstunden.ts`) als Folge-Bundle 153c.
- **P3-B8 / B9:** Slug-Inkonsistenzen historisch (`arbeitszeitrechner` und `promillerechner` ohne Bindestrich, `promillerechner` Slug+Kategorie /arbeit/), nicht änderbar wegen 301-Redirect-Risiko.

**Methodik-Lehre 19 (Audit-Bundle-Pattern, 26.04.2026):**
- Konsolidiertes Audit-Bundle als Markdown-Datei in `docs/audit-bundles/` ist effizienter als URL-Liste pro Datei. Eine URL → ein web_fetch → alle Files. Bei Bundles >100 KB ist `text_content_token_limit: 300000` Pflicht (Default reicht nicht).
- Lib-Audit kann als Folge-Bundle abgehängt werden, wenn die Component+Konfig+Beispiel-Trio Konsistenz erlaubt. Beispiel-Werte manuell nachrechnen → Lib indirekt verifiziert. Bei Auffälligkeiten zweites Bundle nachschieben statt erstes Bundle aufblähen.

**Methodik-Lehre 20 (Reviewer findet Bonus-Bugs, 26.04.2026):**
- Bei Patch-Application durch Claude Code wurden Stellen gefunden, die im Original-Audit übersehen waren (P3-B4: AiExplain-Key zusätzlich zur Result-Box). Audit-Berichte sollten Component-Search systematisch („alle Vorkommen von 'Werktage'") statt nur sichtbarer UI-Stellen prüfen — auch interne Object-Keys, AiExplain-Eingaben und ErgebnisAktionen-Strings.
- Konsequenz für künftige Audits: Bei Begriffs-Korrekturen in Components grundsätzlich `grep -n` über alle Vorkommen im File, nicht nur visuell durchscannen.

---

## Welle 2 — Stufe 3 Wohnen (25.04.2026, ABGESCHLOSSEN)

### Stufe 3 Wohnen (25.04.2026, Prompts 147 + 147b + 147c + 148 + 148b)

**Scope:** 25 Rechner (Block A 12 rechtssensitiv + Block B 13 Mengen)
**Commits gesamt:** ~16 atomic Commits
**Verify-Tests:** 87+ grün gegen externe Primärquellen (Bundesnetzagentur, BT-Drs. 21/322, BDEW, KfW, Mertens, VDI 6002, DWD, DIA, PVGIS)

**Neue SSOT-Libs in `lib/berechnungen/`:**
- `strompreis.ts` — BDEW-Mittel + WP-Tarif + Grundversorgung
- `eeg-einspeiseverguetung.ts` — Halbjahres-Schalter nach § 49 EEG
- `beg-foerderung.ts` — KfW 458 Boni-Logik (max. 70%)
- `vpi.ts` — Destatis VPI-Werte (in 149b um Werte 1995–2019 erweitert)
- `pv-ertragsmodell.ts` — 8 Ausrichtungs- × 5 Neigungsstufen nach Mertens, PR=0,85

**Hauptbefunde Block A (147):**
- PV-Einspeisevergütung 8,03 → **7,78 ct/kWh** (war 2 Jahre veraltet, vier Halbjahres-Degressionen versäumt)
- GrESt-Sätze aktualisiert: Bremen 5,0→5,5 (01.07.2025), Sachsen 3,5→5,5 (seit 2023), Thüringen 6,5→5,0 (seit 2024)
- Mietpreisbremse-Verlängerung bis **31.12.2029** (BT-Drs. 21/322 i.d.F. 21/631)
- Strompreis-Inkonsistenz 32/36 ct → systemweit 37 ct via SSOT
- BEG-Wärmepumpenförderung: 30% Grund + 20% Klima + 30% Einkommen + 5% Effizienz, max. 70%/21.000 €

**147b Hotfix:** Validation-Lücken (balkon-solar 800-W-Cap, wärmepumpe 30-1000 m²-Range)

**147c PV-Ertragsmodell:** Mertens-Faktoren (Süd 1,0 / SO/SW 0,95 / O/W 0,85 / NO/NW 0,72 / Nord 0,65) × Neigungsfaktoren

**Hauptbefunde Block B (148):**
- dachflaechen-rechner: PV-Ertrag-Inkonsistenz mit photovoltaik-rechner (950 → 850 kWh/kWp)
- poolkosten-rechner: Strompreis-Beispiel veraltet (220 → 270 €), Pumpenlaufzeit-Inkonsistenz
- Walmdach-Begriff „Näherung" → „mathematisch exakt" korrigiert

**148b Component-Drift Hotfix:**
- poolkosten Component-Default 32 → 37 ct via SSOT
- heizkosten Component-Default 36 → 28 ct (WP-Tarif via SSOT) — Karsten-Entscheidung
- dachflaechen Hinweisbox „Näherung" → „regelmäßige Dachformen"
- balkon-solar Nord-Faktor 0,40 → **0,60** (Branchenkonsens-Korrektur, vorher außerhalb seriösem Spektrum)

**Offen:** Mieterbund-Wert in nebenkosten-rechner (148c-Mini-Hotfix bei Gelegenheit, sobald Karsten den aktuellen Wert von mieterbund.de hat)

### Stufe 2 Gesundheit (April 2026, Prompts 140-144b)
- 4-Punkt-Audit: 2P1 + 9P2 + 9P3 + Feature
- verify-p1/p2/p3 Pattern (21 Tests)
- Bewusste Wert-Änderung: Idealgewicht 25J +2,7 kg
- schwangerschaft.ts Voll-Fusion

### Stufe 1 Auto (23.04.2026, Prompts 130-132.6)
- Audit 130: 3×P1 alle KfzSteuer-Familie, 5×P2, 11×P3
- Fix 131: SSOT `kfz-steuer-parameter.ts`, CO₂-Staffel progressiv nach § 9 Abs. 1 Nr. 2c (2,00/2,20/2,50/2,90/3,40/4,00 €/g), § 3d-Befreiung auf 31.12.2035, Erstzulassung dynamisch
- Fix 132: Führerschein 22,49/116,93 €, Bussgeld+KfzSteuer-Disclaimer, Taxi TARIFE_STAND, LeasingRechner MwSt-SSOT
- **Slug-Drift-Scan** (`scripts/slug-drift-scan.mjs`) seit 132.6 als Prebuild-Hook, scannt gegen `lib/rechner-config/<kat>.ts`. Befund 132.5: 22 Drifts systemweit. Hauptursache: Kategorien-Intuition (Display-Name verführt zu falscher Kategorie).

---

## Welle 1 — ABGESCHLOSSEN April 2026

### Stufe 4b (22.04.2026, Prompts 120c/120d-Hybrid)
- P1+P2+SSOT+UI-Transparenz
- Wohngeld-Cliffhanger via Hybrid: 120d Explainer-Page statisch (`app/finanzen/wohngeld-rechner/page.tsx`)
- 120d-fix 4 Textkorrekturen: § 19 Abs. 2, wohngeldrechtliche Haushaltszusammensetzung, FAQ ohne Faustregel, § 25 Abs. 2
- 120c-Refactoring **parkend bis Juni 2026** (parallel zu Bürgergeld-Neue-Grundsicherung-Reform 01.07.2026)

### Stufe 3 (20.04.2026, Prompts 111/111a/112)
- P1: Elterngeld 175k€-Grenze + zvE-Feld, Ersatzrate/Deckel-Fix (NettoVorGeburt × Prozentsatz, 2770-Deckel), Minijob-Divisor 45358→51944
- P2: 6 Fixes (B/C/D/E live verifiziert)
- Bonus: Rentenrechner-SEO-Texte aktualisiert (BBG 90600→101400)
- Konstanten: `DURCHSCHNITTSENTGELT_2026`, `ELTERNGELD_EINKOMMENSGRENZE_2026`, `ELTERNGELD_VORGEBURT_DECKEL_2026`
- P3-Polish 111a: Deckel-Hint

### Stufen 1, 1.5, 2 (April 2026, Prompts 86-101)
- Neue SSOT-Libs mit Stichtag-Switch: `mindestlohn.ts` (13,90→14,60 € 01.01.2027), `rente.ts` (40,79→42,52 € 01.07.2026), `pfaendung.ts` (1.555→1.587,40 € 01.07.2026)
- Zentrale Helfer: `berechneEStGrund`, `berechneSoli` (mit Milderungszone!), `berechneKirchensteuer`
- Konstanten: `WK_PAUSCHALE_AN_2026`, `GRUNDFREIBETRAG_2026`
- Soli-ohne-Milderungszone 5× gefixt (ALG/GmbHGf/nebenjob/spenden/steuererstattung)

### Audit-Berichte-Pfad (alle Welle 1)
- `docs/audit-arbeitspapiere/welle1-stufe4a-bericht.md`
- `docs/audit-arbeitspapiere/welle1-stufe4b-bericht.md`
- `docs/audit-arbeitspapiere/bafoeg-geschwister-analyse.md`
- `docs/audit-arbeitspapiere/midijob-an-sv-analyse.md`

---

## Sprint-Historie (vor Welle-System)

### A11y-Sprint ABGESCHLOSSEN (18.04.2026)
- 78a-h + 78z + 78z-B (Form-Labels) + 78z-A (Color-Contrast)
- 19-er Stichprobe aus allen 9 Kategorien: Lighthouse 100/100 Mobile+Desktop, 0 axe-Findings
- Baseline: `docs/a11y-baseline-2026-04.md`
- BfE-Seite `/barrierefreiheit` mit aktualisierter Selbstbewertung
- BFSG Kleinstunternehmer-Ausnahme vermutet
- Bekannte Einschränkungen in BfE: BMI-Skala, Taschenrechner-Tastatur, Affiliate-Links
- info@rechenfix.de, 14-Tage-Antwort

### Doku-Sync (Prompt 97, 19.04.2026)
- `CLAUDE.md` + `rechner-builder/SKILL.md` + `rechenfix-projekt-referenz.md` mit Rechtsstand-Tabelle 2026
- Guards G11 (SSOT-Imports) + G12 (Hover ohne Transform)
- Anti-Patterns aus April-Audit als Negativ-Beispiele
- Skill auch in claude.ai-UI synchronisiert

### AdSense-Script live (20.04.2026, Prompt 110)
- ads.txt war bereits korrekt deployed, aber Basis-Loader fehlte im Head von `app/layout.tsx`
- Publisher-ID `pub-1389746597486587` bzw. `ca-pub-1389746597486587`
- Realistische Prüfdauer: 1-3 Wochen ab 20.04.

### CosmosDirekt + 145b (25.04.2026)
- 87→117 AffiliateBox-Einbauten
- RentenRechner live verifiziert
- Casing-Fix Commit 7dd9934

---

## Geparkte Items (Stand 26.04.2026)

| Item | Trigger zum Aufgreifen |
|---|---|
| **Prompt 68** (Google CMP + Consent Mode v2) | Erst nach AdSense-Approval — Prompt 69 wäre Rollback |
| **Prompt 85** (next/script Migration) | Parallel zu 68, gleiche Bedingung |
| **Prompt 120c** (Wohngeld-Refactoring) | Juni 2026, parallel zu Bürgergeld-Reform 01.07.2026 |
| **Prompt 146** (Doku-Sync) | Erstellt aber NICHT ausgeführt — Inhalt aus Memory rekonstruierbar |
| **Amazon-Tag-Integration** | Deadline ~19.10.26 |
| **Prompt 148c** (Mieterbund-Wert nebenkosten-rechner) | Wenn Karsten aktuellen Wert von mieterbund.de hat |
| **Prompt 150e** (Süd-OLG-UI-Toggle ehegattenunterhalt) | Wenn fachliche Differenzierung gewünscht; aktuelle Konfig-Hinweis-Variante ist scope-konform mit P2 |
| **Prompt 151** (P3-Sammelbatch Block A — 17 Items) | Empfehlung: nach Block-B-Audit als gemeinsamer Sammelbatch A+B |
| **Block B Welle 2 Stufe 3 Arbeit** (8 Rechner) | Audit-Session als nächster Block, ~60 Min |
| **Welle 3 Validation-Sweep** | Großer Tech-Debt-Track: Range-Validation systemweit + SSOT-Konsumption-Inventur über alle Components |

---

## Audit-Methodik (etabliert über die Wellen)

### 4-Punkt-Audit (Welle 2 Standard, ab 23.04.2026)
1. Formel/Rechtsquelle
2. Input-Validierung
3. Edge Cases
4. SSOT-Hygiene

### Lessons-Learned Welle 2 Stufe 3 Arbeit (26.04.2026)

**Audit-Befund-Erweiterung im Pre-Check ist legitim:** Wenn Lib-Inspektion einen tieferen Bug zeigt als der Audit-Bericht beschreibt, ist Scope-Erweiterung angezeigt. 149d hat den Audit-Befund „1,0-Gebühr-Update" um den tieferen P1 „RVG-Tabellen-Trennung" erweitert — beide in einem atomic Commit dokumentiert. Pre-Check via Plain-JS-Mirror der Lib hat alle Test-Soll-Werte vor Verify-Script-Bau verifiziert.

**Verify-Skripte Convention (149d):** Endung `.ts` (NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`), Helper-Parameter explizit typisiert. Mjs-mit-.ts-Suffix-im-Import scheitert sowohl beim Loader als auch beim `next build` strict-typecheck.

**Audit-Zeilennummern veralten innerhalb einer Welle:** Folge-Prompts ändern Konfigs, sodass die im Audit-Bericht referenzierten Zeilennummern nicht mehr stimmen. Im Pre-Check immer gegen Live-Code verifizieren — Befunde selbst bleiben in der Regel real, nur die Position wandert.

**Slug-Quick-Check via grep für Cross-Links** (150-Praxis): Bei neuen `[Text](/<kat>/<slug>)`-Cross-Links direkt `grep <slug> lib/rechner-config/<kat>.ts`. Konsistent mit Rule 11 (SSOT-Slug-Verifikation).

**FAQ/erklaerung sind Bundle-frei:** client-data.ts wird durch Erklärtext-Updates nicht aufgebläht — Erweiterungen kosten kein Performance-Budget.

### Lessons-Learned Welle 2 Stufe 3 Wohnen (25.04.2026)

**Phantom-Befunde durch Screenshot-Interpretation vermeiden:** Code-Inspektion durch Code als Gegencheck vor Eskalation. Aus 147c-Iteration gelernt — Live-Beobachtung kann irreführen, Code-Stand ist verlässlicher.

**Test-Soll-Werte präzise rechnen:** Bei Auto-Berechnungen mit Division (z.B. 40 ÷ 5,5 = 7,2727…) immer mit unverrundetem Quotienten arbeiten, nicht mit der UI-Anzeige.

**Component-Defaults vs. Konfig-Texte separat prüfen:** Migrationen erfassen oft nur Konfig, vergessen Component-Defaults. Pool-Component, Heizkosten-Component, balkon-solar-Lib waren Pre-147-Drift.

**Bei Strompreis-/SSOT-Migrationen alle Felder durchsuchen:** `formel`, `beispiel`, `erklaerung`, `faq` — nicht nur den Haupttext. Pool-Beispiel war Pre-147 stehengeblieben.

**Git-blame als Erstcheck vor Konstanten-Änderung:** Bevor ein Wert geändert wird, prüfen ob er mit Begründung gesetzt wurde. Hat bei balkon-solar Nord-Faktor sauber funktioniert.

**Block-Scope-Disziplin schützt vor Phantom-Fixes:** Code hat in 148 die balkon-solar-950 nicht angefasst, weil out-of-scope. Befunde müssen im Folge-Audit explizit adressiert werden, sonst gehen sie verloren.

### Frühere Methodik-Lehren (aus Welle 1)

**Primärquellen-Pflicht (aus 119/120/120a):** Vor Behauptung eines P1-Bugs mit konkretem Soll-Wert IMMER Original-Rechtsquelle (Gesetz im Internet, BGBl.) lesen, niemals „online gehört". Verify-Scripts müssen gegen externe Quellen prüfen, nie zirkulär gegen die getestete Lib.

**Memory ist keine Primärquelle (Meta-Lehre Prompt 131):** Bei § 3d KraftStG wollte Claude den Befund „bis 31.12.2035" korrigieren, war selbst veraltet (Achtes KraftStÄndG 04.12.2025 nicht erinnert). Bei Gesetzgebungs-Updates Ende 2025/Anfang 2026 besonders vorsichtig.

**Audit-Berichte vollständig lesen, nie aus Highlights rekonstruieren:** UND/ODER-Flip-Risiko (Stufe 4a Bericht 114 Detail hatte ODER, Highlight versehentlich UND). Commits auf Detail-Abschnitte verweisen.

**Slug- und Kategorie-Verifikation gegen SSOT (`lib/rechner-config/<kategorie>.ts`):** Nie aus älteren Prompts oder Audit-Papieren übernehmen. Lehre aus 125b Firmenwagen-Slug-Fehler.

**Live-Verifikation:** Web_fetch kann cachen — Karstens Inkognito-Browser-Check ist Ground Truth. Prüfanweisungen als kompakte Liste (URL + Inputs + Soll-Wert) liefern.

---

## Tech-Stack-Referenz

- **Frontend:** Next.js 14, Tailwind, TypeScript
- **Deploy:** Vercel, Domain `https://www.rechenfix.de` (www MANDATORY, 308-Redirect bare→www)
- **GSC:** aktiv
- **170 Rechner in 9 Kategorien:** Alltag 23, Finanzen 44, Gesundheit 17, Auto 11, Wohnen 25, Mathe 18, Arbeit 17, Kochen 12, Sport 3
- **USP:** KI-Erklärungen („Fix erklärt") via Claude API
- **Repo-Pattern:** Dynamische Route `app/[kategorie]/[rechner]/page.tsx` für ALLE Rechner. Metadaten in `lib/rechner-config/<kategorie>.ts`. Zentrale Libs in `lib/berechnungen/` (SSOT).

### Affiliate (Awin Pub-ID 2843240)
12 Programme: WISO 17387, smartsteuer 15043, Lexware 13787, CHECK24 9364 (.net!), congstar 11938, KS-Auxilia 108114, Verivox 14797, hotel.de 16018, eventfloss 27722, burdaZahn 121064, naturesway 47173, CosmosDirekt 11893 (seit 25.04., 30 Einbauten, 15 Deeplinks). Amazon Tag rechenfix-21 seit 22.04.

### Build-Regel
- Lokal IMMER `npm run build`, NICHT `npx next build`
- Nur `npm run build` triggert Prebuild-Hooks (check-footer + check-jahreswerte + slug-drift-scan + generate-client-data.ts)

### Casing-Bug-Pattern (aus 145b)
- Windows-NTFS case-insensitive vs. Linux/Vercel case-sensitive
- Fix bei case-only-Renames: Zwei-Schritt-`git mv` (mv→Zwischenname→mv)
