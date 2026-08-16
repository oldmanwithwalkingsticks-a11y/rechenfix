'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  berechneProzentwert,
  berechneProzentsatz,
  berechneGrundwert,
  berechneAufschlag,
  berechneAbschlag,
} from '@/lib/berechnungen/prozent';
import type { ProzentErgebnis } from '@/lib/berechnungen/prozent';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import TabGroup from '@/components/ui/TabGroup';
import { useOptInStorage } from '@/hooks/useOptInStorage';

type Modus = 'prozentwert' | 'prozentsatz' | 'grundwert' | 'aufschlag' | 'abschlag';

const QUICK_VALUES = [5, 10, 15, 19, 25, 50];

interface HistoryEintrag {
  label: string;
  ergebnis: string;
  modus: string;
  zeit: string;
}

const HISTORY_KEY = 'rechenfix_prozent_history';
const HISTORY_CONSENT_KEY = 'rechenfix-verlauf-einwilligung';
const MAX_HISTORY = 5;

/**
 * Der Ausgangswert liegt im Modul-Scope, damit er bei jedem Rendern dieselbe
 * Referenz hat — sonst laufen die Effekte im Speicher-Hook unnoetig erneut.
 */
const LEERER_VERLAUF: HistoryEintrag[] = [];

interface ModusInfo {
  key: Modus;
  label: string;
  kurz: string;
  label1: string;
  label2: string;
  default1: string;
  default2: string;
  einheit1?: string;
  einheit2?: string;
}

const MODI: ModusInfo[] = [
  { key: 'prozentwert', label: 'Wie viel sind X % von Y?', kurz: 'Prozentwert', label1: 'Grundwert', label2: 'Prozentsatz', default1: '200', default2: '19', einheit2: '%' },
  { key: 'prozentsatz', label: 'Wie viel % sind X von Y?', kurz: 'Prozentsatz', label1: 'Prozentwert', label2: 'Grundwert', default1: '38', default2: '200' },
  { key: 'grundwert', label: 'X sind Y %  von …?', kurz: 'Grundwert', label1: 'Prozentwert', label2: 'Prozentsatz', default1: '38', default2: '19', einheit2: '%' },
  { key: 'aufschlag', label: 'Wert + X % Aufschlag', kurz: 'Aufschlag', label1: 'Ausgangswert', label2: 'Aufschlag', default1: '200', default2: '19', einheit2: '%' },
  { key: 'abschlag', label: 'Wert − X % Rabatt', kurz: 'Rabatt', label1: 'Ausgangswert', label2: 'Rabatt', default1: '200', default2: '20', einheit2: '%' },
];

function fmtDisplay(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
}

