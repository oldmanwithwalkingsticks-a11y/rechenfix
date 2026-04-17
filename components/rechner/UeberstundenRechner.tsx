'use client';

import { useState, useMemo } from 'react';
import {
  berechneUeberstunden,
  berechneVerguetung,
} from '@/lib/berechnungen/ueberstunden';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'berechnen' | 'verguetung';
type EingabeArt = 'gesamt' | 'tageweise';

const fmtZahl = (n: number, stellen = 2) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen });

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

export default function UeberstundenRechner() {
  const [modus, setModus] = useState<Modus>('berechnen');

  // Modus 1
  const [vertraglicheStunden, setVertraglicheStunden] = useState('40');
  const [eingabeArt, setEingabeArt] = useState<EingabeArt>('gesamt');
  const [tatsaechlich, setTatsaechlich] = useState('45');
  const [tagesStunden, setTagesStunden] = useState(['8', '8', '8', '8', '8']);
  const [zeitraum, setZeitraum] = useState<'woche' | 'monat' | 'custom'>('woche');
  const [customWochen, setCustomWochen] = useState('4');

  // Modus 2
  const [ueberstunden, setUeberstunden] = useState('10');
  const [bruttogehalt, setBruttogehalt] = useState('3500');
  const [monatsstunden, setMonatsstunden] = useState('173.33');
  const [zuschlag, setZuschlag] = useState('0');

  const tatsaechlicheStunden = useMemo(() => {
    if (eingabeArt === 'gesamt') return parseFloat(tatsaechlich.replace(',', '.')) || 0;
    return tagesStunden.reduce((s, v) => s + (parseFloat(v.replace(',', '.')) || 0), 0);
  }, [eingabeArt, tatsaechlich, tagesStunden]);

  const ergebnis1 = useMemo(() => berechneUeberstunden({
    vertraglicheStunden: parseFloat(vertraglicheStunden.replace(',', '.')) || 0,
    tatsaechlicheStunden,
    zeitraum,
    customWochen: parseInt(customWochen, 10) || 0,
  }), [vertraglicheStunden, tatsaechlicheStunden, zeitraum, customWochen]);

  const ergebnis2 = useMemo(() => berechneVerguetung({
    ueberstunden: parseFloat(ueberstunden.replace(',', '.')) || 0,
    bruttogehalt: parseFloat(bruttogehalt.replace(',', '.')) || 0,
    monatsstunden: parseFloat(monatsstunden.replace(',', '.')) || 0,
    zuschlag: parseFloat(zuschlag.replace(',', '.')) || 0,
  }), [ueberstunden, bruttogehalt, monatsstunden, zuschlag]);

  const updateTag = (idx: number, val: string) => {
    setTagesStunden(prev => prev.map((v, i) => i === idx ? val : v));
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'berechnen' as Modus, label: 'Überstunden berechnen' },
          { key: 'verguetung' as Modus, label: 'Überstunden-Vergütung' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Überstunden berechnen */}
      {modus === 'berechnen' && (
        <div>
          <div className="mb-4">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vertragliche Wochenarbeitszeit</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max="80"
                step="0.5"
                value={vertraglicheStunden}
                onChange={e => setVertraglicheStunden(clampInputValue(e.target.value, 0, 80))}
                className="input-field w-full pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Std./Wo.</span>
            </div>
          </div>

          {/* Eingabeart Toggle */}
          <div className="flex gap-2 mb-4">
            {([
              { key: 'gesamt' as EingabeArt, label: 'Gesamtstunden' },
              { key: 'tageweise' as EingabeArt, label: 'Tageweise (Mo–Fr)' },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => setEingabeArt(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  eingabeArt === t.key
                    ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {eingabeArt === 'gesamt' ? (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tatsächliche Wochenarbeitszeit</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="120"
                  step="0.5"
                  value={tatsaechlich}
                  onChange={e => setTatsaechlich(clampInputValue(e.target.value, 0, 120))}
                  className="input-field w-full pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Std./Wo.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              {WOCHENTAGE.map((tag, idx) => (
                <div key={tag} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-12">{tag.slice(0, 2)}</span>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      max="24"
                      step="0.5"
                      value={tagesStunden[idx]}
                      onChange={e => updateTag(idx, clampInputValue(e.target.value, 0, 24))}
                      className="input-field w-full pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">h</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Summe: <strong>{fmtZahl(tatsaechlicheStunden, 1)} Std.</strong>
              </p>
            </div>
          )}

          {/* Zeitraum */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Zeitraum</label>
            <div className="flex gap-2">
              {([
                { key: 'woche' as const, label: '1 Woche' },
                { key: 'monat' as const, label: '1 Monat' },
                { key: 'custom' as const, label: 'Benutzerdefiniert' },
              ]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setZeitraum(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    zeitraum === t.key
                      ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {zeitraum === 'custom' && (
              <div className="mt-2 relative w-32">
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="52"
                  value={customWochen}
                  onChange={e => setCustomWochen(clampInputValue(e.target.value, 1, 52))}
                  className="input-field w-full pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">Wochen</span>
              </div>
            )}
          </div>

          {/* Ergebnis */}
          {ergebnis1 && (
            <div className="space-y-4">
              <div className={`rounded-2xl p-6 text-center ${
                ergebnis1.istMinusstunden
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-500/15 dark:to-yellow-600/10'
                  : 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  ergebnis1.istMinusstunden
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-primary-600 dark:text-primary-400'
                }`}>
                  {ergebnis1.istMinusstunden ? 'Minusstunden' : 'Überstunden'} {ergebnis1.zeitraumLabel}
                </p>
                <p className={`text-4xl font-extrabold ${
                  ergebnis1.istMinusstunden
                    ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-primary-700 dark:text-primary-300'
                }`}>
                  {ergebnis1.zeitraumWert >= 0 ? '+' : ''}{fmtZahl(ergebnis1.zeitraumWert, 1)} Std.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Woche</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proWoche >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proWoche, 1)} h
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proMonat >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proMonat, 1)} h
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Jahr</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {ergebnis1.proJahr >= 0 ? '+' : ''}{fmtZahl(ergebnis1.proJahr, 1)} h
                  </p>
                </div>
              </div>

              {!ergebnis1.istMinusstunden && ergebnis1.proWoche > 0 && (
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300 flex gap-2">
                    <span className="shrink-0">💡</span>
                    <span>
                      Das entspricht <strong>{fmtZahl(ergebnis1.zusaetzlicheTageProJahr, 1)} zusätzlichen Arbeitstagen</strong> pro Jahr.
                    </span>
                  </p>
                </div>
              )}

              {ergebnis1.istMinusstunden && (
                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 flex gap-2">
                    <span className="shrink-0">⚠️</span>
                    <span>
                      Sie leisten <strong>{fmtZahl(Math.abs(ergebnis1.proWoche), 1)} Stunden weniger</strong> als vertraglich vereinbart. Je nach Arbeitsvertrag können Minusstunden nachgearbeitet oder vom Gehalt abgezogen werden.
                    </span>
                  </p>
                </div>
              )}

              <CrossLink href="/arbeit/arbeitszeitrechner" emoji="⏱️" text="Arbeitszeit berechnen" />

              <ErgebnisAktionen
                ergebnisText={`${ergebnis1.istMinusstunden ? 'Minusstunden' : 'Überstunden'} ${ergebnis1.zeitraumLabel}: ${ergebnis1.zeitraumWert >= 0 ? '+' : ''}${fmtZahl(ergebnis1.zeitraumWert, 1)} Std.`}
                seitenTitel="Überstunden berechnen"
              />

              <AiExplain
                rechnerName="Überstunden-Rechner"
                eingaben={{ vertraglicheStunden: parseFloat(vertraglicheStunden.replace(',', '.')) || 0, tatsaechlicheStunden, zeitraum }}
                ergebnis={{ proWoche: ergebnis1.proWoche, proMonat: ergebnis1.proMonat, proJahr: ergebnis1.proJahr, istMinusstunden: ergebnis1.istMinusstunden, zusaetzlicheTageProJahr: ergebnis1.zusaetzlicheTageProJahr }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Vergütung */}
      {modus === 'verguetung' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Anzahl Überstunden</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={ueberstunden}
                onChange={e => setUeberstunden(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bruttogehalt monatlich</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={bruttogehalt}
                  onChange={e => setBruttogehalt(e.target.value)}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">€</span>
              </div>
              <CrossLink href="/finanzen/stundenlohn-rechner" emoji="💶" text="Stundenlohn aus Gehalt berechnen" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Monatsstunden (vertraglich)</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={monatsstunden}
                  onChange={e => setMonatsstunden(e.target.value)}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">h</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Überstundenzuschlag</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="200"
                  value={zuschlag}
                  onChange={e => setZuschlag(clampInputValue(e.target.value, 0, 200))}
                  className="input-field w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">%</span>
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          {ergebnis2 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Vergütung (Brutto)</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtEuro(ergebnis2.verguetungBrutto)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Geschätzt netto: ≈ {fmtEuro(ergebnis2.verguetungNetto)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stundenlohn</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtEuro(ergebnis2.stundenlohn)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Überstundenlohn</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtEuro(ergebnis2.ueberstundenlohn)}
                  </p>
                </div>
              </div>

              {/* Zuschlag-Vergleich */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Zuschlag-Vergleich</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Zuschlag</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Stundenlohn</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Brutto</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">≈ Netto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {ergebnis2.szenarien.map(s => (
                        <tr
                          key={s.zuschlag}
                          className={s.zuschlag === (parseFloat(zuschlag) || 0)
                            ? 'bg-primary-50/50 dark:bg-primary-500/5 font-medium'
                            : ''
                          }
                        >
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{s.zuschlag}%</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.ueberstundenlohn)}</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.verguetungBrutto)}</td>
                          <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmtEuro(s.verguetungNetto)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-500 text-center">
                Die Nettoschätzung basiert auf einem pauschalen Abzug von ca. 40% und dient nur zur Orientierung.
              </p>

              <ErgebnisAktionen
                ergebnisText={`Überstunden-Vergütung: ${fmtEuro(ergebnis2.verguetungBrutto)} brutto (${fmtEuro(ergebnis2.stundenlohn)}/Std., ${fmtEuro(ergebnis2.ueberstundenlohn)}/Überstunde)`}
                seitenTitel="Überstunden berechnen"
              />
            </div>
          )}
        </div>
      )}

      {(ergebnis1 || ergebnis2) && (
        <>
          <AffiliateBox programId="ks-auxilia" context="ueberstunden" />
          <AffiliateBox programId="lexware" variant="compact" />
        </>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information. Überstundenregelungen hängen vom Arbeitsvertrag und Tarifvertrag ab.
      </p>
    </div>
  );
}
