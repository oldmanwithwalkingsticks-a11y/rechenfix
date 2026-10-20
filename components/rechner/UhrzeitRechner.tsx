'use client';

import { useState, useMemo, useEffect } from 'react';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import {
  ZEITZONEN, findeZeitzone, zonenLabel, offsetMinuten, formatUtcOffset, rechneZeitzone,
} from '@/lib/berechnungen/zeitzonen';

type Tab = 'diff' | 'addsub' | 'zone';

// W184: vorher feste Offsets (MEZ/MESZ immer UTC+1, EST immer UTC−5 …) — in der Sommerzeit
// lag jede Umrechnung mit Berlin, London, USA oder Sydney um 1 h daneben. Jetzt IANA-Zeitzonen
// mit Datum (lib/berechnungen/zeitzonen.ts), Sommerzeit automatisch.

function isoZuDeutsch(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

function heuteIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseZeit(s: string): { h: number; m: number } | null {
  const match = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { h, m };
}

function formatZeit(min: number): string {
  const normalized = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export default function UhrzeitRechner() {
  const [tab, setTab] = useState<Tab>('diff');

  // Tab 1: Differenz
  const [startZeit, setStartZeit] = useState('08:30');
  const [endZeit, setEndZeit] = useState('17:00');
  const [ueberMitternacht, setUeberMitternacht] = useState(false);

  // Tab 2: Add/Sub
  const [basisZeit, setBasisZeit] = useState('14:30');
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  const [stunden, setStunden] = useState('2');
  const [minuten, setMinuten] = useState('30');

  // Tab 3: Zonen
  const [zoneZeit, setZoneZeit] = useState('12:00');
  const [vonZone, setVonZone] = useState('mez');
  const [nachZone, setNachZone] = useState('est');
  // Datum leer im SSG-HTML, „heute“ erst client-seitig (Hydration, vgl. TageRechner)
  const [zoneDatum, setZoneDatum] = useState('');
  useEffect(() => {
    setZoneDatum(heuteIso());
  }, []);

  const diffErg = useMemo(() => {
    const s = parseZeit(startZeit);
    const e = parseZeit(endZeit);
    if (!s || !e) return null;
    const startMin = s.h * 60 + s.m;
    const endMin = e.h * 60 + e.m;
    let diff: number;
    if (ueberMitternacht || endMin < startMin) {
      diff = (24 * 60 - startMin) + endMin;
    } else {
      diff = endMin - startMin;
    }
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const dezimal = diff / 60;
    return { h, m, dezimal, diff };
  }, [startZeit, endZeit, ueberMitternacht]);

  const addErg = useMemo(() => {
    const b = parseZeit(basisZeit);
    if (!b) return null;
    const basisMin = b.h * 60 + b.m;
    const h = parseInt(stunden || '0', 10) || 0;
    const m = parseInt(minuten || '0', 10) || 0;
    const delta = h * 60 + m;
    const gesamt = operation === 'add' ? basisMin + delta : basisMin - delta;
    const tagOffset = Math.floor(gesamt / 1440);
    return { ergebnis: formatZeit(gesamt), tagOffset };
  }, [basisZeit, operation, stunden, minuten]);

  const zonenErg = useMemo(() => {
    if (!zoneDatum || !parseZeit(zoneZeit)) return null;
    const von = findeZeitzone(vonZone);
    const nach = findeZeitzone(nachZone);
    const r = rechneZeitzone(zoneDatum, zoneZeit, vonZone, nachZone);
    if (!von || !nach || !r) return null;
    return {
      ...r,
      unterschied: r.unterschiedMinuten / 60,
      vonLabel: `${r.vonKuerzel} (${von.stadt})`,
      nachLabel: `${r.nachKuerzel} (${nach.stadt})`,
      vonStadt: von.stadt,
      nachStadt: nach.stadt,
    };
  }, [zoneZeit, vonZone, nachZone, zoneDatum]);

  // Offset jeder Zone zum gewählten Zeitpunkt (für die Auswahlliste); ohne Datum: keine Angabe
  const zonenOffsetText = (tz: string) =>
    zonenErg ? ` · ${formatUtcOffset(offsetMinuten(tz, zonenErg.utcMs))}` : '';
  const fmtStd = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

  const inputClass = 'w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 grid grid-cols-3 gap-2">
        {[
          { k: 'diff' as Tab, l: 'Zeitdifferenz' },
          { k: 'addsub' as Tab, l: 'Addieren / Subtr.' },
          { k: 'zone' as Tab, l: 'Zeitzonen' },
        ].map(t => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`min-h-[48px] px-3 py-2 rounded-xl border text-sm font-medium transition ${tab === t.k ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'}`}
          >{t.l}</button>
        ))}
      </div>

      {/* Tab 1 */}
      {tab === 'diff' && (
        <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Startzeit</label>
            <input type="time" value={startZeit} onChange={e => setStartZeit(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endzeit</label>
            <input type="time" value={endZeit} onChange={e => setEndZeit(e.target.value)} className={inputClass} />
          </div>
          <div>
            <RadioToggleGroup
              name="uhrzeit-mitternacht"
              legend="Über Mitternacht?"
              options={[
                { value: 'nein', label: 'Nein' },
                { value: 'ja', label: 'Ja' },
              ]}
              value={ueberMitternacht ? 'ja' : 'nein'}
              onChange={(v) => setUeberMitternacht(v === 'ja')}
              columns={2}
              fullWidth
            />
          </div>
        </div>
      )}

      {/* Tab 2 */}
      {tab === 'addsub' && (
        <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ausgangszeit</label>
            <input type="time" value={basisZeit} onChange={e => setBasisZeit(e.target.value)} className={inputClass} />
          </div>
          <div>
            <RadioToggleGroup
              name="uhrzeit-operation"
              legend="Operation"
              options={[
                { value: 'add', label: 'Addieren (+)' },
                { value: 'sub', label: 'Subtrahieren (−)' },
              ]}
              value={operation}
              onChange={(v) => setOperation(v as 'add' | 'sub')}
              columns={2}
              fullWidth
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Stunden</label>
              <input type="number" value={stunden} onChange={e => setStunden(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Minuten</label>
              <input type="number" value={minuten} onChange={e => setMinuten(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3 */}
      {tab === 'zone' && (
        <div className="mb-6 space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label htmlFor="uhrzeit-datum" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Datum (für Sommer-/Winterzeit)</label>
            <input id="uhrzeit-datum" type="date" value={zoneDatum} onChange={e => setZoneDatum(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Uhrzeit</label>
            <input type="time" value={zoneZeit} onChange={e => setZoneZeit(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="uhrzeit-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Von Zeitzone</label>
            <select id="uhrzeit-select-1" value={vonZone} onChange={e => setVonZone(e.target.value)} className={inputClass}>
              {ZEITZONEN.map(z => <option key={z.id} value={z.id}>{zonenLabel(z)}{zonenOffsetText(z.tz)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="uhrzeit-select-2" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nach Zeitzone</label>
            <select id="uhrzeit-select-2" value={nachZone} onChange={e => setNachZone(e.target.value)} className={inputClass}>
              {ZEITZONEN.map(z => <option key={z.id} value={z.id}>{zonenLabel(z)}{zonenOffsetText(z.tz)}</option>)}
            </select>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sommer- und Winterzeit werden je Zone automatisch nach dem Datum berücksichtigt (IANA-Zeitzonendatenbank).
          </p>
        </div>
      )}

      {/* Ergebnis */}
      {tab === 'diff' && diffErg && (
        <div className="result-box mb-6">
          <p className="text-white/80 text-sm mb-1">Differenz</p>
          <p className="text-5xl font-bold">{diffErg.h} h {diffErg.m} min</p>
          <p className="text-white/80 text-sm mt-2">
            {diffErg.dezimal.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Dezimalstunden · {diffErg.diff} Minuten
          </p>
        </div>
      )}

      {tab === 'addsub' && addErg && (
        <div className="result-box mb-6">
          <p className="text-white/80 text-sm mb-1">Ergebnis</p>
          <p className="text-5xl font-bold">{addErg.ergebnis}</p>
          {addErg.tagOffset !== 0 && (
            <p className="text-white/80 text-sm mt-2">
              {addErg.tagOffset > 0 ? `+${addErg.tagOffset} Tag` : `${addErg.tagOffset} Tag`}
            </p>
          )}
        </div>
      )}

      {tab === 'zone' && zonenErg && (
        <div className="result-box mb-6">
          <p className="text-white/80 text-sm mb-1">{zonenErg.nachLabel}</p>
          <p className="text-5xl font-bold">{zonenErg.ziel}</p>
          <p className="text-white/80 text-sm mt-2">
            {isoZuDeutsch(zoneDatum)}, {zoneZeit} {zonenErg.vonLabel} = {zonenErg.ziel} {zonenErg.nachLabel}
            {zonenErg.tagOffset !== 0 && ` (${isoZuDeutsch(zonenErg.zielDatumIso)})`}
          </p>
          <p className="text-white/70 text-xs mt-1">
            Zeitunterschied: {zonenErg.unterschied >= 0 ? '+' : '−'}{fmtStd(Math.abs(zonenErg.unterschied))} Stunden
            {zonenErg.tagOffset !== 0 && ` · ${zonenErg.tagOffset > 0 ? '+' : '−'}${Math.abs(zonenErg.tagOffset)} Tag`}
            {' · '}{zonenErg.vonStadt} {formatUtcOffset(zonenErg.vonOffsetMin)}, {zonenErg.nachStadt} {formatUtcOffset(zonenErg.nachOffsetMin)}
          </p>
          {zonenErg.uhrzeitUngueltig && (
            <p className="text-white/80 text-xs mt-2">
              Hinweis: {zoneZeit} Uhr gibt es an diesem Tag in {zonenErg.vonStadt} wegen der Zeitumstellung nicht; gerechnet wurde mit der Uhrzeit eine Stunde später.
            </p>
          )}
        </div>
      )}

      <CrossLink href="/alltag/tagerechner" emoji="📅" text="Tage berechnen" />
      <CrossLink href="/arbeit/arbeitszeitrechner" emoji="⏱️" text="Arbeitszeit berechnen" />
      <CrossLink href="/alltag/countdown" emoji="⏳" text="Countdown" />

      <ErgebnisAktionen
        ergebnisText={
          tab === 'diff' && diffErg
            ? `Zeitdifferenz: ${diffErg.h} h ${diffErg.m} min (${diffErg.dezimal.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Dezimalstunden)`
            : tab === 'addsub' && addErg
              ? `Ergebnis: ${addErg.ergebnis}`
              : tab === 'zone' && zonenErg
                ? `${isoZuDeutsch(zoneDatum)}, ${zoneZeit} ${zonenErg.vonLabel} = ${zonenErg.ziel} ${zonenErg.nachLabel}${zonenErg.tagOffset !== 0 ? ` (${isoZuDeutsch(zonenErg.zielDatumIso)})` : ''}`
                : ''
        }
        seitenTitel="Uhrzeitrechner"
      />

      <AiExplain
        rechnerName="Uhrzeitrechner"
        eingaben={
          tab === 'diff'
            ? { Modus: 'Zeitdifferenz', Start: startZeit, Ende: endZeit }
            : tab === 'addsub'
              ? { Modus: 'Addieren/Subtrahieren', Ausgangszeit: basisZeit, Operation: operation === 'add' ? '+' : '−', Dauer: `${stunden}h ${minuten}min` }
              : { Modus: 'Zeitzonen', Datum: isoZuDeutsch(zoneDatum), Uhrzeit: zoneZeit, Von: zonenErg?.vonLabel ?? vonZone, Nach: zonenErg?.nachLabel ?? nachZone }
        }
        ergebnis={
          tab === 'diff' && diffErg
            ? { Differenz: `${diffErg.h} h ${diffErg.m} min`, Dezimalstunden: diffErg.dezimal.toFixed(2) }
            : tab === 'addsub' && addErg
              ? { Ergebnis: addErg.ergebnis }
              : tab === 'zone' && zonenErg
                ? { Ziel: zonenErg.ziel, Unterschied: `${fmtStd(zonenErg.unterschied)} h` }
                : {}
        }
      />
    </div>
  );
}
