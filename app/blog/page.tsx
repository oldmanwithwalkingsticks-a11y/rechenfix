import type { Metadata } from 'next';
import Link from 'next/link';
import { getAlleArtikel } from '@/lib/blog';
import { generateBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Blog: Geschichten hinter den Zahlen',
  description:
    'Der Rechenfix-Blog: Hintergründe, Rechenwege und Alltagsbeispiele zu unseren Rechnern — verständlich erklärt, mit Quellen und dem passenden Rechner direkt im Text.',
  alternates: { canonical: 'https://www.rechenfix.de/blog' },
};

export default async function BlogUebersicht() {
  const artikel = await getAlleArtikel();

  return (
    <div>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
        Blog: Geschichten hinter den Zahlen
      </h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        Hintergründe, Rechenwege und Alltagsbeispiele zu unseren Rechnern — verständlich erklärt,
        mit Quellen und dem passenden Rechner direkt im Text.
      </p>

      {artikel.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Hier entstehen gerade die ersten Artikel. Schauen Sie bald wieder vorbei.
        </p>
      ) : (
        <ul className="space-y-4">
          {artikel.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/blog/${a.slug}`}
                className="card block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {a.titel}
                  </h2>
                  <span className="-mt-2 -mr-2 shrink-0 font-serif text-3xl font-bold leading-none tabular-nums text-primary-700 dark:text-primary-300">
                    <span className="sr-only">Artikel Nummer </span>
                    {a.nummer}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{a.beschreibung}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={a.datum}>
                    {new Date(a.datum).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {a.rechnerPfad && (
                    <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2.5 py-0.5 text-xs font-medium">
                      Passender Rechner
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
