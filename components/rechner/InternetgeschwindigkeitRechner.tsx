'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

/**
 * Internetgeschwindigkeit-Rechner (Technik-Kategorie, Pilot).
 *
 * Rechenlogik ist trivial und inline (keine eigene lib/berechnungen-Datei):
 * - MB/s = Mbit/s ÷ 8 (1 Byte = 8 Bit)
 * - Download-Zeit = Dateigröße (in MB) ÷ Bandbreite (in MB/s)
 * Dateigröße in GB wird dezimal umgerechnet (1 GB = 1.000 MB), passend zur
 * dezimalen Mbit/MB-Konvention der Provider.
 */
function formatZeit(sek: number): string {
  if (!isFinite(sek) || sek <= 0) return '0 s';
  if (sek < 1) return 'unter 1 s';
  if (sek < 60) return `${Math.round(sek)} s`;
  if (sek < 3600) {
    const m = Math.floor(sek / 60);
    const s = Math.round(sek % 60);
    return s > 0 ? `${m} min ${s} s` : `${m} min`;
  }
  const h = Math.floor(sek / 3600);
  const m = Math.round((sek % 3600) / 60);
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

export default function InternetgeschwindigkeitRechner() {
  const [groesse, setGroesse] = useState('5');
  const [einheit, setEinheit] = useState<'gb' | 'mb'>('gb');
  const [bandbreite, setBandbreite] = useState('50');

  const nGroesse = parseDeutscheZahl(groesse);
  const nBandbreite = parseDeutscheZahl(bandbreite);

  const ergebnis = useMemo(() => {
    if (nGroesse <= 0 || nBandbreite <= 0) return null;
    const groesseMB = einheit === 'gb' ? nGroesse * 1000 : nGroesse;
    const mbProSek = nBandbreite / 8; // Mbit/s → MB/s
    const sekunden = groesseMB / mbProSek;
    return { groesseMB, mbProSek, sekunden };
  }, [nGroesse, nBandbreite, einheit]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dateigröße
          </label>
          <NummerEingabe
            value={groesse}
            onChange={setGroesse}
            placeholder="z.B. 5"
            einheit={einheit === 'gb' ? 'GB' : 'MB'}
          />
          <div className="mt-2">
            <RadioToggleGroup
              name="ig-einheit"
              legend="Einheit der Dateigröße"
              srOnlyLegend
              options={[
                { value: 'gb', label: 'GB' },
                { value: 'mb', label: 'MB' },
              ]}
              value={einheit}
              onChange={(v) => setEinheit(v as 'gb' | 'mb')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bandbreite (Tarif)
          </label>
          <NummerEingabe
            value={bandbreite}
            onChange={setBandbreite}
            placeholder="z.B. 50"
            einheit="Mbit/s"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Der Wert, den der Provider bewirbt (z. B. „50.000" = 50 Mbit/s).
          </p>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Geschätzte Download-Zeit</p>
                <p className="text-5xl font-bold">{formatZeit(ergebnis.sekunden)}</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {fmt(nBandbreite)} Mbit/s = {fmt(ergebnis.mbProSek)} MB/s
                </span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt(nBandbreite)} Mbit/s ÷ 8 = {fmt(ergebnis.mbProSek)} MB/s
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt(ergebnis.groesseMB)} MB ÷ {fmt(ergebnis.mbProSek)} MB/s = {formatZeit(ergebnis.sekunden)}
            </p>
          </div>

          <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Datenmengen & Einheiten umrechnen" />
          <CrossLink href="/alltag/streaming-kosten-rechner" emoji="📺" text="Streaming-Kosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(nGroesse)} ${einheit === 'gb' ? 'GB' : 'MB'} bei ${fmt(nBandbreite)} Mbit/s (${fmt(ergebnis.mbProSek)} MB/s): ${formatZeit(ergebnis.sekunden)}`}
            seitenTitel="Internetgeschwindigkeit-Rechner"
          />
          <AiExplain
            rechnerName="Internetgeschwindigkeit-Rechner"
            eingaben={{ dateigroesse: nGroesse, einheit: einheit === 'gb' ? 'GB' : 'MB', bandbreiteMbits: nBandbreite }}
            ergebnis={{ mbProSekunde: ergebnis.mbProSek, downloadZeitSekunden: ergebnis.sekunden }}
          />
        </>
      )}

      {!ergebnis && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Dateigröße und Bandbreite ein, um die Download-Zeit zu berechnen.
        </p>
      )}
    </div>
  );
}
