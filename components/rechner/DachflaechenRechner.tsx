'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { berechneSpezifischenErtrag } from '@/lib/berechnungen/pv-ertragsmodell';

// Modulfläche pro kWp: ~5,5 m² bei modernen Modulen mit ~200 Wp/m²,
// inkl. Abstände, Randbereiche, Wartungswege. Konservativer Wert für
// durchschnittlichen Bestand (moderne Module liegen bei ~5,0).
const MODULFLAECHE_PRO_KWP = 5.5;
// Spezifischer Süd-Optimum-Ertrag aus zentraler SSOT (pv-ertragsmodell).
// Konsistent mit photovoltaik-rechner: 850 kWh/kWp/Jahr inkl. PR 0,85.
const PV_SPEZ_ERTRAG_OPTIMAL = berechneSpezifischenErtrag('sued', 'optimal');

type Dachform = 'sattel' | 'pult' | 'walm' | 'flach';

const fmt = (n: number, d = 2) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmt0 = (n: number) => Math.round(n).toLocaleString('de-DE');

export default function DachflaechenRechner() {
  const [form, setForm] = useState<Dachform>('sattel');
  const [laenge, setLaenge] = useState('10');
  const [breite, setBreite] = useState('8');
  const [neigung, setNeigung] = useState('35');
  const [ueberstand, setUeberstand] = useState('0.5');

  const ergebnis = useMemo(() => {
    const l = parseDeutscheZahl(laenge) || 0;
    const b = parseDeutscheZahl(breite) || 0;
    const n = parseDeutscheZahl(neigung) || 0;
    const u = parseDeutscheZahl(ueberstand) || 0;

    const lGes = l + 2 * u;
    const bGes = b + 2 * u;
    const grundGes = lGes * bGes;
    const neigungsRad = (n * Math.PI) / 180;
    const cosNeig = Math.cos(neigungsRad);
    const sparrenFaktor = cosNeig > 0.01 ? 1 / cosNeig : 1;

    let flaeche = 0;
    let sparrenLaenge = 0;
    let beschreibung = '';

    if (form === 'sattel') {
      // 2 gleiche Rechtecke; Breite des Dachs wird durch Neigung auf Sparrenlänge = (b/2)/cos(α)
      sparrenLaenge = (bGes / 2) * sparrenFaktor;
      flaeche = 2 * lGes * sparrenLaenge;
      beschreibung = '2 × (Länge × Sparrenlänge)';
    } else if (form === 'pult') {
      sparrenLaenge = bGes * sparrenFaktor;
      flaeche = lGes * sparrenLaenge;
      beschreibung = 'Länge × Sparrenlänge';
    } else if (form === 'walm') {
      // Bei gleicher Neigung an allen vier Seiten ist Grundfläche / cos(α)
      // mathematisch exakt — jeder m² Grundfläche projiziert sich um den
      // gleichen Faktor 1/cos(Neigung) auf die Dachfläche, unabhängig von
      // der Neigungsrichtung.
      sparrenLaenge = (bGes / 2) * sparrenFaktor;
      flaeche = grundGes * sparrenFaktor;
      beschreibung = 'Grundfläche / cos(Neigung)';
    } else {
      // Flachdach
      sparrenLaenge = bGes;
      flaeche = grundGes;
      beschreibung = 'Länge × Breite (Flachdach)';
    }

    // Bedarf
    const ziegelProM2 = 12; // Durchschnitt
    const anzahlZiegel = Math.ceil(flaeche * ziegelProM2 * 1.05); // +5 % Verschnitt
    const dachlatten = flaeche * 3.3; // lfm
    const unterspannbahn = Math.ceil(flaeche * 1.15);

    // PV-Potenzial — spezifischer Ertrag aus zentraler SSOT
    // (pv-ertragsmodell.ts) für Süd/Optimal-Annahme. Wer die genauen
    // Werte für seine Ausrichtung/Neigung will, nutzt den Photovoltaik-
    // Rechner mit dem vollständigen Mertens-Faktor-Modell.
    const pvNutzbar = form === 'flach' ? flaeche * 0.5 : flaeche * 0.7;
    const kwpMax = pvNutzbar / MODULFLAECHE_PRO_KWP;
    const ertragKWh = Math.round(kwpMax * PV_SPEZ_ERTRAG_OPTIMAL);

    return {
      flaeche,
      sparrenLaenge,
      beschreibung,
      grundGes,
      anzahlZiegel,
      dachlatten,
      unterspannbahn,
      kwpMax,
      ertragKWh,
    };
  }, [form, laenge, breite, neigung, ueberstand]);

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Dachform</label>
          <div className="grid grid-cols-4 gap-2">
            {(['sattel', 'pult', 'walm', 'flach'] as Dachform[]).map(f => (
              <button key={f} onClick={() => setForm(f)} className={`min-h-[48px] px-2 rounded-xl border text-xs font-medium ${form === f ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                {f === 'sattel' ? 'Sattel' : f === 'pult' ? 'Pult' : f === 'walm' ? 'Walm' : 'Flach'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gebäudelänge</label>
            <NummerEingabe value={laenge} onChange={setLaenge} einheit="m" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gebäudebreite</label>
            <NummerEingabe value={breite} onChange={setBreite} einheit="m" />
          </div>
        </div>

        {form !== 'flach' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dachneigung</label>
            <NummerEingabe value={neigung} onChange={setNeigung} einheit="°" />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dachüberstand</label>
          <NummerEingabe value={ueberstand} onChange={setUeberstand} einheit="m" />
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Dachfläche</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.flaeche)} m²</p>
        <p className="text-white/80 text-sm mt-2">
          {ergebnis.beschreibung}
          {form !== 'flach' && <> · Sparrenlänge: <strong>{fmt(ergebnis.sparrenLaenge)} m</strong></>}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Materialbedarf (Richtwerte)</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Dachziegel (ca. 12/m² + 5 %)</span><span className="font-medium">{fmt0(ergebnis.anzahlZiegel)} Stück</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Dachlatten (ca. 3,3 lfm/m²)</span><span className="font-medium">{fmt0(ergebnis.dachlatten)} lfm</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Unterspannbahn (+15 % Verschnitt)</span><span className="font-medium">{fmt0(ergebnis.unterspannbahn)} m²</span></div>
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-primary-700 dark:text-primary-300 mb-3 text-sm">☀️ PV-Potenzial (geschätzt)</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Max. Anlagengröße</span><span className="font-medium">{fmt(ergebnis.kwpMax, 1)} kWp</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Erwarteter Jahresertrag</span><span className="font-medium">{fmt0(ergebnis.ertragKWh)} kWh</span></div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Die Berechnung gilt für regelmäßige Dachformen mit gleichmäßiger Neigung. Für Walmdächer mit unterschiedlichen Neigungen, Krüppelwalme, Gauben oder komplexe Dachformen lassen Sie die Fläche von einem Dachdecker aufmessen.
      </p>

      <CrossLink href="/wohnen/photovoltaik-rechner" emoji="☀️" text="Photovoltaik-Rechner" />
      <CrossLink href="/wohnen/tapetenbedarf-rechner" emoji="🧻" text="Tapetenbedarf-Rechner" />
      <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📐" text="Quadratmeter-Rechner" />

      <ErgebnisAktionen
        ergebnisText={`Dachfläche: ${fmt(ergebnis.flaeche)} m² · ${fmt0(ergebnis.anzahlZiegel)} Ziegel · PV-Potenzial ${fmt(ergebnis.kwpMax, 1)} kWp`}
        seitenTitel="Dachflächen-Rechner"
      />

      <AiExplain
        rechnerName="Dachflächen-Rechner"
        eingaben={{
          'Dachform': form,
          'Länge': `${laenge} m`,
          'Breite': `${breite} m`,
          'Neigung': `${neigung} °`,
          'Überstand': `${ueberstand} m`,
        }}
        ergebnis={{
          'Dachfläche': `${fmt(ergebnis.flaeche)} m²`,
          'Ziegel': `${fmt0(ergebnis.anzahlZiegel)} Stück`,
          'PV-Potenzial': `${fmt(ergebnis.kwpMax, 1)} kWp`,
        }}
      />
    </div>
  );
}
