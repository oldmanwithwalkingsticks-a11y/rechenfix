'use client';

import { useState, useRef, useEffect } from 'react';
import { inkrement } from '@/lib/berechnungs-zaehler';

export interface PdfZeile {
  label: string;
  wert: string;
  // optional: diese Zeile hervorheben (z. B. das Endergebnis)
  highlight?: boolean;
}
export interface PdfAbschnitt {
  titel: string;           // Tabellen-Überschrift, z. B. "Steuern"
  wertSpalte?: string;     // Kopf der Wert-Spalte, Default "Wert"
  zeilen: PdfZeile[];
}

interface Props {
  ergebnisText: string;
  seitenTitel?: string;
  drucken?: boolean;
  pdfDaten?: PdfAbschnitt[];   // NEU: optional, für reiches PDF
}

// `drucken` bleibt in Props (Rückwärtskompatibilität), steuert aber nicht mehr die
// Sichtbarkeit des PDF-Buttons — der ist jetzt immer da. Bewusst nicht destrukturiert
// (sonst unused-var-Lint-Fehler), Aufrufer dürfen die Prop weiterhin übergeben.
export default function ErgebnisAktionen({ ergebnisText, seitenTitel, pdfDaten }: Props) {
  const [kopiert, setKopiert] = useState(false);
  const [kopierFehler, setKopierFehler] = useState(false);
  const [linkKopiert, setLinkKopiert] = useState(false);
  const [teilenOffen, setTeilenOffen] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [pdfLaedt, setPdfLaedt] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const letzterText = useRef('');
  const hatGeaendert = useRef(false);

  // Zähler erhöhen wenn sich das Ergebnis ändert
  useEffect(() => {
    if (ergebnisText && ergebnisText !== letzterText.current) {
      letzterText.current = ergebnisText;
      inkrement();
    }
  }, [ergebnisText]);

  // Debounced aria-live: Screenreader-Ansage 750ms nach letzter Änderung
  useEffect(() => {
    if (!ergebnisText) {
      setLiveText('');
      return;
    }
    // Erste Berechnung (Seitenaufruf) nicht ansagen
    if (!hatGeaendert.current) {
      hatGeaendert.current = true;
      return;
    }
    const timer = setTimeout(() => {
      const prefix = seitenTitel ? `${seitenTitel}: ` : '';
      setLiveText(prefix + ergebnisText);
    }, 750);
    return () => clearTimeout(timer);
  }, [ergebnisText, seitenTitel]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTeilenOffen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const text = `${ergebnisText} — rechenfix.de`;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const titel = seitenTitel || 'Berechnung auf Rechenfix.de';

  const handleKopieren = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setKopierFehler(false);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      // Clipboard-API kann fehlschlagen (fehlende Permission, unsichere Origin).
      // Sichtbares Feedback statt still scheitern.
      setKopiert(false);
      setKopierFehler(true);
      setTimeout(() => setKopierFehler(false), 3000);
    }
  };

  const handleLinkKopieren = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setLinkKopiert(true);
      setTeilenOffen(false);
      setTimeout(() => setLinkKopiert(false), 2000);
    } catch { /* ignore */ }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
    setTeilenOffen(false);
  };

  const handleEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(titel)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank');
    setTeilenOffen(false);
  };

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
    // Dynamischer Import: jsPDF + autoTable + qrcode + Logo-Base64 bleiben aus dem Initial-Bundle.
    const [{ jsPDF }, autoTableMod, QRCodeMod, { RECHENFIX_LOGO_PNG }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
      import('qrcode'),
      import('@/lib/pdf-logo'),
    ]);
    const autoTable = autoTableMod.default;
    const QRCode = QRCodeMod.default ?? QRCodeMod;

    const url = typeof window !== 'undefined' ? window.location.href : 'https://www.rechenfix.de';
    const titel = seitenTitel || 'Berechnung auf Rechenfix.de';
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
    doc.text(titel, randX, y, { maxWidth: seiteB - 2 * randX });
    y += 8;
    doc.setDrawColor(220);
    doc.setLineWidth(0.4);
    doc.line(randX, y, seiteB - randX, y);
    y += 10;

    if (pdfDaten && pdfDaten.length > 0) {
      // Reiche Darstellung: eine autoTable pro Abschnitt
      for (const abschnitt of pdfDaten) {
        autoTable(doc, {
          startY: y,
          head: [[abschnitt.titel, abschnitt.wertSpalte || 'Wert']],
          body: abschnitt.zeilen.map((z) =>
            z.highlight
              ? [
                  { content: z.label, styles: { fontStyle: 'bold' } },
                  { content: z.wert, styles: { fontStyle: 'bold', textColor: [21, 128, 61] } },
                ]
              : [z.label, z.wert]
          ),
          theme: 'striped',
          headStyles: { fillColor: [29, 78, 216], textColor: 255, fontStyle: 'bold' },
          columnStyles: { 1: { halign: 'right' } },
          margin: { left: randX, right: randX },
          styles: { fontSize: 10, cellPadding: 2.5 },
        });
        y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
      }
      y += 7;
    } else {
      // Fallback: einfacher Ergebnistext (bisheriges Verhalten)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      const zeilen = doc.splitTextToSize(ergebnisText, seiteB - 2 * randX);
      doc.text(zeilen, randX, y);
      y += zeilen.length * 7 + 12;
    }

    if (qrDataUrl) { try { doc.addImage(qrDataUrl, 'PNG', randX, y, 26, 26); } catch { /* ignore */ } }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text('Rechner erneut öffnen oder Werte anpassen:', randX + 32, y + 9);
    doc.setTextColor(29, 78, 216);
    doc.text(url, randX + 32, y + 15, { maxWidth: seiteB - randX - 32 - randX });

    doc.setTextColor(140);
    doc.setFontSize(8);
    doc.text(
      'Unverbindliche Berechnung auf Basis der Werte 2026. Keine Steuer-, Rechts- oder Finanzberatung. Quelle: rechenfix.de',
      randX, 289, { maxWidth: seiteB - 2 * randX },
    );

    const dateiName = 'rechenfix-' + titel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) + '.pdf';
    doc.save(dateiName || 'rechenfix-berechnung.pdf');

    // Fire-and-forget: erfolgreichen Download zählen (rechner = seitenTitel)
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pdf', rechner: titel }),
        cache: 'no-store',
      }).catch(() => {});
    } catch { /* ignore */ }
  };

  return (
    <div className="flex flex-wrap gap-2 no-print">
      {/* Screenreader-Ansage bei Ergebnis-Änderung (WCAG 4.1.3) */}
      <div aria-live="polite" aria-atomic="true" role="status" className="sr-only">
        {liveText}
      </div>
      {/* Screenreader-Ansage bei Copy-Aktion (Prompt 88) */}
      <span aria-live="polite" className="sr-only">
        {kopiert ? 'Ergebnis wurde in die Zwischenablage kopiert.' : kopierFehler ? 'Kopieren fehlgeschlagen. Bitte manuell markieren und kopieren.' : ''}
      </span>
      {/* Als PDF speichern — Primär-Aktion (immer sichtbar) */}
      <button
        onClick={handlePdf}
        disabled={pdfLaedt}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
        {pdfLaedt ? 'PDF wird erstellt …' : 'Als PDF speichern'}
      </button>
      {/* Kopieren */}
      <button
        onClick={handleKopieren}
        aria-label={kopiert ? 'Kopiert' : kopierFehler ? 'Kopieren fehlgeschlagen' : 'Ergebnis kopieren'}
        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
          kopiert
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
            : kopierFehler
              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {kopiert ? (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Kopiert! ✓</>
        ) : kopierFehler ? (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>Fehler — bitte manuell kopieren</>
        ) : (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Ergebnis kopieren</>
        )}
      </button>

      {/* Teilen Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setTeilenOffen(!teilenOffen)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Teilen
          <svg className={`w-3 h-3 transition-transform ${teilenOffen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>

        {teilenOffen && (
          <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden min-w-[180px]">
            <button onClick={handleWhatsApp} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5">
              <span className="text-base">💬</span>WhatsApp
            </button>
            <button onClick={handleEmail} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5 border-t border-gray-50 dark:border-gray-700">
              <span className="text-base">✉️</span>E-Mail
            </button>
            <button onClick={handleLinkKopieren} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5 border-t border-gray-50 dark:border-gray-700">
              <span className="text-base">{linkKopiert ? '✅' : '🔗'}</span>{linkKopiert ? 'Link kopiert!' : 'Link kopieren'}
            </button>
          </div>
        )}
      </div>

      {/* Feedback */}
      <a
        href="https://www.rechenfix.de/feedback"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
        Feedback
      </a>
    </div>
  );
}
