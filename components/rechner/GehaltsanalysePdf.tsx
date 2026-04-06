'use client';

import { useState } from 'react';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';

interface GehaltsanalysePdfProps {
  brutto: number;
  steuerklasse: number;
  bundeslandName: string;
  kirchensteuer: boolean;
  kirchensteuersatz: number;
  kinder: number;
  kvArt: 'gesetzlich' | 'privat';
  kvZusatzbeitrag: number;
  rvBefreit: boolean;
  ergebnis: BruttoNettoErgebnis;
}

export default function GehaltsanalysePdf({
  brutto,
  steuerklasse,
  bundeslandName,
  kirchensteuer,
  kirchensteuersatz,
  kinder,
  kvArt,
  kvZusatzbeitrag,
  rvBefreit,
  ergebnis,
}: GehaltsanalysePdfProps) {
  const [laden, setLaden] = useState(false);
  const [kiErklaerung, setKiErklaerung] = useState('');
  const [sichtbar, setSichtbar] = useState(false);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const pct = (n: number) =>
    brutto > 0 ? ((n / brutto) * 100).toFixed(1) : '0.0';

  const skLabels: Record<number, string> = {
    1: 'Steuerklasse 1 — Ledig',
    2: 'Steuerklasse 2 — Alleinerziehend',
    3: 'Steuerklasse 3 — Verheiratet (Alleinverdiener)',
    4: 'Steuerklasse 4 — Verheiratet (gleich)',
    5: 'Steuerklasse 5 — Verheiratet (Zweitverdiener)',
    6: 'Steuerklasse 6 — Zweitjob',
  };

  const datum = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Durchschnittsgehalt Deutschland 2024/25 (brutto)
  const durchschnittBrutto = 4323;
  const diffZumDurchschnitt = brutto - durchschnittBrutto;

  // Spar-Tipps basierend auf Eingaben
  function getSparTipps(): string[] {
    const tipps: string[] = [];

    if (kirchensteuer) {
      tipps.push(
        `Durch einen Kirchenaustritt sparen Sie ca. ${fmt(ergebnis.kirchensteuer)} € pro Monat bzw. ${fmt(ergebnis.kirchensteuer * 12)} € pro Jahr.`
      );
    }

    if (steuerklasse === 5) {
      tipps.push(
        'Prüfen Sie mit Ihrem Partner die Steuerklassen-Kombination 4/4 statt 3/5. Durch die Steuererklärung erhalten Sie eine Nachzahlung vermieden.'
      );
    }

    if (kinder === 0) {
      tipps.push(
        'Ohne Kinder zahlen Sie ab 23 Jahren einen PV-Zuschlag von 0,6 %. Mit Kindernachweis beim Arbeitgeber entfällt dieser Zuschlag.'
      );
    }

    if (brutto > 5512 && kvArt === 'gesetzlich') {
      tipps.push(
        'Ihr Gehalt liegt über der KV-Beitragsbemessungsgrenze. Eine private Krankenversicherung könnte günstiger sein — vergleichen Sie die Beiträge.'
      );
    }

    if (kvArt === 'gesetzlich' && kvZusatzbeitrag > 1.7) {
      tipps.push(
        `Ihr KV-Zusatzbeitrag (${kvZusatzbeitrag.toLocaleString('de-DE')} %) liegt über dem Durchschnitt (1,7 %). Ein Kassenwechsel könnte sich lohnen.`
      );
    }

    if (brutto < 2100 && brutto > 0) {
      tipps.push(
        'Bei diesem Gehalt könnte Anspruch auf Wohngeld oder andere Sozialleistungen bestehen. Prüfen Sie dies bei Ihrer Gemeinde.'
      );
    }

    if (!rvBefreit) {
      tipps.push(
        `Sie zahlen ${fmt(ergebnis.rentenversicherung)} € monatlich in die Rentenversicherung. Prüfen Sie, ob eine zusätzliche private Altersvorsorge sinnvoll ist.`
      );
    }

    return tipps.slice(0, 3);
  }

  async function handlePdfExport() {
    setLaden(true);

    // KI-Erklärung laden falls noch nicht vorhanden
    let erklaerung = kiErklaerung;
    if (!erklaerung) {
      try {
        const res = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rechner_name: 'Brutto-Netto-Rechner',
            eingaben: {
              bruttogehalt: brutto,
              steuerklasse,
              bundesland: bundeslandName,
              kirchensteuer,
              kinder,
              kvArt,
              kvZusatzbeitrag,
            },
            ergebnis: {
              nettogehalt: ergebnis.nettoMonat,
              lohnsteuer: ergebnis.lohnsteuer,
              solidaritaetszuschlag: ergebnis.solidaritaet,
              kirchensteuerBetrag: ergebnis.kirchensteuer,
              krankenversicherung: ergebnis.krankenversicherung,
              rentenversicherung: ergebnis.rentenversicherung,
              arbeitslosenversicherung: ergebnis.arbeitslosenversicherung,
              pflegeversicherung: ergebnis.pflegeversicherung,
              gesamtabzuegeProzent: ergebnis.abzuegeProzent,
            },
          }),
        });
        const data = await res.json();
        if (res.ok && data.explanation) {
          erklaerung = data.explanation;
          setKiErklaerung(erklaerung);
        }
      } catch {
        // Weiter ohne KI-Erklärung
      }
    }

    // Druckansicht anzeigen, dann drucken
    setSichtbar(true);

    // Warten bis DOM gerendert ist
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
        setSichtbar(false);
        setLaden(false);
      }, 100);
    });
  }

  const sparTipps = getSparTipps();

  const nettoPct = 100 - ergebnis.abzuegeProzent;
  const steuerPct = brutto > 0 ? (ergebnis.steuernGesamt / brutto) * 100 : 0;
  const sozialPct = brutto > 0 ? (ergebnis.sozialabgabenGesamt / brutto) * 100 : 0;

  return (
    <>
      {/* Trigger-Button */}
      <button
        onClick={handlePdfExport}
        disabled={laden || brutto <= 0}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white shadow-sm hover:shadow-md transition-all disabled:cursor-not-allowed print:hidden"
      >
        {laden ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Wird erstellt...
          </>
        ) : (
          <>📄 Gehaltsanalyse als PDF</>
        )}
      </button>

      {/* Druckansicht — nur sichtbar im Print-Modus */}
      {sichtbar && (
        <div
          id="gehaltsanalyse-pdf"
          className="fixed inset-0 z-[9999] bg-white overflow-auto print:static print:overflow-visible"
          style={{ display: 'block' }}
        >
          <div className="max-w-[210mm] mx-auto px-8 py-6 text-black text-[11pt] leading-relaxed">

            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-800 pb-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-extrabold text-blue-700">Rechen</span>
                  <span className="text-2xl font-extrabold text-emerald-600">fix</span>
                  <span className="text-sm text-gray-400">.de</span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="font-bold text-gray-800 text-base">Gehaltsanalyse</div>
                <div>erstellt am {datum}</div>
              </div>
            </div>

            {/* Eingaben-Tabelle */}
            <h2 className="text-lg font-bold text-gray-800 mb-3">Ihre Angaben</h2>
            <table className="w-full text-sm mb-6 border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500 w-1/2">Bruttogehalt (monatlich)</td>
                  <td className="py-2 font-semibold text-right">{fmt(brutto)} €</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Bruttogehalt (jährlich)</td>
                  <td className="py-2 font-semibold text-right">{fmt(brutto * 12)} €</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Steuerklasse</td>
                  <td className="py-2 font-semibold text-right">{skLabels[steuerklasse] || `Steuerklasse ${steuerklasse}`}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Bundesland</td>
                  <td className="py-2 font-semibold text-right">{bundeslandName}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Kirchensteuer</td>
                  <td className="py-2 font-semibold text-right">{kirchensteuer ? `Ja (${kirchensteuersatz} %)` : 'Nein'}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Kinderfreibeträge</td>
                  <td className="py-2 font-semibold text-right">{kinder === 0 ? 'Keine' : kinder.toLocaleString('de-DE')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Krankenversicherung</td>
                  <td className="py-2 font-semibold text-right">
                    {kvArt === 'gesetzlich' ? `Gesetzlich (Zusatzbeitrag ${kvZusatzbeitrag.toLocaleString('de-DE')} %)` : 'Privat'}
                  </td>
                </tr>
                {rvBefreit && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-500">Rentenversicherung</td>
                    <td className="py-2 font-semibold text-right">Befreit</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Ergebnis-Tabelle */}
            <h2 className="text-lg font-bold text-gray-800 mb-3">Ergebnis — Abzüge im Detail</h2>
            <table className="w-full text-sm mb-2 border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2 text-left text-gray-600 font-semibold">Position</th>
                  <th className="py-2 text-right text-gray-600 font-semibold">Betrag</th>
                  <th className="py-2 text-right text-gray-600 font-semibold w-16">Anteil</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 font-semibold">
                  <td className="py-2">Bruttogehalt</td>
                  <td className="py-2 text-right">{fmt(ergebnis.bruttoMonat)} €</td>
                  <td className="py-2 text-right text-gray-400">100 %</td>
                </tr>

                {/* Steuern */}
                <tr>
                  <td colSpan={3} className="pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Steuern
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Lohnsteuer</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.lohnsteuer)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.lohnsteuer)} %</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Solidaritätszuschlag</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.solidaritaet)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.solidaritaet)} %</td>
                </tr>
                {kirchensteuer && (
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 text-gray-600">Kirchensteuer ({kirchensteuersatz} %)</td>
                    <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.kirchensteuer)} €</td>
                    <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.kirchensteuer)} %</td>
                  </tr>
                )}

                {/* Sozialabgaben */}
                <tr>
                  <td colSpan={3} className="pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Sozialabgaben
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">{kvArt === 'privat' ? 'Private KV (AN-Anteil)' : 'Krankenversicherung'}</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.krankenversicherung)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.krankenversicherung)} %</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Rentenversicherung</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.rentenversicherung)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.rentenversicherung)} %</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Arbeitslosenversicherung</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.arbeitslosenversicherung)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.arbeitslosenversicherung)} %</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Pflegeversicherung</td>
                  <td className="py-1.5 text-right text-red-600">−{fmt(ergebnis.pflegeversicherung)} €</td>
                  <td className="py-1.5 text-right text-gray-400 text-xs">{pct(ergebnis.pflegeversicherung)} %</td>
                </tr>

                {/* Zusammenfassung */}
                <tr className="border-t-2 border-gray-300">
                  <td className="py-2 text-gray-500">Steuern gesamt</td>
                  <td className="py-2 text-right font-semibold text-red-600">−{fmt(ergebnis.steuernGesamt)} €</td>
                  <td className="py-2 text-right text-gray-400 text-xs">{steuerPct.toFixed(1)} %</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Sozialabgaben gesamt</td>
                  <td className="py-2 text-right font-semibold text-red-600">−{fmt(ergebnis.sozialabgabenGesamt)} €</td>
                  <td className="py-2 text-right text-gray-400 text-xs">{sozialPct.toFixed(1)} %</td>
                </tr>
                <tr className="border-b-2 border-gray-800 text-lg">
                  <td className="py-3 font-bold">Nettogehalt</td>
                  <td className="py-3 text-right font-bold text-green-700">{fmt(ergebnis.nettoMonat)} €</td>
                  <td className="py-3 text-right font-bold text-green-700 text-sm">{nettoPct.toFixed(1)} %</td>
                </tr>
              </tbody>
            </table>

            <div className="flex gap-6 text-xs text-gray-500 mb-6">
              <span>Netto/Jahr: <strong className="text-gray-700">{fmt(ergebnis.nettoJahr)} €</strong></span>
              <span>Netto/Stunde: <strong className="text-gray-700">~{fmt(ergebnis.nettoProStunde)} €</strong></span>
              <span>Abzüge: <strong className="text-gray-700">{ergebnis.abzuegeProzent} %</strong></span>
            </div>

            {/* Visueller Balken */}
            <div className="mb-6">
              <div className="flex h-7 rounded overflow-hidden text-xs font-semibold text-white pdf-balken">
                <div className="flex items-center justify-center" style={{ width: `${nettoPct}%`, backgroundColor: '#22c55e' }}>
                  {nettoPct.toFixed(0)}% Netto
                </div>
                <div className="flex items-center justify-center" style={{ width: `${steuerPct}%`, backgroundColor: '#f87171' }}>
                  {steuerPct >= 5 ? `${steuerPct.toFixed(0)}%` : ''}
                </div>
                <div className="flex items-center justify-center" style={{ width: `${sozialPct}%`, backgroundColor: '#fbbf24' }}>
                  {sozialPct >= 5 ? `${sozialPct.toFixed(0)}%` : ''}
                </div>
              </div>
              <div className="flex gap-4 text-xs text-gray-500 mt-1.5">
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded" style={{ backgroundColor: '#22c55e' }} /> Netto</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded" style={{ backgroundColor: '#f87171' }} /> Steuern</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded" style={{ backgroundColor: '#fbbf24' }} /> Sozialabgaben</span>
              </div>
            </div>

            {/* Vergleich mit Durchschnitt */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-sm text-gray-800 mb-2">Vergleich mit dem Durchschnitt</h3>
              <p className="text-sm text-gray-600">
                Das durchschnittliche Bruttogehalt in Deutschland liegt bei ca. <strong>{durchschnittBrutto.toLocaleString('de-DE')} €/Monat</strong> (Vollzeit, 2024).{' '}
                {diffZumDurchschnitt > 0 ? (
                  <>Ihr Gehalt liegt <strong className="text-green-700">{fmt(diffZumDurchschnitt)} € über</strong> dem Durchschnitt.</>
                ) : diffZumDurchschnitt < 0 ? (
                  <>Ihr Gehalt liegt <strong className="text-red-600">{fmt(Math.abs(diffZumDurchschnitt))} € unter</strong> dem Durchschnitt.</>
                ) : (
                  <>Ihr Gehalt entspricht exakt dem Durchschnitt.</>
                )}
              </p>
            </div>

            {/* KI-Erklärung */}
            {kiErklaerung && (
              <div className="border border-blue-200 rounded-lg p-4 mb-6 pdf-ki-box">
                <h3 className="font-bold text-sm text-blue-800 mb-2 flex items-center gap-1.5">
                  <span>🤖</span> KI-Erklärung
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{kiErklaerung}</p>
              </div>
            )}

            {/* Spar-Tipps */}
            {sparTipps.length > 0 && (
              <div className="border border-amber-200 rounded-lg p-4 mb-6 pdf-tipps-box">
                <h3 className="font-bold text-sm text-amber-800 mb-2">💡 Persönliche Spar-Tipps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  {sparTipps.map((tipp, i) => (
                    <li key={i} className="leading-relaxed">{tipp}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Footer */}
            <div className="border-t-2 border-gray-300 pt-3 mt-8 flex justify-between text-xs text-gray-400">
              <span>Erstellt auf rechenfix.de — kostenlose Online-Rechner</span>
              <span>Alle Angaben ohne Gewähr. Stand {new Date().getFullYear()}.</span>
            </div>
          </div>

          {/* Schließen-Button (nur am Bildschirm) */}
          <button
            onClick={() => { setSichtbar(false); setLaden(false); }}
            className="fixed top-4 right-4 z-[10000] bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors print:hidden"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
