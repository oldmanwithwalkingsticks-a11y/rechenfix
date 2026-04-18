'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl, clampInputValue } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Modus = 'pace' | 'zeit' | 'distanz';

const DISTANZ_PRESETS: Array<{ label: string; km: number }> = [
  { label: '5 km',           km: 5 },
  { label: '10 km',          km: 10 },
  { label: 'Halbmarathon',   km: 21.0975 },
  { label: 'Marathon',       km: 42.195 },
];

const fmtZahl = (n: number, dezimal = 2): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: dezimal });

// Konvertierung: Sekunden → "HH:MM:SS" oder "MM:SS"
function fmtZeit(sekunden: number, mitStunden = true): string {
  if (!isFinite(sekunden) || sekunden < 0) return '—';
  const h = Math.floor(sekunden / 3600);
  const m = Math.floor((sekunden % 3600) / 60);
  const s = Math.round(sekunden % 60);
  if (mitStunden && h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

// "5:30" → 330 Sekunden pro km
function parsePace(paceMin: string, paceSek: string): number {
  const m = parseInt(paceMin, 10) || 0;
  const s = parseInt(paceSek, 10) || 0;
  return m * 60 + s;
}

function leistungsstufe(paceMinKm: number): string {
  if (paceMinKm > 420) return 'Anfänger';
  if (paceMinKm >= 300) return 'Fortgeschritten';
  if (paceMinKm >= 240) return 'Ambitioniert';
  return 'Elite';
}

function leistungsfarbe(stufe: string): string {
  switch (stufe) {
    case 'Anfänger':      return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10';
    case 'Fortgeschritten': return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-500/10';
    case 'Ambitioniert':  return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10';
    case 'Elite':         return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-500/10';
    default:              return '';
  }
}

export default function PaceRechner() {
  const [modus, setModus] = useState<Modus>('pace');
  const [distanz, setDistanz] = useState('10');
  const [stunden, setStunden] = useState('0');
  const [minuten, setMinuten] = useState('55');
  const [sekunden, setSekunden] = useState('0');
  const [paceMin, setPaceMin] = useState('5');
  const [paceSek, setPaceSek] = useState('30');

  // Berechnung
  const ergebnis = useMemo(() => {
    const dist = parseDeutscheZahl(distanz); // km
    const zeitSek = (parseInt(stunden, 10) || 0) * 3600
      + (parseInt(minuten, 10) || 0) * 60
      + (parseInt(sekunden, 10) || 0);
    const paceSekProKm = parsePace(paceMin, paceSek);

    let finalPace = paceSekProKm;
    let finalZeit = zeitSek;
    let finalDistanz = dist;

    if (modus === 'pace' && dist > 0 && zeitSek > 0) {
      finalPace = zeitSek / dist;
    } else if (modus === 'zeit' && dist > 0 && paceSekProKm > 0) {
      finalZeit = paceSekProKm * dist;
    } else if (modus === 'distanz' && paceSekProKm > 0 && zeitSek > 0) {
      finalDistanz = zeitSek / paceSekProKm;
    }

    const paceMinKm = finalPace;           // sek/km
    const paceMinMi = finalPace * 1.60934; // sek/mi
    const kmh = paceMinKm > 0 ? 3600 / paceMinKm : 0;

    const stufe = leistungsstufe(paceMinKm);

    // Split-Tabelle: Zeit bei jedem km
    const splitAnzahl = Math.min(Math.ceil(finalDistanz), 42);
    const splits: Array<{ km: number; zeit: string }> = [];
    for (let km = 1; km <= splitAnzahl; km++) {
      splits.push({ km, zeit: fmtZeit(km * paceMinKm) });
    }
    if (finalDistanz % 1 !== 0 && finalDistanz > 0) {
      splits.push({
        km: Math.round(finalDistanz * 10000) / 10000,
        zeit: fmtZeit(finalDistanz * paceMinKm),
      });
    }

    return {
      paceMinKm,
      paceMinMi,
      kmh,
      finalZeit,
      finalDistanz,
      stufe,
      splits,
    };
  }, [modus, distanz, stunden, minuten, sekunden, paceMin, paceSek]);

  const paceLabel = fmtZeit(ergebnis.paceMinKm, false);
  const paceLabelMi = fmtZeit(ergebnis.paceMinMi, false);
  const zeitLabel = fmtZeit(ergebnis.finalZeit, true);

  // Vergleichstabelle: Pace für gängige Zielzeiten
  const zielzeitTabelle: Array<{ event: string; dist: number; zielzeit: string; zielSek: number }> = [
    { event: '5 km',         dist: 5,       zielzeit: '25:00', zielSek: 25*60 },
    { event: '5 km',         dist: 5,       zielzeit: '30:00', zielSek: 30*60 },
    { event: '10 km',        dist: 10,      zielzeit: '50:00', zielSek: 50*60 },
    { event: '10 km',        dist: 10,      zielzeit: '60:00', zielSek: 60*60 },
    { event: 'Halbmarathon', dist: 21.0975, zielzeit: '1:45:00', zielSek: 105*60 },
    { event: 'Halbmarathon', dist: 21.0975, zielzeit: '2:00:00', zielSek: 120*60 },
    { event: 'Marathon',     dist: 42.195,  zielzeit: '3:30:00', zielSek: 210*60 },
    { event: 'Marathon',     dist: 42.195,  zielzeit: '4:00:00', zielSek: 240*60 },
    { event: 'Marathon',     dist: 42.195,  zielzeit: '4:30:00', zielSek: 270*60 },
  ];

  return (
    <div>
      {/* === 1: Modus === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Berechnungsmodus
        </h2>
        <RadioToggleGroup
          name="pace-modus"
          legend="Modus"
          srOnlyLegend
          options={[
            { value: 'pace',    label: 'Pace berechnen' },
            { value: 'zeit',    label: 'Zielzeit berechnen' },
            { value: 'distanz', label: 'Distanz berechnen' },
          ]}
          value={modus}
          onChange={(v) => setModus(v as Modus)}
          columns={3}
        />
      </div>

      {/* === 2: Distanz === */}
      {modus !== 'distanz' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Distanz
          </h2>
          <NummerEingabe value={distanz} onChange={setDistanz} placeholder="10" einheit="km" />
          <div className="mt-2 flex flex-wrap gap-2">
            {DISTANZ_PRESETS.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => setDistanz(String(p.km).replace('.', ','))}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* === 3: Zeit === */}
      {modus !== 'zeit' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            {modus === 'distanz' ? 'Verfügbare Zeit' : 'Gelaufene Zeit'}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label htmlFor="pace-std" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Stunden</label>
              <input
                id="pace-std"
                type="number"
                min="0"
                max="99"
                value={stunden}
                onChange={e => setStunden(clampInputValue(e.target.value, 0, 99))}
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center"
              />
            </div>
            <div>
              <label htmlFor="pace-min" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Minuten</label>
              <input
                id="pace-min"
                type="number"
                min="0"
                max="59"
                value={minuten}
                onChange={e => setMinuten(clampInputValue(e.target.value, 0, 59))}
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center"
              />
            </div>
            <div>
              <label htmlFor="pace-sek" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Sekunden</label>
              <input
                id="pace-sek"
                type="number"
                min="0"
                max="59"
                value={sekunden}
                onChange={e => setSekunden(clampInputValue(e.target.value, 0, 59))}
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center"
              />
            </div>
          </div>
        </div>
      )}

      {/* === 4: Pace === */}
      {modus !== 'pace' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Pace (min:sek pro km)
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pace-p-min" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Minuten</label>
              <input
                id="pace-p-min"
                type="number"
                min="2"
                max="15"
                value={paceMin}
                onChange={e => setPaceMin(clampInputValue(e.target.value, 2, 15))}
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center"
              />
            </div>
            <div>
              <label htmlFor="pace-p-sek" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Sekunden</label>
              <input
                id="pace-p-sek"
                type="number"
                min="0"
                max="59"
                value={paceSek}
                onChange={e => setPaceSek(clampInputValue(e.target.value, 0, 59))}
                className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm text-center"
              />
            </div>
          </div>
        </div>
      )}

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Pace</p>
            <p className="text-4xl font-bold">{paceLabel}</p>
            <p className="text-white/70 text-xs mt-1">min/km</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Zielzeit</p>
            <p className="text-4xl font-bold">{zeitLabel}</p>
            <p className="text-white/70 text-xs mt-1">über {fmtZahl(ergebnis.finalDistanz, 2)} km</p>
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Geschwindigkeit</p>
            <p className="text-4xl font-bold">{fmtZahl(ergebnis.kmh, 2)}</p>
            <p className="text-white/70 text-xs mt-1">km/h</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {paceLabelMi} min/mi
          </span>
          <span className={`px-2.5 py-1 rounded-lg font-semibold ${leistungsfarbe(ergebnis.stufe).replace('bg-', 'bg-white/').replace('text-', 'text-')}`} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {ergebnis.stufe}
          </span>
        </div>
      </div>

      {/* Split-Tabelle */}
      {ergebnis.splits.length > 0 && ergebnis.finalDistanz > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
          <div className="px-4 pt-4 pb-1">
            <h2 className="font-bold text-gray-700 dark:text-gray-200">Split-Tabelle (Zwischenzeiten bei konstanter Pace)</h2>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700/90">
                <tr className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  <th className="px-4 py-2 text-left font-semibold">Kilometer</th>
                  <th className="px-4 py-2 text-right font-semibold">Zeit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ergebnis.splits.map((s, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      km {typeof s.km === 'number' && s.km % 1 !== 0 ? fmtZahl(s.km, 4) : s.km}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{s.zeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leistungseinordnung */}
      <div className={`rounded-xl border p-4 mb-6 ${leistungsfarbe(ergebnis.stufe)}`}>
        <p className="text-sm">
          <strong>🎯 Leistungseinordnung: {ergebnis.stufe}</strong> · Anfänger: &gt; 7:00 min/km · Fortgeschritten: 5:00–6:00 · Ambitioniert: 4:00–5:00 · Elite: &lt; 3:30
        </p>
      </div>

      {/* Zielzeit-Tabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Pace für gängige Zielzeiten</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Wettkampf</th>
                <th className="px-4 py-2 text-right font-semibold">Zielzeit</th>
                <th className="px-4 py-2 text-right font-semibold">Pace</th>
                <th className="px-4 py-2 text-right font-semibold">km/h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {zielzeitTabelle.map((row, idx) => {
                const pace = row.zielSek / row.dist;
                return (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.event}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{row.zielzeit}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap font-semibold">{fmtZeit(pace, false)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtZahl(3600 / pace, 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CrossLink href="/sport/herzfrequenz-zonen-rechner" emoji="❤️" text="Herzfrequenz-Zonen berechnen" />
      <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienverbrauch berechnen" />
      <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Pace-Rechner: ${fmtZahl(ergebnis.finalDistanz, 2)} km in ${zeitLabel} | Pace ${paceLabel} min/km (${paceLabelMi} min/mi) | ${fmtZahl(ergebnis.kmh, 2)} km/h | Leistung: ${ergebnis.stufe}`}
        seitenTitel="Pace-Rechner"
      />

      <AiExplain
        rechnerName="Pace-Rechner"
        eingaben={{
          modus: modus === 'pace' ? 'Pace berechnen' : modus === 'zeit' ? 'Zielzeit berechnen' : 'Distanz berechnen',
          distanz: `${fmtZahl(ergebnis.finalDistanz, 2)} km`,
          zeit: zeitLabel,
        }}
        ergebnis={{
          pace: `${paceLabel} min/km`,
          paceMi: `${paceLabelMi} min/mi`,
          kmh: `${fmtZahl(ergebnis.kmh, 2)} km/h`,
          leistung: ergebnis.stufe,
        }}
      />
    </div>
  );
}
