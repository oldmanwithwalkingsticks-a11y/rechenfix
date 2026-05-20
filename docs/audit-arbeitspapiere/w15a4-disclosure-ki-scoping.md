# W15A Track 4 — Affiliate-Disclosure + KI-Branding-Mitigation Scoping

**Stand:** 21.05.2026 (Phase 1, Read-only)
**Trigger:** AdSense-Ablehnung 19.05.2026 → Welle-15-Tiefenanalyse Sekundärfaktoren (a) Affiliate-Disclosure-Boilerplate + (b) Marketing-Behauptung „Deutschlands erster Rechner mit KI-Erklärungen".

---

## A) Affiliate-Disclosure — Stellen verbatim

### A.1 [app/impressum/page.tsx](app/impressum/page.tsx) — **e-recht24-Boilerplate bestätigt**

**Z. 92–100 Affiliate-Hinweis-Section:**
```tsx
<section>
  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
    Hinweis zu Affiliate-Links
  </h2>
  <p>
    Diese Website enthält Affiliate-Links. Bei einem Kauf über diese Links erhalten wir eine Provision. Affiliate-Links sind als „Anzeige" gekennzeichnet.
  </p>
</section>
```

**Z. 102–115 Quelle-Footer (explizit e-recht24-Verweis):**
```tsx
<section className="pt-4 border-t border-gray-200 dark:border-gray-700">
  <p className="text-sm text-gray-500 dark:text-gray-500">
    Quelle:{' '}
    <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
      e-recht24.de
    </a>
  </p>
</section>
```

**Status W14 Track B:** Impressum unangetastet. Track B hat nur Datenschutz + Cookie-Banner + Footer + Docs angefasst.

**Empfehlung:** Affiliate-Hinweis substantieller formulieren (analog Datenschutz Section 9) + e-recht24-Quelle prüfen (Karsten-Entscheidung). Drei Sätze sind dünn, AdSense-Reviewer sieht „generisches Boilerplate".

### A.2 [app/datenschutz/page.tsx](app/datenschutz/page.tsx) Section 9 — **substantiell, Track-B-konform**

