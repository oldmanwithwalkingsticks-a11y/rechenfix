import { generateKiMedienSchema, KI_GENERATOREN, type KiGenerator } from '@/lib/ki-medien';

/**
 * Sichtbare Kennzeichnung eines KI-generierten Mediums plus maschinenlesbares
 * JSON-LD. Wird von Bild.tsx und Video.tsx eingebunden — nie direkt in MDX.
 *
 * Server-Komponente: Das JSON-LD landet dadurch im ausgelieferten HTML und ist
 * auch für Crawler sichtbar, die kein JavaScript ausführen.
 */
export default function KiHinweis({
  typ,
  src,
  beschreibung,
  generator,
}: {
  typ: 'bild' | 'video';
  src: string;
  beschreibung: string;
  generator: KiGenerator;
}) {
  const schema = generateKiMedienSchema({ typ, src, beschreibung, generator });

  return (
    <>
      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <span
          className="inline-flex items-center gap-1 rounded-full border border-gray-300 dark:border-gray-600 px-2 py-0.5 font-semibold"
          aria-label="Dieses Medium wurde von künstlicher Intelligenz erzeugt"
        >
          <svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M8 1.2 9.6 5.1 13.5 6 10.7 8.7l.7 3.9L8 10.8l-3.4 1.8.7-3.9L2.5 6l3.9-.9L8 1.2Z" />
          </svg>
          KI-generiert
        </span>
        <span className="hidden sm:inline">
          erzeugt mit {KI_GENERATOREN[generator]} · kein reales Foto
        </span>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
