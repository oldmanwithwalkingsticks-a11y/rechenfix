'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * FFMI-Rechner (Fat-Free-Mass-Index; Sport-Kategorie). BLOCK B — YMYL, körperbild-neutral.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Kouri et al. 1995:
 * - FFM (kg) = Gewicht × (1 − Körperfettanteil%/100)
 * - FFMI = FFM ÷ Größe(m)²
 * - Normalisierter FFMI = FFMI + 6,1 × (1,8 − Größe in m)  [Referenzgröße 1,80 m]
 * Reine Einordnungskennzahl — kein Fitness-, Schönheits- oder Zielwert.
 */

// Neutrale Einordnung (Orientierung, kein Ziel). Grenzen als normalisierter FFMI.
function einordnung(norm: number, sex: 'm' | 'w'): string {
  if (sex === 'w') {
    if (norm < 15) return 'unter dem Durchschnitt';
    if (norm < 18) return 'durchschnittlich';
    if (norm < 20) return 'athletisch / trainiert';
    if (norm < 22) return 'sehr muskulös';
    return 'sehr hoher Wert';
  }
  if (norm < 18) return 'unter dem Durchschnitt';
  if (norm < 20) return 'durchschnittlich';
  if (norm < 23) return 'athletisch / trainiert';
  if (norm < 25) return 'sehr muskulös';
  return 'sehr hoher Wert';
}

const REFERENZ: Record<'m' | 'w', Array<{ bereich: string; label: string }>> = {
  m: [
    { bereich: 'unter 18', label: 'unter dem Durchschnitt' },
    { bereich: '18–20', label: 'durchschnittlich' },
    { bereich: '20–23', label: 'athletisch / trainiert' },
    { bereich: '23–25', label: 'sehr muskulös' },
    { bereich: 'über 25', label: 'ohne unerlaubte Mittel selten' },
  ],
  w: [
    { bereich: 'unter 15', label: 'unter dem Durchschnitt' },
    { bereich: '15–18', label: 'durchschnittlich' },
    { bereich: '18–20', label: 'athletisch / trainiert' },
    { bereich: '20–22', label: 'sehr muskulös' },
    { bereich: 'über 22', label: 'sehr hoher Wert' },
  ],
};

export default function FfmiRechner() {
  const [gewicht, setGewicht] = useState('80');
  const [groesse, setGroesse] = useState('180');
  const [kfa, setKfa] = useState('15');
  const [geschlecht, setGeschlecht] = useState<'m' | 'w'>('m');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nGroesse = parseDeutscheZahl(groesse);
  const nKfa = parseDeutscheZahl(kfa);

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0 || nGroesse <= 0 || nKfa < 0 || nKfa >= 100) return null;
    const ffm = nGewicht * (1 - nKfa / 100);
    const hm = nGroesse / 100;
    const ffmi = ffm / (hm * hm);
    const norm = ffmi + 6.1 * (1.8 - hm);
    return { ffm, ffmi, norm };
  }, [nGewicht, nGroesse, nKfa]);

  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="ffmi-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="80" einheit="kg" />
        </div>
        <div>
          <label htmlFor="ffmi-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="180" einheit="cm" />
        </div>
        <div>
          <label htmlFor="ffmi-kfa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körperfettanteil</label>
          <NummerEingabe value={kfa} onChange={setKfa} placeholder="15" einheit="%" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aus Waage, Caliper oder Schätzung — bestimmt das Ergebnis maßgeblich.</p>
        </div>
        <div>
          <label htmlFor="ffmi-geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht (nur für die Einordnung)</label>
          <select id="ffmi-geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'm' | 'w')} className="input-field w-full">
            <option value="m">männlich</option>
            <option value="w">weiblich</option>
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Normalisierter FFMI</p>
                <p className="text-5xl font-bold">{fmt1(ergebnis.norm)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  FFMI {fmt1(ergebnis.ffmi)} · fettfreie Masse {fmt1(ergebnis.ffm)} kg
                </span>
                <span className="block text-white/80 text-sm">{einordnung(ergebnis.norm, geschlecht)}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Schätzwert, abhängig von der Körperfett-Messung. Eine Kennzahl zur Einordnung — kein Fitness- oder Schönheitsziel. Ersetzt keine ärztliche Beratung.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nGewicht)} kg × (1 − {fmt0(nKfa)} %) = {fmt1(ergebnis.ffm)} kg fettfreie Masse
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt1(ergebnis.ffm)} ÷ {(nGroesse / 100).toLocaleString('de-DE')}² = {fmt1(ergebnis.ffmi)} FFMI
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt1(ergebnis.ffmi)} + 6,1 × (1,8 − {(nGroesse / 100).toLocaleString('de-DE')}) = {fmt1(ergebnis.norm)} (normalisiert)
            </p>
          </div>

          {/* Einordnungs-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Einordnung ({geschlecht === 'm' ? 'Männer' : 'Frauen'}) — Orientierung, kein Ziel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Normalisierter FFMI</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Einordnung</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENZ[geschlecht].map((r) => {
                    const aktiv = einordnung(ergebnis.norm, geschlecht) === r.label;
                    return (
                      <tr key={r.bereich} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{r.bereich}</td>
                        <td className="py-2.5 text-gray-600 dark:text-gray-400">{r.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Populationsbasierte Richtwerte zur Einordnung, keine Vorgabe. Werte gelten für alle Körpertypen gleichermaßen.
            </p>
          </div>

          <CrossLink href="/gesundheit/koerperfett-rechner" emoji="⚖️" text="Körperfettanteil schätzen" />
          <CrossLink href="/sport/1rm-rechner" emoji="🏋️" text="Maximalkraft (1RM) berechnen" />

          <ErgebnisAktionen
            ergebnisText={`FFMI ${fmt1(ergebnis.ffmi)} (normalisiert ${fmt1(ergebnis.norm)}), fettfreie Masse ${fmt1(ergebnis.ffm)} kg — Einordnung: ${einordnung(ergebnis.norm, geschlecht)}. Schätzwert, kein Ziel.`}
            seitenTitel="FFMI-Rechner"
          />
          <AiExplain
            rechnerName="FFMI-Rechner"
            eingaben={{ gewichtKg: nGewicht, groesseCm: nGroesse, koerperfettProzent: nKfa }}
            ergebnis={{ fettfreieMasseKg: Number(ergebnis.ffm.toFixed(1)), ffmi: Number(ergebnis.ffmi.toFixed(1)), normalisierterFfmi: Number(ergebnis.norm.toFixed(1)), einordnung: einordnung(ergebnis.norm, geschlecht) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Gewicht, Größe und Körperfettanteil ein, um den FFMI zu berechnen.
        </p>
      )}
    </div>
  );
}
