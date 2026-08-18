import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 14. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 14,
  titel: 'Warum 1,1 Promille eine gerechnete Zahl sind',
  beschreibung:
    'Die Formel für Blutalkoholwerte stammt von 1932 und hat einen Schwachpunkt, den man nie beheben konnte. Der Grenzwert von 1,1 Promille ist eine Summe aus Erfahrungswert und Sicherheitszuschlag — und für dieselbe Blutprobe rechnet die Justiz mit zwei verschiedenen Abbauwerten.',
  datum: '2026-08-11',
  rechnerSlug: 'promillerechner',
  rechnerPfad: '/arbeit/promillerechner',
};
