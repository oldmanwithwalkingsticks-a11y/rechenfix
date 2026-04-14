'use client';

import { useState, useMemo } from 'react';
import { berechneMietpreis } from '@/lib/berechnungen/mietpreis';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function MietrechnerRechner() {
  const [kaltmiete, setKaltmiete] = useState('650');
  const [nebenkosten, setNebenkosten] = useState('200');
  const [wohnflaeche, setWohnflaeche] = useState('65');
  const [nettoEinkommen, setNettoEinkommen] = useState('2500');

  const ergebnis = useMemo(
    () => berechneMietpreis({
      kaltmiete: parseDeutscheZahl(kaltmiete),
      nebenkosten: parseDeutscheZahl(nebenkosten),
      wohnflaeche: parseDeutscheZahl(wohnflaeche),
      nettoEinkommen: parseDeutscheZahl(nettoEinkommen),
    }),
    [kaltmiete, nebenkosten, wohnflaeche, nettoEinkommen]
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nebenkosten</label>
          <NummerEingabe value={nebenkosten} onChange={setNebenkosten} placeholder="200" einheit="€" />
          <CrossLink href="/wohnen/nebenkosten-rechner" emoji="📋" text="Nebenkosten genau berechnen" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wohnfläche</label>
          <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="65" einheit="m²" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nettoeinkommen</label>
          <NummerEingabe value={nettoEinkommen} onChange={setNettoEinkommen} placeholder="2500" einheit="€" />
        </div>
      </div>

      {ergebnis && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Warmmiete pro Monat</p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">{fmt(ergebnis.warmmiete)} €</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {fmt(ergebnis.warmmieteProQm)} €/m² warm · {fmt(ergebnis.kaltmieteProQm)} €/m² kalt
            </p>
          </div>

          {/* Mietbelastung */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.mietbelastungOk
              ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
              : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{ergebnis.mietbelastungOk ? '✅' : '⚠️'}</span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${
                  ergebnis.mietbelastungOk
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  Mietbelastung: {ergebnis.mietbelastung.toLocaleString('de-DE')} % des Nettoeinkommens
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Empfohlen: maximal 30% ({fmt(ergebnis.empfohlenMax)} €)
                </p>
                {/* Balken */}
                <div className="mt-2 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${ergebnis.mietbelastungOk ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(100, ergebnis.mietbelastung)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Jahresmiete</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.jahresmiete)} €</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rest nach Miete</p>
              <p className={`text-xl font-bold ${ergebnis.restNachMiete >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {fmt(ergebnis.restNachMiete)} €
              </p>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Warmmiete: ${fmt(ergebnis.warmmiete)} €/Monat (${fmt(ergebnis.warmmieteProQm)} €/m², Mietbelastung: ${ergebnis.mietbelastung.toLocaleString('de-DE')} %)`}
            seitenTitel="Mietrechner"
          />
          <AiExplain
            rechnerName="Mietrechner"
            eingaben={{
              kaltmiete: parseDeutscheZahl(kaltmiete),
              nebenkosten: parseDeutscheZahl(nebenkosten),
              wohnflaeche: parseDeutscheZahl(wohnflaeche),
              nettoEinkommen: parseDeutscheZahl(nettoEinkommen),
            }}
            ergebnis={{
              warmmiete: ergebnis.warmmiete,
              warmmieteProQm: ergebnis.warmmieteProQm,
              kaltmieteProQm: ergebnis.kaltmieteProQm,
              mietbelastung: ergebnis.mietbelastung,
              jahresmiete: ergebnis.jahresmiete,
              restNachMiete: ergebnis.restNachMiete,
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
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nebenkosten</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(nebenkosten))} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Warmmiete</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.warmmiete)} €</span>
              </div>
            </div>
          </div>

          <CrossLink href="/wohnen/mietrendite-rechner" emoji="📈" text="Als Vermieter: Mietrendite berechnen" />
          <CrossLink href="/wohnen/indexmiete-rechner" emoji="📊" text="Indexmiete: Erhöhung prüfen" />
        </div>
      )}
    </div>
  );
}
