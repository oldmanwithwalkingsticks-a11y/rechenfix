'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'monat' | 'zeitraum' | 'jahr';
type BL = 'bw' | 'by' | 'be' | 'bb' | 'hb' | 'hh' | 'he' | 'mv' | 'ni' | 'nw' | 'rp' | 'sl' | 'sn' | 'st' | 'sh' | 'th';

const BUNDESLAENDER: { slug: BL; name: string }[] = [
  { slug: 'bw', name: 'Baden-Württemberg' },
  { slug: 'by', name: 'Bayern' },
  { slug: 'be', name: 'Berlin' },
  { slug: 'bb', name: 'Brandenburg' },
  { slug: 'hb', name: 'Bremen' },
  { slug: 'hh', name: 'Hamburg' },
  { slug: 'he', name: 'Hessen' },
  { slug: 'mv', name: 'Mecklenburg-Vorpommern' },
  { slug: 'ni', name: 'Niedersachsen' },
  { slug: 'nw', name: 'Nordrhein-Westfalen' },
  { slug: 'rp', name: 'Rheinland-Pfalz' },
  { slug: 'sl', name: 'Saarland' },
  { slug: 'sn', name: 'Sachsen' },
  { slug: 'st', name: 'Sachsen-Anhalt' },
  { slug: 'sh', name: 'Schleswig-Holstein' },
  { slug: 'th', name: 'Thüringen' },
];

// Feiertage 2026 (Datum im Format MM-DD) + Länder-Liste. 'alle' = bundesweit.
type Feiertag = { datum: string; name: string; laender: 'alle' | BL[] };

const FEIERTAGE_2026: Feiertag[] = [
  { datum: '01-01', name: 'Neujahr', laender: 'alle' },
  { datum: '01-06', name: 'Heilige Drei Könige', laender: ['bw', 'by', 'st'] },
  { datum: '03-08', name: 'Internationaler Frauentag', laender: ['be', 'mv'] },
  { datum: '04-03', name: 'Karfreitag', laender: 'alle' },
  { datum: '04-06', name: 'Ostermontag', laender: 'alle' },
  { datum: '05-01', name: 'Tag der Arbeit', laender: 'alle' },
  { datum: '05-14', name: 'Christi Himmelfahrt', laender: 'alle' },
  { datum: '05-25', name: 'Pfingstmontag', laender: 'alle' },
  { datum: '06-04', name: 'Fronleichnam', laender: ['bw', 'by', 'he', 'nw', 'rp', 'sl'] },
  { datum: '08-15', name: 'Mariä Himmelfahrt', laender: ['sl'] },
  { datum: '09-20', name: 'Weltkindertag', laender: ['th'] },
  { datum: '10-03', name: 'Tag der Deutschen Einheit', laender: 'alle' },
  { datum: '10-31', name: 'Reformationstag', laender: ['bb', 'hb', 'hh', 'mv', 'ni', 'sn', 'st', 'sh', 'th'] },
  { datum: '11-01', name: 'Allerheiligen', laender: ['bw', 'by', 'nw', 'rp', 'sl'] },
  { datum: '11-18', name: 'Buß- und Bettag', laender: ['sn'] },
  { datum: '12-25', name: '1. Weihnachtstag', laender: 'alle' },
  { datum: '12-26', name: '2. Weihnachtstag', laender: 'alle' },
];

function isFeiertag(date: Date, bl: BL): Feiertag | null {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const key = `${m}-${d}`;
  for (const f of FEIERTAGE_2026) {
    if (f.datum === key && (f.laender === 'alle' || f.laender.includes(bl))) return f;
  }
  return null;
}

