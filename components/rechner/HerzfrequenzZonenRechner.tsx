'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import { berechneHerzfrequenzZonen, type Formel } from '@/lib/berechnungen/herzfrequenz-zonen';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AmazonBox } from '@/components/AmazonBox';

type Sportart = 'laufen' | 'radfahren' | 'schwimmen';

const fmt = (n: number): string => Math.round(n).toString();

/** UI-Styling pro Zonen-Nummer (Farben werden in der Lib bewusst nicht modelliert). */
const ZONEN_STYLE: Record<number, { farbe: string; textFarbe: string }> = {
  1: { farbe: 'bg-green-200 dark:bg-green-800',   textFarbe: 'text-green-950 dark:text-green-50' },
  2: { farbe: 'bg-green-500 dark:bg-green-800',   textFarbe: 'text-green-950 dark:text-white' },
  3: { farbe: 'bg-yellow-400 dark:bg-yellow-800', textFarbe: 'text-yellow-950 dark:text-white' },
  4: { farbe: 'bg-orange-500 dark:bg-orange-800', textFarbe: 'text-orange-950 dark:text-white' },
  5: { farbe: 'bg-red-700 dark:bg-red-900',       textFarbe: 'text-white dark:text-white' },
};

export default function HerzfrequenzZonenRechner() {
  const [alter, setAlter] = useState('30');
  const [ruhepuls, setRuhepuls] = useState('65');
  const [hfmaxEigen, setHfmaxEigen] = useState('');
  const [formel, setFormel] = useState<Formel>('tanaka');
  const [sportart, setSportart] = useState<Sportart>('laufen');

  const ergebnis = useMemo(() => {
    const lib = berechneHerzfrequenzZonen({
      alter: parseDeutscheZahl(alter),
      ruhepuls: parseDeutscheZahl(ruhepuls),
      hfmaxEigen: parseDeutscheZahl(hfmaxEigen),
      formel,
    });

    // UI-Styling überlagern (Farben sind nicht Teil der Lib).
    const zonen = lib.zonen.map(z => ({ ...z, ...ZONEN_STYLE[z.nr] }));
    return { ...lib, zonen };
  }, [alter, ruhepuls, hfmaxEigen, formel]);

  const sportartHinweis = useMemo(() => {
    switch (sportart) {
      case 'laufen':    return 'Laufen: Im Training 80 % in Zone 1–2 (locker), 20 % in Zone 4–5 (hart) = 80/20-Regel.';
      case 'radfahren': return 'Radfahren: HFmax beim Radfahren liegt typ. 5–10 bpm unter der Lauf-HFmax. Zonen entsprechend anpassen.';
      case 'schwimmen': return 'Schwimmen: HFmax beim Schwimmen liegt typ. 10–15 bpm unter der Lauf-HFmax. Pulsmessung im Wasser ist schwierig — Empfehlung: Wasserfest-Uhr oder Strap.';
    }
  }, [sportart]);

  return (
    <div>
      {/* === 1: Alter === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Alter
        </h2>
        <NummerEingabe value={alter} onChange={setAlter} placeholder="30" einheit="Jahre" />
      </div>

      {/* === 2: Ruhepuls === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Ruhepuls (optional — für Karvonen-Formel)
        </h2>
        <NummerEingabe value={ruhepuls} onChange={setRuhepuls} placeholder="65" einheit="bpm" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Morgens im Bett messen, vor dem Aufstehen. Trainierte: 50–60 bpm. Untrainierte: 70–80 bpm.
        </p>
      </div>

      {/* === 3: HFmax optional === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Maximale Herzfrequenz (optional)
        </h2>
        <NummerEingabe value={hfmaxEigen} onChange={setHfmaxEigen} placeholder="z. B. 185" einheit="bpm" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Falls Sie Ihre HFmax aus einem Belastungstest kennen — sonst wird sie nach Formel berechnet.
        </p>
      </div>

      {/* === 4: Formel === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Berechnungsformel
        </h2>
        <label htmlFor="hf-formel" className="sr-only">Formel</label>
        <select
          id="hf-formel"
          value={formel}
          onChange={e => setFormel(e.target.value as Formel)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="tanaka">Tanaka (genauer): 208 − 0,7 × Alter</option>
          <option value="standard">Standard (Fox): 220 − Alter</option>
          <option value="karvonen">Karvonen (mit Ruhepuls)</option>
        </select>
      </div>

      {/* === 5: Sportart === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
          Sportart
        </h2>
        <label htmlFor="hf-sportart" className="sr-only">Sportart</label>
        <select
          id="hf-sportart"
          value={sportart}
          onChange={e => setSportart(e.target.value as Sportart)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          <option value="laufen">🏃 Laufen</option>
          <option value="radfahren">🚴 Radfahren</option>
          <option value="schwimmen">🏊 Schwimmen</option>
        </select>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6 text-center">
        <p className="text-white/80 text-sm mb-1">Maximale Herzfrequenz (HFmax)</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.hfmax)} bpm</p>
        <p className="text-white/80 text-sm mt-2">
          {formel === 'standard' && '220 − Alter'}
          {formel === 'tanaka' && '208 − 0,7 × Alter (Tanaka)'}
          {formel === 'karvonen' && `Karvonen (Reserve: ${fmt(ergebnis.hfReserve)} bpm)`}
        </p>
      </div>

      {/* 5 Zonen als Balken */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">5 Trainingszonen {formel === 'karvonen' && parseDeutscheZahl(ruhepuls) > 0 ? '(nach Karvonen)' : '(nach % HFmax)'}</h2>
        <div className="space-y-2">
          {ergebnis.zonen.map(z => (
            <div key={z.nr} className={`rounded-lg p-3 ${z.farbe}`}>
              <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${z.textFarbe}`}>
                <div>
                  <p className="font-bold text-sm">Zone {z.nr}: {z.name}</p>
                  <p className="text-xs">{z.beschreibung}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg tabular-nums">{fmt(z.bpmMin)}–{fmt(z.bpmMax)} bpm</p>
                  <p className="text-xs">{Math.round(z.min * 100)}–{Math.round(z.max * 100)} % HFmax</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empfehlung */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>🎯 Empfehlung:</strong> Für Fettverbrennung und Grundlagenausdauer Zone 2 ({fmt(ergebnis.zonen[1].bpmMin)}–{fmt(ergebnis.zonen[1].bpmMax)} bpm). Für Leistungssteigerung Zone 4 ({fmt(ergebnis.zonen[3].bpmMin)}–{fmt(ergebnis.zonen[3].bpmMax)} bpm). Nach der 80/20-Regel: 80 % aller Trainings in Zone 1–2, 20 % in Zone 4–5, Zone 3 vermeiden.
        </p>
      </div>

      {/* Sportart-Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-sm">
          <strong>💡 {sportart === 'laufen' ? '🏃' : sportart === 'radfahren' ? '🚴' : '🏊'} {sportart === 'laufen' ? 'Laufen' : sportart === 'radfahren' ? 'Radfahren' : 'Schwimmen'}:</strong> {sportartHinweis}
        </p>
      </div>

      {/* Formelvergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Formeln im Vergleich</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Formel</th>
                <th className="px-4 py-2 text-right font-semibold">HFmax</th>
                <th className="px-4 py-2 text-left font-semibold">Hinweis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr className={formel === 'standard' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Standard (Fox)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(ergebnis.hfStandard)} bpm</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-xs">220 − Alter · einfach, ungenau</td>
              </tr>
              <tr className={formel === 'tanaka' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Tanaka (2001)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(ergebnis.hfTanaka)} bpm</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-xs">208 − 0,7 × Alter · wissenschaftlich validiert</td>
              </tr>
              <tr className={formel === 'karvonen' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Karvonen</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmt(ergebnis.hfmax)} bpm</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-xs">Reserve = HFmax − Ruhepuls · individueller</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis */}
      <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-xs">
          <strong>ℹ️ Hinweis:</strong> Formeln sind Schätzungen — die echte HFmax kann ±10 bpm abweichen. Für genaue Werte ist ein medizinischer Belastungstest nötig. Bei Herz-Kreislauf-Erkrankungen vor Trainingsbeginn den Arzt konsultieren.
        </p>
      </div>

      <AmazonBox
        keyword="sportuhr pulsmesser"
        description="Um in der gewünschten Zone zu trainieren, brauchen Sie die Zahl live am Handgelenk. Sportuhren mit Brustgurt sind beim Puls am genauesten."
      />

      <CrossLink href="/sport/pace-rechner" emoji="🏃" text="Pace beim Laufen berechnen" />
      <CrossLink href="/gesundheit/blutdruck-rechner" emoji="🩺" text="Blutdruck einordnen" />
      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienverbrauch berechnen" />
      <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Herzfrequenz-Zonen: HFmax ${fmt(ergebnis.hfmax)} bpm (${formel === 'standard' ? '220 − Alter' : formel === 'tanaka' ? 'Tanaka' : 'Karvonen'}) | Zone 2 (Fettverbrennung): ${fmt(ergebnis.zonen[1].bpmMin)}–${fmt(ergebnis.zonen[1].bpmMax)} bpm | Zone 4 (Leistung): ${fmt(ergebnis.zonen[3].bpmMin)}–${fmt(ergebnis.zonen[3].bpmMax)} bpm`}
        seitenTitel="Herzfrequenz-Zonen-Rechner"
      />

      <AiExplain
        rechnerName="Herzfrequenz-Zonen-Rechner"
        eingaben={{
          alter: `${alter} Jahre`,
          ruhepuls: `${ruhepuls} bpm`,
          hfmaxEigen: hfmaxEigen ? `${hfmaxEigen} bpm` : '(berechnet)',
          formel: formel === 'standard' ? 'Standard (220 − Alter)' : formel === 'tanaka' ? 'Tanaka' : 'Karvonen',
          sportart,
        }}
        ergebnis={{
          hfmax: `${fmt(ergebnis.hfmax)} bpm`,
          zone1: `${fmt(ergebnis.zonen[0].bpmMin)}–${fmt(ergebnis.zonen[0].bpmMax)} bpm (Regeneration)`,
          zone2: `${fmt(ergebnis.zonen[1].bpmMin)}–${fmt(ergebnis.zonen[1].bpmMax)} bpm (Grundlagenausdauer)`,
          zone3: `${fmt(ergebnis.zonen[2].bpmMin)}–${fmt(ergebnis.zonen[2].bpmMax)} bpm (Aerob)`,
          zone4: `${fmt(ergebnis.zonen[3].bpmMin)}–${fmt(ergebnis.zonen[3].bpmMax)} bpm (Anaerob)`,
          zone5: `${fmt(ergebnis.zonen[4].bpmMin)}–${fmt(ergebnis.zonen[4].bpmMax)} bpm (Maximum)`,
        }}
      />
    </div>
  );
}
