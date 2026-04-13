'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { berechneGeburtstermin, type Methode } from '@/lib/berechnungen/geburtstermin';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDatumKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultPeriodeDatum(): string {
  const d = new Date();
  d.setDate(d.getDate() - 70);
  return toIsoDate(d);
}

function defaultEmpfaengnisDatum(): string {
  const d = new Date();
  d.setDate(d.getDate() - 56);
  return toIsoDate(d);
}

function defaultUltraschallDatum(): string {
  const d = new Date();
  d.setDate(d.getDate() - 14);
  return toIsoDate(d);
}

export default function GeburtsterminRechner() {
  const [methode, setMethode] = useState<Methode>('periode');
  const [periodeDatum, setPeriodeDatum] = useState(defaultPeriodeDatum());
  const [zyklusLaenge, setZyklusLaenge] = useState(28);
  const [empfaengnisDatum, setEmpfaengnisDatum] = useState(defaultEmpfaengnisDatum());
  const [ultraschallDatum, setUltraschallDatum] = useState(defaultUltraschallDatum());
  const [usWochen, setUsWochen] = useState(8);
  const [usTage, setUsTage] = useState(0);

  const ergebnis = useMemo(() => berechneGeburtstermin({
    methode,
    periodeDatum,
    zyklusLaenge,
    empfaengnisDatum,
    ultraschallDatum,
    ultraschallWochen: usWochen,
    ultraschallTage: usTage,
  }), [methode, periodeDatum, zyklusLaenge, empfaengnisDatum, ultraschallDatum, usWochen, usTage]);

  const TRIMESTER_FARBEN = ['bg-pink-400', 'bg-purple-400', 'bg-blue-400'];
  const TRIMESTER_LABELS = ['1. Trimester', '2. Trimester', '3. Trimester'];

  return (
    <div>
      {/* Methode Toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { key: 'periode' as Methode, label: 'Letzte Periode' },
          { key: 'empfaengnis' as Methode, label: 'Empfängnisdatum' },
          { key: 'ultraschall' as Methode, label: 'Ultraschall' },
        ]).map(m => (
          <button
            key={m.key}
            onClick={() => setMethode(m.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              methode === m.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Eingabefelder */}
      {methode === 'periode' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
      )}

      {methode === 'empfaengnis' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Datum der Empfängnis</label>
          <input
            type="date"
            value={empfaengnisDatum}
            onChange={e => setEmpfaengnisDatum(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
        </div>
      )}

      {methode === 'ultraschall' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ultraschall-Datum</label>
            <input
              type="date"
              value={ultraschallDatum}
              onChange={e => setUltraschallDatum(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SSW am Ultraschalltag (Wochen)</label>
            <select
              value={usWochen}
              onChange={e => setUsWochen(parseInt(e.target.value))}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            >
              {Array.from({ length: 43 }, (_, i) => i).map(w => (
                <option key={w} value={w}>{w} Wochen</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tage</label>
            <select
              value={usTage}
              onChange={e => setUsTage(parseInt(e.target.value))}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            >
              {Array.from({ length: 7 }, (_, i) => i).map(t => (
                <option key={t} value={t}>+ {t} Tage</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Voraussichtlicher Geburtstermin</p>
            <p className="text-3xl sm:text-4xl font-bold">{fmtDatum(ergebnis.geburtstermin)}</p>
          </div>

          {/* Übertragen / Verstrichen */}
          {ergebnis.ueberTermin && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-800 dark:text-red-300 text-sm font-semibold">
                ⚠️ SSW {ergebnis.aktuelleSSW}+ — bitte kontaktieren Sie Ihre Hebamme oder Ihren Arzt.
              </p>
            </div>
          )}

          {ergebnis.terminVerstrichen && !ergebnis.ueberTermin && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 text-sm">
                Der errechnete Termin ist bereits verstrichen. Herzlichen Glückwunsch, falls Ihr Baby schon da ist! 🎉
              </p>
            </div>
          )}

          {/* SSW + Trimester + Verbleibend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Aktuelle SSW</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {ergebnis.aktuelleSSW}+{ergebnis.aktuelleTage}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{ergebnis.aktuelleSSW}. Woche, {ergebnis.aktuelleTage}. Tag</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Trimester</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{ergebnis.trimester}. Trimester</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {ergebnis.trimester === 1 ? 'SSW 1–12' : ergebnis.trimester === 2 ? 'SSW 13–27' : 'SSW 28–40'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Verbleibend</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {ergebnis.verbleibendeTage > 0 ? `${ergebnis.verbleibendeTage} Tage` : 'Termin erreicht'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {ergebnis.verbleibendeTage > 0 ? `ca. ${Math.ceil(ergebnis.verbleibendeTage / 7)} Wochen` : ''}
              </p>
            </div>
          </div>

          {/* Fortschrittsbalken */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Schwangerschaftsfortschritt</h3>
            <div className="relative h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-2">
              {/* Trimester-Segmente */}
              <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-pink-200 dark:bg-pink-500/30" />
                <div className="w-[37.5%] bg-purple-200 dark:bg-purple-500/30" />
                <div className="w-[32.5%] bg-blue-200 dark:bg-blue-500/30" />
              </div>
              {/* Fortschritt */}
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${ergebnis.fortschrittProzent}%`,
                  background: ergebnis.trimester === 1 ? '#f472b6' : ergebnis.trimester === 2 ? '#a78bfa' : '#60a5fa',
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              {TRIMESTER_LABELS.map((label, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${TRIMESTER_FARBEN[i]}`} />
                  {label}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-gray-400 dark:text-gray-500">
              <span>SSW 0</span>
              <span>SSW 12</span>
              <span>SSW 27</span>
              <span>SSW 40</span>
            </div>
          </div>

          {/* Empfängniszeitraum */}
          {methode === 'periode' && (
            <div className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 rounded-xl p-4 mb-6">
              <p className="text-pink-800 dark:text-pink-300 text-sm">
                <strong>Empfängniszeitraum:</strong> Die Empfängnis war wahrscheinlich um den {fmtDatumKurz(ergebnis.empfaengnisZeitraum)} (±2 Tage).
              </p>
            </div>
          )}

          {/* Meilenstein-Timeline */}
          {!ergebnis.terminVerstrichen && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Wichtige Meilensteine</h3>
              <div className="relative">
                {/* Vertikale Linie */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600" />

                <div className="space-y-4">
                  {ergebnis.meilensteine.map((m, i) => (
                    <div key={i} className="relative flex items-start gap-4 pl-2">
                      {/* Icon-Punkt */}
                      <div className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 ${
                        m.aktiv
                          ? 'bg-primary-100 dark:bg-primary-500/20 ring-2 ring-primary-400'
                          : m.vergangen
                            ? 'bg-gray-100 dark:bg-gray-700 opacity-60'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600'
                      }`}>
                        {m.icon}
                      </div>
                      {/* Inhalt */}
                      <div className={`flex-1 pb-1 ${m.vergangen ? 'opacity-60' : ''}`}>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{m.label}</p>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{fmtDatumKurz(m.datum)}</span>
                          {m.aktiv && (
                            <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-1.5 py-0.5 rounded">AKTUELL</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{m.beschreibung}</p>
                        {m.link && (
                          <Link href={m.link.href} className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium">
                            {m.link.text}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Elterngeld-Hinweis */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Tipp:</strong> Planen Sie frühzeitig Ihr Elterngeld!{' '}
              <Link href="/finanzen/elterngeld-rechner" className="underline font-medium hover:no-underline">
                Elterngeld-Rechner: Jetzt Ihr Elterngeld berechnen →
              </Link>
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Nur etwa 4% der Kinder kommen am errechneten Termin zur Welt. Die meisten werden in einem Zeitfenster von 2 Wochen davor bis 2 Wochen danach geboren. Die Berechnung ersetzt keine ärztliche Beratung.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Geburtstermin: ${fmtDatum(ergebnis.geburtstermin)} — SSW ${ergebnis.aktuelleSSW}+${ergebnis.aktuelleTage} (${ergebnis.trimester}. Trimester)`}
            seitenTitel="Geburtstermin-Rechner"
          />

          <AiExplain
            rechnerName="Geburtstermin-Rechner"
            eingaben={{
              methode,
              ...(methode === 'periode' ? { periodeDatum, zyklusLaenge } : {}),
              ...(methode === 'empfaengnis' ? { empfaengnisDatum } : {}),
              ...(methode === 'ultraschall' ? { ultraschallDatum, ssw: `${usWochen}+${usTage}` } : {}),
            }}
            ergebnis={{
              geburtstermin: fmtDatumKurz(ergebnis.geburtstermin),
              aktuelleSSW: `${ergebnis.aktuelleSSW}+${ergebnis.aktuelleTage}`,
              trimester: ergebnis.trimester,
              verbleibendeTage: ergebnis.verbleibendeTage,
            }}
          />
        </>
      )}
    </div>
  );
}
