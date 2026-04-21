'use client';

import { useState, useMemo } from 'react';
import {
  berechneErbschaftsteuer,
  FREIBETRAEGE,
  VERWANDTSCHAFT_LABELS,
  type Erwerbsart,
  type Verwandtschaft,
} from '@/lib/berechnungen/erbschaftsteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const VERWANDTSCHAFT_OPTIONEN: { value: Verwandtschaft; label: string; kl: string }[] = [
  { value: 'ehepartner',         label: 'Ehepartner / eingetragener Lebenspartner', kl: 'Kl. I' },
  { value: 'kind',               label: 'Kind (inkl. Stief-/Adoptivkind)', kl: 'Kl. I' },
  { value: 'enkel-eltern-tot',   label: 'Enkelkind (Eltern verstorben)', kl: 'Kl. I' },
  { value: 'enkel-eltern-leben', label: 'Enkelkind (Eltern leben)', kl: 'Kl. I' },
  { value: 'eltern-erbschaft',   label: 'Elternteil / Großelternteil (bei Erbschaft)', kl: 'Kl. I' },
  { value: 'eltern-schenkung',   label: 'Elternteil / Großelternteil (bei Schenkung)', kl: 'Kl. II' },
  { value: 'geschwister',        label: 'Geschwister', kl: 'Kl. II' },
  { value: 'nichte-neffe',       label: 'Nichte / Neffe', kl: 'Kl. II' },
  { value: 'stiefeltern',        label: 'Stiefeltern / Schwiegereltern', kl: 'Kl. II' },
  { value: 'geschieden',         label: 'Geschiedener Ehepartner', kl: 'Kl. II' },
  { value: 'nicht-verwandt',     label: 'Nicht verwandt / Freund', kl: 'Kl. III' },
];

