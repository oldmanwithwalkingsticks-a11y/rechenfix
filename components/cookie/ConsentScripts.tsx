'use client';

import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1389746597486587';

export default function ConsentScripts() {
  const { marketingAllowed } = useCookieConsent();

  return (
    <>
      {/* Google AdSense — nur nach Einwilligung */}
      {marketingAllowed && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
