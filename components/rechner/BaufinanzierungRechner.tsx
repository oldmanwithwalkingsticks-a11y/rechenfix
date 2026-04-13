'use client';

import { useState, useMemo } from 'react';
import { berechneBaufinanzierung, BUNDESLAENDER } from '@/lib/berechnungen/baufinanzierung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const ZINSBINDUNG_OPTIONEN = [
  { label: '5 Jahre', wert: 5 },
  { label: '10 Jahre', wert: 10 },
  { label: '15 Jahre', wert: 15 },
  { label: '20 Jahre', wert: 20 },
  { label: '25 Jahre', wert: 25 },
  { label: '30 Jahre', wert: 30 },
];

const TILGUNG_SCHNELLWAHL = [1, 2, 3, 4];

export default function BaufinanzierungRechner() {
  const [kaufpreis, setKaufpreis] = useState('350000');
  const [eigenkapital, setEigenkapital] = useState('70000');
  const [bundesland, setBundesland] = useState('nordrhein-westfalen');
  const [sollzins, setSollzins] = useState('3,5');
  const [tilgung, setTilgung] = useState('2');
  const [zinsbindung, setZinsbindung] = useState(15);
  const [sondertilgung, setSondertilgung] = useState('0');
  const [nebenkostenEin, setNebenkostenEin] = useState(true);
  const [tilgungsplanOffen, setTilgungsplanOffen] = useState(false);

  const nKaufpreis = parseDeutscheZahl(kaufpreis);
  const nEigenkapital = parseDeutscheZahl(eigenkapital);
  const nSollzins = parseDeutscheZahl(sollzins);
  const nTilgung = parseDeutscheZahl(tilgung);
  const nSondertilgung = parseDeutscheZahl(sondertilgung);

  const ergebnis = useMemo(
    () => berechneBaufinanzierung({
      kaufpreis: nKaufpreis,
      eigenkapital: nEigenkapital,
      bundesland,
      sollzins: nSollzins,
      tilgung: nTilgung,
      zinsbindungJahre: zinsbindung,
      sondertilgungMonat: nSondertilgung,
      nebenkostenEinrechnen: nebenkostenEin,
    }),
    [nKaufpreis, nEigenkapital, bundesland, nSollzins, nTilgung, zinsbindung, nSondertilgung, nebenkostenEin],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // EK-Quote Bewertung
  const ekQuote = nKaufpreis > 0 ? (nEigenkapital / (nebenkostenEin ? nKaufpreis * 1.12 : nKaufpreis)) * 100 : 0;
  const ekBewertung = ekQuote < 10
    ? { text: 'Sehr gering — hohe Zinsen wahrscheinlich', farbe: 'text-red-600 dark:text-red-400' }
    : ekQuote < 20
    ? { text: 'Ausreichend', farbe: 'text-amber-600 dark:text-amber-400' }
    : ekQuote < 30
    ? { text: 'Gut', farbe: 'text-green-600 dark:text-green-400' }
    : { text: 'Sehr gut', farbe: 'text-green-600 dark:text-green-400' };

  return (
    <div>
      {/* Kaufpreis & Eigenkapital */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufpreis der Immobilie</label>
          <NummerEingabe value={kaufpreis} onChange={setKaufpreis} placeholder="z.B. 350000" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenkapital</label>
          <NummerEingabe value={eigenkapital} onChange={setEigenkapital} placeholder="z.B. 70000" einheit="€" />
          {nKaufpreis > 0 && (
            <p className={`mt-1 text-xs font-medium ${ekBewertung.farbe}`}>
              Eigenkapitalquote: {ekQuote.toFixed(1)}% — {ekBewertung.text}
            </p>
          )}
        </div>
      </div>

      {/* Bundesland & Nebenkosten Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BUNDESLAENDER.map(bl => (
              <option key={bl.key} value={bl.key}>{bl.label} ({bl.satz}%)</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufnebenkosten einrechnen?</label>
            <div className="flex gap-2">
              <button
                onClick={() => setNebenkostenEin(true)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                  nebenkostenEin
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Ja
              </button>
              <button
                onClick={() => setNebenkostenEin(false)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                  !nebenkostenEin
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Nein
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sollzins & Tilgung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sollzinssatz (p.a.)</label>
          <NummerEingabe value={sollzins} onChange={setSollzins} placeholder="z.B. 3,5" einheit="%" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anfängliche Tilgung (p.a.)</label>
          <NummerEingabe value={tilgung} onChange={setTilgung} placeholder="z.B. 2" einheit="%" />
          <div className="flex gap-2 mt-2">
            {TILGUNG_SCHNELLWAHL.map(t => (
              <button
                key={t}
                onClick={() => setTilgung(String(t))}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  parseDeutscheZahl(tilgung) === t
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Empfehlung: Mindestens 2%, besser 3% für schnellere Entschuldung.
          </p>
        </div>
      </div>

      {/* Zinsbindung & Sondertilgung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zinsbindung</label>
          <select
            value={zinsbindung}
            onChange={e => setZinsbindung(Number(e.target.value))}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {ZINSBINDUNG_OPTIONEN.map(o => (
              <option key={o.wert} value={o.wert}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Sondertilgung (optional)</label>
          <NummerEingabe value={sondertilgung} onChange={setSondertilgung} placeholder="z.B. 200" einheit="€" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Monatsrate */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Monatliche Rate</p>
                <p className="text-5xl font-bold">{fmt(ergebnis.monatsrate)} €</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  Darlehen: {fmt(ergebnis.darlehen)} €
                </span>
              </div>
            </div>
          </div>

          {/* Übersichtstabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Finanzierungsübersicht</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaufpreis</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.kaufpreis)} €</span>
              </div>
              {nebenkostenEin && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Kaufnebenkosten</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nebenkosten.gesamt)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gesamtkosten</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtkosten)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Eigenkapital</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.eigenkapital)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Darlehensbetrag</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmt(ergebnis.darlehen)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Monatsrate</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.monatsrate)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Restschuld nach Zinsbindung ({zinsbindung} J.)</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">{fmt(ergebnis.restschuldNachZinsbindung)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Gezahlte Zinsen ({zinsbindung} J.)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.gezahlteZinsenZinsbindung)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Voraussichtliche Gesamtlaufzeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">~{Math.round(ergebnis.gesamtlaufzeitJahre)} Jahre</span>
              </div>
            </div>
          </div>

          {/* Kaufnebenkosten-Aufschlüsselung */}
          {nebenkostenEin && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Kaufnebenkosten</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Grunderwerbsteuer ({fmtDez(ergebnis.nebenkosten.grunderwerbsteuerSatz)}%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nebenkosten.grunderwerbsteuer)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Notar & Grundbuch (2,0%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nebenkosten.notar)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Makler (3,57%)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nebenkosten.makler)} €</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-200 font-bold">Nebenkosten gesamt</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{fmt(ergebnis.nebenkosten.gesamt)} €</span>
                </div>
              </div>
              <CrossLink href="/wohnen/grunderwerbsteuer-rechner" emoji="📋" text="Grunderwerbsteuer genau berechnen" />
            </div>
          )}

          {/* Tilgungsverlauf (Diagramm) */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Tilgungsverlauf über {zinsbindung} Jahre</h3>
            <div className="space-y-2">
              {ergebnis.tilgungsplan.slice(0, zinsbindung).map((j) => {
                const gesamt = j.zinsanteil + j.tilgungsanteil + j.sondertilgung;
                const zinsProzent = gesamt > 0 ? (j.zinsanteil / gesamt) * 100 : 0;
                const tilgProzent = gesamt > 0 ? (j.tilgungsanteil / gesamt) * 100 : 0;
                const stProzent = gesamt > 0 ? (j.sondertilgung / gesamt) * 100 : 0;
                return (
                  <div key={j.jahr} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right flex-shrink-0">{j.jahr}.</span>
                    <div className="flex-1 h-4 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-600">
                      <div className="bg-orange-400 dark:bg-orange-500 h-full transition-all" style={{ width: `${zinsProzent}%` }} />
                      <div className="bg-green-400 dark:bg-green-500 h-full transition-all" style={{ width: `${tilgProzent}%` }} />
                      {stProzent > 0 && (
                        <div className="bg-blue-400 dark:bg-blue-500 h-full transition-all" style={{ width: `${stProzent}%` }} />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-24 text-right flex-shrink-0 tabular-nums">{fmt(j.restschuld)} €</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 dark:bg-orange-500 inline-block" />
                Zinsanteil
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500 inline-block" />
                Tilgungsanteil
              </span>
              {nSondertilgung > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-500 inline-block" />
                  Sondertilgung
                </span>
              )}
              <span className="ml-auto">Restschuld →</span>
            </div>
          </div>

          {/* Tilgungsplan-Tabelle (aufklappbar) */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <button
              onClick={() => setTilgungsplanOffen(!tilgungsplanOffen)}
              className="flex justify-between items-center w-full font-bold text-gray-700 dark:text-gray-200"
            >
              <span>Tilgungsplan anzeigen</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${tilgungsplanOffen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {tilgungsplanOffen && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                      <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300">Jahr</th>
                      <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Rate gesamt</th>
                      <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Zinsanteil</th>
                      <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Tilgung</th>
                      {nSondertilgung > 0 && (
                        <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Sondertilg.</th>
                      )}
                      <th className="py-2 font-semibold text-gray-700 dark:text-gray-300 text-right">Restschuld</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ergebnis.tilgungsplan.map(j => (
                      <tr
                        key={j.jahr}
                        className={`border-b border-gray-100 dark:border-gray-600/50 ${j.jahr === zinsbindung ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}`}
                      >
                        <td className="py-2 pr-3 text-gray-800 dark:text-gray-200">
                          {j.jahr}
                          {j.jahr === zinsbindung && <span className="ml-1 text-xs text-primary-600 dark:text-primary-400">(Ende Zinsbindung)</span>}
                        </td>
                        <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 text-right tabular-nums">{fmt(j.rateGesamt)} €</td>
                        <td className="py-2 pr-3 text-orange-600 dark:text-orange-400 text-right tabular-nums">{fmt(j.zinsanteil)} €</td>
                        <td className="py-2 pr-3 text-green-600 dark:text-green-400 text-right tabular-nums">{fmt(j.tilgungsanteil)} €</td>
                        {nSondertilgung > 0 && (
                          <td className="py-2 pr-3 text-blue-600 dark:text-blue-400 text-right tabular-nums">{fmt(j.sondertilgung)} €</td>
                        )}
                        <td className="py-2 text-gray-800 dark:text-gray-200 font-medium text-right tabular-nums">{fmt(j.restschuld)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Warnhinweise */}
          {ergebnis.warnungen.includes('ekNiedrig') && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-red-800 dark:text-red-300 text-xs">
                <strong>Hinweis:</strong> Ohne ausreichend Eigenkapital (unter 10%) sind die Zinsen deutlich höher und eine Finanzierung schwieriger zu bekommen.
              </p>
            </div>
          )}
          {ergebnis.warnungen.includes('tilgungNiedrig') && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-300 text-xs">
                <strong>Hinweis:</strong> Bei nur {fmtDez(nTilgung)}% Tilgung dauert die Rückzahlung über {Math.round(ergebnis.gesamtlaufzeitJahre)} Jahre. Empfohlen sind mindestens 2%.
              </p>
            </div>
          )}

          {/* Allgemeiner Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung dient der Orientierung. Tatsächliche Konditionen hängen von Bonität, Objektbewertung und Kreditgeber ab. Die Kaufnebenkosten (Makler, Notar) können regional variieren.
            </p>
          </div>

          <AffiliateBox programId="check24" context="baufinanzierung" />

          <ErgebnisAktionen
            ergebnisText={`Baufinanzierung: ${fmt(nKaufpreis)} € Kaufpreis, ${fmt(ergebnis.darlehen)} € Darlehen → Rate: ${fmt(ergebnis.monatsrate)} €/Monat | Restschuld nach ${zinsbindung}J: ${fmt(ergebnis.restschuldNachZinsbindung)} € | Laufzeit: ~${Math.round(ergebnis.gesamtlaufzeitJahre)} Jahre`}
            seitenTitel="Baufinanzierungs-Rechner"
          />

          <AiExplain
            rechnerName="Baufinanzierungs-Rechner"
            eingaben={{
              kaufpreis: nKaufpreis,
              eigenkapital: nEigenkapital,
              bundesland: BUNDESLAENDER.find(b => b.key === bundesland)?.label || bundesland,
              sollzins: nSollzins,
              tilgung: nTilgung,
              zinsbindung: `${zinsbindung} Jahre`,
              sondertilgung: nSondertilgung,
              nebenkostenEingerechnet: nebenkostenEin ? 'Ja' : 'Nein',
            }}
            ergebnis={{
              darlehen: ergebnis.darlehen,
              monatsrate: ergebnis.monatsrate,
              restschuldNachZinsbindung: ergebnis.restschuldNachZinsbindung,
              gezahlteZinsen: ergebnis.gezahlteZinsenZinsbindung,
              gesamtlaufzeit: `${Math.round(ergebnis.gesamtlaufzeitJahre)} Jahre`,
              nebenkosten: ergebnis.nebenkosten.gesamt,
            }}
          />

          <CrossLink href="/wohnen/mietrendite-rechner" emoji="📈" text="Als Kapitalanlage? Mietrendite berechnen" />
        </>
      )}
    </div>
  );
}
