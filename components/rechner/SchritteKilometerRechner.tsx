'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Schritte-in-Kilometer-Rechner (Sport-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), Jensen 1994 / ACSM:
 * - Schrittlänge (cm) = Körpergröße × Faktor (Gehen ♂ 0,415 / ♀ 0,413 · Joggen 0,50 · Laufen 0,60)
 * - Distanz (km) = Schritte × Schrittlänge ÷ 100.000
 * - Kalorien (grob) = MET × Gewicht × Zeit; Zeit = Distanz ÷ Tempo (MET/Tempo je Aktivität).
 * Kalorien sind grobe Schätzwerte, kein Abnehm- oder Defizit-Bezug.
 */

const SCHRITT_STUFEN = [2000, 5000, 7500, 10000, 15000];

const AKTIVITAET: Record<string, { faktorM: number; faktorF: number; met: number; tempo: number; label: string }> = {
  gehen: { faktorM: 0.415, faktorF: 0.413, met: 3.5, tempo: 5, label: 'Gehen' },
  joggen: { faktorM: 0.50, faktorF: 0.50, met: 7.0, tempo: 8, label: 'Joggen' },
  laufen: { faktorM: 0.60, faktorF: 0.60, met: 9.8, tempo: 10, label: 'Laufen' },
};

export default function SchritteKilometerRechner() {
  const [modus, setModus] = useState<'s2k' | 'k2s'>('s2k');
  const [schritte, setSchritte] = useState('10000');
  const [km, setKm] = useState('5');
  const [groesse, setGroesse] = useState('175');
  const [geschlecht, setGeschlecht] = useState<'m' | 'f'>('m');
  const [aktivitaet, setAktivitaet] = useState('gehen');
  const [eigeneSL, setEigeneSL] = useState('');
  const [gewicht, setGewicht] = useState('75');

  const nSchritte = parseDeutscheZahl(schritte);
  const nKm = parseDeutscheZahl(km);
  const nGroesse = parseDeutscheZahl(groesse);
  const nEigeneSL = parseDeutscheZahl(eigeneSL);
  const nGewicht = parseDeutscheZahl(gewicht);

  const ergebnis = useMemo(() => {
    const akt = AKTIVITAET[aktivitaet];
    const faktor = geschlecht === 'm' ? akt.faktorM : akt.faktorF;
    const slaenge = nEigeneSL > 0 ? nEigeneSL : nGroesse * faktor; // cm
    if (slaenge <= 0) return null;

    let distanzKm: number;
    let schrittzahl: number;
    if (modus === 's2k') {
      if (nSchritte <= 0) return null;
      schrittzahl = nSchritte;
      distanzKm = (nSchritte * slaenge) / 100000;
    } else {
      if (nKm <= 0) return null;
      distanzKm = nKm;
      schrittzahl = Math.round((nKm * 100000) / slaenge);
    }

    const kcal = nGewicht > 0 ? akt.met * nGewicht * (distanzKm / akt.tempo) : 0;
    return { slaenge, distanzKm, schrittzahl, kcal };
  }, [modus, nSchritte, nKm, nGroesse, geschlecht, aktivitaet, nEigeneSL, nGewicht]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Modus */}
      <div className="mb-4">
        <label htmlFor="sk-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was berechnen?</label>
        <select id="sk-modus" value={modus} onChange={(e) => setModus(e.target.value as 's2k' | 'k2s')} className="input-field w-full">
          <option value="s2k">Schritte → Kilometer</option>
          <option value="k2s">Kilometer → Schritte</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {modus === 's2k' ? (
          <div>
            <label htmlFor="sk-schritte" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schritte</label>
            <NummerEingabe value={schritte} onChange={setSchritte} placeholder="10000" einheit="Schritte" />
          </div>
        ) : (
          <div>
            <label htmlFor="sk-km" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distanz</label>
            <NummerEingabe value={km} onChange={setKm} placeholder="5" einheit="km" />
          </div>
        )}
        <div>
          <label htmlFor="sk-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="175" einheit="cm" />
        </div>
        <div>
          <label htmlFor="sk-geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht (Gehschritt)</label>
          <select id="sk-geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'm' | 'f')} className="input-field w-full">
            <option value="m">männlich</option>
            <option value="f">weiblich</option>
          </select>
        </div>
        <div>
          <label htmlFor="sk-aktivitaet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivität</label>
          <select id="sk-aktivitaet" value={aktivitaet} onChange={(e) => setAktivitaet(e.target.value)} className="input-field w-full">
            <option value="gehen">Gehen</option>
            <option value="joggen">Joggen</option>
            <option value="laufen">Laufen</option>
          </select>
        </div>
        <div>
          <label htmlFor="sk-eigene" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigene Schrittlänge (optional)</label>
          <NummerEingabe value={eigeneSL} onChange={setEigeneSL} placeholder="z. B. 74" einheit="cm" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Überschreibt die Schätzung aus der Körpergröße.</p>
        </div>
        <div>
          <label htmlFor="sk-gewicht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht (für Kalorien)</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">{modus === 's2k' ? 'Zurückgelegte Distanz' : 'Benötigte Schritte'}</p>
                <p className="text-5xl font-bold">
                  {modus === 's2k' ? `${fmt2(ergebnis.distanzKm)} km` : `${fmt0(ergebnis.schrittzahl)}`}
                </p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Schrittlänge {fmt1(ergebnis.slaenge)} cm
                </span>
                {ergebnis.kcal > 0 && <span className="block text-white/80 text-sm">grob ~{fmt0(ergebnis.kcal)} kcal ({AKTIVITAET[aktivitaet].label})</span>}
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            {modus === 's2k' ? (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(nSchritte)} × {fmt1(ergebnis.slaenge)} ÷ 100.000 = {fmt2(ergebnis.distanzKm)} km
              </p>
            ) : (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt1(nKm)} × 100.000 ÷ {fmt1(ergebnis.slaenge)} = {fmt0(ergebnis.schrittzahl)} Schritte
              </p>
            )}
            {nEigeneSL <= 0 && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                Schrittlänge = {fmt0(nGroesse)} cm × {(geschlecht === 'm' ? AKTIVITAET[aktivitaet].faktorM : AKTIVITAET[aktivitaet].faktorF).toLocaleString('de-DE')} = {fmt1(ergebnis.slaenge)} cm
              </p>
            )}
          </div>

          {/* Schritte-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Schritte in Kilometer bei deiner Schrittlänge</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Schritte</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Distanz</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHRITT_STUFEN.map((st) => {
                    const d = (st * ergebnis.slaenge) / 100000;
                    const aktiv = modus === 's2k' && Math.round(nSchritte) === st;
                    return (
                      <tr key={st} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmt0(st)} Schritte</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200 tabular-nums">{fmt2(d)} km</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bezogen auf {fmt1(ergebnis.slaenge)} cm Schrittlänge ({AKTIVITAET[aktivitaet].label}). Schätzung, real ±8–15 %.
            </p>
          </div>

          <CrossLink href="/gesundheit/schritte-rechner" emoji="🚶" text="Schritte-Rechner mit Tagesziel" />
          <CrossLink href="/sport/kalorienverbrauch-rechner" emoji="🔥" text="Kalorienverbrauch genauer berechnen" />
          <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Pace & Distanz umrechnen" />

          <ErgebnisAktionen
            ergebnisText={modus === 's2k'
              ? `${fmt0(nSchritte)} Schritte (${AKTIVITAET[aktivitaet].label}, ${fmt1(ergebnis.slaenge)} cm Schrittlänge) = ${fmt2(ergebnis.distanzKm)} km, grob ~${fmt0(ergebnis.kcal)} kcal`
              : `${fmt1(nKm)} km (${AKTIVITAET[aktivitaet].label}, ${fmt1(ergebnis.slaenge)} cm Schrittlänge) = ${fmt0(ergebnis.schrittzahl)} Schritte`}
            seitenTitel="Schritte-in-Kilometer-Rechner"
          />
          <AiExplain
            rechnerName="Schritte-in-Kilometer-Rechner"
            eingaben={{ modus: modus === 's2k' ? 'Schritte → km' : 'km → Schritte', schritte: modus === 's2k' ? nSchritte : null, km: modus === 'k2s' ? nKm : null, groesseCm: nGroesse, aktivitaet: AKTIVITAET[aktivitaet].label }}
            ergebnis={{ schrittlaengeCm: Number(ergebnis.slaenge.toFixed(1)), distanzKm: Number(ergebnis.distanzKm.toFixed(2)), schritte: ergebnis.schrittzahl, kcalGrob: Math.round(ergebnis.kcal) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Ihre Werte ein, um Schritte und Distanz umzurechnen.
        </p>
      )}
    </div>
  );
}
