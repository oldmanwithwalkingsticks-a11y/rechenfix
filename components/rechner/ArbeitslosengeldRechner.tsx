'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// Vereinfachte Jahreslohnsteuer 2026 (Grundtarif), ohne Soli
function lohnsteuerJahr(zvE: number, klasse: Steuerklasse): number {
  if (klasse === 'III') zvE = Math.max(0, zvE - 0); // Vereinfacht: Ehegattensplitting ≈ doppelter Grundfreibetrag
  // Grundfreibetrag 2026 (approx)
  const grundfreibetrag = 12096;
  const zvEff = klasse === 'III' ? zvE / 2 : zvE;
  const x = Math.max(0, zvEff - grundfreibetrag);
  let steuer = 0;
  if (x === 0) steuer = 0;
  else if (zvEff <= 17443) {
    const y = x / 10000;
    steuer = (932.3 * y + 1400) * y;
  } else if (zvEff <= 68480) {
    const y = (zvEff - 17443) / 10000;
    steuer = (176.64 * y + 2397) * y + 1015.13;
  } else if (zvEff <= 277825) {
    steuer = 0.42 * zvEff - 10602.13;
  } else {
    steuer = 0.45 * zvEff - 18936.88;
  }
  if (klasse === 'III') steuer *= 2;
  if (klasse === 'V' || klasse === 'VI') steuer *= 1.15;
  if (klasse === 'I' || klasse === 'II' || klasse === 'IV') steuer *= 1;
  return Math.max(0, steuer);
}

function bezugsdauerMonate(alter: number, beschMonate: number): number {
  // Tabelle nach § 147 SGB III
  if (alter >= 58 && beschMonate >= 48) return 24;
  if (alter >= 55 && beschMonate >= 36) return 18;
  if (alter >= 50 && beschMonate >= 30) return 15;
  if (beschMonate >= 24) return 12;
  if (beschMonate >= 20) return 10;
  if (beschMonate >= 16) return 8;
  if (beschMonate >= 12) return 6;
  return 0;
}

export default function ArbeitslosengeldRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [mitKind, setMitKind] = useState(false);
  const [alter, setAlter] = useState('40');
  const [beschDauer, setBeschDauer] = useState('24');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto) || 0;
    const a = parseDeutscheZahl(alter) || 0;
    const beschMonate = parseDeutscheZahl(beschDauer) || 0;

    // BBG Rentenversicherung 2026 (approx)
    const BBG_MONAT = 7550;
    const bemessung = Math.min(b, BBG_MONAT);

    // Jahres-Lohnsteuer vereinfacht
    const jahresBrutto = bemessung * 12;
    const lstJahr = lohnsteuerJahr(jahresBrutto, klasse);
    const lstMonat = lstJahr / 12;
    const soli = lstMonat > 1000 ? lstMonat * 0.055 : 0;
    const kiSt = kirchensteuer ? lstMonat * 0.09 : 0;

    // Sozialversicherungspauschale 21 %
    const svPauschale = bemessung * 0.21;

    const leistungsentgeltMonat = Math.max(0, bemessung - lstMonat - soli - kiSt - svPauschale);
    const tagesLeistungsentgelt = leistungsentgeltMonat / 30;

    const satz = mitKind ? 0.67 : 0.60;
    const algTag = tagesLeistungsentgelt * satz;
    const algMonat = algTag * 30;

    const dauer = bezugsdauerMonate(a, beschMonate);
    const gesamt = algMonat * dauer;

    // Einfaches Netto (letztes Gehalt) als Vergleich
    const letztesNetto = Math.max(0, bemessung - lstMonat - soli - kiSt - svPauschale);
    const verlust = letztesNetto - algMonat;
    const verlustProzent = letztesNetto > 0 ? (verlust / letztesNetto) * 100 : 0;

    return { algMonat, algTag, dauer, gesamt, letztesNetto, verlust, verlustProzent, bemessung, satz };
  }, [brutto, klasse, mitKind, alter, beschDauer, kirchensteuer]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

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

      {/* 6: Kirchensteuer */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Kirchensteuer
        </h2>
        <div className="flex gap-2">
          {([[true, 'Ja'], [false, 'Nein']] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] min-w-[80px] ${kirchensteuer === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Arbeitslosengeld I (monatlich)</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.algMonat)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Tagessatz: <strong>{fmtEuro(ergebnis.algTag)} €</strong> × {ergebnis.satz * 100} % Leistungssatz
        </p>
      </div>

      {ergebnis.dauer === 0 && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Kein ALG-Anspruch:</strong> Die Anwartschaftszeit von mindestens 12 Monaten sozialversicherungspflichtiger Beschäftigung in den letzten 5 Jahren wurde nicht erreicht.
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
