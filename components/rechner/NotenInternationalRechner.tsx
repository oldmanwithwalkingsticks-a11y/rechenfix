'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  rechneNotenUm,
  UMRECHNUNGSTABELLE,
  UK_CLASSIFICATIONS,
  ECTS_GRADES,
  type NotenSystem,
} from '@/lib/berechnungen/noten-international';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const SYSTEM_OPTIONEN = [
  { value: 'deutsch', label: 'Deutsche Note' },
  { value: 'gpa', label: 'GPA (USA)' },
  { value: 'uk', label: 'UK Class.' },
  { value: 'ects', label: 'ECTS-Grade' },
];

function notenFarbe(nd: number): string {
  if (nd <= 2.0) return 'text-green-700 dark:text-green-400';
  if (nd <= 3.5) return 'text-amber-700 dark:text-amber-400';
  return 'text-red-700 dark:text-red-400';
}

export default function NotenInternationalRechner() {
  const [system, setSystem] = useState<NotenSystem>('deutsch');

  // Eingabewerte pro System
  const [deutschWert, setDeutschWert] = useState('2,0');
  const [gpaWert, setGpaWert] = useState('3.0');
  const [ukWert, setUkWert] = useState('first');
  const [ectsWert, setEctsWert] = useState('A');

  // Aktuellen Rohwert für Berechnung ermitteln
  const eingabeWert = useMemo(() => {
    if (system === 'deutsch') return parseDeutscheZahl(deutschWert);
    if (system === 'gpa') return parseFloat(gpaWert);
    if (system === 'uk') return ukWert;
    if (system === 'ects') return ectsWert;
    return 0;
  }, [system, deutschWert, gpaWert, ukWert, ectsWert]);

  const ergebnis = useMemo(() => {
    if (system === 'deutsch') {
      return rechneNotenUm('deutsch', parseDeutscheZahl(deutschWert));
    }
    if (system === 'gpa') {
      return rechneNotenUm('gpa', parseFloat(gpaWert));
    }
    if (system === 'uk') {
      return rechneNotenUm('uk', ukWert);
    }
    if (system === 'ects') {
      return rechneNotenUm('ects', ectsWert);
    }
    return null;
  }, [system, deutschWert, gpaWert, ukWert, ectsWert]);

  // Nächste Zeile in Umrechnungstabelle hervorheben
  const highlightNote = ergebnis?.deutscheNote ?? null;
  const highlightIndex = useMemo(() => {
    if (highlightNote === null) return -1;
    let best = -1;
    let bestDiff = Infinity;
    UMRECHNUNGSTABELLE.forEach((z, i) => {
      const diff = Math.abs(z.deutscheNote - highlightNote);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = i;
      }
    });
    return best;
  }, [highlightNote]);

  const ergebnisText = ergebnis
    ? `Deutsche Note: ${ergebnis.deutscheNote.toLocaleString('de-DE', { minimumFractionDigits: 1 })} (${ergebnis.bewertung}) | GPA: ${ergebnis.gpa.toFixed(2)} | UK: ${ergebnis.ukClassification} | ECTS: ${ergebnis.ectsGrade}`
    : '';

  return (
    <div>
      {/* Notensystem auswählen */}
      <div className="mb-5">
        <RadioToggleGroup
          name="notensystem"
          legend="Notensystem"
          options={SYSTEM_OPTIONEN}
          value={system}
          onChange={(v) => setSystem(v as NotenSystem)}
          columns={4}
          fullWidth
        />
      </div>

      {/* Eingabefeld je nach System */}
      <div className="mb-6">
        {system === 'deutsch' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deutsche Note (1,0 – 5,0)
            </label>
            <NummerEingabe
              value={deutschWert}
              onChange={setDeutschWert}
              placeholder="2,0"
            />
          </div>
        )}

        {system === 'gpa' && (
          <div>
            <label htmlFor="noten-int-gpa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GPA (0.0 – 4.0)
            </label>
            <input
              id="noten-int-gpa"
              type="number"
              min="0"
              max="4"
              step="0.1"
              value={gpaWert}
              onChange={(e) => setGpaWert(e.target.value)}
              className="input-field w-full min-h-[48px]"
              placeholder="3.0"
            />
          </div>
        )}

        {system === 'uk' && (
          <div>
            <label htmlFor="noten-int-uk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              UK Classification
            </label>
            <select
              id="noten-int-uk"
              value={ukWert}
              onChange={(e) => setUkWert(e.target.value)}
              className="input-field w-full min-h-[48px]"
            >
              {UK_CLASSIFICATIONS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {system === 'ects' && (
          <div>
            <label htmlFor="noten-int-ects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ECTS-Grade
            </label>
            <select
              id="noten-int-ects"
              value={ectsWert}
              onChange={(e) => setEctsWert(e.target.value)}
              className="input-field w-full min-h-[48px]"
            >
              {ECTS_GRADES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-5">
          {/* 4-Spalten-Ergebnisbox */}
          <div className="result-box">
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1 text-center capitalize">
              {ergebnis.bewertung}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <div className="bg-white/90 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">Deutsche Note</p>
                <p className={`text-2xl font-extrabold ${notenFarbe(ergebnis.deutscheNote)}`}>
                  {ergebnis.deutscheNote.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">GPA (USA)</p>
                <p className={`text-2xl font-extrabold ${notenFarbe(ergebnis.deutscheNote)}`}>
                  {ergebnis.gpa.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">UK</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                  {ergebnis.ukClassification}
                </p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">ECTS</p>
                <p className={`text-2xl font-extrabold ${notenFarbe(ergebnis.deutscheNote)}`}>
                  {ergebnis.ectsGrade}
                </p>
              </div>
            </div>
          </div>

          {/* Hinweis-Box */}
          <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl text-sm text-gray-700 dark:text-gray-300">
            <span className="text-amber-600 dark:text-amber-400 text-base flex-shrink-0 mt-0.5" aria-hidden="true">⚠</span>
            <p>
              Umrechnung ist immer eine Näherung. Hochschulen haben teils eigene Umrechnungstabellen. Im Zweifelsfall die Zieleinrichtung direkt kontaktieren.
            </p>
          </div>

          {/* Umrechnungstabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Umrechnungstabelle</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="col" className="px-4 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">Deutsche Note</th>
                    <th scope="col" className="px-4 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">GPA</th>
                    <th scope="col" className="px-4 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">UK</th>
                    <th scope="col" className="px-4 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">ECTS</th>
                    <th scope="col" className="px-4 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">Bewertung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {UMRECHNUNGSTABELLE.map((z, i) => {
                    const isHighlighted = i === highlightIndex;
                    return (
                      <tr
                        key={z.deutscheNote}
                        className={
                          isHighlighted
                            ? 'bg-primary-50 dark:bg-primary-500/15'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                        }
                      >
                        <td className={`px-4 py-2 font-bold ${notenFarbe(z.deutscheNote)}`}>
                          {z.deutscheNoteFormatiert}
                          {isHighlighted && (
                            <span className="ml-2 text-xs font-medium text-primary-600 dark:text-primary-400" aria-label="aktuelle Auswahl">←</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{z.gpa.toFixed(2)}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{z.ukClassification}</td>
                        <td className="px-4 py-2 font-semibold text-gray-800 dark:text-gray-200">{z.ectsGrade}</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400 capitalize">{z.bewertung}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CrossLinks */}
          <CrossLink href="/mathe/notenschluessel-rechner" emoji="📝" text="Notenschlüssel erstellen" />
          <CrossLink href="/mathe/abi-rechner" emoji="🎓" text="Abiturnote berechnen" />
          <CrossLink href="/mathe/durchschnitt-rechner" emoji="📊" text="Durchschnitt berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText}
            seitenTitel="Noten-Umrechner (international)"
          />

          <AiExplain
            rechnerName="Noten-Umrechner (international)"
            eingaben={{ notensystem: system, eingabe: eingabeWert }}
            ergebnis={{
              deutscheNote: ergebnis.deutscheNote,
              gpa: ergebnis.gpa,
              ukClassification: ergebnis.ukClassification,
              ectsGrade: ergebnis.ectsGrade,
              bewertung: ergebnis.bewertung,
            }}
          />
        </div>
      )}
    </div>
  );
}
