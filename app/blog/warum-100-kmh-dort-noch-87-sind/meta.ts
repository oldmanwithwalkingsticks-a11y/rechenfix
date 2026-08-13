import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 15. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  titel: 'Warum 100 km/h dort noch 87 sind, wo 50 km/h schon stehen',
  beschreibung:
    'Die Bremsweg-Faustformel aus der Fahrschule unterstellt eine bestimmte Bremsverzögerung, ohne sie zu nennen. Rechnet man sie heraus, zeigt sich: Ausgerechnet die Formel für die Gefahrenbremsung trifft ziemlich genau — und die wichtigste Größe kommt in keiner Faustformel vor.',
  datum: '2026-08-13',
  rechnerSlug: 'bremsweg-rechner',
  rechnerPfad: '/auto/bremsweg-rechner',
};
