'use client';

import { useState, useMemo } from 'react';
import { berechneBuergergeld, type Bedarfsgemeinschaft, type Kindergruppe, type KindEintrag } from '@/lib/berechnungen/buergergeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const ALTERSGRUPPEN: { key: Kindergruppe; label: string }[] = [
  { key: '0-5', label: '0–5 Jahre' },
  { key: '6-13', label: '6–13 Jahre' },
  { key: '14-17', label: '14–17 Jahre' },
  { key: '18-24', label: '18–24 Jahre' },
];

export default function BuergergeldRechner() {
  const [bg, setBg] = useState<Bedarfsgemeinschaft>('alleinstehend');
  const [kinder, setKinder] = useState<KindEintrag[]>([]);
  const [warmmiete, setWarmmiete] = useState('450');
  const [heizkosten, setHeizkosten] = useState('80');
  const [einkommen, setEinkommen] = useState('0');
  const [vermoegen, setVermoegen] = useState('0');

  const ergebnis = useMemo(
    () => berechneBuergergeld({
      bedarfsgemeinschaft: bg,
      kinder,
      warmmiete: parseDeutscheZahl(warmmiete),
      heizkosten: parseDeutscheZahl(heizkosten),
      einkommen: parseDeutscheZahl(einkommen),
      vermoegen: parseDeutscheZahl(vermoegen),
    }),
    [bg, kinder, warmmiete, heizkosten, einkommen, vermoegen]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const kindHinzufuegen = () => {
    if (kinder.length >= 6) return;
    setKinder([...kinder, { alter: '0-5' }]);
  };

  const kindEntfernen = (index: number) => {
    setKinder(kinder.filter((_, i) => i !== index));
  };

  const kindAlterAendern = (index: number, alter: Kindergruppe) => {
    setKinder(kinder.map((k, i) => i === index ? { alter } : k));
  };

  // Bei Wechsel zu alleinstehend/paar: Kinder entfernen
  const handleBgChange = (neu: Bedarfsgemeinschaft) => {
    setBg(neu);
    if (neu === 'alleinstehend' || neu === 'paar') {
      setKinder([]);
    }
  };

  return (
    <div>
      {/* Bedarfsgemeinschaft */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedarfsgemeinschaft</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {([
            { key: 'alleinstehend' as const, label: 'Alleinstehend', icon: '👤' },
            { key: 'paar' as const, label: 'Paar', icon: '👫' },
            { key: 'paar-mit-kindern' as const, label: 'Paar mit Kindern', icon: '👨‍👩‍👧' },
          ]).map(opt => (
            <button
              key={opt.key}
              onClick={() => handleBgChange(opt.key)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                bg === opt.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kinder */}
      {bg === 'paar-mit-kindern' && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kinder ({kinder.length})
          </label>
          <div className="space-y-2">
            {kinder.map((kind, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0 w-16">Kind {i + 1}</span>
                <select id={`buergergeld-kind-${i + 1}-alter`} aria-label={`Alter Kind ${i + 1}`}
                  value={kind.alter}
                  onChange={e => kindAlterAendern(i, e.target.value as Kindergruppe)}
                  className="flex-1 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200"
                >
                  {ALTERSGRUPPEN.map(ag => (
                    <option key={ag.key} value={ag.key}>{ag.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => kindEntfernen(i)}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors p-1"
                  aria-label={`Kind ${i + 1} entfernen`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {kinder.length < 6 && (
            <button
              onClick={kindHinzufuegen}
              className="mt-2 text-sm text-primary-600 hover:text-primary-600 dark:hover:text-primary-400 font-medium flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Kind hinzufügen
            </button>
          )}
        </div>
      )}

      {/* Unterkunftskosten */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warmmiete</label>
          <NummerEingabe value={warmmiete} onChange={setWarmmiete} placeholder="z. B. 450" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heizkosten</label>
          <NummerEingabe value={heizkosten} onChange={setHeizkosten} placeholder="z. B. 80" einheit="€" />
        </div>
      </div>

      {/* Einkommen & Vermögen */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einkommen (Brutto)</label>
          <NummerEingabe value={einkommen} onChange={setEinkommen} placeholder="0" einheit="€" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monatliches Brutto</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vermögen</label>
          <NummerEingabe value={vermoegen} onChange={setVermoegen} placeholder="0" einheit="€" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gesamt-Vermögen</p>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className={`rounded-2xl p-6 text-center ${
            ergebnis.bedarfGedeckt
              ? 'bg-gray-50 dark:bg-gray-800/50'
              : 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10'
          }`}>
            {ergebnis.bedarfGedeckt ? (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Kein Bürgergeld-Anspruch</p>
                <p className="text-2xl font-extrabold text-gray-500 dark:text-gray-400">0,00 €</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Ihr Einkommen deckt den Bedarf vollständig.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                  Voraussichtlicher Bürgergeld-Anspruch
                </p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmt(ergebnis.gesamtAnspruch)} €
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">pro Monat</p>
              </>
            )}
          </div>

          {/* Vermögensprüfung */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.vermoegenOk
              ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
              : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{ergebnis.vermoegenOk ? '✅' : '⚠️'}</span>
              <div>
                <p className={`text-sm font-semibold ${
                  ergebnis.vermoegenOk
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {ergebnis.vermoegenOk
                    ? 'Vermögen liegt unter dem Freibetrag'
                    : 'Vermögen liegt über dem Freibetrag'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Freibetrag: {ergebnis.vermoegensFreibetrag.toLocaleString('de-DE')} €
                  ({ergebnis.personenImHaushalt} {ergebnis.personenImHaushalt === 1 ? 'Person' : 'Personen'} im Haushalt)
                </p>
                {!ergebnis.vermoegenOk && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    In den ersten 12 Monaten (Karenzzeit) gelten erhöhte Freibeträge.
                    Wenden Sie sich an Ihr Jobcenter.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {/* Erwachsene */}
              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Regelbedarf Erwachsene</p>
              </div>
              {ergebnis.aufschluesselungErwachsene.map((pos, i) => (
                <div key={`e-${i}`} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(pos.betrag)} €</span>
                </div>
              ))}

              {/* Kinder */}
              {ergebnis.aufschluesselungKinder.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Regelbedarf Kinder</p>
                  </div>
                  {ergebnis.aufschluesselungKinder.map((pos, i) => (
                    <div key={`k-${i}`} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(pos.betrag)} €</span>
                    </div>
                  ))}
                </>
              )}

              {/* Unterkunft */}
              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Kosten der Unterkunft</p>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Warmmiete + Heizkosten</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.unterkunftskosten)} €</span>
              </div>

              {/* Zwischensumme */}
              <div className="flex justify-between px-4 py-3 text-sm font-semibold bg-gray-50/80 dark:bg-gray-700/30">
                <span className="text-gray-700 dark:text-gray-200">Gesamtbedarf</span>
                <span className="text-gray-800 dark:text-gray-100">{fmt(ergebnis.regelbedarfGesamt + ergebnis.unterkunftskosten)} €</span>
              </div>

              {/* Einkommen */}
              {ergebnis.anrechenbareEinkommen > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Einkommensanrechnung</p>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Freibetrag</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{fmt(ergebnis.freibetragEinkommen)} €</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Anrechenbares Einkommen</span>
                    <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.anrechenbareEinkommen)} €</span>
                  </div>
                </>
              )}

              {/* Endergebnis */}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Bürgergeld-Anspruch</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtAnspruch)} €</span>
              </div>
            </div>
          </div>

          {/* Regelsätze Info */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Bürgergeld-Regelsätze 2026</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Alleinstehende</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">563 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Partner/in (je Person)</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">506 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Kind 18–24 Jahre</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">451 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Kind 14–17 Jahre</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">471 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Kind 6–13 Jahre</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">390 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Kind 0–5 Jahre</td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">357 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Schätzung. Maßgeblich ist der Bescheid Ihres Jobcenters.
            </p>
          </div>

          <CrossLink href="/finanzen/wohngeld-rechner" emoji="🏠" text="Alternativ: Wohngeld prüfen" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.bedarfGedeckt ? 'Kein Bürgergeld-Anspruch (Bedarf durch Einkommen gedeckt)' : `Bürgergeld-Anspruch: ${fmt(ergebnis.gesamtAnspruch)} € pro Monat`}
            seitenTitel="Bürgergeld-Rechner"
          />
          <AiExplain
            rechnerName="Bürgergeld-Rechner"
            eingaben={{
              bedarfsgemeinschaft: bg,
              anzahlKinder: kinder.length,
              warmmiete: parseDeutscheZahl(warmmiete),
              heizkosten: parseDeutscheZahl(heizkosten),
              einkommen: parseDeutscheZahl(einkommen),
              vermoegen: parseDeutscheZahl(vermoegen),
            }}
            ergebnis={{
              gesamtAnspruch: ergebnis.gesamtAnspruch,
              regelbedarfGesamt: ergebnis.regelbedarfGesamt,
              unterkunftskosten: ergebnis.unterkunftskosten,
              anrechenbareEinkommen: ergebnis.anrechenbareEinkommen,
              bedarfGedeckt: ergebnis.bedarfGedeckt,
            }}
          />

          <AffiliateBox programId="check24" variant="compact" />
        </div>
      )}
    </div>
  );
}
