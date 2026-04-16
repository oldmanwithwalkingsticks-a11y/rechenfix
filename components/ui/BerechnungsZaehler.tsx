'use client';

import { useState, useEffect, useRef } from 'react';
import { getZaehler } from '@/lib/berechnungs-zaehler';

function formatZahl(n: number): string {
  return Math.round(n).toLocaleString('de-DE');
}

export default function BerechnungsZaehler() {
  const [anzeige, setAnzeige] = useState<number | null>(null);
  const zielRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    getZaehler().then(ziel => {
      if (cancelled) return;
      zielRef.current = ziel;

      // Count-up Animation von 0 bis Zielwert
      const dauer = 1500; // ms
      const schritte = 40;
      const intervall = dauer / schritte;
      let schritt = 0;

      timer = setInterval(() => {
        schritt++;
        // Ease-out: schnell starten, langsam enden
        const fortschritt = 1 - Math.pow(1 - schritt / schritte, 3);
        setAnzeige(Math.round(ziel * fortschritt));

        if (schritt >= schritte) {
          setAnzeige(ziel);
          if (timer) clearInterval(timer);
        }
      }, intervall);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  if (anzeige === null) return null;

  return (
    <p className="text-sm text-gray-600 dark:text-gray-500 mt-3 tabular-nums">
      Bereits <span className="font-semibold text-primary-500 dark:text-primary-400">{formatZahl(anzeige)}</span> Berechnungen durchgef&uuml;hrt
    </p>
  );
}
