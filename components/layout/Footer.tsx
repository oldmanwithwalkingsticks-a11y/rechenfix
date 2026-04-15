'use client';

import Link from 'next/link';
import Image from 'next/image';
import { kategorien, getRechnerByKategorie, beliebteRechnerSlugs, rechner } from '@/lib/rechner-config';

export default function Footer() {
  const openGoogleCMP = () => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    // Google Funding Choices (AdSense CMP) — Revocation-Dialog erneut öffnen
    try {
      if (w.googlefc && typeof w.googlefc.showRevocationMessage === 'function') {
        w.googlefc.showRevocationMessage();
        return;
      }
      if (w.googlefc) {
        w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
        w.googlefc.callbackQueue.push({
          CONSENT_DATA_READY: () => {
            if (typeof w.googlefc.showRevocationMessage === 'function') {
              w.googlefc.showRevocationMessage();
            }
          },
        });
        return;
      }
      // Fallback: TCF v2 API (falls Google via IAB-CMP arbeitet)
      if (typeof w.__tcfapi === 'function') {
        w.__tcfapi('displayConsentUi', 2, () => {});
        return;
      }
      alert('Cookie-Einstellungen sind aktuell nicht verfügbar. Bitte laden Sie die Seite neu.');
    } catch {
      /* ignore */
    }
  };

  const beliebteRechner = beliebteRechnerSlugs
    .map(slug => rechner.find(r => r.slug === slug))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <footer className="bg-primary-700 dark:bg-slate-950 text-white mt-16 no-print">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hauptbereich */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Beschreibung */}
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <Image src="/logo.svg" alt="Rechenfix Logo" width={36} height={36} className="shrink-0" />
              <div>
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-extrabold text-white">Rechen</span>
                  <span className="text-2xl font-extrabold text-accent-400">fix</span>
                  <span className="text-sm text-primary-300">.de</span>
                </div>
                <span className="text-[11px] tracking-widest uppercase text-primary-300 dark:text-gray-500 font-medium">
                  Fix gerechnet!
                </span>
              </div>
            </div>
            <p className="text-primary-200 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Kostenlose Online-Rechner für jeden Bedarf. Schnell, einfach und ohne Anmeldung.
            </p>
            <p className="text-primary-300 dark:text-gray-500 text-xs">
              {rechner.length} Rechner in {kategorien.length} Kategorien
            </p>
          </div>

          {/* Beliebte Rechner */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-primary-100">Beliebte Rechner</h3>
            <ul className="space-y-2">
              {beliebteRechner.map(r => r && (
                <li key={r.slug}>
                  <Link
                    href={`/${r.kategorieSlug}/${r.slug}`}
                    className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-5 text-center shrink-0">{r.icon}</span>
                    <span>{r.titel}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/finanzen/brutto-netto-tabelle"
                  className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-5 text-center shrink-0">📊</span>
                  <span>Brutto-Netto-Tabelle</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategorien */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-primary-100">Kategorien</h3>
            <table className="border-separate" style={{ borderSpacing: '0 0.35rem' }}>
              <tbody>
                {kategorien.map(k => {
                  const anzahl = getRechnerByKategorie(k.slug).length;
                  return (
                    <tr key={k.slug}>
                      <td className="pr-1.5">
                        <Link href={`/${k.slug}`} className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap flex items-center gap-1.5">
                          <span className="w-5 text-center shrink-0">{k.icon}</span>
                          <span>{k.name}</span>
                        </Link>
                      </td>
                      <td className="text-primary-400 dark:text-gray-600 text-xs tabular-nums pl-4">{anzahl}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Rechtliches & Mehr */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-primary-100">Rechtliches</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/impressum" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <button
                    onClick={openGoogleCMP}
                    className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-primary-100">Mehr</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/ueber-uns" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link href="/ki-rechner" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                    KI-Rechner
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-primary-200 dark:text-gray-400 hover:text-white transition-colors text-sm">
                    Feedback geben
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-600 dark:border-gray-800 py-5 text-center text-primary-300 dark:text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rechenfix.de — Alle Angaben ohne Gewähr.
        </div>
      </div>
    </footer>
  );
}
