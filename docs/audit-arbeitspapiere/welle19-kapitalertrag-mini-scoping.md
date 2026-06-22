# Welle 19 · Mini-Scoping — Kapitalertragsteuer/Abgeltungsteuer-Domäne (eigenständiger Finanz-Block)

## Zweck
Zweite eigenständige Finanz-Domäne. Kapitalertragsteuer (Abgeltungsteuer § 32d EStG + Teilfreistellung § 20 InvStG). Eigene Werte (Sparerpauschbetrag, 25 %, Teilfreistellungen), NICHT der ESt-Tarif. YMYL. Repo-Ablage: `docs/audit-arbeitspapiere/welle19-kapitalertrag-mini-scoping.md`. Logik liegt im **Component** (`KapitalertragsteuerRechner.tsx`), KEINE eigene Lib — Component ist Source of Truth.

## GEMEINSAME YMYL-DATENAUFLAGE (wie Steuer-Block, gilt voll)
1. **Component gewinnt über Memory/Web** (hier keine Lib). Werte/Reihenfolge NUR aus `KapitalertragsteuerRechner.tsx`. Bei Konflikt: Component gewinnt, melden.
2. Kein Vorjahres-/Falschwert. 2026-Werte (web-bestätigt 06/2026).
3. Primärquelle § + gesetze-im-internet.de → „Quellen & Rechtsgrundlagen".
4. Stichtag „(Stand 2026)".
5. Keine Steuer-/Anlageberatung. Disclaimer + Hinweis Günstigerprüfung/Anlage KAP.
6. `beispiel`-Feld-Pflicht-Self-Check gegen Component-Logik (Lehre Steuer-Block: 4× stale gefangen).

## VERIFIZIERTE WERTE 2026 (gegen § 32d EStG / § 20 InvStG, web 06/2026 — Component spiegelt exakt)
- **Abgeltungsteuer: 25 %** (§ 32d EStG); + **Soli 5,5 %** darauf → effektiv **26,375 %** ohne KiSt.
- Mit Kirchensteuer (8 % BY/BW, sonst 9 %): effektiv ~27,82 % / ~27,99 %. **Sonderregel:** KiSt mindert die Bemessungsgrundlage → AbgSt = steuerpflichtig / (4 + k), k = KiSt-Satz als Dezimal (Component-Formel, § 32d Abs. 1 S. 4–5). NICHT naiv steuerpflichtig × 25 % bei KiSt!
- **Sparerpauschbetrag: 1.000 € (ledig) / 2.000 € (verheiratet)** (seit 2023, 2026 unverändert).
- **Teilfreistellung § 20 InvStG (Privatanleger):** Aktienfonds/Aktien-ETF (≥51 % Aktien) 30 % · Mischfonds (≥25 %) 15 % · Zinsen/Dividenden/Direkt-Aktien 0 %. (Immobilienfonds 60/80 % — nur falls Component sie führt; aktuell NICHT in den 5 Ertragsarten.)
- **Berechnungsreihenfolge (Component, PFLICHT einhalten):** Ertrag → Teilfreistellung abziehen → Verlustverrechnung (Aktien-Topf getrennt) → Sparerpauschbetrag → Abgeltungsteuer (+Soli +ggf. KiSt). Beispiele in dieser Reihenfolge rechnen.
- Effektivsatz Aktien-ETF nach Teilfreistellung ≈ 18,5 % (0,7 × 26,375 %).

## ABGRENZUNG
- `kapitalertragsteuer-rechner`: Steuer auf Kapitalerträge (Zinsen/Dividenden/Fonds), Abgeltung + Teilfreistellung.
- `etf-sparplanrechner` (separater offener Slug): Vermögensaufbau/Sparplan-Endwert — KEINE Steuer-Domäne, eigener Rechner; hier NICHT mitscopen.
- Gegen ESt-Tarif-Rechner: anderer Steuertyp (pauschal 25 % statt progressiv). Token-Kollision „steuer" nur Wort.

## REIHENFOLGE
- k1 `kapitalertragsteuer-rechner` (Leitformat: beispielrechnung-Sammlung — verschiedene Ertragsarten durchrechnen; Schwerpunkt Teilfreistellung + Sparerpauschbetrag-Wirkung). Einzelner Rechner dieser Domäne.

## PRO-PROMPT-DISZIPLIN
- Header SKILL.md+CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar, NIE `git add .`.
- Vor Content: `KapitalertragsteuerRechner.tsx` lesen. Werte + Reihenfolge 1:1.
- EIGENE PROBE: Aktien-ETF-Beispiel selbst rechnen (Teilfreistellung 30 % → Pauschbetrag → 25 %+Soli), KiSt-Variante über die /(4+k)-Formel. Gegen Component abgleichen.
- ≥11 Blöcke, kein text >170 W, ~1.560 W.
- config.quellen § 32d EStG + § 20 InvStG + gesetze-im-internet.de.
- Self-Check: Wortzahl + Struktur + Jahreswerte-Lint + `beispiel`-Feld gegen Component.
