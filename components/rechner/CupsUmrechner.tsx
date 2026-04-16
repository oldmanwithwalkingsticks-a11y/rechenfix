'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Einheit = 'cup' | 'tbsp' | 'tsp' | 'floz' | 'ml' | 'g';

interface ZutatDichte {
  id: string;
  name: string;
  gramProCup: number; // 1 Cup (240 ml) in Gramm
  istFluessig: boolean;
}

const ZUTATEN: ZutatDichte[] = [
  { id: 'wasser',   name: 'Wasser / Milch',         gramProCup: 240, istFluessig: true },
  { id: 'mehl',     name: 'Mehl (Type 405)',        gramProCup: 125, istFluessig: false },
  { id: 'zucker',   name: 'Zucker (weiß)',          gramProCup: 200, istFluessig: false },
  { id: 'puder',    name: 'Puderzucker',            gramProCup: 120, istFluessig: false },
  { id: 'brauner',  name: 'Brauner Zucker',         gramProCup: 220, istFluessig: false },
  { id: 'butter',   name: 'Butter',                 gramProCup: 227, istFluessig: false },
  { id: 'hafer',    name: 'Haferflocken',           gramProCup:  90, istFluessig: false },
  { id: 'reis',     name: 'Reis (ungekocht)',       gramProCup: 185, istFluessig: false },
  { id: 'honig',    name: 'Honig',                  gramProCup: 340, istFluessig: true  },
  { id: 'kakao',    name: 'Kakaopulver',            gramProCup:  85, istFluessig: false },
  { id: 'sahne',    name: 'Sahne',                  gramProCup: 240, istFluessig: true  },
  { id: 'oel',      name: 'Öl',                     gramProCup: 218, istFluessig: true  },
  { id: 'nuesse',   name: 'Nüsse (gehackt)',        gramProCup: 150, istFluessig: false },
  { id: 'kaese',    name: 'Käse (gerieben)',        gramProCup: 113, istFluessig: false },
];

const EINHEIT_IN_ML: Record<Exclude<Einheit, 'g'>, number> = {
  cup:  240,
  tbsp:  15,
  tsp:    5,
  floz:  30,
  ml:     1,
};

const EINHEIT_LABEL: Record<Einheit, string> = {
  cup: 'Cup',
  tbsp: 'Tablespoon (tbsp, EL)',
  tsp: 'Teaspoon (tsp, TL)',
  floz: 'Fluid Ounce (fl oz)',
  ml: 'Milliliter (ml)',
  g: 'Gramm (g)',
};

const fmtZahl = (n: number, dezimal = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: dezimal });

