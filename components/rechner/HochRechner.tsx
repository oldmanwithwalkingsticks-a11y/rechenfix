'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Eingabe = 'stunde' | 'tag' | 'woche' | 'monat' | 'jahr';

const DEFAULTS: Record<Eingabe, string> = {
  stunde: '20',
  tag: '160',
  woche: '800',
  monat: '3500',
  jahr: '42000',
};

const LABEL: Record<Eingabe, string> = {
  stunde: 'Pro Stunde',
  tag: 'Pro Tag',
  woche: 'Pro Woche',
  monat: 'Pro Monat',
  jahr: 'Pro Jahr',
};

const MINDESTLOHN = 12.82;
const fmtEur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

export default function HochRechner() {
  const [eingabe, setEingabe] = useState<Eingabe>('stunde');
  const [betrag, setBetrag] = useState('20');
  const [stdWoche, setStdWoche] = useState('40');
  const [tageWoche, setTageWoche] = useState('5');

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(betrag) || 0;
    const sw = Math.max(1, parseDeutscheZahl(stdWoche) || 40);
    const tw = Math.max(1, parseDeutscheZahl(tageWoche) || 5);

    const stdJahr = sw * 52;
    const stdMonat = stdJahr / 12;
    const stdTag = sw / tw;
    const tageJahr = tw * 52;

    // Alles auf Jahresbrutto normalisieren
    let jahr = 0;
    if (eingabe === 'stunde') jahr = b * stdJahr;
    else if (eingabe === 'tag') jahr = b * tageJahr;
    else if (eingabe === 'woche') jahr = b * 52;
    else if (eingabe === 'monat') jahr = b * 12;
    else jahr = b;

    const monat = jahr / 12;
    const woche = jahr / 52;
    const tag = jahr / tageJahr;
    const stunde = jahr / stdJahr;

    const abweichung = MINDESTLOHN > 0 ? ((stunde - MINDESTLOHN) / MINDESTLOHN) * 100 : 0;

    return { jahr, monat, woche, tag, stunde, stdMonat, stdTag, abweichung };
  }, [eingabe, betrag, stdWoche, tageWoche]);

  const onSetEingabe = (e: Eingabe) => {
    setEingabe(e);
    setBetrag(DEFAULTS[e]);
  };

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ich kenne mein...</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(['stunde', 'tag', 'woche', 'monat', 'jahr'] as Eingabe[]).map(e => (
              <button key={e} onClick={() => onSetEingabe(e)} className={`min-h-[48px] px-2 rounded-xl border text-xs font-medium ${eingabe === e ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                {LABEL[e].replace('Pro ', '')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{LABEL[eingabe]}</label>
          <NummerEingabe value={betrag} onChange={setBetrag} einheit="€" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Stunden / Woche</label>
            <NummerEingabe value={stdWoche} onChange={setStdWoche} einheit="h" />
          </div>
          <div>
            <label htmlFor="hoch-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tage / Woche</label>
            <select id="hoch-select-1" value={tageWoche} onChange={e => setTageWoche(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <option value="4">4 Tage</option>
              <option value="5">5 Tage</option>
              <option value="6">6 Tage</option>
            </select>
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Jahresgehalt (brutto)</p>
        <p className="text-5xl font-bold">{fmtEur(ergebnis.jahr)}</p>
        <p className="text-white/80 text-sm mt-2">
          bei {stdWoche} h/Woche und {tageWoche} Tagen/Woche
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Alle Zeiträume (brutto)</h2>
        <div className="space-y-1.5 text-sm">
          {([
            ['stunde', 'Pro Stunde', ergebnis.stunde],
            ['tag', 'Pro Tag', ergebnis.tag],
            ['woche', 'Pro Woche', ergebnis.woche],
            ['monat', 'Pro Monat', ergebnis.monat],
            ['jahr', 'Pro Jahr', ergebnis.jahr],
          ] as [Eingabe, string, number][]).map(([key, label, val]) => (
            <div key={key} className={`flex justify-between ${eingabe === key ? 'font-bold text-primary-600 dark:text-primary-400' : ''}`}>
              <span className={eingabe === key ? '' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
              <span className={eingabe === key ? '' : 'font-medium'}>{fmtEur(val)}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Arbeitsstunden pro Monat: {ergebnis.stdMonat.toFixed(1)} h · pro Tag: {ergebnis.stdTag.toFixed(1)} h
        </p>
      </div>

      <div className={`border rounded-xl p-4 mb-4 text-sm ${ergebnis.stunde >= MINDESTLOHN ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'}`}>
        <strong>Mindestlohn 2026:</strong> 12,82 €/h — Ihr Stundenlohn von {fmtEur(ergebnis.stunde)} liegt{' '}
        <strong>{ergebnis.abweichung >= 0 ? `${ergebnis.abweichung.toFixed(0)} % darüber` : `${Math.abs(ergebnis.abweichung).toFixed(0)} % darunter`}</strong>.
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Netto berechnen" />
      <CrossLink href="/finanzen/stundenlohn-rechner" emoji="🧮" text="Stundenlohn-Rechner" />
      <CrossLink href="/finanzen/gehaltsvergleich" emoji="📊" text="Gehaltsvergleich" />

      <ErgebnisAktionen
        ergebnisText={`${fmtEur(ergebnis.stunde)} / h · ${fmtEur(ergebnis.monat)} / Monat · ${fmtEur(ergebnis.jahr)} / Jahr`}
        seitenTitel="Hochrechner (Gehalt)"
      />

      <AiExplain
        rechnerName="Hochrechner (Gehalt)"
        eingaben={{
          'Eingabe': `${LABEL[eingabe]}: ${betrag} €`,
          'Stunden/Woche': `${stdWoche} h`,
          'Tage/Woche': `${tageWoche}`,
        }}
        ergebnis={{
          'Stunde': fmtEur(ergebnis.stunde),
          'Monat': fmtEur(ergebnis.monat),
          'Jahr': fmtEur(ergebnis.jahr),
        }}
      />
    </div>
  );
}
