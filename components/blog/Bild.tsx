import Image from 'next/image';
import KiHinweis from './KiHinweis';
import type { KiGenerator } from '@/lib/ki-medien';

/**
 * Bild mit optionaler Bildunterschrift für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational.
 *
 * WICHTIG — Standardwert `kiGeneriert = true`:
 * Sämtliche Blog-Bilder sind derzeit KI-generiert. Der Default ist deshalb
 * bewusst so gesetzt, dass ein neues Bild ohne Zutun gekennzeichnet WIRD.
 * Vergisst jemand die Prop, ist das Ergebnis eine überflüssige Kennzeichnung —
 * nicht eine fehlende. Ein echtes Foto muss aktiv `kiGeneriert={false}` setzen.
 */
export default function Bild({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
  kiGeneriert = true,
  generator = 'bild' as KiGenerator,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  kiGeneriert?: boolean;
  generator?: KiGenerator;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={kiGeneriert ? `${alt} (KI-generiertes Bild)` : alt}
        width={width}
        height={height}
        className="rounded-xl w-full h-auto"
        data-ai-generated={kiGeneriert ? 'true' : 'false'}
      />
      {kiGeneriert && (
        <KiHinweis typ="bild" src={src} beschreibung={alt} generator={generator} />
      )}
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
