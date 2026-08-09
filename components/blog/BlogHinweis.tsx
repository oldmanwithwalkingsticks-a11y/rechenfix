import Link from 'next/link';
import type { BlogArtikel } from '@/lib/blog';

/**
 * Hinweisbox auf der Rechnerseite, die auf den passenden Blogartikel führt (W68).
 *
 * Gegenstück zum RechnerLoader im Blog: Dort wird der Rechner in den Artikel
 * eingebettet, hier führt der Rechner zurück zum Artikel. Die Zuordnung stammt aus
 * `rechnerSlug` in der meta.ts des Artikels, es gibt keine zweite Liste zu pflegen.
 *
 * Rendert nichts, wenn kein Artikel übergeben wurde — das ist bei den meisten der
 * über 200 Rechner der Fall und der ausdrücklich erwartete Normalzustand.
 */
export default function BlogHinweis({ artikel }: { artikel?: BlogArtikel }) {
  if (!artikel) return null;

  return (
    <aside className="mb-8 no-print">
      <Link
        href={`/blog/${artikel.slug}`}
        className="group flex items-start gap-4 rounded-2xl border border-accent-200 bg-accent-50/60 p-5 transition-colors hover:border-accent-300 hover:bg-accent-50 dark:border-accent-600/40 dark:bg-accent-700/10 dark:hover:border-accent-500/60 dark:hover:bg-accent-700/20"
      >
        <span className="mt-0.5 text-2xl leading-none shrink-0" aria-hidden="true">
          📝
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-400">
            Die Geschichte dahinter
          </span>
          <span className="mt-1 block font-semibold text-gray-900 group-hover:text-accent-700 dark:text-gray-100 dark:group-hover:text-accent-300">
            {artikel.titel}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {artikel.beschreibung}
          </span>
          <span className="mt-2 inline-block text-sm font-medium text-accent-700 dark:text-accent-400">
            Artikel lesen <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    </aside>
  );
}
