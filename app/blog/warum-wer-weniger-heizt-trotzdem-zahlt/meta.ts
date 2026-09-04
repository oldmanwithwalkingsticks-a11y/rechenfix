import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 18 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 18,
  titel: 'Wer weniger heizt, zahlt trotzdem – und schuld sind nicht die Nachbarn',
  beschreibung:
    'Mindestens 30 Prozent der Heizkosten gehen nach Wohnfläche, unabhängig vom Verhalten. Der eigentliche Grund für ungerechte Abrechnungen sind ungedämmte Steigleitungen – und ob sie herausgerechnet werden dürfen, hängt an einem einzigen Wort.',
  datum: '2026-09-03',
  rechnerSlug: 'heizkosten-rechner',
  rechnerPfad: '/wohnen/heizkosten-rechner',
};
