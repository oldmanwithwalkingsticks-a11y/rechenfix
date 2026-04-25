'use client';

import { useState, useMemo } from 'react';
import {
  berechneWaermepumpe,
  DAEMMSTANDARD_LABELS,
  HEIZUNG_LABELS,
  type Daemmstandard,
  type AlteHeizung,
} from '@/lib/berechnungen/waermepumpe';
import { getStrompreis } from '@/lib/berechnungen/strompreis';
import {
  BEG_FOERDERUNG_2026,
  berechneBegFoerderquote,
  BEG_LAUTSTAERKE_HINWEIS_2026,
} from '@/lib/berechnungen/beg-foerderung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function WaermepumpeRechner() {
  const [wohnflaeche, setWohnflaeche] = useState('120');
  const [daemmstandard, setDaemmstandard] = useState<Daemmstandard>('altbau-teilsaniert');
  const [alteHeizung, setAlteHeizung] = useState<AlteHeizung>('gas');
  const [heizkostenBekannt, setHeizkostenBekannt] = useState(true);
  const [heizkostenAktuell, setHeizkostenAktuell] = useState('2000');
  // Wärmepumpenstrom-Spezialtarif (HT, separater Zähler) ist als Default
  // realistischer als Haushaltsstrom — Nutzer kann hochklemmen.
  const [strompreis, setStrompreis] = useState(String(getStrompreis('waermepumpen_tarif')));
  // F1: BEG-Boni-Schalter — Förderquote berechnet sich daraus dynamisch
  const [boniKlima, setBoniKlima] = useState(false);
  const [boniEinkommen, setBoniEinkommen] = useState(false);
  const [boniEffizienz, setBoniEffizienz] = useState(false);
  const [gaspreis, setGaspreis] = useState('12');
  const [anschaffung, setAnschaffung] = useState('30000');
  const [foerderung, setFoerderung] = useState('30');
  const [jahre, setJahre] = useState('20');

  const ergebnis = useMemo(
    () => berechneWaermepumpe({
      wohnflaeche: parseDeutscheZahl(wohnflaeche),
      daemmstandard,
      alteHeizung,
      heizkostenBekannt,
      heizkostenAktuell: parseDeutscheZahl(heizkostenAktuell),
      strompreis: parseDeutscheZahl(strompreis),
      gaspreis: parseDeutscheZahl(gaspreis),
      anschaffungskosten: parseDeutscheZahl(anschaffung),
      foerderungProzent: parseDeutscheZahl(foerderung),
      jahre: parseInt(jahre, 10) || 20,
    }),
    [wohnflaeche, daemmstandard, alteHeizung, heizkostenBekannt, heizkostenAktuell, strompreis, gaspreis, anschaffung, foerderung, jahre],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtZahl = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

  const amortText = isFinite(ergebnis.amortisationJahre)
    ? `${fmtZahl(ergebnis.amortisationJahre)} Jahre`
    : 'Nie (keine Ersparnis)';

  // Liniendiagramm: kumulative Kosten
  const jahreZahl = parseInt(jahre, 10) || 20;
  const jahreArr = Array.from({ length: jahreZahl }, (_, i) => i + 1);
  const maxKosten = Math.max(ergebnis.gesamtkostenAlt, ergebnis.gesamtkostenWp, 1);
  const svgW = 100; const svgH = 60;
  const points = (werte: number[]) => werte.map((v, i) => `${(i / (werte.length - 1)) * svgW},${svgH - (v / maxKosten) * svgH}`).join(' ');
  const werteAlt = jahreArr.map(j => ergebnis.betriebskostenAlt * j);
  const werteWp = jahreArr.map(j => ergebnis.nettoInvestition + ergebnis.betriebskostenWp * j);

  return (
    <div>
      {/* === 1: Wohnfläche === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Wohnfläche
        </h2>
        <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="120" einheit="m²" />
      </div>

      {/* === 2: Dämmstandard === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Baujahr / Dämmstandard
        </h2>
        <select id="waermepumpe-select-1" aria-label="Baujahr / Dämmstandard"
          value={daemmstandard}
          onChange={e => setDaemmstandard(e.target.value as Daemmstandard)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(DAEMMSTANDARD_LABELS) as Daemmstandard[]).map(k => (
            <option key={k} value={k}>{DAEMMSTANDARD_LABELS[k]}</option>
          ))}
        </select>
      </div>

      {/* === 3: Alte Heizung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Aktuelle Heizung
        </h2>
        <select id="waermepumpe-select-2" aria-label="Aktuelle Heizung"
          value={alteHeizung}
          onChange={e => setAlteHeizung(e.target.value as AlteHeizung)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(HEIZUNG_LABELS) as AlteHeizung[]).map(k => (
            <option key={k} value={k}>{HEIZUNG_LABELS[k]}</option>
          ))}
        </select>
      </div>

      {/* === 4: Aktuelle Heizkosten === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Aktuelle jährliche Heizkosten
        </h2>
        <div className="mb-2">
          <RadioToggleGroup
            name="waermepumpe-heizkosten"
            legend="Aktuelle jährliche Heizkosten"
            srOnlyLegend
            options={[
              { value: 'bekannt', label: 'Bekannt' },
              { value: 'schaetzen', label: 'Schätzen' },
            ]}
            value={heizkostenBekannt ? 'bekannt' : 'schaetzen'}
            onChange={(v) => setHeizkostenBekannt(v === 'bekannt')}
          />
        </div>
        {heizkostenBekannt && (
          <NummerEingabe value={heizkostenAktuell} onChange={setHeizkostenAktuell} placeholder="2000" einheit="€/Jahr" />
        )}
        {!heizkostenBekannt && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Kosten werden aus Wohnfläche, Dämmstandard und Brennstoffpreis geschätzt.
          </p>
        )}
      </div>

      {/* === 5: Strompreis === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Strompreis
        </h2>
        <NummerEingabe value={strompreis} onChange={setStrompreis} placeholder={String(getStrompreis('waermepumpen_tarif'))} einheit="ct/kWh" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Wärmepumpen-Spezialtarife (HT, separater Zähler) liegen 2026 bei ca. 25–30 ct/kWh, Haushaltsstrom bei ca. 33–37 ct/kWh.
        </p>
      </div>

      {/* === 6: Gaspreis (nur Gas) === */}
      {alteHeizung === 'gas' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
            Gaspreis
          </h2>
          <NummerEingabe value={gaspreis} onChange={setGaspreis} placeholder="12" einheit="ct/kWh" />
        </div>
      )}

      {/* === 7: Anschaffungskosten === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">7</span>
          Anschaffungskosten Wärmepumpe
        </h2>
        <NummerEingabe value={anschaffung} onChange={setAnschaffung} placeholder="30000" einheit="€" />
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            ['15000', '15.000 € (Luft-Luft)'],
            ['25000', '25.000 € (Luft-Wasser)'],
            ['35000', '35.000 € (Erdwärme)'],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setAnschaffung(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${anschaffung === v ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* === 8: Förderung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">8</span>
          BEG-Förderung 2026
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Grundförderung {BEG_FOERDERUNG_2026.grundfoerderung} % erhält jeder Antragsteller. Boni sind kombinierbar — gedeckelt bei {BEG_FOERDERUNG_2026.maxGesamtfoerderung} %.
        </p>
        <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
          <legend className="px-2 text-xs text-gray-600 dark:text-gray-400">Boni nach KfW 458</legend>
          <label className="flex items-start gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={boniKlima}
              onChange={(e) => {
                const next = { klimageschwindigkeit: e.target.checked, einkommen: boniEinkommen, effizienz: boniEffizienz };
                setBoniKlima(e.target.checked);
                setFoerderung(String(berechneBegFoerderquote(next)));
              }}
              className="mt-1 min-w-[20px] min-h-[20px]"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Klimageschwindigkeitsbonus +{BEG_FOERDERUNG_2026.klimageschwindigkeitsbonus} %</strong> — Tausch alte fossile Heizung (Öl, Gas, Kohle).
            </span>
          </label>
          <label className="flex items-start gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={boniEinkommen}
              onChange={(e) => {
                const next = { klimageschwindigkeit: boniKlima, einkommen: e.target.checked, effizienz: boniEffizienz };
                setBoniEinkommen(e.target.checked);
                setFoerderung(String(berechneBegFoerderquote(next)));
              }}
              className="mt-1 min-w-[20px] min-h-[20px]"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Einkommensbonus +{BEG_FOERDERUNG_2026.einkommensbonus} %</strong> — Brutto-Haushaltseinkommen unter {BEG_FOERDERUNG_2026.einkommensgrenze.toLocaleString('de-DE')} €.
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={boniEffizienz}
              onChange={(e) => {
                const next = { klimageschwindigkeit: boniKlima, einkommen: boniEinkommen, effizienz: e.target.checked };
                setBoniEffizienz(e.target.checked);
                setFoerderung(String(berechneBegFoerderquote(next)));
              }}
              className="mt-1 min-w-[20px] min-h-[20px]"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              <strong>Effizienzbonus +{BEG_FOERDERUNG_2026.effizienzbonus} %</strong> — natürliches Kältemittel (z. B. Propan R290), Wasser/Erdreich/Abwasser als Wärmequelle.
            </span>
          </label>
        </fieldset>
        <NummerEingabe value={foerderung} onChange={setFoerderung} placeholder="30" einheit="%" />
        {parseInt(foerderung, 10) >= BEG_FOERDERUNG_2026.maxGesamtfoerderung && (
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            ⓘ Maximalförderung erreicht (Cap bei {BEG_FOERDERUNG_2026.maxGesamtfoerderung} % nach BEG-Richtlinie).
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {BEG_LAUTSTAERKE_HINWEIS_2026}
        </p>
      </div>

      {/* === 9: Betrachtungszeitraum === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">9</span>
          Betrachtungszeitraum
        </h2>
        <div className="flex gap-2">
          {['10', '15', '20', '25'].map(v => (
            <button
              key={v}
              onClick={() => setJahre(v)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] flex-1 ${jahre === v ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              {v} Jahre
            </button>
          ))}
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6" style={ergebnis.lohntSich ? { background: 'linear-gradient(135deg, #059669, #10b981)' } : undefined}>
        <p className="text-white/80 text-sm mb-1">Amortisation nach</p>
        <p className="text-5xl font-bold">{amortText}</p>
        <p className="text-white/80 text-sm mt-1">
          Gesamtersparnis über {jahre} Jahre: <strong>{fmtEuro(ergebnis.gesamtersparnis)} €</strong>
        </p>
      </div>

      {/* Kostenvergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Kostenvergleich</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Position</th>
                <th className="px-4 py-2 text-right font-semibold">Alte Heizung</th>
                <th className="px-4 py-2 text-right font-semibold">Wärmepumpe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Jährliche Betriebskosten</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.betriebskostenAlt)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.betriebskostenWp)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Jährliche Ersparnis</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400">+{fmtEuro(ergebnis.ersparnisJaehrlich)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Investition (nach Förderung)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">—</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">{fmtEuro(ergebnis.nettoInvestition)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Gesamtkosten ({jahre} Jahre)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.gesamtkostenAlt)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.gesamtkostenWp)} €</td>
              </tr>
              <tr className={`font-bold ${ergebnis.gesamtersparnis > 0 ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                <td className={`px-4 py-3 ${ergebnis.gesamtersparnis > 0 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>= Gesamtersparnis</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">—</td>
                <td className={`px-4 py-3 text-right tabular-nums text-lg ${ergebnis.gesamtersparnis > 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {ergebnis.gesamtersparnis >= 0 ? '+' : ''}{fmtEuro(ergebnis.gesamtersparnis)} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Liniendiagramm */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Kumulative Kosten über {jahre} Jahre</h2>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-48" preserveAspectRatio="none">
          <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" points={points(werteAlt)} vectorEffect="non-scaling-stroke" />
          <polyline fill="none" stroke="#10b981" strokeWidth="1.5" points={points(werteWp)} vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>Jahr 1</span>
          <span>Jahr {jahreZahl}</span>
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500"></span> Alte Heizung</div>
          <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500"></span> Wärmepumpe (inkl. Investition)</div>
        </div>
      </div>

      {/* Förderungs-Box */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💰 Ihre Förderung:</strong> {foerderung} % = {fmtEuro(ergebnis.foerderungEuro)} € Zuschuss. Eigenanteil: {fmtEuro(ergebnis.nettoInvestition)} €.
        </p>
      </div>

      {/* JAZ-Info */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-4 mb-6">
        <p className="text-indigo-800 dark:text-indigo-300 text-sm">
          <strong>⚡ Jahresarbeitszahl (JAZ):</strong> Ihre geschätzte JAZ liegt bei <strong>{fmtZahl(ergebnis.jaz)}</strong> — aus 1 kWh Strom werden {fmtZahl(ergebnis.jaz)} kWh Wärme. Heizwärmebedarf: {fmtEuro(ergebnis.heizwaermebedarfKwh)} kWh/Jahr, davon benötigt die Wärmepumpe {fmtEuro(ergebnis.stromverbrauchWp)} kWh Strom.
        </p>
      </div>

      {/* CO2-Box */}
      <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
        <p className="text-green-800 dark:text-green-300 text-sm">
          <strong>🌱 CO₂-Ersparnis:</strong> Jährlich ca. {fmtEuro(ergebnis.co2ErsparnisJahr)} kg CO₂ — das entspricht etwa {ergebnis.co2AutofahrtenMuenchenHamburg} Autofahrten München–Hamburg.
        </p>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Die tatsächliche Effizienz hängt von vielen Faktoren ab (Vorlauftemperatur, Heizkörper, Dämmung). Lassen Sie sich von einem Energieberater individuell beraten.
        </p>
      </div>

      <CrossLink href="/wohnen/heizkosten-rechner" emoji="🔥" text="Heizkosten-Rechner für die Betriebskostenabrechnung" />
      <CrossLink href="/wohnen/stromkosten-rechner" emoji="💡" text="Stromkosten berechnen und senken" />
      <CrossLink href="/wohnen/stromvergleich-rechner" emoji="⚡" text="Stromanbieter vergleichen und sparen" />

      <ErgebnisAktionen
        ergebnisText={`Wärmepumpe: Amortisation ${amortText} | Gesamtersparnis ${fmtEuro(ergebnis.gesamtersparnis)} € über ${jahre} Jahre | Investition (nach Förderung): ${fmtEuro(ergebnis.nettoInvestition)} € | Jährliche Ersparnis: ${fmtEuro(ergebnis.ersparnisJaehrlich)} € | JAZ ${fmtZahl(ergebnis.jaz)}`}
        seitenTitel="Wärmepumpen-Rechner"
      />

      <AffiliateBox programId="check24" context="waermepumpe" />

      <AiExplain
        rechnerName="Wärmepumpen-Rechner"
        eingaben={{
          wohnflaeche: `${wohnflaeche} m²`,
          daemmstandard: DAEMMSTANDARD_LABELS[daemmstandard],
          alteHeizung: HEIZUNG_LABELS[alteHeizung],
          heizkostenAktuell: heizkostenBekannt ? `${fmtEuro(parseDeutscheZahl(heizkostenAktuell))} €/Jahr` : 'geschätzt',
          anschaffung: `${fmtEuro(parseDeutscheZahl(anschaffung))} €`,
          foerderung: `${foerderung} %`,
          betrachtung: `${jahre} Jahre`,
        }}
        ergebnis={{
          amortisation: amortText,
          jaz: `${ergebnis.jaz}`,
          betriebskostenWp: `${fmtEuro(ergebnis.betriebskostenWp)} €/Jahr`,
          betriebskostenAlt: `${fmtEuro(ergebnis.betriebskostenAlt)} €/Jahr`,
          ersparnisJaehrlich: `${fmtEuro(ergebnis.ersparnisJaehrlich)} €/Jahr`,
          nettoInvestition: `${fmtEuro(ergebnis.nettoInvestition)} €`,
          gesamtersparnis: `${fmtEuro(ergebnis.gesamtersparnis)} €`,
          co2Ersparnis: `${fmtEuro(ergebnis.co2ErsparnisJahr)} kg/Jahr`,
        }}
      />
    </div>
  );
}
