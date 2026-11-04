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
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
          Erklärung zur Barrierefreiheit
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Stand: 4. November 2026</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <p className="text-base leading-relaxed">
            Diese Erklärung geben wir freiwillig ab. rechenfix.de ist ein kostenfreies
            Informationsangebot; ein Vertragsschluss über Waren oder Dienstleistungen findet hier
            nicht statt, und wir sind zudem Kleinstunternehmen im Sinne des § 3 Abs. 3 BFSG. Eine
            gesetzliche Verpflichtung zur Barrierefreiheit besteht deshalb nicht. Wir orientieren
            uns dennoch an den Anforderungen der EN 301 549 und der WCAG 2.1 Stufe AA, weil ein
            Rechnerportal für alle nutzbar sein soll.
          </p>

          <p className="text-base leading-relaxed">
            Diese Erklärung bezieht sich auf die Website{' '}
            <Link href="/" className="text-primary-600 dark:text-primary-400 underline">www.rechenfix.de</Link>.
          </p>

          {/* Stand der Vereinbarkeit */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Stand der Vereinbarkeit
            </h2>
            <p className="leading-relaxed">
              Wir prüfen die Website gegen die Anforderungen der{' '}
              <strong>WCAG 2.1 Stufe AA</strong>. Am <strong>4. November 2026</strong> haben wir alle
              258 Seiten gemessen, die die Sitemap an diesem Tag enthielt, jeweils am Desktop im hellen
              und im dunklen Modus sowie in einer Handyansicht. Das Prüfwerkzeug axe-core fand dabei
              keinen Verstoß gegen die automatisiert prüfbaren Kriterien der Stufen A und AA.
            </p>
            <p className="mt-3 leading-relaxed">
              Automatisierte Prüfungen decken allerdings nur einen Teil der Erfolgskriterien ab.
              Anforderungen wie verständliche Sprache, sinnvolle Alternativtexte oder eine schlüssige
              Fokusreihenfolge lassen sich nur manuell beurteilen. Eine Prüfung mit Screenreadern hat
              für diese Fassung der Erklärung nicht stattgefunden. Eine vollständige Vereinbarkeit
              behaupten wir deshalb nicht.
            </p>
          </section>

          {/* Maßnahmen */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Umgesetzte Maßnahmen
            </h2>
            <p className="leading-relaxed mb-3">
              Folgende Maßnahmen sind umgesetzt:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 leading-relaxed">
              <li>Farbkontraste nach WCAG 2.1 AA (mindestens 4,5:1 für Fließtext, 3:1 für große Schrift), im hellen und im dunklen Modus</li>
              <li>Überschriften ohne übersprungene Ebenen (h1 &rarr; h2 &rarr; h3) und genau eine Hauptüberschrift je Seite</li>
              <li>Jedes Eingabe- und Auswahlfeld ist programmatisch mit seiner Beschriftung verknüpft</li>
              <li>Skip-Link zum Überspringen der Navigation für Tastaturnutzer</li>
              <li>Auswahlgruppen (z.&thinsp;B. Geschlecht, Berechnungsart) als native Radio-Buttons mit Fieldset/Legend; Ein-/Aus-Schalter sind als Schalter mit ihrem Zustand ausgezeichnet</li>
              <li>Links im Fließtext sind unterstrichen und nicht nur an der Farbe zu erkennen</li>
              <li>Tabellen, die auf kleinen Bildschirmen seitlich scrollen, sind per Tastatur erreichbar und tragen einen Namen</li>
              <li>Automatische Screenreader-Ansage bei Ergebnisänderung (aria-live mit Debounce)</li>
              <li>Fokus-Lenkung bei &bdquo;Fix erklärt&ldquo;-KI-Erklärungen: Fokus wandert automatisch zum neuen Inhalt, beim Schließen zurück zum Auslöser</li>
              <li>Der wissenschaftliche Taschenrechner ist per Tastatur bedienbar (Tasten per Tab und Eingabetaste, Ziffern und Rechenzeichen auch direkt); Tasten mit Zeichen tragen einen gesprochenen Namen, das Ergebnis steht in einem aria-live-Bereich</li>
              <li>Bei jeder Änderung der Website prüft ein automatischer Test, dass Beschriftungen, Schalter, Links und Tabellen diesen Regeln folgen</li>
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
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>
                <strong>Visuelle Diagramme und Skalen:</strong>{' '}
                Einige Rechner verwenden visuelle Darstellungen (z.&thinsp;B. BMI-Skala, Fortschrittsbalken,
                Kalender im Zyklusrechner), deren Inhalte für Screenreader teilweise nur eingeschränkt
                zugänglich sind. Die wesentlichen Zahlenwerte werden jedoch immer auch als Text ausgegeben.
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
              Diese Erklärung wurde am <strong>16. April 2026</strong> erstellt und am{' '}
              <strong>4. November 2026</strong> überarbeitet.
            </p>
            <p className="mt-2 leading-relaxed">
              Die Bewertung beruht auf einer Selbstbewertung. Grundlage ist eine automatisierte Messung
              mit axe-core 4.11.2 im Browser Chromium über alle Seiten der Sitemap, je Seite in drei
              Ansichten: Desktop hell, Desktop dunkel und Handy. Weil axe einen Platzhaltertext wie
              &bdquo;z.&thinsp;B. 75&ldquo; als Beschriftung gelten lässt, prüfen wir zusätzlich auf jeder
              Seite, ob jedes Eingabefeld eine verknüpfte Beschriftung hat.
            </p>
            <p className="mt-2 leading-relaxed">
              Ergebnis der Messung vom <strong>4. November 2026</strong>:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1 leading-relaxed">
              <li>258 Seiten, die die Sitemap an diesem Tag enthielt, in drei Ansichten: <strong>774 Messungen</strong></li>
              <li>Verstöße gegen die Regeln der WCAG 2.1 Stufen A und AA: <strong>0</strong></li>
              <li>Eingabefelder ohne verknüpfte Beschriftung: <strong>0</strong></li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Die vorige Fassung dieser Erklärung stützte sich auf eine Stichprobe von 19 Rechnern vom
              18. April 2026. Die erste Messung über alle Seiten am 2. November 2026 fand Verstöße auf
              142 Seiten, vor allem Links, die nur an ihrer Farbe zu erkennen waren, und Eingabefelder
              ohne verknüpfte Beschriftung. Sie sind seit dem 3. November 2026 behoben.
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
            <ul className="mt-2 space-y-1 leading-relaxed">
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
