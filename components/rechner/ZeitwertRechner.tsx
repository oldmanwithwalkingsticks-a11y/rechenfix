'use client';

import { useState, useMemo } from 'react';
import { berechneZeitwert, NUTZUNGSDAUER_OPTIONEN, ZUSTAND_OPTIONEN } from '@/lib/berechnungen/zeitwert';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ZeitwertRechner() {
  const [neupreis, setNeupreis] = useState('1000');
  const [alter, setAlter] = useState('3');
  const [nutzungsdauerModus, setNutzungsdauerModus] = useState('5');
  const [nutzungsdauerEigen, setNutzungsdauerEigen] = useState('5');
  const [zustand, setZustand] = useState('0.75');

  const nutzungsdauer = nutzungsdauerModus === 'eigene'
    ? parseDeutscheZahl(nutzungsdauerEigen)
    : parseInt(nutzungsdauerModus);

  const ergebnis = useMemo(() => {
    const np = parseDeutscheZahl(neupreis);
    const a = parseDeutscheZahl(alter);
    const zf = parseFloat(zustand);
    if (np <= 0 || a < 0 || nutzungsdauer < 1) return null;
    return berechneZeitwert(np, a, nutzungsdauer, zf);
  }, [neupreis, alter, nutzungsdauer, zustand]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Neupreis (€)</label>
            <NummerEingabe value={neupreis} onChange={setNeupreis} placeholder="1000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter (Jahre)</label>
            <NummerEingabe value={alter} onChange={setAlter} placeholder="3" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nutzungsdauer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Übliche Nutzungsdauer</label>
            <select
              id="nutzungsdauer"
              value={nutzungsdauerModus}
              onChange={e => setNutzungsdauerModus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {NUTZUNGSDAUER_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {nutzungsdauerModus === 'eigene' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nutzungsdauer (Jahre)</label>
              <NummerEingabe value={nutzungsdauerEigen} onChange={setNutzungsdauerEigen} placeholder="5" />
            </div>
          ) : (
            <div>
              <label htmlFor="zustand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zustand</label>
              <select
                id="zustand"
                value={zustand}
                onChange={e => setZustand(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
              >
                {ZUSTAND_OPTIONEN.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {nutzungsdauerModus === 'eigene' && (
          <div>
            <label htmlFor="zustand-eigen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zustand</label>
            <select
              id="zustand-eigen"
              value={zustand}
              onChange={e => setZustand(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {ZUSTAND_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="text-center mb-4">
              <p className="text-white/70 text-sm mb-1">Geschätzter Zeitwert</p>
              <p className="text-4xl sm:text-5xl font-bold">{fmt(ergebnis.zeitwertBereinigt)} €</p>
              <p className="text-white/70 text-sm mt-1">
                {ergebnis.restwertProzent} % des Neupreises von {fmt(ergebnis.neupreis)} €
              </p>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Neupreis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.neupreis)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jährlicher Wertverlust</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">−{fmt(ergebnis.jaehrlicherWertverlust)} €/Jahr</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Zeitwert nach {ergebnis.alter} {ergebnis.alter === 1 ? 'Jahr' : 'Jahren'} (linear)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.zeitwertLinear)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Zustandsabzug ({ergebnis.zustandLabel})</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">× {ergebnis.zustandsfaktor}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold">
                <span className="text-gray-700 dark:text-gray-200">Zeitwert (zustandsbereinigt)</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.zeitwertBereinigt)} €</span>
              </div>
            </div>
          </div>

          {/* Wertverlaufskurve */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Wertverlauf</p>
            <div className="relative h-40">
              {/* Y-Achse Labels */}
              <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-600 dark:text-gray-400 pr-2 text-right">
                <span>{fmt(ergebnis.neupreis * ergebnis.zustandsfaktor)} €</span>
                <span>{fmt(ergebnis.neupreis * ergebnis.zustandsfaktor / 2)} €</span>
                <span>0 €</span>
              </div>
              {/* Chart */}
              <div className="ml-16 h-full flex items-end gap-px">
                {ergebnis.verlaufskurve.map((p) => {
                  const maxWert = ergebnis.neupreis * ergebnis.zustandsfaktor;
                  const hoehe = maxWert > 0 ? (p.wert / maxWert) * 100 : 0;
                  const istAktuell = p.jahr === ergebnis.alter;
                  return (
                    <div key={p.jahr} className="flex-1 flex flex-col items-center justify-end h-full" title={`Jahr ${p.jahr}: ${fmt(p.wert)} €`}>
                      <div
                        className={`w-full rounded-t-sm transition-all ${istAktuell ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        style={{ height: `${Math.max(1, hoehe)}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* X-Achse Labels */}
            <div className="ml-16 flex gap-px mt-1">
              {ergebnis.verlaufskurve.map((p) => (
                <div key={p.jahr} className={`flex-1 text-center text-xs ${p.jahr === ergebnis.alter ? 'font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {p.jahr}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
              Jahr (hervorgehoben: aktuelles Alter {ergebnis.alter} {ergebnis.alter === 1 ? 'Jahr' : 'Jahre'})
            </p>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 Der Zeitwert basiert auf linearer Abschreibung und dient als Orientierung. Versicherungen und Gerichte können andere Berechnungsmethoden verwenden. Für Schadensersatzansprüche empfiehlt sich ein Sachverständigengutachten.
            </p>
          </div>

          <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozentwerte berechnen" />
          <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Autokosten und Wertverlust berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Zeitwert: ${fmt(ergebnis.zeitwertBereinigt)} € (${ergebnis.restwertProzent} % von ${fmt(ergebnis.neupreis)} €, ${ergebnis.alter} Jahre, Zustand: ${ergebnis.zustandLabel})`}
            seitenTitel="Zeitwert-Rechner"
          />

          <AiExplain
            rechnerName="Zeitwert-Rechner"
            eingaben={{
              neupreis: ergebnis.neupreis,
              alter: ergebnis.alter,
              nutzungsdauer: ergebnis.nutzungsdauer,
              zustand: ergebnis.zustandLabel,
            }}
            ergebnis={{
              zeitwert: ergebnis.zeitwertBereinigt,
              restwertProzent: ergebnis.restwertProzent,
              jaehrlicherWertverlust: ergebnis.jaehrlicherWertverlust,
            }}
          />
        </>
      )}
    </div>
  );
}
