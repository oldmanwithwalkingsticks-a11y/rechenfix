'use client';

/**
 * Video mit optionaler Bildunterschrift für Blog-Artikel (MDX).
 * Client-Komponente: startet automatisch, sobald das Video in den sichtbaren
 * Bereich gescrollt wird, und pausiert wieder beim Herausscrollen.
 *
 * Hintergrund und bewusste Entscheidungen:
 * - Ein rohes <video>-Tag direkt in MDX rendert die Boolean-Attribute
 *   (controls/loop/muted/playsInline) nicht zuverlässig — deshalb echtes TSX.
 * - `muted` ist Pflicht, nicht Geschmackssache: Browser erlauben Autoplay nur
 *   ohne Ton. Ohne muted lehnt der Browser play() ab.
 * - `preload="none"` bleibt der Startwert (spart mobile Bandbreite und hält das
 *   poster als Standbild). Erst beim Eintritt in den Sichtbereich wird auf
 *   'auto' hochgesetzt und abgespielt.
 * - Beim Verlassen des Sichtbereichs wird pausiert UND auf 0 zurückgesetzt, damit
 *   beim Zurückscrollen wieder das Titelbild-Standbild zu sehen ist statt eines
 *   beliebigen Frames aus der Mitte.
 * - `prefers-reduced-motion: reduce` schaltet das Autoplay ab. Nutzer mit dieser
 *   Einstellung bekommen das poster und starten selbst über die controls.
 * - `controls` bleibt erhalten: Autoplay ohne Bedienelemente wäre eine Falle.
 */

import { useEffect, useRef } from 'react';

export default function Video({
  src,
  poster,
  caption,
  autoplay = true,
}: {
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoplay) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) {
          el.preload = 'auto';
          // play() liefert ein Promise, das der Browser ablehnen darf
          // (z. B. Datensparmodus). Stillschweigend ignorieren — die
          // controls bleiben ja bedienbar.
          void el.play().catch(() => {});
        } else {
          el.pause();
          el.currentTime = 0;
        }
      },
      { threshold: 0.5 },
    );

    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [autoplay]);

  return (
    <figure className="my-8">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls
        loop
        muted
        playsInline
        preload="none"
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
