'use client';

import { useState, useMemo } from 'react';
import { berechneSplitting, BUNDESLAENDER } from '@/lib/berechnungen/splitting';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const KINDERFREIBETRAG_OPTIONEN = ['0', '0,5', '1', '1,5', '2', '2,5', '3', '3,5', '4'];

export default function SplittingRechner() {
  const [bruttoP1, setBruttoP1] = useState('55000');
  const [bruttoP2, setBruttoP2] = useState('25000');
  const [kircheP1, setKircheP1] = useState(false);
  const [kircheP2, setKircheP2] = useState(false);
  const [bundesland, setBundesland] = useState('Nordrhein-Westfalen');
  const [kinderfreibetraege, setKinderfreibetraege] = useState('0');

  const nBruttoP1 = parseDeutscheZahl(bruttoP1);
  const nBruttoP2 = parseDeutscheZahl(bruttoP2);
  const nKfb = parseDeutscheZahl(kinderfreibetraege);

  const ergebnis = useMemo(
    () => berechneSplitting({
      jahresBruttoP1: nBruttoP1,
      jahresBruttoP2: nBruttoP2,
      kirchensteuerP1: kircheP1,
      kirchensteuerP2: kircheP2,
      bundesland,
      kinderfreibetraege: nKfb,
    }),
    [nBruttoP1, nBruttoP2, kircheP1, kircheP2, bundesland, nKfb],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Balkenlänge für Vergleich
  function getBalkenBreite(wert: number, max: number): number {
    if (max === 0) return 0;
    return Math.max(2, Math.min(100, (wert / max) * 100));
  }

  return (
    <div>
      {/* Partner 1 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahresbrutto Partner 1</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={bruttoP1} onChange={setBruttoP1} placeholder="z.B. 55.000" einheit="€" />
        </div>
      </div>

      {/* Partner 2 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahresbrutto Partner 2</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={bruttoP2} onChange={setBruttoP2} placeholder="z.B. 25.000" einheit="€" />
        </div>
      </div>

      {/* Kirchensteuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <RadioToggleGroup
            name="splitting-kirche-p1"
            legend="Kirchensteuer Partner 1"
            options={[
              { value: 'nein', label: 'Nein' },
              { value: 'ja', label: 'Ja' },
            ]}
            value={kircheP1 ? 'ja' : 'nein'}
            onChange={(v) => setKircheP1(v === 'ja')}
          />
        </div>
        <div>
          <RadioToggleGroup
            name="splitting-kirche-p2"
            legend="Kirchensteuer Partner 2"
            options={[
              { value: 'nein', label: 'Nein' },
              { value: 'ja', label: 'Ja' },
            ]}
            value={kircheP2 ? 'ja' : 'nein'}
            onChange={(v) => setKircheP2(v === 'ja')}
          />
        </div>
      </div>

      {/* Bundesland */}
      <div className="mb-4">
        <label htmlFor="splitting-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
        <select id="splitting-select-1"
          value={bundesland}
          onChange={ev => setBundesland(ev.target.value)}
          className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
        >
          {BUNDESLAENDER.map(bl => (
            <option key={bl} value={bl}>{bl}</option>
          ))}
        </select>
      </div>

      {/* Kinderfreibeträge */}
      <div className="mb-6">
        <label htmlFor="splitting-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinderfreibeträge</label>
        <select id="splitting-select-2"
          value={kinderfreibetraege}
          onChange={ev => setKinderfreibetraege(ev.target.value)}
          className="w-full sm:w-1/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
        >
          {KINDERFREIBETRAG_OPTIONEN.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pro Kind 0,5 je Elternteil = 1,0 zusammen. Nur relevant wenn günstiger als Kindergeld.</p>
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Nettolohn berechnen" />

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className={`result-box mb-6 ${ergebnis.vorteilGesamt <= 0 ? 'opacity-80' : ''}`}>
            <p className="text-white/80 text-sm mb-1">Splitting-Vorteil</p>
            {ergebnis.vorteilGesamt > 0 ? (
              <>
                <p className="text-5xl font-bold">{fmtEuro(ergebnis.vorteilGesamt)} €</p>
                <p className="text-white/80 text-sm mt-1">Steuervorteil durch Zusammenveranlagung</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold">Kein Vorteil</p>
                <p className="text-white/80 text-sm mt-1">Beide Partner verdienen gleich viel — kein Splitting-Effekt</p>
              </>
            )}
          </div>

          {/* Splitting-Visualisierung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">So funktioniert das Splitting</h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
              <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3 text-center flex-1 w-full">
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Partner 1</p>
                <p className="font-bold text-blue-800 dark:text-blue-200">{fmtEuro(ergebnis.zveP1)} €</p>
              </div>
              <div className="text-gray-600 text-lg hidden sm:block">+</div>
              <div className="text-gray-600 text-lg sm:hidden">+</div>
              <div className="bg-pink-50 dark:bg-pink-500/10 rounded-lg p-3 text-center flex-1 w-full">
                <p className="text-xs text-pink-600 dark:text-pink-400 mb-1">Partner 2</p>
                <p className="font-bold text-pink-800 dark:text-pink-200">{fmtEuro(ergebnis.zveP2)} €</p>
              </div>
              <div className="text-gray-600 text-lg hidden sm:block">→</div>
              <div className="text-gray-600 text-lg sm:hidden">↓</div>
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded-lg p-3 text-center flex-1 w-full">
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Gesamt ÷ 2</p>
                <p className="font-bold text-purple-800 dark:text-purple-200">{fmtEuro(ergebnis.zveHalbe)} €</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">× 2 = Splitting-Tarif</p>
              </div>
            </div>
          </div>

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-5 pt-4 pb-2">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: Einzel- vs. Zusammenveranlagung</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300">Position</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Einzelveranlagung</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Zusammenveranlagung</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Ersparnis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.vergleichsTabelle.map(z => (
                  <tr
                    key={z.label}
                    className={z.istGesamt ? 'bg-gray-50 dark:bg-gray-700/30 font-bold' : ''}
                  >
                    <td className={`px-5 py-2.5 ${z.istGesamt ? 'text-gray-800 dark:text-gray-200 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                      {z.label}
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">
                      {fmtEuro(z.einzel)} €
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">
                      {fmtEuro(z.splitting)} €
                    </td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-semibold ${z.vorteil > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {z.vorteil > 0 ? `${fmtEuro(z.vorteil)} €` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Balkenvergleich */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Steuerlast im Vergleich</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Einzelveranlagung</span>
                  <span>{fmtEuro(ergebnis.gesamtEinzel)} €</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-7">
                  <div
                    className="bg-red-400 dark:bg-red-500 h-7 rounded-full transition-all duration-500"
                    style={{ width: `${getBalkenBreite(ergebnis.gesamtEinzel, Math.max(ergebnis.gesamtEinzel, ergebnis.gesamtSplitting))}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Zusammenveranlagung (Splitting)</span>
                  <span>{fmtEuro(ergebnis.gesamtSplitting)} €</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-7">
                  <div
                    className="bg-green-400 dark:bg-green-500 h-7 rounded-full transition-all duration-500"
                    style={{ width: `${getBalkenBreite(ergebnis.gesamtSplitting, Math.max(ergebnis.gesamtEinzel, ergebnis.gesamtSplitting))}%` }}
                  />
                </div>
              </div>
              {ergebnis.vorteilGesamt > 0 && (
                <div className="text-center">
                  <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-sm font-bold px-4 py-1.5 rounded-lg">
                    Ersparnis: {fmtEuro(ergebnis.vorteilGesamt)} €
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Steuerklassen-Empfehlung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
              💡 Empfohlene Steuerklassenkombination: <span className="text-blue-600 dark:text-blue-200">{ergebnis.empfehlung}</span>
            </h2>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              {ergebnis.empfehlungText}
            </p>
            {ergebnis.empfehlung === 'III/V' && (
              <p className="text-blue-600 dark:text-blue-300 text-xs mt-2">
                💡 <strong>Tipp:</strong> Das Faktorverfahren (IV/IV mit Faktor) kann eine gute Alternative sein — es verteilt die Steuerlast gerechter auf beide Partner und vermeidet Nachzahlungen.
              </p>
            )}
          </div>

          {/* Info-Box */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>ℹ️ Gut zu wissen:</strong> Das Ehegattensplitting lohnt sich umso mehr, je größer der Gehaltsunterschied zwischen den Partnern ist. Bei gleich hohen Einkommen gibt es keinen Vorteil. Der maximale Splitting-Vorteil liegt 2026 bei ca. <strong>20.000 €</strong> (wenn ein Partner nichts verdient und der andere ein sehr hohes Einkommen hat).
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Vereinfachte Berechnung. Sonderausgaben, außergewöhnliche Belastungen und weitere Freibeträge sind nicht berücksichtigt. Für eine exakte Berechnung nutzen Sie eine Steuersoftware.
            </p>
          </div>

          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Steuererstattung berechnen" />

          <AffiliateBox programId="wiso" context="splitting" />
          <AffiliateBox programId="smartsteuer" context="splitting" />

          <ErgebnisAktionen
            ergebnisText={`Ehegattensplitting: ${ergebnis.vorteilGesamt > 0 ? `${fmtEuro(ergebnis.vorteilGesamt)} € Steuervorteil` : 'Kein Vorteil'} | Einzelveranlagung: ${fmtEuro(ergebnis.gesamtEinzel)} € | Zusammenveranlagung: ${fmtEuro(ergebnis.gesamtSplitting)} € | Empfehlung: ${ergebnis.empfehlung}`}
            seitenTitel="Splitting-Rechner"
          />

          <AiExplain
            rechnerName="Splitting-Rechner (Ehegattensplitting)"
            eingaben={{
              partner1: `${fmtEuro(nBruttoP1)} € Jahresbrutto`,
              partner2: `${fmtEuro(nBruttoP2)} € Jahresbrutto`,
              kirchensteuerP1: kircheP1 ? 'Ja' : 'Nein',
              kirchensteuerP2: kircheP2 ? 'Ja' : 'Nein',
              bundesland,
              kinderfreibetraege: nKfb,
            }}
            ergebnis={{
              splittingVorteil: `${ergebnis.vorteilGesamt} €`,
              einzelveranlagung: `${ergebnis.gesamtEinzel} €`,
              zusammenveranlagung: `${ergebnis.gesamtSplitting} €`,
              empfehlung: ergebnis.empfehlung,
            }}
          />
        </>
      )}
    </div>
  );
}
