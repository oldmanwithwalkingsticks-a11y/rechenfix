# Welle 15C — T6: Final-Polish vor AdSense-Resubmit

**Datum:** 24.05.2026
**Vorbedingung:** T4-Sprint durch (Commits `74d5250..2d800dc`), PSI-Re-Measurement durch Karsten. Verbleibende Probleme identifiziert.

## Kontext

PSI-Median nach T4-Sprint (3-6 Messungen pro URL):

| Page | Score | LCP | CLS |
|---|---|---|---|
| Homepage | 76 | 2.1s | 0.021 ✅ |
| Brutto-Netto | 93 | 3.0s | 0 ✅ |
| Mietrechner | 83 | 1.8-2.4s | **0.3** ⚠️ |
| BMI-Rechner | 62 | 2.1-7.6s | **0.3** ⚠️ |

**Drei konkrete Probleme identifiziert:**

### Problem 1 (KRITISCH): CLS 0.3 auf BMI + Mietrechner

PSI-Diagnostics „Layout shift culprits" zeigt auf BOTH Pages exakt dasselbe Element:

```html
<div class="w-full min-h-[280px] overflow-hidden no-print mb-8" aria-hidden="true">
```

Layout shift score 0.300 — der **AdSlot-Container selbst** schiebt darunter-liegenden Inhalt um 280px, weil er erst nach Initial-Render im DOM erscheint.

**Hypothese:** F2-Fix (`min-h-[280px]`) wurde technisch angewandt (Klasse ist drin), aber der Container wird trotzdem **dynamisch nach Initial-Render eingefügt** statt SSR-rendert. Mögliche Ursachen:
- AdSlot-Component hat `'use client'`-Boundary und rendert server-side `null`
- Consent-Check fügt Container erst nach GPC/Cookie-Status ein
- Mehrere AdSlot-Stellen in BMI + Mietrechner verwenden anderen Code-Pfad als die in Homepage/Brutto-Netto

L-W15C-T4-1 sagt: Container IMMER reservieren (auch SSR), conditional nur inneres `<ins>`. Anscheinend wurde dieses Pattern nicht auf ALLE AdSlot-Stellen konsequent angewandt.

### Problem 2 (MITTEL): F3 Legacy-Polyfills NICHT entfernt

Auf ALLEN 4 PSI-Berichten weiterhin: `Legacy JavaScript — Est savings of 12 KiB`. Browserslist-Update aus T4 F3 hat im Build nicht gegriffen.

**Hypothese:** Mehrere Browserslist-Configs (`.browserslistrc` vs `package.json`), Override durch Next.js-Default, oder eine Dependency liefert eigene Polyfills.

### Problem 3 (MITTEL): BMI-LCP-Schwankung 2.1s bis 7.6s

Andere Pages stabil. BMI-Page hat etwas Page-spezifisches, das bei Cold-Cache massiv Zeit kostet.

**Hypothese:** Above-the-Fold-Element auf BMI ist ein schwerer Asset (großes SVG-Tachometer/Gauge, Chart-Library, große Inline-Daten-Konstante). LCP-Element-Beschreibung in PSI: „BMI-Rechner ... Body Mass Index berechnen mit WHO-Einordnung, farbiger Skala und optimalem BMI..." — vermutlich die Skala/Gauge.

## Phase 1 — Mini-Diagnose (~15-20 Min, READ-ONLY)

### A) AdSlot-Pattern-Audit

1. **Alle AdSlot-Stellen lokalisieren** in BMI + Mietrechner-Pages:
   - `app/[kategorie]/[rechner]/page.tsx` — wo werden AdSlots gerendert?
   - `components/AdSlot.tsx` (oder vergleichbar) — aktueller Render-Code
   - Werden Pages-spezifische AdSlots irgendwo via `dynamic()` oder Suspense gerendert?

2. **Pattern-Check:** Wird der Container `<div class="w-full min-h-[280px] ...">` im SSR-HTML ausgegeben oder erst Client-Side?
   - Test: `curl https://www.rechenfix.de/gesundheit/bmi-rechner | grep -i "min-h-\[280"` — kommt das im Server-HTML vor?
   - Falls JA: dann wird das Element zwar SSR'd, aber etwas anderes verschiebt
   - Falls NEIN: AdSlot rendert server-side `null` — Anti-Pattern aus L-W15C-T4-1 noch aktiv

