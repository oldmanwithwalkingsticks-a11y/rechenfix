'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Makronährstoffe-Rechner (Sport-Kategorie). BLOCK B — YMYL Ernährung.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Atwater-Faktoren:
 * - Gramm(Makro) = (Ziel-kcal × Anteil%/100) ÷ kcal-pro-Gramm
 * - kcal/g: Protein 4 · Kohlenhydrate 4 · Fett 9
 * Der Rechner VERTEILT nur ein vorgegebenes Kalorienziel — er setzt kein Ziel und kein Defizit.
 * Neutrale, AMDR-nahe Splits; kein Keto-/Abnehm-Framing.
 */

const PRESETS: Array<{ key: string; label: string; p: number; k: number; f: number }> = [
  { key: 'ausgewogen', label: 'Ausgewogen (30/40/30)', p: 30, k: 40, f: 30 },
  { key: 'proteinbetont', label: 'Proteinbetont (35/35/30)', p: 35, k: 35, f: 30 },
  { key: 'ausdauer', label: 'Kohlenhydratbetont / Ausdauer (20/55/25)', p: 20, k: 55, f: 25 },
  { key: 'kh-reduziert', label: 'Kohlenhydratreduziert (30/25/45)', p: 30, k: 25, f: 45 },
  { key: 'custom', label: 'Eigener Split', p: 30, k: 40, f: 30 },
];

function gramm(kcal: number, anteil: number, kcalProGramm: number): number {
  return Math.round((kcal * anteil / 100) / kcalProGramm);
}

