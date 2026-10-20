'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import {
  berechneArbeitslosengeld,
  type Steuerklasse,
} from '@/lib/berechnungen/arbeitslosengeld';

export default function ArbeitslosengeldRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [mitKind, setMitKind] = useState(false);
  const [alter, setAlter] = useState('40');
  const [beschDauer, setBeschDauer] = useState('24');
  // W187: vorher Kirchensteuer-Auswahl (Ja 8/9 % nach Bundesland) — beim ALG wird keine
  // Kirchensteuer abgezogen (§ 153 Abs. 1 S. 2 SGB III nennt nur SV-Pauschale, Lohnsteuer, Soli).

  const ergebnis = useMemo(() => berechneArbeitslosengeld({
    brutto: parseDeutscheZahl(brutto) || 0,
    klasse,
    mitKind,
    alter: parseDeutscheZahl(alter) || 0,
    beschMonate: parseDeutscheZahl(beschDauer) || 0,
  }), [brutto, klasse, mitKind, alter, beschDauer]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtCent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* 1: Brutto */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Letztes Monatsbrutto
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="3500" einheit="€" />
      </div>

      {/* 2: Steuerklasse */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Steuerklasse
        </h2>
        <div className="flex flex-wrap gap-2">
          {(['I', 'II', 'III', 'IV', 'V', 'VI'] as const).map(k => (
            <button
              key={k}
              onClick={() => setKlasse(k)}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${klasse === k ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* 3: Mit Kind */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Kinder
        </h2>
        <div className="flex gap-2">
          {([
            [true, 'Mit Kind (67 %)'],
            [false, 'Ohne Kind (60 %)'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setMitKind(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${mitKind === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 4: Alter */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Alter bei Arbeitslosmeldung
        </h2>
        <NummerEingabe value={alter} onChange={setAlter} placeholder="40" einheit="Jahre" />
      </div>

      {/* 5: Beschäftigungsdauer */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Beschäftigungsdauer (letzte 5 Jahre)
        </h2>
        <select id="arbeitslosengeld-select-1" aria-label="Beschäftigungsdauer"
          value={beschDauer}
          onChange={e => setBeschDauer(e.target.value)}
          className="w-full min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
        >
          {['12', '16', '20', '24', '30', '36', '48'].map(m => (
            <option key={m} value={m}>{m} Monate</option>
          ))}
        </select>
      </div>

      <p className="-mt-3 mb-6 text-xs text-gray-500 dark:text-gray-400">
        Kirchensteuer wird beim Arbeitslosengeld nicht abgezogen — vom Bemessungsentgelt gehen nur die Sozialversicherungspauschale von 20 %, die Lohnsteuer und der Solidaritätszuschlag ab (§ 153 Abs. 1 SGB III).
      </p>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Arbeitslosengeld I (monatlich)</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.algMonat)} €</p>
        <p className="text-white/80 text-sm mt-1">
          {/* W187: vorher „Tagessatz: 47 € × 60 % Leistungssatz“ — der Tagessatz enthält die 60 % bereits */}
          Tagessatz: <strong>{fmtCent(ergebnis.algTag)} €</strong> ({ergebnis.satz * 100} % von {fmtCent(ergebnis.leistungsentgeltTag)} € Leistungsentgelt pro Tag) × 30 Tage
        </p>
      </div>

      {ergebnis.dauer === 0 && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            {/* W187: vorher „… in den letzten 5 Jahren“ — die 5 Jahre gelten nur für die Anspruchsdauer (§ 147) */}
            <strong>⚠️ Kein ALG-Anspruch:</strong> Die Anwartschaftszeit von mindestens 12 Monaten versicherungspflichtiger Beschäftigung innerhalb der Rahmenfrist von 30 Monaten (§§ 142, 143 SGB III) wurde nicht erreicht.
          </p>
        </div>
      )}

      {/* Vergleich & Bezugsdauer */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich letztes Netto vs. ALG I</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Letztes Netto (geschätzt)</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.letztesNetto)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">ALG I</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.algMonat)} €</td>
            </tr>
            <tr className="bg-red-50 dark:bg-red-500/10 font-semibold">
              <td className="px-4 py-2.5 text-red-800 dark:text-red-300">Einkommensverlust</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.verlust)} € ({ergebnis.verlustProzent.toFixed(0)} %)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Bezugsdauer</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{ergebnis.dauer} Monate</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">Gesamtanspruch</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.gesamt)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Sperrzeit:</strong> Bei Eigenkündigung oder Aufhebungsvertrag ohne wichtigen Grund droht eine <strong>Sperrzeit von 12 Wochen</strong> — in dieser Zeit wird kein ALG gezahlt und die Gesamtanspruchsdauer verringert sich um bis zu ein Viertel.
        </p>
      </div>

      <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist berechnen" />
      <CrossLink href="/arbeit/abfindungsrechner" emoji="💼" text="Abfindung und ALG I" />
      <CrossLink href="/finanzen/buergergeld-rechner" emoji="💶" text="Nach ALG I: Bürgergeld prüfen" />

      <ErgebnisAktionen
        ergebnisText={`Arbeitslosengeld I: ${fmtEuro(ergebnis.algMonat)} €/Monat (${ergebnis.satz * 100} %) für ${ergebnis.dauer} Monate | Gesamt ${fmtEuro(ergebnis.gesamt)} €`}
        seitenTitel="Arbeitslosengeld-Rechner"
        pdfDaten={[
          {
            titel: 'Arbeitslosengeld I',
            zeilen: [
              { label: 'Leistungssatz', wert: `${ergebnis.satz * 100} %` },
              { label: 'ALG I pro Monat', wert: `${fmtEuro(ergebnis.algMonat)} €`, highlight: true },
              { label: 'ALG I pro Tag', wert: `${fmtCent(ergebnis.algTag)} €` },
              { label: 'Bezugsdauer', wert: `${ergebnis.dauer} Monate` },
              { label: 'Gesamtanspruch', wert: `${fmtEuro(ergebnis.gesamt)} €` },
            ],
          },
          {
            titel: 'Vergleich zum letzten Netto',
            zeilen: [
              { label: 'Letztes Nettoeinkommen', wert: `${fmtEuro(ergebnis.letztesNetto)} €` },
              { label: 'Monatlicher Verlust', wert: `- ${fmtEuro(ergebnis.verlust)} € (${ergebnis.verlustProzent.toFixed(0)} %)` },
            ],
          },
        ]}
      />

      <AiExplain
        rechnerName="Arbeitslosengeld-Rechner"
        eingaben={{
          brutto: `${fmtEuro(parseDeutscheZahl(brutto))} €`,
          steuerklasse: klasse,
          kind: mitKind ? 'mit Kind' : 'ohne Kind',
          alter: alter,
          beschMonate: `${beschDauer} Monate`,
        }}
        ergebnis={{
          algMonat: `${fmtEuro(ergebnis.algMonat)} €`,
          dauer: `${ergebnis.dauer} Monate`,
          gesamt: `${fmtEuro(ergebnis.gesamt)} €`,
        }}
      />
    </div>
  );
}
