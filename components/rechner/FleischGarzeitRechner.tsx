'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Fleischart = 'rind' | 'schwein' | 'lamm' | 'haehnchen' | 'pute' | 'roastbeef';
type Garstufe = 'rare' | 'medium_rare' | 'medium' | 'well_done';

const ART_LABEL: Record<Fleischart, string> = {
  rind:       'Rinderbraten (medium)',
  schwein:    'Schweinebraten',
  lamm:       'Lammbraten',
  haehnchen:  'Hähnchen (ganz)',
  pute:       'Pute (ganz)',
  roastbeef:  'Roastbeef (medium rare)',
};

const MIN_PRO_KG: Record<Fleischart, number> = {
  rind:       45,
  schwein:    55,
  lamm:       45,
  haehnchen:  45,
  pute:       40,
  roastbeef:  35,
};

const BASISZEIT = 20;

const ARTEN_REIHENFOLGE: Fleischart[] = ['rind', 'schwein', 'lamm', 'haehnchen', 'pute', 'roastbeef'];

// Garstufen Rind/Roastbeef → Kerntemperatur (°C)
const GARSTUFE_TEMP: Record<Garstufe, number> = {
  rare:        52,
  medium_rare: 57,
  medium:      63,
  well_done:   71,
};
const GARSTUFE_LABEL: Record<Garstufe, string> = {
  rare:        'Rare (52 °C)',
  medium_rare: 'Medium rare (57 °C)',
  medium:      'Medium (63 °C)',
  well_done:   'Durch / Well done (71 °C)',
};

// Sichere Mindest-Kerntemperatur (USDA/FSIS) je Art
const SICHER_TEMP: Record<Fleischart, number> = {
  rind:       63,
  schwein:    63,
  lamm:       63,
  haehnchen:  74,
  pute:       74,
  roastbeef:  63,
};

const hatGarstufe = (a: Fleischart): boolean => a === 'rind' || a === 'roastbeef';
const istGefluegel = (a: Fleischart): boolean => a === 'haehnchen' || a === 'pute';

