'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Akku-Ladezeit-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Ladezeit ideal (h) = Kapazität(mAh) ÷ Ladestrom(mA)
 * - Ladezeit real (h)  = Ladezeit ideal × Effizienzfaktor
 * - Effizienzfaktor-Default 1,2 (≈ 20 % Aufschlag: Wärmeverluste + langsame CV-Ladeschlussphase ab ~80 %)
 * - Watt-Helfer: Ladestrom(mA) = Ladeleistung(W) ÷ Spannung(V) × 1.000
 *   mAh-Schätzung ist eine Näherung: Schnellladen nutzt höhere Spannungen (USB-PD 9/12/15/20 V).
 */

const LADESTROM_STUFEN = [1000, 2000, 3000, 5000];

function formatZeit(stunden: number): string {
  if (!isFinite(stunden) || stunden <= 0) return '0 min';
  const totalMin = Math.round(stunden * 60);
  if (totalMin < 60) return `${totalMin} min`;
  const std = Math.floor(totalMin / 60);
  const min = totalMin - std * 60;
  return `${std} h ${String(min).padStart(2, '0')} min`;
}

export default function AkkuLadezeitRechner() {
  const [kapazitaet, setKapazitaet] = useState('5000');
  const [modus, setModus] = useState<'mA' | 'WV'>('mA');
  const [ladestrom, setLadestrom] = useState('2000');
  const [watt, setWatt] = useState('10');
  const [volt, setVolt] = useState('5');
  const [effizienz, setEffizienz] = useState('1.2');

  const nKap = parseDeutscheZahl(kapazitaet);
  const nLadestrom = parseDeutscheZahl(ladestrom);
  const nWatt = parseDeutscheZahl(watt);
  const nVolt = parseDeutscheZahl(volt);
  const nEffizienz = parseFloat(effizienz);

  const ergebnis = useMemo(() => {
    const mA = modus === 'WV'
      ? (nVolt > 0 ? (nWatt / nVolt) * 1000 : 0)
      : nLadestrom;
    if (nKap <= 0 || mA <= 0 || nEffizienz <= 0) return null;
    const idealH = nKap / mA;
    const realH = idealH * nEffizienz;
    return { mA, idealH, realH };
  }, [modus, nKap, nLadestrom, nWatt, nVolt, nEffizienz]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="akku-kapazitaet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akkukapazität</label>
          <NummerEingabe value={kapazitaet} onChange={setKapazitaet} placeholder="5000" einheit="mAh" />
        </div>
        <div>
          <label htmlFor="akku-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eingabe als</label>
          <select
            id="akku-modus"
            value={modus}
            onChange={(e) => setModus(e.target.value as 'mA' | 'WV')}
            className="input-field w-full"
          >
            <option value="mA">Ladestrom (mA)</option>
            <option value="WV">Ladeleistung (W) + Spannung (V)</option>
          </select>
        </div>

        {modus === 'mA' ? (
          <div>
            <label htmlFor="akku-ladestrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ladestrom</label>
            <NummerEingabe value={ladestrom} onChange={setLadestrom} placeholder="2000" einheit="mA" />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="akku-watt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ladeleistung</label>
              <NummerEingabe value={watt} onChange={setWatt} placeholder="10" einheit="W" />
            </div>
            <div>
              <label htmlFor="akku-volt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spannung</label>
              <NummerEingabe value={volt} onChange={setVolt} placeholder="5" einheit="V" />
            </div>
          </>
        )}

        <div className={modus === 'mA' ? '' : 'sm:col-span-2'}>
          <label htmlFor="akku-effizienz" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Effizienz (Ladeverlust)</label>
          <select
            id="akku-effizienz"
            value={effizienz}
            onChange={(e) => setEffizienz(e.target.value)}
            className="input-field w-full"
          >
            <option value="1">100 % – rein rechnerisch (theoretischer Wert)</option>
            <option value="1.2">120 % – realistisch (Standard, Wärme + Ladeschluss)</option>
            <option value="1.3">130 % – schwaches Netzteil oder Kälte</option>
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Ladezeit (realistisch)</p>
                <p className="text-5xl font-bold">{formatZeit(ergebnis.realH)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nKap)} mAh @ {fmt0(ergebnis.mA)} mA
                </span>
                <span className="block text-white/80 text-sm">ideal: {formatZeit(ergebnis.idealH)}</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            {modus === 'WV' && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(nWatt)} W ÷ {nVolt.toLocaleString('de-DE')} V × 1.000 = {fmt0(ergebnis.mA)} mA
              </p>
            )}
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nKap)} mAh ÷ {fmt0(ergebnis.mA)} mA = {formatZeit(ergebnis.idealH)} (ideal)
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {formatZeit(ergebnis.idealH)} × {nEffizienz.toLocaleString('de-DE')} = {formatZeit(ergebnis.realH)} (real)
            </p>
          </div>

          {/* Ladestrom-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Gleiche Kapazität bei verschiedenen Ladeströmen</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Ladestrom</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">grobe Leistung (5 V)</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Ladezeit (real)</th>
                  </tr>
                </thead>
                <tbody>
                  {LADESTROM_STUFEN.map((stufe) => {
                    const realH = (nKap / stufe) * nEffizienz;
                    const aktiv = Math.round(ergebnis.mA) === stufe;
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmt0(stufe)} mA</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{(stufe / 1000 * 5).toLocaleString('de-DE', { maximumFractionDigits: 0 })} W</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{formatZeit(realH)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/stromverbrauch-geraete-rechner" emoji="⚡" text="Stromverbrauch & -kosten von Geräten" />
          <CrossLink href="/technik/download-rechner" emoji="⏱️" text="Wie lange dauert ein Download?" />

          <ErgebnisAktionen
            ergebnisText={`Akku mit ${fmt0(nKap)} mAh lädt bei ${fmt0(ergebnis.mA)} mA in ca. ${formatZeit(ergebnis.realH)} (ideal ${formatZeit(ergebnis.idealH)})`}
            seitenTitel="Akku-Ladezeit-Rechner"
          />
          <AiExplain
            rechnerName="Akku-Ladezeit-Rechner"
            eingaben={{ kapazitaetMah: nKap, ladestromMa: Math.round(ergebnis.mA), effizienzfaktor: nEffizienz }}
            ergebnis={{ realeZeitStunden: ergebnis.realH, idealeZeitStunden: ergebnis.idealH }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Akkukapazität und Ladestrom ein, um die Ladezeit zu berechnen.
        </p>
      )}
    </div>
  );
}
