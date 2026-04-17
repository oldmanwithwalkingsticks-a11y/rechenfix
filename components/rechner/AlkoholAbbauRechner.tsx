'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl, clampInputValue } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type GetraenkArt = 'bier05' | 'bier03' | 'wein' | 'sekt' | 'schnaps' | 'cocktail' | 'eigen';

const GETRAENKE: Record<GetraenkArt, { label: string; ml: number; vol: number }> = {
  bier05:    { label: 'Bier 0,5 l (5 %)', ml: 500, vol: 5 },
  bier03:    { label: 'Bier 0,3 l (5 %)', ml: 300, vol: 5 },
  wein:      { label: 'Wein 0,2 l (12 %)', ml: 200, vol: 12 },
  sekt:      { label: 'Sekt 0,1 l (11 %)', ml: 100, vol: 11 },
  schnaps:   { label: 'Schnaps 2 cl (40 %)', ml: 20, vol: 40 },
  cocktail:  { label: 'Cocktail 0,3 l (15 %)', ml: 300, vol: 15 },
  eigen:     { label: 'Eigene Angabe', ml: 0, vol: 0 },
};

type Getraenk = {
  id: number;
  art: GetraenkArt;
  anzahl: string;
  ml: string;
  vol: string;
};

let nextId = 1;

function alkoholGramm(ml: number, vol: number): number {
  return ml * (vol / 100) * 0.8;
}

function addMinutes(d: Date, min: number): Date {
  return new Date(d.getTime() + min * 60000);
}

