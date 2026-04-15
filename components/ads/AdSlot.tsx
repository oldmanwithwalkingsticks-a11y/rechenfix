'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  typ: 'leaderboard' | 'rectangle' | 'sidebar';
  className?: string;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1389746597486587';

const adConfig = {
  leaderboard: {
    format: 'horizontal' as const,
    style: { display: 'block', minHeight: '90px' },
  },
  rectangle: {
    format: 'rectangle' as const,
    style: { display: 'block', minHeight: '250px' },
  },
  sidebar: {
    format: 'vertical' as const,
    style: { display: 'block', minHeight: '250px' },
  },
};

export default function AdSlot({ typ, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  // AdSense lädt immer. Bei fehlendem Consent zeigt Google automatisch
  // nicht-personalisierte Anzeigen (Consent Mode v2).
  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense Script noch nicht geladen
    }
  }, []);

  const config = adConfig[typ];

  return (
    <div className={`overflow-hidden no-print ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={ADSENSE_ID}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
