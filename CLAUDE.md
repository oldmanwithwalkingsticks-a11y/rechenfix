# CLAUDE.md — Rechenfix.de Projektregeln

## Pflicht bei JEDEM neuen Rechner
1. Lies ZUERST `/mnt/skills/user/rechner-builder/SKILL.md` und befolge ALLE 12 Steps
2. ALLE URLs müssen `https://www.rechenfix.de/` verwenden (MIT www!)
3. Sitemap, Canonical und OpenGraph: IMMER mit www
4. Sidebar-Count der Kategorie nach neuem Rechner erhöhen
5. Live-Berechnung ohne Submit-Button
6. Default-Werte für alle Eingabefelder
7. Input-Felder min. 48px Höhe

## Affiliate-System
- Komponente: `src/components/AffiliateBox.tsx`
- Max. 2 AffiliateBoxen pro Rechner
- "Anzeige"-Label Pflicht (deutsche Werbekennzeichnung)
- `rel="noopener noreferrer sponsored"` auf allen Affiliate-Links
- clickref = volle Seiten-URL via `usePathname()` Hook (NICHT window.location!)

## CHECK24-Affiliate: WICHTIG
- Deeplinks gehen auf **check24.net** (NICHT check24.de!)
- Nur 4 Deeplinks verfügbar: /strom/, /gas/, /kfz-versicherung/, /kredit/
- NICHT verfügbar: /baufinanzierung/, /umzug/, /depot/, /altersvorsorge/

## Affiliate-Programme (Awin)
| Programm | awinmid | Deeplink-Domain |
|----------|---------|-----------------|
| WISO Steuer | 17387 | buhl.de |
| smartsteuer | 15043 | steuererklaerung.smartsteuer.de |
| Lexware Office | 13787 | lexware.de |
| CHECK24 | 9364 | check24.net |
| congstar | 11938 | congstar.de |
| KS Auxilia | 108114 | keine Deeplinks |
| Verivox | 14797 | verivox.de |

## Keine Affiliate-Boxen in
- Gesundheits-Rechnern (sensibles Thema)
- Mathe/Schule-Rechnern (Schüler-Zielgruppe)
- Es sei denn, der Prompt sagt explizit etwas anderes

## Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Vercel Hosting
- Anthropic Claude API für "Fix erklärt"

## Projekt-Status (Stand April 2026)

- **170 eigenständige Rechner in 9 Kategorien** (Alltag 23, Finanzen 45, Gesundheit 18, Auto & Verkehr 10, Wohnen & Energie 25, Mathe & Schule 18, Arbeit & Recht 17, Kochen & Ernährung 12, Sport & Fitness 2)
- **178 Rechner-URLs** in der Sitemap (inkl. Varianten-Seiten wie `/finanzen/2000-euro-brutto-netto` bis `/5000-euro-brutto-netto` und `/finanzen/brutto-netto-tabelle`)
- **Domain:** `https://www.rechenfix.de` (immer mit www, 308-Redirect von nicht-www)
- **Stack:** Next.js 14 App Router, Tailwind, TypeScript, Vercel
- **Smoketest v3.1** mit 9 Checks (C1–C9) als Regressions-Sweep über alle Rechner-URLs, Pflicht nach jeder Änderung

## Config-Struktur
- Configs liegen aufgeteilt unter `lib/rechner-config/<kategorie>.ts` (`alltag.ts`, `finanzen.ts`, `gesundheit.ts`, `auto.ts`, `wohnen.ts`, `mathe.ts`, `arbeit.ts`). Die alte Single-File `rechner-config.ts` existiert nicht mehr.
- Jeder Rechner-Eintrag hat u. a. `metaDescription`. `openGraph.description` wird automatisch daraus abgeleitet — NICHT doppelt pflegen.
- Dynamische Route: ALLE Rechner laufen über `app/[kategorie]/[rechner]/page.tsx`. Es gibt KEINE einzelnen `page.tsx` pro Rechner. Wer nach `app/alltag/prozentrechner/page.tsx` sucht, sucht falsch.

## QA-Regeln für neue Rechner
- `metaDescription` MUSS ≤155 Zeichen sein (Google schneidet sonst ab). Länge vor Commit mit `node -e "console.log('...'.length)"` prüfen.
- KEIN Suffix `✓ Kostenlos. ✓ Mit KI-Erklärung.` — "kostenlos" natürlich in den Satz einflechten.
- `<AiExplain>`-Component ist Pflicht, wird innerhalb der Rechner-Komponente nach `<ErgebnisAktionen>` gerendert und rendert nur, wenn der `ergebnis`-State gefüllt ist.
- Smoke-Test-Script v2.1 existiert als Browser-Console-Script und sollte nach jedem Deploy über die betroffenen Routen laufen.

