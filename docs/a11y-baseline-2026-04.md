# A11y-Baseline April 2026 (Post-Sprint 78a–78h)

**Status:** Template — Werte werden nach manuellem Sweep eingetragen.
**Sweep-Datum:** _(eintragen nach Durchlauf)_
**Durchgeführt von:** _(eintragen)_

## Zweck

Baseline-Snapshot nach Abschluss des A11y-Sprints. Jede zukünftige Änderung an Rechnern oder Layout wird gegen diese Werte geprüft — Regressionen müssen erkannt und adressiert werden.

## Methodik

Pro Seite:

1. **Lighthouse Accessibility Score** (Mobile + Desktop, Inkognito, DevTools Lighthouse-Tab)
2. **axe DevTools Scan** (Full Page Scan, Zählung nach Severity)
3. **Crosslink-Sichtprüfung** (Regression-Check für Prompt 34a/b/c):
   - "Das könnte Sie auch interessieren"-Box mit 4 Rechnern vorhanden
   - Sidebar mit Kategorie-Rechnern vorhanden
   - Globaler Footer mit Kategorien-Übersicht vorhanden

## Baseline-Ziele

- Lighthouse A11y-Score: **≥ 95** auf allen Stichproben
- axe: **0 Critical**, **0 Serious** Issues außerhalb dokumentierter Ausnahmen
- Crosslinks: alle drei Strukturen auf allen Seiten sichtbar

## Dokumentierte Ausnahmen (keine Regressionen)

Laut `/barrierefreiheit` BfE-Seite:

- Wissenschaftlicher Taschenrechner: Button-Raster nur eingeschränkt per Tastatur bedienbar
- BMI-Skala: visuelle Skala, Textausgabe vorhanden
- Zyklusrechner: Kalender-Komponente, Kernwerte als Text

## Stichproben (Sweep-Runde 1)

| # | Route | Kategorie | LH Mobile | LH Desktop | axe Critical | axe Serious | axe Moderate | axe Minor | Crosslinks |
|---|---|---|---:|---:|---:|---:|---:|---:|:---:|
| 1 | `/alltag/prozentrechner` | Alltag | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 2 | `/alltag/dreisatz-rechner` | Alltag | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 3 | `/finanzen/brutto-netto-rechner` | Finanzen | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 4 | `/finanzen/etf-sparplanrechner` | Finanzen | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 5 | `/gesundheit/bmi-rechner` | Gesundheit | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 6 | `/gesundheit/zyklusrechner` | Gesundheit | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 7 | `/auto/spritkosten-rechner` | Auto & Verkehr | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 8 | `/auto/kfz-steuer-rechner` | Auto & Verkehr | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 9 | `/wohnen/heizkosten-rechner` | Wohnen & Energie | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 10 | `/wohnen/baufinanzierung-rechner` | Wohnen & Energie | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 11 | `/mathe/wissenschaftlicher-taschenrechner` | Mathe & Schule | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 12 | `/mathe/bruchrechner` | Mathe & Schule | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 13 | `/arbeit/unterhaltsrechner` | Arbeit & Recht | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 14 | `/arbeit/arbeitszeitrechner` | Arbeit & Recht | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 15 | `/kochen/rezept-umrechner` | Kochen & Ernährung | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 16 | `/kochen/naehrwert-rechner` | Kochen & Ernährung | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 17 | `/sport/pace-rechner` | Sport & Fitness | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 18 | `/sport/herzfrequenz-zonen-rechner` | Sport & Fitness | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |
| 19 | `/barrierefreiheit` | **BfE-Pflicht** | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | ☐ |

**Slug-Stand:** Alle 19 Routen wurden gegen `lib/rechner-config/client-data.ts` verifiziert (Stand April 2026). Mathe ist durch `/mathe/bruchrechner` vertreten, der Dreisatz-Rechner liegt laut Config nur unter `/alltag/`. Der Zweit-Sport-Rechner hat den Slug `herzfrequenz-zonen-rechner` (nicht identisch mit dem gleichnamigen, aber separaten `/gesundheit/herzfrequenz-rechner` — zwei getrennte Rechner in zwei Kategorien).

## Aggregat

- **Lighthouse Ø Mobile:** _TBD_
- **Lighthouse Ø Desktop:** _TBD_
- **Ø-Score (für BfE-Seite):** _TBD_
- **Seiten ≥ 95:** _TBD / 19_
- **Critical/Serious Findings gesamt:** _TBD_

## Findings

### Neue Findings (fix-Kandidaten)
_Nach Sweep eintragen — pro Finding: Seite, Severity, Kurzbeschreibung, empfohlener Fix._

### Bekannte Ausnahmen (kein Fix im Rahmen dieses Sprints)
- Taschenrechner Button-Raster: Tastatur-Navigation eingeschränkt
- BMI-Skala, Zyklus-Kalender: visuell-lastige Komponenten mit Text-Fallback

## Crosslink-Regression (34a/b/c)

Zielstruktur pro Rechner-Seite:

- [ ] "Das könnte Sie auch interessieren"-Box mit 4 thematisch verwandten Rechnern
- [ ] Sidebar mit Rechnern derselben Kategorie
- [ ] Globaler Footer mit allen 9 Kategorien

**Ergebnis:** _Nach Sweep eintragen — pro Seite Ja/Nein, Abweichungen dokumentieren._

## Nächster Sweep

Empfohlener Rhythmus: nach jedem größeren Sprint oder nach Layout-/Footer-Änderungen.
Bei Regressionen gegen Baseline: Finding in neue Prompt-Nummer überführen, adressieren, Baseline aktualisieren.
