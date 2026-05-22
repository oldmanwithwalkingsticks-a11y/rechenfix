# W15C T3 — Wortzahl-Audit (Phase 1)

**Stand:** 22.05.2026
**Modus:** READ-ONLY (Bestandsaufnahme, keine Content-Aufwertungen)
**Datenbasis:** [w15c-wortzahl-audit.csv](w15c-wortzahl-audit.csv) (170 Rechner, generiert via `npm run audit:wortzahl`)

---

## Headline-Befund: Entwarnung

**Die Hypothese aus dem Prompt — „AdSense-Reviewer trifft Stichprobe auf einen dünnen Rechner" — trifft nicht zu.**

| Bewertung | Schwelle | Anzahl | Anteil |
|---|---|---|---|
| **KRITISCH** | <300 W | **0** | 0,0 % |
| **DÜNN** | 300–499 W | **1** | 0,6 % |
| AKZEPTABEL | 500–799 W | 68 | 42,2 % |
| GUT | 800+ W | 91 | 56,5 % |
| INLINE | (Component-Render) | 1 | brutto-netto-rechner |
| ALREADY_DONE | (W15A.3 Top-10) | 9 | 1700–1900 W avg |

(Anzahlen ohne INLINE/ALREADY_DONE = 160 Rechner im Bewertungs-Scope.)

- **0 kritische Pages** — keine Page liefert weniger als 300 Wörter Erklärtext+FAQ
- **1 dünne Page** (`countdown` mit 469 W) — der einzige Grenzfall
- **42 % AKZEPTABEL** (500–799 W) — solider Mittelbereich, AdSense-konform
- **57 % GUT** (800+ W) — substantieller Content, weit über der Schwelle für "thin content"

**Konkret für AdSense-Re-Review:** Auch wenn der Reviewer eine Zufallsstichprobe nimmt, trifft er mit > 99 % Wahrscheinlichkeit auf ≥ 500 W Content pro Page. Die historische AdSense-Ablehnung vom 27.04.2026 hatte als Root Cause den `<LazySection>`-SSR-Bug (Lehre 25 / Prompt 154) — der Erklärtext war damals zwar vorhanden, aber für den Crawler unsichtbar. Seit 154 ist das gefixt. Die jetzt geleerte Hypothese „dünner Content unter den 154 nicht-aufgewerteten Rechnern" ist damit auch widerlegt.

---

## Verteilung pro Kategorie (ohne ALREADY_DONE / INLINE)

| Kategorie | Total | KRIT | DÜNN | AKZ | GUT |
|---|---:|---:|---:|---:|---:|
| alltag | 21 | 0 | 1 | 12 | 8 |
| finanzen | 41 | 0 | 0 | 16 | 25 |
| gesundheit | 16 | 0 | 0 | 9 | 7 |
| auto | 10 | 0 | 0 | 5 | 5 |
| wohnen | 23 | 0 | 0 | 10 | 13 |
| mathe | 18 | 0 | 0 | 8 | 10 |
| arbeit | 17 | 0 | 0 | 2 | 15 |
| kochen | 12 | 0 | 0 | 5 | 7 |
| sport | 2 | 0 | 0 | 1 | 1 |
| **Summe** | **160** | **0** | **1** | **68** | **91** |

**Auffällig:** Arbeit & Recht ist die mit Abstand stärkste Kategorie (15/17 GUT, ~88 %). Das Welle-2-Stufe-3-Audit hat hier Spuren hinterlassen — die rechtssensitiven Rechner haben durch die Norm-Zitate (Prompts 157a–f) und P3-UX-Items reichlich Content bekommen. Finanzen ist mit 61 % GUT ebenfalls stark.

Auffälliger an der unteren Kante: **Alltag mit 12/21 AKZEPTABEL** (57 %) hat den größten Anteil grenzwertiger Pages. Plus die einzige DÜNN-Page (countdown). Wenn Aufwertung priorisiert wird, beginnt sie hier.

---

## KRITISCH-Liste

**Leer.** ✓

---

## DÜNN-Liste (1 Eintrag, der einzige Grenzfall)

| Slug | Kategorie | Erklär | FAQ | Gesamt | Anmerkung |
|---|---|---:|---:|---:|---|
| `countdown` | alltag | 317 | 152 | **469** | Knapp unter 500 W. Utility-Rechner (Sekunden bis Datum/Uhrzeit), Anwendungsfälle eher schmal — natürliches Limit für Erklär-Content. |

