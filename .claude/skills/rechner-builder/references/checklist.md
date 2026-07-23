# Schnell-Checkliste: Neuer Rechner

Kopiere diese Checkliste und arbeite jeden Punkt ab:

## Vor dem Erstellen
- [ ] Kategorie festgelegt (alltag/finanzen/gesundheit/auto/wohnen/mathe/arbeit)
- [ ] URL-Slug gewählt (kebab-case, deutsch, z.B. "kaffee-kosten-rechner")
- [ ] 4 verwandte Rechner identifiziert
- [ ] Datenquellen/Formeln recherchiert
- [ ] **Gesetzes-Bezüge identifiziert** (relevante §§ aus EStG/SGB/BGB/etc.) und im Code-Kommentar mit Stand + Quelle dokumentiert
- [ ] **Alle Tabellen-Werte/Sätze/Grenzen** als named constants am File-Anfang (oder SSOT-Import aus `lib/berechnungen/`) — KEINE magic numbers inline
- [ ] **Jeder gesetzlich bestimmte Wert** hat Inline-Begründung mit Paragraf + Stand + Quelle

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
- [ ] Meta-Description ohne ✓-Suffix, ≤155 Zeichen, „kostenlos" natürlich eingeflochten
- [ ] Canonical: https://www.rechenfix.de/... (mit www!)
- [ ] Open Graph Tags
- [ ] **Content-Wortzahl ≥ 750** (`erklaerung` + FAQ kombiniert, Ideal 1.000–1.500 W — W13.C/AdSense-Konformität)
- [ ] **FAQ-Section 5–8 Fragen** (Empfehlung 6, Top-Rechner ≥ 8)
- [ ] FAQPage Schema.org
- [ ] WebApplication Schema.org
- [ ] BreadcrumbList Schema.org

## Integration
- [ ] **Slug ganz vorne in `neueRechnerSlugs`** (`lib/rechner-config/index.ts`) eingetragen — sonst erscheint der Rechner nie unter „✨ Neu hinzugefügt" auf der Startseite (`getNeueRechner()` nimmt die ersten 3)
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
- [ ] FAQ: **5–8 Q&A** (Empfehlung 6 für Neu-Rechner, Top-Rechner ≥ 8)
- [ ] **Content-Wortzahl ≥ 750** (`erklaerung` + FAQ kombiniert, Ideal 1.000–1.500W — AdSense-Konformität seit W13.C, 09.05.2026)
- [ ] Drift-Fixes mit Datum/Gesetzesreferenz dokumentiert
- [ ] Sprache sachlich, sensibel bei sensitivem Thema

### Architektur-Standards (Affiliate seit W14.A-Abschluss, 10.05.2026)

- [ ] `config.affiliate` gesetzt — Single-Object bei 1 Box, Array bei ≥ 2 Boxen (oder weggelassen falls Affiliate-frei)
- [ ] **AffiliateBox NICHT im Component hartkodiert** (L-46-Pflicht: Pre-Phase-grep `grep -nE '<AffiliateBox' components/rechner/<Name>Rechner.tsx` durchgeführt)
- [ ] Bei hartkodierten Treffern: Standard-Migration ins `config.affiliate`-Array ODER bewusste Sonderfall-Triage (P1/P2/P3/P4a/P4b — siehe welle-status-historie)
- [ ] AiExplain in `<div className="mt-4">`-Wrapper
- [ ] ErgebnisAktionen in `<div className="mt-6">`-Wrapper
- [ ] AiExplain-Position: nach CrossLinks, vor ErgebnisAktionen

### Gesetzes- & Tabellen-Standards (Skill v2, 10.05.2026)

- [ ] **Gesetzes-Bezüge recherchiert** und im Code-Kommentar mit Paragraf + Stand + Quelle dokumentiert (gesetze-im-internet.de / bundesfinanzministerium.de / BMAS / DRV / BGBl-PDFs)
- [ ] **Alle verwendeten Tabellen-Werte/Sätze/Grenzen** als named constants am File-Anfang gesammelt — KEINE magic numbers inline
- [ ] **Jeder gesetzlich bestimmte Wert** hat Inline-Begründung mit Paragraf + Stand + Quelle (auch in zentralen Libs)
- [ ] Wo möglich SSOT-Import aus `lib/berechnungen/<domain>.ts` statt eigener Hardcode (CLAUDE.md → „Zentrale Libs (SSOT)")
- [ ] Bei unterjährig wechselnden Werten: Stichtag-Switch-Pattern (`getAktuelle…(stichtag)`) statt nackter Konstante
- [ ] Audit-Vorbereitung: `grep -rn "Stand: " lib/berechnungen/` zeigt alle Stichtage des Repos — neue Datei muss dort auftauchen

### Verify-Standards

- [ ] Karsten-Inkognito-Screenshots = ground truth
- [ ] Keine eigenen web_fetch-Aussagen zu Live-Stand
- [ ] A/B/C-Vergleich mit anderen Top-Rechnern für Pattern-Konsistenz

### Commit-Standards

- [ ] Atomic-Commit (eine Sub-Welle = ein Commit)
- [ ] Prägnante Commit-Message mit Sub-Wellen-ID
- [ ] `lib/rechner-config/client-data.ts` NICHT mit-committen
- [ ] Working-Tree nach Commit clean (außer client-data.ts-Drift)
