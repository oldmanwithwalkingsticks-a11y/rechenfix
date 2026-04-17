'use client';

import { useState, useMemo, useRef } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

interface Lebensmittel {
  name: string;
  kcal: number;
  protein: number;
  kh: number;
  fett: number;
}

const LM_DB: Record<string, Lebensmittel> = {
  // Backzutaten
  'mehl-405': { name: 'Weizenmehl Type 405', kcal: 348, protein: 10, kh: 72, fett: 1.0 },
  'mehl-550': { name: 'Weizenmehl Type 550', kcal: 344, protein: 11, kh: 71, fett: 1.1 },
  'roggenmehl': { name: 'Roggenmehl Type 1150', kcal: 323, protein: 8, kh: 68, fett: 1.7 },
  'zucker': { name: 'Zucker (weiß)', kcal: 400, protein: 0, kh: 100, fett: 0 },
  'puderzucker': { name: 'Puderzucker', kcal: 400, protein: 0, kh: 100, fett: 0 },
  'brauner-zucker': { name: 'Brauner Zucker', kcal: 381, protein: 0.1, kh: 98, fett: 0 },
  'staerke': { name: 'Speisestärke', kcal: 342, protein: 0.3, kh: 85, fett: 0.1 },
  'backpulver': { name: 'Backpulver', kcal: 53, protein: 0, kh: 28, fett: 0 },
  'haferflocken': { name: 'Haferflocken', kcal: 368, protein: 13, kh: 59, fett: 7 },
  // Milchprodukte
  'butter': { name: 'Butter', kcal: 741, protein: 0.7, kh: 0.6, fett: 83 },
  'vollmilch': { name: 'Vollmilch (3,5 %)', kcal: 64, protein: 3.3, kh: 4.8, fett: 3.5 },
  'sahne': { name: 'Sahne (30 %)', kcal: 285, protein: 2.7, kh: 3.3, fett: 30 },
  'schmand': { name: 'Schmand (24 %)', kcal: 241, protein: 2.8, kh: 3.4, fett: 24 },
  'frischkaese': { name: 'Frischkäse (10 %)', kcal: 124, protein: 6.0, kh: 3.5, fett: 10 },
  'gouda': { name: 'Gouda (48 % F.i.T.)', kcal: 356, protein: 25, kh: 0, fett: 28 },
  'mozzarella': { name: 'Mozzarella', kcal: 280, protein: 22, kh: 0, fett: 20 },
  'joghurt': { name: 'Joghurt (3,5 %)', kcal: 67, protein: 4, kh: 4, fett: 3.5 },
  'quark': { name: 'Magerquark', kcal: 67, protein: 12, kh: 4, fett: 0.3 },
  // Eier
  'ei': { name: 'Ei (Größe M, 53 g)', kcal: 155, protein: 13, kh: 1, fett: 11 },
  // Öle & Fette
  'olivenoel': { name: 'Olivenöl', kcal: 884, protein: 0, kh: 0, fett: 100 },
  'sonnenblumenoel': { name: 'Sonnenblumenöl', kcal: 884, protein: 0, kh: 0, fett: 100 },
  // Fleisch & Fisch
  'haehnchenbrust': { name: 'Hähnchenbrust', kcal: 112, protein: 24, kh: 0, fett: 2 },
  'hackfleisch-rind': { name: 'Hackfleisch (Rind)', kcal: 224, protein: 18, kh: 0, fett: 17 },
  'schweinefilet': { name: 'Schweinefilet', kcal: 103, protein: 21, kh: 0, fett: 2 },
  'lachs': { name: 'Lachs', kcal: 202, protein: 20, kh: 0, fett: 13 },
  'thunfisch': { name: 'Thunfisch (Dose)', kcal: 95, protein: 22, kh: 0, fett: 1 },
  // Gemüse
  'tomate': { name: 'Tomate', kcal: 18, protein: 0.9, kh: 3, fett: 0.2 },
  'paprika': { name: 'Paprika', kcal: 26, protein: 1, kh: 5, fett: 0.3 },
  'zwiebel': { name: 'Zwiebel', kcal: 40, protein: 1.3, kh: 9, fett: 0.1 },
  'knoblauch': { name: 'Knoblauch', kcal: 149, protein: 6, kh: 33, fett: 0.5 },
  'kartoffel': { name: 'Kartoffel', kcal: 77, protein: 2, kh: 17, fett: 0.1 },
  'moehre': { name: 'Möhre', kcal: 41, protein: 0.9, kh: 9.6, fett: 0.2 },
  'brokkoli': { name: 'Brokkoli', kcal: 34, protein: 3, kh: 6, fett: 0.4 },
  'spinat': { name: 'Spinat', kcal: 17, protein: 2.9, kh: 2.9, fett: 0.4 },
  'champignons': { name: 'Champignons', kcal: 22, protein: 3.1, kh: 2.5, fett: 0.3 },
  'zucchini': { name: 'Zucchini', kcal: 17, protein: 1.5, kh: 3, fett: 0.2 },
  // Hülsenfrüchte
  'linsen': { name: 'Linsen (trocken)', kcal: 337, protein: 26, kh: 52, fett: 1 },
  'kichererbsen': { name: 'Kichererbsen (Dose)', kcal: 119, protein: 6, kh: 18, fett: 2.6 },
  // Getreide
  'reis': { name: 'Reis (ungekocht)', kcal: 357, protein: 7, kh: 78, fett: 0.6 },
  'pasta': { name: 'Pasta (trocken)', kcal: 356, protein: 12, kh: 71, fett: 2 },
  // Nüsse
  'walnuesse': { name: 'Walnüsse', kcal: 654, protein: 15, kh: 7, fett: 63 },
  'mandeln': { name: 'Mandeln', kcal: 579, protein: 21, kh: 10, fett: 50 },
  // Süßes & Saucen
  'honig': { name: 'Honig', kcal: 304, protein: 0.4, kh: 80, fett: 0 },
  'kakao': { name: 'Kakaopulver', kcal: 229, protein: 20, kh: 22, fett: 11 },
  'schokolade': { name: 'Schokolade (70 %)', kcal: 557, protein: 7, kh: 40, fett: 38 },
  'tomatenmark': { name: 'Tomatenmark', kcal: 82, protein: 4, kh: 16, fett: 0.5 },
  'passierte-tomaten': { name: 'Passierte Tomaten', kcal: 32, protein: 1.5, kh: 6, fett: 0.3 },
  'kokosmilch': { name: 'Kokosmilch', kcal: 184, protein: 2, kh: 3, fett: 19 },
};

