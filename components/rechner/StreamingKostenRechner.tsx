'use client';

import { useState, useMemo } from 'react';
import { streamingDienste, berechneStreamingKosten, type StreamingErgebnis } from '@/lib/berechnungen/streaming-kosten';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

function formatEuro(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function StreamingKostenRechner() {
  // auswahl: dienstId -> variantenIndex (nur aktive Dienste)
  const [auswahl, setAuswahl] = useState<Record<string, number>>({});
  const [sonstige, setSonstige] = useState('');

  function toggleDienst(id: string) {
    setAuswahl(prev => {
      const next = { ...prev };
      if (id in next) {
        delete next[id];
      } else {
        next[id] = 0;
      }
      return next;
    });
  }

  function setVariante(id: string, index: number) {
    setAuswahl(prev => ({ ...prev, [id]: index }));
  }

  const sonstigeBetrag = parseFloat(sonstige.replace(',', '.')) || 0;

  const ergebnis: StreamingErgebnis | null = useMemo(() => {
    if (Object.keys(auswahl).length === 0 && sonstigeBetrag === 0) return null;
    return berechneStreamingKosten(auswahl, sonstigeBetrag);
  }, [auswahl, sonstigeBetrag]);

  function ergebnisText(): string {
    if (!ergebnis) return '';
    const lines = [
      'Streaming-Kosten-Rechner — Ergebnis',
      `Aktive Abos: ${ergebnis.abos.length}${ergebnis.sonstigeBetrag > 0 ? ' + Sonstige' : ''}`,
      ...ergebnis.ranking.map(a => `  ${a.name} (${a.varianteLabel}): ${formatEuro(a.preis)} €/Monat`),
      ...(ergebnis.sonstigeBetrag > 0 ? [`  Sonstige: ${formatEuro(ergebnis.sonstigeBetrag)} €/Monat`] : []),
      '',
      `Monatlich: ${formatEuro(ergebnis.monatlich)} €`,
      `Jährlich: ${formatEuro(ergebnis.jaehrlich)} €`,
      `In 5 Jahren: ${formatEuro(ergebnis.fuenfJahre)} €`,
      `In 10 Jahren: ${formatEuro(ergebnis.zehnJahre)} €`,
      `Das entspricht ${ergebnis.arbeitsstundenMindestlohn.toFixed(0)} Stunden Arbeit zum Mindestlohn pro Jahr.`,
    ];
    return lines.join('\n');
  }

  return (
    <div className="space-y-6">
      {/* Abo-Auswahl */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Welche Streaming-Abos haben Sie?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {streamingDienste.map(dienst => {
            const aktiv = dienst.id in auswahl;
            return (
              <div
                key={dienst.id}
                className={`rounded-xl border p-4 transition-all cursor-pointer ${
                  aktiv
                    ? 'border-primary-400 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-300 dark:ring-primary-600'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aktiv}
                    onChange={() => toggleDienst(dienst.id)}
                    className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="font-medium text-gray-900 dark:text-white">{dienst.name}</span>
                </label>

                {aktiv && dienst.varianten.length > 1 && (
                  <div className="mt-3 ml-8 flex flex-wrap gap-2">
                    {dienst.varianten.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setVariante(dienst.id, i)}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          auswahl[dienst.id] === i
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-400'
                        }`}
                      >
                        {v.label} — {formatEuro(v.preis)} €
                      </button>
                    ))}
                  </div>
                )}

                {aktiv && dienst.varianten.length === 1 && (
                  <p className="mt-1 ml-8 text-sm text-gray-500 dark:text-gray-400">
                    {formatEuro(dienst.varianten[0].preis)} € / Monat
                  </p>
                )}
              </div>
            );
          })}

          {/* Sonstige */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <label className="block font-medium text-gray-900 dark:text-white mb-2">
              Sonstige Abos
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={sonstige}
                onChange={e => setSonstige(e.target.value)}
                className="w-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-gray-500 dark:text-gray-400">€ / Monat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && ergebnis.monatlich > 0 && (
        <div className="space-y-6">
          {/* Gesamtkosten-Header */}
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/20 rounded-2xl border border-primary-200 dark:border-primary-700/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ihre monatlichen Streaming-Kosten</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-primary-700 dark:text-primary-300">
              {formatEuro(ergebnis.monatlich)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {ergebnis.abos.length} Abo{ergebnis.abos.length !== 1 ? 's' : ''}
              {ergebnis.sonstigeBetrag > 0 ? ' + Sonstige' : ''}
            </p>
          </div>

          {/* Hochrechnungen */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Jahr</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatEuro(ergebnis.jaehrlich)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">In 5 Jahren</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatEuro(ergebnis.fuenfJahre)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">In 10 Jahren</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatEuro(ergebnis.zehnJahre)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitsstunden</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{ergebnis.arbeitsstundenMindestlohn.toFixed(0)} h</p>
              <p className="text-xs text-gray-600 dark:text-gray-500">pro Jahr (Mindestlohn)</p>
            </div>
          </div>

          {/* Ranking */}
          {ergebnis.ranking.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ihre Abos — teuerstes zuerst</h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {ergebnis.ranking.map((abo, i) => {
                  const anteil = (abo.preis / ergebnis.monatlich) * 100;
                  return (
                    <div
                      key={abo.dienstId}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        i < ergebnis.ranking.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                      }`}
                    >
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-500 w-6 text-right">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white truncate">
                            {abo.name} <span className="text-sm text-gray-500 dark:text-gray-400">({abo.varianteLabel})</span>
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white ml-2 whitespace-nowrap">{formatEuro(abo.preis)} €</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${anteil}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {ergebnis.sonstigeBetrag > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-500 w-6 text-right">&bull;</span>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">Sonstige</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formatEuro(ergebnis.sonstigeBetrag)} €</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spar-Tipp */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
            <p className="font-semibold text-green-800 dark:text-green-300 mb-1">💡 Spar-Tipp</p>
            <p className="text-sm text-green-700 dark:text-green-400">
              Rotieren Sie Ihre Streaming-Abos monatlich, statt alle gleichzeitig zu bezahlen. Schauen Sie einen Monat Netflix, den n&auml;chsten Disney+ — so sparen Sie bis zu 50&ndash;70 % der Kosten bei gleichem Angebot.
            </p>
            {ergebnis.abos.length >= 3 && (
              <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                Bei {ergebnis.abos.length} aktiven Abos k&ouml;nnten Sie durch Rotation ca. <strong>{formatEuro(ergebnis.monatlich * 0.5)} €</strong> pro Monat sparen — das sind <strong>{formatEuro(ergebnis.monatlich * 0.5 * 12)} €</strong> im Jahr!
              </p>
            )}
          </div>

          <CrossLink href="/alltag/abo-rechner" emoji="📋" text="Alle Abos im Blick — Monatskosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText()}
            seitenTitel="Streaming-Kosten-Rechner"
          />

          <AiExplain
            rechnerName="Streaming-Kosten-Rechner"
            eingaben={{ anzahlAbos: ergebnis.abos.length, aboNamen: ergebnis.abos.map(a => a.name).join(', ') }}
            ergebnis={{ monatlich: ergebnis.monatlich, jaehrlich: ergebnis.jaehrlich, fuenfJahre: ergebnis.fuenfJahre, zehnJahre: ergebnis.zehnJahre, arbeitsstundenMindestlohn: ergebnis.arbeitsstundenMindestlohn }}
          />
        </div>
      )}
    </div>
  );
}
