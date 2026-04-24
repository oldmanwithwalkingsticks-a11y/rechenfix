'use client';

import { useState, useMemo } from 'react';
import { berechneBmi, bmiKategorien, BMI_ADULT_MIN_AGE } from '@/lib/berechnungen/bmi';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function BmiRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [groesse, setGroesse] = useState('175');
  const [geschlecht, setGeschlecht] = useState<'maennlich' | 'weiblich'>('maennlich');
  const [alter, setAlter] = useState('30');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nGroesse = parseDeutscheZahl(groesse);
  const nAlter = parseInt(alter) || undefined;

  const ergebnis = useMemo(
    () => berechneBmi({ gewicht: nGewicht, groesse: nGroesse, geschlecht, alter: nAlter }),
    [nGewicht, nGroesse, geschlecht, nAlter]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  // Position auf der Skala (BMI 10-50 Bereich)
  const skalenPosition = ergebnis
    ? Math.min(Math.max(((ergebnis.bmi - 10) / 40) * 100, 0), 100)
    : 0;

  // Altersgating: Für Kinder/Jugendliche (<18) werden WHO-Erwachsenen-Kategorien
  // und der alters-adjustierte Optimalbereich unterdrückt — stattdessen Hinweis auf
  // Perzentilen-Referenztabellen (Kromeyer-Hauschild) und Kinderärzt:in.
  const istKind = nAlter !== undefined && nAlter > 0 && nAlter < BMI_ADULT_MIN_AGE;

  return (
    <div>
      <div className="mb-6">
        <RadioToggleGroup
          name="bmi-geschlecht"
          legend="Geschlecht"
          options={[
            { value: 'maennlich', label: 'Männlich' },
            { value: 'weiblich', label: 'Weiblich' },
          ]}
          value={geschlecht}
          onChange={(v) => setGeschlecht(v as 'maennlich' | 'weiblich')}
        />
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewicht</label>
          <NummerEingabe
            value={gewicht}
            onChange={setGewicht}
            placeholder="z.B. 75"
            einheit="kg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Größe</label>
          <NummerEingabe
            value={groesse}
            onChange={setGroesse}
            placeholder="z.B. 175"
            einheit="cm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter (optional)</label>
          <NummerEingabe
            value={alter}
            onChange={setAlter}
            placeholder="z.B. 30"
            einheit="Jahre"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && nGewicht > 0 && nGroesse > 0 && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Ihr Body Mass Index</p>
                <p className="text-5xl font-bold">{fmt(ergebnis.bmi)}</p>
              </div>
              {!istKind && (
                <div className="sm:text-right">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {ergebnis.kategorie.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Kinder/Jugendliche-Hinweis (<18) */}
          {istKind && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">
                BMI bei Kindern und Jugendlichen
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">
                Für Personen unter 18 Jahren gelten <strong>BMI-Perzentilen nach Alter und Geschlecht</strong> — nicht die Erwachsenen-Kategorien der WHO. Der oben berechnete BMI-Wert ist korrekt, die Einordnung in „Unter-/Normal-/Übergewicht“ lässt sich daraus bei Kindern aber nicht direkt ableiten.
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                Eine fundierte Einschätzung ist nur mit altersspezifischen Referenztabellen (z. B. Kromeyer-Hauschild für Deutschland) möglich. Bitte wenden Sie sich für eine Beurteilung an Kinderärzt:in oder kinder- und jugendmedizinische Praxen.
              </p>
            </div>
          )}

          {/* BMI-Skala */}
          {!istKind && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">BMI-Einordnung</h2>

            {/* Farbiger Balken */}
            <div className="relative mb-8">
              <div className="flex h-4 rounded-full overflow-hidden">
                {bmiKategorien.map((k, i) => {
                  const breite = ((k.max - k.min) / 40) * 100;
                  return (
                    <div
                      key={i}
                      style={{ width: `${breite}%`, backgroundColor: k.farbe }}
                      className="first:rounded-l-full last:rounded-r-full"
                    />
                  );
                })}
              </div>
              {/* Marker */}
              <div
                className="absolute top-0 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${skalenPosition}%` }}
              >
                <div className="w-1 h-4 bg-gray-900 dark:bg-white rounded-full" />
                <div className="mt-1 text-xs font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap -translate-x-1/4">
                  {fmt(ergebnis.bmi)}
                </div>
              </div>
              {/* Beschriftung */}
              <div className="flex justify-between mt-6 text-[10px] text-gray-500 dark:text-gray-400">
                <span>10</span>
                <span>18,5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>

            {/* Legende */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bmiKategorien.map((k, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                    ergebnis.kategorie.label === k.label
                      ? 'bg-white dark:bg-gray-600 shadow-sm font-bold text-gray-800 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: k.farbe }} />
                  <span>{k.label} ({k.min}–{k.max === 60 ? '40+' : k.max})</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Optimaler Bereich */}
          {!istKind && (
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
            <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">
              Optimaler BMI-Bereich{nAlter ? ` für Ihr Alter (${nAlter} Jahre)` : ''}
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-sm">
              BMI {fmt(ergebnis.optimalerBereich.min)} – {fmt(ergebnis.optimalerBereich.max)} entspricht einem Gewicht von{' '}
              <strong>{fmt(ergebnis.optimalesGewichtMin)} – {fmt(ergebnis.optimalesGewichtMax)} kg</strong> bei Ihrer Größe.
            </p>
          </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Der BMI-Rechner ersetzt keine ärztliche Beratung. Der BMI berücksichtigt weder Muskelmasse noch Körperfettverteilung. Wenden Sie sich für eine individuelle Einschätzung an Ihren Arzt.
            </p>
          </div>

          <CrossLink href="/gesundheit/idealgewicht-rechner" emoji="⚖️" text="Idealgewicht berechnen" />
          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf berechnen" />

          <ErgebnisAktionen
            ergebnisText={istKind
              ? `BMI: ${fmt(ergebnis.bmi)} (Kinder/Jugendliche: Einordnung nur über alters- und geschlechtsspezifische Perzentilen möglich)`
              : `BMI: ${fmt(ergebnis.bmi)} — ${ergebnis.kategorie.label}`}
            seitenTitel="BMI-Rechner"
          />

          <AiExplain
            rechnerName="BMI-Rechner"
            eingaben={{ gewicht: nGewicht, groesse: nGroesse, geschlecht, alter: nAlter }}
            ergebnis={istKind
              ? { bmi: ergebnis.bmi, hinweis: 'Unter 18 Jahren: Einordnung nur über BMI-Perzentilen (z. B. Kromeyer-Hauschild) möglich — Kategorie-Wertung unterdrückt.' }
              : { bmi: ergebnis.bmi, kategorie: ergebnis.kategorie.label, optimalesGewichtMin: ergebnis.optimalesGewichtMin, optimalesGewichtMax: ergebnis.optimalesGewichtMax }}
          />
        </>
      )}
    </div>
  );
}
