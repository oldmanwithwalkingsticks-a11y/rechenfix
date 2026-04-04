import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import CookieConsentProvider from '@/components/cookie/CookieConsentProvider';
import CookieBanner from '@/components/cookie/CookieBanner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ConsentScripts from '@/components/cookie/ConsentScripts';
import StructuredData from '@/components/seo/StructuredData';
import { generateWebsiteSchema } from '@/lib/seo';

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
  metadataBase: new URL('https://rechenfix.de'),
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://rechenfix.de',
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
    'google-adsense-account': 'ca-pub-1389746597486587',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 antialiased">
        <StructuredData data={generateWebsiteSchema()} />
        <ThemeProvider>
          <CookieConsentProvider>
            <ConsentScripts />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
            <ScrollToTop />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
