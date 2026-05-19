'use client';

import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adsense-config';

export default function ConsentScripts() {
  const { marketingAllowed } = useCookieConsent();

  return (
    <>
      {/* Google AdSense — nur nach Einwilligung */}
      {marketingAllowed && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
