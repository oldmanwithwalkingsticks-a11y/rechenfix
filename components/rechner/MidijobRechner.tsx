'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { berechneEStGrund } from '@/lib/berechnungen/einkommensteuer';
import {
  berechneBemessungsgrundlageAN,
  getMidijobUntergrenze,
  MIDIJOB_OBERGRENZE_MONAT,
} from '@/lib/berechnungen/midijob-uebergang';
import {
  KV_BASISSATZ_AN_2026,
  RV_SATZ_AN_2026,
  AV_SATZ_AN_2026,
} from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 } from '@/lib/berechnungen/sv-parameter';
import { pvAnteilAn2026 } from '@/lib/berechnungen/pflegeversicherung';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

const MIDIJOB_UNTERGRENZE = getMidijobUntergrenze();
const MIDIJOB_OBERGRENZE = MIDIJOB_OBERGRENZE_MONAT;

// SV-Grundsätze 2026 aus SSOT-Libs (ohne PV — wird über pvAnteilAn2026 geholt,
// abhängig von Kinderanzahl und Kinderlos-Zuschlag § 55 Abs. 3 SGB XI).
const KV_AN_GESAMT = KV_BASISSATZ_AN_2026 + KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026;
const SV_AN_OHNE_PV = RV_SATZ_AN_2026 + KV_AN_GESAMT + AV_SATZ_AN_2026;

// Vereinfachte Monatslohnsteuer: nutzt den zentralen 2026-Tarif
// (§ 32a EStG) aus lib/berechnungen/einkommensteuer.ts.
function einfacheLohnsteuerMonat(brutto: number, klasse: Steuerklasse): number {
  const jahr = brutto * 12;
  const zvEff = klasse === 'III' ? jahr / 2 : jahr;
  let steuer = berechneEStGrund(Math.max(0, zvEff), 2026);
  if (klasse === 'III') steuer *= 2;
  if (klasse === 'V' || klasse === 'VI') steuer *= 1.15;
  return Math.max(0, steuer / 12);
}

