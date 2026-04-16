'use client';

import { useState, useMemo } from 'react';
import {
  berechneRechtsschutz,
  BAUSTEINE,
  type Lebenssituation,
  type Zahlweise,
  type Beruf,
} from '@/lib/berechnungen/rechtsschutz';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const LEBENSSITUATIONEN: { value: Lebenssituation; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'familie', label: 'Familie / Paar' },
  { value: 'single-kind', label: 'Single mit Kind' },
];

const SELBSTBETEILIGUNGEN = [0, 150, 250, 500];

const ZAHLWEISEN: { value: Zahlweise; label: string }[] = [
  { value: 'monatlich', label: 'Monatlich' },
  { value: 'vierteljaehrlich', label: 'Vierteljährlich' },
  { value: 'jaehrlich', label: 'Jährlich' },
];

const BERUFE: { value: Beruf; label: string }[] = [
  { value: 'angestellt', label: 'Angestellt' },
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'beamter', label: 'Beamter' },
  { value: 'rentner', label: 'Rentner' },
  { value: 'student', label: 'Student' },
];

const TYPISCHE_KOSTEN = [
  { label: 'Arbeitsrechtliche Beratung', kosten: '250–500 €', icon: '💼' },
  { label: 'Kündigungsschutzklage', kosten: '3.000–8.000 €', icon: '⚖️' },
  { label: 'Verkehrsunfall-Streit', kosten: '1.500–5.000 €', icon: '🚗' },
  { label: 'Mietstreitigkeit', kosten: '1.000–3.000 €', icon: '🏠' },
];

