'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * E-Auto-Ladezeit-Rechner (Technik-Kategorie). BLOCK B — moderates YMYL.
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei), quellenbasiert (ADAC, Mennekes, Stand 2026):
 * - Energie (kWh) = Akku × (Ziel-SoC − Start-SoC) ÷ 100
 * - AC: eff. Leistung = min(Wallbox, Onboard-Charger); Ladezeit = Energie ÷ eff × 1,10 (≈ 10 % Verlust)
 * - DC: Peak = min(Säule, Fahrzeug-DC-Limit); eff = Peak × 0,75 (Ladekurven-Schnitt 10→80);
 *       Ladezeit = Energie ÷ eff × 1,07 (≈ 7 % Verlust)
 * Alle Werte sind Richtwerte ±10–30 % (Temperatur, BMS, Batteriealter, Vorkonditionierung).
 */

const AC_VERLUST = 1.10;
const DC_VERLUST = 1.07;
const DC_KURVEN_FAKTOR = 0.75;

const WALLBOX_OPTIONEN = [
  { key: '2.3', label: 'Schuko 2,3 kW (Notlösung)' },
  { key: '3.7', label: '3,7 kW' },
  { key: '11', label: '11 kW (Standard-Wallbox)' },
  { key: '22', label: '22 kW' },
];
const OBC_OPTIONEN = [
  { key: '3.7', label: '3,7 kW' },
  { key: '7.4', label: '7,4 kW' },
  { key: '11', label: '11 kW' },
  { key: '22', label: '22 kW' },
];
const SAEULE_OPTIONEN = [
  { key: '50', label: '50 kW (HPC klein)' },
  { key: '150', label: '150 kW' },
  { key: '300', label: '300 kW (Ultraschnell)' },
];

