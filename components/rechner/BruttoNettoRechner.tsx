'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

export default function BruttoNettoRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kirchensteuersatz, setKirchensteuersatz] = useState<8 | 9>(9);
  const [kinder, setKinder] = useState(0);

  const bruttoNum = parseDeutscheZahl(brutto);

  const ergebnis = useMemo(() => berechneBruttoNetto({
    bruttoMonat: bruttoNum,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz,
    kinderfreibetraege: kinder,
    bundesland: 'NRW',
  }), [bruttoNum, steuerklasse, kirchensteuer, kirchensteuersatz, kinder]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bruttogehalt (monatlich)</label>
          <NummerEingabe
            value={brutto}
            onChange={setBrutto}
            placeholder="z.B. 3500"
            einheit="€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select
            value={steuerklasse}
            onChange={e => setSteuerklasse(Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
            className="input-field"
          >
            <option value={1}>Steuerklasse 1 — Ledig</option>
            <option value={2}>Steuerklasse 2 — Alleinerziehend</option>
            <option value={3}>Steuerklasse 3 — Verheiratet (mehr)</option>
            <option value={4}>Steuerklasse 4 — Verheiratet (gleich)</option>
            <option value={5}>Steuerklasse 5 — Verheiratet (weniger)</option>
            <option value={6}>Steuerklasse 6 — Zweitjob</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder (Freibeträge)</label>
          <select
            value={kinder}
            onChange={e => setKinder(Number(e.target.value))}
            className="input-field"
          >
            <option value={0}>Keine Kinder</option>
            <option value={0.5}>0,5</option>
            <option value={1}>1</option>
            <option value={1.5}>1,5</option>
            <option value={2}>2</option>
            <option value={2.5}>2,5</option>
            <option value={3}>3+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={kirchensteuer}
                onChange={e => setKirchensteuer(e.target.checked)}
                className="w-5 h-5 rounded text-primary-500 focus:ring-primary-200"
              />
              <span className="text-gray-700 dark:text-gray-300">Ja</span>
            </label>
            {kirchensteuer && (
              <select
                value={kirchensteuersatz}
                onChange={e => setKirchensteuersatz(Number(e.target.value) as 8 | 9)}
                className="input-field !py-2 !text-sm w-auto"
              >
                <option value={9}>9% (z.B. NRW, Bayern)</option>
                <option value={8}>8% (z.B. Baden-Württemberg)</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {bruttoNum > 0 && (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Dein Nettogehalt (monatlich)</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.nettoMonat)} &euro;</p>
            <p className="text-white/70 text-sm mt-2">
              {fmt(ergebnis.nettoJahr)} &euro; / Jahr &nbsp;|&nbsp; Abzüge: {fmt(ergebnis.gesamtAbzuege)} &euro; / Monat
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung (monatlich)</h3>
            <table className="w-full text-sm">
              <tbody>
                <Zeile label="Bruttogehalt" wert={ergebnis.bruttoMonat} hervorgehoben />
                <Zeile label="Lohnsteuer" wert={-ergebnis.lohnsteuer} />
                <Zeile label="Solidaritätszuschlag" wert={-ergebnis.solidaritaet} />
                {kirchensteuer && <Zeile label="Kirchensteuer" wert={-ergebnis.kirchensteuer} />}
                <Zeile label="Krankenversicherung" wert={-ergebnis.krankenversicherung} />
                <Zeile label="Rentenversicherung" wert={-ergebnis.rentenversicherung} />
                <Zeile label="Arbeitslosenversicherung" wert={-ergebnis.arbeitslosenversicherung} />
                <Zeile label="Pflegeversicherung" wert={-ergebnis.pflegeversicherung} />
                <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
                  <td className="py-2">Nettogehalt</td>
                  <td className="py-2 text-right">{fmt(ergebnis.nettoMonat)} &euro;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Zeile({ label, wert, hervorgehoben = false }: { label: string; wert: number; hervorgehoben?: boolean }) {
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <tr className={hervorgehoben ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}>
      <td className="py-1.5">{label}</td>
      <td className={`py-1.5 text-right ${wert < 0 ? 'text-red-500 dark:text-red-400' : ''}`}>
        {wert < 0 ? `−${fmt(Math.abs(wert))}` : fmt(wert)} &euro;
      </td>
    </tr>
  );
}
