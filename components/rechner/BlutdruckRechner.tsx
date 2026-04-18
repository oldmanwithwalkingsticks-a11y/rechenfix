'use client';

import { useState, useMemo } from 'react';
import { berechneBlutdruck, type BlutdruckMessung } from '@/lib/berechnungen/blutdruck';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const FARB_KLASSEN: Record<string, string> = {
  green: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300 border-green-200 dark:border-green-500/30',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/30',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
  red: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
  darkred: 'bg-red-200 text-red-900 dark:bg-red-600/30 dark:text-red-200 border-red-300 dark:border-red-500/30',
};

const SKALA = [
  { label: 'Optimal', bereich: '<120/<80', farbe: 'bg-green-500', breite: '16.6%' },
  { label: 'Normal', bereich: '120–129/80–84', farbe: 'bg-green-400', breite: '16.6%' },
  { label: 'Hochnormal', bereich: '130–139/85–89', farbe: 'bg-yellow-400', breite: '16.6%' },
  { label: 'Grad 1', bereich: '140–159/90–99', farbe: 'bg-orange-400', breite: '16.6%' },
  { label: 'Grad 2', bereich: '160–179/100–109', farbe: 'bg-red-400', breite: '16.6%' },
  { label: 'Grad 3', bereich: '≥180/≥110', farbe: 'bg-red-600', breite: '16.6%' },
];

export default function BlutdruckRechner() {
  const [modus, setModus] = useState('eine');
  const [sys1, setSys1] = useState('130');
  const [dia1, setDia1] = useState('85');
  const [messungen, setMessungen] = useState<{ sys: string; dia: string }[]>([
    { sys: '130', dia: '85' },
    { sys: '', dia: '' },
    { sys: '', dia: '' },
    { sys: '', dia: '' },
    { sys: '', dia: '' },
  ]);

  const ergebnis = useMemo(() => {
    if (modus === 'eine') {
      const s = parseDeutscheZahl(sys1);
      const d = parseDeutscheZahl(dia1);
      if (s <= 0 || d <= 0) return null;
      return berechneBlutdruck([{ systolisch: s, diastolisch: d }]);
    } else {
      const parsed: BlutdruckMessung[] = messungen
        .map(m => ({ systolisch: parseDeutscheZahl(m.sys), diastolisch: parseDeutscheZahl(m.dia) }))
        .filter(m => m.systolisch > 0 && m.diastolisch > 0);
      if (parsed.length === 0) return null;
      return berechneBlutdruck(parsed);
    }
  }, [modus, sys1, dia1, messungen]);

  const updateMessung = (index: number, feld: 'sys' | 'dia', wert: string) => {
    setMessungen(prev => prev.map((m, i) => i === index ? { ...m, [feld]: wert } : m));
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        <RadioToggleGroup
          legend="Messmodus"
          name="messmodus"
          options={[
            { value: 'eine', label: 'Eine Messung' },
            { value: 'mehrere', label: 'Durchschnitt (bis 5)' },
          ]}
          value={modus}
          onChange={setModus}
        />

        {modus === 'eine' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Systolisch (mmHg)</label>
              <NummerEingabe value={sys1} onChange={setSys1} placeholder="130" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Diastolisch (mmHg)</label>
              <NummerEingabe value={dia1} onChange={setDia1} placeholder="85" />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="w-6">#</span>
              <span>Systolisch</span>
              <span>Diastolisch</span>
            </div>
            {messungen.map((m, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center">
                <span className="w-6 text-sm text-gray-600 dark:text-gray-400">{i + 1}</span>
                <NummerEingabe value={m.sys} onChange={v => updateMessung(i, 'sys', v)} placeholder="130" />
                <NummerEingabe value={m.dia} onChange={v => updateMessung(i, 'dia', v)} placeholder="85" />
              </div>
            ))}
          </div>
        )}
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 gap-6 text-center mb-4">
              <div>
                <p className="text-white/70 text-sm mb-1">Systolisch</p>
                <p className="text-4xl font-bold">{ergebnis.systolisch}</p>
                <p className="text-white/60 text-xs">mmHg</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Diastolisch</p>
                <p className="text-4xl font-bold">{ergebnis.diastolisch}</p>
                <p className="text-white/60 text-xs">mmHg</p>
              </div>
            </div>
            {ergebnis.istDurchschnitt && (
              <p className="text-white/60 text-xs text-center mb-2">Durchschnitt aus {ergebnis.messungen.length} Messungen</p>
            )}
          </div>

          {/* Klassifikation */}
          <div className={`border rounded-xl p-4 mb-4 ${FARB_KLASSEN[ergebnis.klassifikation.farbe] || FARB_KLASSEN.green}`}>
            <p className="text-lg font-bold mb-1">{ergebnis.klassifikation.name}</p>
            <p className="text-sm">{ergebnis.klassifikation.beschreibung}</p>
          </div>

          {/* Skala */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">WHO-Klassifikation</p>
            <div className="flex rounded-lg overflow-hidden mb-2 h-4">
              {SKALA.map(s => (
                <div key={s.label} className={`${s.farbe} h-full`} style={{ width: s.breite }} title={`${s.label}: ${s.bereich}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-xs text-center">
              {SKALA.map(s => (
                <div key={s.label}>
                  <p className="font-medium text-gray-700 dark:text-gray-300">{s.label}</p>
                  <p className="text-gray-600 dark:text-gray-400">{s.bereich}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zusatzwerte */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Weitere Werte</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pulsdruck (Differenz)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.pulsdruckDiff} mmHg</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mittlerer arterieller Druck</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.mittlererDruck} mmHg</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              ⚠️ <strong>Kein Ersatz für ärztliche Diagnose.</strong> Bei dauerhaft erhöhten Werten (ab 140/90 mmHg) unbedingt einen Arzt aufsuchen. Einzelmessungen sind weniger aussagekräftig als Durchschnittswerte über mehrere Tage.
            </p>
          </div>

          <CrossLink href="/gesundheit/bmi-rechner" emoji="❤️" text="BMI berechnen" />
          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf berechnen" />
          <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="💓" text="Herzfrequenz-Zonen berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Blutdruck: ${ergebnis.systolisch}/${ergebnis.diastolisch} mmHg — ${ergebnis.klassifikation.name}`}
            seitenTitel="Blutdruck-Rechner"
          />

          <AiExplain
            rechnerName="Blutdruck-Rechner"
            eingaben={{
              systolisch: ergebnis.systolisch,
              diastolisch: ergebnis.diastolisch,
              anzahlMessungen: ergebnis.messungen.length,
            }}
            ergebnis={{
              klassifikation: ergebnis.klassifikation.name,
              pulsdruck: ergebnis.pulsdruckDiff,
              mittlererDruck: ergebnis.mittlererDruck,
            }}
          />
        </>
      )}
    </div>
  );
}
