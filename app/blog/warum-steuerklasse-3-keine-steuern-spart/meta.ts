import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 17 (Maßeinheiten-Reihe). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 17,
  titel: 'Steuerklasse 3 spart keine Steuern – und warum das trotzdem nicht die ganze Wahrheit ist',
  beschreibung:
    'Die Steuerklasse regelt nur den Lohnsteuerabzug, nicht die Jahressteuer. Trotzdem ist die Wahl nicht egal: Elterngeld, Arbeitslosengeld und Krankengeld hängen daran – mit drei völlig verschiedenen Stichtagsregeln.',
  datum: '2026-08-27',
  rechnerSlug: 'steuerklassen-vergleich-rechner',
  rechnerPfad: '/finanzen/steuerklassen-vergleich-rechner',
};
