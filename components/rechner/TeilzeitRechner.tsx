'use client';

import { useState, useMemo } from 'react';
import { berechneTeilzeit } from '@/lib/berechnungen/teilzeit';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const BUNDESLAENDER = [
  { kuerzel: 'BW', name: 'Baden-Württemberg' },
  { kuerzel: 'BY', name: 'Bayern' },
  { kuerzel: 'BE', name: 'Berlin' },
  { kuerzel: 'BB', name: 'Brandenburg' },
  { kuerzel: 'HB', name: 'Bremen' },
  { kuerzel: 'HH', name: 'Hamburg' },
  { kuerzel: 'HE', name: 'Hessen' },
  { kuerzel: 'MV', name: 'Mecklenburg-Vorpommern' },
  { kuerzel: 'NI', name: 'Niedersachsen' },
  { kuerzel: 'NW', name: 'Nordrhein-Westfalen' },
  { kuerzel: 'RP', name: 'Rheinland-Pfalz' },
  { kuerzel: 'SL', name: 'Saarland' },
  { kuerzel: 'SN', name: 'Sachsen' },
  { kuerzel: 'ST', name: 'Sachsen-Anhalt' },
  { kuerzel: 'SH', name: 'Schleswig-Holstein' },
  { kuerzel: 'TH', name: 'Thüringen' },
];

const SCHNELLWAHL = [20, 25, 30, 32, 35];

