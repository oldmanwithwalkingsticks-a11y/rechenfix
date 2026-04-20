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
| hotel.de | 16018 | hotel.de |
| burda-vergleicht (Zahnzusatz) | 121064 | zahn.burda-vergleicht.de |
| Eventfloss Berlin | 27722 | eventfloss-berlin.de |
| Nature's Way | 47173 | naturesway.de |

## Affiliate-Platzierungs-Regel (Stand April 2026, Prompt 106)
Affiliate ist erlaubt, wenn **thematischer Match** zum Rechner besteht. Entscheidung pro Rechner, nicht pauschal pro Kategorie.
- ✅ Zahnzusatz auf Gesundheits-Rechnern mit thematischer Brücke (Raucher → Parodontitis, Schlaf → Bruxismus) — erlaubt
- ❌ Finanzwerbung (Kredit, Steuer-Software, Versicherung) auf Gesundheits-Rechnern — verboten
- ❌ Mathe/Schule bleibt komplett ohne Affiliate (kein Kaufintent bei Schul-/Studium-Traffic)
- Max. 2–3 AffiliateBoxen pro Rechner, erste `full`, weitere `compact`
- Pflege zentral in `components/AffiliateBox.tsx` (Programme + `CONTEXT_TEXTS` + `CONTEXT_DEEPLINKS`), Platzierung pro Rechner-Komponente als JSX nach `AiExplain`/`ErgebnisAktionen`

## Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Vercel Hosting
- Anthropic Claude API für "Fix erklärt"

## Projekt-Status (Stand April 2026)

- **169 eigenständige Rechner in 9 Kategorien** (Alltag 23, Finanzen 45, Gesundheit 17, Auto & Verkehr 10, Wohnen & Energie 25, Mathe & Schule 18, Arbeit & Recht 17, Kochen & Ernährung 12, Sport & Fitness 2)
- **177 Rechner-URLs** in der Sitemap (inkl. Varianten-Seiten wie `/finanzen/2000-euro-brutto-netto` bis `/5000-euro-brutto-netto` und `/finanzen/brutto-netto-tabelle`)
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

## SSOT-Patterns (bewährt, seit April-Audit 2026)

Wiederkehrende Muster, die bei neuen oder zu refactorenden Rechnern als Kopiervorlage dienen:

### Splittingtarif-Toggle
Wenn ein Rechner Nutzer mit möglicher Zusammenveranlagung erreicht (GF, Freiberufler, Arbeitnehmer):
- State `splitting: boolean`, Default `false` (Grundtarif)
- UI: Radio-Buttons "Ledig / getrennt veranlagt" vs. "Verheiratet, Zusammenveranlagung"
- ESt: `splitting ? 2 * berechneEStGrund(zvE / 2, 2026) : berechneEStGrund(zvE, 2026)`
- Soli: `berechneSoli(est, splitting, 2026)` — der zweite Parameter greift die Splittingtarif-Freigrenze 40.700 € ab

Referenz-Implementation: [components/rechner/GmbhGfRechner.tsx](components/rechner/GmbhGfRechner.tsx) (seit Prompt 99b)

### Bundesland-Dropdown für KiSt
Jeder Rechner mit KiSt-Anzeige braucht Bundesland-Input:
- State `bundesland: Bundesland`, Default `'Nordrhein-Westfalen'`
- 16-Länder-Dropdown, erscheint konditional nur wenn Kirche=Ja
- `berechneKirchensteuerByBundesland(est, bundesland)` ersetzt hartkodierte `est * 0.09`
- Label-Dynamisierung: `Ja (${kistSatzProzent} %)` statt fix "Ja (9 %)"

Referenz-Implementation: [components/rechner/GmbhGfRechner.tsx](components/rechner/GmbhGfRechner.tsx), [components/rechner/SteuerprogressionsRechner.tsx](components/rechner/SteuerprogressionsRechner.tsx)

