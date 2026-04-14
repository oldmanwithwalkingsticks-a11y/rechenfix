# Rechenfix.de — Projektkontext

## Was ist das?
Deutsches Online-Rechnerportal. Ziel: #1 in Deutschland.
USP: KI-gestützte Erklärungen via Anthropic Claude API.
Live: https://www.rechenfix.de/

## Tech Stack
Next.js 14, Tailwind CSS, TypeScript, Vercel, GitHub.

## KRITISCHE REGELN
- Alle URLs MÜSSEN https://www.rechenfix.de/ verwenden (MIT www!)
- Sitemap, Canonical Tags, interne Links: IMMER mit www
- Prompts max 3.000 Zeichen (>10.000 Token = Fehler)
- Deployment: git add . && git commit && git push

## Aktive Features
- 40+ Rechner in 7 Kategorien
- "Fix erklärt" KI-Button auf allen Rechnern (Claude API)
- "Was wäre wenn?" auf Brutto-Netto-Rechner
- KI-Rechner Seite (/ki-rechner)
- Suchfeld, Social Proof Zähler, Tipp des Tages
- Feedback-Seite mit Resend E-Mail
- Long-Tail-Seiten (2000-5000€ brutto-netto)

## Custom Skill
Rechner-Builder: .claude/skills/rechner-builder/SKILL.md
Nutze diesen Skill bei JEDEM neuen Rechner.

## Umgebungsvariablen (Vercel)
- ANTHROPIC_API_KEY (Claude API)
- RESEND_API_KEY (Feedback-Mails)
- NEXT_PUBLIC_GA_ID (Analytics)
- NEXT_PUBLIC_ADSENSE_ID (AdSense)
