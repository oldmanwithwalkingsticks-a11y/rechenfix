/**
 * Quellenblock für Blog-Artikel (MDX). `hinweis` trägt bewusst auch Angaben
 * dazu, DASS und WIE sich Quellen widersprechen — rechenfix benennt
 * Widersprüche, statt sie zu glätten. Server-Komponente, rein präsentational.
 */
export type QuellenEintrag = { titel: string; url?: string; hinweis?: string };

export default function Quellen({ eintraege }: { eintraege: QuellenEintrag[] }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4">Quellen</h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {eintraege.map((e, i) => (
          <li key={i}>
            {e.url ? (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline"
              >
                {e.titel}
              </a>
            ) : (
              <span>{e.titel}</span>
            )}
            {e.hinweis && (
              <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">{e.hinweis}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
