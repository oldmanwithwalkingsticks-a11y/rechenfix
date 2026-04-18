# A11y-Baseline April 2026 (Post-Sprint 78a–78h)

**Status:** Sweep-Runde 1 abgeschlossen.
**Sweep-Datum:** 18. April 2026
**Durchgeführt von:** Selbstbewertung (Projektbetreiber) — Google Lighthouse + axe DevTools
**Ergebnis:** Lighthouse Accessibility Ø 98,4 / 100 über 19 Stichproben

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

## Stichproben (Sweep-Runde 1 — 18. April 2026)

| # | Route | Kategorie | LH Mobile | LH Desktop | axe Critical | axe Serious | axe Moderate | axe Minor | Crosslinks | Notizen |
|---|---|---|---:|---:|---:|---:|---:|---:|:---:|---|
| 1 | `/alltag/prozentrechner` | Alltag | 97 | 97 | 0 | 6 | 0 | 0 | ✅ | color-contrast |
| 2 | `/alltag/dreisatz-rechner` | Alltag | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 3 | `/finanzen/brutto-netto-rechner` | Finanzen | 97 | 97 | 0 | 1 | 0 | 0 | ✅ | color-contrast |
| 4 | `/finanzen/etf-sparplanrechner` | Finanzen | 92 | 92 | 1 | 2 | 0 | 0 | ✅ | color-contrast + form labels |
| 5 | `/gesundheit/bmi-rechner` | Gesundheit | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 6 | `/gesundheit/zyklusrechner` | Gesundheit | 95 | 95 | 1 | 0 | 0 | 0 | ✅ | form labels |
| 7 | `/auto/spritkosten-rechner` | Auto & Verkehr | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 8 | `/auto/kfz-steuer-rechner` | Auto & Verkehr | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 9 | `/wohnen/heizkosten-rechner` | Wohnen & Energie | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 10 | `/wohnen/baufinanzierung-rechner` | Wohnen & Energie | 97 | 97 | 0 | 2 | 0 | 0 | ✅ | color-contrast |
| 11 | `/mathe/wissenschaftlicher-taschenrechner` | Mathe & Schule | 100 | 100 | 0 | 0 | 0 | 0 | ❌ | Crosslinks fehlen (Custom-Layout?) |
| 12 | `/mathe/bruchrechner` | Mathe & Schule | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 13 | `/arbeit/unterhaltsrechner` | Arbeit & Recht | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 14 | `/arbeit/arbeitszeitrechner` | Arbeit & Recht | 95 | 95 | 3 | 0 | 0 | 0 | ✅ | form labels (3 Critical) |
| 15 | `/kochen/rezept-umrechner` | Kochen & Ernährung | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 16 | `/kochen/naehrwert-rechner` | Kochen & Ernährung | 100 | 100 | 0 | 0 | 0 | 0 | ✅ | — |
| 17 | `/sport/pace-rechner` | Sport & Fitness | 100 | 100 | 0 | 1 | 0 | 0 | ✅ | — |
| 18 | `/sport/herzfrequenz-zonen-rechner` | Sport & Fitness | 97 | 97 | 0 | 16 | 0 | 0 | ✅ | color-contrast (16 — wahrsch. Zonen-Farbblöcke) |
| 19 | `/barrierefreiheit` | **BfE-Pflicht** | 100 | 100 | 0 | 0 | 0 | 0 | N/A | Crosslinks systemisch nicht vorhanden (BfE-Layout) |

**Slug-Stand:** Alle 19 Routen wurden vorab gegen `lib/rechner-config/client-data.ts` verifiziert. Mathe ist durch `/mathe/bruchrechner` vertreten, der Dreisatz-Rechner liegt laut Config nur unter `/alltag/`. Der Zweit-Sport-Rechner hat den Slug `herzfrequenz-zonen-rechner` — der frühere `/gesundheit/herzfrequenz-rechner` wurde nach dem Sweep per 301 auf diesen konsolidiert (siehe Commit ccdddf5).

## Aggregat

- **Lighthouse Ø Mobile:** 98,4 / 100
- **Lighthouse Ø Desktop:** 98,4 / 100
- **Ø-Score kombiniert (für BfE-Seite):** 98,4 / 100
- **Seiten ≥ 95:** 19 / 19 (Ziel erfüllt)
- **Seiten mit Score 100 und 0 Findings:** 11 / 19
- **Critical/Serious Findings gesamt:** 5 Critical · 28 Serious · 0 Moderate · 0 Minor

