import type { Config } from 'tailwindcss';
import base from './tailwind.config';

// fix/critical-css — Critical-CSS-Config: identisches Theme wie die Haupt-
// Config, aber reduzierter `content`-Scope. Erfasst ALLE Seiten + alle
// Nicht-Rechner-Komponenten (Shell: Header/Footer/Breadcrumbs/ZurueckButton/
// SearchBar/AdSlot/StandHinweis/Cookie/ui), damit das gesamte above-the-fold
// abgedeckt ist (FOUC-frei). Ausgeschlossen bleibt nur components/rechner/**
// (die 170 Rechner-Komponenten) sowie below-fold-Boxen wie AffiliateBox/
// AmazonBox/AiExplain/Quellen/AuthorBio — deren CSS lädt non-blocking nach.
const config: Config = {
  ...base,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './components/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './components/seo/**/*.{js,ts,jsx,tsx,mdx}',
    './components/ads/**/*.{js,ts,jsx,tsx,mdx}',
    './components/cookie/**/*.{js,ts,jsx,tsx,mdx}',
    './components/StandHinweis.tsx',
    './components/ThemeProvider.tsx',
  ],
};
export default config;