## Häufige Fehler vermeiden
- URLs ohne www in Sitemap/Canonical
- CHECK24-Links auf check24.de statt check24.net
- Fehlender "Fix erklärt" Button (AiExplain-Komponente)
- SEO-Text unter 600 Wörter
- FAQ unter 5 Fragen
- Schema.org vergessen (WebApplication + FAQPage + BreadcrumbList)
- `metaDescription` > 155 Zeichen
- Nach falscher Datei suchen: Rechner-Metadaten liegen in `lib/rechner-config/<kategorie>.ts`, nicht in `app/<kategorie>/<rechner>/page.tsx`.
- Custom-Toggle-Buttons statt `<RadioToggleGroup>`
- Custom-Button-Tabs statt `<TabGroup>`
- Selects ohne sichtbares `<label>`
- `text-gray-400` als Sekundärtextfarbe auf weißem Grund
- Ergebnis-Updates ohne aria-live-Region

## Accessibility (WCAG 2.1 AA)

rechenfix erfüllt WCAG 2.1 AA (Lighthouse ≥97 auf Referenzseiten, Stand April 2026).

### Farb-Regeln
- Text auf weiß: min. `text-gray-600`, NIE `-400` oder `-300`
- Akzent-Buttons mit weißem Text: immer `-600`-Varianten (`bg-green-600`, `bg-red-600`, `bg-amber-600`, `bg-blue-600`)
- Rote Beträge: `text-red-600` (nicht `-500`)

### A11y-Komponenten
- `<RadioToggleGroup>` (`components/ui/RadioToggleGroup.tsx`) — Werte-Auswahl mit 2–4 Optionen (native Radio-Inputs + Fieldset/Legend)
- `<TabGroup>` (`components/ui/TabGroup.tsx`) — Panel-Umschaltung (WAI-ARIA Tabs Pattern mit Roving Tabindex)
- Skip-Link im Root-Layout (`app/layout.tsx`, `href="#main-content"`)
- aria-live-Ergebnis-Pattern in `ErgebnisAktionen` (debounced, 750 ms)
- `<AiExplain>` Disclosure: `aria-expanded`, `aria-controls`, Fokus-Lenkung auf Panel + zurück zum Button

### Headings
H1 → H2 → H3 ohne Sprünge. Section-Titel sind H2, nicht H3.

### Vor Deploy
Lighthouse Accessibility ≥95 auf neuer/geänderter Seite.

### Barrierefreiheitserklärung
`/barrierefreiheit` wird gepflegt. Bei strukturellen A11y-Änderungen prüfen, ob Inhalte aktualisiert werden müssen.

## Zentrale Libs (Stand Sprint 1 / April 2026)

Tarif- und SV-relevante Rechner dürfen Parameter **nicht hartkodieren**, sondern nutzen die zentralen Libs:

- `lib/berechnungen/einkommensteuer.ts` — §32a EStG Tarifzonen 2024/2025/2026, Grundfreibeträge und Soli-Freigrenzen
- `lib/berechnungen/pflegeversicherung.ts` — PV-AN-Satz 2026, Kinderlos-Zuschlag und Kinderabschlag nach § 55 Abs. 3 SGB XI (PUEG 2023)
- `lib/berechnungen/lohnsteuer.ts` — Vorsorgepauschale §39b Abs. 4 EStG PAP-konform
- `lib/berechnungen/brutto-netto.ts` — orchestriert Lohnsteuer + SV + PV zum Netto

Die drei **Tarif-Rechner** (Brutto-Netto, Lohnsteuer, Einkommensteuer) sind eine Gruppe mit geteilter Berechnungslogik. Änderungen an zentralen Parametern wirken automatisch auf alle drei.

## Tarif-Parameter 2026 (Referenzwerte)

### Einkommensteuer-Tarif §32a EStG 2026
- Grundfreibetrag: **12.348 €**
- Zone-2-Formel (12.349 – 17.799 €): `(914,51 · y + 1.400) · y`, y = (zvE − 12.348) / 10.000
- Zone-3-Formel (17.800 – 69.878 €): `(173,10 · z + 2.397) · z + 1.034,87`, z = (zvE − 17.799) / 10.000
- Zone-4-Formel (69.879 – 277.825 €): `0,42 · x − 11.135,63`
- Zone-5-Formel (ab 277.826 €): `0,45 · x − 19.470,38`

