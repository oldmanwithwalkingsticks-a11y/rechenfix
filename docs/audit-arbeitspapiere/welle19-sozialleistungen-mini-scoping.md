# Welle 19 · Mini-Scoping — Sozialleistungen-Untergruppe (pflegegeld, bafoeg, aufstiegs-bafoeg)

## Zweck
Fünfte Domäne: drei Sozialleistungs-/Förderrechner mit eigenen Libs. pflegegeld (SGB XI), bafoeg (BAföG), aufstiegs-bafoeg (AFBG „Meister-BAföG"). Eigene Sätze je Gesetz. YMYL. Repo-Ablage: `docs/audit-arbeitspapiere/welle19-sozialleistungen-mini-scoping.md`. Alle drei `kategorieSlug:'finanzen'`.

## GEMEINSAME YMYL-DATENAUFLAGE (wie Steuer-Block)
1. **Lib gewinnt über Memory/Web.** Werte NUR aus der jeweiligen Lib. Bei Konflikt: Lib gewinnt, melden.
2. Kein Vorjahres-/Falschwert. 2026-Werte.
3. Primärquelle § + gesetze-im-internet.de → „Quellen & Rechtsgrundlagen".
4. Stichtag „(Stand 2026)".
5. Keine Sozial-/Rechtsberatung. Disclaimer.
6. `beispiel`-Feld-Pflicht-Self-Check gegen Lib.

## VERIFIZIERTE WERTE 2026 (web 06/2026 gegen SGB XI / BAföG / AFBG)
### pflegegeld (§§ 36/37/40/42a/43/45b SGB XI) — Lib BEREITS GEFIXT (Commit 42baa69)
Lib steht jetzt auf 2026 (PUEG +4,5 % ab 01.01.2025, 2026 unverändert, nächste Dynamisierung 01.01.2028):
- Pflegegeld PG2–5: **347/599/800/990 €**; PG1: 0 (kein Pflegegeld, aber Entlastung).
- Pflegesachleistung PG2–5: **796/1.497/1.859/2.299 €**.
- Vollstationär PG1–5: **131/805/1.319/1.855/2.096 €**.
- Entlastungsbetrag **131 €**/Mon (§ 45b, alle PG 1–5); Pflegehilfsmittel **42 €**/Mon; Wohnraumanpassung **4.180 €**.
- Verhinderungs-/Kurzzeitpflege: **Gemeinsamer Jahresbetrag 3.539 €** (§ 42a, seit 01.07.2025; ersetzt getrennte Töpfe). Im Content als gemeinsamer Topf erklären, NICHT als zwei separate.
- Pflegegeld ist steuerfrei (§ 3 Nr. 1a EStG). Kombinationsleistung § 38 (anteilig).

### bafoeg (§§ 11–14a, 21–30 BAföG) — Lib KORREKT (Stand 01.08.2024, 992 €), KEIN Fix nötig
- Höchstsatz Studium auswärts **992 €** (Grundbedarf 475 + Wohnpauschale 380 + KV/PV-Zuschlag 137); familienversichert 855 €. Stand SoSe/WS 2025/26, gilt 2026 unverändert.
- **WS-2026/27-Erhöhung (Wohnpauschale 380 → 440 €) ist NUR GEPLANT, NICHT BESCHLOSSEN** (Stand 06/2026: kein Gesetzentwurf, Verschiebung auf WS 2027/28 wahrscheinlich). Content MUSS das als „geplant, noch nicht beschlossen" kennzeichnen — NICHT als geltendes Recht. Lib-Kommentar (zweiter Bucket offen) ist korrekt.
- Hinzuverdienstgrenze an Minijob 603 € gekoppelt; Vermögensfreibetrag § 29.

### aufstiegs-bafoeg (AFBG „Meister-BAföG") — Lib `afbg.ts`/`afbg-parameter.ts`, vor Bau lesen
- Werte AUS DER LIB (Maßnahmebeitrag, Unterhaltsbeitrag, Zuschuss-/Darlehensanteile, Erlass bei Bestehen). NICHT mit Studi-BAföG verwechseln (anderes Gesetz, andere Sätze). Vor Build vollständig lesen + gegen aktuelle AFBG-Sätze prüfen.

## ABGRENZUNG
- pflegegeld = Pflegeversicherungsleistungen (SGB XI), Pflegegrad-abhängig.
- bafoeg = Ausbildungsförderung Studium/Schule (BAföG), einkommensabhängig.
- aufstiegs-bafoeg = Fortbildungsförderung (AFBG), Meister/Techniker/Fachwirt — KEIN Studium.
- Token-Kollision „bafoeg" zwischen den letzten beiden ist real → check-themen-kollision beachten, klare Abgrenzung im Text (Studium vs. Aufstiegsfortbildung).

## REIHENFOLGE
- p1 `pflegegeld-rechner` (Leitformat: tabelle — Leistungen nach Pflegegrad). Lib bereits gefixt → baubar.
- p2 `bafoeg-rechner` (Leitformat: beispielrechnung — Bedarf/Anrechnung an Beispielen). Mit „geplant"-Hinweis.
- p3 `aufstiegs-bafoeg-rechner` (Leitformat: nach Lib-Lesung; anders als p2). Erst nach Lib-Prüfung.

## PRO-PROMPT-DISZIPLIN
- Header SKILL.md+CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar, NIE `git add .`.
- Vor Content: jeweilige Lib + Component lesen. Werte 1:1. Eigene Probe gegen Lib.
- bafoeg: geplante WS-2026/27-Erhöhung NUR als unverbindlicher Ausblick.
- ≥11 Blöcke, kein text >170 W, ~1.560 W, eigenes Leitformat je Rechner.
- config.quellen § + gesetze-im-internet.de (SGB XI / BAföG / AFBG).
- Self-Check: Wortzahl + Struktur + Jahreswerte-Lint + Themen-Kollision + `beispiel`-Feld gegen Lib.
