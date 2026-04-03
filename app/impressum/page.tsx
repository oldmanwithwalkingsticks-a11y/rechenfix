import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Rechenfix.de — Angaben gemäß § 5 TMG.',
  robots: { index: true, follow: true },
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
              Angaben gemäß § 5 TMG
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
                className="text-primary-500 dark:text-primary-400 hover:underline"
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
                className="text-primary-500 dark:text-primary-400 hover:underline"
              >
                https://www.verbraucher-schlichter.de
              </a>
              ).
            </p>
          </section>

          {/* Quelle */}
          <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Quelle:{' '}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 dark:text-primary-400 hover:underline"
              >
                e-recht24.de
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
