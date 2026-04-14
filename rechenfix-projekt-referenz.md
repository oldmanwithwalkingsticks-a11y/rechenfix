# Rechenfix.de — Projekt-Referenz

Stand: 14. April 2026

## Was ist rechenfix.de?

Rechenfix.de ist ein deutschsprachiges Online-Rechner-Portal mit aktuell **80+ kostenlosen Rechnern** in 7 Kategorien (Ziel: 100). Es gibt 19 weitere Rechner mit fertigen Prompts (47-66), die noch gebaut werden müssen. Slogan: "Fix gerechnet!". Alleinstellungsmerkmal gegenüber Konkurrenz: **KI-Erklärungen** ("Fix erklärt") via Anthropic Claude API — kein anderer deutscher Rechner-Anbieter hat das. Alle Berechnungen erfolgen live im Browser ohne Submit-Button.

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

## Rechner-Übersicht (70 Rechner, 7 Kategorien)

### 📋 Alltag (14)
| Rechner | Route |
|---------|-------|
| Prozentrechner | /alltag/prozentrechner |
| Dreisatzrechner | /alltag/dreisatz-rechner |
| Tagerechner | /alltag/tagerechner |
| Rabattrechner | /alltag/rabattrechner |
| Countdown-Rechner | /alltag/countdown |
| Lebenszeit-Rechner | /alltag/lebenszeit-rechner |
| Streaming-Kosten-Rechner | /alltag/streaming-kosten-rechner |
| Kaffee-Kosten-Rechner | /alltag/kaffee-kosten-rechner |
| Lieferservice-Rechner | /alltag/lieferservice-rechner |
| Abo-Rechner | /alltag/abo-rechner |
| Handykosten-Rechner | /alltag/handykosten-rechner |
| Umzugskosten-Rechner | /alltag/umzugskosten-rechner |
| Trinkgeld-Rechner | /alltag/trinkgeld-rechner |
| Geburtstags-Rechner | /alltag/geburtstag-rechner |

### 💰 Finanzen (15)
| Rechner | Route | Affiliate |
|---------|-------|-----------|
| Brutto-Netto-Rechner | /finanzen/brutto-netto-rechner | WISO + smartsteuer |
| MwSt-Rechner | /finanzen/mwst-rechner | Lexware |
| Zinsrechner | /finanzen/zinsrechner | — |
| Elterngeld-Rechner | /finanzen/elterngeld-rechner | WISO |
| Bürgergeld-Rechner | /finanzen/buergergeld-rechner | — |
| Stundenlohnrechner | /finanzen/stundenlohn-rechner | Lexware |
| Sparrechner | /finanzen/sparrechner | Verivox |
| Inflationsrechner | /finanzen/inflationsrechner | — |
| Gehaltsvergleich | /finanzen/gehaltsvergleich | — |
| Wahrer Stundenlohn Rechner | /finanzen/wahrer-stundenlohn | — |
| Steuererstattungs-Rechner | /finanzen/steuererstattung-rechner | WISO + smartsteuer |
| Kreditrechner | /finanzen/kreditrechner | CHECK24 (/kredit/) |
| ETF-Sparplanrechner | /finanzen/etf-sparplanrechner | Verivox |
| Rentenrechner | /finanzen/rentenrechner | WISO + Verivox (bei Rentenlücke) |
| Splitting-Rechner | /finanzen/splitting-rechner | WISO + smartsteuer |
| Wohngeld-Rechner | /finanzen/wohngeld-rechner | — |
| BAföG-Rechner | /finanzen/bafoeg-rechner | — |
| Kindergeld-Rechner | /finanzen/kindergeld-rechner | WISO |
| Pflegegeld-Rechner | /finanzen/pflegegeld-rechner | — |
| Erbschaftsteuer-Rechner | /finanzen/erbschaftsteuer-rechner | WISO + smartsteuer |
| Minijob-Rechner | /finanzen/minijob-rechner | — |
| Gehaltserhöhung-Rechner | /finanzen/gehaltserhoehung-rechner | WISO |

Zusätzlich: Brutto-Netto-Tabelle und Einzelgehalt-Seiten (Mindestlohn, 2000€-5000€)

### 💚 Gesundheit (8)
| Rechner | Route |
|---------|-------|
| BMI-Rechner | /gesundheit/bmi-rechner |
| Raucher-Rechner | /gesundheit/raucher-rechner |
| Schlafrechner | /gesundheit/schlaf-rechner |
| Kalorienrechner | /gesundheit/kalorienrechner |
| Idealgewicht-Rechner | /gesundheit/idealgewicht-rechner |
| Geburtstermin-Rechner | /gesundheit/geburtstermin-rechner |
| Wasserbedarf-Rechner | /gesundheit/wasserbedarf-rechner |
| Körperfettrechner | /gesundheit/koerperfett-rechner |
| SSW-Rechner | /gesundheit/ssw-rechner |

Kein Affiliate in dieser Kategorie (sensibles Thema).

### 🚗 Auto & Verkehr (5)
| Rechner | Route | Affiliate |
|---------|-------|-----------|
| Spritkostenrechner | /auto/spritkosten-rechner | CHECK24 (/kfz-versicherung/) |
| KW-PS-Umrechner | /auto/kw-ps-umrechner | — |
| Kfz-Steuer-Rechner | /auto/kfz-steuer-rechner | CHECK24 (/kfz-versicherung/) |
| Bußgeldrechner | /auto/bussgeldrechner | KS Auxilia |
| Autokosten-Rechner | /auto/autokosten-rechner | CHECK24 (/kfz-versicherung/) |

