# Validation-Report M6 — FAQ/Erklaerung-Drift-Stichprobe

**Sweep-Datum:** 30.04.2026
**Modul:** Validation-Sweep M6 (Scoping siehe `validation-sweep-scoping.md` Sektion 2 M6)
**Methodik:** Stichprobe von 10 eindeutigen Welle-3-Touch-Rechnern (Cluster 151a–e + 157a–f dedupliziert + 150e Süd-OLG-Toggle implizit). Hilfs-Skript-Sweep extrahiert pro Rechner alle €-Beträge + %-Werte + §-Zitate + Jahreszahlen aus den vier Feldern `formel` / `beispiel` / `erklaerung` / `faq[].antwort`. Sichtkontrolle prüft Konsistenz innerhalb des Eintrags + SSOT-Sanity gegen `lib/berechnungen/<lib>.ts`. Klassifikations-Schema: `DRIFT-WERT` (Zahlen widersprechen) · `DRIFT-BEGRIFF` (Terminologie-Inkonsistenz) · `DRIFT-NORM` (§-Bezug referenziell inkonsistent im selben Eintrag) · `DRIFT-STICHTAG` (Jahre/Daten widersprechen) · `DRIFT-FAKT` (Sachaussagen widersprechen) · `UNKLAR-DRIFT` (Karsten klärt) · `KONSISTENT` (Default).
**Treffer:** Sweep-Inventar 170 €-Werte + 38 %-Werte + 95 §-Zitate + 56 Jahreszahlen über 10 Rechner (Schnitt ≈ 36 Wert-Tokens/Rechner). Klassifikation: **5 echte Drifts** (3 DRIFT-WERT, 1 DRIFT-NORM, 1 DRIFT-FAKT), **0 UNKLAR**, alle übrigen Werte KONSISTENT.
**Status:** Phase A + Phase B abgeschlossen (30.04.2026). Code-Commit `9db82cb` — alle 5 Drifts + 2 Bonus-Befunde gefixt. Bilanz post-B: **0 verbleibende Drifts**.

## Treffer-Bilanz

### Pro Klasse

| Klasse | Anzahl |
|---|---|
| DRIFT-WERT | 3 |
| DRIFT-BEGRIFF | 0 |
| DRIFT-NORM | 1 |
| DRIFT-STICHTAG | 0 |
| DRIFT-FAKT | 1 |
| UNKLAR-DRIFT | 0 |
| **Drifts gesamt** | **5** |
| KONSISTENT | ~354 (übrige Wert-Tokens) |

### Pro Rechner

| Rechner | Drifts | Davon |
|---|---|---|
| pendlerpauschale | 0 | — |
| kuendigungsfrist | 0 | — |
| abfindung | 0 | — |
| mutterschutz | 0 | — |
| **unterhalt** | **4** | 3 DRIFT-WERT + 1 DRIFT-FAKT |
| **elternzeit** | **1** | 1 DRIFT-NORM |
| scheidungskosten | 0 | — |
| zugewinnausgleich | 0 | — |
| ehegattenunterhalt | 0 | — |
| arbeitslosengeld | 0 | — |

8 von 10 Rechnern sind drift-frei. Beide Drift-Cluster sind eng lokalisiert: unterhalt erklaerung-Absatz Z. 1239 (4 Befunde) + elternzeit erklaerung Schluss-Absatz Z. 1311 (1 Befund).

## Treffer-Tabelle (Non-Trivial)

