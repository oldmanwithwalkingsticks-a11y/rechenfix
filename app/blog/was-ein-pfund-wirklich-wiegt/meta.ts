import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 10. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 10,
  titel: 'Was ein Pfund wirklich wiegt',
  beschreibung:
    'Das Gesetz, das das Pfund abgeschafft haben soll, hat es definiert. Warum für seine Abschaffung drei Jahreszahlen kursieren — und warum ein Pfund in den USA 46 Gramm leichter ist.',
  datum: '2026-08-05',
  rechnerSlug: 'einheiten-umrechner',
  rechnerPfad: '/mathe/einheiten-umrechner',
};
