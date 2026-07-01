'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

function wege(v: number) {
  const reaktion = (v / 10) * 3;
  const bremsNormal = (v / 10) * (v / 10);
  const bremsGefahr = bremsNormal / 2;
  const anhalteNormal = reaktion + bremsNormal;
  const anhalteGefahr = reaktion + bremsGefahr;
  return { reaktion, bremsNormal, bremsGefahr, anhalteNormal, anhalteGefahr };
}

const TABELLEN_TEMPI = [30, 50, 70, 100, 120, 200];

export default function BremswegRechner() {
  const [tempo, setTempo] = useState('50');

  const ergebnis = useMemo(() => {
    const v = parseDeutscheZahl(tempo);
    if (v <= 0) return null;
    return { v, ...wege(v) };
  }, [tempo]);

  return (
    <div>
      {/* === 1: Geschwindigkeit === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Geschwindigkeit
        </h2>
        <NummerEingabe value={tempo} onChange={setTempo} placeholder="50" einheit="km/h" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Faustformeln der Fahrschule für trockene Fahrbahn und gute Reifen.
        </p>
      </div>

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4 text-center">
            <p className="text-white/80 text-sm mb-1">
              Anhalteweg bei {fmt(ergebnis.v)} km/h
            </p>
            <p className="text-5xl font-bold">{fmt(ergebnis.anhalteNormal)} m</p>
            <p className="text-white/90 text-sm mt-2">
              Reaktionsweg {fmt(ergebnis.reaktion)} m + Bremsweg {fmt(ergebnis.bremsNormal)} m
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Reaktionsweg</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.reaktion)} m</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bremsweg (normal)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.bremsNormal)} m</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bremsweg (Gefahrenbremsung)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.bremsGefahr)} m</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anhalteweg (normal)</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{fmt(ergebnis.anhalteNormal)} m</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anhalteweg (Gefahrenbremsung)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.anhalteGefahr)} m</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg:</strong>{' '}
              ({fmt(ergebnis.v)}÷10)×3 = {fmt(ergebnis.reaktion)} m Reaktion + ({fmt(ergebnis.v)}÷10)² ={' '}
              {fmt(ergebnis.bremsNormal)} m Bremsweg → {fmt(ergebnis.anhalteNormal)} m Anhalteweg
            </p>
          </div>

          {/* PFLICHT: Sicherheits-Zeile */}
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
            <p className="text-red-800 dark:text-red-300 text-sm">
              <strong>⚠️ Faustformeln sind vereinfachte Merkhilfen, keine exakten Werte.</strong>{' '}
              Bei Nässe, Schnee (bis rund 3× länger) oder abgefahrenen Reifen ist der reale Weg deutlich länger.
              Auch Beladung, Bremsenzustand und eine verlängerte Reaktionszeit (Müdigkeit, Ablenkung) verschlechtern
              die Werte. Das Ergebnis dient nur der Orientierung — es ersetzt keine angepasste Geschwindigkeit und
              keinen ausreichenden Sicherheitsabstand.
            </p>
          </div>

          {/* Tabelle: Wege nach Geschwindigkeit */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Wege nach Geschwindigkeit</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Tempo</th>
                    <th className="px-4 py-2 text-right font-semibold">Reaktion</th>
                    <th className="px-4 py-2 text-right font-semibold">Bremsweg</th>
                    <th className="px-4 py-2 text-right font-semibold">Anhalteweg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {TABELLEN_TEMPI.map(v => {
                    const w = wege(v);
                    const aktiv = Math.abs(v - ergebnis.v) < 0.001;
                    return (
                      <tr key={v} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {v} km/h
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{fmt(w.reaktion)} m</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{fmt(w.bremsNormal)} m</td>
                        <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}`}>{fmt(w.anhalteNormal)} m</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
              Bei doppelter Geschwindigkeit vervierfacht sich der Bremsweg (er wächst im Quadrat), der Reaktionsweg nur doppelt.
            </p>
          </div>

          <CrossLink href="/auto/bussgeldrechner" emoji="🚦" text="Bußgelder bei Tempo-Verstößen" />
          <CrossLink href="/auto/reichweiten-rechner" emoji="⛽" text="Reichweite berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Bremsweg-Rechner: bei ${fmt(ergebnis.v)} km/h Reaktionsweg ${fmt(ergebnis.reaktion)} m + Bremsweg ${fmt(ergebnis.bremsNormal)} m = Anhalteweg ${fmt(ergebnis.anhalteNormal)} m (Gefahrenbremsung ${fmt(ergebnis.anhalteGefahr)} m). Faustformel — bei Nässe/Schnee deutlich länger.`}
            seitenTitel="Bremsweg-Rechner"
          />

          <AiExplain
            rechnerName="Bremsweg-Rechner"
            eingaben={{
              geschwindigkeit: `${fmt(ergebnis.v)} km/h`,
            }}
            ergebnis={{
              reaktionsweg: `${fmt(ergebnis.reaktion)} m`,
              bremswegNormal: `${fmt(ergebnis.bremsNormal)} m`,
              bremswegGefahr: `${fmt(ergebnis.bremsGefahr)} m`,
              anhaltewegNormal: `${fmt(ergebnis.anhalteNormal)} m`,
              anhaltewegGefahr: `${fmt(ergebnis.anhalteGefahr)} m`,
              hinweis: 'Faustformel — bei Nässe/Schnee deutlich länger, kein exakter Wert.',
            }}
          />
        </>
      )}
    </div>
  );
}