| Rechner | Feld 1 | Auftritt 1 | Feld 2 | Auftritt 2 | Klasse | Fix |
|---|---|---|---|---|---|---|
| unterhalt | erklaerung Z. 1239 | „482 € (1. Altersstufe)" | SSOT `MINDESTBEDARF_2026['0-5']` | 486 € | DRIFT-WERT (W-01) → ✅ | 482 € → 486 € |
| unterhalt | erklaerung Z. 1239 | „554 € (2. Altersstufe)" | SSOT `MINDESTBEDARF_2026['6-11']` | 558 € | DRIFT-WERT (W-02) → ✅ | 554 € → 558 € |
| unterhalt | erklaerung Z. 1239 | „649 € (3. Altersstufe)" | SSOT `MINDESTBEDARF_2026['12-17']` | 653 € | DRIFT-WERT (W-03) → ✅ | 649 € → 653 € |
| unterhalt | erklaerung Z. 1239 | nennt nur 3 Stufen | SSOT `MINDESTBEDARF_2026['18+']` | 698 € existiert | DRIFT-FAKT (F-01) → ✅ | 4. Altersstufe „698 € (4. Altersstufe, ab 18 Jahre)" ergänzt + Altersbereich-Annotation aller 4 Stufen |
| elternzeit | erklaerung Z. 1311 | „§ 17 BEEG" (für Urlaubsübertragung) | faq[6] Z. 1321 | „§ 17 Abs. 1 BEEG" (für Urlaubskürzung) | DRIFT-NORM (N-01) → ✅ | „§ 17 BEEG" → „§ 17 Abs. 2 BEEG" am Übertragungs-Tatbestand |

## Fix-Status-Legende

- ✅ in Phase B gefixt
- ⏳ in Phase B nicht gefixt, mit Begründung
- 🅿️ Backlog für nächste Welle
- ⬜ KORREKT, kein Fix nötig

## Cluster-Analyse

### Cluster A — unterhalt DT-Mindestbedarf (4 Befunde, ein Absatz)

