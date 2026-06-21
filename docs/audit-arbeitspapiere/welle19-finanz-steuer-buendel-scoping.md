# Welle 19 · Finanz-/Steuer-Bündel — Scoping & gemeinsame YMYL-Datenauflage

## Zweck
Kern-Steuer-Rechner auf Goldstandard, die alle auf dieselbe Tarif-Datenbasis (`einkommensteuer.ts` / `_lohnsteuer-pap-2026.ts`) aufbauen. Gemeinsames Risiko ist NICHT Wellbeing, sondern **veraltete Steuerwerte**. JEDER Prompt referenziert diese Auflage (Repo-Pfad nach Ablage: `docs/audit-arbeitspapiere/welle19-finanz-steuer-buendel-scoping.md`).

## GEMEINSAME YMYL-DATENAUFLAGE (Pflicht in allen)
1. **Lib gewinnt, Memory verliert.** Alle Tarifwerte, Freibeträge, Pauschalen, Zonengrenzen NUR aus der zugehörigen Lib/SSOT lesen — NIE aus dem Gedächtnis. Bei Konflikt Lib↔Content: Lib gewinnt, stoppen und melden.
2. **Kein Vorjahres-Wert im 2026-Content.** Häufigster Fehler: alter Grundfreibetrag (2024: 11.784 €, 2025: 12.096 €) statt 2026. Pflicht-Gegencheck vor Commit (s. u.).
3. **Primärquelle in config.quellen** mit § + gesetze-im-internet.de-Link → erzeugt automatisch „Quellen & Rechtsgrundlagen". Steuer ist harte YMYL.
4. **Stichtag nennen.** Werte im Content mit „(Stand 2026)" / Veranlagungszeitraum kennzeichnen.
5. **Keine Steuerberatung.** Disclaimer: liefert eine Orientierung/Schätzung, keine verbindliche Steuerberechnung; im Einzelfall Finanzamt/Steuerberater. Verweis auf BMF-Steuerrechner (bmf-steuerrechner.de) als amtliche Referenz erlaubt.

## VERIFIZIERTE TARIF-WERTE 2026 (Stand 06/2026, web_search gegen § 32a EStG / BMF bestätigt)
Diese Werte sind in `einkommensteuer.ts` (TARIF_2026) bereits korrekt hinterlegt — Content muss sie 1:1 spiegeln, nicht neu erfinden:
- **Grundfreibetrag 2026: 12.348 €** (Einzel), 24.696 € (Splitting/zusammenveranlagt). § 32a Abs. 1 EStG, in Kraft 01.01.2026 (BGBl. 2024 I Nr. 449).
- **Tarifzonen 2026:** Zone 1 (Nullzone) bis 12.348 · Zone 2: 12.349–17.799 (14 % → ~24 %) · Zone 3: 17.800–69.878 (~24 % → 42 %) · Zone 4: 69.879–277.825 (konstant 42 %) · Zone 5 (Reichensteuer): ab 277.826 (45 %).
- **Tarifformeln 2026 (§ 32a):** Die Zonen-Polynome werden in verschiedenen Quellen leicht unterschiedlich gerundet/geformt. VERBINDLICH ist `TARIF_2026` in `einkommensteuer.ts` (gfb 12348, z2_ende 17799, z3_ende 69878, z4_ende 277825; Polynom-Koeffizienten z2_a/z2_b/z3_a/z3_b/z3_c/z4_m/z4_b/z5_m/z5_b dort exakt hinterlegt). Content darf die Formel-STRUKTUR zeigen, aber Zahlen NUR aus der Lib übernehmen — NICHT aus diesem Dokument oder Web-Quellen, die abweichend runden können. Eckwerte (Grundfreibetrag, Zonengrenzen, 14/42/45 %) sind quellenübergreifend identisch und unten gesichert.
- **Arbeitnehmer-Pauschbetrag (Werbungskosten) 2026: 1.230 €** (§ 9a EStG).
- **Sonderausgabenpauschale: 36 €** (§ 10c EStG).
- **Kinderfreibetrag 2026: 9.756 €** gesamt (inkl. BEA), bzw. 6.828 € reiner Kinderfreibetrag (je Quelle prüfen, welcher gemeint); Kindergeld 259 €/Monat. NUR nennen, wenn der jeweilige Rechner das nutzt — gegen Lib prüfen.
- Bei JEDEM dieser Werte vor Bau die Lib gegenlesen; falls die Lib abweicht, gilt die Lib und es wird gemeldet (nicht der Scoping-Wert blind übernommen).

