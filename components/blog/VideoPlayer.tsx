'use client';

/**
 * Reines Abspiel-Element für Video.tsx. Ausgelagert, damit die umgebende
 * Hülle (Bildunterschrift, KI-Kennzeichnung, JSON-LD) Server-Komponente
 * bleiben kann — das JSON-LD landet dadurch im ausgelieferten HTML.
 *
 * Verhalten unverändert gegenüber Welle 33:
 * - startet, sobald es zu 50 % im Sichtbereich ist
 * - pausiert beim Herausscrollen und setzt auf 0 zurück
 * - `muted` ist Pflicht, sonst lehnt der Browser play() ab
 * - `preload="none"` bis zum Eintritt in den Sichtbereich
 * - `prefers-reduced-motion: reduce` schaltet Autoplay ab
 * - `controls` bleiben erhalten
 */

import { useEffect, useRef } from 'react';

export default function VideoPlayer({
  src,
  poster,
  autoplay = true,
  kiGeneriert = true,
}: {
  src: string;
  poster?: string;
  autoplay?: boolean;
  kiGeneriert?: boolean;
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
      data-ai-generated={kiGeneriert ? 'true' : 'false'}
    />
  );
}
