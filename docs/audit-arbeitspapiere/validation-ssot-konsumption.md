# Validation-Report M3 — SSOT-Konsumption-Audit

**Sweep-Datum:** 29.04.2026
**Modul:** Validation-Sweep M3 (Scoping siehe `validation-sweep-scoping.md` Sektion 2 M3)
**Methodik:** Vollständiges SSOT-Inventar über `lib/berechnungen/*.ts` (~470 Konstanten, 26 Libs) → systematischer Grep-Sweep über ~80 drift-relevante Werte in `lib/rechner-config/*.ts` und `components/rechner/*.tsx` → Klassifikation (LEGITIM-BEISPIEL / LEGITIM-DEFAULT / LEGITIM-HISTORISCH / DRIFT-KONFIG / DRIFT-DEFAULT / UNKLAR) → externe Verifikation via Primärquellen (BAföG-SSOT-Kommentare, § 32 Abs. 6 EStG, § 23 BAföG, Strompreis-SSOT-Kommentare).
**Treffer:** ~350+ total — **14 DRIFT** (3 Cluster) + **0 verbleibende UNKLAR** (U-01 in Phase B durch Karsten geklärt → Fix angewandt; U-02 als Folge-Drift bestätigt) + ~335 LEGITIM (alle Klassen).

## Treffer-Tabelle (Non-Trivial)

| File | Zeile | Wert | SSOT-Soll | Klasse | Fix-Status |
|---|---|---|---|---|---|
| finanzen.ts | 1248 | beispiel: Bedarf 934 € | 855 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | Höchstsatz 934 € | 992 € (475+380+102+35) | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | Grundbedarf 554 € | 475 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | KV-Zuschlag 94 € | 102 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | PV-Zuschlag 28 € | 35 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | Schüler 262 / 632 € | 276 / 666 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1255 | Max mit KV+Kind 1.216 € | 1.152 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1263 | Darlehens-Beispiel 934 € / 16.812 € | 992 € / 8.928 € (halber Auszahlungsbetrag, 6 Sem) | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1267 | Nebenjob 6.456 € / 538 € | § 23 BAföG: 330 €/Mo (3.960 €/J) + Minijob 603 € separat | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1275 | FAQ Höchstsatz 934 / 632 € | 992 / 666 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1287 | FAQ Nebenjob 6.456 € / 538 € | analog Z. 1267 | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1371 | Kifb formel 7.806 / 15.612 € | 4.878 / 9.756 € | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1391 | Kifb Dekomposition (4.878+2.928=7.806) | sächlich 3.414/ET, BEA 1.464/ET, gesamt 4.878/ET bzw. 9.756 zusammen | DRIFT-KONFIG | ✅ |
| finanzen.ts | 1415 | FAQ Kifb 4.878+2.928=7.806 € | 3.414+1.464=4.878 € | DRIFT-KONFIG | ✅ |
| auto.ts | 540 | Wallbox-Haushaltsstrom 32 ct | 33 ct (`getStrompreis('neukunden_festpreis')`) | DRIFT-KONFIG | ✅ |
| ReichweitenRechner.tsx | 41 | useState('32') | useState(getStrompreis('neukunden_festpreis')) | DRIFT-DEFAULT | ✅ |

## Fix-Status-Legende

- ✅ in Phase B gefixt
- ⏳ in Phase B nicht gefixt, mit Begründung
- 🅿️ Backlog für nächste Welle
- ⬜ KORREKT, kein Fix nötig

## Cluster-Analyse

### Cluster A — BAföG (11 DRIFT in finanzen.ts:1248–1297)

**Root Cause:** Prompt 120 (22.04.2026) hat die BAföG-Berechnung in `bafoeg.ts` auf SSOT `bafoeg-parameter.ts` (29. BAföG-ÄndG v. 23.07.2024, gültig 01.08.2024) umgestellt — die erklaerung/FAQ/beispiel-Texte in `finanzen.ts` wurden nicht synchronisiert. Alle drift-Werte stammen aus der Prä-Prompt-120-Fassung der Lib.

