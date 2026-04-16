'use client';

import { useState, useMemo } from 'react';
import { berechneSteuerklassenVergleich } from '@/lib/berechnungen/steuerklassen-vergleich';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import { BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEuro0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const KINDER_OPTIONEN = [
  { value: '0', label: '0' },
  { value: '0.5', label: '0,5' },
  { value: '1', label: '1' },
  { value: '1.5', label: '1,5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2,5' },
  { value: '3', label: '3 oder mehr' },
];

export default function SteuerklassenVergleichRechner() {
  const [brutto1, setBrutto1] = useState('55000');
  const [brutto2, setBrutto2] = useState('35000');
  const [kist1, setKist1] = useState(false);
  const [kist2, setKist2] = useState(false);
  const [bundesland, setBundesland] = useState('BW');
  const [kinder, setKinder] = useState('0');

  const kirchensteuersatz = useMemo(() => {
    const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
    return (bl?.kirchensteuersatz ?? 9) as 8 | 9;
  }, [bundesland]);

  const ergebnis = useMemo(
    () => berechneSteuerklassenVergleich({
      bruttoJahr1: parseDeutscheZahl(brutto1),
      bruttoJahr2: parseDeutscheZahl(brutto2),
      kirchensteuer1: kist1,
      kirchensteuer2: kist2,
      kirchensteuersatz,
      kinderfreibetraege: parseFloat(kinder) || 0,
    }),
    [brutto1, brutto2, kist1, kist2, kirchensteuersatz, kinder],
  );

  const maxNetto = Math.max(...ergebnis.kombinationen.map(k => k.nettoGesamtMonat), 1);

  return (
    <div>
      {/* === 1: Gehalt Person 1 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bruttojahresgehalt Person 1
        </h2>
        <NummerEingabe value={brutto1} onChange={setBrutto1} placeholder="55.000" einheit="€" />
      </div>

      {/* === 2: Gehalt Person 2 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Bruttojahresgehalt Person 2
        </h2>
        <NummerEingabe value={brutto2} onChange={setBrutto2} placeholder="35.000" einheit="€" />
      </div>

      {/* === 3: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Kirchensteuer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Person 1</p>
            <RadioToggleGroup
              name="skv-kist1"
              legend="Kirchensteuer Person 1"
              srOnlyLegend
              options={[
                { value: 'nein', label: 'Nein' },
                { value: 'ja', label: '⛪ Ja' },
              ]}
              value={kist1 ? 'ja' : 'nein'}
              onChange={(v) => setKist1(v === 'ja')}
            />
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Person 2</p>
            <RadioToggleGroup
              name="skv-kist2"
              legend="Kirchensteuer Person 2"
              srOnlyLegend
              options={[
                { value: 'nein', label: 'Nein' },
                { value: 'ja', label: '⛪ Ja' },
              ]}
              value={kist2 ? 'ja' : 'nein'}
              onChange={(v) => setKist2(v === 'ja')}
            />
          </div>
        </div>
      </div>

      {/* === 4: Bundesland === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Bundesland
        </h2>
        <label htmlFor="skv-bundesland" className="sr-only">Bundesland</label>
        <select
          id="skv-bundesland"
          value={bundesland}
          onChange={e => setBundesland(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {BUNDESLAENDER.map(bl => (
            <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name} (KiSt {bl.kirchensteuersatz} %)</option>
          ))}
        </select>
      </div>

      {/* === 5: Kinderfreibeträge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Kinderfreibeträge
        </h2>
        <label htmlFor="skv-kinder" className="sr-only">Kinderfreibeträge</label>
        <select
          id="skv-kinder"
          value={kinder}
          onChange={e => setKinder(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {KINDER_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Empfohlene Kombination</p>
        <p className="text-4xl font-bold">{ergebnis.empfehlung}</p>
        <p className="text-white/90 text-sm mt-2">
          Höchstes monatliches Gesamt-Netto: {fmtEuro(ergebnis.kombinationen.find(k => k.name === ergebnis.empfehlung)!.nettoGesamtMonat)} €
        </p>
      </div>

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich aller Kombinationen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Kombination</th>
                <th className="px-4 py-2 text-right font-semibold">LSt P1 / Mo</th>
                <th className="px-4 py-2 text-right font-semibold">LSt P2 / Mo</th>
                <th className="px-4 py-2 text-right font-semibold">Netto P1 / Mo</th>
                <th className="px-4 py-2 text-right font-semibold">Netto P2 / Mo</th>
                <th className="px-4 py-2 text-right font-semibold">Netto Haushalt / Mo</th>
                <th className="px-4 py-2 text-right font-semibold">Netto Haushalt / Jahr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.kombinationen.map(k => (
                <tr key={k.name} className={k.name === ergebnis.empfehlung ? 'bg-green-50 dark:bg-green-500/10 font-semibold' : ''}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {k.name === ergebnis.empfehlung && <span className="mr-1">⭐</span>}
                    {k.name}
                    {k.faktor !== undefined && (
                      <span className="text-xs text-gray-500 ml-1">(Faktor {k.faktor.toString().replace('.', ',')})</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(k.lohnsteuer1Monat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(k.lohnsteuer2Monat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(k.netto1Monat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(k.netto2Monat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-bold">{fmtEuro0(k.nettoGesamtMonat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(k.nettoGesamtJahr)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Balkendiagramm */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Monatliches Netto-Einkommen je Kombination</h2>
        <div className="space-y-4">
          {ergebnis.kombinationen.map(k => {
            const totalBreite = (k.nettoGesamtMonat / maxNetto) * 100;
            const anteil1 = k.nettoGesamtMonat > 0 ? (k.netto1Monat / k.nettoGesamtMonat) * totalBreite : 0;
            const anteil2 = k.nettoGesamtMonat > 0 ? (k.netto2Monat / k.nettoGesamtMonat) * totalBreite : 0;
            return (
              <div key={k.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={`font-semibold ${k.name === ergebnis.empfehlung ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {k.name === ergebnis.empfehlung && '⭐ '}
                    {k.name}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{fmtEuro0(k.nettoGesamtMonat)} €</span>
                </div>
                <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-500" style={{ width: `${anteil1}%` }} title={`Person 1: ${fmtEuro0(k.netto1Monat)} €`} />
                  <div className="h-full bg-green-500" style={{ width: `${anteil2}%` }} title={`Person 2: ${fmtEuro0(k.netto2Monat)} €`} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded"></span>Person 1</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded"></span>Person 2</span>
        </div>
      </div>

      {/* Hinweis */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>ℹ️ Wichtig:</strong> Die Steuerklassenwahl beeinflusst nur die <strong>monatliche Lohnsteuervorauszahlung</strong>, NICHT die Jahressteuer. Bei III/V erhält der Hauptverdiener mehr monatliches Netto, dafür droht bei der Steuererklärung eine Nachzahlung. IV/IV mit Faktor gleicht die monatlichen Abzüge so an, dass Nachzahlung/Erstattung minimal werden.
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung ist vereinfacht (Lohnsteuertabelle 2026, pauschale Vorsorgepauschale, ohne Kinderzuschläge in der Pflegeversicherung). Für exakte Werte nutzen Sie den offiziellen Abgabenrechner des BMF. Die Wahl III/V lohnt sich typischerweise ab ca. 60:40-Gehaltsverhältnis; IV/IV mit Faktor ist fast immer die stressfreiste Option.
        </p>
      </div>

      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingvorteil berechnen" />
      <CrossLink href="/finanzen/einkommensteuer-rechner" emoji="📋" text="Einkommensteuer berechnen" />
      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Gehalt berechnen" />
      <CrossLink href="/finanzen/elterngeld-rechner" emoji="👶" text="Elterngeld berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Steuerklassen-Vergleich: Empfehlung ${ergebnis.empfehlung} | III/V: ${fmtEuro0(ergebnis.kombinationen[0].nettoGesamtMonat)} €/Mo | V/III: ${fmtEuro0(ergebnis.kombinationen[1].nettoGesamtMonat)} €/Mo | IV/IV mit Faktor: ${fmtEuro0(ergebnis.kombinationen[2].nettoGesamtMonat)} €/Mo`}
        seitenTitel="Steuerklassen-Vergleich-Rechner"
      />

      <AffiliateBox programId="wiso" context="steuerklassen" />

      <AiExplain
        rechnerName="Steuerklassen-Vergleich-Rechner"
        eingaben={{
          brutto1: `${fmtEuro0(parseDeutscheZahl(brutto1))} €/Jahr`,
          brutto2: `${fmtEuro0(parseDeutscheZahl(brutto2))} €/Jahr`,
          kirchensteuerP1: kist1 ? 'Ja' : 'Nein',
          kirchensteuerP2: kist2 ? 'Ja' : 'Nein',
          bundesland: BUNDESLAENDER.find(b => b.kuerzel === bundesland)?.name || bundesland,
          kinder,
        }}
        ergebnis={{
          empfehlung: ergebnis.empfehlung,
          ...Object.fromEntries(ergebnis.kombinationen.map(k => [
            k.name,
            `${fmtEuro0(k.nettoGesamtMonat)} €/Mo (${fmtEuro0(k.nettoGesamtJahr)} €/Jahr)`,
          ])),
        }}
      />
    </div>
  );
}
