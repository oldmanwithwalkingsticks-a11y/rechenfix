'use client';

import { useState, useMemo } from 'react';
import { berechneSchlaf, getEmpfohleneSchlafdauer } from '@/lib/berechnungen/schlaf';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import SchlafTipp from '@/components/rechner/SchlafTipp';
import CrossLink from '@/components/ui/CrossLink';

const SCHNELLWAHL_ZEITEN = ['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30'];

const BEWERTUNG_FARBEN: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  wenig: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Zu wenig', icon: '😫' },
  ausreichend: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Ausreichend', icon: '😐' },
  optimal: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Optimal', icon: '😴' },
  viel: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Viel', icon: '😇' },
};

const ALTERS_TABELLE = [
  { alter: '1–3 Jahre', min: 10, max: 13 },
  { alter: '3–5 Jahre', min: 10, max: 13 },
  { alter: '6–13 Jahre', min: 9, max: 11 },
  { alter: '14–17 Jahre', min: 8, max: 10 },
  { alter: '18–25 Jahre', min: 7, max: 9 },
  { alter: '26–64 Jahre', min: 7, max: 9 },
  { alter: '65+ Jahre', min: 7, max: 8 },
];

export default function SchlafRechner() {
  const [aufwachzeit, setAufwachzeit] = useState('06:00');
  const [alter, setAlter] = useState('30');
  const [einschlafzeit, setEinschlafzeit] = useState('15');

  const alterNum = Math.max(0, parseInt(alter) || 0);
  const einschlafNum = Math.max(0, parseInt(einschlafzeit) || 15);

  const ergebnis = useMemo(() => {
    if (!aufwachzeit) return null;
    return berechneSchlaf({ aufwachzeit, alter: alterNum, einschlafzeit: einschlafNum });
  }, [aufwachzeit, alterNum, einschlafNum]);

  const empfohlen = useMemo(() => getEmpfohleneSchlafdauer(alterNum), [alterNum]);

  return (
    <div>
      {/* Schnellwahl Aufwachzeit */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aufwachzeit (Schnellwahl)</label>
        <div className="flex flex-wrap gap-2">
          {SCHNELLWAHL_ZEITEN.map(z => (
            <button
              key={z}
              onClick={() => setAufwachzeit(z)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                aufwachzeit === z
                  ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-300 dark:ring-indigo-500/40'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Eingabefelder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewünschte Aufwachzeit</label>
          <input
            type="time"
            value={aufwachzeit}
            onChange={e => setAufwachzeit(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter</label>
          <div className="relative">
            <input
              type="number"
              value={alter}
              onChange={e => setAlter(e.target.value)}
              min={1}
              max={120}
              className="input-field pr-14"
              placeholder="30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">Jahre</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einschlafzeit</label>
          <div className="relative">
            <input
              type="number"
              value={einschlafzeit}
              onChange={e => setEinschlafzeit(e.target.value)}
              min={0}
              max={60}
              className="input-field pr-14"
              placeholder="15"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">Min.</span>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-5">
          {/* Hauptergebnis: Empfohlene Schlafenszeiten */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌙</span>
              <p className="text-white/80 text-sm font-medium">Ideale Schlafenszeiten für {aufwachzeit} Uhr aufstehen</p>
            </div>
            <p className="text-white/60 text-xs mb-4">inkl. {einschlafNum} Min. Einschlafzeit</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ergebnis.schlafzeiten.map(sz => {
                const style = BEWERTUNG_FARBEN[sz.bewertung];
                const isIdeal = sz.zyklen === ergebnis.idealZyklen;
                return (
                  <div
                    key={sz.zyklen}
                    className={`relative rounded-xl p-3 text-center transition-all ${
                      isIdeal
                        ? 'bg-white/20 ring-2 ring-white/60 shadow-lg'
                        : 'bg-white/10'
                    }`}
                  >
                    {isIdeal && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-400 text-green-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Empfohlen
                      </span>
                    )}
                    <p className="text-2xl sm:text-3xl font-extrabold mt-1">{sz.uhrzeit}</p>
                    <p className="text-white/70 text-xs mt-1">{sz.schlafstunden} Std. · {sz.zyklen} Zyklen</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.bg} ${style.text}`}>
                      {style.icon} {style.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schlafzyklen-Erklärung */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700/30 rounded-xl p-5">
            <h2 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm mb-2 flex items-center gap-2">
              <span>🔄</span> Was sind Schlafzyklen?
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Ein Schlafzyklus dauert ca. <strong>90 Minuten</strong> und besteht aus Leichtschlaf, Tiefschlaf und REM-Schlaf (Traumphase).
              Zwischen zwei Zyklen werden Sie kurz fast wach — der ideale Aufwachzeitpunkt. Mitten im Tiefschlaf geweckt zu werden, fühlt sich dagegen besonders müde an.
              Deshalb ist es besser, nach <strong>4,5 oder 6 Stunden</strong> aufzuwachen als nach 5 oder 7 Stunden.
            </p>
          </div>

          {/* Empfehlung nach Alter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 text-sm mb-3 flex items-center gap-2">
                <span>👤</span> Ihre Empfehlung ({empfohlen.label})
              </h2>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {empfohlen.min}–{empfohlen.max} Stunden
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">empfohlene Schlafdauer pro Nacht</p>
              </div>
              <div className="mt-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>4 Std.</span>
                  <span>8 Std.</span>
                  <span>12 Std.</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
                  {/* Empfohlener Bereich */}
                  <div
                    className="absolute h-full bg-green-400 dark:bg-green-500 rounded-full"
                    style={{
                      left: `${((empfohlen.min - 4) / 8) * 100}%`,
                      width: `${((empfohlen.max - empfohlen.min) / 8) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-600 mt-1 text-center">Grüner Bereich = empfohlen</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 text-sm mb-3 flex items-center gap-2">
                <span>🌍</span> Wussten Sie schon?
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-lg leading-tight">🛏️</span>
                  <span>Sie verbringen ca. <strong className="text-gray-800 dark:text-gray-200">{ergebnis.jahreImSchlaf} Jahre</strong> Ihres Lebens im Schlaf</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg leading-tight">⏰</span>
                  <span>Der ideale Schlafzyklus besteht aus <strong className="text-gray-800 dark:text-gray-200">5 Phasen</strong> à 90 Minuten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg leading-tight">🧠</span>
                  <span>Im REM-Schlaf verarbeitet Ihr Gehirn <strong className="text-gray-800 dark:text-gray-200">Gelerntes</strong> und sortiert Erinnerungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg leading-tight">💪</span>
                  <span>Tiefschlaf ist entscheidend für <strong className="text-gray-800 dark:text-gray-200">Muskelregeneration</strong> und Immunsystem</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Schlafempfehlung nach Alter — Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Empfohlene Schlafdauer nach Alter (WHO)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-2 text-left font-medium">Alter</th>
                    <th className="px-4 py-2 text-right font-medium">Empfohlen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ALTERS_TABELLE.map(row => {
                    const isAktiv = empfohlen.min === row.min && empfohlen.max === row.max;
                    return (
                      <tr key={row.alter} className={isAktiv ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}>
                        <td className={`px-4 py-2.5 ${isAktiv ? 'font-semibold text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>
                          {isAktiv && '→ '}{row.alter}
                        </td>
                        <td className={`px-4 py-2.5 text-right font-medium ${isAktiv ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>
                          {row.min}–{row.max} Stunden
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf und Schlaf — Zusammenhang" />

          <ErgebnisAktionen
            ergebnisText={`Aufwachzeit ${aufwachzeit} Uhr: Ideale Schlafenszeiten: ${ergebnis.schlafzeiten.map(s => `${s.uhrzeit} (${s.schlafstunden} Std.)`).join(', ')}. Empfohlen für ${empfohlen.label}: ${empfohlen.min}–${empfohlen.max} Stunden.`}
            seitenTitel="Schlafrechner"
          />

          <div className="flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Schlaf-Rechner"
              eingaben={{
                aufwachzeit,
                alter: alterNum,
                einschlafzeitMin: einschlafNum,
              }}
              ergebnis={{
                empfohleneSchlafstunden: `${empfohlen.min}–${empfohlen.max}`,
                altersgruppe: empfohlen.label,
                idealZyklen: ergebnis.idealZyklen,
                idealeSchlafenszeit: ergebnis.schlafzeiten.find(s => s.zyklen === ergebnis.idealZyklen)?.uhrzeit,
                jahreImSchlaf: ergebnis.jahreImSchlaf,
              }}
            />
            <SchlafTipp
              eingaben={{
                aufwachzeit,
                alter: alterNum,
                einschlafzeitMin: einschlafNum,
              }}
              ergebnis={{
                empfohleneSchlafstunden: `${empfohlen.min}–${empfohlen.max}`,
                altersgruppe: empfohlen.label,
                idealZyklen: ergebnis.idealZyklen,
                idealeSchlafenszeit: ergebnis.schlafzeiten.find(s => s.zyklen === ergebnis.idealZyklen)?.uhrzeit,
                schlafzeiten: ergebnis.schlafzeiten.map(s => ({ uhrzeit: s.uhrzeit, stunden: s.schlafstunden, bewertung: s.bewertung })),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
