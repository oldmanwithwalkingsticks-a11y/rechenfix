'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  berechnePromille,
  SCHNELLWAHL,
  type Getraenk,
} from '@/lib/berechnungen/promille';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';

const fmtZahl = (n: number, s = 2) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: s, maximumFractionDigits: s });

let nextId = 1;

const zoneStyles = {
  gruen: {
    bg: 'bg-green-50 dark:bg-green-500/10',
    border: 'border-green-200 dark:border-green-500/30',
    text: 'text-green-700 dark:text-green-300',
    textSm: 'text-green-800 dark:text-green-300',
    bar: 'bg-green-500',
  },
  gelb: {
    bg: 'bg-yellow-50 dark:bg-yellow-500/10',
    border: 'border-yellow-200 dark:border-yellow-500/30',
    text: 'text-yellow-700 dark:text-yellow-300',
    textSm: 'text-yellow-800 dark:text-yellow-300',
    bar: 'bg-yellow-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    border: 'border-orange-200 dark:border-orange-500/30',
    text: 'text-orange-700 dark:text-orange-300',
    textSm: 'text-orange-800 dark:text-orange-300',
    bar: 'bg-orange-500',
  },
  rot: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    text: 'text-red-700 dark:text-red-300',
    textSm: 'text-red-800 dark:text-red-300',
    bar: 'bg-red-500',
  },
};

const zoneIcons = { gruen: '✅', gelb: '⚠️', orange: '🚫', rot: '🛑' };

