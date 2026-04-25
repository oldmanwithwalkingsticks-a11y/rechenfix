# Rechenfix Welle-Status-Historie

**Zweck:** Konsolidierte Übersicht aller abgeschlossenen Audit-Wellen, offenen Punkte und Lessons-Learned. Ersetzt mehrere kleinere Memory-Einträge durch eine zentrale Doku-Datei.

**Update-Regel:** Bei Welle-Abschluss neuen Block oben einfügen. Memory-Eintrag verweist auf diese Datei.

**Stand:** 25.04.2026

---

## Welle 2 — ABGESCHLOSSEN April 2026

### Stufe 3 Wohnen (25.04.2026, Prompts 147 + 147b + 147c + 148 + 148b)

**Scope:** 25 Rechner (Block A 12 rechtssensitiv + Block B 13 Mengen)
**Commits gesamt:** ~16 atomic Commits
**Verify-Tests:** 87+ grün gegen externe Primärquellen (Bundesnetzagentur, BT-Drs. 21/322, BDEW, KfW, Mertens, VDI 6002, DWD, DIA, PVGIS)

**Neue SSOT-Libs in `lib/berechnungen/`:**
- `strompreis.ts` — BDEW-Mittel + WP-Tarif + Grundversorgung
- `eeg-einspeiseverguetung.ts` — Halbjahres-Schalter nach § 49 EEG
- `beg-foerderung.ts` — KfW 458 Boni-Logik (max. 70%)
- `vpi.ts` — Destatis VPI-Werte
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

## Geparkte Items (Stand 25.04.2026)

| Item | Trigger zum Aufgreifen |
|---|---|
| **Prompt 68** (Google CMP + Consent Mode v2) | Erst nach AdSense-Approval — Prompt 69 wäre Rollback |
| **Prompt 85** (next/script Migration) | Parallel zu 68, gleiche Bedingung |
| **Prompt 120c** (Wohngeld-Refactoring) | Juni 2026, parallel zu Bürgergeld-Reform 01.07.2026 |
| **Prompt 146** (Doku-Sync) | Erstellt aber NICHT ausgeführt — Inhalt aus Memory rekonstruierbar |
| **Amazon-Tag-Integration** | Deadline ~19.10.26 |
| **Prompt 148c** (Mieterbund-Wert nebenkosten-rechner) | Wenn Karsten aktuellen Wert von mieterbund.de hat |
| **Welle 3 Validation-Sweep** | Großer Tech-Debt-Track: Range-Validation systemweit + SSOT-Konsumption-Inventur über alle Components |

---

## Audit-Methodik (etabliert über die Wellen)

### 4-Punkt-Audit (Welle 2 Standard, ab 23.04.2026)
1. Formel/Rechtsquelle
2. Input-Validierung
3. Edge Cases
4. SSOT-Hygiene

### Lessons-Learned Welle 2 Stufe 3 (25.04.2026)

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
- Nur `npm run build` triggert Prebuild-Hooks (check-footer + check-jahreswerte + generate-client-data.ts)

### Casing-Bug-Pattern (aus 145b)
- Windows-NTFS case-insensitive vs. Linux/Vercel case-sensitive
- Fix bei case-only-Renames: Zwei-Schritt-`git mv` (mv→Zwischenname→mv)
