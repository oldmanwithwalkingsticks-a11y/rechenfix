import type { ReactNode } from 'react';

/**
 * Abgesetzter Hinweiskasten für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational.
 */
export default function Infobox({ titel, children }: { titel?: string; children: ReactNode }) {
  return (
    <div className="my-6 p-5 rounded-xl border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20">
      {titel && <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{titel}</p>}
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
