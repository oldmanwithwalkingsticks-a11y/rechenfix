import fs from 'node:fs';
import path from 'node:path';

export type BlogArtikel = {
  slug: string;
  titel: string;
  beschreibung: string;
  datum: string;          // ISO YYYY-MM-DD
  rechnerSlug?: string;   // verlinkter Rechner, für Teaser-Badge
  rechnerPfad?: string;   // z. B. /mathe/einheiten-umrechner
};

const BLOG_DIR = path.join(process.cwd(), 'app', 'blog');

/** Alle Artikel-Slugs = Unterordner von app/blog/ mit einer page.mdx. */
export function getArtikelSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => fs.existsSync(path.join(BLOG_DIR, d.name, 'page.mdx')))
    .map((d) => d.name);
}

/**
 * Metadaten aller Artikel, neueste zuerst. Registry aus dem Dateisystem —
 * kein manuell gepflegtes Slug-Array (das driftet, siehe neueRechnerSlugs /
 * sitemap Long-Tail).
 *
 * Variante: meta.ts-Fallback (Welle 24). Jeder Artikel exportiert seine
 * Metadaten in `meta.ts` im selben Ordner wie die page.mdx (driftfrei, weil
 * lokal beim Artikel). Gelesen per dynamischem `import()` statt `require(.mdx)`
 * — ESM-konform (keine no-require-imports-Lint-Kollision) und ohne den
 * MDX-Loader im require-Kontext auszuführen.
 */
export async function getAlleArtikel(): Promise<BlogArtikel[]> {
  const slugs = getArtikelSlugs();
  const artikel = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`../app/blog/${slug}/meta`);
      const meta = mod.artikel as Omit<BlogArtikel, 'slug'> | undefined;
      if (!meta) throw new Error(`Blog-Artikel "${slug}": Export "artikel" fehlt in meta.ts`);
      return { slug, ...meta };
    })
  );
  return artikel.sort((a, b) => b.datum.localeCompare(a.datum)); // neueste zuerst
}
