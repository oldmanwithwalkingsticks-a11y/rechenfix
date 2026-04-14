'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function SkontoRechner() {
  const [betrag, setBetrag] = useState('5000');
  const [skontosatz, setSkontosatz] = useState('2');
  const [skontofrist, setSkontofrist] = useState('10');
  const [zahlungsziel, setZahlungsziel] = useState('30');

  const ergebnis = useMemo(() => {
    const b = parseDeutscheZahl(betrag);
    const s = parseDeutscheZahl(skontosatz);
    const sf = parseDeutscheZahl(skontofrist);
    const zz = parseDeutscheZahl(zahlungsziel);

    const skontoBetrag = (b * s) / 100;
    const zahlbetrag = b - skontoBetrag;

    const tageDiff = Math.max(1, zz - sf);
    const effJahreszins = s < 100 ? (s / (100 - s)) * (360 / tageDiff) * 100 : 0;

    // Vergleich Kontokorrentkredit 10%
    const kreditKostenZeitraum = (b * 0.1 * tageDiff) / 360;
    const ersparnisVsKredit = skontoBetrag - kreditKostenZeitraum;

    return { skontoBetrag, zahlbetrag, tageDiff, effJahreszins, kreditKostenZeitraum, ersparnisVsKredit };
  }, [betrag, skontosatz, skontofrist, zahlungsziel]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt1 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Rechnungsbetrag</label>
          <NummerEingabe value={betrag} onChange={setBetrag} einheit="€" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Skontosatz</label>
          <NummerEingabe value={skontosatz} onChange={setSkontosatz} einheit="%" />
          <div className="flex gap-2 mt-2">
            {['2', '3', '5'].map(v => (
              <button key={v} onClick={() => setSkontosatz(v)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-500/20">
                {v} %
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Skontofrist</label>
          <NummerEingabe value={skontofrist} onChange={setSkontofrist} einheit="Tage" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Zahlungsziel</label>
          <NummerEingabe value={zahlungsziel} onChange={setZahlungsziel} einheit="Tage" />
        </div>
      </div>

      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Ersparnis durch Skonto</p>
        <p className="text-5xl font-bold">{fmt(ergebnis.skontoBetrag)} €</p>
        <p className="text-white/80 text-sm mt-1">Zahlbetrag mit Skonto: {fmt(ergebnis.zahlbetrag)} €</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Detail</h3>
        <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between"><span>Zahlbetrag mit Skonto (bis Tag {skontofrist})</span><span className="tabular-nums">{fmt(ergebnis.zahlbetrag)} €</span></div>
          <div className="flex justify-between"><span>Zahlbetrag ohne Skonto (bis Tag {zahlungsziel})</span><span className="tabular-nums">{fmt(parseDeutscheZahl(betrag))} €</span></div>
          <div className="flex justify-between font-bold text-red-700 dark:text-red-400 border-t border-gray-200 dark:border-gray-700 pt-1.5">
            <span>Effektiver Jahreszins</span>
            <span className="tabular-nums">{fmt1(ergebnis.effJahreszins)} %</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6">
        <p className="text-green-800 dark:text-green-300 text-sm">
          <strong>✅ Skonto nutzen ist fast immer lohnenswert.</strong>
        </p>
        <p className="text-green-800 dark:text-green-300 text-xs mt-1">
          Der effektive Jahreszins von <strong>{fmt1(ergebnis.effJahreszins)} %</strong> bedeutet: Nicht-Nutzen des Skontos entspricht einem Kredit zu diesem Zinssatz. Selbst bei einem Kontokorrentkredit zu ~10 % wäre die Skonto-Nutzung <strong>{fmt(Math.max(0, ergebnis.ersparnisVsKredit))} €</strong> günstiger als der Kredit.
        </p>
      </div>

      <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="MwSt berechnen" />
      <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozent berechnen" />
      <CrossLink href="/finanzen/kreditrechner" emoji="💳" text="Kredit-Vergleich" />

      <ErgebnisAktionen
        ergebnisText={`Skonto-Ersparnis: ${fmt(ergebnis.skontoBetrag)} € · Zahlbetrag ${fmt(ergebnis.zahlbetrag)} € · Eff. Jahreszins ${fmt1(ergebnis.effJahreszins)} %`}
        seitenTitel="Skontorechner"
      />

      <AffiliateBox programId="lexware" context="skonto" />

      <AiExplain
        rechnerName="Skontorechner"
        eingaben={{
          Rechnungsbetrag: `${fmt(parseDeutscheZahl(betrag))} €`,
          Skontosatz: `${skontosatz} %`,
          Skontofrist: `${skontofrist} Tage`,
          Zahlungsziel: `${zahlungsziel} Tage`,
        }}
        ergebnis={{
          Ersparnis: `${fmt(ergebnis.skontoBetrag)} €`,
          Zahlbetrag: `${fmt(ergebnis.zahlbetrag)} €`,
          'Effektiver Jahreszins': `${fmt1(ergebnis.effJahreszins)} %`,
        }}
      />
    </div>
  );
}
