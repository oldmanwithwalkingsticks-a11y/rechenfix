import Link from 'next/link';
import { kategorien, rechner as alleRechner, getBeliebtRechner, getNeueRechner, getRechnerByKategorie } from '@/lib/rechner-config';
import SearchBar from '@/components/layout/SearchBar';
import TippDesTages from '@/components/ui/TippDesTages';
import BerechnungsZaehler from '@/components/ui/BerechnungsZaehler';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rechenfix.de — Kostenlose Online-Rechner',
  description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen.',
  alternates: { canonical: 'https://rechenfix.de' },
  openGraph: {
    title: 'Rechenfix.de — Kostenlose Online-Rechner',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen.',
    url: 'https://rechenfix.de',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Rechenfix.de — Kostenlose Online-Rechner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rechenfix.de — Kostenlose Online-Rechner',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen.',
    images: ['https://rechenfix.de/opengraph-image'],
  },
};

export default function Startseite() {
  const beliebteRechner = getBeliebtRechner();
  const neueRechner = getNeueRechner();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-300 mb-3">
          rechenfix.de — Fix gerechnet!
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit. Sofort-Ergebnisse ohne Anmeldung. Deutschlands erster Rechner mit KI-Erklärungen (Fix erklärt).
        </p>
        <SearchBar grosse="gross" className="mx-auto w-full" style={{ maxWidth: '600px' }} />
        <BerechnungsZaehler />
      </section>

      {/* Tipp des Tages */}
      <section className="mb-12">
        <TippDesTages />
      </section>

      {/* KI-Banner */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-center">
          <p className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            &#x1F916; Rechenfrage? Einfach der KI stellen!
          </p>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-5">
            Stellen Sie Ihre Rechenfrage in nat&uuml;rlicher Sprache &mdash; die KI berechnet die Antwort und verlinkt Sie zum passenden Rechner.
          </p>
          <Link
            href="/ki-rechner"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-700 font-semibold text-sm rounded-lg hover:bg-indigo-50 transition-colors shadow-md"
          >
            Jetzt Frage stellen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Kategorien als Kacheln */}
      <section className="mb-16">
        <h2 className="section-title mb-6">Kategorien</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {kategorien.map(k => {
            const anzahl = getRechnerByKategorie(k.slug).length;
            return (
              <Link
                key={k.slug}
                href={`/${k.slug}`}
                className="card p-4 group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{k.icon}</span>
                  <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {k.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{anzahl}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {k.beschreibung}
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
          {beliebteRechner.slice(0, 3).map(r => (
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

      {/* Schnellzugriff Brutto-Netto */}
      <section className="mb-16">
        <h2 className="section-title mb-4">Wie viel netto bleibt bei …?</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/finanzen/mindestlohn-netto', label: 'Mindestlohn' },
            { href: '/finanzen/2000-euro-brutto-netto', label: '2.000 €' },
            { href: '/finanzen/2500-euro-brutto-netto', label: '2.500 €' },
            { href: '/finanzen/3000-euro-brutto-netto', label: '3.000 €' },
            { href: '/finanzen/3500-euro-brutto-netto', label: '3.500 €' },
            { href: '/finanzen/4000-euro-brutto-netto', label: '4.000 €' },
            { href: '/finanzen/5000-euro-brutto-netto', label: '5.000 €' },
            { href: '/finanzen/brutto-netto-tabelle', label: 'Alle Gehälter →' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-500/40 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all"
            >
              {link.label}
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

      {/* Alle Kategorien mit Rechnern (max. 3 Vorschau) */}
      {kategorien.map(kategorie => {
        const katRechner = getRechnerByKategorie(kategorie.slug);
        const vorschau = katRechner.slice(0, 3);
        const hatMehr = katRechner.length > 3;
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
              {hatMehr && (
                <Link
                  href={`/${kategorie.slug}`}
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                >
                  Alle {katRechner.length} anzeigen →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vorschau.map(r => (
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
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sofort-Ergebnisse</h3>
            <p>Alle Berechnungen erfolgen live während der Eingabe. Kein Warten, kein &quot;Berechnen&quot;-Button.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">100% Kostenlos</h3>
            <p>Alle Rechner sind komplett kostenlos und ohne Anmeldung nutzbar. Keine versteckten Kosten.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Datenschutz</h3>
            <p>Alle Berechnungen finden direkt in deinem Browser statt. Analyse- und Werbe-Cookies werden nur nach deiner Einwilligung geladen.</p>
          </div>
        </div>
      </section>

      {/* SEO Textblock */}
      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Kostenlose Online-Rechner für jeden Bedarf</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
          <p>
            Rechenfix.de bietet Ihnen aktuell <strong className="text-gray-800 dark:text-gray-200">{alleRechner.length} kostenlose Online-Rechner</strong> in {kategorien.length} Kategorien — von Finanzen über Gesundheit bis hin zu Mathe und Arbeit. Alle Berechnungen erfolgen sofort im Browser, ohne Anmeldung und ohne versteckte Kosten.
          </p>
          <p>
            Im Bereich <strong className="text-gray-800 dark:text-gray-200">Finanzen</strong> finden Sie unseren beliebten <Link href="/finanzen/brutto-netto-rechner" className="text-primary-500 hover:underline">Brutto-Netto-Rechner</Link> mit allen sechs Steuerklassen für 2026, einen präzisen <Link href="/finanzen/mwst-rechner" className="text-primary-500 hover:underline">Mehrwertsteuer-Rechner</Link> sowie den <Link href="/finanzen/zinsrechner" className="text-primary-500 hover:underline">Zinsrechner</Link> mit Zinseszins-Berechnung. Ergänzt wird das Angebot durch den <Link href="/finanzen/sparrechner" className="text-primary-500 hover:underline">Sparrechner</Link> für langfristige Sparpläne, den <Link href="/finanzen/elterngeld-rechner" className="text-primary-500 hover:underline">Elterngeld-Rechner</Link> und den <Link href="/finanzen/buergergeld-rechner" className="text-primary-500 hover:underline">Bürgergeld-Rechner</Link> für Sozialleistungen. Eine <Link href="/finanzen/brutto-netto-tabelle" className="text-primary-500 hover:underline">Brutto-Netto-Tabelle</Link> zeigt Ihnen die Nettowerte für verschiedene Gehaltsstufen im Überblick.
          </p>
          <p>
            Für den <strong className="text-gray-800 dark:text-gray-200">Alltag</strong> stehen der vielseitige <Link href="/alltag/prozentrechner" className="text-primary-500 hover:underline">Prozentrechner</Link>, der <Link href="/alltag/dreisatz-rechner" className="text-primary-500 hover:underline">Dreisatz-Rechner</Link>, ein <Link href="/alltag/rabattrechner" className="text-primary-500 hover:underline">Rabattrechner</Link> mit Doppelrabatt-Funktion und der <Link href="/alltag/tagerechner" className="text-primary-500 hover:underline">Tagerechner</Link> bereit. Mit dem <Link href="/alltag/einheiten-umrechner" className="text-primary-500 hover:underline">Einheiten-Umrechner</Link> konvertieren Sie Längen, Gewichte, Temperaturen und viele weitere Maßeinheiten.
          </p>
          <p>
            Im Bereich <strong className="text-gray-800 dark:text-gray-200">Auto &amp; Verkehr</strong> berechnen Sie mit dem <Link href="/auto/spritkosten-rechner" className="text-primary-500 hover:underline">Spritkosten-Rechner</Link> Ihre Fahrtkosten, ermitteln mit dem <Link href="/auto/kfz-steuer-rechner" className="text-primary-500 hover:underline">Kfz-Steuer-Rechner</Link> Ihre jährliche Steuer und nutzen den <Link href="/auto/kw-ps-umrechner" className="text-primary-500 hover:underline">kW-PS-Umrechner</Link> für Motorleistungen. Der <Link href="/arbeit/pendlerpauschale-rechner" className="text-primary-500 hover:underline">Pendlerpauschale-Rechner</Link> zeigt Ihnen die steuerliche Entlastung für Ihren Arbeitsweg.
          </p>
          <p>
            Rund ums <strong className="text-gray-800 dark:text-gray-200">Wohnen</strong> helfen der <Link href="/wohnen/mietrechner" className="text-primary-500 hover:underline">Mietrechner</Link>, der <Link href="/wohnen/nebenkosten-rechner" className="text-primary-500 hover:underline">Nebenkosten-Rechner</Link>, der <Link href="/wohnen/stromkosten-rechner" className="text-primary-500 hover:underline">Stromkosten-Rechner</Link> und der <Link href="/wohnen/heizkosten-rechner" className="text-primary-500 hover:underline">Heizkosten-Rechner</Link> bei der Planung Ihrer monatlichen Ausgaben. Für Immobilienkäufer berechnet der <Link href="/wohnen/grunderwerbsteuer-rechner" className="text-primary-500 hover:underline">Grunderwerbsteuer-Rechner</Link> die Kaufnebenkosten nach Bundesland.
          </p>
          <p>
            Für <strong className="text-gray-800 dark:text-gray-200">Schule und Studium</strong> bieten wir den <Link href="/mathe/bruchrechner" className="text-primary-500 hover:underline">Bruchrechner</Link>, den <Link href="/mathe/durchschnitt-rechner" className="text-primary-500 hover:underline">Durchschnitt-Rechner</Link> mit Median und Modus, den <Link href="/mathe/notenschluessel-rechner" className="text-primary-500 hover:underline">Notenschlüssel-Rechner</Link> für Lehrer und Schüler sowie einen vollständigen <Link href="/mathe/wissenschaftlicher-taschenrechner" className="text-primary-500 hover:underline">wissenschaftlichen Taschenrechner</Link>. Im Bereich <strong className="text-gray-800 dark:text-gray-200">Arbeit &amp; Recht</strong> berechnen der <Link href="/arbeit/stundenlohn-rechner" className="text-primary-500 hover:underline">Stundenlohn-Rechner</Link>, der <Link href="/arbeit/arbeitszeitrechner" className="text-primary-500 hover:underline">Arbeitszeitrechner</Link>, der <Link href="/arbeit/urlaubstage-rechner" className="text-primary-500 hover:underline">Urlaubstage-Rechner</Link> und der <Link href="/arbeit/ueberstunden-rechner" className="text-primary-500 hover:underline">Überstunden-Rechner</Link> alles rund um Gehalt und Arbeitszeit.
          </p>
          <p>
            Alle Rechner auf Rechenfix.de zeigen Ergebnisse in Echtzeit, erklären den Rechenweg transparent und lassen sich per Klick teilen oder als PDF speichern. Probieren Sie es aus — fix gerechnet, ohne Umwege.
          </p>
        </div>
      </section>
    </div>
  );
}
