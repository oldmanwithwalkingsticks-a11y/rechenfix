/**
 * Grafik: Wo die Zehn-Prozent-Grenze noch gilt und wo nicht — drei Anlässe,
 * drei Entscheidungen des Bundesgerichtshofs.
 *
 * 24.03.2004 (VIII ZR 295/03 u. a.): Grenze für die Mietminderung begründet.
 * 18.11.2015 (VIII ZR 266/14): für die Mieterhöhung nach § 558 BGB aufgegeben.
 * 30.05.2018 (VIII ZR 220/17): für die Betriebskostenabrechnung aufgegeben.
 *
 * Layout-Entscheidung: Zeitachse UND Anlassspalten in einer Grafik, weil beides
 * zusammen die Aussage trägt — die Grenze ist nicht abgeschafft und nicht in
 * Kraft, sondern hängt davon ab, wofür die Zahl gebraucht wird. Getrennte
 * Grafiken hätten genau diesen Punkt zerlegt.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/AusgabenGegenHaeufigkeit.tsx.
 */
const stationen = [
  {
    jahr: '2004',
    datum: '24. März',
    az: 'VIII ZR 295/03',
    anlass: 'Mietminderung',
    folge: 'Grenze begründet',
    gilt: true,
    x: 120,
  },
  {
    jahr: '2015',
    datum: '18. November',
    az: 'VIII ZR 266/14',
    anlass: 'Mieterhöhung',
    folge: 'Grenze aufgegeben',
    gilt: false,
    x: 340,
  },
  {
    jahr: '2018',
    datum: '30. Mai',
    az: 'VIII ZR 220/17',
    anlass: 'Betriebs- und Heizkosten',
    folge: 'Grenze aufgegeben',
    gilt: false,
    x: 560,
  },
] as const;

export default function ZehnProzentZeitachse() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 420" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .gilt { fill: #0F6E56; }
          .weg { fill: #993C1D; }
          .punkt-gilt { fill: #0F6E56; }
          .punkt-weg { fill: #993C1D; }
          .kasten-gilt { fill: #E6F2ED; stroke: #0F6E56; }
          .kasten-weg { fill: #FAEEDA; stroke: #854F0B; }
          .dark .gilt { fill: #5DCAA5; }
          .dark .weg { fill: #F0A88C; }
          .dark .punkt-gilt { fill: #5DCAA5; }
          .dark .punkt-weg { fill: #F0A88C; }
          .dark .kasten-gilt { fill: #1F3A33; }
          .dark .kasten-weg { fill: #3A3222; }
        `}</style>
        <title>Wo die Zehn-Prozent-Grenze bei Wohnflächenabweichungen noch gilt</title>
        <desc>
          Der Bundesgerichtshof begründete am 24. März 2004 im Verfahren VIII ZR 295/03 die
          Zehn-Prozent-Grenze für die Mietminderung; sie gilt dort bis heute. Am 18. November 2015
          gab er sie im Verfahren VIII ZR 266/14 für die Mieterhöhung nach Paragraf 558 BGB auf, am
          30. Mai 2018 im Verfahren VIII ZR 220/17 für die Abrechnung von Betriebs- und
          Heizkosten. Für Mieterhöhung und Abrechnung zählt seitdem allein die tatsächliche
          Wohnfläche, ohne Toleranz.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Eine Zahl, drei Maßstäbe</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Wo die Zehn-Prozent-Grenze noch gilt — und wo der Bundesgerichtshof sie aufgegeben hat</text>

        {/* Zeitachse */}
        <line x1="60" y1="120" x2="640" y2="120" stroke="#d1d5db" strokeWidth="2" />

        {stationen.map((st) => (
          <g key={st.jahr}>
            <circle cx={st.x} cy="120" r="7" className={st.gilt ? 'punkt-gilt' : 'punkt-weg'} />
            <text x={st.x} y="100" fontSize="16" fontWeight="600" textAnchor="middle" fill="currentColor">{st.jahr}</text>
            <text x={st.x} y="146" fontSize="11" textAnchor="middle" fill="#9ca3af">{st.datum}</text>
            <text x={st.x} y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">{st.az}</text>

            <rect
              className={st.gilt ? 'kasten-gilt' : 'kasten-weg'}
              x={st.x - 96}
              y="196"
              width="192"
              height="96"
              rx="8"
              strokeWidth="1"
            />
            <text x={st.x} y="224" fontSize="12" textAnchor="middle" fill="#9ca3af">Anlass</text>
            <text x={st.x} y="246" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">{st.anlass}</text>
            <text x={st.x} y="276" fontSize="13" fontWeight="600" textAnchor="middle" className={st.gilt ? 'gilt' : 'weg'}>{st.folge}</text>

            <text x={st.x} y="326" fontSize="12" textAnchor="middle" fill="#9ca3af">heute maßgeblich</text>
            <text x={st.x} y="348" fontSize="13" textAnchor="middle" fill="currentColor">
              {st.gilt ? 'erst ab 10 % Abweichung' : 'die tatsächliche Fläche'}
            </text>
          </g>
        ))}

        <line x1="24" y1="376" x2="656" y2="376" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="400" fontSize="12" fill="#9ca3af">
          Die Grenze ist weder abgeschafft noch allgemein in Kraft — sie hängt davon ab, wofür die Zahl gebraucht wird.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Bei der Minderung geht es um eine enttäuschte Zusage, dort muss die Abweichung ein Gewicht
        haben. Bei Erhöhung und Abrechnung geht es um Größen, an denen Geld verteilt wird — dort
        wäre jede Toleranz eine Verzerrung zulasten einer Seite.
      </figcaption>
    </figure>
  );
}