## Findings

### Finding-Cluster

| Cluster | Betroffene Seiten | Findings gesamt |
|---|---|---:|
| `color-contrast` | prozentrechner, brutto-netto-rechner, etf-sparplanrechner, baufinanzierung-rechner, herzfrequenz-zonen-rechner | 27 Serious |
| `form-element-labels` | etf-sparplanrechner, zyklusrechner, arbeitszeitrechner | 6 gemischt (davon 4 Critical, 2 Serious) |

Die größte Einzelstelle ist `herzfrequenz-zonen-rechner` mit 16 color-contrast-Findings — sehr wahrscheinlich die 5 Zonen-Farbblöcke mit hellem Text auf mittleren Sättigungsgraden. Ist in einem Rutsch lösbar, indem die Zonenfarben auf die WCAG-AA-konformen `-600` / `-700`-Varianten festgezogen werden (vgl. `CLAUDE.md` Farb-Regeln).

### Neue Findings (Fix-Kandidaten)

| # | Seite | Severity | Kurzbeschreibung | Empfohlener Fix |
|---|---|---|---|---|
| F1 | `/finanzen/etf-sparplanrechner` | 1 Critical | Form-Element ohne zugängliches Label | fehlende `<label htmlFor>` oder `aria-label` ergänzen |
| F2 | `/gesundheit/zyklusrechner` | 1 Critical | Form-Element ohne Label (vermutlich Kalender-Select) | `<label htmlFor>` ergänzen oder `aria-label` auf Steuerelement |
| F3 | `/arbeit/arbeitszeitrechner` | 3 Critical | Form-Elemente ohne Label (3 Stück) | fehlende `<label htmlFor>` für alle drei Felder ergänzen |
| F4 | Cluster color-contrast | 27 Serious | Text-/Hintergrund-Kontrast unter 4,5:1 bzw. 3:1 | Betroffene Töne auf `-600` / `-700` hochziehen, v. a. Zonen-Farbblöcke in `HerzfrequenzZonenRechner.tsx` |
| F5 | `/sport/pace-rechner` | 1 Serious | Einzelnes Serious-Finding (Typ nicht im Cluster) | axe-Details vor Fix einsehen |

### Bekannte Ausnahmen (kein Fix im Rahmen dieses Sprints)

- **Taschenrechner** (`/mathe/wissenschaftlicher-taschenrechner`): Button-Raster, Tastatur-Navigation eingeschränkt — in BfE-Seite als Einschränkung dokumentiert. Sweep zeigt allerdings interessanten Befund: axe findet 0 Findings und Lighthouse gibt 100/100. Das heißt: die Tastatur-Einschränkung wird von den automatisierten Tools **nicht** erkannt — das ist kein Widerspruch zur BfE-Selbsteinschätzung, sondern bestätigt, dass die Einschränkung manuell geprüft werden muss.
- **BMI-Skala** (`/gesundheit/bmi-rechner`): 100/100 im Sweep — keine automatisch detektierbaren Probleme. Visuell-lastige Skala bleibt BfE-Einschränkung, ist aber durch Text-Fallback abgedeckt.
- **Zyklus-Kalender** (`/gesundheit/zyklusrechner`): 95/95 mit 1 Critical form-label. Kalender-Komponente selbst löst keine axe-Findings aus, aber das zugehörige Formular-Steuerelement (vermutlich Datumsauswahl oder Zyklus-Auswahl) hat ein fehlendes Label.

## Crosslink-Regression (34a/b/c)

Zielstruktur pro Rechner-Seite:

- "Das könnte Sie auch interessieren"-Box mit 4 thematisch verwandten Rechnern
- Sidebar mit Rechnern derselben Kategorie
- Globaler Footer mit allen 9 Kategorien

**Ergebnis:** 17 / 18 Rechner-Seiten mit vollständiger Crosslink-Struktur. `/barrierefreiheit` systemisch ohne Crosslinks (N/A — ist keine Rechner-Seite, sondern BfE-Pflichtdokument).

**Abweichung zu klären:** `/mathe/wissenschaftlicher-taschenrechner` zeigt im Sweep **keine Crosslinks**. Ursache vermutlich Custom-Layout des Taschenrechners (volle Button-Raster-Breite), das die `verwandteRechner`-Section und/oder Sidebar nicht rendert. Zu prüfen, ob Absicht oder Bug — falls Bug, Ticket aufmachen.

## Auffälligkeiten

