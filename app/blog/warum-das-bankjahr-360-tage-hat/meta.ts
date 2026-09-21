import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 19 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 19,
  titel: 'Das Bankjahr hat 360 Tage – und das Gesetz widerspricht sich dabei selbst',
  beschreibung:
    'Banken rechnen den Monat zu 30 und das Jahr zu 360 Tagen, der Effektivzins im selben Vertrag mit 365. § 191 BGB legt beide Jahreslängen in einem einzigen Satz fest – und das Finanzamt rechnet ebenfalls mit 360.',
  datum: '2026-09-22',
  rechnerSlug: 'zinsrechner',
  rechnerPfad: '/finanzen/zinsrechner',
};
