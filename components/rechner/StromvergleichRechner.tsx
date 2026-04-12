'use client';

import { useState, useMemo } from 'react';
import { berechneStromvergleich, HAUSHALTSGROESSEN } from '@/lib/berechnungen/stromvergleich';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

export default function StromvergleichRechner() {
  const [verbrauch, setVerbrauch] = useState('2500');
  const [arbeitspreis, setArbeitspreis] = useState('32');
  const [grundpreis, setGrundpreis] = useState('10');
  const [oekostrom, setOekostrom] = useState(false);
  const [ausgewaehlteGroesse, setAusgewaehlteGroesse] = useState(1);

  const handleGroesseClick = (index: number, v: number) => {
    setAusgewaehlteGroesse(index);
    setVerbrauch(String(v));
  };

  const ergebnis = useMemo(() => {
    const v = parseDeutscheZahl(verbrauch);
    if (v <= 0) return null;
    return berechneStromvergleich({
      verbrauchKwh: v,
      arbeitspreisCtKwh: parseDeutscheZahl(arbeitspreis),
      grundpreisMonat: parseDeutscheZahl(grundpreis),
      oekostrom,
    });
  }, [verbrauch, arbeitspreis, grundpreis, oekostrom]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Haushaltsgröße Quick-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Haushaltsgröße (Richtwert)
          </label>
          <div className="flex flex-wrap gap-2">
            {HAUSHALTSGROESSEN.map((h, i) => (
              <button
                key={h.label}
                onClick={() => handleGroesseClick(i, h.verbrauch)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  ausgewaehlteGroesse === i
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Klicken Sie auf eine Haushaltsgröße oder geben Sie Ihren Verbrauch manuell ein
          </p>
        </div>

        {/* Verbrauch + Ökostrom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jahresverbrauch
            </label>
            <NummerEingabe value={verbrauch} onChange={(v) => { setVerbrauch(v); setAusgewaehlteGroesse(-1); }} einheit="kWh" placeholder="z.B. 2.500" />
          </div>
          <div className="flex items-end pb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOekostrom(!oekostrom)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                  oekostrom ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                  oekostrom ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Ökostrom bevorzugt
              </span>
            </div>
          </div>
        </div>

        {/* Arbeitspreis + Grundpreis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Aktueller Arbeitspreis
            </label>
            <NummerEingabe value={arbeitspreis} onChange={setArbeitspreis} einheit="ct/kWh" placeholder="z.B. 32" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Aktueller Grundpreis
            </label>
            <NummerEingabe value={grundpreis} onChange={setGrundpreis} einheit="€/Monat" placeholder="z.B. 10" />
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Ihre jährlichen Stromkosten</p>
            <p className="text-5xl font-bold">
              {fmt(ergebnis.aktuell.jahreskosten)} <span className="text-2xl">€/Jahr</span>
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Pro Monat</p>
                <p className="text-lg font-bold">{fmt(ergebnis.aktuell.monatskosten)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Kosten pro kWh</p>
                <p className="text-lg font-bold">{fmt(ergebnis.kostenProKwh)} ct</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Sparpotenzial/Jahr</p>
                <p className="text-lg font-bold">{fmt(ergebnis.sparpotenzialJahr)} €</p>
              </div>
            </div>
          </div>

          {/* Sparpotenzial Box */}
          {ergebnis.sparpotenzialJahr > 20 ? (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Sparpotenzial erkannt!</strong> Sie könnten durch einen Anbieterwechsel bis zu <strong>{fmt(ergebnis.sparpotenzialJahr)} € pro Jahr</strong> sparen ({fmt(ergebnis.sparpotenzialMonat)} € pro Monat). Ein Vergleich lohnt sich!
              </p>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Guter Tarif!</strong> Ihr aktueller Stromtarif liegt im günstigen Bereich. Ein Wechsel würde aktuell kaum Ersparnis bringen.
              </p>
            </div>
          )}

          {/* Tarifvergleich Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tarifvergleich</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {[ergebnis.aktuell, ergebnis.durchschnitt, ergebnis.guenstigster].map((tarif) => (
                <div key={tarif.label} className="flex justify-between items-center px-4 py-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tarif.label}</span>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {fmt(tarif.arbeitspreisCtKwh)} ct/kWh + {fmt(tarif.grundpreisMonat)} €/Monat
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{fmt(tarif.jahreskosten)} €/Jahr</span>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{fmt(tarif.monatskosten)} €/Monat</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Balkenvergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Kostenvergleich (Jahreskosten)</p>
            {[ergebnis.aktuell, ergebnis.durchschnitt, ergebnis.guenstigster].map((tarif) => {
              const maxKosten = Math.max(ergebnis.aktuell.jahreskosten, ergebnis.durchschnitt.jahreskosten, ergebnis.guenstigster.jahreskosten);
              const breite = maxKosten > 0 ? (tarif.jahreskosten / maxKosten) * 100 : 0;
              const farbe = tarif === ergebnis.guenstigster
                ? 'bg-green-500'
                : tarif === ergebnis.aktuell
                  ? 'bg-primary-500'
                  : 'bg-amber-500';
              return (
                <div key={tarif.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>{tarif.label}</span>
                    <span className="font-medium">{fmt(tarif.jahreskosten)} €</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className={`${farbe} h-4 rounded-full transition-all duration-500`}
                      style={{ width: `${breite}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stromkosten-Vergleich nach Haushaltsgröße */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Typische Stromkosten nach Haushaltsgröße</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {HAUSHALTSGROESSEN.map(h => {
                const typKosten = (h.verbrauch * 32 / 100) + (10 * 12);
                return (
                  <div key={h.label} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{h.label} ({h.verbrauch.toLocaleString('de-DE')} kWh)</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">ca. {fmt(typKosten)} €/Jahr</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Die Vergleichswerte basieren auf Durchschnittspreisen des deutschen Strommarkts 2026. Tatsächliche Tarife können je nach Region, Anbieter und Vertragsbedingungen abweichen. Für ein verbindliches Angebot nutzen Sie einen Stromvergleichsrechner mit PLZ-Suche.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`Stromkosten: ${fmt(ergebnis.aktuell.jahreskosten)} €/Jahr (${fmt(ergebnis.aktuell.monatskosten)} €/Monat). Sparpotenzial: ${fmt(ergebnis.sparpotenzialJahr)} €/Jahr.`}
            seitenTitel="Stromvergleich-Rechner"
          />

          <AffiliateBox programId="check24" context="stromvergleich" variant="full" />

          <AiExplain
            rechnerName="Stromvergleich-Rechner"
            eingaben={{
              verbrauchKwh: parseDeutscheZahl(verbrauch),
              arbeitspreisCtKwh: parseDeutscheZahl(arbeitspreis),
              grundpreisEuroMonat: parseDeutscheZahl(grundpreis),
              oekostrom,
            }}
            ergebnis={{
              jahreskostenEuro: ergebnis.aktuell.jahreskosten,
              monatskostenEuro: ergebnis.aktuell.monatskosten,
              sparpotenzialEuroJahr: ergebnis.sparpotenzialJahr,
              kostenProKwhCt: ergebnis.kostenProKwh,
            }}
          />
        </>
      )}
    </div>
  );
}
