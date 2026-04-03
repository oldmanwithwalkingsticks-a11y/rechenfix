'use client';

import { useState, useMemo } from 'react';
import { berechneDreisatz } from '@/lib/berechnungen/dreisatz';

export default function DreisatzRechner() {
  const [a1, setA1] = useState('3');
  const [b1, setB1] = useState('6');
  const [a2, setA2] = useState('7');
  const [antiproportional, setAntiproportional] = useState(false);

  const nA1 = parseFloat(a1) || 0;
  const nB1 = parseFloat(b1) || 0;
  const nA2 = parseFloat(a2) || 0;

  const ergebnis = useMemo(
    () => berechneDreisatz({ a1: nA1, b1: nB1, a2: nA2, antiproportional }),
    [nA1, nB1, nA2, antiproportional]
  );

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { maximumFractionDigits: 4 });

  return (
    <div>
      {/* Modus-Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAntiproportional(false)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            !antiproportional
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Proportional
        </button>
        <button
          onClick={() => setAntiproportional(true)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            antiproportional
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Antiproportional
        </button>
      </div>

      {/* Hinweis */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {antiproportional
          ? '\u201EJe mehr, desto weniger\u201C — z.\u00A0B. mehr Arbeiter = weniger Tage'
          : '\u201EJe mehr, desto mehr\u201C — z.\u00A0B. mehr \u00C4pfel = h\u00F6herer Preis'}
      </p>

      {/* Eingabefelder */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Bekanntes Wertepaar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wert A1
            </label>
            <input
              type="number"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              placeholder="z.B. 3"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wert B1
            </label>
            <input
              type="number"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              placeholder="z.B. 6"
              className="input-field"
            />
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Gesuchter Wert
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wert A2
            </label>
            <input
              type="number"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              placeholder="z.B. 7"
              className="input-field"
            />
          </div>
          <div className="flex items-end">
            <div className="w-full px-4 py-3 text-lg rounded-xl bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-200 dark:border-primary-500/30 text-primary-700 dark:text-primary-300 font-bold text-center">
              B2 = {ergebnis ? fmt(ergebnis.b2) : '?'}
            </div>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && nA1 > 0 && nB1 > 0 && nA2 > 0 && (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">
              Wenn {fmt(nA1)} ≙ {fmt(nB1)}, dann {fmt(nA2)} ≙
            </p>
            <p className="text-4xl font-bold">{fmt(ergebnis.b2)}</p>
          </div>

          {/* Rechenweg */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Rechenweg (Schritt für Schritt)
            </h3>
            <ol className="space-y-3">
              {ergebnis.schritte.map((schritt, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm pt-0.5 font-mono">
                    {schritt}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
