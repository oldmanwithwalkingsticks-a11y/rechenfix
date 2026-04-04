'use client';

import { useState, useMemo } from 'react';
import { berechneGrunderwerbsteuer, BUNDESLAENDER } from '@/lib/berechnungen/grunderwerbsteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

export default function GrunderwerbsteuerRechner() {
  const [kaufpreis, setKaufpreis] = useState('300000');
  const [bundesland, setBundesland] = useState('nw');
  const [makler, setMakler] = useState('3,57');
  const [notar, setNotar] = useState('1,5');
  const [grundbuch, setGrundbuch] = useState('0,5');

  const ergebnis = useMemo(
    () => berechneGrunderwerbsteuer({
      kaufpreis: parseDeutscheZahl(kaufpreis),
      bundesland,
      maklerProvision: parseDeutscheZahl(makler),
      notarkosten: parseDeutscheZahl(notar),
      grundbuch: parseDeutscheZahl(grundbuch),
    }),
    [kaufpreis, bundesland, makler, notar, grundbuch]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufpreis der Immobilie</label>
        <NummerEingabe value={kaufpreis} onChange={setKaufpreis} placeholder="300000" einheit="€" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
        <select
          value={bundesland}
          onChange={e => setBundesland(e.target.value)}
          className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-200"
        >
          {BUNDESLAENDER.map(bl => (
            <option key={bl.key} value={bl.key}>{bl.name} ({bl.satz} %)</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Makler inkl. MwSt</label>
          <NummerEingabe value={makler} onChange={setMakler} placeholder="3,57" einheit="%" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Notarkosten</label>
          <NummerEingabe value={notar} onChange={setNotar} placeholder="1,5" einheit="%" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Grundbuch</label>
          <NummerEingabe value={grundbuch} onChange={setGrundbuch} placeholder="0,5" einheit="%" />
        </div>
      </div>

      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Gesamtkosten inkl. Nebenkosten</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(ergebnis.gesamtkosten)} €</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              davon {fmt(ergebnis.nebenkostenGesamt)} € Nebenkosten ({ergebnis.nebenkostenProzent.toLocaleString('de-DE')} %)
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Kaufnebenkosten</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaufpreis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(kaufpreis))} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grunderwerbsteuer ({ergebnis.steuersatz} %, {ergebnis.bundeslandName})</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.grunderwerbsteuer)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Makler ({parseDeutscheZahl(makler).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.makler)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Notarkosten ({parseDeutscheZahl(notar).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.notar)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundbuchgebühren ({parseDeutscheZahl(grundbuch).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.grundbuch)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtkosten</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtkosten)} €</span>
              </div>
            </div>
          </div>

          {/* Steuersätze */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Grunderwerbsteuersätze nach Bundesland</p>
            </div>
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {BUNDESLAENDER.map(bl => (
                    <tr key={bl.key} className={bundesland === bl.key ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''}>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{bl.name}</td>
                      <td className="px-4 py-2 text-right font-medium text-gray-800 dark:text-gray-200">{bl.satz} %</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
