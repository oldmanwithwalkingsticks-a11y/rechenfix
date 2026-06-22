# Welle 19 · Mini-Scoping — SV-/Einkommens-Untergruppe (midijob, nebenjob, pfaendung)

## Zweck
Vierte Domäne: drei einkommens-/beschäftigungsbezogene Rechner. midijob + nebenjob teilen die Minijob-/Midijob-Grenzen (gemeinsame Datenbasis `midijob-parameter.ts` + `sv-parameter.ts`); pfaendung hat eine EIGENE, zeitkritische Pfändungstabelle. YMYL (SGB IV / ZPO). Repo-Ablage: `docs/audit-arbeitspapiere/welle19-sv-einkommen-mini-scoping.md`.

## GEMEINSAME YMYL-DATENAUFLAGE (wie Steuer-Block)
1. **Lib gewinnt über Memory/Web.** Werte NUR aus der jeweiligen Lib. Bei Konflikt: Lib gewinnt, melden.
2. Kein Vorjahres-/Falschwert. 2026-Werte (web-bestätigt 06/2026).
3. Primärquelle § + gesetze-im-internet.de → „Quellen & Rechtsgrundlagen".
4. Stichtag „(Stand 2026)".
5. Keine Steuer-/Rechts-/Sozialberatung. Disclaimer.
6. `beispiel`-Feld-Pflicht-Self-Check gegen Lib (Lehre: stale-Werte mehrfach gefangen).

## VERIFIZIERTE WERTE 2026 (web 06/2026 gegen SGB IV / ZPO — Libs spiegeln exakt)
### Minijob/Midijob (s1, s2) — `midijob-parameter.ts` + `sv-parameter.ts`
- **Geringfügigkeitsgrenze (Minijob): 603 €/Monat** (2026; § 8 Abs. 1a SGB IV; an Mindestlohn 13,90 € gekoppelt, Formel ML×130÷3 aufgerundet). 2025 war 556 €.
- **Midijob-Übergangsbereich: 603,01 € bis 2.000 €** (§ 20 Abs. 2 SGB IV). Obergrenze 2.000 € unverändert.
- **Faktor F 2026: 0,6619** (BMAS jährlich). Midijob-Beitragsformel reduziert die beitragspflichtige Einnahme im AN-Anteil.
- SV-Größen 2026 aus `sv-parameter.ts`: KV-Zusatzbeitrag-Schnitt 2,9 %; JAEG 77.400 €/Jahr (6.450 €/Monat).
- Mindestlohn 2026: 13,90 €/h (2027: 14,60 €).

### Pfändung (s3) — `pfaendung.ts` (EIGENE Datenbasis, ZEITKRITISCH)
- **Pfändungstabelle wechselt zum 01.07.2026.** Lib wählt datumsabhängig (`getPfaendungstabelle(stichtag)`, Default heute):
  - bis 30.06.2026: Grundfreibetrag **1.555,00 €** (BGBl. 2025).
  - ab 01.07.2026: Grundfreibetrag **1.587,40 €** (BGBl. 2026 I Nr. 80 v. 26.03.2026).
- **WICHTIG (heute = 22.06.2026):** Der Wechsel ist in wenigen Tagen. Content MUSS beide Stände nennen und klar sagen, ab wann welcher gilt — sonst veraltet die Seite zum 01.07. Nicht nur den aktuellen Wert hardcoden. Erhöhung je Unterhaltspflicht gestaffelt (ZPO § 850c, Tabelle).

## ABGRENZUNG
- `midijob`: SV-Beiträge im Übergangsbereich 603,01–2.000 € (reduzierter AN-Anteil).
- `nebenjob`: Hauptjob + Nebenjob-Arten (Minijob/Steuerkarte/selbstständig); Schwerpunkt Zusammenspiel + Steuerklasse VI.
- `pfaendung`: pfändbares/pfändungsfreies Netto nach ZPO-Tabelle (§ 850c), Unterhaltspflichten. ANDERE Domäne (Zwangsvollstreckung), nur thematisch „Einkommen". Eigenes Scoping-Augenmerk: Stichtagswechsel.
- Alle gegen brutto-netto (Top-10) abgrenzen: dort vollständige Lohnabrechnung; hier Spezialfälle.

## REIHENFOLGE
- s1 `midijob-rechner` (Leitformat: beispielrechnung — Übergangsbereich-Beiträge an mehreren Bruttowerten).
- s2 `nebenjob-rechner` (Leitformat: vergleich/tabelle — Nebenjob-Arten gegenüberstellen). Anders als s1.
- s3 `pfaendungsrechner` (Leitformat: tabelle — Pfändungstabelle nach Netto + Unterhaltspflichten; PFLICHT beide Stände 1.555/1.587,40 mit Stichtag).

## PRO-PROMPT-DISZIPLIN
- Header SKILL.md+CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar, NIE `git add .`.
- Vor Content: jeweilige Lib + Component lesen. Werte 1:1. Eigene Probe gegen Lib.
- s3 ZUSÄTZLICH: Stichtags-Logik (`getPfaendungstabelle`) verstehen; beide Tabellen-Stände im Content, kein veralteter Hardcode.
- ≥11 Blöcke, kein text >170 W, ~1.560 W, eigenes Leitformat je Rechner.
- config.quellen § 8/20 SGB IV (s1/s2) bzw. § 850c ZPO (s3) + gesetze-im-internet.de.
- Self-Check: Wortzahl + Struktur + Jahreswerte-Lint + `beispiel`-Feld gegen Lib.
