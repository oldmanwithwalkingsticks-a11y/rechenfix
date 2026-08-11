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

/**
 * Physikalische Bremswegformel: s = v² / (2a), v in m/s.
 * Die Faustformeln oben entsprechen a = 3,858 m/s² (normal) beziehungsweise
 * a = 7,716 m/s² (Gefahrenbremsung) — hergeleitet daraus, dass 3,6² × 2a
 * genau 100 ergeben muss, damit aus km/h ohne Umrechnung Meter werden.
 */
const FAUSTFORMEL_A_NORMAL = 3.858;
const FAUSTFORMEL_A_GEFAHR = 7.716;

/** Verzögerungswerte nach Fahrbahnzustand, Mittelwerte der üblichen Bereiche. */
const FAHRBAHNEN = [
  { id: 'trocken', name: 'trockener Asphalt', a: 8.0, emoji: '☀️' },
  { id: 'nass', name: 'nasse Fahrbahn', a: 6.0, emoji: '🌧️' },
  { id: 'schnee', name: 'Schnee', a: 3.0, emoji: '❄️' },
  { id: 'eis', name: 'Eis', a: 1.5, emoji: '🧊' },
] as const;

type FahrbahnId = (typeof FAHRBAHNEN)[number]['id'];

/** Bremsweg in Metern nach s = v²/(2a), v in km/h. */
function bremswegPhysik(vKmh: number, a: number) {
  const vMs = vKmh / 3.6;
  return (vMs * vMs) / (2 * a);
}

/** Reaktionsweg in Metern bei frei wählbarer Reaktionszeit. */
function reaktionswegPhysik(vKmh: number, sekunden: number) {
  return (vKmh / 3.6) * sekunden;
}

