'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import {
  kirchensteuersatzFuer,
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
  berechneBruttoNetto,
  berechneArbeitgeberSvMonat,
  SV_RECHENSTAND,
  KV_BASISSATZ_AN_2026,
  RV_SATZ_AN_2026,
  AV_SATZ_AN_2026,
} from '@/lib/berechnungen/brutto-netto';
import {
  KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026,
  KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
} from '@/lib/berechnungen/sv-parameter';
import { pvAnteilAn2026 } from '@/lib/berechnungen/pflegeversicherung';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// Die Untergrenze kommt bei jedem Render aus getMidijobUntergrenze(). W166: zum Stichtag
// SV_RECHENSTAND aus brutto-netto.ts, damit Grenze, Faktor F und Beitragssätze aus demselben
// Jahr stammen; der Wechsel auf 2027 läuft über den Termin midijob-parameter-2027.
const MIDIJOB_OBERGRENZE = MIDIJOB_OBERGRENZE_MONAT;

// SV-Grundsätze 2026 aus SSOT-Libs (ohne PV — wird über pvAnteilAn2026 geholt,
// abhängig von Kinderanzahl und Kinderlos-Zuschlag § 55 Abs. 3 SGB XI).
const KV_AN_GESAMT = KV_BASISSATZ_AN_2026 + KV_ZUSATZBEITRAG_AN_DURCHSCHNITT_2026;
const SV_AN_OHNE_PV = RV_SATZ_AN_2026 + KV_AN_GESAMT + AV_SATZ_AN_2026;

// Mapping Römisch → Numerisch für berechneBruttoNetto (§ 39b EStG PAP).
const KLASSE_NUM: Record<Steuerklasse, 1 | 2 | 3 | 4 | 5 | 6> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6,
};

