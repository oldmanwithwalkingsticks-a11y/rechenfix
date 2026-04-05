'use client';

import { useState } from 'react';

interface Props {
  rechnerName: string;
  eingaben: Record<string, unknown>;
  ergebnis: Record<string, unknown>;
}

export default function AiExplain({ rechnerName, eingaben, ergebnis }: Props) {
  const [erklaerung, setErklaerung] = useState('');
  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState('');
  const [kopiert, setKopiert] = useState(false);

  async function handleExplain() {
    setLaden(true);
    setFehler('');
    setErklaerung('');

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rechner_name: rechnerName,
          eingaben,
          ergebnis,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFehler(data.error || 'Erklärung konnte nicht geladen werden.');
        return;
      }

      setErklaerung(data.explanation);
    } catch {
      setFehler('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLaden(false);
    }
  }

  async function handleKopieren() {
    try {
      await navigator.clipboard.writeText(erklaerung);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch { /* ignore */ }
  }

  function handleTeilen() {
    const text = `${erklaerung}\n\n— Erklärt von rechenfix.de`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
      '_blank',
    );
  }

  function handleSchliessen() {
    setErklaerung('');
    setFehler('');
  }

  // Noch kein Ergebnis oder Ergebnis leer
  if (!ergebnis || Object.keys(ergebnis).length === 0) return null;

  return (
    <div className="mt-4 print:hidden">
      {/* Button zum Auslösen */}
      {!erklaerung && !laden && (
        <button
          onClick={handleExplain}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Fix erkl&auml;rt &mdash; Was bedeutet mein Ergebnis?
        </button>
      )}

      {/* Loading */}
      {laden && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-5 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">KI analysiert Ihr Ergebnis&hellip;</span>
        </div>
      )}

      {/* Fehler */}
      {fehler && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{fehler}</p>
          <button
            onClick={handleExplain}
            className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Erklärung */}
      {erklaerung && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-blue-200 dark:border-blue-700/30">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Fix erkl&auml;rt</span>
            </div>
            <button
              onClick={handleSchliessen}
              className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              aria-label="Erklärung schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Text */}
          <div className="px-5 py-4">
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">
              {erklaerung}
            </p>
          </div>

          {/* Actions + Hinweis */}
          <div className="px-5 py-3 border-t border-blue-200 dark:border-blue-700/30 flex flex-wrap items-center gap-2">
            <button
              onClick={handleKopieren}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {kopiert ? (
                <><svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Kopiert!</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Erkl&auml;rung kopieren</>
              )}
            </button>
            <button
              onClick={handleTeilen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Teilen
            </button>
            <span className="text-xs text-blue-400 dark:text-blue-500 ml-auto">
              Erkl&auml;rt von KI &mdash; keine Rechts- oder Steuerberatung
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
