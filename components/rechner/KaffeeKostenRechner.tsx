'use client';

import { useState, useMemo } from 'react';
import { berechneKaffee, getKaffeePreise } from '@/lib/berechnungen/kaffee';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const PREISE = getKaffeePreise();
const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n: number) => Math.round(n).toLocaleString('de-DE');

export default function KaffeeKostenRechner() {
  const [kaffeeProTag, setKaffeeProTag] = useState(2);
  const [art, setArt] = useState<'filter' | 'kapsel' | 'cafe' | 'starbucks' | 'custom'>('cafe');
  const [customPreis, setCustomPreis] = useState('2.50');
  const [jahre, setJahre] = useState(5);

  const customPreisNum = parseFloat(customPreis.replace(',', '.')) || 0;

  const ergebnis = useMemo(() => {
    if (kaffeeProTag <= 0) return null;
    return berechneKaffee({ kaffeeProTag, art, customPreis: customPreisNum, jahre });
  }, [kaffeeProTag, art, customPreisNum, jahre]);

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Kaffees pro Tag */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaffees pro Tag</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setKaffeeProTag(Math.max(1, kaffeeProTag - 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 w-8 text-center">{kaffeeProTag}</span>
            <button
              onClick={() => setKaffeeProTag(kaffeeProTag + 1)}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Seit wie vielen Jahren */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seit wie vielen Jahren?</label>
          <select
            value={jahre}
            onChange={e => setJahre(Number(e.target.value))}
            className="input-field"
          >
            {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map(j => (
              <option key={j} value={j}>
                {j} {j === 1 ? 'Jahr' : 'Jahre'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kaffee-Art */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ihre Kaffee-Art</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(PREISE).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setArt(key as typeof art)}
              className={`p-3 rounded-xl text-sm font-medium border-2 transition-all text-center ${
                art === key
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-300'
              }`}
            >
              <span className="block text-lg mb-1">
                {key === 'filter' ? '☕' : key === 'kapsel' ? '💊' : key === 'cafe' ? '🥤' : '⭐'}
              </span>
              <span className="block text-xs">{val.label}</span>
              <span className="block text-sm font-bold mt-1">{fmt(val.preis)} €</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setArt('custom')}
          className={`mt-2 w-full p-2 rounded-xl text-sm border-2 transition-all ${
            art === 'custom'
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
              : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-amber-300'
          }`}
        >
          Eigener Preis
        </button>
        {art === 'custom' && (
          <div className="mt-2">
            <div className="relative">
              <input
                type="text"
                value={customPreis}
                onChange={e => setCustomPreis(e.target.value)}
                className="input-field pr-8"
                placeholder="z.B. 2,50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">€</span>
            </div>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Ihre Kaffeekosten pro Jahr</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.kostenProJahr)} €</p>
            <p className="text-white/70 text-sm mt-1">
              {fmtInt(ergebnis.kaffeeProJahr)} Tassen pro Jahr × {fmt(ergebnis.preisProStueck)} €
            </p>
          </div>

          {/* Zeitraum-Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-amber-50 dark:bg-amber-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pro Woche</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{fmt(ergebnis.kostenProWoche)} €</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pro Monat</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{fmt(ergebnis.kostenProMonat)} €</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pro Jahr</p>
              <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{fmt(ergebnis.kostenProJahr)} €</p>
            </div>
          </div>

          {/* Bisherige Kosten */}
          {jahre > 0 && (
            <div className="bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-700/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-800 dark:text-red-300">
                ☕ Seit Sie vor <strong>{jahre} {jahre === 1 ? 'Jahr' : 'Jahren'}</strong> angefangen haben:
              </p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">
                {fmt(ergebnis.kostenBisher)} € für Kaffee ausgegeben
              </p>
              <p className="text-xs text-red-600/70 dark:text-red-400/60 mt-1">
                Das sind {fmtInt(ergebnis.kaffeeBisher)} Tassen Kaffee
              </p>
            </div>
          )}

          {/* In 30 Jahren */}
          <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              📊 Hochrechnung auf <strong>30 Jahre</strong>:
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
              {fmt(ergebnis.kostenIn30Jahren)} €
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {ergebnis.kostenIn30Jahren >= 50000
                ? 'Das reicht für eine Anzahlung auf eine Eigentumswohnung!'
                : ergebnis.kostenIn30Jahren >= 15000
                ? 'Das reicht für einen Kleinwagen!'
                : ergebnis.kostenIn30Jahren >= 5000
                ? 'Das reicht für mehrere Traumurlaube!'
                : 'Immerhin ein netter Urlaub!'}
            </p>
          </div>

          {/* Spar-Vergleiche */}
          {ergebnis.sparVergleiche.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/30 rounded-xl p-4 mb-6">
              <h2 className="font-bold text-sm text-green-800 dark:text-green-300 mb-3">💡 So können Sie sparen</h2>
              <div className="space-y-2">
                {ergebnis.sparVergleiche.map((v, i) => (
                  <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Umstieg von <strong>{v.von}</strong> auf <strong>{v.nach}</strong>
                    </p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap ml-2">
                      +{fmt(v.ersparnis)} €/Jahr
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Was man dafür kaufen könnte */}
          {ergebnis.vergleiche.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">
                Was Sie in 30 Jahren dafür kaufen könnten
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ergebnis.vergleiche.map((v, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-center">
                    <span className="text-2xl">{v.icon}</span>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{v.anzahl}×</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun Facts */}
          <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-sm text-amber-800 dark:text-amber-300 mb-2">☕ Wussten Sie schon?</h2>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>• Deutschland ist Europas größter Kaffeemarkt — 164 Liter pro Kopf/Jahr</li>
              <li>• Der durchschnittliche Deutsche trinkt 3,4 Tassen Kaffee pro Tag</li>
              <li>• Filterkaffee ist am günstigsten — und laut Studien auch am gesündesten</li>
              <li>• Die teuerste Tasse Kaffee der Welt kostet über 100 $</li>
            </ul>
          </div>

          {/* AI Explain */}
          <div className="flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Kaffee-Kosten-Rechner"
              eingaben={{
                kaffeeProTag,
                art: art === 'custom' ? `Eigener Preis (${fmt(customPreisNum)} €)` : PREISE[art]?.label ?? art,
                preisProStueck: ergebnis.preisProStueck,
                jahre,
              }}
              ergebnis={{
                kostenProJahr: ergebnis.kostenProJahr,
                kostenBisher: ergebnis.kostenBisher,
                kostenIn30Jahren: ergebnis.kostenIn30Jahren,
                kaffeeProJahr: ergebnis.kaffeeProJahr,
              }}
            />
            <CrossLink href="/alltag/abo-rechner" emoji="📋" text="Alle Abos & Fixkosten berechnen" />
          </div>
        </>
      )}
    </div>
  );
}
