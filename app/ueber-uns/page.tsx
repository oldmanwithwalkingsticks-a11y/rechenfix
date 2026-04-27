import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';

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

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        Über Rechenfix.de
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Unabhängiges Online-Rechnerportal aus Deutschland.
      </p>

      {/* 1. Hero */}
      <section className="card p-6 md:p-8 mb-8">
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix.de ist ein unabhängiges Rechnerportal mit aktuell <strong>170 kostenlosen
            Online-Rechnern</strong> in neun Kategorien: Alltag, Finanzen, Gesundheit,
            Auto &amp; Verkehr, Wohnen &amp; Energie, Mathematik, Arbeit &amp; Recht, Kochen
            und Sport.
          </p>
          <p className="mb-4">
            Alle Berechnungen laufen <strong>direkt in Ihrem Browser</strong> — wir
            übertragen keine Eingaben auf einen Server, keine Anmeldung ist nötig,
            keine Daten werden gespeichert. Das Ziel ist einfach: komplexe Berechnungen
            so zugänglich machen, dass Sie in Sekunden eine belastbare Orientierung
            bekommen.
          </p>
          <p>
            Eine Besonderheit von Rechenfix ist die KI-gestützte Erklärung
            („Fix erklärt&rdquo;): Auf Wunsch erläutert eine KI die Berechnung individuell für
            Ihre konkreten Eingaben — die zugrundeliegenden Formeln und Werte sind
            jedoch <strong>nicht KI-generiert</strong>, sondern manuell aus
            Primärquellen gepflegt (siehe <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>).
          </p>
        </div>
      </section>

      {/* 2. Wer betreibt das Projekt */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Wer steht hinter Rechenfix.de?
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix.de wird von <strong>Karsten Kautz</strong> aus Krefeld als
            unabhängiges Software-Projekt betrieben. Es gibt kein Team, keinen Verlag,
            keine Investoren — die Site wird von einer Einzelperson entwickelt,
            gepflegt und finanziert.
          </p>
          <p className="mb-4">
            Der fachliche Anspruch ist klar abgegrenzt: Karsten Kautz ist Software-Entwickler,
            kein Steuerberater oder Rechtsanwalt. Die Genauigkeit der Rechner kommt
            nicht aus persönlicher Beratungs-Expertise, sondern aus disziplinierter Pflege
            gegen die offiziellen Primärquellen — siehe <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>.
          </p>
          <p>
            Vollständige Anbieter-Angaben gemäß § 5 TMG inklusive Anschrift,
            Telefonnummer und Umsatzsteuer-ID finden Sie im{' '}
            <Link href="/impressum" className="text-primary-600 dark:text-primary-400 hover:underline">Impressum</Link>.
          </p>
        </div>
      </section>

      {/* 3. Wie wir Genauigkeit sicherstellen */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Wie wir Genauigkeit sicherstellen
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix verwendet einen mehrstufigen Audit-Workflow, um Genauigkeit
            und Aktualität sicherzustellen. Die Kernpraktiken in Kürze:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Primärquellen-Pflicht:</strong> Konkrete Werte (Beitragssätze,
              Freibeträge, Steuersätze, Stichtage) werden gegen offizielle Quellen
              wie Bundesgesetzblatt, Bundesfinanzministerium oder Statistisches
              Bundesamt geprüft — nicht aus Sekundärartikeln übernommen.
            </li>
            <li>
              <strong>Verify-Skripte:</strong> Sicherheitskritische Berechnungs-Logik
              (Steuerformel, Sozialabgaben, Feiertage etc.) wird automatisiert gegen
              externe Sollwerte getestet, bevor neue Versionen veröffentlicht werden.
            </li>
            <li>
              <strong>Stichtag-Logik:</strong> Werte, die sich zu einem konkreten
              Datum ändern (z. B. Mindestlohn, Rentenwert, Pfändungsfreigrenze),
              sind im Code mit Stichtag-Switch hinterlegt — die Site rechnet
              automatisch zum richtigen Tag mit dem neuen Wert.
            </li>
            <li>
              <strong>Single Source of Truth:</strong> Beitragssätze und gemeinsame
              Konstanten existieren genau einmal als zentrale Library und werden von
              allen Rechnern referenziert — nicht pro Rechner dupliziert.
            </li>
          </ul>
          <p>
            Die ausführliche Darstellung dieses Workflows mit Quellen-Liste und
            Update-Historie steht auf der Seite{' '}
            <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>.
          </p>
        </div>
      </section>

      {/* 4. Unsere Quellen — Kurzübersicht */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Unsere Quellen (Auswahl)
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Die folgenden Primärquellen werden für die zentralen Themen-Bereiche genutzt.
          Eine vollständige Liste mit weiterführenden Erläuterungen findet sich auf{' '}
          <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">/qualitaet</Link>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Steuern &amp; Recht</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesfinanzministerium (BMF)</li>
              <li>Bundesgesetzblatt (BGBl.)</li>
              <li>gesetze-im-internet.de</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Sozialversicherung</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>GKV-Spitzenverband</li>
              <li>Deutsche Rentenversicherung</li>
              <li>BMAS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Statistik &amp; Wirtschaft</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Statistisches Bundesamt (Destatis)</li>
              <li>Deutsche Bundesbank</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Wohnen &amp; Energie</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesnetzagentur</li>
              <li>BDEW</li>
              <li>KfW</li>
              <li>Deutscher Mieterbund (Betriebskostenspiegel)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Datenschutz und Transparenz */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Datenschutz und Transparenz
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            <strong>Berechnungen erfolgen lokal in Ihrem Browser.</strong> Eingaben
            werden nicht an Rechenfix übermittelt, nicht protokolliert und nicht
            gespeichert. Sie können jeden Rechner nutzen, ohne sich anzumelden, ohne
            ein Konto anzulegen und ohne Cookies zu akzeptieren.
          </p>
          <p className="mb-4">
            <strong>Werbung und Affiliate-Links:</strong> Rechenfix.de finanziert
            sich durch Werbeeinblendungen und Affiliate-Partnerschaften. Affiliate-Links
            sind als solche gekennzeichnet. Die fachlichen Inhalte und Berechnungsergebnisse
            werden davon nicht beeinflusst — Empfehlungen erfolgen ausschließlich nach
            thematischer Passung, nicht nach Provisionshöhe.
          </p>
          <p>
            Detaillierte Angaben zur Datenverarbeitung finden Sie in der{' '}
            <Link href="/datenschutz" className="text-primary-600 dark:text-primary-400 hover:underline">Datenschutzerklärung</Link>.
          </p>
        </div>
      </section>

      {/* 6. Kontakt */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Kontakt
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Fehler entdeckt, Verbesserungsvorschlag oder Wunsch für einen neuen
          Rechner? Schreiben Sie an{' '}
          <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 hover:underline">
            info@rechenfix.de
          </a>
          . Antwort in der Regel innerhalb von 14 Tagen.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Anbieter-Angaben nach § 5 TMG:{' '}
          <Link href="/impressum" className="text-primary-600 dark:text-primary-400 hover:underline">Impressum</Link>.
        </p>
      </section>
    </div>
  );
}
