'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Modus = 1 | 3 | 6;

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fmtShort(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function defaultStart(): string {
  const d = addDays(new Date(), -14);
  return d.toISOString().slice(0, 10);
}

type DayKind = 'period' | 'fertile' | 'ovulation' | 'normal';

function buildCycle(start: Date, laenge: number) {
  const eisprung = addDays(start, laenge - 14);
  const fruchtbarVon = addDays(eisprung, -5);
  const fruchtbarBis = addDays(eisprung, 1);
  const naechstePeriode = addDays(start, laenge);
  return { periodenBeginn: start, eisprung, fruchtbarVon, fruchtbarBis, naechstePeriode };
}

export default function ZyklusRechner() {
  const [startDatum, setStartDatum] = useState(defaultStart());
  const [laenge, setLaenge] = useState('28');
  const [modus, setModus] = useState<Modus>(3);

  const ergebnis = useMemo(() => {
    const l = Math.max(21, Math.min(35, parseInt(laenge) || 28));
    const start = new Date(startDatum);
    if (isNaN(start.getTime())) return null;

    const anzahl = modus;
    const zyklen = [];
    for (let i = 0; i < anzahl; i++) {
      const zStart = addDays(start, l * i);
      zyklen.push(buildCycle(zStart, l));
    }
    return { laenge: l, zyklen };
  }, [startDatum, laenge, modus]);

  // Kalender-Daten für den ersten Zyklus (aktueller Monat + ggf. nachfolgender)
  const kalenderMonate = useMemo(() => {
    if (!ergebnis) return [];
    const start = ergebnis.zyklen[0].periodenBeginn;
    const endeLetzterZyklus = ergebnis.zyklen[ergebnis.zyklen.length - 1].naechstePeriode;
    const monate: { jahr: number; monat: number }[] = [];
    const cur = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cur <= endeLetzterZyklus) {
      monate.push({ jahr: cur.getFullYear(), monat: cur.getMonth() });
      cur.setMonth(cur.getMonth() + 1);
    }
    return monate.slice(0, modus === 1 ? 2 : modus === 3 ? 4 : 7);
  }, [ergebnis, modus]);

  function getDayKind(date: Date): DayKind {
    if (!ergebnis) return 'normal';
    for (const z of ergebnis.zyklen) {
      const periodenEnde = addDays(z.periodenBeginn, 4); // ~5 Tage Periode
      if (date >= z.periodenBeginn && date <= periodenEnde) return 'period';
      if (date.toDateString() === z.eisprung.toDateString()) return 'ovulation';
      if (date >= z.fruchtbarVon && date <= z.fruchtbarBis) return 'fertile';
    }
    return 'normal';
  }

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Erster Tag der letzten Periode</label>
          <input type="date" value={startDatum} onChange={e => setStartDatum(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
        </div>
        <div>
          <label htmlFor="zyklus-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Zykluslänge</label>
          <select id="zyklus-select-1" value={laenge} onChange={e => setLaenge(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {Array.from({ length: 15 }, (_, i) => 21 + i).map(n => <option key={n} value={n}>{n} Tage</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Vom ersten Tag der Periode bis zum Tag vor der nächsten Periode.</p>
        </div>
        <div>
          <RadioToggleGroup
            name="zyklus-vorausberechnung"
            legend="Vorausberechnung"
            options={[
              { value: '1', label: '1 Zyklus' },
              { value: '3', label: '3 Zyklen' },
              { value: '6', label: '6 Zyklen' },
            ]}
            value={String(modus)}
            onChange={(v) => setModus(Number(v) as Modus)}
            columns={3}
          />
        </div>
      </div>

      {ergebnis && (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Nächster Eisprung</p>
            <p className="text-4xl font-bold">{fmtDate(ergebnis.zyklen[0].eisprung)}</p>
            <p className="text-white/80 text-sm mt-3">
              Fruchtbar: <strong>{fmtShort(ergebnis.zyklen[0].fruchtbarVon)} – {fmtShort(ergebnis.zyklen[0].fruchtbarBis)}</strong>
            </p>
            <p className="text-white/80 text-sm">
              Nächste Periode: <strong>{fmtShort(ergebnis.zyklen[0].naechstePeriode)}</strong>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Kalender</h2>
            <div className="flex flex-wrap gap-3 text-xs mb-3">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Periode</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-300 inline-block"></span>Fruchtbar</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-600 inline-block"></span>Eisprung</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kalenderMonate.map(({ jahr, monat }) => {
                const first = new Date(jahr, monat, 1);
                const lastDay = new Date(jahr, monat + 1, 0).getDate();
                const startWeekday = (first.getDay() + 6) % 7; // Mo=0
                const cells: (Date | null)[] = Array(startWeekday).fill(null);
                for (let d = 1; d <= lastDay; d++) cells.push(new Date(jahr, monat, d));
                while (cells.length % 7 !== 0) cells.push(null);
                return (
                  <div key={`${jahr}-${monat}`}>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {first.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                    </p>
                    <div className="grid grid-cols-7 gap-0.5 text-[10px] text-gray-600 mb-1">
                      {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(l => <div key={l} className="text-center">{l}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5">
                      {cells.map((c, i) => {
                        if (!c) return <div key={i} className="aspect-square"></div>;
                        const kind = getDayKind(c);
                        const istHeute = c.getTime() === heute.getTime();
                        const color =
                          kind === 'period' ? 'bg-red-600 text-white' :
                          kind === 'ovulation' ? 'bg-green-600 text-white font-bold' :
                          kind === 'fertile' ? 'bg-green-200 dark:bg-green-800 text-gray-800 dark:text-gray-100' :
                          'bg-gray-50 dark:bg-gray-900 text-gray-500';
                        return (
                          <div key={i} className={`aspect-square flex items-center justify-center rounded text-[11px] ${color} ${istHeute ? 'ring-2 ring-primary-500' : ''}`}>
                            {kind === 'ovulation' ? '★' : c.getDate()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {modus > 1 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 overflow-x-auto">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Zyklus-Übersicht</h2>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-400 text-left">
                    <th className="pb-2">Zyklus</th>
                    <th className="pb-2">Periode</th>
                    <th className="pb-2">Eisprung</th>
                    <th className="pb-2">Fruchtbar</th>
                    <th className="pb-2">Nächste Periode</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.zyklen.map((z, i) => (
                    <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="py-1.5 font-medium">{i + 1}</td>
                      <td>{fmtShort(z.periodenBeginn)}</td>
                      <td>{fmtShort(z.eisprung)}</td>
                      <td>{fmtShort(z.fruchtbarVon)} – {fmtShort(z.fruchtbarBis)}</td>
                      <td>{fmtShort(z.naechstePeriode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Diese Berechnung basiert auf Durchschnittswerten. Der tatsächliche Eisprung kann variieren. Dieser Rechner ist KEIN zuverlässiges Verhütungsmittel und KEINE Garantie für eine Schwangerschaft.
      </p>

      <CrossLink href="/gesundheit/geburtstermin-rechner" emoji="📅" text="Geburtstermin-Rechner" />
      <CrossLink href="/gesundheit/ssw-rechner" emoji="🤰" text="SSW-Rechner" />
      <CrossLink href="/alltag/tagerechner" emoji="📆" text="Tage zwischen Daten" />

      <ErgebnisAktionen
        ergebnisText={ergebnis ? `Eisprung: ${fmtShort(ergebnis.zyklen[0].eisprung)} · Fruchtbar: ${fmtShort(ergebnis.zyklen[0].fruchtbarVon)}–${fmtShort(ergebnis.zyklen[0].fruchtbarBis)}` : ''}
        seitenTitel="Zyklusrechner"
      />

      <AiExplain
        rechnerName="Zyklusrechner"
        eingaben={{
          'Erster Tag letzte Periode': startDatum,
          'Zykluslänge': `${laenge} Tage`,
          'Vorausberechnung': `${modus} Zyklus/Zyklen`,
        }}
        ergebnis={ergebnis ? {
          'Eisprung': fmtShort(ergebnis.zyklen[0].eisprung),
          'Fruchtbares Fenster': `${fmtShort(ergebnis.zyklen[0].fruchtbarVon)} – ${fmtShort(ergebnis.zyklen[0].fruchtbarBis)}`,
          'Nächste Periode': fmtShort(ergebnis.zyklen[0].naechstePeriode),
        } : {}}
      />
    </div>
  );
}
