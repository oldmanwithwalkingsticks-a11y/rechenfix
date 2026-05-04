'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneRiester,
  type RiesterFamilienstand,
} from '@/lib/berechnungen/riester';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Familienstand = RiesterFamilienstand;

export default function RiesterRechner() {
  const [brutto, setBrutto] = useState('40000');
  const [familienstand, setFamilienstand] = useState<Familienstand>('alleinstehend');
  const [kinderAnzahl, setKinderAnzahl] = useState('0');
  const [kinderAb2008, setKinderAb2008] = useState<boolean[]>([true, true, true, true, true]);
  const [eigenbeitragEingabe, setEigenbeitragEingabe] = useState('0');
  const [grenzsteuersatz, setGrenzsteuersatz] = useState('35');

  const b = parseDeutscheZahl(brutto);
  const ebEingabe = parseDeutscheZahl(eigenbeitragEingabe);
  const grenz = parseInt(grenzsteuersatz, 10) / 100;
  const kAnzahl = parseInt(kinderAnzahl, 10) || 0;

  const ergebnis = useMemo(
    () =>
      berechneRiester({
        vorjahresBrutto: b,
        familienstand,
        kinderAnzahl: kAnzahl,
        kinderAb2008,
        eigenbeitrag: ebEingabe,
        grenzsteuersatz: grenz,
      }),
    [b, familienstand, kAnzahl, kinderAb2008, ebEingabe, grenz],
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtD = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const setKindJahr = (idx: number, ab2008: boolean) => {
    setKinderAb2008(prev => {
      const next = [...prev];
      next[idx] = ab2008;
      return next;
    });
  };

  return (
    <div>
      {/* Brutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Jahresbruttoeinkommen (Vorjahr)
        </label>
        <NummerEingabe value={brutto} onChange={setBrutto} placeholder="40000" einheit="€/Jahr" />
      </div>

      {/* Familienstand */}
      <div className="mb-4">
        <RadioToggleGroup
          name="riester-familienstand"
          legend="Familienstand"
          options={[
            { value: 'alleinstehend', label: 'Alleinstehend' },
            { value: 'ein-partner', label: 'Verheiratet (nur einer riestert)' },
            { value: 'beide-partner', label: 'Verheiratet (beide riestern)' },
          ]}
          value={familienstand}
          onChange={(v) => setFamilienstand(v as Familienstand)}
          columns={3}
        />
      </div>

      {/* Kinder */}
      <div className="mb-4">
        <label htmlFor="riester-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl Kinder</label>
        <select id="riester-select-1"
          value={kinderAnzahl}
          onChange={e => setKinderAnzahl(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        >
          {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Kind' : 'Kinder'}</option>)}
        </select>
      </div>

      {/* Kind-Geburtsjahr */}
      {kAnzahl > 0 && (
        <div className="mb-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Geburtsjahr pro Kind</p>
          <div className="space-y-2">
            {Array.from({ length: kAnzahl }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-16">Kind {i + 1}</span>
                <div className="flex-1">
                  <RadioToggleGroup
                    name={`riester-kind-${i}`}
                    legend="Geburtsjahr"
                    srOnlyLegend
                    options={[
                      { value: 'vor2008', label: 'Vor 2008 (185 €)' },
                      { value: 'ab2008', label: 'Ab 2008 (300 €)' },
                    ]}
                    value={kinderAb2008[i] ? 'ab2008' : 'vor2008'}
                    onChange={(v) => setKindJahr(i, v === 'ab2008')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eigenbeitrag + Grenzsteuersatz */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gewünschter Eigenbeitrag</label>
          <NummerEingabe value={eigenbeitragEingabe} onChange={setEigenbeitragEingabe} placeholder="0 = optimal" einheit="€/Jahr" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            0 lassen für automatisch optimierten Beitrag
          </p>
        </div>
        <div>
          <label htmlFor="riester-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grenzsteuersatz</label>
          <select id="riester-select-2"
            value={grenzsteuersatz}
            onChange={e => setGrenzsteuersatz(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="25">25 %</option>
            <option value="30">30 %</option>
            <option value="35">35 %</option>
            <option value="42">42 %</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Gesamtförderung pro Jahr</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.gesamtfoerderung)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              bei {fmt(ergebnis.eigenbeitrag)} € Eigenbeitrag
            </p>
          </div>

          {/* Lohnt-sich-Check */}
          <div className={`rounded-xl p-4 mb-4 border ${
            ergebnis.lohntSich === 'gruen'
              ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
              : ergebnis.lohntSich === 'gelb'
                ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
                : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <p className={`text-sm font-bold ${
              ergebnis.lohntSich === 'gruen'
                ? 'text-green-800 dark:text-green-300'
                : ergebnis.lohntSich === 'gelb'
                  ? 'text-amber-800 dark:text-amber-300'
                  : 'text-red-800 dark:text-red-300'
            }`}>
              Förderquote: {fmtD(ergebnis.foerderquote)} %
            </p>
            <p className={`text-xs mt-1 ${
              ergebnis.lohntSich === 'gruen'
                ? 'text-green-700 dark:text-green-400'
                : ergebnis.lohntSich === 'gelb'
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-red-700 dark:text-red-400'
            }`}>
              {ergebnis.lohntSich === 'gruen' && 'Riestern lohnt sich für Sie — Sie bekommen überdurchschnittlich viel Förderung auf jeden eingezahlten Euro.'}
              {ergebnis.lohntSich === 'gelb' && 'Riestern kann sich lohnen — mit höherer Kinderzulage oder mehr Grenzsteuersatz würde die Quote steigen.'}
              {ergebnis.lohntSich === 'rot' && 'Förderquote unter 15 % — prüfen Sie Alternativen wie einen ETF-Sparplan oder die Basisrente (Rürup).'}
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Eigenbeitrag (Sie zahlen)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.eigenbeitrag)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundzulage ({ergebnis.personen} × 175 €)</span>
                <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.grundzulagen)} €</span>
              </div>
              {ergebnis.kinderzulagen > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Kinderzulagen</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.kinderzulagen)} €</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Effektive Zulagen</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.effektiveZulagen)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sonderausgabenabzug (max. 2.100 €)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sonderausgaben)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Steuerersparnis ({(grenz * 100).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.steuerersparnis)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Zusätzlicher Steuervorteil (Günstigerprüfung)</span>
                <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.zusatzlicherSteuervorteil)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtförderung</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtfoerderung)} €</span>
              </div>
            </div>
          </div>

          {/* Empfehlung */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-3">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Optimaler Eigenbeitrag</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Für die volle Zulage sollten Sie <strong>{fmt(ergebnis.optimalerEigenbeitrag)} €/Jahr</strong> einzahlen
              ({fmtD(ergebnis.optimalerEigenbeitrag / 12)} €/Monat). Das sind 4 % Ihres Bruttoeinkommens minus Zulagen.
            </p>
          </div>

          <CrossLink href="/finanzen/rentenrechner" emoji="👵" text="Rentenlücke berechnen" />

          <AffiliateBox programId="verivox" context="riester" />
          <AffiliateBox programId="cosmosdirekt" context="altersvorsorge" />

          <ErgebnisAktionen
            ergebnisText={`Riester: ${fmt(ergebnis.gesamtfoerderung)} €/Jahr Förderung bei ${fmt(ergebnis.eigenbeitrag)} € Eigenbeitrag (${fmtD(ergebnis.foerderquote)} % Förderquote). Zulagen ${fmt(ergebnis.effektiveZulagen)} € + Steuervorteil ${fmt(ergebnis.zusatzlicherSteuervorteil)} €.`}
            seitenTitel="Riester-Rechner"
          />

          <AiExplain
            rechnerName="Riester-Rechner"
            eingaben={{
              jahresbrutto: b,
              familienstand,
              kinder: kAnzahl,
              eigenbeitrag: ergebnis.eigenbeitrag,
              grenzsteuersatz: grenz,
            }}
            ergebnis={{
              gesamtfoerderung: ergebnis.gesamtfoerderung,
              effektiveZulagen: ergebnis.effektiveZulagen,
              zusatzlicherSteuervorteil: ergebnis.zusatzlicherSteuervorteil,
              foerderquote: ergebnis.foerderquote,
              optimalerEigenbeitrag: ergebnis.optimalerEigenbeitrag,
            }}
          />
        </>
      )}
    </div>
  );
}
