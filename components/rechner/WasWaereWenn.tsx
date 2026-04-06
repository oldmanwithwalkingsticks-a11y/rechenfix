'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  eingaben: Record<string, unknown>;
  ergebnis: Record<string, unknown>;
}

const BEISPIELE = [
  'Was passiert wenn ich 500€ mehr verdiene?',
  'Lohnt sich Steuerklasse 3 für mich?',
  'Wie viel mehr netto bei Kirchenaustritt?',
  'Was bringt mir betriebliche Altersvorsorge?',
];

export default function WasWaereWenn({ eingaben, ergebnis }: Props) {
  const [offen, setOffen] = useState(false);
  const [frage, setFrage] = useState('');
  const [antwort, setAntwort] = useState('');
  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState('');
  const [kopiert, setKopiert] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (offen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [offen]);

  async function handleAbsenden() {
    const text = frage.trim();
    if (!text) return;

    setLaden(true);
    setFehler('');
    setAntwort('');

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rechner_name: '__was_waere_wenn__',
          eingaben,
          ergebnis,
          frage: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFehler(data.error || 'Antwort konnte nicht geladen werden.');
        return;
      }

      setAntwort(data.explanation);
    } catch {
      setFehler('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLaden(false);
    }
  }

  function handleBeispiel(text: string) {
    setFrage(text);
    setAntwort('');
    setFehler('');
  }

  function handleSchliessen() {
    setOffen(false);
    setAntwort('');
    setFehler('');
    setFrage('');
  }

  async function handleKopieren() {
    try {
      await navigator.clipboard.writeText(antwort);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch { /* ignore */ }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAbsenden();
    }
  }

  if (!ergebnis || Object.keys(ergebnis).length === 0) return null;

  return (
    <div className="mt-4 print:hidden">
      {/* Trigger-Button */}
      {!offen && (
        <button
          onClick={() => setOffen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <span className="text-lg">&#x1F52E;</span>
          Was w&auml;re wenn...?
        </button>
      )}

      {/* Eingabe-Panel */}
      {offen && !antwort && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-purple-200 dark:border-purple-700/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">&#x1F52E;</span>
              <span className="font-semibold text-purple-800 dark:text-purple-300 text-sm">Was w&auml;re wenn...?</span>
            </div>
            <button
              onClick={handleSchliessen}
              className="text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-5 py-4 space-y-3">
            {/* Beispiel-Chips */}
            <div className="flex flex-wrap gap-2">
              {BEISPIELE.map((b) => (
                <button
                  key={b}
                  onClick={() => handleBeispiel(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    frage === b
                      ? 'bg-purple-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Freitext-Eingabe */}
            <div className="relative">
              <textarea
                ref={inputRef}
                value={frage}
                onChange={(e) => setFrage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Stellen Sie Ihre Was-wäre-wenn-Frage..."
                rows={2}
                className="w-full px-4 py-3 pr-24 rounded-xl border border-purple-200 dark:border-purple-700/50 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 resize-none"
              />
              <button
                onClick={handleAbsenden}
                disabled={!frage.trim() || laden}
                className="absolute right-2 bottom-2 px-4 py-1.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white text-xs font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Fragen
              </button>
            </div>
            <p className="text-xs text-purple-400 dark:text-purple-500">Enter zum Absenden, Shift+Enter f&uuml;r neue Zeile</p>
          </div>

          {/* Loading */}
          {laden && (
            <div className="px-5 pb-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin shrink-0" />
              <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">KI berechnet Ihr Szenario&hellip;</span>
            </div>
          )}

          {/* Fehler */}
          {fehler && (
            <div className="px-5 pb-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-lg p-3">
                <p className="text-sm text-red-700 dark:text-red-300">{fehler}</p>
                <button
                  onClick={handleAbsenden}
                  className="mt-1 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
                >
                  Erneut versuchen
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Antwort */}
      {antwort && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-purple-200 dark:border-purple-700/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">&#x1F52E;</span>
              <span className="font-semibold text-purple-800 dark:text-purple-300 text-sm">Was w&auml;re wenn...?</span>
            </div>
            <button
              onClick={handleSchliessen}
              className="text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Frage */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-xs text-purple-500 dark:text-purple-400 font-medium mb-1">Ihre Frage:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">&bdquo;{frage}&ldquo;</p>
          </div>

          {/* Antwort-Text */}
          <div className="px-5 py-3">
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">
              {antwort}
            </p>
          </div>

          {/* Actions */}
          <div className="px-5 py-3 border-t border-purple-200 dark:border-purple-700/30 flex flex-wrap items-center gap-2">
            <button
              onClick={handleKopieren}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {kopiert ? (
                <><svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Kopiert!</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Kopieren</>
              )}
            </button>
            <button
              onClick={() => { setAntwort(''); setFehler(''); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              Neue Frage stellen
            </button>
            <span className="text-xs text-purple-400 dark:text-purple-500 ml-auto">
              KI-Simulation &mdash; keine Steuerberatung
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