**Root-Cause-Hypothese:** Pre-Welle-3-Werte-Rest analog M3-Cluster-A-Pattern (BAföG). Das Item 151d (28.04.2026) hat in `unterhalt`-erklaerung den Verweis auf die 7. MUVÄndV vom 15.11.2024 als Rechtsquelle Mindestunterhalt ergänzt — die konkreten DT-Werte-Listen im selben Absatz wurden dabei aber nicht synchron auf 2026er Stand gebracht. Die Berechnung in `duesseldorfer-tabelle.ts` SSOT (`MINDESTBEDARF_2026`) ist korrekt mit 486/558/653/698 €. Das beispiel-Feld der unterhalt-Konfig (Z. 1198, „Tabellenbetrag 642 €") rechnet implizit mit 558 € als Basis (642 ≈ 558 × 1,15, EG 4) und ist konsistent mit SSOT — nur die Mindestbedarfssätze-Auflistung in erklaerung Z. 1239 hängt auf 2025er Werten.

**Konkret falsch in Z. 1239:**
- „482 €" → soll 486 €
- „554 €" → soll 558 €
- „649 €" → soll 653 €
- 4. Altersstufe (18+, 698 €) fehlt komplett

**Schadensschätzung:** Reiner Erklärtext-Drift, kein Berechnungs-Impact. Lehrbeispiele in beispiel + faq verwenden korrekte 2026er Werte (642 € Tabellenwert zu 8 Jahren, 129,50 € hälftiges Kindergeld, 513 € Zahlbetrag). Lediglich die didaktische Mindestbedarfssatz-Erklärung im Volltext ist veraltet.

**Fix-Strategie-Vorschlag (für Phase B):** Z. 1239 textlich korrigieren — Werte auf 486/558/653 € + Ergänzung 4. Stufe „698 € (4. Altersstufe, ab 18 Jahre)". Pre-5a-Disziplin: SSOT-Werte aus `duesseldorfer-tabelle.ts` `MINDESTBEDARF_2026` als Quelle, niemals Memory.

### Cluster B — elternzeit § 17 BEEG-Verweis (1 Befund, isoliert)

**Root-Cause-Hypothese:** § 17 BEEG hat zwei Absätze für Urlaubs-Themen — Abs. 1 (Kürzung um 1/12 pro Monat) und Abs. 2 (Übertragung nicht-genommenen Urlaubs nach Elternzeit). Item 151e hat faq[6] mit „§ 17 Abs. 1 BEEG" für die Urlaubskürzung präzise referenziert. Die erklaerung-Schluss-Zeile Z. 1311 spricht über Urlaubs**übertragung** und referenziert „(§ 17 BEEG)" allgemein — präziser wäre „§ 17 Abs. 2 BEEG", da Abs. 2 die Übertragung regelt, nicht der allgemeine § 17.

**Schadensschätzung:** Norm-Verweis ist juristisch nicht falsch (§ 17 BEEG ist die übergeordnete Vorschrift), aber referenziell unspezifisch und stilistisch inkonsistent mit dem strikteren faq[6]-Stil. P3-Niveau.

**Fix-Strategie-Vorschlag (für Phase B):** Z. 1311 von „(§ 17 BEEG)" auf „(§ 17 Abs. 2 BEEG)" verfeinern. Trivialer 1-Wort-Edit.

## Methodik-Anmerkungen

**Build-vorab-Status:** ✓ `npm run build` grün vor Sweep-Start (205/205 Pages, alle prebuild-Hooks bestanden).

**Sweep-Tiefe (Skript-Output-Bilanz):**

| Rechner | Eintrag-Größe | FAQ-Anzahl | €-Tokens | %-Tokens | §-Tokens | Jahr-Tokens |
|---|---|---|---|---|---|---|
| pendlerpauschale | 8.781 Z. | 7 | 16 | 4 | 3 | 5 |
| kuendigungsfrist | 11.238 Z. | 11 | 0 | 0 | 14 | 2 |
| abfindung | 10.956 Z. | 8 | 6 | 0 | 9 | 2 |
| mutterschutz | 12.098 Z. | 12 | 8 | 3 | 6 | 7 |
| unterhalt | 13.838 Z. | 12 | 35 | 7 | 12 | 7 |
| elternzeit | 9.954 Z. | 8 | 0 | 0 | 6 | 3 |
| scheidungskosten | 11.209 Z. | 6 | 23 | 12 | 4 | 3 |
| zugewinnausgleich | 12.472 Z. | 6 | 23 | 0 | 8 | 12 |
| ehegattenunterhalt | 13.435 Z. | 7 | 23 | 8 | 14 | 3 |
| arbeitslosengeld | 7.359 Z. | 7 | 7 | 4 | 5 | 2 |
| **Total** | **111.340 Z.** | **84** | **141** | **38** | **81** | **46** |

Sweep-Tiefe: ~111 KB Konfig-Text, 84 FAQ-Antworten. Drift-Rate: 5/(141+38+81+46) = 5/306 ≈ 1,6 % — niedrig, klar geclustert.

**Klassifikations-Grenzfälle (Pre-5b Volltext-Check angewendet):**

- **kuendigungsfrist § 168 SGB / § 169 SGB:** Sweep-Skript zeigte beide Norm-Tokens in faq[9] — Volltext-Check (Z. 713) bestätigt: § 169 SGB IX (Mindestkündigungsfrist 4 Wo) UND § 168 SGB IX (Zustimmung Integrationsamt) sind beide korrekt zitiert für unterschiedliche Sachverhalte. KONSISTENT, kein Drift.
- **unterhalt „§ 94 Abs":** Sweep-Skript zeigte unvollständigen Norm-Token in formel + erklaerung + faq[8] — Volltext-Check (Z. 1197/1233/1251) bestätigt vollständige Form „§ 94 Abs. 1a SGB XII". Regex-Limitation, kein Drift.
- **abfindung 17.500 € vs. 10.300 €:** verschiedene Beispielrechnungen mit verschiedenen Betriebszugehörigkeits-Annahmen (10 Jahre vs. 8 Jahre). KONSISTENT (didaktisch).
- **ehegattenunterhalt beispiel 986 € vs. erklaerung 766 €:** beispiel-Feld zeigt Basis-Fall ohne Kindesunterhalt-Vorabzug, erklaerung-Schluss-Absatz zeigt realistischen Fall mit KU-Vorabzug (157e-Update). KONSISTENT (didaktischer Aufbau).
- **zugewinnausgleich verschiedene €-Werte:** beispiel zeigt Indexierungs-Demo (15.000 → 21.084), erklaerung zeigt anderes Schenkungs-Beispiel (20.000/50.000/2.000). KONSISTENT (verschiedene Sachverhalte).

**Pre-5a SSOT-Disziplin angewendet:** Bei der unterhalt-Drift wurde nicht aus Memory entschieden — der SSOT-Wert aus `lib/berechnungen/duesseldorfer-tabelle.ts` (`MINDESTBEDARF_2026`) wurde direkt gelesen und gegen den erklaerung-Text geprüft. Das war entscheidend, weil die 482/554/649-Werte oberflächlich plausibel klingen (es sind die direkten Vorgänger-Werte), aber die SSOT die Anhebung 2026 korrekt abbildet.

**False-Positives durch Pre-5b ausgeschlossen:** 4 Verdachts-Stellen (kuendigungsfrist § 168/169, unterhalt § 94 Abs, abfindung 17.500, zugewinnausgleich Werte-Vielfalt) hätten ohne Volltext-Check als UNKLAR markiert werden können — alle bestätigt KONSISTENT.

## Backlog-Items

### Echte Drifts (Schnittstelle zu Phase B)

5 Drifts in 2 Files (alle in `lib/rechner-config/arbeit.ts`), klar lokalisiert auf 2 Absätze:

| # | Drift | Datei:Zeile | Fix-Vorschlag |
|---|---|---|---|
| W-01 | unterhalt erklaerung „482 €" | arbeit.ts:1239 | → 486 € (DT 2026) |
| W-02 | unterhalt erklaerung „554 €" | arbeit.ts:1239 | → 558 € (DT 2026) |
| W-03 | unterhalt erklaerung „649 €" | arbeit.ts:1239 | → 653 € (DT 2026) |
| F-01 | unterhalt erklaerung nennt nur 3 Stufen | arbeit.ts:1239 | + 4. Stufe „698 € (ab 18 Jahre)" ergänzen |
| N-01 | elternzeit erklaerung „§ 17 BEEG" | arbeit.ts:1311 | → „§ 17 Abs. 2 BEEG" (Abs. 2 = Übertragungs-Norm) |

**Keine UNKLAR-Befunde** — alle 5 Drifts sind eindeutig durch SSOT bzw. Norm-Inhalt verifizierbar. Phase B kann ohne Karsten-Klärung umgesetzt werden, sobald Karsten die Fix-Strategie bestätigt.

### Bonus-Befunde (Pre-7: ohne Fix-Empfehlung in Phase A)

**B-01 — mutterschutz: „Euro" vs. „€" Format-Mix.** Status: ✅ in Phase B gefixt. Stil-Zählung: 9× € vs. 2× Euro → Mehrheits-Form `€`, 2 Minderheits-Auftritte angeglichen (Z. 924 „13 Euro" → „13 €", Z. 926 „210 Euro" → „210 €"). Reine Schreibweisen-Inkonsistenz, kein referenzieller Drift.

**B-02 — scheidungskosten: „Prozent" vs. „%" Format-Mix.** Status: ✅ in Phase B gefixt. Stil-Zählung: 6× % vs. 4× Prozent → Mehrheits-Form `%`, 4 Minderheits-Auftritte angeglichen (Z. 1008 „10 Prozent" + „6 Prozent" → „10 %" + „6 %", Z. 1016 „19 Prozent" → „19 %", Z. 1036 „10 Prozent" → „10 %"). Reine Schreibweisen-Inkonsistenz, kein referenzieller Drift.

Beide Bonus-Befunde im selben Code-Commit `9db82cb` mitgefixt — atomare Konfig-Sync mit Cluster A + B.

## Lehren

**L-30 (M3, Konsumenten-Sweep nach SSOT-Refactor) durch M6 erneut bestätigt** — Pre-Welle-3-Werte-Reste in beschreibenden Texten sind die konsistente Drift-Klasse über Audits hinweg: M3 fand BAföG-Cluster A (11 Werte), Kindergeld-Cluster (3 Werte), Strompreis-Cluster (2 Werte); M6 fand DT-Mindestbedarf-Cluster A (4 Befunde). Refactor-Sprints fixen die Berechnung in der SSOT, aber lassen den Erklärtext mit den prä-Refactor-Werten zurück. Lehren-Liste bleibt schlank, L-30 unverändert gültig, **keine neue L-32** — der M6-Befund ist eine Wiederholung des bereits dokumentierten Patterns, kein neues.

Bemerkenswert: 8 von 10 stichproben-Rechnern sind drift-frei. Die Welle-3-Touch-Disziplin (151a–e + 157a–f) hat in den meisten Fällen Werte-Konsistenz produziert. Der unterhalt-Cluster ist die Ausnahme — und der ist nicht aus Welle 3 entstanden, sondern ein Pre-Welle-3-Rest, der durch das 151d-Update (7. MUVÄndV-Verweis) erst überlagert wurde, ohne dass die Werte-Liste mit-aktualisiert wurde.