### Differenz-Methode für Steuer-/Soli-Ersparnis
Bei Rechnern, die Steuerersparnis durch Absetzungen prognostizieren (Spenden, Werbungskosten, Altersvorsorge):
- **Nicht:** `steuerersparnisSoli = estErsparnis * 0.055` (ignoriert Freigrenze, überschätzt an der Schwelle)
- **Sondern:** `soliVoll = berechneSoli(estVoll, ...) - soliNachAbzug = berechneSoli(estNachAbzug, ...)`
- Funktioniert analog für KiSt: `berechneKirchensteuerByBundesland(estVoll, bundesland) - berechneKirchensteuerByBundesland(estNachAbzug, bundesland)`

Referenz-Implementation: [lib/berechnungen/spenden.ts](lib/berechnungen/spenden.ts) (seit Prompt 100)

### Individuelle Pauschalen als Eingabefeld
Pauschal-Werte mit hoher individueller Variation (PKV-Beitrag, Nebenjob-Netto) sollten als Eingabefeld realisiert werden:
- State mit realistischem Default (z. B. `'650'` für PKV)
- Hint-Text zur Bandbreite
- Min/Max plausibel, step passend

Referenz-Implementation: PKV-Beitrag in [components/rechner/GmbhGfRechner.tsx](components/rechner/GmbhGfRechner.tsx) (seit Prompt 99c)

## UI-Regeln für Rechner-Kacheln (Prompt 96/96a)

- **Keine `transform`/`scale`/`translate`-Hover-Effekte auf Karten-artigen Elementen.** Der Browser promotet transformierte Elemente auf eine Compositor-Ebene und rendert Text dort mit Subpixel-Antialiasing → sichtbarer Text-Blur während der Transition. Auch `translateY(-2px)` ist betroffen.
- **Nur Shadow-Animation für Elevation-Effekte.** Der "Anheben"-Eindruck entsteht allein durch einen verstärkten Schatten — das Auge liest größeren Schatten als "höher schwebend", ohne dass sich Pixel bewegen müssen.
- Hover-Effekte müssen `:focus-visible` mit abdecken (Tastatur-A11y).
- Die zentrale `.card`-Utility-Klasse in `app/globals.css` ist die Referenz-Implementierung: transition nur auf `box-shadow` + `border-color`, identischer Effekt für `:hover` und `:focus-visible`.
- `prefers-reduced-motion: reduce` nicht mehr nötig, sobald kein Transform beteiligt ist (Schatten sind kein Bewegungsreiz).

## Zentrale Libs (SSOT)

Alle jahresabhängigen und gesetzlich definierten Werte liegen in `lib/berechnungen/`. Rechner, Komponenten und Config-Dateien MÜSSEN von dort importieren — niemals Werte lokal hartcodieren, wenn eine zentrale Konstante existiert.

| Lib | Zweck | Wichtigste Exports |
|---|---|---|
| `einkommensteuer.ts` | § 32a EStG 2024/2025/2026, Soli-Freigrenzen | `berechneEStGrund(zvE, jahr)`, `PARAMS[jahr]` |
| `lohnsteuer.ts` | LSt nach § 39b PAP, Vorsorgepauschale | `berechneLohnsteuerJahr(brutto, steuerklasse, jahr)` |
| `brutto-netto.ts` | BBG KV/PV/RV, Gesamtberechnung Netto | `BBG_KV_MONAT`, `BBG_RV_MONAT`, `berechneBruttoNetto(...)` |
| `sv-parameter.ts` | GKV-Zusatzbeitrag Ø, JAEG | `KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026`, `JAEG_2026_JAHR`, `JAEG_2026_MONAT` |
| `kindergeld.ts` | Kindergeld + Günstigerprüfung | `KINDERGELD_2026`, `berechneKindergeld(...)` |
| `duesseldorfer-tabelle.ts` | Unterhalt, Mindestbedarf DT 2026 | Mindestbedarfsätze, `KINDERGELD_2026`, `KINDERGELD_HAELFTIG_2026` |
| `pflegeversicherung.ts` | PV-Kinderabschlag SGB XI § 55 | Staffel 1,55 / 1,30 / 1,05 / 0,80 % |
| `mindestlohn.ts` **(neu, 04/2026)** | § 1 MiLoG mit Stichtag-Switch | `MINDESTLOHN`, `getAktuellerMindestlohn(stichtag)`, `MINIJOB_GRENZE_MONAT` |
| `rente.ts` **(erweitert, 04/2026)** | Aktueller Rentenwert § 68 SGB VI | `RENTENWERT`, `getAktuellerRentenwert(stichtag)` |
| `pfaendung.ts` **(erweitert, 04/2026)** | § 850c ZPO mit Stichtag-Switch | `getAktuellePfaendungsParameter(stichtag)`, `PFAENDUNG_2025`, `PFAENDUNG_2026` |
| `minijob.ts`, `midijob.ts` | Geringfügigkeitsgrenze, Übergangsbereich | aus `mindestlohn.ts` abgeleitet |
| `steuerprogression.ts` | Grenz-/Durchschnittssteuersatz | nutzt `einkommensteuer.ts` |
| `kfz-steuer.ts`, `balkon-solar.ts`, `waermepumpe.ts` | Domänen-spezifisch | |