export default function MakronaehrstoffeRechner() {
  const [kcal, setKcal] = useState('2500');
  const [preset, setPreset] = useState('ausgewogen');
  const [cp, setCp] = useState('30');
  const [ck, setCk] = useState('40');
  const [cf, setCf] = useState('30');
  const [gewicht, setGewicht] = useState('75');

  const nKcal = parseDeutscheZahl(kcal);
  const nGewicht = parseDeutscheZahl(gewicht);

  const anteile = useMemo(() => {
    if (preset === 'custom') {
      return { p: parseDeutscheZahl(cp), k: parseDeutscheZahl(ck), f: parseDeutscheZahl(cf) };
    }
    const pr = PRESETS.find((x) => x.key === preset)!;
    return { p: pr.p, k: pr.k, f: pr.f };
  }, [preset, cp, ck, cf]);

  const summe = anteile.p + anteile.k + anteile.f;
  const summeOk = Math.abs(summe - 100) < 0.5;

  const ergebnis = useMemo(() => {
    if (nKcal <= 0 || !summeOk) return null;
    const proteinG = gramm(nKcal, anteile.p, 4);
    const khG = gramm(nKcal, anteile.k, 4);
    const fettG = gramm(nKcal, anteile.f, 9);
    const kontrollKcal = proteinG * 4 + khG * 4 + fettG * 9;
    const proteinProKg = nGewicht > 0 ? proteinG / nGewicht : 0;
    return { proteinG, khG, fettG, kontrollKcal, proteinProKg };
  }, [nKcal, anteile, summeOk, nGewicht]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="mk-kcal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ziel-Kalorien</label>
          <NummerEingabe value={kcal} onChange={setKcal} placeholder="2500" einheit="kcal" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aus dem Kalorienbedarf-Rechner oder selbst gewählt.</p>
        </div>
        <div>
          <label htmlFor="mk-preset" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verteilung (Protein/KH/Fett)</label>
          <select id="mk-preset" value={preset} onChange={(e) => setPreset(e.target.value)} className="input-field w-full">
            {PRESETS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
        {preset === 'custom' && (
          <div className="sm:col-span-2 grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="mk-cp" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Protein %</label>
              <NummerEingabe value={cp} onChange={setCp} placeholder="30" einheit="%" />
            </div>
            <div>
              <label htmlFor="mk-ck" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Kohlenhydrate %</label>
              <NummerEingabe value={ck} onChange={setCk} placeholder="40" einheit="%" />
            </div>
            <div>
              <label htmlFor="mk-cf" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Fett %</label>
              <NummerEingabe value={cf} onChange={setCf} placeholder="30" einheit="%" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="mk-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht (für Protein je kg)</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
      </div>

      {preset === 'custom' && !summeOk && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            Die drei Anteile müssen zusammen 100 % ergeben (aktuell {fmt0(summe)} %).
          </p>
        </div>
      )}

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Protein</p>
                <p className="text-4xl font-bold">{fmt0(ergebnis.proteinG)} g</p>
                <p className="text-white/70 text-xs mt-1">{anteile.p} % · {fmt0(ergebnis.proteinG * 4)} kcal</p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Kohlenhydrate</p>
                <p className="text-4xl font-bold">{fmt0(ergebnis.khG)} g</p>
                <p className="text-white/70 text-xs mt-1">{anteile.k} % · {fmt0(ergebnis.khG * 4)} kcal</p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Fett</p>
                <p className="text-4xl font-bold">{fmt0(ergebnis.fettG)} g</p>
                <p className="text-white/70 text-xs mt-1">{anteile.f} % · {fmt0(ergebnis.fettG * 9)} kcal</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                Kontroll-Summe {fmt0(ergebnis.kontrollKcal)} kcal
              </span>
              {ergebnis.proteinProKg > 0 && (
                <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Protein {fmt1(ergebnis.proteinProKg)} g/kg
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Orientierungswerte. Gesamtkalorien und Lebensmittelqualität zählen mehr als die exakte Aufteilung. Ersetzt keine ärztliche oder ernährungsmedizinische Beratung.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg (Beispiel Protein)</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nKcal)} × {anteile.p} % ÷ 4 kcal/g = {fmt0(ergebnis.proteinG)} g Protein
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              (Kohlenhydrate ÷ 4, Fett ÷ 9 — Atwater-Faktoren)
            </p>
          </div>

          {/* Split-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Deine Makros je Verteilung (bei {fmt0(nKcal)} kcal)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Verteilung</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Protein</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Kohlenhydrate</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Fett</th>
                  </tr>
                </thead>
                <tbody>
                  {PRESETS.filter((p) => p.key !== 'custom').map((p) => {
                    const aktiv = preset === p.key;
                    return (
                      <tr key={p.key} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{p.label.split(' (')[0]}</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(gramm(nKcal, p.p, 4))} g</td>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(gramm(nKcal, p.k, 4))} g</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(gramm(nKcal, p.f, 9))} g</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/sport/kalorienbedarf-rechner" emoji="🍽️" text="Kalorienziel berechnen — TDEE" />
          <CrossLink href="/sport/grundumsatz-rechner" emoji="🔥" text="Grundumsatz — nur der Ruheverbrauch" />

          <ErgebnisAktionen
            ergebnisText={`Makros bei ${fmt0(nKcal)} kcal (${anteile.p}/${anteile.k}/${anteile.f}): Protein ${fmt0(ergebnis.proteinG)} g, Kohlenhydrate ${fmt0(ergebnis.khG)} g, Fett ${fmt0(ergebnis.fettG)} g. Orientierungswerte.`}
            seitenTitel="Makronährstoffe-Rechner"
          />
          <AiExplain
            rechnerName="Makronährstoffe-Rechner"
            eingaben={{ zielKcal: nKcal, verteilung: `${anteile.p}/${anteile.k}/${anteile.f}`, gewichtKg: nGewicht }}
            ergebnis={{ proteinG: ergebnis.proteinG, kohlenhydrateG: ergebnis.khG, fettG: ergebnis.fettG, proteinProKg: ergebnis.proteinProKg > 0 ? Number(ergebnis.proteinProKg.toFixed(1)) : null }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie ein Kalorienziel und eine Verteilung ein, um die Makronährstoffe in Gramm zu berechnen.
        </p>
      )}
    </div>
  );
}
