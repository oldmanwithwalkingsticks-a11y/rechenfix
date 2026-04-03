'use client';

import { useState, useMemo } from 'react';
import { berechneNettoZuBrutto, berechneBruttoZuNetto } from '@/lib/berechnungen/mwst';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

type Richtung = 'netto-zu-brutto' | 'brutto-zu-netto';

export default function MwStRechner() {
  const [richtung, setRichtung] = useState<Richtung>('netto-zu-brutto');
  const [betrag, setBetrag] = useState('100');
  const [mwstSatz, setMwstSatz] = useState(19);

  const n = parseDeutscheZahl(betrag);

  const ergebnis = useMemo(() => {
    return richtung === 'netto-zu-brutto'
      ? berechneNettoZuBrutto(n, mwstSatz)
      : berechneBruttoZuNetto(n, mwstSatz);
  }, [n, mwstSatz, richtung]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Richtung */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setRichtung('netto-zu-brutto'); setBetrag('100'); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            richtung === 'netto-zu-brutto'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Netto → Brutto
        </button>
        <button
          onClick={() => { setRichtung('brutto-zu-netto'); setBetrag('119'); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            richtung === 'brutto-zu-netto'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Brutto → Netto
        </button>
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {richtung === 'netto-zu-brutto' ? 'Nettobetrag' : 'Bruttobetrag'}
          </label>
          <NummerEingabe
            value={betrag}
            onChange={setBetrag}
            placeholder="Betrag eingeben"
            einheit="€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MwSt-Satz</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMwstSatz(19)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                mwstSatz === 19
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              19%
            </button>
            <button
              onClick={() => setMwstSatz(7)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                mwstSatz === 7
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              7%
            </button>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {n > 0 && (
        <div className="result-box">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/70 text-xs mb-1">Netto</p>
              <p className="text-xl font-bold">{fmt(ergebnis.netto)} &euro;</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">MwSt ({mwstSatz}%)</p>
              <p className="text-xl font-bold text-accent-300">+ {fmt(ergebnis.mwstBetrag)} &euro;</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Brutto</p>
              <p className="text-xl font-bold">{fmt(ergebnis.brutto)} &euro;</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
