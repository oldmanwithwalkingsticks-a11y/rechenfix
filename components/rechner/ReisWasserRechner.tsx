'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Sorte = 'weiss' | 'basmati' | 'jasmin' | 'vollkorn' | 'sushi' | 'wildreis' | 'risotto';
type Methode = 'herd' | 'reiskocher';

const SORTE_LABEL: Record<Sorte, string> = {
  weiss:    'Weißer Langkornreis',
  basmati:  'Basmati',
  jasmin:   'Jasmin',
  vollkorn: 'Vollkorn-/Naturreis',
  sushi:    'Sushi-/Rundkornreis',
  wildreis: 'Wildreis',
  risotto:  'Risotto (Arborio)',
};

const VERHAELTNIS: Record<Sorte, number> = {
  weiss:    2.0,
  basmati:  1.75,
  jasmin:   1.5,
  vollkorn: 2.5,
  sushi:    1.25,
  wildreis: 3.0,
  risotto:  3.0,
};

const METHODE_FAKTOR: Record<Methode, number> = {
  herd:       1.0,
  reiskocher: 0.85,
};

const SORTEN_REIHENFOLGE: Sorte[] = ['weiss', 'basmati', 'jasmin', 'vollkorn', 'sushi', 'wildreis', 'risotto'];

const fmt = (n: number, d = 0): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

// Verhältnis-Anzeige, z. B. 2,0 → "1:2", 1,75 → "1:1,75"
function verhaeltnisText(v: number): string {
  return `1:${v.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function wasserMenge(g: number, sorte: Sorte, methode: Methode): number {
  return Math.round(g * VERHAELTNIS[sorte] * METHODE_FAKTOR[methode]);
}

export default function ReisWasserRechner() {
  const [menge, setMenge] = useState('150');
  const [sorte, setSorte] = useState<Sorte>('weiss');
  const [methode, setMethode] = useState<Methode>('herd');

  const ergebnis = useMemo(() => {
    const g = parseDeutscheZahl(menge);
    if (g <= 0) return null;
    const wasser = wasserMenge(g, sorte, methode);
    const fertigMenge = Math.round(g * 3); // ~3× Trockengewicht
    return { g, wasser, fertigMenge };
  }, [menge, sorte, methode]);

  const g = ergebnis?.g ?? 0;

  return (
    <div>
      {/* === 1: Reismenge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Reismenge (trocken)
        </h2>
        <NummerEingabe value={menge} onChange={setMenge} placeholder="150" einheit="g" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Faustregel: 60–75 g Trockenreis pro Person als Beilage, 100 g als Hauptgericht.
        </p>
      </div>

      {/* === 2: Reissorte === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Reissorte
        </h2>
        <label htmlFor="reis-sorte" className="sr-only">Reissorte</label>
        <select
          id="reis-sorte"
          value={sorte}
          onChange={e => setSorte(e.target.value as Sorte)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {SORTEN_REIHENFOLGE.map(s => (
            <option key={s} value={s}>{SORTE_LABEL[s]} ({verhaeltnisText(VERHAELTNIS[s])})</option>
          ))}
        </select>
      </div>

      {/* === 3: Methode === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Kochmethode
        </h2>
        <label htmlFor="reis-methode" className="sr-only">Kochmethode</label>
        <select
          id="reis-methode"
          value={methode}
          onChange={e => setMethode(e.target.value as Methode)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="herd">🍲 Herd (Absorptionsmethode)</option>
          <option value="reiskocher">🍚 Reiskocher / Instant Pot</option>
        </select>
      </div>

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4 text-center">
            <p className="text-white/80 text-sm mb-1">
              {fmt(g)} g {SORTE_LABEL[sorte]} brauchen
            </p>
            <p className="text-5xl font-bold">{fmt(ergebnis.wasser)} ml Wasser</p>
            <p className="text-white/90 text-sm mt-2">
              Verhältnis {verhaeltnisText(VERHAELTNIS[sorte])}
              {methode === 'reiskocher' ? ' · Reiskocher (−15 %)' : ''}
            </p>
            <p className="text-white/70 text-xs mt-3">
              Ergibt ca. {fmt(ergebnis.fertigMenge)} g gekochten Reis
            </p>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg:</strong>{' '}
              {fmt(g)} g × {VERHAELTNIS[sorte].toLocaleString('de-DE')}
              {methode === 'reiskocher' ? ' × 0,85' : ''} = {fmt(ergebnis.wasser)} ml
            </p>
          </div>

          {/* Risotto-Hinweis */}
          {sorte === 'risotto' && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                <strong>⚠️ Risotto:</strong> Arborio wird nicht in einem Zug aufgekocht, sondern die
                Flüssigkeit (am besten heiße Brühe) wird kellenweise nach und nach zugegeben und unter
                Rühren einkochen gelassen. Die {fmt(ergebnis.wasser)} ml sind der ungefähre Gesamtbedarf —
                tasten Sie sich an die cremige Konsistenz heran.
              </p>
            </div>
          )}

          {/* Tabelle: Wassermenge je Sorte bei aktueller Menge */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Wassermenge je Sorte bei {fmt(g)} g ({methode === 'reiskocher' ? 'Reiskocher' : 'Herd'})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-4 py-2 text-left font-semibold">Sorte</th>
                    <th className="px-4 py-2 text-right font-semibold">Verhältnis</th>
                    <th className="px-4 py-2 text-right font-semibold">Wasser</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {SORTEN_REIHENFOLGE.map(s => {
                    const aktiv = s === sorte;
                    return (
                      <tr key={s} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                        <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {SORTE_LABEL[s]}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {verhaeltnisText(VERHAELTNIS[s])}
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}`}>
                          {fmt(wasserMenge(g, s, methode))} ml
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/kochen/kochzeit-rechner" emoji="⏱️" text="Kochzeiten für Lebensmittel" />
          <CrossLink href="/kochen/cups-umrechner" emoji="🥄" text="Cups in Gramm & ml umrechnen" />

          <ErgebnisAktionen
            ergebnisText={`Reis-Wasser-Rechner: ${fmt(g)} g ${SORTE_LABEL[sorte]} (${methode === 'reiskocher' ? 'Reiskocher' : 'Herd'}) = ${fmt(ergebnis.wasser)} ml Wasser (Verhältnis ${verhaeltnisText(VERHAELTNIS[sorte])})`}
            seitenTitel="Reis-Wasser-Rechner"
          />

          <AiExplain
            rechnerName="Reis-Wasser-Rechner"
            eingaben={{
              reismenge: `${fmt(g)} g`,
              sorte: SORTE_LABEL[sorte],
              methode: methode === 'reiskocher' ? 'Reiskocher / Instant Pot' : 'Herd (Absorption)',
            }}
            ergebnis={{
              wasser: `${fmt(ergebnis.wasser)} ml`,
              verhaeltnis: verhaeltnisText(VERHAELTNIS[sorte]),
              gekochterReis: `ca. ${fmt(ergebnis.fertigMenge)} g`,
            }}
          />
        </>
      )}
    </div>
  );
}
