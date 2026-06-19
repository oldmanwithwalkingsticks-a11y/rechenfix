'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Datenmengen-Umrechner (Technik-Kategorie).
 *
 * Inline-Logik: Umrechnung über die Basiseinheit Byte. Dezimale Einheiten
 * (KB/MB/GB/TB/PB) nutzen den Faktor 1000, binäre (KiB/MiB/GiB/TiB/PiB) den
 * Faktor 1024; Bit = 1/8 Byte. Ergebnis = Wert × Faktor(von) ÷ Faktor(zu).
 */
interface Einheit {
  key: string;
  label: string;
  faktor: number; // in Byte
}

const EINHEITEN: Einheit[] = [
  { key: 'bit', label: 'Bit', faktor: 0.125 },
  { key: 'b', label: 'Byte (B)', faktor: 1 },
  { key: 'kb', label: 'Kilobyte (KB)', faktor: 1e3 },
  { key: 'mb', label: 'Megabyte (MB)', faktor: 1e6 },
  { key: 'gb', label: 'Gigabyte (GB)', faktor: 1e9 },
  { key: 'tb', label: 'Terabyte (TB)', faktor: 1e12 },
  { key: 'pb', label: 'Petabyte (PB)', faktor: 1e15 },
  { key: 'kib', label: 'Kibibyte (KiB)', faktor: 1024 },
  { key: 'mib', label: 'Mebibyte (MiB)', faktor: 1048576 },
  { key: 'gib', label: 'Gibibyte (GiB)', faktor: 1073741824 },
  { key: 'tib', label: 'Tebibyte (TiB)', faktor: 1099511627776 },
  { key: 'pib', label: 'Pebibyte (PiB)', faktor: 1125899906842624 },
];

function findeEinheit(key: string): Einheit {
  return EINHEITEN.find((e) => e.key === key) ?? EINHEITEN[1];
}

function fmt(n: number): string {
  if (!isFinite(n)) return '–';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  if (abs >= 1) return n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  if (abs >= 0.001) return n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
  return n.toExponential(2).replace('.', ',');
}

export default function DatenmengenRechner() {
  const [wert, setWert] = useState('500');
  const [von, setVon] = useState('gb');
  const [zu, setZu] = useState('gib');

  const nWert = parseDeutscheZahl(wert);

  const ergebnis = useMemo(() => {
    if (nWert <= 0) return null;
    const vonE = findeEinheit(von);
    const zuE = findeEinheit(zu);
    const bytes = nWert * vonE.faktor;
    const ergebnisWert = bytes / zuE.faktor;
    return { vonE, zuE, bytes, ergebnisWert };
  }, [nWert, von, zu]);

  const tausche = () => {
    setVon(zu);
    setZu(von);
  };

  return (
    <div>
      {/* Eingabe */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Wert</label>
          <NummerEingabe value={wert} onChange={setWert} placeholder="500" />
        </div>
        <div className="flex-1">
          <label htmlFor="datenmenge-von" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Von</label>
          <select
            id="datenmenge-von"
            value={von}
            onChange={(e) => setVon(e.target.value)}
            className="input-field w-full"
          >
            {EINHEITEN.map((e) => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={tausche}
          className="self-center sm:self-end sm:mb-1.5 w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-500/30 transition-all shrink-0"
          title="Einheiten tauschen"
          aria-label="Einheiten tauschen"
          type="button"
        >
          ↔
        </button>

        <div className="flex-1">
          <label htmlFor="datenmenge-zu" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Zu</label>
          <select
            id="datenmenge-zu"
            value={zu}
            onChange={(e) => setZu(e.target.value)}
            className="input-field w-full"
          >
            {EINHEITEN.map((e) => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">
              {fmt(nWert)} {ergebnis.vonE.label} entsprechen
            </p>
            <p className="text-3xl sm:text-4xl font-bold break-words">
              {fmt(ergebnis.ergebnisWert)} {ergebnis.zuE.label}
            </p>
          </div>

          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm break-words">
              {fmt(nWert)} × {ergebnis.vonE.faktor.toLocaleString('de-DE')} ÷ {ergebnis.zuE.faktor.toLocaleString('de-DE')} = {fmt(ergebnis.ergebnisWert)}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Basis: {fmt(ergebnis.bytes)} Byte
            </p>
          </div>

          <CrossLink href="/technik/internetgeschwindigkeit-rechner" emoji="🌐" text="Download-Zeit & Internetgeschwindigkeit berechnen" />
          <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Andere Einheiten umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(nWert)} ${ergebnis.vonE.label} = ${fmt(ergebnis.ergebnisWert)} ${ergebnis.zuE.label}`}
            seitenTitel="Datenmengen-Umrechner"
          />
          <AiExplain
            rechnerName="Datenmengen-Umrechner"
            eingaben={{ wert: nWert, von: ergebnis.vonE.label, zu: ergebnis.zuE.label }}
            ergebnis={{ ergebnis: ergebnis.ergebnisWert, basisByte: ergebnis.bytes }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie einen Wert ein und wählen Sie Ausgangs- und Zieleinheit.
        </p>
      )}
    </div>
  );
}
