'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Art = 'trennung' | 'nachehelich';

// Selbstbehalt 2026 (Düsseldorfer Tabelle)
// Trennungsunterhalt gegenüber Ehegatten: 1.600 € (erwerbstätig)
// Nachehelicher Unterhalt gegenüber geschiedenem Ehegatten: 1.475 €
const SELBSTBEHALT: Record<Art, number> = {
  trennung: 1600,
  nachehelich: 1475,
};

// Erwerbstätigenbonus: 1/10 wird vor der 3/7-Methode vom Erwerbseinkommen abgezogen
// Damit ergibt sich faktisch die gängige Quote. Wir verwenden die klassische 3/7-Differenzmethode.

export default function EhegattenunterhaltRechner() {
  const [art, setArt] = useState<Art>('trennung');
  const [netto1, setNetto1] = useState<string>('3500');
  const [netto2, setNetto2] = useState<string>('1200');
  const [kuBeruecksichtigt, setKuBeruecksichtigt] = useState<boolean>(false);
  const [kindesunterhalt, setKindesunterhalt] = useState<string>('400');

  const result = useMemo(() => {
    const n1 = parseDeutscheZahl(netto1) || 0;
    const n2 = parseDeutscheZahl(netto2) || 0;
    const ku = kuBeruecksichtigt ? 0 : (parseDeutscheZahl(kindesunterhalt) || 0);

    const bereinigt1 = Math.max(0, n1 - ku);
    const differenz = bereinigt1 - n2;
    const berechnet = Math.max(0, Math.round((differenz * 3) / 7));

    const selbstbehalt = SELBSTBEHALT[art];
    const maxUnterhalt = Math.max(0, bereinigt1 - selbstbehalt);
    const unterhalt = Math.min(berechnet, maxUnterhalt);

    const rest1 = bereinigt1 - unterhalt;
    const gesamt2 = n2 + unterhalt;
    const gekappt = berechnet > maxUnterhalt;

    return {
      n1,
      n2,
      ku,
      bereinigt1,
      differenz,
      berechnet,
      unterhalt,
      rest1,
      gesamt2,
      selbstbehalt,
      gekappt,
    };
  }, [netto1, netto2, kuBeruecksichtigt, kindesunterhalt, art]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const ergebnis =
    `Ehegattenunterhalt (${art === 'trennung' ? 'Trennungsunterhalt' : 'Nachehelicher Unterhalt'}): ${fmtEuro(result.unterhalt)} / Monat. ` +
    `Einkommen P1 nach Unterhalt: ${fmtEuro(result.rest1)}. Einkommen P2 mit Unterhalt: ${fmtEuro(result.gesamt2)}.`;

  return (
    <div>
      {/* Art */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Art des Unterhalts</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { key: 'trennung', label: 'Trennungsunterhalt' },
            { key: 'nachehelich', label: 'Nachehelicher Unterhalt' },
          ] as const).map(o => (
            <button
              key={o.key}
              onClick={() => setArt(o.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                art === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Einkommen */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bereinigtes Nettoeinkommen Partner 1 (höherverdienend)
        </label>
        <NummerEingabe value={netto1} onChange={setNetto1} placeholder="3500" einheit="€/Monat" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bereinigtes Nettoeinkommen Partner 2
        </label>
        <NummerEingabe value={netto2} onChange={setNetto2} placeholder="1200" einheit="€/Monat" />
      </div>

      {/* Kindesunterhalt */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kindesunterhalt bereits im Netto berücksichtigt?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { key: true, label: 'Ja' },
            { key: false, label: 'Nein' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setKuBeruecksichtigt(o.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                kuBeruecksichtigt === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {!kuBeruecksichtigt && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zu zahlender Kindesunterhalt (wird vom Einkommen P1 abgezogen)
          </label>
          <NummerEingabe value={kindesunterhalt} onChange={setKindesunterhalt} placeholder="400" einheit="€/Monat" />
        </div>
      )}

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <p className="text-white/90 text-sm mb-1">Monatlicher Ehegattenunterhalt</p>
        <p className="text-4xl font-bold text-white mb-3">{fmtEuro(result.unterhalt)}</p>
        <div className="grid grid-cols-2 gap-3 text-white text-sm">
          <div>
            <p className="opacity-80 text-xs">Partner 1 nach Unterhalt</p>
            <p className="text-lg font-semibold">{fmtEuro(result.rest1)}</p>
          </div>
          <div>
            <p className="opacity-80 text-xs">Partner 2 mit Unterhalt</p>
            <p className="text-lg font-semibold">{fmtEuro(result.gesamt2)}</p>
          </div>
        </div>
        <p className="mt-3 text-white/90 text-xs">
          Selbstbehalt ({art === 'trennung' ? 'Trennungsunterhalt' : 'nachehelich'}): {fmtEuro(result.selbstbehalt)}
        </p>
      </div>

      {/* Rechenweg */}
      <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rechenweg (3/7-Methode)</p>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>1. Nettoeinkommen P1: {fmtEuro(result.n1)}</li>
          {!kuBeruecksichtigt && result.ku > 0 && (
            <li>2. − Kindesunterhalt: {fmtEuro(result.ku)} → bereinigt: {fmtEuro(result.bereinigt1)}</li>
          )}
          <li>3. Nettoeinkommen P2: {fmtEuro(result.n2)}</li>
          <li>4. Differenz: {fmtEuro(result.bereinigt1)} − {fmtEuro(result.n2)} = {fmtEuro(result.differenz)}</li>
          <li>5. Unterhalt = 3/7 × Differenz = {fmtEuro(result.berechnet)}</li>
          {result.gekappt && (
            <li className="text-amber-700 dark:text-amber-400">
              ⚠ Wegen Selbstbehalt gekappt auf {fmtEuro(result.unterhalt)}
            </li>
          )}
        </ul>
      </div>

      <CrossLink href="/arbeit/unterhaltsrechner" emoji="👨‍👩‍👧" text="Unterhaltsrechner: Kindesunterhalt nach Düsseldorfer Tabelle" />
      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten-Rechner: Anwalts- und Gerichtskosten" />
      <CrossLink href="/arbeit/zugewinnausgleich-rechner" emoji="💶" text="Zugewinnausgleich: Vermögensausgleich berechnen" />

      <ErgebnisAktionen ergebnisText={ergebnis} seitenTitel="Ehegattenunterhalt-Rechner" />
      <AiExplain
        rechnerName="Ehegattenunterhalt-Rechner"
        eingaben={{
          Art: art === 'trennung' ? 'Trennungsunterhalt' : 'Nachehelicher Unterhalt',
          'Netto P1': `${result.n1} €`,
          'Netto P2': `${result.n2} €`,
          Kindesunterhalt: kuBeruecksichtigt ? 'bereits berücksichtigt' : `${result.ku} €`,
        }}
        ergebnis={{
          Ehegattenunterhalt: `${result.unterhalt} €/Monat`,
          'Differenz × 3/7': `${result.berechnet} €`,
          'P1 nach Unterhalt': `${result.rest1} €`,
          'P2 mit Unterhalt': `${result.gesamt2} €`,
          Selbstbehalt: `${result.selbstbehalt} €`,
          Gekappt: result.gekappt ? 'ja' : 'nein',
        }}
      />

      <div className="mt-6">
        <AffiliateBox programId="ks-auxilia" context="ehegattenunterhalt" />
      </div>
    </div>
  );
}