**Verboten:** Eigene ESt-, LSt-, SV-, Kindergeld-, Pfändungs- oder Mindestlohn-Formeln in Komponenten oder Rechnern. Immer die zentrale Lib importieren. Diese Regel ergab sich aus Sprint 1 (April 2026) und wurde im Jahresaudit 2026 (Prompts 86–91) nochmal bestätigt, als in fünf Rechnern Formel-Duplikate mit 1–2 Jahre veralteten Werten gefunden wurden.

**Konkret verbotene Muster (Audit-Welle 1, Prompts 94–95):**

- Eigene ESt-/LSt-Tariftabellen (Zonen, Grundfreibetrag, Progressionsformeln) — immer `berechneEStGrund(zvE, jahr)` aus `einkommensteuer.ts`
- Eigene Soli-Berechnungen (insb. harte Schwellen wie `est > 20350 ? est * 0.055 : 0`) — immer `berechneSoli(est, splittingtarif, jahr)` mit Milderungszone
- Eigene Kirchensteuer-Logik — immer `berechneKirchensteuerByBundesland(est, bundesland)` (8 % BY/BW, 9 % sonst)
- Eigene Rentenwert-Konstanten wie `RENTENWERT_2026 = 40.79` — immer `getAktuellerRentenwert()` aus `rente.ts` mit Stichtag-Switch
- Eigene BBG-Werte (`const BBG_MONAT = 5812.5`) — immer `BBG_KV_MONAT` / `BBG_RV_MONAT` aus `brutto-netto.ts`
- Eigene Kinderfreibetrag-Werte — immer `KIFB_GESAMT_ZUSAMMEN_2026` (9.756 €) / `KIFB_GESAMT_EINZEL_2026` (4.878 €) aus `kindergeld.ts`
- Eigene Steuerklassen-Faktor-Arrays für Fünftelregelung o.ä. — **§ 34 EStG kennt keinen solchen Faktor.** Die Fünftelregelung wirkt auf zvE, die Steuerklasse spielt bei der ESt-Veranlagung keine Rolle. Bei verheiratet → Splittingtarif (`berechneEStGrund(zvE/2) × 2`), sonst Grundtarif. Mehr nicht.

Jede Verletzung dieser Regeln ist ein P1-Bug wie die im April 2026 gefundenen. Vor jedem Commit greppen:
```bash
grep -E "12348|17799|69878|40\.79|42\.52|9756|6828|2928|259|0\.38|5812\.50|8450|51944|13\.90" lib/berechnungen/<neue-lib>.ts
```
Treffer = Refactor auf zentrale Lib-Imports, bevor der PR aufmacht.

Die drei **Tarif-Rechner** (Brutto-Netto, Lohnsteuer, Einkommensteuer) sind eine Gruppe mit geteilter Berechnungslogik. Änderungen an zentralen Parametern wirken automatisch auf alle drei.

## Stichtag-Switch-Pattern

Für Werte, die sich unterjährig ändern (Rentenanpassung zum 01.07., Pfändungstabelle zum 01.07., Mindestlohn zum 01.01.), wird das folgende Pattern genutzt:

