/** @type {import('next').NextConfig} */
const nextConfig = {
  // Komprimierung aktivieren
  compress: true,

  // Bilder-Optimierung
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 Tage
  },

  // Permanente Redirects für konsolidierte/umbenannte Rechner
  async redirects() {
    return [
      {
        // Konsolidierung April 2026: Feature-Obermenge liegt in der Sport-Kategorie.
        // Der frühere Gesundheits-Rechner war eine Teilmenge (nur Karvonen-Toggle,
        // eine HFmax-Formel). Sport-Variante bietet Tanaka/Fox/Karvonen, HFmax-
        // Override, Sportart-Kontext und Formel-Vergleichstabelle.
        source: '/gesundheit/herzfrequenz-rechner',
        destination: '/sport/herzfrequenz-zonen-rechner',
        permanent: true,
      },
      {
        // Kategorie- + Slug-Migration April 2026 (Prompt 126): Firmenwagen-
        // Besteuerung ist thematisch Auto & Verkehr; Slug-Schreibweise an die
        // 168 anderen Rechner angeglichen (Bindestrich statt zusammengeschrieben).
        source: '/finanzen/firmenwagenrechner',
        destination: '/auto/firmenwagen-rechner',
        permanent: true,
      },
    ];
  },

  // Headers für Caching und Security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Statische Assets lange cachen
        source: '/(.*)\\.(js|css|woff2|png|jpg|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
