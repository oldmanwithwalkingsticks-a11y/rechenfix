'use client';

import { useState, useMemo, useCallback } from 'react';
import { BBG_KV_MONAT, SV_RECHENSTAND } from '@/lib/berechnungen/brutto-netto';
import { MINDESTLOHN, getMinijobGrenzeMonat, mindestlohnMonatVollzeit, unterMindestlohnBeiVollzeit } from '@/lib/berechnungen/mindestlohn';

interface SchnellCheckProps {
  brutto: number;
  steuerklasse: number;
  kirchensteuer: boolean;
  kirchensteuersatz: number;
  kinder: number;
  kirchensteuerBetrag: number;
}

interface Tipp {
  id: string;
  text: string;
}

export default function SchnellCheck({
  brutto,
  steuerklasse,
  kirchensteuer,
  kirchensteuersatz,
  kinder,
  kirchensteuerBetrag,
}: SchnellCheckProps) {
  const [geschlossen, setGeschlossen] = useState<Set<string>>(new Set());

  const schliessen = useCallback((id: string) => {
    setGeschlossen(prev => new Set(prev).add(id));
  }, []);

  const alleTipps = useMemo<Tipp[]>(() => {
    const tipps: Tipp[] = [];

    // W196: Mindestlohn zuerst — sichtbar sind höchstens zwei Tipps, und ein Lohn unter dem Mindestlohn
    // wiegt schwerer als jeder Spartipp (vorher stand er an letzter Stelle und fiel z. B. bei Kirchensteuer
    // und PV-Zuschlag weg). Schwelle Mindestlohn × 40 × 52 ÷ 12 = 2.409,33 € statt × 160 − 20 = 2.204 €.
    // Im Minijob-Bereich kein Hinweis: Dort wäre eine 40-Stunden-Woche ohnehin unzulässig.
    if (brutto > getMinijobGrenzeMonat(SV_RECHENSTAND) && unterMindestlohnBeiVollzeit(brutto, MINDESTLOHN)) {
      const zwei = (x: number) => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      tipps.push({
        id: 'mindestlohn',
        text: `Bei einer 40-Stunden-Woche läge dieses Gehalt unter dem gesetzlichen Mindestlohn: ${zwei(MINDESTLOHN)} € × 40 × 52 ÷ 12 = ${zwei(mindestlohnMonatVollzeit(MINDESTLOHN))} € im Monat. Arbeiten Sie Vollzeit, prüfen Sie Ihren Arbeitsvertrag.`,
      });
    }

    // Kirchensteuer aktiviert → konkreten Betrag anzeigen
    if (kirchensteuer && brutto > 0 && kirchensteuerBetrag > 0) {
      const betrag = kirchensteuerBetrag.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      tipps.push({
        id: 'kirchensteuer',
        text: `Kirchensteuer (${kirchensteuersatz}%): ca. ${betrag} €/Monat. Ein Kirchenaustritt spart diesen Betrag.`,
      });
    }

    // Steuerklasse 5 → Hinweis auf SK 4/4
    if (steuerklasse === 5) {
      tipps.push({
        id: 'sk5',
        text: 'Steuerklasse 5 hat die höchsten Abzüge. Prüfen Sie die Kombination 4/4 — das kann sich bei ähnlichen Gehältern lohnen.',
      });
    }

    // Steuerklasse 6 → Hinweis auf höchste Abzüge
    if (steuerklasse === 6) {
      tipps.push({
        id: 'sk6',
        text: 'Steuerklasse 6 gilt für den Zweitjob und hat die höchsten Abzüge — kein Grundfreibetrag.',
      });
    }

    // Brutto über KV-Beitragsbemessungsgrenze 2026 (5.812,50 €/Monat)
    if (brutto > BBG_KV_MONAT) {
      tipps.push({
        id: 'kvgrenze',
        text: 'Ihr Gehalt liegt über der KV-Beitragsbemessungsgrenze (5.812,50 €). KV-Beiträge steigen ab hier nicht weiter — eine private KV könnte sich lohnen.',
      });
    }

    // Keine Kinder und implizit über 23 → PV-Zuschlag (im Minijob zahlt der AN keine PV, W163)
    if (kinder === 0 && brutto > getMinijobGrenzeMonat(SV_RECHENSTAND)) {
      tipps.push({
        id: 'pvzuschlag',
        text: 'Ohne Kinder und ab 23 Jahren zahlen Sie einen PV-Zuschlag von 0,6%. Mit Kindernachweis entfällt dieser.',
      });
    }

    // Brutto unter 2100 → Wohngeld-Hinweis
    if (brutto > 0 && brutto < 2100) {
      tipps.push({
        id: 'wohngeld',
        text: 'Bei diesem Gehalt besteht möglicherweise Anspruch auf Wohngeld. Prüfen Sie dies bei Ihrer Gemeinde.',
      });
    }

    return tipps;
  }, [brutto, steuerklasse, kirchensteuer, kirchensteuersatz, kinder, kirchensteuerBetrag]);

  // Nur nicht-geschlossene Tipps, maximal 2
  const sichtbareTipps = alleTipps
    .filter(t => !geschlossen.has(t.id))
    .slice(0, 2);

  if (sichtbareTipps.length === 0) return null;

  return (
    <div className="space-y-2 mb-5 no-print">
      {sichtbareTipps.map(tipp => (
        <div
          key={tipp.id}
          className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-700/30 rounded-xl px-4 py-3 animate-in fade-in duration-300"
        >
          <span className="text-base shrink-0 mt-0.5">💡</span>
          <p className="flex-1 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            {tipp.text}
          </p>
          <button
            onClick={() => schliessen(tipp.id)}
            className="shrink-0 mt-0.5 p-0.5 rounded-lg text-amber-400 dark:text-amber-500 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors"
            aria-label="Tipp schließen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