export default function ErbschaftsteuerRechner() {
  const [erwerbsart, setErwerbsart] = useState<Erwerbsart>('erbschaft');
  const [wert, setWert] = useState('300000');
  const [verwandtschaft, setVerwandtschaft] = useState<Verwandtschaft>('kind');
  const [vorschenkungen, setVorschenkungen] = useState('0');
  const [selbstgenutzteImmobilie, setSelbstgenutzteImmobilie] = useState(false);
  const [hausratFreibetrag, setHausratFreibetrag] = useState(false);
  const [alterKindRaw, setAlterKindRaw] = useState('');

  const kindAlterRelevant =
    erwerbsart === 'erbschaft' &&
    (verwandtschaft === 'kind' || verwandtschaft === 'enkel-eltern-tot');

  const alterKindNum = alterKindRaw.trim() === '' ? undefined : Math.max(0, parseDeutscheZahl(alterKindRaw));

  const ergebnis = useMemo(
    () => berechneErbschaftsteuer({
      erwerbsart,
      wert: parseDeutscheZahl(wert),
      verwandtschaft,
      vorschenkungen: parseDeutscheZahl(vorschenkungen),
      selbstgenutzteImmobilie,
      hausratFreibetrag,
      alterKind: kindAlterRelevant ? alterKindNum : undefined,
    }),
    [erwerbsart, wert, verwandtschaft, vorschenkungen, selbstgenutzteImmobilie, hausratFreibetrag, kindAlterRelevant, alterKindNum],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* === 1: Erwerbsart === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Art des Erwerbs
        </h2>
        <RadioToggleGroup
          name="erbschaft-erwerbsart"
          legend="Art des Erwerbs"
          srOnlyLegend
          options={[
            { value: 'erbschaft', label: '⚱️ Erbschaft' },
            { value: 'schenkung', label: '🎁 Schenkung' },
          ]}
          value={erwerbsart}
          onChange={(v) => setErwerbsart(v as Erwerbsart)}
        />
      </div>

      {/* === 2: Wert === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Wert der {erwerbsart === 'erbschaft' ? 'Erbschaft' : 'Schenkung'}
        </h2>
        <NummerEingabe value={wert} onChange={setWert} placeholder="300.000" einheit="€" />
      </div>

      {/* === 3: Verwandtschaft === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Verwandtschaftsgrad
        </h2>
        <select id="erbschaftsteuer-select-1" aria-label="Verwandtschaftsgrad"
          value={verwandtschaft}
          onChange={e => setVerwandtschaft(e.target.value as Verwandtschaft)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {VERWANDTSCHAFT_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>{o.label} ({o.kl})</option>
          ))}
        </select>
        {kindAlterRelevant && (
          <div className="mt-3">
            <label htmlFor="erbschaftsteuer-alter-kind" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Alter des Kindes bei Erbfall (optional)
            </label>
            <NummerEingabe
              value={alterKindRaw}
              onChange={setAlterKindRaw}
              placeholder="bei Leerlassen: 52.000 € (Höchstbetrag)"
              einheit="Jahre"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              § 17 Abs. 2 ErbStG-Staffel: bis 5 J. 52k € · 6–10 J. 41k € · 11–15 J. 30,7k € · 16–20 J. 20,5k € · 21–27 J. 10,3k € · ab 27 J. 0 €.
            </p>
          </div>
        )}
      </div>

      {/* === 4: Vorschenkungen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Vorherige Schenkungen (letzte 10 Jahre)
        </h2>
        <NummerEingabe value={vorschenkungen} onChange={setVorschenkungen} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          § 14 ErbStG: Schenkungen der letzten 10 Jahre werden zum Gesamterwerb kumuliert. Die auf den Vorerwerb tatsächlich oder fiktiv zu zahlende Steuer wird anschließend angerechnet.
        </p>
      </div>

      {/* === 5: Hausrat-Freibetrag === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Hausrat im Erwerb enthalten?
        </h2>
        <RadioToggleGroup
          name="erbschaft-hausrat"
          legend="Hausrat-Freibetrag berücksichtigen?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: '🛋️ Ja' },
          ]}
          value={hausratFreibetrag ? 'ja' : 'nein'}
          onChange={(v) => setHausratFreibetrag(v === 'ja')}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          § 13 Abs. 1 Nr. 1 ErbStG: 41.000 € in Steuerklasse I, 12.000 € in Steuerklasse II und III.
        </p>
      </div>

      {/* === 6: Immobilie === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
          Selbstgenutzte Immobilie enthalten?
        </h2>
        <RadioToggleGroup
          name="erbschaft-immobilie"
          legend="Selbstgenutzte Immobilie enthalten?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: '🏡 Ja' },
          ]}
          value={selbstgenutzteImmobilie ? 'ja' : 'nein'}
          onChange={(v) => setSelbstgenutzteImmobilie(v === 'ja')}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Selbstgenutzte Immobilien bis 200 m² können an Ehepartner/Kinder steuerfrei vererbt werden (10-Jahres-Selbstnutzung erforderlich).
        </p>
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis.steuerfrei ? (
        <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
          <p className="text-white/80 text-sm mb-1">Erbschaftsteuer</p>
          <p className="text-5xl font-bold">0 €</p>
          <p className="text-white/90 text-sm mt-2">✓ Ihr Freibetrag von {fmtEuro(ergebnis.gesamtFreibetrag)} € reicht aus — keine Steuer fällig!</p>
        </div>
      ) : (
        <div className="result-box mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-white/80 text-sm mb-1">{erwerbsart === 'erbschaft' ? 'Erbschaftsteuer' : 'Schenkungsteuer'}</p>
              <p className="text-5xl font-bold">{fmtEuro(ergebnis.steuerbetrag)} €</p>
              <p className="text-white/80 text-sm mt-1">
                Steuerklasse {ergebnis.steuerklasse} · Steuersatz {ergebnis.steuersatz}%
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                Netto: {fmtEuro(ergebnis.nettoErbschaft)} €
              </span>
            </div>
          </div>
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
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Wert der {erwerbsart === 'erbschaft' ? 'Erbschaft' : 'Schenkung'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.wert)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Persönlicher Freibetrag
                  <span className="text-xs text-gray-600 ml-1">({ergebnis.verwandtschaftLabel})</span>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.persoenlicherFreibetrag)} €</td>
              </tr>
              {ergebnis.versorgungsfreibetrag > 0 && ergebnis.vorschenkungen === 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Versorgungsfreibetrag</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.versorgungsfreibetrag)} €</td>
                </tr>
              )}
              {ergebnis.hausratFreibetrag > 0 && ergebnis.vorschenkungen === 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Hausrat-Freibetrag (§ 13 ErbStG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.hausratFreibetrag)} €</td>
                </tr>
              )}
              {ergebnis.vorschenkungen > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Vorschenkungen (§ 14 ErbStG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">+{fmtEuro(ergebnis.vorschenkungen)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Steuerpflichtiger {ergebnis.vorschenkungen > 0 ? 'Gesamterwerb' : 'Erwerb'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.steuerpflichtigerErwerb)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Steuerklasse</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.steuerklasse}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Steuersatz (§ 19 ErbStG)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.steuersatz} %</td>
              </tr>
              {ergebnis.anrechenbareVorsteuer > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">− Anrechnung auf Vorschenkung (§ 14 Abs. 1 ErbStG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.anrechenbareVorsteuer)} €</td>
                </tr>
              )}
              <tr className={`font-bold ${ergebnis.steuerfrei ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                <td className={`px-4 py-3 whitespace-nowrap ${ergebnis.steuerfrei ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  = {erwerbsart === 'erbschaft' ? 'Erbschaftsteuer' : 'Schenkungsteuer'}
                </td>
                <td className={`px-4 py-3 text-right tabular-nums text-lg whitespace-nowrap ${ergebnis.steuerfrei ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {fmtEuro(ergebnis.steuerbetrag)} €
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Netto-{erwerbsart === 'erbschaft' ? 'Erbschaft' : 'Schenkung'}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtEuro(ergebnis.nettoErbschaft)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Immobilien-Hinweis */}
      {ergebnis.hinweisImmobilie && (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-green-800 dark:text-green-300 text-sm">
            <strong>🏡 Familienheim-Privileg:</strong> {ergebnis.hinweisImmobilie}
          </p>
        </div>
      )}

      {/* Freibeträge-Übersicht */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Freibeträge-Übersicht (§ 16 ErbStG)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Verwandtschaftsgrad</th>
                <th className="px-4 py-2 text-right font-semibold">Freibetrag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {(Object.keys(FREIBETRAEGE) as Verwandtschaft[])
                .filter(v => !(erwerbsart === 'erbschaft' && v === 'eltern-schenkung') && !(erwerbsart === 'schenkung' && v === 'eltern-erbschaft'))
                .map(v => {
                  const fb = erwerbsart === 'erbschaft' ? FREIBETRAEGE[v].erb : FREIBETRAEGE[v].schenk;
                  return (
                    <tr key={v} className={v === verwandtschaft ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{VERWANDTSCHAFT_LABELS[v]}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(fb)} €</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 10-Jahres-Tipp bei Schenkung */}
      {erwerbsart === 'schenkung' && (
        <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
          <p className="text-indigo-800 dark:text-indigo-300 text-sm">
            <strong>💡 Tipp:</strong> Der Freibetrag erneuert sich alle 10 Jahre. Bei rechtzeitiger Planung können Sie große Vermögen steuerfrei übertragen — etwa bei einem Kind: 400.000 € alle 10 Jahre. Über 30 Jahre sind das bis zu 1,2 Mio. € pro Kind steuerfrei.
          </p>
        </div>
      )}

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung ist vereinfacht. Sonderfälle wie Betriebsvermögen, Nießbrauch, die genaue Immobilienbewertung oder altersabhängige Versorgungsfreibeträge für Kinder sind nicht berücksichtigt. Bei größeren Erbschaften/Schenkungen empfehlen wir eine steuerliche Beratung.
        </p>
      </div>

      <CrossLink href="/wohnen/grunderwerbsteuer-rechner" emoji="🏠" text="Grunderwerbsteuer beim Immobilienkauf berechnen" />
      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif bei Verheirateten nutzen" />
      <CrossLink href="/finanzen/rentenrechner" emoji="🏖️" text="Rentenlücke berechnen" />

      <ErgebnisAktionen
        ergebnisText={`${erwerbsart === 'erbschaft' ? 'Erbschaftsteuer' : 'Schenkungsteuer'}: ${fmtEuro(ergebnis.steuerbetrag)} € | Wert: ${fmtEuro(ergebnis.wert)} € | Freibetrag: ${fmtEuro(ergebnis.gesamtFreibetrag)} € | Steuerklasse ${ergebnis.steuerklasse}, Satz ${ergebnis.steuersatz}% | Netto: ${fmtEuro(ergebnis.nettoErbschaft)} €`}
        seitenTitel="Erbschaftsteuer-Rechner"
      />

      <AffiliateBox programId="wiso" context="erbschaft" />
      <AffiliateBox programId="smartsteuer" context="erbschaft" />

      <AiExplain
        rechnerName="Erbschaftsteuer-Rechner"
        eingaben={{
          erwerbsart,
          wert: `${fmtEuro(parseDeutscheZahl(wert))} €`,
          verwandtschaft: VERWANDTSCHAFT_LABELS[verwandtschaft],
          vorschenkungen: `${fmtEuro(parseDeutscheZahl(vorschenkungen))} €`,
          immobilie: selbstgenutzteImmobilie ? 'Ja' : 'Nein',
          hausrat: hausratFreibetrag ? 'Ja' : 'Nein',
        }}
        ergebnis={{
          steuerklasse: ergebnis.steuerklasse,
          freibetrag: `${ergebnis.gesamtFreibetrag} €`,
          steuerpflErwerb: `${ergebnis.steuerpflichtigerErwerb} €`,
          steuersatz: `${ergebnis.steuersatz} %`,
          steuer: `${ergebnis.steuerbetrag} €`,
          netto: `${ergebnis.nettoErbschaft} €`,
        }}
      />
    </div>
  );
}
