# Amazon Partner-Programm Integration

**Datum Start:** 22.04.2026 (Prompt 122-amazon)
**Tag-ID:** `rechenfix-21` (Amazon Associates Germany, bestätigt 22.04.2026)
**Typ:** Suchlinks (keyword-basiert, selbstheilend — keine festen ASINs)
**Frist erster qualifizierter Referral:** ca. 19.10.2026 (180 Tage)

---

## Rechtliche Basics

- **Footer-Pflichthinweis:** ✓ [`components/layout/Footer.tsx`](../components/layout/Footer.tsx) — „Als Amazon-Partner verdiene ich an qualifizierten Verkäufen." unterhalb des Copyright-Hinweises.
- **Datenschutz-Abschnitt Amazon:** ✓ [`app/datenschutz/page.tsx`](../app/datenschutz/page.tsx) — neuer Abschnitt „9b. Amazon-Partnerprogramm" mit Tag-ID, Tag-Logik bei Consent, Link zur Amazon-Datenschutzerklärung.
- **Cookie-Banner Marketing-Kategorie:** ✓ [`components/cookie/CookieBanner.tsx`](../components/cookie/CookieBanner.tsx) — Label um „Amazon Associates" erweitert, Description nennt Tag `rechenfix-21`.
- **Consent-State:** bereits vorhanden — `useCookieConsent().marketingAllowed` in [`components/cookie/CookieConsentProvider.tsx`](../components/cookie/CookieConsentProvider.tsx). Kein neuer Hook nötig.

## Komponente & Helper

- [`components/AmazonBox.tsx`](../components/AmazonBox.tsx) — Box mit `keyword`-Prop, optional `headline`/`description`. Rendert Werbe-Kennzeichnung „Anzeige" oben rechts, Amazon-Branding-Orange (`#FF9900`), CTA „Auf Amazon suchen".
  - Link-Attribut: `rel="sponsored noopener noreferrer"`, `target="_blank"`
  - Tracking: `/api/track` analog zur AffiliateBox + GA-Event bei Marketing-Consent
  - SSR-fest: Initial-Render ohne Tag (marketingAllowed = false), Hydration zieht Tag nach
- [`lib/amazon-link.ts`](../lib/amazon-link.ts) — `createAmazonSearchLink(keyword, marketingConsentGranted)` exportiert den finalen Suchlink.
  - Ohne Consent: `https://www.amazon.de/s?k=<keyword>`
  - Mit Consent: `https://www.amazon.de/s?k=<keyword>&tag=rechenfix-21`

## Integrierte Rechner (16 von 20 Kandidaten)

| # | Rechner | Kategorie | Keyword | Platzierung |
|---|---|---|---|---|
| 1 | Rezept-Umrechner | Kochen | `digitale küchenwaage` | Vor CrossLinks |
| 2 | Backform-Umrechner | Kochen | `silikon backform` | Vor CrossLinks |
| 3 | Backzeit-Rechner | Kochen | `fleischthermometer digital` | Vor CrossLinks |
| 4 | Kochzeit-Rechner | Kochen | `fleischthermometer digital` | Vor CrossLinks |
| 5 | Pizzateig-Rechner | Kochen | `pizzastein` | Vor CrossLinks |
| 6 | Brotback-Rechner | Kochen | `brotbackform gusseisen` | Vor CrossLinks |
| 7 | Pace-Rechner | Sport | `laufschuhe` | Vor CrossLinks |
| 8 | Herzfrequenz-Zonen-Rechner | Sport | `sportuhr pulsmesser` | Vor CrossLinks |
| 9 | Spritkosten-Rechner | Auto | `kraftstoffzusatz` | Nach AffiliateBox (CHECK24 + hotel.de) |
| 10 | Fahrrad-Rahmengrößen-Rechner | Auto | `fahrrad computer` | Vor CrossLinks |
| 11 | Tapetenbedarf-Rechner | Wohnen | `tapete raufaser` | Vor CrossLinks |
| 12 | Malerkosten-Rechner | Wohnen | `wandfarbe weiß 10 liter` | Vor CrossLinks |
| 13 | Heizkosten-Rechner | Wohnen | `heizkörperthermostat` | Nach AffiliateBox (CHECK24) |
| 14 | Umzugskosten-Rechner | Alltag | `umzugskartons 30 stück` | Vor CrossLinks |
| 15 | Pendlerpauschale-Rechner | Arbeit | `handyhalterung auto` | Nach AffiliateBox (WISO) |
| 16 | Arbeitszeitrechner | Arbeit | `zeiterfassung stempeluhr` | Nach AffiliateBox (Lexware) |

## Übersprungene Kandidaten (von 20 insgesamt)

