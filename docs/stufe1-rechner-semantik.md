# Stufe 1 — Eingabefeld-Semantik der Steuer-Rechner

Erstellt am 2026-04-19 zur Vorbereitung des manuellen Audits (Welle 1, Stufe 1 Steuer-Kern).
Keine Code-Änderungen — reine Bestandsaufnahme.

## Übersicht

| Rechner | Eingabe-Label | Semantik | Interne Abzüge vor ESt | Lib-Nutzung |
|---|---|---|---|---|
| **Splitting** | "Jahresbrutto Partner 1/2" | Brutto (nach SV, vor WK/SA) | WK 1.230 € + SA 36 € pro Partner, kein SV-Abzug | `lib/berechnungen/splitting.ts` mit **lokaler** `berechneEStGrundtabelle()` — **NICHT** `einkommensteuer.ts` |
| **Kindergeld** | "Jahresbruttoeinkommen" | Brutto (vor SV) | SV-Pauschale 20 %, WK 1.230 € (×2 zusammen), SA 36 € (×2 zusammen), Kinderfreibetrag | `lib/berechnungen/kindergeld.ts` mit **lokaler** `estGrundtabelle()` — **NICHT** `einkommensteuer.ts` |
| **Pendlerpauschale** | "Entfernung" (km) + "Grenzsteuersatz" (%) | km-Wert + vorgegebener Grenzsteuersatz | keine — rechnet nur Werbungskosten × Satz | `lib/berechnungen/pendlerpauschale.ts`, **keine ESt-Berechnung** |
| **Kirchensteuer** | — | — | — | **Rechner nicht gefunden** — Kirchensteuer ist Feature in Lohnsteuer/Brutto-Netto/Einkommensteuer/Kapitalertragsteuer |
| **ESt-Vorauszahlung** | — | — | — | **Rechner nicht gefunden** |
| **Fünftelregelung** | — | — | — | **Rechner nicht als Standalone gefunden** — integriert in `AbfindungsRechner.tsx` / `lib/berechnungen/abfindung.ts` |
| **Altersentlastungsbetrag** | — | — | — | **Rechner nicht gefunden** |

## Details pro Rechner

### 1. Splitting-Rechner

- **Datei:** [components/rechner/SplittingRechner.tsx](components/rechner/SplittingRechner.tsx)
- **Lib:** [lib/berechnungen/splitting.ts](lib/berechnungen/splitting.ts)
- **Eingabefelder:**
  - "Jahresbrutto Partner 1" (Default 55.000 €)
  - "Jahresbrutto Partner 2" (Default 25.000 €)
  - Kirchensteuer P1/P2 (Ja/Nein), Bundesland, Kinderfreibeträge (0–4)
- **Semantik:** Brutto vor Werbungskosten- und Sonderausgabenpauschale. **SV-Beiträge werden NICHT abgezogen** — das macht das Feld semantisch eher ein "Brutto-nach-SV" oder pragmatischer: "Einkommen aus nichtselbständiger Arbeit vor WK/SA".
- **Interne Abzüge vor ESt-Berechnung** (siehe `berechneZvE()`, [splitting.ts:100](lib/berechnungen/splitting.ts:100)):
  - Werbungskostenpauschale **1.230 €** pro Partner ✓
  - Sonderausgabenpauschale **36 €** pro Partner ✓
  - SV-Beiträge: **Nein** (nicht modelliert)
  - Kinderfreibetrag: 15.612 € pro Kind bei Zusammenveranlagung / 7.806 € bei Einzelveranlagung, halbe Aufteilung bei Einzel
- **Lib-Nutzung:** **Lokale Duplikat-Formel** `berechneEStGrundtabelle()` in [splitting.ts:66–81](lib/berechnungen/splitting.ts:66). Werte stimmen mit 2026-Parametern in `einkommensteuer.ts` überein, aber es ist keine Verwendung von `berechneEStGrund(zvE, 2026)` aus der zentralen SSOT.
- **Auffälligkeiten:**
  - Verstoß gegen die SSOT-Regel aus CLAUDE.md ("Verboten: Eigene ESt-, LSt-, SV-, Kindergeld-, Pfändungs- oder Mindestlohn-Formeln in Komponenten oder Rechnern").
  - Soli-Formel und KiSt-Formel ebenfalls inline.
  - Der vom User gemeldete Befund "30.000 € → 3.863 € ESt" stimmt mit dem Code: 30.000 − 1.230 − 36 = 28.734 € zvE, § 32a Zone 3 liefert gerundet 3.863 €. Der BMF-Referenzwert 4.217 € bezieht sich auf zvE = 30.000 € — ohne jeden Pauschalabzug. Der Unterschied ist also keine Formel-Diskrepanz, sondern **Input-Semantik-Missverständnis**.

