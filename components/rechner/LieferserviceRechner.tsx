'use client';

import { useState, useMemo } from 'react';
import { berechneLieferservice } from '@/lib/berechnungen/lieferservice';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function LieferserviceRechner() {
  const [bestellungenProWoche, setBestellungenProWoche] = useState(3);
  const [bestellwert, setBestellwert] = useState('25');
  const [liefergebuehr, setLiefergebuehr] = useState('3');
  const [trinkgeld, setTrinkgeld] = useState('2');

  const parse = (v: string) => parseFloat(v.replace(',', '.')) || 0;

  const ergebnis = useMemo(() => {
    if (bestellungenProWoche <= 0) return null;
    return berechneLieferservice({
      bestellungenProWoche,
      bestellwert: parse(bestellwert),
      liefergebuehr: parse(liefergebuehr),
      trinkgeld: parse(trinkgeld),
    });
  }, [bestellungenProWoche, bestellwert, liefergebuehr, trinkgeld]);

  return (
    <div>
      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Bestellungen pro Woche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bestellungen pro Woche</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBestellungenProWoche(Math.max(1, bestellungenProWoche - 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 w-8 text-center">{bestellungenProWoche}</span>
            <button
              onClick={() => setBestellungenProWoche(bestellungenProWoche + 1)}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Durchschnittliche Bestellung */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ø Bestellwert</label>
          <div className="relative">
            <input
              type="text"
              value={bestellwert}
              onChange={e => setBestellwert(e.target.value)}
              className="input-field pr-8"
              placeholder="z.B. 25,50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">€</span>
          </div>
        </div>

        {/* Liefergebühr */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Liefergebühr</label>
          <div className="relative">
            <input
              type="text"
              value={liefergebuehr}
              onChange={e => setLiefergebuehr(e.target.value)}
              className="input-field pr-8"
              placeholder="z.B. 2,99"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">€</span>
          </div>
        </div>

        {/* Trinkgeld */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trinkgeld</label>
          <div className="relative">
            <input
              type="text"
              value={trinkgeld}
              onChange={e => setTrinkgeld(e.target.value)}
              className="input-field pr-8"
              placeholder="z.B. 1,50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">€</span>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Ihre Lieferservice-Kosten pro Jahr</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.kostenProJahr)} €</p>
            <p className="text-white/70 text-sm mt-1">
              {bestellungenProWoche}× pro Woche × {fmt(ergebnis.kostenProBestellung)} € pro Bestellung
            </p>
          </div>

          {/* Zeitraum-Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-orange-50 dark:bg-orange-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Pro Monat</p>
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{fmt(ergebnis.kostenProMonat)} €</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Pro Jahr</p>
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{fmt(ergebnis.kostenProJahr)} €</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">In 5 Jahren</p>
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{fmt(ergebnis.kostenIn5Jahren)} €</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/15 rounded-xl p-3 text-center">
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">In 10 Jahren</p>
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">{fmt(ergebnis.kostenIn10Jahren)} €</p>
            </div>
          </div>

          {/* Selberkochen Vergleich */}
          <div className="bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-green-800 dark:text-green-300">
              🍳 Hätten Sie stattdessen <strong>selbst gekocht</strong> (ca. {fmt(ergebnis.selbstKochenProMahlzeit)} € pro Mahlzeit), hätten Sie:
            </p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-2">
              {fmt(ergebnis.ersparnisProJahr)} € pro Jahr gespart
            </p>
            <p className="text-sm text-green-600/80 dark:text-green-400/70 mt-1">
              Selberkochen: {fmt(ergebnis.selbstKochenProJahr)} €/Jahr vs. Lieferdienst: {fmt(ergebnis.kostenProJahr)} €/Jahr
            </p>
          </div>

          {/* Ersparnis-Highlight */}
          <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              💰 Die Ersparnis durch Selberkochen:
            </p>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{fmt(ergebnis.ersparnisProMonat)} €</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">pro Monat</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{fmt(ergebnis.ersparnisProJahr)} €</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">pro Jahr</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{fmt(ergebnis.ersparnisIn10Jahren)} €</p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">in 10 Jahren</p>
              </div>
            </div>
          </div>

          {/* Balkenvergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-4">📊 Lieferdienst vs. Selberkochen (pro Jahr)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">🛵 Lieferdienst</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">{fmt(ergebnis.kostenProJahr)} €</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-6">
                  <div
                    className="bg-orange-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${ergebnis.lieferAnteilProzent}%` }}
                  >
                    <span className="text-xs text-white font-medium">{Math.round(ergebnis.lieferAnteilProzent)}%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">🍳 Selberkochen</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.selbstKochenProJahr)} €</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-6">
                  <div
                    className="bg-green-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${ergebnis.kochenAnteilProzent}%` }}
                  >
                    <span className="text-xs text-white font-medium">{Math.round(ergebnis.kochenAnteilProzent)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Was man sich in 10 Jahren leisten könnte */}
          {ergebnis.vergleiche.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">
                🛒 In 10 Jahren könnten Sie sich davon leisten
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ergebnis.vergleiche.map((v, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-center">
                    <span className="text-2xl">{v.icon}</span>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{v.anzahl}×</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun Facts */}
          <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-sm text-orange-800 dark:text-orange-300 mb-2">🛵 Wussten Sie schon?</h3>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li>• Deutsche geben durchschnittlich 58 € pro Monat für Lieferdienste aus</li>
              <li>• Die Liefergebühr macht oft 10–15 % der Gesamtkosten aus</li>
              <li>• Selberkochen ist im Schnitt 3–5× günstiger als Bestellen</li>
              <li>• Meal-Prep am Sonntag spart unter der Woche Zeit und Geld</li>
            </ul>
          </div>

          {/* AI Explain */}
          <div className="flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Lieferservice-Rechner"
              eingaben={{
                bestellungenProWoche,
                bestellwert: parse(bestellwert),
                liefergebuehr: parse(liefergebuehr),
                trinkgeld: parse(trinkgeld),
              }}
              ergebnis={{
                kostenProJahr: ergebnis.kostenProJahr,
                ersparnisProJahr: ergebnis.ersparnisProJahr,
                ersparnisIn10Jahren: ergebnis.ersparnisIn10Jahren,
              }}
            />
            <CrossLink href="/alltag/trinkgeld-rechner" emoji="💶" text="Trinkgeld fürs Lieferpersonal berechnen" />
          </div>
        </>
      )}
    </div>
  );
}
