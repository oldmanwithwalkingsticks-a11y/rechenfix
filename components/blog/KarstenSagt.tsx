import type { ReactNode } from 'react';
import Image from 'next/image';
import { KARSTEN_PHOTO_PATH } from '@/lib/site-config';

/**
 * Meinungsblock des Betreibers — E-E-A-T-Signal. Optisch klar vom Fließtext
 * getrennt, damit erkennbar ist: hier spricht Karsten, nicht die Recherche.
 * Server-Komponente, rein präsentational.
 */
export default function KarstenSagt({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={KARSTEN_PHOTO_PATH}
          alt="Karsten Kautz"
          width={48}
          height={48}
          className="rounded-full"
        />
        <p className="font-semibold text-gray-900 dark:text-gray-100">Karsten sagt</p>
      </div>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
