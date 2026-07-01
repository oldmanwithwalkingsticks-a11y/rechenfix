'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Trinkmenge-Rechner (Flüssigkeitsbedarf; Sport-Kategorie). BLOCK B — YMYL Gesundheit.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), IOM/EFSA/ACSM:
 * - Basis (ml) = Gewicht × Faktor (Männer 33 · Frauen 31 ml/kg)
 * - Sport-Bonus (ml) = (Sportminuten ÷ 30) × 350
 * - Klima-Faktor: normal 1,0 · warm 1,1 · sehr heiß 1,2
 * - Gesamt (L) = (Basis × Klima + Sport-Bonus) ÷ 1000
 * Orientierungswert für gesunde Erwachsene. Auch zu viel Wasser kann schaden (Hyponatriämie).
 */

const GEWICHT_STUFEN = [50, 60, 70, 80, 90, 100];

const KLIMA: Record<string, { faktor: number; label: string }> = {
  normal: { faktor: 1.0, label: 'Normal / gemäßigt' },
  warm: { faktor: 1.1, label: 'Warm / heiß' },
  heiss: { faktor: 1.2, label: 'Sehr heiß / feucht' },
};

export default function TrinkmengeRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [geschlecht, setGeschlecht] = useState<'m' | 'w'>('m');
  const [sportMin, setSportMin] = useState('45');
  const [klima, setKlima] = useState('normal');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nSport = parseDeutscheZahl(sportMin);
  const faktorKg = geschlecht === 'm' ? 33 : 31;
  const klimaFaktor = KLIMA[klima]?.faktor ?? 1.0;

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0) return null;
    const basis = nGewicht * faktorKg;
    const bonus = Math.max(0, nSport) / 30 * 350;
    const gesamtMl = basis * klimaFaktor + bonus;
    return { basis, bonus, gesamtMl, gesamtL: gesamtMl / 1000 };
  }, [nGewicht, faktorKg, nSport, klimaFaktor]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="tr-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
        <div>
          <label htmlFor="tr-geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht</label>
          <select id="tr-geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'm' | 'w')} className="input-field w-full">
            <option value="m">männlich (33 ml/kg)</option>
            <option value="w">weiblich (31 ml/kg)</option>
          </select>
        </div>
        <div>
          <label htmlFor="tr-sport" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sportdauer heute</label>
          <NummerEingabe value={sportMin} onChange={setSportMin} placeholder="45" einheit="min" />
        </div>
        <div>
          <label htmlFor="tr-klima" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Klima</label>
          <select id="tr-klima" value={klima} onChange={(e) => setKlima(e.target.value)} className="input-field w-full">
            {Object.entries(KLIMA).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Empfohlene Trinkmenge</p>
                <p className="text-5xl font-bold">{fmt2(ergebnis.gesamtL)} L</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Basis {fmt0(ergebnis.basis * klimaFaktor)} ml + Sport {fmt0(ergebnis.bonus)} ml
                </span>
                <span className="block text-white/80 text-sm">pro Tag, grober Orientierungswert</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Orientierungswert für gesunde Erwachsene. Auch zu viel Wasser in kurzer Zeit kann schaden. Bei Nieren- oder Herzerkrankungen gilt oft eine ärztlich verordnete Trinkmenge — dann ärztlichen Rat befolgen.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nGewicht)} × {faktorKg} = {fmt0(ergebnis.basis)} ml Basis{klimaFaktor !== 1 ? ` × ${klimaFaktor.toLocaleString('de-DE')} = ${fmt0(ergebnis.basis * klimaFaktor)} ml` : ''}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              + ({fmt0(nSport)} ÷ 30) × 350 = {fmt0(ergebnis.bonus)} ml Sport → {fmt2(ergebnis.gesamtL)} L
            </p>
          </div>

          {/* Gewichts-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Basis-Bedarf nach Gewicht (ohne Sport, normales Klima)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Gewicht</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Basis-Bedarf</th>
                  </tr>
                </thead>
                <tbody>
                  {GEWICHT_STUFEN.map((kg) => {
                    const l = (kg * faktorKg) / 1000;
                    const aktiv = Math.round(nGewicht) === kg;
                    return (
                      <tr key={kg} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{kg} kg</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt2(l)} L</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Basis mit {faktorKg} ml/kg. Rund 20 % der Flüssigkeit nimmt man üblicherweise über die Nahrung auf.
            </p>
          </div>

          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch beim Sport" />
          <CrossLink href="/sport/schritte-kilometer-rechner" emoji="👟" text="Schritte in Kilometer umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`Trinkmenge (Orientierung): ${fmt2(ergebnis.gesamtL)} L/Tag bei ${fmt0(nGewicht)} kg, ${fmt0(nSport)} min Sport, ${KLIMA[klima].label}. Kein medizinischer Wert.`}
            seitenTitel="Trinkmenge-Rechner"
          />
          <AiExplain
            rechnerName="Trinkmenge-Rechner"
            eingaben={{ gewichtKg: nGewicht, geschlecht: geschlecht === 'm' ? 'männlich' : 'weiblich', sportMinuten: nSport, klima: KLIMA[klima].label }}
            ergebnis={{ trinkmengeLiter: Number(ergebnis.gesamtL.toFixed(2)), basisMl: Math.round(ergebnis.basis * klimaFaktor), sportBonusMl: Math.round(ergebnis.bonus), hinweis: 'Orientierungswert, kein medizinischer Zielwert' }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Ihr Gewicht ein, um die grobe Trinkmenge zu schätzen.
        </p>
      )}
    </div>
  );
}
