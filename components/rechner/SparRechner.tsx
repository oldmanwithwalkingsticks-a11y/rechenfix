'use client';

import { useState, useMemo } from 'react';
import { berechneSparplan, type Zinsintervall } from '@/lib/berechnungen/sparplan';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

export default function SparRechner() {
  const [anfangskapital, setAnfangskapital] = useState('0');
  const [sparrate, setSparrate] = useState('100');
  const [zinssatz, setZinssatz] = useState('5');
  const [sparzeit, setSparzeit] = useState('10');
  const [dynamik, setDynamik] = useState('0');
  const [zinsintervall, setZinsintervall] = useState<Zinsintervall>('jaehrlich');
  const [tabelleOffen, setTabelleOffen] = useState(false);

  const ergebnis = useMemo(
    () => berechneSparplan({
      anfangskapital: parseDeutscheZahl(anfangskapital),
      sparrate: parseDeutscheZahl(sparrate),
      zinssatz: parseDeutscheZahl(zinssatz),
      sparzeit: parseDeutscheZahl(sparzeit),
      dynamik: parseDeutscheZahl(dynamik),
      zinsintervall,
    }),
    [anfangskapital, sparrate, zinssatz, sparzeit, dynamik, zinsintervall]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anfangskapital</label>
          <NummerEingabe value={anfangskapital} onChange={setAnfangskapital} placeholder="0" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Sparrate</label>
          <NummerEingabe value={sparrate} onChange={setSparrate} placeholder="100" einheit="€" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zinssatz / Rendite p.a.</label>
          <NummerEingabe value={zinssatz} onChange={setZinssatz} placeholder="5" einheit="%" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sparzeit</label>
          <NummerEingabe value={sparzeit} onChange={setSparzeit} placeholder="10" einheit="Jahre" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dynamik (jährl. Erhöhung)
          </label>
          <NummerEingabe value={dynamik} onChange={setDynamik} placeholder="0" einheit="%" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sparrate jährlich erhöhen</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zinsintervall</label>
          <div className="flex gap-2">
            <button
              onClick={() => setZinsintervall('jaehrlich')}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                zinsintervall === 'jaehrlich'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Jährlich
            </button>
            <button
              onClick={() => setZinsintervall('monatlich')}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                zinsintervall === 'monatlich'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Monatlich
            </button>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Endkapital nach {ergebnis.jahre.length} Jahren</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.endkapital)} €
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Eigenkapital</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.eigenkapital)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Zinserträge</p>
              <p className="text-lg font-bold text-accent-600 dark:text-accent-400">{fmt(ergebnis.gesamtzinsen)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Zinsanteil</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{ergebnis.zinsenAnteil.toLocaleString('de-DE')} %</p>
            </div>
          </div>

          {/* Balken-Vergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Zusammensetzung des Endkapitals</p>
            <div className="h-8 rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-700">
              <div
                className="bg-primary-500 transition-all duration-500"
                style={{ width: `${ergebnis.endkapital > 0 ? (ergebnis.eigenkapital / ergebnis.endkapital * 100) : 0}%` }}
              />
              <div
                className="bg-accent-500 transition-all duration-500"
                style={{ width: `${ergebnis.zinsenAnteil}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full bg-primary-500 inline-block" />
                Eigenkapital ({(100 - ergebnis.zinsenAnteil).toLocaleString('de-DE')} %)
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full bg-accent-500 inline-block" />
                Zinsen ({ergebnis.zinsenAnteil.toLocaleString('de-DE')} %)
              </span>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Endkapital nach ${ergebnis.jahre.length} Jahren: ${fmt(ergebnis.endkapital)} € (Eigenkapital: ${fmt(ergebnis.eigenkapital)} €, Zinserträge: ${fmt(ergebnis.gesamtzinsen)} €)`}
            seitenTitel="Sparrechner"
          />
          <AiExplain
            rechnerName="Sparrechner"
            eingaben={{
              anfangskapital: parseDeutscheZahl(anfangskapital),
              sparrate: parseDeutscheZahl(sparrate),
              zinssatz: parseDeutscheZahl(zinssatz),
              sparzeit: parseDeutscheZahl(sparzeit),
              dynamik: parseDeutscheZahl(dynamik),
              zinsintervall,
            }}
            ergebnis={{
              endkapital: ergebnis.endkapital,
              eigenkapital: ergebnis.eigenkapital,
              gesamtzinsen: ergebnis.gesamtzinsen,
              zinsenAnteil: ergebnis.zinsenAnteil,
            }}
          />

          {/* Balkendiagramm pro Jahr */}
          {ergebnis.jahre.length <= 50 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Kapitalentwicklung pro Jahr</p>
              <div className="space-y-1.5">
                {ergebnis.jahre.map(j => {
                  const maxKapital = ergebnis.endkapital;
                  const eigenAnteil = maxKapital > 0 ? (j.einzahlungGesamt / maxKapital * 100) : 0;
                  const zinsenAnteil = maxKapital > 0 ? (j.zinsenGesamt / maxKapital * 100) : 0;
                  return (
                    <div key={j.jahr} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right shrink-0">{j.jahr}</span>
                      <div className="flex-1 h-5 rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-700">
                        <div className="bg-primary-400 dark:bg-primary-500" style={{ width: `${eigenAnteil}%` }} />
                        <div className="bg-accent-400 dark:bg-accent-500" style={{ width: `${zinsenAnteil}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-20 text-right shrink-0">
                        {fmt(j.kapital)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Jahr-für-Jahr-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setTabelleOffen(!tabelleOffen)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Jahr-für-Jahr-Tabelle ({ergebnis.jahre.length} Jahre)
              </p>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${tabelleOffen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {tabelleOffen && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20">
                      <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Jahr</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Sparrate</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Einzahlung</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Zinsen</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Kapital</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {ergebnis.jahre.map(j => (
                      <tr key={j.jahr} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{j.jahr}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(j.sparrate)} €</td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(j.einzahlungGesamt)} €</td>
                        <td className="px-4 py-2.5 text-right font-medium text-accent-600 dark:text-accent-400">{fmt(j.zinsenGesamt)} €</td>
                        <td className="px-4 py-2.5 text-right font-bold text-gray-800 dark:text-gray-100">{fmt(j.kapital)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
