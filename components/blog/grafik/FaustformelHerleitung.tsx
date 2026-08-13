/**
 * Grafik: Wie aus s = v²/(2a) die Faustformel (v/10)² wird — und welche
 * Bremsverzögerung dabei stillschweigend unterstellt wird.
 *
 * Rechenweg: v in km/h wird durch 3,6 zu m/s. Quadriert steht damit 3,6² = 12,96
 * im Nenner, dazu der Faktor 2a. Damit am Ende durch 100 geteilt wird, muss
 * 12,96 × 2a = 100 gelten, also a = 100 / 25,92 = 3,858 m/s².
 * Für die Gefahrenbremsung wird der Bremsweg halbiert, was a verdoppelt: 7,716.
 *
 * Als Rechenkette in vier Stufen dargestellt statt als Formelblock, weil die
 * Aussage in der Umformung liegt und nicht im Endergebnis.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const stufen = [
  { text: 's = v² ÷ (2a)', hinweis: 'die Physik, v in Metern je Sekunde' },
  { text: 's = (v ÷ 3,6)² ÷ (2a)', hinweis: 'v jetzt in Kilometern je Stunde' },
  { text: 's = v² ÷ (12,96 × 2a)', hinweis: 'zusammengefasst' },
  { text: 's = v² ÷ 100', hinweis: 'wenn 12,96 × 2a genau 100 ergibt' },
] as const;

export default function FaustformelHerleitung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 380" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .stufe { fill: #F3F4F6; }
          .ziel { fill: #E6F2ED; stroke: #0F6E56; }
          .wert { fill: #FAEEDA; stroke: #854F0B; }
          .t-ziel { fill: #0F6E56; }
          .t-wert { fill: #854F0B; }
          .dark .stufe { fill: #262B33; }
          .dark .ziel { fill: #1F3A33; }
          .dark .wert { fill: #3A3222; }
          .dark .t-ziel { fill: #5DCAA5; }
          .dark .t-wert { fill: #E8C06A; }
        `}</style>
        <title>Herleitung der Faustformel aus der physikalischen Bremswegformel</title>
        <desc>
          Die physikalische Bremswegformel lautet Weg gleich Geschwindigkeit zum Quadrat geteilt
          durch das Doppelte der Verzögerung, mit der Geschwindigkeit in Metern je Sekunde. Setzt
          man die Geschwindigkeit in Kilometern je Stunde ein, steht der Faktor 3,6 im Quadrat,
          also 12,96, zusätzlich im Nenner. Damit am Ende durch 100 geteilt wird, muss das Produkt
          aus 12,96 und dem Doppelten der Verzögerung genau 100 ergeben. Daraus folgt eine
          Verzögerung von 3,86 Metern je Sekundenquadrat für die normale Bremsung. Weil der
          Bremsweg bei der Gefahrenbremsung halbiert wird, entspricht diese 7,72 Metern je
          Sekundenquadrat.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Die Zahl, die niemand nennt</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Vier Umformungen von der Physik zur Fahrschulformel</text>

        {stufen.map((st, i) => (
          <g key={st.text}>
            <rect className={i === 3 ? 'ziel' : 'stufe'} x="24" y={76 + i * 52} width="400" height="42" rx="8" strokeWidth="1" />
            <text x="44" y={97 + i * 52} fontSize="15" fontWeight="600" fill="currentColor">{st.text}</text>
            <text x="44" y={112 + i * 52} fontSize="11" fill="#9ca3af">{st.hinweis}</text>
            {i < 3 && <text x="224" y={130 + i * 52} fontSize="13" textAnchor="middle" fill="#9ca3af">↓</text>}
          </g>
        ))}

        <rect className="wert" x="448" y="180" width="208" height="112" rx="10" strokeWidth="1" />
        <text x="552" y="206" fontSize="12" textAnchor="middle" fill="#9ca3af">daraus folgt</text>
        <text x="552" y="234" fontSize="22" fontWeight="600" textAnchor="middle" className="t-wert">3,86 m/s²</text>
        <text x="552" y="254" fontSize="12" textAnchor="middle" fill="currentColor">bei normaler Bremsung</text>
        <text x="552" y="278" fontSize="12" textAnchor="middle" fill="currentColor">7,72 m/s² bei Gefahrenbremsung</text>

        <line x1="24" y1="316" x2="656" y2="316" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="338" fontSize="12" fill="#9ca3af">
          Moderne Fahrzeuge erreichen auf trockener Straße 7 bis 9 m/s² — die Gefahrenbremsung liegt also richtig.
        </text>
        <text x="24" y="358" fontSize="12" fill="#9ca3af">
          Die normale Bremsung beschreibt kein technisches Limit, sondern bequemes Verzögern.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die Faustformel ist eine Größengleichung: Man setzt Kilometer je Stunde ein und bekommt
        Meter heraus. Das geht nur, weil die Umrechnung vorab in die Zahlen eingebaut wurde —
        zusammen mit einer Annahme über die Bremse.
      </figcaption>
    </figure>
  );
}
