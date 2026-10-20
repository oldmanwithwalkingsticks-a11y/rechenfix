'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import {
  outdoorAequivalentKmh, mehraufwandGegenStrasseProzent, aufwandsfaktor, AUFWANDSFAKTOR_STRASSE,
  paceAusKmh as paceStr,
} from '@/lib/berechnungen/laufband-steigung';

/**
 * Laufband-Steigung-Rechner (Sport-Kategorie).
 *
 * W184: vorher Tempo nach Faustregel „Band × (1 + 0,03 × Steigung), 0 % = Straße“, Mehraufwand
 * aber nach ACSM gegen 0 % Band (10 km/h, 2 %: Tempo +6 %, Mehraufwand +8 %), Seite: 1 % = Straße.
 * Jetzt ein Modell (lib/berechnungen/laufband-steigung.ts): ACSM-Laufgleichung, ebene Straße
 * ≈ Band bei 1 % (Jones & Doust 1996) → Outdoor = Band × (0,2 + 0,9·G) ÷ 0,209.
 */

const STEIGUNG_STUFEN = [0, 1, 2, 4, 6, 8, 10, 12, 15];

export default function LaufbandSteigungRechner() {
  const [band, setBand] = useState('10');
  const [steigung, setSteigung] = useState('2');

  const nBand = parseDeutscheZahl(band);
  const nSteigung = parseDeutscheZahl(steigung);

  const ergebnis = useMemo(() => {
    if (nBand <= 0) return null;
    const grade = Math.max(0, nSteigung);
    const outKmh = outdoorAequivalentKmh(nBand, grade);
    // Mehraufwand gegenüber ebener Straße bei gleichem Tempo (Straße = Band bei 1 %)
    const mehraufwandPct = mehraufwandGegenStrasseProzent(nBand, grade);
    return { outKmh, mehraufwandPct, grade };
  }, [nBand, nSteigung]);

  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmtG = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const fmt3 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const fmtVz = (n: number) => `${Math.round(n) > 0 ? '+' : Math.round(n) < 0 ? '−' : '±'}${fmt0(Math.abs(n))}`;

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
                  Band: {fmt1(nBand)} km/h @ {fmtG(ergebnis.grade)} % · Aufwand ggü. Straße ~{fmtVz(ergebnis.mehraufwandPct)} %
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              Band: 0,2 + 0,9 × {fmtG(ergebnis.grade)} % = {fmt3(aufwandsfaktor(ergebnis.grade))} · Straße (≈ Band bei 1 %): {fmt3(AUFWANDSFAKTOR_STRASSE)}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt1(nBand)} × {fmt3(aufwandsfaktor(ergebnis.grade))} ÷ {fmt3(AUFWANDSFAKTOR_STRASSE)} = {fmt2(ergebnis.outKmh)} km/h
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
                    const o = outdoorAequivalentKmh(nBand, g);
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
              Bezogen auf {fmt1(nBand)} km/h Band-Geschwindigkeit. Modell: ACSM-Laufgleichung, ebene Straße ≈ 1 % Steigung (Jones &amp; Doust 1996) — je Steigungsprozent rund 4,3 % mehr Straßentempo, 0 % liegt rund 4,3 % unter der Straße. Richtwert für etwa 8–16 km/h.
            </p>
          </div>

          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Pace ↔ Zeit ↔ Distanz umrechnen" />
          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch beim Laufen" />

          <ErgebnisAktionen
            ergebnisText={`Laufband ${fmt1(nBand)} km/h @ ${fmtG(ergebnis.grade)} % Steigung entspricht rechnerisch ${fmt2(ergebnis.outKmh)} km/h auf ebener Straße (Pace ${paceStr(ergebnis.outKmh)} min/km)`}
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
