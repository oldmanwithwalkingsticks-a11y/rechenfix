'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Megapixel-Rechner (Technik-Kategorie).
 *
 * Inline-Logik:
 * - Megapixel = (Breite × Höhe) ÷ 1.000.000
 * - Seitenverhältnis = Breite:Höhe, gekürzt über den größten gemeinsamen Teiler
 * - Druckgröße bei DPI = Pixel ÷ DPI (Zoll), × 2,54 = cm
 */
function ggt(a: number, b: number): number {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

const DPI_STUFEN = [72, 150, 300];

export default function MegapixelRechner() {
  const [breite, setBreite] = useState('6000');
  const [hoehe, setHoehe] = useState('4000');
  const [dpi, setDpi] = useState('300');

  const nB = parseDeutscheZahl(breite);
  const nH = parseDeutscheZahl(hoehe);
  const nDpi = parseDeutscheZahl(dpi);

  const ergebnis = useMemo(() => {
    if (nB <= 0 || nH <= 0) return null;
    const pixel = nB * nH;
    const megapixel = pixel / 1_000_000;
    const g = ggt(nB, nH);
    const ratio = `${Math.round(nB / g)}:${Math.round(nH / g)}`;
    const druck = nDpi > 0
      ? { breiteCm: (nB / nDpi) * 2.54, hoeheCm: (nH / nDpi) * 2.54 }
      : null;
    return { pixel, megapixel, ratio, druck };
  }, [nB, nH, nDpi]);

  const fmtMp = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const fmtCm = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
          <NummerEingabe value={breite} onChange={setBreite} placeholder="6000" einheit="px" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
          <NummerEingabe value={hoehe} onChange={setHoehe} placeholder="4000" einheit="px" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auflösung (Druck)</label>
          <NummerEingabe value={dpi} onChange={setDpi} placeholder="300" einheit="DPI" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Auflösung</p>
                <p className="text-5xl font-bold">{fmtMp(ergebnis.megapixel)} MP</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nB)} × {fmt0(nH)} px
                </span>
                <span className="block text-white/80 text-sm">Seitenverhältnis {ergebnis.ratio}</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nB)} × {fmt0(nH)} ÷ 1.000.000 = {fmtMp(ergebnis.megapixel)} MP
            </p>
            {ergebnis.druck && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                Druck bei {fmt0(nDpi)} DPI: {fmtCm(ergebnis.druck.breiteCm)} × {fmtCm(ergebnis.druck.hoeheCm)} cm
              </p>
            )}
          </div>

          {/* Druckgrößen-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Maximale Druckgröße je Auflösung</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">DPI</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Druckgröße</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Eignung</th>
                  </tr>
                </thead>
                <tbody>
                  {DPI_STUFEN.map((stufe) => {
                    const bCm = (nB / stufe) * 2.54;
                    const hCm = (nH / stufe) * 2.54;
                    const eignung = stufe === 72 ? 'Web / Bildschirm' : stufe === 150 ? 'Großformat / Poster' : 'Fotodruck (scharf)';
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${nDpi === stufe ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{stufe}</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmtCm(bCm)} × {fmtCm(hCm)} cm</td>
                        <td className="py-2.5 text-gray-600 dark:text-gray-400">{eignung}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/datenmengen-umrechner" emoji="💾" text="Dateigröße & Datenmengen umrechnen" />
          <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Längen & Einheiten umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt0(nB)} × ${fmt0(nH)} px = ${fmtMp(ergebnis.megapixel)} MP (Seitenverhältnis ${ergebnis.ratio})`}
            seitenTitel="Megapixel-Rechner"
          />
          <AiExplain
            rechnerName="Megapixel-Rechner"
            eingaben={{ breitePx: nB, hoehePx: nH, dpi: nDpi }}
            ergebnis={{ megapixel: ergebnis.megapixel, seitenverhaeltnis: ergebnis.ratio, druckBreiteCm: ergebnis.druck?.breiteCm ?? null }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Breite und Höhe in Pixeln ein, um Megapixel und Druckgröße zu berechnen.
        </p>
      )}
    </div>
  );
}
