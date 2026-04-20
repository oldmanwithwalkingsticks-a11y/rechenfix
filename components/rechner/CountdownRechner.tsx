'use client';

import { useState, useEffect, useMemo } from 'react';
import { berechneCountdown, voreingestellteEvents, type CountdownErgebnis } from '@/lib/berechnungen/countdown';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

function Ziffer({ wert, label }: { wert: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl font-extrabold tabular-nums text-primary-700 dark:text-primary-300">
        {String(wert).padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function Trenner() {
  return <span className="text-3xl sm:text-4xl font-bold text-gray-300 dark:text-gray-600 mx-1">:</span>;
}

export default function CountdownRechner() {
  const [auswahl, setAuswahl] = useState('weihnachten');
  const [eigenDatum, setEigenDatum] = useState('');
  const [eigenLabel, setEigenLabel] = useState('');
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Erst nach Mount Live-Werte rendern — verhindert SSR/Client-Hydration-Mismatch,
  // da berechneCountdown() auf new Date() zugreift und sich Server- und Client-Zeit
  // zwangsläufig um einige hundert ms unterscheiden.
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const istEigen = auswahl === 'eigen';

  const zielDatum = useMemo(() => {
    if (istEigen && eigenDatum) {
      const d = new Date(eigenDatum + 'T00:00:00');
      return isNaN(d.getTime()) ? null : d;
    }
    const event = voreingestellteEvents.find(e => e.key === auswahl);
    return event ? event.datum() : null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auswahl, eigenDatum, tick]);

  const eventLabel = useMemo(() => {
    if (istEigen) return eigenLabel || 'Mein Event';
    return voreingestellteEvents.find(e => e.key === auswahl)?.label ?? '';
  }, [auswahl, istEigen, eigenLabel]);

  const eventIcon = useMemo(() => {
    if (istEigen) return '📅';
    return voreingestellteEvents.find(e => e.key === auswahl)?.icon ?? '📅';
  }, [auswahl, istEigen]);

  const ergebnis: CountdownErgebnis | null = zielDatum ? berechneCountdown(zielDatum) : null;

  const datumFormatiert = zielDatum
    ? zielDatum.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="space-y-6">
      {/* Event-Auswahl */}
      <div className="flex flex-wrap gap-2">
        {voreingestellteEvents.map(e => (
          <button
            key={e.key}
            onClick={() => setAuswahl(e.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              auswahl === e.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span>{e.icon}</span>
            <span className="hidden sm:inline">{e.label}</span>
          </button>
        ))}
        <button
          onClick={() => setAuswahl('eigen')}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
            istEigen
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span>📅</span>
          <span className="hidden sm:inline">Eigenes Datum</span>
        </button>
      </div>

      {/* Eigenes Datum Eingabe */}
      {istEigen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Datum</label>
            <input
              type="date"
              value={eigenDatum}
              onChange={e => setEigenDatum(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bezeichnung (optional)</label>
            <input
              type="text"
              value={eigenLabel}
              onChange={e => setEigenLabel(e.target.value)}
              placeholder="z. B. Mein Geburtstag"
              className="input-field w-full"
            />
          </div>
        </div>
      )}

      {/* Countdown Ergebnis — erst nach Mount, um Hydration-Mismatch zu verhindern */}
      {mounted && ergebnis && !ergebnis.vorbei && (
        <div className="space-y-5">
          {/* Event-Titel */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Countdown bis</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {eventIcon} {eventLabel}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{datumFormatiert}</p>
          </div>

          {/* Live Countdown */}
          <div className="result-box">
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Ziffer wert={ergebnis.tage} label="Tage" />
              <Trenner />
              <Ziffer wert={ergebnis.stunden} label="Std" />
              <Trenner />
              <Ziffer wert={ergebnis.minuten} label="Min" />
              <Trenner />
              <Ziffer wert={ergebnis.sekunden} label="Sek" />
            </div>
          </div>

          {/* Detail-Kacheln */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wochen</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.wochen.toLocaleString('de-DE')}</p>
            </div>
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tage</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.tage.toLocaleString('de-DE')}</p>
            </div>
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stunden</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.gesamtStunden.toLocaleString('de-DE')}</p>
            </div>
            <div className="bg-white dark:bg-gray-600/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sekunden</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.gesamtSekunden.toLocaleString('de-DE')}</p>
            </div>
          </div>

          {/* Fortschrittsbalken (Tage im Jahr) */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Heute</span>
              <span>{ergebnis.tage} Tage</span>
              <span>{eventLabel}</span>
            </div>
            <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-1000"
                style={{ width: `${Math.max(2, Math.min(98, 100 - (ergebnis.tage / 365) * 100))}%` }}
              />
            </div>
          </div>

          {/* Alle Events Übersicht */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Nächste Events im Überblick</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {voreingestellteEvents
                .map(e => ({ ...e, d: e.datum(), cd: berechneCountdown(e.datum()) }))
                .filter(e => !e.cd.vorbei)
                .sort((a, b) => a.cd.gesamtSekunden - b.cd.gesamtSekunden)
                .map(e => (
                  <button
                    key={e.key}
                    onClick={() => setAuswahl(e.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                      auswahl === e.key ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{e.icon}</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{e.label}</span>
                      <span className="text-xs text-gray-600">{e.d.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">{e.cd.tage} Tage</span>
                  </button>
                ))}
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`${eventIcon} ${eventLabel}: Noch ${ergebnis.tage} Tage, ${ergebnis.stunden} Std, ${ergebnis.minuten} Min (${datumFormatiert})`}
            seitenTitel="Countdown-Rechner"
          />

          <AiExplain
            rechnerName="Countdown-Rechner"
            eingaben={{ event: eventLabel, datum: datumFormatiert }}
            ergebnis={{ tage: ergebnis.tage, stunden: ergebnis.stunden, minuten: ergebnis.minuten, wochen: ergebnis.wochen }}
          />

          <AffiliateBox programId="hotelde" context="countdown" />
        </div>
      )}

      {/* Event vorbei */}
      {mounted && ergebnis && ergebnis.vorbei && (
        <div className="result-box text-center">
          <p className="text-5xl mb-2">🎉</p>
          <p className="text-2xl font-bold">{eventLabel} ist da!</p>
        </div>
      )}

      {/* Kein Datum gewählt */}
      {istEigen && !eigenDatum && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-500 text-sm">
          Bitte wählen Sie ein Datum aus.
        </div>
      )}
    </div>
  );
}
