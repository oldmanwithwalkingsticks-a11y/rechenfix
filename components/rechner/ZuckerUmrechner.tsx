'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Rezepttyp = 'backen' | 'kochen';
type SuessKey = 'honig' | 'ahornsirup' | 'agave' | 'kokos' | 'stevia' | 'erythrit' | 'xylit';

interface Suessungsmittel {
  name: string;
  icon: string;
  faktor: number;        // Menge relativ zu 100g Zucker
  kcal: number;          // pro 100g
  fluessig: boolean;
  fluessKorrektur: number; // ml Flüssigkeitsreduktion pro 100g Ersatz
  backhinweis: string;
  kochhinweis: string;
}

const SUESSUNGSMITTEL: Record<SuessKey, Suessungsmittel> = {
  honig: {
    name: 'Honig',
    icon: '🍯',
    faktor: 0.75,
    kcal: 304,
    fluessig: true,
    fluessKorrektur: 0.4,  // 40% von Honigmenge als Flüssigkeitsreduktion
    backhinweis: 'Ofen 10–15 °C kühler stellen (Honig karamellisiert früher). Teig bleibt feuchter — Backzeit prüfen.',
    kochhinweis: 'Honig erst am Ende des Kochens hinzufügen, da Hitze Aromastoffe zerstört.',
  },
  ahornsirup: {
    name: 'Ahornsirup',
    icon: '🍁',
    faktor: 0.75,
    kcal: 260,
    fluessig: true,
    fluessKorrektur: 0.4,
    backhinweis: 'Ähnlich wie Honig: Ofen leicht kühler, Flüssigkeit reduzieren. Ergibt eine weiche Krume.',
    kochhinweis: 'Sehr gutes Ersatzmittel beim Kochen und in Dressings — milder Karamellgeschmack.',
  },
  agave: {
    name: 'Agavendicksaft',
    icon: '🌵',
    faktor: 0.67,
    kcal: 310,
    fluessig: true,
    fluessKorrektur: 0.35,
    backhinweis: 'Agave ist 1,5× süßer als Zucker. Weniger verwenden, Flüssigkeit anpassen. Geringe Backtemperatur empfehlenswert.',
    kochhinweis: 'Neutral im Geschmack, gut für Saucen und Marinaden. Löst sich gut in kalten Flüssigkeiten.',
  },
  kokos: {
    name: 'Kokosblütenzucker',
    icon: '🥥',
    faktor: 1.0,
    kcal: 380,
    fluessig: false,
    fluessKorrektur: 0,
    backhinweis: '1:1 einsetzbar. Leicht karamelliger Geschmack. Gibt dunkle Farbe — Kekse und Kuchen werden dunkler.',
    kochhinweis: '1:1 einsetzbar. Schmeckt leicht nach Karamell und Melasse. Kaum kalorischer Vorteil.',
  },
  stevia: {
    name: 'Stevia (reines Pulver)',
    icon: '🌿',
    faktor: 0.005,
    kcal: 0,
    fluessig: false,
    fluessKorrektur: 0,
    backhinweis: 'Beim Backen fehlt das Volumen — Teig wird kleiner und trockener. Kombination mit Erythrit empfohlen. Stevia karamellisiert NICHT.',
    kochhinweis: 'Sehr gut für Getränke, Desserts und Saucen. Nur minimale Mengen nötig — vorsichtig dosieren.',
  },
  erythrit: {
    name: 'Erythrit',
    icon: '❄️',
    faktor: 1.3,
    kcal: 0,
    fluessig: false,
    fluessKorrektur: 0,
    backhinweis: 'Gute Back-Alternative: verhält sich ähnlich wie Zucker. Kann leichten Kühleffekt im Mund hinterlassen. Karamellisiert nicht vollständig.',
    kochhinweis: 'Löst sich in Wärme gut auf. Kein Nachgeschmack. Ideal für zuckerfreie Desserts und Saucen.',
  },
  xylit: {
    name: 'Xylit (Birkenzucker)',
    icon: '🌲',
    faktor: 1.0,
    kcal: 240,
    fluessig: false,
    fluessKorrektur: 0,
    backhinweis: '1:1 austauschbar. Karamellisiert ähnlich wie Zucker. ⚠️ Giftig für Hunde! Sicher aufbewahren.',
    kochhinweis: '1:1 austauschbar, 40 % weniger Kalorien. Kein Nachgeschmack. ⚠️ Giftig für Hunde!',
  },
};