```ts
export const WERT_BIS_STICHTAG = 1234.56;
export const WERT_AB_STICHTAG  = 1345.67;

export function getAktuellerWert(stichtag: Date = new Date()): number {
  const switchDatum = new Date(2026, 6, 1); // 01.07.2026 (Monat 0-indexiert!)
  return stichtag >= switchDatum ? WERT_AB_STICHTAG : WERT_BIS_STICHTAG;
}

// Backwards-Compat: bestehende Konsumenten bekommen tagesaktuellen Wert
export const WERT = getAktuellerWert();
```

**Gründe für dieses Pattern:**
- Neuer Wert kann Wochen vor Inkrafttreten vorab eingepflegt werden (keine Jahreswechsel-Panik).
- Rechner kann über optionalen Stichtag-Parameter "Heute" vs. "Nach Switch" anzeigen.
- Unit-Tests möglich (Stichtag injizierbar).
- Kein "aktiver Bug seit X Monaten"-Szenario, weil der Switch deterministisch greift.

**Aktuell mit Stichtag-Switch:** `mindestlohn.ts` (01.01.2027), `rente.ts` (01.07.2026), `pfaendung.ts` (01.07.2026).

**Regel:** Bei jedem neuen unterjährigen Wechsel dieses Pattern anwenden — nicht einen nackten Kommentar "// TODO: Wert zum 01.07. ändern" hinterlegen.

## Aktueller Rechtsstand (Stand April 2026)

