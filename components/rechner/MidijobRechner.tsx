'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { berechneLohnsteuerJahr } from '@/lib/berechnungen/lohnsteuer';
import {
  berechneSoli,
  berechneKirchensteuerByBundesland,
  BUNDESLAENDER,
  type Bundesland,
} from '@/lib/berechnungen/einkommensteuer';
import {
  berechneBemessungsgrundlageAN,
  berechneBemessungsgrundlageGesamt,
  getMidijobUntergrenze,
  MIDIJOB_OBERGRENZE_MONAT,
} from '@/lib/berechnungen/midijob-uebergang';
import { getAktuelleMidijobParameter } from '@/lib/berechnungen/midijob-parameter';
import {
  KV_BASISSATZ_AN_2026,
  RV_SATZ_AN_2026,
  AV_SATZ_AN_2026,
} from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026 } from '@/lib/berechnungen/sv-parameter';
import { pvAnteilAn2026 } from '@/lib/berechnungen/pflegeversicherung';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// MIDIJOB_UNTERGRENZE wird NICHT modul-scope konstant gehalten — sonst
// würde der via Stichtag-Switch (01.01.2027 → 633,01 €) neuer Wert erst
// nach Redeploy greifen. Stattdessen bei jedem Render neu via
// getMidijobUntergrenze() aus lib/berechnungen/midijob-uebergang.ts.
const MIDIJOB_OBERGRENZE = MIDIJOB_OBERGRENZE_MONAT;

// SV-Grundsätze 2026 aus SSOT-Libs (ohne PV — wird über pvAnteilAn2026 geholt,
// abhängig von Kinderanzahl und Kinderlos-Zuschlag § 55 Abs. 3 SGB XI).
const KV_AN_GESAMT = KV_BASISSATZ_AN_2026 + KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026;
const SV_AN_OHNE_PV = RV_SATZ_AN_2026 + KV_AN_GESAMT + AV_SATZ_AN_2026;

// Mapping Römisch → Numerisch für berechneLohnsteuerJahr (§ 39b EStG PAP).
const KLASSE_NUM: Record<Steuerklasse, 1 | 2 | 3 | 4 | 5 | 6> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6,
};

// Monatslohnsteuer über zentrale LSt-Lib (§ 39b EStG PAP 2026) —
// kein erfundener Steuerklassen-Faktor für V/VI mehr. Jahresfreibetrag 0,
// weil Midijob-Rechner keinen ELStAM-Freibetrag modelliert.
function lohnsteuerMonat(brutto: number, klasse: Steuerklasse): number {
  const jahr = Math.max(0, brutto * 12);
  const lstJahr = berechneLohnsteuerJahr(jahr, KLASSE_NUM[klasse], 0);
  return Math.max(0, lstJahr / 12);
}

