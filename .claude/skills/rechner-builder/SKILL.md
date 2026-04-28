---
name: rechner-builder
description: Template and checklist for building standardized online calculators (Rechner) for rechenfix.de. Use this skill whenever creating a new calculator/Rechner page, adding a calculator to the site, or when the user mentions building, creating, or adding a Rechner for rechenfix.de. Also trigger when the user says "neuer Rechner", "Rechner erstellen", "Rechner bauen", or references the rechenfix project. This ensures every calculator is consistent, complete, and SEO-optimized with all required features (KI-Erklärung, Share, Copy, Feedback, Schema.org, etc.).
---

# Rechner Builder für rechenfix.de

Build standardized, SEO-optimized calculator pages for the German calculator portal rechenfix.de. Every calculator must follow this template to ensure consistency, completeness, and maximum SEO impact.

**Aktueller Stand (28.04.2026):** 170 Rechner in 9 Kategorien (Alltag 23, Finanzen **45**, Gesundheit 17, Auto & Verkehr 11, Wohnen & Energie 25, Mathe & Schule 18, Arbeit & Recht **17**, Kochen & Ernährung 12, Sport & Fitness 2). **Welle-Status:** Welle 1 ✅ komplett; **Welle 2 KOMPLETT abgeschlossen 26.04.2026** — Stufe 1 Auto (130–132.6), Stufe 2 Gesundheit (140–144b), Stufe 3 Wohnen (147–148c), Stufe 3 Arbeit (Block A 149a-d + 150a-d, Block B 152a + 153a/b/b-fix + 153c Lib-Audit). **Welle 3 7/9 abgeschlossen (28.04.2026):** ✅ 152b feiertage.ts SSOT, ✅ 154 LazySection-Removal (AdSense-Trigger), ✅ 155 /ueber-uns ausgebaut, ✅ 156 /qualitaet neu, ✅ 151 Block-A-P3-Sammelbatch (17 Items in 5 atomaren Konfig-Commits), ✅ 150e Süd-OLG-UI-Toggle ehegattenunterhalt, ✅ P3-B1 ueberstunden-Netto-Refactor (Commit 7c2426b). **Welle-3-Backlog (offen):** 151-Sammelrest (~25 nicht-priorisierte P3), Validation-Sweep. **Affiliate:** 12 Programme inkl. CosmosDirekt (Awin 11893); 117 AffiliateBox-Aufrufe in 73 Dateien. **AdSense** live seit 20.04.2026 (Publisher-ID `pub-1389746597486587`); erste Prüfung 27.04.2026 negativ („Minderwertige Inhalte"), Drei-Maßnahmen-Sprint 154+155+156 als Reaktion. Vollständige Welle-Historie + Welle-3-Backlog mit Detailspecs: [docs/audit-arbeitspapiere/welle-status-historie.md](../../docs/audit-arbeitspapiere/welle-status-historie.md).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel
- **AI:** Anthropic Claude API (for "Fix erklärt" feature)
- **Domain:** https://www.rechenfix.de (ALWAYS use www)

## URL-Slug-Konvention

Slug-Format orientiert sich an der Duden-Schreibweise des Begriffs, nicht an
einer mechanischen Regel. Beide Muster kommen im Bestand vor und sind
SEO-etabliert (Stand 23.04.2026: 178 Rechner-URLs, ~130 Bindestrich,
~27 Einwort, 7 Umrechner).

### Display-Name vs. URL-Slug

Display-Name (H1, Title-Tag, Mega-Menü, Config-Label) und URL-Slug sind
zwei **unabhängige Artefakte** mit eigenen Regeln:

- **Display-Name folgt Duden-Logik:** deutsche Komposita typischerweise
  zusammengeschrieben — „Stundenlohnrechner", „Heizkostenrechner",
  „Körperfettrechner", „Firmenwagenrechner". Liest sich im Menü und in
  Überschriften natürlich.
- **URL-Slug folgt SEO-Lesbarkeits-Konvention:** Bindestrich trennt
  Wortstämme visuell — `stundenlohn-rechner`, `heizkosten-rechner`,
  `koerperfett-rechner`, `firmenwagen-rechner`. Google behandelt beide
  Varianten praktisch äquivalent (deutsche Komposita werden ohnehin als
  zusammengehörig erkannt); der Bindestrich ist primär für menschliche
  Lesbarkeit.

**Abweichungen zwischen Display-Name und Slug sind kein Bug.** Im Bestand
gibt es rund zehn Fälle mit Einwort-Display und Bindestrich-Slug — das ist
so gewollt, nicht zu korrigieren.

#### Keine Slug-Umbenennung zur bloßen Angleichung an den Display-Namen

URL-Stabilität geht vor typografischer Konsistenz. Jede Slug-Änderung

- kappt PageRank-Flow von Backlinks (auch per 301 nur teilweise kompensiert),
- verwirrt die Google Search Console (GSC muss neu lernen),
- erfordert 301-Redirect + Sitemap-Flush + interne Link-Updates,
- bringt kein messbares SEO-Plus.

Gründe für eine Slug-Änderung müssen **inhaltlich** sein — z. B. Kategorie-
wechsel (vgl. Prompt 126, Firmenwagen von `/finanzen/` nach `/auto/`) —
nicht typografisch. Reine „jetzt konsistent mit Display-Namen"-Umbenennungen
werden vermieden.

### Regeln

**Einfaches Kompositum aus 2 Wortstämmen → zusammen (Einwort):**
- `rentenrechner`, `zinsrechner`, `mietrechner`, `kreditrechner`,
  `kalorienrechner`, `promillerechner`, `unterhaltsrechner`
- Faustregel: Wenn das Wort im Duden als ein Wort steht → zusammenschreiben.

**Abkürzung oder Anglizismus im Stamm → Bindestrich:**
- `afa-rechner`, `bmi-rechner`, `ggt-kgv-rechner`, `kfz-steuer-rechner`,
  `etf-sparplanrechner` (Ausnahme: „Sparplan" als ein Wort dran)

**3+ Wortstämme oder zwei eigenständige Fachbegriffe → Bindestrich:**
- `erbschaftsteuer-rechner`, `grunderwerbsteuer-rechner`,
  `brutto-netto-rechner`, `herzfrequenz-zonen-rechner`,
  `freelancer-stundensatz-rechner`, `firmenwagen-rechner`

**Umrechner-Sub-Klasse → immer Bindestrich vor „umrechner":**
- `hefe-umrechner`, `cups-umrechner`, `kw-ps-umrechner`, `einheiten-umrechner`

### Im Zweifel

1. Duden online (`duden.de`) prüfen, ob das Kompositum als ein Wort geführt ist.
2. Etablierte Einwort-Form vorhanden → zusammen.
3. Duden empfiehlt Bindestrich bei Unübersichtlichkeit → Bindestrich.
4. Kein klarer Duden-Eintrag → am nächstliegenden Bestands-Slug orientieren
   (`grep -rn "slug:" lib/rechner-config/`).

### Anti-Pattern

- **Historische Slugs nicht rückwirkend migrieren.** Backlinks, Rankings,
  GSC-Historie gehen verloren bzw. müssen aufwendig per 301 überführt werden.
  Lektion aus Prompt 126: selbst bei einem einzigen Slug-Wechsel waren
  atomare Commits + Redirect + Intro-Text-Update nötig.
- **Mechanische „alle mit Bindestrich"-Regel vermeiden.** Würde aus
  `rentenrechner` ein unnatürliches `rente-n-rechner` machen.
- **URL-Slug ≠ Komponenten-Dateiname.** Dateiname folgt PascalCase
  (`RentenRechner.tsx`), Slug folgt Duden-Logik.

### Hartkodierte URLs gegen SSOT prüfen (Prebuild-Hook seit 132.6)

Jede hartkodierte URL (CrossLink-`href`, Markdown-Link, `Link`-Komponente,
FAQ-Text) gegen die SSOT in `lib/rechner-config/<kategorie>.ts` prüfen,
nicht aus der Display-Name-Erwartung ableiten. Häufige Verwechslungen:

- `promillerechner` → `/arbeit/` (nicht `/gesundheit/` oder `/alltag/`)
- `stundenlohn-rechner` → `/finanzen/` (nicht `/arbeit/`)
- `einheiten-umrechner` → `/mathe/` (nicht `/alltag/`)
- `unterhaltsrechner` → `/arbeit/` (nicht `/finanzen/`)

Der Prebuild-Hook [scripts/slug-drift-scan.mjs](../../scripts/slug-drift-scan.mjs)
bricht den Build bei jedem nicht-whitelisted Drift ab — aber eine
Verify-im-Kopf-Runde vor dem Commit spart den Build-Break. Ad-hoc-Prüfung:
`npm run lint:slugs`.

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
- [ ] **Guards G1–G14 geprüft** (siehe Abschnitt „Qualitäts-Guards" in diesem Skill)
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

**Seit Prompt 99c kennt das Lint-Script einen `contextKeywords`-Mechanismus**
für generische Werte (z. B. `1230` WK-Pauschale, `20350` Soli-Freigrenze):
Treffer werden nur gemeldet, wenn in ±2 Zeilen um den Fund eines der
Keywords (case-insensitive) vorkommt — False Positives bei Layout-
oder zufälligen Zahlenwerten sind damit ausgeschlossen.

Seit Prompt 101 sind die Soli-Freigrenzen (20350 / 37838 / 40700) mit
Keywords (soli / solidarit / milderung / freigrenze / solz / splitting /
zusammen) aufgenommen. Der Soli-ohne-Milderungszone-Bug wird damit
automatisch gefunden, falls er ein sechstes Mal auftritt.

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
- `lib/berechnungen/bafoeg-parameter.ts` — single-bucket mit Skeleton für WS 2026/27-Erhöhung (Prompt 121)
- `lib/berechnungen/buergergeld-parameter.ts` — zwei Buckets H1/H2 für 01.07.2026 „Neue Grundsicherung" (H2 derzeit identisch zu H1 als Skeleton bis Gesetzestext)

### SSOT-Parameter-Lib-Muster (Prompt 121)

Parameter-Libs folgen einem einheitlichen **Typ-Interface + Bucket + Getter**-Muster:

```ts
// lib/berechnungen/<thema>-parameter.ts
export interface XxxParameter {
  regelsaetze: { alleinstehend: number; /* ... */ };
  freibetraege: { /* ... */ };
  quelle: string;
  gueltigAb: Date;
}

export const XXX_AB_2024_08_01: XxxParameter = {
  regelsaetze: { alleinstehend: 563, /* ... */ },
  freibetraege: { /* ... */ },
  quelle: '§ 20 SGB II i.d.F. …',
  gueltigAb: new Date('2024-08-01'),
};

export function getAktuelleXxxParameter(stichtag: Date = new Date()): XxxParameter {
  void stichtag; // single-bucket, reserviert für künftigen Switch
  return XXX_AB_2024_08_01;
}
```

**Regeln:**
- Rechner-Komponenten und andere Libs importieren ausschließlich über `getAktuelleXxxParameter()`, niemals direkt aus den Bucket-Konstanten
- Bei jedem neuen unterjährigen Wechsel einen neuen Bucket ergänzen + Switch-Datum im Getter einbauen
- `gueltigAb` auf der Konstante dokumentiert, ab wann der Bucket rechtlich greift
- `quelle` nennt Paragrafen + BGBl.-Referenz, damit der Audit die Herkunft nachvollziehen kann

### Step 13: Qualitäts-Guards G1–G14 durchgehen

Bevor ein Rechner committed wird, die vierzehn Guards unten im Abschnitt
„Qualitäts-Guards (aus Rezept-Umrechner-Audit, April 2026)" abarbeiten.
Wo ein Guard nicht zutrifft (z. B. G5 ohne Einheiten-Output), das in der
Code-Review-Notiz kurz begründen. G10 (keine Dubletten zentraler Werte)
ist nach dem Jahresaudit 2026 hinzugekommen — besonders wichtig für
Finanz-, SV- und Arbeits-Rechner. G11–G14 aus der Welle-1-Audit-Serie
und Prompt 107b (Footer-Architektur).

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

### G13 — Differenz-Methode für Steuer-/Soli-Ersparnis (Prompt 100)

Bei Rechnern, die Steuerersparnis aus Absetzungen schätzen
(Spenden, Werbungskosten, Altersvorsorge): Immer Differenz-Methode
nutzen — nie pauschal `ersparnis * 0.055`:

```ts
// FALSCH (ignoriert Soli-Freigrenze):
const soliErsparnis = estErsparnis * 0.055;

// RICHTIG (berücksichtigt Freigrenze + Milderungszone):
const soliVoll = berechneSoli(estVoll, splitting, 2026);
const soliNachAbzug = berechneSoli(estNachAbzug, splitting, 2026);
const soliErsparnis = soliVoll - soliNachAbzug;
```

Dieselbe Logik gilt für KiSt:
`berechneKirchensteuerByBundesland(estVoll, bundesland) − berechneKirchensteuerByBundesland(estNachAbzug, bundesland)`.

Der pauschale 5,5 %-Ansatz überschätzt die Ersparnis systematisch,
wenn zvE vor oder nach Abzug unter die Soli-Freigrenze rutscht
(Prompt 100: ~200 €/Jahr Überschätzung bei typischen Spendern
um zvE 70–80 k).

### G14 — Ein Footer, dynamische Zahlen (Prompt 107b)

Genau **eine** Footer-Komponente site-weit: [components/layout/Footer.tsx](components/layout/Footer.tsx). Keine zweite Footer-Komponente anlegen (z. B. für Landing-Pages, Admin-Bereiche oder Rechner-Subseiten).

Rechner- und Kategorie-Zahlen im Footer werden **dynamisch** aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) berechnet — niemals hartcodieren:

```tsx
// RICHTIG:
{rechner.length} Rechner in {kategorien.length} Kategorien

// FALSCH (veraltet, sobald ein Rechner dazukommt):
169 Rechner in 9 Kategorien
```

Das Lint-Script `npm run lint:footer` prüft beides automatisch:
- `footer-uniqueness`: genau 1 Footer-Datei in `{app,components}/**/*Footer*.{ts,tsx}`
- `footer-hardcoded-count`: Regex `\b\d{2,4}\s+Rechner\s+(in|pro)\s+\d+\s+Kategorien?\b` im Footer-Content → Fehler

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

### 🚫 Eigene Pendlerpauschale-Kopie (Prompt 100)

```ts
// FALSCH (aus altem steuererstattung.ts):
function berechnePendlerpauschale(km: number, tage: number) {
  const ersteZwanzig = Math.min(km, 20) * 0.30 * tage;
  const abKm21 = km > 20 ? (km - 20) * 0.38 * tage : 0;
  return ersteZwanzig + abKm21;
}
```

Pendlerpauschale ist seit StÄndG 2025 einheitlich **0,38 €/km ab 1. Kilometer**.
Die alte Staffelung wurde in `pendlerpauschale.ts` korrekt gefixt (Prompt 94a),
aber das Duplikat in `steuererstattung.ts` blieb stehen — führte zu **−352 €/Jahr WK**
bei einem typischen Pendler mit 30 km × 220 Tagen. Immer aus `pendlerpauschale.ts`
importieren (`PENDLERPAUSCHALE_SATZ_2026` oder `berechnePendlerpauschale`).

### 🚫 Hartkodierte Tarif-Schwellen ohne Jahr-Parameter (Prompt 100)

```ts
// FALSCH (aus altem steuererstattung.ts — die Werte sind 2025er!):
if (zvE < 12084) return 0;           // 2025er Grundfreibetrag
if (zvE < 17005) return tarif2(zvE); // 2025er Zone-2-Grenze
if (zvE < 66760) return tarif3(zvE); // 2025er Zone-3-Grenze
```

Die Grenzen werden jährlich angepasst (Inflationsausgleichsgesetz). Harte Werte
ohne Jahr-Bezug werden nach dem Jahreswechsel unbemerkt falsch.
Immer `berechneEStGrund(zvE, 2026)` aus `einkommensteuer.ts`.

### 🚫 Soli-Ersparnis pauschal als 5,5 % der ESt-Ersparnis (Prompt 100)

```ts
// FALSCH (aus altem spenden.ts):
const soliErsparnis = estErsparnis * 0.055;
```

Ignoriert, dass bei Jahres-ESt unter 20.350 € gar kein Soli anfällt — der Effekt
kann komplett ausbleiben oder nur teilweise wirken. Bei Spendern mit zvE knapp
über 20.350 € überschätzt der pauschale Ansatz die Ersparnis um ~200 €/Jahr.

Immer Differenz-Methode (siehe Guard G13 und CLAUDE.md → SSOT-Patterns).

### 🚫 BBG-Hardcodes außerhalb der zentralen Lib (Prompt 99b / 100 / 101)

```ts
// FALSCH (aus altem nebenjob.ts, GmbhGfRechner.tsx, steuerklassen-vergleich.ts):
const BBG_KV = 5812.5;
const BBG_RV = 8450;
```

BBG-Werte ändern sich jährlich via SV-Rechengrößenverordnung. Aus
`brutto-netto.ts` importieren (`BBG_KV_MONAT`, `BBG_RV_MONAT`).

**Bekannte Ausnahme:** `lohnsteuer.ts` behält BBG inline (zirkulärer Import mit
`brutto-netto.ts`) — dokumentiert in CLAUDE.md → Architektur-Notes. Lint-Script
schützt über forbiddenValues-Einträge.

### 🚫 Grundfreibetrag oder WK-Pauschale inline (Prompt 101)

```ts
// FALSCH:
if (zvE <= 12348) return 0;
const wkAbzug = Math.min(brutto, 1230);
```

Immer die SSOT-Konstanten `GRUNDFREIBETRAG_2026` und `WK_PAUSCHALE_AN_2026`
aus `einkommensteuer.ts`. Inline-Werte bleiben beim Jahreswechsel stehen
(G11 deckt das ab, hier nur als Merk-Anker).

### 🚫 Backtick-Falle in Template-Literal-Erklärtexten (Prompt 149b, 26.04.2026)

```ts
// FALSCH (in lib/rechner-config/<kat>.ts):
erklaerung: `…wird wie folgt berechnet: `getVpi(jahr)` aus vpi.ts.…`,
//                                       ^^^^^^^^^^^^^^^^
//                                       Inline-Code-Backticks schließen
//                                       das umgebende Template-Literal!
```

Das löst beim Build einen esbuild-Fehler aus
(`ERROR: Expected "}" but found "..."`). Die `formel`/`beispiel`/`erklaerung`/
`faq`-Felder in `lib/rechner-config/<kat>.ts` sind selbst Template-Literals
mit Backticks — Inline-Code-Backticks darin müssen vermieden werden.

**Korrekt:** Klartext oder typografische Apostrophe verwenden:

```ts
// RICHTIG:
erklaerung: `…wird wie folgt berechnet: getVpi(jahr) aus vpi.ts.…`,
// oder mit typografischen Anführungszeichen:
erklaerung: `…Faktor = VPI(End) / VPI(Heirat).…`,
```

Bei Code-Beispielen, die unbedingt monospace dargestellt werden müssen:
ggf. das ganze Feld vom Template-Literal auf einen normalen String mit
`'…'` umstellen — dann sind Backticks im Inhalt erlaubt. In der Praxis
ist Klartext aber meist ausreichend, weil die Anzeige im Browser ohnehin
über einen Markdown-Renderer oder Plain-Text läuft.

### 🚫 Slug-Drift in Kategorie-Datei (Prompt 149a, 26.04.2026)

```ts
// FALSCH (in lib/rechner-config/arbeit.ts):
{
  slug: 'arbeitslosengeld-rechner',
  kategorie: 'Finanzen',          // ← stimmt nicht mit Datei überein
  kategorieSlug: 'finanzen',      // ← stimmt nicht mit Datei überein
  …
}
```

Ein Eintrag in `arbeit.ts` muss `kategorie: 'Arbeit & Recht'` und
`kategorieSlug: 'arbeit'` haben. Sonst wird die SSOT-Eigenschaft pro
Kategorie-Datei verletzt — der Eintrag landet in der falschen Sidebar,
Footer-Counts werden falsch, hartkodierte URLs (CrossLinks, Markdown-
Links in Erklärtexten) zeigen auf nicht-existierende Pfade.

**Korrekt:** Eintrag in die zur Kategorie-Slug passende Datei migrieren
(siehe Prompt 149a für Beispiel: arbeitslosengeld-rechner aus
arbeit.ts → finanzen.ts). Slug-Drift-Scan (Prebuild-Hook seit 132.6)
fängt Folge-Effekte (hartkodierte CrossLinks auf alten Pfad) ab, aber
das Konfig-Drift selbst kann er nicht entdecken — Audit-Disziplin nötig.

### 🚫 Phantom-Befund-Diagnose ohne Code-Inspektion (149-Lehre, 26.04.2026)

Audit-Befunde, die aus Screenshots oder visueller Intuition stammen,
ohne dass der Code geprüft wurde, können falsch sein. Beispiel aus
Welle 2 Stufe 3 PV: Audit behauptete „bei Wechsel Süd → Nord ändert
sich kWp-Default automatisch von 8,8 auf 7,3" — Code-Inspektion
zeigte: `kwpAuto = dach / 5,5` ist ausrichtungsunabhängig, der Befund
war Phantom.

**Regel:** Vor dem Fix den Code lesen und gegen den Audit-Befund
abgleichen. Bei Diskrepanz STOP und Karsten zeigen — nicht „Phantom-
Bugs" mit No-Op-Commits dokumentieren.

### 🚫 Test-Soll-Werte gegen UI-Anzeige rechnen (149b-Lehre)

UI-Anzeige rundet (z. B. „21.083,80 € → 21.084 €" via `Math.round`).
Verify-Tests müssen gegen die unverrundete Berechnung prüfen, sonst
schlagen sie an Floating-Point-Drift fehl. Beispiel: 8,8 × 950 × 0,65
= 4.861,99... → `Math.round` = 4.862 (nicht 4.866 oder 4.861).

**Regel:** Im Verify-Script den Soll-Wert exakt durchrechnen und mit
der Lib-Logik (inkl. Math.round/floor/ceil) abgleichen. Bei Tol-Werten
mindestens 1 Cent für Floating-Point-Drift einplanen, aber nie
„auf den Test-Output anpassen" — das ist verbotenes Test-Adjusting
gegen die Berechnungs-Wahrheit (siehe Prompt 120a Lehre).

### 🚫 Content-Sektionen in client-only Lazy-Wrapper (Lehre 26 aus Prompt 154, 27.04.2026)

```tsx
// FALSCH (in app/[kategorie]/[rechner]/page.tsx):
<LazySection className="no-print">
  <section className="card …">
    <h2>So funktioniert der {config.titel}</h2>
    {/* Erklärtext + FAQ — wird bei SSR nur als leeres Placeholder-div gerendert */}
  </section>
</LazySection>
```

`<LazySection>` und ähnliche `'use client'`-Wrapper mit IntersectionObserver
liefern bei SSR nur ein leeres 200-px-Placeholder-`<div>`. Der Content
erscheint erst nach Hydration + Scroll-Trigger im Client-Render. Der
**AdSense-Crawler bewertet primär SSR-HTML** und sieht den Erklärtext + FAQ
deshalb nie — Konsequenz: Bewertung als „Minderwertige Inhalte"
(Ablehnung 27.04.2026, Sprint 154+155+156 als Reaktion).

**Regel:** Erklärtext, FAQ, Disclaimer, Quellenangaben oder andere für
Crawler relevante Text-Sektionen rendern **eager im SSR**. Lazy-Loading
bleibt nur für Bilder, Iframes oder schwere interaktive Components mit
echtem Interactivity-Cost legitim. SSR-Sichtbarkeit für Content-Sektionen
hat Vorrang vor jeder Performance-Mikro-Optimierung.

```tsx
// RICHTIG:
<>
  <section className="card … no-print">
    <h2>So funktioniert der {config.titel}</h2>
    {/* Erklärtext eager rendered, im SSR sichtbar */}
  </section>
  <section className="card … no-print">
    <h2>Häufige Fragen</h2>
    {/* FAQ eager rendered */}
  </section>
</>
```

### 🚫 Klasse auf Wrapper statt auf direkte Kinder (Lehre 27 aus Prompt 154, 27.04.2026)

```tsx
// FALSCH — beim Wrapper-Removal die no-print-Klasse einfach gestrichen:
- <LazySection className="no-print">
+ <>
    <section className="card …">
      …
    </section>
+ </>
```

Beim Entfernen einer Wrapper-Komponente, die nur ein `className` durchreicht
(z. B. `no-print`, `aria-hidden`, semantische Wrapper-Klassen), die Klasse
auf alle direkt umschlossenen Kinder migrieren — **nicht ersatzlos
streichen**. Sonst ändert sich Druck-Verhalten, A11y-Sichtbarkeit oder
Print-Layout unbeabsichtigt.

```tsx
// RICHTIG:
- <LazySection className="no-print">
-   <section className="card …">
+ <>
+   <section className="card … no-print">
      …
    </section>
+ </>
```

### 🚫 `new Date()` auf Modul-Ebene in `'use client'`-Components (Lehre 24 aus Prompt 152b, 27.04.2026)

```tsx
// FALSCH (Modul-Scope eines 'use client'-Components):
'use client';

const JAHR_OPTIONEN = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 2 + i));
//                                                          ^^^^^^^^^^
//                                                          Server-Build-Output kann sich
//                                                          zwischen 23:59 und 00:01 verschieben
//                                                          → Hydration-Mismatch im Client
```

Year-Dropdowns und ähnliche Auswahllisten in `'use client'`-Components als
**statische Konstante** im Modul-Scope definieren. `new Date()` zur Laufzeit
auf Modul-Ebene erzeugt Hydration-Mismatch zwischen SSR-Build-Output und
Client-Render (Jahresgrenze, Zeitzonen-Drift). Wartungsaufwand „alle
4–7 Jahre Konstanten-Bump" ist akzeptabel; Hydration-Bugs sind es nicht.

```tsx
// RICHTIG:
'use client';

const JAHR_OPTIONEN = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
// Wartung: nächster Bump ~2030 (oder im jahreswerte-kalender.md eintragen).
```

Ausnahme: In **Berechnungs-Libs** (kein `'use client'`, server- oder
testbar) ist `new Date().getFullYear()` als Default für mathematisch-
deterministische Werte (z. B. `anzahlBundesweiterFeiertageMoBisFr(jahr)`)
zulässig — siehe Lehre 23.

### 🚫 Stichtag-Wert als dynamischer Lookup verkleidet (Lehre 23 aus Prompt 152b, 27.04.2026)

Die zwei Default-Strategien für jahresabhängige Werte sauber trennen:

| Wertart | Default | Beispiele |
|---|---|---|
| **Stichtag-Wert** (legislativ/extern entschieden) | Stichtag-Konstante mit Quelle + Wechseldatum, Switch über `getAktuelle…(stichtag)` | Mindestlohn (`mindestlohn.ts`), Rentenwert (`rente.ts`), Pfändungsfreigrenze (`pfaendung.ts`), Bürgergeld-Regelsätze, BAföG-Sätze |
| **Berechenbarer Wert** (mathematische Funktion des Jahres) | Dynamisch `new Date().getFullYear()` mit Test-Override-Möglichkeit | Anzahl Mo-Fr-Feiertage, Ostersonntag (Spencer-Formel), Indexierungs-Faktor aus VPI |

**Faustregel:** Stichtag, wenn der Wert sich an einem konkreten Datum durch
externe (legislative) Entscheidung ändert. Dynamisch, wenn der Wert eine
reine Funktion des Jahres ist.

```ts
// FALSCH (legislativer Wert als dynamischer Lookup verkleidet):
export function getMindestlohn(jahr: number = new Date().getFullYear()) {
  return jahr >= 2027 ? 14.60 : 13.90;
  //   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //   Lückenhaft: keine Quelle, keine Begründung, kein Audit-Anker.
}

// RICHTIG (Stichtag-Konstante mit Switch):
// Quelle: § 1 MiLoG i.V.m. Beschluss der Mindestlohnkommission v. 26.06.2025.
const MINDESTLOHN_BIS_STICHTAG = 13.90;
const MINDESTLOHN_AB_STICHTAG = 14.60;
const SWITCH = new Date(2027, 0, 1); // 01.01.2027

export function getAktuellerMindestlohn(stichtag: Date = new Date()) {
  return stichtag >= SWITCH ? MINDESTLOHN_AB_STICHTAG : MINDESTLOHN_BIS_STICHTAG;
}
```

### 📌 Meta-Lektion: Soli ohne Milderungszone — ein Wiederholungs-Bug

Das Muster `est > 20350 ? est * 0.055 : 0` (harte Kante ohne Milderungszone)
wurde zwischen März und April 2026 **fünfmal** in unterschiedlichen Libs gefunden:
1. `ArbeitslosengeldRechner` (vor Prompt 95)
2. `GmbhGfRechner` (vor Prompt 99a)
3. `nebenjob.ts` — drei Stellen (vor Prompt 100)
4. `spenden.ts` — pauschal 5,5 % ohne Freigrenze-Check (vor Prompt 100)

Seit Prompt 101 sind die Soli-Grenzen (20350 / 37838 / 40700) im Lint-Script
(`scripts/check-jahreswerte.mjs`) mit `contextKeywords` aufgenommen — ein
sechster Auftritt wird automatisch erkannt, False Positives bei Layout-Werten
werden ausgefiltert.

**Trotzdem: Bei neuen Rechnern immer `berechneSoli(est, splitting, 2026)` nutzen,
nie eigene Schwellen-Logik.** Das Lint-Script ist Sicherheitsnetz, nicht Ersatz
für korrektes Pattern-Wissen.

## Bewährte Patterns (Kopiervorlagen)

Diese Muster sind durch den April-Audit 2026 validiert und stehen als
Kopiervorlagen bereit. Volldetails in `CLAUDE.md` → „SSOT-Patterns":

- **Splittingtarif-Toggle** → Referenz: `components/rechner/GmbhGfRechner.tsx`
- **Bundesland-Dropdown für KiSt** → Referenz: `GmbhGfRechner.tsx`, `SteuerprogressionsRechner.tsx`
- **Differenz-Methode für Steuer-/Soli-Ersparnis** → Referenz: `lib/berechnungen/spenden.ts`
- **Individuelle Pauschalen als Eingabefeld** → Referenz: PKV-Beitrag in `GmbhGfRechner.tsx`

Bei neuen Rechnern: erst prüfen, ob eines dieser Patterns zutrifft,
dann aus dem Referenz-Rechner kopieren.

## Rechner-Specific Templates

For detailed templates per calculator type, see `references/templates.md`.

## Affiliate-Platzierung (Verweis)

Affiliate-Platzierungs-Regel: thematischer Match zum Rechner erforderlich. Details, verbotene Kombinationen und aktuelle Partner-Liste (12 Programme inkl. CosmosDirekt seit Prompt 145): siehe CLAUDE.md → Abschnitt »Affiliate-Programme (Awin)«.

**Stack-Konventionen** (seit Prompt 145b, 25.04.2026):
- Max. 2–4 AffiliateBoxen pro Rechner. Erste Box `variant="full"` (Default). Ab der 4. Box `variant="compact"` (Beispiel: RentenRechner mit 4 Boxen — wiso/verivox/burdaZahn/cosmosdirekt, alle compact außer der ersten).
- **Context-Konflikte vermeiden:** Wenn ein bestehendes Programm bereits einen bestimmten Context bedient, weicht das neu hinzukommende Programm thematisch aus. Beispiel: SparRechner → verivox bedient `sparplan`, CosmosDirekt nimmt `tagesgeld`.
- **Reihenfolge im JSX:** Neue Boxen werden **nach** allen bestehenden Boxen append-ed (kein Re-Sort, keine Replacement-Edits).

### Amazon-Partner-Programm (seit Prompt 122-amazon, 22.04.2026)

Separates Partnerprogramm neben Awin. Tag-ID: **`rechenfix-21`**. Mechanik: keyword-basierte Suchlinks (keine ASINs), Consent-abhängig.

**Komponente:** `components/AmazonBox.tsx` mit Prop `keyword` (+ optional `headline`/`description`).

```tsx
import { AmazonBox } from '@/components/AmazonBox';

// Im Rechner-JSX, nach dem Ergebnisblock:
<AmazonBox
  keyword="digitale küchenwaage"
  description="Kurzer thematischer Kontextsatz."
/>
```

**Helper:** `lib/amazon-link.ts` exportiert `createAmazonSearchLink(keyword, consent)`. Tag wird nur bei erteiltem Marketing-Consent (`useCookieConsent().marketingAllowed`) angehängt.

**Regeln:**
- **Keine AmazonBox auf Gesundheit/Finanzen/Mathe** (konsistent mit Awin-Platzierungsregel)
- **Box bleibt immer sichtbar**, unabhängig vom Consent — nur der Tag wird bei fehlendem Consent weggelassen (User-Service vor Provision)
- **Werbe-Kennzeichnung „Anzeige" Pflicht** (DE-Werbekennzeichnung, in der Box oben rechts)
- **Link-Attribute:** `rel="sponsored noopener noreferrer"` und `target="_blank"`
- **Platzierung:** Unterhalb des Ergebnisblocks. Mit bestehender AffiliateBox → AmazonBox nach der letzten AffiliateBox gestapelt (nicht konkurrierend). Ohne AffiliateBox → AmazonBox vor den CrossLinks am Ende des Ergebnisbereichs.
- **Selbstbezug verboten** (Amazon-Teilnahmebedingungen) — keine Eigen-Käufe über den Tag, auch nicht im Familienumfeld

**Integration-Registry:** Vollständige Tabelle der 16 integrierten Rechner mit Keywords: [`docs/amazon-integration.md`](../../docs/amazon-integration.md).

## Audit-Lehre-Checkliste (Prompts 120d, 121-analyse, 22.04.2026)

Vor Behauptung eines Soll-Werts oder Testfall-Erwartungswerts:

1. **Niemals aus dem Gedächtnis schätzen.** Weder in Prompts noch in Code-Kommentaren noch in FAQ-Texten.
2. **Primärquelle oder externes Oracle konsultieren:**
   - Gesetze im Internet (gesetzestext-Konstanten, Frist- und Satz-Regelungen)
   - BGBl.-Anlagen (amtliche Tabellen, z. B. § 850c ZPO Pfändungstabelle, § 12 WoGG Anlage 1)
   - Offizielle Referenz-Rechner mit Oracle-Charakter:
     - BMF-Steuerrechner ([bmf-steuerrechner.de/ekst/](https://www.bmf-steuerrechner.de/ekst/)) — ESt/LSt/Soli
     - BMWSB-Wohngeldrechner — Wohngeld
     - BA-Bürgergeldrechner — SGB II Regelsätze + Mehrbedarfe
     - BMBF-BAföG-Rechner ([bafoeg-rechner.de](https://www.bafoeg-rechner.de)) — BAföG
3. **Bei Prompt-Diskrepanz:** Gesetzestext-Prüfung schlägt Prompt-Vorgabe. Dokumentieren, warum abgewichen wurde (Kommentar im Code + Prompt-Antwort).
4. **Verify-Scripts gegen externe Oracle**, niemals zirkulär Lib-gegen-Lib (Lehre aus Prompt 120a — zirkulärer Test lief 41/41 grün, obwohl die Lib-Koeffizienten seit 2022 veraltet waren).

Reale Vorfälle, die diese Regel nötig gemacht haben (alle 22.04.2026):
- FAQ-Faustregel zu Wohngeld-Einkommensgrenzen (Prompt 120d-fix)
- 3-Monats-Rückwirkungs-Annahme Wohngeld (120d-fix)
- BAföG-Schätzwert 600 € in Beispielrechnung
- BAföG-Geschwister-Anrechnungsquote 0,45 vs. korrekt 0,50 bei 0 Geschwistern (Prompt 121)
- Wohngeld § 17 Nr. 1 Schwerbehinderten-FB 125 € statt korrekt 150 €/Monat (Prompt 120a-Rollback)
- CO₂-Staffel § 9 Abs. 1 Nr. 2c KraftStG: „glatte" 2,5/3,0/3,5/4,0 €/g Delta wirkten plausibel, Gesetz hat 2,20/2,50/2,90/3,40 (Prompt 130)
- § 3d KraftStG Elektro-Befreiung: Memory erinnerte 31.12.2030 (alte Fassung), aktuell 31.12.2035 seit 8. KraftStÄndG vom 04.12.2025 (Prompt 131)

## Audit-Methodik (Welle 2 ab Prompt 130)

Für **Audit-Arbeit an bestehenden Rechnern** (nicht Neubau) gilt eine
reduzierte 4-Punkt-Methodik. Die Welle-1-7-Punkt-Methodik (Clamping,
Barrierefreiheit, Copy-Button, Smoketest, …) ist für Audits zu
umfangreich — die Infrastruktur-Punkte sind projektweit stabil und
werden über Guards G1–G14 + Prebuild-Hooks abgesichert.

**4-Punkt-Audit:**

1. **Formel/Rechtsquelle** — Gegen Primärquelle prüfen (Gesetz im
   Internet, BGBl.-Anlage, amtliche Tabelle). Regel 12 aus CLAUDE.md
   („Claudes Memory ist keine Primärquelle") besonders beachten bei
   Parametern, die nach Knowledge-Cutoff Januar 2026 geändert wurden.
2. **Input-Validierung** — Min/Max/Schritt sinnvoll, Typecheck
   korrekt, Clamping im State-Reducer (nicht nur HTML-`max`).
3. **Edge Cases** — Leere Eingabe, Division durch null, Extremwerte,
   Datumsgrenzen.
4. **SSOT-Verwendung** — Nutzt der Rechner die zentrale Lib, oder
   hartkodiert er Werte? Ist er konsistent mit anderen Rechnern?

**Ablauf:** Audit-Prompt ohne Code-Fix → Bericht unter
`docs/audit-arbeitspapiere/` mit Executive Summary (Bug-Zahlen
P1/P2/P3), Pro-Rechner-Detail-Abschnitten, SSOT-Refactor-Kandidaten,
Fix-Plan als Folge-Prompts. **Folge-Prompts** (P1-Eskalation sofort,
P2-Polish-Batch danach, P3-UX-Extras bei Gelegenheit) greifen die
Befunde auf.

**Commits auf Folge-Prompts referenzieren den Detail-Abschnitt**
(Datei:Zeile oder Abschnittstitel), nicht die Executive Summary —
Summary-Paraphrasen können fehlerhaft sein (vgl. UND-vs-ODER-Slip
in Welle 1 Stufe 4a, 5-vs-6-P2-Zählfehler in Welle 2 Stufe 1).

Gilt für Welle 2 Stufe 1 Auto (Prompt 130, abgeschlossen 23.04.2026),
Stufe 2 Gesundheit (Prompts 140–144b, abgeschlossen 25.04.2026 — 17 Rechner,
2 P1 + 9 P2 + 9 P3 alle gefixt + Feature-Add Perioden-Länge). Rechtsstand-
Parameter werden nicht in SKILL.md dupliziert — siehe `CLAUDE.md` Abschnitt
„Aktueller Rechtsstand" für verifizierte Werte.

**Verify-Script-Pattern pro Stufe:** Pro Welle-2-Stufe entstehen
stufenspezifische Verify-Scripts (`scripts/verify-<kategorie>-p1.ts`,
`-p2.ts`, `-p3.ts`), die jeweils die P1-/P2-/P3-Findings absichern.
**Alle Tests gegen externe Primärquellen** — niemals zirkulär gegen die
getestete Lib (Lehre aus Prompt 120a). Beispiel-Stufe Gesundheit: 21 Tests
in 3 Scripts (7+6+8), gegen WHO-Fact-Sheet, ESH-2023, DGE-Referenzwerte,
IOM 2009, Naegele/§ 3 MuSchG, US-Navy Hodgdon-Beckett 1984, Fitzpatrick,
Widmark 1932, NSF/Hirshkowitz 2015. Pro Folge-Prompt wird das relevante
Script grün gehalten, die anderen als Regressions-Check mitgelaufen.

**Verify-Skripte-Konvention (seit Lehre 149d, 26.04.2026):** Endung `.ts`
(NICHT `.mjs`), Aufruf via `npx tsx scripts/verify-XYZ.ts` (NICHT `node`),
Helper-Parameter explizit typisiert (z. B. `eq(name: string, ist: number,
soll: number, tol = 0.005)`). Mjs-mit-`.ts`-Suffix-im-Import scheitert
sowohl beim Loader als auch beim `next build` strict-typecheck.

**Audit-Bundle-Pattern (seit Welle 2 Stufe 3 Arbeit Block B, 26.04.2026):**
Bei Audits mit vielen Files (>5) ist ein vorgeneriertes Bundle in
`docs/audit-bundles/<thema>.md` mit allen relevanten Datei-Inhalten als
Code-Blöcke effizienter als URL-Listen pro Datei. **Eine** `web_fetch`-URL
→ **alle** Files in einem Aufruf.

- **Generator-Skript:** `scripts/build-audit-bundle.ts` (TypeScript, NICHT `.mjs`!)
- **CLI:** `npm run audit:bundle <name>`
- **Bundle-Definitionen:** `scripts/audit-bundles.ts` (zentrale Liste mit File-Pfaden pro Bundle-Name)
- **Pflicht-Parameter** bei Bundles >100 KB: `text_content_token_limit: 300000` — Default reicht nicht und schneidet ohne sichtbare Warnung mitten im Inhalt ab
- **Lib-Audit als Folge-Bundle abhängbar**, wenn Component+Konfig+Beispiel-Trio Konsistenz erlaubt — Beispiel-Werte aus dem Konfig-`beispiel`-Feld manuell nachrechnen reicht oft für indirekte Lib-Verifikation
- **Beispiele aus 26.04.:** `block-b-arbeit` (149 KB, 13 Files), `block-b-libs` (16 KB, 5 Libs) — beide vollständig im Audit verarbeitet
- **Methodik-Lehre 20** (CLAUDE.md → Gelernte Regeln): Audit-Bundle-Pattern via konsolidierte MD-Datei

**Wert-Recherche durch Claude im Web (seit Lehre 22, 26.04.2026):** Bei
Werten, die durch Web-Suche eindeutig recherchierbar sind (Mieterbund
Betriebskostenspiegel, BMF-Tabellen, Destatis, BDEW, Bundesnetzagentur,
Stiftung Warentest), kann Claude die Recherche direkt durchführen statt
auf Karsten zu warten. **Pflicht:** (1) Aktualität-Hinweis im Quellen-
Verweis, (2) zwei unabhängige Sekundärquellen für Konsistenz-Check, (3)
Repo-Stand vor Patch-Generierung lesen. **URL-Permission-Workflow:**
`web_fetch`-Permissions blockieren Pattern-Konstruktion auf URLs ohne
User-Klartext-Freigabe — Karsten muss neue URLs als Klartext im Chat
pasten, Screenshot-OCR aus Bildern zählt nicht.

## Wellbeing-sensible Rechner — Patterns (Welle 2 Stufe 2 Gesundheit, 25.04.2026)

Templates aus dem Gesundheits-Audit, die als Kopiervorlage für künftige
sensible Rechner (Eating-Disorder, Schwangerschaft/Verhütung, Kinder-/
Jugend-Werte, Suchtkontexte) dienen:

### Eating-Disorder-Floor

Bei kalorischen Berechnungen mit Defizit-Ziel: Rohwert auf den Grundumsatz
klammern, niemals darunter:

```ts
const zielKalorienRoh = gesamtumsatz + differenz;
const zielGeklammertAufGrundumsatz = zielKalorienRoh < grundumsatz;
const zielKalorien = Math.max(zielKalorienRoh, grundumsatz);
```

UI zeigt sachlichen blauen Info-Hinweis bei aktiver Klammer (kein Shaming).
Belegt: Frau 55/160/40/PAL 1,2/abnehmen → Rohwert 927 kcal, geklammert
auf Grundumsatz 1.189 kcal.

### Kinder-/Jugend-Gating

Bei Erwachsenen-Grenzwerten (BMI-WHO, Blutdruck-Klassifikation, etc.):
SSOT-Konstante exportieren und im Component die Kategorie-Anzeige
unterdrücken, wenn Person unter dem Schwellenalter ist.

```ts
// In der Lib:
export const BMI_ADULT_MIN_AGE = 18;

// Im Component:
const istKind = nAlter !== undefined && nAlter > 0 && nAlter < BMI_ADULT_MIN_AGE;

{!istKind && <KategorieBadge label={ergebnis.kategorie.label} />}
{istKind && (
  <InfoBanner>
    Für Personen unter {BMI_ADULT_MIN_AGE} Jahren gelten Perzentilen nach
    Alter und Geschlecht (z. B. Kromeyer-Hauschild). Bitte Kinderärzt:in
    konsultieren.
  </InfoBanner>
)}
```

Den Wert (z. B. BMI selbst) trotzdem zeigen, nur die Wertung unterdrücken.

### Verhütungs-Disclaimer als amber-Box

Bei Zyklus-/Fruchtbarkeits-/NFP-Rechnern: Disclaimer als deutlich sichtbare
amber-Hinweisbox, nicht als kleiner grauer Fließtext am Ende. Wortlaut
vermeidet werbliche Genauigkeitsversprechen, listet medizinisch
anerkannte Methoden auf (Kondom, hormonelle Verhütung, IUP, NFP nach
ärztlicher Schulung). Referenz: `ZyklusRechner.tsx` seit Prompt 144 P3.6.

### istKind-Flag durchgereicht

Bei Conditional-UI-Pattern wie BMI-Kinder-Gate: das `istKind`-Flag auch
an `ErgebnisAktionen` und `AiExplain` durchreichen, damit Copy-Text und
KI-Prompt das gleiche Verhalten zeigen. Sonst stellt der „Teilen"-Text
Kategorie-Wertungen aus, die das UI gerade ausgeblendet hat.

### Sensible Defaults bei „Gesund"-Eingaben

Werte über medizinischen Grenzen (z. B. Wasserbedarf > 4 l/Tag,
Körperfett im „Essentielles Fett"-Bereich, Zykluslänge außerhalb 21–35)
mit sachlichem Info-Hinweis flankieren. Berechnung läuft trotzdem (User
darf Extremwerte sehen), aber das UI macht klar, dass medizinischer Rat
sinnvoll ist.

## Casing-Konsistenz Component-Datei (Lehre aus Prompt 145b, 25.04.2026)

Auf **Windows-NTFS-Dev-Maschinen** ist das Filesystem case-insensitive,
auf **Vercel/Linux case-sensitive**. Wenn die Component-Datei lokal
`MwStRueckerstattungRechner.tsx` heißt, aber git die Datei als
`MwstRueckerstattungRechner.tsx` (kleines st) trackt, läuft der Build
lokal grün und scheitert auf Vercel mit „Module not found".

**Vor jedem Edit an Component-Dateien (oder beim Erstinstall einer
AffiliateBox):** mit `git ls-files | grep -i <name>` prüfen, ob das
git-getrackte Casing zum lokalen Filesystem und zum Importpfad passt.
Bei Drift sofort fixen, nicht in einen Folge-Commit verschieben.

**Fix-Pattern für case-only-Rename auf Windows** (zwei Schritte, weil
case-only-Renames nicht atomar sind):

```bash
git mv components/rechner/File.tsx components/rechner/File_temp.tsx
git mv components/rechner/File_temp.tsx components/rechner/FILE.tsx
```

Anschließend `git ls-files | grep -i file` zur Bestätigung.

## UI-Labels und rechtliche Tatbestände (Prompt 121-fix, 22.04.2026)

Wenn ein Rechner Mehrbedarfe, Freibeträge oder Tarif-Optionen mit rechtlichen Voraussetzungen anbietet:

- **Keine impliziten Auto-Aktivierungen** basierend auf Kontext-Wahrscheinlichkeiten. Beispiel-Anti-Pattern: „Alleinerziehenden-Mehrbedarf wirkt automatisch bei Kind im Haushalt" — § 21 Abs. 3 SGB II verlangt **alleinige Pflege und Erziehung**, nicht bloßes Kind-Vorhandensein. Im Wechselmodell oder bei Paar mit Kindern greift er nicht.
- **Explizite Checkbox mit Rechtsbegriff im Label**, nicht nur „Alleinerziehend", sondern „Alleinerziehend — alleinige Pflege und Erziehung des/der Kinder". Der Rechtsbegriff **ist** das Label.
- **Hilfetext erläutert die Ausnahmen** (z. B. Wechselmodell). Kein pauschaler „automatisch"-Text.
- **Tatbestandsgebundene Inputs nur sichtbar**, wenn die Grundvoraussetzung erfüllt ist (z. B. Alleinerziehend-Checkbox erst bei `bedarfsgemeinschaft === 'alleinstehend' && kinder.length > 0`).

## Statische Routes müssen Kategorie-Sidebar explizit integrieren (Prompt 120d-sidebar, 22.04.2026)

Für Rechner- oder Explainer-Seiten, die nicht über die dynamische Route `app/[kategorie]/[rechner]/page.tsx` laufen:

- Sidebar-Pattern 1:1 aus der dynamischen Route übernehmen (`kategorien` + `getRechnerByKategorie` + `aria-current`-Markierung)
- `AKTUELLER_SLUG`-Konstante setzen, damit der aktive Rechner visuell hervorgehoben wird
- Breite konsistent: `lg:w-64 shrink-0`
- AdSlot typ="rectangle" unter der Sidebar-Kategorie platzieren
- **Prompts für neue statische Routes müssen explizit „inkl. Kategorie-Sidebar" nennen** — „passt optisch zu anderen Rechnern" ist nicht präzise genug (Fallstrick-Herkunft)

Referenz-Umsetzung: [`app/finanzen/wohngeld-rechner/page.tsx`](../../app/finanzen/wohngeld-rechner/page.tsx) (seit Prompt 120d-sidebar).

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
- `lib/berechnungen/bafoeg-parameter.ts` **(neu, Prompt 121, 22.04.2026)** — `getAktuelleBafoegParameter(stichtag)`, `getAnrechnungsquote(geschwister)` (0,50 − 0,05 × Kinder, min/max-Clamp), single-bucket `BAFOEG_AB_2024_08_01` mit Skeleton für WS 2026/27. Antragsteller zählt NICHT mit.
- `lib/berechnungen/buergergeld-parameter.ts` **(neu, Prompt 121, 22.04.2026)** — `getAktuelleBuergergeldParameter(stichtag)`, Zwei Buckets `BUERGERGELD_2026_H1` + `BUERGERGELD_2026_H2` (Switch 01.07.2026 auf „Neue Grundsicherung"; H2 derzeit identisch zu H1 als Skeleton bis Gesetzestext verabschiedet). Enthält Regelsätze RSS1–6, Vermögensfreibeträge, Mehrbedarfs-Sätze § 21 Abs. 2–7 SGB II.
- `lib/berechnungen/kfz-steuer-parameter.ts` **(neu, Prompt 131, 23.04.2026)** — SSOT KraftStG: § 9 Abs. 1 Nr. 2c CO₂-Staffel + § 3d Elektro-Befreiung. Exports: `CO2_STAFFEL_KRAFTSTG_9_NR2C` (7-stufig progressiv 2,00/2,20/2,50/2,90/3,40/4,00 €/g), `ELEKTRO_BEFREIUNG`, `berechneCO2Komponente(gProKm)`, `berechneElektroBefreiungsende(erstzulassung)` (8. KraftStÄndG v. 04.12.2025 — bis 31.12.2035, Erstzulassung bis 31.12.2030), `SOCKEL_PRO_100CCM`.
- `lib/berechnungen/strompreis.ts` **(neu, Prompt 147, 25.04.2026)** — BDEW-Mittel + Festpreis-Neukundentarif + Worst-Case Grundversorgung + Wärmepumpen-Spezialtarif. Exports: `STROMPREIS_2026` (4 Profile: durchschnitt_bdew=37, neukunden_festpreis=33, grundversorgung=40, waermepumpen_tarif=28 ct/kWh), `getStrompreis(profil?)`. Konsumiert von stromkosten-, stromvergleich-, balkon-solar-, energiekosten-, photovoltaik-, poolkosten-, waermepumpen-, heizkosten-Rechner.
- `lib/berechnungen/eeg-einspeiseverguetung.ts` **(neu, Prompt 147)** — § 49 EEG 2023 Halbjahres-Schalter. Exports: `getEegSatz(stichtag?)` (gibt 6 Sätze für bis-10/40/100 kWp jeweils Teil-/Volleinspeisung zurück + Prognose-Flag), `getMischVerguetung(kwp, modus, stichtag?)`, `EEG_DEGRESSION_HINWEIS`. BNetzA 04/2026: 7,78 ct/kWh bis 10 kWp Teil, 12,34 ct Voll; 6,73 ct 10–40 kWp Teil, 10,35 ct Voll; 5,50 ct 40–100 kWp Teil, 10,35 ct Voll. Prognose-Bucket für 01.08.2026 (−1 % Degression).
- `lib/berechnungen/beg-foerderung.ts` **(neu, Prompt 147)** — KfW 458 Förderquoten Heizungstausch. Exports: `BEG_FOERDERUNG_2026` (Konstanten: Grundförderung 30 %, Klimageschwindigkeit 20 %, Einkommen 30 %, Effizienz 5 %, Cap 70 %, Einkommensgrenze 40.000 €, max. förderfähige Kosten 30.000 €/1. WE), `berechneBegFoerderquote(boni)`, `berechneBegZuschuss(invest, boni, wohneinheiten)`, `BEG_LAUTSTAERKE_HINWEIS_2026` (10 dB unter Grenzwerten ab 01.01.2026 für Bestandsgebäude).
- `lib/berechnungen/vpi.ts` **(neu Prompt 147, erweitert Prompt 149b)** — Verbraucherpreisindex Destatis Lange Reihe (Tabelle 61111-0001, Basisjahr 2020 = 100). Exports: `VPI_AKTUELL` (letzter Monatswert + Veränderung), `VPI_JAHRESDURCHSCHNITTE` (Jahre 1995–2025), **`getVpi(jahr)` mit Fallback auf VPI_AKTUELL für laufendes Jahr** und Throw bei Out-of-Range, **`indexiereVermoegen(betrag, jahrAnfang, jahrEnde)` als § 1376 BGB-konformer Helper** (Verwendung im Zugewinnausgleich-Rechner zur Anfangsvermögen-Indexierung; Identitäts-Test bei gleichem Stichtag).
- `lib/berechnungen/pv-ertragsmodell.ts` **(neu, Prompt 147c, 25.04.2026)** — Mertens-Faktoren für PV-Ertragsschätzung (PR=0,85 nach VDI 6002 / IEC 61724 implizit im Basiswert 850 kWh/kWp/Jahr eingebacken). Exports: `PV_BASIS_ERTRAG_KWH_KWP = 850`, `AUSRICHTUNGS_FAKTOR` (8 Stufen: Süd 1,00 / SO/SW 0,95 / Ost/West 0,85 / NO/NW 0,72 / Nord 0,65), `NEIGUNGS_FAKTOR` (5 Stufen: 0–15° 0,87 / 15–25° 0,94 / 25–35° 1,00 / 35–45° 0,97 / 45°+ 0,91), Label-Maps für Dropdowns, `berechnePvErtrag({kwp, ausrichtung, neigung})`, `berechneSpezifischenErtrag(ausrichtung, neigung)`. Konsumiert von photovoltaik- und dachflaechen-Rechner. Hinweis: `lib/berechnungen/balkon-solar.ts` nutzt bewusst eigenes BKW-Modell (950 kWh/kWp Brutto vor PR + BKW-spezifische Aufstellungs-Faktoren), siehe Header-Doku in der Lib.
- `lib/berechnungen/bmi.ts` **(erweitert, Prompts 141 + 143, 25.04.2026)** — WHO-BMI-Kategorien + alters-adjustierter Optimal-Bereich (NRC 1989). Exports: `bmiKategorien` (SSOT seit 143, auch von SchwangerschaftGewichtRechner konsumiert), `getOptimalerBereich(alter)` (SSOT seit 143, auch von idealgewicht.ts konsumiert), **`BMI_ADULT_MIN_AGE = 18`** (Erwachsenen-Gating, Component unterdrückt Kategorie/Skala/Optimal-Bereich bei `alter < 18` und zeigt Verweis auf BMI-Perzentilen Kromeyer-Hauschild).
- `lib/berechnungen/kalorien.ts` **(erweitert, Prompt 141, 25.04.2026)** — Mifflin-St Jeor mit Eating-Disorder-Floor. `berechneKalorien(...)` setzt `zielKalorien = Math.max(zielKalorienRoh, grundumsatz)` und neues Flag `zielGeklammertAufGrundumsatz: boolean`; UI zeigt Hinweis bei Klammer.
- `lib/berechnungen/schwangerschaft.ts` **(neu, Prompt 143, 25.04.2026 — Voll-Fusion)** — Konsolidiert die früheren `geburtstermin.ts` + `ssw.ts` (beide gelöscht). Enthält Naegele + erweiterte Naegele für Zykluslänge ≠ 28; SSW-Berechnung; Trimester; Meilensteine. Exports: `parseDatum(s)` (zeitzonen-sicher mit `+'T00:00:00'`), `berechneGeburtstermin(eingabe)` (SSW ab LMP+Zyklus-Korrektur), `berechneSsw(eingabe)` (SSW ab reinem LMP — gynäkologischer Standard), `defaultPeriodeDatum`, `defaultTerminDatum`, `Methode`, `SswMethode`, `Meilenstein`. **Beide SSW-Konventionen klinisch korrekt** — JSDoc dokumentiert die Divergenz, nicht versehentlich vereinheitlichen.

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
| 20.04.2026 | Prompt 102: Guard G13 (Differenz-Methode Steuer-Ersparnis), 4 neue Anti-Patterns (Pendler-Duplikat, Tarif-Jahr-Hardcode, Soli-pauschal, BBG-Hardcodes), Meta-Lektion Soli-Wiederholungs-Bug, Positive-Patterns-Abschnitt mit Referenz-Rechnern, Lint-contextKeywords-Hinweis | [ ] noch offen |
| 20.04.2026 | Prompt 107b: Guard G14 (Ein Footer, dynamische Zahlen) + Lint-Script `scripts/check-footer.mjs` dokumentiert | [ ] noch offen |
| 20.04.2026 | Prompt 108: Rechner-Count im Header auf 169/9 aktualisiert, Guards-Referenzen G1–G9/G10 auf G1–G14, Affiliate-Regel-Verweis auf CLAUDE.md, Anti-Pattern Grundfreibetrag inline ergänzt | [ ] noch offen |
| 22.04.2026 | Prompt 122-doku-sync: BAföG/Bürgergeld Parameter-Libs im Pattern-Abschnitt, SSOT-Parameter-Lib-Muster mit Interface+Bucket+Getter, Amazon-Partner-Abschnitt (AmazonBox + Regeln), Audit-Lehre-Checkliste (Zahlen-Erwartungen nur aus Primärquelle/Oracle), UI-Label-Rechtsbezug (Prompt 121-fix Lehre), statische-Route-Sidebar (Prompt 120d-sidebar Lehre) | [ ] noch offen |
| 24.04.2026 | Prompt 134: Welle-2-Stufe-1-Auto-Abschluss (Prompts 130–132.6), Slug-Drift-Scan-Prebuild-Hook, kfz-steuer-parameter.ts SSOT, Slug-/Display-Name-Konvention (Duden vs. SEO-Lesbarkeit), Anti-Pattern „Slug-Kategorie-Intuition" | [ ] noch offen |
| 25.04.2026 | Prompt 146: Welle-2-Stufe-2-Gesundheit-Abschluss (Prompts 140–144b), CosmosDirekt als 12. Programm (Awin 11893), bmi.ts erweitert (`bmiKategorien` + `getOptimalerBereich` als SSOT, `BMI_ADULT_MIN_AGE = 18`), schwangerschaft.ts Voll-Fusion (geburtstermin.ts + ssw.ts gelöscht), Wellbeing-Patterns-Sektion (Eating-Disorder-Floor, Kinder-Gating, Verhütungs-Disclaimer, istKind-Flag), Casing-Konsistenz-Lehre (Windows-NTFS vs. Vercel-Linux, Zwei-Schritt-`git mv`), Verify-Script-Pattern pro Welle-2-Stufe (externe Primärquellen) | [ ] noch offen |
| 26.04.2026 | Prompt 154: Welle-2-Stufe-3-Wohnen-Abschluss (Prompts 147–148b) + Welle-2-Stufe-3-Arbeit-Status (149a/b/c durch, 149d offen), 6 neue SSOT-Libs ergänzt (`strompreis.ts`, `eeg-einspeiseverguetung.ts`, `beg-foerderung.ts`, `vpi.ts` mit § 1376 BGB-Helper, `pv-ertragsmodell.ts`, plus `kfz-steuer-parameter.ts` aus Welle 2 Stufe 1), 4 neue Anti-Patterns (Backtick-Falle in Template-Literals, Slug-Drift in Kategorie-Datei, Phantom-Befund-Diagnose, Test-Soll-Werte gegen UI-Anzeige), Counts korrigiert (170 = Alltag 23 / Finanzen 45 / Gesundheit 17 / Auto 11 / Wohnen 25 / Mathe 18 / Arbeit 17 / Kochen 12 / Sport 2) | [ ] noch offen |
| 26.04.2026 | Prompt 155: Welle-2-Komplett-Abschluss-Sync — Header-Stand auf „Welle 2 KOMPLETT abgeschlossen 26.04.2026" mit allen 4 Stufen ✅ und Welle-3-Backlog-Stichworten (152b/P3-B1/151/150e/Validation-Sweep). Audit-Methodik-Sektion ergänzt um Audit-Bundle-Pattern (Generator-Skript `scripts/build-audit-bundle.ts`, CLI `npm run audit:bundle <name>`, Bundle-Defs in `scripts/audit-bundles.ts`, 300k-text-Limit-Pflicht für Bundles >100 KB), Verify-Skripte-Konvention (Lehre 149d: `.ts` statt `.mjs`, `npx tsx`-Aufruf, typisierte Helper), Wert-Recherche-Disziplin durch Claude im Web (Lehre 22: Aktualität-Hinweis + zwei Sekundärquellen + URL-Permission-Workflow). | [ ] noch offen |
| 28.04.2026 | Prompt 158a: Welle-3-Lehren-Sync — Header-Stand auf 28.04.2026 mit Welle 3 6/9 ✅ (152b, 154, 155, 156, 151, 150e). Vier neue Anti-Pattern-Blöcke ergänzt: Content-Sektionen in client-only Lazy-Wrapper (Lehre 26 / 154 — AdSense-Trigger), Klasse auf Wrapper statt direkten Kindern (Lehre 27 / 154), `new Date()` auf Modul-Ebene in `'use client'`-Components (Lehre 24 / 152b — Hydration-Mismatch-Risiko), Stichtag-Wert als dynamischer Lookup verkleidet (Lehre 23 / 152b — Stichtag vs. berechenbar mit Decision-Tabelle). AdSense-Status im Header: erste Prüfung 27.04.2026 negativ, Drei-Maßnahmen-Sprint 154+155+156 als Reaktion. | [ ] noch offen |