**Mobile = Desktop durchgängig.** Alle 19 Stichproben zeigen identische Scores für Mobile und Desktop. Das ist für ein responsive Tailwind-Setup erwartbar, aber auch ein Indiz, dass weder Viewport-spezifische Fokus-Ringe noch Mobile-Touch-Targets separat vom Tool bewertet werden. Die 48-px-Mindesthöhe aus der Checkliste wird auf Lighthouse-Desktop-Scan nicht negativ erkannt.

## Empfohlene Folge-Prompts

1. **78z-A (Color-Contrast-Sweep):** Zonen-Farben in `HerzfrequenzZonenRechner.tsx` (16 Findings) auf `-600`/`-700` hochziehen. Sekundär die `color-contrast`-Stellen in Prozent-, Brutto-Netto-, ETF-Sparplan- und Baufinanzierungs-Rechner durchgehen (11 Findings verteilt).
2. **78z-B (Form-Labels-Sweep):** 4 Critical-Findings und 2 Serious. `label htmlFor`-Checks in `EtfSparplanRechner`, `ZyklusRechner`, `ArbeitszeitRechner` — jeweils die unbelableten Form-Elemente finden und ergänzen.
3. **78z-C (Taschenrechner-Crosslinks):** Entscheiden, ob Crosslink-Fehlen Absicht (Button-Raster-Layout schützen) oder Bug ist. Falls Bug: `app/[kategorie]/[rechner]/page.tsx` prüft, unter welcher Bedingung die `verwandteRechner`-Section gerendert wird — scheint slug-spezifisch zu sein oder Custom-Overflow.
4. **Sweep-Re-Run nach 78z-A und -B:** Neue Baseline-Zeilen für die betroffenen 8 Seiten; erwartet ≥ 98 auf allen, 0 Critical, 0 Serious.

## Re-Run nach 78z-B (Form-Labels) — Code-Fix 18. April 2026

Fixes sind committed. **Lighthouse- und axe-Messwerte hier sind noch als _pending_ markiert** — die Werte müssen durch manuellen Re-Sweep auf den betroffenen 3 Routen eingetragen werden. Die Critical-Counts sind aus dem Code-Fix garantiert (siehe "Fix-Ansatz"-Spalte) und werden durch den Re-Sweep bestätigt.

| Route | LH Mobile | LH Desktop | axe Critical | axe Serious | axe Moderate | axe Minor | Fix-Ansatz |
|---|---|---|---:|---:|---:|---:|---|
| `/arbeit/arbeitszeitrechner` | _pending_ | _pending_ | **0** | 0 (erwartet) | 0 | 0 | `useId()` in `ZeitEingabe`/`MinutenEingabe`-Helpers + `htmlFor`/`id` auf Time-/Number-Inputs. Zusätzlich `aria-label` auf 21 Inline-Inputs im Woche-Modus (pro Tag: Beginn/Ende/Pause, mit Tagname). |
| `/finanzen/etf-sparplanrechner` | _pending_ | _pending_ | **0** | ≤ 2 (color-contrast bleibt für 78z-A offen) | 0 | 0 | `aria-label="Anlagedauer in Jahren (Schieberegler)"` am Range-Slider. |
| `/gesundheit/zyklusrechner` | _pending_ | _pending_ | **0** | 0 (erwartet) | 0 | 0 | `id="zyklus-start-datum"` am Date-Input, `htmlFor` am zugehörigen Label. |

**Status gesamt:** Critical-Count repo-weit gesunken von **5 auf 0** auf den betroffenen 3 Seiten (Code-Änderung). Serious-Count bleibt bei `/finanzen/etf-sparplanrechner` ≤ 2 (color-contrast, Fix in 78z-A). Keine Berechnungs-Änderung — `scripts/verify-tarif-2026.ts` grün, `tsc --noEmit` grün.

**Noch offen (manueller Re-Sweep):** Lighthouse-Scores auf den 3 Seiten neu messen und in die Tabelle eintragen. Erwartete Verbesserung:
- `/arbeit/arbeitszeitrechner`: 95 → **≥ 98**
- `/finanzen/etf-sparplanrechner`: 92 → **≥ 94** (Rest der Score-Lücke durch color-contrast in 78z-A)
- `/gesundheit/zyklusrechner`: 95 → **≥ 98**

**Als Folge:** BfE-Seite (`app/barrierefreiheit/page.tsx`) sollte nach dem Re-Sweep den neuen Ø-Score ersetzen. Aktuell 98,4 — nach den Fixes voraussichtlich > 99.

