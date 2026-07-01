'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl, clampInputValue } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * VDOT-Rechner nach Jack Daniels (Sport-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Daniels-Gilbert-Formel:
 * - v (m/min) = Distanz(m) ÷ Zeit(min)
 * - VO2 = −4,60 + 0,182258·v + 0,000104·v²
 * - %max = 0,8 + 0,1894393·e^(−0,012778·t) + 0,2989558·e^(−0,1932605·t)  (t = Zeit in min)
 * - VDOT = VO2 ÷ %max
 * Trainingspaces: Ziel-VO2 = Prozent · VDOT → v per Mitternachtsformel → Pace min/km.
 * Paces werden aus dem EXAKTEN (ungerundeten) VDOT berechnet; nur die Anzeige rundet.
 * Prozentsätze (Daniels-Richtwerte): Easy 70 %, Marathon 84 %, Threshold 88 %, Interval 98 %, Rep 106 %.
 */

const PRESETS: Array<{ key: string; label: string; km: number }> = [
  { key: '5', label: '5 km', km: 5 },
  { key: '10', label: '10 km', km: 10 },
  { key: 'hm', label: 'Halbmarathon (21,0975 km)', km: 21.0975 },
  { key: 'm', label: 'Marathon (42,195 km)', km: 42.195 },
  { key: 'custom', label: 'Eigene Distanz', km: 0 },
];

const ZONEN: Array<{ key: string; label: string; pct: number; desc: string }> = [
  { key: 'E', label: 'Easy (E)', pct: 0.70, desc: 'lockere Dauerläufe, Grundlagenausdauer' },
  { key: 'M', label: 'Marathon (M)', pct: 0.84, desc: 'Marathon-Renntempo, lange Läufe' },
  { key: 'T', label: 'Threshold (T)', pct: 0.88, desc: 'Tempohärte, „komfortabel hart"' },
  { key: 'I', label: 'Interval (I)', pct: 0.98, desc: 'VO2max-Intervalle, 3–5 min' },
  { key: 'R', label: 'Rep (R)', pct: 1.06, desc: 'Schnelligkeit, kurze Wiederholungen' },
];

const AEQUIVALENZ: Array<{ label: string; km: number }> = [
  { label: '5 km', km: 5 },
  { label: '10 km', km: 10 },
  { label: 'Halbmarathon', km: 21.0975 },
  { label: 'Marathon', km: 42.195 },
];

function vo2FromV(v: number): number {
  return -4.60 + 0.182258 * v + 0.000104 * v * v;
}
function pctMax(t: number): number {
  return 0.8 + 0.1894393 * Math.exp(-0.012778 * t) + 0.2989558 * Math.exp(-0.1932605 * t);
}
// v (m/min) aus einer Ziel-VO2 via Mitternachtsformel.
function vFromVo2(zielVo2: number): number {
  const disc = 0.182258 ** 2 - 4 * 0.000104 * (-4.60 - zielVo2);
  if (disc < 0) return 0;
  return (-0.182258 + Math.sqrt(disc)) / (2 * 0.000104);
}

