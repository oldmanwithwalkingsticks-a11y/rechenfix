'use client';

import { useState, useMemo } from 'react';
import {
  berechneScheidungskosten,
  type Scheidungsart,
} from '@/lib/berechnungen/scheidungskosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function ScheidungskostenRechner() {
  const [netto, setNetto] = useState('5000');
  const [art, setArt] = useState<Scheidungsart>('einvernehmlich');
  const [versorgungsausgleich, setVersorgungsausgleich] = useState(true);
  const [zugewinnausgleich, setZugewinnausgleich] = useState(false);
  const [unterhalt, setUnterhalt] = useState(false);
  const [sorgerecht, setSorgerecht] = useState(false);
  const [ehewohnung, setEhewohnung] = useState(false);

  const ergebnis = useMemo(
    () => berechneScheidungskosten({
      nettoeinkommenGesamt: parseDeutscheZahl(netto),
      art,
      versorgungsausgleich,
      zugewinnausgleich,
      unterhalt,
      sorgerecht,
      ehewohnung,
    }),
    [netto, art, versorgungsausgleich, zugewinnausgleich, unterhalt, sorgerecht, ehewohnung],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Nettoeinkommen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Gemeinsames Nettoeinkommen (beide Ehepartner)
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="5.000" einheit="€/Monat" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Verfahrenswert beträgt das 3-fache Ihres gemeinsamen monatlichen Nettoeinkommens (mindestens 3.000 €).
        </p>
      </div>

      {/* === 2: Art === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Art der Scheidung
        </h2>
        <RadioToggleGroup
          name="scheidung-art"
          legend="Art der Scheidung"
          srOnlyLegend
          options={[
            { value: 'einvernehmlich', label: '🤝 Einvernehmlich', description: '1 Anwalt, kürzer, günstiger' },
            { value: 'streitig', label: '⚔️ Streitig', description: '2 Anwälte, Folgesachen, teurer' },
          ]}
          value={art}
          onChange={(v) => setArt(v as Scheidungsart)}
          columns={2}
        />
      </div>

      {/* === 3: Versorgungsausgleich === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Versorgungsausgleich durchführen?
        </h2>
        <RadioToggleGroup
          name="scheidung-versorgung"
          legend="Versorgungsausgleich durchführen?"
          srOnlyLegend
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ]}
          value={versorgungsausgleich ? 'ja' : 'nein'}
          onChange={(v) => setVersorgungsausgleich(v === 'ja')}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Der Versorgungsausgleich (Aufteilung der Rentenansprüche) ist der gesetzliche Regelfall und erhöht den Verfahrenswert um 10%.
        </p>
      </div>

      {/* === 4: Folgesachen (nur streitig) === */}
      {art === 'streitig' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Folgesachen (streitig zu klären)
          </h2>
          <div className="space-y-2">
            {([
              ['zugewinnausgleich', 'Zugewinnausgleich', '+20% Verfahrenswert', zugewinnausgleich, setZugewinnausgleich],
              ['unterhalt', 'Unterhaltsregelung', '+15% Verfahrenswert', unterhalt, setUnterhalt],
              ['sorgerecht', 'Sorgerecht / Umgang', '+4.000 € Verfahrenswert', sorgerecht, setSorgerecht],
              ['ehewohnung', 'Ehewohnung / Hausrat', '+4.000 € Verfahrenswert', ehewohnung, setEhewohnung],
            ] as [string, string, string, boolean, (v: boolean) => void][]).map(([key, label, hint, value, setter]) => (
              <label
                key={key}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 cursor-pointer hover:border-primary-300"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={e => setter(e.target.checked)}
                  className="w-5 h-5 accent-primary-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{hint}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Geschätzte Gesamtkosten</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.gesamtkosten)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Pro Person (hälftige Teilung): <strong>{fmtEuro(ergebnis.proPerson)} €</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Verfahrenswert Ehe (Netto × 3)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.verfahrenswertBasis)} €</td>
              </tr>
              {ergebnis.verfahrenswertVA > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Versorgungsausgleich</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">+{fmtEuro(ergebnis.verfahrenswertVA)} €</td>
                </tr>
              )}
              {ergebnis.verfahrenswertFolgesachen > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Folgesachen</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">+{fmtEuro(ergebnis.verfahrenswertFolgesachen)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Verfahrenswert gesamt</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.verfahrenswertGesamt)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Gerichtskosten (2,0 Gebühren)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.gerichtskosten)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Verfahrensgebühr (1,3 RVG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.verfahrensgebuehr)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Terminsgebühr (1,2 RVG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.terminsgebuehr)} €</td>
              </tr>
              {ergebnis.einigungsgebuehr > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Einigungsgebühr (1,0 RVG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.einigungsgebuehr)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Auslagenpauschale</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.auslagenpauschale)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ 19% MwSt auf Anwalt</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.mwst)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Anwalt brutto × {ergebnis.anzahlAnwaelte}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.anwaltskostenGesamt)} €</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-500/10 font-bold">
                <td className="px-4 py-3 text-red-800 dark:text-red-300 whitespace-nowrap">= Gesamtkosten</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-red-700 dark:text-red-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtkosten)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Pro Person (hälftig)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtEuro(ergebnis.proPerson)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vergleich einvernehmlich vs. streitig */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: Einvernehmlich vs. Streitig</h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
          <div className={`p-4 ${art === 'einvernehmlich' ? 'bg-green-50 dark:bg-green-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">🤝 Einvernehmlich</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{fmtEuro(ergebnis.gesamtkostenEinvernehmlich)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 Anwalt</div>
          </div>
          <div className={`p-4 ${art === 'streitig' ? 'bg-red-50 dark:bg-red-500/10' : ''}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">⚔️ Streitig</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">{fmtEuro(ergebnis.gesamtkostenStreitig)} €</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 Anwälte{(zugewinnausgleich || unterhalt || sorgerecht || ehewohnung) ? ' + Folgesachen' : ''}</div>
          </div>
        </div>
        {ergebnis.ersparnisEinvernehmlich > 0 && (
          <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-500/10 border-t border-gray-100 dark:border-gray-700 text-sm text-indigo-800 dark:text-indigo-300">
            <strong>💡 Ersparnis bei Einvernehmen:</strong> {fmtEuro(ergebnis.ersparnisEinvernehmlich)} € (−{ergebnis.ersparnisProzent}%)
          </div>
        )}
      </div>

      {/* Verfahrenskostenhilfe */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💰 Verfahrenskostenhilfe:</strong> Bei geringem Einkommen können Sie staatliche Verfahrenskostenhilfe (VKH) beantragen. Die Kosten werden dann ganz oder teilweise vom Staat übernommen. Antrag beim Familiengericht einreichen.
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung basiert auf dem FamGKG und RVG und ist eine Schätzung. Tatsächliche Kosten können abweichen, z.B. durch weitere Folgesachen, Gutachter, Mehrvergleichsgebühr oder individuelle Honorarvereinbarungen.
        </p>
      </div>

      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif nach der Scheidung prüfen" />
      <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfristen berechnen" />
      <CrossLink href="/arbeit/abfindungsrechner" emoji="💼" text="Abfindung berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Scheidungskosten (${art}): ${fmtEuro(ergebnis.gesamtkosten)} € | Verfahrenswert: ${fmtEuro(ergebnis.verfahrenswertGesamt)} € | Gericht: ${fmtEuro(ergebnis.gerichtskosten)} € | Anwalt: ${fmtEuro(ergebnis.anwaltskostenGesamt)} € | Pro Person: ${fmtEuro(ergebnis.proPerson)} €`}
        seitenTitel="Scheidungskosten-Rechner"
      />

      <AffiliateBox programId="ks-auxilia" context="scheidung" />

      <AiExplain
        rechnerName="Scheidungskosten-Rechner"
        eingaben={{
          nettoeinkommen: `${fmtEuro(parseDeutscheZahl(netto))} €/Monat`,
          art,
          versorgungsausgleich: versorgungsausgleich ? 'Ja' : 'Nein',
          folgesachen: art === 'streitig'
            ? [zugewinnausgleich && 'Zugewinn', unterhalt && 'Unterhalt', sorgerecht && 'Sorgerecht', ehewohnung && 'Ehewohnung'].filter(Boolean).join(', ') || 'keine'
            : 'n/a',
        }}
        ergebnis={{
          verfahrenswert: `${ergebnis.verfahrenswertGesamt} €`,
          gerichtskosten: `${ergebnis.gerichtskosten} €`,
          anwaltskosten: `${ergebnis.anwaltskostenGesamt} €`,
          gesamt: `${ergebnis.gesamtkosten} €`,
          proPerson: `${ergebnis.proPerson} €`,
        }}
      />
    </div>
  );
}
