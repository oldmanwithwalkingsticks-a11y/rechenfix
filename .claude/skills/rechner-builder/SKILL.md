---
name: rechner-builder
description: Template and checklist for building standardized online calculators (Rechner) for rechenfix.de. Use this skill whenever creating a new calculator/Rechner page, adding a calculator to the site, or when the user mentions building, creating, or adding a Rechner for rechenfix.de. Also trigger when the user says "neuer Rechner", "Rechner erstellen", "Rechner bauen", or references the rechenfix project. This ensures every calculator is consistent, complete, and SEO-optimized with all required features (KI-Erklärung, Share, Copy, Feedback, Schema.org, etc.).
---

# Rechner Builder für rechenfix.de

Build standardized, SEO-optimized calculator pages for the German calculator portal rechenfix.de. Every calculator must follow this template to ensure consistency, completeness, and maximum SEO impact.

**Aktueller Stand:** 105 Rechner live (Alltag 18, Finanzen 28, Gesundheit 12, Auto 6, Wohnen 16, Mathe 10, Arbeit 15).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel
- **AI:** Anthropic Claude API (for "Fix erklärt" feature)
- **Domain:** https://www.rechenfix.de (ALWAYS use www)

## When Building a New Rechner

Follow these steps in order. Do not skip any step.

### Step 1: Register the Calculator (dynamische Route)

**WICHTIG:** Alle Rechner laufen über die dynamische Route `app/[kategorie]/[rechner]/page.tsx`. Für einen neuen Rechner wird **KEIN** neuer `page.tsx` erstellt. Stattdessen:

a) **Config-Eintrag** in `lib/rechner-config/<kategorie>.ts` (alltag.ts, finanzen.ts, gesundheit.ts, auto.ts, wohnen.ts, mathe.ts, arbeit.ts) mit `slug`, `title`, `metaDescription`, `emoji`, `kategorie`, SEO-Text, FAQ, CrossLinks, etc.
b) **Neue Rechner-Component** unter `components/rechner/<Name>Rechner.tsx` — dort lebt die gesamte UI + Live-Rechnung.
c) **Component-Mapping**: Den neuen Component-Import in der Komponenten-Registry hinzufügen, damit die dynamische Route ihn lädt.
d) `openGraph.description` wird **automatisch** aus `metaDescription` abgeleitet — KEIN separates Feld pflegen.

Category mapping:
| Category | Path | Topics |
|----------|------|--------|
| Alltag | `/alltag` | Prozent, Dreisatz, Tage, Rabatt, Countdown, Kosten-Vergleiche |
| Finanzen | `/finanzen` | Brutto-Netto, MwSt, Zins, Gehalt, Rente, Steuern |
| Gesundheit | `/gesundheit` | BMI, Kalorien, Schlaf, Rauchen |
| Auto & Verkehr | `/auto` | Sprit, KW-PS, Kfz-Steuer, Fahrtkosten |
| Wohnen & Energie | `/wohnen` | Strom, Heizung, Miete, Nebenkosten, Immobilien |
| Mathe & Schule | `/mathe` | Brüche, Einheiten, Noten, Durchschnitt |
| Arbeit & Recht | `/arbeit` | Arbeitszeit, Urlaub, Überstunden, Pendlerpauschale |

### Step 2: Page Structure

Every Rechner page must contain these elements in this order:

```
1. Breadcrumbs (Startseite > Kategorie > Rechner-Name)
2. H1 with Emoji + Rechner-Name
3. Description text (1 sentence)
4. Calculator input fields
5. Live result display (no submit button!)
6. Result action buttons (Copy, Share)
7. "Fix erklärt" KI-Button
8. "War dieser Rechner hilfreich?" Feedback
9. SEO content text (below fold)
10. FAQ section
11. "Das könnte Sie auch interessieren" (4 related calculators)
```

### Step 3: Input Fields

Requirements for all input fields:
- Minimum height: **48px** (touch-friendly on mobile)
- Use `type="number"` and `inputmode="decimal"` for number fields
- Use `type="date"` for date fields
- Provide sensible **default values** so the calculator shows a result immediately
- Add **labels** above every field (not placeholder-only)
- For dropdowns: Use native `<select>` elements
- For toggles: Use clear toggle buttons (not checkboxes)

### Step 4: Live Calculation

