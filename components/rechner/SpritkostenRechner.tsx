'use client';

import { useState, useMemo } from 'react';
import { berechneSpritkosten } from '@/lib/berechnungen/spritkosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function SpritkostenRechner() {
  const [strecke, setStrecke] = useState('100');
  const [verbrauch, setVerbrauch] = useState('7,5');
  const [spritpreis, setSpritpreis] = useState('1,65');
  const [hinUndZurueck, setHinUndZurueck] = useState(false);

  const nStrecke = parseDeutscheZahl(strecke);
  const nVerbrauch = parseDeutscheZahl(verbrauch);
  const nSpritpreis = parseDeutscheZahl(spritpreis);

  const ergebnis = useMemo(
    () => berechneSpritkosten({ strecke: nStrecke, verbrauch: nVerbrauch, spritpreis: nSpritpreis, hinUndZurueck }),
    [nStrecke, nVerbrauch, nSpritpreis, hinUndZurueck]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Hin und Zurück Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setHinUndZurueck(false)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            !hinUndZurueck
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Einfache Fahrt
        </button>
        <button
          onClick={() => setHinUndZurueck(true)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            hinUndZurueck
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Hin + Zurück
        </button>
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strecke</label>
          <NummerEingabe
            value={strecke}
            onChange={setStrecke}
            placeholder="z.B. 100"
            einheit="km"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verbrauch</label>
          <NummerEingabe
            value={verbrauch}
            onChange={setVerbrauch}
            placeholder="z.B. 7,5"
            einheit="L/100km"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spritpreis</label>
          <NummerEingabe
            value={spritpreis}
            onChange={setSpritpreis}
            placeholder="z.B. 1,65"
            einheit="€/L"
          />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && nStrecke > 0 && nVerbrauch > 0 && nSpritpreis > 0 && (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">
                  Gesamtkosten{hinUndZurueck ? ' (Hin + Zurück)' : ''}
                </p>
                <p className="text-5xl font-bold">{fmt(ergebnis.gesamtkosten)} €</p>
              </div>
              <div className="sm:text-right">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {fmt(ergebnis.effektiveStrecke)} km
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Aufschlüsselung</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Benzinverbrauch</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.literGesamt)} L</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kosten pro km</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.kostenProKm)} €</p>
              </div>
              <div className="bg-white dark:bg-gray-600/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gesamtstrecke</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(ergebnis.effektiveStrecke)} km</p>
              </div>
            </div>
          </div>

          {/* Vergleich bei unterschiedlichen Verbräuchen */}
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-6">
            <p className="font-semibold text-primary-700 dark:text-primary-400 text-sm mb-3">Kostenvergleich bei unterschiedlichem Verbrauch</p>
            <div className="space-y-2">
              {[5, 6, 7, 8, 9, 10, 12].map(v => {
                const kosten = (ergebnis.effektiveStrecke / 100) * v * nSpritpreis;
                const istAktuell = Math.abs(v - nVerbrauch) < 0.5;
                return (
                  <div key={v} className={`flex justify-between text-sm ${istAktuell ? 'font-bold text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400'}`}>
                    <span>{v} L/100km</span>
                    <span>{fmt(kosten)} €</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tipp */}
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4">
            <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Spartipp</p>
            <p className="text-gray-800 dark:text-gray-200 text-sm">
              Durch eine spritsparende Fahrweise (vorausschauend fahren, niedrige Drehzahlen, Reifendruck prüfen) können Sie Ihren Verbrauch um bis zu 20% senken.
              Das wären bei dieser Fahrt ca. <strong>{fmt(ergebnis.gesamtkosten * 0.2)} € Ersparnis</strong>.
            </p>
          </div>

          <CrossLink href="/auto/autokosten-rechner" emoji="🚗" text="Alle Autokosten im Blick — Wertverlust, Versicherung, Steuer & mehr" />
          <CrossLink href="/arbeit/pendlerpauschale-rechner" emoji="📋" text="Pendlerpauschale berechnen und Steuern sparen" />

          <ErgebnisAktionen
            ergebnisText={`${fmt(ergebnis.effektiveStrecke)} km, ${fmt(ergebnis.literGesamt)} L Verbrauch, Gesamtkosten: ${fmt(ergebnis.gesamtkosten)} €`}
            seitenTitel="Spritkosten-Rechner"
          />
          <AiExplain
            rechnerName="Spritkosten-Rechner"
            eingaben={{ streckeKm: nStrecke, verbrauchLPro100km: nVerbrauch, spritpreisEuroProL: nSpritpreis, hinUndZurueck }}
            ergebnis={{ gesamtkostenEuro: ergebnis.gesamtkosten, literGesamt: ergebnis.literGesamt, kostenProKm: ergebnis.kostenProKm, effektiveStreckeKm: ergebnis.effektiveStrecke }}
          />

          <AffiliateBox programId="check24" context="spritkosten" variant="compact" />
        </>
      )}
    </div>
  );
}
