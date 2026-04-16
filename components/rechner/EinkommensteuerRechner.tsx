'use client';

import { useState, useMemo } from 'react';
import { berechneEinkommensteuer, type Steuerjahr } from '@/lib/berechnungen/einkommensteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import { BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEuro0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function EinkommensteuerRechner() {
  const [zvE, setZvE] = useState('50000');
  const [splitting, setSplitting] = useState(false);
  const [jahr, setJahr] = useState<Steuerjahr>(2026);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [bundesland, setBundesland] = useState('BW');

  const kirchensteuersatz = useMemo(() => {
    const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
    return (bl?.kirchensteuersatz ?? 9) as 8 | 9;
  }, [bundesland]);

  const ergebnis = useMemo(
    () => berechneEinkommensteuer({
      zvE: parseDeutscheZahl(zvE),
      splitting,
      jahr,
      kirchensteuer,
      kirchensteuersatz,
    }),
    [zvE, splitting, jahr, kirchensteuer, kirchensteuersatz],
  );

  // SVG-Kurve: Progressionsverlauf
  const maxEst = 60000;
  const maxEink = 200000;
  const kurvenPunkte = ergebnis.kurvenDaten
    .map(p => `${(p.einkommen / maxEink) * 100},${100 - Math.min(p.est / maxEst, 1) * 100}`)
    .join(' ');
  const aktuellerX = Math.min((parseDeutscheZahl(zvE) / maxEink) * 100, 100);
  const aktuellerY = 100 - Math.min(ergebnis.einkommensteuer / maxEst, 1) * 100;

  return (
    <div>
      {/* === 1: zvE === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Zu versteuerndes Einkommen (Jahr)
        </h2>
        <NummerEingabe value={zvE} onChange={setZvE} placeholder="50.000" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Bruttoeinkommen abzüglich Werbungskosten, Sonderausgaben, außergewöhnliche Belastungen und Freibeträge.
        </p>
      </div>

      {/* === 2: Veranlagung === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Veranlagung
        </h2>
        <RadioToggleGroup
          name="est-veranlagung"
          legend="Veranlagung"
          srOnlyLegend
          options={[
            { value: 'einzel', label: '👤 Einzelveranlagung' },
            { value: 'splitting', label: '💑 Zusammenveranlagung (Splitting)' },
          ]}
          value={splitting ? 'splitting' : 'einzel'}
          onChange={(v) => setSplitting(v === 'splitting')}
        />
      </div>

      {/* === 3: Steuerjahr === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Steuerjahr
        </h2>
        <label htmlFor="est-jahr" className="sr-only">Steuerjahr</label>
        <select
          id="est-jahr"
          value={jahr}
          onChange={e => setJahr(Number(e.target.value) as Steuerjahr)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value={2026}>2026 (Grundfreibetrag 12.096 €)</option>
          <option value={2025}>2025 (Grundfreibetrag 12.096 €)</option>
          <option value={2024}>2024 (Grundfreibetrag 11.604 €)</option>
        </select>
      </div>

      {/* === 4: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Kirchensteuer?
        </h2>
        <RadioToggleGroup
          name="est-kist"
          legend="Kirchensteuer?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: '⛪ Ja' },
          ]}
          value={kirchensteuer ? 'ja' : 'nein'}
          onChange={(v) => setKirchensteuer(v === 'ja')}
        />
        {kirchensteuer && (
          <div className="mt-3">
            <label htmlFor="est-bundesland" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Bundesland</label>
            <select
              id="est-bundesland"
              value={bundesland}
              onChange={e => setBundesland(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {BUNDESLAENDER.map(bl => (
                <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name} ({bl.kirchensteuersatz} %)</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Einkommensteuer</p>
            <p className="text-4xl font-bold">{fmtEuro(ergebnis.einkommensteuer)} €</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Gesamtbelastung</p>
            <p className="text-4xl font-bold text-amber-300">{fmtEuro(ergebnis.gesamtbelastung)} €</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Netto-Einkommen</p>
            <p className="text-4xl font-bold text-green-300">{fmtEuro(ergebnis.nettoEinkommen)} €</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            Grenzsteuersatz: {fmtProzent(ergebnis.grenzsteuersatz)} %
          </span>
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            Durchschnittssteuersatz: {fmtProzent(ergebnis.durchschnittssteuersatz)} %
          </span>
        </div>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Zu versteuerndes Einkommen</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.zvE)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Grundfreibetrag {ergebnis.splitting ? '(Splitting)' : ''}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro0(ergebnis.splitting ? ergebnis.grundfreibetrag * 2 : ergebnis.grundfreibetrag)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Veranlagungsart</td>
                <td className="px-4 py-2.5 text-right text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.splitting ? 'Zusammenveranlagung' : 'Einzelveranlagung'}</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-500/10 font-bold">
                <td className="px-4 py-3 text-red-800 dark:text-red-300 whitespace-nowrap">= Einkommensteuer (§ 32a EStG)</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-red-700 dark:text-red-300 whitespace-nowrap">{fmtEuro(ergebnis.einkommensteuer)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  + Solidaritätszuschlag
                  <span className="text-xs text-gray-500 ml-1">(Freigrenze {fmtEuro0(ergebnis.soliFreigrenze)} €)</span>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.solidaritaetszuschlag)} €</td>
              </tr>
              {kirchensteuer && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    + Kirchensteuer ({kirchensteuersatz} %)
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.kirchensteuer)} €</td>
                </tr>
              )}
              <tr className="bg-amber-50 dark:bg-amber-500/10 font-bold">
                <td className="px-4 py-3 text-amber-800 dark:text-amber-300 whitespace-nowrap">= Gesamtbelastung</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-amber-700 dark:text-amber-300 whitespace-nowrap">{fmtEuro(ergebnis.gesamtbelastung)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Grenzsteuersatz (nächster Euro)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtProzent(ergebnis.grenzsteuersatz)} %</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Durchschnittssteuersatz</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtProzent(ergebnis.durchschnittssteuersatz)} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Progressionskurve */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Steuerprogression</h2>
        <div className="relative w-full" style={{ paddingBottom: '50%' }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-label="Einkommensteuer-Progressionskurve"
          >
            {/* Grid */}
            {[20, 40, 60, 80].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.2" />
            ))}
            {/* Kurve */}
            <polyline
              points={kurvenPunkte}
              fill="none"
              stroke="#2563eb"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Aktueller Punkt */}
            <circle cx={aktuellerX} cy={aktuellerY} r="1.2" fill="#dc2626" vectorEffect="non-scaling-stroke" />
            <line x1={aktuellerX} y1={aktuellerY} x2={aktuellerX} y2="100" stroke="#dc2626" strokeWidth="0.3" strokeDasharray="1,1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>0 €</span>
          <span>50k</span>
          <span>100k</span>
          <span>150k</span>
          <span>200k €</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Roter Punkt: Ihr aktuelles Einkommen ({fmtEuro0(parseDeutscheZahl(zvE))} €) mit ESt {fmtEuro0(ergebnis.einkommensteuer)} €
        </p>
      </div>

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleichswerte {ergebnis.splitting ? '(Splitting)' : '(Einzelveranlagung)'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">zvE</th>
                <th className="px-4 py-2 text-right font-semibold">Einkommensteuer</th>
                <th className="px-4 py-2 text-right font-semibold">Soli</th>
                {kirchensteuer && <th className="px-4 py-2 text-right font-semibold">KiSt</th>}
                <th className="px-4 py-2 text-right font-semibold">Gesamt</th>
                <th className="px-4 py-2 text-right font-semibold">Ø Satz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.vergleichstabelle.map(row => (
                <tr key={row.einkommen}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmtEuro0(row.einkommen)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.est)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.soli)} €</td>
                  {kirchensteuer && (
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(row.kist)} €</td>
                  )}
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtEuro0(row.gesamt)} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtProzent(row.durchschnitt)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung verwendet die Formel nach § 32a EStG für das zu versteuernde Einkommen. Tatsächliche Steuerlast kann durch weitere Faktoren (Verlustabzug, Progressionsvorbehalt, Kinderfreibeträge, außergewöhnliche Belastungen) abweichen. Für die offizielle Steuererklärung nutzen Sie Elster oder eine Steuersoftware.
        </p>
      </div>

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Gehalt berechnen" />
      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingvorteil berechnen" />
      <CrossLink href="/finanzen/steuerprogression-rechner" emoji="📊" text="Steuerprogression visualisieren" />

      <ErgebnisAktionen
        ergebnisText={`Einkommensteuer (${ergebnis.jahr}): ${fmtEuro(ergebnis.einkommensteuer)} € | zvE: ${fmtEuro0(ergebnis.zvE)} € | Soli: ${fmtEuro(ergebnis.solidaritaetszuschlag)} € | KiSt: ${fmtEuro(ergebnis.kirchensteuer)} € | Gesamt: ${fmtEuro(ergebnis.gesamtbelastung)} € | Grenzsteuersatz: ${fmtProzent(ergebnis.grenzsteuersatz)} % | Durchschnittssteuersatz: ${fmtProzent(ergebnis.durchschnittssteuersatz)} %`}
        seitenTitel="Einkommensteuer-Rechner"
      />

      <AffiliateBox programId="wiso" context="einkommensteuer" />
      <AffiliateBox programId="smartsteuer" context="einkommensteuer" />

      <AiExplain
        rechnerName="Einkommensteuer-Rechner"
        eingaben={{
          zvE: `${fmtEuro0(parseDeutscheZahl(zvE))} €`,
          veranlagung: splitting ? 'Zusammenveranlagung (Splitting)' : 'Einzelveranlagung',
          jahr: String(jahr),
          kirchensteuer: kirchensteuer ? `Ja (${kirchensteuersatz} %)` : 'Nein',
        }}
        ergebnis={{
          einkommensteuer: `${fmtEuro(ergebnis.einkommensteuer)} €`,
          soli: `${fmtEuro(ergebnis.solidaritaetszuschlag)} €`,
          kirchensteuer: `${fmtEuro(ergebnis.kirchensteuer)} €`,
          gesamt: `${fmtEuro(ergebnis.gesamtbelastung)} €`,
          grenzsteuersatz: `${fmtProzent(ergebnis.grenzsteuersatz)} %`,
          durchschnitt: `${fmtProzent(ergebnis.durchschnittssteuersatz)} %`,
        }}
      />
    </div>
  );
}
