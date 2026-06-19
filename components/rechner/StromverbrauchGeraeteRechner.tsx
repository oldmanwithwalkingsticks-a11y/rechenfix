'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Stromverbrauch-Rechner für einzelne Geräte (Technik-Kategorie).
 *
 * Inline-Logik:
 * - kWh pro Jahr = (Watt × Stunden/Tag × 365) ÷ 1.000
 * - Kosten = kWh × Strompreis (€/kWh, als Eingabe; Default 0,35)
 * Geräte-Vorlagen setzen nur die typische Leistung; Nutzungsdauer bleibt Eingabe.
 */
const GERAETE: { key: string; label: string; watt: number }[] = [
  { key: 'custom', label: 'Eigene Eingabe', watt: 0 },
  { key: 'kuehl', label: 'Kühl-Gefrier-Kombi (Takt)', watt: 100 },
  { key: 'tv', label: 'Fernseher (LED)', watt: 90 },
  { key: 'pc', label: 'Desktop-PC', watt: 150 },
  { key: 'gamingpc', label: 'Gaming-PC (unter Last)', watt: 300 },
  { key: 'laptop', label: 'Laptop', watt: 50 },
  { key: 'router', label: 'WLAN-Router', watt: 10 },
  { key: 'waschen', label: 'Waschmaschine (Heizphase)', watt: 2000 },
  { key: 'trockner', label: 'Wäschetrockner', watt: 2500 },
  { key: 'wasserkocher', label: 'Wasserkocher', watt: 2000 },
  { key: 'led', label: 'LED-Lampe', watt: 10 },
];

export default function StromverbrauchGeraeteRechner() {
  const [watt, setWatt] = useState('200');
  const [stunden, setStunden] = useState('5');
  const [preis, setPreis] = useState('0,35');
  const [geraet, setGeraet] = useState('custom');

  const nWatt = parseDeutscheZahl(watt);
  const nStunden = parseDeutscheZahl(stunden);
  const nPreis = parseDeutscheZahl(preis);

  const ergebnis = useMemo(() => {
    if (nWatt <= 0 || nStunden <= 0) return null;
    const kwhTag = (nWatt * nStunden) / 1000;
    const kwhJahr = kwhTag * 365;
    const kostenJahr = kwhJahr * nPreis;
    const kostenMonat = kostenJahr / 12;
    return { kwhTag, kwhJahr, kostenJahr, kostenMonat };
  }, [nWatt, nStunden, nPreis]);

  const onGeraet = (key: string) => {
    setGeraet(key);
    const g = GERAETE.find((x) => x.key === key);
    if (g && g.watt > 0) setWatt(String(g.watt));
  };

  const eur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const kwh = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: n < 10 ? 2 : 0 });

  return (
    <div>
      {/* Geräte-Vorlage */}
      <div className="mb-4 max-w-md">
        <label htmlFor="strom-geraet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gerät (Vorlage, optional)</label>
        <select
          id="strom-geraet"
          value={geraet}
          onChange={(e) => onGeraet(e.target.value)}
          className="input-field w-full"
        >
          {GERAETE.map((g) => (
            <option key={g.key} value={g.key}>{g.label}{g.watt > 0 ? ` (${g.watt} W)` : ''}</option>
          ))}
        </select>
      </div>

      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leistung</label>
          <NummerEingabe value={watt} onChange={(v) => { setWatt(v); setGeraet('custom'); }} placeholder="200" einheit="W" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nutzung</label>
          <NummerEingabe value={stunden} onChange={setStunden} placeholder="5" einheit="h/Tag" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis</label>
          <NummerEingabe value={preis} onChange={setPreis} placeholder="0,35" einheit="€/kWh" />
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Stromkosten pro Jahr</p>
                <p className="text-5xl font-bold">{eur(ergebnis.kostenJahr)} €</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {kwh(ergebnis.kwhJahr)} kWh/Jahr
                </span>
                <span className="block text-white/80 text-sm">≈ {eur(ergebnis.kostenMonat)} € pro Monat</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {kwh(nWatt)} W × {kwh(nStunden)} h ÷ 1.000 = {kwh(ergebnis.kwhTag)} kWh/Tag
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {kwh(ergebnis.kwhTag)} kWh × 365 × {eur(nPreis)} € = {eur(ergebnis.kostenJahr)} €/Jahr
            </p>
          </div>

          <CrossLink href="/wohnen/stromkosten-rechner" emoji="🏠" text="Gesamten Haushalts-Stromverbrauch berechnen" />
          <CrossLink href="/technik/datenmengen-umrechner" emoji="💾" text="Weitere Technik-Rechner" />

          <ErgebnisAktionen
            ergebnisText={`${kwh(nWatt)} W bei ${kwh(nStunden)} h/Tag: ${kwh(ergebnis.kwhJahr)} kWh/Jahr ≈ ${eur(ergebnis.kostenJahr)} €/Jahr`}
            seitenTitel="Stromverbrauch-Rechner für Geräte"
          />
          <AiExplain
            rechnerName="Stromverbrauch-Rechner für Geräte"
            eingaben={{ leistungWatt: nWatt, stundenProTag: nStunden, strompreis: nPreis }}
            ergebnis={{ kwhProJahr: ergebnis.kwhJahr, kostenProJahr: ergebnis.kostenJahr, kostenProMonat: ergebnis.kostenMonat }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Leistung und Nutzungsdauer ein, um Verbrauch und Kosten zu berechnen.
        </p>
      )}
    </div>
  );
}