3. **Welche Stellen sind betroffen:** Homepage/Brutto-Netto haben CLS 0/0.021 — was machen die anders? Vergleich der AdSlot-Verwendung.

### B) F3 Browserslist-Diagnose

1. **Alle Browserslist-Configs auflisten:**
   - `package.json` `"browserslist"`-Feld
   - `.browserslistrc` im Repo-Root oder Sub-Dirs
   - `next.config.js`-Targets

2. **Welche Config greift?** `npx browserslist` in Repo-Root ausführen, Output zeigt die effektive Liste

3. **Build-Output:** `npm run build` ausführen, in `.next/`-Output suchen nach `Array.prototype.at` etc. — wird das transpiled oder nicht?

4. **Falls Browserslist korrekt, aber Polyfills trotzdem:** PSI-Diagnostics „Legacy JavaScript" aufklappen — welcher konkrete Chunk-File enthält die Polyfills? Verlinkt auf `chunks/2117-...js` oder ähnlich. Lokalisieren wer das importiert.

### C) BMI-Page-LCP-Audit

1. **BMI-Component lokalisieren:** `components/rechner/bmi-rechner.tsx` (oder Verzeichnis-Variante)

2. **Above-the-Fold-Inhalt analysieren:**
   - SVG-Skala/Gauge? Inline-SVG-Größe?
   - BMI-Klassen-Tabelle als Inline-Daten?
   - Schwere Bilder?
   - Komplexe Berechnungs-Visualisierung?

3. **Bundle-Output für BMI:** `npm run build` zeigt First Load JS pro Page. BMI vs. anderen Top-10 — ungewöhnlich groß?

4. **Hypothesen-Eingrenzung:** Welches Above-the-Fold-Element ist der wahrscheinliche LCP-Killer?

## Phase 2 — Fix (3 atomare Commits + Doku)

### Commit 1 — AdSlot-CLS-Fix konsequent

**Zweck:** Container `<div class="w-full min-h-[280px]...">` muss IMMER im SSR-HTML ausgegeben werden. Conditional nur das innere `<ins>`.

**Pattern (siehe L-W15C-T4-1):**
```tsx
// AdSlot.tsx oder vergleichbar
export default function AdSlot({ slotId, format = 'auto' }: Props) {
  return (
    <div 
      className="w-full min-h-[280px] overflow-hidden no-print mb-8"
      aria-hidden={!marketingAllowed}
    >
      {marketingAllowed && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
        />
      )}
    </div>
  );
}
```

**Wichtig:**
- Container rendert IMMER, schon im SSR
- `aria-hidden` umschaltbar je nach Consent (kein leerer Block für Screen-Reader)
- Conditional nur innen das `<ins>`
- **`'use client'`-Boundary entfernen falls vorhanden** — dieser Wrapper sollte Server-Component sein, nur falls Consent-Check Client-side, dann eigene Sub-Component dafür

**Falls mehrere AdSlot-Components existieren:** alle auf gleiches Pattern bringen. Vereinheitlichung sinnvoll.

Build grün. Lokal-Test: `curl` einer BMI-Page zeigt Container im HTML.

Commit:
```
fix: adslot-container immer ssr-rendern (cls-fix bmi+mietrechner)
```

### Commit 2 — F3 Browserslist-Fix (Echt-Wirkung)

**Zweck:** Polyfills wirklich aus Bundle eliminieren, nicht nur in Config.

Basierend auf Phase-1-Diagnose:

**Falls mehrere Configs existieren:** alle bis auf eine entfernen, eine zentrale Stelle (empfohlen: `package.json`).

**Falls Override durch Dependency:** Dependency-Polyfills via `next.config.js` `webpack`-Hook ausschließen:
```javascript
// next.config.js
webpack: (config) => {
  config.plugins.push(/* ... */)
  return config;
}
```

**Falls Browserslist korrekt, aber Next.js Default-Overrides greift:** explizite `compilerOptions.target: "es2020"` in `tsconfig.json` setzen.

**Pragmatischer Sanity-Check:** Wenn Browserslist greift, sollte `npx browserslist` z.B. `chrome 87, firefox 78, safari 14, edge 88` zeigen — NICHT `> 0.3%, not dead, not op_mini all`.

