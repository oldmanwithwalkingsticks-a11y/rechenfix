'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneArithmetisch,
  berechneGewichtet,
  berechneMedianModus,
  parseWerteListe,
  type GewichtetEintrag,
} from '@/lib/berechnungen/durchschnitt';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'arithmetisch' | 'gewichtet' | 'median';

const modusTabs: { key: Modus; label: string }[] = [
  { key: 'arithmetisch', label: 'Arithmetisches Mittel' },
  { key: 'gewichtet', label: 'Gewichtetes Mittel' },
  { key: 'median', label: 'Median & Modus' },
];

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

export default function DurchschnittRechner() {
  const [modus, setModus] = useState<Modus>('arithmetisch');

  // Modus 1 & 3: Werte
  const [werteText, setWerteText] = useState('4; 7; 2; 9; 5');
  const [einzelWerte, setEinzelWerte] = useState<{ id: number; wert: string }[]>([
    { id: 1, wert: '4' }, { id: 2, wert: '7' }, { id: 3, wert: '2' },
    { id: 4, wert: '9' }, { id: 5, wert: '5' },
  ]);
  const [eingabeArt, setEingabeArt] = useState<'text' | 'felder'>('text');
  const [nextEId, setNextEId] = useState(6);

  // Modus 2: Gewichtet
  const [gEintraege, setGEintraege] = useState<{ id: number; wert: string; gewicht: string }[]>([
    { id: 1, wert: '2', gewicht: '3' },
    { id: 2, wert: '4', gewicht: '1' },
    { id: 3, wert: '1', gewicht: '2' },
  ]);
  const [nextGId, setNextGId] = useState(4);

  // Werte parsen
  const werte = useMemo((): number[] => {
    if (eingabeArt === 'text') {
      return parseWerteListe(werteText);
    }
    return einzelWerte
      .map(e => parseDeutscheZahl(e.wert))
      .filter(v => !isNaN(v) && v !== 0 || einzelWerte.some(e => e.wert === '0'));
  }, [eingabeArt, werteText, einzelWerte]);

  // Werte korrekt für Felder-Modus
  const werteAusFelder = useMemo((): number[] => {
    return einzelWerte
      .map(e => {
        const v = parseDeutscheZahl(e.wert);
        return e.wert.trim() !== '' && !isNaN(v) ? v : NaN;
      })
      .filter(v => !isNaN(v));
  }, [einzelWerte]);

  const aktuelleWerte = eingabeArt === 'text' ? werte : werteAusFelder;

  // Ergebnis Modus 1
  const arithmErgebnis = useMemo(() => {
    if (modus !== 'arithmetisch') return null;
    return berechneArithmetisch(aktuelleWerte);
  }, [modus, aktuelleWerte]);

  // Ergebnis Modus 2
  const gewichtetErgebnis = useMemo(() => {
    if (modus !== 'gewichtet') return null;
    const eintraege: GewichtetEintrag[] = gEintraege.map(e => ({
      wert: parseDeutscheZahl(e.wert),
      gewicht: parseDeutscheZahl(e.gewicht),
    }));
    return berechneGewichtet(eintraege);
  }, [modus, gEintraege]);

  // Ergebnis Modus 3
  const medianErgebnis = useMemo(() => {
    if (modus !== 'median') return null;
    return berechneMedianModus(aktuelleWerte);
  }, [modus, aktuelleWerte]);

  // Einzelfelder-Verwaltung
  const fuegeEinzelHinzu = () => {
    setEinzelWerte(prev => [...prev, { id: nextEId, wert: '' }]);
    setNextEId(p => p + 1);
  };
  const entferneEinzel = (id: number) => {
    setEinzelWerte(prev => prev.filter(e => e.id !== id));
  };
  const updateEinzel = (id: number, wert: string) => {
    setEinzelWerte(prev => prev.map(e => e.id === id ? { ...e, wert } : e));
  };

  // Gewichtet-Verwaltung
  const fuegeGHinzu = () => {
    setGEintraege(prev => [...prev, { id: nextGId, wert: '', gewicht: '1' }]);
    setNextGId(p => p + 1);
  };
  const entferneG = (id: number) => {
    setGEintraege(prev => prev.filter(e => e.id !== id));
  };
  const updateG = (id: number, feld: 'wert' | 'gewicht', v: string) => {
    setGEintraege(prev => prev.map(e => e.id === id ? { ...e, [feld]: v } : e));
  };

  // Werte-Eingabe (Modus 1 & 3)
  const werteEingabe = (
    <div className="mb-6">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setEingabeArt('text')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            eingabeArt === 'text'
              ? 'bg-accent-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Textfeld
        </button>
        <button
          onClick={() => setEingabeArt('felder')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            eingabeArt === 'felder'
              ? 'bg-accent-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Einzelfelder
        </button>
      </div>

      {eingabeArt === 'text' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Werte (durch Semikolon oder Komma getrennt)
          </label>
          <input
            type="text"
            value={werteText}
            onChange={e => setWerteText(e.target.value)}
            placeholder="4; 7; 2; 9; 5"
            className="input-field w-full"
          />
          <p className="text-xs text-gray-600 mt-1">{aktuelleWerte.length} Werte erkannt</p>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Werte</label>
          <div className="space-y-2">
            {einzelWerte.map((e, idx) => (
              <div key={e.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-5 shrink-0">{idx + 1}.</span>
                <div className="flex-1">
                  <NummerEingabe value={e.wert} onChange={v => updateEinzel(e.id, v)} placeholder="Wert" />
                </div>
                {einzelWerte.length > 2 && (
                  <button
                    onClick={() => entferneEinzel(e.id)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors text-lg shrink-0"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={fuegeEinzelHinzu}
            className="w-full py-2 mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-all"
          >
            + Wert hinzufügen
          </button>
        </div>
      )}
    </div>
  );

  // Statistik-Kacheln
  const statistikKacheln = (erg: { summe: number; anzahl: number; min: number; max: number; spannweite: number; standardabweichung: number }) => (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {[
        { label: 'Summe', wert: fmt(erg.summe) },
        { label: 'Anzahl', wert: erg.anzahl.toString() },
        { label: 'Minimum', wert: fmt(erg.min) },
        { label: 'Maximum', wert: fmt(erg.max) },
        { label: 'Spannweite', wert: fmt(erg.spannweite) },
        { label: 'Std.-Abw.', wert: fmt(erg.standardabweichung) },
      ].map(k => (
        <div key={k.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{k.label}</p>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{k.wert}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {modusTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Arithmetisches Mittel */}
      {modus === 'arithmetisch' && (
        <div>
          {werteEingabe}
          {arithmErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Arithmetisches Mittel</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(arithmErgebnis.mittelwert)}</p>
              </div>

              {/* Rechenweg */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rechenweg</p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-words">{arithmErgebnis.rechenweg}</p>
              </div>

              {statistikKacheln(arithmErgebnis)}

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sortierte Werte</p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{arithmErgebnis.sortiert.map(fmt).join(', ')}</p>
              </div>

              <CrossLink href="/mathe/notenschluessel-rechner" emoji="📊" text="Notenschlüssel berechnen" />

              <ErgebnisAktionen
                ergebnisText={`Arithmetisches Mittel: ${fmt(arithmErgebnis.mittelwert)} (${arithmErgebnis.anzahl} Werte)`}
                seitenTitel="Durchschnitt berechnen"
              />

              <AiExplain
                rechnerName="Durchschnittsrechner"
                eingaben={{ werte: aktuelleWerte, anzahl: arithmErgebnis.anzahl }}
                ergebnis={{ mittelwert: arithmErgebnis.mittelwert, summe: arithmErgebnis.summe, min: arithmErgebnis.min, max: arithmErgebnis.max, standardabweichung: arithmErgebnis.standardabweichung }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Gewichtetes Mittel */}
      {modus === 'gewichtet' && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Wert und Gewichtung</p>
          <div className="space-y-2 mb-4">
            {gEintraege.map((e, idx) => (
              <div key={e.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-5 shrink-0">{idx + 1}.</span>
                <div className="flex-1">
                  <NummerEingabe value={e.wert} onChange={v => updateG(e.id, 'wert', v)} placeholder="Wert" />
                </div>
                <span className="text-xs text-gray-600 shrink-0">×</span>
                <div className="w-16">
                  <NummerEingabe value={e.gewicht} onChange={v => updateG(e.id, 'gewicht', v)} placeholder="1" />
                </div>
                {gEintraege.length > 2 && (
                  <button
                    onClick={() => entferneG(e.id)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors text-lg shrink-0"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={fuegeGHinzu}
            className="w-full py-2.5 mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-all"
          >
            + Weitere Zeile
          </button>

          {gewichtetErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Gewichtetes Mittel</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(gewichtetErgebnis.mittelwert)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{gewichtetErgebnis.anzahl} Werte, Gewichtung: {fmt(gewichtetErgebnis.summeGewichte)}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rechenweg</p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-words">{gewichtetErgebnis.rechenweg}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {gEintraege
                    .filter(e => parseDeutscheZahl(e.gewicht) > 0 && e.wert.trim() !== '')
                    .map((e, i) => (
                    <div key={e.id} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Wert {i + 1}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{e.wert} × {e.gewicht}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ErgebnisAktionen
                ergebnisText={`Gewichtetes Mittel: ${fmt(gewichtetErgebnis.mittelwert)} (${gewichtetErgebnis.anzahl} Werte, Gewichtung: ${fmt(gewichtetErgebnis.summeGewichte)})`}
                seitenTitel="Durchschnitt berechnen"
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 3: Median & Modus */}
      {modus === 'median' && (
        <div>
          {werteEingabe}
          {medianErgebnis && (
            <div className="space-y-4">
              {/* Drei Hauptwerte */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-4 text-center">
                  <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">Mittelwert</p>
                  <p className="text-2xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(medianErgebnis.mittelwert)}</p>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 dark:from-accent-500/15 dark:to-accent-600/10 rounded-2xl p-4 text-center">
                  <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">Median</p>
                  <p className="text-2xl font-extrabold text-accent-700 dark:text-accent-300">{fmt(medianErgebnis.median)}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-500/15 dark:to-green-600/10 rounded-2xl p-4 text-center">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Modus</p>
                  <p className="text-2xl font-extrabold text-green-700 dark:text-green-300">
                    {medianErgebnis.modus ? medianErgebnis.modus.map(fmt).join(', ') : '–'}
                  </p>
                  {!medianErgebnis.modus && (
                    <p className="text-xs text-gray-600 mt-0.5">kein Modus</p>
                  )}
                </div>
              </div>

              {/* Rechenweg Mittelwert */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rechenweg Mittelwert</p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-words">{medianErgebnis.rechenweg}</p>
              </div>

              {/* Rechenweg Median */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rechenweg Median</p>
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-words">{medianErgebnis.medianRechenweg}</p>
              </div>

              {statistikKacheln(medianErgebnis)}

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sortierte Werte</p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{medianErgebnis.sortiert.map(fmt).join(', ')}</p>
              </div>

              <ErgebnisAktionen
                ergebnisText={`Mittelwert: ${fmt(medianErgebnis.mittelwert)}, Median: ${fmt(medianErgebnis.median)}${medianErgebnis.modus ? `, Modus: ${medianErgebnis.modus.map(fmt).join(', ')}` : ''}`}
                seitenTitel="Durchschnitt berechnen"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
