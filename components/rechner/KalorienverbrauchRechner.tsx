'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Kalorienverbrauch-Rechner (Sport-Kategorie, Wellbeing-sensibel).
 *
 * Inline-Logik (MET-Methode):
 *   kcal = MET × Körpergewicht (kg) × Dauer (h)
 * Die MET-Werte sind Durchschnitte aus dem Compendium of Physical Activities.
 * Bewusst KEIN Abnehm-/Defizit-Frame — nur sachliche Aktivitäts-Energie.
 */
const AKTIVITAETEN: { key: string; label: string; met: number }[] = [
  { key: 'yoga', label: 'Yoga, ruhig', met: 2.5 },
  { key: 'gehen', label: 'Gehen, gemütlich', met: 3.0 },
  { key: 'gehen_zuegig', label: 'Gehen, zügig', met: 4.3 },
  { key: 'kraft', label: 'Krafttraining', met: 5.0 },
  { key: 'tanzen', label: 'Tanzen', met: 5.0 },
  { key: 'rad', label: 'Radfahren, moderat', met: 6.0 },
  { key: 'schwimmen', label: 'Schwimmen, moderat', met: 6.0 },
  { key: 'wandern', label: 'Wandern', met: 6.0 },
  { key: 'joggen', label: 'Joggen (8 km/h)', met: 7.0 },
  { key: 'fussball', label: 'Fußball', met: 7.0 },
  { key: 'treppen', label: 'Treppensteigen', met: 8.0 },
  { key: 'laufen', label: 'Laufen (10 km/h)', met: 9.8 },
  { key: 'seil', label: 'Seilspringen', met: 11.0 },
];

export default function KalorienverbrauchRechner() {
  const [aktivitaet, setAktivitaet] = useState('joggen');
  const [gewicht, setGewicht] = useState('70');
  const [dauer, setDauer] = useState('30');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nDauer = parseDeutscheZahl(dauer);
  const met = AKTIVITAETEN.find((a) => a.key === aktivitaet)?.met ?? 7;

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0 || nDauer <= 0) return null;
    const stunden = nDauer / 60;
    const kcal = met * nGewicht * stunden;
    const kcalProMin = kcal / nDauer;
    return { kcal, kcalProMin };
  }, [met, nGewicht, nDauer]);

  const f0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const f1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label htmlFor="kv-aktivitaet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivität</label>
          <select
            id="kv-aktivitaet"
            value={aktivitaet}
            onChange={(e) => setAktivitaet(e.target.value)}
            className="input-field w-full"
          >
            {AKTIVITAETEN.map((a) => (
              <option key={a.key} value={a.key}>{a.label} ({f1(a.met)} MET)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="70" einheit="kg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dauer</label>
          <NummerEingabe value={dauer} onChange={setDauer} placeholder="30" einheit="min" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Verbrauchte Aktivitäts-Energie (Schätzung)</p>
                <p className="text-5xl font-bold">{f0(ergebnis.kcal)} kcal</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {f1(met)} MET · ≈ {f1(ergebnis.kcalProMin)} kcal/min
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {f1(met)} MET × {f0(nGewicht)} kg × {f1(nDauer / 60)} h = {f0(ergebnis.kcal)} kcal
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Grobe Schätzung nach der MET-Methode — der reale Verbrauch ist individuell sehr unterschiedlich.
            </p>
          </div>

          <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="❤️" text="Trainings-Herzfrequenzzonen berechnen" />
          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Lauf-Pace und Zielzeit berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${AKTIVITAETEN.find((a) => a.key === aktivitaet)?.label}, ${f0(nDauer)} min bei ${f0(nGewicht)} kg: ≈ ${f0(ergebnis.kcal)} kcal (Schätzung)`}
            seitenTitel="Kalorienverbrauch-Rechner"
          />
          <AiExplain
            rechnerName="Kalorienverbrauch-Rechner"
            eingaben={{ aktivitaet: AKTIVITAETEN.find((a) => a.key === aktivitaet)?.label, met, gewichtKg: nGewicht, dauerMin: nDauer }}
            ergebnis={{ kcal: ergebnis.kcal, kcalProMinute: ergebnis.kcalProMin }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Wählen Sie eine Aktivität und geben Sie Gewicht und Dauer ein.
        </p>
      )}
    </div>
  );
}
