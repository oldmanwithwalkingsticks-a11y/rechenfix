'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Video-Dateigröße-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Größe (MB) = Bitrate(Mbit/s) × Länge(Sekunden) ÷ 8
 * - Länge aus Minuten: min × 60 = Sekunden
 * Die ÷8 stammt aus der Umrechnung Bit → Byte (1 Byte = 8 Bit).
 * Die Auflösung wirkt nur indirekt über die typische Bitrate.
 */

// Auflösungs-Profil → typische Bitrate (Mbit/s), Richtwerte für H.264/H.265-Streaming.
const PROFILE: Array<{ key: string; label: string; bitrate: number }> = [
  { key: '720p', label: '720p (HD) – 5 Mbit/s', bitrate: 5 },
  { key: '1080p', label: '1080p (Full HD) – 8 Mbit/s', bitrate: 8 },
  { key: '1080p60', label: '1080p60 – 12 Mbit/s', bitrate: 12 },
  { key: '1440p', label: '1440p (QHD) – 16 Mbit/s', bitrate: 16 },
  { key: '4k', label: '4K – 45 Mbit/s', bitrate: 45 },
  { key: '4k60', label: '4K60 – 68 Mbit/s', bitrate: 68 },
  { key: '8k', label: '8K – 100 Mbit/s', bitrate: 100 },
  { key: 'custom', label: 'Eigene Bitrate', bitrate: 0 },
];

const TABELLE_PROFILE = PROFILE.filter((p) => p.key !== 'custom');

function formatGroesse(mb: number): string {
  if (mb < 1000) return `${mb.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`;
  return `${(mb / 1000).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} GB`;
}

export default function VideoDateigroesseRechner() {
  const [bitrate, setBitrate] = useState('8');
  const [profil, setProfil] = useState('1080p');
  const [laenge, setLaenge] = useState('10');
  const [einheit, setEinheit] = useState<'min' | 's'>('min');

  const nBitrate = parseDeutscheZahl(bitrate);
  const nLaenge = parseDeutscheZahl(laenge);

  const handleProfil = (key: string) => {
    setProfil(key);
    const p = PROFILE.find((x) => x.key === key);
    if (p && p.bitrate > 0) setBitrate(String(p.bitrate));
  };

  const ergebnis = useMemo(() => {
    const sekunden = einheit === 'min' ? nLaenge * 60 : nLaenge;
    if (nBitrate <= 0 || sekunden <= 0) return null;
    const mb = (nBitrate * sekunden) / 8;
    return { sekunden, mb };
  }, [nBitrate, nLaenge, einheit]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  // „Passt auf …"-Einordnung gegen gängige Kartengrößen.
  const passtAuf = useMemo(() => {
    if (!ergebnis) return null;
    const gb = ergebnis.mb / 1000;
    const karten = [16, 32, 64, 128];
    const karte = karten.find((k) => gb <= k) ?? 256;
    const anzahl = Math.floor(karte / Math.max(gb, 0.001));
    if (anzahl >= 2) return `passt rund ${anzahl}× auf eine ${karte}-GB-Karte`;
    return `füllt rund ${Math.round((gb / karte) * 100)} % einer ${karte}-GB-Karte`;
  }, [ergebnis]);

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="vid-profil" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auflösung / Profil</label>
          <select id="vid-profil" value={profil} onChange={(e) => handleProfil(e.target.value)} className="input-field w-full">
            {PROFILE.map((p) => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vid-bitrate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bitrate</label>
          <NummerEingabe value={bitrate} onChange={(v) => { setBitrate(v); setProfil('custom'); }} placeholder="8" einheit="Mbit/s" />
        </div>
        <div>
          <label htmlFor="vid-laenge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge</label>
          <NummerEingabe value={laenge} onChange={setLaenge} placeholder="10" einheit={einheit} />
        </div>
        <div>
          <label htmlFor="vid-einheit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zeiteinheit</label>
          <select id="vid-einheit" value={einheit} onChange={(e) => setEinheit(e.target.value as 'min' | 's')} className="input-field w-full">
            <option value="min">Minuten</option>
            <option value="s">Sekunden</option>
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Dateigröße</p>
                <p className="text-5xl font-bold">{formatGroesse(ergebnis.mb)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nBitrate)} Mbit/s · {fmt0(nLaenge)} {einheit}
                </span>
                {passtAuf && <span className="block text-white/80 text-sm">{passtAuf}</span>}
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            {einheit === 'min' && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(nLaenge)} min × 60 = {fmt0(ergebnis.sekunden)} s
              </p>
            )}
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nBitrate)} Mbit/s × {fmt0(ergebnis.sekunden)} s ÷ 8 = {formatGroesse(ergebnis.mb)}
            </p>
          </div>

          {/* Auflösungs-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">10-Minuten-Clip je Auflösung</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Auflösung</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Bitrate</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Größe (10 min)</th>
                  </tr>
                </thead>
                <tbody>
                  {TABELLE_PROFILE.map((p) => {
                    const mb = (p.bitrate * 600) / 8;
                    const aktiv = profil === p.key;
                    return (
                      <tr key={p.key} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{p.label.split(' – ')[0]}</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{p.bitrate} Mbit/s</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{formatGroesse(mb)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/download-rechner" emoji="⬇️" text="Download-Zeit für diese Datei berechnen" />
          <CrossLink href="/technik/datenmengen-umrechner" emoji="💾" text="Datenmengen umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`Video mit ${fmt0(nBitrate)} Mbit/s und ${fmt0(nLaenge)} ${einheit} ist rund ${formatGroesse(ergebnis.mb)} groß`}
            seitenTitel="Video-Dateigröße-Rechner"
          />
          <AiExplain
            rechnerName="Video-Dateigröße-Rechner"
            eingaben={{ bitrateMbitS: nBitrate, laengeSekunden: ergebnis.sekunden, profil }}
            ergebnis={{ groesseMB: Number(ergebnis.mb.toFixed(1)), groesseGB: Number((ergebnis.mb / 1000).toFixed(2)) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Bitrate und Länge ein, um die Video-Dateigröße zu berechnen.
        </p>
      )}
    </div>
  );
}
