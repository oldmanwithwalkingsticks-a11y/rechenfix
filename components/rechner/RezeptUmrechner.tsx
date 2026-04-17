'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Einheit = 'g' | 'kg' | 'ml' | 'l' | 'EL' | 'TL' | 'Stück' | 'Prise' | 'Bund' | 'Dose' | 'Becher';

interface Zutat {
  id: number;
  menge: string;
  einheit: Einheit;
  name: string;
}

const EINHEITEN: Einheit[] = ['g', 'kg', 'ml', 'l', 'EL', 'TL', 'Stück', 'Prise', 'Bund', 'Dose', 'Becher'];

/** Standard-Zutaten: Quelle für Initial-State UND Reset-Button */
const DEFAULT_INGREDIENTS: Zutat[] = [
  { id: 1, menge: '250', einheit: 'g',     name: 'Mehl' },
  { id: 2, menge: '4',   einheit: 'Stück', name: 'Eier' },
  { id: 3, menge: '500', einheit: 'ml',    name: 'Milch' },
  { id: 4, menge: '1',   einheit: 'Prise', name: 'Salz' },
  { id: 5, menge: '2',   einheit: 'EL',    name: 'Zucker' },
  { id: 6, menge: '30',  einheit: 'g',     name: 'Butter' },
];

const MIN_PORTIONEN = 1;
const MAX_PORTIONEN = 50;

function clampPortionen(raw: number): number {
  if (isNaN(raw)) return MIN_PORTIONEN;
  return Math.min(MAX_PORTIONEN, Math.max(MIN_PORTIONEN, raw));
}

function parseZahl(s: string): number {
  const n = parseFloat(s.replace(',', '.'));
  return isNaN(n) ? 0 : n;
}

