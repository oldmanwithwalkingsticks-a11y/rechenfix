'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Typ = 'verbrenner' | 'premium' | 'elektro';

const TYP_LABEL: Record<Typ, string> = {
  verbrenner: 'Verbrenner (Volumen)',
  premium:    'Premium / SUV (wertstabil)',
  elektro:    'Elektro (Volumen)',
};

// Jahres-Wertverlustraten (Jahr 1–5), danach Flat-Rate
const RATEN: Record<Typ, number[]> = {
  verbrenner: [0.24, 0.13, 0.10, 0.09, 0.08],
  premium:    [0.20, 0.11, 0.09, 0.08, 0.07],
  elektro:    [0.30, 0.14, 0.11, 0.10, 0.09],
};
const FLAT: Record<Typ, number> = {
  verbrenner: 0.07,
  premium:    0.06,
  elektro:    0.08,
};

const TYP_REIHENFOLGE: Typ[] = ['verbrenner', 'premium', 'elektro'];
const TABELLEN_JAHRE = [1, 2, 3, 5, 8, 10];

const euro = (n: number): string => Math.round(n).toLocaleString('de-DE');
const p1 = (n: number): string => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function restfaktor(jahre: number, typ: Typ): number {
  let f = 1;
  for (let i = 0; i < jahre; i++) {
    const rate = i < 5 ? RATEN[typ][i] : FLAT[typ];
    f *= (1 - rate);
  }
  return f;
}

function restwert(neupreis: number, jahre: number, typ: Typ): number {
  return neupreis * restfaktor(jahre, typ);
}

export default function WertverlustAutoRechner() {
  const [neupreis, setNeupreis] = useState('30000');
  const [alter, setAlter] = useState('3');
  const [typ, setTyp] = useState<Typ>('verbrenner');

  const ergebnis = useMemo(() => {
    const np = parseDeutscheZahl(neupreis);
    const j = Math.round(parseDeutscheZahl(alter));
    if (np <= 0 || j < 0) return null;
    const rw = restwert(np, j, typ);
    const verlust = np - rw;
    const verlustProzent = (1 - rw / np) * 100;
    return { np, j, rw, verlust, verlustProzent };
  }, [neupreis, alter, typ]);

  return (
    <div>
      {/* === 1: Neupreis === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Neupreis (Listenpreis)
        </h2>
        <NummerEingabe value={neupreis} onChange={setNeupreis} placeholder="30000" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Neupreis bei Erstzulassung inklusive Ausstattung.
        </p>
      </div>

      {/* === 2: Alter === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Fahrzeugalter (Jahre)
        </h2>
        <NummerEingabe value={alter} onChange={setAlter} placeholder="3" einheit="Jahre" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Jahre seit Erstzulassung. Der Wertverlust ist im ersten Jahr am größten.
        </p>
      </div>

      {/* === 3: Fahrzeugtyp === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Fahrzeugtyp
        </h2>
        <label htmlFor="wertverlust-typ" className="sr-only">Fahrzeugtyp</label>
        <select
          id="wertverlust-typ"
          value={typ}
          onChange={e => setTyp(e.target.value as Typ)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {TYP_REIHENFOLGE.map(t => (
            <option key={t} value={t}>{TYP_LABEL[t]}</option>
          ))}
        </select>
      </div>

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Restwert heute</p>
                <p className="text-4xl font-bold">{euro(ergebnis.rw)} €</p>
                <p className="text-white/60 text-xs mt-1">nach {ergebnis.j} {ergebnis.j === 1 ? 'Jahr' : 'Jahren'}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Wertverlust</p>
                <p className="text-4xl font-bold">{euro(ergebnis.verlust)} €</p>
                <p className="text-white/60 text-xs mt-1">= {p1(ergebnis.verlustProzent)} %</p>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg (degressiv):</strong>{' '}
              {euro(ergebnis.np)} €
              {Array.from({ length: ergebnis.j }).map((_, i) => {
                const rate = i < 5 ? RATEN[typ][i] : FLAT[typ];
                return <span key={i}> × {p1((1 - rate) * 100).replace(',0', '')} %</span>;
              })}
              {' '}= {euro(ergebnis.rw)} €
            </p>
          </div>

          {/* PFLICHT: Finanz-Zeile */}
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              <strong>Hinweis:</strong> Durchschnitts-Richtwert, keine individuelle Bewertung und keine Finanzberatung.
              Marke, Modell, Zustand, Laufleistung, Ausstattung, Farbe und regionale Nachfrage verändern den realen Wert
              deutlich. Für eine belastbare Einschätzung: DAT-Bewertung, Kfz-Gutachten oder Marktvergleich. Angaben ohne Gewähr.
            </p>
          </div>

          {/* Tabelle: Restwert nach Jahren */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Restwert nach Jahren — {TYP_LABEL[typ]}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Alter</th>
                    <th className="px-4 py-2 text-right font-semibold">Restwert</th>
                    <th className="px-4 py-2 text-right font-semibold">Wertverlust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {TABELLEN_JAHRE.map(j => {
                    const rw = restwert(ergebnis.np, j, typ);
                    const vp = (1 - rw / ergebnis.np) * 100;
                    const aktiv = j === ergebnis.j;
                    return (
                      <tr key={j} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{j} {j === 1 ? 'Jahr' : 'Jahre'}</td>
                        <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}`}>{euro(rw)} €</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">{p1(vp)} %</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
              Degressive Durchschnittskurve — im ersten Jahr am stärksten, danach flacher. Reale Werte weichen je nach Modell ab.
            </p>
          </div>

          <CrossLink href="/auto/autokosten-rechner" emoji="💶" text="Autokosten gesamt" />
          <CrossLink href="/auto/leasingfaktor-rechner" emoji="📊" text="Leasingangebote bewerten" />

          <ErgebnisAktionen
            ergebnisText={`Wertverlust-Rechner: ${TYP_LABEL[typ]}, Neupreis ${euro(ergebnis.np)} € nach ${ergebnis.j} ${ergebnis.j === 1 ? 'Jahr' : 'Jahren'} → Restwert ${euro(ergebnis.rw)} €, Wertverlust ${euro(ergebnis.verlust)} € (${p1(ergebnis.verlustProzent)} %). Durchschnitts-Richtwert.`}
            seitenTitel="Wertverlust-Rechner (Auto)"
          />

          <AiExplain
            rechnerName="Wertverlust-Rechner (Auto)"
            eingaben={{
              neupreis: `${euro(ergebnis.np)} €`,
              alter: `${ergebnis.j} ${ergebnis.j === 1 ? 'Jahr' : 'Jahre'}`,
              fahrzeugtyp: TYP_LABEL[typ],
            }}
            ergebnis={{
              restwert: `${euro(ergebnis.rw)} €`,
              wertverlustEuro: `${euro(ergebnis.verlust)} €`,
              wertverlustProzent: `${p1(ergebnis.verlustProzent)} %`,
              hinweis: 'Degressiver Durchschnitts-Richtwert — der reale Wert hängt von Modell, Zustand und Nachfrage ab.',
            }}
          />
        </>
      )}
    </div>
  );
}