export default function Prozentrechner() {
  const [modus, setModus] = useState<Modus>('prozentwert');
  const initial = MODI.find(m => m.key === 'prozentwert')!;
  const [wert1, setWert1] = useState(initial.default1);
  const [wert2, setWert2] = useState(initial.default2);
  // Der Verlauf wird nur auf dem Geraet abgelegt, wenn der Nutzer es einschaltet
  // (§ 25 Abs. 2 Nr. 2 TDDDG). Ohne Schalter besteht er allein im Arbeitsspeicher
  // der laufenden Sitzung. Begruendung im Kopf von hooks/useOptInStorage.ts.
  const {
    aktiv: verlaufGespeichert,
    bereit: verlaufBereit,
    daten: history,
    setzeDaten: setHistory,
    einschalten: verlaufEinschalten,
    ausschalten: verlaufAusschalten,
  } = useOptInStorage<HistoryEintrag[]>({
    einwilligungsSchluessel: HISTORY_CONSENT_KEY,
    datenSchluessel: HISTORY_KEY,
    initialwert: LEERER_VERLAUF,
  });

  const n1 = parseDeutscheZahl(wert1);
  const n2 = parseDeutscheZahl(wert2);

  const aktuellerModus = MODI.find(m => m.key === modus)!;

  const handleModusChange = (key: Modus) => {
    const m = MODI.find(x => x.key === key)!;
    setModus(key);
    setWert1(m.default1);
    setWert2(m.default2);
  };

  const berechnung = useMemo<ProzentErgebnis | null>(() => {
    // Null bei komplett leeren Eingaben
    if (wert1.trim() === '' || wert2.trim() === '') return null;
    switch (modus) {
      case 'prozentwert': return berechneProzentwert(n1, n2);
      case 'prozentsatz': return berechneProzentsatz(n1, n2);
      case 'grundwert': return berechneGrundwert(n1, n2);
      case 'aufschlag': return berechneAufschlag(n1, n2);
      case 'abschlag': return berechneAbschlag(n1, n2);
    }
  }, [n1, n2, modus, wert1, wert2]);

  const ergebnisLabel = useMemo(() => {
    if (!berechnung) return '';
    switch (modus) {
      case 'prozentwert': return `${fmtDisplay(n2)} % von ${fmtDisplay(n1)}`;
      case 'prozentsatz': return `${fmtDisplay(n1)} von ${fmtDisplay(n2)} sind`;
      case 'grundwert':   return `${fmtDisplay(n1)} sind ${fmtDisplay(n2)} % von`;
      case 'aufschlag':   return `${fmtDisplay(n1)} + ${fmtDisplay(n2)} % Aufschlag`;
      case 'abschlag':    return `${fmtDisplay(n1)} − ${fmtDisplay(n2)} % Rabatt`;
    }
  }, [berechnung, modus, n1, n2]);

  const ergebnisEinheit = modus === 'prozentsatz' ? ' %' : '';

  // History speichern wenn neues Ergebnis
  const saveToHistory = useCallback((b: ProzentErgebnis, label: string) => {
    const eintrag: HistoryEintrag = {
      label,
      ergebnis: fmtDisplay(b.ergebnis) + ergebnisEinheit,
      modus: aktuellerModus.kurz,
      zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => [eintrag, ...prev.filter(h => h.label !== label)].slice(0, MAX_HISTORY));
  }, [ergebnisEinheit, aktuellerModus.kurz, setHistory]);

  useEffect(() => {
    if (berechnung && ergebnisLabel) {
      saveToHistory(berechnung, ergebnisLabel);
    }
  }, [berechnung, ergebnisLabel, saveToHistory]);

  function handleQuick(val: number) {
    setWert2(val.toString());
  }

  const ergebnisText = berechnung
    ? `${ergebnisLabel} = ${fmtDisplay(berechnung.ergebnis)}${ergebnisEinheit} | Modus: ${aktuellerModus.kurz}`
    : '';

  return (
    <div>
      {/* 1: Modus-Auswahl */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Was möchten Sie berechnen?
        </h2>
      </div>
      <TabGroup
        tabs={MODI.map(m => ({ id: m.key, label: m.label }))}
        activeId={modus}
        onChange={(id) => handleModusChange(id as Modus)}
        ariaLabel="Rechenmodus wählen"
      >

      {/* 2: Werte */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Werte eingeben
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{aktuellerModus.label1}</label>
            <NummerEingabe
              value={wert1}
              onChange={setWert1}
              placeholder={aktuellerModus.default1}
              einheit={aktuellerModus.einheit1}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{aktuellerModus.label2}</label>
            <NummerEingabe
              value={wert2}
              onChange={setWert2}
              placeholder={aktuellerModus.default2}
              einheit={aktuellerModus.einheit2}
            />
            {aktuellerModus.einheit2 === '%' && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {QUICK_VALUES.map(val => (
                  <button
                    key={val}
                    onClick={() => handleQuick(val)}
                    className={`min-h-[32px] px-3 rounded-lg text-xs font-medium transition-all ${
                      wert2 === val.toString()
                        ? 'bg-accent-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {val} %
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      {berechnung && (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">{ergebnisLabel}</p>
            <p className="text-5xl font-bold">
              {fmtDisplay(berechnung.ergebnis)}{ergebnisEinheit}
            </p>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Rechenweg</h2>
            <div className="space-y-1">
              {berechnung.rechenweg.map((schritt, i) => (
                <p key={i} className={`text-sm font-mono ${
                  i === berechnung.rechenweg.length - 1
                    ? 'font-bold text-primary-600 dark:text-primary-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {i < berechnung.rechenweg.length - 1 && <span className="text-gray-600 dark:text-gray-500 mr-2">→</span>}
                  {i === berechnung.rechenweg.length - 1 && <span className="text-primary-600 mr-2">=</span>}
                  {schritt}
                </p>
              ))}
            </div>
          </div>

          <CrossLink href="/alltag/rabattrechner" emoji="🏷️" text="Rabatte berechnen — Endpreis nach %" />
          <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="Mehrwertsteuer berechnen (brutto/netto)" />
          <CrossLink href="/mathe/prozentuale-veraenderung-rechner" emoji="📈" text="Prozentuale Zu-/Abnahme berechnen" />
          <CrossLink href="/alltag/dreisatz-rechner" emoji="➗" text="Dreisatz berechnen" />

          <ErgebnisAktionen
            ergebnisText={ergebnisText}
            seitenTitel="Prozentrechner"
          />

          <AiExplain
            rechnerName="Prozentrechner"
            eingaben={{
              modus: aktuellerModus.label,
              [aktuellerModus.label1]: `${fmtDisplay(n1)}${aktuellerModus.einheit1 ? ' ' + aktuellerModus.einheit1 : ''}`,
              [aktuellerModus.label2]: `${fmtDisplay(n2)}${aktuellerModus.einheit2 ? ' ' + aktuellerModus.einheit2 : ''}`,
            }}
            ergebnis={{
              ergebnis: `${fmtDisplay(berechnung.ergebnis)}${ergebnisEinheit}`,
              rechenweg: berechnung.rechenweg.join(' → '),
            }}
          />
        </>
      )}

      </TabGroup>

      {/* Letzte Berechnungen */}
      {history.length > 0 && (
        <div className="mt-6">
          {history.length > 1 && (
            <>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Letzte Berechnungen</h3>
          <div className="space-y-1.5 mb-3">
            {history.slice(1).map((h, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  <span className="text-xs text-gray-600 dark:text-gray-500 mr-2">{h.modus}:</span>
                  {h.label} = <strong className="text-gray-800 dark:text-gray-200">{h.ergebnis}</strong>
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-500 ml-2 shrink-0">{h.zeit}</span>
              </div>
            ))}
          </div>
            </>
          )}

          {/* Opt-in-Schalter. Ohne ihn bleibt der Verlauf im Arbeitsspeicher und
              endet mit der Sitzung — auf dem Geraet wird dann nichts abgelegt. */}
          {verlaufBereit && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Rechenverlauf auf diesem Gerät speichern
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {verlaufGespeichert
                      ? 'Der Verlauf bleibt nach dem Schließen des Browsers erhalten. Beim Abschalten werden die gespeicherten Einträge gelöscht.'
                      : 'Derzeit wird nichts gespeichert — der Verlauf endet mit dieser Sitzung. Eingeschaltet bleibt er auf diesem Gerät erhalten und verlässt es nicht.'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={verlaufGespeichert}
                  aria-label="Rechenverlauf auf diesem Gerät speichern"
                  onClick={verlaufGespeichert ? verlaufAusschalten : verlaufEinschalten}
                  className={`relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                    verlaufGespeichert ? 'bg-green-600' : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      verlaufGespeichert ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
