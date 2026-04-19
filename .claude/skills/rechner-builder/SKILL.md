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
| Kochen & Ernährung | `/kochen` | Rezepte, Backen, Mengen-Umrechnung, Nährwerte |
| Sport & Fitness | `/sport` | Herzfrequenz-Zonen, Pace, Trainingsplan |

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

### Step 3a: Input Clamping (Pflicht)

HTML-Attribute `min` und `max` sind **nicht** ausreichend — Browser clampt programmatisch gesetzte Werte nicht. Bei jedem `<input type="number">` muss der `onChange`-Handler den Wert aktiv klammern:

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = parseFloat(e.target.value);
  if (isNaN(raw)) { setValue(0); return; }
  const clamped = Math.max(MIN, Math.min(MAX, raw));
  setValue(clamped);
};
```

Der Rechner muss als **controlled component** arbeiten — `value={state}` statt `defaultValue`, sonst bleibt der User-Eingabewert im Feld sichtbar, auch wenn der State bereits geklammert wurde.

Grund: Smoketest v3 Check C3 fängt fehlendes Clamping ab (Lesson aus Prompt 84a, April 2026).

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

### Step 11b: SSOT-Import-Audit (Pflicht vor Commit)

Vor dem `git commit` die neue oder geänderte Berechnungs-Lib auf
versteckte Duplikate prüfen:

```bash
grep -E "12348|17799|69878|40\.79|42\.52|9756|6828|2928|259|0\.38|5812\.50|8450|51944|13\.90|20350|37838" lib/berechnungen/<neue-lib>.ts
```

Jeder Treffer = verpflichtender Refactor auf zentrale Lib-Import,
bevor der PR aufmacht. Wenn der Wert wirklich gebraucht wird und
keine zentrale Quelle existiert: Konstante in die passende zentrale
Lib einführen und von dort importieren, nicht in der neuen Lib
hartcodieren.

Hintergrund: Der Welle-1-Audit (Prompts 94–95) hat in fünf Rechnern
solche Duplikate gefunden — alle mit veralteten oder frei erfundenen
Werten. Siehe „Anti-Patterns aus der Audit-Welle 2026" weiter unten.

### Step 11a: Smoketest v3 Regression (Pflicht nach jedem Eingriff)

Nach jeder Änderung an Rechnern oder zentralen Libs:

1. `https://www.rechenfix.de` im Inkognito-Tab öffnen
2. DevTools → Console → Smoketest-v3-Script einfügen
3. `await runSmokeTestV3()` ausführen
4. Erwartung: **178/178 Rechner-URLs grün, 0 Fails, 0 Errors**

Für Tarif-Änderungen zusätzlich: **Testfall 2 Familie** cent-genau verifizieren (5.000 €/Monat, StKl III, 2 Kinder unter 25, keine KiSt → Netto **3.546,00 €/Monat**).

Bekannter Noise: `adsbygoogle.js AdSense head tag doesn't support data-nscript attribute`-Warning. Ist kein Fail, kann ignoriert werden. Fix parkt bis AdSense-Freigabe (Prompt 85).

### Step 12: Register the Calculator

After the page works:

