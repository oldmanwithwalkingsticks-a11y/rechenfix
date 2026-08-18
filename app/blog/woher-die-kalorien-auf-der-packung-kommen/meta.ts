import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 8. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 8,
  titel: 'Woher die Kalorien auf der Packung kommen',
  beschreibung:
    'Die Zahl auf der Packung ist keine Messung, sondern eine Rechnung nach einer Konvention von 1896 — und die FAO zählt 975 zulässige Kombinationen, sie zu ermitteln.',
  datum: '2026-08-03',
  rechnerSlug: 'naehrwert-rechner',
  rechnerPfad: '/kochen/naehrwert-rechner',
};
