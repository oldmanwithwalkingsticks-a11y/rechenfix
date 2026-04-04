'use client';

import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-CNVMHDZM4S';
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1389746597486587';

export default function ConsentScripts() {
  const { analyticsAllowed, marketingAllowed } = useCookieConsent();

  return (
    <>
      {/* Google Analytics 4 — nur nach Einwilligung */}
      {analyticsAllowed && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

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
