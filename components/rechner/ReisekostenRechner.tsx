'use client';

import { useState, useMemo } from 'react';
import { berechneReisekosten } from '@/lib/berechnungen/reisekosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const FARBEN = ['bg-blue-500', 'bg-amber-500', 'bg-green-500', 'bg-purple-500', 'bg-red-400'];
const FARBEN_TEXT = ['text-blue-600 dark:text-blue-400', 'text-amber-600 dark:text-amber-400', 'text-green-600 dark:text-green-400', 'text-purple-600 dark:text-purple-400', 'text-red-600 dark:text-red-400'];

const VERPFLEGUNG_OPTIONEN = [
  { value: '25', label: 'Budget (25 €/Tag)' },
  { value: '50', label: 'Mittel (50 €/Tag)' },
  { value: '80', label: 'Komfort (80 €/Tag)' },
  { value: 'eigene', label: 'Eigene Angabe' },
];

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ReisekostenRechner() {
  const [naechte, setNaechte] = useState('7');
  const [personen, setPersonen] = useState('2');
  const [anreiseTyp, setAnreiseTyp] = useState<'auto' | 'zug' | 'flug' | 'bus'>('auto');

  // Auto
  const [entfernung, setEntfernung] = useState('500');
  const [spritverbrauch, setSpritverbrauch] = useState('7');
  const [spritpreis, setSpritpreis] = useState('1,75');
  const [maut, setMaut] = useState('30');

  // Zug/Flug/Bus
  const [anreisePreis, setAnreisePreis] = useState('80');

  const [unterkunft, setUnterkunft] = useState('80');
  const [verpflegungModus, setVerpflegungModus] = useState('50');
  const [verpflegungEigen, setVerpflegungEigen] = useState('50');
  const [aktivitaeten, setAktivitaeten] = useState('20');
  const [versicherung, setVersicherung] = useState('0');

  const verpflegungProTag = verpflegungModus === 'eigene'
    ? parseDeutscheZahl(verpflegungEigen)
    : parseInt(verpflegungModus);

  const ergebnis = useMemo(() => {
    const n = parseInt(naechte) || 0;
    const p = parseInt(personen) || 0;
    if (n < 1 || p < 1) return null;

    return berechneReisekosten({
      naechte: n,
      personen: p,
      anreiseTyp,
      entfernung: parseDeutscheZahl(entfernung),
      spritverbrauch: parseDeutscheZahl(spritverbrauch),
      spritpreis: parseDeutscheZahl(spritpreis),
      maut: parseDeutscheZahl(maut),
      anreisePreisProPerson: parseDeutscheZahl(anreisePreis),
      unterkunftProNacht: parseDeutscheZahl(unterkunft),
      verpflegungProTagProPerson: verpflegungProTag,
      aktivitaetenProTag: parseDeutscheZahl(aktivitaeten),
      versicherung: parseDeutscheZahl(versicherung),
    });
  }, [naechte, personen, anreiseTyp, entfernung, spritverbrauch, spritpreis, maut, anreisePreis, unterkunft, verpflegungProTag, aktivitaeten, versicherung]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Basis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reisedauer (Nächte)</label>
            <NummerEingabe value={naechte} onChange={setNaechte} placeholder="7" />
          </div>
          <div>
            <label htmlFor="personen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Reisende</label>
            <select
              id="personen"
              value={personen}
              onChange={e => setPersonen(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Anreise */}
        <div>
          <label htmlFor="anreise-typ" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anreise</label>
          <select
            id="anreise-typ"
            value={anreiseTyp}
            onChange={e => setAnreiseTyp(e.target.value as typeof anreiseTyp)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
          >
            <option value="auto">🚗 Auto</option>
            <option value="zug">🚆 Zug</option>
            <option value="flug">✈️ Flug</option>
            <option value="bus">🚌 Bus</option>
          </select>
        </div>

        {anreiseTyp === 'auto' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entfernung (km)</label>
              <NummerEingabe value={entfernung} onChange={setEntfernung} placeholder="500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verbrauch (l/100km)</label>
              <NummerEingabe value={spritverbrauch} onChange={setSpritverbrauch} placeholder="7" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spritpreis (€/l)</label>
              <NummerEingabe value={spritpreis} onChange={setSpritpreis} placeholder="1,75" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maut/Vignette (€)</label>
              <NummerEingabe value={maut} onChange={setMaut} placeholder="30" />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preis pro Person (einfach, €)</label>
            <NummerEingabe value={anreisePreis} onChange={setAnreisePreis} placeholder="80" />
          </div>
        )}

        {/* Unterkunft */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unterkunft (€/Nacht)</label>
          <NummerEingabe value={unterkunft} onChange={setUnterkunft} placeholder="80" />
        </div>

        {/* Verpflegung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="verpflegung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verpflegung pro Person/Tag</label>
            <select
              id="verpflegung"
              value={verpflegungModus}
              onChange={e => setVerpflegungModus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {VERPFLEGUNG_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {verpflegungModus === 'eigene' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betrag (€/Tag/Person)</label>
              <NummerEingabe value={verpflegungEigen} onChange={setVerpflegungEigen} placeholder="50" />
            </div>
          )}
        </div>

        {/* Aktivitäten + Versicherung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aktivitäten/Eintritte (€/Tag/Person)</label>
            <NummerEingabe value={aktivitaeten} onChange={setAktivitaeten} placeholder="20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reiseversicherung (€, gesamt)</label>
            <NummerEingabe value={versicherung} onChange={setVersicherung} placeholder="0" />
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="text-center mb-4">
              <p className="text-white/70 text-sm mb-1">Gesamtkosten ({ergebnis.tage} Tage, {ergebnis.personen} {ergebnis.personen === 1 ? 'Person' : 'Personen'})</p>
              <p className="text-4xl sm:text-5xl font-bold">{fmt(ergebnis.gesamt)} €</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm">Pro Person</p>
                <p className="text-2xl font-bold">{fmt(ergebnis.proPerson)} €</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Pro Tag</p>
                <p className="text-2xl font-bold">{fmt(ergebnis.proTag)} €</p>
              </div>
            </div>
          </div>

          {/* Kostenaufteilung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Kostenaufteilung</p>
            {/* Balken */}
            <div className="flex rounded-lg overflow-hidden h-6 mb-3">
              {ergebnis.anteile.map((a, i) => (
                <div
                  key={a.name}
                  className={`${FARBEN[i]} h-full transition-all`}
                  style={{ width: `${a.prozent}%` }}
                  title={`${a.name}: ${fmt(a.betrag)} € (${a.prozent} %)`}
                />
              ))}
            </div>
            {/* Legende */}
            <div className="space-y-2">
              {ergebnis.anteile.map((a, i) => (
                <div key={a.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-3 h-3 rounded-sm ${FARBEN[i]}`} />
                    <span className="text-gray-700 dark:text-gray-300">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${FARBEN_TEXT[i]}`}>{a.prozent} %</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 w-24 text-right">{fmt(a.betrag)} €</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {anreiseTyp === 'auto' && (
            <CrossLink href="/auto/spritkosten-rechner" emoji="⛽" text="Spritkosten detailliert berechnen" />
          )}
          <CrossLink href="/alltag/waehrungsrechner" emoji="💱" text="Währung umrechnen für die Reise" />
          <CrossLink href="/alltag/trinkgeld-rechner" emoji="💰" text="Trinkgeld im Ausland berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Reisekosten: ${fmt(ergebnis.gesamt)} € gesamt, ${fmt(ergebnis.proPerson)} € pro Person, ${fmt(ergebnis.proTag)} € pro Tag (${ergebnis.tage} Tage, ${ergebnis.personen} Pers.)`}
            seitenTitel="Reisekosten-Rechner"
          />

          <AiExplain
            rechnerName="Reisekosten-Rechner"
            eingaben={{
              naechte: parseInt(naechte),
              personen: parseInt(personen),
              anreise: anreiseTyp,
              unterkunftProNacht: parseDeutscheZahl(unterkunft),
              verpflegungProTag: verpflegungProTag,
            }}
            ergebnis={{
              gesamt: ergebnis.gesamt,
              proPerson: ergebnis.proPerson,
              proTag: ergebnis.proTag,
              anteile: ergebnis.anteile.map(a => `${a.name}: ${fmt(a.betrag)} € (${a.prozent}%)`),
            }}
          />
        </>
      )}
    </div>
  );
}
