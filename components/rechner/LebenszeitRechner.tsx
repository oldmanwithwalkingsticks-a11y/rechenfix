'use client';

import { useState } from 'react';
import { berechneLebenszeit, type LebenszeitErgebnis } from '@/lib/berechnungen/lebenszeit';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

function formatZahl(n: number): string {
  return Math.round(n).toLocaleString('de-DE');
}

function FaktKarte({ icon, label, wert, einheit, farbe = 'primary' }: {
  icon: string;
  label: string;
  wert: string;
  einheit?: string;
  farbe?: 'primary' | 'green' | 'amber' | 'red' | 'purple' | 'blue';
}) {
  const farbKlassen: Record<string, string> = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700/30',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/30',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/30',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/30',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/30',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/30',
  };

  return (
    <div className={`rounded-xl border p-4 ${farbKlassen[farbe]} transition-transform hover:-translate-y-0.5`}>
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        {wert}
        {einheit && <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">{einheit}</span>}
      </p>
    </div>
  );
}

export default function LebenszeitRechner() {
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [geschlecht, setGeschlecht] = useState<'maennlich' | 'weiblich'>('maennlich');
  const [ergebnis, setErgebnis] = useState<LebenszeitErgebnis | null>(null);
  const [fehler, setFehler] = useState('');

  function berechnen() {
    setFehler('');
    setErgebnis(null);

    if (!geburtsdatum) {
      setFehler('Bitte geben Sie Ihr Geburtsdatum ein.');
      return;
    }

    const datum = new Date(geburtsdatum + 'T00:00:00');
    if (isNaN(datum.getTime())) {
      setFehler('Ungültiges Datum.');
      return;
    }

    if (datum.getTime() > Date.now()) {
      setFehler('Das Geburtsdatum darf nicht in der Zukunft liegen.');
      return;
    }

    const result = berechneLebenszeit({ geburtsdatum: datum, geschlecht });
    setErgebnis(result);
  }

  function ergebnisText(): string {
    if (!ergebnis) return '';
    const lines = [
      `Lebenszeit-Rechner — Ergebnis`,
      `Alter: ${ergebnis.alterJahre} Jahre, ${ergebnis.alterMonate} Monate, ${ergebnis.alterTageRest} Tage`,
      `Gelebte Tage: ${formatZahl(ergebnis.gesamtTage)}`,
      `Gelebte Stunden: ${formatZahl(ergebnis.gesamtStunden)}`,
      `Herzschläge: ca. ${formatZahl(ergebnis.herzschlaege)}`,
      `Davon geschlafen: ca. ${ergebnis.jahreGeschlafen.toFixed(1)} Jahre`,
      `Smartphone-Zeit: ca. ${formatZahl(ergebnis.stundenSmartphone)} Stunden`,
      `Statistische Lebenserwartung: ${ergebnis.lebenserwartung} Jahre`,
      `Verbleibende Tage: ca. ${formatZahl(ergebnis.verbleibendeTage)}`,
      `Verbleibende Wochenenden: ca. ${formatZahl(ergebnis.verbleibendeWochenenden)}`,
      `Lebenszeit gelebt: ${ergebnis.prozentGelebt.toFixed(1)}%`,
    ];
    return lines.join('\n');
  }

  return (
    <div className="space-y-6">
      {/* Eingabe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="geburtsdatum" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Geburtsdatum
          </label>
          <input
            id="geburtsdatum"
            type="date"
            value={geburtsdatum}
            onChange={e => setGeburtsdatum(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="geschlecht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Geschlecht
          </label>
          <select id="geschlecht"
            value={geschlecht}
            onChange={e => setGeschlecht(e.target.value as 'maennlich' | 'weiblich')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="maennlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
          </select>
        </div>
      </div>

      <button
        onClick={berechnen}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Lebenszeit berechnen
      </button>

      {fehler && (
        <p className="text-red-600 dark:text-red-400 text-sm">{fehler}</p>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-6">
          {/* Alter-Header */}
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/20 rounded-2xl border border-primary-200 dark:border-primary-700/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ihr Alter</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {ergebnis.alterJahre} Jahre, {ergebnis.alterMonate} Monate, {ergebnis.alterTageRest} Tage
            </p>
          </div>

          {/* Gelebte Zeit */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sie haben bereits gelebt:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FaktKarte icon="📅" label="Tage" wert={formatZahl(ergebnis.gesamtTage)} farbe="primary" />
              <FaktKarte icon="⏰" label="Stunden" wert={formatZahl(ergebnis.gesamtStunden)} farbe="blue" />
              <FaktKarte icon="⏱️" label="Minuten" wert={formatZahl(ergebnis.gesamtMinuten)} farbe="purple" />
            </div>
          </div>

          {/* Überraschende Fakten */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Überraschende Fakten über Ihre Lebenszeit:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FaktKarte
                icon="😴"
                label="Davon geschlafen"
                wert={`ca. ${ergebnis.jahreGeschlafen.toFixed(1)}`}
                einheit="Jahre"
                farbe="blue"
              />
              <FaktKarte
                icon="🍽️"
                label="Mit Essen verbracht"
                wert={`ca. ${ergebnis.jahreEssen.toFixed(1)}`}
                einheit="Jahre"
                farbe="amber"
              />
              <FaktKarte
                icon="📱"
                label="Am Smartphone"
                wert={`ca. ${formatZahl(ergebnis.stundenSmartphone)}`}
                einheit="Stunden"
                farbe="purple"
              />
              <FaktKarte
                icon="💼"
                label="Mit Arbeit verbracht"
                wert={`ca. ${ergebnis.jahreArbeit.toFixed(1)}`}
                einheit="Jahre"
                farbe="green"
              />
              <FaktKarte
                icon="❤️"
                label="Ihr Herz hat geschlagen"
                wert={`ca. ${formatZahl(ergebnis.herzschlaege)}`}
                einheit="Mal"
                farbe="red"
              />
              <FaktKarte
                icon="🌬️"
                label="Atemzüge"
                wert={`ca. ${formatZahl(ergebnis.atemzuege)}`}
                einheit="Mal"
                farbe="green"
              />
            </div>
          </div>

          {/* Lebenserwartung */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Statistische Lebenserwartung</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Lebenserwartung ({geschlecht === 'maennlich' ? 'Männer' : 'Frauen'} in DE):</span>
                <span className="font-semibold text-gray-900 dark:text-white">{ergebnis.lebenserwartung} Jahre</span>
              </div>

              {/* Fortschrittsbalken */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Ihre Lebenszeit</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">{ergebnis.prozentGelebt.toFixed(1)}%</span>
                </div>
                <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000"
                    style={{ width: `${Math.min(100, ergebnis.prozentGelebt)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Geburt</span>
                  <span>{ergebnis.lebenserwartung} Jahre</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verbleibende Tage</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    ca. {formatZahl(ergebnis.verbleibendeTage)}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verbleibende Wochenenden</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    ca. {formatZahl(ergebnis.verbleibendeWochenenden)}
                  </p>
                </div>
              </div>

              {ergebnis.prozentGelebt < 100 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
                  Nutzen Sie jedes Wochenende &ndash; es sind statistisch nur noch {formatZahl(ergebnis.verbleibendeWochenenden)} übrig!
                </p>
              )}
            </div>
          </div>

          <CrossLink href="/alltag/geburtstag-rechner" emoji="🎂" text="Geburtstag-Rechner — Alter exakt" />
          <CrossLink href="/gesundheit/schlaf-rechner" emoji="😴" text="Wie viel Schlaf brauche ich?" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText()}
            seitenTitel="Lebenszeit-Rechner"
          />

          <AiExplain
            rechnerName="Lebenszeit-Rechner"
            eingaben={{ alterJahre: ergebnis.alterJahre, geschlecht }}
            ergebnis={{ gesamtTage: ergebnis.gesamtTage, herzschlaege: ergebnis.herzschlaege, jahreGeschlafen: ergebnis.jahreGeschlafen, stundenSmartphone: ergebnis.stundenSmartphone, verbleibendeTage: ergebnis.verbleibendeTage, verbleibendeWochenenden: ergebnis.verbleibendeWochenenden, prozentGelebt: ergebnis.prozentGelebt }}
          />
        </div>
      )}
    </div>
  );
}
