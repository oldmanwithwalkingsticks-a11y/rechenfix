'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Methode = 'handfilter' | 'frenchpress' | 'drip' | 'aeropress' | 'coldbrew' | 'espresso';
type Modus = 'wasser' | 'kaffee';
type Staerke = 'mild' | 'normal' | 'stark';

const METHODE_LABEL: Record<Methode, string> = {
  handfilter:  'Handfilter / Pour Over',
  frenchpress: 'French Press',
  drip:        'Filtermaschine (Drip)',
  aeropress:   'AeroPress',
  coldbrew:    'Cold Brew (Konzentrat)',
  espresso:    'Espresso',
};

// Basis-Ratio Wasser : Kaffee (Espresso = Kaffee : Ausbeute)
const RATIO: Record<Methode, number> = {
  handfilter:  16,
  frenchpress: 15,
  drip:        17,
  aeropress:   14,
  coldbrew:    5,
  espresso:    2,
};

const METHODEN_REIHENFOLGE: Methode[] = ['handfilter', 'frenchpress', 'drip', 'aeropress', 'coldbrew', 'espresso'];
const TABELLEN_METHODEN: Methode[] = ['handfilter', 'frenchpress', 'drip', 'aeropress', 'coldbrew'];

// Stärke verschiebt das Ratio um ±1 (nicht bei Espresso/Cold Brew angewandt)
const STAERKE_DELTA: Record<Staerke, number> = { mild: 1, normal: 0, stark: -1 };

const g1 = (n: number): string => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const g0 = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

function effRatio(methode: Methode, staerke: Staerke): number {
  if (methode === 'espresso' || methode === 'coldbrew') return RATIO[methode];
  return RATIO[methode] + STAERKE_DELTA[staerke];
}

function kaffeeAusWasser(ml: number, ratio: number): number {
  return Math.round((ml / ratio) * 10) / 10;
}
function wasserAusKaffee(g: number, ratio: number): number {
  return Math.round(g * ratio);
}

