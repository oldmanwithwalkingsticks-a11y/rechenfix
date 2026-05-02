# Rechenfix Welle-Status-Historie

**Zweck:** Konsolidierte Übersicht aller abgeschlossenen Audit-Wellen, offenen Punkte und Lessons-Learned. Ersetzt mehrere kleinere Memory-Einträge durch eine zentrale Doku-Datei.

**Update-Regel:** Bei Welle-Abschluss neuen Block oben einfügen. Memory-Eintrag verweist auf diese Datei.

**Stand:** 28.04.2026

---

## Welle 3 — Tail (28.04.2026, LAUFEND)

Sammel-Block für Welle-3-Tail-Aktivitäten nach Abschluss der einzeln dokumentierten Items 152b/154/155/156/151/150e/157. Enthält Scoping-Outputs, Mini-Module und kurze Folge-Aktionen ohne eigenen Top-Block.

- Validation-Sweep Scoping ✅ 28.04.26 — siehe validation-sweep-scoping.md, 7 Module priorisiert (M1 Backtick, M2 Norm-Zitate, M3 SSOT-Konsumption, M4 Meta-Routen, M5 Affiliate-Konsistenz, M6 FAQ-Drift, M7 A11y-Stichprobe). Geschätzt 4–6 Folge-Sessions. Out-of-Scope: Deploy-Sync-Check, Verify-Coverage-Lücke (eigene Welle 4).
- P3-B1 ueberstunden-Netto-Refactor ✅ 28.04.26 (Commit 7c2426b) — Pauschale 40-%-Steuerabzug-Schätzung im Vergütungs-Modus durch Mehrbetrag-Methode (Netto(Brutto+Vergütung) − Netto(Brutto)) via berechneBruttoNetto-SSOT ersetzt. UI im Modus „Vergütung" um Steuerklasse + Bundesland + Kirchensteuer-Inputs erweitert. Schließt P3-B1 aus dem Welle-2-Stufe-3-Arbeit-Block-B-Backlog.
- Validation-Sweep M1 Backtick ✅ 28.04.26 (Commit 91da7a6) — scripts/check-backticks.mjs als prebuild-Hook eingehängt vor slug-drift-scan. AST-basierte Detection (parse-error + Inline-Backtick-Walk) auf erklaerung/formel/beispiel/faq-Properties. 0 aktuelle Treffer, reine Zukunfts-Absicherung. Schließt M1 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M2 Norm-Zitate ✅ 28.04.26 (Commits 5224e72 + Doku) — Regex-Sweep über lib/rechner-config/*.ts, 258 Treffer / 156 unique klassifiziert: 4 STILBRUCH gefixt (S. → Satz 3×, Absatz → Abs. 1×), 2 KORREKT-PÄDAGOGISCH (Erstnennungs-Vollformen mit Klammer-Erklärung) belassen, ~30 REGEX-FALSE-POSITIVES (Detection-Limit bei SGB-römischen-Ziffern, Buchst.-Spezifikationen, Komma-Aufzählungen), ~115 KORREKT-STANDARD. Validation-Report unter docs/audit-arbeitspapiere/validation-norm-zitate.md. Schließt M2 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M3 SSOT-Konsumption ✅ 29.04.26 (Commit 0ad33aa + Doku) — Vollständiges SSOT-Inventar (~470 Konstanten, 26 Libs) → Grep-Sweep über ~80 drift-relevante Werte → 14 DRIFT in 3 Clustern: BAföG (11 Stellen, finanzen.ts:1248–1297, pre-Prompt-120-Werte), Kinderfreibetrag (3 Stellen, finanzen.ts:1371/1391/1415, falsche Dekomposition 7.806/15.612 statt 4.878/9.756 trotz korrekter Berechnung seit 94a), Strompreis (2 Stellen, ReichweitenRechner.tsx:41 + auto.ts:540, 32 ct hartkodiert pre-Prompt-147). Alle 14 gefixt; U-01 (BAföG-Nebenjob 538 €/6.456 €) durch Karsten geklärt → § 23 BAföG 330 €/Mo + Minijob 603 € separat formuliert; U-02 (Max 1.216 €) als Folge-Drift bestätigt → 1.152 €. Build 205/205 grün. Drift-Rate ~4 %, alle übrigen SSOT-Werte (ESt-Tarif, Soli, BBG, Rentenwert, Pfändung, Bürgergeld, Pendlerpauschale, EEG, WK-Pauschale, Kindergeld 259 €, DT-Selbstbehalte) sauber konsumiert. Validation-Report unter docs/audit-arbeitspapiere/validation-ssot-konsumption.md. Lehren L-30 (Konsumenten-Sweep nach SSOT-Refactor) + L-31 (Kifb-Dekompositionstexte: ET-/zusammen-Bezug nie mischen). Schließt M3 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M4 Meta-Routen ✅ 29.04.26 — `scripts/slug-drift-scan.mjs` um Meta-Routen-Check erweitert: neue Konstanten `META_ROUTES` (11 Routen: ki-rechner, feedback, impressum, datenschutz, barrierefreiheit, qualitaet, ueber-uns, opengraph-image, sitemap.xml, robots.txt, admin/affiliate-stats) + `META_WHITELIST` (1 False-Positive: Pattern-Beispiel `[text](/pfad)` im Markdown-Renderer-Code-Kommentar in app/[kategorie]/page.tsx) + `META_PATTERNS` (Single-/Two-Segment href + Markdown). Sweep über gesamte Codebase: **0 echte Drifts** (1 False-Positive whitelisted). Hook-Output erweitert (Rechner-Drifts und Meta-Routen-Drifts getrennt ausgewiesen, gemeinsamer Build-Break). Build 205/205 grün. CLAUDE.md-Pflege-Hinweis bei „CI-Hooks (prebuild)" + neue Subsection „Meta-Routen-Pflege bei neuer statischer Route". Per Vor-Entscheidung 7 (kein Validation-Report bei 0 Treffern). Schließt M4 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M5 Affiliate-Konsistenz ✅ 30.04.26 (Code-Commit 3b202d5 + Doku-Sync) — Inline-Node-Sweep über components/ + app/, 133 Treffer (117 AffiliateBox + 16 AmazonBox, exakt CLAUDE.md-Soll). Phase-A-Klassifikation: **127 REGELKONFORM, 0 VERSTOSS-MATHE, 0 VERSTOSS-AMAZON-VERBOTSKAT, 0 VERSTOSS-THEMATISCH, 6 UNKLAR-THEMATISCH**. In Phase B alle 6 UNKLAR gefixt: U-01 Mietpreisbremse privathaftpflicht→hausrat, U-02 MwStRueckerstattung Box entfernt + Import-Cleanup (kein passender CosmosDirekt-Anchor), U-03 Pflegegeld berufsunfaehigkeit→tagesgeld, U-04 Schenkungssteuer sterbegeld→tagesgeld, U-05 VFE risikolebensversicherung→wohngebaeude, U-06 Buergergeld context='strom' nachgepflegt. Plus 2 Bonus-Befunde gefixt: B-02 Variant-Reihenfolge GrunderwerbsteuerRechner+ElterngeldRechner full→compact normalisiert, B-04 context-Props in 4 Rechnern nachgezogen (ArbeitszeitRechner=arbeitszeitrechner, ElterngeldRechner=mutterschutz, GrunderwerbsteuerRechner=grunderwerbsteuer, UeberstundenRechner=ueberstunden — alle eindeutig, keine U-07..U-NN-Verschiebung). Cluster B AmazonBox-122-amazon (16/16 regelkonform, deckt sich mit docs/amazon-integration.md) und Cluster D Gesundheit-mit-thematischer-Brücke (3/3) ohne Code-Touch. Bilanz post-B: 132/132 = 100 % regelkonform (1 Box entfernt = 132 Total). B-01 Doku-Drift CLAUDE.md Z. 14 vs. Z. 59 als separater Mini-Commit (1db78f8 ✅, 30.04.26). Build 205/205 grün vor und nach Code-Commit. Validation-Report unter docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md. Schließt M5 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M6 FAQ-Drift ✅ 30.04.26 (Code-Commit 9db82cb + Doku-Sync) — Stichprobe 10 eindeutige Welle-3-Touch-Rechner (151a–e + 157a–f dedupliziert + implizit 150e). Hilfs-Skript-Sweep extrahiert 141 €-Werte + 38 %-Werte + 81 §-Zitate + 46 Jahreszahlen aus den 4 Feldern (formel/beispiel/erklaerung/faq). Phase-A-Klassifikation: **5 echte Drifts** (3 DRIFT-WERT, 1 DRIFT-NORM, 1 DRIFT-FAKT), **0 UNKLAR**, alle übrigen 354 Wert-Tokens KONSISTENT. In Phase B alle 5 Drifts gefixt: Cluster A unterhalt arbeit.ts:1239 DT-Mindestbedarf 482/554/649 → 486/558/653 € aus MINDESTBEDARF_2026 + 4. Altersstufe „698 € (4. Altersstufe, ab 18 Jahre)" ergänzt + Altersbereich-Annotation aller 4 Stufen; Cluster B elternzeit arbeit.ts:1311 „§ 17 BEEG" → „§ 17 Abs. 2 BEEG" am Übertragungs-Tatbestand. Plus 2 Bonus-Befunde Stil-Konsistenz mit Mehrheits-Form-Regel: B-01 mutterschutz 9× € vs. 2× Euro → 2 Stellen auf € angeglichen (Z. 924 + 926); B-02 scheidungskosten 6× % vs. 4× Prozent → 4 Stellen auf % angeglichen (Z. 1008 zwei + Z. 1016 + Z. 1036). 8/10 Rechner drift-frei. Pre-5a-SSOT-Disziplin (Wert-Drift gegen `MINDESTBEDARF_2026` aus duesseldorfer-tabelle.ts geprüft) + Pre-5b-Volltext-Check (4 Verdachts-Stellen — kuendigungsfrist § 168/169 SGB IX, unterhalt § 94 Abs. 1a SGB XII, abfindung 17.500 €, zugewinnausgleich Werte-Vielfalt — alle als KONSISTENT bestätigt, hätten ohne Volltext-Check zu UNKLAR-Klassifikation geführt). Bilanz post-B: 0 verbleibende Drifts. **L-30 (M3, Konsumenten-Sweep nach SSOT-Refactor) durch M6 erneut bestätigt** — Pre-Welle-3-Werte-Reste in beschreibenden Texten sind der konsistente Drift-Pattern. Lehren-Liste bleibt schlank, **keine neue L-32**. Build 205/205 grün vor und nach Code-Commit. Validation-Report unter docs/audit-arbeitspapiere/validation-faq-drift.md. Schließt M6 aus dem Validation-Sweep-Scoping.
- Validation-Sweep M7 A11y-Stichprobe ✅ 30.04.26 — Karsten-Lighthouse-Sprint auf 22-URL-Stichprobe (19 aus docs/a11y-baseline-2026-04.md April 2026 + 3 Welle-3-Risiko-Anker: ehegattenunterhalt-rechner für Süd-OLG-Toggle 150e, ueberstunden-rechner für P3-B1-Refactor, zugewinnausgleich-rechner für VPI-Indexierung 149b), Mobile + Desktop = **44 Runs total**. Ergebnis: 44/44 Runs ≥ Baseline-Score, **0 Regressions-Treffer**. Welle-3-Component-Touches (Süd-OLG-Toggle, P3-B1-Refactor, VPI-Indexierung) ohne A11y-Regression. LazySection-Removal-Effekt (Prompt 154) repo-weit ohne Score-Verschlechterung über Kategorie-Stellvertreter aus Baseline (alle 9 Kategorien + BfE-Pflichtseite). Pre-existierende Sub-100-Scores aus April-Baseline (etf-sparplanrechner 92, zyklusrechner 95, arbeitszeitrechner 95, prozentrechner/brutto-netto/baufinanzierung/herzfrequenz-zonen 97) unverändert — kein neuer Treffer. Per Vor-Entscheidung E2 (Scoping) **kein Validation-Report bei 0 Regressions-Treffern**, nur Doku-Closure-Bullet. Schließt M7 aus dem Validation-Sweep-Scoping.
- **Validation-Sweep KOMPLETT ✅ 30.04.26** — 7/7 Module abgeschlossen: M1 Backtick-Hook (28.04., 91da7a6), M2 Norm-Zitate (28.04., 5224e72), M3 SSOT-Konsumption (29.04., 0ad33aa, Lehren L-30 + L-31 generiert), M4 Meta-Routen (29.04., 83a6bce, 0 Drifts, Hook-Erweiterung als Future-Proof), M5 Affiliate-Konsistenz (30.04., 3b202d5 + c5b8dbe, 6 UNKLAR + 2 Bonus gefixt → 132/132 = 100 % regelkonform, plus B-01 Mini-Commit 1db78f8), M6 FAQ-Drift (30.04., 9db82cb + 513b0ea, 5 Drifts + 2 Bonus gefixt, L-30 wiederbestätigt — keine neue L-32), M7 A11y-Stichprobe (30.04., 0 Regressions-Treffer auf 44/44 Runs). Welle-3-Backlog reduziert auf den **geparkten 152c-Slot** (Pendlerpauschalen-SSOT, Trigger: Verabschiedung der 45-Cent-Reform). Lehren-Liste durch Validation-Sweep um L-30 (Konsumenten-Sweep nach SSOT-Refactor) + L-31 (Kifb-Dekompositionstexte: ET-/zusammen-Bezug nie mischen) gewachsen — beide aus M3, durch M6 wiederbestätigt. Drift-Bilanz Validation-Sweep gesamt: ~30 Wert-/Konsistenz-Drifts in 5 Modulen gefixt (M1+M4+M7 = 0 Drifts; M2 = 4; M3 = 14; M5 = 6 UNKLAR + 2 Bonus; M6 = 5 + 2 Bonus). 7 atomic Code-Commits + 7 Doku-Commits über 4 Tage (28.–30.04.26). Drift-Rate über alle Sweeps insgesamt unter 5 % — bestätigt hohe Repo-Disziplin als Ausgangs-Niveau.

---

## Welle 4 — Verify-Coverage-Backfill (01.05.2026, LAUFEND)

Sammel-Block für Welle-4-Aktivitäten. Trigger: Validation-Sweep KOMPLETT am 30.04.2026, Welle-3 reduziert auf 152c-Slot. Welle-4-Scope: ~22 neue Verify-Scripts gegen existierende Libs in `lib/berechnungen/`, Bündelung nach Lib-Komplexität.

- Welle-4-Scoping ✅ 01.05.26 — siehe `docs/audit-arbeitspapiere/welle4-scoping.md`, 6 Module priorisiert (M0 Anomalie-Klärung, M1 Trivial-Verify, M2 Sozial-/Familien-Recht, M3 Edge-Case-Komplex, M4 Lohnsteuer-Tail, M5 Bilanz-Closure). Eingangs-Inventar 30.04.26 unter `docs/audit-arbeitspapiere/welle4-inventar-pre-scoping.md` (35 ABGEDECKT, 21 TEILABGEDECKT, ~38 OFFEN-ORACLE als Welle-4-Hauptscope, ~62 OFFEN-MENGEN + ~14 OFFEN-MARKT bewusst out-of-scope). Geschätzt 4–6 Folge-Sessions, ~16–22 h gesamt. Out-of-Scope: 6 Lib-Extractions auf Welle 5 verschoben (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer); OFFEN-MENGEN (~62) und OFFEN-MARKT (~14) bewusst ohne Verify-Sprint. Strategie-Entscheidungen: E1 Pure-Verify-Backfill (kein Refactor in Welle 4), E3 Bündelung nach Lib-Komplexität (nicht Kategorie), E4 beide Verify-Idiome (`eq()` + `cases[]`) zulassen, E6 Externe-Quellen-Pflicht im JSDoc-Header, E8 L-30 + L-31 + Pre-5a/5b als etablierte Audit-Praxis übernommen.
- M0 Anomalie-Klärung ✅ 03.05.26 — A-01 Befund: COMPONENT-VERIFY — Script liest Component+Konfig via `readFileSync` und prüft per `String.includes()` auf Konstanten-Namen und Textmuster (Z. 18–85); 4-Quadranten-Formeltest (Z. 92–127) reimplementiert die Berechnung inline statt einer Lib zu importieren; kein `import from '../lib/berechnungen/...'` vorhanden. Konsequenz: `ehegattenunterhalt-rechner` bleibt M3-Verify-Modul-Kandidat, verify-ehegattenunterhalt.ts wird in M3 durch echtes Lib-Verify ersetzt; neue Inventar-Klasse „Component-Verify" notiert. A-03 `scripts/welle4-overrides.ts` angelegt mit `COMPONENT_SLUG_OVERRIDES` (8 Mismatches) + `COMPONENT_HELPER_SET` (5 UI-Helpers) + `isUnderscoreLibHelper`-Funktion. A-07 Underscore-Lib-Konvention in CLAUDE.md dokumentiert (Sektion „Underscore-Lib-Helper-Konvention (A-07, Welle 4 M0)" unter SSOT-Patterns). Bilanz post-M0: 35→36 ABGEDECKT (1 Slug gerutscht: `pfaendungsrechner` via PfaendungRechner→pfaendung.ts, doppelt verifiziert durch verify-pfaendung-p1/p2); Abweichung von Pre-Scoping-Erwartung: `aufstiegs-bafoeg-rechner` (AfbgRechner) importiert NICHT aus `lib/berechnungen/afbg.ts` — Component hat Inline-Logik, Lib existiert und ist verifiziert, aber Component konsumiert sie nicht → bleibt KEINE-LIB statt ABGEDECKT; übrige 6 Override-Slugs (`kw-ps-umrechner`, `einheiten-umrechner`, `gleichungsrechner`, `prozentuale-veraenderung-rechner`, `wissenschaftlicher-taschenrechner`, `zufallszahl-generator`) ohne verifizierte Lib-Konsumption, davon 3 mit unverifizierten Libs (OFFEN) + 3 ohne Lib-Import (KEINE-LIB), alle 6 OFFEN-MENGEN out-of-scope. KEINE-COMP-Klasse aufgelöst: 8→0. Schließt M0 aus dem Welle-4-Scoping. Pre-Sprint-Aufwand ~25 Min. **HINWEIS: M0b-Korrektur** — der M0-Schatten-Verify-Befund zu AfbgRechner war ein Methodologie-Artefakt (single-line `^import .* from`-Regex erfasst keine Multi-Line-Imports). Tatsächlich konsumiert AfbgRechner.tsx Z. 4–8 die `afbg.ts`-Lib via Multi-Line-Import. Korrigierte Post-M0-Bilanz: **35→37 ABGEDECKT** (zusätzlich `aufstiegs-bafoeg-rechner` rutscht). Details siehe M0b-Bullet.
- M0b Pre-M1-Konsumenten-Sweep ✅ 03.05.26 (Commit 68f04ea) — Trigger: M0-Befund AfbgRechner Schatten-Verify-Pattern. Korrigierter Sweep über alle Components mit `lib/berechnungen/`-Imports (Multi-Line-aware Regex `from ['"]@?/?lib/berechnungen/[^'"]+['"]`): **38 strictly-verified Components, 0 SCHATTEN-VERIFY, 0 MIXED-Notiz nötig**. Methodik-Befund: M0 nutzte single-line `^import .* from`-Regex und übersah dadurch alle Multi-Line-`import { ... } from`-Patterns — AfbgRechner.tsx Z. 4–8 ist Beispiel (`import {\n  berechneAfbg,\n  …\n} from '@/lib/berechnungen/afbg';`). M0-Bilanz korrigiert von 35→36 auf **35→37 ABGEDECKT** (`aufstiegs-bafoeg-rechner` ist tatsächlich CONSUMER-OK via AfbgRechner→afbg.ts). Korrigierte M0-Aussage: alle 35 ursprünglich-ABGEDECKT-Slugs sind CONSUMER-OK (kein einziger Schatten-Verify-Fall im Repo); plus 2 Override-Korrekturen (pfaendungsrechner + aufstiegs-bafoeg-rechner) ergibt netto +2 = 37 ABGEDECKT. Welle-5-Outlook unverändert: 6 Lib-Extraktions-Kandidaten (firmenwagen, afa, riester, mietpreisbremse, VFE, grundsteuer) bleiben Welle-5-Scope; AfbgRechner explizit NICHT Welle-5-Kandidat. **L-32 etabliert** (Pre-1a-Konsumenten-Sweep vor Verify-Coverage-Bilanz, mit zwei Aspekten: konzeptuell „verify-X.ts + lib X.ts impliziert nicht slug-konsumiert-lib" + methodisch „Multi-Line-Import-Detection erfordert `from '...'`-Regex statt `^import .* from`"). Schließt M0b aus dem Welle-4-Scoping-Tail. Real-Aufwand ~30 Min.
- M1a Trivial-Verify mwst + gewerbesteuer ✅ 03.05.26 (Commits 4411b2a + 0fe0fb8 + ac9caf0) — `verify-mwst.ts` (40/40 grün, Quellen UStG § 12 Abs. 1/2/3) und `verify-gewerbesteuer.ts` (29/29 grün, Quellen GewStG §§ 11, 16 + EStG § 35) als neue Verify-Scripts. Pre-Phase-Konsum-Check (L-32-Disziplin, Multi-Line-Grep): beide Slugs CONSUMER-OK gegen ihre Libs (MwstRechner→mwst.ts, GewerbesteuerRechner→gewerbesteuer.ts). 0 Drift-Findings — Libs algorithmisch konsistent mit Gesetzes-Sätzen. mwst-Cluster: Konstanten | netto→brutto @ 19 % | brutto→netto @ 19 % | ermäßigt 7 % | 0 %-Sondersatz PV § 12 Abs. 3 | Edge + Round-Trip | Multi-Aggregat. gewerbesteuer-Cluster: Grundformel PG (inkl. München-Hebesatz 490 % + Mindesthebesatz 200 % § 16 Abs. 4) | Kapitalgesellschaft (kein FB, keine § 35-Anrechnung) | Freibetrag-Schwelle 24.500 € + Abrundung-Edge | Hinzurechnungen+Kürzungen §§ 8, 9 | Edge inkl. Anrechnung 4,0-Cap (§ 35 EStG). Bilanz post-M1a: ABGEDECKT 37→39 (mwst-rechner + gewerbesteuer-rechner gerutscht). Build 205/205 grün. Schließt M1a aus dem Welle-4-M1-Cluster (M1b: herzfrequenz-zonen + kindergeld; M1c: inflationsrechner Konsum-Trace). Real-Aufwand ~45 Min.

---

## Welle 3 — Item 157 P3-Sammelrest (28.04.2026, ABGESCHLOSSEN)

**Scope:** 151-Sammelrest aus Block-A-Audit — 25 nicht-priorisierte P3-Items in 8 Rechnern aus zwei Konfig-Files (`arbeit.ts` + `finanzen.ts`). Reine Erklärtext- und FAQ-Polish, kein Berechnungslogik-Touch. Pre-Check ergab: P3-A6-4 (Beispiele Indexierung sichtbar) bereits durch P1-A6-Fix (149 zugewinnausgleich-§ 1376 BGB) erledigt — aus dem Sammelrest fiel ein Item raus, finaler Count 25 statt 26.

**Aufteilung in 6 atomare Code-Commits + 1 Doku-Sync:**

- **157a (Commit c4c1846) pendlerpauschale:** Norm-Zitat „§ 9 Abs. 1 **Satz 3** Nr. 4 EStG" (Standard-Zitierweise BMF/Finanzgerichte) — P3-A1-2.
- **157b (Commit 566a095) kuendigungsfrist + abfindung:** § 169 SGB IX Schwerbehinderten-Mindestfrist + Integrationsamt; § 113 InsO Insolvenz-Höchstfrist 3 Mon; §§ 9, 10 KSchG gerichtliche Auflösung 12/15/18 Monatsverdienste; § 4 KSchG 3-Wo-Klagefrist als Strategie-Frist (P3-A2-3, P3-A2-4, P3-A3-2, P3-A3-3).
- **157c (Commit d3eca80) scheidungskosten:** § 1565 Abs. 2 BGB Härtefall, VA-Mindest-VW 1.000 €, Folgesachen-Faustwert-Hinweis, VKH-Werte präzisiert (irreführende 1.500-€-Pauschale durch § 115 ZPO-Mechanik ersetzt), Nr. 7002 VV RVG Cap (P3-A5-1..5).
- **157d (Commit e4810ec) zugewinnausgleich + unterhalt:** § 1379 BGB Auskunftsanspruch zu Stichtagen Heirat/Trennung/Ende; § 1375 Abs. 2 BGB illoyale Vermögensminderung; § 1385 BGB vorzeitiger Ausgleich (neue FAQ); unterhalt: „bereinigtes Netto" in Beispiel und FAQ klargestellt (P3-A6-1, P3-A6-2, P3-A6-3, P3-A7-1).
- **157e (Commit 965c519) ehegattenunterhalt:** Beispiel mit Kindesunterhalt-Vorabzug (513 € KU → 766 € Ehegatten statt 986 €); § 1573 Abs. 4 BGB Anschlussunterhalt (Tatbestände-Liste); Halbteilung bei Nicht-Erwerbseinkünften (Renten/Mieten/Kapital), § 1574 BGB Erwerbsobliegenheit, § 1577 BGB Anrechnung in „Wichtige Feinheiten" (P3-A10-1..5).
- **157f (Commit 6689668) arbeitslosengeld:** § 153 SGB III als Rechtsquelle Leistungsentgelt; § 147 SGB III als Rechtsquelle Bezugsdauer-Staffel; Höchstsatz ~2.940 €/Monat (BBG voll, Stkl III mit Kind, 67 %); Steuerklasse-Stichtag 01.01. als FAQ; § 155 SGB III Nebenverdienstfreibetrag 165 € + 15-Wochen-Schwelle als FAQ (P3-A8-1..5).

**Backlog-Erweiterung:**

Geparkter Slot **152c** ergänzt: SSOT-Konstante `PENDLERPAUSCHALE_PRO_KM = 0.38` in `lib/berechnungen/pendlerpauschale.ts` mit Stichtag-Switch (für die im April 2026 angekündigte 45-Cent-Reform). Trigger: Verabschiedung des entsprechenden Steueränderungsgesetzes — Stand 28.04.2026 nur angekündigt, noch nicht im BGBl. Aufwand ~30 Min. Ohne Reform-Verabschiedung kein Lese-Wert; daher Audit-Empfehlung P3-A1-3 bewusst geparkt statt sofort umgesetzt.

**Welle-3-Backlog nach 157:**

1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch (17 priorisiert)~~ ✅
6. ~~150e — Süd-OLG-UI-Toggle~~ ✅
7. ~~157 — 151-Sammelrest (25 nicht-priorisierte P3)~~ ✅
8. 152c — Pendlerpauschalen-SSOT (geparkt, Trigger: Reform-Verabschiedung)
9. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
10. Validation-Sweep

---

## Welle 3 — Item 150e (28.04.2026, ABGESCHLOSSEN)

**Scope:** UI-Toggle für Süddeutsche Leitlinien im ehegattenunterhalt-rechner.

**Hintergrund:** 150d (25.04.2026) hat den Hinweistext zur 45-%-Quote in den OLG-Bezirken Bamberg, Karlsruhe, München, Nürnberg, Stuttgart, Zweibrücken bereits in arbeit.ts eingebaut, aber den UI-Toggle bewusst geparkt — die Berechnung selbst lief bisher ausschließlich mit der bundesweiten 3/7-Methode, der süddeutsche Workaround „Faktor 1,05 manuell anwenden" stand nur als Konfigtext-Hinweis. 150e schließt diese Lücke: Der Rechner unterscheidet jetzt funktional zwischen beiden Methoden.

**Code-Commit (08017f8):**

EhegattenunterhaltRechner.tsx:
- Neuer State `methode: 'bundesweit' | 'sueddeutsch'`, Default `bundesweit`
- Neuer RadioToggleGroup zwischen „Art" und „Erwerbstätigkeit", inkl. Hilfetext mit OLG-Bezirks-Liste
- Konstanten `QUOTE_BUNDESWEIT = 3/7` und `QUOTE_SUEDDEUTSCH = 0.45` ersetzen die hardcoded `(differenz * 3) / 7`-Berechnung
- Methodenname in Result-Box, Rechenweg-Header, ErgebnisAktionen-Text und AiExplain.eingaben/ergebnis sichtbar (auch das Detail-Label „Differenz × 3/7" bzw. „Differenz × 45 %" wechselt mit)

arbeit.ts:
- 150d-Workaround-Hinweis „Faktor 1,05 manuell anwenden" durch Verweis auf den neuen UI-Toggle ersetzt
- Beispielzahlen (2.300 € → 986 € / 1.035 €) belassen, sind mit Toggle direkt nachvollziehbar

**Sanity-Check der 4 Default-Werte (lokal nachgerechnet, deckungsgleich mit Spec):**
- bundesweit, KU bereits berücksichtigt: 986 € ✓
- süddeutsch, KU bereits berücksichtigt: 1.035 € ✓
- bundesweit, mit KU-Abzug 400: 814 € ✓
- süddeutsch, mit KU-Abzug 400: 855 € ✓

Live-Verifikation per Inkognito-Browser nach Vercel-Deploy ausstehend.

**Methodik-Lehre 29 (UI-Toggle als Folge-Commit zum Konfigtext, 28.04.2026):** Bei rechtssensitiven Rechnern mit regionaler/methodischer Differenzierung kann ein Hinweistext-Patch (wie 150d) als pragmatischer Erststand sinnvoll sein, wenn der Audit-Befund konservativ als P2 eingestuft ist. Der Folge-UI-Toggle (150e) hebt das auf das funktional vollständige Niveau — dabei sollte der ursprüngliche Workaround-Hinweis aktiv ersetzt werden, sonst stehen widersprüchliche Anweisungen nebeneinander („manuell × 1,05" vs. „Toggle nutzen"). Nach jedem Audit-Score-Hop von P2/Konfigtext zu P1/UI-Toggle gehört der Konfig-Refresh zum Patch.

**Welle-3-Backlog nach 150e:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch~~ ✅
6. ~~150e — Süd-OLG-UI-Toggle~~ ✅
7. 151-Sammelrest (~25 nicht-priorisierte P3-Items)
8. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
9. Validation-Sweep

---

## Welle 3 — Item 151 (28.04.2026, ABGESCHLOSSEN)

**Scope:** P3-Sammelbatch Block A — 17 Memory-priorisierte Items aus dem Audit-Bericht `welle2-stufe3-arbeit-blockA-audit.md`. Reine Konfig-Text-Updates in arbeit.ts (alle 5 Cluster). arbeitslosengeld-rechner-Items blieben in 151 außen vor — siehe Sammelrest.

**Aufteilung in 5 atomare Code-Commits + 1 Doku-Sync:**

- **151a (Commit b268b93) pendlerpauschale:** Mobilitätsprämie § 101 EStG (StÄndG 2025, BGBl. I 2025 Nr. 363) — neue FAQ + Erklärtext-Absatz für Geringverdiener unter Grundfreibetrag.
- **151b (Commit e7121d2) kuendigungsfrist + abfindung:** EuGH Kücükdeveci (C-555/07), § 622 Abs. 5 Nr. 2 BGB Kleinbetriebs-Ausnahme, BAG 2 AZR 68/24 Zugangsbeweis (Online-Sendungsstatus reicht nicht), § 1a Abs. 2 S. 3 KSchG Aufrundung > 6 Mon → volles Jahr.
- **151c (Commit 17ca6bd) mutterschutz-Restpolish:** Frühgeburt-Definition (< 2.500 g / fehlende Reifezeichen), Muster 9 ab 01.01.2026, 99-Tage-Mindestschutz § 3 Abs. 2 MuSchG, Schülerinnen/Studentinnen seit 01.01.2018, Totgeburt-Sonderregelung (≥ 500 g / 24. SSW: 8 Wo, kein Mehrlingsbonus). Erklärtext-Aufzählung um Schülerinnen/Studentinnen ergänzt.
- **151d (Commit d7a277d) unterhalt:** § 1610 BGB konkrete Bedarfsberechnung > NEK 11.200 €, § 1612a Abs. 3 BGB Alterssprung, Selbstbehalt-Wohnkosten DT 2026 spezifisch (390 + 130 € statt 520 € pauschal), 7. MUVÄndV 15.11.2024 (BGBl. 2024 I Nr. 359) als Rechtsquelle der Mindestunterhalts-Werte.
- **151e (Commit 4e5b7d0) elternzeit:** § 17 Abs. 1 BEEG Urlaubskürzung 1/12 (AG-Wahlrecht), § 16 Abs. 1 BEEG bis zu 3 Zeitabschnitte, Terminologie-Fix „Bindungszeitraum" → „verbindlicher Festlegungszeitraum" (2x). Pre-Check ergab: „30 Stunden"-Erwähnungen 2x als bewusster historischer Hinweis (BEEG-Reform 01.09.2021, vorher 30 h) — kein Restposten von 150c, bewusst belassen.

**Methodik-Lehre 28 (Audit-Cluster nach Memory-Priorität, 28.04.2026):** Wenn ein Audit mehr P3-Items enthält als der Memory-Backlog priorisiert, gilt die Memory-Auswahl als Scope-Definition. Nicht-priorisierte Items (im Audit als „Sammelrest" markiert) bleiben im Backlog für eine spätere Welle. Vorteil: kein Scope-Creep beim Sammelbatch, klare Soll-Erwartung bei Pre-Check und Commit-Anzahl.

**151-Sammelrest (offen, niedrige Priorität):**

Aus dem Block-A-Audit blieben ~25 weitere P3-Items außerhalb der Memory-17-Liste — überwiegend Norm-Zitierungs-Polish, Edge-Case-FAQs und SSOT-Refactor-Kandidaten:

- A1 pendlerpauschale: P3-A1-2 (Norm-Zitat „§ 9 Abs. 1 Satz 3 Nr. 4 EStG" präziser), P3-A1-3 (SSOT-Konstante 0,38 €/km mit Stichtag-Switch)
- A2 kuendigungsfrist: P3-A2-3 (§ 169 SGB IX Schwerbehinderten-Frist), P3-A2-4 (§ 113 InsO Insolvenz-Höchstfrist 3 Mon)
- A3 abfindung: P3-A3-2 (§§ 9, 10 KSchG gerichtliche Auflösung 12/15/18 Monatsverdienste), P3-A3-3 (3-Wo-Klagefrist § 4 KSchG explizit)
- A5 scheidungskosten: 5 Items (Härtefall § 1565 Abs. 2 BGB, VA-Mindest-VW 1.000 €, Folgesachen-Faustwert-Hinweis, VKH-Werte präzisieren, RVG Auslagen-Cap)
- A6 zugewinnausgleich: 4 Items (§ 1379 Auskunftsanspruch, § 1375 Abs. 2 illoyale Vermögensminderung, § 1385 vorzeitiger Ausgleich, Beispiele Indexierung sichtbar)
- A7 unterhalt: P3-A7-1 (Bsp „bereinigtes" klarstellen)
- A8 arbeitslosengeld: 5 Items (§ 153 SGB III, § 147 SGB III, Höchstsatz ~2.940 €, Stkl-Stichtag 01.01., § 155 SGB III Nebenverdienstfreibetrag) — in finanzen.ts
- A10 ehegattenunterhalt: 5 Items (Halbteilung Nicht-Erwerbseinkünfte, § 1574 Erwerbsobliegenheit, § 1577 Anrechnung, § 1573 Abs. 4 Anschlussunterhalt, Bsp mit Kindesunterhalt)

Trigger zum Aufgreifen: separater Sprint, ggf. zusammen mit dem Validation-Sweep oder als „151-extension" in einer ruhigeren Session.

**Welle-3-Backlog nach 151:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. ~~151 — Block-A-P3-Sammelbatch (17 priorisierte)~~ ✅
6. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
7. 151-Sammelrest (~25 nicht-priorisierte P3-Items)
8. P3-B1 — ueberstunden-Netto-Refactor mit Steuerklasse
9. Validation-Sweep

---

## Welle 3 — Items 155 + 156 (28.04.2026, ABGESCHLOSSEN)

**Scope:** E-E-A-T-Härtung im Anschluss an AdSense-Reparatur 154.

**Hintergrund:** 154 hat das akute Content-Volumen-Problem behoben (Stichprobe nach Deploy: brutto-netto-rechner 5.497 → 13.033 chars sichtbarer Text, urlaubstage-rechner 10.050 chars, bmi-rechner 8.171 chars). 155+156 ergänzen die formalen Trust-Signale für YMYL-Themen — proaktiv, ohne auf das Re-Review-Ergebnis von 154 zu warten.

### 155 (Commit 1a6e6ed) — `/ueber-uns` ausgebaut

Bestehende Seite von ~2,2 KB auf ~7 KB sichtbarem Text erweitert. Sechs Sektionen: Hero, Solo-Founder-Statement mit klarer Abgrenzung zur Steuer-/Rechtsberater-Rolle, Audit-Workflow-Überblick, Quellenliste-Kurzfassung, Datenschutz-/Werbe-Transparenz, Kontakt. Cross-Links zu `/qualitaet`, `/impressum`, `/datenschutz`.

### 156 (Commit fecadc4) — `/qualitaet` neu angelegt

Neue statische Server-Component-Seite mit sieben Sektionen: Hero, Audit-Workflow (4-Punkt-Audit, Welle-Sprints), Primärquellen-Liste (gegliedert nach 6 Themenbereichen), Stichtag-Logik (Mindestlohn 14,60 € ab 01.01.2027, Rentenwert 42,52 € ab 01.07.2026, Pfändungsfreigrenze 1.587,40 € ab 01.07.2026, § 3d KraftStG bis 31.12.2035), A11y-Status (Lighthouse 100/100, axe 0 Findings, BFSG), Datenschutz/Performance, Disclaimer („Was Rechenfix nicht ist" — keine Steuer-/Rechts-/Medizin-/Anlageberatung).

Footer-Link „Qualität &amp; Methodik" ergänzt vor `/barrierefreiheit`.

**Verifikation:** Stichprobe nach Deploy zeigt erwartet `/ueber-uns` ≥ 5,5 K chars, `/qualitaet` ≥ 8 K chars sichtbaren Text.

**Methodik-Lehre 28 (E-E-A-T-Substanz aus Memory rekonstruieren, 28.04.2026):** Trust-Signale für AdSense / YMYL erfordern öffentlich sichtbare Darstellung des Audit-Workflows, der Primärquellen und der Stichtag-Logik. Diese Substanz war bei Rechenfix bereits in der Audit-Methodik vorhanden, aber nur intern (in `welle-status-historie.md`, in `CLAUDE.md`, in den Verify-Skripten) dokumentiert. Auf eine öffentliche Quality-Page übertragen: kein neuer Audit-Aufwand, nur Sichtbar-Machen. Empfehlung für künftige Sites: Audit-Workflow von Anfang an mit öffentlicher Doku-Spur planen.

**Welle-3-Backlog nach 156:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. ~~155 — Über-uns ausgebaut~~ ✅
4. ~~156 — `/qualitaet` neu~~ ✅
5. 151 — Block-A-P3-Sammelbatch (17 Items)
6. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
7. Validation-Sweep
8. P3-B1 — ueberstunden-Netto-Refactor

---

## Welle 3 — Item 154 (27.04.2026, ABGESCHLOSSEN)

**Scope:** Akut-Fix für AdSense-Re-Review — `<LazySection>`-Wrapper um Erklärtext + FAQ entfernt.

**Trigger:** AdSense-Ablehnung „Minderwertige Inhalte" am 27.04.2026. Stichprobe per curl auf `/finanzen/brutto-netto-rechner` ergab 5.497 Zeichen sichtbaren Text bei 140 KB HTML — Verhältnis 3,9 %.

**Root Cause:** `components/ui/LazySection.tsx` ist eine `'use client'`-Komponente, die bei SSR ausschließlich ein leeres 200-px-hohes Placeholder-`<div>` rendert. Children werden erst nach Hydration + IntersectionObserver-Trigger (rootMargin 200 px) eingeblendet. Der AdSense-Crawler bewertet primär SSR-HTML — Erklärtext (3.000–5.000 Zeichen pro Rechner) und FAQ (5–8 substantielle Q&A) sind für ihn vollständig unsichtbar gewesen.

**Fix (Commit 83792c0):**
- `app/[kategorie]/[rechner]/page.tsx`: `<LazySection>`-Wrapper Z. 479–550 durch Fragment ersetzt, `no-print`-Klasse auf die zwei `<section>`-Elemente direkt migriert
- `components/ui/LazySection.tsx`: gelöscht (verwaist)
- Import-Statement Z. 9 entfernt

**Verifikation:** Stichprobe nach Deploy auf 3 Rechner (`/finanzen/brutto-netto-rechner`, `/arbeit/urlaubstage-rechner`, `/gesundheit/bmi-rechner`) zeigt erwarteten Sprung von ~5–6 K auf 10–14 K Zeichen sichtbaren Text pro Seite, FAQ-Section im HTML enthalten.

**Methodik-Lehre 26 (Lazy-Loading vs. AdSense-Crawler-Sichtbarkeit, 27.04.2026):** Content-relevante Sektionen (Erklärtext, FAQ, Disclaimer, Quellenangaben) NIEMALS in client-only Lazy-Wrappers verpacken. Faustregel: Lazy-Loading ist legitim für Bilder, Iframes, schwere Components mit Interactivity-Cost — aber NICHT für statischen Text-Content, der von Crawlern bewertet werden soll. SSR-Sichtbarkeit ist ein nicht verhandelbares Anforderungs-Kriterium für Content-Sektionen, das vor jeder Performance-Optimierung Vorrang hat.

**Methodik-Lehre 27 (Klassen-Migration bei Wrapper-Removal, 27.04.2026):** Beim Entfernen einer Wrapper-Komponente, die nur ein `className`-Prop weitergibt (hier: `no-print`), Klasse auf alle direkt umschlossenen Kinder migrieren — nicht ersatzlos streichen. Sonst ändert sich Druck-Verhalten / Print-Layout / a11y-Sichtbarkeit unbeabsichtigt.

**Welle-3-Backlog nach 154:**
1. ~~152b — feiertage.ts SSOT~~ ✅
2. ~~154 — LazySection-Removal~~ ✅
3. 151 — Block-A-P3-Sammelbatch (17 Items)
4. 150e — Süd-OLG-UI-Toggle ehegattenunterhalt
5. Validation-Sweep
6. P3-B1 — ueberstunden-Netto-Refactor
7. **NEU geparkt** (nur falls AdSense-Re-Review trotz 154 nicht reicht):
   - 155 — Über-uns-Seite ausbauen (E-E-A-T, Ziel ~6–8 KB sichtbarer Text)
   - 156 — Methodik-/Qualitäts-Seite anlegen (Audit-Workflow öffentlich darstellen)

---

## Welle 3 — Item 152b (27.04.2026, ABGESCHLOSSEN)

**Scope:** SSOT-Refactor `feiertage.ts` + zwei Konsumenten-Migrationen.

**Trigger:** ArbeitstageRechner.tsx Jahr-Dropdown bricht 01.01.2027 ohne
Code-Change. Nebenwirkung: P3-Lib-1 (freelancer-Feiertage-Konstante)
gleich mitgeschlossen.

### 152b-1 (Commit ea3c9ce)

Neue `lib/berechnungen/feiertage.ts`:
- Spencer-Variante der Gauß-Osterformel (gültig 1583–4099)
- 16-BL-Map für feste + bewegliche Feiertage
- Helper: `getFeiertage`, `istFeiertag`, `anzahlFeiertage`,
  `anzahlBundesweiterFeiertageMoBisFr`
- Modellierungs-Vereinfachungen dokumentiert (Mariä HF in BY pauschal,
  Fronleichnam nicht in SN/TH-Gemeinden, kein Augsburger Friedensfest)

`scripts/verify-feiertage.ts`: 60 Tests grün gegen externe Sollwerte
(BMF, kalender.de) — Ostern 2024–2030, alle 16 BL-Karten,
Buß-und-Bettag inkl. 23.11.=Mi-Edge-Case (2022).

### 152b-2 (Commit 9b1a947)

ArbeitstageRechner.tsx Migration: hardkodiertes FEIERTAGE_2026-Array
ersetzt durch Lib-Aufruf. Jahr-Dropdown statisch 2024–2030 (vorher: nur
2026). countArbeitstage() cacht Feiertage pro Jahr in Map → robust gegen
jahresgrenzen-überschreitende Zeiträume.

**Wert-Verifikation manuell (Inkognito):**
- NW 2027 Ganzjahr: Karfreitag 26.03., Ostermontag 29.03., Fronleichnam 27.05. ✓
- BY 2026 Ganzjahr: 13 Feiertage inkl. Mariä HF 15.08. ✓
- Zeitraum 15.12.2026–15.01.2027: enthält Weihnachten 2026 + Neujahr 2027 ✓

### 152b-3 (Commit 03d7bda)

freelancer-stundensatz.ts Migration: pauschale `FEIERTAGE=10` durch
`anzahlBundesweiterFeiertageMoBisFr(jahr)` ersetzt. Tatsächlicher Wert
variiert: 2026=7, 2027=5, 2028=8 Mo-Fr-Feiertage. Optionaler
`jahr`-Parameter mit Default `new Date().getFullYear()` für
Test-Determinismus. **Schließt P3-Lib-1.**

**Methodik-Lehre 23 (deterministischer vs. dynamischer Default,
27.04.2026):** Bei mathematisch-deterministischen Werten (Feiertage pro
Jahr) ist `new Date().getFullYear()` als Default angemessen — anders als
bei rechtlichen Stichtagen (mindestlohn.ts, rente.ts), wo ein expliziter
Switch zur Quelle gehört. Daumenregel: Stichtag-Konstante immer dann,
wenn der Wert sich an einem konkreten Datum durch externe (legislative)
Entscheidung ändert; dynamischer Lookup, wenn der Wert eine Funktion des
Jahres ist.

**Methodik-Lehre 24 (Hydration-Safe Jahr-Dropdowns, 27.04.2026):**
Statische Range im Modul-Scope ist hydration-sicher; `new Date()` auf
Modul-Ebene in `'use client'`-Components riskiert Mismatch zwischen
SSR-Build und Client-Render. Trade-off: alle 4–7 Jahre ein Wartungs-
Bump. Akzeptabel für Dropdowns; nicht-akzeptabel für berechnungsrelevante
Werte (siehe Lehre 23).

**Offen aus 152b:** keine.

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

#### Lib-Audit Folge-Bundle 153c (26.04.2026, Commit `1fffcb8` Bundle + Doku-Sync-Commit)

**Status:** Lib-seitig komplett geschlossen.

5 Block-B-Libs geprüft (`arbeitszeit.ts`, `promille.ts`, `freelancer-stundensatz.ts`, `rechtsschutz.ts`, `ueberstunden.ts`) via Folge-Bundle `docs/audit-bundles/block-b-libs.md` (~16 KB, single-fetch ohne Token-Limit-Override). Bilanz: **0 P1, 0 P2, 2 neue P3-Mini-Befunde** (`P3-Lib-1` Feiertage-Konstante in freelancer-stundensatz, `P3-Lib-2` 5-Tage-Annahme in ueberstunden-Tagesindikator) + Klärungen für 4 vorher offene Items (P3-B5 SSOT-Korrektheit, P3-B6 Maximum-Widmark by design, P3-B7 Markt-Quelle bestätigt, P3-B10 geschlossen).

Highlight: `arbeitszeit.ts` `pruefeHinweise`-Logik deckt § 3 + § 4 ArbZG vorbildlich ab, inklusive korrekter Edge-Case-Behandlung („mehr als 6h", nicht „ab 6h").

Volldetails im Audit-Bericht-Anhang („Lib-Audit Folge-Bundle 153c"-Sektion).

**Methodik-Lehre 21 (Lib-Audit als Folge-Bundle, 26.04.2026):**
- Audit-Bundle-Pattern (Lehre 19) skaliert hervorragend für Folge-Audits. Erstes Bundle 13 Files / 149 KB → Token-Limit-Override 300k. Zweites Bundle 5 Files / 16 KB → single-fetch ohne Override. Generator-Skript handhabt beide Fälle mit derselben CLI (`npm run audit:bundle <name>`).
- Lib-Audit nach Component+Konfig-Audit liefert oft hauptsächlich SSOT-Bestätigungen und Mini-Polish-Items, keine substanziellen Bugs — vorausgesetzt das Component-Audit hat Beispiel-Werte sauber nachgerechnet. Damit ist die Audit-Reihenfolge „Konfig+Component zuerst, Lib als Folge" effizient: substanzielle Bugs fallen früh auf, Lib-Audit ist die Bestätigungs-Schleife.

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

**148c GESCHLOSSEN (26.04.2026):** Mieterbund-Wert im nebenkosten-rechner auf Betriebskostenspiegel 2023 aktualisiert (2,51 €/qm im Durchschnitt, bis 3,15 €/qm bei voller Ausnutzung). Recherche durch Claude direkt im Web (Mieterbund-Spiegel 2023, +10 % gegenüber Vorjahr; Sekundärquellen biallo.de und kampmeyer.com 2025). Welle 2 Stufe 3 Wohnen damit komplett abgeschlossen.

**Methodik-Lehre 22 (Wert-Recherche, 26.04.2026):** Bei Werten, die durch Web-Suche eindeutig recherchierbar sind (Mieterbund, BMF, Statistisches Bundesamt, BDEW, etc.), kann Claude die Recherche direkt durchführen statt zu warten. Pflicht: (1) Aktualität-Hinweis im Quellen-Verweis (welcher Stand, wann veröffentlicht), (2) zwei Sekundärquellen für Konsistenz-Check, (3) Repo-Stand vor Patch-Generierung lesen.

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
| **Prompt 150e** (Süd-OLG-UI-Toggle ehegattenunterhalt) | Wenn fachliche Differenzierung gewünscht; aktuelle Konfig-Hinweis-Variante ist scope-konform mit P2 |
| **Prompt 151** (P3-Sammelbatch Block A — 17 Items) | Empfehlung: nach Block-B-Audit als gemeinsamer Sammelbatch A+B |
| **Prompt 152b** (`feiertage.ts` SSOT-Lib mit Gauß-Osterformel) | Akut Q4/2026 — Jahr-Dropdown ArbeitstageRechner.tsx bricht 01.01.2027; ~2-3 h, löst gleichzeitig P3-Lib-1 (freelancer-Feiertage-Konstante) |
| **Prompt P3-B1** (ueberstunden-Netto-Refactor mit Steuerklasse + Bundesland) | Welle 3 — pauschale 40 %-Annahme durch realistische Lohnsteuer-Tabelle ersetzen, mehrere h Aufwand (UI-Erweiterung) |
| **Welle 3 Validation-Sweep** | Großer Tech-Debt-Track: Range-Validation systemweit + SSOT-Konsumption-Inventur über alle Components, plus Cross-Check aller Welle-2-Rechner gegen externe Oracles (BMF, Stiftung Warentest, IHK, Steuerberater-Tools). Mehrere Sessions. |

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

---

## WELLE 2 FINAL — Session-Handover (26.04.2026)

### Welle-2-Abschluss-Vermerk

Welle 2 ist nach formal-gefassten Maßstäben **komplett abgeschlossen**.

| Stufe | Prompts | Datum |
|---|---|---|
| Stufe 1 Auto | 130–132.6 | 23.04.2026 |
| Stufe 2 Gesundheit | 140–144b | April 2026 |
| Stufe 3 Wohnen | 147–148c | 25.+26.04.2026 |
| Stufe 3 Arbeit | 149a-d, 150a-d, 152a, 153a/b/b-fix, 153c | 26.04.2026 |

Drei Doku-Anker konsistent synchron:
- `CLAUDE.md` Welle-Status-Bullet (Stufe 3 Arbeit ✅, geparkt: 152b + P3-B1)
- `docs/audit-arbeitspapiere/welle-status-historie.md` (diese Datei)
- Audit-Berichte: `welle2-stufe1-auto-bericht.md`, `welle2-stufe3-arbeit-blockA-audit.md`, `welle2-stufe3-arbeit-blockB-audit.md` (Stufen 2 + 3 Wohnen ohne separaten Bericht — Erkenntnisse direkt in dieser Historie integriert)

Letzte Schluss-Patches:
- **148c** (Commit `30f46a9`) — Mieterbund-Wert nebenkosten-rechner aktualisiert: 2,88 → 2,51 €/qm Durchschnitt + 3,15 €/qm bei voller Ausnutzung. Quelle: Deutscher Mieterbund, Betriebskostenspiegel 2023, +10 % gegenüber Vorjahr.
- **153c** (Commits `1fffcb8` Bundle + `26298a0` Doku-Sync) — Lib-Audit-Bundle für 5 Block-B-Libs: 0 P1, 0 P2, 2 neue P3-Mini-Befunde + 4 Klärungen vorher offener Items.

Methodik-Lehren der Session (nicht doppelt aufgelistet, um Doku-Drift zu vermeiden):
- **Lehre 19 + 20 + 21** — siehe Welle-2-Stufe-3-Arbeit-Blöcke oben (Z. 83+, Z. 87+, Z. 91+)
- **Lehre 22** (Wert-Recherche durch Claude direkt im Web) — siehe 148c-Schluss-Eintrag im Wohnen-Block (Z. 144)
- **Konsolidierte Methodik-Tipps** — siehe Sektion „Lessons-Learned Welle 2 Stufe 3 Arbeit" (Z. 244+)

### Welle-3-Backlog

Vollständige Liste mit Trigger-Bedingungen siehe Tabelle „Geparkte Items" oben (Z. 220+). Empfohlene Akut-Reihenfolge bei freier Wahl:

1. **152b** — `feiertage.ts` SSOT-Lib (akut Q4/2026, Jahr-Dropdown bricht 01.01.2027), ~2–3 h
2. **151** — Block-A-P3-Sammelbatch (17 Items), ~1–2 h
3. **150e** — Süd-OLG-UI-Toggle für ehegattenunterhalt, ~1 h
4. **Welle 3 Validation-Sweep** — eigene Planungs-Session, mehrere Sessions
5. **P3-B1** — ueberstunden-Netto-Refactor mit Steuerklasse-Input, mehrere h

### Session-Handover-Anker für die nächste Chat-Session

**Trigger-Wort:** „Start"

In der nächsten Session bei „Start":
1. Memory wird automatisch geladen (Welle-2-Status, Methodik-Lehren)
2. Diese Datei lesen (Klartext-URL als raw.githubusercontent oder via `npm run audit:bundle <name>` falls passendes Bundle existiert)
3. Nächsten Slot ableiten: Welle-3-Backlog (siehe Tabelle „Geparkte Items" Z. 220+) hat 5 Items mit klarem Scope
4. Karsten fragen, welcher Slot dran ist; bei freier Wahl Akut-Reihenfolge vorschlagen (152b zuerst wegen Q4/2026-Druck)

Falls Karsten beim Start den Slot offen lässt, Vorschlag bringen: *„Wir sind nach Welle-2-Abschluss. Welle-3-Backlog hat 5 Items mit klarem Scope. Akut wäre 152b (`feiertage.ts` SSOT) wegen Q4/2026-Druck. Was soll's heute sein?"*

Repo-Snapshot zum Session-Wechsel (26.04.2026 ~23:30):
- **Branch:** main
- **Letzter Code-Commit:** `30f46a9` (Prompt 148c, Mieterbund-Wert)
- **Vorletzter:** `26298a0` (Prompt 153c Doku-Sync), `1fffcb8` (Bundle), `01bbf4d` (CLAUDE.md Lehren 20/21)
- **Build-Status:** grün, alle Prebuild-Hooks (footer, jahreswerte, slug-drift, client-data) durch
- **Working tree:** clean

*Dieses Dokument wurde beim Session-Handover am 26.04.2026 erstellt.*

---

## WELLE 3 — Session-Handover (28.04.2026, ~02:00 Uhr)

### Sechs Welle-3-Items in einer Session abgeschlossen

| Slot | Commits | Inhalt |
|---|---|---|
| 152b | ea3c9ce, 9b1a947, 03d7bda, 7061da7 | feiertage.ts SSOT mit Gauß-Osterformel + 16-BL-Map; ArbeitstageRechner & freelancer-stundensatz migriert |
| 154 | 83792c0, 4ae7b38 | LazySection-Removal — AdSense-Akut-Fix für SSR-Sichtbarkeit von Erklärtext+FAQ |
| 155 | 1a6e6ed | Über-uns-Seite ausgebaut von ~2,2 K auf ~5 K Zeichen sichtbarem Text (E-E-A-T) |
| 156 | fecadc4 | Neue /qualitaet-Seite mit Audit-Workflow, Primärquellen, Stichtag-Logik (E-E-A-T) |
| 151 | b268b93, e7121d2, 17ca6bd, d7a277d, 4e5b7d0, 2171564 | Block-A-P3-Sammelbatch — 17 Memory-priorisierte Items in 5 thematischen Clustern |
| 150e | 08017f8, 3ae42c1 | Süd-OLG-UI-Toggle für ehegattenunterhalt-rechner (3/7 vs. 0,45) |

Alle sechs Items live verifiziert. Build durchgehend grün. Doku-Sync pro Slot.

### AdSense-Status

- Erste Prüfung **27.04.2026 NEGATIV** mit Begründung „Minderwertige Inhalte"
- Root-Cause identifiziert: `<LazySection>` wrappte Erklärtext + FAQ als `'use client'` mit IntersectionObserver, SSR rendert nur leeres 200-px-Placeholder-`<div>` → AdSense-Crawler sah 5,5 K statt 13 K Zeichen Content
- Drei-Maßnahmen-Sprint 154 + 155 + 156 (28.04.2026):
  - 154 — LazySection-Removal: brutto-netto-rechner 5.497 → 13.033 Zeichen sichtbar (2,4×); urlaubstage 10.050; bmi 8.171
  - 155 — Über-uns von 2.179 → 5.010 Zeichen, sechs Sektionen mit Solo-Founder-Statement, Audit-Workflow-Überblick, Primärquellen-Kurzliste
  - 156 — neue /qualitaet-Seite mit 6.814 Zeichen, sieben Sektionen + Footer-Link
- **Re-Review-Beantragung steht ggf. noch offen** — Karsten muss im AdSense-Backend „Ich bestätige, dass ich die Probleme behoben habe" + „Überprüfung beantragen" auslösen, falls noch nicht geschehen
- Re-Review-Fenster erfahrungsgemäß 1–3 Wochen
- Prompts 68 (Google CMP + Consent Mode v2) und 85 (next/script-Migration) bleiben parkend bis AdSense-Approval

### Welle-3-Backlog

| Item | Aufwand | Trigger zum Aufgreifen |
|---|---|---|
| **151-Sammelrest** | ~1–2 h | ~25 nicht-priorisierte P3-Items aus Block-A-Audit (Norm-Zitierungs-Polish, Edge-Case-FAQs, kleine SSOT-Refactor-Kandidaten). Detaillierte Liste im 151-Sammelrest-Abschnitt im 151-Block oben. Kein externer Druck. |
| **P3-B1** | mehrere h | ueberstunden-rechner: pauschale 40 %-Netto-Schätzung durch realistische Lohnsteuer-Tabelle ersetzen. Erfordert UI-Erweiterung (Steuerklasse + Bundesland als Inputs), Anbindung an `lib/berechnungen/lohnsteuer.ts`. |
| **Validation-Sweep** | mehrere Sessions | Range-Validation systemweit über alle 170 Rechner + SSOT-Konsumption-Inventur + Cross-Check gegen externe Oracles (BMF, Stiftung Warentest, IHK, Steuerberater-Tools). |

Alle drei Items sind elastisch — kein externer Druck, keine Stichtage.

### Methodik-Lehre 25 (nachgereicht aus Vorfall 28.04.2026, ArbeitstageRechner)

**Smoketest-Soll-Werte auf Component-Layer referenzieren, nicht auf Lib-Layer.**

Beim Live-Test des ArbeitstageRechners nach 152b zeigte der Rechner für Bayern 2026 in der Liste „Berücksichtigte Feiertage" 9 Einträge — das hatte Karsten irritiert, weil mein Smoketest-Akzeptanzkriterium 13 versprochen hatte. Tatsächlich hat die Lib `anzahlFeiertage(2026, 'by')` korrekt **13** geliefert (alle Feiertage in BY 2026), aber das Component zeigt nur die **Mo-Fr-Untermenge** (9), weil ein Sa/So-Feiertag keinen Arbeitstag „abzieht". Beide Werte sind richtig — auf unterschiedlichen Layern.

**Konsequenz:** Bei Smoketest-Anweisungen aus Sicht des sichtbaren UI-Outputs formulieren, nicht aus Sicht der Lib-Tests. Lib-Funktion und UI-Filter können unterschiedliche Sichten auf dieselben Daten haben. Ergänzung zu Lehre 20 (Reviewer findet Bonus-Bugs durch grep).

### Repo-Snapshot zum Session-Wechsel

- **Branch:** main
- **Letzter Commit:** `3ae42c1` (Prompt 150e-2 Doku-Sync)
- **Vorletzter:** `08017f8` (Prompt 150e-1 Code: Süd-OLG-UI-Toggle)
- **Build-Status:** grün, alle Prebuild-Hooks (footer + jahreswerte + slug-drift + generate-client-data) durch
- **Working tree:** clean

### Session-Handover-Anker für die nächste Chat-Session

**Trigger-Wort:** „Start"

In der nächsten Session bei „Start":

1. Memory wird automatisch geladen (Welle-3-Status #16, AdSense-Stand #13, Methodik-Lehren 20–29 #28)
2. Diese Datei lesen — der „WELLE 3 — Session-Handover (28.04.2026)"-Block (dieser hier) gibt den vollen Stand
3. Karsten klärt zuerst, ob AdSense-Re-Review schon beantragt wurde (Backend-Status) — falls nicht, erinnern, dass die Maßnahme nach 154+155+156 ansteht
4. Welle-3-Backlog hat noch 3 Items: 151-Sammelrest, P3-B1, Validation-Sweep
5. Karsten fragen, welcher Slot dran ist; bei freier Wahl Reihenfolge-Vorschlag bringen

Bei freier Wahl: **151-Sammelrest** ist der natürlichste nächste Slot (gleiche Methodik wie 151 selbst, atomic Konfig-Patches, kein Verify-Skript, kalkulierbare Session-Länge ~1–2 h). **P3-B1** ist substantieller (UI-Refactor + Steuerklasse-Input). **Validation-Sweep** ist mehrere Sessions und sollte als eigenständige Planungs-Session gestartet werden.

Falls AdSense-Re-Review zwischenzeitlich approved: keine Folge-Aktion nötig, der Re-Review-Status wird einfach im AdSense-Backend angezeigt. Falls negativ: erst dann hat es Sinn, weitere E-E-A-T-Maßnahmen anzufassen (z. B. Author-Bio pro Rechner-Seite, expliziter Update-Log).

*Dieses Dokument wurde beim Session-Handover am 28.04.2026 erstellt.*
