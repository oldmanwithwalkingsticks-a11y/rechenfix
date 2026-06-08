'use client';

import { useEffect } from 'react';

/**
 * fix/critical-css (W14): prerender-sicheres non-blocking CSS-Loading.
 *
 * Hängt das volle Tailwind-Output nach der Hydration als
 * <link rel="stylesheet"> an den <head>. Da im Layout bereits ein
 * <link rel="preload" as="style"> für dieselbe href steht, ist die Datei
 * meist schon im Cache → der angehängte Stylesheet wird quasi sofort wirksam,
 * ohne das initiale Paint zu blockieren (above-the-fold deckt das inline
 * Critical-CSS ab).
 *
 * Ersetzt das frühere raw <script dangerouslySetInnerHTML> im <head>, das
 * den App-Router-Prerender brach (TypeError: ... reading 'useContext').
 * Diese Client-Component rendert beim SSR/Prerender nichts (return null);
 * der useEffect läuft ausschließlich im Browser.
 */
export default function CssLoader({ href }: { href: string }) {
  useEffect(() => {
    if (!href) return;
    // Schon angehängt (z. B. durch einen früheren Mount)? Dann nichts tun.
    if (document.querySelector('link[data-app-css="1"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-app-css', '1');
    document.head.appendChild(link);
  }, [href]);

  return null;
}
