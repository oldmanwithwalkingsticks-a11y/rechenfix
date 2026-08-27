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
 * v2 (27.08.2026) — GEOMETRIE-KORREKTUR nach Sichtprüfung im Inkognito.
 * In v1 begannen die Balken bei x=148, die Klassenbeschreibungen bei x=56.
 * Vier der sechs Beschreibungen sind breiter als die 92 px dazwischen und
 * liefen unter die Balken: „verheiratet, ähnliches Einkommen" endete
 * rechnerisch bei x=228, also 80 px im Balkenfeld. Nachgemessen mit einem
 * Breitenmodell von 0,55 × fontSize je Zeichen.
 *
 * v2 verschiebt das Balkenfeld auf x=248 und kürzt es auf 272 px. Die
 * längste Beschreibung endet damit bei x=232, die Grenze liegt bei x=240.
 *
 * Ebenfalls entfernt: die Klammer, die Klasse I und IV als identisch
 * markierte. Ihr Label „identisch" saß bei x=114 und überlagerte die
 * Beschreibungstexte. Die Aussage trägt jetzt eine dezente Hinterlegung
 * beider Zeilen plus eine eigene Fußzeile — ohne Beschriftung im Textfeld.
 *
 * LEHRE: Bei Balkendiagrammen beide Seiten des Balkenfelds gegen Textbreiten
 * prüfen, nicht nur die rechte. In v1 war nur der Wertelabel-Überlauf nach
 * rechts geprüft worden.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
const BRUTTO = 3000;

const klassen = [
  { nr: 'I', wer: 'ledig', netto: 2049.5, nettoText: '2.049,50', quote: '31,7', ton: 'neutral', hervor: true },
  { nr: 'II', wer: 'alleinerziehend', netto: 2144.08, nettoText: '2.144,08', quote: '28,5', ton: 'neutral', hervor: false },
  { nr: 'III', wer: 'verheiratet, Hauptverdiener', netto: 2309.17, nettoText: '2.309,17', quote: '23,0', ton: 'gut', hervor: false },
  { nr: 'IV', wer: 'verheiratet, ähnliches Einkommen', netto: 2049.5, nettoText: '2.049,50', quote: '31,7', ton: 'neutral', hervor: true },
  { nr: 'V', wer: 'verheiratet, Geringverdiener', netto: 1715.17, nettoText: '1.715,17', quote: '42,8', ton: 'hart', hervor: false },
  { nr: 'VI', wer: 'Zweit- oder Nebenjob', netto: 1675.67, nettoText: '1.675,67', quote: '44,1', ton: 'hart', hervor: false },
] as const;

const X0 = 248;
const BREITE_MAX = 272;
const Y0 = 118;
const ZEILE = 44;

export default function EinBruttoSechsNettos() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 450" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-neutral { fill: #185FA5; }
          .b-gut { fill: #0F6E56; }
          .b-hart { fill: #993C1D; }
          .zeile-hervor { fill: #E8F0F9; }
          .dark .b-neutral { fill: #85B7EB; }
          .dark .b-gut { fill: #5DCAA5; }
          .dark .b-hart { fill: #F0A88C; }
          .dark .zeile-hervor { fill: #16283C; }
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
              {k.hervor && (
                <rect x="16" y={y - 18} width="640" height="34" rx="6" className="zeile-hervor" />
              )}
              <text x="24" y={y + 5} fontSize="15" fontWeight="600" fill="currentColor">{k.nr}</text>
              <text x="56" y={y + 5} fontSize="10" fill="#9ca3af">{k.wer}</text>

              <rect x={X0} y={y - 12} width={BREITE_MAX} height="22" rx="4" fill="#d1d5db" opacity="0.28" />
              <rect x={X0} y={y - 12} width={breite} height="22" rx="4" className={bk} />
              <text x={X0 + breite + 10} y={y + 4} fontSize="13" fontWeight="600" fill="currentColor">{k.nettoText} €</text>
              <text x="620" y={y + 4} fontSize="12" textAnchor="end" fill="#9ca3af">{k.quote} %</text>
            </g>
          );
        })}

        <line x1="24" y1="392" x2="656" y2="392" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="412" fontSize="12" fill="#9ca3af">
          Die hinterlegten Zeilen I und IV liefern auf den Cent dasselbe Ergebnis — § 39b Abs. 2
          Satz 6 EStG.
        </text>
        <text x="24" y="430" fontSize="12" fill="#9ca3af">
          633,50 € zwischen günstigster und ungünstigster Klasse. Die Jahressteuer ändert sich um
          keinen Cent.
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
