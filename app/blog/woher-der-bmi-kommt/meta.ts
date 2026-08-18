import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 5 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 5,
  titel: 'Woher der BMI kommt – und warum sein Erfinder ihn nie für einzelne Menschen gedacht hat',
  beschreibung:
    'Der Body-Mass-Index wurde für Bevölkerungsstatistik entwickelt. Sowohl Adolphe Quetelet als auch Ancel Keys warnten vor der Anwendung auf Einzelpersonen — die heute Standard ist.',
  datum: '2026-07-30',
  rechnerSlug: 'bmi-rechner',
  rechnerPfad: '/gesundheit/bmi-rechner',
};
