'use client';

import { useState, useCallback, useEffect } from 'react';
import { berechne, formatErgebnis, type Winkelmodus, type VerlaufEintrag } from '@/lib/berechnungen/taschenrechner';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

type TastenTyp = 'zahl' | 'operator' | 'funktion' | 'gleich' | 'loeschen' | 'spezial';

interface Taste {
  label: string;
  wert: string;
  typ: TastenTyp;
  breit?: boolean;
}

const tastenReihen: Taste[][] = [
  [
    { label: 'sin', wert: 'sin(', typ: 'funktion' },
    { label: 'cos', wert: 'cos(', typ: 'funktion' },
    { label: 'tan', wert: 'tan(', typ: 'funktion' },
    { label: 'π', wert: 'π', typ: 'spezial' },
    { label: 'e', wert: 'e', typ: 'spezial' },
  ],
  [
    { label: 'sin⁻¹', wert: 'asin(', typ: 'funktion' },
    { label: 'cos⁻¹', wert: 'acos(', typ: 'funktion' },
    { label: 'tan⁻¹', wert: 'atan(', typ: 'funktion' },
    { label: '(', wert: '(', typ: 'funktion' },
    { label: ')', wert: ')', typ: 'funktion' },
  ],
  [
    { label: 'x²', wert: '^2', typ: 'funktion' },
    { label: 'x³', wert: '^3', typ: 'funktion' },
    { label: 'xʸ', wert: '^', typ: 'funktion' },
    { label: '√', wert: 'sqrt(', typ: 'funktion' },
    { label: '³√', wert: 'cbrt(', typ: 'funktion' },
  ],
  [
    { label: 'log', wert: 'log(', typ: 'funktion' },
    { label: 'ln', wert: 'ln(', typ: 'funktion' },
    { label: '10ˣ', wert: '10^', typ: 'funktion' },
    { label: 'eˣ', wert: 'exp(', typ: 'funktion' },
    { label: '1/x', wert: '1/', typ: 'funktion' },
  ],
  [
    { label: '7', wert: '7', typ: 'zahl' },
    { label: '8', wert: '8', typ: 'zahl' },
    { label: '9', wert: '9', typ: 'zahl' },
    { label: '÷', wert: '÷', typ: 'operator' },
    { label: '←', wert: 'BACK', typ: 'loeschen' },
  ],
  [
    { label: '4', wert: '4', typ: 'zahl' },
    { label: '5', wert: '5', typ: 'zahl' },
    { label: '6', wert: '6', typ: 'zahl' },
    { label: '×', wert: '×', typ: 'operator' },
    { label: 'C', wert: 'CLEAR', typ: 'loeschen' },
  ],
  [
    { label: '1', wert: '1', typ: 'zahl' },
    { label: '2', wert: '2', typ: 'zahl' },
    { label: '3', wert: '3', typ: 'zahl' },
    { label: '−', wert: '−', typ: 'operator' },
    { label: 'CE', wert: 'CE', typ: 'loeschen' },
  ],
  [
    { label: '0', wert: '0', typ: 'zahl' },
    { label: ',', wert: ',', typ: 'zahl' },
    { label: '±', wert: 'NEGATE', typ: 'spezial' },
    { label: '+', wert: '+', typ: 'operator' },
    { label: '=', wert: 'EQUALS', typ: 'gleich' },
  ],
  [
    { label: 'Ans', wert: 'Ans', typ: 'spezial' },
    { label: 'EXP', wert: 'E', typ: 'spezial' },
    { label: '%', wert: '%', typ: 'spezial' },
    { label: 'n!', wert: '!', typ: 'spezial' },
    { label: 'DEG', wert: 'TOGGLE_MODE', typ: 'spezial' },
  ],
];

function tastenFarbe(typ: TastenTyp, label: string): string {
  if (typ === 'gleich') return 'bg-orange-500 hover:bg-orange-600 text-white shadow-md';
  if (typ === 'loeschen') return 'bg-red-500/80 hover:bg-red-500 text-white';
  if (typ === 'operator') return 'bg-blue-500/80 hover:bg-blue-500 text-white';
  if (typ === 'funktion') return 'bg-gray-500/60 hover:bg-gray-500/80 text-gray-100';
  if (typ === 'spezial') {
    if (label === 'DEG' || label === 'RAD') return 'bg-indigo-500/60 hover:bg-indigo-500/80 text-white';
    return 'bg-gray-500/40 hover:bg-gray-500/60 text-gray-200';
  }
  // Zahl
  return 'bg-gray-600/80 hover:bg-gray-600 text-white';
}

