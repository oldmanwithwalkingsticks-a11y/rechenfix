# Welle 1 Stufe 4a — Reststand-Bericht (Prompt 125b)

**Datum:** 2026-04-23
**Scope:** Finale Abarbeitung Stufe 4a nach 114 / 115a–d / 116 / 117 / 125a / 125a-fix
**Ergebnis:** Welle abgeschlossen; 1 Folgebug identifiziert und behoben (FW-02-Konjunktion)

---

## Ausgangslage

Prompt 125b listete fünf Rest-Bugs auf (ErbSt-/SchenkSt-Härtefall,
KESt-Bundesland-Dropdown, AfA-Cutoff, Firmenwagen-Hybrid). Die
Pflicht-Vorbereitung verlangt Scope-Abgleich gegen das Arbeitspapier
[welle1-stufe4a-bericht.md](welle1-stufe4a-bericht.md) vor jeder
Implementierung.

## Scope-Abgleich

| # | Bug laut 125b | Status | Quelle |
|---|---|---|---|
| 1 | ErbSt Härtefall § 19 Abs. 3 | ✅ erledigt | 115c, [lib/berechnungen/erbschaftsteuer.ts](../../lib/berechnungen/erbschaftsteuer.ts) `ERBST_TARIF_STUFEN` + `berechneErbStMitHaertefall` |
| 2 | SchenkSt Härtefall (DRY) | ✅ erledigt | 115c, [lib/berechnungen/schenkungssteuer.ts](../../lib/berechnungen/schenkungssteuer.ts) importiert Helper aus ErbSt-Lib |
| 3 | KESt Bundesland-Dropdown | ✅ erledigt | 117, [components/rechner/KapitalertragsteuerRechner.tsx](../../components/rechner/KapitalertragsteuerRechner.tsx) via `BUNDESLAENDER` + `kirchensteuersatzFuer` |
| 4 | AfA Degressiv-Cutoff § 7 Abs. 2 EStG | ✅ erledigt | 115c (Gate `startJahr >= 2026`) + 116 (Deckel 20 %) + 117 (Sammelposten), [components/rechner/AfaRechner.tsx](../../components/rechner/AfaRechner.tsx) |
| 5 | Firmenwagen Plug-in-Hybrid | ⚠️ teilweise | 115c/d haben Bedingungs-Check + Inputs + Fallback-Berechnung implementiert, aber **Konjunktion UND statt ODER** — Fix in 125b |

→ **4/5 bereits erledigt.** Kein Re-Implementieren — Audit-Bericht
hatte bereits im Welle-Abschluss (Z. 437) klar dokumentiert, dass
Stufe 4a inhaltlich geschlossen ist.

## FW-02-Folgebug — Konjunktion UND vs. ODER

### Herkunft

Die 114er-Original-Audit-Tabelle hat in der Highlight-Zusammenfassung
(Z. 32) „CO2 ≤ 50 g/km UND elektrische Mindestreichweite 80 km"
geschrieben. Im Detail-Abschnitt (Z. 162) steht die korrekte
Formulierung „CO2 ≤ 50 g/km ODER rein elektrische Mindestreichweite".
Prompt 115c hat beim Implementieren offenbar der Highlight-Zeile
gefolgt und `&&` statt `||` kodiert. Der Bug hat 115c-Review, 115d,
116, 117 und 125a überlebt.

