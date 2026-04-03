'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from './CookieConsentProvider';

export default function CookieBanner() {
  const { bannerVisible, consent, saveConsent } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Toggles mit gespeichertem Consent synchronisieren wenn Einstellungen geöffnet werden
  const openSettings = () => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setShowSettings(true);
  };

  if (!bannerVisible) return null;

  const acceptAll = () => saveConsent({ analytics: true, marketing: true });
  const acceptNecessary = () => saveConsent({ analytics: false, marketing: false });
  const saveSelection = () => saveConsent({ analytics, marketing });

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 inset-x-0 z-[100] animate-fade-in">
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
                <button
                  onClick={acceptAll}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={acceptNecessary}
                  className="bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Nur notwendige
                </button>
                <button
                  onClick={openSettings}
                  className="text-gray-400 hover:text-white font-medium px-5 py-2.5 transition-colors text-sm underline underline-offset-2"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Cookie-Einstellungen
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Schließen"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Hier können Sie auswählen, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.
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

                {/* Analyse */}
                <CookieToggle
                  label="Analyse-Cookies (Google Analytics)"
                  description="Helfen uns zu verstehen, wie Besucher die Website nutzen. Daten werden anonymisiert erfasst."
                  checked={analytics}
                  disabled={false}
                  onChange={setAnalytics}
                />

                {/* Marketing */}
                <CookieToggle
                  label="Marketing-Cookies (Google AdSense)"
                  description="Ermöglichen die Anzeige personalisierter Werbung basierend auf Ihrem Surfverhalten."
                  checked={marketing}
                  disabled={false}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={saveSelection}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
