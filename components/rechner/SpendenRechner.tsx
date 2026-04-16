'use client';

import { useState, useMemo } from 'react';
import { berechneSpendenErsparnis } from '@/lib/berechnungen/spenden';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const KIRCHENSTEUER_OPTIONEN = [
  { value: 'nein', label: 'Nein' },
  { value: 'ja', label: 'Ja (9%)' },
];

export default function SpendenRechner() {
  const [spendenbetrag, setSpendenbetrag] = useState('500');
  const [zvE, setZvE] = useState('50000');
  const [kirchensteuer, setKirchensteuer] = useState('nein');

  const ergebnis = useMemo(() => {
    const spende = parseDeutscheZahl(spendenbetrag);
    const einkommen = parseDeutscheZahl(zvE);
    return berechneSpendenErsparnis(spende, einkommen, kirchensteuer === 'ja');
  }, [spendenbetrag, zvE, kirchensteuer]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Spendenbetrag (pro Jahr)
            </label>
            <NummerEingabe
              value={spendenbetrag}
              onChange={setSpendenbetrag}
              einheit="€"
              placeholder="z.B. 500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zu versteuerndes Einkommen (pro Jahr)
            </label>
            <NummerEingabe
              value={zvE}
              onChange={setZvE}
              einheit="€"
              placeholder="z.B. 50.000"
            />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">
              Nach allen Abzügen (zvE aus Steuerbescheid)
            </p>
          </div>
        </div>

        <RadioToggleGroup
          name="kirchensteuer"
          legend="Kirchensteuer"
          options={KIRCHENSTEUER_OPTIONEN}
          value={kirchensteuer}
          onChange={setKirchensteuer}
          columns={2}
          fullWidth
        />
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Limit-Warnung: Spende überschreitet 20%-Grenze */}
          {ergebnis.spendenbetrag > ergebnis.maxAbsetzbar && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-700 dark:text-red-400">
                <strong>Hinweis: 20%-Grenze überschritten.</strong> Ihr Spendenbetrag von{' '}
                <strong>{fmt(ergebnis.spendenbetrag)} €</strong> übersteigt die steuerlich
                abziehbare Höchstgrenze von <strong>{fmt(ergebnis.maxAbsetzbar)} €</strong> (20 %
                des zvE). Nur <strong>{fmt(ergebnis.tatsaechlichAbsetzbar)} €</strong> können im
                laufenden Jahr abgesetzt werden. Der Rest kann ggf. in das nächste Jahr
                vorgetragen werden.
              </p>
            </div>
          )}

          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-white/70 text-sm mb-1">Steuerersparnis</p>
                <p className="text-4xl font-bold">
                  {fmt(ergebnis.steuerersparnisGesamt)}{' '}
                  <span className="text-xl">€</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm mb-1">Effektive Kosten</p>
                <p className="text-4xl font-bold">
                  {fmt(ergebnis.effektiveKosten)}{' '}
                  <span className="text-xl">€</span>
                </p>
                <p className="text-white/60 text-xs mt-1">Ihre Spende kostet Sie effektiv nur</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm mb-1">Förderquote</p>
                <p className="text-4xl font-bold">
                  {ergebnis.foerderquote.toLocaleString('de-DE', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}{' '}
                  <span className="text-xl">%</span>
                </p>
                <p className="text-white/60 text-xs mt-1">übernimmt das Finanzamt</p>
              </div>
            </div>
          </div>

          {/* Detailtabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Steuerersparnis im Detail
              </p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Einkommensteuer-Ersparnis
                </span>
                <span className="font-medium text-sm text-green-600 dark:text-green-400">
                  {fmt(ergebnis.steuerersparnisESt)} €
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Solidaritätszuschlag-Ersparnis
                </span>
                <span className="font-medium text-sm text-green-600 dark:text-green-400">
                  {fmt(ergebnis.steuerersparnisSoli)} €
                </span>
              </div>
              {ergebnis.steuerersparnisKiSt > 0 && (
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Kirchensteuer-Ersparnis
                  </span>
                  <span className="font-medium text-sm text-green-600 dark:text-green-400">
                    {fmt(ergebnis.steuerersparnisKiSt)} €
                  </span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtersparnis</span>
                <span className="text-primary-600 dark:text-primary-400">
                  {fmt(ergebnis.steuerersparnisGesamt)} €
                </span>
              </div>
            </div>
          </div>

          {/* Info-Box */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Ihre Eckdaten:</strong> Bei einem zvE von{' '}
              {parseDeutscheZahl(zvE).toLocaleString('de-DE')} € und einer Spende von{' '}
              {parseDeutscheZahl(spendenbetrag).toLocaleString('de-DE')} € beträgt Ihr
              persönlicher Grenzsteuersatz{' '}
              <strong>
                {ergebnis.grenzsteuersatz.toLocaleString('de-DE', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{' '}
                %
              </strong>
              . Die Einkommensteuer-Ersparnis beläuft sich auf{' '}
              <strong>{fmt(ergebnis.steuerersparnisESt)} €</strong>. Abzüglich Soli
              {ergebnis.steuerersparnisKiSt > 0 ? ' und Kirchensteuer' : ''} sparen Sie
              insgesamt <strong>{fmt(ergebnis.steuerersparnisGesamt)} €</strong> an Steuern.
            </p>
          </div>

          {/* Hinweis-Box (amber) */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Wichtig:</strong> Für den Sonderausgabenabzug benötigen Sie eine
              Zuwendungsbestätigung (Spendenquittung) der gemeinnützigen Organisation. Bei
              Spenden bis 300 € reicht der Kontoauszug als vereinfachter Nachweis gegenüber
              dem Finanzamt.
            </p>
          </div>

          <CrossLink
            href="/finanzen/steuererstattung-rechner"
            emoji="📋"
            text="Steuererstattung berechnen"
          />
          <CrossLink
            href="/finanzen/steuerprogression-rechner"
            emoji="📊"
            text="Steuerprogression visualisieren"
          />

          <ErgebnisAktionen
            ergebnisText={`Spende: ${fmt(ergebnis.spendenbetrag)} € → Steuerersparnis: ${fmt(ergebnis.steuerersparnisGesamt)} € (Grenzsteuersatz: ${ergebnis.grenzsteuersatz.toFixed(0)} %, Effektive Kosten: ${fmt(ergebnis.effektiveKosten)} €, Förderquote: ${ergebnis.foerderquote.toFixed(1)} %)`}
            seitenTitel="Spenden-Rechner"
          />

          <div className="mt-6">
            <AffiliateBox programId="wiso" context="spenden" />
          </div>

          <AiExplain
            rechnerName="Spenden-Rechner"
            eingaben={{
              spendenbetragEuro: ergebnis.spendenbetrag,
              zvEEuro: ergebnis.zvE,
              kirchensteuer: kirchensteuer === 'ja',
            }}
            ergebnis={{
              steuerersparnisGesamtEuro: ergebnis.steuerersparnisGesamt,
              effektiveKostenEuro: ergebnis.effektiveKosten,
              foerderquoteProzent: ergebnis.foerderquote,
              grenzsteuersatzProzent: ergebnis.grenzsteuersatz,
            }}
          />
        </>
      )}
    </div>
  );
}
