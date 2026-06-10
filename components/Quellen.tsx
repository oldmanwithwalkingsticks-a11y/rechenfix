import type { QuelleConfig } from '@/lib/rechner-config/types';

interface QuellenProps {
  quellen: QuelleConfig[];
}

/**
 * Quellen-Sektion für Top-10-Rechner. Wird in der zentralen Rechner-Page
 * (`app/[kategorie]/[rechner]/page.tsx`) post-FAQ ausgespielt — als
 * E-E-A-T-Material und Trust-Signal für AdSense-Reviewer.
 *
 * Rendert eine nummerierte Liste mit:
 * - Titel (z. B. Paragraf-Verweis oder Quellen-Bezeichnung)
 * - Optional: „Originaltext"-Link bei `url`
 * - Optional: kleiner grauer Hinweis-Subtext bei `hinweis`
 *
 * Eingeführt mit W15A.3.
 */
export default function Quellen({ quellen }: QuellenProps) {
  if (!quellen || quellen.length === 0) return null;

  return (
    <section className="card p-6 md:p-8 mb-8 no-print">
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-300 mb-4">
        Quellen &amp; Rechtsgrundlagen
      </h2>
      <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
        {quellen.map((q, i) => (
          <li key={i}>
            {q.titel}
            {q.url && (
              <>
                {' '}—{' '}
                <a
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Originaltext
                </a>
              </>
            )}
            {q.hinweis && (
              <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                {q.hinweis}
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
