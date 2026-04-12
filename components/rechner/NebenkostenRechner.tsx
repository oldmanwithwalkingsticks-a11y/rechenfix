'use client';

import { useState, useMemo } from 'react';
import { berechneNebenkosten } from '@/lib/berechnungen/nebenkosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

export default function NebenkostenRechner() {
  const [kaltmiete, setKaltmiete] = useState('650');
  const [wohnflaeche, setWohnflaeche] = useState('65');
  const [heizkosten, setHeizkosten] = useState('80');
  const [warmwasser, setWarmwasser] = useState('25');
  const [wasser, setWasser] = useState('35');
  const [muell, setMuell] = useState('20');
  const [grundsteuer, setGrundsteuer] = useState('15');
  const [versicherung, setVersicherung] = useState('10');
  const [hauswart, setHauswart] = useState('15');
  const [sonstige, setSonstige] = useState('0');

  const ergebnis = useMemo(
    () => berechneNebenkosten({
      kaltmiete: parseDeutscheZahl(kaltmiete),
      wohnflaeche: parseDeutscheZahl(wohnflaeche),
      personenAnzahl: 1,
      heizkosten: parseDeutscheZahl(heizkosten),
      warmwasser: parseDeutscheZahl(warmwasser),
      wasser: parseDeutscheZahl(wasser),
      muell: parseDeutscheZahl(muell),
      grundsteuer: parseDeutscheZahl(grundsteuer),
      versicherung: parseDeutscheZahl(versicherung),
      hauswart: parseDeutscheZahl(hauswart),
      sonstige: parseDeutscheZahl(sonstige),
    }),
    [kaltmiete, wohnflaeche, heizkosten, warmwasser, wasser, muell, grundsteuer, versicherung, hauswart, sonstige]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaltmiete</label>
          <NummerEingabe value={kaltmiete} onChange={setKaltmiete} placeholder="650" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnfläche</label>
          <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="65" einheit="m²" />
        </div>
      </div>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nebenkosten (monatlich)</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Heizkosten</label>
          <NummerEingabe value={heizkosten} onChange={setHeizkosten} placeholder="80" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Warmwasser</label>
          <NummerEingabe value={warmwasser} onChange={setWarmwasser} placeholder="25" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Wasser/Abwasser</label>
          <NummerEingabe value={wasser} onChange={setWasser} placeholder="35" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Müllentsorgung</label>
          <NummerEingabe value={muell} onChange={setMuell} placeholder="20" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Grundsteuer</label>
          <NummerEingabe value={grundsteuer} onChange={setGrundsteuer} placeholder="15" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Gebäudeversicherung</label>
          <NummerEingabe value={versicherung} onChange={setVersicherung} placeholder="10" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hauswart</label>
          <NummerEingabe value={hauswart} onChange={setHauswart} placeholder="15" einheit="€" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Sonstige</label>
          <NummerEingabe value={sonstige} onChange={setSonstige} placeholder="0" einheit="€" />
        </div>
      </div>

      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Warmmiete (Kaltmiete + Nebenkosten)</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(ergebnis.warmmiete)} €</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">davon {fmt(ergebnis.nebenkostenMonat)} € Nebenkosten</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nebenkosten/Jahr</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.nebenkostenJahr)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nebenkosten/m²</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.nebenkostenProQm)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Anteil an Warmmiete</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{ergebnis.anteilAnWarmmiete.toLocaleString('de-DE')} %</p>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Warmmiete: ${fmt(ergebnis.warmmiete)} € (Nebenkosten: ${fmt(ergebnis.nebenkostenMonat)} €/Monat, ${fmt(ergebnis.nebenkostenJahr)} €/Jahr)`}
            seitenTitel="Nebenkostenrechner"
          />
          <AiExplain
            rechnerName="Nebenkosten-Rechner"
            eingaben={{
              kaltmiete: parseDeutscheZahl(kaltmiete),
              wohnflaeche: parseDeutscheZahl(wohnflaeche),
              heizkosten: parseDeutscheZahl(heizkosten),
              warmwasser: parseDeutscheZahl(warmwasser),
              wasser: parseDeutscheZahl(wasser),
              muell: parseDeutscheZahl(muell),
              grundsteuer: parseDeutscheZahl(grundsteuer),
              versicherung: parseDeutscheZahl(versicherung),
              hauswart: parseDeutscheZahl(hauswart),
              sonstige: parseDeutscheZahl(sonstige),
            }}
            ergebnis={{
              warmmiete: ergebnis.warmmiete,
              nebenkostenMonat: ergebnis.nebenkostenMonat,
              nebenkostenJahr: ergebnis.nebenkostenJahr,
              nebenkostenProQm: ergebnis.nebenkostenProQm,
              anteilAnWarmmiete: ergebnis.anteilAnWarmmiete,
            }}
          />

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaltmiete</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(kaltmiete))} €</span>
              </div>
              {ergebnis.aufschluesselung.map((pos, i) => (
                <div key={i} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(pos.betrag)} €</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Warmmiete gesamt</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.warmmiete)} €</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {ergebnis && (
        <AffiliateBox programId="check24" context="nebenkosten" />
      )}
    </div>
  );
}
