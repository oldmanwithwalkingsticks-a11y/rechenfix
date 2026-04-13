import KiRechnerClient from './KiRechnerClient';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KI-Rechner — Fragen Sie einfach! | Rechenfix',
  description: 'KI-Rechner: Stellen Sie eine Rechenfrage in natürlicher Sprache und erhalten Sie sofort die Antwort. Kostenlos und auf Deutsch.',
  alternates: { canonical: 'https://www.rechenfix.de/ki-rechner' },
  openGraph: {
    title: 'KI-Rechner — Fragen Sie einfach!',
    description: 'Stellen Sie eine Rechenfrage in natürlicher Sprache und erhalten Sie sofort die Antwort. Kostenlos und auf Deutsch.',
    url: 'https://www.rechenfix.de/ki-rechner',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'KI-Rechner von Rechenfix.de' }],
  },
};

export default function KiRechnerPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'KI-Rechner' },
        ]}
      />

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Powered by KI
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          KI-Rechner — Fragen Sie einfach!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Stellen Sie eine Rechenfrage in natürlicher Sprache. Die KI liefert die Antwort und verlinkt Sie zum passenden Rechner.
        </p>
      </div>

      <KiRechnerClient />

      {/* Wie funktioniert es */}
      <div className="mt-14 space-y-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Wie funktioniert der KI-Rechner?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-xl">&#x1F4AC;</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">1. Frage stellen</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Schreiben Sie Ihre Rechenfrage in natürlicher Sprache — so wie Sie sie einem Freund stellen würden.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl">&#x1F9E0;</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">2. KI berechnet</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Die KI erkennt den Rechentyp, führt die Berechnung durch und liefert eine präzise Antwort.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-xl">&#x1F517;</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">3. Detailrechner</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Am Ende jeder Antwort finden Sie einen Link zum passenden Rechner für exakte Berechnungen.</p>
            </div>
          </div>
        </div>

        {/* Kategorien */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Welche Fragen kann ich stellen?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { icon: '💰', name: 'Finanzen', items: 'Brutto-Netto, Zinsen, Inflation, Sparplan, Elterngeld' },
              { icon: '📋', name: 'Alltag', items: 'Prozente, Dreisatz, Rabatte, Einheiten, Tage' },
              { icon: '🚗', name: 'Auto', items: 'Spritkosten, Kfz-Steuer, kW/PS, Pendlerpauschale' },
              { icon: '🏠', name: 'Wohnen', items: 'Strom, Heizung, Nebenkosten, Miete, Grunderwerbsteuer' },
              { icon: '💚', name: 'Gesundheit', items: 'BMI, Promille, Schlafzyklen, Raucherkosten' },
              { icon: '🎓', name: 'Mathe', items: 'Brüche, Durchschnitt, Notenschlüssel' },
              { icon: '💼', name: 'Arbeit', items: 'Stundenlohn, Arbeitszeit, Urlaub, Überstunden' },
            ].map(k => (
              <div key={k.name} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{k.icon}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{k.name}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{k.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vorteile */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vorteile des KI-Rechners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">&#x26A1;</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Schnell</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Keine Formularfelder, keine Dropdowns — einfach fragen und sofort die Antwort erhalten.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">&#x1F4AC;</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Verständlich</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Die Antwort kommt in einfachem Deutsch, nicht in Fachsprache oder Formeln.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">&#x1F517;</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">Weiterführend</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Jede Antwort verlinkt auf den passenden Detailrechner für exakte Berechnungen.</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Der KI-Rechner ist kostenlos, ohne Anmeldung nutzbar und speichert keine persönlichen Daten.
          </p>
        </div>
      </div>
    </div>
  );
}
