'use client';

import Link from 'next/link';
import { useMounted } from '@/lib/hooks/useMounted';
import { MINDESTLOHN } from '@/lib/berechnungen/mindestlohn';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';

// Mindestlohn-Tipp: Brutto dynamisch aus MINDESTLOHN, Netto live aus zentraler Lib
// (SK I, kinderlos, NRW, GKV mit Durchschnitts-Zusatzbeitrag, ohne Kirchensteuer).
// So läuft der Tipp automatisch beim 01.01.2027-Wechsel auf 14,60 € mit.
const mindestlohnBrutto = Math.round(MINDESTLOHN * 40 * 4.33);
const mindestlohnNetto = Math.round(
  berechneBruttoNetto({
    bruttoMonat: mindestlohnBrutto,
    steuerklasse: 1,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  }).nettoMonat,
);

const tipps = [
  {
    text: 'Verheiratete mit ungleichem Einkommen können durch die Steuerklassen-Kombination III/V monatlich Liquidität gewinnen. Die endgültige Jahressteuer bleibt durch die Steuererklärung aber identisch.',
    link: '/finanzen/brutto-netto-rechner',
    linkText: 'Zum Brutto-Netto-Rechner →',
  },
  {
    text: 'Vorausschauendes Fahren senkt den Spritverbrauch je nach Fahrstil um 5 bis 15 %. Die größten Einsparungen bringen frühes Hochschalten, konstantes Tempo und das Vermeiden von Vollgas-Beschleunigung.',
    link: '/auto/spritkosten-rechner',
    linkText: 'Zum Spritkosten-Rechner →',
  },
  {
    text: 'Ein BMI zwischen 18,5 und 24,9 gilt als Normalgewicht. Schon 30 Minuten Bewegung täglich machen einen Unterschied.',
    link: '/gesundheit/bmi-rechner',
    linkText: 'Zum BMI-Rechner →',
  },
  {
    text: 'Die Grunderwerbsteuer variiert je nach Bundesland zwischen 3,5 % und 6,5 % — das sind bei 300.000 € bis zu 9.000 € Unterschied.',
    link: '/wohnen/grunderwerbsteuer-rechner',
    linkText: 'Zum Grunderwerbsteuer-Rechner →',
  },
  {
    text: 'Beim Doppelrabatt gilt: 20 % + 10 % sind nicht 30 %, sondern nur 28 %. Der zweite Rabatt wird auf den bereits reduzierten Preis berechnet.',
    link: '/alltag/rabattrechner',
    linkText: 'Zum Rabattrechner →',
  },
  {
    text: `Mindestlohn 2026: ${MINDESTLOHN.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € pro Stunde ergeben bei Vollzeit ca. ${mindestlohnBrutto.toLocaleString('de-DE')} € brutto — in Steuerklasse 1 bleiben rund ${mindestlohnNetto.toLocaleString('de-DE')} € netto.`,
    link: '/finanzen/mindestlohn-netto',
    linkText: 'Mehr zum Mindestlohn →',
  },
  {
    text: 'Wer 100 € monatlich zu 5 % Zinsen spart, hat nach 10 Jahren über 15.500 € — davon 3.500 € reine Zinserträge.',
    link: '/finanzen/sparrechner',
    linkText: 'Zum Sparrechner →',
  },
  {
    text: 'Seit 2026 beträgt die Pendlerpauschale einheitlich 0,38 € pro Entfernungskilometer ab dem ersten Kilometer (StÄndG 2025). Diese gilt als Werbungskosten — die tatsächliche Steuerersparnis hängt vom persönlichen Grenzsteuersatz ab und liegt typischerweise zwischen 25 und 42 % der geltend gemachten Pauschale.',
    link: '/arbeit/pendlerpauschale-rechner',
    linkText: 'Zum Pendlerpauschale-Rechner →',
  },
];

function getRandomTippIndex(): number {
  return Math.floor(Math.random() * tipps.length);
}

export default function TippDesTages() {
  const mounted = useMounted();
  // Bei jedem Mount (Page-Reload, Browser-Back, Re-Navigation) wird ein
  // zufälliger Tipp gewählt — kein deterministisches Datum-Modulo mehr.
  // Hydration-safe: Server-Pass + erster Client-Render zeigen immer Tipp[0],
  // der Random-Pick aktiviert nach `useMounted()` greift. Der Label-Text
  // bleibt „Tipp des Tages" als bekannter UI-Anker, auch wenn der Tipp
  // jetzt pro Mount rotiert.
  const tipp = mounted ? tipps[getRandomTippIndex()] : tipps[0];

  return (
    <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Tipp des Tages</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{tipp.text}</p>
          <Link
            href={tipp.link}
            className="text-sm font-medium text-primary-600 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            {tipp.linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
