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

## Rechner-Bestand (139 gesamt)
| Kategorie | Anzahl |
|-----------|-------:|
| Alltag    | 21 |
| Finanzen  | 36 |
| Gesundheit| 18 |
| Auto      | 8  |
| Wohnen    | 22 |
| Mathe     | 17 |
| Arbeit    | 17 |

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

## Prompt-Verzeichnis (Stand: Prompt 78j)
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
