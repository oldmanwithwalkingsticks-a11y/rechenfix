'use client';

import { useState, useMemo } from 'react';
import { berechneHandykosten } from '@/lib/berechnungen/handykosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

const LAUFZEITEN = [
  { value: 1, label: 'Monatlich kündbar' },
  { value: 12, label: '12 Monate' },
  { value: 24, label: '24 Monate' },
];

export default function HandykostenRechner() {
  const [tarifpreis, setTarifpreis] = useState('15');
  const [laufzeit, setLaufzeit] = useState(1);
  const [geraetepreis, setGeraetepreis] = useState('0');
  const [hatRaten, setHatRaten] = useState(false);
  const [monatlicheRate, setMonatlicheRate] = useState('');
  const [zusatzoptionen, setZusatzoptionen] = useState('0');
  const [datenvolumen, setDatenvolumen] = useState('10');
  const [aktuellerAnbieter, setAktuellerAnbieter] = useState('');

  const ergebnis = useMemo(() => {
    const tp = parseDeutscheZahl(tarifpreis);
    if (tp <= 0) return null;
    return berechneHandykosten({
      tarifpreis: tp,
      vertragslaufzeit: laufzeit,
      geraetepreis: parseDeutscheZahl(geraetepreis),
      hatRaten,
      monatlicheRate: parseDeutscheZahl(monatlicheRate),
      zusatzoptionen: parseDeutscheZahl(zusatzoptionen),
      datenvolumen: parseDeutscheZahl(datenvolumen),
      aktuellerAnbieter: parseDeutscheZahl(aktuellerAnbieter),
    });
  }, [tarifpreis, laufzeit, geraetepreis, hatRaten, monatlicheRate, zusatzoptionen, datenvolumen, aktuellerAnbieter]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Tarifpreis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Monatlicher Tarifpreis
          </label>
          <NummerEingabe value={tarifpreis} onChange={setTarifpreis} einheit="€" placeholder="z.B. 15" />
        </div>

        {/* Vertragslaufzeit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vertragslaufzeit
          </label>
          <div className="flex gap-2">
            {LAUFZEITEN.map(l => (
              <button
                key={l.value}
                onClick={() => setLaufzeit(l.value)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  laufzeit === l.value
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gerätepreis + Raten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Einmaliger Gerätepreis
            </label>
            <NummerEingabe value={geraetepreis} onChange={setGeraetepreis} einheit="€" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ratenzahlung?
            </label>
            <div className="flex items-center gap-3 h-[48px]">
              <button
                onClick={() => setHatRaten(!hatRaten)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                  hatRaten ? 'bg-green-500' : 'bg-red-400'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                  hatRaten ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {hatRaten ? 'Ja — monatliche Rate' : 'Nein — Einmalkauf'}
              </span>
            </div>
          </div>
        </div>

        {/* Monatliche Rate (nur bei Ratenzahlung) */}
        {hatRaten && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monatliche Rate für Gerät
            </label>
            <NummerEingabe value={monatlicheRate} onChange={setMonatlicheRate} einheit="€" placeholder="z.B. 25" />
          </div>
        )}

        {/* Zusatzoptionen + Datenvolumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zusatzoptionen pro Monat
            </label>
            <NummerEingabe value={zusatzoptionen} onChange={setZusatzoptionen} einheit="€" placeholder="0" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">z.B. Auslandsflatrate, Cloud-Speicher</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Datenvolumen
            </label>
            <NummerEingabe value={datenvolumen} onChange={setDatenvolumen} einheit="GB" placeholder="10" />
          </div>
        </div>

        {/* Vergleich mit aktuellem Anbieter */}
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Aktueller Anbieter — Kosten pro Monat <span className="text-gray-400 font-normal">(optional, zum Vergleich)</span>
          </label>
          <NummerEingabe value={aktuellerAnbieter} onChange={setAktuellerAnbieter} einheit="€" placeholder="z.B. 30" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Effektive Monatskosten</p>
            <p className="text-5xl font-bold">{fmt(ergebnis.effektiveMonatskosten)} <span className="text-2xl">€</span></p>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jahreskosten</p>
                <p className="text-lg font-bold">{fmt(ergebnis.jahreskosten)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Gesamtkosten ({laufzeit === 1 ? '1 Mon.' : `${laufzeit} Mon.`})</p>
                <p className="text-lg font-bold">{fmt(ergebnis.gesamtkosten)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Kosten pro GB</p>
                <p className="text-lg font-bold">{fmt(ergebnis.kostenProGb)} €</p>
              </div>
            </div>
          </div>

          {/* Vergleich mit aktuellem Anbieter */}
          {ergebnis.istGuenstiger !== null && ergebnis.ersparnisMontlich !== null && ergebnis.ersparnisJaehrlich !== null && (
            <div className={`rounded-xl p-4 mb-4 border ${
              ergebnis.istGuenstiger
                ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{ergebnis.istGuenstiger ? '✅' : '⚠️'}</span>
                <p className={`font-bold text-sm ${
                  ergebnis.istGuenstiger
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {ergebnis.istGuenstiger
                    ? `${fmt(Math.abs(ergebnis.ersparnisMontlich))} € günstiger pro Monat`
                    : `${fmt(Math.abs(ergebnis.ersparnisMontlich))} € teurer pro Monat`
                  }
                </p>
              </div>
              <p className={`text-sm ${
                ergebnis.istGuenstiger ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
              }`}>
                {ergebnis.istGuenstiger
                  ? `Sie sparen ${fmt(Math.abs(ergebnis.ersparnisJaehrlich))} € pro Jahr im Vergleich zu Ihrem aktuellen Tarif.`
                  : `Das sind ${fmt(Math.abs(ergebnis.ersparnisJaehrlich))} € mehr pro Jahr als Ihr aktueller Tarif.`
                }
              </p>
            </div>
          )}

          {/* Aufschlüsselung als Balkendiagramm */}
          {ergebnis.aufschluesselung.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Kostenaufschlüsselung pro Monat</p>
              <div className="space-y-3">
                {ergebnis.aufschluesselung.map((pos) => {
                  const prozent = ergebnis.effektiveMonatskosten > 0
                    ? (pos.betrag / ergebnis.effektiveMonatskosten) * 100
                    : 0;
                  return (
                    <div key={pos.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {fmt(pos.betrag)} € <span className="text-gray-400 text-xs">({prozent.toFixed(0)}%)</span>
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${pos.farbe}`}
                          style={{ width: `${Math.max(prozent, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-sm font-bold">
                <span className="text-gray-800 dark:text-gray-100">Gesamt</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.effektiveMonatskosten)} €</span>
              </div>
            </div>
          )}

          {/* Vergleichstabelle: Typische Handykosten */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Typische Handykosten in Deutschland 2026</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Tarifart</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 dark:text-gray-400 font-medium">Kosten/Monat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['Prepaid (Basis)', '5–10 €'],
                    ['Allnet-Flat (5 GB)', '10–15 €'],
                    ['Allnet-Flat (15 GB)', '15–25 €'],
                    ['Allnet-Flat (unbegrenzt)', '30–45 €'],
                    ['Vertrag mit Gerät', '35–65 €'],
                    ['Ihr Tarif', `${fmt(ergebnis.effektiveMonatskosten)} €`],
                  ].map(([tarifart, kosten], i) => {
                    const istEigener = i === 5;
                    return (
                      <tr key={tarifart} className={istEigener ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''}>
                        <td className={`px-4 py-2.5 ${istEigener ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400'}`}>
                          {tarifart} {istEigener && '←'}
                        </td>
                        <td className={`px-4 py-2.5 text-right ${istEigener ? 'font-bold text-primary-700 dark:text-primary-300' : 'font-medium text-gray-800 dark:text-gray-200'}`}>
                          {kosten}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Handykosten: ${fmt(ergebnis.effektiveMonatskosten)} €/Monat, ${fmt(ergebnis.jahreskosten)} €/Jahr (${fmt(ergebnis.kostenProGb)} €/GB)`}
            seitenTitel="Handykosten-Rechner"
          />

          <AffiliateBox programId="congstar" context="handykosten" />

          <AiExplain
            rechnerName="Handykosten-Rechner"
            eingaben={{
              tarifpreisEuro: parseDeutscheZahl(tarifpreis),
              vertragslaufzeitMonate: laufzeit,
              geraetepreisEuro: parseDeutscheZahl(geraetepreis),
              ratenzahlung: hatRaten,
              monatlicheRateEuro: hatRaten ? parseDeutscheZahl(monatlicheRate) : 0,
              zusatzoptionenEuro: parseDeutscheZahl(zusatzoptionen),
              datenvolumenGb: parseDeutscheZahl(datenvolumen),
            }}
            ergebnis={{
              effektiveMonatskostenEuro: ergebnis.effektiveMonatskosten,
              jahreskostenEuro: ergebnis.jahreskosten,
              gesamtkostenEuro: ergebnis.gesamtkosten,
              kostenProGbEuro: ergebnis.kostenProGb,
            }}
          />
        </>
      )}
    </div>
  );
}