1. Add to **sidebar navigation** (update category count)
2. Add to **category page** (e.g., /finanzen shows all finance calculators)
3. Add to **sitemap** (must use https://www.rechenfix.de/ with www)
4. Consider adding to **"Neu hinzugefügt"** section on homepage

### Step 12a: Jahresabhängige Werte und Stichtag-Switch

Wenn der Rechner einen Parameter verwendet, der sich unterjährig
ändert (Rentenanpassung zum 01.07., Pfändungstabelle zum 01.07.,
Mindestlohn zum 01.01. usw.):

1. Wert kommt aus der zentralen Lib über eine
   `getAktuellerXxx(stichtag?)` Funktion — niemals als konstante Zahl.
2. Default-Aufruf ohne Parameter liefert den heute gültigen Wert
   (Server-Time).
3. **Optional (UX-Entscheidung):** Im UI einen Toggle/Tab „Stichtag
   heute" vs. „Ab TT.MM.JJJJ" anbieten, damit Nutzer den kommenden
   Wechsel vergleichen können. Siehe `PfaendungRechner` für
   Referenz-Umsetzung.
4. Wenn der Stichtag noch in der Zukunft liegt, im SEO-Text oder in
   einer Hinweis-Box auf den kommenden Wechsel verweisen.

**Pattern-Referenzen im Code:**
- `lib/berechnungen/mindestlohn.ts` — Switch auf 14,60 € zum 01.01.2027
- `lib/berechnungen/rente.ts` — Switch auf 42,52 € zum 01.07.2026
- `lib/berechnungen/pfaendung.ts` — Switch auf 1.587,40 € zum 01.07.2026

### Step 13: Qualitäts-Guards G1–G10 durchgehen

Bevor ein Rechner committed wird, die zehn Guards unten im Abschnitt
„Qualitäts-Guards (aus Rezept-Umrechner-Audit, April 2026)" abarbeiten.
Wo ein Guard nicht zutrifft (z. B. G5 ohne Einheiten-Output), das in der
Code-Review-Notiz kurz begründen. G10 (keine Dubletten zentraler Werte)
ist nach dem Jahresaudit 2026 hinzugekommen — besonders wichtig für
Finanz-, SV- und Arbeits-Rechner.

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

### G10 — Keine Dubletten zentraler Werte

Jeder Rechner, der einen gesetzlich fixierten Jahreswert benötigt
(Grundfreibetrag, Kindergeld, Mindestlohn, Rentenwert, BBG, JAEG,
Soli-Grenzen, Pfändungsfreibeträge, Tabaksteuer, D-Ticket-Preis,
Zusatzbeitrag etc.), MUSS diesen aus der entsprechenden
`lib/berechnungen/*`-Datei importieren. Hartcodierte Zahlen für solche
Werte sind verboten — auch dann, wenn sie in einem einzelnen SEO-Text
oder in einer einzelnen Berechnung stehen.

**Warum:** Die Jahresparameter-Audits Sprint 1 (April 2026) und
Jahresaudit 2026 (Prompts 86–91) haben gemeinsam in neun Rechnern
Werte gefunden, die 1–2 Jahre veraltet waren — weil sie lokal
hartkodiert waren statt aus der zentralen Lib gezogen.

**Ausnahme:** Nicht rechts-/jahresabhängige Konstanten (z. B.
„12 Monate pro Jahr", „π ≈ 3,14159") dürfen hartkodiert sein.

**Verweis:** Siehe `CLAUDE.md` Abschnitt „Zentrale Libs (SSOT)" für
die vollständige Liste und das Stichtag-Switch-Pattern.

### G11 — SSOT-Import-Pflicht (Welle-1-Audit, April 2026)

Vor jedem Rechner-Bau prüfen und konsumieren — niemals duplizieren:

- ESt? → `berechneEStGrund(zvE, jahr)` aus `einkommensteuer.ts`
- Soli? → `berechneSoli(est, splittingtarif, jahr)` (mit Milderungszone)
- Kirchensteuer? → `berechneKirchensteuerByBundesland(est, bundesland)`
- Rentenwert? → `getAktuellerRentenwert()` aus `rente.ts` (Stichtag-Switch)
- BBG? → `BBG_RV_MONAT` / `BBG_KV_MONAT` aus `brutto-netto.ts`
- Kindergeld / Kinderfreibetrag? → Konstanten + Logik aus `kindergeld.ts`
  (`KIFB_GESAMT_ZUSAMMEN_2026` = 9.756 €, `KIFB_GESAMT_EINZEL_2026` = 4.878 €)
- Pfändungstabelle? → `pfaendung.ts`
- Mindestlohn? → `mindestlohn.ts`
- Pendlerpauschale-Satz? → `PENDLERPAUSCHALE_SATZ_2026` (= 0,38 €) aus `pendlerpauschale.ts`

Keine eigenen Zahlen-Konstanten für gesetzliche Werte. Keine eigenen
Tarif-Formeln. Jede Verletzung ist ein P1-Bug wie die im April 2026
gefundenen (Steuerklassen-Faktor, Rentenwert 39,32, Kifb 15.612,
Pendler-Staffelung 0,30/0,38).

### G12 — Keine Transform-Hover auf Karten (Prompt 96/96a)

Keine `transform`/`scale`/`translate`-basierten Hover-Effekte auf
Karten-artigen Elementen. Der Browser promotet transformierte
Elemente auf eine Compositor-Ebene und rendert Text mit Subpixel-
Antialiasing → Text-Blur während der Transition. Auch `translateY(-2px)`
ist betroffen.

**Korrekte Umsetzung:** Nutze die zentrale `.card`-Utility aus
`app/globals.css` oder eine äquivalente Shadow-only-Animation.
Elevation-Eindruck entsteht allein durch verstärkten Box-Shadow —
keine Pixel-Bewegung nötig. Siehe CLAUDE.md Abschnitt
„UI-Regeln für Rechner-Kacheln".

## Anti-Patterns aus der Audit-Welle 2026 (nicht wiederholen)

Reale Bugs, die der April-2026-Audit aufgedeckt hat. Bei jedem neuen
Rechner, der ESt/SV/Rente/Kindergeld berührt, diese Liste vor dem
Commit durchsehen.

### 🚫 Erfundener Steuerklassen-Faktor (Prompt 94)

```ts
// FALSCH (altes abfindung.ts):
const SK_FAKTOR = { 1: 1.0, 2: 0.85, 3: 0.55, 4: 1.0, 5: 1.55, 6: 1.25 };
const est = berechneEStGrund(zve, 2026) * SK_FAKTOR[steuerklasse];
```

§ 34 EStG kennt keinen Steuerklassen-Faktor. Die Fünftelregelung
wirkt auf zvE; die Steuerklasse spielt bei der ESt-Veranlagung keine
Rolle. Korrekt: bei verheiratet → Splittingtarif
(`berechneEStGrund(zvE/2, 2026) × 2`), sonst Grundtarif. Mehr nicht.

### 🚫 Hartcodierter Rentenwert (Prompt 95)

```ts
// FALSCH (alter WitwenrenteRechner):
const RENTENWERT_2026 = 39.32;  // war der Wert bis 30.06.2025!
```

Der Rentenwert ändert sich jährlich zum 01.07. Hartcodierung bedeutet
automatisch Bug nach wenigen Monaten. Immer `getAktuellerRentenwert()`
aus `rente.ts` nutzen, das Stichtag-Switch enthält.

### 🚫 Kinderfreibetrag selbst zusammenbauen (Prompt 94a)

```ts
// FALSCH (alter KindergeldRechner):
const KIFB_EINZEL = 4878;
const BEA_EINZEL = 2928;  // ← ist der ZUSAMMEN-Wert, nicht Einzel!
const KIFB_ZUSAMMEN = (KIFB_EINZEL + BEA_EINZEL) * 2;  // = 15.612, falsch
```

Korrekte Werte: `KIFB_GESAMT_ZUSAMMEN_2026 = 9.756 €`
(6.828 sächlich + 2.928 BEA), `KIFB_GESAMT_EINZEL_2026 = 4.878 €`.
Immer aus `kindergeld.ts` importieren.

### 🚫 WK+SA-Pauschale bei Zusammenveranlagung nur einmal (Prompt 94a)

```ts
// FALSCH (alter SplittingRechner):
const zveGesamt = bruttoP1 + bruttoP2 - 1266;  // nur einmal abgezogen
```

Jeder Partner mit Einkommen hat eigene WK-Pauschale (1.230 €,
§ 9a EStG) und Sonderausgabenpauschale (36 €, § 10c EStG). Auch bei
Zusammenveranlagung. Korrekt:
```ts
const zveA = bruttoP1 > 0 ? Math.max(0, bruttoP1 - 1266) : 0;
const zveB = bruttoP2 > 0 ? Math.max(0, bruttoP2 - 1266) : 0;
const zveGesamt = zveA + zveB;
```

### 🚫 Pendlerpauschale mit 2025er-Staffelung (Prompt 94a)

```ts
// FALSCH (Code bis StÄndG 2025):
const pauschale = km <= 20
  ? km * 0.30 * tage
  : (20 * 0.30 + (km - 20) * 0.38) * tage;
```

Seit StÄndG 2025 (01.01.2026): einheitlich `km * 0.38 * tage` ab dem
ersten Kilometer. `PENDLERPAUSCHALE_SATZ_2026` aus `pendlerpauschale.ts`.

### 🚫 Soli ohne Milderungszone (Prompt 94/95)

```ts
// FALSCH:
const soli = est > 20350 ? est * 0.055 : 0;  // harter Sprung an Freigrenze
```

Korrekt ist der gleitende Übergang in der Milderungszone
(20.350 – 37.838 € ESt). `berechneSoli(est, splittingtarif, jahr)` aus
`einkommensteuer.ts` enthält die Milderungszone und die doppelte
Freigrenze (40.700 €) bei Splittingtarif bereits.

### 🚫 `transform: scale()` oder `translate()` beim Hover auf Karten (Prompt 96/96a)

```css
/* FALSCH: */
.rechner-kachel:hover { transform: scale(1.05); }
.rechner-kachel:hover { transform: translateY(-3px); }
```

Beide erzeugen Subpixel-Antialiasing während der Transition →
Text verschwimmt. Nutze die zentrale `.card`-Klasse aus
`app/globals.css` oder reine Shadow-Animation ohne Transform.

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
- Clamping vergessen — `min="0" max="10"` im HTML reicht nicht, onChange-Handler muss aktiv klammern
- Smoketest v3 nach Änderung nicht ausgeführt — auch bei scheinbar harmlosen Eingriffen
- Tarif-Parameter hartkodiert statt über zentrale Lib (siehe Abschnitt "Referenz-Werkzeuge")
- PV-Kinderabschlag mit Kinderfreibeträgen verwechselt — zwei getrennte Konzepte (§ 55 Abs. 3 SGB XI vs. § 32 EStG)
- Controlled/uncontrolled Inputs vermischt — clamping funktioniert nur mit `value={state}`, nicht mit `defaultValue`

## Referenz-Werkzeuge

Für Finanz- und Steuer-Rechner immer gegen diese externen Referenzen prüfen:

- **BMF-Steuerrechner** (amtlich): `https://www.bmf-steuerrechner.de/ekst/` — Einkommensteuer-Tarif, Lohnsteuer nach §39b PAP
- **Finanz-Tools Formeln**: `https://www.finanz-tools.de/einkommensteuer/berechnung-formeln/2026` — Tarifzonen, Koeffizienten
- **BMF Änderungen 2026**: `https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/das-aendert-sich-2026.html`
- **Gesetze im Internet**: `https://www.gesetze-im-internet.de/estg/__32a.html` (ESt-Tarif), `https://www.sozialgesetzbuch-sgb.de/sgbxi/55.html` (PV-Beiträge)

## Zentrale Libs (nicht duplizieren)

Tarif-, SV-, Unterhalts-, Mindestlohn-, Renten- und Pfändungs-Rechner dürfen Parameter nicht hartkodieren, sondern nutzen die zentralen Libs. Die vollständige Tabelle mit Exports steht in `CLAUDE.md` unter „Zentrale Libs (SSOT)". Kurzliste der wichtigsten:

- `lib/berechnungen/einkommensteuer.ts` — § 32a EStG Tarifzonen 2024/2025/2026, Grundfreibeträge, Soli-Freigrenzen
- `lib/berechnungen/lohnsteuer.ts` — Vorsorgepauschale § 39b Abs. 4 EStG PAP-konform
- `lib/berechnungen/brutto-netto.ts` — BBG (`BBG_KV_MONAT`, `BBG_RV_MONAT`), orchestriert LSt + SV + PV zum Netto
- `lib/berechnungen/sv-parameter.ts` — KV-Zusatzbeitrag, JAEG (`JAEG_2026_JAHR`/`_MONAT`)
- `lib/berechnungen/pflegeversicherung.ts` — PV-AN-Satz, Kinderlos-Zuschlag, Kinderabschlag § 55 Abs. 3 SGB XI (PUEG 2023)
- `lib/berechnungen/kindergeld.ts` — Kindergeld + Günstigerprüfung (`KINDERGELD_2026 = 259`)
- `lib/berechnungen/duesseldorfer-tabelle.ts` — DT 2026, Mindestbedarf, Selbstbehalte
- `lib/berechnungen/mindestlohn.ts` **(neu, 04/2026)** — `MINDESTLOHN`, `getAktuellerMindestlohn(stichtag)`, Switch auf 14,60 € zum 01.01.2027
- `lib/berechnungen/rente.ts` **(erweitert, 04/2026)** — `RENTENWERT`, `getAktuellerRentenwert(stichtag)`, Switch 40,79 → 42,52 € zum 01.07.2026
- `lib/berechnungen/pfaendung.ts` **(erweitert, 04/2026)** — `getAktuellePfaendungsParameter(stichtag)`, Switch 1.555,00 → 1.587,40 € zum 01.07.2026 (BGBl. 2026 I Nr. 80)

Die drei Tarif-Rechner (Brutto-Netto, Lohnsteuer, Einkommensteuer) sind eine **Rechner-Gruppe** mit geteilter Logik. Änderungen an zentralen Parametern wirken auf alle drei. Siehe auch G10 (keine Dubletten zentraler Werte).

## Skill-Synchronisation

Dieser Skill existiert in zwei Kopien:

1. **Repo (maßgeblich):** `.claude/skills/rechner-builder/SKILL.md` — diese Datei, gepflegt von Claude Code
2. **claude.ai Skills-UI:** Menü oben links → Einstellungen → Skills → rechner-builder → Bearbeiten

Die claude.ai-Kopie wird von Claude-Chat-Instanzen beim Trigger geladen (nicht als lokale Datei auf Disk, sondern cloud-basiert). Nach einem Update der Repo-Version muss der Inhalt **manuell** in die claude.ai-UI übertragen werden:

1. Vollständigen Inhalt dieser Datei kopieren (ohne YAML-Frontmatter falls vorhanden)
2. In claude.ai → Einstellungen → Skills → rechner-builder → Bearbeiten öffnen
3. Gesamten Inhalt dort ersetzen
4. Speichern
5. Laufende Claude-Chat-Session neu starten, damit der frische Skill geladen wird

Ohne diesen Schritt geben Claude-Chat und Claude-Code inkonsistente Ratschläge (Chat arbeitet mit veralteter Skill-Version).

**Sync-Protokoll:**

| Datum | Änderung | claude.ai synchronisiert? |
|---|---|---|
| 19.04.2026 | Prompt 92: Guard G10, Stichtag-Switch-Step, SSOT-Referenzen | [ ] noch offen |
| 19.04.2026 | Prompt 92a: Sync-Sektion auf claude.ai-UI-Workflow umgestellt | [ ] noch offen |
| 19.04.2026 | Prompt 97: Guards G11 (SSOT-Imports) + G12 (kein Transform-Hover), Step 11b SSOT-Import-Audit, Anti-Patterns-Abschnitt aus Welle-1-Audit | [ ] noch offen |
