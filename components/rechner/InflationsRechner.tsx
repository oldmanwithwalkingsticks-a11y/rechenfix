'use client';

import { useState, useMemo } from 'react';
import { berechneInflation, type InflationsModus } from '@/lib/berechnungen/inflation';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const SCHNELLWAHL = ['1', '2', '3', '5', '8'];

export default function InflationsRechner() {
  const [modus, setModus] = useState<InflationsModus>('kaufkraft');
  const [betrag, setBetrag] = useState('1000');
  const [inflationsrate, setInflationsrate] = useState('2');
  const [zeitraum, setZeitraum] = useState('10');
  const [tabelleOffen, setTabelleOffen] = useState(false);

  const ergebnis = useMemo(
    () => berechneInflation({
      modus,
      betrag: parseDeutscheZahl(betrag),
      inflationsrate: parseDeutscheZahl(inflationsrate),
      zeitraum: parseDeutscheZahl(zeitraum),
    }),
    [modus, betrag, inflationsrate, zeitraum]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Modus-Auswahl */}
      <div className="mb-5">
        <RadioToggleGroup
          name="inflation-modus"
          legend="Was möchten Sie berechnen?"
          options={[
            { value: 'kaufkraft', label: '📉 Kaufkraftverlust' },
            { value: 'preisanstieg', label: '📈 Preisanstieg' },
          ]}
          value={modus}
          onChange={(v) => {
            setModus(v as InflationsModus);
            setBetrag(v === 'kaufkraft' ? '1000' : '100');
          }}
          fullWidth
        />
      </div>

      {/* Eingaben */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {modus === 'kaufkraft' ? 'Geldbetrag' : 'Aktueller Preis'}
        </label>
        <NummerEingabe value={betrag} onChange={setBetrag} placeholder={modus === 'kaufkraft' ? '1000' : '100'} einheit="€" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inflationsrate</label>
        <NummerEingabe value={inflationsrate} onChange={setInflationsrate} placeholder="2" einheit="%" />
        <div className="flex gap-1.5 mt-2">
          {SCHNELLWAHL.map(r => (
            <button
              key={r}
              onClick={() => setInflationsrate(r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                inflationsrate === r
                  ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-500/40'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {r} %
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zeitraum</label>
        <NummerEingabe value={zeitraum} onChange={setZeitraum} placeholder="10" einheit="Jahre" />
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            {modus === 'kaufkraft' ? (
              <>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                  Kaufkraft nach {ergebnis.jahre.length} Jahren
                </p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmt(ergebnis.ergebnis)} €
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Ihre {fmt(ergebnis.ausgangswert)} € haben in {ergebnis.jahre.length} Jahren nur noch eine Kaufkraft von {fmt(ergebnis.ergebnis)} €
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                  Preis in {ergebnis.jahre.length} Jahren
                </p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmt(ergebnis.ergebnis)} €
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Was heute {fmt(ergebnis.ausgangswert)} € kostet, kostet in {ergebnis.jahre.length} Jahren {fmt(ergebnis.ergebnis)} €
                </p>
              </>
            )}
          </div>

          {/* Detail-Kacheln */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {modus === 'kaufkraft' ? 'Kaufkraftverlust' : 'Preisanstieg'}
              </p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{fmt(ergebnis.differenz)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {modus === 'kaufkraft' ? 'Verlust' : 'Anstieg'} in %
              </p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{ergebnis.differenzProzent.toLocaleString('de-DE')} %</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Durchschn. pro Jahr</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.jaehrlicherVerlust)} €</p>
            </div>
          </div>

          {/* Visueller Balken */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {modus === 'kaufkraft' ? 'Kaufkraftentwicklung' : 'Preisentwicklung'}
            </p>
            {modus === 'kaufkraft' ? (
              <>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Heute</span>
                    <span>{fmt(ergebnis.ausgangswert)} €</span>
                  </div>
                  <div className="h-6 rounded-full bg-primary-500 w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>In {ergebnis.jahre.length} Jahren</span>
                    <span>{fmt(ergebnis.ergebnis)} €</span>
                  </div>
                  <div className="h-6 rounded-full bg-gray-100 dark:bg-gray-700 w-full">
                    <div
                      className="h-6 rounded-full bg-red-400 dark:bg-red-500 transition-all duration-500"
                      style={{ width: `${(ergebnis.ergebnis / ergebnis.ausgangswert) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Heute</span>
                    <span>{fmt(ergebnis.ausgangswert)} €</span>
                  </div>
                  <div
                    className="h-6 rounded-full bg-primary-500 transition-all duration-500"
                    style={{ width: `${(ergebnis.ausgangswert / ergebnis.ergebnis) * 100}%` }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>In {ergebnis.jahre.length} Jahren</span>
                    <span>{fmt(ergebnis.ergebnis)} €</span>
                  </div>
                  <div className="h-6 rounded-full bg-red-400 dark:bg-red-500 w-full" />
                </div>
              </>
            )}
          </div>

          <CrossLink href="/finanzen/sparrechner" emoji="🏦" text="Sparplan berechnen — Inflation mit Zinsen ausgleichen" />
          <CrossLink href="/finanzen/etf-sparplanrechner" emoji="📈" text="ETF-Sparplan: Rendite über Inflation" />

          <ErgebnisAktionen
            ergebnisText={modus === 'kaufkraft'
              ? `Kaufkraft nach ${ergebnis.jahre.length} Jahren: ${fmt(ergebnis.ergebnis)} € (Verlust: ${fmt(ergebnis.differenz)} €, ${ergebnis.differenzProzent.toLocaleString('de-DE')} %)`
              : `Preis in ${ergebnis.jahre.length} Jahren: ${fmt(ergebnis.ergebnis)} € (Anstieg: ${fmt(ergebnis.differenz)} €, ${ergebnis.differenzProzent.toLocaleString('de-DE')} %)`}
            seitenTitel="Inflationsrechner"
          />
          <AiExplain
            rechnerName="Inflationsrechner"
            eingaben={{
              modus,
              betrag: parseDeutscheZahl(betrag),
              inflationsrate: parseDeutscheZahl(inflationsrate),
              zeitraum: parseDeutscheZahl(zeitraum),
            }}
            ergebnis={{
              ergebnis: ergebnis.ergebnis,
              differenz: ergebnis.differenz,
              differenzProzent: ergebnis.differenzProzent,
              jaehrlicherVerlust: ergebnis.jaehrlicherVerlust,
            }}
          />

          {/* Historischer Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong>Historisch:</strong> Die durchschnittliche Inflation in Deutschland lag 2014–2024 bei ca. 2,8 % pro Jahr.
              In den Jahren 2022 und 2023 lag sie mit 6,9 % bzw. 5,9 % deutlich darüber.
            </p>
          </div>

          {/* Jahr-für-Jahr-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setTabelleOffen(!tabelleOffen)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Jahr-für-Jahr-Tabelle ({ergebnis.jahre.length} Jahre)
              </p>
              <svg className={`w-5 h-5 text-gray-600 transition-transform ${tabelleOffen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {tabelleOffen && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20">
                      <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Jahr</th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">
                        {modus === 'kaufkraft' ? 'Kaufkraft' : 'Preis'}
                      </th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">
                        {modus === 'kaufkraft' ? 'Verlust' : 'Anstieg'} kum.
                      </th>
                      <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">in %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {ergebnis.jahre.map(j => (
                      <tr key={j.jahr} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{j.jahr}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(j.wert)} €</td>
                        <td className="px-4 py-2.5 text-right text-red-600 dark:text-red-400">{fmt(j.verlustKumuliert)} €</td>
                        <td className="px-4 py-2.5 text-right text-red-600 dark:text-red-400">{j.verlustProzent.toLocaleString('de-DE')} %</td>
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
