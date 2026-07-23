'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const BEISPIELE = [
  'Wie viel sind 19% MwSt von 500€?',
  'Was kostet Rauchen pro Jahr bei 10 Zigaretten am Tag?',
  'Wie viel netto bei 3.500€ brutto?',
  'Wie viel Strom verbraucht ein Kühlschrank pro Jahr?',
  'Was ist 15% Rabatt auf 89,99€?',
];

/** Slug (kategorie/slug) → Anzeige-Label für den vom Server gelieferten Rechner-Link */
const SLUG_LABELS: Record<string, string> = {
  'finanzen/brutto-netto-rechner': 'Brutto-Netto-Rechner',
  'finanzen/zinsrechner': 'Zinsrechner',
  'finanzen/kreditrechner': 'Kreditrechner',
  'finanzen/sparrechner': 'Sparrechner',
  'finanzen/inflationsrechner': 'Inflationsrechner',
  'finanzen/stundenlohn-rechner': 'Stundenlohn-Rechner',
  'wohnen/grunderwerbsteuer-rechner': 'Grunderwerbsteuer-Rechner',
  'wohnen/heizkosten-rechner': 'Heizkosten-Rechner',
  'arbeit/pendlerpauschale-rechner': 'Pendlerpauschale-Rechner',
  'arbeit/wahrer-stundenlohn': 'Wahrer-Stundenlohn-Rechner',
  'auto/kfz-steuer-rechner': 'Kfz-Steuer-Rechner',
  'auto/spritkosten-rechner': 'Spritkosten-Rechner',
  'auto/kw-ps-umrechner': 'kW-PS-Rechner',
  'gesundheit/bmi-rechner': 'BMI-Rechner',
  'gesundheit/idealgewicht-rechner': 'Idealgewicht-Rechner',
  'gesundheit/kalorienrechner': 'Kalorienrechner',
  'alltag/dreisatz-rechner': 'Dreisatz-Rechner',
  'alltag/prozentuale-veraenderung-rechner': 'Prozentuale-Veränderung-Rechner',
  'alltag/tagerechner': 'Tage-Rechner',
  'alltag/trinkgeld-rechner': 'Trinkgeld-Rechner',
};

interface AnzeigeZeile { label: string; wert: string; highlight?: boolean; }
interface Verlauf {
  frage: string;
  antwort: string;
  ergebnis: AnzeigeZeile[] | null;   // NEU: strukturierte Tool-Ergebniszeilen
  link: { label: string; href: string } | null;
}

export default function KiRechnerClient() {
  const [frage, setFrage] = useState('');
  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState('');
  const [verlauf, setVerlauf] = useState<Verlauf[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ergebnisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (verlauf.length > 0 && ergebnisRef.current) {
      ergebnisRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [verlauf]);

  async function handleAbsenden() {
    const text = frage.trim();
    if (!text || laden) return;

    setLaden(true);
    setFehler('');

    try {
      const res = await fetch('/api/ki-rechner', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ frage: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFehler(data.error || 'Antwort konnte nicht geladen werden.');
        return;
      }

      const slug: string | null = data.rechnerSlug ?? null;
      const link = slug && SLUG_LABELS[slug]
        ? { label: SLUG_LABELS[slug], href: '/' + slug }
        : null;
      const ergebnis: AnzeigeZeile[] | null = Array.isArray(data.ergebnis) && data.ergebnis.length > 0
        ? data.ergebnis
        : null;
      setVerlauf(prev => [...prev, { frage: text, antwort: data.antwort, ergebnis, link }]);
      setFrage('');
    } catch {
      setFehler('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLaden(false);
    }
  }

  function handleBeispiel(text: string) {
    setFrage(text);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAbsenden();
    }
  }

  return (
    <div className="space-y-6">
      {/* Eingabefeld */}
      <div className="relative">
        <div className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700/40 rounded-2xl shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20 overflow-hidden focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors">
          <textarea
            ref={inputRef}
            value={frage}
            onChange={e => setFrage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Stellen Sie eine Rechenfrage... z.B. "Wie viel netto bei 4.000€ brutto in Steuerklasse 3?"'
            rows={3}
            className="w-full px-5 pt-5 pb-14 text-gray-800 dark:text-gray-200 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none resize-none"
          />
          <div className="absolute bottom-3 right-3">
            <button
              onClick={handleAbsenden}
              disabled={!frage.trim() || laden}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white text-sm font-medium rounded-xl transition-all disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {laden ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analysiere...
                </span>
              ) : (
                'Frage senden'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KI-Transparenzhinweis (Art. 50 Abs. 1 KI-VO) */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Hinweis: Sie interagieren hier mit einem KI-System. Die Antworten werden automatisch generiert.
      </p>

      {/* Beispiel-Fragen */}
      {verlauf.length === 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Beispiel-Fragen</p>
          <div className="flex flex-wrap gap-2">
            {BEISPIELE.map(b => (
              <button
                key={b}
                onClick={() => handleBeispiel(b)}
                className="px-3.5 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fehler */}
      {fehler && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{fehler}</p>
          <button
            onClick={handleAbsenden}
            className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Verlauf */}
      <div className="space-y-4" ref={ergebnisRef}>
        {verlauf.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
            {/* Frage */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-sm shrink-0 mt-0.5">🧑</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pt-0.5">{v.frage}</p>
            </div>

            {/* Antwort */}
            <div className="px-5 py-4 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0 mt-0.5">🤖</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">{v.antwort}</p>

                {/* Ergebnis-Tabelle (feste Zeilen aus dem verifizierten Tool) */}
                {v.ergebnis && v.ergebnis.length > 0 && (
                  <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {v.ergebnis.map((zeile, zi) => (
                          <tr
                            key={zi}
                            className={
                              zeile.highlight
                                ? 'bg-green-50 dark:bg-green-900/20'
                                : zi % 2 === 1
                                  ? 'bg-gray-50/60 dark:bg-gray-700/30'
                                  : ''
                            }
                          >
                            <td className={`px-4 py-2 text-gray-600 dark:text-gray-400 ${zeile.highlight ? 'font-semibold text-gray-800 dark:text-gray-200' : ''}`}>
                              {zeile.label}
                            </td>
                            <td className={`px-4 py-2 text-right tabular-nums ${zeile.highlight ? 'font-bold text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
                              {zeile.wert}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Rechner-Link */}
                {v.link && (
                  <Link
                    href={v.link.href}
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700/40 rounded-xl text-sm font-medium text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 transition-all group"
                  >
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Zum {v.link.label} f&uuml;r eine detaillierte Berechnung
                    <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading-Indikator im Verlauf */}
      {laden && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-sm shrink-0">🧑</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pt-0.5">{frage}</p>
          </div>
          <div className="px-5 py-4 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0">🤖</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Berechne Antwort...</span>
            </div>
          </div>
        </div>
      )}

      {/* Hinweis */}
      <p className="text-xs text-center text-gray-600 dark:text-gray-500">
        Die Ergebnisse werden mit den gepr&uuml;ften Rechnern von rechenfix berechnet. Die KI formuliert die Erl&auml;uterung &mdash; f&uuml;r alle Details den verlinkten Rechner nutzen. Max 3 Fragen pro Minute.
      </p>
    </div>
  );
}
