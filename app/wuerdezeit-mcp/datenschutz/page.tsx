import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — WürdeZeit YouTube MCP',
  description: 'Datenschutzerklärung für das private YouTube-Auswertungswerkzeug WürdeZeit MCP.',
  robots: { index: false, follow: true },
};

export default function WuerdezeitMcpDatenschutzSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'WürdeZeit YouTube MCP', href: '/wuerdezeit-mcp' }, { label: 'Datenschutzerklärung' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-10 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          <p>
            Diese Anwendung wird ausschließlich vom Betreiber selbst genutzt. Es werden keine Daten Dritter verarbeitet.
          </p>

          <Section titel="Welche Daten verarbeitet werden">
            <p>
              Nach Anmeldung mit dem Google-Konto des Betreibers ruft die Anwendung Kennzahlen des eigenen YouTube-Kanals ab: Aufrufe, Wiedergabezeit, Zuschauerbindung, Traffic-Quellen, Suchbegriffe sowie aggregierte Angaben zu Alter und Geschlecht der Zuschauer. Es werden keine personenbezogenen Daten einzelner Zuschauer abgerufen.
            </p>
          </Section>

          <Section titel="Berechtigungen">
            <p>
              Die Anwendung verwendet ausschließlich lesende Zugriffsrechte: youtube.readonly und yt-analytics.readonly. Es werden keine Inhalte erstellt, verändert oder gelöscht.
            </p>
          </Section>

          <Section titel="Speicherung">
            <p>
              Abgerufene Kennzahlen werden nicht dauerhaft gespeichert. Gespeichert wird allein das Zugriffstoken des Google-Kontos, verschlüsselt als Umgebungsvariable beim Hosting-Anbieter.
            </p>
          </Section>

          <Section titel="Weitergabe">
            <p>Es findet keine Weitergabe an Dritte statt.</p>
          </Section>

          <Section titel="Zugriff widerrufen">
            <p>
              Der Zugriff der Anwendung auf das Google-Konto kann jederzeit unter{' '}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                https://myaccount.google.com/permissions
              </a>{' '}
              entzogen werden.
            </p>
          </Section>

          <Section titel="Verwendung von YouTube-API-Diensten">
            <p>
              Diese Anwendung nutzt YouTube-API-Dienste. Es gelten die{' '}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                YouTube-Nutzungsbedingungen
              </a>{' '}
              und die{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline"
              >
                Google-Datenschutzerklärung
              </a>
              .
            </p>
          </Section>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Verantwortlich: Karsten Kautz, Dülkener Straße 35, 47804 Krefeld · Stand: 15. September 2026
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{titel}</h2>
      {children}
    </section>
  );
}
