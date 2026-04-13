'use client';

import { useState, useMemo } from 'react';
import { berechneKalorien } from '@/lib/berechnungen/kalorien';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

const AKTIVITAETEN = [
  { label: 'Kaum aktiv (Bürojob, kein Sport)', faktor: 1.2 },
  { label: 'Leicht aktiv (1-2× Sport/Woche)', faktor: 1.375 },
  { label: 'Mäßig aktiv (3-5× Sport/Woche)', faktor: 1.55 },
  { label: 'Sehr aktiv (6-7× Sport/Woche)', faktor: 1.725 },
  { label: 'Extrem aktiv (Leistungssport/körperliche Arbeit)', faktor: 1.9 },
];

export default function KalorienRechner() {
  const [geschlecht, setGeschlecht] = useState<'frau' | 'mann'>('frau');
  const [alter, setAlter] = useState('30');
  const [groesse, setGroesse] = useState('170');
  const [gewicht, setGewicht] = useState('70');
  const [aktivitaet, setAktivitaet] = useState('1.375');
  const [ziel, setZiel] = useState<'abnehmen' | 'halten' | 'zunehmen'>('halten');

  const nAlter = parseInt(alter) || 0;
  const nGroesse = parseDeutscheZahl(groesse);
  const nGewicht = parseDeutscheZahl(gewicht);
  const nAktivitaet = parseFloat(aktivitaet);

  const ergebnis = useMemo(
    () => berechneKalorien({ geschlecht, alter: nAlter, groesse: nGroesse, gewicht: nGewicht, aktivitaet: nAktivitaet, ziel }),
    [geschlecht, nAlter, nGroesse, nGewicht, nAktivitaet, ziel]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE');

  // Balken-Positionen berechnen
  const balkenDaten = useMemo(() => {
    if (!ergebnis) return null;
    const max = ergebnis.gesamtumsatz * 1.15;
    return {
      grundProzent: (ergebnis.grundumsatz / max) * 100,
      zielProzent: (ergebnis.zielKalorien / max) * 100,
      gesamtProzent: (ergebnis.gesamtumsatz / max) * 100,
    };
  }, [ergebnis]);

  const aktivitaetLabel = AKTIVITAETEN.find(a => a.faktor === nAktivitaet)?.label || '';

  return (
    <div>
      {/* Geschlecht Toggle */}
      <div className="flex gap-2 mb-6">
        {(['frau', 'mann'] as const).map(g => (
          <button
            key={g}
            onClick={() => setGeschlecht(g)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              geschlecht === g
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {g === 'frau' ? 'Frau' : 'Mann'}
          </button>
        ))}
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter</label>
          <NummerEingabe value={alter} onChange={setAlter} placeholder="z.B. 30" einheit="Jahre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Größe</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="z.B. 170" einheit="cm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="z.B. 70" einheit="kg" />
        </div>
      </div>

      {/* Aktivitätslevel */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivitätslevel</label>
        <select
          value={aktivitaet}
          onChange={e => setAktivitaet(e.target.value)}
          className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        >
          {AKTIVITAETEN.map(a => (
            <option key={a.faktor} value={a.faktor}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Ziel Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ziel</label>
        <div className="flex gap-2">
          {([
            { key: 'abnehmen' as const, label: 'Abnehmen' },
            { key: 'halten' as const, label: 'Gewicht halten' },
            { key: 'zunehmen' as const, label: 'Zunehmen' },
          ]).map(z => (
            <button
              key={z.key}
              onClick={() => setZiel(z.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                ziel === z.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && nAlter > 0 && nGroesse > 0 && nGewicht > 0 && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  Empfohlene Tageskalorien{ziel === 'abnehmen' ? ' (zum Abnehmen)' : ziel === 'zunehmen' ? ' (zum Zunehmen)' : ''}
                </p>
                <p className="text-5xl font-bold">{fmt(ergebnis.zielKalorien)} <span className="text-2xl">kcal</span></p>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundumsatz (Ruhe)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.grundumsatz)} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gesamtumsatz (mit Aktivität)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtumsatz)} kcal</span>
              </div>
              {ergebnis.differenz !== 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {ergebnis.differenz < 0 ? 'Kaloriendefizit' : 'Kalorienüberschuss'}
                  </span>
                  <span className={`font-semibold ${ergebnis.differenz < 0 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                    {ergebnis.differenz > 0 ? '+' : ''}{fmt(ergebnis.differenz)} kcal
                  </span>
                </div>
              )}
            </div>

            {/* Visualisierung */}
            {balkenDaten && (
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="relative h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  {/* Grundumsatz */}
                  <div
                    className="absolute inset-y-0 left-0 bg-blue-300 dark:bg-blue-500/60 rounded-l-full"
                    style={{ width: `${balkenDaten.grundProzent}%` }}
                  />
                  {/* Bis Ziel */}
                  <div
                    className="absolute inset-y-0 left-0 bg-primary-400 dark:bg-primary-500/60 rounded-l-full"
                    style={{ width: `${balkenDaten.zielProzent}%` }}
                  />
                  {/* Bis Gesamt */}
                  {ziel !== 'halten' && (
                    <div
                      className="absolute inset-y-0 left-0 bg-gray-300 dark:bg-gray-500/40 rounded-l-full -z-0"
                      style={{ width: `${balkenDaten.gesamtProzent}%` }}
                    />
                  )}
                  {/* Ziel-Markierung */}
                  <div
                    className="absolute inset-y-0 bg-primary-400 dark:bg-primary-500/60 rounded-l-full"
                    style={{ width: `${balkenDaten.zielProzent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Grundumsatz: {fmt(ergebnis.grundumsatz)}</span>
                  {ziel !== 'halten' && <span>Empfehlung: {fmt(ergebnis.zielKalorien)}</span>}
                  <span>Gesamtumsatz: {fmt(ergebnis.gesamtumsatz)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Makronährstoff-Verteilung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Makronährstoff-Verteilung</h3>
            <div className="space-y-3">
              {/* Protein */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Protein ({ergebnis.protein}%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.proteinGramm)} g</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 dark:bg-red-500/70 rounded-full" style={{ width: `${ergebnis.protein}%` }} />
                </div>
              </div>
              {/* Kohlenhydrate */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Kohlenhydrate ({ergebnis.kohlenhydrate}%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.kohlenhydrateGramm)} g</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 dark:bg-amber-500/70 rounded-full" style={{ width: `${ergebnis.kohlenhydrate}%` }} />
                </div>
              </div>
              {/* Fett */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Fett ({ergebnis.fett}%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.fettGramm)} g</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 dark:bg-green-500/70 rounded-full" style={{ width: `${ergebnis.fett}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Hinweis-Box */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung liefert Richtwerte. Individuelle Faktoren wie Muskelmasse, Stoffwechsel und Gesundheitszustand können den Bedarf beeinflussen. Konsultieren Sie bei Unsicherheit einen Arzt oder Ernährungsberater.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Kalorienbedarf: ${fmt(ergebnis.zielKalorien)} kcal/Tag (Grundumsatz: ${fmt(ergebnis.grundumsatz)} kcal, Gesamtumsatz: ${fmt(ergebnis.gesamtumsatz)} kcal)`}
            seitenTitel="Kalorienrechner"
          />

          <AiExplain
            rechnerName="Kalorienrechner"
            eingaben={{
              geschlecht,
              alter: nAlter,
              groesse: nGroesse,
              gewicht: nGewicht,
              aktivitaet: aktivitaetLabel,
              ziel,
            }}
            ergebnis={{
              grundumsatz: ergebnis.grundumsatz,
              gesamtumsatz: ergebnis.gesamtumsatz,
              zielKalorien: ergebnis.zielKalorien,
              proteinGramm: ergebnis.proteinGramm,
              kohlenhydrateGramm: ergebnis.kohlenhydrateGramm,
              fettGramm: ergebnis.fettGramm,
            }}
          />
        </>
      )}
    </div>
  );
}
