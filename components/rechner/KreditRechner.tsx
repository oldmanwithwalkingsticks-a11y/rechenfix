'use client';

import { useState, useMemo } from 'react';
import { berechneKredit } from '@/lib/berechnungen/kredit';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const LAUFZEIT_OPTIONEN = [
  { label: '12 Monate', wert: 12 },
  { label: '24 Monate', wert: 24 },
  { label: '36 Monate', wert: 36 },
  { label: '48 Monate', wert: 48 },
  { label: '60 Monate', wert: 60 },
  { label: '72 Monate', wert: 72 },
  { label: '84 Monate', wert: 84 },
  { label: '96 Monate', wert: 96 },
];

export default function KreditRechner() {
  const [kreditsumme, setKreditsumme] = useState('10000');
  const [sollzins, setSollzins] = useState('5,9');
  const [laufzeitMonate, setLaufzeitMonate] = useState(60);
  const [sondertilgung, setSondertilgung] = useState('0');
  const [tilgungsplanOffen, setTilgungsplanOffen] = useState(false);
  const [alleMonateZeigen, setAlleMonateZeigen] = useState(false);

  const nKreditsumme = parseDeutscheZahl(kreditsumme);
  const nSollzins = parseDeutscheZahl(sollzins);
  const nSondertilgung = parseDeutscheZahl(sondertilgung);

  const ergebnis = useMemo(
    () => berechneKredit({
      kreditsumme: nKreditsumme,
      sollzins: nSollzins,
      laufzeitMonate,
      sondertilgung: nSondertilgung,
    }),
    [nKreditsumme, nSollzins, laufzeitMonate, nSondertilgung]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Balkendiagramm: Kreditsumme vs. Zinskosten
  const kreditsummeAnteil = ergebnis && ergebnis.gesamtkosten > 0
    ? (nKreditsumme / ergebnis.gesamtkosten) * 100
    : 100;

  // Tilgungsplan: Jahresübersicht oder alle Monate
  const tilgungsZeilen = useMemo(() => {
    if (!ergebnis) return [];
    if (alleMonateZeigen || ergebnis.tilgungsplan.length <= 24) {
      return ergebnis.tilgungsplan;
    }
    // Jahresübersicht: jeweils letzter Monat des Jahres
    return ergebnis.tilgungsplan.filter(z => z.monat % 12 === 0 || z.monat === ergebnis.tilgungsplan.length);
  }, [ergebnis, alleMonateZeigen]);

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kreditsumme</label>
          <NummerEingabe
            value={kreditsumme}
            onChange={setKreditsumme}
            placeholder="z.B. 10000"
            einheit="€"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sollzinssatz (p.a.)</label>
          <NummerEingabe
            value={sollzins}
            onChange={setSollzins}
            placeholder="z.B. 5,9"
            einheit="%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Laufzeit</label>
          <select
            value={laufzeitMonate}
            onChange={e => setLaufzeitMonate(Number(e.target.value))}
            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {LAUFZEIT_OPTIONEN.map(o => (
              <option key={o.wert} value={o.wert}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Sondertilgung (optional)</label>
          <NummerEingabe
            value={sondertilgung}
            onChange={setSondertilgung}
            placeholder="z.B. 50"
            einheit="€"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
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
                  {laufzeitMonate} Monate
                </span>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesamtkosten</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.gesamtkosten)} €</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Davon Zinsen</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{fmt(ergebnis.gesamtzins)} €</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Effektivzins</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.effektivzins)} %</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Laufzeit</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{ergebnis.tatsaechlicheLaufzeit} Mon.</p>
              </div>
            </div>

            {/* Balkendiagramm */}
            <div className="mb-2">
              <div className="flex h-6 rounded-full overflow-hidden">
                <div
                  className="bg-green-400 dark:bg-green-500 transition-all duration-500"
                  style={{ width: `${kreditsummeAnteil}%` }}
                />
                <div
                  className="bg-orange-400 dark:bg-orange-500 transition-all duration-500"
                  style={{ width: `${100 - kreditsummeAnteil}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500 inline-block" />
                  Kreditsumme ({kreditsummeAnteil.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 dark:bg-orange-500 inline-block" />
                  Zinskosten ({(100 - kreditsummeAnteil).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Sondertilgungs-Vergleich */}
          {nSondertilgung > 0 && ergebnis.zinsersparnis > 0 && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Sondertilgungs-Vorteil</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Durch Ihre Sondertilgung von {fmt(nSondertilgung)} €/Monat sparen Sie <strong>{fmt(ergebnis.zinsersparnis)} € Zinsen</strong> und
                sind <strong>{ergebnis.monate_frueher} {ergebnis.monate_frueher === 1 ? 'Monat' : 'Monate'} früher</strong> schuldenfrei.
              </p>
            </div>
          )}

          {/* Tilgungsplan */}
          {ergebnis.tilgungsplan.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
              <button
                onClick={() => setTilgungsplanOffen(!tilgungsplanOffen)}
                className="flex justify-between items-center w-full font-bold text-gray-700 dark:text-gray-200 mb-1"
              >
                <span>Tilgungsplan anzeigen</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${tilgungsplanOffen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {tilgungsplanOffen && (
                <>
                  {ergebnis.tilgungsplan.length > 24 && (
                    <div className="flex gap-2 mt-3 mb-3">
                      <button
                        onClick={() => setAlleMonateZeigen(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !alleMonateZeigen
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                        }`}
                      >
                        Jahresübersicht
                      </button>
                      <button
                        onClick={() => setAlleMonateZeigen(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          alleMonateZeigen
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                        }`}
                      >
                        Alle Monate
                      </button>
                    </div>
                  )}
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                          <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300">
                            {alleMonateZeigen || ergebnis.tilgungsplan.length <= 24 ? 'Monat' : 'Nach'}
                          </th>
                          <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Rate</th>
                          <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Zinsanteil</th>
                          <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Tilgung</th>
                          {nSondertilgung > 0 && (
                            <th className="py-2 pr-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Sondertilg.</th>
                          )}
                          <th className="py-2 font-semibold text-gray-700 dark:text-gray-300 text-right">Restschuld</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tilgungsZeilen.map(z => (
                          <tr key={z.monat} className="border-b border-gray-100 dark:border-gray-600/50">
                            <td className="py-2 pr-3 text-gray-800 dark:text-gray-200">
                              {alleMonateZeigen || ergebnis.tilgungsplan.length <= 24
                                ? z.monat
                                : `${z.monat} Mon.`}
                            </td>
                            <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 text-right">{fmt(z.rate)} €</td>
                            <td className="py-2 pr-3 text-orange-600 dark:text-orange-400 text-right">{fmt(z.zinsanteil)} €</td>
                            <td className="py-2 pr-3 text-green-600 dark:text-green-400 text-right">{fmt(z.tilgungsanteil)} €</td>
                            {nSondertilgung > 0 && (
                              <td className="py-2 pr-3 text-blue-600 dark:text-blue-400 text-right">{fmt(z.sondertilgung)} €</td>
                            )}
                            <td className="py-2 text-gray-800 dark:text-gray-200 font-medium text-right">{fmt(z.restschuld)} €</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung dient der Orientierung. Tatsächliche Kreditkonditionen können je nach Bonität, Bank und Kreditart abweichen. Der effektive Jahreszins kann zusätzliche Gebühren enthalten, die hier nicht berücksichtigt sind.
            </p>
          </div>

          <CrossLink href="/wohnen/baufinanzierung-rechner" emoji="🏠" text="Immobilie finanzieren? Baufinanzierung berechnen" />
          <CrossLink href="/auto/leasing-rechner" emoji="🚙" text="Auto leasen statt finanzieren? Leasing-Rechner" />

          <AffiliateBox programId="check24" context="kredit" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(nKreditsumme)} € Kredit bei ${fmt(nSollzins)}% Sollzins, ${laufzeitMonate} Monate → Monatsrate: ${fmt(ergebnis.monatsrate)} €, Gesamtzins: ${fmt(ergebnis.gesamtzins)} €`}
            seitenTitel="Kreditrechner"
          />
          <AiExplain
            rechnerName="Kreditrechner"
            eingaben={{
              kreditsumme: nKreditsumme,
              sollzinsSatz: nSollzins,
              laufzeitMonate,
              sondertilgung: nSondertilgung,
            }}
            ergebnis={{
              monatsrate: ergebnis.monatsrate,
              gesamtkosten: ergebnis.gesamtkosten,
              gesamtzins: ergebnis.gesamtzins,
              effektivzins: ergebnis.effektivzins,
              tatsaechlicheLaufzeit: ergebnis.tatsaechlicheLaufzeit,
            }}
          />
        </>
      )}
    </div>
  );
}
