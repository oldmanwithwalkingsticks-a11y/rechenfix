import VideoPlayer from './VideoPlayer';
import KiHinweis from './KiHinweis';
import type { KiGenerator } from '@/lib/ki-medien';

/**
 * Video mit optionaler Bildunterschrift für Blog-Artikel (MDX).
 *
 * Server-Komponente: Nur das Abspiel-Element selbst (VideoPlayer) ist
 * Client-Komponente. Dadurch landet das JSON-LD der KI-Kennzeichnung im
 * ausgelieferten HTML und nicht erst nach der Hydration im DOM.
 *
 * WICHTIG — Standardwert `kiGeneriert = true`: siehe Begründung in Bild.tsx.
 * Ein echtes Video muss aktiv `kiGeneriert={false}` setzen.
 */
export default function Video({
  src,
  poster,
  caption,
  autoplay = true,
  kiGeneriert = true,
  generator = 'video' as KiGenerator,
  beschreibung,
}: {
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
  kiGeneriert?: boolean;
  generator?: KiGenerator;
  beschreibung?: string;
}) {
  return (
    <figure className="my-8">
      <VideoPlayer src={src} poster={poster} autoplay={autoplay} kiGeneriert={kiGeneriert} />
      {kiGeneriert && (
        <KiHinweis
          typ="video"
          src={src}
          beschreibung={beschreibung ?? caption ?? 'KI-generiertes Video'}
          generator={generator}
        />
      )}
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
