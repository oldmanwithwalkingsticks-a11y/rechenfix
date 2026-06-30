'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * E-Auto-Ladekosten-Rechner (Technik-Kategorie). BLOCK B — YMYL (Preise).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Kosten pro 100 km = Verbrauch(kWh/100km) × Strompreis(€/kWh)
 * - Kosten Vollladung = Akku(kWh) × Strompreis(€/kWh)
 * - Jahreskosten = Kosten/100 km × (Jahres-km ÷ 100)
 * Strompreis-Richtwerte Stand April 2026 (BDEW/Bundesnetzagentur), volatil — keine Tarifgarantie.
 */

const VERBRAUCH_OPTIONEN = [
  { key: '15', label: 'Kleinwagen (15 kWh/100 km)' },
  { key: '18', label: 'Mittelklasse (18 kWh/100 km)' },
  { key: '22', label: 'SUV / groß (22 kWh/100 km)' },
  { key: 'custom', label: 'Eigener Wert' },
];
const LADEORT_OPTIONEN = [
  { key: '0.34', label: 'Wallbox / Haushalt (0,34 €/kWh)' },
  { key: '0.50', label: 'Öffentlich AC (0,50 €/kWh)' },
  { key: '0.65', label: 'DC-Schnellladen (0,65 €/kWh)' },
  { key: '0.10', label: 'PV-Eigenstrom (0,10 €/kWh)' },
  { key: 'custom', label: 'Eigener Preis' },
];

// Vergleichs-Ladeorte (Richtwerte Stand April 2026).
const VERGLEICH_ORTE: Array<{ name: string; preis: number }> = [
  { name: 'Wallbox / Haushalt', preis: 0.34 },
  { name: 'Öffentlich AC', preis: 0.50 },
  { name: 'DC-Schnellladen', preis: 0.65 },
  { name: 'PV-Eigenstrom', preis: 0.10 },
];

// Benziner-Referenz für den Vergleich.
const BENZIN_L = 7.5;
const BENZIN_PREIS = 1.75;

