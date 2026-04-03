import Link from 'next/link';
import { getAllKategorienWithRechner } from '@/lib/rechner-config';

export default function Startseite() {
  const kategorienMitRechner = getAllKategorienWithRechner();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-300 mb-4">
          Kostenlose Online-Rechner
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Schnell, einfach und ohne Anmeldung. Berechne alles, was du brauchst — von Prozenten bis zum Nettogehalt.
        </p>
      </section>

      {/* Kategorien */}
      {kategorienMitRechner.map(kategorie => (
        <section key={kategorie.slug} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">
              {kategorie.icon} {kategorie.name}
            </h2>
            <Link
              href={`/${kategorie.slug}`}
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
            >
              Alle anzeigen →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kategorie.rechner.map(r => (
              <Link
                key={r.slug}
                href={`/${r.kategorieSlug}/${r.slug}`}
                className="card p-6 group"
              >
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {r.titel}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {r.beschreibung}
                </p>
                <span className="inline-block mt-3 text-primary-500 dark:text-primary-400 text-sm font-medium">
                  Jetzt berechnen →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO Content */}
      <section className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Warum Rechenfix.de?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sofort-Ergebnisse</h3>
            <p>Alle Berechnungen erfolgen live während der Eingabe. Kein Warten, kein &quot;Berechnen&quot;-Button.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">100% Kostenlos</h3>
            <p>Alle Rechner sind komplett kostenlos und ohne Anmeldung nutzbar. Keine versteckten Kosten.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Datenschutz</h3>
            <p>Alle Berechnungen finden direkt in deinem Browser statt. Keine Daten werden an Server übertragen.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
