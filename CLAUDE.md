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

## Amazon Partner-Programm (seit 22.04.2026, Prompt 122-amazon)

Separates Partnerprogramm außerhalb von Awin. Tag-ID: **`rechenfix-21`**. Mechanik: keyword-basierte Suchlinks (keine festen ASINs, selbstheilend), Ziel-Domain `amazon.de`.

- **Komponente:** [`components/AmazonBox.tsx`](components/AmazonBox.tsx) — unabhängig von `AffiliateBox`, weil Amazon eine andere Mechanik hat (Tag statt Publisher-ID, Suchlink statt Deeplink)
- **Helper:** [`lib/amazon-link.ts`](lib/amazon-link.ts) — `createAmazonSearchLink(keyword, marketingConsentGranted)`. Tag `rechenfix-21` wird **nur** bei erteiltem Marketing-Consent angehängt; ohne Consent bleibt der Link funktionsfähig, aber ohne Provision
- **Pflicht-Footer-Hinweis:** „Als Amazon-Partner verdiene ich an qualifizierten Verkäufen." — sichtbar auf jeder Seite, Teilnahmebedingung nicht optional
- **Datenschutzerklärung:** Abschnitt 9b Amazon-Partnerprogramm in [`app/datenschutz/page.tsx`](app/datenschutz/page.tsx)
- **Cookie-Banner:** Marketing-Kategorie erweitert um „Amazon Associates" mit expliziter Tag-Nennung
- **Einsatz-Kategorien:** Kochen, Sport, Auto, Wohnen, Alltag, Arbeit. **Verboten** auf Gesundheit/Finanzen/Mathe (analog Awin-Platzierungsregel)
- **Integrierte Rechner (Stand 22.04.2026):** 16 — siehe [`docs/amazon-integration.md`](docs/amazon-integration.md) für vollständige Tabelle mit Keywords und Platzierungs-Pattern
- **Frist:** Erster qualifizierter Referral bis ca. 19.10.2026 (180-Tage-Uhr), sonst Account-Schließung durch Amazon
- **Selbstbezug verboten:** Keine Käufe über eigene Affiliate-Links, auch nicht für Familie im selben Haushalt. Testklicks im Inkognito ohne Marketing-Consent (Tag wird nicht übermittelt)

## Affiliate-Platzierungs-Regel (Stand April 2026, Prompt 106)
Affiliate ist erlaubt, wenn **thematischer Match** zum Rechner besteht. Entscheidung pro Rechner, nicht pauschal pro Kategorie.
- ✅ Zahnzusatz auf Gesundheits-Rechnern mit thematischer Brücke (Raucher → Parodontitis, Schlaf → Bruxismus) — erlaubt
- ❌ Finanzwerbung (Kredit, Steuer-Software, Versicherung) auf Gesundheits-Rechnern — verboten
- ❌ Mathe/Schule bleibt komplett ohne Affiliate (kein Kaufintent bei Schul-/Studium-Traffic)
- Max. 2–3 AffiliateBoxen pro Rechner, erste `full`, weitere `compact`
- Pflege zentral in `components/AffiliateBox.tsx` (Programme + `CONTEXT_TEXTS` + `CONTEXT_DEEPLINKS`), Platzierung pro Rechner-Komponente als JSX nach `AiExplain`/`ErgebnisAktionen`

**Neue Partner (April 2026, Prompt 106):** hotel.de (MID 16018), burda-Zahnzusatz (MID 121064), eventfloss-berlin (MID 27722). Vollständige MID-Tabelle und Platzierungs-Zuordnung pro Rechner: siehe [rechenfix-projekt-referenz.md](rechenfix-projekt-referenz.md) → Abschnitt „Affiliate-System".

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

