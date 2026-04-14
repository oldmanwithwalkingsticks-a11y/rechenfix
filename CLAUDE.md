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

## Häufige Fehler vermeiden
- URLs ohne www in Sitemap/Canonical
- CHECK24-Links auf check24.de statt check24.net
- Fehlender "Fix erklärt" Button (AiExplain-Komponente)
- SEO-Text unter 600 Wörter
- FAQ unter 5 Fragen
- Schema.org vergessen (WebApplication + FAQPage + BreadcrumbList)