### 🏠 Wohnen & Energie (10)
| Rechner | Route | Affiliate |
|---------|-------|-----------|
| Stromkostenrechner | /wohnen/stromkosten-rechner | CHECK24 (/strom/) |
| Nebenkostenrechner | /wohnen/nebenkosten-rechner | CHECK24 (/gas/) |
| Mietrechner | /wohnen/mietrechner | — |
| Heizkostenrechner | /wohnen/heizkosten-rechner | CHECK24 (/gas/) |
| Grunderwerbsteuerrechner | /wohnen/grunderwerbsteuer-rechner | WISO |
| Quadratmeter-Rechner | /wohnen/quadratmeter-rechner | — |
| Tapetenbedarf-Rechner | /wohnen/tapetenbedarf-rechner | — |
| Stromvergleich-Rechner | /wohnen/stromvergleich-rechner | CHECK24 (/strom/) |
| Baufinanzierungs-Rechner | /wohnen/baufinanzierung-rechner | CHECK24 (/kredit/) |
| Mietrendite-Rechner | /wohnen/mietrendite-rechner | CHECK24 (/kredit/) |
| Indexmiete-Rechner | /wohnen/indexmiete-rechner | — |
| Wärmepumpen-Rechner | /wohnen/waermepumpen-rechner | CHECK24 (/strom/) |

### 🎓 Mathe & Schule (7)
| Rechner | Route |
|---------|-------|
| Bruchrechner | /mathe/bruchrechner |
| Einheiten-Umrechner | /mathe/einheiten-umrechner |
| Notenschlüssel-Rechner | /mathe/notenschluessel-rechner |
| Durchschnittsrechner | /mathe/durchschnitt-rechner |
| Wissenschaftlicher Taschenrechner | /mathe/wissenschaftlicher-taschenrechner |
| Flächenrechner | /mathe/flaechenrechner |
| Prozentuale-Veränderung-Rechner | /mathe/prozentuale-veraenderung-rechner |

Kein Affiliate in dieser Kategorie (Schüler-Zielgruppe).

### 💼 Arbeit & Recht (11)
| Rechner | Route | Affiliate |
|---------|-------|-----------|
| Arbeitszeitrechner | /arbeit/arbeitszeitrechner | Lexware |
| Urlaubstage-Rechner | /arbeit/urlaubstage-rechner | KS Auxilia |
| Überstunden-Rechner | /arbeit/ueberstunden-rechner | KS Auxilia + Lexware |
| Pendlerpauschale-Rechner | /arbeit/pendlerpauschale-rechner | WISO |
| Promillerechner | /arbeit/promillerechner | — |
| Rechtsschutz-Rechner | /arbeit/rechtsschutz-rechner | KS Auxilia |
| Freelancer-Stundensatz-Rechner | /arbeit/freelancer-stundensatz-rechner | Lexware |
| Kündigungsfrist-Rechner | /arbeit/kuendigungsfrist-rechner | KS Auxilia |
| Teilzeit-Rechner | /arbeit/teilzeit-rechner | WISO |
| Abfindungsrechner | /arbeit/abfindungsrechner | KS Auxilia + WISO |
| Mutterschutz-Rechner | /arbeit/mutterschutz-rechner | WISO |
| Scheidungskosten-Rechner | /arbeit/scheidungskosten-rechner | KS Auxilia |

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
- **Cookie-Banner:** Marketing-Cookies als eigene Kategorie
- **Werbekennzeichnung:** Alle AffiliateBoxen zeigen "Anzeige"-Label
- Sprache: Deutsch, formale "Sie"-Anrede

## Entwicklung mit Claude Code

### Infrastruktur-Verbesserungen (offen)
- **rechner-config.ts aufsplitten:** Die Datei hat 6.000+ Zeilen und muss in eine config pro Kategorie gesplittet werden (lib/rechner-config/alltag.ts, finanzen.ts etc.) → spart 80% Token pro Session
- **CLAUDE.md** existiert im Projekt-Root mit allen Regeln
- Sessions: 3-5 Rechner pro Session möglich, Anweisung "Lies Dateien nicht komplett ein, nutze grep" am Anfang geben

### Offene Prompts (19 Rechner)
Prio B: Uhrzeitrechner (47), Schwangerschaft-Gewicht (48), Photovoltaik (49), Abi-Rechner (50), Krankengeld (51), Skontorechner (52), Leasing (53), Volumenrechner (54), Zugewinnausgleich (55)
Prio C: Alkohol-Abbau (57), Währungsrechner (58), Malerkosten (59), Hochrechner (60), Zyklusrechner (61), Hundejahre (62), Dachflächen (63), Binär-Rechner (64), GmbH-GF (65), Arbeitstage (66)

### Weitere offene Tasks
- Prompt 8: Affiliate-Stats-Dashboard (/admin/affiliate-stats)
- Prompt 34: Systematische Crosslinks zwischen allen Rechnern (erst nach allen Rechnern!)
- Prompt 16: CHECK24-Deeplinks pro Rechner (prüfen ob schon umgesetzt)
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