| # | Kandidat | Grund |
|---|---|---|
| — | Kalorienverbrauch-Rechner (Sport) | Existiert als `kalorienrechner` in Kategorie Gesundheit — per Regel ausgeschlossen (sensible Kategorie). |
| — | Trinkmengen-Rechner (Sport) | Existiert als `wasserbedarf-rechner` in Kategorie Gesundheit — per Regel ausgeschlossen. |
| — | Radzeit / Kilometer-Rechner (Sport) | Nicht im Repo vorhanden. |
| — | Tankkosten-Rechner (Auto) | Separater Rechner nicht vorhanden — Funktion deckt Spritkosten-Rechner bereits ab (keyword dort gesetzt). |
| — | Reifenprofil-Rechner (Auto) | Nicht im Repo vorhanden. |
| — | Ölwechsel-Rechner (Auto) | Nicht im Repo vorhanden. |
| — | Autobatterie-Rechner (Auto) | Nicht im Repo vorhanden. |
| — | Luftfeuchtigkeit / Entfeuchter-Rechner (Wohnen) | Nicht im Repo vorhanden. |
| — | Home-Office-Pauschale-Rechner (Arbeit) | Nicht als eigenständiger Rechner vorhanden (Homeoffice-Pauschale ist Teil der Pendlerpauschale-Lib, kein separater UI-Rechner). |

**Konsistenzregel:** Kategorien **Gesundheit, Finanzen, Mathe** bekommen **keine** AmazonBox — analog zur bestehenden Affiliate-Platzierungsregel aus Prompt 106 (thematischer Match vs. Kaufintention, Sensibilität).

## Rechner-Platzierungspattern

- **Ohne vorhandene AffiliateBox:** AmazonBox direkt vor dem CrossLinks-Block am Ende des Ergebnis-Bereichs.
- **Mit vorhandener AffiliateBox:** AmazonBox **nach** der letzten AffiliateBox (nicht konkurrierend in Werbeposition — gestapelt).
- Visueller Trenner: Orange-Akzent-Border links (`#FF9900`), klare Unterscheidung zu den farbig angepassten AffiliateBoxen.
- Werbe-Kennzeichnung „Anzeige" oben rechts (deutsche Werbekennzeichnung).

## Wichtige Regeln

### Selbstbezug verboten (Amazon-Teilnahmebedingungen)
Keine Käufe über eigene Affiliate-Links — auch nicht für Familienangehörige im selben Haushalt. Verstoß führt zur Account-Sperre.

**Karsten-Testklicks:**
- Im Inkognito-Browser **ohne** Marketing-Consent → Link enthält keinen Tag, kein Selbstbezug-Risiko
- Alternativ: externe URL `https://www.amazon.de/s?k=...` direkt aufrufen (ohne unseren Tag)

### Keine personalisierten Empfehlungen
Wir zeigen **Amazon-Suchergebnisse** zu einem Stichwort, keine „Produkttests" oder „Empfehlungen". Damit vermeiden wir Haftung für Produktauswahl.

### Consent-Philosophie
- Box **immer** sichtbar (auch ohne Marketing-Consent — User-Service)
- Tag `rechenfix-21` wird **nur** bei erteiltem Marketing-Consent angehängt
- Ohne Consent: Link funktioniert, wir bekommen keine Provision — Amazons eigenes Cookie-Tracking davon unabhängig

### Keine AmazonBox in diesen Kategorien
- **Gesundheit** (sensibel — Raucher, Schlaf, Blutdruck, BMI etc.)
- **Finanzen** (bereits durch CHECK24, WISO, smartsteuer, Verivox, Lexware belegt)
- **Mathe / Schule** (keine Kaufintention bei Schul-/Studiums-Traffic)

## Monitoring-Plan

| Woche | Aktion |
|---|---|
| 4 | Erste Klick-Statistik in Amazon PartnerNet prüfen. Welche Keywords/Rechner performen? |
| 12 | Conversion-Rate analysieren. Bei guter Performance einzelner Rechner: Prüfen, ob Upgrade auf kuratierte ASINs sinnvoll ist. |
| 24 (~19.10.2026) | **Vor Deadline:** Falls noch kein qualifizierter Referral — Maßnahmen eskalieren (weitere Rechner integrieren, Box-Positionen prominenter, redaktionelle Keywords mit höherer Kaufintention). |

## Technische Anti-Patterns (zur Erinnerung)

- **Keine festen ASINs** — selbstheilend via Suchlink gewählt, damit kein manueller Wartungsaufwand bei Produkteinstellung.
- **Keine automatische Weiterleitung, keine Popups, keine animierte Werbung** — User-Kontrolle bleibt.
- **Kein Prompt 68 (Google CMP)** aktiviert — bestehende 3-Kategorien-CookieBanner (Notwendig / Analyse / Marketing) bleibt. Amazon-Tag ist an die Marketing-Kategorie gekoppelt.
- **Keine Änderungen an `lib/berechnungen/`** — Amazon-Integration berührt ausschließlich UI-Schicht + Datenschutz/Cookie-Banner.

## Referenzen

- Amazon Associates Germany — [partnernet.amazon.de](https://partnernet.amazon.de)
- Teilnahmebedingungen — [affiliate-program.amazon.de/help/operating/agreement](https://affiliate-program.amazon.de/help/operating/agreement)
- Amazon Datenschutzerklärung — [amazon.de/gp/help/customer/display.html?nodeId=201909010](https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010)
- Rechenfix-Platzierungsregel — `CLAUDE.md` Abschnitt „Affiliate-Platzierungs-Regel (Stand April 2026, Prompt 106)"
