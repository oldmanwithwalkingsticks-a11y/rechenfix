'use client';

import { useState, useMemo } from 'react';
import { berechneTaxi, TARIFE, TARIFE_STAND } from '@/lib/berechnungen/taxi';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TaxiRechner() {
  const [stadt, setStadt] = useState('durchschnitt');
  const [strecke, setStrecke] = useState('10');
  const [tageszeit, setTageszeit] = useState('tag');
  const [wartezeit, setWartezeit] = useState('0');

  const ergebnis = useMemo(() => {
    const s = parseDeutscheZahl(strecke);
    const w = parseDeutscheZahl(wartezeit) || 0;
    if (s <= 0) return null;
    return berechneTaxi(stadt, s, tageszeit === 'nacht', w);
  }, [stadt, strecke, tageszeit, wartezeit]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="stadt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Stadt / Region
          </label>
          <select
            id="stadt"
            value={stadt}
            onChange={(e) => setStadt(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
          >
            {TARIFE.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Strecke (km)
            </label>
            <NummerEingabe value={strecke} onChange={setStrecke} placeholder="10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wartezeit (Minuten, optional)
            </label>
            <NummerEingabe value={wartezeit} onChange={setWartezeit} placeholder="0" />
          </div>
        </div>

        <RadioToggleGroup
          legend="Tageszeit"
          name="tageszeit"
          options={[
            { value: 'tag', label: 'Tag (6–22 Uhr)' },
            { value: 'nacht', label: 'Nacht (22–6 Uhr)' },
          ]}
          value={tageszeit}
          onChange={setTageszeit}
        />
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="text-center mb-3">
              <p className="text-white/70 text-sm mb-1">
                Geschätzter Fahrpreis — {ergebnis.stadt.name}
              </p>
              <p className="text-4xl sm:text-5xl font-bold">{fmt(ergebnis.fahrpreis)} €</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm">+ 10 % Trinkgeld</p>
                <p className="text-2xl font-bold">{fmt(ergebnis.gesamtMitTrinkgeld)} €</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Ø pro km</p>
                <p className="text-2xl font-bold">{fmt(ergebnis.kmPreisDurchschnitt)} €</p>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Preisaufschlüsselung
              </p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Grundgebühr ({ergebnis.nacht ? 'Nacht' : 'Tag'})
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {fmt(ergebnis.grundgebuehr)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Strecke ({ergebnis.strecke.toLocaleString('de-DE')} km)
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {fmt(ergebnis.streckenkosten)} €
                </span>
              </div>
              {ergebnis.wartekosten > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Wartezeit ({ergebnis.wartezeit} Min.)
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {fmt(ergebnis.wartekosten)} €
                  </span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold">
                <span className="text-gray-700 dark:text-gray-200">Fahrpreis</span>
                <span className="text-primary-600 dark:text-primary-400">
                  {fmt(ergebnis.fahrpreis)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Trinkgeld (10 %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {fmt(ergebnis.trinkgeld)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold">
                <span className="text-gray-700 dark:text-gray-200">Gesamt mit Trinkgeld</span>
                <span className="text-primary-600 dark:text-primary-400">
                  {fmt(ergebnis.gesamtMitTrinkgeld)} €
                </span>
              </div>
            </div>
          </div>

          {/* Tarif-Info (dynamisch, je nach Anzahl Staffel-Stufen) */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Tarif {ergebnis.stadt.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-blue-700 dark:text-blue-400 mb-2">
              <p>
                Grundgebühr:{' '}
                {fmt(ergebnis.nacht ? ergebnis.stadt.grundNacht : ergebnis.stadt.grundTag)} €
              </p>
              <p>Wartezeit: {fmt(ergebnis.stadt.warteMinute)} €/Min.</p>
              {ergebnis.stadt.stufen.map((stufe, i) => {
                const naechsteStufe = ergebnis.stadt.stufen[i + 1];
                const preis = ergebnis.nacht ? stufe.preisNacht : stufe.preisTag;
                let label: string;
                if (ergebnis.stadt.stufen.length === 1) {
                  label = 'Kilometer (einheitlich)';
                } else if (i === 0) {
                  label = `Bis ${naechsteStufe ? naechsteStufe.abKm : '∞'} km`;
                } else if (!naechsteStufe) {
                  label = `Ab ${stufe.abKm} km`;
                } else {
                  label = `${stufe.abKm}–${naechsteStufe.abKm} km`;
                }
                return (
                  <p key={i}>
                    {label}: {fmt(preis)} €/km
                  </p>
                );
              })}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 italic pt-2 border-t border-blue-200/50 dark:border-blue-500/20">
              {ergebnis.stadt.tarifHinweis}
            </p>
            {ergebnis.stadt.quelleUrl && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Quelle:{' '}
                <a
                  href={ergebnis.stadt.quelleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {ergebnis.stadt.quelle}
                </a>{' '}
                (Stand {ergebnis.stadt.stand})
              </p>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              💡 Tarife Stand: {TARIFE_STAND} (verifiziert gegen kommunale Taxenordnungen).
              Taxitarife werden kommunal festgelegt und können sich jederzeit ändern — zusätzlich
              sind Zuschläge möglich (Großraumtaxi, Gepäck, Feiertag). Verbindliche Tarife beim
              Taxiunternehmen oder in der örtlichen Taxenordnung erfragen.
            </p>
          </div>

          <CrossLink href="/alltag/trinkgeld-rechner" emoji="💰" text="Trinkgeld berechnen" />
          <CrossLink
            href="/auto/spritkosten-rechner"
            emoji="⛽"
            text="Vergleich: Taxi vs. eigenes Auto"
          />

          <ErgebnisAktionen
            ergebnisText={`Taxi ${ergebnis.stadt.name}: ${ergebnis.strecke.toLocaleString('de-DE')} km = ${fmt(ergebnis.fahrpreis)} € (mit Trinkgeld: ${fmt(ergebnis.gesamtMitTrinkgeld)} €)`}
            seitenTitel="Taxi-Kosten-Rechner"
          />

          <AiExplain
            rechnerName="Taxi-Kosten-Rechner"
            eingaben={{
              stadt: ergebnis.stadt.name,
              strecke: ergebnis.strecke,
              tageszeit: ergebnis.nacht ? 'Nacht' : 'Tag',
              wartezeit: ergebnis.wartezeit,
            }}
            ergebnis={{
              fahrpreis: ergebnis.fahrpreis,
              gesamtMitTrinkgeld: ergebnis.gesamtMitTrinkgeld,
              kmPreisDurchschnitt: ergebnis.kmPreisDurchschnitt,
            }}
          />
        </>
      )}
    </div>
  );
}