const LM_GRUPPEN: Record<string, string[]> = {
  'Backzutaten': ['mehl-405', 'mehl-550', 'roggenmehl', 'zucker', 'puderzucker', 'brauner-zucker', 'staerke', 'backpulver', 'haferflocken'],
  'Milchprodukte': ['butter', 'vollmilch', 'sahne', 'schmand', 'frischkaese', 'gouda', 'mozzarella', 'joghurt', 'quark'],
  'Eier': ['ei'],
  'Öle & Fette': ['olivenoel', 'sonnenblumenoel'],
  'Fleisch & Fisch': ['haehnchenbrust', 'hackfleisch-rind', 'schweinefilet', 'lachs', 'thunfisch'],
  'Gemüse': ['tomate', 'paprika', 'zwiebel', 'knoblauch', 'kartoffel', 'moehre', 'brokkoli', 'spinat', 'champignons', 'zucchini'],
  'Hülsenfrüchte': ['linsen', 'kichererbsen'],
  'Getreide & Pasta': ['reis', 'pasta'],
  'Nüsse': ['walnuesse', 'mandeln'],
  'Süßes & Saucen': ['honig', 'kakao', 'schokolade', 'tomatenmark', 'passierte-tomaten', 'kokosmilch'],
};

const TAGESKALORIEN = 2000;

interface ZutatRow {
  id: number;
  lmKey: string;
  menge: string;
}

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

function MacroBar({ protein, kh, fett }: { protein: number; kh: number; fett: number }) {
  const kcalP = protein * 4;
  const kcalKH = kh * 4;
  const kcalF = fett * 9;
  const total = kcalP + kcalKH + kcalF;
  if (total === 0) return null;

  const pP = (kcalP / total) * 100;
  const pKH = (kcalKH / total) * 100;
  const pF = (kcalF / total) * 100;

  return (
    <div>
      <div className="flex h-5 rounded-full overflow-hidden gap-0.5 mb-2">
        <div style={{ width: `${pP}%` }} className="bg-blue-500 rounded-l-full" title={`Protein ${fmt(pP, 0)} %`} />
        <div style={{ width: `${pKH}%` }} className="bg-green-500" title={`Kohlenhydrate ${fmt(pKH, 0)} %`} />
        <div style={{ width: `${pF}%` }} className="bg-amber-500 rounded-r-full" title={`Fett ${fmt(pF, 0)} %`} />
      </div>
      <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" /> Protein {fmt(pP, 0)} %</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 shrink-0" /> KH {fmt(pKH, 0)} %</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" /> Fett {fmt(pF, 0)} %</span>
      </div>
    </div>
  );
}

