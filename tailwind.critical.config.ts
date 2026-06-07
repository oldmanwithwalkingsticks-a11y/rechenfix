import type { Config } from 'tailwindcss';
import base from './tailwind.config';

// fix/critical-css — Critical-CSS-Config: identisches Theme wie die
// Haupt-Config, aber reduzierter `content`-Scope auf die above-the-fold-
// Shell-Dateien (Layout, Header, Home-Hero, Rechner-Kopf). Tailwind
// generiert daraus preflight + @layer components + nur die ATF-Utilities
// → kleines Critical-CSS (inline), der Rest lädt non-blocking nach.
const config: Config = {
  ...base,
  content: [
    './app/layout.tsx',
    './app/page.tsx',
    './app/[kategorie]/[rechner]/page.tsx',
    './components/layout/Header.tsx',
    './components/layout/ThemeToggle.tsx',
    './components/layout/SearchBar.tsx',
    './components/ui/TippDesTages.tsx',
    './components/ui/BerechnungsZaehler.tsx',
  ],
};
export default config;
