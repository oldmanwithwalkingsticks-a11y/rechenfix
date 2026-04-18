'use client';

import { useState, useMemo } from 'react';
import { berechnePfaendung, type Zeitraum } from '@/lib/berechnungen/pfaendung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEuro0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const ZEITRAUM_LABEL: Record<Zeitraum, string> = {
  monatlich: 'Monat',
  woechentlich: 'Woche',
  taeglich: 'Tag',
};

export default function PfaendungRechner() {
  const [netto, setNetto] = useState('2500');
  const [unterhalt, setUnterhalt] = useState('0');
  const [zeitraum, setZeitraum] = useState<Zeitraum>('monatlich');

  const ergebnis = useMemo(
    () => berechnePfaendung({
      nettoMonat: parseDeutscheZahl(netto),
      unterhaltspflichten: parseFloat(unterhalt) || 0,
      zeitraum,
    }),
    [netto, unterhalt, zeitraum],
  );

  const freiBreite = ergebnis.nettoMonat > 0
    ? (ergebnis.pfaendungsfrei / (ergebnis.pfaendungsfrei + ergebnis.pfaendbar)) * 100
    : 100;

  return (
    <div>
      {/* === 1: Netto === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatliches Nettoeinkommen
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="2.500" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Nettolohn nach Steuern und Sozialabgaben. Bei unregelmäßigem Einkommen: Durchschnitt der letzten 12 Monate.
        </p>
      </div>

      {/* === 2: Unterhaltspflichten === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl unterhaltsberechtigter Personen
        </h2>
        <label htmlFor="pfaendung-unterhalt" className="sr-only">Unterhaltsberechtigte Personen</label>
        <select
          id="pfaendung-unterhalt"
          value={unterhalt}
          onChange={e => setUnterhalt(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="0">0 — keine Unterhaltspflicht</option>
          <option value="1">1 Person (z. B. Ehepartner oder 1 Kind)</option>
          <option value="2">2 Personen</option>
          <option value="3">3 Personen</option>
          <option value="4">4 Personen</option>
          <option value="5">5 oder mehr Personen</option>
        </select>
      </div>

      {/* === 3: Zeitraum === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Anzeige-Zeitraum
        </h2>
        <RadioToggleGroup
          name="pfaendung-zeitraum"
          legend="Zeitraum"
          srOnlyLegend
          options={[
            { value: 'monatlich', label: 'Monatlich' },
            { value: 'woechentlich', label: 'Wöchentlich' },
            { value: 'taeglich', label: 'Täglich' },
          ]}
          value={zeitraum}
          onChange={(v) => setZeitraum(v as Zeitraum)}
        />
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Pfändungsfrei / {ZEITRAUM_LABEL[zeitraum]}</p>
            <p className="text-4xl font-bold text-green-300">{fmtEuro(ergebnis.pfaendungsfrei)} €</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Pfändbar / {ZEITRAUM_LABEL[zeitraum]}</p>
            <p className="text-4xl font-bold text-red-300">{fmtEuro(ergebnis.pfaendbar)} €</p>
          </div>
        </div>
        {ergebnis.pfaendbar > 0 && (
          <p className="text-white/80 text-sm mt-3 text-center">
            {fmtProzent(ergebnis.pfaendbarProzent)} % Ihres Nettoeinkommens sind pfändbar
          </p>
        )}
      </div>

      {/* Balkendiagramm */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufteilung</h2>
        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500 flex items-center justify-center text-xs font-semibold text-white" style={{ width: `${freiBreite}%` }}>
            {freiBreite > 15 && 'Pfändungsfrei'}
          </div>
          <div className="h-full bg-red-500 flex items-center justify-center text-xs font-semibold text-white" style={{ width: `${100 - freiBreite}%` }}>
            {(100 - freiBreite) > 15 && 'Pfändbar'}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
          <span>{fmtEuro(ergebnis.pfaendungsfrei)} € ({fmtProzent(100 - ergebnis.pfaendbarProzent)} %)</span>
          <span>{fmtEuro(ergebnis.pfaendbar)} € ({fmtProzent(ergebnis.pfaendbarProzent)} %)</span>
        </div>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail ({ZEITRAUM_LABEL[zeitraum]})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Grundfreibetrag (§ 850c Abs. 1 ZPO)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.grundfreibetrag)} €</td>
              </tr>
              {ergebnis.erhoehungUnterhalt > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    + Erhöhung für {ergebnis.unterhaltspflichten} unterhaltsberechtigte Person{ergebnis.unterhaltspflichten > 1 ? 'en' : ''}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.erhoehungUnterhalt)} €</td>
                </tr>
              )}
              <tr className="bg-green-50 dark:bg-green-500/10 font-medium">
                <td className="px-4 py-2.5 text-green-800 dark:text-green-300 whitespace-nowrap">= Gesamt-Freibetrag</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-800 dark:text-green-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtFreibetrag)} €</td>
              </tr>
              {ergebnis.mehrbetrag > 0 && (
                <>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Nettoeinkommen über Freibetrag</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.mehrbetrag)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">× Pfändungsquote ({ergebnis.unterhaltspflichten} Unterhalt)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.pfaendungsQuote} %</td>
                  </tr>
                </>
              )}
              {ergebnis.ueberObergrenze && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Obergrenze überschritten</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">Darüber: 100 % pfändbar</td>
                </tr>
              )}
              <tr className="bg-red-50 dark:bg-red-500/10 font-bold">
                <td className="px-4 py-3 text-red-800 dark:text-red-300 whitespace-nowrap">= Pfändbarer Betrag</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-red-700 dark:text-red-300 whitespace-nowrap">{fmtEuro(ergebnis.pfaendbar)} €</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-500/10 font-bold">
                <td className="px-4 py-3 text-green-800 dark:text-green-300 whitespace-nowrap">= Pfändungsfreier Betrag</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-green-700 dark:text-green-300 whitespace-nowrap">{fmtEuro(ergebnis.pfaendungsfrei)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Beispieltabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Beispiele ({ergebnis.unterhaltspflichten} Unterhaltspflichten)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Netto / Monat</th>
                <th className="px-4 py-2 text-right font-semibold">Pfändungsfrei</th>
                <th className="px-4 py-2 text-right font-semibold">Pfändbar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.beispielTabelle.map(row => (
                <tr key={row.netto}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmtEuro0(row.netto)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">{fmtEuro0(row.frei)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">{fmtEuro0(row.pfaendbar)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* P-Konto-Tipp */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💡 P-Konto nicht vergessen:</strong> Nur ein Pfändungsschutzkonto (P-Konto) schützt den pfändungsfreien Betrag automatisch. Der Basisfreibetrag beim P-Konto liegt bis 30.06.2026 bei 1.555,00 €, ab 01.07.2026 bei 1.587,40 € monatlich. Höhere Freibeträge (bei Unterhaltspflichten, Kindergeld) müssen mit einer Bescheinigung nachgewiesen werden. Die Umwandlung eines Girokontos in ein P-Konto ist kostenlos.
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Der Rechner nutzt die aktuell gültige Pfändungstabelle (§ 850c ZPO) und schaltet am 01.07.2026 automatisch auf die neuen Werte aus BGBl. 2026 I Nr. 80 um (Grundfreibetrag 1.587,40 €). Die Berechnung nutzt die pauschalen Pfändungsquoten — die offizielle Tabelle arbeitet mit 10-Euro-Stufen, kleine Abweichungen im Cent-Bereich sind möglich. Bei speziellen Einkünften (Urlaubs-/Weihnachtsgeld, Zulagen) gelten Zusatzregeln.
        </p>
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Gehalt berechnen" />
      <CrossLink href="/finanzen/buergergeld-rechner" emoji="🤝" text="Bürgergeld berechnen" />
      <CrossLink href="/finanzen/unterhaltsrechner" emoji="👨‍👩‍👧" text="Unterhalt berechnen" />
      <CrossLink href="/finanzen/kreditrechner" emoji="💳" text="Kredit- und Zinsrechner" />

      <ErgebnisAktionen
        ergebnisText={`Pfändungsrechner: Netto ${fmtEuro(ergebnis.nettoMonat)} €/Monat | ${ergebnis.unterhaltspflichten} Unterhaltspflichten | Freibetrag ${fmtEuro(ergebnis.gesamtFreibetrag)} €/${ZEITRAUM_LABEL[zeitraum]} | Pfändungsfrei: ${fmtEuro(ergebnis.pfaendungsfrei)} € | Pfändbar: ${fmtEuro(ergebnis.pfaendbar)} € (${fmtProzent(ergebnis.pfaendbarProzent)} %)`}
        seitenTitel="Pfändungsrechner"
      />

      <AiExplain
        rechnerName="Pfändungsrechner"
        eingaben={{
          netto: `${fmtEuro(parseDeutscheZahl(netto))} €/Monat`,
          unterhaltspflichten: String(ergebnis.unterhaltspflichten),
          zeitraum: ZEITRAUM_LABEL[zeitraum],
        }}
        ergebnis={{
          grundfreibetrag: `${fmtEuro(ergebnis.grundfreibetrag)} €`,
          gesamtFreibetrag: `${fmtEuro(ergebnis.gesamtFreibetrag)} €`,
          pfaendungsfrei: `${fmtEuro(ergebnis.pfaendungsfrei)} €`,
          pfaendbar: `${fmtEuro(ergebnis.pfaendbar)} €`,
          pfaendbarProzent: `${fmtProzent(ergebnis.pfaendbarProzent)} %`,
        }}
      />
    </div>
  );
}
