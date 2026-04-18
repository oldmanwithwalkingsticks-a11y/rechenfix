# Rechenfix.de — Projekt-Referenz

Stand: April 2026

## Was ist rechenfix.de?

Rechenfix.de ist ein deutschsprachiges Online-Rechner-Portal mit aktuell **169 kostenlosen Rechnern** in 9 Kategorien. Slogan: "Fix gerechnet!". Alleinstellungsmerkmal gegenüber Konkurrenz: **KI-Erklärungen** ("Fix erklärt") via Anthropic Claude API — kein anderer deutscher Rechner-Anbieter hat das. Alle Berechnungen erfolgen live im Browser ohne Submit-Button. WCAG 2.1 AA konform (Lighthouse ≥97).

- **URL:** https://www.rechenfix.de (IMMER mit www!)
- **Hosting:** Vercel
- **Domain:** rechenfix.de → 308 Redirect auf www.rechenfix.de
- **Zweite Domain:** rechenfix.vercel.app (soll ebenfalls redirecten)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript
- **KI:** Anthropic Claude API (für "Fix erklärt"-Feature)
- **Monetarisierung:** AdSense + Affiliate (Awin-Netzwerk)

## Rechner-Inventar (Stand April 2026)

**169 eigenständige Rechner in 9 Kategorien:**

| Kategorie | Slug | Anzahl |
|---|---|---|
| Alltag | `/alltag` | 23 |
| Finanzen | `/finanzen` | 45 |
| Gesundheit | `/gesundheit` | 17 |
| Auto & Verkehr | `/auto` | 10 |
| Wohnen & Energie | `/wohnen` | 25 |
| Mathe & Schule | `/mathe` | 18 |
| Arbeit & Recht | `/arbeit` | 17 |
| Kochen & Ernährung | `/kochen` | 12 |
| Sport & Fitness | `/sport` | 2 |
| **Summe** | | **169** |

**Sitemap: 177 Rechner-URLs** — Differenz zu 169 erklärt sich durch Varianten-/Tabellen-Seiten unter `/finanzen/` (z.B. `2000-euro-brutto-netto` bis `5000-euro-brutto-netto`, `brutto-netto-tabelle`). Die dynamische Route `app/[kategorie]/[rechner]/page.tsx` rendert alle 177 URLs; Metadaten stehen in `lib/rechner-config/<kategorie>.ts`. Die URL `/gesundheit/herzfrequenz-rechner` wurde im April 2026 per 301-Redirect auf `/sport/herzfrequenz-zonen-rechner` konsolidiert (Feature-Obermenge).

## Sprint-Historie

### Sprint 1 — Tarif-Audit (April 2026) ✅ ABGESCHLOSSEN

**Ziel:** Alle drei Tarif-Rechner (Brutto-Netto, Lohnsteuer, Einkommensteuer) BMF-konform und cent-genau zum 1.1.2026.

**Umgesetzte Prompts:**
- **81** — §32a EStG Tarif 2026 + SV-Sätze + Formel-Umstellung
- **82** — Vorsorgepauschale §39b Abs. 4 EStG PAP-konform
- **83** — PV-Kinderabschlag nach § 55 Abs. 3 SGB XI (PUEG 2023) für 2+ Kinder
- **84** — UI-Felder "Kinder unter 25" in Lohnsteuer- und Einkommensteuer-Rechner
- **84a** — Clamping-Fix für neue Kinder-Inputs (Smoketest C3-Fail)

**Verifikations-Runs:**
- Testfall Single (3.500 €, StKl I, kinderlos): LSt 405,50 €/Mon, Netto 2.333,25 €/Mon — cent-genau
- Testfall Familie (5.000 €, StKl III, 2 Kinder): PV 77,50 €, LSt 409,00 €, Netto 3.546,00 €/Mon — cent-genau
- Einkommensteuer-Rechner bei zvE 46.974 € Splitting: ESt 4.908 €/Jahr — cent-genau
- Smoketest v3.1: 178/178 Rechner funktional grün

**Lessons Learned:**
- HTML `min`/`max` reicht nicht — onChange-Clamping Pflicht (Smoketest C3)
- PV-Kinderabschlag und Kinderfreibeträge sind zwei getrennte Konzepte, zwei getrennte UI-Felder
- Smoketest v3 findet Frontend-Integrität, aber keine numerische Korrektheit — für Tarif-Changes separat gegen BMF-Steuerrechner prüfen
- web_fetch-Tool-Cache kann bei Live-Audits irreführen — Inkognito-Browser-Check ist Ground Truth

