'use client';

import { useState, useMemo } from 'react';
import {
  berechneKindergeld,
  KINDERGELD_PRO_KIND_MONAT,
  type Veranlagung,
} from '@/lib/berechnungen/kindergeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function KindergeldRechner() {
  const [anzahlKinder, setAnzahlKinder] = useState(2);
  const [brutto, setBrutto] = useState('60000');
  const [veranlagung, setVeranlagung] = useState<Veranlagung>('zusammen');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const ergebnis = useMemo(
    () => berechneKindergeld({
      anzahlKinder,
      jahresbruttoeinkommen: parseDeutscheZahl(brutto),
      veranlagung,
      kirchensteuer,
    }),
    [anzahlKinder, brutto, veranlagung, kirchensteuer],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Anzahl Kinder === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Anzahl der Kinder
        </h2>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setAnzahlKinder(n)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] min-w-[56px] ${anzahlKinder === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {n === 5 ? '5+' : n} {n === 1 ? 'Kind' : 'Kinder'}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Kindergeld 2026: <strong>{KINDERGELD_PRO_KIND_MONAT} €/Monat pro Kind</strong> (einheitlich)
        </p>
      </div>

      {/* === 2: Einkommen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Jahresbruttoeinkommen
        </h2>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="60.000" einheit="€/Jahr" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Gesamtes Brutto der Eltern (bei Zusammenveranlagung beide zusammen)
        </p>
      </div>

      {/* === 3: Veranlagung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Veranlagung
        </h2>
        <div className="flex gap-2">
          {([['zusammen', '👫 Zusammenveranlagung'], ['einzeln', '👤 Einzelveranlagung']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setVeranlagung(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${veranlagung === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Verheiratete profitieren vom Splittingtarif und dem doppelten Kinderfreibetrag.
        </p>
      </div>

      {/* === 4: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Kirchensteuer
        </h2>
        <div className="flex gap-2">
          {([false, true] as const).map(val => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${kirchensteuer === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {val ? '⛪ Ja (9%)' : '✖ Nein'}
            </button>
          ))}
        </div>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-white/80 text-sm mb-1">Kindergeld</p>
                <p className="text-5xl font-bold">{fmtEuro(ergebnis.kindergeldMonat)} €</p>
                <p className="text-white/80 text-sm mt-1">pro Monat für {anzahlKinder} {anzahlKinder === 1 ? 'Kind' : 'Kinder'}</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmtEuro(ergebnis.kindergeldJahr)} €/Jahr
                </span>
              </div>
            </div>
          </div>

          {/* Günstigerprüfung */}
          <div className={`border-2 rounded-xl p-5 mb-6 ${ergebnis.gewinner === 'freibetrag' ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/40' : 'bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/40'}`}>
            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              ⚖️ Günstigerprüfung: Kindergeld vs. Kinderfreibetrag
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className={`rounded-xl p-4 ${ergebnis.gewinner === 'kindergeld' ? 'bg-white dark:bg-gray-800 border-2 border-green-500' : 'bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Kindergeld</p>
                  {ergebnis.gewinner === 'kindergeld' && (
                    <span className="text-xs bg-green-700 text-white px-2 py-0.5 rounded-full font-bold">✓ Günstiger</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.vorteilKindergeld)} €</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">pro Jahr</p>
              </div>
              <div className={`rounded-xl p-4 ${ergebnis.gewinner === 'freibetrag' ? 'bg-white dark:bg-gray-800 border-2 border-purple-500' : 'bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Kinderfreibetrag</p>
                  {ergebnis.gewinner === 'freibetrag' && (
                    <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold">✓ Günstiger</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.vorteilFreibetrag)} €</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Steuerersparnis/Jahr</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-800/50 rounded-lg p-3">
              {ergebnis.gewinner === 'kindergeld' ? (
                <>
                  <strong>✓ In Ihrem Fall ist das Kindergeld günstiger</strong> — Sie erhalten {fmtEuro(ergebnis.kindergeldJahr)} € pro Jahr steuerfrei.
                  {ergebnis.breakevenBrutto > 0 && (
                    <> Der Kinderfreibetrag würde sich erst ab ca. <strong>{fmtEuro(ergebnis.breakevenBrutto)} €</strong> Jahresbrutto lohnen.</>
                  )}
                </>
              ) : (
                <>
                  <strong>✓ In Ihrem Fall ist der Kinderfreibetrag günstiger</strong> — das Finanzamt prüft dies automatisch und zieht den Freibetrag ab. Sie sparen <strong>{fmtEuro(Math.abs(ergebnis.differenz))} €</strong> mehr Steuern, als Sie Kindergeld erhalten. Das Kindergeld wird dabei verrechnet.
                </>
              )}
            </div>
          </div>

          {/* Steuerberechnung Detail */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Steuerberechnung im Detail</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold"></th>
                    <th className="px-4 py-2 text-right font-semibold">Ohne Freibetrag</th>
                    <th className="px-4 py-2 text-right font-semibold">Mit Freibetrag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">zu versteuerndes Einkommen</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.zvEOhneFreibetrag)} €</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.zvEMitFreibetrag)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Einkommensteuer</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.estOhneFreibetrag)} €</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.estMitFreibetrag)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Solidaritätszuschlag</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.soliOhne)} €</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.soliMit)} €</td>
                  </tr>
                  {kirchensteuer && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Kirchensteuer (9%)</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kistOhne)} €</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kistMit)} €</td>
                    </tr>
                  )}
                  <tr className="bg-purple-50 dark:bg-purple-500/10 font-bold">
                    <td className="px-4 py-3 text-purple-800 dark:text-purple-300 whitespace-nowrap">= Steuerersparnis durch Freibetrag</td>
                    <td colSpan={2} className="px-4 py-3 text-right tabular-nums text-purple-800 dark:text-purple-300 whitespace-nowrap">
                      {fmtEuro(ergebnis.steuerersparnisFreibetrag)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Kindergeld-Übersicht */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Kindergeld-Übersicht 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Anzahl Kinder</th>
                    <th className="px-4 py-2 text-right font-semibold">pro Monat</th>
                    <th className="px-4 py-2 text-right font-semibold">pro Jahr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[1, 2, 3, 4, 5].map(n => (
                    <tr key={n} className={n === anzahlKinder ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{n} {n === 1 ? 'Kind' : 'Kinder'}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(n * KINDERGELD_PRO_KIND_MONAT)} €</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(n * KINDERGELD_PRO_KIND_MONAT * 12)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Die Günstigerprüfung erfolgt automatisch durch das Finanzamt. Sie erhalten immer das Kindergeld ausgezahlt — wenn der Kinderfreibetrag günstiger ist, wird die Differenz bei der Steuererklärung berücksichtigt. Die Berechnung ist vereinfacht und ersetzt keine Steuerberatung.
            </p>
          </div>

          <CrossLink href="/finanzen/elterngeld-rechner" emoji="👶" text="Elterngeld berechnen — Einkommen im Babyjahr" />
          <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splitting-Vorteil bei Verheirateten berechnen" />
          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Steuererstattung schätzen" />

          <ErgebnisAktionen
            ergebnisText={`Kindergeld: ${fmtEuro(ergebnis.kindergeldMonat)} €/Monat (${fmtEuro(ergebnis.kindergeldJahr)} €/Jahr) für ${anzahlKinder} ${anzahlKinder === 1 ? 'Kind' : 'Kinder'} | Günstiger: ${ergebnis.gewinner === 'kindergeld' ? 'Kindergeld' : 'Kinderfreibetrag'} | Steuerersparnis Freibetrag: ${fmtEuro(ergebnis.steuerersparnisFreibetrag)} €`}
            seitenTitel="Kindergeld-Rechner"
          />

          <AffiliateBox programId="wiso" context="kindergeld" />

          <AiExplain
            rechnerName="Kindergeld-Rechner"
            eingaben={{
              anzahlKinder,
              jahresbrutto: `${fmtEuro(parseDeutscheZahl(brutto))} €`,
              veranlagung: veranlagung === 'zusammen' ? 'Zusammenveranlagung' : 'Einzelveranlagung',
              kirchensteuer: kirchensteuer ? 'Ja (9%)' : 'Nein',
            }}
            ergebnis={{
              kindergeldMonat: `${ergebnis.kindergeldMonat} €`,
              kindergeldJahr: `${ergebnis.kindergeldJahr} €`,
              steuerersparnisFreibetrag: `${ergebnis.steuerersparnisFreibetrag} €`,
              guenstiger: ergebnis.gewinner === 'kindergeld' ? 'Kindergeld' : 'Kinderfreibetrag',
            }}
          />
        </>
      )}
    </div>
  );
}
