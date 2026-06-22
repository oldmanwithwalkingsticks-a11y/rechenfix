# Welle 19 · Mini-Scoping — Gewerbesteuer-Domäne (eigenständiger Finanz-Block)

## Zweck
Dritte eigenständige Finanz-Domäne. Gewerbesteuer (§§ 6/7/11 GewStG + § 35 EStG-Anrechnung). Eigene Werte (Freibetrag, Messzahl, Hebesatz), kommunale Steuer — NICHT der ESt-Tarif. YMYL. Lib `gewerbesteuer.ts` ist SSOT. Repo-Ablage: `docs/audit-arbeitspapiere/welle19-gewerbesteuer-mini-scoping.md`.

## GEMEINSAME YMYL-DATENAUFLAGE (wie Steuer-Block)
1. **Lib gewinnt über Memory/Web.** Werte NUR aus `gewerbesteuer.ts`. Bei Konflikt: Lib gewinnt, melden.
2. Kein Vorjahres-/Falschwert. 2026-Werte (web-bestätigt).
3. Primärquelle § + gesetze-im-internet.de → „Quellen & Rechtsgrundlagen".
4. Stichtag „(Stand 2026)".
5. Keine Steuerberatung. Disclaimer + Hinweis: Hebesatz variiert je Gemeinde (selbst prüfen).
6. `beispiel`-Feld-Pflicht-Self-Check gegen Lib.

## VERIFIZIERTE WERTE (gegen §§ 11 GewStG / 35 EStG — Lib spiegelt exakt)
- **Freibetrag: 24.500 €** (§ 11 Abs. 1 GewStG) — NUR für Personengesellschaften/Einzelunternehmen, NICHT Kapitalgesellschaften (GmbH: 0 €).
- **Steuermesszahl: 3,5 %** (§ 11 Abs. 2 GewStG) — einheitlich.
- **Hebesatz: gemeindeabhängig** (mind. 200 % gesetzlich; typisch 250–490 %; Großstädte oft 400–490 %). Eingabe-Parameter, kein Fixwert. Default Component 400.
- **Berechnung:** Gewerbeertrag = Gewinn + Hinzurechnungen − Kürzungen − Freibetrag (Personenges.) → auf volle 100 € abgerundet → × 3,5 % = Steuermessbetrag → × Hebesatz = Gewerbesteuer.
- **§ 35 EStG-Anrechnung (PFLICHT beachten):** Nur Personengesellschaften/Einzelunternehmen. Anrechnung auf die ESt = Steuermessbetrag × min(Hebesatz/100, 4,0), gedeckelt auf die tatsächliche Gewerbesteuer. Effekt: bis Hebesatz ~400 % ist die Gewerbesteuer für Personengesellschaften nahezu neutral (wird auf ESt angerechnet). Bei Kapitalgesellschaften KEINE Anrechnung. Beispiele über die Lib rechnen, nicht naiv.

## ABGRENZUNG
- `gewerbesteuer-rechner`: kommunale Gewerbesteuer (Gewinn → Messbetrag → Hebesatz), § 35-Anrechnung.
- Gegen `einkommensteuer`/ESt-Tarif: andere Steuer (kommunal, gewinnbezogen, Hebesatz). `gmbh-geschaeftsfuehrer-rechner` (offen) ist ein anderer Rechner (Geschäftsführer-Vergütung), NICHT hier.
- Token-Kollision „steuer" nur Wort.

## REIHENFOLGE
- g1 `gewerbesteuer-rechner` (Leitformat: beispielrechnung-Sammlung — Personengesellschaft vs. Kapitalgesellschaft, verschiedene Hebesätze; Schwerpunkt § 35-Anrechnung). Einzelner Rechner dieser Domäne.

## PRO-PROMPT-DISZIPLIN
- Header SKILL.md+CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar, NIE `git add .`.
- Vor Content: `gewerbesteuer.ts` + Component lesen. Werte 1:1.
- EIGENE PROBE: Personengesellschaft Gewinn 80.000, Hebesatz 400 — Gewerbeertrag (80.000−24.500=55.500) → abrunden → ×3,5 % → ×400 % → Gewerbesteuer; dann § 35-Anrechnung. Gegen Lib abgleichen. Kapitalgesellschaft-Variante (kein Freibetrag, keine Anrechnung) separat.
- ≥11 Blöcke, kein text >170 W, ~1.560 W.
- config.quellen § 11 GewStG + § 35 EStG + gesetze-im-internet.de.
- Self-Check: Wortzahl + Struktur + Jahreswerte-Lint + `beispiel`-Feld gegen Lib.
