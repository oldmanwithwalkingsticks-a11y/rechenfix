'use client';

import { useState, useMemo, useRef } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'mischen' | 'kochen';

interface Zutat {
  id: number;
  name: string;
  menge: string;
  prozent: string;
}

const GETRAENKE_PRESETS = [
  { name: 'Bier (0,33 l)', menge: '330', prozent: '5' },
  { name: 'Bier (0,5 l)', menge: '500', prozent: '5' },
  { name: 'Wein (0,2 l)', menge: '200', prozent: '12' },
  { name: 'Sekt (0,1 l)', menge: '100', prozent: '11' },
  { name: 'Wodka (4 cl)', menge: '40', prozent: '40' },
  { name: 'Rum (4 cl)', menge: '40', prozent: '40' },
  { name: 'Gin (4 cl)', menge: '40', prozent: '40' },
  { name: 'Likör (2 cl)', menge: '20', prozent: '20' },
  { name: 'Orangensaft', menge: '100', prozent: '0' },
  { name: 'Tonic Water', menge: '100', prozent: '0' },
];

interface Kochzeit {
  label: string;
  dauer: string;
  restAnteil: number;
}

const KOCHZEITEN: Kochzeit[] = [
  { label: '🔥 Flambieren (kurze Einwirkzeit)', dauer: 'flambieren', restAnteil: 0.75 },
  { label: '⏱️ 15 Minuten kochen', dauer: '15', restAnteil: 0.40 },
  { label: '⏱️ 30 Minuten kochen', dauer: '30', restAnteil: 0.35 },
  { label: '⏱️ 1 Stunde (60 Min) köcheln', dauer: '60', restAnteil: 0.25 },
  { label: '⏱️ 2 Stunden (120 Min) köcheln', dauer: '120', restAnteil: 0.10 },
  { label: '⏱️ 2,5 Stunden (150 Min) köcheln', dauer: '150', restAnteil: 0.05 },
];

const DICHTE_ALKOHOL = 0.789; // g/ml
const KCAL_PRO_G = 7.1;
const STANDARDGLAS_G = 10; // DGE: 10 g reiner Alkohol = 1 Standardglas

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