**Z. 186–229 — kompletter Abschnitt 9 „Affiliate-Links und Werbung"** mit:
- Provisions-Erklärung („möglicherweise eine Provision vom Anbieter")
- Awin-Netzwerk + 8 Partner-Programme (congstar, Lexware Office, WISO Steuer / Buhl Data, smartsteuer, CHECK24, KS Auxilia, Eventfloss Berlin, Verivox)
- Awin AG-Adresse („Eichhornstraße 3, 10785 Berlin")
- Anonymisierte Klick-Daten via Upstash-Redis in EU
- Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO

**Status W14 Track B:** Amazon-Section 9b komplett entfernt + Amazon-Verweis-Satz aus Section 9 entfernt (Commit `a111434`).

**Empfehlung:** Keine Änderung nötig. Der Block ist substantiell, transparent, listet konkrete Partner statt generischer Boilerplate. Genau das, was AdSense sehen will.

### A.3 [app/ueber-uns/page.tsx](app/ueber-uns/page.tsx) Section „Datenschutz und Transparenz" — **W15A.1-Stand**

**Z. 285–308:**
```tsx
<section className="card p-6 md:p-8 mb-8">
  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
    Datenschutz und Transparenz
  </h2>
  <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
    <p className="mb-4">
      <strong>Berechnungen erfolgen lokal in Ihrem Browser.</strong> Eingaben
      werden nicht an Rechenfix übermittelt, nicht protokolliert und nicht
      gespeichert. Sie können jeden Rechner nutzen, ohne sich anzumelden, ohne
      ein Konto anzulegen und ohne Cookies zu akzeptieren.
    </p>
    <p className="mb-4">
      <strong>Werbung und Affiliate-Links:</strong> Rechenfix.de finanziert
      sich durch Werbeeinblendungen und Affiliate-Partnerschaften. Affiliate-Links
      sind als solche gekennzeichnet. Die fachlichen Inhalte und Berechnungsergebnisse
      werden davon nicht beeinflusst — Empfehlungen erfolgen ausschließlich nach
      thematischer Passung, nicht nach Provisionshöhe.
    </p>
    <p>
      Detaillierte Angaben zur Datenverarbeitung finden Sie in der{' '}
      <Link href="/datenschutz" ...>Datenschutzerklärung</Link>.
    </p>
  </div>
</section>
```

**Status W14 Track B + W15A.1:** Aktueller Stand bereits gut — keine Provision/Werbung-Behauptung, klare Trennung „Inhalt nicht beeinflusst".

**Empfehlung:** Keine Änderung nötig.

### A.4 Andere Stellen (Cookie-Banner, FAQ, Sub-Pages)

- **Cookie-Banner** ([components/cookie/CookieBanner.tsx](components/cookie/CookieBanner.tsx) Z. 99–105 nach Track A+B): Marketing-Toggle-Description = „Ermöglichen die Anzeige personalisierter Werbung über Google AdSense." — sauber, kein Affiliate-Bezug mehr.
- **Footer** (Footer.tsx Z. 152–155 nach Track B): Copyright-Block ohne Amazon-Pflichthinweis — sauber.
- **FAQ-Block / Sub-Pages**: keine separaten Disclosure-Texte gefunden.

---

## B) KI-Branding — Stellen exhaustive + Empfehlung pro Stelle

### B.1 BEHALTEN (Feature-Name + transparente Mitigation)

| Datei:Zeile | Inhalt | Begründung |
|---|---|---|
| [components/rechner/AiExplain.tsx:152](components/rechner/AiExplain.tsx) | Button-Text: `Fix erklärt — Was bedeutet mein Ergebnis?` | Feature-Name als Brand, nicht KI-Marketing |
| [components/rechner/AiExplain.tsx:160](components/rechner/AiExplain.tsx) | Loading-State: `KI analysiert Ihr Ergebnis…` | Transparente UI-Information während des KI-Calls |
| [components/rechner/AiExplain.tsx:161](components/rechner/AiExplain.tsx) | sr-only: `KI-Erklärung wird geladen…` | A11y |
| [components/rechner/AiExplain.tsx:192](components/rechner/AiExplain.tsx) | Panel-Header: `Fix erklärt` | Feature-Name als Brand |
| [app/ueber-uns/page.tsx:58–64](app/ueber-uns/page.tsx) | Hero-Absatz 3: „...KI-gestützte Erklärung („Fix erklärt"): ... die zugrundeliegenden Formeln und Werte sind jedoch **nicht KI-generiert**, sondern manuell aus Primärquellen gepflegt" | **Das ist exakt die Mitigation, die wir wollen** — explizite Abgrenzung „Code, nicht AI-Content" |
| [app/barrierefreiheit/page.tsx:72](app/barrierefreiheit/page.tsx) | A11y-Hinweis Fokus-Lenkung bei „Fix erklärt"-KI-Erklärungen | A11y-Doku, kein Marketing |
| [app/feedback/FeedbackClient.tsx:13,296,324](app/feedback/FeedbackClient.tsx) | KI-Feedback als Userresearch-Kategorie | Legitime Feedback-Kategorie, nicht Marketing |
| [app/api/explain/route.ts:5,147](app/api/explain/route.ts) | Code-Kommentar `Stricter rate limit for KI-Rechner` | Code-internal, nicht user-facing |
| [lib/rechner-config/index.ts:26](lib/rechner-config/index.ts) | Kategorie-Erklärtext: „...erklärt 'Fix erklärt' den Rechenweg in einfacher Sprache" | Feature-Name in Erklärtext, kein „erster Rechner"-Pitch |

### B.2 UMFORMULIEREN → Tagline-Variante D

[app/page.tsx](app/page.tsx) — **4 Stellen** mit „Deutschlands erster Rechner mit KI-Erklärungen":

| Zeile | Aktueller Wortlaut | Soll |
|---|---|---|
| 10 (metadata.description) | `Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen.` | Tagline D + bestehende Service-Beschreibung |
| 14 (openGraph.description) | dito | dito |
| 24 (twitter.description) | dito | dito |
| 41 (Hero-Subtitle `<p>`) | `Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen (Fix erklärt).` | Tagline D als Subtitle |

**Tagline-Variante D (Karsten-Vorgabe):** `"170 Online-Rechner für Deutschland — mit Erklärungen statt blanker Zahlen"`

**Drift-Risiko Zahl 170:** Aktuell hartkodiert. Auf Hero-Page ist `alleRechner` schon importiert (Z. 2) — könnte dynamisch `{alleRechner.length} Online-Rechner...` rendern. Aber in Metadata-Strings ist das nicht möglich (Build-Time-Konstante). → siehe Klärungsfrage 5.

### B.3 UMFORMULIEREN / ENTFERNEN — KI-Banner auf Homepage

[app/page.tsx:52–71](app/page.tsx) — kompletter Marketing-Banner mit Gradient + CTA auf `/ki-rechner`:

```tsx
<section className="mb-12">
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-center">
    <p className="text-xl sm:text-2xl font-extrabold text-white mb-2">
      Rechenfrage? Einfach der KI stellen!
    </p>
    <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-5">
      Stellen Sie Ihre Rechenfrage in natürlicher Sprache — die KI liefert die Antwort und verlinkt Sie zum passenden Rechner.
    </p>
    <Link href="/ki-rechner" ...>Jetzt Frage stellen ...</Link>
  </div>
</section>
```

**Problem:** Bei „Mittel"-Versteckung von `/ki-rechner` (noindex + Sitemap-Remove + Nav-Remove) ist der CTA auf der Homepage **die einzige verbleibende Werbe-Eintrittsstelle** für die versteckte Page. Plus er verstärkt das KI-Marketing genau dort, wo AdSense den ersten Eindruck holt.

**Empfehlung:** Banner **komplett entfernen** (konsistent mit „Mittel"-Versteckung). Karsten bestätigt → siehe Klärungsfrage 1.

### B.4 VERSTECKEN — KI-Rechner-Page „Mittel"-Variante

| Stelle | Aktion |
|---|---|
| [app/ki-rechner/page.tsx:5–18](app/ki-rechner/page.tsx) metadata | `robots: { index: false, follow: false }` ergänzen |
| [app/sitemap.ts:38–43](app/sitemap.ts) | Eintrag für `${SITE_URL}/ki-rechner` komplett entfernen |
| [components/layout/Header.tsx:67–77](components/layout/Header.tsx) | KI-Rechner-Button im Header entfernen (Gradient-CTA mit Sparkles-Icon) |
| [components/layout/Footer.tsx:137–141](components/layout/Footer.tsx) | KI-Rechner-Link im Footer „Mehr"-Spalte entfernen |
| [app/robots.ts](app/robots.ts) | Optional: explizites `Disallow: /ki-rechner` — siehe Klärungsfrage 4 |

**Page-Body bleibt unangetastet:** Bei „Mittel"-Variante bleibt die Page über Direkt-Link erreichbar, nur nicht mehr indexiert/verlinkt. Hero-Text + 3-Schritt-Erklärung + Vorteile-Block bleiben.

---

## C) Edge-Cases

### C.1 OG-Images

- [public/og-images/](public/og-images/) ist **leer** (kein statisches Asset)
- [app/opengraph-image.tsx](app/opengraph-image.tsx) ist dynamisch generierte Edge-Route
- Inhalt: „Rechen**fix**.de" + „Fix gerechnet!" + „Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit" + Emoji-Reihe
- **KEIN KI-Branding-Text** im OG-Image → keine Änderung nötig

### C.2 Sitemap

- [app/sitemap.ts:38–43](app/sitemap.ts) hat **harten Eintrag** für `/ki-rechner` mit `priority: 0.8, changeFrequency: 'weekly'` → bei „Mittel"-Versteckung **entfernen**
- Long-Tail-, Sonder-, Kategorie- und Rechner-Pages alle unberührt

### C.3 Robots.txt

- [app/robots.ts](app/robots.ts) ist Standard-Implementierung: `{ rules: { userAgent: '*', allow: '/' }, sitemap: ... }`
- **Keine** KI-Rechner-spezifische Regel drin
- Bei „Mittel"-Versteckung reicht `robots: { index: false }` im Page-Metadata. Zusätzliches `Disallow: /ki-rechner` in robots.ts wäre redundant → siehe Klärungsfrage 4

### C.4 Header/Navigation

- KI-Rechner-Button als Gradient-CTA prominent in Header.tsx Z. 67–77 (mobile + desktop)
- Bei Versteckung: **entfernen**

### C.5 Footer

- KI-Rechner-Link in „Mehr"-Spalte zwischen „Über uns" und „Feedback geben"
- Bei Versteckung: **entfernen** (zwischen `Über uns` und `Feedback geben` direkt verbinden)

### C.6 README.md

- KI-Erwähnungen im Repo-README sind irrelevant für AdSense-Reviewer (kein Crawl-Target).
- Konsistenz-Update könnte später separat in einem Doku-Sprint kommen, kein Track-4-Scope.

---

## D) Tagline-Stelle

**Aktuell ([app/page.tsx:36–45](app/page.tsx)):**

```tsx
<section className="text-center py-12 md:py-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-300 mb-3">
    rechenfix.de — Fix gerechnet!
  </h1>
  <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
    Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen (Fix erklärt).
  </p>
  <SearchBar grosse="gross" className="mx-auto w-full" style={{ maxWidth: '600px' }} />
  <BerechnungsZaehler />
</section>
```

**Style-Konventionen:**
- Outer Container: `max-w-6xl mx-auto px-4 py-8`
- Hero-Section: `text-center py-12 md:py-20`
- H1: `text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-300 mb-3`
- Subtitle-`<p>`: `text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8`
- Mobile-Behavior: `max-w-2xl` zentriert, auf Mobile via `px-4` Container 16px Padding

**Soll-Ersetzung (Variante D):**

Mögliche Phrasierung in der `<p>`:
```
170 Online-Rechner für Deutschland — mit Erklärungen statt blanker Zahlen.
```

oder dynamisch (`{alleRechner.length}` ist bereits importiert):
```
{alleRechner.length} Online-Rechner für Deutschland — mit Erklärungen statt blanker Zahlen.
```

Style-Klassen bleiben unverändert.

---

## Klärungsfragen für Karsten

1. **KI-Banner auf Homepage** ([app/page.tsx:52–71](app/page.tsx)): bei „Mittel"-Versteckung des KI-Rechners sollte der Marketing-Banner mit CTA auf `/ki-rechner` **konsistent komplett raus**, oder „abgeschwächt" als Text-Hinweis ohne Gradient/CTA stehen bleiben?

2. **Affiliate-Disclosure in Impressum** ([app/impressum/page.tsx:92–100](app/impressum/page.tsx)): aktuell e-recht24-generisch („Provision bei Kauf, als Anzeige gekennzeichnet"). Soll dieser substantieller werden — analog Datenschutz Section 9 (Awin-Netzwerk-Erwähnung + Partner-Liste-Kurzhinweis + Verweis auf Datenschutz für Details)?

3. **e-recht24-Quellen-Footer** im Impressum ([Z. 102–115](app/impressum/page.tsx)): expliziter „Quelle: e-recht24.de"-Link am Seitenende — bleibt (Transparenz) oder raus (signalisiert „generisches Boilerplate")?

4. **Robots-Disallow für `/ki-rechner`**: reicht `robots: { index: false, follow: false }` im Page-Metadata, oder zusätzlich expliziter `Disallow: /ki-rechner` in [app/robots.ts](app/robots.ts)? Beides gleichzeitig wäre redundant — meine Empfehlung: nur Metadata, kein Robots-Entry.

5. **Hero-Tagline dynamisch oder fix?**: `{alleRechner.length} Online-Rechner für Deutschland — …` (dynamisch, kein Drift-Risiko bei neuen Rechnern) oder `170 Online-Rechner für Deutschland — …` (fix, leichter zu lesen, aber driftet bei der nächsten Rechner-Welle)? Metadata-Stellen müssen so oder so hartkodiert bleiben (Build-Time-Konstante).

---

## STOP — Karsten bestätigt Scoping vor Phase 2

**Zusammenfassung:**
- A) Affiliate-Disclosure: Impressum ist e-recht24-Boilerplate (1 substantielle Stelle zum Aufwerten). Datenschutz + Ueber-uns bereits gut.
- B) KI-Branding: 9 Stellen BEHALTEN (Feature-Name + Mitigation in ueber-uns), 4 Stellen UMFORMULIEREN (app/page.tsx Metadata + Hero), 1 Stelle EVENTUELL ENTFERNEN (KI-Banner auf Homepage, siehe Q1).
- C) Edge-Cases: OG-Image clean. Sitemap + Header + Footer brauchen je 1 Entry-Removal. Robots offen (Q4).
- D) Tagline-Stelle: 1 `<p>` in app/page.tsx:41, Style klar.

**Phase-2-Aufwand-Schätzung:** ~30–45 Min — kein Lib-Refactor, nur Text-Ersetzungen + 4 kleine Entfernungen (Sitemap-Entry, Header-Button, Footer-Link, optional KI-Banner).
