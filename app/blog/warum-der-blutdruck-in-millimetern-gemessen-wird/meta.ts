import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 12. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 12,
  titel: 'Warum der Blutdruck in Millimetern gemessen wird',
  beschreibung:
    'Ein Druck, angegeben in einer Längeneinheit — und das Messgerät, auf das sie sich bezieht, ist seit Jahren verboten. Von einer Stute im Jahr 1733 über 2,51 Meter Blut bis zur gesetzlichen Ausnahme für Körperflüssigkeiten.',
  datum: '2026-08-09',
  rechnerSlug: 'blutdruck-rechner',
  rechnerPfad: '/gesundheit/blutdruck-rechner',
};
