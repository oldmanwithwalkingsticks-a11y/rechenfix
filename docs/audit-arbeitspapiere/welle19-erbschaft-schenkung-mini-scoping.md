# Welle 19 · Mini-Scoping — Erbschaft-/Schenkungsteuer-Domäne (eigenständiger Finanz-Block)

## Zweck
Erste eigenständige Finanz-Domäne nach dem Kern-Steuer-Block. Erbschaft- und Schenkungsteuer gehören zusammen (gemeinsames Gesetz ErbStG; `schenkungssteuer.ts` importiert Tarif/Härtefall aus `erbschaftsteuer.ts`). Eigene Freibetrags-/Klassenlogik, NICHT der Einkommensteuer-Tarif. YMYL. Gemeinsame Datenauflage wie Kern-Steuer-Block plus domänenspezifische Werte. Repo-Ablage: `docs/audit-arbeitspapiere/welle19-erbschaft-schenkung-mini-scoping.md`.

## GEMEINSAME YMYL-DATENAUFLAGE (wie Steuer-Block, gilt voll)
1. **Lib gewinnt über Memory/Web.** Alle Freibeträge/Sätze NUR aus `erbschaftsteuer.ts` (FREIBETRAEGE, ERBST_TARIF_STUFEN, Versorgungsfreibetrag-Funktionen). Bei Konflikt: Lib gewinnt, melden.
2. **Kein Vorjahres-/Falschwert.** 2026 unverändert ggü. 2025 (web-bestätigt 06/2026).
3. **Primärquelle mit § + gesetze-im-internet.de** → „Quellen & Rechtsgrundlagen".
4. **Stichtag** „(Stand 2026)" + Hinweis auf mögliche Reform.
5. **Keine Steuer-/Rechtsberatung.** Disclaimer: Schätzung, im Einzelfall Finanzamt/Steuerberater/Notar.
6. **`beispiel`-Feld-Pflicht-Self-Check** (Lehre Steuer-Block: 4× stale gefangen): das `beispiel`-Feld gegen die Lib gegenrechnen, nicht nur die contentBloecke.

## VERIFIZIERTE WERTE 2026 (gegen § 16/§ 17/§ 19 ErbStG, web 06/2026 — Lib spiegelt diese exakt)
- **Persönliche Freibeträge § 16:** Ehepartner/eingetr. Lebenspartner 500.000 € · Kind (inkl. Stief/Adoptiv) 400.000 € · Enkel (Eltern verstorben) 400.000 € · Enkel (Eltern leben) 200.000 € · Eltern/Großeltern bei Erbschaft 100.000 € · alle übrigen (Geschwister, Nichte/Neffe, geschieden, nicht-verwandt) 20.000 €.
- **Schenkung-Sonderfall:** Eltern/Großeltern bei Schenkung nur 20.000 € (nicht 100.000 €). Freibeträge bei Schenkung alle 10 Jahre neu nutzbar (§ 14) — wichtiges Abgrenzungsmerkmal.
- **Versorgungsfreibetrag § 17:** Ehegatte 256.000 € (gekürzt um Kapitalwert steuerfreier Versorgungsbezüge); Kinder altersabhängig 10.300 € (20–27 J.) bis 52.000 € (unter 5 J.).
- **Steuerklassen § 15:** I (Ehegatte, Kinder, Enkel, Eltern b. Erbschaft), II (Geschwister, Nichte/Neffe, Schwiegerkinder, geschieden, Eltern b. Schenkung), III (alle übrigen, nicht-verwandt).
- **Tarif § 19 (Stufe → I/II/III %):** ≤75k 7/15/30 · ≤300k 11/20/30 · ≤600k 15/25/30 · ≤6 Mio 19/30/30 · ≤13 Mio 23/35/50 · ≤26 Mio 27/40/50 · darüber 30/43/50.
- **Härtefallregel § 19 Abs. 3** (PFLICHT beachten): Beim knappen Überschreiten einer Tarifstufe wird die Mehrsteuer gedeckelt (max. 50 % des überschreitenden Betrags bei Sätzen ≤30 %, 75 % bei >30 %). Die Lib-Funktion `berechneErbStMitHaertefall` macht das — Beispiele MÜSSEN über diese Funktion gerechnet werden, nicht naiv Stufe×Satz (sonst falsch bei Schwellennähe; vgl. blutdruck-L-35: Verzweigung beachten).
- **Familienheim § 13:** Ehegatte steuerfrei bei 10 J. Selbstnutzung; Kinder bis 200 m². Pflegefreibetrag § 13 bis 20.000 €. (Nur erwähnen, wenn Lib/Component sie abbilden — sonst als Kontext-Hinweis, nicht als Rechengröße.)

## ABGRENZUNG (beide Rechner sauber trennen)
- `erbschaftsteuer-rechner`: Erwerb von Todes wegen; Versorgungsfreibetrag relevant; Eltern/Großeltern 100k.
- `schenkungssteuer-rechner`: Erwerb zu Lebzeiten; KEIN Versorgungsfreibetrag; Eltern/Großeltern nur 20k; 10-Jahres-Wiederholung der Freibeträge als zentrales Thema.
- Beide gegen die Einkommensteuer-/Tarif-Rechner abgrenzen (anderes Gesetz, anderer Tarif, Token-Kollision „steuer" ist nur Wort, inhaltlich unverwandt).

## REIHENFOLGE
- e1 `erbschaftsteuer-rechner` (Leitformat: tabelle-Nachschlagewerk — Freibeträge + Tarifstufen je Klasse; Schwerpunkt Klassensystem). Zuerst, da schenkung darauf aufbaut.
- e2 `schenkungssteuer-rechner` (Leitformat: vergleich/beispielrechnung — Schenkung vs. Erbschaft, 10-Jahres-Strategie). Klar abgegrenzt, eigene Block-Reihenfolge (Schablonen-Falle vermeiden).

## PRO-PROMPT-DISZIPLIN
- Header SKILL.md+CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar, NIE `git add .`.
- Vor Content: `erbschaftsteuer.ts` + `schenkungssteuer.ts` + jeweiligen Component lesen. Werte 1:1.
- EIGENE PROBE über `berechneErbStMitHaertefall` (NICHT Stufe×Satz naiv) — gegen Lib abgleichen.
- ≥11 Blöcke, kein text >170 W, ~1.560 W, eigenes Leitformat je Rechner.
- config.quellen § 15/16/17/19 ErbStG + gesetze-im-internet.de.
- Self-Check: Wortzahl + Struktur + Jahreswerte-Lint + `beispiel`-Feld gegen Lib.
