'use client';

import Link from 'next/link';
import { kategorien, getRechnerByKategorie } from '@/lib/rechner-config';
import { useCookieConsent } from '@/components/cookie/CookieConsentProvider';

export default function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-primary-700 dark:bg-slate-950 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Alle Rechner als Linkliste (SEO) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {kategorien.map(k => {
            const katRechner = getRechnerByKategorie(k.slug);
            return (
              <div key={k.slug}>
                <Link href={`/${k.slug}`} className="font-bold text-sm text-white hover:text-accent-300 transition-colors mb-3 block">
                  {k.icon} {k.name}
                </Link>
                <ul className="space-y-1.5">
                  {katRechner.map(r => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.kategorieSlug}/${r.slug}`}
                        className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-xs"
                      >
                        {r.titel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t border-primary-600 dark:border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-extrabold text-white">Rechen</span>
                  <span className="text-2xl font-extrabold text-accent-400">fix</span>
                  <span className="text-sm text-primary-300">.de</span>
                </div>
                <span className="text-[11px] tracking-widest uppercase text-primary-300 dark:text-gray-500 font-medium">
                  Fix gerechnet!
                </span>
              </div>
              <p className="text-primary-200 dark:text-gray-400 text-sm leading-relaxed">
                Kostenlose Online-Rechner für jeden Bedarf. Schnell, einfach und ohne Anmeldung.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Kategorien</h3>
              <ul className="space-y-2">
                {kategorien.map(k => (
                  <li key={k.slug}>
                    <Link href={`/${k.slug}`} className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                      {k.icon} {k.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Rechtliches</h3>
              <ul className="space-y-2">
                <li><Link href="/impressum" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">Impressum</Link></li>
                <li><Link href="/datenschutz" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">Datenschutz</Link></li>
                <li>
                  <button
                    onClick={openSettings}
                    className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-600 dark:border-gray-700 mt-8 pt-8 text-center text-primary-300 dark:text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rechenfix.de — Alle Angaben ohne Gewähr.
        </div>
      </div>
    </footer>
  );
}
