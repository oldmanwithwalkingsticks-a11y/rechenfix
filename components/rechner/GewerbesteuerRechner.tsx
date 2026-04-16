'use client';

import { useState, useMemo } from 'react';
import { berechneGewerbesteuer, type Rechtsform } from '@/lib/berechnungen/gewerbesteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEuro0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function GewerbesteuerRechner() {
  const [gewinn, setGewinn] = useState('80000');
  const [rechtsform, setRechtsform] = useState<Rechtsform>('personengesellschaft');
  const [hebesatz, setHebesatz] = useState('400');
  const [hinzurechnungen, setHinzurechnungen] = useState('0');
  const [kuerzungen, setKuerzungen] = useState('0');

  const ergebnis = useMemo(
    () => berechneGewerbesteuer({
      gewinn: parseDeutscheZahl(gewinn),
      rechtsform,
      hebesatz: parseDeutscheZahl(hebesatz),
      hinzurechnungen: parseDeutscheZahl(hinzurechnungen),
      kuerzungen: parseDeutscheZahl(kuerzungen),
    }),
    [gewinn, rechtsform, hebesatz, hinzurechnungen, kuerzungen],
  );

  // Balkendiagramm-Daten
  const maxBalken = Math.max(ergebnis.gewerbesteuer, 1);
  const gwStBreite = 100;
  const anrechnungBreite = ergebnis.gewerbesteuer > 0
    ? Math.round(ergebnis.estAnrechnung / ergebnis.gewerbesteuer * 100)
    : 0;
  const effektivBreite = ergebnis.gewerbesteuer > 0
    ? Math.round(ergebnis.effektiveBelastung / ergebnis.gewerbesteuer * 100)
    : 0;

  return (
    <div>
      {/* === 1: Gewinn === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Gewinn aus Gewerbebetrieb
        </h2>
        <NummerEingabe value={gewinn} onChange={setGewinn} placeholder="80.000" einheit="€" />
      </div>

      {/* === 2: Rechtsform === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Rechtsform
        </h2>
        <RadioToggleGroup
          name="gewerbesteuer-rechtsform"
          legend="Rechtsform"
          srOnlyLegend
          options={[
            { value: 'personengesellschaft', label: 'Einzelunternehmen / Personenges.' },
            { value: 'kapitalgesellschaft', label: 'GmbH / Kapitalges.' },
          ]}
          value={rechtsform}
          onChange={(v) => setRechtsform(v as Rechtsform)}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {rechtsform === 'personengesellschaft'
            ? 'Freibetrag: 24.500 € + ESt-Anrechnung nach § 35 EStG'
            : 'Kein Freibetrag, keine ESt-Anrechnung'}
        </p>
      </div>

      {/* === 3: Hebesatz === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Hebesatz der Gemeinde
        </h2>
        <NummerEingabe value={hebesatz} onChange={setHebesatz} placeholder="400" einheit="%" />
        <input
          type="range"
          min="200"
          max="900"
          step="1"
          value={parseDeutscheZahl(hebesatz) || 400}
          onChange={e => setHebesatz(e.target.value)}
          className="w-full mt-2 accent-primary-600"
          aria-label="Hebesatz Slider"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>200 %</span>
          <span>Ø 400 %</span>
          <span>900 %</span>
        </div>
      </div>

      {/* === 4: Hinzurechnungen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Hinzurechnungen (§ 8 GewStG, optional)
        </h2>
        <NummerEingabe value={hinzurechnungen} onChange={setHinzurechnungen} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Z. B. 25 % der Zinsen über 200.000 € Freibetrag, Mieten, Pachten, Lizenzen.
        </p>
      </div>

      {/* === 5: Kürzungen === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Kürzungen (§ 9 GewStG, optional)
        </h2>
        <NummerEingabe value={kuerzungen} onChange={setKuerzungen} placeholder="0" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Z. B. 1,2 % des Einheitswerts des Grundbesitzes.
        </p>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Gewerbesteuer</p>
            <p className="text-4xl font-bold">{fmtEuro(ergebnis.gewerbesteuer)} €</p>
          </div>
          {ergebnis.hatAnrechnung && (
            <div>
              <p className="text-white/80 text-xs uppercase tracking-wide mb-1">ESt-Anrechnung</p>
              <p className="text-4xl font-bold text-green-300">−{fmtEuro(ergebnis.estAnrechnung)} €</p>
            </div>
          )}
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">
              {ergebnis.hatAnrechnung ? 'Effektive Belastung' : 'Belastung'}
            </p>
            <p className="text-4xl font-bold text-amber-300">{fmtEuro(ergebnis.effektiveBelastung)} €</p>
          </div>
        </div>
      </div>

      {/* Balkendiagramm */}
      {ergebnis.gewerbesteuer > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Belastungsvergleich</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Gewerbesteuer</span>
                <span>{fmtEuro(ergebnis.gewerbesteuer)} €</span>
              </div>
              <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${gwStBreite}%` }} />
              </div>
            </div>
            {ergebnis.hatAnrechnung && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>ESt-Anrechnung (§ 35 EStG)</span>
                  <span>−{fmtEuro(ergebnis.estAnrechnung)} €</span>
                </div>
                <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${anrechnungBreite}%` }} />
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Effektive Belastung</span>
                <span>{fmtEuro(ergebnis.effektiveBelastung)} € ({fmtProzent(ergebnis.effektiverSatz)} % vom Gewinn)</span>
              </div>
              <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${effektivBreite}%` }} />
              </div>
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
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">Gewinn aus Gewerbebetrieb</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(ergebnis.gewinn)} €</td>
              </tr>
              {ergebnis.hinzurechnungen > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">+ Hinzurechnungen (§ 8 GewStG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">+{fmtEuro0(ergebnis.hinzurechnungen)} €</td>
                </tr>
              )}
              {ergebnis.kuerzungen > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">− Kürzungen (§ 9 GewStG)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro0(ergebnis.kuerzungen)} €</td>
                </tr>
              )}
              {ergebnis.freibetrag > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">− Freibetrag (Personengesellschaft)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro0(ergebnis.freibetrag)} €</td>
                </tr>
              )}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300 whitespace-nowrap">= Gewerbeertrag (abgerundet)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro0(ergebnis.gewerbeertragAbgerundet)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">× Steuermesszahl</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{ergebnis.steuermesszahl} %</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">= Steuermessbetrag</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.steuermessbetrag)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">× Hebesatz</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro0(ergebnis.hebesatz)} %</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-500/10 font-bold">
                <td className="px-4 py-3 text-red-800 dark:text-red-300 whitespace-nowrap">= Gewerbesteuer</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-red-700 dark:text-red-300 whitespace-nowrap">{fmtEuro(ergebnis.gewerbesteuer)} €</td>
              </tr>
              {ergebnis.hatAnrechnung && (
                <>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 whitespace-nowrap">− ESt-Anrechnung (§ 35 EStG)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">−{fmtEuro(ergebnis.estAnrechnung)} €</td>
                  </tr>
                  <tr className="bg-amber-50 dark:bg-amber-500/10 font-bold">
                    <td className="px-4 py-3 text-amber-800 dark:text-amber-300 whitespace-nowrap">= Effektive Belastung</td>
                    <td className="px-4 py-3 text-right tabular-nums text-lg text-amber-700 dark:text-amber-300 whitespace-nowrap">{fmtEuro(ergebnis.effektiveBelastung)} €</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis bei niedrigem Hebesatz */}
      {ergebnis.hatAnrechnung && parseDeutscheZahl(hebesatz) <= 400 && (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-green-800 dark:text-green-300 text-sm">
            <strong>💡 Tipp:</strong> Bei Hebesätzen bis 400 % wird die Gewerbesteuer für Einzelunternehmer und Personengesellschaften durch die ESt-Anrechnung nach § 35 EStG praktisch vollständig neutralisiert.
          </p>
        </div>
      )}

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Diese Berechnung ist vereinfacht. Die ESt-Anrechnung nach § 35 EStG kann durch die tatsächliche Einkommensteuer begrenzt sein. Hinzurechnungen und Kürzungen sind komplex — im Zweifel beraten Sie sich mit Ihrem Steuerberater.
        </p>
      </div>

      <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="🏢" text="GmbH-Geschäftsführer-Gehalt berechnen" />
      <CrossLink href="/finanzen/steuerprogression-rechner" emoji="📊" text="Steuerprogression berechnen" />
      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Gehalt berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Gewerbesteuer: ${fmtEuro(ergebnis.gewerbesteuer)} € | Gewinn: ${fmtEuro0(ergebnis.gewinn)} € | Hebesatz: ${fmtEuro0(ergebnis.hebesatz)} % | Steuermessbetrag: ${fmtEuro(ergebnis.steuermessbetrag)} €${ergebnis.hatAnrechnung ? ` | ESt-Anrechnung: ${fmtEuro(ergebnis.estAnrechnung)} € | Effektive Belastung: ${fmtEuro(ergebnis.effektiveBelastung)} €` : ''}`}
        seitenTitel="Gewerbesteuer-Rechner"
      />

      <AffiliateBox programId="lexware" context="gewerbesteuer" />
      <AffiliateBox programId="wiso" context="gewerbesteuer" />

      <AiExplain
        rechnerName="Gewerbesteuer-Rechner"
        eingaben={{
          gewinn: `${fmtEuro0(parseDeutscheZahl(gewinn))} €`,
          rechtsform: rechtsform === 'personengesellschaft' ? 'Einzelunternehmen / Personengesellschaft' : 'GmbH / Kapitalgesellschaft',
          hebesatz: `${hebesatz} %`,
          hinzurechnungen: `${fmtEuro0(parseDeutscheZahl(hinzurechnungen))} €`,
          kuerzungen: `${fmtEuro0(parseDeutscheZahl(kuerzungen))} €`,
        }}
        ergebnis={{
          gewerbeertrag: `${fmtEuro0(ergebnis.gewerbeertragAbgerundet)} €`,
          steuermessbetrag: `${fmtEuro(ergebnis.steuermessbetrag)} €`,
          gewerbesteuer: `${fmtEuro(ergebnis.gewerbesteuer)} €`,
          ...(ergebnis.hatAnrechnung ? {
            estAnrechnung: `${fmtEuro(ergebnis.estAnrechnung)} €`,
            effektiveBelastung: `${fmtEuro(ergebnis.effektiveBelastung)} €`,
          } : {}),
        }}
      />
    </div>
  );
}
