'use client';

import { useState, useMemo } from 'react';
import { berechneNettoZuBrutto, berechneBruttoZuNetto, berechneMultiMwSt } from '@/lib/berechnungen/mwst';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import AiExplain from '@/components/rechner/AiExplain';
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
  const [kopierFehler, setKopierFehler] = useState(false);
  const [geteilt, setGeteilt] = useState(false);
  const [pdfLaedt, setPdfLaedt] = useState(false);

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

  async function handleCopy() {
    if (!ergebnis) return;
    const text = tab === 'netto-brutto'
      ? `Netto: ${fmt(ergebnis.netto)} € | MwSt: ${fmt(ergebnis.mwstBetrag)} € | Brutto: ${fmt(ergebnis.brutto)} €`
      : `Brutto: ${fmt(ergebnis.brutto)} € | MwSt: ${fmt(ergebnis.mwstBetrag)} € | Netto: ${fmt(ergebnis.netto)} €`;
    try {
      await navigator.clipboard.writeText(text);
      setKopierFehler(false);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      setKopiert(false);
      setKopierFehler(true);
      setTimeout(() => setKopierFehler(false), 3000);
    }
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

  // Klick-Wrapper: lädt die PDF-Toolchain erst bei Bedarf nach und zeigt solange einen Ladezustand.
  const handlePdf = async () => {
    if (pdfLaedt) return;
    setPdfLaedt(true);
    try {
      await erzeugePdf();
    } finally {
      setPdfLaedt(false);
    }
  };

  const erzeugePdf = async () => {
    if (!ergebnis) return;
    // Dynamischer Import: jsPDF + autoTable + qrcode + Logo-Base64 bleiben aus dem Initial-Bundle.
    const [{ jsPDF }, autoTableMod, QRCodeMod, { RECHENFIX_LOGO_PNG }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
      import('qrcode'),
      import('@/lib/pdf-logo'),
    ]);
    const autoTable = autoTableMod.default;
    const QRCode = QRCodeMod.default ?? QRCodeMod;

    const url = 'https://www.rechenfix.de/finanzen/mwst-rechner';
    const heute = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    let qrDataUrl = '';
    try { qrDataUrl = await QRCode.toDataURL(url, { margin: 1, width: 240 }); } catch { qrDataUrl = ''; }

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const seiteB = 210;
    const randX = 18;

    const logoB = 62;
    const logoH = logoB / 4.381;
    try { doc.addImage(RECHENFIX_LOGO_PNG, 'PNG', randX, 14, logoB, logoH); } catch { /* ignore */ }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Erstellt am ${heute}`, seiteB - randX, 20, { align: 'right' });

    let y = 14 + logoH + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(30, 30, 30);
    doc.text('Mehrwertsteuer-Berechnung', randX, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(90);
    const richtung = tab === 'netto-brutto' ? 'Netto → Brutto' : 'Brutto → Netto';
    doc.text(`Berechnung: ${richtung}   |   MwSt-Satz: ${aktiverSatz} %`, randX, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [['Position', 'Betrag']],
      body: [
        ['Nettobetrag', `${fmt(ergebnis.netto)} €`],
        [`Mehrwertsteuer (${aktiverSatz} %)`, `+ ${fmt(ergebnis.mwstBetrag)} €`],
        [{ content: 'Bruttobetrag', styles: { fontStyle: 'bold' } }, { content: `${fmt(ergebnis.brutto)} €`, styles: { fontStyle: 'bold', textColor: [21, 128, 61] } }],
      ],
      theme: 'striped',
      headStyles: { fillColor: [29, 78, 216], textColor: 255, fontStyle: 'bold' },
      columnStyles: { 1: { halign: 'right' } },
      margin: { left: randX, right: randX },
      styles: { fontSize: 11, cellPadding: 3 },
    });
    const yEnd = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

    if (qrDataUrl) { try { doc.addImage(qrDataUrl, 'PNG', randX, yEnd, 26, 26); } catch { /* ignore */ } }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text('Werte anpassen oder neu berechnen:', randX + 32, yEnd + 9);
    doc.setTextColor(29, 78, 216);
    doc.text(url, randX + 32, yEnd + 15);

    doc.setTextColor(140);
    doc.setFontSize(8);
    doc.text('Unverbindliche Berechnung. Keine Steuerberatung. Quelle: rechenfix.de', randX, 289, { maxWidth: seiteB - 2 * randX });

    doc.save('rechenfix-mwst-berechnung.pdf');

    try {
      fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'pdf', rechner: 'mwst-rechner' }), cache: 'no-store' }).catch(() => {});
    } catch { /* ignore */ }
  };

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
              {!istCustom && mwstSatz === 7 && (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  ℹ️ <strong>Hinweis:</strong> Für Gastronomie-Restaurantumsätze (verzehrfertige Speisen vor Ort) gilt seit 01.01.2024 wieder 19 %. Der reduzierte Satz 7 % greift weiter für Grundnahrungsmittel, Bücher, Hotelübernachtungen, öffentlichen Personennahverkehr u. a. (§ 12 Abs. 2 UStG).
                </p>
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

              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <button
                  onClick={handlePdf}
                  disabled={pdfLaedt}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                  {pdfLaedt ? 'PDF wird erstellt …' : 'Als PDF speichern'}
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-500/40 px-3.5 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400/40 dark:text-primary-300 dark:hover:bg-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2m-6-12h6a2 2 0 012 2v6m-8-8V3m0 2h4" /></svg>
                  {kopiert ? '✓ Kopiert' : kopierFehler ? 'Fehler' : 'Kopieren'}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-500/40 px-3.5 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400/40 dark:text-primary-300 dark:hover:bg-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  {geteilt ? '✓ Geteilt' : 'Teilen'}
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
    </div>
  );
}
