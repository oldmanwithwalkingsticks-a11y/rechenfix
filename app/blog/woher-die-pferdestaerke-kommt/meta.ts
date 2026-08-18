import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 2 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 2,
  titel: 'Woher die Pferdestärke kommt – und warum niemand genau weiß, welches Pferd gemeint war',
  beschreibung:
    'Jedes Auto wird bis heute in Pferdestärken gemessen. Die Zahl 33.000 geht auf ein einziges Notizbuch von James Watt zurück – und auf die beiläufige Schätzung eines Mühlenbauers.',
  datum: '2026-07-25',
  rechnerSlug: 'kw-ps-umrechner',
  rechnerPfad: '/auto/kw-ps-umrechner',
};
