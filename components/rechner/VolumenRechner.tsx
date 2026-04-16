'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Koerper = 'quader' | 'zylinder' | 'kugel' | 'kegel' | 'pyramide' | 'prisma' | 'halbkugel';

const KOERPER: { id: Koerper; emoji: string; name: string }[] = [
  { id: 'quader', emoji: '📦', name: 'Quader/Würfel' },
  { id: 'zylinder', emoji: '🥫', name: 'Zylinder' },
  { id: 'kugel', emoji: '⚽', name: 'Kugel' },
  { id: 'kegel', emoji: '🔺', name: 'Kegel' },
  { id: 'pyramide', emoji: '🔻', name: 'Pyramide' },
  { id: 'prisma', emoji: '💎', name: 'Prisma' },
  { id: 'halbkugel', emoji: '⬡', name: 'Halbkugel' },
];

export default function VolumenRechner() {
  const [koerper, setKoerper] = useState<Koerper>('quader');
  const [einheit, setEinheit] = useState('cm');

  // Quader
  const [qa, setQa] = useState('5');
  const [qb, setQb] = useState('3');
  const [qc, setQc] = useState('4');
  // Zylinder
  const [zr, setZr] = useState('3');
  const [zh, setZh] = useState('8');
  // Kugel / Halbkugel
  const [kr, setKr] = useState('5');
  // Kegel
  const [ker, setKer] = useState('4');
  const [keh, setKeh] = useState('7');
  // Pyramide
  const [pa, setPa] = useState('5');
  const [ph, setPh] = useState('6');
  // Prisma
  const [pra, setPra] = useState('4');
  const [prhd, setPrhd] = useState('3');
  const [prl, setPrl] = useState('8');

  const ergebnis = useMemo(() => {
    const PI = Math.PI;
    let volumen = 0;
    let oberflaeche = 0;
    let diagonale: number | null = null;
    let formelV = '';
    let formelO = '';
    let rechnungV = '';

    if (koerper === 'quader') {
      const a = parseDeutscheZahl(qa);
      const b = parseDeutscheZahl(qb);
      const c = parseDeutscheZahl(qc);
      volumen = a * b * c;
      oberflaeche = 2 * (a * b + a * c + b * c);
      diagonale = Math.sqrt(a * a + b * b + c * c);
      formelV = 'V = a × b × c';
      formelO = 'O = 2(ab + ac + bc)';
      rechnungV = `${a} × ${b} × ${c} = ${volumen}`;
    } else if (koerper === 'zylinder') {
      const r = parseDeutscheZahl(zr);
      const h = parseDeutscheZahl(zh);
      volumen = PI * r * r * h;
      oberflaeche = 2 * PI * r * (r + h);
      formelV = 'V = π × r² × h';
      formelO = 'O = 2πr(r + h)';
      rechnungV = `π × ${r}² × ${h} = ${volumen.toFixed(2)}`;
    } else if (koerper === 'kugel') {
      const r = parseDeutscheZahl(kr);
      volumen = (4 / 3) * PI * r * r * r;
      oberflaeche = 4 * PI * r * r;
      formelV = 'V = (4/3) × π × r³';
      formelO = 'O = 4πr²';
      rechnungV = `(4/3) × π × ${r}³ = ${volumen.toFixed(2)}`;
    } else if (koerper === 'kegel') {
      const r = parseDeutscheZahl(ker);
      const h = parseDeutscheZahl(keh);
      volumen = (1 / 3) * PI * r * r * h;
      const s = Math.sqrt(r * r + h * h);
      oberflaeche = PI * r * (r + s);
      formelV = 'V = (1/3) × π × r² × h';
      formelO = 'O = πr(r + √(r²+h²))';
      rechnungV = `(1/3) × π × ${r}² × ${h} = ${volumen.toFixed(2)}`;
    } else if (koerper === 'pyramide') {
      const a = parseDeutscheZahl(pa);
      const h = parseDeutscheZahl(ph);
      volumen = (1 / 3) * a * a * h;
      const m = Math.sqrt((a / 2) * (a / 2) + h * h);
      oberflaeche = a * a + 2 * a * m;
      formelV = 'V = (1/3) × a² × h';
      formelO = 'O = a² + 2a × √((a/2)² + h²)';
      rechnungV = `(1/3) × ${a}² × ${h} = ${volumen.toFixed(2)}`;
    } else if (koerper === 'prisma') {
      const a = parseDeutscheZahl(pra);
      const hd = parseDeutscheZahl(prhd);
      const l = parseDeutscheZahl(prl);
      const grund = (a * hd) / 2;
      volumen = grund * l;
      const schenkel = Math.sqrt((a / 2) * (a / 2) + hd * hd);
      oberflaeche = a * hd + (a + 2 * schenkel) * l;
      formelV = 'V = (a × h_d / 2) × l';
      formelO = 'O = a·h_d + (a + 2√((a/2)² + h_d²)) × l';
      rechnungV = `((${a} × ${hd}) / 2) × ${l} = ${volumen.toFixed(2)}`;
    } else if (koerper === 'halbkugel') {
      const r = parseDeutscheZahl(kr);
      volumen = (2 / 3) * PI * r * r * r;
      oberflaeche = 3 * PI * r * r;
      formelV = 'V = (2/3) × π × r³';
      formelO = 'O = 3πr²';
      rechnungV = `(2/3) × π × ${r}³ = ${volumen.toFixed(2)}`;
    }

    // Liter-Umrechnung: cm³ → /1000, m³ → ×1000, mm³ → /1_000_000
    let liter: number | null = null;
    if (einheit === 'cm') liter = volumen / 1000;
    else if (einheit === 'm') liter = volumen * 1000;
    else if (einheit === 'mm') liter = volumen / 1_000_000;

    return { volumen, oberflaeche, diagonale, formelV, formelO, rechnungV, liter };
  }, [koerper, einheit, qa, qb, qc, zr, zh, kr, ker, keh, pa, ph, pra, prhd, prl]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Körper-Auswahl */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Körper auswählen</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {KOERPER.map(k => (
            <button
              key={k.id}
              onClick={() => setKoerper(k.id)}
              className={`min-h-[48px] px-3 py-2 rounded-xl border text-sm font-medium transition ${
                koerper === k.id
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'
              }`}
            >
              <span className="mr-1">{k.emoji}</span>
              {k.name}
            </button>
          ))}
        </div>
      </div>

      {/* Maße */}
      <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {koerper === 'quader' && (
          <>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Länge (a)</label><NummerEingabe value={qa} onChange={setQa} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Breite (b)</label><NummerEingabe value={qb} onChange={setQb} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Höhe (c)</label><NummerEingabe value={qc} onChange={setQc} einheit={einheit} /></div>
          </>
        )}
        {koerper === 'zylinder' && (
          <>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Radius (r)</label><NummerEingabe value={zr} onChange={setZr} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Höhe (h)</label><NummerEingabe value={zh} onChange={setZh} einheit={einheit} /></div>
          </>
        )}
        {(koerper === 'kugel' || koerper === 'halbkugel') && (
          <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Radius (r)</label><NummerEingabe value={kr} onChange={setKr} einheit={einheit} /></div>
        )}
        {koerper === 'kegel' && (
          <>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Radius (r)</label><NummerEingabe value={ker} onChange={setKer} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Höhe (h)</label><NummerEingabe value={keh} onChange={setKeh} einheit={einheit} /></div>
          </>
        )}
        {koerper === 'pyramide' && (
          <>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Seitenlänge Grundfläche (a)</label><NummerEingabe value={pa} onChange={setPa} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Höhe (h)</label><NummerEingabe value={ph} onChange={setPh} einheit={einheit} /></div>
          </>
        )}
        {koerper === 'prisma' && (
          <>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Grundseite Dreieck (a)</label><NummerEingabe value={pra} onChange={setPra} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Höhe Dreieck (h_d)</label><NummerEingabe value={prhd} onChange={setPrhd} einheit={einheit} /></div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Länge Prisma (l)</label><NummerEingabe value={prl} onChange={setPrl} einheit={einheit} /></div>
          </>
        )}
        <div>
          <label htmlFor="volumen-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Einheit</label>
          <select id="volumen-select-1"
            value={einheit}
            onChange={e => setEinheit(e.target.value)}
            className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="mm">mm</option>
            <option value="km">km</option>
            <option value="Zoll">Zoll</option>
            <option value="Fuß">Fuß</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Volumen</p>
        <p className="text-5xl font-bold">
          {fmt(ergebnis.volumen)} {einheit}³
        </p>
        <p className="text-white/80 text-sm mt-2">
          Oberfläche: {fmt(ergebnis.oberflaeche)} {einheit}²
          {ergebnis.diagonale != null && <> · Raumdiagonale: {fmt(ergebnis.diagonale)} {einheit}</>}
        </p>
        {ergebnis.liter != null && (
          <p className="text-white/70 text-xs mt-1">
            ≈ {fmt(ergebnis.liter)} Liter
          </p>
        )}
      </div>

      {/* Formel + Rechenweg */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Formel &amp; Rechenweg</h2>
        <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{ergebnis.formelV}</p>
        <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-2">{ergebnis.rechnungV}</p>
        <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{ergebnis.formelO}</p>
      </div>

      <CrossLink href="/mathe/flaechenrechner" emoji="📐" text="Flächen berechnen" />
      <CrossLink href="/mathe/einheiten-umrechner" emoji="🔢" text="Einheiten umrechnen" />
      <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📏" text="Quadratmeter berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Volumen: ${fmt(ergebnis.volumen)} ${einheit}³ · Oberfläche: ${fmt(ergebnis.oberflaeche)} ${einheit}²`}
        seitenTitel="Volumen-Rechner"
      />

      <AiExplain
        rechnerName="Volumen-Rechner"
        eingaben={{
          Körper: KOERPER.find(k => k.id === koerper)?.name || koerper,
          Einheit: einheit,
        }}
        ergebnis={{
          Volumen: `${fmt(ergebnis.volumen)} ${einheit}³`,
          Oberfläche: `${fmt(ergebnis.oberflaeche)} ${einheit}²`,
          ...(ergebnis.liter != null ? { Liter: `${fmt(ergebnis.liter)} l` } : {}),
        }}
      />
    </div>
  );
}
