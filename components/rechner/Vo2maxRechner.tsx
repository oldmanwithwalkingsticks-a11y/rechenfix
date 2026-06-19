'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

/**
 * VO2max-Rechner (Sport-Kategorie).
 *
 * Schätzmethoden (inline):
 * - Cooper-Test: VO2max = (Distanz in m − 504,9) ÷ 44,73
 * - Puls-Methode: VO2max ≈ 15 × (HFmax ÷ HFruhe)
 * Werte sind Schätzungen; der Labortest (Spiroergometrie) ist genauer.
 */
type Methode = 'cooper' | 'puls';

export default function Vo2maxRechner() {
  const [methode, setMethode] = useState<Methode>('cooper');
  const [distanz, setDistanz] = useState('2400');
  const [hfmax, setHfmax] = useState('190');
  const [hfruhe, setHfruhe] = useState('60');

  const nDistanz = parseDeutscheZahl(distanz);
  const nHfmax = parseDeutscheZahl(hfmax);
  const nHfruhe = parseDeutscheZahl(hfruhe);

  const ergebnis = useMemo(() => {
    if (methode === 'cooper') {
      if (nDistanz <= 504.9) return null;
      return { vo2max: (nDistanz - 504.9) / 44.73 };
    }
    if (nHfmax <= 0 || nHfruhe <= 0) return null;
    return { vo2max: 15 * (nHfmax / nHfruhe) };
  }, [methode, nDistanz, nHfmax, nHfruhe]);

  const f0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const f1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  return (
    <div>
      {/* Methode */}
      <div className="mb-6">
        <RadioToggleGroup
          name="vo2-methode"
          legend="Schätzmethode"
          srOnlyLegend
          options={[
            { value: 'cooper', label: 'Cooper-Test (12 min)' },
            { value: 'puls', label: 'Ruhe-/Maxpuls' },
          ]}
          value={methode}
          onChange={(v) => setMethode(v as Methode)}
        />
      </div>

      {/* Eingaben je Methode */}
      {methode === 'cooper' ? (
        <div className="max-w-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            In 12 Minuten gelaufene Distanz
          </label>
          <NummerEingabe value={distanz} onChange={setDistanz} placeholder="2400" einheit="m" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximalpuls (HFmax)</label>
            <NummerEingabe value={hfmax} onChange={setHfmax} placeholder="190" einheit="Schläge/min" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ruhepuls (HFruhe)</label>
            <NummerEingabe value={hfruhe} onChange={setHfruhe} placeholder="60" einheit="Schläge/min" />
          </div>
        </div>
      )}

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Geschätzter VO2max</p>
                <p className="text-5xl font-bold">{f0(ergebnis.vo2max)}</p>
                <p className="text-white/80 text-sm mt-1">ml/kg/min</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {methode === 'cooper' ? 'Cooper-Test' : 'Puls-Methode'}
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {methode === 'cooper'
                ? `(${f0(nDistanz)} − 504,9) ÷ 44,73 = ${f1(ergebnis.vo2max)} ml/kg/min`
                : `15 × (${f0(nHfmax)} ÷ ${f0(nHfruhe)}) = ${f1(ergebnis.vo2max)} ml/kg/min`}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Schätzung — der im Labor gemessene Wert kann abweichen.
            </p>
          </div>

          <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="❤️" text="Trainings-Herzfrequenzzonen berechnen" />
          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Lauf-Pace und Zielzeit berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Geschätzter VO2max (${methode === 'cooper' ? 'Cooper-Test' : 'Puls-Methode'}): ≈ ${f0(ergebnis.vo2max)} ml/kg/min`}
            seitenTitel="VO2max-Rechner"
          />
          <AiExplain
            rechnerName="VO2max-Rechner"
            eingaben={methode === 'cooper'
              ? { methode: 'Cooper-Test', distanzMeter: nDistanz }
              : { methode: 'Puls-Methode', hfmax: nHfmax, hfruhe: nHfruhe }}
            ergebnis={{ vo2maxMlKgMin: ergebnis.vo2max }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Wählen Sie eine Methode und geben Sie die nötigen Werte ein.
        </p>
      )}
    </div>
  );
}