function countArbeitstage(start: Date, end: Date, bl: BL, arbeitstageProWoche: number[]) {
  let at = 0;
  let wt = 0;
  let ft = 0;
  const feiertage: { datum: string; name: string }[] = [];
  const d = new Date(start);
  while (d <= end) {
    const tag = d.getDay(); // 0=So 1=Mo…6=Sa
    const istArbeitswerktag = arbeitstageProWoche.includes(tag);
    if (tag !== 0 && tag !== 6) wt++;
    const fe = isFeiertag(d, bl);
    if (fe) {
      if (tag !== 0 && tag !== 6) {
        ft++;
        feiertage.push({ datum: d.toLocaleDateString('de-DE'), name: fe.name });
      }
    }
    if (istArbeitswerktag && !fe) at++;
    d.setDate(d.getDate() + 1);
  }
  return { arbeitstage: at, werktage: wt, feiertage: ft, feiertageListe: feiertage };
}

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export default function ArbeitstageRechner() {
  const [modus, setModus] = useState<Modus>('monat');
  const [bl, setBl] = useState<BL>('nw');
  const [jahr, setJahr] = useState('2026');
  const [monat, setMonat] = useState('1');
  const [von, setVon] = useState('2026-01-01');
  const [bis, setBis] = useState('2026-12-31');
  const [tage, setTage] = useState([1, 2, 3, 4, 5]); // Mo-Fr

  const ergebnis = useMemo(() => {
    const j = parseInt(jahr) || 2026;
    let start: Date, end: Date;
    if (modus === 'monat') {
      const m = Math.max(1, Math.min(12, parseInt(monat) || 1)) - 1;
      start = new Date(j, m, 1);
      end = new Date(j, m + 1, 0);
    } else if (modus === 'jahr') {
      start = new Date(j, 0, 1);
      end = new Date(j, 11, 31);
    } else {
      start = new Date(von);
      end = new Date(bis);
      if (end < start) end = start;
    }
    return countArbeitstage(start, end, bl, tage);
  }, [modus, jahr, monat, von, bis, bl, tage]);

  const toggleTag = (t: number) => setTage(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t].sort());

  return (
    <div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Modus</label>
        <div className="grid grid-cols-3 gap-2">
          {(['monat', 'zeitraum', 'jahr'] as Modus[]).map(m => (
            <button key={m} onClick={() => setModus(m)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${modus === m ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
              {m === 'monat' ? 'Monat' : m === 'zeitraum' ? 'Zeitraum' : 'Ganzes Jahr'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bundesland</label>
          <select value={bl} onChange={e => setBl(e.target.value as BL)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {BUNDESLAENDER.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
        </div>

        {modus === 'monat' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Monat</label>
              <select value={monat} onChange={e => setMonat(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                {MONATE.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Jahr</label>
              <select value={jahr} onChange={e => setJahr(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
        )}

        {modus === 'jahr' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Jahr</label>
            <select value={jahr} onChange={e => setJahr(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <option value="2026">2026</option>
            </select>
          </div>
        )}

        {modus === 'zeitraum' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Von</label>
              <input type="date" value={von} onChange={e => setVon(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bis</label>
              <input type="date" value={bis} onChange={e => setBis(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Arbeitstage pro Woche</label>
          <div className="grid grid-cols-7 gap-1">
            {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((lab, i) => (
              <button key={i} onClick={() => toggleTag(i)} className={`min-h-[44px] px-2 rounded-lg border text-xs font-medium ${tage.includes(i) ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600'}`}>
                {lab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Arbeitstage</p>
        <p className="text-5xl font-bold">{ergebnis.arbeitstage}</p>
        <p className="text-white/80 text-sm mt-2">
          davon {ergebnis.werktage} Werktage (Mo–Fr) · {ergebnis.feiertage} Feiertage abgezogen
        </p>
      </div>

      {ergebnis.feiertageListe.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Berücksichtigte Feiertage</h3>
          <ul className="text-sm space-y-1">
            {ergebnis.feiertageListe.map((f, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{f.name}</span>
                <span className="font-medium">{f.datum}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CrossLink href="/alltag/tagerechner" emoji="📅" text="Tage zwischen zwei Daten" />
      <CrossLink href="/arbeit/urlaubstage-rechner" emoji="🏖️" text="Urlaubstage-Rechner" />
      <CrossLink href="/arbeit/arbeitszeitrechner" emoji="⏱️" text="Arbeitszeitrechner" />

      <ErgebnisAktionen
        ergebnisText={`Arbeitstage: ${ergebnis.arbeitstage} (${ergebnis.feiertage} Feiertage)`}
        seitenTitel="Arbeitstage-Rechner"
      />

      <AiExplain
        rechnerName="Arbeitstage-Rechner"
        eingaben={{
          'Modus': modus,
          'Bundesland': BUNDESLAENDER.find(b => b.slug === bl)?.name || bl,
          'Zeitraum': modus === 'monat' ? `${MONATE[parseInt(monat) - 1]} ${jahr}` : modus === 'jahr' ? jahr : `${von} – ${bis}`,
        }}
        ergebnis={{
          'Arbeitstage': String(ergebnis.arbeitstage),
          'Werktage (Mo–Fr)': String(ergebnis.werktage),
          'Feiertage abgezogen': String(ergebnis.feiertage),
        }}
      />
    </div>
  );
}
