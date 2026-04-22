'use client';

import { useState, useMemo } from 'react';
import {
  berechneBafoeg,
  type AusbildungsArt,
  type Wohnsituation,
  type Familienstand,
  type SchulForm,
  type ElternunabhaengigTatbestand,
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

const SCHULFORM_OPTIONEN: { value: SchulForm; label: string }[] = [
  {
    value: 'berufsfachschuleOhneVorausbildung',
    label: 'Berufsfach-/Fachschulklasse ohne Berufsausbildung (§ 12 Abs. 1 Nr. 1)',
  },
  {
    value: 'fachoberschuleMitVorausbildung',
    label: 'Abend-/Berufsaufbau-/Fachoberschule mit Berufsausbildung (§ 12 Abs. 1 Nr. 2)',
  },
];

/** § 11 Abs. 3 + Abs. 2a BAföG — Sentinel '' = kein Tatbestand. */
type TatbestandValue = ElternunabhaengigTatbestand | '';
const ELTERNUNABHAENGIG_OPTIONEN: { value: TatbestandValue; label: string }[] = [
  { value: '', label: 'Keine der folgenden (Standard-Fall)' },
  { value: 'abendgymnasium_kolleg', label: 'Abendgymnasium oder Kolleg (§ 11 Abs. 3 Nr. 1)' },
  { value: 'ueber_30_bei_beginn', label: 'Bei Ausbildungsbeginn mindestens 30 Jahre alt (Nr. 2)' },
  { value: '5_jahre_erwerbstaetig', label: 'Nach dem 18. LJ 5 Jahre erwerbstätig (Nr. 3)' },
  { value: '3_jahre_ausbildung_plus_3_erwerbstaetig', label: '3 Jahre Berufsausbildung + 3 Jahre erwerbstätig (Nr. 4)' },
  { value: 'eltern_nicht_verfuegbar', label: 'Eltern unbekannt / im Ausland / nicht leistungsfähig (Abs. 2a)' },
];

export default function BafoegRechner() {
  const [ausbildung, setAusbildung] = useState<AusbildungsArt>('studium');
  const [schulform, setSchulform] = useState<SchulForm>('berufsfachschuleOhneVorausbildung');
  const [wohnsituation, setWohnsituation] = useState<Wohnsituation>('eigene');
  const [einkommen, setEinkommen] = useState('0');
  const [vermoegen, setVermoegen] = useState('0');
  const [familienstand, setFamilienstand] = useState<Familienstand>('verheiratet');
  const [einkommenEltern1, setEinkommenEltern1] = useState('40000');
  const [einkommenEltern2, setEinkommenEltern2] = useState('0');
  const [geschwister, setGeschwister] = useState('0');
  const [gefoerdeteGeschwister, setGefoerdeteGeschwister] = useState('0');
  const [elternunabhaengigTatbestand, setElternunabhaengigTatbestand] = useState<TatbestandValue>('');
  const [selbstVersichert, setSelbstVersichert] = useState(false);
  const [hatKinder, setHatKinder] = useState(false);
  const [anzahlKinder, setAnzahlKinder] = useState('1');

  const elternunabhaengigViaFamilienstand = familienstand === 'elternunabhaengig';
  const elternunabhaengigViaTatbestand = elternunabhaengigTatbestand !== '';
  const elternunabhaengig = elternunabhaengigViaFamilienstand || elternunabhaengigViaTatbestand;
  const verheiratet = familienstand === 'verheiratet';

  const ergebnis = useMemo(
    () => berechneBafoeg({
      ausbildung,
      schulform,
      wohnsituation,
      eigenesEinkommen: parseDeutscheZahl(einkommen),
      eigenesVermoegen: parseDeutscheZahl(vermoegen),
      familienstand,
      einkommenEltern1: parseDeutscheZahl(einkommenEltern1),
      einkommenEltern2: parseDeutscheZahl(einkommenEltern2),
      geschwisterInAusbildung: parseInt(geschwister) || 0,
      gefoerdeteGeschwisterAnzahl: parseInt(gefoerdeteGeschwister) || 0,
      elternunabhaengig: elternunabhaengigTatbestand !== ''
        ? { tatbestand: elternunabhaengigTatbestand }
        : null,
      selbstVersichert,
      hatKinder,
      anzahlKinder: hatKinder ? (parseInt(anzahlKinder) || 1) : 0,
    }),
    [ausbildung, schulform, wohnsituation, einkommen, vermoegen, familienstand, einkommenEltern1, einkommenEltern2, geschwister, gefoerdeteGeschwister, elternunabhaengigTatbestand, selbstVersichert, hatKinder, anzahlKinder],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Ausbildung & Wohnen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Ausbildung &amp; Wohnsituation
        </h2>

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

          {ausbildung === 'schule' && (
            <div>
              <label htmlFor="bafoeg-select-schulform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Schulform (§ 12 BAföG)
              </label>
              <select id="bafoeg-select-schulform"
                value={schulform}
                onChange={e => setSchulform(e.target.value as SchulForm)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              >
                {SCHULFORM_OPTIONEN.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {schulform === 'berufsfachschuleOhneVorausbildung' ? (
                  <>Bedarf nach § 12 Abs. 1 Nr. 1 / Abs. 2 Nr. 1 BAföG: <strong>276 € bei Eltern</strong>, <strong>666 € auswärts</strong>.</>
                ) : (
                  <>Bedarf nach § 12 Abs. 1 Nr. 2 / Abs. 2 Nr. 2 BAföG: <strong>498 € bei Eltern</strong>, <strong>775 € auswärts</strong>.</>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* === 2: Eigenes Einkommen & Vermögen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Eigenes Einkommen &amp; Vermögen
        </h2>

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
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Elterneinkommen
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="bafoeg-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Familienstand der Eltern</label>
            <select id="bafoeg-select-1"
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
                ✓ Kein Elterneinkommen wird angerechnet
                {elternunabhaengigViaTatbestand && !elternunabhaengigViaFamilienstand
                  ? ' (Tatbestand § 11 Abs. 3 / Abs. 2a BAföG unten ausgewählt)'
                  : ' (z. B. nach 5 Jahren Erwerbstätigkeit oder ab 30 Jahren)'
                }
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

          {/* Elternunabhängige Förderung § 11 Abs. 3 + Abs. 2a BAföG (aufklappbar) */}
          {!elternunabhaengigViaFamilienstand && (
            <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden" open={elternunabhaengigViaTatbestand}>
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                Elternunabhängige Förderung prüfen (§ 11 Abs. 3 BAföG)
              </summary>
              <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <label htmlFor="bafoeg-select-tatbestand" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mt-2">
                  Tatbestand auswählen (falls zutreffend):
                </label>
                <select id="bafoeg-select-tatbestand"
                  value={elternunabhaengigTatbestand}
                  onChange={e => setElternunabhaengigTatbestand(e.target.value as TatbestandValue)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
                >
                  {ELTERNUNABHAENGIG_OPTIONEN.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Bei den Tatbeständen &bdquo;5 Jahre erwerbstätig&ldquo; und &bdquo;3 Jahre Berufsausbildung + 3 Jahre erwerbstätig&ldquo;
                  verlangt § 11 Abs. 3 Satz 2 BAföG zusätzlich, dass Sie sich aus dem Ertrag der Erwerbstätigkeit
                  selbst unterhalten konnten. Diese Detail-Prüfung muss das BAföG-Amt im Einzelfall vornehmen —
                  der Rechner nimmt die Voraussetzung als erfüllt an, wenn Sie den Tatbestand auswählen.
                </p>
              </div>
            </details>
          )}

          {!elternunabhaengig && (
            <div>
              <label htmlFor="bafoeg-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschwister in Ausbildung (ohne eigenes BAföG)</label>
              <select id="bafoeg-select-2"
                value={geschwister}
                onChange={e => setGeschwister(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              >
                {[0,1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}{n === 0 ? ' (keine)' : ''}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Geschwister unter 25 in BAföG-fähiger Ausbildung <strong>ohne eigenen BAföG-Bezug</strong>
                (z. B. Azubi mit Ausbildungsvergütung). Diese erhöhen den Elternfreibetrag um
                730 €/Monat pro Kopf (§ 25 Abs. 3 BAföG) und senken die Anrechnungsquote um
                5 %-Punkte (§ 25 Abs. 6 BAföG). Geschwister MIT eigenem BAföG gehören ins
                separate Feld darunter.
              </p>
            </div>
          )}

          {!elternunabhaengig && (
            <div>
              <label htmlFor="bafoeg-select-gefoerdert" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weitere Geschwister mit eigenem BAföG- / BAB-Bezug (§ 11 Abs. 4 BAföG)
              </label>
              <select id="bafoeg-select-gefoerdert"
                value={gefoerdeteGeschwister}
                onChange={e => setGefoerdeteGeschwister(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              >
                {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}{n === 0 ? ' (keine)' : ''}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                § 11 Abs. 4 BAföG: Wenn mehrere Geschwister gleichzeitig BAföG oder BAB
                (Berufsausbildungsbeihilfe nach § 56 SGB III) beziehen, wird der auf die Eltern
                entfallende Anrechnungsbetrag zu gleichen Teilen auf alle geförderten Kinder
                aufgeteilt. Zählen Sie hier nur Geschwister mit <strong>eigenem</strong>
                {' '}BAföG/BAB — NICHT solche, die oben unter &bdquo;Geschwister in Ausbildung&ldquo;
                bereits erfasst sind.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* === 4: Zuschläge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Versicherung &amp; Kinder
        </h2>

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
                <label htmlFor="bafoeg-select-3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Kinder</label>
                <select id="bafoeg-select-3"
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
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
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
                  {!ergebnis.elternunabhaengig && ergebnis.aufteilungDivisor > 1 && (
                    <>
                      <tr>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                          Anrechnungsbetrag Eltern (§ 25 BAföG)
                          <span className="text-xs text-gray-600 ml-1">(vor § 11 Abs. 4-Aufteilung)</span>
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmtEuro(ergebnis.anrechnungElternVorAufteilung)} €</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                          ÷ Aufteilung auf Antragsteller + {ergebnis.aufteilungDivisor - 1} gefördert{ergebnis.aufteilungDivisor - 1 === 1 ? 'es' : 'e'} Geschwister
                          <span className="text-xs text-gray-600 ml-1">(§ 11 Abs. 4 BAföG)</span>
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">÷ {ergebnis.aufteilungDivisor}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                          Anrechnung nach Aufteilung
                          <span className="text-xs text-gray-600 ml-1">(Netto {fmtEuro(ergebnis.nettoEltern)} € − Freibetrag {fmtEuro(ergebnis.freibetragEltern)} €)</span>
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuro(ergebnis.anrechnungEltern)} €</td>
                      </tr>
                    </>
                  )}
                  {!ergebnis.elternunabhaengig && ergebnis.aufteilungDivisor === 1 && (
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
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                        Elterneinkommen
                        {ergebnis.elternunabhaengigGrund && ergebnis.elternunabhaengigGrund.startsWith('tatbestand:') && (
                          <span className="text-xs text-gray-600 ml-1">(§ 11 Abs. 3 / Abs. 2a BAföG)</span>
                        )}
                      </td>
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

          {/* Disclaimer-Block — Vereinfachungen gegenüber BAföG-Amt */}
          <div className="mb-6 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 px-3 py-2.5 flex gap-2 items-start">
            <span className="text-gray-500 dark:text-gray-400 text-sm leading-tight" aria-hidden="true">ℹ️</span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="font-semibold text-gray-700 dark:text-gray-300">Vereinfachte Schätzung — Abweichungen möglich.</strong>{' '}
              Dieser Rechner bildet die Grundmechanik nach §§ 11, 12, 13, 13a, 25 BAföG ab —
              inklusive elternunabhängiger Förderung (§ 11 Abs. 3) und Aufteilung bei
              mehreren geförderten Geschwistern (§ 11 Abs. 4). Nicht berücksichtigt sind:
              Härtefallregelungen (§ 25 Abs. 6 BAföG), Detail-Voraussetzungen der
              elternunabhängigen Förderung (§ 11 Abs. 3 Satz 2 BAföG — Selbstunterhalts-Prüfung
              in den Erwerbsjahren) sowie Sonderfälle bei Selbstständigkeit oder
              schwankendem Einkommen der Eltern. Der vom BAföG-Amt erlassene Bescheid
              ist rechtsverbindlich.
            </p>
          </div>

          {/* Rückzahlungs-Info (nur Studium) */}
          {ergebnis.hatAnspruch && ergebnis.istStudium && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
              <h2 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm mb-3">📋 Rückzahlung (Studien-BAföG)</h2>
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
