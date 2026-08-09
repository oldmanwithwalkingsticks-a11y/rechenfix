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

/**
 * Umkehrung der Zuordnung aus meta.ts: Zu welchem Artikel gehört ein Rechner?
 *
 * Hintergrund (W68): Jeder Artikel benennt in seiner meta.ts den Rechner, den er
 * einbettet (`rechnerSlug` / `rechnerPfad`). Genutzt wurde das bisher nur in einer
 * Richtung — vom Artikel zum Rechner. Der Rückweg fehlte, weshalb Besucher einer
 * Rechnerseite nie erfuhren, dass es zu genau diesem Thema einen Artikel gibt.
 *
 * Erwartet den reinen Rechner-Slug ohne Kategorie, also 'bmi-rechner', nicht
 * 'gesundheit/bmi-rechner'. Gibt undefined zurück, wenn es keinen Artikel gibt —
 * das ist der Normalfall, denn zu den allermeisten Rechnern existiert keiner.
 *
 * Gibt es mehrere Artikel zu einem Rechner (aktuell: einheiten-umrechner wird von
 * Artikel 1 und Artikel 10 verwendet), gewinnt der neuere. Bewusst so: Der zuletzt
 * erschienene Text ist der aktuellere Aufhänger.
 */
export async function getArtikelZuRechner(rechnerSlug: string): Promise<BlogArtikel | undefined> {
  const alle = await getAlleArtikel();
  return alle.find((a) => a.rechnerSlug === rechnerSlug);
}

/** Die n neuesten Artikel — für den Teaser auf der Startseite. */
export async function getNeuesteArtikel(anzahl = 3): Promise<BlogArtikel[]> {
  const alle = await getAlleArtikel();
  return alle.slice(0, anzahl);
}
