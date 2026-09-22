import { MetadataRoute } from 'next';
import { execSync } from 'node:child_process';
import { kategorien, rechner } from '@/lib/rechner-config';
import { getLatestFeedbackDate } from '@/lib/feedback-log';
import { getAlleArtikel } from '@/lib/blog';

const SITE_URL = 'https://www.rechenfix.de';

// Git-basierte mtime pro Datei, gecached (Vercel zieht frischen Clone pro Build
// → Filesystem-mtime ist alle identisch; nur das Git-Log differenziert).
const mtimeCache = new Map<string, Date>();

function gitMtime(relativePath: string): Date {
  if (mtimeCache.has(relativePath)) return mtimeCache.get(relativePath)!;
  let result: Date;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${relativePath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    result = iso ? new Date(iso) : new Date();
  } catch {
    result = new Date();
  }
  mtimeCache.set(relativePath, result);
  return result;
}

// W145: lastmod je Rechner aus dem gepflegten Feld `letzteAktualisierung`.
// Vorher stand hier die Git-mtime der Kategoriedatei — dadurch trugen 175 der 256
// Sitemap-URLs denselben Stempel, und eine Änderung an einem Rechner meldete alle
// Rechner seiner Kategorie als geändert. Ein fehlendes, unlesbares oder in der Zukunft
// liegendes Datum fällt auf die alte Berechnung zurück.
function rechnerLastMod(r: { letzteAktualisierung?: string; kategorieSlug: string }): Date {
  const iso = r.letzteAktualisierung;
  if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const d = new Date(`${iso}T00:00:00Z`);
    if (!Number.isNaN(d.getTime()) && d.getTime() <= Date.now()) return d;
  }
  return gitMtime(`lib/rechner-config/${r.kategorieSlug}.ts`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const startseiteMtime = gitMtime('app/page.tsx');

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: startseiteMtime,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/aktualisierungen`,
      lastModified: new Date(getLatestFeedbackDate()),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // /ki-rechner: index+follow, sitewide verlinkt — gehoert in die Sitemap
    // (22.08.2026). Der fruehere Ausschluss berief sich auf noindex + nav-hide;
    // beides trifft nicht mehr zu. Niveau der uebrigen Rechner, nicht der
    // Rechtstexte: interaktive Seite mit 36 internen Links.
    {
      url: `${SITE_URL}/ki-rechner`,
      lastModified: gitMtime('app/ki-rechner/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Long-Tail SEO-Seiten (Brutto-Netto für spezifische Beträge)
  const longTailSlugs = [
    '2000-euro-brutto-netto',
    '2500-euro-brutto-netto',
    '3000-euro-brutto-netto',
    '3500-euro-brutto-netto',
    '4000-euro-brutto-netto',
    '5000-euro-brutto-netto',
  ];
  const longTailPages: MetadataRoute.Sitemap = longTailSlugs.map(slug => ({
    url: `${SITE_URL}/finanzen/${slug}`,
    lastModified: gitMtime(`app/finanzen/${slug}/page.tsx`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // Brutto-Netto-Tabelle & Mindestlohn-Übersichtsseiten
  const sonderseiten: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/finanzen/brutto-netto-tabelle`,
      lastModified: gitMtime('app/finanzen/brutto-netto-tabelle/page.tsx'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/finanzen/mindestlohn-netto`,
      lastModified: gitMtime('app/finanzen/mindestlohn-netto/page.tsx'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  // Kategorieseiten: mtime der zugehörigen lib/rechner-config/<kategorie>.ts
  const kategoriePages: MetadataRoute.Sitemap = kategorien.map(k => ({
    url: `${SITE_URL}/${k.slug}`,
    lastModified: gitMtime(`lib/rechner-config/${k.slug}.ts`),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Meta-Pages (E-E-A-T + Rechtliches). W15A.6: in Sitemap aufgenommen,
  // damit Google von uns ein aktives Indexierungs-Signal mit lastmod
  // erhält — vorher rein über Footer-Crawl erreichbar.
  // Bewusst NICHT in Sitemap:
  //   - /admin/affiliate-stats (intern)
  //   - /aktualisierungen (steht bereits in staticPages)
  const metaPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/ueber-uns`,
      lastModified: gitMtime('app/ueber-uns/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/qualitaet`,
      lastModified: gitMtime('app/qualitaet/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/feedback`,
      lastModified: gitMtime('app/feedback/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/barrierefreiheit`,
      lastModified: gitMtime('app/barrierefreiheit/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: gitMtime('app/impressum/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: gitMtime('app/datenschutz/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/ki-transparenz`,
      lastModified: gitMtime('app/ki-transparenz/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/nutzungsbedingungen`,
      lastModified: gitMtime('app/nutzungsbedingungen/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/offline-nutzung`,
      lastModified: gitMtime('app/offline-nutzung/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Blog-Übersicht + Artikel (Welle 24). Gerüstartikel (beispiel-artikel) ist
  // noindex und bleibt draußen. lastmod git-basiert wie alle anderen Routen.
  const blogUebersicht: MetadataRoute.Sitemap = [{
    url: `${SITE_URL}/blog`,
    lastModified: gitMtime('app/blog/page.tsx'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }];

  const blogArtikel: MetadataRoute.Sitemap = (await getAlleArtikel())
    .filter(a => a.slug !== 'beispiel-artikel')
    .map(a => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: gitMtime(`app/blog/${a.slug}/page.mdx`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }));

  // Rechner: lastmod aus dem gepflegten Feld `letzteAktualisierung` des jeweiligen
  // Rechners (W145). Vorher stand hier die mtime der Kategoriedatei — dadurch trugen
  // 175 der 256 URLs denselben Stempel, und eine Änderung an einem Rechner meldete
  // alle Rechner seiner Kategorie als geändert. Der Rückfallweg auf die mtime steckt
  // in rechnerLastMod.
  const rechnerPages: MetadataRoute.Sitemap = rechner.map(r => ({
    url: `${SITE_URL}/${r.kategorieSlug}/${r.slug}`,
    lastModified: rechnerLastMod(r),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...longTailPages, ...sonderseiten, ...kategoriePages, ...metaPages, ...blogUebersicht, ...blogArtikel, ...rechnerPages];
}
