# Welle 19 · Gesundheits-Bündel — Scoping & gemeinsame Wellbeing-Schutzauflage

## Zweck
Die 8 bewusst ausgesparten, Wellbeing-sensiblen gesundheit-Rechner auf Goldstandard. Alle `kategorieSlug: 'gesundheit'`, keiner migriert. Reihenfolge unten. JEDER Prompt referenziert die hier definierte Schutzauflage (gilt für alle 8, steht im Prompt jeweils oben verlinkt).

Vorbild für den Ton ist der bereits migrierte `koerperfett-rechner`: neutrale „Orientierungsspannen" statt Ziel-/Idealwerte, expliziter „kein Maßstab zum Selbstvergleich / nicht zur Selbstoptimierung"-Block, Verweis auf Ärzte/Beratungsstellen, „Schätzung, kein medizinischer Befund". Diesen Rechner als Kopiervorlage für Tonalität nehmen — NICHT die dünnen Alt-Stände.

## GEMEINSAME WELLBEING-SCHUTZAUFLAGE (Pflicht in allen 8)
1. **Kein Ideal-/Zielwert-Framing.** Werte sind Orientierung/Einordnung, nie ein anzustrebendes Ziel. Wo der Slug-Name ein Ziel suggeriert (idealgewicht), den Frame im Content aktiv entschärfen.
2. **Keine Selbstoptimierungs-/Vergleichs-Aufforderung.** Ein Pflicht-`text`- oder `infobox`-Block sinngemäß: „Dieser Wert ist kein Maßstab, um sich mit anderen zu vergleichen oder den eigenen Körper zu verändern."
3. **Verweis auf professionelle Hilfe**, wo Körperbild/Essverhalten/seelische Belastung berührt wird: Ärztinnen/Ärzte, Beratungsstellen, Psychotherapie. Bei Essstörungs-Nähe (idealgewicht, schwangerschaft-gewicht): konkrete, deutsche Anlaufstelle nennen — das **BZgA-Beratungstelefon für Essstörungen, 0221 892031** (kostenlos, anonym; Träger BIÖG/Bundeszentrale für gesundheitliche Aufklärung) bzw. die BZgA-Beratungsstellen-Datenbank. Daneben neutral „ärztliche oder psychotherapeutische Beratung". KEINE US-Organisationen (z. B. NEDA, „Alliance for Eating Disorders") nennen — die sind im deutschen Kontext falsch. Stand der Nummer per web_search vor dem Bau bestätigen, nicht aus diesem Dokument blind übernehmen.
4. **Klarer medizinischer Disclaimer:** „liefert Orientierung/Einordnung, keine medizinische Diagnose oder Behandlungsempfehlung; ersetzt keine ärztliche Abklärung."
5. **KEINE konkreten Diät-, Kalorien-, Trainings- oder Abnehm-Zielzahlen ableiten** (auch nicht als „Tipp"). Protein-Rechner: Bedarf sachlich erklären, aber NICHT mit Abnehm-/Muskelaufbau-Zielprogrammen verknüpfen.
6. **Substring-Fehlalarm-Lehre:** Negationen/Schutzformulierungen („kein Ideal", „nicht zur Selbstbewertung") lösen bei Substring-Checks Fehlalarm aus — beim Self-Check IMMER im Kontext gegenlesen.

## Wellbeing-Verschärfung je Untergruppe
- **Körperbild (idealgewicht, whr, protein):** strengste Auflage. idealgewicht = heikelster Slug der Welle (Name suggeriert Zielwert) → Frame-Entschärfung Pflicht, mehrere historische „Idealgewicht"-Formeln (Broca/Creff) als das darstellen, was sie sind: grobe, veraltete Faustformeln, kein Gesundheitsziel.
- **Schwangerschaft/Fruchtbarkeit (ssw, schwangerschaft-gewicht, zyklus):** medizinischer Disclaimer + emotionaler Takt. zyklus: ausdrücklich **„kein Verhütungsmittel / keine Familienplanungs-Sicherheit"** und „ersetzt keine ärztliche Beratung". schwangerschaft-gewicht: IOM-Bereiche als Orientierung, KEINE Bewertung/Beschämung; Verweis auf betreuende Ärztin/Hebamme.
- **Medizin/Sucht (blutdruck, raucher):** blutdruck = YMYL-Klassifikation, Primärquelle Pflicht (s. u.). raucher = Kostenrechner, NICHT moralisieren; Rauchen sachlich als Kostenfaktor, Ausstiegs-Hilfsangebote (BZgA Rauchfrei-Programm) dezent nennen, ohne Druck.

## YMYL-Datenlage (vor Bau lesen, NICHT aus Memory)
- **blutdruck:** Lib `lib/berechnungen/blutdruck.ts` nutzt **ESH-2023-Klassifikation** (optimal <120/80, normal 120–129/80–84, hochnormal 130–139/85–89, Hypertonie Grad 1 140–159/90–99, Grad 2 160–179/100–109, Grad 3 ≥180/110, isoliert systolisch). VERIFIZIERT gegen Primärquelle (Stand 06/2026): ESH 2023 hält an dieser Einteilung fest; Praxis-Grenzwert 140/90 (Deutsche Hochdruckliga). Content nutzt EXAKT die Lib-Werte. Hinweis-Block ergänzen: Die **ESC-2024**-Leitlinie verwendet eine strengere, vereinfachte Einteilung (neue Kategorie „erhöhter Blutdruck" 120–139/70–89) — als Kontext nennen, damit der Rechner nicht veraltet wirkt; Basis bleibt die ESH-Klassifikation der Lib. Quellen: Deutsche Hochdruckliga (hochdruckliga.de), ESH 2023.
- **idealgewicht:** Lib `idealgewicht.ts` (Broca/Creff/BMI-basiert). Formeln 1:1 lesen; im Content als historische Faustformeln einordnen.
- **whr:** Lib `whr.ts`; WHO-Schwellen für WHR (Risikoeinordnung) aus der Lib übernehmen, als Orientierung framen.
- **schwangerschaft-gewicht:** Lib `schwangerschaft.ts`; IOM-Empfehlungsbereiche aus der Lib.
- **raucher:** Lib `raucher.ts`.
- **protein, ssw, zyklus:** KEINE Lib gefunden → Logik in den Components (`ProteinRechner.tsx`, `SswRechner.tsx`, `ZyklusRechner.tsx`). Component lesen, Formel-Annahmen 1:1 übernehmen.

## Themen-Abgrenzung (check-themen-kollision.mjs bestätigt)
Gewichts-/BMI-Gruppe teilt das Feld — je eigener Erkenntniswert, klar abgrenzen:
- `bmi-rechner` (Top-10, Gold): Verhältnis Gewicht/Größe.
- `koerperfett-rechner` (Gold): Fettanteil via Umfänge.
- `idealgewicht`: historische Gewichts-Faustformeln (Broca/Creff) — als grobe Orientierung, kein Ziel.
- `whr`: Fettverteilung Taille/Hüfte (Risiko-Indikator).
- `schwangerschaft-gewicht`: IOM-Zunahmebereiche in der Schwangerschaft.
Jeweils im Text nennen, wofür welcher Rechner steht, und betonen: keiner ist ein Gesundheits-„Ziel".
ssw ↔ schwangerschaft-gewicht ↔ `geburtstermin-rechner` sauber trennen (SSW-Stand vs. Gewichtsverlauf vs. ET-Datum).

## Reihenfolge (Tranche t70–t77) — heikelste zuletzt, damit Schutzmuster sich einspielt
- t70 `whr-rechner` (Risiko-Indikator, gut neutralisierbar — Einstieg)
- t71 `blutdruck-rechner` (YMYL-Klassifikation, klare Primärquelle — Routine etablieren)
- t72 `raucher-rechner` (Kostenrechner, Sucht-Takt)
- t73 `protein-rechner` (Bedarf sachlich, kein Trainings-Zielframe)
- t74 `ssw-rechner` (Schwangerschaft, medizinischer Takt)
- t75 `zyklusrechner` (Fruchtbarkeit, „kein Verhütungsmittel")
- t76 `schwangerschaft-gewicht-rechner` (IOM, Beschämungs-Vermeidung)
- t77 `idealgewicht-rechner` (heikelster Slug — Frame-Entschärfung, mit eingespieltem Schutzmuster zuletzt)

## Pro-Prompt-Disziplin (wie gehabt)
- Header: SKILL.md+CLAUDE.md lesen, linear, keine Rückfragen, Build-Gate nur Vercel-grün, atomare Commits, NIE `git add .`.
- Vor Content: Lib/Component lesen (Werte NIE aus Memory). Leitformat je Rechner anders. ≥11 Blöcke, kein text >170 W, ~1.560 W.
- config.quellen Pflicht; bei blutdruck/whr/schwangerschaft Primärquellen (Hochdruckliga/WHO/IOM), sonst Methodik.
- Vor jedem Prompt `node scripts/check-themen-kollision.mjs <slug>` laufen lassen, Abgrenzung in den Prompt schreiben.
- Self-Check: Wortzahl + Struktur + Wellbeing-Substring-Check IM KONTEXT gegengelesen.
