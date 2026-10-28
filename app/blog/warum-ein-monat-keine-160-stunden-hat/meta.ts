import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 21 (Stundenlohn). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 21,
  titel: 'Ein Monat hat keine 160 Stunden – und auch nicht genau 173,33',
  beschreibung:
    'Vier Wochen mal 40 Stunden stimmen nur im Februar. Der Gesetzgeber rechnet mit 52 ÷ 12, der Kalender und der Tarifvertrag mit 4,348, der Zoll kennt noch weitere Monatslängen. Was das für Stundenlohn, Überstunden und Mindestlohn bedeutet.',
  datum: '2026-10-28',
  rechnerSlug: 'stundenlohn-rechner',
  rechnerPfad: '/finanzen/stundenlohn-rechner',
};
