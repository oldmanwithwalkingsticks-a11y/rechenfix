'use client';

import { useState, useMemo } from 'react';
import {
  berechneMinijob,
  MINIJOB_GRENZE,
  MIDIJOB_OBERGRENZE,
  type MinijobArt,
} from '@/lib/berechnungen/minijob';
import { clampInputValue, parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

// W200: die geltende Grenze aus der Lib (ab 01.01.2027: 633 €), vorher fest 603 mit „(Grenze)“
const GRENZE = String(MINIJOB_GRENZE);
const SCHNELLWAHL = Array.from(new Set(['450', '520', '538', '556', '603', GRENZE]));

// W207: „-“, „,“ und „.“ sowie negative Werte zählen als 0, vorher zeigte der Rechner „NaN €“ (Guard G1)
function zahlOderNull(wert: string): number {
  const zahl = parseDeutscheZahl(wert);
  return Number.isFinite(zahl) && zahl > 0 ? zahl : 0;
}

export default function MinijobRechner() {
  const [verdienst, setVerdienst] = useState('538');
  const [art, setArt] = useState<MinijobArt>('gewerblich');
  const [rvPflicht, setRvPflicht] = useState(true);
  const [stunden, setStunden] = useState('');

  const verdienstNum = zahlOderNull(verdienst);
  const stundenNum = zahlOderNull(stunden) || undefined;

  const ergebnis = useMemo(() => berechneMinijob({
    verdienst: verdienstNum,
    art,
    rentenversicherungspflicht: rvPflicht,
    stundenProWoche: stundenNum,
  }), [verdienstNum, art, rvPflicht, stundenNum]);

  // Zum Vergleich: immer beide Varianten rechnen
  const vergleichOhneRv = useMemo(() => berechneMinijob({
    verdienst: verdienstNum,
    art,
    rentenversicherungspflicht: false,
    stundenProWoche: stundenNum,
  }), [verdienstNum, art, stundenNum]);

  const vergleichMitRv = useMemo(() => berechneMinijob({
    verdienst: verdienstNum,
    art,
    rentenversicherungspflicht: true,
    stundenProWoche: stundenNum,
  }), [verdienstNum, art, stundenNum]);

  // W207: Pauschalen, Netto und Aufschlüsselung gibt es nur im Minijob. Darüber zeigt der Rechner die
  // Einordnung und verweist auf den Midijob- bzw. Brutto-Netto-Rechner.
  const istMinijob = ergebnis.status === 'minijob';
  const statusText = ergebnis.status === 'midijob' ? 'Midijob-Übergangsbereich' : 'reguläre Beschäftigung';

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // W184: gewerblich enthalten die AG-Kosten den Beitrag zur Berufsgenossenschaft (gesetzliche
  // Unfallversicherung) nicht — vorher hieß das Ergebnis trotzdem „Gesamtkosten“. Im Privathaushalt
  // ist die Unfallversicherung (1,6 %) enthalten.
  const ohneBg = art === 'gewerblich';
  const agKostenLabel = ohneBg ? 'Arbeitgeberkosten (ohne Beitrag zur Berufsgenossenschaft)' : 'Arbeitgeber-Gesamtkosten';
  // W184: Prozent und Stunden vorher roh im Kopier-/PDF-Text („+31.17%“, „10.01 h“), jetzt de-DE
  const fmtZ = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

  const statusLabel =
    ergebnis.status === 'minijob' ? { text: 'Minijob ✓', color: 'bg-green-700' } :
    ergebnis.status === 'midijob' ? { text: '⚠️ Midijob-Übergangsbereich', color: 'bg-orange-700' } :
    { text: '⚠️ Reguläre Beschäftigung', color: 'bg-red-600' }; // W188: Plaketten -700/-600 statt -500 (weiße Schrift ≥ 4,5:1)

  return (
    <div>
      {/* === 1: Verdienst === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Monatlicher Verdienst
        </h2>
        <NummerEingabe aria-label="Monatlicher Verdienst" value={verdienst} onChange={v => setVerdienst(clampInputValue(v, 0, null))} min={0} placeholder="538" einheit="€" />
        <div className="flex flex-wrap gap-2 mt-2">
          {SCHNELLWAHL.map(v => (
            <button type="button" aria-pressed={verdienst === v}
              key={v}
              onClick={() => setVerdienst(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${verdienst === v ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {v} €{v === GRENZE ? ' (Grenze)' : ''}
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
        <RadioToggleGroup
          name="minijob-art"
          legend="Art des Minijobs"
          srOnlyLegend
          options={[
            { value: 'gewerblich', label: '🏢 Gewerblich' },
            { value: 'privathaushalt', label: '🏡 Privathaushalt' },
          ]}
          value={art}
          onChange={(v) => setArt(v as MinijobArt)}
        />
      </div>

      {/* === 3: RV-Pflicht === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Rentenversicherungspflicht
        </h2>
        <RadioToggleGroup
          name="minijob-rv"
          legend="Rentenversicherungspflicht"
          srOnlyLegend
          options={[
            { value: 'ja', label: 'Ja (Standard seit 2013)' },
            { value: 'nein', label: 'Nein (Befreiung beantragt)' },
          ]}
          value={rvPflicht ? 'ja' : 'nein'}
          onChange={(v) => setRvPflicht(v === 'ja')}
          columns={2}
        />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Sie können sich von der RV-Pflicht befreien lassen. Dann entfällt Ihr Eigenanteil, aber Sie erwerben keine Rentenpunkte.
        </p>
      </div>

      {/* === 4: Stunden === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Stunden pro Woche <span className="text-xs font-normal text-gray-600 dark:text-gray-400">(optional)</span>
        </h2>
        <NummerEingabe aria-label="Stunden pro Woche (optional)" value={stunden} onChange={v => setStunden(clampInputValue(v, 0, null))} min={0} placeholder="z.B. 10" einheit="Std." />
      </div>

      {/* === ERGEBNIS === */}
      {istMinijob ? (
        <div className="result-box mb-6">
          <p className="text-white/80 text-sm mb-1">Netto für Arbeitnehmer</p>
          <p className="text-5xl font-bold">{fmtEuro(ergebnis.nettoAN)} €</p>
          <p className="text-white/80 text-sm mt-1">
            {agKostenLabel}: <strong>{fmtEuro(ergebnis.agGesamtkosten)} €</strong>
          </p>
        </div>
      ) : (
        <div className="result-box mb-6">
          <p className="text-white/80 text-sm mb-1">{fmtEuro(ergebnis.verdienst)} € im Monat</p>
          <p className="text-4xl font-bold">Kein Minijob</p>
          <p className="text-white/80 text-sm mt-1">
            Über der Minijob-Grenze von {ergebnis.minijobGrenze} €: {statusText}, keine Pauschalabgaben
          </p>
        </div>
      )}

      {/* Midijob-Warnung */}
      {ergebnis.status === 'midijob' && (
        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-xl p-4 mb-6">
          <p className="text-orange-800 dark:text-orange-300 text-sm">
            <strong>⚠️ Übergangsbereich (Midijob):</strong> Ihr Verdienst liegt über der Minijob-Grenze von {ergebnis.minijobGrenze} € und höchstens bei {MIDIJOB_OBERGRENZE.toLocaleString('de-DE')} €. Pauschalabgaben fallen hier nicht an: Der Arbeitgeber zahlt seinen regulären Anteil zur Sozialversicherung, Ihre Beiträge sind reduziert und steigen gleitend bis zum vollen Satz (§ 20 Abs. 2 SGB IV). Netto und Arbeitgeberkosten berechnet der <a href="/finanzen/midijob-rechner" className="underline underline-offset-2">Midijob-Rechner</a>.
          </p>
        </div>
      )}
      {ergebnis.status === 'regulaer' && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Reguläre Beschäftigung:</strong> Ihr Verdienst liegt über dem Midijob-Übergangsbereich. Es gelten volle Sozialabgaben und Lohnsteuer nach Ihrer persönlichen Steuerklasse. Nutzen Sie den <a href="/finanzen/brutto-netto-rechner" className="underline underline-offset-2">Brutto-Netto-Rechner</a>.
          </p>
        </div>
      )}

      {/* Aufschlüsselung AN/AG — W207: nur im Minijob */}
      {istMinijob && (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung</h2>
        </div>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Aufschlüsselung">
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
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">RV-Eigenanteil ({art === 'gewerblich' ? '3,6' : '13,6'} %{ergebnis.verdienst > 0 && ergebnis.verdienst < 175 ? ', Beitrag mindestens aus 175 €' : ''})</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">{ergebnis.rvEigenanteil > 0 ? `−${fmtEuro(ergebnis.rvEigenanteil)} €` : '—'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Rentenversicherung ({art === 'gewerblich' ? '15' : '5'} %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.agRentenversicherung)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Krankenversicherung ({ergebnis.agKvSatzProzent.toLocaleString('de-DE')} %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.agKrankenversicherung)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Pauschale Lohnsteuer (2 %)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.agLohnsteuer)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{art === 'gewerblich' ? 'Umlagen (U1, U2, Insolvenzgeld)' : 'Umlagen (U1, U2)'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.agUmlagen)} €</td>
              </tr>
              {ergebnis.agUnfallversicherung > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Unfallversicherung (1,6 %)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">—</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">−{fmtEuro(ergebnis.agUnfallversicherung)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Netto / {ohneBg ? 'AG-Kosten ohne BG-Beitrag' : 'Gesamtkosten'}</td>
                <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.nettoAN)} €</td>
                <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.agGesamtkosten)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          {ohneBg ? (
            <><strong>💡 Kosten Arbeitgeber:</strong> Ihr Minijob kostet den Arbeitgeber {fmtEuro(ergebnis.agGesamtkosten)} € — das sind {ergebnis.agAufschlagProzent.toLocaleString('de-DE')} % Aufschlag auf den Bruttoverdienst. Hinzu kommt der Beitrag zur Berufsgenossenschaft (gesetzliche Unfallversicherung), der je nach Branche unterschiedlich hoch ist und hier nicht enthalten ist.</>
          ) : (
            <><strong>💡 Gesamtkosten Arbeitgeber:</strong> Ihr Minijob kostet den Arbeitgeber insgesamt {fmtEuro(ergebnis.agGesamtkosten)} € — das sind {ergebnis.agAufschlagProzent.toLocaleString('de-DE')} % Aufschlag auf den Bruttoverdienst.</>
          )}
        </div>
      </div>
      )}

      {/* Stundenlohn-Info */}
      {ergebnis.stundenlohn !== null && (
        <div className={`border rounded-xl p-4 mb-6 ${ergebnis.unterMindestlohn ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30' : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'}`}>
          <p className={`text-sm ${ergebnis.unterMindestlohn ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
            {ergebnis.unterMindestlohn ? '⚠️' : '✓'} <strong>Ihr Stundenlohn:</strong> {fmtEuro(ergebnis.stundenlohn)} €/Std. (aktueller Mindestlohn: {fmtEuro(ergebnis.mindestlohn)} €/Std.)
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
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Mit RV-Pflicht</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(vergleichMitRv.nettoAN)} €</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                ca. {vergleichMitRv.rentenpunkteProJahrMitRv.toLocaleString('de-DE')} Rentenpunkte/Jahr
              </div>
            </div>
            <div className={`p-4 ${!rvPflicht ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Ohne RV (befreit)</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">{fmtEuro(vergleichOhneRv.nettoAN)} €</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">0 Rentenpunkte</div>
            </div>
          </div>
        </div>
      )}

      {/* Hinweis KV — W207: nur im Minijob, im Midijob besteht Versicherungsschutz */}
      {istMinijob && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-xs">
            <strong>⚠️ Hinweis:</strong> Als Minijobber sind Sie steuerfrei, aber auch nicht krankenversichert durch den Minijob. Sie müssen anderweitig krankenversichert sein (z.B. Familienversicherung, Studentenversicherung oder freiwillige Versicherung).
          </p>
        </div>
      )}

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto-Rechner für reguläre Gehälter" />
      <CrossLink href="/finanzen/stundenlohn-rechner" emoji="⏱️" text="Stundenlohn berechnen" />
      <CrossLink href="/arbeit/teilzeit-rechner" emoji="📅" text="Teilzeit-Rechner: Gehalt bei reduzierter Arbeitszeit" />

      {istMinijob ? (
        <ErgebnisAktionen
          ergebnisText={`Minijob ${fmtEuro(ergebnis.verdienst)} € (${art}): Netto ${fmtEuro(ergebnis.nettoAN)} € | RV-Eigenanteil ${fmtEuro(ergebnis.rvEigenanteil)} € | ${ohneBg ? 'AG-Kosten ohne BG-Beitrag' : 'AG-Gesamtkosten'} ${fmtEuro(ergebnis.agGesamtkosten)} € (+${fmtZ(ergebnis.agAufschlagProzent)} %)`}
          seitenTitel="Minijob-Rechner"
          pdfDaten={[
            {
              titel: 'Minijob',
              zeilen: [
                { label: 'Verdienst pro Monat', wert: `${fmtEuro(ergebnis.verdienst)} €` },
                { label: 'Netto (Arbeitnehmer)', wert: `${fmtEuro(ergebnis.nettoAN)} €`, highlight: true },
                { label: 'RV-Eigenanteil', wert: `- ${fmtEuro(ergebnis.rvEigenanteil)} €` },
                { label: 'Stundenlohn', wert: ergebnis.stundenlohn !== null ? `${fmtEuro(ergebnis.stundenlohn)} €` : 'n/a' },
                { label: 'Max. Stunden pro Woche', wert: `${fmtZ(ergebnis.maxStundenProWoche)} h` },
              ],
            },
            {
              titel: 'Arbeitgeber-Kosten',
              zeilen: [
                { label: ohneBg ? 'AG-Kosten (ohne Beitrag zur Berufsgenossenschaft)' : 'AG-Gesamtkosten', wert: `${fmtEuro(ergebnis.agGesamtkosten)} €` },
                { label: `Pauschale Krankenversicherung (${fmtZ(ergebnis.agKvSatzProzent)} %)`, wert: `${fmtEuro(ergebnis.agKrankenversicherung)} €` },
                { label: 'Aufschlag', wert: `+ ${fmtZ(ergebnis.agAufschlagProzent)} %` },
              ],
            },
          ]}
        />
      ) : (
        <ErgebnisAktionen
          ergebnisText={`${fmtEuro(ergebnis.verdienst)} € im Monat: kein Minijob (Grenze ${ergebnis.minijobGrenze} €), ${statusText}, keine Pauschalabgaben`}
          seitenTitel="Minijob-Rechner"
          pdfDaten={[
            {
              titel: 'Einordnung',
              zeilen: [
                { label: 'Verdienst pro Monat', wert: `${fmtEuro(ergebnis.verdienst)} €` },
                { label: 'Minijob-Grenze', wert: `${ergebnis.minijobGrenze} €` },
                { label: 'Einordnung', wert: statusText, highlight: true },
              ],
            },
          ]}
        />
      )}

      <AiExplain
        rechnerName="Minijob-Rechner"
        eingaben={{
          verdienst: `${fmtEuro(verdienstNum)} €`,
          art,
          rvPflicht: rvPflicht ? 'Ja' : 'Nein (befreit)',
          stunden: stunden || 'nicht angegeben',
        }}
        ergebnis={istMinijob ? {
          status: ergebnis.status,
          nettoAN: `${fmtEuro(ergebnis.nettoAN)} €`,
          rvEigenanteil: `${fmtEuro(ergebnis.rvEigenanteil)} €`,
          agKvPauschale: `${fmtZ(ergebnis.agKvSatzProzent)} % = ${fmtEuro(ergebnis.agKrankenversicherung)} €`,
          agGesamtkosten: `${fmtEuro(ergebnis.agGesamtkosten)} €${ohneBg ? ' (ohne Beitrag zur Berufsgenossenschaft)' : ''}`,
          agAufschlag: `${fmtZ(ergebnis.agAufschlagProzent)} %`,
          stundenlohn: ergebnis.stundenlohn !== null ? `${fmtEuro(ergebnis.stundenlohn)} €` : 'n/a',
        } : {
          status: ergebnis.status,
          einordnung: `kein Minijob, ${statusText}: über der Minijob-Grenze von ${ergebnis.minijobGrenze} €, keine Pauschalabgaben`,
          stundenlohn: ergebnis.stundenlohn !== null ? `${fmtEuro(ergebnis.stundenlohn)} €` : 'n/a',
        }}
      />
    </div>
  );
}
