# W15C T1 Phase 3 — Mini-Diagnose BMI + Mietrechner

**Stand:** 23.05.2026, Phase-1-Output
**Status:** **STOP — PSI-Diagnostics von Karsten nötig** vor Code-Eingriff

---

## Was untersucht

1. **Component-Code lesen:**
   - `BmiRechner.tsx` = 231 Z. / 10,4 KB — schlank, keine Charts, keine schwere Lib
   - `MietrechnerRechner.tsx` = 155 Z. / 8,0 KB — noch schlanker
2. **Imports:**
   - BMI: `berechneBmi` + `RadioToggleGroup` + `NummerEingabe` + `AiExplain` + `CrossLink`
   - Mietrechner: `berechneMietpreis` + `NummerEingabe` + `AiExplain` + `CrossLink`
   - Beide: keine Chart-Lib, keine SVG-Importe, keine Inline-JSON-Daten > 50 Z.
3. **SSR-HTML-Größen-Vergleich (Median über 170 Rechner = 107 KB):**
   - BMI: **127 KB** (64. Perzentil — überdurchschnittlich, aber nicht extrem)
   - Mietrechner: **140 KB** (87. Perzentil — relativ groß, aber unter Max 154 KB)
4. **Top-10-Zusatzcontent:**
   - Beide haben `zeigtAuthorBio: true` + 5 Quellen-Einträge — gleiche Last wie andere 8 Top-10-Rechner
   - Brutto-Netto-Rechner (Top-10) hat zusätzlich Inline-Erklärung + Tabelle — größeres HTML
5. **Sub-Components on Page:**
   - Beide: kein verwaister `<img>`, keine Render-Blocking-Resource im Component-Code
   - BMI hat CSS-only Balken (`bmiKategorien.map`), keine SVG/Canvas
   - Mietrechner hat CSS-only Belastungs-Balken, keine SVG/Canvas

## Was NICHT gefunden

- Keine ungewöhnlich große Component (beide unter der Median-Component-Größe von ~14 KB)
- Keine Chart.js / recharts / ApexCharts in Imports
- Keine Hero-Image oder schweres Above-the-Fold-Bild
- Kein common Sub-Component, das nur diese beiden Pages nutzen
- Keine Render-Blocking-Resource speziell für diese Pages
- Keine Berechnungs-Lib mit `decimal.js` (anders als Brutto-Netto — beide nutzen native `Number`)

## Hypothesen (ohne PSI-Diagnostics nicht priorisierbar)

| Hyp | Möglicher Treiber | Gegen-Evidenz |
|---|---|---|
| **H-A** | SSR-HTML überdurchschnittlich groß → INP/TBT | BMI nur 127 KB, andere Top-10 mit 141 KB sind aber im Good-Bereich |
| **H-B** | Conditional Renderings (`istKind`/`mietbelastungOk`-Pfad) verursachen Hydration-Reflow | Plausibel für CLS, eher nicht für LCP |
| **H-C** | PSI-Streuung (einzelne Messung statt Median) | Karsten gibt jeweils **eine Messung** an — gut möglich, dass Median anders aussieht |
| **H-D** | LCP-Element bei beiden ist die Result-Box mit Default-Berechnung — die wartet auf `useMemo`-Evaluation | LCP-Element wäre normalerweise oben sichtbar (H1 oder Inputs) |
| **H-E** | Vercel-Cold-Start für seltener besuchte Pages | Andere Top-10-Pages dürften auch davon betroffen sein, sind aber im Good-Bereich |

## Pragmatische Best-Effort-Maßnahmen ohne PSI

Falls Karsten ohne weitere Diagnostics weitermachen will, kann ich **2 plausible Mini-Optimierungen** anbieten:

1. **BMI-Skala in dynamic-loaded Sub-Component verschieben** — die `bmiKategorien.map`-Balken-Visualisierung ist below-the-fold (nach Result-Box). Component-Split + `dynamic({ ssr: true })` würde sie aus dem Initial-Hydration-Pfad nehmen, ohne SSR-Sichtbarkeit zu verlieren.
   - Erwarteter Effekt: −5 bis −15 Score-Punkte? Unsicher.
   - Risiko: niedrig (ssr: true bleibt).

2. **Mietrechner-Aufschlüsselungs-Block (Tabelle) lazy** — die "Aufschlüsselung"-Section am unteren Page-Ende ist nicht LCP-relevant. Component-Split analog.
   - Erwarteter Effekt: ähnlich, unsicher.

Beide Maßnahmen sind plausibel, aber **ohne PSI-Diagnostics nicht zielgerichtet**.

## Rückfrage an Karsten

Eine der drei Optionen reicht für Fortsetzung:

**Option 1:** PSI-Diagnostics-Liste für beide Pages inline geben — speziell:
- "Largest Contentful Paint element" (was ist der LCP-Element?)
- "Avoid large network payloads" (welche Resource ist zu groß?)
- "Eliminate render-blocking resources" (welche Resource blockiert?)
- "Reduce JavaScript execution time" (welcher Script-Chunk dauert wie lang?)

**Option 2:** Mehrere PSI-Messungen pro URL (Median statt Einzelmessung) — bevor wir optimieren, sicherstellen dass die Werte stabil sind. Bei 3 Messungen sollte sich PSI-Streuung deutlich reduzieren.

**Option 3:** Freigabe für Best-Effort (Maßnahmen 1+2 oben) ohne PSI-Daten. Risiko: möglicher Null-Effekt, falls die Treiber woanders sind.

---

**Empfehlung:** Option 1 oder 2. Option 3 nur wenn andere Optionen zu zeitaufwändig.
