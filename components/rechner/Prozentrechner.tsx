'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  berechneProzentwert,
  berechneProzentsatz,
  berechneGrundwert,
  berechneAufschlag,
  berechneAbschlag,
} from '@/lib/berechnungen/prozent';
import type { ProzentErgebnis } from '@/lib/berechnungen/prozent';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'prozentwert' | 'prozentsatz' | 'grundwert' | 'aufschlag' | 'abschlag';

const QUICK_VALUES = [5, 10, 15, 19, 25, 50];

interface HistoryEintrag {
  label: string;
  ergebnis: string;
  modus: string;
  zeit: string;
}

const HISTORY_KEY = 'rechenfix_prozent_history';
const MAX_HISTORY = 5;

export default function Prozentrechner() {
  const [modus, setModus] = useState<Modus>('prozentwert');
  const [wert1, setWert1] = useState('');
  const [wert2, setWert2] = useState('');
  const [kopiert, setKopiert] = useState(false);
  const [history, setHistory] = useState<HistoryEintrag[]>([]);

  // History aus localStorage laden
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const n1 = parseDeutscheZahl(wert1);
  const n2 = parseDeutscheZahl(wert2);

  const modi: {
    key: Modus;
    label: string;
    label1: string;
    label2: string;
  }[] = [
    { key: 'prozentwert', label: 'Wie viel sind X% von Y?', label1: 'Grundwert', label2: 'Prozentsatz (%)' },
    { key: 'prozentsatz', label: 'Wie viel % sind X von Y?', label1: 'Prozentwert', label2: 'Grundwert' },
    { key: 'grundwert', label: 'X sind Y% von ...?', label1: 'Prozentwert', label2: 'Prozentsatz (%)' },
    { key: 'aufschlag', label: 'Wert + X% Aufschlag', label1: 'Ausgangswert', label2: 'Aufschlag (%)' },
    { key: 'abschlag', label: 'Wert − X% Rabatt', label1: 'Ausgangswert', label2: 'Rabatt (%)' },
  ];

  const aktuellerModus = modi.find(m => m.key === modus)!;

  const berechnung = useMemo(() => {
    if (n1 <= 0 || n2 <= 0) return null;
    switch (modus) {
      case 'prozentwert': return berechneProzentwert(n1, n2);
      case 'prozentsatz': return berechneProzentsatz(n1, n2);
      case 'grundwert': return berechneGrundwert(n1, n2);
      case 'aufschlag': return berechneAufschlag(n1, n2);
      case 'abschlag': return berechneAbschlag(n1, n2);
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

  // History speichern wenn neues Ergebnis
  const saveToHistory = useCallback((b: ProzentErgebnis, label: string) => {
    const eintrag: HistoryEintrag = {
      label,
      ergebnis: fmtDisplay(b.ergebnis) + (modus === 'prozentsatz' ? '%' : ''),
      modus: aktuellerModus.label,
      zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => {
      const neu = [eintrag, ...prev.filter(h => h.label !== label)].slice(0, MAX_HISTORY);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(neu)); } catch { /* ignore */ }
      return neu;
    });
  }, [modus, aktuellerModus.label]);

  // Bei neuem gültigen Ergebnis in History speichern
  useEffect(() => {
    if (berechnung && ergebnisLabel) {
      saveToHistory(berechnung, ergebnisLabel);
    }
  }, [berechnung, ergebnisLabel, saveToHistory]);

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

  function handleShare() {
    if (!berechnung) return;
    const text = `${ergebnisLabel} = ${fmtDisplay(berechnung.ergebnis)}${ergebnisEinheit} — berechnet auf rechenfix.de/alltag/prozentrechner`;
    if (navigator.share) {
      navigator.share({ title: 'Prozentrechnung', text });
    } else {
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  }

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
          {/* Quick-Buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_VALUES.map(val => (
              <button
                key={val}
                onClick={() => handleQuick(val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  wert2 === val.toString()
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {val}%
              </button>
            ))}
          </div>
        </div>
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
              <div className="ml-auto flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-all"
                  title="Ergebnis kopieren"
                >
                  {kopiert ? '✓ Kopiert' : 'Kopieren'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-all"
                  title="Ergebnis teilen"
                >
                  Teilen
                </button>
              </div>
            </div>
          </div>

          {/* Rechenweg — immer sichtbar */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 space-y-1">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Rechenweg</p>
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

          <CrossLink href="/alltag/rabattrechner" emoji="🏷️" text="Rabatte berechnen — Endpreis nach %" />
          <CrossLink href="/mathe/prozentuale-veraenderung-rechner" emoji="📈" text="Prozentuale Zu-/Abnahme berechnen" />

          <AiExplain
            rechnerName="Prozentrechner"
            eingaben={{ modus: aktuellerModus.label, wert1: n1, wert2: n2 }}
            ergebnis={{ ergebnis: berechnung.ergebnis, rechenweg: berechnung.rechenweg.join(' → ') }}
          />
        </>
      )}

      {/* Letzte Berechnungen */}
      {history.length > 1 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Letzte Berechnungen</h4>
          <div className="space-y-1.5">
            {history.slice(1).map((h, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400 truncate">{h.label} = <strong className="text-gray-800 dark:text-gray-200">{h.ergebnis}</strong></span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 shrink-0">{h.zeit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function fmtDisplay(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
}