- Calculate on **every input change** — NO submit button
- Use `useEffect` or `onChange` handlers
- Show results immediately as the user types
- Animate result changes with a subtle fade/transition

### Step 5: Result Display

- Show the **main result prominently** (large font, colored background)
- Include a **breakdown table** where applicable (itemized)
- Add a **visual element** where useful (bar chart, progress bar, pie chart)
- Show **comparison values** when relevant ("X% über/unter Durchschnitt")

### Step 6: Required Buttons and Components

#### a) "Ergebnis kopieren" Button
Copies formatted result to clipboard:
```
"[Ergebnis] — berechnet auf rechenfix.de"
```

#### b) "Teilen" Button
Dropdown with:
- WhatsApp share (wa.me link with pre-filled text)
- E-Mail share (mailto: with subject and body)
- Copy link (current URL)

#### c) "Fix erklärt" KI-Button
Import and use the `AiExplain` component:
```tsx
<AiExplain
  rechnerName="[Name des Rechners]"
  eingaben={inputValues}
  ergebnis={resultValues}
/>
```
Place directly under the result section.

#### d) "War dieser Rechner hilfreich?" Feedback
Two buttons: 👍 Ja | 👎 Nein
On "Nein": Show link "Möchten Sie uns mehr verraten? → Zum Feedback-Formular"

#### e) "Das könnte Sie auch interessieren"
4 related calculator cards. Choose thematically related calculators.
Layout: 4 in a row on desktop, 2×2 on mobile.

### Step 7: SEO Content

Place below the calculator (below the fold). Include:

- **H2 headings** for structure (3-5 sections)
- **Minimum 600 words** of unique, helpful content
- **Formel-Box:** Show the formula used in a highlighted box
- **Rechenbeispiel-Box:** Show a worked example
- **Internal links** to related calculators within the text
- Write in German, formal "Sie" form

### Step 8: FAQ Section

- Minimum **5 questions** relevant to the calculator topic
- Implement as expandable accordion (click to open/close)
- Add **FAQPage Schema.org** structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Frage hier",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Antwort hier"
      }
    }
  ]
}
```

### Step 9: Schema.org Markup

Add **WebApplication** schema to every calculator:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Rechner-Name] 2026",
  "url": "https://www.rechenfix.de/[kategorie]/[rechner-name]",
  "applicationCategory": "[FinanceApplication|HealthApplication|UtilitiesApplication]",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}
```

Add **BreadcrumbList** schema matching the visible breadcrumbs.

### Step 10: Meta Tags (über die Config)

Meta-Tags werden **NICHT** in einer eigenen `page.tsx` gesetzt, sondern fließen aus dem Config-Eintrag in `lib/rechner-config/<kategorie>.ts`. Die dynamische Route generiert daraus `title`, `description`, `canonical` und `openGraph` automatisch.

Relevante Felder pro Rechner-Eintrag:
- `title` — wird zu `"<title> 2026 — ... | Rechenfix"`
- `metaDescription` — wird direkt als `<meta name="description">` und als `openGraph.description` verwendet (nicht doppelt pflegen!)
- `slug` + `kategorie` — ergeben die Canonical-URL `https://www.rechenfix.de/<kategorie>/<slug>`

**Regeln für `metaDescription`:**
- **MAXIMAL 155 Zeichen** — Google schneidet längere Descriptions gnadenlos ab. Vor dem Commit mit `node -e "console.log('...'.length)"` zählen.
- **KEIN Suffix** `✓ Kostenlos. ✓ Mit KI-Erklärung.` — das Wort „kostenlos" natürlich in den Fließtext einbauen.
- **Keine ✓-Emojis** in der Description.
- In Fließtext-Form schreiben, nicht als Feature-Liste mit Häkchen.

Beispiel gut (134 Z.):
> „Prozentrechner: Prozentwert, Grundwert, Prozentsatz, Aufschlag & Rabatt sofort berechnen — mit Rechenweg, Formel und KI-Erklärung."

Beispiel schlecht (alt, >170 Z. + Suffix):
> „Prozente sofort berechnen ✓ Grundwert ✓ Prozentwert ✓ Prozentsatz ✓ Aufschlag ✓ Rabatt ✓ Mit Rechenweg ✓ Kostenlos. ✓ Mit KI-Erklärung."

**CRITICAL:** All URLs must use `https://www.rechenfix.de/` (with www).

### Step 11: Integration Checklist

After creating the calculator, verify:

