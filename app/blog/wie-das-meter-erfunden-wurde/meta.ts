import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 1 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 1,
  titel: 'Wie das Meter erfunden wurde – und warum die berühmteste Version dieser Geschichte falsch ist',
  beschreibung:
    'Der Meter ist 0,2 mm zu kurz. Meist heißt es, ein Astronom habe seinen Fehler vertuscht. Eine geodätische Analyse von 2019 zeigt: Sein Anteil liegt unter 2 Prozent.',
  datum: '2026-07-24',
  rechnerSlug: 'einheiten-umrechner',
  rechnerPfad: '/mathe/einheiten-umrechner',
};
