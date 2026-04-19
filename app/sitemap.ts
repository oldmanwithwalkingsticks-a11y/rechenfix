import { MetadataRoute } from 'next';
import { execSync } from 'node:child_process';
import { kategorien, rechner } from '@/lib/rechner-config';

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
      url: `${SITE_URL}/ki-rechner`,
      lastModified: gitMtime('app/ki-rechner/page.tsx'),
      changeFrequency: 'weekly',
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

  // Rechner: mtime der Config-Datei ihrer Kategorie (dasselbe Datum wie die
  // Kategorieseite — Content-Änderung an einem Rechner aktualisiert lastmod
  // für die ganze Kategorie, was ein starkes Re-Crawl-Signal ist).
  const rechnerPages: MetadataRoute.Sitemap = rechner.map(r => ({
    url: `${SITE_URL}/${r.kategorieSlug}/${r.slug}`,
    lastModified: gitMtime(`lib/rechner-config/${r.kategorieSlug}.ts`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...longTailPages, ...sonderseiten, ...kategoriePages, ...rechnerPages];
}
