'use client';

import Link from 'next/link';
import { useCookieConsent } from './CookieConsentProvider';

export default function CookieBanner() {
  const { bannerVisible, settingsVisible, saveConsent, closeSettings } = useCookieConsent();

  return (
    <>
      {/* Banner — nur sichtbar wenn noch kein Consent gegeben */}
      {bannerVisible && (
        <aside role="region" aria-label="Cookie-Hinweis" className="fixed bottom-0 inset-x-0 z-[100] animate-fade-in">
          <div className="max-w-5xl mx-auto px-4 pb-4">
            <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)] p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="flex-1 text-sm leading-relaxed text-gray-200">
                  Wir verwenden Cookies, um Ihnen die beste Nutzererfahrung zu bieten und unsere Website zu verbessern.{' '}
                  <Link href="/datenschutz" className="text-primary-400 hover:text-primary-300 underline">
                    Mehr erfahren
                  </Link>
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
                  {/* R2 — Es gibt nur noch eine Kategorie, deshalb nur noch eine
                      Schaltflaeche. Zwei Knoepfe mit identischer Wirkung waeren
                      eine Scheinauswahl. */}
                  <button
                    onClick={saveConsent}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Einverstanden
                  </button>
                  <BannerSettingsButton />
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Settings Modal — kann unabhängig vom Banner geöffnet werden (z.B. Footer-Link) */}
      {settingsVisible && (
        <div role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeSettings}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="cookie-dialog-title" className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Cookie-Einstellungen
                </h2>
                <button
                  onClick={closeSettings}
                  className="text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Schließen"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Diese Website setzt keine Cookies zu Werbe- oder Analysezwecken. Gespeichert wird allein, was für den Betrieb erforderlich ist; diese Angaben können deshalb nicht abgewählt werden.
              </p>

              <div className="space-y-4">
                {/* Notwendige Cookies */}
                <CookieToggle
                  label="Notwendige Cookies"
                  description="Cookie-Einwilligung, Dark-Mode-Einstellung. Diese Cookies sind für den Betrieb der Website erforderlich."
                  checked={true}
                  disabled={true}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={saveConsent}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  Einverstanden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Einstellungen-Button im Banner — eigene Komponente um Hook-Regeln einzuhalten */
function BannerSettingsButton() {
  const { openSettings } = useCookieConsent();
  return (
    <button
      onClick={openSettings}
      className="text-gray-300 hover:text-white font-medium px-5 py-2.5 transition-colors text-sm underline underline-offset-2"
    >
      Einstellungen
    </button>
  );
}

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border ${
      disabled
        ? 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${disabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
          {label}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 ${
          disabled
            ? 'bg-green-500 cursor-not-allowed'
            : checked
              ? 'bg-green-500 cursor-pointer'
              : 'bg-red-400 cursor-pointer hover:bg-red-500'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
