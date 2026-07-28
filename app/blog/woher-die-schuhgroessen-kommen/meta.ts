import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 3 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  titel: 'Woher die Schuhgrößen kommen – und warum Größe 42 keine 42 Zentimeter ist',
  beschreibung:
    'Drei Größensysteme, drei Nullpunkte, keine gemeinsame Einheit: Die ISO-Norm räumt in ihrem eigenen Text ein, dass es keine exakte Umrechnung zwischen EU-, UK- und US-Schuhgrößen gibt.',
  datum: '2026-07-28',
  rechnerSlug: 'schuhgroessen-rechner',
  rechnerPfad: '/alltag/schuhgroessen-rechner',
};
