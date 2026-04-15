import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import ScrollToTop from '@/components/layout/ScrollToTop';
import StructuredData from '@/components/seo/StructuredData';
import { generateWebsiteSchema } from '@/lib/seo';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-CNVMHDZM4S';
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1389746597486587';

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
    'google-adsense-account': 'ca-pub-1389746597486587',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Google Consent Mode v2 — Default auf "denied" VOR allen Google-Tags */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 antialiased font-sans">
        <StructuredData data={generateWebsiteSchema()} />

        {/* Google Analytics 4 — läuft cookielos bis Consent erteilt */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true
            });
          `}
        </Script>

        {/* Google AdSense + Google CMP (Funding Choices) */}
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