| Parameter | Wert | Stichtag nächste Änderung | Zentrale Lib | Rechtsgrundlage |
|---|---|---|---|---|
| Grundfreibetrag ESt | 12.348 € | vermutlich 01.01.2027 | `einkommensteuer.ts` (Konstante `GRUNDFREIBETRAG_2026` seit Prompt 101) | § 32a EStG |
| ESt-Zonengrenzen | 17.799 / 69.878 / 277.826 € | 01.01.2027 | `einkommensteuer.ts` | § 32a EStG |
| Soli-Freigrenze Grundtarif | 20.350 € | offen | `einkommensteuer.ts` | § 4 SolzG |
| Soli-Freigrenze Splittingtarif | 40.700 € | offen | `einkommensteuer.ts` | § 4 SolzG |
| Soli-Milderungsgrenze | 37.838 € (Grundtarif × 1,859375) | offen | `einkommensteuer.ts` | § 4 SolzG |
| Werbungskostenpauschale | 1.230 € **pro Partner!** (zentrale Konstante seit Prompt 99c) | offen | `einkommensteuer.ts` (`WK_PAUSCHALE_AN_2026`) | § 9a EStG |
| SV-Sätze AN (zentrale Konstanten) | KV 7,3 % / RV 9,3 % / AV 1,3 % | selten | `brutto-netto.ts` (`KV_BASISSATZ_AN_2026`, `RV_SATZ_AN_2026`, `AV_SATZ_AN_2026`) | §§ 241/158 SGB V/VI, § 341 SGB III |
| Sonderausgabenpauschale | 36 € **pro Partner** | offen | — (in Rechnern inline) | § 10c EStG |
| Kindergeld | 259 € / Kind / Monat | offen | `kindergeld.ts` | § 66 EStG |
| Kinderfreibetrag sächlich (zusammen) | 6.828 € | vermutlich 01.01.2027 | `kindergeld.ts` | § 32 Abs. 6 EStG |
| BEA-Freibetrag (zusammen) | 2.928 € (seit 2021 unverändert) | keine bekannt | `kindergeld.ts` | § 32 Abs. 6 EStG |
| Kinderfreibetrag gesamt (zusammen) | **9.756 €** | vermutlich 01.01.2027 | `kindergeld.ts` als `KIFB_GESAMT_ZUSAMMEN_2026` | § 32 Abs. 6 EStG |
| Kinderfreibetrag gesamt (einzeln, pro Elternteil) | **4.878 €** | vermutlich 01.01.2027 | `kindergeld.ts` als `KIFB_GESAMT_EINZEL_2026` | § 32 Abs. 6 EStG |
| Mindestlohn | 13,90 €/h (ab 01.01.2027: 14,60 €) | **01.01.2027 Switch automatisch** | `mindestlohn.ts` | MiLoG |
| Minijob-Grenze | 603 € / Monat (Jahr: 7.236 €) | 01.01.2027 auf 633 € | `mindestlohn.ts` | § 8 SGB IV |
| Midijob-Untergrenze | 603,01 € / Monat | 01.01.2027 | `mindestlohn.ts` | § 20 SGB IV |
| BBG KV/PV | 5.812,50 € / Monat (69.750 € / Jahr) | 01.01.2027 | `brutto-netto.ts` als `BBG_KV_MONAT` | SV-RechengrößenVO 2026 |
| BBG RV (einheitlich) | 8.450 € / Monat (101.400 € / Jahr) | 01.01.2027 | `brutto-netto.ts` als `BBG_RV_MONAT` | SV-RechengrößenVO 2026 |
| JAEG / Versicherungspflichtgrenze | 77.400 € / Jahr (6.450 € / Monat) | 01.01.2027 | `sv-parameter.ts` als `JAEG_2026_*` | BMG |
| GKV allgemeiner Beitragssatz | 14,6 % | offen | `sv-parameter.ts` | § 241 SGB V |
| GKV-Zusatzbeitrag Ø | 2,9 % (AN-Anteil 1,45 %) | offen | `sv-parameter.ts` | § 242a SGB V |
| PV-Beitrag AN-Anteil | 1,8 % (Standard) / 2,4 % (kinderlos >23) | offen | `pflegeversicherung.ts` | § 55 SGB XI |
| PV-Kinderabschlag ab Kind 2 | 1,55 / 1,30 / 1,05 / 0,80 % | offen | `pflegeversicherung.ts` | § 55 Abs. 3 SGB XI (PUEG 2023) |
| Rentenwert | 40,79 € (ab 01.07.2026: 42,52 €) | **01.07.2026 Switch automatisch** | `rente.ts` als `getAktuellerRentenwert()` | § 68 SGB VI, BMAS 05.03.2026 |
| Durchschnittsentgelt | 51.944 € (vorläufig) | 01.01.2027 | `rente.ts` | Anlage 1 SGB VI |
| Witwenrente-Grundfreibetrag-Faktor | 26,4 × Rentenwert (Kind: +5,6 × Rentenwert) | bleibt | Formel inline, Rentenwert aus `rente.ts` | § 97 SGB VI + Anlage 1 |
| Pfändungs-Grundfreibetrag | 1.555,00 € (ab 01.07.2026: 1.587,40 €) | **01.07.2026 Switch automatisch** | `pfaendung.ts` | § 850c ZPO, BGBl. 2026 I Nr. 80 |
| Pendlerpauschale | **einheitlich 0,38 €/km ab 1. km** (seit 01.01.2026) | keine bekannt | `pendlerpauschale.ts` als `PENDLERPAUSCHALE_SATZ_2026` | § 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025 |
| Pendlerpauschale-Höchstbetrag (Nicht-PKW) | 4.500 € / Jahr | keine | `pendlerpauschale.ts` | § 9 Abs. 1 Nr. 4 Satz 2 EStG |
| Homeoffice-Pauschale | 6 € / Tag, max. 210 Tage | offen | `pendlerpauschale.ts` | § 4 Abs. 5 Nr. 6c EStG |
| Unterhalt DT 2026 Mindestbedarf | 486 / 558 / 653 / 698 € | 01.01.2027 | `duesseldorfer-tabelle.ts` | Düsseldorfer Tabelle |
| Deutschlandticket | 63 €/Monat | offen | Inline | seit 01.01.2026 |

**Stichtag-Switch automatisch:** Die drei fett markierten Parameter (Rentenwert 01.07.2026, Mindestlohn 01.01.2027, Pfändung 01.07.2026) wechseln ohne Deploy durch das Stichtag-Switch-Pattern in den Libs. Nach den Stichtagen nur Spot-Check.

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

6. **Lokaler Build-Check: immer `npm run build`, nie nur `npx next build`** (Prompt 104, April 2026). Das Repo hat einen `prebuild`-Hook, der `scripts/generate-client-data.ts` ausführt und `lib/rechner-config/client-data.ts` regeneriert. `npx next build` überspringt den Hook, wodurch sich Inkonsistenzen zwischen dem commited `client-data.ts` und dem aktuellen Stand in `lib/rechner-config/index.ts` lokal nicht zeigen — aber Vercel schlägt Alarm (`npm run build` dort). Folge: TS-Fehler im Vercel-Build für einen vorherigen Commit, der lokal grün war. Konkret passiert bei neuen Feldern in `KategorieConfig`/`RechnerConfig`, die im Generator-Inline-Interface nicht mit-ergänzt wurden. Fix-Pattern: Generator mappt explizit „light" Felder, Interface in der generierten Datei passt dazu.

