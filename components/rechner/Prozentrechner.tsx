'use client';

import { useState } from 'react';
import { berechneProzentwert, berechneProzentsatz, berechneGrundwert } from '@/lib/berechnungen/prozent';

type Modus = 'prozentwert' | 'prozentsatz' | 'grundwert';

export default function Prozentrechner() {
  const [modus, setModus] = useState<Modus>('prozentwert');
  const [wert1, setWert1] = useState('');
  const [wert2, setWert2] = useState('');

  const n1 = parseFloat(wert1) || 0;
  const n2 = parseFloat(wert2) || 0;

  let ergebnis = 0;
  let ergebnisLabel = '';
  let ergebnisEinheit = '';

  switch (modus) {
    case 'prozentwert':
      ergebnis = berechneProzentwert(n1, n2);
      ergebnisLabel = `${n2}% von ${n1}`;
      ergebnisEinheit = '';
      break;
    case 'prozentsatz':
      ergebnis = berechneProzentsatz(n1, n2);
      ergebnisLabel = `${n1} von ${n2} sind`;
      ergebnisEinheit = '%';
      break;
    case 'grundwert':
      ergebnis = berechneGrundwert(n1, n2);
      ergebnisLabel = `${n1} sind ${n2}% von`;
      ergebnisEinheit = '';
      break;
  }

  const modi: { key: Modus; label: string; label1: string; label2: string }[] = [
    { key: 'prozentwert', label: 'Wie viel sind X% von Y?', label1: 'Grundwert', label2: 'Prozentsatz (%)' },
    { key: 'prozentsatz', label: 'Wie viel % sind X von Y?', label1: 'Prozentwert', label2: 'Grundwert' },
    { key: 'grundwert', label: 'X sind Y% von ...?', label1: 'Prozentwert', label2: 'Prozentsatz (%)' },
  ];

  const aktuellerModus = modi.find(m => m.key === modus)!;

  return (
    <div>
      {/* Modus-Auswahl */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modi.map(m => (
          <button
            key={m.key}
            onClick={() => { setModus(m.key); setWert1(''); setWert2(''); }}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{aktuellerModus.label1}</label>
          <input
            type="number"
            value={wert1}
            onChange={e => setWert1(e.target.value)}
            placeholder="Wert eingeben"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{aktuellerModus.label2}</label>
          <input
            type="number"
            value={wert2}
            onChange={e => setWert2(e.target.value)}
            placeholder="Wert eingeben"
            className="input-field"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {(n1 > 0 || n2 > 0) && (
        <div className="result-box">
          <p className="text-white/80 text-sm mb-1">{ergebnisLabel}</p>
          <p className="text-4xl font-bold">
            {ergebnis.toLocaleString('de-DE', { maximumFractionDigits: 2 })}{ergebnisEinheit}
          </p>
        </div>
      )}
    </div>
  );
}
