import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Rechenfix.de — Angaben gemäß § 5 DDG.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.rechenfix.de/impressum' },
  openGraph: {
    title: 'Impressum',
    description: 'Impressum von Rechenfix.de — Angaben gemäß § 5 DDG.',
    url: 'https://www.rechenfix.de/impressum',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Impressum — Rechenfix.de' }],
  },
};

export default function ImpressumSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Impressum' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Impressum
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          {/* Anbieter */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Angaben gemäß § 5 DDG
            </h2>
            <p>Karsten Kautz</p>
            <p>rechenfix.de — Fix gerechnet!</p>
            <p>Dülkener Straße 35</p>
            <p>47804 Krefeld</p>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Kontakt
            </h2>
            <p>Telefon: +49 (0) 15906167737</p>
            <p>
              E-Mail:{' '}
              <a
                href="mailto:info@rechenfix.de"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                info@rechenfix.de
              </a>
            </p>
          </section>

          {/* Umsatzsteuer */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
              <span className="font-semibold whitespace-nowrap">DE293513316</span>
            </p>
          </section>

          {/* Streitbeilegung */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Wir nehmen an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teil. Zuständig ist die
              Universalschlichtungsstelle des Zentrums für Schlichtung e.V.,
              Straßburger Straße 8, 77694 Kehl am Rhein (
              <a
                href="https://www.verbraucher-schlichter.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                https://www.verbraucher-schlichter.de
              </a>
              ).
            </p>
          </section>

          {/* Affiliate-Hinweis */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Hinweis zu Affiliate-Links
            </h2>
            <p>
              Rechenfix.de finanziert sich über Werbeanzeigen und Affiliate-Partnerschaften. Für die Werbung wird Google AdSense genutzt — Anzeigen sind als &bdquo;Anzeige&ldquo; gekennzeichnet.
            </p>
            <p className="mt-3">
              Bei einigen Rechnern verlinken wir zu thematisch passenden Anbietern (u.&nbsp;a. CHECK24, WISO Steuer, smartsteuer, Cosmos Direkt) über das Affiliate-Netzwerk Awin. Klickt jemand auf einen solchen Link und schließt einen Vertrag ab, erhalten wir eine Vergütung. Für Nutzer entstehen dadurch keine Mehrkosten.
            </p>
            <p className="mt-3">
              Welcher Affiliate-Link bei welchem Rechner angezeigt wird, entscheiden wir nach thematischer Passung — nicht nach Provisionshöhe. Die vollständige Liste aller Partner-Programme mit Anbieter-Adressen und Rechtsgrundlage steht in der{' '}
              <a
                href="/datenschutz"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </section>

          {/* Social-Media-Kanäle */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Social-Media-Kanäle
            </h2>
            <p>
              Dieses Impressum gilt auch für unsere Social-Media-Auftritte, insbesondere{' '}
              <a
                href="https://www.instagram.com/rechenfix/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                Instagram (@rechenfix)
              </a>{' '}
              und{' '}
              <a
                href="https://www.facebook.com/profile.php?id=1127293363806857"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                Facebook
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
