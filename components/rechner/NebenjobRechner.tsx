'use client';

import { useState, useMemo } from 'react';
import { berechneNebenjob, type NebenjobArt } from '@/lib/berechnungen/nebenjob';
import { BUNDESLAENDER, type Bundesland } from '@/lib/berechnungen/einkommensteuer';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function NebenjobRechner() {
  const [hauptjobBrutto, setHauptjobBrutto] = useState('3500');
  const [art, setArt] = useState<NebenjobArt>('minijob');
  const [nebenjobBrutto, setNebenjobBrutto] = useState('450');
  const [kirchensteuer, setKirchensteuer] = useState('nein');
  const [bundesland, setBundesland] = useState<Bundesland>('Nordrhein-Westfalen');

  const ergebnis = useMemo(() => {
    return berechneNebenjob(
      parseDeutscheZahl(hauptjobBrutto),
      art,
      parseDeutscheZahl(nebenjobBrutto),
      kirchensteuer === 'ja',
      bundesland,
    );
  }, [hauptjobBrutto, art, nebenjobBrutto, kirchensteuer, bundesland]);

  const kistSatzProzent = bundesland === 'Bayern' || bundesland === 'Baden-Württemberg' ? 8 : 9;

  return (
    <div>
      {/* === 1: Hauptjob Brutto === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">
            1
          </span>
          Hauptjob Monatsbrutto
        </h2>
        <NummerEingabe
          value={hauptjobBrutto}
          onChange={setHauptjobBrutto}
          placeholder="3500"
          einheit="€"
        />
      </div>

      {/* === 2: Art des Nebenjobs === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">
            2
          </span>
          Art des Nebenjobs
        </h2>
        <RadioToggleGroup
          name="nebenjob-art"
          legend="Art des Nebenjobs"
          srOnlyLegend
          options={[
            { value: 'minijob', label: 'Minijob (bis 603 €)' },
            { value: 'steuerkarte', label: 'Steuerkarte (Kl. VI)' },
            { value: 'selbststaendig', label: 'Selbstständig' },
          ]}
          value={art}
          onChange={(v) => setArt(v as NebenjobArt)}
          columns={3}
        />
      </div>

      {/* === 3: Nebenjob-Verdienst === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">
            3
          </span>
          Nebenjob-Verdienst
        </h2>
        <NummerEingabe
          value={nebenjobBrutto}
          onChange={setNebenjobBrutto}
          placeholder="450"
          einheit="€/Monat"
        />
      </div>

      {/* === 4: Kirchensteuer === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">
            4
          </span>
          Kirchensteuer
        </h2>
        <RadioToggleGroup
          name="nebenjob-kirchensteuer"
          legend="Kirchensteuer"
          srOnlyLegend
          options={[
            { value: 'nein', label: 'Nein' },
            { value: 'ja', label: `Ja (${kistSatzProzent} %)` },
          ]}
          value={kirchensteuer}
          onChange={setKirchensteuer}
        />
        {kirchensteuer === 'ja' && (
          <div className="mt-3">
            <label htmlFor="nebenjob-bundesland" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bundesland
            </label>
            <select
              id="nebenjob-bundesland"
              value={bundesland}
              onChange={e => setBundesland(e.target.value as Bundesland)}
              className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
            >
              {BUNDESLAENDER.map(bl => (
                <option key={bl} value={bl}>{bl}</option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bayern und Baden-Württemberg: 8 %, sonst 9 %.</p>
          </div>
        )}
      </div>

      {/* === ERGEBNIS === */}
      {ergebnis && (
        <>
          {/* Hauptkennzahlen */}
          <div className="result-box mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">
                  Netto-Zuwachs / Monat
                </p>
                <p className="text-4xl font-bold text-green-300">
                  {fmt(ergebnis.nettoZuwachsMonat)} €
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">
                  Netto-Zuwachs / Jahr
                </p>
                <p className="text-3xl font-bold">{fmt(ergebnis.nettoZuwachsJahr)} €</p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide mb-1">
                  Steuerbelastung Nebenjob
                </p>
                <p className="text-3xl font-bold">
                  {ergebnis.steuerbelastungNebenjob.toLocaleString('de-DE', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}{' '}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Vergleich-Box */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              <div className="flex justify-between px-4 py-3">
                <span className="text-gray-600 dark:text-gray-400">Ohne Nebenjob</span>
                <span className="tabular-nums text-gray-800 dark:text-gray-200">
                  {fmt(ergebnis.hauptjobNettoMonat)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 bg-green-50 dark:bg-green-500/10">
                <span className="font-semibold text-green-800 dark:text-green-300">
                  Mit Nebenjob ({ergebnis.artLabel})
                </span>
                <span className="tabular-nums font-bold text-green-800 dark:text-green-300">
                  {fmt(ergebnis.gesamtNettoMonat)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-gray-600 dark:text-gray-400">Netto-Zuwachs</span>
                <span className="tabular-nums font-semibold text-green-600 dark:text-green-400">
                  +{fmt(ergebnis.nettoZuwachsMonat)} €
                </span>
              </div>
            </div>
          </div>

          {/* Aufschlüsselung Nebenjob */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1">
              <h2 className="font-bold text-gray-700 dark:text-gray-200">
                Aufschlüsselung Nebenjob
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-gray-600 dark:text-gray-400">Brutto Nebenjob</span>
                <span className="tabular-nums text-gray-800 dark:text-gray-200">
                  {fmt(ergebnis.nebenjobBrutto)} €
                </span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-gray-600 dark:text-gray-400">− Lohnsteuer</span>
                <span className="tabular-nums text-red-600 dark:text-red-400">
                  {ergebnis.nebenjobLohnsteuer > 0
                    ? `−${fmt(ergebnis.nebenjobLohnsteuer)} €`
                    : '0,00 €'}
                </span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-gray-600 dark:text-gray-400">− Solidaritätszuschlag</span>
                <span className="tabular-nums text-red-600 dark:text-red-400">
                  {ergebnis.nebenjobSoli > 0
                    ? `−${fmt(ergebnis.nebenjobSoli)} €`
                    : '0,00 €'}
                </span>
              </div>
              {kirchensteuer === 'ja' && (
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-gray-600 dark:text-gray-400">− Kirchensteuer (9 %)</span>
                  <span className="tabular-nums text-red-600 dark:text-red-400">
                    {ergebnis.nebenjobKirchensteuer > 0
                      ? `−${fmt(ergebnis.nebenjobKirchensteuer)} €`
                      : '0,00 €'}
                  </span>
                </div>
              )}
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-gray-600 dark:text-gray-400">− Sozialversicherung</span>
                <span className="tabular-nums text-red-600 dark:text-red-400">
                  {ergebnis.nebenjobSozialversicherung > 0
                    ? `−${fmt(ergebnis.nebenjobSozialversicherung)} €`
                    : '0,00 €'}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 bg-blue-50 dark:bg-blue-500/10 font-bold">
                <span className="text-blue-800 dark:text-blue-300">= Netto Nebenjob</span>
                <span className="tabular-nums text-blue-800 dark:text-blue-300">
                  {fmt(ergebnis.nebenjobNettoMonat)} €
                </span>
              </div>
            </div>
          </div>

          {/* Hinweis-Box */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>ℹ️ Hinweis:</strong> {ergebnis.hinweis}
            </p>
          </div>

          <AffiliateBox programId="wiso" context="nebenjob" />

          <CrossLink href="/finanzen/minijob-rechner" emoji="👛" text="Minijob berechnen" />
          <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto berechnen" />
          <CrossLink href="/arbeit/stundenlohn-rechner" emoji="⏱️" text="Stundenlohn berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Nebenjob-Rechner (${ergebnis.artLabel}): Brutto ${fmt(ergebnis.nebenjobBrutto)} € → Netto ${fmt(ergebnis.nebenjobNettoMonat)} € | Netto-Zuwachs/Monat: +${fmt(ergebnis.nettoZuwachsMonat)} € | +${fmt(ergebnis.nettoZuwachsJahr)} €/Jahr | Steuerbelastung: ${ergebnis.steuerbelastungNebenjob.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`}
            seitenTitel="Nebenjob-Rechner"
          />

          <AiExplain
            rechnerName="Nebenjob-Rechner"
            eingaben={{
              hauptjobBrutto: `${fmt(parseDeutscheZahl(hauptjobBrutto))} €`,
              nebenjobArt: ergebnis.artLabel,
              nebenjobBrutto: `${fmt(parseDeutscheZahl(nebenjobBrutto))} €/Monat`,
              kirchensteuer: kirchensteuer === 'ja' ? 'Ja (9 %)' : 'Nein',
            }}
            ergebnis={{
              hauptjobNetto: `${fmt(ergebnis.hauptjobNettoMonat)} €`,
              nebenjobNetto: `${fmt(ergebnis.nebenjobNettoMonat)} €`,
              gesamtNetto: `${fmt(ergebnis.gesamtNettoMonat)} €`,
              nettoZuwachsMonat: `+${fmt(ergebnis.nettoZuwachsMonat)} €`,
              nettoZuwachsJahr: `+${fmt(ergebnis.nettoZuwachsJahr)} €`,
              steuerbelastungNebenjob: `${ergebnis.steuerbelastungNebenjob.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`,
              hinweis: ergebnis.hinweis,
            }}
          />
        </>
      )}
    </div>
  );
}
