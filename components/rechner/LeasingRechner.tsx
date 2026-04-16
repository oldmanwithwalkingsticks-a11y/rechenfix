'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

export default function LeasingRechner() {
  const [listenpreis, setListenpreis] = useState('35000');
  const [faktorModus, setFaktorModus] = useState<'faktor' | 'rate'>('faktor');
  const [leasingfaktor, setLeasingfaktor] = useState('0,85');
  const [leasingrateDirekt, setLeasingrateDirekt] = useState('297');
  const [anzahlung, setAnzahlung] = useState('0');
  const [laufzeit, setLaufzeit] = useState('36');
  const [kmProJahr, setKmProJahr] = useState('15000');
  const [mehrKmSatz, setMehrKmSatz] = useState('0,08');

  const [vergleich, setVergleich] = useState(false);
  const [kaufpreis, setKaufpreis] = useState('35000');
  const [zins, setZins] = useState('4,9');
  const [restwert, setRestwert] = useState('18000');

  const ergebnis = useMemo(() => {
    const lp = parseDeutscheZahl(listenpreis);
    const az = parseDeutscheZahl(anzahlung);
    const lzM = parseInt(laufzeit, 10) || 36;
    const lzJ = lzM / 12;
    const faktor = parseDeutscheZahl(leasingfaktor);
    const rateDirekt = parseDeutscheZahl(leasingrateDirekt);
    const km = parseDeutscheZahl(kmProJahr);
    const satz = parseDeutscheZahl(mehrKmSatz);

    const netto = faktorModus === 'faktor' ? ((lp - az) * faktor) / 100 : rateDirekt / 1.19;
    const brutto = netto * 1.19;
    const leasingrate = faktorModus === 'faktor' ? brutto : rateDirekt;

    const summeRaten = leasingrate * lzM;
    const gesamt = az + summeRaten;
    const kostenProMonat = gesamt / lzM;
    const gesamtKm = km * lzJ;
    const kostenProKm = gesamtKm > 0 ? gesamt / gesamtKm : 0;

    // Vergleich Finanzierung
    const kp = parseDeutscheZahl(kaufpreis);
    const z = parseDeutscheZahl(zins) / 100 / 12;
    const n = lzM;
    const finRate = z > 0 ? (kp * (z * Math.pow(1 + z, n))) / (Math.pow(1 + z, n) - 1) : kp / n;
    const finSumme = finRate * n;
    const rw = parseDeutscheZahl(restwert);
    const finEffektiv = finSumme - rw;

    const differenz = finEffektiv - gesamt;

    // Mehr-km-Risiko (Beispiel: +5000 km/Jahr)
    const mehrKmBeispiel = 5000;
    const mehrKosten = mehrKmBeispiel * lzJ * satz;

    return {
      leasingrate, summeRaten, gesamt, kostenProMonat, kostenProKm,
      finRate, finSumme, finEffektiv, differenz, mehrKmBeispiel, mehrKosten,
      lzM, lzJ, rw,
    };
  }, [listenpreis, faktorModus, leasingfaktor, leasingrateDirekt, anzahlung, laufzeit, kmProJahr, mehrKmSatz, kaufpreis, zins, restwert]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmt2 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingaben */}
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Listenpreis (Brutto)</label>
          <NummerEingabe value={listenpreis} onChange={setListenpreis} einheit="€" />
        </div>

        <div>
          <RadioToggleGroup
            name="leasing-modus"
            legend="Berechnungsart"
            options={[
              { value: 'faktor', label: 'Über Leasingfaktor' },
              { value: 'rate', label: 'Rate direkt' },
            ]}
            value={faktorModus}
            onChange={(v) => setFaktorModus(v as 'faktor' | 'rate')}
          />
        </div>

        {faktorModus === 'faktor' ? (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Leasingfaktor</label>
            <NummerEingabe value={leasingfaktor} onChange={setLeasingfaktor} einheit="%" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Typisch 0,6–1,2 %. Niedriger = günstiger. Steht im Leasingangebot.</p>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Leasingrate (Brutto)</label>
            <NummerEingabe value={leasingrateDirekt} onChange={setLeasingrateDirekt} einheit="€/Monat" />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Anzahlung / Sonderzahlung</label>
          <NummerEingabe value={anzahlung} onChange={setAnzahlung} einheit="€" />
        </div>

        <div>
          <label htmlFor="leasing-select-1" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Laufzeit</label>
          <select id="leasing-select-1"
            value={laufzeit}
            onChange={e => setLaufzeit(e.target.value)}
            className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="24">24 Monate</option>
            <option value="36">36 Monate</option>
            <option value="48">48 Monate</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Kilometer pro Jahr</label>
          <NummerEingabe value={kmProJahr} onChange={setKmProJahr} einheit="km" />
          <div className="flex gap-2 mt-2">
            {['10000', '15000', '20000'].map(v => (
              <button key={v} onClick={() => setKmProJahr(v)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-500/20">
                {parseInt(v).toLocaleString('de-DE')} km
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Mehr-/Minderkilometer-Satz</label>
          <NummerEingabe value={mehrKmSatz} onChange={setMehrKmSatz} einheit="€/km" />
        </div>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Monatliche Leasingrate</p>
        <p className="text-5xl font-bold">{fmt2(ergebnis.leasingrate)} €</p>
        <p className="text-white/80 text-sm mt-1">Gesamtkosten: {fmt(ergebnis.gesamt)} € · {fmt2(ergebnis.kostenProKm * 100)} ct/km</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Aufschlüsselung</h2>
        <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between"><span>Anzahlung</span><span className="tabular-nums">{fmt(parseDeutscheZahl(anzahlung))} €</span></div>
          <div className="flex justify-between"><span>Monatliche Rate</span><span className="tabular-nums">{fmt2(ergebnis.leasingrate)} €</span></div>
          <div className="flex justify-between"><span>Summe aller Raten</span><span className="tabular-nums">{fmt(ergebnis.summeRaten)} €</span></div>
          <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-1.5"><span>Gesamtkosten</span><span className="tabular-nums">{fmt(ergebnis.gesamt)} €</span></div>
          <div className="flex justify-between"><span>Kosten pro km</span><span className="tabular-nums">{fmt2(ergebnis.kostenProKm * 100)} ct</span></div>
        </div>
      </div>

      {/* Vergleich */}
      <div className="mb-6">
        <button
          onClick={() => setVergleich(!vergleich)}
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          {vergleich ? '− Vergleich mit Finanzierung ausblenden' : '+ Vergleich mit Finanzierung anzeigen'}
        </button>
      </div>

      {vergleich && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Leasing vs. Finanzierung</h2>
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Kaufpreis (Finanzierung)</label>
              <NummerEingabe value={kaufpreis} onChange={setKaufpreis} einheit="€" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Finanzierungszins</label>
              <NummerEingabe value={zins} onChange={setZins} einheit="%" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Geschätzter Restwert nach Laufzeit</label>
              <NummerEingabe value={restwert} onChange={setRestwert} einheit="€" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  <th className="px-3 py-2 text-left">Position</th>
                  <th className="px-3 py-2 text-right">Leasing</th>
                  <th className="px-3 py-2 text-right">Finanzierung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Monatliche Rate</td><td className="px-3 py-2 text-right tabular-nums">{fmt2(ergebnis.leasingrate)} €</td><td className="px-3 py-2 text-right tabular-nums">{fmt2(ergebnis.finRate)} €</td></tr>
                <tr><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Summe Raten</td><td className="px-3 py-2 text-right tabular-nums">{fmt(ergebnis.summeRaten)} €</td><td className="px-3 py-2 text-right tabular-nums">{fmt(ergebnis.finSumme)} €</td></tr>
                <tr><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Auto gehört Ihnen?</td><td className="px-3 py-2 text-right">Nein</td><td className="px-3 py-2 text-right">Ja ({fmt(ergebnis.rw)} €)</td></tr>
                <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold"><td className="px-3 py-2 text-blue-800 dark:text-blue-300">Effektive Kosten</td><td className="px-3 py-2 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmt(ergebnis.gesamt)} €</td><td className="px-3 py-2 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmt(ergebnis.finEffektiv)} €</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
            <strong>{ergebnis.differenz > 0 ? 'Leasing' : 'Finanzierung'}</strong> ist {fmt(Math.abs(ergebnis.differenz))} € günstiger.
          </p>
        </div>
      )}

      {/* Km-Risiko */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Km-Risiko:</strong> Bei {ergebnis.mehrKmBeispiel.toLocaleString('de-DE')} km mehr pro Jahr als vereinbart: Nachzahlung ca. <strong>{fmt(ergebnis.mehrKosten)} €</strong> über die gesamte Laufzeit. Leasingkosten sind Nettokosten (zzgl. MwSt). Gewerbetreibende können Leasingraten steuerlich absetzen.
        </p>
      </div>

      <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Autokosten berechnen" />
      <CrossLink href="/finanzen/kreditrechner" emoji="💳" text="Alternative: Autokredit" />
      <CrossLink href="/auto/kfz-steuer-rechner" emoji="🧾" text="Kfz-Steuer berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Leasingrate: ${fmt2(ergebnis.leasingrate)} €/Monat · Gesamtkosten ${fmt(ergebnis.gesamt)} € (${laufzeit} Monate)`}
        seitenTitel="Leasing-Rechner"
      />

      <AffiliateBox programId="check24" context="leasing" />

      <AiExplain
        rechnerName="Leasing-Rechner"
        eingaben={{
          Listenpreis: `${fmt(parseDeutscheZahl(listenpreis))} €`,
          Leasingfaktor: faktorModus === 'faktor' ? `${leasingfaktor} %` : 'Rate direkt',
          Anzahlung: `${fmt(parseDeutscheZahl(anzahlung))} €`,
          Laufzeit: `${laufzeit} Monate`,
          'km pro Jahr': `${fmt(parseDeutscheZahl(kmProJahr))} km`,
        }}
        ergebnis={{
          Leasingrate: `${fmt2(ergebnis.leasingrate)} €/Monat`,
          Gesamtkosten: `${fmt(ergebnis.gesamt)} €`,
          'Kosten pro km': `${fmt2(ergebnis.kostenProKm * 100)} ct`,
        }}
      />
    </div>
  );
}