### 2. Kindergeld-Rechner

- **Datei:** [components/rechner/KindergeldRechner.tsx](components/rechner/KindergeldRechner.tsx)
- **Lib:** [lib/berechnungen/kindergeld.ts](lib/berechnungen/kindergeld.ts)
- **Eingabefelder:**
  - "Anzahl der Kinder" (1–5)
  - "Jahresbruttoeinkommen" (Default 60.000 €, "Gesamtes Brutto der Eltern (bei Zusammenveranlagung beide zusammen)")
  - Veranlagung (zusammen/einzeln)
  - Kirchensteuer Ja/Nein (hartcodiert 9 %, kein Bundesland)
- **Semantik:** Brutto der Eltern **vor allen Abzügen** (inkl. SV). Der Rechner schätzt zvE über Pauschalen.
- **Interne Abzüge vor ESt-Berechnung** (siehe `berechneKindergeld()`, [kindergeld.ts:110–130](lib/berechnungen/kindergeld.ts:110)):
  - **SV-Pauschale 20 %** vom Brutto (konstant, keine BBG-Kappung) — [kindergeld.ts:52](lib/berechnungen/kindergeld.ts:52)
  - Werbungskostenpauschale **1.230 €** (×2 bei Zusammenveranlagung!)
  - Sonderausgabenpauschale **36 €** (×2 bei Zusammenveranlagung!)
  - Kinderfreibetrag: 15.612 € pro Kind (zusammen) / 7.806 € (einzeln), nur für Günstigerprüfung
- **Lib-Nutzung:** **Lokale Duplikat-Formel** `estGrundtabelle()` in [kindergeld.ts:71–85](lib/berechnungen/kindergeld.ts:71) + eigener `soliBerechnen()` + eigener KiSt-Satz 9 %. **NICHT** `einkommensteuer.ts`.
- **Auffälligkeiten:**
  - TODO-Kommentar [kindergeld.ts:56](lib/berechnungen/kindergeld.ts:56) "TODO Prompt 88+: aus lib/berechnungen/einkommensteuer.ts (PARAMS[2026]) ableiten." — Soli-Parameter sind hartcodiert.
  - SV-Pauschale 20 % ist grob: bei niedrigen Bruttos liegt der tatsächliche SV-AN-Anteil bei ~20,9 %, bei hohen Bruttos durch BBG deutlich darunter. Ergebnis der Günstigerprüfung kann bei hohen Einkommen verzerrt sein.
  - KiSt 9 % hartcodiert — in Bayern/BaWü wären es 8 %, wird im UI nicht abgefragt.
  - Soli-Milderungszone-Obergrenze 37.838 € hartcodiert, die CLAUDE.md-Referenz rechnet mit Freigrenze × 1,859375 → exakt 37.838,28125 → OK.
  - Breakeven-Suche per Binärsuche in Zeile 160+ ist Eigenimplementierung, nicht aus Lib.

### 3. Pendlerpauschale-Rechner

- **Datei:** [components/rechner/PendlerpauschaleRechner.tsx](components/rechner/PendlerpauschaleRechner.tsx)
- **Lib:** [lib/berechnungen/pendlerpauschale.ts](lib/berechnungen/pendlerpauschale.ts)
- **Eingabefelder:**
  - "Einfache Entfernung Wohnung — Arbeitsstätte" (km)
  - "Arbeitstage pro Jahr" (direkt oder Detail-Modus)
  - "Grenzsteuersatz" (%) — manuell eingebbar oder Preset 14/25/35/42/45
  - Optional: Homeoffice-Tage/Woche
- **Semantik:** **KEINE Brutto- oder zvE-Eingabe.** Rechner arbeitet direkt auf km × Pauschalsatz × Tage und multipliziert mit einem vom Nutzer **selbst eingegebenen Grenzsteuersatz**.
- **Interne Abzüge:** Keine. Dies ist ein reiner Werbungskosten-/Pauschalen-Rechner.
- **Lib-Nutzung:** Eigene Lib `pendlerpauschale.ts`. Keine Nutzung von `einkommensteuer.ts` — ist auch nicht nötig, da keine ESt berechnet wird.
- **Auffälligkeiten:**
  - Korrekte Pauschalen 2026: 0,30 €/km erste 20 km, 0,38 €/km ab km 21 ✓
  - Homeoffice-Pauschale 6 €/Tag, Max 210 Tage ✓ (EStG § 4 Abs. 5 Nr. 6c)
  - `Math.round(entfernungKm)` in [pendlerpauschale.ts:25](lib/berechnungen/pendlerpauschale.ts:25) — km werden ganzzahlig gerundet, Nachkommastellen gehen verloren (z. B. 24,8 km → 25).
  - "Steuerersparnis" = Pauschale × Grenzsteuersatz ist eine **grobe Schätzung**, keine saubere Marginal-Rechnung (ignoriert Progressionseffekt, Soli, KiSt).

