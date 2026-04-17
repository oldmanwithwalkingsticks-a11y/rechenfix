'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type BrotTyp = 'weiss' | 'misch' | 'roggen' | 'sauerteig' | 'toast';
type Triebmittel = 'hefe' | 'sauerteig' | 'kombi';

interface BrotRezept {
  name: string;
  icon: string;
  hydration: number;
  salz: number;
  butter: number;
  zucker: number;
  mehlBeschreibung: string;
  backtemp: number;
  backzeitMin: number;
  tipp: string;
}

const BROT_REZEPTE: Record<BrotTyp, BrotRezept> = {
  weiss: {
    name: 'Weißbrot',
    icon: '🍞',
    hydration: 65,
    salz: 2.0,
    butter: 0,
    zucker: 0,
    mehlBeschreibung: 'Weizenmehl Type 550',
    backtemp: 220,
    backzeitMin: 30,
    tipp: 'Mit Dampf in den ersten 10 Minuten für eine knusprige Kruste.',
  },
  misch: {
    name: 'Mischbrot',
    icon: '🫓',
    hydration: 68,
    salz: 2.0,
    butter: 0,
    zucker: 0,
    mehlBeschreibung: '60 % Weizenmehl Type 812 + 40 % Roggenmehl Type 1150',
    backtemp: 200,
    backzeitMin: 45,
    tipp: 'Mit Dampf starten, nach 15 Min Ofen kurz öffnen zum Ablüften.',
  },
  roggen: {
    name: 'Roggenbrot',
    icon: '🌑',
    hydration: 76,
    salz: 2.0,
    butter: 0,
    zucker: 0,
    mehlBeschreibung: 'Roggenmehl Type 1150 oder 1370',
    backtemp: 200,
    backzeitMin: 55,
    tipp: 'Roggenbrot braucht Sauerteig als Triebmittel. In einer Kastenform backen — der Teig ist sehr weich.',
  },
  sauerteig: {
    name: 'Sauerteigbrot',
    icon: '🌾',
    hydration: 72,
    salz: 2.0,
    butter: 0,
    zucker: 0,
    mehlBeschreibung: '80 % Weizenmehl Type 550 + 20 % Roggenmehl Type 1150',
    backtemp: 230,
    backzeitMin: 40,
    tipp: 'Im Dutch Oven backen: 20 Min bei 230 °C mit Deckel, dann 20 Min ohne für die Kruste.',
  },
  toast: {
    name: 'Toastbrot',
    icon: '🍳',
    hydration: 60,
    salz: 1.5,
    butter: 5,
    zucker: 3,
    mehlBeschreibung: 'Weizenmehl Type 405 oder 550',
    backtemp: 180,
    backzeitMin: 35,
    tipp: 'In einer Kastenform backen, kein Dampf nötig. Butter weich (nicht geschmolzen) einarbeiten.',
  },
};

// Frischhefe % vom Gesamtmehl
const HEFE_PROZ: Record<Triebmittel, number> = {
  hefe: 1.5,
  sauerteig: 0,
  kombi: 0.5,
};

// Sauerteig-Anstellgut (ASG, 100 % TA) % vom Gesamtmehl
const ST_PROZ: Record<Triebmittel, number> = {
  hefe: 0,
  sauerteig: 0.20,
  kombi: 0.10,
};

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

