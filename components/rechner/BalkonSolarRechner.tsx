'use client';

import { useState, useMemo } from 'react';
import { berechneBalkonSolar, AUSRICHTUNGEN, AUFSTELLUNGEN } from '@/lib/berechnungen/balkon-solar';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BalkonSolarRechner() {
  const [leistungModus, setLeistungModus] = useState('800');
  const [leistungEigen, setLeistungEigen] = useState('800');
  const [ausrichtung, setAusrichtung] = useState('sued');
  const [aufstellung, setAufstellung] = useState('aufstaenderung');
  const [stromverbrauch, setStromverbrauch] = useState('3000');
  const [strompreis, setStrompreis] = useState('32');
  const [kosten, setKosten] = useState('600');

  const leistungWatt = leistungModus === 'eigene'
    ? parseDeutscheZahl(leistungEigen)
    : parseInt(leistungModus);

  const ergebnis = useMemo(() => {
    const sv = parseDeutscheZahl(stromverbrauch);
    const sp = parseDeutscheZahl(strompreis);
    const k = parseDeutscheZahl(kosten);
    if (leistungWatt <= 0 || sv <= 0 || sp <= 0 || k <= 0) return null;
    return berechneBalkonSolar(leistungWatt, ausrichtung, aufstellung, sv, sp, k);
  }, [leistungWatt, ausrichtung, aufstellung, stromverbrauch, strompreis, kosten]);

  return (
    <div>
      <div className="space-y-4 mb-6">
        <RadioToggleGroup
          legend="Anlagenleistung"
          name="leistung"
          options={[
            { value: '600', label: '600 W (alt)' },
            { value: '800', label: '800 W (seit 2024)' },
            { value: 'eigene', label: 'Eigene Angabe' },
          ]}
          value={leistungModus}
          onChange={setLeistungModus}
        />

        {leistungModus === 'eigene' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leistung (Watt)</label>
            <NummerEingabe value={leistungEigen} onChange={setLeistungEigen} placeholder="800" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ausrichtung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ausrichtung</label>
            <select
              id="ausrichtung"
              value={ausrichtung}
              onChange={e => setAusrichtung(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {AUSRICHTUNGEN.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="aufstellung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aufstellung</label>
            <select
              id="aufstellung"
              value={aufstellung}
              onChange={e => setAufstellung(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {AUFSTELLUNGEN.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jahres-Stromverbrauch (kWh)</label>
            <NummerEingabe value={stromverbrauch} onChange={setStromverbrauch} placeholder="3000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis (ct/kWh)</label>
            <NummerEingabe value={strompreis} onChange={setStrompreis} placeholder="32" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anschaffungskosten (€)</label>
            <NummerEingabe value={kosten} onChange={setKosten} placeholder="600" />
            <div className="flex gap-2 mt-1">
              {[{ l: '400 €', v: '400' }, { l: '600 €', v: '600' }, { l: '900 €', v: '900' }].map(p => (
                <button
                  key={p.v}
                  type="button"
                  onClick={() => setKosten(p.v)}
                  className={`text-xs px-2 py-0.5 rounded border transition-colors ${kosten === p.v ? 'bg-primary-100 dark:bg-primary-500/20 border-primary-300 dark:border-primary-500/40 text-primary-700 dark:text-primary-300' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Jahresertrag</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.jahresertragKwh.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">kWh</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Eigenverbrauch</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.eigenverbrauchKwh.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">kWh ({Math.round(ergebnis.eigenverbrauchQuote * 100)} %)</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Ersparnis/Jahr</p>
                <p className="text-2xl sm:text-3xl font-bold">{fmt(ergebnis.jaehrlicheErsparnis)}</p>
                <p className="text-white/60 text-xs">€</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Amortisation</p>
                <p className="text-2xl sm:text-3xl font-bold">{ergebnis.amortisationJahre.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">Jahre</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anlagenleistung</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.leistungWatt} W ({ergebnis.leistungKwp} kWp)</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Ausrichtung × Aufstellung</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{Math.round(ergebnis.ausrichtungFaktor * 100)} % × {Math.round(ergebnis.aufstellungFaktor * 100)} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Jahresertrag (gesamt)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.jahresertragKwh.toLocaleString('de-DE')} kWh</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Eigenverbrauch (30 %)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.eigenverbrauchKwh.toLocaleString('de-DE')} kWh</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Einspeisung (keine Vergütung)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.einspeisungKwh.toLocaleString('de-DE')} kWh</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Deckung des Stromverbrauchs</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.deckungsgradProzent} %</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold">
                <span className="text-gray-700 dark:text-gray-200">Gewinn über 20 Jahre</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gewinn20Jahre)} €</span>
              </div>
            </div>
          </div>

          {/* CO2 */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">🌱 CO₂-Ersparnis</p>
            <p className="text-sm text-green-700 dark:text-green-400">
              Ihre Anlage spart jährlich ca. <strong>{ergebnis.co2ErsparungKg.toLocaleString('de-DE')} kg CO₂</strong> ein — über 20 Jahre sind das {(ergebnis.co2ErsparungKg * 20 / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Tonnen.
            </p>
          </div>

          {/* Tipp */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              💡 <strong>Tipp:</strong> Stromintensive Geräte (Waschmaschine, Geschirrspüler, Trockner) tagsüber bei Sonnenschein laufen lassen. So steigt der Eigenverbrauch auf 40–50 % — und Ihre Ersparnis um bis zu 70 %.
            </p>
          </div>

          <AffiliateBox programId="check24" context="balkonsolar" />

          <CrossLink href="/wohnen/photovoltaik-rechner" emoji="☀️" text="Größere PV-Anlage planen?" />
          <CrossLink href="/wohnen/stromkosten-rechner" emoji="⚡" text="Stromkosten berechnen" />
          <CrossLink href="/wohnen/stromvergleich-rechner" emoji="🔌" text="Stromanbieter vergleichen" />

          <ErgebnisAktionen
            ergebnisText={`Balkonkraftwerk ${ergebnis.leistungWatt} W: ${ergebnis.jahresertragKwh.toLocaleString('de-DE')} kWh/Jahr, ${fmt(ergebnis.jaehrlicheErsparnis)} € Ersparnis/Jahr, Amortisation ${ergebnis.amortisationJahre} Jahre`}
            seitenTitel="Balkon-Solar-Rechner"
          />

          <AiExplain
            rechnerName="Balkon-Solar-Rechner"
            eingaben={{
              leistung: ergebnis.leistungWatt,
              ausrichtung: ergebnis.ausrichtung,
              aufstellung: ergebnis.aufstellung,
              stromverbrauch: ergebnis.stromverbrauchKwh,
              strompreis: ergebnis.strompreisCtKwh,
              anschaffungskosten: ergebnis.anschaffungskosten,
            }}
            ergebnis={{
              jahresertrag: ergebnis.jahresertragKwh,
              eigenverbrauch: ergebnis.eigenverbrauchKwh,
              ersparnis: ergebnis.jaehrlicheErsparnis,
              amortisation: ergebnis.amortisationJahre,
              gewinn20Jahre: ergebnis.gewinn20Jahre,
              co2: ergebnis.co2ErsparungKg,
            }}
          />
        </>
      )}
    </div>
  );
}