**Fix-Strategie:** Option B (Textwerte aktualisieren) — SSOT-Imports in Template-Literals nicht praktikabel. Höchstsatz-Logik klarer formuliert: 992 € als Höchstsatz mit KV+PV-Zuschlag (statt 934 € ohne Zuschläge). U-01 (Nebenjob 538 €/6.456 €) durch Karsten geklärt: BAföG-Freibetrag § 23 (330 €/Mo) und Minijob-Grenze (603 €) als zwei separate Mechanismen formuliert. U-02 (1.216 €) als Folge-Drift bestätigt → 1.152 € (475+380+102+35+160).

**Beispiel-Inkonsistenz (akzeptiert):** Das Darlehens-Beispiel (Z. 1263) zeigt jetzt 8.928 € < 10.010 € Cap — der Cap kommt im Beispiel nicht zum Tragen. Das ist mathematisch korrekter (Darlehensanteil = halber Auszahlungsbetrag) als der vorherige nicht-halbierte Wert 16.812 €. Die Cap-Erwähnung im selben Absatz (Z. 1263 Anfang) bleibt als allgemeine Information stehen, ohne dass das Beispiel sie demonstriert.

### Cluster B — Kinderfreibetrag (3 DRIFT in finanzen.ts:1371, 1391, 1415)

**Root Cause:** Prompt 94a (April 2026) hat die Kifb-Berechnung von erfundenen 15.612 € auf korrekte 9.756 € korrigiert — der Erklärtext enthielt weiterhin die falsche Dekomposition. Konkret wurde KIFB_GESAMT_EINZEL (4.878 € = sächlich 3.414 + BEA 1.464 pro Elternteil) mit BEA_ZUSAMMEN (2.928 € = beide Elternteile zusammen) addiert und als „pro Elternteil" geführt — Ergebnis 7.806 € existiert in keinem Bezugssystem.

**Fix-Strategie:** Option B — Dekomposition komplett umgeschrieben mit klarer Trennung zwischen pro-Elternteil-Werten (3.414 sächlich + 1.464 BEA = 4.878 gesamt) und zusammen-Werten (6.828 sächlich + 2.928 BEA = 9.756 gesamt). § 32 Abs. 6 EStG-Werte gelten jetzt mit konsistenter Faktor-2-Beziehung.

### Cluster C — Strompreis (2 DRIFT)

**Root Cause:** Beide Stellen wurden vor der Strompreis-SSOT (Prompt 147, 25.04.2026) geschrieben. Bei der Migration wurden 8 Wohnen-Components auf `getStrompreis()` umgestellt — der ReichweitenRechner (Kategorie Auto) und der Erklärtext in `auto.ts` waren nicht im Migrations-Scope.

**Fix-Strategie:** D-12 Option A (SSOT-Import analog zu allen anderen 7 Strom-Components, `useState(STROMPREIS_DEFAULT)` mit `getStrompreis('neukunden_festpreis')`); D-13 Option B (Textwert 32 → 33 ct, einheitlich mit D-12 auf Neukunden-Festpreis-Profil).

## Methodik-Anmerkungen

**SSOT-Inventar-Methodik:** 26 Libs in `lib/berechnungen/` einzeln gelesen, alle exportierten Konstanten + `*_PARAMETER`/`*_2026`-Buckets erfasst. Drift-Risiko-Bewertung pro Konstante:
- **Hoch:** Konstanten, die in den letzten 12 Monaten via Prompt-Refactor geändert wurden (Mindestlohn, Pfändung, BAföG, Kindergeld-Dekomposition, BBG, Strompreis-Buckets, Pendlerpauschale)
- **Mittel:** Stichtag-Switch-Werte, die auto-rotieren (Rentenwert, Bürgergeld H2)
- **Niedrig:** Stabile Konstanten ohne aktuelle Änderung (PV-Sätze, Soli-Freigrenze 20.350)

Sweep-Fokus auf Hoch- und Mittel-Klasse.

