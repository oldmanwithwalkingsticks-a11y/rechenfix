'use client';

import { useState, useMemo } from 'react';
import { berechneRaucherKosten } from '@/lib/berechnungen/raucher';
import { clampInputValue } from '@/lib/zahlenformat';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

function formatEuro(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatZahl(n: number): string {
  return Math.round(n).toLocaleString('de-DE');
}

export default function RaucherRechner() {
  const [zigarettenProTag, setZigarettenProTag] = useState('15');
  const [preisProPackung, setPreisProPackung] = useState('9,00');
  const [zigarettenProPackung, setZigarettenProPackung] = useState('20');
  const [jahreGeraucht, setJahreGeraucht] = useState('10');

  const ergebnis = useMemo(() => {
    const zt = parseFloat(zigarettenProTag) || 0;
    const pp = parseFloat(preisProPackung.replace(',', '.')) || 0;
    const zp = parseFloat(zigarettenProPackung) || 0;
    const jr = parseFloat(jahreGeraucht) || 0;

    if (zt <= 0 || pp <= 0 || zp <= 0 || jr <= 0) return null;

    return berechneRaucherKosten({
      zigarettenProTag: zt,
      preisProPackung: pp,
      zigarettenProPackung: zp,
      jahreGeraucht: jr,
    });
  }, [zigarettenProTag, preisProPackung, zigarettenProPackung, jahreGeraucht]);

  function ergebnisText(): string {
    if (!ergebnis) return '';
    const lines = [
      'Raucher-Rechner — Ergebnis',
      '',
      `Kosten pro Tag: ${formatEuro(ergebnis.kostenProTag)} €`,
      `Kosten pro Woche: ${formatEuro(ergebnis.kostenProWoche)} €`,
      `Kosten pro Monat: ${formatEuro(ergebnis.kostenProMonat)} €`,
      `Kosten pro Jahr: ${formatEuro(ergebnis.kostenProJahr)} €`,
      '',
      `Bisherige Gesamtkosten: ${formatEuro(ergebnis.kostenGesamt)} €`,
      `In den nächsten 10 Jahren: ${formatEuro(ergebnis.kostenNaechste10Jahre)} €`,
      `Zigaretten gesamt: ${formatZahl(ergebnis.zigarettenGesamt)} Stück`,
      '',
      `Mit 5% Rendite angelegt wären es heute: ${formatEuro(ergebnis.investmentWert)} €`,
    ];
    return lines.join('\n');
  }

  return (
    <div className="space-y-6">
      {/* Eingabe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="zigarettenProTag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zigaretten pro Tag
          </label>
          <input
            id="zigarettenProTag"
            type="number"
            min="1"
            max="100"
            value={zigarettenProTag}
            onChange={e => setZigarettenProTag(clampInputValue(e.target.value, 1, 100))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="preisProPackung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Preis pro Packung (€)
          </label>
          <input
            id="preisProPackung"
            type="text"
            inputMode="decimal"
            value={preisProPackung}
            onChange={e => setPreisProPackung(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="zigarettenProPackung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zigaretten pro Packung
          </label>
          <input
            id="zigarettenProPackung"
            type="number"
            min="1"
            max="50"
            value={zigarettenProPackung}
            onChange={e => setZigarettenProPackung(clampInputValue(e.target.value, 1, 50))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="jahreGeraucht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Seit wie vielen Jahren rauchen Sie?
          </label>
          <input
            id="jahreGeraucht"
            type="number"
            min="1"
            max="80"
            value={jahreGeraucht}
            onChange={e => setJahreGeraucht(clampInputValue(e.target.value, 1, 80))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-6">
          {/* Gesamtkosten-Header */}
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-700/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bisher insgesamt ausgegeben</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-red-600 dark:text-red-400">
              {formatEuro(ergebnis.kostenGesamt)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              in {jahreGeraucht} Jahr{parseFloat(jahreGeraucht) !== 1 ? 'en' : ''}
            </p>
          </div>

          {/* Kosten-Übersicht */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Tag</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatEuro(ergebnis.kostenProTag)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Woche</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatEuro(ergebnis.kostenProWoche)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Monat</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatEuro(ergebnis.kostenProMonat)} €</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pro Jahr</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatEuro(ergebnis.kostenProJahr)} €</p>
            </div>
          </div>

          {/* Zukunft */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Blick in die Zukunft</h2>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">In den n&auml;chsten 10 Jahren</span>
              <span className="font-bold text-red-600 dark:text-red-400 text-lg">{formatEuro(ergebnis.kostenNaechste10Jahre)} €</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Zigaretten pro Jahr</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatZahl(ergebnis.zigarettenProJahr)} St&uuml;ck</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Gesamte Zigaretten in Ihrem Leben</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatZahl(ergebnis.zigarettenGesamt)} St&uuml;ck</span>
            </div>
          </div>

          {/* Was Sie dafür kaufen könnten */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Daf&uuml;r k&ouml;nnten Sie kaufen:
            </h2>
            <div className={`grid grid-cols-1 ${ergebnis.reichtFuerKleinwagen ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3`}>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-4 text-center transition-transform hover:-translate-y-0.5">
                <span className="text-3xl">✈️</span>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">{ergebnis.anzahlUrlaube}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Urlaube (&agrave; 2.000 €)</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl p-4 text-center transition-transform hover:-translate-y-0.5">
                <span className="text-3xl">📱</span>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-2">{ergebnis.anzahlIphones}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">iPhones (&agrave; 1.200 €)</p>
              </div>
              {ergebnis.reichtFuerKleinwagen && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-xl p-4 text-center transition-transform hover:-translate-y-0.5">
                  <span className="text-3xl">🚗</span>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">1+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kleinwagen (ab 15.000 €)</p>
                </div>
              )}
            </div>
          </div>

          {/* Investment-Vergleich */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">📈 Was w&auml;re, wenn&hellip;</h2>
            <p className="text-gray-700 dark:text-gray-300">
              H&auml;tten Sie das Geld statt in Zigaretten mit <strong>5 % Rendite</strong> angelegt, h&auml;tten Sie heute:
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-green-700 dark:text-green-400 mt-3">
              {formatEuro(ergebnis.investmentWert)} €
            </p>
            <p className="text-sm text-green-600 dark:text-green-500 mt-1">
              statt {formatEuro(ergebnis.kostenGesamt)} € Rauchkosten &ndash; eine Differenz von {formatEuro(ergebnis.investmentWert - ergebnis.kostenGesamt)} €
            </p>
          </div>

          {/* Motivations-Tipp */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl p-4">
            <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">💡 Aufh&ouml;ren lohnt sich</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Schon nach einem Monat ohne Zigaretten sparen Sie <strong>{formatEuro(ergebnis.kostenProMonat)} €</strong>.
              Nach einem Jahr sind es <strong>{formatEuro(ergebnis.kostenProJahr)} €</strong> &ndash;
              genug f&uuml;r {ergebnis.kostenProJahr >= URLAUB_PREIS ? `${Math.floor(ergebnis.kostenProJahr / URLAUB_PREIS)} Urlaub${Math.floor(ergebnis.kostenProJahr / URLAUB_PREIS) > 1 ? 'e' : ''}` : 'einen schönen Kurzurlaub'}!
              Die Bundeszentrale f&uuml;r gesundheitliche Aufkl&auml;rung (BZgA) bietet kostenlose Beratung unter 0800 8 31 31 31.
            </p>
          </div>

          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf nach Rauchstopp berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText()}
            seitenTitel="Raucher-Rechner"
          />

          <AiExplain
            rechnerName="Raucher-Rechner"
            eingaben={{ zigarettenProTag: parseFloat(zigarettenProTag), preisProPackung: parseFloat(preisProPackung.replace(',', '.')), jahreGeraucht: parseFloat(jahreGeraucht) }}
            ergebnis={{ kostenProJahr: ergebnis.kostenProJahr, kostenGesamt: ergebnis.kostenGesamt, kostenNaechste10Jahre: ergebnis.kostenNaechste10Jahre, zigarettenGesamt: ergebnis.zigarettenGesamt, investmentWert: ergebnis.investmentWert }}
          />

          <AffiliateBox programId="burdaZahn" context="raucher" />
        </div>
      )}
    </div>
  );
}

const URLAUB_PREIS = 2000;
