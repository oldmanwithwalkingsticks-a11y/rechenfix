'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  kategorien,
  rechneUm,
  formatWert,
  type EinheitenKategorie,
} from '@/lib/berechnungen/einheiten';
import NummerEingabe from '@/components/ui/NummerEingabe';

const katTabs: { key: EinheitenKategorie; label: string }[] = [
  { key: 'laenge', label: 'Länge' },
  { key: 'gewicht', label: 'Gewicht' },
  { key: 'volumen', label: 'Volumen' },
  { key: 'flaeche', label: 'Fläche' },
  { key: 'temperatur', label: 'Temperatur' },
  { key: 'zeit', label: 'Zeit' },
  { key: 'geschwindigkeit', label: 'Geschwindigkeit' },
  { key: 'daten', label: 'Daten' },
];

function getDefaultVonZu(kat: EinheitenKategorie): [string, string] {
  switch (kat) {
    case 'laenge': return ['km', 'm'];
    case 'gewicht': return ['kg', 'lb'];
    case 'volumen': return ['l', 'ml'];
    case 'flaeche': return ['m2', 'ft2'];
    case 'temperatur': return ['c', 'f'];
    case 'zeit': return ['h', 'min'];
    case 'geschwindigkeit': return ['kmh', 'mph'];
    case 'daten': return ['gb', 'mb'];
  }
}

export default function EinheitenRechner() {
  const [kat, setKat] = useState<EinheitenKategorie>('laenge');
  const [wert, setWert] = useState('1');
  const [von, setVon] = useState('km');
  const [zu, setZu] = useState('m');

  const katDef = kategorien.find(k => k.key === kat)!;

  const wechsleKategorie = (k: EinheitenKategorie) => {
    setKat(k);
    const [dv, dz] = getDefaultVonZu(k);
    setVon(dv);
    setZu(dz);
    setWert('1');
  };

  const tausche = () => {
    setVon(zu);
    setZu(von);
  };

  const ergebnis = useMemo(() => {
    const w = parseDeutscheZahl(wert);
    if (isNaN(w)) return null;
    return rechneUm(kat, w, von, zu);
  }, [kat, wert, von, zu]);

  return (
    <div>
      {/* Kategorie-Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {katTabs.map(t => (
          <button
            key={t.key}
            onClick={() => wechsleKategorie(t.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              kat === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Eingabe */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 mb-6">
        {/* Wert + Von */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Wert</label>
          <NummerEingabe value={wert} onChange={setWert} placeholder="1" />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Von</label>
          <select
            value={von}
            onChange={e => setVon(e.target.value)}
            className="input-field w-full"
          >
            {katDef.einheiten.map(e => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <button
          onClick={tausche}
          className="self-center sm:self-end sm:mb-1.5 w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-500/30 transition-all shrink-0"
          title="Einheiten tauschen"
        >
          ↔
        </button>

        {/* Zu */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Zu</label>
          <select
            value={zu}
            onChange={e => setZu(e.target.value)}
            className="input-field w-full"
          >
            {katDef.einheiten.map(e => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Ergebnis</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary-700 dark:text-primary-300 break-words">
              {formatWert(ergebnis.wert)} {ergebnis.vonLabel} = {formatWert(ergebnis.ergebnis)} {ergebnis.zuLabel}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-mono">{ergebnis.formel}</p>
          </div>

          {/* Temperatur-Skala */}
          {kat === 'temperatur' && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Temperatur-Vergleich</p>
              <div className="space-y-2">
                {ergebnis.alleUmrechnungen.map(u => {
                  const label = u.label;
                  const w = u.wert;
                  // Skala: -50 bis 150 °C mapped
                  let pct: number;
                  if (u.key === 'c') pct = ((w + 50) / 200) * 100;
                  else if (u.key === 'f') pct = (((w - 32) * 5 / 9 + 50) / 200) * 100;
                  else pct = ((w - 273.15 + 50) / 200) * 100;
                  pct = Math.max(0, Math.min(100, pct));

                  return (
                    <div key={u.key}>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                        <span>{label}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{formatWert(w)} °{u.key.toUpperCase()}</span>
                      </div>
                      <div className="w-full h-3 bg-gradient-to-r from-blue-400 via-yellow-300 to-red-500 rounded-full relative">
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-800 dark:border-gray-200 rounded-full"
                          style={{ left: `calc(${pct}% - 6px)` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Alle Umrechnungen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Alle Umrechnungen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.alleUmrechnungen.map(u => (
                <div
                  key={u.key}
                  className={`flex justify-between px-4 py-2.5 text-sm ${
                    u.key === zu
                      ? 'bg-primary-50/50 dark:bg-primary-500/5 font-semibold'
                      : ''
                  }`}
                >
                  <span className="text-gray-600 dark:text-gray-400">{u.label}</span>
                  <span className={`font-medium ${
                    u.key === zu
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {formatWert(u.wert)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
