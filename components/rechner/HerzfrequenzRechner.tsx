'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Formel = 'einfach' | 'karvonen';

interface Zone {
  name: string;
  von: number;
  bis: number;
  farbe: string;
  beschreibung: string;
}

const ZONEN_PROZENT: { name: string; von: number; bis: number; farbe: string; beschreibung: string }[] = [
  { name: 'Regeneration', von: 0.50, bis: 0.60, farbe: '#10b981', beschreibung: 'Aktive Erholung, lockeres Warm-Up' },
  { name: 'Fettverbrennung', von: 0.60, bis: 0.70, farbe: '#84cc16', beschreibung: 'Längere Einheiten, maximale Fettoxidation' },
  { name: 'Grundlagenausdauer', von: 0.70, bis: 0.80, farbe: '#eab308', beschreibung: 'Aerobe Ausdauer, Herz-Kreislauf-Basis' },
  { name: 'Anaerobe Schwelle', von: 0.80, bis: 0.90, farbe: '#f97316', beschreibung: 'Laktatschwelle, Tempohärte' },
  { name: 'Maximum', von: 0.90, bis: 1.00, farbe: '#dc2626', beschreibung: 'VO₂max, Intervall, kurze Spitzen' },
];

export default function HerzfrequenzRechner() {
  const [alter, setAlter] = useState('35');
  const [ruhepuls, setRuhepuls] = useState('65');
  const [formel, setFormel] = useState<Formel>('karvonen');

  const nAlter = parseDeutscheZahl(alter);
  const nRuhe = parseDeutscheZahl(ruhepuls);

  const ergebnis = useMemo(() => {
    const maxEinfach = 220 - nAlter;
    const maxGenau = 207 - 0.7 * nAlter;
    const maxHf = Math.round(maxGenau);

    const zonen: Zone[] = ZONEN_PROZENT.map(z => {
      let von: number;
      let bis: number;
      if (formel === 'karvonen' && nRuhe > 0) {
        von = Math.round((maxHf - nRuhe) * z.von + nRuhe);
        bis = Math.round((maxHf - nRuhe) * z.bis + nRuhe);
      } else {
        von = Math.round(maxHf * z.von);
        bis = Math.round(maxHf * z.bis);
      }
      return { ...z, von, bis };
    });

    return { maxEinfach, maxGenau, maxHf, zonen };
  }, [nAlter, nRuhe, formel]);

  return (
    <div>
      {/* Alter */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ihr Alter</label>
        <NummerEingabe value={alter} onChange={setAlter} placeholder="35" einheit="Jahre" />
      </div>

      {/* Ruhepuls */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ruhepuls (optional)</label>
        <NummerEingabe value={ruhepuls} onChange={setRuhepuls} placeholder="65" einheit="bpm" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Morgens im Liegen messen. Für genauere Berechnung nach Karvonen.</p>
      </div>

      {/* Formel */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Formel</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {[
            { val: 'einfach' as Formel, label: 'Einfach (% vom Maxpuls)' },
            { val: 'karvonen' as Formel, label: 'Karvonen (mit Ruhepuls)' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setFormel(opt.val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                formel === opt.val
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max-HF */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
        <p className="text-white/90 text-sm mb-1">Ihre maximale Herzfrequenz</p>
        <p className="text-5xl font-bold">{ergebnis.maxHf} bpm</p>
        <p className="text-white/90 text-sm mt-2">
          Formel 207 − 0,7 × Alter (genauer als 220 − Alter = {ergebnis.maxEinfach})
        </p>
      </div>

      {/* Zonen */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Trainingszonen</h3>
        <div className="space-y-3">
          {ergebnis.zonen.map((z, i) => (
            <div key={z.name}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{z.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{Math.round(ZONEN_PROZENT[i].von * 100)}–{Math.round(ZONEN_PROZENT[i].bis * 100)}%</span>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200 tabular-nums text-sm">{z.von}–{z.bis} bpm</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: z.farbe, opacity: 0.85 }}></div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{z.beschreibung}</p>
            </div>
          ))}
        </div>
      </div>

      {formel === 'karvonen' && nRuhe > 0 && (
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong>Karvonen-Formel:</strong> Zielpuls = ((MaxHF − Ruhepuls) × Intensität) + Ruhepuls. Mit Ruhepuls {nRuhe} bpm werden die Zonen individueller berechnet als mit der einfachen Prozent-Methode.
          </p>
        </div>
      )}

      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienrechner: Tagesbedarf und Sport-Kalorien" />
      <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI-Rechner: Body-Mass-Index berechnen" />
      <CrossLink href="/gesundheit/schlaf-rechner" emoji="😴" text="Schlafrechner: Optimale Aufwachzeit finden" />

      <ErgebnisAktionen
        ergebnisText={`Max. Herzfrequenz ${ergebnis.maxHf} bpm — Fettverbrennung: ${ergebnis.zonen[1].von}–${ergebnis.zonen[1].bis} bpm, Grundlagenausdauer: ${ergebnis.zonen[2].von}–${ergebnis.zonen[2].bis} bpm`}
        seitenTitel="Herzfrequenz-Rechner"
      />

      <AiExplain
        rechnerName="Herzfrequenz-Rechner"
        eingaben={{
          alterJahre: String(nAlter),
          ruhepulsBpm: String(nRuhe),
          formel: formel === 'karvonen' ? 'Karvonen' : 'Prozent vom Maxpuls',
        }}
        ergebnis={{
          maxHfBpm: String(ergebnis.maxHf),
          regenerationBpm: `${ergebnis.zonen[0].von}-${ergebnis.zonen[0].bis}`,
          fettverbrennungBpm: `${ergebnis.zonen[1].von}-${ergebnis.zonen[1].bis}`,
          grundlagenausdauerBpm: `${ergebnis.zonen[2].von}-${ergebnis.zonen[2].bis}`,
          anaerobeSchwelleBpm: `${ergebnis.zonen[3].von}-${ergebnis.zonen[3].bis}`,
          maximumBpm: `${ergebnis.zonen[4].von}-${ergebnis.zonen[4].bis}`,
        }}
      />
    </div>
  );
}
