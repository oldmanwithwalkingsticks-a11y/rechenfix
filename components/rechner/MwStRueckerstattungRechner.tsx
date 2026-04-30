'use client';

import { useState, useMemo } from 'react';
import { berechneMwstRueckerstattung } from '@/lib/berechnungen/mwst-rueckerstattung';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type GebuehrenTyp = 'keine' | 'global-blue' | 'planet';

export default function MwstRueckerstattungRechner() {
  const [kaufbetrag, setKaufbetrag] = useState('500');
  const [mwstSatz, setMwstSatz] = useState('19');
  const [gebuehrenTyp, setGebuehrenTyp] = useState<GebuehrenTyp>('global-blue');

  const ergebnis = useMemo(() => {
    const betrag = parseDeutscheZahl(kaufbetrag);
    if (betrag <= 0) return null;
    return berechneMwstRueckerstattung({
      kaufbetragBrutto: betrag,
      mwstSatz: Number(mwstSatz),
      gebuehrenTyp,
    });
  }, [kaufbetrag, mwstSatz, gebuehrenTyp]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Kaufbetrag */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kaufbetrag (brutto)</label>
          <NummerEingabe value={kaufbetrag} onChange={setKaufbetrag} einheit="€" placeholder="500" />
        </div>

        {/* MwSt-Satz */}
        <RadioToggleGroup
          name="mwst-satz"
          legend="MwSt-Satz"
          value={mwstSatz}
          onChange={setMwstSatz}
          options={[
            { label: '19 % (Standard)', value: '19' },
            { label: '7 % (ermäßigt)', value: '7' },
          ]}
        />

        {/* Bearbeitungsgebühr */}
        <div>
          <label htmlFor="mwst-rueck-gebuehr" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erstattungs-Dienstleister</label>
          <select
            id="mwst-rueck-gebuehr"
            value={gebuehrenTyp}
            onChange={e => setGebuehrenTyp(e.target.value as GebuehrenTyp)}
            className="input-field"
          >
            <option value="keine">Keine Gebühr (direkt beim Händler)</option>
            <option value="global-blue">Global Blue (~3,50 € + 1,5 %)</option>
            <option value="planet">Planet (~4,00 € + 2 %)</option>
          </select>
          <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Dienstleister-Gebühren werden von der MwSt-Erstattung abgezogen</p>
        </div>
      </div>

      {/* Mindestbetrag-Warnung */}
      {ergebnis && !ergebnis.mindestbetragErreicht && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
          <p className="text-sm text-red-700 dark:text-red-400">
            <strong>Achtung:</strong> Der Mindestbetrag von 50,01 € pro Händler ist nicht erreicht. Eine MwSt-Rückerstattung ist nur ab diesem Betrag möglich.
          </p>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Ihre MwSt-Erstattung</p>
            <p className="text-5xl font-bold">{fmt(ergebnis.erstattungNetto)} <span className="text-2xl">€</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">MwSt-Anteil</p>
                <p className="text-lg font-bold">{fmt(ergebnis.mwstAnteil)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Abzüge (Gebühren)</p>
                <p className="text-lg font-bold">−{fmt(ergebnis.gebuehrenGesamt)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Effektive Ersparnis</p>
                <p className="text-lg font-bold">{fmt(ergebnis.effektiveErsparnisProzent)} %</p>
              </div>
            </div>
          </div>

          {/* Detail-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kaufbetrag (brutto)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(kaufbetrag))} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nettobetrag (ohne MwSt)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.nettobetrag)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">MwSt-Anteil ({mwstSatz} %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mwstAnteil)} €</span>
              </div>
              {ergebnis.gebuehrenGesamt > 0 && (
                <>
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Fixgebühr ({gebuehrenTyp === 'global-blue' ? 'Global Blue' : 'Planet'})</span>
                    <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.fixgebuehr)} €</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Prozentuale Gebühr</span>
                    <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.prozentgebuehr)} €</span>
                  </div>
                </>
              )}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Netto-Erstattung</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.erstattungNetto)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Effektive Ersparnis</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.effektiveErsparnisProzent)} %</span>
              </div>
            </div>
          </div>

          {/* Info-Box */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong>Tipp:</strong> Direkt beim Händler (ohne Dienstleister) erhalten Sie die volle MwSt zurück — vorausgesetzt, der Händler bietet dieses Verfahren an. Bei Global Blue oder Planet fallen Gebühren an, dafür ist das Verfahren am Flughafen unkomplizierter.
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Nur für Nicht-EU-Bürger bei Ausfuhr im persönlichen Reisegepäck innerhalb von 3 Monaten nach Kauf. Der Zoll am Flughafen muss den Ausfuhrschein abstempeln. Mindestbetrag 50,01 € pro Händler pro Tag. Lebensmittel und Dienstleistungen sind ausgeschlossen. Die tatsächlichen Gebühren können je nach Dienstleister variieren.
            </p>
          </div>

          <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="Mehrwertsteuer berechnen" />
          <CrossLink href="/alltag/waehrungsrechner" emoji="💱" text="Währungsrechner" />

          <ErgebnisAktionen
            ergebnisText={`MwSt-Rückerstattung: ${fmt(ergebnis.erstattungNetto)} € netto (von ${fmt(ergebnis.mwstAnteil)} € MwSt, abzgl. ${fmt(ergebnis.gebuehrenGesamt)} € Gebühren) bei ${fmt(parseDeutscheZahl(kaufbetrag))} € Einkauf (${mwstSatz} % MwSt) — effektive Ersparnis: ${fmt(ergebnis.effektiveErsparnisProzent)} %`}
            seitenTitel="MwSt-Rückerstattungs-Rechner"
          />

          <AiExplain
            rechnerName="MwSt-Rückerstattungs-Rechner"
            eingaben={{
              kaufbetragBruttoEuro: parseDeutscheZahl(kaufbetrag),
              mwstSatzProzent: Number(mwstSatz),
              gebuehrenTyp,
            }}
            ergebnis={{
              mwstAnteilEuro: ergebnis.mwstAnteil,
              gebuehrenGesamtEuro: ergebnis.gebuehrenGesamt,
              erstattungNettoEuro: ergebnis.erstattungNetto,
              effektiveErsparnisProzent: ergebnis.effektiveErsparnisProzent,
              mindestbetragErreicht: ergebnis.mindestbetragErreicht,
            }}
          />
        </>
      )}
    </div>
  );
}