export default function EautoLadekostenRechner() {
  const [verbrauchProfil, setVerbrauchProfil] = useState('18');
  const [verbrauch, setVerbrauch] = useState('18');
  const [ladeort, setLadeort] = useState('0.34');
  const [strompreis, setStrompreis] = useState('0.34');
  const [akku, setAkku] = useState('60');
  const [jahresKm, setJahresKm] = useState('15000');

  const nVerbrauch = parseDeutscheZahl(verbrauch);
  const nStrompreis = parseDeutscheZahl(strompreis);
  const nAkku = parseDeutscheZahl(akku);
  const nJahresKm = parseDeutscheZahl(jahresKm);

  const handleVerbrauchProfil = (key: string) => {
    setVerbrauchProfil(key);
    if (key !== 'custom') setVerbrauch(key);
  };
  const handleLadeort = (key: string) => {
    setLadeort(key);
    if (key !== 'custom') setStrompreis(key);
  };

  const ergebnis = useMemo(() => {
    if (nVerbrauch <= 0 || nStrompreis <= 0) return null;
    const pro100 = nVerbrauch * nStrompreis;
    const vollladung = nAkku > 0 ? nAkku * nStrompreis : 0;
    const jahr = nJahresKm > 0 ? pro100 * (nJahresKm / 100) : 0;
    const benzin100 = BENZIN_L * BENZIN_PREIS;
    const ersparnis100 = benzin100 - pro100;
    return { pro100, vollladung, jahr, benzin100, ersparnis100 };
  }, [nVerbrauch, nStrompreis, nAkku, nJahresKm]);

  const eur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const eur0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="ek-vprofil" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fahrzeug-Verbrauch</label>
          <select id="ek-vprofil" value={verbrauchProfil} onChange={(e) => handleVerbrauchProfil(e.target.value)} className="input-field w-full">
            {VERBRAUCH_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ek-verbrauch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verbrauch</label>
          <NummerEingabe value={verbrauch} onChange={(v) => { setVerbrauch(v); setVerbrauchProfil('custom'); }} placeholder="18" einheit="kWh/100km" />
        </div>
        <div>
          <label htmlFor="ek-ladeort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ladeort / Strompreis</label>
          <select id="ek-ladeort" value={ladeort} onChange={(e) => handleLadeort(e.target.value)} className="input-field w-full">
            {LADEORT_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ek-strompreis" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis</label>
          <NummerEingabe value={strompreis} onChange={(v) => { setStrompreis(v); setLadeort('custom'); }} placeholder="0,34" einheit="€/kWh" />
        </div>
        <div>
          <label htmlFor="ek-akku" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akku-Kapazität</label>
          <NummerEingabe value={akku} onChange={setAkku} placeholder="60" einheit="kWh" />
        </div>
        <div>
          <label htmlFor="ek-jahreskm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahresfahrleistung</label>
          <NummerEingabe value={jahresKm} onChange={setJahresKm} placeholder="15000" einheit="km" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Ladekosten pro 100 km</p>
                <p className="text-5xl font-bold">{eur(ergebnis.pro100)} €</p>
              </div>
              <div className="sm:text-right space-y-1">
                {ergebnis.vollladung > 0 && (
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    Vollladung: {eur(ergebnis.vollladung)} €
                  </span>
                )}
                {ergebnis.jahr > 0 && <span className="block text-white/80 text-sm">Jahreskosten: {eur0(ergebnis.jahr)} €</span>}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Strompreis-Richtwerte Stand April 2026 (BDEW/Bundesnetzagentur) — tatsächliche Tarife variieren stark. Ohne Gewähr.
          </p>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {eur0(nVerbrauch)} kWh × {eur(nStrompreis)} € = {eur(ergebnis.pro100)} €/100 km
            </p>
            {ergebnis.vollladung > 0 && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {eur0(nAkku)} kWh × {eur(nStrompreis)} € = {eur(ergebnis.vollladung)} € pro Vollladung
              </p>
            )}
          </div>

          {/* Vergleich je Ladeort */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Dieselbe Fahrt je Ladeort (pro 100 km)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Ladeort</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Strompreis</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Kosten / 100 km</th>
                  </tr>
                </thead>
                <tbody>
                  {VERGLEICH_ORTE.map((o) => {
                    const kosten = nVerbrauch * o.preis;
                    const aktiv = Math.abs(o.preis - nStrompreis) < 0.001;
                    return (
                      <tr key={o.name} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{o.name}</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{eur(o.preis)} €/kWh</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{eur(kosten)} €</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-gray-300 dark:border-gray-500">
                    <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">Benziner (Vergleich)</td>
                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">7,5 l × 1,75 €</td>
                    <td className="py-2.5 text-gray-800 dark:text-gray-200">{eur(ergebnis.benzin100)} €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {ergebnis.ersparnis100 > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Ersparnis gegenüber dem Benziner mit Ihrem Ladeort: {eur(ergebnis.ersparnis100)} € pro 100 km.
              </p>
            )}
          </div>

          <CrossLink href="/technik/eauto-ladezeit-rechner" emoji="⚡" text="Wie lange dauert die Ladung?" />
          <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Verbrenner-Spritkosten vergleichen" />

          <ErgebnisAktionen
            ergebnisText={`E-Auto laden: ${eur(ergebnis.pro100)} €/100 km am gewählten Ladeort (Richtwert) — Vollladung ${eur(ergebnis.vollladung)} €`}
            seitenTitel="E-Auto-Ladekosten-Rechner"
          />
          <AiExplain
            rechnerName="E-Auto-Ladekosten-Rechner"
            eingaben={{ verbrauchKWh100km: nVerbrauch, strompreisEurKWh: nStrompreis, akkuKWh: nAkku, jahresKm: nJahresKm }}
            ergebnis={{ proHundertKm: Number(ergebnis.pro100.toFixed(2)), vollladung: Number(ergebnis.vollladung.toFixed(2)), jahreskosten: Math.round(ergebnis.jahr) }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Verbrauch und Strompreis ein, um die Ladekosten zu berechnen.
        </p>
      )}
    </div>
  );
}