## Test-Referenzwerte Tarif-Rechner (Stand April 2026)

Diese Werte dienen als Smoketest-Baseline für die Tarif-Rechner-Gruppe. Jede Abweichung ist ein Regressions-Kandidat und muss untersucht werden.

### Brutto-Netto-Rechner

| Szenario | Inputs | PV | LSt | Netto |
|---|---|---|---|---|
| Single kinderlos | 3.500 € / StKl I / 0 Kinder / keine KiSt | Kinderlos-Zuschlag 2,4 % | 405,50 €/Mon | 2.333,25 €/Mon |
| Familie | 5.000 € / StKl III / 2 Kinder / keine KiSt | 77,50 €/Mon (1,55 %) | 409,00 €/Mon | 3.546,00 €/Mon |

### Lohnsteuer-Rechner

| Szenario | Inputs | LSt |
|---|---|---|
| Single kinderlos | 3.500 € / StKl I / 0 Kinder | 405,50 €/Mon |
| Familie | 5.000 € / StKl III / 2 Kinder | 409,00 €/Mon |

### Einkommensteuer-Rechner

| Szenario | Inputs | ESt |
|---|---|---|
| Splitting mittig | zvE 46.974 € / Zusammenveranlagung / 2 Kinder | 4.908 €/Jahr |
| Grundtarif gleich | zvE 46.974 € / Einzelveranlagung / 0 Kinder | 9.501 €/Jahr |

