---
name: rechner-builder
description: Template and checklist for building standardized online calculators (Rechner) for rechenfix.de. Use this skill whenever creating a new calculator/Rechner page, adding a calculator to the site, or when the user mentions building, creating, or adding a Rechner for rechenfix.de. Also trigger when the user says "neuer Rechner", "Rechner erstellen", "Rechner bauen", or references the rechenfix project. This ensures every calculator is consistent, complete, and SEO-optimized with all required features (KI-Erklärung, Share, Copy, Feedback, Schema.org, etc.).
---

# Rechner Builder für rechenfix.de

Build standardized, SEO-optimized calculator pages for the German calculator portal rechenfix.de. Every calculator must follow this template to ensure consistency, completeness, and maximum SEO impact.

## WARUM diese Standards existieren (Skill v2, 10.05.2026 · Content-Bausteine-Update Welle 19, 10.06.2026 · Goldstandard-Update 11.06.2026 · Referenzwerte-Update Wellen 82–102, 14.08.2026 · Prüfvorschriften-Update Welle 114, 26.08.2026)

> **Welle 19 (10.06.2026):** Neue Rechner und Migrationen nutzen den Content-Baustein-Standard (`contentBloecke`) statt des Thin-`erklaerung`-String-Pfads, der die 4. AdSense-Ablehnung verursacht hat. Das ist keine Empfehlung, sondern der Pfad — der Thin-String-Pfad ist geschlossen. Die acht Blocktypen, das Leitformat-Prinzip, die Quellen-Pflicht und der Self-Check vor dem Commit stehen in **`references/content-standards.md`**; diese Datei vor dem Schreiben von Inhalten lesen.

Diese Standards wurden nach den W13/W14-Audit-Wellen etabliert, in denen veraltete Affiliate-Verteilung, zu kurze Content-Texte, veraltete Gesetzes-Werte und schlecht dokumentierte Tabellen-Werte wochenlange Korrektur-Sprints nötig machten. Konsequente Befolgung ab Build-Phase erspart spätere Audits.

**Vier Standards für jeden neuen Rechner:**

1. **Affiliate-Architektur:** `config.affiliate` (Single-Object oder Array) statt hartkodierter `<AffiliateBox />`-JSX. Siehe „Affiliate-Platzierung"-Sektion.
2. **Content-Wortzahl:** `erklaerung` + FAQ kombiniert ≥ 750 W (Ideal 1.000–1.500 W), FAQ 5–8 Fragen. Siehe Step 7 + 8.
3. **Aktuelle Gesetze:** Vor dem Code-Schreiben relevante Paragraphen recherchieren und im Code-Kommentar mit § + Stand + Quelle dokumentieren. Siehe „Pre-Build: Gesetzes-Recherche".
4. **Tabellen/Sätze/Grenzen:** Als named constants am File-Anfang mit Stichtag + Quelle, KEINE magic numbers inline. Siehe „Pre-Build: Tabellen-Aktualität". Vorher in **`references/zentrale-libs.md`** nachsehen, ob der Wert bereits als SSOT existiert — Duplikate zentraler Werte sind der häufigste Wiederholungsfehler im Repo (G10).

**Bei jährlichem Januar-Audit greift folgender Workflow:**

1. Repo nach `Stand: <Vorjahr>` durchsuchen → Liste der aktualisierungsbedürftigen Werte
2. Pro Wert: aktuelle Quelle prüfen, Wert anpassen, Stichtag aktualisieren
3. Build-Gate grün (alle Seiten erfolgreich prerendert, keine neuen Errors), Live-Stichprobe, Commit

Wenn diese Standards befolgt werden, dauert der Januar-Audit 1–2 Tage statt 2–3 Wochen.

