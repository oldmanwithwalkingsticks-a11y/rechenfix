'use client';

import { useState, useMemo } from 'react';
import { berechneIdealgewicht, type Geschlecht, type Koerperbau } from '@/lib/berechnungen/idealgewicht';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const KOERPERBAU_OPTIONEN: { key: Koerperbau; label: string }[] = [
  { key: 'schmal', label: 'Schmal' },
  { key: 'normal', label: 'Normal' },
  { key: 'kraeftig', label: 'Kräftig' },
];

export default function IdealgewichtRechner() {
  const [geschlecht, setGeschlecht] = useState<Geschlecht>('frau');
  const [alter, setAlter] = useState('30');
  const [groesse, setGroesse] = useState('170');
  const [gewicht, setGewicht] = useState('70');
  const [koerperbau, setKoerperbau] = useState<Koerperbau>('normal');

  const nAlter = parseInt(alter) || 0;
  const nGroesse = parseDeutscheZahl(groesse);
  const nGewicht = parseDeutscheZahl(gewicht);

  const ergebnis = useMemo(
    () => berechneIdealgewicht({ geschlecht, alter: nAlter, groesse: nGroesse, gewicht: nGewicht, koerperbau }),
    [geschlecht, nAlter, nGroesse, nGewicht, koerperbau],
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Barometer-Daten
  const barometer = useMemo(() => {
    if (!ergebnis) return null;
    const { bmiSpanne, aktuellesGewicht } = ergebnis;
    // Skala: von 80% der Untergrenze bis 130% der Obergrenze
    const min = Math.round(bmiSpanne.gewichtUnten * 0.75);
    const max = Math.round(bmiSpanne.gewichtOben * 1.35);
    const range = max - min;
    if (range <= 0) return null;

    const idealStart = ((bmiSpanne.gewichtUnten - min) / range) * 100;
    const idealEnd = ((bmiSpanne.gewichtOben - min) / range) * 100;
    const markerPos = Math.min(Math.max(((aktuellesGewicht - min) / range) * 100, 2), 98);

    return { min, max, idealStart, idealEnd, markerPos };
  }, [ergebnis]);

  const koerperbauLabel = KOERPERBAU_OPTIONEN.find(k => k.key === koerperbau)?.label || 'Normal';

  return (
    <div>
      {/* Geschlecht Toggle */}
      <div className="mb-6">
        <RadioToggleGroup
          name="idealgewicht-geschlecht"
          legend="Geschlecht"
          options={[{ value: 'frau', label: 'Frau' }, { value: 'mann', label: 'Mann' }]}
          value={geschlecht}
          onChange={(v) => setGeschlecht(v as Geschlecht)}
        />
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter</label>
          <NummerEingabe value={alter} onChange={setAlter} placeholder="z.B. 30" einheit="Jahre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Größe</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="z.B. 170" einheit="cm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktuelles Gewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="z.B. 70" einheit="kg" />
        </div>
      </div>

      {/* Körperbau Toggle */}
      <div className="mb-6">
        <RadioToggleGroup
          name="idealgewicht-koerperbau"
          legend="Körperbau"
          options={KOERPERBAU_OPTIONEN.map(k => ({ value: k.key, label: k.label }))}
          value={koerperbau}
          onChange={(v) => setKoerperbau(v as Koerperbau)}
          fullWidth
        />
      </div>

      {/* Ergebnis */}
      {ergebnis && nAlter > 0 && nGroesse > 0 && nGewicht > 0 && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">BMI-basierte Idealgewicht-Spanne</p>
                <p className="text-5xl font-bold">
                  {fmt(ergebnis.bmiSpanne.gewichtUnten)} – {fmt(ergebnis.bmiSpanne.gewichtOben)}{' '}
                  <span className="text-2xl">kg</span>
                </p>
              </div>
            </div>
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  ergebnis.statusFarbe === 'green'
                    ? 'bg-green-500/20 text-green-100'
                    : 'bg-orange-500/20 text-orange-100'
                }`}
              >
                {ergebnis.statusFarbe === 'green' ? '✅' : '⚠️'} {ergebnis.statusText}
              </span>
            </div>
          </div>

          {/* Vergleichstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Vergleich der drei Formeln</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 text-gray-600 dark:text-gray-400 font-medium">Formel</th>
                    <th className="text-right py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">Idealgewicht</th>
                    <th className="text-right py-2 pl-4 text-gray-600 dark:text-gray-400 font-medium">Ihre Abweichung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-4 text-gray-800 dark:text-gray-200 font-medium">Broca-Formel</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.broca)} kg</td>
                    <td className="py-3 pl-4 text-right">
                      <AbweichungBadge aktuell={nGewicht} ideal={ergebnis.broca} />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-4 text-gray-800 dark:text-gray-200 font-medium">Creff-Formel</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.creff)} kg</td>
                    <td className="py-3 pl-4 text-right">
                      <AbweichungBadge aktuell={nGewicht} ideal={ergebnis.creff} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-800 dark:text-gray-200 font-medium">BMI-basiert</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800 dark:text-gray-200">
                      {fmt(ergebnis.bmiSpanne.gewichtUnten)} – {fmt(ergebnis.bmiSpanne.gewichtOben)} kg
                    </td>
                    <td className="py-3 pl-4 text-right">
                      {ergebnis.imIdealbereich ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300">
                          im Bereich
                        </span>
                      ) : ergebnis.differenzOben > 0 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300">
                          +{fmt(ergebnis.differenzOben)} kg
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300">
                          −{fmt(ergebnis.differenzUnten)} kg
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visuelle Skala / Barometer */}
          {barometer && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Gewichtsskala</h2>
              <div className="relative h-10 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                {/* Untergewicht-Zone (links) */}
                <div
                  className="absolute inset-y-0 left-0 bg-blue-200 dark:bg-blue-500/30 rounded-l-full"
                  style={{ width: `${barometer.idealStart}%` }}
                />
                {/* Idealbereich */}
                <div
                  className="absolute inset-y-0 bg-green-300 dark:bg-green-500/40"
                  style={{ left: `${barometer.idealStart}%`, width: `${barometer.idealEnd - barometer.idealStart}%` }}
                />
                {/* Übergewicht-Zone (rechts) */}
                <div
                  className="absolute inset-y-0 right-0 bg-orange-200 dark:bg-orange-500/30 rounded-r-full"
                  style={{ width: `${100 - barometer.idealEnd}%` }}
                />
                {/* Marker für aktuelles Gewicht */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gray-800 dark:bg-white z-10"
                  style={{ left: `${barometer.markerPos}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-xs font-bold px-2 py-0.5 rounded-md">
                    {fmt(nGewicht)} kg
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Untergewicht</span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Idealbereich ({fmt(ergebnis.bmiSpanne.gewichtUnten)}–{fmt(ergebnis.bmiSpanne.gewichtOben)} kg)
                </span>
                <span>Übergewicht</span>
              </div>
            </div>
          )}

          {/* Hinweis-Box */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Das Idealgewicht ist ein Richtwert. Faktoren wie Muskelmasse, Körperfettverteilung und individuelle Gesundheit werden nicht berücksichtigt. Der BMI-basierte Bereich gilt als medizinisch am aussagekräftigsten.
            </p>
          </div>

          <CrossLink href="/gesundheit/bmi-rechner" emoji="📊" text="BMI berechnen" />
          <CrossLink href="/gesundheit/koerperfett-rechner" emoji="📏" text="Körperfettanteil berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Idealgewicht (BMI-basiert): ${fmt(ergebnis.bmiSpanne.gewichtUnten)}–${fmt(ergebnis.bmiSpanne.gewichtOben)} kg | Broca: ${fmt(ergebnis.broca)} kg | Creff: ${fmt(ergebnis.creff)} kg | Aktuell: ${fmt(nGewicht)} kg — ${ergebnis.statusText}`}
            seitenTitel="Idealgewicht-Rechner"
          />

          <AiExplain
            rechnerName="Idealgewicht-Rechner"
            eingaben={{
              geschlecht,
              alter: nAlter,
              groesse: nGroesse,
              gewicht: nGewicht,
              koerperbau: koerperbauLabel,
            }}
            ergebnis={{
              broca: ergebnis.broca,
              creff: ergebnis.creff,
              bmiSpanneUnten: ergebnis.bmiSpanne.gewichtUnten,
              bmiSpanneOben: ergebnis.bmiSpanne.gewichtOben,
              status: ergebnis.statusText,
            }}
          />
        </>
      )}
    </div>
  );
}

// Hilfsfunktion: Abweichungs-Badge für einzelne Formeln
function AbweichungBadge({ aktuell, ideal }: { aktuell: number; ideal: number }) {
  const diff = Math.round((aktuell - ideal) * 10) / 10;
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  if (Math.abs(diff) < 0.5) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300">
        im Bereich
      </span>
    );
  }

  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300">
      {diff > 0 ? '+' : '−'}{fmt(Math.abs(diff))} kg
    </span>
  );
}
