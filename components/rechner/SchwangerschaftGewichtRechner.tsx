'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type BmiKat = 'unter' | 'normal' | 'ueber' | 'adipos';

const GESAMT_EINLING: Record<BmiKat, [number, number]> = {
  unter: [12.5, 18.0],
  normal: [11.5, 16.0],
  ueber: [7.0, 11.5],
  adipos: [5.0, 9.0],
};

const GESAMT_ZWILLING: Record<BmiKat, [number, number]> = {
  unter: [22.0, 28.0],
  normal: [17.0, 25.0],
  ueber: [14.0, 23.0],
  adipos: [11.0, 19.0],
};

// kg/Woche im 2.+3. Trimester
const PRO_WOCHE: Record<BmiKat, [number, number]> = {
  unter: [0.44, 0.58],
  normal: [0.35, 0.50],
  ueber: [0.23, 0.33],
  adipos: [0.17, 0.27],
};

function getKat(bmi: number): BmiKat {
  if (bmi < 18.5) return 'unter';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'ueber';
  return 'adipos';
}

const fmt = (n: number, d = 1) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function SchwangerschaftGewichtRechner() {
  const [vorGewicht, setVorGewicht] = useState('65');
  const [aktGewicht, setAktGewicht] = useState('72');
  const [groesse, setGroesse] = useState('168');
  const [ssw, setSsw] = useState('20');
  const [zwillinge, setZwillinge] = useState(false);

  const ergebnis = useMemo(() => {
    const vor = parseDeutscheZahl(vorGewicht) || 0;
    const akt = parseDeutscheZahl(aktGewicht) || 0;
    const gr = parseDeutscheZahl(groesse) || 0;
    const w = Math.max(1, Math.min(42, parseDeutscheZahl(ssw) || 0));

    const bmi = gr > 0 ? vor / ((gr / 100) ** 2) : 0;
    const kat = getKat(bmi);
    const katLabel: Record<BmiKat, string> = {
      unter: 'Untergewicht',
      normal: 'Normalgewicht',
      ueber: 'Übergewicht',
      adipos: 'Adipositas',
    };

    const gesamtRange = zwillinge ? GESAMT_ZWILLING[kat] : GESAMT_EINLING[kat];
    const proWocheRange = PRO_WOCHE[kat];

    // Erwartete Zunahme bis aktueller SSW (Mitte der Range)
    let erwartetUnten = 0;
    let erwartetOben = 0;
    if (w <= 12) {
      const faktor = w / 12;
      erwartetUnten = 0.5 * faktor;
      erwartetOben = 2.0 * faktor;
    } else {
      const wochenAb13 = w - 12;
      erwartetUnten = 0.5 + wochenAb13 * proWocheRange[0];
      erwartetOben = 2.0 + wochenAb13 * proWocheRange[1];
    }

    const aktuelleZunahme = akt - vor;
    const erwartetMitte = (erwartetUnten + erwartetOben) / 2;
    const differenz = aktuelleZunahme - erwartetMitte;

    let status: 'im' | 'ueber' | 'unter';
    if (aktuelleZunahme >= erwartetUnten && aktuelleZunahme <= erwartetOben) status = 'im';
    else if (aktuelleZunahme > erwartetOben) status = 'ueber';
    else status = 'unter';

    return {
      bmi,
      kat,
      katLabel: katLabel[kat],
      gesamtRange,
      proWocheRange,
      aktuelleZunahme,
      erwartetUnten,
      erwartetOben,
      erwartetMitte,
      differenz,
      status,
    };
  }, [vorGewicht, aktGewicht, groesse, ssw, zwillinge]);

  const statusColor = ergebnis.status === 'im' ? 'green' : 'yellow';
  const statusText = ergebnis.status === 'im'
    ? 'Im empfohlenen Bereich'
    : ergebnis.status === 'ueber'
      ? 'Über dem empfohlenen Bereich'
      : 'Unter dem empfohlenen Bereich';

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gewicht vor der Schwangerschaft</label>
          <NummerEingabe value={vorGewicht} onChange={setVorGewicht} einheit="kg" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Aktuelles Gewicht</label>
          <NummerEingabe value={aktGewicht} onChange={setAktGewicht} einheit="kg" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Körpergröße</label>
          <NummerEingabe value={groesse} onChange={setGroesse} einheit="cm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Aktuelle SSW</label>
          <NummerEingabe value={ssw} onChange={setSsw} einheit="SSW" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Einling oder Zwillinge?</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setZwillinge(false)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${!zwillinge ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Einling</button>
            <button onClick={() => setZwillinge(true)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${zwillinge ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>Zwillinge</button>
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Sie haben bisher zugenommen</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.aktuelleZunahme)} kg</p>
        <div className="mt-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor === 'green' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
            {statusText}
          </span>
        </div>
        <p className="text-white/80 text-sm mt-3">
          BMI vor SS: <strong>{fmt(ergebnis.bmi, 1)}</strong> ({ergebnis.katLabel})
        </p>
      </div>

      {/* Empfehlungen */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Empfehlung (IOM-Richtlinien)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Empfohlene Gesamtzunahme</span>
            <span className="font-medium">{fmt(ergebnis.gesamtRange[0])} – {fmt(ergebnis.gesamtRange[1])} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Erwartet bis SSW {ssw}</span>
            <span className="font-medium">{fmt(ergebnis.erwartetUnten)} – {fmt(ergebnis.erwartetOben)} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Pro Woche (2.+3. Trimester)</span>
            <span className="font-medium">{fmt(ergebnis.proWocheRange[0], 2)} – {fmt(ergebnis.proWocheRange[1], 2)} kg</span>
          </div>
        </div>
      </div>

      {/* Verteilung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Verteilung der Gewichtszunahme</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          {[
            ['Baby', '≈ 3,3 kg'],
            ['Plazenta', '≈ 0,7 kg'],
            ['Fruchtwasser', '≈ 0,9 kg'],
            ['Gebärmutter', '≈ 1,0 kg'],
            ['Brustgewebe', '≈ 0,5 kg'],
            ['Blutvolumen', '≈ 1,5 kg'],
            ['Wasser', '≈ 1,5 kg'],
            ['Fettreserven', '≈ 3,0 kg'],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1">
              <span className="text-gray-600 dark:text-gray-400">{l}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        ⚠️ Die Empfehlungen basieren auf den IOM-Richtlinien. Jede Schwangerschaft ist individuell — sprechen Sie Abweichungen mit Ihrer Hebamme oder Ihrem Arzt ab.
      </p>

      <CrossLink href="/gesundheit/ssw-rechner" emoji="🤰" text="SSW berechnen" />
      <CrossLink href="/gesundheit/geburtstermin-rechner" emoji="📅" text="Geburtstermin berechnen" />
      <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Schwangerschafts-Gewichtszunahme: ${fmt(ergebnis.aktuelleZunahme)} kg bei SSW ${ssw} (Empfohlen gesamt: ${fmt(ergebnis.gesamtRange[0])}–${fmt(ergebnis.gesamtRange[1])} kg)`}
        seitenTitel="Gewichtszunahme-Rechner (Schwangerschaft)"
      />

      <AiExplain
        rechnerName="Gewichtszunahme-Rechner (Schwangerschaft)"
        eingaben={{
          'Gewicht vor SS': `${vorGewicht} kg`,
          'Aktuelles Gewicht': `${aktGewicht} kg`,
          'Größe': `${groesse} cm`,
          'SSW': ssw,
          'Mehrlinge': zwillinge ? 'Zwillinge' : 'Einling',
        }}
        ergebnis={{
          'BMI vor SS': `${fmt(ergebnis.bmi, 1)} (${ergebnis.katLabel})`,
          'Aktuelle Zunahme': `${fmt(ergebnis.aktuelleZunahme)} kg`,
          'Empfohlene Gesamtzunahme': `${fmt(ergebnis.gesamtRange[0])}–${fmt(ergebnis.gesamtRange[1])} kg`,
          'Status': statusText,
        }}
      />
    </div>
  );
}