export default function BrotbackRechner() {
  const [brotTyp, setBrotTyp] = useState<BrotTyp>('misch');
  const [anzahl, setAnzahl] = useState('1');
  const [teigGewicht, setTeigGewicht] = useState('900');
  const [triebmittel, setTriebmittel] = useState<Triebmittel>('hefe');

  const rezept = BROT_REZEPTE[brotTyp];

  const ergebnis = useMemo(() => {
    const n = Math.max(1, Math.round(parseDeutscheZahl(anzahl) || 1));
    const tg = Math.max(300, parseDeutscheZahl(teigGewicht) || 900);
    const gesamtTeig = n * tg;

    const { hydration, salz, butter, zucker } = rezept;
    const hefeProz = HEFE_PROZ[triebmittel];
    const stProz = ST_PROZ[triebmittel];

    // Das ASG enthält 50% Mehl + 50% Wasser (100% TA).
    // gesamtmehl = gesamtTeig / (1 + hydration/100 + salz/100 + hefeProz/100 + butter/100 + zucker/100)
    // (Die stProz kürzen sich heraus, weil ASG bereits Mehl + Wasser enthält)
    const divisor = 1 + hydration / 100 + salz / 100 + hefeProz / 100 + butter / 100 + zucker / 100;
    const gesamtMehl = gesamtTeig / divisor;

    const asg = stProz * gesamtMehl;
    const mehlHaupt = gesamtMehl - asg / 2;       // Mehl direkt einwiegen (abzgl. Mehl im ASG)
    const wasserHaupt = gesamtMehl * hydration / 100 - asg / 2; // Wasser direkt (abzgl. Wasser im ASG)
    const salzMenge = gesamtMehl * salz / 100;
    const frischHefe = gesamtMehl * hefeProz / 100;
    const trockenHefe = frischHefe / 3;
    const butterMenge = gesamtMehl * butter / 100;
    const zuckerMenge = gesamtMehl * zucker / 100;
    const fertigGewicht = gesamtTeig * 0.88;       // ca. 12 % Backofenverlust

    return {
      gesamtTeig, gesamtMehl, mehlHaupt, wasserHaupt,
      salzMenge, frischHefe, trockenHefe, butterMenge, zuckerMenge,
      asg, fertigGewicht, hefeProz,
    };
  }, [anzahl, teigGewicht, rezept, triebmittel]);

  const roggenWarnung = brotTyp === 'roggen' && triebmittel === 'hefe';

  const ergebnisText = `Brotback-Rechner (${rezept.name}): ${fmt(ergebnis.mehlHaupt, 0)} g Mehl, ${fmt(ergebnis.wasserHaupt, 0)} g Wasser, ${fmt(ergebnis.salzMenge, 1)} g Salz${ergebnis.asg > 0 ? `, ${fmt(ergebnis.asg, 0)} g Sauerteig-ASG` : ''}${ergebnis.frischHefe > 0 ? `, ${fmt(ergebnis.frischHefe, 1)} g Frischhefe` : ''}`;

  return (
    <div>
      {/* === 1: Brottyp === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Brottyp
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {(Object.entries(BROT_REZEPTE) as [BrotTyp, BrotRezept][]).map(([key, r]) => (
            <button
              key={key}
              type="button"
              onClick={() => setBrotTyp(key)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                brotTyp === key
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">{r.icon}</div>
              <div className="text-xs font-medium leading-tight">{r.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.hydration} %</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          <strong>Mehl:</strong> {rezept.mehlBeschreibung}
        </p>
      </div>

      {/* === 2+3: Anzahl und Teiggewicht === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Anzahl Brote
          </h2>
          <NummerEingabe value={anzahl} onChange={setAnzahl} placeholder="1" einheit="Brote" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Teiggewicht pro Brot
          </h2>
          <NummerEingabe value={teigGewicht} onChange={setTeigGewicht} placeholder="900" einheit="g" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Fertig gebacken: ca. {fmt((parseDeutscheZahl(teigGewicht) || 900) * 0.88, 0)} g
          </p>
        </div>
      </div>

      {/* === 4: Triebmittel === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Triebmittel
        </h2>
        <label htmlFor="brot-triebmittel" className="sr-only">Triebmittel</label>
        <select
          id="brot-triebmittel"
          value={triebmittel}
          onChange={e => setTriebmittel(e.target.value as Triebmittel)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="hefe">🧊 Hefe (Frischhefe, 1,5 % vom Mehl)</option>
          <option value="sauerteig">🍞 Sauerteig (20 % Anstellgut vom Mehl)</option>
          <option value="kombi">✨ Kombi (10 % Sauerteig + 0,5 % Hefe)</option>
        </select>
        {roggenWarnung && (
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-3 mt-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>⚠️ Hinweis:</strong> Roggenbrot braucht Sauerteig. Hefe allein reicht nicht aus — der Teig geht kaum auf und wird klebrig-dicht. Empfohlen: Sauerteig oder Kombi.
            </p>
          </div>
        )}
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1 text-center">
          {rezept.icon} {rezept.name} — {fmt(parseDeutscheZahl(anzahl) || 1, 0)} Brot/e à {fmt(parseDeutscheZahl(teigGewicht) || 900, 0)} g Teig
        </p>
        <p className="text-3xl font-bold text-center mb-1">{fmt(ergebnis.gesamtMehl, 0)} g Mehl gesamt</p>
        <p className="text-white/70 text-xs text-center mb-4">
          Fertig gebacken: ca. {fmt(ergebnis.fertigGewicht, 0)} g
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">🌾 Mehl (Hauptteig)</p>
            <p className="text-xl font-bold">{fmt(ergebnis.mehlHaupt, 0)} g</p>
            <p className="text-white/70 text-xs">direkt einwiegen</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">💧 Wasser (direkt)</p>
            <p className="text-xl font-bold">{fmt(ergebnis.wasserHaupt, 0)} g</p>
            <p className="text-white/70 text-xs">{rezept.hydration} % Hydration</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 text-xs mb-1">🧂 Salz</p>
            <p className="text-xl font-bold">{fmt(ergebnis.salzMenge, 1)} g</p>
            <p className="text-white/70 text-xs">{rezept.salz} %</p>
          </div>
          {ergebnis.asg > 0 && (
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/70 text-xs mb-1">🍞 Sauerteig (ASG)</p>
              <p className="text-xl font-bold">{fmt(ergebnis.asg, 0)} g</p>
              <p className="text-white/70 text-xs">100 % TA Starter</p>
            </div>
          )}
          {ergebnis.frischHefe > 0 && (
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/70 text-xs mb-1">🧊 Frischhefe</p>
              <p className="text-xl font-bold">{fmt(ergebnis.frischHefe, 1)} g</p>
              <p className="text-white/70 text-xs">oder {fmt(ergebnis.trockenHefe, 1)} g Trocken</p>
            </div>
          )}
          {ergebnis.butterMenge > 0 && (
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/70 text-xs mb-1">🧈 Butter (weich)</p>
              <p className="text-xl font-bold">{fmt(ergebnis.butterMenge, 0)} g</p>
              <p className="text-white/70 text-xs">{rezept.butter} %</p>
            </div>
          )}
          {ergebnis.zuckerMenge > 0 && (
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/70 text-xs mb-1">🍬 Zucker</p>
              <p className="text-xl font-bold">{fmt(ergebnis.zuckerMenge, 0)} g</p>
              <p className="text-white/70 text-xs">{rezept.zucker} %</p>
            </div>
          )}
        </div>
      </div>

      {/* === Sauerteig-Hinweis === */}
      {ergebnis.asg > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">🍞 Sauerteig-Anstellgut (ASG)</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Benötigt: <strong>{fmt(ergebnis.asg, 0)} g</strong> aktiver Starter (100 % TA = gleiche Teile Mehl und Wasser)
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Enthält: {fmt(ergebnis.asg / 2, 0)} g Mehl + {fmt(ergebnis.asg / 2, 0)} g Wasser — bereits in den Mengen oben berücksichtigt.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tipp: ASG 8–12 h vorher auffrischen (1 Teil ASG + 1 Teil Mehl + 1 Teil Wasser, Raumtemperatur). Backfertig, wenn es sich verdoppelt hat und Bläschen wirft.
          </p>
        </div>
      )}

      {/* === Backempfehlung === */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
          Backempfehlung: {rezept.icon} {rezept.name}
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperatur</p>
            <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{rezept.backtemp} °C</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ober-/Unterhitze</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Backzeit</p>
            <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">ca. {rezept.backzeitMin} Min</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">je nach Form und Ofen</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">💡 {rezept.tipp}</p>
      </div>

      {/* === Bäckerprozente-Tabelle === */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">
            Bäckerprozente: {rezept.name}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Zutat</th>
                <th className="px-4 py-2 text-right font-semibold">Baker&apos;s %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="px-4 py-2.5">Mehl gesamt</td>
                <td className="px-4 py-2.5 text-right tabular-nums">100 %</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Wasser</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{rezept.hydration} %</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Salz</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{rezept.salz} %</td>
              </tr>
              {triebmittel !== 'sauerteig' && (
                <tr>
                  <td className="px-4 py-2.5">Frischhefe</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{HEFE_PROZ[triebmittel]} %</td>
                </tr>
              )}
              {triebmittel !== 'hefe' && (
                <tr>
                  <td className="px-4 py-2.5">Sauerteig-ASG (100 % TA)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{(ST_PROZ[triebmittel] * 100).toFixed(0)} %</td>
                </tr>
              )}
              {rezept.butter > 0 && (
                <tr>
                  <td className="px-4 py-2.5">Butter</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{rezept.butter} %</td>
                </tr>
              )}
              {rezept.zucker > 0 && (
                <tr>
                  <td className="px-4 py-2.5">Zucker</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{rezept.zucker} %</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CrossLink href="/kochen/pizzateig-rechner" emoji="🍕" text="Pizzateig-Rechner mit Bäckerprozenten" />
      <CrossLink href="/kochen/hefe-umrechner" emoji="🥖" text="Hefe umrechnen: Frisch ↔ Trocken" />
      <CrossLink href="/kochen/backzeit-rechner" emoji="⏲️" text="Backzeit und Temperatur anpassen" />

      <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Brotback-Rechner" />

      <AiExplain
        rechnerName="Brotback-Rechner"
        eingaben={{
          brottyp: rezept.name,
          anzahl: `${anzahl} Brot/e`,
          teiggewicht: `${teigGewicht} g pro Brot`,
          triebmittel,
        }}
        ergebnis={{
          mehl: `${fmt(ergebnis.mehlHaupt, 0)} g Mehl (Hauptteig)`,
          wasser: `${fmt(ergebnis.wasserHaupt, 0)} g Wasser`,
          salz: `${fmt(ergebnis.salzMenge, 1)} g Salz`,
          ...(ergebnis.asg > 0 ? { sauerteig: `${fmt(ergebnis.asg, 0)} g Anstellgut` } : {}),
          ...(ergebnis.frischHefe > 0 ? { hefe: `${fmt(ergebnis.frischHefe, 1)} g Frischhefe` } : {}),
          backempfehlung: `${rezept.backtemp} °C, ca. ${rezept.backzeitMin} Min`,
        }}
      />
    </div>
  );
}
