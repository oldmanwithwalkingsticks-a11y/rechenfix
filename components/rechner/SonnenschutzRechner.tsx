'use client';

import { useState, useMemo } from 'react';
import { berechneSonnenschutz, HAUTTYPEN, UV_INDEXE } from '@/lib/berechnungen/sonnenschutz';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const LSF_WERTE = [
  { value: '15', label: 'LSF 15' },
  { value: '20', label: 'LSF 20' },
  { value: '30', label: 'LSF 30' },
  { value: '50', label: 'LSF 50' },
  { value: '50+', label: 'LSF 50+', numValue: 50 },
];

export default function SonnenschutzRechner() {
  const [hauttyp, setHauttyp] = useState('2');
  const [uvIndex, setUvIndex] = useState('6-7');
  const [lsf, setLsf] = useState('30');

  const ergebnis = useMemo(() => {
    const lsfNum = lsf === '50+' ? 50 : parseInt(lsf) || 30;
    return berechneSonnenschutz(hauttyp, uvIndex, lsfNum);
  }, [hauttyp, uvIndex, lsf]);

  const formatZeit = (minuten: number) => {
    if (minuten < 60) return `${minuten} Min.`;
    const h = Math.floor(minuten / 60);
    const m = minuten % 60;
    return m > 0 ? `${h} Std. ${m} Min.` : `${h} Std.`;
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="hauttyp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hauttyp</label>
          <select
            id="hauttyp"
            value={hauttyp}
            onChange={e => setHauttyp(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
          >
            {HAUTTYPEN.map(h => (
              <option key={h.id} value={h.id}>{h.name} — {h.beschreibung} ({h.eigenschutzMin}–{h.eigenschutzMax} Min.)</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="uv-index" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">UV-Index</label>
            <select
              id="uv-index"
              value={uvIndex}
              onChange={e => setUvIndex(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {UV_INDEXE.map(u => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">UV-Index finden Sie in jeder Wetter-App</p>
          </div>
          <div>
            <label htmlFor="lsf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LSF der Sonnencreme</label>
            <select
              id="lsf"
              value={lsf}
              onChange={e => setLsf(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {LSF_WERTE.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Eigenschutzzeit</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.eigenschutzzeit}</p>
                <p className="text-white/60 text-xs">Minuten</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Mit LSF {ergebnis.lsf}</p>
                <p className="text-2xl sm:text-3xl font-bold">{formatZeit(ergebnis.geschuetzteZeit)}</p>
                <p className="text-white/60 text-xs">geschützt</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Nachcremen</p>
                <p className="text-2xl sm:text-3xl font-bold">{formatZeit(ergebnis.nachcremenNach)}</p>
                <p className="text-white/60 text-xs">spätestens</p>
              </div>
            </div>
          </div>

          {/* Empfehlung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Empfehlung für 2 Stunden Sonne</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Bei {ergebnis.hauttyp.name} und UV-Index {ergebnis.uvIndex.id} empfehlen wir mindestens <strong>LSF {ergebnis.empfohlenerLsf}</strong>.
            </p>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Hauttyp</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.hauttyp.name} ({ergebnis.hauttyp.beschreibung})</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">UV-Index</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.uvIndex.label}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Eigenschutzzeit (ohne Creme)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">ca. {ergebnis.eigenschutzzeit} Min.</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">× LSF {ergebnis.lsf} × 60 % Sicherheit</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatZeit(ergebnis.geschuetzteZeit)}</span>
              </div>
            </div>
          </div>

          {/* UV-Index Skala */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">UV-Index Skala</p>
            <div className="flex rounded-lg overflow-hidden mb-2 h-4">
              <div className="bg-green-400 h-full" style={{ width: '20%' }} title="1–2 niedrig" />
              <div className="bg-yellow-400 h-full" style={{ width: '20%' }} title="3–5 mäßig" />
              <div className="bg-orange-400 h-full" style={{ width: '20%' }} title="6–7 hoch" />
              <div className="bg-red-400 h-full" style={{ width: '20%' }} title="8–10 sehr hoch" />
              <div className="bg-purple-500 h-full" style={{ width: '20%' }} title="11+ extrem" />
            </div>
            <div className="grid grid-cols-5 gap-1 text-xs text-center">
              <div><p className="font-medium text-gray-700 dark:text-gray-300">1–2</p><p className="text-gray-600 dark:text-gray-400">niedrig</p></div>
              <div><p className="font-medium text-gray-700 dark:text-gray-300">3–5</p><p className="text-gray-600 dark:text-gray-400">mäßig</p></div>
              <div><p className="font-medium text-gray-700 dark:text-gray-300">6–7</p><p className="text-gray-600 dark:text-gray-400">hoch</p></div>
              <div><p className="font-medium text-gray-700 dark:text-gray-300">8–10</p><p className="text-gray-600 dark:text-gray-400">sehr hoch</p></div>
              <div><p className="font-medium text-gray-700 dark:text-gray-300">11+</p><p className="text-gray-600 dark:text-gray-400">extrem</p></div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              ⚠️ <strong>Richtwerte, kein Ersatz für individuelle Beratung.</strong> Nachcremen verlängert die Schutzzeit nicht, sondern erhält sie. Wasser, Schweiß und Abrieb verringern den Schutz. Mittagssonne (11–15 Uhr) meiden.
            </p>
          </div>

          <CrossLink href="/gesundheit/wasserbedarf-rechner" emoji="💧" text="Bei Sonne mehr trinken — Wasserbedarf berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.hauttyp.name}, UV ${ergebnis.uvIndex.id}, LSF ${ergebnis.lsf}: Eigenschutz ${ergebnis.eigenschutzzeit} Min., geschützt ${formatZeit(ergebnis.geschuetzteZeit)}, Nachcremen nach ${formatZeit(ergebnis.nachcremenNach)}`}
            seitenTitel="Sonnenschutz-Rechner"
          />

          <AiExplain
            rechnerName="Sonnenschutz-Rechner"
            eingaben={{
              hauttyp: ergebnis.hauttyp.name,
              uvIndex: ergebnis.uvIndex.id,
              lsf: ergebnis.lsf,
            }}
            ergebnis={{
              eigenschutzzeit: ergebnis.eigenschutzzeit,
              geschuetzteZeit: ergebnis.geschuetzteZeit,
              nachcremenNach: ergebnis.nachcremenNach,
              empfohlenerLsf: ergebnis.empfohlenerLsf,
            }}
          />
        </>
      )}
    </div>
  );
}
