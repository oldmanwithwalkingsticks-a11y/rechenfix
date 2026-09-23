import type { BlogArtikel } from '@/lib/blog';

/**
 * Metadaten Artikel 20 (Brutto-Netto). Liegt im selben Ordner wie page.mdx
 * (driftfrei). Gelesen von lib/blog.ts (Registry) und von page.mdx selbst.
 */
export const artikel: Omit<BlogArtikel, 'slug'> = {
  nummer: 20,
  titel: 'Kinder senken die Lohnsteuer nicht – und das Netto steigt trotzdem',
  beschreibung:
    'Der Kinderfreibetrag wirkt beim Lohnsteuerabzug nur auf Soli und Kirchensteuer, der niedrigere Pflegebeitrag hebt die Lohnsteuer von Eltern sogar an. Dazu ein Soli mit Freigrenze statt Freibetrag und Sozialabgaben mit Deckel.',
  datum: '2026-09-23',
  rechnerSlug: 'brutto-netto-rechner',
  rechnerPfad: '/finanzen/brutto-netto-rechner',
};