### Berechnungs-interne Helfer in `_helpers.ts`
Helfer, die nur innerhalb der `lib/berechnungen/`-Schicht benötigt werden (Rundungen, kalendarische Durchschnitte, Formel-Bausteine) wandern in [lib/berechnungen/_helpers.ts](lib/berechnungen/_helpers.ts). Der Unterstrich-Prefix signalisiert: privates Modul, keine direkten Imports aus Rechner-Komponenten. Seit Prompt 113 enthält die Datei `rundeBuRlGKonform` (§ 5 Abs. 2 BUrlG) und `WOCHEN_PRO_MONAT` (52/12). Rechner-Komponenten importieren über die jeweilige Domain-Lib (z. B. `teilzeit.ts`, `urlaubstage.ts`, `stundenlohn.ts`).

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
| `lohnsteuer.ts` | Delegate-Wrapper auf Voll-PAP; `berechneVorsorgepauschale2026` (§ 39b Abs. 4 EStG) bleibt als Export | `berechneLohnsteuerJahr(brutto, steuerklasse, jahr, vorsorge?)`, `berechneLohnsteuer(...)`, `berechneVorsorgepauschale2026` |
| `_lohnsteuer-pap-2026.ts` **(neu, Prompt 118)** | Voll-PAP § 39b EStG via 1:1-Port des offiziellen ITZBund-XML-Pseudocodes. BigDecimal via `decimal.js`. Δ=0 € an allen 20 BMF-Stützpunkten. | `LohnsteuerPAP2026` (Klasse), `berechneLohnsteuerPAP2026(params)` |
| `brutto-netto.ts` | BBG KV/PV/RV, Gesamtberechnung Netto | `BBG_KV_MONAT`, `BBG_RV_MONAT`, `berechneBruttoNetto(...)` |
| `sv-parameter.ts` | GKV-Zusatzbeitrag Ø, JAEG | `KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026`, `JAEG_2026_JAHR`, `JAEG_2026_MONAT` |
| `kindergeld.ts` | Kindergeld + Günstigerprüfung | `KINDERGELD_2026`, `berechneKindergeld(...)` |
| `duesseldorfer-tabelle.ts` | Unterhalt, Mindestbedarf DT 2026 | Mindestbedarfsätze, `KINDERGELD_2026`, `KINDERGELD_HAELFTIG_2026` |
| `pflegeversicherung.ts` | PV-Kinderabschlag SGB XI § 55 | Staffel 1,55 / 1,30 / 1,05 / 0,80 % |
| `mindestlohn.ts` **(neu, 04/2026)** | § 1 MiLoG mit Stichtag-Switch | `MINDESTLOHN`, `getAktuellerMindestlohn(stichtag)`, `MINIJOB_GRENZE_MONAT` |
| `rente.ts` **(erweitert, 04/2026)** | Aktueller Rentenwert § 68 SGB VI | `RENTENWERT`, `getAktuellerRentenwert(stichtag)` |
| `pfaendung.ts` **(erweitert, 04/2026)** | § 850c ZPO mit Stichtag-Switch | `getAktuellePfaendungsParameter(stichtag)`, `PFAENDUNG_2025`, `PFAENDUNG_2026` |
| `minijob.ts`, `midijob.ts` | Geringfügigkeitsgrenze, Übergangsbereich | aus `mindestlohn.ts` abgeleitet |
| `midijob-uebergang.ts` **(neu, Prompt 115a)** | § 20a SGB IV BE-Formel Midijob | `berechneBemessungsgrundlageAN`, `MIDIJOB_OBERGRENZE_MONAT`, `FAKTOR_F_2026`, `getMidijobUntergrenze` |
| `steuerprogression.ts` | Grenz-/Durchschnittssteuersatz | nutzt `einkommensteuer.ts` |
| `kfz-steuer.ts`, `balkon-solar.ts`, `waermepumpe.ts` | Domänen-spezifisch | |
| `erbschaftsteuer.ts` **(erweitert, Prompts 115c+116)** | § 19 ErbStG inkl. Abs. 3 Härtefall + § 14-Kumulation bei Vorschenkungen + § 13 Hausrat-FB | `berechneErbStMitHaertefall(stpflErwerb, klasse)`, `ERBST_TARIF_STUFEN`, `Steuerklasse`, `berechneErbschaftsteuer` (nutzt § 14 + Hausrat) |
| `schenkungssteuer.ts` | § 16 ErbStG persönliche Freibeträge, § 13 Hausrat-FB | `berechneSchenkungssteuer(...)` (importiert Härtefall aus `erbschaftsteuer.ts`) |
| `bafoeg-parameter.ts` **(neu, Prompt 121)** | SSOT für BAföG § 13/13a/14b/23/25/29/51 mit Stichtag-Switch-Skeleton (single-bucket `BAFOEG_AB_2024_08_01`, Platz für WS 2026/27) | `getAktuelleBafoegParameter(stichtag)`, `getAnrechnungsquote(geschwister, params)`, `BafoegParameter`, `BAFOEG_AB_2024_08_01` |
| `buergergeld-parameter.ts` **(neu, Prompt 121)** | SSOT für Bürgergeld § 20 ff. SGB II mit Stichtag-Switch H1/H2 (01.07.2026 „Neue Grundsicherung" — H2 derzeit identisch zu H1 als Skeleton) | `getAktuelleBuergergeldParameter(stichtag)`, `BuergergeldParameter`, `BUERGERGELD_2026_H1`, `BUERGERGELD_2026_H2` |
| `buergergeld.ts` **(erweitert, Prompt 121)** | Gesamtberechnung + Mehrbedarfe § 21 SGB II (alle 6 Tatbestände inkl. Alleinerziehend-Kombinations-Logik max(Nr.1/Nr.2) mit 60 %-Deckel) | `berechneBuergergeld(...)`, `berechneMehrbedarfe(eingabe, params)`, `MehrbedarfEingabe` |
| `wohngeld.ts` **(Explainer-Mode seit 120d)** | **Lib vorübergehend nicht voll-produktiv** — `/finanzen/wohngeld-rechner` läuft als Explainer-Seite. Bekannter Architektur-Bug bei §§ 14–16 WoGG Pro-Person-Behandlung (Refactoring Prompt 120c geplant für Juni 2026 gemeinsam mit Bürgergeld-Reform) | `HOECHSTBETRAEGE_WOGG_2026`, `ZUSCHLAG_PRO_PERSON_WOGG_2026` (für Explainer-Tabelle) |

**Verboten:** Eigene ESt-, LSt-, SV-, Kindergeld-, Pfändungs- oder Mindestlohn-Formeln in Komponenten oder Rechnern. Immer die zentrale Lib importieren. Diese Regel ergab sich aus Sprint 1 (April 2026) und wurde im Jahresaudit 2026 (Prompts 86–91) nochmal bestätigt, als in fünf Rechnern Formel-Duplikate mit 1–2 Jahre veralteten Werten gefunden wurden.

**Konkret verbotenes Muster (Prompt 115b2, April 2026):**

- Eigene Lohnsteuer-Formeln für Kl. V/VI — nur `berechneLohnsteuerJahr` aus `lohnsteuer.ts` verwenden. Die Kl. V/VI-Behandlung dort ist aktuell empirisch kalibriert (Lookup-Tabellen `LST_LOOKUP_V_2026` / `LST_LOOKUP_VI_2026`) mit Δ=0 an 20 BMF-Stützpunkten, ±5 € Toleranz dazwischen. Änderungen an den Lookup-Tabellen erfordern Re-Verifikation gegen bmf-steuerrechner.de an allen 20 Stützpunkten über [scripts/verify-lohnsteuer-vvi.ts](scripts/verify-lohnsteuer-vvi.ts). Voll-PAP-Implementation (§ 39b Abs. 2 Satz 7 EStG) bleibt offen als Wochenend-Refactor.

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

Zusätzlich bei ErbSt-/SchenkSt-nahen Rechnern: niemals `{ bis: 75000 / 300000 / 600000 ... }`-Tarif-Tabellen oder eigene Härtefall-Formeln (§ 19 Abs. 3 ErbStG) anlegen — stattdessen `ERBST_TARIF_STUFEN` und `berechneErbStMitHaertefall(stpflErwerb, klasse)` aus `erbschaftsteuer.ts` konsumieren. Die SchenkSt-Lib macht das seit Prompt 115c vor.

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

**Aktuell mit Stichtag-Switch:** `mindestlohn.ts` (01.01.2027), `rente.ts` (01.07.2026), `pfaendung.ts` (01.07.2026), `bafoeg-parameter.ts` (single-bucket, Skeleton für WS 2026/27), `buergergeld-parameter.ts` (H1/H2 zum 01.07.2026).

**Regel:** Bei jedem neuen unterjährigen Wechsel dieses Pattern anwenden — nicht einen nackten Kommentar "// TODO: Wert zum 01.07. ändern" hinterlegen.

### SSOT-Parameter-Lib-Muster (seit Prompt 121)

Parameter-Libs folgen einem einheitlichen Muster: **Typ-Interface + ein Bucket pro Stichtag + `getAktuelle…Parameter(stichtag)`-Getter**. Dieses Muster existiert für `mindestlohn.ts`, `rente.ts`, `pfaendung.ts`, `bafoeg-parameter.ts`, `buergergeld-parameter.ts`. Bei jedem neuen rechtsstands-abhängigen Parameter-Set wird das Muster angewendet.

```ts
export interface XxxParameter {
  regelsaetze: { alleinstehend: number; /* ... */ };
  freibetraege: { /* ... */ };
  quelle: string;
  gueltigAb: Date;
}

export const XXX_AB_YYYY_MM_DD: XxxParameter = { /* ... */ };

export function getAktuelleXxxParameter(stichtag: Date = new Date()): XxxParameter {
  const switchDatum = new Date(2026, 6, 1); // 01.07.2026
  return stichtag >= switchDatum ? XXX_AB_2026_07_01 : XXX_AB_2024_08_01;
}
```

**Import-Regel:** Rechner und andere Libs **importieren ausschließlich über den Getter** `getAktuelleXxxParameter()`, niemals direkt aus den Bucket-Konstanten. Damit bleibt der Stichtag-Switch deterministisch und testbar, und das Austauschen von Buckets erfordert keine Suche/Ersetzen im Repo.

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
| Midijob-Untergrenze | 603,01 € / Monat | 01.01.2027 | `mindestlohn.ts`, abgeleitet in `midijob-uebergang.ts` (`getMidijobUntergrenze`) | § 20 SGB IV |
| Midijob-Obergrenze | 2.000 €/Monat | keine (seit 01.01.2023) | `midijob-uebergang.ts` (`MIDIJOB_OBERGRENZE_MONAT`) | § 20a SGB IV |
| Midijob F-Faktor | **0,6619** (2026, jährlich neu) | 01.01.2027 | `midijob-parameter.ts` (`MIDIJOB_2026.faktorF` seit Prompt 125a) + Re-Export aus `midijob-uebergang.ts` | § 20a Abs. 2 SGB IV |
| BBG KV/PV | 5.812,50 € / Monat (69.750 € / Jahr) | 01.01.2027 | `brutto-netto.ts` als `BBG_KV_MONAT` | SV-RechengrößenVO 2026 |
| BBG RV (einheitlich) | 8.450 € / Monat (101.400 € / Jahr) | 01.01.2027 | `brutto-netto.ts` als `BBG_RV_MONAT` | SV-RechengrößenVO 2026 |
| JAEG / Versicherungspflichtgrenze | 77.400 € / Jahr (6.450 € / Monat) | 01.01.2027 | `sv-parameter.ts` als `JAEG_2026_*` | BMG |
| GKV allgemeiner Beitragssatz | 14,6 % | offen | `sv-parameter.ts` | § 241 SGB V |
| GKV-Zusatzbeitrag Ø | 2,9 % (AN-Anteil 1,45 %) | offen | `sv-parameter.ts` | § 242a SGB V |
| PV-Beitrag AN-Anteil | 1,8 % (Standard) / 2,4 % (kinderlos >23) | offen | `pflegeversicherung.ts` | § 55 SGB XI |
| PV-Kinderabschlag ab Kind 2 | 1,55 / 1,30 / 1,05 / 0,80 % | offen | `pflegeversicherung.ts` | § 55 Abs. 3 SGB XI (PUEG 2023) |
| Rentenwert | 40,79 € (ab 01.07.2026: 42,52 €) | **01.07.2026 Switch automatisch** | `rente.ts` als `getAktuellerRentenwert()` | § 68 SGB VI, BMAS 05.03.2026 |
| Durchschnittsentgelt | 51.944 € (vorläufig) | 01.01.2027 | `rente.ts` (`DURCHSCHNITTSENTGELT_2026`) | § 69 SGB VI + Anlage 1 |
| Elterngeld-Einkommensgrenze | 175.000 € zvE (Paare + Alleinerziehende einheitlich) | offen | `elterngeld.ts` (`ELTERNGELD_EINKOMMENSGRENZE_2026`) | § 1 Abs. 8 BEEG |
| Elterngeld-Vor-Geburt-Deckel | 2.770 €/Monat | offen | `elterngeld.ts` (`ELTERNGELD_VORGEBURT_DECKEL_2026`) | § 2 Abs. 3 BEEG |
| Witwenrente-Grundfreibetrag-Faktor | 26,4 × Rentenwert (Kind: +5,6 × Rentenwert) | bleibt | Formel inline, Rentenwert aus `rente.ts` | § 97 SGB VI + Anlage 1 |
| Pfändungs-Grundfreibetrag | 1.555,00 € (ab 01.07.2026: 1.587,40 €) | **01.07.2026 Switch automatisch** | `pfaendung.ts` | § 850c ZPO, BGBl. 2026 I Nr. 80 |
| Pendlerpauschale | **einheitlich 0,38 €/km ab 1. km** (seit 01.01.2026) | keine bekannt | `pendlerpauschale.ts` als `PENDLERPAUSCHALE_SATZ_2026` | § 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025 |
| Pendlerpauschale-Höchstbetrag (Nicht-PKW) | 4.500 € / Jahr | keine | `pendlerpauschale.ts` | § 9 Abs. 1 Nr. 4 Satz 2 EStG |
| Homeoffice-Pauschale | 6 € / Tag, max. 210 Tage | offen | `pendlerpauschale.ts` | § 4 Abs. 5 Nr. 6c EStG |
| Unterhalt DT 2026 Mindestbedarf | 486 / 558 / 653 / 698 € | 01.01.2027 | `duesseldorfer-tabelle.ts` | Düsseldorfer Tabelle |
| Deutschlandticket | 63 €/Monat | offen | Inline | seit 01.01.2026 |
| LSt-PAP § 39b EStG | jährlicher ITZBund-Programmablaufplan 2026 | jährlich zum 01.01. | `_lohnsteuer-pap-2026.ts` (Voll-PAP-Port seit Prompt 118) | § 39b EStG + BMF/ITZBund-Referenz |
| BAföG-Höchstsatz | 992 € Studium auswärts bis 30 J. (475 + 380 + 102 + 35) | ggf. 01.08.2026 (KoaV-Plan 440 € Wohnpauschale, noch nicht verabschiedet) | `bafoeg-parameter.ts` **(neu SSOT, Prompt 121)** via `getAktuelleBafoegParameter()` | § 13, § 13a BAföG + 29. BAföG-ÄndG v. 01.08.2024 |
| BAföG Elternfreibetrag | 2.415 € verheiratet / 1.605 € alleinstehend + 730 €/Geschwister | offen | `bafoeg-parameter.ts` (`freibetraege.elternVerheiratet`/`elternAlleinstehend`/`proGeschwister`) | § 25 Abs. 1 + Abs. 3 BAföG |
| BAföG Anrechnungsquote | 0,50 − 0,05 × Geschwister (min 0, max 0,50) — Antragsteller zählt NICHT mit | offen | `bafoeg-parameter.ts` via `getAnrechnungsquote(geschwister)` | § 25 Abs. 6 S. 1 BAföG + BMBF-FAQ |
| Bürgergeld Regelsatz Alleinstehend | 563 €/Monat (Nullrunde 2026, Anpassung 2027) | 01.01.2027 | `buergergeld-parameter.ts` **(neu SSOT, Prompt 121)** via `getAktuelleBuergergeldParameter()` | § 20 SGB II + Regelbedarfsstufen-Fortschreibung |
| Bürgergeld Regelsatz Partner | 506 €/Monat (RSS2) | 01.01.2027 | `buergergeld-parameter.ts` | § 20 SGB II RSS2 |
| Bürgergeld Regelsatz Kinder | 471 / 390 / 357 € je nach Alter (RSS3/4/5/6) | 01.01.2027 | `buergergeld-parameter.ts` | § 20 SGB II RSS3–6 |
| Bürgergeld Mehrbedarfe § 21 SGB II | Schwangerschaft 17 %, Alleinerz. max(36 %, 12%×Kind) Deckel 60 %, Behinderung 35 %, kostenaufw. Ernährung/atyp. €-Betrag, Warmwasser 2,3/1,4/1,2/0,8 % altersabh. | offen | `buergergeld.ts` (`berechneMehrbedarfe`) + `buergergeld-parameter.ts` | § 21 Abs. 2–7 SGB II |
| Bürgergeld H2 „Neue Grundsicherung" | **Skeleton** — Parameter identisch zu H1 bis Gesetzestext verabschiedet ist | **01.07.2026 Switch aktiv (noch ohne Effekt)** | `buergergeld-parameter.ts` (`BUERGERGELD_2026_H2`) | Koalitions-Entwurf, Stand 04/2026 |
| Wohngeld Höchstbeträge | 35-Zellen-Matrix 5 P × 7 Mietstufen nach Anlage 1 WoGG | 01.01.2027 (nächste 2-J-Dynamisierung) | `wohngeld.ts` (`HOECHSTBETRAEGE_WOGG_2026`, `ZUSCHLAG_PRO_PERSON_WOGG_2026` exportiert seit 120d) | § 12 WoGG + Zweite Verordnung z. Fortschreibung v. 21.10.2024 |
| Wohngeld-Rechner | **Explainer-Seite seit Prompt 120d** (Lib hat Architektur-Bug bei §§ 14–16 pro Person). Statische Route `app/finanzen/wohngeld-rechner/page.tsx` mit Hinweis-Banner auf BMWSB-Rechner | Juni 2026 (Prompt 120c Lib-Refactoring gebündelt mit Bürgergeld-Reform) | `app/finanzen/wohngeld-rechner/page.tsx` + `wohngeld.ts` (unberührt) | — |
| Pfändung § 850c ZPO Tabelle | amtliche 10-€-Stufen-Tabelle via Netto-Abrundung; Stichtag-Switch PFAENDUNG_2025/2026 | 01.07.2028 (2-J-Rhythmus § 850c Abs. 4) | `pfaendung.ts` (seit Prompt 120 mit Stufen-Abrundung) | § 850c ZPO + BGBl. 2025 I Nr. 110 + BGBl. 2026 I Nr. 80 |
| ErbSt-Tarifstufen § 19 ErbStG | 75k/300k/600k/6M/13M/26M mit Kl. I/II/III-Sätzen | selten | `erbschaftsteuer.ts` (`ERBST_TARIF_STUFEN` + `berechneErbStMitHaertefall` seit Prompt 115c) | § 19 ErbStG inkl. Abs. 3 Härtefall |
| AfA degressiv bewegliche WG | **ausgelaufen zum 31.12.2025** (Fallback auf linear für Anschaffungen ab 01.01.2026) | — | `AfaRechner.tsx` (Gate `startJahr >= 2026`) | § 7 Abs. 2 EStG n.F. (Wachstumschancengesetz) |
| Plug-in-Hybrid 0,5 %-Bedingungen | CO₂ ≤ 50 g/km **oder** E-Reichweite ≥ 80 km (eine Bedingung reicht) | 01.01.2031 (Ende der Begünstigung) | `FirmenwagenRechner.tsx` (`HYBRID_CO2_GRENZE_G_KM`, `HYBRID_REICHWEITE_MIN_KM`) | § 6 Abs. 1 Nr. 4 S. 2 Nr. 5 EStG (ab 01.01.2025) |
| Wohngebäude-Sonder-AfA § 7 Abs. 5a EStG | 5 % linear p. a., Bauantrag 01.10.2023 bis 30.09.2029 | 30.09.2029 | `AfaRechner.tsx` (Methode `'wohngebaeude-5'`) | § 7 Abs. 5a EStG |
| Degressive AfA Maximalsatz | 20 % (bis 31.12.2025); ab 01.01.2026 nicht mehr zulässig | — | `AfaRechner.tsx` (Math.min-Clamp, Label) | § 7 Abs. 2 EStG n.F. (Wachstumschancengesetz) |
| AfA Sammelposten-Pool § 6 Abs. 2a EStG | 20 % p. a. linear, 5 Jahre, WG 250,01 € bis 1.000 € netto | offen | `AfaRechner.tsx` (Methode `'sammelposten'`) | § 6 Abs. 2a EStG |
| ErbSt Versorgungs-FB Kinder § 17 Abs. 2 ErbStG | Staffel 52k/41k/30,7k/20,5k/10,3k/0 € je nach Alter | selten | `erbschaftsteuer.ts` (`versorgungsfbKind`) | § 17 Abs. 2 ErbStG |

**Stichtag-Switch automatisch:** Die fett markierten Parameter (Rentenwert 01.07.2026, Mindestlohn 01.01.2027, Pfändung 01.07.2026, Bürgergeld H2 01.07.2026-Skeleton) wechseln ohne Deploy durch das Stichtag-Switch-Pattern in den Libs. Nach den Stichtagen nur Spot-Check. Bei Bürgergeld H2 muss die „Neue Grundsicherung"-Reform-Verabschiedung abgewartet werden — aktuell sind H1- und H2-Werte identisch.

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

## Methodische Lehre Lookup → Voll-PAP (Prompt 115b2 → 118)

**Abgeschlossen am 2026-04-21 (Prompt 118):** Die empirischen Lookup-Tabellen aus 115b2 (`LST_LOOKUP_V_2026`, `LST_LOOKUP_VI_2026`) wurden durch einen 1:1-Port des offiziellen ITZBund-XML-Pseudocodes abgelöst. Δ = 0,00 € an allen 20 BMF-Stützpunkten, algorithmisch identisch zum bmf-steuerrechner.de-Webrechner. Archiv der Lookups unter [lib/berechnungen/_lookup-archiv/lohnsteuer-lookup-2026.ts.txt](lib/berechnungen/_lookup-archiv/lohnsteuer-lookup-2026.ts.txt).

Der ursprüngliche Kl. V/VI-LSt-Bug in `berechneLohnsteuerJahr` war strukturell seit der ursprünglichen Implementation vorhanden — selbst-erfundene Näherungen mit Code-Kommentar „Stark vereinfachte Approximation nach PAP". Er hat alle bisherigen Audit-Sprints überlebt, weil Testfälle sich auf Kl. I und IV konzentrierten.

**Regel für künftige LSt-Audits:** bei jedem Rechner, der `berechneLohnsteuerJahr` konsumiert, MINDESTENS je einen Testfall in Kl. V UND Kl. VI durchrechnen — bei Niedriglohn-Bruttos (800–1.500 €) UND bei Mittellohn (3.000–4.000 €). Niedriglohn deckt Grundfreibetrag- und PAP-Mindestregelungen ab; Mittellohn die Zonen-Übergänge.

**Regel zu empirischen Lookup-Lösungen (historisch):** Lookups als Zwischenlösung sind legitim, wenn eine Voll-Implementation nicht sofort machbar ist. Voraussetzung: UI-Hinweis auf Toleranz, dokumentierte Tech-Schuld, und ein konkret eingeplanter Ablöse-Prompt (siehe 115b2 → 118 als erfolgreicher Präzedenzfall).

**Regel für Voll-PAP-Ports:** Der XML-Pseudocode vom ITZBund ist die maßgebliche Quelle (nicht PDF, nicht Java). Jährlicher Update-Prozess in `docs/referenzen/itzbund-README.md`. Dezember-Audit-Checkliste in `docs/jahreswerte-kalender.md` Punkt 9.

## Verify-Script-Anti-Pattern (Prompt 120a, April 2026)

**Regel:** Jeder Verify-Test MUSS gegen eine Quelle **außerhalb der getesteten Lib** prüfen. Zirkulärer Vergleich Lib-gegen-Lib ist wertlos und fängt keine Formel-/Algorithmus-Bugs.

Gelernt aus Prompt 120 → 120a: `verify-wohngeld-p1.ts` lief 41/41 grün, weil die Formel-Tests Lib-Werte gegen Lib-Werte verglichen. Erst der User-Cross-Check gegen den BMWSB-Wohngeldrechner offenbarte Δ = +46 €/Monat (~21 %). Die Lib-Koeffizienten waren seit 2022 nicht aktualisiert, das Verify-Script konnte das nicht erkennen.

**Zulässige externe Referenzen:**
- Rechtsquellen (Gesetzestext-Konstanten, BGBl-Anlagen, amtliche Tabellen)
- Offizielle Referenz-Rechner mit Oracle-Charakter (BMF-Steuerrechner, BMWSB-Wohngeldrechner, BA-Bürgergeldrechner etc.)
- Manuelle Gesetzes-Nachrechnung mit §-Referenz im Kommentar — schwächer als Oracle, aber stärker als zirkulär

**Verboten:** Testfälle, deren Soll-Werte aus dem zu testenden Lib-Output selbst abgeleitet wurden („Erwarter Wert = was der Code aktuell produziert").

**Anti-Pattern auch dokumentiert:** Wohngeld-Koeffizienten ausschließlich gegen § 19 WoGG Anlage 2 oder kalibriert gegen BMWSB-Rechner — keine „vereinfachten Schätzwerte" pauschal übernehmen.

## Anti-Pattern: Schätzungen in Commit-Messages (Prompt 125a-fix, 22.04.2026)

**Regel:** Wenn eine Commit-Message oder ein Audit-Bericht eine Näherung oder ein Restrisiko mit einer Zahl-Spannbreite beziffert („~0,3 €-Bereich", „im Cent-Bereich", „minimal"), MUSS diese Spannbreite aus einem konkreten durchgerechneten Testfall stammen — nicht aus dem Gedächtnis oder Bauchgefühl.

Gelernt aus Prompt 125a → 125a-fix: Die 125a-Commit-Message hatte eine verdoppelte Kinderlos-Zuschlag-Konstante als „Präzisionsverlust im 0,3 €-Bereich bei Max-Midijob — nicht priorisiert" dokumentiert. Tatsächlicher Impact: bis **12 €/Monat** bei Max-Midijob, ~100 €/Jahr Jahres-Überhöhung des AG-Anteils. Fehlschätzung um Faktor 25–40.

**Folgen einer zu kleinen Schätzung:**
- Der Fix wird de-priorisiert und bleibt unbeachtet im Code
- Der Audit-Bericht akzeptiert den „kleinen Fehler" als gegeben
- Erst ein User-Cross-Check (hier: Karsten prüft AN-SV-Wert und lokalisiert den AG-Bug) offenbart die tatsächliche Größenordnung

**Zulässige Formulierungen für Näherungen:**
- „~5 €/Monat bei AE = 1.500 €, ~12 €/Monat bei Max-Midijob" (konkret + durchgerechnet)
- „Nicht quantifiziert, Impact-Schätzung in Folge-Prompt" (explizit als offen markiert)
- „Δ = 0 bei Testfall X, Y, Z" (negative Feststellung mit belegter Toleranz)

**Verboten:**
- „im 0,3-€-Bereich" ohne Rechnung
- „minimal", „unerheblich", „vernachlässigbar" ohne Beleg

Bei Unsicherheit → mindestens zwei Extremwert-Testfälle durchrechnen (z. B. UG und OG bei Midijob) und die beiden €-Werte beide nennen. Das verhindert Größenordnungs-Fehler wie 125a.

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

7. **Amazon-Partnerprogramm** (Prompt 122-amazon, April 2026): Der Tag `rechenfix-21` wird **nur** bei erteiltem Marketing-Consent an den Amazon-Suchlink angehängt (`useCookieConsent().marketingAllowed`). Die AmazonBox bleibt **immer** sichtbar — ohne Consent kein Partner-Tag, aber der Link funktioniert weiter für den User (Service über Provision). Keine AmazonBox auf Rechnern der Kategorien **Gesundheit, Finanzen, Mathe** (konsistent zur bestehenden Affiliate-Platzierungsregel aus Prompt 106). Vollständige Integration-Dokumentation mit Rechner-Tabelle und 180-Tage-Monitoring-Plan in [`docs/amazon-integration.md`](docs/amazon-integration.md).

8. **Audit-Methodik — Zahlen-Erwartungen nie aus dem Gedächtnis** (Lehren 22.04.2026): Wenn Prompts Soll-Werte nennen (Testfall-Erwartungen, FAQ-Faustregeln, BAföG-Beispielwerte), diese **nicht** ungeprüft übernehmen. Stattdessen aus Rechtsquelle (Gesetzestext, BGBl., Amtliche Tabelle) oder externem Oracle (BMBF-BAföG-Rechner, BMWSB-Wohngeldrechner, BA-Bürgergeldrechner, BMF-Steuerrechner) herleiten. Mehrfach-Vorfälle am 22.04.: FAQ-Faustregel zu Einkommensgrenzen, 3-Monats-Rückwirkungs-Annahme Wohngeld, BAföG-Schätzwert 600 €, BAföG-Geschwister-Quoten-Schnellschuss (0,45 → korrekt 0,50 bei 0 Geschwistern nach § 25 Abs. 6 + BMBF-FAQ). **Regel:** Jede Zahl im Prompt vor Übernahme gegen externe Quelle cross-checken — „sieht plausibel aus" ist nicht genug.

9. **UI-Labels müssen rechtliche Tatbestände korrekt abbilden** (Lehre 22.04.2026 aus Prompt 121 → 121-fix): Keine impliziten Auto-Aktivierungen von Mehrbedarfen/Freibeträgen/Tarifen, die rechtliche Voraussetzungen haben. Beispiel Alleinerziehenden-Mehrbedarf § 21 Abs. 3 SGB II: war in 121 pauschal „bei Kind im Haushalt" getriggert, musste in 121-fix auf explizite Checkbox mit Wechselmodell-Hinweis umgestellt werden (§ 21 Abs. 3 verlangt **alleinige Pflege und Erziehung**). Pattern: Bei Tatbeständen mit Rechtsvoraussetzung immer bewusste User-Bestätigung einfordern, nicht aus Kontext raten.

10. **Statische Routes mit eigener `page.tsx` müssen Kategorie-Sidebar explizit rendern** (Lehre 22.04.2026 aus Prompt 120d → 120d-sidebar): Dynamische Rechner-Route `app/[kategorie]/[rechner]/page.tsx` rendert die Sidebar inline. Statische Overrides (aktuell nur `/finanzen/wohngeld-rechner`) fallen ohne explizite Integration raus und zeigen kein Kategorie-Menü → UX-Bruch + fehlende interne Verlinkung. Pattern: Sidebar-Code aus der dynamischen Route 1:1 übernehmen, `AKTUELLER_SLUG` als Aktiv-Markierung setzen. Prompts für neue statische Routes müssen **explizit** „inkl. Kategorie-Sidebar" nennen — „passt optisch zu anderen Rechnern" reicht nicht.

11. **URL + Kategorie gegen SSOT verifizieren** (Lehre 23.04.2026 aus Prompt 126): Vor jeder Audit-Session, Umsetzung oder Folge-Prompt, der einen bestehenden Rechner betrifft, ist [`lib/rechner-config/<kategorie>.ts`](lib/rechner-config/) die **Single Source of Truth** für Slug und Kategorie. URL-Pfade **niemals** ungeprüft aus älteren Audit-Arbeitspapieren, früheren Prompts, Memory-Einträgen oder aus einer Erwartung basierend auf dem Rechnernamen übernehmen — immer kurz greppen (`grep -n "slug: '" lib/rechner-config/<kategorie>.ts`). Weicht Audit-Doku vom Live-Code ab: **im Bericht dokumentieren**, nicht stillschweigend korrigieren, und die Abweichung in der Rückmeldung an den User erwähnen. **Hintergrund:** In Welle 1 Stufe 4a hatten Prompt 125b und die Audit-Papiere 115c/116/117 den Firmenwagen-Slug als `/auto/firmenwagen-rechner` angenommen, während der Rechner tatsächlich unter `/finanzen/firmenwagenrechner` lief. Nur durch Zufall wurde später genau dieser falsche Pfad zum Migrationsziel (Prompt 126) — das Schließen der Lücke ersetzt keine Audit-Methodik.

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

### G14 — Ein Footer, dynamische Zahlen (Prompt 107b)
Genau eine Footer-Komponente site-weit: [components/layout/Footer.tsx](components/layout/Footer.tsx), ausschließlich vom Root-Layout ([app/layout.tsx](app/layout.tsx)) gerendert. Rechner- und Kategorie-Zahlen werden dynamisch aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) berechnet — nie hartcodiert.

Lint-Guard: `npm run lint:footer` ([scripts/check-footer.mjs](scripts/check-footer.mjs)) prüft beides:
- `footer-uniqueness`: genau 1 Footer-Datei in `{app,components}/**/*Footer*.{ts,tsx}` (ohne `.test.`, `.stories.`, `.d.ts`)
- `footer-hardcoded-count`: Footer-Content enthält kein Muster `<Zahl> Rechner in <Zahl> Kategorien`

Vollständige Guard-Tabelle (G1–G14) liegt in [.claude/skills/rechner-builder/SKILL.md](.claude/skills/rechner-builder/SKILL.md) Abschnitt „Qualitäts-Guards".

### CI-Hooks (prebuild)

Das `prebuild`-Script in [package.json](package.json) kettet folgende Checks, bevor der Next.js-Build startet:

1. `node scripts/check-footer.mjs` — Footer-Guards (G14)
2. `node scripts/check-jahreswerte.mjs` — Jahreswerte-Guards (Sprint 1.5, contextKeywords-basiert)
3. `npx tsx scripts/generate-client-data.ts` — Client-Data-Generation

Reihenfolge ist bewusst fail-fast: Schlägt ein Lint-Check fehl, wird die teurere Client-Data-Generation gar nicht erst gestartet. Greift lokal bei `npm run build` **und** auf Vercel bei jedem Deploy. Fehler blockieren den Build — kaputte Footer oder veraltete Jahreswerte erreichen nie die Produktion.

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
- **103** — Canonical-Diagnose: bereits sauber, Prompt geschlossen ohne Fix ✅
- **104** — Crawl-Discovery: Sitemap-`lastmod` via git-log, Priority-Staffelung, Kategorie-H1 mit Count + 2026 ✅
- **105** — 9 Kategorie-Einleitungen live (je 180–220 Wörter, `{COUNT}`-Platzhalter, Markdown-Links) ✅
- **106** — 3 neue Awin-Partner platziert: hotel.de (16018), burda-Zahnzusatz (121064), eventfloss-berlin (27722) ✅
- **107b** — Lint-Guards `lint:footer` (footer-uniqueness + footer-hardcoded-count), Guard G14 ✅
- **107c** — `prebuild`-Hook kettet `check-footer` + `check-jahreswerte` + `generate-client-data`; Repo-Housekeeping (gitignore, `docs/audit-arbeitspapiere/`) ✅
- **108** — Doku-Sync nach Sprint 20.04.2026 ✅
- **109** — Welle 1 Stufe 3 Audit (Familie + Arbeitsrecht, 6 Rechner, Bericht + Testfälle) ✅
- **110** — AdSense-Basis-Loader in `<head>` für Crawl-Erkennung ✅
- **111** — Welle 1 Stufe 3 P1-Pass: Elterngeld 175k-Grenze + Ersatzrate aus Netto vor Geburt + 2770-Deckel; Minijob Rentenpunkte-Divisor SSOT `DURCHSCHNITTSENTGELT_2026` ✅
- **111a** — UX-Polish: 2.770-€-Deckel-Hinweis im Elterngeld-Aufschlüsselungsblock (kontextabhängig) ✅
- **112** — Welle 1 Stufe 3 P2-Pass: Mutterschutz-Minijob-Familienvers., Kündigungsfrist-Fristende (BAG 10 AZR 64/17), Teilzeit-Vollzeit-Tage-Input + § 5 Abs. 2 BUrlG-Rundung (Teilzeit + Urlaubstage), Minijob Stichtag-Switch `MINDESTLOHN`; Bonus: Rentenrechner-SEO auf 2026er Werte ✅
- **113** — Stufe 3 Abschluss: SSOT-Cleanup (`_helpers.ts` neu mit `rundeBuRlGKonform` + `WOCHEN_PRO_MONAT`, `BUNDESLAENDER`-Dedup) + P3-Polish (Elterngeld-Plus-Block, Mutterschutz-Hint, Kündigungsfrist-Kommentar, Minijob-FAQ); Welle 1 Stufe 3 formal abgeschlossen ✅
- **114** — Welle 1 Stufe 4a Audit (Spezial-Steuer, 8 Rechner, Bericht + Testfälle in `docs/audit-arbeitspapiere/`, kein Code-Fix): 6 P1 + 12 P2 + 11 P3; MidijobRechner als Hot Spot (BE-Formel falsch, Steuerklassen-Faktor × 1,15 erfunden, Soli-Wiederholungs-Bug); Erbschaft+Schenkung § 19 Abs. 3-Härtefall fehlt ✅
- **115a** — Midijob komplett saniert: neue SSOT-Lib `midijob-uebergang.ts` (§ 20a SGB IV, Stichtag-Switch für UG); BE-Formel gefixt (P1), LSt via `berechneLohnsteuerJahr` statt × 1,15 (P1), Soli via `berechneSoli` (P1); SV-SSOT-Imports, PV 1,7→1,8 %, PV-Kinderabschlag-Input, KiSt-Bundesland-Dropdown ✅
- **115b** — Analyse Lohnsteuer-Kl.V/VI-Bug in `berechneLohnsteuerJahr` (nur Analyse, kein Fix; `docs/audit-arbeitspapiere/lohnsteuer-v-vi-analyse.md`) ✅
- **115b2** — Fix Lohnsteuer-Kl.V/VI via empirischer Lookup-Kalibrierung (20 BMF-Stützpunkte, Δ=0 an Stützpunkten, UI-Hinweis auf 3 Rechnern, Verifikations-Script `scripts/verify-lohnsteuer-vvi.ts`) ✅ **Abgelöst von Prompt 118.**
- **115c** — Stufe-4a P1-Rest (3 Bugs): Härtefall § 19 Abs. 3 ErbStG zentral als `berechneErbStMitHaertefall` + `ERBST_TARIF_STUFEN` (Schenkungssteuer importiert); AfA degressiv ab 2026 gated mit Fallback auf linear + Warn-Banner (§ 7 Abs. 2 EStG n.F.); Firmenwagen Plug-in-Hybrid CO₂/Reichweite-Bedingungen als conditional UI-Block mit Fallback auf 1 %-Regel (§ 6 Abs. 1 Nr. 4 S. 2 Nr. 3 EStG); Regressions-Script `scripts/verify-erbst-haertefall.ts` mit 11 grünen Testfällen ✅
- **115d** — Firmenwagen-Vergleichs-Tabelle: aktive Spalte markieren + Hybrid-Bedingungs-Fußnote. UX-Fix zu 115c-Widerspruch (Hauptblock zeigte Fallback-Wert, Tabelle weiterhin Idealfall → zwei Hybrid-Zahlen untereinander). Keine Änderung an Rechenlogik, nur UI. ✅
- **116** — Stufe-4a P2-Pass (8 Bugs): ErbSt § 14-Kumulation (Gesamterwerb + proportionale/tatsächliche Vorsteuer-Anrechnung, ER-04 von 67.500 → 39.706 €) + Hausrat-FB § 13 ErbStG (41k Kl. I / 12k Kl. II+III, ER-03); SchenkSt Enkel-Differenzierung (enkel-eltern-tot 400k FB, SS-02) + Hausrat-FB Kl. II/III (SS-03) + Schwieger-/Stiefeltern + Geschiedener Ehepartner als neue Optionen; AfA Degressiv-Deckel 25 → 20 % + neue Methode Wohngebäude-5 (§ 7 Abs. 5a EStG, 5 % linear p. a. über 20 Jahre); Midijob-UNTERGRENZE aus Modul-Scope in Komponenten-Scope verschoben (Stichtag-Robustheit 01.01.2027). Regressions-Script auf 15/15 erweitert. ✅
- **117** — Stufe-4a P3-Pass (7 UX-Polish-Items): KESt Bundesland-Dropdown + Verlustverrechnung Zwei-Töpfe § 20 Abs. 6 EStG; ErbSt Versorgungsfreibetrag-Staffel § 17 Abs. 2 ErbStG für Kinder (altersabhängig); AfA Sammelposten-Pool § 6 Abs. 2a EStG als 5. Methode; Firmenwagen Info-Block zu Grenzsteuersatz + KiSt/Soli-Vereinfachung; MwSt Gastronomie-19-%-Rückkehr-Hinweis bei 7-%-Auswahl; Midijob F-Faktor-Dokumentation + Jahreskalender-Eintrag. Fünf weitere P3 ins Backlog verschoben (siehe welle1-stufe4a-bericht.md Nachtrag 117). ✅
- **118** — Lohnsteuer-Voll-PAP-Refactor via ITZBund-XML-Pseudocode: 1:1-Port nach TypeScript in `lib/berechnungen/_lohnsteuer-pap-2026.ts` (decimal.js). 24 Methoden aus dem offiziellen BMF-Programmablaufplan 2026 (40 Seiten PDF entsprechen 1396 Zeilen XML, SHA256 verifiziert). Δ = 0,00 € an allen 20 BMF-Stützpunkten der 115b2-Lookups. `berechneLohnsteuerJahr` delegiert vollständig an PAP, Grundtarif-Vereinfachung + Lookup-Tabellen entfernt (Archiv unter `_lookup-archiv/`). UI-Toleranz-Hinweise aus BruttoNetto/Lohnsteuer/Midijob entfernt. Jährlicher Update-Prozess in `docs/referenzen/itzbund-README.md`. ✅
- **119** — Welle 1 Stufe 4b Audit (Sozialleistungen, 4 Rechner BAföG/Wohngeld/Bürgergeld/Pfändung, Bericht + Testfälle in `docs/audit-arbeitspapiere/`, kein Code-Fix): **9 P1 + 7 P2 + 6 P3**. Hot Spots: BAföG mit systematisch veralteten Bedarfssätzen (Höchstsatz Code 1.056 € vs. Soll 992 €), Wohngeld mit 35 veralteten Höchstbetragszellen + 4 fehlerhaften Freibetragsregeln (Einkommens-Pauschale 10 % statt 30 %, Schwerbeh.-FB 150 statt 125, Alleinerziehend-FB pauschal statt pro Kind, Erwerbstätigen-FB 20 % statt pauschal 83 €), Pfändung mit Pauschalquote statt amtlicher 10-€-Stufen-Tabelle. Bürgergeld-Regelsätze 2026 korrekt (Nullrunde ✓). 3 SSOT-Kandidaten: bafoeg-parameter.ts, wohngeld-parameter.ts, buergergeld-parameter.ts. ✅
- **120** — Stufe-4b P1-Pass (9 P1-Bugs): BAföG Bedarfssätze 934→855 (= 475+380) + KV-Zuschlag 94→102 + PV-Zuschlag 28→35 (Höchstsatz jetzt 992 € statt 1.056 €); Wohngeld alle 35 Höchstbetragszellen nach § 12 WoGG Anlage 1 (Dynamisierung 01.01.2025) + 4 Freibetragsregeln § 17 WoGG (Einkommens-Pauschale 10→30 %, Schwerbeh-FB 150→125 €, Alleinerziehend pauschal→110×Kinderzahl, Erwerbstätig 20 % Brutto→pauschal 83 €/Mo); Pfändung amtliche 10-€-Stufen-Tabelle durch Netto-Abrundung reproduziert (keine Tabellen-Portierung nötig) + `GRUNDFREIBETRAG`-Modul-Scope durch Getter ersetzt. 3 Verify-Scripts: 5/5 + 41/41 + 17/17 grün. ✅ **Wohngeld-Teil teilweise in 120a revidiert.**
- **120a** — Wohngeld-Hotfix nach User-Cross-Check gegen BMWSB-Rechner (Δ +46 €/Mo bei WG-01). Drei Bugs: (a) UI-Display-Bug „Pauschalabzug 10%" vs. Lib-intern 30%, (b) Tarifformel-Bug — KOEFFIZIENTEN seit ~2022 nicht aktualisiert, jetzt 1:1 aus Anlage 2 WoGG (BGBl. 2024 I Nr. 314) für 1-12 Haushaltsmitglieder + Mindestwerte M_min/Y_min aus Anlage 3 + Rundung kaufmännisch auf volle Euro, (c) Verify-Script-Anti-Pattern — Prompt-120-Tests waren zirkulär gegen Lib-Werte, jetzt gegen § 12/17/19 WoGG + BMWSB-Oracle als externe Referenzen. **Rollback mehrerer 120-Freibetrags-„Korrekturen"**: § 17 Nr. 1 WoGG = Schwerbehindert 1.800 €/J = 150 €/Mo (NICHT 125), § 17 Nr. 3 = Alleinerz. 1.320 €/J **pauschal** (nicht pro Kind), § 17 enthält keinen Erwerbstätigen-FB (83 €/Mo-Wert war Fehlannahme, jetzt No-Op). Klima-Komponente § 12 Abs. 7 an Heizkostenpauschale § 12 Abs. 6 gekoppelt. 42/42 grün. **Cliffhanger am Nachmittag:** 2P-Cross-Check zeigte weitere Abweichung (2P/2.300/500/IV → 98 vs. BMWSB 72 €), Diagnose = Architektur-Bug in §§ 14-16-Pro-Person-Behandlung. Hybrid-Plan beschlossen (120d + 120c Juni 2026). ⚠️
- **120d** — Wohngeld-Hybrid Teil 1: `/finanzen/wohngeld-rechner` ersetzt durch statische Erklärseite in `app/finanzen/wohngeld-rechner/page.tsx` (Server Component, gewinnt gegen dynamische Route, zusätzlich in `generateStaticParams` per `STATISCHE_OVERRIDES`-Set ausgeschlossen). Oberhalb H1: Hinweis-Banner mit Link zum offiziellen BMWSB-Wohngeldrechner. Inhalt: Anspruchserklärung, Mietstufen I–VII, Höchstbeträge-Tabelle (Werte aus `HOECHSTBETRAEGE_WOGG_2026`/`ZUSCHLAG_PRO_PERSON_WOGG_2026`, neu exportiert — kein Daten-Duplikat), Rechengang paraphrasiert, Beispielrechnung 215 €, 5 FAQ (Frage 5 transparent zum Refactoring), Weiterführende Links. Schema.org FAQPage + BreadcrumbList, KEIN Calculator-Schema. Lib nur STATUS-Dateidoc-Kommentar + zwei Getter-Exports. Lib-Refactoring + Rollback auf dynamische Route als Prompt 120c reserviert (Juni 2026, parallel zu Bürgergeld → Neue Grundsicherung 01.07.2026). ✅
- **120d-fix** — Vier fachliche Textkorrekturen in `app/finanzen/wohngeld-rechner/page.tsx`: Rechengang Schritt 4 (korrekt aufrunden auf volle Euro nach § 19 Abs. 2 WoGG i.V.m. Anlage 3 statt "Mindestwohngeld-Prüfung" + kaufmännisch), Rechengang-Schluss (wohngeldrechtliche Haushaltszusammensetzung statt Bedarfsgemeinschaft), FAQ 2 Einkommensgrenzen (keine Zahl-Faustregel, Verweis auf BMWSB), FAQ 4 Rückwirkung (§ 25 Abs. 2 WoGG + § 25 Abs. 3 / § 27 Ausnahmefälle statt pauschale Drei-Monats-Regel). FAQ-Array als single source of truth — Änderungen propagieren automatisch in Schema.org-JSON-LD. ✅
- **121** — Stufe-4b P2-Pass + SSOT für BAföG/Bürgergeld/Pfändung (ohne Wohngeld — läuft als Explainer bis 120c/Juni): Neue SSOT-Libs `bafoeg-parameter.ts` + `buergergeld-parameter.ts` mit Stichtag-Switch-Pattern (BAföG single-bucket mit Skeleton für WS 2026/27, Bürgergeld mit H1+H2-Bucket für 01.07.2026 „Neue Grundsicherung"; H2-Parameter identisch zu H1 als Skeleton bis Gesetzestext). BAföG-Anrechnungsquote § 25 Abs. 6 als Funktion der Geschwister (0,50 − 0,05/Kind mit min/max-Clamp). Recherche-Korrektur zum Prompt: Antragsteller zählt NICHT selbst als „Kind" (bestätigt § 25 Abs. 6 + BMBF-FAQ) — bei 0 Geschwistern Quote 0,50 statt vorher hartkodiert 0,45. Bürgergeld-Mehrbedarfe § 21 SGB II alle 6 Tatbestände (Abs. 2/3/4/5/6/7) mit korrekter Alleinerziehend-Kombinations-Logik (max(Nr.1 36 %, Nr.2 12 %/Kind), 60 %-Deckel) + altersgestaffelter Warmwasser-Prozentsatz. UI-Erweiterungen: aufklappbare „Weitere Bedarfe"-Sektion mit 4 Checkboxen + 2 Euro-Feldern, KdU-Angemessenheitshinweis § 22 SGB II als dezenter Info-Block. Pfändung: Monat-Picker „Stichtag" mit Default = heute. Drei neue Verify-Scripts: 16/19/5 grün, alle gegen externe Gesetzesreferenzen (nicht-zirkulär). ✅
- **121-fix** — Bürgergeld-Rechner UI-Komplettierung (22.04.2026): Kinder-Input-Block auch bei „Alleinstehend" (nicht nur „Paar mit Kindern"); explizite Alleinerziehend-Checkbox mit Wechselmodell-Hinweis (§ 21 Abs. 3 SGB II verlangt alleinige Pflege/Erziehung, nicht bloßes Kind-Vorhandensein); Dreifach-Guard `bg === 'alleinstehend' && kinder.length > 0 && alleinerziehend`; neutraler „automatisch im Haushalt"-Text ersetzt; `handleBgChange`-Cleanup beim Paar-Wechsel. Lib unverändert — Verify-Scripts weiter 19/19 grün. ✅
- **121-analyse** — BAföG Geschwister-in-Ausbildung-Logik dokumentiert in `docs/audit-arbeitspapiere/bafoeg-geschwister-analyse.md`. Analyse ohne Code-Change: Lib wendet simultan + 730 €/Geschw Freibetrag (§ 25 Abs. 3) UND − 5 %-Punkte Anrechnungsquote (§ 25 Abs. 6) an. Beide Effekte aus dem gleichen Input gespeist — entspricht Gesetzestext (Abs. 6 verweist explizit auf Abs. 3). § 11 Abs. 4 BAföG (Aufteilung bei mehreren geförderten Auszubildenden) ist NICHT implementiert — User bekommt bei dem Fall zu niedrigen Betrag ausgewiesen. Karstens Netto-Sprung „3.489 → 2.206" im Screenshot konnte Lib-seitig nicht reproduziert werden (nettoEltern unverändert durch Geschwisterzahl). ✅
- **121-geschwister-label** — BAföG-UI-Transparenz (22.04.2026): Help-Text unter Geschwister-Feld benennt jetzt beide Effekte und § 11 Abs. 4 als vereinfacht abgebildet; neuer grauer Disclaimer-Block (analog KdU-Hinweis BuergergeldRechner) unterhalb der Aufschlüsselung mit Verweis auf §§ 11 Abs. 3 + 4, § 25 Abs. 6 BAföG; Netto-Display als Fall A bestätigt (ist tatsächlich `nettoEltern`, keine Label-Korrektur nötig). Keine Lib-Änderung — Testfall-Werte bleiben identisch, Verify-Script 16/16 grün. ✅
- **120d-fix** — Vier fachliche Textkorrekturen in der Wohngeld-Erklärseite (22.04.2026): Rechengang Schritt 4 korrekt aufrunden nach § 19 Abs. 2 WoGG (Anlage 3); Schluss-Begriff „wohngeldrechtliche Haushaltszusammensetzung" statt „Bedarfsgemeinschaft"; FAQ 2 ohne konkrete Einkommensgrenzen-Zahl; FAQ 4 Rückwirkung nach § 25 Abs. 2/3 + § 27 WoGG differenziert. FAQ-Array bleibt single source of truth (propagiert in Schema.org JSON-LD). ✅
- **120d-sidebar** — Wohngeld-Erklärseite Kategorie-Sidebar wiederhergestellt (22.04.2026): Sidebar-Pattern 1:1 aus `app/[kategorie]/[rechner]/page.tsx` übernommen (`kategorien` + `getRechnerByKategorie` + `aria-current`), Wohngeld-Eintrag visuell als aktuelle Seite markiert (`AKTUELLER_SLUG = 'wohngeld-rechner'`), Breite auf `lg:w-64` angeglichen, AdSlot wandert in die Sidebar. Keine Content-Änderungen. Build 203/203 grün, Route weiterhin statisch gerendert. ✅
- **122-amazon** — Amazon Partner-Programm (Tag `rechenfix-21`) integriert (22.04.2026): Rechtliches (Footer-Pflichthinweis, Datenschutz § 9b, Cookie-Banner Marketing-Kategorie); neue Komponente `components/AmazonBox.tsx` + Helper `lib/amazon-link.ts` (keyword-basierte Suchlinks, Tag nur bei Marketing-Consent); Integration in 16 Rechner (Kochen 6, Sport 2, Auto 2, Wohnen 3, Alltag 1, Arbeit 2). Keine AmazonBox auf Gesundheit/Finanzen/Mathe. 180-Tage-Frist für ersten Referral läuft bis ca. 19.10.2026. Vollständige Dokumentation in `docs/amazon-integration.md`. Build 203/203 grün. ✅
- **122-doku-sync** — Doku-Sync nach Welle 1 Stufe 4b + Amazon (22.04.2026): CLAUDE.md + SKILL.md + Projekt-Referenz + Jahreswerte-Kalender auf Stand; neue Zeilen für BAföG- und Bürgergeld-Parameter, Amazon-Abschnitt, Anti-Patterns 9+10 (UI-Label-Rechtsbezug, statische Route-Sidebar), Regel 7+8 (Amazon-Consent, Zahlen-Erwartungen-Herkunft). Keine Code-Änderungen. ✅
