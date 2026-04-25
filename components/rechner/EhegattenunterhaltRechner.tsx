'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Art = 'trennung' | 'nachehelich';

// Selbstbehalt gegenüber Ehegatten 2026 (Düsseldorfer Tabelle, Stand DT 2026):
// 1.600 € — wenn der Pflichtige erwerbstätig ist
// 1.475 € — wenn der Pflichtige nicht erwerbstätig ist
// Die Differenzierung gilt für Trennungsunterhalt UND nachehelichen
// Unterhalt gleichermaßen — Achse ist die Erwerbstätigkeit, NICHT die
// Trennungsphase. Korrigiert mit Prompt 149c (P1-A10): vorher fälschlich
// Trennung=1600 / nachehelich=1475 mit erfundener Begründung.
const SELBSTBEHALT_ERWERBSTAETIG = 1600;
const SELBSTBEHALT_NICHT_ERWERBSTAETIG = 1475;

// Erwerbstätigenbonus: 1/10 wird vor der 3/7-Methode vom Erwerbseinkommen abgezogen
// Damit ergibt sich faktisch die gängige Quote. Wir verwenden die klassische 3/7-Differenzmethode.

export default function EhegattenunterhaltRechner() {
  const [art, setArt] = useState<Art>('trennung');
  const [pflichtigerErwerbstaetig, setPflichtigerErwerbstaetig] = useState<boolean>(true);
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

    const selbstbehalt = pflichtigerErwerbstaetig
      ? SELBSTBEHALT_ERWERBSTAETIG
      : SELBSTBEHALT_NICHT_ERWERBSTAETIG;
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
  }, [netto1, netto2, kuBeruecksichtigt, kindesunterhalt, pflichtigerErwerbstaetig]);

  const fmtEuro = (n: number) =>
    n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const ergebnis =
    `Ehegattenunterhalt (${art === 'trennung' ? 'Trennungsunterhalt' : 'Nachehelicher Unterhalt'}): ${fmtEuro(result.unterhalt)} / Monat. ` +
    `Einkommen P1 nach Unterhalt: ${fmtEuro(result.rest1)}. Einkommen P2 mit Unterhalt: ${fmtEuro(result.gesamt2)}.`;

  return (
    <div>
      {/* Art */}
      <div className="mb-5">
        <RadioToggleGroup
          name="eheunterhalt-art"
          legend="Art des Unterhalts"
          options={[
            { value: 'trennung', label: 'Trennungsunterhalt' },
            { value: 'nachehelich', label: 'Nachehelicher Unterhalt' },
          ]}
          value={art}
          onChange={(v) => setArt(v as Art)}
          columns={2}
          fullWidth
        />
      </div>

      {/* Erwerbstätigkeit des Pflichtigen — bestimmt den Selbstbehalt */}
      <div className="mb-5">
        <RadioToggleGroup
          name="eheunterhalt-erwerbstaetig"
          legend="Pflichtiger ist erwerbstätig?"
          options={[
            { value: 'ja', label: 'Ja (Selbstbehalt 1.600 €)' },
            { value: 'nein', label: 'Nein (Selbstbehalt 1.475 €)' },
          ]}
          value={pflichtigerErwerbstaetig ? 'ja' : 'nein'}
          onChange={(v) => setPflichtigerErwerbstaetig(v === 'ja')}
          columns={2}
          fullWidth
        />
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
        <RadioToggleGroup
          name="eheunterhalt-ku"
          legend="Kindesunterhalt bereits im Netto berücksichtigt?"
          options={[
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ]}
          value={kuBeruecksichtigt ? 'ja' : 'nein'}
          onChange={(v) => setKuBeruecksichtigt(v === 'ja')}
          columns={2}
          fullWidth
        />
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
          Selbstbehalt ({pflichtigerErwerbstaetig ? 'erwerbstätig' : 'nicht erwerbstätig'}): {fmtEuro(result.selbstbehalt)}
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
          'Pflichtiger erwerbstätig': pflichtigerErwerbstaetig ? 'ja' : 'nein',
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
