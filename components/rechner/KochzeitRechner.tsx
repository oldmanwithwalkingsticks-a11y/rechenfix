'use client';

import { useState, useMemo } from 'react';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AmazonBox } from '@/components/AmazonBox';

type Lebensmittel = 'ei' | 'nudeln' | 'reis' | 'kartoffeln' | 'gemuese';

interface Option {
  value: string;
  label: string;
  zeitMin: number; // Minuten
  tipp?: string;
  anleitung: string[];
}

// Kochzeit-Datenbank
const DATEN: Record<Lebensmittel, { label: string; sortenOptionen: { label: string; key: string }[]; varianten: Record<string, Option[]> }> = {
  ei: {
    label: 'Ei 🥚',
    sortenOptionen: [
      { label: 'Größe S', key: 's' },
      { label: 'Größe M', key: 'm' },
      { label: 'Größe L', key: 'l' },
      { label: 'Größe XL', key: 'xl' },
    ],
    varianten: {
      s: [
        { value: 'weich',       label: 'Weich (flüssiger Dotter & Weiß)',       zeitMin: 3.5, anleitung: ['Wasser zum Kochen bringen', 'Ei mit Löffel vorsichtig einlegen', '3:30 Min kochen', 'Sofort in Eiswasser abschrecken'], tipp: 'Für Softboiled Eggs — ideal zum Dippen.' },
        { value: 'wachsweich',  label: 'Wachsweich (festes Weiß, flüssiger Dotter)', zeitMin: 5.5, anleitung: ['Wasser kochen', 'Ei einlegen', '5:30 Min kochen', 'Abschrecken'] },
        { value: 'hart',        label: 'Hart (komplett fest)',                  zeitMin: 9, anleitung: ['Wasser kochen', 'Ei einlegen', '9 Min kochen', 'Abschrecken für leichteres Pellen'] },
      ],
      m: [
        { value: 'weich',       label: 'Weich',       zeitMin: 4.5, anleitung: ['Wasser zum Kochen bringen', 'Ei mit Löffel vorsichtig einlegen', '4:30 Min kochen', 'Sofort in Eiswasser abschrecken'] },
        { value: 'wachsweich',  label: 'Wachsweich',  zeitMin: 6.5, anleitung: ['Wasser kochen', 'Ei einlegen', '6:30 Min kochen', 'Abschrecken'], tipp: 'Klassisches Frühstücks-Ei' },
        { value: 'hart',        label: 'Hart',        zeitMin: 10, anleitung: ['Wasser kochen', 'Ei einlegen', '10 Min kochen', 'Abschrecken für leichteres Pellen'] },
      ],
      l: [
        { value: 'weich',       label: 'Weich',       zeitMin: 5, anleitung: ['Wasser zum Kochen bringen', 'Ei einlegen', '5 Min kochen', 'Abschrecken'] },
        { value: 'wachsweich',  label: 'Wachsweich',  zeitMin: 7, anleitung: ['Wasser kochen', 'Ei einlegen', '7 Min kochen', 'Abschrecken'] },
        { value: 'hart',        label: 'Hart',        zeitMin: 11, anleitung: ['Wasser kochen', 'Ei einlegen', '11 Min kochen', 'Abschrecken'] },
      ],
      xl: [
        { value: 'weich',       label: 'Weich',       zeitMin: 5.5, anleitung: ['Wasser zum Kochen bringen', 'Ei einlegen', '5:30 Min kochen', 'Abschrecken'] },
        { value: 'wachsweich',  label: 'Wachsweich',  zeitMin: 7.5, anleitung: ['Wasser kochen', 'Ei einlegen', '7:30 Min kochen', 'Abschrecken'] },
        { value: 'hart',        label: 'Hart',        zeitMin: 12, anleitung: ['Wasser kochen', 'Ei einlegen', '12 Min kochen', 'Abschrecken'] },
      ],
    },
  },
  nudeln: {
    label: 'Nudeln 🍝',
    sortenOptionen: [
      { label: 'Spaghetti',   key: 'spaghetti' },
      { label: 'Penne',       key: 'penne' },
      { label: 'Fusilli',     key: 'fusilli' },
      { label: 'Farfalle',    key: 'farfalle' },
      { label: 'Makkaroni',   key: 'makkaroni' },
    ],
    varianten: {
      spaghetti: [
        { value: 'al-dente', label: 'Al dente', zeitMin: 9, anleitung: ['Wasser zum Kochen bringen (1 L pro 100 g)', 'Salz dazu (10 g/L)', 'Spaghetti einlegen', '9 Min kochen', 'Abbeißen: leichter weißer Kern = al dente'], tipp: 'Italienische Köche nehmen 1 Min VOR Packungsanweisung raus.' },
        { value: 'weich',    label: 'Weich',    zeitMin: 11, anleitung: ['Wasser kochen', 'Spaghetti einlegen', '11 Min kochen', 'Probieren, bei Bedarf 1 Min mehr'] },
      ],
      penne: [
        { value: 'al-dente', label: 'Al dente', zeitMin: 11, anleitung: ['Wasser zum Kochen bringen', 'Salzen', 'Penne einlegen', '11 Min kochen', 'Probieren und abgießen'] },
        { value: 'weich',    label: 'Weich',    zeitMin: 13, anleitung: ['Wasser kochen', 'Penne einlegen', '13 Min kochen'] },
      ],
      fusilli: [
        { value: 'al-dente', label: 'Al dente', zeitMin: 11, anleitung: ['Wasser kochen und salzen', 'Fusilli einlegen', '11 Min kochen', 'Probieren'] },
        { value: 'weich',    label: 'Weich',    zeitMin: 13, anleitung: ['Wasser kochen', 'Fusilli einlegen', '13 Min kochen'] },
      ],
      farfalle: [
        { value: 'al-dente', label: 'Al dente', zeitMin: 12, anleitung: ['Wasser kochen und salzen', 'Farfalle einlegen', '12 Min kochen', 'Vorsichtig umrühren (Flügel-Form reißt leicht)'] },
        { value: 'weich',    label: 'Weich',    zeitMin: 14, anleitung: ['Wasser kochen', 'Farfalle einlegen', '14 Min kochen'] },
      ],
      makkaroni: [
        { value: 'al-dente', label: 'Al dente', zeitMin: 9, anleitung: ['Wasser kochen und salzen', 'Makkaroni einlegen', '9 Min kochen'] },
        { value: 'weich',    label: 'Weich',    zeitMin: 11, anleitung: ['Wasser kochen', 'Makkaroni einlegen', '11 Min kochen'] },
      ],
    },
  },
  reis: {
    label: 'Reis 🍚',
    sortenOptionen: [
      { label: 'Basmati',  key: 'basmati' },
      { label: 'Jasmin',   key: 'jasmin' },
      { label: 'Vollkorn', key: 'vollkorn' },
      { label: 'Risotto',  key: 'risotto' },
      { label: 'Sushi',    key: 'sushi' },
    ],
    varianten: {
      basmati: [
        { value: 'quellen', label: 'Quellmethode (1:1,5)', zeitMin: 20, anleitung: ['1 Teil Reis : 1,5 Teile Wasser', 'Aufkochen, dann Hitze reduzieren', '10 Min bei geschlossenem Deckel kochen', '10 Min quellen lassen (ohne Deckel öffnen!)', 'Mit Gabel auflockern'], tipp: 'Vor dem Kochen kalt waschen entfernt Stärke' },
        { value: 'kochen',  label: 'Kochmethode (viel Wasser)', zeitMin: 12, anleitung: ['Reichlich Salzwasser kochen', 'Reis einrieseln', '12 Min kochen', 'Abgießen'] },
      ],
      jasmin: [
        { value: 'quellen', label: 'Quellmethode (1:1,5)', zeitMin: 20, anleitung: ['Reis waschen bis Wasser klar', 'Mit 1,5-fachem Wasser aufkochen', '10 Min kochen', '10 Min quellen'] },
      ],
      vollkorn: [
        { value: 'quellen', label: 'Quellmethode (1:2)', zeitMin: 40, anleitung: ['Reis mit doppelter Wassermenge aufkochen', '30 Min bei geschlossenem Deckel kochen', '10 Min quellen'], tipp: 'Braucht deutlich länger als weißer Reis' },
      ],
      risotto: [
        { value: 'klassisch', label: 'Klassisch (1:3 Brühe)', zeitMin: 20, anleitung: ['Zwiebel anschwitzen', 'Reis glasig braten', 'Brühe nach und nach angießen (heiß!)', '18–20 Min unter Rühren kochen', 'Butter und Parmesan unterheben'], tipp: 'Mantecatura: am Ende Butter und Parmesan einrühren für cremige Konsistenz' },
      ],
      sushi: [
        { value: 'quellen', label: 'Quellmethode (1:1,1)', zeitMin: 22, anleitung: ['Reis gründlich waschen', 'Mit 1,1-fachem Wasser aufkochen', '12 Min bei niedriger Hitze kochen', '10 Min quellen', 'Essig-Zucker-Salz-Mischung unterheben (sushizu)'] },
      ],
    },
  },
  kartoffeln: {
    label: 'Kartoffeln 🥔',
    sortenOptionen: [
      { label: 'Festkochend', key: 'fest' },
      { label: 'Mehlig',      key: 'mehlig' },
    ],
    varianten: {
      fest: [
        { value: 'ganz-mittel', label: 'Ganz, mittelgroß',   zeitMin: 22, anleitung: ['Kartoffeln waschen, nicht schälen', 'Ins kalte Salzwasser legen', 'Aufkochen, dann 20–25 Min köcheln', 'Gabel-Test: gleitet leicht rein = fertig'], tipp: 'Immer im kalten Wasser ansetzen, sonst außen weich und innen roh' },
        { value: 'stuecke',     label: 'Stücke (2–3 cm)',    zeitMin: 12, anleitung: ['Kartoffeln schälen und würfeln', 'Kalt ansetzen mit Salz', 'Aufkochen, 10–15 Min köcheln', 'Test: mit Messer einstechen'] },
        { value: 'pellkartoffeln', label: 'Pellkartoffeln',  zeitMin: 25, anleitung: ['Ungeschälte Kartoffeln kalt ansetzen', 'Aufkochen, 20–25 Min köcheln', 'Nach dem Kochen kurz ins Eiswasser → Schale löst sich leichter'] },
      ],
      mehlig: [
        { value: 'ganz-mittel', label: 'Ganz, mittelgroß',   zeitMin: 22, anleitung: ['Kartoffeln kalt ansetzen', 'Aufkochen, 20–25 Min köcheln', 'Nicht zu lange kochen, sonst zerfallen sie'], tipp: 'Mehlige Kartoffeln sind ideal für Püree und Suppen' },
        { value: 'stuecke',     label: 'Stücke (2–3 cm)',    zeitMin: 12, anleitung: ['Schälen und würfeln', 'Kalt ansetzen', '10–12 Min kochen'] },
        { value: 'pellkartoffeln', label: 'Pellkartoffeln',  zeitMin: 25, anleitung: ['Ungeschält kochen', '20–25 Min', 'Abschrecken für leichteres Pellen'] },
      ],
    },
  },
  gemuese: {
    label: 'Gemüse 🥦',
    sortenOptionen: [
      { label: 'Brokkoli',    key: 'brokkoli' },
      { label: 'Blumenkohl',  key: 'blumenkohl' },
      { label: 'Möhren',      key: 'moehren' },
      { label: 'Grüne Bohnen',key: 'bohnen' },
      { label: 'Spargel',     key: 'spargel' },
      { label: 'Erbsen',      key: 'erbsen' },
    ],
    varianten: {
      brokkoli: [
        { value: 'kochen', label: 'Kochen (Röschen)',  zeitMin: 5, anleitung: ['Salzwasser zum Kochen bringen', 'Brokkoli-Röschen 4–5 Min kochen', 'Abgießen oder in Eiswasser (Schockgaren)'], tipp: 'Eiswasser erhält die grüne Farbe und stoppt das Garen' },
        { value: 'daempfen', label: 'Dämpfen',         zeitMin: 7, anleitung: ['Wasser im Dämpfer zum Kochen bringen', 'Brokkoli im Dampfsieb platzieren', '6–7 Min dämpfen', 'Noch bissfest'] },
      ],
      blumenkohl: [
        { value: 'kochen', label: 'Kochen (Röschen)',  zeitMin: 6, anleitung: ['Salzwasser kochen', 'Röschen 5–7 Min kochen', 'Test: Messer gleitet leicht rein'] },
        { value: 'daempfen', label: 'Dämpfen',         zeitMin: 8, anleitung: ['Dampfgaren 7–8 Min'] },
      ],
      moehren: [
        { value: 'kochen', label: 'Kochen (Scheiben)',  zeitMin: 9, anleitung: ['Möhren in Scheiben oder Stifte', 'Salzwasser 8–10 Min kochen'] },
        { value: 'daempfen', label: 'Dämpfen (Scheiben)', zeitMin: 10, anleitung: ['Dampfgaren 9–10 Min'] },
      ],
      bohnen: [
        { value: 'kochen', label: 'Kochen', zeitMin: 7, anleitung: ['Bohnen putzen', 'Salzwasser 6–8 Min kochen', 'Eiswasser-Schock für knackige Farbe'] },
      ],
      spargel: [
        { value: 'weiss', label: 'Weißer Spargel', zeitMin: 13, anleitung: ['Spargel schälen (sonst faserig)', 'Wasser mit Salz, Zucker, Butter aufkochen', '12–15 Min köcheln', 'Test: Spargel leicht biegbar'], tipp: 'Spargel immer schälen, sonst wird er faserig' },
        { value: 'gruen', label: 'Grüner Spargel', zeitMin: 9, anleitung: ['Nur unteres Drittel schälen (oder gar nicht)', 'Salzwasser 8–10 Min kochen'] },
      ],
      erbsen: [
        { value: 'frisch', label: 'Frisch/TK', zeitMin: 4, anleitung: ['Salzwasser kochen', 'Erbsen 3–5 Min kochen', 'Abgießen'], tipp: 'TK-Erbsen brauchen kaum länger als frische' },
      ],
    },
  },
};

