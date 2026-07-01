'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl, clampInputValue } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Schwimm-Pace-Rechner (Sport-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Modus A: Pace/100 m (s) = Gesamtzeit(s) ÷ (Distanz(m) ÷ 100)
 * - Modus B (CSS): CSS-Pace/100 m (s) = (T400 − T200) ÷ 2  [Wakayoshi / Swim Smooth]
 * - Trainingszonen als Sekunden-Offset zur CSS je 100 m.
 */

// Zonen als Offset-Bereiche (Sekunden je 100 m) relativ zur CSS. Negativ = schneller.
const ZONEN: Array<{ label: string; von: number; bis: number; zweck: string }> = [
  { label: 'Erholung (locker)', von: 15, bis: 20, zweck: 'sehr locker, Regeneration' },
  { label: 'Grundlagenausdauer', von: 10, bis: 15, zweck: 'ruhiges Dauertempo, aerob' },
  { label: 'Schwelle (CSS)', von: -3, bis: 3, zweck: 'an der Laktatschwelle' },
  { label: 'VO2max / Speed', von: -10, bis: -5, zweck: 'harte Intervalle, Tempo' },
];

function paceStr(sek: number): string {
  if (!isFinite(sek) || sek <= 0) return '—';
  const m = Math.floor(sek / 60);
  const s = Math.round(sek - m * 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function SchwimmPaceRechner() {
  const [modus, setModus] = useState<'A' | 'B'>('B');
  // Modus A
  const [distanz, setDistanz] = useState('1500');
  const [aMin, setAMin] = useState('30');
  const [aSek, setASek] = useState('0');
  // Modus B
  const [t400Min, setT400Min] = useState('6');
  const [t400Sek, setT400Sek] = useState('40');
  const [t200Min, setT200Min] = useState('3');
  const [t200Sek, setT200Sek] = useState('10');

  const nDistanz = parseDeutscheZahl(distanz);

  const ergebnis = useMemo(() => {
    if (modus === 'A') {
      const total = (parseInt(aMin, 10) || 0) * 60 + (parseInt(aSek, 10) || 0);
      if (nDistanz <= 0 || total <= 0) return null;
      const pace100 = total / (nDistanz / 100);
      return { modus: 'A' as const, pace100, total };
    }
    const t400 = (parseInt(t400Min, 10) || 0) * 60 + (parseInt(t400Sek, 10) || 0);
    const t200 = (parseInt(t200Min, 10) || 0) * 60 + (parseInt(t200Sek, 10) || 0);
    if (t400 <= 0 || t200 <= 0 || t400 <= t200) return null;
    const css = (t400 - t200) / 2;
    const zonen = ZONEN.map((z) => ({
      ...z,
      // niedrigerer Offset = schnellere (kleinere) Pace
      schnell: css + z.von,
      langsam: css + z.bis,
    }));
    return { modus: 'B' as const, css, t400, t200, zonen };
  }, [modus, nDistanz, aMin, aSek, t400Min, t400Sek, t200Min, t200Sek]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  const zeitFeld = (id: string, labelMin: string, mv: string, setM: (v: string) => void, sv: string, setS: (v: string) => void) => (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label htmlFor={`${id}-m`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{labelMin}</label>
        <input id={`${id}-m`} type="number" min="0" max="99" value={mv}
          onChange={(e) => setM(clampInputValue(e.target.value, 0, 99))}
          className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center" />
      </div>
      <div>
        <label htmlFor={`${id}-s`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Sekunden</label>
        <input id={`${id}-s`} type="number" min="0" max="59" value={sv}
          onChange={(e) => setS(clampInputValue(e.target.value, 0, 59))}
          className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center" />
      </div>
    </div>
  );

  return (
    <div>
      {/* Modus */}
      <div className="mb-6">
        <label htmlFor="swim-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was berechnen?</label>
        <select id="swim-modus" value={modus} onChange={(e) => setModus(e.target.value as 'A' | 'B')} className="input-field w-full">
          <option value="B">CSS-Schwellenpace (aus 400 m &amp; 200 m)</option>
          <option value="A">Pace umrechnen (Zeit &amp; Distanz)</option>
        </select>
      </div>

      {modus === 'A' ? (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="swim-dist" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distanz</label>
            <NummerEingabe value={distanz} onChange={setDistanz} placeholder="1500" einheit="m" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gesamtzeit</label>
            {zeitFeld('swim-a', 'Minuten', aMin, setAMin, aSek, setASek)}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">400-m-Zeit (all-out)</label>
            {zeitFeld('swim-400', 'Minuten', t400Min, setT400Min, t400Sek, setT400Sek)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">200-m-Zeit (all-out)</label>
            {zeitFeld('swim-200', 'Minuten', t200Min, setT200Min, t200Sek, setT200Sek)}
          </div>
        </div>
      )}

      {ergebnis && ergebnis.modus === 'A' ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Pace pro 100 m</p>
                <p className="text-5xl font-bold">{paceStr(ergebnis.pace100)} /100 m</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nDistanz)} m in {paceStr(ergebnis.total)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.total)} s ÷ ({fmt0(nDistanz)} ÷ 100) = {paceStr(ergebnis.pace100)} /100 m
            </p>
          </div>
        </>
      ) : null}

      {ergebnis && ergebnis.modus === 'B' ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">CSS-Schwellenpace</p>
                <p className="text-5xl font-bold">{paceStr(ergebnis.css)} /100 m</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  400 m {paceStr(ergebnis.t400)} · 200 m {paceStr(ergebnis.t200)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              ({fmt0(ergebnis.t400)} s − {fmt0(ergebnis.t200)} s) ÷ 2 = {fmt0(ergebnis.css)} s = {paceStr(ergebnis.css)} /100 m
            </p>
          </div>

          {/* Zonen-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Deine Trainingszonen (aus der CSS)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Zone</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Pace / 100 m</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Zweck</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.zonen.map((z) => (
                    <tr key={z.label} className="border-b border-gray-100 dark:border-gray-600/50">
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 font-medium">{z.label}</td>
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{paceStr(z.schnell)}–{paceStr(z.langsam)}</td>
                      <td className="py-2.5 text-gray-600 dark:text-gray-400">{z.zweck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}

      {ergebnis ? (
        <>
          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Lauf-Pace, Zeit & Distanz umrechnen" />
          <CrossLink href="/sport/ftp-rechner" emoji="🚴" text="FTP & Rad-Trainingszonen — das Rad-Pendant" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.modus === 'A'
              ? `Schwimm-Pace: ${fmt0(nDistanz)} m in ${paceStr(ergebnis.total)} = ${paceStr(ergebnis.pace100)} /100 m`
              : `CSS-Schwellenpace ${paceStr(ergebnis.css)} /100 m (400 m ${paceStr(ergebnis.t400)}, 200 m ${paceStr(ergebnis.t200)})`}
            seitenTitel="Schwimm-Pace-Rechner"
          />
          <AiExplain
            rechnerName="Schwimm-Pace-Rechner"
            eingaben={ergebnis.modus === 'A'
              ? { modus: 'Pace umrechnen', distanzM: nDistanz, gesamtzeit: paceStr(ergebnis.total) }
              : { modus: 'CSS-Schwellenpace', zeit400: paceStr(ergebnis.t400), zeit200: paceStr(ergebnis.t200) }}
            ergebnis={ergebnis.modus === 'A'
              ? { pace100m: `${paceStr(ergebnis.pace100)} /100 m` }
              : { cssPace100m: `${paceStr(ergebnis.css)} /100 m`, schwellenzone: `${paceStr(ergebnis.zonen[2].schnell)}–${paceStr(ergebnis.zonen[2].langsam)} /100 m` }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {modus === 'B'
            ? 'Bitte die 400-m-Zeit über der 200-m-Zeit eingeben, um die CSS zu berechnen.'
            : 'Geben Sie Distanz und Gesamtzeit ein, um die Pace pro 100 m zu berechnen.'}
        </p>
      )}
    </div>
  );
}