export default function BremswegRechner() {
  const [tempo, setTempo] = useState('50');
  const [ansicht, setAnsicht] = useState<'faustformel' | 'physik'>('faustformel');
  const [fahrbahn, setFahrbahn] = useState<FahrbahnId>('trocken');
  const [reaktionszeit, setReaktionszeit] = useState('1,0');

  const ergebnis = useMemo(() => {
    const v = parseDeutscheZahl(tempo);
    if (v <= 0) return null;
    return { v, ...wege(v) };
  }, [tempo]);

  const physik = useMemo(() => {
    const v = parseDeutscheZahl(tempo);
    if (v <= 0) return null;
    const eintrag = FAHRBAHNEN.find(f => f.id === fahrbahn) ?? FAHRBAHNEN[0];
    const t = parseDeutscheZahl(reaktionszeit);
    const sekunden = t > 0 && t <= 5 ? t : 1;
    const reaktion = reaktionswegPhysik(v, sekunden);
    const brems = bremswegPhysik(v, eintrag.a);
    return { v, a: eintrag.a, name: eintrag.name, sekunden, reaktion, brems, anhalte: reaktion + brems };
  }, [tempo, fahrbahn, reaktionszeit]);

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

      {/* === 2: Ansicht === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Rechenweg
        </h2>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Rechenweg wählen">
          <button
            type="button"
            onClick={() => setAnsicht('faustformel')}
            aria-pressed={ansicht === 'faustformel'}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
              ansicht === 'faustformel'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            Faustformel
            <span className="block text-xs font-normal opacity-80">wie in der Theorieprüfung</span>
          </button>
          <button
            type="button"
            onClick={() => setAnsicht('physik')}
            aria-pressed={ansicht === 'physik'}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
              ansicht === 'physik'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            Physikalisch
            <span className="block text-xs font-normal opacity-80">mit Fahrbahn und Reaktionszeit</span>
          </button>
        </div>
      </div>

      {ansicht === 'physik' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Bedingungen
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3" role="group" aria-label="Fahrbahnzustand wählen">
            {FAHRBAHNEN.map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFahrbahn(f.id)}
                aria-pressed={fahrbahn === f.id}
                className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                  fahrbahn === f.id
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <span aria-hidden="true">{f.emoji}</span>
                <span className="block text-xs mt-0.5">{f.name}</span>
                <span className="block text-xs opacity-75">{fmt(f.a)} m/s²</span>
              </button>
            ))}
          </div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1" htmlFor="reaktionszeit">
            Reaktionszeit
          </label>
          <NummerEingabe
            id="reaktionszeit"
            value={reaktionszeit}
            onChange={setReaktionszeit}
            placeholder="1,0"
            einheit="Sekunden"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Die Faustformel unterstellt 1,08 Sekunden. Bei Ablenkung sind zwei Sekunden und mehr realistisch.
          </p>
        </div>
      )}

      {ergebnis && (
        <>
          {ansicht === 'faustformel' && (
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

          </>
          )}

          {ansicht === 'physik' && physik && (
          <>
            <div className="result-box mb-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Anhalteweg auf {physik.name}</p>
              <p className="text-5xl font-bold">{fmt(physik.anhalte)} m</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Reaktionsweg {fmt(physik.reaktion)} m + Bremsweg {fmt(physik.brems)} m
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Reaktionsweg bei {fmt(physik.sekunden)} s</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(physik.reaktion)} m</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Bremsweg bei {fmt(physik.a)} m/s²</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(physik.brems)} m</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm bg-gray-50 dark:bg-gray-700/30">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Anhalteweg</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{fmt(physik.anhalte)} m</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Rechenweg:</strong>{' '}
                ({fmt(physik.v)}÷3,6)×{fmt(physik.sekunden)} = {fmt(physik.reaktion)} m Reaktion +
                ({fmt(physik.v)}÷3,6)²÷(2×{fmt(physik.a)}) = {fmt(physik.brems)} m Bremsweg →{' '}
                {fmt(physik.anhalte)} m Anhalteweg
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-amber-900 dark:text-amber-200 text-sm">
                <strong>Was in der Faustformel steckt:</strong>{' '}
                Sie unterstellt {fmt(FAUSTFORMEL_A_NORMAL)} m/s² bei normaler Bremsung und{' '}
                {fmt(FAUSTFORMEL_A_GEFAHR)} m/s² bei Gefahrenbremsung — ohne das zu sagen. Die
                Gefahrenbremsungs-Variante trifft damit den trockenen Fall recht gut, ab Nässe liegt
                auch sie zu kurz.
              </p>
            </div>
          </>
          )}

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
            ergebnisText={
              ansicht === 'physik' && physik
                ? `Bremsweg-Rechner (physikalisch): bei ${fmt(physik.v)} km/h auf ${physik.name} mit ${fmt(physik.a)} m/s² Verzögerung und ${fmt(physik.sekunden)} s Reaktionszeit: Reaktionsweg ${fmt(physik.reaktion)} m + Bremsweg ${fmt(physik.brems)} m = Anhalteweg ${fmt(physik.anhalte)} m.`
                : `Bremsweg-Rechner: bei ${fmt(ergebnis.v)} km/h Reaktionsweg ${fmt(ergebnis.reaktion)} m + Bremsweg ${fmt(ergebnis.bremsNormal)} m = Anhalteweg ${fmt(ergebnis.anhalteNormal)} m (Gefahrenbremsung ${fmt(ergebnis.anhalteGefahr)} m). Faustformel — bei Nässe/Schnee deutlich länger.`
            }
            seitenTitel="Bremsweg-Rechner"
          />

          <AiExplain
            rechnerName="Bremsweg-Rechner"
            eingaben={{
              geschwindigkeit: `${fmt(ergebnis.v)} km/h`,
              rechenweg: ansicht === 'physik' ? 'physikalisch' : 'Faustformel',
              ...(ansicht === 'physik' && physik
                ? {
                    fahrbahn: `${physik.name} (${fmt(physik.a)} m/s²)`,
                    reaktionszeit: `${fmt(physik.sekunden)} s`,
                  }
                : {}),
            }}
            ergebnis={{
              reaktionsweg: `${fmt(ergebnis.reaktion)} m`,
              bremswegNormal: `${fmt(ergebnis.bremsNormal)} m`,
              bremswegGefahr: `${fmt(ergebnis.bremsGefahr)} m`,
              anhaltewegNormal: `${fmt(ergebnis.anhalteNormal)} m`,
              anhaltewegGefahr: `${fmt(ergebnis.anhalteGefahr)} m`,
              hinweis: 'Faustformel — bei Nässe/Schnee deutlich länger, kein exakter Wert.',
              ...(ansicht === 'physik' && physik
                ? {
                    anhaltewegPhysikalisch: `${fmt(physik.anhalte)} m`,
                    bremswegPhysikalisch: `${fmt(physik.brems)} m`,
                  }
                : {}),
            }}
          />
        </>
      )}
    </div>
  );
}
