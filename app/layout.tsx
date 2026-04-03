import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Rechenfix.de — Kostenlose Online-Rechner',
    template: '%s | Rechenfix.de',
  },
  description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Mathematik und mehr. Sofort berechnen ohne Anmeldung.',
  metadataBase: new URL('https://rechenfix.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Rechenfix.de',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col bg-white text-gray-800 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
