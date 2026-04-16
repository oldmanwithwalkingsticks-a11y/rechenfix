'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneNote,
  erstelleSchluessel,
  berechneDurchschnitt,
  type Notensystem,
  type Schluesseltyp,
  type NotenEintrag,
} from '@/lib/berechnungen/notenschluessel';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'note' | 'schluessel' | 'durchschnitt';

const modusTabs: { key: Modus; label: string }[] = [
  { key: 'note', label: 'Punkte → Note' },
  { key: 'schluessel', label: 'Notenschlüssel' },
  { key: 'durchschnitt', label: 'Durchschnitt' },
];

const systemOptionen: { key: Notensystem; label: string }[] = [
  { key: 'schule', label: 'Schulnoten (1–6)' },
  { key: 'ihk', label: 'IHK-Schlüssel' },
  { key: 'uni', label: 'Uni (1,0–5,0)' },
];

function farbKlasse(farbe: 'gruen' | 'gelb' | 'rot') {
  if (farbe === 'gruen') return 'text-green-600 dark:text-green-400';
  if (farbe === 'gelb') return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function notenFarbe(note: string): string {
  const n = parseFloat(note.replace(',', '.').replace('+', '').replace('-', ''));
  if (isNaN(n)) return 'text-gray-800 dark:text-gray-200';
  if (n <= 2) return 'text-green-600 dark:text-green-400';
  if (n <= 3.5) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

export default function NotenschluesselRechner() {
  const [modus, setModus] = useState<Modus>('note');

  // Modus 1
  const [erreicht, setErreicht] = useState('38');
  const [maximum, setMaximum] = useState('50');
  const [system, setSystem] = useState<Notensystem>('schule');
  const [schluessel, setSchluessel] = useState<Schluesseltyp>('linear');
  const [bestehen, setBestehen] = useState('50');
  const [halbeNoten, setHalbeNoten] = useState(false);

  // Modus 2
  const [sMaximum, setSMaximum] = useState('100');
  const [sSystem, setSSystem] = useState<Notensystem>('schule');
  const [sSchluessel, setSSchluessel] = useState<Schluesseltyp>('linear');
  const [sBestehen, setSBestehen] = useState('50');
  const [sHalbeNoten, setSHalbeNoten] = useState(false);

  // Modus 3
  const [noten, setNoten] = useState<{ id: number; note: string; gewicht: string }[]>([
    { id: 1, note: '2', gewicht: '1' },
    { id: 2, note: '3', gewicht: '1' },
    { id: 3, note: '1', gewicht: '2' },
  ]);
  const [nextId, setNextId] = useState(4);

  // Ergebnis Modus 1
  const noteErgebnis = useMemo(() => {
    const e = parseDeutscheZahl(erreicht);
    const m = parseDeutscheZahl(maximum);
    const b = parseDeutscheZahl(bestehen);
    return berechneNote(e, m, system, schluessel, b, halbeNoten);
  }, [erreicht, maximum, system, schluessel, bestehen, halbeNoten]);

  // Ergebnis Modus 2
  const schluesselTabelle = useMemo(() => {
    const m = parseDeutscheZahl(sMaximum);
    const b = parseDeutscheZahl(sBestehen);
    return erstelleSchluessel(m, sSystem, sSchluessel, b, sHalbeNoten);
  }, [sMaximum, sSystem, sSchluessel, sBestehen, sHalbeNoten]);

  // Ergebnis Modus 3
  const durchschnittErgebnis = useMemo(() => {
    const eintraege: NotenEintrag[] = noten.map(n => ({
      note: parseDeutscheZahl(n.note),
      gewichtung: parseDeutscheZahl(n.gewicht),
    }));
    return berechneDurchschnitt(eintraege);
  }, [noten]);

  const updateNote = (id: number, feld: 'note' | 'gewicht', wert: string) => {
    setNoten(prev => prev.map(n => n.id === id ? { ...n, [feld]: wert } : n));
  };

  const entferneNote = (id: number) => {
    setNoten(prev => prev.filter(n => n.id !== id));
  };

  const fuegeNoteHinzu = () => {
    setNoten(prev => [...prev, { id: nextId, note: '', gewicht: '1' }]);
    setNextId(prev => prev + 1);
  };

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

      {/* Modus 1: Punkte → Note */}
      {modus === 'note' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erreichte Punkte</label>
              <NummerEingabe value={erreicht} onChange={setErreicht} placeholder="38" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximale Punkte</label>
              <NummerEingabe value={maximum} onChange={setMaximum} placeholder="50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Notensystem</label>
              <select value={system} onChange={e => setSystem(e.target.value as Notensystem)} className="input-field w-full">
                {systemOptionen.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Schlüsseltyp</label>
              <div className="flex gap-1.5">
                {(['linear', 'knick'] as Schluesseltyp[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSchluessel(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      schluessel === s
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {s === 'linear' ? 'Linear' : 'Knick'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bestehensgrenze</label>
              <NummerEingabe value={bestehen} onChange={setBestehen} placeholder="50" einheit="%" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  onClick={() => setHalbeNoten(!halbeNoten)}
                  className={`w-10 h-6 rounded-full transition-all relative ${
                    halbeNoten ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    halbeNoten ? 'left-[18px]' : 'left-0.5'
                  }`} />
                </button>
                <span className="text-xs text-gray-600 dark:text-gray-400">Halbe Noten (±)</span>
              </label>
            </div>
          </div>

          {noteErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Note</p>
                <p className={`text-5xl font-extrabold ${farbKlasse(noteErgebnis.farbe)}`}>
                  {noteErgebnis.note}
                </p>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mt-1 capitalize">{noteErgebnis.bezeichnung}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{noteErgebnis.prozent} %</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ergebnis</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{noteErgebnis.prozent} %</p>
                </div>
                <div className={`rounded-xl p-4 text-center ${
                  noteErgebnis.bestanden
                    ? 'bg-green-50 dark:bg-green-500/10'
                    : 'bg-red-50 dark:bg-red-500/10'
                }`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <p className={`text-lg font-bold ${
                    noteErgebnis.bestanden
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {noteErgebnis.bestanden ? 'Bestanden' : 'Nicht bestanden'}
                  </p>
                </div>
              </div>

              <CrossLink href="/mathe/abi-rechner" emoji="🎓" text="Abi-Note berechnen" />
              <CrossLink href="/mathe/durchschnitt-rechner" emoji="🧮" text="Notendurchschnitt berechnen" />

              <ErgebnisAktionen
                ergebnisText={`Note: ${noteErgebnis.note} (${noteErgebnis.bezeichnung}) - ${noteErgebnis.prozent} % - ${noteErgebnis.bestanden ? 'Bestanden' : 'Nicht bestanden'}`}
                seitenTitel="Notenschlüssel"
              />

              <AiExplain
                rechnerName="Notenschlüssel-Rechner"
                eingaben={{ erreichtePunkte: parseDeutscheZahl(erreicht), maximalePunkte: parseDeutscheZahl(maximum), notensystem: system, schluesseltyp: schluessel, bestehensgrenze: parseDeutscheZahl(bestehen) }}
                ergebnis={{ note: noteErgebnis.note, bezeichnung: noteErgebnis.bezeichnung, prozent: noteErgebnis.prozent, bestanden: noteErgebnis.bestanden }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Notenschlüssel erstellen */}
      {modus === 'schluessel' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximale Punktzahl</label>
              <NummerEingabe value={sMaximum} onChange={setSMaximum} placeholder="100" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Notensystem</label>
              <select value={sSystem} onChange={e => setSSystem(e.target.value as Notensystem)} className="input-field w-full">
                {systemOptionen.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Schlüsseltyp</label>
              <div className="flex gap-1.5">
                {(['linear', 'knick'] as Schluesseltyp[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSSchluessel(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      sSchluessel === s
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {s === 'linear' ? 'Linear' : 'Knick'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bestehensgrenze</label>
              <NummerEingabe value={sBestehen} onChange={setSBestehen} placeholder="50" einheit="%" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <button
                  onClick={() => setSHalbeNoten(!sHalbeNoten)}
                  className={`w-10 h-6 rounded-full transition-all relative ${
                    sHalbeNoten ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    sHalbeNoten ? 'left-[18px]' : 'left-0.5'
                  }`} />
                </button>
                <span className="text-xs text-gray-600 dark:text-gray-400">±</span>
              </label>
            </div>
          </div>

          {schluesselTabelle && schluesselTabelle.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors no-print"
                >
                  Drucken / PDF
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden" id="notentabelle">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 print:bg-white">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Notenschlüssel — {parseDeutscheZahl(sMaximum)} Punkte
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Punkte</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Prozent</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Note</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Bewertung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {schluesselTabelle.map(z => (
                        <tr key={z.punkte} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{z.punkte}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{z.prozent} %</td>
                          <td className={`px-4 py-2 font-bold ${notenFarbe(z.note)}`}>{z.note}</td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-400 capitalize">{z.bezeichnung}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ErgebnisAktionen
                ergebnisText={`Notenschlüssel für ${parseDeutscheZahl(sMaximum)} Punkte (${sSystem === 'schule' ? 'Schulnoten' : sSystem === 'ihk' ? 'IHK' : 'Uni'}, ${sSchluessel})`}
                seitenTitel="Notenschlüssel"
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 3: Notendurchschnitt */}
      {modus === 'durchschnitt' && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Noten eingeben</p>
          <div className="space-y-2 mb-4">
            {noten.map((n, idx) => (
              <div key={n.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-5 shrink-0">{idx + 1}.</span>
                <div className="flex-1">
                  <NummerEingabe value={n.note} onChange={v => updateNote(n.id, 'note', v)} placeholder="Note" />
                </div>
                <span className="text-xs text-gray-600 shrink-0">×</span>
                <div className="w-16">
                  <NummerEingabe value={n.gewicht} onChange={v => updateNote(n.id, 'gewicht', v)} placeholder="1" />
                </div>
                {noten.length > 1 && (
                  <button
                    onClick={() => entferneNote(n.id)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors text-lg shrink-0"
                    title="Entfernen"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={fuegeNoteHinzu}
            className="w-full py-2.5 mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-400 transition-all"
          >
            + Weitere Note
          </button>

          {durchschnittErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Notendurchschnitt</p>
                <p className={`text-5xl font-extrabold ${
                  durchschnittErgebnis.durchschnitt <= 2 ? 'text-green-600 dark:text-green-400'
                    : durchschnittErgebnis.durchschnitt <= 3.5 ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {durchschnittErgebnis.durchschnitt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mt-1 capitalize">{durchschnittErgebnis.bezeichnung}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Noten einbezogen</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{durchschnittErgebnis.anzahl}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesamtgewichtung</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{durchschnittErgebnis.gesamtGewichtung}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Eingegebene Noten</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {noten.filter(n => parseDeutscheZahl(n.note) > 0 && parseDeutscheZahl(n.gewicht) > 0).map((n, i) => (
                    <div key={n.id} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Note {i + 1}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {n.note} (×{n.gewicht})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <ErgebnisAktionen
                ergebnisText={`Notendurchschnitt: ${durchschnittErgebnis.durchschnitt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${durchschnittErgebnis.bezeichnung})`}
                seitenTitel="Notenschlüssel"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
