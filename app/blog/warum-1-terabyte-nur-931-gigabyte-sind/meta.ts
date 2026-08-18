import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 4 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 4,
  titel: 'Warum 1 Terabyte nur 931 Gigabyte sind – und wer hier eigentlich falsch rechnet',
  beschreibung:
    'Das Wort Gigabyte hat zwei gültige Bedeutungen, festgeschrieben von zwei Normungsorganisationen, die sich widersprechen. Eine Lösung existiert seit 1999 — sie wird nur nicht benutzt.',
  datum: '2026-07-30',
  rechnerSlug: 'datenmengen-umrechner',
  rechnerPfad: '/technik/datenmengen-umrechner',
};
