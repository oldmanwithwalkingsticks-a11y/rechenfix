'use client';

import { useState, useMemo } from 'react';
import {
  berechneSsw,
  defaultPeriodeDatum,
  defaultTerminDatum,
  type SswMethode,
} from '@/lib/berechnungen/ssw';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function SswRechner() {
  const [methode, setMethode] = useState<SswMethode>('periode');
  const [periodeDatum, setPeriodeDatum] = useState(() => defaultPeriodeDatum());
  const [zyklusLaenge, setZyklusLaenge] = useState(28);
  const [terminDatum, setTerminDatum] = useState(() => defaultTerminDatum());

  const ergebnis = useMemo(
    () => berechneSsw({ methode, periodeDatum, zyklusLaenge, terminDatum }),
    [methode, periodeDatum, zyklusLaenge, terminDatum],
  );

  const trimesterColor = ergebnis.trimester === 1 ? 'bg-green-500' : ergebnis.trimester === 2 ? 'bg-blue-500' : 'bg-purple-500';
  const trimesterBg = ergebnis.trimester === 1 ? 'from-green-500 to-emerald-500' : ergebnis.trimester === 2 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';

  return (
    <div>
      {/* Methode */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Berechnungsmethode
        </h3>
        <div className="flex gap-2 flex-wrap">
          {([['periode', '🩸 Letzte Periode'], ['termin', '📅 Errechneter Geburtstermin']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setMethode(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${methode === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Eingabefelder */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Daten
        </h3>

        {methode === 'periode' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erster Tag der letzten Periode</label>
              <input
                type="date"
                value={periodeDatum}
                onChange={e => setPeriodeDatum(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zykluslänge</label>
              <select
                value={zyklusLaenge}
                onChange={e => setZyklusLaenge(parseInt(e.target.value))}
                className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
              >
                {Array.from({ length: 15 }, (_, i) => 21 + i).map(t => (
                  <option key={t} value={t}>{t} Tage{t === 28 ? ' (Standard)' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Errechneter Geburtstermin</label>
            <input
              type="date"
              value={terminDatum}
              onChange={e => setTerminDatum(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
        )}
      </div>

      {/* ERGEBNIS */}
      {!ergebnis.valid ? (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">{ergebnis.fehler}</p>
        </div>
      ) : (
        <>
          {/* Hauptergebnis */}
          <div className={`rounded-2xl p-6 mb-6 text-white shadow-lg bg-gradient-to-br ${trimesterBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-white/80 text-sm mb-1">Aktuelle Schwangerschaftswoche</p>
                <p className="text-5xl font-bold">{ergebnis.sswText}</p>
                <p className="text-white/80 text-sm mt-1">
                  {ergebnis.sswWochen} vollendete Wochen + {ergebnis.sswTage} Tag{ergebnis.sswTage === 1 ? '' : 'e'} · {ergebnis.trimesterText}
                </p>
              </div>
              <div className="sm:text-right space-y-1">
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    ET: {ergebnis.geburtsterminText}
                  </span>
                </div>
                {ergebnis.tageBisET >= 0 ? (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      noch {ergebnis.wochenBisET} Wochen {ergebnis.tageRestWoche} Tage
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      ET überschritten um {ergebnis.wochenBisET}W {ergebnis.tageRestWoche}T
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fortschrittsbalken */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>SSW 1</span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{ergebnis.fortschrittProzent}% geschafft</span>
              <span>SSW 40</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
              <div
                className={`h-full ${trimesterColor} transition-all`}
                style={{ width: `${ergebnis.fortschrittProzent}%` }}
              />
              {/* Trimester-Marker */}
              <div className="absolute inset-0 flex">
                <div style={{ width: '30%' }} className="border-r border-white/60 dark:border-gray-900/60" />
                <div style={{ width: '37.5%' }} className="border-r border-white/60 dark:border-gray-900/60" />
              </div>
            </div>
            <div className="flex text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              <div style={{ width: '30%' }} className="text-center">1. Trimester</div>
              <div style={{ width: '37.5%' }} className="text-center">2. Trimester</div>
              <div style={{ width: '32.5%' }} className="text-center">3. Trimester</div>
            </div>
          </div>

          {/* Baby-Entwicklung & Größenvergleich */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 rounded-xl p-4">
              <h3 className="font-bold text-pink-800 dark:text-pink-300 text-sm mb-2">👶 Baby-Entwicklung</h3>
              <p className="text-sm text-pink-900/80 dark:text-pink-200/80">{ergebnis.entwicklung}</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-2">🍎 Größenvergleich</h3>
              <p className="text-sm text-amber-900/80 dark:text-amber-200/80">
                Ihr Baby ist jetzt etwa so groß wie eine <strong>{ergebnis.groessenvergleich}</strong>.
              </p>
              <p className="text-xs text-amber-700/70 dark:text-amber-300/70 mt-1">{ergebnis.babyGroesseCm}</p>
            </div>
          </div>

          {/* Wichtige Termine */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">📅 Wichtige Termine</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Errechneter Geburtstermin</td>
                    <td className="px-4 py-2.5 text-right text-gray-800 dark:text-gray-200 font-semibold whitespace-nowrap">{ergebnis.geburtsterminText}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Mutterschutz beginnt</td>
                    <td className="px-4 py-2.5 text-right text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.mutterschutzText}</td>
                  </tr>
                  {ergebnis.vorstehendeUntersuchung && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Nächste Vorsorge</td>
                      <td className="px-4 py-2.5 text-right text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {ergebnis.vorstehendeUntersuchung.label}
                        <span className="text-xs text-gray-600 ml-2">(SSW {ergebnis.vorstehendeUntersuchung.sswAnfang}–{ergebnis.vorstehendeUntersuchung.sswEnde})</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Die Berechnung basiert auf der Naegele-Regel (280 Tage ab letzter Periode). Tatsächlich kommen nur etwa 4 % der Babys am errechneten Termin zur Welt. Der Termin ist ein Richtwert — zwei Wochen vor und nach dem ET gelten als regulär. Verbindlich ist der vom Frauenarzt ermittelte Mutterpass-ET.
            </p>
          </div>

          <CrossLink href="/gesundheit/geburtstermin-rechner" emoji="📅" text="Geburtstermin exakt berechnen (alle Methoden)" />
          <CrossLink href="/arbeit/mutterschutz-rechner" emoji="🤱" text="Mutterschutz berechnen — Fristen & Mutterschaftsgeld" />
          <CrossLink href="/finanzen/elterngeld-rechner" emoji="👶" text="Elterngeld berechnen — Einkommen im Babyjahr" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.sswText} (${ergebnis.trimesterText}) | ET: ${ergebnis.geburtsterminText} | noch ${ergebnis.wochenBisET}W ${ergebnis.tageRestWoche}T | Baby ≈ ${ergebnis.groessenvergleich} (${ergebnis.babyGroesseCm})`}
            seitenTitel="SSW-Rechner"
          />

          <AiExplain
            rechnerName="SSW-Rechner"
            eingaben={{
              methode: methode === 'periode' ? 'Letzte Periode' : 'Geburtstermin',
              datum: methode === 'periode' ? periodeDatum : terminDatum,
              zyklus: methode === 'periode' ? `${zyklusLaenge} Tage` : '—',
            }}
            ergebnis={{
              ssw: ergebnis.sswText,
              trimester: ergebnis.trimesterText,
              geburtstermin: ergebnis.geburtsterminText,
              nochTage: `${ergebnis.wochenBisET} Wochen ${ergebnis.tageRestWoche} Tage`,
              groessenvergleich: `${ergebnis.groessenvergleich} (${ergebnis.babyGroesseCm})`,
            }}
          />
        </>
      )}
    </div>
  );
}
