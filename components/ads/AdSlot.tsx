'use client';

import { useEffect, useRef } from 'react';
import { useCookieConsent } from '@/components/cookie/CookieConsentProvider';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';

interface AdSlotProps {
  typ: 'leaderboard' | 'rectangle' | 'sidebar';
  className?: string;
}

/**
 * Container-Höhen pro Ad-Typ. Werden IMMER reserviert, unabhängig vom
 * Marketing-Consent — auch wenn kein Ad geladen wird, bleibt der Platz
 * im Layout stehen. Damit verhindert wir den CLS-Hit, wenn der Consent-
 * Status sich nachträglich ändert (User akzeptiert → Container füllt
 * sich plötzlich mit 280 px Ad-Banner und schiebt darunter liegenden
 * Content runter). W15C-T4-F2 (PSI-CLS 0,446 → Ziel < 0,1).
 *
 * Werte gewählt nach IAB-Standard-Banner-Sizes und Google-AdSense-
 * Auto-Format-Defaults:
 * - leaderboard: 90 px (Mobile-Banner 320×50 + Padding)
 * - rectangle:   280 px (Medium-Rectangle 300×250 + Padding)
 * - sidebar:     250 px (Half-Page 300×250)
 */
const adConfig = {
  leaderboard: {
    format: 'horizontal' as const,
    minHeightClass: 'min-h-[90px]',
  },
  rectangle: {
    format: 'rectangle' as const,
    minHeightClass: 'min-h-[280px]',
  },
  sidebar: {
    format: 'vertical' as const,
    minHeightClass: 'min-h-[250px]',
  },
};

export default function AdSlot({ typ, className = '' }: AdSlotProps) {
  const { marketingAllowed } = useCookieConsent();
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!marketingAllowed || pushed.current) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense Script noch nicht geladen
    }
  }, [marketingAllowed]);

  const config = adConfig[typ];

  // Container immer rendern (Layout-Platz reservieren, kein CLS), aber das
  // <ins>-Tag nur ausspielen wenn Marketing-Consent erteilt ist. Ohne
  // Consent bleibt der Container leer + aria-hidden, sodass Screenreader
  // ihn nicht ankündigen.
  return (
    <div
      className={`w-full ${config.minHeightClass} overflow-hidden no-print ${className}`}
      aria-hidden={!marketingAllowed || undefined}
    >
      {marketingAllowed && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-format={config.format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
