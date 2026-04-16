'use client';

import { useState, useMemo } from 'react';
import { berechneZinsen } from '@/lib/berechnungen/zinsen';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function ZinsRechner() {
  const [anfangskapital, setAnfangskapital] = useState('10000');
  const [zinssatz, setZinssatz] = useState('3,5');
  const [laufzeit, setLaufzeit] = useState('10');
  const [zinseszins, setZinseszins] = useState(true);
  const [sparrate, setSparrate] = useState('0');
  const [tabelleOffen, setTabelleOffen] = useState(false);

  const nAnfang = parseDeutscheZahl(anfangskapital);
  const nZins = parseDeutscheZahl(zinssatz);
  const nLaufzeit = parseDeutscheZahl(laufzeit);
  const nSparrate = parseDeutscheZahl(sparrate);

  const ergebnis = useMemo(
    () => berechneZinsen({
      anfangskapital: nAnfang,
      zinssatz: nZins,
      laufzeit: nLaufzeit,
      zinseszins,
      sparrate: nSparrate,
    }),
    [nAnfang, nZins, nLaufzeit, zinseszins, nSparrate]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Anteil Eigenkapital vs. Zinsen für Balken
  const eigenkapitalAnteil = ergebnis && ergebnis.endkapital > 0
    ? (ergebnis.eigenkapital / ergebnis.endkapital) * 100
    : 0;

  return (
    <div>
      {/* Zinseszins Toggle */}
      <div className="mb-6">
        <RadioToggleGroup
          name="zins-zinseszins"
          legend="Zinseszins"
          srOnlyLegend
          options={[
            { value: 'mit', label: 'Mit Zinseszins' },
            { value: 'ohne', label: 'Ohne Zinseszins' },
          ]}
          value={zinseszins ? 'mit' : 'ohne'}
          onChange={(v) => setZinseszins(v === 'mit')}
        />
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anfangskapital</label>
          <NummerEingabe
            value={anfangskapital}
            onChange={setAnfangskapital}
            placeholder="z.B. 10000"
            einheit="€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zinssatz (p.a.)</label>
          <NummerEingabe
            value={zinssatz}
            onChange={setZinssatz}
            placeholder="z.B. 3,5"
            einheit="%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Laufzeit</label>
          <NummerEingabe
            value={laufzeit}
            onChange={setLaufzeit}
            placeholder="z.B. 10"
            einheit="Jahre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Sparrate (optional)</label>
          <NummerEingabe
            value={sparrate}
            onChange={setSparrate}
            placeholder="z.B. 100"
            einheit="€"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  Endkapital nach {Math.floor(nLaufzeit)} {Math.floor(nLaufzeit) === 1 ? 'Jahr' : 'Jahren'}
                </p>
                <p className="text-5xl font-bold">{fmt(ergebnis.endkapital)} €</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {zinseszins ? 'Mit Zinseszins' : 'Einfache Verzinsung'}
                </span>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Eigenkapital</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.eigenkapital)} €</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesamtzinsen</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.gesamtzinsen)} €</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Endkapital</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{fmt(ergebnis.endkapital)} €</p>
              </div>
            </div>

            {/* Balkendiagramm */}
            <div className="mb-2">
              <div className="flex h-6 rounded-full overflow-hidden">
                <div
                  className="bg-primary-400 dark:bg-primary-500 transition-all duration-500"
                  style={{ width: `${eigenkapitalAnteil}%` }}
                />
                <div
                  className="bg-green-400 dark:bg-green-500 transition-all duration-500"
                  style={{ width: `${100 - eigenkapitalAnteil}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-400 dark:bg-primary-500 inline-block" />
                  Eigenkapital ({eigenkapitalAnteil.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500 inline-block" />
                  Zinsen ({(100 - eigenkapitalAnteil).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Jahr-für-Jahr-Tabelle */}
          {ergebnis.jahre.length > 0 && ergebnis.jahre.length <= 50 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
              <button
                onClick={() => setTabelleOffen(!tabelleOffen)}
                className="flex justify-between items-center w-full font-bold text-gray-700 dark:text-gray-200 mb-1"
              >
                <span>Entwicklung pro Jahr</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${tabelleOffen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {tabelleOffen && (
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                        <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300">Jahr</th>
                        <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Kapital (Anfang)</th>
                        {nSparrate > 0 && (
                          <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Einzahlungen</th>
                        )}
                        <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Zinsen</th>
                        <th className="py-2 font-semibold text-gray-700 dark:text-gray-300 text-right">Kapital (Ende)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ergebnis.jahre.map((j) => (
                        <tr key={j.jahr} className="border-b border-gray-100 dark:border-gray-600/50">
                          <td className="py-2 pr-3 text-gray-800 dark:text-gray-200">{j.jahr}</td>
                          <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 text-right">{fmt(j.kapitalAnfang)} €</td>
                          {nSparrate > 0 && (
                            <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 text-right">{fmt(j.einzahlungen)} €</td>
                          )}
                          <td className="py-2 pr-3 text-green-600 dark:text-green-400 text-right">+{fmt(j.zinsen)} €</td>
                          <td className="py-2 text-gray-800 dark:text-gray-200 font-medium text-right">{fmt(j.kapitalEnde)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Zinseszins-Vergleich */}
          {zinseszins && nAnfang > 0 && nZins > 0 && nLaufzeit >= 2 && (
            <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-primary-700 dark:text-primary-400 text-sm mb-1">Zinseszins-Effekt</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                {(() => {
                  const ohneZZ = nAnfang * (1 + (nZins / 100) * Math.floor(nLaufzeit)) + nSparrate * 12 * Math.floor(nLaufzeit);
                  const differenz = ergebnis.endkapital - ohneZZ;
                  return differenz > 0
                    ? <>Durch den Zinseszins-Effekt erhalten Sie <strong>{fmt(differenz)} € mehr</strong> als bei einfacher Verzinsung. Je länger die Laufzeit, desto stärker wirkt dieser Effekt.</>
                    : <>Bei dieser kurzen Laufzeit ist der Zinseszins-Effekt noch gering. Er wird mit zunehmender Anlagedauer deutlich spürbarer.</>;
                })()}
              </p>
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung dient der Orientierung. Tatsächliche Zinserträge können durch Gebühren, Steuern (Abgeltungssteuer 25% + Soli) und Zinsänderungen abweichen. Die Kapitalertragssteuer ist hier nicht berücksichtigt.
            </p>
          </div>

          <CrossLink href="/finanzen/kreditrechner" emoji="💳" text="Kreditrechner: Zinsen und Rate bei Krediten" />
          <CrossLink href="/finanzen/etf-sparplanrechner" emoji="📈" text="ETF-Sparplan: Mehr Rendite als klassisches Sparen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(nAnfang)} € Anfangskapital → ${fmt(ergebnis.endkapital)} € nach ${Math.floor(nLaufzeit)} Jahren (${fmt(ergebnis.gesamtzinsen)} € Zinsen)`}
            seitenTitel="Zinsrechner"
          />
          <AiExplain
            rechnerName="Zinsrechner"
            eingaben={{
              anfangskapital: nAnfang,
              zinssatz: nZins,
              laufzeit: nLaufzeit,
              zinseszins,
              sparrate: nSparrate,
            }}
            ergebnis={{
              endkapital: ergebnis.endkapital,
              gesamtzinsen: ergebnis.gesamtzinsen,
              eigenkapital: ergebnis.eigenkapital,
            }}
          />
        </>
      )}
    </div>
  );
}