export default function MidijobRechner() {
  const [brutto, setBrutto] = useState('1200');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [bundesland, setBundesland] = useState<Bundesland>('Nordrhein-Westfalen');
  const [anzahlKinder, setAnzahlKinder] = useState<number>(0);

  const untergrenze = getMidijobUntergrenze();

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto) || 0;

    // Zwei separate Bemessungsgrundlagen nach § 20a SGB IV (seit 01.10.2022):
    //  - BE_gesamt (Abs. 2): für Gesamtbeitrag und RV-Entgeltpunkte § 163 SGB VI
    //  - BE_AN (Abs. 2a): für AN-Beitragsanteil (startet bei UG mit 0)
    // AG trägt Gesamtbeitrag − AN-Anteil (im Übergangsbereich > halbe Last).
    const imBereich = b >= untergrenze && b <= MIDIJOB_OBERGRENZE;
    const beGesamt = imBereich ? berechneBemessungsgrundlageGesamt(b) : b;
    const beAn = imBereich ? berechneBemessungsgrundlageAN(b) : b;

    // PV-AN-Satz inkl. Kinderlos-Zuschlag / Kinderabschlag nach § 55 Abs. 3 SGB XI.
    // Annahme anzahlKinder = 0 → kinderlos (Zuschlag, Alter > 23). Ab Kind 2
    // greift Kinderabschlag 0,25 pp pro Kind (bis Kind 5 gedeckelt).
    const pvAnSatz = pvAnteilAn2026(anzahlKinder, true, false);
    const anSvSatz = SV_AN_OHNE_PV + pvAnSatz;

    // Gesamtbeitragssatz (AN + AG = voller Beitrag): AN-Satz × 2 als Näherung
    // (PV-Basis 1,8 % geteilt AN/AG = je 0,9 %, plus Kinderlos-Zuschlag trägt
    // nur AN). Hier einfach anSvSatz × 2 minus Kinderlos-Zuschlag-Anteil, den
    // der AG NICHT trägt. Vereinfacht: volles Brutto × 2 × anSvSatz wäre
    // Überschätzung. Wir nutzen für den Gesamt-AN+AG-Beitrag aktuell
    // AN-Satz × 2 auf BE_gesamt (akzeptable Näherung, Kinderlos-Zuschlag
    // wäre eine Feinheit ≈ 0,3 €-Bereich bei Midijob).
    const gesamtSvSatz = anSvSatz * 2;

    const gesamtSv = beGesamt * gesamtSvSatz;
    const anSv = beAn * anSvSatz;
    // § 20a SGB IV: AG trägt Gesamtbeitrag − AN-Anteil (= deutlich mehr als
    // die Hälfte bei niedrigem AE, weil BE_AN ≪ BE_gesamt in dem Bereich)
    const agSv = Math.max(0, gesamtSv - anSv);

    const lohnsteuer = lohnsteuerMonat(b, klasse);

    // Soli nach § 4 SolzG mit Freigrenze + Milderungszone — nicht mehr harte
    // 1.000-€-Monats-Schwelle. splitting=false, weil Midijob-Modell
    // Einzelbetrachtung ist (Partner-zvE nicht vom Rechner erfasst).
    const lstJahr = lohnsteuer * 12;
    const soli = berechneSoli(lstJahr, false, 2026) / 12;

    // KiSt je Bundesland (8 % BY/BW, 9 % sonst) — § 51a EStG + Landes-KiStG.
    const kiSt = kirchensteuer ? berechneKirchensteuerByBundesland(lohnsteuer, bundesland) : 0;

    const netto = b - anSv - lohnsteuer - soli - kiSt;

    // Vergleich: Reguläre Beschäftigung (AN-SV auf volles Brutto, halber Satz)
    const anSvRegulaer = b * anSvSatz;
    const nettoRegulaer = b - anSvRegulaer - lohnsteuer - soli - kiSt;
    const ersparnis = netto - nettoRegulaer;

    return { b, beGesamt, beAn, imBereich, gesamtSv, anSv, agSv, lohnsteuer, soli, kiSt, netto, nettoRegulaer, ersparnis };
  }, [brutto, klasse, kirchensteuer, bundesland, anzahlKinder, untergrenze]);

  // F-Faktor dynamisch aus Parameter-Lib lesen (ändert sich jährlich)
  const midijobParams = getAktuelleMidijobParameter();
  const fFaktorAnzeige = midijobParams.faktorF.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  const jahrAnzeige = midijobParams.gueltigAb.getFullYear();

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const status = ergebnis.imBereich
    ? { text: 'Midijob ✓', color: 'bg-green-500' }
    : ergebnis.b < untergrenze
    ? { text: '⚠️ Minijob-Bereich', color: 'bg-orange-500' }
    : { text: '⚠️ Reguläre Beschäftigung', color: 'bg-red-500' };

  const fmtUntergrenze = untergrenze.toFixed(2).replace('.', ',');

  return (
    <div>
      {/* 1: Brutto */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatlicher Bruttoverdienst
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="1200" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Übergangsbereich: {fmtUntergrenze} – 2.000 €</p>
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
        {kirchensteuer && (
          <div className="mt-3">
            <label htmlFor="midijob-bundesland" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Bundesland (8 % in Bayern und Baden-Württemberg, sonst 9 %)
            </label>
            <select
              id="midijob-bundesland"
              value={bundesland}
              onChange={e => setBundesland(e.target.value as Bundesland)}
              className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            >
              {BUNDESLAENDER.map(bl => (
                <option key={bl} value={bl}>{bl}</option>
              ))}
            </select>
          </div>
        )}
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
            {ergebnis.imBereich && (
              <>
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td colSpan={2} className="px-4 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Bemessungsgrundlagen § 20a SGB IV
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    BE<sub className="text-xs">gesamt</sub> (Abs. 2 — für Gesamtbeitrag und RV-Entgeltpunkte)
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.beGesamt)} €</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    BE<sub className="text-xs">AN</sub> (Abs. 2a — für reduzierten AN-Anteil)
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.beAn)} €</td>
                </tr>
              </>
            )}
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
            {ergebnis.imBereich && (
              <>
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td colSpan={2} className="px-4 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Arbeitgeber-Seite (Differenzbetrag)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400">Gesamtbeitrag SV (AN + AG)</td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-500 dark:text-gray-400">{fmtEuro(ergebnis.gesamtSv)} €</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 pl-8 text-xs text-gray-500 dark:text-gray-400">
                    davon AG-Anteil (= Gesamtbeitrag − AN-Anteil)
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-500 dark:text-gray-400">{fmtEuro(ergebnis.agSv)} €</td>
                </tr>
              </>
            )}
            {!ergebnis.imBereich && (
              <tr>
                <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">AG-Sozialversicherung (normal, halber Satz)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 dark:text-gray-400">{fmtEuro(ergebnis.agSv)} €</td>
              </tr>
            )}
          </tbody>
        </table>
        {ergebnis.imBereich && (
          <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            F-Faktor <strong>{fFaktorAnzeige}</strong> für {jahrAnzeige} — jährlich neu von den SV-Spitzenverbänden festgesetzt (§ 20a Abs. 2 SGB IV, gemeinsames Rundschreiben GKV-Spitzenverband / DRV Bund / BA).
          </p>
        )}
      </div>

      {/* § 163 Abs. 10 SGB VI — Info-Hinweis: Volle Rentenansprüche trotz reduzierter BE */}
      {ergebnis.imBereich && (
        <div className="mb-6 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 px-4 py-3 flex gap-2 items-start">
          <span className="text-blue-600 dark:text-blue-400 text-sm leading-tight" aria-hidden="true">ℹ️</span>
          <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
            <strong>Volle SV-Ansprüche trotz reduzierter Beiträge:</strong> Im Übergangsbereich
            zahlen Sie weniger AN-SV, behalten aber die <strong>vollen Ansprüche</strong> auf
            Krankengeld, Arbeitslosengeld und Rente (§ 163 Abs. 10 SGB VI).
            Die Rentenpunkte werden auf Basis der Gesamt-Bemessungsgrundlage gutgeschrieben,
            nicht auf der AN-BE. Der Arbeitgeber trägt den Differenzbetrag zwischen
            Gesamtbeitrag und Ihrem AN-Anteil.
          </p>
        </div>
      )}

      {!ergebnis.imBereich && ergebnis.b > MIDIJOB_OBERGRENZE && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Kein Midijob:</strong> Ihr Verdienst liegt über 2.000 €. Der Übergangsbereich endet bei der Obergrenze OG — es gelten volle SV-Beiträge (halber Satz für AN auf das volle Brutto). Nutzen Sie den <a href="/finanzen/brutto-netto-rechner" className="underline">Brutto-Netto-Rechner</a>.
          </p>
        </div>
      )}

      {!ergebnis.imBereich && ergebnis.b > 0 && ergebnis.b < untergrenze && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>⚠️ Dies ist ein Minijob, kein Midijob:</strong> Ihr Verdienst liegt auf oder unter der Geringfügigkeitsgrenze ({fmtUntergrenze.replace(',01', '')} €). Für Minijobs zahlt der Arbeitgeber Pauschalabgaben, der AN-Beitrag ist in der Regel nur der RV-Pflichtanteil (3,6 %). Nutzen Sie den <a href="/finanzen/minijob-rechner" className="underline">Minijob-Rechner</a>.
          </p>
        </div>
      )}

      <CrossLink href="/finanzen/minijob-rechner" emoji="💼" text={`Unter ${Math.floor(untergrenze)} €? → Minijob-Rechner`} />
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
