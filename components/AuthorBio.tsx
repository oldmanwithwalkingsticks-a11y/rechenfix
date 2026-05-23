import Image from 'next/image';
import Link from 'next/link';
import { existsSync } from 'fs';
import path from 'path';
import { KARSTEN_PHOTO_PATH } from '@/lib/site-config';

/**
 * Author-Mini-Bio mit Karsten-Foto + Tagline + Verweis auf /ueber-uns.
 * Wird in der zentralen Rechner-Page zwischen Quellen-Card und Affiliate-
 * Boxen gerendert, sobald die Config `zeigtAuthorBio: true` setzt.
 *
 * Eingeführt mit W15A.2 als E-E-A-T-Trust-Signal für Top-10-Rechner.
 * Foto-Pfad zentral aus lib/site-config (Cache-Bust-Versionierung),
 * existsSync-Pattern gegen 404 bei fehlendem File (L-W15A.1-1).
 */
export default function AuthorBio() {
  const fotoExists = existsSync(
    path.join(process.cwd(), 'public', KARSTEN_PHOTO_PATH)
  );

  return (
    <div className="my-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-5">
      <div className="flex items-center gap-4">
        {fotoExists ? (
          <Image
            src={KARSTEN_PHOTO_PATH}
            alt="Karsten Kautz, Gründer von Rechenfix.de"
            width={72}
            height={72}
            sizes="72px"
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-[72px] h-[72px] rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Karsten Kautz <span className="text-gray-400 dark:text-gray-500">·</span>{' '}
            <span className="font-normal text-gray-700 dark:text-gray-300">
              Gründer und Betreiber von Rechenfix.de
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Pflegt alle Rechner aktuell und prüft die Werte jährlich anhand der Primärquellen.
          </p>
          <Link
            href="/ueber-uns"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            Mehr über mich →
          </Link>
        </div>
      </div>
    </div>
  );
}