export default function NaehrwertRechner() {
  const nextId = useRef(3);
  const [zutaten, setZutaten] = useState<ZutatRow[]>([
    { id: 1, lmKey: 'mehl-405', menge: '250' },
    { id: 2, lmKey: 'ei', menge: '120' },
  ]);
  const [portionen, setPortionen] = useState('4');

  const addZutat = () => {
    const id = nextId.current++;
    setZutaten(prev => [...prev, { id, lmKey: 'vollmilch', menge: '100' }]);
  };

  const removeZutat = (id: number) => {
    setZutaten(prev => prev.filter(z => z.id !== id));
  };

  const updateZutat = (id: number, field: keyof Omit<ZutatRow, 'id'>, value: string) => {
    setZutaten(prev => prev.map(z => z.id === id ? { ...z, [field]: value } : z));
  };

  const ergebnis = useMemo(() => {
    const portionenN = Math.max(1, Math.round(parseDeutscheZahl(portionen) || 1));

    const zeilen = zutaten.map(z => {
      const lm = LM_DB[z.lmKey];
      const menge = parseDeutscheZahl(z.menge) || 0;
      const faktor = menge / 100;
      return {
        lmKey: z.lmKey,
        name: lm?.name ?? '',
        menge,
        kcal: (lm?.kcal ?? 0) * faktor,
        protein: (lm?.protein ?? 0) * faktor,
        kh: (lm?.kh ?? 0) * faktor,
        fett: (lm?.fett ?? 0) * faktor,
      };
    });

    const gesamt = {
      kcal: zeilen.reduce((s, z) => s + z.kcal, 0),
      protein: zeilen.reduce((s, z) => s + z.protein, 0),
      kh: zeilen.reduce((s, z) => s + z.kh, 0),
      fett: zeilen.reduce((s, z) => s + z.fett, 0),
    };

    const proP = {
      kcal: gesamt.kcal / portionenN,
      protein: gesamt.protein / portionenN,
      kh: gesamt.kh / portionenN,
      fett: gesamt.fett / portionenN,
    };

    const tagesAnteil = (proP.kcal / TAGESKALORIEN) * 100;

    return { zeilen, gesamt, proP, tagesAnteil, portionenN };
  }, [zutaten, portionen]);

  const ergebnisText = `Nährwert pro Portion: ${fmt(ergebnis.proP.kcal, 0)} kcal | Protein: ${fmt(ergebnis.proP.protein, 1)} g | KH: ${fmt(ergebnis.proP.kh, 1)} g | Fett: ${fmt(ergebnis.proP.fett, 1)} g (bei ${ergebnis.portionenN} Portionen)`;

  return (
    <div>
      {/* === Zutaten-Liste === */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Zutaten
        </h2>

        <div className="space-y-2">
          {zutaten.map(z => (
            <div key={z.id} className="flex gap-2 items-center">
              <div className="flex-1">
                <label htmlFor={`lm-${z.id}`} className="sr-only">Lebensmittel</label>
                <select
                  id={`lm-${z.id}`}
                  value={z.lmKey}
                  onChange={e => updateZutat(z.id, 'lmKey', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
                >
                  {Object.entries(LM_GRUPPEN).map(([gruppe, keys]) => (
                    <optgroup key={gruppe} label={gruppe}>
                      {keys.map(key => (
                        <option key={key} value={key}>{LM_DB[key]?.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="w-28 shrink-0">
                <NummerEingabe
                  value={z.menge}
                  onChange={v => updateZutat(z.id, 'menge', v)}
                  placeholder="g/ml"
                  einheit="g"
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
          onClick={addZutat}
          className="mt-3 w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          + Zutat hinzufügen
        </button>
      </div>

      {/* === Portionen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl Portionen
        </h2>
        <NummerEingabe value={portionen} onChange={setPortionen} placeholder="4" einheit="Portionen" />
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1 text-center">Pro Portion (1 von {ergebnis.portionenN})</p>
        <p className="text-5xl font-bold text-center mb-4">{fmt(ergebnis.proP.kcal, 0)} kcal</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">🥩 Protein</p>
            <p className="text-2xl font-bold">{fmt(ergebnis.proP.protein, 1)} g</p>
            <p className="text-white/70 text-xs">{fmt(ergebnis.proP.protein * 4, 0)} kcal</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">🌾 Kohlenhydrate</p>
            <p className="text-2xl font-bold">{fmt(ergebnis.proP.kh, 1)} g</p>
            <p className="text-white/70 text-xs">{fmt(ergebnis.proP.kh * 4, 0)} kcal</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">🧈 Fett</p>
            <p className="text-2xl font-bold">{fmt(ergebnis.proP.fett, 1)} g</p>
            <p className="text-white/70 text-xs">{fmt(ergebnis.proP.fett * 9, 0)} kcal</p>
          </div>
        </div>
        <p className="text-white/80 text-xs text-center">
          Eine Portion = {fmt(ergebnis.tagesAnteil, 0)} % des empfohlenen Tagesbedarfs (2.000 kcal)
        </p>
      </div>

      {/* Makro-Verteilung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Makro-Verteilung (pro Portion)</h2>
        <MacroBar protein={ergebnis.proP.protein} kh={ergebnis.proP.kh} fett={ergebnis.proP.fett} />
      </div>

      {/* Gesamtwerte */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Gesamtrezept ({ergebnis.portionenN} Portionen)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: 'Kalorien', wert: ergebnis.gesamt.kcal, einheit: 'kcal' },
            { label: 'Protein', wert: ergebnis.gesamt.protein, einheit: 'g' },
            { label: 'Kohlenhydrate', wert: ergebnis.gesamt.kh, einheit: 'g' },
            { label: 'Fett', wert: ergebnis.gesamt.fett, einheit: 'g' },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <p className="font-bold text-gray-800 dark:text-gray-200">{fmt(item.wert, 1)} {item.einheit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zutatentabelle */}
      {ergebnis.zeilen.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
          <div className="px-4 pt-4 pb-1">
            <h2 className="font-bold text-gray-700 dark:text-gray-200">Nährwerte je Zutat</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  <th className="px-3 py-2 text-left font-semibold">Zutat</th>
                  <th className="px-3 py-2 text-right font-semibold">Menge</th>
                  <th className="px-3 py-2 text-right font-semibold">kcal</th>
                  <th className="px-3 py-2 text-right font-semibold">P g</th>
                  <th className="px-3 py-2 text-right font-semibold">KH g</th>
                  <th className="px-3 py-2 text-right font-semibold">F g</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.zeilen.map(z => (
                  <tr key={z.lmKey + z.menge}>
                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 max-w-[140px] truncate">{z.name}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(z.menge, 0)} g</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(z.kcal, 0)}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(z.protein, 1)}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(z.kh, 1)}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(z.fett, 1)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700/30 font-semibold">
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-200">Gesamt</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamt.kcal, 0)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamt.protein, 1)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamt.kh, 1)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamt.fett, 1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hinweis */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>ℹ️ Hinweis:</strong> Nährwerte sind Rohwert-Angaben (ungekocht). Beim Kochen ändern sich Kalorien kaum — wohl aber das Gewicht (Wasser verdampft), was die Kalorienkonzentration erhöht. Alle Werte basieren auf Standardwerten des BLS (Bundeslebensmittelschlüssel).
        </p>
      </div>

      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienrechner: Tagesbedarf berechnen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/gesundheit/protein-rechner" emoji="🥩" text="Proteinbedarf berechnen" />

      <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Nährwert-Rechner" />

      <AiExplain
        rechnerName="Nährwert-pro-Portion-Rechner"
        eingaben={{
          zutaten: ergebnis.zeilen.map(z => `${z.name} ${fmt(z.menge, 0)} g`).join(', '),
          portionen: `${ergebnis.portionenN}`,
        }}
        ergebnis={{
          kcalPortion: `${fmt(ergebnis.proP.kcal, 0)} kcal`,
          protein: `${fmt(ergebnis.proP.protein, 1)} g`,
          kohlenhydrate: `${fmt(ergebnis.proP.kh, 1)} g`,
          fett: `${fmt(ergebnis.proP.fett, 1)} g`,
          tagesAnteil: `${fmt(ergebnis.tagesAnteil, 0)} % des Tagesbedarfs`,
        }}
      />
    </div>
  );
}