export default function AlkoholgehaltRechner() {
  const [modus, setModus] = useState<Modus>('mischen');

  // === Mischen ===
  const nextId = useRef(3);
  const [zutaten, setZutaten] = useState<Zutat[]>([
    { id: 1, name: 'Bier (0,5 l)', menge: '500', prozent: '5' },
    { id: 2, name: 'Orangensaft', menge: '100', prozent: '0' },
  ]);

  const addZutat = (preset?: { name: string; menge: string; prozent: string }) => {
    const id = nextId.current++;
    setZutaten(prev => [...prev, preset ? { id, ...preset } : { id, name: '', menge: '100', prozent: '5' }]);
  };

  const removeZutat = (id: number) => {
    setZutaten(prev => prev.filter(z => z.id !== id));
  };

  const updateZutat = (id: number, field: keyof Omit<Zutat, 'id'>, value: string) => {
    setZutaten(prev => prev.map(z => z.id === id ? { ...z, [field]: value } : z));
  };

  // === Kochen ===
  const [kochMl, setKochMl] = useState('250');
  const [kochProzent, setKochProzent] = useState('12');
  const [kochDauer, setKochDauer] = useState('15');

  const mischErgebnis = useMemo(() => {
    const parsed = zutaten.map(z => ({
      menge: parseDeutscheZahl(z.menge) || 0,
      prozent: parseDeutscheZahl(z.prozent) || 0,
    }));
    const gesamtVolumen = parsed.reduce((s, z) => s + z.menge, 0);
    const gesamtAlkohol_ml = parsed.reduce((s, z) => s + z.menge * z.prozent / 100, 0);

    if (gesamtVolumen === 0) return null;

    const mischungProzent = (gesamtAlkohol_ml / gesamtVolumen) * 100;
    const alkohol_g = gesamtAlkohol_ml * DICHTE_ALKOHOL;
    const kcal = alkohol_g * KCAL_PRO_G;
    const standardglaes = alkohol_g / STANDARDGLAS_G;

    return { gesamtVolumen, gesamtAlkohol_ml, mischungProzent, alkohol_g, kcal, standardglaes };
  }, [zutaten]);

  const kochErgebnis = useMemo(() => {
    const ml = parseDeutscheZahl(kochMl) || 0;
    const proz = parseDeutscheZahl(kochProzent) || 0;
    const kochzeit = KOCHZEITEN.find(k => k.dauer === kochDauer) ?? KOCHZEITEN[1];

    const alkohol_ml_original = ml * proz / 100;
    const alkohol_g_original = alkohol_ml_original * DICHTE_ALKOHOL;
    const restAlkohol_g = alkohol_g_original * kochzeit.restAnteil;
    const restAlkohol_ml = alkohol_ml_original * kochzeit.restAnteil;
    const kcal = restAlkohol_g * KCAL_PRO_G;
    const standardglaes = restAlkohol_g / STANDARDGLAS_G;

    return { alkohol_ml_original, alkohol_g_original, restAlkohol_g, restAlkohol_ml, kcal, standardglaes, restAnteil: kochzeit.restAnteil };
  }, [kochMl, kochProzent, kochDauer]);

  const ergebnisText = modus === 'mischen' && mischErgebnis
    ? `Alkohol-Mischung: ${fmt(mischErgebnis.mischungProzent, 1)} % vol | ${fmt(mischErgebnis.alkohol_g, 1)} g reiner Alkohol | ${fmt(mischErgebnis.kcal, 0)} kcal | ${fmt(mischErgebnis.standardglaes, 1)} Standardgläser`
    : `Restalkohol nach Kochen: ${fmt(kochErgebnis.restAlkohol_g, 1)} g (${fmt(kochErgebnis.restAnteil * 100, 0)} % Restalkohol) | ${fmt(kochErgebnis.kcal, 0)} kcal`;

  return (
    <div>
      {/* === Modus-Toggle === */}
      <div className="mb-6">
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
          {(['mischen', 'kochen'] as Modus[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setModus(m)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                modus === m
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {m === 'mischen' ? '🍹 Getränke mischen' : '🍲 Alkohol beim Kochen'}
            </button>
          ))}
        </div>
      </div>

      {/* === MODUS: MISCHEN === */}
      {modus === 'mischen' && (
        <>
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Zutaten</h2>
            <div className="space-y-2">
              {zutaten.map(z => (
                <div key={z.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={z.name}
                    onChange={e => updateZutat(z.id, 'name', e.target.value)}
                    placeholder="Getränk"
                    className="flex-1 input-field text-sm"
                    aria-label="Getränkename"
                  />
                  <div className="w-24">
                    <NummerEingabe
                      value={z.menge}
                      onChange={v => updateZutat(z.id, 'menge', v)}
                      placeholder="ml"
                      einheit="ml"
                    />
                  </div>
                  <div className="w-24">
                    <NummerEingabe
                      value={z.prozent}
                      onChange={v => updateZutat(z.id, 'prozent', v)}
                      placeholder="% vol"
                      einheit="%"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeZutat(z.id)}
                    className="w-9 h-[48px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors shrink-0"
                    aria-label="Zutat entfernen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addZutat()}
              className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              + Zutat hinzufügen
            </button>
          </div>

          {/* Quick-Add Presets */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Schnell hinzufügen:</p>
            <div className="flex flex-wrap gap-2">
              {GETRAENKE_PRESETS.map(p => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => addZutat(p)}
                  className="px-3 py-1.5 text-xs rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ergebnis Mischen */}
          {mischErgebnis && (
            <div className="result-box mb-6">
              <p className="text-white/80 text-sm mb-1 text-center">
                Gesamtvolumen: {fmt(mischErgebnis.gesamtVolumen, 0)} ml
              </p>
              <p className="text-5xl font-bold text-center mb-4">{fmt(mischErgebnis.mischungProzent, 1)} % vol</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-white/70 text-xs mb-1">Reiner Alkohol</p>
                  <p className="text-xl font-bold">{fmt(mischErgebnis.gesamtAlkohol_ml, 1)} ml</p>
                  <p className="text-white/70 text-xs">{fmt(mischErgebnis.alkohol_g, 1)} g</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-white/70 text-xs mb-1">Kalorien (Alkohol)</p>
                  <p className="text-xl font-bold">{fmt(mischErgebnis.kcal, 0)} kcal</p>
                  <p className="text-white/70 text-xs">7,1 kcal/g</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-white/70 text-xs mb-1">Standardgläser</p>
                  <p className="text-xl font-bold">{fmt(mischErgebnis.standardglaes, 1)}</p>
                  <p className="text-white/70 text-xs">à 10 g Alkohol</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-white/70 text-xs mb-1">Kcal gesamt</p>
                  <p className="text-xl font-bold">{fmt(mischErgebnis.kcal / mischErgebnis.gesamtVolumen * 100, 0)}</p>
                  <p className="text-white/70 text-xs">kcal / 100 ml</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* === MODUS: KOCHEN === */}
      {modus === 'kochen' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Alkohol im Rezept (ml)
              </h2>
              <NummerEingabe value={kochMl} onChange={setKochMl} placeholder="250" einheit="ml" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">z. B. 250 ml Wein oder 50 ml Rum</p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Alkoholgehalt (% vol)
              </h2>
              <NummerEingabe value={kochProzent} onChange={setKochProzent} placeholder="12" einheit="%" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Kochdauer
            </h2>
            <label htmlFor="kochdauer-sel" className="sr-only">Kochdauer</label>
            <select
              id="kochdauer-sel"
              value={kochDauer}
              onChange={e => setKochDauer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {KOCHZEITEN.map(k => (
                <option key={k.dauer} value={k.dauer}>
                  {k.label} — {fmt(k.restAnteil * 100, 0)} % Restalkohol
                </option>
              ))}
            </select>
          </div>

          {/* Ergebnis Kochen */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1 text-center">
              Aus {fmt(parseDeutscheZahl(kochMl) || 0, 0)} ml ({fmt(parseDeutscheZahl(kochProzent) || 0, 1)} % vol) — {fmt(kochErgebnis.alkohol_g_original, 1)} g Alkohol ursprünglich
            </p>
            <p className="text-4xl font-bold text-center mb-1">{fmt(kochErgebnis.restAlkohol_g, 1)} g Restalkohol</p>
            <p className="text-white/80 text-sm text-center mb-4">
              = {fmt(kochErgebnis.restAnteil * 100, 0)} % des ursprünglichen Alkohols verbleiben
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white/70 text-xs mb-1">Restalkohol</p>
                <p className="text-xl font-bold">{fmt(kochErgebnis.restAlkohol_ml, 1)} ml</p>
                <p className="text-white/70 text-xs">{fmt(kochErgebnis.restAlkohol_g, 1)} g</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white/70 text-xs mb-1">Kalorien (Alkohol)</p>
                <p className="text-xl font-bold">{fmt(kochErgebnis.kcal, 0)} kcal</p>
                <p className="text-white/70 text-xs">noch vorhanden</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white/70 text-xs mb-1">Standardgläser</p>
                <p className="text-xl font-bold">{fmt(kochErgebnis.standardglaes, 1)}</p>
                <p className="text-white/70 text-xs">à 10 g Alkohol</p>
              </div>
            </div>
          </div>

          {/* Restalkohol-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Restalkohol nach USDA — für {fmt(parseDeutscheZahl(kochMl) || 0, 0)} ml {fmt(parseDeutscheZahl(kochProzent) || 0, 1)} % vol
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Methode / Zeit</th>
                    <th className="px-4 py-2 text-right font-semibold">Restalkohol %</th>
                    <th className="px-4 py-2 text-right font-semibold">Rest (g)</th>
                    <th className="px-4 py-2 text-right font-semibold">kcal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {KOCHZEITEN.map(k => {
                    const restG = kochErgebnis.alkohol_g_original * k.restAnteil;
                    const restKcal = restG * KCAL_PRO_G;
                    const istAktuell = k.dauer === kochDauer;
                    return (
                      <tr key={k.dauer} className={istAktuell ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 ${istAktuell ? 'font-semibold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {k.label.replace(/^[^ ]+ /, '')}
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums ${istAktuell ? 'font-semibold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {fmt(k.restAnteil * 100, 0)} %
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums ${istAktuell ? 'font-semibold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {fmt(restG, 1)} g
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums ${istAktuell ? 'font-semibold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {fmt(restKcal, 0)} kcal
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Info-Box */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>ℹ️ Standardglas:</strong> 1 Standardglas = 10 g reiner Alkohol (DGE-Definition). Entspricht ca. 0,33 l Bier (5 %), 0,1 l Wein (12 %) oder 3 cl Schnaps (40 %). Die WHO empfiehlt max. 1–2 Standardgläser täglich, an mehreren Tagen/Woche keinen Alkohol.
        </p>
      </div>

      <CrossLink href="/arbeit/promillerechner" emoji="🚗" text="Promillerechner: Blutalkohol berechnen" />
      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienrechner: Tagesbedarf berechnen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />

      <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Alkoholgehalt-Rechner" />

      <AiExplain
        rechnerName="Alkoholgehalt-Rechner"
        eingaben={{
          modus: modus === 'mischen' ? 'Getränke mischen' : 'Kochen',
          ...(modus === 'mischen' && mischErgebnis
            ? {
                volumen: `${fmt(mischErgebnis.gesamtVolumen, 0)} ml`,
                reinAlkohol: `${fmt(mischErgebnis.gesamtAlkohol_ml, 1)} ml`,
              }
            : {
                alkohol: `${kochMl} ml × ${kochProzent} % vol`,
                kochdauer: KOCHZEITEN.find(k => k.dauer === kochDauer)?.label ?? '',
              }),
        }}
        ergebnis={modus === 'mischen' && mischErgebnis
          ? {
              alkoholgehalt: `${fmt(mischErgebnis.mischungProzent, 1)} % vol`,
              reinAlkohol: `${fmt(mischErgebnis.alkohol_g, 1)} g`,
              kcal: `${fmt(mischErgebnis.kcal, 0)} kcal`,
              standardglaes: `${fmt(mischErgebnis.standardglaes, 1)} Standardgläser`,
            }
          : {
              restalkohol: `${fmt(kochErgebnis.restAlkohol_g, 1)} g (${fmt(kochErgebnis.restAnteil * 100, 0)} %)`,
              kcal: `${fmt(kochErgebnis.kcal, 0)} kcal`,
            }}
      />
    </div>
  );
}
