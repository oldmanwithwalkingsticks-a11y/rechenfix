'use client';

import { useState, useMemo } from 'react';
import {
  berechneProzentwert,
  berechneProzentsatz,
  berechneGrundwert,
  berechneAufschlag,
  berechneAbschlag,
} from '@/lib/berechnungen/prozent';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

type Modus = 'prozentwert' | 'prozentsatz' | 'grundwert' | 'aufschlag' | 'abschlag';

const QUICK_VALUES = [5, 10, 15, 20, 25, 50];

export default function Prozentrechner() {
  const [modus, setModus] = useState<Modus>('prozentwert');
  const [wert1, setWert1] = useState('');
  const [wert2, setWert2] = useState('');
  const [zeigRechenweg, setZeigRechenweg] = useState(false);
  const [kopiert, setKopiert] = useState(false);

  const n1 = parseDeutscheZahl(wert1);
  const n2 = parseDeutscheZahl(wert2);

  const modi: {
    key: Modus;
    label: string;
    label1: string;
    label2: string;
    quickFeld: 1 | 2;
  }[] = [
    { key: 'prozentwert', label: 'Wie viel sind X% von Y?', label1: 'Grundwert', label2: 'Prozentsatz (%)', quickFeld: 2 },
    { key: 'prozentsatz', label: 'Wie viel % sind X von Y?', label1: 'Prozentwert', label2: 'Grundwert', quickFeld: 2 },
    { key: 'grundwert', label: 'X sind Y% von ...?', label1: 'Prozentwert', label2: 'Prozentsatz (%)', quickFeld: 2 },
    { key: 'aufschlag', label: 'Wert + X% Aufschlag', label1: 'Ausgangswert', label2: 'Aufschlag (%)', quickFeld: 2 },
    { key: 'abschlag', label: 'Wert − X% Rabatt', label1: 'Ausgangswert', label2: 'Rabatt (%)', quickFeld: 2 },
  ];

  const aktuellerModus = modi.find(m => m.key === modus)!;

  const berechnung = useMemo(() => {
    if (n1 <= 0 && n2 <= 0) return null;
    switch (modus) {
      case 'prozentwert': return n1 > 0 && n2 > 0 ? berechneProzentwert(n1, n2) : null;
      case 'prozentsatz': return n1 > 0 && n2 > 0 ? berechneProzentsatz(n1, n2) : null;
      case 'grundwert': return n1 > 0 && n2 > 0 ? berechneGrundwert(n1, n2) : null;
      case 'aufschlag': return n1 > 0 && n2 > 0 ? berechneAufschlag(n1, n2) : null;
      case 'abschlag': return n1 > 0 && n2 > 0 ? berechneAbschlag(n1, n2) : null;
    }
  }, [n1, n2, modus]);

  const ergebnisLabel = useMemo(() => {
    if (!berechnung) return '';
    switch (modus) {
      case 'prozentwert': return `${fmtDisplay(n2)}% von ${fmtDisplay(n1)}`;
      case 'prozentsatz': return `${fmtDisplay(n1)} von ${fmtDisplay(n2)} sind`;
      case 'grundwert': return `${fmtDisplay(n1)} sind ${fmtDisplay(n2)}% von`;
      case 'aufschlag': return `${fmtDisplay(n1)} + ${fmtDisplay(n2)}% Aufschlag`;
      case 'abschlag': return `${fmtDisplay(n1)} − ${fmtDisplay(n2)}% Rabatt`;
    }
  }, [berechnung, modus, n1, n2]);

  const ergebnisEinheit = modus === 'prozentsatz' ? '%' : '';

  function handleQuick(val: number) {
    setWert2(val.toString());
  }

  function handleCopy() {
    if (!berechnung) return;
    const text = fmtDisplay(berechnung.ergebnis) + ergebnisEinheit;
    navigator.clipboard.writeText(text.replace(/\./g, '').replace(',', '.'));
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  }

  return (
    <div>
      {/* Modus-Auswahl */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modi.map(m => (
          <button
            key={m.key}
            onClick={() => { setModus(m.key); setWert1(''); setWert2(''); setZeigRechenweg(false); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              modus === m.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Eingabefelder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{aktuellerModus.label1}</label>
          <NummerEingabe
            value={wert1}
            onChange={setWert1}
            placeholder="Wert eingeben"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{aktuellerModus.label2}</label>
          <NummerEingabe
            value={wert2}
            onChange={setWert2}
            placeholder="Wert eingeben"
          />
        </div>
      </div>

      {/* Quick-Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-gray-400 dark:text-gray-500 self-center mr-1">Schnellwahl:</span>
        {QUICK_VALUES.map(val => (
          <button
            key={val}
            onClick={() => handleQuick(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              wert2 === val.toString()
                ? 'bg-accent-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {val}%
          </button>
        ))}
      </div>

      {/* Ergebnis */}
      {berechnung && (
        <>
          <div className="result-box mb-4">
            <p className="text-white/80 text-sm mb-1">{ergebnisLabel}</p>
            <div className="flex items-center gap-3">
              <p className="text-4xl font-bold">
                {fmtDisplay(berechnung.ergebnis)}{ergebnisEinheit}
              </p>
              <button
                onClick={handleCopy}
                className="ml-auto px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-all"
                title="Ergebnis kopieren"
              >
                {kopiert ? '✓ Kopiert' : 'Kopieren'}
              </button>
            </div>
          </div>

          {/* Rechenweg */}
          <button
            onClick={() => setZeigRechenweg(!zeigRechenweg)}
            className="flex items-center gap-2 text-sm text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium mb-2 transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${zeigRechenweg ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Rechenweg anzeigen
          </button>
          {zeigRechenweg && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 space-y-1">
              {berechnung.rechenweg.map((schritt, i) => (
                <p key={i} className={`text-sm font-mono ${
                  i === berechnung.rechenweg.length - 1
                    ? 'font-bold text-primary-600 dark:text-primary-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {i < berechnung.rechenweg.length - 1 && <span className="text-gray-400 dark:text-gray-500 mr-2">→</span>}
                  {i === berechnung.rechenweg.length - 1 && <span className="text-primary-500 mr-2">=</span>}
                  {schritt}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function fmtDisplay(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
}
