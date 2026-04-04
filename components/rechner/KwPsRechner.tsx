'use client';

import { useState, useMemo } from 'react';
import { berechneKwPs, KW_ZU_PS, PS_ZU_KW } from '@/lib/berechnungen/kw-ps';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';

export default function KwPsRechner() {
  const [wert, setWert] = useState('100');
  const [richtung, setRichtung] = useState<'kw-zu-ps' | 'ps-zu-kw'>('kw-zu-ps');

  const nWert = parseDeutscheZahl(wert);

  const ergebnis = useMemo(
    () => berechneKwPs({ wert: nWert, richtung }),
    [nWert, richtung]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Richtung Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setRichtung('kw-zu-ps')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            richtung === 'kw-zu-ps'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          kW → PS
        </button>
        <button
          onClick={() => setRichtung('ps-zu-kw')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            richtung === 'ps-zu-kw'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          PS → kW
        </button>
      </div>

      {/* Eingabe */}
      <div className="max-w-sm mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {richtung === 'kw-zu-ps' ? 'Leistung in kW' : 'Leistung in PS'}
        </label>
        <NummerEingabe
          value={wert}
          onChange={setWert}
          placeholder={richtung === 'kw-zu-ps' ? 'z.B. 100' : 'z.B. 136'}
          einheit={richtung === 'kw-zu-ps' ? 'kW' : 'PS'}
        />
      </div>

      {/* Ergebnis */}
      {ergebnis && nWert > 0 && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  {fmt(ergebnis.eingabeWert)} {ergebnis.eingabeEinheit} entsprechen
                </p>
                <p className="text-5xl font-bold">{fmt(ergebnis.ergebnisWert)} {ergebnis.ergebnisEinheit}</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  Faktor: {richtung === 'kw-zu-ps' ? KW_ZU_PS : PS_ZU_KW}
                </span>
              </div>
            </div>
          </div>

          {/* Formel-Anzeige */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {richtung === 'kw-zu-ps'
                ? `${fmt(nWert)} kW × ${KW_ZU_PS} = ${fmt(ergebnis.ergebnisWert)} PS`
                : `${fmt(nWert)} PS × ${PS_ZU_KW} = ${fmt(ergebnis.ergebnisWert)} kW`}
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`${fmt(ergebnis.eingabeWert)} ${ergebnis.eingabeEinheit} = ${fmt(ergebnis.ergebnisWert)} ${ergebnis.ergebnisEinheit}`}
            seitenTitel="kW-PS-Rechner"
          />
        </>
      )}

      {/* Umrechnungstabelle */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Umrechnungstabelle kW ↔ PS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">kW</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">PS</th>
                <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Typisches Fahrzeug</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kw: 50, ps: 68, fahrzeug: 'Kleinwagen (z. B. VW Up)' },
                { kw: 75, ps: 102, fahrzeug: 'Kompaktwagen (z. B. Opel Corsa)' },
                { kw: 100, ps: 136, fahrzeug: 'Mittelklasse (z. B. VW Golf)' },
                { kw: 110, ps: 150, fahrzeug: 'Kombi (z. B. Skoda Octavia)' },
                { kw: 125, ps: 170, fahrzeug: 'Obere Mittelklasse (z. B. BMW 320i)' },
                { kw: 150, ps: 204, fahrzeug: 'Sportlimousine (z. B. Audi A4)' },
                { kw: 175, ps: 238, fahrzeug: 'SUV (z. B. BMW X3)' },
                { kw: 200, ps: 272, fahrzeug: 'Oberklasse (z. B. Mercedes E-Klasse)' },
                { kw: 250, ps: 340, fahrzeug: 'Sportwagen (z. B. BMW M3)' },
                { kw: 300, ps: 408, fahrzeug: 'Hochleistung (z. B. Porsche 911)' },
              ].map((row, i) => {
                const istAktuell = richtung === 'kw-zu-ps'
                  ? Math.abs(row.kw - nWert) < 1
                  : Math.abs(row.ps - nWert) < 1;
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 dark:border-gray-600/50 ${
                      istAktuell ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{row.kw} kW</td>
                    <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{row.ps} PS</td>
                    <td className="py-2.5 text-gray-600 dark:text-gray-400">{row.fahrzeug}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