function fmtTime(d: Date): string {
  return d.toLocaleString('de-DE', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
}

const fmt = (n: number, d = 2) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function AlkoholAbbauRechner() {
  const [geschlecht, setGeschlecht] = useState<'m' | 'f'>('m');
  const [gewicht, setGewicht] = useState('80');
  const [getraenke, setGetraenke] = useState<Getraenk[]>([
    { id: nextId++, art: 'bier05', anzahl: '2', ml: '500', vol: '5' },
  ]);
  const [trinkBeginn, setTrinkBeginn] = useState('20:00');
  const [trinkDauer, setTrinkDauer] = useState('3');

  const ergebnis = useMemo(() => {
    const gew = Math.max(1, parseDeutscheZahl(gewicht) || 80);
    const r = geschlecht === 'm' ? 0.68 : 0.55;

    let gesamtAlk = 0;
    for (const g of getraenke) {
      const anz = parseDeutscheZahl(g.anzahl) || 0;
      if (g.art === 'eigen') {
        const ml = parseDeutscheZahl(g.ml) || 0;
        const vol = parseDeutscheZahl(g.vol) || 0;
        gesamtAlk += alkoholGramm(ml, vol) * anz;
      } else {
        const spec = GETRAENKE[g.art];
        gesamtAlk += alkoholGramm(spec.ml, spec.vol) * anz;
      }
    }

    const promilleMax = (gesamtAlk / (gew * r)) * 0.9; // Resorptionsdefizit 10 %
    const abbauRate = 0.15;

    // Zeitberechnung
    const heute = new Date();
    const [sh, sm] = trinkBeginn.split(':').map(Number);
    const beginn = new Date(heute);
    beginn.setHours(sh, sm, 0, 0);
    const dauerH = parseDeutscheZahl(trinkDauer) || 0;
    const ende = addMinutes(beginn, dauerH * 60);
    const peak = addMinutes(ende, 60); // Resorption

    const stundenBisNull = promilleMax / abbauRate;
    const zeitNull = addMinutes(peak, stundenBisNull * 60);

    const stundenBis03 = Math.max(0, (promilleMax - 0.3) / abbauRate);
    const zeit03 = addMinutes(peak, stundenBis03 * 60);

    const stundenBis05 = Math.max(0, (promilleMax - 0.5) / abbauRate);
    const zeit05 = addMinutes(peak, stundenBis05 * 60);

    const standardGlaeser = gesamtAlk / 10; // 1 Standardglas ≈ 10 g

    return { promilleMax, gesamtAlk, zeitNull, zeit03, zeit05, peak, standardGlaeser };
  }, [geschlecht, gewicht, getraenke, trinkBeginn, trinkDauer]);

  const updateGetraenk = (id: number, patch: Partial<Getraenk>) => {
    setGetraenke(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g));
  };
  const addGetraenk = () => setGetraenke(prev => [...prev, { id: nextId++, art: 'bier05', anzahl: '1', ml: '500', vol: '5' }]);
  const removeGetraenk = (id: number) => setGetraenke(prev => prev.filter(g => g.id !== id));

  const peakColor =
    ergebnis.promilleMax >= 1.1 ? 'bg-red-500' :
    ergebnis.promilleMax >= 0.5 ? 'bg-orange-500' :
    ergebnis.promilleMax >= 0.3 ? 'bg-yellow-500' :
    'bg-green-500';

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <RadioToggleGroup
            name="alkohol-geschlecht"
            legend="Geschlecht"
            options={[{ value: 'f', label: 'Frau' }, { value: 'm', label: 'Mann' }]}
            value={geschlecht}
            onChange={(v) => setGeschlecht(v as 'f' | 'm')}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={v => setGewicht(clampInputValue(v, 30, 250))} einheit="kg" />
        </div>

        <div>
          <label htmlFor="alkoholabbau-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Getränke</label>
          <div className="space-y-2">
            {getraenke.map(g => (
              <div key={g.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                <div className="flex gap-2 items-start">
                  <select id="alkoholabbau-select-1" value={g.art} onChange={e => updateGetraenk(g.id, { art: e.target.value as GetraenkArt })} className="flex-1 min-h-[44px] px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm">
                    {(Object.keys(GETRAENKE) as GetraenkArt[]).map(k => <option key={k} value={k}>{GETRAENKE[k].label}</option>)}
                  </select>
                  <input
                    type="number"
                    value={g.anzahl}
                    onChange={e => updateGetraenk(g.id, { anzahl: clampInputValue(e.target.value, 0, null) })}
                    className="w-16 min-h-[44px] px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-sm"
                    min="0"
                  />
                  <button onClick={() => removeGetraenk(g.id)} className="min-h-[44px] min-w-[44px] rounded-lg text-red-600 border border-red-200 dark:border-red-800" aria-label="Entfernen">×</button>
                </div>
                {g.art === 'eigen' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="number" value={g.ml} onChange={e => updateGetraenk(g.id, { ml: e.target.value })} placeholder="Menge (ml)" className="min-h-[40px] px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                    <input type="number" value={g.vol} onChange={e => updateGetraenk(g.id, { vol: e.target.value })} placeholder="Alkohol (Vol.-%)" className="min-h-[40px] px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={addGetraenk} className="mt-2 min-h-[40px] w-full px-3 rounded-lg border border-dashed border-primary-400 text-primary-600 dark:text-primary-400 text-sm font-medium">+ Getränk hinzufügen</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Trinkbeginn</label>
            <input type="time" value={trinkBeginn} onChange={e => setTrinkBeginn(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
          </div>
          <div>
            <label htmlFor="alkoholabbau-select-2" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Trinkdauer</label>
            <select id="alkoholabbau-select-2" value={trinkDauer} onChange={e => setTrinkDauer(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <option value="1">1 Stunde</option>
              <option value="2">2 Stunden</option>
              <option value="3">3 Stunden</option>
              <option value="4">4 Stunden</option>
              <option value="5">5+ Stunden</option>
            </select>
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Geschätzter maximaler BAK</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.promilleMax)} ‰</p>
        <div className="mt-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${peakColor} text-white`}>
            {ergebnis.promilleMax >= 1.1 ? 'Absolute Fahruntüchtigkeit' :
             ergebnis.promilleMax >= 0.5 ? 'Über 0,5 ‰-Grenze' :
             ergebnis.promilleMax >= 0.3 ? 'Unter 0,5 ‰' :
             'Unter 0,3 ‰'}
          </span>
        </div>
        <p className="text-white/80 text-sm mt-3">
          Gesamtalkohol: <strong>{fmt(ergebnis.gesamtAlk, 1)} g</strong> (≈ {fmt(ergebnis.standardGlaeser, 1)} Standardgläser)
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Wann bin ich wieder nüchtern?</h2>
        <div className="space-y-2 text-sm">
          {ergebnis.promilleMax > 0.5 && (
            <div className="flex justify-between">
              <span className="text-yellow-700 dark:text-yellow-400">🟡 Unter 0,5 ‰</span>
              <span className="font-medium">{fmtTime(ergebnis.zeit05)}</span>
            </div>
          )}
          {ergebnis.promilleMax > 0.3 && (
            <div className="flex justify-between">
              <span className="text-orange-700 dark:text-orange-400">🟠 Unter 0,3 ‰</span>
              <span className="font-medium">{fmtTime(ergebnis.zeit03)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-2">
            <span className="text-green-700 dark:text-green-400 font-medium">🟢 Voraussichtlich nüchtern (0,0 ‰)</span>
            <span className="font-bold">{fmtTime(ergebnis.zeitNull)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Abbaurate: ca. 0,15 ‰/Stunde · Resorption bis 60 Min. nach Trinkende
        </p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 mb-4 text-sm text-red-800 dark:text-red-200">
        <strong>⚠️ Wichtiger Hinweis:</strong> Diese Berechnung ist eine grobe Schätzung nach der Widmark-Formel. Individuelle Faktoren (Nahrung, Medikamente, Gesundheit, Trainingsstand) können den Wert stark beeinflussen. <strong>Die einzig sichere Grenze für den Straßenverkehr ist 0,0 ‰.</strong> Im Zweifel: NICHT fahren.
        {ergebnis.promilleMax >= 1.1 && (
          <p className="mt-2"><strong>⚠️ Ab 1,1 ‰ liegt absolute Fahruntüchtigkeit vor — dies ist eine Straftat (§ 316 StGB).</strong></p>
        )}
        {ergebnis.promilleMax >= 0.5 && ergebnis.promilleMax < 1.1 && (
          <p className="mt-2"><strong>⚠️ Bei über 0,5 ‰ drohen Bußgeld, Punkte und Fahrverbot.</strong></p>
        )}
      </div>

      <CrossLink href="/gesundheit/promillerechner" emoji="🍷" text="Promillerechner" />
      <CrossLink href="/arbeit/bussgeldrechner" emoji="⚖️" text="Bußgeldrechner" />
      <CrossLink href="/gesundheit/schlaf-rechner" emoji="😴" text="Schlafrechner" />

      <ErgebnisAktionen
        ergebnisText={`Alkohol-Abbau: Peak ${fmt(ergebnis.promilleMax)} ‰ · nüchtern ${fmtTime(ergebnis.zeitNull)}`}
        seitenTitel="Alkohol-Abbau-Rechner"
      />

      <AiExplain
        rechnerName="Alkohol-Abbau-Rechner"
        eingaben={{
          'Geschlecht': geschlecht === 'm' ? 'Mann' : 'Frau',
          'Gewicht': `${gewicht} kg`,
          'Gesamtalkohol': `${fmt(ergebnis.gesamtAlk, 1)} g`,
          'Trinkbeginn': trinkBeginn,
          'Trinkdauer': `${trinkDauer} h`,
        }}
        ergebnis={{
          'Max. Promille': `${fmt(ergebnis.promilleMax)} ‰`,
          'Nüchtern': fmtTime(ergebnis.zeitNull),
          'Unter 0,5 ‰': fmtTime(ergebnis.zeit05),
        }}
      />
    </div>
  );
}