**Aktueller Stand (20.08.2026, gemessen an HEAD `76f5552`):** 206 Rechner in **zehn** Kategorien — Alltag 24, Finanzen 45, Gesundheit 17, Auto & Verkehr 15, Wohnen & Energie 25, Mathe & Schule 18, Arbeit & Recht 17, Kochen & Ernährung 15, Sport & Fitness 15, **Technik 15**. Dazu 16 Blogartikel und 73 Grafik-Komponenten. Die Prebuild-Kette hat **14** Glieder. **Affiliate:** **13** Programme in `components/AffiliateBox.tsx` (wiso, smartsteuer, lexware, check24, congstar, ks-auxilia, hotelde, burdaZahn, verivox, naturesway, cosmosdirekt, smava, hansemerkur); 55 `<AffiliateBox>`-Aufrufe in 52 Dateien. **AdSense:** seit Februar 2026 bewusst pausiert, der Ladecode wurde am **16.08.2026** vollständig entfernt (Susanne Recht R2) — es findet derzeit **keine** Werbeauslieferung statt. Neue Rechner dürfen deshalb keine AdSense-Annahmen enthalten. **Wellenverlauf:** vollständig in [docs/audit-arbeitspapiere/welle-status-historie.md](../../docs/audit-arbeitspapiere/welle-status-historie.md) — bewusst nicht hier gespiegelt, damit der Skill nicht mit jeder Welle veraltet.

> **Pflege dieses Blocks:** Die Zahlen oben veralten mit jeder Welle. Sie sind eine Momentaufnahme, keine SSOT — im Zweifel gegen `lib/rechner-config/` und `components/AffiliateBox.tsx` messen, nie aus diesem Skill zitieren. Zuletzt berichtigt in Welle 111 (20.08.2026), davor unverändert seit 01.05.2026.

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

## Pre-Build: Gesetzes-Recherche (Pflicht, Skill v2)

**Vor dem Code-Schreiben** identifizieren: Welche gesetzlichen Vorgaben beeinflussen den Rechner? Typische Domänen:

- **Steuerrecht** — EStG (§ 9, § 32a, § 38b, § 66, § 101 etc.), UStG, SolzG, KraftStG, ErbStG, GrEStG
- **Sozialversicherungsrecht** — SGB II (Bürgergeld), SGB III (ALG I), SGB IV (Versicherungspflicht, Midijob § 20a), SGB V (KV), SGB VI (RV, Witwenrente, Rentenwert § 68), SGB IX (Schwerbehinderung)
- **Arbeitsrecht** — BUrlG (Urlaub), ArbZG (Arbeitszeit), MuSchG (Mutterschutz), BEEG (Eltern­geld + Elternzeit), KSchG (Kündigungsschutz), MiLoG (Mindestlohn), BGB §§ 622/626 (Kündigungs­frist)
- **Mietrecht / Bauen** — BGB §§ 556d–558e (Miet­preis­bremse, Mieterhöhung), WoGG (Wohngeld), EEG (Einspeise­vergütung), GEG (Gebäude­energie), KostBRÄG (Notar/Anwalt)
- **Verkehrsrecht** — StVG, KraftStG (§ 3d Elektro, § 9 CO₂-Staffel), StVZO

**Für jeden relevanten Paragraphen oder Wert:**

