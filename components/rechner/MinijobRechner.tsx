'use client';

import { useState, useMemo } from 'react';
import {
  berechneMinijob,
  MINIJOB_GRENZE,
  MIDIJOB_OBERGRENZE,
  MINDESTLOHN_2026,
  type MinijobArt,
} from '@/lib/berechnungen/minijob';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const SCHNELLWAHL = ['450', '520', '538', '556', '603'];

export default function MinijobRechner() {
  const [verdienst, setVerdienst] = useState('538');
  const [art, setArt] = useState<MinijobArt>('gewerblich');
  const [rvPflicht, setRvPflicht] = useState(true);
  const [stunden, setStunden] = useState('');

  const ergebnis = useMemo(() => {
    const stundenNum = stunden.trim() ? parseDeutscheZahl(stunden) : undefined;
    return berechneMinijob({
      verdienst: parseDeutscheZahl(verdienst),
      art,
      rentenversicherungspflicht: rvPflicht,
      stundenProWoche: stundenNum && stundenNum > 0 ? stundenNum : undefined,
    });
  }, [verdienst, art, rvPflicht, stunden]);

  // Zum Vergleich: immer beide Varianten rechnen
  const vergleichOhneRv = useMemo(() => {
    const stundenNum = stunden.trim() ? parseDeutscheZahl(stunden) : undefined;
    return berechneMinijob({
      verdienst: parseDeutscheZahl(verdienst),
      art,
      rentenversicherungspflicht: false,
      stundenProWoche: stundenNum && stundenNum > 0 ? stundenNum : undefined,
    });
  }, [verdienst, art, stunden]);

  const vergleichMitRv = useMemo(() => {
    const stundenNum = stunden.trim() ? parseDeutscheZahl(stunden) : undefined;
    return berechneMinijob({
      verdienst: parseDeutscheZahl(verdienst),
      art,
      rentenversicherungspflicht: true,
      stundenProWoche: stundenNum && stundenNum > 0 ? stundenNum : undefined,
    });
  }, [verdienst, art, stunden]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const statusLabel =
    ergebnis.status === 'minijob' ? { text: 'Minijob ✓', color: 'bg-green-500' } :
    ergebnis.status === 'midijob' ? { text: '⚠️ Midijob-Übergangsbereich', color: 'bg-orange-500' } :
    { text: '⚠️ Reguläre Beschäftigung', color: 'bg-red-500' };

  return (
    <div>
      {/* === 1: Verdienst === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatlicher Verdienst
        </h2>
        <NummerEingabe value={verdienst} onChange={setVerdienst} placeholder="538" einheit="€" />
        <div className="flex flex-wrap gap-2 mt-2">
          {SCHNELLWAHL.map(v => (
            <button
              key={v}
              onClick={() => setVerdienst(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${verdienst === v ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {v} €{v === '603' ? ' (Grenze)' : ''}
            </button>
          ))}
        </div>
        <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white ${statusLabel.color}`}>
          {statusLabel.text}
        </div>
      </div>

      {/* === 2: Art === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Art des Minijobs
        </h2>
        <div className="flex gap-2">
          {([['gewerblich', '🏢 Gewerblich'], ['privathaushalt', '🏡 Privathaushalt']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setArt(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${art === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* === 3: RV-Pflicht === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Rentenversicherungspflicht
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          {([
            [true, 'Ja (Standard seit 2013)'],
            [false, 'Nein (Befreiung beantragt)'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setRvPflicht(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${rvPflicht === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Sie können sich von der RV-Pflicht befreien lassen. Dann entfällt Ihr Eigenanteil, aber Sie erwerben keine Rentenpunkte.
        </p>
      </div>

      {/* === 4: Stunden === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Stunden pro Woche <span className="text-xs font-normal text-gray-500">(optional)</span>
        </h2>
        <NummerEingabe value={stunden} onChange={setStunden} placeholder="z.B. 10" einheit="Std." />
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Netto für Arbeitnehmer</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.nettoAN)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Arbeitgeber-Gesamtkosten: <strong>{fmtEuro(ergebnis.agGesamtkosten)} €</strong>
        </p>
      </div>

      {/* Midijob-Warnung */}
      {ergebnis.status === 'midijob' && (
        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-xl p-4 mb-6">
          <p className="text-orange-800 dark:text-orange-300 text-sm">
            <strong>⚠️ Übergangsbereich (Midijob):</strong> Ihr Verdienst liegt über der Minijob-Grenze von {MINIJOB_GRENZE} € und unter {MIDIJOB_OBERGRENZE} €. Hier gelten reduzierte Sozialabgaben für Arbeitnehmer (gleitend ansteigend). Die hier angezeigten Beträge sind nur für die Arbeitgeberseite korrekt — für den exakten Netto-Verdienst nutzen Sie bitte den <a href="/finanzen/brutto-netto-rechner" className="underline">Brutto-Netto-Rechner</a>.
          </p>
        </div>
      )}
      {ergebnis.status === 'regulaer' && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Reguläre Beschäftigung:</strong> Ihr Verdienst liegt über dem Midijob-Übergangsbereich. Es gelten volle Sozialabgaben und Lohnsteuer nach Ihrer persönlichen Steuerklasse. Nutzen Sie den <a href="/finanzen/brutto-netto-rechner" className="underline">Brutto-Netto-Rechner</a>.
          </p>
        </div>
      )}

      {/* Aufschlüsselung AN/AG */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Position</th>
                <th className="px-4 py-2 text-right font-semibold">Arbeitnehmer</th>
                <th className="px-4 py-2 text-right font-semibold">Arbeitgeber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Bruttoverdienst</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.verdienst)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.verdienst)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">RV-Eigenanteil (3,6 %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">{ergebnis.rvEigenanteil > 0 ? `−${fmtEuro(ergebnis.rvEigenanteil)} €` : '—'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Rentenversicherung ({art === 'gewerblich' ? '15' : '5'} %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.agRentenversicherung)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Krankenversicherung ({art === 'gewerblich' ? '13' : '5'} %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.agKrankenversicherung)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Lohnsteuer (2 %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.agLohnsteuer)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Umlagen (U1, U2, Insolvenz)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.agUmlagen)} €</td>
              </tr>
              {ergebnis.agUnfallversicherung > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Unfallversicherung</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmtEuro(ergebnis.agUnfallversicherung)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Netto / Gesamtkosten</td>
                <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.nettoAN)} €</td>
                <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.agGesamtkosten)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          <strong>💡 Gesamtkosten Arbeitgeber:</strong> Ihr Minijob kostet den Arbeitgeber insgesamt {fmtEuro(ergebnis.agGesamtkosten)} € — das sind {ergebnis.agAufschlagProzent.toLocaleString('de-DE')} % Aufschlag auf den Bruttoverdienst.
        </div>
      </div>

      {/* Stundenlohn-Info */}
      {ergebnis.stundenlohn !== null && (
        <div className={`border rounded-xl p-4 mb-6 ${ergebnis.unterMindestlohn ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30' : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'}`}>
          <p className={`text-sm ${ergebnis.unterMindestlohn ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
            {ergebnis.unterMindestlohn ? '⚠️' : '✓'} <strong>Ihr Stundenlohn:</strong> {fmtEuro(ergebnis.stundenlohn)} €/Std. (Mindestlohn 2026: {fmtEuro(MINDESTLOHN_2026)} €/Std.)
            {ergebnis.unterMindestlohn && <> — <strong>Stundenlohn unter Mindestlohn!</strong></>}
          </p>
          <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
            Bei {fmtEuro(ergebnis.verdienst)} € und Mindestlohn dürfen Sie max. <strong>{ergebnis.maxStundenProWoche.toLocaleString('de-DE')} Std./Woche</strong> arbeiten.
          </p>
        </div>
      )}

      {/* Vergleich RV mit/ohne */}
      {ergebnis.status === 'minijob' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
          <div className="px-4 pt-4 pb-1">
            <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich: Mit vs. ohne RV-Befreiung</h2>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700">
            <div className={`p-4 ${rvPflicht ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mit RV-Pflicht</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(vergleichMitRv.nettoAN)} €</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ca. {vergleichMitRv.rentenpunkteProJahrMitRv.toLocaleString('de-DE')} Rentenpunkte/Jahr
              </div>
            </div>
            <div className={`p-4 ${!rvPflicht ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ohne RV (befreit)</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(vergleichOhneRv.nettoAN)} €</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0 Rentenpunkte</div>
            </div>
          </div>
        </div>
      )}

      {/* Hinweis KV */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Als Minijobber sind Sie steuerfrei, aber auch nicht krankenversichert durch den Minijob. Sie müssen anderweitig krankenversichert sein (z.B. Familienversicherung, Studentenversicherung oder freiwillige Versicherung).
        </p>
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto-Rechner für reguläre Gehälter" />
      <CrossLink href="/arbeit/stundenlohn-rechner" emoji="⏱️" text="Stundenlohn berechnen" />
      <CrossLink href="/arbeit/teilzeit-rechner" emoji="📅" text="Teilzeit-Rechner: Gehalt bei reduzierter Arbeitszeit" />

      <ErgebnisAktionen
        ergebnisText={`Minijob ${fmtEuro(ergebnis.verdienst)} € (${art}): Netto ${fmtEuro(ergebnis.nettoAN)} € | RV-Eigenanteil ${fmtEuro(ergebnis.rvEigenanteil)} € | AG-Gesamtkosten ${fmtEuro(ergebnis.agGesamtkosten)} € (+${ergebnis.agAufschlagProzent}%)`}
        seitenTitel="Minijob-Rechner"
      />

      <AiExplain
        rechnerName="Minijob-Rechner"
        eingaben={{
          verdienst: `${fmtEuro(parseDeutscheZahl(verdienst))} €`,
          art,
          rvPflicht: rvPflicht ? 'Ja' : 'Nein (befreit)',
          stunden: stunden || 'nicht angegeben',
        }}
        ergebnis={{
          status: ergebnis.status,
          nettoAN: `${fmtEuro(ergebnis.nettoAN)} €`,
          rvEigenanteil: `${fmtEuro(ergebnis.rvEigenanteil)} €`,
          agGesamtkosten: `${fmtEuro(ergebnis.agGesamtkosten)} €`,
          agAufschlag: `${ergebnis.agAufschlagProzent} %`,
          stundenlohn: ergebnis.stundenlohn !== null ? `${fmtEuro(ergebnis.stundenlohn)} €` : 'n/a',
        }}
      />
    </div>
  );
}
