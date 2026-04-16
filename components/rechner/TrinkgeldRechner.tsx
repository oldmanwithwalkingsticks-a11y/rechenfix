'use client';

import { useState, useMemo } from 'react';
import { berechneTriinkgeld, type TrinkgeldModus } from '@/lib/berechnungen/trinkgeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const PROZENT_SCHNELLWAHL = [5, 10, 15, 20];
const PERSONEN_SCHNELLWAHL = [1, 2, 3, 4, 5, 6];

export default function TrinkgeldRechner() {
  const [rechnungsbetrag, setRechnungsbetrag] = useState('45');
  const [modus, setModus] = useState<TrinkgeldModus>('prozent');
  const [trinkgeldProzent, setTrinkgeldProzent] = useState('10');
  const [trinkgeldBetrag, setTrinkgeldBetrag] = useState('5');
  const [personen, setPersonen] = useState('2');
  const [aufrunden, setAufrunden] = useState(false);

  const nRechnungsbetrag = parseDeutscheZahl(rechnungsbetrag);
  const nTrinkgeldProzent = parseDeutscheZahl(trinkgeldProzent);
  const nTrinkgeldBetrag = parseDeutscheZahl(trinkgeldBetrag);
  const nPersonen = Math.max(1, Math.min(50, Math.round(parseDeutscheZahl(personen))));

  const ergebnis = useMemo(
    () => berechneTriinkgeld({
      rechnungsbetrag: nRechnungsbetrag,
      modus,
      trinkgeldProzent: nTrinkgeldProzent,
      trinkgeldBetrag: nTrinkgeldBetrag,
      personen: nPersonen,
      aufrunden,
    }),
    [nRechnungsbetrag, modus, nTrinkgeldProzent, nTrinkgeldBetrag, nPersonen, aufrunden],
  );

  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Rechnungsbetrag */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rechnungsbetrag</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={rechnungsbetrag} onChange={setRechnungsbetrag} placeholder="z.B. 45" einheit="€" />
        </div>
      </div>

      {/* Trinkgeld-Modus */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trinkgeld</label>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setModus('prozent')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              modus === 'prozent'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Prozent
          </button>
          <button
            onClick={() => setModus('betrag')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              modus === 'betrag'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Fester Betrag
          </button>
        </div>

        {modus === 'prozent' ? (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              {PROZENT_SCHNELLWAHL.map(p => (
                <button
                  key={p}
                  onClick={() => setTrinkgeldProzent(String(p))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    nTrinkgeldProzent === p
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <div className="w-full sm:w-1/2">
              <NummerEingabe value={trinkgeldProzent} onChange={setTrinkgeldProzent} placeholder="z.B. 10" einheit="%" />
            </div>
          </>
        ) : (
          <div className="w-full sm:w-1/2">
            <NummerEingabe value={trinkgeldBetrag} onChange={setTrinkgeldBetrag} placeholder="z.B. 5" einheit="€" />
          </div>
        )}
      </div>

      {/* Personen */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Personen</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {PERSONEN_SCHNELLWAHL.map(p => (
            <button
              key={p}
              onClick={() => setPersonen(String(p))}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                nPersonen === p
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-1/3">
          <NummerEingabe value={personen} onChange={setPersonen} placeholder="z.B. 2" einheit="Pers." />
        </div>
      </div>

      {/* Aufrunden */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auf glatten Betrag aufrunden?</label>
        <div className="flex gap-2">
          <button
            onClick={() => setAufrunden(false)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              !aufrunden
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Nein
          </button>
          <button
            onClick={() => setAufrunden(true)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              aufrunden
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Ja (nächster voller Euro)
          </button>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Gesamtbetrag</p>
                <p className="text-5xl font-bold">{fmtDez(ergebnis.gesamtbetrag)} €</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Trinkgeld: {fmtDez(ergebnis.trinkgeldBetrag)} € ({fmtDez(ergebnis.trinkgeldProzent).replace(',00', '')}%)
                </span>
                {nPersonen > 1 && (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      Pro Person: {fmtDez(ergebnis.proPerson)} €
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rechnungsbetrag</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.rechnungsbetrag)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Trinkgeld ({fmtDez(ergebnis.trinkgeldProzent).replace(',00', '')}%){ergebnis.aufgerundet ? ' (aufgerundet)' : ''}</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+{fmtDez(ergebnis.trinkgeldBetrag)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Gesamtbetrag</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmtDez(ergebnis.gesamtbetrag)} €</span>
              </div>
              {nPersonen > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pro Person ({nPersonen} Personen)</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.proPerson)} €</span>
                </div>
              )}
            </div>
          </div>

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-5 pt-4 pb-2">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Trinkgeld-Übersicht</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300">Trinkgeld</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Betrag</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Gesamt</th>
                  {nPersonen > 1 && (
                    <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Pro Person</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.vergleich.map(v => {
                  const istAktuell = modus === 'prozent' && nTrinkgeldProzent === v.prozent;
                  return (
                    <tr
                      key={v.prozent}
                      className={istAktuell
                        ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                      }
                    >
                      <td className={`px-5 py-2.5 ${istAktuell ? 'text-primary-700 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {v.prozent}%
                        {istAktuell && <span className="ml-1 text-xs">✓</span>}
                      </td>
                      <td className={`px-5 py-2.5 text-right tabular-nums ${istAktuell ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {fmtDez(v.betrag)} €
                      </td>
                      <td className={`px-5 py-2.5 text-right tabular-nums ${istAktuell ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {fmtDez(v.gesamt)} €
                      </td>
                      {nPersonen > 1 && (
                        <td className={`px-5 py-2.5 text-right tabular-nums ${istAktuell ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {fmtDez(v.proPerson)} €
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Tipp:</strong> In Deutschland sind 5-10% Trinkgeld im Restaurant üblich, 10-15% bei sehr gutem Service. Im Gegensatz zu den USA ist Trinkgeld in Deutschland freiwillig und kein fester Gehaltsbestandteil.
            </p>
          </div>

          <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozente berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Rechnung: ${fmtDez(nRechnungsbetrag)} € + ${fmtDez(ergebnis.trinkgeldBetrag)} € Trinkgeld (${fmtDez(ergebnis.trinkgeldProzent).replace(',00', '')}%) = ${fmtDez(ergebnis.gesamtbetrag)} €${nPersonen > 1 ? ` | Pro Person: ${fmtDez(ergebnis.proPerson)} €` : ''}`}
            seitenTitel="Trinkgeld-Rechner"
          />

          <AiExplain
            rechnerName="Trinkgeld-Rechner"
            eingaben={{
              rechnungsbetrag: nRechnungsbetrag,
              trinkgeld: modus === 'prozent' ? `${nTrinkgeldProzent}%` : `${nTrinkgeldBetrag} €`,
              personen: nPersonen,
              aufrunden: aufrunden ? 'Ja' : 'Nein',
            }}
            ergebnis={{
              trinkgeldBetrag: ergebnis.trinkgeldBetrag,
              gesamtbetrag: ergebnis.gesamtbetrag,
              proPerson: ergebnis.proPerson,
            }}
          />
        </>
      )}
    </div>
  );
}
