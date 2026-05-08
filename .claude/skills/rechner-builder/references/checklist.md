# Schnell-Checkliste: Neuer Rechner

Kopiere diese Checkliste und arbeite jeden Punkt ab:

## Vor dem Erstellen
- [ ] Kategorie festgelegt (alltag/finanzen/gesundheit/auto/wohnen/mathe/arbeit)
- [ ] URL-Slug gewählt (kebab-case, deutsch, z.B. "kaffee-kosten-rechner")
- [ ] 4 verwandte Rechner identifiziert
- [ ] Datenquellen/Formeln recherchiert

## Seite erstellen
- [ ] /app/[kategorie]/[slug]/page.tsx erstellt
- [ ] H1 mit Emoji + Name
- [ ] Beschreibungstext (1 Satz)
- [ ] Eingabefelder mit Default-Werten
- [ ] Live-Berechnung (kein Submit-Button)
- [ ] Ergebnis-Anzeige (groß, farbig)

## Features einbauen
- [ ] Ergebnis kopieren Button
- [ ] Teilen Button (WhatsApp, Mail, Link)
- [ ] AiExplain Komponente ("Fix erklärt")
- [ ] "War dieser Rechner hilfreich?" Feedback
- [ ] 4 verwandte Rechner-Kacheln

## SEO
- [ ] Meta-Title: "[Name] 2026 — [Beschreibung] | Rechenfix"
- [ ] Meta-Description mit "✓ Mit KI-Erklärung."
- [ ] Canonical: https://www.rechenfix.de/... (mit www!)
- [ ] Open Graph Tags
- [ ] SEO-Text mindestens 600 Wörter
- [ ] FAQ-Section mindestens 5 Fragen
- [ ] FAQPage Schema.org
- [ ] WebApplication Schema.org
- [ ] BreadcrumbList Schema.org

## Integration
- [ ] In Sidebar-Navigation aufgenommen
- [ ] Kategorie-Zähler aktualisiert
- [ ] Auf Kategorie-Seite gelistet
- [ ] In Sitemap (www.rechenfix.de!)
- [ ] npm run dev fehlerfrei
- [ ] Mobile getestet (320px Breite)
- [ ] Eingabefelder mindestens 48px hoch

## Nach Deploy
- [ ] Seite live aufrufbar
- [ ] Fix erklärt funktioniert
- [ ] URL in Google Search Console einreichen

---

## Pre-Phase-Checkliste (Welle 13+)

Vor jeder neuen Rechner-Implementierung oder Sub-Wellen-Update:

### Pre-Phase (vor Implementation)

- [ ] Component-Code-Upload anfordern: `components/rechner/<Name>Rechner.tsx`
- [ ] Config-Datei-Upload oder Eintrag-Auszug: `lib/rechner-config/<kategorie>.ts`
- [ ] Live-Audit der Seite durch Karsten-Inkognito (vor Implementation)
- [ ] Existing-Content-Inventar (h3-Sektionen, FAQ-Anzahl, Wortzahl)
- [ ] Drift-Audit gegen 2026-Stand (Werte, Gesetze, Sätze)
- [ ] AffiliateBox-Status (vorhanden? programId/context?)
- [ ] KI-Button-Position (in Calculator-Card oder unten?)
- [ ] Custom-UI-Inventar (was zu schützen?)

### Inhalts-Standards

- [ ] „Anwendungsfälle"-h3 mit 5 Bold-Lead-Stichpunkten (~250W)
- [ ] „Häufige Fehler"-h3 mit 5 Bold-Lead-Stichpunkten (~150W)
- [ ] FAQ ≥ 8 Q&A (Existing + 3 NEU)
- [ ] Drift-Fixes mit Datum/Gesetzesreferenz dokumentiert
- [ ] Wortzahl-Wachstum +35–45%
- [ ] Sprache sachlich, sensibel bei sensitivem Thema

### Architektur-Standards

- [ ] `config.affiliate?:`-Property gesetzt (falls 1 Affiliate-Box) oder undefined (falls keine)
- [ ] AffiliateBox aus Component entfernt (falls vorher dort)
- [ ] AiExplain in `<div className="mt-4">`-Wrapper
- [ ] ErgebnisAktionen in `<div className="mt-6">`-Wrapper
- [ ] AiExplain-Position: nach CrossLinks, vor ErgebnisAktionen

### Verify-Standards

- [ ] Karsten-Inkognito-Screenshots = ground truth
- [ ] Keine eigenen web_fetch-Aussagen zu Live-Stand
- [ ] A/B/C-Vergleich mit anderen Top-Rechnern für Pattern-Konsistenz

### Commit-Standards

- [ ] Atomic-Commit (eine Sub-Welle = ein Commit)
- [ ] Prägnante Commit-Message mit Sub-Wellen-ID
- [ ] `lib/rechner-config/client-data.ts` NICHT mit-committen
- [ ] Working-Tree nach Commit clean (außer client-data.ts-Drift)
