'use client';

import { useState, useMemo } from 'react';
import { berechneNettoZuBrutto, berechneBruttoZuNetto, berechneMultiMwSt } from '@/lib/berechnungen/mwst';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import TabGroup from '@/components/ui/TabGroup';

type Tab = 'netto-brutto' | 'brutto-netto' | 'multi';

interface MultiZeile {
  id: number;
  bezeichnung: string;
  netto: string;
  mwstSatz: number;
}

let nextId = 1;

export default function MwStRechner() {
  const [tab, setTab] = useState<Tab>('brutto-netto');
  const [betrag, setBetrag] = useState('119');
  const [mwstSatz, setMwstSatz] = useState(19);
  const [customSatz, setCustomSatz] = useState('');
  const [istCustom, setIstCustom] = useState(false);
  const [kopiert, setKopiert] = useState(false);
  const [geteilt, setGeteilt] = useState(false);

  // Multi-Rechner
  const [zeilen, setZeilen] = useState<MultiZeile[]>([
    { id: nextId++, bezeichnung: 'Position 1', netto: '100', mwstSatz: 19 },
  ]);

  const aktiverSatz = istCustom ? parseDeutscheZahl(customSatz) : mwstSatz;
  const n = parseDeutscheZahl(betrag);

  const ergebnis = useMemo(() => {
    if (n <= 0) return null;
    return tab === 'netto-brutto'
      ? berechneNettoZuBrutto(n, aktiverSatz)
      : berechneBruttoZuNetto(n, aktiverSatz);
  }, [n, aktiverSatz, tab]);

  const multiErgebnis = useMemo(() => {
    const parsed = zeilen
      .map(z => ({ bezeichnung: z.bezeichnung, netto: parseDeutscheZahl(z.netto), mwstSatz: z.mwstSatz }))
      .filter(z => z.netto > 0);
    if (parsed.length === 0) return null;
    return berechneMultiMwSt(parsed);
  }, [zeilen]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function handleCopy() {
    if (!ergebnis) return;
    const text = tab === 'netto-brutto'
      ? `Netto: ${fmt(ergebnis.netto)} € | MwSt: ${fmt(ergebnis.mwstBetrag)} € | Brutto: ${fmt(ergebnis.brutto)} €`
      : `Brutto: ${fmt(ergebnis.brutto)} € | MwSt: ${fmt(ergebnis.mwstBetrag)} € | Netto: ${fmt(ergebnis.netto)} €`;
    navigator.clipboard.writeText(text);
    setKopiert(true);
    setTimeout(() => setKopiert(false), 2000);
  }

  function handleShare() {
    if (!ergebnis) return;
    const richtungText = tab === 'netto-brutto' ? 'Netto → Brutto' : 'Brutto → Netto';
    const text = `${richtungText}: ${fmt(tab === 'netto-brutto' ? ergebnis.netto : ergebnis.brutto)} € → ${fmt(tab === 'netto-brutto' ? ergebnis.brutto : ergebnis.netto)} € (${aktiverSatz}% MwSt: ${fmt(ergebnis.mwstBetrag)} €) — berechnet auf rechenfix.de/finanzen/mwst-rechner`;
    if (navigator.share) {
      navigator.share({ title: 'MwSt-Berechnung', text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
    setGeteilt(true);
    setTimeout(() => setGeteilt(false), 2000);
  }

  function addZeile() {
    setZeilen([...zeilen, { id: nextId++, bezeichnung: `Position ${zeilen.length + 1}`, netto: '', mwstSatz: 19 }]);
  }

  function removeZeile(id: number) {
    if (zeilen.length <= 1) return;
    setZeilen(zeilen.filter(z => z.id !== id));
  }

  function updateZeile(id: number, field: keyof MultiZeile, value: string | number) {
    setZeilen(zeilen.map(z => z.id === id ? { ...z, [field]: value } : z));
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'brutto-netto', label: 'Brutto → Netto' },
    { key: 'netto-brutto', label: 'Netto → Brutto' },
    { key: 'multi', label: 'Multi-Rechner' },
  ];

  return (
    <div>
      <TabGroup
        tabs={tabs.map(t => ({ id: t.key, label: t.label }))}
        activeId={tab}
        onChange={(id) => {
          const newTab = id as Tab;
          setTab(newTab);
          if (newTab === 'netto-brutto') setBetrag('100');
          else if (newTab === 'brutto-netto') setBetrag('119');
        }}
        ariaLabel="MwSt-Berechnungsart"
      >

      {/* Einzel-Rechner */}
      {tab !== 'multi' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {tab === 'netto-brutto' ? 'Nettobetrag' : 'Bruttobetrag'}
              </label>
              <NummerEingabe
                value={betrag}
                onChange={setBetrag}
                placeholder="Betrag eingeben"
                einheit="€"
              />
            </div>
            <div>
              <RadioToggleGroup
                name="mwst-satz"
                legend="MwSt-Satz"
                options={[
                  { value: '19', label: '19%' },
                  { value: '7', label: '7%' },
                  { value: 'eigen', label: 'Eigen' },
                ]}
                value={istCustom ? 'eigen' : String(mwstSatz)}
                onChange={(v) => {
                  if (v === 'eigen') {
                    setIstCustom(true);
                  } else {
                    setIstCustom(false);
                    setMwstSatz(Number(v));
                  }
                }}
                activeColor="accent"
              />
              {istCustom && (
                <div className="mt-2">
                  <NummerEingabe
                    value={customSatz}
                    onChange={setCustomSatz}
                    placeholder="z.B. 16"
                    einheit="%"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Hinweis 19% Fehler */}
          {tab === 'brutto-netto' && n > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-3 mb-4">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                <strong>Achtung:</strong> Die MwSt wird nicht einfach vom Bruttobetrag abgezogen (z. B. nicht {fmt(n)} − 19% = {fmt(n * 0.81)}),
                sondern herausgerechnet: {fmt(n)} ÷ 1,19 = {fmt(n / 1.19)} Netto.
                Häufiger Fehler — der Unterschied beträgt {fmt(n * 0.19 - (n - n / 1.19))} €!
              </p>
            </div>
          )}

          {/* Ergebnis */}
          {ergebnis && n > 0 && (
            <>
              <div className="result-box mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Netto</p>
                    <p className="text-xl font-bold">{fmt(ergebnis.netto)} &euro;</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">MwSt ({aktiverSatz}%)</p>
                    <p className="text-xl font-bold text-accent-300">+ {fmt(ergebnis.mwstBetrag)} &euro;</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Brutto</p>
                    <p className="text-xl font-bold">{fmt(ergebnis.brutto)} &euro;</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleCopy}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors"
                >
                  {kopiert ? '✓ Kopiert' : 'Ergebnis kopieren'}
                </button>
                <button
                  onClick={handleShare}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors"
                >
                  {geteilt ? '✓ Geteilt' : 'Ergebnis teilen'}
                </button>
              </div>

              <CrossLink href="/alltag/skontorechner" emoji="💸" text="Skonto auf Rechnungen berechnen" />
              <CrossLink href="/finanzen/brutto-netto-rechner" emoji="💶" text="Brutto-Netto-Rechner für Gehälter" />

              <AiExplain
                rechnerName="MwSt-Rechner"
                eingaben={{ richtung: tab === 'netto-brutto' ? 'Netto → Brutto' : 'Brutto → Netto', betrag: n, mwstSatz: aktiverSatz }}
                ergebnis={{ netto: ergebnis.netto, mwstBetrag: ergebnis.mwstBetrag, brutto: ergebnis.brutto }}
              />
            </>
          )}
        </>
      )}

      {/* Multi-Rechner */}
      {tab === 'multi' && (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Berechnen Sie die MwSt für mehrere Positionen gleichzeitig — ideal für Rechnungen und Angebote.
          </p>

          <div className="space-y-3 mb-4">
            {zeilen.map((z, idx) => (
              <div key={z.id} className="flex flex-wrap sm:flex-nowrap gap-2 items-end bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                <div className="w-full sm:w-auto sm:flex-1">
                  {idx === 0 && <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bezeichnung</label>}
                  <input
                    type="text"
                    value={z.bezeichnung}
                    onChange={e => updateZeile(z.id, 'bezeichnung', e.target.value)}
                    className="input-field !py-2 !text-sm"
                    placeholder="Position"
                  />
                </div>
                <div className="w-full sm:w-32">
                  {idx === 0 && <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Netto (€)</label>}
                  <NummerEingabe
                    value={z.netto}
                    onChange={val => updateZeile(z.id, 'netto', val)}
                    placeholder="0,00"
                  />
                </div>
                <div className="w-full sm:w-24">
                  {idx === 0 && <label htmlFor="mwst-select-1" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">MwSt %</label>}
                  <select id="mwst-select-1"
                    value={z.mwstSatz}
                    onChange={e => updateZeile(z.id, 'mwstSatz', Number(e.target.value))}
                    className="input-field !py-2 !text-sm"
                  >
                    <option value={19}>19%</option>
                    <option value={7}>7%</option>
                    <option value={0}>0%</option>
                  </select>
                </div>
                <button
                  onClick={() => removeZeile(z.id)}
                  className="px-2 py-2 text-gray-600 hover:text-red-600 transition-colors shrink-0"
                  title="Position entfernen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addZeile}
            className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Position hinzufügen
          </button>

          {/* Multi-Ergebnis */}
          {multiErgebnis && multiErgebnis.zeilen.length > 0 && (
            <>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                      <th className="pb-2 font-medium">Position</th>
                      <th className="pb-2 font-medium text-right">Netto</th>
                      <th className="pb-2 font-medium text-right">MwSt</th>
                      <th className="pb-2 font-medium text-right">Brutto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {multiErgebnis.zeilen.map((z, i) => (
                      <tr key={i} className="text-gray-700 dark:text-gray-300">
                        <td className="py-1.5">{z.bezeichnung}</td>
                        <td className="py-1.5 text-right">{fmt(z.netto)} €</td>
                        <td className="py-1.5 text-right text-amber-600 dark:text-amber-400">{fmt(z.mwstBetrag)} € ({z.mwstSatz}%)</td>
                        <td className="py-1.5 text-right font-medium">{fmt(z.brutto)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="result-box">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Summe Netto</p>
                    <p className="text-xl font-bold">{fmt(multiErgebnis.summeNetto)} &euro;</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Summe MwSt</p>
                    <p className="text-xl font-bold text-accent-300">+ {fmt(multiErgebnis.summeMwSt)} &euro;</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Summe Brutto</p>
                    <p className="text-xl font-bold">{fmt(multiErgebnis.summeBrutto)} &euro;</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      </TabGroup>

      {(ergebnis || multiErgebnis) && (
        <AffiliateBox programId="lexware" context="mwst" />
      )}
    </div>
  );
}
