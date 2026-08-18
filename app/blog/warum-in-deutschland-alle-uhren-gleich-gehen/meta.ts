import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 9. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 9,
  titel: 'Warum in Deutschland alle Uhren gleich gehen',
  beschreibung:
    'Bis 1893 gingen in deutschen Bahnhöfen zwei Uhren gleichzeitig. Wie daraus eine gemeinsame Zeit wurde — und warum sie im Mai 2027 die Kopplung an die Erddrehung verliert.',
  datum: '2026-08-04',
  rechnerSlug: 'uhrzeitrechner',
  rechnerPfad: '/alltag/uhrzeitrechner',
};