### Sozialversicherung 2026 (AN-Anteile, bundeseinheitlich)
- RV: 9,3 % (BBG 101.400 €/Jahr)
- AV: 1,3 % (BBG 101.400 €/Jahr)
- KV allgemein: 7,3 % + Ø-Zusatzbeitrag 1,45 % = 8,75 % (BBG 69.750 €/Jahr)
- PV Standard: 1,8 %
- PV Kinderlos >23: 2,4 % (+0,6 %-Punkte)
- PV-Abschlag Kinder 2–5: je −0,25 %-Punkte → 1,55 % / 1,30 % / 1,05 % / 0,80 %
- PV ab 6 Kindern: 0,80 % (Kappung)

### Soli-Freigrenzen 2026
- Grundtarif: 20.350 € ESt
- Splittingtarif: 40.700 € ESt
- Milderungszone: 11,9 % auf ESt-Differenz, Obergrenze × 1,859375 der Freigrenze

## Gelernte Regeln (Sprint 1, April 2026)

1. **Input-Clamping**: HTML `min`/`max` reicht nicht. React-onChange-Handler muss aktiv klammern. Controlled component mit `value={state}`, nicht `defaultValue`. (Smoketest C3)

2. **Kinderfreibeträge ≠ Kinder unter 25**: Zwei getrennte Konzepte.
   - Kinderfreibeträge (§ 32 EStG): für Soli-Bemessung und ESt-Günstigerprüfung
   - Berücksichtigungsfähige Kinder unter 25 (§ 55 Abs. 3 SGB XI): für PV-Beitragsabschlag
   - Nie als gemeinsames Feld, immer zwei getrennte Inputs

3. **Smoketest v3 ist Pflicht** nach jedem Eingriff — auch bei scheinbar isolierten Änderungen. Der AdSense-`data-nscript`-Warning ist bekannter Noise (Fix parkt bis AdSense-Freigabe), alle anderen Warnings/Errors sind ernst zu nehmen.

4. **Live-Audits per web_fetch sind nicht Ground Truth**. Bei widersprüchlichen Befunden immer Inkognito-Browser-Check als maßgeblich nehmen.

5. **Referenz für Finanz-Rechner**: BMF-Steuerrechner (`bmf-steuerrechner.de/ekst/`) ist die amtliche Quelle für Lohn- und Einkommensteuer-Berechnungen.

## Gesperrte Prompts (Stand April 2026)

Folgende Prompts **dürfen nicht ausgeführt werden**, bis AdSense-Freigabe erfolgt:

- **Prompt 68** (Google CMP + Consent Mode v2) — CookieBanner.tsx bleibt bis dahin als primäres Consent-Tool
- **Prompt 85** (AdSense-Script ohne `data-nscript`-Warning) — Script-Loader-Änderung könnte AdSense-Review beeinträchtigen

Reihenfolge nach Freigabe: erst 85 (Warning wegräumen), dann 68 (CMP dazu).

## Prompt-Verzeichnis (Stand: Batch 41)
- **70a–70d** — Meta-Description Kürzung (Alltag, Arbeit/Auto, Finanzen, Gesundheit/Mathe) ✅
- **71a/71b** — entfallen
- **72** — Live-Verifikation aller 16 gekürzten Meta-Descriptions ✅
- **73** — Meta-Description `/ueber-uns` gekürzt ✅
- **74** — CLAUDE.md aktualisiert ✅
- **78a** — Accessibility: Farbkontraste WCAG 2.1 AA ✅
- **78b** — Accessibility: Heading-Hierarchie ✅
- **78c** — Accessibility: Select-Labels (htmlFor) ✅
- **78d** — Accessibility: Skip-Link ✅
- **78e** — Accessibility: aria-live-Region für Live-Ergebnisse ✅
- **78f** — Accessibility: RadioToggleGroup (Custom-Toggles → native Radios) ✅
- **78g** — Accessibility: Barrierefreiheitserklärung `/barrierefreiheit` ✅
- **78g-hotfix** — Schlichtungsverfahren aus BfE entfernt ✅
- **78h** — Accessibility: TabGroup (WAI-ARIA Tabs Pattern) ✅
- **78i** — Dokumentations-Update nach A11y-Offensive ✅
- **78j** — Accessibility: Fokus-Lenkung "Fix erklärt" Disclosure ✅
- **Batch 39** — Kochen: Pizzateig-Rechner + Brotback-Rechner (Bäckerprozente) ✅
- **Batch 40** — Kochen: Alkoholgehalt-Rechner + Nährwert-Rechner ✅
- **Batch 41** — Kochen: Zucker-Umrechner + Gefrierdauer-Rechner ✅
