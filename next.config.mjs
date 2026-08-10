import createMDX from '@next/mdx';
import withSerwistInit from '@serwist/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX-Blog: .md/.mdx als Seiten-Endungen zulassen (neben den bestehenden)
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  experimental: {
    // W53a (02.08.2026) — Serverless-Function-Größe unter dem 250-MB-Limit halten.
    // public/blog (8 Blog-Videos, ~154 MB) und public/social-videos-src (~16 MB)
    // werden NIE zur Laufzeit aus einer Function gelesen — Blog-Medien werden nur
    // statisch ausgeliefert (<Bild>/<Video src="/blog/…">, CDN), social-videos-src
    // ist reine Build-Quelle des lokalen Bild-Builders. Ohne diesen Ausschluss zieht
    // der node-file-trace sie über die process.cwd()+'public'-Referenzen (AuthorBio,
    // /ueber-uns, publisher) konservativ in JEDE Function; der [kategorie]/[rechner]-
    // Bundle lief dadurch mit dem kalorien-Video auf 263,82 MB (Deploy-Fehler,
    // Commit f706af7). public/social-posts und public/social-videos bleiben im Trace,
    // weil der Cron-Publisher sie zur Laufzeit per existsSync prüft.
    outputFileTracingExcludes: {
      '*': ['public/blog/**', 'public/social-videos-src/**'],
    },
  },

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
      {
        // W15C-T5-B-extra (23.05.2026): Externe Backlinks zeigen auf den
        // falschen Pfad /alltag/einheiten-umrechner — der Rechner liegt
        // tatsächlich unter /mathe/einheiten-umrechner (Display-Name
        // suggeriert Alltag, Slug-Kategorie ist Mathe; Lehre 14).
        source: '/alltag/einheiten-umrechner',
        destination: '/mathe/einheiten-umrechner',
        permanent: true,
      },
      {
        // W18.3g (04.07.2026): Kurz-Route für den TikTok-Bio-Link.
        // TikToks Bio-Feld ist auf 80 Zeichen limitiert und macht Links
        // nicht klickbar; /social?ref=tt ist dafür zu lang. /tt leitet
        // auf den Bio-Hub mit TikTok-Kontext weiter (?ref=tt → eigener
        // Bio-Slug social:current-bio-slug:tiktok, Block „Aus deinem
        // TikTok-Video"). Nicht permanent: Ziel kann sich ändern, ein
        // 301 wäre im Browser-Cache schwer zu widerrufen.
        source: '/tt',
        destination: '/social?ref=tt',
        permanent: false,
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
          // W73 — Einbettungsschutz. Ohne die beiden folgenden Angaben darf jede
          // fremde Seite rechenfix.de in einen unsichtbaren Rahmen legen und
          // Klicks abfangen. Die Rahmen-Direktive unten ist der moderne Weg, die
          // X-Frame-Zeile daneben bedient aeltere Browser, die sie nicht kennen.
          // ACHTUNG: Die Richtlinie enthaelt bewusst NUR die Rahmen-Angabe.
          // Eine vollstaendige Fassung mit Skript-Quellen gehoert in eine eigene
          // Welle und muss vorher im Nur-Melden-Modus gefahren werden.
          // (Wortlaut bewusst ohne die Direktiven-Namen — sonst zaehlt jede
          // Pruefung per grep den Kommentar mit; Lehre aus den Wellen 68-70.)
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
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

const withMDX = createMDX({});

// W69 — Serwist erzeugt aus app/sw.ts die Datei public/sw.js beim Build.
//
// register: false ist ENTSCHEIDEND. Ein Service Worker speichert Dateien auf dem
// Endgerät; das fällt unter § 25 TDDDG, der kein berechtigtes Interesse kennt. Die
// Registrierung erfolgt deshalb ausschließlich nach ausdrücklicher Zustimmung
// (/offline-nutzung) oder im bereits installierten Zustand (components/pwa/PwaStart).
//
// In der Entwicklungsumgebung ganz abgeschaltet, sonst überlagert ein alter Worker
// bei jedem Neustart die frischen Dateien.
const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  register: false,
  disable: process.env.NODE_ENV === 'development',
});

export default withSerwist(withMDX(nextConfig));
