'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Ertragsart = 'zinsen' | 'dividenden' | 'aktien' | 'aktien-etf' | 'misch-etf';

const ERTRAGSARTEN: { key: Ertragsart; label: string; teilfreistellung: number }[] = [
  { key: 'zinsen', label: 'Zinsen', teilfreistellung: 0 },
  { key: 'dividenden', label: 'Dividenden', teilfreistellung: 0 },
  { key: 'aktien', label: 'Aktien-Kursgewinne (direkt)', teilfreistellung: 0 },
  { key: 'aktien-etf', label: 'Aktien-ETF/Fonds (≥ 51 %)', teilfreistellung: 0.3 },
  { key: 'misch-etf', label: 'Misch-Fonds (≥ 25 % Aktien)', teilfreistellung: 0.15 },
];

type PauschStatus = 'nein' | 'teilweise' | 'ja';

export default function KapitalertragsteuerRechner() {
  const [ertragsart, setErtragsart] = useState<Ertragsart>('zinsen');
  const [ertrag, setErtrag] = useState('2000');
  const [pauschStatus, setPauschStatus] = useState<PauschStatus>('nein');
  const [restFreibetrag, setRestFreibetrag] = useState('500');
  const [verheiratet, setVerheiratet] = useState(false);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kirchensteuersatz, setKirchensteuersatz] = useState<8 | 9>(9);
  const [verluste, setVerluste] = useState('0');

  const nErtrag = Math.max(0, parseDeutscheZahl(ertrag));
  const nVerluste = Math.max(0, parseDeutscheZahl(verluste));
  const pauschVoll = verheiratet ? 2000 : 1000;
  const art = ERTRAGSARTEN.find(a => a.key === ertragsart)!;

  const ergebnis = useMemo(() => {
    const verfuegbarerPausch =
      pauschStatus === 'nein'
        ? pauschVoll
        : pauschStatus === 'ja'
          ? 0
          : Math.max(0, parseDeutscheZahl(restFreibetrag));

    const nachTeilfreistellung = nErtrag * (1 - art.teilfreistellung);
    const teilfreistellungBetrag = nErtrag - nachTeilfreistellung;

    const nachVerlust = Math.max(0, nachTeilfreistellung - nVerluste);
    const steuerpflichtig = Math.max(0, nachVerlust - verfuegbarerPausch);

    // Kirchensteuer reduziert die Bemessungsgrundlage der Abgeltungssteuer leicht:
    // AbgSt = e / (4 + k) , k = 0.08 / 0.09
    let abgSt = 0;
    if (steuerpflichtig > 0) {
      if (kirchensteuer) {
        const k = kirchensteuersatz / 100;
        abgSt = steuerpflichtig / (4 + k);
      } else {
        abgSt = steuerpflichtig * 0.25;
      }
    }
    const soli = abgSt * 0.055;
    const kiSt = kirchensteuer ? abgSt * (kirchensteuersatz / 100) : 0;
    const steuerGesamt = abgSt + soli + kiSt;
    const nettoErtrag = nErtrag - steuerGesamt;
    const effektiverSatz = nErtrag > 0 ? (steuerGesamt / nErtrag) * 100 : 0;

    return {
      verfuegbarerPausch,
      teilfreistellungBetrag,
      nachTeilfreistellung,
      nachVerlust,
      steuerpflichtig,
      abgSt,
      soli,
      kiSt,
      steuerGesamt,
      nettoErtrag,
      effektiverSatz,
    };
  }, [nErtrag, art, pauschStatus, pauschVoll, restFreibetrag, nVerluste, kirchensteuer, kirchensteuersatz]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* Ertragsart */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Art der Kapitalerträge</label>
        <div className="flex flex-wrap gap-2">
          {ERTRAGSARTEN.map(a => (
            <button
              key={a.key}
              onClick={() => setErtragsart(a.key)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                ertragsart === a.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        {art.teilfreistellung > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Teilfreistellung: <strong>{(art.teilfreistellung * 100).toFixed(0)} %</strong> steuerfrei (InvStG).
          </p>
        )}
      </div>

      {/* Ertrag */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe der Erträge pro Jahr</label>
        <NummerEingabe value={ertrag} onChange={setErtrag} placeholder="2000" einheit="€/Jahr" />
      </div>

      {/* Familienstand */}
      <div className="mb-6">
        <RadioToggleGroup
          name="kapitalertrag-verheiratet"
          legend="Familienstand"
          options={[
            { value: 'nein', label: 'Single (1.000 €)' },
            { value: 'ja', label: 'Verheiratet (2.000 €)' },
          ]}
          value={verheiratet ? 'ja' : 'nein'}
          onChange={(v) => setVerheiratet(v === 'ja')}
        />
      </div>

      {/* Sparerpauschbetrag */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sparerpauschbetrag ausgeschöpft?</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {([
            ['nein', `Nein (${fmt0(pauschVoll)} € frei)`],
            ['teilweise', 'Teilweise'],
            ['ja', 'Ja (komplett)'],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPauschStatus(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                pauschStatus === val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {pauschStatus === 'teilweise' && (
          <div className="mt-3">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Restlicher Freibetrag</label>
            <NummerEingabe value={restFreibetrag} onChange={setRestFreibetrag} placeholder="500" einheit="€" />
          </div>
        )}
      </div>

      {/* Kirchensteuer */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kirchensteuer</label>
        <div className="flex gap-2">
          {([
            [false, 'Nein'],
            [true, 'Ja'],
          ] as const).map(([val, label]) => (
            <button
              key={String(val)}
              onClick={() => setKirchensteuer(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                kirchensteuer === val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {kirchensteuer && (
          <div className="flex gap-2 mt-2">
            {([8, 9] as const).map(s => (
              <button
                key={s}
                onClick={() => setKirchensteuersatz(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  kirchensteuersatz === s
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {s} % (BW/BY: 8 %, sonst 9 %)
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Verlustverrechnung */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verlustverrechnung (optional)</label>
        <NummerEingabe value={verluste} onChange={setVerluste} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Realisierte Verluste aus dem gleichen Verlusttopf, die mit den Erträgen verrechnet werden können.</p>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
        <p className="text-white/90 text-sm mb-1">Netto-Ertrag nach Steuern</p>
        <p className="text-5xl font-bold">{fmt0(ergebnis.nettoErtrag)} €</p>
        <p className="text-white/90 text-sm mt-1">
          Steuerlast: <strong>{fmt0(ergebnis.steuerGesamt)} €</strong> · effektiver Steuersatz: <strong>{ergebnis.effektiverSatz.toFixed(2)} %</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Brutto-Ertrag</td>
              <td className="py-2 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmt(nErtrag)} €</td>
            </tr>
            {art.teilfreistellung > 0 && (
              <tr className="text-gray-600 dark:text-gray-400">
                <td className="py-2">− Teilfreistellung ({(art.teilfreistellung * 100).toFixed(0)} %)</td>
                <td className="py-2 text-right tabular-nums text-green-600 dark:text-green-400">− {fmt(ergebnis.teilfreistellungBetrag)} €</td>
              </tr>
            )}
            {nVerluste > 0 && (
              <tr className="text-gray-600 dark:text-gray-400">
                <td className="py-2">− Verlustverrechnung</td>
                <td className="py-2 text-right tabular-nums text-green-600 dark:text-green-400">− {fmt(Math.min(nVerluste, ergebnis.nachTeilfreistellung))} €</td>
              </tr>
            )}
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">− Sparerpauschbetrag</td>
              <td className="py-2 text-right tabular-nums text-green-600 dark:text-green-400">− {fmt(Math.min(ergebnis.verfuegbarerPausch, ergebnis.nachVerlust))} €</td>
            </tr>
            <tr className="text-gray-700 dark:text-gray-300 font-semibold">
              <td className="py-2">= Steuerpflichtig</td>
              <td className="py-2 text-right tabular-nums">{fmt(ergebnis.steuerpflichtig)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Abgeltungssteuer (25 %)</td>
              <td className="py-2 text-right tabular-nums text-red-600 dark:text-red-400">{fmt(ergebnis.abgSt)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">Solidaritätszuschlag (5,5 %)</td>
              <td className="py-2 text-right tabular-nums text-red-600 dark:text-red-400">{fmt(ergebnis.soli)} €</td>
            </tr>
            {kirchensteuer && (
              <tr className="text-gray-600 dark:text-gray-400">
                <td className="py-2">Kirchensteuer ({kirchensteuersatz} %)</td>
                <td className="py-2 text-right tabular-nums text-red-600 dark:text-red-400">{fmt(ergebnis.kiSt)} €</td>
              </tr>
            )}
            <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
              <td className="py-2">Steuerlast gesamt</td>
              <td className="py-2 text-right tabular-nums">{fmt(ergebnis.steuerGesamt)} €</td>
            </tr>
            <tr className="font-bold text-green-700 dark:text-green-400">
              <td className="py-2">Netto-Ertrag</td>
              <td className="py-2 text-right tabular-nums">{fmt(ergebnis.nettoErtrag)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hinweis-Box */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-xs">
          <strong>Tipp:</strong> Erteilen Sie Ihrer Bank einen <strong>Freistellungsauftrag</strong> über den Sparerpauschbetrag ({fmt0(pauschVoll)} € {verheiratet ? 'für Ehepaare' : 'Single'}), damit die Bank keine Steuer auf die ersten Erträge abführt. Der Freibetrag kann auf mehrere Banken verteilt werden — die Summe darf den Höchstbetrag aber nicht überschreiten.
        </p>
      </div>

      <CrossLink href="/finanzen/etf-sparplanrechner" emoji="📈" text="ETF-Sparplanrechner: Vermögensaufbau mit ETFs berechnen" />
      <CrossLink href="/finanzen/sparrechner" emoji="💰" text="Sparrechner: Zinsen und Endkapital berechnen" />
      <CrossLink href="/finanzen/steuererstattung-rechner" emoji="📄" text="Steuererstattungs-Rechner: Wie viel kommt vom Finanzamt zurück?" />

      <ErgebnisAktionen
        ergebnisText={`Kapitalertragsteuer: Bei ${fmt0(nErtrag)} € ${art.label} = ${fmt0(ergebnis.steuerGesamt)} € Steuern (effektiv ${ergebnis.effektiverSatz.toFixed(2)} %) → Netto ${fmt0(ergebnis.nettoErtrag)} €`}
        seitenTitel="Kapitalertragsteuer-Rechner"
      />

      <AffiliateBox programId="verivox" context="kapitalertrag" />

      <AiExplain
        rechnerName="Kapitalertragsteuer-Rechner"
        eingaben={{
          ertragsart: art.label,
          bruttoErtragEuro: fmt(nErtrag),
          sparerpauschbetragEuro: fmt0(ergebnis.verfuegbarerPausch),
          verheiratet: verheiratet ? 'Ja' : 'Nein',
          kirchensteuer: kirchensteuer ? `Ja (${kirchensteuersatz} %)` : 'Nein',
          verlusteEuro: fmt(nVerluste),
        }}
        ergebnis={{
          steuerpflichtigEuro: fmt(ergebnis.steuerpflichtig),
          abgeltungssteuerEuro: fmt(ergebnis.abgSt),
          soliEuro: fmt(ergebnis.soli),
          kirchensteuerEuro: fmt(ergebnis.kiSt),
          steuerGesamtEuro: fmt(ergebnis.steuerGesamt),
          nettoErtragEuro: fmt(ergebnis.nettoErtrag),
          effektiverSatzProzent: `${ergebnis.effektiverSatz.toFixed(2)} %`,
        }}
      />
    </div>
  );
}
