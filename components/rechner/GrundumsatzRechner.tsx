'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Grundumsatz-Rechner (BMR nach Mifflin-St Jeor; Sport-Kategorie). BLOCK B — YMYL Ernährung.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Mifflin-St Jeor 1990:
 * - Männer: BMR = 10 × Gewicht + 6,25 × Größe − 5 × Alter + 5
 * - Frauen: BMR = 10 × Gewicht + 6,25 × Größe − 5 × Alter − 161
 * Zeigt bewusst NUR den Grundumsatz (Ruheumsatz), keinen Gesamtbedarf/kein Defizit.
 * Der Grundumsatz ist die untere Grenze — dauerhaftes Unterschreiten ist nicht ratsam.
 */

const ALTER_STUFEN = [20, 30, 40, 50, 60];

function bmrOf(w: number, h: number, a: number, sex: 'm' | 'w'): number {
  return Math.round(10 * w + 6.25 * h - 5 * a + (sex === 'm' ? 5 : -161));
}

export default function GrundumsatzRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [groesse, setGroesse] = useState('178');
  const [alter, setAlter] = useState('30');
  const [geschlecht, setGeschlecht] = useState<'m' | 'w'>('m');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nGroesse = parseDeutscheZahl(groesse);
  const nAlter = parseDeutscheZahl(alter);

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0 || nGroesse <= 0 || nAlter <= 0) return null;
    const bmr = bmrOf(nGewicht, nGroesse, nAlter, geschlecht);
    if (bmr <= 0) return null;
    return { bmr };
  }, [nGewicht, nGroesse, nAlter, geschlecht]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const konstante = geschlecht === 'm' ? '+ 5' : '− 161';

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="bmr-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
        <div>
          <label htmlFor="bmr-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="178" einheit="cm" />
        </div>
        <div>
          <label htmlFor="bmr-alter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter</label>
          <NummerEingabe value={alter} onChange={setAlter} placeholder="30" einheit="Jahre" />
        </div>
        <div>
          <label htmlFor="bmr-geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht</label>
          <select id="bmr-geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'm' | 'w')} className="input-field w-full">
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
                <p className="text-white/80 text-sm mb-1">Grundumsatz (Ruheumsatz)</p>
                <p className="text-5xl font-bold">{fmt0(ergebnis.bmr)} kcal</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  pro Tag in völliger Ruhe
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Der Grundumsatz ist der Verbrauch in völliger Ruhe und zugleich die untere Grenze — dauerhaft weniger zu essen ist nicht ratsam. Statistische Schätzung (±10 %), ersetzt keine ärztliche Beratung.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg (Mifflin-St Jeor)</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              10 × {fmt0(nGewicht)} + 6,25 × {fmt0(nGroesse)} − 5 × {fmt0(nAlter)} {konstante} = {fmt0(ergebnis.bmr)} kcal
            </p>
          </div>

          {/* Hinweis TDEE */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              Dies ist nur der Ruheumsatz. Deinen tatsächlichen Tagesbedarf mit Bewegung schätzt der verlinkte Kalorien-Rechner weiter unten.
            </p>
          </div>

          {/* Alters-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Grundumsatz nach Alter (bei deinem Gewicht &amp; deiner Größe)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Alter</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Grundumsatz</th>
                  </tr>
                </thead>
                <tbody>
                  {ALTER_STUFEN.map((a) => {
                    const b = bmrOf(nGewicht, nGroesse, a, geschlecht);
                    const aktiv = Math.round(nAlter) === a;
                    return (
                      <tr key={a} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{a} Jahre</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(b)} kcal</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Der Grundumsatz sinkt in der Formel um 5 kcal pro Lebensjahr. Nur informativ, kein Zielwert.
            </p>
          </div>

          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch bei Bewegung berechnen" />
          <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Grundumsatz (BMR) nach Mifflin-St Jeor: ${fmt0(ergebnis.bmr)} kcal/Tag in völliger Ruhe. Schätzwert ±10 %, untere Grenze — kein Zielwert.`}
            seitenTitel="Grundumsatz-Rechner"
          />
          <AiExplain
            rechnerName="Grundumsatz-Rechner (BMR)"
            eingaben={{ gewichtKg: nGewicht, groesseCm: nGroesse, alterJahre: nAlter, geschlecht: geschlecht === 'm' ? 'männlich' : 'weiblich' }}
            ergebnis={{ grundumsatzKcal: ergebnis.bmr, hinweis: 'Ruheumsatz, untere Grenze — kein Gesamtbedarf und kein Zielwert' }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Gewicht, Größe, Alter und Geschlecht ein, um den Grundumsatz zu berechnen.
        </p>
      )}
    </div>
  );
}