const ZUCKER_KCAL = 400;

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

export default function ZuckerUmrechner() {
  const [menge, setMenge] = useState('100');
  const [ziel, setZiel] = useState<SuessKey>('honig');
  const [rezepttyp, setRezepttyp] = useState<Rezepttyp>('backen');

  const ergebnis = useMemo(() => {
    const g = parseDeutscheZahl(menge) || 0;
    const sm = SUESSUNGSMITTEL[ziel];

    const ersatz_g = g * sm.faktor;
    const kcalZucker = g * ZUCKER_KCAL / 100;
    const kcalErsatz = ersatz_g * sm.kcal / 100;
    const kcalErsparnis = kcalZucker - kcalErsatz;
    const fluessReduktion = sm.fluessig ? ersatz_g * sm.fluessKorrektur : 0;

    return { g, ersatz_g, kcalZucker, kcalErsatz, kcalErsparnis, fluessReduktion };
  }, [menge, ziel]);

  const sm = SUESSUNGSMITTEL[ziel];
  const hinweis = rezepttyp === 'backen' ? sm.backhinweis : sm.kochhinweis;

  const ergebnisText = `${fmt(ergebnis.g, 0)} g Zucker = ${fmt(ergebnis.ersatz_g, ergebnis.ersatz_g < 5 ? 2 : 0)} g ${sm.name} | Zucker: ${fmt(ergebnis.kcalZucker, 0)} kcal → Ersatz: ${fmt(ergebnis.kcalErsatz, 0)} kcal`;

  return (
    <div>
      {/* === 1: Menge === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Menge Haushaltszucker
        </h2>
        <NummerEingabe value={menge} onChange={setMenge} placeholder="100" einheit="g" />
      </div>

      {/* === 2: Ziel-Süßungsmittel === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Ersetzen durch
        </h2>
        <label htmlFor="zucker-ziel" className="sr-only">Ziel-Süßungsmittel</label>
        <select
          id="zucker-ziel"
          value={ziel}
          onChange={e => setZiel(e.target.value as SuessKey)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.entries(SUESSUNGSMITTEL) as [SuessKey, Suessungsmittel][]).map(([key, s]) => (
            <option key={key} value={key}>
              {s.icon} {s.name} — {s.kcal === 0 ? 'kalorienfrei' : `${s.kcal} kcal/100g`}
            </option>
          ))}
        </select>
      </div>

      {/* === 3: Rezepttyp === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Verwendung
        </h2>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
          {(['backen', 'kochen'] as Rezepttyp[]).map(rt => (
            <button
              key={rt}
              type="button"
              onClick={() => setRezepttyp(rt)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                rezepttyp === rt
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {rt === 'backen' ? '🎂 Backen' : '🍳 Kochen'}
            </button>
          ))}
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1 text-center">
          {fmt(ergebnis.g, 0)} g Zucker entspricht
        </p>
        <p className="text-5xl font-bold text-center mb-1">
          {fmt(ergebnis.ersatz_g, ergebnis.ersatz_g < 5 ? 2 : 0)} g
        </p>
        <p className="text-white/90 text-xl text-center mb-4">{sm.icon} {sm.name}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">kcal Zucker</p>
            <p className="text-xl font-bold">{fmt(ergebnis.kcalZucker, 0)}</p>
            <p className="text-white/70 text-xs">400 kcal/100g</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">kcal Ersatz</p>
            <p className="text-xl font-bold">{fmt(ergebnis.kcalErsatz, 0)}</p>
            <p className="text-white/70 text-xs">{sm.kcal === 0 ? 'kalorienfrei' : `${sm.kcal} kcal/100g`}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">Kalorien-Ersparnis</p>
            <p className={`text-xl font-bold ${ergebnis.kcalErsparnis < 0 ? 'text-amber-300' : ''}`}>
              {ergebnis.kcalErsparnis >= 0 ? '−' : '+'}{fmt(Math.abs(ergebnis.kcalErsparnis), 0)}
            </p>
            <p className="text-white/70 text-xs">kcal</p>
          </div>
        </div>

        {ergebnis.fluessReduktion > 0 && (
          <div className="mt-3 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/80 text-sm">
              💧 Flüssigkeit im Rezept um ca. <strong>{fmt(ergebnis.fluessReduktion, 0)} ml</strong> reduzieren
            </p>
          </div>
        )}
      </div>

      {/* Verwendungshinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <h2 className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">
          {rezepttyp === 'backen' ? '🎂 Backtipp' : '🍳 Kochtipp'}: {sm.name}
        </h2>
        <p className="text-amber-800 dark:text-amber-300 text-sm">{hinweis}</p>
      </div>

      {/* Vergleichstabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">
            Alle Alternativen für {fmt(parseDeutscheZahl(menge) || 100, 0)} g Zucker
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Süßungsmittel</th>
                <th className="px-4 py-2 text-right font-semibold">Menge</th>
                <th className="px-4 py-2 text-right font-semibold">kcal</th>
                <th className="px-4 py-2 text-right font-semibold">Ersparnis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {(Object.entries(SUESSUNGSMITTEL) as [SuessKey, Suessungsmittel][]).map(([key, s]) => {
                const g = parseDeutscheZahl(menge) || 100;
                const eg = g * s.faktor;
                const ek = eg * s.kcal / 100;
                const zk = g * ZUCKER_KCAL / 100;
                const istAktuell = key === ziel;
                return (
                  <tr
                    key={key}
                    className={`cursor-pointer ${istAktuell ? 'bg-primary-50 dark:bg-primary-500/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                    onClick={() => setZiel(key)}
                  >
                    <td className={`px-4 py-2.5 ${istAktuell ? 'font-semibold text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {s.icon} {s.name}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {fmt(eg, eg < 5 ? 2 : 0)} g
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {fmt(ek, 0)} kcal
                    </td>
                    <td className={`px-4 py-2.5 text-right tabular-nums whitespace-nowrap ${(zk - ek) > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {(zk - ek) >= 0 ? '−' : '+'}{fmt(Math.abs(zk - ek), 0)} kcal
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
          Auf Zeile klicken zum Auswählen. Zucker: {fmt((parseDeutscheZahl(menge) || 100) * ZUCKER_KCAL / 100, 0)} kcal.
        </p>
      </div>

      <CrossLink href="/kochen/naehrwert-rechner" emoji="🥗" text="Nährwerte pro Portion berechnen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienrechner: Tagesbedarf" />

      <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Zucker-Umrechner" />

      <AiExplain
        rechnerName="Zucker-Umrechner"
        eingaben={{
          menge: `${menge} g Zucker`,
          ersatzmittel: sm.name,
          verwendung: rezepttyp === 'backen' ? 'Backen' : 'Kochen',
        }}
        ergebnis={{
          ersatz: `${fmt(ergebnis.ersatz_g, ergebnis.ersatz_g < 5 ? 2 : 0)} g ${sm.name}`,
          kcalZucker: `${fmt(ergebnis.kcalZucker, 0)} kcal`,
          kcalErsatz: `${fmt(ergebnis.kcalErsatz, 0)} kcal`,
          ...(ergebnis.fluessReduktion > 0 ? { fluessigkeit: `−${fmt(ergebnis.fluessReduktion, 0)} ml im Rezept` } : {}),
        }}
      />
    </div>
  );
}
