import { MetadataRoute } from 'next';
import { execSync } from 'node:child_process';
import { kategorien, rechner } from '@/lib/rechner-config';
import { getLatestFeedbackDate } from '@/lib/feedback-log';

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

export default function sitemap(): MetadataRoute.Sitemap {
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
    // /ki-rechner bewusst nicht in Sitemap (W15A.4: noindex + nav-hide)
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
  //   - /ki-rechner (noindex seit W15A.4)
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
  ];

  // Rechner: mtime der Config-Datei ihrer Kategorie (dasselbe Datum wie die
  // Kategorieseite — Content-Änderung an einem Rechner aktualisiert lastmod
  // für die ganze Kategorie, was ein starkes Re-Crawl-Signal ist).
  const rechnerPages: MetadataRoute.Sitemap = rechner.map(r => ({
    url: `${SITE_URL}/${r.kategorieSlug}/${r.slug}`,
    lastModified: gitMtime(`lib/rechner-config/${r.kategorieSlug}.ts`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...longTailPages, ...sonderseiten, ...kategoriePages, ...metaPages, ...rechnerPages];
}