## Unterhaltsrechner — Parameter 2026

**Zentrale Konstanten in `lib/berechnungen/duesseldorfer-tabelle.ts`:**
- Mindestbedarf 2026: 486 / 558 / 653 / 698 € (Altersstufen 0–5 / 6–11 / 12–17 / 18+)
- Kindergeld 2026: **259 €** (hälftig **129,50 €** exakt — nicht vorher runden!)
- Einkommensgruppen: 15 Stufen, Basis bis 2.100 € (100 %), Spitze ab 9.701 € (170 %)
- Selbstbehalt Kindesunterhalt (unverändert 2025→2026): 1.450 € erwerbstätig / 1.200 € nicht erwerbstätig / 1.750 € nicht-privilegiert
- Selbstbehalt Elternunterhalt NEU 2026 (BGH XII ZB 6/24): 2.650 € Kind / 2.120 € Ehegatte, 70 % des Mehreinkommens anrechnungsfrei
- Rundung: Tabellenwert und Zahlbetrag via `Math.ceil` auf volle Euro (DT-Regel), Elternunterhalt via `Math.floor` (zugunsten des Pflichtigen)

**Logik-Invarianten:**
- Volljähriges Kind (18+): einheitlicher Tabellenwert 698 €, unabhängig von Alter 18 oder 30. Der Erstausbildungs-Status ändert NUR die Kindergeld-Berechtigung, nicht den Tabellenwert.
- Höherstufung bei Kinderzahl ≠ 2: Opt-in, Default aus. +1 Gruppe bei 1 Kind, −1 Gruppe bei 3+ Kindern.
- Testfälle dokumentiert in `scripts/verify-unterhalt-2026.ts` (T1–T7, alle cent-genau).

**Rechtsquellen:**
- DT 2026: OLG Düsseldorf, gültig ab 01.01.2026
- Kindergeld: § 66 EStG
- Mindestunterhalt: § 1612a BGB + Mindestunterhaltsverordnung
- Elternunterhalt: BGH XII ZB 6/24 v. 23.10.2024

## Architektur-Regeln

### Footer — Ein Footer, dynamische Zahlen (Prompt 107b)
Genau eine Footer-Komponente site-weit: [components/layout/Footer.tsx](components/layout/Footer.tsx), ausschließlich vom Root-Layout ([app/layout.tsx](app/layout.tsx)) gerendert. Rechner- und Kategorie-Zahlen werden dynamisch aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) berechnet — nie hartcodiert.

Lint-Guard: `npm run lint:footer` ([scripts/check-footer.mjs](scripts/check-footer.mjs)) prüft beides:
- `footer-uniqueness`: genau 1 Footer-Datei in `{app,components}/**/*Footer*.{ts,tsx}` (ohne `.test.`, `.stories.`, `.d.ts`)
- `footer-hardcoded-count`: Footer-Content enthält kein Muster `<Zahl> Rechner in <Zahl> Kategorien`

## Architektur-Notes (dokumentierte technische Schulden)

### Zirkulärer Import brutto-netto ↔ lohnsteuer
**Status:** bekannt, seit Prompt 101. BBG-Werte in [lib/berechnungen/lohnsteuer.ts](lib/berechnungen/lohnsteuer.ts) bleiben inline (`101400` / `69750`), weil ein direkter Import aus `brutto-netto.ts` einen Zyklus erzeugen würde — `brutto-netto.ts` konsumiert bereits `berechneLohnsteuerJahr` aus `lohnsteuer.ts`.

**Saubere Lösung (nicht umgesetzt):** BBG-Konstanten in eine eigene Datei `lib/berechnungen/bbg.ts` auslagern, aus der sowohl `brutto-netto.ts` als auch `lohnsteuer.ts` konsumieren. Breche die Abhängigkeitskette an der richtigen Stelle.

