'use client';

import { useState } from 'react';

interface Props {
  eingaben: Record<string, unknown>;
  ergebnis: Record<string, unknown>;
}

export default function StromSpartipp({ eingaben, ergebnis }: Props) {
  const [antwort, setAntwort] = useState('');
  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState('');
  const [kopiert, setKopiert] = useState(false);

  async function handleAnfrage() {
    setLaden(true);
    setFehler('');
    setAntwort('');

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rechner_name: '__strom_spartipp__',
          eingaben,
          ergebnis,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFehler(data.error || 'Spartipps konnten nicht geladen werden.');
        return;
      }

      setAntwort(data.explanation);
    } catch {
      setFehler('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLaden(false);
    }
  }

  async function handleKopieren() {
    try {
      await navigator.clipboard.writeText(antwort);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch { /* ignore */ }
  }

  function handleSchliessen() {
    setAntwort('');
    setFehler('');
  }

  if (!ergebnis || Object.keys(ergebnis).length === 0) return null;

  return (
    <div className="mt-4 print:hidden">
      {/* Trigger-Button */}
      {!antwort && !laden && (
        <button
          onClick={handleAnfrage}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <span className="text-lg">&#x1F4A1;</span>
          KI-Spartipp: Wie kann ich sparen?
        </button>
      )}

      {/* Loading */}
      {laden && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30 rounded-xl p-5 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-emerald-700 dark:text-emerald-300 text-sm font-medium">KI analysiert Ihren Stromverbrauch&hellip;</span>
        </div>
      )}

      {/* Fehler */}
      {fehler && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{fehler}</p>
          <button
            onClick={handleAnfrage}
            className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Antwort */}
      {antwort && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-200 dark:border-emerald-700/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">&#x1F4A1;</span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Ihre persönlichen Spartipps</span>
            </div>
            <button
              onClick={handleSchliessen}
              className="text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Text */}
          <div className="px-5 py-4">
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">
              {antwort}
            </p>
          </div>

          {/* Actions */}
          <div className="px-5 py-3 border-t border-emerald-200 dark:border-emerald-700/30 flex flex-wrap items-center gap-2">
            <button
              onClick={handleKopieren}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {kopiert ? (
                <><svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Kopiert!</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Tipps kopieren</>
              )}
            </button>
            <span className="text-xs text-emerald-400 dark:text-emerald-500 ml-auto">
              KI-Sch&auml;tzung &mdash; Ersparnis kann variieren
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
