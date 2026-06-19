'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Bildschirmgröße- & PPI-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (Pythagoras):
 * - Diagonale in cm = Zoll × 2,54
 * - Diagonale in Pixeln = √(Breite² + Höhe²)
 * - PPI = Diagonale in Pixeln ÷ Diagonale in Zoll
 * - physische Breite/Höhe = (Pixel ÷ PPI) × 2,54  (cm)
 */
function ggt(a: number, b: number): number {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export default function BildschirmgroessePpiRechner() {
  const [zoll, setZoll] = useState('27');
  const [breitePx, setBreitePx] = useState('3840');
  const [hoehePx, setHoehePx] = useState('2160');

  const nZoll = parseDeutscheZahl(zoll);
  const nB = parseDeutscheZahl(breitePx);
  const nH = parseDeutscheZahl(hoehePx);

  const ergebnis = useMemo(() => {
    if (nZoll <= 0 || nB <= 0 || nH <= 0) return null;
    const diagCm = nZoll * 2.54;
    const diagPx = Math.sqrt(nB * nB + nH * nH);
    const ppi = diagPx / nZoll;
    const breiteCm = (nB / ppi) * 2.54;
    const hoeheCm = (nH / ppi) * 2.54;
    const g = ggt(nB, nH);
    const ratio = `${Math.round(nB / g)}:${Math.round(nH / g)}`;
    return { diagCm, diagPx, ppi, breiteCm, hoeheCm, ratio };
  }, [nZoll, nB, nH]);

  const f1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const f0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Diagonale</label>
          <NummerEingabe value={zoll} onChange={setZoll} placeholder="27" einheit="Zoll" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite (Auflösung)</label>
          <NummerEingabe value={breitePx} onChange={setBreitePx} placeholder="3840" einheit="px" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe (Auflösung)</label>
          <NummerEingabe value={hoehePx} onChange={setHoehePx} placeholder="2160" einheit="px" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Pixeldichte</p>
                <p className="text-5xl font-bold">{f0(ergebnis.ppi)} PPI</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Diagonale {f1(ergebnis.diagCm)} cm
                </span>
                <span className="block text-white/80 text-sm">
                  {f1(ergebnis.breiteCm)} × {f1(ergebnis.hoeheCm)} cm · {ergebnis.ratio}
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {f0(nZoll)} Zoll × 2,54 = {f1(ergebnis.diagCm)} cm (Diagonale)
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm break-words">
              √({f0(nB)}² + {f0(nH)}²) ÷ {f0(nZoll)} = {f0(ergebnis.ppi)} PPI
            </p>
          </div>

          <CrossLink href="/technik/megapixel-rechner" emoji="📷" text="Megapixel & Druckgröße berechnen" />
          <CrossLink href="/mathe/pythagoras-rechner" emoji="📐" text="Satz des Pythagoras berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${f0(nZoll)} Zoll (${f1(ergebnis.diagCm)} cm), ${f0(nB)} × ${f0(nH)} px: ${f0(ergebnis.ppi)} PPI, Fläche ${f1(ergebnis.breiteCm)} × ${f1(ergebnis.hoeheCm)} cm`}
            seitenTitel="Bildschirmgröße- & PPI-Rechner"
          />
          <AiExplain
            rechnerName="Bildschirmgröße- & PPI-Rechner"
            eingaben={{ diagonaleZoll: nZoll, breitePx: nB, hoehePx: nH }}
            ergebnis={{ ppi: ergebnis.ppi, diagonaleCm: ergebnis.diagCm, breiteCm: ergebnis.breiteCm, hoeheCm: ergebnis.hoeheCm, seitenverhaeltnis: ergebnis.ratio }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Diagonale (Zoll) und Auflösung (Pixel) ein, um PPI und Maße zu berechnen.
        </p>
      )}
    </div>
  );
}
