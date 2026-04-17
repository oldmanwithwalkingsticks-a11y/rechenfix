'use client';

import { useState, useMemo } from 'react';
import {
  berechnePendlerpauschale,
  berechneArbeitstage,
} from '@/lib/berechnungen/pendlerpauschale';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const STEUERSAETZE = [14, 25, 35, 42, 45];

export default function PendlerpauschaleRechner() {
  const [entfernung, setEntfernung] = useState('25');
  const [arbeitstageMode, setArbeitstageMode] = useState<'direkt' | 'detail'>('direkt');
  const [arbeitstage, setArbeitstage] = useState('220');
  const [grenzsteuersatz, setGrenzsteuersatz] = useState('35');

  // Detail-Berechnung
  const [tageProWoche, setTageProWoche] = useState('5');
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [feiertage, setFeiertage] = useState('10');
  const [krankheitstage, setKrankheitstage] = useState('10');
  const [homeofficeTage, setHomeofficeTage] = useState('0');

  const detailArbeitstage = useMemo(() => berechneArbeitstage(
    parseInt(tageProWoche, 10) || 5,
    parseInt(urlaubstage, 10) || 0,
    parseInt(feiertage, 10) || 0,
    parseInt(krankheitstage, 10) || 0,
    parseFloat(homeofficeTage) || 0,
  ), [tageProWoche, urlaubstage, feiertage, krankheitstage, homeofficeTage]);

  const effektiveArbeitstage = arbeitstageMode === 'direkt'
    ? parseInt(arbeitstage, 10) || 0
    : detailArbeitstage;

  const ergebnis = useMemo(() => berechnePendlerpauschale({
    entfernungKm: parseFloat(entfernung.replace(',', '.')) || 0,
    arbeitstageProJahr: effektiveArbeitstage,
    grenzsteuersatz: parseFloat(grenzsteuersatz.replace(',', '.')) || 0,
    homeofficeTageProWoche: parseFloat(homeofficeTage) || 0,
    arbeitstageProWoche: parseInt(tageProWoche, 10) || 5,
  }), [entfernung, effektiveArbeitstage, grenzsteuersatz, homeofficeTage, tageProWoche]);

  return (
    <div>
      {/* Entfernung */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
          Einfache Entfernung Wohnung — Arbeitsstätte
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            min="1"
            max="999"
            value={entfernung}
            onChange={e => setEntfernung(clampInputValue(e.target.value, 1, 999))}
            className="input-field w-full pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">km</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
          Nur die einfache Strecke (nicht Hin + Rück).
        </p>
        <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten für Ihren Arbeitsweg berechnen" />
      </div>

      {/* Arbeitstage */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Arbeitstage pro Jahr</label>
          <button
            onClick={() => setArbeitstageMode(arbeitstageMode === 'direkt' ? 'detail' : 'direkt')}
            className="text-xs text-primary-600 hover:text-primary-600 dark:text-primary-400 font-medium"
          >
            {arbeitstageMode === 'direkt' ? 'Detail-Berechnung ▾' : 'Direkt eingeben ▴'}
          </button>
        </div>

        {arbeitstageMode === 'direkt' ? (
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="365"
              value={arbeitstage}
              onChange={e => setArbeitstage(clampInputValue(e.target.value, 1, 365))}
              className="input-field w-full pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">Tage</span>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage/Woche</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="7"
                  value={tageProWoche}
                  onChange={e => setTageProWoche(clampInputValue(e.target.value, 1, 7))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Urlaubstage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="60"
                  value={urlaubstage}
                  onChange={e => setUrlaubstage(clampInputValue(e.target.value, 0, 60))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Feiertage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="20"
                  value={feiertage}
                  onChange={e => setFeiertage(clampInputValue(e.target.value, 0, 20))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Krankheitstage</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="365"
                  value={krankheitstage}
                  onChange={e => setKrankheitstage(clampInputValue(e.target.value, 0, 365))}
                  className="input-field w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Homeoffice-Tage pro Woche</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                max={tageProWoche}
                step="0.5"
                value={homeofficeTage}
                onChange={e => setHomeofficeTage(clampInputValue(e.target.value, 0, parseInt(tageProWoche, 10) || 7))}
                className="input-field w-32"
              />
            </div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Ergebnis: <strong>{detailArbeitstage} Präsenz-Arbeitstage</strong>
            </p>
          </div>
        )}
      </div>

      {/* Grenzsteuersatz */}
      <div className="mb-6">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Grenzsteuersatz</label>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              value={grenzsteuersatz}
              onChange={e => setGrenzsteuersatz(clampInputValue(e.target.value, 0, 100))}
              className="input-field w-full pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">%</span>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STEUERSAETZE.map(s => (
            <button
              key={s}
              onClick={() => setGrenzsteuersatz(String(s))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                parseInt(grenzsteuersatz, 10) === s
                  ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
          Der Grenzsteuersatz ist der Steuersatz auf Ihren letzten verdienten Euro. Er liegt meist zwischen 25–42%.
        </p>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Ihre Steuerersparnis pro Jahr</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmtEuro(ergebnis.steuerersparnis)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              = {fmtEuro(ergebnis.monatlicheErsparnis)} pro Monat
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pendlerpauschale</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtEuro(ergebnis.pauschaleGesamt)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ersparnis/Monat</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {fmtEuro(ergebnis.monatlicheErsparnis)}
              </p>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.aufschluesselung.map((z, i) => (
                <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                  i >= ergebnis.aufschluesselung.length - 2
                    ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  <span>{z.label}</span>
                  <span className="font-medium shrink-0 ml-4">{z.wert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Homeoffice-Vergleich */}
          {parseFloat(homeofficeTage) > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Vergleich: Pendler vs. Homeoffice</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className={`rounded-xl p-3 text-center border-2 ${
                    !ergebnis.homeofficeVorteilhaft
                      ? 'border-green-300 dark:border-green-500/50 bg-green-50 dark:bg-green-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pendlerpauschale</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtEuro(ergebnis.pauschaleGesamt)}</p>
                  </div>
                  <div className={`rounded-xl p-3 text-center border-2 ${
                    ergebnis.homeofficeVorteilhaft
                      ? 'border-green-300 dark:border-green-500/50 bg-green-50 dark:bg-green-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Homeoffice-Pauschale</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtEuro(ergebnis.homeofficePauschale)}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{ergebnis.homeofficeTageJahr} Tage × 6 €</p>
                  </div>
                </div>
                <p className="text-sm text-center font-medium text-gray-700 dark:text-gray-300">
                  Sie sparen mehr mit: <strong className="text-green-600 dark:text-green-400">
                    {ergebnis.homeofficeVorteilhaft ? 'Homeoffice-Pauschale' : 'Pendlerpauschale'}
                  </strong>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-500 mt-2 text-center">
                  Hinweis: Pro Tag kann nur eine Pauschale angesetzt werden — entweder Pendler oder Homeoffice.
                </p>
              </div>
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex gap-2">
              <span className="shrink-0">💡</span>
              <span>Die Pendlerpauschale gilt unabhängig vom Verkehrsmittel — auch für Fahrradfahrer, Fußgänger und Mitfahrer in Fahrgemeinschaften.</span>
            </p>
          </div>

          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Gesamte Steuererstattung berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Pendlerpauschale: ${fmtEuro(ergebnis.pauschaleGesamt)} - Steuerersparnis: ${fmtEuro(ergebnis.steuerersparnis)}/Jahr (${fmtEuro(ergebnis.monatlicheErsparnis)}/Monat)`}
            seitenTitel="Pendlerpauschale berechnen"
          />
          <AiExplain
            rechnerName="Pendlerpauschale-Rechner"
            eingaben={{ entfernungKm: parseFloat(entfernung.replace(',', '.')) || 0, arbeitstageProJahr: effektiveArbeitstage, grenzsteuersatzProzent: parseFloat(grenzsteuersatz.replace(',', '.')) || 0 }}
            ergebnis={{ pauschaleGesamtEuro: ergebnis.pauschaleGesamt, steuerersparnisEuro: ergebnis.steuerersparnis, monatlicheErsparnisEuro: ergebnis.monatlicheErsparnis }}
          />
        </div>
      )}

      {ergebnis && (
        <AffiliateBox programId="wiso" context="pendlerpauschale" />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information auf Basis des EStG 2026. Für verbindliche Auskünfte wenden Sie sich an einen Steuerberater.
      </p>
    </div>
  );
}
