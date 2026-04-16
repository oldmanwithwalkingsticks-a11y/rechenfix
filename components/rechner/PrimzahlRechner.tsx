'use client';

import { useState, useMemo } from 'react';
import { pruefePrimzahl, primfaktorzerlegung, primzahlenImBereich } from '@/lib/berechnungen/primzahl';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import TabGroup from '@/components/ui/TabGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const TABS = [
  { id: 'check', label: 'Primzahl-Check' },
  { id: 'zerlegung', label: 'Primfaktorzerlegung' },
  { id: 'bereich', label: 'Primzahlen im Bereich' },
];

export default function PrimzahlRechner() {
  const [tab, setTab] = useState('check');
  const [checkZahl, setCheckZahl] = useState('97');
  const [zerlegungZahl, setZerlegungZahl] = useState('360');
  const [von, setVon] = useState('1');
  const [bis, setBis] = useState('100');

  const checkErgebnis = useMemo(() => {
    const n = parseDeutscheZahl(checkZahl);
    if (n < 0 || !Number.isFinite(n)) return null;
    return pruefePrimzahl(n);
  }, [checkZahl]);

  const zerlegungErgebnis = useMemo(() => {
    const n = parseDeutscheZahl(zerlegungZahl);
    if (n < 2 || !Number.isFinite(n)) return null;
    return primfaktorzerlegung(n);
  }, [zerlegungZahl]);

  const bereichErgebnis = useMemo(() => {
    const v = parseDeutscheZahl(von);
    const b = parseDeutscheZahl(bis);
    if (v < 1 || b < v || b > 100000) return null;
    return primzahlenImBereich(v, b);
  }, [von, bis]);

  const ergebnisText = useMemo(() => {
    if (tab === 'check' && checkErgebnis) {
      return `${checkErgebnis.zahl}: ${checkErgebnis.istPrim ? 'Ist eine Primzahl' : 'Keine Primzahl'} — ${checkErgebnis.begruendung}`;
    }
    if (tab === 'zerlegung' && zerlegungErgebnis) {
      return `${zerlegungErgebnis.zahl} = ${zerlegungErgebnis.darstellung}`;
    }
    if (tab === 'bereich' && bereichErgebnis) {
      return `${bereichErgebnis.anzahl} Primzahlen zwischen ${bereichErgebnis.von} und ${bereichErgebnis.bis}`;
    }
    return '';
  }, [tab, checkErgebnis, zerlegungErgebnis, bereichErgebnis]);

  return (
    <div>
      <TabGroup tabs={TABS} activeId={tab} onChange={setTab} ariaLabel="Primzahl-Modus wählen">
        {/* Check */}
        {tab === 'check' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl eingeben</label>
              <NummerEingabe value={checkZahl} onChange={setCheckZahl} placeholder="97" />
            </div>

            {checkErgebnis && (
              <div className={`${checkErgebnis.istPrim ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'} border rounded-xl p-5 text-center`}>
                <p className="text-4xl font-extrabold mb-2">
                  {checkErgebnis.istPrim ? (
                    <span className="text-green-700 dark:text-green-400">✓ Primzahl</span>
                  ) : (
                    <span className="text-red-700 dark:text-red-400">✗ Keine Primzahl</span>
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{checkErgebnis.begruendung}</p>
              </div>
            )}
          </div>
        )}

        {/* Zerlegung */}
        {tab === 'zerlegung' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl eingeben</label>
              <NummerEingabe value={zerlegungZahl} onChange={setZerlegungZahl} placeholder="360" />
            </div>

            {zerlegungErgebnis && (
              <>
                {/* Hauptergebnis */}
                <div className="result-box">
                  <p className="text-white/70 text-sm mb-1">Primfaktorzerlegung von {zerlegungErgebnis.zahl}</p>
                  <p className="text-3xl sm:text-4xl font-bold break-all">{zerlegungErgebnis.darstellung}</p>
                </div>

                {/* Rechenweg */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {zerlegungErgebnis.rechenweg.map((schritt, i) => (
                      <div key={i} className="px-4 py-2 text-sm font-mono text-gray-700 dark:text-gray-300">
                        {schritt}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Bereich */}
        {tab === 'bereich' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Von</label>
                <NummerEingabe value={von} onChange={setVon} placeholder="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bis (max. 100.000)</label>
                <NummerEingabe value={bis} onChange={setBis} placeholder="100" />
              </div>
            </div>

            {bereichErgebnis && (
              <>
                <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-4 text-center">
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                    Primzahlen zwischen {bereichErgebnis.von} und {bereichErgebnis.bis}
                  </p>
                  <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                    {bereichErgebnis.anzahl}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex flex-wrap gap-2">
                    {bereichErgebnis.primzahlen.length <= 500 ? bereichErgebnis.primzahlen.map(p => (
                      <span
                        key={p}
                        className="inline-block px-2 py-1 rounded-md bg-green-100 dark:bg-green-500/15 text-green-800 dark:text-green-300 text-xs font-mono font-medium"
                      >
                        {p}
                      </span>
                    )) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bereichErgebnis.anzahl} Primzahlen — Liste zu lang für Anzeige. Erste 10: {bereichErgebnis.primzahlen.slice(0, 10).join(', ')} … Letzte 10: … {bereichErgebnis.primzahlen.slice(-10).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </TabGroup>

      {/* Ergebnis-Aktionen & AiExplain — nur anzeigen wenn Ergebnis da */}
      {ergebnisText && (
        <div className="mt-4">
          <CrossLink href="/mathe/quersumme-rechner" emoji="➕" text="Quersumme berechnen" />
          <CrossLink href="/mathe/bruchrechner" emoji="🔢" text="Brüche berechnen" />
          <CrossLink href="/mathe/wissenschaftlicher-taschenrechner" emoji="🧮" text="Wissenschaftlicher Taschenrechner" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText}
            seitenTitel="Primzahl-Rechner"
          />

          <AiExplain
            rechnerName="Primzahl-Rechner"
            eingaben={{
              modus: tab,
              ...(tab === 'check' ? { zahl: parseDeutscheZahl(checkZahl) } : {}),
              ...(tab === 'zerlegung' ? { zahl: parseDeutscheZahl(zerlegungZahl) } : {}),
              ...(tab === 'bereich' ? { von: parseDeutscheZahl(von), bis: parseDeutscheZahl(bis) } : {}),
            }}
            ergebnis={{
              ...(tab === 'check' && checkErgebnis ? { istPrim: checkErgebnis.istPrim, begruendung: checkErgebnis.begruendung } : {}),
              ...(tab === 'zerlegung' && zerlegungErgebnis ? { darstellung: zerlegungErgebnis.darstellung } : {}),
              ...(tab === 'bereich' && bereichErgebnis ? { anzahl: bereichErgebnis.anzahl } : {}),
            }}
          />
        </div>
      )}
    </div>
  );
}