Build grün, PSI „Legacy JavaScript" verschwindet (oder bleibt — falls bleibt, ist es eine Dependency-Polyfill, dann akzeptieren als „nicht eliminierbar ohne Mehraufwand").

Commit:
```
fix: browserslist greift wirklich (legacy polyfills -12kb)
```

### Commit 3 — BMI-LCP-Fix

**Zweck:** BMI-LCP-Schwankung adressieren je nach Phase-1-Diagnose-Befund.

**Wahrscheinlichste Maßnahmen:**

**Maßnahme A: SVG-Gauge/Skala in Sub-Component + dynamic()**
Falls BMI-Skala (farbiger Tachometer) Above-the-Fold ist und schweres Inline-SVG:
```tsx
const BmiGauge = dynamic(() => import('./BmiGauge'), { 
  ssr: true,  // SEO-Pflicht
  loading: () => <div className="h-[280px]" />  // Skeleton mit fester Höhe
});
```

**Maßnahme B: BMI-Klassen-Tabelle in JSON ausgelagert**
Falls BMI-Klassen (Untergewicht/Normalgewicht/etc. mit Bereichen) als Inline-Datenkonstante: in `lib/data/bmi-klassen.json` auslagern, mit dynamic-Import.

**Maßnahme C: Hero-Bereich entlasten**
Falls Above-the-Fold ein Hero-Image hat: WebP-Optimierung + `<Image priority sizes>`.

**Code-Discretion:** je nach Phase-1-Befund die passende Maßnahme(n) wählen. Konservativ — kein Re-Architecture, nur gezielte Optimierung des LCP-Treibers.

Build grün, lokal `/gesundheit/bmi-rechner` rendert korrekt + funktioniert (BMI-Berechnung).

Commit:
```
perf: bmi-rechner above-the-fold entlastet (lcp-fix)
```

### Commit 4 — Doku

`docs/audit-arbeitspapiere/welle-status-historie.md` — W15C T6-Eintrag mit:
- Was wurde gefunden (Phase-1-Diagnose-Befunde)
- Was wurde gefixt (3 Commits)
- L-Lehren falls neue entstanden (z.B. zur Vollständigkeit beim Anwenden von Pattern-Fixes auf alle Stellen)

Commit:
```
docs: w15c t6 final-polish dokumentiert
```

## Phase 4 — Karsten manuell (nach Push + Vercel-Deploy)

**Finale PSI-Verifikation** je 3 Messungen, Median bilden:

```
https://www.rechenfix.de/gesundheit/bmi-rechner
https://www.rechenfix.de/wohnen/mietrechner
```

Plus eine Stichprobe um sicher zu sein nix anderes verschlechtert wurde:
```
https://www.rechenfix.de/arbeit/brutto-netto-rechner
https://www.rechenfix.de/
```

**Erfolgs-Kriterien für AdSense-Resubmit-Ready:**

| Metrik | Ziel | Härte |
|---|---|---|
| CLS auf BMI + Mietrechner | unter 0,1 | **MUSS** |
| LCP auf BMI + Mietrechner | unter 4s | MUSS |
| Score-Median BMI + Mietrechner | 75+ | SOLL |
| Andere Pages unverändert/besser | — | MUSS |
| PSI „Legacy JavaScript" | weg | SOLL (oder dokumentiert akzeptiert) |

**Wenn alle MUSS erfüllt:** AdSense-Resubmit-Ready. Wenn ein MUSS fehlschlägt: STOP, melde Befund.

## Regeln

- Build vor jedem Commit grün
- 4 atomare Commits, separat gepusht
- AdSlot-Container `min-h-[280px]` ist Pflicht-Pattern für ALLE Ad-Stellen
- Bei Unklarheit STOP + Rückfrage
- Phase-1-Diagnose VOR Phase-2-Fixes — wenn Diagnose kein klares Bild liefert, melde STOP

## Was NICHT in diesen Sprint

- AdSense-Resubmit (separate Karsten-Aktion nach Verify)
- Andere Pages mit potenziellen Problemen (Stichprobe-Verify reicht — wenn andere Pages stabil bleiben, ok)
- Re-Architecture von AdSense oder Consent-Flow
- T2/T3 Tailwind-CSS-Diet (Welle 16)
- Weitere Bundle-Optimierungen über die identifizierten Treiber hinaus