export default function PromilleRechner() {
  const [geschlecht, setGeschlecht] = useState<'mann' | 'frau'>('mann');
  const [gewicht, setGewicht] = useState('80');
  const [getraenke, setGetraenke] = useState<Getraenk[]>([]);
  const [trinkzeit, setTrinkzeit] = useState('2');

  const fuegeHinzu = useCallback((name: string, mengeL: number, alkoholProzent: number) => {
    setGetraenke(prev => [...prev, { id: nextId++, name, mengeL, alkoholProzent }]);
  }, []);

  const entferne = useCallback((id: number) => {
    setGetraenke(prev => prev.filter(g => g.id !== id));
  }, []);

  const updateGetraenk = useCallback((id: number, updates: Partial<Getraenk>) => {
    setGetraenke(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const ergebnis = useMemo(() => berechnePromille({
    geschlecht,
    gewichtKg: parseFloat(gewicht.replace(',', '.')) || 0,
    getraenke,
    trinkzeitStunden: parseFloat(trinkzeit.replace(',', '.')) || 0,
  }), [geschlecht, gewicht, getraenke, trinkzeit]);

  const restH = ergebnis ? Math.floor(ergebnis.restStunden) : 0;
  const restM = ergebnis ? Math.round((ergebnis.restStunden - restH) * 60) : 0;

  return (
    <div>
      {/* Geschlecht */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Geschlecht</label>
        <div className="flex gap-2">
          {([
            { key: 'mann' as const, label: '♂ Männlich' },
            { key: 'frau' as const, label: '♀ Weiblich' },
          ]).map(t => (
            <button
              key={t.key}
              onClick={() => setGeschlecht(t.key)}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                geschlecht === t.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gewicht & Trinkzeit */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Körpergewicht</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="30"
              max="250"
              value={gewicht}
              onChange={e => setGewicht(e.target.value)}
              className="input-field w-full pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">kg</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Trinkbeginn vor</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="48"
              step="0.5"
              value={trinkzeit}
              onChange={e => setTrinkzeit(e.target.value)}
              className="input-field w-full pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">Std.</span>
          </div>
        </div>
      </div>

      {/* Schnellwahl */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Getränk hinzufügen</label>
        <div className="flex flex-wrap gap-2">
          {SCHNELLWAHL.map(s => (
            <button
              key={s.name}
              onClick={() => fuegeHinzu(s.name, s.mengeL, s.alkoholProzent)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Getränke-Liste */}
      {getraenke.length > 0 && (
        <div className="space-y-2 mb-4">
          {getraenke.map(g => (
            <div key={g.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20 shrink-0">{g.name}</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  max="5"
                  step="0.01"
                  value={g.mengeL}
                  onChange={e => updateGetraenk(g.id, { mengeL: parseFloat(e.target.value) || 0 })}
                  className="input-field w-full pr-6 text-xs py-1.5"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">L</span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={g.alkoholProzent}
                  onChange={e => updateGetraenk(g.id, { alkoholProzent: parseFloat(e.target.value) || 0 })}
                  className="input-field w-full pr-6 text-xs py-1.5"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">%</span>
              </div>
              <button
                onClick={() => entferne(g.id)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300 text-lg shrink-0 w-6 text-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Manuell hinzufügen */}
      <button
        onClick={() => fuegeHinzu('Getränk', 0.33, 5)}
        className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 font-medium mb-6"
      >
        + Eigenes Getränk hinzufügen
      </button>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4 mt-6">
          {/* Promille-Wert */}
          <div className={`rounded-2xl p-6 text-center ${zoneStyles[ergebnis.zone].bg} border ${zoneStyles[ergebnis.zone].border}`}>
            <p className={`text-sm font-medium mb-1 ${zoneStyles[ergebnis.zone].text}`}>
              Geschätzter Promillewert
            </p>
            <p className={`text-5xl font-extrabold ${zoneStyles[ergebnis.zone].text}`}>
              {fmtZahl(ergebnis.aktuellPromille)} ‰
            </p>
            {ergebnis.aktuellPromille < ergebnis.maxPromille && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Maximum: {fmtZahl(ergebnis.maxPromille)} ‰ — bereits {fmtZahl(ergebnis.abgebaut)} ‰ abgebaut
              </p>
            )}
          </div>

          {/* Promille-Balken */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex h-5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
              <div className="bg-green-400 flex-none" style={{ width: '20%' }} />
              <div className="bg-yellow-400 flex-none" style={{ width: '13%' }} />
              <div className="bg-orange-400 flex-none" style={{ width: '40%' }} />
              <div className="bg-red-400 flex-1" />
              {/* Marker */}
              <div
                className="absolute h-5 w-0.5 bg-gray-900 dark:bg-white"
                style={{
                  marginLeft: `${Math.min(ergebnis.aktuellPromille / 1.5 * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
              <span>0,0‰</span>
              <span>0,3‰</span>
              <span>0,5‰</span>
              <span>1,1‰</span>
              <span>1,5‰+</span>
            </div>
          </div>

          {/* Hinweis */}
          <div className={`${zoneStyles[ergebnis.zone].bg} border ${zoneStyles[ergebnis.zone].border} rounded-xl p-4`}>
            <p className={`text-sm flex gap-2 ${zoneStyles[ergebnis.zone].textSm}`}>
              <span className="shrink-0">{zoneIcons[ergebnis.zone]}</span>
              <span>{ergebnis.hinweis}</span>
            </p>
          </div>

          {/* Countdown */}
          {ergebnis.aktuellPromille > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Geschätzt nüchtern um</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.nuechternUhrzeit}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Noch ca. {restH > 0 ? `${restH} Std. ` : ''}{restM} Min.
              </p>
            </div>
          )}

          {/* Statistiken */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alkohol gesamt</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Getränke</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {getraenke.length}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Abbau/Std.</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                0,15 ‰
              </p>
            </div>
          </div>

          {/* Getränke-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Getränk</th>
                    <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Menge</th>
                    <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Alkohol (g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ergebnis.getraenkeDetail.map((g, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{g.name}</td>
                      <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">{g.menge}</td>
                      <td className="px-4 py-2 text-right font-medium text-gray-800 dark:text-gray-200">{fmtZahl(g.alkoholGramm, 1)}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50/50 dark:bg-primary-500/5 font-bold">
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">Gesamt</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-right text-primary-600 dark:text-primary-400">{fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Promille: ${fmtZahl(ergebnis.aktuellPromille)} \u2030 - ${fmtZahl(ergebnis.gesamtAlkoholGramm, 1)} g Alkohol - Nüchtern um: ${ergebnis.nuechternUhrzeit}`}
            seitenTitel="Promillerechner"
          />
        </div>
      )}

      {getraenke.length === 0 && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-2">🍺</p>
          <p className="text-sm">Fügen Sie Getränke hinzu, um den Promillewert zu berechnen.</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-300 dark:border-red-500/40 rounded-xl p-4 mt-6">
        <p className="text-sm text-red-800 dark:text-red-300 font-medium flex gap-2">
          <span className="shrink-0 text-lg">⚠️</span>
          <span>
            Dieser Rechner liefert nur eine grobe Schätzung nach der Widmark-Formel. Der tatsächliche Blutalkohol kann erheblich abweichen und hängt von vielen individuellen Faktoren ab (Nahrungsaufnahme, Medikamente, Gesundheitszustand etc.). <strong>Im Zweifelsfall: NICHT fahren!</strong> Dieser Rechner ersetzt keinen Alkoholtest und ist keine Grundlage für die Entscheidung, ob Sie ein Fahrzeug führen dürfen.
          </span>
        </p>
      </div>
    </div>
  );
}
