import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen',
  description: 'Nutzungsbedingungen von Rechenfix.de – Haftungsausschluss, Nutzung der Rechner und rechtliche Hinweise.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.rechenfix.de/nutzungsbedingungen' },
  openGraph: {
    title: 'Nutzungsbedingungen',
    description: 'Nutzungsbedingungen von Rechenfix.de – Haftungsausschluss, Nutzung der Rechner und rechtliche Hinweise.',
    url: 'https://www.rechenfix.de/nutzungsbedingungen',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Nutzungsbedingungen – Rechenfix.de' }],
  },
};

export default function NutzungsbedingungenSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Nutzungsbedingungen' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Nutzungsbedingungen
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          {/* 1. Geltungsbereich */}
          <Section nr="1" titel="Geltungsbereich">
            <p>
              Diese Nutzungsbedingungen regeln die Nutzung der Website rechenfix.de und der dort
              bereitgestellten Online-Rechner. Anbieter ist Karsten Kautz (Kontaktdaten siehe{' '}
              <a href="/impressum" className="text-primary-600 dark:text-primary-400 underline">
                Impressum
              </a>
              ). Mit der Nutzung der Website akzeptieren Nutzer diese Bedingungen.
            </p>
          </Section>

          {/* 2. Leistungen und Rechner */}
          <Section nr="2" titel="Leistungen und Rechner">
            <p>
              rechenfix.de stellt kostenlose Online-Rechner zu verschiedenen Themen (Alltag,
              Finanzen, Gesundheit, Auto, Wohnen, Mathe, Arbeit, Kochen, Sport) bereit. Die
              Nutzung ist kostenfrei und ohne Registrierung möglich.
            </p>
          </Section>

          {/* 3. Haftungsausschluss für Rechenergebnisse */}
          <Section nr="3" titel="Haftungsausschluss für Rechenergebnisse">
            <p>
              Die Rechner liefern unverbindliche Orientierungswerte auf Basis der eingegebenen
              Daten und der jeweils hinterlegten Berechnungsgrundlagen. Sie ersetzen keine
              individuelle Rechts-, Steuer-, Finanz- oder medizinische Beratung. Trotz sorgfältiger
              Pflege wird keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der
              Ergebnisse übernommen. Die Nutzung erfolgt auf eigene Verantwortung. Für
              Entscheidungen auf Basis der Rechenergebnisse wird keine Haftung übernommen;
              verbindliche Auskünfte erteilen ausschließlich die jeweils zuständigen Stellen
              (z.&nbsp;B. Finanzamt, Ärzte, Fachberater).
            </p>
          </Section>

          {/* 4. Urheberrecht und Nutzung der Inhalte */}
          <Section nr="4" titel="Urheberrecht und Nutzung der Inhalte">
            <p>
              Inhalte, Texte, Rechner und Gestaltung der Website sind urheberrechtlich geschützt.
              Die private Nutzung ist gestattet. Eine kommerzielle Weiterverwendung,
              Vervielfältigung oder Verbreitung ohne Zustimmung des Anbieters ist nicht gestattet.
            </p>
          </Section>

          {/* 5. Werbung und Affiliate-Links */}
          <Section nr="5" titel="Werbung und Affiliate-Links">
            <p>
              Die Website finanziert sich über Werbeanzeigen (Google AdSense) und
              Affiliate-Partnerschaften (Awin). Anzeigen sind als &bdquo;Anzeige&ldquo;
              gekennzeichnet. Bei einigen Rechnern wird zu thematisch passenden Anbietern verlinkt;
              bei Vertragsabschluss über einen solchen Link kann der Anbieter eine Vergütung
              erhalten. Für Nutzer entstehen dadurch keine Mehrkosten. Details siehe{' '}
              <a href="/datenschutz" className="text-primary-600 dark:text-primary-400 underline">
                Datenschutzerklärung
              </a>
              .
            </p>
          </Section>

          {/* 6. Externe Links */}
          <Section nr="6" titel="Externe Links">
            <p>
              Die Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein
              Einfluss besteht. Für diese fremden Inhalte wird keine Gewähr übernommen;
              verantwortlich ist jeweils der Anbieter der verlinkten Seite.
            </p>
          </Section>

          {/* 7. Änderungen der Nutzungsbedingungen */}
          <Section nr="7" titel="Änderungen der Nutzungsbedingungen">
            <p>
              Der Anbieter behält sich vor, diese Nutzungsbedingungen jederzeit anzupassen. Es gilt
              die jeweils auf dieser Seite veröffentlichte Fassung.
            </p>
          </Section>

          {/* 8. Salvatorische Klausel */}
          <Section nr="8" titel="Salvatorische Klausel">
            <p>
              Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein, bleibt die
              Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </Section>

          <p className="text-sm text-gray-500 dark:text-gray-400">Stand: Juni 2026</p>
        </div>
      </div>
    </div>
  );
}

function Section({ nr, titel, children }: { nr: string; titel: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
        {nr}. {titel}
      </h2>
      {children}
    </section>
  );
}
