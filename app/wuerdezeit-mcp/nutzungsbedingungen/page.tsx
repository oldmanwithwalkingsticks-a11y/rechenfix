import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen — WürdeZeit YouTube MCP',
  description: 'Nutzungsbedingungen für das private YouTube-Auswertungswerkzeug WürdeZeit MCP.',
  robots: { index: false, follow: true },
};

export default function WuerdezeitMcpNutzungsbedingungenSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'WürdeZeit YouTube MCP', href: '/wuerdezeit-mcp' }, { label: 'Nutzungsbedingungen' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          Nutzungsbedingungen
        </h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          <p>
            Diese Anwendung ist ein privates Werkzeug und steht Dritten nicht zur Nutzung offen. Ein Anspruch auf Verfügbarkeit besteht nicht.
          </p>
          <p>
            Die Anwendung nutzt YouTube-API-Dienste. Mit der Nutzung gelten die{' '}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 underline"
            >
              YouTube-Nutzungsbedingungen
            </a>
            .
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 pt-6">
            Verantwortlich: Karsten Kautz, Dülkener Straße 35, 47804 Krefeld · Stand: 15. September 2026
          </p>
        </div>
      </div>
    </div>
  );
}
