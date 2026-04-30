'use client';

import { useState, useMemo } from 'react';
import {
  berechneSchenkungssteuer,
  FREIBETRAEGE,
  STEUERKLASSEN,
  VERWANDTSCHAFT_LABELS,
  type SchenkungsVerwandtschaft,
} from '@/lib/berechnungen/schenkungssteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const VERWANDTSCHAFT_OPTIONEN: { value: SchenkungsVerwandtschaft; label: string; kl: string }[] = [
  { value: 'ehepartner',         label: 'Ehepartner / eingetr. Lebenspartner', kl: 'Kl. I' },
  { value: 'kind',               label: 'Kind (inkl. Stief-/Adoptivkind)',     kl: 'Kl. I' },
  { value: 'enkel-eltern-tot',   label: 'Enkelkind (Eltern verstorben)',        kl: 'Kl. I' },
  { value: 'enkel-eltern-leben', label: 'Enkelkind (Eltern leben)',             kl: 'Kl. I' },
  { value: 'elternteil',         label: 'Elternteil / Großelternteil',          kl: 'Kl. II' },
  { value: 'geschwister',        label: 'Geschwister',                          kl: 'Kl. II' },
  { value: 'nichte-neffe',       label: 'Nichte / Neffe',                       kl: 'Kl. II' },
  { value: 'stiefeltern',        label: 'Stief- / Schwiegereltern',             kl: 'Kl. II' },
  { value: 'geschieden',         label: 'Geschiedener Ehepartner',              kl: 'Kl. II' },
  { value: 'nicht-verwandt',     label: 'Nicht verwandt',                       kl: 'Kl. III' },
];

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function SchenkungssteuerRechner() {
  const [schenkungswert, setSchenkungswert] = useState('250000');
  const [verwandtschaft, setVerwandtschaft] = useState<SchenkungsVerwandtschaft>('kind');
  const [bereitsGenutzt, setBereitsGenutzt] = useState('0');
  const [hausratFreibetrag, setHausratFreibetrag] = useState(false);

  const ergebnis = useMemo(
    () => berechneSchenkungssteuer({
      schenkungswert: parseDeutscheZahl(schenkungswert),
      verwandtschaft,
      bereitsGenutzt: parseDeutscheZahl(bereitsGenutzt),
      hausratFreibetrag,
    }),
    [schenkungswert, verwandtschaft, bereitsGenutzt, hausratFreibetrag],
  );

  return (
    <div>
      {/* === 1: Wert der Schenkung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Wert der Schenkung
        </h2>
        <NummerEingabe value={schenkungswert} onChange={setSchenkungswert} placeholder="250.000" einheit="€" />
      </div>

      {/* === 2: Verwandtschaftsgrad === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Verwandtschaftsgrad zum Schenker
        </h2>
        <label htmlFor="schenkungssteuer-verwandtschaft" className="sr-only">Verwandtschaftsgrad</label>
        <select
          id="schenkungssteuer-verwandtschaft"
          value={verwandtschaft}
          onChange={e => setVerwandtschaft(e.target.value as SchenkungsVerwandtschaft)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {VERWANDTSCHAFT_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>
              {o.label} — Freibetrag {fmtEuro(FREIBETRAEGE[o.value])} € ({o.kl})
            </option>
          ))}
        </select>
      </div>

      {/* === 3: Bereits genutzte Freibeträge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Bereits genutzte Freibeträge (letzte 10 Jahre)
        </h2>
        <NummerEingabe value={bereitsGenutzt} onChange={setBereitsGenutzt} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Schenkungen innerhalb von 10 Jahren werden zusammengerechnet und verringern den verfügbaren Freibetrag.
        </p>
      </div>

      {/* === 4: Hausrat-Freibetrag === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Hausrat-Freibetrag berücksichtigen?
        </h2>
        <RadioToggleGroup
          name="schenkung-hausrat"
          legend="Hausrat-Freibetrag berücksichtigen?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: '🏠 Ja' },
          ]}
          value={hausratFreibetrag ? 'ja' : 'nein'}
          onChange={(v) => setHausratFreibetrag(v === 'ja')}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          § 13 Abs. 1 Nr. 1 ErbStG: 41.000 € in Steuerklasse I, 12.000 € in Steuerklasse II und III.
        </p>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis.steuerfrei ? (
        <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
          <p className="text-white/80 text-sm mb-1">Schenkungssteuer</p>
          <p className="text-5xl font-bold">0 €</p>
          <p className="text-white/90 text-sm mt-2">
            ✓ Ihr Freibetrag von {fmtEuro(ergebnis.freibetrag + ergebnis.hausratFreibetrag)} € reicht aus — keine Steuer fällig!
          </p>
        </div>
      ) : (
        <div className="result-box mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-white/80 text-sm mb-1">Schenkungssteuer</p>
              <p className="text-5xl font-bold">{fmtEuro(ergebnis.schenkungssteuer)} €</p>
              <p className="text-white/80 text-sm mt-1">
                Steuerklasse {ergebnis.steuerklasse} · Steuersatz {ergebnis.steuersatz} % · effektiv {fmtProzent(ergebnis.effektiverSteuersatz)} %
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                Netto: {fmtEuro(ergebnis.nettoSchenkung)} €
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Wert der Schenkung</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.schenkungswert)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Persönlicher Freibetrag
                  <span className="text-xs text-gray-600 dark:text-gray-500 ml-1">({ergebnis.verwandtschaftLabel})</span>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.freibetrag)} €</td>
              </tr>
              {ergebnis.hausratFreibetrag > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Hausrat-Freibetrag</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.hausratFreibetrag)} €</td>
                </tr>
              )}
              {ergebnis.bereitsGenutzt > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Bereits genutzte Freibeträge</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">bereits abgezogen</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Steuerpflichtiger Erwerb</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.steuerpflichtigerErwerb)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Steuerklasse</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.steuerklasse}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Steuersatz (§ 19 ErbStG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.steuersatz} %</td>
              </tr>
              <tr className={`font-bold ${ergebnis.steuerfrei ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                <td className={`px-4 py-3 whitespace-nowrap ${ergebnis.steuerfrei ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  = Schenkungssteuer
                </td>
                <td className={`px-4 py-3 text-right tabular-nums text-lg whitespace-nowrap ${ergebnis.steuerfrei ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {fmtEuro(ergebnis.schenkungssteuer)} €
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Effektiver Steuersatz</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtProzent(ergebnis.effektiverSteuersatz)} %</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Netto-Schenkung</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtEuro(ergebnis.nettoSchenkung)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Freibeträge-Übersicht */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Freibeträge bei Schenkungen (§ 16 ErbStG)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Verwandtschaftsgrad</th>
                <th className="px-4 py-2 text-right font-semibold">Freibetrag</th>
                <th className="px-4 py-2 text-right font-semibold">Steuerklasse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {VERWANDTSCHAFT_OPTIONEN.map(o => (
                <tr key={o.value} className={o.value === verwandtschaft ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{o.label}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(FREIBETRAEGE[o.value])} €</td>
                  <td className="px-4 py-2.5 text-right text-gray-800 dark:text-gray-200 whitespace-nowrap">{STEUERKLASSEN[o.value]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10-Jahres-Hinweis */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-sm">
          <strong>💡 Tipp — 10-Jahres-Regel:</strong> Freibeträge können alle 10 Jahre erneut genutzt werden. Bei rechtzeitiger Planung können Sie große Vermögen steuerfrei übertragen — etwa bei einem Kind: 400.000 € alle 10 Jahre. Über 30 Jahre sind das bis zu 1,2 Mio. € pro Kind steuerfrei (Kettenschenkung).
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung ist vereinfacht. Sonderfälle wie Betriebsvermögen, Nießbrauch oder die genaue Immobilienbewertung sind nicht berücksichtigt. Jede Schenkung muss dem Finanzamt gemeldet werden (§ 30 ErbStG). Bei größeren Schenkungen empfehlen wir eine steuerliche Beratung.
        </p>
      </div>

      <CrossLink href="/finanzen/erbschaftsteuer-rechner" emoji="⚱️" text="Erbschaftsteuer berechnen" />
      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif bei Verheirateten nutzen" />
      <CrossLink href="/finanzen/kapitalertragsteuer-rechner" emoji="📈" text="Kapitalertragsteuer berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Schenkungssteuer: ${fmtEuro(ergebnis.schenkungssteuer)} € | Schenkungswert: ${fmtEuro(ergebnis.schenkungswert)} € | Freibetrag: ${fmtEuro(ergebnis.freibetrag)} € | Steuerklasse ${ergebnis.steuerklasse}, Satz ${ergebnis.steuersatz} % | Effektiv: ${fmtProzent(ergebnis.effektiverSteuersatz)} % | Netto: ${fmtEuro(ergebnis.nettoSchenkung)} €`}
        seitenTitel="Schenkungssteuer-Rechner"
      />

      <AffiliateBox programId="wiso" context="schenkungssteuer" />
      <AffiliateBox programId="smartsteuer" context="schenkungssteuer" />
      <AffiliateBox programId="cosmosdirekt" context="tagesgeld" />

      <AiExplain
        rechnerName="Schenkungssteuer-Rechner"
        eingaben={{
          schenkungswert: `${fmtEuro(parseDeutscheZahl(schenkungswert))} €`,
          verwandtschaft: VERWANDTSCHAFT_LABELS[verwandtschaft],
          bereitsGenutzt: `${fmtEuro(parseDeutscheZahl(bereitsGenutzt))} €`,
          hausratFreibetrag: hausratFreibetrag ? `Ja (${ergebnis.hausratFreibetrag.toLocaleString('de-DE')} €)` : 'Nein',
        }}
        ergebnis={{
          steuerklasse: ergebnis.steuerklasse,
          freibetrag: `${fmtEuro(ergebnis.freibetrag)} €`,
          steuerpflErwerb: `${fmtEuro(ergebnis.steuerpflichtigerErwerb)} €`,
          steuersatz: `${ergebnis.steuersatz} %`,
          steuer: `${fmtEuro(ergebnis.schenkungssteuer)} €`,
          effektiverSatz: `${fmtProzent(ergebnis.effektiverSteuersatz)} %`,
          netto: `${fmtEuro(ergebnis.nettoSchenkung)} €`,
        }}
      />
    </div>
  );
}