export default function TaschenrechnerRechner() {
  const [eingabe, setEingabe] = useState('');
  const [ergebnis, setErgebnis] = useState('0');
  const [ans, setAns] = useState(0);
  const [modus, setModus] = useState<Winkelmodus>('DEG');
  const [verlauf, setVerlauf] = useState<VerlaufEintrag[]>([]);
  const [gerade_berechnet, setGeradeBerechnet] = useState(false);

  const berechneAusdruck = useCallback(() => {
    if (!eingabe.trim()) return;
    const result = berechne(eingabe, modus, ans);
    if ('fehler' in result) {
      setErgebnis(result.fehler);
    } else {
      setErgebnis(result.anzeige);
      setAns(result.ergebnis);
      setVerlauf(prev => [{ eingabe, ergebnis: result.anzeige }, ...prev].slice(0, 10));
    }
    setGeradeBerechnet(true);
  }, [eingabe, modus, ans]);

  const tasteDruecken = useCallback((taste: Taste) => {
    const { wert } = taste;

    if (wert === 'CLEAR') {
      setEingabe('');
      setErgebnis('0');
      setGeradeBerechnet(false);
      return;
    }
    if (wert === 'CE') {
      setEingabe('');
      setGeradeBerechnet(false);
      return;
    }
    if (wert === 'BACK') {
      setEingabe(prev => prev.slice(0, -1));
      setGeradeBerechnet(false);
      return;
    }
    if (wert === 'EQUALS') {
      berechneAusdruck();
      return;
    }
    if (wert === 'TOGGLE_MODE') {
      setModus(prev => prev === 'DEG' ? 'RAD' : 'DEG');
      return;
    }
    if (wert === 'NEGATE') {
      if (gerade_berechnet && ergebnis !== '0' && ergebnis !== 'Fehler') {
        const num = parseFloat(ergebnis.replace(',', '.'));
        if (!isNaN(num)) {
          const neg = -num;
          setEingabe(formatErgebnis(neg));
          setErgebnis(formatErgebnis(neg));
          setGeradeBerechnet(false);
        }
      } else {
        setEingabe(prev => {
          if (prev.startsWith('−') || prev.startsWith('-')) return prev.slice(1);
          return '−' + prev;
        });
      }
      return;
    }

    // Bei neuer Eingabe nach Berechnung
    if (gerade_berechnet) {
      if (taste.typ === 'zahl' || taste.typ === 'funktion' && !wert.startsWith('^')) {
        setEingabe(wert === ',' ? '0,' : wert);
      } else {
        // Operator oder Potenz: Ans weiterverwenden
        setEingabe('Ans' + wert);
      }
      setGeradeBerechnet(false);
      return;
    }

    setEingabe(prev => prev + (wert === ',' ? '.' : wert));
  }, [berechneAusdruck, gerade_berechnet, ergebnis]);

  // Tastatur-Support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Nicht abfangen wenn in anderem Input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        berechneAusdruck();
      } else if (e.key === 'Escape') {
        setEingabe('');
        setErgebnis('0');
        setGeradeBerechnet(false);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        setEingabe(prev => prev.slice(0, -1));
        setGeradeBerechnet(false);
      } else if (/^[\d.+\-*/^()!%]$/.test(e.key)) {
        e.preventDefault();
        const mapped = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key === '-' ? '−' : e.key;
        if (gerade_berechnet && /\d/.test(e.key)) {
          setEingabe(e.key);
          setGeradeBerechnet(false);
        } else if (gerade_berechnet) {
          setEingabe('Ans' + mapped);
          setGeradeBerechnet(false);
        } else {
          setEingabe(prev => prev + mapped);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [berechneAusdruck, gerade_berechnet]);

  return (
    <div>
      {/* Taschenrechner-Gehäuse */}
      <div className="max-w-md mx-auto bg-gray-800 dark:bg-gray-900 rounded-3xl p-4 shadow-2xl">
        {/* Display */}
        <div className="bg-gray-900/80 dark:bg-black/60 rounded-2xl p-4 mb-4 min-h-[100px] flex flex-col justify-end">
          <div className="text-right text-gray-600 text-sm font-mono min-h-[1.5rem] break-all leading-relaxed">
            {eingabe || '\u00A0'}
          </div>
          <div className="text-right text-white text-3xl font-bold font-mono mt-1 break-all leading-tight">
            {ergebnis}
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-indigo-400 font-medium">{modus}</span>
          </div>
        </div>

        {/* Tasten */}
        <div className="space-y-1.5">
          {tastenReihen.map((reihe, ri) => (
            <div key={ri} className="grid grid-cols-5 gap-1.5">
              {reihe.map((taste) => {
                const istModusBtn = taste.wert === 'TOGGLE_MODE';
                const displayLabel = istModusBtn ? modus : taste.label;
                return (
                  <button
                    key={taste.label}
                    onClick={() => tasteDruecken(taste)}
                    className={`${tastenFarbe(taste.typ, displayLabel)}
                      rounded-xl font-medium transition-all active:scale-95 active:brightness-90
                      shadow-sm shadow-black/30
                      ${taste.typ === 'zahl' ? 'py-3.5 text-lg' : 'py-2.5 text-xs'}
                      ${taste.typ === 'gleich' ? 'text-lg py-3.5' : ''}
                      ${taste.typ === 'operator' ? 'text-base py-3' : ''}
                    `}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Ergebnis-Aktionen */}
      {verlauf.length > 0 && (
        <div className="max-w-md mx-auto mt-4">
          <ErgebnisAktionen
            ergebnisText={`${verlauf[0].eingabe} = ${verlauf[0].ergebnis}`}
            seitenTitel="Taschenrechner"
          />

          <AiExplain
            rechnerName="Taschenrechner"
            eingaben={{ ausdruck: verlauf[0].eingabe }}
            ergebnis={{ ergebnis: verlauf[0].ergebnis }}
          />
        </div>
      )}

      {/* Verlauf */}
      {verlauf.length > 0 && (
        <div className="max-w-md mx-auto mt-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Verlauf</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
              {verlauf.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const num = parseFloat(v.ergebnis.replace(',', '.'));
                    if (!isNaN(num)) {
                      setEingabe(v.ergebnis.replace(',', '.'));
                      setErgebnis(v.ergebnis);
                      setGeradeBerechnet(true);
                    }
                  }}
                  className="w-full text-right px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-500 font-mono">{v.eingabe}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 font-mono">= {v.ergebnis}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
