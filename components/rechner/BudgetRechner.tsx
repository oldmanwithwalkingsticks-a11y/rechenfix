'use client';

import { useState, useMemo } from 'react';
import { berechneBudget } from '@/lib/berechnungen/budget';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtProzent = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Colors for expense categories in the pie chart
const KATEGORIE_FARBEN: Record<string, string> = {
  'Miete & Nebenkosten':    '#3b82f6',
  'Strom/Gas':              '#f59e0b',
  'Versicherungen':         '#8b5cf6',
  'Lebensmittel':           '#10b981',
  'Mobilität (Auto/ÖPNV)': '#ef4444',
  'Internet/Handy':         '#06b6d4',
  'Abos/Streaming':         '#ec4899',
  'Freizeit/Ausgehen':      '#f97316',
  'Kleidung':               '#6366f1',
  'Sonstiges':              '#84cc16',
};

export default function BudgetRechner() {
  // Einnahmen
  const [nettoEinkommen, setNettoEinkommen] = useState('2500');
  const [weitereEinnahmen, setWeitereEinnahmen] = useState('0');

  // Bedürfnisse
  const [miete, setMiete] = useState('750');
  const [stromGas, setStromGas] = useState('80');
  const [versicherungen, setVersicherungen] = useState('100');
  const [lebensmittel, setLebensmittel] = useState('350');
  const [mobilitaet, setMobilitaet] = useState('150');
  const [internetHandy, setInternetHandy] = useState('50');

  // Wünsche
  const [abosStreaming, setAbosStreaming] = useState('40');
  const [freizeitAusgehen, setFreizeitAusgehen] = useState('150');
  const [kleidung, setKleidung] = useState('75');
  const [sonstiges, setSonstiges] = useState('100');

  const ergebnis = useMemo(() => berechneBudget(
    parseDeutscheZahl(nettoEinkommen),
    parseDeutscheZahl(weitereEinnahmen),
    parseDeutscheZahl(miete),
    parseDeutscheZahl(stromGas),
    parseDeutscheZahl(versicherungen),
    parseDeutscheZahl(lebensmittel),
    parseDeutscheZahl(mobilitaet),
    parseDeutscheZahl(internetHandy),
    parseDeutscheZahl(abosStreaming),
    parseDeutscheZahl(freizeitAusgehen),
    parseDeutscheZahl(kleidung),
    parseDeutscheZahl(sonstiges),
  ), [
    nettoEinkommen, weitereEinnahmen,
    miete, stromGas, versicherungen, lebensmittel, mobilitaet, internetHandy,
    abosStreaming, freizeitAusgehen, kleidung, sonstiges,
  ]);

  // Build conic-gradient for pie chart
  const buildConicGradient = () => {
    if (!ergebnis || ergebnis.ausgabenGesamt === 0) return 'conic-gradient(#e5e7eb 0deg 360deg)';
    let currentDeg = 0;
    const segments: string[] = [];
    for (const kat of ergebnis.kategorien) {
      if (kat.betrag <= 0) continue;
      const deg = (kat.betrag / ergebnis.ausgabenGesamt) * 360;
      const farbe = KATEGORIE_FARBEN[kat.name] ?? '#9ca3af';
      segments.push(`${farbe} ${currentDeg.toFixed(2)}deg ${(currentDeg + deg).toFixed(2)}deg`);
      currentDeg += deg;
    }
    return `conic-gradient(${segments.join(', ')})`;
  };

  const ergebnisText = () => {
    if (!ergebnis) return '';
    const lines = [
      'Budget-Rechner — Ergebnis',
      `Einnahmen gesamt: ${fmt(ergebnis.einnahmenGesamt)} €`,
      `Ausgaben gesamt: ${fmt(ergebnis.ausgabenGesamt)} €`,
      ergebnis.ueberschuss >= 0
        ? `Überschuss: ${fmt(ergebnis.ueberschuss)} €`
        : `Defizit: ${fmt(Math.abs(ergebnis.ueberschuss))} €`,
      `Sparquote: ${fmtProzent(ergebnis.sparquote)} %`,
      '',
      '50/30/20-Regel:',
      `  Bedürfnisse (Soll 50%): ${fmt(ergebnis.beduerfnisseIst)} € (${fmtProzent(ergebnis.beduerfnisseProzent)}%)`,
      `  Wünsche (Soll 30%): ${fmt(ergebnis.wuenscheIst)} € (${fmtProzent(ergebnis.wuenscheProzent)}%)`,
      `  Sparen (Soll 20%): ${fmt(ergebnis.sparenIst)} € (${fmtProzent(ergebnis.sparenProzent)}%)`,
    ];
    return lines.join('\n');
  };

  const ueberschussPositiv = ergebnis ? ergebnis.ueberschuss >= 0 : true;

  return (
    <div className="space-y-6">
      {/* Einnahmen */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Einnahmen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nettoEinkommen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Netto-Einkommen
            </label>
            <NummerEingabe
              value={nettoEinkommen}
              onChange={setNettoEinkommen}
              placeholder="2500"
              einheit="€/Mon."
            />
          </div>
          <div>
            <label htmlFor="weitereEinnahmen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weitere Einnahmen
            </label>
            <NummerEingabe
              value={weitereEinnahmen}
              onChange={setWeitereEinnahmen}
              placeholder="0"
              einheit="€/Mon."
            />
          </div>
        </div>
      </section>

      {/* Ausgaben */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Ausgaben</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Bedürfnisse (Miete, Strom, Versicherungen, Lebensmittel, Mobilität, Internet) und
          Wünsche (Abos, Freizeit, Kleidung, Sonstiges)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Miete + Nebenkosten
            </label>
            <NummerEingabe value={miete} onChange={setMiete} placeholder="750" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Strom/Gas
            </label>
            <NummerEingabe value={stromGas} onChange={setStromGas} placeholder="80" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Versicherungen
            </label>
            <NummerEingabe value={versicherungen} onChange={setVersicherungen} placeholder="100" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lebensmittel
            </label>
            <NummerEingabe value={lebensmittel} onChange={setLebensmittel} placeholder="350" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobilität (Auto/ÖPNV)
            </label>
            <NummerEingabe value={mobilitaet} onChange={setMobilitaet} placeholder="150" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Internet/Handy
            </label>
            <NummerEingabe value={internetHandy} onChange={setInternetHandy} placeholder="50" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Abos/Streaming
            </label>
            <NummerEingabe value={abosStreaming} onChange={setAbosStreaming} placeholder="40" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Freizeit/Ausgehen
            </label>
            <NummerEingabe value={freizeitAusgehen} onChange={setFreizeitAusgehen} placeholder="150" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kleidung
            </label>
            <NummerEingabe value={kleidung} onChange={setKleidung} placeholder="75" einheit="€/Mon." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sonstiges
            </label>
            <NummerEingabe value={sonstiges} onChange={setSonstiges} placeholder="100" einheit="€/Mon." />
          </div>
        </div>
      </section>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* 1. Haupt-Ergebnis-Box */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">
              {ueberschussPositiv ? 'Monatlicher Überschuss' : 'Monatliches Defizit'}
            </p>
            <p className={`text-4xl font-bold ${ueberschussPositiv ? '' : 'text-red-200'}`}>
              {ueberschussPositiv ? '+' : '−'}{fmt(Math.abs(ergebnis.ueberschuss))} €
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-white/60 text-xs">Sparquote</p>
                <p className="text-white font-semibold text-lg">
                  {fmtProzent(ergebnis.sparquote)} %
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Einnahmen</p>
                <p className="text-white font-semibold text-lg">{fmt(ergebnis.einnahmenGesamt)} €</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Ausgaben</p>
                <p className="text-white font-semibold text-lg">{fmt(ergebnis.ausgabenGesamt)} €</p>
              </div>
            </div>
          </div>

          {/* 2. Tortendiagramm */}
          {ergebnis.kategorien.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Ausgaben-Verteilung</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  style={{ background: buildConicGradient() }}
                  className="w-48 h-48 rounded-full mx-auto flex-shrink-0"
                  aria-label={`Tortendiagramm Ausgaben: ${ergebnis.kategorien.map(k => `${k.name} ${fmt(k.betrag)} Euro`).join(', ')}`}
                  role="img"
                />
                <div className="flex-1 space-y-2 w-full">
                  {ergebnis.kategorien.map(kat => {
                    const prozent = ergebnis.ausgabenGesamt > 0
                      ? (kat.betrag / ergebnis.ausgabenGesamt) * 100
                      : 0;
                    const farbe = KATEGORIE_FARBEN[kat.name] ?? '#9ca3af';
                    return (
                      <div key={kat.name} className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: farbe }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">
                          {kat.name}
                        </span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                          {fmt(kat.betrag)} €
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                          {Math.round(prozent)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. 50/30/20-Vergleich */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-1">50/30/20-Regel</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Empfehlung: 50% für Bedürfnisse, 30% für Wünsche, 20% Sparen
            </p>
            <div className="space-y-5">
              {/* Bedürfnisse */}
              {(() => {
                const istProzent = ergebnis.beduerfnisseProzent;
                const sollProzent = 50;
                const istOk = istProzent <= sollProzent;
                const balkenBreite = Math.min(100, istProzent);
                return (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Bedürfnisse
                        <span className="ml-1 text-gray-600 dark:text-gray-400 font-normal">(Soll: 50%)</span>
                      </span>
                      <span className={`font-semibold ${istOk ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {fmt(ergebnis.beduerfnisseIst)} € ({fmtProzent(istProzent)}%)
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                      {/* Soll-Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500 z-10"
                        style={{ left: `${sollProzent}%` }}
                        aria-hidden="true"
                      />
                      {/* Ist-Balken */}
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${istOk ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${balkenBreite}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      <span>0%</span>
                      <span>Soll: {fmt(ergebnis.beduerfnisseSoll)} €</span>
                      <span>100%</span>
                    </div>
                  </div>
                );
              })()}

              {/* Wünsche */}
              {(() => {
                const istProzent = ergebnis.wuenscheProzent;
                const sollProzent = 30;
                const istOk = istProzent <= sollProzent;
                const balkenBreite = Math.min(100, istProzent);
                return (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Wünsche
                        <span className="ml-1 text-gray-600 dark:text-gray-400 font-normal">(Soll: 30%)</span>
                      </span>
                      <span className={`font-semibold ${istOk ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {fmt(ergebnis.wuenscheIst)} € ({fmtProzent(istProzent)}%)
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500 z-10"
                        style={{ left: `${sollProzent}%` }}
                        aria-hidden="true"
                      />
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${istOk ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${balkenBreite}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      <span>0%</span>
                      <span>Soll: {fmt(ergebnis.wuenscheSoll)} €</span>
                      <span>100%</span>
                    </div>
                  </div>
                );
              })()}

              {/* Sparen */}
              {(() => {
                const istProzent = ergebnis.sparenProzent;
                const sollProzent = 20;
                const istOk = istProzent >= sollProzent;
                const balkenBreite = Math.min(100, istProzent);
                return (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Sparen
                        <span className="ml-1 text-gray-600 dark:text-gray-400 font-normal">(Soll: 20%)</span>
                      </span>
                      <span className={`font-semibold ${istOk ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {fmt(ergebnis.sparenIst)} € ({fmtProzent(istProzent)}%)
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500 z-10"
                        style={{ left: `${sollProzent}%` }}
                        aria-hidden="true"
                      />
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${istOk ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${balkenBreite}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      <span>0%</span>
                      <span>Soll: {fmt(ergebnis.sparenSoll)} €</span>
                      <span>100%</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 4. Tipps-Box */}
          {(ergebnis.beduerfnisseProzent > 50 || ergebnis.wuenscheProzent > 30) && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl p-4">
              <h2 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Tipps zur Budget-Optimierung</h2>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                {ergebnis.beduerfnisseProzent > 50 && (
                  <>
                    <li>
                      <strong>Bedürfnisse über 50%:</strong> Ihre Fixkosten ({fmtProzent(ergebnis.beduerfnisseProzent)}%) übersteigen die empfohlene Grenze.
                      Prüfen Sie, ob ein günstigerer Strom-/Gastanbieter oder Handytarif möglich ist.
                    </li>
                    {ergebnis.beduerfnisseIst > ergebnis.beduerfnisseSoll && (
                      <li>
                        Sie könnten durch Optimierung der Fixkosten bis zu{' '}
                        <strong>{fmt(ergebnis.beduerfnisseIst - ergebnis.beduerfnisseSoll)} €/Monat</strong> sparen.
                      </li>
                    )}
                  </>
                )}
                {ergebnis.wuenscheProzent > 30 && (
                  <>
                    <li>
                      <strong>Wünsche über 30%:</strong> Für Abos, Freizeit und Kleidung geben Sie {fmtProzent(ergebnis.wuenscheProzent)}% aus
                      — mehr als die empfohlenen 30%.
                    </li>
                    <li>
                      Prüfen Sie Ihre Abonnements auf Aktualität und überlegen Sie, welche Freizeitausgaben Sie reduzieren können.
                    </li>
                  </>
                )}
                {ergebnis.ueberschuss < 0 && (
                  <li>
                    <strong>Defizit:</strong> Ihre Ausgaben übersteigen Ihre Einnahmen um{' '}
                    <strong>{fmt(Math.abs(ergebnis.ueberschuss))} €/Monat</strong>.
                    Handeln Sie jetzt, bevor Schulden entstehen.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* 5. Cross-Links */}
          <CrossLink href="/finanzen/sparrechner" emoji="💰" text="Überschuss anlegen – Sparrechner" />
          <CrossLink href="/alltag/abo-rechner" emoji="📱" text="Abos prüfen und Kosten senken" />
          <CrossLink href="/alltag/streaming-kosten-rechner" emoji="📺" text="Streaming-Kosten vergleichen" />

          {/* 6. ErgebnisAktionen + AiExplain */}
          <ErgebnisAktionen
            ergebnisText={ergebnisText()}
            seitenTitel="Budget-Rechner"
          />

          <AiExplain
            rechnerName="Budget-Rechner"
            eingaben={{
              nettoEinkommen: parseDeutscheZahl(nettoEinkommen),
              weitereEinnahmen: parseDeutscheZahl(weitereEinnahmen),
              ausgabenGesamt: ergebnis.ausgabenGesamt,
            }}
            ergebnis={{
              ueberschuss: ergebnis.ueberschuss,
              sparquote: ergebnis.sparquote,
              beduerfnisseProzent: ergebnis.beduerfnisseProzent,
              wuenscheProzent: ergebnis.wuenscheProzent,
              sparenProzent: ergebnis.sparenProzent,
            }}
          />
        </>
      )}
    </div>
  );
}
