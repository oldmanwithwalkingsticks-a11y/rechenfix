'use client';

import { useState, useMemo } from 'react';
import { berechneWasserbedarf, type AktivitaetsLevel, type SchwangerStillend } from '@/lib/berechnungen/wasserbedarf';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const AKTIVITAETS_OPTIONEN: { key: AktivitaetsLevel; label: string }[] = [
  { key: 'kaum', label: 'Kaum aktiv (Bürojob)' },
  { key: 'leicht', label: 'Leicht aktiv (leichte Bewegung)' },
  { key: 'maessig', label: 'Mäßig aktiv (3-5× Sport/Woche)' },
  { key: 'sehr', label: 'Sehr aktiv (täglicher Sport)' },
  { key: 'extrem', label: 'Extrem aktiv (Leistungssport)' },
];

const SCHWANGER_OPTIONEN: { key: SchwangerStillend; label: string }[] = [
  { key: 'nein', label: 'Nein' },
  { key: 'schwanger', label: 'Schwanger (+300 ml)' },
  { key: 'stillend', label: 'Stillend (+700 ml)' },
];

export default function WasserbedarfRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [aktivitaet, setAktivitaet] = useState<AktivitaetsLevel>('leicht');
  const [sportMinuten, setSportMinuten] = useState('0');
  const [heiss, setHeiss] = useState(false);
  const [schwangerStillend, setSchwangerStillend] = useState<SchwangerStillend>('nein');

  const nGewicht = parseDeutscheZahl(gewicht);
  const nSportMinuten = parseDeutscheZahl(sportMinuten);

  const ergebnis = useMemo(
    () => berechneWasserbedarf({
      gewicht: nGewicht,
      aktivitaet,
      sportMinuten: nSportMinuten,
      heiss,
      schwangerStillend,
    }),
    [nGewicht, aktivitaet, nSportMinuten, heiss, schwangerStillend],
  );

  const fmt = (n: number) => n.toLocaleString('de-DE');

  return (
    <div>
      {/* Gewicht & Aktivität */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
          <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="z.B. 75" einheit="kg" />
        </div>
        <div>
          <label htmlFor="wasserbedarf-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivitätslevel</label>
          <select id="wasserbedarf-select-1"
            value={aktivitaet}
            onChange={e => setAktivitaet(e.target.value as AktivitaetsLevel)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {AKTIVITAETS_OPTIONEN.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sport & Temperatur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sportdauer heute</label>
          <NummerEingabe value={sportMinuten} onChange={setSportMinuten} placeholder="z.B. 60" einheit="Min." />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Pro 30 Min. Sport ca. 350 ml zusätzlich.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temperatur / Jahreszeit</label>
          <div className="flex gap-2">
            <button
              onClick={() => setHeiss(false)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                !heiss
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setHeiss(true)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                heiss
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              Heiß / Sommer
            </button>
          </div>
        </div>
      </div>

      {/* Schwanger/Stillend */}
      <div className="mb-6">
        <label htmlFor="wasserbedarf-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schwanger oder stillend?</label>
        <div className="w-full sm:w-1/2">
          <select id="wasserbedarf-select-2"
            value={schwangerStillend}
            onChange={e => setSchwangerStillend(e.target.value as SchwangerStillend)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {SCHWANGER_OPTIONEN.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Empfohlene tägliche Trinkmenge</p>
            <p className="text-5xl font-bold">{ergebnis.gesamtLiter.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Liter</p>
            <p className="text-white/70 text-sm mt-2">
              Das entspricht ca. <strong>{ergebnis.anzahlGlaeser} Gläsern</strong> Wasser (à 250 ml)
            </p>
          </div>

          {/* Gläser-Visualisierung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Ihre {ergebnis.anzahlGlaeser} Gläser am Tag</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(ergebnis.anzahlGlaeser, 20) }).map((_, i) => (
                <div
                  key={i}
                  className="relative w-8 h-10 rounded-b-lg border-2 border-blue-300 dark:border-blue-500 overflow-hidden"
                  title={`Glas ${i + 1}`}
                >
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-400/60 dark:bg-blue-500/60" style={{ height: '80%' }} />
                </div>
              ))}
              {ergebnis.anzahlGlaeser > 20 && (
                <span className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">+{ergebnis.anzahlGlaeser - 20}</span>
              )}
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Basisbedarf ({nGewicht} kg × {aktivitaet === 'kaum' ? '30' : aktivitaet === 'leicht' ? '35' : aktivitaet === 'maessig' ? '40' : aktivitaet === 'sehr' ? '45' : '50'} ml/kg)</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.basisbedarf)} ml</span>
              </div>
              {ergebnis.sportZuschlag > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Sport-Zuschlag ({fmt(nSportMinuten)} Min.)</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+{fmt(ergebnis.sportZuschlag)} ml</span>
                </div>
              )}
              {ergebnis.hitzeZuschlag > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Hitze-Zuschlag</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">+{fmt(ergebnis.hitzeZuschlag)} ml</span>
                </div>
              )}
              {ergebnis.schwangerZuschlag > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{schwangerStillend === 'schwanger' ? 'Schwangerschaft' : 'Stillzeit'}</span>
                  <span className="font-semibold text-pink-600 dark:text-pink-400">+{fmt(ergebnis.schwangerZuschlag)} ml</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-700 dark:text-gray-200 font-bold">Gesamter Tagesbedarf</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtMl)} ml ({ergebnis.gesamtLiter.toLocaleString('de-DE', { minimumFractionDigits: 1 })} L)</span>
              </div>
            </div>

            {/* Balken */}
            <div className="mt-4">
              <div className="flex h-5 rounded-full overflow-hidden">
                <div className="bg-blue-400 dark:bg-blue-500 h-full transition-all" style={{ width: `${(ergebnis.basisbedarf / ergebnis.gesamtMl) * 100}%` }} />
                {ergebnis.sportZuschlag > 0 && (
                  <div className="bg-green-400 dark:bg-green-500 h-full transition-all" style={{ width: `${(ergebnis.sportZuschlag / ergebnis.gesamtMl) * 100}%` }} />
                )}
                {ergebnis.hitzeZuschlag > 0 && (
                  <div className="bg-orange-400 dark:bg-orange-500 h-full transition-all" style={{ width: `${(ergebnis.hitzeZuschlag / ergebnis.gesamtMl) * 100}%` }} />
                )}
                {ergebnis.schwangerZuschlag > 0 && (
                  <div className="bg-pink-400 dark:bg-pink-500 h-full transition-all" style={{ width: `${(ergebnis.schwangerZuschlag / ergebnis.gesamtMl) * 100}%` }} />
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 dark:bg-blue-500 inline-block" />
                  Basis
                </span>
                {ergebnis.sportZuschlag > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500 inline-block" />
                    Sport
                  </span>
                )}
                {ergebnis.hitzeZuschlag > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 dark:bg-orange-500 inline-block" />
                    Hitze
                  </span>
                )}
                {ergebnis.schwangerZuschlag > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400 dark:bg-pink-500 inline-block" />
                    {schwangerStillend === 'schwanger' ? 'Schwangerschaft' : 'Stillzeit'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tipp-Box */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
            <p className="text-green-800 dark:text-green-300 text-sm">
              <strong>Tipp:</strong> Verteilen Sie die Trinkmenge über den Tag. Ein guter Rhythmus: ein Glas direkt nach dem Aufstehen, dann zu jeder Mahlzeit und zwischendurch. Stellen Sie sich eine Wasserflasche an den Arbeitsplatz als Erinnerung.
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Hinweis:</strong> Ein Teil des Wasserbedarfs wird über die Nahrung gedeckt (ca. 20-30%). Die angezeigte Menge ist die empfohlene reine Trinkmenge. Bei Nierenerkrankungen oder anderen Vorerkrankungen sprechen Sie bitte mit Ihrem Arzt.
            </p>
          </div>

          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf passend zum Wasserbedarf" />
          <CrossLink href="/gesundheit/bmi-rechner" emoji="📊" text="BMI berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Täglicher Wasserbedarf: ${ergebnis.gesamtLiter.toLocaleString('de-DE', { minimumFractionDigits: 1 })} Liter (${ergebnis.anzahlGlaeser} Gläser) | Basis: ${fmt(ergebnis.basisbedarf)} ml${ergebnis.sportZuschlag > 0 ? ` + Sport: ${fmt(ergebnis.sportZuschlag)} ml` : ''}${ergebnis.hitzeZuschlag > 0 ? ' + Hitze: 500 ml' : ''}`}
            seitenTitel="Wasserbedarf-Rechner"
          />

          <AiExplain
            rechnerName="Wasserbedarf-Rechner"
            eingaben={{
              gewicht: nGewicht,
              aktivitaet: AKTIVITAETS_OPTIONEN.find(o => o.key === aktivitaet)?.label || aktivitaet,
              sportMinuten: nSportMinuten,
              temperatur: heiss ? 'Heiß/Sommer' : 'Normal',
              schwangerStillend: SCHWANGER_OPTIONEN.find(o => o.key === schwangerStillend)?.label || 'Nein',
            }}
            ergebnis={{
              gesamtLiter: ergebnis.gesamtLiter,
              gesamtMl: ergebnis.gesamtMl,
              anzahlGlaeser: ergebnis.anzahlGlaeser,
              basisbedarf: ergebnis.basisbedarf,
              sportZuschlag: ergebnis.sportZuschlag,
            }}
          />
        </>
      )}
    </div>
  );
}
