'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Region = 'stadt' | 'vorort' | 'laendlich';

const REGIONEN: Record<Region, { label: string; fahrstundenpreis: number; grundgebuehr: number }> = {
  stadt: { label: 'Stadt (teuer)', fahrstundenpreis: 65, grundgebuehr: 500 },
  vorort: { label: 'Vorort/Kleinstadt', fahrstundenpreis: 55, grundgebuehr: 425 },
  laendlich: { label: 'Ländlich (günstig)', fahrstundenpreis: 45, grundgebuehr: 350 },
};

const PFLICHT_SONDERFAHRTEN = 12; // 5 Überland + 4 Autobahn + 3 Nacht
const NEBENKOSTEN = {
  lehrmaterial: 50,
  sehtest: 7,
  ersteHilfe: 40,
  passbilder: 15,
  antragsgebuehr: 45,
};
const NEBENKOSTEN_GESAMT = Object.values(NEBENKOSTEN).reduce((a, b) => a + b, 0);
// Amtliche Prüfungsgebühren TÜV/DEKRA 2026 nach GebOSt-Anlage
// (zweijährliche Anpassung, letzte Anhebung 2024).
const THEORIEPRUEFUNG = 22.49;
const PRAXISPRUEFUNG: number = 116.93;

export default function FuehrerscheinRechner() {
  const [region, setRegion] = useState<Region>('vorort');
  const [uebungsstunden, setUebungsstunden] = useState('25');
  const [theorieBestanden, setTheorieBestanden] = useState(true);
  const [praxisBestanden, setPraxisBestanden] = useState(true);

  const r = REGIONEN[region];
  const uStd = Math.max(0, parseDeutscheZahl(uebungsstunden));

  const ergebnis = useMemo(() => {
    const pflichtKosten = PFLICHT_SONDERFAHRTEN * (r.fahrstundenpreis * 1.5);
    const uebungsKosten = uStd * r.fahrstundenpreis;
    const theorieKosten = theorieBestanden ? THEORIEPRUEFUNG : THEORIEPRUEFUNG * 2;
    const praxisKosten = praxisBestanden ? PRAXISPRUEFUNG : PRAXISPRUEFUNG * 2;
    const gesamt =
      r.grundgebuehr +
      pflichtKosten +
      uebungsKosten +
      NEBENKOSTEN_GESAMT +
      theorieKosten +
      praxisKosten;
    return {
      grundgebuehr: r.grundgebuehr,
      pflichtKosten,
      uebungsKosten,
      nebenkosten: NEBENKOSTEN_GESAMT,
      theorieKosten,
      praxisKosten,
      gesamt,
    };
  }, [r, uStd, theorieBestanden, praxisBestanden]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const posten = [
    { label: 'Grundgebühr Fahrschule', wert: ergebnis.grundgebuehr },
    { label: `Pflichtfahrstunden (12 × ${fmt(r.fahrstundenpreis * 1.5)} €)`, wert: ergebnis.pflichtKosten },
    { label: `Übungsfahrstunden (${fmt(uStd)} × ${fmt(r.fahrstundenpreis)} €)`, wert: ergebnis.uebungsKosten },
    { label: 'Nebenkosten (Sehtest, Erste Hilfe, …)', wert: ergebnis.nebenkosten },
    { label: `Theorieprüfung${theorieBestanden ? '' : ' (inkl. Wiederholung)'}`, wert: ergebnis.theorieKosten },
    { label: `Praxisprüfung${praxisBestanden ? '' : ' (inkl. Wiederholung)'}`, wert: ergebnis.praxisKosten },
  ];

  const maxWert = Math.max(...posten.map(p => p.wert));

  return (
    <div>
      {/* Region */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Region</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(REGIONEN) as Region[]).map(key => (
            <button
              key={key}
              onClick={() => setRegion(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                region === key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {REGIONEN[key].label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Fahrstundenpreis: <strong>{fmt(r.fahrstundenpreis)} €</strong> · Grundgebühr: <strong>{fmt(r.grundgebuehr)} €</strong>
        </p>
      </div>

      {/* Übungsfahrstunden */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Übungsfahrstunden</label>
        <NummerEingabe value={uebungsstunden} onChange={setUebungsstunden} placeholder="25" einheit="Std" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Durchschnitt: 20–35 Stunden (zusätzlich zu den 12 Pflicht-Sonderfahrten).</p>
      </div>

      {/* Theorie bestanden */}
      <div className="mb-6">
        <RadioToggleGroup
          name="fuehrerschein-theorie"
          legend="Theorieprüfung im ersten Versuch bestanden?"
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein (1 Wiederholung)' },
          ]}
          value={theorieBestanden ? 'ja' : 'nein'}
          onChange={(v) => setTheorieBestanden(v === 'ja')}
        />
      </div>

      {/* Praxis bestanden */}
      <div className="mb-6">
        <RadioToggleGroup
          name="fuehrerschein-praxis"
          legend="Praxisprüfung im ersten Versuch bestanden?"
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein (1 Wiederholung)' },
          ]}
          value={praxisBestanden ? 'ja' : 'nein'}
          onChange={(v) => setPraxisBestanden(v === 'ja')}
        />
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Geschätzte Gesamtkosten Führerschein Klasse B</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.gesamt)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Durchschnitt in Deutschland: <strong>3.000 – 4.500 €</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung</h2>
        <table className="w-full text-sm">
          <tbody>
            {posten.map((p, i) => (
              <tr key={i} className="text-gray-600 dark:text-gray-400">
                <td className="py-2">{p.label}</td>
                <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt(p.wert)} €</td>
              </tr>
            ))}
            <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
              <td className="py-2">Gesamt</td>
              <td className="py-2 text-right tabular-nums">{fmt(ergebnis.gesamt)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Balkendiagramm */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Kostenverteilung</h2>
        <div className="space-y-2">
          {posten.map((p, i) => {
            const prozent = ergebnis.gesamt > 0 ? (p.wert / ergebnis.gesamt) * 100 : 0;
            return (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
                  <span className="truncate pr-2">{p.label}</span>
                  <span className="tabular-nums whitespace-nowrap">{fmt(p.wert)} € ({prozent.toFixed(0)} %)</span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: `${maxWert > 0 ? (p.wert / maxWert) * 100 : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spartipp */}
      <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
        <p className="text-green-800 dark:text-green-300 text-sm">
          <strong>💡 Spartipp:</strong> Intensivkurse in ländlichen Regionen können bis zu 30 % günstiger sein als Fahrschulen in der Großstadt. Auch Sammeltermine für die Theorieprüfung sparen Zeit und Fahrtkosten.
        </p>
      </div>

      <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Autokosten-Rechner: Monatliche Gesamtkosten fürs erste Auto" />
      <CrossLink href="/auto/kfz-steuer-rechner" emoji="🚙" text="Kfz-Steuer-Rechner: Was kostet die Steuer pro Jahr?" />

      <ErgebnisAktionen
        ergebnisText={`Führerscheinkosten (Klasse B, ${REGIONEN[region].label}): ca. ${fmt(ergebnis.gesamt)} € gesamt — davon ${fmt(ergebnis.pflichtKosten + ergebnis.uebungsKosten)} € Fahrstunden`}
        seitenTitel="Führerscheinkosten-Rechner"
      />

      <AiExplain
        rechnerName="Führerscheinkosten-Rechner"
        eingaben={{
          region: REGIONEN[region].label,
          fahrstundenpreis: `${fmt(r.fahrstundenpreis)} €`,
          uebungsfahrstunden: fmt(uStd),
          theorieErstversuchBestanden: theorieBestanden ? 'Ja' : 'Nein',
          praxisErstversuchBestanden: praxisBestanden ? 'Ja' : 'Nein',
        }}
        ergebnis={{
          gesamtEuro: fmt(ergebnis.gesamt),
          grundgebuehrEuro: fmt(ergebnis.grundgebuehr),
          pflichtfahrstundenEuro: fmt(ergebnis.pflichtKosten),
          uebungsfahrstundenEuro: fmt(ergebnis.uebungsKosten),
          nebenkostenEuro: fmt(ergebnis.nebenkosten),
          theoriepruefungEuro: fmt(ergebnis.theorieKosten),
          praxispruefungEuro: fmt(ergebnis.praxisKosten),
        }}
      />
    </div>
  );
}