Aufgefallen durch Cross-Referenz Karstens 125b-Prompt-Body (dort
korrekt mit „oder" zitiert) gegen die CLAUDE.md-Rechtsstand-Tabelle
(dort fälschlich „und"). Zwei externe Quellen bestätigen ODER:

- [gesetze-im-internet.de/estg/__6.html](https://www.gesetze-im-internet.de/estg/__6.html) — Wortlaut „hat oder ... beträgt"
- [dejure.org/gesetze/EStG/6.html](https://dejure.org/gesetze/EStG/6.html) — bestätigt „oder"

**Zusätzlich:** Der §-Verweis war auf „Nr. 3" gesetzt. Korrekt ist
„Nr. 5" für Anschaffung ab 01.01.2025 (Nr. 3 bezieht sich auf
reine E-Fahrzeuge, Nr. 4 auf Hybride bis 31.12.2024, Nr. 5 auf
Hybride 2025–2030 mit 80 km).

### Impact

Ein Plug-in-Hybrid mit Anschaffung ab 01.01.2025 und:
- Reichweite 85 km, CO₂ 55 g/km → **war** auf 1 % hochgestuft, **sollte** 0,5 % sein (Reichweite allein reicht)
- Reichweite 65 km, CO₂ 45 g/km → **war** auf 1 % hochgestuft, **sollte** 0,5 % sein (CO₂ allein reicht)

Der typische Fall (moderner Hybrid erfüllt beide Kriterien) war
unauffällig. Asymmetrische Kombinationen wurden steuerlich
zu hoch angesetzt — bei 45.000 € BLP und 35 % Grenzsteuersatz
betrug die monatliche Über-Besteuerung ca. 78 €/Monat
(GwV-Differenz 225 € × 35 %).

### Fix

Fünf Änderungen in [components/rechner/FirmenwagenRechner.tsx](../../components/rechner/FirmenwagenRechner.tsx):

1. **Bedingungslogik** (Z. 56): `&&` → `||`
2. **Modul-Kommentar** (Z. 15–18): Klarstellung auf „ODER (eine der beiden)", §-Verweis auf Nr. 5
3. **UI-Erklärtext** (Z. 120–123): „und" → „oder" + Satz „Eine der beiden Bedingungen reicht aus"
4. **Warn-Banner** (Z. 143–145): präzisiert zu „weder die CO₂- noch die Reichweiten-Bedingung"
5. **Vergleichstabellen-Fußnote** (Z. 308): „und" → „oder" + Klarstellung

Plus **CLAUDE.md Z. 333:** Rechtsstand-Tabelle von „und" auf
„oder", §-Referenz auf Nr. 5, Deadline auf 01.01.2031
(Ende der Begünstigung nach EStG § 6 Abs. 1 Nr. 4 S. 2).

### Verify

**Kein Verify-Script** — FirmenwagenRechner hat keine
dedizierte Lib und keine Regressions-Suite (Logik inline). Manueller
Inkognito-Browser-Cross-Check durch Karsten auf
`https://www.rechenfix.de/finanzen/firmenwagenrechner` (URL-Stimmen-
Check: Config-Slug `firmenwagenrechner`, nicht `firmenwagen-rechner`):

| Input | Erwartung |
|---|---|
| Hybrid, Reichweite 65 km, CO₂ 45 g/km | 0,5 % (CO₂ ≤ 50 erfüllt) |
| Hybrid, Reichweite 85 km, CO₂ 55 g/km | 0,5 % (Reichweite ≥ 80 erfüllt) |
| Hybrid, Reichweite 65 km, CO₂ 55 g/km | 1,0 % Fallback + Warn-Banner |
| Hybrid, Default-Werte 80 km / 50 g/km | 0,5 % (beide Grenzwerte erfüllt) |

## Methodische Lehre

**Highlight-Zeilen und Detail-Abschnitte müssen bei Implementierungs-
Prompts konsistent gelesen werden.** Der 115c-Code-Fix hat sich auf
die 1-Satz-Zusammenfassung gestützt (UND), nicht auf den präzisen
Detail-Abschnitt mit Gesetzestext-Zitat (ODER). Künftige
Implementierungs-Prompts sollten den Gesetzestext selbst als
alleinige verbindliche Quelle nutzen, nicht die Audit-Zusammenfassung
als Shortcut.

Regel ergänzt zur Anti-Pattern-Sammlung in CLAUDE.md:
- **Rechtsquellen-Primat:** Bei Implementierung einer Gesetzesregel
  den Gesetzestext selbst als Quelle konsumieren, nicht die
  Audit-Zusammenfassung paraphrasieren. Gerade bei logischen
  Konjunktionen (UND/ODER) ist die Verdichtung in Audit-Highlights
  fehleranfällig.

## Offener Scope

Keine weiteren P1/P2-Bugs in Stufe 4a offen. Die P3-Backlog-Items
aus Nachtrag 117 (KESt Vorabpauschale, Familienheim § 13 Abs. 1
Nr. 4a, AfA-Typ-Filter, FW-Vergleichs-Box BLP > 70 k, KESt
Soli-Freigrenze) bleiben User-Bedarfs-getrieben.

## Welle-Abschluss (final)

**Welle 1 Stufe 4a ist inhaltlich abgeschlossen.** 6 P1 + 12 P2 +
7 P3 umgesetzt über 115a / 115c / 115d / 116 / 117 / 118 /
125a / 125a-fix / 125b. Lohnsteuer-Voll-PAP-Refactor zusätzlich
in 118 erledigt (ursprünglich als Wochenend-Kandidat außerhalb
der Welle geplant).

**Nächste Schritte** (mit User zu besprechen):
- Welle 2 beginnen
- Prompt 120c (Wohngeld-Lib-Refactor) vor dem Juli-Stichtag
- Bürgergeld-„Neue Grundsicherung" H2-Bucket mit Werten befüllen,
  sobald Gesetzestext verabschiedet