**Warum nicht jetzt:** Architektur-Change würde mehrere Dateien berühren und müsste über einen dedizierten Refactor-Prompt laufen. Kandidat für Ausführung, wenn die nächste BBG-Änderung ansteht (vermutlich 01.01.2027).

**Workaround bis dahin:** Beim jährlichen Audit (Dezember) **beide Stellen** synchron aktualisieren. Im [docs/jahreswerte-kalender.md](docs/jahreswerte-kalender.md) als "BBG hat Doppel-Pflege"-Eintrag dokumentieren.

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
- **86** — Jahresparameter-Audit 2026 (Grep-basiert, Report `docs/jahresparameter-audit-2026-04.md`) ✅
- **87** — Bug-Fix-Batch 1–8: 4 Sekundär-Rechner auf zentrale Libs, Soli-Freigrenze in `kindergeld.ts`, Rentenwert-Stichtag-Switch ✅
- **88** — Mindestlohn 12,82 → 13,90 €, neue SSOT `mindestlohn.ts` mit 2027-Switch auf 14,60 € ✅
- **89** — Kindergeld 255 → 259 € Metadaten-Batch (13 Stellen) ✅
- **90** — Hilfetext-Batch H1/H3/H5/H9–H12 (BBG, JAEG 77.400 €, Zusatzbeitrag 2,9 %, D-Ticket 63 €, Zigaretten 2026) ✅
- **91** — Pfändungstabelle 01.07.2026 vorab via Stichtag-Switch (BGBl. 2026 I Nr. 80) ✅
- **92** — Doku-Sync CLAUDE.md / Projekt-Referenz / SKILL.md nach Audit 2026 ✅
- **93** — RentenRechner UX: Rentenwert prominent + Stichtag-Callout 01.07.2026 ✅
- **94** — SSOT Steuer-Rechner: Splitting/Kindergeld/Abfindung auf zentrale Libs; erfundener Steuerklassen-Faktor in abfindung.ts gelöscht; Soli-Milderungszone zentral ✅
- **94a** — Stufe-1-Bugfixes: Pendlerpauschale einheitlich 0,38 €/km (Reform 2026), Kifb von erfundenen 15.612 € auf korrekte 9.756 €, Splitting WK+SA pro Partner ✅
- **95** — Stufe-2 SV-Bugfixes: Witwenrente-Rentenwert 39,32→`getAktuellerRentenwert`, ALG-Soli mit Freigrenze/Milderung, Rentenrechner BBG-Hinweis, Krankengeld-BBG und Rente-ESt auf zentrale Libs ✅
- **96** — `.card` Hover-Utility um `focus-visible` + `prefers-reduced-motion` erweitert ✅
- **96a** — Transform aus `.card` Hover entfernt, reine Shadow-Animation (Text bleibt scharf) ✅
- **97** — Doku-Sync nach Welle-1-Audit (CLAUDE.md + SKILL.md + Projekt-Referenz) ✅
- **98** — Jahreswerte-Kalender als Governance-Dokument (`docs/jahreswerte-kalender.md`) ✅
- **99** — Pre-Deploy-Lint-Script `scripts/check-jahreswerte.mjs` ✅
- **99a** — GmbhGfRechner Soli-Milderungszone (P1, durch Lint entdeckt) ✅
- **99b** — GmbhGfRechner Splittingtarif-Toggle + SV-Sätze/KiSt SSOT ✅
- **99c** — WK-Pauschale SSOT (7 Dateien) + Lint `contextKeywords` + PKV-Beitrag Eingabefeld ✅
- **100** — Stufe-1.5 P1-Pass: steuererstattung Pendler 0,38 + Tarif, nebenjob Soli+§32a+KiSt, spenden Differenz-Methode ✅
- **101** — Stufe-1.5 SSOT-Konsolidierung: Soli-Lint, KiSt-Bundesland Steuerprogression, 5 Libs refactored ✅
- **102** — Doku-Delta-Sync nach Stufe 1.5 (CLAUDE.md + SKILL + Projekt-Referenz) ✅
- **107b** — Lint-Guards `lint:footer` (footer-uniqueness + footer-hardcoded-count), Guard G14 ✅
