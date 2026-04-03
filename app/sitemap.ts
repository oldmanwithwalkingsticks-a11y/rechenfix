import { MetadataRoute } from 'next';
import { kategorien, rechner } from '@/lib/rechner-config';

const SITE_URL = 'https://rechenfix.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ];

  const kategoriePages = kategorien.map(k => ({
    url: `${SITE_URL}/${k.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const rechnerPages = rechner.map(r => ({
    url: `${SITE_URL}/${r.kategorieSlug}/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...kategoriePages, ...rechnerPages];
}
