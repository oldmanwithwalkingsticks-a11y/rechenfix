'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { berechneGeburtstag } from '@/lib/berechnungen/geburtstag';
import { useMounted } from '@/lib/hooks/useMounted';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fmtDatumLang(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtZahl(n: number): string {
  return n.toLocaleString('de-DE');
}

// Live-Sekunden-Zähler-Komponente
function LiveSekundenZaehler({ geburtsdatumMs }: { geburtsdatumMs: number }) {
  const [sekunden, setSekunden] = useState('');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function update() {
      const jetzt = Date.now();
      const diff = Math.floor((jetzt - geburtsdatumMs) / 1000);
      setSekunden(diff.toLocaleString('de-DE'));
      rafRef.current = requestAnimationFrame(update);
    }
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [geburtsdatumMs]);

  return (
    <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-5 mb-6 text-center">
      <p className="text-gray-600 text-sm mb-2">Sie leben seit</p>
      <p className="text-3xl sm:text-4xl font-mono font-bold text-green-400 tabular-nums tracking-wider">
        {sekunden}
      </p>
      <p className="text-gray-600 text-sm mt-2">Sekunden</p>
    </div>
  );
}

export default function GeburtstagRechner() {
  const [geburtsdatum, setGeburtsdatum] = useState('1990-06-15');
  const mounted = useMounted();

  const ergebnis = useMemo(
    () => berechneGeburtstag(geburtsdatum),
    [geburtsdatum],
  );

  return (
    <div>
      {/* Geburtsdatum */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geburtsdatum</label>
        <input
          type="date"
          value={geburtsdatum}
          onChange={ev => setGeburtsdatum(ev.target.value)}
          max={mounted ? new Date().toISOString().split('T')[0] : undefined}
          className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
        />
      </div>

      {/* Ergebnis — erst nach Mount (SSG-Hydration-Guard) */}
      {mounted && ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Ihr Alter</p>
            <p className="text-4xl sm:text-5xl font-bold">
              {ergebnis.jahre} Jahre
            </p>
            <p className="text-white/80 text-lg mt-1">
              {ergebnis.monate} Monate und {ergebnis.tage} Tage
            </p>
          </div>

          {/* Live-Sekunden-Zähler */}
          <LiveSekundenZaehler geburtsdatumMs={ergebnis.geburtsdatumMs} />

          {/* Fun-Facts-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <FactCard label="Tage" value={fmtZahl(ergebnis.gesamtTage)} />
            <FactCard label="Wochen" value={fmtZahl(ergebnis.gesamtWochen)} />
            <FactCard label="Stunden" value={fmtZahl(ergebnis.gesamtStunden)} />
            <FactCard label="Minuten" value={fmtZahl(ergebnis.gesamtMinuten)} />
            <FactCard
              label="Geboren am"
              value={ergebnis.wochentagGeburt}
              sub={fmtDatum(new Date(geburtsdatum + 'T00:00:00'))}
            />
            <FactCard
              label="Sternzeichen"
              value={`${ergebnis.sternzeichen.symbol} ${ergebnis.sternzeichen.name}`}
              sub={`${ergebnis.sternzeichen.von} – ${ergebnis.sternzeichen.bis}`}
            />
          </div>

          {/* Nächster Geburtstag */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">🎉 Nächster Geburtstag</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Datum</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDatumLang(ergebnis.naechsterGeburtstag)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Noch</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {ergebnis.tagesBisNaechster === 0 ? '🎂 Heute!' : `${fmtZahl(ergebnis.tagesBisNaechster)} Tage`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sie werden</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.alterNaechster} Jahre alt</span>
              </div>
            </div>
          </div>

          {/* Nächster runder Geburtstag */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-200 dark:border-purple-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-purple-800 dark:text-purple-300 mb-3">🎈 Nächster runder Geburtstag</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-700 dark:text-purple-400">Geburtstag</span>
                <span className="font-bold text-purple-900 dark:text-purple-200 text-lg">{ergebnis.naechsterRunderGeburtstag}. Geburtstag</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700 dark:text-purple-400">Datum</span>
                <span className="font-semibold text-purple-800 dark:text-purple-300">{fmtDatumLang(ergebnis.datumRunderGeburtstag)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700 dark:text-purple-400">Noch</span>
                <span className="font-semibold text-purple-800 dark:text-purple-300">{ergebnis.jahreBisRunder} Jahre ({fmtZahl(ergebnis.tagesBisRunder)} Tage)</span>
              </div>
            </div>
          </div>

          {/* Meilensteine */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">🏆 Meilensteine</h2>
            <div className="space-y-3">
              {ergebnis.meilensteine.map(ms => (
                <div key={ms.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`text-base ${ms.vergangen ? '' : 'opacity-70'}`}>
                      {ms.vergangen ? '✅' : '⏳'}
                    </span>
                    <span className={`font-medium ${ms.vergangen ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {ms.label}
                    </span>
                  </div>
                  <span className={`tabular-nums ${ms.vergangen ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {fmtDatum(ms.datum)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>💡 Wussten Sie?</strong> Die Berechnung basiert auf Kalendertagen ab Mitternacht des Geburtstages. Die tatsächliche Geburtszeit ist nicht berücksichtigt — Ihr exaktes Alter in Sekunden kann also leicht abweichen.
            </p>
          </div>

          <CrossLink href="/alltag/tagerechner" emoji="📅" text="Tage zwischen zwei Daten berechnen" />
          <CrossLink href="/alltag/lebenszeit-rechner" emoji="⏳" text="Lebenszeit berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Ich bin ${ergebnis.jahre} Jahre, ${ergebnis.monate} Monate und ${ergebnis.tage} Tage alt — das sind ${fmtZahl(ergebnis.gesamtTage)} Tage! 🎂 Geboren am ${ergebnis.wochentagGeburt}, Sternzeichen: ${ergebnis.sternzeichen.symbol} ${ergebnis.sternzeichen.name}`}
            seitenTitel="Geburtstags-Rechner"
          />

          <AiExplain
            rechnerName="Geburtstags-Rechner"
            eingaben={{
              geburtsdatum: fmtDatum(new Date(geburtsdatum + 'T00:00:00')),
            }}
            ergebnis={{
              alter: `${ergebnis.jahre} Jahre, ${ergebnis.monate} Monate, ${ergebnis.tage} Tage`,
              tage: ergebnis.gesamtTage,
              wochentag: ergebnis.wochentagGeburt,
              sternzeichen: `${ergebnis.sternzeichen.symbol} ${ergebnis.sternzeichen.name}`,
              naechsterGeburtstag: `in ${ergebnis.tagesBisNaechster} Tagen`,
            }}
          />
        </>
      )}
    </div>
  );
}

// Hilfskomponente: Fact-Card
function FactCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-800 dark:text-gray-200 tabular-nums">{value}</p>
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}
