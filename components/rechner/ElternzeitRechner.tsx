'use client';

import { useState, useMemo, useEffect } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneElternzeit,
  MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT,
} from '@/lib/berechnungen/elternzeit';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultGeburt(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return toIso(d);
}

function fmtKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function addTage(d: Date, t: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + t);
  return r;
}

export default function ElternzeitRechner() {
  // SSG-Hydration-Guard: Geburtsdatum leer, client-seitig setzen.
  const [geburt, setGeburt] = useState('');
  const [p1Beginn, setP1Beginn] = useState('');
  const [p1Monate, setP1Monate] = useState('12');
  const [p2Beginn, setP2Beginn] = useState('');
  const [p2Monate, setP2Monate] = useState('2');
  const [teilzeit, setTeilzeit] = useState(false);
  const [teilzeitStunden, setTeilzeitStunden] = useState('20');

  useEffect(() => {
    setGeburt(defaultGeburt());
  }, []);

  // Default-Vorschläge basierend auf Geburt (UI-Display für Date-Inputs)
  const effP1Beginn = useMemo(() => {
    if (p1Beginn) return p1Beginn;
    if (!geburt) return '';
    const g = new Date(geburt);
    if (isNaN(g.getTime())) return '';
    return toIso(addTage(g, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT));
  }, [geburt, p1Beginn]);

  const effP2Beginn = useMemo(() => {
    if (p2Beginn) return p2Beginn;
    return geburt;
  }, [geburt, p2Beginn]);

  const ergebnis = useMemo(() => berechneElternzeit({
    geburt,
    p1Beginn: effP1Beginn || undefined,
    p1Monate: parseDeutscheZahl(p1Monate) || 0,
    p2Beginn: effP2Beginn || undefined,
    p2Monate: parseDeutscheZahl(p2Monate) || 0,
  }), [geburt, effP1Beginn, effP2Beginn, p1Monate, p2Monate]);

  return (
    <div>
      {/* Geburtsdatum */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geburtsdatum des Kindes</label>
        <input
          type="date"
          value={geburt}
          onChange={e => setGeburt(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        />
      </div>

      {/* Partner 1 */}
      <div className="mb-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Elternzeit Partner 1</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Beginn</label>
            <input
              type="date"
              value={effP1Beginn}
              onChange={e => setP1Beginn(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dauer (Monate, max. 36)</label>
            <NummerEingabe value={p1Monate} onChange={setP1Monate} placeholder="12" einheit="Monate" />
          </div>
        </div>
      </div>

      {/* Partner 2 */}
      <div className="mb-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Elternzeit Partner 2</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Beginn</label>
            <input
              type="date"
              value={effP2Beginn}
              onChange={e => setP2Beginn(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dauer (Monate, max. 36)</label>
            <NummerEingabe value={p2Monate} onChange={setP2Monate} placeholder="2" einheit="Monate" />
          </div>
        </div>
      </div>

      {/* Teilzeit */}
      <div className="mb-6 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Teilzeit während Elternzeit?</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">15–32 Stunden/Woche erlaubt</p>
          </div>
          <button
            onClick={() => setTeilzeit(!teilzeit)}
            className={`w-12 h-7 rounded-full relative transition-colors ${teilzeit ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${teilzeit ? 'translate-x-5' : ''}`} />
          </button>
        </div>
        {teilzeit && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Stunden/Woche</label>
            <NummerEingabe value={teilzeitStunden} onChange={setTeilzeitStunden} placeholder="20" einheit="h/Woche" />
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Gesamte Elternzeit</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {ergebnis.gesamtMonate} Monate
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Partner 1: {ergebnis.p1Mon} Monate · Partner 2: {ergebnis.p2Mon} Monate
            </p>
          </div>

          {/* Timeline Partner 1 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-3">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Partner 1 — Fristen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anmeldung beim Arbeitgeber bis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.anmeldungP1)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Beginn</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p1B)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Ende</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p1E)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsschutz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.kSchutzBeginnP1)} – {fmtKurz(ergebnis.kSchutzEndeP1)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibender Anspruch</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.verbleibendP1} Monate (bis 8. Geburtstag)</span>
              </div>
            </div>
          </div>

          {/* Timeline Partner 2 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Partner 2 — Fristen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anmeldung beim Arbeitgeber bis</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.anmeldungP2)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Beginn</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p2B)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Elternzeit-Ende</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.p2E)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsschutz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmtKurz(ergebnis.kSchutzBeginnP2)} – {fmtKurz(ergebnis.kSchutzEndeP2)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibender Anspruch</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.verbleibendP2} Monate (bis 8. Geburtstag)</span>
              </div>
            </div>
          </div>

          {/* Hinweise */}
          {!ergebnis.partnermonateOk && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Partnermonate:</strong> Für die vollen 14 Monate Elterngeld muss jeder Partner mindestens 2 Monate Elternzeit nehmen. Sonst gibt es nur 12 Monate.
              </p>
            </div>
          )}

          {ergebnis.ueberlappung && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Mutterschutz-Überlappung:</strong> Der Mutterschutz nach der Geburt (8 Wochen bis {fmtKurz(ergebnis.mutterschutzEnde)}) wird auf die Elternzeit der Mutter angerechnet. Die Elternzeit-Mutter beginnt frühestens danach.
              </p>
            </div>
          )}

          <CrossLink href="/finanzen/elterngeld-rechner" emoji="💰" text="Elterngeld berechnen" />
          <CrossLink href="/arbeit/mutterschutz-rechner" emoji="🤱" text="Mutterschutz-Fristen berechnen" />
          {teilzeit && (
            <CrossLink href="/arbeit/teilzeit-rechner" emoji="⏰" text="Teilzeitgehalt berechnen" />
          )}

          <ErgebnisAktionen
            ergebnisText={`Elternzeit: P1 ${ergebnis.p1Mon} Monate (${fmtKurz(ergebnis.p1B)}–${fmtKurz(ergebnis.p1E)}), P2 ${ergebnis.p2Mon} Monate (${fmtKurz(ergebnis.p2B)}–${fmtKurz(ergebnis.p2E)}). Anmeldefristen: P1 ${fmtKurz(ergebnis.anmeldungP1)}, P2 ${fmtKurz(ergebnis.anmeldungP2)}.`}
            seitenTitel="Elternzeit-Rechner"
          />

          <AiExplain
            rechnerName="Elternzeit-Rechner"
            eingaben={{
              geburtsdatum: geburt,
              p1Beginn: effP1Beginn,
              p1Monate: ergebnis.p1Mon,
              p2Beginn: effP2Beginn,
              p2Monate: ergebnis.p2Mon,
              teilzeit,
              teilzeitStunden: teilzeit ? parseDeutscheZahl(teilzeitStunden) : 0,
            }}
            ergebnis={{
              gesamtMonate: ergebnis.gesamtMonate,
              p1Ende: fmtKurz(ergebnis.p1E),
              p2Ende: fmtKurz(ergebnis.p2E),
              anmeldungP1: fmtKurz(ergebnis.anmeldungP1),
              anmeldungP2: fmtKurz(ergebnis.anmeldungP2),
              verbleibendP1: ergebnis.verbleibendP1,
              verbleibendP2: ergebnis.verbleibendP2,
            }}
          />
        </>
      )}
    </div>
  );
}