export default function KochzeitRechner() {
  const [lebensmittel, setLebensmittel] = useState<Lebensmittel>('ei');
  const [sorte, setSorte] = useState<string>('m');
  const [variante, setVariante] = useState<string>('wachsweich');
  const [hoehenlage, setHoehenlage] = useState(false);

  // Wenn Lebensmittel gewechselt, Sorte/Variante zurücksetzen
  const daten = DATEN[lebensmittel];
  const sorteOptionen = daten.sortenOptionen;
  const gueltigerSorte = sorteOptionen.find(s => s.key === sorte)?.key ?? sorteOptionen[0].key;
  const varianten = daten.varianten[gueltigerSorte] ?? [];
  const gueltigeVariante = varianten.find(v => v.value === variante) ?? varianten[0];

  const ergebnis = useMemo(() => {
    if (!gueltigeVariante) return null;
    const basisZeit = gueltigeVariante.zeitMin;
    const zeitMitHoehe = hoehenlage ? basisZeit * 1.15 : basisZeit;
    return {
      zeit: zeitMitHoehe,
      zeitBasis: basisZeit,
      anleitung: gueltigeVariante.anleitung,
      tipp: gueltigeVariante.tipp,
    };
  }, [gueltigeVariante, hoehenlage]);

  const formatZeit = (min: number): string => {
    const ganze = Math.floor(min);
    const sek = Math.round((min - ganze) * 60);
    if (sek === 0) return `${ganze} Min`;
    return `${ganze}:${String(sek).padStart(2, '0')} Min`;
  };

  return (
    <div>
      {/* === 1: Lebensmittel === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Lebensmittel
        </h2>
        <label htmlFor="kz-lebensmittel" className="sr-only">Lebensmittel</label>
        <select
          id="kz-lebensmittel"
          value={lebensmittel}
          onChange={e => {
            const neu = e.target.value as Lebensmittel;
            setLebensmittel(neu);
            const erstesorte = DATEN[neu].sortenOptionen[0].key;
            setSorte(erstesorte);
            setVariante(DATEN[neu].varianten[erstesorte][0].value);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(DATEN) as Lebensmittel[]).map(l => (
            <option key={l} value={l}>{DATEN[l].label}</option>
          ))}
        </select>
      </div>

      {/* === 2: Sorte === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          {lebensmittel === 'ei' ? 'Größe' : lebensmittel === 'kartoffeln' ? 'Sorte' : 'Sorte/Art'}
        </h2>
        <label htmlFor="kz-sorte" className="sr-only">Sorte</label>
        <select
          id="kz-sorte"
          value={gueltigerSorte}
          onChange={e => {
            setSorte(e.target.value);
            const neueVarianten = daten.varianten[e.target.value];
            if (neueVarianten?.length) setVariante(neueVarianten[0].value);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {sorteOptionen.map(s => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* === 3: Variante === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          {lebensmittel === 'ei' ? 'Härtegrad' : 'Zubereitung'}
        </h2>
        <label htmlFor="kz-variante" className="sr-only">Variante</label>
        <select
          id="kz-variante"
          value={gueltigeVariante?.value ?? ''}
          onChange={e => setVariante(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {varianten.map(v => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* === 4: Höhenlage === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          Höhenlage über 1.000 m?
        </h2>
        <RadioToggleGroup
          name="kz-hoehe"
          legend="Höhenlage?"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein (bis 1.000 m)' },
            { value: 'ja', label: '⛰️ Ja (+15 % Zeit)' },
          ]}
          value={hoehenlage ? 'ja' : 'nein'}
          onChange={(v) => setHoehenlage(v === 'ja')}
        />
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          <div className="result-box mb-6 text-center">
            <p className="text-white/80 text-sm mb-1">Kochzeit</p>
            <p className="text-6xl font-bold">{formatZeit(ergebnis.zeit)}</p>
            {hoehenlage && (
              <p className="text-white/90 text-xs mt-2">
                (Basiszeit: {formatZeit(ergebnis.zeitBasis)} × 1,15 wegen Höhenlage)
              </p>
            )}
          </div>

          {/* Schritt-für-Schritt-Anleitung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Schritt-für-Schritt-Anleitung</h2>
            <ol className="space-y-2">
              {ergebnis.anleitung.map((schritt, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{schritt}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tipp */}
          {ergebnis.tipp && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>💡 Tipp:</strong> {ergebnis.tipp}
              </p>
            </div>
          )}

          {/* Vergleichstabelle aller Varianten dieser Sorte */}
          {varianten.length > 1 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
              <div className="px-4 pt-4 pb-1">
                <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich aller Zubereitungen</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      <th className="px-4 py-2 text-left font-semibold">Variante</th>
                      <th className="px-4 py-2 text-right font-semibold">Kochzeit</th>
                      {hoehenlage && <th className="px-4 py-2 text-right font-semibold">Mit Höhenlage</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {varianten.map(v => (
                      <tr key={v.value} className={v.value === gueltigeVariante?.value ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{v.label}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{formatZeit(v.zeitMin)}</td>
                        {hoehenlage && (
                          <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{formatZeit(v.zeitMin * 1.15)}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <AmazonBox
        keyword="fleischthermometer digital"
        description="Bei Fleisch, Fisch oder Geflügel ist die Kerntemperatur die sicherste Garprobe. Ein digitales Thermometer zeigt sie sekundengenau."
      />

      <CrossLink href="/kochen/rezept-umrechner" emoji="📝" text="Rezept auf Portionen umrechnen" />
      <CrossLink href="/kochen/backzeit-rechner" emoji="⏲️" text="Backzeit anpassen" />
      <CrossLink href="/kochen/cups-umrechner" emoji="🥣" text="Cups in Gramm umrechnen" />

      <ErgebnisAktionen
        ergebnisText={`Kochzeit: ${daten.label} (${sorteOptionen.find(s => s.key === gueltigerSorte)?.label}, ${gueltigeVariante?.label}): ${ergebnis ? formatZeit(ergebnis.zeit) : '—'}${hoehenlage ? ' (Höhenlage +15 %)' : ''}`}
        seitenTitel="Kochzeit-Rechner"
      />

      <AiExplain
        rechnerName="Kochzeit-Rechner"
        eingaben={{
          lebensmittel: daten.label,
          sorte: sorteOptionen.find(s => s.key === gueltigerSorte)?.label ?? '—',
          variante: gueltigeVariante?.label ?? '—',
          hoehenlage: hoehenlage ? 'Ja (>1.000 m)' : 'Nein',
        }}
        ergebnis={{
          kochzeit: ergebnis ? formatZeit(ergebnis.zeit) : '—',
          anleitung: ergebnis?.anleitung.join(' → ') ?? '—',
        }}
      />
    </div>
  );
}
