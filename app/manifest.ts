import type { MetadataRoute } from 'next';

/**
 * Web-App-Manifest (W69). Next.js liefert diese Datei unter /manifest.webmanifest
 * aus; ein Eintrag in app/layout.tsx ist dafür nicht nötig.
 *
 * Zweck: rechenfix auf dem Startbildschirm installierbar machen. Die Rechner rechnen
 * ohnehin vollständig im Browser, deshalb funktionieren einmal besuchte Seiten
 * zusammen mit dem Service Worker auch ohne Netz.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rechenfix – über 200 Rechner für den Alltag',
    short_name: 'Rechenfix',
    description:
      'Kostenlose Online-Rechner für Finanzen, Gesundheit, Auto, Wohnen und Alltag. Alle Eingaben bleiben im Browser.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#1e3a5f',
    lang: 'de',
    dir: 'ltr',
    categories: ['utilities', 'finance', 'education'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Eigenes Motiv ohne inneren Rahmen: Android beschneidet maskable-Icons je nach
      // Geräteform um bis zu 20 % — der Blitz sitzt deshalb in der sicheren Zone.
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      {
        name: 'Brutto-Netto-Rechner',
        short_name: 'Brutto-Netto',
        url: '/finanzen/brutto-netto-rechner',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Zinsrechner',
        short_name: 'Zinsen',
        url: '/finanzen/zinsrechner',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        url: '/blog',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