export default function TeilzeitRechner() {
  const [vollzeitBrutto, setVollzeitBrutto] = useState('3500');
  const [vollzeitStunden, setVollzeitStunden] = useState('40');
  const [teilzeitStunden, setTeilzeitStunden] = useState('30');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [bundesland, setBundesland] = useState('NW');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [arbeitstage, setArbeitstage] = useState(5);

  const nVollzeitBrutto = parseDeutscheZahl(vollzeitBrutto);
  const nVollzeitStunden = parseDeutscheZahl(vollzeitStunden);
  const nTeilzeitStunden = parseDeutscheZahl(teilzeitStunden);
  const nUrlaubstage = parseInt(urlaubstage) || 0;

  const ergebnis = useMemo(
    () =>
      berechneTeilzeit({
        vollzeitBrutto: nVollzeitBrutto,
        vollzeitStunden: nVollzeitStunden,
        teilzeitStunden: nTeilzeitStunden,
        steuerklasse,
        bundesland,
        kirchensteuer,
        urlaubstageVollzeit: nUrlaubstage,
        arbeitstageProWocheTeilzeit: arbeitstage,
      }),
    [nVollzeitBrutto, nVollzeitStunden, nTeilzeitStunden, steuerklasse, bundesland, kirchensteuer, nUrlaubstage, arbeitstage],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Gehalt und Stunden */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vollzeit-Bruttogehalt</label>
          <NummerEingabe value={vollzeitBrutto} onChange={setVollzeitBrutto} placeholder="z.B. 3500" einheit="€/Mon." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vollzeit-Wochenstunden</label>
          <NummerEingabe value={vollzeitStunden} onChange={setVollzeitStunden} placeholder="z.B. 40" einheit="Std." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teilzeit-Wochenstunden</label>
          <NummerEingabe value={teilzeitStunden} onChange={setTeilzeitStunden} placeholder="z.B. 30" einheit="Std." />
        </div>
      </div>

      {/* Schnellwahl */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCHNELLWAHL.map(s => (
          <button
            key={s}
            onClick={() => setTeilzeitStunden(String(s))}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              nTeilzeitStunden === s
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {s} Std.
          </button>
        ))}
      </div>

      {/* Steuer und Bundesland */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select
            value={steuerklasse}
            onChange={e => setSteuerklasse(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {[1, 2, 3, 4, 5, 6].map(sk => (
              <option key={sk} value={sk}>Steuerklasse {sk === 1 ? 'I' : sk === 2 ? 'II' : sk === 3 ? 'III' : sk === 4 ? 'IV' : sk === 5 ? 'V' : 'VI'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BUNDESLAENDER.map(bl => (
              <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kirchensteuer */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kirchensteuer</label>
        <div className="flex gap-2">
          {([false, true] as const).map(v => (
            <button
              key={String(v)}
              onClick={() => setKirchensteuer(v)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                kirchensteuer === v
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {v ? 'Ja' : 'Nein'}
            </button>
          ))}
        </div>
      </div>

      {/* Urlaub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urlaubstage (Vollzeit)</label>
          <NummerEingabe value={urlaubstage} onChange={setUrlaubstage} placeholder="z.B. 30" einheit="Tage" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arbeitstage/Woche (Teilzeit)</label>
          <select
            value={arbeitstage}
            onChange={e => setArbeitstage(parseInt(e.target.value))}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value={5}>5 Tage</option>
            <option value={4}>4 Tage</option>
            <option value={3}>3 Tage</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Geschätztes Teilzeit-Netto</p>
            <p className="text-5xl font-bold">
              {fmt(ergebnis.teilzeitNetto)} <span className="text-2xl">€/Monat</span>
            </p>
          </div>

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6 overflow-x-auto">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Vollzeit vs. Teilzeit</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-2 pr-3 text-gray-600 dark:text-gray-400 font-medium" />
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Vollzeit</th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Teilzeit</th>
                  <th className="text-right py-2 pl-3 text-gray-600 dark:text-gray-400 font-medium">Differenz</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Wochenstunden</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nVollzeitStunden} Std.</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nTeilzeitStunden} Std.</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmtDez(nVollzeitStunden - nTeilzeitStunden)} Std.
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Brutto/Monat</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitBrutto)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitBrutto)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmt(ergebnis.bruttoDifferenz)} €
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Netto/Monat (ca.)</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitNetto)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitNetto)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-orange-600 dark:text-orange-400">
                    −{fmt(ergebnis.nettoDifferenz)} €
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Stundenlohn (brutto)</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.stundenlohn)} €</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.stundenlohn)} €</td>
                  <td className="py-3 pl-3 text-right font-semibold text-green-600 dark:text-green-400">±0 €</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 text-gray-700 dark:text-gray-300 font-medium">Urlaubstage</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{nUrlaubstage}</td>
                  <td className="py-3 px-3 text-right text-gray-800 dark:text-gray-200">{ergebnis.urlaubstageTeilzeit}</td>
                  <td className="py-3 pl-3 text-right font-semibold text-gray-500 dark:text-gray-400">
                    {ergebnis.urlaubstageTeilzeit === nUrlaubstage ? '—' : `−${nUrlaubstage - ergebnis.urlaubstageTeilzeit}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Progressions-Highlight */}
          {ergebnis.bruttoDifferenzProzent > ergebnis.nettoDifferenzProzent && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>Progressionsvorteil:</strong> Ihr Netto sinkt nur um <strong>{fmtDez(ergebnis.nettoDifferenzProzent)} %</strong> — obwohl Ihr Brutto um <strong>{fmtDez(ergebnis.bruttoDifferenzProzent)} %</strong> sinkt. Durch die niedrigere Steuerlast bei Teilzeit behalten Sie pro verdientem Euro mehr Netto.
              </p>
            </div>
          )}

          {/* Stundenlohn-Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Stundenlohn:</strong> Ihr Brutto-Stundenlohn bleibt gleich: <strong>{fmtDez(ergebnis.stundenlohn)} €/Stunde</strong>. Teilzeit bedeutet weniger Stunden, nicht weniger Vergütung pro Stunde.
            </p>
          </div>

          {/* Balkendiagramm */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Netto-Vergleich</h2>
            <div className="space-y-3">
              {/* Vollzeit */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Vollzeit-Netto</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.vollzeitNetto)} €</span>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 dark:bg-primary-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              {/* Teilzeit */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Teilzeit-Netto</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.teilzeitNetto)} €</span>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-blue-400 dark:bg-blue-500 rounded-full"
                    style={{ width: `${ergebnis.vollzeitNetto > 0 ? (ergebnis.teilzeitNetto / ergebnis.vollzeitNetto) * 100 : 0}%` }}
                  />
                </div>
              </div>
              {/* Differenz */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Monatliche Netto-Differenz</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">−{fmt(ergebnis.nettoDifferenz)} €</span>
              </div>
            </div>
          </div>

          {/* Jahresübersicht */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Jahresübersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jahresbrutto Vollzeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.jahresBruttoVollzeit)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jahresbrutto Teilzeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.jahresBruttoTeilzeit)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Netto-Differenz pro Jahr</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">−{fmt(ergebnis.jahresNettoDifferenz)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Die Netto-Berechnung ist eine Schätzung auf Basis der Steuer- und Sozialversicherungswerte 2026. Für eine exakte Berechnung nutzen Sie unseren <a href="/finanzen/brutto-netto-rechner" className="underline hover:no-underline">Brutto-Netto-Rechner</a>.
            </p>
          </div>

          <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Exaktes Netto bei Teilzeit berechnen" />
          <CrossLink href="/arbeit/urlaubstage-rechner" emoji="🏖️" text="Urlaubsanspruch bei Teilzeit berechnen" />

          <AffiliateBox programId="wiso" context="teilzeit" />

          <ErgebnisAktionen
            ergebnisText={`Teilzeit (${nTeilzeitStunden} von ${nVollzeitStunden} Std.): Brutto ${fmt(ergebnis.teilzeitBrutto)} € → Netto ca. ${fmt(ergebnis.teilzeitNetto)} €/Monat | Differenz zu Vollzeit: −${fmt(ergebnis.nettoDifferenz)} €/Monat (−${fmt(ergebnis.jahresNettoDifferenz)} €/Jahr)`}
            seitenTitel="Teilzeit-Rechner"
          />

          <AiExplain
            rechnerName="Teilzeit-Rechner"
            eingaben={{
              vollzeitBrutto: nVollzeitBrutto,
              vollzeitStunden: nVollzeitStunden,
              teilzeitStunden: nTeilzeitStunden,
              steuerklasse,
              bundesland,
              kirchensteuer: kirchensteuer ? 'Ja' : 'Nein',
              urlaubstage: nUrlaubstage,
              arbeitstageProWoche: arbeitstage,
            }}
            ergebnis={{
              teilzeitBrutto: ergebnis.teilzeitBrutto,
              teilzeitNetto: ergebnis.teilzeitNetto,
              nettoDifferenz: ergebnis.nettoDifferenz,
              bruttoDifferenzProzent: ergebnis.bruttoDifferenzProzent,
              nettoDifferenzProzent: ergebnis.nettoDifferenzProzent,
              stundenlohn: ergebnis.stundenlohn,
              urlaubstageTeilzeit: ergebnis.urlaubstageTeilzeit,
            }}
          />
        </>
      )}
    </div>
  );
}