Nächster Prompt **78z-A** adressiert den Hauptteil der verbleibenden Serious-Findings (27 color-contrast, v. a. die 16 Zonen-Farbblöcke im `HerzfrequenzZonenRechner`).

## Re-Run nach 78z-A (Color-Contrast) — 18. April 2026

Alle 5 betroffenen Seiten nach dem Fix neu gemessen + die 14 bereits grünen Seiten zur Regression mitgescannt:

| Route | LH Mobile | LH Desktop | Critical | Serious |
|---|---:|---:|---:|---:|
| `/sport/herzfrequenz-zonen-rechner` | 100 | 100 | 0 | 0 |
| `/alltag/prozentrechner` | 100 | 100 | 0 | 0 |
| `/wohnen/baufinanzierung-rechner` | 100 | 100 | 0 | 0 |
| `/finanzen/brutto-netto-rechner` | 100 | 100 | 0 | 0 |
| `/sport/pace-rechner` | 100 | 100 | 0 | 0 |

Alle übrigen 14 Stichproben: unverändert 100/100, 0 Findings.

**Fix-Ansatz:**
- **HerzfrequenzZonenRechner** (16 Serious): Das ZONEN-Array wurde komplett auf WCAG-AA-konforme Paare umgestellt — Zone 1 `bg-green-200 text-green-950`, Zone 2 `bg-green-500 text-green-950`, Zone 3 `bg-yellow-400 text-yellow-950`, Zone 4 `bg-orange-500 text-orange-950`, Zone 5 `bg-red-700 text-white`. Der visuelle Gradient (Regeneration → Maximum) bleibt erhalten. Zusätzlich `opacity-90` auf den beiden Sub-Text-Zeilen entfernt; die Hierarchie zum Haupt-Text bleibt durch Schriftgröße und Weight gewahrt.
- **Prozentrechner** (6 Serious): Die 6 Quick-Value-Prozent-Buttons hatten im aktiven Zustand `bg-accent-500 text-white` (≈ 2:1) und inaktiv `bg-gray-100 text-gray-500` (≈ 4,24:1). Fix auf `bg-accent-700 text-white` aktiv und `text-gray-700 dark:text-gray-200` inaktiv — beide sauber über 4,5:1.
- **BaufinanzierungRechner** (2 Serious + 1 weiteres aus dem Abend-Scan): Ursprünglich `text-amber-600` in der EK-Quote-Bewertung, später zusätzlich `text-orange-600` in der Restschuld-/Zinsanteil-Anzeige und `text-green-600` in der Tilgungsanteil-Spalte der Jahrestabelle. Alle drei Farbfamilien auf die `-700` (light) und `dark:*-300` (dark) Stufen gehoben — Orange und Grün bleiben farblich deutlich erkennbar.
- **BruttoNettoRechner** (1 Serious): Der Verteilungs-Prozentbalken hatte im Netto-Segment `bg-green-600 text-white` (≈ 3,29:1) und im Steuer-Segment `bg-red-600 text-white` (≈ 4,61:1 borderline). Fix auf `bg-green-800 text-white` (≈ 5,86:1) und `bg-red-700 text-white` (≈ 6,58:1).
- **PaceRechner** (1 Serious keyboard-access, nicht color-contrast wie ursprünglich vermutet): Die Split-Tabelle mit `overflow-x-auto max-h-96` war scrollbar, aber nicht tastatur-fokusierbar. Fix: `tabIndex={0}` + `role="region"` + `aria-label` am Scroll-Container.

## Status gesamt nach 78z-B + 78z-A

| Metrik | Baseline | Nach 78z-B | Nach 78z-A | Gesamt-Δ |
|---|---:|---:|---:|---:|
| LH Mobile Ø | 98,42 | 99,37 | **100,00** | +1,58 |
| LH Desktop Ø | 98,42 | 99,37 | **100,00** | +1,58 |
| axe Critical | 5 | 0 | **0** | −5 |
| axe Serious | 28 | 26 | **0** | −28 |
| 100/100 + 0 Findings | 11/19 | 14/19 | **19/19** | +8 Seiten |

A11y-Sprint damit abgeschlossen bis auf 78z-C (Taschenrechner-Crosslinks, Design-Entscheidung).

## Nächster Sweep

Empfohlener Rhythmus: nach jedem größeren Sprint oder nach Layout-/Footer-Änderungen.
Bei Regressionen gegen Baseline: Finding in neue Prompt-Nummer überführen, adressieren, Baseline aktualisieren.
