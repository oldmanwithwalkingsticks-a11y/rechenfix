'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'raum' | 'flaeche';
type Qualitaet = 'standard' | 'premium' | 'spezial';

const FARBE_PREIS: Record<Qualitaet, number> = { standard: 5, premium: 10, spezial: 15 };
const FARBE_LABEL: Record<Qualitaet, string> = {
  standard: 'Standard (5 €/l)',
  premium: 'Premium (10 €/l)',
  spezial: 'Spezial Küche/Bad (15 €/l)',
};

const fmtEur = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
const fmt = (n: number, d = 1) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function MalerkostenRechner() {
  const [modus, setModus] = useState<Modus>('raum');
  const [laenge, setLaenge] = useState('5');
  const [breite, setBreite] = useState('4');
  const [hoehe, setHoehe] = useState('2.5');
  const [direktFlaeche, setDirektFlaeche] = useState('40');
  const [decke, setDecke] = useState(true);
  const [fenster, setFenster] = useState('1');
  const [tueren, setTueren] = useState('1');
  const [anstriche, setAnstriche] = useState('2');
  const [maler, setMaler] = useState(false);
  const [qualitaet, setQualitaet] = useState<Qualitaet>('standard');

  const ergebnis = useMemo(() => {
    const l = parseDeutscheZahl(laenge) || 0;
    const b = parseDeutscheZahl(breite) || 0;
    const h = parseDeutscheZahl(hoehe) || 0;
    const f = Math.max(0, parseDeutscheZahl(fenster) || 0);
    const t = Math.max(0, parseDeutscheZahl(tueren) || 0);
    const an = Math.max(1, parseInt(anstriche) || 2);

    let wand = 0;
    let deckeFlaeche = 0;
    if (modus === 'raum') {
      wand = 2 * (l + b) * h;
      deckeFlaeche = decke ? l * b : 0;
    } else {
      wand = parseDeutscheZahl(direktFlaeche) || 0;
      deckeFlaeche = 0;
    }
    const abzuege = f * 1.5 + t * 2.0;
    const streichflaeche = Math.max(0, wand + deckeFlaeche - abzuege);

    const farbeLiter = Math.ceil(streichflaeche * 0.15 * an);
    const preis = FARBE_PREIS[qualitaet];
    const farbeKosten = farbeLiter * preis;
    const abdeck = 15;
    const werkzeug = 25;
    const materialGesamt = farbeKosten + abdeck + werkzeug;

    const arbeitsstunden = (streichflaeche * an) / 10;
    const arbeitskosten = arbeitsstunden * 42;
    const anfahrt = 30;
    const malerGesamt = arbeitskosten + anfahrt;

    const gesamt = maler ? materialGesamt + malerGesamt : materialGesamt;
    const selbstDauer = (streichflaeche * an) / 5; // Hobby 5 m²/h

    return {
      wand, deckeFlaeche, abzuege, streichflaeche,
      farbeLiter, farbeKosten, materialGesamt,
      arbeitsstunden, arbeitskosten, malerGesamt,
      gesamt, selbstDauer,
    };
  }, [modus, laenge, breite, hoehe, direktFlaeche, decke, fenster, tueren, anstriche, maler, qualitaet]);

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Raumgröße</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button onClick={() => setModus('raum')} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${modus === 'raum' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Raummaße</button>
            <button onClick={() => setModus('flaeche')} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${modus === 'flaeche' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Fläche direkt</button>
          </div>
          {modus === 'raum' ? (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Länge</label>
                <NummerEingabe value={laenge} onChange={setLaenge} einheit="m" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Breite</label>
                <NummerEingabe value={breite} onChange={setBreite} einheit="m" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Höhe</label>
                <NummerEingabe value={hoehe} onChange={setHoehe} einheit="m" />
              </div>
            </div>
          ) : (
            <NummerEingabe value={direktFlaeche} onChange={setDirektFlaeche} einheit="m²" />
          )}
        </div>

        {modus === 'raum' && (
          <div className="flex items-center gap-2">
            <input id="decke" type="checkbox" checked={decke} onChange={e => setDecke(e.target.checked)} className="w-5 h-5" />
            <label htmlFor="decke" className="text-sm text-gray-700 dark:text-gray-300">Decke mit streichen</label>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fenster (à 1,5 m²)</label>
            <NummerEingabe value={fenster} onChange={setFenster} einheit="" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Türen (à 2,0 m²)</label>
            <NummerEingabe value={tueren} onChange={setTueren} einheit="" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anzahl Anstriche</label>
          <select value={anstriche} onChange={e => setAnstriche(e.target.value)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <option value="1">1× (Auffrischung)</option>
            <option value="2">2× (Standard)</option>
            <option value="3">3× (Farbwechsel dunkel → hell)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Farbqualität</label>
          <select value={qualitaet} onChange={e => setQualitaet(e.target.value as Qualitaet)} className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {(['standard', 'premium', 'spezial'] as Qualitaet[]).map(q => <option key={q} value={q}>{FARBE_LABEL[q]}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Wer streicht?</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMaler(false)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${!maler ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Selbst</button>
            <button onClick={() => setMaler(true)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${maler ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Maler beauftragen</button>
          </div>
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Gesamtkosten {maler ? '(mit Maler)' : '(selbst)'}</p>
        <p className="text-5xl font-bold">{fmtEur(ergebnis.gesamt)}</p>
        <p className="text-white/80 text-sm mt-2">
          Streichfläche: <strong>{fmt(ergebnis.streichflaeche)} m²</strong> · Farbbedarf: <strong>{ergebnis.farbeLiter} Liter</strong>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Kostenaufschlüsselung</h2>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Farbe ({ergebnis.farbeLiter} l × {FARBE_PREIS[qualitaet]} €)</span><span className="font-medium">{fmtEur(ergebnis.farbeKosten)}</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Abdeckmaterial (Folie, Kreppband)</span><span className="font-medium">15 €</span></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Werkzeug (Rolle, Pinsel)</span><span className="font-medium">25 €</span></div>
          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
          <div className="flex justify-between font-medium"><span>Material gesamt</span><span>{fmtEur(ergebnis.materialGesamt)}</span></div>
          {maler && (
            <>
              <div className="flex justify-between mt-2"><span className="text-gray-600 dark:text-gray-400">Arbeitszeit Maler (~{fmt(ergebnis.arbeitsstunden)} h × 42 €)</span><span className="font-medium">{fmtEur(ergebnis.arbeitskosten)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Anfahrt</span><span className="font-medium">30 €</span></div>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <div className="flex justify-between font-medium"><span>Maler gesamt</span><span>{fmtEur(ergebnis.malerGesamt)}</span></div>
            </>
          )}
          <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2 flex justify-between font-bold">
            <span className="text-gray-800 dark:text-gray-100">Gesamtkosten</span>
            <span className="text-primary-600 dark:text-primary-400">{fmtEur(ergebnis.gesamt)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">🛒 Einkaufsliste</h2>
        <ul className="text-sm space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
          <li>{ergebnis.farbeLiter} Liter Wandfarbe ({FARBE_LABEL[qualitaet]})</li>
          <li>Abdeckfolie (ca. 20 m²)</li>
          <li>Kreppband (2 Rollen)</li>
          <li>Farbrolle + Teleskopstiel + Abstreifgitter</li>
          <li>Pinsel für Ecken und Kanten</li>
        </ul>
      </div>

      {!maler && (
        <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-4 text-sm">
          <strong>⏱️ Zeitschätzung:</strong> ca. {fmt(ergebnis.selbstDauer)} Stunden für {anstriche} Anstriche (Hobby-Streicher ≈ 5 m²/h).
        </div>
      )}

      <CrossLink href="/wohnen/tapetenbedarf-rechner" emoji="🧻" text="Tapetenbedarf-Rechner" />
      <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📐" text="Quadratmeter-Rechner" />
      <CrossLink href="/wohnen/umzugskosten-rechner" emoji="📦" text="Umzugskosten-Rechner" />

      <ErgebnisAktionen
        ergebnisText={`Malerkosten: ${fmtEur(ergebnis.gesamt)} ${maler ? '(mit Maler)' : '(selbst)'} für ${fmt(ergebnis.streichflaeche)} m²`}
        seitenTitel="Malerkosten-Rechner"
      />

      <AiExplain
        rechnerName="Malerkosten-Rechner"
        eingaben={{
          'Streichfläche': `${fmt(ergebnis.streichflaeche)} m²`,
          'Anstriche': anstriche,
          'Farbqualität': FARBE_LABEL[qualitaet],
          'Ausführung': maler ? 'Maler' : 'Selbst',
        }}
        ergebnis={{
          'Farbbedarf': `${ergebnis.farbeLiter} Liter`,
          'Material': fmtEur(ergebnis.materialGesamt),
          'Gesamt': fmtEur(ergebnis.gesamt),
        }}
      />
    </div>
  );
}
