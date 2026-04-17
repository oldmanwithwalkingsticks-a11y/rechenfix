'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type HefeArt = 'frisch' | 'trocken';
type Gehzeit = 'direkt' | '8h' | '24h' | '48h';

// Bäckerprozent: Hefe vom Mehlgewicht
const HEFE_PROZ: Record<Gehzeit, number> = {
  direkt: 1.0,
  '8h': 0.5,
  '24h': 0.2,
  '48h': 0.1,
};

const fmt = (n: number, d = 1): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });

export default function PizzateigRechner() {
  const [anzahl, setAnzahl] = useState('4');
  const [gewichtProPizza, setGewichtProPizza] = useState('270');
  const [hydration, setHydration] = useState('65');
  const [hefeArt, setHefeArt] = useState<HefeArt>('frisch');
  const [gehzeit, setGehzeit] = useState<Gehzeit>('24h');
  const [mitOel, setMitOel] = useState(false);

  const hyd = useMemo(() => {
    const v = parseDeutscheZahl(hydration);
    return isNaN(v) ? 65 : Math.max(55, Math.min(80, v));
  }, [hydration]);

  const ergebnis = useMemo(() => {
    const n = Math.max(1, Math.round(parseDeutscheZahl(anzahl) || 1));
    const gpz = Math.max(100, parseDeutscheZahl(gewichtProPizza) || 270);
    const salzProz = 2.5;
    const oelProz = mitOel ? 2.0 : 0;
    const hefeProz = HEFE_PROZ[gehzeit];

    const gesamtTeig = n * gpz;
    // Bäckerprozente: Mehl = Gesamtteig / (1 + Σ alle Anteile)
    const divisor = 1 + hyd / 100 + salzProz / 100 + oelProz / 100 + hefeProz / 100;
    const mehl = gesamtTeig / divisor;
    const wasser = mehl * hyd / 100;
    const salz = mehl * salzProz / 100;
    const oel = mitOel ? mehl * oelProz / 100 : 0;
    const frischHefe = mehl * hefeProz / 100;
    const trockenHefe = frischHefe / 3;

    return { gesamtTeig, mehl, wasser, salz, oel, frischHefe, trockenHefe, hefeProz };
  }, [anzahl, gewichtProPizza, hyd, gehzeit, mitOel]);

  const hefe = hefeArt === 'frisch' ? ergebnis.frischHefe : ergebnis.trockenHefe;

  const ergebnisText = `Pizzateig für ${anzahl} Pizza(s): ${fmt(ergebnis.mehl, 0)} g Mehl, ${fmt(ergebnis.wasser, 0)} g Wasser, ${fmt(ergebnis.salz, 1)} g Salz, ${fmt(hefe, 1)} g ${hefeArt === 'frisch' ? 'Frischhefe' : 'Trockenhefe'}`;

  return (
    <div>
      {/* === 1+2: Anzahl und Gewicht === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Anzahl Pizzen
          </h2>
          <NummerEingabe value={anzahl} onChange={setAnzahl} placeholder="4" einheit="Stück" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Gewicht pro Pizza
          </h2>
          <NummerEingabe value={gewichtProPizza} onChange={setGewichtProPizza} placeholder="270" einheit="g" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Napoletana: 250–280 g | Normal: 300–350 g</p>
        </div>
      </div>

      {/* === 3: Hydration === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Wasseranteil (Hydration)
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={55}
            max={80}
            step={1}
            value={hyd}
            onChange={e => setHydration(e.target.value)}
            className="flex-1 accent-primary-600"
            aria-label="Hydration in Prozent"
          />
          <span className="w-14 text-right font-bold text-primary-700 dark:text-primary-400 tabular-nums">
            {hyd} %
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>55 % (fest, knusprig)</span>
          <span>65 % (neapolitanisch)</span>
          <span>80 % (sehr weich)</span>
        </div>
      </div>

      {/* === 4: Gehzeit === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Gehzeit / Reifezeit
        </h2>
        <label htmlFor="pizza-gehzeit" className="sr-only">Gehzeit</label>
        <select
          id="pizza-gehzeit"
          value={gehzeit}
          onChange={e => setGehzeit(e.target.value as Gehzeit)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="direkt">⚡ Direkt (1–2 h Raumtemperatur) — 1 % Hefe</option>
          <option value="8h">🌙 Über Nacht (8 h, Kühlschrank) — 0,5 % Hefe</option>
          <option value="24h">🕐 Lang (24 h, Kühlschrank) — 0,2 % Hefe</option>
          <option value="48h">⏳ Extra lang (48 h, Kühlschrank) — 0,1 % Hefe</option>
        </select>
      </div>

      {/* === 5: Hefe-Art + Öl === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
            Hefe-Art
          </h2>
          <label htmlFor="pizza-hefe-art" className="sr-only">Hefe-Art</label>
          <select
            id="pizza-hefe-art"
            value={hefeArt}
            onChange={e => setHefeArt(e.target.value as HefeArt)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
          >
            <option value="frisch">🧊 Frischhefe</option>
            <option value="trocken">🌾 Trockenhefe</option>
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-3 cursor-pointer py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-[48px]">
            <input
              type="checkbox"
              checked={mitOel}
              onChange={e => setMitOel(e.target.checked)}
              className="w-5 h-5 rounded accent-primary-600 shrink-0"
            />
            <div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">🫒 Mit Olivenöl (2 %)</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Ohne = authentisch neapolitanisch</span>
            </div>
          </label>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1 text-center">
          Teig für {fmt(parseDeutscheZahl(anzahl) || 4, 0)} Pizza(s) à {fmt(parseDeutscheZahl(gewichtProPizza) || 270, 0)} g
        </p>
        <p className="text-4xl font-bold text-center mb-4">{fmt(ergebnis.gesamtTeig, 0)} g Teig gesamt</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: '🌾 Mehl (Tipo 00)', wert: ergebnis.mehl, proz: '100 %' },
            { label: '💧 Wasser', wert: ergebnis.wasser, proz: `${hyd} %` },
            { label: '🧂 Salz', wert: ergebnis.salz, proz: '2,5 %' },
            ...(mitOel ? [{ label: '🫒 Olivenöl', wert: ergebnis.oel, proz: '2 %' }] : []),
            {
              label: hefeArt === 'frisch' ? '🧊 Frischhefe' : '🌾 Trockenhefe',
              wert: hefe,
              proz: `${fmt(ergebnis.hefeProz, 1)} %`,
            },
          ].map(item => (
            <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/70 text-xs mb-1">{item.label}</p>
              <p className="text-2xl font-bold">{fmt(item.wert, item.wert < 10 ? 1 : 0)} g</p>
              <p className="text-white/70 text-xs">{item.proz}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Zeitplan === */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
          ⏱️ Zeitplan{gehzeit !== 'direkt' ? ' — Kühlschrank-Reifung' : ' — Direktführung'}
        </h2>
        {gehzeit === 'direkt' ? (
          <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 w-10">0:00</span> Hefe in lauwarmem Wasser auflösen, 5 Min stehen lassen</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 w-10">0:10</span> Alle Zutaten verkneten (10–15 Min, bis glatter Teig)</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 w-10">0:25</span> Abdecken, bei Raumtemperatur gehen lassen (1–1,5 h)</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 w-10">1:30</span> Ballen formen ({fmt(parseDeutscheZahl(gewichtProPizza) || 270, 0)} g/Stück), 30 Min ruhen</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 w-10">2:00</span> Teig ausziehen (nicht rollen!), belegen und backen</li>
          </ol>
        ) : (
          <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 min-w-[4rem]">Tag 1, früh</span> Alle Zutaten mit kaltem Wasser verkneten (10–15 Min)</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 min-w-[4rem]">Tag 1</span> 30 Min bei Raumtemperatur anspringen lassen</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 min-w-[4rem]">Tag 1</span> Abgedeckt in den Kühlschrank (4–6 °C) für {gehzeit === '8h' ? '8 h' : gehzeit === '24h' ? '24 h' : '48 h'}</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 min-w-[4rem]">Backtag</span> 2–3 h vor dem Backen herausnehmen, Ballen formen</li>
            <li className="flex gap-3"><span className="font-bold text-primary-600 dark:text-primary-400 shrink-0 min-w-[4rem]">Backtag</span> Bei Raumtemperatur akklimatisieren, dann ausziehen und backen</li>
          </ol>
        )}
      </div>

      {/* === Backtipps === */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Backtipps für perfekte Pizza</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>Mehl:</strong> Tipo 00 (fein, W300+) für neapolitanische Pizza. Alternativ: Weizenmehl Type 405 oder 550.</li>
          <li>• <strong>Temperatur:</strong> Maximal heizen — 250–300 °C Ober-/Unterhitze. Pizzastein oder Stahlplatte mind. 60 Min vorheizen.</li>
          <li>• <strong>Teig ausziehen:</strong> Nie mit dem Nudelholz — von innen nach außen mit den Händen strecken, Rand stehen lassen.</li>
          <li>• <strong>Backzeit:</strong> 6–10 Min bei 250–280 °C. Im Holzofenpin (400 °C+) nur 60–90 Sekunden.</li>
          <li>• <strong>Salz und Hefe:</strong> Nie direkt in Kontakt bringen — Salz tötet Hefe. Erst Hefe in Wasser, Salz separat.</li>
        </ul>
      </div>

      {/* === Info-Box Bäckerprozente === */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>💡 Bäckerprozente:</strong> Alle Mengen sind relativ zum Mehlgewicht (= 100 %). {hyd} % Hydration bedeutet: {fmt(ergebnis.wasser, 0)} g Wasser auf {fmt(ergebnis.mehl, 0)} g Mehl. Weniger Hefe + längere Gehzeit = mehr Aroma und bessere Verdaulichkeit.
        </p>
      </div>

      <CrossLink href="/kochen/hefe-umrechner" emoji="🥖" text="Hefe umrechnen: Frisch ↔ Trocken ↔ Lievito Madre" />
      <CrossLink href="/kochen/brotback-rechner" emoji="🍞" text="Brotback-Rechner: Zutaten für 5 Brottypen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />

      <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Pizzateig-Rechner" />

      <AiExplain
        rechnerName="Pizzateig-Rechner"
        eingaben={{
          anzahl: `${anzahl} Pizzen`,
          gewicht: `${gewichtProPizza} g pro Pizza`,
          hydration: `${hyd} %`,
          gehzeit: gehzeit === 'direkt' ? '1–2 h direkt' : gehzeit === '8h' ? '8 h Kühlschrank' : gehzeit === '24h' ? '24 h Kühlschrank' : '48 h Kühlschrank',
          hefeArt,
          olivenoel: mitOel ? 'ja (2 %)' : 'nein (neapolitanisch)',
        }}
        ergebnis={{
          mehl: `${fmt(ergebnis.mehl, 0)} g Mehl (Tipo 00)`,
          wasser: `${fmt(ergebnis.wasser, 0)} g Wasser`,
          salz: `${fmt(ergebnis.salz, 1)} g Salz`,
          hefe: `${fmt(hefe, 1)} g ${hefeArt === 'frisch' ? 'Frischhefe' : 'Trockenhefe'} (${fmt(ergebnis.hefeProz, 1)} %)`,
          ...(mitOel ? { oel: `${fmt(ergebnis.oel, 1)} g Olivenöl` } : {}),
        }}
      />
    </div>
  );
}
