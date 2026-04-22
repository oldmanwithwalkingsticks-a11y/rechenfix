'use client';

import { useCallback } from 'react';
import { useCookieConsent } from '@/components/cookie/CookieConsentProvider';
import { createAmazonSearchLink } from '@/lib/amazon-link';

interface AmazonBoxProps {
  /** Amazon-Suchbegriff, z. B. "digitale küchenwaage". */
  keyword: string;
  /** Überschrift der Box. Default: „Passende Produkte auf Amazon" */
  headline?: string;
  /** Optionaler Kontext-Satz unter der Überschrift. */
  description?: string;
}

/**
 * Amazon-Partner-Box mit Suchlink (Keyword-basiert, keine feste ASIN).
 *
 * Pflicht: Anzeige-Kennzeichnung (deutsche Werbekennzeichnung).
 *
 * Der Tag-Parameter `tag=rechenfix-21` wird nur angehängt, wenn User
 * Marketing-Cookies akzeptiert hat — ohne Consent kein Partner-Tag,
 * aber Link bleibt funktionsfähig (Service für den User).
 *
 * SSR-Verhalten: Beim Initial-Render ist `marketingAllowed = false` (Default),
 * der Link zeigt also ohne Tag auf Amazon. Nach Hydration wird der Tag ggf.
 * nachgezogen, sobald der Client-Consent-State verfügbar ist. Kein Layout-Shift,
 * nur `href` ändert sich minimal.
 */
export function AmazonBox({
  keyword,
  headline = 'Passende Produkte auf Amazon',
  description,
}: AmazonBoxProps) {
  const { marketingAllowed } = useCookieConsent();
  const url = createAmazonSearchLink(keyword, marketingAllowed);

  const handleClick = useCallback(() => {
    // Fire-and-forget Tracking analog zur AffiliateBox — keine personenbezogenen Daten
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'click',
          programId: 'amazon',
          context: keyword,
          rechner: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
        keepalive: true,
      }).catch(() => { /* ignore */ });
    } catch { /* ignore */ }

    if (marketingAllowed && typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.gtag) {
        w.gtag('event', 'affiliate_click', {
          event_category: 'affiliate',
          event_label: 'amazon',
          affiliate_program: 'amazon',
          amazon_keyword: keyword,
          rechner_page: window.location.pathname,
        });
      }
    }
  }, [keyword, marketingAllowed]);

  return (
    <div
      className="mt-6 mb-6 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 print:hidden"
      style={{ borderLeftWidth: '4px', borderLeftColor: '#FF9900' }}
    >
      <span className="absolute top-3 right-4 text-[11px] text-gray-600 dark:text-gray-500 font-medium">
        Anzeige
      </span>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl" role="img" aria-hidden="true">
            📦
          </span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {headline}
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 pr-12">
            {description}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: '#FF9900' }}
        >
          Auf Amazon suchen
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