export default function CupsUmrechner() {
  const [menge, setMenge] = useState('1');
  const [einheit, setEinheit] = useState<Einheit>('cup');
  const [zutatId, setZutatId] = useState<string>('mehl');

  const zutat = useMemo(() => ZUTATEN.find(z => z.id === zutatId) || ZUTATEN[0], [zutatId]);

  const ergebnis = useMemo(() => {
    const m = parseDeutscheZahl(menge);
    let ml = 0;
    let g = 0;

    if (einheit === 'g') {
      // Von Gramm ausgehend: Cups/ml basierend auf Zutat-Dichte
      g = m;
      // ml = g / (gramProCup / 240) = g × 240 / gramProCup
      ml = zutat.gramProCup > 0 ? (m * 240) / zutat.gramProCup : 0;
    } else {
      ml = m * EINHEIT_IN_ML[einheit];
      g = (ml / 240) * zutat.gramProCup;
    }

    const cups = ml / 240;
    const tbsp = ml / 15;
    const tsp = ml / 5;
    const floz = ml / 30;

    return { ml, g, cups, tbsp, tsp, floz };
  }, [menge, einheit, zutat]);

  // Schnellreferenz-Tabelle für aktuelle Zutat
  const schnellReferenz = [0.25, 0.333, 0.5, 0.667, 0.75, 1].map(cup => ({
    cup,
    label: cup === 0.25 ? '¼' : cup === 0.333 ? '⅓' : cup === 0.5 ? '½' : cup === 0.667 ? '⅔' : cup === 0.75 ? '¾' : '1',
    ml: cup * 240,
    g: cup * zutat.gramProCup,
  }));

  return (
    <div>
      {/* === 1: Menge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Menge
        </h2>
        <NummerEingabe value={menge} onChange={setMenge} placeholder="1" />
      </div>

      {/* === 2: Quelleinheit === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Einheit
        </h2>
        <label htmlFor="cups-einheit" className="sr-only">Einheit</label>
        <select
          id="cups-einheit"
          value={einheit}
          onChange={e => setEinheit(e.target.value as Einheit)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(EINHEIT_LABEL) as Einheit[]).map(e => (
            <option key={e} value={e}>{EINHEIT_LABEL[e]}</option>
          ))}
        </select>
      </div>

      {/* === 3: Zutat === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Zutat
        </h2>
        <label htmlFor="cups-zutat" className="sr-only">Zutat</label>
        <select
          id="cups-zutat"
          value={zutatId}
          onChange={e => setZutatId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {ZUTATEN.map(z => (
            <option key={z.id} value={z.id}>
              {z.name} (1 Cup = {z.gramProCup} g)
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Die Zutat ist wichtig für die Gramm-Umrechnung — Mehl (125 g/Cup) ist deutlich leichter als Zucker (200 g/Cup) oder Honig (340 g/Cup).
        </p>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Volumen</p>
            <p className="text-4xl font-bold">{fmtZahl(ergebnis.ml)} ml</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Gewicht</p>
            <p className="text-4xl font-bold text-amber-300">{fmtZahl(ergebnis.g)} g</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {fmtZahl(ergebnis.cups, 2)} Cups
          </span>
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {fmtZahl(ergebnis.tbsp, 1)} tbsp
          </span>
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {fmtZahl(ergebnis.tsp, 1)} tsp
          </span>
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {fmtZahl(ergebnis.floz, 2)} fl oz
          </span>
        </div>
      </div>

      {/* Schnellreferenz für aktuelle Zutat */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Schnellreferenz: {zutat.name}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Cups</th>
                <th className="px-4 py-2 text-right font-semibold">Volumen (ml)</th>
                <th className="px-4 py-2 text-right font-semibold">Gewicht (g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {schnellReferenz.map(row => (
                <tr key={row.cup}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.label} Cup</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtZahl(row.ml)} ml</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtZahl(row.g)} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alle Zutaten im Vergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">1 Cup = ? Gramm (alle Zutaten)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Zutat</th>
                <th className="px-4 py-2 text-right font-semibold">1 Cup</th>
                <th className="px-4 py-2 text-right font-semibold">½ Cup</th>
                <th className="px-4 py-2 text-right font-semibold">¼ Cup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ZUTATEN.map(z => (
                <tr key={z.id} className={z.id === zutatId ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {z.id === zutatId && <span className="mr-1">➔</span>}
                    {z.name}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{z.gramProCup} g</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{Math.round(z.gramProCup / 2)} g</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{Math.round(z.gramProCup / 4)} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis US/UK Cup */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>ℹ️ US Cup vs. metrischer Cup vs. UK Cup:</strong> Dieser Rechner verwendet den <strong>US Cup (240 ml)</strong>, der in amerikanischen Rezepten Standard ist. Der metrische Cup (Australien) misst 250 ml, der britische Imperial Cup sogar 284 ml. Bei „amerikanischen“ Rezepten immer 240 ml verwenden.
        </p>
      </div>

      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/alltag/einheiten-umrechner" emoji="📏" text="Einheiten umrechnen" />
      <CrossLink href="/alltag/dreisatz-rechner" emoji="⚖️" text="Dreisatz-Rechner" />
      <CrossLink href="/alltag/waehrungsrechner" emoji="💱" text="Währungen umrechnen" />

      <ErgebnisAktionen
        ergebnisText={`${menge} ${einheit === 'cup' ? 'Cup' : EINHEIT_LABEL[einheit]} ${zutat.name} = ${fmtZahl(ergebnis.ml)} ml = ${fmtZahl(ergebnis.g)} g (${fmtZahl(ergebnis.cups, 2)} Cups / ${fmtZahl(ergebnis.tbsp, 1)} tbsp / ${fmtZahl(ergebnis.tsp, 1)} tsp)`}
        seitenTitel="Cups-Umrechner"
      />

      <AiExplain
        rechnerName="Cups-Umrechner"
        eingaben={{
          menge,
          einheit: EINHEIT_LABEL[einheit],
          zutat: zutat.name,
          zutatDichte: `${zutat.gramProCup} g pro Cup`,
        }}
        ergebnis={{
          ml: `${fmtZahl(ergebnis.ml)} ml`,
          gramm: `${fmtZahl(ergebnis.g)} g`,
          cups: `${fmtZahl(ergebnis.cups, 2)} Cups`,
          tbsp: `${fmtZahl(ergebnis.tbsp, 1)} tbsp`,
          tsp: `${fmtZahl(ergebnis.tsp, 1)} tsp`,
        }}
      />
    </div>
  );
}
