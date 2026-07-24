import Image from 'next/image';

/**
 * Bild mit optionaler Bildunterschrift für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational.
 */
export default function Bild({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <Image src={src} alt={alt} width={width} height={height} className="rounded-xl w-full h-auto" />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
