'use client';

import { useState, useMemo } from 'react';
import { berechneTageszeit, berechneWoche, type WochenTag } from '@/lib/berechnungen/arbeitszeit';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

type Modus = 'tag' | 'woche';

function ZeitEingabe({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field w-full"
      />
    </div>
  );
}

function MinutenEingabe({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min="0"
          max="480"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field w-full pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">min</span>
      </div>
    </div>
  );
}

function HinweisBox({ hinweise }: { hinweise: string[] }) {
  if (hinweise.length === 0) return null;
  return (
    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4">
      {hinweise.map((h, i) => (
        <p key={i} className="text-sm text-yellow-800 dark:text-yellow-300 flex gap-2">
          <span className="shrink-0">⚠️</span>
          <span>{h}</span>
        </p>
      ))}
    </div>
  );
}

const fmtZeit = (stunden: number, minuten: number) => {
  if (stunden === 0) return `${minuten} Minuten`;
  if (minuten === 0) return `${stunden} Stunden`;
  return `${stunden} Std. ${minuten} Min.`;
};

const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const DEFAULT_TAGE: WochenTag[] = [
  { label: 'Montag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Dienstag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Mittwoch', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Donnerstag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Freitag', frei: false, beginn: '08:00', ende: '17:00', pause: 30 },
  { label: 'Samstag', frei: true, beginn: '08:00', ende: '14:00', pause: 0 },
  { label: 'Sonntag', frei: true, beginn: '', ende: '', pause: 0 },
];

export default function ArbeitszeitRechner() {
  const [modus, setModus] = useState<Modus>('tag');

  // Modus 1
  const [beginn, setBeginn] = useState('08:00');
  const [ende, setEnde] = useState('17:00');
  const [pausen, setPausen] = useState<string[]>(['30']);

  // Modus 2
  const [tage, setTage] = useState<WochenTag[]>(DEFAULT_TAGE.map(t => ({ ...t })));
  const [gleicheZeiten, setGleicheZeiten] = useState(true);

  // Ergebnis Modus 1
  const tagesErgebnis = useMemo(() => {
    return berechneTageszeit({
      beginn,
      ende,
      pausen: pausen.map(p => parseInt(p, 10) || 0),
    });
  }, [beginn, ende, pausen]);

  // Ergebnis Modus 2
  const wochenErgebnis = useMemo(() => {
    return berechneWoche(tage);
  }, [tage]);

  const updateTag = (idx: number, updates: Partial<WochenTag>) => {
    setTage(prev => {
      const neu = prev.map((t, i) => i === idx ? { ...t, ...updates } : t);
      // Bei gleichen Zeiten: Mo-Fr synchronisieren
      if (gleicheZeiten && idx < 5 && !updates.frei) {
        const quelle = { ...neu[idx] };
        for (let i = 0; i < 5; i++) {
          if (i !== idx && !neu[i].frei) {
            if (updates.beginn !== undefined) neu[i].beginn = quelle.beginn;
            if (updates.ende !== undefined) neu[i].ende = quelle.ende;
            if (updates.pause !== undefined) neu[i].pause = quelle.pause;
          }
        }
      }
      return neu;
    });
  };

  const fuegeHinzu = () => {
    setPausen(prev => [...prev, '0']);
  };

  const entfernePause = (idx: number) => {
    setPausen(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'tag' as Modus, label: 'Tägliche Arbeitszeit' },
          { key: 'woche' as Modus, label: 'Wöchentliche Arbeitszeit' },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setModus(t.key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === t.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modus 1: Tägliche Arbeitszeit */}
      {modus === 'tag' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <ZeitEingabe value={beginn} onChange={setBeginn} label="Arbeitsbeginn" />
            <ZeitEingabe value={ende} onChange={setEnde} label="Arbeitsende" />
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pausen</p>
          <div className="space-y-2 mb-2">
            {pausen.map((p, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <MinutenEingabe
                    value={p}
                    onChange={v => setPausen(prev => prev.map((x, j) => j === i ? v : x))}
                    label={`Pause ${i + 1}`}
                  />
                </div>
                {pausen.length > 1 && (
                  <button
                    onClick={() => entfernePause(i)}
                    className="pb-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 text-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {pausen.length < 5 && (
            <button
              onClick={fuegeHinzu}
              className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 font-medium mb-6"
            >
              + Weitere Pause
            </button>
          )}

          {tagesErgebnis && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Netto-Arbeitszeit</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZeit(tagesErgebnis.nettoStunden, tagesErgebnis.nettoRestMinuten)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Dezimal: {fmtDez(tagesErgebnis.dezimal)} h
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Brutto</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZeit(Math.floor(tagesErgebnis.bruttoMinuten / 60), tagesErgebnis.bruttoMinuten % 60)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pausen</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{tagesErgebnis.pauseMinuten} Min.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dezimal</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtDez(tagesErgebnis.dezimal)} h</p>
                </div>
              </div>

              <HinweisBox hinweise={tagesErgebnis.hinweise} />

              <ErgebnisAktionen
                ergebnisText={`Netto-Arbeitszeit: ${fmtZeit(tagesErgebnis.nettoStunden, tagesErgebnis.nettoRestMinuten)} (${fmtDez(tagesErgebnis.dezimal)} h)`}
                seitenTitel="Arbeitszeit berechnen"
              />

              <AiExplain
                rechnerName="Arbeitszeit-Rechner"
                eingaben={{ beginn, ende, pausenMinuten: pausen.map(p => parseInt(p, 10) || 0) }}
                ergebnis={{ nettoStunden: tagesErgebnis.nettoStunden, nettoRestMinuten: tagesErgebnis.nettoRestMinuten, dezimal: tagesErgebnis.dezimal, bruttoMinuten: tagesErgebnis.bruttoMinuten, pauseMinuten: tagesErgebnis.pauseMinuten }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Wöchentliche Arbeitszeit */}
      {modus === 'woche' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setGleicheZeiten(!gleicheZeiten)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                gleicheZeiten ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                gleicheZeiten ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Gleiche Zeiten für Mo–Fr</span>
          </div>

          <div className="space-y-2 mb-6">
            {tage.map((tag, idx) => (
              <div
                key={tag.label}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                  tag.frei
                    ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 opacity-60'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="w-12 shrink-0">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {tag.label.slice(0, 2)}
                  </span>
                </div>

                <button
                  onClick={() => updateTag(idx, { frei: !tag.frei })}
                  className={`shrink-0 w-10 h-6 rounded-full transition-all relative ${
                    !tag.frei ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  title={tag.frei ? 'Aktivieren' : 'Als frei markieren'}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    !tag.frei ? 'left-[18px]' : 'left-0.5'
                  }`} />
                </button>

                {!tag.frei && (
                  <>
                    <input
                      type="time"
                      value={tag.beginn}
                      onChange={e => updateTag(idx, { beginn: e.target.value })}
                      className="input-field w-24 text-xs py-1.5"
                    />
                    <span className="text-gray-400 text-xs">–</span>
                    <input
                      type="time"
                      value={tag.ende}
                      onChange={e => updateTag(idx, { ende: e.target.value })}
                      className="input-field w-24 text-xs py-1.5"
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="480"
                      value={tag.pause}
                      onChange={e => updateTag(idx, { pause: parseInt(e.target.value, 10) || 0 })}
                      className="input-field w-16 text-xs py-1.5 text-center"
                      title="Pause in Minuten"
                    />
                    <span className="text-xs text-gray-400 shrink-0">min</span>
                  </>
                )}
                {tag.frei && (
                  <span className="text-xs text-gray-400 italic ml-2">Frei</span>
                )}
              </div>
            ))}
          </div>

          {wochenErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Wochenarbeitszeit</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Dezimal: {fmtDez(wochenErgebnis.gesamtDezimal)} h | {wochenErgebnis.arbeitstage} Arbeitstage
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Durchschnitt/Tag</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZeit(Math.floor(wochenErgebnis.durchschnittMinuten / 60), wochenErgebnis.durchschnittMinuten % 60)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dezimal/Tag</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmtDez(wochenErgebnis.durchschnittDezimal)} h</p>
                </div>
              </div>

              {/* Tabelle */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Wochenübersicht</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Tag</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Beginn</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Ende</th>
                        <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 font-medium">Pause</th>
                        <th className="px-4 py-2 text-right text-gray-500 dark:text-gray-400 font-medium">Arbeitszeit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {wochenErgebnis.tage.map(t => (
                        <tr key={t.label}>
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{t.label.slice(0, 2)}</td>
                          {t.ergebnis ? (
                            <>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                {tage.find(d => d.label === t.label)?.beginn}
                              </td>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                {tage.find(d => d.label === t.label)?.ende}
                              </td>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{t.ergebnis.pauseMinuten} min</td>
                              <td className="px-4 py-2 text-right font-medium text-gray-800 dark:text-gray-200">
                                {fmtZeit(t.ergebnis.nettoStunden, t.ergebnis.nettoRestMinuten)}
                                <span className="text-xs text-gray-400 ml-1">({fmtDez(t.ergebnis.dezimal)} h)</span>
                              </td>
                            </>
                          ) : (
                            <td colSpan={4} className="px-4 py-2 text-gray-400 italic">Frei</td>
                          )}
                        </tr>
                      ))}
                      <tr className="bg-primary-50/50 dark:bg-primary-500/5 font-bold">
                        <td colSpan={4} className="px-4 py-2 text-gray-800 dark:text-gray-100">Gesamt</td>
                        <td className="px-4 py-2 text-right text-primary-600 dark:text-primary-400">
                          {fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)}
                          <span className="text-xs ml-1">({fmtDez(wochenErgebnis.gesamtDezimal)} h)</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <HinweisBox hinweise={wochenErgebnis.hinweise} />

              <ErgebnisAktionen
                ergebnisText={`Wochenarbeitszeit: ${fmtZeit(wochenErgebnis.gesamtStunden, wochenErgebnis.gesamtRestMinuten)} (${fmtDez(wochenErgebnis.gesamtDezimal)} h) - ${wochenErgebnis.arbeitstage} Arbeitstage`}
                seitenTitel="Arbeitszeit berechnen"
              />
            </div>
          )}
        </div>
      )}

      {(tagesErgebnis || wochenErgebnis) && (
        <AffiliateBox programId="lexware" variant="compact" />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information. Für verbindliche Auskünfte zum Arbeitsrecht wenden Sie sich an einen Fachanwalt für Arbeitsrecht.
      </p>
    </div>
  );
}
