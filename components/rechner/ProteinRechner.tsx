'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Aktivitaet = 'kaum' | 'leicht' | 'kraft' | 'intensiv' | 'ausdauer';
type Ziel = 'halten' | 'aufbau' | 'abnehmen';

const AKTIVITAETEN: { key: Aktivitaet; label: string; faktor: number }[] = [
  { key: 'kaum',     label: 'Kaum aktiv / kein Sport',            faktor: 0.8 },
  { key: 'leicht',   label: 'Leicht aktiv / Hobbysport',          faktor: 1.2 },
  { key: 'kraft',    label: 'Regelmäßiges Krafttraining',         faktor: 1.6 },
  { key: 'intensiv', label: 'Intensives Krafttraining / Bodybuilding', faktor: 2.0 },
  { key: 'ausdauer', label: 'Ausdauersport intensiv',             faktor: 1.4 },
];

const ZIELE: { key: Ziel; label: string; zuschlag: number }[] = [
  { key: 'halten',   label: 'Gewicht halten', zuschlag: 0 },
  { key: 'aufbau',   label: 'Muskelaufbau',   zuschlag: 0.2 },
  { key: 'abnehmen', label: 'Abnehmen',       zuschlag: 0.3 },
];

// Lebensmittel — Protein pro 100 g (außer Ei: pro Stück)
const LEBENSMITTEL = [
  { name: 'Hähnchenbrust', menge: '100 g', protein: 23 },
  { name: 'Lachs',         menge: '100 g', protein: 20 },
  { name: 'Eier',          menge: '1 Stück', protein: 7 },
  { name: 'Magerquark',    menge: '100 g', protein: 12 },
  { name: 'Linsen (gekocht)', menge: '100 g', protein: 9 },
  { name: 'Tofu',          menge: '100 g', protein: 8 },
  { name: 'Haferflocken',  menge: '100 g', protein: 13 },
];

export default function ProteinRechner() {
  const [gewicht, setGewicht] = useState('75');
  const [aktivitaet, setAktivitaet] = useState<Aktivitaet>('leicht');
  const [ziel, setZiel] = useState<Ziel>('halten');
  const [mahlzeiten, setMahlzeiten] = useState('4');

  const g = parseDeutscheZahl(gewicht);
  const m = Math.max(3, Math.min(5, parseInt(mahlzeiten, 10) || 4));

  const ergebnis = useMemo(() => {
    if (g <= 0) return null;
    const aktObj = AKTIVITAETEN.find(a => a.key === aktivitaet)!;
    const zielObj = ZIELE.find(z => z.key === ziel)!;
    const faktor = aktObj.faktor + zielObj.zuschlag;
    const bedarf = g * faktor;
    const proMahlzeit = bedarf / m;
    return { faktor, bedarf, proMahlzeit, aktObj, zielObj };
  }, [g, aktivitaet, ziel, m]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      {/* Gewicht */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergewicht</label>
        <NummerEingabe value={gewicht} onChange={setGewicht} placeholder="75" einheit="kg" />
      </div>

      {/* Aktivität */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivitätslevel</label>
        <select
          value={aktivitaet}
          onChange={e => setAktivitaet(e.target.value as Aktivitaet)}
          className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        >
          {AKTIVITAETEN.map(a => (
            <option key={a.key} value={a.key}>{a.label} ({fmt1(a.faktor)} g/kg)</option>
          ))}
        </select>
      </div>

      {/* Ziel */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trainingsziel</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {ZIELE.map(z => (
            <button
              key={z.key}
              onClick={() => setZiel(z.key)}
              className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                ziel === z.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {z.label}
              {z.zuschlag > 0 && <span className="block text-[10px] opacity-80">+{fmt1(z.zuschlag)} g/kg</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Mahlzeiten */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Mahlzeiten pro Tag</label>
        <select
          value={mahlzeiten}
          onChange={e => setMahlzeiten(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        >
          <option value="3">3 Mahlzeiten</option>
          <option value="4">4 Mahlzeiten</option>
          <option value="5">5 Mahlzeiten</option>
        </select>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Täglicher Proteinbedarf</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.bedarf)} g
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              = {fmt1(ergebnis.faktor)} g pro kg Körpergewicht
            </p>
          </div>

          {/* Verteilung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Verteilung auf {m} Mahlzeiten</p>
            <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">{fmt(ergebnis.proMahlzeit)} g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">pro Mahlzeit</p>
          </div>

          {/* Lebensmittel-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Wie viel Lebensmittel für {fmt(ergebnis.bedarf)} g Protein?</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {LEBENSMITTEL.map(l => {
                const portionen = ergebnis.bedarf / l.protein;
                // Ei zählt pro Stück, andere in Gramm
                const anzeige = l.menge === '1 Stück'
                  ? `${fmt(portionen)} Eier`
                  : `${fmt(portionen * 100)} g`;
                return (
                  <div key={l.name} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {l.name}
                      <span className="text-xs text-gray-600 ml-2">({l.protein} g / {l.menge})</span>
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{anzeige}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kombi-Vorschläge */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-accent-700 dark:text-accent-400 mb-2">Beispiel-Kombinationen für {fmt(ergebnis.bedarf)} g Protein</p>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 list-disc pl-5">
              <li>Frühstück: 100 g Haferflocken + 250 g Magerquark + 1 Ei ≈ 50 g Protein</li>
              <li>Mittag: 200 g Hähnchenbrust + Gemüse ≈ 46 g Protein</li>
              <li>Abend: 150 g Lachs + Linsen 100 g ≈ 39 g Protein</li>
              <li>Snack: 250 g Magerquark + 2 Eier ≈ 44 g Protein</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Kombinieren Sie 2–3 dieser Mahlzeiten je nach Bedarf.</p>
          </div>

          {/* DGE-Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Die DGE empfiehlt für Erwachsene mindestens <strong>0,8 g Protein pro kg Körpergewicht</strong>. Sportler, Senioren (ab 65) und Personen in der Abnehmphase benötigen deutlich mehr — bis zu 2,0 g/kg sind unbedenklich, sofern keine Nierenerkrankung vorliegt.
            </p>
          </div>

          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Gesamten Kalorienbedarf berechnen" />
          <CrossLink href="/gesundheit/wasserbedarf-rechner" emoji="💧" text="Wasserbedarf pro Tag" />

          <ErgebnisAktionen
            ergebnisText={`Proteinbedarf: ${fmt(ergebnis.bedarf)} g/Tag (${fmt1(ergebnis.faktor)} g/kg) bei ${fmt(g)} kg Körpergewicht, ${ergebnis.aktObj.label}, Ziel: ${ergebnis.zielObj.label}. Pro Mahlzeit: ${fmt(ergebnis.proMahlzeit)} g.`}
            seitenTitel="Protein-Rechner"
          />

          <AiExplain
            rechnerName="Protein-Rechner"
            eingaben={{
              gewicht: g,
              aktivitaet: ergebnis.aktObj.label,
              ziel: ergebnis.zielObj.label,
              mahlzeiten: m,
            }}
            ergebnis={{
              bedarfGramm: Math.round(ergebnis.bedarf),
              gProKg: ergebnis.faktor,
              proMahlzeit: Math.round(ergebnis.proMahlzeit),
            }}
          />
        </>
      )}
    </div>
  );
}
