'use client';

import { useState, useMemo } from 'react';
import {
  berechneBafoeg,
  type AusbildungsArt,
  type Wohnsituation,
  type Familienstand,
} from '@/lib/berechnungen/bafoeg';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const FAMILIENSTAND_OPTIONEN: { value: Familienstand; label: string }[] = [
  { value: 'verheiratet', label: 'Verheiratet / zusammenlebend' },
  { value: 'getrennt', label: 'Getrennt lebend' },
  { value: 'geschieden', label: 'Geschieden' },
  { value: 'verwitwet', label: 'Verwitwet / verstorben' },
  { value: 'elternunabhaengig', label: 'Elternunabhängig' },
];

export default function BafoegRechner() {
  const [ausbildung, setAusbildung] = useState<AusbildungsArt>('studium');
  const [wohnsituation, setWohnsituation] = useState<Wohnsituation>('eigene');
  const [einkommen, setEinkommen] = useState('0');
  const [vermoegen, setVermoegen] = useState('0');
  const [familienstand, setFamilienstand] = useState<Familienstand>('verheiratet');
  const [einkommenEltern1, setEinkommenEltern1] = useState('40000');
  const [einkommenEltern2, setEinkommenEltern2] = useState('0');
  const [geschwister, setGeschwister] = useState('0');
  const [selbstVersichert, setSelbstVersichert] = useState(false);
  const [hatKinder, setHatKinder] = useState(false);
  const [anzahlKinder, setAnzahlKinder] = useState('1');

  const elternunabhaengig = familienstand === 'elternunabhaengig';
  const verheiratet = familienstand === 'verheiratet';

  const ergebnis = useMemo(
    () => berechneBafoeg({
      ausbildung,
      wohnsituation,
      eigenesEinkommen: parseDeutscheZahl(einkommen),
      eigenesVermoegen: parseDeutscheZahl(vermoegen),
      familienstand,
      einkommenEltern1: parseDeutscheZahl(einkommenEltern1),
      einkommenEltern2: parseDeutscheZahl(einkommenEltern2),
      geschwisterInAusbildung: parseInt(geschwister) || 0,
      selbstVersichert,
      hatKinder,
      anzahlKinder: hatKinder ? (parseInt(anzahlKinder) || 1) : 0,
    }),
    [ausbildung, wohnsituation, einkommen, vermoegen, familienstand, einkommenEltern1, einkommenEltern2, geschwister, selbstVersichert, hatKinder, anzahlKinder],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Ausbildung & Wohnen === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Ausbildung &amp; Wohnsituation
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Art der Ausbildung</label>
            <div className="flex gap-2">
              {([['studium', '🎓 Studium'], ['schule', '📚 Schulische Ausbildung']] as const).map(([val, label]) => (
                <button key={val} onClick={() => setAusbildung(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${ausbildung === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnsituation</label>
            <div className="flex gap-2">
              {([['eltern', '🏠 Bei den Eltern'], ['eigene', '🏢 Eigene Wohnung']] as const).map(([val, label]) => (
                <button key={val} onClick={() => setWohnsituation(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${wohnsituation === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === 2: Eigenes Einkommen & Vermögen === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Eigenes Einkommen &amp; Vermögen
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monatliches Einkommen</label>
            <NummerEingabe value={einkommen} onChange={setEinkommen} placeholder="0" einheit="€/Monat" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minijob bis 603 € teilweise angerechnet. Freibetrag: 330 €</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenes Vermögen</label>
            <NummerEingabe value={vermoegen} onChange={setVermoegen} placeholder="0" einheit="€" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Freibetrag: 15.000 € (unter 30) bzw. 45.000 € (ab 30)</p>
          </div>
        </div>
      </div>

      {/* === 3: Eltern === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Elterneinkommen
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Familienstand der Eltern</label>
            <select
              value={familienstand}
              onChange={e => setFamilienstand(e.target.value as Familienstand)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {FAMILIENSTAND_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {elternunabhaengig && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                ✓ Kein Elterneinkommen wird angerechnet (z. B. nach 5 Jahren Erwerbstätigkeit oder ab 30 Jahren)
              </p>
            )}
          </div>

          {!elternunabhaengig && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {verheiratet ? 'Bruttoeinkommen Elternteil 1' : 'Bruttoeinkommen Elternteil'}
                </label>
                <NummerEingabe value={einkommenEltern1} onChange={setEinkommenEltern1} placeholder="40.000" einheit="€/Jahr" />
              </div>
              {verheiratet && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bruttoeinkommen Elternteil 2</label>
                  <NummerEingabe value={einkommenEltern2} onChange={setEinkommenEltern2} placeholder="0" einheit="€/Jahr" />
                </div>
              )}
            </div>
          )}

          {!elternunabhaengig && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschwister in Ausbildung</label>
              <select
                value={geschwister}
                onChange={e => setGeschwister(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              >
                {[0,1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}{n === 0 ? ' (keine)' : ''}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Geschwister unter 25 in Ausbildung (erhöht den Freibetrag)</p>
            </div>
          )}
        </div>
      </div>

      {/* === 4: Zuschläge === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Versicherung &amp; Kinder
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Krankenversicherung</label>
            <div className="flex gap-2">
              {([false, true] as const).map(val => (
                <button key={String(val)} onClick={() => setSelbstVersichert(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${selbstVersichert === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {val ? '💳 Selbst versichert' : '👨‍👩‍👧 Familienversichert'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigene Kinder</label>
            <div className="flex gap-2">
              {([false, true] as const).map(val => (
                <button key={String(val)} onClick={() => setHatKinder(val)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${hatKinder === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                  {val ? '👶 Ja' : 'Nein'}
                </button>
              ))}
            </div>
            {hatKinder && (
              <div className="mt-3 w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Kinder</label>
                <select
                  value={anzahlKinder}
                  onChange={e => setAnzahlKinder(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
                >
                  {[1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kinderbetreuungszuschlag: 160 € pro Kind</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          {ergebnis.hatAnspruch ? (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-white/80 text-sm mb-1">Voraussichtliches monatliches BAföG</p>
                  <p className="text-5xl font-bold">{fmtEuro(ergebnis.bafoegMonat)} €</p>
                </div>
                <div className="sm:text-right space-y-1">
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    {fmtEuro(ergebnis.bafoegMonat * 12)} €/Jahr
                  </span>
                  {ergebnis.istStudium && (
                    <div>
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        50% Zuschuss + 50% Darlehen
                      </span>
                    </div>
                  )}
                  {!ergebnis.istStudium && (
                    <div>
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        100% Zuschuss — keine Rückzahlung!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
              <p className="text-white/80 text-sm mb-1">Ergebnis</p>
              <p className="text-2xl sm:text-3xl font-bold">Voraussichtlich kein BAföG-Anspruch</p>
              {ergebnis.ablehnungsGrund && (
                <p className="text-white/70 text-sm mt-2">{ergebnis.ablehnungsGrund}</p>
              )}
            </div>
          )}

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {/* BEDARF */}
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">Bedarf</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                      Grundbedarf ({ausbildung === 'studium' ? 'Studium' : 'Schule'}, {wohnsituation === 'eigene' ? 'eigene Wohnung' : 'bei Eltern'})
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.grundbedarf)} €</td>
                  </tr>
                  {ergebnis.kvZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ KV-Zuschlag (selbst versichert)</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.kvZuschlag)} €</td>
                    </tr>
                  )}
                  {ergebnis.pvZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ PV-Zuschlag</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.pvZuschlag)} €</td>
                    </tr>
                  )}
                  {ergebnis.kinderZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ Kinderbetreuungszuschlag ({anzahlKinder} Kind{parseInt(anzahlKinder) > 1 ? 'er' : ''})</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.kinderZuschlag)} €</td>
                    </tr>
                  )}
                  <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                    <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300">= Gesamtbedarf</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtBedarf)} €</td>
                  </tr>

                  {/* ANRECHNUNGEN */}
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">Anrechnungen</td>
                  </tr>
                  {ergebnis.anrechnungEinkommen > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Eigenes Einkommen</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuro(ergebnis.anrechnungEinkommen)} €</td>
                    </tr>
                  )}
                  {ergebnis.anrechnungVermoegen > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Eigenes Vermögen</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuro(ergebnis.anrechnungVermoegen)} €</td>
                    </tr>
                  )}
                  {!ergebnis.elternunabhaengig && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                        Elterneinkommen
                        <span className="text-xs text-gray-600 ml-1">(Netto {fmtEuro(ergebnis.nettoEltern)} € − Freibetrag {fmtEuro(ergebnis.freibetragEltern)} €)</span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuro(ergebnis.anrechnungEltern)} €</td>
                    </tr>
                  )}
                  {ergebnis.elternunabhaengig && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Elterneinkommen</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">nicht angerechnet</td>
                    </tr>
                  )}
                  {ergebnis.anrechnungEinkommen === 0 && ergebnis.anrechnungVermoegen === 0 && ergebnis.anrechnungEltern === 0 && !ergebnis.elternunabhaengig && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Keine Anrechnungen</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">0 €</td>
                    </tr>
                  )}

                  {/* ERGEBNIS */}
                  <tr className={`font-bold ${ergebnis.hatAnspruch ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                    <td className={`px-4 py-3 ${ergebnis.hatAnspruch ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                      = BAföG-Anspruch
                    </td>
                    <td className={`px-4 py-3 text-right tabular-nums text-lg whitespace-nowrap ${ergebnis.hatAnspruch ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      {fmtEuro(ergebnis.bafoegMonat)} €/Monat
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rückzahlungs-Info (nur Studium) */}
          {ergebnis.hatAnspruch && ergebnis.istStudium && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm mb-3">📋 Rückzahlung (Studien-BAföG)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-indigo-700/70 dark:text-indigo-400/70 text-xs">Zuschuss (geschenkt)</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{fmtEuro(ergebnis.zuschussAnteil)} €</p>
                  <p className="text-xs text-indigo-700/60 dark:text-indigo-400/60">50% — keine Rückzahlung</p>
                </div>
                <div>
                  <p className="text-indigo-700/70 dark:text-indigo-400/70 text-xs">Darlehen (rückzahlbar)</p>
                  <p className="text-xl font-bold text-indigo-800 dark:text-indigo-300">{fmtEuro(ergebnis.darlehensAnteil)} €</p>
                  <p className="text-xs text-indigo-700/60 dark:text-indigo-400/60">50% — zinsloses Darlehen</p>
                </div>
                <div>
                  <p className="text-indigo-700/70 dark:text-indigo-400/70 text-xs">Max. Rückzahlung</p>
                  <p className="text-xl font-bold text-indigo-800 dark:text-indigo-300">{fmtEuro(ergebnis.maxRueckzahlung)} €</p>
                  <p className="text-xs text-indigo-700/60 dark:text-indigo-400/60">Gedeckelt — unabhängig von der Dauer</p>
                </div>
              </div>
            </div>
          )}

          {/* Schüler-BAföG Info */}
          {ergebnis.hatAnspruch && !ergebnis.istStudium && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>🎉 Vollzuschuss:</strong> Schüler-BAföG ist ein reiner Zuschuss und muss <strong>nicht zurückgezahlt</strong> werden!
              </p>
            </div>
          )}

          {/* Tipp */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
            <p className="text-green-800 dark:text-green-300 text-sm">
              <strong>💡 Tipp:</strong> Stellen Sie in jedem Fall einen BAföG-Antrag — auch wenn dieser Rechner wenig oder keinen Anspruch zeigt. Das BAföG-Amt berücksichtigt weitere Faktoren und Härtefälle. Die Bearbeitungszeit beträgt ca. 6-8 Wochen.
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Dies ist eine vereinfachte Schätzung. Die tatsächliche Berechnung durch das BAföG-Amt berücksichtigt die Steuerbescheide der Eltern, Werbungskosten, besondere Belastungen und weitere individuelle Faktoren. Bei Bezug von Bürgergeld oder Wohngeld gelten besondere Regeln. → <a href="/finanzen/wohngeld-rechner" className="underline">Wohngeld-Rechner</a>
            </p>
          </div>

          <CrossLink href="/finanzen/wohngeld-rechner" emoji="🏠" text="Wohngeld berechnen — Alternative zum BAföG prüfen" />
          <CrossLink href="/finanzen/buergergeld-rechner" emoji="📋" text="Bürgergeld berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.hatAnspruch
              ? `BAföG: ca. ${fmtEuro(ergebnis.bafoegMonat)} €/Monat (${ausbildung === 'studium' ? '50% Zuschuss + 50% Darlehen' : '100% Zuschuss'}) | Bedarf: ${fmtEuro(ergebnis.gesamtBedarf)} € | Anrechnung: ${fmtEuro(ergebnis.gesamtAnrechnung)} €`
              : `Kein BAföG-Anspruch | Bedarf: ${fmtEuro(ergebnis.gesamtBedarf)} € | Anrechnung: ${fmtEuro(ergebnis.gesamtAnrechnung)} €`
            }
            seitenTitel="BAföG-Rechner"
          />

          <AiExplain
            rechnerName="BAföG-Rechner"
            eingaben={{
              ausbildung,
              wohnsituation: wohnsituation === 'eigene' ? 'Eigene Wohnung' : 'Bei Eltern',
              einkommen: `${fmtEuro(parseDeutscheZahl(einkommen))} €/Monat`,
              familienstand,
              elternEinkommen: elternunabhaengig ? 'elternunabhängig' : `${fmtEuro(parseDeutscheZahl(einkommenEltern1))}${verheiratet ? ` + ${fmtEuro(parseDeutscheZahl(einkommenEltern2))}` : ''} €/Jahr`,
            }}
            ergebnis={{
              bafoeg: ergebnis.hatAnspruch ? `${ergebnis.bafoegMonat} €/Monat` : 'Kein Anspruch',
              bedarf: `${ergebnis.gesamtBedarf} €`,
              anrechnung: `${ergebnis.gesamtAnrechnung} €`,
            }}
          />
        </>
      )}
    </div>
  );
}
