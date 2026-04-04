import { MetadataRoute } from 'next';
import { kategorien, rechner } from '@/lib/rechner-config';

const SITE_URL = 'https://rechenfix.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
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
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  // Brutto-Netto-Tabelle & Mindestlohn Übersichtsseiten
  const sonderseiten: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/finanzen/brutto-netto-tabelle`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/finanzen/mindestlohn-netto`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  const kategoriePages: MetadataRoute.Sitemap = kategorien.map(k => ({
    url: `${SITE_URL}/${k.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const rechnerPages: MetadataRoute.Sitemap = rechner.map(r => ({
    url: `${SITE_URL}/${r.kategorieSlug}/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticPages, ...longTailPages, ...sonderseiten, ...kategoriePages, ...rechnerPages];
}
