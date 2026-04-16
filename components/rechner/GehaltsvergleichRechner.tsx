'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneGehaltsvergleich,
  berufsgruppen,
  bundeslandFaktoren,
  altersFaktoren,
} from '@/lib/berechnungen/gehaltsvergleich';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtE = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const bundeslaender = Object.entries(bundeslandFaktoren)
  .sort((a, b) => a[1].label.localeCompare(b[1].label));

const altersgruppen = Object.entries(altersFaktoren);

function PerzentilBar({ perzentil }: { perzentil: number }) {
  const markerLeft = `${Math.max(2, Math.min(98, perzentil))}%`;

  return (
    <div className="relative mt-2 mb-6">
      <div className="h-4 rounded-full overflow-hidden flex">
        <div className="bg-red-400 flex-1" />
        <div className="bg-orange-400 flex-1" />
        <div className="bg-yellow-400 flex-1" />
        <div className="bg-green-400 flex-1" />
        <div className="bg-emerald-500 flex-1" />
      </div>
      <div className="flex justify-between text-[10px] text-gray-600 mt-1 px-0.5">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      <div
        className="absolute top-0 -translate-x-1/2"
        style={{ left: markerLeft }}
      >
        <div className="w-1 h-4 bg-gray-800 dark:bg-white rounded-full" />
        <div className="text-xs font-bold text-gray-800 dark:text-white text-center mt-0.5 -ml-3 w-8">
          {perzentil}%
        </div>
      </div>
    </div>
  );
}

