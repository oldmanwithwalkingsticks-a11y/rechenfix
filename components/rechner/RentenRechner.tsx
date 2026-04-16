'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { berechneRente } from '@/lib/berechnungen/rente';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const RENTENEINTRITT_OPTIONEN = [
  { label: '63 (mit Abschlägen)', wert: 63 },
  { label: '65', wert: 65 },
  { label: '66', wert: 66 },
  { label: '67 (Regelaltersgrenze)', wert: 67 },
];

export default function RentenRechner() {
  const [alter, setAlter] = useState('35');
  const [renteneintritt, setRenteneintritt] = useState(67);
  const [monatsbrutto, setMonatsbrutto] = useState('3500');
  const [beitragsjahre, setBeitragsjahre] = useState('15');
  const [rentenpunkte, setRentenpunkte] = useState('');
  const [gehaltssteigerung, setGehaltssteigerung] = useState('1,5');
  const [gewuenschtesNetto, setGewuenschtesNetto] = useState('2000');

  const nAlter = parseDeutscheZahl(alter);
  const nMonatsbrutto = parseDeutscheZahl(monatsbrutto);
  const nBeitragsjahre = parseDeutscheZahl(beitragsjahre);
  const nRentenpunkte = rentenpunkte.trim() ? parseDeutscheZahl(rentenpunkte) : null;
  const nGehaltssteigerung = parseDeutscheZahl(gehaltssteigerung);
  const nGewuenschtesNetto = parseDeutscheZahl(gewuenschtesNetto);

  const ergebnis = useMemo(
    () => berechneRente({
      alter: nAlter,
      renteneintrittsalter: renteneintritt,
      monatsbrutto: nMonatsbrutto,
      beitragsjahre: nBeitragsjahre,
      bekannteRentenpunkte: nRentenpunkte,
      gehaltssteigerung: nGehaltssteigerung,
      gewuenschtesNetto: nGewuenschtesNetto,
    }),
    [nAlter, renteneintritt, nMonatsbrutto, nBeitragsjahre, nRentenpunkte, nGehaltssteigerung, nGewuenschtesNetto],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Alter & Renteneintritt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktuelles Alter</label>
          <NummerEingabe value={alter} onChange={setAlter} placeholder="z.B. 35" einheit="Jahre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewünschtes Renteneintrittsalter</label>
          <select
            value={renteneintritt}
            onChange={e => setRenteneintritt(Number(e.target.value))}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {RENTENEINTRITT_OPTIONEN.map(o => (
              <option key={o.wert} value={o.wert}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gehalt & Beitragsjahre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktuelles Monatsbrutto</label>
          <NummerEingabe value={monatsbrutto} onChange={setMonatsbrutto} placeholder="z.B. 3500" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bisherige Beitragsjahre</label>
          <NummerEingabe value={beitragsjahre} onChange={setBeitragsjahre} placeholder="z.B. 15" einheit="Jahre" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Inkl. Ausbildung, Studium (wenn versichert), Kindererziehungszeiten.
          </p>
        </div>
      </div>

      {/* Rentenpunkte & Gehaltssteigerung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bereits gesammelte Rentenpunkte (optional)</label>
          <NummerEingabe value={rentenpunkte} onChange={setRentenpunkte} placeholder="z.B. 12,5" einheit="EP" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Finden Sie auf Ihrer Renteninformation. Falls unbekannt, wird geschätzt.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erwartete Gehaltssteigerung pro Jahr</label>
          <NummerEingabe value={gehaltssteigerung} onChange={setGehaltssteigerung} placeholder="z.B. 1,5" einheit="%" />
        </div>
      </div>

      {/* Gewünschtes Netto im Alter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewünschtes Netto-Einkommen im Alter</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={gewuenschtesNetto} onChange={setGewuenschtesNetto} placeholder="z.B. 2000" einheit="€/Monat" />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Für die Berechnung Ihrer Rentenlücke.
        </p>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Brutto-Rente */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Geschätzte Brutto-Monatsrente</p>
                <p className="text-5xl font-bold">{fmt(ergebnis.bruttoRente)} €</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  Netto: ca. {fmt(ergebnis.nettoRente)} €
                </span>
              </div>
            </div>
          </div>

          {/* Rentenpunkte-Übersicht */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Rentenpunkte-Übersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bereits erworben</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.bisherigeRentenpunkte)} Punkte</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Noch zu erwerben ({ergebnis.jahreBisRente} Jahre)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.zukuenftigeRentenpunkte)} Punkte</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Gesamte Rentenpunkte</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmtDez(ergebnis.gesamtRentenpunkte)} Punkte</span>
              </div>
            </div>

            {/* Balken: bisherige vs. zukünftige */}
            <div className="mt-4">
              <div className="flex h-5 rounded-full overflow-hidden">
                <div
                  className="bg-green-400 dark:bg-green-500 transition-all duration-500"
                  style={{ width: `${(ergebnis.bisherigeRentenpunkte / ergebnis.gesamtRentenpunkte) * 100}%` }}
                />
                <div
                  className="bg-blue-400 dark:bg-blue-500 transition-all duration-500"
                  style={{ width: `${(ergebnis.zukuenftigeRentenpunkte / ergebnis.gesamtRentenpunkte) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500 inline-block" />
                  Bereits erworben
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-500 inline-block" />
                  Noch zu erwerben
                </span>
              </div>
            </div>
          </div>

          {/* Renten-Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Renten-Berechnung</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Brutto-Rente (ohne Abschlag)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.bruttoRenteOhneAbschlag)} €/Monat</span>
              </div>
              {ergebnis.abschlagProzent > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 dark:text-red-400">Abschlag ({ergebnis.abschlagMonate} Monate × 0,3%)</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">−{fmtDez(ergebnis.abschlagProzent)}%</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Brutto-Monatsrente</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{fmt(ergebnis.bruttoRente)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Steuerpflichtiger Anteil bei Rentenbeginn</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.steuerpflichtAnteil)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Abzüge (Steuer + KV/PV, geschätzt)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">−{fmt(ergebnis.bruttoRente - ergebnis.nettoRente)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Geschätzte Netto-Monatsrente</span>
                <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.nettoRente)} €</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Aktueller Rentenwert: {fmtDez(ergebnis.rentenwert)} € | Durchschnittsentgelt: {fmt(ergebnis.durchschnittsentgelt)} €/Jahr
            </p>
          </div>

          {/* Rentenlücke */}
          <div className={`rounded-xl p-5 mb-6 border ${
            ergebnis.rentenluecke > 0
              ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
              : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
          }`}>
            <h2 className={`font-bold mb-4 ${
              ergebnis.rentenluecke > 0
                ? 'text-red-800 dark:text-red-300'
                : 'text-green-800 dark:text-green-300'
            }`}>
              Rentenlücke
            </h2>

            {/* Balkendiagramm */}
            <div className="mb-4">
              {(() => {
                const maxWert = Math.max(ergebnis.gewuenschtesNetto, ergebnis.nettoRente);
                const renteBreite = maxWert > 0 ? (ergebnis.nettoRente / maxWert) * 100 : 0;
                const wunschBreite = maxWert > 0 ? (ergebnis.gewuenschtesNetto / maxWert) * 100 : 0;
                return (
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Gewünschtes Netto</span>
                        <span className="font-semibold">{fmt(ergebnis.gewuenschtesNetto)} €</span>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div className="bg-blue-400 dark:bg-blue-500 h-full rounded-full transition-all" style={{ width: `${wunschBreite}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Geschätzte Netto-Rente</span>
                        <span className="font-semibold">{fmt(ergebnis.nettoRente)} €</span>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
                        <div className="bg-green-400 dark:bg-green-500 h-full rounded-full transition-all" style={{ width: `${renteBreite}%` }} />
                        {ergebnis.rentenluecke > 0 && (
                          <div
                            className="absolute top-0 bg-red-400/30 dark:bg-red-500/30 h-full transition-all"
                            style={{ left: `${renteBreite}%`, width: `${wunschBreite - renteBreite}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-2">
              {ergebnis.rentenluecke > 0 ? (
                <>
                  <p className="text-sm font-bold text-red-800 dark:text-red-300">
                    Monatliche Lücke: {fmt(ergebnis.rentenluecke)} €
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Um die Lücke zu schließen, müssten Sie ab heute ca. <strong>{fmt(ergebnis.sparrateMonatlich)} €/Monat</strong> zusätzlich sparen.
                  </p>
                  <p className="text-xs text-red-600/70 dark:text-red-400/70">
                    (Annahme: 5% Rendite p.a., 20 Jahre Entnahmephase, benötigtes Kapital: ca. {fmt(ergebnis.benoetigtesKapital)} €)
                  </p>
                  <p className="mt-2 text-xs">
                    <Link href="/finanzen/etf-sparplanrechner" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                      ETF-Sparplan berechnen →
                    </Link>
                  </p>
                </>
              ) : (
                <p className="text-sm font-bold text-green-800 dark:text-green-300">
                  Keine Lücke — Ihre Rente reicht voraussichtlich aus.
                </p>
              )}
            </div>
          </div>

          <CrossLink href="/finanzen/etf-sparplanrechner" emoji="📈" text="Rentenlücke mit ETF-Sparplan schließen" />
          <CrossLink href="/finanzen/sparrechner" emoji="🏦" text="Klassischer Sparplan für die Rente" />

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Dies ist eine vereinfachte Schätzung. Die tatsächliche Rente hängt von vielen Faktoren ab, u.a. der Rentenanpassung, Inflation und Ihrer individuellen Erwerbsbiografie. Ihre offizielle Renteninformation erhalten Sie jährlich von der Deutschen Rentenversicherung.
            </p>
          </div>

          <AffiliateBox programId="wiso" context="rente" />
          {ergebnis.rentenluecke > 0 && (
            <AffiliateBox programId="verivox" context="rente" variant="compact" />
          )}

          <ErgebnisAktionen
            ergebnisText={`Rentenrechner: Brutto-Rente ca. ${fmt(ergebnis.bruttoRente)} €/Monat | Netto ca. ${fmt(ergebnis.nettoRente)} € | ${fmtDez(ergebnis.gesamtRentenpunkte)} Rentenpunkte | Rentenlücke: ${ergebnis.rentenluecke > 0 ? fmt(ergebnis.rentenluecke) + ' €' : 'keine'}`}
            seitenTitel="Rentenrechner"
          />

          <AiExplain
            rechnerName="Rentenrechner"
            eingaben={{
              alter: nAlter,
              renteneintrittsalter: renteneintritt,
              monatsbrutto: nMonatsbrutto,
              beitragsjahre: nBeitragsjahre,
              bekannteRentenpunkte: nRentenpunkte ?? 'geschätzt',
              gehaltssteigerung: nGehaltssteigerung,
              gewuenschtesNetto: nGewuenschtesNetto,
            }}
            ergebnis={{
              bruttoRente: ergebnis.bruttoRente,
              nettoRente: ergebnis.nettoRente,
              gesamtRentenpunkte: ergebnis.gesamtRentenpunkte,
              abschlagProzent: ergebnis.abschlagProzent,
              rentenluecke: ergebnis.rentenluecke,
              sparrate: ergebnis.sparrateMonatlich,
            }}
          />
        </>
      )}
    </div>
  );
}
