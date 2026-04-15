'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Typ = 'damen' | 'herren';
type System = 'de' | 'eu' | 'us' | 'uk' | 'it';

interface Size {
  de: number;
  eu: number;
  us: string;
  uk: number;
  it: number;
  brust: number;
  taille: number;
  huefte?: number;
}

const DAMEN: Size[] = [
  { de: 32, eu: 32, us: '0',  uk: 4,  it: 38, brust: 76,  taille: 60,  huefte: 84  },
  { de: 34, eu: 34, us: '2',  uk: 6,  it: 40, brust: 80,  taille: 64,  huefte: 88  },
  { de: 36, eu: 36, us: '4',  uk: 8,  it: 42, brust: 84,  taille: 68,  huefte: 92  },
  { de: 38, eu: 38, us: '6',  uk: 10, it: 44, brust: 88,  taille: 72,  huefte: 96  },
  { de: 40, eu: 40, us: '8',  uk: 12, it: 46, brust: 92,  taille: 76,  huefte: 100 },
  { de: 42, eu: 42, us: '10', uk: 14, it: 48, brust: 96,  taille: 80,  huefte: 104 },
  { de: 44, eu: 44, us: '12', uk: 16, it: 50, brust: 100, taille: 85,  huefte: 108 },
  { de: 46, eu: 46, us: '14', uk: 18, it: 52, brust: 104, taille: 90,  huefte: 112 },
  { de: 48, eu: 48, us: '16', uk: 20, it: 54, brust: 110, taille: 96,  huefte: 116 },
  { de: 50, eu: 50, us: '18', uk: 22, it: 56, brust: 116, taille: 102, huefte: 120 },
  { de: 52, eu: 52, us: '20', uk: 24, it: 58, brust: 122, taille: 108, huefte: 124 },
];

const HERREN: Size[] = [
  { de: 44, eu: 44, us: '34', uk: 34, it: 44, brust: 88,  taille: 76  },
  { de: 46, eu: 46, us: '36', uk: 36, it: 46, brust: 92,  taille: 80  },
  { de: 48, eu: 48, us: '38', uk: 38, it: 48, brust: 96,  taille: 84  },
  { de: 50, eu: 50, us: '40', uk: 40, it: 50, brust: 100, taille: 88  },
  { de: 52, eu: 52, us: '42', uk: 42, it: 52, brust: 104, taille: 92  },
  { de: 54, eu: 54, us: '44', uk: 44, it: 54, brust: 108, taille: 96  },
  { de: 56, eu: 56, us: '46', uk: 46, it: 56, brust: 112, taille: 100 },
  { de: 58, eu: 58, us: '48', uk: 48, it: 58, brust: 116, taille: 104 },
  { de: 60, eu: 60, us: '50', uk: 50, it: 60, brust: 120, taille: 108 },
  { de: 62, eu: 62, us: '52', uk: 52, it: 62, brust: 124, taille: 112 },
];

const DEFAULT_INDEX: Record<Typ, number> = { damen: 3, herren: 3 }; // DE 38 / DE 50

