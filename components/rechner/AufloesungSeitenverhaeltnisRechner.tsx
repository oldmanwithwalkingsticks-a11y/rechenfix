'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Seitenverhältnis-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Modus A: gekürztes Verhältnis = Breite/ggT : Höhe/ggT (Euklidischer Algorithmus)
 * - Modus B: fehlende Seite = bekannte Seite × Gegenverhältnis
 * - Standard-Erkennung: gekürztes "rw:rh" gegen Lookup bekannter Formate; sonst nächstliegend per Float.
 */

function ggt(a: number, b: number): number {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

// Gekürztes Verhältnis (rw:rh) → bekanntes Format-Label.
const STANDARD_MAP: Record<string, string> = {
  '16:9': 'Full HD / 4K (TV & Monitor)',
  '21:9': 'Ultrawide',
  '64:27': 'echtes 21:9 (UWQHD, z. B. 2560×1080)',
  '43:18': '21:9-Variante (3440×1440)',
  '4:3': 'klassisch',
  '3:2': 'Fotografie / Surface',
  '16:10': 'Business-Notebook',
  '8:5': '16:10',
  '5:4': '5:4',
  '1:1': 'quadratisch (Instagram)',
  '4:5': 'Instagram-Hochformat',
  '9:16': 'Hochkant (Stories / Reels)',
  '2:1': 'Univisium',
  '32:9': 'Super-Ultrawide',
  '683:384': '≈ 16:9 (gerundetes Panel, z. B. 1366×768)',
};

// Float-Referenzen für den Nächstliegend-Vergleich, wenn kein exakter Map-Treffer.
const NACHBARN = [
  { r: '16:9', f: 16 / 9 }, { r: '16:10', f: 16 / 10 }, { r: '4:3', f: 4 / 3 },
  { r: '3:2', f: 3 / 2 }, { r: '21:9', f: 21 / 9 }, { r: '5:4', f: 5 / 4 },
  { r: '1:1', f: 1 }, { r: '2:1', f: 2 }, { r: '32:9', f: 32 / 9 },
  { r: '9:16', f: 9 / 16 }, { r: '4:5', f: 4 / 5 }, { r: '3:4', f: 3 / 4 },
];

const REFERENZ_ZEILEN: Array<[number, number, string]> = [
  [640, 480, 'VGA'],
  [1280, 720, 'HD (720p)'],
  [1920, 1080, 'Full HD (1080p)'],
  [2560, 1440, 'QHD (1440p)'],
  [3840, 2160, '4K UHD (2160p)'],
  [1366, 768, 'Notebook-Panel'],
  [1920, 1200, 'WUXGA'],
  [2560, 1080, 'UW-FHD (Ultrawide)'],
  [3440, 1440, 'UWQHD (Ultrawide)'],
  [1080, 1920, 'Hochkant (Story)'],
  [1080, 1350, 'Instagram-Hochformat'],
];

function kuerze(b: number, h: number): { ratio: string; rw: number; rh: number } {
  const g = ggt(b, h);
  const rw = Math.round(b) / g;
  const rh = Math.round(h) / g;
  return { ratio: `${rw}:${rh}`, rw, rh };
}

export default function AufloesungSeitenverhaeltnisRechner() {
  const [modus, setModus] = useState<'A' | 'B'>('A');
  // Modus A
  const [breite, setBreite] = useState('1920');
  const [hoehe, setHoehe] = useState('1080');
  // Modus B
  const [vw, setVw] = useState('16');
  const [vh, setVh] = useState('9');
  const [bekannteSeite, setBekannteSeite] = useState<'breite' | 'hoehe'>('breite');
  const [pixelwert, setPixelwert] = useState('1920');

  const nBreite = parseDeutscheZahl(breite);
  const nHoehe = parseDeutscheZahl(hoehe);
  const nVw = parseDeutscheZahl(vw);
  const nVh = parseDeutscheZahl(vh);
  const nPixel = parseDeutscheZahl(pixelwert);

  const ergebnisA = useMemo(() => {
    if (modus !== 'A' || nBreite <= 0 || nHoehe <= 0) return null;
    const g = ggt(nBreite, nHoehe);
    const { ratio, rw, rh } = kuerze(nBreite, nHoehe);
    const label = STANDARD_MAP[ratio] ?? null;
    let naechste: string | null = null;
    if (!label) {
      const f = nBreite / nHoehe;
      naechste = NACHBARN.reduce((best, cur) =>
        Math.abs(cur.f - f) < Math.abs(best.f - f) ? cur : best
      ).r;
    }
    return { g, ratio, rw, rh, label, naechste };
  }, [modus, nBreite, nHoehe]);

  const ergebnisB = useMemo(() => {
    if (modus !== 'B' || nVw <= 0 || nVh <= 0 || nPixel <= 0) return null;
    if (bekannteSeite === 'breite') {
      const hoeheErg = (nPixel * nVh) / nVw;
      return { wert: hoeheErg, label: 'Höhe', formel: `${Math.round(nPixel)} × ${Math.round(nVh)} ÷ ${Math.round(nVw)}` };
    }
    const breiteErg = (nPixel * nVw) / nVh;
    return { wert: breiteErg, label: 'Breite', formel: `${Math.round(nPixel)} × ${Math.round(nVw)} ÷ ${Math.round(nVh)}` };
  }, [modus, nVw, nVh, bekannteSeite, nPixel]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  const copyText = modus === 'A'
    ? (ergebnisA ? `${fmt0(nBreite)} × ${fmt0(nHoehe)} px = Seitenverhältnis ${ergebnisA.ratio}${ergebnisA.label ? ` (${ergebnisA.label})` : ` (nächstliegend: ${ergebnisA.naechste})`}` : '')
    : (ergebnisB ? `Verhältnis ${fmt0(nVw)}:${fmt0(nVh)}, ${bekannteSeite === 'breite' ? 'Breite' : 'Höhe'} ${fmt0(nPixel)} px → ${ergebnisB.label} ${fmt1(ergebnisB.wert)} px` : '');

  return (
    <div>
      {/* Modus */}
      <div className="mb-6">
        <label htmlFor="sv-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was berechnen?</label>
        <select
          id="sv-modus"
          value={modus}
          onChange={(e) => setModus(e.target.value as 'A' | 'B')}
          className="input-field w-full"
        >
          <option value="A">Seitenverhältnis aus Auflösung</option>
          <option value="B">Fehlende Seite aus Verhältnis</option>
        </select>
      </div>

      {modus === 'A' ? (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="sv-breite" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
            <NummerEingabe value={breite} onChange={setBreite} placeholder="1920" einheit="px" />
          </div>
          <div>
            <label htmlFor="sv-hoehe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
            <NummerEingabe value={hoehe} onChange={setHoehe} placeholder="1080" einheit="px" />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="sv-vw" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verhältnis Breite</label>
            <NummerEingabe value={vw} onChange={setVw} placeholder="16" />
          </div>
          <div>
            <label htmlFor="sv-vh" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verhältnis Höhe</label>
            <NummerEingabe value={vh} onChange={setVh} placeholder="9" />
          </div>
          <div>
            <label htmlFor="sv-bekannt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bekannte Seite</label>
            <select
              id="sv-bekannt"
              value={bekannteSeite}
              onChange={(e) => setBekannteSeite(e.target.value as 'breite' | 'hoehe')}
              className="input-field w-full"
            >
              <option value="breite">Breite ist bekannt</option>
              <option value="hoehe">Höhe ist bekannt</option>
            </select>
          </div>
          <div>
            <label htmlFor="sv-pixel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{bekannteSeite === 'breite' ? 'Breite' : 'Höhe'} in Pixeln</label>
            <NummerEingabe value={pixelwert} onChange={setPixelwert} placeholder="1920" einheit="px" />
          </div>
        </div>
      )}

      {modus === 'A' && ergebnisA ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Seitenverhältnis</p>
                <p className="text-5xl font-bold">{ergebnisA.ratio}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nBreite)} × {fmt0(nHoehe)} px
                </span>
                <span className="block text-white/80 text-sm">
                  {ergebnisA.label ?? `nächstliegend: ${ergebnisA.naechste}`}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              ggT({fmt0(nBreite)}, {fmt0(nHoehe)}) = {fmt0(ergebnisA.g)}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nBreite)} ÷ {fmt0(ergebnisA.g)} : {fmt0(nHoehe)} ÷ {fmt0(ergebnisA.g)} = {ergebnisA.ratio}
            </p>
          </div>
        </>
      ) : null}

      {modus === 'B' && ergebnisB ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Fehlende {ergebnisB.label}</p>
                <p className="text-5xl font-bold">{fmt1(ergebnisB.wert)} px</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nVw)}:{fmt0(nVh)}
                </span>
                <span className="block text-white/80 text-sm">
                  {bekannteSeite === 'breite' ? 'Breite' : 'Höhe'} {fmt0(nPixel)} px
                </span>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {ergebnisB.formel} = {fmt1(ergebnisB.wert)} px
            </p>
          </div>
        </>
      ) : null}

      {(ergebnisA || ergebnisB) && (
        <>
          {/* Referenz-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Gängige Auflösungen und ihr Seitenverhältnis</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Auflösung</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Verhältnis</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENZ_ZEILEN.map(([b, h, name]) => {
                    const { ratio } = kuerze(b, h);
                    const aktiv = modus === 'A' && Math.round(nBreite) === b && Math.round(nHoehe) === h;
                    return (
                      <tr key={`${b}x${h}`} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmt0(b)} × {fmt0(h)}</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{ratio}</td>
                        <td className="py-2.5 text-gray-600 dark:text-gray-400">{name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/bildschirmgroesse-ppi-rechner" emoji="🖥️" text="Bildschirmgröße, PPI & Pixeldichte" />
          <CrossLink href="/technik/megapixel-rechner" emoji="📷" text="Megapixel & Druckgröße" />

          <ErgebnisAktionen ergebnisText={copyText} seitenTitel="Seitenverhältnis-Rechner" />
          <AiExplain
            rechnerName="Seitenverhältnis-Rechner"
            eingaben={modus === 'A'
              ? { breitePx: nBreite, hoehePx: nHoehe }
              : { verhaeltnis: `${nVw}:${nVh}`, bekannteSeite, pixelwert: nPixel }}
            ergebnis={modus === 'A'
              ? { seitenverhaeltnis: ergebnisA?.ratio ?? null, format: ergebnisA?.label ?? `nächstliegend ${ergebnisA?.naechste ?? ''}` }
              : { fehlendeSeite: ergebnisB?.label ?? null, pixel: ergebnisB ? Math.round(ergebnisB.wert) : null }}
          />
        </>
      )}

      {!ergebnisA && !ergebnisB && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie eine Auflösung ein, um das Seitenverhältnis zu bestimmen.
        </p>
      )}
    </div>
  );
}