### 4. Kirchensteuer-Rechner

**Nicht als eigenständiger Rechner vorhanden.**

Kirchensteuer wird als **Feature** in folgenden Rechnern berechnet:
- `BruttoNettoRechner.tsx` — als Abzug vom Netto
- `LohnsteuerRechner.tsx` — nach PAP
- `EinkommensteuerRechner.tsx` — nach ESt-Ermittlung
- `KapitalertragsteuerRechner.tsx` — auf Abgeltungsteuer
- `SplittingRechner.tsx`, `KindergeldRechner.tsx` — als Zusatzposition

Wenn ein isolierter Kirchensteuer-Rechner benötigt wird, müsste er neu gebaut werden.

### 5. ESt-Vorauszahlungs-Rechner

**Nicht vorhanden.** Weder als Datei noch als Feature. Keine `ESt-Vorauszahlung`-Erwähnungen in den Configs gefunden.

### 6. Fünftelregelungs-Rechner

**Nicht als eigenständiger Rechner vorhanden.**

Die Fünftelregelung (§ 34 EStG) ist **integriert in den `AbfindungsRechner`**:
- Datei: `components/rechner/AbfindungsRechner.tsx`
- Lib: `lib/berechnungen/abfindung.ts`
- Config: [lib/rechner-config/arbeit.ts:771–842](lib/rechner-config/arbeit.ts:771) (Keywords "fünftelregelung", "abfindung versteuern")

Wer Fünftelregelung auditieren will, sollte den AbfindungsRechner prüfen. Eingabe-Semantik dort nicht in diesem Mini-Check erfasst.

### 7. Altersentlastungsbetrags-Rechner

**Nicht vorhanden.** Weder als Datei, Feature noch in den Configs.

## Einschätzung für Audit-Testfälle

| Kategorie | Rechner | Test-Strategie |
|---|---|---|
| **Brutto-Eingabe mit WK/SA-Pauschale, ohne SV** | Splitting | BMF-Vergleich erfordert: `zvE_BMF = Brutto − 1.230 − 36` pro Partner. Für zvE = 30.000 € muss man Brutto = **31.266 €** eingeben, um ESt 4.217 € zu bekommen. |
| **Brutto-Eingabe mit SV-Pauschale 20 % + WK/SA** | Kindergeld | BMF-Vergleich erfordert: `zvE_BMF = Brutto × 0,8 − WK − SA − Kinderfreibetrag`. Bei Zusammenveranlagung verdoppelt sich WK+SA. Anteile SV werden grob geschätzt — exakter Vergleich nur gegen eigene Lib, nicht BMF. |
| **Keine ESt — reine Pauschale × Grenzsteuersatz** | Pendlerpauschale | Kein BMF-Abgleich sinnvoll. Prüfbar sind nur: Pauschalsätze (0,30 € / 0,38 € / 6 €), 210-Tage-Cap, km-Rundung. |
| **Nicht implementiert** | Kirchensteuer (standalone), ESt-Vorauszahlung, Fünftelregelung (standalone), Altersentlastungsbetrag | Kein Audit möglich. Entweder integriertes Feature in anderem Rechner prüfen (KiSt, Fünftelreg → Abfindung) oder Rechner streichen/neu bauen. |

## Zentrale Beobachtung

**Die drei existierenden Steuer-Kern-Rechner (Splitting, Kindergeld, Pendlerpauschale) nutzen KEINE der zentralen Tarif-Libs.** Jeder hat seine eigene `estGrundtabelle()`-Kopie (bzw. verzichtet ganz auf ESt). Das ist ein direkter Verstoß gegen die SSOT-Regel in [CLAUDE.md](CLAUDE.md) ("Verboten: Eigene ESt-, LSt-, SV-, Kindergeld-, Pfändungs- oder Mindestlohn-Formeln").

Das [Jahresparameter-Audit 2026-04](docs/jahresparameter-audit-2026-04.md) scheint diese Duplikate nicht erfasst zu haben, da sich die aktuellen 2026-Werte (Grundfreibetrag 12.348 €, Zonenformeln) gerade noch zufällig decken. Bei der nächsten Tarifänderung (2027) werden diese drei Rechner aber auseinanderdriften, sofern nicht vorher auf `berechneEStGrund(zvE, jahr)` umgestellt wird.

Für den **aktuellen Audit** heißt das: Testfälle müssen gegen den **jeweiligen Rechner-eigenen** zvE-Begriff gebaut werden, nicht gegen einen einheitlichen. Wer "30.000 € Brutto" in drei Rechner eingibt, bekommt drei unterschiedliche Ergebnisse — und jedes einzelne kann in sich konsistent sein.