export default function KleidergroessenRechner() {
  const [typ, setTyp] = useState<Typ>('damen');
  const [system, setSystem] = useState<System>('de');
  const [index, setIndex] = useState<number>(DEFAULT_INDEX.damen);
  const [brustCm, setBrustCm] = useState<string>('');
  const [tailleCm, setTailleCm] = useState<string>('');
  const [huefteCm, setHuefteCm] = useState<string>('');

  const tabelle = typ === 'damen' ? DAMEN : HERREN;
  const match = tabelle[Math.min(index, tabelle.length - 1)];

  const massEmpfehlung = useMemo<Size | null>(() => {
    const brust = parseFloat(brustCm.replace(',', '.'));
    const taille = parseFloat(tailleCm.replace(',', '.'));
    const huefte = parseFloat(huefteCm.replace(',', '.'));
    const anyValid = !isNaN(brust) || !isNaN(taille) || !isNaN(huefte);
    if (!anyValid) return null;

    let best: Size | null = null;
    let bestScore = Infinity;
    for (const s of tabelle) {
      let score = 0;
      let count = 0;
      if (!isNaN(brust)) { score += Math.abs(s.brust - brust); count++; }
      if (!isNaN(taille)) { score += Math.abs(s.taille - taille); count++; }
      if (!isNaN(huefte) && typ === 'damen' && s.huefte !== undefined) {
        score += Math.abs(s.huefte - huefte);
        count++;
      }
      if (count === 0) continue;
      const avg = score / count;
      if (avg < bestScore) { bestScore = avg; best = s; }
    }
    return best;
  }, [brustCm, tailleCm, huefteCm, tabelle, typ]);

  const changeTyp = (t: Typ) => {
    setTyp(t);
    setIndex(DEFAULT_INDEX[t]);
  };

  const ergebnis = `${typ === 'damen' ? 'Damen' : 'Herren'} — DE ${match.de} | EU ${match.eu} | US ${match.us} | UK ${match.uk} | IT ${match.it}`;

  return (
    <div>
      {/* Typ */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Typ</label>
        <div className="grid grid-cols-2 gap-2">
          {(['damen', 'herren'] as Typ[]).map(t => (
            <button
              key={t}
              onClick={() => changeTyp(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                typ === t
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {t === 'damen' ? 'Damen' : 'Herren'}
            </button>
          ))}
        </div>
      </div>

      {/* System */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eingabe-System</label>
        <div className="grid grid-cols-5 gap-2">
          {(['de', 'eu', 'us', 'uk', 'it'] as System[]).map(s => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              className={`px-2 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                system === s
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Größe */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Größe ({system.toUpperCase()})
        </label>
        <select
          value={index}
          onChange={e => setIndex(parseInt(e.target.value, 10))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {tabelle.map((s, i) => (
            <option key={i} value={i}>
              {system.toUpperCase()} {system === 'us' ? s.us : s[system]}
            </option>
          ))}
        </select>
      </div>

      {/* Optional Körpermaße */}
      <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Optional: Körpermaße (cm)</p>
        <div className={`grid ${typ === 'damen' ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              {typ === 'damen' ? 'Oberweite' : 'Brust'}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={brustCm}
              onChange={e => setBrustCm(e.target.value)}
              placeholder={typ === 'damen' ? '88' : '100'}
              className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Taille</label>
            <input
              type="text"
              inputMode="decimal"
              value={tailleCm}
              onChange={e => setTailleCm(e.target.value)}
              placeholder={typ === 'damen' ? '72' : '88'}
              className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            />
          </div>
          {typ === 'damen' && (
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hüfte</label>
              <input
                type="text"
                inputMode="decimal"
                value={huefteCm}
                onChange={e => setHuefteCm(e.target.value)}
                placeholder="96"
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              />
            </div>
          )}
        </div>
        {massEmpfehlung && (
          <p className="mt-3 text-sm text-primary-600 dark:text-primary-400">
            Empfehlung nach Körpermaßen: <strong>DE {massEmpfehlung.de}</strong> (EU {massEmpfehlung.eu}, US {massEmpfehlung.us}, UK {massEmpfehlung.uk}, IT {massEmpfehlung.it})
          </p>
        )}
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <p className="text-white/90 text-sm mb-2">Ihre Kleidergröße ({typ === 'damen' ? 'Damen' : 'Herren'})</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-white">
          <div>
            <p className="text-xs opacity-80">DE</p>
            <p className="text-2xl font-bold">{match.de}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">EU</p>
            <p className="text-2xl font-bold">{match.eu}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">US</p>
            <p className="text-2xl font-bold">{match.us}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">UK</p>
            <p className="text-2xl font-bold">{match.uk}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">IT</p>
            <p className="text-2xl font-bold">{match.it}</p>
          </div>
        </div>
        <p className="mt-4 text-white/90 text-xs">
          💡 Zwischen zwei Größen? Nehmen Sie im Zweifel die größere.
        </p>
      </div>

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="Kleidergrößen-Umrechner" />
      <AiExplain
        rechnerName="Kleidergrößen-Umrechner"
        eingaben={{
          Typ: typ === 'damen' ? 'Damen' : 'Herren',
          Eingabe: `${system.toUpperCase()} ${system === 'us' ? match.us : match[system]}`,
          Oberweite: brustCm || '—',
          Taille: tailleCm || '—',
          Hüfte: typ === 'damen' ? (huefteCm || '—') : '—',
        }}
        ergebnis={{
          DE: match.de,
          EU: match.eu,
          US: match.us,
          UK: match.uk,
          IT: match.it,
          Empfehlung_nach_Maß: massEmpfehlung ? `DE ${massEmpfehlung.de}` : '—',
        }}
      />

      {/* Maßtabelle */}
      <div className="mt-6 overflow-x-auto">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maßtabelle {typ === 'damen' ? 'Damen' : 'Herren'}</p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-2 py-2 text-left">DE/EU</th>
              <th className="px-2 py-2 text-left">US</th>
              <th className="px-2 py-2 text-left">UK</th>
              <th className="px-2 py-2 text-left">IT</th>
              <th className="px-2 py-2 text-left">{typ === 'damen' ? 'Oberw.' : 'Brust'}</th>
              <th className="px-2 py-2 text-left">Taille</th>
              {typ === 'damen' && <th className="px-2 py-2 text-left">Hüfte</th>}
            </tr>
          </thead>
          <tbody>
            {tabelle.map((s, i) => (
              <tr
                key={i}
                className={`border-t border-gray-200 dark:border-gray-700 ${
                  i === index ? 'bg-primary-50 dark:bg-primary-900/20 font-semibold' : ''
                }`}
              >
                <td className="px-2 py-2">{s.de}</td>
                <td className="px-2 py-2">{s.us}</td>
                <td className="px-2 py-2">{s.uk}</td>
                <td className="px-2 py-2">{s.it}</td>
                <td className="px-2 py-2">{s.brust}</td>
                <td className="px-2 py-2">{s.taille}</td>
                {typ === 'damen' && <td className="px-2 py-2">{s.huefte}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CrossLink href="/alltag/schuhgroessen-rechner" emoji="👟" text="Schuhgrößen-Umrechner: EU, US, UK und cm" />
      <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Einheiten-Umrechner: Länge, Gewicht, Volumen" />
    </div>
  );
}
