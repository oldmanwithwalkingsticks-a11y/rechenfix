'use client';

import { useState, useMemo } from 'react';
import { berechneKoerperfett, type Geschlecht } from '@/lib/berechnungen/koerperfett';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

export default function KoerperfettRechner() {
  const [geschlecht, setGeschlecht] = useState<Geschlecht>('mann');
  const [groesse, setGroesse] = useState('178');
  const [bauchumfang, setBauchumfang] = useState('85');
  const [halsumfang, setHalsumfang] = useState('38');
  const [hueftumfang, setHueftumfang] = useState('95');
  const [alter, setAlter] = useState('30');
  const [gewicht, setGewicht] = useState('');

  const nGroesse = parseDeutscheZahl(groesse);
  const nBauchumfang = parseDeutscheZahl(bauchumfang);
  const nHalsumfang = parseDeutscheZahl(halsumfang);
  const nHueftumfang = parseDeutscheZahl(hueftumfang);
  const nAlter = parseDeutscheZahl(alter);
  const nGewicht = parseDeutscheZahl(gewicht);

  const ergebnis = useMemo(
    () => berechneKoerperfett({
      geschlecht,
      groesse: nGroesse,
      bauchumfang: nBauchumfang,
      halsumfang: nHalsumfang,
      hueftumfang: nHueftumfang,
      alter: nAlter,
      gewicht: nGewicht,
    }),
    [geschlecht, nGroesse, nBauchumfang, nHalsumfang, nHueftumfang, nAlter, nGewicht],
  );

  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Farben für die Skala-Segmente
  const skalaFarben = [
    { label: 'Essentiell', bg: 'bg-red-400', text: 'text-red-700' },
    { label: 'Athletisch', bg: 'bg-blue-400', text: 'text-blue-700' },
    { label: 'Fitness', bg: 'bg-green-400', text: 'text-green-700' },
    { label: 'Durchschnitt', bg: 'bg-yellow-400', text: 'text-yellow-700' },
    { label: 'Übergewicht', bg: 'bg-red-500', text: 'text-red-700' },
  ];

  // Marker-Position berechnen (0-100%)
  function getMarkerPosition(kfa: number): number {
    const kategorien = ergebnis?.kategorien;
    if (!kategorien || kategorien.length === 0) return 0;

    const gesamtMin = kategorien[0].von;
    const gesamtMax = kategorien[kategorien.length - 1].bis;
    const pos = ((kfa - gesamtMin) / (gesamtMax - gesamtMin)) * 100;
    return Math.max(0, Math.min(100, pos));
  }

  return (
    <div>
      {/* Geschlecht */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschlecht</label>
        <div className="flex gap-2">
          <button
            onClick={() => setGeschlecht('mann')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              geschlecht === 'mann'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Mann
          </button>
          <button
            onClick={() => setGeschlecht('frau')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              geschlecht === 'frau'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Frau
          </button>
        </div>
      </div>

      {/* Körpergröße */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={groesse} onChange={setGroesse} placeholder="z.B. 178" einheit="cm" />
        </div>
      </div>

      {/* Bauchumfang */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bauchumfang</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={bauchumfang} onChange={setBauchumfang} placeholder="z.B. 85" einheit="cm" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Auf Nabelhöhe messen, morgens nüchtern</p>
      </div>

      {/* Halsumfang */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Halsumfang</label>
        <div className="w-full sm:w-1/2">
          <NummerEingabe value={halsumfang} onChange={setHalsumfang} placeholder="z.B. 38" einheit="cm" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unterhalb des Kehlkopfes messen</p>
      </div>

      {/* Hüftumfang (nur Frauen) */}
      {geschlecht === 'frau' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hüftumfang</label>
          <div className="w-full sm:w-1/2">
            <NummerEingabe value={hueftumfang} onChange={setHueftumfang} placeholder="z.B. 95" einheit="cm" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">An der breitesten Stelle messen</p>
        </div>
      )}

      {/* Alter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alter <span className="text-gray-400 font-normal">(für Vergleichswerte)</span></label>
        <div className="w-full sm:w-1/3">
          <NummerEingabe value={alter} onChange={setAlter} placeholder="z.B. 30" einheit="Jahre" />
        </div>
      </div>

      {/* Gewicht (optional) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewicht <span className="text-gray-400 font-normal">(optional, für Fett-/Magermasse)</span></label>
        <div className="w-full sm:w-1/3">
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="z.B. 80" einheit="kg" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Geschätzter Körperfettanteil</p>
                <p className="text-5xl font-bold">{fmtDez(ergebnis.kfa)} %</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {ergebnis.kategorie}
                </span>
              </div>
            </div>
          </div>

          {/* Farbige Skala */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Einordnung</h3>
            <div className="relative">
              {/* Skala-Balken */}
              <div className="flex rounded-lg overflow-hidden h-6 mb-1">
                {ergebnis.kategorien.map((k, i) => {
                  const breite = ((k.bis - k.von) / (ergebnis.kategorien[ergebnis.kategorien.length - 1].bis - ergebnis.kategorien[0].von)) * 100;
                  return (
                    <div
                      key={k.label}
                      className={`${skalaFarben[i]?.bg ?? 'bg-gray-400'} h-full`}
                      style={{ width: `${breite}%` }}
                    />
                  );
                })}
              </div>

              {/* Marker */}
              <div
                className="absolute top-0 h-6 flex items-center"
                style={{ left: `${getMarkerPosition(ergebnis.kfa)}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-0.5 h-8 bg-gray-900 dark:bg-white relative -top-1">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                    {fmtDez(ergebnis.kfa)}%
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="flex mt-2">
                {ergebnis.kategorien.map((k, i) => {
                  const breite = ((k.bis - k.von) / (ergebnis.kategorien[ergebnis.kategorien.length - 1].bis - ergebnis.kategorien[0].von)) * 100;
                  return (
                    <div
                      key={k.label}
                      className={`text-center text-[10px] sm:text-xs font-medium ${skalaFarben[i]?.text ?? 'text-gray-600'}`}
                      style={{ width: `${breite}%` }}
                    >
                      <span className="hidden sm:inline">{k.label}</span>
                      <span className="sm:hidden">{skalaFarben[i]?.label ?? ''}</span>
                      <br />
                      <span className="text-gray-400 text-[9px]">{k.von}–{k.bis}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail-Box */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Körperfettanteil (KFA)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.kfa)} %</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kategorie</span>
                <span className={`font-semibold ${ergebnis.kategorieFarbe} dark:opacity-90`}>{ergebnis.kategorie}</span>
              </div>
              {ergebnis.fettmasse !== null && ergebnis.magermasse !== null && (
                <>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Fettmasse</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.fettmasse)} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Magermasse</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.magermasse)} kg</span>
                  </div>
                </>
              )}
              {ergebnis.durchschnittAlter !== null && (
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Durchschnitt für Ihr Alter ({geschlecht === 'mann' ? 'Männer' : 'Frauen'}, {Math.round(nAlter)} J.)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">ca. {fmtDez(ergebnis.durchschnittAlter)} %</span>
                </div>
              )}
            </div>
          </div>

          {/* Vergleich mit Durchschnitt */}
          {ergebnis.durchschnittAlter !== null && (
            <div className={`rounded-xl p-4 mb-6 border ${
              ergebnis.kfa < ergebnis.durchschnittAlter
                ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                : ergebnis.kfa <= ergebnis.durchschnittAlter * 1.1
                  ? 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/30'
                  : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
            }`}>
              <p className={`text-sm font-medium ${
                ergebnis.kfa < ergebnis.durchschnittAlter
                  ? 'text-green-800 dark:text-green-300'
                  : ergebnis.kfa <= ergebnis.durchschnittAlter * 1.1
                    ? 'text-yellow-800 dark:text-yellow-300'
                    : 'text-red-800 dark:text-red-300'
              }`}>
                {ergebnis.kfa < ergebnis.durchschnittAlter
                  ? `Ihr KFA von ${fmtDez(ergebnis.kfa)}% liegt unter dem Durchschnitt von ${fmtDez(ergebnis.durchschnittAlter)}% für ${geschlecht === 'mann' ? 'Männer' : 'Frauen'} Ihres Alters. 👍`
                  : ergebnis.kfa <= ergebnis.durchschnittAlter * 1.1
                    ? `Ihr KFA von ${fmtDez(ergebnis.kfa)}% liegt im Bereich des Durchschnitts von ${fmtDez(ergebnis.durchschnittAlter)}% für ${geschlecht === 'mann' ? 'Männer' : 'Frauen'} Ihres Alters.`
                    : `Ihr KFA von ${fmtDez(ergebnis.kfa)}% liegt über dem Durchschnitt von ${fmtDez(ergebnis.durchschnittAlter)}% für ${geschlecht === 'mann' ? 'Männer' : 'Frauen'} Ihres Alters.`
                }
              </p>
            </div>
          )}

          {/* Kategorien-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-5 pt-4 pb-2">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">KFA-Kategorien ({geschlecht === 'mann' ? 'Männer' : 'Frauen'})</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300">Kategorie</th>
                  <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">KFA-Bereich</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.kategorien.map((k, i) => {
                  const istAktuell = ergebnis.kfa >= k.von && ergebnis.kfa <= k.bis;
                  return (
                    <tr
                      key={k.label}
                      className={istAktuell
                        ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                      }
                    >
                      <td className={`px-5 py-2.5 ${istAktuell ? 'text-primary-700 dark:text-primary-400' : skalaFarben[i]?.text ?? 'text-gray-800 dark:text-gray-200'}`}>
                        {k.label}
                        {istAktuell && <span className="ml-1 text-xs">✓</span>}
                      </td>
                      <td className={`px-5 py-2.5 text-right tabular-nums ${istAktuell ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {k.von}–{k.bis} %
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Die Navy-Methode ist eine Schätzung basierend auf Körpermaßen. Genauere Methoden sind DEXA-Scan oder Caliper-Messung. Sehr muskulöse Personen können einen überhöhten Wert erhalten. Im Zweifelsfall konsultieren Sie einen Arzt oder Sportmediziner.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Körperfettanteil (Navy-Methode): ${fmtDez(ergebnis.kfa)}% — Kategorie: ${ergebnis.kategorie}${ergebnis.fettmasse !== null ? ` | Fettmasse: ${fmtDez(ergebnis.fettmasse)} kg, Magermasse: ${fmtDez(ergebnis.magermasse!)} kg` : ''}`}
            seitenTitel="Körperfettrechner"
          />

          <AiExplain
            rechnerName="Körperfettrechner"
            eingaben={{
              geschlecht: geschlecht === 'mann' ? 'Mann' : 'Frau',
              groesse: `${nGroesse} cm`,
              bauchumfang: `${nBauchumfang} cm`,
              halsumfang: `${nHalsumfang} cm`,
              ...(geschlecht === 'frau' ? { hueftumfang: `${nHueftumfang} cm` } : {}),
              ...(nAlter > 0 ? { alter: nAlter } : {}),
              ...(nGewicht > 0 ? { gewicht: `${nGewicht} kg` } : {}),
            }}
            ergebnis={{
              koerperfettanteil: `${ergebnis.kfa}%`,
              kategorie: ergebnis.kategorie,
              ...(ergebnis.fettmasse !== null ? { fettmasse: `${ergebnis.fettmasse} kg` } : {}),
              ...(ergebnis.magermasse !== null ? { magermasse: `${ergebnis.magermasse} kg` } : {}),
            }}
          />
        </>
      )}
    </div>
  );
}
