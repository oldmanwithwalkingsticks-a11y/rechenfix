'use client';

import { useState, useMemo } from 'react';
import { berechneEtfSparplan } from '@/lib/berechnungen/etf-sparplan';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AffiliateBox } from '@/components/AffiliateBox';

export default function EtfSparplanRechner() {
  const [sparrate, setSparrate] = useState('200');
  const [einmalanlage, setEinmalanlage] = useState('0');
  const [anlagedauer, setAnlagedauer] = useState('20');
  const [rendite, setRendite] = useState('7');
  const [dynamik, setDynamik] = useState(false);
  const [dynamikProzent, setDynamikProzent] = useState('2');
  const [steuern, setSteuern] = useState(false);
  const [familienstand, setFamilienstand] = useState<'single' | 'verheiratet'>('single');

  const [tabelleOffen, setTabelleOffen] = useState(false);

  const nSparrate = parseDeutscheZahl(sparrate);
  const nEinmalanlage = parseDeutscheZahl(einmalanlage);
  const nAnlagedauer = parseInt(anlagedauer) || 0;
  const nRendite = parseDeutscheZahl(rendite);
  const nDynamikProzent = parseDeutscheZahl(dynamikProzent);
  const freibetrag = familienstand === 'verheiratet' ? 2000 : 1000;

  const ergebnis = useMemo(
    () =>
      berechneEtfSparplan({
        sparrate: nSparrate,
        einmalanlage: nEinmalanlage,
        anlagedauer: nAnlagedauer,
        rendite: nRendite,
        dynamik,
        dynamikProzent: nDynamikProzent,
        steuern,
        freibetrag,
      }),
    [nSparrate, nEinmalanlage, nAnlagedauer, nRendite, dynamik, nDynamikProzent, steuern, freibetrag],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Chart-Daten
  const chartData = useMemo(() => {
    if (!ergebnis || ergebnis.jahresDaten.length === 0) return null;
    const maxKapital = ergebnis.jahresDaten[ergebnis.jahresDaten.length - 1].kapital;
    return { maxKapital };
  }, [ergebnis]);

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliche Sparrate</label>
          <NummerEingabe value={sparrate} onChange={setSparrate} placeholder="z.B. 200" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einmalanlage zu Beginn</label>
          <NummerEingabe value={einmalanlage} onChange={setEinmalanlage} placeholder="z.B. 5000" einheit="€" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anlagedauer</label>
          <NummerEingabe value={anlagedauer} onChange={setAnlagedauer} placeholder="z.B. 20" einheit="Jahre" />
          <input
            type="range"
            min={1}
            max={50}
            value={nAnlagedauer || 20}
            onChange={e => setAnlagedauer(e.target.value)}
            className="w-full mt-2 accent-primary-500"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-500">
            <span>1</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erwartete jährl. Rendite</label>
          <NummerEingabe value={rendite} onChange={setRendite} placeholder="z.B. 7" einheit="%" />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Historische Durchschnittsrendite MSCI World: ca. 7–8 % p.a.
          </p>
        </div>
      </div>

      {/* Dynamik Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dynamische Sparrate</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Ohne Dynamik' },
            { key: true, label: 'Mit jährlicher Erhöhung' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setDynamik(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                dynamik === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {dynamik && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jährliche Erhöhung</label>
          <NummerEingabe value={dynamikProzent} onChange={setDynamikProzent} placeholder="z.B. 2" einheit="%" />
        </div>
      )}

      {/* Steuern Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Steuern berücksichtigen?</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Ohne Steuern' },
            { key: true, label: 'Nach Steuern' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setSteuern(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                steuern === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {steuern && (
        <div className="mb-6">
          <label htmlFor="etfsparplan-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sparerpauschbetrag</label>
          <select id="etfsparplan-select-1"
            value={familienstand}
            onChange={e => setFamilienstand(e.target.value as 'single' | 'verheiratet')}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="single">Single (1.000 € Freibetrag)</option>
            <option value="verheiratet">Verheiratet (2.000 € Freibetrag)</option>
          </select>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && nSparrate > 0 && nAnlagedauer > 0 && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  {steuern ? 'Endkapital nach Steuern' : 'Endkapital'}
                </p>
                <p className="text-5xl font-bold">
                  {fmt(steuern ? ergebnis.endkapitalNachSteuern : ergebnis.endkapital)}{' '}
                  <span className="text-2xl">€</span>
                </p>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Summe Ihrer Einzahlungen</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.summeEinzahlungen)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Davon Rendite / Gewinn</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+{fmt(ergebnis.renditeAnteil)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Renditeanteil</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{fmtDez(ergebnis.renditeAnteilProzent)} %</span>
              </div>
              {steuern && ergebnis.steuer > 0 && (
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Abgezogene Steuer</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">−{fmt(ergebnis.steuer)} €</span>
                </div>
              )}
            </div>
            {nAnlagedauer <= 3 && (
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Hinweis: Bei einem Sparplan wird das Geld schrittweise investiert. Die Rendite wirkt nur auf das bereits angelegte Kapital — bei kurzen Laufzeiten ist der Zinseszinseffekt daher noch gering.
              </p>
            )}
          </div>

          {/* Flächendiagramm */}
          {chartData && ergebnis.jahresDaten.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Vermögensentwicklung</h2>
              <div className="relative h-64">
                {/* Y-Achse Labels */}
                <div className="absolute left-0 top-0 bottom-6 w-16 flex flex-col justify-between text-xs text-gray-600 dark:text-gray-500 text-right pr-2">
                  <span>{fmt(chartData.maxKapital)} €</span>
                  <span>{fmt(chartData.maxKapital / 2)} €</span>
                  <span>0 €</span>
                </div>
                {/* Chart-Bereich */}
                <div className="ml-16 h-full flex gap-px pb-6">
                  {ergebnis.jahresDaten.map((jd) => {
                    const einzPct = (jd.einzahlungenKumuliert / chartData.maxKapital) * 100;
                    const renditePct = (jd.renditeKumuliert / chartData.maxKapital) * 100;
                    return (
                      <div
                        key={jd.jahr}
                        className="flex-1 flex flex-col justify-end group relative"
                        style={{ minWidth: 0 }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 pointer-events-none">
                          <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                            <div className="font-bold mb-1">Jahr {jd.jahr}</div>
                            <div>Kapital: {fmt(jd.kapital)} €</div>
                            <div>Einzahlungen: {fmt(jd.einzahlungenKumuliert)} €</div>
                            <div className="text-green-300 dark:text-green-600">Rendite: +{fmt(jd.renditeKumuliert)} €</div>
                          </div>
                        </div>
                        {/* Rendite (oben, grün) */}
                        <div
                          className="bg-green-400/70 dark:bg-green-500/50 group-hover:bg-green-500 dark:group-hover:bg-green-400/70 transition-colors rounded-t-sm"
                          style={{ height: `${Math.max(renditePct, 0)}%` }}
                        />
                        {/* Einzahlungen (unten, blau) */}
                        <div
                          className="bg-blue-400/70 dark:bg-blue-500/50 group-hover:bg-blue-500 dark:group-hover:bg-blue-400/70 transition-colors"
                          style={{ height: `${einzPct}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* X-Achse */}
                <div className="ml-16 flex justify-between text-xs text-gray-600 dark:text-gray-500">
                  <span>1</span>
                  {nAnlagedauer >= 10 && <span>{Math.round(nAnlagedauer / 2)}</span>}
                  <span>{nAnlagedauer} J.</span>
                </div>
              </div>
              {/* Legende */}
              <div className="flex gap-4 mt-3 justify-center text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-blue-400/70 dark:bg-blue-500/50" /> Einzahlungen
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-green-400/70 dark:bg-green-500/50" /> Rendite
                </span>
              </div>
            </div>
          )}

          {/* Jahr-für-Jahr Tabelle (ausklappbar) */}
          {ergebnis.jahresDaten.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-6 overflow-hidden">
              <button
                onClick={() => setTabelleOffen(!tabelleOffen)}
                className="w-full px-5 py-4 flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span>Jahr-für-Jahr-Übersicht</span>
                <span className={`transition-transform ${tabelleOffen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {tabelleOffen && (
                <div className="px-5 pb-5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 pr-3 text-gray-600 dark:text-gray-400 font-medium">Jahr</th>
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Sparrate/Mon.</th>
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Einzahlungen</th>
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Kapital</th>
                        <th className="text-right py-2 pl-3 text-gray-600 dark:text-gray-400 font-medium">Rendite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ergebnis.jahresDaten.map(jd => (
                        <tr key={jd.jahr} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <td className="py-2 pr-3 text-gray-800 dark:text-gray-200">{jd.jahr}</td>
                          <td className="py-2 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(jd.sparrateMonat)} €</td>
                          <td className="py-2 px-3 text-right text-gray-800 dark:text-gray-200">{fmt(jd.einzahlungenKumuliert)} €</td>
                          <td className="py-2 px-3 text-right font-semibold text-gray-800 dark:text-gray-200">{fmt(jd.kapital)} €</td>
                          <td className="py-2 pl-3 text-right font-semibold text-green-600 dark:text-green-400">+{fmt(jd.renditeKumuliert)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Vergleichsbox */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Vergleich:</strong> Ohne Sparplan auf dem Girokonto: <strong>{fmt(ergebnis.ohneRenditeEndkapital)} €</strong>{' '}
              — Ihr Vorteil durch den ETF-Sparplan:{' '}
              <strong className="text-green-700 dark:text-green-400">
                +{fmt((steuern ? ergebnis.endkapitalNachSteuern : ergebnis.endkapital) - ergebnis.ohneRenditeEndkapital)} €
              </strong>
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Diese Berechnung basiert auf einer gleichmäßigen jährlichen Rendite. In der Realität schwanken ETF-Kurse. Historische Renditen sind keine Garantie für zukünftige Ergebnisse. Diese Berechnung stellt keine Anlageberatung dar.
            </p>
          </div>

          <CrossLink href="/finanzen/rentenrechner" emoji="🏖️" text="Reicht das für die Rente? Rentenlücke berechnen" />
          <CrossLink href="/finanzen/sparrechner" emoji="🏦" text="Klassischer Sparplan im Vergleich" />

          <AffiliateBox programId="verivox" context="etf" />

          <ErgebnisAktionen
            ergebnisText={`ETF-Sparplan: ${fmt(nSparrate)} €/Monat, ${nAnlagedauer} Jahre, ${fmtDez(nRendite)}% Rendite → Endkapital: ${fmt(steuern ? ergebnis.endkapitalNachSteuern : ergebnis.endkapital)} € (Einzahlungen: ${fmt(ergebnis.summeEinzahlungen)} €, Rendite: +${fmt(ergebnis.renditeAnteil)} €)`}
            seitenTitel="ETF-Sparplanrechner"
          />

          <AiExplain
            rechnerName="ETF-Sparplanrechner"
            eingaben={{
              sparrate: nSparrate,
              einmalanlage: nEinmalanlage,
              anlagedauer: nAnlagedauer,
              rendite: nRendite,
              dynamik: dynamik ? `Ja (${nDynamikProzent}% p.a.)` : 'Nein',
              steuern: steuern ? `Ja (Freibetrag: ${freibetrag} €)` : 'Nein',
            }}
            ergebnis={{
              endkapital: ergebnis.endkapital,
              summeEinzahlungen: ergebnis.summeEinzahlungen,
              renditeAnteil: ergebnis.renditeAnteil,
              ...(steuern ? { steuer: ergebnis.steuer, endkapitalNachSteuern: ergebnis.endkapitalNachSteuern } : {}),
            }}
          />
        </>
      )}
    </div>
  );
}