**Amtliche Gegenprobe:** [BMF-Steuerrechner](https://www.bmf-steuerrechner.de/ekst/) mit identischen Inputs.

## Parkende Items (bis AdSense-Freigabe)

Zwei Prompts sind bewusst gesperrt, bis Google AdSense aktiv freigeschaltet ist:

1. **Prompt 85** — AdSense `data-nscript`-Warning fixen (nativer `<script>`-Tag in `app/layout.tsx` statt `next/script`). Script-Loader-Änderung könnte Review-Prozess beeinträchtigen.
2. **Prompt 68** — Google CMP + Consent Mode v2 aktivieren. Ersetzt das aktuelle self-built CookieBanner.tsx.

**Reihenfolge nach Freigabe:** erst 85 (Warning wegräumen), dann 68 (CMP dazu).

## Affiliate-System

### Netzwerk: Awin
Publisher-ID: 2843240

### Programme & Base-URLs
| Programm | awinmid | Deeplink-Domain | Verfügbare Pfade |
|----------|---------|-----------------|------------------|
| WISO Steuer (Buhl Data) | 17387 | buhl.de | /produkte/wiso-steuer/ |
| smartsteuer | 15043 | steuererklaerung.smartsteuer.de | / |
| Lexware Office | 13787 | lexware.de | /buchhaltungssoftware/ |
| CHECK24 | 9364 | **check24.net** (NICHT .de!) | /strom/, /gas/, /kfz-versicherung/, /kredit/ |
| congstar | 11938 | congstar.de | /handytarife/ |
| KS Auxilia | 108114 | — (keine Deeplinks) | — |
| Eventfloss Berlin | 27722 | eventfloss-berlin.de | / (nicht aktiv integriert) |
| Verivox | 14797 | verivox.de | /depot/, /depot/etf-vergleich/ |

### WICHTIG zu CHECK24
- Awin-Links leiten auf **check24.net** weiter, NICHT auf check24.de
- Nur 4 Deeplink-Pfade verfügbar: /strom/, /gas/, /kfz-versicherung/, /kredit/
- NICHT verfügbar: /baufinanzierung/, /umzug/, /altersvorsorge/, /depot/
- Für nicht verfügbare Produkte KEIN CHECK24-Affiliate verwenden

### Tracking
- `clickref`-Parameter enthält die volle Seiten-URL: `clickref=https%3A%2F%2Fwww.rechenfix.de%2F...`
- Wird dynamisch via `usePathname()` Hook generiert (nicht window.location!)
- Deeplink wird als `ued`-Parameter URL-encoded angehängt
- KS Auxilia hat keine Deeplinks aktiviert — kein `ued`-Parameter

### AffiliateBox-Komponente
- Pfad: `src/components/AffiliateBox.tsx`
- Client Component mit Props: `programId`, `context`, `variant` ("compact" | "full")
- Enthält localStorage-Tracking (`rf_aff_clicks`) und GA-Events
- "Anzeige"-Label oben rechts (deutsche Werbekennzeichnungs-Pflicht)
- `rel="noopener noreferrer sponsored"` auf allen Links
- CHECK24 hat ein `deeplinks`-Objekt (verschiedene Deeplinks je nach Context)
- Alle anderen Programme haben einen einzelnen `deeplink`-String

### Affiliate-Stats-Dashboard
- Route: `/admin/affiliate-stats` (versteckt, noindex)
- Liest localStorage-Klick-Daten aus
- Tabs: Nach Programm | Nach Rechner | Chronologisch
- CSV-Export und Daten-Löschen-Funktion

## Seitenstruktur jedes Rechners

Definiert im Skill: `/mnt/skills/user/rechner-builder/SKILL.md`

Pflicht-Elemente in dieser Reihenfolge:
1. Breadcrumbs (Startseite > Kategorie > Rechner-Name)
2. H1 mit Emoji + Name
3. Beschreibungstext (1 Satz)
4. Eingabefelder (min. 48px Höhe, Default-Werte, Labels, live-Berechnung)
5. Ergebnis-Anzeige (große Zahl, Aufschlüsselung, visuelles Element)
6. Ergebnis-Buttons: Kopieren + Teilen (WhatsApp, E-Mail, Link)
7. AffiliateBox (wenn Affiliate vorhanden)
8. "Fix erklärt" KI-Button (`AiExplain`-Komponente)
9. "War dieser Rechner hilfreich?" Feedback (👍/👎)
10. SEO-Text (min. 600 Wörter, H2-Struktur, Formel-Box, Rechenbeispiel)
11. FAQ-Accordion (min. 5 Fragen, FAQPage Schema.org)
12. "Das könnte Sie auch interessieren" (4 verwandte Rechner-Karten)

### Schema.org Markup
- WebApplication (auf jedem Rechner)
- FAQPage (auf jedem Rechner)
- BreadcrumbList (auf jedem Rechner)

### Meta Tags
- Title: "[Rechner-Name] 2026 — [Kurzbeschreibung] | Rechenfix"
- Description mit ✓-Zeichen für Features
- Canonical: https://www.rechenfix.de/... (IMMER mit www)
- OpenGraph-Tags

## SEO-Status

### Domain-Konfiguration
- www.rechenfix.de → Primary Domain (Vercel)
- rechenfix.de → 308 Permanent Redirect auf www (gefixt am 13.04.2026, war vorher 307)
- rechenfix.vercel.app → sollte ebenfalls 308 auf www redirecten
- Alle URLs in Sitemap und Canonical Tags MÜSSEN www verwenden

### Google Search Console
- Property: rechenfix.de
- Früherer Fehler "Umleitungsfehler" (7 Seiten) durch 307→308-Fix behoben
- Früherer Fehler "Alternative Seite mit richtigem kanonischen Tag" durch Redirect-Fix behoben

## Rechtliches

- **Datenschutzerklärung:** Enthält Abschnitt zu Affiliate-Links
- **Impressum:** Enthält Hinweis zu Affiliate-Links
- **Über-uns:** Enthält Finanzierungshinweis
- **Barrierefreiheitserklärung:** `/barrierefreiheit` (seit April 2026)
- **Cookie-Banner:** Marketing-Cookies als eigene Kategorie
- **Werbekennzeichnung:** Alle AffiliateBoxen zeigen "Anzeige"-Label
- Sprache: Deutsch, formale "Sie"-Anrede

## Entwicklung mit Claude Code

### Infrastruktur
- **rechner-config aufgeteilt:** `lib/rechner-config/alltag.ts`, `finanzen.ts`, `gesundheit.ts`, `auto.ts`, `wohnen.ts`, `mathe.ts`, `arbeit.ts` + `index.ts` + `types.ts`
- **CLAUDE.md** existiert im Projekt-Root mit allen Regeln
- Sessions: 3–5 Rechner pro Session möglich

### Offene Tasks
- Prompt 34: Systematische Crosslinks zwischen allen Rechnern
- Prompt 78-review: Barrierefreiheitserklärung Inhalts-Check nach finalem Stand
- Google Search Console: Neue URLs nach jedem Batch einreichen

### Skill für neue Rechner
Pfad: `/mnt/skills/user/rechner-builder/SKILL.md`
MUSS vor dem Bau jedes neuen Rechners gelesen werden. Enthält die komplette 12-Step-Anleitung.

### Prompt-Struktur für neue Rechner
Jeder Prompt für einen neuen Rechner enthält:
- Verweis auf den Skill (ZUERST lesen!)
- Route, Emoji, Name, Beschreibung
- Eingabefelder mit Defaults
- Berechnungsformeln (exakt, mit Code-Blöcken)
- Ergebnis-Anzeige (was wie dargestellt wird)
- Affiliate-Integration (welches Programm, welcher Context)
- SEO-Angaben (Title, Description, applicationCategory)
- SEO-Text-Themen und FAQ-Fragen
- Verwandte Rechner + Kategorie-Eintrag

### Häufige Fehler
- URLs ohne www in Sitemap oder Canonical
- clickref zeigt "startseite" statt Rechner-Namen → usePathname() verwenden
- CHECK24-Deeplinks auf check24.de statt check24.net
- Fehlender "Fix erklärt"-Button
- Keine Default-Werte (Rechner leer beim Laden)
- SEO-Text unter 600 Wörter
- Submit-Button statt Live-Berechnung
- Sidebar-Count nicht aktualisiert nach neuem Rechner
- Input-Felder unter 48px (Mobile-Probleme)

## Accessibility-Status (Stand April 2026)

- WCAG 2.1 AA Ziel erreicht (Lighthouse ≥97 auf Referenzseiten)
- Barrierefreiheitserklärung unter /barrierefreiheit
- Audit-Stand: Prompts 78a–h + 78j abgeschlossen
- Komponenten: RadioToggleGroup, TabGroup, Skip-Link, aria-live-Ergebnis-Pattern, AiExplain-Disclosure mit Fokus-Lenkung
- BFSG-Einschätzung: Kleinstunternehmer-Ausnahme greift voraussichtlich; Selbstbewertung gepflegt
- Nächstes geplantes Review: 78-review (Inhalt der BfE-Seite nach finalem Fix-Stand überprüfen)

## Komponenten-Inventar (Auswahl)

| Komponente | Pfad | Zweck |
|------------|------|-------|
| RadioToggleGroup | `components/ui/RadioToggleGroup.tsx` | Werte-Auswahl (2–4 Optionen) mit nativen Radio-Inputs + Fieldset/Legend |
| TabGroup | `components/ui/TabGroup.tsx` | Panel-Umschaltung (WAI-ARIA Tabs Pattern mit Roving Tabindex) |
| NummerEingabe | `components/ui/NummerEingabe.tsx` | Deutsche Zahleneingabe mit Einheiten-Suffix |
| ErgebnisAktionen | `components/ui/ErgebnisAktionen.tsx` | Kopieren/Teilen + debounced aria-live-Region |
| AiExplain | `components/rechner/AiExplain.tsx` | "Fix erklärt" Disclosure mit Fokus-Lenkung |
| AffiliateBox | `components/AffiliateBox.tsx` | Kontextuelle Affiliate-Empfehlung |
| CrossLink | `components/ui/CrossLink.tsx` | Verwandte Rechner-Links |
| FeedbackButtons | `components/ui/FeedbackButtons.tsx` | 👍/👎 Bewertung |
| Skip-Link | `app/layout.tsx` | Überspringen der Navigation (href="#main-content") |

## Monetarisierungs-Strategie

### AdSense
- Basis-Monetarisierung auf allen Seiten
- Mehr Traffic = mehr Impressions

### Affiliate-Einnahmen
- Kontextuelle AffiliateBox nach dem Rechenergebnis
- Max. 2 Boxen pro Rechner-Seite
- Stärkste Programme nach EPC: KS Auxilia (5,94€), Lexware (5,12€)
- Größtes Volumen-Potenzial: WISO/smartsteuer (Steuer-Rechner)
- Breiteste Streuung: CHECK24 (Strom, Gas, Kfz, Kredit)
- Neu: Verivox (ETF-Depot, Sparplan, Altersvorsorge)

### Affiliate-Funnels (Cross-Links)
- Kündigung → Abfindung → Steuererstattung (KS Auxilia → KS Auxilia+WISO → WISO+smartsteuer)
- Geburtstermin → Mutterschutz → Elterngeld (kein Affiliate → WISO → WISO)
- Stromkosten → Stromvergleich (CHECK24 → CHECK24)
- Auto: Sprit → Autokosten → Kfz-Steuer (alle CHECK24)
