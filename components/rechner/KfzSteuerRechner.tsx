'use client';

import { useState, useMemo } from 'react';
import { berechneKfzSteuer, type Antriebsart, type Zulassungszeitraum } from '@/lib/berechnungen/kfz-steuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function KfzSteuerRechner() {
  // W187: drei Zeiträume statt zwei (vorher 'nach-2009' = Staffel ab 2021 auch für 2009–2020)
  const [zulassung, setZulassung] = useState<Zulassungszeitraum>('ab-2021');
  const [erstzulassungsjahr, setErstzulassungsjahr] = useState(2015);
  const [antrieb, setAntrieb] = useState<Antriebsart>('benzin');
  const [hubraum, setHubraum] = useState('1498');
  const [co2, setCo2] = useState('128');
  const [erstzulassung, setErstzulassung] = useState('2024-01-01');

  // Clamping auf realistische Obergrenze (10.000 ccm deckt auch US-Muscle-
  // Imports ab). CO₂ wird bis 500 g/km akzeptiert — extreme Werte wirken
  // sonst absurd im Ergebnis, werden aber von der Staffel-Logik sonst stur
  // durchgerechnet.
  const nHubraum = Math.min(parseDeutscheZahl(hubraum), 10000);
  const nCo2 = Math.min(parseDeutscheZahl(co2), 500);

  const erstzulassungsdatum = useMemo(() => {
    if (antrieb !== 'elektro' || !erstzulassung) return undefined;
    const d = new Date(erstzulassung);
    return isNaN(d.getTime()) ? undefined : d;
  }, [antrieb, erstzulassung]);

  const ergebnis = useMemo(
    () => berechneKfzSteuer({ zulassung, antrieb, hubraum: nHubraum, co2: nCo2, erstzulassungsdatum, erstzulassungsjahr }),
    [zulassung, antrieb, nHubraum, nCo2, erstzulassungsdatum, erstzulassungsjahr]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // W184: CO₂-Eingabe vorher roh („118.5 g/km“), jetzt de-DE
  const fmtCo2 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

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
            { value: 'ab-2021', label: 'Ab 01.01.2021' },
            { value: '2009-2020', label: '01.07.2009–31.12.2020' },
            { value: 'vor-2009', label: 'Vor 01.07.2009' },
          ]}
          value={zulassung}
          onChange={(v) => setZulassung(v as Zulassungszeitraum)}
        />
        {zulassung === '2009-2020' && !istElektro && (
          <div className="mt-3">
            <label htmlFor="kfzsteuer-ez-jahr" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahr der Erstzulassung</label>
            <select
              id="kfzsteuer-ez-jahr"
              value={erstzulassungsjahr}
              onChange={e => setErstzulassungsjahr(Number(e.target.value))}
              className="input-field w-full sm:w-1/2"
            >
              {Array.from({ length: 12 }, (_, i) => 2009 + i).map(j => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              § 9 Abs. 1 Nr. 2 Buchst. b KraftStG: 2 € je g/km CO₂ über 120 g (Erstzulassung bis 2011), 110 g (2012–2013) bzw. 95 g (ab 2014).
            </p>
          </div>
        )}
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
        <div className={`grid grid-cols-1 ${zulassung !== 'vor-2009' ? 'sm:grid-cols-2' : ''} gap-4 mb-6`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hubraum</label>
            <NummerEingabe
              value={hubraum}
              onChange={setHubraum}
              placeholder="z.B. 1498"
              einheit="ccm"
            />
          </div>
          {zulassung !== 'vor-2009' && (
            <div>
              {/* W187: vorher „CO₂-Ausstoß (WLTP)“ — bei Erstzulassung bis 2018 steht im Schein oft der NEFZ-Wert */}
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CO₂-Ausstoß (Fahrzeugschein, Feld V.7)</label>
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
                  // W187: vorher „§ 9 Abs. 1 Nr. 2e KraftStG“ (gibt es nicht)
                  : 'Das Erstzulassungsdatum liegt nach dem 31.12.2030 — die Förderung nach § 3d Abs. 1 KraftStG ist ausgelaufen. Elektrofahrzeuge werden dann nach dem zulässigen Gesamtgewicht besteuert (§ 9 Abs. 1 Nr. 3 i. V. m. Abs. 2 KraftStG, um 50 % ermäßigt). Dieser Rechner bildet die gewichtsbasierte Berechnung aktuell noch nicht ab.'}
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
                    {zulassung !== 'vor-2009' && (
                      <tr className="text-gray-600 dark:text-gray-400">
                        {/* W187: Schwelle je Zeitraum (95 g/km ab 2021; 120/110/95 g/km bei 2009–2020, dann × 2 €) */}
                        <td className="py-2">CO₂-Komponente ({nCo2 > (ergebnis.co2Schwelle ?? 95) ? `${fmtCo2(nCo2)} − ${ergebnis.co2Schwelle ?? 95} = ${fmtCo2(nCo2 - (ergebnis.co2Schwelle ?? 95))} g/km${zulassung === '2009-2020' ? ' × 2,00 €' : ''}` : 'unter Freibetrag'})</td>
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

              {/* Vor-2009-Disclaimer: Annahme Euro 4+ */}
              {zulassung === 'vor-2009' && (
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
                  <p className="text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                    <strong>Vereinfachung:</strong> Der Rechner nimmt Schadstoffklasse Euro 4 oder besser an (6,75 € Benzin / 15,44 € Diesel je angefangene 100 ccm). Für schlechtere Emissionsklassen (Euro 0 bis Euro 3, insbesondere Dieselfahrzeuge ohne Partikelfilter) gelten nach § 9 Abs. 1 Nr. 2 Buchst. a KraftStG deutlich höhere Sätze. Verbindlicher Bescheid beim Hauptzollamt.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Info-Box für Elektro */}
          {ergebnis.befreit && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Steuerbefreiung für Elektroautos (§ 3d KraftStG)</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                {/* W187: vorher „§ 9 Abs. 1 Nr. 2e KraftStG“ */}
                Reine Elektrofahrzeuge sind bei Erstzulassung zwischen 18.05.2011 und <strong>31.12.2030</strong> für 10 Jahre steuerbefreit, längstens jedoch bis zum <strong>31.12.2035</strong>. Danach gilt eine gewichtsbasierte Besteuerung nach § 9 Abs. 1 Nr. 3 i. V. m. Abs. 2 KraftStG (um 50 % ermäßigt).
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
                  ? `Kfz-Steuer: keine § 3d-Befreiung (Erstzulassung außerhalb Förderzeitraum), gewichtsbasierte Steuer nach § 9 Abs. 1 Nr. 3 i. V. m. Abs. 2 KraftStG`
                  : `Kfz-Steuer: ${fmt(ergebnis.jahresSteuer)} € pro Jahr (${fmt(ergebnis.monatsSteuer)} € / Monat)`
            }
            seitenTitel="Kfz-Steuer-Rechner"
            pdfDaten={!ergebnis.befreit ? [
              {
                titel: 'Kfz-Steuer',
                zeilen: [
                  { label: 'Hubraum-Sockelbetrag', wert: `${fmt(ergebnis.sockelbetrag)} €` },
                  { label: 'CO₂-Komponente', wert: `${fmt(ergebnis.co2Betrag)} €` },
                  { label: 'Kfz-Steuer pro Jahr', wert: `${fmt(ergebnis.jahresSteuer)} €`, highlight: true },
                  { label: 'Kfz-Steuer pro Monat', wert: `${fmt(ergebnis.monatsSteuer)} €` },
                  { label: 'CO₂-Ausstoß (Eingabe)', wert: `${fmtCo2(nCo2)} g/km` },
                ],
              },
            ] : undefined}
          />
          <AiExplain
            rechnerName="Kfz-Steuer-Rechner"
            eingaben={{ zulassung, ...(zulassung === '2009-2020' ? { erstzulassungsjahr } : {}), antrieb, hubraumCcm: nHubraum, co2GProKm: nCo2 }}
            ergebnis={{ jahresSteuerEuro: ergebnis.jahresSteuer, monatsSteuerEuro: ergebnis.monatsSteuer, sockelbetragEuro: ergebnis.sockelbetrag, co2BetragEuro: ergebnis.co2Betrag, befreit: ergebnis.befreit }}
          />
        </>
      )}
    </div>
  );
}
