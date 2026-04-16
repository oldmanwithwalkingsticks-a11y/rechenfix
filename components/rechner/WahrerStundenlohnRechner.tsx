'use client';

import { useState, useMemo } from 'react';
import { berechneWahrenStundenlohn } from '@/lib/berechnungen/wahrer-stundenlohn';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

function formatEuro(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Eingabefeld({ id, label, value, onChange, suffix, type = 'text', inputMode = 'decimal' as const, min, max }: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  type?: string;
  inputMode?: 'decimal' | 'numeric';
  min?: string;
  max?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {suffix && <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{suffix}</span>}
      </div>
    </div>
  );
}

export default function WahrerStundenlohnRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [stunden, setStunden] = useState('40');
  const [pendel, setPendel] = useState('60');
  const [fahrt, setFahrt] = useState('100');
  const [essen, setEssen] = useState('8');
  const [kleidung, setKleidung] = useState('0');
  const [ueberstunden, setUeberstunden] = useState('3');

  function parse(v: string): number {
    return parseFloat(v.replace(',', '.')) || 0;
  }

  const ergebnis = useMemo(() => {
    const b = parse(brutto);
    const s = parse(stunden);
    if (b <= 0 || s <= 0) return null;
    return berechneWahrenStundenlohn({
      bruttoMonatlich: b,
      arbeitsstundenWoche: s,
      pendelzeitMinutenTag: parse(pendel),
      fahrtkostenMonat: parse(fahrt),
      essenProTag: parse(essen),
      kleidungMonat: parse(kleidung),
      ueberstundenWoche: parse(ueberstunden),
    });
  }, [brutto, stunden, pendel, fahrt, essen, kleidung, ueberstunden]);

  function ergebnisText(): string {
    if (!ergebnis) return '';
    return [
      'Wahrer Stundenlohn — Ergebnis',
      '',
      `Offizieller Netto-Stundenlohn: ${formatEuro(ergebnis.offiziellerStundenlohn)} €/h`,
      `Wahrer Stundenlohn: ${formatEuro(ergebnis.wahrerStundenlohn)} €/h`,
      `Differenz: -${formatEuro(ergebnis.differenzStundenlohn)} €/h (${ergebnis.differenzProzent.toFixed(0)}% weniger)`,
      '',
      `Versteckte Kosten pro Monat: ${formatEuro(ergebnis.abzuegeMonat)} €`,
      `Versteckte Arbeitszeit: +${ergebnis.pendelzeitStundenMonat.toFixed(0)}h Pendeln, +${ergebnis.ueberstundenMonat.toFixed(0)}h Überstunden`,
      `Wahrer Stundenlohn vs. Mindestlohn: ${ergebnis.uebermindestlohn >= 0 ? '+' : ''}${formatEuro(ergebnis.uebermindestlohn)} €`,
    ].join('\n');
  }

  return (
    <div className="space-y-6">
      {/* Eingabe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Eingabefeld id="brutto" label="Bruttogehalt monatlich" value={brutto} onChange={setBrutto} suffix="€" />
        <Eingabefeld id="stunden" label="Arbeitsstunden pro Woche" value={stunden} onChange={setStunden} suffix="h" />
        <Eingabefeld id="pendel" label="Pendelzeit pro Tag (hin + zurück)" value={pendel} onChange={setPendel} suffix="Min." />
        <Eingabefeld id="fahrt" label="Fahrtkosten pro Monat" value={fahrt} onChange={setFahrt} suffix="€" />
        <Eingabefeld id="essen" label="Mittagessen / Kaffee pro Tag" value={essen} onChange={setEssen} suffix="€" />
        <Eingabefeld id="kleidung" label="Arbeitskleidung / Reinigung pro Monat" value={kleidung} onChange={setKleidung} suffix="€" />
        <Eingabefeld id="ueberstunden" label="Unbezahlte Überstunden pro Woche" value={ueberstunden} onChange={setUeberstunden} suffix="h" />
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-6">
          {/* Vergleich: Offiziell vs. Wahr */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Offizieller Netto-Stundenlohn</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-600 dark:text-gray-400">
                {formatEuro(ergebnis.offiziellerStundenlohn)} €
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                {formatEuro(ergebnis.nettoMonatlich)} € netto &divide; {ergebnis.vertragsstundenMonat.toFixed(0)} h
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-700/30">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wahrer Stundenlohn</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-red-600 dark:text-red-400">
                {formatEuro(ergebnis.wahrerStundenlohn)} €
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatEuro(ergebnis.tatsaechlichesNetto)} € &divide; {ergebnis.tatsaechlicheStundenMonat.toFixed(0)} h
              </p>
            </div>
          </div>

          {/* Differenz-Highlight */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl p-5 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Sie verdienen <strong className="text-red-600 dark:text-red-400">wirklich {formatEuro(ergebnis.differenzStundenlohn)} € weniger</strong> pro Stunde als Sie denken.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Das sind <strong>{ergebnis.differenzProzent.toFixed(0)} %</strong> weniger &ndash; oder <strong>{formatEuro(ergebnis.jahresverlust)} € pro Jahr</strong>.
            </p>
          </div>

          {/* Aufschlüsselung: Zeit */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Wohin geht Ihre Zeit?</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {[
                { label: 'Vertragsarbeitszeit', wert: ergebnis.vertragsstundenMonat, farbe: 'bg-blue-500' },
                { label: 'Pendelzeit', wert: ergebnis.pendelzeitStundenMonat, farbe: 'bg-amber-500' },
                { label: 'Unbezahlte Überstunden', wert: ergebnis.ueberstundenMonat, farbe: 'bg-red-500' },
              ].map((item, i) => {
                const anteil = (item.wert / ergebnis.tatsaechlicheStundenMonat) * 100;
                return (
                  <div key={i} className={`px-4 py-3 ${i < 2 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.wert.toFixed(1)} h/Monat</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.farbe} rounded-full`} style={{ width: `${anteil}%` }} />
                    </div>
                  </div>
                );
              })}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Tats&auml;chliche Stunden gesamt</span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{ergebnis.tatsaechlicheStundenMonat.toFixed(1)} h/Monat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung: Geld */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Wohin geht Ihr Geld?</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Nettogehalt</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">+{formatEuro(ergebnis.nettoMonatlich)} €</span>
                </div>
              </div>
              {[
                { label: 'Fahrtkosten', wert: ergebnis.fahrtkostenMonat },
                { label: 'Essen & Kaffee', wert: ergebnis.essenskostenMonat },
                { label: 'Arbeitskleidung / Reinigung', wert: ergebnis.kleidungMonat },
              ].filter(item => item.wert > 0).map((item, i, arr) => (
                <div key={i} className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">&minus;{formatEuro(item.wert)} €</span>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Tats&auml;chliches Netto</span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{formatEuro(ergebnis.tatsaechlichesNetto)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mindestlohn-Vergleich */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.uebermindestlohn > 5
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/30'
              : ergebnis.uebermindestlohn > 0
              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/30'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/30'
          }`}>
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Vergleich mit Mindestlohn (12,82 €/h)</p>
            {ergebnis.uebermindestlohn > 0 ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Ihr wahrer Stundenlohn liegt <strong>{formatEuro(ergebnis.uebermindestlohn)} €</strong> &uuml;ber dem Mindestlohn.
                {ergebnis.uebermindestlohn < 3 && ' Das ist erstaunlich knapp!'}
              </p>
            ) : (
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Achtung:</strong> Ihr wahrer Stundenlohn liegt <strong>unter</strong> dem Mindestlohn!
                Pr&uuml;fen Sie, ob Pendelzeit und versteckte Kosten im Verh&auml;ltnis stehen.
              </p>
            )}
          </div>

          {/* Tipp */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-4">
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">💡 So erh&ouml;hen Sie Ihren wahren Stundenlohn</p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Homeoffice-Tage reduzieren Pendelzeit und Fahrtkosten</li>
              <li>&Uuml;berstunden dokumentieren und verg&uuml;ten lassen oder abfeiern</li>
              <li>Meal-Prep statt Kantine spart bis zu 150 € pro Monat</li>
              <li>Fahrgemeinschaften oder Jobticket nutzen</li>
            </ul>
          </div>

          <ErgebnisAktionen
            ergebnisText={ergebnisText()}
            seitenTitel="Wahrer Stundenlohn Rechner"
          />

          <AiExplain
            rechnerName="Wahrer Stundenlohn Rechner"
            eingaben={{ bruttoMonatlich: parse(brutto), arbeitsstundenWoche: parse(stunden), pendelzeitMinuten: parse(pendel), fahrtkostenMonat: parse(fahrt), essenProTag: parse(essen), kleidungMonat: parse(kleidung), ueberstundenWoche: parse(ueberstunden) }}
            ergebnis={{ offiziellerStundenlohn: ergebnis.offiziellerStundenlohn, wahrerStundenlohn: ergebnis.wahrerStundenlohn, differenzProzent: ergebnis.differenzProzent, uebermindestlohn: ergebnis.uebermindestlohn, tatsaechlichesNetto: ergebnis.tatsaechlichesNetto }}
          />
        </div>
      )}
    </div>
  );
}
