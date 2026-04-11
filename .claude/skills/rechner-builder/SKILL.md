---
name: rechner-builder
description: Template and checklist for building standardized online calculators (Rechner) for rechenfix.de. Use this skill whenever creating a new calculator/Rechner page, adding a calculator to the site, or when the user mentions building, creating, or adding a Rechner for rechenfix.de. Also trigger when the user says "neuer Rechner", "Rechner erstellen", "Rechner bauen", or references the rechenfix project. This ensures every calculator is consistent, complete, and SEO-optimized with all required features (KI-Erklärung, Share, Copy, Feedback, Schema.org, etc.).
---

# Rechner Builder für rechenfix.de

Build standardized, SEO-optimized calculator pages for the German calculator portal rechenfix.de. Every calculator must follow this template to ensure consistency, completeness, and maximum SEO impact.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel
- **AI:** Anthropic Claude API (for "Fix erklärt" feature)
- **Domain:** https://www.rechenfix.de (ALWAYS use www)

## When Building a New Rechner

Follow these steps in order. Do not skip any step.

### Step 1: Create the Page

Create the page file at: `/app/[kategorie]/[rechner-name]/page.tsx`

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

### Step 10: Meta Tags

```tsx
export const metadata = {
  title: '[Rechner-Name] 2026 — [Kurzbeschreibung] | Rechenfix',
  description: '[Beschreibung] ✓ [Feature 1] ✓ [Feature 2] ✓ Mit KI-Erklärung.',
  alternates: {
    canonical: 'https://www.rechenfix.de/[kategorie]/[rechner-name]',
  },
  openGraph: {
    title: '[Rechner-Name] 2026 | Rechenfix',
    description: '[Beschreibung]',
    url: 'https://www.rechenfix.de/[kategorie]/[rechner-name]',
    type: 'website',
  },
}
```

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

### Step 12: Register the Calculator

After the page works:

1. Add to **sidebar navigation** (update category count)
2. Add to **category page** (e.g., /finanzen shows all finance calculators)
3. Add to **sitemap** (must use https://www.rechenfix.de/ with www)
4. Consider adding to **"Neu hinzugefügt"** section on homepage

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
