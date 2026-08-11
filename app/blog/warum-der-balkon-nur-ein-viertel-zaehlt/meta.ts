import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 13. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  titel: 'Warum der Balkon nur zu einem Viertel zählt',
  beschreibung:
    'Die Quadratmeterzahl im Mietvertrag ist keine gemessene, sondern eine gerechnete Größe — nach einer Verordnung, die für frei finanzierte Wohnungen formal gar nicht gemacht wurde. Von der Dachschräge über die Badewanne bis zu drei Urteilen, die dieselbe Zahl unterschiedlich streng behandeln.',
  datum: '2026-08-11',
  rechnerSlug: 'quadratmeter-rechner',
  rechnerPfad: '/wohnen/quadratmeter-rechner',
};
