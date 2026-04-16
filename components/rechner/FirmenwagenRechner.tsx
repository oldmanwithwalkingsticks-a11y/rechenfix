'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Antrieb = 'verbrenner' | 'hybrid' | 'eAutoUnter70' | 'eAutoUeber70';
type Methode = 'pauschal' | 'einzel';

const SATZ: Record<Antrieb, number> = {
  verbrenner: 0.01,
  hybrid: 0.005,
  eAutoUnter70: 0.0025,
  eAutoUeber70: 0.005,
};

const FAKTOR: Record<Antrieb, number> = {
  verbrenner: 1.0,
  hybrid: 0.5,
  eAutoUnter70: 0.25,
  eAutoUeber70: 0.5,
};

export default function FirmenwagenRechner() {
  const [blp, setBlp] = useState('45000');
  const [antrieb, setAntrieb] = useState<Antrieb>('verbrenner');
  const [km, setKm] = useState('20');
  const [fahrten, setFahrten] = useState('20');
  const [methode, setMethode] = useState<Methode>('pauschal');
  const [zuzahlung, setZuzahlung] = useState('0');
  const [grenzsteuersatz, setGrenzsteuersatz] = useState('35');

  const ergebnis = useMemo(() => {
    const bruttoListenpreis = parseDeutscheZahl(blp) || 0;
    const entfernung = parseDeutscheZahl(km) || 0;
    const fahrtenProMonat = parseDeutscheZahl(fahrten) || 0;
    const zuz = parseDeutscheZahl(zuzahlung) || 0;
    const gSatz = (parseDeutscheZahl(grenzsteuersatz) || 0) / 100;

    const berechneFuer = (a: Antrieb) => {
      const privat = bruttoListenpreis * SATZ[a];
      const arbeitsweg = methode === 'pauschal'
        ? bruttoListenpreis * 0.0003 * entfernung * FAKTOR[a]
        : bruttoListenpreis * 0.00002 * entfernung * fahrtenProMonat * FAKTOR[a];
      const gwv = Math.max(0, privat + arbeitsweg - zuz);
      const steuerMonat = gwv * gSatz;
      return { privat, arbeitsweg, gwv, steuerMonat };
    };

    const aktuell = berechneFuer(antrieb);
    const verbrenner = berechneFuer('verbrenner');
    const hybrid = berechneFuer('hybrid');
    const eAuto = berechneFuer(bruttoListenpreis <= 70000 ? 'eAutoUnter70' : 'eAutoUeber70');

    const ersparnisEAuto = verbrenner.steuerMonat - eAuto.steuerMonat;

    return { aktuell, verbrenner, hybrid, eAuto, ersparnisEAuto };
  }, [blp, antrieb, km, fahrten, methode, zuzahlung, grenzsteuersatz]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* 1: BLP */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bruttolistenpreis
        </h2>
        <NummerEingabe value={blp} onChange={setBlp} placeholder="45000" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inkl. Sonderausstattung und Umsatzsteuer.</p>
      </div>

      {/* 2: Antrieb */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Antriebsart
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {([
            ['verbrenner', 'Verbrenner', '1 %'],
            ['hybrid', 'Plug-in-Hybrid', '0,5 %'],
            ['eAutoUnter70', 'E-Auto ≤ 70.000 €', '0,25 %'],
            ['eAutoUeber70', 'E-Auto > 70.000 €', '0,5 %'],
          ] as const).map(([val, label, sub]) => (
            <button
              key={val}
              onClick={() => setAntrieb(val)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${antrieb === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              <div className="font-semibold">{label}</div>
              <div className={`text-xs mt-0.5 ${antrieb === val ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3: km */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Entfernung Wohnung–Arbeit
        </h2>
        <NummerEingabe value={km} onChange={setKm} placeholder="20" einheit="km (einfache Strecke)" />
      </div>

      {/* 4: Methode */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Berechnungsmethode Arbeitsweg
        </h2>
        <div className="flex gap-2">
          {([
            ['pauschal', 'Pauschal (0,03 %)'],
            ['einzel', 'Einzelbewertung (0,002 %)'],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setMethode(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${methode === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Einzelbewertung lohnt sich bei weniger als 15 Fahrten/Monat.</p>
      </div>

      {methode === 'einzel' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
            Fahrten pro Monat
          </h2>
          <NummerEingabe value={fahrten} onChange={setFahrten} placeholder="20" einheit="Fahrten" />
        </div>
      )}

      {/* Zuzahlung */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">{methode === 'einzel' ? '6' : '5'}</span>
          Eigene Zuzahlung pro Monat
        </h2>
        <NummerEingabe value={zuzahlung} onChange={setZuzahlung} placeholder="0" einheit="€" />
      </div>

      {/* Grenzsteuersatz */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">{methode === 'einzel' ? '7' : '6'}</span>
          Persönlicher Grenzsteuersatz
        </h2>
        <div className="flex flex-wrap gap-2">
          {['30', '35', '42', '45'].map(s => (
            <button
              key={s}
              onClick={() => setGrenzsteuersatz(s)}
              className={`min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${grenzsteuersatz === s ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {s} %
            </button>
          ))}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Geldwerter Vorteil pro Monat</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.aktuell.gwv)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Steuerbelastung: <strong>{fmtEuro(ergebnis.aktuell.steuerMonat)} €/Monat</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Privatnutzung</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.aktuell.privat)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ Arbeitsweg</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.aktuell.arbeitsweg)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Zuzahlung</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(parseDeutscheZahl(zuzahlung) || 0)} €</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Geldwerter Vorteil</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.aktuell.gwv)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">× Grenzsteuersatz {grenzsteuersatz} %</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-400">{fmtEuro(ergebnis.aktuell.steuerMonat)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: Verbrenner vs. Hybrid vs. E-Auto</h2>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
          <div className={`p-4 ${antrieb === 'verbrenner' ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Verbrenner</div>
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(ergebnis.verbrenner.gwv)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Steuer: {fmtEuro(ergebnis.verbrenner.steuerMonat)} €</div>
          </div>
          <div className={`p-4 ${antrieb === 'hybrid' ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Hybrid</div>
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(ergebnis.hybrid.gwv)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Steuer: {fmtEuro(ergebnis.hybrid.steuerMonat)} €</div>
          </div>
          <div className={`p-4 ${antrieb.startsWith('eAuto') ? 'bg-green-50 dark:bg-green-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">E-Auto</div>
            <div className="text-xl font-bold text-green-700 dark:text-green-300 mt-1">{fmtEuro(ergebnis.eAuto.gwv)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Steuer: {fmtEuro(ergebnis.eAuto.steuerMonat)} €</div>
          </div>
        </div>
        {ergebnis.ersparnisEAuto > 0 && (
          <div className="px-4 py-3 bg-green-50 dark:bg-green-500/10 border-t border-gray-100 dark:border-gray-700 text-sm text-green-800 dark:text-green-300">
            <strong>💡 E-Auto-Vorteil:</strong> Mit einem E-Auto sparen Sie ca. {fmtEuro(ergebnis.ersparnisEAuto)} €/Monat an Steuern.
          </div>
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>Hinweis:</strong> Der geldwerte Vorteil wird zum Bruttogehalt addiert und erhöht die Lohnsteuer. Alternativ kann ein Fahrtenbuch geführt werden.
        </p>
      </div>

      <CrossLink href="/finanzen/autokosten-rechner" emoji="🚗" text="Gesamte Autokosten berechnen" />
      <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="💼" text="GF-Gehalt mit Firmenwagen" />
      <CrossLink href="/finanzen/gehaltserhoehung-rechner" emoji="📈" text="Firmenwagen vs. Gehaltserhöhung" />

      <ErgebnisAktionen
        ergebnisText={`Firmenwagen (${antrieb}): GWV ${fmtEuro(ergebnis.aktuell.gwv)} €/Monat | Steuer ${fmtEuro(ergebnis.aktuell.steuerMonat)} €/Monat | E-Auto-Ersparnis ${fmtEuro(ergebnis.ersparnisEAuto)} €`}
        seitenTitel="Firmenwagenrechner"
      />

      <AffiliateBox programId="wiso" context="firmenwagen" />

      <AiExplain
        rechnerName="Firmenwagenrechner"
        eingaben={{
          blp: `${blp} €`,
          antrieb,
          km: `${km} km`,
          methode,
          zuzahlung: `${zuzahlung} €`,
          grenzsteuersatz: `${grenzsteuersatz} %`,
        }}
        ergebnis={{
          gwv: `${fmtEuro(ergebnis.aktuell.gwv)} €`,
          steuerMonat: `${fmtEuro(ergebnis.aktuell.steuerMonat)} €`,
          ersparnisEAuto: `${fmtEuro(ergebnis.ersparnisEAuto)} €`,
        }}
      />
    </div>
  );
}
