'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Steuerklasse = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

// Pauschalierte Lohnsteuer-Sätze (sehr vereinfacht, KuG-Tabelle-Approximation)
// Wir nutzen für die Berechnung einen pauschalen SV-Abzug von ~21 % plus einen
// Steuer-Faktor nach Steuerklasse auf das verbleibende Brutto.
const SV_PAUSCHALE = 0.21;

const STEUER_FAKTOR: Record<Steuerklasse, (brutto: number) => number> = {
  // progressive Näherung: 0 % bis ~1100 €/Monat, dann 14–42 %
  'I':   (b) => progressiveSteuer(b, 11604),
  'II':  (b) => progressiveSteuer(b, 14924), // Alleinerziehend-Entlastung
  'III': (b) => progressiveSteuer(b, 23208), // doppelter Grundfreibetrag
  'IV':  (b) => progressiveSteuer(b, 11604),
  'V':   (b) => progressiveSteuer(b, 0),
  'VI':  (b) => progressiveSteuer(b, 0),
};

function progressiveSteuer(jahresBrutto: number, freibetragJahr: number): number {
  const zvE = Math.max(0, jahresBrutto - freibetragJahr);
  if (zvE <= 0) return 0;
  if (zvE <= 17000) {
    // linear 14 % bis 24 %
    const y = zvE / 17000;
    return zvE * (0.14 + y * 0.10);
  }
  if (zvE <= 66761) {
    const y = (zvE - 17000) / (66761 - 17000);
    return 17000 * 0.19 + (zvE - 17000) * (0.24 + y * 0.18);
  }
  return 17000 * 0.19 + (66761 - 17000) * 0.33 + (zvE - 66761) * 0.42;
}

function nettoAus(brutto: number, sk: Steuerklasse, kirchensteuerSatz: number): number {
  if (brutto <= 0) return 0;
  const jahresBrutto = brutto * 12;
  const sv = brutto * SV_PAUSCHALE;
  const steuerJahr = STEUER_FAKTOR[sk](jahresBrutto);
  const steuerMonat = steuerJahr / 12;
  const kirchensteuer = steuerMonat * kirchensteuerSatz;
  return Math.max(0, brutto - sv - steuerMonat - kirchensteuer);
}

const BUNDESLAENDER = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
  'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
  'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
];

const LAENDER_8_PROZENT = ['Bayern', 'Baden-Württemberg'];

