/**
 * Video mit optionaler Bildunterschrift für Blog-Artikel (MDX).
 * Server-Komponente, rein präsentational. Analog zu Bild.tsx.
 *
 * Hintergrund: Ein rohes <video>-Tag direkt in MDX rendert die
 * wertlosen Boolean-Attribute (controls/loop/muted/playsInline) nicht
 * zuverlässig — das Video spielte dann nicht, sondern zeigte nur sein
 * poster-Bild. Hier stehen die Attribute in echtem TSX und werden als
 * JSX-Booleans korrekt gesetzt.
 */
export default function Video({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <video
        src={src}
        poster={poster}
        controls
        loop
        muted
        playsInline
        preload="metadata"
        className="rounded-xl w-full h-auto"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