function garzeitMin(kg: number, art: Fleischart): number {
  return Math.round(kg * MIN_PRO_KG[art] + BASISZEIT);
}
function hm(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export default function FleischGarzeitRechner() {
  const [art, setArt] = useState<Fleischart>('rind');
  const [gewicht, setGewicht] = useState('1.5');
  const [garstufe, setGarstufe] = useState<Garstufe>('medium');

  const ergebnis = useMemo(() => {
    const kg = parseDeutscheZahl(gewicht);
    if (kg <= 0) return null;
    const min = garzeitMin(kg, art);
    // Ziel-Kerntemperatur
    const zielTemp = hatGarstufe(art) ? GARSTUFE_TEMP[garstufe] : SICHER_TEMP[art];
    return { kg, min, zielTemp };
  }, [gewicht, art, garstufe]);

  const kg = ergebnis?.kg ?? 0;

  return (
    <div>
      {/* === 1: Fleischart === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Fleischart
        </h2>
        <label htmlFor="fleisch-art" className="sr-only">Fleischart</label>
        <select
          id="fleisch-art"
          value={art}
          onChange={e => setArt(e.target.value as Fleischart)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {ARTEN_REIHENFOLGE.map(a => (
            <option key={a} value={a}>{ART_LABEL[a]}</option>
          ))}
        </select>
      </div>

      {/* === 2: Gewicht === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Gewicht (kg)
        </h2>
        <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="1.5" einheit="kg" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Richtwert für den Ofen bei rund 160–180 °C. Die Fleischdicke zählt für die Zeit mehr als das reine Gewicht.
        </p>
      </div>

      {/* === 3: Garstufe (nur Rind/Roastbeef) === */}
      {hatGarstufe(art) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Garstufe (Ziel-Kerntemperatur)
          </h2>
          <label htmlFor="fleisch-garstufe" className="sr-only">Garstufe</label>
          <select
            id="fleisch-garstufe"
            value={garstufe}
            onChange={e => setGarstufe(e.target.value as Garstufe)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          >
            <option value="rare">{GARSTUFE_LABEL.rare}</option>
            <option value="medium_rare">{GARSTUFE_LABEL.medium_rare}</option>
            <option value="medium">{GARSTUFE_LABEL.medium}</option>
            <option value="well_done">{GARSTUFE_LABEL.well_done}</option>
          </select>
        </div>
      )}

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Garzeit (Richtwert)</p>
                <p className="text-4xl font-bold">{hm(ergebnis.min)}</p>
                <p className="text-white/60 text-xs mt-1">Ofen ~160–180 °C</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Ziel-Kerntemperatur</p>
                <p className="text-4xl font-bold">{ergebnis.zielTemp} °C</p>
                <p className="text-white/60 text-xs mt-1">
                  {istGefluegel(art) ? 'sichere Mindesttemperatur' : hatGarstufe(art) ? GARSTUFE_LABEL[garstufe].split(' (')[0] : 'sichere Mindesttemperatur'}
                </p>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg:</strong>{' '}
              {kg.toLocaleString('de-DE')} kg × {MIN_PRO_KG[art]} min + {BASISZEIT} min Basiszeit = {ergebnis.min} min
            </p>
          </div>

          {/* PFLICHT: Sicherheits-Zeile */}
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
            <p className="text-red-800 dark:text-red-300 text-sm">
              <strong>⚠️ Die Zeit ist nur ein Richtwert — entscheidend ist die Kerntemperatur.</strong>{' '}
              Geflügel muss sicher <strong>74 °C</strong> und Hackfleisch <strong>72 °C</strong> erreichen, sonst besteht
              ein Risiko durch Salmonellen und andere Keime. Farbe oder Zeit allein sind unzuverlässig. Ein
              Fleischthermometer in der dicksten Stelle (nicht am Knochen) ist die zuverlässigste Methode.
            </p>
          </div>

          {/* Tabelle: Garzeit nach Gewicht für die gewählte Art */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Garzeit nach Gewicht — {ART_LABEL[art]}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Gewicht</th>
                    <th className="px-4 py-2 text-right font-semibold">Garzeit (Richtwert)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[1, 1.5, 2, 2.5, 3].map(w => {
                    const aktiv = Math.abs(w - kg) < 0.001;
                    return (
                      <tr key={w} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {w.toLocaleString('de-DE')} kg
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}`}>
                          {hm(garzeitMin(w, art))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
              Richtwerte bei 160–180 °C Ober-/Unterhitze. Immer bis zum Erreichen der Ziel-Kerntemperatur garen.
            </p>
          </div>

          {/* Kerntemperatur-Übersicht */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Sichere Kerntemperaturen (USDA/FSIS)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Lebensmittel</th>
                    <th className="px-4 py-2 text-right font-semibold">Kerntemperatur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Geflügel (Hähnchen, Pute)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-red-600 dark:text-red-400">74 °C</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Hackfleisch / Faschiertes</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-red-600 dark:text-red-400">72 °C</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Schwein / Rind / Lamm (ganze Stücke)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">63 °C + Ruhezeit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Fisch</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">63 °C</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">Rind — rare / medium / durch</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">52 / 63 / 71 °C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/kochen/backzeit-rechner" emoji="⏱️" text="Backzeiten umrechnen" />
          <CrossLink href="/kochen/kochzeit-rechner" emoji="🍲" text="Kochzeiten für Lebensmittel" />

          <ErgebnisAktionen
            ergebnisText={`Fleisch-Garzeit-Rechner: ${ART_LABEL[art]}, ${kg.toLocaleString('de-DE')} kg → Garzeit ca. ${hm(ergebnis.min)} (Richtwert), Ziel-Kerntemperatur ${ergebnis.zielTemp} °C. Kerntemperatur ist maßgeblich, nicht die Zeit.`}
            seitenTitel="Fleisch-Garzeit-Rechner"
          />

          <AiExplain
            rechnerName="Fleisch-Garzeit-Rechner"
            eingaben={{
              fleischart: ART_LABEL[art],
              gewicht: `${kg.toLocaleString('de-DE')} kg`,
              garstufe: hatGarstufe(art) ? GARSTUFE_LABEL[garstufe] : '—',
            }}
            ergebnis={{
              garzeitRichtwert: hm(ergebnis.min),
              zielKerntemperatur: `${ergebnis.zielTemp} °C`,
              sichereMindesttemperatur: `${SICHER_TEMP[art]} °C`,
              hinweis: 'Die Kerntemperatur ist maßgeblich, die Zeit nur ein Richtwert.',
            }}
          />
        </>
      )}
    </div>
  );
}
