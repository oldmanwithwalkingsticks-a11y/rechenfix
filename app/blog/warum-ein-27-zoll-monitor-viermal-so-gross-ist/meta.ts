import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 11. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 11,
  titel: 'Warum ein 27-Zoll-Monitor viermal so groß ist',
  beschreibung:
    'Die Zollzahl auf dem Karton ist eine Diagonale — und war ursprünglich nicht einmal die des Bildes. Warum doppelte Zoll die vierfache Fläche bedeuten und 16:9 bei gleicher Zahl kleiner ist als 4:3.',
  datum: '2026-08-08',
  rechnerSlug: 'bildschirmgroesse-ppi-rechner',
  rechnerPfad: '/technik/bildschirmgroesse-ppi-rechner',
};
