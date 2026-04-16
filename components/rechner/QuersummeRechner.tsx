'use client';

import { useState, useMemo } from 'react';
import { berechneQuersumme } from '@/lib/berechnungen/quersumme';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function QuersummeRechner() {
  const [zahl, setZahl] = useState('123456789');

  const ergebnis = useMemo(() => berechneQuersumme(zahl), [zahl]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="quersumme-zahl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl eingeben</label>
          <input
            id="quersumme-zahl"
            type="text"
            inputMode="numeric"
            value={zahl}
            onChange={e => setZahl(e.target.value)}
            placeholder="123456789"
            className="input-field font-mono text-lg"
          />
          <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Auch sehr große Zahlen möglich (beliebig viele Ziffern)</p>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Quersumme von {ergebnis.zahl.length > 20 ? ergebnis.zahl.slice(0, 20) + '…' : ergebnis.zahl}</p>
            <p className="text-5xl font-bold">{ergebnis.quersumme}</p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Iterierte Quersumme</p>
                <p className="text-2xl font-bold">{ergebnis.iterierteQuersumme}</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Alternierende Quersumme</p>
                <p className="text-2xl font-bold">{ergebnis.alternierend}</p>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="px-4 py-3 text-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Quersumme:</p>
                <p className="font-mono text-gray-800 dark:text-gray-200 break-all">{ergebnis.quersummeRechenweg}</p>
              </div>
              {ergebnis.iterierteSchritte.length > 0 && (
                <div className="px-4 py-3 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Iterierte Quersumme:</p>
                  {ergebnis.iterierteSchritte.map((s, i) => (
                    <p key={i} className="font-mono text-gray-800 dark:text-gray-200">
                      QS({s.zahl}) = {s.quersumme}
                    </p>
                  ))}
                  <p className="font-mono font-bold text-primary-600 dark:text-primary-400">→ {ergebnis.iterierteQuersumme}</p>
                </div>
              )}
              <div className="px-4 py-3 text-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Alternierende Quersumme:</p>
                <p className="font-mono text-gray-800 dark:text-gray-200 break-all">{ergebnis.alternierendRechenweg}</p>
              </div>
            </div>
          </div>

          {/* Teilbarkeitscheck */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Teilbarkeitscheck</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Durch <strong>3</strong> teilbar? (QS {ergebnis.quersumme} {ergebnis.teilbarDurch3 ? 'ist' : 'ist nicht'} durch 3 teilbar)
                </span>
                <span className={`font-bold ${ergebnis.teilbarDurch3 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {ergebnis.teilbarDurch3 ? '✓ Ja' : '✗ Nein'}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Durch <strong>9</strong> teilbar? (QS {ergebnis.quersumme} {ergebnis.teilbarDurch9 ? 'ist' : 'ist nicht'} durch 9 teilbar)
                </span>
                <span className={`font-bold ${ergebnis.teilbarDurch9 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {ergebnis.teilbarDurch9 ? '✓ Ja' : '✗ Nein'}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Durch <strong>11</strong> teilbar? (Alt. QS {ergebnis.alternierend} {ergebnis.teilbarDurch11 ? 'ist' : 'ist nicht'} durch 11 teilbar)
                </span>
                <span className={`font-bold ${ergebnis.teilbarDurch11 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {ergebnis.teilbarDurch11 ? '✓ Ja' : '✗ Nein'}
                </span>
              </div>
            </div>
          </div>

          <CrossLink href="/mathe/primzahl-rechner" emoji="🔢" text="Primzahlen prüfen" />
          <CrossLink href="/mathe/bruchrechner" emoji="🔢" text="Brüche berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Quersumme von ${ergebnis.zahl.length > 30 ? ergebnis.zahl.slice(0, 30) + '…' : ergebnis.zahl}: ${ergebnis.quersumme} | Iterierte QS: ${ergebnis.iterierteQuersumme} | Alternierende QS: ${ergebnis.alternierend} | Teilbar durch 3: ${ergebnis.teilbarDurch3 ? 'Ja' : 'Nein'} | durch 9: ${ergebnis.teilbarDurch9 ? 'Ja' : 'Nein'} | durch 11: ${ergebnis.teilbarDurch11 ? 'Ja' : 'Nein'}`}
            seitenTitel="Quersumme-Rechner"
          />

          <AiExplain
            rechnerName="Quersumme-Rechner"
            eingaben={{ zahl: ergebnis.zahl }}
            ergebnis={{
              quersumme: ergebnis.quersumme,
              iterierteQuersumme: ergebnis.iterierteQuersumme,
              alternierend: ergebnis.alternierend,
              teilbarDurch3: ergebnis.teilbarDurch3,
              teilbarDurch9: ergebnis.teilbarDurch9,
              teilbarDurch11: ergebnis.teilbarDurch11,
            }}
          />
        </>
      )}
    </div>
  );
}
