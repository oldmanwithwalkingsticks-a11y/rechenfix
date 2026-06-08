import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
// fix/critical-css (W14): Critical-CSS (~50 KB, above-the-fold) inline
// für sofortiges, FOUC-freies Rendern; das volle Tailwind-Output wird über
// FULL_CSS_HREF NON-BLOCKING nachgeladen (preload + JS-Append im <head>) und
// ist über alle Seiten/Wiederbesuche gecacht. Erzeugt von
// scripts/build-critical-css.mjs.
import { CRITICAL_CSS, FULL_CSS_HREF } from '@/lib/critical-css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider';
import CookieBanner from '@/components/cookie/CookieBanner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ConsentScripts from '@/components/cookie/ConsentScripts';
import StructuredData from '@/components/seo/StructuredData';
import { generateWebsiteSchema } from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563EB' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
  title: {
    default: 'Rechenfix.de — Kostenlose Online-Rechner',
    template: '%s | Rechenfix.de',
  },
  description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort berechnen ohne Anmeldung.',
  metadataBase: new URL('https://www.rechenfix.de'),
  keywords: ['online rechner', 'kostenloser rechner', 'rechner deutsch', 'rechenfix'],
  authors: [{ name: 'Rechenfix.de' }],
  creator: 'Rechenfix.de',
  publisher: 'Rechenfix.de',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Rechenfix.de',
    title: 'Rechenfix.de — Kostenlose Online-Rechner',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort berechnen ohne Anmeldung.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Rechenfix.de — Kostenlose Online-Rechner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rechenfix.de — Kostenlose Online-Rechner',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://www.rechenfix.de',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '_ZYnL2qqwrcx4Nz7KxkPG2cTlBOapbWbi7IdX3dzHFI',
  },
  other: {
    'google-adsense-account': ADSENSE_PUBLISHER_ID,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* fix/critical-css: kleines Critical inline (above-the-fold, FOUC-frei). */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        {/* Volles CSS non-blocking nachladen: preload startet den Fetch früh,
            das inline-Script hängt es als <link rel=stylesheet> an — dynamisch
            angehängte Stylesheets blockieren das initiale Paint NICHT. noscript
            sorgt für JS-deaktivierte Clients/Crawler. */}
        <link rel="preload" as="style" href={FULL_CSS_HREF} />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<link rel="stylesheet" href="${FULL_CSS_HREF}">`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(
              FULL_CSS_HREF,
            )};document.head.appendChild(l);})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 antialiased font-sans">
        {/* AdSense Basis-Loader — via next/script mit strategy="afterInteractive"
            (W15C-T4-F1). Lädt nach React-Hydration und blockiert dadurch nicht
            mehr LCP der Erklär-Cards. AdSense-Crawler erkennt den Loader
            weiterhin sauber (Pattern offiziell von Google empfohlen). Die
            <ins>-Ad-Slot-Tags in AdSlot.tsx bleiben unverändert. CMP-
            Integration folgt in Prompt 68 nach AdSense-Freigabe. */}
        <Script
          id="adsense-loader"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Zum Hauptinhalt springen
        </a>
        <StructuredData data={generateWebsiteSchema()} />
        <ThemeProvider>
          <CookieConsentProvider>
            <ConsentScripts />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>
            <Footer />
            <CookieBanner />
            <ScrollToTop />
          </CookieConsentProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
