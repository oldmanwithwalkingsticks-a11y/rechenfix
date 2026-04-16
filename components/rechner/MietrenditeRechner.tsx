'use client';

import { useState, useMemo } from 'react';
import {
  berechneMietrendite,
  MIETAUSFALL_OPTIONEN,
  type FinanzierungsModus,
  type MietausfallRisiko,
} from '@/lib/berechnungen/mietrendite';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function MietrenditeRechner() {
  const [kaufpreis, setKaufpreis] = useState('250000');
  const [kaufnebenkostenProzent, setKaufnebenkostenProzent] = useState('10');
  const [monatlicheKaltmiete, setMonatlicheKaltmiete] = useState('800');
  const [nichtUmlagefaehigeNK, setNichtUmlagefaehigeNK] = useState('150');
  const [instandhaltung, setInstandhaltung] = useState('1500');
  const [mietausfallRisiko, setMietausfallRisiko] = useState<MietausfallRisiko>(5);
  const [finanzierung, setFinanzierung] = useState<FinanzierungsModus>('kredit');
  const [eigenkapital, setEigenkapital] = useState('50000');
  const [zinssatz, setZinssatz] = useState('3,5');
  const [tilgungStr, setTilgungStr] = useState('2');

  const nKaufpreis = parseDeutscheZahl(kaufpreis);
  const nKaufnebenkostenProzent = parseDeutscheZahl(kaufnebenkostenProzent);
  const nMonatlicheKaltmiete = parseDeutscheZahl(monatlicheKaltmiete);
  const nNichtUmlagefaehigeNK = parseDeutscheZahl(nichtUmlagefaehigeNK);
  const nInstandhaltung = parseDeutscheZahl(instandhaltung);
  const nEigenkapital = parseDeutscheZahl(eigenkapital);
  const nZinssatz = parseDeutscheZahl(zinssatz);
  const nTilgung = parseDeutscheZahl(tilgungStr);

  const ergebnis = useMemo(
    () => berechneMietrendite({
      kaufpreis: nKaufpreis,
      kaufnebenkostenProzent: nKaufnebenkostenProzent,
      monatlicheKaltmiete: nMonatlicheKaltmiete,
      nichtUmlagefaehigeNK: nNichtUmlagefaehigeNK,
      instandhaltung: nInstandhaltung,
      mietausfallRisiko,
      finanzierung,
      eigenkapital: nEigenkapital,
      zinssatz: nZinssatz,
      tilgung: nTilgung,
    }),
    [nKaufpreis, nKaufnebenkostenProzent, nMonatlicheKaltmiete, nNichtUmlagefaehigeNK, nInstandhaltung, mietausfallRisiko, finanzierung, nEigenkapital, nZinssatz, nTilgung],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function bewertungFarbe(b: 'gut' | 'durchschnittlich' | 'gering' | 'hoch') {
    if (b === 'gut') return 'text-green-600 dark:text-green-400';
    if (b === 'durchschnittlich') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  }

  function bewertungBg(b: 'gut' | 'durchschnittlich' | 'gering' | 'hoch') {
    if (b === 'gut') return 'bg-green-100 dark:bg-green-500/20';
    if (b === 'durchschnittlich') return 'bg-yellow-100 dark:bg-yellow-500/20';
    return 'bg-red-100 dark:bg-red-500/20';
  }

  function bewertungLabel(b: 'gut' | 'durchschnittlich' | 'gering' | 'hoch') {
    if (b === 'gut') return 'Gut';
    if (b === 'durchschnittlich') return 'Durchschnittlich';
    if (b === 'gering') return 'Gering';
    return 'Hoch';
  }

  return (
    <div>
      {/* Kaufpreis */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufpreis der Immobilie</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={kaufpreis} onChange={setKaufpreis} placeholder="z.B. 250.000" einheit="€" />
        </div>
      </div>

      {/* Kaufnebenkosten */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufnebenkosten</label>
        <div className="w-full sm:w-1/3">
          <NummerEingabe value={kaufnebenkostenProzent} onChange={setKaufnebenkostenProzent} placeholder="z.B. 10" einheit="%" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Typisch: 8–15% je nach Bundesland (Grunderwerbsteuer + Notar + Makler)</p>
        <CrossLink href="/wohnen/grunderwerbsteuer-rechner" emoji="📋" text="Grunderwerbsteuer genau berechnen" />
      </div>

      {/* Monatliche Kaltmiete */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Kaltmiete</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={monatlicheKaltmiete} onChange={setMonatlicheKaltmiete} placeholder="z.B. 800" einheit="€" />
        </div>
      </div>

      {/* Nicht umlagefähige NK */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nicht umlagefähige Nebenkosten</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={nichtUmlagefaehigeNK} onChange={setNichtUmlagefaehigeNK} placeholder="z.B. 150" einheit="€/Monat" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Verwaltung, Instandhaltungsrücklage, anteilige Reparaturen</p>
      </div>

      {/* Instandhaltung */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jährliche Instandhaltungsrücklage</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={instandhaltung} onChange={setInstandhaltung} placeholder="z.B. 1500" einheit="€/Jahr" />
        </div>
      </div>

      {/* Mietausfall-Risiko */}
      <div className="mb-4">
        <label htmlFor="mietrendite-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mietausfall-Risiko</label>
        <select id="mietrendite-select-1"
          value={mietausfallRisiko}
          onChange={ev => setMietausfallRisiko(Number(ev.target.value) as MietausfallRisiko)}
          className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
        >
          {MIETAUSFALL_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Finanzierung */}
      <div className="mb-4">
        <div className="mb-3">
          <RadioToggleGroup
            name="mietrendite-finanzierung"
            legend="Finanzierung"
            options={[
              { value: 'eigenkapital', label: 'Komplett Eigenkapital' },
              { value: 'kredit', label: 'Mit Kredit' },
            ]}
            value={finanzierung}
            onChange={(v) => setFinanzierung(v as FinanzierungsModus)}
          />
        </div>

        {finanzierung === 'kredit' && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenkapital</label>
              <div className="w-full sm:w-1/2">
                <NummerEingabe value={eigenkapital} onChange={setEigenkapital} placeholder="z.B. 50.000" einheit="€" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zinssatz</label>
                <NummerEingabe value={zinssatz} onChange={setZinssatz} placeholder="z.B. 3,5" einheit="%" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tilgung</label>
                <NummerEingabe value={tilgungStr} onChange={setTilgungStr} placeholder="z.B. 2" einheit="%" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-white/80 text-sm mb-1">Nettomietrendite</p>
                <p className="text-5xl font-bold">{fmtProzent(ergebnis.nettomietrendite)} %</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Brutto: {fmtProzent(ergebnis.bruttomietrendite)} %
                </span>
                {ergebnis.eigenkapitalrendite !== null && (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      EK-Rendite: {fmtProzent(ergebnis.eigenkapitalrendite)} %
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kennzahlen-Übersicht */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className={`rounded-xl p-4 ${bewertungBg(ergebnis.bruttoRenditeBewertung)}`}>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bruttomietrendite</p>
              <p className={`text-xl font-bold ${bewertungFarbe(ergebnis.bruttoRenditeBewertung)}`}>{fmtProzent(ergebnis.bruttomietrendite)} %</p>
              <p className={`text-xs font-medium ${bewertungFarbe(ergebnis.bruttoRenditeBewertung)}`}>{bewertungLabel(ergebnis.bruttoRenditeBewertung)}</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-700/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Nettomietrendite</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{fmtProzent(ergebnis.nettomietrendite)} %</p>
            </div>
            <div className={`rounded-xl p-4 ${bewertungBg(ergebnis.multiplikatorBewertung)}`}>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Mietmultiplikator</p>
              <p className={`text-xl font-bold ${bewertungFarbe(ergebnis.multiplikatorBewertung)}`}>{fmtProzent(ergebnis.mietmultiplikator)}</p>
              <p className={`text-xs font-medium ${bewertungFarbe(ergebnis.multiplikatorBewertung)}`}>{bewertungLabel(ergebnis.multiplikatorBewertung)}</p>
            </div>
            {ergebnis.eigenkapitalrendite !== null && (
              <div className="rounded-xl p-4 bg-blue-100 dark:bg-blue-500/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Eigenkapitalrendite</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">{fmtProzent(ergebnis.eigenkapitalrendite)} %</p>
                <p className="text-xs text-blue-600 dark:text-blue-300">Leverage-Effekt</p>
              </div>
            )}
            <div className={`rounded-xl p-4 ${ergebnis.monatsCashflow >= 0 ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'}`}>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Monatl. Cashflow</p>
              <p className={`text-xl font-bold ${ergebnis.monatsCashflow >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{fmtEuro(ergebnis.monatsCashflow)} €</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-700/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Jahresreinertrag</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.jahresreinertrag)} €</p>
            </div>
          </div>

          {/* Cashflow-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-5 pt-4 pb-2">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Cashflow-Analyse</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300">Position</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">pro Monat</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">pro Jahr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.cashflowTabelle.map((z, i) => (
                  <tr
                    key={i}
                    className={z.istSumme ? 'bg-gray-50 dark:bg-gray-700/30 font-semibold' : ''}
                  >
                    <td className={`px-5 py-2.5 ${z.istSumme ? 'text-gray-800 dark:text-gray-200 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                      {!z.istSumme && z.istNegativ ? '− ' : ''}{z.label}
                    </td>
                    <td className={`px-5 py-2.5 text-right tabular-nums ${
                      z.istSumme
                        ? z.monat >= 0 ? 'text-green-700 dark:text-green-400 font-bold' : 'text-red-700 dark:text-red-400 font-bold'
                        : z.istNegativ ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {fmtEuro(Math.abs(z.monat))} €
                    </td>
                    <td className={`px-5 py-2.5 text-right tabular-nums ${
                      z.istSumme
                        ? z.jahr >= 0 ? 'text-green-700 dark:text-green-400 font-bold' : 'text-red-700 dark:text-red-400 font-bold'
                        : z.istNegativ ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {fmtEuro(Math.abs(z.jahr))} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Investitions-Übersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaufpreis</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.kaufpreis)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaufnebenkosten ({nKaufnebenkostenProzent}%)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">+{fmtEuro(ergebnis.kaufnebenkosten)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Gesamtinvestition</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmtEuro(ergebnis.gesamtinvestition)} €</span>
              </div>
              {ergebnis.darlehenssumme !== null && (
                <>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Eigenkapital</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtEuro(nEigenkapital)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Darlehenssumme</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.darlehenssumme)} €</span>
                  </div>
                  {ergebnis.monatlicheKreditrate !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Monatliche Kreditrate</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.monatlicheKreditrate)} €</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Steuerliche Vorteile (AfA, Werbungskosten) sind nicht berücksichtigt. Diese können den Cashflow deutlich verbessern. Auch Wertsteigerungen der Immobilie sind nicht eingerechnet. Für eine vollständige Analyse sprechen Sie mit einem Steuerberater.
            </p>
          </div>

          <AffiliateBox programId="check24" context="mietrendite" />

          <ErgebnisAktionen
            ergebnisText={`Mietrendite: Brutto ${fmtProzent(ergebnis.bruttomietrendite)}% | Netto ${fmtProzent(ergebnis.nettomietrendite)}% | Multiplikator: ${fmtProzent(ergebnis.mietmultiplikator)}${ergebnis.eigenkapitalrendite !== null ? ` | EK-Rendite: ${fmtProzent(ergebnis.eigenkapitalrendite)}%` : ''} | Cashflow: ${fmtEuro(ergebnis.monatsCashflow)} €/Monat`}
            seitenTitel="Mietrendite-Rechner"
          />

          <AiExplain
            rechnerName="Mietrendite-Rechner"
            eingaben={{
              kaufpreis: `${fmtEuro(nKaufpreis)} €`,
              kaufnebenkosten: `${nKaufnebenkostenProzent}%`,
              kaltmiete: `${fmtEuro(nMonatlicheKaltmiete)} €/Monat`,
              mietausfallRisiko: `${mietausfallRisiko}%`,
              finanzierung: finanzierung === 'kredit' ? `Kredit (EK: ${fmtEuro(nEigenkapital)} €, ${nZinssatz}% Zins, ${nTilgung}% Tilgung)` : 'Eigenkapital',
            }}
            ergebnis={{
              bruttomietrendite: `${ergebnis.bruttomietrendite}%`,
              nettomietrendite: `${ergebnis.nettomietrendite}%`,
              ...(ergebnis.eigenkapitalrendite !== null ? { eigenkapitalrendite: `${ergebnis.eigenkapitalrendite}%` } : {}),
              mietmultiplikator: ergebnis.mietmultiplikator,
              monatsCashflow: `${ergebnis.monatsCashflow} €`,
            }}
          />

          <CrossLink href="/wohnen/baufinanzierung-rechner" emoji="🏗️" text="Finanzierung planen — Rate und Zinsen berechnen" />
        </>
      )}
    </div>
  );
}
