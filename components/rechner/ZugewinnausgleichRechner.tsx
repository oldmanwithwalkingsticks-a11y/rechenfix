'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import { indexiereVermoegen, getVpi, VPI_JAHRESDURCHSCHNITTE, VPI_AKTUELL } from '@/lib/berechnungen/vpi';

// VPI-Range: erstes Jahr in den Lange-Reihen-Daten + laufendes Jahr (aktueller VPI-Monat).
const VPI_JAHR_MIN = Math.min(...Object.keys(VPI_JAHRESDURCHSCHNITTE).map(Number));
const VPI_JAHR_MAX = parseInt(VPI_AKTUELL.monat.slice(0, 4), 10);

export default function ZugewinnausgleichRechner() {
  const [heiratsjahr, setHeiratsjahr] = useState('2010');
  const [endstichtagJahr, setEndstichtagJahr] = useState(String(VPI_JAHR_MAX));
  const [anfangP1, setAnfangP1] = useState('15000');
  const [endP1, setEndP1] = useState('80000');
  const [privilegP1, setPrivilegP1] = useState('0');
  const [privilegJahrP1, setPrivilegJahrP1] = useState('2010');
  const [anfangP2, setAnfangP2] = useState('5000');
  const [endP2, setEndP2] = useState('120000');
  const [privilegP2, setPrivilegP2] = useState('0');
  const [privilegJahrP2, setPrivilegJahrP2] = useState('2010');

  const ergebnis = useMemo(() => {
    const aP1 = parseDeutscheZahl(anfangP1);
    const eP1 = parseDeutscheZahl(endP1);
    const prP1 = parseDeutscheZahl(privilegP1);
    const aP2 = parseDeutscheZahl(anfangP2);
    const eP2 = parseDeutscheZahl(endP2);
    const prP2 = parseDeutscheZahl(privilegP2);
    const heirat = parseInt(heiratsjahr, 10);
    const ende = parseInt(endstichtagJahr, 10);
    const prJP1 = parseInt(privilegJahrP1, 10) || heirat;
    const prJP2 = parseInt(privilegJahrP2, 10) || heirat;

    // VPI-Range-Validierung — bei Out-of-Range fallen wir auf "keine
    // Indexierung" zurück, damit der Rechner noch funktioniert; Hinweis
    // im UI dazu (vpiFehler).
    let vpiFehler: string | null = null;
    let aP1Indexiert = aP1;
    let prP1Indexiert = prP1;
    let aP2Indexiert = aP2;
    let prP2Indexiert = prP2;
    let vpiHeirat = 0;
    let vpiEnde = 0;
    let indexFaktor = 1;
    try {
      vpiHeirat = getVpi(heirat);
      vpiEnde = getVpi(ende);
      indexFaktor = vpiEnde / vpiHeirat;
      // § 1376 BGB: Anfangsvermögen × VPI(End) / VPI(Heirat)
      aP1Indexiert = indexiereVermoegen(aP1, heirat, ende);
      aP2Indexiert = indexiereVermoegen(aP2, heirat, ende);
      // Privilegierter Erwerb wird mit dem VPI zum Erwerbsdatum indexiert
      // (ständige Rechtsprechung BGH FamRZ 2002, 606).
      prP1Indexiert = indexiereVermoegen(prP1, prJP1, ende);
      prP2Indexiert = indexiereVermoegen(prP2, prJP2, ende);
    } catch (e) {
      vpiFehler = e instanceof Error ? e.message : 'VPI-Lookup-Fehler';
    }

    // Bereinigtes Anfangsvermögen (inkl. indexiertem privilegierten Erwerb)
    const bereinAnfangP1 = aP1Indexiert + prP1Indexiert;
    const bereinAnfangP2 = aP2Indexiert + prP2Indexiert;

    // Zugewinn (kann nicht negativ werden)
    const zugewinnP1 = Math.max(0, eP1 - bereinAnfangP1);
    const zugewinnP2 = Math.max(0, eP2 - bereinAnfangP2);

    const differenz = Math.abs(zugewinnP1 - zugewinnP2);
    const ausgleichRoh = differenz / 2;

    // Wer zahlt an wen?
    const pflichtiger = zugewinnP1 > zugewinnP2 ? 'P1' : zugewinnP2 > zugewinnP1 ? 'P2' : null;
    const berechtigter = pflichtiger === 'P1' ? 'P2' : pflichtiger === 'P2' ? 'P1' : null;

    // Deckelung: Ausgleichspflichtiger muss nicht mehr zahlen als sein Endvermögen - bereinigtes Anfangsvermögen
    let ausgleich = ausgleichRoh;
    if (pflichtiger === 'P1') {
      const max = Math.max(0, eP1 - bereinAnfangP1);
      ausgleich = Math.min(ausgleichRoh, max);
    } else if (pflichtiger === 'P2') {
      const max = Math.max(0, eP2 - bereinAnfangP2);
      ausgleich = Math.min(ausgleichRoh, max);
    }

    return {
      aP1, eP1, prP1, aP1Indexiert, prP1Indexiert, bereinAnfangP1, zugewinnP1,
      aP2, eP2, prP2, aP2Indexiert, prP2Indexiert, bereinAnfangP2, zugewinnP2,
      differenz, ausgleichRoh, ausgleich, pflichtiger, berechtigter,
      heirat, ende, vpiHeirat, vpiEnde, indexFaktor, vpiFehler,
    };
  }, [
    anfangP1, endP1, privilegP1, privilegJahrP1,
    anfangP2, endP2, privilegP2, privilegJahrP2,
    heiratsjahr, endstichtagJahr,
  ]);

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const maxZugewinn = Math.max(ergebnis.zugewinnP1, ergebnis.zugewinnP2, 1);

  return (
    <div>
      {/* === STICHTAGE === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">📅</span>
          Stichtage
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Heiratsjahr</label>
              <NummerEingabe value={heiratsjahr} onChange={setHeiratsjahr} placeholder="2010" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endstichtag (Scheidungsantrag)</label>
              <NummerEingabe value={endstichtagJahr} onChange={setEndstichtagJahr} placeholder={String(VPI_JAHR_MAX)} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Für die Indexierung des Anfangsvermögens nach § 1376 BGB. Verfügbarer VPI-Bereich: {VPI_JAHR_MIN}–{VPI_JAHR_MAX}.
            {!ergebnis.vpiFehler && ergebnis.indexFaktor !== 1 && (
              <> Index-Faktor {ergebnis.indexFaktor.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} (VPI {ergebnis.vpiHeirat} → {ergebnis.vpiEnde}).</>
            )}
          </p>
          {ergebnis.vpiFehler && (
            <p role="alert" className="text-xs text-amber-700 dark:text-amber-400">
              ⚠ {ergebnis.vpiFehler} — Berechnung läuft ohne Indexierung weiter.
            </p>
          )}
        </div>
      </div>

      {/* === PARTNER 1 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Partner 1
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anfangsvermögen (bei Heirat)</label>
            <NummerEingabe value={anfangP1} onChange={setAnfangP1} placeholder="15.000" einheit="€" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Vermögen am Tag der Heirat. Schulden als negativer Wert möglich.
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endvermögen (bei Scheidungsantrag/Erbfall)</label>
            <NummerEingabe value={endP1} onChange={setEndP1} placeholder="80.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Privilegierter Erwerb (optional)</label>
            <div className="grid grid-cols-2 gap-2">
              <NummerEingabe value={privilegP1} onChange={setPrivilegP1} placeholder="0" einheit="€" />
              <NummerEingabe value={privilegJahrP1} onChange={setPrivilegJahrP1} placeholder="2015" einheit="Jahr" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Erbschaften und Schenkungen während der Ehe werden dem Anfangsvermögen zugerechnet (mit VPI zum Erwerbsjahr indexiert).
            </p>
          </div>
        </div>
      </div>

      {/* === PARTNER 2 === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Partner 2
        </h2>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anfangsvermögen (bei Heirat)</label>
            <NummerEingabe value={anfangP2} onChange={setAnfangP2} placeholder="5.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endvermögen (bei Scheidungsantrag/Erbfall)</label>
            <NummerEingabe value={endP2} onChange={setEndP2} placeholder="120.000" einheit="€" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Privilegierter Erwerb (optional)</label>
            <div className="grid grid-cols-2 gap-2">
              <NummerEingabe value={privilegP2} onChange={setPrivilegP2} placeholder="0" einheit="€" />
              <NummerEingabe value={privilegJahrP2} onChange={setPrivilegJahrP2} placeholder="2015" einheit="Jahr" />
            </div>
          </div>
        </div>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Ausgleichsanspruch</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.ausgleich)} €</p>
        {ergebnis.pflichtiger && ergebnis.ausgleich > 0 ? (
          <p className="text-white/80 text-sm mt-1">
            <strong>Partner {ergebnis.pflichtiger === 'P1' ? '1' : '2'}</strong> zahlt an <strong>Partner {ergebnis.berechtigter === 'P1' ? '1' : '2'}</strong>
          </p>
        ) : (
          <p className="text-white/80 text-sm mt-1">Kein Ausgleichsanspruch</p>
        )}
      </div>

      {/* Detailtabelle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Position</th>
                <th className="px-3 py-2 text-right font-semibold">Partner 1</th>
                <th className="px-3 py-2 text-right font-semibold">Partner 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Anfangsvermögen ({ergebnis.heirat})</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP2)} €</td>
              </tr>
              {ergebnis.indexFaktor !== 1 && (
                <tr>
                  <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">↳ indexiert auf {ergebnis.ende} (× {ergebnis.indexFaktor.toFixed(3)})</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP1Indexiert)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.aP2Indexiert)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">+ Privilegierter Erwerb (indexiert)</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.prP1Indexiert)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.prP2Indexiert)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">= Bereinigtes Anfangsvermögen</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.bereinAnfangP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.bereinAnfangP2)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Endvermögen</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.eP1)} €</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{fmtEuro(ergebnis.eP2)} €</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300">Zugewinn</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.zugewinnP1)} €</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.zugewinnP2)} €</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Differenz der Zugewinne</td>
                <td className="px-3 py-2.5 text-right tabular-nums" colSpan={2}>{fmtEuro(ergebnis.differenz)} €</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-500/10 font-bold">
                <td className="px-3 py-3 text-green-800 dark:text-green-300">Ausgleichsanspruch (50 %)</td>
                <td className="px-3 py-3 text-right tabular-nums text-green-800 dark:text-green-300" colSpan={2}>{fmtEuro(ergebnis.ausgleich)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Balkendiagramm Zugewinn Vergleich */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Zugewinn-Vergleich</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Partner 1</span>
              <span className="tabular-nums font-semibold">{fmtEuro(ergebnis.zugewinnP1)} €</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${(ergebnis.zugewinnP1 / maxZugewinn) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
              <span>Partner 2</span>
              <span className="tabular-nums font-semibold">{fmtEuro(ergebnis.zugewinnP2)} €</span>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: `${(ergebnis.zugewinnP2 / maxZugewinn) * 100}%` }}></div>
            </div>
          </div>
        </div>
        {ergebnis.ausgleich > 0 && ergebnis.pflichtiger && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            → Partner {ergebnis.pflichtiger === 'P1' ? '1' : '2'} gleicht <strong>{fmtEuro(ergebnis.ausgleich)} €</strong> an Partner {ergebnis.berechtigter === 'P1' ? '1' : '2'} aus.
          </p>
        )}
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Vereinfachte Berechnung. In der Praxis müssen Vermögenswerte (Immobilien, Unternehmen, Rentenanwartschaften) exakt bewertet werden. Lassen Sie sich anwaltlich beraten.
        </p>
      </div>

      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />
      <CrossLink href="/finanzen/splitting-rechner" emoji="💑" text="Splittingtarif nach der Scheidung prüfen" />
      <CrossLink href="/finanzen/erbschaftsteuer-rechner" emoji="🏛️" text="Erbschaftsteuer berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Zugewinnausgleich: ${fmtEuro(ergebnis.ausgleich)} € | Zugewinn P1: ${fmtEuro(ergebnis.zugewinnP1)} € · P2: ${fmtEuro(ergebnis.zugewinnP2)} € | ${ergebnis.pflichtiger ? `Partner ${ergebnis.pflichtiger === 'P1' ? '1' : '2'} zahlt an Partner ${ergebnis.berechtigter === 'P1' ? '1' : '2'}` : 'kein Ausgleich'}`}
        seitenTitel="Zugewinnausgleich-Rechner"
      />

      <AffiliateBox programId="ks-auxilia" context="zugewinn" />

      <AiExplain
        rechnerName="Zugewinnausgleich-Rechner"
        eingaben={{
          'Partner 1 Anfangsvermögen': `${fmtEuro(ergebnis.aP1)} €`,
          'Partner 1 Endvermögen': `${fmtEuro(ergebnis.eP1)} €`,
          'Partner 1 privilegierter Erwerb': `${fmtEuro(ergebnis.prP1)} €`,
          'Partner 2 Anfangsvermögen': `${fmtEuro(ergebnis.aP2)} €`,
          'Partner 2 Endvermögen': `${fmtEuro(ergebnis.eP2)} €`,
          'Partner 2 privilegierter Erwerb': `${fmtEuro(ergebnis.prP2)} €`,
        }}
        ergebnis={{
          'Zugewinn Partner 1': `${fmtEuro(ergebnis.zugewinnP1)} €`,
          'Zugewinn Partner 2': `${fmtEuro(ergebnis.zugewinnP2)} €`,
          Differenz: `${fmtEuro(ergebnis.differenz)} €`,
          Ausgleichsanspruch: `${fmtEuro(ergebnis.ausgleich)} €`,
          'Pflichtiger Partner': ergebnis.pflichtiger ? (ergebnis.pflichtiger === 'P1' ? 'Partner 1' : 'Partner 2') : 'keiner',
        }}
      />
    </div>
  );
}
