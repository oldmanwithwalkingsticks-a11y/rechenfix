import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Kein Disallow für /ki-rechner (Welle 22): Googlebot muss die Seite
      // crawlen dürfen, um das noindex-Meta (index:false, follow:true) zu lesen
      // und zu respektieren. Ein Disallow hätte das Crawlen — und damit das
      // Lesen des noindex — verhindert. Die Seite bleibt via noindex aus dem
      // Index, reicht aber Link-Equity an die echten Rechner weiter.
    },
    sitemap: 'https://www.rechenfix.de/sitemap.xml',
  };
}
