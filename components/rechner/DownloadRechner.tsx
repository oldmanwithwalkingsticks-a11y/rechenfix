'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Download-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Mbit der Datei  = Dateigröße(MB) × 8
 * - Zeit ideal (s)  = Mbit ÷ Bandbreite(Mbit/s)
 * - Zeit real (s)   = Zeit ideal ÷ Wirkungsgrad
 * - Wirkungsgrad-Default 0,85 (≈ 15 % Protokoll-/TCP-IP-Overhead, brutto ≠ netto)
 * - Einheit GB → × 1.000 MB (dezimal, wie Festplatten-/Tarif-Angaben)
 */

const BANDBREITE_STUFEN = [16, 50, 100, 250, 1000];

function formatZeit(sek: number): string {
  if (!isFinite(sek) || sek <= 0) return '0 s';
  if (sek < 60) {
    return `${sek.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;
  }
  if (sek < 3600) {
    const min = Math.floor(sek / 60);
    const s = Math.round(sek - min * 60);
    if (s === 60) return `${min + 1} min 0 s`;
    return `${min} min ${s} s`;
  }
  const h = Math.floor(sek / 3600);
  const min = Math.round((sek - h * 3600) / 60);
  if (min === 60) return `${h + 1} h 0 min`;
  return `${h} h ${min} min`;
}

export default function DownloadRechner() {
  const [groesse, setGroesse] = useState('1500');
  const [einheit, setEinheit] = useState<'MB' | 'GB'>('MB');
  const [bandbreite, setBandbreite] = useState('50');
  const [wirkungsgrad, setWirkungsgrad] = useState('0.85');

  const nGroesse = parseDeutscheZahl(groesse);
  const nBandbreite = parseDeutscheZahl(bandbreite);
  const nWirkungsgrad = parseFloat(wirkungsgrad);

  const ergebnis = useMemo(() => {
    if (nGroesse <= 0 || nBandbreite <= 0 || nWirkungsgrad <= 0) return null;
    const groesseMB = einheit === 'GB' ? nGroesse * 1000 : nGroesse;
    const mbit = groesseMB * 8;
    const idealSek = mbit / nBandbreite;
    const realSek = idealSek / nWirkungsgrad;
    return { groesseMB, mbit, idealSek, realSek };
  }, [nGroesse, einheit, nBandbreite, nWirkungsgrad]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label htmlFor="download-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dateigröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="1500" einheit={einheit} />
        </div>
        <div>
          <label htmlFor="download-einheit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einheit</label>
          <select
            id="download-einheit"
            value={einheit}
            onChange={(e) => setEinheit(e.target.value as 'MB' | 'GB')}
            className="input-field w-full"
          >
            <option value="MB">Megabyte (MB)</option>
            <option value="GB">Gigabyte (GB)</option>
          </select>
        </div>
        <div>
          <label htmlFor="download-bandbreite" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Internetgeschwindigkeit</label>
          <NummerEingabe value={bandbreite} onChange={setBandbreite} placeholder="50" einheit="Mbit/s" />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="download-wirkungsgrad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wirkungsgrad (Overhead)</label>
          <select
            id="download-wirkungsgrad"
            value={wirkungsgrad}
            onChange={(e) => setWirkungsgrad(e.target.value)}
            className="input-field w-full"
          >
            <option value="1">100 % – idealer Wert (theoretisches Maximum)</option>
            <option value="0.85">85 % – realistisch (Standard, ca. 15 % Overhead)</option>
            <option value="0.7">70 % – schwaches WLAN / ausgelasteter Server</option>
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Downloadzeit (realistisch)</p>
                <p className="text-5xl font-bold">{formatZeit(ergebnis.realSek)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(ergebnis.groesseMB)} MB @ {fmt0(nBandbreite)} Mbit/s
                </span>
                <span className="block text-white/80 text-sm">ideal: {formatZeit(ergebnis.idealSek)}</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.groesseMB)} MB × 8 = {fmt0(ergebnis.mbit)} Mbit
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.mbit)} Mbit ÷ {fmt0(nBandbreite)} Mbit/s = {formatZeit(ergebnis.idealSek)} (ideal)
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {formatZeit(ergebnis.idealSek)} ÷ {nWirkungsgrad.toLocaleString('de-DE')} = {formatZeit(ergebnis.realSek)} (real)
            </p>
          </div>

          {/* Geschwindigkeits-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Gleiche Datei bei verschiedenen Geschwindigkeiten</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Anschluss</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Geschwindigkeit</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Downloadzeit (real)</th>
                  </tr>
                </thead>
                <tbody>
                  {BANDBREITE_STUFEN.map((stufe) => {
                    const realSek = (ergebnis.mbit / stufe) / nWirkungsgrad;
                    const aktiv = Math.round(nBandbreite) === stufe;
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{stufe} Mbit/s</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{(stufe / 8).toLocaleString('de-DE', { maximumFractionDigits: 2 })} MB/s</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{formatZeit(realSek)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/internetgeschwindigkeit-rechner" emoji="📶" text="Internetgeschwindigkeit testen & umrechnen" />
          <CrossLink href="/technik/datenmengen-umrechner" emoji="💾" text="Datenmengen umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt0(ergebnis.groesseMB)} MB bei ${fmt0(nBandbreite)} Mbit/s laden ca. ${formatZeit(ergebnis.realSek)} (ideal ${formatZeit(ergebnis.idealSek)})`}
            seitenTitel="Download-Rechner"
          />
          <AiExplain
            rechnerName="Download-Rechner"
            eingaben={{ dateigroesseMB: ergebnis.groesseMB, bandbreiteMbitS: nBandbreite, wirkungsgrad: nWirkungsgrad }}
            ergebnis={{ realeZeitSekunden: Math.round(ergebnis.realSek), idealeZeitSekunden: Math.round(ergebnis.idealSek), mbit: ergebnis.mbit }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Dateigröße und Internetgeschwindigkeit ein, um die Downloadzeit zu berechnen.
        </p>
      )}
    </div>
  );
}
