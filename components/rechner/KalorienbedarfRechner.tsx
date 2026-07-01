'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Kalorienbedarf-Rechner (TDEE; Sport-Kategorie). BLOCK B — YMYL Ernährung.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Mifflin-St Jeor + PAL:
 * - BMR (Männer) = 10×kg + 6,25×cm − 5×Alter + 5 · (Frauen) … − 161
 * - TDEE = BMR × Aktivitätsfaktor (PAL 1,2 bis 1,9)
 * Der TDEE hält das Gewicht ungefähr. KEIN Defizit-/Abnehm-Feature, kein Zielwert nach unten.
 * Für die Multiplikation wird der ungerundete BMR verwendet, nur die Anzeige rundet.
 */

const PAL: Array<{ key: string; faktor: number; label: string }> = [
  { key: '1.2', faktor: 1.2, label: 'Sitzend (kaum Bewegung)' },
  { key: '1.375', faktor: 1.375, label: 'Leicht aktiv (1–3× Sport/Woche)' },
  { key: '1.55', faktor: 1.55, label: 'Moderat aktiv (3–5× Sport/Woche)' },
  { key: '1.725', faktor: 1.725, label: 'Sehr aktiv (6–7× Sport/Woche)' },
  { key: '1.9', faktor: 1.9, label: 'Extrem aktiv (körperlicher Job + Sport)' },
];

function bmrRaw(w: number, h: number, a: number, sex: 'm' | 'w'): number {
  return 10 * w + 6.25 * h - 5 * a + (sex === 'm' ? 5 : -161);
}

export default function KalorienbedarfRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [groesse, setGroesse] = useState('178');
  const [alter, setAlter] = useState('30');
  const [geschlecht, setGeschlecht] = useState<'m' | 'w'>('m');
  const [pal, setPal] = useState('1.55');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nGroesse = parseDeutscheZahl(groesse);
  const nAlter = parseDeutscheZahl(alter);
  const faktor = PAL.find((p) => p.key === pal)?.faktor ?? 1.55;

  const ergebnis = useMemo(() => {
    if (nGewicht <= 0 || nGroesse <= 0 || nAlter <= 0) return null;
    const raw = bmrRaw(nGewicht, nGroesse, nAlter, geschlecht);
    if (raw <= 0) return null;
    const bmr = Math.round(raw);
    const tdee = Math.round(raw * faktor);
    return { raw, bmr, tdee };
  }, [nGewicht, nGroesse, nAlter, geschlecht, faktor]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="tdee-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
        <div>
          <label htmlFor="tdee-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="178" einheit="cm" />
        </div>
        <div>
          <label htmlFor="tdee-alter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter</label>
          <NummerEingabe value={alter} onChange={setAlter} placeholder="30" einheit="Jahre" />
        </div>
        <div>
          <label htmlFor="tdee-geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht</label>
          <select id="tdee-geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'm' | 'w')} className="input-field w-full">
            <option value="m">männlich</option>
            <option value="w">weiblich</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="tdee-pal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivitätslevel</label>
          <select id="tdee-pal" value={pal} onChange={(e) => setPal(e.target.value)} className="input-field w-full">
            {PAL.map((p) => <option key={p.key} value={p.key}>{p.label} (×{p.faktor.toLocaleString('de-DE')})</option>)}
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Täglicher Kalorienbedarf (TDEE)</p>
                <p className="text-5xl font-bold">{fmt0(ergebnis.tdee)} kcal</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Grundumsatz {fmt0(ergebnis.bmr)} kcal
                </span>
                <span className="block text-white/80 text-sm">hält das Gewicht ungefähr</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Dieser Wert hält dein Gewicht ungefähr. Schätzung (±10–15 %) — der Aktivitätsfaktor ist grob. Ersetzt keine ärztliche oder ernährungsmedizinische Beratung.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              Grundumsatz {fmt0(ergebnis.bmr)} kcal × {faktor.toLocaleString('de-DE')} = {fmt0(ergebnis.tdee)} kcal
            </p>
          </div>

          {/* Aktivitäts-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Dein Bedarf je Aktivitätslevel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Aktivitätslevel</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Faktor</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Kalorienbedarf</th>
                  </tr>
                </thead>
                <tbody>
                  {PAL.map((p) => {
                    const t = Math.round(ergebnis.raw * p.faktor);
                    const aktiv = p.key === pal;
                    return (
                      <tr key={p.key} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{p.label.split(' (')[0]}</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">×{p.faktor.toLocaleString('de-DE')}</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(t)} kcal</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Neutraler Hinweis zu Gewichtsveränderung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              Du möchtest dein Gewicht verändern? Änderungen gelingen am besten langsam und mit ärztlicher oder ernährungsmedizinischer Begleitung. Dauerhaft unter dem Grundumsatz zu essen ist nicht ratsam — dieser Rechner gibt bewusst keine Diät- oder Defizit-Zielzahlen aus.
            </p>
          </div>

          <CrossLink href="/sport/grundumsatz-rechner" emoji="🔥" text="Grundumsatz — nur der Ruheverbrauch" />
          <CrossLink href="/sport/makronaehrstoffe-rechner" emoji="🥗" text="Makros aus deinem Kalorienziel verteilen" />

          <ErgebnisAktionen
            ergebnisText={`Kalorienbedarf (TDEE): ${fmt0(ergebnis.tdee)} kcal/Tag zum Gewicht-Halten (Grundumsatz ${fmt0(ergebnis.bmr)} kcal × Aktivitätsfaktor ${faktor.toLocaleString('de-DE')}). Schätzwert.`}
            seitenTitel="Kalorienbedarf-Rechner"
          />
          <AiExplain
            rechnerName="Kalorienbedarf-Rechner (TDEE)"
            eingaben={{ gewichtKg: nGewicht, groesseCm: nGroesse, alterJahre: nAlter, geschlecht: geschlecht === 'm' ? 'männlich' : 'weiblich', aktivitaetsfaktor: faktor }}
            ergebnis={{ grundumsatzKcal: ergebnis.bmr, tagesbedarfKcal: ergebnis.tdee, hinweis: 'hält das Gewicht ungefähr — kein Defizit-/Zielwert' }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Gewicht, Größe, Alter, Geschlecht und Aktivitätslevel ein, um den Tagesbedarf zu berechnen.
        </p>
      )}
    </div>
  );
}
