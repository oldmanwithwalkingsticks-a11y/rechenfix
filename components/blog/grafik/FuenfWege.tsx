/**
 * Grafik: Wie viele Rechenwege für denselben Brennwert zulässig sind.
 * FAO, Food and Nutrition Paper 77 (2003), Kapitel 3.5.5 und 3.8: Codex
 * Alimentarius und die EU schreiben die allgemeinen Faktoren vor; der Code of
 * Federal Regulations der USA lässt fünf verschiedene Verfahren zu.
 *
 * Layout-Entscheidung: Zwei Spalten mit stark unterschiedlicher Zeilenzahl —
 * genau diese Asymmetrie ist die Aussage, deshalb KEINE optische Angleichung.
 * Die Kästen sind bewusst gleich hoch, damit der Längenunterschied der Spalten
 * ungeschönt sichtbar bleibt.
 * Geometrie: rechte Spalte endet bei y = 116 + 4*46 + 34 = 334, Trennlinie 358.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const eu = ['allgemeine Faktoren: 17 / 37 / 17 kJ je Gramm'] as const;

const usa = [
  'spezifische Atwater-Faktoren',
  'allgemeine Faktoren wie im Codex',
  'allgemeine Faktoren, Kohlenhydrate ohne Ballaststoffe',
  'von der Behörde genehmigte Sonderfaktoren',
  'Bombenkalorimeter, minus 1,25 kcal je Gramm Eiweiß',
] as const;

export default function FuenfWege() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 380" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-eu { fill: #E6F2EE; stroke: #0F6E56; }
          .k-usa { fill: #FAEEDA; stroke: #854F0B; }
          .t-eu { fill: #0F6E56; }
          .t-usa { fill: #993C1D; }
          .dark .k-eu { fill: #16332B; }
          .dark .k-usa { fill: #3A3222; }
          .dark .t-eu { fill: #5DCAA5; }
          .dark .t-usa { fill: #F0A88C; }
        `}</style>
        <title>Zulässige Rechenwege für den Brennwert in der EU und in den USA</title>
        <desc>
          In der Europäischen Union und im Codex Alimentarius ist genau ein Rechenweg
          vorgeschrieben: die allgemeinen Faktoren mit 17, 37 und 17 Kilojoule je Gramm. In den
          Vereinigten Staaten sind fünf verschiedene Verfahren zulässig, darunter auch die direkte
          Messung im Bombenkalorimeter abzüglich 1,25 Kilokalorien je Gramm Eiweiß.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Lebensmittel, zwei Regelwerke</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Deshalb verbietet die EU-Kommission, beide Nährwerttabellen nebeneinander abzudrucken.</text>

        <text x="24" y="94" fontSize="13" fontWeight="600" className="t-eu">EU und Codex Alimentarius</text>
        {eu.map((e, i) => (
          <g key={e}>
            <rect className="k-eu" x="24" y={116 + i * 46} width="300" height="34" rx="6" strokeWidth="1" />
            <text x="40" y={137 + i * 46} fontSize="12" fill="currentColor">{e}</text>
          </g>
        ))}
        <text x="24" y="196" fontSize="12" fill="#9ca3af">ein vorgeschriebener Weg</text>

        <text x="356" y="94" fontSize="13" fontWeight="600" className="t-usa">Vereinigte Staaten</text>
        {usa.map((u, i) => (
          <g key={u}>
            <rect className="k-usa" x="356" y={116 + i * 46} width="300" height="34" rx="6" strokeWidth="1" />
            <text x="372" y={137 + i * 46} fontSize="11" fill="currentColor">{i + 1}. {u}</text>
          </g>
        ))}
        <text x="356" y="368" fontSize="12" fill="#9ca3af">fünf zulässige Wege, der Hersteller wählt</text>

        <line x1="24" y1="340" x2="324" y2="340" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="368" fontSize="12" fill="#9ca3af">975 Kombinationen zählt die FAO insgesamt.</text>
      </svg>
    </figure>
  );
}