function paceStr(secPerKm: number): string {
  if (!isFinite(secPerKm) || secPerKm <= 0) return '—';
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm - m * 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function zeitStr(sek: number): string {
  if (!isFinite(sek) || sek <= 0) return '—';
  const h = Math.floor(sek / 3600);
  const m = Math.floor((sek % 3600) / 60);
  const s = Math.round(sek % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function einordnung(vdot: number): string {
  if (vdot < 35) return 'Einsteiger-Niveau';
  if (vdot < 45) return 'solides Freizeitläufer-Niveau';
  if (vdot < 55) return 'ambitioniertes Niveau';
  if (vdot < 65) return 'Wettkampf-Niveau';
  return 'Leistungssport-Niveau';
}

export default function VdotRechner() {
  const [preset, setPreset] = useState('10');
  const [customDist, setCustomDist] = useState('10');
  const [stunden, setStunden] = useState('0');
  const [minuten, setMinuten] = useState('50');
  const [sekunden, setSekunden] = useState('0');

  const distKm = preset === 'custom'
    ? parseDeutscheZahl(customDist)
    : (PRESETS.find((p) => p.key === preset)?.km ?? 0);

  const ergebnis = useMemo(() => {
    const zeitSek = (parseInt(stunden, 10) || 0) * 3600 + (parseInt(minuten, 10) || 0) * 60 + (parseInt(sekunden, 10) || 0);
    const zeitMin = zeitSek / 60;
    if (distKm <= 0 || zeitMin <= 0) return null;
    const v = (distKm * 1000) / zeitMin;
    const vo2 = vo2FromV(v);
    const pmax = pctMax(zeitMin);
    const vdot = vo2 / pmax;
    if (!isFinite(vdot) || vdot <= 0) return null;

    // Trainingspaces aus dem exakten VDOT.
    const paces = ZONEN.map((z) => {
      const vZone = vFromVo2(z.pct * vdot);
      const secPerKm = vZone > 0 ? (1000 / vZone) * 60 : 0;
      return { ...z, secPerKm };
    });

    // Äquivalente Rennzeiten: Binärsuche über die Zeit, bis der VDOT passt.
    const aequiv = AEQUIVALENZ.map((a) => {
      let lo = 2, hi = 600;
      for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        const vMid = (a.km * 1000) / mid;
        const vdotMid = vo2FromV(vMid) / pctMax(mid);
        // längere Zeit → kleinerer VDOT
        if (vdotMid > vdot) lo = mid; else hi = mid;
      }
      return { ...a, zeitSek: ((lo + hi) / 2) * 60 };
    });

    return { v, vo2, pmax, vdot, paces, aequiv, zeitMin };
  }, [distKm, stunden, minuten, sekunden]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="vdot-preset" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wettkampf-Distanz</label>
          <select id="vdot-preset" value={preset} onChange={(e) => setPreset(e.target.value)} className="input-field w-full">
            {PRESETS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
        {preset === 'custom' && (
          <div>
            <label htmlFor="vdot-customdist" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigene Distanz</label>
            <NummerEingabe value={customDist} onChange={setCustomDist} placeholder="10" einheit="km" />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gelaufene Zeit</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="vdot-std" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Stunden</label>
            <input id="vdot-std" type="number" min="0" max="99" value={stunden}
              onChange={(e) => setStunden(clampInputValue(e.target.value, 0, 99))}
              className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center" />
          </div>
          <div>
            <label htmlFor="vdot-min" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Minuten</label>
            <input id="vdot-min" type="number" min="0" max="59" value={minuten}
              onChange={(e) => setMinuten(clampInputValue(e.target.value, 0, 59))}
              className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center" />
          </div>
          <div>
            <label htmlFor="vdot-sek" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Sekunden</label>
            <input id="vdot-sek" type="number" min="0" max="59" value={sekunden}
              onChange={(e) => setSekunden(clampInputValue(e.target.value, 0, 59))}
              className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center" />
          </div>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Dein VDOT-Wert</p>
                <p className="text-5xl font-bold">{fmt1(ergebnis.vdot)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(distKm * 1000)} m in {zeitStr(ergebnis.zeitMin * 60)}
                </span>
                <span className="block text-white/80 text-sm">{einordnung(ergebnis.vdot)}</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              v = {fmt0(distKm * 1000)} m ÷ {fmt2(ergebnis.zeitMin)} min = {fmt1(ergebnis.v)} m/min
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              VO2 = {fmt1(ergebnis.vo2)} · %max = {fmt2(ergebnis.pmax)} → VDOT = {fmt1(ergebnis.vdot)}
            </p>
          </div>

          {/* Trainingspaces */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Deine Trainingspaces (Richtwerte nach Daniels)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Zone</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Pace</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Zweck</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.paces.map((z) => (
                    <tr key={z.key} className="border-b border-gray-100 dark:border-gray-600/50">
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 font-medium">{z.label}</td>
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{paceStr(z.secPerKm)} min/km</td>
                      <td className="py-2.5 text-gray-600 dark:text-gray-400">{z.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Äquivalenz */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Was dein VDOT für andere Distanzen bedeutet</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Distanz</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Prognostizierte Zeit</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.aequiv.map((a) => {
                    const aktiv = Math.abs(a.km - distKm) < 0.01;
                    return (
                      <tr key={a.label} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{a.label}</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{zeitStr(a.zeitSek)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Prognose bei gleichem Trainingszustand — längere Distanzen setzen spezifische Ausdauer voraus.
            </p>
          </div>

          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Pace, Zeit & Distanz umrechnen" />
          <CrossLink href="/sport/vo2max-rechner" emoji="❤️" text="VO2max direkt schätzen" />

          <ErgebnisAktionen
            ergebnisText={`VDOT ${fmt1(ergebnis.vdot)} (${fmt0(distKm * 1000)} m in ${zeitStr(ergebnis.zeitMin * 60)}) — Threshold ${paceStr(ergebnis.paces[2].secPerKm)} min/km, Easy ${paceStr(ergebnis.paces[0].secPerKm)} min/km`}
            seitenTitel="VDOT-Rechner"
          />
          <AiExplain
            rechnerName="VDOT-Rechner"
            eingaben={{ distanzKm: distKm, zeit: zeitStr(ergebnis.zeitMin * 60) }}
            ergebnis={{ vdot: Number(ergebnis.vdot.toFixed(1)), thresholdPace: `${paceStr(ergebnis.paces[2].secPerKm)} min/km`, easyPace: `${paceStr(ergebnis.paces[0].secPerKm)} min/km` }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Distanz und gelaufene Zeit ein, um den VDOT-Wert zu berechnen.
        </p>
      )}
    </div>
  );
}