1. **Aktuellen Stand recherchieren.** Quellen in Reihenfolge der Vertrauenswürdigkeit:
   - [gesetze-im-internet.de](https://www.gesetze-im-internet.de) — amtlicher Wortlaut
   - [bundesfinanzministerium.de](https://www.bundesfinanzministerium.de) — BMF-Schreiben + Tarif-Tabellen
   - [bmas.de](https://www.bmas.de) — Arbeit/Soziales
   - Bundesregierung-PDFs / BGBl. — Verkündungs-Datum + Inkraft­treten
   - Sozialversicherungsträger (DRV, BMG) — Rechengrößen­verordnungen
2. **Im Code-Kommentar dokumentieren** — Format:

   ```ts
   // § <Norm> Abs. <Y>: <Regelung kurz>. Stand: <DD.MM.YYYY>. Quelle: <URL oder Kurzangabe>
   ```

3. **Bei Werten/Sätzen/Grenzen** zusätzlich Inline-Kommentar mit Stichtag direkt am Konstantenwert.

**Beispiel:**

```ts
// Grundfreibetrag 2026 nach § 32a Abs. 1 Nr. 1 EStG.
// Stand: 09.05.2026. Quelle: BMF Steueränderungsgesetz 2025, BGBl. I 2025 Nr. 363.
const GRUNDFREIBETRAG_2026 = 12348;
```

**Ziel:** Beim jährlichen Audit (Januar) sofort sichtbar, welche Werte auf neuen Stand gehoben werden müssen — `grep -rn "Stand: " lib/berechnungen/` listet alle Stichtage.

---

## Pre-Build: Tabellen-Aktualität (Pflicht, Skill v2)

**Vor dem Code-Schreiben prüfen,** welche der folgenden Standardwerte verwendet werden — diese sind häufig drift-anfällig:

| Wert-Gruppe | Rechtsgrundlage |
|---|---|
| Beitragsbemessungsgrenzen KV/PV/RV/AV (bundeseinheitlich seit 2025) | § 159 SGB VI + SV-Rechengrößen-VO |
| ESt-Tarifzonen (Grundfreibetrag, Polynom-Koeffizienten, Zonen-Grenzen) | § 32a EStG |
| Lohnsteuer-PAP (jährliches ITZBund-XML) | § 39b EStG |
| Steuerklassen-Logik + Faktoren | § 38b EStG |
| Mindestlohn (allgemein + Branchenverordnungen) | MiLoG + BranchenMiLoV |
| Kindergeld-Sätze + Kinderfreibetrag | § 66 EStG + § 32 Abs. 6 EStG |
| Pendlerpauschale-Sätze | § 9 Abs. 1 Nr. 4 EStG |
| Soli-Freigrenze + Milderungszone | SolzG § 4 |
| Pflichtversicherungsgrenze (JAEG) | § 6 SGB V |
| Mehrwertsteuersätze (Regel + ermäßigt) | § 12 UStG |
| Pfändungstabelle § 850c ZPO (2-Jahres-Anpassung 01.07.) | ZPO + BGBl-VO |
| Düsseldorfer Tabelle (jährliche Anpassung 01.01.) | OLG Düsseldorf |
| Rentenwert (Anpassung 01.07.) | § 68 SGB VI + BMAS-VO |

**Für jeden verwendeten Wert PFLICHT-Format im Code-Kommentar:**

```ts
// <Wert-Bezeichnung> <Jahr>: <Wert>. Stand: <DD.MM.YYYY>. Quelle: <URL>
```

**Beispiel:**

```ts
// BBG RV/AV (bundeseinheitlich) 2026: 101.400 €/Jahr (8.450 €/Monat).
// Stand: 09.05.2026. Quelle: SV-Rechengrößen-VO 2026, BGBl. I 2025 Nr. 367.
export const BBG_RV_JAHR = 101_400;
export const BBG_RV_MONAT = 8_450;
```

**Architektur-Regel:** Tabellen-Werte **bevorzugt als named constants am File-Anfang** sammeln (nicht inline-magic-numbers), damit nächster Audit-Durchgang in einer Datei alle Werte sieht. Bei jahresabhängigen Werten Stichtag-Switch-Pattern anwenden (siehe Step 12a + CLAUDE.md).

**Anti-Pattern** — magic numbers inline:

```ts
// ❌ Schlecht: Wert ohne Bezeichnung, Stichtag, Quelle
const ergebnis = brutto - 12348;

// ✅ Gut: Named constant mit Stichtag + Quelle
// Grundfreibetrag 2026 nach § 32a Abs. 1 Nr. 1 EStG.
// Stand: 09.05.2026. Quelle: BMF StÄndG 2025.
const GRUNDFREIBETRAG_2026 = 12_348;
const ergebnis = brutto - GRUNDFREIBETRAG_2026;
```

Im Idealfall liegt der Wert bereits in einer zentralen Lib (`lib/berechnungen/<domain>.ts`) — Kurzliste in `references/zentrale-libs.md`, Volltabelle in CLAUDE.md → „Zentrale Libs (SSOT)". Eigene Hardcodes nur, wenn der Wert nirgendwo zentral verfügbar ist; dann Inline-Constants mit Stichtag.

---

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

### Step 3b: Externe Werte als User-Eingabe (L-38-Pflicht, etabliert Welle 5)

**Default für Marktwerte, Steuersätze und drift-anfällige externe Werte:** User-Input-Feld mit Hint-Text auf Primärquelle.

Diese Werte gehören als User-Eingabe (mit Default + Hint), **nicht** als Statiktabelle in der Lib:

- **Marktwerte:** Mietspiegel-€/m², Bodenrichtwerte, Listenpreise, Pfandbrief-Renditen, Marktzinsen
- **Kommunale Werte:** Hebesätze, GrSt-Sätze, gemeindliche Pauschalen
- **Steuersätze für Schätzungen:** Grenzsteuersatz (für Schätz-Rechner mit Günstigerprüfung), Vorjahres-Brutto-Werte
- **AfA-Werte:** Nutzungsdauer-Jahre (mit Hint auf BMF-AfA-Tabellen)

**Begründung:** rechenfix ist Schätz-Rechner für Selbst-Anwender, externe Werte sind drift-anfällig und marktbewegt. Statiktabellen wären Wartungs-Last und müssen jedes Jahr aktualisiert werden.

**Erlaubte Ausnahme:** Default-Liste mit User-Override (z. B. AfA-Default-Sätze für Standard-Kategorien wie PKW=6 J, Computer=3 J, mit Möglichkeit zum Überschreiben). Volle Tabelle wäre Scope-Erweiterung und braucht fachliche Begründung.

**Hint-Text-Pattern:**
```jsx
<input ... />
<p className="text-xs text-gray-500 mt-1">
  Aktueller Wert aus Bundesbank-Zeitreihe BBK01.WT3320, alternativ
  Steuerbescheid der Gemeinde, BMF-AfA-Tabelle, etc.
</p>
```

**Verbindlich seit:** Welle 5 Track-A-Closure (04.05.2026), 6/6 Bestätigungs-Datenpunkte aus Welle-2-Lib-Extraktionen.

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
- **Content-Mindestumfang für AdSense-Konformität (seit W13.C-Audit, 09.05.2026):**
  - `erklaerung` + FAQ kombiniert: **MINDESTENS 750 Wörter**
  - Ideal: **1.000–1.500 Wörter** (Pattern-Goldstandard der Top-10-Rechner, `references/content-standards.md`)
  - Begründung: W13.C-Audit hat ergeben, dass Rechner mit <700 W AdSense-Reject-Risiko haben („Minderwertige Inhalte"). 750 W ist die sichere Untergrenze.
  - Wortzählung pro Rechner manuell oder via `scripts/word-count.mjs` (falls vorhanden) verifizierbar.
- **Formel-Box:** Show the formula used in a highlighted box
- **Rechenbeispiel-Box:** Show a worked example
- **Internal links** to related calculators within the text
- Write in German, formal "Sie" form

### Step 8: FAQ Section

- **FAQ-Umfang: 5–8 Fragen** (Empfehlung 6, Top-10-Rechner ≥ 8 — Pattern-Goldstandard)
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
- [ ] `erklaerung` + FAQ kombiniert ≥ 750 Wörter (Ideal 1.000–1.500 W)
- [ ] FAQ-Section: 5–8 Fragen (Empfehlung 6, Top-Rechner ≥ 8)
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
- [ ] **Guards G1–G14 geprüft** (`references/qualitaets-guards.md`)
- [ ] "Fix erklärt"-Button erscheint erst, nachdem der `ergebnis`-State gefüllt ist — das ist **kein Bug**, sondern gewollt

### Step 11b: SSOT-Import-Audit (Pflicht vor Commit)

**Bei Erweiterung bestehender Berechnungs-Libs:** drei Pre-Phase-Pflichten beachten (L-37 + C1-Lehre + L-38, etabliert in Welle 5). Werte aus der Lib lesen (nicht Memory), Lib-Funktions-Boundary klären (nicht Norm-Erklärtext), externe Werte als User-Eingabe (nicht Statiktabelle). Siehe CLAUDE.md Sektion „Drei Pre-Phase-Pflichten für Welle-2-artige Lib-Extraktionen".


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
Werten. Siehe `references/anti-patterns.md`.

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
4. **Pflicht:** Slug als ERSTEN Eintrag in `neueRechnerSlugs` eintragen (siehe unten)

Nach dem Anlegen der Config den neuen Slug als ERSTEN Eintrag in `neueRechnerSlugs`
(`lib/rechner-config/index.ts`) eintragen. Die Startseite zeigt über `getNeueRechner()` die
ersten drei Einträge dieser Liste unter „Neu hinzugefügt" — wird der Slug nicht eingetragen,
taucht der Rechner dort nie auf. Es gibt KEIN datumsbasiertes Feld; die Reihenfolge in der
Liste ist die Quelle der Wahrheit.

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

Bevor ein Rechner committed wird, die vierzehn Guards aus
**`references/qualitaets-guards.md`** abarbeiten — die Datei jetzt lesen,
nicht aus dem Gedächtnis abhaken.
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

## Bewährte Patterns (Kopiervorlagen)

Diese Muster sind durch den April-Audit 2026 validiert und stehen als
Kopiervorlagen bereit. Volldetails in `CLAUDE.md` → „SSOT-Patterns":

- **Splittingtarif-Toggle** → Referenz: `components/rechner/GmbhGfRechner.tsx`
- **Bundesland-Dropdown für KiSt** → Referenz: `GmbhGfRechner.tsx`, `SteuerprogressionsRechner.tsx`
- **Differenz-Methode für Steuer-/Soli-Ersparnis** → Referenz: `lib/berechnungen/spenden.ts`
- **Individuelle Pauschalen als Eingabefeld** → Referenz: PKV-Beitrag in `GmbhGfRechner.tsx`

Bei neuen Rechnern: erst prüfen, ob eines dieser Patterns zutrifft,
dann aus dem Referenz-Rechner kopieren.

## Referenzdateien — wann welche lesen

Diese Datei enthält den Ablauf, die Pflicht-Gates und die Disziplin. Die
Detailbestände liegen in `references/` und werden **bei Bedarf gelesen**, nicht
vorsorglich. Jede Zeile nennt den Auslöser, bei dem die Datei fällig ist.

| Datei | Lesen, wenn … |
|---|---|
| `references/checklist.md` | **immer** — Schnell-Checkliste zum Abhaken, plus der Block „Prüfvorschrift schreiben" vor jedem Build-Prompt |
| `references/templates.md` | ein neuer Rechner gebaut wird — Vorlagen je Rechnertyp |
| `references/qualitaets-guards.md` | **vor jedem Commit** — die vierzehn Guards G1–G14 (Step 13) |
| `references/anti-patterns.md` | vor dem Bau eines Finanz-, Steuer-, SV- oder Arbeits-Rechners; außerdem bei jedem Bug, der sich „schon mal gesehen" anfühlt |
| `references/content-standards.md` | Inhalte geschrieben werden — `contentBloecke`-Standard (Pflicht seit Welle 19) und Pattern-Goldstandard für Layout |
| `references/zentrale-libs.md` | ein gesetzlich bestimmter Wert gebraucht wird — erst hier nachsehen, bevor irgendetwas hartkodiert wird |
| `references/audit-methodik.md` | eine Audit- oder Korrektur-Welle läuft, oder redaktionelle Referenzwerte in Configs angefasst werden |
| `references/kategorien.md` | ein Technik-Rechner gebaut wird — was diese Kategorie von den anderen unterscheidet |

**Drei davon sind keine Nachschlagewerke, sondern Gates:**
`qualitaets-guards.md` vor jedem Commit, `zentrale-libs.md` vor jedem
hartkodierten Wert, `content-standards.md` vor jedem Inhalt. Wer sie
überspringt, baut an einem der dokumentierten Wiederholungsfehler vorbei.

Die Wellbeing-Pflichten für Gesundheits-Rechner stehen **nicht** in
`references/`, sondern weiter unten in dieser Datei. Sie sind
sicherheitsrelevant und dürfen nicht hinter einer Indirektion liegen.

## Affiliate-Platzierung (Verweis)

Affiliate-Platzierungs-Regel: thematischer Match zum Rechner erforderlich. Details, verbotene Kombinationen und aktuelle Partner-Liste (13 Programme, Stand 20.08.2026): siehe CLAUDE.md → Abschnitt »Affiliate-Programme (Awin)«.

**Affiliate-Boxen werden NIE hartkodiert im Component eingebaut.** Stattdessen via `config.affiliate`-Property in der jeweiligen `lib/rechner-config/<kat>.ts` deklariert. Der Renderer in [`app/[kategorie]/[rechner]/page.tsx`](../../../app/[kategorie]/[rechner]/page.tsx) Z. ~565 macht den `Array.isArray`-Check automatisch und rendert post-FAQ-Position (etabliert in W14.A.1, 09.05.2026).

```ts
// Single-Box (1 AffiliateBox):
affiliate: { programId: 'wiso', context: '<slug-oder-context>' }
// optional: variant: 'compact' | 'full' (Default 'full')

// Multi-Box (≥2 AffiliateBoxes):
affiliate: [
  { programId: 'wiso', context: '<context>' },
  { programId: 'cosmosdirekt', context: '<context>', variant: 'compact' },
]

// Kein Affiliate (z. B. Gesundheit, Mathe):
// Property einfach weglassen (undefined).
```

**Stack-Konventionen** (seit Prompt 145b, 25.04.2026, erweitert W14.A.1):
- Max. 2–4 AffiliateBoxen pro Rechner. Erste Box `variant: 'full'` (Default). Ab der 4. Box `variant: 'compact'` (Beispiel: RentenRechner mit 4 Boxen — wiso/verivox/burdaZahn/cosmosdirekt, alle compact außer der ersten).
- **Context-Konflikte vermeiden:** Wenn ein bestehendes Programm bereits einen bestimmten Context bedient, weicht das neu hinzukommende Programm thematisch aus. Beispiel: SparRechner → verivox bedient `sparplan`, CosmosDirekt nimmt `tagesgeld`.
- **Reihenfolge im Array:** entspricht der vom Renderer ausgespielten Reihenfolge (post-FAQ, top-to-bottom).

**Sonderfall-Patterns (W14.A — gelten NUR für dokumentierte Bestands-Sonderfälle, nicht für neue Rechner):**
- **P1 (BN-Position-Erhalt):** Component-Inline-JSX bleibt, kein `config.affiliate` — historisches CTR-Slot-Argument.
- **P2 (Steuererstattung):** Standard-Migration trotz Custom-Grid-Layout-Verlust — AdSense-Risiko-Reduktion priorisiert.
- **P3 (Margin-Wrapper-Removal):** Reiner `<div className="mt-N">`-Wrapper ohne Layout-Logik wird mit den Boxen entfernt.
- **P4a (ElterngeldRechner):** Conditional auf `!ergebnis.anspruchAusgeschlossen` — gesamter Component SKIP, Inline-JSX bewahrt.
- **P4b (RentenRechner):** Hybrid — 3 unconditional Boxen ins Array, 1 Conditional-Box (verivox auf `rentenluecke > 0`) inline behalten.

Neue Rechner nutzen ausschließlich das Standard-Pattern (Single-Object oder Array via `config.affiliate`). Sonderfall-Patterns werden nicht aktiv für Neubauten gewählt — siehe welle-status-historie für die Präzedenz-Begründungen.

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

## Skill-Synchronisation

**Letzte Aktualisierung:** 04.05.2026 nach Welle-5-Closure und Welle-6-Eröffnung. Drei Pre-Phase-Pflichten (L-37 + C1-Lehre + L-38) als neue Step 3b ergänzt. SSOT-Import-Audit-Hinweis um Welle-5-Lehren erweitert. Bei künftigen Wellen-Closures Skill auf neue Lehren prüfen.

Dieser Skill existiert in zwei Kopien:

1. **Repo (maßgeblich):** `.claude/skills/rechner-builder/` — SKILL.md plus `references/`, gepflegt über Commits
2. **claude.ai Skills-UI:** unter **Anpassen → Fähigkeiten** (`claude.ai/customize/skills`), gebunden an Karstens persönliches Konto

Die claude.ai-Kopie liest jede Chat-Instanz beim Trigger. Ein Commit erreicht sie **nicht** — sie wird ausschließlich per ZIP-Upload aktualisiert.

**Ablauf nach jeder Skill-Änderung (Stand 26.08.2026):**

1. Skill-Ordner als ZIP packen. Linux-`zip` oder -`tar` verwenden, **nicht** PowerShell `Compress-Archive` — das schreibt Backslashes als Pfadtrenner, und der Upload scheitert.
2. In claude.ai unter Anpassen → Fähigkeiten den bestehenden `rechner-builder` öffnen, Schalter aus, löschen.
3. „+" → „Fähigkeit hochladen" → das ZIP wählen. Ein direktes Ersetzen gibt es nicht; ohne vorheriges Löschen entstehen zwei gleichnamige Einträge.
4. Schalter einschalten.
5. Neuen Chat öffnen — eine laufende Sitzung lädt den Skill nicht nach.

Ohne diesen Schritt geben Claude-Chat und Claude-Code inkonsistente Ratschläge, weil der Chat mit einer veralteten Fassung arbeitet.

> **Falle beim Repo-Commit:** `.gitignore` enthält `.claude/skills/` (pauschal, damit die privaten Assistenten-Pakete nicht in dieses öffentliche Repo geraten). Die Regel greift nur für **untracked** Dateien — die bereits versionierten SKILL.md, checklist.md und templates.md sind davon unberührt. **Eine neu hinzugekommene Datei unter `references/` wird von `git add` stillschweigend übergangen.** Sie braucht `git add -f`. Nach jeder Struktur­änderung deshalb `git ls-files .claude/skills/rechner-builder/` gegen den Ordnerinhalt halten.

**Struktur seit Welle 114 (26.08.2026):** SKILL.md trägt Ablauf, Pflicht-Gates und Disziplin (898 Zeilen); die Detailbestände liegen in acht Dateien unter `references/` und werden bei Bedarf geladen. Die Zuordnung steht im Abschnitt „Referenzdateien — wann welche lesen". Beim Ergänzen neuer Lehren gilt: Ablauf und Gates gehören in die SKILL.md, Einzelfälle und Nachschlagewerke in die passende Referenzdatei.

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
| 26.08.2026 | Welle 114: Prüfvorschriften-Regeln R1–R6 in der Operativen Disziplin, Anti-Pattern zur Namenswahl exportierter Helfer, Working-Tree-Disziplin um Worktree-Pflege und untracked Artefakte erweitert, Checkliste um den Block „Prüfvorschrift schreiben". **Struktur-Umbau:** SKILL.md 1966 → 898 Zeilen, sechs neue Referenzdateien (Qualitäts-Guards, Anti-Patterns, Audit-Methodik, Kategorien, Zentrale Libs, Content-Standards), Sync-Ablauf auf ZIP-Upload umgestellt. | [ ] noch offen |

---

## Operative Disziplin

### Prüfvorschriften in Build-Prompts (Welle 114, 26.08.2026)

Jeder Build-Prompt enthält Greps mit Sollwerten. In Welle 114 sind **drei** Prompts an fehlerhaften Prüfvorschriften hängengeblieben — alle drei Fehler kamen aus der Vorlage, keiner aus dem Repo. Die folgenden sechs Regeln adressieren jeweils einen davon.

**R1 — `git grep` statt `grep -r`.**
`git grep` durchsucht nur getrackte Dateien. Verwaiste Worktrees unter `.claude/worktrees/`, `node_modules` und alles Gitignorierte fallen automatisch heraus. In Welle 114 lieferten drei tote Worktree-Kopien von `lib/seo.ts` und `app/layout.tsx` bei `grep -r` vier statt einem Treffer und lösten eine STOP-Bedingung fälschlich aus. Ein Ausschlusspfad im Prompt ist die schwächere Lösung, weil ihn jede Folgevorlage neu mitschleppen muss.

**R2 — Dateityp immer eingrenzen.**
`-- '*.ts' '*.tsx'`. Ohne Eingrenzung zählen Arbeitspapiere unter `docs/` mit, die Code zitieren. Beispiel: `abzuegeProzent` steht in `docs/audit-arbeitspapiere/w15b-longtail-scoping.md` und verschiebt jede Gesamtzählung um eins.

**R3 — Bezeichner-Greps brauchen Wortgrenzen auf beiden Seiten, Zeichenklasse `[^a-zA-Z0-9_]`.**

```bash
git grep -oE '(^|[^a-zA-Z0-9_])name([^a-zA-Z0-9_]|$)' -- '*.ts' '*.tsx'
```

Ziffern **und** Unterstrich gehören in die Klasse, weil beide in JavaScript-Bezeichnern zulässig sind. Ohne linke Grenze zählte `gesamtabzuegeProzent` als zusätzlicher Treffer für `abzuegeProzent` (22 statt 20). Das ist dieselbe Klasse Fehler wie die dokumentierte Ziffern-Lehre bei `check24` — nur mit Teilstring statt mit Ziffer im Namen.

**R4 — Ein Satzzeichen ist keine Wortgrenze.**
Ein Anker wie `(,|$)` ist eine Annahme über die **Formatierung**, nicht über den Bezeichner. In Welle 114 stand in allen sechs Dateien

```ts
twitter: { card: 'summary_large_image', title: TITEL, description: DESC },
```

Auf `TITEL` folgt ein Komma, auf `DESC` ein Leerzeichen. Derselbe Prompt zählte deshalb 18 gegen 12 — für zwei Konstanten, die exakt gleich oft verwendet wurden. Beide Seiten brauchen `[^a-zA-Z0-9_]`.

**R5 — `-n` und `-o` nie voneinander ableiten.**
Zeilenzahl und Vorkommenszahl sind zwei Messungen, nicht eine Messung und eine Rechnung. Wer aus „19 Zeilen, davon eine mit zwei Treffern" auf 20 Vorkommen schließt, hat geschätzt. Beide Kommandos einzeln ausführen, beide Ergebnisse in den Prompt schreiben. Weicht die Differenz von der erwarteten ab, ist das der Hinweis auf einen Teilstring-Effekt (siehe R3).

**R6 — Ein Sollwert darf nicht nur erreichbar sein, wenn eine STOP-Bedingung verletzt wird.**
Ein Prompt forderte `0` für ein Muster, das genau einmal in der ausdrücklich als tabu markierten CSS-Zeile steht. Der Sollwert war nur zu erfüllen, indem man die Tabu-Zeile ändert. Jede Prüfung gegen den geplanten **End**zustand rechnen, nicht gegen den Wunschzustand — und wenn eine Zeile bewusst unangetastet bleibt, gehört ihr Treffer in den Sollwert.

**Und quer über alle sechs: Sollwerte werden gemessen, nie gerechnet.**
Auch die scheinbar triviale Arithmetik der Vorlage. „Elf Pfade, davon einer nicht betroffen, also zehn Dateien\" war falsch — der eine war nie in der Liste. Die Zahl der geänderten Dateien ist ein `git diff --name-only | wc -l`, kein Kopfrechnen.

**Verhalten bei Abweichung — gilt für Code-Claude, nicht verhandelbar:**
Ist-Wert melden, Vorlage **nicht** stillschweigend reparieren, Sollwert **nicht** anpassen, nichts committen. Genau dieses Verhalten hat in Welle 114 dreimal einen falschen Commit verhindert. Ein Prompt, der eine Abweichung „plausibel wegerklärt\", ist wertlos.

Siehe auch: „Beim Entfernen: Gegenzählung dessen, was nicht getroffen werden darf\" (Wächter-Abschnitt oben) — dort steht die inhaltliche Seite derselben Disziplin.

### Verify-Modus

Nach jedem Deploy macht **nur Karsten** Live-Verify per Inkognito-Browser. **Claude macht keine eigenen web_fetch-Aussagen** zum Live-Stand, weil web_fetch session-übergreifend stale-cached.

- Karstens Inkognito-Screenshots = ground truth
- Claude beschränkt sich auf statische Code-Analyse + Prompt-Generierung
- Bei Konflikt zwischen web_fetch und Karsten-Screenshot: Karsten gewinnt

### Working-Tree-Disziplin

- `lib/rechner-config/client-data.ts` ist auto-generierter Datums-Stempel-Drift — **NICHT mit-committen** (in jeder Sub-Welle vor `git add` prüfen)
- Atomic-Commits: ein Sub-Wellen-Commit, prägnante Message
- Working-Tree nach Commit clean (außer client-data.ts-Drift)
- **Verwaiste Worktrees regelmäßig wegräumen:** `git worktree prune`, danach die Verzeichnisse unter `.claude/worktrees/` löschen. Sie sind gitignoriert (`.gitignore:106`), liegen aber im Dateisystem und enthalten alte Fassungen echter Repo-Dateien. Bei `grep -r` zählen sie mit und erzeugen Fehlalarme (siehe R1 unter „Prüfvorschriften in Build-Prompts").
- **Untracked Artefakte, die nicht gitignoriert sind, brechen den Clean-Standard dauerhaft.** Sie sind kein Grund für einen Abbruch, wenn sie außerhalb des Änderungsbereichs liegen — aber sie gehören gemeldet und dann entweder gelöscht oder in `.gitignore` aufgenommen. Nicht ungefragt löschen: der Prompt-Autor weiß nicht immer, wofür eine Datei da ist.

### Beispielrechnungen

Werte für Beispiele in Specs IMMER aus Live-Calculator ziehen, nicht schätzen. Drift zwischen Spec-Wert und Live-Calculator wäre fachlich peinlich.

Dasselbe gilt für Beträge, die in Metadaten wandern: Wenn Title oder Description eine Zahl tragen sollen, wird sie zur Build-Zeit aus derselben Funktion abgeleitet, aus der die Seite rechnet — nie hartkodiert. Sonst laufen Snippet und Seiteninhalt beim nächsten Parameter-Stichtag auseinander, und das Snippet ist die Fassung, die Google zeigt. Muster siehe Welle 114, sechs Brutto-Netto-Varianten (`const TITEL` / `const DESC` aus `n(1)` bzw. `n(3)` oberhalb von `export const metadata`).

### Pre-Phase-Pflicht

Vor jeder neuen Rechner-Sub-Welle: Component-Code-Upload + Config-Eintrag-Audit + Live-Audit der Seite. Daraus ergibt sich der individuelle Plan (nicht blind nach Schablone arbeiten — Lerneffekt aus W13.1).
