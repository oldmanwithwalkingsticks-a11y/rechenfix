import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WürdeZeit YouTube MCP',
  description: 'Privates Werkzeug zur Auswertung des YouTube-Kanals WürdeZeit über die YouTube Data API und die YouTube Analytics API.',
  robots: { index: false, follow: true },
};

export default function WuerdezeitMcpSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'WürdeZeit YouTube MCP' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-8">
          WürdeZeit YouTube MCP
        </h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
          <p>
            Ein privates Werkzeug zur Auswertung des YouTube-Kanals WürdeZeit. Es ruft Kennzahlen des eigenen Kanals über die YouTube Data API und die YouTube Analytics API ab und stellt sie dem Betreiber zur Verfügung.
          </p>
          <p>
            Die Anwendung steht nicht öffentlich zur Verfügung und wird ausschließlich vom Betreiber selbst genutzt.
          </p>
          <p>
            Betreiber: Karsten Kautz, Dülkener Straße 35, 47804 Krefeld · Kontakt:{' '}
            <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 underline">
              info@rechenfix.de
            </a>
          </p>

          <p className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
            <Link href="/wuerdezeit-mcp/datenschutz" className="text-primary-600 dark:text-primary-400 underline">
              Datenschutzerklärung
            </Link>
            <Link href="/wuerdezeit-mcp/nutzungsbedingungen" className="text-primary-600 dark:text-primary-400 underline">
              Nutzungsbedingungen
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
