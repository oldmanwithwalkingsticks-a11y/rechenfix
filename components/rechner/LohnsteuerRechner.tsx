'use client';

import { useState, useMemo } from 'react';
import { berechneLohnsteuer, type Steuerklasse } from '@/lib/berechnungen/lohnsteuer';
import { parseDeutscheZahl, clampInputValue } from '@/lib/zahlenformat';
import { BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEuro0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const SK_LABEL: Record<Steuerklasse, string> = {
  1: 'I — Ledig, verwitwet, geschieden',
  2: 'II — Alleinerziehend',
  3: 'III — Verheiratet (höherer Verdiener)',
  4: 'IV — Verheiratet (gleiches Einkommen)',
  5: 'V — Verheiratet (geringerer Verdiener)',
  6: 'VI — Zweit-/Nebenjob',
};

const KINDER_OPTIONEN = [
  { value: '0', label: '0' },
  { value: '0.5', label: '0,5' },
  { value: '1', label: '1' },
  { value: '1.5', label: '1,5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2,5' },
  { value: '3', label: '3 oder mehr' },
];

export default function LohnsteuerRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<Steuerklasse>(1);
  const [bundesland, setBundesland] = useState('BW');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState('0');
  const [kinderUnter25, setKinderUnter25] = useState('0');
  const [jahresfreibetrag, setJahresfreibetrag] = useState('0');
  const [zeitraum, setZeitraum] = useState<'monat' | 'jahr'>('monat');

  const kirchensteuersatz = useMemo(() => {
    const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
    return (bl?.kirchensteuersatz ?? 9) as 8 | 9;
  }, [bundesland]);

  const ergebnis = useMemo(
    () => berechneLohnsteuer({
      brutto: parseDeutscheZahl(brutto),
      steuerklasse,
      kirchensteuer,
      kirchensteuersatz,
      kinderfreibetraege: parseFloat(kinder) || 0,
      kinderUnter25: Math.max(0, Math.min(10, parseInt(kinderUnter25, 10) || 0)),
      jahresfreibetrag: parseDeutscheZahl(jahresfreibetrag),
      zeitraum,
    }),
    [brutto, steuerklasse, kirchensteuer, kirchensteuersatz, kinder, kinderUnter25, jahresfreibetrag, zeitraum],
  );

  return (
    <div>
      {/* === 1: Brutto === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bruttolohn {zeitraum === 'monat' ? '(monatlich)' : '(jährlich)'}
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder={zeitraum === 'monat' ? '3.500' : '42.000'} einheit="€" />
        <div className="mt-2">
          <RadioToggleGroup
            name="lst-zeitraum"
            legend="Zeitraum"
            srOnlyLegend
            options={[
              { value: 'monat', label: 'Monatlich' },
              { value: 'jahr', label: 'Jährlich' },
            ]}
            value={zeitraum}
            onChange={(v) => setZeitraum(v as 'monat' | 'jahr')}
          />
        </div>
      </div>

      {/* === 2: Steuerklasse === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Steuerklasse
        </h2>
        <label htmlFor="lst-steuerklasse" className="sr-only">Steuerklasse</label>
        <select
          id="lst-steuerklasse"
          value={steuerklasse}
          onChange={e => setSteuerklasse(Number(e.target.value) as Steuerklasse)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {([1, 2, 3, 4, 5, 6] as Steuerklasse[]).map(sk => (
            <option key={sk} value={sk}>{SK_LABEL[sk]}</option>
          ))}
        </select>
      </div>

      {/* === 3: Bundesland === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Bundesland
        </h2>
        <label htmlFor="lst-bundesland" className="sr-only">Bundesland</label>
        <select
          id="lst-bundesland"
          value={bundesland}
          onChange={e => setBundesland(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {BUNDESLAENDER.map(bl => (
            <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name} (KiSt {bl.kirchensteuersatz} %)</option>
          ))}
        </select>
      </div>

      {/* === 4: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Kirchensteuer?
        </h2>
        <RadioToggleGroup
          name="lst-kist"
          legend="Kirchensteuer?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: `⛪ Ja (${kirchensteuersatz} %)` },
          ]}
          value={kirchensteuer ? 'ja' : 'nein'}
          onChange={(v) => setKirchensteuer(v === 'ja')}
        />
      </div>

      {/* === 5: Kinderfreibeträge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Kinderfreibeträge
        </h2>
        <label htmlFor="lst-kinder" className="sr-only">Kinderfreibeträge</label>
        <select
          id="lst-kinder"
          value={kinder}
          onChange={e => setKinder(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {KINDER_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Kinderfreibeträge (0 / 0,5 / 1 / 1,5 / 2 …) sind bei der Lohnsteuer nur für die Soli-Bemessung relevant. Für die steuerliche Entlastung entscheidet die Günstigerprüfung (Kindergeld vs. Freibetrag) erst in der Einkommensteuer-Veranlagung.
        </p>
      </div>

      {/* === 5b: Kinder unter 25 (PV-Kinderabschlag) === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5b</span>
          Kinder unter 25 Jahren
        </h2>
        <label htmlFor="lst-kinder-unter-25" className="sr-only">Kinder unter 25 Jahren</label>
        <input
          id="lst-kinder-unter-25"
          type="number"
          inputMode="numeric"
          min={0}
          max={10}
          value={kinderUnter25}
          onChange={e => setKinderUnter25(clampInputValue(e.target.value, 0, 10))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Für den Pflegeversicherungs-Beitragsabschlag nach § 55 Abs. 3 SGB XI. Zählt alle Kinder unter 25 Jahren — unabhängig von den steuerlichen Kinderfreibeträgen. Ab dem 2. bis 5. Kind wird der PV-Beitrag um 0,25 %-Punkte je Kind reduziert.
        </p>
      </div>

      {/* === 6: Jahresfreibetrag === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Jährlicher Steuerfreibetrag (optional)
        </h2>
        <NummerEingabe value={jahresfreibetrag} onChange={setJahresfreibetrag} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Vom Finanzamt eingetragener Freibetrag (z. B. Werbungskosten, Pendlerpauschale über 1.230 €, Kinderbetreuung).
        </p>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Lohnsteuer / Monat</p>
            <p className="text-4xl font-bold">{fmtEuro(ergebnis.lohnsteuerMonat)} €</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">+ Soli / Monat</p>
            <p className="text-2xl font-bold">{fmtEuro(ergebnis.solidaritaetszuschlagMonat)} €</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">+ Kirchensteuer / Monat</p>
            <p className="text-2xl font-bold">{fmtEuro(ergebnis.kirchensteuerMonat)} €</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Gesamt-Steuerabzug / Monat</p>
          <p className="text-4xl font-bold text-amber-300">{fmtEuro(ergebnis.gesamtabzuegeMonat)} €</p>
          <p className="text-white/80 text-xs mt-1">
            ({fmtEuro(ergebnis.gesamtabzuegeJahr)} € / Jahr)
          </p>
        </div>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Position</th>
                <th className="px-4 py-2 text-right font-semibold">Monatlich</th>
                <th className="px-4 py-2 text-right font-semibold">Jährlich</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Bruttolohn</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.bruttoMonat)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.bruttoJahr)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Lohnsteuer (§ 39b EStG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.lohnsteuerMonat)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.lohnsteuerJahr)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Solidaritätszuschlag</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.solidaritaetszuschlagMonat)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.solidaritaetszuschlagJahr)} €</td>
              </tr>
              {kirchensteuer && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Kirchensteuer ({kirchensteuersatz} %)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kirchensteuerMonat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kirchensteuerJahr)} €</td>
                </tr>
              )}
              <tr className="bg-amber-50 dark:bg-amber-500/10 font-bold">
                <td className="px-4 py-3 text-amber-800 dark:text-amber-300 whitespace-nowrap">= Gesamt-Steuerabzug</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-amber-700 dark:text-amber-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtabzuegeMonat)} €</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-amber-700 dark:text-amber-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtabzuegeJahr)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vergleich aller Steuerklassen */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich aller Steuerklassen (bei {fmtEuro0(ergebnis.bruttoMonat)} € Brutto/Monat)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Steuerklasse</th>
                <th className="px-4 py-2 text-right font-semibold">Lohnsteuer</th>
                <th className="px-4 py-2 text-right font-semibold">Soli</th>
                {kirchensteuer && <th className="px-4 py-2 text-right font-semibold">KiSt</th>}
                <th className="px-4 py-2 text-right font-semibold">Gesamt / Monat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.vergleichsTabelle.map(row => (
                <tr key={row.steuerklasse} className={row.steuerklasse === steuerklasse ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {row.steuerklasse === steuerklasse && <span className="mr-1">➔</span>}
                    Klasse {row.steuerklasse === 1 ? 'I' : row.steuerklasse === 2 ? 'II' : row.steuerklasse === 3 ? 'III' : row.steuerklasse === 4 ? 'IV' : row.steuerklasse === 5 ? 'V' : 'VI'}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.lohnsteuerMonat)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.soliMonat)} €</td>
                  {kirchensteuer && (
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.kistMonat)} €</td>
                  )}
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-bold">{fmtEuro0(row.gesamtMonat)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis LSt vs ESt */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>ℹ️ Lohnsteuer ≠ Einkommensteuer:</strong> Die Lohnsteuer ist eine monatliche <strong>Vorauszahlung</strong> auf die Jahres-Einkommensteuer. Mit der Steuererklärung wird die tatsächliche Jahressteuer ermittelt — je nach Ergebnis gibt es eine Erstattung oder Nachzahlung.
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung verwendet eine vereinfachte Form des BMF-Programmablaufplans 2026 (PAP). Tatsächliche Lohnsteuer kann durch individuelle Faktoren (Versorgungsbezüge, Kinderfreibeträge bei Soli/KiSt, Werbungskostenbeträge) leicht abweichen. Für die exakte Berechnung nutzen Sie den Lohnsteuerrechner des Bundesfinanzministeriums (BMF).
        </p>
      </div>

      <CrossLink href="/finanzen/einkommensteuer-rechner" emoji="📋" text="Einkommensteuer berechnen" />
      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Gehalt berechnen" />
      <CrossLink href="/finanzen/steuerklassen-vergleich-rechner" emoji="⚖️" text="Steuerklassen-Kombinationen vergleichen" />
      <CrossLink href="/finanzen/steuerprogression-rechner" emoji="📊" text="Steuerprogression visualisieren" />

      <ErgebnisAktionen
        ergebnisText={`Lohnsteuer (Klasse ${steuerklasse}): ${fmtEuro(ergebnis.lohnsteuerMonat)} €/Monat | Brutto: ${fmtEuro(ergebnis.bruttoMonat)} €/Monat | Soli: ${fmtEuro(ergebnis.solidaritaetszuschlagMonat)} € | KiSt: ${fmtEuro(ergebnis.kirchensteuerMonat)} € | Gesamt-Steuer: ${fmtEuro(ergebnis.gesamtabzuegeMonat)} €/Monat (${fmtEuro(ergebnis.gesamtabzuegeJahr)} €/Jahr)`}
        seitenTitel="Lohnsteuer-Rechner"
      />

      <AffiliateBox programId="wiso" context="lohnsteuer" />

      <AiExplain
        rechnerName="Lohnsteuer-Rechner"
        eingaben={{
          brutto: `${fmtEuro(parseDeutscheZahl(brutto))} €${zeitraum === 'monat' ? '/Monat' : '/Jahr'}`,
          steuerklasse: SK_LABEL[steuerklasse],
          bundesland: BUNDESLAENDER.find(b => b.kuerzel === bundesland)?.name || bundesland,
          kirchensteuer: kirchensteuer ? `Ja (${kirchensteuersatz} %)` : 'Nein',
          kinderfreibetraege: kinder,
          jahresfreibetrag: `${fmtEuro(parseDeutscheZahl(jahresfreibetrag))} €`,
        }}
        ergebnis={{
          lohnsteuerMonat: `${fmtEuro(ergebnis.lohnsteuerMonat)} €`,
          soliMonat: `${fmtEuro(ergebnis.solidaritaetszuschlagMonat)} €`,
          kistMonat: `${fmtEuro(ergebnis.kirchensteuerMonat)} €`,
          gesamtMonat: `${fmtEuro(ergebnis.gesamtabzuegeMonat)} €`,
          gesamtJahr: `${fmtEuro(ergebnis.gesamtabzuegeJahr)} €`,
        }}
      />
    </div>
  );
}
