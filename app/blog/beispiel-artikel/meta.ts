import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten des Gerüstartikels. Liegt bewusst im selben Ordner wie page.mdx
 * (driftfrei). Wird von lib/blog.ts (Registry) und von page.mdx (Titel,
 * Schema, Canonical) gelesen — single source of truth.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  titel: 'Beispielartikel: So funktioniert der Blog',
  beschreibung: 'Gerüstartikel zum Testen der MDX-Infrastruktur. Wird durch echte Inhalte ersetzt.',
  datum: '2026-07-24',
  rechnerSlug: 'einheiten-umrechner',
  rechnerPfad: '/mathe/einheiten-umrechner',
};
