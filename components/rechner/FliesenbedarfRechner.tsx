'use client';

import { useState, useMemo } from 'react';
import { berechneFliesenbedarf } from '@/lib/berechnungen/fliesenbedarf';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const FLIESEN_GROESSEN = [
  { label: '30 × 30 cm', laenge: 30, breite: 30 },
  { label: '30 × 60 cm', laenge: 30, breite: 60 },
  { label: '60 × 60 cm', laenge: 60, breite: 60 },
  { label: '20 × 25 cm (Wand)', laenge: 20, breite: 25 },
  { label: 'Eigene Größe', laenge: 0, breite: 0 },
];

const VERLEGEMUSTER = [
  { label: 'Gerade (5 %)', value: '5' },
  { label: 'Drittelverband (10 %)', value: '10' },
  { label: 'Diagonal (15 %)', value: '15' },
];

export default function FliesenbedarfRechner() {
  const [flaecheModus, setFlaecheModus] = useState<'masse' | 'direkt'>('masse');
  const [laengeM, setLaengeM] = useState('3');
  const [breiteM, setBreiteM] = useState('2,5');
  const [flaecheQm, setFlaecheQm] = useState('7,5');

  const [fliesenGroesseIndex, setFliesenGroesseIndex] = useState(1); // 30×60 default
  const [eigeneLaenge, setEigeneLaenge] = useState('30');
  const [eigeneBreite, setEigeneBreite] = useState('60');

  const [verschnitt, setVerschnitt] = useState('5');
  const [fliesenpreis, setFliesenpreis] = useState('25');

  const berechneteFlaeche = useMemo(() => {
    if (flaecheModus === 'direkt') return parseDeutscheZahl(flaecheQm);
    return parseDeutscheZahl(laengeM) * parseDeutscheZahl(breiteM);
  }, [flaecheModus, laengeM, breiteM, flaecheQm]);

  const flieseMasse = useMemo(() => {
    const g = FLIESEN_GROESSEN[fliesenGroesseIndex];
    if (g.laenge === 0) return { laenge: parseDeutscheZahl(eigeneLaenge), breite: parseDeutscheZahl(eigeneBreite) };
    return { laenge: g.laenge, breite: g.breite };
  }, [fliesenGroesseIndex, eigeneLaenge, eigeneBreite]);

  const ergebnis = useMemo(() => {
    if (berechneteFlaeche <= 0) return null;
    return berechneFliesenbedarf({
      flaecheQm: berechneteFlaeche,
      flieseLaengeCm: flieseMasse.laenge,
      flieseBreiteCm: flieseMasse.breite,
      verschnittProzent: parseDeutscheZahl(verschnitt),
      fliesenpreisProQm: parseDeutscheZahl(fliesenpreis),
    });
  }, [berechneteFlaeche, flieseMasse, verschnitt, fliesenpreis]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Fläche */}
        <RadioToggleGroup
          name="flaeche-modus"
          legend="Fläche berechnen"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge</label>
              <NummerEingabe value={laengeM} onChange={setLaengeM} einheit="m" placeholder="3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
              <NummerEingabe value={breiteM} onChange={setBreiteM} einheit="m" placeholder="2,5" />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fläche</label>
            <NummerEingabe value={flaecheQm} onChange={setFlaecheQm} einheit="m²" placeholder="7,5" />
          </div>
        )}

        {flaecheModus === 'masse' && berechneteFlaeche > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Berechnete Fläche: <strong>{fmt1(berechneteFlaeche)} m²</strong>
          </p>
        )}

        {/* Fliesengröße */}
        <div>
          <label htmlFor="fliesen-groesse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fliesengröße</label>
          <select
            id="fliesen-groesse"
            value={fliesenGroesseIndex}
            onChange={e => setFliesenGroesseIndex(Number(e.target.value))}
            className="input-field"
          >
            {FLIESEN_GROESSEN.map((g, i) => (
              <option key={i} value={i}>{g.label}</option>
            ))}
          </select>
        </div>

        {fliesenGroesseIndex === 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fliesenlänge</label>
              <NummerEingabe value={eigeneLaenge} onChange={setEigeneLaenge} einheit="cm" placeholder="30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fliesenbreite</label>
              <NummerEingabe value={eigeneBreite} onChange={setEigeneBreite} einheit="cm" placeholder="60" />
            </div>
          </div>
        )}

        {/* Verlegemuster */}
        <RadioToggleGroup
          name="verlegemuster"
          legend="Verlegemuster"
          value={verschnitt}
          onChange={setVerschnitt}
          options={VERLEGEMUSTER}
        />

        {/* Fliesenpreis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fliesenpreis (optional)</label>
          <NummerEingabe value={fliesenpreis} onChange={setFliesenpreis} einheit="€/m²" placeholder="25" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Benötigte Fliesen</p>
            <p className="text-5xl font-bold">{fmt0(ergebnis.anzahlFliesen)} <span className="text-2xl">Stück</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Fläche (inkl. Verschnitt)</p>
                <p className="text-lg font-bold">{fmt1(ergebnis.flaecheMitVerschnitt)} m²</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Fliesenkleber</p>
                <p className="text-lg font-bold">{ergebnis.kleberSaecke} × 25 kg</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Fugenmasse</p>
                <p className="text-lg font-bold">{ergebnis.fugenmassGebinde} × 5 kg</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Materialkosten</p>
                <p className="text-lg font-bold">{fmt(ergebnis.gesamtkosten)} €</p>
              </div>
            </div>
          </div>

          {/* Einkaufsliste */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Einkaufsliste</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fliesen ({flieseMasse.laenge} × {flieseMasse.breite} cm)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt0(ergebnis.anzahlFliesen)} Stück</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fliesenkleber (25-kg-Säcke)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.kleberSaecke} Säcke ({fmt1(ergebnis.kleberKg)} kg)</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fugenmasse (5-kg-Gebinde)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.fugenmassGebinde} Gebinde ({fmt1(ergebnis.fugenmassKg)} kg)</span>
              </div>

              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/30">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Kostenaufstellung</p>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fliesen ({fmt1(ergebnis.flaecheMitVerschnitt)} m² × {fmt(parseDeutscheZahl(fliesenpreis))} €/m²)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.kostenFliesen)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fliesenkleber ({ergebnis.kleberSaecke} Säcke à 18 €)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.kostenKleber)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fugenmasse ({ergebnis.fugenmassGebinde} Gebinde à 12 €)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.kostenFugenmasse)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Materialkosten gesamt</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtkosten)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Richtwerte für Standard-Verlegung. Bei großformatigen Fliesen, Naturstein oder besonderen Untergründen kann der Kleber- und Fugenbedarf abweichen. Planen Sie für Ecken, Nischen und Aussparungen ggf. zusätzlichen Verschnitt ein.
            </p>
          </div>

          <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📐" text="Quadratmeter berechnen" />
          <CrossLink href="/wohnen/malerkosten-rechner" emoji="🎨" text="Malerkosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Fliesenbedarf: ${fmt0(ergebnis.anzahlFliesen)} Fliesen (${flieseMasse.laenge}×${flieseMasse.breite} cm) für ${fmt1(berechneteFlaeche)} m² | Kleber: ${ergebnis.kleberSaecke} Säcke (25 kg) | Fugenmasse: ${ergebnis.fugenmassGebinde} Gebinde (5 kg) | Materialkosten: ${fmt(ergebnis.gesamtkosten)} €`}
            seitenTitel="Fliesenbedarf-Rechner"
          />

          <AiExplain
            rechnerName="Fliesenbedarf-Rechner"
            eingaben={{
              flaecheQm: berechneteFlaeche,
              flieseLaengeCm: flieseMasse.laenge,
              flieseBreiteCm: flieseMasse.breite,
              verschnittProzent: parseDeutscheZahl(verschnitt),
              fliesenpreisProQm: parseDeutscheZahl(fliesenpreis),
            }}
            ergebnis={{
              anzahlFliesen: ergebnis.anzahlFliesen,
              flaecheMitVerschnittQm: ergebnis.flaecheMitVerschnitt,
              kleberSaecke: ergebnis.kleberSaecke,
              fugenmassGebinde: ergebnis.fugenmassGebinde,
              gesamtkostenEuro: ergebnis.gesamtkosten,
            }}
          />
        </>
      )}
    </div>
  );
}