export default function GehaltsvergleichRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [beruf, setBeruf] = useState('gesamt');
  const [bundesland, setBundesland] = useState('NW');
  const [alter, setAlter] = useState('35-44');

  const nBrutto = parseDeutscheZahl(brutto);

  const ergebnis = useMemo(
    () => berechneGehaltsvergleich(nBrutto, beruf, bundesland, alter),
    [nBrutto, beruf, bundesland, alter]
  );

  const berufLabel = berufsgruppen.find(b => b.key === beruf)?.label ?? '';
  const blLabel = bundeslandFaktoren[bundesland]?.label ?? '';
  const alterLabel = altersFaktoren[alter]?.label ?? '';

  return (
    <div className="space-y-6">
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ihr Bruttogehalt (monatlich)</label>
          <NummerEingabe value={brutto} onChange={setBrutto} placeholder="z. B. 3.500" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Berufsgruppe</label>
          <select
            value={beruf}
            onChange={e => setBeruf(e.target.value)}
            className="input-field w-full"
          >
            {berufsgruppen.map(b => (
              <option key={b.key} value={b.key}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="input-field w-full"
          >
            {bundeslaender.map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Altersgruppe</label>
          <select
            value={alter}
            onChange={e => setAlter(e.target.value)}
            className="input-field w-full"
          >
            {altersgruppen.map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && nBrutto > 0 && (
        <div className="space-y-5">
          {/* Hauptergebnis */}
          <div className="result-box text-center">
            <p className="text-white/80 text-sm mb-2">
              Sie verdienen {ergebnis.perzentil >= 50 ? 'mehr' : 'weniger'} als
            </p>
            <p className="text-5xl font-extrabold">{ergebnis.perzentil}%</p>
            <p className="text-white/80 text-sm mt-2">
              der Arbeitnehmer in der Gruppe &bdquo;{berufLabel}&ldquo;
            </p>
            <p className="text-white/60 text-xs mt-1">
              {blLabel} · {alterLabel}
            </p>
          </div>

          {/* Perzentil-Leiste */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-1 text-sm">Ihre Position in der Gehaltsverteilung</h2>
            <PerzentilBar perzentil={ergebnis.perzentil} />
          </div>

          {/* Vergleich zum Median */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ihr Gehalt</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(nBrutto)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Median der Vergleichsgruppe</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.adjustierterMedian)} €</p>
            </div>
            <div className={`rounded-xl p-4 text-center border ${
              ergebnis.differenz >= 0
                ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
            }`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Differenz</p>
              <p className={`text-xl font-bold ${
                ergebnis.differenz >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {ergebnis.differenz >= 0 ? '+' : ''}{fmt(ergebnis.differenz)} €
              </p>
              <p className={`text-xs mt-0.5 ${
                ergebnis.differenz >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                ({ergebnis.differenzProzent >= 0 ? '+' : ''}{ergebnis.differenzProzent}%)
              </p>
            </div>
          </div>

          {/* Gehaltsverteilung Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Gehaltsspannen in Ihrer Vergleichsgruppe</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.perzentilStufen.map(s => (
                <div key={s.prozent} className={`flex justify-between px-4 py-2.5 text-sm ${
                  s.prozent === 50 ? 'font-bold bg-primary-50/50 dark:bg-primary-500/5' : ''
                }`}>
                  <span className="text-gray-600 dark:text-gray-400">
                    {s.prozent === 50 ? 'Median (50%)' : `${s.prozent}. Perzentil`}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(s.gehalt)} €</span>
                </div>
              ))}
            </div>
          </div>

          {/* Einordnung */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.perzentil >= 75
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
              : ergebnis.perzentil >= 50
                ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                : ergebnis.perzentil >= 25
                  ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
                  : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <p className={`font-semibold text-sm mb-1 ${
              ergebnis.perzentil >= 75
                ? 'text-emerald-700 dark:text-emerald-400'
                : ergebnis.perzentil >= 50
                  ? 'text-green-700 dark:text-green-400'
                  : ergebnis.perzentil >= 25
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-red-700 dark:text-red-400'
            }`}>
              {ergebnis.perzentil >= 75
                ? 'Überdurchschnittliches Gehalt'
                : ergebnis.perzentil >= 50
                  ? 'Gehalt im oberen Mittelfeld'
                  : ergebnis.perzentil >= 25
                    ? 'Gehalt im unteren Mittelfeld'
                    : 'Unterdurchschnittliches Gehalt'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {ergebnis.perzentil >= 75
                ? `Mit ${fmtE(nBrutto)} € brutto verdienen Sie mehr als ${ergebnis.perzentil}% Ihrer Vergleichsgruppe. Sie gehören zu den Top-${100 - ergebnis.perzentil}% der Verdiener.`
                : ergebnis.perzentil >= 50
                  ? `Mit ${fmtE(nBrutto)} € brutto liegen Sie über dem Median Ihrer Vergleichsgruppe. ${fmt(ergebnis.differenz)} € mehr als der Durchschnitt.`
                  : ergebnis.perzentil >= 25
                    ? `Mit ${fmtE(nBrutto)} € brutto liegen Sie unter dem Median Ihrer Vergleichsgruppe. Eine Gehaltsverhandlung oder ein Jobwechsel könnte sich lohnen.`
                    : `Mit ${fmtE(nBrutto)} € brutto liegen Sie deutlich unter dem Median. Prüfen Sie, ob Ihr Gehalt dem Marktstandard entspricht.`}
            </p>
          </div>

          {/* Jahresgehalt */}
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4">
            <p className="font-semibold text-primary-700 dark:text-primary-400 text-sm mb-2">Hochrechnung Jahresgehalt</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Ihr Jahresgehalt (12 Monate)</p>
                <p className="font-bold text-gray-800 dark:text-gray-100">{fmt(nBrutto * 12)} €</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Mit Weihnachtsgeld (13. Gehalt)</p>
                <p className="font-bold text-gray-800 dark:text-gray-100">{fmt(nBrutto * 13)} €</p>
              </div>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Gehaltsvergleich: ${fmtE(nBrutto)} € brutto — Perzentil ${ergebnis.perzentil}% (${berufLabel}, ${blLabel}, ${alterLabel})`}
            seitenTitel="Gehaltsvergleich"
          />

          <AiExplain
            rechnerName="Gehaltsvergleich"
            eingaben={{ bruttoGehalt: nBrutto, berufsgruppe: berufLabel, bundesland: blLabel, altersgruppe: alterLabel }}
            ergebnis={{ perzentil: ergebnis.perzentil, adjustierterMedian: ergebnis.adjustierterMedian, differenz: ergebnis.differenz }}
          />
        </div>
      )}
    </div>
  );
}
