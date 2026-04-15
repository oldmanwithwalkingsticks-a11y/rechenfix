'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Typ = 'damen' | 'herren' | 'kinder';
type System = 'eu' | 'us' | 'uk' | 'cm';

interface Size {
  eu: number;
  us: number;
  uk: number;
  cm: number;
}

// Damen-Tabelle
const DAMEN: Size[] = [
  { eu: 35,   us: 5,    uk: 2.5, cm: 22.0 },
  { eu: 35.5, us: 5.5,  uk: 3,   cm: 22.5 },
  { eu: 36,   us: 6,    uk: 3.5, cm: 23.0 },
  { eu: 37,   us: 6.5,  uk: 4,   cm: 23.5 },
  { eu: 37.5, us: 7,    uk: 4.5, cm: 24.0 },
  { eu: 38,   us: 7.5,  uk: 5,   cm: 24.5 },
  { eu: 38.5, us: 8,    uk: 5.5, cm: 24.8 },
  { eu: 39,   us: 8.5,  uk: 6,   cm: 25.0 },
  { eu: 40,   us: 9,    uk: 6.5, cm: 25.5 },
  { eu: 40.5, us: 9.5,  uk: 7,   cm: 26.0 },
  { eu: 41,   us: 10,   uk: 7.5, cm: 26.5 },
  { eu: 42,   us: 10.5, uk: 8,   cm: 27.0 },
  { eu: 42.5, us: 11,   uk: 8.5, cm: 27.5 },
  { eu: 43,   us: 11.5, uk: 9,   cm: 28.0 },
  { eu: 44,   us: 12,   uk: 9.5, cm: 28.5 },
];

// Herren-Tabelle
const HERREN: Size[] = [
  { eu: 39,   us: 6,    uk: 5.5, cm: 24.5 },
  { eu: 40,   us: 7,    uk: 6,   cm: 25.0 },
  { eu: 40.5, us: 7.5,  uk: 6.5, cm: 25.5 },
  { eu: 41,   us: 8,    uk: 7,   cm: 26.0 },
  { eu: 42,   us: 8.5,  uk: 7.5, cm: 26.5 },
  { eu: 42.5, us: 9,    uk: 8,   cm: 27.0 },
  { eu: 43,   us: 9.5,  uk: 8.5, cm: 27.5 },
  { eu: 43.5, us: 10,   uk: 9,   cm: 28.0 },
  { eu: 44,   us: 10.5, uk: 9.5, cm: 28.5 },
  { eu: 44.5, us: 11,   uk: 10,  cm: 29.0 },
  { eu: 45,   us: 11.5, uk: 10.5,cm: 29.5 },
  { eu: 46,   us: 12,   uk: 11,  cm: 30.0 },
  { eu: 46.5, us: 12.5, uk: 11.5,cm: 30.5 },
  { eu: 47,   us: 13,   uk: 12,  cm: 31.0 },
  { eu: 48,   us: 14,   uk: 13,  cm: 31.5 },
];

// Kinder-Tabelle
const KINDER: Size[] = [
  { eu: 20, us: 4,    uk: 3.5, cm: 12.5 },
  { eu: 21, us: 5,    uk: 4.5, cm: 13.0 },
  { eu: 22, us: 5.5,  uk: 5,   cm: 13.5 },
  { eu: 23, us: 6.5,  uk: 6,   cm: 14.5 },
  { eu: 24, us: 7.5,  uk: 7,   cm: 15.0 },
  { eu: 25, us: 8,    uk: 7.5, cm: 15.5 },
  { eu: 26, us: 9,    uk: 8.5, cm: 16.5 },
  { eu: 27, us: 10,   uk: 9,   cm: 17.0 },
  { eu: 28, us: 10.5, uk: 10,  cm: 17.5 },
  { eu: 29, us: 11.5, uk: 10.5,cm: 18.0 },
  { eu: 30, us: 12,   uk: 11,  cm: 18.5 },
  { eu: 31, us: 13,   uk: 12,  cm: 19.5 },
  { eu: 32, us: 1,    uk: 13,  cm: 20.0 },
  { eu: 33, us: 2,    uk: 1,   cm: 20.5 },
  { eu: 34, us: 3,    uk: 2,   cm: 21.5 },
];

const TABELLE: Record<Typ, Size[]> = { damen: DAMEN, herren: HERREN, kinder: KINDER };

const DEFAULTS: Record<Typ, number> = { damen: 39, herren: 43, kinder: 28 };

