'use client';

import { useState, useMemo } from 'react';
import { berechneLaminat } from '@/lib/berechnungen/laminat';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const VERLEGEMUSTER = [
  { label: 'Gerade / Schiffsboden (10 %)', value: '10' },
  { label: 'Diagonal (15 %)', value: '15' },
  { label: 'Fischgrät (20 %)', value: '20' },
];

export default function LaminatRechner() {
  const [flaecheModus, setFlaecheModus] = useState<'masse' | 'direkt'>('masse');
  const [laengeM, setLaengeM] = useState('5');
  const [breiteM, setBreiteM] = useState('4');
  const [flaecheQm, setFlaecheQm] = useState('20');
  const [paketGroesse, setPaketGroesse] = useState('2,49');
  const [verschnitt, setVerschnitt] = useState('10');
  const [preis, setPreis] = useState('30');

  const berechneteFlaeche = useMemo(() => {
    if (flaecheModus === 'direkt') return parseDeutscheZahl(flaecheQm);
    return parseDeutscheZahl(laengeM) * parseDeutscheZahl(breiteM);
  }, [flaecheModus, laengeM, breiteM, flaecheQm]);

  const ergebnis = useMemo(() => {
    if (berechneteFlaeche <= 0) return null;
    return berechneLaminat({
      flaecheQm: berechneteFlaeche,
      paketGroesseQm: parseDeutscheZahl(paketGroesse),
      verschnittProzent: parseDeutscheZahl(verschnitt),
      preisProPaket: parseDeutscheZahl(preis),
      raumLaengeM: flaecheModus === 'masse' ? parseDeutscheZahl(laengeM) : 0,
      raumBreiteM: flaecheModus === 'masse' ? parseDeutscheZahl(breiteM) : 0,
    });
  }, [berechneteFlaeche, paketGroesse, verschnitt, preis, flaecheModus, laengeM, breiteM]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Fläche */}
        <RadioToggleGroup
          name="flaeche-modus"
          legend="Raumfläche"
          value={flaecheModus}
          onChange={v => setFlaecheModus(v as 'masse' | 'direkt')}
          options={[
            { label: 'Maße eingeben (L × B)', value: 'masse' },
            { label: 'Fläche direkt eingeben', value: 'direkt' },
          ]}
        />

        {flaecheModus === 'masse' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raumlänge</label>
              <NummerEingabe value={laengeM} onChange={setLaengeM} einheit="m" placeholder="5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raumbreite</label>
              <NummerEingabe value={breiteM} onChange={setBreiteM} einheit="m" placeholder="4" />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raumfläche</label>
            <NummerEingabe value={flaecheQm} onChange={setFlaecheQm} einheit="m²" placeholder="20" />
          </div>
        )}

        {flaecheModus === 'masse' && berechneteFlaeche > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Berechnete Fläche: <strong>{fmt1(berechneteFlaeche)} m²</strong>
          </p>
        )}

        {/* Paketgröße */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paketgröße</label>
          <NummerEingabe value={paketGroesse} onChange={setPaketGroesse} einheit="m²/Paket" placeholder="2,49" />
          <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Steht auf der Verpackung — typisch 2,0–3,0 m²</p>
        </div>

        {/* Verlegemuster */}
        <RadioToggleGroup
          name="verlegemuster"
          legend="Verlegemuster"
          value={verschnitt}
          onChange={setVerschnitt}
          options={VERLEGEMUSTER}
          columns={3}
        />

        {/* Preis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preis pro Paket (optional)</label>
          <NummerEingabe value={preis} onChange={setPreis} einheit="€" placeholder="30" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Benötigte Pakete</p>
            <p className="text-5xl font-bold">{ergebnis.pakete} <span className="text-2xl">Pakete</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Materialkosten</p>
                <p className="text-lg font-bold">{fmt(ergebnis.materialkosten)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Preis pro m²</p>
                <p className="text-lg font-bold">{fmt(ergebnis.preisProQm)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Trittschalldämmung</p>
                <p className="text-lg font-bold">{fmt1(ergebnis.trittschalldaemmungQm)} m²</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Sockelleisten</p>
                <p className="text-lg font-bold">{ergebnis.sockelleistenM > 0 ? `${fmt1(ergebnis.sockelleistenM)} m` : '–'}</p>
              </div>
            </div>
          </div>

          {/* Detail-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Einkaufsliste</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Raumfläche</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt1(berechneteFlaeche)} m²</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ Verschnitt ({fmt0(parseDeutscheZahl(verschnitt))} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt1(ergebnis.benoetigteFlaecheQm)} m²</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Laminat/Parkett</span>
                <span className="text-primary-600 dark:text-primary-400">{ergebnis.pakete} Pakete ({fmt1(ergebnis.tatsaechlicheFlaecheQm)} m²)</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Überschuss (Reserve)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt1(ergebnis.ueberschussQm)} m²</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Trittschalldämmung (+ 5 % Überlappung)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt1(ergebnis.trittschalldaemmungQm)} m²</span>
              </div>
              {ergebnis.sockelleistenM > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Sockelleisten (+ 10 % Reserve)</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt1(ergebnis.sockelleistenM)} m</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Materialkosten ({ergebnis.pakete} × {fmt(parseDeutscheZahl(preis))} €)</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.materialkosten)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Die Trittschalldämmung ist nur nötig, wenn sie nicht bereits in die Laminat-/Parkettdielen integriert ist. Sockelleisten werden nur bei Eingabe der Raummaße (L × B) berechnet. Für verwinkelte Räume addieren Sie die Teilflächen.
            </p>
          </div>

          <CrossLink href="/wohnen/fliesenbedarf-rechner" emoji="🧱" text="Fliesenbedarf berechnen" />
          <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📐" text="Quadratmeter berechnen" />
          <CrossLink href="/wohnen/malerkosten-rechner" emoji="🎨" text="Malerkosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Laminat-/Parkettbedarf: ${ergebnis.pakete} Pakete (${fmt1(ergebnis.tatsaechlicheFlaecheQm)} m²) für ${fmt1(berechneteFlaeche)} m² Raumfläche | Verschnitt: ${fmt0(parseDeutscheZahl(verschnitt))} % | Materialkosten: ${fmt(ergebnis.materialkosten)} € | Trittschalldämmung: ${fmt1(ergebnis.trittschalldaemmungQm)} m²${ergebnis.sockelleistenM > 0 ? ` | Sockelleisten: ${fmt1(ergebnis.sockelleistenM)} m` : ''}`}
            seitenTitel="Laminat-Rechner"
          />

          <AiExplain
            rechnerName="Laminat-Rechner"
            eingaben={{
              raumflaecheQm: berechneteFlaeche,
              paketGroesseQm: parseDeutscheZahl(paketGroesse),
              verschnittProzent: parseDeutscheZahl(verschnitt),
              preisProPaketEuro: parseDeutscheZahl(preis),
            }}
            ergebnis={{
              pakete: ergebnis.pakete,
              materialkostenEuro: ergebnis.materialkosten,
              trittschalldaemmungQm: ergebnis.trittschalldaemmungQm,
              sockelleistenM: ergebnis.sockelleistenM,
              preisProQmEuro: ergebnis.preisProQm,
            }}
          />
        </>
      )}
    </div>
  );
}
