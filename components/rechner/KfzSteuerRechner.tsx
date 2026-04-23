'use client';

import { useState, useMemo } from 'react';
import { berechneKfzSteuer, type Antriebsart, type Zulassungszeitraum } from '@/lib/berechnungen/kfz-steuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function KfzSteuerRechner() {
  const [zulassung, setZulassung] = useState<Zulassungszeitraum>('nach-2009');
  const [antrieb, setAntrieb] = useState<Antriebsart>('benzin');
  const [hubraum, setHubraum] = useState('1498');
  const [co2, setCo2] = useState('128');
  const [erstzulassung, setErstzulassung] = useState('2024-01-01');

  const nHubraum = parseDeutscheZahl(hubraum);
  const nCo2 = parseDeutscheZahl(co2);

  const erstzulassungsdatum = useMemo(() => {
    if (antrieb !== 'elektro' || !erstzulassung) return undefined;
    const d = new Date(erstzulassung);
    return isNaN(d.getTime()) ? undefined : d;
  }, [antrieb, erstzulassung]);

  const ergebnis = useMemo(
    () => berechneKfzSteuer({ zulassung, antrieb, hubraum: nHubraum, co2: nCo2, erstzulassungsdatum }),
    [zulassung, antrieb, nHubraum, nCo2, erstzulassungsdatum]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const antriebsarten: { key: Antriebsart; label: string; icon: string }[] = [
    { key: 'benzin', label: 'Benzin', icon: '⛽' },
    { key: 'diesel', label: 'Diesel', icon: '🛢️' },
    { key: 'elektro', label: 'Elektro', icon: '⚡' },
    { key: 'hybrid', label: 'Hybrid', icon: '🔋' },
  ];

  const istElektro = antrieb === 'elektro';

  return (
    <div>
      {/* Erstzulassung Toggle */}
      <div className="mb-5">
        <RadioToggleGroup
          name="kfzsteuer-zulassung"
          legend="Erstzulassung"
          options={[
            { value: 'nach-2009', label: 'Ab 01.07.2009' },
            { value: 'vor-2009', label: 'Vor 01.07.2009' },
          ]}
          value={zulassung}
          onChange={(v) => setZulassung(v as Zulassungszeitraum)}
        />
      </div>

      {/* Antriebsart */}
      <div className="mb-5">
        <RadioToggleGroup
          name="kfzsteuer-antrieb"
          legend="Antriebsart"
          options={antriebsarten.map(a => ({ value: a.key, label: `${a.icon} ${a.label}` }))}
          value={antrieb}
          onChange={(v) => setAntrieb(v as Antriebsart)}
        />
      </div>

      {/* Eingaben */}
      {!istElektro && (
        <div className={`grid grid-cols-1 ${zulassung === 'nach-2009' ? 'sm:grid-cols-2' : ''} gap-4 mb-6`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hubraum</label>
            <NummerEingabe
              value={hubraum}
              onChange={setHubraum}
              placeholder="z.B. 1498"
              einheit="ccm"
            />
          </div>
          {zulassung === 'nach-2009' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CO₂-Ausstoß (WLTP)</label>
              <NummerEingabe
                value={co2}
                onChange={setCo2}
                placeholder="z.B. 128"
                einheit="g/km"
              />
            </div>
          )}
        </div>
      )}

      {istElektro && (
        <div className="mb-6">
          <label htmlFor="kfzsteuer-erstzulassung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Erstzulassung
          </label>
          <input
            id="kfzsteuer-erstzulassung"
            type="date"
            min="2011-05-18"
            max="2030-12-31"
            value={erstzulassung}
            onChange={e => setErstzulassung(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Förderzeitraum § 3d KraftStG: 18.05.2011 – 31.12.2030. Befreiung gilt 10 Jahre ab Erstzulassung, längstens bis 31.12.2035.
          </p>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Elektro: Befreiung oder Hinweis „keine Befreiung" */}
          {ergebnis.befreit ? (
            <div className="result-box mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <p className="text-white/80 text-sm mb-1">Kfz-Steuer pro Jahr</p>
                  <p className="text-5xl font-bold">0,00 €</p>
                </div>
                <div className="sm:text-right">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    ⚡ Steuerbefreit bis {ergebnis.befreitBis}
                  </span>
                </div>
              </div>
            </div>
          ) : istElektro && ergebnis.keineBefreiungGrund ? (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">
                Keine Steuerbefreiung nach § 3d KraftStG
              </p>
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                {ergebnis.keineBefreiungGrund === 'vor-2011'
                  ? 'Das Erstzulassungsdatum liegt vor dem 18.05.2011 — § 3d Abs. 1 KraftStG greift nicht.'
                  : 'Das Erstzulassungsdatum liegt nach dem 31.12.2030 — die Förderung nach § 3d Abs. 1 KraftStG ist ausgelaufen. Elektrofahrzeuge werden dann gewichtsbasiert nach § 9 Abs. 1 Nr. 2e KraftStG besteuert. Dieser Rechner bildet die gewichtsbasierte Berechnung aktuell noch nicht ab.'}
              </p>
            </div>
          ) : (nHubraum > 0) && (
            <>
              <div className="result-box mb-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Kfz-Steuer pro Jahr</p>
                    <p className="text-5xl font-bold">{fmt(ergebnis.jahresSteuer)} €</p>
                  </div>
                  <div className="sm:text-right">
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      {fmt(ergebnis.monatsSteuer)} € / Monat
                    </span>
                  </div>
                </div>
              </div>

              {/* Aufschlüsselung */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
                <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung</h2>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="text-gray-600 dark:text-gray-400">
                      <td className="py-2">Sockelbetrag (Hubraum: {Math.ceil(nHubraum / 100) * 100} ccm)</td>
                      <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sockelbetrag)} €</td>
                    </tr>
                    {zulassung === 'nach-2009' && (
                      <tr className="text-gray-600 dark:text-gray-400">
                        <td className="py-2">CO₂-Komponente ({nCo2 > 95 ? `${nCo2} − 95 = ${Math.round(nCo2 - 95)} g/km` : 'unter Freibetrag'})</td>
                        <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.co2Betrag)} €</td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
                      <td className="py-2">Kfz-Steuer / Jahr</td>
                      <td className="py-2 text-right">{fmt(ergebnis.jahresSteuer)} €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Info-Box für Elektro */}
          {ergebnis.befreit && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Steuerbefreiung für Elektroautos (§ 3d KraftStG)</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Reine Elektrofahrzeuge sind bei Erstzulassung zwischen 18.05.2011 und <strong>31.12.2030</strong> für 10 Jahre steuerbefreit, längstens jedoch bis zum <strong>31.12.2035</strong>. Danach gilt eine gewichtsbasierte Besteuerung nach § 9 Abs. 1 Nr. 2e KraftStG.
              </p>
            </div>
          )}

          <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Alle Autokosten berechnen — Wertverlust, Versicherung, Sprit & mehr" />
          <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten für Ihre Fahrten berechnen" />

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Vereinfachte Berechnung zur Orientierung. Die tatsächliche Kfz-Steuer kann je nach Schadstoffklasse, Erstzulassungsdatum und weiteren Faktoren abweichen. Maßgeblich ist der Steuerbescheid des Hauptzollamts.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={
              ergebnis.befreit
                ? `Kfz-Steuer: 0,00 € (steuerbefreit bis ${ergebnis.befreitBis})`
                : ergebnis.keineBefreiungGrund
                  ? `Kfz-Steuer: keine § 3d-Befreiung (Erstzulassung außerhalb Förderzeitraum), gewichtsbasierte Steuer nach § 9 Abs. 1 Nr. 2e KraftStG`
                  : `Kfz-Steuer: ${fmt(ergebnis.jahresSteuer)} € pro Jahr (${fmt(ergebnis.monatsSteuer)} € / Monat)`
            }
            seitenTitel="Kfz-Steuer-Rechner"
          />
          <AiExplain
            rechnerName="Kfz-Steuer-Rechner"
            eingaben={{ zulassung, antrieb, hubraumCcm: nHubraum, co2GProKm: nCo2 }}
            ergebnis={{ jahresSteuerEuro: ergebnis.jahresSteuer, monatsSteuerEuro: ergebnis.monatsSteuer, sockelbetragEuro: ergebnis.sockelbetrag, co2BetragEuro: ergebnis.co2Betrag, befreit: ergebnis.befreit }}
          />

          <AffiliateBox programId="check24" context="kfz-steuer" />
          <AffiliateBox programId="wiso" context="kfz-steuer" variant="compact" />
        </>
      )}
    </div>
  );
}
