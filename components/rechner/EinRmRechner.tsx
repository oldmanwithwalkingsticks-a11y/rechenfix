'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * 1RM-Rechner / Maximalkraft-Schätzung (Sport-Kategorie).
 *
 * Formeln (inline):
 * - Epley:   1RM = Gewicht × (1 + Wdh / 30)
 * - Brzycki: 1RM = Gewicht × 36 / (37 − Wdh)   (nur für Wdh < 37 gültig)
 * Die Schätzung ersetzt den riskanten echten Maximalversuch (Wellbeing-Hinweis
 * im Content). Werte sind am genauesten bei wenigen Wiederholungen.
 */
const ZIELE: { label: string; prozent: number; wdh: string }[] = [
  { label: 'Maximalkraft', prozent: 0.9, wdh: '1–5 Wdh' },
  { label: 'Muskelaufbau', prozent: 0.75, wdh: '6–12 Wdh' },
  { label: 'Kraftausdauer', prozent: 0.6, wdh: '15+ Wdh' },
];

export default function EinRmRechner() {
  const [gewicht, setGewicht] = useState('80');
  const [wdh, setWdh] = useState('5');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nWdh = parseDeutscheZahl(wdh);

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0 || nWdh <= 0) return null;
    const epley = nGewicht * (1 + nWdh / 30);
    const brzycki = nWdh < 37 ? (nGewicht * 36) / (37 - nWdh) : null;
    const mittel = brzycki !== null ? (epley + brzycki) / 2 : epley;
    return { epley, brzycki, mittel };
  }, [nGewicht, nWdh]);

  const f0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const f1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bewegtes Gewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="80" einheit="kg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wiederholungen</label>
          <NummerEingabe value={wdh} onChange={setWdh} placeholder="5" einheit="Wdh" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Geschätztes 1RM (Mittel)</p>
                <p className="text-5xl font-bold">{f0(ergebnis.mittel)} kg</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Epley {f0(ergebnis.epley)} kg
                </span>
                <span className="block text-white/80 text-sm">
                  Brzycki {ergebnis.brzycki !== null ? `${f0(ergebnis.brzycki)} kg` : 'nicht anwendbar'}
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              Epley: {f0(nGewicht)} × (1 + {f0(nWdh)}/30) = {f1(ergebnis.epley)} kg
            </p>
            {ergebnis.brzycki !== null && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                Brzycki: {f0(nGewicht)} × 36 ÷ (37 − {f0(nWdh)}) = {f1(ergebnis.brzycki)} kg
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Schätzung — am genauesten bei wenigen Wiederholungen. Kein Anlass für echte Maximalversuche.
            </p>
          </div>

          {/* Trainingsgewichte je Ziel */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Trainingsgewichte nach Ziel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Ziel</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Intensität</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Gewicht</th>
                  </tr>
                </thead>
                <tbody>
                  {ZIELE.map((z) => (
                    <tr key={z.label} className="border-b border-gray-100 dark:border-gray-600/50">
                      <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{z.label}</td>
                      <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{f0(z.prozent * 100)} % · {z.wdh}</td>
                      <td className="py-2.5 text-gray-800 dark:text-gray-200">≈ {f0(z.prozent * ergebnis.mittel)} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🏃" text="Kalorienverbrauch bei Bewegung schätzen" />
          <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="❤️" text="Trainings-Herzfrequenzzonen berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${f0(nGewicht)} kg × ${f0(nWdh)} Wdh → geschätztes 1RM ≈ ${f0(ergebnis.mittel)} kg (Epley ${f0(ergebnis.epley)}, Brzycki ${ergebnis.brzycki !== null ? f0(ergebnis.brzycki) : '–'})`}
            seitenTitel="1RM-Rechner"
          />
          <AiExplain
            rechnerName="1RM-Rechner (Maximalkraft)"
            eingaben={{ gewichtKg: nGewicht, wiederholungen: nWdh }}
            ergebnis={{ einRmEpley: ergebnis.epley, einRmBrzycki: ergebnis.brzycki, einRmMittel: ergebnis.mittel }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie das bewegte Gewicht und die Wiederholungen ein, um das 1RM zu schätzen.
        </p>
      )}
    </div>
  );
}