export default function MidijobRechner() {
  const [brutto, setBrutto] = useState('1200');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [anzahlKinder, setAnzahlKinder] = useState<number>(0);

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto) || 0;

    // BE: reduzierte beitragspflichtige Einnahme für AN nach § 20a SGB IV.
    // Formel und Konstanten in lib/berechnungen/midijob-uebergang.ts —
    // SSOT, testbar, stichtag-switch für UG zum 01.01.2027 (633,01 €).
    const imBereich = b >= MIDIJOB_UNTERGRENZE && b <= MIDIJOB_OBERGRENZE;
    const be = imBereich ? berechneBemessungsgrundlageAN(b) : b;

    // PV-AN-Satz inkl. Kinderlos-Zuschlag / Kinderabschlag nach § 55 Abs. 3 SGB XI.
    // Vereinfachung: Wer anzahlKinder = 0 hat, gilt als kinderlos (Zuschlag greift,
    // Annahme Alter > 23). Ab Kind 2 greift der Kinderabschlag von 0,25 pp pro Kind
    // (bis Kind 5 gedeckelt). Eltern mit Kindern über 25 Jahren müssen derzeit für
    // den Kinderlos-Zuschlag-Nachweis ihren Elternstatus separat belegen — ein
    // explizites UI-Flag dafür könnte Prompt 117 nachreichen.
    const pvAnSatz = pvAnteilAn2026(anzahlKinder, true, false);
    const anSvSatz = SV_AN_OHNE_PV + pvAnSatz;
    const agSvSatz = anSvSatz; // Display-Wert, keine Midijob-AG-Logik

    const anSv = be * anSvSatz;
    const agSv = b * agSvSatz;

    const lohnsteuer = einfacheLohnsteuerMonat(b, klasse);
    const soli = lohnsteuer > 1000 ? lohnsteuer * 0.055 : 0;
    const kiSt = kirchensteuer ? lohnsteuer * 0.09 : 0;

    const netto = b - anSv - lohnsteuer - soli - kiSt;

    // Vergleich: Reguläre Beschäftigung (SV auf volles Brutto)
    const anSvRegulaer = b * anSvSatz;
    const nettoRegulaer = b - anSvRegulaer - lohnsteuer - soli - kiSt;
    const ersparnis = netto - nettoRegulaer;

    return { b, be, imBereich, anSv, agSv, lohnsteuer, soli, kiSt, netto, nettoRegulaer, ersparnis };
  }, [brutto, klasse, kirchensteuer, anzahlKinder]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const status = ergebnis.imBereich
    ? { text: 'Midijob ✓', color: 'bg-green-500' }
    : ergebnis.b < MIDIJOB_UNTERGRENZE
    ? { text: '⚠️ Minijob-Bereich', color: 'bg-orange-500' }
    : { text: '⚠️ Reguläre Beschäftigung', color: 'bg-red-500' };

  return (
    <div>
      {/* 1: Brutto */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatlicher Bruttoverdienst
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="1200" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Übergangsbereich: 603,01 – 2.000 €</p>
        <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white ${status.color}`}>{status.text}</div>
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

      {/* 3: Kinder unter 25 (für PV-Kinderabschlag und Kinderlos-Zuschlag) */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Anzahl Kinder unter 25 Jahren
        </h2>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setAnzahlKinder(n)}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${anzahlKinder === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
              aria-pressed={anzahlKinder === n}
            >
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          Kinderlos (über 23): Zuschlag +0,6 %-Punkte. Ab Kind 2 verringert sich Ihr PV-Beitrag um 0,25 %-Punkte pro Kind unter 25 (bis Kind 5 gedeckelt, § 55 Abs. 3 SGB XI).
        </p>
      </div>

      {/* 4: Kirchensteuer */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
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
        <p className="text-white/80 text-sm mb-1">Netto (geschätzt)</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.netto)} €</p>
        {ergebnis.imBereich && ergebnis.ersparnis > 0 && (
          <p className="text-white/80 text-sm mt-1">
            Sie sparen ca. <strong>{fmtEuro(ergebnis.ersparnis)} €</strong> gegenüber regulärer Beschäftigung
          </p>
        )}
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Bruttoverdienst</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.b)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Beitragspfl. Einnahme (AN, reduziert)</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.be)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− AN-Sozialversicherung</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.anSv)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Lohnsteuer</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.lohnsteuer)} €</td>
            </tr>
            {ergebnis.soli > 0 && (
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Solidaritätszuschlag</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.soli)} €</td>
              </tr>
            )}
            {ergebnis.kiSt > 0 && (
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Kirchensteuer</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.kiSt)} €</td>
              </tr>
            )}
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Netto</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.netto)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">AG-Sozialversicherung</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 dark:text-gray-400">{fmtEuro(ergebnis.agSv)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!ergebnis.imBereich && ergebnis.b > MIDIJOB_OBERGRENZE && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Kein Midijob:</strong> Ihr Verdienst liegt über 2.000 €. Es gelten volle SV-Beiträge. Nutzen Sie den <a href="/finanzen/brutto-netto-rechner" className="underline">Brutto-Netto-Rechner</a>.
          </p>
        </div>
      )}

      <CrossLink href="/finanzen/minijob-rechner" emoji="💼" text="Unter 603 €? → Minijob-Rechner" />
      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Über 2.000 €? → Brutto-Netto-Rechner" />

      <ErgebnisAktionen
        ergebnisText={`Midijob ${fmtEuro(ergebnis.b)} €: Netto ${fmtEuro(ergebnis.netto)} € | AN-SV ${fmtEuro(ergebnis.anSv)} € | Ersparnis vs. regulär ${fmtEuro(ergebnis.ersparnis)} €`}
        seitenTitel="Midijob-Rechner"
      />

      <AiExplain
        rechnerName="Midijob-Rechner"
        eingaben={{
          brutto: `${fmtEuro(ergebnis.b)} €`,
          steuerklasse: klasse,
          kinderUnter25: anzahlKinder,
          kirchensteuer: kirchensteuer ? 'ja' : 'nein',
        }}
        ergebnis={{
          netto: `${fmtEuro(ergebnis.netto)} €`,
          anSv: `${fmtEuro(ergebnis.anSv)} €`,
          ersparnis: `${fmtEuro(ergebnis.ersparnis)} €`,
        }}
      />
    </div>
  );
}
