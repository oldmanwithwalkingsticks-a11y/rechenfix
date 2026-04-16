'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Groesse = 'klein' | 'mittel' | 'gross' | 'riese';

const GROESSE_LABEL: Record<Groesse, string> = {
  klein: 'Klein (< 10 kg)',
  mittel: 'Mittel (10–25 kg)',
  gross: 'Groß (25–45 kg)',
  riese: 'Riese (> 45 kg)',
};

// Faktor pro Jahr ab dem 3. Lebensjahr
const FAKTOR_AB_3: Record<Groesse, number> = {
  klein: 4,
  mittel: 5,
  gross: 6,
  riese: 7,
};

const RASSEN: { name: string; groesse: Groesse }[] = [
  { name: 'Chihuahua', groesse: 'klein' },
  { name: 'Dackel', groesse: 'klein' },
  { name: 'Yorkshire Terrier', groesse: 'klein' },
  { name: 'Mops', groesse: 'klein' },
  { name: 'Beagle', groesse: 'mittel' },
  { name: 'Border Collie', groesse: 'mittel' },
  { name: 'Cocker Spaniel', groesse: 'mittel' },
  { name: 'Französische Bulldogge', groesse: 'mittel' },
  { name: 'Labrador', groesse: 'gross' },
  { name: 'Golden Retriever', groesse: 'gross' },
  { name: 'Schäferhund', groesse: 'gross' },
  { name: 'Boxer', groesse: 'gross' },
  { name: 'Dogge', groesse: 'riese' },
  { name: 'Bernhardiner', groesse: 'riese' },
  { name: 'Neufundländer', groesse: 'riese' },
  { name: 'Mischling', groesse: 'mittel' },
];

function hundeJahreZuMensch(alter: number, groesse: Groesse): number {
  if (alter <= 0) return 0;
  // Jahr 1 = 15, Jahr 2 = +9 → 24
  if (alter <= 1) return alter * 15;
  if (alter <= 2) return 15 + (alter - 1) * 9;
  return 24 + (alter - 2) * FAKTOR_AB_3[groesse];
}

function lebensphase(alter: number, groesse: Groesse): string {
  const max = groesse === 'riese' ? 9 : groesse === 'gross' ? 11 : groesse === 'mittel' ? 13 : 15;
  if (alter < 1) return 'Welpe 🐶';
  if (alter < 2) return 'Junghund';
  if (alter < max * 0.5) return 'Erwachsen';
  if (alter < max * 0.8) return 'Reif';
  return 'Senior 🦴';
}

const fmt = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

export default function HundejahreRechner() {
  const [alter, setAlter] = useState('5');
  const [groesse, setGroesse] = useState<Groesse>('mittel');
  const [rasse, setRasse] = useState<string>('');

  const ergebnis = useMemo(() => {
    const a = Math.max(0, parseDeutscheZahl(alter) || 0);
    const menschJahre = hundeJahreZuMensch(a, groesse);
    const phase = lebensphase(a, groesse);

    // Lebenserwartung (grobe Orientierung)
    const leMap: Record<Groesse, number> = { klein: 15, mittel: 13, gross: 11, riese: 9 };
    const le = leMap[groesse];
    const verbleibend = Math.max(0, le - a);

    return { alter: a, menschJahre, phase, le, verbleibend };
  }, [alter, groesse]);

  const onRasseChange = (name: string) => {
    setRasse(name);
    const r = RASSEN.find(x => x.name === name);
    if (r) setGroesse(r.groesse);
  };

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Alter Ihres Hundes</label>
          <NummerEingabe value={alter} onChange={setAlter} einheit="Jahre" />
        </div>

        <div>
          <label htmlFor="hundejahre-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Rasse (optional)</label>
          <select id="hundejahre-select-1" value={rasse} onChange={e => onRasseChange(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <option value="">— bitte wählen —</option>
            {RASSEN.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Größe</label>
          <div className="grid grid-cols-2 gap-2">
            {(['klein', 'mittel', 'gross', 'riese'] as Groesse[]).map(g => (
              <button key={g} onClick={() => { setGroesse(g); setRasse(''); }} className={`min-h-[48px] px-3 rounded-xl border text-xs font-medium ${groesse === g ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                {GROESSE_LABEL[g]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">In Menschenjahren</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.menschJahre)}</p>
        <p className="text-white/80 text-sm mt-2">
          Lebensphase: <strong>{ergebnis.phase}</strong>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Übersicht</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Alter Hund</span><span className="font-medium">{fmt(ergebnis.alter)} Jahre</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Entspricht Mensch</span><span className="font-medium">{fmt(ergebnis.menschJahre)} Jahre</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Durchschnittliche Lebenserwartung</span><span className="font-medium">ca. {ergebnis.le} Jahre</span></div>
          {ergebnis.verbleibend > 0 && (
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Verbleibend (statistisch)</span><span className="font-medium">ca. {ergebnis.verbleibend} Jahre</span></div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Die Formel</h2>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
          <li>Jahr 1: + 15 Menschenjahre</li>
          <li>Jahr 2: + 9 Menschenjahre (→ 24)</li>
          <li>Ab Jahr 3: + 4 (klein) / 5 (mittel) / 6 (groß) / 7 (Riese) pro Jahr</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">Große Hunde altern schneller als kleine — deshalb ist der Faktor höher.</p>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Die 1:7-Formel ist überholt. Der tatsächliche Alterungsprozess hängt stark von Rasse, Größe und Pflege ab. Unser Rechner nutzt eine differenzierte Formel je nach Körpergröße.
      </p>

      <CrossLink href="/alltag/tagerechner" emoji="📅" text="Tage zwischen zwei Daten" />
      <CrossLink href="/alltag/geburtstag-rechner" emoji="🎂" text="Geburtstag-Rechner" />
      <CrossLink href="/alltag/lebenszeit-rechner" emoji="⏳" text="Lebenszeit-Rechner" />

      <ErgebnisAktionen
        ergebnisText={`Hundejahre: ${alter} Hundejahre entsprechen ${fmt(ergebnis.menschJahre)} Menschenjahren (${GROESSE_LABEL[groesse]})`}
        seitenTitel="Hundejahre-Rechner"
      />

      <AiExplain
        rechnerName="Hundejahre-Rechner"
        eingaben={{
          'Alter': `${alter} Jahre`,
          'Größe': GROESSE_LABEL[groesse],
          'Rasse': rasse || '—',
        }}
        ergebnis={{
          'Menschenjahre': fmt(ergebnis.menschJahre),
          'Lebensphase': ergebnis.phase,
          'Lebenserwartung': `ca. ${ergebnis.le} Jahre`,
        }}
      />
    </div>
  );
}
