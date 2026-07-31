'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import {
  ALTWAEHRUNGEN,
  getAltwaehrung,
  inEuro,
  vonEuro,
  zwischenAltwaehrungen,
} from '@/lib/dm-euro';

// Auswahlliste: Euro plus alle unwiderruflich festgelegten Altwährungen.
const OPTIONEN: { code: string; name: string }[] = [
  { code: 'EUR', name: 'Euro' },
  ...ALTWAEHRUNGEN.map((w) => ({ code: w.code, name: w.name })),
];

const nameVon = (code: string): string =>
  OPTIONEN.find((o) => o.code === code)?.name ?? code;

const fmt = (n: number, d = 2) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

// Schnellreferenz: typische D-Mark-Beträge in Euro.
const SCHNELL_DM = [1, 5, 10, 20, 50, 100];

export default function DmEuroRechner() {
  const [betrag, setBetrag] = useState('100');
  const [von, setVon] = useState('DEM');
  const [nach, setNach] = useState('EUR');

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(betrag) || 0;
    let res;
    if (von === nach) {
      res = { betrag: Math.round(b * 100) / 100, kursAnzeige: '1:1' };
    } else if (von === 'EUR') {
      res = vonEuro(b, nach);
    } else if (nach === 'EUR') {
      res = inEuro(b, von);
    } else {
      res = zwischenAltwaehrungen(b, von, nach);
    }
    return res ?? { betrag: 0, kursAnzeige: '—' };
  }, [betrag, von, nach]);

  // Amtliche Kurszeile für die Ergebnis-Box (immer als „1 € = kurs Landeswährung").
  const kursZeilen = useMemo(() => {
    const zeilen: string[] = [];
    for (const code of [von, nach]) {
      const w = getAltwaehrung(code);
      if (w) zeilen.push(`1 € = ${w.anzeige} ${w.code}`);
    }
    return zeilen;
  }, [von, nach]);

  const tauschen = () => {
    const v = von;
    setVon(nach);
    setNach(v);
  };

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Betrag</label>
          <NummerEingabe value={betrag} onChange={setBetrag} einheit={von} />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
          <div>
            <label htmlFor="dm-euro-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Von</label>
            <select id="dm-euro-select-1" value={von} onChange={(e) => setVon(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {OPTIONEN.map((o) => <option key={o.code} value={o.code}>{o.code} — {o.name}</option>)}
            </select>
          </div>
          <button onClick={tauschen} aria-label="Von und Nach tauschen" className="min-h-[48px] min-w-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-lg">↔</button>
          <div>
            <label htmlFor="dm-euro-select-2" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nach</label>
            <select id="dm-euro-select-2" value={nach} onChange={(e) => setNach(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {OPTIONEN.map((o) => <option key={o.code} value={o.code}>{o.code} — {o.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="result-box mb-4">
        <p className="text-white/80 text-sm mb-1">{betrag} {von} entsprechen</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.betrag)} {nach}</p>
        {kursZeilen.map((z) => (
          <p key={z} className="text-white/80 text-sm mt-2">{z}</p>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 text-sm text-blue-900 dark:text-blue-200">
        Dieser Kurs ist per EU-Verordnung unwiderruflich festgelegt und ändert sich nicht. Er gilt auch heute noch für den Umtausch bei den nationalen Zentralbanken.
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Schnellreferenz: D-Mark in Euro</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-sm">
          {SCHNELL_DM.map((dm) => {
            const e = inEuro(dm, 'DEM');
            return (
              <div key={dm} className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <div className="text-xs text-gray-500">{dm} DM</div>
                <div className="font-bold text-gray-800 dark:text-gray-200">{e ? fmt(e.betrag) : '—'} €</div>
              </div>
            );
          })}
        </div>
      </div>

      <CrossLink href="/alltag/waehrungsrechner" emoji="💱" text="Währungsrechner (aktuelle Kurse)" />
      <CrossLink href="/finanzen/inflationsrechner" emoji="📈" text="Inflationsrechner" />
      <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozentrechner" />

      <ErgebnisAktionen
        ergebnisText={`${betrag} ${von} = ${fmt(ergebnis.betrag)} ${nach} (amtlicher Umrechnungskurs)`}
        seitenTitel="DM-Euro-Rechner"
      />

      <AiExplain
        rechnerName="DM-Euro-Rechner"
        eingaben={{
          Betrag: `${betrag} ${von}`,
          Von: `${von} (${nameVon(von)})`,
          Nach: `${nach} (${nameVon(nach)})`,
        }}
        ergebnis={{
          Ergebnis: `${fmt(ergebnis.betrag)} ${nach}`,
          Kurs: kursZeilen.join(' · ') || '1:1',
          Grundlage: 'amtlich, VO (EG) 2866/98',
        }}
      />
    </div>
  );
}
