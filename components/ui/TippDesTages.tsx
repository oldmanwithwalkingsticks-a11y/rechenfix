'use client';

import Link from 'next/link';

const tipps = [
  {
    text: 'Bei 3.500 € brutto spart ein Wechsel von Steuerklasse 1 zu 3 über 300 € pro Monat.',
    link: '/finanzen/brutto-netto-rechner',
    linkText: 'Zum Brutto-Netto-Rechner →',
  },
  {
    text: 'Durch spritsparende Fahrweise (niedrige Drehzahlen, Reifendruck prüfen) können Sie bis zu 20 % Spritkosten sparen.',
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
    text: 'Mindestlohn 2026: 12,82 € pro Stunde ergeben bei Vollzeit ca. 2.051 € brutto — in Steuerklasse 1 bleiben rund 1.560 € netto.',
    link: '/finanzen/mindestlohn-netto',
    linkText: 'Mehr zum Mindestlohn →',
  },
  {
    text: 'Wer 100 € monatlich zu 5 % Zinsen spart, hat nach 10 Jahren über 15.500 € — davon 3.500 € reine Zinserträge.',
    link: '/finanzen/sparrechner',
    linkText: 'Zum Sparrechner →',
  },
  {
    text: 'Die Pendlerpauschale beträgt 0,30 € pro km (ab dem 21. km: 0,38 €). Bei 30 km einfacher Strecke sind das über 2.600 € Steuerentlastung pro Jahr.',
    link: '/arbeit/pendlerpauschale-rechner',
    linkText: 'Zum Pendlerpauschale-Rechner →',
  },
];

function getTippIndex(): number {
  const start = new Date(2026, 0, 1).getTime();
  const now = Date.now();
  const tage = Math.floor((now - start) / 86400000);
  return tage % tipps.length;
}

export default function TippDesTages() {
  const tipp = tipps[getTippIndex()];

  return (
    <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Tipp des Tages</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{tipp.text}</p>
          <Link
            href={tipp.link}
            className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            {tipp.linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
