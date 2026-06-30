'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * DPI-/Druckgröße-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), 1 Zoll = 2,54 cm:
 * - Modus A: Druckgröße (cm) = Pixel ÷ DPI × 2,54
 * - Modus B: Nötige Pixel = Druckgröße(cm) ÷ 2,54 × DPI (gerundet)
 * - DPI ist keine Bildeigenschaft, sondern die Druckdichte: dasselbe Pixelbild
 *   ist bei 72 dpi riesig und grob, bei 300 dpi klein und scharf.
 */

const ZOLL_CM = 2.54;
const DPI_STUFEN = [72, 150, 200, 300];

function qualitaet(dpi: number): string {
  if (dpi >= 300) return 'Fotodruck / Hochglanz';
  if (dpi >= 150) return 'guter Druck / Poster aus Distanz';
  if (dpi >= 72) return 'Bildschirm / Großflächenwerbung';
  return 'nur Web / Vorschau';
}

export default function DpiDruckRechner() {
  const [modus, setModus] = useState<'A' | 'B'>('A');
  // Modus A
  const [breitePx, setBreitePx] = useState('6000');
  const [hoehePx, setHoehePx] = useState('4000');
  // Modus B
  const [breiteCm, setBreiteCm] = useState('21');
  const [hoeheCm, setHoeheCm] = useState('29,7');
  // gemeinsam
  const [dpi, setDpi] = useState('300');

  const nBreitePx = parseDeutscheZahl(breitePx);
  const nHoehePx = parseDeutscheZahl(hoehePx);
  const nBreiteCm = parseDeutscheZahl(breiteCm);
  const nHoeheCm = parseDeutscheZahl(hoeheCm);
  const nDpi = parseDeutscheZahl(dpi);

  const ergebnisA = useMemo(() => {
    if (modus !== 'A' || nBreitePx <= 0 || nHoehePx <= 0 || nDpi <= 0) return null;
    const bCm = (nBreitePx / nDpi) * ZOLL_CM;
    const hCm = (nHoehePx / nDpi) * ZOLL_CM;
    return { bCm, hCm };
  }, [modus, nBreitePx, nHoehePx, nDpi]);

  const ergebnisB = useMemo(() => {
    if (modus !== 'B' || nBreiteCm <= 0 || nHoeheCm <= 0 || nDpi <= 0) return null;
    const bPx = Math.round((nBreiteCm / ZOLL_CM) * nDpi);
    const hPx = Math.round((nHoeheCm / ZOLL_CM) * nDpi);
    const mp = (bPx * hPx) / 1_000_000;
    return { bPx, hPx, mp };
  }, [modus, nBreiteCm, nHoeheCm, nDpi]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmtCm = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const fmtMp = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  const copyText = modus === 'A'
    ? (ergebnisA ? `${fmt0(nBreitePx)} × ${fmt0(nHoehePx)} px @ ${fmt0(nDpi)} dpi = ${fmtCm(ergebnisA.bCm)} × ${fmtCm(ergebnisA.hCm)} cm (${qualitaet(nDpi)})` : '')
    : (ergebnisB ? `${fmtCm(nBreiteCm)} × ${fmtCm(nHoeheCm)} cm @ ${fmt0(nDpi)} dpi = ${fmt0(ergebnisB.bPx)} × ${fmt0(ergebnisB.hPx)} px (${fmtMp(ergebnisB.mp)} MP)` : '');

  return (
    <div>
      {/* Modus */}
      <div className="mb-6">
        <label htmlFor="dpi-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was berechnen?</label>
        <select
          id="dpi-modus"
          value={modus}
          onChange={(e) => setModus(e.target.value as 'A' | 'B')}
          className="input-field w-full"
        >
          <option value="A">Druckgröße aus Pixeln</option>
          <option value="B">Nötige Pixel aus Druckformat</option>
        </select>
      </div>

      {modus === 'A' ? (
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div>
            <label htmlFor="dpi-breite-px" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
            <NummerEingabe value={breitePx} onChange={setBreitePx} placeholder="6000" einheit="px" />
          </div>
          <div>
            <label htmlFor="dpi-hoehe-px" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
            <NummerEingabe value={hoehePx} onChange={setHoehePx} placeholder="4000" einheit="px" />
          </div>
          <div>
            <label htmlFor="dpi-wert-a" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auflösung</label>
            <select id="dpi-wert-a" value={dpi} onChange={(e) => setDpi(e.target.value)} className="input-field w-full">
              <option value="72">72 dpi – Web</option>
              <option value="150">150 dpi – Standard / Poster</option>
              <option value="200">200 dpi – guter Druck</option>
              <option value="300">300 dpi – Fotodruck</option>
              <option value="600">600 dpi – Premium</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div>
            <label htmlFor="dpi-breite-cm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
            <NummerEingabe value={breiteCm} onChange={setBreiteCm} placeholder="21" einheit="cm" />
          </div>
          <div>
            <label htmlFor="dpi-hoehe-cm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
            <NummerEingabe value={hoeheCm} onChange={setHoeheCm} placeholder="29,7" einheit="cm" />
          </div>
          <div>
            <label htmlFor="dpi-wert-b" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auflösung</label>
            <select id="dpi-wert-b" value={dpi} onChange={(e) => setDpi(e.target.value)} className="input-field w-full">
              <option value="72">72 dpi – Web</option>
              <option value="150">150 dpi – Standard / Poster</option>
              <option value="200">200 dpi – guter Druck</option>
              <option value="300">300 dpi – Fotodruck</option>
              <option value="600">600 dpi – Premium</option>
            </select>
          </div>
        </div>
      )}

      {modus === 'A' && ergebnisA ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Druckgröße</p>
                <p className="text-5xl font-bold">{fmtCm(ergebnisA.bCm)} × {fmtCm(ergebnisA.hCm)} cm</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nBreitePx)} × {fmt0(nHoehePx)} px
                </span>
                <span className="block text-white/80 text-sm">{fmt0(nDpi)} dpi — {qualitaet(nDpi)}</span>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nBreitePx)} ÷ {fmt0(nDpi)} × 2,54 = {fmtCm(ergebnisA.bCm)} cm
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nHoehePx)} ÷ {fmt0(nDpi)} × 2,54 = {fmtCm(ergebnisA.hCm)} cm
            </p>
          </div>
        </>
      ) : null}

      {modus === 'B' && ergebnisB ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Nötige Auflösung</p>
                <p className="text-5xl font-bold">{fmt0(ergebnisB.bPx)} × {fmt0(ergebnisB.hPx)} px</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmtCm(nBreiteCm)} × {fmtCm(nHoeheCm)} cm @ {fmt0(nDpi)} dpi
                </span>
                <span className="block text-white/80 text-sm">{fmtMp(ergebnisB.mp)} Megapixel</span>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmtCm(nBreiteCm)} ÷ 2,54 × {fmt0(nDpi)} = {fmt0(ergebnisB.bPx)} px
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmtCm(nHoeheCm)} ÷ 2,54 × {fmt0(nDpi)} = {fmt0(ergebnisB.hPx)} px
            </p>
          </div>
        </>
      ) : null}

      {(ergebnisA || ergebnisB) && (
        <>
          {/* DPI-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Gleiche Pixelbreite bei verschiedenen DPI</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Auflösung</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Druckbreite</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Eignung</th>
                  </tr>
                </thead>
                <tbody>
                  {DPI_STUFEN.map((stufe) => {
                    const referenzPx = modus === 'A' ? nBreitePx : 6000;
                    const bCm = (referenzPx / stufe) * ZOLL_CM;
                    const aktiv = Math.round(nDpi) === stufe;
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{stufe} dpi</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmtCm(bCm)} cm</td>
                        <td className="py-2.5 text-gray-600 dark:text-gray-400">{qualitaet(stufe)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {modus === 'A' ? `Bezogen auf ${fmt0(nBreitePx)} px Breite.` : 'Bezogen auf 6.000 px Breite.'} Mehr DPI = kleinerer, schärferer Druck.
            </p>
          </div>

          <CrossLink href="/technik/megapixel-rechner" emoji="📷" text="Megapixel & Auflösung berechnen" />
          <CrossLink href="/technik/aufloesung-seitenverhaeltnis-rechner" emoji="📐" text="Seitenverhältnis berechnen" />

          <ErgebnisAktionen ergebnisText={copyText} seitenTitel="DPI-Rechner & Druckgröße" />
          <AiExplain
            rechnerName="DPI-Rechner & Druckgröße"
            eingaben={modus === 'A'
              ? { breitePx: nBreitePx, hoehePx: nHoehePx, dpi: nDpi }
              : { breiteCm: nBreiteCm, hoeheCm: nHoeheCm, dpi: nDpi }}
            ergebnis={modus === 'A'
              ? { breiteCm: ergebnisA ? Number(ergebnisA.bCm.toFixed(1)) : null, hoeheCm: ergebnisA ? Number(ergebnisA.hCm.toFixed(1)) : null, qualitaet: qualitaet(nDpi) }
              : { breitePx: ergebnisB?.bPx ?? null, hoehePx: ergebnisB?.hPx ?? null, megapixel: ergebnisB ? Number(ergebnisB.mp.toFixed(1)) : null }}
          />
        </>
      )}

      {!ergebnisA && !ergebnisB && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Pixelmaße und DPI ein, um die Druckgröße zu berechnen.
        </p>
      )}
    </div>
  );
}