export default function KurzarbeitergeldRechner() {
  const [sollBrutto, setSollBrutto] = useState('3500');
  const [istBrutto, setIstBrutto] = useState('1750');
  const [steuerklasse, setSteuerklasse] = useState<Steuerklasse>('I');
  const [mitKind, setMitKind] = useState(false);
  const [bundesland, setBundesland] = useState('Nordrhein-Westfalen');
  const [kirchensteuer, setKirchensteuer] = useState(false);

  const sB = parseDeutscheZahl(sollBrutto);
  const iB = parseDeutscheZahl(istBrutto);
  const kstSatz = kirchensteuer ? (LAENDER_8_PROZENT.includes(bundesland) ? 0.08 : 0.09) : 0;

  const ergebnis = useMemo(() => {
    if (sB <= 0 || iB < 0 || iB > sB) return null;
    const sollNetto = nettoAus(sB, steuerklasse, kstSatz);
    const istNetto = nettoAus(iB, steuerklasse, kstSatz);
    const differenz = Math.max(0, sollNetto - istNetto);
    const satz = mitKind ? 0.67 : 0.60;
    const kug = differenz * satz;
    const gesamtEinkommen = istNetto + kug;
    const verlust = Math.max(0, sollNetto - gesamtEinkommen);
    const verlustProzent = sollNetto > 0 ? (verlust / sollNetto) * 100 : 0;
    return { sollNetto, istNetto, differenz, satz, kug, gesamtEinkommen, verlust, verlustProzent };
  }, [sB, iB, steuerklasse, mitKind, kstSatz]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtP = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      {/* Soll-Brutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Soll-Brutto (normales Monatsgehalt)
        </label>
        <NummerEingabe value={sollBrutto} onChange={setSollBrutto} placeholder="3500" einheit="€" />
        <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto berechnen" />
      </div>

      {/* Ist-Brutto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ist-Brutto (reduziertes Gehalt während Kurzarbeit)
        </label>
        <NummerEingabe value={istBrutto} onChange={setIstBrutto} placeholder="1750" einheit="€" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Gehalt für die tatsächlich geleisteten Stunden (z. B. bei 50 % Kurzarbeit = halbes Brutto)
        </p>
      </div>

      {/* Steuerklasse + Kind-Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select
            value={steuerklasse}
            onChange={e => setSteuerklasse(e.target.value as Steuerklasse)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value="I">I (ledig)</option>
            <option value="II">II (Alleinerziehend)</option>
            <option value="III">III (verheiratet, Hauptverdiener)</option>
            <option value="IV">IV (verheiratet, gleich)</option>
            <option value="V">V (verheiratet, Zweitverdiener)</option>
            <option value="VI">VI (Zweitjob)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder auf Lohnsteuerkarte?</label>
          <button
            onClick={() => setMitKind(!mitKind)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              mitKind
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {mitKind ? 'Ja — 67 % KuG' : 'Nein — 60 % KuG'}
          </button>
        </div>
      </div>

      {/* Bundesland + Kirchensteuer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select
            value={bundesland}
            onChange={e => setBundesland(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BUNDESLAENDER.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Nur für Kirchensteuer-Satz relevant (Bayern/BW 8 %, sonst 9 %).
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuerpflichtig?</label>
          <button
            onClick={() => setKirchensteuer(!kirchensteuer)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
              kirchensteuer
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {kirchensteuer ? `Ja — ${LAENDER_8_PROZENT.includes(bundesland) ? '8' : '9'} %` : 'Nein'}
          </button>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              Kurzarbeitergeld ({(ergebnis.satz * 100).toLocaleString('de-DE')} %)
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.kug)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">pro Monat</p>
          </div>

          {/* Vergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Einkommensvergleich</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Normales Netto (Soll-Netto)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sollNetto)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Netto während Kurzarbeit (Ist-Netto)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.istNetto)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nettoentgeltdifferenz</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.differenz)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ Kurzarbeitergeld ({(ergebnis.satz * 100).toLocaleString('de-DE')} %)</span>
                <span className="font-medium text-green-600 dark:text-green-400">+{fmt(ergebnis.kug)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamteinkommen während Kurzarbeit</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtEinkommen)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verlust gegenüber normalem Netto</span>
                <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.verlust)} € ({fmtP(ergebnis.verlustProzent)} %)</span>
              </div>
            </div>
          </div>

          {/* Balkenvergleich */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Visueller Vergleich</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Normales Netto</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.sollNetto)} €</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Ist-Netto + KuG</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtEinkommen)} €</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-500"
                    style={{ width: `${ergebnis.sollNetto > 0 ? (ergebnis.gesamtEinkommen / ergebnis.sollNetto) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Pauschal-Berechnung nach KuG-Tabelle. Maßgeblich ist die Abrechnung der Agentur für Arbeit. Die Sozialversicherungsbeiträge werden vom Arbeitgeber pauschal übernommen.
            </p>
          </div>

          <CrossLink href="/arbeit/arbeitslosengeld-rechner" emoji="📉" text="Nach Kurzarbeit: ALG I berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Kurzarbeitergeld: ${fmt(ergebnis.kug)} €/Monat (${(ergebnis.satz * 100).toLocaleString('de-DE')} %). Gesamteinkommen: ${fmt(ergebnis.gesamtEinkommen)} € (Verlust ${fmt(ergebnis.verlust)} € / ${fmtP(ergebnis.verlustProzent)} %).`}
            seitenTitel="Kurzarbeitergeld-Rechner"
          />

          <AiExplain
            rechnerName="Kurzarbeitergeld-Rechner"
            eingaben={{
              sollBrutto: sB,
              istBrutto: iB,
              steuerklasse,
              mitKind,
              bundesland,
            }}
            ergebnis={{
              kug: ergebnis.kug,
              satz: ergebnis.satz,
              sollNetto: ergebnis.sollNetto,
              istNetto: ergebnis.istNetto,
              gesamtEinkommen: ergebnis.gesamtEinkommen,
              verlust: ergebnis.verlust,
            }}
          />
        </>
      )}
    </div>
  );
}
