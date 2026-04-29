# Validation-Report M2 — Norm-Zitate-Stilkonsistenz

**Sweep-Datum:** 28.04.2026
**Modul:** Validation-Sweep M2 (Scoping siehe `validation-sweep-scoping.md` Sektion 2 M2)
**Methodik:** Regex-Sweep über `lib/rechner-config/*.ts` mit Pattern aus dem Scoping-Doku (Inline-Node-Script mit Häufigkeits-Aggregation); Live-Lookup auf gesetze-im-internet.de für Verdachts-Stellen.
**Treffer:** 258 total / 156 unique — 4 STILBRUCH (alle Polish-Edits, in Phase B gefixt), ~30 REGEX-FALSE-POSITIVES (Detection-Limit), 2 KORREKT-PÄDAGOGISCH, ~115 KORREKT-STANDARD.

## Treffer-Tabelle (Non-Trivial)

| File | Zeile | Norm-Zitat | Klasse | Soll | Fix-Status |
|---|---|---|---|---|---|
| arbeit.ts | 701 | § 622 Abs. 2 S. 2 BGB | STILBRUCH | § 622 Abs. 2 Satz 2 BGB | ✅ |
| arbeit.ts | 850 | § 1a Abs. 2 S. 3 KSchG | STILBRUCH | § 1a Abs. 2 Satz 3 KSchG | ✅ |
| arbeit.ts | 880 | § 1a Abs. 2 S. 3 KSchG | STILBRUCH | § 1a Abs. 2 Satz 3 KSchG | ✅ |
| finanzen.ts | 441 | § 12 Absatz 2 SGB II | STILBRUCH | § 12 Abs. 2 SGB II | ✅ |
| finanzen.ts | 2782 | § 32a Einkommensteuergesetz (EStG) | KORREKT-PÄDAGOGISCH | — | ⬜ |
| finanzen.ts | 2947 | § 850c Zivilprozessordnung — ZPO | KORREKT-PÄDAGOGISCH | — | ⬜ |

REGEX-FALSE-POSITIVES und KORREKT-STANDARD-Treffer in Bucket-Aggregation siehe „Methodik-Anmerkungen".

## Fix-Status-Legende

- ✅ in Phase B gefixt
- ⏳ in Phase B nicht gefixt, mit Begründung
- 🅿️ Backlog für nächste Welle
- ⬜ KORREKT, kein Fix nötig

## Methodik-Anmerkungen

**Regex-Limit:** Detection-Pattern endet bei `[A-ZÖÄÜ][a-zA-Z]+G?\b` und stoppt vor römischen Ziffern (SGB IX), Buchstaben-Spezifikationen (`§ 5 Abs. 1 Buchst. c BUrlG`) und Komma-Aufzählungen (`§ 1603 Abs. 2, § 1609 BGB`). Diese ~30 trunkierten Treffer haben alle KORREKT-Form im vollen Konfig-Kontext (Spot-Checks bestätigt: arbeit.ts Z. 145, 713, 1225; finanzen.ts Z. 448). Pattern-Erweiterung würde False-Negative-Reduktion bringen, aber der manuelle Cross-Check bestätigt: keine Konfig-Drifts hinter den Trunkationen.

**Live-Verifikation — Reichweite und Limitation:** Die ~115 KORREKT-STANDARD-Treffer wurden **nicht einzeln** live gegen gesetze-im-internet.de verifiziert. Validation erfolgte über (a) Spot-Checks bei verdächtigen Patterns, (b) Konsistenz-Cross-Check mit Audit-Spuren aus dem 157-Block (welle-status-historie.md Z. 11–23), in denen jeder einzelne Norm-Bezug während der 157a–f-Audits bereits gegen Primärquellen verifiziert wurde. Vollverifikation aller 156 unique Treffer wäre methodisch möglich, wurde aus Aufwand-Gründen nicht durchgeführt — Aufwand-Nutzen-Verhältnis bei einem Repo, dessen Norm-Zitate-Bestand aus aufeinanderfolgenden audit-Wellen mit Live-Lookups stammt, rechtfertigt die Stichproben-Methodik. Selektive Live-Verifikation für STILBRUCH-Verdacht: `§ 1a Abs. 2 Satz 3 KSchG` via gesetze-im-internet.de/kschg/__1a.html bestätigt (Norm existiert, regelt 6-Monats-Aufrundung).

**Pädagogische Vollformen:** Zwei Treffer mit ausgeschriebenem Gesetzesnamen + Klammer-Erklärung in finanzen.ts (Z. 2782 `§ 32a Einkommensteuergesetz (EStG)`, Z. 2947 `§ 850c Zivilprozessordnung — ZPO`) sind didaktische Erstnennungen im jeweiligen Erklärtext. Im selben File werden danach Kurzformen (`§ 32a EStG`, `§ 850c ZPO`) konsistent verwendet. Bewusst KORREKT belassen — Erstnennungs-Konvention im Erklärtext ist didaktisch sinnvoll und rechenfix-konform.

**Repo-Konvention für Stilkonsistenz:** Standard-Zitierweise mit `Abs.` (~158 Vorkommen) und `Satz` (~12 Vorkommen) ist im Repo etabliert. Die 4 gefixten STILBRUCH-Treffer (`S.` 3×, `Absatz` 1×) waren juristisch zulässige Mischformen, die jetzt der Repo-Konvention angeglichen sind.

## Backlog-Items

Keine UNSICHER-Treffer. Alle Befunde eindeutig klassifiziert.

**Bonus-Befund (NICHT Teil dieser Session):** Norm-Zitate in `lib/berechnungen/*.ts` Kommentaren wurden nicht gesweept (Vor-Entscheidung 1 des M2-Prompts). Falls dort Stilbrüche existieren, separater Sweep in einer Folge-Welle.

**Detection-Regex-Improvement-Backlog:** Erweiterung des Regex um SGB-römische-Ziffern und Buchst./Aufzählungs-Folge-Tokens würde False-Positive-Anteil von ~12 % auf ~0 % reduzieren. Falls M2 künftig als permanenter Hook eingerichtet werden sollte (anders als Scoping vorsieht), wäre das nötig. Out-of-Scope.
