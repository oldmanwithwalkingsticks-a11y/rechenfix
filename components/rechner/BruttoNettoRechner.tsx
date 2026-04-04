'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto, BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

export default function BruttoNettoRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState(0);
  const [bundesland, setBundesland] = useState('NW');
  const [kvArt, setKvArt] = useState<'gesetzlich' | 'privat'>('gesetzlich');
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState('1.7');
  const [kvPrivatBeitrag, setKvPrivatBeitrag] = useState('');
  const [rvBefreit, setRvBefreit] = useState(false);
  const [abrechnungszeitraum, setAbrechnungszeitraum] = useState<'monat' | 'jahr'>('monat');

  const bruttoNum = parseDeutscheZahl(brutto);
  const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
  const kstSatz = bl?.kirchensteuersatz ?? 9;

  const ergebnis = useMemo(() => berechneBruttoNetto({
    bruttoMonat: bruttoNum,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: kstSatz,
    kinderfreibetraege: kinder,
    bundesland,
    kvArt,
    kvZusatzbeitrag: parseDeutscheZahl(kvZusatzbeitrag),
    kvPrivatBeitrag: parseDeutscheZahl(kvPrivatBeitrag),
    rvBefreit,
    abrechnungszeitraum,
  }), [bruttoNum, steuerklasse, kirchensteuer, kstSatz, kinder, bundesland, kvArt, kvZusatzbeitrag, kvPrivatBeitrag, rvBefreit, abrechnungszeitraum]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n: number) => ergebnis.bruttoMonat > 0 ? ((n / ergebnis.bruttoMonat) * 100).toFixed(1) : '0.0';

  return (
    <div>
      {/* Abrechnungszeitraum */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAbrechnungszeitraum('monat')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            abrechnungszeitraum === 'monat'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Monatsgehalt
        </button>
        <button
          onClick={() => setAbrechnungszeitraum('jahr')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            abrechnungszeitraum === 'jahr'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Jahresgehalt
        </button>
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bruttogehalt ({abrechnungszeitraum === 'monat' ? 'monatlich' : 'jährlich'})
          </label>
          <NummerEingabe value={brutto} onChange={setBrutto} placeholder={abrechnungszeitraum === 'monat' ? 'z.B. 3500' : 'z.B. 42000'} einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select value={steuerklasse} onChange={e => setSteuerklasse(Number(e.target.value) as 1|2|3|4|5|6)} className="input-field">
            <option value={1}>Steuerklasse 1 — Ledig</option>
            <option value={2}>Steuerklasse 2 — Alleinerziehend</option>
            <option value={3}>Steuerklasse 3 — Verheiratet (mehr)</option>
            <option value={4}>Steuerklasse 4 — Verheiratet (gleich)</option>
            <option value={5}>Steuerklasse 5 — Verheiratet (weniger)</option>
            <option value={6}>Steuerklasse 6 — Zweitjob</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select value={bundesland} onChange={e => setBundesland(e.target.value)} className="input-field">
            {BUNDESLAENDER.map(bl => (
              <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder (Freibeträge)</label>
          <select value={kinder} onChange={e => setKinder(Number(e.target.value))} className="input-field">
            <option value={0}>Keine Kinder</option>
            <option value={0.5}>0,5</option>
            <option value={1}>1</option>
            <option value={1.5}>1,5</option>
            <option value={2}>2</option>
            <option value={2.5}>2,5</option>
            <option value={3}>3+</option>
          </select>
        </div>
      </div>

      {/* Erweiterte Optionen */}
      <details className="mb-6 group">
        <summary className="cursor-pointer text-sm font-medium text-primary-500 dark:text-primary-400 hover:text-primary-600 transition-colors list-none flex items-center gap-2">
          <svg className="w-4 h-4 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Erweiterte Optionen (KV, RV, Kirchensteuer)
        </summary>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          {/* Kirchensteuer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={kirchensteuer} onChange={e => setKirchensteuer(e.target.checked)} className="w-5 h-5 rounded text-primary-500 focus:ring-primary-200" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Ja ({kstSatz}% in {bl?.name})</span>
              </label>
            </div>
          </div>

          {/* KV Art */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Krankenversicherung</label>
            <div className="flex gap-2">
              <button
                onClick={() => setKvArt('gesetzlich')}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  kvArt === 'gesetzlich' ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Gesetzlich
              </button>
              <button
                onClick={() => setKvArt('privat')}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  kvArt === 'privat' ? 'bg-accent-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Privat
              </button>
            </div>
          </div>

          {/* KV Zusatzbeitrag / Privat-Beitrag */}
          {kvArt === 'gesetzlich' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">KV-Zusatzbeitrag (Arbeitnehmeranteil)</label>
              <NummerEingabe value={kvZusatzbeitrag} onChange={setKvZusatzbeitrag} placeholder="z.B. 1,7" einheit="%" />
              <p className="text-xs text-gray-400 mt-1">Durchschnitt 2025: 1,7%</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatlicher PKV-Beitrag (AN-Anteil)</label>
              <NummerEingabe value={kvPrivatBeitrag} onChange={setKvPrivatBeitrag} placeholder="z.B. 350" einheit="€" />
            </div>
          )}

          {/* RV Befreiung */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentenversicherung</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rvBefreit} onChange={e => setRvBefreit(e.target.checked)} className="w-5 h-5 rounded text-primary-500 focus:ring-primary-200" />
              <span className="text-sm text-gray-700 dark:text-gray-300">RV-befreit (z. B. Beamte)</span>
            </label>
          </div>
        </div>
      </details>

      {/* Ergebnis */}
      {bruttoNum > 0 && (
        <>
          <div className="result-box mb-4">
            <p className="text-white/80 text-sm mb-1">Dein Nettogehalt (monatlich)</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.nettoMonat)} &euro;</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm mt-2">
              <span>{fmt(ergebnis.nettoJahr)} € / Jahr</span>
              <span>|</span>
              <span>~{fmt(ergebnis.nettoProStunde)} € / Stunde</span>
              <span>|</span>
              <span>{ergebnis.abzuegeProzent}% Abzüge</span>
            </div>
          </div>

          {/* Prozentbalken */}
          <div className="mb-6">
            <div className="flex rounded-xl overflow-hidden h-8 text-xs font-medium">
              <div
                className="bg-green-500 flex items-center justify-center text-white transition-all"
                style={{ width: `${100 - ergebnis.abzuegeProzent}%` }}
              >
                {(100 - ergebnis.abzuegeProzent).toFixed(1)}% Netto
              </div>
              <div
                className="bg-red-400 flex items-center justify-center text-white transition-all"
                style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.steuernGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}
              >
                Steuern
              </div>
              <div
                className="bg-amber-400 flex items-center justify-center text-white transition-all"
                style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.sozialabgabenGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}
              >
                Sozial
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500 inline-block" /> Netto</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400 inline-block" /> Steuern</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-400 inline-block" /> Sozialabgaben</span>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung (monatlich)</h3>
            <table className="w-full text-sm">
              <tbody>
                <Zeile label="Bruttogehalt" wert={ergebnis.bruttoMonat} hervorgehoben />

                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Steuern</td></tr>
                <Zeile label="Lohnsteuer" wert={-ergebnis.lohnsteuer} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Solidaritätszuschlag" wert={-ergebnis.solidaritaet} brutto={ergebnis.bruttoMonat} />
                {kirchensteuer && <Zeile label={`Kirchensteuer (${kstSatz}%)`} wert={-ergebnis.kirchensteuer} brutto={ergebnis.bruttoMonat} />}

                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Sozialabgaben</td></tr>
                <Zeile label={kvArt === 'privat' ? 'Private KV (AN-Anteil)' : 'Krankenversicherung'} wert={-ergebnis.krankenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Rentenversicherung" wert={-ergebnis.rentenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Arbeitslosenversicherung" wert={-ergebnis.arbeitslosenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Pflegeversicherung" wert={-ergebnis.pflegeversicherung} brutto={ergebnis.bruttoMonat} />

                <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
                  <td className="py-2">Nettogehalt</td>
                  <td className="py-2 text-right">{fmt(ergebnis.nettoMonat)} &euro;</td>
                  <td className="py-2 text-right text-xs">{pct(ergebnis.nettoMonat)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Hinweis */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            * Vereinfachte Berechnung zur Orientierung. Abweichungen von der tatsächlichen Abrechnung möglich. Für eine exakte Berechnung wenden Sie sich an Ihren Steuerberater oder nutzen Sie ELSTER.
          </p>
        </>
      )}
    </div>
  );
}

function Zeile({ label, wert, hervorgehoben = false, brutto }: { label: string; wert: number; hervorgehoben?: boolean; brutto?: number }) {
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const prozent = brutto && brutto > 0 ? ((Math.abs(wert) / brutto) * 100).toFixed(1) : null;
  return (
    <tr className={hervorgehoben ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}>
      <td className="py-1.5">{label}</td>
      <td className={`py-1.5 text-right ${wert < 0 ? 'text-red-500 dark:text-red-400' : ''}`}>
        {wert < 0 ? `−${fmt(Math.abs(wert))}` : fmt(wert)} &euro;
      </td>
      <td className="py-1.5 text-right text-xs text-gray-400 dark:text-gray-500 w-16">
        {prozent ? `${prozent}%` : ''}
      </td>
    </tr>
  );
}
