import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Über Rechenfix.de — Unabhängiges Rechnerportal aus Deutschland',
  description: 'Rechenfix.de — unabhängiges Rechnerportal aus Deutschland. Kostenlose Online-Rechner für Finanzen, Alltag, Wohnen und mehr. Schnell und ohne Anmeldung.',
  alternates: { canonical: 'https://www.rechenfix.de/ueber-uns' },
  openGraph: {
    title: 'Über Rechenfix.de — Unabhängiges Rechnerportal',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Wohnen, Mathe und mehr. Schnell, privat und ohne Anmeldung.',
    url: 'https://www.rechenfix.de/ueber-uns',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Über Rechenfix.de' }],
  },
};

export default function UeberUnsSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Über uns' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Über Rechenfix.de
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          {/* Einleitung */}
          <div className="text-base leading-relaxed space-y-4">
            <p>
              Rechenfix.de ist ein unabhängiges Rechnerportal aus Deutschland. Wir bieten kostenlose Online-Rechner für Finanzen, Alltag, Wohnen, Mathe und mehr. Alle Berechnungen erfolgen direkt in Ihrem Browser — schnell, privat und ohne Anmeldung.
            </p>
            <p>
              Unser Ziel: Komplexe Berechnungen einfach und für jeden zugänglich machen. Alle Rechner werden regelmäßig auf Aktualität geprüft und an die neuesten Werte (Steuersätze, Sozialabgaben, Freibeträge) angepasst.
            </p>
            <p>
              Rechenfix.de finanziert sich durch Werbung und Affiliate-Partnerschaften. Die Rechner-Ergebnisse werden davon nicht beeinflusst.
            </p>
          </div>

          {/* Qualitätsstandards */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Unsere Qualitätsstandards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700/30 rounded-xl p-5">
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Aktuelle Daten (2026)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alle Rechner verwenden die aktuellen Werte für Steuersätze, Sozialversicherungsbeiträge, Freibeträge und gesetzliche Regelungen.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-xl p-5">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Geprüfte Formeln</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Jede Berechnung basiert auf dokumentierten Formeln und wird vor der Veröffentlichung gegen offizielle Quellen und Referenzwerte geprüft.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-5">
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Regelmäßige Updates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gesetzesänderungen, neue Steuersätze und aktualisierte Grenzwerte werden zeitnah in alle betroffenen Rechner eingepflegt.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl p-5">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">DSGVO-konform</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alle Berechnungen finden lokal in Ihrem Browser statt. Es werden keine persönlichen Daten an Server übertragen oder gespeichert.
                </p>
              </div>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Kontakt
            </h2>
            <p className="text-base leading-relaxed mb-3">
              Sie haben Fragen, Feedback oder einen Fehler entdeckt? Wir freuen uns über Ihre Nachricht.
            </p>
            <a
              href="mailto:info@rechenfix.de"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@rechenfix.de
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