**Sweep-Pattern:** Pro Konstante: 1 Grep-Run mit Wert (z. B. `\b934\b`, `\b7806\b`, `\b15612\b`, `\b32\b ct`, `\b6456\b`, `\b538\b`), Filter auf `lib/rechner-config/` und `components/rechner/`. Jeder Treffer manuell klassifiziert. False-Positives (z. B. „32 Bit", „32. Lebensjahr") aussortiert.

**Verifikation:** SSOT-Soll-Werte direkt aus den Lib-Konstanten + JSDoc-Kommentaren gelesen, nicht aus Memory oder Audit-Doku. § 23 BAföG / § 32 Abs. 6 EStG / Anlage Strompreis-SSOT als externe Anker.

**Positivliste:** Alle übrigen drift-relevanten SSOT-Werte (ESt-Tarif Grundfreibetrag 12.348 + Zonengrenzen, Soli 20.350/40.700, BBG 5.812,50/8.450, JAEG 77.400, KV-Zusatz 2,9 %, Mindestlohn 13,90, Rentenwert 40,79/42,52, Durchschnittsentgelt 51.944, Pfändung 1.555/1.587,40, Bürgergeld-Regelsätze, Pendlerpauschale 0,38, EEG 7,78/12,34, WK-Pauschale 1.230, DT-Selbstbehalte 1.450/1.200/1.750, Kindergeld 259) sind in Config-Texten und Component-Defaults korrekt konsumiert. Drift-Rate liegt damit bei ~4,0 % — niedrig, klar lokalisiert in 3 Clustern, alle auf identifizierbare prä-Refactor-Texte zurückführbar.

## Backlog-Items

Keine offenen Items. Alle 14 DRIFT-Befunde in Phase B gefixt, beide UNKLAR-Befunde durch Karsten-Klärung (U-01) bzw. mathematische Re-Klassifikation (U-02) in DRIFT konvertiert und mit-gefixt.

**Bonus-Befund (NICHT Teil dieser Session, kein Drift):** `auto.ts:541` „Wallbox-Sondertarif ca. 28 ct" passt exakt zum SSOT-Profil `STROMPREIS_2026.waermepumpen_tarif = 28`. LEGITIM, kein Edit nötig.

**Auto-Schutz-Backlog:** Permanenter Hook für SSOT-Konsumption-Drift wäre methodisch möglich (analog `slug-drift-scan.mjs`), aber Aufwand-Nutzen ungünstig: Werte ändern sich selten, Drift-Quelle ist immer ein Refactor-Prompt, der im Memory dokumentiert ist. Vorschlag: bei jedem künftigen SSOT-Wert-Update eine Konsumenten-Greppung als Pflicht-Schritt im Refactor-Prompt aufnehmen, statt eines permanenten Hooks. Out-of-Scope.

## Lehren

**L-30 (neu):** SSOT-Refactor-Sprints (Prompt 120 BAföG, Prompt 94a Kifb, Prompt 147 Strompreis) müssen die Konsumenten-Texte (config erklaerung/FAQ/beispiel + Component-Defaults) explizit in den Scope aufnehmen. Die Berechnung wird gefixt, aber die beschreibenden Texte bleiben pre-Refactor — Drift-Quelle Nr. 1 in der M3-Auswertung. Ergänzung der Refactor-Pflicht-Disziplin um eine Konsumenten-Sweep-Phase pro SSOT-Update.

**L-31 (neu):** Bei Kindergeld-Dekompositions-Texten gilt: zwei klare Bezugssysteme (pro Elternteil vs. zusammen) niemals mischen. Die fehlerhafte Dekomposition 4.878 + 2.928 = 7.806 in finanzen.ts:1391 entstand durch Vermischung von KIFB_GESAMT_EINZEL (pro ET) mit BEA_ZUSAMMEN (zusammen). Refactor-Disziplin: Bei Dekompositionen immer beide Bezugssysteme parallel ausweisen (sächlich/BEA × ET/zusammen → 4 Werte als Tabelle), niemals nur eines.