function formatZeit(stunden: number): string {
  if (!isFinite(stunden) || stunden <= 0) return '0 min';
  const totalMin = Math.round(stunden * 60);
  if (totalMin < 60) return `${totalMin} min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin - h * 60;
  return `${h} h ${String(m).padStart(2, '0')} min`;
}

export default function EautoLadezeitRechner() {
  const [akku, setAkku] = useState('60');
  const [startSoc, setStartSoc] = useState('10');
  const [zielSoc, setZielSoc] = useState('80');
  const [modus, setModus] = useState<'AC' | 'DC'>('AC');
  const [wallbox, setWallbox] = useState('11');
  const [obc, setObc] = useState('11');
  const [saeule, setSaeule] = useState('150');
  const [dcLimit, setDcLimit] = useState('150');

  const nAkku = parseDeutscheZahl(akku);
  const nStart = parseDeutscheZahl(startSoc);
  const nZiel = parseDeutscheZahl(zielSoc);
  const nWallbox = parseFloat(wallbox);
  const nObc = parseFloat(obc);
  const nSaeule = parseFloat(saeule);
  const nDcLimit = parseDeutscheZahl(dcLimit);

  const ergebnis = useMemo(() => {
    if (nAkku <= 0 || nZiel <= nStart) return null;
    const energie = (nAkku * (nZiel - nStart)) / 100;
    if (modus === 'AC') {
      const eff = Math.min(nWallbox, nObc);
      if (eff <= 0) return null;
      const ladezeit = (energie / eff) * AC_VERLUST;
      const engpass = nWallbox > nObc;
      return { energie, eff, ladezeit, engpass, peak: null as number | null };
    }
    const peak = Math.min(nSaeule, nDcLimit);
    if (peak <= 0) return null;
    const eff = peak * DC_KURVEN_FAKTOR;
    const ladezeit = (energie / eff) * DC_VERLUST;
    const engpass = nDcLimit < nSaeule;
    return { energie, eff, ladezeit, engpass, peak };
  }, [nAkku, nStart, nZiel, modus, nWallbox, nObc, nSaeule, nDcLimit]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

  return (
    <div>
      {/* Akku & SoC */}
      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <div>
          <label htmlFor="ev-akku" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akku-Kapazität</label>
          <NummerEingabe value={akku} onChange={setAkku} placeholder="60" einheit="kWh" />
        </div>
        <div>
          <label htmlFor="ev-start" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start-Ladestand</label>
          <NummerEingabe value={startSoc} onChange={setStartSoc} placeholder="10" einheit="%" />
        </div>
        <div>
          <label htmlFor="ev-ziel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ziel-Ladestand</label>
          <NummerEingabe value={zielSoc} onChange={setZielSoc} placeholder="80" einheit="%" />
        </div>
      </div>

      {/* Lade-Modus */}
      <div className="mb-4">
        <label htmlFor="ev-modus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lade-Modus</label>
        <select id="ev-modus" value={modus} onChange={(e) => setModus(e.target.value as 'AC' | 'DC')} className="input-field w-full">
          <option value="AC">AC-Wallbox (Wechselstrom)</option>
          <option value="DC">DC-Schnelllader (Gleichstrom)</option>
        </select>
      </div>

      {modus === 'AC' ? (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="ev-wallbox" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wallbox-Leistung</label>
            <select id="ev-wallbox" value={wallbox} onChange={(e) => setWallbox(e.target.value)} className="input-field w-full">
              {WALLBOX_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ev-obc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Onboard-Charger (Auto)</label>
            <select id="ev-obc" value={obc} onChange={(e) => setObc(e.target.value)} className="input-field w-full">
              {OBC_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Die meisten E-Autos laden AC mit max. 11 kW; 22 kW nur z. B. Renault Zoe/Megane, smart #1, Polestar 2 LR.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label htmlFor="ev-saeule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Säulen-Leistung</label>
            <select id="ev-saeule" value={saeule} onChange={(e) => setSaeule(e.target.value)} className="input-field w-full">
              {SAEULE_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ev-dclimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fahrzeug-DC-Limit</label>
            <NummerEingabe value={dcLimit} onChange={setDcLimit} placeholder="150" einheit="kW" />
          </div>
        </div>
      )}

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Ladezeit ({fmt0(nStart)} → {fmt0(nZiel)} %)</p>
                <p className="text-5xl font-bold">{formatZeit(ergebnis.ladezeit)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt1(ergebnis.energie)} kWh @ {fmt1(ergebnis.eff)} kW
                </span>
                {ergebnis.engpass && (
                  <span className="block text-white/90 text-sm font-medium">
                    {modus === 'AC'
                      ? `Engpass: Onboard-Charger begrenzt auf ${fmt1(nObc)} kW`
                      : `Engpass: Fahrzeug-DC-Limit ${fmt0(nDcLimit)} kW`}
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Richtwert inkl. typischer Ladeverluste — real ±10–30 % je nach Temperatur, Batteriezustand und Ladekurve. Stand 2026.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              Energie = {fmt0(nAkku)} × {fmt0(nZiel - nStart)} ÷ 100 = {fmt1(ergebnis.energie)} kWh
            </p>
            {modus === 'AC' ? (
              <>
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                  eff. Leistung = min({fmt1(nWallbox)}, {fmt1(nObc)}) = {fmt1(ergebnis.eff)} kW
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                  {fmt1(ergebnis.energie)} ÷ {fmt1(ergebnis.eff)} × 1,10 = {formatZeit(ergebnis.ladezeit)}
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                  Peak = min({fmt0(nSaeule)}, {fmt0(nDcLimit)}) = {fmt0(ergebnis.peak ?? 0)} kW → ⌀ × 0,75 = {fmt1(ergebnis.eff)} kW
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                  {fmt1(ergebnis.energie)} ÷ {fmt1(ergebnis.eff)} × 1,07 = {formatZeit(ergebnis.ladezeit)}
                </p>
              </>
            )}
          </div>

          {/* AC-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Ladezeit je Akkugröße (AC 11 kW, 10 → 80 %)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Akku</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Energie (10→80 %)</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Ladezeit (Richtwert)</th>
                  </tr>
                </thead>
                <tbody>
                  {[40, 60, 77, 100].map((k) => {
                    const e = (k * 70) / 100;
                    const h = (e / 11) * AC_VERLUST;
                    const aktiv = Math.round(nAkku) === k;
                    return (
                      <tr key={k} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{k} kWh</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{fmt1(e)} kWh</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{formatZeit(h)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Verbrenner-Kosten vergleichen" />
          <CrossLink href="/technik/stromverbrauch-geraete-rechner" emoji="⚡" text="Stromverbrauch & -kosten von Geräten" />

          <ErgebnisAktionen
            ergebnisText={`E-Auto ${fmt0(nAkku)} kWh von ${fmt0(nStart)} auf ${fmt0(nZiel)} % laden: ca. ${formatZeit(ergebnis.ladezeit)} (Richtwert, ${modus})`}
            seitenTitel="E-Auto-Ladezeit-Rechner"
          />
          <AiExplain
            rechnerName="E-Auto-Ladezeit-Rechner"
            eingaben={{ akkuKWh: nAkku, startSoc: nStart, zielSoc: nZiel, modus, effektiveLeistungKW: Number(ergebnis.eff.toFixed(1)) }}
            ergebnis={{ ladezeitStunden: Number(ergebnis.ladezeit.toFixed(2)), energieKWh: Number(ergebnis.energie.toFixed(1)) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Bitte Ziel-Ladestand über den Start setzen, um die Ladezeit zu berechnen.
        </p>
      )}
    </div>
  );
}