export default function KaffeeWasserRechner() {
  const [methode, setMethode] = useState<Methode>('handfilter');
  const [modus, setModus] = useState<Modus>('wasser');
  const [staerke, setStaerke] = useState<Staerke>('normal');
  const [menge, setMenge] = useState('500');

  const istEspresso = methode === 'espresso';
  const effModus: Modus = istEspresso ? 'kaffee' : modus;

  const ergebnis = useMemo(() => {
    const m = parseDeutscheZahl(menge);
    if (m <= 0) return null;
    const ratio = effRatio(methode, staerke);

    if (istEspresso) {
      // Dosis (g) → Ausbeute (g) bei 1:2
      const ausbeute = Math.round(m * ratio * 10) / 10;
      return { ratio, wert: ausbeute, tassen: 0 };
    }

    if (effModus === 'wasser') {
      const kaffee = kaffeeAusWasser(m, ratio);
      const tassen = m / 250;
      return { ratio, wert: kaffee, tassen };
    } else {
      const wasser = wasserAusKaffee(m, ratio);
      const tassen = wasser / 250;
      return { ratio, wert: wasser, tassen };
    }
  }, [menge, methode, modus, staerke, effModus, istEspresso]);

  const eingabeMenge = parseDeutscheZahl(menge);
  const einheit = istEspresso ? 'g' : effModus === 'wasser' ? 'ml' : 'g';

  return (
    <div>
      {/* === 1: Methode === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Zubereitungsmethode
        </h2>
        <label htmlFor="kaffee-methode" className="sr-only">Methode</label>
        <select
          id="kaffee-methode"
          value={methode}
          onChange={e => setMethode(e.target.value as Methode)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {METHODEN_REIHENFOLGE.map(m => (
            <option key={m} value={m}>
              {METHODE_LABEL[m]} (1:{RATIO[m]})
            </option>
          ))}
        </select>
      </div>

      {/* === 2: Modus (nicht bei Espresso) === */}
      {!istEspresso && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Was möchten Sie vorgeben?
          </h2>
          <label htmlFor="kaffee-modus" className="sr-only">Modus</label>
          <select
            id="kaffee-modus"
            value={modus}
            onChange={e => setModus(e.target.value as Modus)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          >
            <option value="wasser">💧 Wasser vorgeben → Kaffeemenge berechnen</option>
            <option value="kaffee">☕ Kaffee vorgeben → Wassermenge berechnen</option>
          </select>
        </div>
      )}

      {/* === 3: Menge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">{istEspresso ? '2' : '3'}</span>
          {istEspresso ? 'Kaffee-Dosis (g)' : effModus === 'wasser' ? 'Wassermenge (ml)' : 'Kaffeemenge (g)'}
        </h2>
        <NummerEingabe value={menge} onChange={setMenge} placeholder={istEspresso ? '18' : '500'} einheit={einheit} />
        {istEspresso ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Übliche Dosis: 18–20 g im doppelten Siebträger, ergibt bei 1:2 rund 36–40 g Espresso.
          </p>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Richtwert: 1 Tasse ≈ 250 ml. 500 ml entsprechen zwei großen Tassen.
          </p>
        )}
      </div>

      {/* === 4: Stärke (nur Durchlauf-/Immersionsmethoden) === */}
      {!istEspresso && methode !== 'coldbrew' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Stärke
          </h2>
          <label htmlFor="kaffee-staerke" className="sr-only">Stärke</label>
          <select
            id="kaffee-staerke"
            value={staerke}
            onChange={e => setStaerke(e.target.value as Staerke)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          >
            <option value="mild">Mild (Ratio +1, weniger Kaffee)</option>
            <option value="normal">Normal (Basis-Ratio)</option>
            <option value="stark">Stark (Ratio −1, mehr Kaffee)</option>
          </select>
        </div>
      )}

      {ergebnis && (
        <>
          {/* === ERGEBNIS === */}
          <div className="result-box mb-4 text-center">
            {istEspresso ? (
              <>
                <p className="text-white/80 text-sm mb-1">
                  {g0(eingabeMenge)} g Kaffee-Dosis ergeben
                </p>
                <p className="text-5xl font-bold">{g1(ergebnis.wert)} g Espresso</p>
                <p className="text-white/90 text-sm mt-2">Verhältnis 1:{ergebnis.ratio} (Dosis : Ausbeute)</p>
              </>
            ) : effModus === 'wasser' ? (
              <>
                <p className="text-white/80 text-sm mb-1">
                  {g0(eingabeMenge)} ml Wasser brauchen
                </p>
                <p className="text-5xl font-bold">{g1(ergebnis.wert)} g Kaffee</p>
                <p className="text-white/90 text-sm mt-2">
                  Ratio 1:{ergebnis.ratio} · ca. {g1(ergebnis.tassen)} Tassen
                </p>
              </>
            ) : (
              <>
                <p className="text-white/80 text-sm mb-1">
                  {g0(eingabeMenge)} g Kaffee brauchen
                </p>
                <p className="text-5xl font-bold">{g0(ergebnis.wert)} ml Wasser</p>
                <p className="text-white/90 text-sm mt-2">
                  Ratio 1:{ergebnis.ratio} · ca. {g1(ergebnis.tassen)} Tassen
                </p>
              </>
            )}
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rechenweg:</strong>{' '}
              {istEspresso ? (
                <>{g0(eingabeMenge)} g × {ergebnis.ratio} = {g1(ergebnis.wert)} g Espresso</>
              ) : effModus === 'wasser' ? (
                <>{g0(eingabeMenge)} ml ÷ {ergebnis.ratio} = {g1(ergebnis.wert)} g Kaffee</>
              ) : (
                <>{g0(eingabeMenge)} g × {ergebnis.ratio} = {g0(ergebnis.wert)} ml Wasser</>
              )}
            </p>
          </div>

          {/* Espresso-Hinweis */}
          {istEspresso && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                <strong>☕ Espresso ist ein Sonderfall:</strong> Das Verhältnis 1:2 bezieht sich auf die{' '}
                <strong>ausgegebene Espressomenge</strong> (Brew Ratio), nicht auf das durchgelaufene Brühwasser.
                {' '}18 g Kaffee ergeben also rund 36 g Espresso in der Tasse — üblicherweise in 25–30 Sekunden Extraktionszeit.
              </p>
            </div>
          )}

          {/* Tabelle: Menge je Methode bei aktueller Vorgabe (nicht bei Espresso) */}
          {!istEspresso && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
              <div className="px-4 pt-4 pb-1">
                <h2 className="font-bold text-gray-700 dark:text-gray-200">
                  {effModus === 'wasser'
                    ? `Kaffeemenge je Methode bei ${g0(eingabeMenge)} ml`
                    : `Wassermenge je Methode bei ${g0(eingabeMenge)} g`}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      <th className="px-4 py-2 text-left font-semibold">Methode</th>
                      <th className="px-4 py-2 text-right font-semibold">Ratio</th>
                      <th className="px-4 py-2 text-right font-semibold">{effModus === 'wasser' ? 'Kaffee' : 'Wasser'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {TABELLEN_METHODEN.map(m => {
                      const aktiv = m === methode;
                      const r = RATIO[m];
                      const wert = effModus === 'wasser'
                        ? `${g1(kaffeeAusWasser(eingabeMenge, r))} g`
                        : `${g0(wasserAusKaffee(eingabeMenge, r))} ml`;
                      return (
                        <tr key={m} className={aktiv ? 'bg-primary-50 dark:bg-primary-500/10' : ''}>
                          <td className={`px-4 py-2.5 whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            {METHODE_LABEL[m]}
                          </td>
                          <td className="px-4 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400 whitespace-nowrap">1:{r}</td>
                          <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${aktiv ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}`}>
                            {wert}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="px-4 pb-3 pt-1 text-xs text-gray-500 dark:text-gray-400">
                Basis-Ratios ohne Stärke-Anpassung. Espresso ist nicht vergleichbar (Verhältnis zur ausgegebenen Menge).
              </p>
            </div>
          )}

          <CrossLink href="/kochen/cups-umrechner" emoji="🥄" text="Gramm, ml & Cups umrechnen" />
          <CrossLink href="/kochen/rezept-umrechner" emoji="📖" text="Rezeptmengen umrechnen" />

          <ErgebnisAktionen
            ergebnisText={
              istEspresso
                ? `Kaffee-Wasser-Rechner: ${g0(eingabeMenge)} g Espresso-Dosis = ${g1(ergebnis.wert)} g Ausbeute (1:${ergebnis.ratio})`
                : effModus === 'wasser'
                ? `Kaffee-Wasser-Rechner: ${g0(eingabeMenge)} ml Wasser (${METHODE_LABEL[methode]}, 1:${ergebnis.ratio}) = ${g1(ergebnis.wert)} g Kaffee`
                : `Kaffee-Wasser-Rechner: ${g0(eingabeMenge)} g Kaffee (${METHODE_LABEL[methode]}, 1:${ergebnis.ratio}) = ${g0(ergebnis.wert)} ml Wasser`
            }
            seitenTitel="Kaffee-Wasser-Rechner"
          />

          <AiExplain
            rechnerName="Kaffee-Wasser-Rechner"
            eingaben={{
              methode: METHODE_LABEL[methode],
              modus: istEspresso ? 'Dosis → Ausbeute' : effModus === 'wasser' ? 'Wasser → Kaffee' : 'Kaffee → Wasser',
              menge: `${g0(eingabeMenge)} ${einheit}`,
              staerke: istEspresso || methode === 'coldbrew' ? '—' : staerke,
            }}
            ergebnis={{
              ratio: `1:${ergebnis.ratio}`,
              berechneteMenge: istEspresso
                ? `${g1(ergebnis.wert)} g Espresso`
                : effModus === 'wasser'
                ? `${g1(ergebnis.wert)} g Kaffee`
                : `${g0(ergebnis.wert)} ml Wasser`,
              tassen: istEspresso ? '—' : `ca. ${g1(ergebnis.tassen)}`,
            }}
          />
        </>
      )}
    </div>
  );
}
