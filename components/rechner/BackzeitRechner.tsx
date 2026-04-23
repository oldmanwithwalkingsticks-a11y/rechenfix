'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AmazonBox } from '@/components/AmazonBox';

type Herdart = 'ou' | 'umluft' | 'gasmark';

const GASMARK_TABELLE: Array<{ stufe: string; celsius: number }> = [
  { stufe: '¼', celsius: 110 },
  { stufe: '½', celsius: 120 },
  { stufe: '1', celsius: 140 },
  { stufe: '2', celsius: 150 },
  { stufe: '3', celsius: 160 },
  { stufe: '4', celsius: 180 },
  { stufe: '5', celsius: 190 },
  { stufe: '6', celsius: 200 },
  { stufe: '7', celsius: 220 },
  { stufe: '8', celsius: 230 },
  { stufe: '9', celsius: 240 },
];

const fmt = (n: number, d = 0): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

// Gasmark-Äquivalent für °C finden
function celsiusZuGasmark(celsius: number): string {
  const gefunden = [...GASMARK_TABELLE].reverse().find(g => g.celsius <= celsius);
  return gefunden ? gefunden.stufe : '—';
}

export default function BackzeitRechner() {
  const [origTemp, setOrigTemp] = useState('180');
  const [origZeit, setOrigZeit] = useState('45');
  const [zielTemp, setZielTemp] = useState('160');
  const [zielHerdart, setZielHerdart] = useState<Herdart>('umluft');
  const [formGeaendert, setFormGeaendert] = useState(false);
  const [formFaktor, setFormFaktor] = useState('0.7');

  const ergebnis = useMemo(() => {
    const tempOrig = parseDeutscheZahl(origTemp);
    const zeitOrig = parseDeutscheZahl(origZeit);
    const tempZiel = parseDeutscheZahl(zielTemp);
    const faktor = parseDeutscheZahl(formFaktor);

    // Bei Umluft: Umrechnung auf O/U-Äquivalent (+20 °C) für Vergleich
    // Aber wenn Nutzer Umluft will, ist die Zieltemperatur bereits die Umluft-Temp
    const tempDiff = tempOrig - tempZiel;

    // Backzeit an Temperaturänderung anpassen: −10 °C → +5–8 Min, +10 °C → −5 Min
    let zeitZiel = zeitOrig + (tempDiff / 10) * 6; // 6 Min pro 10 °C Differenz

    // Formgröße
    if (formGeaendert && faktor > 0 && faktor !== 1) {
      if (faktor < 1) {
        zeitZiel = zeitZiel * (1 + (1 - faktor) * 0.4); // +10–15 %
      } else {
        zeitZiel = zeitZiel * (1 - (faktor - 1) * 0.4); // −10–15 %
      }
    }

    // Negative/nulls verhindern
    zeitZiel = Math.max(5, zeitZiel);

    // Umrechnungen: welche Werte würden bei den anderen Herdarten gelten?
    const alsOU = zielHerdart === 'umluft' ? tempZiel + 20 : zielHerdart === 'gasmark' ? tempZiel : tempZiel;
    const alsUmluft = zielHerdart === 'ou' ? tempZiel - 20 : zielHerdart === 'gasmark' ? tempZiel - 20 : tempZiel;
    const alsGasmark = celsiusZuGasmark(zielHerdart === 'umluft' ? tempZiel + 20 : tempZiel);

    return {
      zeitZiel: Math.round(zeitZiel),
      tempZiel,
      tempDiff,
      alsOU,
      alsUmluft,
      alsGasmark,
    };
  }, [origTemp, origZeit, zielTemp, zielHerdart, formGeaendert, formFaktor]);

  return (
    <div>
      {/* === 1: Original === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Original (Rezeptangabe, Ober-/Unterhitze)
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="bz-orig-temp" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Temperatur</label>
            <NummerEingabe value={origTemp} onChange={setOrigTemp} placeholder="180" einheit="°C" />
          </div>
          <div>
            <label htmlFor="bz-orig-zeit" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Backzeit</label>
            <NummerEingabe value={origZeit} onChange={setOrigZeit} placeholder="45" einheit="Min" />
          </div>
        </div>
      </div>

      {/* === 2: Zielherdart === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Ihre Herdart
        </h2>
        <RadioToggleGroup
          name="bz-herdart"
          legend="Herdart"
          srOnlyLegend
          options={[
            { value: 'ou', label: 'Ober-/Unterhitze' },
            { value: 'umluft', label: '💨 Umluft' },
            { value: 'gasmark', label: '🔥 Gasmark' },
          ]}
          value={zielHerdart}
          onChange={(v) => {
            const h = v as Herdart;
            setZielHerdart(h);
            // Temperatur automatisch anpassen
            const tempOrig = parseDeutscheZahl(origTemp);
            if (h === 'umluft') setZielTemp(String(tempOrig - 20));
            else if (h === 'ou') setZielTemp(String(tempOrig));
          }}
          columns={3}
        />
      </div>

      {/* === 3: Zieltemperatur === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Gewünschte Temperatur ({zielHerdart === 'ou' ? 'O/U' : zielHerdart === 'umluft' ? 'Umluft' : 'Gasmark°C'})
        </h2>
        <NummerEingabe value={zielTemp} onChange={setZielTemp} placeholder="160" einheit="°C" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Tipp: Umluft liegt meist 20 °C unter Ober-/Unterhitze bei gleicher Zeit.
        </p>
      </div>

      {/* === 4: Form geändert? === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Formgröße geändert?
        </h2>
        <RadioToggleGroup
          name="bz-form"
          legend="Formgröße geändert?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein (gleiche Form)' },
            { value: 'ja', label: '📏 Ja' },
          ]}
          value={formGeaendert ? 'ja' : 'nein'}
          onChange={(v) => setFormGeaendert(v === 'ja')}
        />
        {formGeaendert && (
          <div className="mt-3">
            <label htmlFor="bz-faktor" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Backform-Faktor (z. B. 0,7 für kleinere Form — aus dem Backform-Umrechner)
            </label>
            <NummerEingabe value={formFaktor} onChange={setFormFaktor} placeholder="0,7" einheit="×" />
          </div>
        )}
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Angepasste Backzeit</p>
            <p className="text-5xl font-bold">{ergebnis.zeitZiel} Min</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Temperatur</p>
            <p className="text-5xl font-bold">{fmt(ergebnis.tempZiel)} °C</p>
            <p className="text-white/70 text-xs mt-1">
              {zielHerdart === 'ou' && 'Ober-/Unterhitze'}
              {zielHerdart === 'umluft' && 'Umluft'}
              {zielHerdart === 'gasmark' && `Gasmark ${celsiusZuGasmark(ergebnis.tempZiel)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Umrechnungstabelle Herdarten */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Herdart-Umrechnung</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Herdart</th>
                <th className="px-4 py-2 text-right font-semibold">Temperatur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr className={zielHerdart === 'ou' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Ober-/Unterhitze</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(ergebnis.alsOU)} °C</td>
              </tr>
              <tr className={zielHerdart === 'umluft' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Umluft (O/U − 20 °C)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(ergebnis.alsUmluft)} °C</td>
              </tr>
              <tr className={zielHerdart === 'gasmark' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Gasmark (Stufe)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">Stufe {ergebnis.alsGasmark}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gasmark-Komplett-Tabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Gasmark-Tabelle (komplett)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Gasmark</th>
                <th className="px-4 py-2 text-right font-semibold">°C (O/U)</th>
                <th className="px-4 py-2 text-right font-semibold">°C Umluft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {GASMARK_TABELLE.map(row => (
                <tr key={row.stufe}>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.stufe}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{row.celsius} °C</td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-500 dark:text-gray-400 whitespace-nowrap">{row.celsius - 20} °C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stäbchenprobe-Tipp */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>🎯 Stäbchenprobe — der ultimative Test:</strong> Stechen Sie 5 Minuten vor der berechneten Endzeit ein Holzstäbchen in die dickste Stelle. Bleibt kein Teig kleben → Kuchen ist fertig. Klebt noch Teig → weitere 3–5 Minuten backen. Bei Brownies und saftigen Kuchen soll das Stäbchen leicht feucht bleiben.
        </p>
      </div>

      <AmazonBox
        keyword="fleischthermometer digital"
        description="Die Stäbchenprobe ist gut — ein digitales Thermometer im Teig ist genauer. Piept, wenn die Zieltemperatur erreicht ist."
      />

      <CrossLink href="/kochen/backform-umrechner" emoji="🎂" text="Backform umrechnen" />
      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/mathe/einheiten-umrechner" emoji="📏" text="Einheiten umrechnen (Temperatur)" />

      <ErgebnisAktionen
        ergebnisText={`Backzeit-Rechner: Original ${origTemp} °C / ${origZeit} Min → ${fmt(ergebnis.tempZiel)} °C (${zielHerdart === 'ou' ? 'O/U' : zielHerdart === 'umluft' ? 'Umluft' : `Gasmark ${celsiusZuGasmark(ergebnis.tempZiel)}`}) / ${ergebnis.zeitZiel} Min`}
        seitenTitel="Backzeit-Rechner"
      />

      <AiExplain
        rechnerName="Backzeit-Rechner"
        eingaben={{
          originalTemp: `${origTemp} °C (O/U)`,
          originalZeit: `${origZeit} Min`,
          zielHerdart: zielHerdart === 'ou' ? 'Ober-/Unterhitze' : zielHerdart === 'umluft' ? 'Umluft' : 'Gasmark',
          zielTemp: `${zielTemp} °C`,
          formgeaendert: formGeaendert ? `Ja (Faktor ${formFaktor})` : 'Nein',
        }}
        ergebnis={{
          backzeit: `${ergebnis.zeitZiel} Min`,
          temperatur: `${fmt(ergebnis.tempZiel)} °C`,
          gasmark: `Stufe ${ergebnis.alsGasmark}`,
        }}
      />
    </div>
  );
}
