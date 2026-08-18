import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 6 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 6,
  titel: 'Wie viel ist ein Cup – und warum die Frage keine eindeutige Antwort hat',
  beschreibung:
    'Vier verschiedene Cups sind gleichzeitig in Gebrauch, und der Cup auf der Packung ist nicht der im Rezept. Derselbe Cup Mehl wiegt je nach Handbewegung 120 oder 160 Gramm.',
  datum: '2026-07-30',
  rechnerSlug: 'cups-umrechner',
  rechnerPfad: '/kochen/cups-umrechner',
};
