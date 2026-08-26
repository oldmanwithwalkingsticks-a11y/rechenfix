/**
 * Grafik: Dasselbe Bruttogehalt, sechs Steuerklassen, sechs verschiedene Nettos.
 *
 * DATENHERKUNFT: Alle Werte am 26.08.2026 aus dem ausgelieferten HTML von
 * https://www.rechenfix.de/finanzen/3000-euro-brutto-netto gelesen, nicht
 * nachgerechnet und nicht geschätzt. Sie stammen damit aus derselben
 * berechneBruttoNetto()-Funktion, die auch der eingebettete
 * Steuerklassen-Vergleich-Rechner nutzt. Annahmen der Quelle: 3.000 € brutto
 * monatlich, ledig bzw. verheiratet je nach Klasse, kinderlos, gesetzlich
 * versichert, Nordrhein-Westfalen, ohne Kirchensteuer, durchschnittlicher
 * KV-Zusatzbeitrag 2026.
 *
 * WARTUNG: Diese Zahlen veralten zum 01.01.2027 mit den SV-Parametern. Beim
 * Jahresaudit gegen die Live-Seite gegenprüfen und ersetzen — nicht hochrechnen.
 *
 * Layout-Entscheidung: Balken zeigen das NETTO, nicht die Abzüge. Der Leser
 * sucht die Zahl, die auf dem Konto landet. Die Abzugsquote steht als Zahl
 * daneben, damit der Zusammenhang sichtbar bleibt, ohne einen zweiten Balken
 * zu brauchen.
 *
 * Die Gleichheit von Klasse I und IV ist der eigentliche Beleg der Grafik und
 * deshalb eigens markiert: § 39b Abs. 2 Satz 6 EStG ordnet für beide denselben
 * Tarif an, und die Zahlen sind auf den Cent identisch.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
const BRUTTO = 3000;

const klassen = [
  { nr: 'I', wer: 'ledig', netto: 2049.5, nettoText: '2.049,50', quote: '31,7', ton: 'neutral' },
  { nr: 'II', wer: 'alleinerziehend', netto: 2144.08, nettoText: '2.144,08', quote: '28,5', ton: 'neutral' },
  { nr: 'III', wer: 'verheiratet, Hauptverdiener', netto: 2309.17, nettoText: '2.309,17', quote: '23,0', ton: 'gut' },
  { nr: 'IV', wer: 'verheiratet, ähnliches Einkommen', netto: 2049.5, nettoText: '2.049,50', quote: '31,7', ton: 'neutral' },
  { nr: 'V', wer: 'verheiratet, Geringverdiener', netto: 1715.17, nettoText: '1.715,17', quote: '42,8', ton: 'hart' },
  { nr: 'VI', wer: 'Zweit- oder Nebenjob', netto: 1675.67, nettoText: '1.675,67', quote: '44,1', ton: 'hart' },
] as const;

const X0 = 148;
const BREITE_MAX = 372;
const Y0 = 118;
const ZEILE = 44;

export default function EinBruttoSechsNettos() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 434" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-neutral { fill: #185FA5; }
          .b-gut { fill: #0F6E56; }
          .b-hart { fill: #993C1D; }
          .t-gut { fill: #0F6E56; }
          .t-hart { fill: #993C1D; }
          .marke { stroke: #854F0B; }
          .dark .b-neutral { fill: #85B7EB; }
          .dark .b-gut { fill: #5DCAA5; }
          .dark .b-hart { fill: #F0A88C; }
          .dark .t-gut { fill: #5DCAA5; }
          .dark .t-hart { fill: #F0A88C; }
          .dark .marke { stroke: #E8C06A; }
        `}</style>
        <title>Dasselbe Bruttogehalt in sechs Lohnsteuerklassen</title>
        <desc>
          Bei 3.000 Euro Bruttogehalt im Monat bleiben in Steuerklasse eins 2.049,50 Euro netto,
          in Steuerklasse zwei 2.144,08 Euro, in Steuerklasse drei 2.309,17 Euro, in Steuerklasse
          vier wieder exakt 2.049,50 Euro, in Steuerklasse fünf 1.715,17 Euro und in Steuerklasse
          sechs 1.675,67 Euro. Zwischen der günstigsten und der ungünstigsten Klasse liegen
          633,50 Euro im Monat. Die Klassen eins und vier führen zu auf den Cent identischen
          Ergebnissen, weil Paragraf 39b Absatz 2 Satz 6 des Einkommensteuergesetzes für beide
          denselben Grundtarif anordnet. Die Jahressteuer des Haushalts ist von der Klassenwahl
          unberührt.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Bruttogehalt, sechs Nettos</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">3.000 € brutto im Monat, gesetzlich versichert, kinderlos, NRW, ohne Kirchensteuer</text>

        <text x="24" y="96" fontSize="11" fill="#9ca3af">Klasse</text>
        <text x={X0} y="96" fontSize="11" fill="#9ca3af">Netto im Monat</text>
        <text x="620" y="96" fontSize="11" textAnchor="end" fill="#9ca3af">Abzüge</text>
        <line x1="24" y1="104" x2="656" y2="104" stroke="#d1d5db" strokeWidth="1" />

        {klassen.map((k, i) => {
          const y = Y0 + i * ZEILE;
          const breite = (k.netto / BRUTTO) * BREITE_MAX;
          const bk = k.ton === 'gut' ? 'b-gut' : k.ton === 'hart' ? 'b-hart' : 'b-neutral';
          return (
            <g key={k.nr}>
              <text x="24" y={y + 5} fontSize="15" fontWeight="600" fill="currentColor">{k.nr}</text>
              <text x="52" y={y + 5} fontSize="10" fill="#9ca3af">{k.wer}</text>

              <rect x={X0} y={y - 12} width={BREITE_MAX} height="22" rx="4" fill="#d1d5db" opacity="0.28" />
              <rect x={X0} y={y - 12} width={breite} height="22" rx="4" className={bk} />
              <text x={X0 + breite + 10} y={y + 4} fontSize="13" fontWeight="600" fill="currentColor">{k.nettoText} €</text>
              <text x="620" y={y + 4} fontSize="12" textAnchor="end" fill="#9ca3af">{k.quote} %</text>
            </g>
          );
        })}

        {/* Markierung: I und IV sind identisch */}
        <path
          d="M 132 118 L 120 118 L 120 250 L 132 250"
          fill="none"
          className="marke"
          strokeWidth="1.5"
        />
        <text x="114" y="188" fontSize="10" textAnchor="end" fill="#9ca3af">identisch</text>

        <line x1="24" y1="390" x2="656" y2="390" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="412" fontSize="12" fill="#9ca3af">
          633,50 € Unterschied zwischen der günstigsten und der ungünstigsten Klasse — bei
          identischem Brutto.
        </text>
        <text x="24" y="428" fontSize="12" fill="#9ca3af">
          Die Jahressteuer des Haushalts ändert sich dadurch um keinen Cent.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Klasse I und Klasse IV liefern auf den Cent dasselbe Ergebnis — § 39b Abs. 2 Satz 6 EStG
        ordnet für beide den Grundtarif an. Wer verheiratet ist und in IV steht, wird beim
        Lohnsteuerabzug behandelt wie ein Lediger. Werte am 26.08.2026 aus dem
        Brutto-Netto-Rechner dieser Seite gelesen.
      </figcaption>
    </figure>
  );
}