export default function SchuhgroessenRechner() {
  const [typ, setTyp] = useState<Typ>('damen');
  const [system, setSystem] = useState<System>('eu');
  const [wert, setWert] = useState<number>(DEFAULTS.damen);

  const tabelle = TABELLE[typ];

  // Match by closest value in selected system
  const match = useMemo<Size>(() => {
    const getKey = (s: Size): number => s[system];
    let best = tabelle[0];
    let bestDiff = Math.abs(getKey(best) - wert);
    for (const s of tabelle) {
      const d = Math.abs(getKey(s) - wert);
      if (d < bestDiff) {
        best = s;
        bestDiff = d;
      }
    }
    return best;
  }, [typ, system, wert, tabelle]);

  const changeTyp = (t: Typ) => {
    setTyp(t);
    setWert(DEFAULTS[t]);
    setSystem('eu');
  };

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

  const options = tabelle.map(s => s[system]);

  const einheit = system === 'cm' ? 'cm' : system.toUpperCase();

  return (
    <div>
      {/* Typ */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Typ</label>
        <div className="grid grid-cols-3 gap-2">
          {(['damen', 'herren', 'kinder'] as Typ[]).map(t => (
            <button
              key={t}
              onClick={() => changeTyp(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                typ === t
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {t === 'damen' ? 'Damen' : t === 'herren' ? 'Herren' : 'Kinder'}
            </button>
          ))}
        </div>
      </div>

      {/* System */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eingabe-System</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['eu', 'us', 'uk', 'cm'] as System[]).map(s => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                system === s
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {s === 'cm' ? 'cm (Fußlänge)' : s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Größe */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Größe ({einheit})</label>
        <select
          value={wert}
          onChange={e => setWert(parseFloat(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {options.map((v, i) => (
            <option key={i} value={v}>{fmt(v)} {einheit}</option>
          ))}
        </select>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <p className="text-white/90 text-sm mb-2">Ihre Schuhgröße ({typ})</p>
        <div className="grid grid-cols-2 gap-3 text-white">
          <div>
            <p className="text-xs opacity-80">EU</p>
            <p className="text-3xl font-bold">{fmt(match.eu)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">US</p>
            <p className="text-3xl font-bold">{fmt(match.us)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">UK</p>
            <p className="text-3xl font-bold">{fmt(match.uk)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Fußlänge</p>
            <p className="text-3xl font-bold">{fmt(match.cm)} cm</p>
          </div>
        </div>
      </div>

      {/* Tipp */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">💡 Tipp zum Messen</p>
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          Messen Sie Ihren Fuß <strong>abends</strong> — Füße schwellen über den Tag an. Stellen Sie sich auf ein Blatt Papier, zeichnen Sie die Umrisse nach und messen Sie von der Ferse bis zur längsten Zehe. Addieren Sie <strong>0,5–1 cm Zugabe</strong> für Bewegungsfreiheit im Schuh.
        </p>
      </div>

      {/* Umrechnungstabelle */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6 overflow-x-auto">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Umrechnungstabelle {typ === 'damen' ? 'Damen' : typ === 'herren' ? 'Herren' : 'Kinder'}</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="py-2 text-left text-gray-600 dark:text-gray-400 font-medium">EU</th>
              <th className="py-2 text-right text-gray-600 dark:text-gray-400 font-medium">US</th>
              <th className="py-2 text-right text-gray-600 dark:text-gray-400 font-medium">UK</th>
              <th className="py-2 text-right text-gray-600 dark:text-gray-400 font-medium">cm</th>
            </tr>
          </thead>
          <tbody>
            {tabelle.map((s, i) => (
              <tr
                key={i}
                className={`${s.eu === match.eu ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}
              >
                <td className="py-1.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt(s.eu)}</td>
                <td className="py-1.5 text-right text-gray-800 dark:text-gray-200 tabular-nums">{fmt(s.us)}</td>
                <td className="py-1.5 text-right text-gray-800 dark:text-gray-200 tabular-nums">{fmt(s.uk)}</td>
                <td className="py-1.5 text-right text-gray-800 dark:text-gray-200 tabular-nums">{fmt(s.cm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Einheiten-Umrechner: Länge, Gewicht, Temperatur und mehr" />
      <CrossLink href="/alltag/waehrungsrechner" emoji="💱" text="Währungsrechner: Euro, Dollar, Pfund und viele mehr" />

      <ErgebnisAktionen
        ergebnisText={`Schuhgröße (${typ}): EU ${fmt(match.eu)} = US ${fmt(match.us)} = UK ${fmt(match.uk)} = ${fmt(match.cm)} cm Fußlänge`}
        seitenTitel="Schuhgrößen-Umrechner"
      />

      <AiExplain
        rechnerName="Schuhgrößen-Umrechner"
        eingaben={{
          typ: typ === 'damen' ? 'Damen' : typ === 'herren' ? 'Herren' : 'Kinder',
          eingabeSystem: system.toUpperCase(),
          eingabewert: `${fmt(wert)} ${einheit}`,
        }}
        ergebnis={{
          eu: fmt(match.eu),
          us: fmt(match.us),
          uk: fmt(match.uk),
          fusslaengeCm: fmt(match.cm),
        }}
      />
    </div>
  );
}
