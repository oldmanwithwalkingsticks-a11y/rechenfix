'use client';

import { useState, useMemo } from 'react';
import { berechneSchritte } from '@/lib/berechnungen/schritte';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE');

export default function SchritteRechner() {
  const [schritte, setSchritte] = useState('8000');
  const [groesse, setGroesse] = useState('175');
  const [gewicht, setGewicht] = useState('75');
  const [geschwindigkeit, setGeschwindigkeit] = useState('normal');

  const ergebnis = useMemo(() => {
    const s = parseDeutscheZahl(schritte);
    const g = parseDeutscheZahl(groesse);
    const w = parseDeutscheZahl(gewicht);
    if (s <= 0 || g <= 0 || w <= 0) return null;
    return berechneSchritte(s, g, w, geschwindigkeit);
  }, [schritte, groesse, gewicht, geschwindigkeit]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schritte</label>
            <NummerEingabe value={schritte} onChange={setSchritte} placeholder="8000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße (cm)</label>
            <NummerEingabe value={groesse} onChange={setGroesse} placeholder="175" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewicht (kg)</label>
            <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" />
          </div>
          <div>
            <label htmlFor="geschwindigkeit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschwindigkeit</label>
            <select
              id="geschwindigkeit"
              value={geschwindigkeit}
              onChange={e => setGeschwindigkeit(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              <option value="langsam">Langsam (4 km/h)</option>
              <option value="normal">Normal (5 km/h)</option>
              <option value="schnell">Schnell (6,5 km/h)</option>
            </select>
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Distanz</p>
                <p className="text-3xl font-bold">{ergebnis.distanzKm.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">km</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Kalorien</p>
                <p className="text-3xl font-bold">{fmt(ergebnis.kalorien)}</p>
                <p className="text-white/60 text-xs">kcal</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Dauer</p>
                <p className="text-3xl font-bold">{ergebnis.dauerMinuten}</p>
                <p className="text-white/60 text-xs">Minuten</p>
              </div>
            </div>
          </div>

          {/* Fortschritt */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">Tagesziel: {fmt(ergebnis.tagesziel)} Schritte</span>
              <span className="font-bold text-primary-600 dark:text-primary-400">{ergebnis.fortschrittProzent} %</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${ergebnis.fortschrittProzent >= 100 ? 'bg-green-500' : ergebnis.fortschrittProzent >= 50 ? 'bg-primary-500' : 'bg-orange-400'}`}
                style={{ width: `${ergebnis.fortschrittProzent}%` }}
                role="progressbar"
                aria-valuenow={ergebnis.fortschrittProzent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Tagesziel zu ${ergebnis.fortschrittProzent} Prozent erreicht`}
              />
            </div>
            {ergebnis.restSchritte > 0 ? (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Noch {fmt(ergebnis.restSchritte)} Schritte ({ergebnis.restKm.toLocaleString('de-DE')} km) bis zum Tagesziel
              </p>
            ) : (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                ✓ Tagesziel erreicht!
              </p>
            )}
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Details</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Schrittlänge</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.schrittlaenge.toLocaleString('de-DE')} cm</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Geschwindigkeit</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.geschwindigkeitKmh.toLocaleString('de-DE')} km/h</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Distanz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.distanzKm.toLocaleString('de-DE')} km</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gehzeit</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.dauerMinuten} min ({ergebnis.dauerStunden.toLocaleString('de-DE')} h)</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kalorienverbrauch</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.kalorien)} kcal</span>
              </div>
            </div>
          </div>

          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Täglichen Kalorienbedarf berechnen" />
          <CrossLink href="/gesundheit/bmi-rechner" emoji="❤️" text="BMI berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(ergebnis.schritte)} Schritte = ${ergebnis.distanzKm.toLocaleString('de-DE')} km, ${fmt(ergebnis.kalorien)} kcal, ${ergebnis.dauerMinuten} min`}
            seitenTitel="Schritte-Rechner"
          />

          <AiExplain
            rechnerName="Schritte-Rechner"
            eingaben={{
              schritte: ergebnis.schritte,
              koerpergroesse: parseDeutscheZahl(groesse),
              gewicht: parseDeutscheZahl(gewicht),
              geschwindigkeit,
            }}
            ergebnis={{
              distanzKm: ergebnis.distanzKm,
              kalorien: ergebnis.kalorien,
              dauerMinuten: ergebnis.dauerMinuten,
              fortschrittProzent: ergebnis.fortschrittProzent,
            }}
          />
        </>
      )}
    </div>
  );
}