- [ ] Page renders without errors (`npm run dev`)
- [ ] Calculator shows result with default values on load
- [ ] All input fields work and update results live
- [ ] "Ergebnis kopieren" copies correct text
- [ ] "Teilen" buttons generate correct links
- [ ] "Fix erklärt" button is present
- [ ] Feedback buttons are present
- [ ] 4 related calculators shown at bottom
- [ ] SEO text is minimum 600 words
- [ ] FAQ section has minimum 5 questions
- [ ] Schema.org (FAQPage + WebApplication + BreadcrumbList) is present
- [ ] Meta title and description are set
- [ ] Canonical URL uses www.rechenfix.de
- [ ] Page is added to sitemap (www URLs only!)
- [ ] Page is added to sidebar navigation with correct category count
- [ ] Page is mobile-responsive (test at 320px width)
- [ ] Input fields are minimum 48px height
- [ ] **Meta-Description ≤ 155 Zeichen** (zählen! `node -e "console.log('…'.length)"`)
- [ ] Kein `✓ Kostenlos. ✓ Mit KI-Erklärung.`-Suffix, keine ✓-Emojis in der Description
- [ ] **Smoke-Test v3** nach Deploy über die betroffenen Routen laufen lassen: `scripts/smoke-test-v3.js` in die Browser-Konsole auf `https://www.rechenfix.de` pasten und `await runSmokeTestV3({ filter: /<slug>/ })` ausführen. Alle 9 Checks (C1–C9) müssen grün sein.
- [ ] **Guards G1–G9 geprüft** (siehe Abschnitt „Qualitäts-Guards" in diesem Skill)
- [ ] "Fix erklärt"-Button erscheint erst, nachdem der `ergebnis`-State gefüllt ist — das ist **kein Bug**, sondern gewollt

### Step 12: Register the Calculator

After the page works:

1. Add to **sidebar navigation** (update category count)
2. Add to **category page** (e.g., /finanzen shows all finance calculators)
3. Add to **sitemap** (must use https://www.rechenfix.de/ with www)
4. Consider adding to **"Neu hinzugefügt"** section on homepage

### Step 13: Qualitäts-Guards G1–G9 durchgehen

Bevor ein Rechner committed wird, die neun Guards unten im Abschnitt
„Qualitäts-Guards (aus Rezept-Umrechner-Audit, April 2026)" abarbeiten.
Wo ein Guard nicht zutrifft (z. B. G5 ohne Einheiten-Output), das in der
Code-Review-Notiz kurz begründen.

### Step 14: Smoke Test v3 lokal durchlaufen

Vor dem Commit einmal `await runSmokeTestV3({ filter: /<slug>/ })` in der
Browser-Konsole laufen lassen (siehe `scripts/smoke-test-v3.js`). Alle
neun Checks müssen grün sein — oder dokumentierte Ausnahme. Erst danach
committen.

## Qualitäts-Guards (aus Rezept-Umrechner-Audit, April 2026)

Diese neun Guards wurden nach einem Audit der Rezept-Umrechner-Session
extrahiert. Jeder neue Rechner MUSS sie einhalten. Sie sind außerdem in
`scripts/smoke-test-v3.js` als automatisierte Checks C1–C9 abgebildet.

### G1 — Division-by-zero-Guards
Jede Formel muss Null-Werte und leere Inputs abfangen. Zwei akzeptable
Muster:
- **Input-Clamping:** Wert springt on-change auf sinnvolles Minimum (≥1).
- **Early-Return in Berechnung:** statt `NaN`/`Infinity` eine Hinweisbox
  rendern („Bitte alle Felder ausfüllen").

Anti-Pattern: `const faktor = neueMenge / alteMenge;` ohne Guard.

### G2 — Reset-Button mit Default-Set
Definiere am Datei-Anfang eine `DEFAULT_STATE`-Konstante mit sinnvollen
Beispiel-Werten. Initial-State und Reset nutzen dieselbe Konstante.
NIEMALS auf `0`/`0` zurücksetzen — der Rechner soll nach Reset sofort
wieder ein plausibles Ergebnis zeigen.

```ts
const DEFAULT_STATE = { menge: 500, personen: 4, einheit: 'g' };
const [state, setState] = useState(DEFAULT_STATE);
const reset = () => setState(DEFAULT_STATE);
```

### G3 — JS-seitiges Clamping
`max` und `min` als HTML5-Attribute reichen nicht — der Browser erlaubt
out-of-range Werte, solange das Formular nicht submitted wird. In jedem
`onChange`:

```ts
const raw = parseInt(e.target.value, 10);
const clamped = isNaN(raw) ? MIN : Math.min(MAX, Math.max(MIN, raw));
setMenge(clamped);
```

### G4 — `step="1"` auf Integer-Inputs
Wenn der Wert nur ganzzahlig Sinn macht (Portionen, Personen, Stückzahl,
Tage, Kinderzahl), `step="1"` setzen. Verhindert Dezimaleingabe per
Pfeiltasten und schützt vor Rundungs-Quirks.

### G5 — Pluralisierung bei Einheiten-Output
Wenn der Rechner Zahlen + Einheiten ausgibt, eine `PLURAL_MAP` am
Komponenten-Anfang pflegen und an **allen** Ausgabestellen (Tabelle,
Copy-Output, aria-live) anwenden:

```ts
const PLURAL_MAP: Record<string, string> = {
  'Prise': 'Prisen',
  'Dose': 'Dosen',
  'Tasse': 'Tassen',
  'Packung': 'Packungen',
  // … bei Bedarf erweitern
};
const formatUnit = (n: number, unit: string) =>
  n === 1 ? unit : (PLURAL_MAP[unit] ?? unit);
```

### G6 — aria-live ohne Prefix-Dopplung
Nur EIN Präfix (Rechnername) im aria-live-Text, nicht im umgebenden
Label UND im Message-String. Format:

```
<Rechnername>: <X> → <Y> <Einheit> (Faktor × <n>)
```

Anti-Pattern: `aria-label="Rezept-Umrechner"` plus Textinhalt
`Rezept-Umrechner: Rezept-Umrechner: 2 Eier → 4 Eier`.

### G7 — Title maximal 72 Zeichen gerendert
`metaTitle` im Config muss so gewählt sein, dass
`metaTitle.length + 15` (Suffix ` | Rechenfix.de`) ≤ 60 ergibt.
Ausnahme nur mit Begründung im Kommentar (aktuelle Ausnahme:
`/gesundheit/schwangerschaft-gewicht-rechner` bei 72). Jahreszahl nur
dann, wenn tatsächlich jährlich ändernde Werte relevant sind
(Steuer-Tabellen, Sozialleistungen, Kindergeld, Rente, BAföG, AfA).

### G8 — Sidebar wird aus Route abgeleitet
Für Einzel-Rechner nicht relevant (Layout-Sache). Aber wenn eine neue
Kategorie eröffnet wird: Die Sidebar-Komponente muss `params.kategorie`
auswerten, nicht hardcoden. Sonst zeigt der neue Rechner die falsche
Sidebar.

### G9 — Skalierungs-Caps für nicht-linear skalierende Einheiten
Wenn ein Rechner Werte multipliziert (z. B. Rezept-Umrechner
Faktor × Menge), prüfen: Welche Einheiten machen mathematisch keinen
Sinn beim Skalieren? Diese vom Faktor ausnehmen und in der Komponente
dokumentieren:

```ts
// Nicht-skalierende Einheiten (Prise bleibt Prise, egal wie groß das Rezept)
const UNSCALED_UNITS = new Set(['Prise', 'n.B.', 'nach Geschmack']);
const skalieren = (menge: number, einheit: string, faktor: number) =>
  UNSCALED_UNITS.has(einheit) ? menge : menge * faktor;
```

## Rechner-Specific Templates

For detailed templates per calculator type, see `references/templates.md`.

## Common Mistakes to Avoid

- URLs without www in sitemap or canonical tags
- Missing "Fix erklärt" button
- No default values (calculator looks empty on load)
- SEO text too short (under 600 words)
- Missing Schema.org markup
- Forgot to update sidebar navigation count
- Submit button instead of live calculation
- Input fields too small on mobile (under 48px)
- **Meta-Description > 155 Zeichen** (Google schneidet ab)
- **Legacy `✓ Kostenlos. ✓ Mit KI-Erklärung.`-Suffix** in der Description
- Eine eigene `page.tsx` für den neuen Rechner anlegen, statt die Config in `lib/rechner-config/<kategorie>.ts` zu pflegen
- `openGraph.description` doppelt pflegen, statt sie aus `metaDescription` ableiten zu lassen