## ABGRENZUNGS-MATRIX (check-themen-kollision bestätigt — alle teilen „steuer")
Jeder Rechner beleuchtet EINEN Aspekt desselben § 32a-Tarifs. Im Text klar nennen, wofür welcher:
- `einkommensteuer-rechner`: zvE → Jahres-ESt (Tarif direkt). Der „Tarif-Rechner".
- `lohnsteuer-rechner`: monatlicher Lohnsteuerabzug nach PAP/Steuerklasse (≠ Jahres-ESt).
- `brutto-netto-rechner` (Top-10, Gold): Brutto → Netto inkl. SV-Abgaben (umfassender; NICHT duplizieren).
- `steuerprogression-rechner`: Grenz- vs. Durchschnittssteuersatz visualisieren (Aspekt, nicht Gesamtsteuer).
- `splitting-rechner`: Ehegattensplitting-Vorteil (Vergleich Einzel vs. Zusammen).
- `steuerklassen-vergleich-rechner`: Steuerklassen-Wahl (III/V vs. IV/IV).
- `steuererstattung-rechner`: erwartete Erstattung (gezahlt vs. tariflich geschuldet).
Eigene Block-Reihenfolge je Rechner (Schablonen-Falle bei Steuer-Familie real — alle nutzen Tabellen+Beispielrechnung). Pro Rechner anderes Leitformat wählen.

## REIHENFOLGE (Tranche t78–t83)
- t78 `einkommensteuer-rechner` (Tarif-Kern; Leitformat Beispielrechnung — Tarif-Zonen durchrechnen). Basis für alle anderen, zuerst.
- t79 `steuerprogression-rechner` (Leitformat Diagramm — Grenz-/Durchschnittssatz-Kurve).
- t80 `splitting-rechner` (Leitformat Vergleich — Einzel vs. Zusammen).
- t81 `steuerklassen-vergleich-rechner` (Leitformat Vergleich/Tabelle — Klassen-Kombinationen).
- t82 `lohnsteuer-rechner` (Leitformat Tabelle — Lohnsteuer nach Klasse/Höhe; PAP-2026-Lib).
- t83 `steuererstattung-rechner` (Leitformat Beispielrechnung — gezahlt vs. geschuldet).
Spätere Tranchen: erbschaft/schenkung (eigene Freibeträge), gewerbesteuer, kapitalertragsteuer, afa, mwst-rueckerstattung (eigene Domänen, separates Mini-Scoping).

## PRO-PROMPT-DISZIPLIN
- Header: SKILL.md+CLAUDE.md lesen, linear, keine Rückfragen, Build-Gate Vercel-grün, atomare Commits, NIE `git add .`.
- Vor Content: zugehörige Lib lesen, Tarifwerte 1:1, eigene Probe-Rechnung (Steuerbetrag selbst gegen Lib rechnen — NIE blind übernehmen, vgl. blutdruck-L-35: Verzweigungs-/Zonenreihenfolge beachten).
- ≥11 Blöcke, kein text >170 W, ~1.560 W. Leitformat je Rechner anders.
- config.quellen mit § + gesetze-im-internet.de (Rechtsgrundlagen-Trigger).
- `node scripts/check-themen-kollision.mjs <slug>` vor Prompt; Abgrenzung (v. a. zu brutto-netto) in den Prompt schreiben.
- Self-Check: Wortzahl + Struktur + **Jahreswerte-Lint** `node scripts/check-jahreswerte.mjs` (fängt hartkodierte/veraltete Werte) + Probe-Rechnung.
