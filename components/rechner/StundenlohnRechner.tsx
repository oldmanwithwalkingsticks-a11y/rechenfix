'use client';

import { useState, useMemo } from 'react';
import { berechneStundenlohn, MINDESTLOHN_2026, type StundenlohnModus } from '@/lib/berechnungen/stundenlohn';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

const MODI: { key: StundenlohnModus; label: string; icon: string }[] = [
  { key: 'stundenlohn', label: 'Stundenlohn berechnen', icon: '⏱️' },
  { key: 'monatsgehalt', label: 'Monatsgehalt berechnen', icon: '📅' },
  { key: 'jahresgehalt', label: 'Jahresgehalt berechnen', icon: '📊' },
];

export default function StundenlohnRechner() {
  const [modus, setModus] = useState<StundenlohnModus>('stundenlohn');
  const [bruttogehalt, setBruttogehalt] = useState('3500');
  const [stundenlohn, setStundenlohn] = useState('20');
  const [wochenstunden, setWochenstunden] = useState('40');
  const [arbeitstage, setArbeitstage] = useState('5');
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [feiertage, setFeiertage] = useState('10');

  const ergebnis = useMemo(
    () => berechneStundenlohn({
      modus,
      bruttogehalt: parseDeutscheZahl(bruttogehalt),
      stundenlohn: parseDeutscheZahl(stundenlohn),
      wochenstunden: parseDeutscheZahl(wochenstunden),
      arbeitstageProWoche: parseDeutscheZahl(arbeitstage),
      urlaubstage: parseDeutscheZahl(urlaubstage),
      feiertage: parseDeutscheZahl(feiertage),
    }),
    [modus, bruttogehalt, stundenlohn, wochenstunden, arbeitstage, urlaubstage, feiertage]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Modus-Auswahl */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Was möchten Sie berechnen?</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {MODI.map(m => (
            <button
              key={m.key}
              onClick={() => setModus(m.key)}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                modus === m.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Eingaben je nach Modus */}
      {modus === 'stundenlohn' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bruttogehalt (monatlich)</label>
            <NummerEingabe value={bruttogehalt} onChange={setBruttogehalt} placeholder="z. B. 3500" einheit="€" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stunden/Woche</label>
              <NummerEingabe value={wochenstunden} onChange={setWochenstunden} placeholder="40" einheit="Std" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tage/Woche</label>
              <NummerEingabe value={arbeitstage} onChange={setArbeitstage} placeholder="5" einheit="Tage" />
            </div>
          </div>
        </>
      )}

      {modus === 'monatsgehalt' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stundenlohn (brutto)</label>
            <NummerEingabe value={stundenlohn} onChange={setStundenlohn} placeholder="z. B. 20" einheit="€/Std" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stunden/Woche</label>
            <NummerEingabe value={wochenstunden} onChange={setWochenstunden} placeholder="40" einheit="Std" />
          </div>
        </>
      )}

      {modus === 'jahresgehalt' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stundenlohn (brutto)</label>
            <NummerEingabe value={stundenlohn} onChange={setStundenlohn} placeholder="z. B. 20" einheit="€/Std" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stunden/Woche</label>
              <NummerEingabe value={wochenstunden} onChange={setWochenstunden} placeholder="40" einheit="Std" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tage/Woche</label>
              <NummerEingabe value={arbeitstage} onChange={setArbeitstage} placeholder="5" einheit="Tage" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urlaubstage/Jahr</label>
              <NummerEingabe value={urlaubstage} onChange={setUrlaubstage} placeholder="30" einheit="Tage" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feiertage/Jahr</label>
              <NummerEingabe value={feiertage} onChange={setFeiertage} placeholder="10" einheit="Tage" />
            </div>
          </div>
        </>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              {modus === 'stundenlohn' && 'Ihr Stundenlohn (brutto)'}
              {modus === 'monatsgehalt' && 'Ihr Monatsgehalt (brutto)'}
              {modus === 'jahresgehalt' && 'Ihr Jahresgehalt (brutto)'}
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {modus === 'stundenlohn' && `${fmt(ergebnis.stundenlohn)} €`}
              {modus === 'monatsgehalt' && `${fmt(ergebnis.monatsgehalt)} €`}
              {modus === 'jahresgehalt' && `${fmt(ergebnis.jahresgehalt)} €`}
            </p>
            {modus === 'stundenlohn' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                bei {ergebnis.arbeitsstundenProMonat.toLocaleString('de-DE')} Stunden/Monat
              </p>
            )}
          </div>

          {/* Alle drei Werte */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`rounded-xl p-4 text-center ${modus === 'stundenlohn' ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-200 dark:ring-primary-500/30' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stundenlohn</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.stundenlohn)} €</p>
            </div>
            <div className={`rounded-xl p-4 text-center ${modus === 'monatsgehalt' ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-200 dark:ring-primary-500/30' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Monatsgehalt</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.monatsgehalt)} €</p>
            </div>
            <div className={`rounded-xl p-4 text-center ${modus === 'jahresgehalt' ? 'bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-200 dark:ring-primary-500/30' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Jahresgehalt</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.jahresgehalt)} €</p>
            </div>
          </div>

          {/* Mindestlohn-Vergleich */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.ueberMindestlohn
              ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
              : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{ergebnis.ueberMindestlohn ? '✅' : '⚠️'}</span>
              <div>
                <p className={`text-sm font-semibold ${
                  ergebnis.ueberMindestlohn
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {ergebnis.ueberMindestlohn
                    ? `${fmt(Math.abs(ergebnis.differenzMindestlohn))} € über dem Mindestlohn`
                    : `${fmt(Math.abs(ergebnis.differenzMindestlohn))} € unter dem Mindestlohn`}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Mindestlohn 2026: {fmt(MINDESTLOHN_2026)} € pro Stunde
                </p>
              </div>
            </div>
          </div>

          {/* Effektiver Stundenlohn */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Detailberechnung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Arbeitsstunden/Monat</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.arbeitsstundenProMonat.toLocaleString('de-DE')} Std</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Arbeitsstunden/Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.arbeitsstundenProJahr.toLocaleString('de-DE')} Std</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Effektive Arbeitstage/Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.effektiveArbeitstage} Tage</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm bg-accent-50/50 dark:bg-accent-500/5">
                <span className="text-gray-600 dark:text-gray-400">
                  Effektiver Stundenlohn
                  <span className="block text-xs text-gray-400 dark:text-gray-500">nach Abzug Urlaub & Feiertage</span>
                </span>
                <span className="font-bold text-accent-600 dark:text-accent-400">{fmt(ergebnis.effektiverStundenlohn)} €</span>
              </div>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Stundenlohn: ${fmt(ergebnis.stundenlohn)} €, Monatsgehalt: ${fmt(ergebnis.monatsgehalt)} €, Jahresgehalt: ${fmt(ergebnis.jahresgehalt)} €`}
            seitenTitel="Stundenlohn-Rechner"
          />

          <AiExplain
            rechnerName="Stundenlohn-Rechner"
            eingaben={{ modus, bruttogehalt: parseDeutscheZahl(bruttogehalt), stundenlohn: parseDeutscheZahl(stundenlohn), wochenstunden: parseDeutscheZahl(wochenstunden) }}
            ergebnis={{ stundenlohn: ergebnis.stundenlohn, monatsgehalt: ergebnis.monatsgehalt, jahresgehalt: ergebnis.jahresgehalt, effektiverStundenlohn: ergebnis.effektiverStundenlohn, ueberMindestlohn: ergebnis.ueberMindestlohn }}
          />

          {/* Stundenlohn-Tabelle nach Berufsgruppen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Typische Stundenlöhne in Deutschland (brutto)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Berufsgruppe</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Stundenlohn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['Mindestlohn', '12,82 €'],
                    ['Einzelhandel', '14–18 €'],
                    ['Handwerk', '16–22 €'],
                    ['Büro / Verwaltung', '18–25 €'],
                    ['Pflege / Gesundheit', '18–28 €'],
                    ['IT / Softwareentwicklung', '28–45 €'],
                    ['Ingenieurwesen', '30–45 €'],
                    ['Medizin (Ärzte)', '35–60 €'],
                    ['Unternehmensberatung', '35–65 €'],
                  ].map(([beruf, lohn]) => (
                    <tr key={beruf}>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{beruf}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{lohn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {ergebnis && (
        <AffiliateBox programId="lexware" context="stundenlohn" />
      )}
    </div>
  );
}