export default function RechtsschutzRechner() {
  const [lebenssituation, setLebenssituation] = useState<Lebenssituation>('single');
  const [bausteine, setBausteine] = useState<string[]>(['privat', 'beruf', 'verkehr']);
  const [selbstbeteiligung, setSelbstbeteiligung] = useState(150);
  const [zahlweise, setZahlweise] = useState<Zahlweise>('monatlich');
  const [beruf, setBeruf] = useState<Beruf>('angestellt');

  const toggleBaustein = (key: string) => {
    setBausteine(prev =>
      prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]
    );
  };

  const ergebnis = useMemo(() => {
    return berechneRechtsschutz({
      lebenssituation,
      bausteine,
      selbstbeteiligung,
      zahlweise,
      beruf,
    });
  }, [lebenssituation, bausteine, selbstbeteiligung, zahlweise, beruf]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Lebenssituation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lebenssituation
          </label>
          <div className="flex gap-2">
            {LEBENSSITUATIONEN.map(ls => (
              <button
                key={ls.value}
                onClick={() => setLebenssituation(ls.value)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  lebenssituation === ls.value
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {ls.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bausteine */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gewünschte Bausteine
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BAUSTEINE.map(b => {
              const aktiv = bausteine.includes(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => toggleBaustein(b.key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    aktiv
                      ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-500/10'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    aktiv ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    {aktiv && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${aktiv ? 'text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {b.label}
                  </span>
                </button>
              );
            })}
          </div>
          {bausteine.length === 0 && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Bitte wählen Sie mindestens einen Baustein.</p>
          )}
        </div>

        {/* Selbstbeteiligung */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Selbstbeteiligung
          </label>
          <div className="flex gap-2">
            {SELBSTBETEILIGUNGEN.map(sb => (
              <button
                key={sb}
                onClick={() => setSelbstbeteiligung(sb)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selbstbeteiligung === sb
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {sb === 0 ? 'Keine' : `${sb} €`}
              </button>
            ))}
          </div>
        </div>

        {/* Zahlweise + Beruf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rechtsschutz-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zahlweise
            </label>
            <select id="rechtsschutz-select-1"
              value={zahlweise}
              onChange={e => setZahlweise(e.target.value as Zahlweise)}
              className="input-field"
            >
              {ZAHLWEISEN.map(z => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rechtsschutz-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Beruf
            </label>
            <select id="rechtsschutz-select-2"
              value={beruf}
              onChange={e => setBeruf(e.target.value as Beruf)}
              className="input-field"
            >
              {BERUFE.map(b => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Geschätzter Monatsbeitrag</p>
            <p className="text-5xl font-bold">ca. {fmt(ergebnis.monatsbeitrag)} <span className="text-2xl">€</span></p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jahresbeitrag</p>
                <p className="text-lg font-bold">ca. {fmt(ergebnis.jahresbeitrag)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Bausteine</p>
                <p className="text-lg font-bold">{ergebnis.bausteinDetails.length} aktiv</p>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung nach Bausteinen */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung nach Bausteinen</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.bausteinDetails.map(d => (
                <div key={d.label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{d.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">ca. {fmt(d.nachAbzug)} €/Mon.</span>
                </div>
              ))}
              {ergebnis.selbstbeteiligungRabattProzent > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <span>Selbstbeteiligung ({selbstbeteiligung} €)</span>
                  <span>−{ergebnis.selbstbeteiligungRabattProzent.toFixed(0)}%</span>
                </div>
              )}
              {ergebnis.zahlweiseRabattProzent > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <span>Zahlweise ({ZAHLWEISEN.find(z => z.value === zahlweise)?.label})</span>
                  <span>−{ergebnis.zahlweiseRabattProzent.toFixed(0)}%</span>
                </div>
              )}
              {ergebnis.berufFaktorProzent !== 0 && (
                <div className={`flex justify-between px-4 py-3 text-sm ${
                  ergebnis.berufFaktorProzent < 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  <span>Beruf ({BERUFE.find(b => b.value === beruf)?.label})</span>
                  <span>{ergebnis.berufFaktorProzent > 0 ? '+' : ''}{ergebnis.berufFaktorProzent.toFixed(0)}%</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Geschätzter Monatsbeitrag</span>
                <span className="text-primary-600 dark:text-primary-400">ca. {fmt(ergebnis.monatsbeitrag)} €</span>
              </div>
            </div>
          </div>

          {/* Wann lohnt es sich? */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Ab wann lohnt sich Rechtsschutz?</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Ein einzelner Rechtsstreit kann schnell Ihre Jahresbeiträge übersteigen. Typische Anwalts- und Gerichtskosten:
              </p>
              <div className="space-y-2">
                {TYPISCHE_KOSTEN.map(tk => {
                  return (
                    <div key={tk.label} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span>{tk.icon}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tk.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{tk.kosten}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-3">
                <p className="text-sm text-green-700 dark:text-green-400">
                  <strong>Fazit:</strong> Schon eine Kündigungsschutzklage (ab 3.000 €) übersteigt Ihren Jahresbeitrag von ca. {fmt(ergebnis.jahresbeitrag)} € um ein Vielfaches.
                </p>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Diese Berechnung zeigt geschätzte Durchschnittswerte. Der tatsächliche Beitrag hängt von Anbieter, Vorschäden und individuellen Faktoren ab.
            </p>
          </div>

          <CrossLink href="/arbeit/kuendigungsfrist-rechner" emoji="📅" text="Kündigungsfrist bei Jobverlust prüfen" />
          <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Rechtsschutzversicherung: ca. ${fmt(ergebnis.monatsbeitrag)} €/Monat (${fmt(ergebnis.jahresbeitrag)} €/Jahr) — ${ergebnis.bausteinDetails.map(d => d.label).join(', ')}`}
            seitenTitel="Rechtsschutz-Rechner"
          />

          <AffiliateBox programId="ks-auxilia" context="rechtsschutz" />

          <AiExplain
            rechnerName="Rechtsschutz-Rechner"
            eingaben={{
              lebenssituation,
              bausteine: bausteine.join(', '),
              selbstbeteiligungEuro: selbstbeteiligung,
              zahlweise,
              beruf,
            }}
            ergebnis={{
              geschaetzterMonatsbeitragEuro: ergebnis.monatsbeitrag,
              jahresbeitragEuro: ergebnis.jahresbeitrag,
              anzahlBausteine: ergebnis.bausteinDetails.length,
            }}
          />
        </>
      )}
    </div>
  );
}
