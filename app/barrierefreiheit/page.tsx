import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Erklärung zur Barrierefreiheit',
  description: 'Informationen zur Barrierefreiheit von rechenfix.de, bekannte Einschränkungen und Feedback-Möglichkeiten.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.rechenfix.de/barrierefreiheit' },
  openGraph: {
    title: 'Erklärung zur Barrierefreiheit',
    description: 'Informationen zur Barrierefreiheit von rechenfix.de, bekannte Einschränkungen und Feedback-Möglichkeiten.',
    url: 'https://www.rechenfix.de/barrierefreiheit',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Barrierefreiheit — Rechenfix.de' }],
  },
};

export default function BarrierefreiheitSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Barrierefreiheit' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Erklärung zur Barrierefreiheit
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <p className="text-base leading-relaxed">
            Diese Erklärung zur Barrierefreiheit gilt für die unter{' '}
            <Link href="/" className="text-primary-600 dark:text-primary-400 underline">www.rechenfix.de</Link>{' '}
            veröffentlichte Website. Sie wird im Sinne der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) und
            des Barrierefreiheitsstärkungsgesetzes (BFSG) bereitgestellt.
          </p>

          {/* Stand der Vereinbarkeit */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Stand der Vereinbarkeit mit den Anforderungen
            </h2>
            <p className="leading-relaxed">
              Die Website rechenfix.de wurde so gestaltet, dass sie die Anforderungen der{' '}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1 auf Konformitätsstufe AA</strong>{' '}
              weitgehend erfüllt. Wir arbeiten kontinuierlich an der Verbesserung der Barrierefreiheit.
            </p>
            <p className="mt-3 leading-relaxed">
              Die Website ist mit den genannten Anforderungen aufgrund der nachfolgend aufgeführten
              Einschränkungen <strong>teilweise vereinbar</strong>.
            </p>
          </section>

          {/* Maßnahmen */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Umgesetzte Maßnahmen
            </h2>
            <p className="leading-relaxed mb-3">
              Folgende Maßnahmen wurden implementiert, um die Barrierefreiheit von rechenfix.de sicherzustellen:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm leading-relaxed">
              <li>Ausreichende Farbkontraste gemäß WCAG 2.1 AA (mindestens 4,5:1 für Fließtext, 3:1 für große Schrift)</li>
              <li>Korrekte Überschriften-Hierarchie (h1 &rarr; h2 &rarr; h3) auf allen Seiten</li>
              <li>Alle Formularfelder (&lt;select&gt;, &lt;input&gt;) sind mit zugehörigen Labels verknüpft</li>
              <li>Skip-Link zum Überspringen der Navigation für Tastaturnutzer</li>
              <li>Auswahlgruppen (z.&thinsp;B. Geschlecht, Berechnungsart) als native Radio-Buttons mit Fieldset/Legend</li>
              <li>Automatische Screenreader-Ansage bei Ergebnisänderung (aria-live mit Debounce)</li>
              <li>Fokus-Lenkung bei &bdquo;Fix erklärt&ldquo;-KI-Erklärungen: Fokus wandert automatisch zum neuen Inhalt, beim Schließen zurück zum Auslöser</li>
              <li>Responsives Design für alle Bildschirmgrößen</li>
              <li>Unterstützung für Dark Mode</li>
            </ul>
          </section>

          {/* Nicht barrierefreie Inhalte */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Nicht barrierefreie Inhalte
            </h2>
            <p className="leading-relaxed mb-3">
              Die folgenden Inhalte sind trotz unserer Bemühungen noch nicht vollständig barrierefrei:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Visuelle Diagramme und Skalen:</strong>{' '}
                Einige Rechner verwenden visuelle Darstellungen (z.&thinsp;B. BMI-Skala, Fortschrittsbalken,
                Kalender im Zyklusrechner), deren Inhalte für Screenreader teilweise nur eingeschränkt
                zugänglich sind. Die wesentlichen Zahlenwerte werden jedoch immer auch als Text ausgegeben.
              </li>
              <li>
                <strong>Wissenschaftlicher Taschenrechner:</strong>{' '}
                Der Taschenrechner mit seinem Button-Raster ist nur eingeschränkt per Tastatur bedienbar.
              </li>
              <li>
                <strong>Externe Inhalte:</strong>{' '}
                Affiliate-Links führen zu externen Websites, deren Barrierefreiheit außerhalb unserer
                Kontrolle liegt.
              </li>
            </ul>
          </section>

          {/* Erstellung */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Erstellung dieser Erklärung
            </h2>
            <p className="leading-relaxed">
              Diese Erklärung wurde am <strong>16. April 2026</strong> erstellt.
            </p>
            <p className="mt-2 leading-relaxed">
              Die Bewertung beruht auf einer Selbstbewertung mittels automatisierter Tests
              (Google Lighthouse, axe DevTools) sowie manueller Prüfung mit Screenreadern
              und Tastaturnavigation.
            </p>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Feedback und Kontaktangaben
            </h2>
            <p className="leading-relaxed">
              Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten von rechenfix.de aufgefallen?
              Möchten Sie uns Anregungen zur Verbesserung mitteilen oder benötigen Sie Inhalte in einer
              barrierefreien Form?
            </p>
            <p className="mt-3 leading-relaxed">
              Bitte kontaktieren Sie uns:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                E-Mail:{' '}
                <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 underline">
                  info@rechenfix.de
                </a>
              </li>
              <li>
                Feedback-Formular:{' '}
                <Link href="/feedback" className="text-primary-600 dark:text-primary-400 underline">
                  www.rechenfix.de/feedback
                </Link>
              </li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Wir nehmen Ihr Feedback ernst und bemühen uns, innerhalb von <strong>14 Tagen</strong> zu
              antworten. Bitte beachten Sie, dass rechenfix.de als privates Angebot betrieben wird und
              wir Verbesserungen nach bestem Kenntnisstand umsetzen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
