'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * FTP-Rechner (Functional Threshold Power, Radfahren; Sport-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Coggan/Allen:
 * - FTP = Test-Ø-Leistung × Protokoll-Faktor (20-min 0,95 · 8-min 0,90 · Ramp-Peak-1-min 0,75 · bekannt 1,00)
 * - W/kg = FTP ÷ Körpergewicht
 * - Coggan-7-Zonen als Prozentbereiche der FTP.
 */

const PROTOKOLLE: Array<{ key: string; label: string; faktor: number }> = [
  { key: '20', label: '20-Minuten-Test (× 0,95)', faktor: 0.95 },
  { key: '8', label: '8-Minuten-Test (× 0,90)', faktor: 0.90 },
  { key: 'ramp', label: 'Ramp-Test, Peak 1 min (× 0,75)', faktor: 0.75 },
  { key: 'ftp', label: 'FTP direkt bekannt (× 1,00)', faktor: 1.00 },
];

const ZONEN: Array<{ key: string; label: string; lo: number; hi: number; zweck: string }> = [
  { key: 'Z1', label: 'Z1 Aktive Erholung', lo: 0, hi: 0.55, zweck: 'sehr locker, Regeneration' },
  { key: 'Z2', label: 'Z2 Grundlagenausdauer', lo: 0.55, hi: 0.75, zweck: 'lange Fahrten, Fettstoffwechsel' },
  { key: 'Z3', label: 'Z3 Tempo', lo: 0.75, hi: 0.90, zweck: 'zügiges Dauertempo' },
  { key: 'Z4', label: 'Z4 Schwelle (FTP)', lo: 0.90, hi: 1.05, zweck: 'an der Laktatschwelle' },
  { key: 'Z5', label: 'Z5 VO2max', lo: 1.05, hi: 1.20, zweck: 'harte Intervalle, 3–5 min' },
  { key: 'Z6', label: 'Z6 Anaerob', lo: 1.20, hi: 1.50, zweck: 'kurze, intensive Anstrengungen' },
  { key: 'Z7', label: 'Z7 Neuromuskulär', lo: 1.50, hi: 2.00, zweck: 'Sprints, maximale Leistung' },
];

function einordnung(wkg: number): string {
  if (wkg <= 0) return '';
  if (wkg < 2.5) return 'Einsteiger-Niveau';
  if (wkg < 3.5) return 'gutes Freizeit-Niveau';
  if (wkg < 4.5) return 'ambitioniertes Niveau';
  return 'Rennfahrer-Niveau';
}

export default function FtpRechner() {
  const [protokoll, setProtokoll] = useState('20');
  const [leistung, setLeistung] = useState('260');
  const [gewicht, setGewicht] = useState('75');

  const nLeistung = parseDeutscheZahl(leistung);
  const nGewicht = parseDeutscheZahl(gewicht);
  const faktor = PROTOKOLLE.find((p) => p.key === protokoll)?.faktor ?? 0.95;

  const ergebnis = useMemo(() => {
    if (nLeistung <= 0) return null;
    const ftp = Math.round(nLeistung * faktor);
    const wkg = nGewicht > 0 ? ftp / nGewicht : 0;
    const zonen = ZONEN.map((z) => ({
      ...z,
      loW: Math.round(ftp * z.lo),
      hiW: Math.round(ftp * z.hi),
    }));
    return { ftp, wkg, zonen };
  }, [nLeistung, faktor, nGewicht]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="sm:col-span-2">
          <label htmlFor="ftp-protokoll" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test-Protokoll</label>
          <select id="ftp-protokoll" value={protokoll} onChange={(e) => setProtokoll(e.target.value)} className="input-field w-full">
            {PROTOKOLLE.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ftp-leistung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {protokoll === 'ramp' ? 'Höchste 1-Minuten-Leistung' : protokoll === 'ftp' ? 'Bekannte FTP' : 'Durchschnittsleistung im Test'}
          </label>
          <NummerEingabe value={leistung} onChange={setLeistung} placeholder="260" einheit="W" />
        </div>
        <div>
          <label htmlFor="ftp-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht (für W/kg)</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Deine FTP</p>
                <p className="text-5xl font-bold">{fmt0(ergebnis.ftp)} W</p>
              </div>
              <div className="sm:text-right space-y-1">
                {ergebnis.wkg > 0 && (
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {fmt2(ergebnis.wkg)} W/kg
                  </span>
                )}
                {ergebnis.wkg > 0 && <span className="block text-white/80 text-sm">{einordnung(ergebnis.wkg)}</span>}
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nLeistung)} W × {faktor.toLocaleString('de-DE')} = {fmt0(ergebnis.ftp)} W
            </p>
            {ergebnis.wkg > 0 && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(ergebnis.ftp)} W ÷ {fmt0(nGewicht)} kg = {fmt2(ergebnis.wkg)} W/kg
              </p>
            )}
          </div>

          {/* Zonen-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Deine 7 Trainingszonen (Coggan)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Zone</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Watt</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Zweck</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.zonen.map((z) => (
                    <tr key={z.key} className="border-b border-gray-100 dark:border-gray-600/50">
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 font-medium">{z.label}</td>
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(z.loW)}–{fmt0(z.hiW)} W</td>
                      <td className="py-2.5 text-gray-600 dark:text-gray-400">{z.zweck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="❤️" text="Herzfrequenz-Trainingszonen berechnen" />
          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch beim Radfahren" />

          <ErgebnisAktionen
            ergebnisText={`FTP ${fmt0(ergebnis.ftp)} W${ergebnis.wkg > 0 ? ` (${fmt2(ergebnis.wkg)} W/kg)` : ''} — Schwellenzone Z4: ${fmt0(ergebnis.zonen[3].loW)}–${fmt0(ergebnis.zonen[3].hiW)} W`}
            seitenTitel="FTP-Rechner"
          />
          <AiExplain
            rechnerName="FTP-Rechner"
            eingaben={{ protokoll: PROTOKOLLE.find((p) => p.key === protokoll)?.label ?? '', testleistungW: nLeistung, gewichtKg: nGewicht }}
            ergebnis={{ ftpW: ergebnis.ftp, wkg: ergebnis.wkg > 0 ? Number(ergebnis.wkg.toFixed(2)) : null, schwelleZ4: `${ergebnis.zonen[3].loW}–${ergebnis.zonen[3].hiW} W` }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Ihre Testleistung ein, um die FTP und die Trainingszonen zu berechnen.
        </p>
      )}
    </div>
  );
}
