import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 16. Liegt im selben Ordner wie page.mdx (driftfrei).
 * Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 16,
  titel: 'Warum die Süßkartoffel teurer besteuert wird als die Kartoffel',
  beschreibung:
    'Eine Kartoffel wird mit 7 Prozent besteuert, eine Süßkartoffel mit 19. Der Grund steht nicht im Steuerrecht, sondern im Zolltarif — und selbst der erklärt es nicht ganz. Wie eine Liste aus dem Jahr 1968 bis heute darüber entscheidet, was an der Kasse billiger ist.',
  datum: '2026-08-19',
  rechnerSlug: 'mwst-rechner',
  rechnerPfad: '/finanzen/mwst-rechner',
};
