'use client';

import { useState, useMemo } from 'react';
import { berechneProzVeraenderung } from '@/lib/berechnungen/prozentuale-veraenderung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function ProzVeraenderungRechner() {
  const [alterWert, setAlterWert] = useState('100');
  const [neuerWert, setNeuerWert] = useState('125');
  const [einheit, setEinheit] = useState('');

  const nAlterWert = parseDeutscheZahl(alterWert);
  const nNeuerWert = parseDeutscheZahl(neuerWert);

  const ergebnis = useMemo(
    () => berechneProzVeraenderung({
      alterWert: nAlterWert,
      neuerWert: nNeuerWert,
      einheit: einheit.trim(),
    }),
    [nAlterWert, nNeuerWert, einheit],
  );

  const fmtZ = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
  const fmtP = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  const e = einheit.trim();

  // Balkenlänge berechnen (proportional)
  function getBalkenBreite(wert: number, max: number): number {
    if (max === 0) return 0;
    return Math.max(2, Math.min(100, (Math.abs(wert) / max) * 100));
  }

  return (
    <div>
      {/* Alter Wert */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter Wert (Ausgangswert)</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={alterWert} onChange={setAlterWert} placeholder="z.B. 100" einheit={e || undefined} />
        </div>
      </div>

      {/* Neuer Wert */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Neuer Wert</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={neuerWert} onChange={setNeuerWert} placeholder="z.B. 125" einheit={e || undefined} />
        </div>
      </div>

      {/* Einheit */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Einheit <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            value={einheit}
            onChange={ev => setEinheit(ev.target.value)}
            placeholder="z.B. €, kg, Stück"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          {ergebnis.divisionDurchNull ? (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5 mb-6">
              <p className="text-amber-800 dark:text-amber-300 font-bold text-lg mb-2">Nicht berechenbar</p>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Der Ausgangswert ist 0. Eine prozentuale Veränderung von 0 ausgehend ist mathematisch nicht definiert (Division durch Null).
              </p>
              {ergebnis.absolut !== 0 && (
                <p className="text-amber-700 dark:text-amber-400 text-sm mt-2">
                  Absolute Veränderung: <strong>{ergebnis.absolut > 0 ? '+' : ''}{fmtZ(ergebnis.absolut)}{e ? ` ${e}` : ''}</strong>
                </p>
              )}
            </div>
          ) : (
            <div className="result-box mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-white/80 text-sm mb-1">Prozentuale Veränderung</p>
                  <p className="text-5xl font-bold">
                    {ergebnis.richtung === 'zunahme' ? '+' : ''}{fmtP(ergebnis.prozent)} %
                  </p>
                </div>
                <div className="sm:text-right space-y-1">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {ergebnis.richtung === 'zunahme' ? '📈 Zunahme' : ergebnis.richtung === 'abnahme' ? '📉 Abnahme' : '➡️ Keine Veränderung'}
                  </span>
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      Absolut: {ergebnis.absolut > 0 ? '+' : ''}{fmtZ(ergebnis.absolut)}{e ? ` ${e}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!ergebnis.divisionDurchNull && (
            <>
              {/* Aufschlüsselung */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Ergebnisse</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Alter Wert</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtZ(ergebnis.alterWert)}{e ? ` ${e}` : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Neuer Wert</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtZ(ergebnis.neuerWert)}{e ? ` ${e}` : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Absolute Veränderung</span>
                    <span className={`font-bold ${ergebnis.richtung === 'zunahme' ? 'text-green-600 dark:text-green-400' : ergebnis.richtung === 'abnahme' ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {ergebnis.absolut > 0 ? '+' : ''}{fmtZ(ergebnis.absolut)}{e ? ` ${e}` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Prozentuale Veränderung</span>
                    <span className={`font-bold ${ergebnis.richtung === 'zunahme' ? 'text-green-600 dark:text-green-400' : ergebnis.richtung === 'abnahme' ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {ergebnis.prozent > 0 ? '+' : ''}{fmtP(ergebnis.prozent)} %
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Faktor</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">×{fmtZ(ergebnis.faktor)}</span>
                  </div>
                </div>
              </div>

              {/* Rechenweg */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Rechenweg</h3>
                <div className="space-y-2">
                  {ergebnis.rechenschritte.map((schritt, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{schritt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Balkenvergleich */}
              {ergebnis.alterWert >= 0 && ergebnis.neuerWert >= 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                  <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Visueller Vergleich</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Alter Wert</span>
                        <span>{fmtZ(ergebnis.alterWert)}{e ? ` ${e}` : ''}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                        <div
                          className="bg-gray-500 dark:bg-gray-400 h-6 rounded-full transition-all duration-500"
                          style={{ width: `${getBalkenBreite(ergebnis.alterWert, Math.max(Math.abs(ergebnis.alterWert), Math.abs(ergebnis.neuerWert)))}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Neuer Wert</span>
                        <span>{fmtZ(ergebnis.neuerWert)}{e ? ` ${e}` : ''}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                        <div
                          className={`h-6 rounded-full transition-all duration-500 ${ergebnis.richtung === 'zunahme' ? 'bg-green-500' : ergebnis.richtung === 'abnahme' ? 'bg-red-500' : 'bg-gray-500 dark:bg-gray-400'}`}
                          style={{ width: `${getBalkenBreite(ergebnis.neuerWert, Math.max(Math.abs(ergebnis.alterWert), Math.abs(ergebnis.neuerWert)))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Umkehr-Info */}
              {ergebnis.richtung !== 'gleich' && ergebnis.neuerWert !== 0 && (
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    <strong>🔄 Umkehr:</strong> Um von {fmtZ(ergebnis.neuerWert)}{e ? ` ${e}` : ''} zurück auf {fmtZ(ergebnis.alterWert)}{e ? ` ${e}` : ''} zu kommen, wäre eine Veränderung von <strong>{ergebnis.umkehrProzent > 0 ? '+' : ''}{fmtP(ergebnis.umkehrProzent)}%</strong> nötig.
                  </p>
                  {Math.abs(ergebnis.prozent) !== Math.abs(ergebnis.umkehrProzent) && (
                    <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">
                      Hinweis: {ergebnis.richtung === 'zunahme' ? '+' : ''}{fmtP(ergebnis.prozent)}% und {ergebnis.umkehrProzent > 0 ? '+' : ''}{fmtP(ergebnis.umkehrProzent)}% sind <strong>nicht symmetrisch</strong> — prozentuale Veränderungen beziehen sich immer auf den jeweiligen Ausgangswert.
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Tipp:</strong> Prozentuale Veränderungen sind nicht symmetrisch — eine Steigerung um 50% gefolgt von einer Senkung um 50% ergibt nicht den Ausgangswert, sondern nur 75% davon. Bei negativen Ausgangswerten wird der Betrag als Bezugsgröße verwendet.
            </p>
          </div>

          <CrossLink href="/alltag/prozentrechner" emoji="🔢" text="Prozente berechnen — Grundwert, Prozentwert, Prozentsatz" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.divisionDurchNull
              ? `Prozentuale Veränderung: Nicht berechenbar (Ausgangswert ist 0)`
              : `Veränderung: ${fmtZ(ergebnis.alterWert)}${e ? ` ${e}` : ''} → ${fmtZ(ergebnis.neuerWert)}${e ? ` ${e}` : ''} = ${ergebnis.prozent > 0 ? '+' : ''}${fmtP(ergebnis.prozent)}% (${ergebnis.absolut > 0 ? '+' : ''}${fmtZ(ergebnis.absolut)}${e ? ` ${e}` : ''})`}
            seitenTitel="Prozentuale-Veränderung-Rechner"
          />

          <AiExplain
            rechnerName="Prozentuale-Veränderung-Rechner"
            eingaben={{
              alterWert: `${fmtZ(nAlterWert)}${e ? ` ${e}` : ''}`,
              neuerWert: `${fmtZ(nNeuerWert)}${e ? ` ${e}` : ''}`,
            }}
            ergebnis={ergebnis.divisionDurchNull
              ? { hinweis: 'Division durch Null — nicht berechenbar' }
              : {
                  prozentualeVeraenderung: `${ergebnis.prozent > 0 ? '+' : ''}${ergebnis.prozent}%`,
                  absolut: `${ergebnis.absolut > 0 ? '+' : ''}${ergebnis.absolut}`,
                  faktor: ergebnis.faktor,
                  richtung: ergebnis.richtung,
                }
            }
          />
        </>
      )}
    </div>
  );
}
