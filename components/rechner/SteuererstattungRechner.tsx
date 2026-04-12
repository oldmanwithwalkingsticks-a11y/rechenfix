'use client';

import { useState, useMemo } from 'react';
import { berechneSteuererstattung } from '@/lib/berechnungen/steuererstattung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

const STEUERKLASSEN = [
  { value: 1, label: 'Steuerklasse I' },
  { value: 2, label: 'Steuerklasse II' },
  { value: 3, label: 'Steuerklasse III' },
  { value: 4, label: 'Steuerklasse IV' },
  { value: 5, label: 'Steuerklasse V' },
  { value: 6, label: 'Steuerklasse VI' },
];

export default function SteuererstattungRechner() {
  const [brutto, setBrutto] = useState('40000');
  const [steuerklasse, setSteuerklasse] = useState(1);
  const [entfernung, setEntfernung] = useState('15');
  const [arbeitstage, setArbeitstage] = useState('220');
  const [homeofficeTage, setHomeofficeTage] = useState('50');
  const [beruflicheAusgaben, setBeruflicheAusgaben] = useState('0');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [haushaltsnaheDL, setHaushaltsnaheDL] = useState('0');
  const [spenden, setSpenden] = useState('0');

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(brutto);
    if (b <= 0) return null;
    return berechneSteuererstattung({
      jahresbrutto: b,
      steuerklasse,
      entfernungKm: parseDeutscheZahl(entfernung),
      arbeitstage: parseDeutscheZahl(arbeitstage),
      homeofficeTage: parseDeutscheZahl(homeofficeTage),
      beruflicheAusgaben: parseDeutscheZahl(beruflicheAusgaben),
      kirchensteuer,
      haushaltsnaheDL: parseDeutscheZahl(haushaltsnaheDL),
      spenden: parseDeutscheZahl(spenden),
    });
  }, [brutto, steuerklasse, entfernung, arbeitstage, homeofficeTage, beruflicheAusgaben, kirchensteuer, haushaltsnaheDL, spenden]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Brutto + Steuerklasse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jahresbruttoeinkommen
            </label>
            <NummerEingabe value={brutto} onChange={setBrutto} einheit="€" placeholder="z.B. 40.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Steuerklasse
            </label>
            <select
              value={steuerklasse}
              onChange={e => setSteuerklasse(Number(e.target.value))}
              className="input-field"
            >
              {STEUERKLASSEN.map(sk => (
                <option key={sk.value} value={sk.value}>{sk.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pendler + Arbeitstage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Entfernung Wohnung–Arbeit (einfach)
            </label>
            <NummerEingabe value={entfernung} onChange={setEntfernung} einheit="km" placeholder="z.B. 25" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arbeitstage pro Jahr
            </label>
            <NummerEingabe value={arbeitstage} onChange={setArbeitstage} placeholder="220" />
          </div>
        </div>

        {/* Homeoffice + Berufsausgaben */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Homeoffice-Tage pro Jahr
            </label>
            <NummerEingabe value={homeofficeTage} onChange={setHomeofficeTage} placeholder="0" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">6 €/Tag, max. 1.260 €/Jahr</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Berufsbedingte Ausgaben
            </label>
            <NummerEingabe value={beruflicheAusgaben} onChange={setBeruflicheAusgaben} einheit="€" placeholder="0" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Fachliteratur, Fortbildung, Arbeitsmittel</p>
          </div>
        </div>

        {/* Kirchensteuer Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setKirchensteuer(!kirchensteuer)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
              kirchensteuer ? 'bg-green-500' : 'bg-red-400'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
              kirchensteuer ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Kirchensteuer zahlen
          </span>
        </div>

        {/* Haushaltsnahe DL + Spenden */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Haushaltsnahe Dienstleistungen
            </label>
            <NummerEingabe value={haushaltsnaheDL} onChange={setHaushaltsnaheDL} einheit="€" placeholder="0" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">z.B. Putzhilfe, Handwerker</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Spenden
            </label>
            <NummerEingabe value={spenden} onChange={setSpenden} einheit="€" placeholder="0" />
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Geschätzte Steuererstattung</p>
            <p className="text-5xl font-bold">
              {ergebnis.geschaetzteErstattung > 0 ? `ca. ${fmt(ergebnis.geschaetzteErstattung)}` : '0,00'} <span className="text-2xl">€</span>
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Werbungskosten</p>
                <p className="text-lg font-bold">{fmt(ergebnis.werbungskostenGesamt)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Über Pauschbetrag</p>
                <p className="text-lg font-bold">{fmt(ergebnis.werbungskostenUeberPauschbetrag)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Grenzsteuersatz</p>
                <p className="text-lg font-bold">{(ergebnis.grenzsteuersatz * 100).toFixed(0)} %</p>
              </div>
            </div>
          </div>

          {/* Motivations-Text */}
          {ergebnis.geschaetzteErstattung > 0 && (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Gut zu wissen:</strong> Im Durchschnitt erhalten Arbeitnehmer 1.063 € vom Finanzamt zurück. Ihre geschätzte Erstattung liegt bei <strong>{fmt(ergebnis.geschaetzteErstattung)} €</strong>.
                {ergebnis.geschaetzteErstattung > 1063
                  ? ' Das ist überdurchschnittlich — eine Steuererklärung lohnt sich auf jeden Fall!'
                  : ' Eine Steuererklärung lohnt sich in den meisten Fällen.'}
              </p>
            </div>
          )}

          {ergebnis.geschaetzteErstattung === 0 && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                <strong>Tipp:</strong> Mit Ihren aktuellen Angaben liegen Ihre Werbungskosten unter dem Pauschbetrag von 1.230 €. Prüfen Sie, ob Sie weitere absetzbare Ausgaben haben (z.B. Arbeitsmittel, Fortbildungen, Umzugskosten).
              </p>
            </div>
          )}

          {/* Aufschlüsselung */}
          {ergebnis.posten.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung der geschätzten Erstattung</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.posten.map(p => (
                  <div key={p.label} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{p.label}</span>
                      {p.info && <p className="text-xs text-gray-400 dark:text-gray-500">{p.info}</p>}
                    </div>
                    <span className="font-medium text-sm text-green-600 dark:text-green-400">+{fmt(p.betrag)} €</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-3 font-bold bg-primary-50/50 dark:bg-primary-500/5">
                  <span className="text-gray-800 dark:text-gray-100">Geschätzte Erstattung</span>
                  <span className="text-primary-600 dark:text-primary-400">ca. {fmt(ergebnis.geschaetzteErstattung)} €</span>
                </div>
              </div>
            </div>
          )}

          {/* Werbungskosten-Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Ihre Werbungskosten im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.pendlerpauschale > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pendlerpauschale</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.pendlerpauschale)} €</span>
                </div>
              )}
              {ergebnis.homeofficePauschale > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Homeoffice-Pauschale</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.homeofficePauschale)} €</span>
                </div>
              )}
              {parseDeutscheZahl(beruflicheAusgaben) > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Berufsbedingte Ausgaben</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(beruflicheAusgaben))} €</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Summe Werbungskosten</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.werbungskostenGesamt)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">./. Arbeitnehmer-Pauschbetrag</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">−1.230,00 €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Absetzbar über Pauschbetrag</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.werbungskostenUeberPauschbetrag)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Schätzung. Die tatsächliche Erstattung hängt von vielen weiteren Faktoren ab (Vorsorgeaufwendungen, Kinderfreibeträge, außergewöhnliche Belastungen etc.). Für eine exakte Berechnung nutzen Sie eine Steuersoftware oder einen Steuerberater.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Geschätzte Steuererstattung: ca. ${fmt(ergebnis.geschaetzteErstattung)} € (Werbungskosten: ${fmt(ergebnis.werbungskostenGesamt)} €, Grenzsteuersatz: ${(ergebnis.grenzsteuersatz * 100).toFixed(0)}%)`}
            seitenTitel="Steuererstattungs-Rechner"
          />

          {/* Affiliate-Boxen nebeneinander */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <AffiliateBox programId="wiso" context="steuererstattung" variant="full" />
            <AffiliateBox programId="smartsteuer" context="steuererstattung" variant="full" />
          </div>

          <AiExplain
            rechnerName="Steuererstattungs-Rechner"
            eingaben={{
              jahresbruttoEuro: parseDeutscheZahl(brutto),
              steuerklasse,
              entfernungKm: parseDeutscheZahl(entfernung),
              arbeitstage: parseDeutscheZahl(arbeitstage),
              homeofficeTage: parseDeutscheZahl(homeofficeTage),
              beruflicheAusgabenEuro: parseDeutscheZahl(beruflicheAusgaben),
              kirchensteuer,
              haushaltsnaheDLEuro: parseDeutscheZahl(haushaltsnaheDL),
              spendenEuro: parseDeutscheZahl(spenden),
            }}
            ergebnis={{
              geschaetzteErstattungEuro: ergebnis.geschaetzteErstattung,
              werbungskostenGesamtEuro: ergebnis.werbungskostenGesamt,
              grenzsteuersatzProzent: ergebnis.grenzsteuersatz * 100,
            }}
          />
        </>
      )}
    </div>
  );
}
