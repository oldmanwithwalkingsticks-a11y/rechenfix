'use client';

import { useState, useMemo } from 'react';
import { berechneAbfindung, type KirchensteuerOption } from '@/lib/berechnungen/abfindung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function AbfindungsRechner() {
  const [monatsBrutto, setMonatsBrutto] = useState('3500');
  const [betriebsjahre, setBetriebsjahre] = useState('8');
  const [eigeneAbfindung, setEigeneAbfindung] = useState(false);
  const [eigeneAbfindungBetrag, setEigeneAbfindungBetrag] = useState('14000');
  const [faktor, setFaktor] = useState('0,5');
  const [jahresBrutto, setJahresBrutto] = useState('42000');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState<KirchensteuerOption>('nein');

  const nMonatsBrutto = parseDeutscheZahl(monatsBrutto);
  const nBetriebsjahre = parseInt(betriebsjahre) || 0;
  const nEigeneAbfindung = parseDeutscheZahl(eigeneAbfindungBetrag);
  const nFaktor = parseDeutscheZahl(faktor);
  const nJahresBrutto = parseDeutscheZahl(jahresBrutto);

  const ergebnis = useMemo(
    () =>
      berechneAbfindung({
        monatsBrutto: nMonatsBrutto,
        betriebsjahre: nBetriebsjahre,
        eigeneAbfindung,
        eigeneAbfindungBetrag: nEigeneAbfindung,
        faktor: nFaktor,
        jahresBrutto: nJahresBrutto,
        steuerklasse,
        kirchensteuer,
      }),
    [nMonatsBrutto, nBetriebsjahre, eigeneAbfindung, nEigeneAbfindung, nFaktor, nJahresBrutto, steuerklasse, kirchensteuer],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');

  return (
    <div>
      {/* Monatsbutto und Betriebsjahre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatsbruttoeinkommen</label>
          <NummerEingabe value={monatsBrutto} onChange={setMonatsBrutto} placeholder="z.B. 3500" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betriebszugehörigkeit</label>
          <NummerEingabe value={betriebsjahre} onChange={setBetriebsjahre} placeholder="z.B. 8" einheit="Jahre" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Angefangene Jahre über 6 Monate zählen als volles Jahr
          </p>
        </div>
      </div>

      {/* Abfindungshöhe Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Abfindungshöhe</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Regelabfindung berechnen' },
            { key: true, label: 'Eigene Abfindung eingeben' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setEigeneAbfindung(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                eigeneAbfindung === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {eigeneAbfindung ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abfindungsbetrag (brutto)</label>
          <NummerEingabe value={eigeneAbfindungBetrag} onChange={setEigeneAbfindungBetrag} placeholder="z.B. 14000" einheit="€" />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faktor</label>
          <NummerEingabe value={faktor} onChange={setFaktor} placeholder="z.B. 0,5" einheit="×" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Standard: 0,5 Monatsgehälter pro Beschäftigungsjahr. Bei älteren AN oder langer Zugehörigkeit teils höher.
          </p>
        </div>
      )}

      {/* Jahresbrutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahresbrutto (ohne Abfindung)</label>
        <NummerEingabe value={jahresBrutto} onChange={setJahresBrutto} placeholder="z.B. 42000" einheit="€" />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Ihr voraussichtliches Bruttoeinkommen im Jahr der Abfindung (ohne die Abfindung selbst)
        </p>
      </div>

      {/* Steuerklasse und Kirchensteuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select
            value={steuerklasse}
            onChange={e => setSteuerklasse(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {[1, 2, 3, 4, 5, 6].map(sk => (
              <option key={sk} value={sk}>Steuerklasse {['I','II','III','IV','V','VI'][sk - 1]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
          <select
            value={kirchensteuer}
            onChange={e => setKirchensteuer(e.target.value as KirchensteuerOption)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="nein">Nein</option>
            <option value="9">Ja (9 %)</option>
            <option value="8">Ja (8 %, Bayern/BaWü)</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Netto-Abfindung (mit Fünftelregelung)</p>
            <p className="text-5xl font-bold">
              {fmt(ergebnis.nettoMitFuenftel)} <span className="text-2xl">€</span>
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung (Fünftelregelung)</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Brutto-Abfindung</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.bruttoAbfindung)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Einkommensteuer</span>
                <span className="font-semibold text-red-600 dark:text-red-400">−{fmt(ergebnis.steuerMitFuenftel)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Solidaritätszuschlag</span>
                <span className="font-semibold text-red-600 dark:text-red-400">−{fmt(ergebnis.soliMitFuenftel)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kirchensteuer</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {kirchensteuer === 'nein' ? 'keine' : `−${fmt(ergebnis.kirchensteuerMitFuenftel)} €`}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Netto-Abfindung</span>
                <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.nettoMitFuenftel)} €</span>
              </div>
            </div>
          </div>

          {/* Vergleichsbox */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-green-800 dark:text-green-300 mb-4">Vergleich: Fünftelregelung vs. Normalbesteuerung</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200 dark:border-green-500/30">
                    <th className="text-left py-2 pr-3 text-green-700 dark:text-green-400 font-medium" />
                    <th className="text-right py-2 px-3 text-green-700 dark:text-green-400 font-medium">Ohne Fünftelr.</th>
                    <th className="text-right py-2 px-3 text-green-700 dark:text-green-400 font-medium">Mit Fünftelr.</th>
                    <th className="text-right py-2 pl-3 text-green-700 dark:text-green-400 font-medium">Ersparnis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-100 dark:border-green-500/20">
                    <td className="py-3 pr-3 text-green-800 dark:text-green-300 font-medium">Steuer auf Abfindung</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.steuerOhneFuenftel)} €</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.steuerMitFuenftel)} €</td>
                    <td className="py-3 pl-3 text-right font-bold text-green-700 dark:text-green-400">
                      {ergebnis.steuerErsparnis > 0 ? `${fmt(ergebnis.steuerErsparnis)} €` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 text-green-800 dark:text-green-300 font-medium">Netto-Abfindung</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.nettoOhneFuenftel)} €</td>
                    <td className="py-3 px-3 text-right text-green-800 dark:text-green-300">{fmt(ergebnis.nettoMitFuenftel)} €</td>
                    <td className="py-3 pl-3 text-right font-bold text-green-700 dark:text-green-400">
                      {ergebnis.nettoVorteil > 0 ? `+${fmt(ergebnis.nettoVorteil)} €` : '—'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Hinweis Fünftelregelung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Wichtig:</strong> Die Fünftelregelung wird seit 2025 nicht mehr automatisch vom Arbeitgeber angewendet, sondern muss in der <strong>Steuererklärung</strong> beantragt werden.
            </p>
          </div>

          {/* Balkendiagramm */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufteilung der Brutto-Abfindung</h2>
            <div className="h-10 rounded-full overflow-hidden flex">
              <div
                className="bg-green-400 dark:bg-green-500 transition-all"
                style={{ width: `${ergebnis.nettoAnteilProzent}%` }}
                title={`Netto: ${fmt(ergebnis.nettoMitFuenftel)} €`}
              />
              <div
                className="bg-red-400 dark:bg-red-500 transition-all"
                style={{ width: `${ergebnis.steuerAnteilProzent}%` }}
                title={`Steuer: ${fmt(ergebnis.steuerMitFuenftel)} €`}
              />
              <div
                className="bg-gray-400 dark:bg-gray-500 transition-all"
                style={{ width: `${ergebnis.nebenAnteilProzent}%` }}
                title={`Soli/KiSt: ${fmt(ergebnis.soliMitFuenftel + ergebnis.kirchensteuerMitFuenftel)} €`}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-green-400 dark:bg-green-500" /> Netto ({fmt(ergebnis.nettoMitFuenftel)} €)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-red-400 dark:bg-red-500" /> Steuer ({fmt(ergebnis.steuerMitFuenftel)} €)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-gray-400 dark:bg-gray-500" /> Soli/KiSt ({fmt(ergebnis.soliMitFuenftel + ergebnis.kirchensteuerMitFuenftel)} €)
              </span>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung ist eine Schätzung. Die tatsächliche Steuerbelastung hängt von weiteren Einkünften, Sonderausgaben und Freibeträgen ab. Lassen Sie sich steuerlich beraten.
            </p>
          </div>

          <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist berechnen" />
          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Fünftelregelung? Steuererstattung berechnen" />

          <AffiliateBox programId="ks-auxilia" context="abfindung" />
          <AffiliateBox programId="wiso" context="abfindung" />

          <ErgebnisAktionen
            ergebnisText={`Abfindung: ${fmt(ergebnis.bruttoAbfindung)} € brutto → ${fmt(ergebnis.nettoMitFuenftel)} € netto (Fünftelregelung) | Steuerersparnis: ${fmt(ergebnis.steuerErsparnis)} € gegenüber Normalbesteuerung`}
            seitenTitel="Abfindungsrechner"
          />

          <AiExplain
            rechnerName="Abfindungsrechner"
            eingaben={{
              monatsBrutto: nMonatsBrutto,
              betriebsjahre: nBetriebsjahre,
              abfindungsmodus: eigeneAbfindung ? 'Eigene Abfindung' : `Regelabfindung (Faktor ${nFaktor})`,
              jahresBrutto: nJahresBrutto,
              steuerklasse,
              kirchensteuer: kirchensteuer === 'nein' ? 'Nein' : `Ja (${kirchensteuer}%)`,
            }}
            ergebnis={{
              bruttoAbfindung: ergebnis.bruttoAbfindung,
              nettoMitFuenftel: ergebnis.nettoMitFuenftel,
              nettoOhneFuenftel: ergebnis.nettoOhneFuenftel,
              steuerErsparnis: ergebnis.steuerErsparnis,
            }}
          />
        </>
      )}
    </div>
  );
}
