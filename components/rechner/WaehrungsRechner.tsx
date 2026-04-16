'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

// Statische Referenzkurse (Basis EUR = 1). Stand: 14.04.2026
const KURS_DATUM = '14.04.2026';

const WAEHRUNGEN: { code: string; name: string; symbol: string; kurs: number }[] = [
  { code: 'EUR', name: 'Euro', symbol: '€', kurs: 1.0 },
  { code: 'USD', name: 'US-Dollar', symbol: '$', kurs: 1.08 },
  { code: 'GBP', name: 'Britisches Pfund', symbol: '£', kurs: 0.86 },
  { code: 'CHF', name: 'Schweizer Franken', symbol: 'Fr.', kurs: 0.95 },
  { code: 'JPY', name: 'Japanischer Yen', symbol: '¥', kurs: 163.0 },
  { code: 'PLN', name: 'Polnischer Zloty', symbol: 'zł', kurs: 4.28 },
  { code: 'CZK', name: 'Tschechische Krone', symbol: 'Kč', kurs: 25.10 },
  { code: 'TRY', name: 'Türkische Lira', symbol: '₺', kurs: 38.50 },
  { code: 'SEK', name: 'Schwedische Krone', symbol: 'kr', kurs: 11.25 },
  { code: 'NOK', name: 'Norwegische Krone', symbol: 'kr', kurs: 11.45 },
  { code: 'DKK', name: 'Dänische Krone', symbol: 'kr', kurs: 7.46 },
  { code: 'HUF', name: 'Ungarischer Forint', symbol: 'Ft', kurs: 395.0 },
  { code: 'RON', name: 'Rumänischer Leu', symbol: 'lei', kurs: 4.98 },
  { code: 'BGN', name: 'Bulgarischer Lew', symbol: 'лв', kurs: 1.96 },
  { code: 'AUD', name: 'Australischer Dollar', symbol: 'A$', kurs: 1.67 },
  { code: 'CAD', name: 'Kanadischer Dollar', symbol: 'C$', kurs: 1.48 },
  { code: 'NZD', name: 'Neuseeland-Dollar', symbol: 'NZ$', kurs: 1.82 },
  { code: 'CNY', name: 'Chinesischer Yuan', symbol: '¥', kurs: 7.85 },
  { code: 'INR', name: 'Indische Rupie', symbol: '₹', kurs: 90.50 },
  { code: 'BRL', name: 'Brasilianischer Real', symbol: 'R$', kurs: 5.95 },
  { code: 'THB', name: 'Thailändischer Baht', symbol: '฿', kurs: 39.20 },
  { code: 'KRW', name: 'Südkoreanischer Won', symbol: '₩', kurs: 1475.0 },
  { code: 'ZAR', name: 'Südafrikanischer Rand', symbol: 'R', kurs: 20.35 },
  { code: 'MXN', name: 'Mexikanischer Peso', symbol: '$', kurs: 19.85 },
  { code: 'SGD', name: 'Singapur-Dollar', symbol: 'S$', kurs: 1.46 },
  { code: 'HKD', name: 'Hongkong-Dollar', symbol: 'HK$', kurs: 8.45 },
  { code: 'ILS', name: 'Israelischer Schekel', symbol: '₪', kurs: 4.05 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', kurs: 3.97 },
  { code: 'RUB', name: 'Russischer Rubel', symbol: '₽', kurs: 100.0 },
];

function umrechnen(betrag: number, von: string, nach: string): number {
  const v = WAEHRUNGEN.find(w => w.code === von);
  const n = WAEHRUNGEN.find(w => w.code === nach);
  if (!v || !n) return 0;
  // Alle Kurse basieren auf EUR=1
  // betrag in Währung V → EUR = betrag / v.kurs
  // EUR → Währung N = × n.kurs
  return (betrag / v.kurs) * n.kurs;
}

const fmt = (n: number, d = 2) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function WaehrungsRechner() {
  const [betrag, setBetrag] = useState('100');
  const [von, setVon] = useState('EUR');
  const [nach, setNach] = useState('USD');

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(betrag) || 0;
    const umgerechnet = umrechnen(b, von, nach);
    const kurs1 = umrechnen(1, von, nach);
    const kurs2 = umrechnen(1, nach, von);
    const vonW = WAEHRUNGEN.find(w => w.code === von)!;
    const nachW = WAEHRUNGEN.find(w => w.code === nach)!;
    return { umgerechnet, kurs1, kurs2, vonW, nachW };
  }, [betrag, von, nach]);

  const tauschen = () => {
    const v = von;
    setVon(nach);
    setNach(v);
  };

  const schnellWaehrungen = ['USD', 'GBP', 'CHF', 'PLN', 'TRY'];

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Betrag</label>
          <NummerEingabe value={betrag} onChange={setBetrag} einheit={ergebnis.vonW.symbol} />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
          <div>
            <label htmlFor="waehrungs-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Von</label>
            <select id="waehrungs-select-1" value={von} onChange={e => setVon(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {WAEHRUNGEN.map(w => <option key={w.code} value={w.code}>{w.code} — {w.name}</option>)}
            </select>
          </div>
          <button onClick={tauschen} aria-label="Tauschen" className="min-h-[48px] min-w-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-lg">↔</button>
          <div>
            <label htmlFor="waehrungs-select-2" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nach</label>
            <select id="waehrungs-select-2" value={nach} onChange={e => setNach(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {WAEHRUNGEN.map(w => <option key={w.code} value={w.code}>{w.code} — {w.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">{betrag} {ergebnis.vonW.code} entsprechen</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.umgerechnet)} {ergebnis.nachW.code}</p>
        <p className="text-white/80 text-sm mt-3">
          1 {ergebnis.vonW.code} = {fmt(ergebnis.kurs1, 4)} {ergebnis.nachW.code}
        </p>
        <p className="text-white/80 text-sm">
          1 {ergebnis.nachW.code} = {fmt(ergebnis.kurs2, 4)} {ergebnis.vonW.code}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Schnellreferenz: 1 EUR entspricht</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
          {schnellWaehrungen.map(code => {
            const w = WAEHRUNGEN.find(x => x.code === code)!;
            return (
              <div key={code} className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <div className="text-xs text-gray-500">{code}</div>
                <div className="font-bold text-gray-800 dark:text-gray-200">{fmt(w.kurs, 2)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Kurse vom <strong>{KURS_DATUM}</strong> — statische Referenzkurse, <strong>keine Echtzeitkurse</strong>. Für aktuelle Kurse und Transaktionen nutzen Sie Ihre Bank oder einen Wechselkurs-Dienst.
      </p>

      <CrossLink href="/mathe/einheiten-umrechner" emoji="📐" text="Einheiten umrechnen" />
      <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozentrechner" />
      <CrossLink href="/finanzen/inflationsrechner" emoji="📈" text="Inflationsrechner" />

      <ErgebnisAktionen
        ergebnisText={`${betrag} ${ergebnis.vonW.code} = ${fmt(ergebnis.umgerechnet)} ${ergebnis.nachW.code} (Stand ${KURS_DATUM})`}
        seitenTitel="Währungsrechner"
      />

      <AiExplain
        rechnerName="Währungsrechner"
        eingaben={{
          'Betrag': `${betrag} ${ergebnis.vonW.code}`,
          'Von': `${ergebnis.vonW.code} (${ergebnis.vonW.name})`,
          'Nach': `${ergebnis.nachW.code} (${ergebnis.nachW.name})`,
        }}
        ergebnis={{
          'Ergebnis': `${fmt(ergebnis.umgerechnet)} ${ergebnis.nachW.code}`,
          'Wechselkurs': `1 ${ergebnis.vonW.code} = ${fmt(ergebnis.kurs1, 4)} ${ergebnis.nachW.code}`,
          'Stand': KURS_DATUM,
        }}
      />
    </div>
  );
}
