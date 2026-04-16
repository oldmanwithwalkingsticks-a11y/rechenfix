'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

// Beitragsbemessungsgrenze KV 2026: 69.750 €/Jahr = 5.812,50 €/Monat
const BBG_MONAT = 5812.5;

export default function KrankengeldRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [netto, setNetto] = useState('2350');
  const [kinder, setKinder] = useState(true);
  const [versicherung, setVersicherung] = useState<'gesetzlich' | 'privat'>('gesetzlich');

  const ergebnis = useMemo(() => {
    const br = Math.min(parseDeutscheZahl(brutto), BBG_MONAT);
    const ne = parseDeutscheZahl(netto);

    const brTag = br / 30;
    const neTag = ne / 30;

    // 70% Brutto, gedeckelt auf 90% Netto
    const krankengeldBrutto = Math.min(0.7 * brTag, 0.9 * neTag);

    // SV-Abzüge: RV 4,65 + ALV 0,65 + PV 0,85 (+ 0,3 kinderlos)
    const svSatz = kinder ? 0.0615 : 0.0645;
    const krankengeldNetto = krankengeldBrutto * (1 - svSatz);

    const krankengeldNettoMonat = krankengeldNetto * 30;
    const verlust = ne - krankengeldNettoMonat;
    const verlustProzent = ne > 0 ? (verlust / ne) * 100 : 0;

    return {
      brTag, neTag, krankengeldBrutto, krankengeldNetto,
      krankengeldNettoMonat, verlust, verlustProzent,
      svSatz: svSatz * 100,
    };
  }, [brutto, netto, kinder]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmt2 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Monatliches Bruttogehalt</label>
          <NummerEingabe value={brutto} onChange={setBrutto} einheit="€" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Monatliches Nettogehalt</label>
          <NummerEingabe value={netto} onChange={setNetto} einheit="€" />
        </div>
        <div>
          <RadioToggleGroup
            name="krankengeld-kinder"
            legend="Kinder"
            options={[
              { value: 'ja', label: 'Ja' },
              { value: 'nein', label: 'Nein (kinderlos-Zuschlag)' },
            ]}
            value={kinder ? 'ja' : 'nein'}
            onChange={(v) => setKinder(v === 'ja')}
          />
        </div>
        <div>
          <RadioToggleGroup
            name="krankengeld-versicherung"
            legend="Art der Versicherung"
            options={[
              { value: 'gesetzlich', label: 'Gesetzlich' },
              { value: 'privat', label: 'Privat' },
            ]}
            value={versicherung}
            onChange={(v) => setVersicherung(v as 'gesetzlich' | 'privat')}
          />
        </div>
      </div>

      {versicherung === 'privat' ? (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>ℹ️ Privat Versicherte</strong> erhalten kein gesetzliches Krankengeld, sondern <strong>Krankentagegeld</strong> je nach individuellem Tarif Ihrer PKV. Bitte fragen Sie die Höhe direkt bei Ihrem Versicherer an.
          </p>
        </div>
      ) : (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Netto-Krankengeld pro Monat</p>
            <p className="text-5xl font-bold">{fmt(ergebnis.krankengeldNettoMonat)} €</p>
            <p className="text-white/80 text-sm mt-1">
              {fmt2(ergebnis.krankengeldNetto)} € / Tag · Einkommensverlust: {fmt(ergebnis.verlust)} € ({fmt2(ergebnis.verlustProzent)} %)
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="px-4 pt-4 pb-1"><h2 className="font-bold text-gray-700 dark:text-gray-200">Vergleich</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <th className="px-3 py-2 text-left"></th>
                    <th className="px-3 py-2 text-right">Netto-Gehalt</th>
                    <th className="px-3 py-2 text-right">Krankengeld</th>
                    <th className="px-3 py-2 text-right">Differenz</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">pro Tag</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmt2(ergebnis.neTag)} €</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmt2(ergebnis.krankengeldNetto)} €</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmt2(ergebnis.neTag - ergebnis.krankengeldNetto)} €</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">pro Monat</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmt(parseDeutscheZahl(netto))} €</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmt(ergebnis.krankengeldNettoMonat)} €</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-red-600 dark:text-red-400">−{fmt(ergebnis.verlust)} € ({fmt2(ergebnis.verlustProzent)} %)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Timeline</h2>
            <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Tag 1 – 42 (6 Wochen):</strong> Lohnfortzahlung durch Arbeitgeber (volles Gehalt)</p>
              <p><strong>Ab Tag 43:</strong> Krankengeld durch Krankenkasse</p>
              <p><strong>Maximal:</strong> 78 Wochen (546 Tage) innerhalb von 3 Jahren für dieselbe Krankheit</p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>ℹ️ Progressionsvorbehalt:</strong> Krankengeld ist steuerfrei, erhöht aber Ihren persönlichen Steuersatz. In der Steuererklärung kann es zu einer Nachzahlung kommen. Nach 78 Wochen Krankengeld kann eine Erwerbsminderungsrente oder Arbeitslosengeld in Frage kommen.
            </p>
          </div>
        </>
      )}

      <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💰" text="Brutto-Netto berechnen" />
      <CrossLink href="/finanzen/buergergeld-rechner" emoji="🏛️" text="Bürgergeld berechnen" />
      <CrossLink href="/finanzen/pflegegeld-rechner" emoji="🤲" text="Pflegegeld berechnen" />

      <ErgebnisAktionen
        ergebnisText={versicherung === 'gesetzlich' ? `Krankengeld: ${fmt(ergebnis.krankengeldNettoMonat)} €/Monat · Einkommensverlust ${fmt(ergebnis.verlust)} € (${fmt2(ergebnis.verlustProzent)} %)` : 'Privat versichert — Krankentagegeld je nach Tarif'}
        seitenTitel="Krankengeld-Rechner"
      />

      <AiExplain
        rechnerName="Krankengeld-Rechner"
        eingaben={{
          Bruttogehalt: `${fmt(parseDeutscheZahl(brutto))} €`,
          Nettogehalt: `${fmt(parseDeutscheZahl(netto))} €`,
          Kinder: kinder ? 'Ja' : 'Nein',
          Versicherung: versicherung,
        }}
        ergebnis={versicherung === 'gesetzlich' ? {
          'Krankengeld Netto/Monat': `${fmt(ergebnis.krankengeldNettoMonat)} €`,
          'Krankengeld Netto/Tag': `${fmt2(ergebnis.krankengeldNetto)} €`,
          Einkommensverlust: `${fmt(ergebnis.verlust)} € (${fmt2(ergebnis.verlustProzent)} %)`,
        } : {
          Hinweis: 'Privat Versicherte: Krankentagegeld je nach PKV-Tarif',
        }}
      />
    </div>
  );
}
