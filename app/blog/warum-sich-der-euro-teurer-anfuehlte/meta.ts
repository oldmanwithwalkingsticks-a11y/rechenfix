import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 7 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  titel: 'Warum sich der Euro teurer anfühlte, als er war',
  beschreibung:
    '1 Euro = 1,95583 D-Mark — sechs signifikante Stellen, ein Rundungsverbot per EU-Verordnung und ein Rechenfehler von 2,3 Prozent, den die Bundesbank selbst benannt hat.',
  datum: '2026-08-01',
  rechnerSlug: 'dm-euro-rechner',
  rechnerPfad: '/alltag/dm-euro-rechner',
};
