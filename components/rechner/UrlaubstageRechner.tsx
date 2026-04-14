'use client';

import { useState, useMemo } from 'react';
import {
  berechneUrlaubsanspruch,
  berechneResturlaub,
  type UrlaubsanspruchEingabe,
  type ResturlaubEingabe,
} from '@/lib/berechnungen/urlaubstage';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import { AffiliateBox } from '@/components/AffiliateBox';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'anspruch' | 'resturlaub';

const fmtZahl = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

export default function UrlaubstageRechner() {
  const [modus, setModus] = useState<Modus>('anspruch');

  // Modus 1: Urlaubsanspruch
  const [vertraglicheTage, setVertraglicheTage] = useState('30');
  const [arbeitstageProWoche, setArbeitstageProWoche] = useState<5 | 6>(5);
  const [beschaeftigungsBeginn, setBeschaeftigungsBeginn] = useState('');
  const [beschaeftigungsEnde, setBeschaeftigungsEnde] = useState('');
  const [teilzeit, setTeilzeit] = useState(false);
  const [teilzeitTage, setTeilzeitTage] = useState('3');
  const [schwerbehindert, setSchwerbehindert] = useState(false);

  // Modus 2: Resturlaub
  const [urlaubstageProJahr, setUrlaubstageProJahr] = useState('30');
  const [restArbeitstage, setRestArbeitstage] = useState<5 | 6>(5);
  const [kuendigungsDatum, setKuendigungsDatum] = useState('');
  const [bereitsGenommen, setBereitsGenommen] = useState('10');

  const anspruchEingabe: UrlaubsanspruchEingabe = useMemo(() => ({
    vertraglicheTage: parseInt(vertraglicheTage, 10) || 0,
    arbeitstageProWoche,
    beschaeftigungsBeginn: beschaeftigungsBeginn || null,
    beschaeftigungsEnde: beschaeftigungsEnde || null,
    teilzeit,
    teilzeitTage: parseInt(teilzeitTage, 10) || 0,
    schwerbehindert,
  }), [vertraglicheTage, arbeitstageProWoche, beschaeftigungsBeginn, beschaeftigungsEnde, teilzeit, teilzeitTage, schwerbehindert]);

  const resturlaubEingabe: ResturlaubEingabe = useMemo(() => ({
    urlaubstageProJahr: parseInt(urlaubstageProJahr, 10) || 0,
    arbeitstageProWoche: restArbeitstage,
    kuendigungsDatum,
    bereitsGenommen: parseInt(bereitsGenommen, 10) || 0,
  }), [urlaubstageProJahr, restArbeitstage, kuendigungsDatum, bereitsGenommen]);

  const anspruchErgebnis = useMemo(() => berechneUrlaubsanspruch(anspruchEingabe), [anspruchEingabe]);
  const resturlaubErgebnis = useMemo(() => berechneResturlaub(resturlaubEingabe), [resturlaubEingabe]);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: 'anspruch' as Modus, label: 'Urlaubsanspruch berechnen' },
          { key: 'resturlaub' as Modus, label: 'Resturlaub bei Kündigung' },
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

      {/* Modus 1: Urlaubsanspruch */}
      {modus === 'anspruch' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vertragliche Urlaubstage/Jahr</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={vertraglicheTage}
                onChange={e => setVertraglicheTage(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche</label>
              <select
                value={arbeitstageProWoche}
                onChange={e => setArbeitstageProWoche(parseInt(e.target.value, 10) as 5 | 6)}
                className="input-field w-full"
              >
                <option value={5}>5-Tage-Woche</option>
                <option value={6}>6-Tage-Woche</option>
              </select>
            </div>
          </div>

          {/* Unterjährig */}
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Beschäftigungszeitraum (optional)</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Eintritt</label>
              <input
                type="date"
                value={beschaeftigungsBeginn}
                onChange={e => setBeschaeftigungsBeginn(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Austritt</label>
              <input
                type="date"
                value={beschaeftigungsEnde}
                onChange={e => setBeschaeftigungsEnde(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            Leer lassen = volles Kalenderjahr. Bei Eintritt/Austritt im laufenden Jahr wird der Urlaub anteilig berechnet (§ 5 BUrlG).
          </p>

          {/* Teilzeit */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setTeilzeit(!teilzeit)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                teilzeit ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                teilzeit ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">Teilzeit</span>
          </div>
          {teilzeit && (
            <div className="mb-4">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche (Teilzeit)</label>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max={arbeitstageProWoche - 1}
                value={teilzeitTage}
                onChange={e => setTeilzeitTage(e.target.value)}
                className="input-field w-32"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Umrechnung: {teilzeitTage}/{arbeitstageProWoche} der Vollzeit-Tage
              </p>
            </div>
          )}

          {/* Schwerbehinderung */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSchwerbehindert(!schwerbehindert)}
              className={`w-10 h-6 rounded-full transition-all relative ${
                schwerbehindert ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                schwerbehindert ? 'left-[18px]' : 'left-0.5'
              }`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">Schwerbehindert (GdB ≥ 50)</span>
          </div>

          {/* Ergebnis */}
          {anspruchErgebnis && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Ihr Urlaubsanspruch</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZahl(anspruchErgebnis.gesamt)} Tage
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  ≈ {fmtZahl(anspruchErgebnis.wochen)} Wochen Urlaub
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesetzl. Minimum</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {anspruchErgebnis.gesetzlichMinimum} Tage
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Über Minimum</p>
                  <p className={`text-lg font-bold ${
                    anspruchErgebnis.ueberMinimum >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {anspruchErgebnis.ueberMinimum >= 0 ? '+' : ''}{fmtZahl(anspruchErgebnis.ueberMinimum)} Tage
                  </p>
                </div>
              </div>

              {/* Aufschlüsselung */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {anspruchErgebnis.aufschluesselung.map((z, i) => (
                    <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                      i === anspruchErgebnis.aufschluesselung.length - 1
                        ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      <span>{z.label}</span>
                      <span className="font-medium">{z.wert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CrossLink href="/arbeit/arbeitstage-rechner" emoji="📅" text="Arbeitstage pro Bundesland berechnen" />
              <CrossLink href="/arbeit/teilzeit-rechner" emoji="⏱️" text="Urlaub bei Teilzeit berechnen" />

              <ErgebnisAktionen
                ergebnisText={`Urlaubsanspruch: ${fmtZahl(anspruchErgebnis.gesamt)} Tage (${fmtZahl(anspruchErgebnis.wochen)} Wochen)`}
                seitenTitel="Urlaubstage berechnen"
              />

              <AiExplain
                rechnerName="Urlaubstage-Rechner"
                eingaben={{ vertraglicheTage: parseInt(vertraglicheTage, 10) || 0, arbeitstageProWoche, teilzeit, schwerbehindert }}
                ergebnis={{ gesamt: anspruchErgebnis.gesamt, wochen: anspruchErgebnis.wochen, gesetzlichMinimum: anspruchErgebnis.gesetzlichMinimum, ueberMinimum: anspruchErgebnis.ueberMinimum }}
              />

              {anspruchErgebnis.ueberMinimum < 0 && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
                  <p className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                    <span className="shrink-0">⚠️</span>
                    <span>Der berechnete Urlaub liegt unter dem gesetzlichen Minimum von {anspruchErgebnis.gesetzlichMinimum} Tagen bei einer {arbeitstageProWoche}-Tage-Woche. Der Arbeitgeber muss mindestens den gesetzlichen Mindesturlaub gewähren.</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modus 2: Resturlaub bei Kündigung */}
      {modus === 'resturlaub' && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Urlaubstage pro Jahr</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={urlaubstageProJahr}
                onChange={e => setUrlaubstageProJahr(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Arbeitstage pro Woche</label>
              <select
                value={restArbeitstage}
                onChange={e => setRestArbeitstage(parseInt(e.target.value, 10) as 5 | 6)}
                className="input-field w-full"
              >
                <option value={5}>5-Tage-Woche</option>
                <option value={6}>6-Tage-Woche</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Kündigungsdatum</label>
              <input
                type="date"
                value={kuendigungsDatum}
                onChange={e => setKuendigungsDatum(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bereits genommene Tage</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="365"
                value={bereitsGenommen}
                onChange={e => setBereitsGenommen(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Ergebnis */}
          {resturlaubErgebnis && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Resturlaub</p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmtZahl(resturlaubErgebnis.resturlaub)} Tage
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {resturlaubErgebnis.vollerAnspruch
                    ? 'Voller Jahresanspruch (Austritt in 2. Jahreshälfte)'
                    : 'Anteiliger Anspruch (Austritt in 1. Jahreshälfte)'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Anspruch</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {fmtZahl(resturlaubErgebnis.anspruchBisKuendigung)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Genommen</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {resturlaubErgebnis.bereitsGenommen}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rest</p>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {fmtZahl(resturlaubErgebnis.resturlaub)}
                  </p>
                </div>
              </div>

              {/* Aufschlüsselung */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {resturlaubErgebnis.aufschluesselung.map((z, i) => (
                    <div key={i} className={`flex justify-between px-4 py-3 text-sm ${
                      i === resturlaubErgebnis.aufschluesselung.length - 1
                        ? 'bg-primary-50/50 dark:bg-primary-500/5 font-bold text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      <span>{z.label}</span>
                      <span className="font-medium">{z.wert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ErgebnisAktionen
                ergebnisText={`Resturlaub: ${fmtZahl(resturlaubErgebnis.resturlaub)} Tage (Anspruch: ${fmtZahl(resturlaubErgebnis.anspruchBisKuendigung)}, genommen: ${resturlaubErgebnis.bereitsGenommen})`}
                seitenTitel="Urlaubstage berechnen"
              />

              {/* Hinweis */}
              <div className={`rounded-xl p-4 ${
                resturlaubErgebnis.resturlaub > 0
                  ? 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30'
                  : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
              }`}>
                <p className={`text-sm flex gap-2 ${
                  resturlaubErgebnis.resturlaub > 0
                    ? 'text-blue-800 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <span className="shrink-0">💡</span>
                  <span>{resturlaubErgebnis.hinweis}</span>
                </p>
              </div>
            </div>
          )}

          {!resturlaubErgebnis && kuendigungsDatum && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4 mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Bitte geben Sie ein gültiges Kündigungsdatum und positive Urlaubstage ein.
              </p>
            </div>
          )}
        </div>
      )}

      {(anspruchErgebnis || resturlaubErgebnis) && (
        <AffiliateBox programId="ks-auxilia" context="urlaubstage" />
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
        Allgemeine Information auf Basis des BUrlG. Tarifverträge und Betriebsvereinbarungen können abweichende Regelungen enthalten. Für verbindliche Auskünfte wenden Sie sich an einen Fachanwalt für Arbeitsrecht.
      </p>
    </div>
  );
}