export default function MidijobRechner() {
  const [brutto, setBrutto] = useState('1200');
  const [klasse, setKlasse] = useState<Steuerklasse>('I');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [bundesland, setBundesland] = useState<Bundesland>('Nordrhein-Westfalen');
  const [anzahlKinder, setAnzahlKinder] = useState<number>(0);

  // W166: Untergrenze zum Rechenstand der Brutto-Netto-Berechnung (2026), nicht zum heutigen Datum.
  const untergrenze = getMidijobUntergrenze(SV_RECHENSTAND);

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto) || 0;

    // Zwei separate Bemessungsgrundlagen nach § 20 Abs. 2a SGB IV (seit 01.10.2022):
    //  - BE_gesamt (Satz 1): für den Gesamtbeitrag und den PV-Zuschlag für Kinderlose
    //  - BE_AN (Satz 6): für den AN-Beitragsanteil (startet bei UG mit 0)
    // Entgeltpunkte der Rente kommen aus dem tatsächlichen Entgelt (§ 70 Abs. 1a SGB VI).
    // AG trägt Gesamtbeitrag − AN-Anteil (im Übergangsbereich > halbe Last).
    const imBereich = b >= untergrenze && b <= MIDIJOB_OBERGRENZE;
    const beGesamt = imBereich ? Math.round(berechneBemessungsgrundlageGesamt(b, SV_RECHENSTAND) * 100) / 100 : b;
    const beAn = imBereich ? Math.round(berechneBemessungsgrundlageAN(b, SV_RECHENSTAND) * 100) / 100 : b;

    // PV-AN-Satz inkl. Kinderlos-Zuschlag / Kinderabschlag nach § 55/59 SGB XI.
    // Annahme anzahlKinder = 0 → kinderlos (Zuschlag, Alter > 23). Ab Kind 2
    // greift Kinderabschlag 0,25 pp pro Kind (bis Kind 5 gedeckelt).
    const pvAnSatz = pvAnteilAn2026(anzahlKinder, true, false);
    const anSvSatz = SV_AN_OHNE_PV + pvAnSatz;

    // W163: Arbeitnehmeranteil, Lohnsteuer, Soli und Kirchensteuer aus der zentralen
    // Brutto-Netto-Berechnung (SSOT). Sie rechnet im Übergangsbereich je Zweig mit BE_AN,
    // den PV-Zuschlag für Kinderlose aber mit BE_gesamt (§ 20 Abs. 2a SGB IV, DRV), und die
    // Lohnsteuer nach PAP 2026 mit derselben Vorsorgepauschale wie der Brutto-Netto-Rechner.
    // Unter der Geringfügigkeitsgrenze trägt der Arbeitnehmer nur den RV-Eigenanteil.
    // Kinderfreibeträge bleiben wie bisher unberücksichtigt (wirken nur auf Soli und KiSt).
    const bn = berechneBruttoNetto({
      bruttoMonat: b,
      steuerklasse: KLASSE_NUM[klasse],
      kirchensteuer,
      kirchensteuersatz: kirchensteuersatzFuer(bundesland),
      kinderfreibetraege: 0,
      kinderUnter25: anzahlKinder,
      bundesland: '',
      kvArt: 'gesetzlich',
      kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
      kvPrivatBeitrag: 0,
      rvBefreit: false,
      abrechnungszeitraum: 'monat',
    });
    const anSv = bn.sozialabgabenGesamt;
    // § 20 Abs. 2a SGB IV: Der Gesamtbeitrag je Zweig kommt aus BE_gesamt (halber Satz, gerundet,
    // verdoppelt), der AG trägt Gesamtbeitrag − AN-Anteil (= deutlich mehr als die Hälfte bei
    // niedrigem AE). Der PV-Zuschlag für Kinderlose belastet nur den AN. W166: zentral berechnet.
    const agSv = berechneArbeitgeberSvMonat(b, KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT);
    const gesamtSv = Math.round((agSv + anSv) * 100) / 100;
    const lohnsteuer = bn.lohnsteuer;
    const soli = bn.solidaritaet;
    const kiSt = bn.kirchensteuer;
    const netto = bn.nettoMonat;

    // Vergleich: Reguläre Beschäftigung (AN-SV auf volles Brutto, halber Satz)
    const anSvRegulaer = b * anSvSatz;
    const nettoRegulaer = b - anSvRegulaer - lohnsteuer - soli - kiSt;
    const ersparnis = netto - nettoRegulaer;

    return { b, beGesamt, beAn, imBereich, gesamtSv, anSv, agSv, lohnsteuer, soli, kiSt, netto, nettoRegulaer, ersparnis };
  }, [brutto, klasse, kirchensteuer, bundesland, anzahlKinder, untergrenze]);

  // F-Faktor dynamisch aus Parameter-Lib lesen (ändert sich jährlich)
  const midijobParams = getAktuelleMidijobParameter(SV_RECHENSTAND);
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
                    Bemessungsgrundlagen § 20 Abs. 2a SGB IV
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
            F-Faktor <strong>{fFaktorAnzeige}</strong> für {jahrAnzeige} — jährlich vom Bundesarbeitsministerium im Bundesanzeiger bekannt gegeben (§ 20 Abs. 2a SGB IV).
          </p>
        )}
      </div>

      {/* § 70 Abs. 1a SGB VI — Info-Hinweis: Volle Rentenansprüche trotz reduzierter BE */}
      {ergebnis.imBereich && (
        <div className="mb-6 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 px-4 py-3 flex gap-2 items-start">
          <span className="text-blue-600 dark:text-blue-400 text-sm leading-tight" aria-hidden="true">ℹ️</span>
          <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
            <strong>Volle SV-Ansprüche trotz reduzierter Beiträge:</strong> Im Übergangsbereich
            zahlen Sie weniger AN-SV, behalten aber die <strong>vollen Ansprüche</strong> auf
            Krankengeld, Arbeitslosengeld und Rente. Die Rentenpunkte werden seit Juli 2019
            aus dem tatsächlichen Arbeitsentgelt berechnet, nicht aus einer der reduzierten
            Bemessungsgrundlagen (§ 70 Abs. 1a SGB VI). Der Arbeitgeber trägt den Differenzbetrag zwischen
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
        pdfDaten={[
          {
            titel: 'Midijob (Übergangsbereich)',
            zeilen: [
              { label: 'Brutto pro Monat', wert: `${fmtEuro(ergebnis.b)} €` },
              { label: 'Netto', wert: `${fmtEuro(ergebnis.netto)} €`, highlight: true },
              { label: 'AN-Sozialversicherung', wert: `- ${fmtEuro(ergebnis.anSv)} €` },
              { label: 'Lohnsteuer', wert: `- ${fmtEuro(ergebnis.lohnsteuer)} €` },
              { label: 'Ersparnis vs. regulär', wert: `${fmtEuro(ergebnis.ersparnis)} €` },
            ],
          },
        ]}
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