function fmtMenge(n: number, einheit: Einheit): string {
  if (n === 0) return '0';

  switch (einheit) {
    case 'Stück':
    case 'Bund':
    case 'Dose':
    case 'Becher':
      return String(Math.max(1, Math.round(n)));
    case 'Prise':
      return String(Math.max(1, Math.round(n)));
    case 'EL':
    case 'TL': {
      const gerundet = Math.round(n * 2) / 2;
      return gerundet.toString().replace('.', ',');
    }
    case 'g':
    case 'ml': {
      if (n < 10) {
        return (Math.round(n * 2) / 2).toString().replace('.', ',');
      }
      const gerundet = Math.round(n / 5) * 5;
      return gerundet.toLocaleString('de-DE');
    }
    case 'kg':
    case 'l': {
      return (Math.round(n * 100) / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    default:
      return n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  }
}

export default function RezeptUmrechner() {
  const [originalPortionen, setOriginalPortionen] = useState<number>(4);
  const [gewuenschtePortionen, setGewuenschtePortionen] = useState<number>(6);
  const [zutaten, setZutaten] = useState<Zutat[]>(DEFAULT_INGREDIENTS);

  // Guard: ungültige Portionen (< 1) blenden Faktor und Tabelle aus
  const portionenValide = originalPortionen >= 1 && gewuenschtePortionen >= 1;

  const faktor = useMemo(() => {
    if (!portionenValide) return 1;
    return gewuenschtePortionen / originalPortionen;
  }, [originalPortionen, gewuenschtePortionen, portionenValide]);

  const neuesZutatenliste = useMemo(() => {
    return zutaten.map(z => {
      // Prisen-Cap: Einheit „Prise" wird nie skaliert
      if (z.einheit === 'Prise') {
        const originalMenge = parseZahl(z.menge);
        return {
          ...z,
          neueMenge: originalMenge,
          neueMengeFormatiert: fmtMenge(originalMenge, 'Prise'),
        };
      }
      return {
        ...z,
        neueMenge: parseZahl(z.menge) * faktor,
        neueMengeFormatiert: fmtMenge(parseZahl(z.menge) * faktor, z.einheit),
      };
    });
  }, [zutaten, faktor]);

  const fmtFaktor = faktor.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  function handlePortionenChange(setter: (n: number) => void, e: React.ChangeEvent<HTMLInputElement>) {
    const raw = parseInt(e.target.value, 10);
    setter(clampPortionen(raw));
  }

  function handleReset() {
    setOriginalPortionen(4);
    setGewuenschtePortionen(4);
    setZutaten(DEFAULT_INGREDIENTS);
  }

  function addZutat() {
    const neueId = Math.max(...zutaten.map(z => z.id), 0) + 1;
    setZutaten([...zutaten, { id: neueId, menge: '', einheit: 'g', name: '' }]);
  }

  function removeZutat(id: number) {
    setZutaten(zutaten.filter(z => z.id !== id));
  }

  function updateZutat(id: number, feld: keyof Zutat, wert: string) {
    setZutaten(zutaten.map(z => z.id === id ? { ...z, [feld]: wert } : z));
  }

  const zutatenListeText = neuesZutatenliste
    .filter(z => z.name.trim())
    .map(z => `- ${z.neueMengeFormatiert} ${z.einheit} ${z.name}`)
    .join('\n');

  return (
    <div>
      {/* === 1: Portionen === */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rezept-original" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
            Originalportionen
          </label>
          <input
            id="rezept-original"
            type="number"
            min={MIN_PORTIONEN}
            max={MAX_PORTIONEN}
            step="1"
            value={originalPortionen}
            onChange={e => handlePortionenChange(setOriginalPortionen, e)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          />
        </div>
        <div>
          <label htmlFor="rezept-gewuenscht" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
            Gewünschte Portionen
          </label>
          <input
            id="rezept-gewuenscht"
            type="number"
            min={MIN_PORTIONEN}
            max={MAX_PORTIONEN}
            step="1"
            value={gewuenschtePortionen}
            onChange={e => handlePortionenChange(setGewuenschtePortionen, e)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          />
        </div>
      </div>

      {/* Schnellaktionen */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGewuenschtePortionen(clampPortionen(originalPortionen * 2))}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          × 2 (verdoppeln)
        </button>
        <button
          type="button"
          onClick={() => setGewuenschtePortionen(clampPortionen(Math.round(originalPortionen / 2)))}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          ÷ 2 (halbieren)
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          Zurücksetzen
        </button>
      </div>

      {/* === Ergebnis: Faktor === */}
      {portionenValide ? (
        <div className="result-box mb-6 text-center">
          <p className="text-white/80 text-sm mb-1">Umrechnungsfaktor</p>
          <p className="text-5xl font-bold">× {fmtFaktor}</p>
          <p className="text-white/90 text-sm mt-2">
            Von {originalPortionen} auf {gewuenschtePortionen} Portionen
          </p>
        </div>
      ) : (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm"
        >
          <strong>Hinweis:</strong> Bitte Original- und gewünschte Portionen eingeben (mindestens 1).
        </div>
      )}

      {/* === Zutaten === */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">Zutatenliste</h2>
          <button
            type="button"
            onClick={addZutat}
            className="px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium"
          >
            + Zutat hinzufügen
          </button>
        </div>

        <div className="space-y-2">
          {zutaten.map((z, idx) => (
            <div key={z.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                inputMode="decimal"
                value={z.menge}
                onChange={e => updateZutat(z.id, 'menge', e.target.value)}
                placeholder="250"
                aria-label={`Menge Zutat ${idx + 1}`}
                className="col-span-3 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[44px] text-sm"
              />
              <select
                value={z.einheit}
                onChange={e => updateZutat(z.id, 'einheit', e.target.value)}
                aria-label={`Einheit Zutat ${idx + 1}`}
                className="col-span-3 px-2 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[44px] text-sm"
              >
                {EINHEITEN.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <input
                type="text"
                value={z.name}
                onChange={e => updateZutat(z.id, 'name', e.target.value)}
                placeholder="z. B. Mehl"
                aria-label={`Zutat ${idx + 1}`}
                className="col-span-5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[44px] text-sm"
              />
              <button
                type="button"
                onClick={() => removeZutat(z.id)}
                aria-label={`Zutat ${idx + 1} entfernen`}
                className="col-span-1 h-11 w-11 rounded-lg border border-gray-200 dark:border-gray-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-lg"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* === Umgerechnete Zutatenliste === */}
      {portionenValide && (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">
            Umgerechnete Zutaten für {gewuenschtePortionen} Portionen
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Zutat</th>
                <th className="px-4 py-2 text-right font-semibold">Original</th>
                <th className="px-4 py-2 text-right font-semibold">Neu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {neuesZutatenliste.filter(z => z.name.trim()).map(z => (
                <tr key={z.id}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{z.name || '—'}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {z.menge} {z.einheit}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-primary-700 dark:text-primary-300 font-semibold whitespace-nowrap">
                    {z.neueMengeFormatiert} {z.einheit}
                  </td>
                </tr>
              ))}
              {neuesZutatenliste.filter(z => z.name.trim()).length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Fügen Sie Zutaten hinzu, um die Umrechnung zu sehen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Tipp Backrezepte */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💡 Backrezepte:</strong> Bei Verdopplung bleibt die Backzeit fast gleich — nur die Formgröße muss angepasst werden. Salz und scharfe Gewürze lieber 20 % weniger einrechnen und am Ende abschmecken. Ab Faktor 3 besser in zwei Durchgängen backen.
        </p>
      </div>

      <CrossLink href="/kochen/cups-umrechner" emoji="🥣" text="Cups in Gramm umrechnen" />
      <CrossLink href="/alltag/einheiten-umrechner" emoji="📏" text="Einheiten umrechnen" />
      <CrossLink href="/alltag/dreisatz-rechner" emoji="⚖️" text="Dreisatz-Rechner" />

      <ErgebnisAktionen
        ergebnisText={`Rezept-Umrechner: ${originalPortionen} → ${gewuenschtePortionen} Portionen (Faktor × ${fmtFaktor})\n\n${zutatenListeText}`}
        seitenTitel="Rezept-Umrechner"
      />

      <AiExplain
        rechnerName="Rezept-Umrechner"
        eingaben={{
          originalPortionen,
          gewuenschtePortionen,
          anzahlZutaten: String(neuesZutatenliste.filter(z => z.name.trim()).length),
        }}
        ergebnis={{
          faktor: `× ${fmtFaktor}`,
          zutatenlisteNeu: zutatenListeText || '(keine Zutaten)',
        }}
      />
    </div>
  );
}
