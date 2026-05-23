import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Belt-and-suspenders: /ki-rechner hat schon noindex-Meta + ist aus
      // sitemap.ts ausgenommen. Explizites Disallow ist zusätzliche Crawler-
      // Sicherung gegen Discovery via Backlinks (W15C-T5 H1).
      disallow: '/ki-rechner',
    },
    sitemap: 'https://www.rechenfix.de/sitemap.xml',
  };
}
