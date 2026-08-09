import Link from 'next/link';
import type { BlogArtikel } from '@/lib/blog';

/**
 * Blog-Teaser auf der Startseite (W68).
 *
 * Vorher verlinkte die Startseite den Blog an keiner einzigen Stelle — zwölf Artikel
 * waren nur über den Header (auf Mobile ausgeblendet) und das Ende des Mega-Menüs
 * erreichbar. Dieser Abschnitt schließt die Lücke und wächst automatisch mit, weil
 * die Artikel aus der Dateisystem-Registry kommen.
 *
 * Rendert nichts, wenn keine Artikel vorhanden sind.
 */
export default function BlogTeaser({ artikel }: { artikel: BlogArtikel[] }) {
  if (!artikel.length) return null;

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="section-title mb-0">📝 Geschichten hinter den Zahlen</h2>
        <Link
          href="/blog"
          className="shrink-0 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Alle Artikel <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artikel.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-200 p-5 transition-all hover:border-primary-300 hover:bg-primary-50/40 dark:border-gray-700 dark:hover:border-primary-500/40 dark:hover:bg-primary-500/5"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 dark:text-gray-100 dark:group-hover:text-primary-300">
              {a.titel}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {a.beschreibung}
            </p>
            <span className="mt-3 text-sm font-medium text-primary-600 dark:text-primary-400">
              Lesen <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