**Empfehlung:** Eine kleine Aufwertung auf ~600 W ist machbar (+150 W, ~30 Min). Use-Cases ausbauen (Silvester, Geburtstag, Produkt-Launch, Kongress-Anmeldefrist), CSS-Pause-Pattern-Hinweis, Vergleich zu Tagerechner. Geringe Akut-Lage, weil weit über der AdSense-„thin content"-Schwelle (typisch <100 W).

---

## AKZEPTABEL-Liste — Grenzfälle unter 650 W (20 Pages)

Diese Pages liegen zwischen 500 und 649 W. Stabil im AdSense-Scope, aber Aufwertung auf 800+ W (Schwelle zu GUT) wäre nachhaltiger gegen künftige Content-Quality-Schwankungen.

| Slug | Kategorie | Erklär | FAQ | Gesamt |
|---|---|---:|---:|---:|
| nebenkosten-rechner | wohnen | 322 | 188 | 510 |
| wahrer-stundenlohn | finanzen | 347 | 171 | 518 |
| estrich-rechner | wohnen | 313 | 206 | 519 |
| lebenszeit-rechner | alltag | 360 | 162 | 522 |
| raucher-rechner | gesundheit | 357 | 177 | 534 |
| spenden-rechner | finanzen | 345 | 201 | 546 |
| grunderwerbsteuer-rechner | wohnen | 395 | 158 | 553 |
| reisekosten-rechner | alltag | 349 | 210 | 559 |
| budget-rechner | alltag | 378 | 204 | 582 |
| beton-rechner | wohnen | 344 | 240 | 584 |
| midijob-rechner | finanzen | 368 | 225 | 593 |
| fahrrad-rahmengroesse-rechner | auto | 350 | 243 | 593 |
| steuerprogression-rechner | finanzen | 368 | 236 | 604 |
| nebenjob-rechner | finanzen | 404 | 211 | 615 |
| zeitwert-rechner | alltag | 389 | 227 | 616 |
| firmenwagen-rechner | auto | 365 | 253 | 618 |
| grundsteuer-rechner | wohnen | 409 | 209 | 618 |
| noten-international | mathe | 394 | 228 | 622 |
| streaming-kosten-rechner | alltag | 486 | 155 | 641 |
| sonnenschutz-rechner | gesundheit | 409 | 237 | 646 |

**Muster der Lücke:** Diese Pages haben überwiegend kurze Erklärtexte (300–400 W) UND knappe FAQs (~5 Q&A à 30 W). Das W15A.3-Pattern (Anwendungsfälle-Block + Häufige-Fehler-Block + ≥ 8 FAQ) würde sie auf 800–1000 W heben.

**Weitere 48 AKZEPTABEL-Pages** liegen 650–799 W — kein Akut-Risiko, optionale Polish-Ziele.

---

## Strategische Empfehlung

### Priorität 1 — Vor nächstem AdSense-Resubmit: KEINE Pflicht-Aufwertung

