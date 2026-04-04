import Link from 'next/link';
import { kategorien, getBeliebtRechner, getNeueRechner, getRechnerByKategorie } from '@/lib/rechner-config';
import SearchBar from '@/components/layout/SearchBar';

export default function Startseite() {
  const beliebteRechner = getBeliebtRechner();
  const neueRechner = getNeueRechner();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-300 mb-3">
          rechenfix.de — Fix gerechnet! ⚡
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung.
        </p>
        <SearchBar grosse="gross" className="max-w-xl mx-auto" />
      </section>

      {/* Kategorien als Kacheln */}
      <section className="mb-16">
        <h2 className="section-title mb-6">Kategorien</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kategorien.map(k => {
            const anzahl = getRechnerByKategorie(k.slug).length;
            return (
              <Link
                key={k.slug}
                href={`/${k.slug}`}
                className="card p-6 text-center group"
              >
                <div className="text-4xl mb-3">{k.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {k.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {anzahl} {anzahl === 1 ? 'Rechner' : 'Rechner'}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Beliebte Rechner */}
      <section className="mb-16">
        <h2 className="section-title mb-6">🔥 Beliebte Rechner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {beliebteRechner.map(r => (
            <Link
              key={r.slug}
              href={`/${r.kategorieSlug}/${r.slug}`}
              className="card p-6 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{r.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {r.titel}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {r.beschreibung}
                  </p>
                  <span className="inline-block mt-3 text-primary-500 dark:text-primary-400 text-sm font-medium">
                    Jetzt berechnen →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Neu hinzugefügt */}
      <section className="mb-16">
        <h2 className="section-title mb-6">✨ Neu hinzugefügt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {neueRechner.map(r => (
            <Link
              key={r.slug}
              href={`/${r.kategorieSlug}/${r.slug}`}
              className="card p-5 group flex items-center gap-4"
            >
              <span className="text-2xl shrink-0">{r.icon}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {r.titel}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.kategorie}</p>
              </div>
              <span className="text-primary-400 ml-auto shrink-0">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Alle Kategorien mit Rechnern */}
      {kategorien.map(kategorie => {
        const katRechner = getRechnerByKategorie(kategorie.slug);
        const farbMap: Record<string, string> = {
          alltag: 'bg-blue-50/70 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10',
          finanzen: 'bg-amber-50/70 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/10',
          gesundheit: 'bg-green-50/70 dark:bg-green-500/5 border-green-100 dark:border-green-500/10',
          auto: 'bg-red-50/70 dark:bg-red-500/5 border-red-100 dark:border-red-500/10',
          wohnen: 'bg-orange-50/70 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/10',
          mathe: 'bg-violet-50/70 dark:bg-violet-500/5 border-violet-100 dark:border-violet-500/10',
          arbeit: 'bg-teal-50/70 dark:bg-teal-500/5 border-teal-100 dark:border-teal-500/10',
        };
        const farbe = farbMap[kategorie.slug] || 'bg-gray-50/70 dark:bg-gray-500/5 border-gray-100 dark:border-gray-500/10';
        return (
          <section key={kategorie.slug} className={`mb-12 ${farbe} border rounded-2xl p-6`}>
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
              {katRechner.map(r => (
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
        );
      })}

      {/* SEO Content */}
      <section className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Warum Rechenfix.de?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">⚡ Sofort-Ergebnisse</h3>
            <p>Alle Berechnungen erfolgen live während der Eingabe. Kein Warten, kein &quot;Berechnen&quot;-Button.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 100% Kostenlos</h3>
            <p>Alle Rechner sind komplett kostenlos und ohne Anmeldung nutzbar. Keine versteckten Kosten.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🔒 Datenschutz</h3>
            <p>Alle Berechnungen finden direkt in deinem Browser statt. Analyse- und Werbe-Cookies werden nur nach deiner Einwilligung geladen.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
