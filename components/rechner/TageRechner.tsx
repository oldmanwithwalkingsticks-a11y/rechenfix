'use client';

import { useState, useMemo, useCallback } from 'react';
import { berechneTage, formatDatum, parseDeutschesDatum } from '@/lib/berechnungen/tage';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

function datumZuIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const t = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${t}`;
}

function isoZuDate(iso: string): Date | null {
  const d = new Date(iso + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

export default function TageRechner() {
  const heute = new Date();
  const [startText, setStartText] = useState(formatDatum(heute));
  const [startIso, setStartIso] = useState(datumZuIso(heute));
  const [endText, setEndText] = useState('');
  const [endIso, setEndIso] = useState('');
  const [mitzaehlen, setMitzaehlen] = useState(false);

  // Start-Datum aus Text oder Datepicker
  const startDatum = useMemo(() => {
    return parseDeutschesDatum(startText) ?? isoZuDate(startIso);
  }, [startText, startIso]);

  const endDatum = useMemo(() => {
    return parseDeutschesDatum(endText) ?? isoZuDate(endIso);
  }, [endText, endIso]);

  const handleStartTextChange = useCallback((val: string) => {
    setStartText(val);
    const parsed = parseDeutschesDatum(val);
    if (parsed) setStartIso(datumZuIso(parsed));
  }, []);

  const handleStartPickerChange = useCallback((val: string) => {
    setStartIso(val);
    const d = isoZuDate(val);
    if (d) setStartText(formatDatum(d));
  }, []);

  const handleEndTextChange = useCallback((val: string) => {
    setEndText(val);
    const parsed = parseDeutschesDatum(val);
    if (parsed) setEndIso(datumZuIso(parsed));
  }, []);

  const handleEndPickerChange = useCallback((val: string) => {
    setEndIso(val);
    const d = isoZuDate(val);
    if (d) setEndText(formatDatum(d));
  }, []);

  const ergebnis = useMemo(() => {
    if (!startDatum || !endDatum) return null;
    return berechneTage({ startDatum, endDatum, mitzaehlen });
  }, [startDatum, endDatum, mitzaehlen]);

  // Schnellwahl-Buttons
  const setzeEndeRelativ = (tageVonHeute: number) => {
    const d = new Date();
    d.setDate(d.getDate() + tageVonHeute);
    setEndText(formatDatum(d));
    setEndIso(datumZuIso(d));
  };

  const setzeHeute = () => {
    const d = new Date();
    setStartText(formatDatum(d));
    setStartIso(datumZuIso(d));
  };

  return (
    <div>
      {/* Mitzählen Toggle */}
      <div className="mb-6">
        <RadioToggleGroup
          name="tage-mitzaehlen"
          legend="Zählweise"
          srOnlyLegend
          options={[
            { value: 'ohne', label: 'Ohne Start-/Endtag' },
            { value: 'mit', label: 'Start + Endtag mitzählen' },
          ]}
          value={mitzaehlen ? 'mit' : 'ohne'}
          onChange={(v) => setMitzaehlen(v === 'mit')}
        />
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Startdatum</label>
          <div className="relative">
            <input
              type="text"
              value={startText}
              onChange={e => handleStartTextChange(e.target.value)}
              placeholder="TT.MM.JJJJ"
              className="input-field pr-12"
            />
            <input
              type="date"
              value={startIso}
              onChange={e => handleStartPickerChange(e.target.value)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
              title="Datum auswählen"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enddatum</label>
          <div className="relative">
            <input
              type="text"
              value={endText}
              onChange={e => handleEndTextChange(e.target.value)}
              placeholder="TT.MM.JJJJ"
              className="input-field pr-12"
            />
            <input
              type="date"
              value={endIso}
              onChange={e => handleEndPickerChange(e.target.value)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 cursor-pointer"
              title="Datum auswählen"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Schnellwahl */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={setzeHeute} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Heute
        </button>
        <button onClick={() => setzeEndeRelativ(30)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          +30 Tage
        </button>
        <button onClick={() => setzeEndeRelativ(90)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          +90 Tage
        </button>
        <button onClick={() => setzeEndeRelativ(180)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          +180 Tage
        </button>
        <button onClick={() => setzeEndeRelativ(365)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          +1 Jahr
        </button>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  {mitzaehlen ? 'Tage (inkl. Start- und Endtag)' : 'Tage zwischen den Daten'}
                </p>
                <p className="text-5xl font-bold">
                  {ergebnis.tage.toLocaleString('de-DE')} {ergebnis.tage === 1 ? 'Tag' : 'Tage'}
                </p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {ergebnis.wochen} {ergebnis.wochen === 1 ? 'Woche' : 'Wochen'}{ergebnis.restTage > 0 ? ` und ${ergebnis.restTage} ${ergebnis.restTage === 1 ? 'Tag' : 'Tage'}` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Detail-Kacheln */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kalendertage</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.tage.toLocaleString('de-DE')}</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{ergebnis.arbeitstage.toLocaleString('de-DE')}</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wochenendtage</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.wochenendtage.toLocaleString('de-DE')}</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wochen</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.wochen.toLocaleString('de-DE')}</p>
              </div>
            </div>
          </div>

          {/* Umrechnung */}
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-6">
            <p className="font-semibold text-primary-700 dark:text-primary-400 text-sm mb-2">Das entspricht</p>
            <div className="space-y-1.5 text-sm text-gray-800 dark:text-gray-200">
              {ergebnis.jahre > 0 && (
                <p>
                  <strong>{ergebnis.jahre} {ergebnis.jahre === 1 ? 'Jahr' : 'Jahre'}</strong>
                  {ergebnis.restMonateNachJahren > 0 && <>, {ergebnis.restMonateNachJahren} {ergebnis.restMonateNachJahren === 1 ? 'Monat' : 'Monate'}</>}
                  {ergebnis.restTageNachJahrenMonaten > 0 && <> und {ergebnis.restTageNachJahrenMonaten} {ergebnis.restTageNachJahrenMonaten === 1 ? 'Tag' : 'Tage'}</>}
                </p>
              )}
              {ergebnis.monate > 0 && ergebnis.jahre === 0 && (
                <p>
                  <strong>{ergebnis.monate} {ergebnis.monate === 1 ? 'Monat' : 'Monate'}</strong>
                  {ergebnis.restTageNachMonaten > 0 && <> und {ergebnis.restTageNachMonaten} {ergebnis.restTageNachMonaten === 1 ? 'Tag' : 'Tage'}</>}
                </p>
              )}
              <p><strong>{ergebnis.wochen} {ergebnis.wochen === 1 ? 'Woche' : 'Wochen'}</strong>{ergebnis.restTage > 0 && <> und {ergebnis.restTage} {ergebnis.restTage === 1 ? 'Tag' : 'Tage'}</>}</p>
              <p><strong>{(ergebnis.tage * 24).toLocaleString('de-DE')} Stunden</strong></p>
            </div>
          </div>

          {/* Hinweis Arbeitstage */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Die Arbeitstage-Berechnung berücksichtigt nur Wochenenden (Sa/So), keine gesetzlichen Feiertage. Die tatsächliche Anzahl der Arbeitstage kann daher geringer sein.
            </p>
          </div>

          <CrossLink href="/alltag/countdown" emoji="⏳" text="Countdown erstellen — Tage bis zum Wunschtermin" />
          <CrossLink href="/arbeit/arbeitstage-rechner" emoji="💼" text="Nur Arbeitstage zählen?" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.tage.toLocaleString('de-DE')} Tage zwischen ${startDatum ? formatDatum(startDatum) : ''} und ${endDatum ? formatDatum(endDatum) : ''} (${ergebnis.arbeitstage} Arbeitstage)`}
            seitenTitel="Tagerechner"
          />

          <AiExplain
            rechnerName="Tage-Rechner"
            eingaben={{ startDatum: startDatum ? formatDatum(startDatum) : '', endDatum: endDatum ? formatDatum(endDatum) : '', mitzaehlen }}
            ergebnis={{ tage: ergebnis.tage, arbeitstage: ergebnis.arbeitstage, wochen: ergebnis.wochen, wochenendtage: ergebnis.wochenendtage }}
          />
        </>
      )}
    </div>
  );
}