Das Audit hat den vermuteten Hauptgrund für AdSense-Risiko entkräftet. Es gibt keine kritischen Pages, und die einzige DÜNN-Page (countdown) liegt bei 469 W weit über jedem realistischen "thin content"-Schwellwert (Google's Anhaltspunkt: <100 W). **Der AdSense-Resubmit braucht aus Content-Wortzahl-Sicht keine Vorbedingung.**

### Priorität 2 — Optionaler Polish-Sprint (W15C T4): countdown + 20 Grenzfälle

Wenn Karsten Bandbreite hat:
- countdown auf ~600 W (+150 W, ~30 Min) — schließt die DÜNN-Lücke
- Top-5 dünnste AKZEPTABEL (510–550 W) auf 800+ W (~30 Min/Page = 2,5 h)
- Gesamt ~3 h → 0 DÜNN, 95 % AKZEPTABEL/GUT-Verteilung

Reihenfolge nach Traffic (falls Vercel Analytics Daten liefert): nebenkosten/grunderwerbsteuer/grundsteuer/midijob/firmenwagen sind voraussichtlich traffic-stark. raucher/lebenszeit/streaming-kosten/zeitwert eher utility-arme Reach-Pages.

### Priorität 3 — Künftiger Content-Sprint (Welle 16+): Top-20 + Long-Tail-Pattern auf alle 68 AKZEPTABEL anwenden

Wenn die Top-10-Aufwertung aus W15A.3 funktioniert (E-E-A-T-Wirkung sichtbar in Search Console nach 3–4 Monaten), denselben Pattern auf die nächste Welle anwenden:
- 20 nächste Traffic-Pages identifizieren via Vercel-Analytics
- Quellen-Liste + Anwendungsfälle + Häufige Fehler + 8+ FAQ pro Page
- Pro Page Aufwand ~1–2 h, Sprint-Gesamt ~30 h

Das ist **kein** AdSense-Risiko-Item, sondern reine SEO-Investition für organischen Traffic.

---

## Aufwand-Schätzung pro Page (für Phase-2-Aufwertungs-Sprint)

Basierend auf den W15A.3-Erfahrungen (Top-10-Aufwertung):
- **Mini-Aufwertung** (DÜNN → AKZEPTABEL, +150–200 W): ~20–30 Min/Page
- **Voll-Aufwertung** (AKZEPTABEL → GUT, +300–500 W): ~60–90 Min/Page
- **Top-Aufwertung** (mit Quellen-Liste + Anwendungsfälle + Häufige-Fehler-Blöcken, wie W15A.3): ~90–120 Min/Page

Inhaltliche Vorbereitung pro Page (Research, Primärquellen, Anwendungsfälle-Brainstorm) ist 50–60 % der Zeit; reines Schreiben/Editieren der Config 40–50 %.

---

## Methodisches

### Schwellwerte-Begründung

- **300 W als KRITISCH-Schwelle:** Liegt deutlich über Googles bekanntem "thin content"-Bereich (<100 W), aber unter dem informellen E-E-A-T-Minimum für YMYL-Themen (~500 W). Bei rechenfix sind viele Pages Finanz-/Gesundheits-YMYL, deshalb konservative Schwelle.
- **500 W als DÜNN-Schwelle:** SEO-Konsens für eigenständige Topic-Pages ohne unique Datenstruktur. Rechenfix-Rechner haben zusätzlich UI + Schema.org + Quellen, also etwas Reserve nach unten.
- **800 W als GUT-Schwelle:** Pragmatisch — über 800 W beginnt der Diminishing-Return zwischen Aufwand und Ranking-Effekt. W15A.3 hat 1500+ W angepeilt (Top-Spec), aber 800+ W reicht für solide AdSense-Konformität.

### Was die Wortzahl NICHT abdeckt

- **Schema.org JSON-LD** (Rechner haben WebApplication + FAQPage + BreadcrumbList) — fließt in den HTML, ist aber kein "Wort" für menschliche Leser
- **Inline-UI-Texte in der Component** (Labels, Result-Box-Beschriftungen, Validierungs-Hinweise) — diese kommen je nach Component +100–300 W zusätzlich, die der Crawler sieht
- **Quellen-Card** für 10 Top-10-Rechner — zusätzliche 5–15 nummerierte Quellen pro Page
- **AuthorBio** — zusätzliche ~30 W pro Top-10-Page

Die Audit-CSV gibt also eine **konservative Unter-Schätzung** des tatsächlich sichtbaren Crawler-Contents. Real sind die Pages eher 100–300 W reicher als die CSV anzeigt.

### Sonderfall brutto-netto-rechner

Wird als `INLINE` markiert. Die Component [BruttoNettoRechner.tsx](../../components/rechner/BruttoNettoRechner.tsx) rendert ihren Erklärtext + FAQ inline (W13.1.1+, [INLINE_ERKLAERUNG_SLUGS](../../app/[kategorie]/[rechner]/page.tsx) Z. 199). Der Config-`erklaerung`-Wert ist leer/Stub. Tatsächlicher Crawler-Content ist substantiell — wurde in W15A.3 als Teil der Top-10-Aufwertung manuell bearbeitet. Audit-Wortzahl spiegelt das nicht wider.

---

## Artefakte

| Datei | Zweck |
|---|---|
| [scripts/wortzahl-audit.mjs](../../scripts/wortzahl-audit.mjs) | Audit-Script (ES-Module mit tsx-Loader) |
| [docs/audit-arbeitspapiere/w15c-wortzahl-audit.csv](w15c-wortzahl-audit.csv) | CSV-Output, 170 Zeilen sortiert nach Gesamt-Wortzahl |
| `npm run audit:wortzahl` | Regenerieren des Audits + CSV-Output |

Audit-Script + npm-Script bleiben dauerhaft im Repo — sie können später als Regressions-Check nach Content-Sprints wieder gefahren werden (z. B. nach W15C T4 oder Welle 16). Kein Cleanup nötig.

---

## STOP

Phase 1 endet hier. **Erwartung:** Karsten entscheidet, ob ein W15C T4 Polish-Sprint folgt (countdown + 20 Grenzfälle, ~3 h) oder ob die Wortzahl-Lage als „erledigt" akzeptiert wird und der Fokus auf andere W15C-Items (T2 Performance) bleibt.
