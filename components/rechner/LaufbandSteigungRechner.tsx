'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Laufband-Steigung-Rechner (Sport-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), quellenverifiziert:
 * - Outdoor-Äquiv. Geschwindigkeit (km/h) = Band(km/h) × (1 + 0,03 × Steigung%)  [Jones & Doust 1996]
 * - Pace (min/km) = 60 ÷ Geschwindigkeit(km/h)
 * - ACSM-VO2 (v in m/min): 3,5 + 0,2·v + 0,9·v·(Steigung%/100) — für den relativen Mehraufwand.
 */

const STEIGUNG_STUFEN = [0, 1, 2, 4, 6, 8, 10, 12, 15];

function paceStr(kmh: number): string {
  if (!isFinite(kmh) || kmh <= 0) return '—';
  const sekProKm = 3600 / kmh;
  const m = Math.floor(sekProKm / 60);
  const s = Math.round(sekProKm - m * 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ACSM-VO2 (ml/kg/min) für horizontales Laufband (v in m/min, grade dezimal).
function acsmVo2(kmh: number, gradePct: number): number {
  const v = (kmh * 1000) / 60; // m/min
  return 3.5 + 0.2 * v + 0.9 * v * (gradePct / 100);
}

export default function LaufbandSteigungRechner() {
  const [band, setBand] = useState('10');
  const [steigung, setSteigung] = useState('2');

  const nBand = parseDeutscheZahl(band);
  const nSteigung = parseDeutscheZahl(steigung);

  const ergebnis = useMemo(() => {
    if (nBand <= 0) return null;
    const grade = Math.max(0, nSteigung);
    const outKmh = nBand * (1 + 0.03 * grade);
    // Mehraufwand: ACSM-VO2 mit Steigung vs. flach bei Band-Tempo.
    const vo2Steigung = acsmVo2(nBand, grade);
    const vo2Flach = acsmVo2(nBand, 0);
    const mehraufwandPct = vo2Flach > 0 ? (vo2Steigung / vo2Flach - 1) * 100 : 0;
    return { outKmh, mehraufwandPct, grade };
  }, [nBand, nSteigung]);

  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="lb-band" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Band-Geschwindigkeit</label>
          <NummerEingabe value={band} onChange={setBand} placeholder="10" einheit="km/h" />
        </div>
        <div>
          <label htmlFor="lb-steigung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steigung</label>
          <NummerEingabe value={steigung} onChange={setSteigung} placeholder="2" einheit="%" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Outdoor-Äquivalent</p>
                <p className="text-5xl font-bold">{fmt2(ergebnis.outKmh)} km/h</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Pace {paceStr(ergebnis.outKmh)} min/km
                </span>
                <span className="block text-white/80 text-sm">
                  Band: {fmt1(nBand)} km/h @ {fmt0(ergebnis.grade)} % · Mehraufwand ~{fmt0(ergebnis.mehraufwandPct)} %
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt1(nBand)} × (1 + 0,03 × {fmt0(ergebnis.grade)}) = {fmt2(ergebnis.outKmh)} km/h
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              60 ÷ {fmt2(ergebnis.outKmh)} = {paceStr(ergebnis.outKmh)} min/km
            </p>
          </div>

          {/* Steigungs-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Dein Tempo bei verschiedenen Steigungen</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Steigung</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Outdoor-Äquivalent</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Pace</th>
                  </tr>
                </thead>
                <tbody>
                  {STEIGUNG_STUFEN.map((g) => {
                    const o = nBand * (1 + 0.03 * g);
                    const aktiv = Math.round(ergebnis.grade) === g;
                    return (
                      <tr key={g} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{g} %</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{fmt2(o)} km/h</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{paceStr(o)} min/km</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bezogen auf {fmt1(nBand)} km/h Band-Geschwindigkeit. Faustregel: je 1 % Steigung rund 3 % mehr Aufwand.
            </p>
          </div>

          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Pace ↔ Zeit ↔ Distanz umrechnen" />
          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch beim Laufen" />

          <ErgebnisAktionen
            ergebnisText={`Laufband ${fmt1(nBand)} km/h @ ${fmt0(ergebnis.grade)} % Steigung entspricht ${fmt2(ergebnis.outKmh)} km/h auf der Straße (Pace ${paceStr(ergebnis.outKmh)} min/km)`}
            seitenTitel="Laufband-Steigung-Rechner"
          />
          <AiExplain
            rechnerName="Laufband-Steigung-Rechner"
            eingaben={{ bandGeschwindigkeitKmh: nBand, steigungProzent: ergebnis.grade }}
            ergebnis={{ outdoorKmh: Number(ergebnis.outKmh.toFixed(2)), outdoorPace: `${paceStr(ergebnis.outKmh)} min/km`, mehraufwandProzent: Math.round(ergebnis.mehraufwandPct) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Band-Geschwindigkeit und Steigung ein, um das Outdoor-Äquivalent zu berechnen.
        </p>
      )}
    </div>
  );
}
