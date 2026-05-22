'use client';

/**
 * Mega-Menu-Dropdown-Inhalt. Wird vom Header.tsx via `next/dynamic` mit
 * `ssr: false` lazy nachgeladen — erst wenn der User den Trigger klickt.
 *
 * Hintergrund: Der Inhalt importiert `kategorien` + `getRechnerByKategorie`
 * aus client-data.ts (~96 KB minified). Vorher lud Header diese Lib initial
 * auf jeder Page, obwohl 99 % der Besucher das Menu nie öffnen. Mit
 * dynamic-Loading wandert die Last in einen separaten Chunk, der erst beim
 * ersten Trigger-Klick angefordert wird (W15C-T1-Phase-2-M4).
 *
 * Trigger-State + Close-Handler bleiben im Header (Parent-Component).
 */
import Link from 'next/link';
import { kategorien, getRechnerByKategorie } from '@/lib/rechner-config/client-data';

const farbMap: Record<string, string> = {
  alltag: 'border-blue-200 dark:border-blue-500/30',
  finanzen: 'border-amber-200 dark:border-amber-500/30',
  gesundheit: 'border-green-200 dark:border-green-500/30',
  auto: 'border-red-200 dark:border-red-500/30',
  wohnen: 'border-orange-200 dark:border-orange-500/30',
  mathe: 'border-violet-200 dark:border-violet-500/30',
  arbeit: 'border-teal-200 dark:border-teal-500/30',
  kochen: 'border-pink-200 dark:border-pink-500/30',
  sport: 'border-lime-200 dark:border-lime-500/30',
};

export default function MegaMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 max-h-[75vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {kategorien.map(k => {
            const katRechner = getRechnerByKategorie(k.slug);
            const borderColor = farbMap[k.slug] || 'border-gray-200 dark:border-gray-700';
            return (
              <div
                key={k.slug}
                className={`bg-white dark:bg-gray-800 rounded-xl border-l-4 ${borderColor} shadow-sm p-4`}
              >
                <Link
                  href={`/${k.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-3 text-sm"
                >
                  <span className="text-lg">{k.icon}</span>
                  {k.name}
                  <span className="text-xs font-normal text-gray-600 ml-auto">{katRechner.length}</span>
                </Link>
                <ul className="space-y-0.5">
                  {katRechner.map(r => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.kategorieSlug}/${r.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2 py-1.5 px-2 -mx-1 rounded-lg text-[13px] text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                      >
                        <span className="w-5 text-center shrink-0">{r.icon}</span>
                        <span className="truncate">{r.titel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
