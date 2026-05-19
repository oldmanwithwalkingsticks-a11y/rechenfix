'use client';

import { useState, useMemo } from 'react';
import { berechneRahmengroesse } from '@/lib/berechnungen/fahrrad-rahmen';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function FahrradRahmenRechner() {
  const [koerpergroesse, setKoerpergroesse] = useState('178');
  const [schrittlaenge, setSchrittlaenge] = useState('');
  const [fahrradtyp, setFahrradtyp] = useState('city');

  const ergebnis = useMemo(() => {
    const kg = parseDeutscheZahl(koerpergroesse);
    const sl = schrittlaenge ? parseDeutscheZahl(schrittlaenge) : null;
    if (kg <= 0) return null;
    return berechneRahmengroesse(kg, sl, fahrradtyp);
  }, [koerpergroesse, schrittlaenge, fahrradtyp]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße (cm)</label>
            <NummerEingabe value={koerpergroesse} onChange={setKoerpergroesse} placeholder="178" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schrittlänge (cm, optional)</label>
            <NummerEingabe value={schrittlaenge} onChange={setSchrittlaenge} placeholder="z. B. 84" />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Barfuß an der Wand, Buch zwischen die Beine — Abstand Boden bis Oberkante messen</p>
          </div>
        </div>

        <RadioToggleGroup
          legend="Fahrradtyp"
          name="fahrradtyp"
          options={[
            { value: 'city', label: 'City/Trekking' },
            { value: 'rennrad', label: 'Rennrad' },
            { value: 'mtb', label: 'Mountainbike' },
            { value: 'ebike', label: 'E-Bike' },
          ]}
          value={fahrradtyp}
          onChange={setFahrradtyp}
          columns={4}
        />
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1 text-center">{ergebnis.fahrradtypLabel} — Empfohlene Rahmenhöhe</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-bold">{ergebnis.rahmenhoeheCm}</p>
                <p className="text-white/60 text-xs">cm</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold">{ergebnis.rahmenhoehZoll}&quot;</p>
                <p className="text-white/60 text-xs">Zoll</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold">{ergebnis.buchstabengroesse}</p>
                <p className="text-white/60 text-xs">Größe</p>
              </div>
            </div>
            <p className="text-white/60 text-xs text-center mt-2">
              Toleranzbereich: {ergebnis.toleranzMin}–{ergebnis.toleranzMax} cm
            </p>
          </div>

          {/* Berechnung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Körpergröße</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.koerpergroesse} cm</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Schrittlänge {ergebnis.schrittlaengeGeschaetzt && <span className="text-gray-600 dark:text-gray-400">(geschätzt: {ergebnis.koerpergroesse} × 0,47)</span>}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.schrittlaenge} cm</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fahrradtyp-Faktor ({ergebnis.fahrradtypLabel})</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  × {fahrradtyp === 'city' || fahrradtyp === 'ebike' ? '0,66' : fahrradtyp === 'rennrad' ? '0,665' : '0,574'}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold">
                <span className="text-gray-700 dark:text-gray-200">Rahmenhöhe</span>
                <span className="text-primary-600 dark:text-primary-400">{ergebnis.rahmenhoeheCm} cm / {ergebnis.rahmenhoehZoll}&quot;</span>
              </div>
            </div>
          </div>

          {/* Größentabelle */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Größenzuordnung {ergebnis.fahrradtypLabel}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              {(fahrradtyp === 'mtb'
                ? [{ l: 'XS', r: '<38' }, { l: 'S', r: '38–41' }, { l: 'M', r: '42–46' }, { l: 'L', r: '47–51' }, { l: 'XL', r: '52–55' }, { l: 'XXL', r: '56+' }]
                : [{ l: 'XS', r: '<47' }, { l: 'S', r: '47–50' }, { l: 'M', r: '51–54' }, { l: 'L', r: '55–58' }, { l: 'XL', r: '59–62' }, { l: 'XXL', r: '63+' }]
              ).map(g => (
                <div key={g.l} className={`rounded-lg px-2 py-1 ${g.l === ergebnis.buchstabengroesse ? 'bg-blue-200 dark:bg-blue-500/30 font-bold text-blue-900 dark:text-blue-200' : 'text-blue-700 dark:text-blue-400'}`}>
                  <p className="font-medium">{g.l}</p>
                  <p>{g.r} cm</p>
                </div>
              ))}
            </div>
          </div>

          {ergebnis.schrittlaengeGeschaetzt && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                💡 Die Schrittlänge wurde aus der Körpergröße geschätzt. Für ein genaueres Ergebnis messen Sie Ihre Schrittlänge selbst — das verbessert die Empfehlung deutlich.
              </p>
            </div>
          )}

          <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Zoll in Zentimeter umrechnen" />
          <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Autokosten berechnen — Alternative zum Rad?" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.fahrradtypLabel}: Rahmenhöhe ${ergebnis.rahmenhoeheCm} cm (${ergebnis.rahmenhoehZoll}"), Größe ${ergebnis.buchstabengroesse} (±2 cm)`}
            seitenTitel="Fahrrad-Rahmengröße-Rechner"
          />

          <AiExplain
            rechnerName="Fahrrad-Rahmengröße-Rechner"
            eingaben={{
              koerpergroesse: ergebnis.koerpergroesse,
              schrittlaenge: ergebnis.schrittlaenge,
              schrittlaengeGeschaetzt: ergebnis.schrittlaengeGeschaetzt,
              fahrradtyp: ergebnis.fahrradtypLabel,
            }}
            ergebnis={{
              rahmenhoeheCm: ergebnis.rahmenhoeheCm,
              rahmenhoehZoll: ergebnis.rahmenhoehZoll,
              groesse: ergebnis.buchstabengroesse,
            }}
          />
        </>
      )}
    </div>
  );
}
